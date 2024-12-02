export interface Responsive {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
}
export interface Props {
    width?: string | number;
    gutter?: number | [number | Responsive, number | Responsive] | Responsive;
    wrap?: boolean;
    align?: 'top' | 'middle' | 'bottom' | 'stretch';
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
}
declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    width: string | number;
    wrap: boolean;
    justify: "start" | "end" | "center" | "space-around" | "space-between" | "space-evenly";
    align: "top" | "middle" | "bottom" | "stretch";
    gutter: number | [number | Responsive, number | Responsive] | Responsive;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
