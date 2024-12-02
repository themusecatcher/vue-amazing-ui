export interface Props {
    orientation?: 'left' | 'center' | 'right';
    orientationMargin?: string | number;
    borderWidth?: number;
    borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
    borderColor?: string;
    vertical?: boolean;
    height?: string | number;
}
declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    height: string | number;
    vertical: boolean;
    borderColor: string;
    borderStyle: "solid" | "dashed" | "dotted" | "double" | "groove" | "ridge" | "inset" | "outset";
    borderWidth: number;
    orientation: "left" | "center" | "right";
    orientationMargin: string | number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
