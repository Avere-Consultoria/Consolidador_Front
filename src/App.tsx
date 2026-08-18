import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Spinner } from 'avere-ui';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { AuthProvider } from './contexts/AuthContext';
import { ClientProvider } from './contexts/ClientContext';

// Layout, proteção e entrada — eager (sempre necessários no boot).
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import ClienteWorkspace, { ClienteIndex, LegacyClienteRedirect } from './pages/cliente/ClienteWorkspace';
import AbasWorkspace from './pages/admin/AbasWorkspace';

// Páginas — lazy (só baixam quando a rota é aberta).
const Home = lazy(() => import('./pages/Home'));
const EmDesenvolvimento = lazy(() => import('./pages/EmDesenvolvimento'));
const MasterAtivos = lazy(() => import('./pages/MasterAtivos'));
const GestaoMaster = lazy(() => import('./pages/GestaoMaster'));
const PersonalizarAtivos = lazy(() => import('./pages/PersonalizarAtivos'));
const Rentabilidade = lazy(() => import('./pages/Rentabilidade'));
const CadastroClientes = lazy(() => import('./pages/Cadastroclientes'));
const GestaoEquipe = lazy(() => import('./pages/GestaoEquipe'));
const Relatorio = lazy(() => import('./pages/Relatorio'));
const FechamentoMes = lazy(() => import('./pages/FechamentoMes'));
const MovimentacoesMes = lazy(() => import('./pages/MovimentacoesMes'));
const SincronizacaoMassa = lazy(() => import('./pages/SincronizacaoMassa'));
const HistoricoMensal = lazy(() => import('./pages/HistoricoMensal'));
const Manutencao = lazy(() => import('./pages/Manutencao'));
const DocumentosManuais = lazy(() => import('./pages/DocumentosManuais'));
const DashboardConsultor = lazy(() => import('./pages/DashboardConsultor'));
const Pendencias = lazy(() => import('./pages/Pendencias'));
const AlertasConsultor = lazy(() => import('./pages/AlertasConsultor'));
const RedefinirSenha = lazy(() => import('./pages/RedefinirSenha'));
const Hub = lazy(() => import('./pages/Hub'));
const Tarefas = lazy(() => import('./pages/Tarefas'));

const fallback = (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <Spinner size="lg" />
  </div>
);

export default function App() {
  return (
    // O AuthProvider envolve tudo para que a app saiba quem está logado
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ClientProvider>
        <BrowserRouter>
          <Suspense fallback={fallback}>
            <Routes>

              {/* Rota Pública (Livre de Login) */}
              <Route path="/login" element={<Login />} />
              <Route path="/redefinir-senha" element={<RedefinirSenha />} />

              {/* ROTA DE RELATÓRIO (sem MainLayout) */}
              <Route element={<ProtectedRoute />}>
                <Route path="/relatorio" element={<Relatorio />} />
              </Route>

              {/* ROTAS PRIVADAS (Exigem Login Básico) */}
              <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                  {/* Pouso: Dashboard (visão do consultor) */}
                  <Route index element={<Navigate to="/dashboard" replace />} />

                  {/* Workspace do cliente — abas de um cliente selecionado */}
                  <Route path="cliente" element={<ClienteIndex />} />
                  <Route path="cliente/:clienteId" element={<ClienteWorkspace />}>
                    <Route index element={<Navigate to="posicao" replace />} />
                    <Route path="posicao" element={<Home />} />
                    <Route path="rentabilidade" element={<Rentabilidade />} />
                    <Route path="historico" element={<HistoricoMensal />} />
                    <Route path="fechamento" element={<FechamentoMes />} />
                    <Route path="fechamento/movimentacoes/:mes" element={<MovimentacoesMes />} />
                  </Route>

                  {/* Redirects legados (bookmarks antigos) → workspace do cliente atual */}
                  <Route path="rentabilidade" element={<LegacyClienteRedirect tab="rentabilidade" />} />
                  <Route path="historico" element={<LegacyClienteRedirect tab="historico" />} />
                  <Route path="fechamento" element={<LegacyClienteRedirect tab="fechamento" />} />

                  {/* Fora do workspace */}
                  <Route path="/dev" element={<EmDesenvolvimento />} />
                  <Route path="/hub" element={<Hub />} />
                  <Route path="/personalizar" element={<PersonalizarAtivos />} />
                </Route>
              </Route>

              {/* ROTA MASTER + CONSULTOR — Documentos Manuais (master) / Meus Envios (consultor) */}
              <Route element={<ProtectedRoute allowedRoles={['MASTER', 'CONSULTOR_INTERNO']} />}>
                <Route element={<MainLayout />}>
                  <Route path="/dashboard" element={<DashboardConsultor />} />
                  <Route path="/alertas" element={<AlertasConsultor />} />
                  <Route path="/tarefas" element={<Tarefas />} />
                  <Route path="/documentos-manuais" element={<DocumentosManuais />} />
                </Route>
              </Route>

              {/* ROTAS RESTRITAS (Exigem Login E Perfil de MASTER) */}
              <Route element={<ProtectedRoute allowedRoles={['MASTER']} />}>
                <Route element={<MainLayout />}>
                  {/* Fila de curadoria dos rascunhos criados por consultores */}
                  <Route path="pendencias" element={<Pendencias />} />

                  {/* Cadastros */}
                  <Route path="cadastros" element={<AbasWorkspace tabs={[{ to: 'clientes', label: 'Clientes' }, { to: 'equipe', label: 'Equipe' }]} />}>
                    <Route index element={<Navigate to="clientes" replace />} />
                    <Route path="clientes" element={<CadastroClientes />} />
                    <Route path="equipe" element={<GestaoEquipe />} />
                  </Route>

                  {/* Inteligência */}
                  <Route path="inteligencia" element={<AbasWorkspace tabs={[{ to: 'ativos', label: 'Master Ativos' }, { to: 'gestao', label: 'Gestão Master' }, { to: 'personalizar', label: 'Personalizar Ativos' }]} />}>
                    <Route index element={<Navigate to="ativos" replace />} />
                    <Route path="ativos" element={<MasterAtivos />} />
                    <Route path="gestao" element={<GestaoMaster />} />
                    <Route path="personalizar" element={<PersonalizarAtivos />} />
                  </Route>

                  {/* Operação */}
                  <Route path="operacao" element={<AbasWorkspace tabs={[{ to: 'sincronizacao', label: 'Sincronização em Massa' }, { to: 'manutencao', label: 'Manutenção' }, { to: 'documentos', label: 'Documentos Manuais' }]} />}>
                    <Route index element={<Navigate to="sincronizacao" replace />} />
                    <Route path="sincronizacao" element={<SincronizacaoMassa />} />
                    <Route path="manutencao" element={<Manutencao />} />
                    <Route path="documentos" element={<DocumentosManuais />} />
                  </Route>

                  {/* Redirects legados (bookmarks antigos) */}
                  <Route path="master" element={<Navigate to="/inteligencia/ativos" replace />} />
                  <Route path="gestao-master" element={<Navigate to="/inteligencia/gestao" replace />} />
                  <Route path="cadastro-clientes" element={<Navigate to="/cadastros/clientes" replace />} />
                  <Route path="gestao-equipe" element={<Navigate to="/cadastros/equipe" replace />} />
                  <Route path="manutencao" element={<Navigate to="/operacao/manutencao" replace />} />
                  <Route path="sincronizacao" element={<Navigate to="/operacao/sincronizacao" replace />} />
                </Route>
              </Route>

            </Routes>
          </Suspense>
        </BrowserRouter>
      </ClientProvider>
    </AuthProvider>
    </QueryClientProvider>
  );
}
