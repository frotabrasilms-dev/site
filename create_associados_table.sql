-- Script SQL para criar a tabela 'associados' no Supabase
-- Execute este script no SQL Editor do Supabase

CREATE TABLE IF NOT EXISTS public.associados (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nome TEXT NOT NULL,
  cpf TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  telefone TEXT,
  cep TEXT,
  logradouro TEXT,
  bairro TEXT,
  cidade TEXT,
  estado TEXT,
  numero_imovel TEXT,
  apelido TEXT,
  numero_associado TEXT,
  nomeado BOOLEAN DEFAULT FALSE,
  nomeacao TEXT,
  observacao TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Habilita a Segurança em Nível de Linha (RLS)
ALTER TABLE public.associados ENABLE ROW LEVEL SECURITY;

-- Cria políticas de acesso
-- Política para inserção pública (para o formulário de associação)
CREATE POLICY "Allow public insert for associados"
ON public.associados FOR INSERT WITH CHECK (true);