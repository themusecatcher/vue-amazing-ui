export interface Props {
    allowClear?: boolean;
    allowHalf?: boolean;
    count?: number;
    character?: 'star-outlined' | 'star-filled' | 'heart-outlined' | 'heart-filled' | string;
    size?: number;
    color?: string;
    gap?: number;
    disabled?: boolean;
    tooltips?: string[];
    tooltipProps?: object;
    value?: number;
}
declare function __VLS_template(): {
    slots: {
        tooltip?(_: {
            value: number;
        }): any;
        character?(_: {}): any;
        character?(_: {}): any;
    };
    refs: {};
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    "update:value": (...args: any[]) => void;
    hoverChange: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:value"?: ((...args: any[]) => any) | undefined;
    onHoverChange?: ((...args: any[]) => any) | undefined;
}>, {
    size: number;
    color: string;
    tooltipProps: object;
    value: number;
    disabled: boolean;
    gap: number;
    allowClear: boolean;
    count: number;
    allowHalf: boolean;
    character: "star-outlined" | "star-filled" | "heart-outlined" | "heart-filled" | string;
    tooltips: string[];
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
