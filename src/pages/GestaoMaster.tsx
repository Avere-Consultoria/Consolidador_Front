import { useState } from 'react';
import { Typography, Button } from 'avere-ui';
import { Settings, Building2, PieChart, Landmark, ShieldCheck, SlidersHorizontal, Layers, Timer, Database } from 'lucide-react';
import EmissoresTab from '../components/gestaoMaster/EmissoresTab';
import ClassesTab from '../components/gestaoMaster/ClassesTab';
import InstituicoesTab from '../components/gestaoMaster/InstituicoesTab';
import FGCTab from '../components/gestaoMaster/FGCTab';
import FaixasTab from '../components/gestaoMaster/FaixasTab';
import SetoresTab from '../components/gestaoMaster/SetoresTab';
import LiquidezSubtipoTab from '../components/gestaoMaster/LiquidezSubtipoTab';
import ManutencaoTab from '../components/gestaoMaster/ManutencaoTab';


export default function GestaoMaster() {
    const [activeTab, setActiveTab] = useState<'EMISSORES' | 'CLASSES' | 'INSTITUICOES' | 'FGC' | 'FAIXAS' | 'SETORES' | 'LIQUIDEZ' | 'MANUTENCAO'>('EMISSORES');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
            <header style={{ borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Settings size={28} color="var(--color-secundaria)" />
                    <Typography variant="h1">Configurações do Sistema</Typography>
                </div>
            </header>

            <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '12px' }}>
                <Button variant={activeTab === 'EMISSORES' ? 'solid' : 'ghost'} onClick={() => setActiveTab('EMISSORES')}>
                    <Building2 size={16} style={{ marginRight: 8 }} /> Emissores
                </Button>
                <Button variant={activeTab === 'CLASSES' ? 'solid' : 'ghost'} onClick={() => setActiveTab('CLASSES')}>
                    <PieChart size={16} style={{ marginRight: 8 }} /> Classes
                </Button>
                <Button variant={activeTab === 'SETORES' ? 'solid' : 'ghost'} onClick={() => setActiveTab('SETORES')}>
                    <Layers size={16} style={{ marginRight: 8 }} /> Setores
                </Button>
                <Button variant={activeTab === 'INSTITUICOES' ? 'solid' : 'ghost'} onClick={() => setActiveTab('INSTITUICOES')}>
                    <Landmark size={16} style={{ marginRight: 8 }} /> Instituições
                </Button>
                <Button variant={activeTab === 'FGC' ? 'solid' : 'ghost'} onClick={() => setActiveTab('FGC')}>
                    <ShieldCheck size={16} style={{ marginRight: 8 }} /> FGC
                </Button>
                <Button variant={activeTab === 'FAIXAS' ? 'solid' : 'ghost'} onClick={() => setActiveTab('FAIXAS')}>
                    <SlidersHorizontal size={16} style={{ marginRight: 8 }} /> Faixas
                </Button>
                <Button variant={activeTab === 'LIQUIDEZ' ? 'solid' : 'ghost'} onClick={() => setActiveTab('LIQUIDEZ')}>
                    <Timer size={16} style={{ marginRight: 8 }} /> Liquidez/Subtipo
                </Button>
                <Button variant={activeTab === 'MANUTENCAO' ? 'solid' : 'ghost'} onClick={() => setActiveTab('MANUTENCAO')}>
                    <Database size={16} style={{ marginRight: 8 }} /> Manutenção
                </Button>
            </div>

            {/* Renderização Condicional Limpa */}
            {activeTab === 'EMISSORES' && <EmissoresTab />}
            {activeTab === 'CLASSES' && <ClassesTab />}
            {activeTab === 'SETORES' && <SetoresTab />}
            {activeTab === 'INSTITUICOES' && <InstituicoesTab />}
            {activeTab === 'FGC' && <FGCTab />}
            {activeTab === 'FAIXAS' && <FaixasTab />}
            {activeTab === 'LIQUIDEZ' && <LiquidezSubtipoTab />}
            {activeTab === 'MANUTENCAO' && <ManutencaoTab />}
        </div>
    );
}