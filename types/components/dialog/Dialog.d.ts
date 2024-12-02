import { CSSProperties } from 'vue';
export interface Props {
    width?: string | number;
    height?: string | number;
    title?: string;
    titleStyle?: CSSProperties;
    content?: string;
    contentStyle?: CSSProperties;
    bodyClass?: string;
    bodyStyle?: CSSProperties;
    cancelText?: string;
    cancelProps?: object;
    okText?: string;
    okType?: 'primary' | 'danger';
    okProps?: object;
    footer?: boolean;
    switchFullscreen?: boolean;
    centered?: boolean;
    top?: string | number;
    transformOrigin?: 'mouse' | 'center';
    confirmLoading?: boolean;
    blockScroll?: boolean;
    keyboard?: boolean;
    maskClosable?: boolean;
    maskStyle?: CSSProperties;
    open?: boolean;
}
declare function __VLS_template(): {
    slots: {
        title?(_: {}): any;
        default?(_: {}): any;
        footer?(_: {}): any;
    };
    refs: {
        dialogRef: HTMLDivElement;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    cancel: (...args: any[]) => void;
    "update:open": (...args: any[]) => void;
    ok: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onCancel?: ((...args: any[]) => any) | undefined;
    "onUpdate:open"?: ((...args: any[]) => any) | undefined;
    onOk?: ((...args: any[]) => any) | undefined;
}>, {
    footer: boolean;
    title: string;
    width: string | number;
    height: string | number;
    top: string | number;
    content: string;
    contentStyle: CSSProperties;
    keyboard: boolean;
    transformOrigin: "mouse" | "center";
    open: boolean;
    bodyStyle: CSSProperties;
    titleStyle: CSSProperties;
    cancelText: string;
    bodyClass: string;
    cancelProps: object;
    okText: string;
    okType: "primary" | "danger";
    okProps: object;
    switchFullscreen: boolean;
    centered: boolean;
    confirmLoading: boolean;
    blockScroll: boolean;
    maskClosable: boolean;
    maskStyle: CSSProperties;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
