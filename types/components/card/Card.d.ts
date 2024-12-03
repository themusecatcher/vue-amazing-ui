import { CSSProperties } from 'vue';
export interface Props {
    width?: number | string;
    bordered?: boolean;
    size?: 'small' | 'middle' | 'large';
    hoverable?: boolean;
    loading?: boolean;
    skeletonProps?: object;
    title?: string;
    extra?: string;
    headStyle?: CSSProperties;
    bodyStyle?: CSSProperties;
}
declare function __VLS_template(): {
    slots: {
        title?(_: {}): any;
        extra?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {};
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    size: "small" | "middle" | "large";
    title: string;
    bordered: boolean;
    width: number | string;
    loading: boolean;
    hoverable: boolean;
    skeletonProps: object;
    extra: string;
    headStyle: CSSProperties;
    bodyStyle: CSSProperties;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};