-- Adiciona mais campos à tabela 'associados'
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS senha TEXT;
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS data_nascimento DATE;