import { CSSProperties } from 'vue';
export interface Props {
    maxWidth?: string | number;
    content?: string;
    contentClass?: string;
    contentStyle?: CSSProperties;
    tooltip?: string;
    tooltipClass?: string;
    tooltipStyle?: CSSProperties;
    bgColor?: string;
    arrow?: boolean;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    flip?: boolean;
    trigger?: 'hover' | 'click';
    keyboard?: boolean;
    transitionDuration?: number;
    showDelay?: number;
    hideDelay?: number;
    show?: boolean;
    showControl?: boolean;
}
declare function observeScroll(): void;
declare function onShow(): void;
declare function onHide(): void;
declare function __VLS_template(): {
    slots: {
        tooltip?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {
        tooltipRef: HTMLDivElement;
        tooltipCardRef: HTMLDivElement;
        contentRef: HTMLSpanElement;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {
    show: typeof onShow;
    hide: typeof onHide;
    observeScroll: typeof observeScroll;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:show": (...args: any[]) => void;
    openChange: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    "onUpdate:show"?: ((...args: any[]) => any) | undefined;
    onOpenChange?: ((...args: any[]) => any) | undefined;
}>, {
    maxWidth: string | number;
    content: string;
    contentClass: string;
    contentStyle: CSSProperties;
    tooltip: string;
    tooltipClass: string;
    tooltipStyle: CSSProperties;
    bgColor: string;
    arrow: boolean;
    placement: "top" | "bottom" | "left" | "right";
    flip: boolean;
    trigger: "hover" | "click";
    keyboard: boolean;
    transitionDuration: number;
    showDelay: number;
    hideDelay: number;
    show: boolean;
    showControl: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
