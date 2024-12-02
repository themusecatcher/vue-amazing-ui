export interface Props {
    width?: string | number;
    size?: 'small' | 'middle' | 'large';
    addonBefore?: string;
    addonAfter?: string;
    prefix?: string;
    suffix?: string;
    allowClear?: boolean;
    password?: boolean;
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
        addonAfter?(_: {}): any;
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
    enter: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:value"?: ((...args: any[]) => any) | undefined;
    onEnter?: ((...args: any[]) => any) | undefined;
}>, {
    size: "small" | "middle" | "large";
    width: string | number;
    value: string;
    disabled: boolean;
    placeholder: string;
    allowClear: boolean;
    password: boolean;
    prefix: string;
    suffix: string;
    addonBefore: string;
    addonAfter: string;
    maxlength: number;
    showCount: boolean;
    valueModifiers: object;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
