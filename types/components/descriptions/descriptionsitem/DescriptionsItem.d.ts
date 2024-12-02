import { CSSProperties } from 'vue';
export interface Props {
    label?: string;
    span?: number;
    labelStyle?: CSSProperties;
    contentStyle?: CSSProperties;
}
declare function __VLS_template(): {
    slots: {
        label?(_: {}): any;
        label?(_: {}): any;
        default?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {};
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    label: string;
    span: number;
    contentStyle: CSSProperties;
    labelStyle: CSSProperties;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
