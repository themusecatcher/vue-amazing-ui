import { App } from 'vue';
export * from './components';
export { dateFormat, formatNumber, rafTimeout, cancelRaf, throttle, debounce, add, downloadFile, toggleDark, useEventListener, useMutationObserver, useScroll, useFps, useMediaQuery, useResizeObserver, useSlotsExist } from './utils';
export declare const install: (app: App) => App<any>;
declare const _default: {
    install: (app: App) => App<any>;
};
export default _default;
