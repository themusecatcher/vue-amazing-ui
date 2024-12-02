export interface Gradient {
    '0%'?: string;
    '100%'?: string;
    from?: string;
    to?: string;
    direction?: 'left' | 'right';
}
export interface Props {
    width?: number | string;
    percent?: number;
    lineSize?: number;
    lineColor?: string | Gradient;
    lineCap?: 'round' | 'square';
    showInfo?: boolean;
    infoSize?: number;
    success?: string;
    format?: (percent: number) => string | number;
    type?: 'line' | 'circle';
}
declare function __VLS_template(): {
    slots: {
        success?(_: {}): any;
        success?(_: {}): any;
        format?(_: {
            percent: number;
        }): any;
        format?(_: {
            percent: number;
        }): any;
    };
    refs: {};
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    success: string;
    type: "line" | "circle";
    width: number | string;
    format: (percent: number) => string | number;
    percent: number;
    lineSize: number;
    lineColor: string | Gradient;
    lineCap: "round" | "square";
    showInfo: boolean;
    infoSize: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
