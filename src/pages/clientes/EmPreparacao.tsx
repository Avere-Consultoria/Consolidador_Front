import { Card } from 'avere-ui';
import { ShieldAlert, Landmark, type LucideIcon } from 'lucide-react';
import { EstadoVazio } from '../../components/shared/EstadoVazio';

// Abas FGC e Crédito privado de Clientes: só o lugar marcado (20/10/2026). O cálculo depende do
// vínculo conglomerado/emissor de cada ativo no catálogo — hoje 0 de 3.214 —, que entra pela
// ingestão que o Bruno vai fazer. Depois dela, refazer as RPCs sobre a junção (vw_posicao_avere)
// e conferir a lista de papéis cobertos pelo FGC (LF/LIG em dúvida). Não consulta nada.

function Aviso({ icon, titulo, dica }: { icon: LucideIcon; titulo: string; dica: string }) {
    return <Card style={{ padding: 0 }}><EstadoVazio icon={icon} titulo={titulo} dica={dica} /></Card>;
}

export function AbaFgc() {
    return (
        <Aviso icon={ShieldAlert} titulo="Limite FGC — em preparação"
            dica="Aqui vão aparecer, por cliente e conglomerado, as exposições perto do teto de R$ 250 mil. A aba passa a funcionar quando os conglomerados dos ativos forem carregados no catálogo." />
    );
}

export function AbaCreditoPrivado() {
    return (
        <Aviso icon={Landmark} titulo="Crédito privado — em preparação"
            dica="Aqui vai aparecer a concentração de cada cliente por emissor (DEB, CRA, CRI, FIDC…) em relação ao patrimônio. A aba passa a funcionar quando os emissores dos ativos forem carregados no catálogo." />
    );
}
