export interface Item {
    desc: string;
    color?: 'blue' | 'green' | 'red' | 'gray' | string;
}
export interface Props {
    items?: Item[];
    width?: number | string;
    lineStyle?: 'solid' | 'dashed' | 'dotted';
    mode?: 'left' | 'center' | 'right';
    position?: 'left' | 'right';
}
declare function __VLS_template(): {
    slots: {
        dot?(_: {
            index: number;
        }): any;
        desc?(_: {
            index: number;
        }): any;
    };
    refs: {
        desc: HTMLDivElement;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    mode: "left" | "center" | "right";
    width: number | string;
    position: "left" | "right";
    items: Item[];
    lineStyle: "solid" | "dashed" | "dotted";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
