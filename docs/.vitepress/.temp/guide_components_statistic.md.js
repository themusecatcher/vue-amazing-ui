import { defineComponent, resolveComponent, withCtx, createVNode, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
const __pageData = JSON.parse('{"title":"统计数值 Statistic","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/statistic.md","filePath":"guide/components/statistic.md"}');
const __default__ = { name: "guide/components/statistic.md" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    function formatter(value) {
      console.log("value", value);
      return "1年有 " + value + " 天";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Row = resolveComponent("Row");
      const _component_Col = resolveComponent("Col");
      const _component_Statistic = resolveComponent("Statistic", true);
      const _component_Card = resolveComponent("Card");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-74a5b643><h1 id="统计数值-statistic" tabindex="-1" data-v-74a5b643>统计数值 Statistic <a class="header-anchor" href="#统计数值-statistic" aria-label="Permalink to &quot;统计数值 Statistic&quot;" data-v-74a5b643>​</a></h1><br data-v-74a5b643><p data-v-74a5b643><em data-v-74a5b643>展示统计数值</em></p><h2 id="何时使用" tabindex="-1" data-v-74a5b643>何时使用 <a class="header-anchor" href="#何时使用" aria-label="Permalink to &quot;何时使用&quot;" data-v-74a5b643>​</a></h2><ul data-v-74a5b643><li data-v-74a5b643>当需要突出某个或某组数字时</li><li data-v-74a5b643>当需要展示带描述的统计类数据时使用</li></ul><h2 id="基本使用" tabindex="-1" data-v-74a5b643>基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;" data-v-74a5b643>​</a></h2>`);
      _push(ssrRenderComponent(_component_Row, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Statistic, {
                    title: "Active Users",
                    value: 112893
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Statistic, {
                      title: "Active Users",
                      value: 112893
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Statistic, {
                    title: "Account Balance (CNY)",
                    precision: 2,
                    value: 112893
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Statistic, {
                      title: "Account Balance (CNY)",
                      precision: 2,
                      value: 112893
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode(_component_Statistic, {
                    title: "Active Users",
                    value: 112893
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode(_component_Statistic, {
                    title: "Account Balance (CNY)",
                    precision: 2,
                    value: 112893
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-74a5b643><summary data-v-74a5b643>Show Code</summary><div class="language-vue" data-v-74a5b643><button title="Copy Code" class="copy" data-v-74a5b643></button><span class="lang" data-v-74a5b643>vue</span><pre class="shiki material-theme-palenight" data-v-74a5b643><code data-v-74a5b643><span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>12</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Statistic</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>title</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>Active Users</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:value</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>112893</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> /&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>12</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Statistic</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>title</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>Account Balance (CNY)</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:precision</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>2</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:value</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>112893</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> /&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span></code></pre></div></details><h2 id="添加前缀和后缀" tabindex="-1" data-v-74a5b643>添加前缀和后缀 <a class="header-anchor" href="#添加前缀和后缀" aria-label="Permalink to &quot;添加前缀和后缀&quot;" data-v-74a5b643>​</a></h2>`);
      _push(ssrRenderComponent(_component_Row, { gutter: 16 }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Statistic, {
                    title: "Feedback",
                    value: 1128
                  }, {
                    suffix: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<svg focusable="false" class="u-svg" data-icon="like" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896" data-v-74a5b643${_scopeId3}><path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z" data-v-74a5b643${_scopeId3}></path></svg>`);
                      } else {
                        return [
                          (openBlock(), createBlock("svg", {
                            focusable: "false",
                            class: "u-svg",
                            "data-icon": "like",
                            width: "1em",
                            height: "1em",
                            fill: "currentColor",
                            "aria-hidden": "true",
                            viewBox: "64 64 896 896"
                          }, [
                            createVNode("path", { d: "M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z" })
                          ]))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Statistic, {
                      title: "Feedback",
                      value: 1128
                    }, {
                      suffix: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          focusable: "false",
                          class: "u-svg",
                          "data-icon": "like",
                          width: "1em",
                          height: "1em",
                          fill: "currentColor",
                          "aria-hidden": "true",
                          viewBox: "64 64 896 896"
                        }, [
                          createVNode("path", { d: "M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z" })
                        ]))
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
                  _push3(ssrRenderComponent(_component_Statistic, {
                    title: "Unmerged",
                    value: 90
                  }, {
                    suffix: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span data-v-74a5b643${_scopeId3}>%</span>`);
                      } else {
                        return [
                          createVNode("span", null, "%")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Statistic, {
                      title: "Unmerged",
                      value: 90
                    }, {
                      suffix: withCtx(() => [
                        createVNode("span", null, "%")
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
              createVNode(_component_Col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode(_component_Statistic, {
                    title: "Feedback",
                    value: 1128
                  }, {
                    suffix: withCtx(() => [
                      (openBlock(), createBlock("svg", {
                        focusable: "false",
                        class: "u-svg",
                        "data-icon": "like",
                        width: "1em",
                        height: "1em",
                        fill: "currentColor",
                        "aria-hidden": "true",
                        viewBox: "64 64 896 896"
                      }, [
                        createVNode("path", { d: "M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z" })
                      ]))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode(_component_Statistic, {
                    title: "Unmerged",
                    value: 90
                  }, {
                    suffix: withCtx(() => [
                      createVNode("span", null, "%")
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
      _push(`<details class="details custom-block" data-v-74a5b643><summary data-v-74a5b643>Show Code</summary><div class="language-vue" data-v-74a5b643><button title="Copy Code" class="copy" data-v-74a5b643></button><span class="lang" data-v-74a5b643>vue</span><pre class="shiki material-theme-palenight" data-v-74a5b643><code data-v-74a5b643><span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:gutter</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>16</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>12</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Statistic</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>title</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>Feedback</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:value</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>1128</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>template</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>#</span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>suffix</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>          </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>svg</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>focusable</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>false</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>u-svg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>data-icon</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>like</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>width</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>1em</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>height</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>1em</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>fill</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>currentColor</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>aria-hidden</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>true</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>viewBox</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>64 64 896 896</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>path</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>d</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>path</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>svg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Statistic</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>12</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Statistic</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>title</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>Unmerged</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:value</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>90</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>template</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>#</span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>suffix</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>          </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>%</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Statistic</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span></code></pre></div></details><h2 id="在卡片中使用" tabindex="-1" data-v-74a5b643>在卡片中使用 <a class="header-anchor" href="#在卡片中使用" aria-label="Permalink to &quot;在卡片中使用&quot;" data-v-74a5b643>​</a></h2><div style="${ssrRenderStyle({ "width": "425px", "background": "#ececec", "padding": "30px" })}" data-v-74a5b643>`);
      _push(ssrRenderComponent(_component_Row, { gutter: 16 }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Card, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Statistic, {
                          title: "Feedback",
                          value: 11.28,
                          precision: 2,
                          suffix: "%",
                          "value-style": { color: "#3f8600" },
                          style: { "margin-right": "50px" }
                        }, {
                          prefix: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<svg focusable="false" class="u-svg-up" data-icon="arrow-up" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896" data-v-74a5b643${_scopeId4}><path d="M868 545.5L536.1 163a31.96 31.96 0 00-48.3 0L156 545.5a7.97 7.97 0 006 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z" data-v-74a5b643${_scopeId4}></path></svg>`);
                            } else {
                              return [
                                (openBlock(), createBlock("svg", {
                                  focusable: "false",
                                  class: "u-svg-up",
                                  "data-icon": "arrow-up",
                                  width: "1em",
                                  height: "1em",
                                  fill: "currentColor",
                                  "aria-hidden": "true",
                                  viewBox: "64 64 896 896"
                                }, [
                                  createVNode("path", { d: "M868 545.5L536.1 163a31.96 31.96 0 00-48.3 0L156 545.5a7.97 7.97 0 006 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z" })
                                ]))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Statistic, {
                            title: "Feedback",
                            value: 11.28,
                            precision: 2,
                            suffix: "%",
                            "value-style": { color: "#3f8600" },
                            style: { "margin-right": "50px" }
                          }, {
                            prefix: withCtx(() => [
                              (openBlock(), createBlock("svg", {
                                focusable: "false",
                                class: "u-svg-up",
                                "data-icon": "arrow-up",
                                width: "1em",
                                height: "1em",
                                fill: "currentColor",
                                "aria-hidden": "true",
                                viewBox: "64 64 896 896"
                              }, [
                                createVNode("path", { d: "M868 545.5L536.1 163a31.96 31.96 0 00-48.3 0L156 545.5a7.97 7.97 0 006 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z" })
                              ]))
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
                    createVNode(_component_Card, null, {
                      default: withCtx(() => [
                        createVNode(_component_Statistic, {
                          title: "Feedback",
                          value: 11.28,
                          precision: 2,
                          suffix: "%",
                          "value-style": { color: "#3f8600" },
                          style: { "margin-right": "50px" }
                        }, {
                          prefix: withCtx(() => [
                            (openBlock(), createBlock("svg", {
                              focusable: "false",
                              class: "u-svg-up",
                              "data-icon": "arrow-up",
                              width: "1em",
                              height: "1em",
                              fill: "currentColor",
                              "aria-hidden": "true",
                              viewBox: "64 64 896 896"
                            }, [
                              createVNode("path", { d: "M868 545.5L536.1 163a31.96 31.96 0 00-48.3 0L156 545.5a7.97 7.97 0 006 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z" })
                            ]))
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
            _push2(ssrRenderComponent(_component_Col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Card, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Statistic, {
                          title: "Idle",
                          value: 9.3,
                          precision: 2,
                          suffix: "%",
                          "value-style": { color: "#cf1322" }
                        }, {
                          prefix: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<svg focusable="false" class="u-svg-down" data-icon="arrow-down" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896" data-v-74a5b643${_scopeId4}><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0048.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z" data-v-74a5b643${_scopeId4}></path></svg>`);
                            } else {
                              return [
                                (openBlock(), createBlock("svg", {
                                  focusable: "false",
                                  class: "u-svg-down",
                                  "data-icon": "arrow-down",
                                  width: "1em",
                                  height: "1em",
                                  fill: "currentColor",
                                  "aria-hidden": "true",
                                  viewBox: "64 64 896 896"
                                }, [
                                  createVNode("path", { d: "M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0048.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z" })
                                ]))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Statistic, {
                            title: "Idle",
                            value: 9.3,
                            precision: 2,
                            suffix: "%",
                            "value-style": { color: "#cf1322" }
                          }, {
                            prefix: withCtx(() => [
                              (openBlock(), createBlock("svg", {
                                focusable: "false",
                                class: "u-svg-down",
                                "data-icon": "arrow-down",
                                width: "1em",
                                height: "1em",
                                fill: "currentColor",
                                "aria-hidden": "true",
                                viewBox: "64 64 896 896"
                              }, [
                                createVNode("path", { d: "M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0048.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z" })
                              ]))
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
                    createVNode(_component_Card, null, {
                      default: withCtx(() => [
                        createVNode(_component_Statistic, {
                          title: "Idle",
                          value: 9.3,
                          precision: 2,
                          suffix: "%",
                          "value-style": { color: "#cf1322" }
                        }, {
                          prefix: withCtx(() => [
                            (openBlock(), createBlock("svg", {
                              focusable: "false",
                              class: "u-svg-down",
                              "data-icon": "arrow-down",
                              width: "1em",
                              height: "1em",
                              fill: "currentColor",
                              "aria-hidden": "true",
                              viewBox: "64 64 896 896"
                            }, [
                              createVNode("path", { d: "M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0048.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z" })
                            ]))
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
          } else {
            return [
              createVNode(_component_Col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode(_component_Card, null, {
                    default: withCtx(() => [
                      createVNode(_component_Statistic, {
                        title: "Feedback",
                        value: 11.28,
                        precision: 2,
                        suffix: "%",
                        "value-style": { color: "#3f8600" },
                        style: { "margin-right": "50px" }
                      }, {
                        prefix: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            focusable: "false",
                            class: "u-svg-up",
                            "data-icon": "arrow-up",
                            width: "1em",
                            height: "1em",
                            fill: "currentColor",
                            "aria-hidden": "true",
                            viewBox: "64 64 896 896"
                          }, [
                            createVNode("path", { d: "M868 545.5L536.1 163a31.96 31.96 0 00-48.3 0L156 545.5a7.97 7.97 0 006 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z" })
                          ]))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode(_component_Card, null, {
                    default: withCtx(() => [
                      createVNode(_component_Statistic, {
                        title: "Idle",
                        value: 9.3,
                        precision: 2,
                        suffix: "%",
                        "value-style": { color: "#cf1322" }
                      }, {
                        prefix: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            focusable: "false",
                            class: "u-svg-down",
                            "data-icon": "arrow-down",
                            width: "1em",
                            height: "1em",
                            fill: "currentColor",
                            "aria-hidden": "true",
                            viewBox: "64 64 896 896"
                          }, [
                            createVNode("path", { d: "M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0048.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z" })
                          ]))
                        ]),
                        _: 1
                      })
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
      _push(`</div><details class="details custom-block" data-v-74a5b643><summary data-v-74a5b643>Show Code</summary><div class="language-vue" data-v-74a5b643><button title="Copy Code" class="copy" data-v-74a5b643></button><span class="lang" data-v-74a5b643>vue</span><pre class="shiki material-theme-palenight" data-v-74a5b643><code data-v-74a5b643><span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>style</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>width: 425px; background: #ececec; padding: 30px</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:gutter</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>16</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>12</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Card</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>          </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Statistic</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>            </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>title</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>Feedback</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>            </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:value</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>11.28</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>            </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:precision</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>2</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>            </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>suffix</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>%</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>            </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:value-style</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>{ color: &#39;#3f8600&#39; }</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>            </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>style</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>margin-right: 50px</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>          &gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>            </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>template</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>#</span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>prefix</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>              </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>svg</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>focusable</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>false</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>u-svg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>data-icon</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>arrow-up</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>width</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>1em</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>height</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>1em</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>fill</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>currentColor</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>aria-hidden</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>true</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>viewBox</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>64 64 896 896</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>path</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>d</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>M868 545.5L536.1 163a31.96 31.96 0 00-48.3 0L156 545.5a7.97 7.97 0 006 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>path</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>svg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>            </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>          </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Statistic</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Card</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:span</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>12</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Card</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>          </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Statistic</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>            </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>title</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>Idle</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>            </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:value</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>9.3</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>            </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:precision</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>2</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>            </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>suffix</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>%</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>            </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>demo-class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>            </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:value-style</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>{ color: &#39;#cf1322&#39; }</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>          &gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>            </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>template</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>#</span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>prefix</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>              </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>svg</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>focusable</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>false</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>u-svg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>data-icon</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>arrow-down</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>width</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>1em</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>height</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>1em</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>fill</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>currentColor</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>aria-hidden</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>true</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>viewBox</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>64 64 896 896</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>path</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>d</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0048.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>path</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>svg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>            </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>          </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Statistic</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Card</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Col</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Row</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>div</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>style</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>lang</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>less</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>scoped</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>.</span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-74a5b643>u-svg</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>{</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-74a5b643>display</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> inline-flex</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-74a5b643>align-items</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> center</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-74a5b643>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> inherit</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-74a5b643>text-align</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> center</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-74a5b643>vertical-align</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}" data-v-74a5b643>-0.125em</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>}</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>style</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span></code></pre></div></details><h2 id="自定义数值样式" tabindex="-1" data-v-74a5b643>自定义数值样式 <a class="header-anchor" href="#自定义数值样式" aria-label="Permalink to &quot;自定义数值样式&quot;" data-v-74a5b643>​</a></h2>`);
      _push(ssrRenderComponent(_component_Statistic, {
        title: "Worth",
        value: 16e5,
        "value-style": { color: "#3f8600" },
        prefix: "$",
        suffix: "/ 天"
      }, null, _parent));
      _push(`<details class="details custom-block" data-v-74a5b643><summary data-v-74a5b643>Show Code</summary><div class="language-vue" data-v-74a5b643><button title="Copy Code" class="copy" data-v-74a5b643></button><span class="lang" data-v-74a5b643>vue</span><pre class="shiki material-theme-palenight" data-v-74a5b643><code data-v-74a5b643><span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Statistic</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>title</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>Worth</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:value</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>1600000</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:value-style</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>{ color: &#39;#3f8600&#39; }</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>prefix</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>$</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>suffix</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>/ 天</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> /&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span></code></pre></div></details><h2 id="设置数值精度" tabindex="-1" data-v-74a5b643>设置数值精度 <a class="header-anchor" href="#设置数值精度" aria-label="Permalink to &quot;设置数值精度&quot;" data-v-74a5b643>​</a></h2>`);
      _push(ssrRenderComponent(_component_Statistic, {
        title: "Precision",
        value: 1000000001e-1,
        precision: 2
      }, null, _parent));
      _push(`<details class="details custom-block" data-v-74a5b643><summary data-v-74a5b643>Show Code</summary><div class="language-vue" data-v-74a5b643><button title="Copy Code" class="copy" data-v-74a5b643></button><span class="lang" data-v-74a5b643>vue</span><pre class="shiki material-theme-palenight" data-v-74a5b643><code data-v-74a5b643><span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Statistic</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>title</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>Precision</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:value</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>100000000.1</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:precision</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>2</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> /&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span></code></pre></div></details><h2 id="自定义千分位标识符" tabindex="-1" data-v-74a5b643>自定义千分位标识符 <a class="header-anchor" href="#自定义千分位标识符" aria-label="Permalink to &quot;自定义千分位标识符&quot;" data-v-74a5b643>​</a></h2>`);
      _push(ssrRenderComponent(_component_Statistic, {
        title: "Precision",
        value: 1000000001e-1,
        separator: ";",
        precision: 3
      }, null, _parent));
      _push(`<details class="details custom-block" data-v-74a5b643><summary data-v-74a5b643>Show Code</summary><div class="language-vue" data-v-74a5b643><button title="Copy Code" class="copy" data-v-74a5b643></button><span class="lang" data-v-74a5b643>vue</span><pre class="shiki material-theme-palenight" data-v-74a5b643><code data-v-74a5b643><span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Statistic</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>title</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>Precision</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:value</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>100000000.1</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>separator</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:precision</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>3</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> /&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span></code></pre></div></details><h2 id="自定义数值展示" tabindex="-1" data-v-74a5b643>自定义数值展示 <a class="header-anchor" href="#自定义数值展示" aria-label="Permalink to &quot;自定义数值展示&quot;" data-v-74a5b643>​</a></h2>`);
      _push(ssrRenderComponent(_component_Statistic, {
        title: "Formatter",
        value: 365,
        "value-style": { color: "#1677ff" },
        formatter
      }, null, _parent));
      _push(`<details class="details custom-block" data-v-74a5b643><summary data-v-74a5b643>Show Code</summary><div class="language-vue" data-v-74a5b643><button title="Copy Code" class="copy" data-v-74a5b643></button><span class="lang" data-v-74a5b643>vue</span><pre class="shiki material-theme-palenight" data-v-74a5b643><code data-v-74a5b643><span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>script</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>setup</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>lang</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>ts</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>function</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-74a5b643>formatter</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>(</span><span style="${ssrRenderStyle({ "color": "#BABED8", "font-style": "italic" })}" data-v-74a5b643>value</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-74a5b643>string</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>):</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-74a5b643>string</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>{</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>  </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>console</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>.</span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-74a5b643>log</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>(</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>value</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>,</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>value</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>)</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}" data-v-74a5b643>return</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>1年有 </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&#39;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>+</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>value</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>+</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643> 天</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&#39;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>}</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>script</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-74a5b643>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>Statistic</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>title</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>Formatter</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:value</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>365</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:value-style</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>{ color: &#39;#1677ff&#39; }</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-74a5b643>:formatter</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-74a5b643>formatter</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643> /&gt;</span></span>
<span class="line" data-v-74a5b643><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-74a5b643>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-74a5b643>&gt;</span></span></code></pre></div></details><h2 id="apis" tabindex="-1" data-v-74a5b643>APIs <a class="header-anchor" href="#apis" aria-label="Permalink to &quot;APIs&quot;" data-v-74a5b643>​</a></h2><table data-v-74a5b643><thead data-v-74a5b643><tr data-v-74a5b643><th data-v-74a5b643>参数</th><th data-v-74a5b643>说明</th><th data-v-74a5b643>类型</th><th data-v-74a5b643>默认值</th><th data-v-74a5b643>必传</th></tr></thead><tbody data-v-74a5b643><tr data-v-74a5b643><td data-v-74a5b643>title</td><td data-v-74a5b643>数值的标题</td><td data-v-74a5b643>string</td><td data-v-74a5b643>&#39;&#39;</td><td data-v-74a5b643>false</td></tr><tr data-v-74a5b643><td data-v-74a5b643>value</td><td data-v-74a5b643>数值的内容</td><td data-v-74a5b643>string | number</td><td data-v-74a5b643>&#39;&#39;</td><td data-v-74a5b643>false</td></tr><tr data-v-74a5b643><td data-v-74a5b643>valueStyle</td><td data-v-74a5b643>设置数值的样式</td><td data-v-74a5b643>CSSProperties</td><td data-v-74a5b643>{}</td><td data-v-74a5b643>false</td></tr><tr data-v-74a5b643><td data-v-74a5b643>precision</td><td data-v-74a5b643>数值精度</td><td data-v-74a5b643>number</td><td data-v-74a5b643>0</td><td data-v-74a5b643>false</td></tr><tr data-v-74a5b643><td data-v-74a5b643>prefix</td><td data-v-74a5b643>设置数值的前缀</td><td data-v-74a5b643>string | slot</td><td data-v-74a5b643>&#39;&#39;</td><td data-v-74a5b643>false</td></tr><tr data-v-74a5b643><td data-v-74a5b643>suffix</td><td data-v-74a5b643>设置数值的后缀</td><td data-v-74a5b643>string | slot</td><td data-v-74a5b643>&#39;&#39;</td><td data-v-74a5b643>false</td></tr><tr data-v-74a5b643><td data-v-74a5b643>separator</td><td data-v-74a5b643>设置千分位标识符</td><td data-v-74a5b643>string</td><td data-v-74a5b643>&#39;,&#39;</td><td data-v-74a5b643>false</td></tr><tr data-v-74a5b643><td data-v-74a5b643>formatter</td><td data-v-74a5b643>自定义数值展示</td><td data-v-74a5b643>Function</td><td data-v-74a5b643>(value: string) =&gt; value</td><td data-v-74a5b643>false</td></tr></tbody></table></div>`);
    };
  }
});
const statistic_md_vue_type_style_index_0_scoped_74a5b643_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/components/statistic.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const statistic = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-74a5b643"]]);
export {
  __pageData,
  statistic as default
};
