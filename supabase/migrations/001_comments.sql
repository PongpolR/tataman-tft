-- Comments table migration
-- Run this on production if comments feature was deployed before schema was applied.
-- Safe to re-run: uses IF NOT EXISTS / DROP POLICY IF EXISTS.

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
