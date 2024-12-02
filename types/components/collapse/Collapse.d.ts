import { CSSProperties, VNode, Slot } from 'vue';
export interface Item {
    key?: string | number;
    disabled?: boolean;
    header?: string;
    headerStyle?: CSSProperties;
    content?: string;
    contentStyle?: CSSProperties;
    collapseStyle?: CSSProperties;
    arrow?: VNode;
    showArrow?: boolean;
    arrowPlacement?: 'left' | 'right';
    arrowStyle?: CSSProperties;
    extra?: string;
    lang?: string;
    copyable?: boolean;
    copyProps?: object;
    copyText?: string;
    copiedText?: string;
    [propName: string]: any;
}
export interface Props {
    items?: Item[];
    activeKey?: string[] | string | number[] | number | null;
    bordered?: boolean;
    disabled?: boolean;
    ghost?: boolean;
    headerStyle?: CSSProperties;
    contentStyle?: CSSProperties;
    collapseStyle?: CSSProperties;
    arrow?: VNode | Slot;
    showArrow?: boolean;
    arrowPlacement?: 'left' | 'right';
    arrowStyle?: CSSProperties;
    extra?: string;
    lang?: string;
    copyable?: boolean;
    copyProps?: object;
    copyText?: string;
    copiedText?: string;
}
declare function __VLS_template(): {
    slots: {
        arrow?(_: {
            item: Item;
            key: string | number;
            active: boolean;
        }): any;
        header?(_: {
            item: Item;
            header: string | undefined;
            key: string | number;
            active: boolean;
        }): any;
        extra?(_: {
            item: Item;
            extra: string | number | boolean | object | string[] | number[] | VNode<import('vue').RendererNode, import('vue').RendererElement, {
                [key: string]: any;
            }> | Slot | CSSProperties | Item[] | null | undefined;
            key: string | number;
            active: boolean;
        }): any;
        lang?(_: {
            item: Item;
            lang: string | number | boolean | object | string[] | number[] | VNode<import('vue').RendererNode, import('vue').RendererElement, {
                [key: string]: any;
            }> | Slot | CSSProperties | Item[] | null | undefined;
            key: string | number;
            active: boolean;
        }): any;
        content?(_: {
            item: Item;
            content: string | undefined;
            key: string | number;
            active: boolean;
        }): any;
    };
    refs: {
        contentRef: HTMLDivElement;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    "update:activeKey": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:activeKey"?: ((...args: any[]) => any) | undefined;
}>, {
    bordered: boolean;
    contentStyle: CSSProperties;
    arrow: VNode | Slot;
    disabled: boolean;
    ghost: boolean;
    extra: string;
    showArrow: boolean;
    headerStyle: CSSProperties;
    collapseStyle: CSSProperties;
    arrowPlacement: "left" | "right";
    arrowStyle: CSSProperties;
    lang: string;
    copyable: boolean;
    copyProps: object;
    copyText: string;
    copiedText: string;
    items: Item[];
    activeKey: string[] | string | number[] | number | null;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
