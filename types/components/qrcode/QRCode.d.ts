export interface Props {
    value?: string;
    size?: number;
    color?: string;
    bgColor?: string;
    bordered?: boolean;
    borderColor?: string;
    scale?: number;
    errorLevel?: 'L' | 'M' | 'Q' | 'H';
}
declare const _default: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    size: number;
    bordered: boolean;
    color: string;
    bgColor: string;
    value: string;
    scale: number;
    borderColor: string;
    errorLevel: "L" | "M" | "Q" | "H";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
