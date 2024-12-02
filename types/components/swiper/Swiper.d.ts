export interface Image {
    name?: string;
    src: string;
    link?: string;
}
export interface Props {
    images?: Image[];
    width?: number | string;
    height?: number | string;
    mode?: 'banner' | 'carousel' | 'broadcast';
    navigation?: boolean;
    effect?: 'slide' | 'fade' | 'cube' | 'flip' | 'coverflow' | 'cards' | 'creative';
    delay?: number;
    speed?: number;
    loop?: boolean;
    pauseOnMouseEnter?: boolean;
    swipe?: boolean;
    preloaderColor?: 'theme' | 'white' | 'black';
}
declare const _default: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    swiper: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    onSwiper?: ((...args: any[]) => any) | undefined;
}>, {
    mode: "banner" | "carousel" | "broadcast";
    width: number | string;
    height: number | string;
    speed: number;
    images: Image[];
    pauseOnMouseEnter: boolean;
    effect: "slide" | "fade" | "cube" | "flip" | "coverflow" | "cards" | "creative";
    delay: number;
    loop: boolean;
    navigation: boolean;
    swipe: boolean;
    preloaderColor: "theme" | "white" | "black";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
