import { Slot } from 'vue';
export interface Props {
    icon?: Slot;
    status?: 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';
    title?: string;
    subTitle?: string;
    extra?: string;
}
declare function __VLS_template(): {
    slots: {
        icon?(_: {}): any;
        title?(_: {}): any;
        subTitle?(_: {}): any;
        extra?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {};
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    title: string;
    icon: Slot;
    status: "success" | "error" | "info" | "warning" | "404" | "403" | "500";
    extra: string;
    subTitle: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
