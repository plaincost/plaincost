-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.waitlist_signups enable row level security;

-- Allow inserts from the anon key (used server-side by the API route).
-- No SELECT policy: emails cannot be read with the public anon key.
create policy "Allow anonymous waitlist signups"
  on public.waitlist_signups
  for insert
  to anon
  with check (true);