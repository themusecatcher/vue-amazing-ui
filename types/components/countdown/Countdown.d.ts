import { CSSProperties } from 'vue';
export interface Props {
    title?: string;
    titleStyle?: CSSProperties;
    prefix?: string;
    suffix?: string;
    finishedText?: string;
    future?: boolean;
    format?: string;
    value?: number;
    valueStyle?: CSSProperties;
    active?: boolean;
}
declare function resetCountdown(): void;
declare function __VLS_template(): {
    slots: {
        title?(_: {}): any;
        prefix?(_: {}): any;
        finish?(_: {}): any;
        suffix?(_: {}): any;
    };
    refs: {};
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {
    reset: typeof resetCountdown;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    finish: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onFinish?: ((...args: any[]) => any) | undefined;
}>, {
    title: string;
    value: number;
    valueStyle: CSSProperties;
    active: boolean;
    titleStyle: CSSProperties;
    prefix: string;
    suffix: string;
    finishedText: string;
    future: boolean;
    format: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
