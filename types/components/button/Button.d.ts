import { VNode, Slot } from 'vue';
export interface Props {
    type?: 'default' | 'reverse' | 'primary' | 'danger' | 'dashed' | 'text' | 'link';
    shape?: 'default' | 'circle' | 'round';
    icon?: VNode | Slot;
    size?: 'small' | 'middle' | 'large';
    ghost?: boolean;
    buttonClass?: string;
    rippleColor?: string;
    href?: string;
    target?: '_self' | '_blank';
    keyboard?: boolean;
    disabled?: boolean;
    loading?: boolean;
    loadingType?: 'static' | 'dynamic';
    block?: boolean;
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
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    click: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onClick?: ((...args: any[]) => any) | undefined;
}>, {
    size: "small" | "middle" | "large";
    type: "default" | "reverse" | "primary" | "danger" | "dashed" | "text" | "link";
    icon: VNode | Slot;
    shape: "default" | "circle" | "round";
    href: string;
    target: "_self" | "_blank";
    keyboard: boolean;
    block: boolean;
    disabled: boolean;
    ghost: boolean;
    buttonClass: string;
    rippleColor: string;
    loading: boolean;
    loadingType: "static" | "dynamic";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
