# Titli Foundation — Schools Fundraising Landing (v2)

## Actual product (locked)
Landing page for **Titli Foundation's school fundraising programme**:
- Schools register → students launch class fundraisers → funds go to Titli's
  period-dignity work (menstrual cups, sanitary pads, awareness workshops).
- Titli Foundation is India's #BreakTheTaboo NGO fighting period poverty.
- Reference site: https://titlifoundation.in

## Visual DNA (locked from real site)
- Nav = floating white pill (butterfly + "TITLI FOUNDATION" wordmark + pink Donate/Register pill)
- Font = **Manrope** bold humanist sans (NOT Fraunces)
- Signature "cup" script inside pink hand-drawn oval (cupCircle.svg from titlifoundation.in)
- Body = Inter
- Script accent = Shadows Into Light (for scribbled highlight words)
- Sections alternate cream #FFFBF7 and pale pink #FEF1F8
- Footer = solid Titli Pink #EC5A99 with white text (signature look)
- Warm authentic photography sourced from titlifoundation.in Sanity CDN

## Section flow
1. Sticky floating pill Nav
2. Hero — "Change begins, one [cup] at a time. Now, schools raise for it."
3. How It Works — 3-step animated stepper (Register / Launch / Deliver)
4. For Schools — bento (dashboard, ₹0/year, 80G, WhatsApp coordinator, field report)
5. For Students — image + 6 perks + "your fundraiser is your voice"
6. Impact — real Titli stats (10k pads / 500 cups / 3.5k volunteers / 60 campaigns)
7. Where Donations Go — SOS Village · Pondicherry · Kanpur snap carousel
8. Partners — dual marquee of REAL Titli logos (Delhi Police, Pee Safe, Sirona, IIT Kanpur, SOS, etc.)
9. #BreakTheTaboo manifesto
10. Final CTA — split card: pink Register school | photo Start fundraiser
11. Newsletter band + Solid pink footer with real contact info

## Backend
- `POST /api/schools/register` — school registration with confirmation email
- `POST /api/students/campaigns` — student campaign creation with confirmation email
- `POST /api/newsletter/subscribe` — newsletter subscription
- `POST /api/donations/checkout` — Stripe checkout (kept live, undecided by user)
- `GET /api/donations/status/{session_id}` — status poll
- `POST /api/webhook/stripe` — webhook
- MongoDB collections: school_registrations, student_campaigns, newsletter_subscribers, donation_intents

## Integrations
- Stripe Flow B via emergentintegrations (sk_test_emergent) — kept, currently unused in UI
- Resend via EMERGENT_EMAIL_KEY — for confirmation emails

## Design choices (user-directed)
- No leaderboard (user wanted no sense of competition)
- Real Titli partner logos on marquee
- Colors verified against titlifoundation.in section-by-section
- Donation flow present but not the primary CTA — Register/Fundraise leads

## Next priority backlog
- Wire donation into student campaigns (per-campaign Stripe link)
- School dashboard (post-login)
- Student campaign public page with QR code
- Blog carousel pulling real Titli blog posts
- Confirmation email delivery (Resend 422 in preview — resolves post-deploy)
