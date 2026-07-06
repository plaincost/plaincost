# PlainCost Insights — Development Progress

Living tracker for project status, planned work, and session notes.
Ask to update the **Session log** at the end of each working session.

**Last updated:** 2026-07-06

---

## Current focus

**Phase 1 — Launch the landing page** (complete)

Site is live at **https://plaincost.ai** with working waitlist signups and analytics. Ready to promote the URL.

---

## Task roadmap

Tasks are ordered by dependency. Complete earlier phases before starting later ones unless noted.

### Phase 1 — Landing page & hosting

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Landing page (hero, sections, FAQ, CTA) | ✅ Done | Shipped in initial commit |
| 1.2 | Privacy policy page | ✅ Done | `/privacy` |
| 1.3 | Waitlist form + API | ✅ Done | Supabase `waitlist_signups` table in production |
| 1.4 | Push repo to GitHub (`plaincost/plaincost`) | ✅ Done | `main` branch |
| 1.5 | Create Vercel account (GitHub org) | ✅ Done | Signed up 2026-07-03 |
| 1.6 | Import repo in Vercel & first deploy | ✅ Done | Live at `plaincost.vercel.app` |
| 1.7 | Smoke-test live site | ✅ Done | Homepage, privacy, waitlist API verified |
| 1.8 | Fix waitlist persistence for production | ✅ Done | Supabase + publishable key; RLS insert-only |
| 1.9 | Add custom domain | ✅ Done | `plaincost.ai` via Cloudflare; apex is primary |
| 1.10 | Favicon & social preview (OG/Twitter meta) | ✅ Done | Dynamic `icon`, `apple-icon`, `opengraph-image`; `metadataBase` set |
| 1.11 | Basic analytics | ✅ Done | Vercel Web Analytics + waitlist signup event |

### Phase 2 — Waitlist operations

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | Waitlist confirmation email | ⬜ Pending | Resend or Kit when ready |
| 2.2 | Export / admin view for signups | ⬜ Pending | Supabase Table Editor works for now |
| 2.3 | Welcome email sequence (optional) | ⬜ Pending | Nurture before product launch |

### Phase 3 — AWS connection & data pipeline

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | IAM role CloudFormation / setup guide | ⬜ Pending | Read-only billing + Cost Explorer permissions |
| 3.2 | Cross-account role assumption (STS) | ⬜ Pending | Secure connection without storing long-lived creds |
| 3.3 | Cost Explorer API integration | ⬜ Pending | Weekly spend, service breakdown, MoM deltas |
| 3.4 | Compute Optimizer integration | ⬜ Pending | Rightsizing / savings recommendations |
| 3.5 | Data models & storage for customer accounts | ⬜ Pending | Extend existing Supabase project |
| 3.6 | Report generation engine | ⬜ Pending | Transform raw AWS data → structured report |
| 3.7 | Plain-English narrative layer | ⬜ Pending | Template-based or LLM-assisted summaries |

### Phase 4 — Product app (post-waitlist)

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | User authentication | ⬜ Pending | Clerk, Auth.js, or similar |
| 4.2 | Onboarding flow (connect AWS account) | ⬜ Pending | Guided IAM setup in-app |
| 4.3 | Customer dashboard (optional v1) | ⬜ Pending | May defer; email-only MVP is viable |
| 4.4 | Weekly report scheduler | ⬜ Pending | Vercel Cron, Inngest, or AWS EventBridge |
| 4.5 | Email delivery for weekly reports | ⬜ Pending | Resend, Postmark, or SES |
| 4.6 | Sample report generator (waitlist perk) | ⬜ Pending | Promised on landing page |

### Phase 5 — Monetization & launch

| # | Task | Status | Notes |
|---|------|--------|-------|
| 5.1 | Pricing model & page | ⬜ Pending | Target: SMBs at $500–$5k/mo AWS spend |
| 5.2 | Stripe billing & subscriptions | ⬜ Pending | |
| 5.3 | Beta onboarding (first waitlist batch) | ⬜ Pending | |
| 5.4 | Feedback loop & report quality iteration | ⬜ Pending | |
| 5.5 | Public launch | ⬜ Pending | |

---

## Status legend

| Symbol | Meaning |
|--------|---------|
| ✅ Done | Completed and verified |
| 🔄 In progress | Actively being worked on |
| ⬜ Pending | Not started |
| ⏸ Blocked | Waiting on a dependency or decision |

---

## Decisions log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-07-03 | Host on Vercel | Native Next.js support, GitHub deploys, free tier for landing page |
| 2026-07-04 | Waitlist storage: Supabase | Free tier, same DB for future product data, RLS insert-only policy |
| 2026-07-04 | Custom domain: `plaincost.ai` | Registered on Cloudflare; CNAME to `fa53a9371db04fc3.vercel-dns-017.com` |
| 2026-07-04 | Primary URL: `plaincost.ai` | Apex domain; `www` → 308 redirect to apex |
| 2026-07-04 | Database: Supabase | Waitlist table live; extend for customer data in Phase 3 |
| — | Auth provider | **TBD** — needed at Phase 4 |
| — | Email provider | **TBD** — Resend likely for reports + waitlist emails (Phase 2+) |

---

## Live URLs

| URL | Purpose |
|-----|---------|
| https://plaincost.ai | **Primary** — production site |
| https://www.plaincost.ai | Redirects to apex |
| https://plaincost.vercel.app | Vercel default (still works) |

---

## Session log

Reverse-chronological notes. Add an entry at the end of each session.

### 2026-07-06

- Added Vercel Web Analytics (`@vercel/analytics`) for pageview tracking.
- Track `Waitlist Signup` custom event on successful API insert.
- **Next session:** Phase 2 (waitlist emails) or Phase 3 (AWS pipeline).

### 2026-07-05

- Added favicon (`app/icon.tsx`), Apple touch icon, and OG image (`app/opengraph-image.tsx`).
- Expanded root metadata: `metadataBase`, Open Graph, and Twitter card tags.
- **Next session:** Analytics (1.11) or Phase 2/3.

### 2026-07-04

- Deployed to Vercel (`plaincost.vercel.app`); smoke-tested homepage and privacy page.
- Migrated waitlist from local JSON to Supabase (`waitlist_signups` table, publishable key, insert-only RLS).
- Added `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` to Vercel; verified live signups.
- Configured custom domain `plaincost.ai` on Cloudflare (CNAME `@` and `www` → Vercel DNS).
- Flipped primary URL from `www` to apex (`plaincost.ai`); `www` redirects via 308.
- Added `PROGRESS.md` tracker; committed Supabase waitlist implementation.
- **Next session:** Favicon/OG meta (1.10), analytics (1.11), or begin Phase 2/3.

### 2026-07-03

- Built and committed landing page with waitlist signup, report mockups, and privacy policy.
- Repo live at `github.com/plaincost/plaincost`.
- Chose Vercel for hosting; created Vercel account linked to PlainCost GitHub org.
- **Next session:** Import repo in Vercel, deploy, smoke-test, then fix waitlist persistence before sharing the URL widely.

---

## Quick reference

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (verified passing)
npm run lint
```

**Env vars (local `.env.local` + Vercel):** `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`

**Waitlist signups:** Supabase → Table Editor → `waitlist_signups`

**DNS (Cloudflare):** CNAME `@` and `www` → `fa53a9371db04fc3.vercel-dns-017.com` (DNS only / grey cloud)