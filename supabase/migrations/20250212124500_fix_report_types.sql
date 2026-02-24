-- Fix RPC function Report to use correct types (BigInt for ID)
-- Also ensuring the return type matches the query 100%

DROP FUNCTION IF EXISTS get_associados_report(text, boolean);

CREATE OR REPLACE FUNCTION get_associados_report(
    filter_estado text DEFAULT 'todos',
    include_photo boolean DEFAULT false
)
RETURNS TABLE (
    id bigint,  -- Changed from uuid to bigint
    nome text,
    numero_associado text,
    estado text,
    cidade text,
    created_at timestamptz,
    foto_url text,
    cpf text,
    has_photo boolean
)
SECURITY DEFINER
SET search_path = public, extensions
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        a.nome,
        a.numero_associado,
        a.estado,
        a.cidade,
        a.created_at,
        CASE WHEN include_photo THEN a.foto_url ELSE NULL END,
        CASE WHEN include_photo THEN NULL ELSE a.cpf END,
        (a.foto_url IS NOT NULL AND a.foto_url <> '') -- Calculado no banco
    FROM 
        public.associados a
    WHERE 
        (filter_estado = 'todos' OR a.estado = filter_estado)
    ORDER BY 
        a.created_at ASC;
END;
$$ LANGUAGE plpgsql;

GRANT EXECUTE ON FUNCTION get_associados_report(text, boolean) TO anon, authenticated;
