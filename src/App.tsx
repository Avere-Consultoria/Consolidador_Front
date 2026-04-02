import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ClientProvider } from './contexts/ClientContext';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import BtgApi from './pages/BtgApi';
import XpApi from './pages/XpApi';
import EmDesenvolvimento from './pages/EmDesenvolvimento';

export default function App() {
  return (
    <ClientProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/btg" element={<BtgApi />} />
            <Route path="/xp" element={<XpApi />} />
            <Route path="/dev" element={<EmDesenvolvimento />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ClientProvider>
  );
}