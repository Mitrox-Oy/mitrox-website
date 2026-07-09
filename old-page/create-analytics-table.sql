-- SQL script to create the traffic_analytics table in Supabase
-- Run this in Supabase SQL Editor

create table if not exists public.traffic_analytics (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  language text not null,
  country text,
  city text,
  referrer text,
  user_agent text,
  timestamp timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- Create index for faster queries
create index if not exists idx_traffic_analytics_timestamp on public.traffic_analytics(timestamp desc);
create index if not exists idx_traffic_analytics_language on public.traffic_analytics(language);
create index if not exists idx_traffic_analytics_country on public.traffic_analytics(country);

-- Enable Row Level Security
alter table public.traffic_analytics enable row level security;

-- Allow anonymous users to insert (for tracking)
create policy "Allow anonymous inserts"
  on public.traffic_analytics
  for insert
  to anon
  with check (true);

-- Allow authenticated admins to read all data
create policy "Admins can read analytics"
  on public.traffic_analytics
  for select
  to authenticated
  using (
    lower(coalesce(auth.jwt()->'app_metadata'->>'role', '')) = 'admin'
    or 'admin' = any(string_to_array(coalesce(auth.jwt()->'app_metadata'->>'roles', ''), ','))
  );

-- Optional: Auto-cleanup old data (keep last 90 days)
-- Uncomment if you want automatic cleanup
-- create or replace function cleanup_old_analytics()
-- returns void
-- language plpgsql
-- as $$
-- begin
--   delete from public.traffic_analytics
--   where timestamp < now() - interval '90 days';
-- end;
-- $$;
--
-- -- Schedule cleanup (requires pg_cron extension)
-- -- select cron.schedule('cleanup-analytics', '0 2 * * *', 'select cleanup_old_analytics()');

