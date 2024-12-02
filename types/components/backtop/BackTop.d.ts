import { VNode, Slot } from 'vue';
export interface Props {
    icon?: VNode | Slot;
    description?: string;
    tooltip?: string;
    tooltipProps?: object;
    type?: 'default' | 'primary';
    shape?: 'circle' | 'square';
    bottom?: number | string;
    right?: number | string;
    zIndex?: number;
    visibilityHeight?: number;
    to?: string | HTMLElement;
    listenTo?: string | HTMLElement;
}
declare function __VLS_template(): {
    slots: {
        tooltip?(_: {}): any;
        default?(_: {}): any;
        icon?(_: {}): any;
        description?(_: {}): any;
    };
    refs: {
        backtopRef: HTMLDivElement;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    click: (...args: any[]) => void;
    show: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onClick?: ((...args: any[]) => any) | undefined;
    onShow?: ((...args: any[]) => any) | undefined;
}>, {
    description: string;
    type: "default" | "primary";
    icon: VNode | Slot;
    shape: "circle" | "square";
    bottom: number | string;
    right: number | string;
    tooltip: string;
    tooltipProps: object;
    zIndex: number;
    visibilityHeight: number;
    to: string | HTMLElement;
    listenTo: string | HTMLElement;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
