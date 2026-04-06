import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, TrendingUp, Database, Settings, SlidersHorizontal, Users, User, Building2, LineChart } from 'lucide-react';
import { SideBar, SideBarItem, TopBar, HierarchicalCombobox, type ComboboxLevel } from 'avere-ui';

import { useClient } from '../contexts/ClientContext';
import { useAuth } from '../contexts/AuthContext';

import 'avere-ui/dist/avere-ui.css';
import styles from '../App.module.css';
import { supabase } from '../services/supabase';
import LogoAvereIcone from '../assets/A_Azul.svg';
import LogoAvereCompleta from '../assets/B_Azul.svg';

export default function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [clientes, setClientes] = useState<any[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  const { setSelectedClient } = useClient();

  const { perfil, signOut } = useAuth();

  const isMaster = perfil?.role === 'MASTER';
  const isConsultor = perfil?.role === 'CONSULTOR_INTERNO';

  useEffect(() => {
    async function loadClientes() {
      // Se tivermos RLS ativo no Supabase, isto já filtra automaticamente
      // os clientes que pertencem ao Consultor logado!
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .order('nome', { ascending: true });

      if (data && !error) {
        setClientes(data);
      }
    }
    // Só carrega se tiver um perfil
    if (perfil) loadClientes();
  }, [perfil]);

  const handleSelectCliente = (id: string) => {
    const clienteEncontrado = clientes.find(c => c.id === id);
    if (clienteEncontrado) {
      setSelectedClient({
        id: clienteEncontrado.id,
        codigoAvere: clienteEncontrado.codigo_avere,
        nome: clienteEncontrado.nome,
        codigoXp: clienteEncontrado.codigo_xp,
        codigoBtg: clienteEncontrado.codigo_btg
      });
    } else {
      setSelectedClient(null);
    }
  };

  // <-- NOVA LÓGICA DO COMBOBOX BASEADA EM PERFIL -->
  const comboboxLevels: ComboboxLevel[] = [
    {
      id: "instituicao",
      label: "Instituição",
      placeholder: "Instituição",
      icon: Building2 as any,
      // Instituição fica com 1 opção para TODOS, logo fica sempre travada (correto)
      options: [
        { value: "avere", label: "Avere Consultoria" }
      ],
      defaultValue: "avere"
    },
    {
      id: "consultor",
      label: "Consultor",
      placeholder: "Selecione o Consultor",
      icon: Users as any,
      // <-- CORREÇÃO AQUI: Damos 2 opções ao Master para desbloquear o Dropdown -->
      options: isMaster
        ? [
          { value: "todos", label: "Todos os Consultores" },
          { value: "meus", label: "Apenas Meus Clientes" } // Segunda opção para forçar o dropdown a abrir
        ]
        : [
          { value: perfil?.id || "eu", label: perfil?.nome || "Meu Perfil" }
        ],
      defaultValue: isMaster ? "todos" : (perfil?.id || "eu")
    },
    {
      id: "cliente",
      label: "Cliente Final",
      placeholder: "Selecione o Cliente...",
      icon: User as any,
      options: clientes.map(c => ({ value: c.id, label: c.nome })),
      onChange: (value: any) => handleSelectCliente(value)
    }
  ];
  return (
    <div className={styles.shell}>
      <SideBar
        userName={perfil?.nome || 'Utilizador'}
        userRole={perfil?.role === 'MASTER' ? 'Administrador' : 'Consultor'}
        onLogout={signOut}
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        logo={
          isCollapsed ? (
            <img src={LogoAvereIcone} alt="Avere" className={styles.logoIcon} />
          ) : (
            <img src={LogoAvereCompleta} alt="Avere UI" className={styles.logoFull} />
          )
        }
        isOpenMobile={false} onCloseMobile={function (): void {
          throw new Error('Function not implemented.');
        }}
      >
        <SideBarItem
          icon={Home} label="Home"
          active={location.pathname === '/'} onClick={() => navigate('/')}
        />
        <SideBarItem
          icon={LineChart} label="Rentabilidade"
          active={location.pathname === '/rentabilidade'} onClick={() => navigate('/rentabilidade')}
        />
        <SideBarItem
          icon={LayoutDashboard} label="BTG API"
          active={location.pathname === '/btg'} onClick={() => navigate('/btg')}
        />
        <SideBarItem
          icon={TrendingUp} label="XP API"
          active={location.pathname === '/xp'} onClick={() => navigate('/xp')}
        />

        {isMaster && (
          <>
            <SideBarItem
              icon={Database} label="Master Ativos"
              active={location.pathname === '/master'} onClick={() => navigate('/master')}
            />
            <SideBarItem
              icon={Settings} label="Gestão Master"
              active={location.pathname === '/gestao-master'} onClick={() => navigate('/gestao-master')}
            />
          </>
        )}

        {(isMaster || isConsultor) && (
          <SideBarItem
            icon={SlidersHorizontal} label="Personalizar Ativos"
            active={location.pathname === '/personalizar'} onClick={() => navigate('/personalizar')}
          />
        )}
      </SideBar>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: 'var(--color-fundo)' }}>
        <TopBar
          style={{ padding: '16px 32px', borderBottom: '1px solid var(--color-borda)', background: 'white' }} onToggleMobile={function (): void {
            throw new Error('Function not implemented.');
          }}        >
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {/* O Combobox injetado com as nossas regras */}
            <HierarchicalCombobox levels={comboboxLevels} />
          </div>
        </TopBar>
        <div style={{ padding: '32px', flex: 1, overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}