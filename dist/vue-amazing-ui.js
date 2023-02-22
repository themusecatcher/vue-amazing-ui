import { openBlock, createElementBlock, normalizeClass, createElementVNode, toDisplayString, createCommentVNode, withDirectives, vShow, Fragment, renderList, createTextVNode, vModelText, pushScopeId, popScopeId, inject, defineComponent, computed, normalizeStyle, unref } from "vue";
const _sfc_main$1 = {
  name: "Pagination",
  props: {
    current: {
      // 当前页数
      type: Number,
      default: 1
    },
    pageSize: {
      // 每页条数
      type: Number,
      default: 10
    },
    total: {
      // 数据总数
      type: Number,
      default: 0
    },
    pageListNum: {
      // 显示的页码数组长度
      type: Number,
      default: 5
    },
    hideOnSinglePage: {
      // 只有一页时是否隐藏分页器
      type: Boolean,
      default: false
    },
    showQuickJumper: {
      // 是否可以快速跳转至某页
      type: Boolean,
      default: false
    },
    showTotal: {
      // 是否显示当前页数和数据总量
      type: Boolean,
      default: false
    },
    placement: {
      // 分页器展示位置，靠左，居中，靠右
      type: String,
      default: "right"
    }
  },
  data() {
    return {
      currentPage: this.current,
      // 当前页数
      jumpNumber: "",
      // 跳转的页码
      forwardMore: false,
      // 左省略号展示
      backwardMore: false,
      // 右省略号展示
      forwardArrow: false,
      // 左箭头展示
      backwardArrow: false
      // 右箭头展示
    };
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    pageList() {
      return this.dealPageList(this.currentPage).filter((n) => n !== 1 && n !== this.totalPage);
    }
  },
  watch: {
    current(to) {
      this.currentPage = to;
    },
    currentPage(to) {
      this.loading = true;
      this.$emit("change", {
        page: to,
        pageSize: this.pageSize
      });
    }
  },
  created() {
    document.onkeydown = (e) => {
      const ev = e || window.event;
      if (ev && ev.keyCode === 13 && this.jumpNumber) {
        this.jumpPage(this.jumpNumber);
      }
    };
  },
  methods: {
    dealPageList(curPage) {
      var resList = [];
      var offset = Math.floor(this.pageListNum / 2);
      var pager = {
        start: curPage - offset,
        end: curPage + offset
      };
      if (pager.start < 1) {
        pager.end = pager.end + (1 - pager.start);
        pager.start = 1;
      }
      if (pager.end > this.totalPage) {
        pager.start = pager.start - (pager.end - this.totalPage);
        pager.end = this.totalPage;
      }
      if (pager.start < 1) {
        pager.start = 1;
      }
      if (pager.start > 1) {
        this.forwardMore = true;
      } else {
        this.forwardMore = false;
      }
      if (pager.end < this.totalPage) {
        this.backwardMore = true;
      } else {
        this.backwardMore = false;
      }
      for (let i = pager.start; i <= pager.end; i++) {
        resList.push(i);
      }
      return resList;
    },
    onForward() {
      this.currentPage = this.currentPage - this.pageListNum > 0 ? this.currentPage - this.pageListNum : 1;
    },
    onBackward() {
      this.currentPage = this.currentPage + this.pageListNum < this.totalPage ? this.currentPage + this.pageListNum : this.totalPage;
    },
    jumpPage(jumpNum) {
      if (Number(jumpNum)) {
        if (Number(jumpNum) < 1) {
          jumpNum = 1;
        }
        if (Number(jumpNum) > this.totalPage) {
          jumpNum = this.totalPage;
        }
        this.changePage(Number(jumpNum));
      }
      this.jumpNumber = "";
    },
    changePage(pageNum) {
      if (pageNum === 0 || pageNum === this.totalPage + 1) {
        return false;
      }
      if (this.currentPage !== pageNum) {
        this.currentPage = pageNum;
      }
    }
  }
};
const Pagination_vue_vue_type_style_index_0_scoped_84ba8fd3_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _withScopeId$1 = (n) => (pushScopeId("data-v-84ba8fd3"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { class: "m-pagination-wrap" };
const _hoisted_2$1 = {
  key: 0,
  class: "mr8"
};
const _hoisted_3$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-arrow",
  viewBox: "64 64 896 896",
  "data-icon": "left",
  "aria-hidden": "true",
  focusable: "false"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })
], -1));
const _hoisted_4$1 = [
  _hoisted_3$1
];
const _hoisted_5$1 = { class: "u-ellipsis" };
const _hoisted_6$1 = {
  class: "u-icon",
  viewBox: "64 64 896 896",
  "data-icon": "double-left",
  "aria-hidden": "true",
  focusable: "false"
};
const _hoisted_7 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("path", { d: "M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" }, null, -1));
const _hoisted_8 = [
  _hoisted_7
];
const _hoisted_9 = ["onClick"];
const _hoisted_10 = { class: "u-ellipsis" };
const _hoisted_11 = {
  class: "u-icon",
  viewBox: "64 64 896 896",
  "data-icon": "double-right",
  "aria-hidden": "true",
  focusable: "false"
};
const _hoisted_12 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("path", { d: "M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" }, null, -1));
const _hoisted_13 = [
  _hoisted_12
];
const _hoisted_14 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-arrow",
  viewBox: "64 64 896 896",
  "data-icon": "right",
  "aria-hidden": "true",
  focusable: "false"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" })
], -1));
const _hoisted_15 = [
  _hoisted_14
];
const _hoisted_16 = {
  key: 1,
  class: "u-jump-page"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([`m-pagination ${$props.placement}`, { hidden: $props.hideOnSinglePage && $props.total <= $props.pageSize }])
  }, [
    createElementVNode("div", _hoisted_1$1, [
      $props.showTotal ? (openBlock(), createElementBlock("span", _hoisted_2$1, "共 " + toDisplayString($options.totalPage) + " 页 / " + toDisplayString($props.total) + " 条", 1)) : createCommentVNode("", true),
      createElementVNode("span", {
        class: normalizeClass(["u-item", { disabled: $data.currentPage === 1 }]),
        onClick: _cache[0] || (_cache[0] = ($event) => $options.changePage($data.currentPage - 1))
      }, _hoisted_4$1, 2),
      createElementVNode("span", {
        class: normalizeClass(["u-item", { active: $data.currentPage === 1 }]),
        onClick: _cache[1] || (_cache[1] = ($event) => $options.changePage(1))
      }, "1", 2),
      withDirectives(createElementVNode("span", {
        class: "m-arrow",
        ref: "forward",
        onClick: _cache[2] || (_cache[2] = (...args) => $options.onForward && $options.onForward(...args)),
        onMouseenter: _cache[3] || (_cache[3] = ($event) => $data.forwardArrow = true),
        onMouseleave: _cache[4] || (_cache[4] = ($event) => $data.forwardArrow = false)
      }, [
        withDirectives(createElementVNode("span", _hoisted_5$1, "•••", 512), [
          [vShow, !$data.forwardArrow]
        ]),
        withDirectives((openBlock(), createElementBlock("svg", _hoisted_6$1, _hoisted_8, 512)), [
          [vShow, $data.forwardArrow]
        ])
      ], 544), [
        [vShow, $data.forwardMore && $options.pageList[0] - 1 > 1]
      ]),
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.pageList, (page, index) => {
        return openBlock(), createElementBlock("span", {
          class: normalizeClass(["u-item", { active: $data.currentPage === page }]),
          key: index,
          onClick: ($event) => $options.changePage(page)
        }, toDisplayString(page), 11, _hoisted_9);
      }), 128)),
      withDirectives(createElementVNode("span", {
        class: "m-arrow",
        ref: "backward",
        onClick: _cache[5] || (_cache[5] = (...args) => $options.onBackward && $options.onBackward(...args)),
        onMouseenter: _cache[6] || (_cache[6] = ($event) => $data.backwardArrow = true),
        onMouseleave: _cache[7] || (_cache[7] = ($event) => $data.backwardArrow = false)
      }, [
        withDirectives(createElementVNode("span", _hoisted_10, "•••", 512), [
          [vShow, !$data.backwardArrow]
        ]),
        withDirectives((openBlock(), createElementBlock("svg", _hoisted_11, _hoisted_13, 512)), [
          [vShow, $data.backwardArrow]
        ])
      ], 544), [
        [vShow, $data.backwardMore && $options.pageList[$options.pageList.length - 1] + 1 < $options.totalPage]
      ]),
      withDirectives(createElementVNode("span", {
        class: normalizeClass(["u-item", { active: $data.currentPage === $options.totalPage }]),
        onClick: _cache[8] || (_cache[8] = ($event) => $options.changePage($options.totalPage))
      }, toDisplayString($options.totalPage), 3), [
        [vShow, $options.totalPage !== 1]
      ]),
      createElementVNode("span", {
        class: normalizeClass(["u-item", { disabled: $data.currentPage === $options.totalPage }]),
        onClick: _cache[9] || (_cache[9] = ($event) => $options.changePage($data.currentPage + 1))
      }, _hoisted_15, 2),
      $props.showQuickJumper ? (openBlock(), createElementBlock("span", _hoisted_16, [
        createTextVNode("跳至"),
        withDirectives(createElementVNode("input", {
          type: "text",
          "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.jumpNumber = $event)
        }, null, 512), [
          [vModelText, $data.jumpNumber]
        ]),
        createTextVNode("页")
      ])) : createCommentVNode("", true)
    ])
  ], 2);
}
const Pagination = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-84ba8fd3"]]);
Pagination.install = (app) => {
  app.component(Pagination.name, Pagination);
};
/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : "");
const routerKey = Symbol(process.env.NODE_ENV !== "production" ? "router" : "");
Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function useRouter() {
  return inject(routerKey);
}
const _withScopeId = (n) => (pushScopeId("data-v-1636f161"), n = n(), popScopeId(), n);
const _hoisted_1 = ["onClick", "title"];
const _hoisted_2 = {
  key: 0,
  class: "u-separator"
};
const _hoisted_3 = {
  key: 1,
  class: "u-arrow",
  viewBox: "64 64 896 896",
  "data-icon": "right",
  "aria-hidden": "true",
  focusable: "false"
};
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" }, null, -1));
const _hoisted_5 = [
  _hoisted_4
];
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", { class: "assist" }, null, -1));
const __default__ = {
  // 导出组件name
  name: "Breadcrumb"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: {
    routes: { default: () => [] },
    height: { default: 60 },
    separator: { default: "" }
  },
  setup(__props) {
    const props = __props;
    const len = computed(() => {
      return props.routes.length;
    });
    const router = useRouter();
    function goRouter(route) {
      router.push({ path: route.path, query: route.query || {} });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-breadcrumb",
        style: normalizeStyle(`height: ${__props.height}px;`)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.routes, (route, index) => {
          return openBlock(), createElementBlock("div", {
            class: "m-bread",
            key: index
          }, [
            createElementVNode("a", {
              class: normalizeClass(["u-route", { active: index === unref(len) - 1 }]),
              onClick: ($event) => index === unref(len) - 1 ? (e) => e.preventDefault() : goRouter(route),
              title: route.name
            }, toDisplayString(route.name || "--"), 11, _hoisted_1),
            index !== unref(len) - 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              __props.separator ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(__props.separator), 1)) : (openBlock(), createElementBlock("svg", _hoisted_3, _hoisted_5))
            ], 64)) : createCommentVNode("", true)
          ]);
        }), 128)),
        _hoisted_6
      ], 4);
    };
  }
});
const Breadcrumb_vue_vue_type_style_index_0_scoped_1636f161_lang = "";
const Breadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1636f161"]]);
Breadcrumb.install = (app) => {
  app.component(Breadcrumb.name, Breadcrumb);
};
const components = [
  Pagination,
  Breadcrumb
];
const install = (app) => {
  components.forEach((component) => app.component(component.name, component));
};
const VueAmazingUI = {
  install
};
export {
  Breadcrumb,
  Pagination,
  VueAmazingUI as default
};
