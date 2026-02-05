-- SQL para adicionar os campos senha e data_nascimento à tabela associados
-- Execute no SQL Editor do Supabase

ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS senha TEXT;
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS data_nascimento DATE;