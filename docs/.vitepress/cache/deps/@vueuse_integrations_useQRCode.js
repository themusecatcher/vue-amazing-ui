import {
  require_browser
} from "./chunk-H4UJRISF.js";
import {
  customRef,
  readonly,
  ref,
  toRef,
  watch
} from "./chunk-JKV2V35Q.js";
import {
  __toESM
} from "./chunk-DFKQJ226.js";

// node_modules/.pnpm/@vueuse+shared@10.1.2_vue@3.3.4/node_modules/@vueuse/shared/index.mjs
var isClient = typeof window !== "undefined";
var noop = () => {
};
var isIOS = getIsIOS();
function getIsIOS() {
  var _a;
  return isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
}
function toRef2(...args) {
  if (args.length !== 1)
    return toRef(...args);
  const r = args[0];
  return typeof r === "function" ? readonly(customRef(() => ({ get: r, set: noop }))) : ref(r);
}

// node_modules/.pnpm/@vueuse+integrations@10.1.2_qrcode@1.5.3_vue@3.3.4/node_modules/@vueuse/integrations/useQRCode.mjs
var import_qrcode = __toESM(require_browser(), 1);
function useQRCode(text, options) {
  const src = toRef2(text);
  const result = ref("");
  watch(
    src,
    async (value) => {
      if (src.value && isClient)
        result.value = await import_qrcode.default.toDataURL(value, options);
    },
    { immediate: true }
  );
  return result;
}
export {
  useQRCode
};
//# sourceMappingURL=@vueuse_integrations_useQRCode.js.map
