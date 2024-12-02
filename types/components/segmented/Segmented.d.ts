export interface Option {
    label?: string;
    value: string | number;
    disabled?: boolean;
    payload?: any;
}
export interface Props {
    block?: boolean;
    disabled?: boolean;
    options?: string[] | number[] | Option[];
    size?: 'small' | 'middle' | 'large';
    value?: string | number;
}
declare function __VLS_template(): {
    slots: {
        label?(_: {
            label: string | number | undefined;
            payload: any;
        }): any;
    };
    refs: {};
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    "update:value": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:value"?: ((...args: any[]) => any) | undefined;
}>, {
    size: "small" | "middle" | "large";
    value: string | number;
    block: boolean;
    disabled: boolean;
    options: string[] | number[] | Option[];
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
