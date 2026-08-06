import { useState } from 'react';
import { Typography } from 'avere-ui';
import {
    UserPlus, FileSpreadsheet, ClipboardList, FileSignature, Users, LineChart,
    Calculator, UserRound, Receipt, FolderUp, ShieldAlert, CalendarClock,
    ClipboardCheck, Globe, Building2, Link as LinkIcon, ExternalLink,
    type LucideIcon,
} from 'lucide-react';
import { HUB_CATEGORIAS, type HubLink } from './hub/hubData';

const ICONES: Record<string, LucideIcon> = {
    prospect: UserPlus,
    planilha: FileSpreadsheet,
    suitability: ClipboardList,
    nda: FileSignature,
    pessoas: Users,
    research: LineChart,
    ir: Calculator,
    profiles: UserRound,
    reembolso: Receipt,
    comdinheiro: FolderUp,
    ouvidoria: ShieldAlert,
    reuniao: CalendarClock,
    infopessoal: ClipboardCheck,
    offshore: Globe,
    incorporacao: Building2,
};

function Marca({ link }: { link: HubLink }) {
    const [logoFalhou, setLogoFalhou] = useState(false);

    // 1. Logo oficial (favicon do domínio da marca)
    if (link.logo && !logoFalhou) {
        return (
            <div style={{
                width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                background: '#fff', border: '1px solid var(--color-borda)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
            }}>
                <img
                    src={`https://www.google.com/s2/favicons?domain=${link.logo}&sz=128`}
                    alt=""
                    width={32}
                    height={32}
                    style={{ objectFit: 'contain' }}
                    onError={() => setLogoFalhou(true)}
                />
            </div>
        );
    }

    // 2. Badge com sigla (fallback do logo, ou marca sem domínio)
    if (link.badge) {
        return (
            <div style={{
                width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                background: link.badge.bg, color: link.badge.fg ?? '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: link.badge.texto.length > 2 ? 12 : 14, letterSpacing: '0.02em',
            }}>
                {link.badge.texto}
            </div>
        );
    }

    // 3. Ícone lucide (formulários) / padrão
    const Icone = (link.icon && ICONES[link.icon]) || LinkIcon;
    return (
        <div style={{
            width: 40, height: 40, borderRadius: 8, flexShrink: 0,
            background: 'color-mix(in srgb, var(--color-primaria), transparent 90%)',
            color: 'var(--color-primaria)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
            <Icone size={20} />
        </div>
    );
}

function Card({ link }: { link: HubLink }) {
    return (
        <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hub-card"
            style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                padding: '14px 16px', borderRadius: 10, textDecoration: 'none',
                border: '1px solid var(--color-borda)', background: '#fff',
                transition: 'border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease',
            }}
        >
            <Marca link={link} />
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Typography variant="p" style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--color-secundaria)', lineHeight: 1.3 }}>
                        {link.titulo}
                    </Typography>
                    <ExternalLink size={13} style={{ color: '#9CA3AF', flexShrink: 0 }} />
                </div>
                {link.descricao && (
                    <Typography variant="p" style={{
                        margin: '2px 0 0', fontSize: 12, lineHeight: 1.4,
                        color: link.atencao ? 'var(--color-alerta)' : '#6B7280',
                        fontWeight: link.atencao ? 600 : 400,
                    }}>
                        {link.descricao}
                    </Typography>
                )}
            </div>
        </a>
    );
}

export default function Hub() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <style>{`.hub-card:hover{border-color:var(--color-primaria)!important;box-shadow:0 4px 12px rgba(0,0,0,0.06);transform:translateY(-1px);}`}</style>

            <header>
                <Typography variant="h1" style={{ margin: 0 }}>Hub Avere</Typography>
                <Typography variant="p" style={{ margin: '6px 0 0', color: '#6B7280', fontSize: 14 }}>
                    Atalhos e links úteis da casa, reunidos num lugar só.
                </Typography>
            </header>

            {HUB_CATEGORIAS.map(cat => (
                <section key={cat.nome} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <Typography variant="h2" style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--color-secundaria)' }}>
                        {cat.nome}
                    </Typography>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
                        {cat.links.map(link => <Card key={link.titulo} link={link} />)}
                    </div>
                </section>
            ))}
        </div>
    );
}
