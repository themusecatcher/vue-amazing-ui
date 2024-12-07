import { defineComponent, onMounted, resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { p as pkg } from "./package.DyG7CbfA.js";
function fetchVersion() {
  return fetch("https://api.github.com/repos/themusecatcher/vue-amazing-ui/contents/package.json?ref=master", {
    headers: {
      // See https://docs.github.com/en/rest/overview/media-types
      Accept: "application/vnd.github.v3.raw"
      // See https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api#authentication
      // Authorization: 'token ${GITHUB_TOKEN}',
    }
  }).then((res) => res.json()).then((json) => json.version ?? "").then((version) => {
    if (!version) return;
    const tagLineParagragh = document.querySelector("div.VPHero.has-image.VPHomeHero > div > div.main > p.tagline");
    const docsVersionSpan = document.createElement("samp");
    docsVersionSpan.classList.add("tag-version");
    docsVersionSpan.innerText = version;
    tagLineParagragh == null ? void 0 : tagLineParagragh.appendChild(docsVersionSpan);
  });
}
const __pageData = JSON.parse('{"title":"Vue Amazing UI","titleTemplate":"Amazing UI Components Library","description":"","frontmatter":{"layout":"home","title":"Vue Amazing UI","titleTemplate":"Amazing UI Components Library","hero":{"name":"Vue Amazing UI","text":"Amazing UI 组件库","tagline":"基于 Vue3 + TypeScript + Vite 开发","image":{"src":"/amazing-logo.svg","alt":"Vue Amazing UI"},"actions":[{"theme":"brand","text":"开始使用","link":"/guide/features"},{"theme":"alt","text":"成为赞助者 ✨","link":"https://themusecatcher.github.io/vue-amazing-ui/sponsor/charge.html"}]},"features":[{"icon":"💡","title":"最新技术","details":"基于 Vue@3.5.13、TypeScript@5.6.3、Vite@6.0.2 等最新技术栈开发"},{"icon":"🚀","title":"开箱即用","details":"目前共包含 63 个基础 UI 组件以及 16 个工具函数，持续探索更新中..."},{"icon":"😉","title":"有点意思","details":"所有组件均采用单文件组件 SFC，单独使用，也没问题！"}]},"headers":[],"relativePath":"index.md","filePath":"index.md","lastUpdated":1733216168000}');
const __default__ = { name: "index.md" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    const dependencies = pkg.dependencies;
    const devDependencies = pkg.devDependencies;
    function getVersion(target) {
      for (let name of Object.keys(dependencies)) {
        if (name === target) {
          return dependencies[name].replace("^", "");
        }
      }
      for (let name of Object.keys(devDependencies)) {
        if (name === target) {
          return devDependencies[name].replace("^", "");
        }
      }
      return "";
    }
    function fetchDesc() {
      const featureDetails = document.querySelector("div.VPFeatures.VPHomeFeatures > div.container > div.items :first-child > div.VPLink.no-icon.VPFeature .box > p.details");
      const developDesc = `基于 Vue@${getVersion("vue")}、TypeScript@${getVersion("typescript")}、Vite@${getVersion("vite")} 等最新技术栈开发`;
      featureDetails.textContent = developDesc;
    }
    onMounted(() => {
      fetchVersion();
      fetchDesc();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_GlobalElement = resolveComponent("GlobalElement");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_GlobalElement, { "hide-sponsor": "" }, null, _parent));
      _push(`</div>`);
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
