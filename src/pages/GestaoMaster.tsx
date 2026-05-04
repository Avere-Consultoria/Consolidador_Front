import { useState } from 'react';
import { Typography, Button } from 'avere-ui';
import { Settings, Building2, PieChart, Landmark } from 'lucide-react';
import EmissoresTab from '../components/gestaoMaster/EmissoresTab';
import ClassesTab from '../components/gestaoMaster/ClassesTab';
import InstituicoesTab from '../components/gestaoMaster/InstituicoesTab';


export default function GestaoMaster() {
    const [activeTab, setActiveTab] = useState<'EMISSORES' | 'CLASSES' | 'INSTITUICOES'>('EMISSORES');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
            <header style={{ borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Settings size={28} color="#081F28" />
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
                <Button variant={activeTab === 'INSTITUICOES' ? 'solid' : 'ghost'} onClick={() => setActiveTab('INSTITUICOES')}>
                    <Landmark size={16} style={{ marginRight: 8 }} /> Instituições
                </Button>
            </div>

            {/* Renderização Condicional Limpa */}
            {activeTab === 'EMISSORES' && <EmissoresTab />}
            {activeTab === 'CLASSES' && <ClassesTab />}
            {activeTab === 'INSTITUICOES' && <InstituicoesTab />}
        </div>
    );
}