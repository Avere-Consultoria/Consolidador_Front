import { ButtonHTMLAttributes } from 'react';
import { ClassProp } from 'class-variance-authority/types';
import { ClassValue } from 'clsx';
import { CSSProperties } from 'react';
import { DateRange } from 'react-day-picker';
import { DayPicker } from 'react-day-picker';
import { default as default_2 } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ElementType } from 'react';
import { ForwardRefExoticComponent } from 'react';
import { HTMLAttributes } from 'react';
import { InputHTMLAttributes } from 'react';
import { JSX } from 'react/jsx-runtime';
import { LucideIcon } from 'lucide-react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React_2 from 'react';
import { ReactNode } from 'react';
import { ReactPortal } from 'react';
import { RefAttributes } from 'react';
import { RefObject } from 'react';
import { RowData } from '@tanstack/react-table';
import * as SliderPrimitive from '@radix-ui/react-slider';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { toast } from 'sonner';
import { Toaster as Toaster_2 } from 'sonner';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { VariantProps } from 'class-variance-authority';

export declare interface AgrupamentoTabela<T> {
    /** Chave do grupo de cada linha. */
    por: (linha: T) => string;
    /** Nome mostrado na linha do grupo (padrão: a própria chave). */
    rotulo?: (chave: string, itens: T[]) => ReactNode;
    /** Texto apagado ao lado do nome (padrão: "N itens"). */
    resumo?: (itens: T[]) => ReactNode;
    /** Ordem dos grupos: pelo total da 1ª coluna somada (padrão), pela chave, ou pela ordem em que aparecem. */
    ordem?: 'total' | 'chave' | 'entrada';
    /** Substantivo do resumo padrão: ["ativo", "ativos"]. */
    nomeItem?: [singular: string, plural: string];
}

export declare function algumFiltroAtivo(filtros: FiltrosTabela): boolean;

export declare function alternarMenuLateral(): void;

/** Aplica todos os filtros ativos (E entre colunas). */
export declare function aplicarFiltros<T>(dados: T[], colunas: ColunaTabela<T>[], filtros: FiltrosTabela): T[];

export declare const Avatar: ForwardRefExoticComponent<AvatarProps & RefAttributes<HTMLDivElement>>;

export declare interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    initials?: string;
    size?: 'sm' | 'md' | 'lg';
}

export declare const Badge: ForwardRefExoticComponent<BadgeProps & RefAttributes<HTMLDivElement>>;

export declare interface BadgeProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}

export declare const badgeVariants: (props?: ({
    intent?: "primaria" | "secundaria" | "alerta" | "erro" | "neutro" | null | undefined;
    variant?: "solid" | "outline" | "ghost" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function BotaoMesVigente({ ativo, onClick, rotulo }: {
    /** true = a seleção já está no mês padrão (botão aceso, inerte). */
    ativo: boolean;
    onClick: () => void;
    rotulo?: string;
}): JSX.Element;

export declare function BuscaRapida({ grupos, placeholder, textoVazio, mostrarBotao, rotuloBotao, atalho, maxRecentes, chaveRecentes, aberto: abertoExterno, onAbertoChange, }: BuscaRapidaProps): JSX.Element;

export declare interface BuscaRapidaProps {
    grupos: GrupoBusca[];
    placeholder?: string;
    /** Mensagem quando nada casa com o texto digitado. */
    textoVazio?: (busca: string) => ReactNode;
    /** Mostra o botão "Buscar… Ctrl K". Sem ele, abre só pelo atalho ou por `aberto`. */
    mostrarBotao?: boolean;
    rotuloBotao?: string;
    /** Liga o atalho Ctrl/Cmd+K em qualquer tela (padrão: sim). */
    atalho?: boolean;
    /** Quantos recentes guardar (padrão 6). */
    maxRecentes?: number;
    /** Chave no localStorage — cada sistema já tem o seu (origem diferente). */
    chaveRecentes?: string;
    /** Controle externo, para abrir por outro caminho. */
    aberto?: boolean;
    onAbertoChange?: (aberto: boolean) => void;
}

export declare const Button: ForwardRefExoticComponent<ButtonProps & RefAttributes<HTMLButtonElement>>;

export declare interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
    isLoading?: boolean;
}

export declare const buttonVariants: (props?: ({
    intent?: "primaria" | "secundaria" | "alerta" | "erro" | null | undefined;
    variant?: "solid" | "outline" | "ghost" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function CabecalhoPagina({ titulo, icone: Icone, selo, descricao, acoes, className }: CabecalhoPaginaProps): JSX.Element;

export declare interface CabecalhoPaginaProps {
    titulo: ReactNode;
    /** Ícone ao lado do título (20 px, cor secundária). */
    icone?: LucideIcon;
    /** Colado ao título — ex.: um contador. */
    selo?: ReactNode;
    /** Frase de apoio — só quando acrescenta (regra 3). */
    descricao?: ReactNode;
    /** Ações da página, à direita. */
    acoes?: ReactNode;
    className?: string;
}

export declare function Calendar({ className, classNames, showOutsideDays, ...props }: CalendarProps): JSX.Element;

declare type CalendarProps = React_2.ComponentProps<typeof DayPicker>;

export declare const CampoBusca: ForwardRefExoticComponent<CampoBuscaProps & RefAttributes<HTMLInputElement>>;

export declare interface CampoBuscaProps {
    valor: string;
    /** Recebe o texto direto (não o evento). Com `atraso`, só quando a pessoa para de digitar. */
    onChange: (texto: string) => void;
    placeholder?: string;
    /** Milissegundos de espera depois da última tecla antes de chamar `onChange` (padrão 0). */
    atraso?: number;
    /** Nome para leitor de tela; padrão: o placeholder. */
    rotulo?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
}

export declare function CampoData({ label, valor, onChange, placeholder }: {
    label?: string;
    valor: string;
    onChange: (iso: string) => void;
    placeholder?: string;
}): JSX.Element;

export declare const Card: ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>;

export declare const CardContent: ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>;

export declare const CardDescription: ForwardRefExoticComponent<HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>>;

export declare const CardFooter: ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>;

export declare const CardHeader: ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>;

export declare const CardTitle: ForwardRefExoticComponent<HTMLAttributes<HTMLHeadingElement> & RefAttributes<HTMLParagraphElement>>;

export declare const Checkbox: ForwardRefExoticComponent<CheckboxProps & RefAttributes<HTMLInputElement>>;

export declare interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export declare function cn(...inputs: ClassValue[]): string;

export declare type CodigoModulo = 'hub' | 'consolidador' | 'financeiro';

export declare interface ColumnDef<T> {
    header: string;
    accessorKey?: keyof T;
    cell?: (item: T) => default_2.ReactNode;
    sortable?: boolean;
}

/** Índice da célula sob o evento (para saber qual editor focar). */
export declare function colunaDoEvento(e: {
    target: EventTarget | null;
}): number | null;

export declare interface ColunaTabela<T> {
    /** Identificador estável (ordenação, chave). */
    id: string;
    /** Texto do cabeçalho. */
    titulo: string;
    tipo: TipoColuna;
    /** De onde vem o valor da célula. Também é o que ordena e o que soma. */
    valor: (linha: T) => unknown;
    /** Só para `cadastro`: a cor do cadastro (hex). */
    cor?: (linha: T) => string | null | undefined;
    /** Linha secundária, menor e apagada, embaixo do valor (ex.: emissor embaixo do ativo). */
    secundario?: (linha: T) => ReactNode;
    /** Algo depois do valor, na mesma linha (ex.: selo de alerta). */
    depois?: (linha: T) => ReactNode;
    /** Texto em destaque (negrito) — a coluna "principal" da tabela. */
    destaque?: boolean;
    /** Texto apagado (taxa, prazo, instituição em texto). */
    apagado?: boolean;
    /** Largura fixa (px ou %). Sem ela, usa o padrão do tipo; `texto` divide o que sobra. */
    largura?: number | string;
    /** Soma esta coluna no total do grupo e no rodapé. Só para tipos numéricos. */
    somar?: boolean;
    /** Desliga a ordenação por clique no cabeçalho. */
    semOrdenar?: boolean;
    /** Explicação no hover do cabeçalho — para coluna cujo nome não basta. */
    dica?: string;
    /** Desenho livre da célula. O padrão continua valendo em volta (largura,
     *  alinhamento do tipo, ordenação e soma por `valor`). Retornar null/undefined
     *  mostra o "—" de vazio. */
    celula?: (linha: T) => ReactNode;
    /** Liga o filtro no cabeçalho (funil): `lista` (marcar valores) ou `faixa`
     *  (de/até + só com valor/só sem valor, para colunas numéricas). */
    filtro?: 'lista' | 'faixa';
    /** Só para filtro `lista`: os valores da linha que contam no filtro (padrão:
     *  o próprio `valor`). Ex.: cliente com contas em XP e BTG → ['XP', 'BTG']. */
    valoresFiltro?: (linha: T) => string[];
}

export declare function Combobox({ options, value, onChange, label, error, placeholder, className, disabled, side, avoidCollisions, onCriar, rotuloCriar, }: ComboboxProps): JSX.Element;

export declare namespace Combobox {
    var displayName: string;
}

export declare interface ComboboxLevel {
    id: string;
    label?: string;
    placeholder?: string;
    icon?: LucideIcon;
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
}

export declare interface ComboboxOption {
    label: string;
    value: string;
}

export declare interface ComboboxProps {
    options: ComboboxOption[];
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    error?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    /** Lado preferido do popover (default 'bottom'). */
    side?: 'top' | 'bottom' | 'left' | 'right';
    /** Radix inverte o lado quando falta espaço (default true). Passe false
     *  para SEMPRE abrir no `side` pedido — ex.: dropdown no fim de um modal
     *  que deve abrir para baixo mesmo com pouco espaço. */
    avoidCollisions?: boolean;
    /** Ação "criar" no rodapé da lista, para cadastro na hora sem sair do
     *  formulário (ex.: projeto M#### novo ao lançar um mútuo). Recebe o texto
     *  digitado na busca. O componente só avisa; quem cadastra é o chamador. */
    onCriar?: (texto: string) => void;
    /** Rótulo da ação (default 'Novo…'); o texto digitado entra entre aspas. */
    rotuloCriar?: string;
}

export declare function DataTable<T>({ data, columns, keyExtractor, actions, onSelectionChange, className, selectable, }: DataTableProps<T>): JSX.Element;

export declare interface DataTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
    keyExtractor: (item: T) => string;
    actions?: RowAction<T>[];
    onSelectionChange?: (selectedKeys: string[]) => void;
    className?: string;
    selectable?: boolean;
}

export declare const DatePicker: React_2.ForwardRefExoticComponent<DatePickerProps & React_2.RefAttributes<HTMLButtonElement>>;

export declare interface DatePickerProps {
    date?: Date;
    onSelect?: (date: Date | undefined) => void;
    label?: string;
    error?: string;
    placeholder?: string;
    className?: string;
    id?: string;
    /** Formato date-fns do valor exibido (default 'PPP' → "18 de setembro de 2026").
     *  Em barras de filtro, 'dd/MM/yyyy' mantém a largura estável. */
    formato?: string;
    /** Texto fixo antes da data no botão (ex.: "Saldo em"). */
    prefixo?: string;
    /** Limites: dias fora de [minDate, maxDate] ficam desabilitados e a
     *  navegação de meses não sai desse intervalo. */
    minDate?: Date;
    maxDate?: Date;
    /** Regra extra de bloqueio, dia a dia (ex.: período de meses não
     *  contíguos — ago e out selecionados, set fica fora). true = desabilita. */
    desabilitar?: (dia: Date) => boolean;
}

export { DateRange }

declare interface DescricaoElemento {
    tag: string;
    seletor: string;
    texto: string;
    role?: string;
    rotulo?: string;
    testid?: string;
    /** Cadeia de componentes React (do mais próximo para fora). Nomes só são legíveis em dev. */
    componentes: string[];
    /**
     * Componentes do avere-ui que contêm o elemento, do mais próximo para fora
     * (lidos da marca `data-avere-ui`, que sobrevive ao build). Vazio = peça
     * feita no próprio sistema, candidata a padronização.
     */
    avere_ui: string[];
    retangulo: {
        x: number;
        y: number;
        largura: number;
        altura: number;
    };
}

declare interface DestinoRelatos {
    url: string;
    chave: string;
}

export declare function DicaDado({ children, cor, titulo, linhas, valor, complemento }: DicaDadoProps): JSX.Element;

export declare interface DicaDadoProps {
    /** O elemento que recebe o mouse (a fatia). */
    children: ReactNode;
    /** Quadradinho na cor da fatia, ao lado do título. */
    cor?: string;
    titulo: ReactNode;
    /** Linhas de detalhe, apagadas, embaixo do título. */
    linhas?: ReactNode[];
    /** O valor em destaque. */
    valor?: ReactNode;
    /** Texto pequeno ao lado do valor (ex.: "38% do mês"). Opcional. */
    complemento?: ReactNode;
}

/** Valor decimal em string → exibição mascarada. Ex.: '1881.05' → 'R$ 1.881,05' */
export declare function displayMoeda(valor: string): string;

export declare const Drawer: React_2.FC<DialogPrimitive.DialogProps>;

export declare const DrawerBody: {
    ({ className, ...props }: React_2.HTMLAttributes<HTMLDivElement>): JSX.Element;
    displayName: string;
};

export declare const DrawerClose: React_2.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React_2.RefAttributes<HTMLButtonElement>>;

export declare const DrawerContent: React_2.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & {
    side?: "right" | "left";
} & React_2.RefAttributes<HTMLDivElement>>;

export declare const DrawerDescription: React_2.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React_2.RefAttributes<HTMLParagraphElement>, "ref"> & React_2.RefAttributes<HTMLParagraphElement>>;

export declare const DrawerFooter: {
    ({ className, ...props }: React_2.HTMLAttributes<HTMLDivElement>): JSX.Element;
    displayName: string;
};

export declare const DrawerHeader: {
    ({ className, ...props }: React_2.HTMLAttributes<HTMLDivElement>): JSX.Element;
    displayName: string;
};

export declare const DrawerOverlay: React_2.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const DrawerPortal: React_2.FC<DialogPrimitive.DialogPortalProps>;

export declare const DrawerSeparator: {
    ({ className }: {
        className?: string;
    }): JSX.Element;
    displayName: string;
};

export declare const DrawerTitle: React_2.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React_2.RefAttributes<HTMLHeadingElement>, "ref"> & React_2.RefAttributes<HTMLHeadingElement>>;

export declare const DrawerTrigger: React_2.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React_2.RefAttributes<HTMLButtonElement>>;

export declare const DropdownMenu: React_2.FC<DropdownMenuPrimitive.DropdownMenuProps>;

export declare const DropdownMenuCheckboxItem: React_2.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuCheckboxItemProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const DropdownMenuContent: React_2.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuContentProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const DropdownMenuGroup: React_2.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuGroupProps & React_2.RefAttributes<HTMLDivElement>>;

export declare const DropdownMenuItem: React_2.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuItemProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React_2.RefAttributes<HTMLDivElement>>;

export declare const DropdownMenuLabel: React_2.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuLabelProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React_2.RefAttributes<HTMLDivElement>>;

export declare const DropdownMenuPortal: React_2.FC<DropdownMenuPrimitive.DropdownMenuPortalProps>;

export declare const DropdownMenuRadioGroup: React_2.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuRadioGroupProps & React_2.RefAttributes<HTMLDivElement>>;

export declare const DropdownMenuRadioItem: React_2.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuRadioItemProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const DropdownMenuSeparator: React_2.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSeparatorProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const DropdownMenuShortcut: {
    ({ className, ...props }: React_2.HTMLAttributes<HTMLSpanElement>): JSX.Element;
    displayName: string;
};

export declare const DropdownMenuSub: React_2.FC<DropdownMenuPrimitive.DropdownMenuSubProps>;

export declare const DropdownMenuSubContent: React_2.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubContentProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const DropdownMenuSubTrigger: React_2.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubTriggerProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React_2.RefAttributes<HTMLDivElement>>;

export declare const DropdownMenuTrigger: React_2.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuTriggerProps & React_2.RefAttributes<HTMLButtonElement>>;

export declare interface EntradaModulo {
    label: string;
    path: string;
    icone: LucideIcon;
}

declare interface ErroConsole {
    em: string;
    mensagem: string;
}

export declare const FileUpload: default_2.ForwardRefExoticComponent<FileUploadProps & default_2.RefAttributes<HTMLDivElement>>;

export declare interface FileUploadProps extends Omit<default_2.HTMLAttributes<HTMLDivElement>, 'onDrop'> {
    onFileSelect?: (file: File | null) => void;
    accept?: string;
    maxSize?: number;
    label?: string;
    error?: string;
}

export declare type FiltroColuna = {
    tipo: 'lista';
    valores: string[];
} | {
    tipo: 'faixa';
    de?: string;
    ate?: string;
    comValor?: boolean;
    semValor?: boolean;
};

export declare function FiltroLista({ opcoes, selecionadas, onChange, focoInicial }: {
    opcoes: Opcao[];
    selecionadas: string[];
    onChange: (v: string[]) => void;
    /** Valor em que a lista deve abrir centralizada (ex.: o mês vigente).
     *  Sem ele, abre no primeiro item marcado. */
    focoInicial?: string;
}): JSX.Element;

/** Filtros ativos por id de coluna. */
export declare type FiltrosTabela = Record<string, FiltroColuna>;

export declare function formatBRL(v: number): string;

/** Notação compacta pt-BR para eixos de gráfico: 950 mil, 1,9 mi, 3,8 mi.
 *  Cada valor escolhe a unidade certa — a escala se adapta ao recorte. */
export declare function formatCompacto(v: number): string;

/** '2026-08-21' → '21/08/2026' (sem risco de fuso: corta a string ISO). */
export declare function formatData(iso: string): string;

/** Dinheiro com o sinal ANTES do símbolo: `−R$ 1.065,37` (vindo do Financeiro,
 *  lib/format `moedaSinalada`). O `Intl` do pt-BR produz `R$ -1.065,37`, com o
 *  menos escondido entre o símbolo e o número — numa coluna densa ele passa
 *  despercebido. Use onde o valor pode ser negativo. */
export declare function formatMoedaSinal(v: number | string): string;

/** Valor sem "R$" — para colunas densas de tabela (o header nomeia a moeda). */
export declare function formatValor(v: number): string;

export declare interface GrupoBusca {
    titulo: string;
    itens: ItemBusca[];
    /** Itens escolhidos deste grupo aparecem em "Recentes" ao abrir sem texto. */
    recentes?: boolean;
}

export declare function HierarchicalCombobox({ levels, className }: HierarchicalComboboxProps): JSX.Element;

export declare interface HierarchicalComboboxProps {
    levels: ComboboxLevel[];
    className?: string;
}

/** Vai no `logo` da SideBar: "AVERE · <sistema>". Mostra onde o usuário está; não é botão. */
export declare function IndicadorAmbiente({ atual, compacto }: IndicadorAmbienteProps): JSX.Element | null;

export declare interface IndicadorAmbienteProps {
    atual: CodigoModulo;
    /** Barra recolhida: só o ícone. */
    compacto?: boolean;
}

/** Variante compacta para células de edição inline (mesma máscara, sem
 *  label/moldura da TextField — recebe a classe da célula). */
export declare function InputDataInline({ valor, onChange, className, style }: {
    valor: string;
    onChange: (iso: string) => void;
    className?: string;
    style?: React.CSSProperties;
}): JSX.Element;

export declare const inputVariants: (props?: ({
    hasError?: boolean | null | undefined;
    hasIcon?: boolean | null | undefined;
} & ClassProp) | undefined) => string;

export declare interface ItemBusca {
    /** Único dentro do grupo. É o que fica guardado nos recentes. */
    id: string;
    rotulo: string;
    icone?: ElementType;
    /** Texto à direita (ex.: código Avere). Também entra na busca. */
    detalhe?: string | number | null;
    /** Sinônimos que também acham o item ("remover" acha "Excluir"). */
    palavrasChave?: string[];
    aoEscolher: () => void;
}

export declare function MarcadorProblemas({ app, versaoApp, usuario, habilitado, destino, }: MarcadorProblemasProps): ReactPortal | null;

export declare interface MarcadorProblemasProps {
    /** Identificador do app hospedeiro (ex.: "painel", "financeiro"). */
    app: string;
    versaoApp: string;
    /** Declarado pelo app hospedeiro; não é verificado. */
    usuario?: {
        id: string;
        nome: string;
    };
    /** Desliga o marcador sem desmontar (ex.: só para alguns perfis). */
    habilitado?: boolean;
    /** Base que recebe os relatos. Padrão: o projeto exclusivo do marcador. */
    destino?: DestinoRelatos;
}

export declare const MESES_CURTOS: string[];

export declare const Modal: React_2.FC<DialogPrimitive.DialogProps>;

export declare const ModalClose: React_2.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React_2.RefAttributes<HTMLButtonElement>>;

export declare const ModalContent: React_2.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const ModalDescription: React_2.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React_2.RefAttributes<HTMLParagraphElement>, "ref"> & React_2.RefAttributes<HTMLParagraphElement>>;

export declare const ModalFooter: {
    ({ className, ...props }: React_2.HTMLAttributes<HTMLDivElement>): JSX.Element;
    displayName: string;
};

export declare const ModalHeader: {
    ({ className, ...props }: React_2.HTMLAttributes<HTMLDivElement>): JSX.Element;
    displayName: string;
};

export declare const ModalOverlay: React_2.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const ModalPortal: React_2.FC<DialogPrimitive.DialogPortalProps>;

export declare const ModalTitle: React_2.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React_2.RefAttributes<HTMLHeadingElement>, "ref"> & React_2.RefAttributes<HTMLHeadingElement>>;

export declare const ModalTrigger: React_2.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React_2.RefAttributes<HTMLButtonElement>>;

export declare interface ModuloAvere {
    codigo: CodigoModulo;
    nome: string;
    descricao: string;
    url: string;
    icone: LucideIcon;
    principais: EntradaModulo[];
}

export declare const MODULOS_AVERE: ModuloAvere[];

export declare const MultiSelect: default_2.ForwardRefExoticComponent<MultiSelectProps & default_2.RefAttributes<HTMLInputElement>>;

export declare interface MultiSelectProps extends Omit<default_2.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    options: Option_2[];
    value?: string[];
    defaultValue?: string[];
    onChange?: (values: string[]) => void;
    label?: string;
    error?: string;
}

export declare interface Opcao {
    value: string;
    label: string;
}

export declare interface OpcaoSegmentada<T extends string> {
    value: T;
    /** Ícone ou texto curto; com `rotulo` vira também o title/aria-label. */
    icone?: ReactNode;
    rotulo: string;
    /** Mostra o rótulo ao lado do ícone (padrão: só ícone quando há ícone). */
    mostrarRotulo?: boolean;
}

declare interface Option_2 {
    label: string;
    value: string;
}
export { Option_2 as Option }

export declare interface Ordenacao {
    coluna: string;
    decrescente?: boolean;
}

/** Vai dentro da SideBar, depois do menu do próprio sistema. Cada bloco lembra
 *  se estava aberto (por navegador). Na barra recolhida vira um ícone por sistema. */
export declare function OutrosSistemas({ atual, sistemas }: OutrosSistemasProps): JSX.Element | null;

export declare interface OutrosSistemasProps {
    atual: CodigoModulo;
    /** Quais outros sistemas mostrar. Padrão: todos. O front decide pelo papel
     *  do usuário (sem login único, só master circula entre sistemas). */
    sistemas?: CodigoModulo[];
}

/** Texto cru digitado → valor decimal em string ('' se vazio). Ex.: 'R$ 1.881,05' → '1881.05' */
export declare function parseMoedaDigitada(raw: string): string;

export declare const Popover: React_2.FC<PopoverPrimitive.PopoverProps>;

export declare const PopoverContent: React_2.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const PopoverTrigger: React_2.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React_2.RefAttributes<HTMLButtonElement>>;

export declare const RadioGroup: React_2.ForwardRefExoticComponent<Omit<RadioGroupPrimitive.RadioGroupProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const RadioItem: React_2.ForwardRefExoticComponent<RadioItemProps & React_2.RefAttributes<HTMLButtonElement>>;

export declare interface RadioItemProps extends React_2.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
    label?: string;
}

export declare interface Relato {
    schema_versao: 1;
    app: string;
    versao_app: string;
    versao_avere_ui: string;
    ambiente: 'dev' | 'producao';
    rota: string;
    titulo_tela: string;
    tipo: TipoRelato | null;
    descricao: string;
    usuario_id: string | null;
    usuario_nome: string | null;
    /** Hora do clique, no navegador (a hora de gravação é do servidor). */
    capturado_em: string;
    contexto: {
        fuso: string;
        elemento: DescricaoElemento;
        viewport: {
            largura: number;
            altura: number;
            dpr: number;
        };
        navegador: string;
        idioma: string;
        erros_console: ErroConsole[];
        requisicoes_falhas: RequisicaoFalha[];
    };
}

declare interface RequisicaoFalha {
    em: string;
    metodo: string;
    url: string;
    status: number;
    duracao_ms: number;
}

export declare interface RowAction<T> {
    label: string;
    onClick: (item: T) => void;
    isDestructive?: boolean;
}

export declare function Segmentado<T extends string>({ opcoes, valor, onChange, altura }: {
    opcoes: OpcaoSegmentada<T>[];
    valor: T;
    onChange: (v: T) => void;
    altura?: number;
}): JSX.Element;

export declare const Select: default_2.FC<SelectProps>;

export declare interface SelectItem {
    label: string;
    value: string;
}

export declare function SelectMulti({ opcoes, valores, onChange, largura, rotuloVazio, substantivo, focoInicial, }: {
    opcoes: Opcao[];
    valores: string[];
    onChange: (v: string[]) => void;
    largura?: number;
    rotuloVazio?: string;
    /** Para o resumo plural: "3 <substantivo> selecionados". */
    substantivo?: string;
    /** Valor em que a lista abre centralizada (ex.: mês vigente), quando
     *  nada está marcado. */
    focoInicial?: string;
}): JSX.Element;

export declare interface SelectOption {
    value: string;
    label: string;
    /** Texto extra que entra na busca mas não aparece (ex.: código do cliente "230081"). */
    busca?: string;
    /** Texto apagado à direita do nome, na lista com busca (ex.: o código). */
    detalhe?: string;
}

export declare interface SelectProps {
    options: SelectItem[];
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    /** Gatilho reserva a largura da opção mais longa (para selects de cabeçalho
     *  fora de formulário). Off por padrão — em containers estreitos com opções
     *  longas isso estouraria o layout. */
    fitOptions?: boolean;
    error?: string;
    placeholder?: string;
    className?: string;
}

export declare function SeletorMes({ opcoes, valor, mesVigente, onChange, largura }: {
    opcoes: Opcao[];
    valor: string;
    /** Mês do atalho do botão de calendário (ex.: vigente, ou o anterior). */
    mesVigente: string;
    onChange: (v: string) => void;
    largura?: number;
}): JSX.Element;

export declare function SideBar({ isCollapsed, onToggle, isOpenMobile, onCloseMobile, logo, children, userName, userRole, userAvatarUrl, onLogout, className, ...props }: SideBarProps): JSX.Element;

export declare function SideBarItem({ icon: Icon, label, active, badge, href, externo, className, ...props }: SideBarItemProps): JSX.Element;

export declare interface SideBarItemProps extends HTMLAttributes<HTMLElement> {
    icon: ElementType;
    label: string;
    active?: boolean;
    /** Contagem/aviso à direita do rótulo (ficha sidebar: badge é elemento,
     *  não texto no label). No modo rail vira um dot sobre o ícone — a
     *  informação de "tem pendência" não some quando a barra colapsa. */
    badge?: ReactNode;
    /** Rota do item. Com href o item renderiza <a> (padrão APG para
     *  navegação): Ctrl/Cmd+clique e botão do meio abrem em nova aba.
     *  O app SPA intercepta o clique simples (preventDefault + navigate). */
    href?: string;
    /** Leva a OUTRO sistema (outro site): mostra a seta ↗ à direita. */
    externo?: boolean;
}

export declare interface SideBarProps extends HTMLAttributes<HTMLElement> {
    isCollapsed: boolean;
    onToggle?: () => void;
    isOpenMobile: boolean;
    onCloseMobile: () => void;
    logo?: ReactNode | ((isCollapsed: boolean) => ReactNode);
    children?: ReactNode;
    userName?: string;
    userRole?: string;
    userAvatarUrl?: string;
    onLogout?: () => void;
}

/** Rótulo de grupo (ficha sidebar: seções nomeadas, caixa alta, divisor).
 *  Colapsada, mostra só a linha divisória. */
export declare function SideBarSection({ label }: SideBarSectionProps): JSX.Element;

export declare interface SideBarSectionProps {
    label: string;
}

export declare const Skeleton: React_2.ForwardRefExoticComponent<SkeletonProps & React_2.RefAttributes<HTMLDivElement>>;

export declare type SkeletonProps = React_2.HTMLAttributes<HTMLDivElement>;

export declare const Slider: React_2.ForwardRefExoticComponent<Omit<SliderPrimitive.SliderProps & React_2.RefAttributes<HTMLSpanElement>, "ref"> & React_2.RefAttributes<HTMLSpanElement>>;

export declare const Spinner: React_2.ForwardRefExoticComponent<Omit<SpinnerProps, "ref"> & React_2.RefAttributes<SVGSVGElement>>;

export declare interface SpinnerProps extends React_2.SVGProps<SVGSVGElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export declare const Switch: React_2.ForwardRefExoticComponent<SwitchProps & React_2.RefAttributes<HTMLButtonElement>>;

export declare interface SwitchProps extends React_2.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
    label?: string;
}

export declare function TabelaConsulta<T extends RowData>({ dados, colunas, chave, titulo, subtitulo, icone: Icone, acoes, agrupar, aoClicarLinha, rotuloTotal, vazio, alturaFixa, ordenarPor, barra, filtros: filtrosProp, onFiltrosChange, ordenacao: ordenacaoProp, onOrdenacaoChange, carregando, linhasEsqueleto, className, }: TabelaConsultaProps<T>): JSX.Element;

export declare interface TabelaConsultaProps<T> {
    dados: T[];
    colunas: ColunaTabela<T>[];
    /** Chave estável de cada linha. */
    chave: (linha: T) => string;
    titulo?: ReactNode;
    subtitulo?: ReactNode;
    icone?: LucideIcon;
    /** Botões/controles no canto direito do topo. */
    acoes?: ReactNode;
    agrupar?: AgrupamentoTabela<T>;
    /** Linha clicável: aparece a seta › no fim e a linha inteira responde ao clique. */
    aoClicarLinha?: (linha: T) => void;
    /** Rótulo do rodapé de total (só aparece se alguma coluna `somar`). */
    rotuloTotal?: string;
    /** O que mostrar sem dados (padrão: "Nada para mostrar."). Diga o porquê, quando souber. */
    vazio?: ReactNode;
    /** Altura limitada ao espaço da tela, com a tabela rolando dentro (padrão true). */
    alturaFixa?: boolean;
    /** Ordenação inicial (quando a tela não controla a ordenação). */
    ordenarPor?: Ordenacao;
    /** Espaço da tela no topo do card, abaixo do título: busca, seletores, botões. */
    barra?: ReactNode;
    /** Filtros por coluna controlados pela tela (para lembrar entre visitas, por ex.).
     *  Sem eles, a tabela guarda os filtros sozinha enquanto a tela estiver aberta. */
    filtros?: FiltrosTabela;
    onFiltrosChange?: (f: FiltrosTabela) => void;
    /** Ordenação controlada pela tela (mesma ideia dos filtros). */
    ordenacao?: Ordenacao | null;
    onOrdenacaoChange?: (o: Ordenacao | null) => void;
    /** Dados a caminho: corpo em esqueleto (nunca o "vazio" — senão é falso vazio),
     *  cabeçalho e larguras reais, ordenação e filtros sem clique. */
    carregando?: boolean;
    /** Quantas linhas de esqueleto (padrão 8). */
    linhasEsqueleto?: number;
    className?: string;
}

export declare const TagInput: default_2.ForwardRefExoticComponent<TagInputProps & default_2.RefAttributes<HTMLInputElement>>;

export declare interface TagInputProps extends Omit<default_2.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    value?: string[];
    defaultValue?: string[];
    onChange?: (tags: string[]) => void;
    label?: string;
    error?: string;
}

export declare const TextField: ForwardRefExoticComponent<TextFieldProps & RefAttributes<HTMLInputElement>>;

export declare interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof inputVariants> {
    label?: string;
    error?: string;
    leftIcon?: LucideIcon;
}

export declare type TipoColuna = 'texto' | 'moeda' | 'moedaSinal' | 'numero' | 'percentual' | 'data' | 'selo' | 'cadastro';

export declare type TipoRelato = 'erro' | 'estranho' | 'sugestao';

export { toast }

export declare const Toaster: ({ ...props }: ToasterProps) => JSX.Element;

declare type ToasterProps = React.ComponentProps<typeof Toaster_2>;

export declare const Tooltip: React_2.FC<TooltipPrimitive.TooltipProps>;

export declare const TooltipContent: React_2.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipContentProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const TooltipProvider: React_2.FC<TooltipPrimitive.TooltipProviderProps>;

export declare const TooltipTrigger: React_2.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React_2.RefAttributes<HTMLButtonElement>>;

export declare function TopBar({ onToggleMobile, className, children, ...props }: TopBarProps): JSX.Element;

export declare interface TopBarProps extends HTMLAttributes<HTMLElement> {
    /** Opcional desde 14/10/2026: o ☰ já abre a SideBar sozinho (evento). Continua
     *  sendo chamado, para quem controlava a barra por fora. */
    onToggleMobile?: () => void;
    children?: ReactNode;
}

export declare const Typography: ForwardRefExoticComponent<TypographyProps & RefAttributes<HTMLElement>>;

export declare interface TypographyProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof typographyVariants> {
    as?: ElementType;
}

export declare const typographyVariants: (props?: ({
    variant?: "h1" | "h2" | "h3" | "h4" | "p" | null | undefined;
} & ClassProp) | undefined) => string;

/** Tab que cai num combobox/select ABRE a lista, em qualquer lugar do sistema
 *  — linha em edição, modal, drawer. Montado uma vez no layout.
 *  Clique do mouse não dispara: quem clica no gatilho já abre pelo Radix. */
export declare function useAbrirComboboxNoTab(): void;

/**
 * Altura disponível do elemento até a borda inferior da janela, descontando o
 * padding real do container de rolagem do layout. Usada como MAX-HEIGHT:
 * conteúdo curto encolhe, conteúdo longo rola internamente sem estourar a
 * página. Recalcula em resize e em qualquer mudança de tamanho do layout
 * (sidebar, fontes, quebra de linha dos filtros).
 */
export declare function useAlturaDisponivel(minimo?: number): {
    ref: RefObject<HTMLDivElement | null>;
    altura: number | undefined;
};

export declare function useEdicaoInline({ ativo, seletorLinha, coluna }: {
    /** Há linha em edição? */
    ativo: boolean;
    /** Como achar a linha em edição no DOM (ex.: 'tr.em-edicao'). */
    seletorLinha: string;
    /** Índice da célula clicada; null = não focar nada. */
    coluna: number | null;
}): void;

/** Estado da SideBar para quem mora dentro dela (ex.: OutrosSistemas). */
export declare function useSideBar(): {
    isCollapsed: boolean;
};

/** O vazio tem uma cara só em todas as tabelas: um traço apagado, com "(vazio)"
 *  no hover (padrão vindo do Financeiro). Zero NÃO é vazio — zero mostra 0. */
export declare function Vazio(): JSX.Element;

/** Valor que representa "(vazio)" no filtro de lista — como o "(Vazias)" do Excel. */
export declare const VAZIO_FILTRO = "__vazio__";

export { }
