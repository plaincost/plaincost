-- Run in Supabase SQL Editor after waitlist.sql

create table if not exists public.aws_account_connections (
  id uuid primary key default gen_random_uuid(),
  contact_email text,
  aws_account_id text,
  role_arn text,
  external_id text not null unique,
  status text not null default 'pending'
    check (status in ('pending', 'active', 'error', 'revoked')),
  last_validated_at timestamptz,
  validation_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cost_report_snapshots (
  id uuid primary key default gen_random_uuid(),
  connection_id uuid not null references public.aws_account_connections (id) on delete cascade,
  period_start date not null,
  period_end date not null,
  report_data jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists cost_report_snapshots_connection_id_idx
  on public.cost_report_snapshots (connection_id, created_at desc);

alter table public.aws_account_connections enable row level security;
alter table public.cost_report_snapshots enable row level security;

-- No public policies: access via Supabase secret key on the server only.