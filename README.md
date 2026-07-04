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
3. Copy credentials from **Settings → API**:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_ANON_KEY`
4. Add both to `.env.local` for local dev (see `.env.example`).
5. Add the same variables in Vercel: **Project → Settings → Environment Variables**, then redeploy.