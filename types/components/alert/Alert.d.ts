import { Slot } from 'vue';
export interface Props {
    message?: string;
    description?: string;
    type?: 'default' | 'success' | 'info' | 'warning' | 'error';
    bordered?: boolean;
    closable?: boolean;
    closeText?: string;
    icon?: string;
    showIcon?: boolean;
    actions?: Slot;
}
declare function __VLS_template(): {
    slots: {
        icon?(_: {}): any;
        icon?(_: {}): any;
        default?(_: {}): any;
        description?(_: {}): any;
        actions?(_: {}): any;
        closeText?(_: {}): any;
    };
    refs: {
        alertRef: HTMLDivElement;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    close: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onClose?: ((...args: any[]) => any) | undefined;
}>, {
    message: string;
    description: string;
    type: "default" | "success" | "info" | "warning" | "error";
    bordered: boolean;
    closable: boolean;
    closeText: string;
    icon: string;
    showIcon: boolean;
    actions: Slot;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
