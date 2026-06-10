import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

export interface Faixa {
    label: string;
    min: number;
    max: number;   // Infinity = faixa aberta
    cor: string;
}

// Lê as faixas configuráveis (Gestão Master → Faixas). Se a tabela estiver vazia
// ou der erro, mantém o fallback (defaults do componente) — resiliente.
export function useFaixas(tipo: 'LIQUIDEZ' | 'VENCIMENTO', fallback: Faixa[]): Faixa[] {
    const [faixas, setFaixas] = useState<Faixa[]>(fallback);

    useEffect(() => {
        let ativo = true;
        (async () => {
            const { data, error } = await supabase
                .from('faixas_temporais')
                .select('label, dias_min, dias_max, cor')
                .eq('tipo', tipo)
                .order('dias_min', { ascending: true });
            if (!ativo) return;
            if (!error && data && data.length > 0) {
                setFaixas(data.map((f: any) => ({
                    label: f.label,
                    min: Number(f.dias_min),
                    max: f.dias_max == null ? Infinity : Number(f.dias_max),
                    cor: f.cor || '#9CA3AF',
                })));
            }
        })();
        return () => { ativo = false; };
    }, [tipo]);

    return faixas;
}
