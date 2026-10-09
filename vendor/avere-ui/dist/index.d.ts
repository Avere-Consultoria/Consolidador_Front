import { ButtonHTMLAttributes } from 'react';
import { ClassProp } from 'class-variance-authority/types';
import { ClassValue } from 'clsx';
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
import * as SliderPrimitive from '@radix-ui/react-slider';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { toast } from 'sonner';
import { Toaster as Toaster_2 } from 'sonner';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { VariantProps } from 'class-variance-authority';

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

export declare function Calendar({ className, classNames, showOutsideDays, ...props }: CalendarProps): JSX.Element;

declare type CalendarProps = React_2.ComponentProps<typeof DayPicker>;

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

export declare function FiltroLista({ opcoes, selecionadas, onChange, focoInicial }: {
    opcoes: Opcao[];
    selecionadas: string[];
    onChange: (v: string[]) => void;
    /** Valor em que a lista deve abrir centralizada (ex.: o mês vigente).
     *  Sem ele, abre no primeiro item marcado. */
    focoInicial?: string;
}): JSX.Element;

export declare function formatBRL(v: number): string;

/** Notação compacta pt-BR para eixos de gráfico: 950 mil, 1,9 mi, 3,8 mi.
 *  Cada valor escolhe a unidade certa — a escala se adapta ao recorte. */
export declare function formatCompacto(v: number): string;

/** '2026-08-21' → '21/08/2026' (sem risco de fuso: corta a string ISO). */
export declare function formatData(iso: string): string;

/** Valor sem "R$" — para colunas densas de tabela (o header nomeia a moeda). */
export declare function formatValor(v: number): string;

export declare function HierarchicalCombobox({ levels, className }: HierarchicalComboboxProps): JSX.Element;

export declare interface HierarchicalComboboxProps {
    levels: ComboboxLevel[];
    className?: string;
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

export declare function SideBarItem({ icon: Icon, label, active, badge, href, className, ...props }: SideBarItemProps): JSX.Element;

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
    onToggleMobile: () => void;
    children?: ReactNode;
}

/** Trocador de sistemas da Avere para a barra de cima: mostra o nome do sistema
 *  atual e, ao clicar, os outros. Cada sistema tem login próprio — se aquele
 *  navegador nunca entrou no destino, ele pede login uma vez (decisão 09/10/2026:
 *  login único adiado). Com um só sistema visível, vira rótulo estático. */
export declare function TrocadorModulos({ atual, modulos, className }: TrocadorModulosProps): JSX.Element | null;

export declare interface TrocadorModulosProps {
    /** Sistema em que o usuário está. */
    atual: CodigoModulo;
    /** Quais sistemas listar (o atual entra sempre). Padrão: todos.
     *  O front decide pelo papel do usuário — ex.: consultor só vê o Consolidador. */
    modulos?: CodigoModulo[];
    className?: string;
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

export { }
