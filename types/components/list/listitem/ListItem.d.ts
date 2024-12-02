import { CSSProperties, Slot } from 'vue';
export interface Props {
    avatar?: string;
    avatarProps?: object;
    title?: string;
    description?: string;
    actions?: Slot;
    extra?: string;
    avatarStyle?: CSSProperties;
    titleStyle?: CSSProperties;
    descriptionStyle?: CSSProperties;
    contentStyle?: CSSProperties;
    actionsStyle?: CSSProperties;
    extraStyle?: CSSProperties;
}
declare function __VLS_template(): {
    slots: {
        avatar?(_: {}): any;
        title?(_: {}): any;
        description?(_: {}): any;
        default?(_: {}): any;
        actions?(_: {}): any;
        extra?(_: {}): any;
    };
    refs: {};
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    title: string;
    description: string;
    actions: Slot;
    avatarStyle: CSSProperties;
    contentStyle: CSSProperties;
    avatar: string;
    extra: string;
    descriptionStyle: CSSProperties;
    titleStyle: CSSProperties;
    avatarProps: object;
    actionsStyle: CSSProperties;
    extraStyle: CSSProperties;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
