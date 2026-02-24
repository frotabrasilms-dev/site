-- Make numero_associado automatically generated based on ID
-- This ensures every new member gets a number = 130000 + ID

-- 1. Drop the column (if it exists as a normal column) to recreate it as generated
-- WARNING: This drops existing numbers!
-- Alternatives: 
-- A) Update existing NULLs then add logic. 
-- B) Convert column to generated.

-- Better approach:
-- 1. Update existing nulls so they aren't empty (optional, but good for consistency)
UPDATE public.associados 
SET numero_associado = (id + 130000)::text 
WHERE numero_associado IS NULL OR numero_associado = '-';

-- 2. Drop the standard column and add the generated definition
-- We use a transaction to be safe
BEGIN;

    ALTER TABLE public.associados DROP COLUMN numero_associado;

    ALTER TABLE public.associados 
    ADD COLUMN numero_associado TEXT 
    GENERATED ALWAYS AS ((id + 130000)::text) STORED;

COMMIT;
