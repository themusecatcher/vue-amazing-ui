import {
  require_browser
} from "./chunk-BOGFOVD3.js";
import {
  isClient,
  toRef
} from "./chunk-VA4WLYQB.js";
import {
  ref,
  watch
} from "./chunk-3MB4FZ2E.js";
import {
  __toESM
} from "./chunk-EQCVQC35.js";

// node_modules/.pnpm/@vueuse+integrations@12.5.0_async-validator@4.2.5_focus-trap@7.6.4_qrcode@1.5.4_typescript@5.7.3/node_modules/@vueuse/integrations/useQRCode.mjs
var import_qrcode = __toESM(require_browser(), 1);
function useQRCode(text, options) {
  const src = toRef(text);
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
