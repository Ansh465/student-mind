-- =============================================================
-- Student Mind — Supabase Schema
-- Run this in your Supabase SQL Editor
-- =============================================================

-- PROFILES (linked to auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  visa_expiry_date date,
  weekly_hour_limit integer not null default 20,
  onboarding_complete boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- WORK LOGS
create table if not exists public.work_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  work_date date not null,
  hours numeric(4,2) not null check (hours > 0 and hours <= 24),
  notes text,
  created_at timestamptz not null default now()
);

alter table public.work_logs enable row level security;

create policy "Users can view own work logs"
  on public.work_logs for select
  using (auth.uid() = user_id);

create policy "Users can insert own work logs"
  on public.work_logs for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own work logs"
  on public.work_logs for delete
  using (auth.uid() = user_id);

-- BUDGETS
create table if not exists public.budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  month char(7) not null, -- format: YYYY-MM
  income numeric(10,2) not null default 0,
  rent numeric(10,2) not null default 0,
  food numeric(10,2) not null default 0,
  transport numeric(10,2) not null default 0,
  utilities numeric(10,2) not null default 0,
  other numeric(10,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, month)
);

alter table public.budgets enable row level security;

create policy "Users can view own budgets"
  on public.budgets for select
  using (auth.uid() = user_id);

create policy "Users can upsert own budgets"
  on public.budgets for insert
  with check (auth.uid() = user_id);

create policy "Users can update own budgets"
  on public.budgets for update
  using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
