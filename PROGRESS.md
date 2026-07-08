# PlainCost Insights — Development Progress

Living tracker for project status, planned work, and session notes.
Ask to update the **Session log** at the end of each working session.

**Last updated:** 2026-07-08

---

## Current focus

**Phase 3 — AWS connection & data pipeline** (in progress)

Core pipeline is coded and deployed. **Blocked on manual setup:** run `aws-connections.sql`, create PlainCost AWS IAM user, add AWS env vars to Vercel, then test first real connection at `/admin/aws`.

Customer self-serve onboarding remains **Phase 4**.

---

## Task roadmap

Tasks are ordered by dependency. Complete earlier phases before starting later ones unless noted.

### Phase 1 — Landing page & hosting ✅ complete

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

### Phase 2 — Waitlist operations ✅ complete

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | Waitlist confirmation email | ✅ Done | Resend + `plaincost.ai` domain verified; live in production |
| 2.2 | Export / admin view for signups | ✅ Done | `/admin` login, table view, CSV export |
| 2.3 | Welcome email sequence (optional) | ⏸ Deferred | Not needed for MVP; add before broader marketing |

### Phase 3 — AWS connection & data pipeline

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | IAM role CloudFormation / setup guide | ✅ Done | `public/cloudformation/plaincost-readonly-role.yaml`, `/setup` |
| 3.2 | Cross-account role assumption (STS) | ✅ Done | `lib/aws/sts.ts` |
| 3.3 | Cost Explorer API integration | ✅ Done | 7-day spend, service breakdown, week-over-week delta |
| 3.4 | Compute Optimizer integration | ✅ Done | Basic rightsizing recommendations |
| 3.5 | Data models & storage for customer accounts | ✅ Done | `supabase/aws-connections.sql` — **SQL not yet run in prod** |
| 3.6 | Report generation engine | ✅ Done | `lib/reports/generate.ts`, snapshots in `cost_report_snapshots` |
| 3.7 | Plain-English narrative layer | 🔄 In progress | Template-based narratives in `lib/reports/generate.ts`; LLM optional later |
| 3.8 | PlainCost AWS IAM user + env vars | ⬜ Pending | Required before first real connection test |
| 3.9 | End-to-end connection test | ⬜ Pending | Create connection → deploy CF → validate → report preview |

### Phase 4 — Product app (post-waitlist)

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | User authentication | ⬜ Pending | Clerk, Auth.js, or similar |
| 4.2 | Onboarding flow (connect AWS account) | ⬜ Pending | Guided IAM setup in-app (admin flow exists for now) |
| 4.3 | Customer dashboard (optional v1) | ⬜ Pending | May defer; email-only MVP is viable |
| 4.4 | Weekly report scheduler | ⬜ Pending | Vercel Cron, Inngest, or AWS EventBridge |
| 4.5 | Email delivery for weekly reports | ⬜ Pending | Resend (already integrated for waitlist) |
| 4.6 | Sample report generator (waitlist perk) | 🔄 In progress | Admin report preview works; customer self-serve in Phase 4 |

### Phase 5 — Monetization & launch

| # | Task | Status | Notes |
|---|------|--------|-------|
| 5.1 | Pricing model & page | ⬜ Pending | Target: SMBs at $500–$5k/mo AWS spend |
| 5.2 | Stripe billing & subscriptions | ⬜ Pending | Decision point: after sample report, before ongoing weekly |
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
| ⏸ Deferred | Intentionally postponed |

---

## Decisions log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-07-03 | Host on Vercel | Native Next.js support, GitHub deploys, free tier for landing page |
| 2026-07-04 | Waitlist storage: Supabase | Free tier, same DB for product data, RLS insert-only policy |
| 2026-07-04 | Custom domain: `plaincost.ai` | Cloudflare DNS; CNAME to `fa53a9371db04fc3.vercel-dns-017.com` |
| 2026-07-04 | Primary URL: `plaincost.ai` | Apex domain; `www` → 308 redirect to apex |
| 2026-07-04 | Analytics: Vercel Web Analytics | Free on Hobby (50k events/mo); already on Vercel |
| 2026-07-07 | Email provider: Resend | Waitlist confirmation; reuse for weekly reports later |
| 2026-07-07 | Supabase secret key (`sb_secret_...`) | Preferred over legacy `service_role` JWT for admin reads |
| 2026-07-08 | Landing vs. confirmation email tone | Landing keeps short “free sample report” hook; confirmation email explains AWS setup + pricing |
| 2026-07-08 | Subscription model (MVP) | One free sample report after AWS connect; ongoing weekly reports are paid at founding-member pricing |
| 2026-07-08 | AWS access pattern | Customer deploys CloudFormation → `PlainCostReadOnly` role; PlainCost assumes via STS + External ID |
| — | Auth provider | **TBD** — needed at Phase 4 |
| — | Pricing amount | **TBD** — before Stripe (Phase 5) |

---

## Live URLs

| URL | Purpose |
|-----|---------|
| https://plaincost.ai | **Primary** — production landing page |
| https://plaincost.ai/setup | Customer AWS connection guide |
| https://plaincost.ai/admin | Admin login |
| https://plaincost.ai/admin/waitlist | Waitlist signups + CSV export |
| https://plaincost.ai/admin/aws | AWS connections + report preview |
| https://plaincost.ai/cloudformation/plaincost-readonly-role.yaml | Customer CloudFormation template |
| https://www.plaincost.ai | Redirects to apex |
| https://plaincost.vercel.app | Vercel default (still works) |

---

## Environment variables

| Variable | Purpose | Sensitive? |
|----------|---------|------------|
| `SUPABASE_URL` | Supabase project URL | No |
| `SUPABASE_PUBLISHABLE_KEY` | Waitlist inserts (RLS) | Optional |
| `SUPABASE_SECRET_KEY` | Admin reads, AWS connection storage | **Yes** |
| `WAITLIST_ADMIN_SECRET` | Admin dashboard password | **Yes** |
| `RESEND_API_KEY` | Transactional email | **Yes** |
| `RESEND_FROM_EMAIL` | Sender address (`hello@plaincost.ai`) | No |
| `PLAINCOST_AWS_ACCESS_KEY_ID` | PlainCost app IAM user | **Yes** |
| `PLAINCOST_AWS_SECRET_ACCESS_KEY` | PlainCost app IAM user | **Yes** |
| `PLAINCOST_AWS_ACCOUNT_ID` | PlainCost AWS account (server) | No |
| `NEXT_PUBLIC_PLAINCOST_AWS_ACCOUNT_ID` | PlainCost AWS account (CF links) | No |

---

## Session log

Reverse-chronological notes. Add an entry at the end of each working session.

### 2026-07-08

**Phase 2 finalized**
- Resend domain verified; confirmation emails live in production.
- Refined waitlist email copy: landing page keeps marketing hook; confirmation explains AWS setup (~5 min), one free sample report, and paid subscription for ongoing weekly reports.
- Admin waitlist dashboard (`/admin`) with CSV export; uses `SUPABASE_SECRET_KEY` + `WAITLIST_ADMIN_SECRET`.

**Phase 3 started**
- Implemented CloudFormation template, STS assume-role, Cost Explorer, Compute Optimizer, report generator.
- Added Supabase schema (`aws-connections.sql`), admin AWS dashboard (`/admin/aws`), customer setup page (`/setup`).
- Pushed commit `f69ebfc`.

**Not yet done (manual)**
- [ ] Run `supabase/aws-connections.sql` in Supabase SQL Editor
- [ ] Create PlainCost AWS IAM user with `sts:AssumeRole` on `PlainCostReadOnly`
- [ ] Add PlainCost AWS env vars to Vercel and redeploy
- [ ] Test: create connection → deploy CF stack → validate → generate report preview

**Next session:** Complete Phase 3 manual setup and first end-to-end connection test. Then Phase 4 (customer onboarding) or polish narratives (3.7).

### 2026-07-07

- Tightened Phase 2: password-protected admin at `/admin` with signup table, stats, and CSV export.
- Deferred optional welcome email sequence (2.3).

### 2026-07-06

- Added Vercel Web Analytics for pageviews and `Waitlist Signup` events.

### 2026-07-05

- Added favicon, Apple icon, and Open Graph social preview assets.

### 2026-07-04

- Deployed to Vercel; migrated waitlist to Supabase; configured `plaincost.ai` custom domain.

### 2026-07-03

- Built landing page; chose Vercel hosting; created GitHub repo.

---

## Quick reference

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (verified passing)
npm run lint
```

**Supabase SQL (run in order):**
1. `supabase/waitlist.sql`
2. `supabase/aws-connections.sql`

**DNS (Cloudflare):** CNAME `@` and `www` → `fa53a9371db04fc3.vercel-dns-017.com` (DNS only / grey cloud)