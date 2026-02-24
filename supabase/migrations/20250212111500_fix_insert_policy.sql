-- Fix RLS policy to allow public registration
-- The previous policy (auth.uid() = id) blocked new registrations because users are not logged in yet.

-- 1. Drop the restrictive INSERT policy
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.associados;

-- 2. Create a permissive INSERT policy for public registration
CREATE POLICY "Allow public registration"
ON public.associados FOR INSERT
TO public
WITH CHECK (true);

-- 3. Ensure UPDATE is still protected (users can only update their own)
-- (This was already set correctly, but good to double check)
-- DROP POLICY IF EXISTS "Users can update own profile" ON public.associados;
-- CREATE POLICY "Users can update own profile"
-- ON public.associados FOR UPDATE
-- USING (auth.uid() = id OR id::text = current_setting('request.jwt.claim.sub', true)); 
-- Note: complex update logic might be needed depending on how auth is handled, keeping it simple for now.
