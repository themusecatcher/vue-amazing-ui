import { CSSProperties } from 'vue';
export interface Props {
    checked?: string;
    checkedValue?: boolean | string | number;
    unchecked?: string;
    uncheckedValue?: boolean | string | number;
    loading?: boolean;
    disabled?: boolean;
    size?: 'small' | 'middle' | 'large';
    rippleColor?: string;
    circleStyle?: CSSProperties;
    modelValue?: boolean | string | number;
}
declare function __VLS_template(): {
    slots: {
        checked?(_: {}): any;
        unchecked?(_: {}): any;
        node?(_: {
            checked: string | number | boolean;
        }): any;
    };
    refs: {};
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    size: "small" | "middle" | "large";
    disabled: boolean;
    rippleColor: string;
    loading: boolean;
    modelValue: boolean | string | number;
    checked: string;
    checkedValue: boolean | string | number;
    unchecked: string;
    uncheckedValue: boolean | string | number;
    circleStyle: CSSProperties;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
