import { openBlock as l, createElementBlock as c, normalizeClass as g, createElementVNode as o, toDisplayString as f, createCommentVNode as p, withDirectives as u, vShow as d, Fragment as v, renderList as b, createTextVNode as P, vModelText as S, pushScopeId as k, popScopeId as y, normalizeStyle as A } from "vue";
const L = (e, t) => {
  const i = e.__vccOpts || e;
  for (const [n, a] of t)
    i[n] = a;
  return i;
}, z = {
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
      default: !1
    },
    showQuickJumper: {
      // 是否可以快速跳转至某页
      type: Boolean,
      default: !1
    },
    showTotal: {
      // 是否显示当前页数和数据总量
      type: Boolean,
      default: !1
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
      forwardMore: !1,
      // 左省略号展示
      backwardMore: !1,
      // 右省略号展示
      forwardArrow: !1,
      // 左箭头展示
      backwardArrow: !1
      // 右箭头展示
    };
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    pageList() {
      return this.dealPageList(this.currentPage).filter((e) => e !== 1 && e !== this.totalPage);
    }
  },
  watch: {
    current(e) {
      this.currentPage = e;
    },
    currentPage(e) {
      this.loading = !0, this.$emit("change", {
        page: e,
        pageSize: this.pageSize
      });
    }
  },
  created() {
    document.onkeydown = (e) => {
      const t = e || window.event;
      t && t.keyCode === 13 && this.jumpNumber && this.jumpPage(this.jumpNumber);
    };
  },
  methods: {
    dealPageList(e) {
      var t = [], i = Math.floor(this.pageListNum / 2), n = {
        start: e - i,
        end: e + i
      };
      n.start < 1 && (n.end = n.end + (1 - n.start), n.start = 1), n.end > this.totalPage && (n.start = n.start - (n.end - this.totalPage), n.end = this.totalPage), n.start < 1 && (n.start = 1), n.start > 1 ? this.forwardMore = !0 : this.forwardMore = !1, n.end < this.totalPage ? this.backwardMore = !0 : this.backwardMore = !1;
      for (let a = n.start; a <= n.end; a++)
        t.push(a);
      return t;
    },
    onForward() {
      this.currentPage = this.currentPage - this.pageListNum > 0 ? this.currentPage - this.pageListNum : 1;
    },
    onBackward() {
      this.currentPage = this.currentPage + this.pageListNum < this.totalPage ? this.currentPage + this.pageListNum : this.totalPage;
    },
    jumpPage(e) {
      Number(e) && (Number(e) < 1 && (e = 1), Number(e) > this.totalPage && (e = this.totalPage), this.changePage(Number(e))), this.jumpNumber = "";
    },
    changePage(e) {
      if (e === 0 || e === this.totalPage + 1)
        return !1;
      this.currentPage !== e && (this.currentPage = e);
    }
  }
}, w = (e) => (k("data-v-e4e55ac8"), e = e(), y(), e), C = { class: "m-pagination-wrap" }, x = {
  key: 0,
  class: "mr8"
}, V = /* @__PURE__ */ w(() => /* @__PURE__ */ o("svg", {
  class: "u-arrow",
  viewBox: "64 64 896 896",
  "data-icon": "left",
  "aria-hidden": "true",
  focusable: "false"
}, [
  /* @__PURE__ */ o("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })
], -1)), I = [
  V
], j = { class: "u-ellipsis" }, F = {
  class: "u-icon",
  viewBox: "64 64 896 896",
  "data-icon": "double-left",
  "aria-hidden": "true",
  focusable: "false"
}, H = /* @__PURE__ */ w(() => /* @__PURE__ */ o("path", { d: "M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" }, null, -1)), T = [
  H
], q = ["onClick"], D = { class: "u-ellipsis" }, O = {
  class: "u-icon",
  viewBox: "64 64 896 896",
  "data-icon": "double-right",
  "aria-hidden": "true",
  focusable: "false"
}, E = /* @__PURE__ */ w(() => /* @__PURE__ */ o("path", { d: "M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" }, null, -1)), J = [
  E
], Q = /* @__PURE__ */ w(() => /* @__PURE__ */ o("svg", {
  class: "u-arrow",
  viewBox: "64 64 896 896",
  "data-icon": "right",
  "aria-hidden": "true",
  focusable: "false"
}, [
  /* @__PURE__ */ o("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" })
], -1)), R = [
  Q
], U = {
  key: 1,
  class: "u-jump-page"
};
function G(e, t, i, n, a, r) {
  return l(), c("div", {
    class: g([`m-pagination ${i.placement}`, { hidden: i.hideOnSinglePage && i.total <= i.pageSize }])
  }, [
    o("div", C, [
      i.showTotal ? (l(), c("span", x, "共 " + f(r.totalPage) + " 页 / " + f(i.total) + " 条", 1)) : p("", !0),
      o("span", {
        class: g(["u-item", { disabled: a.currentPage === 1 }]),
        onClick: t[0] || (t[0] = (s) => r.changePage(a.currentPage - 1))
      }, I, 2),
      o("span", {
        class: g(["u-item", { active: a.currentPage === 1 }]),
        onClick: t[1] || (t[1] = (s) => r.changePage(1))
      }, "1", 2),
      u(o("span", {
        class: "m-arrow",
        ref: "forward",
        onClick: t[2] || (t[2] = (...s) => r.onForward && r.onForward(...s)),
        onMouseenter: t[3] || (t[3] = (s) => a.forwardArrow = !0),
        onMouseleave: t[4] || (t[4] = (s) => a.forwardArrow = !1)
      }, [
        u(o("span", j, "•••", 512), [
          [d, !a.forwardArrow]
        ]),
        u((l(), c("svg", F, T, 512)), [
          [d, a.forwardArrow]
        ])
      ], 544), [
        [d, a.forwardMore && r.pageList[0] - 1 > 1]
      ]),
      (l(!0), c(v, null, b(r.pageList, (s, h) => (l(), c("span", {
        class: g(["u-item", { active: a.currentPage === s }]),
        key: h,
        onClick: (B) => r.changePage(s)
      }, f(s), 11, q))), 128)),
      u(o("span", {
        class: "m-arrow",
        ref: "backward",
        onClick: t[5] || (t[5] = (...s) => r.onBackward && r.onBackward(...s)),
        onMouseenter: t[6] || (t[6] = (s) => a.backwardArrow = !0),
        onMouseleave: t[7] || (t[7] = (s) => a.backwardArrow = !1)
      }, [
        u(o("span", D, "•••", 512), [
          [d, !a.backwardArrow]
        ]),
        u((l(), c("svg", O, J, 512)), [
          [d, a.backwardArrow]
        ])
      ], 544), [
        [d, a.backwardMore && r.pageList[r.pageList.length - 1] + 1 < r.totalPage]
      ]),
      u(o("span", {
        class: g(["u-item", { active: a.currentPage === r.totalPage }]),
        onClick: t[8] || (t[8] = (s) => r.changePage(r.totalPage))
      }, f(r.totalPage), 3), [
        [d, r.totalPage !== 1]
      ]),
      o("span", {
        class: g(["u-item", { disabled: a.currentPage === r.totalPage }]),
        onClick: t[9] || (t[9] = (s) => r.changePage(a.currentPage + 1))
      }, R, 2),
      i.showQuickJumper ? (l(), c("span", U, [
        P("跳至"),
        u(o("input", {
          type: "text",
          "onUpdate:modelValue": t[10] || (t[10] = (s) => a.jumpNumber = s)
        }, null, 512), [
          [S, a.jumpNumber]
        ]),
        P("页")
      ])) : p("", !0)
    ])
  ], 2);
}
const m = /* @__PURE__ */ L(z, [["render", G], ["__scopeId", "data-v-e4e55ac8"]]);
m.install = (e) => {
  e.component(m.name, m);
};
const K = {
  name: "Breadcrumb",
  props: {
    routes: {
      // router的路由数组
      type: Array,
      required: !0,
      default: () => []
    },
    height: {
      // 面包屑高度
      type: Number,
      default: 60
    },
    separator: {
      // 自定义分隔符
      type: String,
      default: ""
    }
  },
  computed: {
    len() {
      return this.routes.length;
    }
  },
  methods: {
    goRouter(e) {
      this.$router.push({ path: e.path, query: e.query || {} });
    }
  }
}, M = (e) => (k("data-v-a0ba6180"), e = e(), y(), e), W = ["onClick", "title"], X = {
  key: 0,
  class: "u-separator"
}, Y = {
  key: 1,
  class: "u-arrow",
  viewBox: "64 64 896 896",
  "data-icon": "right",
  "aria-hidden": "true",
  focusable: "false"
}, Z = /* @__PURE__ */ M(() => /* @__PURE__ */ o("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" }, null, -1)), $ = [
  Z
], ee = /* @__PURE__ */ M(() => /* @__PURE__ */ o("div", { class: "assist" }, null, -1));
function te(e, t, i, n, a, r) {
  return l(), c("div", {
    class: "m-breadcrumb",
    style: A(`height: ${i.height}px;`)
  }, [
    (l(!0), c(v, null, b(i.routes, (s, h) => (l(), c("div", {
      class: "m-bread",
      key: h
    }, [
      o("a", {
        class: g(["u-route", { active: h === r.len - 1 }]),
        onClick: (B) => h === r.len - 1 ? (N) => N.preventDefault() : r.goRouter(s),
        title: s.name
      }, f(s.name || "--"), 11, W),
      h !== r.len - 1 ? (l(), c(v, { key: 0 }, [
        i.separator ? (l(), c("span", X, f(i.separator), 1)) : (l(), c("svg", Y, $))
      ], 64)) : p("", !0)
    ]))), 128)),
    ee
  ], 4);
}
const _ = /* @__PURE__ */ L(K, [["render", te], ["__scopeId", "data-v-a0ba6180"]]);
_.install = (e) => {
  e.component(_.name, _);
};
const ae = (e) => {
  e.use(m), e.use(_);
}, se = {
  install: ae
};
export {
  _ as Breadcrumb,
  m as Pagination,
  se as default
};
