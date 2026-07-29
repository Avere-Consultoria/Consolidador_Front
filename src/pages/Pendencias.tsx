import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Card, Badge, Button, Spinner } from 'avere-ui';
import { ClipboardCheck, ArrowRight, Inbox } from 'lucide-react';
import { supabase } from '../services/supabase';

interface Pendencia {
    id: string;
    nome_canonico: string;
    sub_tipo_canonico: string | null;
    curado: boolean;
    quando: string;              // quando o consultor classificou (fallback: criação do canônico)
    consultorNome: string;
    palpiteClasse: string | null;
}

function formatarQuando(iso: string): string {
    try {
        const d = new Date(iso);
        return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } catch { return iso; }
}

export default function Pendencias() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [pendencias, setPendencias] = useState<Pendencia[]>([]);

    async function carregar() {
        setLoading(true);
        try {
            // A view já aplica a definição: canônico sem classe + sinal de consultor.
            const { data: base } = await supabase
                .from('pendencias_curadoria')
                .select('id, nome_canonico, sub_tipo_canonico, curado, criado_em, criado_por')
                .order('criado_em', { ascending: false });

            const lista = base ?? [];
            const ids = lista.map((c: any) => c.id);

            const [consRes, excRes] = await Promise.all([
                supabase.from('consultores').select('perfil_id, nome'),
                ids.length
                    ? supabase.from('excecoes_classificacao')
                        .select('ativo_canonico_id, classe_customizada, consultor_id, atualizado_em')
                        .in('ativo_canonico_id', ids)
                        .not('classe_customizada', 'is', null)
                    : Promise.resolve({ data: [] as any[] }),
            ]);

            const consMap = new Map<string, string>();
            (consRes.data ?? []).forEach((c: any) => { if (c.perfil_id) consMap.set(c.perfil_id, c.nome); });

            // Primeira exceção com classe por canônico (palpite + quem + quando classificou).
            const palpiteMap = new Map<string, { classe: string; consultorId: string | null; quando: string | null }>();
            (excRes.data ?? []).forEach((e: any) => {
                if (e.classe_customizada && !palpiteMap.has(e.ativo_canonico_id)) {
                    palpiteMap.set(e.ativo_canonico_id, { classe: e.classe_customizada, consultorId: e.consultor_id ?? null, quando: e.atualizado_em ?? null });
                }
            });

            setPendencias(lista.map((c: any) => {
                const p = palpiteMap.get(c.id);
                const quem = p?.consultorId ?? c.criado_por;
                return {
                    id: c.id,
                    nome_canonico: c.nome_canonico,
                    sub_tipo_canonico: c.sub_tipo_canonico,
                    curado: c.curado,
                    quando: p?.quando ?? c.criado_em,
                    consultorNome: quem ? (consMap.get(quem) ?? 'Consultor') : '—',
                    palpiteClasse: p?.classe ?? null,
                };
            }));
        } catch (err) {
            console.error('Erro ao carregar pendências:', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { carregar(); }, []);

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header style={{ borderBottom: '1px solid var(--color-borda)', paddingBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ClipboardCheck size={22} style={{ color: 'var(--color-primaria)' }} />
                    <Typography variant="h1" style={{ margin: 0 }}>Pendências</Typography>
                    {pendencias.length > 0 && (
                        <Badge intent="alerta" variant="solid" style={{ fontSize: '12px' }}>{pendencias.length}</Badge>
                    )}
                </div>
                <Typography variant="p" style={{ opacity: 0.6, marginTop: '6px', maxWidth: 720 }}>
                    Ativos <strong>sem classificação oficial</strong> que um consultor já classificou (rascunho ou
                    exceção). Clique em <strong>Curar</strong> para abrir na Master Ativos e definir a classificação
                    canônica — aí o item sai desta lista.
                </Typography>
            </header>

            {pendencias.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 24px', gap: '14px', border: '2px dashed var(--color-borda)', borderRadius: '12px', opacity: 0.6 }}>
                    <Inbox size={44} />
                    <Typography variant="h2" style={{ margin: 0 }}>Nenhuma pendência</Typography>
                    <Typography variant="p" style={{ textAlign: 'center', maxWidth: 480 }}>
                        Quando um consultor classificar um ativo que você ainda não classificou, ele aparece aqui para curadoria.
                    </Typography>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {pendencias.map(r => (
                        <Card key={r.id} style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                            <div style={{ minWidth: 0, flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                    <Typography variant="p" style={{ margin: 0, fontWeight: 700, color: 'var(--color-secundaria)' }}>
                                        {r.nome_canonico}
                                    </Typography>
                                    <Badge intent={r.curado ? 'neutro' : 'alerta'} variant="ghost" style={{ fontSize: '10px' }}>
                                        {r.curado ? 'Sem classe' : 'Rascunho'}
                                    </Badge>
                                    {r.sub_tipo_canonico && (
                                        <Badge intent="neutro" variant="ghost" style={{ fontSize: '10px' }}>{r.sub_tipo_canonico}</Badge>
                                    )}
                                    {r.palpiteClasse && (
                                        <Badge intent="primaria" variant="ghost" style={{ fontSize: '10px' }}>Palpite: {r.palpiteClasse}</Badge>
                                    )}
                                </div>
                                <Typography variant="p" style={{ margin: '4px 0 0', fontSize: '12px', opacity: 0.6 }}>
                                    Por <strong>{r.consultorNome}</strong> · {formatarQuando(r.quando)}
                                </Typography>
                            </div>
                            <Button variant="solid" onClick={() => navigate(`/inteligencia/ativos?focar=${r.id}`)} style={{ flexShrink: 0 }}>
                                Classificar
                                <ArrowRight size={15} style={{ marginLeft: 6 }} />
                            </Button>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
