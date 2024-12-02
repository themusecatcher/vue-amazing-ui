import { nextTick, CSSProperties, Slot } from 'vue';
export interface Column {
    title?: string;
    align?: 'left' | 'center' | 'right';
    width?: string | number;
    className?: string;
    colSpan?: number;
    dataIndex: string;
    key?: string;
    ellipsis?: boolean;
    ellipsisProps?: object;
    fixed?: 'left' | 'right';
    slot?: string;
    children?: Column[];
    showSorterTooltip?: boolean;
    sortTooltipProps?: object;
    defaultSortOrder?: 'ascend' | 'descend';
    sortDirections?: ('ascend' | 'descend')[];
    sorter?: Function;
    customCell?: (record: any, rowIndex: number, column: Column) => object;
    [propName: string]: any;
}
interface ScrollOption {
    x?: string | number | true;
    y?: string | number;
}
export interface Props {
    header?: string;
    footer?: string;
    columns?: Column[];
    dataSource?: any[];
    bordered?: boolean;
    rowClassName?: string | ((record: any, rowIndex: number) => string);
    size?: 'large' | 'middle' | 'small';
    striped?: boolean;
    loading?: boolean;
    spinProps?: object;
    emptyProps?: object;
    ellipsisProps?: object;
    showSorterTooltip?: boolean;
    sortDirections?: ('ascend' | 'descend')[];
    sortTooltipProps?: object;
    showPagination?: boolean;
    pagination?: object;
    scroll?: ScrollOption;
    scrollbarProps?: object;
    tableLayout?: 'auto' | 'fixed';
    showExpandColumn?: boolean;
    expandColumnTitle?: string;
    expandColumnWidth?: string | number;
    expandCell?: Slot;
    expandedRowRender?: Slot;
    expandFixed?: boolean;
    expandedRowKeys?: (string | number)[];
    expandRowByClick?: boolean;
}
declare function __VLS_template(): {
    slots: {
        header?(_: {}): any;
        expandColumnTitle?(_: {}): any;
        expandColumnTitle?(_: {}): any;
        headerCell?(_: {
            column: Column;
            title: string | undefined;
        }): any;
        headerCell?(_: {
            column: Column;
            title: string | undefined;
        }): any;
        headerCell?(_: {
            column: Column;
            title: string | undefined;
        }): any;
        headerCell?(_: {
            column: Column;
            title: string | undefined;
        }): any;
        headerCell?(_: {
            column: Column;
            title: string | undefined;
        }): any;
        headerCell?(_: {
            column: Column;
            title: string | undefined;
        }): any;
        headerCell?(_: {
            column: Column;
            title: string | undefined;
        }): any;
        headerCell?(_: {
            column: Column;
            title: string | undefined;
        }): any;
        expandCell?(_: {
            record: any;
            index: number;
            expanded: boolean;
        }): any;
        expandCell?(_: {
            record: any;
            index: number;
            expanded: boolean;
        }): any;
        bodyCell?(_: {
            column: {
                [x: string]: any;
                title?: string | undefined;
                align?: ("left" | "center" | "right") | undefined;
                width?: (string | number) | undefined;
                className?: string | undefined;
                colSpan?: number | undefined;
                dataIndex: string;
                key?: string | undefined;
                ellipsis?: boolean | undefined;
                ellipsisProps?: object | undefined;
                fixed?: ("left" | "right") | undefined;
                slot?: string | undefined;
                children?: any[] | undefined;
                showSorterTooltip?: boolean | undefined;
                sortTooltipProps?: object | undefined;
                defaultSortOrder?: ("ascend" | "descend") | undefined;
                sortDirections?: ("ascend" | "descend")[] | undefined;
                sorter?: Function | undefined;
                customCell?: ((record: any, rowIndex: number, column: Column) => object) | undefined;
            };
            record: any;
            text: any;
            index: number;
        }): any;
        bodyCell?(_: {
            column: {
                [x: string]: any;
                title?: string | undefined;
                align?: ("left" | "center" | "right") | undefined;
                width?: (string | number) | undefined;
                className?: string | undefined;
                colSpan?: number | undefined;
                dataIndex: string;
                key?: string | undefined;
                ellipsis?: boolean | undefined;
                ellipsisProps?: object | undefined;
                fixed?: ("left" | "right") | undefined;
                slot?: string | undefined;
                children?: any[] | undefined;
                showSorterTooltip?: boolean | undefined;
                sortTooltipProps?: object | undefined;
                defaultSortOrder?: ("ascend" | "descend") | undefined;
                sortDirections?: ("ascend" | "descend")[] | undefined;
                sorter?: Function | undefined;
                customCell?: ((record: any, rowIndex: number, column: Column) => object) | undefined;
            };
            record: any;
            text: any;
            index: number;
        }): any;
        bodyCell?(_: {
            column: {
                [x: string]: any;
                title?: string | undefined;
                align?: ("left" | "center" | "right") | undefined;
                width?: (string | number) | undefined;
                className?: string | undefined;
                colSpan?: number | undefined;
                dataIndex: string;
                key?: string | undefined;
                ellipsis?: boolean | undefined;
                ellipsisProps?: object | undefined;
                fixed?: ("left" | "right") | undefined;
                slot?: string | undefined;
                children?: any[] | undefined;
                showSorterTooltip?: boolean | undefined;
                sortTooltipProps?: object | undefined;
                defaultSortOrder?: ("ascend" | "descend") | undefined;
                sortDirections?: ("ascend" | "descend")[] | undefined;
                sorter?: Function | undefined;
                customCell?: ((record: any, rowIndex: number, column: Column) => object) | undefined;
            };
            record: any;
            text: any;
            index: number;
        }): any;
        bodyCell?(_: {
            column: {
                [x: string]: any;
                title?: string | undefined;
                align?: ("left" | "center" | "right") | undefined;
                width?: (string | number) | undefined;
                className?: string | undefined;
                colSpan?: number | undefined;
                dataIndex: string;
                key?: string | undefined;
                ellipsis?: boolean | undefined;
                ellipsisProps?: object | undefined;
                fixed?: ("left" | "right") | undefined;
                slot?: string | undefined;
                children?: any[] | undefined;
                showSorterTooltip?: boolean | undefined;
                sortTooltipProps?: object | undefined;
                defaultSortOrder?: ("ascend" | "descend") | undefined;
                sortDirections?: ("ascend" | "descend")[] | undefined;
                sorter?: Function | undefined;
                customCell?: ((record: any, rowIndex: number, column: Column) => object) | undefined;
            };
            record: any;
            text: any;
            index: number;
        }): any;
        expandedRowRender?(_: {
            record: any;
            index: number;
            expanded: boolean;
        }): any;
        expandedRowRender?(_: {
            record: any;
            index: number;
            expanded: boolean;
        }): any;
        expandedRowRender?(_: {
            record: any;
            index: number;
            expanded: boolean;
        }): any;
        expandedRowRender?(_: {
            record: any;
            index: number;
            expanded: boolean;
        }): any;
        footer?(_: {}): any;
    };
    refs: {
        tableRef: HTMLDivElement;
        scrollbarRef: ({
            $: import('vue').ComponentInternalInstance;
            $data: {};
            $props: {
                readonly contentClass?: string | undefined;
                readonly contentStyle?: CSSProperties | undefined;
                readonly size?: number | undefined;
                readonly trigger?: ("hover" | "none") | undefined;
                readonly autoHide?: boolean | undefined;
                readonly delay?: number | undefined;
                readonly xScrollable?: boolean | undefined;
                readonly yScrollable?: boolean | undefined;
                readonly xPlacement?: ("top" | "bottom") | undefined;
                readonly yPlacement?: ("left" | "right") | undefined;
                readonly onScroll?: ((...args: any[]) => any) | undefined;
                readonly onScrollend?: ((...args: any[]) => any) | undefined;
            } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps;
            $attrs: {
                [x: string]: unknown;
            };
            $refs: {
                [x: string]: unknown;
            };
            $slots: Readonly<{
                [name: string]: Slot<any> | undefined;
            }>;
            $root: import('vue').ComponentPublicInstance | null;
            $parent: import('vue').ComponentPublicInstance | null;
            $host: Element | null;
            $emit: ((event: "scroll", ...args: any[]) => void) & ((event: "scrollend", ...args: any[]) => void);
            $el: any;
            $options: import('vue').ComponentOptionsBase<Readonly<import('../scrollbar').Props> & Readonly<{
                onScroll?: ((...args: any[]) => any) | undefined;
                onScrollend?: ((...args: any[]) => any) | undefined;
            }>, {
                scrollTo: (...args: any[]) => void;
                scrollBy: (...args: any[]) => void;
                getScrollData: () => {
                    scrollWidth: number;
                    scrollHeight: number;
                    clientWidth: number;
                    clientHeight: number;
                };
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
                scroll: (...args: any[]) => void;
                scrollend: (...args: any[]) => void;
            }, string, {
                size: number;
                contentClass: string;
                contentStyle: CSSProperties;
                trigger: "hover" | "none";
                delay: number;
                autoHide: boolean;
                xScrollable: boolean;
                yScrollable: boolean;
                xPlacement: "top" | "bottom";
                yPlacement: "left" | "right";
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
            $nextTick: typeof nextTick;
            $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, import('@vue/reactivity').OnCleanup]) => any : (...args: [any, any, import('@vue/reactivity').OnCleanup]) => any, options?: import('vue').WatchOptions): import('vue').WatchStopHandle;
        } & Readonly<{
            size: number;
            contentClass: string;
            contentStyle: CSSProperties;
            trigger: "hover" | "none";
            delay: number;
            autoHide: boolean;
            xScrollable: boolean;
            yScrollable: boolean;
            xPlacement: "top" | "bottom";
            yPlacement: "left" | "right";
        }> & Omit<Readonly<import('../scrollbar').Props> & Readonly<{
            onScroll?: ((...args: any[]) => any) | undefined;
            onScrollend?: ((...args: any[]) => any) | undefined;
        }>, "scrollTo" | "scrollBy" | "getScrollData" | ("size" | "contentClass" | "contentStyle" | "trigger" | "delay" | "autoHide" | "xScrollable" | "yScrollable" | "xPlacement" | "yPlacement")> & import('vue').ShallowUnwrapRef<{
            scrollTo: (...args: any[]) => void;
            scrollBy: (...args: any[]) => void;
            getScrollData: () => {
                scrollWidth: number;
                scrollHeight: number;
                clientWidth: number;
                clientHeight: number;
            };
        }> & {} & import('vue').ComponentCustomProperties & {} & {
            $slots: {
                default?(_: {}): any;
            };
        }) | null;
        colExpandRef: HTMLTableColElement;
        colRef: HTMLTableColElement;
        tooltipRef: ({
            $: import('vue').ComponentInternalInstance;
            $data: {};
            $props: {
                readonly maxWidth?: (string | number) | undefined;
                readonly content?: string | undefined;
                readonly contentClass?: string | undefined;
                readonly contentStyle?: CSSProperties | undefined;
                readonly tooltip?: string | undefined;
                readonly tooltipClass?: string | undefined;
                readonly tooltipStyle?: CSSProperties | undefined;
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
                [name: string]: Slot<any> | undefined;
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
                contentStyle: CSSProperties;
                tooltip: string;
                tooltipClass: string;
                tooltipStyle: CSSProperties;
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
            $nextTick: typeof nextTick;
            $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, import('@vue/reactivity').OnCleanup]) => any : (...args: [any, any, import('@vue/reactivity').OnCleanup]) => any, options?: import('vue').WatchOptions): import('vue').WatchStopHandle;
        } & Readonly<{
            maxWidth: string | number;
            content: string;
            contentClass: string;
            contentStyle: CSSProperties;
            tooltip: string;
            tooltipClass: string;
            tooltipStyle: CSSProperties;
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
        ellipsisRef: ({
            $: import('vue').ComponentInternalInstance;
            $data: {};
            $props: {
                readonly maxWidth?: (string | number) | undefined;
                readonly tooltipMaxWidth?: (string | number) | undefined;
                readonly line?: number | undefined;
                readonly expand?: boolean | undefined;
                readonly tooltip?: boolean | undefined;
                readonly onExpandChange?: ((...args: any[]) => any) | undefined;
            } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps;
            $attrs: {
                [x: string]: unknown;
            };
            $refs: {
                [x: string]: unknown;
            };
            $slots: Readonly<{
                [name: string]: Slot<any> | undefined;
            }>;
            $root: import('vue').ComponentPublicInstance | null;
            $parent: import('vue').ComponentPublicInstance | null;
            $host: Element | null;
            $emit: (event: "expandChange", ...args: any[]) => void;
            $el: any;
            $options: import('vue').ComponentOptionsBase<Readonly<import('../ellipsis').Props> & Readonly<{
                onExpandChange?: ((...args: any[]) => any) | undefined;
            }>, {
                observeScroll: import('vue').Ref<any, any>;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
                expandChange: (...args: any[]) => void;
            }, string, {
                line: number;
                maxWidth: string | number;
                tooltip: boolean;
                tooltipMaxWidth: string | number;
                expand: boolean;
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
            $nextTick: typeof nextTick;
            $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, import('@vue/reactivity').OnCleanup]) => any : (...args: [any, any, import('@vue/reactivity').OnCleanup]) => any, options?: import('vue').WatchOptions): import('vue').WatchStopHandle;
        } & Readonly<{
            line: number;
            maxWidth: string | number;
            tooltip: boolean;
            tooltipMaxWidth: string | number;
            expand: boolean;
        }> & Omit<Readonly<import('../ellipsis').Props> & Readonly<{
            onExpandChange?: ((...args: any[]) => any) | undefined;
        }>, "observeScroll" | ("line" | "maxWidth" | "tooltip" | "tooltipMaxWidth" | "expand")> & import('vue').ShallowUnwrapRef<{
            observeScroll: import('vue').Ref<any, any>;
        }> & {} & import('vue').ComponentCustomProperties & {} & {
            $slots: {
                tooltip?(_: {}): any;
                default?(_: {}): any;
                default?(_: {}): any;
            };
        }) | null;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    expand: (...args: any[]) => void;
    expandedRowsChange: (...args: any[]) => void;
    "update:expandedRowKeys": (...args: any[]) => void;
    sortChange: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    onExpand?: ((...args: any[]) => any) | undefined;
    onExpandedRowsChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:expandedRowKeys"?: ((...args: any[]) => any) | undefined;
    onSortChange?: ((...args: any[]) => any) | undefined;
}>, {
    scroll: ScrollOption;
    size: "large" | "middle" | "small";
    footer: string;
    header: string;
    bordered: boolean;
    loading: boolean;
    spinProps: object;
    tableLayout: "auto" | "fixed";
    columns: Column[];
    scrollbarProps: object;
    emptyProps: object;
    showPagination: boolean;
    pagination: object;
    ellipsisProps: object;
    showSorterTooltip: boolean;
    sortTooltipProps: object;
    sortDirections: ("ascend" | "descend")[];
    dataSource: any[];
    rowClassName: string | ((record: any, rowIndex: number) => string);
    striped: boolean;
    showExpandColumn: boolean;
    expandColumnTitle: string;
    expandColumnWidth: string | number;
    expandCell: Slot;
    expandedRowRender: Slot;
    expandFixed: boolean;
    expandedRowKeys: (string | number)[];
    expandRowByClick: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
