import { Spinner, Typography } from 'avere-ui';
import { PieChart as PieIcon } from 'lucide-react';

import { useHomeMetrics } from '../hooks/useHomeMetrics';
import { HomeHeader } from '../components/home/HomeHeader';
import { ResumoCards } from '../components/home/graficos/ResumoCards';
import { TabelaAtivos } from '../components/home/TabelaAtivos';
import { DrawerGerenciarCarteiras } from '../components/home/modais/DrawerGerenciarCarteiras';
import { RiscoEmissor } from '../components/home/graficos/RiscoEmissor';
import { CreditoBancarioFGC } from '../components/home/graficos/CreditoBancarioFGC';
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
    diasVencimento, setDiasVencimento,
    drawerCarteirasAberto, setDrawerCarteirasAberto,
    carteiraAtiva, setCarteiraAtiva,
    opcoesCarteira,
    instituicoesManuais,
    periodo, setPeriodo, mesesFechados,
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

  // 3. Render Principal — a barra de ações (Enviar arquivos / Gerir Carteiras) fica
  // SEMPRE visível. Sem dados, o corpo vira o aviso "Aguardando Sincronização" — mas o
  // header continua, pra um cliente novo (ou que só terá posição manual) conseguir
  // cadastrar a instituição manual e enviar os arquivos. Antes o empty state engolia a
  // tela inteira e o fluxo manual ficava inalcançável.
  const semDados = !metrics.hasData;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <HomeHeader
        cliente={selectedClient}
        carteiraAtiva={carteiraAtiva}
        setCarteiraAtiva={setCarteiraAtiva}
        opcoesCarteira={opcoesCarteira}
        fontesRef={metrics.fontesRef}
        onOpenGerenciarCarteiras={() => setDrawerCarteirasAberto(true)}
        periodo={periodo}
        setPeriodo={setPeriodo}
        mesesFechados={mesesFechados}
      />

      {semDados ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 24px', gap: '16px', border: '2px dashed var(--color-borda)', borderRadius: '12px', opacity: 0.6 }}>
          <PieIcon size={48} />
          <Typography variant="h2">Aguardando Sincronização</Typography>
          <Typography variant="p" style={{ textAlign: 'center', maxWidth: 560 }}>
            Sincronize via BTG, XP, Avenue ou Ágora para carregar os dados de {selectedClient?.nome}.
            Para instituições <strong>sem API</strong>, cadastre a instituição manual em
            <strong> Cadastro de Clientes</strong> e depois use <strong>Enviar arquivos</strong> para subir os extratos.
          </Typography>
        </div>
      ) : (
        <>
          <ResumoCards metrics={metrics} />

          <GraficoAlocacao
            alocacaoData={metrics.alocacaoData}
            comparativoData={metrics.comparativoData}
            comparativoInstituicoes={metrics.comparativoInstituicoes}
          />

          <LiquidezVisao
            dados={metrics.liquidezData}
            dadosPrev={metrics.liquidezDataPrev}
            dadosRV={metrics.liquidezDataRV}
            patrimonioTotal={metrics.patrimonioTotal}
          />

          {/* Gráficos só aparecem quando há dado — carteira sem o tema não exibe card vazio. */}
          {(metrics.creditoBancarioData?.length ?? 0) > 0 && (
            <CreditoBancarioFGC dados={metrics.creditoBancarioData} />
          )}

          {(metrics.creditoPrivadoData?.length ?? 0) > 0 && (
            <RiscoEmissor dados={metrics.creditoPrivadoData} />
          )}

          {(metrics.setorialData?.length ?? 0) > 0 && (
            <DistribuicaoSetorial dados={metrics.setorialData} />
          )}

          {metrics.todosAtivos?.some(a => a.vencimento) && (
            <VencimentosVisao
              ativos={metrics.todosAtivos}
              diasVencimento={diasVencimento}
              setDiasVencimento={setDiasVencimento}
            />
          )}

          <TabelaAtivos ativos={metrics.todosAtivos} patrimonioTotal={metrics.patrimonioTotal} />
        </>
      )}

      {/* Drawer invisível na root para gerir z-index corretamente */}
      <DrawerGerenciarCarteiras
        aberto={drawerCarteirasAberto}
        onClose={() => setDrawerCarteirasAberto(false)}
        temBtg={metrics.temBtg}
        temXp={metrics.temXp}
        temAvenue={metrics.temAvenue}
        temAgora={metrics.temAgora}
        instituicoesManuais={instituicoesManuais}
        clienteId={selectedClient?.id ?? null}
      />
    </div>
  );
}