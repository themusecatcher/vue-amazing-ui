import { CSSProperties } from 'vue';
export interface Query {
    [propName: string]: any;
}
export interface Route {
    name: string;
    path?: string;
    query?: Query;
}
export interface Props {
    routes?: Route[];
    breadcrumbClass?: string;
    breadcrumbStyle?: CSSProperties;
    maxWidth?: string | number;
    separator?: string;
    separatorStyle?: CSSProperties;
    target?: '_self' | '_blank';
}
declare function __VLS_template(): {
    slots: {
        separator?(_: {
            index: number;
        }): any;
    };
    refs: {};
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    target: "_self" | "_blank";
    maxWidth: string | number;
    separator: string;
    routes: Route[];
    breadcrumbClass: string;
    breadcrumbStyle: CSSProperties;
    separatorStyle: CSSProperties;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
