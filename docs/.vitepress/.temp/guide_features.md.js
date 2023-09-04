import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
const __pageData = JSON.parse('{"title":"特性","description":"","frontmatter":{},"headers":[],"relativePath":"guide/features.md","filePath":"guide/features.md"}');
const _sfc_main = { name: "guide/features.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="特性" tabindex="-1">特性 <a class="header-anchor" href="#特性" aria-label="Permalink to &quot;特性&quot;">​</a></h1><h2 id="简要介绍" tabindex="-1">简要介绍 <a class="header-anchor" href="#简要介绍" aria-label="Permalink to &quot;简要介绍&quot;">​</a></h2><ul><li>该组件库采用 <code>Vue@3.3.4</code> + <code>TypeScript@5.1.6</code> + <code>Vite@4.4.9</code> + <code>Less@4.2.0</code> 实现！</li><li>所有组件样式 <code>CSS</code> 均使用 <code>box-sizing: border-box;</code> 模式！</li><li>部分组件样式尚未完美适配暗黑模式，可切换至 <code>light</code> 模式查看！</li><li>开箱即用！</li></ul><h2 id="使用方式" tabindex="-1">使用方式 <a class="header-anchor" href="#使用方式" aria-label="Permalink to &quot;使用方式&quot;">​</a></h2><ul><li>全局引入并注册所有组件</li><li>按需引入并注册部分组件</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/features.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const features = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  features as default
};
