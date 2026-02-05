-- Adiciona novos campos à tabela 'associados'
ALTER TABLE public.associados ADD COLUMN numero_associado TEXT;
ALTER TABLE public.associados ADD COLUMN nomeado BOOLEAN DEFAULT FALSE;
ALTER TABLE public.associados ADD COLUMN nomeacao TEXT;
ALTER TABLE public.associados ADD COLUMN observacao TEXT;