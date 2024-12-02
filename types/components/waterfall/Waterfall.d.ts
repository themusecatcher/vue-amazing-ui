export interface Image {
    name?: string;
    src: string;
}
export interface Props {
    images?: Image[];
    columnCount?: number;
    columnGap?: number;
    width?: string | number;
    borderRadius?: number;
    backgroundColor?: string;
    spinProps?: object;
}
declare const _default: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    width: string | number;
    borderRadius: number;
    backgroundColor: string;
    columnCount: number;
    columnGap: number;
    images: Image[];
    spinProps: object;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
