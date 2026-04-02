import { Spinner, Typography } from 'avere-ui';
import { PieChart as PieIcon } from 'lucide-react';

import { useHomeMetrics } from '../hooks/useHomeMetrics';
import { HomeHeader } from '../components/home/HomeHeader';
import { ResumoCards } from '../components/home/ResumoCards';
import { Graficos } from '../components/home/Graficos';
import { AlocacaoCards } from '../components/home/AlocacaoCards';
import { TabelaAtivos } from '../components/home/TabelaAtivos';
import { DrawerGerenciarCarteiras } from '../components/home/modais/DrawerGerenciarCarteiras';

export default function Home() {
  const {
    selectedClient,
    loading,
    metrics,
    snapshotData,
    diasVencimento, setDiasVencimento,
    drawerCarteirasAberto, setDrawerCarteirasAberto,
    carteiraAtiva, setCarteiraAtiva,
    opcoesCarteira,
  } = useHomeMetrics();

  // Loading State
  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
      <Spinner size="lg" />
    </div>
  );

  // Empty State (Sem dados em ambas as corretoras)
  if (!parseFloat(snapshotData.btg?.patrimonio_total || 0) && !parseFloat(snapshotData.xp?.patrimonio_total || 0) && selectedClient) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px', gap: '16px', border: '2px dashed var(--color-borda)', borderRadius: '12px', opacity: 0.6 }}>
        <PieIcon size={48} />
        <Typography variant="h2">Aguardando Sincronização</Typography>
        <Typography variant="p">
          Acede ao BTG API ou XP API para carregar os dados de {selectedClient?.nome}.
        </Typography>
      </div>
    );
  }

  // Render Principal
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <HomeHeader
        cliente={selectedClient}
        carteiraAtiva={carteiraAtiva}
        setCarteiraAtiva={setCarteiraAtiva}
        opcoesCarteira={opcoesCarteira}
        dataRefBtg={metrics.dataRefBtg}
        dataRefXp={metrics.dataRefXp}
        onOpenGerenciarCarteiras={() => setDrawerCarteirasAberto(true)}
      />

      <ResumoCards metrics={metrics} diasVencimento={diasVencimento} setDiasVencimento={setDiasVencimento} />

      <Graficos metrics={metrics} />

      <AlocacaoCards alocacao={metrics.alocacao} patrimonioTotal={metrics.patrimonioTotal} />

      <TabelaAtivos ativos={metrics.todosAtivos} patrimonioTotal={metrics.patrimonioTotal} />

      {/* Drawer invisível na root para gerir z-index corretamente */}
      <DrawerGerenciarCarteiras
        aberto={drawerCarteirasAberto}
        onClose={() => setDrawerCarteirasAberto(false)}
        temBtg={!!snapshotData.btg}
        temXp={!!snapshotData.xp}
        clienteId={selectedClient?.id ?? null}
      />
    </div>
  );
}