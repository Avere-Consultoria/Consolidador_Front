import { useState, useEffect, Suspense } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, LineChart, Database, SlidersHorizontal, Users, User, Building2, BookOpen, UserPlus, UsersRound, Lock, History, Wrench, RefreshCw, FileStack } from 'lucide-react';
import { SideBar, SideBarItem, TopBar, HierarchicalCombobox, Toaster, Spinner, type ComboboxLevel } from 'avere-ui';

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
      value: selectedClient?.id ?? '',
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
      <Toaster position="top-right" richColors />
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
        {(isMaster || isConsultor) && (
          <SideBarItem
            icon={SlidersHorizontal} label="Personalizar Ativos"
            active={location.pathname === '/personalizar'} onClick={() => navigate('/personalizar')}
          />
        )}
        {(isMaster || isConsultor) && (
          <SideBarItem
            icon={Lock} label="Fechamento de Mês"
            active={location.pathname === '/fechamento'} onClick={() => navigate('/fechamento')}
          />
        )}
        {(isMaster || isConsultor) && (
          <SideBarItem
            icon={History} label="Histórico Mensal"
            active={location.pathname === '/historico'} onClick={() => navigate('/historico')}
          />
        )}

        {isMaster && (
          <>
            <div style={{
              padding: isCollapsed ? '24px 12px 8px' : '24px 20px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              {!isCollapsed && (
                <span style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.3)', // Cor suave para não distrair
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  whiteSpace: 'nowrap'
                }}>
                  Administração
                </span>
              )}
              <div style={{
                flex: 1,
                height: '1px',
                background: 'rgba(255,255,255,0.1)'
              }} />
            </div>
            <SideBarItem
              icon={Database} label="Master Ativos"
              active={location.pathname === '/master'} onClick={() => navigate('/master')}
            />
            <SideBarItem
              icon={FileStack} label="Documentos Manuais"
              active={location.pathname === '/documentos-manuais'} onClick={() => navigate('/documentos-manuais')}
            />
            <SideBarItem
              icon={BookOpen} label="Gestão Master"
              active={location.pathname === '/gestao-master'} onClick={() => navigate('/gestao-master')}
            />
            <SideBarItem
              icon={UserPlus} label="Cadastro Clientes"
              active={location.pathname === '/cadastro-clientes'} onClick={() => navigate('/cadastro-clientes')}
            />
            <SideBarItem
              icon={UsersRound} label="Gestão de Equipe"
              active={location.pathname === '/gestao-equipe'} onClick={() => navigate('/gestao-equipe')}
            />
            <SideBarItem
              icon={Wrench} label="Manutenção"
              active={location.pathname === '/manutencao'} onClick={() => navigate('/manutencao')}
            />
            <SideBarItem
              icon={RefreshCw} label="Sincronização em Massa"
              active={location.pathname === '/sincronizacao'} onClick={() => navigate('/sincronizacao')}
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
            <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}