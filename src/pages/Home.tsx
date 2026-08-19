import { Typography } from 'avere-ui';
import { HomeSkeleton } from '../components/home/HomeSkeleton';
import { EstadoErro } from '../components/shared/EstadoErro';
import { PieChart as PieIcon, AlertTriangle, RotateCw } from 'lucide-react';

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
    erroCarga,
    semRede,
    fontesComFalha,
    metrics,
    diasVencimento, setDiasVencimento,
    drawerCarteirasAberto, setDrawerCarteirasAberto,
    carteiraAtiva, setCarteiraAtiva,
    opcoesCarteira,
    instituicoesManuais,
    periodo, setPeriodo, mesesFechados,
    recarregar, recarregarTudo,
  } = useHomeMetrics();

  // <-- 1. NOVO ESTADO: Se não houver cliente, mostra o Empty State amigável -->
  if (!selectedClient) {
    return <NenhumClienteSelecionado />;
  }

  // 2. Sem rede — o TanStack pausa a consulta e retoma sozinho quando a conexão
  // volta; skeleton mudo aqui viraria espera infinita sem explicação.
  if (semRede) return (
    <EstadoErro
      offline
      titulo="Sem conexão"
      dica="Aguardando a rede voltar — a posição carrega sozinha assim que reconectar."
    />
  );

  // 3. Loading State — skeleton espelha o layout (primeira carga; com cache nem aparece)
  if (loading) return <HomeSkeleton />;

  // 2b. Erro de carga — na tela, com saída (toast some e deixaria a tela órfã)
  if (erroCarga) return (
    <EstadoErro
      titulo="Não conseguimos carregar a posição"
      dica="A consulta às posições falhou. Os dados não foram perdidos — tente recarregar."
      onRetry={recarregarTudo}
    />
  );

  // 3. Render Principal — a barra de ações (Enviar arquivos / Gerir Carteiras) fica
  // SEMPRE visível. Sem dados, o corpo vira o aviso "Aguardando Sincronização" — mas o
  // header continua, pra um cliente novo (ou que só terá posição manual) conseguir
  // cadastrar a instituição manual e enviar os arquivos. Antes o empty state engolia a
  // tela inteira e o fluxo manual ficava inalcançável.
  const semDados = !metrics.hasData;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* DADO PARCIAL: fonte falhou mas o resto veio — a tela continua útil,
          desde que AVISE. Total menor com cara de completo é mentira por omissão. */}
      {periodo === 'LIVE' && fontesComFalha.length > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: 'var(--color-warning-bg)', border: '1px solid var(--color-warning-border)',
          borderRadius: 'var(--radius-md)', padding: '10px 16px',
        }} role="alert">
          <AlertTriangle size={16} style={{ color: 'var(--color-warning-text)', flexShrink: 0 }} />
          <Typography variant="p" style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-warning-text)' }}>
            <strong>{fontesComFalha.join(' e ')}</strong> não {fontesComFalha.length > 1 ? 'responderam' : 'respondeu'} —
            os totais desta tela podem não incluir {fontesComFalha.length > 1 ? 'essas instituições' : 'essa instituição'}.
          </Typography>
          <button onClick={recarregarTudo} style={{
            marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6,
            background: 'transparent', border: '1px solid var(--color-warning-border)',
            borderRadius: 'var(--radius-sm)', padding: '4px 10px', cursor: 'pointer',
            color: 'var(--color-warning-text)', fontSize: 'var(--text-xs)', fontWeight: 600, fontFamily: 'inherit',
            whiteSpace: 'nowrap',
          }}>
            <RotateCw size={12} /> Recarregar
          </button>
        </div>
      )}

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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 24px', gap: '16px', border: '2px dashed var(--color-border-default)', borderRadius: 'var(--radius-lg)', color: 'var(--color-text-secondary)' }}>
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

          <TabelaAtivos ativos={metrics.todosAtivos} patrimonioTotal={metrics.patrimonioTotal} onPersonalizado={recarregar} onPersonalizadoTudo={recarregarTudo} />
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