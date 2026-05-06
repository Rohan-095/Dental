-- Patients
create table patients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text unique not null,
  email text,
  date_of_birth text,
  notes text,
  created_at timestamptz default now()
);

-- Appointments
create table appointments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references patients(id),
  patient_name text not null,
  phone text not null,
  email text,
  service text not null,
  date text not null,
  time text not null,
  status text default 'scheduled', -- scheduled | confirmed | cancelled | completed | no_show
  notes text,
  booked_via text default 'ai', -- ai | manual | web
  calendar_event_id text,
  created_at timestamptz default now()
);

-- Call Logs
create table calls (
  id uuid primary key default gen_random_uuid(),
  vapi_call_id text unique,
  patient_name text,
  phone text,
  direction text, -- inbound | outbound
  duration_seconds int,
  outcome text, -- booked | cancelled | callback | no_answer | other
  transcript text,
  summary text,
  appointment_id uuid references appointments(id),
  created_at timestamptz default now()
);

-- SMS Logs
create table sms_logs (
  id uuid primary key default gen_random_uuid(),
  to_phone text not null,
  body text not null,
  type text, -- confirmation | reminder | cancellation
  status text default 'sent',
  appointment_id uuid references appointments(id),
  created_at timestamptz default now()
);

-- Indexes
create index on appointments(phone);
create index on appointments(date);
create index on appointments(status);
create index on calls(phone);
create index on patients(phone);
