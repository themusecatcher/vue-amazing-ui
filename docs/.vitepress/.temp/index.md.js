import { defineComponent, onMounted, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
function fetchVersion() {
  return fetch("https://api.github.com/repos/themusecatcher/vue-amazing-ui/contents/package.json?ref=master", {
    headers: {
      // See https://docs.github.com/en/rest/overview/media-types
      Accept: "application/vnd.github.v3.raw"
      // See https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api#authentication
      // Authorization: 'token ${GITHUB_TOKEN}',
    }
  }).then((res) => res.json()).then((json) => json.version ?? "").then((version) => {
    if (!version)
      return;
    const tagLineParagragh = document.querySelector("div.VPHero.has-image.VPHomeHero > div > div.main > p.tagline");
    const docsVersionSpan = document.createElement("samp");
    docsVersionSpan.classList.add("tag-version");
    docsVersionSpan.innerText = version;
    tagLineParagragh == null ? void 0 : tagLineParagragh.appendChild(docsVersionSpan);
  });
}
const __pageData = JSON.parse('{"title":"Vue Amazing UI","titleTemplate":"Amazing UI Components Library","description":"","frontmatter":{"layout":"home","title":"Vue Amazing UI","titleTemplate":"Amazing UI Components Library","hero":{"name":"Vue Amazing UI","text":"Amazing UI 组件库","tagline":"基于 Vue3 + TS + Vite 开发","image":{"src":"/amazing-logo.svg","alt":"Vue Amazing UI"},"actions":[{"theme":"brand","text":"Get Started","link":"/guide/features"},{"theme":"alt","text":"View on GitHub","link":"https://github.com/themusecatcher/vue-amazing-ui"},{"theme":"alt","text":"View on NPM","link":"https://www.npmjs.com/package/vue-amazing-ui"}]},"features":[{"icon":"🛠️","title":"开发依赖","details":"组件库采用 Vue@3.3.4 + TypeScript@5.1.6 + Vite@4.4.9 + Less@4.2.0 实现"},{"icon":"⚡️","title":"border-box","details":"所有组件 CSS 样式均使用 box-sizing: border-box; 模式"},{"icon":"🚀","title":"开箱即用","details":"目前共有 51 个常用基础 UI 组件，以及 11 个常用工具函数"}]},"headers":[],"relativePath":"index.md","filePath":"index.md"}');
const __default__ = { name: "index.md" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    onMounted(() => {
      fetchVersion();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
