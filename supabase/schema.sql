-- Tataman TFT — Supabase schema
-- Run this in Supabase Dashboard → SQL Editor

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
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

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
  with check (bucket_id = 'post-images' and auth.role() = 'authenticated');

drop policy if exists "Authenticated update post images" on storage.objects;
create policy "Authenticated update post images"
  on storage.objects for update
  using (bucket_id = 'post-images' and auth.role() = 'authenticated');

drop policy if exists "Authenticated delete post images" on storage.objects;
create policy "Authenticated delete post images"
  on storage.objects for delete
  using (bucket_id = 'post-images' and auth.role() = 'authenticated');
