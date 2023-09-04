import { resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
const __pageData = JSON.parse('{"title":"文本省略 Ellipsis","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/ellipsis.md","filePath":"guide/components/ellipsis.md"}');
const _sfc_main = { name: "guide/components/ellipsis.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Ellipsis = resolveComponent("Ellipsis", true);
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="文本省略-ellipsis" tabindex="-1">文本省略 Ellipsis <a class="header-anchor" href="#文本省略-ellipsis" aria-label="Permalink to &quot;文本省略 Ellipsis&quot;">​</a></h1><br><p><em>文本过长自动处理省略号，支持按照文本长度和最大行数两种方式截取</em></p><h2 id="何时使用" tabindex="-1">何时使用 <a class="header-anchor" href="#何时使用" aria-label="Permalink to &quot;何时使用&quot;">​</a></h2><ul><li>当文本长度超过展示区域，需要自动处理省略号时</li></ul><h2 id="基本使用" tabindex="-1">基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_Ellipsis, { maxWidth: 240 }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪 `);
      } else {
        return [
          createTextVNode(" 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪 ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<details class="details custom-block"><summary>Show Code</summary><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Ellipsis</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}"> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">:maxWidth</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">240</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">    住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Ellipsis</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span></code></pre></div></details><h2 id="多行省略" tabindex="-1">多行省略 <a class="header-anchor" href="#多行省略" aria-label="Permalink to &quot;多行省略&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_Ellipsis, { line: 2 }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` 电灯熄灭 物换星移 泥牛入海<br${_scopeId}>黑暗好像 一颗巨石 按在胸口<br${_scopeId}>独脚大盗 百万富翁 摸爬滚打<br${_scopeId}>黑暗好像 一颗巨石 按在胸口 `);
      } else {
        return [
          createTextVNode(" 电灯熄灭 物换星移 泥牛入海"),
          createVNode("br"),
          createTextVNode("黑暗好像 一颗巨石 按在胸口"),
          createVNode("br"),
          createTextVNode("独脚大盗 百万富翁 摸爬滚打"),
          createVNode("br"),
          createTextVNode("黑暗好像 一颗巨石 按在胸口 ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<details class="details custom-block"><summary>Show Code</summary><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Ellipsis</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}"> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">:line</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">2</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">    电灯熄灭 物换星移 泥牛入海</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">br</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}">黑暗好像 一颗巨石 按在胸口</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">br</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}">独脚大盗</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">    百万富翁 摸爬滚打</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">br</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}">黑暗好像 一颗巨石 按在胸口</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Ellipsis</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span></code></pre></div></details><h2 id="点击展开" tabindex="-1">点击展开 <a class="header-anchor" href="#点击展开" aria-label="Permalink to &quot;点击展开&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_Ellipsis, {
    expand: "",
    line: 2
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` 电灯熄灭 物换星移 泥牛入海<br${_scopeId}>黑暗好像 一颗巨石 按在胸口<br${_scopeId}>独脚大盗 百万富翁 摸爬滚打<br${_scopeId}>黑暗好像 一颗巨石 按在胸口 `);
      } else {
        return [
          createTextVNode(" 电灯熄灭 物换星移 泥牛入海"),
          createVNode("br"),
          createTextVNode("黑暗好像 一颗巨石 按在胸口"),
          createVNode("br"),
          createTextVNode("独脚大盗 百万富翁 摸爬滚打"),
          createVNode("br"),
          createTextVNode("黑暗好像 一颗巨石 按在胸口 ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<details class="details custom-block"><summary>Show Code</summary><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Ellipsis</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}"> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">expand</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}"> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">:line</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">2</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">    电灯熄灭 物换星移 泥牛入海</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">br</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}">黑暗好像 一颗巨石 按在胸口</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">br</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}">独脚大盗</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">    百万富翁 摸爬滚打</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">br</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}">黑暗好像 一颗巨石 按在胸口</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Ellipsis</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span></code></pre></div></details><h2 id="定制-tooltip-内容" tabindex="-1">定制 Tooltip 内容 <a class="header-anchor" href="#定制-tooltip-内容" aria-label="Permalink to &quot;定制 Tooltip 内容&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_Ellipsis, { "max-width": 240 }, {
    tooltip: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div style="${ssrRenderStyle({ "text-align": "center" })}"${_scopeId}> 《秦皇岛》<br${_scopeId}>住在我心里孤独的<br${_scopeId}>孤独的海怪 痛苦之王<br${_scopeId}>开始厌倦 深海的光 停滞的海浪 </div>`);
      } else {
        return [
          createVNode("div", { style: { "text-align": "center" } }, [
            createTextVNode(" 《秦皇岛》"),
            createVNode("br"),
            createTextVNode("住在我心里孤独的"),
            createVNode("br"),
            createTextVNode("孤独的海怪 痛苦之王"),
            createVNode("br"),
            createTextVNode("开始厌倦 深海的光 停滞的海浪 ")
          ])
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪 `);
      } else {
        return [
          createTextVNode(" 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪 ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<details class="details custom-block"><summary>Show Code</summary><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Ellipsis</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}"> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">:max-width</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">240</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">    住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">template</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">#</span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">tooltip</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}"> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">style</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">text-align: center</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">        《秦皇岛》</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">br</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}">住在我心里孤独的</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">br</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}">孤独的海怪 痛苦之王</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">br</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}">开始厌倦</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">        深海的光 停滞的海浪</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Ellipsis</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span></code></pre></div></details><h2 id="apis" tabindex="-1">APIs <a class="header-anchor" href="#apis" aria-label="Permalink to &quot;APIs&quot;">​</a></h2><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th><th>必传</th></tr></thead><tbody><tr><td>maxWidth</td><td>文本最大宽度</td><td>number | string</td><td>&#39;100%&#39;</td><td>false</td></tr><tr><td>line</td><td>最大行数</td><td>number</td><td>undefined</td><td>false</td></tr><tr><td>expand</td><td>是否启用点击文本展开全部</td><td>boolean</td><td>false</td><td>false</td></tr><tr><td>tooltip</td><td>是否启用文本提示框</td><td>boolean</td><td>true</td><td>false</td></tr><tr><td>tooltipMaxWidth</td><td>提示框内容最大宽度，单位px，默认不设置时，提示文本内容自动与展示文本宽度保持一致</td><td>number</td><td>undefined</td><td>false</td></tr><tr><td>tooltipFontSize</td><td>提示文本字体大小，单位px，优先级高于 <code>overlayStyle</code></td><td>number</td><td>14</td><td>false</td></tr><tr><td>tooltipColor</td><td>提示文本字体颜色，优先级高于 <code>overlayStyle</code></td><td>string</td><td>&#39;#FFF&#39;</td><td>false</td></tr><tr><td>tooltipBackgroundColor</td><td>提示框背景颜色，优先级高于 <code>overlayStyle</code></td><td>string</td><td>&#39;rgba(0, 0, 0, .85)&#39;</td><td>false</td></tr><tr><td>tooltipOverlayStyle</td><td>提示框内容区域样式</td><td>CSSProperties</td><td>{padding: &#39;8px 12px&#39;, textAlign: &#39;justify&#39;}</td><td>false</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table><thead><tr><th>事件名称</th><th>说明</th><th>参数</th></tr></thead><tbody><tr><td>expandChange</td><td>点击文本展开收起时的回调</td><td>(expand: boolean) =&gt; void</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/components/ellipsis.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ellipsis = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  ellipsis as default
};
