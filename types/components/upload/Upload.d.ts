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
        imageRef: any;
        messageRef: any;
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
