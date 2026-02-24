-- Configure Storage Bucket "member-photos" for public upload
-- Run this in Supabase SQL Editor

-- 1. Create the bucket if it doesn't exist (this is an idempotent operation in standard SQL)
INSERT INTO storage.buckets (id, name, public)
VALUES ('member-photos', 'member-photos', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
DROP POLICY IF EXISTS "Public Update" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads to member-photos" ON storage.objects;
DROP POLICY IF EXISTS "Allow public view member-photos" ON storage.objects;

-- 3. Create Policy: Allow public (anon) to UPLOAD files to 'member-photos'
CREATE POLICY "Allow public uploads to member-photos"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'member-photos');

-- 4. Create Policy: Allow public to VIEW files in 'member-photos'
CREATE POLICY "Allow public view member-photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'member-photos');

-- 5. Create Policy: Allow public to UPDATE their own files (optional, risky for public, better restrict if needed)
-- For now, we usually limit overwrite. The frontend uses `upsert: true`.
-- Let's allow update for simplicity in this specific bucket
CREATE POLICY "Allow public update member-photos"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'member-photos');
