-- Adiciona coluna emissor_original em dicionario_ativos
ALTER TABLE dicionario_ativos ADD COLUMN IF NOT EXISTS emissor_original text;

-- Backfill: preenche a partir de posicao_btg_ativos para registros já existentes
UPDATE dicionario_ativos da
SET emissor_original = sub.emissor
FROM (
    SELECT DISTINCT ON (isin) isin, emissor
    FROM posicao_btg_ativos
    WHERE emissor IS NOT NULL AND isin IS NOT NULL AND isin != ''
    ORDER BY isin, criado_em DESC
) sub
WHERE sub.isin = da.codigo_identificador
  AND da.emissor_original IS NULL;
