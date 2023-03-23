import { defineComponent, computed, openBlock, createElementBlock, normalizeStyle, Fragment, renderList, createElementVNode, normalizeClass, unref, toDisplayString, createCommentVNode, pushScopeId, popScopeId, resolveComponent, createBlock, withCtx, renderSlot, createTextVNode, withModifiers, ref, watch, onMounted, createVNode, mergeProps, withDirectives, vShow, Transition, nextTick, TransitionGroup, vModelText, createStaticVNode, h, onUpdated, provide, onBeforeUnmount, onBeforeUpdate, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import VueDatePicker from "@vuepic/vue-datepicker";
import Swiper$2, { Navigation, Pagination as Pagination$1, Autoplay, EffectFade } from "swiper";
const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
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
const _withScopeId$8 = (n) => (pushScopeId("data-v-9d95a75c"), n = n(), popScopeId(), n);
const _hoisted_1$i = ["onClick", "title"];
const _hoisted_2$f = {
  key: 0,
  class: "u-separator"
};
const _hoisted_3$b = {
  key: 1,
  class: "u-arrow",
  viewBox: "64 64 896 896",
  "data-icon": "right",
  "aria-hidden": "true",
  focusable: "false"
};
const _hoisted_4$9 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createElementVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" }, null, -1));
const _hoisted_5$6 = [
  _hoisted_4$9
];
const _hoisted_6$6 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createElementVNode("div", { class: "assist" }, null, -1));
const _sfc_main$k = /* @__PURE__ */ defineComponent({
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
            }, toDisplayString(route.name || "--"), 11, _hoisted_1$i),
            index !== unref(len) - 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              __props.separator ? (openBlock(), createElementBlock("span", _hoisted_2$f, toDisplayString(__props.separator), 1)) : (openBlock(), createElementBlock("svg", _hoisted_3$b, _hoisted_5$6))
            ], 64)) : createCommentVNode("", true)
          ]);
        }), 128)),
        _hoisted_6$6
      ], 4);
    };
  }
});
const Breadcrumb_vue_vue_type_style_index_0_scoped_9d95a75c_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const Breadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-9d95a75c"]]);
Breadcrumb.install = (app) => {
  app.component(Breadcrumb.__name, Breadcrumb);
};
const _hoisted_1$h = ["disabled"];
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "Button",
  props: {
    name: { default: "按钮" },
    type: { default: "default" },
    effect: { default: "fade" },
    size: { default: "middle" },
    width: { default: 0 },
    height: { default: 0 },
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
          onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.$emit("click"), ["stop"])),
          disabled: __props.disabled,
          class: normalizeClass(["u-button", [__props.type, __props.size, { [__props.effect]: __props.type === "default", widthType: __props.width, disabled: __props.disabled }]]),
          style: normalizeStyle({ borderRadius: __props.borderRadius + "px", width: __props.width - 2 + "px", height: __props.height - 2 + "px", lineHeight: __props.height - 2 + "px" })
        }, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(__props.name), 1)
          ], true)
        ], 14, _hoisted_1$h))
      ], 2);
    };
  }
});
const Button_vue_vue_type_style_index_0_scoped_c6861aa2_lang = "";
const Button = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-c6861aa2"]]);
Button.install = (app) => {
  app.component(Button.__name, Button);
};
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "Cascader",
  props: {
    options: {
      // 可选项数据源
      type: Array,
      default: () => []
    },
    selectedValue: {
      // （v-model）省市区选中项
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
      // 省市区统一是否全部禁用
      type: Boolean,
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
    function initCascader(selectedValue) {
      secondOptions.value = findChildren(firstOptions.value, 0);
      thirdOptions.value = [];
      if (selectedValue.length > 1) {
        thirdOptions.value = findChildren(secondOptions.value, 1);
      }
    }
    function findChildren(options, index) {
      const len = options.length;
      for (let i = 0; i < len; i++) {
        if (options[i][props.value] === props.selectedValue[index]) {
          return options[i][props.children] || [];
        }
      }
      return [];
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
    function findLabel(options, index) {
      const len = options.length;
      for (let i = 0; i < len; i++) {
        if (options[i][props.value] === props.selectedValue[index]) {
          return options[i][props.label];
        }
      }
      return props.selectedValue[index];
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
          disabled: __props.disabled,
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
          disabled: __props.disabled,
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
          disabled: __props.disabled,
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
const Cascader_vue_vue_type_style_index_0_scoped_3936cf14_lang = "";
const Cascader = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-3936cf14"]]);
Cascader.install = (app) => {
  app.component(Cascader.__name, Cascader);
};
const _hoisted_1$g = ["onClick"];
const _hoisted_2$e = { class: "u-label" };
const _hoisted_3$a = { class: "u-label" };
const _sfc_main$h = /* @__PURE__ */ defineComponent({
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
            createElementVNode("span", _hoisted_2$e, [
              renderSlot(_ctx.$slots, "default", {
                label: option.label
              }, () => [
                createTextVNode(toDisplayString(option.label), 1)
              ], true)
            ])
          ], 14, _hoisted_1$g);
        }), 128)) : (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["m-checkbox-wrap", { "disabled": __props.disabled }]),
          onClick: onCheckAll
        }, [
          createElementVNode("span", {
            class: normalizeClass(["u-checkbox", { "u-checkbox-checked": __props.checked && !__props.indeterminate, "indeterminate": __props.indeterminate }])
          }, null, 2),
          createElementVNode("span", _hoisted_3$a, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ])
        ], 2))
      ], 2);
    };
  }
});
const Checkbox_vue_vue_type_style_index_0_scoped_2e6d02dd_lang = "";
const Checkbox = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-2e6d02dd"]]);
Checkbox.install = (app) => {
  app.component(Checkbox.__name, Checkbox);
};
const _hoisted_1$f = { class: "m-countdown" };
const _hoisted_2$d = { class: "u-title" };
const _hoisted_3$9 = { class: "u-time" };
const _hoisted_4$8 = { key: 2 };
const _sfc_main$g = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createElementBlock("div", _hoisted_1$f, [
        renderSlot(_ctx.$slots, "title", {}, () => [
          createElementVNode("p", _hoisted_2$d, toDisplayString(props.title), 1)
        ], true),
        createElementVNode("div", _hoisted_3$9, [
          restTime.value > 0 ? renderSlot(_ctx.$slots, "prefix", { key: 0 }, () => [
            createTextVNode(toDisplayString(__props.prefix), 1)
          ], true) : createCommentVNode("", true),
          __props.finishedText && restTime.value === 0 ? renderSlot(_ctx.$slots, "finish", { key: 1 }, () => [
            createTextVNode(toDisplayString(__props.finishedText), 1)
          ], true) : (openBlock(), createElementBlock("span", _hoisted_4$8, toDisplayString(unref(showTime)), 1)),
          restTime.value > 0 ? renderSlot(_ctx.$slots, "suffix", { key: 3 }, () => [
            createTextVNode(toDisplayString(__props.suffix), 1)
          ], true) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});
const Countdown_vue_vue_type_style_index_0_scoped_2f02a0b2_lang = "";
const Countdown = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-2f02a0b2"]]);
Countdown.install = (app) => {
  app.component(Countdown.__name, Countdown);
};
const main = "";
const _sfc_main$f = /* @__PURE__ */ defineComponent({
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
const DatePicker_vue_vue_type_style_index_0_scoped_deb3eee4_lang = "";
const DatePicker = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-deb3eee4"]]);
DatePicker.install = (app) => {
  app.component(DatePicker.__name, DatePicker);
};
const _withScopeId$7 = (n) => (pushScopeId("data-v-8aa1c704"), n = n(), popScopeId(), n);
const _hoisted_1$e = ["onClick"];
const _hoisted_2$c = { class: "m-spin-dot" };
const _hoisted_3$8 = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_4$7 = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_5$5 = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_6$5 = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_7$5 = [
  _hoisted_3$8,
  _hoisted_4$7,
  _hoisted_5$5,
  _hoisted_6$5
];
const _hoisted_8$4 = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createElementVNode("path", { d: "M290 236.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0 0 13.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 0 0 0 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 0 0-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z" }, null, -1));
const _hoisted_9$4 = [
  _hoisted_8$4
];
const _hoisted_10$4 = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createElementVNode("path", { d: "M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 0 0 0 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 0 0 391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 0 0-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z" }, null, -1));
const _hoisted_11$3 = [
  _hoisted_10$4
];
const _hoisted_12$3 = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createElementVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1));
const _hoisted_13$3 = [
  _hoisted_12$3
];
const _hoisted_14$3 = { class: "m-dialog-header" };
const _hoisted_15$3 = { class: "u-head" };
const _hoisted_16$3 = { class: "m-dialog-footer" };
const _sfc_main$e = /* @__PURE__ */ defineComponent({
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
      // 是否允许切换全屏（允许后右上角会出现一个按钮）
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
    loading: {
      // 加载中
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
      return openBlock(), createElementBlock("div", {
        class: "m-dialog-mask",
        onClick: withModifiers(onBlur, ["self"])
      }, [
        createElementVNode("div", {
          class: normalizeClass(["m-dialog", __props.center ? "relative-hv-center" : "top-center"]),
          style: normalizeStyle(`width: ${unref(dialogWidth)}; height: ${unref(dialogHeight)};`)
        }, [
          createElementVNode("div", {
            class: normalizeClass(["m-dialog-content", { loading: __props.loading }])
          }, [
            withDirectives(createElementVNode("div", _hoisted_2$c, _hoisted_7$5, 512), [
              [vShow, __props.loading]
            ]),
            withDirectives((openBlock(), createElementBlock("svg", {
              onClick: onFullScreen,
              class: "u-screen",
              viewBox: "64 64 896 896",
              "data-icon": "fullscreen",
              "aria-hidden": "true",
              focusable: "false"
            }, _hoisted_9$4, 512)), [
              [vShow, !fullScreen.value && __props.switchFullscreen]
            ]),
            withDirectives((openBlock(), createElementBlock("svg", {
              onClick: onFullScreen,
              class: "u-screen",
              viewBox: "64 64 896 896",
              "data-icon": "fullscreen-exit",
              "aria-hidden": "true",
              focusable: "false"
            }, _hoisted_11$3, 512)), [
              [vShow, fullScreen.value && __props.switchFullscreen]
            ]),
            (openBlock(), createElementBlock("svg", {
              onClick: onClose,
              class: "u-close",
              viewBox: "64 64 896 896",
              "data-icon": "close",
              "aria-hidden": "true",
              focusable: "false"
            }, _hoisted_13$3)),
            createElementVNode("div", _hoisted_14$3, [
              renderSlot(_ctx.$slots, "title", {}, () => [
                createElementVNode("div", _hoisted_15$3, toDisplayString(__props.title), 1)
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
            withDirectives(createElementVNode("div", _hoisted_16$3, [
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
      ], 8, _hoisted_1$e);
    };
  }
});
const Dialog_vue_vue_type_style_index_0_scoped_8aa1c704_lang = "";
const Dialog = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-8aa1c704"]]);
Dialog.install = (app) => {
  app.component(Dialog.__name, Dialog);
};
const _withScopeId$6 = (n) => (pushScopeId("data-v-c86bd983"), n = n(), popScopeId(), n);
const _hoisted_1$d = ["onMouseenter", "onMouseleave"];
const _hoisted_2$b = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1));
const _hoisted_3$7 = [
  _hoisted_2$b
];
const _hoisted_4$6 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1));
const _hoisted_5$4 = [
  _hoisted_4$6
];
const _hoisted_6$4 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1));
const _hoisted_7$4 = [
  _hoisted_6$4
];
const _hoisted_8$3 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1));
const _hoisted_9$3 = [
  _hoisted_8$3
];
const _hoisted_10$3 = { class: "content" };
var ColorStyle$1 = /* @__PURE__ */ ((ColorStyle2) => {
  ColorStyle2["info"] = "#1890FF";
  ColorStyle2["success"] = "#52c41a";
  ColorStyle2["error"] = "#f5222d";
  ColorStyle2["warn"] = "#faad14";
  return ColorStyle2;
})(ColorStyle$1 || {});
const _sfc_main$d = /* @__PURE__ */ defineComponent({
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
        resetTimer.value = setTimeout(() => {
          messageContent.value.splice(0);
          showMessage.value.splice(0);
        }, 500);
      }
    });
    function onEnter(index) {
      clearTimeout(hideTimers.value[index]);
    }
    function onLeave(index) {
      onHideMessage(index);
    }
    function show() {
      clearTimeout(resetTimer.value);
      const index = messageContent.value.length - 1;
      console.log("index:", index);
      nextTick(() => {
        showMessage.value[index] = true;
        onHideMessage(index);
      });
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
      hideTimers.value[index] = setTimeout(() => {
        showMessage.value[index] = false;
        emit("close");
      }, props.duration);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-message-wrap",
        style: normalizeStyle(`top: ${__props.top}px;`)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(messageContent.value, (message, index) => {
          return openBlock(), createElementBlock("div", {
            class: "m-message",
            key: index
          }, [
            (openBlock(), createBlock(Transition, {
              name: "slide-fade",
              key: index
            }, {
              default: withCtx(() => [
                showMessage.value[index] ? (openBlock(), createElementBlock("div", {
                  key: 0,
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
                  }, _hoisted_3$7, 4)) : createCommentVNode("", true),
                  message.mode === "success" ? (openBlock(), createElementBlock("svg", {
                    key: 1,
                    class: "svg",
                    style: normalizeStyle({ fill: ColorStyle$1[message.mode] }),
                    viewBox: "64 64 896 896",
                    "data-icon": "check-circle",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, _hoisted_5$4, 4)) : createCommentVNode("", true),
                  message.mode === "error" ? (openBlock(), createElementBlock("svg", {
                    key: 2,
                    class: "svg",
                    style: normalizeStyle({ fill: ColorStyle$1[message.mode] }),
                    viewBox: "64 64 896 896",
                    "data-icon": "close-circle",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, _hoisted_7$4, 4)) : createCommentVNode("", true),
                  message.mode === "warn" ? (openBlock(), createElementBlock("svg", {
                    key: 3,
                    class: "svg",
                    style: normalizeStyle({ fill: ColorStyle$1[message.mode] }),
                    viewBox: "64 64 896 896",
                    "data-icon": "exclamation-circle",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, _hoisted_9$3, 4)) : createCommentVNode("", true),
                  createElementVNode("p", _hoisted_10$3, toDisplayString(message.content), 1)
                ], 40, _hoisted_1$d)) : createCommentVNode("", true)
              ]),
              _: 2
            }, 1024))
          ]);
        }), 128))
      ], 4);
    };
  }
});
const Message_vue_vue_type_style_index_0_scoped_c86bd983_lang = "";
const Message = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-c86bd983"]]);
Message.install = (app) => {
  app.component(Message.__name, Message);
};
const _withScopeId$5 = (n) => (pushScopeId("data-v-4aa7e0ff"), n = n(), popScopeId(), n);
const _hoisted_1$c = ["onClick"];
const _hoisted_2$a = { class: "m-modal-content" };
const _hoisted_3$6 = { class: "m-spin-dot" };
const _hoisted_4$5 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_5$3 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_6$3 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_7$3 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_8$2 = [
  _hoisted_4$5,
  _hoisted_5$3,
  _hoisted_6$3,
  _hoisted_7$3
];
const _hoisted_9$2 = { class: "m-body" };
const _hoisted_10$2 = { class: "m-title" };
const _hoisted_11$2 = {
  key: 0,
  class: "u-icon question"
};
const _hoisted_12$2 = {
  key: 0,
  class: "u-icon info"
};
const _hoisted_13$2 = {
  key: 1,
  class: "u-icon success"
};
const _hoisted_14$2 = {
  key: 2,
  class: "u-icon error"
};
const _hoisted_15$2 = {
  key: 3,
  class: "u-icon warning"
};
const _hoisted_16$2 = { class: "u-title" };
const _hoisted_17$1 = { class: "u-content" };
const _hoisted_18$1 = { class: "m-btns" };
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "Modal",
  props: {
    // 运行时声明
    title: {
      // 标题描述
      type: String,
      default: "Do you Want to delete these items ?"
    },
    content: {
      // 内容描述
      type: String,
      default: "Some descriptions"
    },
    width: {
      // 提示窗口宽度
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
      // 确认对话框：confirm  信息提示框：info
      type: String,
      default: "confirm"
    },
    type: {
      // confirm mode: 'confirm', 'delete'   info mode: 'info', 'success', 'error', 'warning'
      type: String,
      default: "confirm"
    },
    center: {
      // 水平垂直居中：true  固定高度水平居中：false
      type: Boolean,
      default: true
    },
    loading: {
      // 加载中...
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
      return openBlock(), createElementBlock("div", {
        class: "m-modal-mask",
        onClick: withModifiers(onBlur, ["self"])
      }, [
        createElementVNode("div", {
          class: normalizeClass(["m-modal", __props.center ? "relative-hv-center" : "top-center"]),
          style: normalizeStyle(`width: ${__props.width}px;`)
        }, [
          createElementVNode("div", _hoisted_2$a, [
            withDirectives(createElementVNode("div", _hoisted_3$6, _hoisted_8$2, 512), [
              [vShow, __props.loading]
            ]),
            createElementVNode("div", {
              class: normalizeClass(["m-modal-body", { "loading": __props.loading }])
            }, [
              createElementVNode("div", _hoisted_9$2, [
                createElementVNode("div", _hoisted_10$2, [
                  __props.mode === "confirm" ? (openBlock(), createElementBlock("span", _hoisted_11$2, "?")) : createCommentVNode("", true),
                  __props.mode === "info" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    __props.type === "info" ? (openBlock(), createElementBlock("span", _hoisted_12$2, "!")) : createCommentVNode("", true),
                    __props.type === "success" ? (openBlock(), createElementBlock("span", _hoisted_13$2, "✓")) : createCommentVNode("", true),
                    __props.type === "error" ? (openBlock(), createElementBlock("span", _hoisted_14$2, "×")) : createCommentVNode("", true),
                    __props.type === "warning" ? (openBlock(), createElementBlock("span", _hoisted_15$2, "!")) : createCommentVNode("", true)
                  ], 64)) : createCommentVNode("", true),
                  createElementVNode("div", _hoisted_16$2, toDisplayString(__props.title), 1)
                ]),
                createElementVNode("div", _hoisted_17$1, toDisplayString(__props.content), 1)
              ]),
              createElementVNode("div", _hoisted_18$1, [
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
          ])
        ], 6)
      ], 8, _hoisted_1$c);
    };
  }
});
const Modal_vue_vue_type_style_index_0_scoped_4aa7e0ff_lang = "";
const Modal = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-4aa7e0ff"]]);
Modal.install = (app) => {
  app.component(Modal.__name, Modal);
};
const _withScopeId$4 = (n) => (pushScopeId("data-v-eab91dfd"), n = n(), popScopeId(), n);
const _hoisted_1$b = ["onMouseenter", "onMouseleave"];
const _hoisted_2$9 = ["fill"];
const _hoisted_3$5 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
const _hoisted_4$4 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("path", { d: "M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" }, null, -1));
const _hoisted_5$2 = [
  _hoisted_3$5,
  _hoisted_4$4
];
const _hoisted_6$2 = ["fill"];
const _hoisted_7$2 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("path", { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1));
const _hoisted_8$1 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
const _hoisted_9$1 = [
  _hoisted_7$2,
  _hoisted_8$1
];
const _hoisted_10$1 = ["fill"];
const _hoisted_11$1 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
const _hoisted_12$1 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("path", { d: "M464 688a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1));
const _hoisted_13$1 = [
  _hoisted_11$1,
  _hoisted_12$1
];
const _hoisted_14$1 = ["fill"];
const _hoisted_15$1 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("path", { d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" }, null, -1));
const _hoisted_16$1 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
const _hoisted_17 = [
  _hoisted_15$1,
  _hoisted_16$1
];
const _hoisted_18 = ["onClick"];
const _hoisted_19 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1));
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
const _sfc_main$b = /* @__PURE__ */ defineComponent({
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
        resetTimer.value = setTimeout(() => {
          hideIndex.value.splice(0);
          notificationData.value.splice(0);
        }, 500);
      }
    });
    function onEnter(index) {
      clearTimeout(hideTimers.value[index]);
      hideTimers.value[index] = null;
    }
    function onLeave(index) {
      if (props.duration) {
        hideTimers.value[index] = setTimeout(() => {
          onClose(index);
        }, props.duration);
      }
    }
    function show() {
      clearTimeout(resetTimer.value);
      hideTimers.value.push(null);
      const index = notificationData.value.length - 1;
      if (props.duration) {
        hideTimers.value[index] = setTimeout(() => {
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
        createVNode(TransitionGroup, {
          name: "slide-fade",
          tag: "div"
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(notificationData.value, (data, index) => {
              return withDirectives((openBlock(), createElementBlock("div", {
                class: "m-notification",
                onMouseenter: ($event) => onEnter(index),
                onMouseleave: ($event) => onLeave(index),
                key: `n${index}`
              }, [
                data.mode === "info" ? (openBlock(), createElementBlock("svg", {
                  key: 0,
                  class: "u-status-svg",
                  fill: ColorStyle[data.mode],
                  viewBox: "64 64 896 896",
                  "data-icon": "info-circle",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_5$2, 8, _hoisted_2$9)) : createCommentVNode("", true),
                data.mode === "success" ? (openBlock(), createElementBlock("svg", {
                  key: 1,
                  class: "u-status-svg",
                  fill: ColorStyle[data.mode],
                  viewBox: "64 64 896 896",
                  "data-icon": "check-circle",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_9$1, 8, _hoisted_6$2)) : createCommentVNode("", true),
                data.mode === "warn" ? (openBlock(), createElementBlock("svg", {
                  key: 2,
                  class: "u-status-svg",
                  fill: ColorStyle[data.mode],
                  viewBox: "64 64 896 896",
                  "data-icon": "exclamation-circle",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_13$1, 8, _hoisted_10$1)) : createCommentVNode("", true),
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
                }, toDisplayString(index + data.notification || "--"), 3),
                (openBlock(), createElementBlock("svg", {
                  class: "u-close",
                  onClick: ($event) => onClose(index),
                  viewBox: "64 64 896 896",
                  "data-icon": "close",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_20, 8, _hoisted_18))
              ], 40, _hoisted_1$b)), [
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
const Notification_vue_vue_type_style_index_0_scoped_eab91dfd_lang = "";
const Notification = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-eab91dfd"]]);
Notification.install = (app) => {
  app.component(Notification.__name, Notification);
};
const _withScopeId$3 = (n) => (pushScopeId("data-v-47fb5a25"), n = n(), popScopeId(), n);
const _hoisted_1$a = { class: "m-pagination-wrap" };
const _hoisted_2$8 = {
  key: 0,
  class: "mr8"
};
const _hoisted_3$4 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-arrow",
  viewBox: "64 64 896 896",
  "data-icon": "left",
  "aria-hidden": "true",
  focusable: "false"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })
], -1));
const _hoisted_4$3 = [
  _hoisted_3$4
];
const _hoisted_5$1 = { class: "u-ellipsis" };
const _hoisted_6$1 = {
  class: "u-icon",
  viewBox: "64 64 896 896",
  "data-icon": "double-left",
  "aria-hidden": "true",
  focusable: "false"
};
const _hoisted_7$1 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("path", { d: "M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" }, null, -1));
const _hoisted_8 = [
  _hoisted_7$1
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
const _hoisted_12 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("path", { d: "M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" }, null, -1));
const _hoisted_13 = [
  _hoisted_12
];
const _hoisted_14 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("svg", {
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
const _sfc_main$a = /* @__PURE__ */ defineComponent({
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
        createElementVNode("div", _hoisted_1$a, [
          __props.showTotal ? (openBlock(), createElementBlock("span", _hoisted_2$8, "共 " + toDisplayString(unref(totalPage)) + " 页 / " + toDisplayString(__props.total) + " 条", 1)) : createCommentVNode("", true),
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
const Pagination_vue_vue_type_style_index_0_scoped_47fb5a25_lang = "";
const Pagination = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-47fb5a25"]]);
Pagination.install = (app) => {
  app.component(Pagination.__name, Pagination);
};
const _hoisted_1$9 = ["onClick"];
const _hoisted_2$7 = { class: "u-label" };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
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
            createElementVNode("span", _hoisted_2$7, toDisplayString(option.label), 1)
          ], 14, _hoisted_1$9);
        }), 128))
      ], 2);
    };
  }
});
const Radio_vue_vue_type_style_index_0_scoped_8d631e03_lang = "";
const Radio = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-8d631e03"]]);
Radio.install = (app) => {
  app.component(Radio.__name, Radio);
};
const _withScopeId$2 = (n) => (pushScopeId("data-v-e1d11167"), n = n(), popScopeId(), n);
const _hoisted_1$8 = ["title"];
const _hoisted_2$6 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1));
const _hoisted_3$3 = [
  _hoisted_2$6
];
const _hoisted_4$2 = ["onClick"];
const _hoisted_5 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1));
const _hoisted_6 = [
  _hoisted_5
];
const _hoisted_7 = ["title", "onMouseenter", "onClick"];
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Select",
  props: {
    options: {
      // 选项数据
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
    placeholder: {
      // 下拉框默认文字
      type: String,
      default: "请选择"
    },
    disabled: {
      // 是否禁用下拉
      type: Boolean,
      default: false
    },
    allowClear: {
      // 是否支持清楚
      type: Boolean,
      default: false
    },
    width: {
      // 下拉框宽度
      type: Number,
      default: 200
    },
    height: {
      // 下拉框高度
      type: Number,
      default: 36
    },
    num: {
      // 下拉面板最多能展示的下拉项数，超过后滚动显示
      type: Number,
      default: 6
    },
    selectedValue: {
      // v-model当前选中的option
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
      if (props.allowClear) {
        showClose.value = true;
      }
    }
    function onInputLeave() {
      if (props.allowClear) {
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
          }, toDisplayString(selectedName.value || __props.placeholder), 15, _hoisted_1$8),
          createVNode(TransitionGroup, {
            name: "fade-svg",
            tag: "div"
          }, {
            default: withCtx(() => [
              !showClose.value ? (openBlock(), createElementBlock("svg", {
                onClick: openSelect,
                key: "1",
                class: normalizeClass(["triangle", { "rotate": showOptions.value }]),
                viewBox: "64 64 896 896",
                "data-icon": "down",
                "aria-hidden": "true",
                focusable: "false"
              }, _hoisted_3$3, 2)) : (openBlock(), createElementBlock("svg", {
                onClick: withModifiers(onClear, ["stop"]),
                key: "2",
                class: "close",
                focusable: "false",
                "data-icon": "close-circle",
                "aria-hidden": "true",
                viewBox: "64 64 896 896"
              }, _hoisted_6, 8, _hoisted_4$2))
            ]),
            _: 1
          })
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
                }, toDisplayString(option[__props.label]), 43, _hoisted_7);
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
const Select_vue_vue_type_style_index_0_scoped_e1d11167_lang = "";
const Select = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-e1d11167"]]);
Select.install = (app) => {
  app.component(Select.__name, Select);
};
const _hoisted_1$7 = ["onClick"];
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "Slider",
  props: {
    width: {
      // 滑动输入条在页面中的宽度
      type: Number,
      default: 600
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
    const scale = computed(() => {
      return props.width / (props.max - props.min);
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
      getPosition();
    });
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
        clearTimeout(timer.value);
        timer.value = null;
      } else {
        transition.value = true;
      }
      timer.value = setTimeout(() => {
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
        console.log(e.clientX);
        var moveX = e.clientX - leftX;
        if (moveX > props.width) {
          right.value = props.width;
        } else if (left.value <= moveX && moveX <= props.width) {
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
        style: normalizeStyle(`width: ${__props.width}px;`)
      }, [
        createElementVNode("div", {
          class: "u-slider-rail",
          onClick: withModifiers(onClickPoint, ["self"])
        }, null, 8, _hoisted_1$7),
        createElementVNode("div", {
          class: normalizeClass(["u-slider-track", { trackTransition: transition.value }]),
          style: normalizeStyle(`left: ${left.value}px; right: auto; width: ${right.value - left.value}px;`)
        }, null, 6),
        __props.range ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["u-slider-handle", { handleTransition: transition.value }]),
          tabindex: "0",
          onMousedown: onLeftMouseDown,
          style: normalizeStyle(`left: ${left.value}px; right: auto; transform: translateX(-50%);`)
        }, null, 38)) : createCommentVNode("", true),
        createElementVNode("div", {
          class: normalizeClass(["u-slider-handle", { handleTransition: transition.value }]),
          tabindex: "0",
          onMousedown: onRightMouseDown,
          style: normalizeStyle(`left: ${right.value}px; right: auto; transform: translateX(-50%);`)
        }, null, 38)
      ], 6);
    };
  }
});
const Slider_vue_vue_type_style_index_0_scoped_ad902f4d_lang = "";
const Slider = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-ad902f4d"]]);
Slider.install = (app) => {
  app.component(Slider.__name, Slider);
};
const _hoisted_1$6 = { class: "m-spin" };
const _hoisted_2$5 = { class: "m-spin-box" };
const _hoisted_3$2 = /* @__PURE__ */ createStaticVNode('<div class="m-spin-dot" data-v-a6fc638a><span class="u-dot-item" data-v-a6fc638a></span><span class="u-dot-item" data-v-a6fc638a></span><span class="u-dot-item" data-v-a6fc638a></span><span class="u-dot-item" data-v-a6fc638a></span></div>', 1);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
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
        withDirectives(createElementVNode("div", _hoisted_1$6, [
          createElementVNode("div", _hoisted_2$5, [
            _hoisted_3$2,
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
const Spin_vue_vue_type_style_index_0_scoped_a6fc638a_lang = "";
const Spin = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-a6fc638a"]]);
Spin.install = (app) => {
  app.component(Spin.__name, Spin);
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
const _hoisted_1$5 = ["href", "target"];
const _hoisted_2$4 = ["src", "alt"];
const _hoisted_3$1 = ["href", "target"];
const _hoisted_4$1 = ["src", "alt"];
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
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
    mode: {
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
      // 自动切换的时间间隔，mode: banner时生效
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
      if (props.mode === "carousel") {
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
        __props.mode === "banner" ? (openBlock(), createBlock(unref(Swiper$1), mergeProps({
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
                    }, null, 12, _hoisted_2$4)
                  ], 8, _hoisted_1$5),
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
        __props.mode === "carousel" ? (openBlock(), createBlock(unref(Swiper$1), mergeProps({
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
                    }, null, 12, _hoisted_4$1)
                  ], 8, _hoisted_3$1),
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
const Swiper_vue_vue_type_style_index_0_scoped_10c139d5_lang = "";
const Swiper = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-10c139d5"]]);
Swiper.install = (app) => {
  app.component(Swiper.__name, Swiper);
};
const _hoisted_1$4 = { class: "m-switch-wrap" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
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
const Switch_vue_vue_type_style_index_0_scoped_80338676_lang = "";
const Switch = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-80338676"]]);
Switch.install = (app) => {
  app.component(Switch.__name, Switch);
};
const _hoisted_1$3 = ["title", "href", "target", "onClick"];
const _hoisted_2$3 = ["title", "href", "target", "onClick"];
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
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
    const fpsRaf = ref();
    const moveRaf = ref();
    const start = ref(0);
    const end = ref(0);
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
    function getFPS(timestamp) {
      if (fpsRaf.value === 5) {
        start.value = timestamp;
      }
      if (fpsRaf.value === 6) {
        end.value = timestamp;
        fps.value = Math.floor(1e3 / (end.value - start.value));
        console.log("fps:", fps.value);
        console.log("step:", step.value);
      }
      fpsRaf.value = requestAnimationFrame(getFPS);
      if (fpsRaf.value > 6) {
        cancelAnimationFrame(fpsRaf.value);
        distance.value = getDistance();
        onStart();
      }
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
      moveRaf.value = requestAnimationFrame(moveLeft);
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
        fpsRaf.value = requestAnimationFrame(getFPS);
      }
    });
    function onStart() {
      if (props.vertical) {
        if (len.value > 1) {
          startMove();
        }
      } else {
        if (textData.value.length > props.amount) {
          moveRaf.value = requestAnimationFrame(moveLeft);
        }
      }
    }
    function onStop() {
      if (props.vertical) {
        if (len.value > 1) {
          cancelAnimationFrame(timer.id);
        }
      } else {
        cancelAnimationFrame(moveRaf.value);
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
          }, toDisplayString(text.title || "--"), 13, _hoisted_1$3);
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
const TextScroll_vue_vue_type_style_index_0_scoped_fce94f9d_lang = "";
const TextScroll = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-fce94f9d"]]);
TextScroll.install = (app) => {
  app.component(TextScroll.__name, TextScroll);
};
const _withScopeId$1 = (n) => (pushScopeId("data-v-43a7f53c"), n = n(), popScopeId(), n);
const _hoisted_1$2 = { class: "u-title" };
const _hoisted_2$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("div", { class: "u-arrow" }, null, -1));
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
    onUpdated(() => {
      getPosition();
    });
    function getPosition() {
      const rect = contentRef.value.getBoundingClientRect();
      const targetTop = rect.top + window.pageYOffset;
      const targetLeft = rect.left + window.pageXOffset;
      const targetWidth = rect.width;
      const titleWidth = titleRef.value.offsetWidth;
      const titleHeight = titleRef.value.offsetHeight;
      top.value = targetTop - titleHeight;
      left.value = targetLeft - (titleWidth - targetWidth) / 2;
    }
    function onShow() {
      clearTimeout(hideTimer.value);
      visible.value = true;
    }
    function onHide() {
      hideTimer.value = setTimeout(() => {
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
          createElementVNode("div", _hoisted_1$2, [
            renderSlot(_ctx.$slots, "title", {}, () => [
              createTextVNode(toDisplayString(__props.title), 1)
            ], true)
          ]),
          _hoisted_2$2
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
const Tooltip_vue_vue_type_style_index_0_scoped_43a7f53c_lang = "";
const Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-43a7f53c"]]);
Tooltip.install = (app) => {
  app.component(Tooltip.__name, Tooltip);
};
const _withScopeId = (n) => (pushScopeId("data-v-19a2828d"), n = n(), popScopeId(), n);
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
const Waterfall_vue_vue_type_style_index_0_scoped_e6dc8516_lang = "";
const Waterfall = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e6dc8516"]]);
Waterfall.install = (app) => {
  app.component(Waterfall.__name, Waterfall);
};
const components = [
  Breadcrumb,
  Button,
  Cascader,
  Checkbox,
  Countdown,
  DatePicker,
  Dialog,
  Message,
  Modal,
  Notification,
  Pagination,
  Radio,
  Select,
  Slider,
  Spin,
  Swiper,
  Switch,
  TextScroll,
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
  Cascader,
  Checkbox,
  Countdown,
  DatePicker,
  Dialog,
  Message,
  Modal,
  Notification,
  Pagination,
  Radio,
  Select,
  Slider,
  Spin,
  Swiper,
  Switch,
  TextScroll,
  Tooltip,
  Video,
  Waterfall,
  cancelAnimationFrame,
  VueAmazingUI as default,
  rafTimeout,
  requestAnimationFrame
};
