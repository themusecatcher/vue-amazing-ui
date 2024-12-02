import { Ref } from 'vue';
export declare function dateFormat(value?: number | string | Date, format?: string): string;
export declare function formatNumber(value: number | string, precision?: number, separator?: string, decimal?: string, prefix?: string, suffix?: string): string;
export declare function rafTimeout(fn: Function, delay?: number, interval?: boolean): object;
export declare function cancelRaf(raf: {
    id: number;
}): void;
export declare function throttle(fn: Function, delay?: number): any;
export declare function debounce(fn: Function, delay?: number): any;
export declare function add(num1: number, num2: number): number;
export declare function downloadFile(url: string, fileName?: string): void;
export declare function toggleDark(): void;
export declare function useMounted(): Ref<boolean, boolean>;
export declare function useSupported(callback: () => unknown): import('vue').ComputedRef<boolean>;
export declare function useEventListener(target: HTMLElement | Window | Document, event: string, callback: Function): void;
export declare function useMutationObserver(target: Ref | Ref[] | HTMLElement | HTMLElement[], callback: MutationCallback, options?: {}): {
    stop: () => void;
    start: () => void;
};
export declare function useScroll(target?: Ref | HTMLElement | Window | Document, throttleDelay?: number, onScroll?: (e: Event) => void, onStop?: (e: Event) => void): {
    x: Ref<number, number>;
    xScrollMax: Ref<number, number>;
    y: Ref<number, number>;
    yScrollMax: Ref<number, number>;
    isScrolling: Ref<boolean, boolean>;
    left: Ref<boolean, boolean>;
    right: Ref<boolean, boolean>;
    top: Ref<boolean, boolean>;
    bottom: Ref<boolean, boolean>;
};
export declare function useFps(): {
    fps: Ref<number, number>;
};
export declare function useMediaQuery(mediaQuery: string): {
    match: Ref<boolean, boolean>;
};
export declare function useResizeObserver(target: Ref | Ref[] | HTMLElement | HTMLElement[], callback: ResizeObserverCallback, options?: object): {
    stop: () => void;
    start: () => void;
};
export declare function useSlotsExist(slotsName?: string | string[]): any;
