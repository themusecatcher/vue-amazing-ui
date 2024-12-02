export interface Tag {
    label?: string;
    closable?: boolean;
    color?: string;
    icon?: string;
    size?: 'small' | 'middle' | 'large';
    bordered?: boolean;
}
export interface Props {
    closable?: boolean;
    color?: string;
    icon?: string;
    size?: 'small' | 'middle' | 'large';
    bordered?: boolean;
    dynamic?: boolean;
    spaceProps?: object;
    value?: string[] | Tag[];
}
declare function __VLS_template(): {
    slots: {
        icon?(_: {}): any;
        icon?(_: {
            index: number;
        }): any;
        default?(_: {}): any;
        default?(_: {
            label: any;
            index: number;
        }): any;
    };
    refs: {
        tagsIconRef: HTMLSpanElement;
        inputRef: HTMLInputElement;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    close: (...args: any[]) => void;
    "update:value": (...args: any[]) => void;
    dynamicClose: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onClose?: ((...args: any[]) => any) | undefined;
    "onUpdate:value"?: ((...args: any[]) => any) | undefined;
    onDynamicClose?: ((...args: any[]) => any) | undefined;
}>, {
    size: "small" | "middle" | "large";
    bordered: boolean;
    closable: boolean;
    icon: string;
    color: string;
    value: string[] | Tag[];
    dynamic: boolean;
    spaceProps: object;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
