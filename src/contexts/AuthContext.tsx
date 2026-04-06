import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';

// ── Tipos ─────────────────────────────────────────────────────────────────
export type Role = 'MASTER' | 'CONSULTOR_INTERNO' | 'CONSULTOR_EXTERNO' | 'CLIENTE';

export interface Perfil {
    id: string;
    nome: string;
    email: string;
    role: Role;
}

interface AuthContextData {
    session: Session | null;
    user: User | null;
    perfil: Perfil | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

// ─────────────────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [perfil, setPerfil] = useState<Perfil | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Busca a sessão atual quando a app abre
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user || null);
            if (session?.user) fetchPerfil(session.user.id);
            else setLoading(false);
        });

        // 2. Fica à escuta de mudanças (Login / Logout)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user || null);
            if (session?.user) {
                fetchPerfil(session.user.id);
            } else {
                setPerfil(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // 3. Função que vai à tabela `perfis` descobrir quem é o utilizador
    const fetchPerfil = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('perfis')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) throw error;
            setPerfil(data as Perfil);
        } catch (error) {
            console.error('Erro ao buscar perfil do utilizador:', error);
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ session, user, perfil, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personalizado para usar a Autenticação em qualquer lugar
export function useAuth() {
    return useContext(AuthContext);
}