# PlainCost Insights

A simple self-serve SaaS tool that automatically generates plain-English AWS cost optimization reports and basic recommendations for non-technical SMBs.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Waitlist

Email signups are stored in Supabase (`waitlist_signups` table).

### Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase dashboard, open **SQL Editor** and run `supabase/waitlist.sql`.
3. Copy credentials from **Settings → API Keys**:
   - **Project URL** → `SUPABASE_URL`
   - **Publishable key** (`sb_publishable_...`) → `SUPABASE_PUBLISHABLE_KEY`
4. Add both to `.env.local` for local dev (see `.env.example`).
5. Add the same variables in Vercel: **Project → Settings → Environment Variables**, then redeploy.

### Confirmation emails (Resend)

1. Create a free account at [resend.com](https://resend.com).
2. **Domains → Add Domain** → enter `plaincost.ai`.
3. Add the DNS records Resend shows in **Cloudflare** (usually DKIM + SPF). Wait for verification.
4. **API Keys → Create API Key** → copy the key.
5. Add to Vercel (and `.env.local` for local dev):
   - `RESEND_API_KEY` — mark **Sensitive**
   - `RESEND_FROM_EMAIL` — e.g. `PlainCost Insights <hello@plaincost.ai>`
6. Redeploy.

Signups still save if email is not configured; confirmation email is sent when Resend env vars are set.