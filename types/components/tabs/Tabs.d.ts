import { CSSProperties, VNode } from 'vue';
export interface Tab {
    key?: string | number;
    tab?: string;
    icon?: VNode;
    content?: string;
    disabled?: boolean;
}
export interface Props {
    tabPages?: Tab[];
    prefix?: string;
    suffix?: string;
    animated?: boolean;
    centered?: boolean;
    size?: 'small' | 'middle' | 'large';
    type?: 'line' | 'card';
    tabGutter?: number;
    tabStyle?: CSSProperties;
    tabPosition?: 'top' | 'right' | 'bottom' | 'left';
    contentStyle?: CSSProperties;
    activeKey?: string | number;
}
declare function __VLS_template(): {
    slots: {
        prefix?(_: {}): any;
        tab?(_: {
            key: string | number;
            tab: string | undefined;
        }): any;
        suffix?(_: {}): any;
        content?(_: {
            key: string | number;
            content: string | undefined;
        }): any;
    };
    refs: {
        wrapRef: HTMLDivElement;
        navRef: HTMLDivElement;
        tabsRef: HTMLDivElement;
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
    size: "small" | "middle" | "large";
    type: "line" | "card";
    contentStyle: CSSProperties;
    animated: boolean;
    activeKey: string | number;
    prefix: string;
    suffix: string;
    centered: boolean;
    tabPages: Tab[];
    tabGutter: number;
    tabStyle: CSSProperties;
    tabPosition: "top" | "right" | "bottom" | "left";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
