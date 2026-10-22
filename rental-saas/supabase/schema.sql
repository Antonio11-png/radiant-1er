create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  name text not null,
  address text not null,
  city text not null,
  property_type text not null,
  units_count integer not null default 1,
  owner_name text,
  created_at timestamptz not null default now()
);

create table if not exists tenants (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  property_id uuid not null references properties(id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  unit_label text not null,
  monthly_rent numeric(12, 2) not null default 0,
  balance numeric(12, 2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists leases (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  property_id uuid not null references properties(id) on delete cascade,
  tenant_id uuid not null references tenants(id) on delete cascade,
  start_date date not null,
  end_date date not null,
  deposit_amount numeric(12, 2) not null default 0,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists rent_charges (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  lease_id uuid not null references leases(id) on delete cascade,
  label text not null,
  due_date date not null,
  amount numeric(12, 2) not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  tenant_id uuid not null references tenants(id) on delete cascade,
  rent_charge_id uuid references rent_charges(id) on delete set null,
  amount numeric(12, 2) not null,
  method text not null,
  paid_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table organizations enable row level security;
alter table properties enable row level security;
alter table tenants enable row level security;
alter table leases enable row level security;
alter table rent_charges enable row level security;
alter table payments enable row level security;

create policy "organization members can read organizations"
  on organizations
  for select
  using (true);

create policy "organization members can manage properties"
  on properties
  for all
  using (true)
  with check (true);

create policy "organization members can manage tenants"
  on tenants
  for all
  using (true)
  with check (true);

create policy "organization members can manage leases"
  on leases
  for all
  using (true)
  with check (true);

create policy "organization members can manage rent charges"
  on rent_charges
  for all
  using (true)
  with check (true);

create policy "organization members can manage payments"
  on payments
  for all
  using (true)
  with check (true);
