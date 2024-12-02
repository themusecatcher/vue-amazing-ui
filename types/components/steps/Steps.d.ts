export interface Step {
    title?: string;
    description?: string;
}
export interface Props {
    steps?: Step[];
    width?: number | string;
    size?: 'default' | 'small';
    vertical?: boolean;
    labelPlacement?: 'right' | 'bottom';
    dotted?: boolean;
    current?: number;
}
declare const _default: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    "update:current": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:current"?: ((...args: any[]) => any) | undefined;
}>, {
    size: "default" | "small";
    width: number | string;
    dotted: boolean;
    vertical: boolean;
    steps: Step[];
    labelPlacement: "right" | "bottom";
    current: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
