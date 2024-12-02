import { CSSProperties } from 'vue';
export interface Props {
    contentClass?: string;
    contentStyle?: CSSProperties;
    size?: number;
    trigger?: 'hover' | 'none';
    autoHide?: boolean;
    delay?: number;
    xScrollable?: boolean;
    yScrollable?: boolean;
    xPlacement?: 'top' | 'bottom';
    yPlacement?: 'left' | 'right';
}
declare function scrollTo(...args: any[]): void;
declare function scrollBy(...args: any[]): void;
declare function getScrollData(): {
    scrollWidth: number;
    scrollHeight: number;
    clientWidth: number;
    clientHeight: number;
};
declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
    };
    refs: {
        containerRef: HTMLDivElement;
        contentRef: HTMLDivElement;
        railVerticalRef: HTMLDivElement;
        railHorizontalRef: HTMLDivElement;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {
    scrollTo: typeof scrollTo;
    scrollBy: typeof scrollBy;
    getScrollData: typeof getScrollData;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    scroll: (...args: any[]) => void;
    scrollend: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onScroll?: ((...args: any[]) => any) | undefined;
    onScrollend?: ((...args: any[]) => any) | undefined;
}>, {
    size: number;
    contentClass: string;
    contentStyle: CSSProperties;
    trigger: "hover" | "none";
    delay: number;
    autoHide: boolean;
    xScrollable: boolean;
    yScrollable: boolean;
    xPlacement: "top" | "bottom";
    yPlacement: "left" | "right";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
