import { defineComponent, reactive, resolveComponent, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"栅格 Grid","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/grid.md","filePath":"guide/components/grid.md","lastUpdated":1729670212000}');
const __default__ = { name: "guide/components/grid.md" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    const colCountOptions = [
      {
        label: 2,
        value: 2
      },
      {
        label: 3,
        value: 3
      },
      {
        label: 4,
        value: 4
      },
      {
        label: 6,
        value: 6
      },
      {
        label: 8,
        value: 8
      },
      {
        label: 12,
        value: 12
      },
      {
        label: 24,
        value: 24
      }
    ];
    const state = reactive({
      horizontalGutter: 16,
      verticalGutter: 16,
      colCount: 4
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_GlobalElement = resolveComponent("GlobalElement");
      const _component_Row = resolveComponent("Row");
      const _component_Col = resolveComponent("Col");
      const _component_Divider = resolveComponent("Divider");
      const _component_Flex = resolveComponent("Flex");
      const _component_Slider = resolveComponent("Slider");
      const _component_Radio = resolveComponent("Radio");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-3a632e5e><h1 id="栅格-grid" tabindex="-1" data-v-3a632e5e>栅格 Grid <a class="header-anchor" href="#栅格-grid" aria-label="Permalink to &quot;栅格 Grid&quot;" data-v-3a632e5e>​</a></h1>`);
      _push(ssrRenderComponent(_component_GlobalElement, null, null, _parent));
      _push(`<p data-v-3a632e5e><em data-v-3a632e5e>24 栅格系统</em></p><br data-v-3a632e5e><p data-v-3a632e5e><em data-v-3a632e5e>布局的栅格化系统，我们是基于行（Row）和列（Col）来定义信息区块的外部框架，以保证页面的每个区域能够稳健地排布起来。下面简单介绍一下它的工作原理：</em></p><ul data-v-3a632e5e><li data-v-3a632e5e>通过 <code data-v-3a632e5e>Row</code> 在水平方向建立一组 <code data-v-3a632e5e>Col</code></li><li data-v-3a632e5e>你的内容应当放置于 <code data-v-3a632e5e>Col</code> 内，并且，只有 <code data-v-3a632e5e>Col</code> 可以作为 <code data-v-3a632e5e>Row</code> 的直接元素</li><li data-v-3a632e5e>栅格系统中的列是指 <code data-v-3a632e5e>1</code> 到 <code data-v-3a632e5e>24</code> 的值来表示其跨越的范围。例如，三个等宽的列可以使用 <code data-v-3a632e5e>:span=&quot;8&quot;</code> 来创建</li><li data-v-3a632e5e>如果一个 <code data-v-3a632e5e>Row</code> 中的 <code data-v-3a632e5e>Col</code> 总和超过 <code data-v-3a632e5e>24</code>，那么多余的 <code data-v-3a632e5e>Col</code> 会作为一个整体另起一行排列</li></ul><h2 id="基本使用" tabindex="-1" data-v-3a632e5e>基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;" data-v-3a632e5e>​</a></h2>`);
      _push(ssrRenderComponent(_component_Row, { class: "row" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col`);
                } else {
                  return [
                    createTextVNode("col")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, { span: 24 }, {
                default: withCtx(() => [
                  createTextVNode("col")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Row, { class: "row" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-12`);
                } else {
                  return [
                    createTextVNode("col-12")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-12`);
                } else {
                  return [
                    createTextVNode("col-12")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, { span: 12 }, {
                default: withCtx(() => [
                  createTextVNode("col-12")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 12 }, {
                default: withCtx(() => [
                  createTextVNode("col-12")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Row, { class: "row" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, { span: 8 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-8`);
                } else {
                  return [
                    createTextVNode("col-8")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 8 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-8`);
                } else {
                  return [
                    createTextVNode("col-8")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 8 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-8`);
                } else {
                  return [
                    createTextVNode("col-8")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, { span: 8 }, {
                default: withCtx(() => [
                  createTextVNode("col-8")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 8 }, {
                default: withCtx(() => [
                  createTextVNode("col-8")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 8 }, {
                default: withCtx(() => [
                  createTextVNode("col-8")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Row, { class: "row" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-6`);
                } else {
                  return [
                    createTextVNode("col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-6`);
                } else {
                  return [
                    createTextVNode("col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-6`);
                } else {
                  return [
                    createTextVNode("col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-6`);
                } else {
                  return [
                    createTextVNode("col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, { span: 6 }, {
                default: withCtx(() => [
                  createTextVNode("col-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 6 }, {
                default: withCtx(() => [
                  createTextVNode("col-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 6 }, {
                default: withCtx(() => [
                  createTextVNode("col-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 6 }, {
                default: withCtx(() => [
                  createTextVNode("col-6")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-3a632e5e><summary data-v-3a632e5e>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-3a632e5e><button title="Copy Code" class="copy" data-v-3a632e5e></button><span class="lang" data-v-3a632e5e>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-3a632e5e><code data-v-3a632e5e><span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>24</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>12</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-12&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>12</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-12&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>8</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-8&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>8</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-8&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>8</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-8&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;less&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> scoped</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>.row {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  .grid-col {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    min-height: 30px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    margin-top: 8px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    margin-bottom: 8px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    color: #fff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    text-align: center;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    border-radius: 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    padding: 16px 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    background: #1677ff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  :deep(&gt; :nth-child(2n + 1)) {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    background: #1677ffbf;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>}</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span></code></pre></div></details><h2 id="水平区块间隔" tabindex="-1" data-v-3a632e5e>水平区块间隔 <a class="header-anchor" href="#水平区块间隔" aria-label="Permalink to &quot;水平区块间隔&quot;" data-v-3a632e5e>​</a></h2>`);
      _push(ssrRenderComponent(_component_Row, { gutter: 16 }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-3a632e5e><summary data-v-3a632e5e>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-3a632e5e><button title="Copy Code" class="copy" data-v-3a632e5e></button><span class="lang" data-v-3a632e5e>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-3a632e5e><code data-v-3a632e5e><span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>gutter</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>16</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;less&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> scoped</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>.gutter-row {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  .grid-col {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    min-height: 30px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    color: #fff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    text-align: center;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    border-radius: 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  .gutter-box {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    background: #0092ff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    padding: 8px 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>}</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span></code></pre></div></details><h2 id="响应式区块间隔" tabindex="-1" data-v-3a632e5e>响应式区块间隔 <a class="header-anchor" href="#响应式区块间隔" aria-label="Permalink to &quot;响应式区块间隔&quot;" data-v-3a632e5e>​</a></h2>`);
      _push(ssrRenderComponent(_component_Row, { gutter: { xs: 8, sm: 16, md: 24, lg: 32 } }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-3a632e5e><summary data-v-3a632e5e>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-3a632e5e><button title="Copy Code" class="copy" data-v-3a632e5e></button><span class="lang" data-v-3a632e5e>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-3a632e5e><code data-v-3a632e5e><span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>gutter</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>{ xs: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>8</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>, sm: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>16</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>, md: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>24</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>, lg: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>32</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;less&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> scoped</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>.gutter-row {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  .grid-col {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    min-height: 30px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    color: #fff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    text-align: center;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    border-radius: 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  .gutter-box {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    background: #0092ff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    padding: 8px 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>}</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span></code></pre></div></details><h2 id="垂直区块间隔" tabindex="-1" data-v-3a632e5e>垂直区块间隔 <a class="header-anchor" href="#垂直区块间隔" aria-label="Permalink to &quot;垂直区块间隔&quot;" data-v-3a632e5e>​</a></h2>`);
      _push(ssrRenderComponent(_component_Row, { gutter: [16, 24] }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-3a632e5e><summary data-v-3a632e5e>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-3a632e5e><button title="Copy Code" class="copy" data-v-3a632e5e></button><span class="lang" data-v-3a632e5e>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-3a632e5e><code data-v-3a632e5e><span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>gutter</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>[</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>16</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>, </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>24</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>]</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;less&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> scoped</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>.gutter-row {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  .grid-col {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    min-height: 30px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    color: #fff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    text-align: center;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    border-radius: 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  .gutter-box {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    background: #0092ff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    padding: 8px 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>}</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span></code></pre></div></details><h2 id="响应式垂直区块间隔" tabindex="-1" data-v-3a632e5e>响应式垂直区块间隔 <a class="header-anchor" href="#响应式垂直区块间隔" aria-label="Permalink to &quot;响应式垂直区块间隔&quot;" data-v-3a632e5e>​</a></h2>`);
      _push(ssrRenderComponent(_component_Row, { gutter: [16, { xs: 8, sm: 16, md: 24, lg: 32 }] }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              class: "gutter-row",
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>col-6</div>`);
                } else {
                  return [
                    createVNode("div", { class: "gutter-box" }, "col-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                class: "gutter-row",
                span: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "gutter-box" }, "col-6")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-3a632e5e><summary data-v-3a632e5e>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-3a632e5e><button title="Copy Code" class="copy" data-v-3a632e5e></button><span class="lang" data-v-3a632e5e>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-3a632e5e><code data-v-3a632e5e><span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>gutter</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>[</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>16</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>, { xs: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>8</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>, sm: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>16</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>, md: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>24</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>, lg: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>32</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> }]</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;less&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> scoped</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>.gutter-row {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  .grid-col {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    min-height: 30px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    color: #fff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    text-align: center;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    border-radius: 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  .gutter-box {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    background: #0092ff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    padding: 8px 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>}</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span></code></pre></div></details><h2 id="左右偏移" tabindex="-1" data-v-3a632e5e>左右偏移 <a class="header-anchor" href="#左右偏移" aria-label="Permalink to &quot;左右偏移&quot;" data-v-3a632e5e>​</a></h2>`);
      _push(ssrRenderComponent(_component_Row, { class: "row" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, { span: 8 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-8`);
                } else {
                  return [
                    createTextVNode("col-8")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              span: 8,
              offset: 8
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-8`);
                } else {
                  return [
                    createTextVNode("col-8")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, { span: 8 }, {
                default: withCtx(() => [
                  createTextVNode("col-8")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                span: 8,
                offset: 8
              }, {
                default: withCtx(() => [
                  createTextVNode("col-8")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Row, { class: "row" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, {
              span: 6,
              offset: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-6 col-offset-6`);
                } else {
                  return [
                    createTextVNode("col-6 col-offset-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              span: 6,
              offset: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-6 col-offset-6`);
                } else {
                  return [
                    createTextVNode("col-6 col-offset-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, {
                span: 6,
                offset: 6
              }, {
                default: withCtx(() => [
                  createTextVNode("col-6 col-offset-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                span: 6,
                offset: 6
              }, {
                default: withCtx(() => [
                  createTextVNode("col-6 col-offset-6")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Row, { class: "row" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, {
              span: 12,
              offset: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-12 col-offset-6`);
                } else {
                  return [
                    createTextVNode("col-12 col-offset-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, {
                span: 12,
                offset: 6
              }, {
                default: withCtx(() => [
                  createTextVNode("col-12 col-offset-6")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Row, { class: "row" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, {
              span: 6,
              md: { offset: 4 },
              xl: { offset: 6 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-6 col-md-offset-4 col-xl-offset-6`);
                } else {
                  return [
                    createTextVNode("col-6 col-md-offset-4 col-xl-offset-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              span: 6,
              md: { offset: 4 },
              xl: { offset: 6 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-6 col-md-offset-4 col-xl-offset-6`);
                } else {
                  return [
                    createTextVNode("col-6 col-md-offset-4 col-xl-offset-6")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, {
                span: 6,
                md: { offset: 4 },
                xl: { offset: 6 }
              }, {
                default: withCtx(() => [
                  createTextVNode("col-6 col-md-offset-4 col-xl-offset-6")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                span: 6,
                md: { offset: 4 },
                xl: { offset: 6 }
              }, {
                default: withCtx(() => [
                  createTextVNode("col-6 col-md-offset-4 col-xl-offset-6")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-3a632e5e><summary data-v-3a632e5e>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-3a632e5e><button title="Copy Code" class="copy" data-v-3a632e5e></button><span class="lang" data-v-3a632e5e>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-3a632e5e><code data-v-3a632e5e><span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>8</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-8&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>8</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>offset</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>8</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-8&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>offset</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6 col-offset-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>offset</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6 col-offset-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>12</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>offset</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-12 col-offset-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>md</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>{ offset: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>xl</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>{ offset: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6 col-md-offset-4 col-xl-offset-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>md</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>{ offset: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>xl</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>{ offset: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-6 col-md-offset-4 col-xl-offset-6&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;less&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> scoped</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>.row {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  .grid-col {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    min-height: 30px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    margin-top: 8px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    margin-bottom: 8px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    color: #fff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    text-align: center;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    border-radius: 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    padding: 16px 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    background: #1677ff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  :deep(&gt; :nth-child(2n + 1)) {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    background: #1677ffbf;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>}</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span></code></pre></div></details><h2 id="排版方式" tabindex="-1" data-v-3a632e5e>排版方式 <a class="header-anchor" href="#排版方式" aria-label="Permalink to &quot;排版方式&quot;" data-v-3a632e5e>​</a></h2>`);
      _push(ssrRenderComponent(_component_Divider, { orientation: "left" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`sub-element align left`);
          } else {
            return [
              createTextVNode("sub-element align left")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Row, {
        class: "row",
        justify: "start"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Divider, { orientation: "left" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`sub-element align center`);
          } else {
            return [
              createTextVNode("sub-element align center")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Row, {
        class: "row",
        justify: "center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Divider, { orientation: "left" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`sub-element align right`);
          } else {
            return [
              createTextVNode("sub-element align right")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Row, {
        class: "row",
        justify: "end"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Divider, { orientation: "left" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`sub-element align space-between`);
          } else {
            return [
              createTextVNode("sub-element align space-between")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Row, {
        class: "row",
        justify: "space-between"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Divider, { orientation: "left" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`sub-element align space-around`);
          } else {
            return [
              createTextVNode("sub-element align space-around")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Row, {
        class: "row",
        justify: "space-around"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Divider, { orientation: "left" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`sub-element align space-evenly`);
          } else {
            return [
              createTextVNode("sub-element align space-evenly")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Row, {
        class: "row",
        justify: "space-evenly"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`col-4`);
                } else {
                  return [
                    createTextVNode("col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createTextVNode("col-4")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-3a632e5e><summary data-v-3a632e5e>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-3a632e5e><button title="Copy Code" class="copy" data-v-3a632e5e></button><span class="lang" data-v-3a632e5e>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-3a632e5e><code data-v-3a632e5e><span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> orientation</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;left&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;sub-element align left&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> justify</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;start&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> orientation</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;left&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;sub-element align center&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> justify</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;center&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> orientation</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;left&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;sub-element align right&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> justify</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;end&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> orientation</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;left&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;sub-element align space-between&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> justify</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;space-between&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> orientation</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;left&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;sub-element align space-around&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> justify</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;space-around&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> orientation</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;left&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;sub-element align space-evenly&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> justify</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;space-evenly&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;less&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> scoped</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>.row {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  .grid-col {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    min-height: 30px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    margin-top: 8px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    margin-bottom: 8px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    color: #fff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    text-align: center;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    border-radius: 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    padding: 16px 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    background: #1677ff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  :deep(&gt; :nth-child(2n + 1)) {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    background: #1677ffbf;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>}</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span></code></pre></div></details><h2 id="对齐方式" tabindex="-1" data-v-3a632e5e>对齐方式 <a class="header-anchor" href="#对齐方式" aria-label="Permalink to &quot;对齐方式&quot;" data-v-3a632e5e>​</a></h2>`);
      _push(ssrRenderComponent(_component_Divider, { orientation: "left" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Align Top`);
          } else {
            return [
              createTextVNode("Align Top")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Row, {
        class: "row",
        style: { "background": "rgba(128,128,128,.08)" },
        justify: "center",
        align: "top"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="height-100" data-v-3a632e5e${_scopeId2}>col-4</p>`);
                } else {
                  return [
                    createVNode("p", { class: "height-100" }, "col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="height-50" data-v-3a632e5e${_scopeId2}>col-4</p>`);
                } else {
                  return [
                    createVNode("p", { class: "height-50" }, "col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="height-120" data-v-3a632e5e${_scopeId2}>col-4</p>`);
                } else {
                  return [
                    createVNode("p", { class: "height-120" }, "col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="height-80" data-v-3a632e5e${_scopeId2}>col-4</p>`);
                } else {
                  return [
                    createVNode("p", { class: "height-80" }, "col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createVNode("p", { class: "height-100" }, "col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createVNode("p", { class: "height-50" }, "col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createVNode("p", { class: "height-120" }, "col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createVNode("p", { class: "height-80" }, "col-4")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Divider, { orientation: "left" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Align Middle`);
          } else {
            return [
              createTextVNode("Align Middle")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Row, {
        class: "row",
        style: { "background": "rgba(128,128,128,.08)" },
        justify: "space-around",
        align: "middle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="height-100" data-v-3a632e5e${_scopeId2}>col-4</p>`);
                } else {
                  return [
                    createVNode("p", { class: "height-100" }, "col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="height-50" data-v-3a632e5e${_scopeId2}>col-4</p>`);
                } else {
                  return [
                    createVNode("p", { class: "height-50" }, "col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="height-120" data-v-3a632e5e${_scopeId2}>col-4</p>`);
                } else {
                  return [
                    createVNode("p", { class: "height-120" }, "col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="height-80" data-v-3a632e5e${_scopeId2}>col-4</p>`);
                } else {
                  return [
                    createVNode("p", { class: "height-80" }, "col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createVNode("p", { class: "height-100" }, "col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createVNode("p", { class: "height-50" }, "col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createVNode("p", { class: "height-120" }, "col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createVNode("p", { class: "height-80" }, "col-4")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Divider, { orientation: "left" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Align Bottom`);
          } else {
            return [
              createTextVNode("Align Bottom")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Row, {
        class: "row",
        style: { "background": "rgba(128,128,128,.08)" },
        justify: "space-between",
        align: "bottom"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="height-100" data-v-3a632e5e${_scopeId2}>col-4</p>`);
                } else {
                  return [
                    createVNode("p", { class: "height-100" }, "col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="height-50" data-v-3a632e5e${_scopeId2}>col-4</p>`);
                } else {
                  return [
                    createVNode("p", { class: "height-50" }, "col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="height-120" data-v-3a632e5e${_scopeId2}>col-4</p>`);
                } else {
                  return [
                    createVNode("p", { class: "height-120" }, "col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 4 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="height-80" data-v-3a632e5e${_scopeId2}>col-4</p>`);
                } else {
                  return [
                    createVNode("p", { class: "height-80" }, "col-4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createVNode("p", { class: "height-100" }, "col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createVNode("p", { class: "height-50" }, "col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createVNode("p", { class: "height-120" }, "col-4")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 4 }, {
                default: withCtx(() => [
                  createVNode("p", { class: "height-80" }, "col-4")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-3a632e5e><summary data-v-3a632e5e>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-3a632e5e><button title="Copy Code" class="copy" data-v-3a632e5e></button><span class="lang" data-v-3a632e5e>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-3a632e5e><code data-v-3a632e5e><span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> orientation</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;left&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;Align Top&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>background</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>rgba</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>(</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>128</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>,</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>128</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>,</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>128</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>,</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>.08</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>);</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> justify</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;center&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#B31D28", "--shiki-light-font-style": "italic", "--shiki-dark": "#FDAEB7", "--shiki-dark-font-style": "italic" })}" data-v-3a632e5e> align</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;top&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;height-100&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;height-50&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;height-120&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;height-80&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> orientation</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;left&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;Align Middle&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>background</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>rgba</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>(</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>128</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>,</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>128</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>,</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>128</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>,</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>.08</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>);</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> justify</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;space-around&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#B31D28", "--shiki-light-font-style": "italic", "--shiki-dark": "#FDAEB7", "--shiki-dark-font-style": "italic" })}" data-v-3a632e5e> align</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;middle&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;height-100&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;height-50&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;height-120&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;height-80&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> orientation</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;left&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;Align Bottom&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>background</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>rgba</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>(</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>128</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>,</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>128</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>,</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>128</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>,</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>.08</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>);</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> justify</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;space-between&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#B31D28", "--shiki-light-font-style": "italic", "--shiki-dark": "#FDAEB7", "--shiki-dark-font-style": "italic" })}" data-v-3a632e5e> align</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;bottom&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;height-100&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;height-50&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;height-120&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;height-80&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;col-4&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;less&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> scoped</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>.row {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  .grid-col {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    min-height: 30px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    margin-top: 8px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    margin-bottom: 8px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    color: #fff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    text-align: center;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    border-radius: 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    padding: 16px 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    background: #1677ff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  :deep(&gt; :nth-child(2n + 1)) {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    background: #1677ffbf;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>}</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>.height-50 {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  height: 50px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  line-height: 50px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>}</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>.height-80 {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  height: 80px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  line-height: 80px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>}</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>.height-100 {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  height: 100px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  line-height: 100px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>}</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>.height-120 {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  height: 120px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  line-height: 120px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>}</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span></code></pre></div></details><h2 id="flex-填充" tabindex="-1" data-v-3a632e5e>flex 填充 <a class="header-anchor" href="#flex-填充" aria-label="Permalink to &quot;flex 填充&quot;" data-v-3a632e5e>​</a></h2>`);
      _push(ssrRenderComponent(_component_Divider, { orientation: "left" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Percentage columns`);
          } else {
            return [
              createTextVNode("Percentage columns")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Row, { class: "row" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, { flex: 2 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`2 / 5`);
                } else {
                  return [
                    createTextVNode("2 / 5")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { flex: 3 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`3 / 5`);
                } else {
                  return [
                    createTextVNode("3 / 5")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, { flex: 2 }, {
                default: withCtx(() => [
                  createTextVNode("2 / 5")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { flex: 3 }, {
                default: withCtx(() => [
                  createTextVNode("3 / 5")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Divider, { orientation: "left" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Fill rest`);
          } else {
            return [
              createTextVNode("Fill rest")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Row, { class: "row" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, { flex: "0 0 100px" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`100px`);
                } else {
                  return [
                    createTextVNode("100px")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { flex: "auto" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`auto`);
                } else {
                  return [
                    createTextVNode("auto")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, { flex: "0 0 100px" }, {
                default: withCtx(() => [
                  createTextVNode("100px")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { flex: "auto" }, {
                default: withCtx(() => [
                  createTextVNode("auto")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Divider, { orientation: "left" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Raw flex style`);
          } else {
            return [
              createTextVNode("Raw flex style")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Row, { class: "row" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, { flex: "1 1 200px" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`1 1 200px`);
                } else {
                  return [
                    createTextVNode("1 1 200px")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { flex: "0 1 300px" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`0 1 300px`);
                } else {
                  return [
                    createTextVNode("0 1 300px")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, { flex: "1 1 200px" }, {
                default: withCtx(() => [
                  createTextVNode("1 1 200px")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { flex: "0 1 300px" }, {
                default: withCtx(() => [
                  createTextVNode("0 1 300px")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Row, { class: "row" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, { flex: "none" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div style="${ssrRenderStyle({ "padding": "0 16px" })}" data-v-3a632e5e${_scopeId2}>none</div>`);
                } else {
                  return [
                    createVNode("div", { style: { "padding": "0 16px" } }, "none")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { flex: "auto" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`auto with no-wrap`);
                } else {
                  return [
                    createTextVNode("auto with no-wrap")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, { flex: "none" }, {
                default: withCtx(() => [
                  createVNode("div", { style: { "padding": "0 16px" } }, "none")
                ]),
                _: 1
              }),
              createVNode(_component_Col, { flex: "auto" }, {
                default: withCtx(() => [
                  createTextVNode("auto with no-wrap")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-3a632e5e><summary data-v-3a632e5e>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-3a632e5e><button title="Copy Code" class="copy" data-v-3a632e5e></button><span class="lang" data-v-3a632e5e>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-3a632e5e><code data-v-3a632e5e><span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> orientation</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;left&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;Percentage columns&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>2</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;2 / 5&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>3</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;3 / 5&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> orientation</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;left&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;Fill rest&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;0 0 100px&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;100px&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;auto&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;auto&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> orientation</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;left&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;Raw flex style&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Divider</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;1 1 200px&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;1 1 200px&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;0 1 300px&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;0 1 300px&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;none&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>padding</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>0</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e> 16</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-3a632e5e>px</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;none&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;auto&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;auto with no-wrap&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;less&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> scoped</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>.row {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  .grid-col {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    min-height: 30px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    margin-top: 8px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    margin-bottom: 8px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    color: #fff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    text-align: center;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    border-radius: 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    padding: 16px 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    background: #1677ff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  :deep(&gt; :nth-child(2n + 1)) {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    background: #1677ffbf;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>}</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span></code></pre></div></details><h2 id="响应式布局" tabindex="-1" data-v-3a632e5e>响应式布局 <a class="header-anchor" href="#响应式布局" aria-label="Permalink to &quot;响应式布局&quot;" data-v-3a632e5e>​</a></h2>`);
      _push(ssrRenderComponent(_component_Row, { class: "row" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, {
              xs: 2,
              sm: 4,
              md: 6,
              lg: 8,
              xl: 10
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Col`);
                } else {
                  return [
                    createTextVNode("Col")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              xs: 20,
              sm: 16,
              md: 12,
              lg: 8,
              xl: 4
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Col`);
                } else {
                  return [
                    createTextVNode("Col")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              xs: 2,
              sm: 4,
              md: 6,
              lg: 8,
              xl: 10
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Col`);
                } else {
                  return [
                    createTextVNode("Col")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, {
                xs: 2,
                sm: 4,
                md: 6,
                lg: 8,
                xl: 10
              }, {
                default: withCtx(() => [
                  createTextVNode("Col")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                xs: 20,
                sm: 16,
                md: 12,
                lg: 8,
                xl: 4
              }, {
                default: withCtx(() => [
                  createTextVNode("Col")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                xs: 2,
                sm: 4,
                md: 6,
                lg: 8,
                xl: 10
              }, {
                default: withCtx(() => [
                  createTextVNode("Col")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-3a632e5e><summary data-v-3a632e5e>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-3a632e5e><button title="Copy Code" class="copy" data-v-3a632e5e></button><span class="lang" data-v-3a632e5e>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-3a632e5e><code data-v-3a632e5e><span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>xs</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>2</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>sm</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>md</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>lg</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>8</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>xl</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>10</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;Col&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>xs</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>20</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>sm</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>16</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>md</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>12</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>lg</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>8</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>xl</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;Col&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>xs</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>2</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>sm</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>md</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>lg</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>8</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>xl</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>10</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;Col&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;less&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> scoped</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>.row {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  .grid-col {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    min-height: 30px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    margin-top: 8px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    margin-bottom: 8px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    color: #fff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    text-align: center;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    border-radius: 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    padding: 16px 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    background: #1677ff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  :deep(&gt; :nth-child(2n + 1)) {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    background: #1677ffbf;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>}</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span></code></pre></div></details><h2 id="span-和-offset-属性的响应式" tabindex="-1" data-v-3a632e5e>span 和 offset 属性的响应式 <a class="header-anchor" href="#span-和-offset-属性的响应式" aria-label="Permalink to &quot;span 和 offset 属性的响应式&quot;" data-v-3a632e5e>​</a></h2>`);
      _push(ssrRenderComponent(_component_Row, { class: "row" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, {
              xs: { span: 5, offset: 1 },
              sm: { span: 6, offset: 2 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Col`);
                } else {
                  return [
                    createTextVNode("Col")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              xs: { span: 11, offset: 1 },
              sm: { span: 6, offset: 2 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Col`);
                } else {
                  return [
                    createTextVNode("Col")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, {
              xs: { span: 5, offset: 1 },
              sm: { span: 6, offset: 2 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Col`);
                } else {
                  return [
                    createTextVNode("Col")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, {
                xs: { span: 5, offset: 1 },
                sm: { span: 6, offset: 2 }
              }, {
                default: withCtx(() => [
                  createTextVNode("Col")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                xs: { span: 11, offset: 1 },
                sm: { span: 6, offset: 2 }
              }, {
                default: withCtx(() => [
                  createTextVNode("Col")
                ]),
                _: 1
              }),
              createVNode(_component_Col, {
                xs: { span: 5, offset: 1 },
                sm: { span: 6, offset: 2 }
              }, {
                default: withCtx(() => [
                  createTextVNode("Col")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-3a632e5e><summary data-v-3a632e5e>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-3a632e5e><button title="Copy Code" class="copy" data-v-3a632e5e></button><span class="lang" data-v-3a632e5e>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-3a632e5e><code data-v-3a632e5e><span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>xs</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>{ span: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>5</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>, offset: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>1</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>sm</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>{ span: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>, offset: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>2</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;Col&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>xs</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>{ span: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>11</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>, offset: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>1</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>sm</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>{ span: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>, offset: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>2</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;Col&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>xs</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>{ span: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>5</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>, offset: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>1</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>sm</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>{ span: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>, offset: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>2</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;Col&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;less&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> scoped</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>.row {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  .grid-col {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    min-height: 30px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    margin-top: 8px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    margin-bottom: 8px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    color: #fff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    text-align: center;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    border-radius: 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    padding: 16px 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    background: #1677ff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  :deep(&gt; :nth-child(2n + 1)) {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    background: #1677ffbf;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>}</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span></code></pre></div></details><h2 id="栅格配置器" tabindex="-1" data-v-3a632e5e>栅格配置器 <a class="header-anchor" href="#栅格配置器" aria-label="Permalink to &quot;栅格配置器&quot;" data-v-3a632e5e>​</a></h2>`);
      _push(ssrRenderComponent(_component_Row, { gutter: 24 }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Flex, {
                    vertical: "",
                    align: "flex-start"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Horizontal Column Gutter: `);
                        _push4(ssrRenderComponent(_component_Slider, {
                          step: 8,
                          max: 48,
                          value: state.horizontalGutter,
                          "onUpdate:value": ($event) => state.horizontalGutter = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(" Horizontal Column Gutter: "),
                          createVNode(_component_Slider, {
                            step: 8,
                            max: 48,
                            value: state.horizontalGutter,
                            "onUpdate:value": ($event) => state.horizontalGutter = $event
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Flex, {
                      vertical: "",
                      align: "flex-start"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Horizontal Column Gutter: "),
                        createVNode(_component_Slider, {
                          step: 8,
                          max: 48,
                          value: state.horizontalGutter,
                          "onUpdate:value": ($event) => state.horizontalGutter = $event
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Flex, {
                    vertical: "",
                    align: "flex-start"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Vertical Row Gutter: `);
                        _push4(ssrRenderComponent(_component_Slider, {
                          step: 8,
                          max: 48,
                          value: state.verticalGutter,
                          "onUpdate:value": ($event) => state.verticalGutter = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(" Vertical Row Gutter: "),
                          createVNode(_component_Slider, {
                            step: 8,
                            max: 48,
                            value: state.verticalGutter,
                            "onUpdate:value": ($event) => state.verticalGutter = $event
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Flex, {
                      vertical: "",
                      align: "flex-start"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Vertical Row Gutter: "),
                        createVNode(_component_Slider, {
                          step: 8,
                          max: 48,
                          value: state.verticalGutter,
                          "onUpdate:value": ($event) => state.verticalGutter = $event
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Flex, {
                    vertical: "",
                    align: "flex-start"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Col Count: `);
                        _push4(ssrRenderComponent(_component_Radio, {
                          options: colCountOptions,
                          value: state.colCount,
                          "onUpdate:value": ($event) => state.colCount = $event,
                          button: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(" Col Count: "),
                          createVNode(_component_Radio, {
                            options: colCountOptions,
                            value: state.colCount,
                            "onUpdate:value": ($event) => state.colCount = $event,
                            button: ""
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Flex, {
                      vertical: "",
                      align: "flex-start"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Col Count: "),
                        createVNode(_component_Radio, {
                          options: colCountOptions,
                          value: state.colCount,
                          "onUpdate:value": ($event) => state.colCount = $event,
                          button: ""
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_Flex, {
                    vertical: "",
                    align: "flex-start"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Horizontal Column Gutter: "),
                      createVNode(_component_Slider, {
                        step: 8,
                        max: 48,
                        value: state.horizontalGutter,
                        "onUpdate:value": ($event) => state.horizontalGutter = $event
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_Flex, {
                    vertical: "",
                    align: "flex-start"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Vertical Row Gutter: "),
                      createVNode(_component_Slider, {
                        step: 8,
                        max: 48,
                        value: state.verticalGutter,
                        "onUpdate:value": ($event) => state.verticalGutter = $event
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode(_component_Flex, {
                    vertical: "",
                    align: "flex-start"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Col Count: "),
                      createVNode(_component_Radio, {
                        options: colCountOptions,
                        value: state.colCount,
                        "onUpdate:value": ($event) => state.colCount = $event,
                        button: ""
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Row, {
        class: "mt30",
        gutter: [state.horizontalGutter, state.verticalGutter]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(state.colCount, (n) => {
              _push2(ssrRenderComponent(_component_Col, {
                class: "gutter-row",
                key: n,
                span: 24 / state.colCount
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>Col-${ssrInterpolate(24 / state.colCount)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "gutter-box" }, "Col-" + toDisplayString(24 / state.colCount), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--><!--[-->`);
            ssrRenderList(state.colCount, (n) => {
              _push2(ssrRenderComponent(_component_Col, {
                class: "gutter-row",
                key: n,
                span: 24 / state.colCount
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>Col-${ssrInterpolate(24 / state.colCount)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "gutter-box" }, "Col-" + toDisplayString(24 / state.colCount), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--><!--[-->`);
            ssrRenderList(state.colCount, (n) => {
              _push2(ssrRenderComponent(_component_Col, {
                class: "gutter-row",
                key: n,
                span: 24 / state.colCount
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="gutter-box" data-v-3a632e5e${_scopeId2}>Col-${ssrInterpolate(24 / state.colCount)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "gutter-box" }, "Col-" + toDisplayString(24 / state.colCount), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(state.colCount, (n) => {
                return openBlock(), createBlock(_component_Col, {
                  class: "gutter-row",
                  key: n,
                  span: 24 / state.colCount
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "gutter-box" }, "Col-" + toDisplayString(24 / state.colCount), 1)
                  ]),
                  _: 2
                }, 1032, ["span"]);
              }), 128)),
              (openBlock(true), createBlock(Fragment, null, renderList(state.colCount, (n) => {
                return openBlock(), createBlock(_component_Col, {
                  class: "gutter-row",
                  key: n,
                  span: 24 / state.colCount
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "gutter-box" }, "Col-" + toDisplayString(24 / state.colCount), 1)
                  ]),
                  _: 2
                }, 1032, ["span"]);
              }), 128)),
              (openBlock(true), createBlock(Fragment, null, renderList(state.colCount, (n) => {
                return openBlock(), createBlock(_component_Col, {
                  class: "gutter-row",
                  key: n,
                  span: 24 / state.colCount
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "gutter-box" }, "Col-" + toDisplayString(24 / state.colCount), 1)
                  ]),
                  _: 2
                }, 1032, ["span"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-3a632e5e><summary data-v-3a632e5e>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-3a632e5e><button title="Copy Code" class="copy" data-v-3a632e5e></button><span class="lang" data-v-3a632e5e>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-3a632e5e><code data-v-3a632e5e><span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> setup</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;ts&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-3a632e5e>import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> { reactive } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-3a632e5e>from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e> &#39;vue&#39;</span></span>
<span class="line" data-v-3a632e5e></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-3a632e5e>const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e> colCountOptions</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-3a632e5e> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> [</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    label: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>2</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>,</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    value: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>2</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  },</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    label: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>3</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>,</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    value: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>3</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  },</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    label: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>,</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    value: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  },</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    label: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>,</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    value: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  },</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    label: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>8</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>,</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    value: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>8</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  },</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    label: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>12</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>,</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    value: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>12</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  },</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    label: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>24</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>,</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    value: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>24</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>]</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-3a632e5e>const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e> state</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-3a632e5e> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> reactive</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>({</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  horizontalGutter: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>16</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>,</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  verticalGutter: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>16</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>,</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  colCount: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>4</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>})</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>gutter</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>24</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> vertical</span><span style="${ssrRenderStyle({ "--shiki-light": "#B31D28", "--shiki-light-font-style": "italic", "--shiki-dark": "#FDAEB7", "--shiki-dark-font-style": "italic" })}" data-v-3a632e5e> align</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;flex-start&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>        Horizontal Column Gutter:</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Slider</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>step</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>8</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>max</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>48</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> v-model</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>state.horizontalGutter</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> /&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>6</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> vertical</span><span style="${ssrRenderStyle({ "--shiki-light": "#B31D28", "--shiki-light-font-style": "italic", "--shiki-dark": "#FDAEB7", "--shiki-dark-font-style": "italic" })}" data-v-3a632e5e> align</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;flex-start&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>        Vertical Row Gutter:</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Slider</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>step</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>8</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>max</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>48</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> v-model</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>state.verticalGutter</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> /&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>12</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> vertical</span><span style="${ssrRenderStyle({ "--shiki-light": "#B31D28", "--shiki-light-font-style": "italic", "--shiki-dark": "#FDAEB7", "--shiki-dark-font-style": "italic" })}" data-v-3a632e5e> align</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;flex-start&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>        Col Count:</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Radio</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>options</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>colCountOptions</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> v-model</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>state.colCount</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> /&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;mt30&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>gutter</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>[state.horizontalGutter, state.verticalGutter]</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-3a632e5e> v-for</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>n </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-3a632e5e>in</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> state.colCount</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>key</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>n</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>24</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-3a632e5e> /</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> state.colCount</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;Col-{{ </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>24</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-3a632e5e> /</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> state.colCount }}&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-3a632e5e> v-for</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>n </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-3a632e5e>in</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> state.colCount</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>key</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>n</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>24</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-3a632e5e> /</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> state.colCount</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;Col-{{ </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>24</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-3a632e5e> /</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> state.colCount }}&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-row&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-3a632e5e> v-for</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>n </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-3a632e5e>in</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> state.colCount</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>key</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>n</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>24</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-3a632e5e> /</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> state.colCount</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;gutter-box&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;Col-{{ </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-3a632e5e>24</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-3a632e5e> /</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e> state.colCount }}&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Col</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>Row</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-3a632e5e>&quot;less&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-3a632e5e> scoped</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>.mt30 {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  margin-top: 30px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>}</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>.gutter-row {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  .grid-col {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    min-height: 30px;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    color: #fff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    text-align: center;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    border-radius: 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  .gutter-box {</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    background: #0092ff;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>    padding: 8px 0;</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>  }</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>}</span></span>
<span class="line" data-v-3a632e5e><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-3a632e5e>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-3a632e5e>&gt;</span></span></code></pre></div></details><h2 id="apis" tabindex="-1" data-v-3a632e5e>APIs <a class="header-anchor" href="#apis" aria-label="Permalink to &quot;APIs&quot;" data-v-3a632e5e>​</a></h2><h3 id="row" tabindex="-1" data-v-3a632e5e>Row <a class="header-anchor" href="#row" aria-label="Permalink to &quot;Row&quot;" data-v-3a632e5e>​</a></h3><table tabindex="0" data-v-3a632e5e><thead data-v-3a632e5e><tr data-v-3a632e5e><th data-v-3a632e5e>参数</th><th data-v-3a632e5e>说明</th><th data-v-3a632e5e>类型</th><th data-v-3a632e5e>默认值</th></tr></thead><tbody data-v-3a632e5e><tr data-v-3a632e5e><td data-v-3a632e5e>width</td><td data-v-3a632e5e>行宽度，单位 <code data-v-3a632e5e>px</code></td><td data-v-3a632e5e>string | number</td><td data-v-3a632e5e>&#39;auto&#39;</td></tr><tr data-v-3a632e5e><td data-v-3a632e5e>gutter</td><td data-v-3a632e5e>栅格间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔 <code data-v-3a632e5e>{ xs: 8, sm: 16, md: 24}</code>。或者使用数组形式同时设置 <code data-v-3a632e5e>[水平间距, 垂直间距]</code></td><td data-v-3a632e5e>number | [number | <a href="#responsive-type" data-v-3a632e5e>Responsive</a>, number | <a href="#responsive-type" data-v-3a632e5e>Responsive</a>] | <a href="#responsive-type" data-v-3a632e5e>Responsive</a></td><td data-v-3a632e5e>0</td></tr><tr data-v-3a632e5e><td data-v-3a632e5e>wrap</td><td data-v-3a632e5e>是否自动换行</td><td data-v-3a632e5e>boolean</td><td data-v-3a632e5e>false</td></tr><tr data-v-3a632e5e><td data-v-3a632e5e>align</td><td data-v-3a632e5e>垂直对齐方式</td><td data-v-3a632e5e>&#39;top&#39; | &#39;middle&#39; | &#39;bottom&#39; | &#39;stretch&#39;</td><td data-v-3a632e5e>&#39;top&#39;</td></tr><tr data-v-3a632e5e><td data-v-3a632e5e>justify</td><td data-v-3a632e5e>水平排列方式</td><td data-v-3a632e5e>&#39;start&#39; | &#39;end&#39; | &#39;center&#39; | &#39;space-around&#39; | &#39;space-between&#39; | &#39;space-evenly&#39;</td><td data-v-3a632e5e>&#39;start&#39;</td></tr></tbody></table><h3 id="responsive-type" tabindex="-1" data-v-3a632e5e>Responsive Type <a class="header-anchor" href="#responsive-type" aria-label="Permalink to &quot;Responsive Type&quot;" data-v-3a632e5e>​</a></h3><table tabindex="0" data-v-3a632e5e><thead data-v-3a632e5e><tr data-v-3a632e5e><th data-v-3a632e5e>名称</th><th data-v-3a632e5e>说明</th><th data-v-3a632e5e>类型</th><th data-v-3a632e5e>默认值</th></tr></thead><tbody data-v-3a632e5e><tr data-v-3a632e5e><td data-v-3a632e5e>xs</td><td data-v-3a632e5e><code data-v-3a632e5e>&lt;576px</code> 响应式栅格</td><td data-v-3a632e5e>number</td><td data-v-3a632e5e>undefined</td></tr><tr data-v-3a632e5e><td data-v-3a632e5e>sm</td><td data-v-3a632e5e><code data-v-3a632e5e>≥576px</code> 响应式栅格</td><td data-v-3a632e5e>number</td><td data-v-3a632e5e>undefined</td></tr><tr data-v-3a632e5e><td data-v-3a632e5e>md</td><td data-v-3a632e5e><code data-v-3a632e5e>≥768px</code> 响应式栅格</td><td data-v-3a632e5e>number</td><td data-v-3a632e5e>undefined</td></tr><tr data-v-3a632e5e><td data-v-3a632e5e>lg</td><td data-v-3a632e5e><code data-v-3a632e5e>≥992px</code> 响应式栅格</td><td data-v-3a632e5e>number</td><td data-v-3a632e5e>undefined</td></tr><tr data-v-3a632e5e><td data-v-3a632e5e>xl</td><td data-v-3a632e5e><code data-v-3a632e5e>≥1200px</code> 响应式栅格</td><td data-v-3a632e5e>number</td><td data-v-3a632e5e>undefined</td></tr><tr data-v-3a632e5e><td data-v-3a632e5e>xxl</td><td data-v-3a632e5e><code data-v-3a632e5e>≥1600px</code> 响应式栅格</td><td data-v-3a632e5e>number</td><td data-v-3a632e5e>undefined</td></tr></tbody></table><h3 id="col" tabindex="-1" data-v-3a632e5e>Col <a class="header-anchor" href="#col" aria-label="Permalink to &quot;Col&quot;" data-v-3a632e5e>​</a></h3><table tabindex="0" data-v-3a632e5e><thead data-v-3a632e5e><tr data-v-3a632e5e><th data-v-3a632e5e>参数</th><th data-v-3a632e5e>说明</th><th data-v-3a632e5e>类型</th><th data-v-3a632e5e>默认值</th></tr></thead><tbody data-v-3a632e5e><tr data-v-3a632e5e><td data-v-3a632e5e>span</td><td data-v-3a632e5e>栅格占位格数，取 <code data-v-3a632e5e>0,1,2...24</code>，为 <code data-v-3a632e5e>0</code> 时相当于 <code data-v-3a632e5e>display: none</code>，优先级低于 <code data-v-3a632e5e>xs</code>, <code data-v-3a632e5e>sm</code>, <code data-v-3a632e5e>md</code>, <code data-v-3a632e5e>lg</code>, <code data-v-3a632e5e>xl</code>, <code data-v-3a632e5e>xxl</code></td><td data-v-3a632e5e>number</td><td data-v-3a632e5e>undefined</td></tr><tr data-v-3a632e5e><td data-v-3a632e5e>offset</td><td data-v-3a632e5e>栅格左侧的间隔格数，取 <code data-v-3a632e5e>0,1,2...24</code></td><td data-v-3a632e5e>number</td><td data-v-3a632e5e>0</td></tr><tr data-v-3a632e5e><td data-v-3a632e5e>flex</td><td data-v-3a632e5e><code data-v-3a632e5e>flex</code> 布局填充</td><td data-v-3a632e5e>string | number</td><td data-v-3a632e5e>undefined</td></tr><tr data-v-3a632e5e><td data-v-3a632e5e>order</td><td data-v-3a632e5e>栅格顺序，取 <code data-v-3a632e5e>0,1,2...</code></td><td data-v-3a632e5e>number</td><td data-v-3a632e5e>0</td></tr><tr data-v-3a632e5e><td data-v-3a632e5e>xs</td><td data-v-3a632e5e><code data-v-3a632e5e>&lt;576px</code> 响应式栅格</td><td data-v-3a632e5e>number | {span?: number, offset?: number}</td><td data-v-3a632e5e>undefined</td></tr><tr data-v-3a632e5e><td data-v-3a632e5e>sm</td><td data-v-3a632e5e><code data-v-3a632e5e>≥576px</code> 响应式栅格</td><td data-v-3a632e5e>number | {span?: number, offset?: number}</td><td data-v-3a632e5e>undefined</td></tr><tr data-v-3a632e5e><td data-v-3a632e5e>md</td><td data-v-3a632e5e><code data-v-3a632e5e>≥768px</code> 响应式栅格</td><td data-v-3a632e5e>number | {span?: number, offset?: number}</td><td data-v-3a632e5e>undefined</td></tr><tr data-v-3a632e5e><td data-v-3a632e5e>lg</td><td data-v-3a632e5e><code data-v-3a632e5e>≥992px</code> 响应式栅格</td><td data-v-3a632e5e>number | {span?: number, offset?: number}</td><td data-v-3a632e5e>undefined</td></tr><tr data-v-3a632e5e><td data-v-3a632e5e>xl</td><td data-v-3a632e5e><code data-v-3a632e5e>≥1200px</code> 响应式栅格</td><td data-v-3a632e5e>number | {span?: number, offset?: number}</td><td data-v-3a632e5e>undefined</td></tr><tr data-v-3a632e5e><td data-v-3a632e5e>xxl</td><td data-v-3a632e5e><code data-v-3a632e5e>≥1600px</code> 响应式栅格</td><td data-v-3a632e5e>number | {span?: number, offset?: number}</td><td data-v-3a632e5e>undefined</td></tr></tbody></table></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/components/grid.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const grid = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3a632e5e"]]);
export {
  __pageData,
  grid as default
};
