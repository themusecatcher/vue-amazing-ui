import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
const __pageData = JSON.parse('{"title":"间距 Space","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/space.md","filePath":"guide/components/space.md"}');
const __default__ = { name: "guide/components/space.md" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    const options = ref([
      {
        label: "small",
        value: "small"
      },
      {
        label: "middle",
        value: "middle"
      },
      {
        label: "large",
        value: "large"
      }
    ]);
    const size = ref("small");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Radio = resolveComponent("Radio");
      const _component_Space = resolveComponent("Space", true);
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-4d49fb62><h1 id="间距-space" tabindex="-1" data-v-4d49fb62>间距 Space <a class="header-anchor" href="#间距-space" aria-label="Permalink to &quot;间距 Space&quot;" data-v-4d49fb62>​</a></h1><br data-v-4d49fb62><p data-v-4d49fb62><em data-v-4d49fb62>设置组件之间的间距</em></p><h2 id="何时使用" tabindex="-1" data-v-4d49fb62>何时使用 <a class="header-anchor" href="#何时使用" aria-label="Permalink to &quot;何时使用&quot;" data-v-4d49fb62>​</a></h2><p data-v-4d49fb62>避免组件紧贴在一起，拉开统一的空间</p><ul data-v-4d49fb62><li data-v-4d49fb62>适合行内元素的水平间距</li><li data-v-4d49fb62>可以设置各种水平对齐方式</li></ul><h2 id="水平间距" tabindex="-1" data-v-4d49fb62>水平间距 <a class="header-anchor" href="#水平间距" aria-label="Permalink to &quot;水平间距&quot;" data-v-4d49fb62>​</a></h2>`);
      _push(ssrRenderComponent(_component_Radio, {
        style: { "margin-bottom": "30px" },
        options: options.value,
        value: size.value,
        "onUpdate:value": ($event) => size.value = $event
      }, null, _parent));
      _push(`<br data-v-4d49fb62>`);
      _push(ssrRenderComponent(_component_Space, { size: size.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, { type: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Primary`);
                } else {
                  return [
                    createTextVNode("Primary")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Default`);
                } else {
                  return [
                    createTextVNode("Default")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, { type: "dashed" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Dashed`);
                } else {
                  return [
                    createTextVNode("Dashed")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, { type: "primary" }, {
                default: withCtx(() => [
                  createTextVNode("Primary")
                ]),
                _: 1
              }),
              createVNode(_component_Button, null, {
                default: withCtx(() => [
                  createTextVNode("Default")
                ]),
                _: 1
              }),
              createVNode(_component_Button, { type: "dashed" }, {
                default: withCtx(() => [
                  createTextVNode("Dashed")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-4d49fb62><summary data-v-4d49fb62>Show Code</summary><div class="language-vue" data-v-4d49fb62><button title="Copy Code" class="copy" data-v-4d49fb62></button><span class="lang" data-v-4d49fb62>vue</span><pre class="shiki material-theme-palenight" data-v-4d49fb62><code data-v-4d49fb62><span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Radio</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>style</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>margin-bottom: 30px;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>:options</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>options</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>v-model:value</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>size</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> /&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>br</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>/&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>:size</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>size</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>type</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>primary</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>Primary</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>Default</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>type</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>dashed</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>Dashed</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span></code></pre></div></details><h2 id="垂直间距" tabindex="-1" data-v-4d49fb62>垂直间距 <a class="header-anchor" href="#垂直间距" aria-label="Permalink to &quot;垂直间距&quot;" data-v-4d49fb62>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, { direction: "vertical" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Card, {
              title: "Card",
              style: { "width": "300px" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-4d49fb62${_scopeId2}>Card content</p><p data-v-4d49fb62${_scopeId2}>Card content</p>`);
                } else {
                  return [
                    createVNode("p", null, "Card content"),
                    createVNode("p", null, "Card content")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Card, {
              title: "Card",
              style: { "width": "300px" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-4d49fb62${_scopeId2}>Card content</p><p data-v-4d49fb62${_scopeId2}>Card content</p>`);
                } else {
                  return [
                    createVNode("p", null, "Card content"),
                    createVNode("p", null, "Card content")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Card, {
                title: "Card",
                style: { "width": "300px" }
              }, {
                default: withCtx(() => [
                  createVNode("p", null, "Card content"),
                  createVNode("p", null, "Card content")
                ]),
                _: 1
              }),
              createVNode(_component_Card, {
                title: "Card",
                style: { "width": "300px" }
              }, {
                default: withCtx(() => [
                  createVNode("p", null, "Card content"),
                  createVNode("p", null, "Card content")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-4d49fb62><summary data-v-4d49fb62>Show Code</summary><div class="language-vue" data-v-4d49fb62><button title="Copy Code" class="copy" data-v-4d49fb62></button><span class="lang" data-v-4d49fb62>vue</span><pre class="shiki material-theme-palenight" data-v-4d49fb62><code data-v-4d49fb62><span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>direction</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>vertical</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Card</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>title</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>Card</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>style</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>width: 300px</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>Card content</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>Card content</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Card</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Card</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>title</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>Card</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>style</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>width: 300px</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>Card content</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>Card content</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Card</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span></code></pre></div></details><h2 id="对齐" tabindex="-1" data-v-4d49fb62>对齐 <a class="header-anchor" href="#对齐" aria-label="Permalink to &quot;对齐&quot;" data-v-4d49fb62>​</a></h2><div class="space-align-container" data-v-4d49fb62><div class="space-align-block" data-v-4d49fb62>`);
      _push(ssrRenderComponent(_component_Space, { align: "center" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` center `);
            _push2(ssrRenderComponent(_component_Button, { type: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Primary`);
                } else {
                  return [
                    createTextVNode("Primary")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<span class="mock-block" data-v-4d49fb62${_scopeId}>Block</span>`);
          } else {
            return [
              createTextVNode(" center "),
              createVNode(_component_Button, { type: "primary" }, {
                default: withCtx(() => [
                  createTextVNode("Primary")
                ]),
                _: 1
              }),
              createVNode("span", { class: "mock-block" }, "Block")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="space-align-block" data-v-4d49fb62>`);
      _push(ssrRenderComponent(_component_Space, { align: "start" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` start `);
            _push2(ssrRenderComponent(_component_Button, { type: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Primary`);
                } else {
                  return [
                    createTextVNode("Primary")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<span class="mock-block" data-v-4d49fb62${_scopeId}>Block</span>`);
          } else {
            return [
              createTextVNode(" start "),
              createVNode(_component_Button, { type: "primary" }, {
                default: withCtx(() => [
                  createTextVNode("Primary")
                ]),
                _: 1
              }),
              createVNode("span", { class: "mock-block" }, "Block")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="space-align-block" data-v-4d49fb62>`);
      _push(ssrRenderComponent(_component_Space, { align: "end" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` end `);
            _push2(ssrRenderComponent(_component_Button, { type: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Primary`);
                } else {
                  return [
                    createTextVNode("Primary")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<span class="mock-block" data-v-4d49fb62${_scopeId}>Block</span>`);
          } else {
            return [
              createTextVNode(" end "),
              createVNode(_component_Button, { type: "primary" }, {
                default: withCtx(() => [
                  createTextVNode("Primary")
                ]),
                _: 1
              }),
              createVNode("span", { class: "mock-block" }, "Block")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="space-align-block" data-v-4d49fb62>`);
      _push(ssrRenderComponent(_component_Space, { align: "baseline" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` baseline `);
            _push2(ssrRenderComponent(_component_Button, { type: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Primary`);
                } else {
                  return [
                    createTextVNode("Primary")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<span class="mock-block" data-v-4d49fb62${_scopeId}>Block</span>`);
          } else {
            return [
              createTextVNode(" baseline "),
              createVNode(_component_Button, { type: "primary" }, {
                default: withCtx(() => [
                  createTextVNode("Primary")
                ]),
                _: 1
              }),
              createVNode("span", { class: "mock-block" }, "Block")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><details class="details custom-block" data-v-4d49fb62><summary data-v-4d49fb62>Show Code</summary><div class="language-vue" data-v-4d49fb62><button title="Copy Code" class="copy" data-v-4d49fb62></button><span class="lang" data-v-4d49fb62>vue</span><pre class="shiki material-theme-palenight" data-v-4d49fb62><code data-v-4d49fb62><span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>space-align-container</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>space-align-block</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>align</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>center</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>        center</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>type</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>primary</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>Primary</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>mock-block</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>Block</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>space-align-block</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>align</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>start</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>        start</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>type</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>primary</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>Primary</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>mock-block</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>Block</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>space-align-block</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>align</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>end</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>        end</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>type</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>primary</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>Primary</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>mock-block</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>Block</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>space-align-block</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>align</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>baseline</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>        baseline</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>type</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>primary</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>Primary</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>mock-block</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>Block</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>style</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>lang</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>less</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>scoped</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>.</span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-4d49fb62>space-align-container</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>{</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-4d49fb62>display</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> flex</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-4d49fb62>align-items</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> flex-start</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-4d49fb62>flex-wrap</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> wrap</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>}</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>.</span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-4d49fb62>space-align-block</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>{</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-4d49fb62>margin</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}" data-v-4d49fb62>8px</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}" data-v-4d49fb62>4px</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-4d49fb62>border</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}" data-v-4d49fb62>1px</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> solid #40a9ff</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-4d49fb62>padding</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}" data-v-4d49fb62>4px</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-4d49fb62>flex</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> none</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>}</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>.</span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-4d49fb62>space-align-block</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>.</span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-4d49fb62>mock-block</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>{</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-4d49fb62>display</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> inline-block</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-4d49fb62>padding</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}" data-v-4d49fb62>32px</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}" data-v-4d49fb62>8px</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}" data-v-4d49fb62>16px</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-4d49fb62>background</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-4d49fb62>rgba</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>(</span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}" data-v-4d49fb62>150</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>,</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}" data-v-4d49fb62>150</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>,</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}" data-v-4d49fb62>150</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>,</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}" data-v-4d49fb62>0.2</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>);</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>}</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>style</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span></code></pre></div></details><h2 id="自动换行" tabindex="-1" data-v-4d49fb62>自动换行 <a class="header-anchor" href="#自动换行" aria-label="Permalink to &quot;自动换行&quot;" data-v-4d49fb62>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, { size: [8, 16] }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(10, (n) => {
              _push2(ssrRenderComponent(_component_Button, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Button`);
                  } else {
                    return [
                      createTextVNode("Button")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(10, (n) => {
                return createVNode(_component_Button, { key: n }, {
                  default: withCtx(() => [
                    createTextVNode("Button")
                  ]),
                  _: 1
                });
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p data-v-4d49fb62><br data-v-4d49fb62><br data-v-4d49fb62></p><details class="details custom-block" data-v-4d49fb62><summary data-v-4d49fb62>Show Code</summary><div class="language-vue" data-v-4d49fb62><button title="Copy Code" class="copy" data-v-4d49fb62></button><span class="lang" data-v-4d49fb62>vue</span><pre class="shiki material-theme-palenight" data-v-4d49fb62><code data-v-4d49fb62><span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>:size</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-4d49fb62>[8, 16]</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>template</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}" data-v-4d49fb62>v-for</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>n </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>in</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}" data-v-4d49fb62>10</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>:</span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-4d49fb62>key</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>n</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-4d49fb62>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span>
<span class="line" data-v-4d49fb62><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-4d49fb62>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-4d49fb62>&gt;</span></span></code></pre></div></details><h2 id="apis" tabindex="-1" data-v-4d49fb62>APIs <a class="header-anchor" href="#apis" aria-label="Permalink to &quot;APIs&quot;" data-v-4d49fb62>​</a></h2><table data-v-4d49fb62><thead data-v-4d49fb62><tr data-v-4d49fb62><th data-v-4d49fb62>参数</th><th data-v-4d49fb62>说明</th><th data-v-4d49fb62>类型</th><th data-v-4d49fb62>默认值</th><th data-v-4d49fb62>必传</th></tr></thead><tbody data-v-4d49fb62><tr data-v-4d49fb62><td data-v-4d49fb62>width</td><td data-v-4d49fb62>区域总宽度</td><td data-v-4d49fb62>string | number</td><td data-v-4d49fb62>&#39;auto&#39;</td><td data-v-4d49fb62>false</td></tr><tr data-v-4d49fb62><td data-v-4d49fb62>align</td><td data-v-4d49fb62>垂直排列方式</td><td data-v-4d49fb62>&#39;stretch&#39; | &#39;start&#39; | &#39;end&#39; | &#39;center&#39; | &#39;baseline&#39;</td><td data-v-4d49fb62>&#39;start&#39;</td><td data-v-4d49fb62>false</td></tr><tr data-v-4d49fb62><td data-v-4d49fb62>direction</td><td data-v-4d49fb62>间距方向</td><td data-v-4d49fb62>&#39;horizontal&#39; | &#39;vertical&#39;</td><td data-v-4d49fb62>&#39;horizontal&#39;</td><td data-v-4d49fb62>false</td></tr><tr data-v-4d49fb62><td data-v-4d49fb62>size</td><td data-v-4d49fb62>间距大小，数组时表示: <code data-v-4d49fb62>[水平间距, 垂直间距]</code></td><td data-v-4d49fb62>number | number[] | &#39;small&#39; | &#39;middle&#39; | &#39;large&#39;</td><td data-v-4d49fb62>&#39;small&#39;</td><td data-v-4d49fb62>false</td></tr><tr data-v-4d49fb62><td data-v-4d49fb62>wrap</td><td data-v-4d49fb62>是否自动换行，仅在 <code data-v-4d49fb62>horizontal</code> 时有效</td><td data-v-4d49fb62>boolean</td><td data-v-4d49fb62>true</td><td data-v-4d49fb62>false</td></tr></tbody></table></div>`);
    };
  }
});
const space_md_vue_type_style_index_0_scoped_4d49fb62_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/components/space.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const space = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4d49fb62"]]);
export {
  __pageData,
  space as default
};
