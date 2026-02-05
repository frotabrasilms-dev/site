-- Garante que as políticas RLS para a tabela 'parceiros' estejam criadas

-- Habilita RLS se não estiver habilitado
ALTER TABLE public.parceiros ENABLE ROW LEVEL SECURITY;

-- Remove políticas existentes se houver
DROP POLICY IF EXISTS "Public read access for partners" ON public.parceiros;
DROP POLICY IF EXISTS "Allow public insert for partners" ON public.parceiros;

-- Cria política para leitura pública
CREATE POLICY "Public read access for partners"
ON public.parceiros FOR SELECT USING (true);

-- Cria política para inserção pública
CREATE POLICY "Allow public insert for partners"
ON public.parceiros FOR INSERT WITH CHECK (true);