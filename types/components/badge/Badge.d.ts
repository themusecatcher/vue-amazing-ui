import { CSSProperties } from 'vue';
declare enum PresetColor {
    pink = "pink",
    red = "red",
    yellow = "yellow",
    orange = "orange",
    cyan = "cyan",
    green = "green",
    blue = "blue",
    purple = "purple",
    geekblue = "geekblue",
    magenta = "magenta",
    volcano = "volcano",
    gold = "gold",
    lime = "lime"
}
declare enum Status {
    success = "success",
    processing = "processing",
    default = "default",
    error = "error",
    warning = "warning"
}
export interface Props {
    color?: PresetColor | string;
    value?: number | string;
    max?: number;
    showZero?: boolean;
    dot?: boolean;
    offset?: [number | string, number | string];
    status?: Status;
    text?: string;
    valueStyle?: CSSProperties;
    zIndex?: number;
    title?: string;
    ripple?: boolean;
}
declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
        default?(_: {}): any;
        value?(_: {}): any;
    };
    refs: {};
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    text: string;
    title: string;
    color: PresetColor | string;
    zIndex: number;
    value: number | string;
    max: number;
    showZero: boolean;
    dot: boolean;
    offset: [number | string, number | string];
    status: Status;
    valueStyle: CSSProperties;
    ripple: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
