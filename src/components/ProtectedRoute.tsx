import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, type Role } from '../contexts/AuthContext';
import { Spinner } from 'avere-ui';

interface ProtectedRouteProps {
    allowedRoles?: Role[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const { session, perfil, loading } = useAuth();

    // 1. Enquanto carrega a sessão, mostra um loading
    if (loading) {
        return (
            <div style={{ display: 'flex', height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center' }}>
                <Spinner size="lg" />
            </div>
        );
    }

    // 2. Se não tem sessão (não fez login), manda para a página de Login
    if (!session) {
        return <Navigate to="/login" replace />;
    }

    // 3. Se a rota exige um perfil específico e o utilizador não o tem, manda para a Home
    if (allowedRoles && perfil && !allowedRoles.includes(perfil.role)) {
        return <Navigate to="/" replace />;
    }

    // 4. Se passou em todos os testes, deixa a pessoa ver a página
    return <Outlet />;
}