export interface Image {
    src: string;
    name?: string;
}
export interface Props {
    src?: string | Image[];
    name?: string;
    width?: string | number | (string | number)[];
    height?: string | number | (string | number)[];
    bordered?: boolean;
    fit?: 'contain' | 'fill' | 'cover' | 'none' | 'scale-down';
    preview?: string;
    spaceProps?: object;
    spinProps?: object;
    zoomRatio?: number;
    minZoomScale?: number;
    maxZoomScale?: number;
    resetOnDbclick?: boolean;
    loop?: boolean;
    album?: boolean;
}
declare function onPreview(index: number): Promise<void>;
declare function __VLS_template(): {
    slots: {
        preview?(_: {}): any;
    };
    refs: {
        previewRef: HTMLDivElement;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {
    preview: typeof onPreview;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    bordered: boolean;
    name: string;
    src: string | Image[];
    width: string | number | (string | number)[];
    height: string | number | (string | number)[];
    spinProps: object;
    fit: "contain" | "fill" | "cover" | "none" | "scale-down";
    preview: string;
    spaceProps: object;
    zoomRatio: number;
    minZoomScale: number;
    maxZoomScale: number;
    resetOnDbclick: boolean;
    loop: boolean;
    album: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
