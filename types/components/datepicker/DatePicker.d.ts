export interface Props {
    width?: number;
    mode?: 'time' | 'date' | 'week' | 'month' | 'year';
    showTime?: boolean;
    showToday?: boolean;
    modelType?: 'timestamp' | 'format';
}
declare const _default: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    mode: "time" | "date" | "week" | "month" | "year";
    width: number;
    showTime: boolean;
    showToday: boolean;
    modelType: "timestamp" | "format";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
