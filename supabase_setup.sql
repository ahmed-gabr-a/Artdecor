-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Projects Table
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  category text not null, -- 'residential', 'commercial', 'restaurant', 'hospitality'
  image_url text not null,
  description text,
  details text,
  year text,
  location text
);

-- Content Blocks Table (for "About", "Contact" text etc.)
create table public.content_blocks (
  id uuid default uuid_generate_v4() primary key,
  key text unique not null, -- e.g. 'home_hero_title', 'about_mission'
  content text not null,
  section text -- e.g. 'home', 'about', 'contact'
);

-- Enable Row Level Security (RLS)
alter table public.projects enable row level security;
alter table public.content_blocks enable row level security;

-- Policies
-- 1. Public Read Access (Anyone can view projects and content)
create policy "Public projects are viewable by everyone" 
on public.projects for select using (true);

create policy "Public content is viewable by everyone" 
on public.content_blocks for select using (true);

-- 2. Admin Write Access (Only authenticated users can edit)
-- Since we are using a simple hardcoded admin for now, we will technically key off the
-- service role key for writes in the backend, OR we can set up simple email auth.
-- For this "hardcoded" request, the simplest way to secure the DB writes from the
-- client side is to require authentication.
-- However, we will likely use the Supabase Service Key in our API routes for full control,
-- or just allow anon writes IF strict RLS is not required by user (NOT RECOMMENDED).
-- BETTER: We will instruct the user to ENABLE EMAIL AUTH in Supabase and we can sign them in?
-- NO, user asked for "Secure login page... hardcoded email".
-- SO: We will use the SERVICE_ROLE_KEY in our Next.js API routes (protected by NextAuth) 
-- to write to Supabase. This keeps Supabase secure (no public writes).
-- So no "insert/update" policies needed for "anon" role.

-- Initial Data Seeding (Optional - Migrating from data.ts)
-- You can run this after setting up to populate some initial data if needed.

-- STORAGE SETUP
-- Create a public bucket for project images
insert into storage.buckets (id, name, public) values ('projects', 'projects', true);

-- Policy to allow public read access to images
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'projects' );

-- Policy to allow authenticated uploads (Admin)
create policy "Authenticated Uploads"
  on storage.objects for insert
  to authenticated
  with check ( bucket_id = 'projects' );

