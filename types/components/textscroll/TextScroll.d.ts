import { CSSProperties } from 'vue';
export interface Text {
    title: string;
    href?: string;
    target?: '_self' | '_blank';
}
export interface Props {
    scrollText?: Text[] | Text;
    single?: boolean;
    width?: number | string;
    height?: number;
    boardStyle?: CSSProperties;
    textStyle?: CSSProperties;
    hrefHoverColor?: string;
    amount?: number;
    gap?: number;
    interval?: number;
    step?: number;
    vertical?: boolean;
    verticalInterval?: number;
}
declare function initScrollText(): void;
declare function startMove(): void;
declare function stopMove(): void;
declare const _default: import('vue').DefineComponent<Props, {
    start: typeof startMove;
    stop: typeof stopMove;
    reset: typeof initScrollText;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    click: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onClick?: ((...args: any[]) => any) | undefined;
}>, {
    width: number | string;
    height: number;
    vertical: boolean;
    single: boolean;
    interval: number;
    gap: number;
    step: number;
    scrollText: Text[] | Text;
    boardStyle: CSSProperties;
    textStyle: CSSProperties;
    hrefHoverColor: string;
    amount: number;
    verticalInterval: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
