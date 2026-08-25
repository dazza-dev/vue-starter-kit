export interface MenuItem {
    header?: string;
    title?: string;
    icon?: unknown;
    to?: string;
    chip?: string;
    chipBgColor?: string;
    chipColor?: string;
    chipVariant?: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain';
    chipIcon?: string;
    children?: MenuItem[];
    disabled?: boolean;
    type?: 'external';
    subCaption?: string;
}
