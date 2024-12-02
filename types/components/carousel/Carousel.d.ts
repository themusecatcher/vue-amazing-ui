import { CSSProperties } from 'vue';
export interface Image {
    title?: string;
    src: string;
    link?: string;
}
export interface Props {
    images?: Image[];
    width?: number | string;
    height?: number | string;
    autoplay?: boolean;
    pauseOnMouseEnter?: boolean;
    effect?: 'slide' | 'fade';
    interval?: number;
    showArrow?: boolean;
    arrowColor?: string;
    arrowSize?: number;
    dots?: boolean;
    dotSize?: number;
    dotColor?: string;
    dotActiveColor?: string;
    dotStyle?: CSSProperties;
    dotActiveStyle?: CSSProperties;
    dotPosition?: 'bottom' | 'top' | 'left' | 'right';
    dotsTrigger?: 'click' | 'hover';
    spinProps?: object;
    fadeDuration?: number;
    fadeFunction?: string;
    slideDuration?: number;
    slideFunction?: string | number[];
}
declare function to(n: number): void;
declare function prev(): void;
declare function next(): void;
declare function getCurrentIndex(): number;
declare const _default: import('vue').DefineComponent<Props, {
    to: typeof to;
    prev: typeof prev;
    next: typeof next;
    getCurrentIndex: typeof getCurrentIndex;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    click: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    onClick?: ((...args: any[]) => any) | undefined;
}>, {
    width: number | string;
    height: number | string;
    images: Image[];
    autoplay: boolean;
    pauseOnMouseEnter: boolean;
    effect: "slide" | "fade";
    interval: number;
    showArrow: boolean;
    arrowColor: string;
    arrowSize: number;
    dots: boolean;
    dotSize: number;
    dotColor: string;
    dotActiveColor: string;
    dotStyle: CSSProperties;
    dotActiveStyle: CSSProperties;
    dotPosition: "bottom" | "top" | "left" | "right";
    dotsTrigger: "click" | "hover";
    spinProps: object;
    fadeDuration: number;
    fadeFunction: string;
    slideDuration: number;
    slideFunction: string | number[];
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
