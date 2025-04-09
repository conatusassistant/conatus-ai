-- Enable vector extension
create extension if not exists vector;

-- Create tables
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null unique,
  plan text default 'free',
  stripe_customer_id text,
  persona_vector jsonb default '{}',
  emotional_vector jsonb default '{}',
  created_at timestamp with time zone default now()
);

create table if not exists messages(
  id bigserial primary key,
  user_id uuid references auth.users on delete cascade not null,
  conversation_id uuid,
  role text,
  content text,
  embedding vector(1536),
  metadata jsonb,
  created_at timestamp with time zone default now()
);

create index on messages using hnsw (embedding vector_l2_ops);

create table if not exists feed_items(
  id bigserial primary key,
  user_id uuid references auth.users on delete cascade not null,
  platform text,
  title text,
  body text,
  embedding vector(1536),
  link text,
  popularity int default 0,
  timestamp timestamp,
  created_at timestamp with time zone default now()
);

create table if not exists integrations(
  id bigserial primary key,
  user_id uuid references auth.users on delete cascade not null,
  service_name text,
  composio_connection_id text,
  status text default 'inactive',
  created_at timestamp with time zone default now()
);

create table if not exists emotional_history(
  id bigserial primary key,
  user_id uuid references auth.users on delete cascade not null,
  message_id bigint references messages(id) on delete cascade,
  emotion_state text,
  intent text,
  last_updated timestamp with time zone default now()
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table messages enable row level security;
alter table feed_items enable row level security;
alter table integrations enable row level security;
alter table emotional_history enable row level security;

-- Create RLS policies
create policy "profiles_rls"
on profiles for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "messages_rls"
on messages for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "feed_items_rls"
on feed_items for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "integrations_rls"
on integrations for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "emotional_history_rls"
on emotional_history for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Create trigger to create profile on user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (user_id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();