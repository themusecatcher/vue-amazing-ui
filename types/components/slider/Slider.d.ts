export interface Props {
    width?: string | number;
    height?: string | number;
    vertical?: boolean;
    min?: number;
    max?: number;
    disabled?: boolean;
    range?: boolean;
    step?: number;
    formatTooltip?: (value: number) => string | number;
    tooltip?: boolean;
    value?: number | number[];
}
declare const _default: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    "update:value": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:value"?: ((...args: any[]) => any) | undefined;
}>, {
    width: string | number;
    height: string | number;
    tooltip: boolean;
    value: number | number[];
    max: number;
    vertical: boolean;
    range: boolean;
    disabled: boolean;
    min: number;
    step: number;
    formatTooltip: (value: number) => string | number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
