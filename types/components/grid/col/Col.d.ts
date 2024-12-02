export interface Props {
    span?: number;
    offset?: number;
    flex?: string | number;
    order?: number;
    xs?: number | {
        span?: number;
        offset?: number;
    };
    sm?: number | {
        span?: number;
        offset?: number;
    };
    md?: number | {
        span?: number;
        offset?: number;
    };
    lg?: number | {
        span?: number;
        offset?: number;
    };
    xl?: number | {
        span?: number;
        offset?: number;
    };
    xxl?: number | {
        span?: number;
        offset?: number;
    };
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
    span: number;
    xxl: number | {
        span?: number;
        offset?: number;
    };
    xl: number | {
        span?: number;
        offset?: number;
    };
    lg: number | {
        span?: number;
        offset?: number;
    };
    md: number | {
        span?: number;
        offset?: number;
    };
    sm: number | {
        span?: number;
        offset?: number;
    };
    xs: number | {
        span?: number;
        offset?: number;
    };
    offset: number;
    flex: string | number;
    order: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
