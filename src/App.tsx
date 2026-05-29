import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ClientProvider } from './contexts/ClientContext';

// Layout e Componentes de Proteção
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Páginas
import Login from './pages/Login';
import Home from './pages/Home';
import BtgApi from './pages/BtgApi';
import XpApi from './pages/XpApi';

import EmDesenvolvimento from './pages/EmDesenvolvimento';
import MasterAtivos from './pages/MasterAtivos';
import GestaoMaster from './pages/GestaoMaster';
import PersonalizarAtivos from './pages/PersonalizarAtivos';
import Rentabilidade from './pages/Rentabilidade';
import CadastroClientes from './pages/Cadastroclientes';
import GestaoEquipe from './pages/GestaoEquipe';
import AvenueApi from './pages/AvenueApi';
import AgoraApi from './pages/AgoraApi';
import Relatorio from './pages/Relatorio';
import FechamentoMes from './pages/FechamentoMes';
import HistoricoMensal from './pages/HistoricoMensal';
import Manutencao from './pages/Manutencao';


export default function App() {
  return (
    // O AuthProvider envolve tudo para que a app saiba quem está logado
    <AuthProvider>
      <ClientProvider>
        <BrowserRouter>
          <Routes>

            {/* Rota Pública (Livre de Login) */}
            <Route path="/login" element={<Login />} />

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
              </Route>
            </Route>

          </Routes>
        </BrowserRouter>
      </ClientProvider>
    </AuthProvider>
  );
}