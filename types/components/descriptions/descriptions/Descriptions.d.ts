import { CSSProperties } from 'vue';
export interface Responsive {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
}
export interface Props {
    title?: string;
    extra?: string;
    bordered?: boolean;
    vertical?: boolean;
    size?: 'default' | 'middle' | 'small';
    column?: number | Responsive;
    labelStyle?: CSSProperties;
    contentStyle?: CSSProperties;
}
declare function __VLS_template(): {
    slots: {
        title?(_: {}): any;
        extra?(_: {}): any;
        default?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {
        tdCols: HTMLTableCellElement;
        trBorderedRows: HTMLTableRowElement;
        thVerticalCols: HTMLDivElement;
        tdVerticalCols: HTMLDivElement;
        thVerticalBorderedRows: HTMLTableRowElement;
        tdVerticalBorderedRows: HTMLTableRowElement;
        defaultSlotsRef: HTMLDivElement;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    size: "default" | "middle" | "small";
    title: string;
    bordered: boolean;
    contentStyle: CSSProperties;
    column: number | Responsive;
    vertical: boolean;
    extra: string;
    labelStyle: CSSProperties;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
