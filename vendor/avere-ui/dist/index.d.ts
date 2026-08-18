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
import { RefAttributes } from 'react';
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

export declare interface ColumnDef<T> {
    header: string;
    accessorKey?: keyof T;
    cell?: (item: T) => default_2.ReactNode;
    sortable?: boolean;
}

export declare function Combobox({ options, value, onChange, label, error, placeholder, className, disabled, }: ComboboxProps): JSX.Element;

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
}

export { DateRange }

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

export declare const FileUpload: default_2.ForwardRefExoticComponent<FileUploadProps & default_2.RefAttributes<HTMLDivElement>>;

export declare interface FileUploadProps extends Omit<default_2.HTMLAttributes<HTMLDivElement>, 'onDrop'> {
    onFileSelect?: (file: File | null) => void;
    accept?: string;
    maxSize?: number;
    label?: string;
    error?: string;
}

export declare function HierarchicalCombobox({ levels, className }: HierarchicalComboboxProps): JSX.Element;

export declare interface HierarchicalComboboxProps {
    levels: ComboboxLevel[];
    className?: string;
}

export declare const inputVariants: (props?: ({
    hasError?: boolean | null | undefined;
    hasIcon?: boolean | null | undefined;
} & ClassProp) | undefined) => string;

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

export declare const MultiSelect: default_2.ForwardRefExoticComponent<MultiSelectProps & default_2.RefAttributes<HTMLInputElement>>;

export declare interface MultiSelectProps extends Omit<default_2.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    options: Option_2[];
    value?: string[];
    defaultValue?: string[];
    onChange?: (values: string[]) => void;
    label?: string;
    error?: string;
}

declare interface Option_2 {
    label: string;
    value: string;
}
export { Option_2 as Option }

export declare const Popover: React_2.FC<PopoverPrimitive.PopoverProps>;

export declare const PopoverContent: React_2.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const PopoverTrigger: React_2.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React_2.RefAttributes<HTMLButtonElement>>;

export declare const RadioGroup: React_2.ForwardRefExoticComponent<Omit<RadioGroupPrimitive.RadioGroupProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const RadioItem: React_2.ForwardRefExoticComponent<RadioItemProps & React_2.RefAttributes<HTMLButtonElement>>;

export declare interface RadioItemProps extends React_2.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
    label?: string;
}

export declare interface RowAction<T> {
    label: string;
    onClick: (item: T) => void;
    isDestructive?: boolean;
}

export declare const Select: default_2.FC<SelectProps>;

export declare interface SelectItem {
    label: string;
    value: string;
}

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

export declare const Typography: ForwardRefExoticComponent<TypographyProps & RefAttributes<HTMLElement>>;

export declare interface TypographyProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof typographyVariants> {
    as?: ElementType;
}

export declare const typographyVariants: (props?: ({
    variant?: "h1" | "h2" | "h3" | "h4" | "p" | null | undefined;
} & ClassProp) | undefined) => string;

export { }
