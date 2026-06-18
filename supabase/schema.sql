-- Tataman TFT — Supabase schema
-- Run this in Supabase Dashboard → SQL Editor

-- Admin check (hardcoded admin email)
create or replace function is_admin()
returns boolean as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) = 'pongpol.yy55@gmail.com';
$$ language sql stable security definer;

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text not null default '',
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  header text default '',
  header_desc jsonb default '[]'::jsonb,
  body jsonb default '[]'::jsonb,
  img text,
  img_desc text default '',
  body2 jsonb default '[]'::jsonb,
  img2 text,
  img2_desc text default '',
  summary jsonb default '[]'::jsonb,
  ref jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists posts_slug_idx on posts (slug);
create index if not exists posts_status_published_at_idx on posts (status, published_at desc);

alter table posts enable row level security;

drop policy if exists "Public can read published posts" on posts;
create policy "Public can read published posts"
  on posts for select
  using (status = 'published');

drop policy if exists "Admin full access" on posts;
create policy "Admin full access"
  on posts for all
  using (is_admin())
  with check (is_admin());

-- Profiles
alter table profiles enable row level security;

drop policy if exists "Users can read all profiles" on profiles;
create policy "Users can read all profiles"
  on profiles for select
  using (true);

drop policy if exists "Users can insert own profile" on profiles;
create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on profiles;
create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Comments
create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null check (char_length(content) between 1 and 2000),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists comments_post_id_idx on comments (post_id, created_at desc);

alter table comments enable row level security;

drop policy if exists "Anyone can read comments on published posts" on comments;
create policy "Anyone can read comments on published posts"
  on comments for select
  using (
    exists (
      select 1 from posts
      where posts.id = comments.post_id
      and posts.status = 'published'
    )
  );

drop policy if exists "Authenticated users can comment" on comments;
create policy "Authenticated users can comment"
  on comments for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own comments" on comments;
create policy "Users can delete own comments"
  on comments for delete
  using (auth.uid() = user_id);

drop policy if exists "Users can update own comments" on comments;
create policy "Users can update own comments"
  on comments for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    split_part(new.email, '@', 1)
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Storage bucket for post images
insert into storage.buckets (id, name, public)
values ('post-images', 'post-images', true)
on conflict (id) do nothing;

drop policy if exists "Public read post images" on storage.objects;
create policy "Public read post images"
  on storage.objects for select
  using (bucket_id = 'post-images');

drop policy if exists "Authenticated upload post images" on storage.objects;
create policy "Authenticated upload post images"
  on storage.objects for insert
  with check (bucket_id = 'post-images' and is_admin());

drop policy if exists "Authenticated update post images" on storage.objects;
create policy "Authenticated update post images"
  on storage.objects for update
  using (bucket_id = 'post-images' and is_admin());

drop policy if exists "Authenticated delete post images" on storage.objects;
create policy "Authenticated delete post images"
  on storage.objects for delete
  using (bucket_id = 'post-images' and is_admin());
