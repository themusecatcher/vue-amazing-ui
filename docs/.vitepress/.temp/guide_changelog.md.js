import { resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"更新日志","description":"","frontmatter":{},"headers":[],"relativePath":"guide/changelog.md","filePath":"guide/changelog.md","lastUpdated":1733552059000}');
const _sfc_main = { name: "guide/changelog.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_GlobalElement = resolveComponent("GlobalElement");
  const _component_Tag = resolveComponent("Tag");
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-5940241b><h1 id="更新日志" tabindex="-1" data-v-5940241b>更新日志 <a class="header-anchor" href="#更新日志" aria-label="Permalink to &quot;更新日志&quot;" data-v-5940241b>​</a></h1>`);
  _push(ssrRenderComponent(_component_GlobalElement, null, null, _parent));
  _push(`<h2 id="_1-10-4-soon" tabindex="-1" data-v-5940241b>1.10.4 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`soon`);
      } else {
        return [
          createTextVNode("soon")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-10-4-soon" aria-label="Permalink to &quot;1.10.4 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;soon&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>重构 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/checkbox.html" target="_blank" rel="noreferrer" data-v-5940241b>复选框 Checkbox</a> 组件，删除 <code data-v-5940241b>width</code> <code data-v-5940241b>height</code> 属性；新增选中动画效果</li><li data-v-5940241b>重构 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/radio.html" target="_blank" rel="noreferrer" data-v-5940241b>单选框 Radio</a> 组件，删除 <code data-v-5940241b>width</code> <code data-v-5940241b>height</code> 属性；新增选中动画效果</li></ul><h2 id="_1-10-3-soon" tabindex="-1" data-v-5940241b>1.10.3 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`soon`);
      } else {
        return [
          createTextVNode("soon")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-10-3-soon" aria-label="Permalink to &quot;1.10.3 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;soon&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/table.html" target="_blank" rel="noreferrer" data-v-5940241b>表格 Table</a> 组件，新增 <code data-v-5940241b>sticky</code> 属性，支持：对于长表格设置跟随页面固定表头和水平滚动条，方便查看表头和使用滚动条</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/textscroll.html" target="_blank" rel="noreferrer" data-v-5940241b>文字滚动 TextScroll</a> 组件，将 <code data-v-5940241b>scrollText</code> 属性重命名为 <code data-v-5940241b>items</code>；删除 <code data-v-5940241b>interval</code> <code data-v-5940241b>step</code> 属性，新增 <code data-v-5940241b>speed</code> 属性；用于更方便的控制水平滚动动画速度；重构水平滚动动画效果；新增 <code data-v-5940241b>pauseOnMouseEnter</code> 属性，支持控制鼠标移入时是否暂停滚动</li><li data-v-5940241b>组件库项目代码优化</li></ul><h2 id="_1-10-2-2024-12-05" tabindex="-1" data-v-5940241b>1.10.2 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-12-05`);
      } else {
        return [
          createTextVNode("2024-12-05")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-10-2-2024-12-05" aria-label="Permalink to &quot;1.10.2 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-12-05&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/video.html" target="_blank" rel="noreferrer" data-v-5940241b>播放器 Video</a> 组件，新增 <code data-v-5940241b>iconSize</code> 属性；重命名 <code data-v-5940241b>showPlay</code> 属性为 <code data-v-5940241b>playIcon</code>；新增 <code data-v-5940241b>play</code> <code data-v-5940241b>pause</code> 方法；支持：设置播放暂停图标的尺寸；使用 <code data-v-5940241b>Methods</code> 控制播放暂停</li></ul><h2 id="_1-10-1-2024-12-04" tabindex="-1" data-v-5940241b>1.10.1 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-12-04`);
      } else {
        return [
          createTextVNode("2024-12-04")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-10-1-2024-12-04" aria-label="Permalink to &quot;1.10.1 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-12-04&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化类型声明文件导出</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-10-0-2024-12-03" tabindex="-1" data-v-5940241b>1.10.0 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-12-03`);
      } else {
        return [
          createTextVNode("2024-12-03")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-10-0-2024-12-03" aria-label="Permalink to &quot;1.10.0 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-12-03&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>添加类型声明文件，提供所有组件相关类型定义的导出，为使用 <code data-v-5940241b>TypeScript</code> 开发提供更好的支持</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-9-12-2024-12-02" tabindex="-1" data-v-5940241b>1.9.12 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-12-02`);
      } else {
        return [
          createTextVNode("2024-12-02")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-9-12-2024-12-02" aria-label="Permalink to &quot;1.9.12 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-12-02&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/collapse.html" target="_blank" rel="noreferrer" data-v-5940241b>折叠面板 Collapse</a> 组件，将 <code data-v-5940241b>collapseData</code> 属性重命名为 <code data-v-5940241b>items</code>，新增 <code data-v-5940241b>collapseStyle</code> <code data-v-5940241b>copyText</code> <code data-v-5940241b>copiedText</code> 等属性；支持：自定义样式；自定义箭头图标；自定义复制按钮文本；单个面板自定义样式、箭头属性、复制按钮等功能</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/timeline.html" target="_blank" rel="noreferrer" data-v-5940241b>时间轴 Timeline</a> 组件，将 <code data-v-5940241b>timelineData</code> 属性重命名为 <code data-v-5940241b>items</code></li></ul><h2 id="_1-9-11-2024-11-28" tabindex="-1" data-v-5940241b>1.9.11 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-11-28`);
      } else {
        return [
          createTextVNode("2024-11-28")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-9-11-2024-11-28" aria-label="Permalink to &quot;1.9.11 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-11-28&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>修复组件库 <code data-v-5940241b>vue-amazing-ui@1.9.10</code> 更新 <code data-v-5940241b>vite</code> 至 <code data-v-5940241b>v6</code> 后，打包时 <code data-v-5940241b>cssFileName</code> 默认值更改为 <code data-v-5940241b>package.json</code> 中的 <code data-v-5940241b>name</code> 值导致无法引入 <code data-v-5940241b>css</code> 文件的相关问题</li></ul><h2 id="_1-9-10-2024-11-28" tabindex="-1" data-v-5940241b>1.9.10 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-11-28`);
      } else {
        return [
          createTextVNode("2024-11-28")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-9-10-2024-11-28" aria-label="Permalink to &quot;1.9.10 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-11-28&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/backtop.html" target="_blank" rel="noreferrer" data-v-5940241b>回到顶部 BackTop</a> 组件，新增支持设置多种 <code data-v-5940241b>CSS</code> 变量自定义样式</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/slider.html" target="_blank" rel="noreferrer" data-v-5940241b>滑动输入条 Slider</a> 组件，新增支持设置多种 <code data-v-5940241b>CSS</code> 变量自定义样式</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-9-9-2024-11-27" tabindex="-1" data-v-5940241b>1.9.9 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-11-27`);
      } else {
        return [
          createTextVNode("2024-11-27")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-9-9-2024-11-27" aria-label="Permalink to &quot;1.9.9 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-11-27&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/table.html" target="_blank" rel="noreferrer" data-v-5940241b>表格 Table</a> 组件代码和功能</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/progress.html" target="_blank" rel="noreferrer" data-v-5940241b>进度条 Progress</a> 组件，重构组件，新增支持更多样式自定义</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-9-8-2024-11-26" tabindex="-1" data-v-5940241b>1.9.8 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-11-26`);
      } else {
        return [
          createTextVNode("2024-11-26")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-9-8-2024-11-26" aria-label="Permalink to &quot;1.9.8 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-11-26&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/scrollbar.html" target="_blank" rel="noreferrer" data-v-5940241b>滚动条 Scrollbar</a> 组件，新增 <code data-v-5940241b>yScrollable</code> 属性，用于控制是否使用垂直滚动；新增支持通过设置 <code data-v-5940241b>--scrollbar</code> 相关变量自定义滚动条样式</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/table.html" target="_blank" rel="noreferrer" data-v-5940241b>表格 Table</a> 组件，新增 <code data-v-5940241b>rowClassName</code> <code data-v-5940241b>showSorterTooltip</code> <code data-v-5940241b>sortDirections</code> <code data-v-5940241b>tooltipProps</code> 属性；表格列的配置项 <code data-v-5940241b>columns</code> 属性新增 <code data-v-5940241b>align</code> <code data-v-5940241b>className</code> <code data-v-5940241b>key</code> <code data-v-5940241b>children</code> <code data-v-5940241b>showSorterTooltip</code> <code data-v-5940241b>sortTooltipProps</code> <code data-v-5940241b>defaultSortOrder</code> <code data-v-5940241b>sortDirections</code> <code data-v-5940241b>sorter</code> 类型；新增 <code data-v-5940241b>expand</code> <code data-v-5940241b>expandedRowsChange</code> 事件；支持：设置列文本对齐方式；自定义样式；列表头分组；是否显示下一次排序的 <code data-v-5940241b>tooltip</code> 提示；自定义某列的默认排序顺序；设置支持的排序方式；表格排序控制；展开行变化回调事件；排序变化回调事件</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html" target="_blank" rel="noreferrer" data-v-5940241b>文字提示 Tooltip</a> 组件，新增 <code data-v-5940241b>contentClass</code> <code data-v-5940241b>showControl</code> 属性，支持：设置展示内容的类名；是否 <code data-v-5940241b>trigger: hover</code> 时只使用 <code data-v-5940241b>show</code> 属性控制显示隐藏</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/popconfirm.html" target="_blank" rel="noreferrer" data-v-5940241b>弹出确认 Popconfirm</a> 组件，新增 <code data-v-5940241b>keyboard</code> 属性，默认支持按键操作</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/popover.html" target="_blank" rel="noreferrer" data-v-5940241b>气泡卡片 Popover</a> 组件，新增 <code data-v-5940241b>keyboard</code> 属性，默认支持按键操作</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-9-7-2024-11-20" tabindex="-1" data-v-5940241b>1.9.7 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-11-20`);
      } else {
        return [
          createTextVNode("2024-11-20")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-9-7-2024-11-20" aria-label="Permalink to &quot;1.9.7 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-11-20&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/scrollbar.html" target="_blank" rel="noreferrer" data-v-5940241b>滚动条 Scrollbar</a> 组件，新增 <code data-v-5940241b>xPlacement</code> <code data-v-5940241b>yPlacement</code> 属性，支持设置滚动条位置；调整是否使用横向滚动属性名 <code data-v-5940241b>horizontal</code> 为 <code data-v-5940241b>xScrollable</code>；新增 <code data-v-5940241b>getScrollData</code> 方法，用于获取滚动区域相关数据；新增 <code data-v-5940241b>scrollend</code> 回调函数，同时回调函数新增 <code data-v-5940241b>direction</code> 参数，用于表示滚动方向</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/table.html" target="_blank" rel="noreferrer" data-v-5940241b>表格 Table</a> 组件，新增 <code data-v-5940241b>scrollbarProps</code> 属性，表格所有滚动均使用 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/scrollbar.html" target="_blank" rel="noreferrer" data-v-5940241b>滚动条 Scrollbar</a> 组件，并支持滚动条相关属性配置</li><li data-v-5940241b>新增 <a href="https://themusecatcher.github.io/vue-amazing-ui/utils/functions/scroll.html" target="_blank" rel="noreferrer" data-v-5940241b>滚动监测 useScroll</a> 工具函数，用于实时监测指定元素滚动位置及状态；删除 <code data-v-5940241b>useScrollDirection</code> 工具函数</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-9-6-2024-11-15" tabindex="-1" data-v-5940241b>1.9.6 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-11-15`);
      } else {
        return [
          createTextVNode("2024-11-15")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-9-6-2024-11-15" aria-label="Permalink to &quot;1.9.6 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-11-15&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/select.html" target="_blank" rel="noreferrer" data-v-5940241b>选择器 Select</a> 组件，新增 <code data-v-5940241b>size</code> 属性，支持设置选择器的尺寸大小</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/pagination.html" target="_blank" rel="noreferrer" data-v-5940241b>分页 Pagination</a> 组件，新增 <code data-v-5940241b>size</code> 属性，支持设置分页器的尺寸大小</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/table.html" target="_blank" rel="noreferrer" data-v-5940241b>表格 Table</a> 组件，新增 <code data-v-5940241b>size</code> <code data-v-5940241b>striped</code> <code data-v-5940241b>ellipsisProps</code> <code data-v-5940241b>scroll</code> <code data-v-5940241b>showExpandColumn</code> <code data-v-5940241b>expandColumnTitle</code> <code data-v-5940241b>expandColumnWidth</code> <code data-v-5940241b>expandCell</code> <code data-v-5940241b>expandedRowRender</code> <code data-v-5940241b>expandFixed</code> <code data-v-5940241b>expandedRowKeys</code> <code data-v-5940241b>expandRowByClick</code> 等属性；支持：设置三种尺寸；斑马条纹；合并单元格；可编辑单元格；可编辑行；可展开；固定列；固定表头；固定头和列等多种功能</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-9-5-2024-11-13" tabindex="-1" data-v-5940241b>1.9.5 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-11-13`);
      } else {
        return [
          createTextVNode("2024-11-13")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-9-5-2024-11-13" aria-label="Permalink to &quot;1.9.5 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-11-13&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/floatbutton.html" target="_blank" rel="noreferrer" data-v-5940241b>浮动按钮 FloatButton</a> 组件，新增 <code data-v-5940241b>zIndex</code> 属性，支持设置按钮的 <code data-v-5940241b>z-index</code> 值</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/floatbutton.html" target="_blank" rel="noreferrer" data-v-5940241b>文字滚动 TextScroll</a> 组件代码</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/ellipsis.html" target="_blank" rel="noreferrer" data-v-5940241b>文本省略 Ellipsis</a> 组件代码逻辑</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-9-4-2024-11-08" tabindex="-1" data-v-5940241b>1.9.4 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-11-08`);
      } else {
        return [
          createTextVNode("2024-11-08")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-9-4-2024-11-08" aria-label="Permalink to &quot;1.9.4 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-11-08&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/ellipsis.html" target="_blank" rel="noreferrer" data-v-5940241b>文本省略 Ellipsis</a> 组件，优化弹出提示默认最大宽度计算方式</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html" target="_blank" rel="noreferrer" data-v-5940241b>文字提示 Tooltip</a> 组件，优化自动调整弹出位置算法逻辑</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/alert.html" target="_blank" rel="noreferrer" data-v-5940241b>警告提示 Alert</a> 组件，优化关闭时的动画效果</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/badge.html" target="_blank" rel="noreferrer" data-v-5940241b>徽标 Badge</a> 组件，优化关闭时的动画效果</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/image.html" target="_blank" rel="noreferrer" data-v-5940241b>图片 Image</a> 组件，优化预览打开关闭动画效果</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/message.html" target="_blank" rel="noreferrer" data-v-5940241b>全局提示 Message</a> 组件，优化显示隐藏动画效果</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/select.html" target="_blank" rel="noreferrer" data-v-5940241b>选择器 Select</a> 组件，优化红点显示隐藏动画效果</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/table.html" target="_blank" rel="noreferrer" data-v-5940241b>表格 Table</a> 组件，重构表格组件；新增 <code data-v-5940241b>header</code> <code data-v-5940241b>footer</code> <code data-v-5940241b>bordered</code> <code data-v-5940241b>tableLayout</code> 属性；支持：使用 <code data-v-5940241b>headerCell</code> <code data-v-5940241b>bodyCell</code> 自定义个性化头部单元格和内容单元格；引入文本省略组件，支持表格头部或内容单元格文本溢出时自动显示省略号，且悬浮省略文本时，自动弹出文字提示</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-9-3-2024-11-06" tabindex="-1" data-v-5940241b>1.9.3 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-11-06`);
      } else {
        return [
          createTextVNode("2024-11-06")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-9-3-2024-11-06" aria-label="Permalink to &quot;1.9.3 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-11-06&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/upload.html" target="_blank" rel="noreferrer" data-v-5940241b>上传 Upload</a> 组件，新增 <code data-v-5940241b>draggable</code> 属性，支持控制拖拽上传功能</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html" target="_blank" rel="noreferrer" data-v-5940241b>文字提示 Tooltip</a> 组件代码和动画效果，支持异步更新内容和文字提示，自动更新文字提示框位置</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/backtop.html" target="_blank" rel="noreferrer" data-v-5940241b>回到顶部 BackTop</a> 组件，<code data-v-5940241b>icon</code> 属性新增支持 <code data-v-5940241b>VNode</code> 类型</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html" target="_blank" rel="noreferrer" data-v-5940241b>按钮 Button</a> 组件，<code data-v-5940241b>icon</code> 属性新增支持 <code data-v-5940241b>VNode</code> 类型</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-9-2-2024-11-04" tabindex="-1" data-v-5940241b>1.9.2 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-11-04`);
      } else {
        return [
          createTextVNode("2024-11-04")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-9-2-2024-11-04" aria-label="Permalink to &quot;1.9.2 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-11-04&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/dialog.html" target="_blank" rel="noreferrer" data-v-5940241b>对话框 Dialog</a> 组件，新增 <code data-v-5940241b>titleStyle</code> <code data-v-5940241b>contentStyle</code> <code data-v-5940241b>bodyClass</code> <code data-v-5940241b>bodyStyle</code> <code data-v-5940241b>maskStyle</code> <code data-v-5940241b>transformOrigin</code> <code data-v-5940241b>blockScroll</code> <code data-v-5940241b>keyboard</code> <code data-v-5940241b>maskClosable</code> 等属性；删除部分属性；支持：控制对话框动画出现位置；控制打开对话框时禁用背景滚动；控制键盘 <code data-v-5940241b>Esc</code> 关闭；控制点击蒙层关闭；设置标题、内容、<code data-v-5940241b>body</code>、蒙层样式等功能</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/modal.html" target="_blank" rel="noreferrer" data-v-5940241b>模态框 Modal</a> 组件，新增 <code data-v-5940241b>titleStyle</code> <code data-v-5940241b>contentStyle</code> <code data-v-5940241b>bodyClass</code> <code data-v-5940241b>bodyStyle</code> <code data-v-5940241b>maskStyle</code> <code data-v-5940241b>transformOrigin</code> <code data-v-5940241b>blockScroll</code> <code data-v-5940241b>keyboard</code> <code data-v-5940241b>maskClosable</code> 等属性；删除部分属性；支持：控制模态框动画出现位置；控制打开模态框时禁用背景滚动；控制键盘 <code data-v-5940241b>Esc</code> 关闭；控制点击蒙层关闭；设置标题、内容、<code data-v-5940241b>body</code>、蒙层样式等功能</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-9-1-2024-10-31" tabindex="-1" data-v-5940241b>1.9.1 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-10-31`);
      } else {
        return [
          createTextVNode("2024-10-31")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-9-1-2024-10-31" aria-label="Permalink to &quot;1.9.1 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-10-31&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/dialog.html" target="_blank" rel="noreferrer" data-v-5940241b>对话框 Dialog</a> 组件，优化显示隐藏动画效果</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/image.html" target="_blank" rel="noreferrer" data-v-5940241b>图片 Image</a> 组件，优化显示隐藏动画效果</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/message.html" target="_blank" rel="noreferrer" data-v-5940241b>全局提示 Message</a> 组件，优化显示隐藏动画效果</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/modal.html" target="_blank" rel="noreferrer" data-v-5940241b>模态框 Modal</a> 组件，优化显示隐藏动画效果</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/modal.html" target="_blank" rel="noreferrer" data-v-5940241b>按钮 Button</a> 组件，新增 <code data-v-5940241b>keyboard</code> 属性，支持控制是否支持键盘操作</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-9-0-2024-10-30" tabindex="-1" data-v-5940241b>1.9.0 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-10-30`);
      } else {
        return [
          createTextVNode("2024-10-30")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-9-0-2024-10-30" aria-label="Permalink to &quot;1.9.0 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-10-30&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html" target="_blank" rel="noreferrer" data-v-5940241b>文字提示 Tooltip</a> 组件，新增 <code data-v-5940241b>flip</code> <code data-v-5940241b>keyboard</code> <code data-v-5940241b>transitionDuration</code> 属性，支持自动调整弹出位置；按键控制；自定义过渡动画时间；使用 <code data-v-5940241b>Methods</code> 控制显示隐藏</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/popconfirm.html" target="_blank" rel="noreferrer" data-v-5940241b>弹出确认 Popconfirm</a> 组件，以 <code data-v-5940241b>Tooltip</code> 组件为基础重构，新增 <code data-v-5940241b>tooltipStyle</code> 属性，删除部分原有属性，更多属性请参考 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html#tooltip" target="_blank" rel="noreferrer" data-v-5940241b>Tooltip</a>，支持自动调整弹出位置；自定义过渡动画时间等</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/popconfirm.html" target="_blank" rel="noreferrer" data-v-5940241b>气泡卡片 Popover</a> 组件，以 <code data-v-5940241b>Tooltip</code> 组件为基础重构，新增 <code data-v-5940241b>tooltipStyle</code> 属性，删除部分原有属性，更多属性请参考 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html#tooltip" target="_blank" rel="noreferrer" data-v-5940241b>Tooltip</a>，支持自动调整弹出位置；自定义过渡动画时间等</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/ellipsis.html" target="_blank" rel="noreferrer" data-v-5940241b>文本省略 Ellipsis</a> 组件，新增 <code data-v-5940241b>tooltipMaxWidth</code> 属性，删除 <code data-v-5940241b>tooltipProps</code> 属性，更多属性请参考 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html#tooltip" target="_blank" rel="noreferrer" data-v-5940241b>Tooltip</a>，支持自动调整弹出位置；自定义过渡动画时间；延迟显示隐藏；隐藏箭头等</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-8-10-2024-10-25" tabindex="-1" data-v-5940241b>1.8.10 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-10-25`);
      } else {
        return [
          createTextVNode("2024-10-25")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-8-10-2024-10-25" aria-label="Permalink to &quot;1.8.10 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-10-25&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html" target="_blank" rel="noreferrer" data-v-5940241b>文字提示 Tooltip</a> 组件，新增 <code data-v-5940241b>tooltipClass</code> <code data-v-5940241b>placement</code> 属性，支持自定义弹出提示位置及类名</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/tabs.html" target="_blank" rel="noreferrer" data-v-5940241b>标签页 Tabs</a> 组件，修复当标签页左右切换时，页面会短暂出现滚动条的问题</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-8-9-2024-10-24" tabindex="-1" data-v-5940241b>1.8.9 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-10-24`);
      } else {
        return [
          createTextVNode("2024-10-24")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-8-9-2024-10-24" aria-label="Permalink to &quot;1.8.9 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-10-24&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/floatbutton.html" target="_blank" rel="noreferrer" data-v-5940241b>浮动按钮 FloatButton</a> 组件</li><li data-v-5940241b>组件库文档代新增赞助功能模块</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-8-8-2024-10-22" tabindex="-1" data-v-5940241b>1.8.8 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-10-22`);
      } else {
        return [
          createTextVNode("2024-10-22")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-8-8-2024-10-22" aria-label="Permalink to &quot;1.8.8 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-10-22&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/avatar.html" target="_blank" rel="noreferrer" data-v-5940241b>头像 Avatar</a> 组件，新增 <code data-v-5940241b>href</code> <code data-v-5940241b>target</code> 属性，支持链接跳转功能</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/textscroll.html" target="_blank" rel="noreferrer" data-v-5940241b>文字滚动 TextScroll</a> 组件，新增 <code data-v-5940241b>hrefHoverColor</code> 属性，支持自定义链接悬浮颜色</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-8-7-2024-10-21" tabindex="-1" data-v-5940241b>1.8.7 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-10-21`);
      } else {
        return [
          createTextVNode("2024-10-21")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-8-7-2024-10-21" aria-label="Permalink to &quot;1.8.7 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-10-21&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/upload.html" target="_blank" rel="noreferrer" data-v-5940241b>上传 Upload</a> 组件，新增 <code data-v-5940241b>drop</code> <code data-v-5940241b>preview</code> 事件回调，调整 <code data-v-5940241b>beforeUpload</code> 属性，支持返回一个 <code data-v-5940241b>Promise</code> 对象，用于控制上传</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/upload.html" target="_blank" rel="noreferrer" data-v-5940241b>加载中 Spin</a> 组件</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-8-6-2024-10-18" tabindex="-1" data-v-5940241b>1.8.6 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-10-18`);
      } else {
        return [
          createTextVNode("2024-10-18")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-8-6-2024-10-18" aria-label="Permalink to &quot;1.8.6 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-10-18&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/alert.html" target="_blank" rel="noreferrer" data-v-5940241b>警告提示 Alert</a> 组件，新增 <code data-v-5940241b>type: &#39;default&#39;</code> 类型，以及 <code data-v-5940241b>bordered</code> 属性</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/avatar.html" target="_blank" rel="noreferrer" data-v-5940241b>头像 Avatar</a> 组件，新增 <code data-v-5940241b>color</code> 属性</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/gradienttext.html" target="_blank" rel="noreferrer" data-v-5940241b>渐变文字 GradientText</a> 组件，新增 <code data-v-5940241b>weight</code> 属性</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/drawer.html" target="_blank" rel="noreferrer" data-v-5940241b>抽屉 Drawer</a> 组件，支持开启抽屉时，禁止背景滚动</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-8-5-2024-10-17" tabindex="-1" data-v-5940241b>1.8.5 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-10-17`);
      } else {
        return [
          createTextVNode("2024-10-17")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-8-5-2024-10-17" aria-label="Permalink to &quot;1.8.5 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-10-17&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/ellipsis.html" target="_blank" rel="noreferrer" data-v-5940241b>文本省略 Ellipsis</a> 组件</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-8-4-2024-10-16" tabindex="-1" data-v-5940241b>1.8.4 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-10-16`);
      } else {
        return [
          createTextVNode("2024-10-16")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-8-4-2024-10-16" aria-label="Permalink to &quot;1.8.4 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-10-16&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/rate.html" target="_blank" rel="noreferrer" data-v-5940241b>评分 Rate</a> 组件，支持键盘左/右按键操作评分</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-8-3-2024-10-15" tabindex="-1" data-v-5940241b>1.8.3 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-10-15`);
      } else {
        return [
          createTextVNode("2024-10-15")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-8-3-2024-10-15" aria-label="Permalink to &quot;1.8.3 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-10-15&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/radio.html" target="_blank" rel="noreferrer" data-v-5940241b>单选框 Radio</a> 组件，新增 <code data-v-5940241b>checked</code> <code data-v-5940241b>width</code> <code data-v-5940241b>height</code> 属性，调整 <code data-v-5940241b>gap</code> 属性相关功能</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/rate.html" target="_blank" rel="noreferrer" data-v-5940241b>评分 Rate</a> 组件，新增 <code data-v-5940241b>tooltips</code> <code data-v-5940241b>tooltipProps</code> 属性，支持设置文案提示</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-8-2-2024-10-14" tabindex="-1" data-v-5940241b>1.8.2 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-10-14`);
      } else {
        return [
          createTextVNode("2024-10-14")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-8-2-2024-10-14" aria-label="Permalink to &quot;1.8.2 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-10-14&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/checkbox.html" target="_blank" rel="noreferrer" data-v-5940241b>复选框 Checkbox</a> 组件</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-8-1-2024-10-11" tabindex="-1" data-v-5940241b>1.8.1 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-10-11`);
      } else {
        return [
          createTextVNode("2024-10-11")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-8-1-2024-10-11" aria-label="Permalink to &quot;1.8.1 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-10-11&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/select.html" target="_blank" rel="noreferrer" data-v-5940241b>选择器 Select</a> 组件，新增 <code data-v-5940241b>openChange</code> 事件</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/textscroll.html" target="_blank" rel="noreferrer" data-v-5940241b>文字滚动 TextScroll</a> 组件，新增 <code data-v-5940241b>start</code> <code data-v-5940241b>stop</code> <code data-v-5940241b>reset</code> 方法，支持手动控制开始、暂停、重置滚动</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-8-0-2024-10-10" tabindex="-1" data-v-5940241b>1.8.0 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-10-10`);
      } else {
        return [
          createTextVNode("2024-10-10")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-8-0-2024-10-10" aria-label="Permalink to &quot;1.8.0 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-10-10&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>新增 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/floatbutton.html" target="_blank" rel="noreferrer" data-v-5940241b>浮动按钮 FloatButton</a> 组件</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-7-2-2024-10-09" tabindex="-1" data-v-5940241b>1.7.2 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-10-09`);
      } else {
        return [
          createTextVNode("2024-10-09")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-7-2-2024-10-09" aria-label="Permalink to &quot;1.7.2 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-10-09&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/dialog.html" target="_blank" rel="noreferrer" data-v-5940241b>对话框 Dialog</a> 组件，将属性 <code data-v-5940241b>show</code> 重命名为 <code data-v-5940241b>open</code></li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-7-1-2024-10-01" tabindex="-1" data-v-5940241b>1.7.1 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-10-01`);
      } else {
        return [
          createTextVNode("2024-10-01")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-7-1-2024-10-01" aria-label="Permalink to &quot;1.7.1 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-10-01&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html" target="_blank" rel="noreferrer" data-v-5940241b>按钮 Button</a> 组件</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/select.html" target="_blank" rel="noreferrer" data-v-5940241b>选择框 Select</a> 组件</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-7-0-2024-09-28" tabindex="-1" data-v-5940241b>1.7.0 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-09-28`);
      } else {
        return [
          createTextVNode("2024-09-28")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-7-0-2024-09-28" aria-label="Permalink to &quot;1.7.0 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-09-28&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/tabs.html" target="_blank" rel="noreferrer" data-v-5940241b>标签页 Tabs</a> 组件，新增 <code data-v-5940241b>prefix</code> <code data-v-5940241b>suffix</code> <code data-v-5940241b>animated</code> <code data-v-5940241b>tabGutter</code> <code data-v-5940241b>tabStyle</code> <code data-v-5940241b>tabPosition</code> <code data-v-5940241b>contentStyle</code> 属性</li></ul><h2 id="_1-6-9-2024-09-26" tabindex="-1" data-v-5940241b>1.6.9 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-09-26`);
      } else {
        return [
          createTextVNode("2024-09-26")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-6-9-2024-09-26" aria-label="Permalink to &quot;1.6.9 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-09-26&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/tabs.html" target="_blank" rel="noreferrer" data-v-5940241b>标签页 Tabs</a> 组件，新增带图标的标签页功能</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-6-8-2024-09-24" tabindex="-1" data-v-5940241b>1.6.8 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-09-24`);
      } else {
        return [
          createTextVNode("2024-09-24")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-6-8-2024-09-24" aria-label="Permalink to &quot;1.6.8 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-09-24&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/badge.html" target="_blank" rel="noreferrer" data-v-5940241b>徽标 Badge</a> 组件实现</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/card.html" target="_blank" rel="noreferrer" data-v-5940241b>卡片 Card</a> 组件，新增 <code data-v-5940241b>hoverable</code> <code data-v-5940241b>skeletonProps</code> 属性，并调整卡片尺寸 <code data-v-5940241b>size</code> 功能</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/collapse.html" target="_blank" rel="noreferrer" data-v-5940241b>折叠面板 Collapse</a> 组件，新增 <code data-v-5940241b>copyProps</code> 属性</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-6-7-2024-09-18" tabindex="-1" data-v-5940241b>1.6.7 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-09-18`);
      } else {
        return [
          createTextVNode("2024-09-18")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-6-7-2024-09-18" aria-label="Permalink to &quot;1.6.7 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-09-18&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>组件库代码优化</li></ul><h2 id="_1-6-6-2024-09-13" tabindex="-1" data-v-5940241b>1.6.6 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-09-13`);
      } else {
        return [
          createTextVNode("2024-09-13")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-6-6-2024-09-13" aria-label="Permalink to &quot;1.6.6 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-09-13&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/slider.html" target="_blank" rel="noreferrer" data-v-5940241b>滑动输入条 Slider</a> 组件，新增垂直模式</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/inputnumber.html" target="_blank" rel="noreferrer" data-v-5940241b>数字输入框 InputNumber</a> 组件</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-6-5-2024-09-10" tabindex="-1" data-v-5940241b>1.6.5 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-09-10`);
      } else {
        return [
          createTextVNode("2024-09-10")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-6-5-2024-09-10" aria-label="Permalink to &quot;1.6.5 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-09-10&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/message.html" target="_blank" rel="noreferrer" data-v-5940241b>全局提示 Message</a> 组件，新增自定义图标、自定义类名、自定义样式等功能</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/modal.html" target="_blank" rel="noreferrer" data-v-5940241b>模态框 Modal</a> 组件，新增自定义图标、自定义类型、自定义样式等功能</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-6-4-2024-09-06" tabindex="-1" data-v-5940241b>1.6.4 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-09-06`);
      } else {
        return [
          createTextVNode("2024-09-06")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-6-4-2024-09-06" aria-label="Permalink to &quot;1.6.4 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-09-06&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/countdown.html" target="_blank" rel="noreferrer" data-v-5940241b>倒计时 Countdown</a> 组件，新增随时暂停和重置倒计时功能</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/notification.html" target="_blank" rel="noreferrer" data-v-5940241b>通知提醒 Notification</a> 组件，新增自定义图标、自定义类名、自定义样式等功能</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-6-3-2024-08-30" tabindex="-1" data-v-5940241b>1.6.3 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-08-30`);
      } else {
        return [
          createTextVNode("2024-08-30")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-6-3-2024-08-30" aria-label="Permalink to &quot;1.6.3 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-08-30&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/backtop.html" target="_blank" rel="noreferrer" data-v-5940241b>回到顶部 Backtop</a> 组件，新增 <code data-v-5940241b>icon</code> <code data-v-5940241b>description</code> <code data-v-5940241b>tooltip</code> <code data-v-5940241b>tooltipProps</code> <code data-v-5940241b>type</code> <code data-v-5940241b>shape</code> 属性</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html" target="_blank" rel="noreferrer" data-v-5940241b>文字提示 Tooltip</a> 组件，新增 <code data-v-5940241b>contentStyle</code> 属性</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html" target="_blank" rel="noreferrer" data-v-5940241b>按钮 Button</a> 组件，新增 <code data-v-5940241b>buttonClass</code> 属性，删除 <code data-v-5940241b>loadingColor</code> 属性</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-6-2-2024-08-29" tabindex="-1" data-v-5940241b>1.6.2 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-08-29`);
      } else {
        return [
          createTextVNode("2024-08-29")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-6-2-2024-08-29" aria-label="Permalink to &quot;1.6.2 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-08-29&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/dialog.html" target="_blank" rel="noreferrer" data-v-5940241b>对话框 Dialog</a> 组件，<code data-v-5940241b>top</code> 属性新增 <code data-v-5940241b>string</code> 类型</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/watermark.html" target="_blank" rel="noreferrer" data-v-5940241b>水印 Watermark</a> 组件，新增 <code data-v-5940241b>textStyle</code> 属性，删除 <code data-v-5940241b>color</code> <code data-v-5940241b>fontSize</code> <code data-v-5940241b>fontWeight</code> <code data-v-5940241b>fontFamily</code> <code data-v-5940241b>fontStyle</code> 属性</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/collapse.html" target="_blank" rel="noreferrer" data-v-5940241b>折叠面板 Collapse</a> 组件，新增 <code data-v-5940241b>disabled</code> <code data-v-5940241b>itemStyle</code> <code data-v-5940241b>headerStyle</code> <code data-v-5940241b>contentStyle</code> <code data-v-5940241b>arrow</code> <code data-v-5940241b>arrowStyle</code> <code data-v-5940241b>extra</code> 属性</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-6-1-2024-08-27" tabindex="-1" data-v-5940241b>1.6.1 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-08-27`);
      } else {
        return [
          createTextVNode("2024-08-27")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-6-1-2024-08-27" aria-label="Permalink to &quot;1.6.1 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-08-27&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/input.html" target="_blank" rel="noreferrer" data-v-5940241b>输入框 Input</a> 组件</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html" target="_blank" rel="noreferrer" data-v-5940241b>文字提示 Tooltip</a> 组件，新增 <code data-v-5940241b>bgColor</code> <code data-v-5940241b>tooltipStyle</code> <code data-v-5940241b>arrow</code> <code data-v-5940241b>trigger</code> <code data-v-5940241b>showDelay</code> <code data-v-5940241b>hideDelay</code> <code data-v-5940241b>show</code> 属性</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/popover.html" target="_blank" rel="noreferrer" data-v-5940241b>气泡卡片 Popover</a> 组件，新增 <code data-v-5940241b>titleStyle</code> <code data-v-5940241b>contentStyle</code> <code data-v-5940241b>bgColor</code> <code data-v-5940241b>popoverStyle</code> <code data-v-5940241b>arrow</code> <code data-v-5940241b>trigger</code> <code data-v-5940241b>showDelay</code> <code data-v-5940241b>hideDelay</code> <code data-v-5940241b>show</code> 属性</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/popconfirm.html" target="_blank" rel="noreferrer" data-v-5940241b>弹出确认 Popconfirm</a> 组件，新增 <code data-v-5940241b>titleStyle</code> <code data-v-5940241b>descriptionStyle</code> <code data-v-5940241b>bgColor</code> <code data-v-5940241b>popconfirmStyle</code> <code data-v-5940241b>iconStyle</code> <code data-v-5940241b>arrow</code> <code data-v-5940241b>trigger</code> <code data-v-5940241b>showDelay</code> <code data-v-5940241b>hideDelay</code> <code data-v-5940241b>show</code> 属性</li><li data-v-5940241b>组件库代码优化</li></ul><h2 id="_1-6-0-2024-08-23" tabindex="-1" data-v-5940241b>1.6.0 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-08-23`);
      } else {
        return [
          createTextVNode("2024-08-23")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-6-0-2024-08-23" aria-label="Permalink to &quot;1.6.0 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-08-23&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>新增 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/inputsearch.html" target="_blank" rel="noreferrer" data-v-5940241b>搜索框 InputSearch</a> 组件</li><li data-v-5940241b>组件库代码优化</li></ul><h2 id="_1-5-4-2024-08-22" tabindex="-1" data-v-5940241b>1.5.4 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-08-22`);
      } else {
        return [
          createTextVNode("2024-08-22")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-5-4-2024-08-22" aria-label="Permalink to &quot;1.5.4 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-08-22&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html" target="_blank" rel="noreferrer" data-v-5940241b>按钮 Button</a> 组件，新增 <code data-v-5940241b>shape</code> <code data-v-5940241b>icon</code> 属性</li><li data-v-5940241b>新增工具函数 <a href="https://themusecatcher.github.io/vue-amazing-ui/utils/functions/slots-exist.html" target="_blank" rel="noreferrer" data-v-5940241b>监听插槽存在 useSlotsExist</a>，用于监听 Vue 组件中插槽是否存在</li><li data-v-5940241b>组件库代码优化</li></ul><h2 id="_1-5-3-2024-08-19" tabindex="-1" data-v-5940241b>1.5.3 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-08-19`);
      } else {
        return [
          createTextVNode("2024-08-19")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-5-3-2024-08-19" aria-label="Permalink to &quot;1.5.3 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-08-19&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/breadcrumb.html" target="_blank" rel="noreferrer" data-v-5940241b>面包屑 Breadcrumb</a> 组件，新增 <code data-v-5940241b>breadcrumbClass</code> <code data-v-5940241b>breadcrumbStyle</code> <code data-v-5940241b>separatorStyle</code> 属性</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/dialog.html" target="_blank" rel="noreferrer" data-v-5940241b>对话框 Dialog</a> 组件，新增 <code data-v-5940241b>cancelProps</code> <code data-v-5940241b>okProps</code> 属性</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/spin.html" target="_blank" rel="noreferrer" data-v-5940241b>加载中 Spin</a> 组件，新增 <code data-v-5940241b>spinCircleWidth</code> <code data-v-5940241b>spinCirclePercent</code> <code data-v-5940241b>ringRailColor</code> 属性</li><li data-v-5940241b>组件库代码优化</li></ul><h2 id="_1-5-2-2024-08-16" tabindex="-1" data-v-5940241b>1.5.2 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-08-16`);
      } else {
        return [
          createTextVNode("2024-08-16")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-5-2-2024-08-16" aria-label="Permalink to &quot;1.5.2 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-08-16&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/watermark.html" target="_blank" rel="noreferrer" data-v-5940241b>水印 Watermark</a> 组件，新增浏览器暗黑模式下水印颜色自动反转</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/alert.html" target="_blank" rel="noreferrer" data-v-5940241b>警告提示 Alert</a>，新增 <code data-v-5940241b>actions</code> 属性</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/spin.html" target="_blank" rel="noreferrer" data-v-5940241b>加载中 Spin</a>，新增 <code data-v-5940241b>indicator: &#39;ring-circle&#39;</code> 加载中类型，并新增 <code data-v-5940241b>ringCirclePercent</code> <code data-v-5940241b>ringCircleColor</code> 属性，优化整体效果</li><li data-v-5940241b>组件库优化</li></ul><h2 id="_1-5-1-2024-08-15" tabindex="-1" data-v-5940241b>1.5.1 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-08-15`);
      } else {
        return [
          createTextVNode("2024-08-15")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-5-1-2024-08-15" aria-label="Permalink to &quot;1.5.1 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-08-15&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/list.html" target="_blank" rel="noreferrer" data-v-5940241b>列表 List</a> 组件</li><li data-v-5940241b>组件库代码优化</li></ul><h2 id="_1-5-0-2024-08-14" tabindex="-1" data-v-5940241b>1.5.0 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-08-14`);
      } else {
        return [
          createTextVNode("2024-08-14")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-5-0-2024-08-14" aria-label="Permalink to &quot;1.5.0 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-08-14&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>新增 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/list.html" target="_blank" rel="noreferrer" data-v-5940241b>列表 List</a> 组件</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/empty.html" target="_blank" rel="noreferrer" data-v-5940241b>空状态 Empty</a> 组件，新增 <code data-v-5940241b>footer</code> 属性</li><li data-v-5940241b>组件库代码优化</li></ul><h2 id="_1-4-7-2024-08-13" tabindex="-1" data-v-5940241b>1.4.7 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-08-13`);
      } else {
        return [
          createTextVNode("2024-08-13")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-4-7-2024-08-13" aria-label="Permalink to &quot;1.4.7 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-08-13&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/table.html" target="_blank" rel="noreferrer" data-v-5940241b>表格 Table</a> 组件，新增 <code data-v-5940241b>spinProps</code> <code data-v-5940241b>emptyProps</code> 属性</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/table.html" target="_blank" rel="noreferrer" data-v-5940241b>表格 Pagination</a> 组件，新增 <code data-v-5940241b>disabled</code> <code data-v-5940241b>pageAmount</code> 属性，更新 <code data-v-5940241b>showTotal</code> 属性</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/input.html" target="_blank" rel="noreferrer" data-v-5940241b>输入框 Input</a> 组件</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/textarea.html" target="_blank" rel="noreferrer" data-v-5940241b>文本域 Textarea</a> 组件</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-4-6-2024-08-08" tabindex="-1" data-v-5940241b>1.4.6 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-08-08`);
      } else {
        return [
          createTextVNode("2024-08-08")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-4-6-2024-08-08" aria-label="Permalink to &quot;1.4.6 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-08-08&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/textscroll.html" target="_blank" rel="noreferrer" data-v-5940241b>文字滚动 TextScroll</a> 组件，优化滚动逻辑</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/empty.html" target="_blank" rel="noreferrer" data-v-5940241b>空状态 Empty</a> 组件，新增 <code data-v-5940241b>descriptionStyle</code> 属性</li></ul><h2 id="_1-4-5-2024-08-07" tabindex="-1" data-v-5940241b>1.4.5 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-08-07`);
      } else {
        return [
          createTextVNode("2024-08-07")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-4-5-2024-08-07" aria-label="Permalink to &quot;1.4.5 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-08-07&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/countdown.html" target="_blank" rel="noreferrer" data-v-5940241b>倒计时 Countdown</a> 组件</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/flex.html" target="_blank" rel="noreferrer" data-v-5940241b>弹性布局 Flex</a> 组件</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/space.html" target="_blank" rel="noreferrer" data-v-5940241b>间距 Space</a> 组件</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/avatar.html" target="_blank" rel="noreferrer" data-v-5940241b>头像 Avatar</a> 组件</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/card.html" target="_blank" rel="noreferrer" data-v-5940241b>卡片 Card</a> 组件</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-4-4-2024-08-05" tabindex="-1" data-v-5940241b>1.4.4 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-08-05`);
      } else {
        return [
          createTextVNode("2024-08-05")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-4-4-2024-08-05" aria-label="Permalink to &quot;1.4.4 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-08-05&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>重构并优化 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/switch.html" target="_blank" rel="noreferrer" data-v-5940241b>开关 Switch</a> 组件</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/watermark.html" target="_blank" rel="noreferrer" data-v-5940241b>水印 Watermark</a> 组件</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-4-3-2024-08-02" tabindex="-1" data-v-5940241b>1.4.3 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-08-02`);
      } else {
        return [
          createTextVNode("2024-08-02")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-4-3-2024-08-02" aria-label="Permalink to &quot;1.4.3 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-08-02&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/empty.html" target="_blank" rel="noreferrer" data-v-5940241b>空状态 Empty</a> 组件</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/modal.html" target="_blank" rel="noreferrer" data-v-5940241b>模态框 Modal</a> 组件，新增 <code data-v-5940241b>cancelProps</code> <code data-v-5940241b>okType</code> <code data-v-5940241b>okProps</code> <code data-v-5940241b>noticeProps</code> 属性</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-4-2-2024-08-01" tabindex="-1" data-v-5940241b>1.4.2 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-08-01`);
      } else {
        return [
          createTextVNode("2024-08-01")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-4-2-2024-08-01" aria-label="Permalink to &quot;1.4.2 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-08-01&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/select.html" target="_blank" rel="noreferrer" data-v-5940241b>选择器 Select</a> 组件</li><li data-v-5940241b>优化 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/dialog.html" target="_blank" rel="noreferrer" data-v-5940241b>对话框 Dialog</a> 组件</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/scrollbar.html" target="_blank" rel="noreferrer" data-v-5940241b>滚动条 Scrollbar</a> 组件，新增 <code data-v-5940241b>contentClass</code> 属性</li><li data-v-5940241b>优化 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/drawer.html" target="_blank" rel="noreferrer" data-v-5940241b>抽屉 Drawer</a> 组件，新增 <code data-v-5940241b>headerClass</code> <code data-v-5940241b>scrollbarProps</code> <code data-v-5940241b>bodyClass</code> <code data-v-5940241b>footerClass</code> 属性</li></ul><h2 id="_1-4-1-2024-07-31" tabindex="-1" data-v-5940241b>1.4.1 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-07-31`);
      } else {
        return [
          createTextVNode("2024-07-31")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-4-1-2024-07-31" aria-label="Permalink to &quot;1.4.1 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-07-31&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html" target="_blank" rel="noreferrer" data-v-5940241b>按钮 Button</a> 组件</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/tag.html" target="_blank" rel="noreferrer" data-v-5940241b>标签 Tag</a> 组件，新增 <code data-v-5940241b>spaceProps</code> 属性</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/image.html" target="_blank" rel="noreferrer" data-v-5940241b>图片 Image</a> 组件，新增 <code data-v-5940241b>spaceProps</code> <code data-v-5940241b>spinProps</code> 属性，同时删除了部分属性</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/upload.html" target="_blank" rel="noreferrer" data-v-5940241b>上传 Upload</a> 组件，新增 <code data-v-5940241b>spaceProps</code> <code data-v-5940241b>spinProps</code> <code data-v-5940241b>imageProps</code> <code data-v-5940241b>messageProps</code> <code data-v-5940241b>actionMessage</code> 属性，同时删除了部分属性</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-4-0-2024-07-30" tabindex="-1" data-v-5940241b>1.4.0 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-07-30`);
      } else {
        return [
          createTextVNode("2024-07-30")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-4-0-2024-07-30" aria-label="Permalink to &quot;1.4.0 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-07-30&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>新增 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/loadingbar.html" target="_blank" rel="noreferrer" data-v-5940241b>加载条 LoadingBar</a> 组件</li></ul><h2 id="_1-3-4-2024-07-29" tabindex="-1" data-v-5940241b>1.3.4 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-07-29`);
      } else {
        return [
          createTextVNode("2024-07-29")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-3-4-2024-07-29" aria-label="Permalink to &quot;1.3.4 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-07-29&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/scrollbar.html" target="_blank" rel="noreferrer" data-v-5940241b>滚动条 Scrollbar</a> 组件，新增 <code data-v-5940241b>autoHide</code> <code data-v-5940241b>delay</code> 属性</li><li data-v-5940241b>优化并更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/select.html" target="_blank" rel="noreferrer" data-v-5940241b>选择器 Select</a> 组件，新增 <code data-v-5940241b>scrollbarProps</code> 属性</li></ul><h2 id="_1-3-3-2024-07-26" tabindex="-1" data-v-5940241b>1.3.3 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-07-26`);
      } else {
        return [
          createTextVNode("2024-07-26")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-3-3-2024-07-26" aria-label="Permalink to &quot;1.3.3 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-07-26&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/ellipsis.html" target="_blank" rel="noreferrer" data-v-5940241b>文本省略 Ellipsis</a> 组件，新增 <code data-v-5940241b>tooltipProps</code> 属性</li></ul><h2 id="_1-3-2-2024-07-26" tabindex="-1" data-v-5940241b>1.3.2 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-07-26`);
      } else {
        return [
          createTextVNode("2024-07-26")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-3-2-2024-07-26" aria-label="Permalink to &quot;1.3.2 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-07-26&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/slider.html" target="_blank" rel="noreferrer" data-v-5940241b>滑动输入条 Slider</a> 组件</li><li data-v-5940241b>优化 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/waterfall.html" target="_blank" rel="noreferrer" data-v-5940241b>瀑布流 Waterfall</a> 组件</li></ul><h2 id="_1-3-1-2024-07-25" tabindex="-1" data-v-5940241b>1.3.1 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-07-25`);
      } else {
        return [
          createTextVNode("2024-07-25")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-3-1-2024-07-25" aria-label="Permalink to &quot;1.3.1 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-07-25&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/tabs.html" target="_blank" rel="noreferrer" data-v-5940241b>标签页 Tabs</a> 组件实现</li><li data-v-5940241b>优化 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/carousel.html" target="_blank" rel="noreferrer" data-v-5940241b>轮播图 Carousel</a> 组件实现</li><li data-v-5940241b>优化更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html" target="_blank" rel="noreferrer" data-v-5940241b>按钮 Button</a> 组件</li><li data-v-5940241b>优化更新 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/popconfirm.html" target="_blank" rel="noreferrer" data-v-5940241b>弹出确认 Popconfirm</a> 组件</li><li data-v-5940241b>组件库及文档代码优化</li></ul><h2 id="_1-3-0-2024-07-24" tabindex="-1" data-v-5940241b>1.3.0 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-07-24`);
      } else {
        return [
          createTextVNode("2024-07-24")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-3-0-2024-07-24" aria-label="Permalink to &quot;1.3.0 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-07-24&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>新增 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/segmented.html" target="_blank" rel="noreferrer" data-v-5940241b>分段控制器 Segmented</a> 组件</li><li data-v-5940241b>修复 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/ellipsis.html" target="_blank" rel="noreferrer" data-v-5940241b>文本省略 Ellipsis</a> 组件：当文本区域宽高变化时，<code data-v-5940241b>tooltip</code> 显示的问题</li><li data-v-5940241b>修复 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/textscroll.html" target="_blank" rel="noreferrer" data-v-5940241b>文字滚动 TextScroll</a>组件：滚动区域尺寸变化时的横向滚动问题</li></ul><h2 id="_1-2-0-2024-07-23" tabindex="-1" data-v-5940241b>1.2.0 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-07-23`);
      } else {
        return [
          createTextVNode("2024-07-23")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-2-0-2024-07-23" aria-label="Permalink to &quot;1.2.0 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-07-23&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html" target="_blank" rel="noreferrer" data-v-5940241b>按钮 Button</a> 组件，并新增相关功能</li><li data-v-5940241b>优化 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/rate.html" target="_blank" rel="noreferrer" data-v-5940241b>评分 Rate</a> 组件</li><li data-v-5940241b>修复并优化 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/ellipsis.html" target="_blank" rel="noreferrer" data-v-5940241b>文本省略 Ellipsis</a> 组件</li></ul><h2 id="_1-1-2-2024-07-22" tabindex="-1" data-v-5940241b>1.1.2 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-07-22`);
      } else {
        return [
          createTextVNode("2024-07-22")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-1-2-2024-07-22" aria-label="Permalink to &quot;1.1.2 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-07-22&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>新增 <a href="https://themusecatcher.github.io/vue-amazing-ui/utils/functions/resize-observer.html" target="_blank" rel="noreferrer" data-v-5940241b>监听DOM尺寸 useResizeObserver</a> 工具函数</li></ul><h2 id="_1-1-1-2024-07-19" tabindex="-1" data-v-5940241b>1.1.1 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-07-19`);
      } else {
        return [
          createTextVNode("2024-07-19")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-1-1-2024-07-19" aria-label="Permalink to &quot;1.1.1 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-07-19&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>优化 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/descriptions.html" target="_blank" rel="noreferrer" data-v-5940241b>描述列表 Descriptions</a> 组件</li></ul><h2 id="_1-1-0-2024-07-18" tabindex="-1" data-v-5940241b>1.1.0 `);
  _push(ssrRenderComponent(_component_Tag, {
    color: "volcano",
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`2024-07-18`);
      } else {
        return [
          createTextVNode("2024-07-18")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` <a class="header-anchor" href="#_1-1-0-2024-07-18" aria-label="Permalink to &quot;1.1.0 &lt;Tag color=&quot;volcano&quot; size=&quot;small&quot;&gt;2024-07-18&lt;/Tag&gt;&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>新增 <a href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/scrollbar.html" target="_blank" rel="noreferrer" data-v-5940241b>滚动条 Scrollbar</a> 组件</li><li data-v-5940241b>新增 <a href="https://themusecatcher.github.io/vue-amazing-ui/utils/functions/mutation-observer.html" target="_blank" rel="noreferrer" data-v-5940241b>DOM监听 useMutationObserver</a> 工具函数</li></ul><h2 id="future" tabindex="-1" data-v-5940241b>future <a class="header-anchor" href="#future" aria-label="Permalink to &quot;future&quot;" data-v-5940241b>​</a></h2><ul data-v-5940241b><li data-v-5940241b>新增 布局 Layout 组件</li><li data-v-5940241b>新增 菜单 Menu 组件</li><li data-v-5940241b>新增 穿梭框 Transfer 组件</li><li data-v-5940241b>新增 颜色选择器 ColorPicker 组件</li><li data-v-5940241b>新增 跑马灯 Marquee 组件</li><li data-v-5940241b>时间轴 Timeline 组件，新增水平时间轴</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/changelog.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const changelog = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-5940241b"]]);
export {
  __pageData,
  changelog as default
};
