import { Spinner, Typography } from 'avere-ui';
import { PieChart as PieIcon } from 'lucide-react';

import { useHomeMetrics } from '../hooks/useHomeMetrics';
import { HomeHeader } from '../components/home/HomeHeader';
import { ResumoCards } from '../components/home/graficos/ResumoCards';
import { TabelaAtivos } from '../components/home/TabelaAtivos';
import { DrawerGerenciarCarteiras } from '../components/home/modais/DrawerGerenciarCarteiras';
import { RiscoEmissor } from '../components/home/graficos/RiscoEmissor';
import { DistribuicaoSetorial } from '../components/home/graficos/DistribuicaoSetorial';
import { LiquidezVisao } from '../components/home/graficos/LiquidezVisao';
import { NenhumClienteSelecionado } from '../components/home/NenhumClienteSelecionado';
import { GraficoAlocacao } from '../components/home/graficos/GraficoAlocacao';
import { VencimentosVisao } from '../components/home/graficos/VencimentosVisao';

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

  // <-- 1. NOVO ESTADO: Se não houver cliente, mostra o Empty State amigável -->
  if (!selectedClient) {
    return <NenhumClienteSelecionado />;
  }

  // 2. Loading State
  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
      <Spinner size="lg" />
    </div>
  );

  // 3. Empty State (Sem dados em nenhuma corretora para o cliente selecionado)
  if (!metrics.hasData && selectedClient) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px', gap: '16px', border: '2px dashed var(--color-borda)', borderRadius: '12px', opacity: 0.6 }}>
        <PieIcon size={48} />
        <Typography variant="h2">Aguardando Sincronização</Typography>
        <Typography variant="p">
          Acede ao BTG, XP, Avenue ou Ágora para carregar os dados de {selectedClient?.nome}.
        </Typography>
      </div>
    );
  }

  // 4. Render Principal
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <HomeHeader
        cliente={selectedClient}
        carteiraAtiva={carteiraAtiva}
        setCarteiraAtiva={setCarteiraAtiva}
        opcoesCarteira={opcoesCarteira}
        dataRefBtg={metrics.dataRefBtg}
        dataRefXp={metrics.dataRefXp}
        dataRefAvenue={metrics.dataRefAvenue}
        dataRefAgora={metrics.dataRefAgora}
        incluirBtg={metrics.incluirBtg}
        incluirXp={metrics.incluirXp}
        incluirAvenue={metrics.incluirAvenue}
        incluirAgora={metrics.incluirAgora}
        onOpenGerenciarCarteiras={() => setDrawerCarteirasAberto(true)}
      />

      <ResumoCards metrics={metrics} />

      <GraficoAlocacao
        alocacaoData={metrics.alocacaoData}
        comparativoData={metrics.comparativoData}
      />

      <LiquidezVisao
        dados={metrics.liquidezData}
        dadosPrev={metrics.liquidezDataPrev}
        dadosRV={metrics.liquidezDataRV}
      />

      <RiscoEmissor dados={metrics.exposicaoRiscoData} />

      <DistribuicaoSetorial dados={metrics.setorialData} />

      <VencimentosVisao
        ativos={metrics.todosAtivos}
        diasVencimento={diasVencimento}
        setDiasVencimento={setDiasVencimento}
      />

      <TabelaAtivos ativos={metrics.todosAtivos} patrimonioTotal={metrics.patrimonioTotal} />

      {/* Drawer invisível na root para gerir z-index corretamente */}
      <DrawerGerenciarCarteiras
        aberto={drawerCarteirasAberto}
        onClose={() => setDrawerCarteirasAberto(false)}
        temBtg={!!snapshotData.btg}
        temXp={!!snapshotData.xp}
        temAvenue={!!snapshotData.avenue}
        temAgora={!!snapshotData.agora}
        clienteId={selectedClient?.id ?? null}
      />
    </div>
  );
}