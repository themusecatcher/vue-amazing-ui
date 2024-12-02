import { CSSProperties } from 'vue';
export interface Props {
    containerClass?: string;
    containerStyle?: CSSProperties;
    loadingBarSize?: number;
    colorLoading?: string;
    colorFinish?: string;
    colorError?: string;
    to?: string | HTMLElement;
}
declare function start(from?: number, to?: number, status?: 'starting' | 'error'): Promise<void>;
declare function finish(): Promise<void>;
declare function error(): void;
declare const _default: import('vue').DefineComponent<Props, {
    start: typeof start;
    finish: typeof finish;
    error: typeof error;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    to: string | HTMLElement;
    containerClass: string;
    containerStyle: CSSProperties;
    loadingBarSize: number;
    colorLoading: string;
    colorFinish: string;
    colorError: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
