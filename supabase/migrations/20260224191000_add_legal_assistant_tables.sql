-- Adiciona campos de CNH e Veículo à tabela associados
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS cnh TEXT;
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS categoria_cnh TEXT;
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS pontuacao_cnh INTEGER DEFAULT 0;
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS placa_veiculo TEXT;
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS renavam TEXT;

-- Cria a tabela de infrações
CREATE TABLE IF NOT EXISTS public.infracoes (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    associado_id BIGINT REFERENCES public.associados(id) ON DELETE CASCADE,
    numero_auto TEXT,
    orgao_autuador TEXT,
    data_infracao DATE,
    data_notificacao DATE,
    artigo_ctb TEXT,
    local TEXT,
    tipo TEXT,
    status TEXT DEFAULT 'Análise' CHECK (status IN ('Análise', 'Pendente', 'Gerado', 'Enviado', 'Deferido', 'Indeferido')),
    analise_ia JSONB,
    documento_url TEXT,
    recurso_texto TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Habilita RLS para a tabela de infrações
ALTER TABLE public.infracoes ENABLE ROW LEVEL SECURITY;

-- Políticas para associados verem apenas suas próprias infrações
-- Nota: Como o sistema usa o CPF/ID no localStorage, a política deve ser baseada no ID do associado.
-- Para simplificar o desenvolvimento inicial (seguindo o padrão atual do projeto), permitiremos select/insert/update público filtrado pelo associado_id.

CREATE POLICY "Associados podem ver suas próprias infrações"
ON public.infracoes FOR SELECT
USING (true); -- No app, filtraremos por associado_id

CREATE POLICY "Associados podem inserir suas infrações"
ON public.infracoes FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Associados podem atualizar suas infrações"
ON public.infracoes FOR UPDATE
USING (true);
