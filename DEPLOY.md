# Titli Foundation — Vercel + Railway Deployment Guide

You're deploying **three services**:
1. **MongoDB Atlas** → the database
2. **Railway** → the FastAPI backend
3. **Vercel** → the React frontend

Do them in that order.

---

## 1. MongoDB Atlas (free tier)

1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a **free M0 cluster** (any region close to your Railway region)
3. **Database Access** → create a user (username + password) — save these
4. **Network Access** → **Allow access from anywhere** (`0.0.0.0/0`) — needed so Railway can connect
5. Click **Connect** → **Drivers** → copy the connection string. It looks like:
   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<user>` and `<password>` with the actual values you set

Save this string — you'll need it in step 2.

---

## 2. Railway (backend)

### 2a. Push code to GitHub
Push the whole `/app` folder to a GitHub repo (or push just the backend — either works, Railway can point to a subfolder).

### 2b. Create the Railway service
1. Sign up at https://railway.app → **New Project** → **Deploy from GitHub repo**
2. Pick your repo. If you pushed the full repo, set the **root directory** to `backend/` in service settings.
3. Railway auto-detects Python and uses the `railway.toml` + `requirements.txt` we shipped.

### 2c. Set environment variables (Variables tab)

| Name | Value |
|---|---|
| `MONGO_URL` | (the Atlas connection string from step 1) |
| `DB_NAME` | `titli_foundation` |
| `JWT_SECRET` | run `python -c "import secrets;print(secrets.token_hex(32))"` locally and paste the output |
| `CORS_ORIGINS` | leave empty for now — we'll update after Vercel is deployed |
| `STRIPE_API_KEY` | your Stripe secret key (test key is fine to start: `sk_test_...`) |
| `EMERGENT_EMAIL_KEY` | your Emergent email key |
| `EMAIL_FROM_NAME` | `Titli Foundation` |
| `PIP_EXTRA_INDEX_URL` | `https://d33sy5i8bnduwe.cloudfront.net/simple/` |

> The `PIP_EXTRA_INDEX_URL` is only needed if Railway ignores the `--extra-index-url` line in `requirements.txt`. Adding it explicitly is safer.

### 2d. Deploy
1. Railway builds and deploys automatically
2. Once live, click **Settings** → **Networking** → **Generate Domain**
3. You'll get a URL like `https://titli-backend-production.up.railway.app`
4. Test it: open `https://<your-railway-url>/api/` in a browser — you should see `{"service":"titli-foundation","ok":true}`

Save the Railway URL — you'll need it in step 3.

---

## 3. Vercel (frontend)

### 3a. Import project
1. Sign up at https://vercel.com → **Add New** → **Project** → import the same GitHub repo
2. Set **Root Directory** to `frontend/`
3. Framework preset: **Create React App** (auto-detected)
4. Build command: `yarn build` (already set by `vercel.json`)
5. Output directory: `build` (already set by `vercel.json`)

### 3b. Set environment variables

| Name | Value |
|---|---|
| `REACT_APP_BACKEND_URL` | the Railway URL from step 2d (e.g. `https://titli-backend-production.up.railway.app`) |

That's the **only** frontend env var. No trailing slash.

### 3c. Deploy
1. Click **Deploy**
2. Vercel builds and gives you a URL like `https://titli-foundation.vercel.app`

Save the Vercel URL — you'll need it back on Railway.

---

## 4. Wire the two together (CORS)

Go back to **Railway → Variables** and update:

| Name | Value |
|---|---|
| `CORS_ORIGINS` | your Vercel URL (e.g. `https://titli-foundation.vercel.app`) |

Railway redeploys automatically. That's it.

---

## 5. Verify

1. Open your Vercel URL — the landing page should load
2. Open browser DevTools → Network → refresh — you should see calls to your Railway URL (not `localhost`)
3. Try "Register School" → confirm the record appears in your MongoDB Atlas dashboard (Collections → `school_registrations`)
4. Try `/login` with the same credentials → dashboard loads → click **Export 80G receipts (CSV)** → CSV downloads

If step 3 fails with a CORS error, double-check `CORS_ORIGINS` on Railway matches your Vercel URL exactly (no trailing slash, `https://` included).

---

## Env var cheat sheet

### Railway (backend)
```
MONGO_URL
DB_NAME
JWT_SECRET
CORS_ORIGINS
STRIPE_API_KEY
EMERGENT_EMAIL_KEY
EMAIL_FROM_NAME
PIP_EXTRA_INDEX_URL   ← https://d33sy5i8bnduwe.cloudfront.net/simple/
```

### Vercel (frontend)
```
REACT_APP_BACKEND_URL
```

### MongoDB Atlas
Nothing to configure beyond user + IP access — the connection string carries everything.

---

## Custom domain (optional)

- **Vercel**: Settings → Domains → add `titlifoundation.in` (or a subdomain)
- **Railway**: Settings → Networking → Custom Domain → add `api.titlifoundation.in`
- After you add a custom domain to Railway, update `REACT_APP_BACKEND_URL` on Vercel to the new domain and `CORS_ORIGINS` on Railway to your custom Vercel domain.

---

## Costs (as of Dec 2025)

- **MongoDB Atlas M0** → free forever (512 MB storage, plenty for this app)
- **Railway** → $5/mo minimum after the free trial, includes ~500 hours
- **Vercel Hobby** → free forever for personal / non-commercial use

Total: ~$5/mo if you're on Railway's Hobby plan.
