export interface MenuitemsType {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chipBgColor?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: MenuitemsType[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}
