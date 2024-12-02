import { VNode, Slot, CSSProperties } from 'vue';
export interface Props {
    width?: string | number;
    icon?: VNode | Slot;
    title?: string;
    titleStyle?: CSSProperties;
    content?: string;
    contentStyle?: CSSProperties;
    bodyClass?: string;
    bodyStyle?: CSSProperties;
    cancelText?: string;
    cancelProps?: object;
    okText?: string;
    okType?: 'default' | 'reverse' | 'primary' | 'danger' | 'dashed' | 'text' | 'link';
    okProps?: object;
    noticeText?: string;
    noticeProps?: object;
    centered?: boolean;
    top?: string | number;
    transformOrigin?: 'mouse' | 'center';
    confirmLoading?: boolean;
    blockScroll?: boolean;
    keyboard?: boolean;
    maskClosable?: boolean;
    maskStyle?: CSSProperties;
}
export interface Modal {
    width?: string | number;
    icon?: VNode;
    title?: string;
    titleStyle?: CSSProperties;
    content?: string;
    contentStyle?: CSSProperties;
    bodyClass?: string;
    bodyStyle?: CSSProperties;
    cancelText?: string;
    cancelProps?: object;
    okText?: string;
    okType?: 'default' | 'reverse' | 'primary' | 'danger' | 'dashed' | 'text' | 'link';
    okProps?: object;
    noticeText?: string;
    noticeProps?: object;
    centered?: boolean;
    top?: string | number;
    transformOrigin?: 'mouse' | 'center';
    blockScroll?: boolean;
    keyboard?: boolean;
    maskClosable?: boolean;
    maskStyle?: CSSProperties;
    onKnow?: Function;
    onOk?: Function;
    onCancel?: Function;
}
declare function info(data: Modal): void;
declare function success(data: Modal): void;
declare function error(data: Modal): void;
declare function warning(data: Modal): void;
declare function confirm(data: Modal): void;
declare function erase(data: Modal): void;
declare function __VLS_template(): {
    slots: {
        icon?(_: {}): any;
        title?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {
        modalWrapRef: HTMLDivElement;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {
    info: typeof info;
    success: typeof success;
    error: typeof error;
    warning: typeof warning;
    confirm: typeof confirm;
    erase: typeof erase;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    cancel: (...args: any[]) => void;
    "update:open": (...args: any[]) => void;
    ok: (...args: any[]) => void;
    know: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onCancel?: ((...args: any[]) => any) | undefined;
    "onUpdate:open"?: ((...args: any[]) => any) | undefined;
    onOk?: ((...args: any[]) => any) | undefined;
    onKnow?: ((...args: any[]) => any) | undefined;
}>, {
    title: string;
    icon: VNode | Slot;
    width: string | number;
    top: string | number;
    content: string;
    contentStyle: CSSProperties;
    keyboard: boolean;
    transformOrigin: "mouse" | "center";
    bodyStyle: CSSProperties;
    titleStyle: CSSProperties;
    cancelText: string;
    bodyClass: string;
    cancelProps: object;
    okText: string;
    okType: "default" | "reverse" | "primary" | "danger" | "dashed" | "text" | "link";
    okProps: object;
    centered: boolean;
    confirmLoading: boolean;
    blockScroll: boolean;
    maskClosable: boolean;
    maskStyle: CSSProperties;
    noticeText: string;
    noticeProps: object;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
