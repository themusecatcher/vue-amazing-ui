export interface Props {
    spinning?: boolean;
    size?: 'small' | 'middle' | 'large';
    tip?: string;
    indicator?: 'dot' | 'spin-dot' | 'spin-line' | 'ring-circle' | 'ring-rail' | 'dynamic-circle' | 'magic-ring';
    color?: string;
    spinCircleWidth?: number;
    spinCirclePercent?: number;
    ringRailColor?: string;
    magicRingColor?: string;
    rotate?: boolean;
    speed?: number;
}
declare function __VLS_template(): {
    slots: {
        tip?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {};
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    size: "small" | "middle" | "large";
    color: string;
    spinning: boolean;
    tip: string;
    indicator: "dot" | "spin-dot" | "spin-line" | "ring-circle" | "ring-rail" | "dynamic-circle" | "magic-ring";
    spinCircleWidth: number;
    spinCirclePercent: number;
    ringRailColor: string;
    magicRingColor: string;
    rotate: boolean;
    speed: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
