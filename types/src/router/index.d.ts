export declare const routes: ({
    path: string;
    name: string;
    component: import('vue').DefineComponent<{}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    redirect: string;
    children: {
        path: string;
        name: string;
        meta: {
            title: string;
        };
        component: () => Promise<typeof import("@/views/guide/Home.vue")>;
    }[];
    meta?: undefined;
} | {
    path: string;
    name: string;
    meta: {
        title: string;
    };
    component: () => Promise<typeof import("@/views/guide/NotFound.vue")>;
    redirect?: undefined;
    children?: undefined;
})[];
declare const router: import('vue-router').Router;
export default router;
