import { VNode, CSSProperties } from 'vue';
export interface Props {
    title?: string;
    description?: string;
    duration?: number | null;
    top?: number;
    bottom?: number;
    placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}
export interface Notification {
    title?: string;
    description?: string;
    icon?: VNode;
    class?: string;
    style?: CSSProperties;
    duration?: number | null;
    placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    onClose?: Function;
}
declare function open(notification: Notification): void;
declare function info(notification: Notification): void;
declare function success(notification: Notification): void;
declare function error(notification: Notification): void;
declare function warning(notification: Notification): void;
declare const _default: import('vue').DefineComponent<Props, {
    open: typeof open;
    info: typeof info;
    success: typeof success;
    error: typeof error;
    warning: typeof warning;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    close: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onClose?: ((...args: any[]) => any) | undefined;
}>, {
    title: string;
    description: string;
    duration: number | null;
    top: number;
    bottom: number;
    placement: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
