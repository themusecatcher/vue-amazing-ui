import { defineComponent, ref, resolveComponent, withCtx, createVNode, unref, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { ClockCircleOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"徽标 Badge","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/badge.md","filePath":"guide/components/badge.md","lastUpdated":1729670212000}');
const __default__ = { name: "guide/components/badge.md" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    const value = ref(5);
    const dot = ref(true);
    const colors = [
      "pink",
      "red",
      "yellow",
      "orange",
      "cyan",
      "green",
      "blue",
      "purple",
      "geekblue",
      "magenta",
      "volcano",
      "gold",
      "lime"
    ];
    function decline() {
      if (value.value >= 1) {
        value.value--;
      }
    }
    function increase() {
      value.value++;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_GlobalElement = resolveComponent("GlobalElement");
      const _component_Space = resolveComponent("Space");
      const _component_Badge = resolveComponent("Badge", true);
      const _component_Avatar = resolveComponent("Avatar");
      const _component_Flex = resolveComponent("Flex");
      const _component_Button = resolveComponent("Button");
      const _component_Switch = resolveComponent("Switch");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-77360885><h1 id="徽标-badge" tabindex="-1" data-v-77360885>徽标 Badge <a class="header-anchor" href="#徽标-badge" aria-label="Permalink to &quot;徽标 Badge&quot;" data-v-77360885>​</a></h1>`);
      _push(ssrRenderComponent(_component_GlobalElement, null, null, _parent));
      _push(`<p data-v-77360885><em data-v-77360885>图标右上角的圆形徽标数字或文本前的状态小圆点</em></p><h2 id="何时使用" tabindex="-1" data-v-77360885>何时使用 <a class="header-anchor" href="#何时使用" aria-label="Permalink to &quot;何时使用&quot;" data-v-77360885>​</a></h2><ul data-v-77360885><li data-v-77360885>一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理</li></ul><h2 id="基本使用" tabindex="-1" data-v-77360885>基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;" data-v-77360885>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Badge, { value: 5 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Avatar, {
                      shape: "square",
                      size: "large"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Badge, {
              value: 0,
              "show-zero": ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Avatar, {
                      shape: "square",
                      size: "large"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Badge, null, {
              value: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ClockCircleOutlined), { style: { "color": "#f5222d" } }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ClockCircleOutlined), { style: { "color": "#f5222d" } })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Avatar, {
                      shape: "square",
                      size: "large"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Badge, { value: 5 }, {
                default: withCtx(() => [
                  createVNode(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Badge, {
                value: 0,
                "show-zero": ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Badge, null, {
                value: withCtx(() => [
                  createVNode(unref(ClockCircleOutlined), { style: { "color": "#f5222d" } })
                ]),
                default: withCtx(() => [
                  createVNode(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-77360885><summary data-v-77360885>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-77360885><button title="Copy Code" class="copy" data-v-77360885></button><span class="lang" data-v-77360885>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-77360885><code data-v-77360885><span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> setup</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;ts&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-77360885>import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> { ClockCircleOutlined } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-77360885>from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885> &#39;@ant-design/icons-vue&#39;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885>5</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Avatar</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;square&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885>0</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> show-zero</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Avatar</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;square&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>ClockCircleOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885>color</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885>#f5222d</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Avatar</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;square&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span></code></pre></div></details><h2 id="独立使用" tabindex="-1" data-v-77360885>独立使用 <a class="header-anchor" href="#独立使用" aria-label="Permalink to &quot;独立使用&quot;" data-v-77360885>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Badge, { value: 25 }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Badge, {
              value: 4,
              "value-style": {
                backgroundColor: "#fff",
                color: "#999",
                boxShadow: "0 0 0 1px #d9d9d9 inset"
              }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Badge, {
              value: 109,
              "value-style": { backgroundColor: "#52c41a" }
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Badge, { value: 25 }),
              createVNode(_component_Badge, {
                value: 4,
                "value-style": {
                  backgroundColor: "#fff",
                  color: "#999",
                  boxShadow: "0 0 0 1px #d9d9d9 inset"
                }
              }),
              createVNode(_component_Badge, {
                value: 109,
                "value-style": { backgroundColor: "#52c41a" }
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-77360885><summary data-v-77360885>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-77360885><button title="Copy Code" class="copy" data-v-77360885></button><span class="lang" data-v-77360885>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-77360885><code data-v-77360885><span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885>25</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>value-style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>{</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>        backgroundColor: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&#39;#fff&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>,</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>        color: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&#39;#999&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>,</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>        boxShadow: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&#39;0 0 0 1px #d9d9d9 inset&#39;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885>109</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>value-style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>{ backgroundColor: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&#39;#52c41a&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span></code></pre></div></details><h2 id="封顶数字" tabindex="-1" data-v-77360885>封顶数字 <a class="header-anchor" href="#封顶数字" aria-label="Permalink to &quot;封顶数字&quot;" data-v-77360885>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, { gap: "large" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Badge, { value: 99 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Avatar, {
                      shape: "square",
                      size: "large"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Badge, { value: 100 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Avatar, {
                      shape: "square",
                      size: "large"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Badge, {
              value: 99,
              max: 10
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Avatar, {
                      shape: "square",
                      size: "large"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Badge, {
              value: 1e3,
              max: 999
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Avatar, {
                      shape: "square",
                      size: "large"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Badge, { value: 99 }, {
                default: withCtx(() => [
                  createVNode(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Badge, { value: 100 }, {
                default: withCtx(() => [
                  createVNode(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Badge, {
                value: 99,
                max: 10
              }, {
                default: withCtx(() => [
                  createVNode(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Badge, {
                value: 1e3,
                max: 999
              }, {
                default: withCtx(() => [
                  createVNode(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-77360885><summary data-v-77360885>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-77360885><button title="Copy Code" class="copy" data-v-77360885></button><span class="lang" data-v-77360885>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-77360885><code data-v-77360885><span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> gap</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885>99</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Avatar</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;square&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885>100</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Avatar</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;square&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885>99</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>max</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885>10</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Avatar</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;square&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885>1000</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>max</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885>999</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Avatar</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;square&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span></code></pre></div></details><h2 id="自定义内容" tabindex="-1" data-v-77360885>自定义内容 <a class="header-anchor" href="#自定义内容" aria-label="Permalink to &quot;自定义内容&quot;" data-v-77360885>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, { gap: "large" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Badge, {
              value: "hello",
              "value-style": { backgroundColor: "#1677FF" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Avatar, {
                      shape: "square",
                      size: "large"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Badge, null, {
              value: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="u-value" data-v-77360885${_scopeId2}>world</span>`);
                } else {
                  return [
                    createVNode("span", { class: "u-value" }, "world")
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Avatar, {
                      shape: "square",
                      size: "large"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Badge, {
                value: "hello",
                "value-style": { backgroundColor: "#1677FF" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Badge, null, {
                value: withCtx(() => [
                  createVNode("span", { class: "u-value" }, "world")
                ]),
                default: withCtx(() => [
                  createVNode(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-77360885><summary data-v-77360885>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-77360885><button title="Copy Code" class="copy" data-v-77360885></button><span class="lang" data-v-77360885>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-77360885><code data-v-77360885><span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> gap</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;hello&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>value-style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>{ backgroundColor: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&#39;#1677FF&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Avatar</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;square&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;u-value&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;world&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>span</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Avatar</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;square&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;less&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> scoped</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>.u-value {</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  display: inline-block;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  line-height: 20px;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  padding: 0 6px;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  background-color: #FAAD14;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  color: #FFF;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  border-radius: 10px;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  box-shadow: 0 0 0 1px #ffffff;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>}</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span></code></pre></div></details><h2 id="自定义徽标样式" tabindex="-1" data-v-77360885>自定义徽标样式 <a class="header-anchor" href="#自定义徽标样式" aria-label="Permalink to &quot;自定义徽标样式&quot;" data-v-77360885>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, { gap: "large" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Badge, {
              value: 99,
              "value-style": { backgroundColor: "magenta" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Avatar, {
                      shape: "square",
                      size: "large"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Badge, {
              value: "hello",
              "value-style": { backgroundColor: "gold" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Avatar, {
                      shape: "square",
                      size: "large"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Badge, {
              dot: "",
              "value-style": { width: "10px", height: "10px", backgroundColor: "purple" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Avatar, {
                      shape: "square",
                      size: "large"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Badge, {
                value: 99,
                "value-style": { backgroundColor: "magenta" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Badge, {
                value: "hello",
                "value-style": { backgroundColor: "gold" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Badge, {
                dot: "",
                "value-style": { width: "10px", height: "10px", backgroundColor: "purple" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-77360885><summary data-v-77360885>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-77360885><button title="Copy Code" class="copy" data-v-77360885></button><span class="lang" data-v-77360885>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-77360885><code data-v-77360885><span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> gap</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885>99</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>value-style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>{ backgroundColor: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&#39;magenta&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Avatar</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;square&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;hello&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>value-style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>{ backgroundColor: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&#39;gold&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Avatar</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;square&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> dot</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>value-style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>{ width: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&#39;10px&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>, height: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&#39;10px&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>, backgroundColor: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&#39;purple&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Avatar</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;square&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span></code></pre></div></details><h2 id="徽标偏移" tabindex="-1" data-v-77360885>徽标偏移 <a class="header-anchor" href="#徽标偏移" aria-label="Permalink to &quot;徽标偏移&quot;" data-v-77360885>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, { gap: "large" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Badge, {
              value: "9",
              offset: [-20, 10]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Avatar, {
                      shape: "square",
                      size: "large"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Badge, {
              dot: "",
              offset: [-15, 10]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Avatar, {
                      shape: "square",
                      size: "large"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Badge, {
              dot: "",
              status: "success",
              offset: ["-50%", "30%"]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Avatar, {
                      shape: "square",
                      size: "large"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Badge, {
                value: "9",
                offset: [-20, 10]
              }, {
                default: withCtx(() => [
                  createVNode(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Badge, {
                dot: "",
                offset: [-15, 10]
              }, {
                default: withCtx(() => [
                  createVNode(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Badge, {
                dot: "",
                status: "success",
                offset: ["-50%", "30%"]
              }, {
                default: withCtx(() => [
                  createVNode(_component_Avatar, {
                    shape: "square",
                    size: "large"
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-77360885><summary data-v-77360885>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-77360885><button title="Copy Code" class="copy" data-v-77360885></button><span class="lang" data-v-77360885>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-77360885><code data-v-77360885><span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> gap</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;9&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>offset</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>[</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-77360885>-</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885>20</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>, </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885>10</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>]</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Avatar</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;square&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> dot</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>offset</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>[</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-77360885>-</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885>15</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>, </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885>10</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>]</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Avatar</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;square&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> dot</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> status</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;success&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>offset</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>[</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&#39;-50%&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>, </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&#39;30%&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>]</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Avatar</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;square&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span></code></pre></div></details><h2 id="小红点" tabindex="-1" data-v-77360885>小红点 <a class="header-anchor" href="#小红点" aria-label="Permalink to &quot;小红点&quot;" data-v-77360885>​</a></h2>`);
      _push(ssrRenderComponent(_component_Badge, { dot: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a href="#" data-v-77360885${_scopeId}>Link something</a>`);
          } else {
            return [
              createVNode("a", { href: "#" }, "Link something")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-77360885><summary data-v-77360885>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-77360885><button title="Copy Code" class="copy" data-v-77360885></button><span class="lang" data-v-77360885>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-77360885><code data-v-77360885><span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> dot</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>a</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> href</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;#&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;Link something&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>a</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span></code></pre></div></details><h2 id="状态点" tabindex="-1" data-v-77360885>状态点 <a class="header-anchor" href="#状态点" aria-label="Permalink to &quot;状态点&quot;" data-v-77360885>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Badge, { status: "success" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Badge, { status: "error" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Badge, { status: "default" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Badge, { status: "processing" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Badge, { status: "warning" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Badge, { status: "success" }),
              createVNode(_component_Badge, { status: "error" }),
              createVNode(_component_Badge, { status: "default" }),
              createVNode(_component_Badge, { status: "processing" }),
              createVNode(_component_Badge, { status: "warning" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<br data-v-77360885>`);
      _push(ssrRenderComponent(_component_Space, {
        style: { "margin-top": "10px" },
        vertical: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Badge, {
              status: "success",
              text: "Success"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Badge, {
              status: "error",
              text: "Error"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Badge, {
              status: "default",
              text: "Default"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Badge, {
              status: "processing",
              text: "Processing"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Badge, {
              status: "warning",
              text: "warning"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Badge, {
                status: "success",
                text: "Success"
              }),
              createVNode(_component_Badge, {
                status: "error",
                text: "Error"
              }),
              createVNode(_component_Badge, {
                status: "default",
                text: "Default"
              }),
              createVNode(_component_Badge, {
                status: "processing",
                text: "Processing"
              }),
              createVNode(_component_Badge, {
                status: "warning",
                text: "warning"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-77360885><summary data-v-77360885>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-77360885><button title="Copy Code" class="copy" data-v-77360885></button><span class="lang" data-v-77360885>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-77360885><code data-v-77360885><span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> status</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;success&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> status</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;error&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> status</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;default&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> status</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;processing&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> status</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;warning&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>br</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>/&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885>margin-top</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885>10</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-77360885>px</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>;</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> vertical</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> status</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;success&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> text</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;Success&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> status</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;error&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> text</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;Error&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> status</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;default&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> text</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;Default&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> status</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;processing&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> text</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;Processing&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> status</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;warning&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> text</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;warning&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span></code></pre></div></details><h2 id="动态" tabindex="-1" data-v-77360885>动态 <a class="header-anchor" href="#动态" aria-label="Permalink to &quot;动态&quot;" data-v-77360885>​</a></h2>`);
      _push(ssrRenderComponent(_component_Flex, { vertical: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Space, {
              gap: "large",
              align: "center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Badge, { value: value.value }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Avatar, {
                          shape: "square",
                          size: "large"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Avatar, {
                            shape: "square",
                            size: "large"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, { onClick: decline }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(MinusOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(MinusOutlined))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, { onClick: increase }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(PlusOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(PlusOutlined))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Badge, { value: value.value }, {
                      default: withCtx(() => [
                        createVNode(_component_Avatar, {
                          shape: "square",
                          size: "large"
                        })
                      ]),
                      _: 1
                    }, 8, ["value"]),
                    createVNode(_component_Button, { onClick: decline }, {
                      default: withCtx(() => [
                        createVNode(unref(MinusOutlined))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Button, { onClick: increase }, {
                      default: withCtx(() => [
                        createVNode(unref(PlusOutlined))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Space, {
              gap: "large",
              align: "center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Badge, { dot: dot.value }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Avatar, {
                          shape: "square",
                          size: "large"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Avatar, {
                            shape: "square",
                            size: "large"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Switch, {
                    modelValue: dot.value,
                    "onUpdate:modelValue": ($event) => dot.value = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Badge, { dot: dot.value }, {
                      default: withCtx(() => [
                        createVNode(_component_Avatar, {
                          shape: "square",
                          size: "large"
                        })
                      ]),
                      _: 1
                    }, 8, ["dot"]),
                    createVNode(_component_Switch, {
                      modelValue: dot.value,
                      "onUpdate:modelValue": ($event) => dot.value = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Space, {
                gap: "large",
                align: "center"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Badge, { value: value.value }, {
                    default: withCtx(() => [
                      createVNode(_component_Avatar, {
                        shape: "square",
                        size: "large"
                      })
                    ]),
                    _: 1
                  }, 8, ["value"]),
                  createVNode(_component_Button, { onClick: decline }, {
                    default: withCtx(() => [
                      createVNode(unref(MinusOutlined))
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Button, { onClick: increase }, {
                    default: withCtx(() => [
                      createVNode(unref(PlusOutlined))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Space, {
                gap: "large",
                align: "center"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Badge, { dot: dot.value }, {
                    default: withCtx(() => [
                      createVNode(_component_Avatar, {
                        shape: "square",
                        size: "large"
                      })
                    ]),
                    _: 1
                  }, 8, ["dot"]),
                  createVNode(_component_Switch, {
                    modelValue: dot.value,
                    "onUpdate:modelValue": ($event) => dot.value = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-77360885><summary data-v-77360885>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-77360885><button title="Copy Code" class="copy" data-v-77360885></button><span class="lang" data-v-77360885>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-77360885><code data-v-77360885><span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> setup</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;ts&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-77360885>import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> { MinusOutlined, PlusOutlined } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-77360885>from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885> &#39;@ant-design/icons-vue&#39;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-77360885>const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885> value</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-77360885> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> ref</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>(</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885>5</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>)</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-77360885>const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885> dot</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-77360885> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> ref</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>(</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885>true</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>)</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-77360885>function</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> decline</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> () {</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-77360885>  if</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> (count.value </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-77360885>&gt;=</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885> 1</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>) {</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    count.value</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-77360885>--</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  }</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>}</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-77360885>function</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> increase</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> () {</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  count.value</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-77360885>++</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>}</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> vertical</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> gap</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#B31D28", "--shiki-light-font-style": "italic", "--shiki-dark": "#FDAEB7", "--shiki-dark-font-style": "italic" })}" data-v-77360885> align</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;center&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>value</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Avatar</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;square&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> @</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>click</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>decline</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>MinusOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> @</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>click</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>increase</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>PlusOutlined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> gap</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#B31D28", "--shiki-light-font-style": "italic", "--shiki-dark": "#FDAEB7", "--shiki-dark-font-style": "italic" })}" data-v-77360885> align</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;center&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>dot</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>dot</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Avatar</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;square&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Switch</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> v-model</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>dot</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span></code></pre></div></details><h2 id="自定义悬浮状态点的显示文字" tabindex="-1" data-v-77360885>自定义悬浮状态点的显示文字 <a class="header-anchor" href="#自定义悬浮状态点的显示文字" aria-label="Permalink to &quot;自定义悬浮状态点的显示文字&quot;" data-v-77360885>​</a></h2>`);
      _push(ssrRenderComponent(_component_Badge, {
        value: 5,
        title: "Custom hover text"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Avatar, {
              shape: "square",
              size: "large"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Avatar, {
                shape: "square",
                size: "large"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-77360885><summary data-v-77360885>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-77360885><button title="Copy Code" class="copy" data-v-77360885></button><span class="lang" data-v-77360885>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-77360885><code data-v-77360885><span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885>5</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> title</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;Custom hover text&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Avatar</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> shape</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;square&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> size</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span></code></pre></div></details><h2 id="多彩徽标" tabindex="-1" data-v-77360885>多彩徽标 <a class="header-anchor" href="#多彩徽标" aria-label="Permalink to &quot;多彩徽标&quot;" data-v-77360885>​</a></h2><h3 id="presets" tabindex="-1" data-v-77360885>Presets <a class="header-anchor" href="#presets" aria-label="Permalink to &quot;Presets&quot;" data-v-77360885>​</a></h3>`);
      _push(ssrRenderComponent(_component_Space, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(colors, (color) => {
              _push2(ssrRenderComponent(_component_Badge, {
                key: color,
                color,
                text: color
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(colors, (color) => {
                return createVNode(_component_Badge, {
                  key: color,
                  color,
                  text: color
                }, null, 8, ["color", "text"]);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-77360885><summary data-v-77360885>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-77360885><button title="Copy Code" class="copy" data-v-77360885></button><span class="lang" data-v-77360885>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-77360885><code data-v-77360885><span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> setup</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;ts&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-77360885>const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-77360885> colors</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-77360885> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> [</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>  &#39;pink&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>,</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>  &#39;red&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>,</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>  &#39;yellow&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>,</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>  &#39;orange&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>,</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>  &#39;cyan&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>,</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>  &#39;green&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>,</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>  &#39;blue&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>,</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>  &#39;purple&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>,</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>  &#39;geekblue&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>,</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>  &#39;magenta&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>,</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>  &#39;volcano&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>,</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>  &#39;gold&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>,</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>  &#39;lime&#39;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>]</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-77360885> v-for</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>color </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-77360885>in</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> colors</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>key</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>color</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>color</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>color</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885>text</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>color</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span></code></pre></div></details><h3 id="custom" tabindex="-1" data-v-77360885>Custom <a class="header-anchor" href="#custom" aria-label="Permalink to &quot;Custom&quot;" data-v-77360885>​</a></h3>`);
      _push(ssrRenderComponent(_component_Space, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Badge, {
              color: "#f50",
              text: "#f50"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Badge, {
              color: "#2db7f5",
              text: "#2db7f5"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Badge, {
              color: "#87d068",
              text: "#87d068"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Badge, {
              color: "#108ee9",
              text: "#108ee9"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Badge, {
                color: "#f50",
                text: "#f50"
              }),
              createVNode(_component_Badge, {
                color: "#2db7f5",
                text: "#2db7f5"
              }),
              createVNode(_component_Badge, {
                color: "#87d068",
                text: "#87d068"
              }),
              createVNode(_component_Badge, {
                color: "#108ee9",
                text: "#108ee9"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-77360885><summary data-v-77360885>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-77360885><button title="Copy Code" class="copy" data-v-77360885></button><span class="lang" data-v-77360885>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-77360885><code data-v-77360885><span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> color</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;#f50&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> text</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;#f50&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> color</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;#2db7f5&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> text</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;#2db7f5&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> color</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;#87d068&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> text</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;#87d068&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> color</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;#108ee9&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-77360885> text</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-77360885>&quot;#108ee9&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885> /&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span>
<span class="line" data-v-77360885><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-77360885>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-77360885>&gt;</span></span></code></pre></div></details><h2 id="apis" tabindex="-1" data-v-77360885>APIs <a class="header-anchor" href="#apis" aria-label="Permalink to &quot;APIs&quot;" data-v-77360885>​</a></h2><h3 id="badge" tabindex="-1" data-v-77360885>Badge <a class="header-anchor" href="#badge" aria-label="Permalink to &quot;Badge&quot;" data-v-77360885>​</a></h3><table tabindex="0" data-v-77360885><thead data-v-77360885><tr data-v-77360885><th data-v-77360885>参数</th><th data-v-77360885>说明</th><th data-v-77360885>类型</th><th data-v-77360885>默认值</th></tr></thead><tbody data-v-77360885><tr data-v-77360885><td data-v-77360885>color</td><td data-v-77360885>自定义小圆点的颜色，优先级高于 <code data-v-77360885>status</code></td><td data-v-77360885><a href="#presetcolor-enum-type" data-v-77360885>PresetColor</a> | string</td><td data-v-77360885>undefined</td></tr><tr data-v-77360885><td data-v-77360885>value</td><td data-v-77360885>展示的数字或文字，为数字时大于 <code data-v-77360885>max</code> 显示为 <code data-v-77360885>max+</code>，为 <code data-v-77360885>0</code> 时隐藏</td><td data-v-77360885>number | string | slot</td><td data-v-77360885>undefined</td></tr><tr data-v-77360885><td data-v-77360885>max</td><td data-v-77360885>展示封顶的数字值</td><td data-v-77360885>number</td><td data-v-77360885>99</td></tr><tr data-v-77360885><td data-v-77360885>showZero</td><td data-v-77360885>当数值为 <code data-v-77360885>0</code> 时，是否展示 <code data-v-77360885>Badge</code></td><td data-v-77360885>boolean</td><td data-v-77360885>false</td></tr><tr data-v-77360885><td data-v-77360885>dot</td><td data-v-77360885>不展示数字，只有一个小红点</td><td data-v-77360885>boolean</td><td data-v-77360885>false</td></tr><tr data-v-77360885><td data-v-77360885>offset</td><td data-v-77360885>设置状态点的位置偏移，距默认位置左侧、上方的偏移量 <code data-v-77360885>[x, y]: [水平偏移, 垂直偏移]</code></td><td data-v-77360885>[number | string, number | string]</td><td data-v-77360885>undefined</td></tr><tr data-v-77360885><td data-v-77360885>status</td><td data-v-77360885>设置 <code data-v-77360885>Badge</code> 为状态点</td><td data-v-77360885><a href="#status-enum-type" data-v-77360885>Status</a></td><td data-v-77360885>undefined</td></tr><tr data-v-77360885><td data-v-77360885>text</td><td data-v-77360885>在设置了 <code data-v-77360885>status</code> 的前提下有效，设置状态点的文本</td><td data-v-77360885>string | slot</td><td data-v-77360885>undefined</td></tr><tr data-v-77360885><td data-v-77360885>valueStyle</td><td data-v-77360885>设置徽标的样式</td><td data-v-77360885><a href="https://cn.vuejs.org/api/utility-types.html#cssproperties" target="_blank" rel="noreferrer" data-v-77360885>CSSProperties</a></td><td data-v-77360885>{}</td></tr><tr data-v-77360885><td data-v-77360885>zIndex</td><td data-v-77360885>设置徽标的 <code data-v-77360885>z-index</code></td><td data-v-77360885>number</td><td data-v-77360885>9</td></tr><tr data-v-77360885><td data-v-77360885>title</td><td data-v-77360885>设置鼠标放在状态点上时显示的文字</td><td data-v-77360885>string</td><td data-v-77360885>undefined</td></tr><tr data-v-77360885><td data-v-77360885>ripple</td><td data-v-77360885>是否开启涟漪动画效果</td><td data-v-77360885>boolean</td><td data-v-77360885>true</td></tr></tbody></table><h3 id="presetcolor-enum-type" tabindex="-1" data-v-77360885>PresetColor Enum Type <a class="header-anchor" href="#presetcolor-enum-type" aria-label="Permalink to &quot;PresetColor Enum Type&quot;" data-v-77360885>​</a></h3><table tabindex="0" data-v-77360885><thead data-v-77360885><tr data-v-77360885><th data-v-77360885>成员名</th><th data-v-77360885>值</th></tr></thead><tbody data-v-77360885><tr data-v-77360885><td data-v-77360885>pink</td><td data-v-77360885>&#39;pink&#39;</td></tr><tr data-v-77360885><td data-v-77360885>red</td><td data-v-77360885>&#39;red&#39;</td></tr><tr data-v-77360885><td data-v-77360885>yellow</td><td data-v-77360885>&#39;yellow&#39;</td></tr><tr data-v-77360885><td data-v-77360885>orange</td><td data-v-77360885>&#39;orange&#39;</td></tr><tr data-v-77360885><td data-v-77360885>cyan</td><td data-v-77360885>&#39;cyan&#39;</td></tr><tr data-v-77360885><td data-v-77360885>green</td><td data-v-77360885>&#39;green&#39;</td></tr><tr data-v-77360885><td data-v-77360885>blue</td><td data-v-77360885>&#39;blue&#39;</td></tr><tr data-v-77360885><td data-v-77360885>purple</td><td data-v-77360885>&#39;purple&#39;</td></tr><tr data-v-77360885><td data-v-77360885>geekblue</td><td data-v-77360885>&#39;geekblue&#39;</td></tr><tr data-v-77360885><td data-v-77360885>magenta</td><td data-v-77360885>&#39;magenta&#39;</td></tr><tr data-v-77360885><td data-v-77360885>volcano</td><td data-v-77360885>&#39;volcano&#39;</td></tr><tr data-v-77360885><td data-v-77360885>gold</td><td data-v-77360885>&#39;gold&#39;</td></tr><tr data-v-77360885><td data-v-77360885>lime</td><td data-v-77360885>&#39;lime</td></tr></tbody></table><h3 id="status-enum-type" tabindex="-1" data-v-77360885>Status Enum Type <a class="header-anchor" href="#status-enum-type" aria-label="Permalink to &quot;Status Enum Type&quot;" data-v-77360885>​</a></h3><table tabindex="0" data-v-77360885><thead data-v-77360885><tr data-v-77360885><th data-v-77360885>成员名</th><th data-v-77360885>值</th></tr></thead><tbody data-v-77360885><tr data-v-77360885><td data-v-77360885>success</td><td data-v-77360885>&#39;success&#39;</td></tr><tr data-v-77360885><td data-v-77360885>processing</td><td data-v-77360885>&#39;processing&#39;</td></tr><tr data-v-77360885><td data-v-77360885>default</td><td data-v-77360885>&#39;default&#39;</td></tr><tr data-v-77360885><td data-v-77360885>error</td><td data-v-77360885>&#39;error&#39;</td></tr><tr data-v-77360885><td data-v-77360885>warning</td><td data-v-77360885>&#39;warning&#39;</td></tr></tbody></table></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/components/badge.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const badge = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-77360885"]]);
export {
  __pageData,
  badge as default
};
