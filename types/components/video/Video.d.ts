export interface Props {
    src?: string;
    poster?: string;
    second?: number;
    width?: string | number;
    height?: string | number;
    autoplay?: boolean;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
    preload?: 'auto' | 'metadata' | 'none';
    showPlay?: boolean;
    fit?: 'none' | 'fill' | 'contain' | 'cover';
}
declare const _default: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    pause: (...args: any[]) => void;
    play: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onPause?: ((...args: any[]) => any) | undefined;
    onPlay?: ((...args: any[]) => any) | undefined;
}>, {
    src: string;
    width: string | number;
    height: string | number;
    autoplay: boolean;
    fit: "none" | "fill" | "contain" | "cover";
    loop: boolean;
    poster: string;
    second: number;
    controls: boolean;
    muted: boolean;
    preload: "auto" | "metadata" | "none";
    showPlay: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
