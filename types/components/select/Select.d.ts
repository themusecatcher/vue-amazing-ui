export interface Option {
    label?: string;
    value?: string | number;
    disabled?: boolean;
    [propName: string]: any;
}
export interface Props {
    options?: Option[];
    label?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    allowClear?: boolean;
    search?: boolean;
    filter?: Function | true;
    width?: string | number;
    height?: number;
    size?: 'small' | 'middle' | 'large';
    maxDisplay?: number;
    scrollbarProps?: object;
    modelValue?: number | string;
}
declare const _default: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    openChange: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    onOpenChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    filter: Function | true;
    size: "small" | "middle" | "large";
    label: string;
    search: boolean;
    width: string | number;
    height: number;
    value: string;
    disabled: boolean;
    options: Option[];
    placeholder: string;
    allowClear: boolean;
    maxDisplay: number;
    scrollbarProps: object;
    modelValue: number | string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
