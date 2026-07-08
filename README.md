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

### Waitlist admin

1. In Supabase **Settings → API Keys**, copy the **secret** key (`sb_secret_...`). Use this instead of the legacy `service_role` key.
2. Choose a strong `WAITLIST_ADMIN_SECRET` password.
3. Add both to Vercel (mark `SUPABASE_SECRET_KEY` and `WAITLIST_ADMIN_SECRET` as **Sensitive**).
4. Open `https://plaincost.ai/admin`, sign in, and use **Export CSV** as needed.

## AWS connections (Phase 3)

### Database

Run `supabase/aws-connections.sql` in the Supabase SQL Editor.

### PlainCost AWS credentials

PlainCost needs an IAM user in **your** AWS account with permission to call `sts:AssumeRole` on customer roles.

1. Create an IAM user (e.g. `plaincost-app`) with this policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sts:AssumeRole",
      "Resource": "arn:aws:iam::*:role/PlainCostReadOnly"
    }
  ]
}
```

2. Add to Vercel (all **Sensitive** except the public account ID):

- `PLAINCOST_AWS_ACCESS_KEY_ID`
- `PLAINCOST_AWS_SECRET_ACCESS_KEY`
- `PLAINCOST_AWS_ACCOUNT_ID`
- `NEXT_PUBLIC_PLAINCOST_AWS_ACCOUNT_ID` (same 12-digit account ID, used in setup links)

### Admin workflow

1. Open `https://plaincost.ai/admin/aws`
2. **Create connection** → copy the External ID (or send the CloudFormation link)
3. Customer deploys `public/cloudformation/plaincost-readonly-role.yaml`
4. Paste the Role ARN → **Validate connection** → **Generate report preview**

Customer-facing setup guide: `https://plaincost.ai/setup`