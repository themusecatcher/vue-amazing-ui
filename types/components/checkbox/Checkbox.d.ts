export interface Option {
    label: string;
    value: string | number;
    disabled?: boolean;
}
export interface Props {
    options?: Option[];
    disabled?: boolean;
    vertical?: boolean;
    value?: (string | number)[];
    gap?: number | number[];
    width?: string | number;
    height?: string | number;
    indeterminate?: boolean;
    checked?: boolean;
}
declare function __VLS_template(): {
    slots: {
        default?(_: {
            label: string;
        }): any;
        default?(_: {}): any;
    };
    refs: {};
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    "update:value": (...args: any[]) => void;
    "update:checked": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:value"?: ((...args: any[]) => any) | undefined;
    "onUpdate:checked"?: ((...args: any[]) => any) | undefined;
}>, {
    width: string | number;
    height: string | number;
    value: (string | number)[];
    vertical: boolean;
    disabled: boolean;
    gap: number | number[];
    options: Option[];
    indeterminate: boolean;
    checked: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
