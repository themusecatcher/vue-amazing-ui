import { defineComponent, computed, openBlock, createElementBlock, normalizeStyle, Fragment, renderList, createElementVNode, normalizeClass, toDisplayString, createCommentVNode, pushScopeId, popScopeId, createBlock, unref, withCtx, renderSlot, createTextVNode, withModifiers, withDirectives, vShow, ref, onMounted, watchEffect, createVNode, Transition, watch, resolveComponent, mergeProps, createStaticVNode, onUnmounted, withKeys, vModelText, TransitionGroup, toRef as toRef$1, readonly, customRef, h, onUpdated, provide, nextTick, onBeforeUnmount, onBeforeUpdate } from "vue";
import { useRouter, RouterLink } from "vue-router";
import VueDatePicker from "@vuepic/vue-datepicker";
import QRCode$1 from "qrcode";
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
const requestAnimationFrame$1 = typeof window !== "undefined" ? window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame : () => {
};
const cancelAnimationFrame$1 = typeof window !== "undefined" ? window.cancelAnimationFrame || window.mozCancelAnimationFrame : () => {
};
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
function add(num1, num2) {
  const num1DeciStr = String(num1).split(".")[1];
  const num2DeciStr = String(num2).split(".")[1];
  let maxLen = Math.max((num1DeciStr == null ? void 0 : num1DeciStr.length) || 0, (num2DeciStr == null ? void 0 : num2DeciStr.length) || 0);
  let num1Str = num1.toFixed(maxLen);
  let num2Str = num2.toFixed(maxLen);
  const result = +num1Str.replace(".", "") + +num2Str.replace(".", "");
  return result / Math.pow(10, maxLen);
}
function downloadFile(url, name) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";
  xhr.onload = function() {
    if (xhr.status === 200) {
      const blob = xhr.response;
      const link = document.createElement("a");
      const body = document.querySelector("body");
      link.href = window.URL.createObjectURL(blob);
      link.download = name;
      link.style.display = "none";
      body == null ? void 0 : body.appendChild(link);
      link.click();
      body == null ? void 0 : body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    }
  };
  xhr.send();
}
const _withScopeId$i = (n) => (pushScopeId("data-v-a67593ef"), n = n(), popScopeId(), n);
const _hoisted_1$v = ["onClick", "title"];
const _hoisted_2$s = {
  key: 0,
  class: "u-separator"
};
const _hoisted_3$q = {
  key: 1,
  class: "u-arrow",
  viewBox: "64 64 896 896",
  "data-icon": "right",
  "aria-hidden": "true",
  focusable: "false"
};
const _hoisted_4$n = /* @__PURE__ */ _withScopeId$i(() => /* @__PURE__ */ createElementVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" }, null, -1));
const _hoisted_5$j = [
  _hoisted_4$n
];
const _hoisted_6$h = /* @__PURE__ */ _withScopeId$i(() => /* @__PURE__ */ createElementVNode("div", { class: "assist" }, null, -1));
const _sfc_main$y = /* @__PURE__ */ defineComponent({
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
      router.push({ path: route.path, query: route.query || "" });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-breadcrumb",
        style: normalizeStyle(`height: ${_ctx.height}px;`)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.routes, (route, index) => {
          return openBlock(), createElementBlock("div", {
            class: "m-bread",
            key: index
          }, [
            createElementVNode("a", {
              class: normalizeClass(["u-route", { active: index === len.value - 1 }]),
              onClick: ($event) => index === len.value - 1 ? () => false : goRouter(route),
              title: route.name
            }, toDisplayString(route.name || "--"), 11, _hoisted_1$v),
            index !== len.value - 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              _ctx.separator ? (openBlock(), createElementBlock("span", _hoisted_2$s, toDisplayString(_ctx.separator), 1)) : (openBlock(), createElementBlock("svg", _hoisted_3$q, _hoisted_5$j))
            ], 64)) : createCommentVNode("", true)
          ]);
        }), 128)),
        _hoisted_6$h
      ], 4);
    };
  }
});
const Breadcrumb_vue_vue_type_style_index_0_scoped_a67593ef_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const Breadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__scopeId", "data-v-a67593ef"]]);
Breadcrumb.install = (app) => {
  app.component(Breadcrumb.__name, Breadcrumb);
};
const _hoisted_1$u = { class: "u-text" };
const _hoisted_2$r = ["disabled"];
const _hoisted_3$p = { class: "u-spin-circle" };
const _hoisted_4$m = { class: "u-text" };
const _sfc_main$x = /* @__PURE__ */ defineComponent({
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
    loading: { type: Boolean, default: false },
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
      return openBlock(), createElementBlock("span", {
        class: normalizeClass(["m-btn-wrap", { "center": _ctx.center }])
      }, [
        isRoute.value ? (openBlock(), createBlock(unref(RouterLink), {
          key: 0,
          to: _ctx.route,
          target: _ctx.target,
          disabled: _ctx.disabled,
          class: normalizeClass(["m-btn fade", [_ctx.type, _ctx.size, { [_ctx.effect]: _ctx.type === "default", widthType: _ctx.width, disabled: _ctx.disabled }]]),
          style: normalizeStyle(`border-radius: ${_ctx.borderRadius}px; width: ${_ctx.width ? _ctx.width + "px" : "auto"}; height: ${_ctx.height ? _ctx.height + "px" : "auto"}; line-height: ${_ctx.height - 2}px;`)
        }, {
          default: withCtx(() => [
            createElementVNode("span", _hoisted_1$u, [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode(toDisplayString(_ctx.name), 1)
              ], true)
            ])
          ]),
          _: 3
        }, 8, ["to", "target", "disabled", "class", "style"])) : (openBlock(), createElementBlock("a", {
          key: 1,
          onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.$emit("click"), ["stop"])),
          disabled: _ctx.disabled,
          class: normalizeClass(["m-btn", [_ctx.type, _ctx.size, { [_ctx.effect]: _ctx.type === "default", widthType: _ctx.width, disabled: _ctx.disabled, "m-btn-loading": _ctx.loading }]]),
          style: normalizeStyle(`border-radius: ${_ctx.borderRadius}px; width: ${_ctx.width ? _ctx.width + "px" : "auto"}; height: ${_ctx.height ? _ctx.height + "px" : "auto"}; line-height: ${_ctx.height - 2}px;`)
        }, [
          createElementVNode("span", {
            class: normalizeClass(["m-loading-icon", { "show-spin": _ctx.loading }])
          }, [
            withDirectives(createElementVNode("span", _hoisted_3$p, null, 512), [
              [vShow, _ctx.loading]
            ])
          ], 2),
          createElementVNode("span", _hoisted_4$m, [
            renderSlot(_ctx.$slots, "default", {}, () => [
              createTextVNode(toDisplayString(_ctx.name), 1)
            ], true)
          ])
        ], 14, _hoisted_2$r))
      ], 2);
    };
  }
});
const Button_vue_vue_type_style_index_0_scoped_33b3ef8d_lang = "";
const Button = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__scopeId", "data-v-33b3ef8d"]]);
Button.install = (app) => {
  app.component(Button.__name, Button);
};
const _withScopeId$h = (n) => (pushScopeId("data-v-eb8d5710"), n = n(), popScopeId(), n);
const _hoisted_1$t = ["href", "target"];
const _hoisted_2$q = ["onLoad", "src", "alt"];
const _hoisted_3$o = { class: "u-spin-circle" };
const _hoisted_4$l = {
  key: 0,
  class: "m-image"
};
const _hoisted_5$i = ["href", "target"];
const _hoisted_6$g = ["src", "alt"];
const _hoisted_7$e = { class: "u-spin-circle" };
const _hoisted_8$d = /* @__PURE__ */ _withScopeId$h(() => /* @__PURE__ */ createElementVNode("path", { d: "M603.3 327.5l-246 178a7.95 7.95 0 0 0 0 12.9l246 178c5.3 3.8 12.7 0 12.7-6.5V643c0-10.2-4.9-19.9-13.2-25.9L457.4 512l145.4-105.2c8.3-6 13.2-15.6 13.2-25.9V334c0-6.5-7.4-10.3-12.7-6.5z" }, null, -1));
const _hoisted_9$d = /* @__PURE__ */ _withScopeId$h(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
const _hoisted_10$9 = [
  _hoisted_8$d,
  _hoisted_9$d
];
const _hoisted_11$8 = /* @__PURE__ */ _withScopeId$h(() => /* @__PURE__ */ createElementVNode("path", { d: "M666.7 505.5l-246-178A8 8 0 0 0 408 334v46.9c0 10.2 4.9 19.9 13.2 25.9L566.6 512 421.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5l246-178c4.4-3.2 4.4-9.8 0-13z" }, null, -1));
const _hoisted_12$7 = /* @__PURE__ */ _withScopeId$h(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
const _hoisted_13$7 = [
  _hoisted_11$8,
  _hoisted_12$7
];
const _hoisted_14$7 = {
  key: 1,
  class: "m-switch"
};
const _hoisted_15$7 = ["onClick"];
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  __name: "Carousel",
  props: {
    images: { default: () => [] },
    interval: { default: 3e3 },
    width: { default: "100%" },
    height: { default: "100vh" },
    navigation: { type: Boolean, default: true },
    pagination: { type: Boolean, default: true },
    disableOnInteraction: { type: Boolean, default: true },
    pauseOnMouseEnter: { type: Boolean, default: true }
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
      return (props.images.length + 1) * imageWidth.value;
    });
    const len = computed(() => {
      return props.images.length;
    });
    onMounted(() => {
      getFPS();
      getImageSize();
    });
    const complete = ref(Array(len.value).fill(false));
    const fpsRaf = ref();
    const fps = ref(60);
    const step = computed(() => {
      if (fps.value === 60) {
        return 12;
      } else {
        return 12 * (fps.value / 60);
      }
    });
    function onComplete(index) {
      complete.value[index] = true;
    }
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
        style: normalizeStyle(`width: ${carouselWidth.value}; height: ${carouselHeight.value};`),
        onMouseenter: _cache[3] || (_cache[3] = ($event) => _ctx.pauseOnMouseEnter ? onStop() : () => false),
        onMouseleave: _cache[4] || (_cache[4] = ($event) => _ctx.pauseOnMouseEnter ? onStart() : () => false)
      }, [
        createElementVNode("div", {
          class: normalizeClass({ "transition": transition.value }),
          style: normalizeStyle(`width: ${totalWidth.value}px; height: 100%; will-change: transform; transform: translateX(${-left.value}px);`)
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.images, (image, index) => {
            return openBlock(), createElementBlock("div", {
              class: "m-image",
              key: index
            }, [
              createElementVNode("a", {
                href: image.link ? image.link : "javascript:;",
                target: image.link ? "_blank" : "_self",
                class: "m-link"
              }, [
                (openBlock(), createElementBlock("img", {
                  onLoad: ($event) => onComplete(index),
                  src: image.src,
                  key: image.src,
                  alt: image.title,
                  class: "u-img",
                  style: normalizeStyle(`width: ${imageWidth.value}px; height: ${imageHeight.value}px;`)
                }, null, 44, _hoisted_2$q)),
                withDirectives(createElementVNode("div", _hoisted_3$o, null, 512), [
                  [vShow, !complete.value[index]]
                ])
              ], 8, _hoisted_1$t)
            ]);
          }), 128)),
          len.value ? (openBlock(), createElementBlock("div", _hoisted_4$l, [
            createElementVNode("a", {
              href: _ctx.images[0].link ? _ctx.images[0].link : "javascript:;",
              target: _ctx.images[0].link ? "_blank" : "_self",
              class: "m-link"
            }, [
              (openBlock(), createElementBlock("img", {
                onLoad: _cache[0] || (_cache[0] = ($event) => onComplete(0)),
                src: _ctx.images[0].src,
                key: _ctx.images[0].src,
                alt: _ctx.images[0].title,
                class: "u-img",
                style: normalizeStyle(`width: ${imageWidth.value}px; height: ${imageHeight.value}px;`)
              }, null, 44, _hoisted_6$g)),
              withDirectives(createElementVNode("div", _hoisted_7$e, null, 512), [
                [vShow, !complete.value[0]]
              ])
            ], 8, _hoisted_5$i)
          ])) : createCommentVNode("", true)
        ], 6),
        _ctx.navigation ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          (openBlock(), createElementBlock("svg", {
            class: "arrow-left",
            onClick: _cache[1] || (_cache[1] = ($event) => onLeftArrow((activeSwitcher.value + len.value - 2) % len.value * imageWidth.value)),
            viewBox: "64 64 896 896",
            "data-icon": "left-circle",
            "aria-hidden": "true",
            focusable: "false"
          }, _hoisted_10$9)),
          (openBlock(), createElementBlock("svg", {
            class: "arrow-right",
            onClick: _cache[2] || (_cache[2] = ($event) => onRightArrow(activeSwitcher.value * imageWidth.value)),
            viewBox: "64 64 896 896",
            "data-icon": "right-circle",
            "aria-hidden": "true",
            focusable: "false"
          }, _hoisted_13$7))
        ], 64)) : createCommentVNode("", true),
        _ctx.pagination ? (openBlock(), createElementBlock("div", _hoisted_14$7, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(len.value, (n) => {
            return openBlock(), createElementBlock("div", {
              onClick: ($event) => onSwitch(n),
              class: normalizeClass(["u-rect", { "active": activeSwitcher.value === n }]),
              key: n
            }, null, 10, _hoisted_15$7);
          }), 128))
        ])) : createCommentVNode("", true)
      ], 36);
    };
  }
});
const Carousel_vue_vue_type_style_index_0_scoped_eb8d5710_lang = "";
const Carousel = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__scopeId", "data-v-eb8d5710"]]);
Carousel.install = (app) => {
  app.component(Carousel.__name, Carousel);
};
const _withScopeId$g = (n) => (pushScopeId("data-v-3779900b"), n = n(), popScopeId(), n);
const _hoisted_1$s = ["title"];
const _hoisted_2$p = /* @__PURE__ */ _withScopeId$g(() => /* @__PURE__ */ createElementVNode("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1));
const _hoisted_3$n = [
  _hoisted_2$p
];
const _hoisted_4$k = ["onClick"];
const _hoisted_5$h = /* @__PURE__ */ _withScopeId$g(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1));
const _hoisted_6$f = [
  _hoisted_5$h
];
const _hoisted_7$d = ["title", "onMouseenter", "onClick"];
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "Select",
  props: {
    options: { default: () => [] },
    label: { default: "label" },
    value: { default: "value" },
    placeholder: { default: "请选择" },
    disabled: { type: Boolean, default: false },
    allowClear: { type: Boolean, default: false },
    width: { default: 120 },
    height: { default: 32 },
    num: { default: 6 },
    selectedValue: { default: null }
  },
  emits: ["update:selectedValue", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const selectedName = ref();
    const hoverValue = ref();
    const showOptions = ref(false);
    const activeBlur = ref(true);
    const showClose = ref(false);
    watchEffect(() => {
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
      emits("update:selectedValue");
      emits("change");
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
        style: normalizeStyle(`height: ${_ctx.height}px;`)
      }, [
        createElementVNode("div", {
          class: normalizeClass(["m-select-wrap", { "hover": !_ctx.disabled, "focus": showOptions.value, "disabled": _ctx.disabled }]),
          style: normalizeStyle(`width: ${_ctx.width}px; height: ${_ctx.height}px;`),
          tabindex: "0",
          onMouseenter: onInputEnter,
          onMouseleave: onInputLeave,
          onBlur: _cache[0] || (_cache[0] = ($event) => activeBlur.value && !_ctx.disabled ? onBlur() : (e) => e.preventDefault()),
          onClick: _cache[1] || (_cache[1] = ($event) => _ctx.disabled ? (e) => e.preventDefault() : openSelect())
        }, [
          createElementVNode("div", {
            class: normalizeClass(["u-select-input", { "placeholder": !selectedName.value }]),
            style: normalizeStyle(`line-height: ${_ctx.height - 2}px;`),
            title: selectedName.value
          }, toDisplayString(selectedName.value || _ctx.placeholder), 15, _hoisted_1$s),
          (openBlock(), createElementBlock("svg", {
            class: normalizeClass(["triangle", { "rotate": showOptions.value, "show": !showClose.value }]),
            viewBox: "64 64 896 896",
            "data-icon": "down",
            "aria-hidden": "true",
            focusable: "false"
          }, _hoisted_3$n, 2)),
          (openBlock(), createElementBlock("svg", {
            onClick: withModifiers(onClear, ["stop"]),
            class: normalizeClass(["close", { "show": showClose.value }]),
            focusable: "false",
            "data-icon": "close-circle",
            "aria-hidden": "true",
            viewBox: "64 64 896 896"
          }, _hoisted_6$f, 10, _hoisted_4$k))
        ], 38),
        createVNode(Transition, { name: "fade" }, {
          default: withCtx(() => [
            withDirectives(createElementVNode("div", {
              class: "m-options-panel",
              onMouseenter: onEnter,
              onMouseleave: onLeave,
              style: normalizeStyle(`top: ${_ctx.height + 4}px; line-height: ${_ctx.height - 10}px; max-height: ${_ctx.num * _ctx.height + 9}px; width: ${_ctx.width}px;`)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.options, (option, index) => {
                return openBlock(), createElementBlock("p", {
                  key: index,
                  class: normalizeClass(["u-option", { "option-selected": option[_ctx.label] === selectedName.value, "option-hover": !option.disabled && option[_ctx.value] === hoverValue.value, "option-disabled": option.disabled }]),
                  title: option[_ctx.label],
                  onMouseenter: ($event) => onHover(option[_ctx.value]),
                  onClick: ($event) => option.disabled ? (e) => e.preventDefault() : onChange(option[_ctx.value], option[_ctx.label], index)
                }, toDisplayString(option[_ctx.label]), 43, _hoisted_7$d);
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
const Select_vue_vue_type_style_index_0_scoped_3779900b_lang = "";
const Select = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__scopeId", "data-v-3779900b"]]);
Select.install = (app) => {
  app.component(Select.__name, Select);
};
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "Cascader",
  props: {
    options: { default: () => [] },
    selectedValue: { default: () => [] },
    label: { default: "label" },
    value: { default: "value" },
    children: { default: "children" },
    changeOnSelect: { type: Boolean, default: false },
    zIndex: { default: 1 },
    gap: { default: 8 },
    width: { default: 120 },
    height: { default: 32 },
    disabled: { type: [Boolean, Array], default: false },
    placeholder: { default: "请选择" },
    num: { default: 6 }
  },
  emits: ["update:selectedValue", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const values = ref([]);
    const labels = ref([]);
    const firstOptions = ref([]);
    const secondOptions = ref([]);
    const thirdOptions = ref([]);
    watchEffect(() => {
      firstOptions.value = [...props.options];
    });
    watchEffect(() => {
      values.value = [...props.selectedValue];
    });
    watchEffect(() => {
      initCascader(values.value);
      initLabels(values.value);
    });
    function findChildren(options, index) {
      const len = options.length;
      for (let i = 0; i < len; i++) {
        if (options[i][props.value] === values.value[index]) {
          return options[i][props.children] || [];
        }
      }
      return [];
    }
    function initCascader(values2) {
      secondOptions.value = findChildren(firstOptions.value, 0);
      thirdOptions.value = [];
      if (values2.length > 1) {
        thirdOptions.value = findChildren(secondOptions.value, 1);
      }
    }
    function findLabel(options, index) {
      const len = options.length;
      for (let i = 0; i < len; i++) {
        if (options[i][props.value] === values.value[index]) {
          return options[i][props.label];
        }
      }
      return values.value[index];
    }
    function initLabels(values2) {
      labels.value[0] = findLabel(firstOptions.value, 0);
      if (values2.length > 1) {
        labels.value[1] = findLabel(secondOptions.value, 1);
      }
      if (values2.length > 2) {
        labels.value[2] = findLabel(thirdOptions.value, 2);
      }
    }
    function onFirstChange(value, label) {
      if (props.changeOnSelect) {
        emits("update:selectedValue", [value]);
        emits("change", [value], [label]);
      } else {
        values.value = [value];
        labels.value = [label];
      }
    }
    function onSecondChange(value, label) {
      if (props.changeOnSelect) {
        emits("update:selectedValue", [values.value[0], value]);
        emits("change", [values.value[0], value], [labels.value[0], label]);
      } else {
        values.value = [values.value[0], value];
        labels.value = [labels.value[0], label];
      }
    }
    function onThirdChange(value, label) {
      emits("update:selectedValue", [...values.value.slice(0, 2), value]);
      emits("change", [...values.value.slice(0, 2), value], [...labels.value.slice(0, 2), label]);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-cascader-wrap",
        style: normalizeStyle(`height: ${_ctx.height}px;`)
      }, [
        createVNode(unref(Select), {
          style: normalizeStyle(`margin-right: ${_ctx.gap}px; z-index: ${_ctx.zIndex};`),
          options: firstOptions.value,
          selectedValue: values.value[0],
          "onUpdate:selectedValue": _cache[0] || (_cache[0] = ($event) => values.value[0] = $event),
          label: _ctx.label,
          value: _ctx.value,
          disabled: Array.isArray(_ctx.disabled) ? _ctx.disabled[0] : _ctx.disabled,
          width: Array.isArray(_ctx.width) ? _ctx.width[0] : _ctx.width,
          height: _ctx.height,
          num: _ctx.num,
          placeholder: Array.isArray(_ctx.placeholder) ? _ctx.placeholder[0] : _ctx.placeholder,
          onChange: onFirstChange
        }, null, 8, ["style", "options", "selectedValue", "label", "value", "disabled", "width", "height", "num", "placeholder"]),
        createVNode(unref(Select), {
          style: normalizeStyle(`margin-right: ${_ctx.gap}px; z-index: ${_ctx.zIndex};`),
          options: secondOptions.value,
          selectedValue: values.value[1],
          "onUpdate:selectedValue": _cache[1] || (_cache[1] = ($event) => values.value[1] = $event),
          label: _ctx.label,
          value: _ctx.value,
          disabled: Array.isArray(_ctx.disabled) ? _ctx.disabled[1] : _ctx.disabled,
          width: Array.isArray(_ctx.width) ? _ctx.width[1] : _ctx.width,
          height: _ctx.height,
          num: _ctx.num,
          placeholder: Array.isArray(_ctx.placeholder) ? _ctx.placeholder[1] : _ctx.placeholder,
          onChange: onSecondChange
        }, null, 8, ["style", "options", "selectedValue", "label", "value", "disabled", "width", "height", "num", "placeholder"]),
        createVNode(unref(Select), {
          style: normalizeStyle(`z-index: ${_ctx.zIndex};`),
          options: thirdOptions.value,
          selectedValue: values.value[2],
          "onUpdate:selectedValue": _cache[2] || (_cache[2] = ($event) => values.value[2] = $event),
          label: _ctx.label,
          value: _ctx.value,
          disabled: Array.isArray(_ctx.disabled) ? _ctx.disabled[2] : _ctx.disabled,
          width: Array.isArray(_ctx.width) ? _ctx.width[2] : _ctx.width,
          height: _ctx.height,
          num: _ctx.num,
          placeholder: Array.isArray(_ctx.placeholder) ? _ctx.placeholder[2] : _ctx.placeholder,
          onChange: onThirdChange
        }, null, 8, ["style", "options", "selectedValue", "label", "value", "disabled", "width", "height", "num", "placeholder"])
      ], 4);
    };
  }
});
const Cascader_vue_vue_type_style_index_0_scoped_d9ac3b16_lang = "";
const Cascader = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-d9ac3b16"]]);
Cascader.install = (app) => {
  app.component(Cascader.__name, Cascader);
};
const _hoisted_1$r = { class: "m-checkbox" };
const _hoisted_2$o = ["onClick"];
const _hoisted_3$m = { class: "u-label" };
const _hoisted_4$j = {
  key: 1,
  class: "m-checkbox-wrap"
};
const _hoisted_5$g = { class: "u-label" };
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
      return openBlock(), createElementBlock("div", _hoisted_1$r, [
        sum.value ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(_ctx.options, (option, index) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["m-checkbox-wrap", { "vertical": _ctx.vertical }]),
            style: normalizeStyle(sum.value !== index + 1 ? styleObject.value : ""),
            key: index
          }, [
            createElementVNode("div", {
              class: normalizeClass(["m-box", { "disabled": _ctx.disabled || option.disabled }]),
              onClick: ($event) => _ctx.disabled || option.disabled ? () => false : onClick(option.value)
            }, [
              createElementVNode("span", {
                class: normalizeClass(["u-checkbox", { "u-checkbox-checked": checkedValue.value.includes(option.value) }])
              }, null, 2),
              createElementVNode("span", _hoisted_3$m, [
                renderSlot(_ctx.$slots, "default", {
                  label: option.label
                }, () => [
                  createTextVNode(toDisplayString(option.label), 1)
                ], true)
              ])
            ], 10, _hoisted_2$o)
          ], 6);
        }), 128)) : (openBlock(), createElementBlock("div", _hoisted_4$j, [
          createElementVNode("div", {
            class: normalizeClass(["m-box", { "disabled": _ctx.disabled }]),
            onClick: onCheckAll
          }, [
            createElementVNode("span", {
              class: normalizeClass(["u-checkbox", { "u-checkbox-checked": _ctx.checked && !_ctx.indeterminate, "indeterminate": _ctx.indeterminate }])
            }, null, 2),
            createElementVNode("span", _hoisted_5$g, [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode("Check all")
              ], true)
            ])
          ], 2)
        ]))
      ]);
    };
  }
});
const Checkbox_vue_vue_type_style_index_0_scoped_4b9094e1_lang = "";
const Checkbox = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-4b9094e1"]]);
Checkbox.install = (app) => {
  app.component(Checkbox.__name, Checkbox);
};
const _withScopeId$f = (n) => (pushScopeId("data-v-b3677973"), n = n(), popScopeId(), n);
const _hoisted_1$q = { class: "m-collapse" };
const _hoisted_2$n = ["onClick"];
const _hoisted_3$l = {
  key: 0,
  focusable: "false",
  class: "u-arrow",
  "data-icon": "right",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
const _hoisted_4$i = /* @__PURE__ */ _withScopeId$f(() => /* @__PURE__ */ createElementVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" }, null, -1));
const _hoisted_5$f = [
  _hoisted_4$i
];
const _hoisted_6$e = { class: "u-lang" };
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
    watchEffect(() => {
      const len = props.collapseData.length;
      if (len) {
        getCollapseHeight(len);
      }
    }, { flush: "post" });
    const text = ref();
    const collapseHeight = ref([]);
    function getCollapseHeight(len) {
      for (let n = 0; n < len; n++) {
        collapseHeight.value.push(text.value[n].offsetHeight);
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
      navigator.clipboard.writeText(text.value[index].innerText || "").then(() => {
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
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.collapseData, (data, index) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["m-collapse-item", { "u-collapse-item-active": activeJudge(data.key || index) }]),
            key: index
          }, [
            createElementVNode("div", {
              class: "u-collapse-header",
              onClick: ($event) => onClick(data.key || index)
            }, [
              _ctx.showArrow ? (openBlock(), createElementBlock("svg", _hoisted_3$l, _hoisted_5$f)) : createCommentVNode("", true),
              createElementVNode("div", {
                class: normalizeClass(["u-header", { ml24: _ctx.showArrow }]),
                style: normalizeStyle(`font-size: ${_ctx.fontSize || _ctx.headerFontSize}px;`)
              }, [
                renderSlot(_ctx.$slots, "header", {
                  header: data.header,
                  index
                }, () => [
                  createTextVNode(toDisplayString(data.header || "--"), 1)
                ], true)
              ], 6)
            ], 8, _hoisted_2$n),
            createElementVNode("div", {
              class: normalizeClass(["u-collapse-content", { "u-collapse-copyable": _ctx.copyable }]),
              style: normalizeStyle(`height: ${activeJudge(data.key || index) ? collapseHeight.value[index] : 0}px;`)
            }, [
              createElementVNode("div", _hoisted_6$e, [
                renderSlot(_ctx.$slots, "lang", {
                  lang: _ctx.lang,
                  key: data.key || index
                }, () => [
                  createTextVNode(toDisplayString(_ctx.lang), 1)
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
              createElementVNode("div", {
                ref_for: true,
                ref_key: "text",
                ref: text,
                class: "u-text",
                style: normalizeStyle(`font-size: ${_ctx.fontSize || _ctx.textFontSize}px;`)
              }, [
                renderSlot(_ctx.$slots, "text", {
                  text: data.text,
                  key: data.key || index
                }, () => [
                  createTextVNode(toDisplayString(data.text), 1)
                ], true)
              ], 4)
            ], 6)
          ], 2);
        }), 128))
      ]);
    };
  }
});
const Collapse_vue_vue_type_style_index_0_scoped_b3677973_lang = "";
const Collapse = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-b3677973"]]);
Collapse.install = (app) => {
  app.component(Collapse.__name, Collapse);
};
const _hoisted_1$p = { class: "m-countdown" };
const _hoisted_2$m = { class: "u-title" };
const _hoisted_3$k = { class: "u-time" };
const _hoisted_4$h = { key: 2 };
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
        createElementVNode("div", _hoisted_2$m, [
          renderSlot(_ctx.$slots, "title", {}, () => [
            createTextVNode(toDisplayString(props.title), 1)
          ], true)
        ]),
        createElementVNode("div", _hoisted_3$k, [
          restTime.value > 0 ? renderSlot(_ctx.$slots, "prefix", { key: 0 }, () => [
            createTextVNode(toDisplayString(_ctx.prefix), 1)
          ], true) : createCommentVNode("", true),
          _ctx.finishedText && restTime.value === 0 ? renderSlot(_ctx.$slots, "finish", { key: 1 }, () => [
            createTextVNode(toDisplayString(_ctx.finishedText), 1)
          ], true) : (openBlock(), createElementBlock("span", _hoisted_4$h, toDisplayString(timeFormat(restTime.value)), 1)),
          restTime.value > 0 ? renderSlot(_ctx.$slots, "suffix", { key: 3 }, () => [
            createTextVNode(toDisplayString(_ctx.suffix), 1)
          ], true) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});
const Countdown_vue_vue_type_style_index_0_scoped_33c4dd4f_lang = "";
const Countdown = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-33c4dd4f"]]);
Countdown.install = (app) => {
  app.component(Countdown.__name, Countdown);
};
const main = "";
const __default__ = {
  inheritAttrs: false
};
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  ...__default__,
  __name: "DatePicker",
  props: {
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
        style: normalizeStyle(`width: ${_ctx.width}px;`)
      }, [
        createVNode(unref(VueDatePicker), mergeProps({
          modelValue: date.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => date.value = $event),
          locale: "zh-CN",
          "month-change-on-scroll": false,
          "enable-time-picker": _ctx.showTime,
          "time-picker": time.value,
          "week-picker": week.value,
          "month-picker": month.value,
          "year-picker": year.value,
          "show-now-button": _ctx.showToday,
          "auto-apply": "",
          "text-input": "",
          "model-type": modelType.value,
          "day-names": ["一", "二", "三", "四", "五", "六", "七"],
          "now-button-label": "今天"
        }, _ctx.$attrs), null, 16, ["modelValue", "enable-time-picker", "time-picker", "week-picker", "month-picker", "year-picker", "show-now-button", "model-type"])
      ], 4);
    };
  }
});
const DatePicker_vue_vue_type_style_index_0_scoped_37c4f4dc_lang = "";
const DatePicker = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-37c4f4dc"]]);
DatePicker.install = (app) => {
  app.component(DatePicker.__name, DatePicker);
};
const _withScopeId$e = (n) => (pushScopeId("data-v-10ddbaec"), n = n(), popScopeId(), n);
const _hoisted_1$o = ["onClick"];
const _hoisted_2$l = { class: "m-spin-dot" };
const _hoisted_3$j = /* @__PURE__ */ _withScopeId$e(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_4$g = /* @__PURE__ */ _withScopeId$e(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_5$e = /* @__PURE__ */ _withScopeId$e(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_6$d = /* @__PURE__ */ _withScopeId$e(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_7$c = [
  _hoisted_3$j,
  _hoisted_4$g,
  _hoisted_5$e,
  _hoisted_6$d
];
const _hoisted_8$c = /* @__PURE__ */ _withScopeId$e(() => /* @__PURE__ */ createElementVNode("path", { d: "M290 236.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0 0 13.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 0 0 0 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 0 0-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z" }, null, -1));
const _hoisted_9$c = [
  _hoisted_8$c
];
const _hoisted_10$8 = /* @__PURE__ */ _withScopeId$e(() => /* @__PURE__ */ createElementVNode("path", { d: "M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 0 0 0 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 0 0 391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 0 0-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z" }, null, -1));
const _hoisted_11$7 = [
  _hoisted_10$8
];
const _hoisted_12$6 = /* @__PURE__ */ _withScopeId$e(() => /* @__PURE__ */ createElementVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1));
const _hoisted_13$6 = [
  _hoisted_12$6
];
const _hoisted_14$6 = { class: "m-dialog-header" };
const _hoisted_15$6 = { class: "u-head" };
const _hoisted_16$6 = { class: "m-dialog-footer" };
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "Dialog",
  props: {
    title: { default: "提示" },
    content: { default: "" },
    width: { default: 640 },
    height: { default: "auto" },
    switchFullscreen: { type: Boolean, default: false },
    cancelText: { default: "取消" },
    okText: { default: "确定" },
    footer: { type: Boolean, default: false },
    center: { type: Boolean, default: true },
    top: { default: 100 },
    loading: { type: Boolean, default: false },
    visible: { type: Boolean, default: false }
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
        return typeof props.height === "number" ? props.height + "px" : props.height;
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
              class: normalizeClass(["m-dialog", _ctx.center ? "relative-hv-center" : "top-center"]),
              style: normalizeStyle(`width: ${dialogWidth.value}; height: ${dialogHeight.value}; top: ${!fullScreen.value ? !_ctx.center ? _ctx.top + "px" : "50%" : 0}`)
            }, [
              createElementVNode("div", {
                class: normalizeClass(["m-dialog-content", { loading: _ctx.loading }])
              }, [
                withDirectives(createElementVNode("div", _hoisted_2$l, _hoisted_7$c, 512), [
                  [vShow, _ctx.loading]
                ]),
                withDirectives((openBlock(), createElementBlock("svg", {
                  onClick: onFullScreen,
                  class: "u-screen",
                  viewBox: "64 64 896 896",
                  "data-icon": "fullscreen",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_9$c, 512)), [
                  [vShow, !fullScreen.value && _ctx.switchFullscreen]
                ]),
                withDirectives((openBlock(), createElementBlock("svg", {
                  onClick: onFullScreen,
                  class: "u-screen",
                  viewBox: "64 64 896 896",
                  "data-icon": "fullscreen-exit",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_11$7, 512)), [
                  [vShow, fullScreen.value && _ctx.switchFullscreen]
                ]),
                (openBlock(), createElementBlock("svg", {
                  onClick: onClose,
                  class: "u-close",
                  viewBox: "64 64 896 896",
                  "data-icon": "close",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_13$6)),
                createElementVNode("div", _hoisted_14$6, [
                  createElementVNode("div", _hoisted_15$6, [
                    renderSlot(_ctx.$slots, "title", {}, () => [
                      createTextVNode(toDisplayString(_ctx.title), 1)
                    ], true)
                  ])
                ]),
                createElementVNode("div", {
                  class: "m-dialog-body",
                  style: normalizeStyle(`height: calc(${dialogHeight.value} - ${_ctx.footer ? "110px" : "57px"});`)
                }, [
                  renderSlot(_ctx.$slots, "default", {}, () => [
                    createTextVNode(toDisplayString(_ctx.content), 1)
                  ], true)
                ], 4),
                withDirectives(createElementVNode("div", _hoisted_16$6, [
                  createElementVNode("button", {
                    class: "u-cancel",
                    onClick: onCancel
                  }, toDisplayString(_ctx.cancelText), 1),
                  createElementVNode("button", {
                    class: "u-confirm",
                    onClick: onConfirm
                  }, toDisplayString(_ctx.okText), 1)
                ], 512), [
                  [vShow, _ctx.footer]
                ])
              ], 2)
            ], 6)
          ], 8, _hoisted_1$o), [
            [vShow, _ctx.visible]
          ])
        ]),
        _: 3
      });
    };
  }
});
const Dialog_vue_vue_type_style_index_0_scoped_10ddbaec_lang = "";
const Dialog = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-10ddbaec"]]);
Dialog.install = (app) => {
  app.component(Dialog.__name, Dialog);
};
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "Divider",
  props: {
    dashed: { type: Boolean, default: false },
    orientation: { default: "center" },
    orientationMargin: { default: "" },
    borderWidth: { default: 1 }
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
          `m-divider ${_ctx.orientation}`,
          {
            dashed: _ctx.dashed,
            margin24: !showText.value,
            marginLeft: _ctx.orientationMargin !== "" && _ctx.orientation === "left",
            marginRight: _ctx.orientationMargin !== "" && _ctx.orientation === "right"
          }
        ]),
        style: normalizeStyle(`--border-width: ${_ctx.borderWidth}px;`)
      }, [
        _ctx.orientation === "left" ? withDirectives((openBlock(), createElementBlock("span", {
          key: 0,
          class: "u-text",
          style: normalizeStyle(`margin-left: ${margin.value};`),
          ref_key: "text",
          ref: text
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 4)), [
          [vShow, showText.value]
        ]) : _ctx.orientation === "right" ? withDirectives((openBlock(), createElementBlock("span", {
          key: 1,
          class: "u-text",
          style: normalizeStyle(`margin-right: ${margin.value};`),
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
      ], 6);
    };
  }
});
const Divider_vue_vue_type_style_index_0_scoped_1939bda0_lang = "";
const Divider = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-1939bda0"]]);
Divider.install = (app) => {
  app.component(Divider.__name, Divider);
};
const _hoisted_1$n = { class: "m-empty" };
const _hoisted_2$k = /* @__PURE__ */ createStaticVNode('<g fill="none" fill-rule="evenodd" data-v-1940b331><g transform="translate(24 31.67)" data-v-1940b331><ellipse fill-opacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668" data-v-1940b331></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2" data-v-1940b331></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" fill="url(#linearGradient-1)" transform="translate(13.56)" data-v-1940b331></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7" data-v-1940b331></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="#DCE0E6" data-v-1940b331></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" fill="#DCE0E6" data-v-1940b331></path><g transform="translate(149.65 15.383)" fill="#FFF" data-v-1940b331><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" data-v-1940b331></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" data-v-1940b331></path></g></g>', 1);
const _hoisted_3$i = [
  _hoisted_2$k
];
const _hoisted_4$f = /* @__PURE__ */ createStaticVNode('<g transform="translate(0 1)" fill="none" fill-rule="evenodd" data-v-1940b331><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7" data-v-1940b331></ellipse><g fill-rule="nonzero" stroke="#d9d9d9" data-v-1940b331><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" data-v-1940b331></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa" data-v-1940b331></path></g></g>', 1);
const _hoisted_5$d = [
  _hoisted_4$f
];
const _hoisted_6$c = ["src"];
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
        _ctx.image === "1" ? (openBlock(), createElementBlock("svg", {
          key: 0,
          class: "u-empty-1",
          style: normalizeStyle(_ctx.imageStyle),
          viewBox: "0 0 184 152",
          xmlns: "http://www.w3.org/2000/svg"
        }, _hoisted_3$i, 4)) : _ctx.image === "2" ? (openBlock(), createElementBlock("svg", {
          key: 1,
          class: "u-empty-2",
          style: normalizeStyle(_ctx.imageStyle),
          viewBox: "0 0 64 41",
          xmlns: "http://www.w3.org/2000/svg"
        }, _hoisted_5$d, 4)) : renderSlot(_ctx.$slots, "default", { key: 2 }, () => [
          createElementVNode("img", {
            class: "u-empty",
            src: _ctx.image,
            style: normalizeStyle(_ctx.imageStyle),
            alt: "image"
          }, null, 12, _hoisted_6$c)
        ], true),
        _ctx.description ? (openBlock(), createElementBlock("p", {
          key: 3,
          class: normalizeClass(["u-description", { gray: _ctx.image === "2" }])
        }, [
          renderSlot(_ctx.$slots, "description", {}, () => [
            createTextVNode(toDisplayString(_ctx.description), 1)
          ], true)
        ], 2)) : createCommentVNode("", true)
      ]);
    };
  }
});
const Empty_vue_vue_type_style_index_0_scoped_1940b331_lang = "";
const Empty = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-1940b331"]]);
Empty.install = (app) => {
  app.component(Empty.__name, Empty);
};
const _withScopeId$d = (n) => (pushScopeId("data-v-4d80fda6"), n = n(), popScopeId(), n);
const _hoisted_1$m = { class: "m-image-wrap" };
const _hoisted_2$j = { class: "u-spin-circle" };
const _hoisted_3$h = ["src", "alt"];
const _hoisted_4$e = { class: "m-image-mask-info" };
const _hoisted_5$c = /* @__PURE__ */ _withScopeId$d(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-eye",
  focusable: "false",
  "data-icon": "eye",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" })
], -1));
const _hoisted_6$b = { class: "m-preview-mask" };
const _hoisted_7$b = ["onClick", "onWheel"];
const _hoisted_8$b = { class: "m-preview-body" };
const _hoisted_9$b = { class: "m-preview-operations" };
const _hoisted_10$7 = { class: "u-name" };
const _hoisted_11$6 = /* @__PURE__ */ _withScopeId$d(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "close",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })
], -1));
const _hoisted_12$5 = [
  _hoisted_11$6
];
const _hoisted_13$5 = /* @__PURE__ */ _withScopeId$d(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "zoom-in",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" })
], -1));
const _hoisted_14$5 = [
  _hoisted_13$5
];
const _hoisted_15$5 = /* @__PURE__ */ _withScopeId$d(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "zoom-out",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" })
], -1));
const _hoisted_16$5 = [
  _hoisted_15$5
];
const _hoisted_17$3 = /* @__PURE__ */ _withScopeId$d(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "rotate-right",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-.4-12.6 6.1l-.2 64c-118.6.5-235.8 53.4-314.6 154.2A399.75 399.75 0 00123.5 631h74.9c-.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8z" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H396V494h440v326z" })
], -1));
const _hoisted_18$3 = [
  _hoisted_17$3
];
const _hoisted_19$3 = /* @__PURE__ */ _withScopeId$d(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "rotate-left",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H188V494h440v326z" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7.4 12.6-6.1v-63.9c12.9.1 25.9.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8a325.95 325.95 0 016.5 140.9h74.9c14.8-103.6-11.3-213-81-302.3z" })
], -1));
const _hoisted_20$2 = [
  _hoisted_19$3
];
const _hoisted_21$2 = ["onMousedown"];
const _hoisted_22$2 = { class: "u-spin-circle" };
const _hoisted_23$2 = ["src", "alt"];
const _hoisted_24$1 = /* @__PURE__ */ _withScopeId$d(() => /* @__PURE__ */ createElementVNode("svg", {
  focusable: "false",
  class: "u-switch",
  "data-icon": "left",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })
], -1));
const _hoisted_25$1 = [
  _hoisted_24$1
];
const _hoisted_26$1 = /* @__PURE__ */ _withScopeId$d(() => /* @__PURE__ */ createElementVNode("svg", {
  focusable: "false",
  class: "u-switch",
  "data-icon": "right",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" })
], -1));
const _hoisted_27$1 = [
  _hoisted_26$1
];
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "Image",
  props: {
    name: { default: "" },
    width: { default: 300 },
    height: { default: "100%" },
    fit: { default: "contain" },
    src: { default: "" },
    preview: { default: "预览" },
    zoomRatio: { default: 0.1 },
    minZoomScale: { default: 0.1 },
    maxZoomScale: { default: 10 },
    resetOnDbclick: { type: Boolean, default: true },
    loop: { type: Boolean, default: false }
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
          name: props.name
        }];
      }
    });
    const imageCount = computed(() => {
      return images.value.length;
    });
    onMounted(() => {
      document.addEventListener("keydown", keyboardSwitch);
    });
    onUnmounted(() => {
      document.removeEventListener("keydown", keyboardSwitch);
    });
    const complete = ref(false);
    const loaded = ref(false);
    const previewIndex = ref(0);
    const showPreview = ref(false);
    const rotate = ref(0);
    const scale = ref(1);
    const sourceX = ref(0);
    const sourceY = ref(0);
    const dragX = ref(0);
    const dragY = ref(0);
    const image = ref();
    function keyboardSwitch(e) {
      e.preventDefault();
      if (showPreview.value && imageCount.value > 1) {
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          onSwitchLeft();
        }
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          onSwitchRight();
        }
      }
    }
    function onComplete() {
      complete.value = true;
    }
    function onLoaded() {
      loaded.value = true;
    }
    function getImageName(image2) {
      if (image2.name) {
        return image2.name;
      } else {
        const res = image2.src.split("?")[0].split("/");
        return res[res.length - 1];
      }
    }
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
    function add2(num1, num2) {
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
        scale.value = add2(scale.value, props.zoomRatio);
      }
    }
    function onZoomout() {
      if (scale.value - props.zoomRatio < props.minZoomScale) {
        scale.value = props.minZoomScale;
      } else {
        scale.value = add2(scale.value, -props.zoomRatio);
      }
    }
    function onWheel(e) {
      const scrollZoom = e.deltaY * props.zoomRatio;
      if (scale.value === props.minZoomScale && scrollZoom > 0) {
        return;
      }
      if (scale.value === props.maxZoomScale && scrollZoom < 0) {
        return;
      }
      if (scale.value - scrollZoom < props.minZoomScale) {
        scale.value = props.minZoomScale;
      } else if (scale.value - scrollZoom > props.maxZoomScale) {
        scale.value = props.maxZoomScale;
      } else {
        scale.value = add2(scale.value, -scrollZoom);
      }
    }
    function onResetZoom() {
      scale.value = 1;
      rotate.value = 0;
      dragX.value = 0;
      dragY.value = 0;
    }
    function onAnticlockwiseRotate() {
      rotate.value -= 90;
    }
    function onClockwiseRotate() {
      rotate.value += 90;
    }
    function onMouseDown(event) {
      const imageRect = image.value[0].getBoundingClientRect();
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
        if (dragX.value > sourceDragX + viewportWidth - right) {
          dragX.value = sourceDragX + viewportWidth - right;
        }
        if (dragX.value < sourceDragX - left) {
          dragX.value = sourceDragX - left;
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
      if (props.loop) {
        previewIndex.value = (previewIndex.value - 1 + imageCount.value) % imageCount.value;
      } else {
        if (previewIndex.value > 0) {
          previewIndex.value--;
        }
      }
      loaded.value = false;
    }
    function onSwitchRight() {
      if (props.loop) {
        previewIndex.value = (previewIndex.value + 1) % imageCount.value;
      } else {
        if (previewIndex.value < imageCount.value - 1) {
          previewIndex.value++;
        }
      }
      loaded.value = false;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$m, [
        createElementVNode("div", {
          class: normalizeClass(["m-image", { "image-hover-mask": complete.value }]),
          style: normalizeStyle(`width: ${imageWidth.value}; height: ${imageHeight.value};`)
        }, [
          withDirectives(createElementVNode("div", _hoisted_2$j, null, 512), [
            [vShow, !complete.value]
          ]),
          createElementVNode("img", {
            class: "u-image",
            style: normalizeStyle(`object-fit: ${_ctx.fit};`),
            onLoad: onComplete,
            src: images.value[0].src,
            alt: images.value[0].name
          }, null, 44, _hoisted_3$h),
          createElementVNode("div", {
            class: "m-image-mask",
            onClick: onPreview
          }, [
            createElementVNode("div", _hoisted_4$e, [
              _hoisted_5$c,
              renderSlot(_ctx.$slots, "preview", {}, () => [
                createTextVNode(toDisplayString(_ctx.preview), 1)
              ], true)
            ])
          ])
        ], 6),
        createVNode(Transition, { name: "mask" }, {
          default: withCtx(() => [
            withDirectives(createElementVNode("div", _hoisted_6$b, null, 512), [
              [vShow, showPreview.value]
            ])
          ]),
          _: 1
        }),
        createVNode(Transition, { name: "preview" }, {
          default: withCtx(() => [
            withDirectives(createElementVNode("div", {
              class: "m-preview-wrap",
              onClick: withModifiers(onClose, ["self"]),
              onWheel: withModifiers(onWheel, ["prevent"])
            }, [
              createElementVNode("div", _hoisted_8$b, [
                createElementVNode("div", _hoisted_9$b, [
                  createElementVNode("p", _hoisted_10$7, toDisplayString(getImageName(images.value[previewIndex.value])), 1),
                  createElementVNode("div", {
                    class: "u-preview-operation",
                    onClick: onClose
                  }, _hoisted_12$5),
                  createElementVNode("div", {
                    class: normalizeClass(["u-preview-operation", { "u-operation-disabled": scale.value === _ctx.maxZoomScale }]),
                    onClick: onZoomin
                  }, _hoisted_14$5, 2),
                  createElementVNode("div", {
                    class: normalizeClass(["u-preview-operation", { "u-operation-disabled": scale.value === _ctx.minZoomScale }]),
                    onClick: onZoomout
                  }, _hoisted_16$5, 2),
                  createElementVNode("div", {
                    class: "u-preview-operation",
                    onClick: onClockwiseRotate
                  }, _hoisted_18$3),
                  createElementVNode("div", {
                    class: "u-preview-operation",
                    onClick: onAnticlockwiseRotate
                  }, _hoisted_20$2)
                ]),
                createElementVNode("div", {
                  class: "m-preview-image",
                  style: normalizeStyle(`transform: translate3d(${dragX.value}px, ${dragY.value}px, 0px);`),
                  onMousedown: withModifiers(onMouseDown, ["prevent"])
                }, [
                  withDirectives(createElementVNode("div", _hoisted_22$2, null, 512), [
                    [vShow, !loaded.value]
                  ]),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(images.value, (image2, index) => {
                    return withDirectives((openBlock(), createElementBlock("img", {
                      key: index,
                      ref_for: true,
                      ref_key: "image",
                      ref: image2,
                      class: "u-preview-image",
                      style: normalizeStyle(`transform: scale3d(${scale.value}, ${scale.value}, 1) rotate(${rotate.value}deg);`),
                      src: image2.src,
                      alt: image2.name,
                      onLoad: onLoaded,
                      onDblclick: _cache[0] || (_cache[0] = ($event) => _ctx.resetOnDbclick ? onResetZoom() : () => false)
                    }, null, 44, _hoisted_23$2)), [
                      [vShow, previewIndex.value === index]
                    ]);
                  }), 128))
                ], 44, _hoisted_21$2),
                imageCount.value > 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  createElementVNode("div", {
                    class: normalizeClass(["m-switch-left", { "u-switch-disabled": previewIndex.value === 0 && !_ctx.loop }]),
                    onClick: onSwitchLeft
                  }, _hoisted_25$1, 2),
                  createElementVNode("div", {
                    class: normalizeClass(["m-switch-right", { "u-switch-disabled": previewIndex.value === imageCount.value - 1 && !_ctx.loop }]),
                    onClick: onSwitchRight
                  }, _hoisted_27$1, 2)
                ], 64)) : createCommentVNode("", true)
              ])
            ], 40, _hoisted_7$b), [
              [vShow, showPreview.value]
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
const Image_vue_vue_type_style_index_0_scoped_4d80fda6_lang = "";
const Image$1 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-4d80fda6"]]);
Image$1.install = (app) => {
  app.component(Image$1.__name, Image$1);
};
const _withScopeId$c = (n) => (pushScopeId("data-v-4b6768e2"), n = n(), popScopeId(), n);
const _hoisted_1$l = {
  class: "m-input-number",
  tabindex: "1"
};
const _hoisted_2$i = { class: "u-input-prefix" };
const _hoisted_3$g = { class: "m-input-wrap" };
const _hoisted_4$d = ["onKeyup"];
const _hoisted_5$b = { class: "m-handler-wrap" };
const _hoisted_6$a = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ createElementVNode("svg", {
  focusable: "false",
  class: "u-icon",
  "data-icon": "up",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z" })
], -1));
const _hoisted_7$a = [
  _hoisted_6$a
];
const _hoisted_8$a = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ createElementVNode("svg", {
  focusable: "false",
  class: "u-icon",
  "data-icon": "down",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" })
], -1));
const _hoisted_9$a = [
  _hoisted_8$a
];
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "InputNumber",
  props: {
    min: { default: -Infinity },
    max: { default: Infinity },
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
    function add2(num1, num2) {
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
        const res = add2(numValue.value || 0, +props.step);
        emitValue(Math.min(props.max, res));
        numValue.value = Math.min(props.max, res);
      }
    }
    function onDown() {
      if (numValue.value !== props.min) {
        const res = add2(numValue.value || 0, -props.step);
        emitValue(Math.max(props.min, res));
        numValue.value = Math.max(props.min, res);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$l, [
        createElementVNode("span", _hoisted_2$i, [
          renderSlot(_ctx.$slots, "prefix", {}, () => [
            createTextVNode(toDisplayString(_ctx.prefix), 1)
          ], true)
        ]),
        createElementVNode("div", _hoisted_3$g, [
          _ctx.keyboard ? withDirectives((openBlock(), createElementBlock("input", {
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
          }, null, 40, _hoisted_4$d)), [
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
        createElementVNode("div", _hoisted_5$b, [
          createElementVNode("span", {
            class: normalizeClass(["u-up-arrow", { disabled: _ctx.min === numValue.value || _ctx.max === numValue.value }]),
            onClick: onUp
          }, _hoisted_7$a, 2),
          createElementVNode("span", {
            class: normalizeClass(["u-down-arrow", { disabled: _ctx.min === numValue.value || _ctx.max === numValue.value }]),
            onClick: onDown
          }, _hoisted_9$a, 2)
        ])
      ]);
    };
  }
});
const InputNumber_vue_vue_type_style_index_0_scoped_4b6768e2_lang = "";
const InputNumber = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-4b6768e2"]]);
InputNumber.install = (app) => {
  app.component(InputNumber.__name, InputNumber);
};
const _withScopeId$b = (n) => (pushScopeId("data-v-8990c5a8"), n = n(), popScopeId(), n);
const _hoisted_1$k = ["onMouseenter", "onMouseleave"];
const _hoisted_2$h = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1));
const _hoisted_3$f = [
  _hoisted_2$h
];
const _hoisted_4$c = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1));
const _hoisted_5$a = [
  _hoisted_4$c
];
const _hoisted_6$9 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1));
const _hoisted_7$9 = [
  _hoisted_6$9
];
const _hoisted_8$9 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1));
const _hoisted_9$9 = [
  _hoisted_8$9
];
const _hoisted_10$6 = { class: "content" };
var ColorStyle$1 = /* @__PURE__ */ ((ColorStyle2) => {
  ColorStyle2["info"] = "#1677FF";
  ColorStyle2["success"] = "#52c41a";
  ColorStyle2["error"] = "#ff4d4f";
  ColorStyle2["warn"] = "#faad14";
  return ColorStyle2;
})(ColorStyle$1 || {});
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "Message",
  props: {
    duration: { default: 3e3 },
    top: { default: 30 }
  },
  emits: ["close"],
  setup(__props, { expose: __expose, emit }) {
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
    __expose({
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
        style: normalizeStyle(`top: ${_ctx.top}px;`)
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
                  }, _hoisted_3$f, 4)) : createCommentVNode("", true),
                  message.mode === "success" ? (openBlock(), createElementBlock("svg", {
                    key: 1,
                    class: "svg",
                    style: normalizeStyle({ fill: ColorStyle$1[message.mode] }),
                    viewBox: "64 64 896 896",
                    "data-icon": "check-circle",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, _hoisted_5$a, 4)) : createCommentVNode("", true),
                  message.mode === "error" ? (openBlock(), createElementBlock("svg", {
                    key: 2,
                    class: "svg",
                    style: normalizeStyle({ fill: ColorStyle$1[message.mode] }),
                    viewBox: "64 64 896 896",
                    "data-icon": "close-circle",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, _hoisted_7$9, 4)) : createCommentVNode("", true),
                  message.mode === "warn" ? (openBlock(), createElementBlock("svg", {
                    key: 3,
                    class: "svg",
                    style: normalizeStyle({ fill: ColorStyle$1[message.mode] }),
                    viewBox: "64 64 896 896",
                    "data-icon": "exclamation-circle",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, _hoisted_9$9, 4)) : createCommentVNode("", true),
                  createElementVNode("p", _hoisted_10$6, toDisplayString(message.content), 1)
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
const Message_vue_vue_type_style_index_0_scoped_8990c5a8_lang = "";
const Message = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-8990c5a8"]]);
Message.install = (app) => {
  app.component(Message.__name, Message);
};
const _withScopeId$a = (n) => (pushScopeId("data-v-f1cab80c"), n = n(), popScopeId(), n);
const _hoisted_1$j = ["onClick"];
const _hoisted_2$g = { class: "m-spin-dot" };
const _hoisted_3$e = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_4$b = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_5$9 = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_6$8 = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_7$8 = [
  _hoisted_3$e,
  _hoisted_4$b,
  _hoisted_5$9,
  _hoisted_6$8
];
const _hoisted_8$8 = { class: "m-body" };
const _hoisted_9$8 = { class: "m-title" };
const _hoisted_10$5 = {
  key: 0,
  focusable: "false",
  class: "u-icon confirm",
  "data-icon": "exclamation-circle",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
const _hoisted_11$5 = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
const _hoisted_12$4 = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ createElementVNode("path", { d: "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1));
const _hoisted_13$4 = [
  _hoisted_11$5,
  _hoisted_12$4
];
const _hoisted_14$4 = {
  key: 1,
  focusable: "false",
  class: "u-icon info",
  "data-icon": "info-circle",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
const _hoisted_15$4 = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1));
const _hoisted_16$4 = [
  _hoisted_15$4
];
const _hoisted_17$2 = {
  key: 2,
  focusable: "false",
  class: "u-icon success",
  "data-icon": "check-circle",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
const _hoisted_18$2 = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1));
const _hoisted_19$2 = [
  _hoisted_18$2
];
const _hoisted_20$1 = {
  key: 3,
  focusable: "false",
  class: "u-icon error",
  "data-icon": "close-circle",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
const _hoisted_21$1 = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1));
const _hoisted_22$1 = [
  _hoisted_21$1
];
const _hoisted_23$1 = {
  key: 4,
  focusable: "false",
  class: "u-icon warn",
  "data-icon": "exclamation-circle",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
const _hoisted_24 = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1));
const _hoisted_25 = [
  _hoisted_24
];
const _hoisted_26 = { class: "u-title" };
const _hoisted_27 = { class: "u-content" };
const _hoisted_28 = { class: "m-btns" };
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "Modal",
  props: {
    width: { default: 420 },
    cancelText: { default: "取消" },
    okText: { default: "确定" },
    noticeText: { default: "知道了" },
    center: { type: Boolean, default: true },
    top: { default: 100 },
    loading: { type: Boolean, default: false },
    visible: { type: Boolean, default: false }
  },
  emits: ["cancel", "ok", "know"],
  setup(__props, { expose: __expose, emit: emits }) {
    const mode = ref("");
    const desc = ref();
    function info(data) {
      mode.value = "info";
      desc.value = data;
    }
    function success(data) {
      mode.value = "success";
      desc.value = data;
    }
    function error(data) {
      mode.value = "error";
      desc.value = data;
    }
    function warn(data) {
      mode.value = "warn";
      desc.value = data;
    }
    function confirm(data) {
      mode.value = "confirm";
      desc.value = data;
    }
    function erase(data) {
      mode.value = "erase";
      desc.value = data;
    }
    __expose({
      info,
      success,
      error,
      warn,
      confirm,
      erase
    });
    function onBlur() {
      emits("cancel");
    }
    function onCancel() {
      emits("cancel");
    }
    function onConfirm() {
      emits("ok");
    }
    function onKnow() {
      emits("know");
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, null, {
        default: withCtx(() => {
          var _a, _b;
          return [
            withDirectives(createElementVNode("div", {
              class: "m-modal-mask",
              onClick: withModifiers(onBlur, ["self"])
            }, [
              createElementVNode("div", {
                class: normalizeClass(["m-modal", _ctx.center ? "relative-hv-center" : "top-center"]),
                style: normalizeStyle(`width: ${_ctx.width}px; top: ${!_ctx.center ? _ctx.top + "px" : "50%"};`)
              }, [
                createElementVNode("div", {
                  class: normalizeClass(["m-modal-body", { "loading": _ctx.loading }])
                }, [
                  withDirectives(createElementVNode("div", _hoisted_2$g, _hoisted_7$8, 512), [
                    [vShow, _ctx.loading]
                  ]),
                  createElementVNode("div", _hoisted_8$8, [
                    createElementVNode("div", _hoisted_9$8, [
                      mode.value === "confirm" || mode.value === "erase" ? (openBlock(), createElementBlock("svg", _hoisted_10$5, _hoisted_13$4)) : createCommentVNode("", true),
                      mode.value === "info" ? (openBlock(), createElementBlock("svg", _hoisted_14$4, _hoisted_16$4)) : createCommentVNode("", true),
                      mode.value === "success" ? (openBlock(), createElementBlock("svg", _hoisted_17$2, _hoisted_19$2)) : createCommentVNode("", true),
                      mode.value === "error" ? (openBlock(), createElementBlock("svg", _hoisted_20$1, _hoisted_22$1)) : createCommentVNode("", true),
                      mode.value === "warn" ? (openBlock(), createElementBlock("svg", _hoisted_23$1, _hoisted_25)) : createCommentVNode("", true),
                      createElementVNode("div", _hoisted_26, toDisplayString((_a = desc.value) == null ? void 0 : _a.title), 1)
                    ]),
                    createElementVNode("div", _hoisted_27, toDisplayString((_b = desc.value) == null ? void 0 : _b.content), 1)
                  ]),
                  createElementVNode("div", _hoisted_28, [
                    mode.value === "confirm" || mode.value === "erase" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                      createElementVNode("button", {
                        class: "u-cancel",
                        onClick: onCancel
                      }, toDisplayString(_ctx.cancelText), 1),
                      mode.value === "confirm" ? (openBlock(), createElementBlock("button", {
                        key: 0,
                        class: "u-confirm primary",
                        onClick: onConfirm
                      }, toDisplayString(_ctx.okText), 1)) : createCommentVNode("", true),
                      mode.value === "erase" ? (openBlock(), createElementBlock("button", {
                        key: 1,
                        class: "u-confirm delete",
                        onClick: onConfirm
                      }, toDisplayString(_ctx.okText), 1)) : createCommentVNode("", true)
                    ], 64)) : createCommentVNode("", true),
                    ["info", "success", "error", "warn"].includes(mode.value) ? (openBlock(), createElementBlock("button", {
                      key: 1,
                      class: "u-confirm primary",
                      onClick: onKnow
                    }, toDisplayString(_ctx.noticeText), 1)) : createCommentVNode("", true)
                  ])
                ], 2)
              ], 6)
            ], 8, _hoisted_1$j), [
              [vShow, _ctx.visible]
            ])
          ];
        }),
        _: 1
      });
    };
  }
});
const Modal_vue_vue_type_style_index_0_scoped_f1cab80c_lang = "";
const Modal = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-f1cab80c"]]);
Modal.install = (app) => {
  app.component(Modal.__name, Modal);
};
const _withScopeId$9 = (n) => (pushScopeId("data-v-92898a99"), n = n(), popScopeId(), n);
const _hoisted_1$i = ["onMouseenter", "onMouseleave"];
const _hoisted_2$f = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
const _hoisted_3$d = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createElementVNode("path", { d: "M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" }, null, -1));
const _hoisted_4$a = [
  _hoisted_2$f,
  _hoisted_3$d
];
const _hoisted_5$8 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createElementVNode("path", { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1));
const _hoisted_6$7 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
const _hoisted_7$7 = [
  _hoisted_5$8,
  _hoisted_6$7
];
const _hoisted_8$7 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
const _hoisted_9$7 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createElementVNode("path", { d: "M464 688a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1));
const _hoisted_10$4 = [
  _hoisted_8$7,
  _hoisted_9$7
];
const _hoisted_11$4 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createElementVNode("path", { d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" }, null, -1));
const _hoisted_12$3 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
const _hoisted_13$3 = [
  _hoisted_11$4,
  _hoisted_12$3
];
const _hoisted_14$3 = ["onClick"];
const _hoisted_15$3 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createElementVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1));
const _hoisted_16$3 = [
  _hoisted_15$3
];
var ColorStyle = /* @__PURE__ */ ((ColorStyle2) => {
  ColorStyle2["info"] = "#1677FF";
  ColorStyle2["success"] = "#52c41a";
  ColorStyle2["error"] = "#ff4d4f";
  ColorStyle2["warn"] = "#faad14";
  return ColorStyle2;
})(ColorStyle || {});
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "Notification",
  props: {
    title: { default: "温馨提示" },
    duration: { default: 4500 },
    top: { default: 24 },
    bottom: { default: 24 },
    placement: { default: "topRight" }
  },
  emits: ["close"],
  setup(__props, { expose: __expose, emit }) {
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
    __expose({
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
        class: normalizeClass(["m-notification-wrap", _ctx.placement]),
        style: normalizeStyle(`top: ${["topRight", "topLeft"].includes(_ctx.placement) ? _ctx.top : "auto"}px; bottom: ${["bottomRight", "bottomLeft"].includes(_ctx.placement) ? _ctx.bottom : ""}px;`)
      }, [
        createVNode(TransitionGroup, {
          name: ["topRight", "bottomRight"].includes(_ctx.placement) ? "right" : "left"
        }, {
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
                  style: normalizeStyle(`fill: ${ColorStyle[data.mode]}`),
                  viewBox: "64 64 896 896",
                  "data-icon": "info-circle",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_4$a, 4)) : createCommentVNode("", true),
                data.mode === "success" ? (openBlock(), createElementBlock("svg", {
                  key: 1,
                  class: "u-status-svg",
                  style: normalizeStyle(`fill: ${ColorStyle[data.mode]}`),
                  viewBox: "64 64 896 896",
                  "data-icon": "check-circle",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_7$7, 4)) : createCommentVNode("", true),
                data.mode === "warn" ? (openBlock(), createElementBlock("svg", {
                  key: 2,
                  class: "u-status-svg",
                  style: normalizeStyle(`fill: ${ColorStyle[data.mode]}`),
                  viewBox: "64 64 896 896",
                  "data-icon": "exclamation-circle",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_10$4, 4)) : createCommentVNode("", true),
                data.mode === "error" ? (openBlock(), createElementBlock("svg", {
                  key: 3,
                  class: "u-status-svg",
                  style: normalizeStyle(`fill: ${ColorStyle[data.mode]}`),
                  viewBox: "64 64 896 896",
                  "data-icon": "close-circle",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_13$3, 4)) : createCommentVNode("", true),
                createElementVNode("div", {
                  class: normalizeClass(["u-title", { "mb4": data.mode !== "open", "ml36": data.mode !== "open" }])
                }, toDisplayString(_ctx.title || "--"), 3),
                createElementVNode("p", {
                  class: normalizeClass(["u-description", { "ml36": data.mode !== "open" }])
                }, toDisplayString(data.notification || "--"), 3),
                (openBlock(), createElementBlock("svg", {
                  class: "u-close",
                  onClick: ($event) => onClose(index),
                  viewBox: "64 64 896 896",
                  "data-icon": "close",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_16$3, 8, _hoisted_14$3))
              ], 40, _hoisted_1$i)), [
                [vShow, !hideIndex.value.includes(index)]
              ]);
            }), 128))
          ]),
          _: 1
        }, 8, ["name"])
      ], 6);
    };
  }
});
const Notification_vue_vue_type_style_index_0_scoped_92898a99_lang = "";
const Notification = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-92898a99"]]);
Notification.install = (app) => {
  app.component(Notification.__name, Notification);
};
const _withScopeId$8 = (n) => (pushScopeId("data-v-41c1c393"), n = n(), popScopeId(), n);
const _hoisted_1$h = { class: "m-pagination-wrap" };
const _hoisted_2$e = {
  key: 0,
  class: "mr8"
};
const _hoisted_3$c = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-arrow",
  viewBox: "64 64 896 896",
  "data-icon": "left",
  "aria-hidden": "true",
  focusable: "false"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })
], -1));
const _hoisted_4$9 = [
  _hoisted_3$c
];
const _hoisted_5$7 = { class: "u-ellipsis" };
const _hoisted_6$6 = {
  class: "u-icon",
  viewBox: "64 64 896 896",
  "data-icon": "double-left",
  "aria-hidden": "true",
  focusable: "false"
};
const _hoisted_7$6 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createElementVNode("path", { d: "M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" }, null, -1));
const _hoisted_8$6 = [
  _hoisted_7$6
];
const _hoisted_9$6 = ["onClick"];
const _hoisted_10$3 = { class: "u-ellipsis" };
const _hoisted_11$3 = {
  class: "u-icon",
  viewBox: "64 64 896 896",
  "data-icon": "double-right",
  "aria-hidden": "true",
  focusable: "false"
};
const _hoisted_12$2 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createElementVNode("path", { d: "M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" }, null, -1));
const _hoisted_13$2 = [
  _hoisted_12$2
];
const _hoisted_14$2 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-arrow",
  viewBox: "64 64 896 896",
  "data-icon": "right",
  "aria-hidden": "true",
  focusable: "false"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" })
], -1));
const _hoisted_15$2 = [
  _hoisted_14$2
];
const _hoisted_16$2 = {
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
    placement: { default: "center" }
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
        class: normalizeClass([`m-pagination ${_ctx.placement}`, { hidden: _ctx.hideOnSinglePage && _ctx.total <= _ctx.pageSize }])
      }, [
        createElementVNode("div", _hoisted_1$h, [
          _ctx.showTotal ? (openBlock(), createElementBlock("span", _hoisted_2$e, "共 " + toDisplayString(totalPage.value) + " 页 / " + toDisplayString(_ctx.total) + " 条", 1)) : createCommentVNode("", true),
          createElementVNode("span", {
            class: normalizeClass(["u-item", { disabled: currentPage.value === 1 }]),
            onClick: _cache[0] || (_cache[0] = ($event) => changePage(currentPage.value - 1))
          }, _hoisted_4$9, 2),
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
            withDirectives(createElementVNode("span", _hoisted_5$7, "•••", 512), [
              [vShow, !forwardArrow.value]
            ]),
            withDirectives((openBlock(), createElementBlock("svg", _hoisted_6$6, _hoisted_8$6, 512)), [
              [vShow, forwardArrow.value]
            ])
          ], 544), [
            [vShow, forwardMore.value && pageList.value[0] - 1 > 1]
          ]),
          (openBlock(true), createElementBlock(Fragment, null, renderList(pageList.value, (page, index) => {
            return openBlock(), createElementBlock("span", {
              class: normalizeClass(["u-item", { active: currentPage.value === page }]),
              key: index,
              onClick: ($event) => changePage(page)
            }, toDisplayString(page), 11, _hoisted_9$6);
          }), 128)),
          withDirectives(createElementVNode("span", {
            class: "m-arrow",
            ref: "backward",
            onClick: onBackward,
            onMouseenter: _cache[4] || (_cache[4] = ($event) => backwardArrow.value = true),
            onMouseleave: _cache[5] || (_cache[5] = ($event) => backwardArrow.value = false)
          }, [
            withDirectives(createElementVNode("span", _hoisted_10$3, "•••", 512), [
              [vShow, !backwardArrow.value]
            ]),
            withDirectives((openBlock(), createElementBlock("svg", _hoisted_11$3, _hoisted_13$2, 512)), [
              [vShow, backwardArrow.value]
            ])
          ], 544), [
            [vShow, backwardMore.value && pageList.value[pageList.value.length - 1] + 1 < totalPage.value]
          ]),
          withDirectives(createElementVNode("span", {
            class: normalizeClass(["u-item", { active: currentPage.value === totalPage.value }]),
            onClick: _cache[6] || (_cache[6] = ($event) => changePage(totalPage.value))
          }, toDisplayString(totalPage.value), 3), [
            [vShow, totalPage.value !== 1]
          ]),
          createElementVNode("span", {
            class: normalizeClass(["u-item", { disabled: currentPage.value === totalPage.value }]),
            onClick: _cache[7] || (_cache[7] = ($event) => changePage(currentPage.value + 1))
          }, _hoisted_15$2, 2),
          _ctx.showQuickJumper ? (openBlock(), createElementBlock("span", _hoisted_16$2, [
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
const Pagination_vue_vue_type_style_index_0_scoped_41c1c393_lang = "";
const Pagination = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-41c1c393"]]);
Pagination.install = (app) => {
  app.component(Pagination.__name, Pagination);
};
const _withScopeId$7 = (n) => (pushScopeId("data-v-aae7fb36"), n = n(), popScopeId(), n);
const _hoisted_1$g = {
  key: 0,
  class: "u-success",
  viewBox: "64 64 896 896",
  "data-icon": "check-circle",
  "aria-hidden": "true",
  focusable: "false"
};
const _hoisted_2$d = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1));
const _hoisted_3$b = [
  _hoisted_2$d
];
const _hoisted_4$8 = {
  key: 1,
  class: "u-progress-text"
};
const _hoisted_5$6 = {
  class: "u-progress-circle",
  viewBox: "0 0 100 100"
};
const _hoisted_6$5 = ["d", "stroke-width"];
const _hoisted_7$5 = ["d", "stroke-width", "stroke", "opacity"];
const _hoisted_8$5 = {
  key: 0,
  class: "u-success",
  focusable: "false",
  "data-icon": "check",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
const _hoisted_9$5 = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createElementVNode("path", { d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" }, null, -1));
const _hoisted_10$2 = [
  _hoisted_9$5
];
const _hoisted_11$2 = {
  key: 1,
  class: "u-progress-text"
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "Progress",
  props: {
    width: { default: "100%" },
    percent: { default: 0 },
    strokeColor: { default: "#1677FF" },
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
    const lineColor = computed(() => {
      if (typeof props.strokeColor === "string") {
        return props.strokeColor;
      } else {
        return `linear-gradient(to ${props.strokeColor.direction || "right"}, ${props.strokeColor["0%"] || props.strokeColor.from}, ${props.strokeColor["100%"] || props.strokeColor.to})`;
      }
    });
    return (_ctx, _cache) => {
      return _ctx.type === "line" ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "m-progress-line",
        style: normalizeStyle(`width: ${totalWidth.value}; height: ${_ctx.strokeWidth < 24 ? 24 : _ctx.strokeWidth}px;`)
      }, [
        createElementVNode("div", {
          class: "m-progress-inner",
          style: normalizeStyle(`width: ${_ctx.showInfo ? "calc(100% - 44px)" : "100%"};`)
        }, [
          createElementVNode("div", {
            class: normalizeClass(["u-progress-bg", { "u-success-bg": _ctx.percent >= 100 }]),
            style: normalizeStyle(`background: ${lineColor.value}; width: ${_ctx.percent >= 100 ? 100 : _ctx.percent}%; height: ${_ctx.strokeWidth}px;`)
          }, null, 6)
        ], 4),
        _ctx.showInfo ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _ctx.percent >= 100 ? (openBlock(), createElementBlock("svg", _hoisted_1$g, _hoisted_3$b)) : (openBlock(), createElementBlock("p", _hoisted_4$8, toDisplayString(_ctx.percent >= 100 ? 100 : _ctx.percent) + "%", 1))
        ], 64)) : createCommentVNode("", true)
      ], 4)) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: "m-progress-circle",
        style: normalizeStyle(`width: ${totalWidth.value}; height: ${totalWidth.value};`)
      }, [
        (openBlock(), createElementBlock("svg", _hoisted_5$6, [
          createElementVNode("path", {
            d: path.value,
            "stroke-linecap": "round",
            class: "u-progress-circle-trail",
            "stroke-width": _ctx.strokeWidth,
            style: normalizeStyle(`stroke-dasharray: ${perimeter.value}px, ${perimeter.value}px;`),
            "fill-opacity": "0"
          }, null, 12, _hoisted_6$5),
          createElementVNode("path", {
            d: path.value,
            "stroke-linecap": "round",
            class: normalizeClass(["u-progress-circle-path", { success: _ctx.percent >= 100 }]),
            "stroke-width": _ctx.strokeWidth,
            stroke: lineColor.value,
            style: normalizeStyle(`stroke-dasharray: ${_ctx.percent / 100 * perimeter.value}px, ${perimeter.value}px;`),
            opacity: _ctx.percent === 0 ? 0 : 1,
            "fill-opacity": "0"
          }, null, 14, _hoisted_7$5)
        ])),
        _ctx.showInfo ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _ctx.percent >= 100 ? (openBlock(), createElementBlock("svg", _hoisted_8$5, _hoisted_10$2)) : (openBlock(), createElementBlock("p", _hoisted_11$2, toDisplayString(_ctx.percent >= 100 ? 100 : _ctx.percent) + "%", 1))
        ], 64)) : createCommentVNode("", true)
      ], 4));
    };
  }
});
const Progress_vue_vue_type_style_index_0_scoped_aae7fb36_lang = "";
const Progress = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-aae7fb36"]]);
Progress.install = (app) => {
  app.component(Progress.__name, Progress);
};
const isClient = typeof window !== "undefined";
const noop = () => {
};
function toRef(...args) {
  if (args.length !== 1)
    return toRef$1(...args);
  const r = args[0];
  return typeof r === "function" ? readonly(customRef(() => ({ get: r, set: noop }))) : ref(r);
}
function useQRCode(text, options) {
  const src = toRef(text);
  const result = ref("");
  watch(
    src,
    async (value) => {
      if (src.value && isClient)
        result.value = await QRCode$1.toDataURL(value, options);
    },
    { immediate: true }
  );
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
    borderColor: { default: "#0505050f" },
    scale: { default: 8 },
    errorLevel: { default: "H" }
  },
  setup(__props) {
    const props = __props;
    const qrcode = useQRCode(props.value, {
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
        class: normalizeClass(["m-qrcode", { "bordered": _ctx.bordered }]),
        style: normalizeStyle(`width: ${_ctx.size}px; height: ${_ctx.size}px; border-color: ${_ctx.borderColor};`)
      }, [
        createElementVNode("img", {
          src: unref(qrcode),
          class: "u-qrcode",
          alt: "QRCode"
        }, null, 8, _hoisted_1$f)
      ], 6);
    };
  }
});
const QRCode_vue_vue_type_style_index_0_scoped_24388852_lang = "";
const QRCode = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-24388852"]]);
QRCode.install = (app) => {
  app.component(QRCode.__name, QRCode);
};
const _hoisted_1$e = { class: "m-radio" };
const _hoisted_2$c = ["onClick"];
const _hoisted_3$a = { class: "u-label" };
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
      return openBlock(), createElementBlock("div", _hoisted_1$e, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.options, (option, index) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["m-radio-wrap", { "vertical": _ctx.vertical }]),
            style: normalizeStyle(sum.value !== index + 1 ? styleObject.value : ""),
            key: index
          }, [
            createElementVNode("div", {
              class: normalizeClass(["m-box", { "disabled": _ctx.disabled || option.disabled }]),
              onClick: ($event) => _ctx.disabled || option.disabled ? () => false : onClick(option.value)
            }, [
              createElementVNode("span", {
                class: normalizeClass(["u-radio", { "u-radio-checked": _ctx.value === option.value }])
              }, null, 2),
              createElementVNode("span", _hoisted_3$a, [
                renderSlot(_ctx.$slots, "default", {
                  label: option.label
                }, () => [
                  createTextVNode(toDisplayString(option.label), 1)
                ], true)
              ])
            ], 10, _hoisted_2$c)
          ], 6);
        }), 128))
      ]);
    };
  }
});
const Radio_vue_vue_type_style_index_0_scoped_685b2f97_lang = "";
const Radio = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-685b2f97"]]);
Radio.install = (app) => {
  app.component(Radio.__name, Radio);
};
const _withScopeId$6 = (n) => (pushScopeId("data-v-28739c5b"), n = n(), popScopeId(), n);
const _hoisted_1$d = ["onClick"];
const _hoisted_2$b = ["onClick", "onMouseenter"];
const _hoisted_3$9 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createElementVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" }, null, -1));
const _hoisted_4$7 = [
  _hoisted_3$9
];
const _hoisted_5$5 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createElementVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" }, null, -1));
const _hoisted_6$4 = [
  _hoisted_5$5
];
const _hoisted_7$4 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createElementVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" }, null, -1));
const _hoisted_8$4 = [
  _hoisted_7$4
];
const _hoisted_9$4 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createElementVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" }, null, -1));
const _hoisted_10$1 = [
  _hoisted_9$4
];
const _hoisted_11$1 = ["onClick", "onMouseenter"];
const _hoisted_12$1 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createElementVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" }, null, -1));
const _hoisted_13$1 = [
  _hoisted_12$1
];
const _hoisted_14$1 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createElementVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" }, null, -1));
const _hoisted_15$1 = [
  _hoisted_14$1
];
const _hoisted_16$1 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createElementVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" }, null, -1));
const _hoisted_17$1 = [
  _hoisted_16$1
];
const _hoisted_18$1 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createElementVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" }, null, -1));
const _hoisted_19$1 = [
  _hoisted_18$1
];
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "Rate",
  props: {
    allowClear: { type: Boolean, default: true },
    allowHalf: { type: Boolean, default: false },
    count: { default: 5 },
    character: { default: "star-filled" },
    size: { default: 20 },
    color: { default: "#fadb14" },
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
        class: normalizeClass(["m-rate", { "disabled": _ctx.disabled }]),
        style: normalizeStyle(`--color: ${_ctx.color};`),
        onMouseleave: onLeave
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.count, (n) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["m-star", { "u-star-half": _ctx.allowHalf && activeValue.value >= n - 0.5 && activeValue.value < n, "u-star-full": activeValue.value >= n, "temp-gray": !_ctx.allowHalf && tempValue.value === n }]),
            style: normalizeStyle(`margin-right: ${n !== _ctx.count ? _ctx.gap : 0}px;`),
            onClick: ($event) => !_ctx.allowHalf ? onClick(n) : preventDefault($event),
            key: n
          }, [
            _ctx.allowHalf ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["u-star-first", { "temp-gray-first": tempValue.value === n - 0.5 }]),
              onClick: withModifiers(($event) => onClick(n - 0.5), ["stop"]),
              onMouseenter: ($event) => onFirstEnter(n - 0.5),
              onMouseleave: resetTempValue
            }, [
              _ctx.character === "star-filled" ? (openBlock(), createElementBlock("svg", {
                key: 0,
                class: "u-star",
                style: normalizeStyle(`width: ${_ctx.size}px;`),
                focusable: "false",
                "data-icon": "star",
                "aria-hidden": "true",
                viewBox: "64 64 896 896"
              }, _hoisted_4$7, 4)) : _ctx.character === "star-outlined" ? (openBlock(), createElementBlock("svg", {
                key: 1,
                class: "u-star",
                style: normalizeStyle(`width: ${_ctx.size}px;`),
                focusable: "false",
                "data-icon": "star",
                "aria-hidden": "true",
                viewBox: "64 64 896 896"
              }, _hoisted_6$4, 4)) : _ctx.character === "heart-filled" ? (openBlock(), createElementBlock("svg", {
                key: 2,
                class: "u-star",
                style: normalizeStyle(`width: ${_ctx.size}px;`),
                focusable: "false",
                "data-icon": "heart",
                "aria-hidden": "true",
                viewBox: "64 64 896 896"
              }, _hoisted_8$4, 4)) : _ctx.character === "heart-outlined" ? (openBlock(), createElementBlock("svg", {
                key: 3,
                class: "u-star",
                style: normalizeStyle(`width: ${_ctx.size}px;`),
                focusable: "false",
                "data-icon": "heart",
                "aria-hidden": "true",
                viewBox: "64 64 896 896"
              }, _hoisted_10$1, 4)) : (openBlock(), createElementBlock("span", {
                key: 4,
                class: "u-star",
                style: normalizeStyle(`font-size: ${0.66 * _ctx.size}px; height: ${_ctx.size}px;`)
              }, [
                renderSlot(_ctx.$slots, "character", {}, () => [
                  createTextVNode(toDisplayString(_ctx.character), 1)
                ], true)
              ], 4))
            ], 42, _hoisted_2$b)) : createCommentVNode("", true),
            createElementVNode("div", {
              class: normalizeClass(["u-star-second", { "temp-gray-second": tempValue.value === n }]),
              onClick: withModifiers(($event) => onClick(n), ["stop"]),
              onMouseenter: ($event) => onSecondEnter(n),
              onMouseleave: resetTempValue
            }, [
              _ctx.character === "star-filled" ? (openBlock(), createElementBlock("svg", {
                key: 0,
                class: "u-star",
                style: normalizeStyle(`width: ${_ctx.size}px;`),
                focusable: "false",
                "data-icon": "star",
                "aria-hidden": "true",
                viewBox: "64 64 896 896"
              }, _hoisted_13$1, 4)) : _ctx.character === "star-outlined" ? (openBlock(), createElementBlock("svg", {
                key: 1,
                class: "u-star",
                style: normalizeStyle(`width: ${_ctx.size}px;`),
                focusable: "false",
                "data-icon": "star",
                "aria-hidden": "true",
                viewBox: "64 64 896 896"
              }, _hoisted_15$1, 4)) : _ctx.character === "heart-filled" ? (openBlock(), createElementBlock("svg", {
                key: 2,
                class: "u-star",
                style: normalizeStyle(`width: ${_ctx.size}px;`),
                focusable: "false",
                "data-icon": "heart",
                "aria-hidden": "true",
                viewBox: "64 64 896 896"
              }, _hoisted_17$1, 4)) : _ctx.character === "heart-outlined" ? (openBlock(), createElementBlock("svg", {
                key: 3,
                class: "u-star",
                style: normalizeStyle(`width: ${_ctx.size}px;`),
                focusable: "false",
                "data-icon": "heart",
                "aria-hidden": "true",
                viewBox: "64 64 896 896"
              }, _hoisted_19$1, 4)) : (openBlock(), createElementBlock("span", {
                key: 4,
                class: "u-star",
                style: normalizeStyle(`font-size: ${0.66 * _ctx.size}px; height: ${_ctx.size}px;`)
              }, [
                renderSlot(_ctx.$slots, "character", {}, () => [
                  createTextVNode(toDisplayString(_ctx.character), 1)
                ], true)
              ], 4))
            ], 42, _hoisted_11$1)
          ], 14, _hoisted_1$d);
        }), 128))
      ], 38);
    };
  }
});
const Rate_vue_vue_type_style_index_0_scoped_28739c5b_lang = "";
const Rate = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-28739c5b"]]);
Rate.install = (app) => {
  app.component(Rate.__name, Rate);
};
const _withScopeId$5 = (n) => (pushScopeId("data-v-92e9dbed"), n = n(), popScopeId(), n);
const _hoisted_1$c = ["onClick"];
const _hoisted_2$a = {
  key: 0,
  class: "u-handle-tooltip"
};
const _hoisted_3$8 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createElementVNode("div", { class: "m-arrow" }, [
  /* @__PURE__ */ createElementVNode("span", { class: "u-arrow" })
], -1));
const _hoisted_4$6 = {
  key: 0,
  class: "u-handle-tooltip"
};
const _hoisted_5$4 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createElementVNode("div", { class: "m-arrow" }, [
  /* @__PURE__ */ createElementVNode("span", { class: "u-arrow" })
], -1));
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "Slider",
  props: {
    width: { default: "100%" },
    min: { default: 0 },
    max: { default: 100 },
    disabled: { type: Boolean, default: false },
    range: { type: Boolean, default: false },
    step: { default: 1 },
    tipFormatter: { type: [Function, null], default: () => {
    } },
    value: { default: 0 }
  },
  emits: ["update:value", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const transition = ref(false);
    const timer = ref();
    const left = ref(0);
    const right = ref(0);
    const slider = ref();
    const sliderWidth = ref();
    const leftHandle = ref();
    const rightHandle = ref();
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
    console.log(typeof props.tipFormatter);
    const leftValue = computed(() => {
      if (props.range) {
        if (typeof props.tipFormatter === "function") {
          return props.tipFormatter(sliderValue.value[0]);
        }
        return sliderValue.value[0];
      }
      return null;
    });
    const rightValue = computed(() => {
      if (props.range) {
        if (typeof props.tipFormatter === "function") {
          return props.tipFormatter(sliderValue.value[0]);
        }
        return sliderValue.value[1];
      }
      if (typeof props.tipFormatter === "function") {
        return props.tipFormatter(sliderValue.value);
      }
      return sliderValue.value;
    });
    watch(
      () => props.value,
      () => {
        getPosition();
      }
    );
    watch(sliderValue, (to) => {
      emits("update:value", to);
      emits("change", to);
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
      if (props.disabled) {
        return;
      }
      if (transition.value) {
        cancelRaf(timer.value);
        timer.value = null;
      } else {
        transition.value = true;
      }
      timer.value = rafTimeout(() => {
        transition.value = false;
      }, 300);
      const targetX = e.layerX;
      if (props.range) {
        if (targetX <= left.value) {
          left.value = targetX;
        } else if (targetX >= right.value) {
          right.value = targetX;
        } else {
          if (targetX - left.value < right.value - targetX) {
            left.value = targetX;
          } else {
            right.value = targetX;
          }
        }
      } else {
        right.value = targetX;
      }
    }
    function onLeftMouseDown() {
      if (props.disabled) {
        return;
      }
      const leftX = slider.value.getBoundingClientRect().left;
      document.onmousemove = (e) => {
        const targetX = e.clientX - leftX;
        if (targetX < 0) {
          left.value = 0;
        } else if (targetX >= 0 && targetX <= right.value) {
          left.value = targetX;
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
      if (props.disabled) {
        return;
      }
      const leftX = slider.value.getBoundingClientRect().left;
      document.onmousemove = (e) => {
        const targetX = e.clientX - leftX;
        if (targetX > sliderWidth.value) {
          right.value = sliderWidth.value;
        } else if (left.value <= targetX && targetX <= sliderWidth.value) {
          right.value = targetX;
        } else {
          right.value = left.value;
          onLeftMouseDown();
        }
      };
      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
    function onLeftSlide(source, place) {
      if (props.disabled) {
        return;
      }
      const targetX = source - props.step * scale.value;
      if (place === "left") {
        if (targetX < 0) {
          left.value = 0;
        } else {
          left.value = targetX;
        }
      } else {
        if (targetX >= left.value) {
          right.value = targetX;
        } else {
          right.value = left.value;
          left.value = targetX;
        }
      }
    }
    function onRightSlide(source, place) {
      if (props.disabled) {
        return;
      }
      const targetX = source + props.step * scale.value;
      if (place === "right") {
        if (targetX > sliderWidth.value) {
          right.value = sliderWidth.value;
        } else {
          right.value = targetX;
        }
      } else {
        if (targetX <= right.value) {
          left.value = targetX;
        } else {
          left.value = right.value;
          right.value = targetX;
        }
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-slider", { disabled: _ctx.disabled }]),
        ref_key: "slider",
        ref: slider,
        style: normalizeStyle(`width: ${totalWidth.value};`)
      }, [
        createElementVNode("div", {
          class: "u-slider-rail",
          onClick: withModifiers(onClickPoint, ["self"])
        }, null, 8, _hoisted_1$c),
        createElementVNode("div", {
          class: normalizeClass(["u-slider-track", { trackTransition: transition.value }]),
          style: normalizeStyle(`left: ${left.value}px; right: auto; width: ${right.value - left.value}px;`)
        }, null, 6),
        _ctx.range ? (openBlock(), createElementBlock("div", {
          key: 0,
          tabindex: "-1",
          ref_key: "leftHandle",
          ref: leftHandle,
          class: normalizeClass(["u-slider-handle", { handleTransition: transition.value }]),
          style: normalizeStyle(`left: ${left.value}px; right: auto; transform: translate(-50%, -50%);`),
          onKeydown: [
            _cache[0] || (_cache[0] = withKeys(withModifiers(($event) => onLeftSlide(left.value, "left"), ["prevent"]), ["left"])),
            _cache[1] || (_cache[1] = withKeys(withModifiers(($event) => onRightSlide(left.value, "left"), ["prevent"]), ["right"])),
            _cache[2] || (_cache[2] = withKeys(withModifiers(($event) => onLeftSlide(left.value, "left"), ["prevent"]), ["down"])),
            _cache[3] || (_cache[3] = withKeys(withModifiers(($event) => onRightSlide(left.value, "left"), ["prevent"]), ["up"]))
          ],
          onMousedown: onLeftMouseDown
        }, [
          _ctx.tipFormatter !== null ? (openBlock(), createElementBlock("div", _hoisted_2$a, [
            createTextVNode(toDisplayString(leftValue.value) + " ", 1),
            _hoisted_3$8
          ])) : createCommentVNode("", true)
        ], 38)) : createCommentVNode("", true),
        createElementVNode("div", {
          tabindex: "-1",
          ref_key: "rightHandle",
          ref: rightHandle,
          class: normalizeClass(["u-slider-handle", { handleTransition: transition.value }]),
          style: normalizeStyle(`left: ${right.value}px; right: auto; transform: translate(-50%, -50%);`),
          onKeydown: [
            _cache[4] || (_cache[4] = withKeys(withModifiers(($event) => onLeftSlide(right.value, "right"), ["prevent"]), ["left"])),
            _cache[5] || (_cache[5] = withKeys(withModifiers(($event) => onRightSlide(right.value, "right"), ["prevent"]), ["right"])),
            _cache[6] || (_cache[6] = withKeys(withModifiers(($event) => onLeftSlide(right.value, "right"), ["prevent"]), ["down"])),
            _cache[7] || (_cache[7] = withKeys(withModifiers(($event) => onRightSlide(right.value, "right"), ["prevent"]), ["up"]))
          ],
          onMousedown: onRightMouseDown
        }, [
          _ctx.tipFormatter !== null ? (openBlock(), createElementBlock("div", _hoisted_4$6, [
            createTextVNode(toDisplayString(rightValue.value) + " ", 1),
            _hoisted_5$4
          ])) : createCommentVNode("", true)
        ], 38)
      ], 6);
    };
  }
});
const Slider_vue_vue_type_style_index_0_scoped_92e9dbed_lang = "";
const Slider = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-92e9dbed"]]);
Slider.install = (app) => {
  app.component(Slider.__name, Slider);
};
const _withScopeId$4 = (n) => (pushScopeId("data-v-25233002"), n = n(), popScopeId(), n);
const _hoisted_1$b = { class: "m-spin" };
const _hoisted_2$9 = { class: "m-spin-box" };
const _hoisted_3$7 = {
  key: 0,
  class: "m-spin-dot"
};
const _hoisted_4$5 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_5$3 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_6$3 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_7$3 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_8$3 = [
  _hoisted_4$5,
  _hoisted_5$3,
  _hoisted_6$3,
  _hoisted_7$3
];
const _hoisted_9$3 = {
  key: 1,
  class: "u-spin-circle"
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "Spin",
  props: {
    spinning: { type: Boolean, default: true },
    size: { default: "default" },
    tip: { default: "" },
    indicator: { default: "dot" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(`m-spin-wrap ${_ctx.size}`)
      }, [
        withDirectives(createElementVNode("div", _hoisted_1$b, [
          createElementVNode("div", _hoisted_2$9, [
            _ctx.indicator === "dot" ? (openBlock(), createElementBlock("div", _hoisted_3$7, _hoisted_8$3)) : createCommentVNode("", true),
            _ctx.indicator === "circle" ? (openBlock(), createElementBlock("div", _hoisted_9$3)) : createCommentVNode("", true),
            withDirectives(createElementVNode("p", { class: "u-tip" }, toDisplayString(_ctx.tip), 513), [
              [vShow, _ctx.tip]
            ])
          ])
        ], 512), [
          [vShow, _ctx.spinning]
        ]),
        createElementVNode("div", {
          class: normalizeClass(["m-spin-content", { "m-spin-mask": _ctx.spinning }])
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 2)
      ], 2);
    };
  }
});
const Spin_vue_vue_type_style_index_0_scoped_25233002_lang = "";
const Spin = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-25233002"]]);
Spin.install = (app) => {
  app.component(Spin.__name, Spin);
};
const _withScopeId$3 = (n) => (pushScopeId("data-v-ec32ee56"), n = n(), popScopeId(), n);
const _hoisted_1$a = { class: "m-steps" };
const _hoisted_2$8 = ["onClick"];
const _hoisted_3$6 = { class: "m-steps-icon" };
const _hoisted_4$4 = {
  key: 0,
  class: "u-num"
};
const _hoisted_5$2 = {
  key: 1,
  class: "u-icon",
  viewBox: "64 64 896 896",
  "data-icon": "check",
  "aria-hidden": "true",
  focusable: "false"
};
const _hoisted_6$2 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("path", { d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" }, null, -1));
const _hoisted_7$2 = [
  _hoisted_6$2
];
const _hoisted_8$2 = { class: "m-steps-content" };
const _hoisted_9$2 = { class: "u-steps-title" };
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "Steps",
  props: {
    steps: { default: () => [] },
    current: { default: 1 },
    width: { default: "100%" },
    descMaxWidth: { default: 140 }
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
        style: normalizeStyle(`width: ${totalWidth.value};`)
      }, [
        createElementVNode("div", _hoisted_1$a, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.steps, (step, index) => {
            return openBlock(), createElementBlock("div", {
              class: normalizeClass([
                "m-steps-item",
                {
                  "finish": currentStep.value > index + 1,
                  "process": currentStep.value === index + 1,
                  "wait": currentStep.value < index + 1
                }
              ]),
              key: index
            }, [
              createElementVNode("div", {
                class: "m-info-wrap",
                onClick: ($event) => onChange(index + 1)
              }, [
                createElementVNode("div", _hoisted_3$6, [
                  currentStep.value <= index + 1 ? (openBlock(), createElementBlock("span", _hoisted_4$4, toDisplayString(index + 1), 1)) : (openBlock(), createElementBlock("svg", _hoisted_5$2, _hoisted_7$2))
                ]),
                createElementVNode("div", _hoisted_8$2, [
                  createElementVNode("div", _hoisted_9$2, toDisplayString(step.title), 1),
                  withDirectives(createElementVNode("div", {
                    class: "u-steps-description",
                    style: normalizeStyle(`max-width: ${_ctx.descMaxWidth}px;`)
                  }, toDisplayString(step.description), 5), [
                    [vShow, step.description]
                  ])
                ])
              ], 8, _hoisted_2$8)
            ], 2);
          }), 128))
        ])
      ], 4);
    };
  }
});
const Steps_vue_vue_type_style_index_0_scoped_ec32ee56_lang = "";
const Steps = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-ec32ee56"]]);
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
  "injectStyles",
  "injectStylesUrls",
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
  "lazyPreloadPrevNext",
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
  "control"
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
        getSlidesFromElements(vnode.children, slotName);
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
      if ((key === "navigation" || key === "pagination" || key === "scrollbar") && "enabled" in passedParams[key] && !passedParams[key].enabled) {
        destroyModule(key);
      }
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
    lazyPreloadPrevNext: {
      type: Number,
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
const _hoisted_1$9 = ["href", "target"];
const _hoisted_2$7 = ["src", "alt"];
const _hoisted_3$5 = ["href", "target"];
const _hoisted_4$3 = ["src", "alt"];
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "Swiper",
  props: {
    images: { default: () => [] },
    width: { default: "100%" },
    height: { default: "100vh" },
    type: { default: "banner" },
    navigation: { type: Boolean, default: true },
    delay: { default: 3e3 },
    swipe: { type: Boolean, default: true },
    preloaderColor: { default: "theme" }
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
      if (props.type === "carousel") {
        swiper.el.onmouseenter = () => {
          swiper.autoplay.stop();
        };
        swiper.el.onmouseleave = () => {
          swiper.autoplay.start();
        };
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        _ctx.type === "banner" ? (openBlock(), createBlock(unref(Swiper$1), mergeProps({
          key: 0,
          class: { "swiper-no-swiping": !_ctx.swipe },
          modules: modulesBanner.value,
          lazy: true,
          navigation: _ctx.navigation,
          pagination: pagination.value,
          "slides-per-view": 1,
          autoplay: autoplayBanner.value,
          loop: true,
          onSwiper,
          onSlideChange: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("change"))
        }, _ctx.$attrs), {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.images, (image, index) => {
              return openBlock(), createBlock(unref(SwiperSlide), { key: index }, {
                default: withCtx(() => [
                  createElementVNode("a", {
                    href: image.link ? image.link : "javascript:;",
                    target: image.link ? "_blank" : "_self",
                    class: "m-link"
                  }, [
                    createElementVNode("img", {
                      src: image.src,
                      class: "u-img",
                      style: normalizeStyle(`width: ${imgWidth.value}; height: ${imgHeight.value};`),
                      alt: image.title,
                      loading: "lazy"
                    }, null, 12, _hoisted_2$7)
                  ], 8, _hoisted_1$9),
                  createElementVNode("div", {
                    class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${_ctx.preloaderColor}`)
                  }, null, 2)
                ]),
                _: 2
              }, 1024);
            }), 128))
          ]),
          _: 1
        }, 16, ["class", "modules", "navigation", "pagination", "autoplay"])) : createCommentVNode("", true),
        _ctx.type === "carousel" ? (openBlock(), createBlock(unref(Swiper$1), mergeProps({
          key: 1,
          class: "swiper-no-swiping",
          modules: modulesCarousel.value,
          lazy: true,
          autoplay: autoplayCarousel.value,
          loop: true,
          onSwiper,
          onSlideChange: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("change"))
        }, _ctx.$attrs), {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.images, (image, index) => {
              return openBlock(), createBlock(unref(SwiperSlide), { key: index }, {
                default: withCtx(() => [
                  createElementVNode("a", {
                    href: image.link ? image.link : "javascript:;",
                    target: image.link ? "_blank" : "_self",
                    class: "m-link"
                  }, [
                    createElementVNode("img", {
                      src: image.src,
                      class: "u-img",
                      style: normalizeStyle(`width: ${imgWidth.value}; height: ${imgHeight.value};`),
                      alt: image.title,
                      loading: "lazy"
                    }, null, 12, _hoisted_4$3)
                  ], 8, _hoisted_3$5),
                  createElementVNode("div", {
                    class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${_ctx.preloaderColor}`)
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
const Swiper_vue_vue_type_style_index_0_scoped_c772694a_lang = "";
const Swiper = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-c772694a"]]);
Swiper.install = (app) => {
  app.component(Swiper.__name, Swiper);
};
const _hoisted_1$8 = { class: "m-switch-wrap" };
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        createElementVNode("div", {
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.disabled ? () => false : onSwitch()),
          class: normalizeClass(["m-switch", { "switch-checked": checked.value, "disabled": _ctx.disabled }])
        }, [
          createElementVNode("div", {
            class: normalizeClass(["u-switch-inner", checked.value ? "inner-checked" : "inner-unchecked"])
          }, toDisplayString(checked.value ? _ctx.checkedInfo : _ctx.uncheckedInfo), 3),
          createElementVNode("div", {
            class: normalizeClass(["u-node", { "node-checked": checked.value }])
          }, [
            renderSlot(_ctx.$slots, "node", { checked: checked.value }, void 0, true)
          ], 2)
        ], 2)
      ]);
    };
  }
});
const Switch_vue_vue_type_style_index_0_scoped_6b3af117_lang = "";
const Switch = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-6b3af117"]]);
Switch.install = (app) => {
  app.component(Switch.__name, Switch);
};
const _withScopeId$2 = (n) => (pushScopeId("data-v-a690ab7e"), n = n(), popScopeId(), n);
const _hoisted_1$7 = { class: "m-table-wrap" };
const _hoisted_2$6 = ["width"];
const _hoisted_3$4 = { class: "m-body" };
const _hoisted_4$2 = ["colspan"];
const _hoisted_5$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("svg", {
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
const _hoisted_6$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("p", { class: "u-empty-desc" }, "暂无数据", -1));
const _hoisted_7$1 = [
  _hoisted_5$1,
  _hoisted_6$1
];
const _hoisted_8$1 = ["title"];
const _hoisted_9$1 = { key: 1 };
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
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
      // 分页器配置
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
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        createElementVNode("table", null, [
          createElementVNode("thead", null, [
            createElementVNode("tr", null, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.columns, (item, index) => {
                return openBlock(), createElementBlock("th", {
                  width: item.width,
                  key: index
                }, toDisplayString(item.title), 9, _hoisted_2$6);
              }), 128))
            ])
          ]),
          createElementVNode("tbody", _hoisted_3$4, [
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
              }, _hoisted_7$1, 8, _hoisted_4$2)
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
                    ], true) : (openBlock(), createElementBlock("span", _hoisted_9$1, toDisplayString(data[col.dataIndex] || "--"), 1))
                  ], 8, _hoisted_8$1);
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
const Table_vue_vue_type_style_index_0_scoped_a690ab7e_lang = "";
const Table = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-a690ab7e"]]);
Table.install = (app) => {
  app.component(Table.__name, Table);
};
const _hoisted_1$6 = { class: "m-tabs-nav" };
const _hoisted_2$5 = ["onClick"];
const _hoisted_3$3 = { class: "m-tabs-page" };
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
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
      if (e.deltaX !== 0) {
        e.preventDefault();
        const scrollX = e.deltaX * 1;
        if (scrollLeft.value + scrollX > scrollMax.value) {
          scrollLeft.value = scrollMax.value;
        } else if (scrollLeft.value + scrollX < 0) {
          scrollLeft.value = 0;
        } else {
          scrollLeft.value += scrollX;
        }
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(`m-tabs ${_ctx.size}`)
      }, [
        createElementVNode("div", _hoisted_1$6, [
          createElementVNode("div", {
            ref_key: "wrap",
            ref: wrap,
            class: normalizeClass(["m-tabs-nav-wrap", { "tabs-center": _ctx.centered, "before-shadow-active": scrollLeft.value > 0, "after-shadow-active": scrollLeft.value < scrollMax.value }])
          }, [
            createElementVNode("div", {
              ref_key: "nav",
              ref: nav,
              class: "m-tabs-nav-list",
              onWheel: _cache[0] || (_cache[0] = ($event) => showWheel.value ? onWheel($event) : (e) => e.preventDefault()),
              style: normalizeStyle(`transform: translate(${-scrollLeft.value}px, 0)`)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tabPages, (page) => {
                return openBlock(), createElementBlock("div", {
                  ref_for: true,
                  ref_key: "tabs",
                  ref: tabs,
                  class: normalizeClass(["u-tab", { "u-tab-active": _ctx.activeKey === page.key, "u-tab-disabled": page.disabled }]),
                  onClick: ($event) => page.disabled ? (e) => e.preventDefault() : onTab(page.key),
                  key: page.key
                }, toDisplayString(page.tab), 11, _hoisted_2$5);
              }), 128)),
              createElementVNode("div", {
                class: "u-tab-bar",
                style: normalizeStyle(`left: ${left.value}px; width: ${width.value}px;`)
              }, null, 4)
            ], 36)
          ], 2)
        ]),
        createElementVNode("div", _hoisted_3$3, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tabPages, (page) => {
            return withDirectives((openBlock(), createElementBlock("div", {
              class: "m-tabs-content",
              key: page.key
            }, [
              renderSlot(_ctx.$slots, page.key, {}, () => [
                createTextVNode(toDisplayString(page.content), 1)
              ], true)
            ])), [
              [vShow, _ctx.activeKey === page.key]
            ]);
          }), 128))
        ])
      ], 2);
    };
  }
});
const Tabs_vue_vue_type_style_index_0_scoped_bf0ac737_lang = "";
const Tabs = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-bf0ac737"]]);
Tabs.install = (app) => {
  app.component(Tabs.__name, Tabs);
};
const _hoisted_1$5 = ["title", "href", "target", "onClick"];
const _hoisted_2$4 = ["title", "href", "target", "onClick"];
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
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
          cancelRaf(timer);
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
        style: normalizeStyle(`height: ${__props.height}px; width: ${totalWidth.value}; background: ${__props.backgroundColor};`)
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
          }, toDisplayString(text.title || "--"), 13, _hoisted_1$5);
        }), 128))
      ], 36)) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: "m-slider-vertical",
        onMouseenter: onStop,
        onMouseleave: onStart,
        style: normalizeStyle(`height: ${__props.height}px; width: ${totalWidth.value}; background: ${__props.backgroundColor};`)
      }, [
        createVNode(TransitionGroup, { name: "slide" }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.sliderText, (text, index) => {
              return withDirectives((openBlock(), createElementBlock("div", {
                class: "m-slider",
                style: normalizeStyle(`width: calc(${totalWidth.value} - ${2 * __props.gap}px); height: ${__props.height}px;`),
                key: index
              }, [
                createElementVNode("a", {
                  class: "u-slider",
                  title: text.title,
                  href: text.link ? text.link : "javascript:;",
                  target: text.link ? "_blank" : "_self",
                  onClick: ($event) => onClick(text.title)
                }, toDisplayString(text.title), 9, _hoisted_2$4)
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
const TextScroll_vue_vue_type_style_index_0_scoped_ec3651f6_lang = "";
const TextScroll = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-ec3651f6"]]);
TextScroll.install = (app) => {
  app.component(TextScroll.__name, TextScroll);
};
const _hoisted_1$4 = { class: "m-timeline" };
const _hoisted_2$3 = { class: "m-dot" };
const _hoisted_3$2 = { class: "u-content" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Timeline",
  props: {
    timelineData: { default: () => [] },
    width: { default: 360 },
    lineStyle: { default: "solid" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-timeline-area",
        style: normalizeStyle(`width: ${_ctx.width}px`)
      }, [
        createElementVNode("div", _hoisted_1$4, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.timelineData, (data, index) => {
            return openBlock(), createElementBlock("div", {
              class: normalizeClass(["m-timeline-item", { "last": index === _ctx.timelineData.length - 1 }]),
              key: index
            }, [
              createElementVNode("span", {
                class: "u-tail",
                style: normalizeStyle(`border-left-style: ${_ctx.lineStyle};`)
              }, null, 4),
              createElementVNode("div", _hoisted_2$3, [
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
                  }, null, 4)) : data.color === "blue" ? (openBlock(), createElementBlock("span", {
                    key: 3,
                    class: "u-dot",
                    style: normalizeStyle({
                      borderColor: "#1677ff"
                      /* blue */
                    })
                  }, null, 4)) : (openBlock(), createElementBlock("span", {
                    key: 4,
                    class: "u-dot",
                    style: normalizeStyle({
                      borderColor: data.color || "#1677ff"
                      /* blue */
                    })
                  }, null, 4))
                ], true)
              ]),
              createElementVNode("div", _hoisted_3$2, [
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
const Timeline_vue_vue_type_style_index_0_scoped_f62150c0_lang = "";
const Timeline = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-f62150c0"]]);
Timeline.install = (app) => {
  app.component(Timeline.__name, Timeline);
};
const _hoisted_1$3 = { class: "m-arrow" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Tooltip",
  props: {
    maxWidth: { default: 120 },
    content: { default: "暂无内容" },
    title: { default: "暂无提示" },
    fontSize: { default: 14 },
    color: { default: "rgba(0,0,0,.85)" },
    backgroundColor: { default: "#FFF" }
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
          style: normalizeStyle(`max-width: ${_ctx.maxWidth}px; top: ${top.value}px; left: ${left.value}px;`)
        }, [
          createElementVNode("div", {
            class: "u-title",
            style: normalizeStyle(`font-size: ${_ctx.fontSize}px; color: ${_ctx.color}; background-color: ${_ctx.backgroundColor};`)
          }, [
            renderSlot(_ctx.$slots, "title", {}, () => [
              createTextVNode(toDisplayString(_ctx.title), 1)
            ], true)
          ], 4),
          createElementVNode("div", _hoisted_1$3, [
            createElementVNode("span", {
              class: "u-arrow",
              style: normalizeStyle(`background-color: ${_ctx.backgroundColor};`)
            }, null, 4)
          ])
        ], 38),
        createElementVNode("div", {
          ref_key: "contentRef",
          ref: contentRef,
          class: "u-content"
        }, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(_ctx.content), 1)
          ], true)
        ], 512)
      ], 32);
    };
  }
});
const Tooltip_vue_vue_type_style_index_0_scoped_bdf7f356_lang = "";
const Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-bdf7f356"]]);
Tooltip.install = (app) => {
  app.component(Tooltip.__name, Tooltip);
};
const _withScopeId$1 = (n) => (pushScopeId("data-v-a11ba72f"), n = n(), popScopeId(), n);
const _hoisted_1$2 = { class: "m-upload-list" };
const _hoisted_2$2 = { class: "m-upload" };
const _hoisted_3$1 = ["onDrop", "onClick"];
const _hoisted_4$1 = ["accept", "multiple", "onChange"];
const _hoisted_5 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-plus",
  focusable: "false",
  "data-icon": "plus",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" })
], -1));
const _hoisted_6 = { class: "u-tip" };
const _hoisted_7 = { class: "m-file-uploading" };
const _hoisted_8 = {
  key: 0,
  class: "m-file-preview"
};
const _hoisted_9 = ["src", "alt"];
const _hoisted_10 = {
  key: 1,
  class: "u-file",
  focusable: "false",
  "data-icon": "file-pdf",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
const _hoisted_11 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("path", { d: "M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7-3.8-21.3-19.5-29.6-32.9-30.2-15.8-.7-29.9 8.3-33.4 21.4-6.6 24-.7 56.8 10.1 98.6-13.6 32.4-35.3 79.5-51.2 107.5-29.6 15.3-69.3 38.9-75.2 68.7-1.2 5.5.2 12.5 3.5 18.8 3.7 7 9.6 12.4 16.5 15 3 1.1 6.6 2 10.8 2 17.6 0 46.1-14.2 84.1-79.4 5.8-1.9 11.8-3.9 17.6-5.9 27.2-9.2 55.4-18.8 80.9-23.1 28.2 15.1 60.3 24.8 82.1 24.8 21.6 0 30.1-12.8 33.3-20.5 5.6-13.5 2.9-30.5-6.2-39.6-13.2-13-45.3-16.4-95.3-10.2-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7 6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4-4.9-19.9-5.6-48.1-2.7-51.4.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2-21.6 4.9-41.3 13-58.9 20.2-4.2 1.7-8.3 3.4-12.3 5 13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6 40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z" }, null, -1));
const _hoisted_12 = [
  _hoisted_11
];
const _hoisted_13 = {
  key: 2,
  class: "u-file",
  focusable: "false",
  "data-icon": "file",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
const _hoisted_14 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("path", {
  d: "M534 352V136H232v752h560V394H576a42 42 0 01-42-42z",
  fill: "#e6f7ff"
}, null, -1));
const _hoisted_15 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("path", { d: "M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM602 137.8L790.2 326H602V137.8zM792 888H232V136h302v216a42 42 0 0042 42h216v494z" }, null, -1));
const _hoisted_16 = [
  _hoisted_14,
  _hoisted_15
];
const _hoisted_17 = { class: "m-file-mask" };
const _hoisted_18 = ["href"];
const _hoisted_19 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "eye",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" })
], -1));
const _hoisted_20 = [
  _hoisted_19
];
const _hoisted_21 = ["onClick"];
const _hoisted_22 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "delete",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" })
], -1));
const _hoisted_23 = [
  _hoisted_22
];
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Upload",
  props: {
    accept: { default: "*" },
    multiple: { type: Boolean, default: false },
    maxCount: { default: 1 },
    tip: { default: "Upload" },
    uploadingTip: { default: "Uploading" },
    fit: { default: "contain" },
    errorInfo: { default: "" },
    beforeUpload: { type: Function, default: () => true },
    uploadMode: { default: "base64" },
    customRequest: { type: Function, default: () => {
    } },
    disabled: { type: Boolean, default: false },
    fileList: { default: () => [] }
  },
  emits: ["update:fileList", "change", "remove"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const uploadedFiles = ref([]);
    const showUpload = ref(1);
    const uploading = ref(Array(props.maxCount).fill(false));
    const uploadInput = ref();
    watchEffect(() => {
      initUpload();
    });
    function initUpload() {
      uploadedFiles.value = [...props.fileList];
      if (uploadedFiles.value.length > props.maxCount) {
        uploadedFiles.value.splice(props.maxCount);
      }
      if (props.disabled) {
        showUpload.value = uploadedFiles.value.length;
      } else {
        if (uploadedFiles.value.length < props.maxCount) {
          showUpload.value = props.fileList.length + 1;
        } else {
          showUpload.value = props.maxCount;
        }
      }
    }
    function isImage(url) {
      const imageUrlReg = /\.(jpg|jpeg|png|gif)$/i;
      const base64Reg = /^data:image/;
      return imageUrlReg.test(url) || base64Reg.test(url);
    }
    function isPDF(url) {
      const pdfUrlReg = /\.pdf$/i;
      const base64Reg = /^data:application\/pdf/;
      return pdfUrlReg.test(url) || base64Reg.test(url);
    }
    function onDrop(e, index) {
      var _a;
      const files = (_a = e.dataTransfer) == null ? void 0 : _a.files;
      if (files == null ? void 0 : files.length) {
        const len = files.length;
        for (let n = 0; n < len; n++) {
          if (index + n <= props.maxCount) {
            uploadFile(files[n], index + n);
          } else {
            break;
          }
        }
        uploadInput.value[index].value = "";
      }
    }
    function onClick(index) {
      uploadInput.value[index].click();
    }
    function onUpload(e, index) {
      const files = e.target.files;
      if (files == null ? void 0 : files.length) {
        const len = files.length;
        for (let n = 0; n < len; n++) {
          if (index + n < props.maxCount) {
            uploadFile(files[n], index + n);
          } else {
            break;
          }
        }
        uploadInput.value[index].value = "";
      }
    }
    const uploadFile = function(file, index) {
      if (!props.beforeUpload(file)) {
        nextTick(() => {
          onError(props.errorInfo);
        });
      } else {
        if (props.maxCount > showUpload.value) {
          showUpload.value++;
        }
        if (props.uploadMode === "base64") {
          uploading.value[index] = true;
          base64Upload(file, index);
        }
        if (props.uploadMode === "custom") {
          uploading.value[index] = true;
          customUpload(file, index);
        }
      }
    };
    function base64Upload(file, index) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadstart = function(e) {
      };
      reader.onabort = function(e) {
      };
      reader.onerror = function(e) {
      };
      reader.onprogress = function(e) {
        if (e.loaded === e.total) {
          uploading.value[index] = false;
        }
      };
      reader.onload = function(e) {
        var _a;
        uploadedFiles.value.push({
          name: file.name,
          url: (_a = e.target) == null ? void 0 : _a.result
        });
        emits("update:fileList", uploadedFiles.value);
        emits("change", uploadedFiles.value);
      };
      reader.onloadend = function(e) {
      };
    }
    function customUpload(file, index) {
      props.customRequest(file).then((res) => {
        uploadedFiles.value.push(res);
        emits("update:fileList", uploadedFiles.value);
        emits("change", uploadedFiles.value);
      }).catch((err) => {
        if (props.maxCount > 1) {
          showUpload.value = uploadedFiles.value.length + 1;
        }
        onError(err);
      }).finally(() => {
        uploading.value[index] = false;
      });
    }
    function onRemove(index) {
      if (uploadedFiles.value.length < props.maxCount) {
        showUpload.value--;
      }
      const removeFile = uploadedFiles.value.splice(index, 1);
      emits("remove", removeFile);
      emits("update:fileList", uploadedFiles.value);
      emits("change", uploadedFiles.value);
    }
    const message = ref();
    function onError(content) {
      message.value.error(content);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(showUpload.value, (n) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["m-upload-item", { mr8: n !== showUpload.value }]),
            key: n
          }, [
            createElementVNode("div", _hoisted_2$2, [
              withDirectives(createElementVNode("div", {
                class: normalizeClass(["m-upload-wrap", { "upload-disabled": _ctx.disabled }]),
                onDragenter: _cache[1] || (_cache[1] = withModifiers(() => {
                }, ["stop", "prevent"])),
                onDragover: _cache[2] || (_cache[2] = withModifiers(() => {
                }, ["stop", "prevent"])),
                onDrop: withModifiers(($event) => _ctx.disabled ? () => false : onDrop($event, n - 1), ["stop", "prevent"]),
                onClick: ($event) => _ctx.disabled ? () => false : onClick(n - 1)
              }, [
                createElementVNode("input", {
                  ref_for: true,
                  ref_key: "uploadInput",
                  ref: uploadInput,
                  type: "file",
                  onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                  }, ["stop"])),
                  accept: _ctx.accept,
                  multiple: _ctx.multiple,
                  async: "",
                  onChange: ($event) => onUpload($event, n - 1),
                  style: { "display": "none" }
                }, null, 40, _hoisted_4$1),
                createElementVNode("div", null, [
                  _hoisted_5,
                  createElementVNode("p", _hoisted_6, [
                    renderSlot(_ctx.$slots, "default", {}, () => [
                      createTextVNode(toDisplayString(_ctx.tip), 1)
                    ], true)
                  ])
                ])
              ], 42, _hoisted_3$1), [
                [vShow, !uploading.value[n - 1] && !uploadedFiles.value[n - 1]]
              ]),
              withDirectives(createElementVNode("div", _hoisted_7, [
                createVNode(unref(Spin), {
                  class: "u-spin",
                  tip: _ctx.uploadingTip,
                  size: "small",
                  indicator: "circle"
                }, null, 8, ["tip"])
              ], 512), [
                [vShow, uploading.value[n - 1]]
              ]),
              uploadedFiles.value[n - 1] ? (openBlock(), createElementBlock("div", _hoisted_8, [
                isImage(uploadedFiles.value[n - 1].url) ? (openBlock(), createElementBlock("img", {
                  key: 0,
                  class: "u-image",
                  style: normalizeStyle(`object-fit: ${_ctx.fit};`),
                  src: uploadedFiles.value[n - 1].url,
                  alt: uploadedFiles.value[n - 1].name
                }, null, 12, _hoisted_9)) : isPDF(uploadedFiles.value[n - 1].url) ? (openBlock(), createElementBlock("svg", _hoisted_10, _hoisted_12)) : (openBlock(), createElementBlock("svg", _hoisted_13, _hoisted_16)),
                createElementVNode("div", _hoisted_17, [
                  createElementVNode("a", {
                    class: "m-icon",
                    title: "预览",
                    href: uploadedFiles.value[n - 1].url,
                    target: "_blank"
                  }, _hoisted_20, 8, _hoisted_18),
                  withDirectives(createElementVNode("a", {
                    class: "m-icon",
                    title: "删除",
                    onClick: withModifiers(($event) => onRemove(n - 1), ["prevent", "stop"])
                  }, _hoisted_23, 8, _hoisted_21), [
                    [vShow, !_ctx.disabled]
                  ])
                ])
              ])) : createCommentVNode("", true)
            ])
          ], 2);
        }), 128)),
        createVNode(unref(Message), {
          ref_key: "message",
          ref: message,
          duration: 3e3,
          top: 30
        }, null, 512)
      ]);
    };
  }
});
const Upload_vue_vue_type_style_index_0_scoped_a11ba72f_lang = "";
const Upload = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-a11ba72f"]]);
Upload.install = (app) => {
  app.component(Upload.__name, Upload);
};
const _withScopeId = (n) => (pushScopeId("data-v-5d9cc5de"), n = n(), popScopeId(), n);
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
    zoom: { default: "none" },
    second: { default: 0.3 }
  },
  setup(__props) {
    const props = __props;
    const poster = ref(props.videoPoster);
    const originPlay = ref(true);
    const vplay = ref(false);
    const veo = ref();
    function getPoster() {
      veo.value.currentTime = props.second;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = veo.value.videoWidth;
      canvas.height = veo.value.videoHeight;
      ctx == null ? void 0 : ctx.drawImage(veo.value, 0, 0, canvas.width, canvas.height);
      poster.value = canvas.toDataURL("image/png");
    }
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
        class: normalizeClass(["m-video", { "u-video-hover": !vplay.value }]),
        style: normalizeStyle(`width: ${_ctx.width}px; height: ${_ctx.height}px;`)
      }, [
        createElementVNode("video", mergeProps({
          ref_key: "veo",
          ref: veo,
          style: `object-fit: ${_ctx.zoom};`,
          src: _ctx.videoSrc,
          poster: poster.value,
          width: _ctx.width,
          height: _ctx.height,
          autoplay: _ctx.autoplay,
          controls: !originPlay.value && _ctx.controls,
          loop: _ctx.loop,
          muted: _ctx.autoplay || _ctx.muted,
          preload: _ctx.preload,
          crossorigin: "anonymous"
        }, _ctx.$attrs, {
          onLoadeddata: _cache[0] || (_cache[0] = ($event) => poster.value ? (e) => e.preventDefault() : getPoster()),
          onClickOnce: withModifiers(onPlay, ["prevent"])
        }), " 您的浏览器不支持video标签。 ", 16, _hoisted_1$1),
        withDirectives((openBlock(), createElementBlock("svg", {
          class: normalizeClass(["u-play", { "hidden": vplay.value }]),
          style: normalizeStyle(`width: ${_ctx.playWidth}px; height: ${_ctx.playWidth}px;`),
          viewBox: "0 0 24 24"
        }, _hoisted_4, 6)), [
          [vShow, originPlay.value || _ctx.showPlay]
        ])
      ], 6);
    };
  }
});
const Video_vue_vue_type_style_index_0_scoped_5d9cc5de_lang = "";
const Video = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-5d9cc5de"]]);
Video.install = (app) => {
  app.component(Video.__name, Video);
};
const _hoisted_1 = ["src", "title", "alt"];
const _hoisted_2 = ["src", "title", "alt"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Waterfall",
  props: {
    images: { default: () => [] },
    columnCount: { default: 3 },
    columnGap: { default: 30 },
    width: { default: "100%" },
    backgroundColor: { default: "#F2F4F8" },
    mode: { default: "JS" }
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
    const imagesProperty = ref([]);
    const preColumnHeight = ref([]);
    const waterfall = ref();
    const imageWidth = ref();
    const height = computed(() => {
      return Math.max(...preColumnHeight.value) + props.columnGap;
    });
    watch(
      () => props.images,
      (to) => {
        if (to.length && props.mode === "JS") {
          onPreload();
        }
      }
    );
    onMounted(() => {
      if (props.images.length && props.mode === "JS") {
        onPreload();
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
      imageWidth.value = (waterfall.value.offsetWidth - (props.columnCount + 1) * props.columnGap) / props.columnCount;
      const len = props.images.length;
      imagesProperty.value.splice(len);
      for (let i = 0; i < len; i++) {
        await onLoad(props.images[i].src, i);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        _ctx.mode === "JS" ? (openBlock(), createElementBlock("div", mergeProps({ key: 0 }, _ctx.$attrs, {
          class: "m-waterfall-js",
          ref_key: "waterfall",
          ref: waterfall,
          style: `background-color: ${_ctx.backgroundColor}; width: ${totalWidth.value}; height: ${height.value}px;`
        }), [
          (openBlock(true), createElementBlock(Fragment, null, renderList(imagesProperty.value, (property, index) => {
            return openBlock(), createElementBlock("img", {
              class: "u-img",
              key: index,
              style: normalizeStyle(`width: ${imageWidth.value}px; top: ${property && property.top}px; left: ${property && property.left}px;`),
              src: _ctx.images[index].src,
              title: _ctx.images[index].title,
              alt: _ctx.images[index].title
            }, null, 12, _hoisted_1);
          }), 128))
        ], 16)) : createCommentVNode("", true),
        _ctx.mode === "CSS" ? (openBlock(), createElementBlock("div", mergeProps({ key: 1 }, _ctx.$attrs, {
          class: "m-waterfall-css",
          style: `background: ${_ctx.backgroundColor}; width: ${totalWidth.value}; padding: ${_ctx.columnGap}px; column-count: ${_ctx.columnCount}; column-gap: ${_ctx.columnGap}px;`
        }), [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.images, (item, index) => {
            return openBlock(), createElementBlock("div", {
              class: "m-img",
              style: normalizeStyle(`margin-bottom: ${_ctx.columnGap}px;`),
              key: index
            }, [
              createElementVNode("img", {
                class: "u-img",
                src: item.src,
                title: item.title,
                alt: item.title
              }, null, 8, _hoisted_2)
            ], 4);
          }), 128))
        ], 16)) : createCommentVNode("", true)
      ], 64);
    };
  }
});
const Waterfall_vue_vue_type_style_index_0_scoped_6107a361_lang = "";
const Waterfall = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6107a361"]]);
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
  Upload,
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
  Upload,
  Video,
  Waterfall,
  add,
  cancelAnimationFrame$1 as cancelAnimationFrame,
  cancelRaf,
  dateFormat,
  debounce,
  VueAmazingUI as default,
  downloadFile,
  rafTimeout,
  requestAnimationFrame$1 as requestAnimationFrame,
  throttle
};
