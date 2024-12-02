import { CSSProperties } from 'vue';
export interface Props {
    title?: string;
    value?: string | number;
    valueStyle?: CSSProperties;
    precision?: number;
    prefix?: string;
    suffix?: string;
    separator?: string;
    formatter?: Function;
}
declare function __VLS_template(): {
    slots: {
        title?(_: {}): any;
        prefix?(_: {}): any;
        default?(_: {}): any;
        suffix?(_: {}): any;
    };
    refs: {};
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    title: string;
    value: string | number;
    valueStyle: CSSProperties;
    separator: string;
    prefix: string;
    suffix: string;
    precision: number;
    formatter: Function;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
