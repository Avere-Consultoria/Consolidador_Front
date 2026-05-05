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
  const [consultores, setConsultores] = useState<any[]>([]);
  const [consultorSelecionado, setConsultorSelecionado] = useState<string>("todos");

  const navigate = useNavigate();
  const location = useLocation();

  const { setSelectedClient } = useClient();
  const { perfil, signOut } = useAuth();

  const isMaster = perfil?.role === 'MASTER';
  const isConsultor = perfil?.role === 'CONSULTOR_INTERNO';

  // 1. Carrega a lista de Consultores (Apenas para Master)
  useEffect(() => {
    async function loadConsultores() {
      if (isMaster) {
        const { data, error } = await supabase
          .from('consultores')
          .select('id, nome')
          .eq('ativo', true)
          .order('nome');

        if (data && !error) {
          setConsultores(data);
        }
      }
    }
    if (perfil) loadConsultores();
  }, [perfil, isMaster]);

  // 2. Carrega Clientes filtrados pelo Consultor selecionado na TopBar
  useEffect(() => {
    async function loadClientes() {
      let query = supabase.from('clientes').select('*').order('nome');

      // Se for Master e selecionou um consultor específico
      if (isMaster && consultorSelecionado !== "todos" && consultorSelecionado !== "meus") {
        query = query.eq('consultor_id', consultorSelecionado);
      }
      // Se o Master quiser ver apenas os clientes dele (sem consultor atribuído)
      else if (isMaster && consultorSelecionado === "meus") {
        query = query.is('consultor_id', null);
      }

      // NOTA: Se for CONSULTOR_INTERNO, o RLS do Supabase já filtra por auth.uid() automaticamente

      const { data, error } = await query;

      if (data && !error) {
        setClientes(data);
      }
    }

    if (perfil) loadClientes();
  }, [perfil, consultorSelecionado, isMaster]);

  const handleSelectCliente = (id: string) => {
    const clienteEncontrado = clientes.find(c => c.id === id);
    if (clienteEncontrado) {
      setSelectedClient({
        id: clienteEncontrado.id,
        codigoAvere: clienteEncontrado.codigo_avere,
        nome: clienteEncontrado.nome,
        codigoXp: clienteEncontrado.codigo_xp,
        codigoBtg: clienteEncontrado.codigo_btg,
        codigoAvenue: clienteEncontrado.codigo_avenue
      });
    } else {
      setSelectedClient(null);
    }
  };

  // 3. Configuração dinâmica do Combobox
  const comboboxLevels: ComboboxLevel[] = [
    {
      id: "instituicao",
      label: "Instituição",
      placeholder: "Instituição",
      icon: Building2 as any,
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
      options: isMaster
        ? [
          { value: "todos", label: "Todos os Consultores" },
          ...consultores.map(c => ({ value: c.id, label: c.nome })),
          { value: "meus", label: "Apenas Meus Clientes" }
        ]
        : [
          { value: perfil?.id || "eu", label: perfil?.nome || "Meu Perfil" }
        ],
      defaultValue: "todos",
      onChange: (value: any) => {
        setConsultorSelecionado(value);
        setSelectedClient(null); // Reseta o cliente ao trocar de consultor
      }
    },
    {
      id: "cliente",
      label: "Cliente Final",
      placeholder: "Selecione o Cliente...",
      icon: User as any,
      // Se não houver clientes, mostramos a opção informativa sem a prop 'disabled'
      options: clientes.length > 0
        ? clientes.map(c => ({ value: c.id, label: c.nome }))
        : [{ value: "vazio", label: "⚠️ Nenhum cliente vinculado" }],
      onChange: (value: any) => {
        // Bloqueamos a execução da lógica de seleção se o valor for o de "vazio"
        if (value && value !== "vazio") {
          handleSelectCliente(value);
        } else {
          // Garante que nenhum cliente fique selecionado no contexto
          setSelectedClient(null);
        }
      }
    },
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
        isOpenMobile={false}
        onCloseMobile={() => { }}
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
        <SideBarItem
          icon={TrendingUp} label="Avenue API"
          active={location.pathname === '/avenue'} onClick={() => navigate('/avenue')}
        />
        {(isMaster || isConsultor) && (
          <SideBarItem
            icon={SlidersHorizontal} label="Personalizar Ativos"
            active={location.pathname === '/personalizar'} onClick={() => navigate('/personalizar')}
          />
        )}

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
            <SideBarItem
              icon={Settings} label="Cadastro Clientes"
              active={location.pathname === '/cadastro-clientes'} onClick={() => navigate('/cadastro-clientes')}
            />
            <SideBarItem
              icon={Settings} label="Gestão de Equipe"
              active={location.pathname === '/gestao-equipe'} onClick={() => navigate('/gestao-equipe')}
            />
          </>
        )}
      </SideBar>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: 'var(--color-fundo)' }}>
        <TopBar
          style={{ padding: '16px 32px', borderBottom: '1px solid var(--color-borda)', background: 'white' }}
          onToggleMobile={() => { }}
        >
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
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