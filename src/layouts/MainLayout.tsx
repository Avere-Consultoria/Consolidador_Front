import { useState, useEffect, Suspense } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Database, SlidersHorizontal, Users, User, Building2, UsersRound, Wrench, FileStack, LayoutDashboard, Bell, ClipboardCheck, LayoutGrid, ListTodo } from 'lucide-react';
import { SideBar, SideBarItem, SideBarSection, TopBar, HierarchicalCombobox, Toaster, Spinner, type ComboboxLevel } from 'avere-ui';

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
  const [pendenciasCount, setPendenciasCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const { selectedClient, setSelectedClient, consultorSelecionado, setConsultorSelecionado, setConsultorPerfilId } = useClient();
  const { perfil, signOut } = useAuth();

  const isMaster = perfil?.role === 'MASTER';
  const isConsultor = perfil?.role === 'CONSULTOR_INTERNO';

  // 1. Carrega a lista de Consultores (Apenas para Master)
  useEffect(() => {
    async function loadConsultores() {
      if (isMaster) {
        const { data, error } = await supabase
          .from('consultores')
          .select('id, nome, perfil_id')
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

  // Contador de pendências (rascunhos de consultor aguardando curadoria) — só master.
  useEffect(() => {
    async function loadPendencias() {
      if (!isMaster) return;
      const { count } = await supabase
        .from('pendencias_curadoria')
        .select('id', { count: 'exact', head: true });
      setPendenciasCount(count ?? 0);
    }
    if (perfil) loadPendencias();
  }, [perfil, isMaster, location.pathname]);

  // Resolve o perfil_id (auth) do consultor selecionado no header → chave das exceções.
  useEffect(() => {
    let pid: string | null = null;
    if (!isMaster) pid = perfil?.id ?? null;
    else if (consultorSelecionado === 'meus') pid = perfil?.id ?? null;
    else if (consultorSelecionado && consultorSelecionado !== 'todos') {
      pid = consultores.find(c => c.id === consultorSelecionado)?.perfil_id ?? null;
    }
    setConsultorPerfilId(pid);
  }, [consultorSelecionado, consultores, isMaster, perfil?.id, setConsultorPerfilId]);

  const handleSelectCliente = (id: string) => {
    const clienteEncontrado = clientes.find(c => c.id === id);
    if (clienteEncontrado) {
      setSelectedClient({
        id: clienteEncontrado.id,
        codigoAvere: clienteEncontrado.codigo_avere,
        nome: clienteEncontrado.nome,
        // consultorId = perfil_id (auth) do dono — chave usada em excecoes.consultor_id.
        // Master: resolve via consultores; consultor interno: ele mesmo.
        consultorId: isMaster
          ? (consultores.find(c => c.id === clienteEncontrado.consultor_id)?.perfil_id ?? null)
          : (perfil?.id ?? null),
      });
      // Escolher um cliente abre o workspace dele, mantendo a aba atual (se houver).
      // Exceção: em Alertas e Tarefas o seletor filtra a lista no lugar (não navega).
      if (!location.pathname.startsWith('/alertas') && !location.pathname.startsWith('/tarefas')) {
        const tab = location.pathname.match(/^\/cliente\/[^/]+\/([^/]+)/)?.[1] ?? 'posicao';
        navigate(`/cliente/${clienteEncontrado.id}/${tab}`);
      }
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
      // Controlado pelo cliente do contexto: ao trocar o consultor (que faz
      // setSelectedClient(null)), este nível perde a seleção automaticamente.
      // '__todos__' = sem cliente (Radix Select proíbe value=""); mapeia p/ null no contexto.
      value: selectedClient?.id ?? '__todos__',
      // Se não houver clientes, mostramos a opção informativa sem a prop 'disabled'
      options: clientes.length > 0
        ? [{ value: "__todos__", label: "Todos os clientes" }, ...clientes.map(c => ({ value: c.id, label: c.nome }))]
        : [{ value: "vazio", label: "⚠️ Nenhum cliente vinculado" }],
      onChange: (value: any) => {
        // Bloqueamos a lógica de seleção nos valores-sentinela ('vazio'/'__todos__')
        if (value && value !== "vazio" && value !== "__todos__") {
          handleSelectCliente(value);
        } else {
          // "Todos os clientes": limpa o foco. Se estiver DENTRO do workspace, sai
          // pro Dashboard (senão a casca re-busca o cliente da URL e "volta").
          setSelectedClient(null);
          if (location.pathname.startsWith('/cliente')) navigate('/dashboard');
        }
      }
    },
  ];

  return (
    <div className={styles.shell}>
      <Toaster position="top-right" richColors />
      <SideBar
        userName={perfil?.nome || 'Utilizador'}
        userRole={perfil?.role === 'MASTER' ? 'Administrador' : 'Consultor'}
        onLogout={signOut}
        isCollapsed={isCollapsed}
        onToggle={() => {
          const novo = !isCollapsed;
          setIsCollapsed(novo);
          localStorage.setItem('sidebar:collapsed', novo ? '1' : '0');
        }}
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
        {(isMaster || isConsultor) && (
          <SideBarItem
            icon={LayoutDashboard} label="Dashboard"
            active={location.pathname === '/dashboard'} onClick={() => navigate('/dashboard')}
          />
        )}
        {(isMaster || isConsultor) && (
          <SideBarItem
            icon={Bell} label="Alertas"
            active={location.pathname === '/alertas'} onClick={() => navigate('/alertas')}
          />
        )}
        {(isMaster || isConsultor) && (
          <SideBarItem
            icon={ListTodo} label="Tarefas"
            active={location.pathname === '/tarefas'} onClick={() => navigate('/tarefas')}
          />
        )}
        <SideBarItem
          icon={User} label="Cliente"
          active={location.pathname.startsWith('/cliente')} onClick={() => navigate('/cliente')}
        />
        <SideBarItem
          icon={LayoutGrid} label="Hub"
          active={location.pathname === '/hub'} onClick={() => navigate('/hub')}
        />
        {isConsultor && (
          <SideBarItem
            icon={SlidersHorizontal} label="Personalizar Ativos"
            active={location.pathname === '/personalizar'} onClick={() => navigate('/personalizar')}
          />
        )}

        {isConsultor && (
          <SideBarItem
            icon={FileStack} label="Meus Envios"
            active={location.pathname === '/documentos-manuais'} onClick={() => navigate('/documentos-manuais')}
          />
        )}

        {isMaster && (
          <>
            <SideBarSection label="Administração" />
            <SideBarItem
              icon={ClipboardCheck}
              label="Pendências"
              badge={pendenciasCount > 0 ? pendenciasCount : undefined}
              active={location.pathname.startsWith('/pendencias')} onClick={() => navigate('/pendencias')}
            />
            <SideBarItem
              icon={UsersRound} label="Cadastros"
              active={location.pathname.startsWith('/cadastros')} onClick={() => navigate('/cadastros')}
            />
            <SideBarItem
              icon={Database} label="Inteligência"
              active={location.pathname.startsWith('/inteligencia')} onClick={() => navigate('/inteligencia')}
            />
            <SideBarItem
              icon={Wrench} label="Operação"
              active={location.pathname.startsWith('/operacao')} onClick={() => navigate('/operacao')}
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '1760px', margin: '0 auto', width: '100%' }}>
            <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}