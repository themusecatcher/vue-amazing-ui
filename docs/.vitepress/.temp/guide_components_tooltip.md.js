import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"文字提示 Tooltip","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/tooltip.md","filePath":"guide/components/tooltip.md","lastUpdated":1732539157000}');
const __default__ = { name: "guide/components/tooltip.md" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    const tooltip2 = ref();
    function openChange(open) {
      console.log("open", open);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_GlobalElement = resolveComponent("GlobalElement");
      const _component_Space = resolveComponent("Space");
      const _component_Tooltip = resolveComponent("Tooltip", true);
      const _component_Button = resolveComponent("Button");
      const _component_Flex = resolveComponent("Flex");
      const _component_Tag = resolveComponent("Tag");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-fc14ff8d><h1 id="文字提示-tooltip" tabindex="-1" data-v-fc14ff8d>文字提示 Tooltip <a class="header-anchor" href="#文字提示-tooltip" aria-label="Permalink to &quot;文字提示 Tooltip&quot;" data-v-fc14ff8d>​</a></h1>`);
      _push(ssrRenderComponent(_component_GlobalElement, null, null, _parent));
      _push(`<p data-v-fc14ff8d><em data-v-fc14ff8d>悬浮提示，展现需要关注的信息</em></p><h2 id="何时使用" tabindex="-1" data-v-fc14ff8d>何时使用 <a class="header-anchor" href="#何时使用" aria-label="Permalink to &quot;何时使用&quot;" data-v-fc14ff8d>​</a></h2><ul data-v-fc14ff8d><li data-v-fc14ff8d>当某个页面需要向用户显示警告的信息时</li></ul><h2 id="基本使用" tabindex="-1" data-v-fc14ff8d>基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;" data-v-fc14ff8d>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Tooltip, {
              tooltip: "Tesla",
              onOpenChange: openChange
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, { type: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`特斯拉`);
                      } else {
                        return [
                          createTextVNode("特斯拉")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("特斯拉")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tooltip, {
              tooltip: "Godzilla",
              onOpenChange: openChange
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, { type: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`哥斯拉`);
                      } else {
                        return [
                          createTextVNode("哥斯拉")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("哥斯拉")
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
              createVNode(_component_Tooltip, {
                tooltip: "Tesla",
                onOpenChange: openChange
              }, {
                default: withCtx(() => [
                  createVNode(_component_Button, { type: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode("特斯拉")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Tooltip, {
                tooltip: "Godzilla",
                onOpenChange: openChange
              }, {
                default: withCtx(() => [
                  createVNode(_component_Button, { type: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode("哥斯拉")
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
      _push(`<details class="details custom-block" data-v-fc14ff8d><summary data-v-fc14ff8d>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-fc14ff8d><button title="Copy Code" class="copy" data-v-fc14ff8d></button><span class="lang" data-v-fc14ff8d>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-fc14ff8d><code data-v-fc14ff8d><span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> setup</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;ts&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-fc14ff8d>function</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> openChange</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d> (</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}" data-v-fc14ff8d>open</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-fc14ff8d>:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-fc14ff8d> boolean</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>) {</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  console.</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>log</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&#39;open&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>, open)</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>}</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;Tesla&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d> @</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>open-change</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>openChange</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;特斯拉&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;Godzilla&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d> @</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>open-change</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>openChange</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;哥斯拉&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span></code></pre></div></details><h2 id="自定义样式" tabindex="-1" data-v-fc14ff8d>自定义样式 <a class="header-anchor" href="#自定义样式" aria-label="Permalink to &quot;自定义样式&quot;" data-v-fc14ff8d>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, { gap: "large" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Tooltip, {
              "max-width": 360,
              "bg-color": "#fff",
              "tooltip-class": "custom-class"
            }, {
              tooltip: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p style="${ssrRenderStyle({ "text-align": "center" })}" data-v-fc14ff8d${_scopeId2}>Batman VS Superman</p> 电影讲述了超人帮助人类解决了很多问题，成为了人类的神，却引起了莱克斯·卢瑟的嫉妒，从而挑拨蝙蝠侠与超人之间战斗的故事 `);
                } else {
                  return [
                    createVNode("p", { style: { "text-align": "center" } }, "Batman VS Superman"),
                    createTextVNode(" 电影讲述了超人帮助人类解决了很多问题，成为了人类的神，却引起了莱克斯·卢瑟的嫉妒，从而挑拨蝙蝠侠与超人之间战斗的故事 ")
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, { type: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`蝙蝠侠大战超人`);
                      } else {
                        return [
                          createTextVNode("蝙蝠侠大战超人")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("蝙蝠侠大战超人")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tooltip, {
              "max-width": 360,
              "bg-color": "#fff",
              "tooltip-style": {
                padding: "12px 18px",
                borderRadius: "12px",
                fontSize: "16px",
                color: "rgba(0, 0, 0, 0.88)"
              }
            }, {
              tooltip: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h3 style="${ssrRenderStyle({ "text-align": "center", "margin": "0 0 8px" })}" data-v-fc14ff8d${_scopeId2}>Godzilla VS Kong</h3> 电影讲述帝王组织在地心世界找到巨兽起源的线索，与此同时传说中的王者哥斯拉和金刚的对决也将展开的故事 `);
                } else {
                  return [
                    createVNode("h3", { style: { "text-align": "center", "margin": "0 0 8px" } }, "Godzilla VS Kong"),
                    createTextVNode(" 电影讲述帝王组织在地心世界找到巨兽起源的线索，与此同时传说中的王者哥斯拉和金刚的对决也将展开的故事 ")
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, { type: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`哥斯拉大战金刚`);
                      } else {
                        return [
                          createTextVNode("哥斯拉大战金刚")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("哥斯拉大战金刚")
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
              createVNode(_component_Tooltip, {
                "max-width": 360,
                "bg-color": "#fff",
                "tooltip-class": "custom-class"
              }, {
                tooltip: withCtx(() => [
                  createVNode("p", { style: { "text-align": "center" } }, "Batman VS Superman"),
                  createTextVNode(" 电影讲述了超人帮助人类解决了很多问题，成为了人类的神，却引起了莱克斯·卢瑟的嫉妒，从而挑拨蝙蝠侠与超人之间战斗的故事 ")
                ]),
                default: withCtx(() => [
                  createVNode(_component_Button, { type: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode("蝙蝠侠大战超人")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Tooltip, {
                "max-width": 360,
                "bg-color": "#fff",
                "tooltip-style": {
                  padding: "12px 18px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  color: "rgba(0, 0, 0, 0.88)"
                }
              }, {
                tooltip: withCtx(() => [
                  createVNode("h3", { style: { "text-align": "center", "margin": "0 0 8px" } }, "Godzilla VS Kong"),
                  createTextVNode(" 电影讲述帝王组织在地心世界找到巨兽起源的线索，与此同时传说中的王者哥斯拉和金刚的对决也将展开的故事 ")
                ]),
                default: withCtx(() => [
                  createVNode(_component_Button, { type: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode("哥斯拉大战金刚")
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
      _push(`<details class="details custom-block" data-v-fc14ff8d><summary data-v-fc14ff8d>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-fc14ff8d><button title="Copy Code" class="copy" data-v-fc14ff8d></button><span class="lang" data-v-fc14ff8d>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-fc14ff8d><code data-v-fc14ff8d><span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> gap</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>max-width</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-fc14ff8d>360</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> bg-color</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;#fff&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> tooltip-class</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;custom-class&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-fc14ff8d>text-align</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-fc14ff8d>center</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;Batman VS Superman&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>        电影讲述了超人帮助人类解决了很多问题，成为了人类的神，却引起了莱克斯·卢瑟的嫉妒，从而挑拨蝙蝠侠与超人之间战斗的故事</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;蝙蝠侠大战超人&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>max-width</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-fc14ff8d>360</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>      bg-color</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;#fff&quot;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>tooltip-style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>{</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>        padding: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&#39;12px 18px&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>,</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>        borderRadius: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&#39;12px&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>,</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>        fontSize: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&#39;16px&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>,</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>        color: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&#39;rgba(0, 0, 0, 0.88)&#39;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>h3</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-fc14ff8d>text-align</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-fc14ff8d>center</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>; </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-fc14ff8d>margin</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-fc14ff8d>0</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-fc14ff8d> 0</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-fc14ff8d> 8</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-fc14ff8d>px</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>;</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;Godzilla VS Kong&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>h3</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>        电影讲述帝王组织在地心世界找到巨兽起源的线索，与此同时传说中的王者哥斯拉和金刚的对决也将展开的故事</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;哥斯拉大战金刚&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;less&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> scoped</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>:deep(.custom-class) {</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  font-size: 16px !important;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  color: #0958d9 !important;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  padding: 12px 18px !important;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  border-radius: 12px !important;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  p {</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    margin-bottom: 8px;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    font-size: 20px;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    font-weight: 600;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  }</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>}</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span></code></pre></div></details><h2 id="位置" tabindex="-1" data-v-fc14ff8d>位置 <a class="header-anchor" href="#位置" aria-label="Permalink to &quot;位置&quot;" data-v-fc14ff8d>​</a></h2>`);
      _push(ssrRenderComponent(_component_Flex, {
        vertical: "",
        width: 360,
        align: "center",
        gap: 32
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Tooltip, {
              tooltip: "Vue Amazing UI",
              placement: "bottom"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, { type: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Bottom`);
                      } else {
                        return [
                          createTextVNode("Bottom")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("Bottom")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Flex, {
              width: "100%",
              justify: "space-between"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Tooltip, {
                    tooltip: "Vue Amazing UI",
                    placement: "right"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Button, { type: "primary" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Right`);
                            } else {
                              return [
                                createTextVNode("Right")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Button, { type: "primary" }, {
                            default: withCtx(() => [
                              createTextVNode("Right")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Tooltip, {
                    tooltip: "Vue Amazing UI",
                    placement: "left"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Button, { type: "primary" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Left`);
                            } else {
                              return [
                                createTextVNode("Left")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Button, { type: "primary" }, {
                            default: withCtx(() => [
                              createTextVNode("Left")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Tooltip, {
                      tooltip: "Vue Amazing UI",
                      placement: "right"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Button, { type: "primary" }, {
                          default: withCtx(() => [
                            createTextVNode("Right")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Tooltip, {
                      tooltip: "Vue Amazing UI",
                      placement: "left"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Button, { type: "primary" }, {
                          default: withCtx(() => [
                            createTextVNode("Left")
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tooltip, {
              tooltip: "Vue Amazing UI",
              placement: "top"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, { type: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Top`);
                      } else {
                        return [
                          createTextVNode("Top")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("Top")
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
              createVNode(_component_Tooltip, {
                tooltip: "Vue Amazing UI",
                placement: "bottom"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Button, { type: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode("Bottom")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Flex, {
                width: "100%",
                justify: "space-between"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Tooltip, {
                    tooltip: "Vue Amazing UI",
                    placement: "right"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Button, { type: "primary" }, {
                        default: withCtx(() => [
                          createTextVNode("Right")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Tooltip, {
                    tooltip: "Vue Amazing UI",
                    placement: "left"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Button, { type: "primary" }, {
                        default: withCtx(() => [
                          createTextVNode("Left")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Tooltip, {
                tooltip: "Vue Amazing UI",
                placement: "top"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Button, { type: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode("Top")
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
      _push(`<details class="details custom-block" data-v-fc14ff8d><summary data-v-fc14ff8d>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-fc14ff8d><button title="Copy Code" class="copy" data-v-fc14ff8d></button><span class="lang" data-v-fc14ff8d>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-fc14ff8d><code data-v-fc14ff8d><span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> vertical</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>width</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-fc14ff8d>360</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#B31D28", "--shiki-light-font-style": "italic", "--shiki-dark": "#FDAEB7", "--shiki-dark-font-style": "italic" })}" data-v-fc14ff8d> align</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;center&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>gap</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-fc14ff8d>32</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;Vue Amazing UI&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> placement</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;bottom&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;Bottom&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> width</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;100%&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> justify</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;space-between&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;Vue Amazing UI&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> placement</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;right&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;Right&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;Vue Amazing UI&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> placement</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;left&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;Left&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;Vue Amazing UI&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> placement</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;top&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;Top&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span></code></pre></div></details><h2 id="自动调整位置" tabindex="-1" data-v-fc14ff8d>自动调整位置 <a class="header-anchor" href="#自动调整位置" aria-label="Permalink to &quot;自动调整位置&quot;" data-v-fc14ff8d>​</a></h2><p data-v-fc14ff8d><em data-v-fc14ff8d>请滚动或缩放浏览器窗口来查看自适应调整弹出位置的效果</em></p><br data-v-fc14ff8d>`);
      _push(ssrRenderComponent(_component_Tooltip, { tooltip: "Vue Amazing UI" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, { type: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Flip Automatically`);
                } else {
                  return [
                    createTextVNode("Flip Automatically")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, { type: "primary" }, {
                default: withCtx(() => [
                  createTextVNode("Flip Automatically")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-fc14ff8d><summary data-v-fc14ff8d>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-fc14ff8d><button title="Copy Code" class="copy" data-v-fc14ff8d></button><span class="lang" data-v-fc14ff8d>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-fc14ff8d><code data-v-fc14ff8d><span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;Vue Amazing UI&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;Flip Automatically&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span></code></pre></div></details><h2 id="不同的触发方式" tabindex="-1" data-v-fc14ff8d>不同的触发方式 <a class="header-anchor" href="#不同的触发方式" aria-label="Permalink to &quot;不同的触发方式&quot;" data-v-fc14ff8d>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Tooltip, null, {
              tooltip: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Vue Amazing UI`);
                } else {
                  return [
                    createTextVNode("Vue Amazing UI")
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, { type: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Hover Me`);
                      } else {
                        return [
                          createTextVNode("Hover Me")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("Hover Me")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tooltip, { trigger: "click" }, {
              tooltip: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Vue Amazing UI`);
                } else {
                  return [
                    createTextVNode("Vue Amazing UI")
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, { type: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Click Me`);
                      } else {
                        return [
                          createTextVNode("Click Me")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("Click Me")
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
              createVNode(_component_Tooltip, null, {
                tooltip: withCtx(() => [
                  createTextVNode("Vue Amazing UI")
                ]),
                default: withCtx(() => [
                  createVNode(_component_Button, { type: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode("Hover Me")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Tooltip, { trigger: "click" }, {
                tooltip: withCtx(() => [
                  createTextVNode("Vue Amazing UI")
                ]),
                default: withCtx(() => [
                  createVNode(_component_Button, { type: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode("Click Me")
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
      _push(`<details class="details custom-block" data-v-fc14ff8d><summary data-v-fc14ff8d>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-fc14ff8d><button title="Copy Code" class="copy" data-v-fc14ff8d></button><span class="lang" data-v-fc14ff8d>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-fc14ff8d><code data-v-fc14ff8d><span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;Vue Amazing UI&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;Hover Me&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> trigger</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;click&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;Vue Amazing UI&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;Click Me&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span></code></pre></div></details><h2 id="按键控制" tabindex="-1" data-v-fc14ff8d>按键控制 <a class="header-anchor" href="#按键控制" aria-label="Permalink to &quot;按键控制&quot;" data-v-fc14ff8d>​</a></h2><p data-v-fc14ff8d><em data-v-fc14ff8d><code data-v-fc14ff8d>enter</code> 显示；<code data-v-fc14ff8d>esc</code> 关闭，仅当 <code data-v-fc14ff8d>trigger: &#39;click&#39;</code> 时生效</em></p><br data-v-fc14ff8d>`);
      _push(ssrRenderComponent(_component_Tooltip, {
        trigger: "click",
        keyboard: ""
      }, {
        tooltip: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Vue Amazing UI`);
          } else {
            return [
              createTextVNode("Vue Amazing UI")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, { type: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Click Me`);
                } else {
                  return [
                    createTextVNode("Click Me")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, { type: "primary" }, {
                default: withCtx(() => [
                  createTextVNode("Click Me")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-fc14ff8d><summary data-v-fc14ff8d>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-fc14ff8d><button title="Copy Code" class="copy" data-v-fc14ff8d></button><span class="lang" data-v-fc14ff8d>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-fc14ff8d><code data-v-fc14ff8d><span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> trigger</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;click&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> keyboard</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;Vue Amazing UI&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;Click Me&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span></code></pre></div></details><h2 id="自定义过渡动画时间" tabindex="-1" data-v-fc14ff8d>自定义过渡动画时间 <a class="header-anchor" href="#自定义过渡动画时间" aria-label="Permalink to &quot;自定义过渡动画时间&quot;" data-v-fc14ff8d>​</a></h2>`);
      _push(ssrRenderComponent(_component_Tooltip, { "transition-duration": 300 }, {
        tooltip: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Vue Amazing UI`);
          } else {
            return [
              createTextVNode("Vue Amazing UI")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, { type: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Transition Duration 300ms`);
                } else {
                  return [
                    createTextVNode("Transition Duration 300ms")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, { type: "primary" }, {
                default: withCtx(() => [
                  createTextVNode("Transition Duration 300ms")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-fc14ff8d><summary data-v-fc14ff8d>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-fc14ff8d><button title="Copy Code" class="copy" data-v-fc14ff8d></button><span class="lang" data-v-fc14ff8d>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-fc14ff8d><code data-v-fc14ff8d><span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>transition-duration</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-fc14ff8d>300</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d> #</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;Vue Amazing UI&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;Transition Duration 300ms&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span></code></pre></div></details><h2 id="延迟显示隐藏" tabindex="-1" data-v-fc14ff8d>延迟显示隐藏 <a class="header-anchor" href="#延迟显示隐藏" aria-label="Permalink to &quot;延迟显示隐藏&quot;" data-v-fc14ff8d>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Tooltip, {
              "show-delay": 300,
              "hide-delay": 300,
              tooltip: "Vue Amazing UI (delay 300ms)",
              "tooltip-style": { textAlign: "center" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, { type: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Delay 300ms Tooltip`);
                      } else {
                        return [
                          createTextVNode("Delay 300ms Tooltip")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("Delay 300ms Tooltip")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tooltip, {
              "show-delay": 500,
              "hide-delay": 500,
              tooltip: "Vue Amazing UI (delay 500ms)",
              "tooltip-style": { textAlign: "center" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, { type: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Delay 500ms Tooltip`);
                      } else {
                        return [
                          createTextVNode("Delay 500ms Tooltip")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("Delay 500ms Tooltip")
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
              createVNode(_component_Tooltip, {
                "show-delay": 300,
                "hide-delay": 300,
                tooltip: "Vue Amazing UI (delay 300ms)",
                "tooltip-style": { textAlign: "center" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_Button, { type: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode("Delay 300ms Tooltip")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Tooltip, {
                "show-delay": 500,
                "hide-delay": 500,
                tooltip: "Vue Amazing UI (delay 500ms)",
                "tooltip-style": { textAlign: "center" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_Button, { type: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode("Delay 500ms Tooltip")
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
      _push(`<details class="details custom-block" data-v-fc14ff8d><summary data-v-fc14ff8d>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-fc14ff8d><button title="Copy Code" class="copy" data-v-fc14ff8d></button><span class="lang" data-v-fc14ff8d>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-fc14ff8d><code data-v-fc14ff8d><span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>show-delay</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-fc14ff8d>300</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>hide-delay</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-fc14ff8d>300</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>      tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;Vue Amazing UI (delay 300ms)&quot;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>tooltip-style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>{ textAlign: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&#39;center&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d> }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;Delay 300ms Tooltip&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>show-delay</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-fc14ff8d>500</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>hide-delay</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-fc14ff8d>500</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>      tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;Vue Amazing UI (delay 500ms)&quot;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>tooltip-style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>{ textAlign: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&#39;center&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d> }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;Delay 500ms Tooltip&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span></code></pre></div></details><h2 id="使用-methods" tabindex="-1" data-v-fc14ff8d>使用 Methods <a class="header-anchor" href="#使用-methods" aria-label="Permalink to &quot;使用 Methods&quot;" data-v-fc14ff8d>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Tooltip, {
              ref_key: "tooltip",
              ref: tooltip2,
              tooltip: "Vue Amazing UI"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, { type: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Methods Tooltip`);
                      } else {
                        return [
                          createTextVNode("Methods Tooltip")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("Methods Tooltip")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              type: "primary",
              onClick: ($event) => tooltip2.value.show()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`显示`);
                } else {
                  return [
                    createTextVNode("显示")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              onClick: ($event) => tooltip2.value.hide()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`隐藏`);
                } else {
                  return [
                    createTextVNode("隐藏")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Tooltip, {
                ref_key: "tooltip",
                ref: tooltip2,
                tooltip: "Vue Amazing UI"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Button, { type: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode("Methods Tooltip")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 512),
              createVNode(_component_Button, {
                type: "primary",
                onClick: ($event) => tooltip2.value.show()
              }, {
                default: withCtx(() => [
                  createTextVNode("显示")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_component_Button, {
                onClick: ($event) => tooltip2.value.hide()
              }, {
                default: withCtx(() => [
                  createTextVNode("隐藏")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-fc14ff8d><summary data-v-fc14ff8d>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-fc14ff8d><button title="Copy Code" class="copy" data-v-fc14ff8d></button><span class="lang" data-v-fc14ff8d>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-fc14ff8d><code data-v-fc14ff8d><span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> setup</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;ts&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-fc14ff8d>import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d> { ref } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-fc14ff8d>from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d> &#39;vue&#39;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-fc14ff8d>const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-fc14ff8d> tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-fc14ff8d> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> ref</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>()</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> ref</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;tooltip&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;Vue Amazing UI&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;Methods Tooltip&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d> @</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>click</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>tooltip.</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>show</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>()</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;显示&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d> @</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>click</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>tooltip.</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>hide</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>()</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;隐藏&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span></code></pre></div></details><h2 id="隐藏箭头" tabindex="-1" data-v-fc14ff8d>隐藏箭头 <a class="header-anchor" href="#隐藏箭头" aria-label="Permalink to &quot;隐藏箭头&quot;" data-v-fc14ff8d>​</a></h2>`);
      _push(ssrRenderComponent(_component_Tooltip, {
        arrow: false,
        tooltip: "Vue Amazing UI"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, { type: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Hide Arrow`);
                } else {
                  return [
                    createTextVNode("Hide Arrow")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, { type: "primary" }, {
                default: withCtx(() => [
                  createTextVNode("Hide Arrow")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-fc14ff8d><summary data-v-fc14ff8d>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-fc14ff8d><button title="Copy Code" class="copy" data-v-fc14ff8d></button><span class="lang" data-v-fc14ff8d>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-fc14ff8d><code data-v-fc14ff8d><span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d>arrow</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-fc14ff8d>false</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;Vue Amazing UI&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-fc14ff8d> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-fc14ff8d>&quot;primary&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;Hide Arrow&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>Tooltip</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span>
<span class="line" data-v-fc14ff8d><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-fc14ff8d>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-fc14ff8d>&gt;</span></span></code></pre></div></details><h2 id="apis" tabindex="-1" data-v-fc14ff8d>APIs <a class="header-anchor" href="#apis" aria-label="Permalink to &quot;APIs&quot;" data-v-fc14ff8d>​</a></h2><h3 id="tooltip" tabindex="-1" data-v-fc14ff8d>Tooltip <a class="header-anchor" href="#tooltip" aria-label="Permalink to &quot;Tooltip&quot;" data-v-fc14ff8d>​</a></h3><table tabindex="0" data-v-fc14ff8d><thead data-v-fc14ff8d><tr data-v-fc14ff8d><th data-v-fc14ff8d>参数</th><th data-v-fc14ff8d>说明</th><th data-v-fc14ff8d>类型</th><th data-v-fc14ff8d>默认值</th></tr></thead><tbody data-v-fc14ff8d><tr data-v-fc14ff8d><td data-v-fc14ff8d>maxWidth</td><td data-v-fc14ff8d>文字提示最大宽度，单位 <code data-v-fc14ff8d>px</code></td><td data-v-fc14ff8d>string | number</td><td data-v-fc14ff8d>240</td></tr><tr data-v-fc14ff8d><td data-v-fc14ff8d>content</td><td data-v-fc14ff8d>展示的内容</td><td data-v-fc14ff8d>string | slot</td><td data-v-fc14ff8d>undefined</td></tr><tr data-v-fc14ff8d><td data-v-fc14ff8d>contentClass</td><td data-v-fc14ff8d>设置展示内容的类名</td><td data-v-fc14ff8d>string</td><td data-v-fc14ff8d>undefined</td></tr><tr data-v-fc14ff8d><td data-v-fc14ff8d>contentStyle</td><td data-v-fc14ff8d>设置展示内容的样式</td><td data-v-fc14ff8d><a href="https://cn.vuejs.org/api/utility-types.html#cssproperties" target="_blank" rel="noreferrer" data-v-fc14ff8d>CSSProperties</a></td><td data-v-fc14ff8d>{}</td></tr><tr data-v-fc14ff8d><td data-v-fc14ff8d>tooltip</td><td data-v-fc14ff8d>文字提示内容</td><td data-v-fc14ff8d>string | slot</td><td data-v-fc14ff8d>undefined</td></tr><tr data-v-fc14ff8d><td data-v-fc14ff8d>tooltipClass</td><td data-v-fc14ff8d>设置文字提示的类名</td><td data-v-fc14ff8d>string</td><td data-v-fc14ff8d>undefined</td></tr><tr data-v-fc14ff8d><td data-v-fc14ff8d>tooltipStyle</td><td data-v-fc14ff8d>设置文字提示的样式</td><td data-v-fc14ff8d><a href="https://cn.vuejs.org/api/utility-types.html#cssproperties" target="_blank" rel="noreferrer" data-v-fc14ff8d>CSSProperties</a></td><td data-v-fc14ff8d>{}</td></tr><tr data-v-fc14ff8d><td data-v-fc14ff8d>bgColor</td><td data-v-fc14ff8d>文字提示框背景颜色</td><td data-v-fc14ff8d>string</td><td data-v-fc14ff8d>&#39;rgba(0, 0, 0, 0.85)&#39;</td></tr><tr data-v-fc14ff8d><td data-v-fc14ff8d>arrow</td><td data-v-fc14ff8d>是否显示箭头</td><td data-v-fc14ff8d>boolean</td><td data-v-fc14ff8d>true</td></tr><tr data-v-fc14ff8d><td data-v-fc14ff8d>placement</td><td data-v-fc14ff8d>文字提示位置</td><td data-v-fc14ff8d>&#39;top&#39; | &#39;bottom&#39; | &#39;left&#39; | &#39;right&#39;</td><td data-v-fc14ff8d>&#39;top&#39;</td></tr><tr data-v-fc14ff8d><td data-v-fc14ff8d>flip</td><td data-v-fc14ff8d>文字提示被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置</td><td data-v-fc14ff8d>boolean</td><td data-v-fc14ff8d>true</td></tr><tr data-v-fc14ff8d><td data-v-fc14ff8d>trigger</td><td data-v-fc14ff8d>文字提示触发方式</td><td data-v-fc14ff8d>&#39;hover&#39; | &#39;click&#39;</td><td data-v-fc14ff8d>&#39;hover&#39;</td></tr><tr data-v-fc14ff8d><td data-v-fc14ff8d>keyboard</td><td data-v-fc14ff8d>是否支持按键操作 (<code data-v-fc14ff8d>enter</code> 显示；<code data-v-fc14ff8d>esc</code> 关闭)，仅当 <code data-v-fc14ff8d>trigger: &#39;click&#39;</code> 时生效</td><td data-v-fc14ff8d>boolean</td><td data-v-fc14ff8d>false</td></tr><tr data-v-fc14ff8d><td data-v-fc14ff8d>transitionDuration</td><td data-v-fc14ff8d>文字提示动画的过渡持续时间，单位 <code data-v-fc14ff8d>ms</code></td><td data-v-fc14ff8d>number</td><td data-v-fc14ff8d>100</td></tr><tr data-v-fc14ff8d><td data-v-fc14ff8d>showDelay</td><td data-v-fc14ff8d>文字提示显示的延迟时间，单位 <code data-v-fc14ff8d>ms</code></td><td data-v-fc14ff8d>number</td><td data-v-fc14ff8d>100</td></tr><tr data-v-fc14ff8d><td data-v-fc14ff8d>hideDelay</td><td data-v-fc14ff8d>文字提示隐藏的延迟时间，单位 <code data-v-fc14ff8d>ms</code></td><td data-v-fc14ff8d>number</td><td data-v-fc14ff8d>100</td></tr><tr data-v-fc14ff8d><td data-v-fc14ff8d>show `);
      _push(ssrRenderComponent(_component_Tag, { color: "cyan" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`v-model`);
          } else {
            return [
              createTextVNode("v-model")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</td><td data-v-fc14ff8d>文字提示是否显示</td><td data-v-fc14ff8d>boolean</td><td data-v-fc14ff8d>false</td></tr><tr data-v-fc14ff8d><td data-v-fc14ff8d>showControl</td><td data-v-fc14ff8d>只使用 <code data-v-fc14ff8d>show</code> 属性控制显示隐藏，仅当 <code data-v-fc14ff8d>trigger: hover</code> 时生效，此时移入移出将不会触发显示隐藏，全部由 <code data-v-fc14ff8d>show</code> 属性控制</td><td data-v-fc14ff8d>boolean</td><td data-v-fc14ff8d>false</td></tr></tbody></table><h2 id="methods" tabindex="-1" data-v-fc14ff8d>Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;" data-v-fc14ff8d>​</a></h2><table tabindex="0" data-v-fc14ff8d><thead data-v-fc14ff8d><tr data-v-fc14ff8d><th data-v-fc14ff8d>名称</th><th data-v-fc14ff8d>说明</th><th data-v-fc14ff8d>类型</th></tr></thead><tbody data-v-fc14ff8d><tr data-v-fc14ff8d><td data-v-fc14ff8d>show</td><td data-v-fc14ff8d>显示文字提示</td><td data-v-fc14ff8d>() =&gt; void</td></tr><tr data-v-fc14ff8d><td data-v-fc14ff8d>hide</td><td data-v-fc14ff8d>隐藏文字提示</td><td data-v-fc14ff8d>() =&gt; void</td></tr></tbody></table><h2 id="events" tabindex="-1" data-v-fc14ff8d>Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;" data-v-fc14ff8d>​</a></h2><table tabindex="0" data-v-fc14ff8d><thead data-v-fc14ff8d><tr data-v-fc14ff8d><th data-v-fc14ff8d>名称</th><th data-v-fc14ff8d>说明</th><th data-v-fc14ff8d>类型</th></tr></thead><tbody data-v-fc14ff8d><tr data-v-fc14ff8d><td data-v-fc14ff8d>openChange</td><td data-v-fc14ff8d>显示隐藏的回调</td><td data-v-fc14ff8d>(open: boolean) =&gt; void</td></tr></tbody></table></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/components/tooltip.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tooltip = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fc14ff8d"]]);
export {
  __pageData,
  tooltip as default
};
