import { defineComponent, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"文字提示 Tooltip","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/tooltip.md","filePath":"guide/components/tooltip.md"}');
const __default__ = { name: "guide/components/tooltip.md" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    function openChange(visible) {
      console.log("visible:", visible);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Space = resolveComponent("Space");
      const _component_Tooltip = resolveComponent("Tooltip", true);
      const _component_Button = resolveComponent("Button");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="文字提示-tooltip" tabindex="-1">文字提示 Tooltip <a class="header-anchor" href="#文字提示-tooltip" aria-label="Permalink to &quot;文字提示 Tooltip&quot;">​</a></h1><br><p><em>悬浮提示，展现需要关注的信息</em></p><h2 id="何时使用" tabindex="-1">何时使用 <a class="header-anchor" href="#何时使用" aria-label="Permalink to &quot;何时使用&quot;">​</a></h2><ul><li>当某个页面需要向用户显示警告的信息时</li></ul><h2 id="基本使用" tabindex="-1">基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;">​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, { size: 30 }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Tooltip, {
              "max-width": 240,
              onOpenChange: openChange
            }, {
              tooltip: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`特斯拉(Tesla)是美国一家电动汽车及能源公司，总部位于帕洛阿托(Palo Alto)，市值达2100亿美元，产销电动汽车、太阳能板、及储能设备`);
                } else {
                  return [
                    createTextVNode("特斯拉(Tesla)是美国一家电动汽车及能源公司，总部位于帕洛阿托(Palo Alto)，市值达2100亿美元，产销电动汽车、太阳能板、及储能设备")
                  ];
                }
              }),
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
              "max-width": 380,
              onOpenChange: openChange
            }, {
              tooltip: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`《哥斯拉》由传奇影业、华纳兄弟影业公司等联合出品。该片讲述了世界各地异常自然灾害的发生频率的上升，被隐瞒了几十年的秘密逐渐浮出水面，人类即将面临一场来自远古的浩劫，三只强大怪兽也将轮番登场掀起层层高潮，这场混战也将在怪兽与人类之间打响的故事`);
                } else {
                  return [
                    createTextVNode("《哥斯拉》由传奇影业、华纳兄弟影业公司等联合出品。该片讲述了世界各地异常自然灾害的发生频率的上升，被隐瞒了几十年的秘密逐渐浮出水面，人类即将面临一场来自远古的浩劫，三只强大怪兽也将轮番登场掀起层层高潮，这场混战也将在怪兽与人类之间打响的故事")
                  ];
                }
              }),
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
                "max-width": 240,
                onOpenChange: openChange
              }, {
                tooltip: withCtx(() => [
                  createTextVNode("特斯拉(Tesla)是美国一家电动汽车及能源公司，总部位于帕洛阿托(Palo Alto)，市值达2100亿美元，产销电动汽车、太阳能板、及储能设备")
                ]),
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
                "max-width": 380,
                onOpenChange: openChange
              }, {
                tooltip: withCtx(() => [
                  createTextVNode("《哥斯拉》由传奇影业、华纳兄弟影业公司等联合出品。该片讲述了世界各地异常自然灾害的发生频率的上升，被隐瞒了几十年的秘密逐渐浮出水面，人类即将面临一场来自远古的浩劫，三只强大怪兽也将轮番登场掀起层层高潮，这场混战也将在怪兽与人类之间打响的故事")
                ]),
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
      _push(`<details class="details custom-block"><summary>Show Code</summary><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">script</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}"> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">setup</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}"> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">lang</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">ts</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C792EA" })}">function</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}"> </span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}">openChange</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">(</span><span style="${ssrRenderStyle({ "color": "#BABED8", "font-style": "italic" })}">visible</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}"> </span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}">boolean</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">)</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#F07178" })}">  </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}">console</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">.</span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}">log</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">(</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">visible:</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">,</span><span style="${ssrRenderStyle({ "color": "#F07178" })}"> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}">visible</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">}</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">script</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}"> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">:size</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">30</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Tooltip</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}"> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">:max-width</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">240</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}"> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">@open-change</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">openChange</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">template</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">#</span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">tooltip</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}">特斯拉(Tesla)是美国一家电动汽车及能源公司，总部位于帕洛阿托(Palo Alto)，市值达2100亿美元，产销电动汽车、太阳能板、及储能设备</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}"> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">type</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">primary</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}">特斯拉</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Tooltip</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Tooltip</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}"> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">:max-width</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">380</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}"> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">@open-change</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">openChange</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">template</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">#</span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">tooltip</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}">《哥斯拉》由传奇影业、华纳兄弟影业公司等联合出品。该片讲述了世界各地异常自然灾害的发生频率的上升，被隐瞒了几十年的秘密逐渐浮出水面，人类即将面临一场来自远古的浩劫，三只强大怪兽也将轮番登场掀起层层高潮，这场混战也将在怪兽与人类之间打响的故事</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}"> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">type</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">primary</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}">哥斯拉</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Tooltip</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span></code></pre></div></details><h2 id="自定义样式" tabindex="-1">自定义样式 <a class="header-anchor" href="#自定义样式" aria-label="Permalink to &quot;自定义样式&quot;">​</a></h2>`);
      _push(ssrRenderComponent(_component_Tooltip, {
        "max-width": 320,
        "font-size": 18,
        color: "rgba(0, 0, 0, 0.85)",
        "background-color": "#FFF",
        "overlay-style": { padding: "12px 18px", borderRadius: "12px" }
      }, {
        tooltip: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`《哥斯拉大战金刚》是由美国传奇影业公司出品。该片讲述了人类计划将所有巨兽从地球上抹去，而传说中哥斯拉和金刚两个王者被设计进行了对决，最终两大巨兽联手破坏人类计划的故事。`);
          } else {
            return [
              createTextVNode("《哥斯拉大战金刚》是由美国传奇影业公司出品。该片讲述了人类计划将所有巨兽从地球上抹去，而传说中哥斯拉和金刚两个王者被设计进行了对决，最终两大巨兽联手破坏人类计划的故事。")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, { type: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`哥斯拉大战金刚`);
                } else {
                  return [
                    createTextVNode("哥斯拉大战金刚")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
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
      }, _parent));
      _push(`<details class="details custom-block"><summary>Show Code</summary><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Tooltip</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">:max-width</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">320</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">:font-size</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">18</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">rgba(0, 0, 0, 0.85)</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">background-color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">#FFF</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">:overlay-style</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">{padding: &#39;12px 18px&#39;, borderRadius: &#39;12px&#39;}</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">template</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">#</span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">tooltip</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}">《哥斯拉大战金刚》是由美国传奇影业公司出品。该片讲述了人类计划将所有巨兽从地球上抹去，而传说中哥斯拉和金刚两个王者被设计进行了对决，最终两大巨兽联手破坏人类计划的故事。</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}"> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">type</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">primary</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}">哥斯拉大战金刚</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Tooltip</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span></code></pre></div></details><h2 id="暂无数据" tabindex="-1">暂无数据 <a class="header-anchor" href="#暂无数据" aria-label="Permalink to &quot;暂无数据&quot;">​</a></h2>`);
      _push(ssrRenderComponent(_component_Tooltip, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, { type: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`暂无数据`);
                } else {
                  return [
                    createTextVNode("暂无数据")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, { type: "primary" }, {
                default: withCtx(() => [
                  createTextVNode("暂无数据")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block"><summary>Show Code</summary><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Tooltip</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}"> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">type</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">primary</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}">暂无数据</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#BABED8" })}">  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">Tooltip</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span></code></pre></div></details><h2 id="apis" tabindex="-1">APIs <a class="header-anchor" href="#apis" aria-label="Permalink to &quot;APIs&quot;">​</a></h2><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th><th>必传</th></tr></thead><tbody><tr><td>maxWidth</td><td>提示框内容最大宽度，单位px</td><td>number</td><td>120</td><td>false</td></tr><tr><td>content</td><td>展示的文本</td><td>string | slot</td><td>&#39;暂无内容&#39;</td><td>false</td></tr><tr><td>tooltip</td><td>提示的文本</td><td>string | slot</td><td>&#39;暂无提示&#39;</td><td>false</td></tr><tr><td>fontSize</td><td>提示文本字体大小，单位px，优先级高于 <code>overlayStyle</code></td><td>number</td><td>14</td><td>false</td></tr><tr><td>color</td><td>提示文本字体颜色，优先级高于 <code>overlayStyle</code></td><td>string</td><td>&#39;#FFF&#39;</td><td>false</td></tr><tr><td>backgroundColor</td><td>提示框背景色，优先级高于 <code>overlayStyle</code></td><td>string</td><td>&#39;rgba(0,0,0,.85)&#39;</td><td>false</td></tr><tr><td>overlayStyle</td><td>提示框内容区域样式</td><td>CSSProperties</td><td>{}</td><td>false</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table><thead><tr><th>事件名称</th><th>说明</th><th>参数</th></tr></thead><tbody><tr><td>openChange</td><td>显示隐藏的回调</td><td>(visible: boolean) =&gt; void</td></tr></tbody></table></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/components/tooltip.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
