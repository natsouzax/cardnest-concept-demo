create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null,
  category text not null,
  set_name text,
  pack_count integer check (pack_count > 0),
  price_pence integer not null check (price_pence >= 0),
  compare_at_pence integer check (compare_at_pence >= 0),
  summary text,
  source_url text,
  image_path text,
  image_credit text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.products force row level security;
-- Explicit grants: do not depend on project-specific default privileges.
revoke all on table public.products from public, anon, authenticated;
grant usage on schema public to anon;
grant select on table public.products to anon;
create policy "Read published products only"
  on public.products for select to anon
  using (status = 'published');

-- No client INSERT/UPDATE/DELETE policies, no orders, no stock and no storage bucket.
comment on table public.products is 'Independent concept catalogue. Status controls visibility, never availability.';
