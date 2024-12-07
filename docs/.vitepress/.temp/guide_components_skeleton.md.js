import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"骨架屏 Skeleton","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/skeleton.md","filePath":"guide/components/skeleton.md","lastUpdated":1729670212000}');
const __default__ = { name: "guide/components/skeleton.md" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const showSkeleton = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 2e3);
    };
    const animated = ref(false);
    const block = ref(false);
    const size = ref("middle");
    const buttonShape = ref("default");
    const avatarShape = ref("circle");
    const sizeOptions = ref([
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
    const buttonShapeOptions = ref([
      {
        label: "default",
        value: "default"
      },
      {
        label: "round",
        value: "round"
      },
      {
        label: "circle",
        value: "circle"
      }
    ]);
    const avatarShapeOptions = ref([
      {
        label: "square",
        value: "square"
      },
      {
        label: "circle",
        value: "circle"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_GlobalElement = resolveComponent("GlobalElement");
      const _component_Skeleton = resolveComponent("Skeleton", true);
      const _component_Button = resolveComponent("Button");
      const _component_Flex = resolveComponent("Flex");
      const _component_Space = resolveComponent("Space");
      const _component_Switch = resolveComponent("Switch");
      const _component_Radio = resolveComponent("Radio");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-631cb138><h1 id="骨架屏-skeleton" tabindex="-1" data-v-631cb138>骨架屏 Skeleton <a class="header-anchor" href="#骨架屏-skeleton" aria-label="Permalink to &quot;骨架屏 Skeleton&quot;" data-v-631cb138>​</a></h1>`);
      _push(ssrRenderComponent(_component_GlobalElement, null, null, _parent));
      _push(`<p data-v-631cb138><em data-v-631cb138>在需要等待加载内容的位置提供一个占位图形组合</em></p><h2 id="何时使用" tabindex="-1" data-v-631cb138>何时使用 <a class="header-anchor" href="#何时使用" aria-label="Permalink to &quot;何时使用&quot;" data-v-631cb138>​</a></h2><ul data-v-631cb138><li data-v-631cb138>网络较慢，需要长时间等待加载处理的情况下</li><li data-v-631cb138>图文信息内容较多的列表/卡片中</li><li data-v-631cb138>只在第一次加载数据的时候使用</li><li data-v-631cb138>可以被 <code data-v-631cb138>Spin</code> 完全代替，但是在可用的场景下可以比 <code data-v-631cb138>Spin</code> 提供更好的视觉效果和用户体验</li></ul><h2 id="基本使用" tabindex="-1" data-v-631cb138>基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;" data-v-631cb138>​</a></h2>`);
      _push(ssrRenderComponent(_component_Skeleton, null, null, _parent));
      _push(`<details class="details custom-block" data-v-631cb138><summary data-v-631cb138>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-631cb138><button title="Copy Code" class="copy" data-v-631cb138></button><span class="lang" data-v-631cb138>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-631cb138><code data-v-631cb138><span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Skeleton</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> /&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span></code></pre></div></details><h2 id="复杂的组合" tabindex="-1" data-v-631cb138>复杂的组合 <a class="header-anchor" href="#复杂的组合" aria-label="Permalink to &quot;复杂的组合&quot;" data-v-631cb138>​</a></h2>`);
      _push(ssrRenderComponent(_component_Skeleton, {
        avatar: "",
        paragraph: { rows: 4 }
      }, null, _parent));
      _push(`<details class="details custom-block" data-v-631cb138><summary data-v-631cb138>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-631cb138><button title="Copy Code" class="copy" data-v-631cb138></button><span class="lang" data-v-631cb138>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-631cb138><code data-v-631cb138><span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Skeleton</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> avatar</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138>paragraph</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>{ rows: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-631cb138>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> /&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span></code></pre></div></details><h2 id="包含子组件" tabindex="-1" data-v-631cb138>包含子组件 <a class="header-anchor" href="#包含子组件" aria-label="Permalink to &quot;包含子组件&quot;" data-v-631cb138>​</a></h2>`);
      _push(ssrRenderComponent(_component_Button, {
        loading: loading.value,
        onClick: showSkeleton
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Show Skeleton`);
          } else {
            return [
              createTextVNode("Show Skeleton")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<br data-v-631cb138><br data-v-631cb138>`);
      _push(ssrRenderComponent(_component_Skeleton, { loading: loading.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-631cb138${_scopeId}><h4 data-v-631cb138${_scopeId}>Vue Amazing UI, a design language</h4><br data-v-631cb138${_scopeId}><p data-v-631cb138${_scopeId}> We supply a series of design principles, practical patterns and high quality design resources, to help people create their product prototypes beautifully and efficiently. </p></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("h4", null, "Vue Amazing UI, a design language"),
                createVNode("br"),
                createVNode("p", null, " We supply a series of design principles, practical patterns and high quality design resources, to help people create their product prototypes beautifully and efficiently. ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<details class="details custom-block" data-v-631cb138><summary data-v-631cb138>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-631cb138><button title="Copy Code" class="copy" data-v-631cb138></button><span class="lang" data-v-631cb138>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-631cb138><code data-v-631cb138><span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> setup</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;ts&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138>import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> { ref } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138>from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138> &#39;vue&#39;</span></span>
<span class="line" data-v-631cb138></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138>const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-631cb138> loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> ref</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-631cb138>boolean</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;(</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-631cb138>false</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>)</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138>const</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> showSkeleton</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> () </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138>=&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> {</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  loading.value </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-631cb138> true</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138>  setTimeout</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>(() </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138>=&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> {</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>    loading.value </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-631cb138> false</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  }, </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-631cb138>2000</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>)</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>}</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> @</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138>click</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>showSkeleton</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;Show Skeleton&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>br</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>/&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>br</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>/&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Skeleton</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>h4</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;Vue Amazing UI, a design language&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>h4</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>br</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>/&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>        We supply a series of design principles, practical patterns and high quality design</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>        resources, to help people create their product prototypes beautifully and efficiently.</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>p</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Skeleton</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span></code></pre></div></details><h2 id="自定义标题和段落" tabindex="-1" data-v-631cb138>自定义标题和段落 <a class="header-anchor" href="#自定义标题和段落" aria-label="Permalink to &quot;自定义标题和段落&quot;" data-v-631cb138>​</a></h2>`);
      _push(ssrRenderComponent(_component_Skeleton, {
        avatar: "",
        title: { width: "24%" },
        paragraph: { rows: 4, width: ["48%", "72%", "96%", "60%"] }
      }, null, _parent));
      _push(`<details class="details custom-block" data-v-631cb138><summary data-v-631cb138>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-631cb138><button title="Copy Code" class="copy" data-v-631cb138></button><span class="lang" data-v-631cb138>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-631cb138><code data-v-631cb138><span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Skeleton</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> avatar</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138>title</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>{ width: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;24%&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138>paragraph</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>{ rows: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-631cb138>4</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>, width: [</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;48%&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>, </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;72%&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>, </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;96%&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>, </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;60%&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>] }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> /&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span></code></pre></div></details><h2 id="按钮-输入框-图像-头像" tabindex="-1" data-v-631cb138>按钮 / 输入框 / 图像 / 头像 <a class="header-anchor" href="#按钮-输入框-图像-头像" aria-label="Permalink to &quot;按钮 / 输入框 / 图像 / 头像&quot;" data-v-631cb138>​</a></h2>`);
      _push(ssrRenderComponent(_component_Flex, { gap: 32 }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Flex, {
              vertical: "",
              gap: 12,
              width: "50%"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Skeleton, {
                    animated: animated.value,
                    button: { shape: buttonShape.value, size: size.value, block: block.value }
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Skeleton, {
                    style: { "width": "200px" },
                    animated: animated.value,
                    input: { size: size.value }
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Skeleton, {
                    animated: animated.value,
                    image: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Skeleton, {
                    animated: animated.value,
                    avatar: { shape: avatarShape.value, size: size.value },
                    paragraph: { rows: 2 }
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Skeleton, {
                      animated: animated.value,
                      button: { shape: buttonShape.value, size: size.value, block: block.value }
                    }, null, 8, ["animated", "button"]),
                    createVNode(_component_Skeleton, {
                      style: { "width": "200px" },
                      animated: animated.value,
                      input: { size: size.value }
                    }, null, 8, ["animated", "input"]),
                    createVNode(_component_Skeleton, {
                      animated: animated.value,
                      image: ""
                    }, null, 8, ["animated"]),
                    createVNode(_component_Skeleton, {
                      animated: animated.value,
                      avatar: { shape: avatarShape.value, size: size.value },
                      paragraph: { rows: 2 }
                    }, null, 8, ["animated", "avatar"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Flex, {
              vertical: "",
              gap: "large",
              width: "50%"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Space, { gap: "large" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Space, { align: "center" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` animated: `);
                              _push5(ssrRenderComponent(_component_Switch, {
                                modelValue: animated.value,
                                "onUpdate:modelValue": ($event) => animated.value = $event
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createTextVNode(" animated: "),
                                createVNode(_component_Switch, {
                                  modelValue: animated.value,
                                  "onUpdate:modelValue": ($event) => animated.value = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_Space, { align: "center" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Button Block: `);
                              _push5(ssrRenderComponent(_component_Switch, {
                                modelValue: block.value,
                                "onUpdate:modelValue": ($event) => block.value = $event
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createTextVNode(" Button Block: "),
                                createVNode(_component_Switch, {
                                  modelValue: block.value,
                                  "onUpdate:modelValue": ($event) => block.value = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Space, { align: "center" }, {
                            default: withCtx(() => [
                              createTextVNode(" animated: "),
                              createVNode(_component_Switch, {
                                modelValue: animated.value,
                                "onUpdate:modelValue": ($event) => animated.value = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Space, { align: "center" }, {
                            default: withCtx(() => [
                              createTextVNode(" Button Block: "),
                              createVNode(_component_Switch, {
                                modelValue: block.value,
                                "onUpdate:modelValue": ($event) => block.value = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Space, { align: "center" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Size: `);
                        _push4(ssrRenderComponent(_component_Radio, {
                          options: sizeOptions.value,
                          value: size.value,
                          "onUpdate:value": ($event) => size.value = $event,
                          button: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(" Size: "),
                          createVNode(_component_Radio, {
                            options: sizeOptions.value,
                            value: size.value,
                            "onUpdate:value": ($event) => size.value = $event,
                            button: ""
                          }, null, 8, ["options", "value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Space, { align: "center" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Button Shape: `);
                        _push4(ssrRenderComponent(_component_Radio, {
                          options: buttonShapeOptions.value,
                          value: buttonShape.value,
                          "onUpdate:value": ($event) => buttonShape.value = $event,
                          button: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(" Button Shape: "),
                          createVNode(_component_Radio, {
                            options: buttonShapeOptions.value,
                            value: buttonShape.value,
                            "onUpdate:value": ($event) => buttonShape.value = $event,
                            button: ""
                          }, null, 8, ["options", "value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Space, { align: "center" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Avatar Shape: `);
                        _push4(ssrRenderComponent(_component_Radio, {
                          options: avatarShapeOptions.value,
                          value: avatarShape.value,
                          "onUpdate:value": ($event) => avatarShape.value = $event,
                          button: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(" Avatar Shape: "),
                          createVNode(_component_Radio, {
                            options: avatarShapeOptions.value,
                            value: avatarShape.value,
                            "onUpdate:value": ($event) => avatarShape.value = $event,
                            button: ""
                          }, null, 8, ["options", "value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Space, { gap: "large" }, {
                      default: withCtx(() => [
                        createVNode(_component_Space, { align: "center" }, {
                          default: withCtx(() => [
                            createTextVNode(" animated: "),
                            createVNode(_component_Switch, {
                              modelValue: animated.value,
                              "onUpdate:modelValue": ($event) => animated.value = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Space, { align: "center" }, {
                          default: withCtx(() => [
                            createTextVNode(" Button Block: "),
                            createVNode(_component_Switch, {
                              modelValue: block.value,
                              "onUpdate:modelValue": ($event) => block.value = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Space, { align: "center" }, {
                      default: withCtx(() => [
                        createTextVNode(" Size: "),
                        createVNode(_component_Radio, {
                          options: sizeOptions.value,
                          value: size.value,
                          "onUpdate:value": ($event) => size.value = $event,
                          button: ""
                        }, null, 8, ["options", "value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Space, { align: "center" }, {
                      default: withCtx(() => [
                        createTextVNode(" Button Shape: "),
                        createVNode(_component_Radio, {
                          options: buttonShapeOptions.value,
                          value: buttonShape.value,
                          "onUpdate:value": ($event) => buttonShape.value = $event,
                          button: ""
                        }, null, 8, ["options", "value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Space, { align: "center" }, {
                      default: withCtx(() => [
                        createTextVNode(" Avatar Shape: "),
                        createVNode(_component_Radio, {
                          options: avatarShapeOptions.value,
                          value: avatarShape.value,
                          "onUpdate:value": ($event) => avatarShape.value = $event,
                          button: ""
                        }, null, 8, ["options", "value", "onUpdate:value"])
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
              createVNode(_component_Flex, {
                vertical: "",
                gap: 12,
                width: "50%"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Skeleton, {
                    animated: animated.value,
                    button: { shape: buttonShape.value, size: size.value, block: block.value }
                  }, null, 8, ["animated", "button"]),
                  createVNode(_component_Skeleton, {
                    style: { "width": "200px" },
                    animated: animated.value,
                    input: { size: size.value }
                  }, null, 8, ["animated", "input"]),
                  createVNode(_component_Skeleton, {
                    animated: animated.value,
                    image: ""
                  }, null, 8, ["animated"]),
                  createVNode(_component_Skeleton, {
                    animated: animated.value,
                    avatar: { shape: avatarShape.value, size: size.value },
                    paragraph: { rows: 2 }
                  }, null, 8, ["animated", "avatar"])
                ]),
                _: 1
              }),
              createVNode(_component_Flex, {
                vertical: "",
                gap: "large",
                width: "50%"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Space, { gap: "large" }, {
                    default: withCtx(() => [
                      createVNode(_component_Space, { align: "center" }, {
                        default: withCtx(() => [
                          createTextVNode(" animated: "),
                          createVNode(_component_Switch, {
                            modelValue: animated.value,
                            "onUpdate:modelValue": ($event) => animated.value = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Space, { align: "center" }, {
                        default: withCtx(() => [
                          createTextVNode(" Button Block: "),
                          createVNode(_component_Switch, {
                            modelValue: block.value,
                            "onUpdate:modelValue": ($event) => block.value = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Space, { align: "center" }, {
                    default: withCtx(() => [
                      createTextVNode(" Size: "),
                      createVNode(_component_Radio, {
                        options: sizeOptions.value,
                        value: size.value,
                        "onUpdate:value": ($event) => size.value = $event,
                        button: ""
                      }, null, 8, ["options", "value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Space, { align: "center" }, {
                    default: withCtx(() => [
                      createTextVNode(" Button Shape: "),
                      createVNode(_component_Radio, {
                        options: buttonShapeOptions.value,
                        value: buttonShape.value,
                        "onUpdate:value": ($event) => buttonShape.value = $event,
                        button: ""
                      }, null, 8, ["options", "value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Space, { align: "center" }, {
                    default: withCtx(() => [
                      createTextVNode(" Avatar Shape: "),
                      createVNode(_component_Radio, {
                        options: avatarShapeOptions.value,
                        value: avatarShape.value,
                        "onUpdate:value": ($event) => avatarShape.value = $event,
                        button: ""
                      }, null, 8, ["options", "value", "onUpdate:value"])
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
      _push(`<details class="details custom-block" data-v-631cb138><summary data-v-631cb138>Show Code</summary><div class="language-vue vp-adaptive-theme" data-v-631cb138><button title="Copy Code" class="copy" data-v-631cb138></button><span class="lang" data-v-631cb138>vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" data-v-631cb138><code data-v-631cb138><span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> setup</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;ts&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138>import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> { ref } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138>from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138> &#39;vue&#39;</span></span>
<span class="line" data-v-631cb138></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138>const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-631cb138> animated</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> ref</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>(</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-631cb138>false</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>)</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138>const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-631cb138> block</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> ref</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>(</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-631cb138>false</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>)</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138>const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-631cb138> size</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> ref</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;middle&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>)</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138>const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-631cb138> buttonShape</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> ref</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;default&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>)</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138>const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-631cb138> avatarShape</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> ref</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;circle&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>)</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138>const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-631cb138> sizeOptions</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> ref</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>([</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  {</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>    label: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;small&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>,</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>    value: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;small&#39;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  },</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  {</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>    label: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;middle&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>,</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>    value: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;middle&#39;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  },</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  {</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>    label: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;large&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>,</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>    value: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;large&#39;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  }</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>])</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138>const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-631cb138> buttonShapeOptions</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> ref</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>([</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  {</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>    label: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;default&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>,</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>    value: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;default&#39;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  },</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  {</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>    label: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;round&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>,</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>    value: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;round&#39;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  },</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  {</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>    label: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;circle&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>,</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>    value: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;circle&#39;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  }</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>])</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138>const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-631cb138> avatarShapeOptions</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> ref</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>([</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  {</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>    label: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;square&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>,</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>    value: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;square&#39;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  },</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  {</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>    label: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;circle&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>,</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>    value: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&#39;circle&#39;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  }</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>])</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>script</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138>gap</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-631cb138>32</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> vertical</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138>gap</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-631cb138>12</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> width</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;50%&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Skeleton</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138>animated</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>animated</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138>button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>{ shape: buttonShape, size: size, block: block }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> /&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Skeleton</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> style</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-631cb138>width</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-631cb138>200</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}" data-v-631cb138>px</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138>animated</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>animated</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138>input</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>{ size: size }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> /&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Skeleton</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138>animated</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>animated</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> image</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> /&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Skeleton</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138>animated</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>animated</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138>avatar</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>{ shape: avatarShape, size: size }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138>paragraph</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>{ rows: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}" data-v-631cb138>2</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> }</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> /&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>    &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> vertical</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> gap</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> width</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;50%&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> gap</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;large&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#B31D28", "--shiki-light-font-style": "italic", "--shiki-dark": "#FDAEB7", "--shiki-dark-font-style": "italic" })}" data-v-631cb138> align</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;center&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>          animated:</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Switch</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> v-model</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>animated</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> /&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#B31D28", "--shiki-light-font-style": "italic", "--shiki-dark": "#FDAEB7", "--shiki-dark-font-style": "italic" })}" data-v-631cb138> align</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;center&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>          Button Block:</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>          &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Switch</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> v-model</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>block</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> /&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>        &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#B31D28", "--shiki-light-font-style": "italic", "--shiki-dark": "#FDAEB7", "--shiki-dark-font-style": "italic" })}" data-v-631cb138> align</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;center&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>        Size:</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Radio</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138>options</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>sizeOptions</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> v-model</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138>value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>size</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> /&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#B31D28", "--shiki-light-font-style": "italic", "--shiki-dark": "#FDAEB7", "--shiki-dark-font-style": "italic" })}" data-v-631cb138> align</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;center&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>        Button Shape:</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Radio</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138>options</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>buttonShapeOptions</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> v-model</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138>value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>buttonShape</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> /&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>      &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#B31D28", "--shiki-light-font-style": "italic", "--shiki-dark": "#FDAEB7", "--shiki-dark-font-style": "italic" })}" data-v-631cb138> align</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;center&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>        Avatar Shape:</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>        &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Radio</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138>options</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>avatarShapeOptions</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> v-model</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138>value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>avatarShape</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}" data-v-631cb138>&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}" data-v-631cb138> button</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138> /&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>      &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Space</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>    &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>  &lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>Flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span>
<span class="line" data-v-631cb138><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}" data-v-631cb138>template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}" data-v-631cb138>&gt;</span></span></code></pre></div></details><h2 id="apis" tabindex="-1" data-v-631cb138>APIs <a class="header-anchor" href="#apis" aria-label="Permalink to &quot;APIs&quot;" data-v-631cb138>​</a></h2><h3 id="skeleton" tabindex="-1" data-v-631cb138>Skeleton <a class="header-anchor" href="#skeleton" aria-label="Permalink to &quot;Skeleton&quot;" data-v-631cb138>​</a></h3><table tabindex="0" data-v-631cb138><thead data-v-631cb138><tr data-v-631cb138><th data-v-631cb138>参数</th><th data-v-631cb138>说明</th><th data-v-631cb138>类型</th><th data-v-631cb138>默认值</th></tr></thead><tbody data-v-631cb138><tr data-v-631cb138><td data-v-631cb138>animated</td><td data-v-631cb138>是否展示动画效果</td><td data-v-631cb138>boolean</td><td data-v-631cb138>true</td></tr><tr data-v-631cb138><td data-v-631cb138>button</td><td data-v-631cb138>是否使用按钮占位图</td><td data-v-631cb138>boolean | <a href="#skeletonbuttonprops-type" data-v-631cb138>SkeletonButtonProps</a></td><td data-v-631cb138>false</td></tr><tr data-v-631cb138><td data-v-631cb138>avatar</td><td data-v-631cb138>是否显示头像占位图</td><td data-v-631cb138>boolean | <a href="#skeletonavatarprops-type" data-v-631cb138>SkeletonAvatarProps</a></td><td data-v-631cb138>false</td></tr><tr data-v-631cb138><td data-v-631cb138>input</td><td data-v-631cb138>是否使用输入框占位图</td><td data-v-631cb138>boolean | <a href="#skeletoninputprops-type" data-v-631cb138>SkeletonInputProps</a></td><td data-v-631cb138>false</td></tr><tr data-v-631cb138><td data-v-631cb138>image</td><td data-v-631cb138>是否使用图像占位图</td><td data-v-631cb138>boolean</td><td data-v-631cb138>false</td></tr><tr data-v-631cb138><td data-v-631cb138>title</td><td data-v-631cb138>是否显示标题占位图</td><td data-v-631cb138>boolean | <a href="#skeletontitleprops-type" data-v-631cb138>SkeletonTitleProps</a></td><td data-v-631cb138>true</td></tr><tr data-v-631cb138><td data-v-631cb138>paragraph</td><td data-v-631cb138>是否显示段落占位图</td><td data-v-631cb138>boolean | <a href="#skeletonparagraphprops-type" data-v-631cb138>SkeletonParagraphProps</a></td><td data-v-631cb138>true</td></tr><tr data-v-631cb138><td data-v-631cb138>loading</td><td data-v-631cb138>为 <code data-v-631cb138>true</code> 时，显示占位图，反之则直接展示子组件</td><td data-v-631cb138>boolean</td><td data-v-631cb138>true</td></tr></tbody></table><h3 id="skeletonbuttonprops-type" tabindex="-1" data-v-631cb138>SkeletonButtonProps Type <a class="header-anchor" href="#skeletonbuttonprops-type" aria-label="Permalink to &quot;SkeletonButtonProps Type&quot;" data-v-631cb138>​</a></h3><table tabindex="0" data-v-631cb138><thead data-v-631cb138><tr data-v-631cb138><th data-v-631cb138>名称</th><th data-v-631cb138>说明</th><th data-v-631cb138>类型</th><th data-v-631cb138>默认值</th></tr></thead><tbody data-v-631cb138><tr data-v-631cb138><td data-v-631cb138>shape?</td><td data-v-631cb138>指定按钮的形状</td><td data-v-631cb138>&#39;default&#39; | &#39;round&#39; | &#39;circle&#39;</td><td data-v-631cb138>&#39;default&#39;</td></tr><tr data-v-631cb138><td data-v-631cb138>size?</td><td data-v-631cb138>设置按钮的大小</td><td data-v-631cb138>&#39;small&#39; | &#39;middle&#39; | &#39;large&#39;</td><td data-v-631cb138>&#39;middle&#39;</td></tr><tr data-v-631cb138><td data-v-631cb138>block?</td><td data-v-631cb138>将按钮宽度调整为其父宽度的选项</td><td data-v-631cb138>boolean</td><td data-v-631cb138>false</td></tr></tbody></table><h3 id="skeletonavatarprops-type" tabindex="-1" data-v-631cb138>SkeletonAvatarProps Type <a class="header-anchor" href="#skeletonavatarprops-type" aria-label="Permalink to &quot;SkeletonAvatarProps Type&quot;" data-v-631cb138>​</a></h3><table tabindex="0" data-v-631cb138><thead data-v-631cb138><tr data-v-631cb138><th data-v-631cb138>名称</th><th data-v-631cb138>说明</th><th data-v-631cb138>类型</th><th data-v-631cb138>默认值</th></tr></thead><tbody data-v-631cb138><tr data-v-631cb138><td data-v-631cb138>shape</td><td data-v-631cb138>指定头像的形状</td><td data-v-631cb138>&#39;circle&#39; | &#39;square&#39;</td><td data-v-631cb138>&#39;circle&#39;</td></tr><tr data-v-631cb138><td data-v-631cb138>size</td><td data-v-631cb138>设置头像占位图的大小</td><td data-v-631cb138>number | &#39;small&#39; | &#39;middle&#39; | &#39;large&#39;</td><td data-v-631cb138>&#39;middle&#39;</td></tr></tbody></table><h3 id="skeletoninputprops-type" tabindex="-1" data-v-631cb138>SkeletonInputProps Type <a class="header-anchor" href="#skeletoninputprops-type" aria-label="Permalink to &quot;SkeletonInputProps Type&quot;" data-v-631cb138>​</a></h3><table tabindex="0" data-v-631cb138><thead data-v-631cb138><tr data-v-631cb138><th data-v-631cb138>名称</th><th data-v-631cb138>说明</th><th data-v-631cb138>类型</th><th data-v-631cb138>默认值</th></tr></thead><tbody data-v-631cb138><tr data-v-631cb138><td data-v-631cb138>size</td><td data-v-631cb138>设置输入框的大小</td><td data-v-631cb138>&#39;small&#39; | &#39;middle&#39; | &#39;large&#39;</td><td data-v-631cb138>&#39;middle&#39;</td></tr></tbody></table><h3 id="skeletontitleprops-type" tabindex="-1" data-v-631cb138>SkeletonTitleProps Type <a class="header-anchor" href="#skeletontitleprops-type" aria-label="Permalink to &quot;SkeletonTitleProps Type&quot;" data-v-631cb138>​</a></h3><table tabindex="0" data-v-631cb138><thead data-v-631cb138><tr data-v-631cb138><th data-v-631cb138>名称</th><th data-v-631cb138>说明</th><th data-v-631cb138>类型</th><th data-v-631cb138>默认值</th></tr></thead><tbody data-v-631cb138><tr data-v-631cb138><td data-v-631cb138>width</td><td data-v-631cb138>设置标题占位图的宽度</td><td data-v-631cb138>number | string</td><td data-v-631cb138>&#39;38%&#39;</td></tr></tbody></table><h3 id="skeletonparagraphprops-type" tabindex="-1" data-v-631cb138>SkeletonParagraphProps Type <a class="header-anchor" href="#skeletonparagraphprops-type" aria-label="Permalink to &quot;SkeletonParagraphProps Type&quot;" data-v-631cb138>​</a></h3><table tabindex="0" data-v-631cb138><thead data-v-631cb138><tr data-v-631cb138><th data-v-631cb138>名称</th><th data-v-631cb138>说明</th><th data-v-631cb138>类型</th><th data-v-631cb138>默认值</th></tr></thead><tbody data-v-631cb138><tr data-v-631cb138><td data-v-631cb138>rows</td><td data-v-631cb138>设置段落占位图的行数</td><td data-v-631cb138>number | string</td><td data-v-631cb138>avatar ? 2 : 3</td></tr><tr data-v-631cb138><td data-v-631cb138>width</td><td data-v-631cb138>设置段落占位图的宽度，若为数组时则为对应的每行宽度，反之则是最后一行的宽度</td><td data-v-631cb138>number | string | Array&lt;number|string&gt;</td><td data-v-631cb138>&#39;61%&#39;</td></tr></tbody></table></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/components/skeleton.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const skeleton = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-631cb138"]]);
export {
  __pageData,
  skeleton as default
};
