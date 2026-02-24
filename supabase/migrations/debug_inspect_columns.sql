-- Inspect column definitions to see if numero_associado is generated
SELECT 
    column_name, 
    data_type, 
    is_identity, 
    identity_generation,
    is_generated,
    generation_expression
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'associados';
