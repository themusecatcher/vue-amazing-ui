export interface Props {
    width?: string | number;
    align?: 'stretch' | 'start' | 'end' | 'center' | 'baseline';
    vertical?: boolean;
    gap?: number | number[] | 'small' | 'middle' | 'large';
    wrap?: boolean;
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
    wrap: boolean;
    vertical: boolean;
    gap: number | number[] | "small" | "middle" | "large";
    align: "stretch" | "start" | "end" | "center" | "baseline";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
