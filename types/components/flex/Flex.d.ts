export interface Props {
    width?: string | number;
    vertical?: boolean;
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    justify?: string;
    align?: string;
    gap?: number | number[] | 'small' | 'middle' | 'large';
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
    wrap: "nowrap" | "wrap" | "wrap-reverse";
    vertical: boolean;
    justify: string;
    gap: number | number[] | "small" | "middle" | "large";
    align: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
