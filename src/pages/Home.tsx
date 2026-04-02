import { useState, useEffect, useMemo } from 'react';
import { Typography, Card, CardContent, Badge, Spinner, Button, Select } from 'avere-ui';
import {
  Drawer, DrawerContent, DrawerHeader, DrawerBody,
  DrawerTitle, DrawerDescription, DrawerSeparator,
} from 'avere-ui';
import {
  Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter,
} from 'avere-ui';
import { Briefcase, AlertCircle, PieChart as PieIcon, Building2, LayoutGrid } from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList,
} from 'recharts';
import { useClient } from '../contexts/ClientContext';
import { supabase } from '../services/supabase';

// ─────────────────────────────────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────────────────────────────────

interface ConsolidatedAtivo {
  rowId: string;
  nome: string;
  tipo: string;
  subTipo?: string;
  valorLiquido: number;
  vencimento?: string | null;
  instituicao: 'BTG Pactual' | 'XP Investimentos';
}

interface CarteiraPersonalizada {
  id: string;
  nome: string;
  instituicoes: string[];
  criada_em: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const fmt = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

const fmtK = (v: number) => {
  if (v >= 1_000_000) return `R$ ${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `R$ ${(v / 1_000).toFixed(0)}K`;
  return fmt(v);
};

const fmtDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString('pt-BR') : '-';

const pct = (v: number, total: number) =>
  total > 0 ? (v / total) * 100 : 0;

// ─────────────────────────────────────────────────────────────────────────────
// Cores
// ─────────────────────────────────────────────────────────────────────────────

const CORES = {
  btg: '#0083CB',
  xp: '#FF6B00',
  rendaFixa: '#0083CB',
  fundos: '#00B4D8',
  rendaVariavel: '#F59E0B',
  previdencia: '#8B5CF6',
  outros: '#6B7280',
};

// ─────────────────────────────────────────────────────────────────────────────
// Tooltips
// ─────────────────────────────────────────────────────────────────────────────

const TooltipCustom = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#fff', border: '1px solid rgba(0,0,0,0.08)',
      borderRadius: '8px', padding: '10px 14px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      fontFamily: 'Montserrat, sans-serif',
    }}>
      <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
        {payload[0].name}
      </div>
      <div style={{ fontSize: '14px', fontWeight: 700, color: payload[0].fill || CORES.btg }}>
        {fmtK(payload[0].value)}
      </div>
      {payload[0].payload?.pct != null && (
        <div style={{ fontSize: '11px', opacity: 0.5 }}>
          {payload[0].payload.pct.toFixed(1)}% do total
        </div>
      )}
    </div>
  );
};

const TooltipBarras = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#fff', border: '1px solid rgba(0,0,0,0.08)',
      borderRadius: '8px', padding: '10px 14px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      fontFamily: 'Montserrat, sans-serif',
    }}>
      <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', marginBottom: '2px' }}>
          <div style={{ width: 8, height: 8, borderRadius: '2px', background: p.fill }} />
          <span style={{ fontWeight: 600 }}>{p.name}:</span>
          <span>{fmtK(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Página principal
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const { selectedClient } = useClient();
  const [loading, setLoading] = useState(false);
  const [snapshotData, setSnapshotData] = useState<{ btg: any; xp: any }>({ btg: null, xp: null });
  const [diasVencimento, setDiasVencimento] = useState(30);
  const [drawerCarteirasAberto, setDrawerCarteirasAberto] = useState(false);

  const PERIODOS = [
    { label: '7 dias', dias: 7 },
    { label: '15 dias', dias: 15 },
    { label: '30 dias', dias: 30 },
    { label: '60 dias', dias: 60 },
    { label: '90 dias', dias: 90 },
    { label: '6 meses', dias: 180 },
    { label: '1 ano', dias: 365 },
    { label: 'Todos', dias: 9999 },
  ];

  // ── Busca os snapshots mais recentes ─────────────────────────────────────
  useEffect(() => {
    async function fetchLatestSnapshots() {
      if (!selectedClient?.id) return;
      setLoading(true);
      try {
        const [btgRes, xpRes] = await Promise.all([
          supabase
            .from('posicao_btg_snapshots')
            .select(`
              patrimonio_total, data_referencia,
              saldo_cc, saldo_rf, saldo_fundos, saldo_rv, saldo_prev, saldo_cripto,
              posicao_btg_ativos ( id, emissor, sub_tipo, tipo, valor_liquido, maturity_date )
            `)
            .eq('cliente_id', selectedClient.id)
            .order('data_referencia', { ascending: false })
            .limit(1)
            .maybeSingle(),

          supabase
            .from('posicao_xp_snapshots')
            .select(`
              patrimonio_total, patrimonio_total_liquido, data_referencia,
              saldo_acoes, saldo_fundos, saldo_renda_fixa, saldo_tesouro_direto,
              saldo_previdencia, saldo_coe,
              posicao_xp_ativos ( id, nome, sub_tipo, tipo, valor_liquido, data_vencimento )
            `)
            .eq('cliente_id', selectedClient.id)
            .order('data_referencia', { ascending: false })
            .limit(1)
            .maybeSingle(),
        ]);

        setSnapshotData({ btg: btgRes.data, xp: xpRes.data });
      } catch (err) {
        console.error('Erro na carga da Home:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchLatestSnapshots();
  }, [selectedClient]);

  // ── Métricas consolidadas ─────────────────────────────────────────────────
  const metrics = useMemo(() => {
    const btgTotal = parseFloat(snapshotData.btg?.patrimonio_total || 0);
    const xpTotal = parseFloat(snapshotData.xp?.patrimonio_total || 0);
    const patrimonioTotal = btgTotal + xpTotal;

    const btgAtivos: ConsolidatedAtivo[] = (snapshotData.btg?.posicao_btg_ativos || [])
      .map((a: any, i: number) => ({
        rowId: `btg-${i}-${a.id}`,
        nome: a.emissor ?? '-',
        tipo: a.tipo ?? '-',
        subTipo: a.sub_tipo,
        valorLiquido: parseFloat(a.valor_liquido || 0),
        vencimento: a.maturity_date,
        instituicao: 'BTG Pactual' as const,
      }));

    const xpAtivos: ConsolidatedAtivo[] = (snapshotData.xp?.posicao_xp_ativos || [])
      .map((a: any, i: number) => ({
        rowId: `xp-${i}-${a.id}`,
        nome: a.nome ?? '-',
        tipo: a.tipo ?? '-',
        subTipo: a.sub_tipo,
        valorLiquido: parseFloat(a.valor_liquido || 0),
        vencimento: a.data_vencimento,
        instituicao: 'XP Investimentos' as const,
      }));

    const totalAtivos = [...btgAtivos, ...xpAtivos];

    const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
    const limiteData = new Date(); limiteData.setDate(hoje.getDate() + diasVencimento);
    const vencimentosProx = totalAtivos.filter(a => {
      if (!a.vencimento) return false;
      const d = new Date(a.vencimento);
      return d > hoje && (diasVencimento === 9999 || d <= limiteData);
    });

    const todosAtivos = [...totalAtivos].sort((a, b) => b.valorLiquido - a.valorLiquido);

    const alocacao = {
      rendaFixa: (snapshotData.btg?.saldo_rf || 0) + (snapshotData.xp?.saldo_renda_fixa || 0) + (snapshotData.xp?.saldo_tesouro_direto || 0),
      fundos: (snapshotData.btg?.saldo_fundos || 0) + (snapshotData.xp?.saldo_fundos || 0),
      rendaVariavel: (snapshotData.btg?.saldo_rv || 0) + (snapshotData.xp?.saldo_acoes || 0),
      previdencia: (snapshotData.btg?.saldo_prev || 0) + (snapshotData.xp?.saldo_previdencia || 0),
      outros: (snapshotData.btg?.saldo_cc || 0) + (snapshotData.btg?.saldo_cripto || 0) + (snapshotData.xp?.saldo_coe || 0),
    };

    const donutData = [
      { name: 'BTG Pactual', value: btgTotal, pct: pct(btgTotal, patrimonioTotal), fill: CORES.btg },
      ...(xpTotal > 0 ? [{ name: 'XP Investimentos', value: xpTotal, pct: pct(xpTotal, patrimonioTotal), fill: CORES.xp }] : []),
    ];

    const alocacaoData = [
      { name: 'Renda Fixa', value: alocacao.rendaFixa, pct: pct(alocacao.rendaFixa, patrimonioTotal), fill: CORES.rendaFixa },
      { name: 'Fundos', value: alocacao.fundos, pct: pct(alocacao.fundos, patrimonioTotal), fill: CORES.fundos },
      { name: 'Renda Variável', value: alocacao.rendaVariavel, pct: pct(alocacao.rendaVariavel, patrimonioTotal), fill: CORES.rendaVariavel },
      { name: 'Previdência', value: alocacao.previdencia, pct: pct(alocacao.previdencia, patrimonioTotal), fill: CORES.previdencia },
      { name: 'Outros / CC', value: alocacao.outros, pct: pct(alocacao.outros, patrimonioTotal), fill: CORES.outros },
    ].filter(d => d.value > 0).sort((a, b) => b.value - a.value);

    const comparativoData = [
      {
        name: 'Renda Fixa',
        BTG: snapshotData.btg?.saldo_rf || 0,
        XP: (snapshotData.xp?.saldo_renda_fixa || 0) + (snapshotData.xp?.saldo_tesouro_direto || 0),
      },
      {
        name: 'Fundos',
        BTG: snapshotData.btg?.saldo_fundos || 0,
        XP: snapshotData.xp?.saldo_fundos || 0,
      },
      {
        name: 'Renda Var.',
        BTG: snapshotData.btg?.saldo_rv || 0,
        XP: snapshotData.xp?.saldo_acoes || 0,
      },
      {
        name: 'Previdência',
        BTG: snapshotData.btg?.saldo_prev || 0,
        XP: snapshotData.xp?.saldo_previdencia || 0,
      },
    ].filter(d => d.BTG > 0 || d.XP > 0);

    return {
      patrimonioTotal, btgTotal, xpTotal,
      vencimentosProx, todosAtivos, alocacao,
      donutData, alocacaoData, comparativoData,
      hasData: patrimonioTotal > 0,
      dataRefBtg: snapshotData.btg?.data_referencia,
      dataRefXp: snapshotData.xp?.data_referencia,
    };
  }, [snapshotData, diasVencimento]);

  // ── Render de estados especiais ───────────────────────────────────────────
  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
      <Spinner size="lg" />
    </div>
  );

  if (!metrics.hasData && selectedClient) return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '100px', gap: '16px',
      border: '2px dashed var(--color-borda)', borderRadius: '12px', opacity: 0.6,
    }}>
      <PieIcon size={48} />
      <Typography variant="h2">Aguardando Sincronização</Typography>
      <Typography variant="p">
        Acesse BTG API ou XP API para carregar os dados de {selectedClient?.nome}.
      </Typography>
    </div>
  );

  // ── Render principal ──────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* HEADER */}
      <header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Typography variant="h1">
              Carteira {selectedClient?.codigoAvere ?? '—'}
            </Typography>
            <Select
              label="Carteiras"
              placeholder="Selecione uma carteira..."
              options={[
                { label: 'XP', value: 'XP' },
                { label: 'BTG', value: 'BTG' },
                { label: 'Personalizada 1', value: 'Personalizada 1' },
                { label: 'Personalizada 2', value: 'Personalizada 2' },
              ]}
            />
          </div>
          <div>
            <Button variant="solid" onClick={() => setDrawerCarteirasAberto(true)}>
              + Gerenciar Carteiras
            </Button>
          </div>
        </div>
        <Typography variant="p" style={{ opacity: 0.6 }}>
          {selectedClient?.nome}
          {metrics.dataRefBtg && ` · BTG: ${fmtDate(metrics.dataRefBtg + 'T12:00:00Z')}`}
          {metrics.dataRefXp && ` · XP: ${fmtDate(metrics.dataRefXp + 'T12:00:00Z')}`}
        </Typography>

        <DrawerGerenciarCarteiras
          aberto={drawerCarteirasAberto}
          onClose={() => setDrawerCarteirasAberto(false)}
          temBtg={!!snapshotData.btg}
          temXp={!!snapshotData.xp}
          clienteId={selectedClient?.id ?? null}
        />
      </header>

      {/* CARDS RESUMO */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>

        <Card style={{ borderLeft: '4px solid var(--color-primaria)', gridColumn: '1 / -1' }}>
          <CardContent style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primaria)', marginBottom: '8px' }}>
              <Briefcase size={18} />
              <Typography variant="p" style={{ fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>
                Patrimônio Consolidado
              </Typography>
            </div>
            <Typography variant="h1" style={{ fontSize: '40px', fontWeight: 800, color: 'var(--color-primaria)' }}>
              {fmt(metrics.patrimonioTotal)}
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', opacity: 0.6 }}>
              <Building2 size={16} />
              <Typography variant="p" style={{ fontWeight: 600, fontSize: '12px' }}>BTG Pactual</Typography>
              <Badge variant="ghost" style={{ fontSize: '11px', marginLeft: 'auto' }}>
                {pct(metrics.btgTotal, metrics.patrimonioTotal).toFixed(1)}%
              </Badge>
            </div>
            <Typography variant="h2" style={{ fontSize: '22px', fontWeight: 700 }}>
              {fmt(metrics.btgTotal)}
            </Typography>
            {metrics.dataRefBtg && (
              <Typography variant="p" style={{ fontSize: '11px', opacity: 0.4, marginTop: '4px' }}>
                Ref: {fmtDate(metrics.dataRefBtg + 'T12:00:00Z')}
              </Typography>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', opacity: 0.6 }}>
              <Building2 size={16} />
              <Typography variant="p" style={{ fontWeight: 600, fontSize: '12px' }}>XP Investimentos</Typography>
              {metrics.xpTotal > 0 && (
                <Badge variant="ghost" style={{ fontSize: '11px', marginLeft: 'auto' }}>
                  {pct(metrics.xpTotal, metrics.patrimonioTotal).toFixed(1)}%
                </Badge>
              )}
            </div>
            <Typography variant="h2" style={{ fontSize: '22px', fontWeight: 700 }}>
              {metrics.xpTotal > 0 ? fmt(metrics.xpTotal) : 'Pendente'}
            </Typography>
            {metrics.dataRefXp
              ? <Typography variant="p" style={{ fontSize: '11px', opacity: 0.4, marginTop: '4px' }}>Ref: {fmtDate(metrics.dataRefXp + 'T12:00:00Z')}</Typography>
              : <Typography variant="p" style={{ fontSize: '11px', opacity: 0.4, marginTop: '4px' }}>Integração pendente</Typography>
            }
          </CardContent>
        </Card>

        <Card style={{ borderLeft: '4px solid #f59e0b' }}>
          <CardContent style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <AlertCircle size={16} style={{ color: '#f59e0b', flexShrink: 0 }} />
              <Typography variant="p" style={{ fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: '#f59e0b' }}>
                Vencimentos
              </Typography>
              <select
                value={diasVencimento}
                onChange={e => setDiasVencimento(Number(e.target.value))}
                style={{
                  marginLeft: 'auto', fontSize: '11px', fontWeight: 600,
                  fontFamily: 'Montserrat, sans-serif',
                  border: '1px solid rgba(245,158,11,0.3)', borderRadius: '6px',
                  padding: '3px 6px', background: 'rgba(245,158,11,0.06)',
                  color: '#f59e0b', cursor: 'pointer', outline: 'none',
                }}
              >
                {PERIODOS.map(p => (
                  <option key={p.dias} value={p.dias}>{p.label}</option>
                ))}
              </select>
            </div>
            <Typography variant="h2" style={{ fontSize: '28px', fontWeight: 800 }}>
              {metrics.vencimentosProx.length} ativo{metrics.vencimentosProx.length !== 1 ? 's' : ''}
            </Typography>
            {metrics.vencimentosProx.length > 0 && (
              <Typography variant="p" style={{ fontSize: '11px', opacity: 0.5, marginTop: '4px' }}>
                {metrics.vencimentosProx.map(a => a.nome).slice(0, 2).join(', ')}
                {metrics.vencimentosProx.length > 2 && ` +${metrics.vencimentosProx.length - 2}`}
              </Typography>
            )}
          </CardContent>
        </Card>

      </div>

      {/* ── GRÁFICOS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>

        <Card>
          <CardContent style={{ padding: '24px' }}>
            <Typography variant="p" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.4, marginBottom: '16px', letterSpacing: '0.05em' }}>
              Proporção por Instituição
            </Typography>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={metrics.donutData} cx="50%" cy="50%" innerRadius={65} outerRadius={95} paddingAngle={3} dataKey="value" animationBegin={0} animationDuration={800}>
                  {metrics.donutData.map((entry, i) => <Cell key={i} fill={entry.fill} stroke="none" />)}
                </Pie>
                <Tooltip content={<TooltipCustom />} />
                <Legend iconType="circle" iconSize={10} formatter={(value, entry: any) => (
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#081F28' }}>
                    {value} — {entry.payload.pct.toFixed(1)}%
                  </span>
                )} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: '24px' }}>
            <Typography variant="p" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.4, marginBottom: '16px', letterSpacing: '0.05em' }}>
              Alocação por Classe
            </Typography>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={metrics.alocacaoData} layout="vertical" margin={{ top: 0, right: 60, left: 0, bottom: 0 }} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(0,0,0,0.06)" />
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={95} tick={{ fontSize: 12, fontFamily: 'Montserrat, sans-serif', fill: '#081F28', opacity: 0.6 }} axisLine={false} tickLine={false} />
                <Tooltip content={<TooltipCustom />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={800}>
                  {metrics.alocacaoData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  <LabelList dataKey="value" position="right" formatter={(v: any) => fmtK(Number(v))} style={{ fontSize: '11px', fontWeight: 700, fontFamily: 'Montserrat, sans-serif', fill: '#081F28', opacity: 0.7 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card style={{ gridColumn: '1 / -1' }}>
          <CardContent style={{ padding: '24px' }}>
            <Typography variant="p" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.4, marginBottom: '16px', letterSpacing: '0.05em' }}>
              Comparativo por Classe — BTG vs XP
            </Typography>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={metrics.comparativoData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }} barSize={28} barCategoryGap="35%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: 'Montserrat, sans-serif', fill: '#081F28', opacity: 0.6 }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={fmtK} tick={{ fontSize: 11, fontFamily: 'Montserrat, sans-serif', fill: '#081F28', opacity: 0.4 }} axisLine={false} tickLine={false} width={70} />
                <Tooltip content={<TooltipBarras />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                <Legend iconType="circle" iconSize={10} formatter={(value) => (
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#081F28' }}>{value}</span>
                )} />
                <Bar dataKey="BTG" name="BTG Pactual" fill={CORES.btg} stackId="a" radius={[0, 0, 0, 0]} animationDuration={800} />
                <Bar dataKey="XP" name="XP Investimentos" fill={CORES.xp} stackId="a" radius={[4, 4, 0, 0]} animationDuration={900} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>

      {/* ALOCAÇÃO — mini cards */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <PieIcon size={16} style={{ opacity: 0.4 }} />
          <Typography variant="h2" style={{ fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', opacity: 0.7 }}>
            Alocação Detalhada
          </Typography>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          {[
            { label: 'Renda Fixa', valor: metrics.alocacao.rendaFixa, cor: CORES.rendaFixa },
            { label: 'Fundos', valor: metrics.alocacao.fundos, cor: CORES.fundos },
            { label: 'Renda Variável', valor: metrics.alocacao.rendaVariavel, cor: CORES.rendaVariavel },
            { label: 'Previdência', valor: metrics.alocacao.previdencia, cor: CORES.previdencia },
            { label: 'Outros / CC', valor: metrics.alocacao.outros, cor: CORES.outros },
          ].filter(a => a.valor > 0).map(({ label, valor, cor }) => (
            <Card key={label}>
              <CardContent style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '2px', background: cor, flexShrink: 0 }} />
                  <Typography variant="p" style={{ fontSize: '11px', opacity: 0.5, fontWeight: 600, textTransform: 'uppercase' }}>{label}</Typography>
                </div>
                <Typography variant="h2" style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>{fmt(valor)}</Typography>
                <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(0,0,0,0.07)' }}>
                  <div style={{ height: '100%', borderRadius: '2px', width: `${Math.min(pct(valor, metrics.patrimonioTotal), 100)}%`, background: cor, transition: 'width 0.6s ease' }} />
                </div>
                <Typography variant="p" style={{ fontSize: '11px', opacity: 0.4, marginTop: '4px' }}>
                  {pct(valor, metrics.patrimonioTotal).toFixed(1)}%
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <TabelaConsolidada ativos={metrics.todosAtivos} patrimonioTotal={metrics.patrimonioTotal} />

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Drawer de gerenciamento de carteiras
// ─────────────────────────────────────────────────────────────────────────────

function DrawerGerenciarCarteiras({
  aberto, onClose, temBtg, temXp, clienteId,
}: {
  aberto: boolean;
  onClose: () => void;
  temBtg: boolean;
  temXp: boolean;
  clienteId: string | null;
}) {
  const temAlguma = temBtg || temXp;
  const [carteiras, setCarteiras] = useState<CarteiraPersonalizada[]>([]);
  const [modalCriarAberto, setModalCriarAberto] = useState(false);

  useEffect(() => {
    async function fetchCarteiras() {
      if (!clienteId) return;
      const { data } = await supabase
        .from('carteiras_personalizadas')
        .select('id, nome, instituicoes, criada_em')
        .eq('cliente_id', clienteId)
        .order('criada_em', { ascending: true });
      if (data) setCarteiras(data);
    }
    if (aberto) fetchCarteiras();
  }, [aberto, clienteId]);

  function handleCarteiraCriada(nova: CarteiraPersonalizada) {
    setCarteiras(prev => [...prev, nova]);
    setModalCriarAberto(false);
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.06em', opacity: 0.4, marginBottom: '8px',
  };

  const itemStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '12px 14px', borderRadius: '10px',
    background: 'rgba(0,0,0,0.03)', marginBottom: '6px',
  };

  const dotStyle = (cor: string): React.CSSProperties => ({
    width: 8, height: 8, borderRadius: '50%', background: cor, flexShrink: 0,
  });

  const corInstituicao: Record<string, string> = { BTG: CORES.btg, XP: CORES.xp };

  return (
    <>
      <Drawer open={aberto} onOpenChange={onClose}>
        <DrawerContent side="right">
          <DrawerHeader>
            <DrawerTitle>Carteiras</DrawerTitle>
            <DrawerDescription>Gerencie as carteiras vinculadas a este cliente.</DrawerDescription>
          </DrawerHeader>

          <DrawerBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* ── Padrão ── */}
              <section>
                <Typography variant="p" style={labelStyle}>Carteiras padrão</Typography>

                {temAlguma && (
                  <div style={itemStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={dotStyle('var(--color-primaria, #0083CB)')} />
                      <div>
                        <Typography variant="p" style={{ fontWeight: 600, fontSize: '13px' }}>Consolidada</Typography>
                        <Typography variant="p" style={{ fontSize: '11px', opacity: 0.45 }}>Visão unificada de todas as corretoras</Typography>
                      </div>
                    </div>
                    <Badge variant="ghost" style={{ fontSize: '10px', opacity: 0.5 }}>Padrão</Badge>
                  </div>
                )}

                {temBtg && (
                  <div style={itemStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={dotStyle(CORES.btg)} />
                      <div>
                        <Typography variant="p" style={{ fontWeight: 600, fontSize: '13px' }}>BTG Pactual</Typography>
                        <Typography variant="p" style={{ fontSize: '11px', opacity: 0.45 }}>Posição BTG sincronizada</Typography>
                      </div>
                    </div>
                    <Badge variant="ghost" style={{ fontSize: '10px', opacity: 0.5 }}>Padrão</Badge>
                  </div>
                )}

                {temXp && (
                  <div style={itemStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={dotStyle(CORES.xp)} />
                      <div>
                        <Typography variant="p" style={{ fontWeight: 600, fontSize: '13px' }}>XP Investimentos</Typography>
                        <Typography variant="p" style={{ fontSize: '11px', opacity: 0.45 }}>Posição XP sincronizada</Typography>
                      </div>
                    </div>
                    <Badge variant="ghost" style={{ fontSize: '10px', opacity: 0.5 }}>Padrão</Badge>
                  </div>
                )}
              </section>

              <DrawerSeparator />

              {/* ── Personalizadas ── */}
              <section>
                <Typography variant="p" style={labelStyle}>Carteiras personalizadas</Typography>

                {carteiras.length === 0 ? (
                  <div style={{ padding: '24px 16px', textAlign: 'center', borderRadius: '10px', border: '1.5px dashed rgba(0,0,0,0.12)', marginBottom: '12px' }}>
                    <Typography variant="p" style={{ fontSize: '13px', opacity: 0.4 }}>
                      Nenhuma carteira personalizada criada ainda.
                    </Typography>
                  </div>
                ) : (
                  <div style={{ marginBottom: '12px' }}>
                    {carteiras.map(c => (
                      <div key={c.id} style={itemStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ display: 'flex', gap: '3px' }}>
                            {c.instituicoes.map(inst => (
                              <div key={inst} style={dotStyle(corInstituicao[inst] ?? '#6B7280')} />
                            ))}
                          </div>
                          <div>
                            <Typography variant="p" style={{ fontWeight: 600, fontSize: '13px' }}>{c.nome}</Typography>
                            <Typography variant="p" style={{ fontSize: '11px', opacity: 0.45 }}>{c.instituicoes.join(' + ')}</Typography>
                          </div>
                        </div>
                        <Badge variant="ghost" style={{ fontSize: '10px' }}>Personalizada</Badge>
                      </div>
                    ))}
                  </div>
                )}

                <Button variant="outline" style={{ width: '100%' }} onClick={() => setModalCriarAberto(true)}>
                  + Criar nova carteira
                </Button>
              </section>

            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Modal fora do Drawer para não herdar z-index */}
      {clienteId && (
        <ModalCriarCarteira
          aberto={modalCriarAberto}
          onClose={() => setModalCriarAberto(false)}
          temBtg={temBtg}
          temXp={temXp}
          clienteId={clienteId}
          onCriada={handleCarteiraCriada}
        />
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Modal de criação de carteira personalizada
// ─────────────────────────────────────────────────────────────────────────────

function ModalCriarCarteira({
  aberto, onClose, temBtg, temXp, clienteId, onCriada,
}: {
  aberto: boolean;
  onClose: () => void;
  temBtg: boolean;
  temXp: boolean;
  clienteId: string;
  onCriada: (nova: CarteiraPersonalizada) => void;
}) {
  const [nome, setNome] = useState('');
  const [selecionadas, setSelecionadas] = useState<string[]>([]);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (aberto) { setNome(''); setSelecionadas([]); setErro(''); }
  }, [aberto]);

  const instituicoesDisponiveis = [
    temBtg && { key: 'BTG', label: 'BTG Pactual', cor: CORES.btg, desc: 'Posição sincronizada via API' },
    temXp && { key: 'XP', label: 'XP Investimentos', cor: CORES.xp, desc: 'Posição sincronizada via API' },
  ].filter(Boolean) as { key: string; label: string; cor: string; desc: string }[];

  function toggleInstituicao(key: string) {
    setSelecionadas(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  }

  async function handleCriar() {
    if (!nome.trim()) { setErro('Dê um nome para a carteira.'); return; }
    if (selecionadas.length === 0) { setErro('Selecione ao menos uma instituição.'); return; }

    setSalvando(true);
    setErro('');
    try {
      const { data, error } = await supabase
        .from('carteiras_personalizadas')
        .insert({ cliente_id: clienteId, nome: nome.trim(), instituicoes: selecionadas })
        .select('id, nome, instituicoes, criada_em')
        .single();

      if (error) throw error;
      onCriada(data);
    } catch (e: any) {
      setErro('Erro ao salvar. Tente novamente.');
      console.error(e);
    } finally {
      setSalvando(false);
    }
  }

  const podeCriar = nome.trim().length > 0 && selecionadas.length > 0 && !salvando;

  return (
    <Modal open={aberto} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Nova carteira personalizada</ModalTitle>
          <ModalDescription>
            Escolha um nome e selecione as instituições que farão parte desta carteira.
          </ModalDescription>
        </ModalHeader>

        <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Nome */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.5, letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
              Nome da carteira
            </label>
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Ex: BTG + Itaú"
              maxLength={60}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '10px 14px', fontSize: '14px',
                fontFamily: 'Montserrat, sans-serif',
                border: '1.5px solid rgba(0,0,0,0.15)', borderRadius: '8px',
                outline: 'none', background: 'transparent',
                transition: 'border-color 0.15s',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--color-primaria, #0083CB)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.15)')}
            />
          </div>

          {/* Seleção de instituições */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.5, letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
              Instituições
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {instituicoesDisponiveis.map(inst => {
                const ativa = selecionadas.includes(inst.key);
                return (
                  <div
                    key={inst.key}
                    onClick={() => toggleInstituicao(inst.key)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '14px 16px', borderRadius: '10px', cursor: 'pointer',
                      border: `1.5px solid ${ativa ? inst.cor : 'rgba(0,0,0,0.1)'}`,
                      background: ativa ? `${inst.cor}0D` : 'transparent',
                      transition: 'all 0.15s', userSelect: 'none',
                    }}
                  >
                    {/* Checkbox visual */}
                    <div style={{
                      width: 18, height: 18, borderRadius: '5px', flexShrink: 0,
                      border: `2px solid ${ativa ? inst.cor : 'rgba(0,0,0,0.2)'}`,
                      background: ativa ? inst.cor : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.15s',
                    }}>
                      {ativa && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>

                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: inst.cor, flexShrink: 0 }} />

                    <div>
                      <Typography variant="p" style={{ fontWeight: 600, fontSize: '13px' }}>{inst.label}</Typography>
                      <Typography variant="p" style={{ fontSize: '11px', opacity: 0.45 }}>{inst.desc}</Typography>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Erro */}
          {erro && (
            <Typography variant="p" style={{ fontSize: '12px', color: '#EF4444' }}>
              {erro}
            </Typography>
          )}

        </div>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose} disabled={salvando}>Cancelar</Button>
          <Button variant="solid" onClick={handleCriar} disabled={!podeCriar}>
            {salvando ? 'Salvando...' : 'Criar carteira'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TabelaConsolidada
// ─────────────────────────────────────────────────────────────────────────────

function TabelaConsolidada({ ativos, patrimonioTotal }: { ativos: ConsolidatedAtivo[]; patrimonioTotal: number }) {
  const [gruposAbertos, setGruposAbertos] = useState<Record<string, boolean>>({});
  const [ativoSelecionado, setAtivoSelecionado] = useState<ConsolidatedAtivo | null>(null);
  const [drawerAberto, setDrawerAberto] = useState(false);

  const grupos = useMemo(() => {
    const map: Record<string, ConsolidatedAtivo[]> = {};
    for (const a of ativos) {
      const key = a.tipo || 'Outros';
      if (!map[key]) map[key] = [];
      map[key].push(a);
    }
    return Object.entries(map)
      .map(([tipo, itens]) => ({ tipo, itens: [...itens].sort((a, b) => b.valorLiquido - a.valorLiquido), total: itens.reduce((s, a) => s + a.valorLiquido, 0) }))
      .sort((a, b) => b.total - a.total);
  }, [ativos]);

  const corInstituicao = (inst: string) => inst === 'BTG Pactual' ? CORES.btg : CORES.xp;

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <LayoutGrid size={16} style={{ opacity: 0.4 }} />
        <Typography variant="h2" style={{ fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', opacity: 0.7 }}>
          Carteira Consolidada
        </Typography>
        <Badge variant="ghost" style={{ fontSize: '11px' }}>{ativos.length} ativos</Badge>
      </div>

      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr 80px 100px 110px 36px', padding: '10px 16px', borderBottom: '1px solid rgba(0,0,0,0.07)', background: 'rgba(0,0,0,0.02)' }}>
          {['', 'Ativo', 'Inst.', 'Vencimento', 'Valor Líquido', ''].map((h, i) => (
            <span key={i} style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.4 }}>{h}</span>
          ))}
        </div>

        {grupos.map(({ tipo, itens, total }) => {
          const aberto = gruposAbertos[tipo] ?? false;
          return (
            <div key={tipo}>
              <div
                onClick={() => setGruposAbertos(prev => ({ ...prev, [tipo]: !prev[tipo] }))}
                style={{ display: 'grid', gridTemplateColumns: '32px 1fr 80px 100px 110px 36px', padding: '12px 16px', cursor: 'pointer', background: aberto ? 'rgba(0,131,203,0.04)' : 'transparent', borderBottom: '1px solid rgba(0,0,0,0.06)', alignItems: 'center', transition: 'background 0.15s', userSelect: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,131,203,0.06)')}
                onMouseLeave={e => (e.currentTarget.style.background = aberto ? 'rgba(0,131,203,0.04)' : 'transparent')}
              >
                <span style={{ fontSize: '14px', opacity: 0.5, transition: 'transform 0.2s', display: 'inline-block', transform: aberto ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700 }}>{tipo}</span>
                  <Badge variant="ghost" style={{ fontSize: '10px' }}>{itens.length}</Badge>
                </div>
                <span /><span />
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primaria, #0083CB)' }}>{fmt(total)}</span>
                <span style={{ fontSize: '11px', opacity: 0.4 }}>{pct(total, patrimonioTotal).toFixed(1)}%</span>
              </div>

              {aberto && itens.map((ativo, i) => (
                <div
                  key={ativo.rowId}
                  style={{ display: 'grid', gridTemplateColumns: '32px 1fr 80px 100px 110px 36px', padding: '10px 16px', borderBottom: i < itens.length - 1 ? '1px solid rgba(0,0,0,0.04)' : '1px solid rgba(0,0,0,0.06)', alignItems: 'center', background: 'rgba(0,0,0,0.008)', cursor: 'pointer', transition: 'background 0.12s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,131,203,0.04)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.008)')}
                  onClick={() => { setAtivoSelecionado(ativo); setDrawerAberto(true); }}
                >
                  <span />
                  <div>
                    <Typography variant="p" style={{ fontWeight: 600, fontSize: '13px' }}>{ativo.nome}</Typography>
                    {ativo.subTipo && <Badge intent="primaria" variant="ghost" style={{ fontSize: '10px', marginTop: '2px' }}>{ativo.subTipo}</Badge>}
                  </div>
                  <Badge variant="ghost" style={{ fontSize: '10px', color: corInstituicao(ativo.instituicao), borderColor: corInstituicao(ativo.instituicao) }}>
                    {ativo.instituicao === 'BTG Pactual' ? 'BTG' : 'XP'}
                  </Badge>
                  <Typography variant="p" style={{ fontSize: '12px', opacity: 0.55 }}>{ativo.vencimento ? fmtDate(ativo.vencimento) : '—'}</Typography>
                  <div>
                    <strong style={{ fontSize: '13px' }}>{fmt(ativo.valorLiquido)}</strong>
                    <div style={{ fontSize: '10px', opacity: 0.35 }}>{pct(ativo.valorLiquido, patrimonioTotal).toFixed(1)}%</div>
                  </div>
                  <span style={{ opacity: 0.35, fontSize: '16px' }}>›</span>
                </div>
              ))}
            </div>
          );
        })}
      </Card>

      {ativoSelecionado && (
        <DrawerDetalheConsolidado ativo={ativoSelecionado} aberto={drawerAberto} onClose={setDrawerAberto} patrimonioTotal={patrimonioTotal} />
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Drawer de detalhes do ativo
// ─────────────────────────────────────────────────────────────────────────────

function DrawerDetalheConsolidado({ ativo, aberto, onClose, patrimonioTotal }: { ativo: ConsolidatedAtivo; aberto: boolean; onClose: (v: boolean) => void; patrimonioTotal: number }) {
  const corInst = ativo.instituicao === 'BTG Pactual' ? CORES.btg : CORES.xp;
  return (
    <Drawer open={aberto} onOpenChange={onClose}>
      <DrawerContent side="right">
        <DrawerHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
            {ativo.subTipo && <Badge intent="primaria" variant="solid" style={{ fontSize: '12px' }}>{ativo.subTipo}</Badge>}
            <Badge variant="ghost" style={{ fontSize: '12px', color: corInst, borderColor: corInst }}>
              {ativo.instituicao === 'BTG Pactual' ? 'BTG Pactual' : 'XP Investimentos'}
            </Badge>
          </div>
          <DrawerTitle>{ativo.nome}</DrawerTitle>
          <DrawerDescription>{ativo.tipo}</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <section>
              <Typography variant="p" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.4, marginBottom: '10px', letterSpacing: '0.05em' }}>Valores</Typography>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <InfoItem label="Valor Líquido" value={fmt(ativo.valorLiquido)} highlight />
                <InfoItem label="% do Portfólio" value={`${pct(ativo.valorLiquido, patrimonioTotal).toFixed(2)}%`} />
              </div>
            </section>
            <DrawerSeparator />
            <section>
              <Typography variant="p" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.4, marginBottom: '10px', letterSpacing: '0.05em' }}>Classificação</Typography>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <InfoItem label="Tipo" value={ativo.tipo} />
                {ativo.subTipo && <InfoItem label="Subtipo" value={ativo.subTipo} />}
                <InfoItem label="Instituição" value={ativo.instituicao} />
              </div>
            </section>
            {ativo.vencimento && (
              <>
                <DrawerSeparator />
                <section>
                  <Typography variant="p" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.4, marginBottom: '10px', letterSpacing: '0.05em' }}>Datas</Typography>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <InfoItem label="Vencimento" value={fmtDate(ativo.vencimento)} />
                  </div>
                </section>
              </>
            )}
            <div style={{ marginTop: '8px', padding: '12px', background: 'rgba(0,131,203,0.05)', borderRadius: '8px', fontSize: '12px', opacity: 0.6, lineHeight: 1.5 }}>
              Para ver todos os detalhes deste ativo (aquisições, taxas, identificação), acesse a página{' '}
              <strong>{ativo.instituicao === 'BTG Pactual' ? 'BTG API' : 'XP API'}</strong>.
            </div>
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// InfoItem
// ─────────────────────────────────────────────────────────────────────────────

function InfoItem({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ background: 'rgba(0,131,203,0.05)', borderRadius: '8px', padding: '10px 12px' }}>
      <div style={{ fontSize: '11px', opacity: 0.45, marginBottom: '4px', fontWeight: 600, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: '14px', fontWeight: highlight ? 700 : 500, color: highlight ? 'var(--color-primaria, #0083CB)' : 'inherit' }}>{value}</div>
    </div>
  );
}