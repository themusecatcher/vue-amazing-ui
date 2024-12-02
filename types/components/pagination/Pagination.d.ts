export interface Props {
    page?: number;
    pageSize?: number;
    total?: number;
    disabled?: boolean;
    pageAmount?: number;
    hideOnSinglePage?: boolean;
    showQuickJumper?: boolean;
    showSizeChanger?: boolean;
    pageSizeOptions?: string[] | number[];
    showTotal?: boolean | ((total: number, range: number[]) => string);
    placement?: 'left' | 'center' | 'right';
    size?: 'large' | 'middle' | 'small';
}
declare const _default: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    "update:page": (...args: any[]) => void;
    "update:pageSize": (...args: any[]) => void;
    pageSizeChange: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:page"?: ((...args: any[]) => any) | undefined;
    "onUpdate:pageSize"?: ((...args: any[]) => any) | undefined;
    onPageSizeChange?: ((...args: any[]) => any) | undefined;
}>, {
    size: "large" | "middle" | "small";
    placement: "left" | "center" | "right";
    total: number;
    page: number;
    disabled: boolean;
    pageSize: number;
    pageAmount: number;
    hideOnSinglePage: boolean;
    showQuickJumper: boolean;
    showSizeChanger: boolean;
    pageSizeOptions: string[] | number[];
    showTotal: boolean | ((total: number, range: number[]) => string);
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
