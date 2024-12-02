export interface SkeletonButtonProps {
    shape?: 'default' | 'round' | 'circle';
    size?: 'small' | 'middle' | 'large';
    block?: boolean;
}
export interface SkeletonAvatarProps {
    shape?: 'circle' | 'square';
    size?: number | 'small' | 'middle' | 'large';
}
export interface SkeletonInputProps {
    size: 'small' | 'middle' | 'large';
}
export interface SkeletonTitleProps {
    width?: number | string;
}
export interface SkeletonParagraphProps {
    rows?: number | string;
    width?: number | string | Array<number | string>;
}
export interface Props {
    animated?: boolean;
    button?: boolean | SkeletonButtonProps;
    avatar?: boolean | SkeletonAvatarProps;
    input?: boolean | SkeletonInputProps;
    image?: boolean;
    title?: boolean | SkeletonTitleProps;
    paragraph?: boolean | SkeletonParagraphProps;
    loading?: boolean;
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
    button: boolean | SkeletonButtonProps;
    input: boolean | SkeletonInputProps;
    title: boolean | SkeletonTitleProps;
    image: boolean;
    loading: boolean;
    animated: boolean;
    avatar: boolean | SkeletonAvatarProps;
    paragraph: boolean | SkeletonParagraphProps;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
