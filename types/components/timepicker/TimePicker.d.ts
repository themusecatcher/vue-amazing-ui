export interface DisabledTime {
    disabledHours?: () => number[];
    disabledMinutes?: (selectedHour: number) => number[];
    disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
}
export interface Props {
    allowClear?: boolean;
    bordered?: boolean;
    disabled?: boolean;
    disabledTime?: DisabledTime;
    format?: string;
    hideDisabledOptions?: boolean;
    hourStep?: number;
    minuteStep?: number;
    secondStep?: number;
    placeholder?: string | [string, string];
    showNow?: boolean;
    use12Hours?: boolean;
    value?: string | null;
    valueFormat?: string;
}
declare const _default: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    "update:value": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:value"?: ((...args: any[]) => any) | undefined;
}>, {
    bordered: boolean;
    value: string | null;
    disabled: boolean;
    placeholder: string | [string, string];
    allowClear: boolean;
    format: string;
    disabledTime: DisabledTime;
    hideDisabledOptions: boolean;
    hourStep: number;
    minuteStep: number;
    secondStep: number;
    showNow: boolean;
    use12Hours: boolean;
    valueFormat: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
