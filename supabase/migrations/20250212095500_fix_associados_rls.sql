-- Enable RLS on the table if not already enabled
ALTER TABLE public.associados ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts (optional, but safer for debugging)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.associados;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.associados;
DROP POLICY IF EXISTS "Users can update own profile" ON public.associados;

-- Create a policy that allows everyone to read everything (for debugging/fixing the issue)
-- In production, you might want to restrict this more, but for "Busca com foto", we need read access.
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.associados FOR SELECT 
USING (true);

-- Ensure authenticated users can insert/update (re-adding basic permissions)
CREATE POLICY "Users can insert their own profile" 
ON public.associados FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.associados FOR UPDATE 
USING (auth.uid() = id);

-- Grant usage on the schema and table to anon and authenticated roles just in case
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON TABLE public.associados TO anon, authenticated;
