import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Card, Badge, Button, Spinner } from 'avere-ui';
import { ShieldAlert, ArrowRight } from 'lucide-react';
import { supabase } from '../../services/supabase';

// Fila da CERCA DE POSIÇÃO: snapshots cuja soma das linhas não fecha com o total
// declarado pela fonte (divergente) ou que a fonte avisou estar incompletos
// (parcial). A cerca nomeia a chave do payload que ficou de fora — é o que o
// master precisa pra abrir chamado no mapeamento, não o cliente.

interface ChaveIgnorada { chave: string; itens: number; valor: number }
interface ItemCerca {
    snapshot_id: string;
    inst: string;
    cliente_id: string;
    cliente_nome: string;
    conta_codigo: string | null;
    data_referencia: string;
    total_fonte: number | null;
    total_linhas: number | null;
    divergencia: number | null;
    qualidade: 'divergente' | 'parcial';
    chaves_ignoradas: ChaveIgnorada[] | null;
    conferido_em: string | null;
}

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const fmt = (v: number | null | undefined) => (v == null ? '—' : brl.format(v));
const fmtData = (iso: string) => { try { return new Date(iso + 'T00:00:00').toLocaleDateString('pt-BR'); } catch { return iso; } };

export default function CercaPosicao() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [itens, setItens] = useState<ItemCerca[]>([]);

    useEffect(() => {
        let vivo = true;
        (async () => {
            const { data, error } = await supabase
                .from('vw_cerca_posicao')
                .select('snapshot_id, inst, cliente_id, cliente_nome, conta_codigo, data_referencia, total_fonte, total_linhas, divergencia, qualidade, chaves_ignoradas, conferido_em')
                .in('qualidade', ['divergente', 'parcial'])
                .limit(300);
            if (!vivo) return;
            if (error) console.error('Pendências: falha ao ler a cerca de posição', error);
            const lista = ((data ?? []) as ItemCerca[])
                .sort((a, b) => Math.abs(b.divergencia ?? 0) - Math.abs(a.divergencia ?? 0));
            setItens(lista);
            setLoading(false);
        })();
        return () => { vivo = false; };
    }, []);

    const totalFaltando = itens.reduce((s, i) => s + Math.max(i.divergencia ?? 0, 0), 0);

    return (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <ShieldAlert size={20} style={{ color: 'var(--color-primaria)' }} />
                <Typography variant="h2" style={{ margin: 0 }}>Cerca de posição</Typography>
                {itens.length > 0 && (
                    <Badge intent="alerta" variant="solid" style={{ fontSize: '12px' }}>{itens.length}</Badge>
                )}
                {totalFaltando > 0 && (
                    <Typography variant="p" style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                        {fmt(totalFaltando)} faltando na tela
                    </Typography>
                )}
            </div>
            <Typography variant="p" style={{ margin: 0, color: 'var(--color-text-secondary)', maxWidth: 760, fontSize: 'var(--text-sm)' }}>
                Contas cuja soma dos ativos gravados <strong>não fecha</strong> com o total que a corretora declarou,
                ou cuja fonte avisou posição <strong>incompleta</strong>. A chave apontada é o que o mapeamento
                deixou de fora — corrige-se no conector, não no cliente.
            </Typography>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '32px' }}><Spinner size="md" /></div>
            ) : itens.length === 0 ? (
                <Typography variant="p" style={{ margin: 0, color: 'var(--color-text-secondary)', padding: '8px 0' }}>
                    Todas as contas fecham com a fonte. ✓
                </Typography>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {itens.map(i => (
                        <Card key={i.snapshot_id} style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                            <div style={{ minWidth: 0, flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                    <Typography variant="p" style={{ margin: 0, fontWeight: 700, color: 'var(--color-secundaria)' }}>
                                        {i.cliente_nome}
                                    </Typography>
                                    <Badge intent="neutro" variant="ghost" style={{ fontSize: '10px' }}>{i.inst}{i.conta_codigo ? ` · ${i.conta_codigo}` : ''}</Badge>
                                    <Badge intent={i.qualidade === 'parcial' ? 'neutro' : 'alerta'} variant="ghost" style={{ fontSize: '10px' }}>
                                        {i.qualidade === 'parcial' ? 'Posição incompleta' : 'Divergente'}
                                    </Badge>
                                    {i.divergencia != null && (
                                        <Typography variant="p" style={{ margin: 0, fontWeight: 700, fontSize: 'var(--text-sm)', color: (i.divergencia ?? 0) >= 0 ? 'var(--color-danger-text)' : 'var(--color-text-secondary)' }}>
                                            {(i.divergencia ?? 0) >= 0 ? 'faltam ' : 'sobram '}{fmt(Math.abs(i.divergencia ?? 0))}
                                        </Typography>
                                    )}
                                </div>
                                <Typography variant="p" style={{ margin: '4px 0 0', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                                    {fmtData(i.data_referencia)} · fonte {fmt(i.total_fonte)} · gravado {fmt(i.total_linhas)}
                                </Typography>
                                {i.chaves_ignoradas && i.chaves_ignoradas.length > 0 && (
                                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                                        {i.chaves_ignoradas.slice(0, 6).map(c => (
                                            <Badge key={c.chave} intent="primaria" variant="ghost" style={{ fontSize: '10px' }}>
                                                {c.chave}{c.valor ? ` · ${fmt(c.valor)}` : ''}{c.itens ? ` · ${c.itens} it.` : ''}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <Button variant="outline" onClick={() => navigate(`/cliente/${i.cliente_id}`)} style={{ flexShrink: 0 }}>
                                Abrir cliente
                                <ArrowRight size={15} style={{ marginLeft: 6 }} />
                            </Button>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    );
}
