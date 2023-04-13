import { defineComponent, computed, openBlock, createElementBlock, normalizeStyle, Fragment, renderList, createElementVNode, normalizeClass, unref, toDisplayString, createCommentVNode, pushScopeId, popScopeId, resolveComponent, createBlock, withCtx, renderSlot, createTextVNode, withModifiers, ref, onMounted, watch, createVNode, mergeProps, Transition, withDirectives, vShow, createStaticVNode, withKeys, vModelText, TransitionGroup, h, onUpdated, provide, nextTick, onBeforeUnmount, onBeforeUpdate, watchEffect, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import VueDatePicker from "@vuepic/vue-datepicker";
import Swiper$2, { Navigation, Pagination as Pagination$1, Autoplay, EffectFade } from "swiper";
function dateFormat(timestamp, format = "YYYY-MM-DD HH:mm:ss") {
  var date = new Date(timestamp);
  function fixedTwo(value) {
    return value < 10 ? "0" + value : String(value);
  }
  var showTime = format;
  if (showTime.includes("SSS")) {
    const S = date.getMilliseconds();
    showTime = showTime.replace("SSS", "0".repeat(3 - String(S).length) + S);
  }
  if (showTime.includes("YY")) {
    const Y = date.getFullYear();
    showTime = showTime.includes("YYYY") ? showTime.replace("YYYY", String(Y)) : showTime.replace("YY", String(Y).slice(2, 4));
  }
  if (showTime.includes("M")) {
    const M = date.getMonth() + 1;
    showTime = showTime.includes("MM") ? showTime.replace("MM", fixedTwo(M)) : showTime.replace("M", String(M));
  }
  if (showTime.includes("D")) {
    const D = date.getDate();
    showTime = showTime.includes("DD") ? showTime.replace("DD", fixedTwo(D)) : showTime.replace("D", String(D));
  }
  if (showTime.includes("H")) {
    const H = date.getHours();
    showTime = showTime.includes("HH") ? showTime.replace("HH", fixedTwo(H)) : showTime.replace("H", String(H));
  }
  if (showTime.includes("m")) {
    var m = date.getMinutes();
    showTime = showTime.includes("mm") ? showTime.replace("mm", fixedTwo(m)) : showTime.replace("m", String(m));
  }
  if (showTime.includes("s")) {
    var s = date.getSeconds();
    showTime = showTime.includes("ss") ? showTime.replace("ss", fixedTwo(s)) : showTime.replace("s", String(s));
  }
  return showTime;
}
const requestAnimationFrame$1 = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
const cancelAnimationFrame$1 = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
function rafTimeout(func, delay = 0, interval = false) {
  const requestAnimationFrame2 = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  var start = null;
  function timeElapse(timestamp) {
    if (!start) {
      start = timestamp;
    }
    const elapsed = timestamp - start;
    if (elapsed >= delay) {
      func();
      if (interval) {
        start = null;
        raf.id = requestAnimationFrame2(timeElapse);
      }
    } else {
      raf.id = requestAnimationFrame2(timeElapse);
    }
  }
  const raf = {
    // 引用类型保存，方便获取 requestAnimationFrame()方法返回的 ID.
    id: requestAnimationFrame2(timeElapse)
  };
  return raf;
}
function cancelRaf(raf) {
  if (raf && raf.id) {
    cancelAnimationFrame$1(raf.id);
  }
}
function throttle(fn, delay = 300) {
  var valid = true;
  return function() {
    if (valid) {
      valid = false;
      rafTimeout(() => {
        fn();
        valid = true;
      }, delay);
    }
    return false;
  };
}
function debounce(fn, delay = 300) {
  let timer = null;
  return function() {
    if (timer) {
      cancelRaf(timer);
    }
    timer = rafTimeout(fn, delay);
  };
}
const _withScopeId$g = (n) => (pushScopeId("data-v-f723210c"), n = n(), popScopeId(), n);
const _hoisted_1$u = ["onClick", "title"];
const _hoisted_2$p = {
  key: 0,
  class: "u-separator"
};
const _hoisted_3$m = {
  key: 1,
  class: "u-arrow",
  viewBox: "64 64 896 896",
  "data-icon": "right",
  "aria-hidden": "true",
  focusable: "false"
};
const _hoisted_4$j = /* @__PURE__ */ _withScopeId$g(() => /* @__PURE__ */ createElementVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" }, null, -1));
const _hoisted_5$f = [
  _hoisted_4$j
];
const _hoisted_6$f = /* @__PURE__ */ _withScopeId$g(() => /* @__PURE__ */ createElementVNode("div", { class: "assist" }, null, -1));
const _sfc_main$x = /* @__PURE__ */ defineComponent({
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
            }, toDisplayString(route.name || "--"), 11, _hoisted_1$u),
            index !== unref(len) - 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              __props.separator ? (openBlock(), createElementBlock("span", _hoisted_2$p, toDisplayString(__props.separator), 1)) : (openBlock(), createElementBlock("svg", _hoisted_3$m, _hoisted_5$f))
            ], 64)) : createCommentVNode("", true)
          ]);
        }), 128)),
        _hoisted_6$f
      ], 4);
    };
  }
});
const Breadcrumb_vue_vue_type_style_index_0_scoped_f723210c_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const Breadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__scopeId", "data-v-f723210c"]]);
Breadcrumb.install = (app) => {
  app.component(Breadcrumb.__name, Breadcrumb);
};
const _hoisted_1$t = ["disabled"];
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  __name: "Button",
  props: {
    name: { default: "按钮" },
    type: { default: "default" },
    effect: { default: "fade" },
    size: { default: "middle" },
    width: { default: 0 },
    height: { default: 0 },
    borderRadius: { default: 5 },
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
          onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.$emit("click"), ["stop"])),
          disabled: __props.disabled,
          class: normalizeClass(["u-button", [__props.type, __props.size, { [__props.effect]: __props.type === "default", widthType: __props.width, disabled: __props.disabled }]]),
          style: normalizeStyle({ borderRadius: __props.borderRadius + "px", width: __props.width - 2 + "px", height: __props.height - 2 + "px", lineHeight: __props.height - 2 + "px" })
        }, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(__props.name), 1)
          ], true)
        ], 14, _hoisted_1$t))
      ], 2);
    };
  }
});
const Button_vue_vue_type_style_index_0_scoped_6889d013_lang = "";
const Button = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__scopeId", "data-v-6889d013"]]);
Button.install = (app) => {
  app.component(Button.__name, Button);
};
const _withScopeId$f = (n) => (pushScopeId("data-v-ede458a2"), n = n(), popScopeId(), n);
const _hoisted_1$s = ["href", "target"];
const _hoisted_2$o = ["src", "alt"];
const _hoisted_3$l = {
  key: 0,
  class: "m-image"
};
const _hoisted_4$i = ["href", "target"];
const _hoisted_5$e = ["src", "alt"];
const _hoisted_6$e = /* @__PURE__ */ _withScopeId$f(() => /* @__PURE__ */ createElementVNode("path", { d: "M603.3 327.5l-246 178a7.95 7.95 0 0 0 0 12.9l246 178c5.3 3.8 12.7 0 12.7-6.5V643c0-10.2-4.9-19.9-13.2-25.9L457.4 512l145.4-105.2c8.3-6 13.2-15.6 13.2-25.9V334c0-6.5-7.4-10.3-12.7-6.5z" }, null, -1));
const _hoisted_7$d = /* @__PURE__ */ _withScopeId$f(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
const _hoisted_8$b = [
  _hoisted_6$e,
  _hoisted_7$d
];
const _hoisted_9$b = /* @__PURE__ */ _withScopeId$f(() => /* @__PURE__ */ createElementVNode("path", { d: "M666.7 505.5l-246-178A8 8 0 0 0 408 334v46.9c0 10.2 4.9 19.9 13.2 25.9L566.6 512 421.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5l246-178c4.4-3.2 4.4-9.8 0-13z" }, null, -1));
const _hoisted_10$8 = /* @__PURE__ */ _withScopeId$f(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
const _hoisted_11$7 = [
  _hoisted_9$b,
  _hoisted_10$8
];
const _hoisted_12$6 = {
  key: 1,
  class: "m-switch"
};
const _hoisted_13$5 = ["onClick"];
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "Carousel",
  props: {
    imageData: {
      // 走马灯图片数组
      type: Array,
      default: () => []
    },
    interval: {
      // 自动滑动轮播间隔
      type: Number,
      default: 3e3
    },
    width: {
      // 走马灯宽度
      type: [Number, String],
      default: "100%"
    },
    height: {
      // 走马灯高度
      type: [Number, String],
      default: "100vh"
    },
    navigation: {
      // 是否显示导航
      type: Boolean,
      default: true
    },
    pagination: {
      // 是否显示分页
      type: Boolean,
      default: true
    },
    disableOnInteraction: {
      // 用户操作导航或分页之后，是否禁止自动切换。默认为true：停止。
      type: Boolean,
      default: true
    },
    pauseOnMouseEnter: {
      // 鼠标悬浮时暂停自动切换，鼠标离开时恢复自动切换，默认true
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const props = __props;
    const toLeft = ref(true);
    const left = ref(0);
    const transition = ref(false);
    const slideTimer = ref();
    const moveRaf = ref();
    const targetMove = ref();
    const switched = ref(false);
    const carousel = ref();
    const activeSwitcher = ref(1);
    const carouselWidth = computed(() => {
      if (typeof props.width === "number") {
        return props.width + "px";
      } else {
        return props.width;
      }
    });
    const carouselHeight = computed(() => {
      if (typeof props.height === "number") {
        return props.height + "px";
      } else {
        return props.height;
      }
    });
    const totalWidth = computed(() => {
      return (props.imageData.length + 1) * imageWidth.value;
    });
    const len = computed(() => {
      return props.imageData.length;
    });
    onMounted(() => {
      getFPS();
      getImageSize();
    });
    const fpsRaf = ref();
    const fps = ref(60);
    const step = computed(() => {
      if (fps.value === 60) {
        return 12;
      } else {
        return 12 * (fps.value / 60);
      }
    });
    function getFPS() {
      const requestAnimationFrame2 = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      var start = null;
      function timeElapse(timestamp) {
        if (!start) {
          if (fpsRaf.value > 10) {
            start = timestamp;
          }
          fpsRaf.value = requestAnimationFrame2(timeElapse);
        } else {
          fps.value = Math.floor(1e3 / (timestamp - start));
          console.log("fps", fps.value);
          onStart();
        }
      }
      fpsRaf.value = requestAnimationFrame2(timeElapse);
    }
    const imageWidth = ref();
    const imageHeight = ref();
    function getImageSize() {
      imageWidth.value = carousel.value.offsetWidth;
      imageHeight.value = carousel.value.offsetHeight;
    }
    function onStart() {
      if (len.value > 1) {
        toLeft.value = true;
        transition.value = false;
        onAutoSlide();
        console.log("imageSlider start");
      }
    }
    function onStop() {
      cancelRaf(slideTimer.value);
      if (toLeft.value) {
        onStopLeft();
      } else {
        onStopRight();
      }
      console.log("imageSlider stop");
    }
    function onStopLeft() {
      cancelRaf(slideTimer.value);
      cancelAnimationFrame(moveRaf.value);
      transition.value = true;
      left.value = Math.ceil(left.value / imageWidth.value) * imageWidth.value;
    }
    function onStopRight() {
      cancelAnimationFrame(moveRaf.value);
      transition.value = true;
      left.value = Math.floor(left.value / imageWidth.value) * imageWidth.value;
    }
    function onAutoSlide() {
      slideTimer.value = rafTimeout(() => {
        const target = left.value % (len.value * imageWidth.value) + imageWidth.value;
        activeSwitcher.value = activeSwitcher.value % len.value + 1;
        autoMoveLeft(target);
      }, props.interval);
    }
    function goLeft(target) {
      if (toLeft.value) {
        onStopLeft();
      } else {
        onStopRight();
        toLeft.value = true;
      }
      transition.value = false;
      moveLeft(target);
    }
    function goRight(target) {
      if (toLeft.value) {
        onStopLeft();
        toLeft.value = false;
      } else {
        onStopRight();
      }
      transition.value = false;
      moveRight(target);
    }
    function onLeftArrow(target) {
      activeSwitcher.value = activeSwitcher.value - 1 > 0 ? activeSwitcher.value - 1 : len.value;
      goRight(target);
    }
    function onRightArrow(target) {
      activeSwitcher.value = activeSwitcher.value % len.value + 1;
      goLeft(target);
    }
    function autoMoveLeftEffect() {
      if (left.value >= targetMove.value) {
        onAutoSlide();
      } else {
        var move = Math.ceil((targetMove.value - left.value) / step.value);
        left.value += move;
        moveRaf.value = requestAnimationFrame(autoMoveLeftEffect);
      }
    }
    function autoMoveLeft(target) {
      if (left.value === len.value * imageWidth.value) {
        left.value = 0;
      }
      targetMove.value = target;
      moveRaf.value = requestAnimationFrame(autoMoveLeftEffect);
    }
    function moveLeftEffect() {
      if (left.value >= targetMove.value) {
        if (switched.value) {
          switched.value = false;
          if (!props.disableOnInteraction && !props.pauseOnMouseEnter) {
            onStart();
          }
        }
      } else {
        var move = Math.ceil((targetMove.value - left.value) / step.value);
        left.value += move;
        moveRaf.value = requestAnimationFrame(moveLeftEffect);
      }
    }
    function moveLeft(target) {
      if (left.value === len.value * imageWidth.value) {
        left.value = 0;
      }
      targetMove.value = target;
      moveRaf.value = requestAnimationFrame(moveLeftEffect);
    }
    function moveRightEffect() {
      if (left.value <= targetMove.value) {
        if (switched.value) {
          switched.value = false;
          if (!props.disableOnInteraction && !props.pauseOnMouseEnter) {
            onStart();
          }
        }
      } else {
        var move = Math.floor((targetMove.value - left.value) / step.value);
        left.value += move;
        moveRaf.value = requestAnimationFrame(moveRightEffect);
      }
    }
    function moveRight(target) {
      if (left.value === 0) {
        left.value = len.value * imageWidth.value;
      }
      targetMove.value = target;
      moveRaf.value = requestAnimationFrame(moveRightEffect);
    }
    function onSwitch(n) {
      if (activeSwitcher.value !== n) {
        switched.value = true;
        const target = (n - 1) * imageWidth.value;
        if (n < activeSwitcher.value) {
          activeSwitcher.value = n;
          goRight(target);
        }
        if (n > activeSwitcher.value) {
          activeSwitcher.value = n;
          goLeft(target);
        }
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-slider",
        ref_key: "carousel",
        ref: carousel,
        style: normalizeStyle(`width: ${unref(carouselWidth)}; height: ${unref(carouselHeight)};`),
        onMouseenter: _cache[2] || (_cache[2] = ($event) => __props.pauseOnMouseEnter ? onStop() : (e) => e.preventDefault()),
        onMouseleave: _cache[3] || (_cache[3] = ($event) => __props.pauseOnMouseEnter ? onStart() : (e) => e.preventDefault())
      }, [
        createElementVNode("div", {
          class: normalizeClass({ "transition": transition.value }),
          style: normalizeStyle(`width: ${unref(totalWidth)}px; height: 100%; will-change: transform; transform: translateX(${-left.value}px);`)
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.imageData, (image, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "m-image"
            }, [
              createElementVNode("a", {
                href: image.link ? image.link : "javascript:;",
                target: image.link ? "_blank" : "_self",
                class: "m-link"
              }, [
                (openBlock(), createElementBlock("img", {
                  src: image.imgUrl,
                  key: image.imgUrl,
                  alt: image.title,
                  class: "u-img",
                  style: normalizeStyle(`width: ${imageWidth.value}px; height: ${imageHeight.value}px;`)
                }, null, 12, _hoisted_2$o))
              ], 8, _hoisted_1$s)
            ]);
          }), 128)),
          unref(len) ? (openBlock(), createElementBlock("div", _hoisted_3$l, [
            createElementVNode("a", {
              href: __props.imageData[0].link ? __props.imageData[0].link : "javascript:;",
              target: __props.imageData[0].link ? "_blank" : "_self",
              class: "m-link"
            }, [
              (openBlock(), createElementBlock("img", {
                src: __props.imageData[0].imgUrl,
                key: __props.imageData[0].imgUrl,
                alt: __props.imageData[0].title,
                class: "u-img",
                style: normalizeStyle(`width: ${imageWidth.value}px; height: ${imageHeight.value}px;`)
              }, null, 12, _hoisted_5$e))
            ], 8, _hoisted_4$i)
          ])) : createCommentVNode("", true)
        ], 6),
        __props.navigation ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          (openBlock(), createElementBlock("svg", {
            class: "arrow-left",
            onClick: _cache[0] || (_cache[0] = ($event) => onLeftArrow((activeSwitcher.value + unref(len) - 2) % unref(len) * imageWidth.value)),
            viewBox: "64 64 896 896",
            "data-icon": "left-circle",
            "aria-hidden": "true",
            focusable: "false"
          }, _hoisted_8$b)),
          (openBlock(), createElementBlock("svg", {
            class: "arrow-right",
            onClick: _cache[1] || (_cache[1] = ($event) => onRightArrow(activeSwitcher.value * imageWidth.value)),
            viewBox: "64 64 896 896",
            "data-icon": "right-circle",
            "aria-hidden": "true",
            focusable: "false"
          }, _hoisted_11$7))
        ], 64)) : createCommentVNode("", true),
        __props.pagination ? (openBlock(), createElementBlock("div", _hoisted_12$6, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(len), (n) => {
            return openBlock(), createElementBlock("div", {
              onClick: ($event) => onSwitch(n),
              class: normalizeClass(["u-rect", { "active": activeSwitcher.value === n }]),
              key: n
            }, null, 10, _hoisted_13$5);
          }), 128))
        ])) : createCommentVNode("", true)
      ], 36);
    };
  }
});
const Carousel_vue_vue_type_style_index_0_scoped_ede458a2_lang = "";
const Carousel = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__scopeId", "data-v-ede458a2"]]);
Carousel.install = (app) => {
  app.component(Carousel.__name, Carousel);
};
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "Cascader",
  props: {
    options: {
      // 可选项数据源
      type: Array,
      default: () => []
    },
    selectedValue: {
      // （v-model）级联选中项
      type: Array,
      default: () => []
    },
    label: {
      // 下拉字典项的文本字段名
      type: String,
      default: "label"
    },
    value: {
      // 下拉字典项的值字段名
      type: String,
      default: "value"
    },
    children: {
      // 下拉字典项的后代字段名
      type: String,
      default: "children"
    },
    changeOnSelect: {
      // 当此项为true时，点选每级菜单选项值（v-model）都会发生变化；否则只有选择三级选项后选项值才会变化
      type: Boolean,
      default: false
    },
    zIndex: {
      // 下拉层级
      type: Number,
      default: 1
    },
    gap: {
      // 级联下拉框相互间隙宽度，单位px，默认8px
      type: Number,
      default: 8
    },
    width: {
      // 三级下拉各自宽度
      type: [Number, Array],
      default: 160
    },
    height: {
      // 下拉框高度
      type: Number,
      default: 36
    },
    disabled: {
      // 三级各自是否禁用
      type: [Boolean, Array],
      default: false
    },
    placeholder: {
      // 三级下拉各自占位文本
      type: [String, Array],
      default: "请选择"
    },
    num: {
      // 下拉面板最多能展示的下拉项数，超过后滚动显示
      type: Number,
      default: 6
    }
  },
  emits: ["update:selectedValue", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const values = ref(props.selectedValue);
    const labels = ref([]);
    const firstOptions = ref(props.options);
    const secondOptions = ref([]);
    const thirdOptions = ref([]);
    watch(
      () => props.selectedValue,
      (to) => {
        values.value = to;
        if (to.length) {
          initCascader(to);
          initLabels(to);
        }
      }
    );
    onMounted(() => {
      if (props.selectedValue.length) {
        initCascader(props.selectedValue);
        initLabels(props.selectedValue);
      }
    });
    function findChildren(options, index) {
      const len = options.length;
      for (let i = 0; i < len; i++) {
        if (options[i][props.value] === props.selectedValue[index]) {
          return options[i][props.children] || [];
        }
      }
      return [];
    }
    function initCascader(selectedValue) {
      secondOptions.value = findChildren(firstOptions.value, 0);
      thirdOptions.value = [];
      if (selectedValue.length > 1) {
        thirdOptions.value = findChildren(secondOptions.value, 1);
      }
    }
    function findLabel(options, index) {
      const len = options.length;
      for (let i = 0; i < len; i++) {
        if (options[i][props.value] === props.selectedValue[index]) {
          return options[i][props.label];
        }
      }
      return props.selectedValue[index];
    }
    function initLabels(selectedValue) {
      labels.value[0] = findLabel(firstOptions.value, 0);
      if (selectedValue.length > 1) {
        labels.value[1] = findLabel(secondOptions.value, 1);
      }
      if (selectedValue.length > 2) {
        labels.value[2] = findLabel(thirdOptions.value, 2);
      }
    }
    function onFirstChange(value, label, index) {
      values.value = [value];
      labels.value = [label];
      if (props.changeOnSelect) {
        emits("update:selectedValue", values.value);
        emits("change", values.value, labels.value);
      }
      secondOptions.value = firstOptions.value[index][props.children] || [];
      thirdOptions.value = [];
    }
    function onSecondChange(value, label, index) {
      values.value = [values.value[0], value];
      labels.value = [labels.value[0], label];
      if (props.changeOnSelect) {
        emits("update:selectedValue", values.value);
        emits("change", values.value, labels.value);
      }
      thirdOptions.value = secondOptions.value[index][props.children] || [];
    }
    function onThirdChange(value, label) {
      values.value[2] = value;
      labels.value[2] = label;
      emits("update:selectedValue", values.value);
      emits("change", values.value, labels.value);
    }
    return (_ctx, _cache) => {
      const _component_Select = resolveComponent("Select");
      return openBlock(), createElementBlock("div", {
        class: "m-cascader-wrap",
        style: normalizeStyle(`height: ${__props.height}px;`)
      }, [
        createVNode(_component_Select, {
          style: normalizeStyle(`margin-right: ${__props.gap}px; z-index: ${__props.zIndex};`),
          options: firstOptions.value,
          selectedValue: __props.selectedValue[0],
          "onUpdate:selectedValue": _cache[0] || (_cache[0] = ($event) => __props.selectedValue[0] = $event),
          label: __props.label,
          value: __props.value,
          disabled: Array.isArray(__props.disabled) ? __props.disabled[0] : __props.disabled,
          width: Array.isArray(__props.width) ? __props.width[0] : __props.width,
          height: __props.height,
          num: __props.num,
          placeholder: Array.isArray(__props.placeholder) ? __props.placeholder[0] : __props.placeholder,
          onChange: onFirstChange
        }, null, 8, ["style", "options", "selectedValue", "label", "value", "disabled", "width", "height", "num", "placeholder"]),
        createVNode(_component_Select, {
          style: normalizeStyle(`margin-right: ${__props.gap}px; z-index: ${__props.zIndex};`),
          options: secondOptions.value,
          selectedValue: __props.selectedValue[1],
          "onUpdate:selectedValue": _cache[1] || (_cache[1] = ($event) => __props.selectedValue[1] = $event),
          label: __props.label,
          value: __props.value,
          disabled: Array.isArray(__props.disabled) ? __props.disabled[1] : __props.disabled,
          width: Array.isArray(__props.width) ? __props.width[1] : __props.width,
          height: 36,
          num: __props.num,
          placeholder: Array.isArray(__props.placeholder) ? __props.placeholder[1] : __props.placeholder,
          onChange: onSecondChange
        }, null, 8, ["style", "options", "selectedValue", "label", "value", "disabled", "width", "num", "placeholder"]),
        createVNode(_component_Select, {
          style: normalizeStyle(`z-index: ${__props.zIndex};`),
          options: thirdOptions.value,
          selectedValue: __props.selectedValue[2],
          "onUpdate:selectedValue": _cache[2] || (_cache[2] = ($event) => __props.selectedValue[2] = $event),
          label: __props.label,
          value: __props.value,
          disabled: Array.isArray(__props.disabled) ? __props.disabled[2] : __props.disabled,
          width: Array.isArray(__props.width) ? __props.width[2] : __props.width,
          height: __props.height,
          num: __props.num,
          placeholder: Array.isArray(__props.placeholder) ? __props.placeholder[2] : __props.placeholder,
          onChange: onThirdChange
        }, null, 8, ["style", "options", "selectedValue", "label", "value", "disabled", "width", "height", "num", "placeholder"])
      ], 4);
    };
  }
});
const Cascader_vue_vue_type_style_index_0_scoped_0ffae127_lang = "";
const Cascader = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-0ffae127"]]);
Cascader.install = (app) => {
  app.component(Cascader.__name, Cascader);
};
const _hoisted_1$r = ["onClick"];
const _hoisted_2$n = { class: "u-label" };
const _hoisted_3$k = { class: "u-label" };
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "Checkbox",
  props: {
    options: { default: () => [] },
    disabled: { type: Boolean, default: false },
    vertical: { type: Boolean, default: false },
    value: { default: () => [] },
    gap: { default: 8 },
    indeterminate: { type: Boolean, default: false },
    checked: { type: Boolean, default: false }
  },
  emits: ["update:value", "update:checked", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const sum = computed(() => {
      return props.options.length;
    });
    const checkedValue = ref(props.value);
    watch(
      () => props.value,
      (to) => {
        checkedValue.value = to;
      }
    );
    const styleObject = computed(() => {
      if (props.vertical) {
        return {
          marginBottom: props.gap + "px"
        };
      } else {
        return {
          marginRight: props.gap + "px"
        };
      }
    });
    function onClick(value) {
      if (props.value.includes(value)) {
        const newVal = checkedValue.value.filter((target) => target !== value);
        emits("update:value", newVal);
        emits("change", newVal);
      } else {
        const newVal = [...checkedValue.value, value];
        emits("update:value", newVal);
        emits("change", newVal);
      }
    }
    function onCheckAll() {
      emits("update:checked", !props.checked);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-checkbox", { "vertical": __props.vertical }])
      }, [
        unref(sum) ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(__props.options, (option, index) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["m-checkbox-wrap", { "disabled": __props.disabled || option.disabled }]),
            style: normalizeStyle(unref(sum) !== index + 1 ? unref(styleObject) : ""),
            onClick: ($event) => __props.disabled || option.disabled ? (e) => e.preventDefault() : onClick(option.value),
            key: index
          }, [
            createElementVNode("span", {
              class: normalizeClass(["u-checkbox", { "u-checkbox-checked": checkedValue.value.includes(option.value) }])
            }, null, 2),
            createElementVNode("span", _hoisted_2$n, [
              renderSlot(_ctx.$slots, "default", {
                label: option.label
              }, () => [
                createTextVNode(toDisplayString(option.label), 1)
              ], true)
            ])
          ], 14, _hoisted_1$r);
        }), 128)) : (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["m-checkbox-wrap", { "disabled": __props.disabled }]),
          onClick: onCheckAll
        }, [
          createElementVNode("span", {
            class: normalizeClass(["u-checkbox", { "u-checkbox-checked": __props.checked && !__props.indeterminate, "indeterminate": __props.indeterminate }])
          }, null, 2),
          createElementVNode("span", _hoisted_3$k, [
            renderSlot(_ctx.$slots, "default", {}, () => [
              createTextVNode("Check all")
            ], true)
          ])
        ], 2))
      ], 2);
    };
  }
});
const Checkbox_vue_vue_type_style_index_0_scoped_e8e43d1d_lang = "";
const Checkbox = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-e8e43d1d"]]);
Checkbox.install = (app) => {
  app.component(Checkbox.__name, Checkbox);
};
const _withScopeId$e = (n) => (pushScopeId("data-v-4a252585"), n = n(), popScopeId(), n);
const _hoisted_1$q = { class: "m-collapse" };
const _hoisted_2$m = ["onClick"];
const _hoisted_3$j = {
  key: 0,
  focusable: "false",
  class: "u-arrow",
  "data-icon": "right",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
const _hoisted_4$h = /* @__PURE__ */ _withScopeId$e(() => /* @__PURE__ */ createElementVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" }, null, -1));
const _hoisted_5$d = [
  _hoisted_4$h
];
const _hoisted_6$d = { class: "u-lang" };
const _hoisted_7$c = ["id", "innerHTML"];
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "Collapse",
  props: {
    collapseData: { default: () => [] },
    activeKey: { default: null },
    copyable: { type: Boolean, default: false },
    lang: { default: "" },
    fontSize: { default: 0 },
    headerFontSize: { default: 14 },
    textFontSize: { default: 14 },
    showArrow: { type: Boolean, default: true }
  },
  emits: ["update:activeKey", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    onMounted(() => {
      getCollapseHeight();
    });
    const collapseHeight = ref([]);
    function getCollapseHeight() {
      const len = props.collapseData.length;
      for (let n = 0; n < len; n++) {
        const el = document.getElementById(`${n}`);
        collapseHeight.value.push(el == null ? void 0 : el.offsetHeight);
      }
    }
    function dealEmit(value) {
      emits("update:activeKey", value);
      emits("change", value);
    }
    function onClick(key) {
      if (activeJudge(key)) {
        if (Array.isArray(props.activeKey)) {
          const res = props.activeKey.filter((actKey) => actKey !== key);
          dealEmit(res);
        } else {
          dealEmit(null);
        }
      } else {
        if (Array.isArray(props.activeKey)) {
          dealEmit([...props.activeKey, key]);
        } else {
          dealEmit(key);
        }
      }
    }
    function activeJudge(key) {
      if (Array.isArray(props.activeKey)) {
        return props.activeKey.includes(key);
      } else {
        return props.activeKey === key;
      }
    }
    const copyTxt = ref("Copy");
    function onCopy(index) {
      const el = document.getElementById(`${index}`);
      navigator.clipboard.writeText((el == null ? void 0 : el.innerHTML) || "").then(() => {
        copyTxt.value = "Copied";
        rafTimeout(() => {
          copyTxt.value = "Copy";
        }, 3e3);
      }, (err) => {
        copyTxt.value = err;
      });
    }
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock("div", _hoisted_1$q, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.collapseData, (data, index) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["m-collapse-item", { "u-collapse-item-active": activeJudge(data.key || index) }]),
            key: index
          }, [
            createElementVNode("div", {
              class: "u-collapse-header",
              onClick: ($event) => onClick(data.key || index)
            }, [
              __props.showArrow ? (openBlock(), createElementBlock("svg", _hoisted_3$j, _hoisted_5$d)) : createCommentVNode("", true),
              createElementVNode("div", {
                class: normalizeClass(["u-header", { ml24: __props.showArrow }]),
                style: normalizeStyle(`font-size: ${__props.fontSize || __props.headerFontSize}px;`)
              }, [
                renderSlot(_ctx.$slots, "header", {
                  header: data.header,
                  index
                }, () => [
                  createTextVNode(toDisplayString(data.header || "--"), 1)
                ], true)
              ], 6)
            ], 8, _hoisted_2$m),
            createElementVNode("div", {
              class: normalizeClass(["u-collapse-content", { "u-collapse-copyable": __props.copyable }]),
              style: normalizeStyle(`height: ${activeJudge(data.key || index) ? collapseHeight.value[index] : 0}px;`)
            }, [
              createElementVNode("div", _hoisted_6$d, [
                renderSlot(_ctx.$slots, "lang", {
                  lang: __props.lang,
                  index
                }, () => [
                  createTextVNode(toDisplayString(__props.lang), 1)
                ], true)
              ]),
              createVNode(_component_Button, {
                size: "small",
                class: "u-copy",
                type: "primary",
                onClick: ($event) => onCopy(index)
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(copyTxt.value), 1)
                ]),
                _: 2
              }, 1032, ["onClick"]),
              createElementVNode("p", {
                class: "u-content",
                style: normalizeStyle(`font-size: ${__props.fontSize || __props.textFontSize}px;`),
                id: `${index}`,
                innerHTML: data.text
              }, null, 12, _hoisted_7$c)
            ], 6)
          ], 2);
        }), 128))
      ]);
    };
  }
});
const Collapse_vue_vue_type_style_index_0_scoped_4a252585_lang = "";
const Collapse = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-4a252585"]]);
Collapse.install = (app) => {
  app.component(Collapse.__name, Collapse);
};
const _hoisted_1$p = { class: "m-countdown" };
const _hoisted_2$l = { class: "u-title" };
const _hoisted_3$i = { class: "u-time" };
const _hoisted_4$g = { key: 2 };
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "Countdown",
  props: {
    countdown: { default: 0 },
    title: { default: "Countdown" },
    format: { default: "HH:mm:ss" },
    prefix: { default: "" },
    suffix: { default: "" },
    finishedText: { default: "Finished" }
  },
  emits: ["finish"],
  setup(__props, { emit }) {
    const props = __props;
    const futureTime = ref();
    const restTime = ref();
    const showType = computed(() => {
      return {
        showMillisecond: props.format.includes("SSS"),
        showYear: props.format.includes("Y"),
        showMonth: props.format.includes("M"),
        showDay: props.format.includes("D"),
        showHour: props.format.includes("H"),
        showMinute: props.format.includes("m"),
        showSecond: props.format.includes("s")
      };
    });
    function fixedTwo(value) {
      return value < 10 ? "0" + value : String(value);
    }
    function timeFormat(time) {
      let showTime = props.format;
      if (showType.value.showMillisecond) {
        var S = time % 1e3;
        showTime = showTime.replace("SSS", "0".repeat(3 - String(S).length) + S);
      }
      time = Math.floor(time / 1e3);
      if (showType.value.showYear) {
        var Y = Math.floor(time / (60 * 60 * 24 * 30 * 12));
        showTime = showTime.includes("YY") ? showTime.replace("YY", fixedTwo(Y)) : showTime.replace("Y", String(Y));
      } else {
        var Y = 0;
      }
      if (showType.value.showMonth) {
        time = time - Y * 60 * 60 * 24 * 30 * 12;
        var M = Math.floor(time / (60 * 60 * 24 * 30));
        showTime = showTime.includes("MM") ? showTime.replace("MM", fixedTwo(M)) : showTime.replace("M", String(M));
      } else {
        var M = 0;
      }
      if (showType.value.showDay) {
        time = time - M * 60 * 60 * 24 * 30;
        var D = Math.floor(time / (60 * 60 * 24));
        showTime = showTime.includes("DD") ? showTime.replace("DD", fixedTwo(D)) : showTime.replace("D", String(D));
      } else {
        var D = 0;
      }
      if (showType.value.showHour) {
        time = time - D * 60 * 60 * 24;
        var H = Math.floor(time / (60 * 60));
        showTime = showTime.includes("HH") ? showTime.replace("HH", fixedTwo(H)) : showTime.replace("H", String(H));
      } else {
        var H = 0;
      }
      if (showType.value.showMinute) {
        time = time - H * 60 * 60;
        var m = Math.floor(time / 60);
        showTime = showTime.includes("mm") ? showTime.replace("mm", fixedTwo(m)) : showTime.replace("m", String(m));
      } else {
        var m = 0;
      }
      if (showType.value.showSecond) {
        var s = time - m * 60;
        showTime = showTime.includes("ss") ? showTime.replace("ss", fixedTwo(s)) : showTime.replace("s", String(s));
      }
      return showTime;
    }
    function CountDown() {
      if (futureTime.value > Date.now()) {
        restTime.value = futureTime.value - Date.now();
        requestAnimationFrame$1(CountDown);
      } else {
        restTime.value = 0;
        emit("finish");
      }
    }
    onMounted(() => {
      if (props.countdown > Date.now()) {
        futureTime.value = props.countdown;
      } else {
        futureTime.value = props.countdown + Date.now();
      }
      requestAnimationFrame$1(CountDown);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$p, [
        createElementVNode("div", _hoisted_2$l, [
          renderSlot(_ctx.$slots, "title", {}, () => [
            createTextVNode(toDisplayString(props.title), 1)
          ], true)
        ]),
        createElementVNode("div", _hoisted_3$i, [
          restTime.value > 0 ? renderSlot(_ctx.$slots, "prefix", { key: 0 }, () => [
            createTextVNode(toDisplayString(__props.prefix), 1)
          ], true) : createCommentVNode("", true),
          __props.finishedText && restTime.value === 0 ? renderSlot(_ctx.$slots, "finish", { key: 1 }, () => [
            createTextVNode(toDisplayString(__props.finishedText), 1)
          ], true) : (openBlock(), createElementBlock("span", _hoisted_4$g, toDisplayString(timeFormat(restTime.value)), 1)),
          restTime.value > 0 ? renderSlot(_ctx.$slots, "suffix", { key: 3 }, () => [
            createTextVNode(toDisplayString(__props.suffix), 1)
          ], true) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});
const Countdown_vue_vue_type_style_index_0_scoped_91d39bb0_lang = "";
const Countdown = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-91d39bb0"]]);
Countdown.install = (app) => {
  app.component(Countdown.__name, Countdown);
};
const main = "";
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "DatePicker",
  props: {
    inheritAttrs: { type: Boolean, default: false },
    width: { default: 180 },
    mode: { default: "date" },
    showTime: { type: Boolean, default: false },
    showToday: { type: Boolean, default: false },
    date: { default: 0 }
  },
  emits: ["update:date"],
  setup(__props, { emit }) {
    const props = __props;
    const date = ref(props.date);
    watch(date, (to) => {
      emit("update:date", to);
    });
    const modelType = computed(() => {
      if (["time", "month", "year"].includes(props.mode)) {
        return "";
      } else {
        return "timestamp";
      }
    });
    const time = computed(() => {
      return props.mode === "time";
    });
    const week = computed(() => {
      return props.mode === "week";
    });
    const month = computed(() => {
      return props.mode === "month";
    });
    const year = computed(() => {
      return props.mode === "year";
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-datepicker",
        style: normalizeStyle(`width: ${__props.width}px;`)
      }, [
        createVNode(unref(VueDatePicker), mergeProps({
          modelValue: date.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => date.value = $event),
          locale: "zh-CN",
          "month-change-on-scroll": false,
          "enable-time-picker": __props.showTime,
          "time-picker": unref(time),
          "week-picker": unref(week),
          "month-picker": unref(month),
          "year-picker": unref(year),
          "show-now-button": __props.showToday,
          "auto-apply": "",
          "text-input": "",
          "model-type": unref(modelType),
          "day-names": ["一", "二", "三", "四", "五", "六", "七"],
          "now-button-label": "今天"
        }, _ctx.$attrs), null, 16, ["modelValue", "enable-time-picker", "time-picker", "week-picker", "month-picker", "year-picker", "show-now-button", "model-type"])
      ], 4);
    };
  }
});
const DatePicker_vue_vue_type_style_index_0_scoped_5c03b3bc_lang = "";
const DatePicker = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-5c03b3bc"]]);
DatePicker.install = (app) => {
  app.component(DatePicker.__name, DatePicker);
};
const _withScopeId$d = (n) => (pushScopeId("data-v-7f5f8cf6"), n = n(), popScopeId(), n);
const _hoisted_1$o = ["onClick"];
const _hoisted_2$k = { class: "m-spin-dot" };
const _hoisted_3$h = /* @__PURE__ */ _withScopeId$d(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_4$f = /* @__PURE__ */ _withScopeId$d(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_5$c = /* @__PURE__ */ _withScopeId$d(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_6$c = /* @__PURE__ */ _withScopeId$d(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_7$b = [
  _hoisted_3$h,
  _hoisted_4$f,
  _hoisted_5$c,
  _hoisted_6$c
];
const _hoisted_8$a = /* @__PURE__ */ _withScopeId$d(() => /* @__PURE__ */ createElementVNode("path", { d: "M290 236.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0 0 13.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 0 0 0 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 0 0-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z" }, null, -1));
const _hoisted_9$a = [
  _hoisted_8$a
];
const _hoisted_10$7 = /* @__PURE__ */ _withScopeId$d(() => /* @__PURE__ */ createElementVNode("path", { d: "M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 0 0 0 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 0 0 391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 0 0-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z" }, null, -1));
const _hoisted_11$6 = [
  _hoisted_10$7
];
const _hoisted_12$5 = /* @__PURE__ */ _withScopeId$d(() => /* @__PURE__ */ createElementVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1));
const _hoisted_13$4 = [
  _hoisted_12$5
];
const _hoisted_14$4 = { class: "m-dialog-header" };
const _hoisted_15$4 = { class: "u-head" };
const _hoisted_16$4 = { class: "m-dialog-footer" };
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "Dialog",
  props: {
    title: {
      // 标题 string | slot
      type: String,
      default: "提示"
    },
    content: {
      // 内容 string | slot
      type: String,
      default: ""
    },
    width: {
      // 宽度，默认640
      type: Number,
      default: 640
    },
    height: {
      // 高度，默认480
      type: Number,
      default: 480
    },
    switchFullscreen: {
      // 是否允许切换全屏，允许后右上角会出现一个按钮
      type: Boolean,
      default: false
    },
    cancelText: {
      // 取消按钮文字
      type: String,
      default: "取消"
    },
    okText: {
      // 确认按钮文字
      type: String,
      default: "确定"
    },
    footer: {
      // 是否显示底部按钮，默认不显示
      type: Boolean,
      default: false
    },
    center: {
      // 水平垂直居中：true  固定高度水平居中：false
      type: Boolean,
      default: true
    },
    top: {
      // 固定高度水平居中时，距顶部高度
      type: Number,
      default: 100
    },
    loading: {
      // 加载中
      type: Boolean,
      default: false
    },
    visible: {
      // 对话框是否可见
      type: Boolean,
      default: false
    }
  },
  emits: ["close", "cancel", "ok"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const fullScreen = ref(false);
    const dialogWidth = computed(() => {
      if (fullScreen.value) {
        return "100%";
      } else {
        return props.width + "px";
      }
    });
    const dialogHeight = computed(() => {
      if (fullScreen.value) {
        return "100vh";
      } else {
        return props.height + "px";
      }
    });
    watch(
      () => props.visible,
      (to) => {
        if (!to) {
          fullScreen.value = false;
        }
      }
    );
    function onBlur() {
      if (!props.loading) {
        emits("close");
      }
    }
    function onFullScreen() {
      fullScreen.value = !fullScreen.value;
    }
    function onClose() {
      emits("close");
    }
    function onCancel() {
      emits("cancel");
    }
    function onConfirm() {
      emits("ok");
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, null, {
        default: withCtx(() => [
          withDirectives(createElementVNode("div", {
            class: "m-dialog-mask",
            onClick: withModifiers(onBlur, ["self"])
          }, [
            createElementVNode("div", {
              class: normalizeClass(["m-dialog", __props.center ? "relative-hv-center" : "top-center"]),
              style: normalizeStyle(`width: ${unref(dialogWidth)}; height: ${unref(dialogHeight)}; top: ${!__props.center ? __props.top + "px" : "50%"}`)
            }, [
              createElementVNode("div", {
                class: normalizeClass(["m-dialog-content", { loading: __props.loading }])
              }, [
                withDirectives(createElementVNode("div", _hoisted_2$k, _hoisted_7$b, 512), [
                  [vShow, __props.loading]
                ]),
                withDirectives((openBlock(), createElementBlock("svg", {
                  onClick: onFullScreen,
                  class: "u-screen",
                  viewBox: "64 64 896 896",
                  "data-icon": "fullscreen",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_9$a, 512)), [
                  [vShow, !fullScreen.value && __props.switchFullscreen]
                ]),
                withDirectives((openBlock(), createElementBlock("svg", {
                  onClick: onFullScreen,
                  class: "u-screen",
                  viewBox: "64 64 896 896",
                  "data-icon": "fullscreen-exit",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_11$6, 512)), [
                  [vShow, fullScreen.value && __props.switchFullscreen]
                ]),
                (openBlock(), createElementBlock("svg", {
                  onClick: onClose,
                  class: "u-close",
                  viewBox: "64 64 896 896",
                  "data-icon": "close",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_13$4)),
                createElementVNode("div", _hoisted_14$4, [
                  renderSlot(_ctx.$slots, "title", {}, () => [
                    createElementVNode("div", _hoisted_15$4, toDisplayString(__props.title), 1)
                  ], true)
                ]),
                createElementVNode("div", {
                  class: "m-dialog-body",
                  style: normalizeStyle(`height: calc(${unref(dialogHeight)} - ${__props.footer ? "158px" : "103px"});`)
                }, [
                  renderSlot(_ctx.$slots, "default", {}, () => [
                    createTextVNode(toDisplayString(__props.content), 1)
                  ], true)
                ], 4),
                withDirectives(createElementVNode("div", _hoisted_16$4, [
                  createElementVNode("button", {
                    class: "u-cancel",
                    onClick: onCancel
                  }, toDisplayString(__props.cancelText), 1),
                  createElementVNode("button", {
                    class: "u-confirm",
                    onClick: onConfirm
                  }, toDisplayString(__props.okText), 1)
                ], 512), [
                  [vShow, __props.footer]
                ])
              ], 2)
            ], 6)
          ], 8, _hoisted_1$o), [
            [vShow, __props.visible]
          ])
        ]),
        _: 3
      });
    };
  }
});
const Dialog_vue_vue_type_style_index_0_scoped_7f5f8cf6_lang = "";
const Dialog = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-7f5f8cf6"]]);
Dialog.install = (app) => {
  app.component(Dialog.__name, Dialog);
};
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "Divider",
  props: {
    dashed: { type: Boolean, default: false },
    orientation: { default: "center" },
    orientationMargin: { default: "" }
  },
  setup(__props) {
    const props = __props;
    const text = ref();
    const showText = ref(true);
    const margin = computed(() => {
      if (props.orientationMargin !== "") {
        if (typeof props.orientationMargin === "number") {
          return props.orientationMargin + "px";
        } else {
          return props.orientationMargin;
        }
      }
    });
    onMounted(() => {
      if (!text.value.offsetHeight) {
        showText.value = false;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          `m-divider ${__props.orientation}`,
          {
            dashed: __props.dashed,
            margin24: !showText.value,
            marginLeft: __props.orientationMargin !== "" && __props.orientation === "left",
            marginRight: __props.orientationMargin !== "" && __props.orientation === "right"
          }
        ])
      }, [
        __props.orientation === "left" ? withDirectives((openBlock(), createElementBlock("span", {
          key: 0,
          class: "u-text",
          style: normalizeStyle(`margin-left: ${unref(margin)};`),
          ref_key: "text",
          ref: text
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 4)), [
          [vShow, showText.value]
        ]) : __props.orientation === "right" ? withDirectives((openBlock(), createElementBlock("span", {
          key: 1,
          class: "u-text",
          style: normalizeStyle(`margin-right: ${unref(margin)};`),
          ref_key: "text",
          ref: text
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 4)), [
          [vShow, showText.value]
        ]) : withDirectives((openBlock(), createElementBlock("span", {
          key: 2,
          class: "u-text",
          ref_key: "text",
          ref: text
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 512)), [
          [vShow, showText.value]
        ])
      ], 2);
    };
  }
});
const Divider_vue_vue_type_style_index_0_scoped_607f6348_lang = "";
const Divider = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-607f6348"]]);
Divider.install = (app) => {
  app.component(Divider.__name, Divider);
};
const _hoisted_1$n = { class: "m-empty" };
const _hoisted_2$j = /* @__PURE__ */ createStaticVNode('<g fill="none" fill-rule="evenodd" data-v-00839dc5><g transform="translate(24 31.67)" data-v-00839dc5><ellipse fill-opacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668" data-v-00839dc5></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2" data-v-00839dc5></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" fill="url(#linearGradient-1)" transform="translate(13.56)" data-v-00839dc5></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7" data-v-00839dc5></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="#DCE0E6" data-v-00839dc5></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" fill="#DCE0E6" data-v-00839dc5></path><g transform="translate(149.65 15.383)" fill="#FFF" data-v-00839dc5><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" data-v-00839dc5></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" data-v-00839dc5></path></g></g>', 1);
const _hoisted_3$g = [
  _hoisted_2$j
];
const _hoisted_4$e = /* @__PURE__ */ createStaticVNode('<g transform="translate(0 1)" fill="none" fill-rule="evenodd" data-v-00839dc5><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7" data-v-00839dc5></ellipse><g fill-rule="nonzero" stroke="#d9d9d9" data-v-00839dc5><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" data-v-00839dc5></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa" data-v-00839dc5></path></g></g>', 1);
const _hoisted_5$b = [
  _hoisted_4$e
];
const _hoisted_6$b = ["src"];
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "Empty",
  props: {
    description: { default: "暂无数据" },
    image: { default: "1" },
    imageStyle: { default: () => {
      return {};
    } }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$n, [
        __props.image === "1" ? (openBlock(), createElementBlock("svg", {
          key: 0,
          class: "u-empty-1",
          style: normalizeStyle(__props.imageStyle),
          viewBox: "0 0 184 152",
          xmlns: "http://www.w3.org/2000/svg"
        }, _hoisted_3$g, 4)) : __props.image === "2" ? (openBlock(), createElementBlock("svg", {
          key: 1,
          class: "u-empty-2",
          style: normalizeStyle(__props.imageStyle),
          viewBox: "0 0 64 41",
          xmlns: "http://www.w3.org/2000/svg"
        }, _hoisted_5$b, 4)) : renderSlot(_ctx.$slots, "default", { key: 2 }, () => [
          createElementVNode("img", {
            src: __props.image,
            style: normalizeStyle(__props.imageStyle),
            alt: "image"
          }, null, 12, _hoisted_6$b)
        ], true),
        __props.description ? (openBlock(), createElementBlock("p", {
          key: 3,
          class: normalizeClass(["u-description", { gray: __props.image === "2" }])
        }, [
          renderSlot(_ctx.$slots, "description", {}, () => [
            createTextVNode(toDisplayString(__props.description), 1)
          ], true)
        ], 2)) : createCommentVNode("", true)
      ]);
    };
  }
});
const Empty_vue_vue_type_style_index_0_scoped_00839dc5_lang = "";
const Empty = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-00839dc5"]]);
Empty.install = (app) => {
  app.component(Empty.__name, Empty);
};
const _withScopeId$c = (n) => (pushScopeId("data-v-79125d82"), n = n(), popScopeId(), n);
const _hoisted_1$m = { class: "m-image-wrap" };
const _hoisted_2$i = ["src", "alt"];
const _hoisted_3$f = { class: "m-image-mask-info" };
const _hoisted_4$d = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-eye",
  focusable: "false",
  "data-icon": "eye",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" })
], -1));
const _hoisted_5$a = { class: "m-preview-mask" };
const _hoisted_6$a = ["onClick"];
const _hoisted_7$a = { class: "m-preview-body" };
const _hoisted_8$9 = { class: "m-preview-operations" };
const _hoisted_9$9 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "close",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })
], -1));
const _hoisted_10$6 = [
  _hoisted_9$9
];
const _hoisted_11$5 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "zoom-in",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" })
], -1));
const _hoisted_12$4 = [
  _hoisted_11$5
];
const _hoisted_13$3 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "zoom-out",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" })
], -1));
const _hoisted_14$3 = [
  _hoisted_13$3
];
const _hoisted_15$3 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "rotate-right",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-.4-12.6 6.1l-.2 64c-118.6.5-235.8 53.4-314.6 154.2A399.75 399.75 0 00123.5 631h74.9c-.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8z" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H396V494h440v326z" })
], -1));
const _hoisted_16$3 = [
  _hoisted_15$3
];
const _hoisted_17$2 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "rotate-left",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H188V494h440v326z" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7.4 12.6-6.1v-63.9c12.9.1 25.9.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8a325.95 325.95 0 016.5 140.9h74.9c14.8-103.6-11.3-213-81-302.3z" })
], -1));
const _hoisted_18$2 = [
  _hoisted_17$2
];
const _hoisted_19$2 = ["onMousedown"];
const _hoisted_20$2 = ["src", "alt"];
const _hoisted_21$1 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ createElementVNode("svg", {
  focusable: "false",
  class: "u-switch",
  "data-icon": "left",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })
], -1));
const _hoisted_22$1 = [
  _hoisted_21$1
];
const _hoisted_23$1 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ createElementVNode("svg", {
  focusable: "false",
  class: "u-switch",
  "data-icon": "right",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" })
], -1));
const _hoisted_24$1 = [
  _hoisted_23$1
];
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "Image",
  props: {
    alt: { default: "image" },
    width: { default: 300 },
    height: { default: "100%" },
    src: { default: "" },
    preview: { default: "预览" },
    zoomRatio: { default: 0.1 },
    minZoomScale: { default: 0.1 },
    maxZoomScale: { default: 10 },
    resetOnDbclick: { type: Boolean, default: true }
  },
  setup(__props) {
    const props = __props;
    const imageWidth = computed(() => {
      if (typeof props.width === "number") {
        return props.width + "px";
      } else {
        return props.width;
      }
    });
    const imageHeight = computed(() => {
      if (typeof props.height === "number") {
        return props.height + "px";
      } else {
        return props.height;
      }
    });
    const images = computed(() => {
      if (Array.isArray(props.src)) {
        return props.src;
      } else {
        return [{
          src: props.src,
          alt: props.alt
        }];
      }
    });
    const previewIndex = ref(0);
    const showPreview = ref(false);
    const rotate = ref(0);
    const scale = ref(1);
    const sourceX = ref(0);
    const sourceY = ref(0);
    const dragX = ref(0);
    const dragY = ref(0);
    const image = ref();
    function onPreview() {
      scale.value = 1;
      rotate.value = 0;
      dragX.value = 0;
      dragY.value = 0;
      showPreview.value = true;
    }
    function onClose() {
      showPreview.value = false;
    }
    function add(num1, num2) {
      const num1DeciStr = String(num1).split(".")[1];
      const num2DeciStr = String(num2).split(".")[1];
      let maxLen = Math.max((num1DeciStr == null ? void 0 : num1DeciStr.length) || 0, (num2DeciStr == null ? void 0 : num2DeciStr.length) || 0);
      let num1Str = num1.toFixed(maxLen);
      let num2Str = num2.toFixed(maxLen);
      const result = +num1Str.replace(".", "") + +num2Str.replace(".", "");
      return result / Math.pow(10, maxLen);
    }
    function onZoomin() {
      if (scale.value + props.zoomRatio > props.maxZoomScale) {
        scale.value = props.maxZoomScale;
      } else {
        scale.value = add(scale.value, props.zoomRatio);
      }
      console.log(scale.value);
    }
    function onZoomout() {
      if (scale.value - props.zoomRatio < props.minZoomScale) {
        scale.value = props.minZoomScale;
      } else {
        scale.value = add(scale.value, -props.zoomRatio);
      }
      console.log(scale.value);
    }
    function onResetZoom() {
      scale.value = 1;
    }
    function onAnticlockwiseRotate() {
      rotate.value -= 90;
    }
    function onClockwiseRotate() {
      rotate.value += 90;
    }
    function onMouseDown(event) {
      const imageRect = image.value.getBoundingClientRect();
      const top = imageRect.top;
      const bottom = imageRect.bottom;
      const right = imageRect.right;
      const left = imageRect.left;
      const viewportWidth = document.body.clientWidth;
      const viewportHeight = document.body.clientHeight;
      sourceX.value = event.clientX;
      sourceY.value = event.clientY;
      const sourceDragX = dragX.value;
      const sourceDragY = dragY.value;
      document.onmousemove = (e) => {
        dragX.value = sourceDragX + e.clientX - sourceX.value;
        dragY.value = sourceDragY + e.clientY - sourceY.value;
      };
      document.onmouseup = () => {
        if (dragX.value < sourceDragX - left) {
          dragX.value = sourceDragX - left;
        }
        if (dragX.value > sourceDragX + viewportWidth - right) {
          dragX.value = sourceDragX + viewportWidth - right;
        }
        if (dragY.value > sourceDragY + viewportHeight - bottom) {
          dragY.value = sourceDragY + viewportHeight - bottom;
        }
        if (dragY.value < sourceDragY - top) {
          dragY.value = sourceDragY - top;
        }
        document.onmousemove = null;
      };
    }
    function onSwitchLeft() {
      previewIndex.value--;
    }
    function onSwitchRight() {
      previewIndex.value++;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$m, [
        createElementVNode("div", {
          class: "m-image",
          style: normalizeStyle(`width: ${unref(imageWidth)}; height: ${unref(imageHeight)};`)
        }, [
          createElementVNode("img", {
            class: "u-image",
            src: unref(images)[previewIndex.value].src,
            alt: unref(images)[previewIndex.value].alt
          }, null, 8, _hoisted_2$i),
          createElementVNode("div", {
            class: "m-image-mask",
            onClick: onPreview
          }, [
            createElementVNode("div", _hoisted_3$f, [
              _hoisted_4$d,
              renderSlot(_ctx.$slots, "preview", {}, () => [
                createTextVNode(toDisplayString(__props.preview), 1)
              ], true)
            ])
          ])
        ], 4),
        createVNode(Transition, { name: "mask" }, {
          default: withCtx(() => [
            withDirectives(createElementVNode("div", _hoisted_5$a, null, 512), [
              [vShow, showPreview.value]
            ])
          ]),
          _: 1
        }),
        createVNode(Transition, { name: "preview" }, {
          default: withCtx(() => [
            withDirectives(createElementVNode("div", {
              class: "m-preview-wrap",
              onClick: withModifiers(onClose, ["self"])
            }, [
              createElementVNode("div", _hoisted_7$a, [
                createElementVNode("div", _hoisted_8$9, [
                  createElementVNode("div", {
                    class: "u-preview-operation",
                    onClick: onClose
                  }, _hoisted_10$6),
                  createElementVNode("div", {
                    class: normalizeClass(["u-preview-operation", { "u-operation-disabled": scale.value === __props.maxZoomScale }]),
                    onClick: onZoomin
                  }, _hoisted_12$4, 2),
                  createElementVNode("div", {
                    class: normalizeClass(["u-preview-operation", { "u-operation-disabled": scale.value === __props.minZoomScale }]),
                    onClick: onZoomout
                  }, _hoisted_14$3, 2),
                  createElementVNode("div", {
                    class: "u-preview-operation",
                    onClick: onClockwiseRotate
                  }, _hoisted_16$3),
                  createElementVNode("div", {
                    class: "u-preview-operation",
                    onClick: onAnticlockwiseRotate
                  }, _hoisted_18$2)
                ]),
                createElementVNode("div", {
                  class: "m-preview-image",
                  style: normalizeStyle(`transform: translate3d(${dragX.value}px, ${dragY.value}px, 0px);`),
                  onMousedown: withModifiers(onMouseDown, ["prevent"])
                }, [
                  createElementVNode("img", {
                    ref_key: "image",
                    ref: image,
                    class: "u-preview-image",
                    style: normalizeStyle(`transform: scale3d(${scale.value}, ${scale.value}, 1) rotate(${rotate.value}deg);`),
                    src: unref(images)[previewIndex.value].src,
                    alt: unref(images)[previewIndex.value].alt,
                    onDblclick: _cache[0] || (_cache[0] = ($event) => __props.resetOnDbclick ? onResetZoom() : (e) => e.preventDefault())
                  }, null, 44, _hoisted_20$2)
                ], 44, _hoisted_19$2),
                unref(images).length > 1 ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(["m-switch-left", { "u-switch-disabled": previewIndex.value === 0 }]),
                  onClick: _cache[1] || (_cache[1] = ($event) => previewIndex.value === 0 ? (e) => e.preventDefault() : onSwitchLeft())
                }, _hoisted_22$1, 2)) : createCommentVNode("", true),
                unref(images).length > 1 ? (openBlock(), createElementBlock("div", {
                  key: 1,
                  class: normalizeClass(["m-switch-right", { "u-switch-disabled": previewIndex.value === unref(images).length - 1 }]),
                  onClick: _cache[2] || (_cache[2] = ($event) => previewIndex.value === unref(images).length - 1 ? (e) => e.preventDefault() : onSwitchRight())
                }, _hoisted_24$1, 2)) : createCommentVNode("", true)
              ])
            ], 8, _hoisted_6$a), [
              [vShow, showPreview.value]
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
const Image_vue_vue_type_style_index_0_scoped_79125d82_lang = "";
const Image$1 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-79125d82"]]);
Image$1.install = (app) => {
  app.component(Image$1.__name, Image$1);
};
const _withScopeId$b = (n) => (pushScopeId("data-v-1071cf51"), n = n(), popScopeId(), n);
const _hoisted_1$l = {
  class: "m-input-number",
  tabindex: "1"
};
const _hoisted_2$h = { class: "u-input-prefix" };
const _hoisted_3$e = { class: "m-input-wrap" };
const _hoisted_4$c = ["onKeyup"];
const _hoisted_5$9 = { class: "m-handler-wrap" };
const _hoisted_6$9 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ createElementVNode("svg", {
  focusable: "false",
  class: "u-icon",
  "data-icon": "up",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z" })
], -1));
const _hoisted_7$9 = [
  _hoisted_6$9
];
const _hoisted_8$8 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ createElementVNode("svg", {
  focusable: "false",
  class: "u-icon",
  "data-icon": "down",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" })
], -1));
const _hoisted_9$8 = [
  _hoisted_8$8
];
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "InputNumber",
  props: {
    min: { default: Infinity },
    max: { default: -Infinity },
    step: { default: 1 },
    prefix: { default: "" },
    keyboard: { type: Boolean, default: true },
    value: { default: 0 }
  },
  emits: ["update:value", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const numValue = ref(props.value);
    function emitValue(value) {
      emits("change", value);
      emits("update:value", value);
    }
    function onChange(e) {
      const value = e.target.value;
      if (!Number.isNaN(parseFloat(value))) {
        numValue.value = parseFloat(value);
        console.log(numValue.value);
        if (numValue.value > props.max) {
          numValue.value = props.max;
        }
        if (numValue.value < props.min) {
          numValue.value = props.min;
        }
        if (numValue.value !== props.value) {
          emitValue(numValue.value);
        }
      } else {
        numValue.value = props.value;
      }
    }
    function onInput(e) {
      const value = e.target.value;
      if (value === "") {
        emitValue(null);
      }
      if (!Number.isNaN(parseFloat(value)) && parseFloat(value) >= props.min && parseFloat(value) <= props.max && parseFloat(value) !== props.value) {
        numValue.value = parseFloat(value);
        emitValue(parseFloat(value) || 0);
      }
    }
    function add(num1, num2) {
      const num1DeciStr = String(num1).split(".")[1];
      const num2DeciStr = String(num2).split(".")[1];
      let maxLen = Math.max((num1DeciStr == null ? void 0 : num1DeciStr.length) || 0, (num2DeciStr == null ? void 0 : num2DeciStr.length) || 0);
      let num1Str = num1.toFixed(maxLen);
      let num2Str = num2.toFixed(maxLen);
      const result = +num1Str.replace(".", "") + +num2Str.replace(".", "");
      return result / Math.pow(10, maxLen);
    }
    function onUp() {
      if (numValue.value !== props.max) {
        const res = add(numValue.value || 0, +props.step);
        emitValue(Math.min(props.max, res));
        numValue.value = Math.min(props.max, res);
      }
    }
    function onDown() {
      if (numValue.value !== props.min) {
        const res = add(numValue.value || 0, -props.step);
        emitValue(Math.max(props.min, res));
        numValue.value = Math.max(props.min, res);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$l, [
        createElementVNode("span", _hoisted_2$h, [
          renderSlot(_ctx.$slots, "prefix", {}, () => [
            createTextVNode(toDisplayString(__props.prefix), 1)
          ], true)
        ]),
        createElementVNode("div", _hoisted_3$e, [
          __props.keyboard ? withDirectives((openBlock(), createElementBlock("input", {
            key: 0,
            autocomplete: "off",
            class: "u-input-number",
            onChange,
            onInput,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => numValue.value = $event),
            onKeydown: _cache[1] || (_cache[1] = withKeys(withModifiers(() => {
            }, ["prevent"]), ["up"])),
            onKeyup: [
              withKeys(onUp, ["up"]),
              withKeys(onDown, ["down"])
            ]
          }, null, 40, _hoisted_4$c)), [
            [vModelText, numValue.value]
          ]) : withDirectives((openBlock(), createElementBlock("input", {
            key: 1,
            autocomplete: "off",
            class: "u-input-number",
            onChange,
            onInput,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => numValue.value = $event)
          }, null, 544)), [
            [vModelText, numValue.value]
          ])
        ]),
        createElementVNode("div", _hoisted_5$9, [
          createElementVNode("span", {
            class: normalizeClass(["u-up-arrow", { disabled: __props.min === numValue.value || __props.max === numValue.value }]),
            onClick: onUp
          }, _hoisted_7$9, 2),
          createElementVNode("span", {
            class: normalizeClass(["u-down-arrow", { disabled: __props.min === numValue.value || __props.max === numValue.value }]),
            onClick: onDown
          }, _hoisted_9$8, 2)
        ])
      ]);
    };
  }
});
const InputNumber_vue_vue_type_style_index_0_scoped_1071cf51_lang = "";
const InputNumber = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-1071cf51"]]);
InputNumber.install = (app) => {
  app.component(InputNumber.__name, InputNumber);
};
const _withScopeId$a = (n) => (pushScopeId("data-v-a4dba649"), n = n(), popScopeId(), n);
const _hoisted_1$k = ["onMouseenter", "onMouseleave"];
const _hoisted_2$g = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1));
const _hoisted_3$d = [
  _hoisted_2$g
];
const _hoisted_4$b = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1));
const _hoisted_5$8 = [
  _hoisted_4$b
];
const _hoisted_6$8 = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1));
const _hoisted_7$8 = [
  _hoisted_6$8
];
const _hoisted_8$7 = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1));
const _hoisted_9$7 = [
  _hoisted_8$7
];
const _hoisted_10$5 = { class: "content" };
var ColorStyle$1 = /* @__PURE__ */ ((ColorStyle2) => {
  ColorStyle2["info"] = "#1890FF";
  ColorStyle2["success"] = "#52c41a";
  ColorStyle2["error"] = "#f5222d";
  ColorStyle2["warn"] = "#faad14";
  return ColorStyle2;
})(ColorStyle$1 || {});
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "Message",
  props: {
    duration: {
      // 自动关闭的延时,单位ms
      type: Number,
      default: 3e3
    },
    top: {
      // 消息距离顶部的位置，单位px
      type: Number,
      default: 30
    }
  },
  emits: ["close"],
  setup(__props, { expose, emit }) {
    const props = __props;
    const resetTimer = ref();
    const showMessage = ref([]);
    const hideTimers = ref([]);
    const messageContent = ref([]);
    const clear = computed(() => {
      return showMessage.value.every((item) => !item);
    });
    watch(clear, (to, from) => {
      if (!from && to) {
        resetTimer.value = rafTimeout(() => {
          messageContent.value.splice(0);
          showMessage.value.splice(0);
        }, 300);
      }
    });
    function onEnter(index) {
      cancelRaf(hideTimers.value[index]);
    }
    function onLeave(index) {
      onHideMessage(index);
    }
    function show() {
      cancelRaf(resetTimer.value);
      const index = messageContent.value.length - 1;
      console.log("index:", index);
      showMessage.value[index] = true;
      onHideMessage(index);
    }
    function info(content) {
      messageContent.value.push({
        content,
        mode: "info"
      });
      show();
    }
    function success(content) {
      messageContent.value.push({
        content,
        mode: "success"
      });
      show();
    }
    function error(content) {
      messageContent.value.push({
        content,
        mode: "error"
      });
      show();
    }
    function warn(content) {
      messageContent.value.push({
        content,
        mode: "warn"
      });
      show();
    }
    expose({
      info,
      success,
      error,
      warn
    });
    function onHideMessage(index) {
      hideTimers.value[index] = rafTimeout(() => {
        showMessage.value[index] = false;
        emit("close");
      }, props.duration);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-message-wrap",
        style: normalizeStyle(`top: ${__props.top}px;`)
      }, [
        createVNode(TransitionGroup, { name: "slide-fade" }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(messageContent.value, (message, index) => {
              return withDirectives((openBlock(), createElementBlock("div", {
                class: "m-message",
                key: index
              }, [
                createElementVNode("div", {
                  class: "m-message-content",
                  onMouseenter: ($event) => onEnter(index),
                  onMouseleave: ($event) => onLeave(index)
                }, [
                  message.mode === "info" ? (openBlock(), createElementBlock("svg", {
                    key: 0,
                    class: "svg",
                    style: normalizeStyle({ fill: ColorStyle$1[message.mode] }),
                    viewBox: "64 64 896 896",
                    "data-icon": "info-circle",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, _hoisted_3$d, 4)) : createCommentVNode("", true),
                  message.mode === "success" ? (openBlock(), createElementBlock("svg", {
                    key: 1,
                    class: "svg",
                    style: normalizeStyle({ fill: ColorStyle$1[message.mode] }),
                    viewBox: "64 64 896 896",
                    "data-icon": "check-circle",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, _hoisted_5$8, 4)) : createCommentVNode("", true),
                  message.mode === "error" ? (openBlock(), createElementBlock("svg", {
                    key: 2,
                    class: "svg",
                    style: normalizeStyle({ fill: ColorStyle$1[message.mode] }),
                    viewBox: "64 64 896 896",
                    "data-icon": "close-circle",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, _hoisted_7$8, 4)) : createCommentVNode("", true),
                  message.mode === "warn" ? (openBlock(), createElementBlock("svg", {
                    key: 3,
                    class: "svg",
                    style: normalizeStyle({ fill: ColorStyle$1[message.mode] }),
                    viewBox: "64 64 896 896",
                    "data-icon": "exclamation-circle",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, _hoisted_9$7, 4)) : createCommentVNode("", true),
                  createElementVNode("p", _hoisted_10$5, toDisplayString(message.content), 1)
                ], 40, _hoisted_1$k)
              ])), [
                [vShow, showMessage.value[index]]
              ]);
            }), 128))
          ]),
          _: 1
        })
      ], 4);
    };
  }
});
const Message_vue_vue_type_style_index_0_scoped_a4dba649_lang = "";
const Message = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-a4dba649"]]);
Message.install = (app) => {
  app.component(Message.__name, Message);
};
const _withScopeId$9 = (n) => (pushScopeId("data-v-0fe8100f"), n = n(), popScopeId(), n);
const _hoisted_1$j = ["onClick"];
const _hoisted_2$f = { class: "m-spin-dot" };
const _hoisted_3$c = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_4$a = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_5$7 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_6$7 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_7$7 = [
  _hoisted_3$c,
  _hoisted_4$a,
  _hoisted_5$7,
  _hoisted_6$7
];
const _hoisted_8$6 = { class: "m-body" };
const _hoisted_9$6 = { class: "m-title" };
const _hoisted_10$4 = {
  key: 0,
  focusable: "false",
  class: "u-icon confirm",
  "data-icon": "exclamation-circle",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
const _hoisted_11$4 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
const _hoisted_12$3 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createElementVNode("path", { d: "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1));
const _hoisted_13$2 = [
  _hoisted_11$4,
  _hoisted_12$3
];
const _hoisted_14$2 = {
  key: 0,
  focusable: "false",
  class: "u-icon info",
  "data-icon": "info-circle",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
const _hoisted_15$2 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1));
const _hoisted_16$2 = [
  _hoisted_15$2
];
const _hoisted_17$1 = {
  key: 1,
  focusable: "false",
  class: "u-icon success",
  "data-icon": "check-circle",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
const _hoisted_18$1 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1));
const _hoisted_19$1 = [
  _hoisted_18$1
];
const _hoisted_20$1 = {
  key: 2,
  focusable: "false",
  class: "u-icon error",
  "data-icon": "close-circle",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
const _hoisted_21 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1));
const _hoisted_22 = [
  _hoisted_21
];
const _hoisted_23 = {
  key: 3,
  focusable: "false",
  class: "u-icon warn",
  "data-icon": "exclamation-circle",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
const _hoisted_24 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1));
const _hoisted_25 = [
  _hoisted_24
];
const _hoisted_26 = { class: "u-title" };
const _hoisted_27 = { class: "u-content" };
const _hoisted_28 = { class: "m-btns" };
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "Modal",
  props: {
    // 运行时声明
    title: {
      // 标题描述
      type: String,
      default: "Title"
    },
    content: {
      // 内容描述
      type: String,
      default: "Content"
    },
    width: {
      // 提示框宽度
      type: Number,
      default: 420
    },
    cancelText: {
      // 取消按钮文字
      type: String,
      default: "取消"
    },
    okText: {
      // 确认按钮文字
      type: String,
      default: "确定"
    },
    noticeText: {
      // 通知按钮文字
      type: String,
      default: "知道了"
    },
    mode: {
      // 确认提示框：confirm  信息提示框：info
      type: String,
      default: "confirm"
    },
    type: {
      // confirm mode: 'confirm', 'delete'   info mode: 'info', 'success', 'error', 'warn'
      type: String,
      default: "confirm"
    },
    center: {
      // 水平垂直居中：true  固定高度水平居中：false
      type: Boolean,
      default: true
    },
    top: {
      // 固定高度水平居中时，距顶部高度
      type: Number,
      default: 100
    },
    loading: {
      // 加载中...
      type: Boolean,
      default: false
    },
    visible: {
      // 提示框是否可见
      type: Boolean,
      default: false
    }
  },
  emits: ["cancel", "ok"],
  setup(__props, { emit: emits }) {
    function onBlur() {
      emits("cancel");
    }
    function onCancel() {
      emits("cancel");
    }
    function onConfirm() {
      emits("ok");
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, null, {
        default: withCtx(() => [
          withDirectives(createElementVNode("div", {
            class: "m-modal-mask",
            onClick: withModifiers(onBlur, ["self"])
          }, [
            createElementVNode("div", {
              class: normalizeClass(["m-modal", __props.center ? "relative-hv-center" : "top-center"]),
              style: normalizeStyle(`width: ${__props.width}px; top: ${!__props.center ? __props.top + "px" : "50%"};`)
            }, [
              createElementVNode("div", {
                class: normalizeClass(["m-modal-body", { "loading": __props.loading }])
              }, [
                withDirectives(createElementVNode("div", _hoisted_2$f, _hoisted_7$7, 512), [
                  [vShow, __props.loading]
                ]),
                createElementVNode("div", _hoisted_8$6, [
                  createElementVNode("div", _hoisted_9$6, [
                    __props.mode === "confirm" ? (openBlock(), createElementBlock("svg", _hoisted_10$4, _hoisted_13$2)) : createCommentVNode("", true),
                    __props.mode === "info" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      __props.type === "info" ? (openBlock(), createElementBlock("svg", _hoisted_14$2, _hoisted_16$2)) : createCommentVNode("", true),
                      __props.type === "success" ? (openBlock(), createElementBlock("svg", _hoisted_17$1, _hoisted_19$1)) : createCommentVNode("", true),
                      __props.type === "error" ? (openBlock(), createElementBlock("svg", _hoisted_20$1, _hoisted_22)) : createCommentVNode("", true),
                      __props.type === "warn" ? (openBlock(), createElementBlock("svg", _hoisted_23, _hoisted_25)) : createCommentVNode("", true)
                    ], 64)) : createCommentVNode("", true),
                    createElementVNode("div", _hoisted_26, toDisplayString(__props.title), 1)
                  ]),
                  createElementVNode("div", _hoisted_27, toDisplayString(__props.content), 1)
                ]),
                createElementVNode("div", _hoisted_28, [
                  __props.mode === "confirm" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    createElementVNode("button", {
                      class: "u-cancel",
                      onClick: onCancel
                    }, toDisplayString(__props.cancelText), 1),
                    __props.type === "confirm" ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      class: "u-confirm primary",
                      onClick: onConfirm
                    }, toDisplayString(__props.okText), 1)) : createCommentVNode("", true),
                    __props.type === "delete" ? (openBlock(), createElementBlock("button", {
                      key: 1,
                      class: "u-confirm delete",
                      onClick: onConfirm
                    }, toDisplayString(__props.okText), 1)) : createCommentVNode("", true)
                  ], 64)) : createCommentVNode("", true),
                  __props.mode === "info" ? (openBlock(), createElementBlock("button", {
                    key: 1,
                    class: "u-confirm primary",
                    onClick: onConfirm
                  }, toDisplayString(__props.noticeText), 1)) : createCommentVNode("", true)
                ])
              ], 2)
            ], 6)
          ], 8, _hoisted_1$j), [
            [vShow, __props.visible]
          ])
        ]),
        _: 1
      });
    };
  }
});
const Modal_vue_vue_type_style_index_0_scoped_0fe8100f_lang = "";
const Modal = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-0fe8100f"]]);
Modal.install = (app) => {
  app.component(Modal.__name, Modal);
};
const _withScopeId$8 = (n) => (pushScopeId("data-v-73ea3b77"), n = n(), popScopeId(), n);
const _hoisted_1$i = ["onMouseenter", "onMouseleave"];
const _hoisted_2$e = ["fill"];
const _hoisted_3$b = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
const _hoisted_4$9 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createElementVNode("path", { d: "M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" }, null, -1));
const _hoisted_5$6 = [
  _hoisted_3$b,
  _hoisted_4$9
];
const _hoisted_6$6 = ["fill"];
const _hoisted_7$6 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createElementVNode("path", { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1));
const _hoisted_8$5 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
const _hoisted_9$5 = [
  _hoisted_7$6,
  _hoisted_8$5
];
const _hoisted_10$3 = ["fill"];
const _hoisted_11$3 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
const _hoisted_12$2 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createElementVNode("path", { d: "M464 688a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1));
const _hoisted_13$1 = [
  _hoisted_11$3,
  _hoisted_12$2
];
const _hoisted_14$1 = ["fill"];
const _hoisted_15$1 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createElementVNode("path", { d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" }, null, -1));
const _hoisted_16$1 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
const _hoisted_17 = [
  _hoisted_15$1,
  _hoisted_16$1
];
const _hoisted_18 = ["onClick"];
const _hoisted_19 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createElementVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1));
const _hoisted_20 = [
  _hoisted_19
];
var ColorStyle = /* @__PURE__ */ ((ColorStyle2) => {
  ColorStyle2["info"] = "#1890FF";
  ColorStyle2["success"] = "#52c41a";
  ColorStyle2["error"] = "#f5222d";
  ColorStyle2["warn"] = "#faad14";
  return ColorStyle2;
})(ColorStyle || {});
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "Notification",
  props: {
    title: {
      // 消息的标题
      type: String,
      default: "温馨提示"
    },
    duration: {
      // 自动关闭的延时时长,单位ms，默认4500ms；设置null时，不自动关闭
      type: Number,
      default: 4500
    },
    top: {
      // 消息从顶部弹出时，距离顶部的位置，单位像素px
      type: Number,
      default: 24
    },
    bottom: {
      // 消息从底部弹出时，距离底部的位置，单位像素
      type: Number,
      default: 24
    },
    placement: {
      // 消息弹出位置，可选topLeft,topRight,bottomLeft,bottomRight
      type: String,
      default: "topRight"
    }
  },
  emits: ["close"],
  setup(__props, { expose, emit }) {
    const props = __props;
    const resetTimer = ref();
    const hideIndex = ref([]);
    const hideTimers = ref([]);
    const notificationData = ref([]);
    const clear = computed(() => {
      return hideIndex.value.length === notificationData.value.length;
    });
    watch(clear, (to, from) => {
      if (!from && to) {
        resetTimer.value = rafTimeout(() => {
          hideIndex.value.splice(0);
          notificationData.value.splice(0);
        }, 300);
      }
    });
    function onEnter(index) {
      cancelRaf(hideTimers.value[index]);
      hideTimers.value[index] = null;
    }
    function onLeave(index) {
      if (props.duration) {
        hideTimers.value[index] = rafTimeout(() => {
          onClose(index);
        }, props.duration);
      }
    }
    function show() {
      cancelRaf(resetTimer.value);
      hideTimers.value.push(null);
      const index = notificationData.value.length - 1;
      if (props.duration) {
        hideTimers.value[index] = rafTimeout(() => {
          onClose(index);
        }, props.duration);
      }
    }
    function open(notification) {
      notificationData.value.push({
        notification,
        mode: "open"
      });
      show();
    }
    function info(notification) {
      notificationData.value.push({
        notification,
        mode: "info"
      });
      show();
    }
    function success(notification) {
      notificationData.value.push({
        notification,
        mode: "success"
      });
      show();
    }
    function error(notification) {
      notificationData.value.push({
        notification,
        mode: "error"
      });
      show();
    }
    function warn(notification) {
      notificationData.value.push({
        notification,
        mode: "warn"
      });
      show();
    }
    expose({
      open,
      info,
      success,
      error,
      warn
    });
    function onClose(index) {
      hideIndex.value.push(index);
      emit("close");
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-notification-wrap", __props.placement]),
        style: normalizeStyle(`top: ${__props.placement.includes("top") ? __props.top : ""}px; bottom: ${__props.placement.includes("bottom") ? __props.bottom : ""}px;`)
      }, [
        createVNode(TransitionGroup, { name: "slide-fade" }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(notificationData.value, (data, index) => {
              return withDirectives((openBlock(), createElementBlock("div", {
                class: "m-notification",
                onMouseenter: ($event) => onEnter(index),
                onMouseleave: ($event) => onLeave(index),
                key: index
              }, [
                data.mode === "info" ? (openBlock(), createElementBlock("svg", {
                  key: 0,
                  class: "u-status-svg",
                  fill: ColorStyle[data.mode],
                  viewBox: "64 64 896 896",
                  "data-icon": "info-circle",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_5$6, 8, _hoisted_2$e)) : createCommentVNode("", true),
                data.mode === "success" ? (openBlock(), createElementBlock("svg", {
                  key: 1,
                  class: "u-status-svg",
                  fill: ColorStyle[data.mode],
                  viewBox: "64 64 896 896",
                  "data-icon": "check-circle",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_9$5, 8, _hoisted_6$6)) : createCommentVNode("", true),
                data.mode === "warn" ? (openBlock(), createElementBlock("svg", {
                  key: 2,
                  class: "u-status-svg",
                  fill: ColorStyle[data.mode],
                  viewBox: "64 64 896 896",
                  "data-icon": "exclamation-circle",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_13$1, 8, _hoisted_10$3)) : createCommentVNode("", true),
                data.mode === "error" ? (openBlock(), createElementBlock("svg", {
                  key: 3,
                  class: "u-status-svg",
                  fill: ColorStyle[data.mode],
                  viewBox: "64 64 896 896",
                  "data-icon": "close-circle",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_17, 8, _hoisted_14$1)) : createCommentVNode("", true),
                createElementVNode("div", {
                  class: normalizeClass(["u-title", { "mb4": data.mode !== "open", "ml48": data.mode !== "open" }])
                }, toDisplayString(__props.title || "--"), 3),
                createElementVNode("p", {
                  class: normalizeClass(["u-description", { "ml48": data.mode !== "open" }])
                }, toDisplayString(data.notification || "--"), 3),
                (openBlock(), createElementBlock("svg", {
                  class: "u-close",
                  onClick: ($event) => onClose(index),
                  viewBox: "64 64 896 896",
                  "data-icon": "close",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_20, 8, _hoisted_18))
              ], 40, _hoisted_1$i)), [
                [vShow, !hideIndex.value.includes(index)]
              ]);
            }), 128))
          ]),
          _: 1
        })
      ], 6);
    };
  }
});
const Notification_vue_vue_type_style_index_0_scoped_73ea3b77_lang = "";
const Notification = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-73ea3b77"]]);
Notification.install = (app) => {
  app.component(Notification.__name, Notification);
};
const _withScopeId$7 = (n) => (pushScopeId("data-v-c86e07c9"), n = n(), popScopeId(), n);
const _hoisted_1$h = { class: "m-pagination-wrap" };
const _hoisted_2$d = {
  key: 0,
  class: "mr8"
};
const _hoisted_3$a = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-arrow",
  viewBox: "64 64 896 896",
  "data-icon": "left",
  "aria-hidden": "true",
  focusable: "false"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })
], -1));
const _hoisted_4$8 = [
  _hoisted_3$a
];
const _hoisted_5$5 = { class: "u-ellipsis" };
const _hoisted_6$5 = {
  class: "u-icon",
  viewBox: "64 64 896 896",
  "data-icon": "double-left",
  "aria-hidden": "true",
  focusable: "false"
};
const _hoisted_7$5 = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createElementVNode("path", { d: "M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" }, null, -1));
const _hoisted_8$4 = [
  _hoisted_7$5
];
const _hoisted_9$4 = ["onClick"];
const _hoisted_10$2 = { class: "u-ellipsis" };
const _hoisted_11$2 = {
  class: "u-icon",
  viewBox: "64 64 896 896",
  "data-icon": "double-right",
  "aria-hidden": "true",
  focusable: "false"
};
const _hoisted_12$1 = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createElementVNode("path", { d: "M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" }, null, -1));
const _hoisted_13 = [
  _hoisted_12$1
];
const _hoisted_14 = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createElementVNode("svg", {
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
const _sfc_main$h = /* @__PURE__ */ defineComponent({
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
        createElementVNode("div", _hoisted_1$h, [
          __props.showTotal ? (openBlock(), createElementBlock("span", _hoisted_2$d, "共 " + toDisplayString(unref(totalPage)) + " 页 / " + toDisplayString(__props.total) + " 条", 1)) : createCommentVNode("", true),
          createElementVNode("span", {
            class: normalizeClass(["u-item", { disabled: currentPage.value === 1 }]),
            onClick: _cache[0] || (_cache[0] = ($event) => changePage(currentPage.value - 1))
          }, _hoisted_4$8, 2),
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
            withDirectives(createElementVNode("span", _hoisted_5$5, "•••", 512), [
              [vShow, !forwardArrow.value]
            ]),
            withDirectives((openBlock(), createElementBlock("svg", _hoisted_6$5, _hoisted_8$4, 512)), [
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
            }, toDisplayString(page), 11, _hoisted_9$4);
          }), 128)),
          withDirectives(createElementVNode("span", {
            class: "m-arrow",
            ref: "backward",
            onClick: onBackward,
            onMouseenter: _cache[4] || (_cache[4] = ($event) => backwardArrow.value = true),
            onMouseleave: _cache[5] || (_cache[5] = ($event) => backwardArrow.value = false)
          }, [
            withDirectives(createElementVNode("span", _hoisted_10$2, "•••", 512), [
              [vShow, !backwardArrow.value]
            ]),
            withDirectives((openBlock(), createElementBlock("svg", _hoisted_11$2, _hoisted_13, 512)), [
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
const Pagination_vue_vue_type_style_index_0_scoped_c86e07c9_lang = "";
const Pagination = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-c86e07c9"]]);
Pagination.install = (app) => {
  app.component(Pagination.__name, Pagination);
};
const _withScopeId$6 = (n) => (pushScopeId("data-v-0c99077b"), n = n(), popScopeId(), n);
const _hoisted_1$g = { class: "m-progress-inner" };
const _hoisted_2$c = {
  key: 0,
  class: "u-success",
  viewBox: "64 64 896 896",
  "data-icon": "check-circle",
  "aria-hidden": "true",
  focusable: "false"
};
const _hoisted_3$9 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1));
const _hoisted_4$7 = [
  _hoisted_3$9
];
const _hoisted_5$4 = {
  key: 1,
  class: "u-progress-text"
};
const _hoisted_6$4 = {
  class: "u-progress-circle",
  viewBox: "0 0 100 100"
};
const _hoisted_7$4 = ["d", "stroke-width"];
const _hoisted_8$3 = ["d", "stroke-width", "opacity"];
const _hoisted_9$3 = {
  key: 0,
  class: "u-success",
  focusable: "false",
  "data-icon": "check",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
const _hoisted_10$1 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createElementVNode("path", { d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" }, null, -1));
const _hoisted_11$1 = [
  _hoisted_10$1
];
const _hoisted_12 = {
  key: 1,
  class: "u-progress-text"
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "Progress",
  props: {
    width: { default: "100%" },
    percent: { default: 0 },
    strokeColor: { default: "#1890FF" },
    strokeWidth: { default: 8 },
    showInfo: { type: Boolean, default: true },
    type: { default: "line" }
  },
  setup(__props) {
    const props = __props;
    const totalWidth = computed(() => {
      if (typeof props.width === "number") {
        return props.width + "px";
      } else {
        return props.width;
      }
    });
    const perimeter = computed(() => {
      return (100 - props.strokeWidth) * Math.PI;
    });
    const path = computed(() => {
      const long = 100 - props.strokeWidth;
      return `M 50,50 m 0,-${long / 2}
   a ${long / 2},${long / 2} 0 1 1 0,${long}
   a ${long / 2},${long / 2} 0 1 1 0,-${long}`;
    });
    const backgroundColor = computed(() => {
      if (typeof props.strokeColor === "string") {
        return props.strokeColor;
      } else {
        return `linear-gradient(to ${props.strokeColor.direction || "right"}, ${props.strokeColor["0%"] || props.strokeColor.from}, ${props.strokeColor["100%"] || props.strokeColor.to})`;
      }
    });
    return (_ctx, _cache) => {
      return __props.type === "line" ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "m-progress-line",
        style: normalizeStyle(`width: ${unref(totalWidth)}; height: ${__props.strokeWidth < 24 ? 24 : __props.strokeWidth}px;`)
      }, [
        createElementVNode("div", _hoisted_1$g, [
          createElementVNode("div", {
            class: normalizeClass(["u-progress-bg", { "u-success-bg": __props.percent >= 100 }]),
            style: normalizeStyle(`background: ${unref(backgroundColor)}; width: ${__props.percent >= 100 ? 100 : __props.percent}%; height: ${__props.strokeWidth}px;`)
          }, null, 6)
        ]),
        __props.showInfo ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          __props.percent >= 100 ? (openBlock(), createElementBlock("svg", _hoisted_2$c, _hoisted_4$7)) : (openBlock(), createElementBlock("p", _hoisted_5$4, toDisplayString(__props.percent >= 100 ? 100 : __props.percent) + "%", 1))
        ], 64)) : createCommentVNode("", true)
      ], 4)) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: "m-progress-circle",
        style: normalizeStyle(`width: ${unref(totalWidth)}; height: ${unref(totalWidth)};`)
      }, [
        (openBlock(), createElementBlock("svg", _hoisted_6$4, [
          createElementVNode("path", {
            d: unref(path),
            "stroke-linecap": "round",
            class: "u-progress-circle-trail",
            "stroke-width": __props.strokeWidth,
            style: normalizeStyle(`stroke-dasharray: ${unref(perimeter)}px, ${unref(perimeter)}px;`),
            "fill-opacity": "0"
          }, null, 12, _hoisted_7$4),
          createElementVNode("path", {
            d: unref(path),
            "stroke-linecap": "round",
            class: normalizeClass(["u-progress-circle-path", { success: __props.percent >= 100 }]),
            "stroke-width": __props.strokeWidth,
            style: normalizeStyle(`stroke: ${unref(backgroundColor)}; stroke-dasharray: ${__props.percent / 100 * unref(perimeter)}px, ${unref(perimeter)}px;`),
            opacity: __props.percent === 0 ? 0 : 1,
            "fill-opacity": "0"
          }, null, 14, _hoisted_8$3)
        ])),
        __props.showInfo ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          __props.percent >= 100 ? (openBlock(), createElementBlock("svg", _hoisted_9$3, _hoisted_11$1)) : (openBlock(), createElementBlock("p", _hoisted_12, toDisplayString(__props.percent >= 100 ? 100 : __props.percent) + "%", 1))
        ], 64)) : createCommentVNode("", true)
      ], 4));
    };
  }
});
const Progress_vue_vue_type_style_index_0_scoped_0c99077b_lang = "";
const Progress = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-0c99077b"]]);
Progress.install = (app) => {
  app.component(Progress.__name, Progress);
};
var _a;
const isClient = typeof window !== "undefined";
isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function resolveRef(r) {
  return typeof r === "function" ? computed(r) : ref(r);
}
var browser = {};
var canPromise$1 = function() {
  return typeof Promise === "function" && Promise.prototype && Promise.prototype.then;
};
var qrcode = {};
var utils$1 = {};
let toSJISFunction;
const CODEWORDS_COUNT = [
  0,
  // Not used
  26,
  44,
  70,
  100,
  134,
  172,
  196,
  242,
  292,
  346,
  404,
  466,
  532,
  581,
  655,
  733,
  815,
  901,
  991,
  1085,
  1156,
  1258,
  1364,
  1474,
  1588,
  1706,
  1828,
  1921,
  2051,
  2185,
  2323,
  2465,
  2611,
  2761,
  2876,
  3034,
  3196,
  3362,
  3532,
  3706
];
utils$1.getSymbolSize = function getSymbolSize(version2) {
  if (!version2)
    throw new Error('"version" cannot be null or undefined');
  if (version2 < 1 || version2 > 40)
    throw new Error('"version" should be in range from 1 to 40');
  return version2 * 4 + 17;
};
utils$1.getSymbolTotalCodewords = function getSymbolTotalCodewords(version2) {
  return CODEWORDS_COUNT[version2];
};
utils$1.getBCHDigit = function(data) {
  let digit = 0;
  while (data !== 0) {
    digit++;
    data >>>= 1;
  }
  return digit;
};
utils$1.setToSJISFunction = function setToSJISFunction(f) {
  if (typeof f !== "function") {
    throw new Error('"toSJISFunc" is not a valid function.');
  }
  toSJISFunction = f;
};
utils$1.isKanjiModeEnabled = function() {
  return typeof toSJISFunction !== "undefined";
};
utils$1.toSJIS = function toSJIS(kanji2) {
  return toSJISFunction(kanji2);
};
var errorCorrectionLevel = {};
(function(exports) {
  exports.L = { bit: 1 };
  exports.M = { bit: 0 };
  exports.Q = { bit: 3 };
  exports.H = { bit: 2 };
  function fromString(string) {
    if (typeof string !== "string") {
      throw new Error("Param is not a string");
    }
    const lcStr = string.toLowerCase();
    switch (lcStr) {
      case "l":
      case "low":
        return exports.L;
      case "m":
      case "medium":
        return exports.M;
      case "q":
      case "quartile":
        return exports.Q;
      case "h":
      case "high":
        return exports.H;
      default:
        throw new Error("Unknown EC Level: " + string);
    }
  }
  exports.isValid = function isValid2(level) {
    return level && typeof level.bit !== "undefined" && level.bit >= 0 && level.bit < 4;
  };
  exports.from = function from(value, defaultValue) {
    if (exports.isValid(value)) {
      return value;
    }
    try {
      return fromString(value);
    } catch (e) {
      return defaultValue;
    }
  };
})(errorCorrectionLevel);
function BitBuffer$1() {
  this.buffer = [];
  this.length = 0;
}
BitBuffer$1.prototype = {
  get: function(index) {
    const bufIndex = Math.floor(index / 8);
    return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
  },
  put: function(num, length) {
    for (let i = 0; i < length; i++) {
      this.putBit((num >>> length - i - 1 & 1) === 1);
    }
  },
  getLengthInBits: function() {
    return this.length;
  },
  putBit: function(bit) {
    const bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }
    if (bit) {
      this.buffer[bufIndex] |= 128 >>> this.length % 8;
    }
    this.length++;
  }
};
var bitBuffer = BitBuffer$1;
function BitMatrix$1(size) {
  if (!size || size < 1) {
    throw new Error("BitMatrix size must be defined and greater than 0");
  }
  this.size = size;
  this.data = new Uint8Array(size * size);
  this.reservedBit = new Uint8Array(size * size);
}
BitMatrix$1.prototype.set = function(row, col, value, reserved) {
  const index = row * this.size + col;
  this.data[index] = value;
  if (reserved)
    this.reservedBit[index] = true;
};
BitMatrix$1.prototype.get = function(row, col) {
  return this.data[row * this.size + col];
};
BitMatrix$1.prototype.xor = function(row, col, value) {
  this.data[row * this.size + col] ^= value;
};
BitMatrix$1.prototype.isReserved = function(row, col) {
  return this.reservedBit[row * this.size + col];
};
var bitMatrix = BitMatrix$1;
var alignmentPattern = {};
(function(exports) {
  const getSymbolSize3 = utils$1.getSymbolSize;
  exports.getRowColCoords = function getRowColCoords(version2) {
    if (version2 === 1)
      return [];
    const posCount = Math.floor(version2 / 7) + 2;
    const size = getSymbolSize3(version2);
    const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
    const positions = [size - 7];
    for (let i = 1; i < posCount - 1; i++) {
      positions[i] = positions[i - 1] - intervals;
    }
    positions.push(6);
    return positions.reverse();
  };
  exports.getPositions = function getPositions2(version2) {
    const coords = [];
    const pos = exports.getRowColCoords(version2);
    const posLength = pos.length;
    for (let i = 0; i < posLength; i++) {
      for (let j = 0; j < posLength; j++) {
        if (i === 0 && j === 0 || // top-left
        i === 0 && j === posLength - 1 || // bottom-left
        i === posLength - 1 && j === 0) {
          continue;
        }
        coords.push([pos[i], pos[j]]);
      }
    }
    return coords;
  };
})(alignmentPattern);
var finderPattern = {};
const getSymbolSize2 = utils$1.getSymbolSize;
const FINDER_PATTERN_SIZE = 7;
finderPattern.getPositions = function getPositions(version2) {
  const size = getSymbolSize2(version2);
  return [
    // top-left
    [0, 0],
    // top-right
    [size - FINDER_PATTERN_SIZE, 0],
    // bottom-left
    [0, size - FINDER_PATTERN_SIZE]
  ];
};
var maskPattern = {};
(function(exports) {
  exports.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
  };
  const PenaltyScores = {
    N1: 3,
    N2: 3,
    N3: 40,
    N4: 10
  };
  exports.isValid = function isValid2(mask) {
    return mask != null && mask !== "" && !isNaN(mask) && mask >= 0 && mask <= 7;
  };
  exports.from = function from(value) {
    return exports.isValid(value) ? parseInt(value, 10) : void 0;
  };
  exports.getPenaltyN1 = function getPenaltyN1(data) {
    const size = data.size;
    let points = 0;
    let sameCountCol = 0;
    let sameCountRow = 0;
    let lastCol = null;
    let lastRow = null;
    for (let row = 0; row < size; row++) {
      sameCountCol = sameCountRow = 0;
      lastCol = lastRow = null;
      for (let col = 0; col < size; col++) {
        let module = data.get(row, col);
        if (module === lastCol) {
          sameCountCol++;
        } else {
          if (sameCountCol >= 5)
            points += PenaltyScores.N1 + (sameCountCol - 5);
          lastCol = module;
          sameCountCol = 1;
        }
        module = data.get(col, row);
        if (module === lastRow) {
          sameCountRow++;
        } else {
          if (sameCountRow >= 5)
            points += PenaltyScores.N1 + (sameCountRow - 5);
          lastRow = module;
          sameCountRow = 1;
        }
      }
      if (sameCountCol >= 5)
        points += PenaltyScores.N1 + (sameCountCol - 5);
      if (sameCountRow >= 5)
        points += PenaltyScores.N1 + (sameCountRow - 5);
    }
    return points;
  };
  exports.getPenaltyN2 = function getPenaltyN2(data) {
    const size = data.size;
    let points = 0;
    for (let row = 0; row < size - 1; row++) {
      for (let col = 0; col < size - 1; col++) {
        const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
        if (last === 4 || last === 0)
          points++;
      }
    }
    return points * PenaltyScores.N2;
  };
  exports.getPenaltyN3 = function getPenaltyN3(data) {
    const size = data.size;
    let points = 0;
    let bitsCol = 0;
    let bitsRow = 0;
    for (let row = 0; row < size; row++) {
      bitsCol = bitsRow = 0;
      for (let col = 0; col < size; col++) {
        bitsCol = bitsCol << 1 & 2047 | data.get(row, col);
        if (col >= 10 && (bitsCol === 1488 || bitsCol === 93))
          points++;
        bitsRow = bitsRow << 1 & 2047 | data.get(col, row);
        if (col >= 10 && (bitsRow === 1488 || bitsRow === 93))
          points++;
      }
    }
    return points * PenaltyScores.N3;
  };
  exports.getPenaltyN4 = function getPenaltyN4(data) {
    let darkCount = 0;
    const modulesCount = data.data.length;
    for (let i = 0; i < modulesCount; i++)
      darkCount += data.data[i];
    const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
    return k * PenaltyScores.N4;
  };
  function getMaskAt(maskPattern2, i, j) {
    switch (maskPattern2) {
      case exports.Patterns.PATTERN000:
        return (i + j) % 2 === 0;
      case exports.Patterns.PATTERN001:
        return i % 2 === 0;
      case exports.Patterns.PATTERN010:
        return j % 3 === 0;
      case exports.Patterns.PATTERN011:
        return (i + j) % 3 === 0;
      case exports.Patterns.PATTERN100:
        return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
      case exports.Patterns.PATTERN101:
        return i * j % 2 + i * j % 3 === 0;
      case exports.Patterns.PATTERN110:
        return (i * j % 2 + i * j % 3) % 2 === 0;
      case exports.Patterns.PATTERN111:
        return (i * j % 3 + (i + j) % 2) % 2 === 0;
      default:
        throw new Error("bad maskPattern:" + maskPattern2);
    }
  }
  exports.applyMask = function applyMask(pattern, data) {
    const size = data.size;
    for (let col = 0; col < size; col++) {
      for (let row = 0; row < size; row++) {
        if (data.isReserved(row, col))
          continue;
        data.xor(row, col, getMaskAt(pattern, row, col));
      }
    }
  };
  exports.getBestMask = function getBestMask(data, setupFormatFunc) {
    const numPatterns = Object.keys(exports.Patterns).length;
    let bestPattern = 0;
    let lowerPenalty = Infinity;
    for (let p = 0; p < numPatterns; p++) {
      setupFormatFunc(p);
      exports.applyMask(p, data);
      const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
      exports.applyMask(p, data);
      if (penalty < lowerPenalty) {
        lowerPenalty = penalty;
        bestPattern = p;
      }
    }
    return bestPattern;
  };
})(maskPattern);
var errorCorrectionCode = {};
const ECLevel$1 = errorCorrectionLevel;
const EC_BLOCKS_TABLE = [
  // L  M  Q  H
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  2,
  1,
  2,
  2,
  4,
  1,
  2,
  4,
  4,
  2,
  4,
  4,
  4,
  2,
  4,
  6,
  5,
  2,
  4,
  6,
  6,
  2,
  5,
  8,
  8,
  4,
  5,
  8,
  8,
  4,
  5,
  8,
  11,
  4,
  8,
  10,
  11,
  4,
  9,
  12,
  16,
  4,
  9,
  16,
  16,
  6,
  10,
  12,
  18,
  6,
  10,
  17,
  16,
  6,
  11,
  16,
  19,
  6,
  13,
  18,
  21,
  7,
  14,
  21,
  25,
  8,
  16,
  20,
  25,
  8,
  17,
  23,
  25,
  9,
  17,
  23,
  34,
  9,
  18,
  25,
  30,
  10,
  20,
  27,
  32,
  12,
  21,
  29,
  35,
  12,
  23,
  34,
  37,
  12,
  25,
  34,
  40,
  13,
  26,
  35,
  42,
  14,
  28,
  38,
  45,
  15,
  29,
  40,
  48,
  16,
  31,
  43,
  51,
  17,
  33,
  45,
  54,
  18,
  35,
  48,
  57,
  19,
  37,
  51,
  60,
  19,
  38,
  53,
  63,
  20,
  40,
  56,
  66,
  21,
  43,
  59,
  70,
  22,
  45,
  62,
  74,
  24,
  47,
  65,
  77,
  25,
  49,
  68,
  81
];
const EC_CODEWORDS_TABLE = [
  // L  M  Q  H
  7,
  10,
  13,
  17,
  10,
  16,
  22,
  28,
  15,
  26,
  36,
  44,
  20,
  36,
  52,
  64,
  26,
  48,
  72,
  88,
  36,
  64,
  96,
  112,
  40,
  72,
  108,
  130,
  48,
  88,
  132,
  156,
  60,
  110,
  160,
  192,
  72,
  130,
  192,
  224,
  80,
  150,
  224,
  264,
  96,
  176,
  260,
  308,
  104,
  198,
  288,
  352,
  120,
  216,
  320,
  384,
  132,
  240,
  360,
  432,
  144,
  280,
  408,
  480,
  168,
  308,
  448,
  532,
  180,
  338,
  504,
  588,
  196,
  364,
  546,
  650,
  224,
  416,
  600,
  700,
  224,
  442,
  644,
  750,
  252,
  476,
  690,
  816,
  270,
  504,
  750,
  900,
  300,
  560,
  810,
  960,
  312,
  588,
  870,
  1050,
  336,
  644,
  952,
  1110,
  360,
  700,
  1020,
  1200,
  390,
  728,
  1050,
  1260,
  420,
  784,
  1140,
  1350,
  450,
  812,
  1200,
  1440,
  480,
  868,
  1290,
  1530,
  510,
  924,
  1350,
  1620,
  540,
  980,
  1440,
  1710,
  570,
  1036,
  1530,
  1800,
  570,
  1064,
  1590,
  1890,
  600,
  1120,
  1680,
  1980,
  630,
  1204,
  1770,
  2100,
  660,
  1260,
  1860,
  2220,
  720,
  1316,
  1950,
  2310,
  750,
  1372,
  2040,
  2430
];
errorCorrectionCode.getBlocksCount = function getBlocksCount(version2, errorCorrectionLevel2) {
  switch (errorCorrectionLevel2) {
    case ECLevel$1.L:
      return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 0];
    case ECLevel$1.M:
      return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 1];
    case ECLevel$1.Q:
      return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 2];
    case ECLevel$1.H:
      return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 3];
    default:
      return void 0;
  }
};
errorCorrectionCode.getTotalCodewordsCount = function getTotalCodewordsCount(version2, errorCorrectionLevel2) {
  switch (errorCorrectionLevel2) {
    case ECLevel$1.L:
      return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 0];
    case ECLevel$1.M:
      return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 1];
    case ECLevel$1.Q:
      return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 2];
    case ECLevel$1.H:
      return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 3];
    default:
      return void 0;
  }
};
var polynomial = {};
var galoisField = {};
const EXP_TABLE = new Uint8Array(512);
const LOG_TABLE = new Uint8Array(256);
(function initTables() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP_TABLE[i] = x;
    LOG_TABLE[x] = i;
    x <<= 1;
    if (x & 256) {
      x ^= 285;
    }
  }
  for (let i = 255; i < 512; i++) {
    EXP_TABLE[i] = EXP_TABLE[i - 255];
  }
})();
galoisField.log = function log(n) {
  if (n < 1)
    throw new Error("log(" + n + ")");
  return LOG_TABLE[n];
};
galoisField.exp = function exp(n) {
  return EXP_TABLE[n];
};
galoisField.mul = function mul(x, y) {
  if (x === 0 || y === 0)
    return 0;
  return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
};
(function(exports) {
  const GF = galoisField;
  exports.mul = function mul2(p1, p2) {
    const coeff = new Uint8Array(p1.length + p2.length - 1);
    for (let i = 0; i < p1.length; i++) {
      for (let j = 0; j < p2.length; j++) {
        coeff[i + j] ^= GF.mul(p1[i], p2[j]);
      }
    }
    return coeff;
  };
  exports.mod = function mod(divident, divisor) {
    let result = new Uint8Array(divident);
    while (result.length - divisor.length >= 0) {
      const coeff = result[0];
      for (let i = 0; i < divisor.length; i++) {
        result[i] ^= GF.mul(divisor[i], coeff);
      }
      let offset = 0;
      while (offset < result.length && result[offset] === 0)
        offset++;
      result = result.slice(offset);
    }
    return result;
  };
  exports.generateECPolynomial = function generateECPolynomial(degree) {
    let poly = new Uint8Array([1]);
    for (let i = 0; i < degree; i++) {
      poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]));
    }
    return poly;
  };
})(polynomial);
const Polynomial = polynomial;
function ReedSolomonEncoder$1(degree) {
  this.genPoly = void 0;
  this.degree = degree;
  if (this.degree)
    this.initialize(this.degree);
}
ReedSolomonEncoder$1.prototype.initialize = function initialize(degree) {
  this.degree = degree;
  this.genPoly = Polynomial.generateECPolynomial(this.degree);
};
ReedSolomonEncoder$1.prototype.encode = function encode(data) {
  if (!this.genPoly) {
    throw new Error("Encoder not initialized");
  }
  const paddedData = new Uint8Array(data.length + this.degree);
  paddedData.set(data);
  const remainder = Polynomial.mod(paddedData, this.genPoly);
  const start = this.degree - remainder.length;
  if (start > 0) {
    const buff = new Uint8Array(this.degree);
    buff.set(remainder, start);
    return buff;
  }
  return remainder;
};
var reedSolomonEncoder = ReedSolomonEncoder$1;
var version = {};
var mode = {};
var versionCheck = {};
versionCheck.isValid = function isValid(version2) {
  return !isNaN(version2) && version2 >= 1 && version2 <= 40;
};
var regex = {};
const numeric = "[0-9]+";
const alphanumeric = "[A-Z $%*+\\-./:]+";
let kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
kanji = kanji.replace(/u/g, "\\u");
const byte = "(?:(?![A-Z0-9 $%*+\\-./:]|" + kanji + ")(?:.|[\r\n]))+";
regex.KANJI = new RegExp(kanji, "g");
regex.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
regex.BYTE = new RegExp(byte, "g");
regex.NUMERIC = new RegExp(numeric, "g");
regex.ALPHANUMERIC = new RegExp(alphanumeric, "g");
const TEST_KANJI = new RegExp("^" + kanji + "$");
const TEST_NUMERIC = new RegExp("^" + numeric + "$");
const TEST_ALPHANUMERIC = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
regex.testKanji = function testKanji(str) {
  return TEST_KANJI.test(str);
};
regex.testNumeric = function testNumeric(str) {
  return TEST_NUMERIC.test(str);
};
regex.testAlphanumeric = function testAlphanumeric(str) {
  return TEST_ALPHANUMERIC.test(str);
};
(function(exports) {
  const VersionCheck = versionCheck;
  const Regex = regex;
  exports.NUMERIC = {
    id: "Numeric",
    bit: 1 << 0,
    ccBits: [10, 12, 14]
  };
  exports.ALPHANUMERIC = {
    id: "Alphanumeric",
    bit: 1 << 1,
    ccBits: [9, 11, 13]
  };
  exports.BYTE = {
    id: "Byte",
    bit: 1 << 2,
    ccBits: [8, 16, 16]
  };
  exports.KANJI = {
    id: "Kanji",
    bit: 1 << 3,
    ccBits: [8, 10, 12]
  };
  exports.MIXED = {
    bit: -1
  };
  exports.getCharCountIndicator = function getCharCountIndicator(mode2, version2) {
    if (!mode2.ccBits)
      throw new Error("Invalid mode: " + mode2);
    if (!VersionCheck.isValid(version2)) {
      throw new Error("Invalid version: " + version2);
    }
    if (version2 >= 1 && version2 < 10)
      return mode2.ccBits[0];
    else if (version2 < 27)
      return mode2.ccBits[1];
    return mode2.ccBits[2];
  };
  exports.getBestModeForData = function getBestModeForData(dataStr) {
    if (Regex.testNumeric(dataStr))
      return exports.NUMERIC;
    else if (Regex.testAlphanumeric(dataStr))
      return exports.ALPHANUMERIC;
    else if (Regex.testKanji(dataStr))
      return exports.KANJI;
    else
      return exports.BYTE;
  };
  exports.toString = function toString(mode2) {
    if (mode2 && mode2.id)
      return mode2.id;
    throw new Error("Invalid mode");
  };
  exports.isValid = function isValid2(mode2) {
    return mode2 && mode2.bit && mode2.ccBits;
  };
  function fromString(string) {
    if (typeof string !== "string") {
      throw new Error("Param is not a string");
    }
    const lcStr = string.toLowerCase();
    switch (lcStr) {
      case "numeric":
        return exports.NUMERIC;
      case "alphanumeric":
        return exports.ALPHANUMERIC;
      case "kanji":
        return exports.KANJI;
      case "byte":
        return exports.BYTE;
      default:
        throw new Error("Unknown mode: " + string);
    }
  }
  exports.from = function from(value, defaultValue) {
    if (exports.isValid(value)) {
      return value;
    }
    try {
      return fromString(value);
    } catch (e) {
      return defaultValue;
    }
  };
})(mode);
(function(exports) {
  const Utils2 = utils$1;
  const ECCode2 = errorCorrectionCode;
  const ECLevel2 = errorCorrectionLevel;
  const Mode2 = mode;
  const VersionCheck = versionCheck;
  const G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
  const G18_BCH = Utils2.getBCHDigit(G18);
  function getBestVersionForDataLength(mode2, length, errorCorrectionLevel2) {
    for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
      if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel2, mode2)) {
        return currentVersion;
      }
    }
    return void 0;
  }
  function getReservedBitsCount(mode2, version2) {
    return Mode2.getCharCountIndicator(mode2, version2) + 4;
  }
  function getTotalBitsFromDataArray(segments2, version2) {
    let totalBits = 0;
    segments2.forEach(function(data) {
      const reservedBits = getReservedBitsCount(data.mode, version2);
      totalBits += reservedBits + data.getBitsLength();
    });
    return totalBits;
  }
  function getBestVersionForMixedData(segments2, errorCorrectionLevel2) {
    for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
      const length = getTotalBitsFromDataArray(segments2, currentVersion);
      if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel2, Mode2.MIXED)) {
        return currentVersion;
      }
    }
    return void 0;
  }
  exports.from = function from(value, defaultValue) {
    if (VersionCheck.isValid(value)) {
      return parseInt(value, 10);
    }
    return defaultValue;
  };
  exports.getCapacity = function getCapacity(version2, errorCorrectionLevel2, mode2) {
    if (!VersionCheck.isValid(version2)) {
      throw new Error("Invalid QR Code version");
    }
    if (typeof mode2 === "undefined")
      mode2 = Mode2.BYTE;
    const totalCodewords = Utils2.getSymbolTotalCodewords(version2);
    const ecTotalCodewords = ECCode2.getTotalCodewordsCount(version2, errorCorrectionLevel2);
    const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
    if (mode2 === Mode2.MIXED)
      return dataTotalCodewordsBits;
    const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode2, version2);
    switch (mode2) {
      case Mode2.NUMERIC:
        return Math.floor(usableBits / 10 * 3);
      case Mode2.ALPHANUMERIC:
        return Math.floor(usableBits / 11 * 2);
      case Mode2.KANJI:
        return Math.floor(usableBits / 13);
      case Mode2.BYTE:
      default:
        return Math.floor(usableBits / 8);
    }
  };
  exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel2) {
    let seg;
    const ecl = ECLevel2.from(errorCorrectionLevel2, ECLevel2.M);
    if (Array.isArray(data)) {
      if (data.length > 1) {
        return getBestVersionForMixedData(data, ecl);
      }
      if (data.length === 0) {
        return 1;
      }
      seg = data[0];
    } else {
      seg = data;
    }
    return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
  };
  exports.getEncodedBits = function getEncodedBits2(version2) {
    if (!VersionCheck.isValid(version2) || version2 < 7) {
      throw new Error("Invalid QR Code version");
    }
    let d = version2 << 12;
    while (Utils2.getBCHDigit(d) - G18_BCH >= 0) {
      d ^= G18 << Utils2.getBCHDigit(d) - G18_BCH;
    }
    return version2 << 12 | d;
  };
})(version);
var formatInfo = {};
const Utils$3 = utils$1;
const G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
const G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
const G15_BCH = Utils$3.getBCHDigit(G15);
formatInfo.getEncodedBits = function getEncodedBits(errorCorrectionLevel2, mask) {
  const data = errorCorrectionLevel2.bit << 3 | mask;
  let d = data << 10;
  while (Utils$3.getBCHDigit(d) - G15_BCH >= 0) {
    d ^= G15 << Utils$3.getBCHDigit(d) - G15_BCH;
  }
  return (data << 10 | d) ^ G15_MASK;
};
var segments = {};
const Mode$4 = mode;
function NumericData(data) {
  this.mode = Mode$4.NUMERIC;
  this.data = data.toString();
}
NumericData.getBitsLength = function getBitsLength(length) {
  return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
};
NumericData.prototype.getLength = function getLength() {
  return this.data.length;
};
NumericData.prototype.getBitsLength = function getBitsLength2() {
  return NumericData.getBitsLength(this.data.length);
};
NumericData.prototype.write = function write(bitBuffer2) {
  let i, group, value;
  for (i = 0; i + 3 <= this.data.length; i += 3) {
    group = this.data.substr(i, 3);
    value = parseInt(group, 10);
    bitBuffer2.put(value, 10);
  }
  const remainingNum = this.data.length - i;
  if (remainingNum > 0) {
    group = this.data.substr(i);
    value = parseInt(group, 10);
    bitBuffer2.put(value, remainingNum * 3 + 1);
  }
};
var numericData = NumericData;
const Mode$3 = mode;
const ALPHA_NUM_CHARS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  " ",
  "$",
  "%",
  "*",
  "+",
  "-",
  ".",
  "/",
  ":"
];
function AlphanumericData(data) {
  this.mode = Mode$3.ALPHANUMERIC;
  this.data = data;
}
AlphanumericData.getBitsLength = function getBitsLength3(length) {
  return 11 * Math.floor(length / 2) + 6 * (length % 2);
};
AlphanumericData.prototype.getLength = function getLength2() {
  return this.data.length;
};
AlphanumericData.prototype.getBitsLength = function getBitsLength4() {
  return AlphanumericData.getBitsLength(this.data.length);
};
AlphanumericData.prototype.write = function write2(bitBuffer2) {
  let i;
  for (i = 0; i + 2 <= this.data.length; i += 2) {
    let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
    value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
    bitBuffer2.put(value, 11);
  }
  if (this.data.length % 2) {
    bitBuffer2.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
  }
};
var alphanumericData = AlphanumericData;
var encodeUtf8$1 = function encodeUtf8(input) {
  var result = [];
  var size = input.length;
  for (var index = 0; index < size; index++) {
    var point = input.charCodeAt(index);
    if (point >= 55296 && point <= 56319 && size > index + 1) {
      var second = input.charCodeAt(index + 1);
      if (second >= 56320 && second <= 57343) {
        point = (point - 55296) * 1024 + second - 56320 + 65536;
        index += 1;
      }
    }
    if (point < 128) {
      result.push(point);
      continue;
    }
    if (point < 2048) {
      result.push(point >> 6 | 192);
      result.push(point & 63 | 128);
      continue;
    }
    if (point < 55296 || point >= 57344 && point < 65536) {
      result.push(point >> 12 | 224);
      result.push(point >> 6 & 63 | 128);
      result.push(point & 63 | 128);
      continue;
    }
    if (point >= 65536 && point <= 1114111) {
      result.push(point >> 18 | 240);
      result.push(point >> 12 & 63 | 128);
      result.push(point >> 6 & 63 | 128);
      result.push(point & 63 | 128);
      continue;
    }
    result.push(239, 191, 189);
  }
  return new Uint8Array(result).buffer;
};
const encodeUtf82 = encodeUtf8$1;
const Mode$2 = mode;
function ByteData(data) {
  this.mode = Mode$2.BYTE;
  if (typeof data === "string") {
    data = encodeUtf82(data);
  }
  this.data = new Uint8Array(data);
}
ByteData.getBitsLength = function getBitsLength5(length) {
  return length * 8;
};
ByteData.prototype.getLength = function getLength3() {
  return this.data.length;
};
ByteData.prototype.getBitsLength = function getBitsLength6() {
  return ByteData.getBitsLength(this.data.length);
};
ByteData.prototype.write = function(bitBuffer2) {
  for (let i = 0, l = this.data.length; i < l; i++) {
    bitBuffer2.put(this.data[i], 8);
  }
};
var byteData = ByteData;
const Mode$1 = mode;
const Utils$2 = utils$1;
function KanjiData(data) {
  this.mode = Mode$1.KANJI;
  this.data = data;
}
KanjiData.getBitsLength = function getBitsLength7(length) {
  return length * 13;
};
KanjiData.prototype.getLength = function getLength4() {
  return this.data.length;
};
KanjiData.prototype.getBitsLength = function getBitsLength8() {
  return KanjiData.getBitsLength(this.data.length);
};
KanjiData.prototype.write = function(bitBuffer2) {
  let i;
  for (i = 0; i < this.data.length; i++) {
    let value = Utils$2.toSJIS(this.data[i]);
    if (value >= 33088 && value <= 40956) {
      value -= 33088;
    } else if (value >= 57408 && value <= 60351) {
      value -= 49472;
    } else {
      throw new Error(
        "Invalid SJIS character: " + this.data[i] + "\nMake sure your charset is UTF-8"
      );
    }
    value = (value >>> 8 & 255) * 192 + (value & 255);
    bitBuffer2.put(value, 13);
  }
};
var kanjiData = KanjiData;
var dijkstraExports = {};
var dijkstra = {
  get exports() {
    return dijkstraExports;
  },
  set exports(v) {
    dijkstraExports = v;
  }
};
(function(module) {
  var dijkstra2 = {
    single_source_shortest_paths: function(graph, s, d) {
      var predecessors = {};
      var costs = {};
      costs[s] = 0;
      var open = dijkstra2.PriorityQueue.make();
      open.push(s, 0);
      var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
      while (!open.empty()) {
        closest = open.pop();
        u = closest.value;
        cost_of_s_to_u = closest.cost;
        adjacent_nodes = graph[u] || {};
        for (v in adjacent_nodes) {
          if (adjacent_nodes.hasOwnProperty(v)) {
            cost_of_e = adjacent_nodes[v];
            cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
            cost_of_s_to_v = costs[v];
            first_visit = typeof costs[v] === "undefined";
            if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
              costs[v] = cost_of_s_to_u_plus_cost_of_e;
              open.push(v, cost_of_s_to_u_plus_cost_of_e);
              predecessors[v] = u;
            }
          }
        }
      }
      if (typeof d !== "undefined" && typeof costs[d] === "undefined") {
        var msg = ["Could not find a path from ", s, " to ", d, "."].join("");
        throw new Error(msg);
      }
      return predecessors;
    },
    extract_shortest_path_from_predecessor_list: function(predecessors, d) {
      var nodes = [];
      var u = d;
      while (u) {
        nodes.push(u);
        predecessors[u];
        u = predecessors[u];
      }
      nodes.reverse();
      return nodes;
    },
    find_path: function(graph, s, d) {
      var predecessors = dijkstra2.single_source_shortest_paths(graph, s, d);
      return dijkstra2.extract_shortest_path_from_predecessor_list(
        predecessors,
        d
      );
    },
    /**
     * A very naive priority queue implementation.
     */
    PriorityQueue: {
      make: function(opts) {
        var T = dijkstra2.PriorityQueue, t = {}, key;
        opts = opts || {};
        for (key in T) {
          if (T.hasOwnProperty(key)) {
            t[key] = T[key];
          }
        }
        t.queue = [];
        t.sorter = opts.sorter || T.default_sorter;
        return t;
      },
      default_sorter: function(a, b) {
        return a.cost - b.cost;
      },
      /**
       * Add a new item to the queue and ensure the highest priority element
       * is at the front of the queue.
       */
      push: function(value, cost) {
        var item = { value, cost };
        this.queue.push(item);
        this.queue.sort(this.sorter);
      },
      /**
       * Return the highest priority element in the queue.
       */
      pop: function() {
        return this.queue.shift();
      },
      empty: function() {
        return this.queue.length === 0;
      }
    }
  };
  {
    module.exports = dijkstra2;
  }
})(dijkstra);
(function(exports) {
  const Mode2 = mode;
  const NumericData2 = numericData;
  const AlphanumericData2 = alphanumericData;
  const ByteData2 = byteData;
  const KanjiData2 = kanjiData;
  const Regex = regex;
  const Utils2 = utils$1;
  const dijkstra2 = dijkstraExports;
  function getStringByteLength(str) {
    return unescape(encodeURIComponent(str)).length;
  }
  function getSegments(regex2, mode2, str) {
    const segments2 = [];
    let result;
    while ((result = regex2.exec(str)) !== null) {
      segments2.push({
        data: result[0],
        index: result.index,
        mode: mode2,
        length: result[0].length
      });
    }
    return segments2;
  }
  function getSegmentsFromString(dataStr) {
    const numSegs = getSegments(Regex.NUMERIC, Mode2.NUMERIC, dataStr);
    const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode2.ALPHANUMERIC, dataStr);
    let byteSegs;
    let kanjiSegs;
    if (Utils2.isKanjiModeEnabled()) {
      byteSegs = getSegments(Regex.BYTE, Mode2.BYTE, dataStr);
      kanjiSegs = getSegments(Regex.KANJI, Mode2.KANJI, dataStr);
    } else {
      byteSegs = getSegments(Regex.BYTE_KANJI, Mode2.BYTE, dataStr);
      kanjiSegs = [];
    }
    const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
    return segs.sort(function(s1, s2) {
      return s1.index - s2.index;
    }).map(function(obj) {
      return {
        data: obj.data,
        mode: obj.mode,
        length: obj.length
      };
    });
  }
  function getSegmentBitsLength(length, mode2) {
    switch (mode2) {
      case Mode2.NUMERIC:
        return NumericData2.getBitsLength(length);
      case Mode2.ALPHANUMERIC:
        return AlphanumericData2.getBitsLength(length);
      case Mode2.KANJI:
        return KanjiData2.getBitsLength(length);
      case Mode2.BYTE:
        return ByteData2.getBitsLength(length);
    }
  }
  function mergeSegments(segs) {
    return segs.reduce(function(acc, curr) {
      const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
      if (prevSeg && prevSeg.mode === curr.mode) {
        acc[acc.length - 1].data += curr.data;
        return acc;
      }
      acc.push(curr);
      return acc;
    }, []);
  }
  function buildNodes(segs) {
    const nodes = [];
    for (let i = 0; i < segs.length; i++) {
      const seg = segs[i];
      switch (seg.mode) {
        case Mode2.NUMERIC:
          nodes.push([
            seg,
            { data: seg.data, mode: Mode2.ALPHANUMERIC, length: seg.length },
            { data: seg.data, mode: Mode2.BYTE, length: seg.length }
          ]);
          break;
        case Mode2.ALPHANUMERIC:
          nodes.push([
            seg,
            { data: seg.data, mode: Mode2.BYTE, length: seg.length }
          ]);
          break;
        case Mode2.KANJI:
          nodes.push([
            seg,
            { data: seg.data, mode: Mode2.BYTE, length: getStringByteLength(seg.data) }
          ]);
          break;
        case Mode2.BYTE:
          nodes.push([
            { data: seg.data, mode: Mode2.BYTE, length: getStringByteLength(seg.data) }
          ]);
      }
    }
    return nodes;
  }
  function buildGraph(nodes, version2) {
    const table = {};
    const graph = { start: {} };
    let prevNodeIds = ["start"];
    for (let i = 0; i < nodes.length; i++) {
      const nodeGroup = nodes[i];
      const currentNodeIds = [];
      for (let j = 0; j < nodeGroup.length; j++) {
        const node = nodeGroup[j];
        const key = "" + i + j;
        currentNodeIds.push(key);
        table[key] = { node, lastCount: 0 };
        graph[key] = {};
        for (let n = 0; n < prevNodeIds.length; n++) {
          const prevNodeId = prevNodeIds[n];
          if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
            graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
            table[prevNodeId].lastCount += node.length;
          } else {
            if (table[prevNodeId])
              table[prevNodeId].lastCount = node.length;
            graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode2.getCharCountIndicator(node.mode, version2);
          }
        }
      }
      prevNodeIds = currentNodeIds;
    }
    for (let n = 0; n < prevNodeIds.length; n++) {
      graph[prevNodeIds[n]].end = 0;
    }
    return { map: graph, table };
  }
  function buildSingleSegment(data, modesHint) {
    let mode2;
    const bestMode = Mode2.getBestModeForData(data);
    mode2 = Mode2.from(modesHint, bestMode);
    if (mode2 !== Mode2.BYTE && mode2.bit < bestMode.bit) {
      throw new Error('"' + data + '" cannot be encoded with mode ' + Mode2.toString(mode2) + ".\n Suggested mode is: " + Mode2.toString(bestMode));
    }
    if (mode2 === Mode2.KANJI && !Utils2.isKanjiModeEnabled()) {
      mode2 = Mode2.BYTE;
    }
    switch (mode2) {
      case Mode2.NUMERIC:
        return new NumericData2(data);
      case Mode2.ALPHANUMERIC:
        return new AlphanumericData2(data);
      case Mode2.KANJI:
        return new KanjiData2(data);
      case Mode2.BYTE:
        return new ByteData2(data);
    }
  }
  exports.fromArray = function fromArray(array) {
    return array.reduce(function(acc, seg) {
      if (typeof seg === "string") {
        acc.push(buildSingleSegment(seg, null));
      } else if (seg.data) {
        acc.push(buildSingleSegment(seg.data, seg.mode));
      }
      return acc;
    }, []);
  };
  exports.fromString = function fromString(data, version2) {
    const segs = getSegmentsFromString(data, Utils2.isKanjiModeEnabled());
    const nodes = buildNodes(segs);
    const graph = buildGraph(nodes, version2);
    const path = dijkstra2.find_path(graph.map, "start", "end");
    const optimizedSegs = [];
    for (let i = 1; i < path.length - 1; i++) {
      optimizedSegs.push(graph.table[path[i]].node);
    }
    return exports.fromArray(mergeSegments(optimizedSegs));
  };
  exports.rawSplit = function rawSplit(data) {
    return exports.fromArray(
      getSegmentsFromString(data, Utils2.isKanjiModeEnabled())
    );
  };
})(segments);
const Utils$1 = utils$1;
const ECLevel = errorCorrectionLevel;
const BitBuffer = bitBuffer;
const BitMatrix = bitMatrix;
const AlignmentPattern = alignmentPattern;
const FinderPattern = finderPattern;
const MaskPattern = maskPattern;
const ECCode = errorCorrectionCode;
const ReedSolomonEncoder = reedSolomonEncoder;
const Version = version;
const FormatInfo = formatInfo;
const Mode = mode;
const Segments = segments;
function setupFinderPattern(matrix, version2) {
  const size = matrix.size;
  const pos = FinderPattern.getPositions(version2);
  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0];
    const col = pos[i][1];
    for (let r = -1; r <= 7; r++) {
      if (row + r <= -1 || size <= row + r)
        continue;
      for (let c = -1; c <= 7; c++) {
        if (col + c <= -1 || size <= col + c)
          continue;
        if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}
function setupTimingPattern(matrix) {
  const size = matrix.size;
  for (let r = 8; r < size - 8; r++) {
    const value = r % 2 === 0;
    matrix.set(r, 6, value, true);
    matrix.set(6, r, value, true);
  }
}
function setupAlignmentPattern(matrix, version2) {
  const pos = AlignmentPattern.getPositions(version2);
  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0];
    const col = pos[i][1];
    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}
function setupVersionInfo(matrix, version2) {
  const size = matrix.size;
  const bits = Version.getEncodedBits(version2);
  let row, col, mod;
  for (let i = 0; i < 18; i++) {
    row = Math.floor(i / 3);
    col = i % 3 + size - 8 - 3;
    mod = (bits >> i & 1) === 1;
    matrix.set(row, col, mod, true);
    matrix.set(col, row, mod, true);
  }
}
function setupFormatInfo(matrix, errorCorrectionLevel2, maskPattern2) {
  const size = matrix.size;
  const bits = FormatInfo.getEncodedBits(errorCorrectionLevel2, maskPattern2);
  let i, mod;
  for (i = 0; i < 15; i++) {
    mod = (bits >> i & 1) === 1;
    if (i < 6) {
      matrix.set(i, 8, mod, true);
    } else if (i < 8) {
      matrix.set(i + 1, 8, mod, true);
    } else {
      matrix.set(size - 15 + i, 8, mod, true);
    }
    if (i < 8) {
      matrix.set(8, size - i - 1, mod, true);
    } else if (i < 9) {
      matrix.set(8, 15 - i - 1 + 1, mod, true);
    } else {
      matrix.set(8, 15 - i - 1, mod, true);
    }
  }
  matrix.set(size - 8, 8, 1, true);
}
function setupData(matrix, data) {
  const size = matrix.size;
  let inc = -1;
  let row = size - 1;
  let bitIndex = 7;
  let byteIndex = 0;
  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6)
      col--;
    while (true) {
      for (let c = 0; c < 2; c++) {
        if (!matrix.isReserved(row, col - c)) {
          let dark = false;
          if (byteIndex < data.length) {
            dark = (data[byteIndex] >>> bitIndex & 1) === 1;
          }
          matrix.set(row, col - c, dark);
          bitIndex--;
          if (bitIndex === -1) {
            byteIndex++;
            bitIndex = 7;
          }
        }
      }
      row += inc;
      if (row < 0 || size <= row) {
        row -= inc;
        inc = -inc;
        break;
      }
    }
  }
}
function createData(version2, errorCorrectionLevel2, segments2) {
  const buffer = new BitBuffer();
  segments2.forEach(function(data) {
    buffer.put(data.mode.bit, 4);
    buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version2));
    data.write(buffer);
  });
  const totalCodewords = Utils$1.getSymbolTotalCodewords(version2);
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version2, errorCorrectionLevel2);
  const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
  if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
    buffer.put(0, 4);
  }
  while (buffer.getLengthInBits() % 8 !== 0) {
    buffer.putBit(0);
  }
  const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
  for (let i = 0; i < remainingByte; i++) {
    buffer.put(i % 2 ? 17 : 236, 8);
  }
  return createCodewords(buffer, version2, errorCorrectionLevel2);
}
function createCodewords(bitBuffer2, version2, errorCorrectionLevel2) {
  const totalCodewords = Utils$1.getSymbolTotalCodewords(version2);
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version2, errorCorrectionLevel2);
  const dataTotalCodewords = totalCodewords - ecTotalCodewords;
  const ecTotalBlocks = ECCode.getBlocksCount(version2, errorCorrectionLevel2);
  const blocksInGroup2 = totalCodewords % ecTotalBlocks;
  const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
  const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
  const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
  const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
  const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
  const rs = new ReedSolomonEncoder(ecCount);
  let offset = 0;
  const dcData = new Array(ecTotalBlocks);
  const ecData = new Array(ecTotalBlocks);
  let maxDataSize = 0;
  const buffer = new Uint8Array(bitBuffer2.buffer);
  for (let b = 0; b < ecTotalBlocks; b++) {
    const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
    dcData[b] = buffer.slice(offset, offset + dataSize);
    ecData[b] = rs.encode(dcData[b]);
    offset += dataSize;
    maxDataSize = Math.max(maxDataSize, dataSize);
  }
  const data = new Uint8Array(totalCodewords);
  let index = 0;
  let i, r;
  for (i = 0; i < maxDataSize; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      if (i < dcData[r].length) {
        data[index++] = dcData[r][i];
      }
    }
  }
  for (i = 0; i < ecCount; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      data[index++] = ecData[r][i];
    }
  }
  return data;
}
function createSymbol(data, version2, errorCorrectionLevel2, maskPattern2) {
  let segments2;
  if (Array.isArray(data)) {
    segments2 = Segments.fromArray(data);
  } else if (typeof data === "string") {
    let estimatedVersion = version2;
    if (!estimatedVersion) {
      const rawSegments = Segments.rawSplit(data);
      estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel2);
    }
    segments2 = Segments.fromString(data, estimatedVersion || 40);
  } else {
    throw new Error("Invalid data");
  }
  const bestVersion = Version.getBestVersionForData(segments2, errorCorrectionLevel2);
  if (!bestVersion) {
    throw new Error("The amount of data is too big to be stored in a QR Code");
  }
  if (!version2) {
    version2 = bestVersion;
  } else if (version2 < bestVersion) {
    throw new Error(
      "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n"
    );
  }
  const dataBits = createData(version2, errorCorrectionLevel2, segments2);
  const moduleCount = Utils$1.getSymbolSize(version2);
  const modules = new BitMatrix(moduleCount);
  setupFinderPattern(modules, version2);
  setupTimingPattern(modules);
  setupAlignmentPattern(modules, version2);
  setupFormatInfo(modules, errorCorrectionLevel2, 0);
  if (version2 >= 7) {
    setupVersionInfo(modules, version2);
  }
  setupData(modules, dataBits);
  if (isNaN(maskPattern2)) {
    maskPattern2 = MaskPattern.getBestMask(
      modules,
      setupFormatInfo.bind(null, modules, errorCorrectionLevel2)
    );
  }
  MaskPattern.applyMask(maskPattern2, modules);
  setupFormatInfo(modules, errorCorrectionLevel2, maskPattern2);
  return {
    modules,
    version: version2,
    errorCorrectionLevel: errorCorrectionLevel2,
    maskPattern: maskPattern2,
    segments: segments2
  };
}
qrcode.create = function create(data, options) {
  if (typeof data === "undefined" || data === "") {
    throw new Error("No input text");
  }
  let errorCorrectionLevel2 = ECLevel.M;
  let version2;
  let mask;
  if (typeof options !== "undefined") {
    errorCorrectionLevel2 = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
    version2 = Version.from(options.version);
    mask = MaskPattern.from(options.maskPattern);
    if (options.toSJISFunc) {
      Utils$1.setToSJISFunction(options.toSJISFunc);
    }
  }
  return createSymbol(data, version2, errorCorrectionLevel2, mask);
};
var canvas = {};
var utils = {};
(function(exports) {
  function hex2rgba(hex) {
    if (typeof hex === "number") {
      hex = hex.toString();
    }
    if (typeof hex !== "string") {
      throw new Error("Color should be defined as hex string");
    }
    let hexCode = hex.slice().replace("#", "").split("");
    if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
      throw new Error("Invalid hex color: " + hex);
    }
    if (hexCode.length === 3 || hexCode.length === 4) {
      hexCode = Array.prototype.concat.apply([], hexCode.map(function(c) {
        return [c, c];
      }));
    }
    if (hexCode.length === 6)
      hexCode.push("F", "F");
    const hexValue = parseInt(hexCode.join(""), 16);
    return {
      r: hexValue >> 24 & 255,
      g: hexValue >> 16 & 255,
      b: hexValue >> 8 & 255,
      a: hexValue & 255,
      hex: "#" + hexCode.slice(0, 6).join("")
    };
  }
  exports.getOptions = function getOptions(options) {
    if (!options)
      options = {};
    if (!options.color)
      options.color = {};
    const margin = typeof options.margin === "undefined" || options.margin === null || options.margin < 0 ? 4 : options.margin;
    const width = options.width && options.width >= 21 ? options.width : void 0;
    const scale = options.scale || 4;
    return {
      width,
      scale: width ? 4 : scale,
      margin,
      color: {
        dark: hex2rgba(options.color.dark || "#000000ff"),
        light: hex2rgba(options.color.light || "#ffffffff")
      },
      type: options.type,
      rendererOpts: options.rendererOpts || {}
    };
  };
  exports.getScale = function getScale(qrSize, opts) {
    return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
  };
  exports.getImageWidth = function getImageWidth(qrSize, opts) {
    const scale = exports.getScale(qrSize, opts);
    return Math.floor((qrSize + opts.margin * 2) * scale);
  };
  exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
    const size = qr.modules.size;
    const data = qr.modules.data;
    const scale = exports.getScale(size, opts);
    const symbolSize = Math.floor((size + opts.margin * 2) * scale);
    const scaledMargin = opts.margin * scale;
    const palette = [opts.color.light, opts.color.dark];
    for (let i = 0; i < symbolSize; i++) {
      for (let j = 0; j < symbolSize; j++) {
        let posDst = (i * symbolSize + j) * 4;
        let pxColor = opts.color.light;
        if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
          const iSrc = Math.floor((i - scaledMargin) / scale);
          const jSrc = Math.floor((j - scaledMargin) / scale);
          pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
        }
        imgData[posDst++] = pxColor.r;
        imgData[posDst++] = pxColor.g;
        imgData[posDst++] = pxColor.b;
        imgData[posDst] = pxColor.a;
      }
    }
  };
})(utils);
(function(exports) {
  const Utils2 = utils;
  function clearCanvas(ctx, canvas2, size) {
    ctx.clearRect(0, 0, canvas2.width, canvas2.height);
    if (!canvas2.style)
      canvas2.style = {};
    canvas2.height = size;
    canvas2.width = size;
    canvas2.style.height = size + "px";
    canvas2.style.width = size + "px";
  }
  function getCanvasElement() {
    try {
      return document.createElement("canvas");
    } catch (e) {
      throw new Error("You need to specify a canvas element");
    }
  }
  exports.render = function render2(qrData, canvas2, options) {
    let opts = options;
    let canvasEl = canvas2;
    if (typeof opts === "undefined" && (!canvas2 || !canvas2.getContext)) {
      opts = canvas2;
      canvas2 = void 0;
    }
    if (!canvas2) {
      canvasEl = getCanvasElement();
    }
    opts = Utils2.getOptions(opts);
    const size = Utils2.getImageWidth(qrData.modules.size, opts);
    const ctx = canvasEl.getContext("2d");
    const image = ctx.createImageData(size, size);
    Utils2.qrToImageData(image.data, qrData, opts);
    clearCanvas(ctx, canvasEl, size);
    ctx.putImageData(image, 0, 0);
    return canvasEl;
  };
  exports.renderToDataURL = function renderToDataURL(qrData, canvas2, options) {
    let opts = options;
    if (typeof opts === "undefined" && (!canvas2 || !canvas2.getContext)) {
      opts = canvas2;
      canvas2 = void 0;
    }
    if (!opts)
      opts = {};
    const canvasEl = exports.render(qrData, canvas2, opts);
    const type = opts.type || "image/png";
    const rendererOpts = opts.rendererOpts || {};
    return canvasEl.toDataURL(type, rendererOpts.quality);
  };
})(canvas);
var svgTag = {};
const Utils = utils;
function getColorAttrib(color, attrib) {
  const alpha = color.a / 255;
  const str = attrib + '="' + color.hex + '"';
  return alpha < 1 ? str + " " + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
}
function svgCmd(cmd, x, y) {
  let str = cmd + x;
  if (typeof y !== "undefined")
    str += " " + y;
  return str;
}
function qrToPath(data, size, margin) {
  let path = "";
  let moveBy = 0;
  let newRow = false;
  let lineLength = 0;
  for (let i = 0; i < data.length; i++) {
    const col = Math.floor(i % size);
    const row = Math.floor(i / size);
    if (!col && !newRow)
      newRow = true;
    if (data[i]) {
      lineLength++;
      if (!(i > 0 && col > 0 && data[i - 1])) {
        path += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
        moveBy = 0;
        newRow = false;
      }
      if (!(col + 1 < size && data[i + 1])) {
        path += svgCmd("h", lineLength);
        lineLength = 0;
      }
    } else {
      moveBy++;
    }
  }
  return path;
}
svgTag.render = function render(qrData, options, cb) {
  const opts = Utils.getOptions(options);
  const size = qrData.modules.size;
  const data = qrData.modules.data;
  const qrcodesize = size + opts.margin * 2;
  const bg = !opts.color.light.a ? "" : "<path " + getColorAttrib(opts.color.light, "fill") + ' d="M0 0h' + qrcodesize + "v" + qrcodesize + 'H0z"/>';
  const path = "<path " + getColorAttrib(opts.color.dark, "stroke") + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
  const viewBox = 'viewBox="0 0 ' + qrcodesize + " " + qrcodesize + '"';
  const width = !opts.width ? "" : 'width="' + opts.width + '" height="' + opts.width + '" ';
  const svgTag2 = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + "</svg>\n";
  if (typeof cb === "function") {
    cb(null, svgTag2);
  }
  return svgTag2;
};
const canPromise = canPromise$1;
const QRCode$1 = qrcode;
const CanvasRenderer = canvas;
const SvgRenderer = svgTag;
function renderCanvas(renderFunc, canvas2, text, opts, cb) {
  const args = [].slice.call(arguments, 1);
  const argsNum = args.length;
  const isLastArgCb = typeof args[argsNum - 1] === "function";
  if (!isLastArgCb && !canPromise()) {
    throw new Error("Callback required as last argument");
  }
  if (isLastArgCb) {
    if (argsNum < 2) {
      throw new Error("Too few arguments provided");
    }
    if (argsNum === 2) {
      cb = text;
      text = canvas2;
      canvas2 = opts = void 0;
    } else if (argsNum === 3) {
      if (canvas2.getContext && typeof cb === "undefined") {
        cb = opts;
        opts = void 0;
      } else {
        cb = opts;
        opts = text;
        text = canvas2;
        canvas2 = void 0;
      }
    }
  } else {
    if (argsNum < 1) {
      throw new Error("Too few arguments provided");
    }
    if (argsNum === 1) {
      text = canvas2;
      canvas2 = opts = void 0;
    } else if (argsNum === 2 && !canvas2.getContext) {
      opts = text;
      text = canvas2;
      canvas2 = void 0;
    }
    return new Promise(function(resolve, reject) {
      try {
        const data = QRCode$1.create(text, opts);
        resolve(renderFunc(data, canvas2, opts));
      } catch (e) {
        reject(e);
      }
    });
  }
  try {
    const data = QRCode$1.create(text, opts);
    cb(null, renderFunc(data, canvas2, opts));
  } catch (e) {
    cb(e);
  }
}
browser.create = QRCode$1.create;
browser.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
browser.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
browser.toString = renderCanvas.bind(null, function(data, _, opts) {
  return SvgRenderer.render(data, opts);
});
function useQRCode(text, options) {
  const src = resolveRef(text);
  const result = ref("");
  watch(src, async (value) => {
    if (src.value && isClient)
      result.value = await browser.toDataURL(value, options);
  }, { immediate: true });
  return result;
}
const _hoisted_1$f = ["src"];
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "QRCode",
  props: {
    value: { default: "" },
    size: { default: 160 },
    color: { default: "#000" },
    backgroundColor: { default: "#FFF" },
    bordered: { type: Boolean, default: true },
    scale: { default: 8 },
    errorLevel: { default: "H" }
  },
  setup(__props) {
    const props = __props;
    const qrcode2 = useQRCode(props.value, {
      errorCorrectionLevel: props.errorLevel,
      type: "image/png",
      quality: 1,
      margin: 3,
      scale: props.scale,
      // 8px per modules(black dots)
      color: {
        dark: props.color,
        // 像素点颜色
        light: props.backgroundColor
        // 背景色
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-qrcode", { "bordered": __props.bordered }]),
        style: normalizeStyle(`width: ${__props.size}px; height: ${__props.size}px;`)
      }, [
        createElementVNode("img", {
          src: unref(qrcode2),
          class: "u-qrcode",
          alt: "QRCode"
        }, null, 8, _hoisted_1$f)
      ], 6);
    };
  }
});
const QRCode_vue_vue_type_style_index_0_scoped_119eb030_lang = "";
const QRCode = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-119eb030"]]);
QRCode.install = (app) => {
  app.component(QRCode.__name, QRCode);
};
const _hoisted_1$e = ["onClick"];
const _hoisted_2$b = { class: "u-label" };
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "Radio",
  props: {
    options: { default: () => [] },
    disabled: { type: Boolean, default: false },
    vertical: { type: Boolean, default: false },
    value: { default: null },
    gap: { default: 8 }
  },
  emits: ["update:value", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const sum = computed(() => {
      return props.options.length;
    });
    const styleObject = computed(() => {
      if (props.vertical) {
        return {
          marginBottom: props.gap + "px"
        };
      } else {
        return {
          marginRight: props.gap + "px"
        };
      }
    });
    function onClick(value) {
      if (value !== props.value) {
        emits("update:value", value);
        emits("change", value);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-radio", { "vertical": __props.vertical }])
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (option, index) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["m-radio-wrap", { "disabled": __props.disabled || option.disabled }]),
            style: normalizeStyle(unref(sum) !== index + 1 ? unref(styleObject) : ""),
            onClick: ($event) => __props.disabled || option.disabled ? (e) => e.preventDefault() : onClick(option.value),
            key: index
          }, [
            createElementVNode("span", {
              class: normalizeClass(["u-radio", { "u-radio-checked": __props.value === option.value }])
            }, null, 2),
            createElementVNode("span", _hoisted_2$b, toDisplayString(option.label), 1)
          ], 14, _hoisted_1$e);
        }), 128))
      ], 2);
    };
  }
});
const Radio_vue_vue_type_style_index_0_scoped_f68bdad7_lang = "";
const Radio = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-f68bdad7"]]);
Radio.install = (app) => {
  app.component(Radio.__name, Radio);
};
const _withScopeId$5 = (n) => (pushScopeId("data-v-cc49791a"), n = n(), popScopeId(), n);
const _hoisted_1$d = ["onClick"];
const _hoisted_2$a = ["onClick", "onMouseenter"];
const _hoisted_3$8 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createElementVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" }, null, -1));
const _hoisted_4$6 = [
  _hoisted_3$8
];
const _hoisted_5$3 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createElementVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" }, null, -1));
const _hoisted_6$3 = [
  _hoisted_5$3
];
const _hoisted_7$3 = ["onClick", "onMouseenter"];
const _hoisted_8$2 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createElementVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" }, null, -1));
const _hoisted_9$2 = [
  _hoisted_8$2
];
const _hoisted_10 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createElementVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" }, null, -1));
const _hoisted_11 = [
  _hoisted_10
];
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "Rate",
  props: {
    allowClear: { type: Boolean, default: true },
    allowHalf: { type: Boolean, default: false },
    count: { default: 5 },
    character: { default: "" },
    size: { default: 20 },
    gap: { default: 8 },
    disabled: { type: Boolean, default: false },
    value: { default: 0 }
  },
  emits: ["update:value", "change", "hoverChange"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const activeValue = ref(props.value);
    const tempValue = ref();
    watch(
      () => props.value,
      (to) => {
        activeValue.value = to;
      }
    );
    function onClick(value) {
      tempValue.value = null;
      if (value !== props.value) {
        emits("change", value);
        emits("update:value", value);
      } else {
        if (props.allowClear) {
          tempValue.value = value;
          emits("change", 0);
          emits("update:value", 0);
        } else {
          emits("change", value);
        }
      }
    }
    function onFirstEnter(value) {
      activeValue.value = value;
      emits("hoverChange", value);
    }
    function onSecondEnter(value) {
      activeValue.value = value;
      emits("hoverChange", value);
    }
    function resetTempValue() {
      tempValue.value = null;
    }
    function onLeave() {
      activeValue.value = props.value;
    }
    function preventDefault(e) {
      e.preventDefault();
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-rate", { "disabled": __props.disabled }]),
        onMouseleave: onLeave
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.count, (n) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["m-star", { "u-star-half": __props.allowHalf && activeValue.value >= n - 0.5 && activeValue.value < n, "u-star-full": activeValue.value >= n, "temp-gray": !__props.allowHalf && tempValue.value === n }]),
            style: normalizeStyle(`margin-right: ${n !== __props.count ? __props.gap : 0}px;`),
            onClick: ($event) => !__props.allowHalf ? onClick(n) : preventDefault($event),
            key: n
          }, [
            __props.allowHalf ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["u-star-first", { "temp-gray-first": tempValue.value === n - 0.5 }]),
              onClick: withModifiers(($event) => onClick(n - 0.5), ["stop"]),
              onMouseenter: ($event) => onFirstEnter(n - 0.5),
              onMouseleave: resetTempValue
            }, [
              __props.character === "star" ? (openBlock(), createElementBlock("svg", {
                key: 0,
                class: "u-star",
                style: normalizeStyle(`width: ${__props.size}px;`),
                focusable: "false",
                "data-icon": "star",
                "aria-hidden": "true",
                viewBox: "64 64 896 896"
              }, _hoisted_4$6, 4)) : __props.character === "heart" ? (openBlock(), createElementBlock("svg", {
                key: 1,
                class: "u-star",
                style: normalizeStyle(`width: ${__props.size}px;`),
                focusable: "false",
                "data-icon": "heart",
                "aria-hidden": "true",
                viewBox: "64 64 896 896"
              }, _hoisted_6$3, 4)) : (openBlock(), createElementBlock("span", {
                key: 2,
                class: "u-star",
                style: normalizeStyle(`font-size: ${0.66 * __props.size}px; height: ${__props.size}px;`)
              }, [
                renderSlot(_ctx.$slots, "character", {}, () => [
                  createTextVNode(toDisplayString(__props.character), 1)
                ], true)
              ], 4))
            ], 42, _hoisted_2$a)) : createCommentVNode("", true),
            createElementVNode("div", {
              class: normalizeClass(["u-star-second", { "temp-gray-second": tempValue.value === n }]),
              onClick: withModifiers(($event) => onClick(n), ["stop"]),
              onMouseenter: ($event) => onSecondEnter(n),
              onMouseleave: resetTempValue
            }, [
              __props.character === "star" ? (openBlock(), createElementBlock("svg", {
                key: 0,
                class: "u-star",
                style: normalizeStyle(`width: ${__props.size}px;`),
                focusable: "false",
                "data-icon": "star",
                "aria-hidden": "true",
                viewBox: "64 64 896 896"
              }, _hoisted_9$2, 4)) : __props.character === "heart" ? (openBlock(), createElementBlock("svg", {
                key: 1,
                class: "u-star",
                style: normalizeStyle(`width: ${__props.size}px;`),
                focusable: "false",
                "data-icon": "heart",
                "aria-hidden": "true",
                viewBox: "64 64 896 896"
              }, _hoisted_11, 4)) : (openBlock(), createElementBlock("span", {
                key: 2,
                class: "u-star",
                style: normalizeStyle(`font-size: ${0.66 * __props.size}px; height: ${__props.size}px;`)
              }, [
                renderSlot(_ctx.$slots, "character", {}, () => [
                  createTextVNode(toDisplayString(__props.character), 1)
                ], true)
              ], 4))
            ], 42, _hoisted_7$3)
          ], 14, _hoisted_1$d);
        }), 128))
      ], 34);
    };
  }
});
const Rate_vue_vue_type_style_index_0_scoped_cc49791a_lang = "";
const Rate = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-cc49791a"]]);
Rate.install = (app) => {
  app.component(Rate.__name, Rate);
};
const _withScopeId$4 = (n) => (pushScopeId("data-v-cc1d0811"), n = n(), popScopeId(), n);
const _hoisted_1$c = ["title"];
const _hoisted_2$9 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1));
const _hoisted_3$7 = [
  _hoisted_2$9
];
const _hoisted_4$5 = ["onClick"];
const _hoisted_5$2 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1));
const _hoisted_6$2 = [
  _hoisted_5$2
];
const _hoisted_7$2 = ["title", "onMouseenter", "onClick"];
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "Select",
  props: {
    options: {
      // 选项数据
      type: Array,
      default: () => []
    },
    label: {
      // 选择器字典项的文本字段名
      type: String,
      default: "label"
    },
    value: {
      // 选择器字典项的值字段名
      type: String,
      default: "value"
    },
    placeholder: {
      // 选择框默认文字
      type: String,
      default: "请选择"
    },
    disabled: {
      // 是否禁用下拉
      type: Boolean,
      default: false
    },
    allowClear: {
      // 是否支持清除
      type: Boolean,
      default: false
    },
    width: {
      // 选择框宽度
      type: Number,
      default: 200
    },
    height: {
      // 选择框高度
      type: Number,
      default: 36
    },
    num: {
      // 下拉面板最多能展示的下拉项数，超过后滚动显示
      type: Number,
      default: 6
    },
    selectedValue: {
      // （v-model）当前选中的option条目
      type: [Number, String],
      default: null
    }
  },
  emits: ["update:selectedValue", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const selectedName = ref();
    const hoverValue = ref();
    const showOptions = ref(false);
    const activeBlur = ref(true);
    const showClose = ref(false);
    watch(
      () => props.options,
      (to) => {
        initSelector();
      }
    );
    watch(
      () => props.selectedValue,
      (to) => {
        initSelector();
      }
    );
    onMounted(() => {
      initSelector();
    });
    function initSelector() {
      if (props.selectedValue) {
        const target = props.options.find((option) => option[props.value] === props.selectedValue);
        if (target) {
          selectedName.value = target[props.label];
          hoverValue.value = target[props.value];
        } else {
          selectedName.value = props.selectedValue;
          hoverValue.value = null;
        }
      } else {
        selectedName.value = null;
        hoverValue.value = null;
      }
    }
    function onBlur() {
      if (showOptions.value) {
        showOptions.value = false;
      }
    }
    function onInputEnter() {
      if (props.allowClear && selectedName.value) {
        showClose.value = true;
      }
    }
    function onInputLeave() {
      if (props.allowClear && showClose.value) {
        showClose.value = false;
      }
    }
    function onHover(value) {
      hoverValue.value = value;
    }
    function onEnter() {
      activeBlur.value = false;
    }
    function onLeave() {
      hoverValue.value = null;
      activeBlur.value = true;
    }
    function openSelect() {
      showOptions.value = !showOptions.value;
      if (!hoverValue.value && selectedName.value) {
        const target = props.options.find((option) => option[props.label] === selectedName.value);
        hoverValue.value = target ? target[props.value] : null;
      }
    }
    function onClear() {
      showClose.value = false;
      selectedName.value = null;
      hoverValue.value = null;
    }
    function onChange(value, label, index) {
      if (props.selectedValue !== value) {
        selectedName.value = label;
        hoverValue.value = value;
        emits("update:selectedValue", value);
        emits("change", value, label, index);
      }
      showOptions.value = false;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-select",
        style: normalizeStyle(`height: ${__props.height}px;`)
      }, [
        createElementVNode("div", {
          class: normalizeClass(["m-select-wrap", { "hover": !__props.disabled, "focus": showOptions.value, "disabled": __props.disabled }]),
          style: normalizeStyle(`width: ${__props.width - 2}px; height: ${__props.height - 2}px;`),
          tabindex: "0",
          onMouseenter: onInputEnter,
          onMouseleave: onInputLeave,
          onBlur: _cache[0] || (_cache[0] = ($event) => activeBlur.value && !__props.disabled ? onBlur() : (e) => e.preventDefault()),
          onClick: _cache[1] || (_cache[1] = ($event) => __props.disabled ? (e) => e.preventDefault() : openSelect())
        }, [
          createElementVNode("div", {
            class: normalizeClass(["u-select-input", { "placeholder": !selectedName.value }]),
            style: normalizeStyle(`line-height: ${__props.height - 2}px;width: ${__props.width - 37}px; height: ${__props.height - 2}px;`),
            title: selectedName.value
          }, toDisplayString(selectedName.value || __props.placeholder), 15, _hoisted_1$c),
          (openBlock(), createElementBlock("svg", {
            class: normalizeClass(["triangle", { "rotate": showOptions.value, "show": !showClose.value }]),
            viewBox: "64 64 896 896",
            "data-icon": "down",
            "aria-hidden": "true",
            focusable: "false"
          }, _hoisted_3$7, 2)),
          (openBlock(), createElementBlock("svg", {
            onClick: withModifiers(onClear, ["stop"]),
            class: normalizeClass(["close", { "show": showClose.value }]),
            focusable: "false",
            "data-icon": "close-circle",
            "aria-hidden": "true",
            viewBox: "64 64 896 896"
          }, _hoisted_6$2, 10, _hoisted_4$5))
        ], 38),
        createVNode(Transition, { name: "fade" }, {
          default: withCtx(() => [
            withDirectives(createElementVNode("div", {
              class: "m-options-panel",
              onMouseenter: onEnter,
              onMouseleave: onLeave,
              style: normalizeStyle(`top: ${__props.height + 6}px; line-height: ${__props.height - 12}px; max-height: ${__props.num * (__props.height - 2)}px; width: ${__props.width}px;`)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (option, index) => {
                return openBlock(), createElementBlock("p", {
                  key: index,
                  class: normalizeClass(["u-option", { "option-selected": option[__props.label] === selectedName.value, "option-hover": !option.disabled && option[__props.value] === hoverValue.value, "option-disabled": option.disabled }]),
                  title: option[__props.label],
                  onMouseenter: ($event) => onHover(option[__props.value]),
                  onClick: ($event) => option.disabled ? (e) => e.preventDefault() : onChange(option[__props.value], option[__props.label], index)
                }, toDisplayString(option[__props.label]), 43, _hoisted_7$2);
              }), 128))
            ], 36), [
              [vShow, showOptions.value]
            ])
          ]),
          _: 1
        })
      ], 4);
    };
  }
});
const Select_vue_vue_type_style_index_0_scoped_cc1d0811_lang = "";
const Select = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-cc1d0811"]]);
Select.install = (app) => {
  app.component(Select.__name, Select);
};
const _hoisted_1$b = ["onClick"];
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "Slider",
  props: {
    width: {
      // 滑动输入条的宽度
      type: [String, Number],
      default: "100%"
    },
    min: {
      // 滑动输入条最小值
      type: Number,
      default: 0
    },
    max: {
      // 滑动输入条最大值
      type: Number,
      default: 100
    },
    disabled: {
      // 是否禁用
      type: Boolean,
      default: false
    },
    range: {
      // 是否双滑块模式
      type: Boolean,
      default: false
    },
    value: {
      // （v-model）设置当前取值，当 range 为 false 时，使用 number，否则用 [number, number]
      type: [Number, Array],
      default: 0
    }
  },
  emits: ["update:value", "change"],
  setup(__props, { emit }) {
    const props = __props;
    const transition = ref(false);
    const timer = ref();
    const left = ref(0);
    const right = ref(0);
    const slider = ref();
    const sliderWidth = ref();
    const scale = computed(() => {
      return sliderWidth.value / (props.max - props.min);
    });
    const totalWidth = computed(() => {
      if (typeof props.width === "number") {
        return props.width + "px";
      } else {
        return props.width;
      }
    });
    const sliderValue = computed(() => {
      const high = Math.round(right.value / scale.value + props.min);
      if (props.range) {
        const low = Math.round(left.value / scale.value + props.min);
        return [low, high];
      }
      return high;
    });
    watch(
      () => props.value,
      () => {
        getPosition();
      }
    );
    watch(sliderValue, (to) => {
      emit("update:value", to);
      emit("change", to);
    });
    onMounted(() => {
      getSliderWidth();
      getPosition();
    });
    function getSliderWidth() {
      sliderWidth.value = slider.value.offsetWidth;
    }
    function getPosition() {
      if (props.range) {
        left.value = (props.value[0] - props.min) * scale.value;
        right.value = (props.value[1] - props.min) * scale.value;
      } else {
        right.value = (props.value - props.min) * scale.value;
      }
    }
    function onClickPoint(e) {
      if (transition.value) {
        cancelRaf(timer.value);
        timer.value = null;
      } else {
        transition.value = true;
      }
      timer.value = rafTimeout(() => {
        transition.value = false;
      }, 300);
      var moveX = e.layerX;
      if (props.range) {
        if (moveX <= left.value) {
          left.value = moveX;
        } else if (moveX >= right.value) {
          right.value = moveX;
        } else {
          if (moveX - left.value < right.value - moveX) {
            left.value = moveX;
          } else {
            right.value = moveX;
          }
        }
      } else {
        right.value = moveX;
      }
    }
    function onLeftMouseDown() {
      const leftX = slider.value.getBoundingClientRect().left;
      document.onmousemove = (e) => {
        var moveX = e.clientX - leftX;
        if (moveX < 0) {
          left.value = 0;
        } else if (moveX >= 0 && moveX <= right.value) {
          left.value = moveX;
        } else {
          left.value = right.value;
          onRightMouseDown();
        }
      };
      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
    function onRightMouseDown() {
      const leftX = slider.value.getBoundingClientRect().left;
      document.onmousemove = (e) => {
        var moveX = e.clientX - leftX;
        if (moveX > sliderWidth.value) {
          right.value = sliderWidth.value;
        } else if (left.value <= moveX && moveX <= sliderWidth.value) {
          right.value = moveX;
        } else {
          right.value = left.value;
          onLeftMouseDown();
        }
      };
      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-slider", { disabled: __props.disabled }]),
        ref_key: "slider",
        ref: slider,
        style: normalizeStyle(`width: ${unref(totalWidth)};`)
      }, [
        createElementVNode("div", {
          class: "u-slider-rail",
          onClick: withModifiers(onClickPoint, ["self"])
        }, null, 8, _hoisted_1$b),
        createElementVNode("div", {
          class: normalizeClass(["u-slider-track", { trackTransition: transition.value }]),
          style: normalizeStyle(`left: ${left.value}px; right: auto; width: ${right.value - left.value}px;`)
        }, null, 6),
        __props.range ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["u-slider-handle", { handleTransition: transition.value }]),
          tabindex: "-1",
          onMousedown: onLeftMouseDown,
          style: normalizeStyle(`left: ${left.value}px; right: auto; transform: translateX(-50%);`)
        }, null, 38)) : createCommentVNode("", true),
        createElementVNode("div", {
          class: normalizeClass(["u-slider-handle", { handleTransition: transition.value }]),
          tabindex: "-1",
          onMousedown: onRightMouseDown,
          style: normalizeStyle(`left: ${right.value}px; right: auto; transform: translateX(-50%);`)
        }, null, 38)
      ], 6);
    };
  }
});
const Slider_vue_vue_type_style_index_0_scoped_51a60ef0_lang = "";
const Slider = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-51a60ef0"]]);
Slider.install = (app) => {
  app.component(Slider.__name, Slider);
};
const _hoisted_1$a = { class: "m-spin" };
const _hoisted_2$8 = { class: "m-spin-box" };
const _hoisted_3$6 = /* @__PURE__ */ createStaticVNode('<div class="m-spin-dot" data-v-90484dce><span class="u-dot-item" data-v-90484dce></span><span class="u-dot-item" data-v-90484dce></span><span class="u-dot-item" data-v-90484dce></span><span class="u-dot-item" data-v-90484dce></span></div>', 1);
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "Spin",
  props: {
    spinning: { type: Boolean, default: true },
    size: { default: "default" },
    tip: { default: "" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(`m-spin-wrap ${__props.size}`)
      }, [
        withDirectives(createElementVNode("div", _hoisted_1$a, [
          createElementVNode("div", _hoisted_2$8, [
            _hoisted_3$6,
            withDirectives(createElementVNode("p", { class: "u-tip" }, toDisplayString(__props.tip), 513), [
              [vShow, __props.tip]
            ])
          ])
        ], 512), [
          [vShow, __props.spinning]
        ]),
        createElementVNode("div", {
          class: normalizeClass(["m-spin-content", { "m-spin-mask": __props.spinning }])
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 2)
      ], 2);
    };
  }
});
const Spin_vue_vue_type_style_index_0_scoped_90484dce_lang = "";
const Spin = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-90484dce"]]);
Spin.install = (app) => {
  app.component(Spin.__name, Spin);
};
const _withScopeId$3 = (n) => (pushScopeId("data-v-5ff2a30d"), n = n(), popScopeId(), n);
const _hoisted_1$9 = { class: "m-steps" };
const _hoisted_2$7 = ["onClick"];
const _hoisted_3$5 = { class: "m-steps-icon" };
const _hoisted_4$4 = {
  key: 0,
  class: "u-num"
};
const _hoisted_5$1 = {
  key: 1,
  class: "u-icon",
  viewBox: "64 64 896 896",
  "data-icon": "check",
  "aria-hidden": "true",
  focusable: "false"
};
const _hoisted_6$1 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("path", { d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" }, null, -1));
const _hoisted_7$1 = [
  _hoisted_6$1
];
const _hoisted_8$1 = { class: "m-steps-content" };
const _hoisted_9$1 = { class: "u-steps-title" };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "Steps",
  props: {
    steps: {
      // 步骤数组
      type: Array,
      default: () => []
    },
    current: {
      // 当前选中的步骤（v-model），设置 v-model 后，Steps 变为可点击状态。从1开始计数
      type: Number,
      default: 1
    },
    width: {
      // 步骤条总宽度
      type: [String, Number],
      default: "100%"
    },
    descMaxWidth: {
      // 描述文本最大宽度
      type: Number,
      default: 140
    }
  },
  emits: ["update:current", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const totalWidth = computed(() => {
      if (typeof props.width === "number") {
        return props.width + "px";
      } else {
        return props.width;
      }
    });
    const totalSteps = computed(() => {
      return props.steps.length;
    });
    const currentStep = computed(() => {
      if (props.current < 1) {
        return 1;
      } else if (props.current > totalSteps.value + 1) {
        return totalSteps.value + 1;
      } else {
        return props.current;
      }
    });
    function onChange(index) {
      if (currentStep.value !== index) {
        emits("update:current", index);
        emits("change", index);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-steps-area",
        style: normalizeStyle(`width: ${unref(totalWidth)};`)
      }, [
        createElementVNode("div", _hoisted_1$9, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.steps, (step, index) => {
            return openBlock(), createElementBlock("div", {
              class: normalizeClass([
                "m-steps-item",
                {
                  "finish": unref(currentStep) > index + 1,
                  "process": unref(currentStep) === index + 1,
                  "wait": unref(currentStep) < index + 1
                }
              ]),
              key: index
            }, [
              createElementVNode("div", {
                class: "m-info-wrap",
                onClick: ($event) => onChange(index + 1)
              }, [
                createElementVNode("div", _hoisted_3$5, [
                  unref(currentStep) <= index + 1 ? (openBlock(), createElementBlock("span", _hoisted_4$4, toDisplayString(index + 1), 1)) : (openBlock(), createElementBlock("svg", _hoisted_5$1, _hoisted_7$1))
                ]),
                createElementVNode("div", _hoisted_8$1, [
                  createElementVNode("div", _hoisted_9$1, toDisplayString(step.title), 1),
                  withDirectives(createElementVNode("div", {
                    class: "u-steps-description",
                    style: normalizeStyle(`max-width: ${__props.descMaxWidth}px;`)
                  }, toDisplayString(step.description), 5), [
                    [vShow, step.description]
                  ])
                ])
              ], 8, _hoisted_2$7)
            ], 2);
          }), 128))
        ])
      ], 4);
    };
  }
});
const Steps_vue_vue_type_style_index_0_scoped_5ff2a30d_lang = "";
const Steps = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-5ff2a30d"]]);
Steps.install = (app) => {
  app.component(Steps.__name, Steps);
};
function isObject(o) {
  return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
}
function extend(target, src) {
  const noExtend = ["__proto__", "constructor", "prototype"];
  Object.keys(src).filter((key) => noExtend.indexOf(key) < 0).forEach((key) => {
    if (typeof target[key] === "undefined")
      target[key] = src[key];
    else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
      if (src[key].__swiper__)
        target[key] = src[key];
      else
        extend(target[key], src[key]);
    } else {
      target[key] = src[key];
    }
  });
}
function needsNavigation(params = {}) {
  return params.navigation && typeof params.navigation.nextEl === "undefined" && typeof params.navigation.prevEl === "undefined";
}
function needsPagination(params = {}) {
  return params.pagination && typeof params.pagination.el === "undefined";
}
function needsScrollbar(params = {}) {
  return params.scrollbar && typeof params.scrollbar.el === "undefined";
}
function uniqueClasses(classNames = "") {
  const classes = classNames.split(" ").map((c) => c.trim()).filter((c) => !!c);
  const unique = [];
  classes.forEach((c) => {
    if (unique.indexOf(c) < 0)
      unique.push(c);
  });
  return unique.join(" ");
}
function wrapperClass(className = "") {
  if (!className)
    return "swiper-wrapper";
  if (!className.includes("swiper-wrapper"))
    return `swiper-wrapper ${className}`;
  return className;
}
const paramsList = [
  "eventsPrefix",
  "modules",
  "init",
  "_direction",
  "oneWayMovement",
  "touchEventsTarget",
  "initialSlide",
  "_speed",
  "cssMode",
  "updateOnWindowResize",
  "resizeObserver",
  "nested",
  "focusableElements",
  "_enabled",
  "_width",
  "_height",
  "preventInteractionOnTransition",
  "userAgent",
  "url",
  "_edgeSwipeDetection",
  "_edgeSwipeThreshold",
  "_freeMode",
  "_autoHeight",
  "setWrapperSize",
  "virtualTranslate",
  "_effect",
  "breakpoints",
  "_spaceBetween",
  "_slidesPerView",
  "maxBackfaceHiddenSlides",
  "_grid",
  "_slidesPerGroup",
  "_slidesPerGroupSkip",
  "_slidesPerGroupAuto",
  "_centeredSlides",
  "_centeredSlidesBounds",
  "_slidesOffsetBefore",
  "_slidesOffsetAfter",
  "normalizeSlideIndex",
  "_centerInsufficientSlides",
  "_watchOverflow",
  "roundLengths",
  "touchRatio",
  "touchAngle",
  "simulateTouch",
  "_shortSwipes",
  "_longSwipes",
  "longSwipesRatio",
  "longSwipesMs",
  "_followFinger",
  "allowTouchMove",
  "_threshold",
  "touchMoveStopPropagation",
  "touchStartPreventDefault",
  "touchStartForcePreventDefault",
  "touchReleaseOnEdges",
  "uniqueNavElements",
  "_resistance",
  "_resistanceRatio",
  "_watchSlidesProgress",
  "_grabCursor",
  "preventClicks",
  "preventClicksPropagation",
  "_slideToClickedSlide",
  "_loop",
  "loopedSlides",
  "loopPreventsSliding",
  "_rewind",
  "_allowSlidePrev",
  "_allowSlideNext",
  "_swipeHandler",
  "_noSwiping",
  "noSwipingClass",
  "noSwipingSelector",
  "passiveListeners",
  "containerModifierClass",
  "slideClass",
  "slideActiveClass",
  "slideVisibleClass",
  "slideNextClass",
  "slidePrevClass",
  "wrapperClass",
  "lazyPreloaderClass",
  "runCallbacksOnInit",
  "observer",
  "observeParents",
  "observeSlideChildren",
  // modules
  "a11y",
  "_autoplay",
  "_controller",
  "coverflowEffect",
  "cubeEffect",
  "fadeEffect",
  "flipEffect",
  "creativeEffect",
  "cardsEffect",
  "hashNavigation",
  "history",
  "keyboard",
  "mousewheel",
  "_navigation",
  "_pagination",
  "parallax",
  "_scrollbar",
  "_thumbs",
  "virtual",
  "zoom",
  "control",
  "injectStyles",
  "injectStylesUrls"
];
function getParams(obj = {}, splitEvents = true) {
  const params = {
    on: {}
  };
  const events = {};
  const passedParams = {};
  extend(params, Swiper$2.defaults);
  extend(params, Swiper$2.extendedDefaults);
  params._emitClasses = true;
  params.init = false;
  const rest = {};
  const allowedParams = paramsList.map((key) => key.replace(/_/, ""));
  const plainObj = Object.assign({}, obj);
  Object.keys(plainObj).forEach((key) => {
    if (typeof obj[key] === "undefined")
      return;
    if (allowedParams.indexOf(key) >= 0) {
      if (isObject(obj[key])) {
        params[key] = {};
        passedParams[key] = {};
        extend(params[key], obj[key]);
        extend(passedParams[key], obj[key]);
      } else {
        params[key] = obj[key];
        passedParams[key] = obj[key];
      }
    } else if (key.search(/on[A-Z]/) === 0 && typeof obj[key] === "function") {
      if (splitEvents) {
        events[`${key[2].toLowerCase()}${key.substr(3)}`] = obj[key];
      } else {
        params.on[`${key[2].toLowerCase()}${key.substr(3)}`] = obj[key];
      }
    } else {
      rest[key] = obj[key];
    }
  });
  ["navigation", "pagination", "scrollbar"].forEach((key) => {
    if (params[key] === true)
      params[key] = {};
    if (params[key] === false)
      delete params[key];
  });
  return {
    params,
    passedParams,
    rest,
    events
  };
}
function mountSwiper({
  el,
  nextEl,
  prevEl,
  paginationEl,
  scrollbarEl,
  swiper
}, swiperParams) {
  if (needsNavigation(swiperParams) && nextEl && prevEl) {
    swiper.params.navigation.nextEl = nextEl;
    swiper.originalParams.navigation.nextEl = nextEl;
    swiper.params.navigation.prevEl = prevEl;
    swiper.originalParams.navigation.prevEl = prevEl;
  }
  if (needsPagination(swiperParams) && paginationEl) {
    swiper.params.pagination.el = paginationEl;
    swiper.originalParams.pagination.el = paginationEl;
  }
  if (needsScrollbar(swiperParams) && scrollbarEl) {
    swiper.params.scrollbar.el = scrollbarEl;
    swiper.originalParams.scrollbar.el = scrollbarEl;
  }
  swiper.init(el);
}
function getChangedParams(swiperParams, oldParams, children, oldChildren, getKey) {
  const keys = [];
  if (!oldParams)
    return keys;
  const addKey = (key) => {
    if (keys.indexOf(key) < 0)
      keys.push(key);
  };
  if (children && oldChildren) {
    const oldChildrenKeys = oldChildren.map(getKey);
    const childrenKeys = children.map(getKey);
    if (oldChildrenKeys.join("") !== childrenKeys.join(""))
      addKey("children");
    if (oldChildren.length !== children.length)
      addKey("children");
  }
  const watchParams = paramsList.filter((key) => key[0] === "_").map((key) => key.replace(/_/, ""));
  watchParams.forEach((key) => {
    if (key in swiperParams && key in oldParams) {
      if (isObject(swiperParams[key]) && isObject(oldParams[key])) {
        const newKeys = Object.keys(swiperParams[key]);
        const oldKeys = Object.keys(oldParams[key]);
        if (newKeys.length !== oldKeys.length) {
          addKey(key);
        } else {
          newKeys.forEach((newKey) => {
            if (swiperParams[key][newKey] !== oldParams[key][newKey]) {
              addKey(key);
            }
          });
          oldKeys.forEach((oldKey) => {
            if (swiperParams[key][oldKey] !== oldParams[key][oldKey])
              addKey(key);
          });
        }
      } else if (swiperParams[key] !== oldParams[key]) {
        addKey(key);
      }
    }
  });
  return keys;
}
function getChildren(originalSlots, slidesRef, oldSlidesRef) {
  if (originalSlots === void 0) {
    originalSlots = {};
  }
  const slides = [];
  const slots = {
    "container-start": [],
    "container-end": [],
    "wrapper-start": [],
    "wrapper-end": []
  };
  const getSlidesFromElements = (els, slotName) => {
    if (!Array.isArray(els)) {
      return;
    }
    els.forEach((vnode) => {
      const isFragment = typeof vnode.type === "symbol";
      if (slotName === "default")
        slotName = "container-end";
      if (isFragment && vnode.children) {
        getSlidesFromElements(vnode.children, "default");
      } else if (vnode.type && (vnode.type.name === "SwiperSlide" || vnode.type.name === "AsyncComponentWrapper")) {
        slides.push(vnode);
      } else if (slots[slotName]) {
        slots[slotName].push(vnode);
      }
    });
  };
  Object.keys(originalSlots).forEach((slotName) => {
    if (typeof originalSlots[slotName] !== "function")
      return;
    const els = originalSlots[slotName]();
    getSlidesFromElements(els, slotName);
  });
  oldSlidesRef.value = slidesRef.value;
  slidesRef.value = slides;
  return {
    slides,
    slots
  };
}
function updateSwiper({
  swiper,
  slides,
  passedParams,
  changedParams,
  nextEl,
  prevEl,
  scrollbarEl,
  paginationEl
}) {
  const updateParams = changedParams.filter((key) => key !== "children" && key !== "direction" && key !== "wrapperClass");
  const {
    params: currentParams,
    pagination,
    navigation,
    scrollbar,
    virtual,
    thumbs
  } = swiper;
  let needThumbsInit;
  let needControllerInit;
  let needPaginationInit;
  let needScrollbarInit;
  let needNavigationInit;
  let loopNeedDestroy;
  let loopNeedEnable;
  let loopNeedReloop;
  if (changedParams.includes("thumbs") && passedParams.thumbs && passedParams.thumbs.swiper && currentParams.thumbs && !currentParams.thumbs.swiper) {
    needThumbsInit = true;
  }
  if (changedParams.includes("controller") && passedParams.controller && passedParams.controller.control && currentParams.controller && !currentParams.controller.control) {
    needControllerInit = true;
  }
  if (changedParams.includes("pagination") && passedParams.pagination && (passedParams.pagination.el || paginationEl) && (currentParams.pagination || currentParams.pagination === false) && pagination && !pagination.el) {
    needPaginationInit = true;
  }
  if (changedParams.includes("scrollbar") && passedParams.scrollbar && (passedParams.scrollbar.el || scrollbarEl) && (currentParams.scrollbar || currentParams.scrollbar === false) && scrollbar && !scrollbar.el) {
    needScrollbarInit = true;
  }
  if (changedParams.includes("navigation") && passedParams.navigation && (passedParams.navigation.prevEl || prevEl) && (passedParams.navigation.nextEl || nextEl) && (currentParams.navigation || currentParams.navigation === false) && navigation && !navigation.prevEl && !navigation.nextEl) {
    needNavigationInit = true;
  }
  const destroyModule = (mod) => {
    if (!swiper[mod])
      return;
    swiper[mod].destroy();
    if (mod === "navigation") {
      if (swiper.isElement) {
        swiper[mod].prevEl.remove();
        swiper[mod].nextEl.remove();
      }
      currentParams[mod].prevEl = void 0;
      currentParams[mod].nextEl = void 0;
      swiper[mod].prevEl = void 0;
      swiper[mod].nextEl = void 0;
    } else {
      if (swiper.isElement) {
        swiper[mod].el.remove();
      }
      currentParams[mod].el = void 0;
      swiper[mod].el = void 0;
    }
  };
  if (changedParams.includes("loop") && swiper.isElement) {
    if (currentParams.loop && !passedParams.loop) {
      loopNeedDestroy = true;
    } else if (!currentParams.loop && passedParams.loop) {
      loopNeedEnable = true;
    } else {
      loopNeedReloop = true;
    }
  }
  updateParams.forEach((key) => {
    if (isObject(currentParams[key]) && isObject(passedParams[key])) {
      extend(currentParams[key], passedParams[key]);
    } else {
      const newValue = passedParams[key];
      if ((newValue === true || newValue === false) && (key === "navigation" || key === "pagination" || key === "scrollbar")) {
        if (newValue === false) {
          destroyModule(key);
        }
      } else {
        currentParams[key] = passedParams[key];
      }
    }
  });
  if (updateParams.includes("controller") && !needControllerInit && swiper.controller && swiper.controller.control && currentParams.controller && currentParams.controller.control) {
    swiper.controller.control = currentParams.controller.control;
  }
  if (changedParams.includes("children") && slides && virtual && currentParams.virtual.enabled) {
    virtual.slides = slides;
    virtual.update(true);
  }
  if (changedParams.includes("children") && slides && currentParams.loop) {
    loopNeedReloop = true;
  }
  if (needThumbsInit) {
    const initialized = thumbs.init();
    if (initialized)
      thumbs.update(true);
  }
  if (needControllerInit) {
    swiper.controller.control = currentParams.controller.control;
  }
  if (needPaginationInit) {
    if (swiper.isElement && (!paginationEl || typeof paginationEl === "string")) {
      paginationEl = document.createElement("div");
      paginationEl.classList.add("swiper-pagination");
      swiper.el.shadowEl.appendChild(paginationEl);
    }
    if (paginationEl)
      currentParams.pagination.el = paginationEl;
    pagination.init();
    pagination.render();
    pagination.update();
  }
  if (needScrollbarInit) {
    if (swiper.isElement && (!scrollbarEl || typeof scrollbarEl === "string")) {
      scrollbarEl = document.createElement("div");
      scrollbarEl.classList.add("swiper-scrollbar");
      swiper.el.shadowEl.appendChild(scrollbarEl);
    }
    if (scrollbarEl)
      currentParams.scrollbar.el = scrollbarEl;
    scrollbar.init();
    scrollbar.updateSize();
    scrollbar.setTranslate();
  }
  if (needNavigationInit) {
    if (swiper.isElement) {
      if (!nextEl || typeof nextEl === "string") {
        nextEl = document.createElement("div");
        nextEl.classList.add("swiper-button-next");
        swiper.el.shadowEl.appendChild(nextEl);
      }
      if (!prevEl || typeof prevEl === "string") {
        prevEl = document.createElement("div");
        prevEl.classList.add("swiper-button-prev");
        swiper.el.shadowEl.appendChild(prevEl);
      }
    }
    if (nextEl)
      currentParams.navigation.nextEl = nextEl;
    if (prevEl)
      currentParams.navigation.prevEl = prevEl;
    navigation.init();
    navigation.update();
  }
  if (changedParams.includes("allowSlideNext")) {
    swiper.allowSlideNext = passedParams.allowSlideNext;
  }
  if (changedParams.includes("allowSlidePrev")) {
    swiper.allowSlidePrev = passedParams.allowSlidePrev;
  }
  if (changedParams.includes("direction")) {
    swiper.changeDirection(passedParams.direction, false);
  }
  if (loopNeedDestroy || loopNeedReloop) {
    swiper.loopDestroy();
  }
  if (loopNeedEnable || loopNeedReloop) {
    swiper.loopCreate();
  }
  swiper.update();
}
function renderVirtual(swiperRef, slides, virtualData) {
  if (!virtualData)
    return null;
  const getSlideIndex = (index) => {
    let slideIndex = index;
    if (index < 0) {
      slideIndex = slides.length + index;
    } else if (slideIndex >= slides.length) {
      slideIndex = slideIndex - slides.length;
    }
    return slideIndex;
  };
  const style = swiperRef.value.isHorizontal() ? {
    [swiperRef.value.rtlTranslate ? "right" : "left"]: `${virtualData.offset}px`
  } : {
    top: `${virtualData.offset}px`
  };
  const {
    from,
    to
  } = virtualData;
  const loopFrom = swiperRef.value.params.loop ? -slides.length : 0;
  const loopTo = swiperRef.value.params.loop ? slides.length * 2 : slides.length;
  const slidesToRender = [];
  for (let i = loopFrom; i < loopTo; i += 1) {
    if (i >= from && i <= to) {
      slidesToRender.push(slides[getSlideIndex(i)]);
    }
  }
  return slidesToRender.map((slide) => {
    if (!slide.props)
      slide.props = {};
    if (!slide.props.style)
      slide.props.style = {};
    slide.props.swiperRef = swiperRef;
    slide.props.style = style;
    return h(slide.type, {
      ...slide.props
    }, slide.children);
  });
}
const updateOnVirtualData = (swiper) => {
  if (!swiper || swiper.destroyed || !swiper.params.virtual || swiper.params.virtual && !swiper.params.virtual.enabled)
    return;
  swiper.updateSlides();
  swiper.updateProgress();
  swiper.updateSlidesClasses();
  if (swiper.parallax && swiper.params.parallax && swiper.params.parallax.enabled) {
    swiper.parallax.setTranslate();
  }
};
const Swiper$1 = {
  name: "Swiper",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    wrapperTag: {
      type: String,
      default: "div"
    },
    modules: {
      type: Array,
      default: void 0
    },
    init: {
      type: Boolean,
      default: void 0
    },
    direction: {
      type: String,
      default: void 0
    },
    oneWayMovement: {
      type: Boolean,
      default: void 0
    },
    touchEventsTarget: {
      type: String,
      default: void 0
    },
    initialSlide: {
      type: Number,
      default: void 0
    },
    speed: {
      type: Number,
      default: void 0
    },
    cssMode: {
      type: Boolean,
      default: void 0
    },
    updateOnWindowResize: {
      type: Boolean,
      default: void 0
    },
    resizeObserver: {
      type: Boolean,
      default: void 0
    },
    nested: {
      type: Boolean,
      default: void 0
    },
    focusableElements: {
      type: String,
      default: void 0
    },
    width: {
      type: Number,
      default: void 0
    },
    height: {
      type: Number,
      default: void 0
    },
    preventInteractionOnTransition: {
      type: Boolean,
      default: void 0
    },
    userAgent: {
      type: String,
      default: void 0
    },
    url: {
      type: String,
      default: void 0
    },
    edgeSwipeDetection: {
      type: [Boolean, String],
      default: void 0
    },
    edgeSwipeThreshold: {
      type: Number,
      default: void 0
    },
    autoHeight: {
      type: Boolean,
      default: void 0
    },
    setWrapperSize: {
      type: Boolean,
      default: void 0
    },
    virtualTranslate: {
      type: Boolean,
      default: void 0
    },
    effect: {
      type: String,
      default: void 0
    },
    breakpoints: {
      type: Object,
      default: void 0
    },
    spaceBetween: {
      type: [Number, String],
      default: void 0
    },
    slidesPerView: {
      type: [Number, String],
      default: void 0
    },
    maxBackfaceHiddenSlides: {
      type: Number,
      default: void 0
    },
    slidesPerGroup: {
      type: Number,
      default: void 0
    },
    slidesPerGroupSkip: {
      type: Number,
      default: void 0
    },
    slidesPerGroupAuto: {
      type: Boolean,
      default: void 0
    },
    centeredSlides: {
      type: Boolean,
      default: void 0
    },
    centeredSlidesBounds: {
      type: Boolean,
      default: void 0
    },
    slidesOffsetBefore: {
      type: Number,
      default: void 0
    },
    slidesOffsetAfter: {
      type: Number,
      default: void 0
    },
    normalizeSlideIndex: {
      type: Boolean,
      default: void 0
    },
    centerInsufficientSlides: {
      type: Boolean,
      default: void 0
    },
    watchOverflow: {
      type: Boolean,
      default: void 0
    },
    roundLengths: {
      type: Boolean,
      default: void 0
    },
    touchRatio: {
      type: Number,
      default: void 0
    },
    touchAngle: {
      type: Number,
      default: void 0
    },
    simulateTouch: {
      type: Boolean,
      default: void 0
    },
    shortSwipes: {
      type: Boolean,
      default: void 0
    },
    longSwipes: {
      type: Boolean,
      default: void 0
    },
    longSwipesRatio: {
      type: Number,
      default: void 0
    },
    longSwipesMs: {
      type: Number,
      default: void 0
    },
    followFinger: {
      type: Boolean,
      default: void 0
    },
    allowTouchMove: {
      type: Boolean,
      default: void 0
    },
    threshold: {
      type: Number,
      default: void 0
    },
    touchMoveStopPropagation: {
      type: Boolean,
      default: void 0
    },
    touchStartPreventDefault: {
      type: Boolean,
      default: void 0
    },
    touchStartForcePreventDefault: {
      type: Boolean,
      default: void 0
    },
    touchReleaseOnEdges: {
      type: Boolean,
      default: void 0
    },
    uniqueNavElements: {
      type: Boolean,
      default: void 0
    },
    resistance: {
      type: Boolean,
      default: void 0
    },
    resistanceRatio: {
      type: Number,
      default: void 0
    },
    watchSlidesProgress: {
      type: Boolean,
      default: void 0
    },
    grabCursor: {
      type: Boolean,
      default: void 0
    },
    preventClicks: {
      type: Boolean,
      default: void 0
    },
    preventClicksPropagation: {
      type: Boolean,
      default: void 0
    },
    slideToClickedSlide: {
      type: Boolean,
      default: void 0
    },
    loop: {
      type: Boolean,
      default: void 0
    },
    loopedSlides: {
      type: Number,
      default: void 0
    },
    loopPreventsSliding: {
      type: Boolean,
      default: void 0
    },
    rewind: {
      type: Boolean,
      default: void 0
    },
    allowSlidePrev: {
      type: Boolean,
      default: void 0
    },
    allowSlideNext: {
      type: Boolean,
      default: void 0
    },
    swipeHandler: {
      type: Boolean,
      default: void 0
    },
    noSwiping: {
      type: Boolean,
      default: void 0
    },
    noSwipingClass: {
      type: String,
      default: void 0
    },
    noSwipingSelector: {
      type: String,
      default: void 0
    },
    passiveListeners: {
      type: Boolean,
      default: void 0
    },
    containerModifierClass: {
      type: String,
      default: void 0
    },
    slideClass: {
      type: String,
      default: void 0
    },
    slideActiveClass: {
      type: String,
      default: void 0
    },
    slideVisibleClass: {
      type: String,
      default: void 0
    },
    slideNextClass: {
      type: String,
      default: void 0
    },
    slidePrevClass: {
      type: String,
      default: void 0
    },
    wrapperClass: {
      type: String,
      default: void 0
    },
    lazyPreloaderClass: {
      type: String,
      default: void 0
    },
    runCallbacksOnInit: {
      type: Boolean,
      default: void 0
    },
    observer: {
      type: Boolean,
      default: void 0
    },
    observeParents: {
      type: Boolean,
      default: void 0
    },
    observeSlideChildren: {
      type: Boolean,
      default: void 0
    },
    a11y: {
      type: [Boolean, Object],
      default: void 0
    },
    autoplay: {
      type: [Boolean, Object],
      default: void 0
    },
    controller: {
      type: Object,
      default: void 0
    },
    coverflowEffect: {
      type: Object,
      default: void 0
    },
    cubeEffect: {
      type: Object,
      default: void 0
    },
    fadeEffect: {
      type: Object,
      default: void 0
    },
    flipEffect: {
      type: Object,
      default: void 0
    },
    creativeEffect: {
      type: Object,
      default: void 0
    },
    cardsEffect: {
      type: Object,
      default: void 0
    },
    hashNavigation: {
      type: [Boolean, Object],
      default: void 0
    },
    history: {
      type: [Boolean, Object],
      default: void 0
    },
    keyboard: {
      type: [Boolean, Object],
      default: void 0
    },
    mousewheel: {
      type: [Boolean, Object],
      default: void 0
    },
    navigation: {
      type: [Boolean, Object],
      default: void 0
    },
    pagination: {
      type: [Boolean, Object],
      default: void 0
    },
    parallax: {
      type: [Boolean, Object],
      default: void 0
    },
    scrollbar: {
      type: [Boolean, Object],
      default: void 0
    },
    thumbs: {
      type: Object,
      default: void 0
    },
    virtual: {
      type: [Boolean, Object],
      default: void 0
    },
    zoom: {
      type: [Boolean, Object],
      default: void 0
    },
    grid: {
      type: [Object],
      default: void 0
    },
    freeMode: {
      type: [Boolean, Object],
      default: void 0
    },
    enabled: {
      type: Boolean,
      default: void 0
    }
  },
  emits: ["_beforeBreakpoint", "_containerClasses", "_slideClass", "_slideClasses", "_swiper", "_freeModeNoMomentumRelease", "activeIndexChange", "afterInit", "autoplay", "autoplayStart", "autoplayStop", "autoplayPause", "autoplayResume", "autoplayTimeLeft", "beforeDestroy", "beforeInit", "beforeLoopFix", "beforeResize", "beforeSlideChangeStart", "beforeTransitionStart", "breakpoint", "changeDirection", "click", "disable", "doubleTap", "doubleClick", "destroy", "enable", "fromEdge", "hashChange", "hashSet", "init", "keyPress", "lock", "loopFix", "momentumBounce", "navigationHide", "navigationShow", "navigationPrev", "navigationNext", "observerUpdate", "orientationchange", "paginationHide", "paginationRender", "paginationShow", "paginationUpdate", "progress", "reachBeginning", "reachEnd", "realIndexChange", "resize", "scroll", "scrollbarDragEnd", "scrollbarDragMove", "scrollbarDragStart", "setTransition", "setTranslate", "slideChange", "slideChangeTransitionEnd", "slideChangeTransitionStart", "slideNextTransitionEnd", "slideNextTransitionStart", "slidePrevTransitionEnd", "slidePrevTransitionStart", "slideResetTransitionStart", "slideResetTransitionEnd", "sliderMove", "sliderFirstMove", "slidesLengthChange", "slidesGridLengthChange", "snapGridLengthChange", "snapIndexChange", "swiper", "tap", "toEdge", "touchEnd", "touchMove", "touchMoveOpposite", "touchStart", "transitionEnd", "transitionStart", "unlock", "update", "virtualUpdate", "zoomChange"],
  setup(props, _ref) {
    let {
      slots: originalSlots,
      emit
    } = _ref;
    const {
      tag: Tag,
      wrapperTag: WrapperTag
    } = props;
    const containerClasses = ref("swiper");
    const virtualData = ref(null);
    const breakpointChanged = ref(false);
    const initializedRef = ref(false);
    const swiperElRef = ref(null);
    const swiperRef = ref(null);
    const oldPassedParamsRef = ref(null);
    const slidesRef = {
      value: []
    };
    const oldSlidesRef = {
      value: []
    };
    const nextElRef = ref(null);
    const prevElRef = ref(null);
    const paginationElRef = ref(null);
    const scrollbarElRef = ref(null);
    const {
      params: swiperParams,
      passedParams
    } = getParams(props, false);
    getChildren(originalSlots, slidesRef, oldSlidesRef);
    oldPassedParamsRef.value = passedParams;
    oldSlidesRef.value = slidesRef.value;
    const onBeforeBreakpoint = () => {
      getChildren(originalSlots, slidesRef, oldSlidesRef);
      breakpointChanged.value = true;
    };
    swiperParams.onAny = function(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      emit(event, ...args);
    };
    Object.assign(swiperParams.on, {
      _beforeBreakpoint: onBeforeBreakpoint,
      _containerClasses(swiper, classes) {
        containerClasses.value = classes;
      }
    });
    const passParams = {
      ...swiperParams
    };
    delete passParams.wrapperClass;
    swiperRef.value = new Swiper$2(passParams);
    if (swiperRef.value.virtual && swiperRef.value.params.virtual.enabled) {
      swiperRef.value.virtual.slides = slidesRef.value;
      const extendWith = {
        cache: false,
        slides: slidesRef.value,
        renderExternal: (data) => {
          virtualData.value = data;
        },
        renderExternalUpdate: false
      };
      extend(swiperRef.value.params.virtual, extendWith);
      extend(swiperRef.value.originalParams.virtual, extendWith);
    }
    onUpdated(() => {
      if (!initializedRef.value && swiperRef.value) {
        swiperRef.value.emitSlidesClasses();
        initializedRef.value = true;
      }
      const {
        passedParams: newPassedParams
      } = getParams(props, false);
      const changedParams = getChangedParams(newPassedParams, oldPassedParamsRef.value, slidesRef.value, oldSlidesRef.value, (c) => c.props && c.props.key);
      oldPassedParamsRef.value = newPassedParams;
      if ((changedParams.length || breakpointChanged.value) && swiperRef.value && !swiperRef.value.destroyed) {
        updateSwiper({
          swiper: swiperRef.value,
          slides: slidesRef.value,
          passedParams: newPassedParams,
          changedParams,
          nextEl: nextElRef.value,
          prevEl: prevElRef.value,
          scrollbarEl: scrollbarElRef.value,
          paginationEl: paginationElRef.value
        });
      }
      breakpointChanged.value = false;
    });
    provide("swiper", swiperRef);
    watch(virtualData, () => {
      nextTick(() => {
        updateOnVirtualData(swiperRef.value);
      });
    });
    onMounted(() => {
      if (!swiperElRef.value)
        return;
      mountSwiper({
        el: swiperElRef.value,
        nextEl: nextElRef.value,
        prevEl: prevElRef.value,
        paginationEl: paginationElRef.value,
        scrollbarEl: scrollbarElRef.value,
        swiper: swiperRef.value
      }, swiperParams);
      emit("swiper", swiperRef.value);
    });
    onBeforeUnmount(() => {
      if (swiperRef.value && !swiperRef.value.destroyed) {
        swiperRef.value.destroy(true, false);
      }
    });
    function renderSlides(slides) {
      if (swiperParams.virtual) {
        return renderVirtual(swiperRef, slides, virtualData.value);
      }
      slides.forEach((slide, index) => {
        if (!slide.props)
          slide.props = {};
        slide.props.swiperRef = swiperRef;
        slide.props.swiperSlideIndex = index;
      });
      return slides;
    }
    return () => {
      const {
        slides,
        slots
      } = getChildren(originalSlots, slidesRef, oldSlidesRef);
      return h(Tag, {
        ref: swiperElRef,
        class: uniqueClasses(containerClasses.value)
      }, [slots["container-start"], h(WrapperTag, {
        class: wrapperClass(swiperParams.wrapperClass)
      }, [slots["wrapper-start"], renderSlides(slides), slots["wrapper-end"]]), needsNavigation(props) && [h("div", {
        ref: prevElRef,
        class: "swiper-button-prev"
      }), h("div", {
        ref: nextElRef,
        class: "swiper-button-next"
      })], needsScrollbar(props) && h("div", {
        ref: scrollbarElRef,
        class: "swiper-scrollbar"
      }), needsPagination(props) && h("div", {
        ref: paginationElRef,
        class: "swiper-pagination"
      }), slots["container-end"]]);
    };
  }
};
const SwiperSlide = {
  name: "SwiperSlide",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    swiperRef: {
      type: Object,
      required: false
    },
    swiperSlideIndex: {
      type: Number,
      default: void 0,
      required: false
    },
    zoom: {
      type: Boolean,
      default: void 0,
      required: false
    },
    lazy: {
      type: Boolean,
      default: false,
      required: false
    },
    virtualIndex: {
      type: [String, Number],
      default: void 0
    }
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    let eventAttached = false;
    const {
      swiperRef
    } = props;
    const slideElRef = ref(null);
    const slideClasses = ref("swiper-slide");
    const lazyLoaded = ref(false);
    function updateClasses(swiper, el, classNames) {
      if (el === slideElRef.value) {
        slideClasses.value = classNames;
      }
    }
    onMounted(() => {
      if (!swiperRef || !swiperRef.value)
        return;
      swiperRef.value.on("_slideClass", updateClasses);
      eventAttached = true;
    });
    onBeforeUpdate(() => {
      if (eventAttached || !swiperRef || !swiperRef.value)
        return;
      swiperRef.value.on("_slideClass", updateClasses);
      eventAttached = true;
    });
    onUpdated(() => {
      if (!slideElRef.value || !swiperRef || !swiperRef.value)
        return;
      if (typeof props.swiperSlideIndex !== "undefined") {
        slideElRef.value.swiperSlideIndex = props.swiperSlideIndex;
      }
      if (swiperRef.value.destroyed) {
        if (slideClasses.value !== "swiper-slide") {
          slideClasses.value = "swiper-slide";
        }
      }
    });
    onBeforeUnmount(() => {
      if (!swiperRef || !swiperRef.value)
        return;
      swiperRef.value.off("_slideClass", updateClasses);
    });
    const slideData = computed(() => ({
      isActive: slideClasses.value.indexOf("swiper-slide-active") >= 0,
      isVisible: slideClasses.value.indexOf("swiper-slide-visible") >= 0,
      isPrev: slideClasses.value.indexOf("swiper-slide-prev") >= 0,
      isNext: slideClasses.value.indexOf("swiper-slide-next") >= 0
    }));
    provide("swiperSlide", slideData);
    const onLoad = () => {
      lazyLoaded.value = true;
    };
    return () => {
      return h(props.tag, {
        class: uniqueClasses(`${slideClasses.value}`),
        ref: slideElRef,
        "data-swiper-slide-index": typeof props.virtualIndex === "undefined" && swiperRef && swiperRef.value && swiperRef.value.params.loop ? props.swiperSlideIndex : props.virtualIndex,
        onLoadCapture: onLoad
      }, props.zoom ? h("div", {
        class: "swiper-zoom-container",
        "data-swiper-zoom": typeof props.zoom === "number" ? props.zoom : void 0
      }, [slots.default && slots.default(slideData.value), props.lazy && !lazyLoaded.value && h("div", {
        class: "swiper-lazy-preloader"
      })]) : [slots.default && slots.default(slideData.value), props.lazy && !lazyLoaded.value && h("div", {
        class: "swiper-lazy-preloader"
      })]);
    };
  }
};
const swiper_min = "";
const navigation_min = "";
const pagination_min = "";
const effectFade_min = "";
const _hoisted_1$8 = ["href", "target"];
const _hoisted_2$6 = ["src", "alt"];
const _hoisted_3$4 = ["href", "target"];
const _hoisted_4$3 = ["src", "alt"];
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Swiper",
  props: {
    imageData: {
      type: Array,
      default: () => []
    },
    width: {
      // 图片宽度
      type: [Number, String],
      default: "100%"
    },
    height: {
      // 图片高度
      type: [Number, String],
      default: "100vh"
    },
    type: {
      // banner轮播图模式 | carousel走马灯模式
      type: String,
      default: "banner"
      // banner | carousel
    },
    navigation: {
      // 是否显示导航
      type: Boolean,
      default: true
    },
    delay: {
      // 自动切换的时间间隔，type: banner时生效
      type: Number,
      default: 3e3
      // 单位ms
    },
    swipe: {
      // 是否可以鼠标拖动
      type: Boolean,
      default: true
    },
    preloaderColor: {
      // preload时loading的颜色
      type: String,
      default: "theme"
      // 可选theme white black
    }
  },
  setup(__props) {
    const props = __props;
    const imgWidth = computed(() => {
      if (typeof props.width === "number") {
        return props.width + "px";
      } else {
        return props.width;
      }
    });
    const imgHeight = computed(() => {
      if (typeof props.height === "number") {
        return props.height + "px";
      } else {
        return props.height;
      }
    });
    const modulesBanner = ref([Navigation, Pagination$1, Autoplay, EffectFade]);
    const pagination = ref({
      clickable: true
    });
    const autoplayBanner = ref({
      delay: props.delay,
      disableOnInteraction: false,
      // 用户操作swiper之后，是否禁止autoplay。默认为true：停止。
      pauseOnMouseEnter: true
      // 鼠标置于swiper时暂停自动切换，鼠标离开时恢复自动切换，默认false
    });
    const modulesCarousel = ref([Autoplay]);
    const autoplayCarousel = ref({
      delay: 0,
      disableOnInteraction: false
    });
    function onSwiper(swiper) {
      console.log(swiper);
      if (props.type === "carousel") {
        swiper.el.onmouseenter = () => {
          swiper.autoplay.stop();
        };
        swiper.el.onmouseleave = () => {
          swiper.autoplay.start();
        };
      }
    }
    function onSlideChange() {
      console.log("slide change");
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        __props.type === "banner" ? (openBlock(), createBlock(unref(Swiper$1), mergeProps({
          key: 0,
          class: { "swiper-no-swiping": !__props.swipe },
          modules: modulesBanner.value,
          lazy: true,
          navigation: __props.navigation,
          pagination: pagination.value,
          "slides-per-view": 1,
          autoplay: autoplayBanner.value,
          loop: true,
          onSwiper,
          onSlideChange
        }, _ctx.$attrs), {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.imageData, (image, index) => {
              return openBlock(), createBlock(unref(SwiperSlide), { key: index }, {
                default: withCtx(() => [
                  createElementVNode("a", {
                    href: image.link ? image.link : "javascript:;",
                    target: image.link ? "_blank" : "_self",
                    class: "m-link"
                  }, [
                    createElementVNode("img", {
                      src: image.imgUrl,
                      class: "u-img",
                      style: normalizeStyle(`width: ${unref(imgWidth)}; height: ${unref(imgHeight)};`),
                      alt: image.title,
                      loading: "lazy"
                    }, null, 12, _hoisted_2$6)
                  ], 8, _hoisted_1$8),
                  createElementVNode("div", {
                    class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${__props.preloaderColor}`)
                  }, null, 2)
                ]),
                _: 2
              }, 1024);
            }), 128))
          ]),
          _: 1
        }, 16, ["class", "modules", "navigation", "pagination", "autoplay"])) : createCommentVNode("", true),
        __props.type === "carousel" ? (openBlock(), createBlock(unref(Swiper$1), mergeProps({
          key: 1,
          class: "swiper-no-swiping",
          modules: modulesCarousel.value,
          lazy: true,
          autoplay: autoplayCarousel.value,
          loop: true,
          onSwiper,
          onSlideChange
        }, _ctx.$attrs), {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.imageData, (image, index) => {
              return openBlock(), createBlock(unref(SwiperSlide), { key: index }, {
                default: withCtx(() => [
                  createElementVNode("a", {
                    href: image.link ? image.link : "javascript:;",
                    target: image.link ? "_blank" : "_self",
                    class: "m-link"
                  }, [
                    createElementVNode("img", {
                      src: image.imgUrl,
                      class: "u-img",
                      style: normalizeStyle(`width: ${unref(imgWidth)}; height: ${unref(imgHeight)};`),
                      alt: image.title,
                      loading: "lazy"
                    }, null, 12, _hoisted_4$3)
                  ], 8, _hoisted_3$4),
                  createElementVNode("div", {
                    class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${__props.preloaderColor}`)
                  }, null, 2)
                ]),
                _: 2
              }, 1024);
            }), 128))
          ]),
          _: 1
        }, 16, ["modules", "autoplay"])) : createCommentVNode("", true)
      ], 64);
    };
  }
});
const Swiper_vue_vue_type_style_index_0_scoped_dab691dc_lang = "";
const Swiper = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-dab691dc"]]);
Swiper.install = (app) => {
  app.component(Swiper.__name, Swiper);
};
const _hoisted_1$7 = { class: "m-switch-wrap" };
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "Switch",
  props: {
    checkedInfo: { default: "" },
    uncheckedInfo: { default: "" },
    disabled: { type: Boolean, default: false },
    checked: { type: Boolean, default: false }
  },
  emits: ["update:checked", "change"],
  setup(__props, { emit }) {
    const props = __props;
    const checked = ref(props.checked);
    watch(
      () => props.checked,
      (to) => {
        checked.value = to;
      }
    );
    function onSwitch() {
      emit("update:checked", !checked.value);
      emit("change", !checked.value);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        createElementVNode("div", {
          onClick: _cache[0] || (_cache[0] = ($event) => __props.disabled ? (e) => e.preventDefault() : onSwitch()),
          class: normalizeClass(["m-switch", { "switch-checked": checked.value, "disabled": __props.disabled }])
        }, [
          createElementVNode("div", {
            class: normalizeClass(["u-switch-inner", checked.value ? "inner-checked" : "inner-unchecked"])
          }, toDisplayString(checked.value ? __props.checkedInfo : __props.uncheckedInfo), 3),
          createElementVNode("div", {
            class: normalizeClass(["u-node", { "node-checked": checked.value }])
          }, null, 2)
        ], 2)
      ]);
    };
  }
});
const Switch_vue_vue_type_style_index_0_scoped_5395951c_lang = "";
const Switch = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-5395951c"]]);
Switch.install = (app) => {
  app.component(Switch.__name, Switch);
};
const _withScopeId$2 = (n) => (pushScopeId("data-v-09398887"), n = n(), popScopeId(), n);
const _hoisted_1$6 = { class: "m-table-wrap" };
const _hoisted_2$5 = ["width"];
const _hoisted_3$3 = { class: "m-body" };
const _hoisted_4$2 = ["colspan"];
const _hoisted_5 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-empty-icon",
  viewBox: "0 0 64 41",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ createElementVNode("g", {
    transform: "translate(0 1)",
    fill: "none",
    fillRule: "evenodd"
  }, [
    /* @__PURE__ */ createElementVNode("ellipse", {
      fill: "#F5F5F5",
      cx: "32",
      cy: "33",
      rx: "32",
      ry: "7"
    }),
    /* @__PURE__ */ createElementVNode("g", {
      fillRule: "nonzero",
      stroke: "#D9D9D9"
    }, [
      /* @__PURE__ */ createElementVNode("path", { d: "M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" }),
      /* @__PURE__ */ createElementVNode("path", {
        d: "M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z",
        fill: "#FAFAFA"
      })
    ])
  ])
], -1));
const _hoisted_6 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("p", { class: "u-empty-desc" }, "暂无数据", -1));
const _hoisted_7 = [
  _hoisted_5,
  _hoisted_6
];
const _hoisted_8 = ["title"];
const _hoisted_9 = { key: 1 };
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Table",
  props: {
    columns: {
      // 表格列的配置项
      type: Array,
      default: () => []
    },
    dataSource: {
      // 表格数据数组
      type: Array,
      default: () => []
    },
    pagination: {
      // 分页器，为false时不展示和进行分页
      type: Object,
      default: () => {
        return {};
      }
    },
    showPagination: {
      // 是否显示分页器
      type: Boolean,
      default: false
    },
    hideOnSinglePage: {
      // 只有一页时是否隐藏分页器
      type: Boolean,
      default: false
    },
    total: {
      // 数据总数
      type: Number,
      default: 0
    },
    loading: {
      // 页面是否加载中
      type: Boolean,
      default: false
    }
  },
  emits: ["change"],
  setup(__props, { emit }) {
    function changePage(pager) {
      emit("change", pager);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        createElementVNode("table", null, [
          createElementVNode("thead", null, [
            createElementVNode("tr", null, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.columns, (item, index) => {
                return openBlock(), createElementBlock("th", {
                  width: item.width,
                  key: index
                }, toDisplayString(item.title), 9, _hoisted_2$5);
              }), 128))
            ])
          ]),
          createElementVNode("tbody", _hoisted_3$3, [
            withDirectives(createElementVNode("tr", null, [
              createVNode(unref(Spin), {
                class: "m-loading",
                size: "small",
                colspan: __props.columns.length
              }, null, 8, ["colspan"])
            ], 512), [
              [vShow, __props.loading]
            ]),
            withDirectives(createElementVNode("tr", null, [
              createElementVNode("td", {
                class: "m-empty",
                colspan: __props.columns.length
              }, _hoisted_7, 8, _hoisted_4$2)
            ], 512), [
              [vShow, !__props.total]
            ]),
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.dataSource, (data, index) => {
              return openBlock(), createElementBlock("tr", { key: index }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.columns, (col, ind) => {
                  return openBlock(), createElementBlock("td", {
                    key: ind,
                    title: data[col.dataIndex]
                  }, [
                    col.slot ? renderSlot(_ctx.$slots, col.slot, mergeProps({ key: 0 }, data, { index }), () => [
                      createTextVNode(toDisplayString(data[col.dataIndex] || "--"), 1)
                    ], true) : (openBlock(), createElementBlock("span", _hoisted_9, toDisplayString(data[col.dataIndex] || "--"), 1))
                  ], 8, _hoisted_8);
                }), 128))
              ]);
            }), 128))
          ])
        ]),
        __props.showPagination && __props.total ? (openBlock(), createBlock(unref(Pagination), {
          key: 0,
          class: "mt20",
          onChange: changePage,
          current: __props.pagination.page,
          pageSize: __props.pagination.pageSize,
          total: __props.total,
          hideOnSinglePage: __props.hideOnSinglePage,
          showQuickJumper: true,
          showTotal: true,
          placement: "right"
        }, null, 8, ["current", "pageSize", "total", "hideOnSinglePage"])) : createCommentVNode("", true)
      ]);
    };
  }
});
const Table_vue_vue_type_style_index_0_scoped_09398887_lang = "";
const Table = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-09398887"]]);
Table.install = (app) => {
  app.component(Table.__name, Table);
};
const _hoisted_1$5 = { class: "m-tabs-nav" };
const _hoisted_2$4 = ["onClick"];
const _hoisted_3$2 = { class: "m-tabs-page" };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Tabs",
  props: {
    tabPages: { default: () => [] },
    centered: { type: Boolean, default: false },
    size: { default: "small" },
    activeKey: { default: "" }
  },
  emits: ["update:activeKey", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const tabs = ref();
    const left = ref(0);
    const width = ref(0);
    const wrap = ref();
    const nav = ref();
    const showWheel = ref(false);
    const scrollMax = ref(0);
    const scrollLeft = ref(0);
    watchEffect(() => {
      getNavWidth();
    }, { flush: "post" });
    watchEffect(() => {
      getBarPosition(props.activeKey);
    }, { flush: "post" });
    function findElement(key) {
      return tabs.value.find((element) => element.__vnode.key === key);
    }
    function getBarPosition(key) {
      const el = findElement(key);
      if (el) {
        left.value = el.offsetLeft;
        width.value = el.offsetWidth;
      } else {
        left.value = 0;
        width.value = 0;
      }
    }
    function getNavWidth() {
      const wrapWidth = wrap.value.offsetWidth;
      const navWidth = nav.value.offsetWidth;
      if (navWidth > wrapWidth) {
        showWheel.value = true;
        scrollMax.value = navWidth - wrapWidth;
      }
    }
    function onTab(key) {
      getBarPosition(key);
      emits("update:activeKey", key);
      emits("change", key);
    }
    function onWheel(e) {
      const scrollX = e.deltaX * 1;
      if (scrollLeft.value + scrollX > scrollMax.value) {
        scrollLeft.value = scrollMax.value;
      } else if (scrollLeft.value + scrollX < 0) {
        scrollLeft.value = 0;
      } else {
        scrollLeft.value += scrollX;
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(`m-tabs ${__props.size}`)
      }, [
        createElementVNode("div", _hoisted_1$5, [
          createElementVNode("div", {
            ref_key: "wrap",
            ref: wrap,
            class: normalizeClass(["m-tabs-nav-wrap", { "tabs-center": __props.centered, "before-shadow-active": scrollLeft.value > 0, "after-shadow-active": scrollLeft.value < scrollMax.value }])
          }, [
            createElementVNode("div", {
              ref_key: "nav",
              ref: nav,
              class: "m-tabs-nav-list",
              onWheel: _cache[0] || (_cache[0] = withModifiers(($event) => showWheel.value ? onWheel($event) : (e) => e.preventDefault(), ["prevent"])),
              style: normalizeStyle(`transform: translate(${-scrollLeft.value}px, 0)`)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.tabPages, (page) => {
                return openBlock(), createElementBlock("div", {
                  ref_for: true,
                  ref_key: "tabs",
                  ref: tabs,
                  class: normalizeClass(["u-tab", { "u-tab-active": __props.activeKey === page.key, "u-tab-disabled": page.disabled }]),
                  onClick: ($event) => page.disabled ? (e) => e.preventDefault() : onTab(page.key),
                  key: page.key
                }, toDisplayString(page.tab), 11, _hoisted_2$4);
              }), 128)),
              createElementVNode("div", {
                class: "u-tab-bar",
                style: normalizeStyle(`left: ${left.value}px; width: ${width.value}px;`)
              }, null, 4)
            ], 36)
          ], 2)
        ]),
        createElementVNode("div", _hoisted_3$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.tabPages, (page) => {
            return withDirectives((openBlock(), createElementBlock("div", {
              class: "m-tabs-content",
              key: page.key
            }, [
              renderSlot(_ctx.$slots, page.key, {}, () => [
                createTextVNode(toDisplayString(page.content), 1)
              ], true)
            ])), [
              [vShow, __props.activeKey === page.key]
            ]);
          }), 128))
        ])
      ], 2);
    };
  }
});
const Tabs_vue_vue_type_style_index_0_scoped_631256b5_lang = "";
const Tabs = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-631256b5"]]);
Tabs.install = (app) => {
  app.component(Tabs.__name, Tabs);
};
const _hoisted_1$4 = ["title", "href", "target", "onClick"];
const _hoisted_2$3 = ["title", "href", "target", "onClick"];
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "TextScroll",
  props: {
    sliderText: {
      // 滚动文字数组
      type: Array,
      required: true,
      default: () => []
    },
    width: {
      // 滚动区域宽度
      type: [Number, String],
      default: "100%"
    },
    height: {
      // 滚动区域高度
      type: Number,
      default: 60
    },
    backgroundColor: {
      // 滚动区域背景色
      type: String,
      default: "#FFF"
    },
    amount: {
      // 滚动区域展示条数，水平滚动时生效
      type: Number,
      default: 4
    },
    gap: {
      // 水平滚动文字各列间距或垂直滚动文字两边的边距
      type: Number,
      default: 20
    },
    vertical: {
      // 是否垂直滚动
      type: Boolean,
      default: false
    },
    interval: {
      // 文字滚动时间间隔，垂直滚动时生效
      type: Number,
      default: 3e3
    }
  },
  emits: ["click"],
  setup(__props, { emit }) {
    const props = __props;
    const left = ref(0);
    const fpsRaf = ref(0);
    const moveRaf = ref();
    const fps = ref(60);
    const textData = ref([...props.sliderText]);
    const horizonRef = ref();
    const distance = ref(0);
    const step = computed(() => {
      if (fps.value === 60) {
        return 1;
      } else {
        return 60 / fps.value;
      }
    });
    function getFPS() {
      const requestAnimationFrame2 = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      var start = null;
      function timeElapse(timestamp) {
        if (!start) {
          if (fpsRaf.value > 10) {
            start = timestamp;
          }
          fpsRaf.value = requestAnimationFrame2(timeElapse);
        } else {
          fps.value = Math.floor(1e3 / (timestamp - start));
          console.log("fps", fps.value);
          distance.value = getDistance();
          onStart();
        }
      }
      fpsRaf.value = requestAnimationFrame2(timeElapse);
    }
    function getDistance() {
      return parseFloat((horizonRef.value.offsetWidth / props.amount).toFixed(2));
    }
    function moveLeft() {
      if (left.value >= distance.value) {
        textData.value.push(textData.value.shift());
        left.value = 0;
      } else {
        left.value += step.value;
      }
      moveRaf.value = requestAnimationFrame$1(moveLeft);
    }
    const totalWidth = computed(() => {
      if (typeof props.width === "number") {
        return props.width + "px";
      } else {
        return props.width;
      }
    });
    const len = computed(() => {
      return props.sliderText.length;
    });
    onMounted(() => {
      if (props.vertical) {
        onStart();
      } else {
        getFPS();
      }
    });
    function onStart() {
      if (props.vertical) {
        if (len.value > 1) {
          startMove();
        }
      } else {
        if (textData.value.length > props.amount) {
          moveRaf.value = requestAnimationFrame$1(moveLeft);
        }
      }
    }
    function onStop() {
      if (props.vertical) {
        if (len.value > 1) {
          cancelAnimationFrame$1(timer.id);
        }
      } else {
        cancelAnimationFrame$1(moveRaf.value);
      }
    }
    function onClick(title) {
      emit("click", title);
    }
    const actIndex = ref(0);
    var timer = null;
    function startMove() {
      timer = rafTimeout(() => {
        if (actIndex.value === len.value - 1) {
          actIndex.value = 0;
        } else {
          actIndex.value++;
        }
        startMove();
      }, props.interval);
    }
    return (_ctx, _cache) => {
      return !__props.vertical ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "m-slider-horizon",
        onMouseenter: onStop,
        onMouseleave: onStart,
        ref_key: "horizonRef",
        ref: horizonRef,
        style: normalizeStyle(`height: ${__props.height}px; width: ${unref(totalWidth)}; background: ${__props.backgroundColor};`)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(textData.value, (text, index) => {
          return openBlock(), createElementBlock("a", {
            style: normalizeStyle(`will-change: transform; transform: translateX(${-left.value}px); width: ${distance.value - __props.gap}px; margin-left: ${__props.gap}px;`),
            class: "u-slide-title",
            key: index,
            title: text.title,
            href: text.link ? text.link : "javascript:;",
            target: text.link ? "_blank" : "_self",
            onClick: ($event) => onClick(text.title)
          }, toDisplayString(text.title || "--"), 13, _hoisted_1$4);
        }), 128))
      ], 36)) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: "m-slider-vertical",
        onMouseenter: onStop,
        onMouseleave: onStart,
        style: normalizeStyle(`height: ${__props.height}px; width: ${unref(totalWidth)}; background: ${__props.backgroundColor};`)
      }, [
        createVNode(TransitionGroup, { name: "slide" }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.sliderText, (text, index) => {
              return withDirectives((openBlock(), createElementBlock("div", {
                class: "m-slider",
                style: normalizeStyle(`width: calc(${unref(totalWidth)} - ${2 * __props.gap}px); height: ${__props.height}px;`),
                key: text
              }, [
                createElementVNode("a", {
                  class: "u-slider",
                  title: text.title,
                  href: text.link ? text.link : "javascript:;",
                  target: text.link ? "_blank" : "_self",
                  onClick: ($event) => onClick(text.title)
                }, toDisplayString(text.title), 9, _hoisted_2$3)
              ], 4)), [
                [vShow, actIndex.value === index]
              ]);
            }), 128))
          ]),
          _: 1
        })
      ], 36));
    };
  }
});
const TextScroll_vue_vue_type_style_index_0_scoped_acff5c6f_lang = "";
const TextScroll = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-acff5c6f"]]);
TextScroll.install = (app) => {
  app.component(TextScroll.__name, TextScroll);
};
const _withScopeId$1 = (n) => (pushScopeId("data-v-bf8f234e"), n = n(), popScopeId(), n);
const _hoisted_1$3 = { class: "m-timeline" };
const _hoisted_2$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("span", { class: "u-tail" }, null, -1));
const _hoisted_3$1 = { class: "m-dot" };
const _hoisted_4$1 = { class: "u-content" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Timeline",
  props: {
    timelineData: { default: () => [] },
    width: { default: 360 }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-timeline-area",
        style: normalizeStyle(`width: ${__props.width}px`)
      }, [
        createElementVNode("div", _hoisted_1$3, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.timelineData, (data, index) => {
            return openBlock(), createElementBlock("div", {
              class: normalizeClass(["m-timeline-item", { "last": index === __props.timelineData.length - 1 }]),
              key: index
            }, [
              _hoisted_2$2,
              createElementVNode("div", _hoisted_3$1, [
                renderSlot(_ctx.$slots, "dot", { index }, () => [
                  data.color === "red" ? (openBlock(), createElementBlock("span", {
                    key: 0,
                    class: "u-dot",
                    style: normalizeStyle({
                      borderColor: "#ff4d4f"
                      /* red */
                    })
                  }, null, 4)) : data.color === "gray" ? (openBlock(), createElementBlock("span", {
                    key: 1,
                    class: "u-dot",
                    style: normalizeStyle({
                      borderColor: "#00000040"
                      /* gray */
                    })
                  }, null, 4)) : data.color === "green" ? (openBlock(), createElementBlock("span", {
                    key: 2,
                    class: "u-dot",
                    style: normalizeStyle({
                      borderColor: "#52c41a"
                      /* green */
                    })
                  }, null, 4)) : (openBlock(), createElementBlock("span", {
                    key: 3,
                    class: "u-dot",
                    style: normalizeStyle({
                      borderColor: "#1677ff"
                      /* blue */
                    })
                  }, null, 4))
                ], true)
              ]),
              createElementVNode("div", _hoisted_4$1, [
                renderSlot(_ctx.$slots, "desc", { index }, () => [
                  createTextVNode(toDisplayString(data.desc || "--"), 1)
                ], true)
              ])
            ], 2);
          }), 128))
        ])
      ], 4);
    };
  }
});
const Timeline_vue_vue_type_style_index_0_scoped_bf8f234e_lang = "";
const Timeline = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-bf8f234e"]]);
Timeline.install = (app) => {
  app.component(Timeline.__name, Timeline);
};
const _hoisted_1$2 = { class: "m-arrow" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Tooltip",
  props: {
    // 运行时声明
    maxWidth: {
      // 提示框内容最大宽度
      type: Number,
      default: 120
    },
    content: {
      // 展示的文本
      type: String,
      default: "暂无内容"
      // string | slot
    },
    title: {
      // 提示的文本
      type: String,
      default: "暂无提示"
      // string | slot
    },
    fontSize: {
      // 提示文本字体大小
      type: Number,
      default: 14
    },
    color: {
      // 提示文本字体颜色
      type: String,
      default: "rgba(0,0,0,.85)"
    },
    backgroundColor: {
      // 提示框背景色
      type: String,
      default: "#FFF"
    }
  },
  setup(__props) {
    const visible = ref(false);
    const hideTimer = ref();
    const top = ref(0);
    const left = ref(0);
    const contentRef = ref();
    const titleRef = ref();
    onMounted(() => {
      getPosition();
    });
    function getPosition() {
      const rect = contentRef.value.getBoundingClientRect();
      const targetTop = rect.top;
      const targetLeft = rect.left;
      const targetWidth = rect.width;
      const titleWidth = titleRef.value.offsetWidth;
      const titleHeight = titleRef.value.offsetHeight;
      top.value = targetTop - titleHeight;
      left.value = targetLeft - (titleWidth - targetWidth) / 2;
    }
    function onShow() {
      getPosition();
      cancelRaf(hideTimer.value);
      visible.value = true;
    }
    function onHide() {
      hideTimer.value = rafTimeout(() => {
        visible.value = false;
      }, 100);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-tooltip",
        onMouseenter: onShow,
        onMouseleave: onHide
      }, [
        createElementVNode("div", {
          ref_key: "titleRef",
          ref: titleRef,
          class: normalizeClass(["m-title", { "show-tip": visible.value }]),
          onMouseenter: onShow,
          onMouseleave: onHide,
          style: normalizeStyle(`max-width: ${__props.maxWidth}px; top: ${top.value}px; left: ${left.value}px;`)
        }, [
          createElementVNode("div", {
            class: "u-title",
            style: normalizeStyle(`font-size: ${__props.fontSize}px; color: ${__props.color}; background-color: ${__props.backgroundColor};`)
          }, [
            renderSlot(_ctx.$slots, "title", {}, () => [
              createTextVNode(toDisplayString(__props.title), 1)
            ], true)
          ], 4),
          createElementVNode("div", _hoisted_1$2, [
            createElementVNode("span", {
              class: "u-arrow",
              style: normalizeStyle(`background-color: ${__props.backgroundColor};`)
            }, null, 4)
          ])
        ], 38),
        createElementVNode("div", {
          ref_key: "contentRef",
          ref: contentRef,
          class: "u-content"
        }, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(__props.content), 1)
          ], true)
        ], 512)
      ], 32);
    };
  }
});
const Tooltip_vue_vue_type_style_index_0_scoped_988d997b_lang = "";
const Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-988d997b"]]);
Tooltip.install = (app) => {
  app.component(Tooltip.__name, Tooltip);
};
const _withScopeId = (n) => (pushScopeId("data-v-3b7a45e9"), n = n(), popScopeId(), n);
const _hoisted_1$1 = ["src", "poster", "width", "height", "autoplay", "controls", "loop", "muted", "preload", "onClickOnce"];
const _hoisted_2$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("path", {
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
  _hoisted_2$1,
  _hoisted_3
];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Video",
  props: {
    videoSrc: { default: "" },
    videoPoster: { default: "" },
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
    const poster = ref(props.videoPoster);
    const originPlay = ref(true);
    const vplay = ref(false);
    const veo = ref();
    function getPoster() {
      veo.value.currentTime = 0.3;
      const canvas2 = document.createElement("canvas");
      const ctx = canvas2.getContext("2d");
      canvas2.width = veo.value.videoWidth;
      canvas2.height = veo.value.videoHeight;
      ctx == null ? void 0 : ctx.drawImage(veo.value, 0, 0, canvas2.width, canvas2.height);
      poster.value = canvas2.toDataURL("image/png");
    }
    function onPlay() {
      var _a2, _b;
      console.log("click");
      if (props.autoplay) {
        (_a2 = veo.value) == null ? void 0 : _a2.pause();
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
      var _a2, _b;
      if (props.showPlay) {
        (_a2 = veo.value) == null ? void 0 : _a2.addEventListener("pause", onPause);
        (_b = veo.value) == null ? void 0 : _b.addEventListener("playing", onPlaying);
      }
      if (props.autoplay) {
        vplay.value = true;
        originPlay.value = false;
      }
    });
    onUnmounted(() => {
      var _a2, _b;
      (_a2 = veo.value) == null ? void 0 : _a2.removeEventListener("pause", onPause);
      (_b = veo.value) == null ? void 0 : _b.removeEventListener("playing", onPlaying);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-video", { "u-video-hover": !vplay.value }]),
        style: normalizeStyle(`width: ${__props.width}px; height: ${__props.height}px;`)
      }, [
        createElementVNode("video", mergeProps({
          ref_key: "veo",
          ref: veo,
          style: `object-fit: ${__props.zoom};`,
          src: __props.videoSrc,
          poster: poster.value,
          width: __props.width,
          height: __props.height,
          autoplay: __props.autoplay,
          controls: !originPlay.value && __props.controls,
          loop: __props.loop,
          muted: __props.autoplay || __props.muted,
          preload: __props.preload,
          crossorigin: "anonymous"
        }, _ctx.$attrs, {
          onLoadeddata: _cache[0] || (_cache[0] = ($event) => poster.value ? (e) => e.preventDefault() : getPoster()),
          onClickOnce: withModifiers(onPlay, ["prevent"])
        }), " 您的浏览器不支持video标签。 ", 16, _hoisted_1$1),
        withDirectives((openBlock(), createElementBlock("svg", {
          class: normalizeClass(["u-play", { "hidden": vplay.value }]),
          style: normalizeStyle(`width: ${__props.playWidth}px; height: ${__props.playWidth}px;`),
          viewBox: "0 0 24 24"
        }, _hoisted_4, 6)), [
          [vShow, originPlay.value || __props.showPlay]
        ])
      ], 6);
    };
  }
});
const Video_vue_vue_type_style_index_0_scoped_3b7a45e9_lang = "";
const Video = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-3b7a45e9"]]);
Video.install = (app) => {
  app.component(Video.__name, Video);
};
const _hoisted_1 = ["src", "title", "alt"];
const _hoisted_2 = ["src", "title", "alt"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Waterfall",
  props: {
    imageData: {
      // 瀑布流的图片数组
      type: Array,
      required: true,
      default: () => {
        return [];
      }
    },
    columnCount: {
      // 瀑布流要划分的列数
      type: Number,
      default: 3
    },
    columnGap: {
      // 瀑布流各列之间的间隙
      type: Number,
      default: 30
    },
    totalWidth: {
      // 瀑布流区域的总宽度
      type: Number,
      default: 1200
    },
    backgroundColor: {
      // 瀑布流区域背景填充色
      type: String,
      default: "#F2F4F8"
    },
    mode: {
      // JS：js计算模式，CSS：css布局模式
      type: String,
      default: "JS"
    }
  },
  setup(__props) {
    const props = __props;
    const cssWidth = computed(() => {
      return props.totalWidth - 2 * props.columnGap;
    });
    const imagesProperty = ref([]);
    const preColumnHeight = ref([]);
    const imageWidth = computed(() => {
      return (props.totalWidth - 4 * props.columnGap) / props.columnCount;
    });
    const height = computed(() => {
      return Math.max(...preColumnHeight.value) + props.columnGap;
    });
    watch(
      () => props.imageData,
      (to) => {
        onPreload();
        imagesProperty.value.splice(to.length);
      }
    );
    onMounted(() => {
      if (props.imageData.length) {
        onPreload();
        imagesProperty.value.splice(props.imageData.length);
      }
    });
    function getPosition(i, height2) {
      if (i < props.columnCount) {
        preColumnHeight.value[i] = props.columnGap + height2;
        return {
          top: props.columnGap,
          left: (imageWidth.value + props.columnGap) * i + props.columnGap
        };
      } else {
        const top = Math.min(...preColumnHeight.value);
        var index = 0;
        for (let n = 0; n < preColumnHeight.value.length; n++) {
          if (preColumnHeight.value[n] === top) {
            index = n;
            break;
          }
        }
        preColumnHeight.value[index] = top + props.columnGap + height2;
        return {
          top: top + props.columnGap,
          left: (imageWidth.value + props.columnGap) * index + props.columnGap
        };
      }
    }
    function onLoad(url, i) {
      return new Promise((resolve) => {
        const image = new Image();
        image.src = url;
        image.onload = function() {
          var height2 = image.height / (image.width / imageWidth.value);
          imagesProperty.value[i] = {
            // 存储图片宽高和位置信息
            width: imageWidth.value,
            height: height2,
            ...getPosition(i, height2)
          };
          resolve("load");
        };
      });
    }
    async function onPreload() {
      const len = props.imageData.length;
      for (let i = 0; i < len; i++) {
        await onLoad(props.imageData[i].imgUrl, i);
      }
    }
    return (_ctx, _cache) => {
      return __props.mode === "JS" ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "m-waterfall-js",
        style: normalizeStyle(`background-color: ${__props.backgroundColor}; width: ${__props.totalWidth}px; height: ${unref(height)}px;`)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(imagesProperty.value, (item, index) => {
          return openBlock(), createElementBlock("img", {
            class: "u-img",
            key: index,
            style: normalizeStyle(`width: ${unref(imageWidth)}px; top: ${item && item.top}px; left: ${item && item.left}px;`),
            src: __props.imageData[index].imgUrl,
            title: __props.imageData[index].title,
            alt: __props.imageData[index].title
          }, null, 12, _hoisted_1);
        }), 128))
      ], 4)) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: "m-waterfall-css",
        style: normalizeStyle(`background: ${__props.backgroundColor}; width: ${unref(cssWidth)}px; padding: ${__props.columnGap}px; column-count: ${__props.columnCount}; column-gap: ${__props.columnGap}px;`)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.imageData, (item, index) => {
          return openBlock(), createElementBlock("div", {
            class: "m-img",
            style: normalizeStyle(`margin-bottom: ${__props.columnGap}px;`),
            key: index
          }, [
            createElementVNode("img", {
              class: "u-img",
              src: item.imgUrl,
              title: item.title,
              alt: item.title
            }, null, 8, _hoisted_2)
          ], 4);
        }), 128))
      ], 4));
    };
  }
});
const Waterfall_vue_vue_type_style_index_0_scoped_4768b04e_lang = "";
const Waterfall = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4768b04e"]]);
Waterfall.install = (app) => {
  app.component(Waterfall.__name, Waterfall);
};
const components = [
  Breadcrumb,
  Button,
  Carousel,
  Cascader,
  Checkbox,
  Collapse,
  Countdown,
  DatePicker,
  Dialog,
  Divider,
  Empty,
  Image$1,
  InputNumber,
  Message,
  Modal,
  Notification,
  Pagination,
  Progress,
  QRCode,
  Radio,
  Rate,
  Select,
  Slider,
  Spin,
  Steps,
  Swiper,
  Switch,
  Table,
  Tabs,
  TextScroll,
  Timeline,
  Tooltip,
  Video,
  Waterfall
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
  Carousel,
  Cascader,
  Checkbox,
  Collapse,
  Countdown,
  DatePicker,
  Dialog,
  Divider,
  Empty,
  Image$1 as Image,
  InputNumber,
  Message,
  Modal,
  Notification,
  Pagination,
  Progress,
  QRCode,
  Radio,
  Rate,
  Select,
  Slider,
  Spin,
  Steps,
  Swiper,
  Switch,
  Table,
  Tabs,
  TextScroll,
  Timeline,
  Tooltip,
  Video,
  Waterfall,
  cancelAnimationFrame$1 as cancelAnimationFrame,
  cancelRaf,
  dateFormat,
  debounce,
  VueAmazingUI as default,
  rafTimeout,
  requestAnimationFrame$1 as requestAnimationFrame,
  throttle
};
