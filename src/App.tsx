import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Spinner } from 'avere-ui';
import { AuthProvider } from './contexts/AuthContext';
import { ClientProvider } from './contexts/ClientContext';

// Layout, proteção e entrada — eager (sempre necessários no boot).
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';

// Páginas — lazy (só baixam quando a rota é aberta).
const Home = lazy(() => import('./pages/Home'));
const BtgApi = lazy(() => import('./pages/BtgApi'));
const XpApi = lazy(() => import('./pages/XpApi'));
const EmDesenvolvimento = lazy(() => import('./pages/EmDesenvolvimento'));
const MasterAtivos = lazy(() => import('./pages/MasterAtivos'));
const GestaoMaster = lazy(() => import('./pages/GestaoMaster'));
const PersonalizarAtivos = lazy(() => import('./pages/PersonalizarAtivos'));
const Rentabilidade = lazy(() => import('./pages/Rentabilidade'));
const CadastroClientes = lazy(() => import('./pages/Cadastroclientes'));
const GestaoEquipe = lazy(() => import('./pages/GestaoEquipe'));
const AvenueApi = lazy(() => import('./pages/AvenueApi'));
const AgoraApi = lazy(() => import('./pages/AgoraApi'));
const Relatorio = lazy(() => import('./pages/Relatorio'));
const FechamentoMes = lazy(() => import('./pages/FechamentoMes'));
const MovimentacoesMes = lazy(() => import('./pages/MovimentacoesMes'));
const SincronizacaoMassa = lazy(() => import('./pages/SincronizacaoMassa'));
const HistoricoMensal = lazy(() => import('./pages/HistoricoMensal'));
const Manutencao = lazy(() => import('./pages/Manutencao'));
const RedefinirSenha = lazy(() => import('./pages/RedefinirSenha'));

const fallback = (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <Spinner size="lg" />
  </div>
);

export default function App() {
  return (
    // O AuthProvider envolve tudo para que a app saiba quem está logado
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
                  <Route index element={<Home />} />
                  <Route path="rentabilidade" element={<Rentabilidade />} />
                  <Route path="/btg" element={<BtgApi />} />
                  <Route path="/xp" element={<XpApi />} />
                  <Route path="/avenue" element={<AvenueApi />} />
                  <Route path="/agora" element={<AgoraApi />} />
                  <Route path="/dev" element={<EmDesenvolvimento />} />
                  <Route path="/personalizar" element={<PersonalizarAtivos />} />
                  <Route path="/fechamento" element={<FechamentoMes />} />
                  <Route path="/fechamento/movimentacoes/:mes" element={<MovimentacoesMes />} />
                  <Route path="/historico" element={<HistoricoMensal />} />
                </Route>
              </Route>

              {/* ROTAS RESTRITAS (Exigem Login E Perfil de MASTER) */}
              <Route element={<ProtectedRoute allowedRoles={['MASTER']} />}>
                <Route element={<MainLayout />}>
                  <Route path="/master" element={<MasterAtivos />} />
                  <Route path="/gestao-master" element={<GestaoMaster />} />
                  <Route path="/cadastro-clientes" element={<CadastroClientes />} />
                  <Route path="/gestao-equipe" element={<GestaoEquipe />} />
                  <Route path="/manutencao" element={<Manutencao />} />
                  <Route path="/sincronizacao" element={<SincronizacaoMassa />} />
                </Route>
              </Route>

            </Routes>
          </Suspense>
        </BrowserRouter>
      </ClientProvider>
    </AuthProvider>
  );
}
