export interface Props {
    maxWidth?: string | number;
    tooltipMaxWidth?: string | number;
    line?: number;
    expand?: boolean;
    tooltip?: boolean;
}
declare function __VLS_template(): {
    slots: {
        tooltip?(_: {}): any;
        default?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {
        tooltipRef: ({
            $: import('vue').ComponentInternalInstance;
            $data: {};
            $props: {
                readonly maxWidth?: (string | number) | undefined;
                readonly content?: string | undefined;
                readonly contentClass?: string | undefined;
                readonly contentStyle?: import('vue').CSSProperties | undefined;
                readonly tooltip?: string | undefined;
                readonly tooltipClass?: string | undefined;
                readonly tooltipStyle?: import('vue').CSSProperties | undefined;
                readonly bgColor?: string | undefined;
                readonly arrow?: boolean | undefined;
                readonly placement?: ("top" | "bottom" | "left" | "right") | undefined;
                readonly flip?: boolean | undefined;
                readonly trigger?: ("hover" | "click") | undefined;
                readonly keyboard?: boolean | undefined;
                readonly transitionDuration?: number | undefined;
                readonly showDelay?: number | undefined;
                readonly hideDelay?: number | undefined;
                readonly show?: boolean | undefined;
                readonly showControl?: boolean | undefined;
                readonly "onUpdate:show"?: ((...args: any[]) => any) | undefined;
                readonly onOpenChange?: ((...args: any[]) => any) | undefined;
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
            $emit: ((event: "update:show", ...args: any[]) => void) & ((event: "openChange", ...args: any[]) => void);
            $el: any;
            $options: import('vue').ComponentOptionsBase<Readonly<import('../tooltip').Props> & Readonly<{
                "onUpdate:show"?: ((...args: any[]) => any) | undefined;
                onOpenChange?: ((...args: any[]) => any) | undefined;
            }>, {
                show: () => void;
                hide: () => void;
                observeScroll: () => void;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
                "update:show": (...args: any[]) => void;
                openChange: (...args: any[]) => void;
            }, string, {
                maxWidth: string | number;
                content: string;
                contentClass: string;
                contentStyle: import('vue').CSSProperties;
                tooltip: string;
                tooltipClass: string;
                tooltipStyle: import('vue').CSSProperties;
                bgColor: string;
                arrow: boolean;
                placement: "top" | "bottom" | "left" | "right";
                flip: boolean;
                trigger: "hover" | "click";
                keyboard: boolean;
                transitionDuration: number;
                showDelay: number;
                hideDelay: number;
                show: boolean;
                showControl: boolean;
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
            maxWidth: string | number;
            content: string;
            contentClass: string;
            contentStyle: import('vue').CSSProperties;
            tooltip: string;
            tooltipClass: string;
            tooltipStyle: import('vue').CSSProperties;
            bgColor: string;
            arrow: boolean;
            placement: "top" | "bottom" | "left" | "right";
            flip: boolean;
            trigger: "hover" | "click";
            keyboard: boolean;
            transitionDuration: number;
            showDelay: number;
            hideDelay: number;
            show: boolean;
            showControl: boolean;
        }> & Omit<Readonly<import('../tooltip').Props> & Readonly<{
            "onUpdate:show"?: ((...args: any[]) => any) | undefined;
            onOpenChange?: ((...args: any[]) => any) | undefined;
        }>, "hide" | "observeScroll" | ("maxWidth" | "content" | "contentClass" | "contentStyle" | "tooltip" | "tooltipClass" | "tooltipStyle" | "bgColor" | "arrow" | "placement" | "flip" | "trigger" | "keyboard" | "transitionDuration" | "showDelay" | "hideDelay" | "show" | "showControl")> & import('vue').ShallowUnwrapRef<{
            show: () => void;
            hide: () => void;
            observeScroll: () => void;
        }> & {} & import('vue').ComponentCustomProperties & {} & {
            $slots: {
                tooltip?(_: {}): any;
                default?(_: {}): any;
            };
        }) | null;
        ellipsisRef: HTMLDivElement;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {
    observeScroll: import('vue').Ref<any, any>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    expandChange: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onExpandChange?: ((...args: any[]) => any) | undefined;
}>, {
    line: number;
    maxWidth: string | number;
    tooltip: boolean;
    tooltipMaxWidth: string | number;
    expand: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
