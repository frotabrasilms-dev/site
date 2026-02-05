-- Script SQL para criar a tabela 'parceiros' no Supabase
-- Execute este script no SQL Editor do Supabase

CREATE TABLE IF NOT EXISTS public.parceiros (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nome TEXT NOT NULL,
  imagem TEXT,
  endereco TEXT,
  site TEXT,
  observacao TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Habilita a Segurança em Nível de Linha (RLS)
ALTER TABLE public.parceiros ENABLE ROW LEVEL SECURITY;

-- Cria políticas de acesso
-- Política para leitura pública
CREATE POLICY "Public read access for partners"
ON public.parceiros FOR SELECT USING (true);

-- Política para inserção pública
CREATE POLICY "Allow public insert for partners"
ON public.parceiros FOR INSERT WITH CHECK (true);