import { useEffect, useRef, useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerTitle, DrawerDescription, DrawerSeparator, Switch, Spinner, Typography } from 'avere-ui';
import { supabase } from '../../services/supabase';

// ─────────────────────────────────────────────────────────────────────────────
// Modelo do e-mail (master). Uma linha em `notificacao_modelo`, lida por
// notificacoes_montar. Cada campo salva sozinho; a prévia renderiza o e-mail REAL
// (notificacoes_previa_email) do consultor de exemplo a cada mudança.
// ─────────────────────────────────────────────────────────────────────────────

export type ModeloEmail = {
    id: number;
    reply_to: string | null;
    saudacao: string;
    assunto_prefixo: string;
    assunto_contagem: boolean;
    organizar_por: 'cliente' | 'data';
    rodape: string;
    nao_responder: boolean;
    aniv_titulo: string;
    aniv_intro: string | null;
    aniv_mostrar_idade: boolean;
    venc_titulo: string;
    venc_intro: string | null;
    venc_mostrar_valor: boolean;
    venc_mostrar_instituicao: boolean;
    venc_mostrar_link: boolean;
};
export type TipoAviso = 'aniversario' | 'vencimento';

const ctrl: React.CSSProperties = {
    width: '100%', padding: '8px 10px', borderRadius: 6,
    border: '1px solid color-mix(in srgb, var(--color-secundaria), transparent 80%)',
    fontSize: 14, fontFamily: 'var(--font-family)', outline: 'none', color: 'var(--color-secundaria)', background: 'var(--color-white)',
};
const rotulo: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 };
const dica: React.CSSProperties = { display: 'block', fontSize: 11, color: 'var(--color-text-muted)', marginTop: 4 };

// Campo de texto que salva ao parar de digitar (700 ms) ou ao sair do campo
function Texto({ label, value, onCommit, placeholder, multiline, hint, type }: { label: string; value: string; onCommit: (v: string) => void; placeholder?: string; multiline?: boolean; hint?: string; type?: string }) {
    const [txt, setTxt] = useState(value);
    const timer = useRef<number | null>(null);
    useEffect(() => { setTxt(value); }, [value]);
    const agendar = (v: string) => {
        setTxt(v);
        if (timer.current) window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => { if (v !== value) onCommit(v); }, 700);
    };
    const agora = () => { if (timer.current) window.clearTimeout(timer.current); if (txt !== value) onCommit(txt); };
    return (
        <div>
            <label style={rotulo}>{label}</label>
            {multiline
                ? <textarea value={txt} onChange={e => agendar(e.target.value)} onBlur={agora} placeholder={placeholder} rows={3} style={{ ...ctrl, resize: 'vertical', lineHeight: 1.4 }} />
                : <input type={type ?? 'text'} value={txt} onChange={e => agendar(e.target.value)} onBlur={agora} placeholder={placeholder}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); agora(); } }} style={{ ...ctrl, height: 38 }} />}
            {hint && <span style={dica}>{hint}</span>}
        </div>
    );
}

function LinhaSwitch({ label, descricao, checked, onChange }: { label: string; descricao?: string; checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '8px 0' }}>
            <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-secundaria)' }}>{label}</div>
                {descricao && <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{descricao}</div>}
            </div>
            <Switch checked={checked} onCheckedChange={onChange} />
        </div>
    );
}

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Typography variant="p" style={{ margin: 0, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>{titulo}</Typography>
            {children}
        </div>
    );
}

export function ModeloEmailDrawer({ tipo, modelo, onChange, exemploId, exemploNome, onOpenChange }: {
    tipo: TipoAviso | null;
    modelo: ModeloEmail | null;
    onChange: (patch: Partial<ModeloEmail>) => Promise<void> | void;
    exemploId: string | null;        // consultor cujo e-mail real alimenta a prévia
    exemploNome?: string | null;
    onOpenChange: (open: boolean) => void;
}) {
    type Previa = { assunto: string; corpo_html: string; data_envio: string } | null;
    // A prévia é guardada com a "chave" (exemplo + modelo) que a gerou: chave diferente = carregando.
    const [previaRes, setPreviaRes] = useState<{ chave: string; dados: Previa } | null>(null);
    const aberto = tipo !== null;
    const chave = `${exemploId ?? ''}|${JSON.stringify(modelo)}`;

    // Prévia renderizada: recarrega quando abre e a cada mudança salva no modelo
    useEffect(() => {
        if (!aberto || !exemploId) return;
        let vivo = true;
        supabase.rpc('notificacoes_previa_email', { p_consultor_id: exemploId }).then(({ data, error }) => {
            if (!vivo) return;
            if (error) console.error('prévia do e-mail', error);
            setPreviaRes({ chave, dados: error ? null : ((data ?? null) as Previa) });
        });
        return () => { vivo = false; };
    }, [aberto, exemploId, chave]);
    const previa: Previa | undefined = previaRes?.chave === chave ? previaRes.dados : undefined;

    if (!modelo) return null;
    const m = modelo;
    const set = <K extends keyof ModeloEmail>(k: K, v: ModeloEmail[K]) => { void onChange({ [k]: v } as Partial<ModeloEmail>); };
    const chip = (ativo: boolean, label: string, onClick: () => void) => (
        <button type="button" onClick={onClick} aria-pressed={ativo}
            style={{ height: 30, padding: '0 14px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)',
                border: `1px solid ${ativo ? 'var(--color-primaria)' : 'var(--color-border-default)'}`,
                background: ativo ? 'var(--color-accent-subtle)' : 'var(--color-white)', color: ativo ? 'var(--color-primaria)' : 'var(--color-text-secondary)' }}>
            {label}
        </button>
    );

    return (
        <Drawer open={aberto} onOpenChange={onOpenChange}>
            <DrawerContent style={{ width: 620, maxWidth: '96vw' }}>
                <DrawerHeader>
                    <DrawerTitle>Modelo do e-mail · {tipo === 'aniversario' ? 'Aniversários' : 'Vencimentos'}</DrawerTitle>
                    <DrawerDescription>Vale para todos os consultores. Cada campo salva sozinho; a prévia abaixo é o e-mail real.</DrawerDescription>
                </DrawerHeader>
                <DrawerBody>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                        {tipo === 'aniversario' ? (
                            <Bloco titulo="Bloco de aniversários">
                                <Texto label="Título do bloco" value={m.aniv_titulo} onCommit={v => set('aniv_titulo', v || '🎂 Aniversários')} />
                                <Texto label="Texto de abertura (opcional)" value={m.aniv_intro ?? ''} onCommit={v => set('aniv_intro', v || null)} multiline placeholder="Ex.: Clientes que fazem aniversário nos próximos dias." />
                                <LinhaSwitch label="Mostrar a idade que faz" descricao="Ex.: “faz 52 anos”. Sensível se o e-mail for encaminhado." checked={m.aniv_mostrar_idade} onChange={v => set('aniv_mostrar_idade', v)} />
                            </Bloco>
                        ) : (
                            <Bloco titulo="Bloco de vencimentos">
                                <Texto label="Título do bloco" value={m.venc_titulo} onCommit={v => set('venc_titulo', v || '⏰ Vencimentos')} />
                                <Texto label="Texto de abertura (opcional)" value={m.venc_intro ?? ''} onCommit={v => set('venc_intro', v || null)} multiline placeholder="Ex.: Ativos da sua carteira que vencem em breve." />
                                <LinhaSwitch label="Mostrar valor bruto" checked={m.venc_mostrar_valor} onChange={v => set('venc_mostrar_valor', v)} />
                                <LinhaSwitch label="Mostrar instituição" checked={m.venc_mostrar_instituicao} onChange={v => set('venc_mostrar_instituicao', v)} />
                                <LinhaSwitch label="Link “abrir” no consolidador" descricao="Cai direto no ativo, na posição do cliente (exige login)." checked={m.venc_mostrar_link} onChange={v => set('venc_mostrar_link', v)} />
                            </Bloco>
                        )}

                        <DrawerSeparator />

                        <Bloco titulo="E-mail (comum aos dois avisos)">
                            <Texto label="Saudação" value={m.saudacao} onCommit={v => set('saudacao', v || 'Olá, {nome}!')} hint="{nome} vira o primeiro nome do consultor." />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'end' }}>
                                <Texto label="Prefixo do assunto" value={m.assunto_prefixo} onCommit={v => set('assunto_prefixo', v || 'Avere')} hint="Ex.: “Avere · 3 vencimentos · 1 aniversário (17/09)”." />
                                <div style={{ paddingBottom: 22 }}><LinhaSwitch label="Contagem" checked={m.assunto_contagem} onChange={v => set('assunto_contagem', v)} /></div>
                            </div>
                            <div>
                                <label style={rotulo}>Organizar os vencimentos</label>
                                <div style={{ display: 'flex', gap: 6 }}>
                                    {chip(m.organizar_por === 'cliente', 'por cliente', () => set('organizar_por', 'cliente'))}
                                    {chip(m.organizar_por === 'data', 'por data', () => set('organizar_por', 'data'))}
                                </div>
                                <span style={dica}>Por cliente: um bloco por pessoa, com os ativos dela. Por data: lista corrida, do mais próximo ao mais distante.</span>
                            </div>
                            <Texto label="Responder para" type="email" value={m.reply_to ?? ''} onCommit={v => set('reply_to', v.trim() || null)} placeholder="ex.: consultoria@averepartners.com.br" hint="Para onde vai a resposta do consultor. Em branco, responde à caixa de notificações (ninguém lê)." />
                            <Texto label="Rodapé" value={m.rodape} onCommit={v => set('rodape', v)} multiline />
                            <LinhaSwitch label="Aviso “Não responda a este e-mail”" checked={m.nao_responder} onChange={v => set('nao_responder', v)} />
                        </Bloco>

                        <DrawerSeparator />

                        <Bloco titulo={`Prévia${exemploNome ? ` · exemplo: ${exemploNome}` : ''}`}>
                            {!exemploId && <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Nenhum consultor com lembretes nos próximos 7 dias para servir de exemplo.</span>}
                            {exemploId && previa === undefined && <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}><Spinner size="md" /></div>}
                            {exemploId && previa === null && <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Esse consultor não tem lembretes nos próximos 7 dias.</span>}
                            {previa && (
                                <div style={{ border: '1px solid var(--color-border-default)', borderRadius: 8, overflow: 'hidden' }}>
                                    <div style={{ padding: '10px 14px', background: 'var(--gray-50)', borderBottom: '1px solid var(--color-border-subtle)', fontSize: 13 }}>
                                        <span style={{ color: 'var(--color-text-muted)' }}>Assunto: </span><strong>{previa.assunto}</strong>
                                    </div>
                                    <iframe title="Prévia do e-mail" sandbox="" srcDoc={`<!doctype html><html><body style="margin:16px;background:#fff">${previa.corpo_html}</body></html>`}
                                        style={{ width: '100%', height: 420, border: 'none', background: 'var(--color-white)' }} />
                                </div>
                            )}
                        </Bloco>
                    </div>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}
