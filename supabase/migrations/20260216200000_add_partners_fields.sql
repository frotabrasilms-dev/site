-- Adiciona as colunas novas na tabela parceiros se elas não existirem
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'parceiros' AND column_name = 'cnpj') THEN
        ALTER TABLE parceiros ADD COLUMN cnpj TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'parceiros' AND column_name = 'contato_nome') THEN
        ALTER TABLE parceiros ADD COLUMN contato_nome TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'parceiros' AND column_name = 'whatsapp') THEN
        ALTER TABLE parceiros ADD COLUMN whatsapp TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'parceiros' AND column_name = 'exibir_whatsapp') THEN
        ALTER TABLE parceiros ADD COLUMN exibir_whatsapp BOOLEAN DEFAULT FALSE;
    END IF;
END $$;
