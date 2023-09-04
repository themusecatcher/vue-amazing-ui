import { resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
const grid_md_vue_type_style_index_0_scoped_2dfdbcf7_lang = "";
const __pageData = JSON.parse('{"title":"栅格 Grid","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/grid.md","filePath":"guide/components/grid.md"}');
const _sfc_main = { name: "guide/components/grid.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Row = resolveComponent("Row");
  const _component_Col = resolveComponent("Col");
  const _component_Divider = resolveComponent("Divider");
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-2dfdbcf7><h1 id="栅格-grid" tabindex="-1" data-v-2dfdbcf7>栅格 Grid <a class="header-anchor" href="#栅格-grid" aria-label="Permalink to &quot;栅格 Grid&quot;" data-v-2dfdbcf7>​</a></h1><br data-v-2dfdbcf7><p data-v-2dfdbcf7><em data-v-2dfdbcf7>24 栅格系统</em></p><h2 id="基本使用" tabindex="-1" data-v-2dfdbcf7>基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;" data-v-2dfdbcf7>​</a></h2>`);
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
  _push(`<details class="details custom-block" data-v-2dfdbcf7><summary data-v-2dfdbcf7>Show Code</summary><div class="language-vue" data-v-2dfdbcf7><button title="Copy Code" class="copy" data-v-2dfdbcf7></button><span class="lang" data-v-2dfdbcf7>vue</span><pre class="shiki material-theme-palenight" data-v-2dfdbcf7><code data-v-2dfdbcf7><span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>24</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>12</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-12</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>12</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-12</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>8</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-8</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>8</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-8</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>8</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-8</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span></code></pre></div></details><h2 id="水平区块间隔" tabindex="-1" data-v-2dfdbcf7>水平区块间隔 <a class="header-anchor" href="#水平区块间隔" aria-label="Permalink to &quot;水平区块间隔&quot;" data-v-2dfdbcf7>​</a></h2>`);
  _push(ssrRenderComponent(_component_Row, { gutter: 16 }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_Col, {
          class: "gutter-row",
          span: 6
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
  _push(`<details class="details custom-block" data-v-2dfdbcf7><summary data-v-2dfdbcf7>Show Code</summary><div class="language-vue" data-v-2dfdbcf7><button title="Copy Code" class="copy" data-v-2dfdbcf7></button><span class="lang" data-v-2dfdbcf7>vue</span><pre class="shiki material-theme-palenight" data-v-2dfdbcf7><code data-v-2dfdbcf7><span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:gutter</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>16</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span></code></pre></div></details><h2 id="响应式区块间隔" tabindex="-1" data-v-2dfdbcf7>响应式区块间隔 <a class="header-anchor" href="#响应式区块间隔" aria-label="Permalink to &quot;响应式区块间隔&quot;" data-v-2dfdbcf7>​</a></h2>`);
  _push(ssrRenderComponent(_component_Row, { gutter: { xs: 8, sm: 16, md: 24, lg: 32 } }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_Col, {
          class: "gutter-row",
          span: 6
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
  _push(`<details class="details custom-block" data-v-2dfdbcf7><summary data-v-2dfdbcf7>Show Code</summary><div class="language-vue" data-v-2dfdbcf7><button title="Copy Code" class="copy" data-v-2dfdbcf7></button><span class="lang" data-v-2dfdbcf7>vue</span><pre class="shiki material-theme-palenight" data-v-2dfdbcf7><code data-v-2dfdbcf7><span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:gutter</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>{ xs: 8, sm: 16, md: 24, lg: 32 }</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span></code></pre></div></details><h2 id="垂直区块间隔" tabindex="-1" data-v-2dfdbcf7>垂直区块间隔 <a class="header-anchor" href="#垂直区块间隔" aria-label="Permalink to &quot;垂直区块间隔&quot;" data-v-2dfdbcf7>​</a></h2>`);
  _push(ssrRenderComponent(_component_Row, { gutter: [16, 24] }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_Col, {
          class: "gutter-row",
          span: 6
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
  _push(`<details class="details custom-block" data-v-2dfdbcf7><summary data-v-2dfdbcf7>Show Code</summary><div class="language-vue" data-v-2dfdbcf7><button title="Copy Code" class="copy" data-v-2dfdbcf7></button><span class="lang" data-v-2dfdbcf7>vue</span><pre class="shiki material-theme-palenight" data-v-2dfdbcf7><code data-v-2dfdbcf7><span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:gutter</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>[16, 24]</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span></code></pre></div></details><h2 id="响应式垂直区块间隔" tabindex="-1" data-v-2dfdbcf7>响应式垂直区块间隔 <a class="header-anchor" href="#响应式垂直区块间隔" aria-label="Permalink to &quot;响应式垂直区块间隔&quot;" data-v-2dfdbcf7>​</a></h2>`);
  _push(ssrRenderComponent(_component_Row, { gutter: [16, { xs: 8, sm: 16, md: 24, lg: 32 }] }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_Col, {
          class: "gutter-row",
          span: 6
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
              _push3(`<div class="gutter-box" data-v-2dfdbcf7${_scopeId2}>col-6</div>`);
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
  _push(`<details class="details custom-block" data-v-2dfdbcf7><summary data-v-2dfdbcf7>Show Code</summary><div class="language-vue" data-v-2dfdbcf7><button title="Copy Code" class="copy" data-v-2dfdbcf7></button><span class="lang" data-v-2dfdbcf7>vue</span><pre class="shiki material-theme-palenight" data-v-2dfdbcf7><code data-v-2dfdbcf7><span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:gutter</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>[16, { xs: 8, sm: 16, md: 24, lg: 32 }]</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>gutter-box</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span></code></pre></div></details><h2 id="左右偏移" tabindex="-1" data-v-2dfdbcf7>左右偏移 <a class="header-anchor" href="#左右偏移" aria-label="Permalink to &quot;左右偏移&quot;" data-v-2dfdbcf7>​</a></h2>`);
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
  _push(`<details class="details custom-block" data-v-2dfdbcf7><summary data-v-2dfdbcf7>Show Code</summary><div class="language-vue" data-v-2dfdbcf7><button title="Copy Code" class="copy" data-v-2dfdbcf7></button><span class="lang" data-v-2dfdbcf7>vue</span><pre class="shiki material-theme-palenight" data-v-2dfdbcf7><code data-v-2dfdbcf7><span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>8</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-8</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>8</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:offset</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>8</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-8</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:offset</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6 col-offset-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:offset</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-6 col-offset-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>12</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:offset</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-12 col-offset-6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span></code></pre></div></details><h2 id="排版方式" tabindex="-1" data-v-2dfdbcf7>排版方式 <a class="header-anchor" href="#排版方式" aria-label="Permalink to &quot;排版方式&quot;" data-v-2dfdbcf7>​</a></h2>`);
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
  _push(`<details class="details custom-block" data-v-2dfdbcf7><summary data-v-2dfdbcf7>Show Code</summary><div class="language-vue" data-v-2dfdbcf7><button title="Copy Code" class="copy" data-v-2dfdbcf7></button><span class="lang" data-v-2dfdbcf7>vue</span><pre class="shiki material-theme-palenight" data-v-2dfdbcf7><code data-v-2dfdbcf7><span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>orientation</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>left</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>sub-element align left</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>justify</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>start</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>orientation</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>left</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>sub-element align center</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>justify</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>center</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>orientation</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>left</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>sub-element align right</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>justify</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>end</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>orientation</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>left</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>sub-element align space-between</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>justify</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>space-between</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>orientation</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>left</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>sub-element align space-around</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>justify</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>space-around</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>orientation</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>left</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>sub-element align space-evenly</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>justify</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>space-evenly</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span></code></pre></div></details><h2 id="对齐方式" tabindex="-1" data-v-2dfdbcf7>对齐方式 <a class="header-anchor" href="#对齐方式" aria-label="Permalink to &quot;对齐方式&quot;" data-v-2dfdbcf7>​</a></h2>`);
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
              _push3(`<p class="height-100" data-v-2dfdbcf7${_scopeId2}>col-4</p>`);
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
              _push3(`<p class="height-50" data-v-2dfdbcf7${_scopeId2}>col-4</p>`);
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
              _push3(`<p class="height-120" data-v-2dfdbcf7${_scopeId2}>col-4</p>`);
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
              _push3(`<p class="height-80" data-v-2dfdbcf7${_scopeId2}>col-4</p>`);
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
              _push3(`<p class="height-100" data-v-2dfdbcf7${_scopeId2}>col-4</p>`);
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
              _push3(`<p class="height-50" data-v-2dfdbcf7${_scopeId2}>col-4</p>`);
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
              _push3(`<p class="height-120" data-v-2dfdbcf7${_scopeId2}>col-4</p>`);
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
              _push3(`<p class="height-80" data-v-2dfdbcf7${_scopeId2}>col-4</p>`);
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
              _push3(`<p class="height-100" data-v-2dfdbcf7${_scopeId2}>col-4</p>`);
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
              _push3(`<p class="height-50" data-v-2dfdbcf7${_scopeId2}>col-4</p>`);
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
              _push3(`<p class="height-120" data-v-2dfdbcf7${_scopeId2}>col-4</p>`);
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
              _push3(`<p class="height-80" data-v-2dfdbcf7${_scopeId2}>col-4</p>`);
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
  _push(`<details class="details custom-block" data-v-2dfdbcf7><summary data-v-2dfdbcf7>Show Code</summary><div class="language-vue" data-v-2dfdbcf7><button title="Copy Code" class="copy" data-v-2dfdbcf7></button><span class="lang" data-v-2dfdbcf7>vue</span><pre class="shiki material-theme-palenight" data-v-2dfdbcf7><code data-v-2dfdbcf7><span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>orientation</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>left</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>Align Top</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>style</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>background: rgba(128,128,128,.08);</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>justify</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>center</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>align</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>top</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>height-100</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>height-50</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>height-120</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>height-80</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>orientation</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>left</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>Align Middle</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>style</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>background: rgba(128,128,128,.08);</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>justify</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>space-around</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>align</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>middle</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>height-100</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>height-50</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>height-120</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>height-80</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>orientation</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>left</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>Align Bottom</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>style</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>background: rgba(128,128,128,.08);</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>justify</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>space-between</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>align</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>bottom</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>height-100</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>height-50</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>height-120</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>height-80</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>col-4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>p</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span></code></pre></div></details><h2 id="flex-填充" tabindex="-1" data-v-2dfdbcf7>flex 填充 <a class="header-anchor" href="#flex-填充" aria-label="Permalink to &quot;flex 填充&quot;" data-v-2dfdbcf7>​</a></h2>`);
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
              _push3(`<div style="${ssrRenderStyle({ "padding": "0 16px" })}" data-v-2dfdbcf7${_scopeId2}>none</div>`);
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
  _push(`<details class="details custom-block" data-v-2dfdbcf7><summary data-v-2dfdbcf7>Show Code</summary><div class="language-vue" data-v-2dfdbcf7><button title="Copy Code" class="copy" data-v-2dfdbcf7></button><span class="lang" data-v-2dfdbcf7>vue</span><pre class="shiki material-theme-palenight" data-v-2dfdbcf7><code data-v-2dfdbcf7><span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>orientation</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>left</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>Percentage columns</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:flex</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>2</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>2 / 5</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:flex</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>3</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>3 / 5</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>orientation</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>left</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>Fill rest</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>flex</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>0 0 100px</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>100px</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>flex</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>auto</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>auto</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>orientation</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>left</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>Raw flex style</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>flex</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>1 1 200px</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>1 1 200px</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>flex</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>0 1 300px</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>0 1 300px</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>flex</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>none</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>style</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>padding: 0 16px</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>none</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>flex</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>auto</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>auto with no-wrap</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span></code></pre></div></details><h2 id="响应式布局" tabindex="-1" data-v-2dfdbcf7>响应式布局 <a class="header-anchor" href="#响应式布局" aria-label="Permalink to &quot;响应式布局&quot;" data-v-2dfdbcf7>​</a></h2>`);
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
  _push(`<details class="details custom-block" data-v-2dfdbcf7><summary data-v-2dfdbcf7>Show Code</summary><div class="language-vue" data-v-2dfdbcf7><button title="Copy Code" class="copy" data-v-2dfdbcf7></button><span class="lang" data-v-2dfdbcf7>vue</span><pre class="shiki material-theme-palenight" data-v-2dfdbcf7><code data-v-2dfdbcf7><span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:xs</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>2</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:sm</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:md</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:lg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>8</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:xl</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>10</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:xs</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>20</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:sm</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>16</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:md</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>12</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:lg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>8</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:xl</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:xs</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>2</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:sm</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>4</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:md</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>6</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:lg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>8</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:xl</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>10</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span></code></pre></div></details><h2 id="span-和-offset-属性的响应式" tabindex="-1" data-v-2dfdbcf7>span 和 offset 属性的响应式 <a class="header-anchor" href="#span-和-offset-属性的响应式" aria-label="Permalink to &quot;span 和 offset 属性的响应式&quot;" data-v-2dfdbcf7>​</a></h2>`);
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
  _push(`<details class="details custom-block" data-v-2dfdbcf7><summary data-v-2dfdbcf7>Show Code</summary><div class="language-vue" data-v-2dfdbcf7><button title="Copy Code" class="copy" data-v-2dfdbcf7></button><span class="lang" data-v-2dfdbcf7>vue</span><pre class="shiki material-theme-palenight" data-v-2dfdbcf7><code data-v-2dfdbcf7><span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:xs</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>{ span: 5, offset: 1 }</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:sm</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>{ span: 6, offset: 2 }</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:xs</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>{ span: 11, offset: 1 }</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:sm</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>{ span: 6, offset: 2 }</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:xs</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>{ span: 5, offset: 1 }</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-2dfdbcf7>:sm</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-2dfdbcf7>{ span: 6, offset: 2 }</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-2dfdbcf7>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span>
<span class="line" data-v-2dfdbcf7><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-2dfdbcf7>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-2dfdbcf7>&gt;</span></span></code></pre></div></details><h2 id="apis" tabindex="-1" data-v-2dfdbcf7>APIs <a class="header-anchor" href="#apis" aria-label="Permalink to &quot;APIs&quot;" data-v-2dfdbcf7>​</a></h2><h2 id="row" tabindex="-1" data-v-2dfdbcf7>Row <a class="header-anchor" href="#row" aria-label="Permalink to &quot;Row&quot;" data-v-2dfdbcf7>​</a></h2><table data-v-2dfdbcf7><thead data-v-2dfdbcf7><tr data-v-2dfdbcf7><th data-v-2dfdbcf7>参数</th><th data-v-2dfdbcf7>说明</th><th data-v-2dfdbcf7>类型</th><th data-v-2dfdbcf7>默认值</th><th data-v-2dfdbcf7>必传</th></tr></thead><tbody data-v-2dfdbcf7><tr data-v-2dfdbcf7><td data-v-2dfdbcf7>width</td><td data-v-2dfdbcf7>行宽度</td><td data-v-2dfdbcf7>string | number</td><td data-v-2dfdbcf7>&#39;auto&#39;</td><td data-v-2dfdbcf7>false</td></tr><tr data-v-2dfdbcf7><td data-v-2dfdbcf7>gutter</td><td data-v-2dfdbcf7>栅格间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔 <code data-v-2dfdbcf7>{ xs: 8, sm: 16, md: 24}</code>。或者使用数组形式同时设置 <code data-v-2dfdbcf7>[水平间距, 垂直间距]</code></td><td data-v-2dfdbcf7>number | [number | Responsive, number | Responsive] | Responsive</td><td data-v-2dfdbcf7>0</td><td data-v-2dfdbcf7>false</td></tr><tr data-v-2dfdbcf7><td data-v-2dfdbcf7>wrap</td><td data-v-2dfdbcf7>是否自动换行</td><td data-v-2dfdbcf7>boolean</td><td data-v-2dfdbcf7>false</td><td data-v-2dfdbcf7>false</td></tr><tr data-v-2dfdbcf7><td data-v-2dfdbcf7>align</td><td data-v-2dfdbcf7>垂直对齐方式</td><td data-v-2dfdbcf7>&#39;top&#39; | &#39;middle&#39; | &#39;bottom&#39; | &#39;stretch&#39;</td><td data-v-2dfdbcf7>&#39;top&#39;</td><td data-v-2dfdbcf7>false</td></tr><tr data-v-2dfdbcf7><td data-v-2dfdbcf7>justify</td><td data-v-2dfdbcf7>水平排列方式</td><td data-v-2dfdbcf7>&#39;start&#39; | &#39;end&#39; | &#39;center&#39; | &#39;space-around&#39; | &#39;space-between&#39; | &#39;space-evenly&#39;</td><td data-v-2dfdbcf7>&#39;start&#39;</td><td data-v-2dfdbcf7>false</td></tr></tbody></table><h2 id="responsive-type" tabindex="-1" data-v-2dfdbcf7>Responsive Type <a class="header-anchor" href="#responsive-type" aria-label="Permalink to &quot;Responsive Type&quot;" data-v-2dfdbcf7>​</a></h2><table data-v-2dfdbcf7><thead data-v-2dfdbcf7><tr data-v-2dfdbcf7><th data-v-2dfdbcf7>名称</th><th data-v-2dfdbcf7>说明</th><th data-v-2dfdbcf7>类型</th><th data-v-2dfdbcf7>必传</th></tr></thead><tbody data-v-2dfdbcf7><tr data-v-2dfdbcf7><td data-v-2dfdbcf7>xs</td><td data-v-2dfdbcf7><code data-v-2dfdbcf7>&lt;576px</code> 响应式栅格</td><td data-v-2dfdbcf7>number</td><td data-v-2dfdbcf7>false</td></tr><tr data-v-2dfdbcf7><td data-v-2dfdbcf7>sm</td><td data-v-2dfdbcf7><code data-v-2dfdbcf7>≥576px</code> 响应式栅格</td><td data-v-2dfdbcf7>number</td><td data-v-2dfdbcf7>false</td></tr><tr data-v-2dfdbcf7><td data-v-2dfdbcf7>md</td><td data-v-2dfdbcf7><code data-v-2dfdbcf7>≥768px</code> 响应式栅格</td><td data-v-2dfdbcf7>number</td><td data-v-2dfdbcf7>false</td></tr><tr data-v-2dfdbcf7><td data-v-2dfdbcf7>lg</td><td data-v-2dfdbcf7><code data-v-2dfdbcf7>≥992px</code> 响应式栅格</td><td data-v-2dfdbcf7>number</td><td data-v-2dfdbcf7>false</td></tr><tr data-v-2dfdbcf7><td data-v-2dfdbcf7>xl</td><td data-v-2dfdbcf7><code data-v-2dfdbcf7>≥1200px</code> 响应式栅格</td><td data-v-2dfdbcf7>number</td><td data-v-2dfdbcf7>false</td></tr><tr data-v-2dfdbcf7><td data-v-2dfdbcf7>xxl</td><td data-v-2dfdbcf7><code data-v-2dfdbcf7>≥1600px</code> 响应式栅格</td><td data-v-2dfdbcf7>number</td><td data-v-2dfdbcf7>false</td></tr></tbody></table><h2 id="col" tabindex="-1" data-v-2dfdbcf7>Col <a class="header-anchor" href="#col" aria-label="Permalink to &quot;Col&quot;" data-v-2dfdbcf7>​</a></h2><table data-v-2dfdbcf7><thead data-v-2dfdbcf7><tr data-v-2dfdbcf7><th data-v-2dfdbcf7>参数</th><th data-v-2dfdbcf7>说明</th><th data-v-2dfdbcf7>类型</th><th data-v-2dfdbcf7>默认值</th><th data-v-2dfdbcf7>必传</th></tr></thead><tbody data-v-2dfdbcf7><tr data-v-2dfdbcf7><td data-v-2dfdbcf7>span</td><td data-v-2dfdbcf7>栅格占位格数，取 <code data-v-2dfdbcf7>0,1,2...24</code>；为 <code data-v-2dfdbcf7>0</code> 时相当于 <code data-v-2dfdbcf7>display: none</code></td><td data-v-2dfdbcf7>number</td><td data-v-2dfdbcf7>undefined</td><td data-v-2dfdbcf7>false</td></tr><tr data-v-2dfdbcf7><td data-v-2dfdbcf7>offset</td><td data-v-2dfdbcf7>栅格左侧的间隔格数，取 <code data-v-2dfdbcf7>0,1,2...24</code></td><td data-v-2dfdbcf7>number</td><td data-v-2dfdbcf7>0</td><td data-v-2dfdbcf7>false</td></tr><tr data-v-2dfdbcf7><td data-v-2dfdbcf7>flex</td><td data-v-2dfdbcf7><code data-v-2dfdbcf7>flex</code> 布局填充</td><td data-v-2dfdbcf7>string | number</td><td data-v-2dfdbcf7>&#39;&#39;</td><td data-v-2dfdbcf7>false</td></tr><tr data-v-2dfdbcf7><td data-v-2dfdbcf7>xs</td><td data-v-2dfdbcf7><code data-v-2dfdbcf7>&lt;576px</code> 响应式栅格</td><td data-v-2dfdbcf7>number | {span: number, offset?: number}</td><td data-v-2dfdbcf7>undefined</td><td data-v-2dfdbcf7>false</td></tr><tr data-v-2dfdbcf7><td data-v-2dfdbcf7>sm</td><td data-v-2dfdbcf7><code data-v-2dfdbcf7>≥576px</code> 响应式栅格</td><td data-v-2dfdbcf7>number | {span: number, offset?: number}</td><td data-v-2dfdbcf7>undefined</td><td data-v-2dfdbcf7>false</td></tr><tr data-v-2dfdbcf7><td data-v-2dfdbcf7>md</td><td data-v-2dfdbcf7><code data-v-2dfdbcf7>≥768px</code> 响应式栅格</td><td data-v-2dfdbcf7>number | {span: number, offset?: number}</td><td data-v-2dfdbcf7>undefined</td><td data-v-2dfdbcf7>false</td></tr><tr data-v-2dfdbcf7><td data-v-2dfdbcf7>lg</td><td data-v-2dfdbcf7><code data-v-2dfdbcf7>≥992px</code> 响应式栅格</td><td data-v-2dfdbcf7>number | {span: number, offset?: number}</td><td data-v-2dfdbcf7>undefined</td><td data-v-2dfdbcf7>false</td></tr><tr data-v-2dfdbcf7><td data-v-2dfdbcf7>xl</td><td data-v-2dfdbcf7><code data-v-2dfdbcf7>≥1200px</code> 响应式栅格</td><td data-v-2dfdbcf7>number | {span: number, offset?: number}</td><td data-v-2dfdbcf7>undefined</td><td data-v-2dfdbcf7>false</td></tr><tr data-v-2dfdbcf7><td data-v-2dfdbcf7>xxl</td><td data-v-2dfdbcf7><code data-v-2dfdbcf7>≥1600px</code> 响应式栅格</td><td data-v-2dfdbcf7>number | {span: number, offset?: number}</td><td data-v-2dfdbcf7>undefined</td><td data-v-2dfdbcf7>false</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/components/grid.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const grid = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-2dfdbcf7"]]);
export {
  __pageData,
  grid as default
};
