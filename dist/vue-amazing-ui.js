import { defineComponent, ref, computed, watch, onMounted, openBlock, createElementBlock, normalizeClass, createElementVNode, toDisplayString, unref, createCommentVNode, withDirectives, vShow, Fragment, renderList, createTextVNode, vModelText, pushScopeId, popScopeId, normalizeStyle, renderSlot, onUnmounted, withModifiers, resolveComponent, createBlock, withCtx } from "vue";
import { useRouter } from "vue-router";
const _withScopeId$2 = (n) => (pushScopeId("data-v-0b4fe0d6"), n = n(), popScopeId(), n);
const _hoisted_1$4 = { class: "m-pagination-wrap" };
const _hoisted_2$3 = {
  key: 0,
  class: "mr8"
};
const _hoisted_3$3 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-arrow",
  viewBox: "64 64 896 896",
  "data-icon": "left",
  "aria-hidden": "true",
  focusable: "false"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })
], -1));
const _hoisted_4$3 = [
  _hoisted_3$3
];
const _hoisted_5$1 = { class: "u-ellipsis" };
const _hoisted_6$1 = {
  class: "u-icon",
  viewBox: "64 64 896 896",
  "data-icon": "double-left",
  "aria-hidden": "true",
  focusable: "false"
};
const _hoisted_7 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("path", { d: "M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" }, null, -1));
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
const _hoisted_12 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("path", { d: "M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" }, null, -1));
const _hoisted_13 = [
  _hoisted_12
];
const _hoisted_14 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("svg", {
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
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Pagination",
  props: {
    current: { default: 1 },
    pageSize: { default: 10 },
    total: { default: 0 },
    pageListNum: { default: 5 },
    hideOnSinglePage: { type: Boolean, default: false },
    showQuickJumper: { type: Boolean, default: false },
    showTotal: { type: Boolean, default: false },
    placement: { default: "right" }
  },
  emits: ["change"],
  setup(__props, { emit }) {
    const props = __props;
    const currentPage = ref(props.current);
    const jumpNumber = ref("");
    const forwardMore = ref(false);
    const backwardMore = ref(false);
    const forwardArrow = ref(false);
    const backwardArrow = ref(false);
    const totalPage = computed(() => {
      return Math.ceil(props.total / props.pageSize);
    });
    const pageList = computed(() => {
      return dealPageList(currentPage.value).filter((n) => n !== 1 && n !== totalPage.value);
    });
    watch(currentPage, (to) => {
      console.log("change:", to);
      emit("change", {
        page: to,
        pageSize: props.pageSize
      });
    });
    onMounted(() => {
      document.onkeydown = (e) => {
        const ev = e || window.event;
        if (ev && ev.keyCode === 13 && jumpNumber.value) {
          jumpPage(jumpNumber.value);
        }
      };
    });
    function dealPageList(curPage) {
      var resList = [];
      var offset = Math.floor(props.pageListNum / 2);
      var pager = {
        start: curPage - offset,
        end: curPage + offset
      };
      if (pager.start < 1) {
        pager.end = pager.end + (1 - pager.start);
        pager.start = 1;
      }
      if (pager.end > totalPage.value) {
        pager.start = pager.start - (pager.end - totalPage.value);
        pager.end = totalPage.value;
      }
      if (pager.start < 1) {
        pager.start = 1;
      }
      if (pager.start > 1) {
        forwardMore.value = true;
      } else {
        forwardMore.value = false;
      }
      if (pager.end < totalPage.value) {
        backwardMore.value = true;
      } else {
        backwardMore.value = false;
      }
      for (let i = pager.start; i <= pager.end; i++) {
        resList.push(i);
      }
      return resList;
    }
    function onForward() {
      currentPage.value = currentPage.value - props.pageListNum > 0 ? currentPage.value - props.pageListNum : 1;
    }
    function onBackward() {
      currentPage.value = currentPage.value + props.pageListNum < totalPage.value ? currentPage.value + props.pageListNum : totalPage.value;
    }
    function jumpPage(jumpNum) {
      if (Number(jumpNum)) {
        if (Number(jumpNum) < 1) {
          jumpNum = 1;
        }
        if (Number(jumpNum) > totalPage.value) {
          jumpNum = totalPage.value;
        }
        changePage(Number(jumpNum));
      }
      jumpNumber.value = "";
    }
    function changePage(pageNum) {
      if (pageNum === 0 || pageNum === totalPage.value + 1) {
        return false;
      }
      if (currentPage.value !== pageNum) {
        currentPage.value = pageNum;
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([`m-pagination ${__props.placement}`, { hidden: __props.hideOnSinglePage && __props.total <= __props.pageSize }])
      }, [
        createElementVNode("div", _hoisted_1$4, [
          __props.showTotal ? (openBlock(), createElementBlock("span", _hoisted_2$3, "共 " + toDisplayString(unref(totalPage)) + " 页 / " + toDisplayString(__props.total) + " 条", 1)) : createCommentVNode("", true),
          createElementVNode("span", {
            class: normalizeClass(["u-item", { disabled: currentPage.value === 1 }]),
            onClick: _cache[0] || (_cache[0] = ($event) => changePage(currentPage.value - 1))
          }, _hoisted_4$3, 2),
          createElementVNode("span", {
            class: normalizeClass(["u-item", { active: currentPage.value === 1 }]),
            onClick: _cache[1] || (_cache[1] = ($event) => changePage(1))
          }, "1", 2),
          withDirectives(createElementVNode("span", {
            class: "m-arrow",
            ref: "forward",
            onClick: onForward,
            onMouseenter: _cache[2] || (_cache[2] = ($event) => forwardArrow.value = true),
            onMouseleave: _cache[3] || (_cache[3] = ($event) => forwardArrow.value = false)
          }, [
            withDirectives(createElementVNode("span", _hoisted_5$1, "•••", 512), [
              [vShow, !forwardArrow.value]
            ]),
            withDirectives((openBlock(), createElementBlock("svg", _hoisted_6$1, _hoisted_8, 512)), [
              [vShow, forwardArrow.value]
            ])
          ], 544), [
            [vShow, forwardMore.value && unref(pageList)[0] - 1 > 1]
          ]),
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(pageList), (page, index) => {
            return openBlock(), createElementBlock("span", {
              class: normalizeClass(["u-item", { active: currentPage.value === page }]),
              key: index,
              onClick: ($event) => changePage(page)
            }, toDisplayString(page), 11, _hoisted_9);
          }), 128)),
          withDirectives(createElementVNode("span", {
            class: "m-arrow",
            ref: "backward",
            onClick: onBackward,
            onMouseenter: _cache[4] || (_cache[4] = ($event) => backwardArrow.value = true),
            onMouseleave: _cache[5] || (_cache[5] = ($event) => backwardArrow.value = false)
          }, [
            withDirectives(createElementVNode("span", _hoisted_10, "•••", 512), [
              [vShow, !backwardArrow.value]
            ]),
            withDirectives((openBlock(), createElementBlock("svg", _hoisted_11, _hoisted_13, 512)), [
              [vShow, backwardArrow.value]
            ])
          ], 544), [
            [vShow, backwardMore.value && unref(pageList)[unref(pageList).length - 1] + 1 < unref(totalPage)]
          ]),
          withDirectives(createElementVNode("span", {
            class: normalizeClass(["u-item", { active: currentPage.value === unref(totalPage) }]),
            onClick: _cache[6] || (_cache[6] = ($event) => changePage(unref(totalPage)))
          }, toDisplayString(unref(totalPage)), 3), [
            [vShow, unref(totalPage) !== 1]
          ]),
          createElementVNode("span", {
            class: normalizeClass(["u-item", { disabled: currentPage.value === unref(totalPage) }]),
            onClick: _cache[7] || (_cache[7] = ($event) => changePage(currentPage.value + 1))
          }, _hoisted_15, 2),
          __props.showQuickJumper ? (openBlock(), createElementBlock("span", _hoisted_16, [
            createTextVNode("跳至"),
            withDirectives(createElementVNode("input", {
              type: "text",
              "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => jumpNumber.value = $event)
            }, null, 512), [
              [vModelText, jumpNumber.value]
            ]),
            createTextVNode("页")
          ])) : createCommentVNode("", true)
        ])
      ], 2);
    };
  }
});
const Pagination_vue_vue_type_style_index_0_scoped_0b4fe0d6_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const Pagination = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-0b4fe0d6"]]);
Pagination.install = (app) => {
  app.component(Pagination.__name, Pagination);
};
const _withScopeId$1 = (n) => (pushScopeId("data-v-574bc864"), n = n(), popScopeId(), n);
const _hoisted_1$3 = ["onClick", "title"];
const _hoisted_2$2 = {
  key: 0,
  class: "u-separator"
};
const _hoisted_3$2 = {
  key: 1,
  class: "u-arrow",
  viewBox: "64 64 896 896",
  "data-icon": "right",
  "aria-hidden": "true",
  focusable: "false"
};
const _hoisted_4$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" }, null, -1));
const _hoisted_5 = [
  _hoisted_4$2
];
const _hoisted_6 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("div", { class: "assist" }, null, -1));
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Breadcrumb",
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
            }, toDisplayString(route.name || "--"), 11, _hoisted_1$3),
            index !== unref(len) - 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              __props.separator ? (openBlock(), createElementBlock("span", _hoisted_2$2, toDisplayString(__props.separator), 1)) : (openBlock(), createElementBlock("svg", _hoisted_3$2, _hoisted_5))
            ], 64)) : createCommentVNode("", true)
          ]);
        }), 128)),
        _hoisted_6
      ], 4);
    };
  }
});
const Breadcrumb_vue_vue_type_style_index_0_scoped_574bc864_lang = "";
const Breadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-574bc864"]]);
Breadcrumb.install = (app) => {
  app.component(Breadcrumb.__name, Breadcrumb);
};
const _hoisted_1$2 = { class: "m-countdown" };
const _hoisted_2$1 = { class: "u-title" };
const _hoisted_3$1 = { class: "u-time" };
const _hoisted_4$1 = { key: 2 };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Countdown",
  props: {
    countdown: { default: 0 },
    title: { default: "Countdown" },
    format: { default: "HH:mm:ss" },
    prefix: { default: "" },
    suffix: { default: "" },
    finishedText: { default: "" }
  },
  emits: ["finish"],
  setup(__props, { emit }) {
    const props = __props;
    const restTime = ref(props.countdown);
    function fixedTwo(value) {
      return value < 10 ? "0" + value : String(value);
    }
    function timeFormat(time) {
      let showTime2 = props.format;
      if (showTime2.includes("s")) {
        var s = time;
      } else {
        var s = 0;
      }
      if (showTime2.includes("m")) {
        s = s % 60;
        var m = Math.floor((time - s) / 60);
      } else {
        var m = 0;
      }
      if (showTime2.includes("H")) {
        m = m % 60;
        var H = Math.floor((time - s - m * 60) / 60 / 60);
      } else {
        var H = 0;
      }
      if (showTime2.includes("D")) {
        H = H % 24;
        var D = Math.floor((time - s - m * 60 - H * 60 * 60) / 60 / 60 / 24);
      } else {
        var D = 0;
      }
      if (showTime2.includes("M")) {
        D = D % 30;
        var M = Math.floor((time - s - m * 60 - H * 60 * 60 - D * 24 * 60 * 60) / 60 / 60 / 24 / 30);
      } else {
        var M = 0;
      }
      if (showTime2.includes("Y")) {
        M = M % 12;
        var Y = Math.floor((time - s - m * 60 - H * 60 * 60 - D * 24 * 60 * 60 - M * 30 * 24 * 60 * 60) / 60 / 60 / 24 / 30 / 12);
      } else {
        var Y = 0;
      }
      showTime2 = showTime2.includes("ss") ? showTime2.replace("ss", fixedTwo(s)) : showTime2.replace("s", String(s));
      showTime2 = showTime2.includes("mm") ? showTime2.replace("mm", fixedTwo(m)) : showTime2.replace("m", String(m));
      showTime2 = showTime2.includes("HH") ? showTime2.replace("HH", fixedTwo(H)) : showTime2.replace("H", String(H));
      showTime2 = showTime2.includes("DD") ? showTime2.replace("DD", fixedTwo(D)) : showTime2.replace("D", String(D));
      showTime2 = showTime2.includes("MM") ? showTime2.replace("MM", fixedTwo(M)) : showTime2.replace("M", String(M));
      showTime2 = showTime2.includes("YY") ? showTime2.replace("YY", fixedTwo(Y)) : showTime2.replace("Y", String(Y));
      return showTime2;
    }
    const showTime = computed(() => {
      return timeFormat(restTime.value);
    });
    function CountDown(restTime2) {
      setTimeout(() => {
        restTime2.value--;
        if (restTime2.value > 0) {
          CountDown(restTime2);
        } else {
          emit("finish");
        }
      }, 1e3);
    }
    onMounted(() => {
      if (restTime.value > Date.now()) {
        restTime.value = Math.floor((restTime.value - Date.now()) / 1e3);
      }
      CountDown(restTime);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        renderSlot(_ctx.$slots, "title", {}, () => [
          createElementVNode("p", _hoisted_2$1, toDisplayString(props.title), 1)
        ], true),
        createElementVNode("div", _hoisted_3$1, [
          restTime.value > 0 ? renderSlot(_ctx.$slots, "prefix", { key: 0 }, () => [
            createTextVNode(toDisplayString(__props.prefix), 1)
          ], true) : createCommentVNode("", true),
          __props.finishedText && restTime.value === 0 ? renderSlot(_ctx.$slots, "finish", { key: 1 }, () => [
            createTextVNode(toDisplayString(__props.finishedText), 1)
          ], true) : (openBlock(), createElementBlock("span", _hoisted_4$1, toDisplayString(unref(showTime)), 1)),
          restTime.value > 0 ? renderSlot(_ctx.$slots, "suffix", { key: 3 }, () => [
            createTextVNode(toDisplayString(__props.suffix), 1)
          ], true) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});
const Countdown_vue_vue_type_style_index_0_scoped_203f9659_lang = "";
const Countdown = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-203f9659"]]);
Countdown.install = (app) => {
  app.component(Countdown.__name, Countdown);
};
const _withScopeId = (n) => (pushScopeId("data-v-19a2828d"), n = n(), popScopeId(), n);
const _hoisted_1$1 = ["src", "poster", "width", "height", "autoplay", "controls", "loop", "muted", "preload", "onClickOnce"];
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("path", {
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "1.5",
  d: "M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75Z"
}, null, -1));
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("path", {
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "1.5",
  d: "M15.25 12L9.75 8.75V15.25L15.25 12Z"
}, null, -1));
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Video",
  props: {
    videoUrl: { default: "" },
    videoCover: { default: "" },
    width: { default: 800 },
    height: { default: 450 },
    autoplay: { type: Boolean, default: false },
    controls: { type: Boolean, default: true },
    loop: { type: Boolean, default: false },
    muted: { type: Boolean, default: false },
    preload: { default: "auto" },
    showPlay: { type: Boolean, default: false },
    playWidth: { default: 96 },
    zoom: { default: "none" }
  },
  setup(__props) {
    const props = __props;
    const originPlay = ref(true);
    const vplay = ref(false);
    const veo = ref(null);
    function onPlay() {
      var _a, _b;
      console.log("click");
      if (props.autoplay) {
        (_a = veo.value) == null ? void 0 : _a.pause();
      } else {
        vplay.value = true;
        originPlay.value = false;
        (_b = veo.value) == null ? void 0 : _b.play();
      }
    }
    function onPause() {
      vplay.value = false;
      console.log("pause");
    }
    function onPlaying() {
      vplay.value = true;
      console.log("playing");
    }
    onMounted(() => {
      var _a, _b;
      if (props.showPlay) {
        (_a = veo.value) == null ? void 0 : _a.addEventListener("pause", onPause);
        (_b = veo.value) == null ? void 0 : _b.addEventListener("playing", onPlaying);
      }
      if (props.autoplay) {
        vplay.value = true;
        originPlay.value = false;
      }
    });
    onUnmounted(() => {
      var _a, _b;
      (_a = veo.value) == null ? void 0 : _a.removeEventListener("pause", onPause);
      (_b = veo.value) == null ? void 0 : _b.removeEventListener("playing", onPlaying);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-video",
        style: normalizeStyle(`width: ${__props.width}px; height: ${__props.height}px;`)
      }, [
        createElementVNode("video", {
          ref_key: "veo",
          ref: veo,
          style: normalizeStyle(`object-fit: ${__props.zoom};`),
          src: __props.videoUrl,
          poster: __props.videoCover,
          width: __props.width,
          height: __props.height,
          autoplay: __props.autoplay,
          controls: !originPlay.value && __props.controls,
          loop: __props.loop,
          muted: __props.autoplay || __props.muted,
          preload: __props.preload,
          onClickOnce: withModifiers(onPlay, ["prevent"])
        }, " 您的浏览器不支持video标签。 ", 44, _hoisted_1$1),
        withDirectives((openBlock(), createElementBlock("svg", {
          class: normalizeClass([vplay.value ? "hidden" : "u-play"]),
          style: normalizeStyle(`width: ${__props.playWidth}px; height: ${__props.playWidth}px;`),
          viewBox: "0 0 24 24"
        }, _hoisted_4, 6)), [
          [vShow, originPlay.value || __props.showPlay]
        ])
      ], 4);
    };
  }
});
const Video_vue_vue_type_style_index_0_scoped_19a2828d_lang = "";
const Video = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-19a2828d"]]);
Video.install = (app) => {
  app.component(Video.__name, Video);
};
const _hoisted_1 = ["disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Button",
  props: {
    name: { default: "按钮" },
    type: { default: "default" },
    effect: { default: "fade" },
    size: { default: "middle" },
    width: { default: 0 },
    height: { default: 40 },
    borderRadius: { default: 4 },
    route: { default: () => {
      return {};
    } },
    target: { default: "_self" },
    disabled: { type: Boolean, default: false },
    center: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const isRoute = computed(() => {
      if (JSON.stringify(props.route) === "{}") {
        return false;
      } else {
        return true;
      }
    });
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("span", {
        class: normalizeClass(["m-button", { "center": __props.center }])
      }, [
        unref(isRoute) ? (openBlock(), createBlock(_component_router_link, {
          key: 0,
          to: __props.route,
          target: __props.target,
          disabled: __props.disabled,
          class: normalizeClass(["u-button fade", [__props.type, __props.size, { [__props.effect]: __props.type === "default", widthType: __props.width, disabled: __props.disabled }]]),
          style: normalizeStyle({ borderRadius: __props.borderRadius + "px", width: __props.width - 2 + "px", height: __props.height - 2 + "px", lineHeight: __props.height - 2 + "px" })
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default", {}, () => [
              createTextVNode(toDisplayString(__props.name), 1)
            ], true)
          ]),
          _: 3
        }, 8, ["to", "target", "disabled", "class", "style"])) : (openBlock(), createElementBlock("a", {
          key: 1,
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click")),
          disabled: __props.disabled,
          class: normalizeClass(["u-button", [__props.type, __props.size, { [__props.effect]: __props.type === "default", widthType: __props.width, disabled: __props.disabled }]]),
          style: normalizeStyle({ borderRadius: __props.borderRadius + "px", width: __props.width - 2 + "px", height: __props.height - 2 + "px", lineHeight: __props.height - 2 + "px" })
        }, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(__props.name), 1)
          ], true)
        ], 14, _hoisted_1))
      ], 2);
    };
  }
});
const Button_vue_vue_type_style_index_0_scoped_90914f40_lang = "";
const Button = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-90914f40"]]);
Button.install = (app) => {
  app.component(Button.__name, Button);
};
const components = [
  Pagination,
  Breadcrumb,
  Countdown,
  Video,
  Button
];
console.log("components:", components);
const install = (app) => {
  components.forEach((component) => app.component(component.__name, component));
};
const VueAmazingUI = {
  install
};
export {
  Breadcrumb,
  Button,
  Countdown,
  Pagination,
  Video,
  VueAmazingUI as default
};
