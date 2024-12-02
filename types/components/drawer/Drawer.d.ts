import { CSSProperties } from 'vue';
export interface Props {
    width?: string | number;
    height?: string | number;
    title?: string;
    closable?: boolean;
    placement?: 'top' | 'right' | 'bottom' | 'left';
    headerClass?: string;
    headerStyle?: CSSProperties;
    scrollbarProps?: object;
    bodyClass?: string;
    bodyStyle?: CSSProperties;
    extra?: string;
    footer?: string;
    footerClass?: string;
    footerStyle?: CSSProperties;
    destroyOnClose?: boolean;
    zIndex?: number;
    open?: boolean;
}
declare function __VLS_template(): {
    slots: {
        title?(_: {}): any;
        title?(_: {}): any;
        extra?(_: {}): any;
        extra?(_: {}): any;
        default?(_: {}): any;
        default?(_: {}): any;
        footer?(_: {}): any;
        footer?(_: {}): any;
    };
    refs: {
        drawerRef: HTMLDivElement;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    close: (...args: any[]) => void;
    "update:open": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onClose?: ((...args: any[]) => any) | undefined;
    "onUpdate:open"?: ((...args: any[]) => any) | undefined;
}>, {
    footer: string;
    title: string;
    closable: boolean;
    width: string | number;
    height: string | number;
    placement: "top" | "right" | "bottom" | "left";
    zIndex: number;
    open: boolean;
    extra: string;
    bodyStyle: CSSProperties;
    scrollbarProps: object;
    headerStyle: CSSProperties;
    bodyClass: string;
    headerClass: string;
    footerClass: string;
    footerStyle: CSSProperties;
    destroyOnClose: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
