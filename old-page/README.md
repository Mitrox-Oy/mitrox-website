# Mitrox Oy — Website Repository

> **Teknologia, joka tuntuu luonnolliselta.**

This repository contains the source for the public website at **mitrox.io**.

---

## 🚀 Overview

Mitrox Oy is a Finnish technology company. This repo holds the code and content used to build and deploy the marketing site.

* **Production site:** [https://mitrox.io/](https://mitrox.io/)
* **Primary language:** Finnish (with support for English copy if/when added)
* **Audience:** Prospective customers, partners, and recruits
---

## 🧭 Sitemap (public)

* Home (`/`) — company value proposition & hero
* Services/Offerings — what we build and how we work
* About/Company — who we are
* Contact — how to reach us
* Blog (`/fi/blogi`, `/en/blog`) — insights and articles powered by Supabase

---

## 📝 Blog & Admin Dashboard

* **Public blog**
  * Finnish: `/fi/blogi`
  * English: `/en/blog`
  * Article detail routes follow `/fi/blogi/:slug` and `/en/blog/:slug`.
  * Content is fetched from the `blog_posts` table in Supabase (only `status = 'published'` is exposed).

* **Admin dashboard**
  * Served at `/admin` and excluded from indexing.
  * Uses Supabase email/password auth with mandatory multi-factor (TOTP) support.
  * Only users with `app_metadata.role = 'admin'` or `app_metadata.roles` containing `admin` are allowed access. Non-admin users are signed out immediately.
  * **Features:**
    * **Dashboard view**: Overview with statistics (total posts, published/draft counts, language breakdown, recent posts)
    * **Blog management**: Create, edit, delete, and publish/unpublish blog posts with secure image upload
    * **Profile management**: Upload profile picture (displayed in blog posts) and change password
    * **Traffic Analytics**: Real-time visitor tracking with location, language, and page view statistics
    * **Navigation**: Switch between Dashboard, Blog Management, Traffic Analytics, and Profile sections
    * All changes are audited via Supabase Row Level Security.

---

## 🔐 Supabase Configuration

1. **Environment variables**
   * Add the following to your `.env` / deployment secrets:
     ```bash
     VITE_SUPABASE_URL=your-project-url
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```
   * Never commit the service role key. The frontend only needs the anon key.

2. **Database schema**
   ```sql
   create table if not exists public.blog_posts (
     id uuid primary key default gen_random_uuid(),
     title text not null,
     slug text not null unique,
     excerpt text,
     content text,
     cover_image_url text,
     language text not null check (language in ('fi', 'en')),
     status text not null check (status in ('draft', 'published')),
     author_name text,
     created_by uuid references auth.users(id),
     published_at timestamptz,
     created_at timestamptz not null default now(),
     updated_at timestamptz not null default now()
   );

   create trigger handle_blog_posts_updated_at
   before update on public.blog_posts
   for each row execute function public.set_updated_at();
   ```

3. **Row Level Security**
   ```sql
   alter table public.blog_posts enable row level security;

   -- Allow admins to read/write everything
   create policy "Admins manage blog posts"
     on public.blog_posts
     for all
     to authenticated
     using (
       lower(coalesce(auth.jwt()->'app_metadata'->>'role', '')) = 'admin'
       or 'admin' = any(string_to_array(coalesce(auth.jwt()->'app_metadata'->>'roles', ''), ','))
     )
     with check (
       lower(coalesce(auth.jwt()->'app_metadata'->>'role', '')) = 'admin'
       or 'admin' = any(string_to_array(coalesce(auth.jwt()->'app_metadata'->>'roles', ''), ','))
     );

   -- Allow anonymous visitors to read published posts by language
   create policy "Public read published posts"
     on public.blog_posts
     for select
     using (status = 'published');
   ```

4. **Auth security**
   * Enforce **email confirmations** and **TOTP MFA** for admin accounts inside Supabase Auth settings.
   * Restrict dashboard domain in **Redirect URLs** to prevent phishing.
   * Use Supabase logs/audit trails to monitor changes.

5. **Storage buckets (for profile pictures and blog images)**
   * Go to **Storage** in your Supabase dashboard.
   * Create two buckets:
     * **`profiles`** — for admin profile pictures
     * **`blog-images`** — for blog post cover images
   * For each bucket, set the following:
     * **Public bucket**: Yes (for `profiles` and `blog-images`)
     * **File size limit**: 5MB for `profiles`, 10MB for `blog-images`
     * **Allowed MIME types**: `image/*`
   
   **Storage RLS Policies:**
   ```sql
   -- Allow authenticated admins to upload/update their own profile picture
   create policy "Admins can upload profile pictures"
     on storage.objects
     for insert
     to authenticated
     with check (
       bucket_id = 'profiles'
       and (storage.foldername(name))[1] = auth.uid()::text
       and (
         lower(coalesce(auth.jwt()->'app_metadata'->>'role', '')) = 'admin'
         or 'admin' = any(string_to_array(coalesce(auth.jwt()->'app_metadata'->>'roles', ''), ','))
       )
     );

   create policy "Admins can update their profile pictures"
     on storage.objects
     for update
     to authenticated
     using (
       bucket_id = 'profiles'
       and (storage.foldername(name))[1] = auth.uid()::text
       and (
         lower(coalesce(auth.jwt()->'app_metadata'->>'role', '')) = 'admin'
         or 'admin' = any(string_to_array(coalesce(auth.jwt()->'app_metadata'->>'roles', ''), ','))
       )
     );

   -- Allow public read access to profile pictures
   create policy "Public can read profile pictures"
     on storage.objects
     for select
     using (bucket_id = 'profiles');

   -- Allow authenticated admins to upload blog images
   create policy "Admins can upload blog images"
     on storage.objects
     for insert
     to authenticated
     with check (
       bucket_id = 'blog-images'
       and (
         lower(coalesce(auth.jwt()->'app_metadata'->>'role', '')) = 'admin'
         or 'admin' = any(string_to_array(coalesce(auth.jwt()->'app_metadata'->>'roles', ''), ','))
       )
     );

   -- Allow public read access to blog images
   create policy "Public can read blog images"
     on storage.objects
     for select
     using (bucket_id = 'blog-images');
   ```

6. **Traffic Analytics table**
   ```sql
   -- Run the SQL from create-analytics-table.sql to create the traffic_analytics table
   -- This table stores visitor data: path, language, country, city, referrer, user_agent, timestamp
   -- Anonymous users can insert (for tracking), only admins can read
   ```
   * The analytics tracker automatically records page views when users consent to analytics.
   * Data includes: page path, selected language, country/city (from IP geolocation), referrer, and user agent.
   * View analytics in the admin dashboard under the "Traffic Analytics" tab.

---
---
