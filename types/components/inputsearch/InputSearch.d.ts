export interface Props {
    width?: string | number;
    icon?: boolean;
    search?: string;
    searchProps?: object;
    size?: 'small' | 'middle' | 'large';
    allowClear?: boolean;
    addonBefore?: string;
    prefix?: string;
    suffix?: string;
    loading?: boolean;
    disabled?: boolean;
    placeholder?: string;
    maxlength?: number;
    showCount?: boolean;
    value?: string;
    valueModifiers?: object;
}
declare function __VLS_template(): {
    slots: {
        addonBefore?(_: {}): any;
        prefix?(_: {}): any;
        suffix?(_: {}): any;
        search?(_: {}): any;
    };
    refs: {
        inputRef: HTMLInputElement;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    search: (...args: any[]) => void;
    change: (...args: any[]) => void;
    "update:value": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onSearch?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:value"?: ((...args: any[]) => any) | undefined;
}>, {
    size: "small" | "middle" | "large";
    search: string;
    icon: boolean;
    width: string | number;
    value: string;
    disabled: boolean;
    loading: boolean;
    placeholder: string;
    allowClear: boolean;
    prefix: string;
    suffix: string;
    addonBefore: string;
    maxlength: number;
    showCount: boolean;
    valueModifiers: object;
    searchProps: object;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
