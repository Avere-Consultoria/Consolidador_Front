import { useEffect, useMemo, useState } from 'react';
import { Command } from 'cmdk';
import {
    Search, User, LayoutDashboard, Bell, ListChecks, LayoutGrid,
    ClipboardCheck, Users, Database, Wrench, SlidersHorizontal, FileStack, Clock,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Paleta de comandos (Ctrl/Cmd+K) — ficha command-palette.md:
// combobox+listbox (cmdk), foco fica no input, ↑↓ navega, ↵ executa, Esc fecha;
// estado inicial mostra RECENTES (nunca tela vazia); rodapé com legenda de teclas.
// v1: pular para cliente + navegação por papel. Ações contextuais ficam p/ v2.
// ─────────────────────────────────────────────────────────────────────────────

export interface ClientePalette {
    id: string;
    nome: string;
    codigo_avere?: string | number | null;
}

interface NavItemPalette {
    label: string;
    to: string;
    icon: any;
}

interface CommandPaletteProps {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    clientes: ClientePalette[];
    onSelectCliente: (id: string) => void;
    onNavigate: (to: string) => void;
    isMaster: boolean;
    isConsultor: boolean;
}

const RECENTES_KEY = 'palette:recentes';

function lerRecentes(): string[] {
    try { return JSON.parse(localStorage.getItem(RECENTES_KEY) ?? '[]'); } catch { return []; }
}

function gravarRecente(id: string) {
    const atual = lerRecentes().filter(x => x !== id);
    atual.unshift(id);
    localStorage.setItem(RECENTES_KEY, JSON.stringify(atual.slice(0, 6)));
}

// Busca tolerante a acento: o value do cmdk recebe o texto normalizado.
const normalizar = (s: string) =>
    s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export function CommandPalette({
    open, onOpenChange, clientes, onSelectCliente, onNavigate, isMaster, isConsultor,
}: CommandPaletteProps) {
    const [query, setQuery] = useState('');

    // Limpa a busca ao reabrir (estado inicial = recentes, não a query velha)
    useEffect(() => { if (open) setQuery(''); }, [open]);

    const recentes = useMemo(() => {
        if (!open) return [];
        const ids = lerRecentes();
        return ids
            .map(id => clientes.find(c => c.id === id))
            .filter(Boolean) as ClientePalette[];
    }, [open, clientes]);

    const navItens = useMemo<NavItemPalette[]>(() => {
        const base: NavItemPalette[] = [
            { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
            { label: 'Alertas', to: '/alertas', icon: Bell },
            { label: 'Tarefas', to: '/tarefas', icon: ListChecks },
            { label: 'Hub', to: '/hub', icon: LayoutGrid },
        ];
        if (isMaster) {
            base.push(
                { label: 'Pendências', to: '/pendencias', icon: ClipboardCheck },
                { label: 'Cadastros', to: '/cadastros', icon: Users },
                { label: 'Inteligência', to: '/inteligencia', icon: Database },
                { label: 'Operação', to: '/operacao', icon: Wrench },
            );
        }
        if (isConsultor) {
            base.push(
                { label: 'Personalizar Ativos', to: '/personalizar', icon: SlidersHorizontal },
                { label: 'Meus Envios', to: '/documentos-manuais', icon: FileStack },
            );
        }
        return base;
    }, [isMaster, isConsultor]);

    const escolherCliente = (id: string) => {
        gravarRecente(id);
        onOpenChange(false);
        onSelectCliente(id);
    };

    const irPara = (to: string) => {
        onOpenChange(false);
        onNavigate(to);
    };

    return (
        <>
            <style>{`
                .cmdk-overlay {
                    position: fixed; inset: 0; z-index: 200;
                    background: rgba(8, 31, 40, 0.45);
                    backdrop-filter: blur(2px);
                }
                .cmdk-container {
                    position: fixed; z-index: 201;
                    top: 16vh; left: 50%; transform: translateX(-50%);
                    width: min(600px, calc(100vw - 32px));
                }
                .cmdk-root {
                    background: var(--color-surface);
                    border: 1px solid var(--color-border-subtle);
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-modal);
                    overflow: hidden;
                }
                .cmdk-root [cmdk-input] {
                    width: 100%; border: none; outline: none;
                    padding: 18px 20px 18px 48px;
                    font-size: var(--text-lg); font-family: var(--font-sans);
                    color: var(--color-text-primary);
                    background: transparent;
                    border-bottom: 1px solid var(--color-border-subtle);
                }
                .cmdk-root [cmdk-input]::placeholder { color: var(--color-text-muted); }
                .cmdk-input-icon {
                    position: absolute; top: 20px; left: 18px;
                    color: var(--color-text-muted); pointer-events: none;
                }
                .cmdk-root [cmdk-list] {
                    max-height: 360px; overflow-y: auto;
                    padding: 8px;
                    scroll-padding-block: 8px;
                }
                .cmdk-root [cmdk-group-heading] {
                    padding: 10px 12px 4px;
                    font-size: var(--text-2xs); font-weight: var(--weight-semibold);
                    text-transform: uppercase; letter-spacing: var(--tracking-caps);
                    color: var(--color-text-muted);
                }
                .cmdk-root [cmdk-item] {
                    display: flex; align-items: center; gap: 12px;
                    padding: 10px 12px;
                    border-radius: var(--radius-md);
                    font-size: var(--text-md); color: var(--color-text-primary);
                    cursor: pointer; user-select: none;
                }
                .cmdk-root [cmdk-item][data-selected='true'] {
                    background: var(--color-accent-subtle);
                    color: var(--color-accent);
                }
                .cmdk-root [cmdk-item] svg { flex-shrink: 0; color: var(--color-text-muted); }
                .cmdk-root [cmdk-item][data-selected='true'] svg { color: var(--color-accent); }
                .cmdk-codigo {
                    margin-left: auto;
                    font-size: var(--text-xs); color: var(--color-text-muted);
                    font-variant-numeric: tabular-nums;
                }
                .cmdk-root [cmdk-empty] {
                    padding: 28px 16px; text-align: center;
                    font-size: var(--text-sm); color: var(--color-text-secondary);
                }
                .cmdk-rodape {
                    display: flex; gap: 16px; justify-content: flex-end;
                    padding: 8px 14px;
                    border-top: 1px solid var(--color-border-subtle);
                    background: var(--gray-50);
                    font-size: var(--text-2xs); color: var(--color-text-muted);
                }
                .cmdk-rodape kbd {
                    font-family: var(--font-sans);
                    background: var(--color-surface);
                    border: 1px solid var(--color-border-default);
                    border-radius: var(--radius-sm);
                    padding: 1px 5px; margin-right: 4px;
                }
            `}</style>

            {open && (
                <>
                    <div className="cmdk-overlay" onClick={() => onOpenChange(false)} />
                    <div className="cmdk-container" onKeyDown={e => { if (e.key === 'Escape') onOpenChange(false); }}>
                        <Command
                            className="cmdk-root"
                            label="Busca rápida"
                            shouldFilter={query.trim().length > 0}
                        >
                            <div style={{ position: 'relative' }}>
                                <Search size={18} className="cmdk-input-icon" />
                                <Command.Input
                                    autoFocus
                                    value={query}
                                    onValueChange={setQuery}
                                    placeholder="Buscar cliente ou ir para uma tela…"
                                />
                            </div>
                            <Command.List>
                                <Command.Empty>
                                    Nada encontrado para "{query}". Tente o nome ou o código Avere do cliente.
                                </Command.Empty>

                                {query.trim() === '' && recentes.length > 0 && (
                                    <Command.Group heading="Recentes">
                                        {recentes.map(c => (
                                            <Command.Item key={`rec-${c.id}`} value={`rec ${normalizar(c.nome)} ${c.codigo_avere ?? ''}`} onSelect={() => escolherCliente(c.id)}>
                                                <Clock size={16} />
                                                {c.nome}
                                                {c.codigo_avere != null && <span className="cmdk-codigo">{c.codigo_avere}</span>}
                                            </Command.Item>
                                        ))}
                                    </Command.Group>
                                )}

                                <Command.Group heading="Clientes">
                                    {clientes.map(c => (
                                        <Command.Item key={c.id} value={`${normalizar(c.nome)} ${c.codigo_avere ?? ''}`} onSelect={() => escolherCliente(c.id)}>
                                            <User size={16} />
                                            {c.nome}
                                            {c.codigo_avere != null && <span className="cmdk-codigo">{c.codigo_avere}</span>}
                                        </Command.Item>
                                    ))}
                                </Command.Group>

                                <Command.Group heading="Ir para">
                                    {navItens.map(item => (
                                        <Command.Item key={item.to} value={`ir ${normalizar(item.label)}`} onSelect={() => irPara(item.to)}>
                                            <item.icon size={16} />
                                            {item.label}
                                        </Command.Item>
                                    ))}
                                </Command.Group>
                            </Command.List>
                            <div className="cmdk-rodape">
                                <span><kbd>↑</kbd><kbd>↓</kbd> navegar</span>
                                <span><kbd>↵</kbd> abrir</span>
                                <span><kbd>esc</kbd> fechar</span>
                            </div>
                        </Command>
                    </div>
                </>
            )}
        </>
    );
}
