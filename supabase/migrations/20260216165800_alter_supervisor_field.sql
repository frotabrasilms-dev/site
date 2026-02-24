-- Alter supervisor column in associados table to allow longer IDs (6 digits)
ALTER TABLE "public"."associados" 
  ALTER COLUMN "supervisor" TYPE text;

-- Also update vinculos_associados if it exists and uses the same ID
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'vinculos_associados') THEN
        ALTER TABLE "public"."vinculos_associados"
          ALTER COLUMN "supervisor_posicao_id" TYPE text;
    END IF;
END $$;
