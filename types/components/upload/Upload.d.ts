export interface FileType {
    name?: string;
    url: any;
    [propName: string]: any;
}
export interface MessageType {
    upload?: string;
    remove?: string;
}
export interface Props {
    accept?: string;
    multiple?: boolean;
    maxCount?: number;
    tip?: string;
    fit?: 'contain' | 'fill' | 'cover' | 'none' | 'scale-down';
    draggable?: boolean;
    disabled?: boolean;
    spaceProps?: object;
    spinProps?: object;
    imageProps?: object;
    messageProps?: object;
    actionMessage?: MessageType;
    beforeUpload?: Function;
    uploadMode?: 'base64' | 'custom';
    customRequest?: Function;
    fileList?: FileType[];
}
declare function onInfo(content: string): void;
declare function onSuccess(content: string): void;
declare function onError(content: string): void;
declare function onWarning(content: string): void;
declare function onLoading(content: string): void;
declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
    };
    refs: {
        uploadInputRef: HTMLInputElement;
        imageRef: ({
            $: import('vue').ComponentInternalInstance;
            $data: {};
            $props: {
                readonly src?: (string | import('../image').Image[]) | undefined;
                readonly name?: string | undefined;
                readonly width?: (string | number | (string | number)[]) | undefined;
                readonly height?: (string | number | (string | number)[]) | undefined;
                readonly bordered?: boolean | undefined;
                readonly fit?: ("contain" | "fill" | "cover" | "none" | "scale-down") | undefined;
                readonly preview?: string | undefined;
                readonly spaceProps?: object | undefined;
                readonly spinProps?: object | undefined;
                readonly zoomRatio?: number | undefined;
                readonly minZoomScale?: number | undefined;
                readonly maxZoomScale?: number | undefined;
                readonly resetOnDbclick?: boolean | undefined;
                readonly loop?: boolean | undefined;
                readonly album?: boolean | undefined;
            } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps;
            $attrs: {
                [x: string]: unknown;
            };
            $refs: {
                [x: string]: unknown;
            };
            $slots: Readonly<{
                [name: string]: import('vue').Slot<any> | undefined;
            }>;
            $root: import('vue').ComponentPublicInstance | null;
            $parent: import('vue').ComponentPublicInstance | null;
            $host: Element | null;
            $emit: (event: string, ...args: any[]) => void;
            $el: any;
            $options: import('vue').ComponentOptionsBase<Readonly<import('../image').Props> & Readonly<{}>, {
                preview: (index: number) => Promise<void>;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, {
                bordered: boolean;
                name: string;
                src: string | import('../image').Image[];
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
            }, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & {
                beforeCreate?: (() => void) | (() => void)[];
                created?: (() => void) | (() => void)[];
                beforeMount?: (() => void) | (() => void)[];
                mounted?: (() => void) | (() => void)[];
                beforeUpdate?: (() => void) | (() => void)[];
                updated?: (() => void) | (() => void)[];
                activated?: (() => void) | (() => void)[];
                deactivated?: (() => void) | (() => void)[];
                beforeDestroy?: (() => void) | (() => void)[];
                beforeUnmount?: (() => void) | (() => void)[];
                destroyed?: (() => void) | (() => void)[];
                unmounted?: (() => void) | (() => void)[];
                renderTracked?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
                renderTriggered?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
                errorCaptured?: ((err: unknown, instance: import('vue').ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import('vue').ComponentPublicInstance | null, info: string) => boolean | void)[];
            };
            $forceUpdate: () => void;
            $nextTick: typeof import('vue').nextTick;
            $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, import('@vue/reactivity').OnCleanup]) => any : (...args: [any, any, import('@vue/reactivity').OnCleanup]) => any, options?: import('vue').WatchOptions): import('vue').WatchStopHandle;
        } & Readonly<{
            bordered: boolean;
            name: string;
            src: string | import('../image').Image[];
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
        }> & Omit<Readonly<import('../image').Props> & Readonly<{}>, "bordered" | "name" | "src" | "width" | "height" | "spinProps" | "fit" | "preview" | "spaceProps" | "zoomRatio" | "minZoomScale" | "maxZoomScale" | "resetOnDbclick" | "loop" | "album"> & import('vue').ShallowUnwrapRef<{
            preview: (index: number) => Promise<void>;
        }> & {} & import('vue').ComponentCustomProperties & {} & {
            $slots: {
                preview?(_: {}): any;
            };
        }) | null;
        messageRef: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('../message').Props> & Readonly<{
            onClick?: ((...args: any[]) => any) | undefined;
            onClose?: ((...args: any[]) => any) | undefined;
        }>, {
            open: (message: string | import('../message').Message) => void;
            info: (message: string | import('../message').Message) => void;
            success: (message: string | import('../message').Message) => void;
            error: (message: string | import('../message').Message) => void;
            warning: (message: string | import('../message').Message) => void;
            loading: (message: string | import('../message').Message) => void;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
            click: (...args: any[]) => void;
            close: (...args: any[]) => void;
        }, import('vue').PublicProps, {
            duration: number;
            top: string | number;
            content: string;
        }, false, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import('../message').Props> & Readonly<{
            onClick?: ((...args: any[]) => any) | undefined;
            onClose?: ((...args: any[]) => any) | undefined;
        }>, {
            open: (message: string | import('../message').Message) => void;
            info: (message: string | import('../message').Message) => void;
            success: (message: string | import('../message').Message) => void;
            error: (message: string | import('../message').Message) => void;
            warning: (message: string | import('../message').Message) => void;
            loading: (message: string | import('../message').Message) => void;
        }, {}, {}, {}, {
            duration: number;
            top: string | number;
            content: string;
        }> | null;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {
    info: typeof onInfo;
    success: typeof onSuccess;
    error: typeof onError;
    warning: typeof onWarning;
    loading: typeof onLoading;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    drop: (...args: any[]) => void;
    preview: (...args: any[]) => void;
    "update:fileList": (...args: any[]) => void;
    remove: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    onDrop?: ((...args: any[]) => any) | undefined;
    onPreview?: ((...args: any[]) => any) | undefined;
    "onUpdate:fileList"?: ((...args: any[]) => any) | undefined;
    onRemove?: ((...args: any[]) => any) | undefined;
}>, {
    multiple: boolean;
    disabled: boolean;
    tip: string;
    spinProps: object;
    fit: "contain" | "fill" | "cover" | "none" | "scale-down";
    spaceProps: object;
    accept: string;
    maxCount: number;
    draggable: boolean;
    imageProps: object;
    messageProps: object;
    actionMessage: MessageType;
    beforeUpload: Function;
    uploadMode: "base64" | "custom";
    customRequest: Function;
    fileList: FileType[];
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
