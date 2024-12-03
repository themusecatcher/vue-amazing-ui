export interface Props {
    maxWidth?: string | number;
    tooltipMaxWidth?: string | number;
    line?: number;
    expand?: boolean;
    tooltip?: boolean;
}
declare function __VLS_template(): {
    slots: {
        tooltip?(_: {}): any;
        default?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {
        tooltipRef: any;
        ellipsisRef: HTMLDivElement;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {
    observeScroll: import('vue').Ref<any, any>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    expandChange: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onExpandChange?: ((...args: any[]) => any) | undefined;
}>, {
    line: number;
    maxWidth: string | number;
    tooltip: boolean;
    tooltipMaxWidth: string | number;
    expand: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
