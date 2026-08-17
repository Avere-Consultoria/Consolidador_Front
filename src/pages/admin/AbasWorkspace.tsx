import { Outlet, NavLink } from 'react-router-dom';

// Casca genérica de abas para as seções do master (Cadastros/Inteligência/Operação).
// A seção ativa já é indicada na sidebar; aqui mostramos só as abas + o conteúdo.
export default function AbasWorkspace({ tabs }: { tabs: { to: string; label: string }[] }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--color-borda)', flexWrap: 'wrap' }}>
                {tabs.map(t => (
                    <NavLink key={t.to} to={t.to} style={({ isActive }) => ({
                        padding: '10px 16px', fontSize: 14, fontWeight: 600, textDecoration: 'none',
                        color: isActive ? 'var(--color-primaria)' : 'var(--color-text-secondary)',
                        borderBottom: isActive ? '2px solid var(--color-primaria)' : '2px solid transparent',
                        marginBottom: -1,
                    })}>{t.label}</NavLink>
                ))}
            </div>
            <Outlet />
        </div>
    );
}
