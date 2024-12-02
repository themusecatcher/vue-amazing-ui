import { CSSProperties } from 'vue';
export interface Props {
    description?: string;
    descriptionStyle?: CSSProperties;
    image?: 'filled' | 'outlined' | string;
    imageStyle?: CSSProperties;
    footer?: string;
}
declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
        description?(_: {}): any;
        footer?(_: {}): any;
    };
    refs: {};
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    footer: string;
    description: string;
    image: "filled" | "outlined" | string;
    descriptionStyle: CSSProperties;
    imageStyle: CSSProperties;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
