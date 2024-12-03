import { VNode, Slot } from 'vue';
export interface Responsive {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
}
export interface Props {
    color?: string;
    shape?: 'circle' | 'square';
    size?: number | 'small' | 'middle' | 'large' | Responsive;
    src?: string;
    alt?: string;
    icon?: VNode | Slot;
    href?: string;
    target?: '_self' | '_blank';
}
declare function __VLS_template(): {
    slots: {
        icon?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {};
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    size: number | "small" | "middle" | "large" | Responsive;
    icon: VNode | Slot;
    src: string;
    color: string;
    shape: "circle" | "square";
    alt: string;
    href: string;
    target: "_self" | "_blank";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
