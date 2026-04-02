import { useState, useCallback } from 'react';
import { fetchApi } from '../services/api';

export interface InvestmentData {
  id?: number | string;
  name?: string;
  description?: string;
  display_title?: string;
  technical_code?: string;
  banco?: string;
  tipo?: string;
  codigo?: string;
  valor_liquido?: number;
  rentabilidade?: string;
  vencimento?: string;
  [key: string]: unknown;
}

export function useInvestments() {
  const [data, setData] = useState<InvestmentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const syncAndFetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchApi('/sync-investments');
      setData(response.data || []);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Falha ao sincronizar investimentos.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    syncAndFetch,
  };
}
