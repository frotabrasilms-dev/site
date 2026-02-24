-- Check recent users and their photo_url
SELECT id, nome, numero_associado, foto_url, created_at
FROM public.associados
ORDER BY created_at DESC
LIMIT 5;
