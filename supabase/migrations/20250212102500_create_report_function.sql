-- Function to fetch associates for the report, bypassing RLS
-- Run this in Supabase SQL Editor

CREATE OR REPLACE FUNCTION get_associados_report(
    filter_estado text DEFAULT 'todos',
    include_photo boolean DEFAULT false
)
RETURNS TABLE (
    id uuid,
    nome text,
    numero_associado text,
    estado text,
    cidade text,
    created_at timestamptz,
    foto_url text,
    cpf text
)
SECURITY DEFINER -- This makes the function run with the privileges of the creator (postgres/admin), bypassing RLS
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
        CASE WHEN include_photo THEN a.foto_url ELSE NULL END as foto_url,
        CASE WHEN include_photo THEN NULL ELSE a.cpf END as cpf -- Return CPF only when photo is NOT requested (matching the "no-image" logic)
    FROM 
        public.associados a
    WHERE 
        (filter_estado = 'todos' OR a.estado = filter_estado)
    ORDER BY 
        a.created_at ASC;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission to anon and authenticated
GRANT EXECUTE ON FUNCTION get_associados_report(text, boolean) TO anon, authenticated;
