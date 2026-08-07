from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import io
import csv
import logging
import httpx
import bcrypt
import jwt
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import Optional, List
import uuid
from datetime import datetime, timezone, timedelta

from emergentintegrations.payments.stripe.checkout import (
    StripeCheckout,
    CheckoutSessionRequest,
    CheckoutSessionResponse,
    CheckoutStatusResponse,
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# --- MongoDB ---
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

# --- Email (Emergent-managed Resend) ---
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY", "")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Titli Foundation")

# --- Stripe (Flow B, custom donation amount) ---
STRIPE_API_KEY = os.environ.get("STRIPE_API_KEY", "sk_test_emergent")

# Fixed donation amounts (defined server-side to prevent tampering)
DONATION_PACKAGES = {
    "spark": 500.0,     # ₹500 equivalent in USD for demo; using USD
    "seed": 1500.0,
    "grow": 5000.0,
    "custom_min": 100.0,
    "custom_max": 100000.0,
}

app = FastAPI(title="Titli Foundation API")
api_router = APIRouter(prefix="/api")

# ==========================
# Models
# ==========================
def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class NewsletterSubscribeRequest(BaseModel):
    email: EmailStr
    source: Optional[str] = "footer"


class NewsletterSubscriber(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    source: Optional[str] = "footer"
    subscribed_at: str = Field(default_factory=now_iso)


class ContactMessageRequest(BaseModel):
    name: str
    email: EmailStr
    message: str


class SchoolRegisterRequest(BaseModel):
    school_name: str
    city: str
    coordinator_name: str
    coordinator_email: EmailStr
    phone: Optional[str] = ""
    size: Optional[str] = ""
    password: str


class CoordinatorLoginRequest(BaseModel):
    email: EmailStr
    password: str


class StudentCampaignRequest(BaseModel):
    student_name: str
    email: EmailStr
    school: str
    grade: Optional[str] = ""
    target_amount: float = 0


class DonationCheckoutRequest(BaseModel):
    package_id: Optional[str] = None  # "spark" | "seed" | "grow" | "custom"
    custom_amount: Optional[float] = None
    donor_name: Optional[str] = None
    donor_email: Optional[EmailStr] = None
    origin_url: str


# ==========================
# Newsletter
# ==========================
async def send_email(recipient: str, subject: str, html: str) -> bool:
    if not EMAIL_KEY:
        logging.warning("EMERGENT_EMAIL_KEY missing; skipping send")
        return False
    payload = {
        "to": [recipient],
        "subject": subject,
        "html": html,
        "from_name": EMAIL_FROM_NAME,
    }
    try:
        async with httpx.AsyncClient(timeout=30) as c:
            r = await c.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        r.raise_for_status()
        return True
    except Exception as e:
        logging.error(f"Email send failed: {e}")
        return False


NEWSLETTER_HTML = """
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFFBF7;padding:48px 0;font-family:Inter,Arial,sans-serif;color:#000">
  <tr><td align="center">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:28px;padding:48px;box-shadow:0 20px 40px rgba(0,0,0,0.06)">
      <tr><td>
        <div style="font-family:'Shadows Into Light',cursive;font-size:34px;color:#EC5A99;transform:rotate(-2deg);margin-bottom:8px">welcome</div>
        <h1 style="font-family:Georgia,serif;font-size:40px;line-height:1.05;letter-spacing:-1px;margin:0 0 20px;color:#000">Thanks for joining the Titli circle.</h1>
        <p style="font-size:16px;line-height:1.7;color:#4A4A4A;margin:0 0 24px">
          You'll now receive our quiet, thoughtful dispatches — stories from classrooms, updates on the work,
          and occasional invitations to be part of it.
        </p>
        <div style="height:1px;background:#FFC5DE;margin:32px 0"></div>
        <p style="font-size:14px;color:#4A4A4A;margin:0">
          With gratitude,<br/><strong style="color:#EC5A99">The Titli Foundation team</strong>
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
"""


@api_router.post("/newsletter/subscribe")
async def newsletter_subscribe(req: NewsletterSubscribeRequest):
    existing = await db.newsletter_subscribers.find_one({"email": req.email})
    if existing:
        return {"status": "already_subscribed", "email": req.email}
    sub = NewsletterSubscriber(email=req.email, source=req.source)
    await db.newsletter_subscribers.insert_one(sub.model_dump())
    # fire-and-check confirmation email
    email_sent = await send_email(
        recipient=req.email,
        subject="Welcome to the Titli circle",
        html=NEWSLETTER_HTML,
    )
    return {"status": "subscribed", "email": req.email, "email_sent": email_sent}


@api_router.get("/newsletter/count")
async def newsletter_count():
    n = await db.newsletter_subscribers.count_documents({})
    return {"count": n}


# ==========================
# Contact
# ==========================
@api_router.post("/contact")
async def contact(req: ContactMessageRequest):
    doc = {
        "id": str(uuid.uuid4()),
        "name": req.name,
        "email": req.email,
        "message": req.message,
        "created_at": now_iso(),
    }
    await db.contact_messages.insert_one(doc)
    return {"status": "received", "id": doc["id"]}


# ==========================
# Schools & Students (fundraising program)
# ==========================
JWT_SECRET = os.environ.get("JWT_SECRET", "dev-secret-change-me")
JWT_ALG = "HS256"


def hash_password(p: str) -> str:
    return bcrypt.hashpw(p.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(p: str, h: str) -> bool:
    try:
        return bcrypt.checkpw(p.encode("utf-8"), h.encode("utf-8"))
    except Exception:
        return False


def create_access_token(coordinator_id: str, email: str) -> str:
    payload = {
        "sub": coordinator_id,
        "email": email,
        "role": "coordinator",
        "exp": datetime.now(timezone.utc) + timedelta(hours=24),
        "type": "access",
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)


async def get_current_coordinator(request: Request):
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        raise HTTPException(401, "Not authenticated")
    token = auth[7:]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
        if payload.get("type") != "access":
            raise HTTPException(401, "Invalid token type")
        c = await db.school_registrations.find_one({"id": payload["sub"]}, {"_id": 0})
        if not c:
            raise HTTPException(401, "Coordinator not found")
        c.pop("password_hash", None)
        return c
    except jwt.ExpiredSignatureError:
        raise HTTPException(401, "Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(401, "Invalid token")


SCHOOL_HTML = """
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FEF1F8;padding:48px 0;font-family:Manrope,Arial,sans-serif;color:#111">
  <tr><td align="center">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:24px;padding:40px;box-shadow:0 20px 40px rgba(236,90,153,0.10)">
      <tr><td>
        <div style="font-size:12px;letter-spacing:0.28em;color:#EC5A99;text-transform:uppercase;font-weight:700;margin-bottom:16px">Titli Foundation · Schools</div>
        <h1 style="font-size:32px;line-height:1.05;letter-spacing:-0.5px;margin:0 0 16px;color:#111">Thanks for registering your school.</h1>
        <p style="font-size:15px;line-height:1.65;color:#4A4A4A;margin:0 0 16px">
          A dedicated Titli coordinator will reach out to you within one working day.
          You'll receive: your school dashboard, class fundraiser links, and a WhatsApp
          contact for direct support.
        </p>
        <div style="height:1px;background:#FFC5DE;margin:28px 0"></div>
        <p style="font-size:13px;color:#4A4A4A;margin:0">— The Titli Foundation team · #BreakTheTaboo</p>
      </td></tr>
    </table>
  </td></tr>
</table>
"""


@api_router.post("/schools/register")
async def schools_register(req: SchoolRegisterRequest):
    existing = await db.school_registrations.find_one({"coordinator_email": req.coordinator_email.lower()})
    if existing:
        raise HTTPException(409, "A school with this coordinator email is already registered")
    coord_id = str(uuid.uuid4())
    doc = {
        "id": coord_id,
        "school_name": req.school_name,
        "city": req.city,
        "coordinator_name": req.coordinator_name,
        "coordinator_email": req.coordinator_email.lower(),
        "phone": req.phone,
        "size": req.size,
        "password_hash": hash_password(req.password),
        "status": "pending",
        "created_at": now_iso(),
    }
    await db.school_registrations.insert_one(doc)
    email_sent = await send_email(
        recipient=req.coordinator_email,
        subject="Welcome to Titli · Your school is registered",
        html=SCHOOL_HTML,
    )
    token = create_access_token(coord_id, doc["coordinator_email"])
    doc.pop("_id", None)
    doc.pop("password_hash", None)
    return {
        "status": "registered",
        "id": coord_id,
        "email_sent": email_sent,
        "access_token": token,
        "coordinator": doc,
    }


@api_router.post("/auth/coordinator/login")
async def coordinator_login(req: CoordinatorLoginRequest):
    email = req.email.lower()
    coord = await db.school_registrations.find_one({"coordinator_email": email})
    if not coord or not coord.get("password_hash"):
        raise HTTPException(401, "Invalid email or password")
    if not verify_password(req.password, coord["password_hash"]):
        raise HTTPException(401, "Invalid email or password")
    token = create_access_token(coord["id"], email)
    coord.pop("_id", None)
    coord.pop("password_hash", None)
    return {"access_token": token, "coordinator": coord}


@api_router.get("/auth/coordinator/me")
async def coordinator_me(current=Depends(get_current_coordinator)):
    return current


@api_router.get("/schools/dashboard")
async def schools_dashboard(current=Depends(get_current_coordinator)):
    school = current["school_name"]
    campaigns_cursor = db.student_campaigns.find({"school": school}, {"_id": 0})
    campaigns = await campaigns_cursor.to_list(500)
    total_raised = sum(float(c.get("raised_amount") or 0) for c in campaigns)
    total_target = sum(float(c.get("target_amount") or 0) for c in campaigns)
    return {
        "school": current,
        "summary": {
            "campaigns_count": len(campaigns),
            "active_campaigns": sum(1 for c in campaigns if c.get("status") == "active"),
            "total_raised": total_raised,
            "total_target": total_target,
            "unique_students": len({c.get("email") for c in campaigns}),
        },
        "campaigns": campaigns,
    }


@api_router.get("/schools/export/80g")
async def schools_export_80g(current=Depends(get_current_coordinator)):
    school = current["school_name"]
    campaigns = await db.student_campaigns.find({"school": school}, {"_id": 0}).to_list(1000)
    buf = io.StringIO()
    writer = csv.writer(buf)
    writer.writerow([
        "Certificate No", "Student Name", "Email", "Grade",
        "School", "Target (INR)", "Raised (INR)", "Status",
        "Campaign Started", "80G Reference",
    ])
    for i, c in enumerate(campaigns, start=1):
        writer.writerow([
            f"TITLI-80G-{datetime.now().year}-{i:05d}",
            c.get("student_name", ""),
            c.get("email", ""),
            c.get("grade", ""),
            c.get("school", ""),
            c.get("target_amount", 0),
            c.get("raised_amount", 0),
            c.get("status", ""),
            c.get("created_at", ""),
            "AAETI4571P / 80G eligible",
        ])
    buf.seek(0)
    filename = f"titli-80g-{school.replace(' ', '-')}-{datetime.now().strftime('%Y%m%d')}.csv"
    return StreamingResponse(
        iter([buf.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


STUDENT_HTML = """
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FEF1F8;padding:48px 0;font-family:Manrope,Arial,sans-serif;color:#111">
  <tr><td align="center">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:24px;padding:40px;box-shadow:0 20px 40px rgba(236,90,153,0.10)">
      <tr><td>
        <div style="font-size:12px;letter-spacing:0.28em;color:#EC5A99;text-transform:uppercase;font-weight:700;margin-bottom:16px">Your campaign is live 🎉</div>
        <h1 style="font-size:32px;line-height:1.05;letter-spacing:-0.5px;margin:0 0 16px;color:#111">Go raise, changemaker.</h1>
        <p style="font-size:15px;line-height:1.65;color:#4A4A4A;margin:0 0 16px">
          Your shareable link and QR poster are attached to this thread.
          Every rupee routes directly to Titli's on-ground work — you'll get
          field photographs when the impact is delivered.
        </p>
        <div style="height:1px;background:#FFC5DE;margin:28px 0"></div>
        <p style="font-size:13px;color:#4A4A4A;margin:0">— Titli Foundation · #BreakTheTaboo</p>
      </td></tr>
    </table>
  </td></tr>
</table>
"""


@api_router.post("/students/campaigns")
async def students_campaigns(req: StudentCampaignRequest):
    doc = {
        "id": str(uuid.uuid4()),
        "student_name": req.student_name,
        "email": req.email,
        "school": req.school,
        "grade": req.grade,
        "target_amount": float(req.target_amount or 0),
        "raised_amount": 0.0,
        "status": "active",
        "created_at": now_iso(),
    }
    await db.student_campaigns.insert_one(doc)
    email_sent = await send_email(
        recipient=req.email,
        subject="Your Titli fundraiser is live",
        html=STUDENT_HTML,
    )
    return {"status": "created", "id": doc["id"], "email_sent": email_sent}


# ==========================
# Stripe donations (Flow B)
# ==========================
def resolve_amount(req: DonationCheckoutRequest) -> float:
    if req.package_id and req.package_id in ("spark", "seed", "grow"):
        return DONATION_PACKAGES[req.package_id]
    if req.package_id == "custom":
        if req.custom_amount is None:
            raise HTTPException(400, "custom_amount required")
        amt = float(req.custom_amount)
        if amt < DONATION_PACKAGES["custom_min"] or amt > DONATION_PACKAGES["custom_max"]:
            raise HTTPException(400, "amount out of range")
        return amt
    raise HTTPException(400, "invalid package_id")


@api_router.post("/donations/checkout")
async def donations_checkout(req: DonationCheckoutRequest, request: Request):
    amount = resolve_amount(req)
    host_url = str(request.base_url)
    webhook_url = f"{host_url}api/webhook/stripe"
    checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)

    success_url = f"{req.origin_url}/donation/success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{req.origin_url}/donation/cancel"

    session_req = CheckoutSessionRequest(
        amount=float(amount),
        currency="usd",
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={
            "kind": "donation",
            "package_id": req.package_id or "",
            "donor_name": req.donor_name or "",
            "donor_email": req.donor_email or "",
        },
    )
    session: CheckoutSessionResponse = await checkout.create_checkout_session(session_req)

    await db.donation_intents.insert_one(
        {
            "id": str(uuid.uuid4()),
            "session_id": session.session_id,
            "amount": float(amount),
            "currency": "usd",
            "package_id": req.package_id,
            "donor_name": req.donor_name,
            "donor_email": req.donor_email,
            "status": "initiated",
            "payment_status": "pending",
            "created_at": now_iso(),
            "updated_at": now_iso(),
        }
    )
    return {"checkout_url": session.url, "session_id": session.session_id, "amount": amount}


@api_router.get("/donations/status/{session_id}")
async def donations_status(session_id: str):
    record = await db.donation_intents.find_one({"session_id": session_id}, {"_id": 0})
    if not record:
        raise HTTPException(404, "Transaction not found")

    if record.get("payment_status") != "paid":
        try:
            checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url="")
            status: CheckoutStatusResponse = await checkout.get_checkout_status(session_id)
            if status.payment_status == "paid" or status.status == "complete":
                await db.donation_intents.update_one(
                    {"session_id": session_id, "payment_status": {"$ne": "paid"}},
                    {
                        "$set": {
                            "status": "completed",
                            "payment_status": "paid",
                            "updated_at": now_iso(),
                        }
                    },
                )
                record = await db.donation_intents.find_one({"session_id": session_id}, {"_id": 0})
        except Exception as e:
            logging.warning(f"stripe status poll failed: {e}")
    return {
        "session_id": record["session_id"],
        "status": record["status"],
        "payment_status": record["payment_status"],
        "amount": record.get("amount"),
    }


@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    body = await request.body()
    sig = request.headers.get("Stripe-Signature", "")
    try:
        checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url="")
        result = await checkout.handle_webhook(body, sig)
    except Exception as e:
        logging.error(f"webhook error: {e}")
        raise HTTPException(400, "webhook error")

    if result and result.session_id:
        await db.donation_intents.update_one(
            {"session_id": result.session_id, "payment_status": {"$ne": "paid"}},
            {
                "$set": {
                    "status": "completed" if result.payment_status == "paid" else result.payment_status,
                    "payment_status": result.payment_status,
                    "updated_at": now_iso(),
                }
            },
        )
    return {"status": "ok"}


# ==========================
# Health
# ==========================
@api_router.get("/")
async def root():
    return {"service": "titli-foundation", "ok": True}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
