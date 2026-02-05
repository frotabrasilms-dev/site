-- Script SQL para adicionar novos campos à tabela 'associados' existente no Supabase
-- Execute este script no SQL Editor do Supabase

-- Adiciona os novos campos
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS apelido TEXT;
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS numero_associado TEXT;
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS nomeado BOOLEAN DEFAULT FALSE;
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS nomeacao TEXT;
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS observacao TEXT;
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS senha TEXT;
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS data_nascimento DATE;