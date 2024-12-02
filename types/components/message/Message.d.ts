import { CSSProperties, VNode } from 'vue';
export interface Props {
    content?: string;
    duration?: number;
    top?: string | number;
}
export interface Message {
    content?: string;
    icon?: VNode;
    duration?: number | null;
    top?: string | number;
    class?: string;
    style?: CSSProperties;
    onClick?: Function;
    onClose?: Function;
    [propName: string]: any;
}
declare function open(message: string | Message): void;
declare function info(message: string | Message): void;
declare function success(message: string | Message): void;
declare function error(message: string | Message): void;
declare function warning(message: string | Message): void;
declare function loading(message: string | Message): void;
declare const _default: import('vue').DefineComponent<Props, {
    open: typeof open;
    info: typeof info;
    success: typeof success;
    error: typeof error;
    warning: typeof warning;
    loading: typeof loading;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    click: (...args: any[]) => void;
    close: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onClick?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
}>, {
    duration: number;
    top: string | number;
    content: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
