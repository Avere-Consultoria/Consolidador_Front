import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, Button, Spinner, toast } from 'avere-ui';
import { Upload, X } from 'lucide-react';
import { supabase } from '../../../services/supabase';

// Tipos aceitos: PDF, imagem (jpeg/png) e Excel (xlsx/xls). Valida por mime OU
// extensão (o browser às vezes não manda o mime certo de .xls).
const EXT_OK = /\.(pdf|jpe?g|png|xlsx|xls)$/i;
const ehPermitido = (f: File) => f.type === 'application/pdf' || f.type.startsWith('image/') || EXT_OK.test(f.name);

interface ContaManual { id: string; instituicao: string; apelido: string | null; }
interface Props {
    aberto: boolean;
    onClose: () => void;
    cliente: { id: string; nome: string; codigoAvere: string; consultorId?: string | null } | null;
}

const lbl: React.CSSProperties = { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', opacity: 0.5, letterSpacing: '0.05em', display: 'block', marginBottom: 6 };
const ctrl: React.CSSProperties = { width: '100%', boxSizing: 'border-box', height: 40, padding: '0 12px', fontSize: 14, fontFamily: 'inherit', border: '1.5px solid rgba(0,0,0,0.15)', borderRadius: 8, outline: 'none', background: '#fff' };
const ro: React.CSSProperties = { ...ctrl, background: '#F3F4F6', color: '#6B7280' };

export function ModalEnvioPDF({ aberto, onClose, cliente }: Props) {
    const [consultor, setConsultor] = useState('');
    const [contas, setContas] = useState<ContaManual[]>([]);
    const [contaId, setContaId] = useState('');
    const [mes, setMes] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [carregando, setCarregando] = useState(false);
    const [enviando, setEnviando] = useState(false);

    useEffect(() => {
        if (!aberto || !cliente?.id) return;
        setContaId(''); setMes(''); setFiles([]);
        setCarregando(true);
        (async () => {
            const [contasRes, consRes] = await Promise.all([
                supabase.from('cliente_contas')
                    .select('id, apelido, instituicoes!inner(nome, tipo)')
                    .eq('cliente_id', cliente.id).eq('ativo', true).eq('instituicoes.tipo', 'MANUAL'),
                cliente.consultorId
                    ? supabase.from('consultores').select('nome').eq('id', cliente.consultorId).maybeSingle()
                    : Promise.resolve({ data: null as any }),
            ]);
            setContas((contasRes.data ?? []).map((c: any) => {
                const inst = Array.isArray(c.instituicoes) ? c.instituicoes[0] : c.instituicoes;
                return { id: c.id, instituicao: inst?.nome ?? '—', apelido: c.apelido };
            }));
            setConsultor((consRes.data as any)?.nome ?? '—');
            setCarregando(false);
        })();
    }, [aberto, cliente?.id]);

    const fileToBase64 = (f: File) => new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result));
        r.onerror = reject;
        r.readAsDataURL(f);
    });

    // Acumula seleções (dedup por nome+tamanho) e zera o input p/ permitir re-selecionar.
    const adicionarArquivos = (e: React.ChangeEvent<HTMLInputElement>) => {
        const novos = Array.from(e.target.files ?? []);
        setFiles(prev => {
            const chaves = new Set(prev.map(f => f.name + f.size));
            return [...prev, ...novos.filter(f => !chaves.has(f.name + f.size))];
        });
        e.target.value = '';
    };

    const enviar = async () => {
        if (!cliente?.id) return;
        if (!contaId) { toast.error('Selecione a instituição.'); return; }
        if (!mes) { toast.error('Informe o mês de referência.'); return; }
        if (!files.length) { toast.error('Selecione ao menos um arquivo.'); return; }
        const invalido = files.find(f => !ehPermitido(f));
        if (invalido) { toast.error(`"${invalido.name}" não é PDF, imagem ou Excel.`); return; }
        setEnviando(true);
        try {
            const arquivos = await Promise.all(files.map(async f => ({ base64: await fileToBase64(f), nome: f.name, tipo: f.type })));
            // Data de referência = ÚLTIMO dia do mês (casa com a visão de fechamento).
            const [ano, m] = mes.split('-').map(Number);
            const ultimoDia = new Date(ano, m, 0).getDate();   // new Date(y, m, 0) = último dia do mês m
            const dataReferencia = `${mes}-${String(ultimoDia).padStart(2, '0')}`;
            const { error } = await supabase.functions.invoke('enviar-pdf-zapier', {
                body: { clienteId: cliente.id, contaId, dataReferencia, arquivos },
            });
            if (error) throw error;
            toast.success('Arquivos enviados para processamento.');
            onClose();
        } catch (err: any) {
            toast.error(`Falha no envio: ${err.message ?? err}`);
        } finally {
            setEnviando(false);
        }
    };

    if (!cliente) return null;

    return (
        <Modal open={aberto} onOpenChange={onClose}>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>Enviar arquivos para processamento</ModalTitle>
                    <ModalDescription>
                        Os arquivos são encaminhados ao fluxo de tratamento (Zapier → IA). Apenas instituições manuais (não-API) do cliente.
                    </ModalDescription>
                </ModalHeader>

                <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        <div><label style={lbl}>Código Avere</label><input style={ro} value={cliente.codigoAvere ?? ''} disabled /></div>
                        <div><label style={lbl}>Consultor</label><input style={ro} value={carregando ? '…' : consultor} disabled /></div>
                    </div>
                    <div><label style={lbl}>Cliente</label><input style={ro} value={cliente.nome ?? ''} disabled /></div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, alignItems: 'end' }}>
                        <div>
                            <label style={{ ...lbl, whiteSpace: 'nowrap' }}>Instituição (manual)</label>
                            <select style={ctrl} value={contaId} onChange={e => setContaId(e.target.value)} disabled={carregando}>
                                <option value="">{carregando ? 'Carregando…' : (contas.length ? 'Selecione…' : 'Nenhuma instituição manual')}</option>
                                {contas.map(c => <option key={c.id} value={c.id}>{c.instituicao}{c.apelido ? ` · ${c.apelido}` : ''}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ ...lbl, whiteSpace: 'nowrap' }}>Mês de referência</label>
                            <input type="month" style={ctrl} value={mes} onChange={e => setMes(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <label style={lbl}>Arquivos (PDF / imagem / Excel) — pode selecionar vários</label>
                        <input type="file" multiple
                            accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls,application/pdf,image/jpeg,image/png"
                            style={{ ...ctrl, height: 'auto', padding: '8px 12px' }}
                            onChange={adicionarArquivos} />
                        {files.length > 0 && (
                            <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                                {files.map((f, i) => (
                                    <div key={`${f.name}-${f.size}-${i}`}
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '6px 10px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 6, fontSize: 13, background: '#F9FAFB' }}>
                                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={f.name}>
                                            {f.name} <span style={{ color: '#9CA3AF', fontSize: 11 }}>({(f.size / 1024).toFixed(0)} KB)</span>
                                        </span>
                                        <button type="button" title="Remover"
                                            onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))}
                                            style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#DC2626', display: 'flex', alignItems: 'center', padding: 2, flexShrink: 0 }}>
                                            <X size={15} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <ModalFooter>
                    <Button variant="outline" onClick={onClose} disabled={enviando}>Cancelar</Button>
                    <Button variant="solid" onClick={enviar} disabled={enviando || carregando}>
                        {enviando ? <Spinner size="sm" /> : <><Upload size={15} style={{ marginRight: 6 }} /> Enviar arquivos</>}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
