# Titli Foundation — Premium NGO Landing Page

## Original Problem Statement
A single-page, desktop-first (1920px) premium landing page for Titli Foundation
that evolves the existing brand into an editorial, Apple/Stripe/UNICEF-quality
experience. Award-worthy (Awwwards SotD level) design — bold, cohesive,
kinetic hero with masked line-by-line reveal, editorial script accent, numbered
manifesto chapters, editorial marquee, purposeful motion, Lenis smooth scroll,
subtle parallax in hero.

## Architecture
- Frontend: React (CRA + craco), Tailwind, framer-motion, embla-carousel-react,
  react-fast-marquee, react-countup, lenis
- Backend: FastAPI + Motor (async MongoDB) + emergentintegrations (Stripe Flow B)
- Database: MongoDB — collections: newsletter_subscribers, contact_messages, donation_intents
- Fonts: Fraunces (editorial hero), Inter (body), Shadows Into Light (script accent)

## Locked Design Tokens
- Colors: Titli Pink #EC5A99, Pink Hover #D84C8A, Light Pink #FFC5DE,
  Pale Pink #FEF1F8, Cream #FFFBF7, Ink #000000, Meta Gray #4A4A4A
- Spacing: 8/16/24/32/48/64/96/128/160/200
- Radii: 8/12/20/28/40/999
- Motion easing: cubic-bezier(0.22, 1, 0.36, 1)

## Sections Implemented (P0 — all done)
1. Sticky glass Nav (scroll-triggered hairline)
2. Kinetic Hero — masked line-by-line reveal, script "future" oval accent,
   parallax spotlight image, floating glass impact card with progress bar
3. Trust Metrics — 4-card row, react-countup on scroll, hover pink hairline
4. How It Works — 3 chapters, animated dotted pink SVG connector via pathLength
5. Why Join — asymmetric 12-col bento grid (image cards, transparency %, tax,
   quote block with image half)
6. Privacy & Trust — dark editorial section, sticky headline, 3 glass cards
7. Stories of Impact — Embla horizontal snap slider, 5 stories, prev/next,
   progress bar
8. Schools — dual opposite marquees + centered floating India map card with
   pulsing pink region dots + hover tooltip
9. Final CTA — full-bleed photo backdrop, gradient overlay, butterfly flutter,
   dual buttons (Stripe checkout + external link-out)
10. Footer — dark, newsletter with arrow→checkmark on success, 4 link columns,
    huge editorial "titli." wordmark

## Integrations
- Stripe Flow B (BYOK) via emergentintegrations
  - Env: STRIPE_API_KEY=sk_test_emergent (pre-injected)
  - Fixed packages (Spark $500 / Seed $1500 / Grow $5000) + custom amount
  - Webhook at /api/webhook/stripe (per Flow B convention)
  - Server-side amount validation, DB record before redirect, polling on success
- Resend (Emergent-managed) newsletter confirmation email
  - Env: EMERGENT_EMAIL_KEY, EMAIL_FROM_NAME=Titli Foundation
  - Note: sends may hit 422 in the shared preview environment for
    non-deliverable/test recipient addresses; DB storage succeeds regardless

## API Endpoints (all /api prefix)
- GET  /                        — health
- POST /newsletter/subscribe    — saves email + sends confirmation
- GET  /newsletter/count
- POST /contact                 — saves contact msg
- POST /donations/checkout      — creates Stripe checkout session
- GET  /donations/status/{sid}  — polling endpoint
- POST /webhook/stripe          — Stripe webhook (Flow B path)

## Routes (Frontend)
- /                    — landing page
- /donation/success    — polls status, shows thank-you
- /donation/cancel     — friendly cancel page

## Verified
- Backend curl: /api/, /api/newsletter/subscribe, /api/donations/checkout all 200
- Frontend screenshots: hero, metrics, steps, privacy, stories, bento, CTA, footer
- Donate modal + custom amount + newsletter success state all working

## Next Priority Backlog
- Real photography swap (client to supply)
- Confirmation email delivery in production (auto-resolves post-deploy)
- Mobile design track (separate)
- Real Razorpay/UPI addition alongside Stripe if requested
