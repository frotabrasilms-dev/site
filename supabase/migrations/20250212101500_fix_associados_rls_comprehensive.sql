-- Comprehensive fix for RLS and Permissions
-- Run this in the Supabase SQL Editor

-- 1. Ensure the schema is accessible
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- 2. Grant SELECT access to the specific table for both roles
GRANT SELECT ON TABLE public.associados TO anon, authenticated;

-- 3. Enable RLS (if not already)
ALTER TABLE public.associados ENABLE ROW LEVEL SECURITY;

-- 4. Drop potentially conflicting policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.associados;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.associados;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.associados;

-- 5. Create a definitive permissive policy for SELECT
CREATE POLICY "Enable read access for all users"
ON public.associados FOR SELECT
USING (true);

-- 6. Verify policy for INSERT/UPDATE (optional but good for completeness)
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.associados;
CREATE POLICY "Users can insert their own profile"
ON public.associados FOR INSERT
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.associados;
CREATE POLICY "Users can update own profile"
ON public.associados FOR UPDATE
USING (auth.uid() = id);

-- 7. (Critical) Force a refresh of the schema cache if possible, though usually automatic.
-- Just commenting to note that sometimes Supabase needs a moment.
