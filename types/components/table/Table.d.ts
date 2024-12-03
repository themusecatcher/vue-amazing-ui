import { Slot } from 'vue';
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
        scrollbarRef: any;
        colExpandRef: HTMLTableColElement;
        colRef: HTMLTableColElement;
        tooltipRef: any;
        ellipsisRef: any;
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
