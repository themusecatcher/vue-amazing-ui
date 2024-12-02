export interface Props {
    width?: string | number;
    allowClear?: boolean;
    autoSize?: boolean | {
        minRows?: number;
        maxRows?: number;
    };
    disabled?: boolean;
    placeholder?: string;
    maxlength?: number;
    showCount?: boolean;
    value?: string;
    valueModifiers?: object;
}
declare const _default: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    "update:value": (...args: any[]) => void;
    enter: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:value"?: ((...args: any[]) => any) | undefined;
    onEnter?: ((...args: any[]) => any) | undefined;
}>, {
    width: string | number;
    value: string;
    disabled: boolean;
    placeholder: string;
    allowClear: boolean;
    maxlength: number;
    showCount: boolean;
    valueModifiers: object;
    autoSize: boolean | {
        minRows?: number;
        maxRows?: number;
    };
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
