-- Migration to make numero_associado auto-generated based on ID + 130000

-- First drop the existing column if it exists to clean up old data/type
ALTER TABLE IF EXISTS public.associados DROP COLUMN IF EXISTS numero_associado;

-- Re-add it as a generated column. CAST to TEXT to match previous schema if needed, or keeping as BIGINT if preferred.
-- User prompt said "numero_associado será o ID que esta sendo criado mais a soma de 130000".
-- Usually IDs are numbers. But previous code treated it as string in some places.
-- Let's make it TEXT to be safe with existing frontend expectations of string, or BIGINT.
-- The previous schema had `numero_associado TEXT`.
-- To be safe and compatible:
ALTER TABLE public.associados 
ADD COLUMN numero_associado TEXT 
GENERATED ALWAYS AS ((id + 130000)::text) STORED;
