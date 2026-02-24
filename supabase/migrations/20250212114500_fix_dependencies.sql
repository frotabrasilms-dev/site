-- Ensure essential columns and data exist to prevent foreign key errors
-- Run this in Supabase SQL Editor

-- 1. Ensure columns exist (safeguard)
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS foto_url TEXT;
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS supervisor TEXT;

-- 2. Create a "Fallback Supervisor" (000) if it doesn't exist
-- This is needed if the app defaults to '000' and there is a Foreign Key constraint.
-- We use a dummy CPF/Email to satisfy UNIQUE constraints.
INSERT INTO public.associados (nome, cpf, email, senha, numero_associado, supervisor)
VALUES ('Supervisor Padrão', '00000000000', 'sistema@admin.com', '123456', '000', '000')
ON CONFLICT (cpf) DO NOTHING;

-- 3. Ensure the '000' supervisor has the correct number (in case it was auto-generated differently)
UPDATE public.associados 
SET numero_associado = '000' 
WHERE cpf = '00000000000';

-- 4. Fix Sequence (optional, just in case IDs are out of sync)
-- SELECT setval(pg_get_serial_sequence('public.associados', 'id'), COALESCE(MAX(id), 1) + 1, false) FROM public.associados;
