import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, TrendingUp, Users, User } from 'lucide-react';
import { SideBar, SideBarItem, TopBar, HierarchicalCombobox, type ComboboxLevel } from 'avere-ui';

// 1. Importe o Contexto e o Cliente do Supabase (ajuste os caminhos conforme seu projeto)
import { useClient } from '../contexts/ClientContext';


import 'avere-ui/dist/avere-ui.css';
import styles from '../App.module.css';
import { supabase } from '../services/supabase';
import LogoAvereIcone from '../assets/A_Azul.svg';
import LogoAvereCompleta from '../assets/B_Azul.svg'; // Ajuste o nome do seu arquivo

export default function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [clientes, setClientes] = useState<any[]>([]); // Estado para os clientes do banco

  const navigate = useNavigate();
  const location = useLocation();

  // 2. Acesse a função de setar o cliente global
  const { setSelectedClient } = useClient();

  // 3. Buscar clientes do Supabase ao montar o componente
  useEffect(() => {
    async function loadClientes() {
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .order('nome', { ascending: true });

      if (data && !error) {
        setClientes(data);
      }
    }
    loadClientes();
  }, []);

  // 4. Função disparada quando seleciona um cliente no Combobox
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

  const comboboxLevels: ComboboxLevel[] = [
    {
      id: "assessoria",
      label: "Master",
      placeholder: "Selecione o Assessor",
      icon: Users as any,
      options: [
        { value: "a1", label: "Assessoria AVERE" }
      ],
      defaultValue: "a1"
    },
    {
      id: "cliente",
      label: "Cliente Final",
      placeholder: "Selecione o Cliente",
      icon: User as any,
      // 5. As opções agora vêm do banco de dados
      options: clientes.map(c => ({ value: c.id, label: c.nome })),
      // Evento que a avere-ui dispara ao trocar o valor
      onChange: (value: any) => handleSelectCliente(value)
    }
  ];

  return (
    <div className={styles.shell}>
      <SideBar
        userName="Luiz Henrique"
        userRole="Desenvolvedor"
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
        }}      >
        <SideBarItem
          icon={Home}
          label="Home"
          active={location.pathname === '/'}
          onClick={() => navigate('/')}
        />
        <SideBarItem
          icon={LayoutDashboard}
          label="BTG API"
          active={location.pathname === '/btg'}
          onClick={() => navigate('/btg')}
        />
        <SideBarItem
          icon={TrendingUp}
          label="XP API"
          active={location.pathname === '/xp'}
          onClick={() => navigate('/xp')}
        />
      </SideBar>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: 'var(--color-fundo)' }}>
        <TopBar
          style={{ padding: '16px 32px', borderBottom: '1px solid var(--color-borda)', background: 'white' }} onToggleMobile={function (): void {
            throw new Error('Function not implemented.');
          }}        >
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {/* 6. O componente agora reflete os dados do banco */}
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