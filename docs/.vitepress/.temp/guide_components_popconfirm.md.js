import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
const __pageData = JSON.parse('{"title":"弹出确认 Popconfirm","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/popconfirm.md","filePath":"guide/components/popconfirm.md"}');
const __default__ = { name: "guide/components/popconfirm.md" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    const message = ref();
    const confirm = (e) => {
      console.log(e);
      message.value.success("Click on Yes");
    };
    const cancel = (e) => {
      console.log(e);
      message.value.error("Click on No");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Popconfirm = resolveComponent("Popconfirm", true);
      const _component_Button = resolveComponent("Button");
      const _component_Message = resolveComponent("Message");
      const _component_Space = resolveComponent("Space");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-0625257b><h1 id="弹出确认-popconfirm" tabindex="-1" data-v-0625257b>弹出确认 Popconfirm <a class="header-anchor" href="#弹出确认-popconfirm" aria-label="Permalink to &quot;弹出确认 Popconfirm&quot;" data-v-0625257b>​</a></h1><br data-v-0625257b><p data-v-0625257b><em data-v-0625257b>点击元素，弹出气泡式的确认框</em></p><h2 id="何时使用" tabindex="-1" data-v-0625257b>何时使用 <a class="header-anchor" href="#何时使用" aria-label="Permalink to &quot;何时使用&quot;" data-v-0625257b>​</a></h2><ul data-v-0625257b><li data-v-0625257b>目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户</li></ul><h2 id="基本使用" tabindex="-1" data-v-0625257b>基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;" data-v-0625257b>​</a></h2>`);
      _push(ssrRenderComponent(_component_Popconfirm, {
        title: "Are you sure delete this task?",
        onOk: confirm,
        onCancel: cancel
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, { type: "danger" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Delete`);
                } else {
                  return [
                    createTextVNode("Delete")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, { type: "danger" }, {
                default: withCtx(() => [
                  createTextVNode("Delete")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Message, {
        ref_key: "message",
        ref: message
      }, null, _parent));
      _push(`<details class="details custom-block" data-v-0625257b><summary data-v-0625257b>Show Code</summary><div class="language-vue" data-v-0625257b><button title="Copy Code" class="copy" data-v-0625257b></button><span class="lang" data-v-0625257b>vue</span><pre class="shiki material-theme-palenight" data-v-0625257b><code data-v-0625257b><span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>script</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>setup</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>lang</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>ts</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}" data-v-0625257b>import</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>{</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>ref</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>}</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}" data-v-0625257b>from</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>vue</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&#39;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>const</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> message </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-0625257b>ref</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>()</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>const</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> confirm </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>(</span><span style="${ssrRenderStyle({ "color": "#BABED8", "font-style": "italic" })}" data-v-0625257b>e</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-0625257b>MouseEvent</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>)</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>=&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>{</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>  </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>console</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>.</span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-0625257b>log</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>(</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>e</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>)</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>  </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>message</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>.</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>value</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>.</span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-0625257b>success</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>(</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>Click on Yes</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&#39;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>)</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>}</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>const</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> cancel </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>(</span><span style="${ssrRenderStyle({ "color": "#BABED8", "font-style": "italic" })}" data-v-0625257b>e</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-0625257b>MouseEvent</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>)</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>=&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>{</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>  </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>console</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>.</span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-0625257b>log</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>(</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>e</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>)</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>  </span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>message</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>.</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>value</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>.</span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}" data-v-0625257b>error</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>(</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>Click on No</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&#39;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>)</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>}</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>script</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Popconfirm</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>title</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>Are you sure delete this task?</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>@ok</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>confirm</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>@cancel</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>cancel</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>type</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>danger</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>Delete</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Popconfirm</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Message</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>ref</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>message</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b> /&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span></code></pre></div></details><h2 id="自定义按钮文字" tabindex="-1" data-v-0625257b>自定义按钮文字 <a class="header-anchor" href="#自定义按钮文字" aria-label="Permalink to &quot;自定义按钮文字&quot;" data-v-0625257b>​</a></h2>`);
      _push(ssrRenderComponent(_component_Popconfirm, {
        title: "Are you sure？",
        "ok-text": "Yes",
        "cancel-text": "No"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, { type: "danger" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Delete`);
                } else {
                  return [
                    createTextVNode("Delete")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, { type: "danger" }, {
                default: withCtx(() => [
                  createTextVNode("Delete")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-0625257b><summary data-v-0625257b>Show Code</summary><div class="language-vue" data-v-0625257b><button title="Copy Code" class="copy" data-v-0625257b></button><span class="lang" data-v-0625257b>vue</span><pre class="shiki material-theme-palenight" data-v-0625257b><code data-v-0625257b><span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Popconfirm</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>title</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>Are you sure？</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>ok-text</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>Yes</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>cancel-text</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>No</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>type</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>danger</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>Delete</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Popconfirm</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span></code></pre></div></details><h2 id="预置四种-icon-图标" tabindex="-1" data-v-0625257b>预置四种 Icon 图标 <a class="header-anchor" href="#预置四种-icon-图标" aria-label="Permalink to &quot;预置四种 Icon 图标&quot;" data-v-0625257b>​</a></h2>`);
      _push(ssrRenderComponent(_component_Space, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Popconfirm, { title: "Are you sure delete this task?" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, { type: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Warning`);
                      } else {
                        return [
                          createTextVNode("Warning")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("Warning")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Popconfirm, {
              title: "Are you sure delete this task?",
              "icon-type": "info"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, { type: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Info`);
                      } else {
                        return [
                          createTextVNode("Info")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("Info")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Popconfirm, {
              title: "Are you sure delete this task?",
              "icon-type": "success"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, { type: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Success`);
                      } else {
                        return [
                          createTextVNode("Success")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("Success")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Popconfirm, {
              title: "Are you sure delete this task?",
              "icon-type": "error"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, { type: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Error`);
                      } else {
                        return [
                          createTextVNode("Error")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("Error")
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
              createVNode(_component_Popconfirm, { title: "Are you sure delete this task?" }, {
                default: withCtx(() => [
                  createVNode(_component_Button, { type: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode("Warning")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Popconfirm, {
                title: "Are you sure delete this task?",
                "icon-type": "info"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Button, { type: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode("Info")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Popconfirm, {
                title: "Are you sure delete this task?",
                "icon-type": "success"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Button, { type: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode("Success")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Popconfirm, {
                title: "Are you sure delete this task?",
                "icon-type": "error"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Button, { type: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode("Error")
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
      _push(`<details class="details custom-block" data-v-0625257b><summary data-v-0625257b>Show Code</summary><div class="language-vue" data-v-0625257b><button title="Copy Code" class="copy" data-v-0625257b></button><span class="lang" data-v-0625257b>vue</span><pre class="shiki material-theme-palenight" data-v-0625257b><code data-v-0625257b><span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Popconfirm</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>title</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>Are you sure delete this task?</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>type</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>primary</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>Warning</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Popconfirm</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Popconfirm</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>title</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>Are you sure delete this task?</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>icon-type</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>info</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>type</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>primary</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>Info</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Popconfirm</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Popconfirm</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>title</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>Are you sure delete this task?</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>icon-type</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>success</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>type</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>primary</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>Success</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Popconfirm</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Popconfirm</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>title</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>Are you sure delete this task?</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>icon-type</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>error</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>type</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>primary</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>Error</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Popconfirm</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Space</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span></code></pre></div></details><h2 id="自定义-icon-图标" tabindex="-1" data-v-0625257b>自定义 Icon 图标 <a class="header-anchor" href="#自定义-icon-图标" aria-label="Permalink to &quot;自定义 Icon 图标&quot;" data-v-0625257b>​</a></h2>`);
      _push(ssrRenderComponent(_component_Popconfirm, { title: "Are you sure？" }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg focusable="false" class="u-svg" data-icon="question-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896" data-v-0625257b${_scopeId}><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" data-v-0625257b${_scopeId}></path><path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z" data-v-0625257b${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                focusable: "false",
                class: "u-svg",
                "data-icon": "question-circle",
                width: "1em",
                height: "1em",
                fill: "currentColor",
                "aria-hidden": "true",
                viewBox: "64 64 896 896"
              }, [
                createVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }),
                createVNode("path", { d: "M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z" })
              ]))
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, { type: "danger" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Delete`);
                } else {
                  return [
                    createTextVNode("Delete")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, { type: "danger" }, {
                default: withCtx(() => [
                  createTextVNode("Delete")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-0625257b><summary data-v-0625257b>Show Code</summary><div class="language-vue" data-v-0625257b><button title="Copy Code" class="copy" data-v-0625257b></button><span class="lang" data-v-0625257b>vue</span><pre class="shiki material-theme-palenight" data-v-0625257b><code data-v-0625257b><span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Popconfirm</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>title</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>Are you sure？</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>template</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>#</span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>icon</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>      </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>svg</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>focusable</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>false</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>class</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>u-svg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>data-icon</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>question-circle</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>width</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>1em</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>height</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>1em</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>fill</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>currentColor</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>aria-hidden</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>true</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>viewBox</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>64 64 896 896</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>path</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>d</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>path</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>path</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>d</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>path</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>svg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>type</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>danger</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>Delete</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Popconfirm</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>style</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>lang</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>less</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>scoped</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>.</span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}" data-v-0625257b>u-svg</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>{</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}" data-v-0625257b>fill</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>:</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b> #ff4d4f</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>}</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>style</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span></code></pre></div></details><h2 id="隐藏取消按钮" tabindex="-1" data-v-0625257b>隐藏取消按钮 <a class="header-anchor" href="#隐藏取消按钮" aria-label="Permalink to &quot;隐藏取消按钮&quot;" data-v-0625257b>​</a></h2>`);
      _push(ssrRenderComponent(_component_Popconfirm, {
        title: "friendly reminder ...",
        "show-cancel": false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, { type: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Hidden Cancel Btn`);
                } else {
                  return [
                    createTextVNode("Hidden Cancel Btn")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, { type: "primary" }, {
                default: withCtx(() => [
                  createTextVNode("Hidden Cancel Btn")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-0625257b><summary data-v-0625257b>Show Code</summary><div class="language-vue" data-v-0625257b><button title="Copy Code" class="copy" data-v-0625257b></button><span class="lang" data-v-0625257b>vue</span><pre class="shiki material-theme-palenight" data-v-0625257b><code data-v-0625257b><span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Popconfirm</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>title</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>friendly reminder ...</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>    </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>:show-cancel</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>false</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}" data-v-0625257b>type</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}" data-v-0625257b>primary</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>Hidden Cancel Btn</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#BABED8" })}" data-v-0625257b>  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>Popconfirm</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span>
<span class="line" data-v-0625257b><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}" data-v-0625257b>template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}" data-v-0625257b>&gt;</span></span></code></pre></div></details><h2 id="apis" tabindex="-1" data-v-0625257b>APIs <a class="header-anchor" href="#apis" aria-label="Permalink to &quot;APIs&quot;" data-v-0625257b>​</a></h2><table data-v-0625257b><thead data-v-0625257b><tr data-v-0625257b><th data-v-0625257b>参数</th><th data-v-0625257b>说明</th><th data-v-0625257b>类型</th><th data-v-0625257b>默认值</th><th data-v-0625257b>必传</th></tr></thead><tbody data-v-0625257b><tr data-v-0625257b><td data-v-0625257b>title</td><td data-v-0625257b>确认框的标题</td><td data-v-0625257b>string | slot</td><td data-v-0625257b>&#39;&#39;</td><td data-v-0625257b>false</td></tr><tr data-v-0625257b><td data-v-0625257b>description</td><td data-v-0625257b>确认框的内容描述</td><td data-v-0625257b>string | slot</td><td data-v-0625257b>&#39;&#39;</td><td data-v-0625257b>false</td></tr><tr data-v-0625257b><td data-v-0625257b>content</td><td data-v-0625257b>展示的文本</td><td data-v-0625257b>string | slot</td><td data-v-0625257b>&#39;&#39;</td><td data-v-0625257b>false</td></tr><tr data-v-0625257b><td data-v-0625257b>icon</td><td data-v-0625257b>自定义弹出确认框 <code data-v-0625257b>Icon</code> 图标</td><td data-v-0625257b>string | slot</td><td data-v-0625257b>&#39;&#39;</td><td data-v-0625257b>false</td></tr><tr data-v-0625257b><td data-v-0625257b>iconType</td><td data-v-0625257b>弹出确认框 <code data-v-0625257b>Icon</code> 图标类型</td><td data-v-0625257b>&#39;success&#39; | &#39;info&#39; | &#39;warning&#39; | &#39;error&#39;</td><td data-v-0625257b>&#39;warning&#39;</td><td data-v-0625257b>false</td></tr><tr data-v-0625257b><td data-v-0625257b>maxWidth</td><td data-v-0625257b>弹出确认框内容最大宽度</td><td data-v-0625257b>string | number</td><td data-v-0625257b>&#39;auto&#39;</td><td data-v-0625257b>false</td></tr><tr data-v-0625257b><td data-v-0625257b>cancelText</td><td data-v-0625257b>取消按钮文字</td><td data-v-0625257b>string | slot</td><td data-v-0625257b>&#39;取消&#39;</td><td data-v-0625257b>false</td></tr><tr data-v-0625257b><td data-v-0625257b>cancelType</td><td data-v-0625257b>取消按钮类型</td><td data-v-0625257b>string</td><td data-v-0625257b>&#39;default&#39;</td><td data-v-0625257b>false</td></tr><tr data-v-0625257b><td data-v-0625257b>okText</td><td data-v-0625257b>确认按钮文字</td><td data-v-0625257b>string | slot</td><td data-v-0625257b>&#39;确定&#39;</td><td data-v-0625257b>false</td></tr><tr data-v-0625257b><td data-v-0625257b>okType</td><td data-v-0625257b>确认按钮类型</td><td data-v-0625257b>string</td><td data-v-0625257b>&#39;primary&#39;</td><td data-v-0625257b>false</td></tr><tr data-v-0625257b><td data-v-0625257b>showCancel</td><td data-v-0625257b>是否显示取消按钮</td><td data-v-0625257b>boolean</td><td data-v-0625257b>true</td><td data-v-0625257b>false</td></tr></tbody></table><h2 id="events" tabindex="-1" data-v-0625257b>Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;" data-v-0625257b>​</a></h2><table data-v-0625257b><thead data-v-0625257b><tr data-v-0625257b><th data-v-0625257b>事件名称</th><th data-v-0625257b>说明</th><th data-v-0625257b>参数</th></tr></thead><tbody data-v-0625257b><tr data-v-0625257b><td data-v-0625257b>cancel</td><td data-v-0625257b>点击取消的回调</td><td data-v-0625257b>(e: Event) =&gt; void</td></tr><tr data-v-0625257b><td data-v-0625257b>ok</td><td data-v-0625257b>点击确认的回调</td><td data-v-0625257b>(e: Event) =&gt; void</td></tr><tr data-v-0625257b><td data-v-0625257b>openChange</td><td data-v-0625257b>显示隐藏的回调</td><td data-v-0625257b>(visible: boolean) =&gt; void</td></tr></tbody></table></div>`);
    };
  }
});
const popconfirm_md_vue_type_style_index_0_scoped_0625257b_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/components/popconfirm.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const popconfirm = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0625257b"]]);
export {
  __pageData,
  popconfirm as default
};
