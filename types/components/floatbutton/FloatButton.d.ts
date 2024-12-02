export interface Props {
    top?: number | string;
    bottom?: number | string;
    left?: number | string;
    right?: number | string;
    zIndex?: number;
    width?: number | string;
    height?: number | string;
    type?: 'default' | 'primary';
    shape?: 'circle' | 'square';
    icon?: string;
    description?: string;
    href?: string;
    target?: '_self' | '_blank';
    menuTrigger?: 'click' | 'hover';
    tooltip?: string;
    tooltipProps?: object;
    badgeProps?: object;
}
declare function __VLS_template(): {
    slots: {
        tooltip?(_: {}): any;
        icon?(_: {}): any;
        description?(_: {}): any;
        menu?(_: {}): any;
    };
    refs: {};
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    click: (...args: any[]) => void;
    openChange: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onClick?: ((...args: any[]) => any) | undefined;
    onOpenChange?: ((...args: any[]) => any) | undefined;
}>, {
    description: string;
    type: "default" | "primary";
    icon: string;
    width: number | string;
    height: number | string;
    target: "_self" | "_blank";
    shape: "circle" | "square";
    href: string;
    top: number | string;
    bottom: number | string;
    left: number | string;
    right: number | string;
    tooltip: string;
    tooltipProps: object;
    zIndex: number;
    menuTrigger: "click" | "hover";
    badgeProps: object;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
