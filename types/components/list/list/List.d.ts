export interface Props {
    bordered?: boolean;
    vertical?: boolean;
    split?: boolean;
    size?: 'small' | 'middle' | 'large';
    loading?: boolean;
    hoverable?: boolean;
    header?: string;
    footer?: string;
    spinProps?: object;
    emptyProps?: object;
    showPagination?: boolean;
    pagination?: object;
}
declare function __VLS_template(): {
    slots: {
        header?(_: {}): any;
        default?(_: {}): any;
        footer?(_: {}): any;
    };
    refs: {};
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    size: "small" | "middle" | "large";
    footer: string;
    header: string;
    bordered: boolean;
    split: boolean;
    vertical: boolean;
    loading: boolean;
    hoverable: boolean;
    spinProps: object;
    emptyProps: object;
    showPagination: boolean;
    pagination: object;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
