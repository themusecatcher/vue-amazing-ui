import { CSSProperties, VNode, Slot } from 'vue';
export interface Props {
    title?: string;
    titleStyle?: CSSProperties;
    description?: string;
    descriptionStyle?: CSSProperties;
    keyboard?: boolean;
    tooltipStyle?: CSSProperties;
    icon?: 'success' | 'info' | 'warning' | 'danger' | VNode | Slot;
    iconStyle?: CSSProperties;
    cancelText?: string;
    cancelType?: 'default' | 'reverse' | 'primary' | 'danger' | 'dashed' | 'text' | 'link';
    cancelProps?: object;
    okText?: string;
    okType?: 'default' | 'reverse' | 'primary' | 'danger' | 'dashed' | 'text' | 'link';
    okProps?: object;
    showCancel?: boolean;
}
declare function __VLS_template(): {
    slots: {
        icon?(_: {}): any;
        title?(_: {}): any;
        description?(_: {}): any;
        cancelText?(_: {}): any;
        okText?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {
        tooltipRef: any;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    cancel: (...args: any[]) => void;
    ok: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onCancel?: ((...args: any[]) => any) | undefined;
    onOk?: ((...args: any[]) => any) | undefined;
}>, {
    title: string;
    description: string;
    icon: "success" | "info" | "warning" | "danger" | VNode | Slot;
    tooltipStyle: CSSProperties;
    keyboard: boolean;
    descriptionStyle: CSSProperties;
    titleStyle: CSSProperties;
    cancelText: string;
    cancelProps: object;
    okText: string;
    okType: "default" | "reverse" | "primary" | "danger" | "dashed" | "text" | "link";
    okProps: object;
    iconStyle: CSSProperties;
    cancelType: "default" | "reverse" | "primary" | "danger" | "dashed" | "text" | "link";
    showCancel: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
