export interface Option {
    label?: string;
    value?: string | number;
    disabled?: boolean;
    children?: Option[];
    [propName: string]: any;
}
export interface Props {
    options?: Option[];
    label?: string;
    value?: string;
    children?: string;
    placeholder?: string | string[];
    changeOnSelect?: boolean;
    gap?: number;
    width?: 'auto' | number | number[];
    height?: number;
    disabled?: boolean | boolean[];
    allowClear?: boolean;
    search?: boolean;
    filter?: Function | true;
    maxDisplay?: number;
    modelValue?: number[] | string[];
}
declare const _default: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    filter: Function | true;
    label: string;
    search: boolean;
    width: "auto" | number | number[];
    height: number;
    value: string;
    disabled: boolean | boolean[];
    gap: number;
    options: Option[];
    placeholder: string | string[];
    allowClear: boolean;
    maxDisplay: number;
    modelValue: number[] | string[];
    children: string;
    changeOnSelect: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
