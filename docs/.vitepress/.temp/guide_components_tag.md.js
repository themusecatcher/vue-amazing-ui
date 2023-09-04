import { defineComponent, ref, watchEffect, resolveComponent, withCtx, createTextVNode, createVNode, openBlock, createBlock, Fragment, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
const __pageData = JSON.parse('{"title":"标签 Tag","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/tag.md","filePath":"guide/components/tag.md"}');
const __default__ = { name: "guide/components/tag.md" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    const strTags = ref(["天空", "大海", "湖泊"]);
    watchEffect(() => {
      console.log("strTags", strTags.value);
    });
    const objTags = ref([
      {
        label: "天空",
        color: "processing"
      },
      {
        label: "大海",
        closable: false,
        color: "error"
      },
      {
        label: "湖泊",
        color: "pink"
      }
    ]);
    watchEffect(() => {
      console.log("objTags", objTags.value);
    });
    const onClose = (e) => {
      console.log("e", e);
    };
    const onDynamicClose = (tag2, index) => {
      console.log("tag", tag2);
      console.log("index", index);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Space = resolveComponent("Space");
      const _component_Tag = resolveComponent("Tag", true);
      const _component_Divider = resolveComponent("Divider");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-ff787445><h1 id="标签-tag" tabindex="-1" data-v-ff787445>标签 Tag <a class="header-anchor" href="#标签-tag" aria-label="Permalink to &quot;标签 Tag&quot;" data-v-ff787445>​</a></h1><br data-v-ff787445><p data-v-ff787445><em data-v-ff787445>进行标记和分类的小标签</em></p><h2 id="何时使用" tabindex="-1" data-v-ff787445>何时使用 <a class="header-anchor" href="#何时使用" aria-label="Permalink to &quot;何时使用&quot;" data-v-ff787445>​</a></h2><ul data-v-ff787445><li data-v-ff787445>用于标记事物的属性和维度</li><li data-v-ff787445>进行分类</li></ul><h2 id="基本使用" tabindex="-1" data-v-ff787445>基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;" data-v-ff787445>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Tag, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Tag 1`);
                } else {
                  return [
                    createTextVNode("Tag 1")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<a href="https://blog.csdn.net/Dandrose" data-v-ff787445${_scopeId2}>Link</a>`);
                } else {
                  return [
                    createVNode("a", { href: "https://blog.csdn.net/Dandrose" }, "Link")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, {
              closable: "",
              onClose
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Tag 2`);
                } else {
                  return [
                    createTextVNode("Tag 2")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Tag, null, {
                default: withCtx(() => [
                  createTextVNode("Tag 1")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, null, {
                default: withCtx(() => [
                  createVNode("a", { href: "https://blog.csdn.net/Dandrose" }, "Link")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, {
                closable: "",
                onClose
              }, {
                default: withCtx(() => [
                  createTextVNode("Tag 2")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-ff787445><summary data-v-ff787445>Show Code</summary><div class="language-vue" data-v-ff787445><button title="Copy Code" class="copy" data-v-ff787445></button><span class="lang" data-v-ff787445>vue</span><pre class="shiki material-theme-palenight" data-v-ff787445><code data-v-ff787445><span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>script</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>setup</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>lang</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>ts</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>const</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> onClose </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#BABED8", "font-style": "italic" })}" data-v-ff787445>e</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-ff787445>MouseEvent</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>)</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>=&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>console</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>.</span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>log</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>e</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>)</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>}</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>script</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>Tag 1</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>a</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>href</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>https://blog.csdn.net/Dandrose</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>Link</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>a</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>closable</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>@close</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>onClose</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>Tag 2</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span></code></pre></div></details><h2 id="多彩标签" tabindex="-1" data-v-ff787445>多彩标签 <a class="header-anchor" href="#多彩标签" aria-label="Permalink to &quot;多彩标签&quot;" data-v-ff787445>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Tag, { color: "pink" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`pink`);
                } else {
                  return [
                    createTextVNode("pink")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "red" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`red`);
                } else {
                  return [
                    createTextVNode("red")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "yellow" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`yellow`);
                } else {
                  return [
                    createTextVNode("yellow")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "orange" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`orange`);
                } else {
                  return [
                    createTextVNode("orange")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "cyan" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`cyan`);
                } else {
                  return [
                    createTextVNode("cyan")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "green" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`green`);
                } else {
                  return [
                    createTextVNode("green")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "blue" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`blue`);
                } else {
                  return [
                    createTextVNode("blue")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "purple" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`purple`);
                } else {
                  return [
                    createTextVNode("purple")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "geekblue" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`geekblue`);
                } else {
                  return [
                    createTextVNode("geekblue")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "magenta" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`magenta`);
                } else {
                  return [
                    createTextVNode("magenta")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "volcano" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`volcano`);
                } else {
                  return [
                    createTextVNode("volcano")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "gold" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`gold`);
                } else {
                  return [
                    createTextVNode("gold")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "lime" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`lime`);
                } else {
                  return [
                    createTextVNode("lime")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Tag, { color: "pink" }, {
                default: withCtx(() => [
                  createTextVNode("pink")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "red" }, {
                default: withCtx(() => [
                  createTextVNode("red")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "yellow" }, {
                default: withCtx(() => [
                  createTextVNode("yellow")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "orange" }, {
                default: withCtx(() => [
                  createTextVNode("orange")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "cyan" }, {
                default: withCtx(() => [
                  createTextVNode("cyan")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "green" }, {
                default: withCtx(() => [
                  createTextVNode("green")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "blue" }, {
                default: withCtx(() => [
                  createTextVNode("blue")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "purple" }, {
                default: withCtx(() => [
                  createTextVNode("purple")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "geekblue" }, {
                default: withCtx(() => [
                  createTextVNode("geekblue")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "magenta" }, {
                default: withCtx(() => [
                  createTextVNode("magenta")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "volcano" }, {
                default: withCtx(() => [
                  createTextVNode("volcano")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "gold" }, {
                default: withCtx(() => [
                  createTextVNode("gold")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "lime" }, {
                default: withCtx(() => [
                  createTextVNode("lime")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<br data-v-ff787445><br data-v-ff787445>`);
      _push(ssrRenderComponent(_component_Space, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Tag, { color: "#f50" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`#f50`);
                } else {
                  return [
                    createTextVNode("#f50")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "#2db7f5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`#2db7f5`);
                } else {
                  return [
                    createTextVNode("#2db7f5")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "#87d068" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`#87d068`);
                } else {
                  return [
                    createTextVNode("#87d068")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "#108ee9" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`#108ee9`);
                } else {
                  return [
                    createTextVNode("#108ee9")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Tag, { color: "#f50" }, {
                default: withCtx(() => [
                  createTextVNode("#f50")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "#2db7f5" }, {
                default: withCtx(() => [
                  createTextVNode("#2db7f5")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "#87d068" }, {
                default: withCtx(() => [
                  createTextVNode("#87d068")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "#108ee9" }, {
                default: withCtx(() => [
                  createTextVNode("#108ee9")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-ff787445><summary data-v-ff787445>Show Code</summary><div class="language-vue" data-v-ff787445><button title="Copy Code" class="copy" data-v-ff787445></button><span class="lang" data-v-ff787445>vue</span><pre class="shiki material-theme-palenight" data-v-ff787445><code data-v-ff787445><span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>pink</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>pink</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>red</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>red</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>yellow</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>yellow</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>orange</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>orange</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>cyan</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>cyan</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>green</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>green</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>blue</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>blue</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>purple</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>purple</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>geekblue</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>geekblue</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>magenta</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>magenta</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>volcano</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>volcano</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>gold</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>gold</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>lime</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>lime</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>br</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>/&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>br</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>/&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>#f50</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>#f50</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>#2db7f5</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>#2db7f5</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>#87d068</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>#87d068</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>#108ee9</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>#108ee9</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span></code></pre></div></details><h2 id="预设状态的标签" tabindex="-1" data-v-ff787445>预设状态的标签 <a class="header-anchor" href="#预设状态的标签" aria-label="Permalink to &quot;预设状态的标签&quot;" data-v-ff787445>​</a></h2>`);
      _push(ssrRenderComponent(_component_Divider, { orientation: "left" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Without icon`);
          } else {
            return [
              createTextVNode("Without icon")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Space, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Tag, { color: "success" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`success`);
                } else {
                  return [
                    createTextVNode("success")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "processing" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`processing`);
                } else {
                  return [
                    createTextVNode("processing")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "error" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`error`);
                } else {
                  return [
                    createTextVNode("error")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "warning" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`warning`);
                } else {
                  return [
                    createTextVNode("warning")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "default" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`default`);
                } else {
                  return [
                    createTextVNode("default")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Tag, { color: "success" }, {
                default: withCtx(() => [
                  createTextVNode("success")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "processing" }, {
                default: withCtx(() => [
                  createTextVNode("processing")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "error" }, {
                default: withCtx(() => [
                  createTextVNode("error")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "warning" }, {
                default: withCtx(() => [
                  createTextVNode("warning")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "default" }, {
                default: withCtx(() => [
                  createTextVNode("default")
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
            _push2(`With icon`);
          } else {
            return [
              createTextVNode("With icon")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Space, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Tag, { color: "success" }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg focusable="false" class="u-svg" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896" data-v-ff787445${_scopeId2}><path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" data-v-ff787445${_scopeId2}></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" data-v-ff787445${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      focusable: "false",
                      class: "u-svg",
                      "data-icon": "check-circle",
                      width: "1em",
                      height: "1em",
                      fill: "currentColor",
                      "aria-hidden": "true",
                      viewBox: "64 64 896 896"
                    }, [
                      createVNode("path", { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" }),
                      createVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` success `);
                } else {
                  return [
                    createTextVNode(" success ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "processing" }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg focusable="false" class="u-spin" data-icon="sync" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896" data-v-ff787445${_scopeId2}><path d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 01755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 01512.1 856a342.24 342.24 0 01-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 00-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 00-8-8.2z" data-v-ff787445${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      focusable: "false",
                      class: "u-spin",
                      "data-icon": "sync",
                      width: "1em",
                      height: "1em",
                      fill: "currentColor",
                      "aria-hidden": "true",
                      viewBox: "64 64 896 896"
                    }, [
                      createVNode("path", { d: "M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 01755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 01512.1 856a342.24 342.24 0 01-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 00-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 00-8-8.2z" })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` processing `);
                } else {
                  return [
                    createTextVNode(" processing ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "error" }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg focusable="false" class="u-svg" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896" data-v-ff787445${_scopeId2}><path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" data-v-ff787445${_scopeId2}></path><path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" data-v-ff787445${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      focusable: "false",
                      class: "u-svg",
                      "data-icon": "close-circle",
                      width: "1em",
                      height: "1em",
                      fill: "currentColor",
                      "aria-hidden": "true",
                      viewBox: "64 64 896 896"
                    }, [
                      createVNode("path", { d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" }),
                      createVNode("path", { d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` error `);
                } else {
                  return [
                    createTextVNode(" error ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "warning" }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg focusable="false" class="u-svg" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896" data-v-ff787445${_scopeId2}><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" data-v-ff787445${_scopeId2}></path><path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" data-v-ff787445${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      focusable: "false",
                      class: "u-svg",
                      "data-icon": "exclamation-circle",
                      width: "1em",
                      height: "1em",
                      fill: "currentColor",
                      "aria-hidden": "true",
                      viewBox: "64 64 896 896"
                    }, [
                      createVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }),
                      createVNode("path", { d: "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` warning `);
                } else {
                  return [
                    createTextVNode(" warning ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "default" }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg focusable="false" class="u-svg" data-icon="clock-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896" data-v-ff787445${_scopeId2}><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" data-v-ff787445${_scopeId2}></path><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z" data-v-ff787445${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      focusable: "false",
                      class: "u-svg",
                      "data-icon": "clock-circle",
                      width: "1em",
                      height: "1em",
                      fill: "currentColor",
                      "aria-hidden": "true",
                      viewBox: "64 64 896 896"
                    }, [
                      createVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }),
                      createVNode("path", { d: "M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z" })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` waiting `);
                } else {
                  return [
                    createTextVNode(" waiting ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, { color: "default" }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg focusable="false" class="u-svg" data-icon="minus-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896" data-v-ff787445${_scopeId2}><path d="M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z" data-v-ff787445${_scopeId2}></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" data-v-ff787445${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      focusable: "false",
                      class: "u-svg",
                      "data-icon": "minus-circle",
                      width: "1em",
                      height: "1em",
                      fill: "currentColor",
                      "aria-hidden": "true",
                      viewBox: "64 64 896 896"
                    }, [
                      createVNode("path", { d: "M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z" }),
                      createVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` stop `);
                } else {
                  return [
                    createTextVNode(" stop ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Tag, { color: "success" }, {
                icon: withCtx(() => [
                  (openBlock(), createBlock("svg", {
                    focusable: "false",
                    class: "u-svg",
                    "data-icon": "check-circle",
                    width: "1em",
                    height: "1em",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    viewBox: "64 64 896 896"
                  }, [
                    createVNode("path", { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" }),
                    createVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" })
                  ]))
                ]),
                default: withCtx(() => [
                  createTextVNode(" success ")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "processing" }, {
                icon: withCtx(() => [
                  (openBlock(), createBlock("svg", {
                    focusable: "false",
                    class: "u-spin",
                    "data-icon": "sync",
                    width: "1em",
                    height: "1em",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    viewBox: "64 64 896 896"
                  }, [
                    createVNode("path", { d: "M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 01755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 01512.1 856a342.24 342.24 0 01-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 00-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 00-8-8.2z" })
                  ]))
                ]),
                default: withCtx(() => [
                  createTextVNode(" processing ")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "error" }, {
                icon: withCtx(() => [
                  (openBlock(), createBlock("svg", {
                    focusable: "false",
                    class: "u-svg",
                    "data-icon": "close-circle",
                    width: "1em",
                    height: "1em",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    viewBox: "64 64 896 896"
                  }, [
                    createVNode("path", { d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" }),
                    createVNode("path", { d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" })
                  ]))
                ]),
                default: withCtx(() => [
                  createTextVNode(" error ")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "warning" }, {
                icon: withCtx(() => [
                  (openBlock(), createBlock("svg", {
                    focusable: "false",
                    class: "u-svg",
                    "data-icon": "exclamation-circle",
                    width: "1em",
                    height: "1em",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    viewBox: "64 64 896 896"
                  }, [
                    createVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }),
                    createVNode("path", { d: "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" })
                  ]))
                ]),
                default: withCtx(() => [
                  createTextVNode(" warning ")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "default" }, {
                icon: withCtx(() => [
                  (openBlock(), createBlock("svg", {
                    focusable: "false",
                    class: "u-svg",
                    "data-icon": "clock-circle",
                    width: "1em",
                    height: "1em",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    viewBox: "64 64 896 896"
                  }, [
                    createVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }),
                    createVNode("path", { d: "M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z" })
                  ]))
                ]),
                default: withCtx(() => [
                  createTextVNode(" waiting ")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, { color: "default" }, {
                icon: withCtx(() => [
                  (openBlock(), createBlock("svg", {
                    focusable: "false",
                    class: "u-svg",
                    "data-icon": "minus-circle",
                    width: "1em",
                    height: "1em",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    viewBox: "64 64 896 896"
                  }, [
                    createVNode("path", { d: "M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z" }),
                    createVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" })
                  ]))
                ]),
                default: withCtx(() => [
                  createTextVNode(" stop ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-ff787445><summary data-v-ff787445>Show Code</summary><div class="language-vue" data-v-ff787445><button title="Copy Code" class="copy" data-v-ff787445></button><span class="lang" data-v-ff787445>vue</span><pre class="shiki material-theme-palenight" data-v-ff787445><code data-v-ff787445><span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>orientation</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>left</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>Without icon</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>success</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>success</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>processing</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>processing</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>error</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>error</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>warning</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>warning</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>default</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>default</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>orientation</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>left</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>With icon</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Divider</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>success</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>#</span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>icon</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>svg</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>focusable</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>false</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>u-svg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>data-icon</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>check-circle</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>width</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>1em</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>height</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>1em</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>fill</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>currentColor</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>aria-hidden</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>true</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>viewBox</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>64 64 896 896</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>d</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>d</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>svg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      success</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>processing</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>#</span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>icon</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>svg</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>focusable</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>false</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>u-spin</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>data-icon</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>sync</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>width</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>1em</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>height</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>1em</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>fill</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>currentColor</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>aria-hidden</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>true</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>viewBox</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>64 64 896 896</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>d</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 01755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 01512.1 856a342.24 342.24 0 01-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 00-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 00-8-8.2z</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>svg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      processing</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>error</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>#</span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>icon</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>svg</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>focusable</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>false</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>u-svg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>data-icon</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>close-circle</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>width</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>1em</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>height</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>1em</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>fill</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>currentColor</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>aria-hidden</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>true</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>viewBox</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>64 64 896 896</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>d</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>d</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>svg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      error</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>warning</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>#</span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>icon</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>svg</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>focusable</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>false</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>u-svg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>data-icon</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>exclamation-circle</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>width</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>1em</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>height</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>1em</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>fill</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>currentColor</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>aria-hidden</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>true</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>viewBox</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>64 64 896 896</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>d</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>d</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>svg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      warning</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>default</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>#</span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>icon</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>svg</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>focusable</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>false</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>u-svg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>data-icon</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>clock-circle</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>width</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>1em</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>height</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>1em</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>fill</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>currentColor</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>aria-hidden</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>true</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>viewBox</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>64 64 896 896</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>d</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>d</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>svg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      waiting</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>default</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>#</span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>icon</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>svg</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>focusable</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>false</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>u-svg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>data-icon</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>minus-circle</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>width</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>1em</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>height</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>1em</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>fill</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>currentColor</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>aria-hidden</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>true</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>viewBox</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>64 64 896 896</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>d</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>d</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>svg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      stop</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>style</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>lang</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>less</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>scoped</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>.</span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-ff787445>u-svg</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-ff787445>display</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> inline-block</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-ff787445>line-height</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}" data-v-ff787445>1</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>}</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>.</span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-ff787445>u-spin</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-ff787445>display</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> inline-block</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-ff787445>line-height</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}" data-v-ff787445>1</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-ff787445>-webkit-animation</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> loadingCircle </span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}" data-v-ff787445>1s</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> infinite linear</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-ff787445>animation</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> loadingCircle </span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}" data-v-ff787445>1s</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> infinite linear</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>@</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>keyframes loadingCircle </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}" data-v-ff787445>100%</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-ff787445>-webkit-transform</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>rotate</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}" data-v-ff787445>360deg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>);</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-ff787445>transform</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>rotate</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}" data-v-ff787445>360deg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>);</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>}</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>}</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>}</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>style</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span></code></pre></div></details><h2 id="动态添加和删除" tabindex="-1" data-v-ff787445>动态添加和删除 <a class="header-anchor" href="#动态添加和删除" aria-label="Permalink to &quot;动态添加和删除&quot;" data-v-ff787445>​</a></h2><h3 id="使用字符串格式数组" tabindex="-1" data-v-ff787445>使用字符串格式数组 <a class="header-anchor" href="#使用字符串格式数组" aria-label="Permalink to &quot;使用字符串格式数组&quot;" data-v-ff787445>​</a></h3><br data-v-ff787445>`);
      _push(ssrRenderComponent(_component_Space, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Tag, {
              dynamic: "",
              value: strTags.value,
              "onUpdate:value": ($event) => strTags.value = $event,
              onDynamicClose
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Tag, {
                dynamic: "",
                value: strTags.value,
                "onUpdate:value": ($event) => strTags.value = $event,
                onDynamicClose
              }, null, 8, ["value", "onUpdate:value"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-ff787445><summary data-v-ff787445>Show Code</summary><div class="language-vue" data-v-ff787445><button title="Copy Code" class="copy" data-v-ff787445></button><span class="lang" data-v-ff787445>vue</span><pre class="shiki material-theme-palenight" data-v-ff787445><code data-v-ff787445><span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>script</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>setup</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>lang</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>ts</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}" data-v-ff787445>import</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>ref</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>watchEffect</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>}</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}" data-v-ff787445>from</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>vue</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span></span>
<span class="line" data-v-ff787445></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>const</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> strTags </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>ref</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>([</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>天空</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>大海</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>湖泊</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>])</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>watchEffect</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>()</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>=&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>console</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>.</span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>log</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>strTags</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>strTags</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>.</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>value</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>)</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>}</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>)</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>const</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> onDynamicClose </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#BABED8", "font-style": "italic" })}" data-v-ff787445>tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-ff787445>any</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8", "font-style": "italic" })}" data-v-ff787445>index</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-ff787445>number</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>)</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>=&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>console</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>.</span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>log</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>tag</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>)  </span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>console</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>.</span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>log</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>index</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>index</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>)  </span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>}</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>script</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>dynamic</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>v-model:value</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>strTags</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>@dynamic-close</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>onDynamicClose</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> /&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span></code></pre></div></details><h3 id="使用对象格式数组" tabindex="-1" data-v-ff787445>使用对象格式数组 <a class="header-anchor" href="#使用对象格式数组" aria-label="Permalink to &quot;使用对象格式数组&quot;" data-v-ff787445>​</a></h3><br data-v-ff787445>`);
      _push(ssrRenderComponent(_component_Space, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Tag, {
              dynamic: "",
              value: objTags.value,
              "onUpdate:value": ($event) => objTags.value = $event,
              onDynamicClose
            }, {
              default: withCtx(({ label, index }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (index === 1) {
                    _push3(`<!--[-->${ssrInterpolate(label)} ${ssrInterpolate(index)}<!--]-->`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    index === 1 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createTextVNode(toDisplayString(label) + " " + toDisplayString(index), 1)
                    ], 64)) : createCommentVNode("", true)
                  ];
                }
              }),
              icon: withCtx(({ index }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (index === 0) {
                    _push3(`<svg focusable="false" class="u-svg" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896" data-v-ff787445${_scopeId2}><path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" data-v-ff787445${_scopeId2}></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" data-v-ff787445${_scopeId2}></path></svg>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    index === 0 ? (openBlock(), createBlock("svg", {
                      key: 0,
                      focusable: "false",
                      class: "u-svg",
                      "data-icon": "check-circle",
                      width: "1em",
                      height: "1em",
                      fill: "currentColor",
                      "aria-hidden": "true",
                      viewBox: "64 64 896 896"
                    }, [
                      createVNode("path", { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" }),
                      createVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" })
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Tag, {
                dynamic: "",
                value: objTags.value,
                "onUpdate:value": ($event) => objTags.value = $event,
                onDynamicClose
              }, {
                default: withCtx(({ label, index }) => [
                  index === 1 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createTextVNode(toDisplayString(label) + " " + toDisplayString(index), 1)
                  ], 64)) : createCommentVNode("", true)
                ]),
                icon: withCtx(({ index }) => [
                  index === 0 ? (openBlock(), createBlock("svg", {
                    key: 0,
                    focusable: "false",
                    class: "u-svg",
                    "data-icon": "check-circle",
                    width: "1em",
                    height: "1em",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    viewBox: "64 64 896 896"
                  }, [
                    createVNode("path", { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" }),
                    createVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" })
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["value", "onUpdate:value"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-ff787445><summary data-v-ff787445>Show Code</summary><div class="language-vue" data-v-ff787445><button title="Copy Code" class="copy" data-v-ff787445></button><span class="lang" data-v-ff787445>vue</span><pre class="shiki material-theme-palenight" data-v-ff787445><code data-v-ff787445><span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>script</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>setup</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>lang</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>ts</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}" data-v-ff787445>import</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>ref</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>watchEffect</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>}</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}" data-v-ff787445>from</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>vue</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span></span>
<span class="line" data-v-ff787445></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>const</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> objTags </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>ref</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>([</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>label</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>天空</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>processing</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>},</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>label</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>大海</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>closable</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#FF9CAC" })}" data-v-ff787445>false</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>error</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>},</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>label</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>湖泊</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>pink</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>}</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>])</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>watchEffect</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>()</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>=&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>console</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>.</span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>log</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>objTags</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>objTags</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>.</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>value</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>)</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>}</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>)</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>const</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> onDynamicClose </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#BABED8", "font-style": "italic" })}" data-v-ff787445>tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-ff787445>any</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8", "font-style": "italic" })}" data-v-ff787445>index</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-ff787445>number</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>)</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>=&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>console</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>.</span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>log</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>tag</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>)  </span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>console</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>.</span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>log</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>index</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>index</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>)  </span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>}</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>script</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>dynamic</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>v-model:value</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>objTags</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>@dynamic-close</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>onDynamicClose</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>#</span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>default</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>label</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>index</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>}</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}" data-v-ff787445>v-if</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>index</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>===</span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}" data-v-ff787445>1</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>          {{ label }} {{ index }}</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>#</span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>icon</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>index</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>}</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}" data-v-ff787445>v-if</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>index</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>===</span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}" data-v-ff787445>0</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>          </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>svg</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>focusable</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>false</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>u-svg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>data-icon</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>check-circle</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>width</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>1em</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>height</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>1em</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>fill</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>currentColor</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>aria-hidden</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>true</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>viewBox</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>64 64 896 896</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>d</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>d</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>path</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>svg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>        </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>style</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>lang</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>less</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>scoped</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>.</span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-ff787445>u-svg</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-ff787445>display</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> inline-block</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-ff787445>line-height</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}" data-v-ff787445>1</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>}</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>style</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span></code></pre></div></details><h2 id="三种尺寸" tabindex="-1" data-v-ff787445>三种尺寸 <a class="header-anchor" href="#三种尺寸" aria-label="Permalink to &quot;三种尺寸&quot;" data-v-ff787445>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Tag, {
              closable: "",
              size: "small",
              onClose
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 爱在西元前 `);
                } else {
                  return [
                    createTextVNode(" 爱在西元前 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, {
              color: "warning",
              closable: "",
              onClose
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 超人不会飞 `);
                } else {
                  return [
                    createTextVNode(" 超人不会飞 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tag, {
              color: "blue",
              size: "large",
              dynamic: "",
              value: strTags.value,
              "onUpdate:value": ($event) => strTags.value = $event,
              closable: "",
              onClose: onDynamicClose
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Tag, {
                closable: "",
                size: "small",
                onClose
              }, {
                default: withCtx(() => [
                  createTextVNode(" 爱在西元前 ")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, {
                color: "warning",
                closable: "",
                onClose
              }, {
                default: withCtx(() => [
                  createTextVNode(" 超人不会飞 ")
                ]),
                _: 1
              }),
              createVNode(_component_Tag, {
                color: "blue",
                size: "large",
                dynamic: "",
                value: strTags.value,
                "onUpdate:value": ($event) => strTags.value = $event,
                closable: "",
                onClose: onDynamicClose
              }, null, 8, ["value", "onUpdate:value"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-ff787445><summary data-v-ff787445>Show Code</summary><div class="language-vue" data-v-ff787445><button title="Copy Code" class="copy" data-v-ff787445></button><span class="lang" data-v-ff787445>vue</span><pre class="shiki material-theme-palenight" data-v-ff787445><code data-v-ff787445><span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>script</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>setup</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>lang</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>ts</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}" data-v-ff787445>import</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>ref</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>watchEffect</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>}</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}" data-v-ff787445>from</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>vue</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span></span>
<span class="line" data-v-ff787445></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>const</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> strTags </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>ref</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>([</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>天空</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>大海</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>湖泊</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>])</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>watchEffect</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>()</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>=&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>console</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>.</span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>log</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>strTags</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>strTags</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>.</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>value</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>)</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>}</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>)</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>const</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> onClose </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#BABED8", "font-style": "italic" })}" data-v-ff787445>e</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-ff787445>MouseEvent</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>)</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>=&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>console</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>.</span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>log</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>e</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>e</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>)</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>}</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>const</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> onDynamicClose </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#BABED8", "font-style": "italic" })}" data-v-ff787445>tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-ff787445>any</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8", "font-style": "italic" })}" data-v-ff787445>index</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-ff787445>number</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>)</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>=&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>console</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>.</span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>log</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>tag</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>)  </span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>console</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>.</span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>log</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>index</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>index</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>)  </span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>}</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>script</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>closable</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>size</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>small</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>@close</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>onClose</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      爱在西元前</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>warning</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>closable</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>@close</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>onClose</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>      超人不会飞</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>blue</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>size</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>large</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>dynamic</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>v-model:value</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>strTags</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>closable</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>      </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>@close</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>onDynamicClose</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> /&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span></code></pre></div></details><h2 id="自定义动态标签排列方式" tabindex="-1" data-v-ff787445>自定义动态标签排列方式 <a class="header-anchor" href="#自定义动态标签排列方式" aria-label="Permalink to &quot;自定义动态标签排列方式&quot;" data-v-ff787445>​</a></h2>`);
      _push(ssrRenderComponent(_component_Tag, {
        "space-direction": "vertical",
        "space-size": 12,
        color: "blue",
        size: "large",
        dynamic: "",
        value: strTags.value,
        "onUpdate:value": ($event) => strTags.value = $event,
        closable: "",
        onClose: onDynamicClose
      }, null, _parent));
      _push(`<details class="details custom-block" data-v-ff787445><summary data-v-ff787445>Show Code</summary><div class="language-vue" data-v-ff787445><button title="Copy Code" class="copy" data-v-ff787445></button><span class="lang" data-v-ff787445>vue</span><pre class="shiki material-theme-palenight" data-v-ff787445><code data-v-ff787445><span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>script</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>setup</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>lang</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>ts</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}" data-v-ff787445>import</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>ref</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>watchEffect</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>}</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}" data-v-ff787445>from</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>vue</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span></span>
<span class="line" data-v-ff787445></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>const</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> strTags </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>ref</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>([</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>天空</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>大海</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>湖泊</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>])</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>watchEffect</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>()</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>=&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>console</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>.</span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>log</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>strTags</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>strTags</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>.</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>value</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>)</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>}</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>)</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>const</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> onDynamicClose </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#BABED8", "font-style": "italic" })}" data-v-ff787445>tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-ff787445>any</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8", "font-style": "italic" })}" data-v-ff787445>index</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-ff787445>number</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>)</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>=&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>{</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>console</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>.</span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>log</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>tag</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>tag</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>)  </span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>console</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>.</span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-ff787445>log</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>(</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>index</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>,</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>index</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>)  </span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>}</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>script</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-ff787445>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>Tag</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>space-direction</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>vertical</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>:space-size</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>12</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>color</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>blue</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>size</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>large</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>dynamic</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>v-model:value</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>strTags</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>closable</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-ff787445>@close</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-ff787445>onDynamicClose</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445> /&gt;</span></span>
<span class="line" data-v-ff787445><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-ff787445>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-ff787445>&gt;</span></span></code></pre></div></details><h2 id="apis" tabindex="-1" data-v-ff787445>APIs <a class="header-anchor" href="#apis" aria-label="Permalink to &quot;APIs&quot;" data-v-ff787445>​</a></h2><table data-v-ff787445><thead data-v-ff787445><tr data-v-ff787445><th data-v-ff787445>参数</th><th data-v-ff787445>说明</th><th data-v-ff787445>类型</th><th data-v-ff787445>默认值</th><th data-v-ff787445>必传</th></tr></thead><tbody data-v-ff787445><tr data-v-ff787445><td data-v-ff787445>closable</td><td data-v-ff787445>标签是否可以关闭</td><td data-v-ff787445>boolean</td><td data-v-ff787445>false</td><td data-v-ff787445>false</td></tr><tr data-v-ff787445><td data-v-ff787445>color</td><td data-v-ff787445>标签颜色，预置多种常用颜色：<code data-v-ff787445>&#39;success&#39;</code>, <code data-v-ff787445>&#39;processing&#39;</code>, <code data-v-ff787445>&#39;error&#39;</code>, <code data-v-ff787445>&#39;warning&#39;</code>, <code data-v-ff787445>&#39;pink&#39;</code>, <code data-v-ff787445>&#39;red&#39;</code>, <code data-v-ff787445>&#39;yellow&#39;</code>, <code data-v-ff787445>&#39;orange&#39;</code>, <code data-v-ff787445>&#39;cyan&#39;</code>, <code data-v-ff787445>&#39;green&#39;</code>, <code data-v-ff787445>&#39;blue&#39;</code>, <code data-v-ff787445>&#39;purple&#39;</code>, <code data-v-ff787445>&#39;geekblue&#39;</code>, <code data-v-ff787445>&#39;magenta&#39;</code>, <code data-v-ff787445>&#39;volcano&#39;</code>, <code data-v-ff787445>&#39;gold&#39;</code>, <code data-v-ff787445>&#39;lime&#39;</code></td><td data-v-ff787445>string</td><td data-v-ff787445>&#39;&#39;</td><td data-v-ff787445>false</td></tr><tr data-v-ff787445><td data-v-ff787445>icon</td><td data-v-ff787445>设置图标</td><td data-v-ff787445>string | slot</td><td data-v-ff787445>&#39;&#39;</td><td data-v-ff787445>false</td></tr><tr data-v-ff787445><td data-v-ff787445>size</td><td data-v-ff787445>标签尺寸</td><td data-v-ff787445>&#39;small&#39; | &#39;middle&#39; | &#39;large&#39;</td><td data-v-ff787445>&#39;middle&#39;</td><td data-v-ff787445>false</td></tr><tr data-v-ff787445><td data-v-ff787445>dynamic</td><td data-v-ff787445>是否启用标签动态添加和删除</td><td data-v-ff787445>boolean</td><td data-v-ff787445>false</td><td data-v-ff787445>false</td></tr><tr data-v-ff787445><td data-v-ff787445>value `);
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
      _push(`</td><td data-v-ff787445>动态标签数组，<code data-v-ff787445>dynamic</code> 为 <code data-v-ff787445>true</code> 时生效</td><td data-v-ff787445>string[] | Tag[]</td><td data-v-ff787445>[]</td><td data-v-ff787445>false</td></tr><tr data-v-ff787445><td data-v-ff787445>spaceWidth</td><td data-v-ff787445>间距区域总宽度</td><td data-v-ff787445>string | number</td><td data-v-ff787445>&#39;auto&#39;</td><td data-v-ff787445>false</td></tr><tr data-v-ff787445><td data-v-ff787445>spaceAlign</td><td data-v-ff787445>垂直排列方式</td><td data-v-ff787445>&#39;stretch&#39; | &#39;start&#39; | &#39;end&#39; | &#39;center&#39; | &#39;baseline&#39;</td><td data-v-ff787445>&#39;start&#39;</td><td data-v-ff787445>false</td></tr><tr data-v-ff787445><td data-v-ff787445>spaceDirection</td><td data-v-ff787445>间距方向</td><td data-v-ff787445>&#39;horizontal&#39; | &#39;vertical&#39;</td><td data-v-ff787445>&#39;horizontal&#39;</td><td data-v-ff787445>false</td></tr><tr data-v-ff787445><td data-v-ff787445>spaceSize</td><td data-v-ff787445>间距大小，数组时表示: <code data-v-ff787445>[水平间距, 垂直间距]</code></td><td data-v-ff787445>number | number[] | &#39;small&#39; | &#39;middle&#39; | &#39;large&#39;</td><td data-v-ff787445>&#39;small&#39;</td><td data-v-ff787445>false</td></tr></tbody></table><h2 id="tag-type" tabindex="-1" data-v-ff787445>Tag Type <a class="header-anchor" href="#tag-type" aria-label="Permalink to &quot;Tag Type&quot;" data-v-ff787445>​</a></h2><table data-v-ff787445><thead data-v-ff787445><tr data-v-ff787445><th data-v-ff787445>名称</th><th data-v-ff787445>说明</th><th data-v-ff787445>类型</th><th data-v-ff787445>必传</th></tr></thead><tbody data-v-ff787445><tr data-v-ff787445><td data-v-ff787445>label</td><td data-v-ff787445>标签文本名</td><td data-v-ff787445>string | slot</td><td data-v-ff787445>false</td></tr><tr data-v-ff787445><td data-v-ff787445>closable</td><td data-v-ff787445>标签是否可以关闭，默认 <code data-v-ff787445>true</code></td><td data-v-ff787445>boolean</td><td data-v-ff787445>false</td></tr><tr data-v-ff787445><td data-v-ff787445>color</td><td data-v-ff787445>标签颜色</td><td data-v-ff787445>string</td><td data-v-ff787445>false</td></tr><tr data-v-ff787445><td data-v-ff787445>icon</td><td data-v-ff787445>设置图标</td><td data-v-ff787445>string | slot</td><td data-v-ff787445>false</td></tr><tr data-v-ff787445><td data-v-ff787445>size</td><td data-v-ff787445>标签尺寸</td><td data-v-ff787445>&#39;small&#39; | &#39;middle&#39; | &#39;large&#39;</td><td data-v-ff787445>false</td></tr></tbody></table><h2 id="events" tabindex="-1" data-v-ff787445>Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;" data-v-ff787445>​</a></h2><table data-v-ff787445><thead data-v-ff787445><tr data-v-ff787445><th data-v-ff787445>事件名称</th><th data-v-ff787445>说明</th><th data-v-ff787445>参数</th></tr></thead><tbody data-v-ff787445><tr data-v-ff787445><td data-v-ff787445>close</td><td data-v-ff787445>关闭时的回调</td><td data-v-ff787445>(e: Event) =&gt; void</td></tr><tr data-v-ff787445><td data-v-ff787445>dynamicClose</td><td data-v-ff787445>启用标签动态添加和删除时关闭的回调</td><td data-v-ff787445>(tag: Tag, index: number) =&gt; void</td></tr></tbody></table></div>`);
    };
  }
});
const tag_md_vue_type_style_index_0_scoped_ff787445_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/components/tag.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tag = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ff787445"]]);
export {
  __pageData,
  tag as default
};
