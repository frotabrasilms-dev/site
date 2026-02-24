-- Add new columns to parceiros table
ALTER TABLE parceiros
ADD COLUMN IF NOT EXISTS cnpj TEXT,
ADD COLUMN IF NOT EXISTS contato_nome TEXT,
ADD COLUMN IF NOT EXISTS whatsapp TEXT,
ADD COLUMN IF NOT EXISTS exibir_whatsapp BOOLEAN DEFAULT FALSE;
