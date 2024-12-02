export interface Props {
    width?: string | number;
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
    prefix?: string;
    formatter?: (value: string | number) => string;
    parser?: (value: string) => number;
    keyboard?: boolean;
    disabled?: boolean;
    placeholder?: string;
    value?: number;
    valueModifiers?: object;
}
declare function __VLS_template(): {
    slots: {
        prefix?(_: {}): any;
    };
    refs: {
        inputRef: HTMLInputElement;
    };
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
    width: string | number;
    keyboard: boolean;
    value: number;
    max: number;
    disabled: boolean;
    placeholder: string;
    prefix: string;
    valueModifiers: object;
    min: number;
    step: number;
    precision: number;
    formatter: (value: string | number) => string;
    parser: (value: string) => number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
