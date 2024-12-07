import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, h, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons-vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"按钮 Button","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/button.md","filePath":"guide/components/button.md","lastUpdated":1730860199000}');
const __default__ = { name: "guide/components/button.md" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    const disabled = ref(true);
    const sizeOptions = [
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
    ];
    const size = ref("middle");
    const customLoading = ref(false);
    const loading = ref(true);
    const loadingOptions = [
      {
        label: "static",
        value: "static"
      },
      {
        label: "dynamic",
        value: "dynamic"
      }
    ];
    const loadingType = ref("dynamic");
    function onClick(e) {
      console.log("click", e);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_GlobalElement = resolveComponent("GlobalElement");
      const _component_Space = resolveComponent("Space");
      const _component_Button = resolveComponent("Button", true);
      const _component_Tooltip = resolveComponent("Tooltip");
      const _component_Switch = resolveComponent("Switch");
      const _component_Radio = resolveComponent("Radio");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-0722847c><h1 id="按钮-button" tabindex="-1" data-v-0722847c>按钮 Button <a class="header-anchor" href="#按钮-button" aria-label="Permalink to &quot;按钮 Button&quot;" data-v-0722847c>​</a></h1>`);
      _push(ssrRenderComponent(_component_GlobalElement, null, null, _parent));
      _push(`<p data-v-0722847c><em data-v-0722847c>按钮用于开始一个即时操作</em></p><h2 id="何时使用" tabindex="-1" data-v-0722847c>何时使用 <a class="header-anchor" href="#何时使用" aria-label="Permalink to &quot;何时使用&quot;" data-v-0722847c>​</a></h2><ul data-v-0722847c><li data-v-0722847c>响应用户点击行为，触发相应的业务逻辑</li></ul><h2 id="基本使用" tabindex="-1" data-v-0722847c>基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;" data-v-0722847c>​</a></h2><p data-v-0722847c><em data-v-0722847c>七种类型</em></p><br data-v-0722847c>`);
      _push(ssrRenderComponent(_component_Space, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, { onClick }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Default Button`);
                } else {
                  return [
                    createTextVNode("Default Button")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, { type: "reverse" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Reverse Button`);
                } else {
                  return [
                    createTextVNode("Reverse Button")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, { type: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Primary Button`);
                } else {
                  return [
                    createTextVNode("Primary Button")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, { type: "danger" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Danger Button`);
                } else {
                  return [
                    createTextVNode("Danger Button")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, { type: "dashed" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Dashed Button`);
                } else {
                  return [
                    createTextVNode("Dashed Button")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, { type: "text" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Text Button`);
                } else {
                  return [
                    createTextVNode("Text Button")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, { type: "link" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Link Button`);
                } else {
                  return [
                    createTextVNode("Link Button")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, { onClick }, {
                default: withCtx(() => [
                  createTextVNode("Default Button")
                ]),
                _: 1
              }),
              createVNode(_component_Button, { type: "reverse" }, {
                default: withCtx(() => [
                  createTextVNode("Reverse Button")
                ]),
                _: 1
              }),
              createVNode(_component_Button, { type: "primary" }, {
                default: withCtx(() => [
                  createTextVNode("Primary Button")
                ]),
                _: 1
              }),
              createVNode(_component_Button, { type: "danger" }, {
                default: withCtx(() => [
                  createTextVNode("Danger Button")
                ]),
                _: 1
              }),
              createVNode(_component_Button, { type: "dashed" }, {
                default: withCtx(() => [
                  createTextVNode("Dashed Button")
                ]),
                _: 1
              }),
              createVNode(_component_Button, { type: "text" }, {
                default: withCtx(() => [
                  createTextVNode("Text Button")
                ]),
                _: 1
              }),
              createVNode(_component_Button, { type: "link" }, {
                default: withCtx(() => [
                  createTextVNode("Link Button")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-0722847c><summary data-v-0722847c>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-0722847c><button title="Copy Code" class="copy" data-v-0722847c></button><span class="lang" data-v-0722847c>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-0722847c><code data-v-0722847c><span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> setup</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;ts&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>function</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> onClick</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}" data-v-0722847c>e</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> Event</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>) {</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  console.</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>log</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&#39;click&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>, e)</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>}</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> @</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>click</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>onClick</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Default Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;reverse&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Reverse Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Primary Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Danger Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;dashed&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Dashed Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;text&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Text Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;link&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Link Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span></code></pre></div></details><h2 id="按钮形状-图标" tabindex="-1" data-v-0722847c>按钮形状 &amp; 图标 <a class="header-anchor" href="#按钮形状-图标" aria-label="Permalink to &quot;按钮形状 &amp; 图标&quot;" data-v-0722847c>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, { vertical: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Tooltip, { tooltip: "search" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Button, {
                          type: "primary",
                          shape: "circle",
                          icon: () => h(unref(SearchOutlined))
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Button, {
                            type: "primary",
                            shape: "circle",
                            icon: () => h(unref(SearchOutlined))
                          }, null, 8, ["icon"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "primary",
                    shape: "circle"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`A`);
                      } else {
                        return [
                          createTextVNode("A")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "primary",
                    shape: "round",
                    icon: () => h(unref(SearchOutlined))
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Search `);
                      } else {
                        return [
                          createTextVNode(" Search ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Tooltip, { tooltip: "search" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Button, {
                          type: "primary",
                          shape: "round",
                          icon: () => h(unref(SearchOutlined))
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Button, {
                            type: "primary",
                            shape: "round",
                            icon: () => h(unref(SearchOutlined))
                          }, null, 8, ["icon"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "primary",
                    icon: () => h(unref(SearchOutlined))
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Search `);
                      } else {
                        return [
                          createTextVNode(" Search ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Tooltip, { tooltip: "search" }, {
                      default: withCtx(() => [
                        createVNode(_component_Button, {
                          type: "primary",
                          shape: "circle",
                          icon: () => h(unref(SearchOutlined))
                        }, null, 8, ["icon"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Button, {
                      type: "primary",
                      shape: "circle"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("A")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Button, {
                      type: "primary",
                      shape: "round",
                      icon: () => h(unref(SearchOutlined))
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Search ")
                      ]),
                      _: 1
                    }, 8, ["icon"]),
                    createVNode(_component_Tooltip, { tooltip: "search" }, {
                      default: withCtx(() => [
                        createVNode(_component_Button, {
                          type: "primary",
                          shape: "round",
                          icon: () => h(unref(SearchOutlined))
                        }, null, 8, ["icon"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Button, {
                      type: "primary",
                      icon: () => h(unref(SearchOutlined))
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Search ")
                      ]),
                      _: 1
                    }, 8, ["icon"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Tooltip, { tooltip: "search" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Button, {
                          href: "https://blog.csdn.net/Dandrose",
                          target: "_blank"
                        }, {
                          icon: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(SearchOutlined), null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(SearchOutlined))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Button, {
                            href: "https://blog.csdn.net/Dandrose",
                            target: "_blank"
                          }, {
                            icon: withCtx(() => [
                              createVNode(unref(SearchOutlined))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Tooltip, { tooltip: "search" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Button, { shape: "circle" }, {
                          icon: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(SearchOutlined), null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(SearchOutlined))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Button, { shape: "circle" }, {
                            icon: withCtx(() => [
                              createVNode(unref(SearchOutlined))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, null, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(SearchOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(SearchOutlined))
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Search `);
                      } else {
                        return [
                          createTextVNode(" Search ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Tooltip, { tooltip: "search" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Button, { shape: "round" }, {
                          icon: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(SearchOutlined), null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(SearchOutlined))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Button, { shape: "round" }, {
                            icon: withCtx(() => [
                              createVNode(unref(SearchOutlined))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Tooltip, { tooltip: "search" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Button, {
                          type: "dashed",
                          shape: "circle"
                        }, {
                          icon: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(SearchOutlined), null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(SearchOutlined))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Button, {
                            type: "dashed",
                            shape: "circle"
                          }, {
                            icon: withCtx(() => [
                              createVNode(unref(SearchOutlined))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, { type: "dashed" }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(SearchOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(SearchOutlined))
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Search `);
                      } else {
                        return [
                          createTextVNode(" Search ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Tooltip, { tooltip: "search" }, {
                      default: withCtx(() => [
                        createVNode(_component_Button, {
                          href: "https://blog.csdn.net/Dandrose",
                          target: "_blank"
                        }, {
                          icon: withCtx(() => [
                            createVNode(unref(SearchOutlined))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Tooltip, { tooltip: "search" }, {
                      default: withCtx(() => [
                        createVNode(_component_Button, { shape: "circle" }, {
                          icon: withCtx(() => [
                            createVNode(unref(SearchOutlined))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Button, null, {
                      icon: withCtx(() => [
                        createVNode(unref(SearchOutlined))
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" Search ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Tooltip, { tooltip: "search" }, {
                      default: withCtx(() => [
                        createVNode(_component_Button, { shape: "round" }, {
                          icon: withCtx(() => [
                            createVNode(unref(SearchOutlined))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Tooltip, { tooltip: "search" }, {
                      default: withCtx(() => [
                        createVNode(_component_Button, {
                          type: "dashed",
                          shape: "circle"
                        }, {
                          icon: withCtx(() => [
                            createVNode(unref(SearchOutlined))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Button, { type: "dashed" }, {
                      icon: withCtx(() => [
                        createVNode(unref(SearchOutlined))
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" Search ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Tooltip, { tooltip: "download" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Button, { type: "primary" }, {
                          icon: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(DownloadOutlined), null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(DownloadOutlined))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Button, { type: "primary" }, {
                            icon: withCtx(() => [
                              createVNode(unref(DownloadOutlined))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Tooltip, { tooltip: "download" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Button, {
                          type: "primary",
                          shape: "circle"
                        }, {
                          icon: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(DownloadOutlined), null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(DownloadOutlined))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Button, {
                            type: "primary",
                            shape: "circle"
                          }, {
                            icon: withCtx(() => [
                              createVNode(unref(DownloadOutlined))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "primary",
                    shape: "round"
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DownloadOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DownloadOutlined))
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Download `);
                      } else {
                        return [
                          createTextVNode(" Download ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Tooltip, { tooltip: "download" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Button, {
                          type: "primary",
                          shape: "round"
                        }, {
                          icon: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(DownloadOutlined), null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(DownloadOutlined))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Button, {
                            type: "primary",
                            shape: "round"
                          }, {
                            icon: withCtx(() => [
                              createVNode(unref(DownloadOutlined))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, { type: "primary" }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DownloadOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DownloadOutlined))
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Download `);
                      } else {
                        return [
                          createTextVNode(" Download ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Tooltip, { tooltip: "download" }, {
                      default: withCtx(() => [
                        createVNode(_component_Button, { type: "primary" }, {
                          icon: withCtx(() => [
                            createVNode(unref(DownloadOutlined))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Tooltip, { tooltip: "download" }, {
                      default: withCtx(() => [
                        createVNode(_component_Button, {
                          type: "primary",
                          shape: "circle"
                        }, {
                          icon: withCtx(() => [
                            createVNode(unref(DownloadOutlined))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Button, {
                      type: "primary",
                      shape: "round"
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(DownloadOutlined))
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" Download ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Tooltip, { tooltip: "download" }, {
                      default: withCtx(() => [
                        createVNode(_component_Button, {
                          type: "primary",
                          shape: "round"
                        }, {
                          icon: withCtx(() => [
                            createVNode(unref(DownloadOutlined))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Button, { type: "primary" }, {
                      icon: withCtx(() => [
                        createVNode(unref(DownloadOutlined))
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" Download ")
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
              createVNode(_component_Space, null, {
                default: withCtx(() => [
                  createVNode(_component_Tooltip, { tooltip: "search" }, {
                    default: withCtx(() => [
                      createVNode(_component_Button, {
                        type: "primary",
                        shape: "circle",
                        icon: () => h(unref(SearchOutlined))
                      }, null, 8, ["icon"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Button, {
                    type: "primary",
                    shape: "circle"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("A")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Button, {
                    type: "primary",
                    shape: "round",
                    icon: () => h(unref(SearchOutlined))
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Search ")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  createVNode(_component_Tooltip, { tooltip: "search" }, {
                    default: withCtx(() => [
                      createVNode(_component_Button, {
                        type: "primary",
                        shape: "round",
                        icon: () => h(unref(SearchOutlined))
                      }, null, 8, ["icon"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Button, {
                    type: "primary",
                    icon: () => h(unref(SearchOutlined))
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Search ")
                    ]),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              }),
              createVNode(_component_Space, null, {
                default: withCtx(() => [
                  createVNode(_component_Tooltip, { tooltip: "search" }, {
                    default: withCtx(() => [
                      createVNode(_component_Button, {
                        href: "https://blog.csdn.net/Dandrose",
                        target: "_blank"
                      }, {
                        icon: withCtx(() => [
                          createVNode(unref(SearchOutlined))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Tooltip, { tooltip: "search" }, {
                    default: withCtx(() => [
                      createVNode(_component_Button, { shape: "circle" }, {
                        icon: withCtx(() => [
                          createVNode(unref(SearchOutlined))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Button, null, {
                    icon: withCtx(() => [
                      createVNode(unref(SearchOutlined))
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" Search ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Tooltip, { tooltip: "search" }, {
                    default: withCtx(() => [
                      createVNode(_component_Button, { shape: "round" }, {
                        icon: withCtx(() => [
                          createVNode(unref(SearchOutlined))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Tooltip, { tooltip: "search" }, {
                    default: withCtx(() => [
                      createVNode(_component_Button, {
                        type: "dashed",
                        shape: "circle"
                      }, {
                        icon: withCtx(() => [
                          createVNode(unref(SearchOutlined))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Button, { type: "dashed" }, {
                    icon: withCtx(() => [
                      createVNode(unref(SearchOutlined))
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" Search ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Space, null, {
                default: withCtx(() => [
                  createVNode(_component_Tooltip, { tooltip: "download" }, {
                    default: withCtx(() => [
                      createVNode(_component_Button, { type: "primary" }, {
                        icon: withCtx(() => [
                          createVNode(unref(DownloadOutlined))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Tooltip, { tooltip: "download" }, {
                    default: withCtx(() => [
                      createVNode(_component_Button, {
                        type: "primary",
                        shape: "circle"
                      }, {
                        icon: withCtx(() => [
                          createVNode(unref(DownloadOutlined))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Button, {
                    type: "primary",
                    shape: "round"
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(DownloadOutlined))
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" Download ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Tooltip, { tooltip: "download" }, {
                    default: withCtx(() => [
                      createVNode(_component_Button, {
                        type: "primary",
                        shape: "round"
                      }, {
                        icon: withCtx(() => [
                          createVNode(unref(DownloadOutlined))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Button, { type: "primary" }, {
                    icon: withCtx(() => [
                      createVNode(unref(DownloadOutlined))
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" Download ")
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
      _push(`<details class="details custom-block" data-v-0722847c><summary data-v-0722847c>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-0722847c><button title="Copy Code" class="copy" data-v-0722847c></button><span class="lang" data-v-0722847c>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-0722847c><code data-v-0722847c><span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> setup</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;ts&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> { h } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c> &#39;vue&#39;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> { SearchOutlined, DownloadOutlined } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c> &#39;@ant-design/icons-vue&#39;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> vertical</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;search&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;circle&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>() </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>=&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> h</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>(SearchOutlined)</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#B31D28", "--shiki-light-font-style": "italic", "--shiki-dark": "#FDAEB7", "--shiki-dark-font-style": "italic" })}" data-v-0722847c> /</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;circle&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;A&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>() </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>=&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> h</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>(SearchOutlined)</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        Search</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;search&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>() </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>=&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> h</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>(SearchOutlined)</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#B31D28", "--shiki-light-font-style": "italic", "--shiki-dark": "#FDAEB7", "--shiki-dark-font-style": "italic" })}" data-v-0722847c> /</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>() </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>=&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> h</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>(SearchOutlined)</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        Search</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;search&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> href</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;https://blog.csdn.net/Dandrose&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> target</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;_blank&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>            &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>SearchOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;search&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;circle&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>            &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>SearchOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>SearchOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        Search</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;search&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>            &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>SearchOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;search&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;dashed&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;circle&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>            &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>SearchOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;dashed&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>SearchOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        Search</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;download&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>            &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>DownloadOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;download&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;circle&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>            &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>DownloadOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>DownloadOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        Download</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;download&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>            &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>DownloadOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>DownloadOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        Download</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span></code></pre></div></details><h2 id="幽灵按钮" tabindex="-1" data-v-0722847c>幽灵按钮 <a class="header-anchor" href="#幽灵按钮" aria-label="Permalink to &quot;幽灵按钮&quot;" data-v-0722847c>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              type: "primary",
              ghost: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Primary Ghost Button`);
                } else {
                  return [
                    createTextVNode("Primary Ghost Button")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              type: "danger",
              ghost: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Danger Ghost Button`);
                } else {
                  return [
                    createTextVNode("Danger Ghost Button")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              type: "primary",
              ghost: "",
              shape: "circle"
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(SearchOutlined), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(SearchOutlined))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              type: "primary",
              ghost: "",
              shape: "round"
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(SearchOutlined), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(SearchOutlined))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Search `);
                } else {
                  return [
                    createTextVNode(" Search ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              type: "primary",
              ghost: "",
              shape: "round"
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(SearchOutlined), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(SearchOutlined))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              type: "danger",
              ghost: "",
              shape: "circle"
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(DownloadOutlined), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(DownloadOutlined))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              type: "danger",
              ghost: "",
              shape: "round"
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(DownloadOutlined), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(DownloadOutlined))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Download `);
                } else {
                  return [
                    createTextVNode(" Download ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              type: "danger",
              ghost: "",
              shape: "round"
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(DownloadOutlined), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(DownloadOutlined))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                type: "primary",
                ghost: ""
              }, {
                default: withCtx(() => [
                  createTextVNode("Primary Ghost Button")
                ]),
                _: 1
              }),
              createVNode(_component_Button, {
                type: "danger",
                ghost: ""
              }, {
                default: withCtx(() => [
                  createTextVNode("Danger Ghost Button")
                ]),
                _: 1
              }),
              createVNode(_component_Button, {
                type: "primary",
                ghost: "",
                shape: "circle"
              }, {
                icon: withCtx(() => [
                  createVNode(unref(SearchOutlined))
                ]),
                _: 1
              }),
              createVNode(_component_Button, {
                type: "primary",
                ghost: "",
                shape: "round"
              }, {
                icon: withCtx(() => [
                  createVNode(unref(SearchOutlined))
                ]),
                default: withCtx(() => [
                  createTextVNode(" Search ")
                ]),
                _: 1
              }),
              createVNode(_component_Button, {
                type: "primary",
                ghost: "",
                shape: "round"
              }, {
                icon: withCtx(() => [
                  createVNode(unref(SearchOutlined))
                ]),
                _: 1
              }),
              createVNode(_component_Button, {
                type: "danger",
                ghost: "",
                shape: "circle"
              }, {
                icon: withCtx(() => [
                  createVNode(unref(DownloadOutlined))
                ]),
                _: 1
              }),
              createVNode(_component_Button, {
                type: "danger",
                ghost: "",
                shape: "round"
              }, {
                icon: withCtx(() => [
                  createVNode(unref(DownloadOutlined))
                ]),
                default: withCtx(() => [
                  createTextVNode(" Download ")
                ]),
                _: 1
              }),
              createVNode(_component_Button, {
                type: "danger",
                ghost: "",
                shape: "round"
              }, {
                icon: withCtx(() => [
                  createVNode(unref(DownloadOutlined))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-0722847c><summary data-v-0722847c>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-0722847c><button title="Copy Code" class="copy" data-v-0722847c></button><span class="lang" data-v-0722847c>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-0722847c><code data-v-0722847c><span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> setup</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;ts&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> { SearchOutlined, DownloadOutlined } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c> &#39;@ant-design/icons-vue&#39;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Primary Ghost Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Danger Ghost Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;circle&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>SearchOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>SearchOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      Search</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>SearchOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;circle&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>DownloadOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>DownloadOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      Download</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>DownloadOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span></code></pre></div></details><h2 id="禁用" tabindex="-1" data-v-0722847c>禁用 <a class="header-anchor" href="#禁用" aria-label="Permalink to &quot;禁用&quot;" data-v-0722847c>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, { vertical: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Space, { align: "center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Disabled state:`);
                  _push3(ssrRenderComponent(_component_Switch, {
                    modelValue: disabled.value,
                    "onUpdate:modelValue": ($event) => disabled.value = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Disabled state:"),
                    createVNode(_component_Switch, {
                      modelValue: disabled.value,
                      "onUpdate:modelValue": ($event) => disabled.value = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, { disabled: disabled.value }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Default Button`);
                      } else {
                        return [
                          createTextVNode("Default Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    disabled: disabled.value,
                    type: "reverse"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Reverse Button`);
                      } else {
                        return [
                          createTextVNode("Reverse Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    disabled: disabled.value,
                    type: "primary"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Primary Button`);
                      } else {
                        return [
                          createTextVNode("Primary Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    disabled: disabled.value,
                    type: "danger"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Danger Button`);
                      } else {
                        return [
                          createTextVNode("Danger Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    disabled: disabled.value,
                    type: "dashed"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Dashed Button`);
                      } else {
                        return [
                          createTextVNode("Dashed Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    disabled: disabled.value,
                    type: "text"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Text Button`);
                      } else {
                        return [
                          createTextVNode("Text Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    disabled: disabled.value,
                    type: "link"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Link Button`);
                      } else {
                        return [
                          createTextVNode("Link Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { disabled: disabled.value }, {
                      default: withCtx(() => [
                        createTextVNode("Default Button")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(_component_Button, {
                      disabled: disabled.value,
                      type: "reverse"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Reverse Button")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(_component_Button, {
                      disabled: disabled.value,
                      type: "primary"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Primary Button")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(_component_Button, {
                      disabled: disabled.value,
                      type: "danger"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Danger Button")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(_component_Button, {
                      disabled: disabled.value,
                      type: "dashed"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Dashed Button")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(_component_Button, {
                      disabled: disabled.value,
                      type: "text"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Text Button")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(_component_Button, {
                      disabled: disabled.value,
                      type: "link"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Link Button")
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, {
                    disabled: disabled.value,
                    type: "primary",
                    ghost: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Primary Ghost Button`);
                      } else {
                        return [
                          createTextVNode("Primary Ghost Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    disabled: disabled.value,
                    type: "danger",
                    ghost: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Danger Ghost Button`);
                      } else {
                        return [
                          createTextVNode("Danger Ghost Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    disabled: disabled.value,
                    type: "primary",
                    shape: "circle"
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(SearchOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(SearchOutlined))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    disabled: disabled.value,
                    type: "primary",
                    shape: "round"
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(SearchOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(SearchOutlined))
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Search `);
                      } else {
                        return [
                          createTextVNode(" Search ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    disabled: disabled.value,
                    type: "primary",
                    shape: "round"
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(SearchOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(SearchOutlined))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    disabled: disabled.value,
                    type: "danger",
                    shape: "circle"
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DownloadOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DownloadOutlined))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    disabled: disabled.value,
                    type: "danger",
                    shape: "round"
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DownloadOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DownloadOutlined))
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Download `);
                      } else {
                        return [
                          createTextVNode(" Download ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    disabled: disabled.value,
                    type: "danger",
                    shape: "round"
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DownloadOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DownloadOutlined))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, {
                      disabled: disabled.value,
                      type: "primary",
                      ghost: ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Primary Ghost Button")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(_component_Button, {
                      disabled: disabled.value,
                      type: "danger",
                      ghost: ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Danger Ghost Button")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(_component_Button, {
                      disabled: disabled.value,
                      type: "primary",
                      shape: "circle"
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(SearchOutlined))
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(_component_Button, {
                      disabled: disabled.value,
                      type: "primary",
                      shape: "round"
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(SearchOutlined))
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" Search ")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(_component_Button, {
                      disabled: disabled.value,
                      type: "primary",
                      shape: "round"
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(SearchOutlined))
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(_component_Button, {
                      disabled: disabled.value,
                      type: "danger",
                      shape: "circle"
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(DownloadOutlined))
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(_component_Button, {
                      disabled: disabled.value,
                      type: "danger",
                      shape: "round"
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(DownloadOutlined))
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" Download ")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(_component_Button, {
                      disabled: disabled.value,
                      type: "danger",
                      shape: "round"
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(DownloadOutlined))
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Space, { align: "center" }, {
                default: withCtx(() => [
                  createTextVNode(" Disabled state:"),
                  createVNode(_component_Switch, {
                    modelValue: disabled.value,
                    "onUpdate:modelValue": ($event) => disabled.value = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_Space, null, {
                default: withCtx(() => [
                  createVNode(_component_Button, { disabled: disabled.value }, {
                    default: withCtx(() => [
                      createTextVNode("Default Button")
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(_component_Button, {
                    disabled: disabled.value,
                    type: "reverse"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Reverse Button")
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(_component_Button, {
                    disabled: disabled.value,
                    type: "primary"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Primary Button")
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(_component_Button, {
                    disabled: disabled.value,
                    type: "danger"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Danger Button")
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(_component_Button, {
                    disabled: disabled.value,
                    type: "dashed"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Dashed Button")
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(_component_Button, {
                    disabled: disabled.value,
                    type: "text"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Text Button")
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(_component_Button, {
                    disabled: disabled.value,
                    type: "link"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Link Button")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                _: 1
              }),
              createVNode(_component_Space, null, {
                default: withCtx(() => [
                  createVNode(_component_Button, {
                    disabled: disabled.value,
                    type: "primary",
                    ghost: ""
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Primary Ghost Button")
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(_component_Button, {
                    disabled: disabled.value,
                    type: "danger",
                    ghost: ""
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Danger Ghost Button")
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(_component_Button, {
                    disabled: disabled.value,
                    type: "primary",
                    shape: "circle"
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(SearchOutlined))
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(_component_Button, {
                    disabled: disabled.value,
                    type: "primary",
                    shape: "round"
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(SearchOutlined))
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" Search ")
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(_component_Button, {
                    disabled: disabled.value,
                    type: "primary",
                    shape: "round"
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(SearchOutlined))
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(_component_Button, {
                    disabled: disabled.value,
                    type: "danger",
                    shape: "circle"
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(DownloadOutlined))
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(_component_Button, {
                    disabled: disabled.value,
                    type: "danger",
                    shape: "round"
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(DownloadOutlined))
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" Download ")
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(_component_Button, {
                    disabled: disabled.value,
                    type: "danger",
                    shape: "round"
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(DownloadOutlined))
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-0722847c><summary data-v-0722847c>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-0722847c><button title="Copy Code" class="copy" data-v-0722847c></button><span class="lang" data-v-0722847c>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-0722847c><code data-v-0722847c><span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> setup</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;ts&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> { ref } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c> &#39;vue&#39;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> { SearchOutlined, DownloadOutlined } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c> &#39;@ant-design/icons-vue&#39;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-0722847c> disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ref</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>(</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-0722847c>true</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>)</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> vertical</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#B31D28", "--shiki-light-font-style": "italic", "--shiki-dark": "#FDAEB7", "--shiki-dark-font-style": "italic" })}" data-v-0722847c> align</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;center&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt; Disabled state:&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Switch</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> v-model</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt; &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Default Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;reverse&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Reverse Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Primary Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Danger Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;dashed&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Dashed Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;text&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Text Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;link&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Link Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Primary Ghost Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Danger Ghost Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;circle&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>SearchOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>SearchOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        Search</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>SearchOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;circle&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>DownloadOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>DownloadOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        Download</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>disabled</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>DownloadOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span></code></pre></div></details><h2 id="按钮尺寸" tabindex="-1" data-v-0722847c>按钮尺寸 <a class="header-anchor" href="#按钮尺寸" aria-label="Permalink to &quot;按钮尺寸&quot;" data-v-0722847c>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, { vertical: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Radio, {
              options: sizeOptions,
              value: size.value,
              "onUpdate:value": ($event) => size.value = $event,
              button: "",
              "button-style": "solid"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, { size: size.value }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Default Button`);
                      } else {
                        return [
                          createTextVNode("Default Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    size: size.value,
                    type: "reverse"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Reverse Button`);
                      } else {
                        return [
                          createTextVNode("Reverse Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    size: size.value,
                    type: "primary"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Primary Button`);
                      } else {
                        return [
                          createTextVNode("Primary Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    size: size.value,
                    type: "danger"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Danger Button`);
                      } else {
                        return [
                          createTextVNode("Danger Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { size: size.value }, {
                      default: withCtx(() => [
                        createTextVNode("Default Button")
                      ]),
                      _: 1
                    }, 8, ["size"]),
                    createVNode(_component_Button, {
                      size: size.value,
                      type: "reverse"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Reverse Button")
                      ]),
                      _: 1
                    }, 8, ["size"]),
                    createVNode(_component_Button, {
                      size: size.value,
                      type: "primary"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Primary Button")
                      ]),
                      _: 1
                    }, 8, ["size"]),
                    createVNode(_component_Button, {
                      size: size.value,
                      type: "danger"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Danger Button")
                      ]),
                      _: 1
                    }, 8, ["size"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, {
                    size: size.value,
                    type: "dashed"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Dashed Button`);
                      } else {
                        return [
                          createTextVNode("Dashed Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    size: size.value,
                    type: "text"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Text Button`);
                      } else {
                        return [
                          createTextVNode("Text Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    size: size.value,
                    type: "link"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Link Button`);
                      } else {
                        return [
                          createTextVNode("Link Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, {
                      size: size.value,
                      type: "dashed"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Dashed Button")
                      ]),
                      _: 1
                    }, 8, ["size"]),
                    createVNode(_component_Button, {
                      size: size.value,
                      type: "text"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Text Button")
                      ]),
                      _: 1
                    }, 8, ["size"]),
                    createVNode(_component_Button, {
                      size: size.value,
                      type: "link"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Link Button")
                      ]),
                      _: 1
                    }, 8, ["size"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, {
                    size: size.value,
                    type: "primary",
                    ghost: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Primary Button`);
                      } else {
                        return [
                          createTextVNode("Primary Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    size: size.value,
                    type: "danger",
                    ghost: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Danger Button`);
                      } else {
                        return [
                          createTextVNode("Danger Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    size: size.value,
                    type: "primary",
                    ghost: "",
                    loading: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Primary Ghost Button`);
                      } else {
                        return [
                          createTextVNode("Primary Ghost Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    size: size.value,
                    type: "danger",
                    ghost: "",
                    loading: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Danger Ghost Button`);
                      } else {
                        return [
                          createTextVNode("Danger Ghost Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, {
                      size: size.value,
                      type: "primary",
                      ghost: ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Primary Button")
                      ]),
                      _: 1
                    }, 8, ["size"]),
                    createVNode(_component_Button, {
                      size: size.value,
                      type: "danger",
                      ghost: ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Danger Button")
                      ]),
                      _: 1
                    }, 8, ["size"]),
                    createVNode(_component_Button, {
                      size: size.value,
                      type: "primary",
                      ghost: "",
                      loading: ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Primary Ghost Button")
                      ]),
                      _: 1
                    }, 8, ["size"]),
                    createVNode(_component_Button, {
                      size: size.value,
                      type: "danger",
                      ghost: "",
                      loading: ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Danger Ghost Button")
                      ]),
                      _: 1
                    }, 8, ["size"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, {
                    size: size.value,
                    type: "primary",
                    ghost: ""
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(SearchOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(SearchOutlined))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    size: size.value,
                    type: "primary",
                    ghost: "",
                    shape: "circle"
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(SearchOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(SearchOutlined))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    size: size.value,
                    type: "primary",
                    ghost: "",
                    shape: "round"
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(SearchOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(SearchOutlined))
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Search `);
                      } else {
                        return [
                          createTextVNode(" Search ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    size: size.value,
                    type: "primary",
                    ghost: "",
                    shape: "round"
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(SearchOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(SearchOutlined))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    size: size.value,
                    type: "primary",
                    ghost: ""
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(SearchOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(SearchOutlined))
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Search `);
                      } else {
                        return [
                          createTextVNode(" Search ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, {
                      size: size.value,
                      type: "primary",
                      ghost: ""
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(SearchOutlined))
                      ]),
                      _: 1
                    }, 8, ["size"]),
                    createVNode(_component_Button, {
                      size: size.value,
                      type: "primary",
                      ghost: "",
                      shape: "circle"
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(SearchOutlined))
                      ]),
                      _: 1
                    }, 8, ["size"]),
                    createVNode(_component_Button, {
                      size: size.value,
                      type: "primary",
                      ghost: "",
                      shape: "round"
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(SearchOutlined))
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" Search ")
                      ]),
                      _: 1
                    }, 8, ["size"]),
                    createVNode(_component_Button, {
                      size: size.value,
                      type: "primary",
                      ghost: "",
                      shape: "round"
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(SearchOutlined))
                      ]),
                      _: 1
                    }, 8, ["size"]),
                    createVNode(_component_Button, {
                      size: size.value,
                      type: "primary",
                      ghost: ""
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(SearchOutlined))
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" Search ")
                      ]),
                      _: 1
                    }, 8, ["size"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, {
                    size: size.value,
                    type: "danger"
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DownloadOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DownloadOutlined))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    size: size.value,
                    type: "danger",
                    shape: "circle"
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DownloadOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DownloadOutlined))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    size: size.value,
                    type: "danger",
                    shape: "round"
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DownloadOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DownloadOutlined))
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Download `);
                      } else {
                        return [
                          createTextVNode(" Download ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    size: size.value,
                    type: "danger",
                    shape: "round"
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DownloadOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DownloadOutlined))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    size: size.value,
                    type: "danger"
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DownloadOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DownloadOutlined))
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Download `);
                      } else {
                        return [
                          createTextVNode(" Download ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, {
                      size: size.value,
                      type: "danger"
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(DownloadOutlined))
                      ]),
                      _: 1
                    }, 8, ["size"]),
                    createVNode(_component_Button, {
                      size: size.value,
                      type: "danger",
                      shape: "circle"
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(DownloadOutlined))
                      ]),
                      _: 1
                    }, 8, ["size"]),
                    createVNode(_component_Button, {
                      size: size.value,
                      type: "danger",
                      shape: "round"
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(DownloadOutlined))
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" Download ")
                      ]),
                      _: 1
                    }, 8, ["size"]),
                    createVNode(_component_Button, {
                      size: size.value,
                      type: "danger",
                      shape: "round"
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(DownloadOutlined))
                      ]),
                      _: 1
                    }, 8, ["size"]),
                    createVNode(_component_Button, {
                      size: size.value,
                      type: "danger"
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(DownloadOutlined))
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" Download ")
                      ]),
                      _: 1
                    }, 8, ["size"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Radio, {
                options: sizeOptions,
                value: size.value,
                "onUpdate:value": ($event) => size.value = $event,
                button: "",
                "button-style": "solid"
              }, null, 8, ["value", "onUpdate:value"]),
              createVNode(_component_Space, null, {
                default: withCtx(() => [
                  createVNode(_component_Button, { size: size.value }, {
                    default: withCtx(() => [
                      createTextVNode("Default Button")
                    ]),
                    _: 1
                  }, 8, ["size"]),
                  createVNode(_component_Button, {
                    size: size.value,
                    type: "reverse"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Reverse Button")
                    ]),
                    _: 1
                  }, 8, ["size"]),
                  createVNode(_component_Button, {
                    size: size.value,
                    type: "primary"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Primary Button")
                    ]),
                    _: 1
                  }, 8, ["size"]),
                  createVNode(_component_Button, {
                    size: size.value,
                    type: "danger"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Danger Button")
                    ]),
                    _: 1
                  }, 8, ["size"])
                ]),
                _: 1
              }),
              createVNode(_component_Space, null, {
                default: withCtx(() => [
                  createVNode(_component_Button, {
                    size: size.value,
                    type: "dashed"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Dashed Button")
                    ]),
                    _: 1
                  }, 8, ["size"]),
                  createVNode(_component_Button, {
                    size: size.value,
                    type: "text"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Text Button")
                    ]),
                    _: 1
                  }, 8, ["size"]),
                  createVNode(_component_Button, {
                    size: size.value,
                    type: "link"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Link Button")
                    ]),
                    _: 1
                  }, 8, ["size"])
                ]),
                _: 1
              }),
              createVNode(_component_Space, null, {
                default: withCtx(() => [
                  createVNode(_component_Button, {
                    size: size.value,
                    type: "primary",
                    ghost: ""
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Primary Button")
                    ]),
                    _: 1
                  }, 8, ["size"]),
                  createVNode(_component_Button, {
                    size: size.value,
                    type: "danger",
                    ghost: ""
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Danger Button")
                    ]),
                    _: 1
                  }, 8, ["size"]),
                  createVNode(_component_Button, {
                    size: size.value,
                    type: "primary",
                    ghost: "",
                    loading: ""
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Primary Ghost Button")
                    ]),
                    _: 1
                  }, 8, ["size"]),
                  createVNode(_component_Button, {
                    size: size.value,
                    type: "danger",
                    ghost: "",
                    loading: ""
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Danger Ghost Button")
                    ]),
                    _: 1
                  }, 8, ["size"])
                ]),
                _: 1
              }),
              createVNode(_component_Space, null, {
                default: withCtx(() => [
                  createVNode(_component_Button, {
                    size: size.value,
                    type: "primary",
                    ghost: ""
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(SearchOutlined))
                    ]),
                    _: 1
                  }, 8, ["size"]),
                  createVNode(_component_Button, {
                    size: size.value,
                    type: "primary",
                    ghost: "",
                    shape: "circle"
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(SearchOutlined))
                    ]),
                    _: 1
                  }, 8, ["size"]),
                  createVNode(_component_Button, {
                    size: size.value,
                    type: "primary",
                    ghost: "",
                    shape: "round"
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(SearchOutlined))
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" Search ")
                    ]),
                    _: 1
                  }, 8, ["size"]),
                  createVNode(_component_Button, {
                    size: size.value,
                    type: "primary",
                    ghost: "",
                    shape: "round"
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(SearchOutlined))
                    ]),
                    _: 1
                  }, 8, ["size"]),
                  createVNode(_component_Button, {
                    size: size.value,
                    type: "primary",
                    ghost: ""
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(SearchOutlined))
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" Search ")
                    ]),
                    _: 1
                  }, 8, ["size"])
                ]),
                _: 1
              }),
              createVNode(_component_Space, null, {
                default: withCtx(() => [
                  createVNode(_component_Button, {
                    size: size.value,
                    type: "danger"
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(DownloadOutlined))
                    ]),
                    _: 1
                  }, 8, ["size"]),
                  createVNode(_component_Button, {
                    size: size.value,
                    type: "danger",
                    shape: "circle"
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(DownloadOutlined))
                    ]),
                    _: 1
                  }, 8, ["size"]),
                  createVNode(_component_Button, {
                    size: size.value,
                    type: "danger",
                    shape: "round"
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(DownloadOutlined))
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" Download ")
                    ]),
                    _: 1
                  }, 8, ["size"]),
                  createVNode(_component_Button, {
                    size: size.value,
                    type: "danger",
                    shape: "round"
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(DownloadOutlined))
                    ]),
                    _: 1
                  }, 8, ["size"]),
                  createVNode(_component_Button, {
                    size: size.value,
                    type: "danger"
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(DownloadOutlined))
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" Download ")
                    ]),
                    _: 1
                  }, 8, ["size"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-0722847c><summary data-v-0722847c>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-0722847c><button title="Copy Code" class="copy" data-v-0722847c></button><span class="lang" data-v-0722847c>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-0722847c><code data-v-0722847c><span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> setup</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;ts&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> { ref } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c> &#39;vue&#39;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> { SearchOutlined, DownloadOutlined } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c> &#39;@ant-design/icons-vue&#39;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-0722847c> sizeOptions</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> [</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  {</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    label: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&#39;small&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>,</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    value: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&#39;small&#39;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  },</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  {</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    label: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&#39;middle&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>,</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    value: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&#39;middle&#39;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  },</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  {</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    label: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&#39;large&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>,</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    value: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&#39;large&#39;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  }</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>]</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-0722847c> size</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ref</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&#39;middle&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>)</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> vertical</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Radio</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>options</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>sizeOptions</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> v-model</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> button-style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;solid&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Default Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;reverse&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Reverse Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Primary Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Danger Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;dashed&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Dashed Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;text&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Text Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;link&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Link Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Primary Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Danger Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Primary Ghost Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Danger Ghost Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>SearchOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;circle&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>SearchOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>SearchOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        Search</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>SearchOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>SearchOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        Search</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>DownloadOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;circle&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>DownloadOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>DownloadOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        Download</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>DownloadOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>DownloadOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        Download</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span></code></pre></div></details><h2 id="自定义样式" tabindex="-1" data-v-0722847c>自定义样式 <a class="header-anchor" href="#自定义样式" aria-label="Permalink to &quot;自定义样式&quot;" data-v-0722847c>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, { vertical: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Space, { align: "center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Loading state:`);
                  _push3(ssrRenderComponent(_component_Switch, {
                    modelValue: customLoading.value,
                    "onUpdate:modelValue": ($event) => customLoading.value = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Loading state:"),
                    createVNode(_component_Switch, {
                      modelValue: customLoading.value,
                      "onUpdate:modelValue": ($event) => customLoading.value = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, {
                    "button-class": "custom-class1",
                    "ripple-color": "#faad14",
                    size: "large",
                    loading: customLoading.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 自定义样式 `);
                      } else {
                        return [
                          createTextVNode(" 自定义样式 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    "button-class": "custom-class2",
                    "ripple-color": "#faad14",
                    type: "primary",
                    size: "large",
                    loading: customLoading.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 自定义样式 `);
                      } else {
                        return [
                          createTextVNode(" 自定义样式 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    "button-class": "custom-class1",
                    "ripple-color": "#faad14",
                    shape: "circle",
                    size: "large",
                    loading: customLoading.value
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(SearchOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(SearchOutlined))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    "button-class": "custom-class2",
                    "ripple-color": "#faad14",
                    type: "primary",
                    shape: "round",
                    size: "large",
                    loading: customLoading.value
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(SearchOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(SearchOutlined))
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Search `);
                      } else {
                        return [
                          createTextVNode(" Search ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    "button-class": "custom-class1",
                    "ripple-color": "#faad14",
                    shape: "round",
                    size: "large",
                    loading: customLoading.value
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DownloadOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DownloadOutlined))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, {
                      "button-class": "custom-class1",
                      "ripple-color": "#faad14",
                      size: "large",
                      loading: customLoading.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 自定义样式 ")
                      ]),
                      _: 1
                    }, 8, ["loading"]),
                    createVNode(_component_Button, {
                      "button-class": "custom-class2",
                      "ripple-color": "#faad14",
                      type: "primary",
                      size: "large",
                      loading: customLoading.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 自定义样式 ")
                      ]),
                      _: 1
                    }, 8, ["loading"]),
                    createVNode(_component_Button, {
                      "button-class": "custom-class1",
                      "ripple-color": "#faad14",
                      shape: "circle",
                      size: "large",
                      loading: customLoading.value
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(SearchOutlined))
                      ]),
                      _: 1
                    }, 8, ["loading"]),
                    createVNode(_component_Button, {
                      "button-class": "custom-class2",
                      "ripple-color": "#faad14",
                      type: "primary",
                      shape: "round",
                      size: "large",
                      loading: customLoading.value
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(SearchOutlined))
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" Search ")
                      ]),
                      _: 1
                    }, 8, ["loading"]),
                    createVNode(_component_Button, {
                      "button-class": "custom-class1",
                      "ripple-color": "#faad14",
                      shape: "round",
                      size: "large",
                      loading: customLoading.value
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(DownloadOutlined))
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Space, { align: "center" }, {
                default: withCtx(() => [
                  createTextVNode(" Loading state:"),
                  createVNode(_component_Switch, {
                    modelValue: customLoading.value,
                    "onUpdate:modelValue": ($event) => customLoading.value = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_Space, null, {
                default: withCtx(() => [
                  createVNode(_component_Button, {
                    "button-class": "custom-class1",
                    "ripple-color": "#faad14",
                    size: "large",
                    loading: customLoading.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 自定义样式 ")
                    ]),
                    _: 1
                  }, 8, ["loading"]),
                  createVNode(_component_Button, {
                    "button-class": "custom-class2",
                    "ripple-color": "#faad14",
                    type: "primary",
                    size: "large",
                    loading: customLoading.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 自定义样式 ")
                    ]),
                    _: 1
                  }, 8, ["loading"]),
                  createVNode(_component_Button, {
                    "button-class": "custom-class1",
                    "ripple-color": "#faad14",
                    shape: "circle",
                    size: "large",
                    loading: customLoading.value
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(SearchOutlined))
                    ]),
                    _: 1
                  }, 8, ["loading"]),
                  createVNode(_component_Button, {
                    "button-class": "custom-class2",
                    "ripple-color": "#faad14",
                    type: "primary",
                    shape: "round",
                    size: "large",
                    loading: customLoading.value
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(SearchOutlined))
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" Search ")
                    ]),
                    _: 1
                  }, 8, ["loading"]),
                  createVNode(_component_Button, {
                    "button-class": "custom-class1",
                    "ripple-color": "#faad14",
                    shape: "round",
                    size: "large",
                    loading: customLoading.value
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(DownloadOutlined))
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-0722847c><summary data-v-0722847c>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-0722847c><button title="Copy Code" class="copy" data-v-0722847c></button><span class="lang" data-v-0722847c>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-0722847c><code data-v-0722847c><span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> setup</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;ts&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> { ref } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c> &#39;vue&#39;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> { SearchOutlined, DownloadOutlined } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c> &#39;@ant-design/icons-vue&#39;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-0722847c> customLoading</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ref</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>(</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-0722847c>false</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>)</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> vertical</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#B31D28", "--shiki-light-font-style": "italic", "--shiki-dark": "#FDAEB7", "--shiki-dark-font-style": "italic" })}" data-v-0722847c> align</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;center&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt; Loading state:&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Switch</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> v-model</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>customLoading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt; &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>        button-class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;custom-class1&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>        ripple-color</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;#faad14&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>        size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;large&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>customLoading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        自定义样式</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>        button-class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;custom-class2&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>        ripple-color</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;#faad14&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>        type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>        size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;large&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>customLoading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        自定义样式</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>        button-class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;custom-class1&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>        ripple-color</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;#faad14&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>        shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;circle&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>        size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;large&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>customLoading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>SearchOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>        button-class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;custom-class2&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>        ripple-color</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;#faad14&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>        type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>        shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>        size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;large&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>customLoading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>SearchOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        Search</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>        button-class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;custom-class1&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>        ripple-color</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;#faad14&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>        shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>        size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;large&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>customLoading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>DownloadOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;less&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> scoped</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>.custom-class1 {</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  height: 40px;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  font-size: 18px;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  border-color: #faad14;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  color: #faad14;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  &amp;:hover {</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    color: #ffc53d !important;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    border-color: #ffc53d;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  }</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  &amp;:active {</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    color: #d48806 !important;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    border-color: #d48806;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  }</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>}</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>.custom-class2 {</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  height: 40px;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  font-size: 18px;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  background: #faad14;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  border-color: #faad14;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  &amp;:hover {</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    background: #ffc53d;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    border-color: #ffc53d;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  }</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  &amp;:active {</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    background: #d48806;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    border-color: #d48806;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  }</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>}</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span></code></pre></div></details><h2 id="自定义跳转" tabindex="-1" data-v-0722847c>自定义跳转 <a class="header-anchor" href="#自定义跳转" aria-label="Permalink to &quot;自定义跳转&quot;" data-v-0722847c>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              type: "primary",
              ghost: "",
              href: "https://themusecatcher.github.io/vue-amazing-ui/",
              target: "_blank"
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<img style="${ssrRenderStyle({ "width": "1em", "height": "1em" })}" src="https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg" data-v-0722847c${_scopeId2}>`);
                } else {
                  return [
                    createVNode("img", {
                      style: { "width": "1em", "height": "1em" },
                      src: "https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg"
                    })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Vue Amazing UI `);
                } else {
                  return [
                    createTextVNode(" Vue Amazing UI ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              type: "primary",
              href: "https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html",
              target: "_blank"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Button Component `);
                } else {
                  return [
                    createTextVNode(" Button Component ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              type: "primary",
              ghost: "",
              shape: "round",
              href: "https://blog.csdn.net/Dandrose",
              target: "_blank"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` My CSDN Blogs `);
                } else {
                  return [
                    createTextVNode(" My CSDN Blogs ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                type: "primary",
                ghost: "",
                href: "https://themusecatcher.github.io/vue-amazing-ui/",
                target: "_blank"
              }, {
                icon: withCtx(() => [
                  createVNode("img", {
                    style: { "width": "1em", "height": "1em" },
                    src: "https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg"
                  })
                ]),
                default: withCtx(() => [
                  createTextVNode(" Vue Amazing UI ")
                ]),
                _: 1
              }),
              createVNode(_component_Button, {
                type: "primary",
                href: "https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html",
                target: "_blank"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Button Component ")
                ]),
                _: 1
              }),
              createVNode(_component_Button, {
                type: "primary",
                ghost: "",
                shape: "round",
                href: "https://blog.csdn.net/Dandrose",
                target: "_blank"
              }, {
                default: withCtx(() => [
                  createTextVNode(" My CSDN Blogs ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-0722847c><summary data-v-0722847c>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-0722847c><button title="Copy Code" class="copy" data-v-0722847c></button><span class="lang" data-v-0722847c>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-0722847c><code data-v-0722847c><span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> href</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;https://themusecatcher.github.io/vue-amazing-ui/&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> target</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;_blank&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>img</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>          style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-0722847c>width</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-0722847c>1</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>em</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>; </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-0722847c>height</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-0722847c>1</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>em</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>          src</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      Vue Amazing UI</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>      type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>      href</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>      target</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;_blank&quot;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      Button Component</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> href</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;https://blog.csdn.net/Dandrose&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> target</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;_blank&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      My CSDN Blogs</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span></code></pre></div></details><h2 id="加载中状态" tabindex="-1" data-v-0722847c>加载中状态 <a class="header-anchor" href="#加载中状态" aria-label="Permalink to &quot;加载中状态&quot;" data-v-0722847c>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, { vertical: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Space, { align: "center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Loading state:`);
                  _push3(ssrRenderComponent(_component_Switch, {
                    modelValue: loading.value,
                    "onUpdate:modelValue": ($event) => loading.value = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Loading state:"),
                    createVNode(_component_Switch, {
                      modelValue: loading.value,
                      "onUpdate:modelValue": ($event) => loading.value = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Space, { align: "center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Loading type:`);
                  _push3(ssrRenderComponent(_component_Radio, {
                    options: loadingOptions,
                    value: loadingType.value,
                    "onUpdate:value": ($event) => loadingType.value = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Loading type:"),
                    createVNode(_component_Radio, {
                      options: loadingOptions,
                      value: loadingType.value,
                      "onUpdate:value": ($event) => loadingType.value = $event
                    }, null, 8, ["value", "onUpdate:value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, {
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Default Button`);
                      } else {
                        return [
                          createTextVNode("Default Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "reverse",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Reverse Button`);
                      } else {
                        return [
                          createTextVNode("Reverse Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "primary",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Primary Button`);
                      } else {
                        return [
                          createTextVNode("Primary Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "danger",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Danger Button`);
                      } else {
                        return [
                          createTextVNode("Danger Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, {
                      loading: loading.value,
                      "loading-type": loadingType.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Default Button")
                      ]),
                      _: 1
                    }, 8, ["loading", "loading-type"]),
                    createVNode(_component_Button, {
                      type: "reverse",
                      loading: loading.value,
                      "loading-type": loadingType.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Reverse Button")
                      ]),
                      _: 1
                    }, 8, ["loading", "loading-type"]),
                    createVNode(_component_Button, {
                      type: "primary",
                      loading: loading.value,
                      "loading-type": loadingType.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Primary Button")
                      ]),
                      _: 1
                    }, 8, ["loading", "loading-type"]),
                    createVNode(_component_Button, {
                      type: "danger",
                      loading: loading.value,
                      "loading-type": loadingType.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Danger Button")
                      ]),
                      _: 1
                    }, 8, ["loading", "loading-type"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "dashed",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Dashed Button`);
                      } else {
                        return [
                          createTextVNode("Dashed Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "text",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Text Button`);
                      } else {
                        return [
                          createTextVNode("Text Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "link",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Link Button`);
                      } else {
                        return [
                          createTextVNode("Link Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, {
                      type: "dashed",
                      loading: loading.value,
                      "loading-type": loadingType.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Dashed Button")
                      ]),
                      _: 1
                    }, 8, ["loading", "loading-type"]),
                    createVNode(_component_Button, {
                      type: "text",
                      loading: loading.value,
                      "loading-type": loadingType.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Text Button")
                      ]),
                      _: 1
                    }, 8, ["loading", "loading-type"]),
                    createVNode(_component_Button, {
                      type: "link",
                      loading: loading.value,
                      "loading-type": loadingType.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Link Button")
                      ]),
                      _: 1
                    }, 8, ["loading", "loading-type"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "primary",
                    ghost: "",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Primary Ghost Button`);
                      } else {
                        return [
                          createTextVNode("Primary Ghost Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "danger",
                    ghost: "",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Danger Ghost Button`);
                      } else {
                        return [
                          createTextVNode("Danger Ghost Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, {
                      type: "primary",
                      ghost: "",
                      loading: loading.value,
                      "loading-type": loadingType.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Primary Ghost Button")
                      ]),
                      _: 1
                    }, 8, ["loading", "loading-type"]),
                    createVNode(_component_Button, {
                      type: "danger",
                      ghost: "",
                      loading: loading.value,
                      "loading-type": loadingType.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Danger Ghost Button")
                      ]),
                      _: 1
                    }, 8, ["loading", "loading-type"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "primary",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(SearchOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(SearchOutlined))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "primary",
                    shape: "circle",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(SearchOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(SearchOutlined))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "primary",
                    shape: "round",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(SearchOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(SearchOutlined))
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Search `);
                      } else {
                        return [
                          createTextVNode(" Search ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "primary",
                    shape: "round",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(SearchOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(SearchOutlined))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "danger",
                    ghost: "",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DownloadOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DownloadOutlined))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "danger",
                    ghost: "",
                    shape: "circle",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DownloadOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DownloadOutlined))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "danger",
                    ghost: "",
                    shape: "round",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DownloadOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DownloadOutlined))
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Download `);
                      } else {
                        return [
                          createTextVNode(" Download ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "danger",
                    ghost: "",
                    shape: "round",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DownloadOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DownloadOutlined))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, {
                      type: "primary",
                      loading: loading.value,
                      "loading-type": loadingType.value
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(SearchOutlined))
                      ]),
                      _: 1
                    }, 8, ["loading", "loading-type"]),
                    createVNode(_component_Button, {
                      type: "primary",
                      shape: "circle",
                      loading: loading.value,
                      "loading-type": loadingType.value
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(SearchOutlined))
                      ]),
                      _: 1
                    }, 8, ["loading", "loading-type"]),
                    createVNode(_component_Button, {
                      type: "primary",
                      shape: "round",
                      loading: loading.value,
                      "loading-type": loadingType.value
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(SearchOutlined))
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" Search ")
                      ]),
                      _: 1
                    }, 8, ["loading", "loading-type"]),
                    createVNode(_component_Button, {
                      type: "primary",
                      shape: "round",
                      loading: loading.value,
                      "loading-type": loadingType.value
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(SearchOutlined))
                      ]),
                      _: 1
                    }, 8, ["loading", "loading-type"]),
                    createVNode(_component_Button, {
                      type: "danger",
                      ghost: "",
                      loading: loading.value,
                      "loading-type": loadingType.value
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(DownloadOutlined))
                      ]),
                      _: 1
                    }, 8, ["loading", "loading-type"]),
                    createVNode(_component_Button, {
                      type: "danger",
                      ghost: "",
                      shape: "circle",
                      loading: loading.value,
                      "loading-type": loadingType.value
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(DownloadOutlined))
                      ]),
                      _: 1
                    }, 8, ["loading", "loading-type"]),
                    createVNode(_component_Button, {
                      type: "danger",
                      ghost: "",
                      shape: "round",
                      loading: loading.value,
                      "loading-type": loadingType.value
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(DownloadOutlined))
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" Download ")
                      ]),
                      _: 1
                    }, 8, ["loading", "loading-type"]),
                    createVNode(_component_Button, {
                      type: "danger",
                      ghost: "",
                      shape: "round",
                      loading: loading.value,
                      "loading-type": loadingType.value
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(DownloadOutlined))
                      ]),
                      _: 1
                    }, 8, ["loading", "loading-type"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Space, { align: "center" }, {
                default: withCtx(() => [
                  createTextVNode(" Loading state:"),
                  createVNode(_component_Switch, {
                    modelValue: loading.value,
                    "onUpdate:modelValue": ($event) => loading.value = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_Space, { align: "center" }, {
                default: withCtx(() => [
                  createTextVNode(" Loading type:"),
                  createVNode(_component_Radio, {
                    options: loadingOptions,
                    value: loadingType.value,
                    "onUpdate:value": ($event) => loadingType.value = $event
                  }, null, 8, ["value", "onUpdate:value"])
                ]),
                _: 1
              }),
              createVNode(_component_Space, null, {
                default: withCtx(() => [
                  createVNode(_component_Button, {
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Default Button")
                    ]),
                    _: 1
                  }, 8, ["loading", "loading-type"]),
                  createVNode(_component_Button, {
                    type: "reverse",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Reverse Button")
                    ]),
                    _: 1
                  }, 8, ["loading", "loading-type"]),
                  createVNode(_component_Button, {
                    type: "primary",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Primary Button")
                    ]),
                    _: 1
                  }, 8, ["loading", "loading-type"]),
                  createVNode(_component_Button, {
                    type: "danger",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Danger Button")
                    ]),
                    _: 1
                  }, 8, ["loading", "loading-type"])
                ]),
                _: 1
              }),
              createVNode(_component_Space, null, {
                default: withCtx(() => [
                  createVNode(_component_Button, {
                    type: "dashed",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Dashed Button")
                    ]),
                    _: 1
                  }, 8, ["loading", "loading-type"]),
                  createVNode(_component_Button, {
                    type: "text",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Text Button")
                    ]),
                    _: 1
                  }, 8, ["loading", "loading-type"]),
                  createVNode(_component_Button, {
                    type: "link",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Link Button")
                    ]),
                    _: 1
                  }, 8, ["loading", "loading-type"])
                ]),
                _: 1
              }),
              createVNode(_component_Space, null, {
                default: withCtx(() => [
                  createVNode(_component_Button, {
                    type: "primary",
                    ghost: "",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Primary Ghost Button")
                    ]),
                    _: 1
                  }, 8, ["loading", "loading-type"]),
                  createVNode(_component_Button, {
                    type: "danger",
                    ghost: "",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Danger Ghost Button")
                    ]),
                    _: 1
                  }, 8, ["loading", "loading-type"])
                ]),
                _: 1
              }),
              createVNode(_component_Space, null, {
                default: withCtx(() => [
                  createVNode(_component_Button, {
                    type: "primary",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(SearchOutlined))
                    ]),
                    _: 1
                  }, 8, ["loading", "loading-type"]),
                  createVNode(_component_Button, {
                    type: "primary",
                    shape: "circle",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(SearchOutlined))
                    ]),
                    _: 1
                  }, 8, ["loading", "loading-type"]),
                  createVNode(_component_Button, {
                    type: "primary",
                    shape: "round",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(SearchOutlined))
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" Search ")
                    ]),
                    _: 1
                  }, 8, ["loading", "loading-type"]),
                  createVNode(_component_Button, {
                    type: "primary",
                    shape: "round",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(SearchOutlined))
                    ]),
                    _: 1
                  }, 8, ["loading", "loading-type"]),
                  createVNode(_component_Button, {
                    type: "danger",
                    ghost: "",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(DownloadOutlined))
                    ]),
                    _: 1
                  }, 8, ["loading", "loading-type"]),
                  createVNode(_component_Button, {
                    type: "danger",
                    ghost: "",
                    shape: "circle",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(DownloadOutlined))
                    ]),
                    _: 1
                  }, 8, ["loading", "loading-type"]),
                  createVNode(_component_Button, {
                    type: "danger",
                    ghost: "",
                    shape: "round",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(DownloadOutlined))
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" Download ")
                    ]),
                    _: 1
                  }, 8, ["loading", "loading-type"]),
                  createVNode(_component_Button, {
                    type: "danger",
                    ghost: "",
                    shape: "round",
                    loading: loading.value,
                    "loading-type": loadingType.value
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(DownloadOutlined))
                    ]),
                    _: 1
                  }, 8, ["loading", "loading-type"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-0722847c><summary data-v-0722847c>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-0722847c><button title="Copy Code" class="copy" data-v-0722847c></button><span class="lang" data-v-0722847c>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-0722847c><code data-v-0722847c><span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> setup</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;ts&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> { ref } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c> &#39;vue&#39;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> { SearchOutlined, DownloadOutlined } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c> &#39;@ant-design/icons-vue&#39;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-0722847c> loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ref</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>(</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-0722847c>true</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>)</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-0722847c> loadingOptions</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> [</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  {</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    label: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&#39;static&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>,</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    value: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&#39;static&#39;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  },</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  {</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    label: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&#39;dynamic&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>,</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    value: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&#39;dynamic&#39;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  }</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>]</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c>const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-0722847c> loadingType</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-0722847c> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ref</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&#39;dynamic&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>)</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> vertical</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#B31D28", "--shiki-light-font-style": "italic", "--shiki-dark": "#FDAEB7", "--shiki-dark-font-style": "italic" })}" data-v-0722847c> align</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;center&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt; Loading state:&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Switch</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> v-model</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt; &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#B31D28", "--shiki-light-font-style": "italic", "--shiki-dark": "#FDAEB7", "--shiki-dark-font-style": "italic" })}" data-v-0722847c> align</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;center&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt; Loading type:&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Radio</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>options</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loadingOptions</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> v-model</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loadingType</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt; &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading-type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loadingType</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Default Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;reverse&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading-type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loadingType</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Reverse Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading-type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loadingType</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Primary Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading-type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loadingType</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Danger Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;dashed&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading-type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loadingType</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Dashed Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;text&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading-type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loadingType</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Text Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;link&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading-type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loadingType</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Link Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading-type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loadingType</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Primary Ghost Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading-type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loadingType</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Danger Ghost Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading-type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loadingType</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>SearchOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;circle&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading-type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loadingType</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>SearchOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading-type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loadingType</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>SearchOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        Search</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading-type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loadingType</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>SearchOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading-type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loadingType</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>DownloadOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;circle&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading-type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loadingType</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>DownloadOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading-type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loadingType</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>DownloadOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        Download</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>loading-type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>loadingType</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c>icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>DownloadOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c> /&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span></code></pre></div></details><h2 id="block-按钮" tabindex="-1" data-v-0722847c>block 按钮 <a class="header-anchor" href="#block-按钮" aria-label="Permalink to &quot;block 按钮&quot;" data-v-0722847c>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, { block: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Default Button`);
                } else {
                  return [
                    createTextVNode("Default Button")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              block: "",
              type: "primary",
              shape: "round"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Primary Button`);
                } else {
                  return [
                    createTextVNode("Primary Button")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              block: "",
              type: "danger",
              shape: "round"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Danger Button`);
                } else {
                  return [
                    createTextVNode("Danger Button")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              block: "",
              type: "primary",
              ghost: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Primary Button`);
                } else {
                  return [
                    createTextVNode("Primary Button")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              block: "",
              type: "danger",
              ghost: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Danger Button`);
                } else {
                  return [
                    createTextVNode("Danger Button")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, { block: "" }, {
                default: withCtx(() => [
                  createTextVNode("Default Button")
                ]),
                _: 1
              }),
              createVNode(_component_Button, {
                block: "",
                type: "primary",
                shape: "round"
              }, {
                default: withCtx(() => [
                  createTextVNode("Primary Button")
                ]),
                _: 1
              }),
              createVNode(_component_Button, {
                block: "",
                type: "danger",
                shape: "round"
              }, {
                default: withCtx(() => [
                  createTextVNode("Danger Button")
                ]),
                _: 1
              }),
              createVNode(_component_Button, {
                block: "",
                type: "primary",
                ghost: ""
              }, {
                default: withCtx(() => [
                  createTextVNode("Primary Button")
                ]),
                _: 1
              }),
              createVNode(_component_Button, {
                block: "",
                type: "danger",
                ghost: ""
              }, {
                default: withCtx(() => [
                  createTextVNode("Danger Button")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-0722847c><summary data-v-0722847c>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-0722847c><button title="Copy Code" class="copy" data-v-0722847c></button><span class="lang" data-v-0722847c>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-0722847c><code data-v-0722847c><span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> block</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Default Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> block</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Primary Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> block</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;round&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Danger Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> block</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Primary Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> block</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-0722847c>&quot;danger&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-0722847c> ghost</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;Danger Button&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span>
<span class="line" data-v-0722847c><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-0722847c>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-0722847c>&gt;</span></span></code></pre></div></details><h2 id="apis" tabindex="-1" data-v-0722847c>APIs <a class="header-anchor" href="#apis" aria-label="Permalink to &quot;APIs&quot;" data-v-0722847c>​</a></h2><h3 id="button" tabindex="-1" data-v-0722847c>Button <a class="header-anchor" href="#button" aria-label="Permalink to &quot;Button&quot;" data-v-0722847c>​</a></h3><table tabindex="0" data-v-0722847c><thead data-v-0722847c><tr data-v-0722847c><th data-v-0722847c>参数</th><th data-v-0722847c>说明</th><th data-v-0722847c>类型</th><th data-v-0722847c>默认值</th></tr></thead><tbody data-v-0722847c><tr data-v-0722847c><td data-v-0722847c>type</td><td data-v-0722847c>设置按钮类型</td><td data-v-0722847c>&#39;default&#39; | &#39;reverse&#39; | &#39;primary&#39; | &#39;danger&#39; | &#39;dashed&#39; | &#39;text&#39; | &#39;link&#39;</td><td data-v-0722847c>&#39;default&#39;</td></tr><tr data-v-0722847c><td data-v-0722847c>shape</td><td data-v-0722847c>设置按钮形状</td><td data-v-0722847c>&#39;default&#39; | &#39;circle&#39; | &#39;round&#39;</td><td data-v-0722847c>&#39;default&#39;</td></tr><tr data-v-0722847c><td data-v-0722847c>icon</td><td data-v-0722847c>设置按钮图标</td><td data-v-0722847c>VNode | Slot</td><td data-v-0722847c>undefined</td></tr><tr data-v-0722847c><td data-v-0722847c>size</td><td data-v-0722847c>设置按钮尺寸</td><td data-v-0722847c>&#39;small&#39; | &#39;middle&#39; | &#39;large&#39;</td><td data-v-0722847c>&#39;middle&#39;</td></tr><tr data-v-0722847c><td data-v-0722847c>ghost</td><td data-v-0722847c>按钮背景是否透明，仅当 <code data-v-0722847c>type: &#39;primary&#39; | &#39;danger&#39;</code> 时生效</td><td data-v-0722847c>boolean</td><td data-v-0722847c>false</td></tr><tr data-v-0722847c><td data-v-0722847c>buttonClass</td><td data-v-0722847c>设置按钮类名</td><td data-v-0722847c>string</td><td data-v-0722847c>undefined</td></tr><tr data-v-0722847c><td data-v-0722847c>rippleColor</td><td data-v-0722847c>点击时的波纹颜色，一般不需要设置，默认会根据 <code data-v-0722847c>type</code> 自动匹配，主要用于自定义样式时且 <code data-v-0722847c>type: &#39;default&#39;</code></td><td data-v-0722847c>string</td><td data-v-0722847c>undefined</td></tr><tr data-v-0722847c><td data-v-0722847c>href</td><td data-v-0722847c>点击跳转的地址，与 <code data-v-0722847c>a</code> 链接的 <code data-v-0722847c>href</code> 属性一致</td><td data-v-0722847c>string</td><td data-v-0722847c>undefined</td></tr><tr data-v-0722847c><td data-v-0722847c>target</td><td data-v-0722847c>如何打开目标链接，相当于 <code data-v-0722847c>a</code> 链接的 <code data-v-0722847c>target</code> 属性，<code data-v-0722847c>href</code> 存在时生效</td><td data-v-0722847c>&#39;_self&#39; | &#39;_blank&#39;</td><td data-v-0722847c>&#39;_self&#39;</td></tr><tr data-v-0722847c><td data-v-0722847c>keyboard</td><td data-v-0722847c>是否支持键盘操作</td><td data-v-0722847c>boolean</td><td data-v-0722847c>true</td></tr><tr data-v-0722847c><td data-v-0722847c>disabled</td><td data-v-0722847c>是否禁用</td><td data-v-0722847c>boolean</td><td data-v-0722847c>false</td></tr><tr data-v-0722847c><td data-v-0722847c>loading</td><td data-v-0722847c>是否加载中</td><td data-v-0722847c>boolean</td><td data-v-0722847c>false</td></tr><tr data-v-0722847c><td data-v-0722847c>loadingType</td><td data-v-0722847c>加载指示符类型</td><td data-v-0722847c>&#39;static&#39; | &#39;dynamic&#39;</td><td data-v-0722847c>&#39;dynamic&#39;</td></tr><tr data-v-0722847c><td data-v-0722847c>block</td><td data-v-0722847c>是否将按钮宽度调整为其父宽度</td><td data-v-0722847c>boolean</td><td data-v-0722847c>false</td></tr></tbody></table><h2 id="events" tabindex="-1" data-v-0722847c>Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;" data-v-0722847c>​</a></h2><table tabindex="0" data-v-0722847c><thead data-v-0722847c><tr data-v-0722847c><th data-v-0722847c>名称</th><th data-v-0722847c>说明</th><th data-v-0722847c>类型</th></tr></thead><tbody data-v-0722847c><tr data-v-0722847c><td data-v-0722847c>click</td><td data-v-0722847c>点击按钮时的回调</td><td data-v-0722847c>(e: Event) =&gt; void</td></tr></tbody></table></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/components/button.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const button = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0722847c"]]);
export {
  __pageData,
  button as default
};
