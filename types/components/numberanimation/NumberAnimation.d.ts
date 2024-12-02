import { CSSProperties } from 'vue';
declare enum TransitionFunc {
    linear = "linear",
    easeOutSine = "easeOutSine",
    easeInOutSine = "easeInOutSine",
    easeInQuad = "easeInQuad",
    easeOutQuad = "easeOutQuad",
    easeInOutQuad = "easeInOutQuad",
    easeInCubic = "easeInCubic",
    easeOutCubic = "easeOutCubic",
    easeInOutCubic = "easeInOutCubic",
    easeInQuart = "easeInQuart",
    easeOutQuart = "easeOutQuart",
    easeInOutQuart = "easeInOutQuart",
    easeInQuint = "easeInQuint",
    easeOutQuint = "easeOutQuint",
    easeInOutQuint = "easeInOutQuint",
    easeInExpo = "easeInExpo",
    easeOutExpo = "easeOutExpo",
    easeInOutExpo = "easeInOutExpo",
    easeInCirc = "easeInCirc",
    easeOutCirc = "easeOutCirc",
    easeInOutCirc = "easeInOutCirc",
    easeInBack = "easeInBack",
    easeOutBack = "easeOutBack",
    easeInOutBack = "easeInOutBack"
}
export interface Props {
    from?: number;
    to?: number;
    duration?: number;
    autoplay?: boolean;
    precision?: number;
    prefix?: string;
    suffix?: string;
    separator?: string;
    decimal?: string;
    valueStyle?: CSSProperties;
    transition?: TransitionFunc;
}
declare function play(): void;
declare const _default: import('vue').DefineComponent<Props, {
    play: typeof play;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    started: (...args: any[]) => void;
    finished: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onStarted?: ((...args: any[]) => any) | undefined;
    onFinished?: ((...args: any[]) => any) | undefined;
}>, {
    duration: number;
    transition: TransitionFunc;
    to: number;
    valueStyle: CSSProperties;
    separator: string;
    autoplay: boolean;
    prefix: string;
    suffix: string;
    precision: number;
    from: number;
    decimal: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
