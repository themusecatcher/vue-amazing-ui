export interface Font {
    color?: string;
    fontSize?: number;
    fontWeight?: 'normal' | 'light' | 'weight' | number;
    fontFamily?: string;
    fontStyle?: 'none' | 'normal' | 'italic' | 'oblique';
}
export interface Props {
    width?: number;
    height?: number;
    layout?: 'parallel' | 'alternate';
    rotate?: number;
    zIndex?: number;
    image?: string;
    content?: string | string[];
    fullscreen?: boolean;
    textStyle?: Font;
    gap?: [number, number];
    offset?: [number, number];
}
declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
    };
    refs: {
        containerRef: HTMLDivElement;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    image: string;
    width: number;
    height: number;
    content: string | string[];
    zIndex: number;
    offset: [number, number];
    layout: "parallel" | "alternate";
    rotate: number;
    gap: [number, number];
    fullscreen: boolean;
    textStyle: Font;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
