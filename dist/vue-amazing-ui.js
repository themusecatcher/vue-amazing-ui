import { defineComponent, computed, openBlock, createElementBlock, normalizeStyle, Fragment, renderList, createElementVNode, normalizeClass, unref, toDisplayString, createCommentVNode, pushScopeId, popScopeId, resolveComponent, createBlock, withCtx, renderSlot, createTextVNode, withModifiers, ref, watch, onMounted, createVNode, reactive, useSlots, toRef, onUnmounted, mergeProps, isRef, createSlots, normalizeProps, guardReactiveProps, resolveDynamicComponent, Teleport, withKeys, Transition, nextTick as nextTick$1, withDirectives, vShow, onBeforeUpdate, getCurrentScope, onScopeDispose, TransitionGroup, vModelText, createStaticVNode, h, onUpdated, provide, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
const _withScopeId$8 = (n) => (pushScopeId("data-v-9d95a75c"), n = n(), popScopeId(), n);
const _hoisted_1$g = ["onClick", "title"];
const _hoisted_2$e = {
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
const _sfc_main$i = /* @__PURE__ */ defineComponent({
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
              onClick: ($event) => index === unref(len) - 1 ? (e2) => e2.preventDefault() : goRouter(route),
              title: route.name
            }, toDisplayString(route.name || "--"), 11, _hoisted_1$g),
            index !== unref(len) - 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              __props.separator ? (openBlock(), createElementBlock("span", _hoisted_2$e, toDisplayString(__props.separator), 1)) : (openBlock(), createElementBlock("svg", _hoisted_3$b, _hoisted_5$6))
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
const Breadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-9d95a75c"]]);
Breadcrumb.install = (app) => {
  app.component(Breadcrumb.__name, Breadcrumb);
};
const _hoisted_1$f = ["disabled"];
const _sfc_main$h = /* @__PURE__ */ defineComponent({
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
        ], 14, _hoisted_1$f))
      ], 2);
    };
  }
});
const Button_vue_vue_type_style_index_0_scoped_c6861aa2_lang = "";
const Button = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-c6861aa2"]]);
Button.install = (app) => {
  app.component(Button.__name, Button);
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
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
      for (let i2 = 0; i2 < len; i2++) {
        if (options[i2][props.value] === props.selectedValue[index]) {
          return options[i2][props.children] || [];
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
      for (let i2 = 0; i2 < len; i2++) {
        if (options[i2][props.value] === props.selectedValue[index]) {
          return options[i2][props.label];
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
const Cascader = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-3936cf14"]]);
Cascader.install = (app) => {
  app.component(Cascader.__name, Cascader);
};
const _hoisted_1$e = ["onClick"];
const _hoisted_2$d = { class: "u-label" };
const _hoisted_3$a = { class: "u-label" };
const _sfc_main$f = /* @__PURE__ */ defineComponent({
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
    function onClick2(value) {
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
            onClick: ($event) => __props.disabled || option.disabled ? (e2) => e2.preventDefault() : onClick2(option.value),
            key: index
          }, [
            createElementVNode("span", {
              class: normalizeClass(["u-checkbox", { "u-checkbox-checked": checkedValue.value.includes(option.value) }])
            }, null, 2),
            createElementVNode("span", _hoisted_2$d, [
              renderSlot(_ctx.$slots, "default", {
                label: option.label
              }, () => [
                createTextVNode(toDisplayString(option.label), 1)
              ], true)
            ])
          ], 14, _hoisted_1$e);
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
const Checkbox = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-2e6d02dd"]]);
Checkbox.install = (app) => {
  app.component(Checkbox.__name, Checkbox);
};
const _hoisted_1$d = { class: "m-countdown" };
const _hoisted_2$c = { class: "u-title" };
const _hoisted_3$9 = { class: "u-time" };
const _hoisted_4$8 = { key: 2 };
const _sfc_main$e = /* @__PURE__ */ defineComponent({
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
        var s3 = time;
      } else {
        var s3 = 0;
      }
      if (showTime2.includes("m")) {
        s3 = s3 % 60;
        var m3 = Math.floor((time - s3) / 60);
      } else {
        var m3 = 0;
      }
      if (showTime2.includes("H")) {
        m3 = m3 % 60;
        var H3 = Math.floor((time - s3 - m3 * 60) / 60 / 60);
      } else {
        var H3 = 0;
      }
      if (showTime2.includes("D")) {
        H3 = H3 % 24;
        var D2 = Math.floor((time - s3 - m3 * 60 - H3 * 60 * 60) / 60 / 60 / 24);
      } else {
        var D2 = 0;
      }
      if (showTime2.includes("M")) {
        D2 = D2 % 30;
        var M3 = Math.floor((time - s3 - m3 * 60 - H3 * 60 * 60 - D2 * 24 * 60 * 60) / 60 / 60 / 24 / 30);
      } else {
        var M3 = 0;
      }
      if (showTime2.includes("Y")) {
        M3 = M3 % 12;
        var Y2 = Math.floor((time - s3 - m3 * 60 - H3 * 60 * 60 - D2 * 24 * 60 * 60 - M3 * 30 * 24 * 60 * 60) / 60 / 60 / 24 / 30 / 12);
      } else {
        var Y2 = 0;
      }
      showTime2 = showTime2.includes("ss") ? showTime2.replace("ss", fixedTwo(s3)) : showTime2.replace("s", String(s3));
      showTime2 = showTime2.includes("mm") ? showTime2.replace("mm", fixedTwo(m3)) : showTime2.replace("m", String(m3));
      showTime2 = showTime2.includes("HH") ? showTime2.replace("HH", fixedTwo(H3)) : showTime2.replace("H", String(H3));
      showTime2 = showTime2.includes("DD") ? showTime2.replace("DD", fixedTwo(D2)) : showTime2.replace("D", String(D2));
      showTime2 = showTime2.includes("MM") ? showTime2.replace("MM", fixedTwo(M3)) : showTime2.replace("M", String(M3));
      showTime2 = showTime2.includes("YY") ? showTime2.replace("YY", fixedTwo(Y2)) : showTime2.replace("Y", String(Y2));
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
      return openBlock(), createElementBlock("div", _hoisted_1$d, [
        renderSlot(_ctx.$slots, "title", {}, () => [
          createElementVNode("p", _hoisted_2$c, toDisplayString(props.title), 1)
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
const Countdown = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-2f02a0b2"]]);
Countdown.install = (app) => {
  app.component(Countdown.__name, Countdown);
};
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }
  var number = Number(dirtyNumber);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
  }
}
function _typeof$B(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$B = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$B = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$B(obj);
}
function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || _typeof$B(argument) === "object" && argStr === "[object Date]") {
    return new Date(argument.getTime());
  } else if (typeof argument === "number" || argStr === "[object Number]") {
    return new Date(argument);
  } else {
    if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
      console.warn(new Error().stack);
    }
    return new Date(NaN);
  }
}
function addDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);
  if (isNaN(amount)) {
    return new Date(NaN);
  }
  if (!amount) {
    return date;
  }
  date.setDate(date.getDate() + amount);
  return date;
}
function addMonths(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);
  if (isNaN(amount)) {
    return new Date(NaN);
  }
  if (!amount) {
    return date;
  }
  var dayOfMonth = date.getDate();
  var endOfDesiredMonth = new Date(date.getTime());
  endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
  var daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    return endOfDesiredMonth;
  } else {
    date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
    return date;
  }
}
function _typeof$A(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$A = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$A = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$A(obj);
}
function add(dirtyDate, duration) {
  requiredArgs(2, arguments);
  if (!duration || _typeof$A(duration) !== "object")
    return new Date(NaN);
  var years = duration.years ? toInteger(duration.years) : 0;
  var months = duration.months ? toInteger(duration.months) : 0;
  var weeks = duration.weeks ? toInteger(duration.weeks) : 0;
  var days = duration.days ? toInteger(duration.days) : 0;
  var hours = duration.hours ? toInteger(duration.hours) : 0;
  var minutes = duration.minutes ? toInteger(duration.minutes) : 0;
  var seconds = duration.seconds ? toInteger(duration.seconds) : 0;
  var date = toDate(dirtyDate);
  var dateWithMonths = months || years ? addMonths(date, months + years * 12) : date;
  var dateWithDays = days || weeks ? addDays(dateWithMonths, days + weeks * 7) : dateWithMonths;
  var minutesToAdd = minutes + hours * 60;
  var secondsToAdd = seconds + minutesToAdd * 60;
  var msToAdd = secondsToAdd * 1e3;
  var finalDate = new Date(dateWithDays.getTime() + msToAdd);
  return finalDate;
}
function addMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var timestamp = toDate(dirtyDate).getTime();
  var amount = toInteger(dirtyAmount);
  return new Date(timestamp + amount);
}
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function startOfWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}
function startOfISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  return startOfWeek(dirtyDate, {
    weekStartsOn: 1
  });
}
function getISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  var startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  var startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var year = getISOWeekYear(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  var date = startOfISOWeek(fourthOfJanuary);
  return date;
}
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}
function startOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}
var MILLISECONDS_IN_DAY$1 = 864e5;
function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var startOfDayLeft = startOfDay(dirtyDateLeft);
  var startOfDayRight = startOfDay(dirtyDateRight);
  var timestampLeft = startOfDayLeft.getTime() - getTimezoneOffsetInMilliseconds(startOfDayLeft);
  var timestampRight = startOfDayRight.getTime() - getTimezoneOffsetInMilliseconds(startOfDayRight);
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY$1);
}
function addYears(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMonths(dirtyDate, amount * 12);
}
var millisecondsInMinute = 6e4;
var millisecondsInHour = 36e5;
var millisecondsInSecond = 1e3;
function _typeof$z(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$z = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$z = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$z(obj);
}
function isDate(value) {
  requiredArgs(1, arguments);
  return value instanceof Date || _typeof$z(value) === "object" && Object.prototype.toString.call(value) === "[object Date]";
}
function isValid(dirtyDate) {
  requiredArgs(1, arguments);
  if (!isDate(dirtyDate) && typeof dirtyDate !== "number") {
    return false;
  }
  var date = toDate(dirtyDate);
  return !isNaN(Number(date));
}
function eachDayOfInterval(dirtyInterval, options) {
  var _options$step;
  requiredArgs(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = toDate(interval.start);
  var endDate = toDate(interval.end);
  var endTime = endDate.getTime();
  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError("Invalid interval");
  }
  var dates = [];
  var currentDate = startDate;
  currentDate.setHours(0, 0, 0, 0);
  var step = Number((_options$step = options === null || options === void 0 ? void 0 : options.step) !== null && _options$step !== void 0 ? _options$step : 1);
  if (step < 1 || isNaN(step))
    throw new RangeError("`options.step` must be a number greater than 1");
  while (currentDate.getTime() <= endTime) {
    dates.push(toDate(currentDate));
    currentDate.setDate(currentDate.getDate() + step);
    currentDate.setHours(0, 0, 0, 0);
  }
  return dates;
}
function endOfWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  date.setDate(date.getDate() + diff);
  date.setHours(23, 59, 59, 999);
  return date;
}
function subMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMilliseconds(dirtyDate, -amount);
}
var MILLISECONDS_IN_DAY = 864e5;
function getUTCDayOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var timestamp = date.getTime();
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date.getTime();
  var difference = timestamp - startOfYearTimestamp;
  return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
}
function startOfUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var weekStartsOn = 1;
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
function getUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var year = getUTCISOWeekYear(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setUTCFullYear(year, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCISOWeek(fourthOfJanuary);
  return date;
}
var MILLISECONDS_IN_WEEK$3 = 6048e5;
function getUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCISOWeek(date).getTime() - startOfUTCISOWeekYear(date).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK$3) + 1;
}
function startOfUTCWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
function getUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var firstWeekOfNextYear = new Date(0);
  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, options);
  var firstWeekOfThisYear = new Date(0);
  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, options);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  var year = getUTCWeekYear(dirtyDate, options);
  var firstWeek = new Date(0);
  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCWeek(firstWeek, options);
  return date;
}
var MILLISECONDS_IN_WEEK$2 = 6048e5;
function getUTCWeek(dirtyDate, options) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCWeek(date, options).getTime() - startOfUTCWeekYear(date, options).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK$2) + 1;
}
function addLeadingZeros(number, targetLength) {
  var sign = number < 0 ? "-" : "";
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = "0" + output;
  }
  return sign + output;
}
var formatters$2 = {
  // Year
  y: function y(date, token) {
    var signedYear = date.getUTCFullYear();
    var year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  // Month
  M: function M(date, token) {
    var month = date.getUTCMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d: function d(date, token) {
    return addLeadingZeros(date.getUTCDate(), token.length);
  },
  // AM or PM
  a: function a(date, token) {
    var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h: function h2(date, token) {
    return addLeadingZeros(date.getUTCHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H: function H(date, token) {
    return addLeadingZeros(date.getUTCHours(), token.length);
  },
  // Minute
  m: function m(date, token) {
    return addLeadingZeros(date.getUTCMinutes(), token.length);
  },
  // Second
  s: function s(date, token) {
    return addLeadingZeros(date.getUTCSeconds(), token.length);
  },
  // Fraction of second
  S: function S(date, token) {
    var numberOfDigits = token.length;
    var milliseconds = date.getUTCMilliseconds();
    var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};
const formatters$3 = formatters$2;
var dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
var formatters = {
  // Era
  G: function G(date, token, localize2) {
    var era = date.getUTCFullYear() > 0 ? 1 : 0;
    switch (token) {
      case "G":
      case "GG":
      case "GGG":
        return localize2.era(era, {
          width: "abbreviated"
        });
      case "GGGGG":
        return localize2.era(era, {
          width: "narrow"
        });
      case "GGGG":
      default:
        return localize2.era(era, {
          width: "wide"
        });
    }
  },
  // Year
  y: function y2(date, token, localize2) {
    if (token === "yo") {
      var signedYear = date.getUTCFullYear();
      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize2.ordinalNumber(year, {
        unit: "year"
      });
    }
    return formatters$3.y(date, token);
  },
  // Local week-numbering year
  Y: function Y(date, token, localize2, options) {
    var signedWeekYear = getUTCWeekYear(date, options);
    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      var twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize2.ordinalNumber(weekYear, {
        unit: "year"
      });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function R(date, token) {
    var isoWeekYear = getUTCISOWeekYear(date);
    return addLeadingZeros(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function u(date, token) {
    var year = date.getUTCFullYear();
    return addLeadingZeros(year, token.length);
  },
  // Quarter
  Q: function Q(date, token, localize2) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      case "Q":
        return String(quarter);
      case "QQ":
        return addLeadingZeros(quarter, 2);
      case "Qo":
        return localize2.ordinalNumber(quarter, {
          unit: "quarter"
        });
      case "QQQ":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function q(date, token, localize2) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      case "q":
        return String(quarter);
      case "qq":
        return addLeadingZeros(quarter, 2);
      case "qo":
        return localize2.ordinalNumber(quarter, {
          unit: "quarter"
        });
      case "qqq":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function M2(date, token, localize2) {
    var month = date.getUTCMonth();
    switch (token) {
      case "M":
      case "MM":
        return formatters$3.M(date, token);
      case "Mo":
        return localize2.ordinalNumber(month + 1, {
          unit: "month"
        });
      case "MMM":
        return localize2.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return localize2.month(month, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return localize2.month(month, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone month
  L: function L(date, token, localize2) {
    var month = date.getUTCMonth();
    switch (token) {
      case "L":
        return String(month + 1);
      case "LL":
        return addLeadingZeros(month + 1, 2);
      case "Lo":
        return localize2.ordinalNumber(month + 1, {
          unit: "month"
        });
      case "LLL":
        return localize2.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return localize2.month(month, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return localize2.month(month, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Local week of year
  w: function w(date, token, localize2, options) {
    var week = getUTCWeek(date, options);
    if (token === "wo") {
      return localize2.ordinalNumber(week, {
        unit: "week"
      });
    }
    return addLeadingZeros(week, token.length);
  },
  // ISO week of year
  I: function I(date, token, localize2) {
    var isoWeek = getUTCISOWeek(date);
    if (token === "Io") {
      return localize2.ordinalNumber(isoWeek, {
        unit: "week"
      });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  // Day of the month
  d: function d2(date, token, localize2) {
    if (token === "do") {
      return localize2.ordinalNumber(date.getUTCDate(), {
        unit: "date"
      });
    }
    return formatters$3.d(date, token);
  },
  // Day of year
  D: function D(date, token, localize2) {
    var dayOfYear = getUTCDayOfYear(date);
    if (token === "Do") {
      return localize2.ordinalNumber(dayOfYear, {
        unit: "dayOfYear"
      });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  // Day of week
  E: function E(date, token, localize2) {
    var dayOfWeek = date.getUTCDay();
    switch (token) {
      case "E":
      case "EE":
      case "EEE":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function e(date, token, localize2, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "e":
        return String(localDayOfWeek);
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      case "eo":
        return localize2.ordinalNumber(localDayOfWeek, {
          unit: "day"
        });
      case "eee":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function c(date, token, localize2, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "c":
        return String(localDayOfWeek);
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      case "co":
        return localize2.ordinalNumber(localDayOfWeek, {
          unit: "day"
        });
      case "ccc":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function i(date, token, localize2) {
    var dayOfWeek = date.getUTCDay();
    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      case "i":
        return String(isoDayOfWeek);
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      case "io":
        return localize2.ordinalNumber(isoDayOfWeek, {
          unit: "day"
        });
      case "iii":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function a2(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function b(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function B(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function h3(date, token, localize2) {
    if (token === "ho") {
      var hours = date.getUTCHours() % 12;
      if (hours === 0)
        hours = 12;
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return formatters$3.h(date, token);
  },
  // Hour [0-23]
  H: function H2(date, token, localize2) {
    if (token === "Ho") {
      return localize2.ordinalNumber(date.getUTCHours(), {
        unit: "hour"
      });
    }
    return formatters$3.H(date, token);
  },
  // Hour [0-11]
  K: function K(date, token, localize2) {
    var hours = date.getUTCHours() % 12;
    if (token === "Ko") {
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Hour [1-24]
  k: function k(date, token, localize2) {
    var hours = date.getUTCHours();
    if (hours === 0)
      hours = 24;
    if (token === "ko") {
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Minute
  m: function m2(date, token, localize2) {
    if (token === "mo") {
      return localize2.ordinalNumber(date.getUTCMinutes(), {
        unit: "minute"
      });
    }
    return formatters$3.m(date, token);
  },
  // Second
  s: function s2(date, token, localize2) {
    if (token === "so") {
      return localize2.ordinalNumber(date.getUTCSeconds(), {
        unit: "second"
      });
    }
    return formatters$3.s(date, token);
  },
  // Fraction of second
  S: function S2(date, token) {
    return formatters$3.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function X(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      case "XXXXX":
      case "XXX":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function x(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      case "xxxxx":
      case "xxx":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (GMT)
  O: function O(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (specific non-location)
  z: function z(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Seconds timestamp
  t: function t(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = Math.floor(originalDate.getTime() / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function T(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = originalDate.getTime();
    return addLeadingZeros(timestamp, token.length);
  }
};
function formatTimezoneShort(offset, dirtyDelimiter) {
  var sign = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  var delimiter = dirtyDelimiter || "";
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
  if (offset % 60 === 0) {
    var sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, dirtyDelimiter);
}
function formatTimezone(offset, dirtyDelimiter) {
  var delimiter = dirtyDelimiter || "";
  var sign = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
  var minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}
const formatters$1 = formatters;
var dateLongFormatter = function dateLongFormatter2(pattern, formatLong2) {
  switch (pattern) {
    case "P":
      return formatLong2.date({
        width: "short"
      });
    case "PP":
      return formatLong2.date({
        width: "medium"
      });
    case "PPP":
      return formatLong2.date({
        width: "long"
      });
    case "PPPP":
    default:
      return formatLong2.date({
        width: "full"
      });
  }
};
var timeLongFormatter = function timeLongFormatter2(pattern, formatLong2) {
  switch (pattern) {
    case "p":
      return formatLong2.time({
        width: "short"
      });
    case "pp":
      return formatLong2.time({
        width: "medium"
      });
    case "ppp":
      return formatLong2.time({
        width: "long"
      });
    case "pppp":
    default:
      return formatLong2.time({
        width: "full"
      });
  }
};
var dateTimeLongFormatter = function dateTimeLongFormatter2(pattern, formatLong2) {
  var matchResult = pattern.match(/(P+)(p+)?/) || [];
  var datePattern = matchResult[1];
  var timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong2);
  }
  var dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong2.dateTime({
        width: "short"
      });
      break;
    case "PP":
      dateTimeFormat = formatLong2.dateTime({
        width: "medium"
      });
      break;
    case "PPP":
      dateTimeFormat = formatLong2.dateTime({
        width: "long"
      });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong2.dateTime({
        width: "full"
      });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
};
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};
const longFormatters$1 = longFormatters;
var protectedDayOfYearTokens = ["D", "DD"];
var protectedWeekYearTokens = ["YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return protectedDayOfYearTokens.indexOf(token) !== -1;
}
function isProtectedWeekYearToken(token) {
  return protectedWeekYearTokens.indexOf(token) !== -1;
}
function throwProtectedError(token, format2, input) {
  if (token === "YYYY") {
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "YY") {
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "D") {
    throw new RangeError("Use `d` instead of `D` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "DD") {
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  }
}
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
var formatDistance = function formatDistance2(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};
const formatDistance$1 = formatDistance;
function buildFormatLongFn(args) {
  return function() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}
var dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};
const formatLong$1 = formatLong;
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative = function formatRelative2(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};
const formatRelative$1 = formatRelative;
function buildLocalizeFn(args) {
  return function(dirtyIndex, options) {
    var context = options !== null && options !== void 0 && options.context ? String(options.context) : "standalone";
    var valuesArray;
    if (context === "formatting" && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;
      var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }
    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    return valuesArray[index];
  };
}
var eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
var monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};
var dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
};
var dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
var ordinalNumber = function ordinalNumber2(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
var localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};
const localize$1 = localize;
function buildMatchFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}
function buildMatchPatternFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult)
      return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult)
      return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function valueCallback(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: function valueCallback2(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};
const match$1 = match;
var locale = {
  code: "en-US",
  formatDistance: formatDistance$1,
  formatLong: formatLong$1,
  formatRelative: formatRelative$1,
  localize: localize$1,
  match: match$1,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
const defaultLocale = locale;
var formattingTokensRegExp$1 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp$1 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp$1 = /^'([^]*?)'?$/;
var doubleQuoteRegExp$1 = /''/g;
var unescapedLatinCharacterRegExp$1 = /[a-zA-Z]/;
function format(dirtyDate, dirtyFormatStr, options) {
  var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
  requiredArgs(2, arguments);
  var formatStr = String(dirtyFormatStr);
  var defaultOptions2 = getDefaultOptions();
  var locale2 = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions2.locale) !== null && _ref !== void 0 ? _ref : defaultLocale;
  var firstWeekContainsDate = toInteger((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions2.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var weekStartsOn = toInteger((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions2.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions2.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  if (!locale2.localize) {
    throw new RangeError("locale must contain localize property");
  }
  if (!locale2.formatLong) {
    throw new RangeError("locale must contain formatLong property");
  }
  var originalDate = toDate(dirtyDate);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
  var utcDate = subMilliseconds(originalDate, timezoneOffset);
  var formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale: locale2,
    _originalDate: originalDate
  };
  var result = formatStr.match(longFormattingTokensRegExp$1).map(function(substring) {
    var firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      var longFormatter = longFormatters$1[firstCharacter];
      return longFormatter(substring, locale2.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp$1).map(function(substring) {
    if (substring === "''") {
      return "'";
    }
    var firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return cleanEscapedString$1(substring);
    }
    var formatter = formatters$1[firstCharacter];
    if (formatter) {
      if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
      }
      if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
      }
      return formatter(utcDate, substring, locale2.localize, formatterOptions);
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp$1)) {
      throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
    }
    return substring;
  }).join("");
  return result;
}
function cleanEscapedString$1(input) {
  var matched = input.match(escapedStringRegExp$1);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp$1, "'");
}
function assign(target, object) {
  if (target == null) {
    throw new TypeError("assign requires that input parameter not be null or undefined");
  }
  for (var property in object) {
    if (Object.prototype.hasOwnProperty.call(object, property)) {
      target[property] = object[property];
    }
  }
  return target;
}
function getDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var day = date.getDay();
  return day;
}
function getDaysInMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var monthIndex = date.getMonth();
  var lastDayOfMonth = new Date(0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
}
function getHours(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var hours = date.getHours();
  return hours;
}
var MILLISECONDS_IN_WEEK$1 = 6048e5;
function getISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfISOWeek(date).getTime() - startOfISOWeekYear(date).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK$1) + 1;
}
function getMinutes(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var minutes = date.getMinutes();
  return minutes;
}
function getMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var month = date.getMonth();
  return month;
}
function getSeconds(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var seconds = date.getSeconds();
  return seconds;
}
function getWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var firstWeekOfNextYear = new Date(0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  var startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
  var firstWeekOfThisYear = new Date(0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  var startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  var year = getWeekYear(dirtyDate, options);
  var firstWeek = new Date(0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  var date = startOfWeek(firstWeek, options);
  return date;
}
var MILLISECONDS_IN_WEEK = 6048e5;
function getWeek(dirtyDate, options) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfWeek(date, options).getTime() - startOfWeekYear(date, options).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}
function getYear(dirtyDate) {
  requiredArgs(1, arguments);
  return toDate(dirtyDate).getFullYear();
}
function isAfter(dirtyDate, dirtyDateToCompare) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var dateToCompare = toDate(dirtyDateToCompare);
  return date.getTime() > dateToCompare.getTime();
}
function isBefore(dirtyDate, dirtyDateToCompare) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var dateToCompare = toDate(dirtyDateToCompare);
  return date.getTime() < dateToCompare.getTime();
}
function isEqual(dirtyLeftDate, dirtyRightDate) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyLeftDate);
  var dateRight = toDate(dirtyRightDate);
  return dateLeft.getTime() === dateRight.getTime();
}
function _typeof$y(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$y = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$y = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$y(obj);
}
function _inherits$v(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$v(subClass, superClass);
}
function _setPrototypeOf$v(o, p) {
  _setPrototypeOf$v = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$v(o, p);
}
function _createSuper$v(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$v();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$v(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$v(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$v(this, result);
  };
}
function _possibleConstructorReturn$v(self, call) {
  if (call && (_typeof$y(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$v(self);
}
function _assertThisInitialized$v(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$v() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$v(o) {
  _getPrototypeOf$v = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$v(o);
}
function _classCallCheck$w(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$w(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$w(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$w(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$w(Constructor, staticProps);
  return Constructor;
}
function _defineProperty$v(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var TIMEZONE_UNIT_PRIORITY = 10;
var Setter = /* @__PURE__ */ function() {
  function Setter2() {
    _classCallCheck$w(this, Setter2);
    _defineProperty$v(this, "subPriority", 0);
  }
  _createClass$w(Setter2, [{
    key: "validate",
    value: function validate(_utcDate, _options) {
      return true;
    }
  }]);
  return Setter2;
}();
var ValueSetter = /* @__PURE__ */ function(_Setter) {
  _inherits$v(ValueSetter2, _Setter);
  var _super = _createSuper$v(ValueSetter2);
  function ValueSetter2(value, validateValue, setValue, priority, subPriority) {
    var _this;
    _classCallCheck$w(this, ValueSetter2);
    _this = _super.call(this);
    _this.value = value;
    _this.validateValue = validateValue;
    _this.setValue = setValue;
    _this.priority = priority;
    if (subPriority) {
      _this.subPriority = subPriority;
    }
    return _this;
  }
  _createClass$w(ValueSetter2, [{
    key: "validate",
    value: function validate(utcDate, options) {
      return this.validateValue(utcDate, this.value, options);
    }
  }, {
    key: "set",
    value: function set2(utcDate, flags, options) {
      return this.setValue(utcDate, flags, this.value, options);
    }
  }]);
  return ValueSetter2;
}(Setter);
var DateToSystemTimezoneSetter = /* @__PURE__ */ function(_Setter2) {
  _inherits$v(DateToSystemTimezoneSetter2, _Setter2);
  var _super2 = _createSuper$v(DateToSystemTimezoneSetter2);
  function DateToSystemTimezoneSetter2() {
    var _this2;
    _classCallCheck$w(this, DateToSystemTimezoneSetter2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this2 = _super2.call.apply(_super2, [this].concat(args));
    _defineProperty$v(_assertThisInitialized$v(_this2), "priority", TIMEZONE_UNIT_PRIORITY);
    _defineProperty$v(_assertThisInitialized$v(_this2), "subPriority", -1);
    return _this2;
  }
  _createClass$w(DateToSystemTimezoneSetter2, [{
    key: "set",
    value: function set2(date, flags) {
      if (flags.timestampIsSet) {
        return date;
      }
      var convertedDate = new Date(0);
      convertedDate.setFullYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
      convertedDate.setHours(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
      return convertedDate;
    }
  }]);
  return DateToSystemTimezoneSetter2;
}(Setter);
function _classCallCheck$v(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$v(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$v(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$v(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$v(Constructor, staticProps);
  return Constructor;
}
var Parser = /* @__PURE__ */ function() {
  function Parser2() {
    _classCallCheck$v(this, Parser2);
  }
  _createClass$v(Parser2, [{
    key: "run",
    value: function run(dateString, token, match2, options) {
      var result = this.parse(dateString, token, match2, options);
      if (!result) {
        return null;
      }
      return {
        setter: new ValueSetter(result.value, this.validate, this.set, this.priority, this.subPriority),
        rest: result.rest
      };
    }
  }, {
    key: "validate",
    value: function validate(_utcDate, _value, _options) {
      return true;
    }
  }]);
  return Parser2;
}();
function _typeof$x(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$x = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$x = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$x(obj);
}
function _classCallCheck$u(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$u(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$u(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$u(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$u(Constructor, staticProps);
  return Constructor;
}
function _inherits$u(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$u(subClass, superClass);
}
function _setPrototypeOf$u(o, p) {
  _setPrototypeOf$u = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$u(o, p);
}
function _createSuper$u(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$u();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$u(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$u(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$u(this, result);
  };
}
function _possibleConstructorReturn$u(self, call) {
  if (call && (_typeof$x(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$u(self);
}
function _assertThisInitialized$u(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$u() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$u(o) {
  _getPrototypeOf$u = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$u(o);
}
function _defineProperty$u(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var EraParser = /* @__PURE__ */ function(_Parser) {
  _inherits$u(EraParser2, _Parser);
  var _super = _createSuper$u(EraParser2);
  function EraParser2() {
    var _this;
    _classCallCheck$u(this, EraParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$u(_assertThisInitialized$u(_this), "priority", 140);
    _defineProperty$u(_assertThisInitialized$u(_this), "incompatibleTokens", ["R", "u", "t", "T"]);
    return _this;
  }
  _createClass$u(EraParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "G":
        case "GG":
        case "GGG":
          return match2.era(dateString, {
            width: "abbreviated"
          }) || match2.era(dateString, {
            width: "narrow"
          });
        case "GGGGG":
          return match2.era(dateString, {
            width: "narrow"
          });
        case "GGGG":
        default:
          return match2.era(dateString, {
            width: "wide"
          }) || match2.era(dateString, {
            width: "abbreviated"
          }) || match2.era(dateString, {
            width: "narrow"
          });
      }
    }
  }, {
    key: "set",
    value: function set2(date, flags, value) {
      flags.era = value;
      date.setUTCFullYear(value, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return EraParser2;
}(Parser);
var numericPatterns = {
  month: /^(1[0-2]|0?\d)/,
  // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/,
  // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/,
  // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/,
  // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/,
  // 0 to 12
  minute: /^[0-5]?\d/,
  // 0 to 59
  second: /^[0-5]?\d/,
  // 0 to 59
  singleDigit: /^\d/,
  // 0 to 9
  twoDigits: /^\d{1,2}/,
  // 0 to 99
  threeDigits: /^\d{1,3}/,
  // 0 to 999
  fourDigits: /^\d{1,4}/,
  // 0 to 9999
  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/,
  // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/,
  // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/
  // 0 to 9999, -0 to -9999
};
var timezonePatterns = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};
function mapValue(parseFnResult, mapFn) {
  if (!parseFnResult) {
    return parseFnResult;
  }
  return {
    value: mapFn(parseFnResult.value),
    rest: parseFnResult.rest
  };
}
function parseNumericPattern(pattern, dateString) {
  var matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  return {
    value: parseInt(matchResult[0], 10),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseTimezonePattern(pattern, dateString) {
  var matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  if (matchResult[0] === "Z") {
    return {
      value: 0,
      rest: dateString.slice(1)
    };
  }
  var sign = matchResult[1] === "+" ? 1 : -1;
  var hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
  var minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
  var seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;
  return {
    value: sign * (hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * millisecondsInSecond),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseAnyDigitsSigned(dateString) {
  return parseNumericPattern(numericPatterns.anyDigitsSigned, dateString);
}
function parseNDigits(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigit, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigits, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigits, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigits, dateString);
    default:
      return parseNumericPattern(new RegExp("^\\d{1," + n + "}"), dateString);
  }
}
function parseNDigitsSigned(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigitSigned, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigitsSigned, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigitsSigned, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigitsSigned, dateString);
    default:
      return parseNumericPattern(new RegExp("^-?\\d{1," + n + "}"), dateString);
  }
}
function dayPeriodEnumToHours(dayPeriod) {
  switch (dayPeriod) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}
function normalizeTwoDigitYear(twoDigitYear, currentYear) {
  var isCommonEra = currentYear > 0;
  var absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;
  var result;
  if (absCurrentYear <= 50) {
    result = twoDigitYear || 100;
  } else {
    var rangeEnd = absCurrentYear + 50;
    var rangeEndCentury = Math.floor(rangeEnd / 100) * 100;
    var isPreviousCentury = twoDigitYear >= rangeEnd % 100;
    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
  }
  return isCommonEra ? result : 1 - result;
}
function isLeapYearIndex$1(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}
function _typeof$w(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$w = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$w = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$w(obj);
}
function _classCallCheck$t(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$t(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$t(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$t(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$t(Constructor, staticProps);
  return Constructor;
}
function _inherits$t(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$t(subClass, superClass);
}
function _setPrototypeOf$t(o, p) {
  _setPrototypeOf$t = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$t(o, p);
}
function _createSuper$t(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$t();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$t(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$t(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$t(this, result);
  };
}
function _possibleConstructorReturn$t(self, call) {
  if (call && (_typeof$w(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$t(self);
}
function _assertThisInitialized$t(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$t() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$t(o) {
  _getPrototypeOf$t = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$t(o);
}
function _defineProperty$t(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var YearParser = /* @__PURE__ */ function(_Parser) {
  _inherits$t(YearParser2, _Parser);
  var _super = _createSuper$t(YearParser2);
  function YearParser2() {
    var _this;
    _classCallCheck$t(this, YearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$t(_assertThisInitialized$t(_this), "priority", 130);
    _defineProperty$t(_assertThisInitialized$t(_this), "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass$t(YearParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback3 = function valueCallback4(year) {
        return {
          year,
          isTwoDigitYear: token === "yy"
        };
      };
      switch (token) {
        case "y":
          return mapValue(parseNDigits(4, dateString), valueCallback3);
        case "yo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "year"
          }), valueCallback3);
        default:
          return mapValue(parseNDigits(token.length, dateString), valueCallback3);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value.isTwoDigitYear || value.year > 0;
    }
  }, {
    key: "set",
    value: function set2(date, flags, value) {
      var currentYear = date.getUTCFullYear();
      if (value.isTwoDigitYear) {
        var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
        date.setUTCFullYear(normalizedTwoDigitYear, 0, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }
      var year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date.setUTCFullYear(year, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return YearParser2;
}(Parser);
function _typeof$v(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$v = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$v = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$v(obj);
}
function _classCallCheck$s(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$s(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$s(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$s(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$s(Constructor, staticProps);
  return Constructor;
}
function _inherits$s(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$s(subClass, superClass);
}
function _setPrototypeOf$s(o, p) {
  _setPrototypeOf$s = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$s(o, p);
}
function _createSuper$s(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$s();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$s(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$s(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$s(this, result);
  };
}
function _possibleConstructorReturn$s(self, call) {
  if (call && (_typeof$v(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$s(self);
}
function _assertThisInitialized$s(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$s() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$s(o) {
  _getPrototypeOf$s = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$s(o);
}
function _defineProperty$s(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var LocalWeekYearParser = /* @__PURE__ */ function(_Parser) {
  _inherits$s(LocalWeekYearParser2, _Parser);
  var _super = _createSuper$s(LocalWeekYearParser2);
  function LocalWeekYearParser2() {
    var _this;
    _classCallCheck$s(this, LocalWeekYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$s(_assertThisInitialized$s(_this), "priority", 130);
    _defineProperty$s(_assertThisInitialized$s(_this), "incompatibleTokens", ["y", "R", "u", "Q", "q", "M", "L", "I", "d", "D", "i", "t", "T"]);
    return _this;
  }
  _createClass$s(LocalWeekYearParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback3 = function valueCallback4(year) {
        return {
          year,
          isTwoDigitYear: token === "YY"
        };
      };
      switch (token) {
        case "Y":
          return mapValue(parseNDigits(4, dateString), valueCallback3);
        case "Yo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "year"
          }), valueCallback3);
        default:
          return mapValue(parseNDigits(token.length, dateString), valueCallback3);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value.isTwoDigitYear || value.year > 0;
    }
  }, {
    key: "set",
    value: function set2(date, flags, value, options) {
      var currentYear = getUTCWeekYear(date, options);
      if (value.isTwoDigitYear) {
        var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
        date.setUTCFullYear(normalizedTwoDigitYear, 0, options.firstWeekContainsDate);
        date.setUTCHours(0, 0, 0, 0);
        return startOfUTCWeek(date, options);
      }
      var year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date.setUTCFullYear(year, 0, options.firstWeekContainsDate);
      date.setUTCHours(0, 0, 0, 0);
      return startOfUTCWeek(date, options);
    }
  }]);
  return LocalWeekYearParser2;
}(Parser);
function _typeof$u(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$u = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$u = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$u(obj);
}
function _classCallCheck$r(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$r(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$r(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$r(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$r(Constructor, staticProps);
  return Constructor;
}
function _inherits$r(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$r(subClass, superClass);
}
function _setPrototypeOf$r(o, p) {
  _setPrototypeOf$r = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$r(o, p);
}
function _createSuper$r(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$r();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$r(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$r(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$r(this, result);
  };
}
function _possibleConstructorReturn$r(self, call) {
  if (call && (_typeof$u(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$r(self);
}
function _assertThisInitialized$r(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$r() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$r(o) {
  _getPrototypeOf$r = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$r(o);
}
function _defineProperty$r(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var ISOWeekYearParser = /* @__PURE__ */ function(_Parser) {
  _inherits$r(ISOWeekYearParser2, _Parser);
  var _super = _createSuper$r(ISOWeekYearParser2);
  function ISOWeekYearParser2() {
    var _this;
    _classCallCheck$r(this, ISOWeekYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$r(_assertThisInitialized$r(_this), "priority", 130);
    _defineProperty$r(_assertThisInitialized$r(_this), "incompatibleTokens", ["G", "y", "Y", "u", "Q", "q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass$r(ISOWeekYearParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      if (token === "R") {
        return parseNDigitsSigned(4, dateString);
      }
      return parseNDigitsSigned(token.length, dateString);
    }
  }, {
    key: "set",
    value: function set2(_date, _flags, value) {
      var firstWeekOfYear = new Date(0);
      firstWeekOfYear.setUTCFullYear(value, 0, 4);
      firstWeekOfYear.setUTCHours(0, 0, 0, 0);
      return startOfUTCISOWeek(firstWeekOfYear);
    }
  }]);
  return ISOWeekYearParser2;
}(Parser);
function _typeof$t(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$t = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$t = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$t(obj);
}
function _classCallCheck$q(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$q(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$q(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$q(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$q(Constructor, staticProps);
  return Constructor;
}
function _inherits$q(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$q(subClass, superClass);
}
function _setPrototypeOf$q(o, p) {
  _setPrototypeOf$q = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$q(o, p);
}
function _createSuper$q(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$q();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$q(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$q(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$q(this, result);
  };
}
function _possibleConstructorReturn$q(self, call) {
  if (call && (_typeof$t(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$q(self);
}
function _assertThisInitialized$q(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$q() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$q(o) {
  _getPrototypeOf$q = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$q(o);
}
function _defineProperty$q(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var ExtendedYearParser = /* @__PURE__ */ function(_Parser) {
  _inherits$q(ExtendedYearParser2, _Parser);
  var _super = _createSuper$q(ExtendedYearParser2);
  function ExtendedYearParser2() {
    var _this;
    _classCallCheck$q(this, ExtendedYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$q(_assertThisInitialized$q(_this), "priority", 130);
    _defineProperty$q(_assertThisInitialized$q(_this), "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass$q(ExtendedYearParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      if (token === "u") {
        return parseNDigitsSigned(4, dateString);
      }
      return parseNDigitsSigned(token.length, dateString);
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCFullYear(value, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return ExtendedYearParser2;
}(Parser);
function _typeof$s(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$s = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$s = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$s(obj);
}
function _classCallCheck$p(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$p(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$p(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$p(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$p(Constructor, staticProps);
  return Constructor;
}
function _inherits$p(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$p(subClass, superClass);
}
function _setPrototypeOf$p(o, p) {
  _setPrototypeOf$p = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$p(o, p);
}
function _createSuper$p(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$p();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$p(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$p(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$p(this, result);
  };
}
function _possibleConstructorReturn$p(self, call) {
  if (call && (_typeof$s(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$p(self);
}
function _assertThisInitialized$p(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$p() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$p(o) {
  _getPrototypeOf$p = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$p(o);
}
function _defineProperty$p(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var QuarterParser = /* @__PURE__ */ function(_Parser) {
  _inherits$p(QuarterParser2, _Parser);
  var _super = _createSuper$p(QuarterParser2);
  function QuarterParser2() {
    var _this;
    _classCallCheck$p(this, QuarterParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$p(_assertThisInitialized$p(_this), "priority", 120);
    _defineProperty$p(_assertThisInitialized$p(_this), "incompatibleTokens", ["Y", "R", "q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass$p(QuarterParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "Q":
        case "QQ":
          return parseNDigits(token.length, dateString);
        case "Qo":
          return match2.ordinalNumber(dateString, {
            unit: "quarter"
          });
        case "QQQ":
          return match2.quarter(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQQ":
          return match2.quarter(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQ":
        default:
          return match2.quarter(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.quarter(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 4;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMonth((value - 1) * 3, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return QuarterParser2;
}(Parser);
function _typeof$r(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$r = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$r = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$r(obj);
}
function _classCallCheck$o(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$o(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$o(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$o(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$o(Constructor, staticProps);
  return Constructor;
}
function _inherits$o(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$o(subClass, superClass);
}
function _setPrototypeOf$o(o, p) {
  _setPrototypeOf$o = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$o(o, p);
}
function _createSuper$o(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$o();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$o(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$o(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$o(this, result);
  };
}
function _possibleConstructorReturn$o(self, call) {
  if (call && (_typeof$r(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$o(self);
}
function _assertThisInitialized$o(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$o() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$o(o) {
  _getPrototypeOf$o = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$o(o);
}
function _defineProperty$o(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var StandAloneQuarterParser = /* @__PURE__ */ function(_Parser) {
  _inherits$o(StandAloneQuarterParser2, _Parser);
  var _super = _createSuper$o(StandAloneQuarterParser2);
  function StandAloneQuarterParser2() {
    var _this;
    _classCallCheck$o(this, StandAloneQuarterParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$o(_assertThisInitialized$o(_this), "priority", 120);
    _defineProperty$o(_assertThisInitialized$o(_this), "incompatibleTokens", ["Y", "R", "Q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass$o(StandAloneQuarterParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "q":
        case "qq":
          return parseNDigits(token.length, dateString);
        case "qo":
          return match2.ordinalNumber(dateString, {
            unit: "quarter"
          });
        case "qqq":
          return match2.quarter(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqqq":
          return match2.quarter(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqq":
        default:
          return match2.quarter(dateString, {
            width: "wide",
            context: "standalone"
          }) || match2.quarter(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 4;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMonth((value - 1) * 3, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return StandAloneQuarterParser2;
}(Parser);
function _typeof$q(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$q = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$q = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$q(obj);
}
function _classCallCheck$n(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$n(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$n(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$n(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$n(Constructor, staticProps);
  return Constructor;
}
function _inherits$n(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$n(subClass, superClass);
}
function _setPrototypeOf$n(o, p) {
  _setPrototypeOf$n = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$n(o, p);
}
function _createSuper$n(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$n();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$n(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$n(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$n(this, result);
  };
}
function _possibleConstructorReturn$n(self, call) {
  if (call && (_typeof$q(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$n(self);
}
function _assertThisInitialized$n(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$n() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$n(o) {
  _getPrototypeOf$n = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$n(o);
}
function _defineProperty$n(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var MonthParser = /* @__PURE__ */ function(_Parser) {
  _inherits$n(MonthParser2, _Parser);
  var _super = _createSuper$n(MonthParser2);
  function MonthParser2() {
    var _this;
    _classCallCheck$n(this, MonthParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$n(_assertThisInitialized$n(_this), "incompatibleTokens", ["Y", "R", "q", "Q", "L", "w", "I", "D", "i", "e", "c", "t", "T"]);
    _defineProperty$n(_assertThisInitialized$n(_this), "priority", 110);
    return _this;
  }
  _createClass$n(MonthParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback3 = function valueCallback4(value) {
        return value - 1;
      };
      switch (token) {
        case "M":
          return mapValue(parseNumericPattern(numericPatterns.month, dateString), valueCallback3);
        case "MM":
          return mapValue(parseNDigits(2, dateString), valueCallback3);
        case "Mo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "month"
          }), valueCallback3);
        case "MMM":
          return match2.month(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.month(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMMM":
          return match2.month(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMM":
        default:
          return match2.month(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.month(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.month(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 11;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMonth(value, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return MonthParser2;
}(Parser);
function _typeof$p(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$p = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$p = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$p(obj);
}
function _classCallCheck$m(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$m(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$m(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$m(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$m(Constructor, staticProps);
  return Constructor;
}
function _inherits$m(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$m(subClass, superClass);
}
function _setPrototypeOf$m(o, p) {
  _setPrototypeOf$m = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$m(o, p);
}
function _createSuper$m(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$m();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$m(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$m(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$m(this, result);
  };
}
function _possibleConstructorReturn$m(self, call) {
  if (call && (_typeof$p(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$m(self);
}
function _assertThisInitialized$m(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$m() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$m(o) {
  _getPrototypeOf$m = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$m(o);
}
function _defineProperty$m(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var StandAloneMonthParser = /* @__PURE__ */ function(_Parser) {
  _inherits$m(StandAloneMonthParser2, _Parser);
  var _super = _createSuper$m(StandAloneMonthParser2);
  function StandAloneMonthParser2() {
    var _this;
    _classCallCheck$m(this, StandAloneMonthParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$m(_assertThisInitialized$m(_this), "priority", 110);
    _defineProperty$m(_assertThisInitialized$m(_this), "incompatibleTokens", ["Y", "R", "q", "Q", "M", "w", "I", "D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass$m(StandAloneMonthParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback3 = function valueCallback4(value) {
        return value - 1;
      };
      switch (token) {
        case "L":
          return mapValue(parseNumericPattern(numericPatterns.month, dateString), valueCallback3);
        case "LL":
          return mapValue(parseNDigits(2, dateString), valueCallback3);
        case "Lo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "month"
          }), valueCallback3);
        case "LLL":
          return match2.month(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.month(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLLL":
          return match2.month(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLL":
        default:
          return match2.month(dateString, {
            width: "wide",
            context: "standalone"
          }) || match2.month(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.month(dateString, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 11;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMonth(value, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return StandAloneMonthParser2;
}(Parser);
function setUTCWeek(dirtyDate, dirtyWeek, options) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var week = toInteger(dirtyWeek);
  var diff = getUTCWeek(date, options) - week;
  date.setUTCDate(date.getUTCDate() - diff * 7);
  return date;
}
function _typeof$o(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$o = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$o = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$o(obj);
}
function _classCallCheck$l(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$l(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$l(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$l(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$l(Constructor, staticProps);
  return Constructor;
}
function _inherits$l(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$l(subClass, superClass);
}
function _setPrototypeOf$l(o, p) {
  _setPrototypeOf$l = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$l(o, p);
}
function _createSuper$l(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$l();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$l(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$l(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$l(this, result);
  };
}
function _possibleConstructorReturn$l(self, call) {
  if (call && (_typeof$o(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$l(self);
}
function _assertThisInitialized$l(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$l() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$l(o) {
  _getPrototypeOf$l = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$l(o);
}
function _defineProperty$l(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var LocalWeekParser = /* @__PURE__ */ function(_Parser) {
  _inherits$l(LocalWeekParser2, _Parser);
  var _super = _createSuper$l(LocalWeekParser2);
  function LocalWeekParser2() {
    var _this;
    _classCallCheck$l(this, LocalWeekParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$l(_assertThisInitialized$l(_this), "priority", 100);
    _defineProperty$l(_assertThisInitialized$l(_this), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "i", "t", "T"]);
    return _this;
  }
  _createClass$l(LocalWeekParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "w":
          return parseNumericPattern(numericPatterns.week, dateString);
        case "wo":
          return match2.ordinalNumber(dateString, {
            unit: "week"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 53;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value, options) {
      return startOfUTCWeek(setUTCWeek(date, value, options), options);
    }
  }]);
  return LocalWeekParser2;
}(Parser);
function setUTCISOWeek(dirtyDate, dirtyISOWeek) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var isoWeek = toInteger(dirtyISOWeek);
  var diff = getUTCISOWeek(date) - isoWeek;
  date.setUTCDate(date.getUTCDate() - diff * 7);
  return date;
}
function _typeof$n(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$n = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$n = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$n(obj);
}
function _classCallCheck$k(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$k(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$k(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$k(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$k(Constructor, staticProps);
  return Constructor;
}
function _inherits$k(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$k(subClass, superClass);
}
function _setPrototypeOf$k(o, p) {
  _setPrototypeOf$k = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$k(o, p);
}
function _createSuper$k(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$k();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$k(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$k(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$k(this, result);
  };
}
function _possibleConstructorReturn$k(self, call) {
  if (call && (_typeof$n(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$k(self);
}
function _assertThisInitialized$k(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$k() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$k(o) {
  _getPrototypeOf$k = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$k(o);
}
function _defineProperty$k(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var ISOWeekParser = /* @__PURE__ */ function(_Parser) {
  _inherits$k(ISOWeekParser2, _Parser);
  var _super = _createSuper$k(ISOWeekParser2);
  function ISOWeekParser2() {
    var _this;
    _classCallCheck$k(this, ISOWeekParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$k(_assertThisInitialized$k(_this), "priority", 100);
    _defineProperty$k(_assertThisInitialized$k(_this), "incompatibleTokens", ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass$k(ISOWeekParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "I":
          return parseNumericPattern(numericPatterns.week, dateString);
        case "Io":
          return match2.ordinalNumber(dateString, {
            unit: "week"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 53;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      return startOfUTCISOWeek(setUTCISOWeek(date, value));
    }
  }]);
  return ISOWeekParser2;
}(Parser);
function _typeof$m(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$m = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$m = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$m(obj);
}
function _classCallCheck$j(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$j(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$j(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$j(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$j(Constructor, staticProps);
  return Constructor;
}
function _inherits$j(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$j(subClass, superClass);
}
function _setPrototypeOf$j(o, p) {
  _setPrototypeOf$j = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$j(o, p);
}
function _createSuper$j(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$j();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$j(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$j(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$j(this, result);
  };
}
function _possibleConstructorReturn$j(self, call) {
  if (call && (_typeof$m(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$j(self);
}
function _assertThisInitialized$j(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$j() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$j(o) {
  _getPrototypeOf$j = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$j(o);
}
function _defineProperty$j(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DateParser = /* @__PURE__ */ function(_Parser) {
  _inherits$j(DateParser2, _Parser);
  var _super = _createSuper$j(DateParser2);
  function DateParser2() {
    var _this;
    _classCallCheck$j(this, DateParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$j(_assertThisInitialized$j(_this), "priority", 90);
    _defineProperty$j(_assertThisInitialized$j(_this), "subPriority", 1);
    _defineProperty$j(_assertThisInitialized$j(_this), "incompatibleTokens", ["Y", "R", "q", "Q", "w", "I", "D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass$j(DateParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "d":
          return parseNumericPattern(numericPatterns.date, dateString);
        case "do":
          return match2.ordinalNumber(dateString, {
            unit: "date"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(date, value) {
      var year = date.getUTCFullYear();
      var isLeapYear = isLeapYearIndex$1(year);
      var month = date.getUTCMonth();
      if (isLeapYear) {
        return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
      } else {
        return value >= 1 && value <= DAYS_IN_MONTH[month];
      }
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCDate(value);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return DateParser2;
}(Parser);
function _typeof$l(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$l = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$l = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$l(obj);
}
function _classCallCheck$i(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$i(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$i(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$i(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$i(Constructor, staticProps);
  return Constructor;
}
function _inherits$i(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$i(subClass, superClass);
}
function _setPrototypeOf$i(o, p) {
  _setPrototypeOf$i = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$i(o, p);
}
function _createSuper$i(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$i();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$i(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$i(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$i(this, result);
  };
}
function _possibleConstructorReturn$i(self, call) {
  if (call && (_typeof$l(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$i(self);
}
function _assertThisInitialized$i(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$i() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$i(o) {
  _getPrototypeOf$i = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$i(o);
}
function _defineProperty$i(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var DayOfYearParser = /* @__PURE__ */ function(_Parser) {
  _inherits$i(DayOfYearParser2, _Parser);
  var _super = _createSuper$i(DayOfYearParser2);
  function DayOfYearParser2() {
    var _this;
    _classCallCheck$i(this, DayOfYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$i(_assertThisInitialized$i(_this), "priority", 90);
    _defineProperty$i(_assertThisInitialized$i(_this), "subpriority", 1);
    _defineProperty$i(_assertThisInitialized$i(_this), "incompatibleTokens", ["Y", "R", "q", "Q", "M", "L", "w", "I", "d", "E", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass$i(DayOfYearParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "D":
        case "DD":
          return parseNumericPattern(numericPatterns.dayOfYear, dateString);
        case "Do":
          return match2.ordinalNumber(dateString, {
            unit: "date"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(date, value) {
      var year = date.getUTCFullYear();
      var isLeapYear = isLeapYearIndex$1(year);
      if (isLeapYear) {
        return value >= 1 && value <= 366;
      } else {
        return value >= 1 && value <= 365;
      }
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMonth(0, value);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return DayOfYearParser2;
}(Parser);
function setUTCDay(dirtyDate, dirtyDay, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(2, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = toInteger(dirtyDay);
  var currentDay = date.getUTCDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}
function _typeof$k(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$k = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$k = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$k(obj);
}
function _classCallCheck$h(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$h(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$h(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$h(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$h(Constructor, staticProps);
  return Constructor;
}
function _inherits$h(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$h(subClass, superClass);
}
function _setPrototypeOf$h(o, p) {
  _setPrototypeOf$h = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$h(o, p);
}
function _createSuper$h(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$h();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$h(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$h(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$h(this, result);
  };
}
function _possibleConstructorReturn$h(self, call) {
  if (call && (_typeof$k(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$h(self);
}
function _assertThisInitialized$h(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$h() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$h(o) {
  _getPrototypeOf$h = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$h(o);
}
function _defineProperty$h(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var DayParser = /* @__PURE__ */ function(_Parser) {
  _inherits$h(DayParser2, _Parser);
  var _super = _createSuper$h(DayParser2);
  function DayParser2() {
    var _this;
    _classCallCheck$h(this, DayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$h(_assertThisInitialized$h(_this), "priority", 90);
    _defineProperty$h(_assertThisInitialized$h(_this), "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass$h(DayParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "E":
        case "EE":
        case "EEE":
          return match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEE":
          return match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEEE":
          return match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEE":
        default:
          return match2.day(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 6;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value, options) {
      date = setUTCDay(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return DayParser2;
}(Parser);
function _typeof$j(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$j = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$j = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$j(obj);
}
function _classCallCheck$g(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$g(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$g(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$g(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$g(Constructor, staticProps);
  return Constructor;
}
function _inherits$g(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$g(subClass, superClass);
}
function _setPrototypeOf$g(o, p) {
  _setPrototypeOf$g = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$g(o, p);
}
function _createSuper$g(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$g();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$g(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$g(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$g(this, result);
  };
}
function _possibleConstructorReturn$g(self, call) {
  if (call && (_typeof$j(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$g(self);
}
function _assertThisInitialized$g(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$g() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$g(o) {
  _getPrototypeOf$g = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$g(o);
}
function _defineProperty$g(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var LocalDayParser = /* @__PURE__ */ function(_Parser) {
  _inherits$g(LocalDayParser2, _Parser);
  var _super = _createSuper$g(LocalDayParser2);
  function LocalDayParser2() {
    var _this;
    _classCallCheck$g(this, LocalDayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$g(_assertThisInitialized$g(_this), "priority", 90);
    _defineProperty$g(_assertThisInitialized$g(_this), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "c", "t", "T"]);
    return _this;
  }
  _createClass$g(LocalDayParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2, options) {
      var valueCallback3 = function valueCallback4(value) {
        var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
      };
      switch (token) {
        case "e":
        case "ee":
          return mapValue(parseNDigits(token.length, dateString), valueCallback3);
        case "eo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "day"
          }), valueCallback3);
        case "eee":
          return match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeee":
          return match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeeee":
          return match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "eeee":
        default:
          return match2.day(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 6;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value, options) {
      date = setUTCDay(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return LocalDayParser2;
}(Parser);
function _typeof$i(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$i = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$i = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$i(obj);
}
function _classCallCheck$f(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$f(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$f(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$f(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$f(Constructor, staticProps);
  return Constructor;
}
function _inherits$f(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$f(subClass, superClass);
}
function _setPrototypeOf$f(o, p) {
  _setPrototypeOf$f = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$f(o, p);
}
function _createSuper$f(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$f();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$f(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$f(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$f(this, result);
  };
}
function _possibleConstructorReturn$f(self, call) {
  if (call && (_typeof$i(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$f(self);
}
function _assertThisInitialized$f(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$f() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$f(o) {
  _getPrototypeOf$f = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$f(o);
}
function _defineProperty$f(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var StandAloneLocalDayParser = /* @__PURE__ */ function(_Parser) {
  _inherits$f(StandAloneLocalDayParser2, _Parser);
  var _super = _createSuper$f(StandAloneLocalDayParser2);
  function StandAloneLocalDayParser2() {
    var _this;
    _classCallCheck$f(this, StandAloneLocalDayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$f(_assertThisInitialized$f(_this), "priority", 90);
    _defineProperty$f(_assertThisInitialized$f(_this), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "e", "t", "T"]);
    return _this;
  }
  _createClass$f(StandAloneLocalDayParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2, options) {
      var valueCallback3 = function valueCallback4(value) {
        var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
      };
      switch (token) {
        case "c":
        case "cc":
          return mapValue(parseNDigits(token.length, dateString), valueCallback3);
        case "co":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "day"
          }), valueCallback3);
        case "ccc":
          return match2.day(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "short",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "ccccc":
          return match2.day(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "cccccc":
          return match2.day(dateString, {
            width: "short",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "cccc":
        default:
          return match2.day(dateString, {
            width: "wide",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "short",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 6;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value, options) {
      date = setUTCDay(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return StandAloneLocalDayParser2;
}(Parser);
function setUTCISODay(dirtyDate, dirtyDay) {
  requiredArgs(2, arguments);
  var day = toInteger(dirtyDay);
  if (day % 7 === 0) {
    day = day - 7;
  }
  var weekStartsOn = 1;
  var date = toDate(dirtyDate);
  var currentDay = date.getUTCDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}
function _typeof$h(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$h = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$h = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$h(obj);
}
function _classCallCheck$e(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$e(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$e(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$e(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$e(Constructor, staticProps);
  return Constructor;
}
function _inherits$e(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$e(subClass, superClass);
}
function _setPrototypeOf$e(o, p) {
  _setPrototypeOf$e = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$e(o, p);
}
function _createSuper$e(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$e();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$e(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$e(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$e(this, result);
  };
}
function _possibleConstructorReturn$e(self, call) {
  if (call && (_typeof$h(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$e(self);
}
function _assertThisInitialized$e(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$e() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$e(o) {
  _getPrototypeOf$e = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$e(o);
}
function _defineProperty$e(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var ISODayParser = /* @__PURE__ */ function(_Parser) {
  _inherits$e(ISODayParser2, _Parser);
  var _super = _createSuper$e(ISODayParser2);
  function ISODayParser2() {
    var _this;
    _classCallCheck$e(this, ISODayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$e(_assertThisInitialized$e(_this), "priority", 90);
    _defineProperty$e(_assertThisInitialized$e(_this), "incompatibleTokens", ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "E", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass$e(ISODayParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback3 = function valueCallback4(value) {
        if (value === 0) {
          return 7;
        }
        return value;
      };
      switch (token) {
        case "i":
        case "ii":
          return parseNDigits(token.length, dateString);
        case "io":
          return match2.ordinalNumber(dateString, {
            unit: "day"
          });
        case "iii":
          return mapValue(match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }), valueCallback3);
        case "iiiii":
          return mapValue(match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }), valueCallback3);
        case "iiiiii":
          return mapValue(match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }), valueCallback3);
        case "iiii":
        default:
          return mapValue(match2.day(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }), valueCallback3);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 7;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date = setUTCISODay(date, value);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return ISODayParser2;
}(Parser);
function _typeof$g(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$g = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$g = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$g(obj);
}
function _classCallCheck$d(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$d(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$d(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$d(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$d(Constructor, staticProps);
  return Constructor;
}
function _inherits$d(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$d(subClass, superClass);
}
function _setPrototypeOf$d(o, p) {
  _setPrototypeOf$d = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$d(o, p);
}
function _createSuper$d(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$d();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$d(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$d(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$d(this, result);
  };
}
function _possibleConstructorReturn$d(self, call) {
  if (call && (_typeof$g(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$d(self);
}
function _assertThisInitialized$d(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$d() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$d(o) {
  _getPrototypeOf$d = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$d(o);
}
function _defineProperty$d(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var AMPMParser = /* @__PURE__ */ function(_Parser) {
  _inherits$d(AMPMParser2, _Parser);
  var _super = _createSuper$d(AMPMParser2);
  function AMPMParser2() {
    var _this;
    _classCallCheck$d(this, AMPMParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$d(_assertThisInitialized$d(_this), "priority", 80);
    _defineProperty$d(_assertThisInitialized$d(_this), "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
    return _this;
  }
  _createClass$d(AMPMParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "a":
        case "aa":
        case "aaa":
          return match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaaa":
          return match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaa":
        default:
          return match2.dayPeriod(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    }
  }]);
  return AMPMParser2;
}(Parser);
function _typeof$f(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$f = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$f = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$f(obj);
}
function _classCallCheck$c(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$c(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$c(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$c(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$c(Constructor, staticProps);
  return Constructor;
}
function _inherits$c(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$c(subClass, superClass);
}
function _setPrototypeOf$c(o, p) {
  _setPrototypeOf$c = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$c(o, p);
}
function _createSuper$c(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$c();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$c(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$c(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$c(this, result);
  };
}
function _possibleConstructorReturn$c(self, call) {
  if (call && (_typeof$f(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$c(self);
}
function _assertThisInitialized$c(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$c() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$c(o) {
  _getPrototypeOf$c = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$c(o);
}
function _defineProperty$c(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var AMPMMidnightParser = /* @__PURE__ */ function(_Parser) {
  _inherits$c(AMPMMidnightParser2, _Parser);
  var _super = _createSuper$c(AMPMMidnightParser2);
  function AMPMMidnightParser2() {
    var _this;
    _classCallCheck$c(this, AMPMMidnightParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$c(_assertThisInitialized$c(_this), "priority", 80);
    _defineProperty$c(_assertThisInitialized$c(_this), "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
    return _this;
  }
  _createClass$c(AMPMMidnightParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "b":
        case "bb":
        case "bbb":
          return match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbbb":
          return match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbb":
        default:
          return match2.dayPeriod(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    }
  }]);
  return AMPMMidnightParser2;
}(Parser);
function _typeof$e(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$e = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$e = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$e(obj);
}
function _classCallCheck$b(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$b(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$b(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$b(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$b(Constructor, staticProps);
  return Constructor;
}
function _inherits$b(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$b(subClass, superClass);
}
function _setPrototypeOf$b(o, p) {
  _setPrototypeOf$b = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$b(o, p);
}
function _createSuper$b(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$b();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$b(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$b(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$b(this, result);
  };
}
function _possibleConstructorReturn$b(self, call) {
  if (call && (_typeof$e(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$b(self);
}
function _assertThisInitialized$b(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$b() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$b(o) {
  _getPrototypeOf$b = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$b(o);
}
function _defineProperty$b(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var DayPeriodParser = /* @__PURE__ */ function(_Parser) {
  _inherits$b(DayPeriodParser2, _Parser);
  var _super = _createSuper$b(DayPeriodParser2);
  function DayPeriodParser2() {
    var _this;
    _classCallCheck$b(this, DayPeriodParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$b(_assertThisInitialized$b(_this), "priority", 80);
    _defineProperty$b(_assertThisInitialized$b(_this), "incompatibleTokens", ["a", "b", "t", "T"]);
    return _this;
  }
  _createClass$b(DayPeriodParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "B":
        case "BB":
        case "BBB":
          return match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBBB":
          return match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBB":
        default:
          return match2.dayPeriod(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    }
  }]);
  return DayPeriodParser2;
}(Parser);
function _typeof$d(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$d = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$d = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$d(obj);
}
function _classCallCheck$a(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$a(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$a(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$a(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$a(Constructor, staticProps);
  return Constructor;
}
function _inherits$a(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$a(subClass, superClass);
}
function _setPrototypeOf$a(o, p) {
  _setPrototypeOf$a = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$a(o, p);
}
function _createSuper$a(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$a();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$a(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$a(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$a(this, result);
  };
}
function _possibleConstructorReturn$a(self, call) {
  if (call && (_typeof$d(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$a(self);
}
function _assertThisInitialized$a(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$a() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$a(o) {
  _getPrototypeOf$a = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$a(o);
}
function _defineProperty$a(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var Hour1to12Parser = /* @__PURE__ */ function(_Parser) {
  _inherits$a(Hour1to12Parser2, _Parser);
  var _super = _createSuper$a(Hour1to12Parser2);
  function Hour1to12Parser2() {
    var _this;
    _classCallCheck$a(this, Hour1to12Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$a(_assertThisInitialized$a(_this), "priority", 70);
    _defineProperty$a(_assertThisInitialized$a(_this), "incompatibleTokens", ["H", "K", "k", "t", "T"]);
    return _this;
  }
  _createClass$a(Hour1to12Parser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "h":
          return parseNumericPattern(numericPatterns.hour12h, dateString);
        case "ho":
          return match2.ordinalNumber(dateString, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 12;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      var isPM = date.getUTCHours() >= 12;
      if (isPM && value < 12) {
        date.setUTCHours(value + 12, 0, 0, 0);
      } else if (!isPM && value === 12) {
        date.setUTCHours(0, 0, 0, 0);
      } else {
        date.setUTCHours(value, 0, 0, 0);
      }
      return date;
    }
  }]);
  return Hour1to12Parser2;
}(Parser);
function _typeof$c(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$c = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$c = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$c(obj);
}
function _classCallCheck$9(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$9(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$9(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$9(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$9(Constructor, staticProps);
  return Constructor;
}
function _inherits$9(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$9(subClass, superClass);
}
function _setPrototypeOf$9(o, p) {
  _setPrototypeOf$9 = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$9(o, p);
}
function _createSuper$9(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$9();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$9(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$9(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$9(this, result);
  };
}
function _possibleConstructorReturn$9(self, call) {
  if (call && (_typeof$c(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$9(self);
}
function _assertThisInitialized$9(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$9() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$9(o) {
  _getPrototypeOf$9 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$9(o);
}
function _defineProperty$9(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var Hour0to23Parser = /* @__PURE__ */ function(_Parser) {
  _inherits$9(Hour0to23Parser2, _Parser);
  var _super = _createSuper$9(Hour0to23Parser2);
  function Hour0to23Parser2() {
    var _this;
    _classCallCheck$9(this, Hour0to23Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$9(_assertThisInitialized$9(_this), "priority", 70);
    _defineProperty$9(_assertThisInitialized$9(_this), "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
    return _this;
  }
  _createClass$9(Hour0to23Parser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "H":
          return parseNumericPattern(numericPatterns.hour23h, dateString);
        case "Ho":
          return match2.ordinalNumber(dateString, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 23;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCHours(value, 0, 0, 0);
      return date;
    }
  }]);
  return Hour0to23Parser2;
}(Parser);
function _typeof$b(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$b = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$b = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$b(obj);
}
function _classCallCheck$8(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$8(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$8(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$8(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$8(Constructor, staticProps);
  return Constructor;
}
function _inherits$8(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$8(subClass, superClass);
}
function _setPrototypeOf$8(o, p) {
  _setPrototypeOf$8 = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$8(o, p);
}
function _createSuper$8(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$8();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$8(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$8(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$8(this, result);
  };
}
function _possibleConstructorReturn$8(self, call) {
  if (call && (_typeof$b(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$8(self);
}
function _assertThisInitialized$8(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$8() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$8(o) {
  _getPrototypeOf$8 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$8(o);
}
function _defineProperty$8(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var Hour0To11Parser = /* @__PURE__ */ function(_Parser) {
  _inherits$8(Hour0To11Parser2, _Parser);
  var _super = _createSuper$8(Hour0To11Parser2);
  function Hour0To11Parser2() {
    var _this;
    _classCallCheck$8(this, Hour0To11Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$8(_assertThisInitialized$8(_this), "priority", 70);
    _defineProperty$8(_assertThisInitialized$8(_this), "incompatibleTokens", ["h", "H", "k", "t", "T"]);
    return _this;
  }
  _createClass$8(Hour0To11Parser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "K":
          return parseNumericPattern(numericPatterns.hour11h, dateString);
        case "Ko":
          return match2.ordinalNumber(dateString, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 11;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      var isPM = date.getUTCHours() >= 12;
      if (isPM && value < 12) {
        date.setUTCHours(value + 12, 0, 0, 0);
      } else {
        date.setUTCHours(value, 0, 0, 0);
      }
      return date;
    }
  }]);
  return Hour0To11Parser2;
}(Parser);
function _typeof$a(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$a = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$a = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$a(obj);
}
function _classCallCheck$7(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$7(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$7(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$7(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$7(Constructor, staticProps);
  return Constructor;
}
function _inherits$7(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$7(subClass, superClass);
}
function _setPrototypeOf$7(o, p) {
  _setPrototypeOf$7 = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$7(o, p);
}
function _createSuper$7(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$7();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$7(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$7(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$7(this, result);
  };
}
function _possibleConstructorReturn$7(self, call) {
  if (call && (_typeof$a(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$7(self);
}
function _assertThisInitialized$7(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$7() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$7(o) {
  _getPrototypeOf$7 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$7(o);
}
function _defineProperty$7(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var Hour1To24Parser = /* @__PURE__ */ function(_Parser) {
  _inherits$7(Hour1To24Parser2, _Parser);
  var _super = _createSuper$7(Hour1To24Parser2);
  function Hour1To24Parser2() {
    var _this;
    _classCallCheck$7(this, Hour1To24Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$7(_assertThisInitialized$7(_this), "priority", 70);
    _defineProperty$7(_assertThisInitialized$7(_this), "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
    return _this;
  }
  _createClass$7(Hour1To24Parser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "k":
          return parseNumericPattern(numericPatterns.hour24h, dateString);
        case "ko":
          return match2.ordinalNumber(dateString, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 24;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      var hours = value <= 24 ? value % 24 : value;
      date.setUTCHours(hours, 0, 0, 0);
      return date;
    }
  }]);
  return Hour1To24Parser2;
}(Parser);
function _typeof$9(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$9 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$9 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$9(obj);
}
function _classCallCheck$6(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$6(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$6(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$6(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$6(Constructor, staticProps);
  return Constructor;
}
function _inherits$6(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$6(subClass, superClass);
}
function _setPrototypeOf$6(o, p) {
  _setPrototypeOf$6 = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$6(o, p);
}
function _createSuper$6(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$6();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$6(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$6(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$6(this, result);
  };
}
function _possibleConstructorReturn$6(self, call) {
  if (call && (_typeof$9(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$6(self);
}
function _assertThisInitialized$6(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$6() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$6(o) {
  _getPrototypeOf$6 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$6(o);
}
function _defineProperty$6(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var MinuteParser = /* @__PURE__ */ function(_Parser) {
  _inherits$6(MinuteParser2, _Parser);
  var _super = _createSuper$6(MinuteParser2);
  function MinuteParser2() {
    var _this;
    _classCallCheck$6(this, MinuteParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$6(_assertThisInitialized$6(_this), "priority", 60);
    _defineProperty$6(_assertThisInitialized$6(_this), "incompatibleTokens", ["t", "T"]);
    return _this;
  }
  _createClass$6(MinuteParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "m":
          return parseNumericPattern(numericPatterns.minute, dateString);
        case "mo":
          return match2.ordinalNumber(dateString, {
            unit: "minute"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 59;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMinutes(value, 0, 0);
      return date;
    }
  }]);
  return MinuteParser2;
}(Parser);
function _typeof$8(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$8 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$8 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$8(obj);
}
function _classCallCheck$5(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$5(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$5(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$5(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$5(Constructor, staticProps);
  return Constructor;
}
function _inherits$5(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$5(subClass, superClass);
}
function _setPrototypeOf$5(o, p) {
  _setPrototypeOf$5 = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$5(o, p);
}
function _createSuper$5(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$5();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$5(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$5(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$5(this, result);
  };
}
function _possibleConstructorReturn$5(self, call) {
  if (call && (_typeof$8(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$5(self);
}
function _assertThisInitialized$5(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$5() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$5(o) {
  _getPrototypeOf$5 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$5(o);
}
function _defineProperty$5(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var SecondParser = /* @__PURE__ */ function(_Parser) {
  _inherits$5(SecondParser2, _Parser);
  var _super = _createSuper$5(SecondParser2);
  function SecondParser2() {
    var _this;
    _classCallCheck$5(this, SecondParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$5(_assertThisInitialized$5(_this), "priority", 50);
    _defineProperty$5(_assertThisInitialized$5(_this), "incompatibleTokens", ["t", "T"]);
    return _this;
  }
  _createClass$5(SecondParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "s":
          return parseNumericPattern(numericPatterns.second, dateString);
        case "so":
          return match2.ordinalNumber(dateString, {
            unit: "second"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 59;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCSeconds(value, 0);
      return date;
    }
  }]);
  return SecondParser2;
}(Parser);
function _typeof$7(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$7 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$7 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$7(obj);
}
function _classCallCheck$4(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$4(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$4(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$4(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$4(Constructor, staticProps);
  return Constructor;
}
function _inherits$4(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$4(subClass, superClass);
}
function _setPrototypeOf$4(o, p) {
  _setPrototypeOf$4 = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$4(o, p);
}
function _createSuper$4(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$4();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$4(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$4(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$4(this, result);
  };
}
function _possibleConstructorReturn$4(self, call) {
  if (call && (_typeof$7(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$4(self);
}
function _assertThisInitialized$4(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$4() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$4(o) {
  _getPrototypeOf$4 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$4(o);
}
function _defineProperty$4(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var FractionOfSecondParser = /* @__PURE__ */ function(_Parser) {
  _inherits$4(FractionOfSecondParser2, _Parser);
  var _super = _createSuper$4(FractionOfSecondParser2);
  function FractionOfSecondParser2() {
    var _this;
    _classCallCheck$4(this, FractionOfSecondParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$4(_assertThisInitialized$4(_this), "priority", 30);
    _defineProperty$4(_assertThisInitialized$4(_this), "incompatibleTokens", ["t", "T"]);
    return _this;
  }
  _createClass$4(FractionOfSecondParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      var valueCallback3 = function valueCallback4(value) {
        return Math.floor(value * Math.pow(10, -token.length + 3));
      };
      return mapValue(parseNDigits(token.length, dateString), valueCallback3);
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMilliseconds(value);
      return date;
    }
  }]);
  return FractionOfSecondParser2;
}(Parser);
function _typeof$6(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$6 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$6 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$6(obj);
}
function _classCallCheck$3(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$3(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$3(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$3(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$3(Constructor, staticProps);
  return Constructor;
}
function _inherits$3(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$3(subClass, superClass);
}
function _setPrototypeOf$3(o, p) {
  _setPrototypeOf$3 = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$3(o, p);
}
function _createSuper$3(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$3();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$3(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$3(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$3(this, result);
  };
}
function _possibleConstructorReturn$3(self, call) {
  if (call && (_typeof$6(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$3(self);
}
function _assertThisInitialized$3(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$3() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$3(o) {
  _getPrototypeOf$3 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$3(o);
}
function _defineProperty$3(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var ISOTimezoneWithZParser = /* @__PURE__ */ function(_Parser) {
  _inherits$3(ISOTimezoneWithZParser2, _Parser);
  var _super = _createSuper$3(ISOTimezoneWithZParser2);
  function ISOTimezoneWithZParser2() {
    var _this;
    _classCallCheck$3(this, ISOTimezoneWithZParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$3(_assertThisInitialized$3(_this), "priority", 10);
    _defineProperty$3(_assertThisInitialized$3(_this), "incompatibleTokens", ["t", "T", "x"]);
    return _this;
  }
  _createClass$3(ISOTimezoneWithZParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      switch (token) {
        case "X":
          return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, dateString);
        case "XX":
          return parseTimezonePattern(timezonePatterns.basic, dateString);
        case "XXXX":
          return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, dateString);
        case "XXXXX":
          return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, dateString);
        case "XXX":
        default:
          return parseTimezonePattern(timezonePatterns.extended, dateString);
      }
    }
  }, {
    key: "set",
    value: function set2(date, flags, value) {
      if (flags.timestampIsSet) {
        return date;
      }
      return new Date(date.getTime() - value);
    }
  }]);
  return ISOTimezoneWithZParser2;
}(Parser);
function _typeof$5(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$5 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$5 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$5(obj);
}
function _classCallCheck$2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$2(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$2(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$2(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$2(Constructor, staticProps);
  return Constructor;
}
function _inherits$2(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$2(subClass, superClass);
}
function _setPrototypeOf$2(o, p) {
  _setPrototypeOf$2 = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$2(o, p);
}
function _createSuper$2(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$2();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$2(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$2(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$2(this, result);
  };
}
function _possibleConstructorReturn$2(self, call) {
  if (call && (_typeof$5(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$2(self);
}
function _assertThisInitialized$2(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$2() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$2(o) {
  _getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$2(o);
}
function _defineProperty$2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var ISOTimezoneParser = /* @__PURE__ */ function(_Parser) {
  _inherits$2(ISOTimezoneParser2, _Parser);
  var _super = _createSuper$2(ISOTimezoneParser2);
  function ISOTimezoneParser2() {
    var _this;
    _classCallCheck$2(this, ISOTimezoneParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$2(_assertThisInitialized$2(_this), "priority", 10);
    _defineProperty$2(_assertThisInitialized$2(_this), "incompatibleTokens", ["t", "T", "X"]);
    return _this;
  }
  _createClass$2(ISOTimezoneParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      switch (token) {
        case "x":
          return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, dateString);
        case "xx":
          return parseTimezonePattern(timezonePatterns.basic, dateString);
        case "xxxx":
          return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, dateString);
        case "xxxxx":
          return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, dateString);
        case "xxx":
        default:
          return parseTimezonePattern(timezonePatterns.extended, dateString);
      }
    }
  }, {
    key: "set",
    value: function set2(date, flags, value) {
      if (flags.timestampIsSet) {
        return date;
      }
      return new Date(date.getTime() - value);
    }
  }]);
  return ISOTimezoneParser2;
}(Parser);
function _typeof$4(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$4 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$4 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$4(obj);
}
function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$1(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$1(Constructor, staticProps);
  return Constructor;
}
function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$1(subClass, superClass);
}
function _setPrototypeOf$1(o, p) {
  _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$1(o, p);
}
function _createSuper$1(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$1();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$1(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$1(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$1(this, result);
  };
}
function _possibleConstructorReturn$1(self, call) {
  if (call && (_typeof$4(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$1(self);
}
function _assertThisInitialized$1(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$1() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf$1(o) {
  _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$1(o);
}
function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var TimestampSecondsParser = /* @__PURE__ */ function(_Parser) {
  _inherits$1(TimestampSecondsParser2, _Parser);
  var _super = _createSuper$1(TimestampSecondsParser2);
  function TimestampSecondsParser2() {
    var _this;
    _classCallCheck$1(this, TimestampSecondsParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$1(_assertThisInitialized$1(_this), "priority", 40);
    _defineProperty$1(_assertThisInitialized$1(_this), "incompatibleTokens", "*");
    return _this;
  }
  _createClass$1(TimestampSecondsParser2, [{
    key: "parse",
    value: function parse2(dateString) {
      return parseAnyDigitsSigned(dateString);
    }
  }, {
    key: "set",
    value: function set2(_date, _flags, value) {
      return [new Date(value * 1e3), {
        timestampIsSet: true
      }];
    }
  }]);
  return TimestampSecondsParser2;
}(Parser);
function _typeof$3(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$3 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$3 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$3(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof$3(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var TimestampMillisecondsParser = /* @__PURE__ */ function(_Parser) {
  _inherits(TimestampMillisecondsParser2, _Parser);
  var _super = _createSuper(TimestampMillisecondsParser2);
  function TimestampMillisecondsParser2() {
    var _this;
    _classCallCheck(this, TimestampMillisecondsParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 20);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", "*");
    return _this;
  }
  _createClass(TimestampMillisecondsParser2, [{
    key: "parse",
    value: function parse2(dateString) {
      return parseAnyDigitsSigned(dateString);
    }
  }, {
    key: "set",
    value: function set2(_date, _flags, value) {
      return [new Date(value), {
        timestampIsSet: true
      }];
    }
  }]);
  return TimestampMillisecondsParser2;
}(Parser);
var parsers = {
  G: new EraParser(),
  y: new YearParser(),
  Y: new LocalWeekYearParser(),
  R: new ISOWeekYearParser(),
  u: new ExtendedYearParser(),
  Q: new QuarterParser(),
  q: new StandAloneQuarterParser(),
  M: new MonthParser(),
  L: new StandAloneMonthParser(),
  w: new LocalWeekParser(),
  I: new ISOWeekParser(),
  d: new DateParser(),
  D: new DayOfYearParser(),
  E: new DayParser(),
  e: new LocalDayParser(),
  c: new StandAloneLocalDayParser(),
  i: new ISODayParser(),
  a: new AMPMParser(),
  b: new AMPMMidnightParser(),
  B: new DayPeriodParser(),
  h: new Hour1to12Parser(),
  H: new Hour0to23Parser(),
  K: new Hour0To11Parser(),
  k: new Hour1To24Parser(),
  m: new MinuteParser(),
  s: new SecondParser(),
  S: new FractionOfSecondParser(),
  X: new ISOTimezoneWithZParser(),
  x: new ISOTimezoneParser(),
  t: new TimestampSecondsParser(),
  T: new TimestampMillisecondsParser()
};
function _typeof$2(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$2 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$2 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$2(obj);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it2;
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it2 = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it2)
        o = it2;
      var i2 = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i2 >= o.length)
          return { done: true };
        return { done: false, value: o[i2++] };
      }, e: function e2(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s3() {
    it2 = o[Symbol.iterator]();
  }, n: function n() {
    var step = it2.next();
    normalCompletion = step.done;
    return step;
  }, e: function e2(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f() {
    try {
      if (!normalCompletion && it2.return != null)
        it2.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
    arr2[i2] = arr[i2];
  }
  return arr2;
}
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var notWhitespaceRegExp = /\S/;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function parse(dirtyDateString, dirtyFormatString, dirtyReferenceDate, options) {
  var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
  requiredArgs(3, arguments);
  var dateString = String(dirtyDateString);
  var formatString = String(dirtyFormatString);
  var defaultOptions2 = getDefaultOptions();
  var locale2 = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions2.locale) !== null && _ref !== void 0 ? _ref : defaultLocale;
  if (!locale2.match) {
    throw new RangeError("locale must contain match property");
  }
  var firstWeekContainsDate = toInteger((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions2.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var weekStartsOn = toInteger((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions2.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions2.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  if (formatString === "") {
    if (dateString === "") {
      return toDate(dirtyReferenceDate);
    } else {
      return new Date(NaN);
    }
  }
  var subFnOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale: locale2
  };
  var setters = [new DateToSystemTimezoneSetter()];
  var tokens = formatString.match(longFormattingTokensRegExp).map(function(substring) {
    var firstCharacter = substring[0];
    if (firstCharacter in longFormatters$1) {
      var longFormatter = longFormatters$1[firstCharacter];
      return longFormatter(substring, locale2.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp);
  var usedTokens = [];
  var _iterator = _createForOfIteratorHelper(tokens), _step;
  try {
    var _loop = function _loop2() {
      var token = _step.value;
      if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(token)) {
        throwProtectedError(token, formatString, dirtyDateString);
      }
      if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(token)) {
        throwProtectedError(token, formatString, dirtyDateString);
      }
      var firstCharacter = token[0];
      var parser = parsers[firstCharacter];
      if (parser) {
        var incompatibleTokens = parser.incompatibleTokens;
        if (Array.isArray(incompatibleTokens)) {
          var incompatibleToken = usedTokens.find(function(usedToken) {
            return incompatibleTokens.includes(usedToken.token) || usedToken.token === firstCharacter;
          });
          if (incompatibleToken) {
            throw new RangeError("The format string mustn't contain `".concat(incompatibleToken.fullToken, "` and `").concat(token, "` at the same time"));
          }
        } else if (parser.incompatibleTokens === "*" && usedTokens.length > 0) {
          throw new RangeError("The format string mustn't contain `".concat(token, "` and any other token at the same time"));
        }
        usedTokens.push({
          token: firstCharacter,
          fullToken: token
        });
        var parseResult = parser.run(dateString, token, locale2.match, subFnOptions);
        if (!parseResult) {
          return {
            v: new Date(NaN)
          };
        }
        setters.push(parseResult.setter);
        dateString = parseResult.rest;
      } else {
        if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
          throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
        }
        if (token === "''") {
          token = "'";
        } else if (firstCharacter === "'") {
          token = cleanEscapedString(token);
        }
        if (dateString.indexOf(token) === 0) {
          dateString = dateString.slice(token.length);
        } else {
          return {
            v: new Date(NaN)
          };
        }
      }
    };
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var _ret = _loop();
      if (_typeof$2(_ret) === "object")
        return _ret.v;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (dateString.length > 0 && notWhitespaceRegExp.test(dateString)) {
    return new Date(NaN);
  }
  var uniquePrioritySetters = setters.map(function(setter2) {
    return setter2.priority;
  }).sort(function(a3, b2) {
    return b2 - a3;
  }).filter(function(priority, index, array) {
    return array.indexOf(priority) === index;
  }).map(function(priority) {
    return setters.filter(function(setter2) {
      return setter2.priority === priority;
    }).sort(function(a3, b2) {
      return b2.subPriority - a3.subPriority;
    });
  }).map(function(setterArray) {
    return setterArray[0];
  });
  var date = toDate(dirtyReferenceDate);
  if (isNaN(date.getTime())) {
    return new Date(NaN);
  }
  var utcDate = subMilliseconds(date, getTimezoneOffsetInMilliseconds(date));
  var flags = {};
  var _iterator2 = _createForOfIteratorHelper(uniquePrioritySetters), _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
      var setter = _step2.value;
      if (!setter.validate(utcDate, subFnOptions)) {
        return new Date(NaN);
      }
      var result = setter.set(utcDate, flags, subFnOptions);
      if (Array.isArray(result)) {
        utcDate = result[0];
        assign(flags, result[1]);
      } else {
        utcDate = result;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return utcDate;
}
function cleanEscapedString(input) {
  return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
}
function subDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addDays(dirtyDate, -amount);
}
function parseISO(argument, options) {
  var _options$additionalDi;
  requiredArgs(1, arguments);
  var additionalDigits = toInteger((_options$additionalDi = options === null || options === void 0 ? void 0 : options.additionalDigits) !== null && _options$additionalDi !== void 0 ? _options$additionalDi : 2);
  if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  }
  if (!(typeof argument === "string" || Object.prototype.toString.call(argument) === "[object String]")) {
    return new Date(NaN);
  }
  var dateStrings = splitDateString(argument);
  var date;
  if (dateStrings.date) {
    var parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }
  if (!date || isNaN(date.getTime())) {
    return new Date(NaN);
  }
  var timestamp = date.getTime();
  var time = 0;
  var offset;
  if (dateStrings.time) {
    time = parseTime(dateStrings.time);
    if (isNaN(time)) {
      return new Date(NaN);
    }
  }
  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);
    if (isNaN(offset)) {
      return new Date(NaN);
    }
  } else {
    var dirtyDate = new Date(timestamp + time);
    var result = new Date(0);
    result.setFullYear(dirtyDate.getUTCFullYear(), dirtyDate.getUTCMonth(), dirtyDate.getUTCDate());
    result.setHours(dirtyDate.getUTCHours(), dirtyDate.getUTCMinutes(), dirtyDate.getUTCSeconds(), dirtyDate.getUTCMilliseconds());
    return result;
  }
  return new Date(timestamp + time + offset);
}
var patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
};
var dateRegex = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
var timeRegex = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
var timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function splitDateString(dateString) {
  var dateStrings = {};
  var array = dateString.split(patterns.dateTimeDelimiter);
  var timeString;
  if (array.length > 2) {
    return dateStrings;
  }
  if (/:/.test(array[0])) {
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(dateStrings.date.length, dateString.length);
    }
  }
  if (timeString) {
    var token = patterns.timezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], "");
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }
  return dateStrings;
}
function parseYear(dateString, additionalDigits) {
  var regex = new RegExp("^(?:(\\d{4}|[+-]\\d{" + (4 + additionalDigits) + "})|(\\d{2}|[+-]\\d{" + (2 + additionalDigits) + "})$)");
  var captures = dateString.match(regex);
  if (!captures)
    return {
      year: NaN,
      restDateString: ""
    };
  var year = captures[1] ? parseInt(captures[1]) : null;
  var century = captures[2] ? parseInt(captures[2]) : null;
  return {
    year: century === null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length)
  };
}
function parseDate(dateString, year) {
  if (year === null)
    return new Date(NaN);
  var captures = dateString.match(dateRegex);
  if (!captures)
    return new Date(NaN);
  var isWeekDate = !!captures[4];
  var dayOfYear = parseDateUnit(captures[1]);
  var month = parseDateUnit(captures[2]) - 1;
  var day = parseDateUnit(captures[3]);
  var week = parseDateUnit(captures[4]);
  var dayOfWeek = parseDateUnit(captures[5]) - 1;
  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return new Date(NaN);
    }
    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    var date = new Date(0);
    if (!validateDate(year, month, day) || !validateDayOfYearDate(year, dayOfYear)) {
      return new Date(NaN);
    }
    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}
function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}
function parseTime(timeString) {
  var captures = timeString.match(timeRegex);
  if (!captures)
    return NaN;
  var hours = parseTimeUnit(captures[1]);
  var minutes = parseTimeUnit(captures[2]);
  var seconds = parseTimeUnit(captures[3]);
  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }
  return hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * 1e3;
}
function parseTimeUnit(value) {
  return value && parseFloat(value.replace(",", ".")) || 0;
}
function parseTimezone(timezoneString) {
  if (timezoneString === "Z")
    return 0;
  var captures = timezoneString.match(timezoneRegex);
  if (!captures)
    return 0;
  var sign = captures[1] === "+" ? -1 : 1;
  var hours = parseInt(captures[2]);
  var minutes = captures[3] && parseInt(captures[3]) || 0;
  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }
  return sign * (hours * millisecondsInHour + minutes * millisecondsInMinute);
}
function dayOfISOWeekYear(isoWeekYear, week, day) {
  var date = new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}
var daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}
function validateDate(year, month, date) {
  return month >= 0 && month <= 11 && date >= 1 && date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28));
}
function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
}
function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}
function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }
  return seconds >= 0 && seconds < 60 && minutes >= 0 && minutes < 60 && hours >= 0 && hours < 25;
}
function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}
function setMonth(dirtyDate, dirtyMonth) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var month = toInteger(dirtyMonth);
  var year = date.getFullYear();
  var day = date.getDate();
  var dateWithDesiredMonth = new Date(0);
  dateWithDesiredMonth.setFullYear(year, month, 15);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  var daysInMonth = getDaysInMonth(dateWithDesiredMonth);
  date.setMonth(month, Math.min(day, daysInMonth));
  return date;
}
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$1 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$1 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$1(obj);
}
function set(dirtyDate, values) {
  requiredArgs(2, arguments);
  if (_typeof$1(values) !== "object" || values === null) {
    throw new RangeError("values parameter must be an object");
  }
  var date = toDate(dirtyDate);
  if (isNaN(date.getTime())) {
    return new Date(NaN);
  }
  if (values.year != null) {
    date.setFullYear(values.year);
  }
  if (values.month != null) {
    date = setMonth(date, values.month);
  }
  if (values.date != null) {
    date.setDate(toInteger(values.date));
  }
  if (values.hours != null) {
    date.setHours(toInteger(values.hours));
  }
  if (values.minutes != null) {
    date.setMinutes(toInteger(values.minutes));
  }
  if (values.seconds != null) {
    date.setSeconds(toInteger(values.seconds));
  }
  if (values.milliseconds != null) {
    date.setMilliseconds(toInteger(values.milliseconds));
  }
  return date;
}
function setHours(dirtyDate, dirtyHours) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var hours = toInteger(dirtyHours);
  date.setHours(hours);
  return date;
}
function setMilliseconds(dirtyDate, dirtyMilliseconds) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var milliseconds = toInteger(dirtyMilliseconds);
  date.setMilliseconds(milliseconds);
  return date;
}
function setMinutes(dirtyDate, dirtyMinutes) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var minutes = toInteger(dirtyMinutes);
  date.setMinutes(minutes);
  return date;
}
function setSeconds(dirtyDate, dirtySeconds) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var seconds = toInteger(dirtySeconds);
  date.setSeconds(seconds);
  return date;
}
function setYear(dirtyDate, dirtyYear) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var year = toInteger(dirtyYear);
  if (isNaN(date.getTime())) {
    return new Date(NaN);
  }
  date.setFullYear(year);
  return date;
}
function subMonths(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMonths(dirtyDate, -amount);
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function sub(date, duration) {
  requiredArgs(2, arguments);
  if (!duration || _typeof(duration) !== "object")
    return new Date(NaN);
  var years = duration.years ? toInteger(duration.years) : 0;
  var months = duration.months ? toInteger(duration.months) : 0;
  var weeks = duration.weeks ? toInteger(duration.weeks) : 0;
  var days = duration.days ? toInteger(duration.days) : 0;
  var hours = duration.hours ? toInteger(duration.hours) : 0;
  var minutes = duration.minutes ? toInteger(duration.minutes) : 0;
  var seconds = duration.seconds ? toInteger(duration.seconds) : 0;
  var dateWithoutMonths = subMonths(date, months + years * 12);
  var dateWithoutDays = subDays(dateWithoutMonths, days + weeks * 7);
  var minutestoSub = minutes + hours * 60;
  var secondstoSub = seconds + minutestoSub * 60;
  var mstoSub = secondstoSub * 1e3;
  var finalDate = new Date(dateWithoutDays.getTime() - mstoSub);
  return finalDate;
}
function subYears(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addYears(dirtyDate, -amount);
}
function Ft() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createElementVNode("path", {
        d: "M29.333 8c0-2.208-1.792-4-4-4h-18.667c-2.208 0-4 1.792-4 4v18.667c0 2.208 1.792 4 4 4h18.667c2.208 0 4-1.792 4-4v-18.667zM26.667 8v18.667c0 0.736-0.597 1.333-1.333 1.333 0 0-18.667 0-18.667 0-0.736 0-1.333-0.597-1.333-1.333 0 0 0-18.667 0-18.667 0-0.736 0.597-1.333 1.333-1.333 0 0 18.667 0 18.667 0 0.736 0 1.333 0.597 1.333 1.333z"
      }),
      createElementVNode("path", {
        d: "M20 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      }),
      createElementVNode("path", {
        d: "M9.333 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      }),
      createElementVNode("path", {
        d: "M4 14.667h24c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333h-24c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333z"
      })
    ]
  );
}
function ca() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createElementVNode("path", {
        d: "M23.057 7.057l-16 16c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l16-16c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0z"
      }),
      createElementVNode("path", {
        d: "M7.057 8.943l16 16c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885l-16-16c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
function kn() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createElementVNode("path", {
        d: "M20.943 23.057l-7.057-7.057c0 0 7.057-7.057 7.057-7.057 0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-8 8c-0.521 0.521-0.521 1.365 0 1.885l8 8c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
function wn() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createElementVNode("path", {
        d: "M12.943 24.943l8-8c0.521-0.521 0.521-1.365 0-1.885l-8-8c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885l7.057 7.057c0 0-7.057 7.057-7.057 7.057-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0z"
      })
    ]
  );
}
function Un() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createElementVNode("path", {
        d: "M16 1.333c-8.095 0-14.667 6.572-14.667 14.667s6.572 14.667 14.667 14.667c8.095 0 14.667-6.572 14.667-14.667s-6.572-14.667-14.667-14.667zM16 4c6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.623 0-12-5.377-12-12s5.377-12 12-12z"
      }),
      createElementVNode("path", {
        d: "M14.667 8v8c0 0.505 0.285 0.967 0.737 1.193l5.333 2.667c0.658 0.329 1.46 0.062 1.789-0.596s0.062-1.46-0.596-1.789l-4.596-2.298c0 0 0-7.176 0-7.176 0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      })
    ]
  );
}
function Hn() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createElementVNode("path", {
        d: "M24.943 19.057l-8-8c-0.521-0.521-1.365-0.521-1.885 0l-8 8c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l7.057-7.057c0 0 7.057 7.057 7.057 7.057 0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
function Wn() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createElementVNode("path", {
        d: "M7.057 12.943l8 8c0.521 0.521 1.365 0.521 1.885 0l8-8c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-7.057 7.057c0 0-7.057-7.057-7.057-7.057-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
const bn = (e2, n, r) => {
  const t2 = parse(e2, n.slice(0, e2.length), new Date());
  return isValid(t2) && isDate(t2) ? set(t2, {
    hours: +r.hours,
    minutes: +(r == null ? void 0 : r.minutes),
    seconds: +(r == null ? void 0 : r.seconds),
    milliseconds: 0
  }) : null;
}, fa = (e2, n, r) => {
  const t2 = Array.isArray(r) ? r[0] : r;
  if (typeof n == "string")
    return bn(e2, n, t2);
  if (Array.isArray(n)) {
    let s3 = null;
    for (const d3 of n)
      if (s3 = bn(e2, d3, t2), s3)
        break;
    return s3;
  }
  return typeof n == "function" ? n(e2) : null;
}, w2 = (e2) => e2 ? new Date(e2) : new Date(), va = (e2, n) => {
  if (n) {
    const t2 = (e2.getMonth() + 1).toString().padStart(2, "0"), s3 = e2.getDate().toString().padStart(2, "0"), d3 = e2.getHours().toString().padStart(2, "0"), p = e2.getMinutes().toString().padStart(2, "0");
    return `${e2.getFullYear()}-${t2}-${s3}T${d3}:${p}:00.000Z`;
  }
  const r = Date.UTC(
    e2.getUTCFullYear(),
    e2.getUTCMonth(),
    e2.getUTCDate(),
    e2.getUTCHours(),
    e2.getUTCMinutes(),
    e2.getUTCSeconds()
  );
  return new Date(r).toISOString();
}, xe = (e2) => {
  let n = w2(JSON.parse(JSON.stringify(e2)));
  return n = setHours(n, 0), n = setMinutes(n, 0), n = setSeconds(n, 0), n = setMilliseconds(n, 0), n;
}, Fe = (e2, n, r, t2) => {
  let s3 = e2 ? w2(e2) : w2();
  return (n || n === 0) && (s3 = setHours(s3, +n)), (r || r === 0) && (s3 = setMinutes(s3, +r)), (t2 || t2 === 0) && (s3 = setSeconds(s3, +t2)), setMilliseconds(s3, 0);
}, Oe = (e2, n) => !e2 || !n ? false : isBefore(xe(e2), xe(n)), be = (e2, n) => !e2 || !n ? false : isEqual(xe(e2), xe(n)), Ve = (e2, n) => !e2 || !n ? false : isAfter(xe(e2), xe(n)), zn = (e2, n, r) => e2 && e2[0] && e2[1] ? Ve(r, e2[0]) && Oe(r, e2[1]) : e2 && e2[0] && n ? Ve(r, e2[0]) && Oe(r, n) || Oe(r, e2[0]) && Ve(r, n) : false, kt = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
}), Kn = () => {
  const e2 = (t2) => {
    kt.menuFocused = t2;
  }, n = (t2) => {
    kt.shiftKeyInMenu !== t2 && (kt.shiftKeyInMenu = t2);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: kt.shiftKeyInMenu, menuFocused: kt.menuFocused })),
    setMenuFocused: e2,
    setShiftKey: n
  };
};
function fn(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
var Bt = {}, ma = {
  get exports() {
    return Bt;
  },
  set exports(e2) {
    Bt = e2;
  }
};
(function(e2, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = r;
  function r(t2) {
    if (t2 === null || t2 === true || t2 === false)
      return NaN;
    var s3 = Number(t2);
    return isNaN(s3) ? s3 : s3 < 0 ? Math.ceil(s3) : Math.floor(s3);
  }
  e2.exports = n.default;
})(ma, Bt);
const ya = /* @__PURE__ */ fn(Bt);
var Yt = {}, ga = {
  get exports() {
    return Yt;
  },
  set exports(e2) {
    Yt = e2;
  }
};
(function(e2, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = r;
  function r(t2) {
    var s3 = new Date(Date.UTC(t2.getFullYear(), t2.getMonth(), t2.getDate(), t2.getHours(), t2.getMinutes(), t2.getSeconds(), t2.getMilliseconds()));
    return s3.setUTCFullYear(t2.getFullYear()), t2.getTime() - s3.getTime();
  }
  e2.exports = n.default;
})(ga, Yt);
const Dn = /* @__PURE__ */ fn(Yt);
function ha(e2, n) {
  var r = ba(n);
  return r.formatToParts ? ka(r, e2) : wa(r, e2);
}
var pa = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function ka(e2, n) {
  try {
    for (var r = e2.formatToParts(n), t2 = [], s3 = 0; s3 < r.length; s3++) {
      var d3 = pa[r[s3].type];
      d3 >= 0 && (t2[d3] = parseInt(r[s3].value, 10));
    }
    return t2;
  } catch (p) {
    if (p instanceof RangeError)
      return [NaN];
    throw p;
  }
}
function wa(e2, n) {
  var r = e2.format(n).replace(/\u200E/g, ""), t2 = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(r);
  return [t2[3], t2[1], t2[2], t2[4], t2[5], t2[6]];
}
var xt = {};
function ba(e2) {
  if (!xt[e2]) {
    var n = new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: "America/New_York",
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(new Date("2014-06-25T04:00:00.123Z")), r = n === "06/25/2014, 00:00:00" || n === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
    xt[e2] = r ? new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: e2,
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }) : new Intl.DateTimeFormat("en-US", {
      hourCycle: "h23",
      timeZone: e2,
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }
  return xt[e2];
}
function vn(e2, n, r, t2, s3, d3, p) {
  var C = new Date(0);
  return C.setUTCFullYear(e2, n, r), C.setUTCHours(t2, s3, d3, p), C;
}
var $n = 36e5, Da = 6e4, Gt = {
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-]\d{2}):?(\d{2})$/
};
function mn(e2, n, r) {
  var t2, s3;
  if (!e2 || (t2 = Gt.timezoneZ.exec(e2), t2))
    return 0;
  var d3;
  if (t2 = Gt.timezoneHH.exec(e2), t2)
    return d3 = parseInt(t2[1], 10), Mn(d3) ? -(d3 * $n) : NaN;
  if (t2 = Gt.timezoneHHMM.exec(e2), t2) {
    d3 = parseInt(t2[1], 10);
    var p = parseInt(t2[2], 10);
    return Mn(d3, p) ? (s3 = Math.abs(d3) * $n + p * Da, d3 > 0 ? -s3 : s3) : NaN;
  }
  if (Ta(e2)) {
    n = new Date(n || Date.now());
    var C = r ? n : $a(n), I2 = rn(C, e2), b2 = r ? I2 : Ma(n, I2, e2);
    return -b2;
  }
  return NaN;
}
function $a(e2) {
  return vn(
    e2.getFullYear(),
    e2.getMonth(),
    e2.getDate(),
    e2.getHours(),
    e2.getMinutes(),
    e2.getSeconds(),
    e2.getMilliseconds()
  );
}
function rn(e2, n) {
  var r = ha(e2, n), t2 = vn(
    r[0],
    r[1] - 1,
    r[2],
    r[3] % 24,
    r[4],
    r[5],
    0
  ).getTime(), s3 = e2.getTime(), d3 = s3 % 1e3;
  return s3 -= d3 >= 0 ? d3 : 1e3 + d3, t2 - s3;
}
function Ma(e2, n, r) {
  var t2 = e2.getTime(), s3 = t2 - n, d3 = rn(new Date(s3), r);
  if (n === d3)
    return n;
  s3 -= d3 - n;
  var p = rn(new Date(s3), r);
  return d3 === p ? d3 : Math.max(d3, p);
}
function Mn(e2, n) {
  return -23 <= e2 && e2 <= 23 && (n == null || 0 <= n && n <= 59);
}
var Tn = {};
function Ta(e2) {
  if (Tn[e2])
    return true;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e2 }), Tn[e2] = true, true;
  } catch {
    return false;
  }
}
var Aa = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
const jn = Aa;
var Zt = 36e5, An = 6e4, Sa = 2, Ye = {
  dateTimePattern: /^([0-9W+-]+)(T| )(.*)/,
  datePattern: /^([0-9W+-]+)(.*)/,
  plainTime: /:/,
  // year tokens
  YY: /^(\d{2})$/,
  YYY: [
    /^([+-]\d{2})$/,
    // 0 additional digits
    /^([+-]\d{3})$/,
    // 1 additional digit
    /^([+-]\d{4})$/
    // 2 additional digits
  ],
  YYYY: /^(\d{4})/,
  YYYYY: [
    /^([+-]\d{4})/,
    // 0 additional digits
    /^([+-]\d{5})/,
    // 1 additional digit
    /^([+-]\d{6})/
    // 2 additional digits
  ],
  // date tokens
  MM: /^-(\d{2})$/,
  DDD: /^-?(\d{3})$/,
  MMDD: /^-?(\d{2})-?(\d{2})$/,
  Www: /^-?W(\d{2})$/,
  WwwD: /^-?W(\d{2})-?(\d{1})$/,
  HH: /^(\d{2}([.,]\d*)?)$/,
  HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
  HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
  // time zone tokens (to identify the presence of a tz)
  timeZone: jn
};
function ln(e2, n) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e2 === null)
    return new Date(NaN);
  var r = n || {}, t2 = r.additionalDigits == null ? Sa : ya(r.additionalDigits);
  if (t2 !== 2 && t2 !== 1 && t2 !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e2 instanceof Date || typeof e2 == "object" && Object.prototype.toString.call(e2) === "[object Date]")
    return new Date(e2.getTime());
  if (typeof e2 == "number" || Object.prototype.toString.call(e2) === "[object Number]")
    return new Date(e2);
  if (!(typeof e2 == "string" || Object.prototype.toString.call(e2) === "[object String]"))
    return new Date(NaN);
  var s3 = Pa(e2), d3 = Ca(s3.date, t2), p = d3.year, C = d3.restDateString, I2 = _a(C, p);
  if (isNaN(I2))
    return new Date(NaN);
  if (I2) {
    var b2 = I2.getTime(), L2 = 0, $;
    if (s3.time && (L2 = Na(s3.time), isNaN(L2)))
      return new Date(NaN);
    if (s3.timeZone || r.timeZone) {
      if ($ = mn(s3.timeZone || r.timeZone, new Date(b2 + L2)), isNaN($))
        return new Date(NaN);
    } else
      $ = Dn(new Date(b2 + L2)), $ = Dn(new Date(b2 + L2 + $));
    return new Date(b2 + L2 + $);
  } else
    return new Date(NaN);
}
function Pa(e2) {
  var n = {}, r = Ye.dateTimePattern.exec(e2), t2;
  if (r ? (n.date = r[1], t2 = r[3]) : (r = Ye.datePattern.exec(e2), r ? (n.date = r[1], t2 = r[2]) : (n.date = null, t2 = e2)), t2) {
    var s3 = Ye.timeZone.exec(t2);
    s3 ? (n.time = t2.replace(s3[1], ""), n.timeZone = s3[1].trim()) : n.time = t2;
  }
  return n;
}
function Ca(e2, n) {
  var r = Ye.YYY[n], t2 = Ye.YYYYY[n], s3;
  if (s3 = Ye.YYYY.exec(e2) || t2.exec(e2), s3) {
    var d3 = s3[1];
    return {
      year: parseInt(d3, 10),
      restDateString: e2.slice(d3.length)
    };
  }
  if (s3 = Ye.YY.exec(e2) || r.exec(e2), s3) {
    var p = s3[1];
    return {
      year: parseInt(p, 10) * 100,
      restDateString: e2.slice(p.length)
    };
  }
  return {
    year: null
  };
}
function _a(e2, n) {
  if (n === null)
    return null;
  var r, t2, s3, d3;
  if (e2.length === 0)
    return t2 = new Date(0), t2.setUTCFullYear(n), t2;
  if (r = Ye.MM.exec(e2), r)
    return t2 = new Date(0), s3 = parseInt(r[1], 10) - 1, Pn(n, s3) ? (t2.setUTCFullYear(n, s3), t2) : new Date(NaN);
  if (r = Ye.DDD.exec(e2), r) {
    t2 = new Date(0);
    var p = parseInt(r[1], 10);
    return Ia(n, p) ? (t2.setUTCFullYear(n, 0, p), t2) : new Date(NaN);
  }
  if (r = Ye.MMDD.exec(e2), r) {
    t2 = new Date(0), s3 = parseInt(r[1], 10) - 1;
    var C = parseInt(r[2], 10);
    return Pn(n, s3, C) ? (t2.setUTCFullYear(n, s3, C), t2) : new Date(NaN);
  }
  if (r = Ye.Www.exec(e2), r)
    return d3 = parseInt(r[1], 10) - 1, Cn(n, d3) ? Sn(n, d3) : new Date(NaN);
  if (r = Ye.WwwD.exec(e2), r) {
    d3 = parseInt(r[1], 10) - 1;
    var I2 = parseInt(r[2], 10) - 1;
    return Cn(n, d3, I2) ? Sn(n, d3, I2) : new Date(NaN);
  }
  return null;
}
function Na(e2) {
  var n, r, t2;
  if (n = Ye.HH.exec(e2), n)
    return r = parseFloat(n[1].replace(",", ".")), Xt(r) ? r % 24 * Zt : NaN;
  if (n = Ye.HHMM.exec(e2), n)
    return r = parseInt(n[1], 10), t2 = parseFloat(n[2].replace(",", ".")), Xt(r, t2) ? r % 24 * Zt + t2 * An : NaN;
  if (n = Ye.HHMMSS.exec(e2), n) {
    r = parseInt(n[1], 10), t2 = parseInt(n[2], 10);
    var s3 = parseFloat(n[3].replace(",", "."));
    return Xt(r, t2, s3) ? r % 24 * Zt + t2 * An + s3 * 1e3 : NaN;
  }
  return null;
}
function Sn(e2, n, r) {
  n = n || 0, r = r || 0;
  var t2 = new Date(0);
  t2.setUTCFullYear(e2, 0, 4);
  var s3 = t2.getUTCDay() || 7, d3 = n * 7 + r + 1 - s3;
  return t2.setUTCDate(t2.getUTCDate() + d3), t2;
}
var Ra = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Oa = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function xn(e2) {
  return e2 % 400 === 0 || e2 % 4 === 0 && e2 % 100 !== 0;
}
function Pn(e2, n, r) {
  if (n < 0 || n > 11)
    return false;
  if (r != null) {
    if (r < 1)
      return false;
    var t2 = xn(e2);
    if (t2 && r > Oa[n] || !t2 && r > Ra[n])
      return false;
  }
  return true;
}
function Ia(e2, n) {
  if (n < 1)
    return false;
  var r = xn(e2);
  return !(r && n > 366 || !r && n > 365);
}
function Cn(e2, n, r) {
  return !(n < 0 || n > 52 || r != null && (r < 0 || r > 6));
}
function Xt(e2, n, r) {
  return !(e2 != null && (e2 < 0 || e2 >= 25) || n != null && (n < 0 || n >= 60) || r != null && (r < 0 || r >= 60));
}
var Vt = {}, Ba = {
  get exports() {
    return Vt;
  },
  set exports(e2) {
    Vt = e2;
  }
}, Et = {}, Ya = {
  get exports() {
    return Et;
  },
  set exports(e2) {
    Et = e2;
  }
};
(function(e2, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = r;
  function r(t2, s3) {
    if (t2 == null)
      throw new TypeError("assign requires that input parameter not be null or undefined");
    for (var d3 in s3)
      Object.prototype.hasOwnProperty.call(s3, d3) && (t2[d3] = s3[d3]);
    return t2;
  }
  e2.exports = n.default;
})(Ya, Et);
(function(e2, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = s3;
  var r = t2(Et);
  function t2(d3) {
    return d3 && d3.__esModule ? d3 : { default: d3 };
  }
  function s3(d3) {
    return (0, r.default)({}, d3);
  }
  e2.exports = n.default;
})(Ba, Vt);
const Va = /* @__PURE__ */ fn(Vt);
function Ea(e2, n, r) {
  var t2 = ln(e2, r), s3 = mn(n, t2, true), d3 = new Date(t2.getTime() - s3), p = new Date(0);
  return p.setFullYear(d3.getUTCFullYear(), d3.getUTCMonth(), d3.getUTCDate()), p.setHours(d3.getUTCHours(), d3.getUTCMinutes(), d3.getUTCSeconds(), d3.getUTCMilliseconds()), p;
}
function La(e2, n, r) {
  if (typeof e2 == "string" && !e2.match(jn)) {
    var t2 = Va(r);
    return t2.timeZone = n, ln(e2, t2);
  }
  var s3 = ln(e2, r), d3 = vn(
    s3.getFullYear(),
    s3.getMonth(),
    s3.getDate(),
    s3.getHours(),
    s3.getMinutes(),
    s3.getSeconds(),
    s3.getMilliseconds()
  ).getTime(), p = mn(n, new Date(d3));
  return new Date(d3 + p);
}
const Fa = (e2, n = 3) => {
  const r = [];
  for (let t2 = 0; t2 < e2.length; t2 += n)
    r.push([e2[t2], e2[t2 + 1], e2[t2 + 2]]);
  return r;
}, Ua = (e2, n) => {
  const r = [1, 2, 3, 4, 5, 6, 7].map((d3) => new Intl.DateTimeFormat(e2, { weekday: "short", timeZone: "UTC" }).format(new Date(`2017-01-0${d3}T00:00:00+00:00`)).slice(0, 2)), t2 = r.slice(0, n), s3 = r.slice(n + 1, r.length);
  return [r[n]].concat(...s3).concat(...t2);
}, Ha = (e2) => {
  const n = [];
  for (let r = +e2[0]; r <= +e2[1]; r++)
    n.push({ value: +r, text: `${r}` });
  return n;
}, Wa = (e2, n) => {
  const r = new Intl.DateTimeFormat(e2, { month: n, timeZone: "UTC" });
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((s3) => {
    const d3 = s3 < 10 ? `0${s3}` : s3;
    return new Date(`2017-${d3}-01T00:00:00+00:00`);
  }).map((s3, d3) => ({
    text: r.format(s3),
    value: d3
  }));
}, za = (e2) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e2], Te = (e2) => {
  const n = unref(e2);
  return n != null && n.$el ? n == null ? void 0 : n.$el : n;
}, Ka = (e2) => Object.assign({ type: "dot" }, e2), Gn = (e2) => Array.isArray(e2) ? !!e2[0] && !!e2[1] : false, Lt = {
  prop: (e2) => `"${e2}" prop must be enabled!`,
  dateArr: (e2) => `You need to use array as "model-value" binding in order to support "${e2}"`
}, Se = (e2) => e2, _n = (e2) => e2 === 0 ? e2 : !e2 || isNaN(+e2) ? null : +e2, Nn = (e2) => Object.assign(
  {
    menuAppear: "dp-menu-appear",
    open: "dp-slide-down",
    close: "dp-slide-up",
    next: "calendar-next",
    previous: "calendar-prev",
    vNext: "dp-slide-up",
    vPrevious: "dp-slide-down"
  },
  e2
), ja = (e2) => Object.assign(
  {
    toggleOverlay: "Toggle overlay",
    menu: "Datepicker menu",
    input: "Datepicker input",
    calendarWrap: "Calendar wrapper",
    calendarDays: "Calendar days",
    openTimePicker: "Open time picker",
    closeTimePicker: "Close time Picker",
    incrementValue: (n) => `Increment ${n}`,
    decrementValue: (n) => `Decrement ${n}`,
    openTpOverlay: (n) => `Open ${n} overlay`,
    amPmButton: "Switch AM/PM mode",
    openYearsOverlay: "Open years overlay",
    openMonthsOverlay: "Open months overlay",
    nextMonth: "Next month",
    prevMonth: "Previous month",
    day: () => ""
  },
  e2
), xa = (e2) => e2 === null ? 0 : typeof e2 == "boolean" ? e2 ? 2 : 0 : +e2 >= 2 ? +e2 : 2, Ga = (e2, n, r) => e2 || (typeof r == "string" ? r : n), Za = (e2) => typeof e2 == "boolean" ? e2 ? Nn({}) : false : Nn(e2), Xa = () => ({
  enterSubmit: true,
  tabSubmit: true,
  openMenu: true,
  rangeSeparator: " - "
}), qa = (e2) => Object.assign({ months: [], years: [], times: { hours: [], minutes: [], seconds: [] } }, e2), Le = (e2) => {
  const n = () => {
    if (e2.partialRange)
      return null;
    throw new Error(Lt.prop("partial-range"));
  }, r = computed(() => ({
    ariaLabels: ja(e2.ariaLabels),
    textInputOptions: Object.assign(Xa(), e2.textInputOptions),
    multiCalendars: xa(e2.multiCalendars),
    previewFormat: Ga(e2.previewFormat, e2.format, d3()),
    filters: qa(e2.filters),
    transitions: Za(e2.transitions),
    startTime: f()
  })), t2 = (a3) => {
    if (e2.range)
      return a3();
    throw new Error(Lt.prop("range"));
  }, s3 = () => {
    const a3 = e2.enableSeconds ? ":ss" : "";
    return e2.is24 ? `HH:mm${a3}` : `hh:mm${a3} aa`;
  }, d3 = () => e2.format ? e2.format : e2.monthPicker ? "MM/yyyy" : e2.timePicker ? s3() : e2.weekPicker ? "MM/dd/yyyy" : e2.yearPicker ? "yyyy" : e2.enableTimePicker ? `MM/dd/yyyy, ${s3()}` : "MM/dd/yyyy", p = (a3, m3) => {
    if (typeof e2.format == "function")
      return e2.format(a3);
    const y3 = m3 || d3(), A = e2.formatLocale ? { locale: e2.formatLocale } : void 0;
    return Array.isArray(a3) ? `${format(a3[0], y3, A)} ${e2.modelAuto && !a3[1] ? "" : r.value.textInputOptions.rangeSeparator || "-"} ${a3[1] ? format(a3[1], y3, A) : ""}` : format(a3, y3, A);
  }, C = (a3) => e2.timezone ? Ea(a3, e2.timezone) : a3, I2 = (a3) => e2.timezone ? La(a3, e2.timezone) : a3, b2 = computed(() => (a3) => {
    var m3;
    return (m3 = e2.hideNavigation) == null ? void 0 : m3.includes(a3);
  }), L2 = (a3) => {
    const m3 = e2.maxDate ? Ve(C(a3), C(w2(e2.maxDate))) : false, y3 = e2.minDate ? Oe(C(a3), C(w2(e2.minDate))) : false, A = O2(a3, e2.disabledDates), N = r.value.filters.months.map((ee) => +ee).includes(getMonth(a3)), ce = e2.disabledWeekDays.length ? e2.disabledWeekDays.some((ee) => +ee === getDay(a3)) : false, v = e2.allowedDates.length ? !e2.allowedDates.some((ee) => be(C(w2(ee)), C(a3))) : false, o = getYear(a3), Z = o < +e2.yearRange[0] || o > +e2.yearRange[1];
    return !(m3 || y3 || A || N || Z || ce || v);
  }, $ = (a3) => {
    const m3 = {
      hours: getHours(w2()),
      minutes: getMinutes(w2()),
      seconds: e2.enableSeconds ? getSeconds(w2()) : 0
    };
    return Object.assign(m3, a3);
  }, f = () => e2.range ? e2.startTime && Array.isArray(e2.startTime) ? [$(e2.startTime[0]), $(e2.startTime[1])] : null : e2.startTime && !Array.isArray(e2.startTime) ? $(e2.startTime) : null, M3 = (a3) => !L2(a3), H3 = (a3) => Array.isArray(a3) ? isValid(a3[0]) && (a3[1] ? isValid(a3[1]) : true) : a3 ? isValid(a3) : false, B2 = (a3) => a3 instanceof Date ? a3 : parseISO(a3), J = (a3) => {
    const m3 = startOfWeek(C(a3), { weekStartsOn: +e2.weekStart }), y3 = endOfWeek(C(a3), { weekStartsOn: +e2.weekStart });
    return [m3, y3];
  }, O2 = (a3, m3) => Array.isArray(m3) ? m3.some((y3) => be(C(w2(y3)), C(a3))) : m3(a3), E2 = (a3, m3, y3) => {
    let A = a3 ? w2(a3) : w2();
    return (m3 || m3 === 0) && (A = setMonth(A, m3)), y3 && (A = setYear(A, y3)), A;
  }, S3 = (a3) => set(w2(), { hours: getHours(a3), minutes: getMinutes(a3), seconds: getSeconds(a3) }), G2 = (a3) => set(w2(), {
    hours: +a3.hours || 0,
    minutes: +a3.minutes || 0,
    seconds: +a3.seconds || 0
  }), le = (a3, m3, y3, A) => {
    if (!a3)
      return true;
    if (A) {
      const j = y3 === "max" ? isBefore(a3, m3) : isAfter(a3, m3), N = { seconds: 0, milliseconds: 0 };
      return j || isEqual(set(a3, N), set(m3, N));
    }
    return y3 === "max" ? a3.getTime() <= m3.getTime() : a3.getTime() >= m3.getTime();
  }, oe = () => !e2.enableTimePicker || e2.monthPicker || e2.yearPicker || e2.ignoreTimeValidation, de = (a3) => Array.isArray(a3) ? [a3[0] ? S3(a3[0]) : null, a3[1] ? S3(a3[1]) : null] : S3(a3), T2 = (a3) => {
    const m3 = e2.maxTime ? G2(e2.maxTime) : w2(e2.maxDate);
    return Array.isArray(a3) ? le(a3[0], m3, "max", !!e2.maxDate) && le(a3[1], m3, "max", !!e2.maxDate) : le(a3, m3, "max", !!e2.maxDate);
  }, Y2 = (a3, m3) => {
    const y3 = e2.minTime ? G2(e2.minTime) : w2(e2.minDate);
    return Array.isArray(a3) ? le(a3[0], y3, "min", !!e2.minDate) && le(a3[1], y3, "min", !!e2.minDate) && m3 : le(a3, y3, "min", !!e2.minDate) && m3;
  }, F = (a3) => {
    let m3 = true;
    if (!a3 || oe())
      return true;
    const y3 = !e2.minDate && !e2.maxDate ? de(a3) : a3;
    return (e2.maxTime || e2.maxDate) && (m3 = T2(Se(y3))), (e2.minTime || e2.minDate) && (m3 = Y2(Se(y3), m3)), m3;
  }, c2 = (a3, m3) => {
    const y3 = w2(JSON.parse(JSON.stringify(a3))), A = [];
    for (let j = 0; j < 7; j++) {
      const N = addDays(y3, j), ce = getMonth(N) !== m3;
      A.push({
        text: e2.hideOffsetDates && ce ? "" : N.getDate(),
        value: N,
        current: !ce,
        classData: {}
      });
    }
    return A;
  }, _ = (a3, m3) => {
    const y3 = [], A = w2(C(new Date(m3, a3))), j = w2(C(new Date(m3, a3 + 1, 0))), N = startOfWeek(A, { weekStartsOn: e2.weekStart }), ce = (v) => {
      const o = c2(v, a3);
      if (y3.push({ days: o }), !y3[y3.length - 1].days.some(
        (Z) => be(xe(Z.value), xe(j))
      )) {
        const Z = addDays(v, 7);
        ce(Z);
      }
    };
    if (ce(N), e2.sixWeeks && y3.length < 6) {
      const v = 6 - y3.length;
      for (let o = 1; o <= v; o++) {
        const Z = y3[y3.length - 1], ee = Z.days[Z.days.length - 1], we = c2(addDays(ee.value, 1), getMonth(A));
        y3.push({ days: we });
      }
    }
    return y3;
  }, W = (a3, m3, y3) => [set(w2(a3), { date: 1 }), set(w2(), { month: m3, year: y3, date: 1 })], q2 = (a3, m3) => Oe(...W(e2.minDate, a3, m3)) || be(...W(e2.minDate, a3, m3)), te = (a3, m3) => Ve(...W(e2.maxDate, a3, m3)) || be(...W(e2.maxDate, a3, m3)), R2 = (a3, m3, y3) => {
    let A = false;
    return e2.maxDate && y3 && te(a3, m3) && (A = true), e2.minDate && !y3 && q2(a3, m3) && (A = true), A;
  };
  return {
    checkPartialRangeValue: n,
    checkRangeEnabled: t2,
    getZonedDate: C,
    getZonedToUtc: I2,
    formatDate: p,
    getDefaultPattern: d3,
    validateDate: L2,
    getDefaultStartTime: f,
    isDisabled: M3,
    isValidDate: H3,
    sanitizeDate: B2,
    getWeekFromDate: J,
    matchDate: O2,
    setDateMonthOrYear: E2,
    isValidTime: F,
    getCalendarDays: _,
    validateMonthYearInRange: (a3, m3, y3, A) => {
      let j = false;
      return A ? e2.minDate && e2.maxDate ? j = R2(a3, m3, y3) : (e2.minDate && q2(a3, m3) || e2.maxDate && te(a3, m3)) && (j = true) : j = true, j;
    },
    validateMaxDate: te,
    validateMinDate: q2,
    assignDefaultTime: $,
    defaults: r,
    hideNavigationButtons: b2
  };
}, he = reactive({
  monthYear: [],
  calendar: [],
  time: [],
  actionRow: [],
  selectionGrid: [],
  timePicker: {
    0: [],
    1: []
  },
  monthPicker: []
}), qt = ref(null), Pt = ref(false), Jt = ref(false), Qt = ref(false), en = ref(false), Be = ref(0), Ce = ref(0), tt = () => {
  const e2 = computed(() => Pt.value ? [...he.selectionGrid, he.actionRow].filter((O2) => O2.length) : Jt.value ? [
    ...he.timePicker[0],
    ...he.timePicker[1],
    en.value ? [] : [qt.value],
    he.actionRow
  ].filter((O2) => O2.length) : Qt.value ? [...he.monthPicker, he.actionRow] : [he.monthYear, ...he.calendar, he.time, he.actionRow].filter((O2) => O2.length)), n = (O2) => {
    Be.value = O2 ? Be.value + 1 : Be.value - 1;
    let E2 = null;
    e2.value[Ce.value] && (E2 = e2.value[Ce.value][Be.value]), E2 || (Be.value = O2 ? Be.value - 1 : Be.value + 1);
  }, r = (O2) => {
    if (Ce.value === 0 && !O2 || Ce.value === e2.value.length && O2)
      return;
    Ce.value = O2 ? Ce.value + 1 : Ce.value - 1, e2.value[Ce.value] ? e2.value[Ce.value] && !e2.value[Ce.value][Be.value] && Be.value !== 0 && (Be.value = e2.value[Ce.value].length - 1) : Ce.value = O2 ? Ce.value - 1 : Ce.value + 1;
  }, t2 = (O2) => {
    let E2 = null;
    e2.value[Ce.value] && (E2 = e2.value[Ce.value][Be.value]), E2 ? E2.focus({ preventScroll: !Pt.value }) : Be.value = O2 ? Be.value - 1 : Be.value + 1;
  }, s3 = () => {
    n(true), t2(true);
  }, d3 = () => {
    n(false), t2(false);
  }, p = () => {
    r(false), t2(true);
  }, C = () => {
    r(true), t2(true);
  }, I2 = (O2, E2) => {
    he[E2] = O2;
  }, b2 = (O2, E2) => {
    he[E2] = O2;
  }, L2 = () => {
    Be.value = 0, Ce.value = 0;
  };
  return {
    buildMatrix: I2,
    buildMultiLevelMatrix: b2,
    setTimePickerBackRef: (O2) => {
      qt.value = O2;
    },
    setSelectionGrid: (O2) => {
      Pt.value = O2, L2(), O2 || (he.selectionGrid = []);
    },
    setTimePicker: (O2, E2 = false) => {
      Jt.value = O2, en.value = E2, L2(), O2 || (he.timePicker[0] = [], he.timePicker[1] = []);
    },
    setTimePickerElements: (O2, E2 = 0) => {
      he.timePicker[E2] = O2;
    },
    arrowRight: s3,
    arrowLeft: d3,
    arrowUp: p,
    arrowDown: C,
    clearArrowNav: () => {
      he.monthYear = [], he.calendar = [], he.time = [], he.actionRow = [], he.selectionGrid = [], he.timePicker[0] = [], he.timePicker[1] = [], Pt.value = false, Jt.value = false, en.value = false, Qt.value = false, L2(), qt.value = null;
    },
    setMonthPicker: (O2) => {
      Qt.value = O2, L2();
    },
    refSets: he
    // exposed for testing
  };
}, Rn = (e2) => Array.isArray(e2), lt = (e2) => Array.isArray(e2), On = (e2) => Array.isArray(e2) && e2.length === 2, Ja = (e2, n, r, t2, s3) => {
  const {
    getDefaultStartTime: d3,
    isDisabled: p,
    sanitizeDate: C,
    getWeekFromDate: I2,
    setDateMonthOrYear: b2,
    validateMonthYearInRange: L2,
    defaults: $
  } = Le(e2), f = computed({
    get: () => e2.internalModelValue,
    set: (i2) => {
      !e2.readonly && !e2.disabled && n("update:internal-model-value", i2);
    }
  }), M3 = ref([]);
  watch(f, () => {
    le();
  });
  const H3 = ref([{ month: getMonth(w2()), year: getYear(w2()) }]), B2 = reactive({
    hours: e2.range ? [getHours(w2()), getHours(w2())] : getHours(w2()),
    minutes: e2.range ? [getMinutes(w2()), getMinutes(w2())] : getMinutes(w2()),
    seconds: e2.range ? [0, 0] : 0
  }), J = computed(
    () => (i2) => H3.value[i2] ? H3.value[i2].month : 0
  ), O2 = computed(
    () => (i2) => H3.value[i2] ? H3.value[i2].year : 0
  ), E2 = computed(() => e2.flow && e2.flow.length && !e2.partialFlow ? s3.value === e2.flow.length : true), S3 = (i2, k2, x2) => {
    var Q2, De;
    H3.value[i2] || (H3.value[i2] = { month: 0, year: 0 }), H3.value[i2].month = k2 === null ? (Q2 = H3.value[i2]) == null ? void 0 : Q2.month : k2, H3.value[i2].year = x2 === null ? (De = H3.value[i2]) == null ? void 0 : De.year : x2;
  }, G2 = (i2, k2) => {
    B2[i2] = k2;
  };
  onMounted(() => {
    f.value || (e2.startDate && (S3(0, getMonth(w2(e2.startDate)), getYear(w2(e2.startDate))), $.value.multiCalendars && ye(0)), $.value.startTime && te()), le(true);
  });
  const le = (i2 = false) => {
    if (f.value)
      return Array.isArray(f.value) ? (M3.value = f.value, F(i2)) : de(f.value);
    if (e2.timePicker)
      return c2();
    if (e2.monthPicker && !e2.range)
      return _();
    if (e2.yearPicker && !e2.range)
      return W();
    if ($.value.multiCalendars && i2 && !e2.startDate)
      return oe(w2(), i2);
  }, oe = (i2, k2 = false) => {
    if ((!$.value.multiCalendars || !e2.multiStatic || k2) && S3(0, getMonth(i2), getYear(i2)), $.value.multiCalendars)
      for (let x2 = 1; x2 < $.value.multiCalendars; x2++) {
        const Q2 = set(w2(), { month: J.value(x2 - 1), year: O2.value(x2 - 1) }), De = add(Q2, { months: 1 });
        H3.value[x2] = { month: getMonth(De), year: getYear(De) };
      }
  }, de = (i2) => {
    oe(i2), G2("hours", getHours(i2)), G2("minutes", getMinutes(i2)), G2("seconds", getSeconds(i2));
  }, T2 = (i2, k2) => {
    oe(i2[0], k2);
    const x2 = (Q2, De) => [
      Q2(i2[0]),
      i2[1] ? Q2(i2[1]) : B2[De][1]
    ];
    G2("hours", x2(getHours, "hours")), G2("minutes", x2(getMinutes, "minutes")), G2("seconds", x2(getSeconds, "seconds"));
  }, Y2 = (i2, k2) => {
    if ((e2.range || e2.weekPicker) && !e2.multiDates)
      return T2(i2, k2);
    if (e2.multiDates) {
      const x2 = i2[i2.length - 1];
      return de(x2);
    }
  }, F = (i2) => {
    const k2 = f.value;
    Y2(k2, i2), $.value.multiCalendars && e2.multiCalendarsSolo && l();
  }, c2 = () => {
    if (te(), !e2.range)
      f.value = Fe(w2(), B2.hours, B2.minutes, q2());
    else {
      const i2 = B2.hours, k2 = B2.minutes;
      f.value = [
        Fe(w2(), i2[0], k2[0], q2()),
        Fe(w2(), i2[1], k2[1], q2(false))
      ];
    }
  }, _ = () => {
    f.value = b2(w2(), J.value(0), O2.value(0));
  }, W = () => {
    f.value = w2();
  }, q2 = (i2 = true) => e2.enableSeconds ? Array.isArray(B2.seconds) ? i2 ? B2.seconds[0] : B2.seconds[1] : B2.seconds : 0, te = () => {
    const i2 = d3();
    if (i2) {
      const k2 = Array.isArray(i2), x2 = k2 ? [+i2[0].hours, +i2[1].hours] : +i2.hours, Q2 = k2 ? [+i2[0].minutes, +i2[1].minutes] : +i2.minutes, De = k2 ? [+i2[0].seconds, +i2[1].seconds] : +i2.seconds;
      G2("hours", x2), G2("minutes", Q2), e2.enableSeconds && G2("seconds", De);
    }
  }, R2 = () => Array.isArray(f.value) && f.value.length ? f.value[f.value.length - 1] : null, l = () => {
    if (Array.isArray(f.value) && f.value.length === 2) {
      const i2 = w2(
        w2(f.value[1] ? f.value[1] : addMonths(f.value[0], 1))
      ), [k2, x2] = [getMonth(f.value[0]), getYear(f.value[0])], [Q2, De] = [getMonth(f.value[1]), getYear(f.value[1])];
      (k2 !== Q2 || k2 === Q2 && x2 !== De) && e2.multiCalendarsSolo && S3(1, getMonth(i2), getYear(i2));
    }
  }, a3 = (i2) => {
    const k2 = addMonths(i2, 1);
    return { month: getMonth(k2), year: getYear(k2) };
  }, m3 = (i2) => {
    const k2 = getMonth(w2(i2)), x2 = getYear(w2(i2));
    if (S3(0, k2, x2), $.value.multiCalendars > 0)
      for (let Q2 = 1; Q2 < $.value.multiCalendars; Q2++) {
        const De = a3(
          set(w2(i2), { year: J.value(Q2 - 1), month: O2.value(Q2 - 1) })
        );
        S3(Q2, De.month, De.year);
      }
  }, y3 = (i2) => {
    if (f.value && Array.isArray(f.value))
      if (f.value.some((k2) => be(i2, k2))) {
        const k2 = f.value.filter((x2) => !be(x2, i2));
        f.value = k2.length ? k2 : null;
      } else
        (e2.multiDatesLimit && +e2.multiDatesLimit > f.value.length || !e2.multiDatesLimit) && f.value.push(i2);
    else
      f.value = [i2];
  }, A = (i2, k2) => {
    const x2 = Ve(i2, k2) ? k2 : i2, Q2 = Ve(k2, i2) ? k2 : i2;
    return eachDayOfInterval({ start: x2, end: Q2 });
  }, j = (i2, k2 = 0) => {
    if (Array.isArray(f.value) && f.value[k2]) {
      const x2 = differenceInCalendarDays(i2, f.value[k2]), Q2 = A(f.value[k2], i2), De = Q2.length === 1 ? 0 : Q2.filter((z2) => p(z2)).length, g = Math.abs(x2) - De;
      if (e2.minRange && e2.maxRange)
        return g >= +e2.minRange && g <= +e2.maxRange;
      if (e2.minRange)
        return g >= +e2.minRange;
      if (e2.maxRange)
        return g <= +e2.maxRange;
    }
    return true;
  }, N = (i2) => Array.isArray(f.value) && f.value.length === 2 ? e2.fixedStart && (Ve(i2, f.value[0]) || be(i2, f.value[0])) ? [f.value[0], i2] : e2.fixedEnd && (Oe(i2, f.value[1]) || be(i2, f.value[1])) ? [i2, f.value[1]] : (n("invalid-fixed-range", i2), f.value) : [], ce = () => {
    e2.autoApply && E2.value && n("auto-apply", e2.partialFlow);
  }, v = () => {
    e2.autoApply && n("select-date");
  }, o = (i2) => !eachDayOfInterval({ start: i2[0], end: i2[1] }).some((x2) => p(x2)), Z = (i2) => (f.value = I2(w2(i2.value)), ce()), ee = (i2) => {
    const k2 = Fe(w2(i2.value), B2.hours, B2.minutes, q2());
    e2.multiDates ? y3(k2) : f.value = k2, r(), ce();
  }, we = () => {
    M3.value = f.value ? f.value.slice() : [], M3.value.length === 2 && !(e2.fixedStart || e2.fixedEnd) && (M3.value = []);
  }, ze = (i2, k2) => {
    const x2 = [w2(i2.value), addDays(w2(i2.value), +e2.autoRange)];
    o(x2) && (k2 && m3(i2.value), M3.value = x2);
  }, Je = (i2) => {
    re(i2.value) || !j(i2.value, e2.fixedStart ? 0 : 1) || (M3.value = N(w2(i2.value)));
  }, re = (i2) => e2.noDisabledRange ? A(M3.value[0], i2).some((x2) => p(x2)) : false, Ge = (i2, k2) => {
    if (we(), e2.autoRange)
      return ze(i2, k2);
    if (e2.fixedStart || e2.fixedEnd)
      return Je(i2);
    M3.value[0] ? j(w2(i2.value)) && !re(i2.value) && (Oe(w2(i2.value), w2(M3.value[0])) ? M3.value.unshift(w2(i2.value)) : M3.value[1] = w2(i2.value)) : M3.value[0] = w2(i2.value);
  }, Ke = (i2) => {
    M3.value[i2] = Fe(
      M3.value[i2],
      B2.hours[i2],
      B2.minutes[i2],
      q2(i2 !== 1)
    );
  }, Ie = () => {
    M3.value.length && (M3.value[0] && !M3.value[1] ? Ke(0) : (Ke(0), Ke(1), r()), f.value = M3.value.slice(), M3.value[0] && M3.value[1] && e2.autoApply && n("auto-apply"), M3.value[0] && !M3.value[1] && e2.modelAuto && e2.autoApply && n("auto-apply"));
  }, ht = (i2, k2 = false) => {
    if (!(p(i2.value) || !i2.current && e2.hideOffsetDates)) {
      if (e2.weekPicker)
        return Z(i2);
      if (!e2.range)
        return ee(i2);
      lt(B2.hours) && lt(B2.minutes) && !e2.multiDates && (Ge(i2, k2), Ie());
    }
  }, ne = (i2) => {
    const k2 = i2[0];
    return e2.weekNumbers === "local" ? getWeek(k2.value, { weekStartsOn: +e2.weekStart }) : e2.weekNumbers === "iso" ? getISOWeek(k2.value) : typeof e2.weekNumbers == "function" ? e2.weekNumbers(k2.value) : "";
  }, ye = (i2) => {
    for (let k2 = i2 - 1; k2 >= 0; k2--) {
      const x2 = subMonths(set(w2(), { month: J.value(k2 + 1), year: O2.value(k2 + 1) }), 1);
      S3(k2, getMonth(x2), getYear(x2));
    }
    for (let k2 = i2 + 1; k2 <= $.value.multiCalendars - 1; k2++) {
      const x2 = addMonths(set(w2(), { month: J.value(k2 - 1), year: O2.value(k2 - 1) }), 1);
      S3(k2, getMonth(x2), getYear(x2));
    }
  }, ve = (i2) => b2(w2(), J.value(i2), O2.value(i2)), at = (i2) => Fe(i2, B2.hours, B2.minutes, q2()), rt = (i2, k2) => {
    const x2 = e2.monthPicker ? J.value(i2) !== k2.month || !k2.fromNav : O2.value(i2) !== k2.year;
    if (S3(i2, k2.month, k2.year), $.value.multiCalendars && !e2.multiCalendarsSolo && ye(i2), e2.monthPicker || e2.yearPicker)
      if (e2.range) {
        if (x2) {
          let Q2 = f.value ? f.value.slice() : [];
          Q2.length === 2 && Q2[1] !== null && (Q2 = []), Q2.length ? Oe(ve(i2), Q2[0]) ? Q2.unshift(ve(i2)) : Q2[1] = ve(i2) : Q2 = [ve(i2)], f.value = Q2;
        }
      } else
        f.value = ve(i2);
    n("update-month-year", { instance: i2, month: k2.month, year: k2.year }), t2(e2.multiCalendarsSolo ? i2 : void 0);
  }, Ht = async (i2 = false) => {
    if (e2.autoApply && (e2.monthPicker || e2.yearPicker)) {
      await nextTick$1();
      const k2 = e2.monthPicker ? i2 : false;
      e2.range ? n("auto-apply", k2 || !f.value || f.value.length === 1) : n("auto-apply", k2);
    }
    r();
  }, Mt = (i2, k2) => {
    const x2 = set(w2(), { month: J.value(k2), year: O2.value(k2) }), Q2 = i2 < 0 ? addMonths(x2, 1) : subMonths(x2, 1);
    L2(getMonth(Q2), getYear(Q2), i2 < 0, e2.preventMinMaxNavigation) && (S3(k2, getMonth(Q2), getYear(Q2)), $.value.multiCalendars && !e2.multiCalendarsSolo && ye(k2), n("update-month-year", { instance: k2, month: getMonth(Q2), year: getYear(Q2) }), t2());
  }, pt = (i2) => {
    Rn(i2) && Rn(f.value) && lt(B2.hours) && lt(B2.minutes) ? (i2[0] && f.value[0] && (f.value[0] = Fe(i2[0], B2.hours[0], B2.minutes[0], q2())), i2[1] && f.value[1] && (f.value[1] = Fe(i2[1], B2.hours[1], B2.minutes[1], q2(false)))) : e2.multiDates && Array.isArray(f.value) ? f.value[f.value.length - 1] = at(i2) : !e2.range && !On(i2) && (f.value = at(i2)), n("time-update");
  }, Wt = (i2, k2 = true, x2 = false) => {
    const Q2 = k2 ? i2 : B2.hours, De = !k2 && !x2 ? i2 : B2.minutes, g = x2 ? i2 : B2.seconds;
    if (e2.range && On(f.value) && lt(Q2) && lt(De) && lt(g) && !e2.disableTimeRangeValidation) {
      const z2 = ($e) => Fe(f.value[$e], Q2[$e], De[$e], g[$e]), Ae = ($e) => setMilliseconds(f.value[$e], 0);
      if (be(f.value[0], f.value[1]) && (isAfter(z2(0), Ae(1)) || isBefore(z2(1), Ae(0))))
        return;
    }
    if (G2("hours", Q2), G2("minutes", De), G2("seconds", g), f.value)
      if (e2.multiDates) {
        const z2 = R2();
        z2 && pt(z2);
      } else
        pt(f.value);
    else
      e2.timePicker && pt(e2.range ? [w2(), w2()] : w2());
    r();
  }, zt = (i2, k2) => {
    e2.monthChangeOnScroll && Mt(e2.monthChangeOnScroll !== "inverse" ? -i2.deltaY : i2.deltaY, k2);
  }, Kt = (i2, k2, x2 = false) => {
    e2.monthChangeOnArrows && e2.vertical === x2 && Tt(i2, k2);
  }, Tt = (i2, k2) => {
    Mt(i2 === "right" ? -1 : 1, k2);
  };
  return {
    time: B2,
    month: J,
    year: O2,
    modelValue: f,
    calendars: H3,
    monthYearSelect: Ht,
    isDisabled: p,
    updateTime: Wt,
    getWeekNum: ne,
    selectDate: ht,
    updateMonthYear: rt,
    handleScroll: zt,
    getMarker: (i2) => e2.markers.find((k2) => be(C(i2.value), C(k2.date))),
    handleArrow: Kt,
    handleSwipe: Tt,
    selectCurrentDate: () => {
      e2.range ? f.value && Array.isArray(f.value) && f.value[0] ? f.value = Oe(w2(), f.value[0]) ? [w2(), f.value[0]] : [f.value[0], w2()] : f.value = [w2()] : f.value = w2(), v();
    },
    presetDateRange: (i2, k2) => {
      k2 || i2.length && i2.length <= 2 && e2.range && (f.value = i2.map((x2) => w2(x2)), v(), e2.multiCalendars && nextTick$1().then(() => le(true)));
    }
  };
}, Qa = (e2, n, r) => {
  const t2 = ref(), {
    getZonedToUtc: s3,
    getZonedDate: d3,
    formatDate: p,
    getDefaultPattern: C,
    checkRangeEnabled: I2,
    checkPartialRangeValue: b2,
    isValidDate: L2,
    setDateMonthOrYear: $,
    defaults: f
  } = Le(n), M3 = ref(""), H3 = toRef(n, "format");
  watch(t2, () => {
    e2("internal-model-change", t2.value);
  }), watch(H3, () => {
    a3();
  });
  const B2 = (o) => {
    const Z = o || w2();
    return n.modelType ? y3(Z) : {
      hours: getHours(Z),
      minutes: getMinutes(Z),
      seconds: n.enableSeconds ? getSeconds(Z) : 0
    };
  }, J = (o) => n.modelType ? y3(o) : { month: getMonth(o), year: getYear(o) }, O2 = (o) => Array.isArray(o) ? I2(() => [
    setYear(w2(), o[0]),
    o[1] ? setYear(w2(), o[1]) : b2()
  ]) : setYear(w2(), +o), E2 = (o, Z) => (typeof o == "string" || typeof o == "number") && n.modelType ? m3(o) : Z, S3 = (o) => Array.isArray(o) ? [
    E2(
      o[0],
      Fe(null, +o[0].hours, +o[0].minutes, o[0].seconds)
    ),
    E2(
      o[1],
      Fe(null, +o[1].hours, +o[1].minutes, o[1].seconds)
    )
  ] : E2(o, Fe(null, o.hours, o.minutes, o.seconds)), G2 = (o) => Array.isArray(o) ? I2(() => [
    E2(o[0], $(null, +o[0].month, +o[0].year)),
    E2(
      o[1],
      o[1] ? $(null, +o[1].month, +o[1].year) : b2()
    )
  ]) : E2(o, $(null, +o.month, +o.year)), le = (o) => {
    if (Array.isArray(o))
      return o.map((Z) => m3(Z));
    throw new Error(Lt.dateArr("multi-dates"));
  }, oe = (o) => {
    if (Array.isArray(o))
      return [w2(o[0]), w2(o[1])];
    throw new Error(Lt.dateArr("week-picker"));
  }, de = (o) => n.modelAuto ? Array.isArray(o) ? [m3(o[0]), m3(o[1])] : n.autoApply ? [m3(o)] : [m3(o), null] : Array.isArray(o) ? I2(() => [
    m3(o[0]),
    o[1] ? m3(o[1]) : b2()
  ]) : m3(o), T2 = () => {
    Array.isArray(t2.value) && n.range && t2.value.length === 1 && t2.value.push(b2());
  }, Y2 = () => {
    const o = t2.value;
    return [
      y3(o[0]),
      o[1] ? y3(o[1]) : b2()
    ];
  }, F = () => t2.value[1] ? Y2() : y3(Se(t2.value[0])), c2 = () => (t2.value || []).map((o) => y3(o)), _ = () => (T2(), n.modelAuto ? F() : n.multiDates ? c2() : Array.isArray(t2.value) ? I2(() => Y2()) : y3(Se(t2.value))), W = (o) => o ? n.timePicker ? S3(Se(o)) : n.monthPicker ? G2(Se(o)) : n.yearPicker ? O2(Se(o)) : n.multiDates ? le(Se(o)) : n.weekPicker ? oe(Se(o)) : de(Se(o)) : null, q2 = (o) => {
    const Z = W(o);
    L2(Se(Z)) ? (t2.value = Se(Z), a3()) : (t2.value = null, M3.value = "");
  }, te = () => {
    var Z;
    const o = (ee) => {
      var we;
      return format(ee, (we = f.value.textInputOptions) == null ? void 0 : we.format);
    };
    return `${o(t2.value[0])} ${(Z = f.value.textInputOptions) == null ? void 0 : Z.rangeSeparator} ${t2.value[1] ? o(t2.value[1]) : ""}`;
  }, R2 = () => {
    var o;
    return r.value && t2.value ? Array.isArray(t2.value) ? te() : format(t2.value, (o = f.value.textInputOptions) == null ? void 0 : o.format) : p(t2.value);
  }, l = () => {
    var o;
    return t2.value ? n.multiDates ? t2.value.map((Z) => p(Z)).join("; ") : n.textInput && typeof ((o = f.value.textInputOptions) == null ? void 0 : o.format) == "string" ? R2() : p(t2.value) : "";
  }, a3 = () => {
    !n.format || typeof n.format == "string" ? M3.value = l() : M3.value = n.format(t2.value);
  }, m3 = (o) => {
    if (n.utc) {
      const Z = new Date(o);
      return n.utc === "preserve" ? new Date(Z.getTime() + Z.getTimezoneOffset() * 6e4) : Z;
    }
    return n.modelType ? n.modelType === "date" || n.modelType === "timestamp" ? d3(new Date(o)) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? parse(o, C(), new Date()) : d3(parse(o, n.modelType, new Date())) : d3(new Date(o));
  }, y3 = (o) => o ? n.utc ? va(o, n.utc === "preserve") : n.modelType ? n.modelType === "timestamp" ? +s3(o) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? p(s3(o)) : p(s3(o), n.modelType) : s3(o) : "", A = (o) => {
    e2("update:model-value", o);
  }, j = (o) => Array.isArray(t2.value) ? [
    o(t2.value[0]),
    t2.value[1] ? o(t2.value[1]) : b2()
  ] : o(Se(t2.value)), N = (o) => A(Se(j(o)));
  return {
    inputValue: M3,
    internalModelValue: t2,
    checkBeforeEmit: () => t2.value ? n.range ? n.partialRange ? t2.value.length >= 1 : t2.value.length === 2 : !!t2.value : false,
    parseExternalModelValue: q2,
    formatInputValue: a3,
    emitModelValue: () => (a3(), n.monthPicker ? N(J) : n.timePicker ? N(B2) : n.yearPicker ? N(getYear) : n.weekPicker ? A(t2.value) : A(_()))
  };
}, er = (e2, n) => {
  const { validateMonthYearInRange: r, validateMaxDate: t2, validateMinDate: s3, defaults: d3 } = Le(e2), p = ($, f) => {
    let M3 = $;
    return d3.value.filters.months.includes(getMonth(M3)) ? (M3 = f ? addMonths($, 1) : subMonths($, 1), p(M3, f)) : M3;
  }, C = ($, f) => {
    let M3 = $;
    return d3.value.filters.years.includes(getYear(M3)) ? (M3 = f ? addYears($, 1) : subYears($, 1), C(M3, f)) : M3;
  }, I2 = ($) => {
    const f = set(new Date(), { month: e2.month, year: e2.year });
    let M3 = $ ? addMonths(f, 1) : subMonths(f, 1), H3 = getMonth(M3), B2 = getYear(M3);
    d3.value.filters.months.includes(H3) && (M3 = p(M3, $), H3 = getMonth(M3), B2 = getYear(M3)), d3.value.filters.years.includes(B2) && (M3 = C(M3, $), B2 = getYear(M3)), r(H3, B2, $, e2.preventMinMaxNavigation) && b2(H3, B2);
  }, b2 = ($, f) => {
    n("update-month-year", { month: $, year: f });
  }, L2 = computed(() => ($) => {
    if (!e2.preventMinMaxNavigation || $ && !e2.maxDate || !$ && !e2.minDate)
      return false;
    const f = set(new Date(), { month: e2.month, year: e2.year }), M3 = $ ? addMonths(f, 1) : subMonths(f, 1), H3 = [getMonth(M3), getYear(M3)];
    return $ ? !t2(...H3) : !s3(...H3);
  });
  return { handleMonthYearChange: I2, isDisabled: L2, updateMonthYear: b2 };
};
var Ot = /* @__PURE__ */ ((e2) => (e2.center = "center", e2.left = "left", e2.right = "right", e2))(Ot || {});
const tr = (e2, n, r, t2) => {
  const s3 = ref({
    top: "0",
    left: "0",
    transform: "none"
  }), d3 = ref(false), p = toRef(t2, "teleportCenter");
  watch(p, () => {
    B2();
  });
  const C = (T2) => {
    if (t2.teleport) {
      const Y2 = T2.getBoundingClientRect();
      return {
        left: Y2.left + window.scrollX,
        top: Y2.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, I2 = (T2, Y2) => {
    s3.value.left = `${T2 + Y2}px`, s3.value.transform = "translateX(-100%)";
  }, b2 = (T2) => {
    s3.value.left = `${T2}px`, s3.value.transform = "translateX(0)";
  }, L2 = (T2, Y2, F = false) => {
    t2.position === Ot.left && b2(T2), t2.position === Ot.right && I2(T2, Y2), t2.position === Ot.center && (s3.value.left = `${T2 + Y2 / 2}px`, s3.value.transform = F ? "translate(-50%, -50%)" : "translateX(-50%)");
  }, $ = (T2) => {
    const { width: Y2, height: F } = T2.getBoundingClientRect(), { top: c2, left: _ } = t2.altPosition ? t2.altPosition(T2) : C(T2);
    return { top: +c2, left: +_, width: Y2, height: F };
  }, f = () => {
    const T2 = Te(n);
    if (T2) {
      const { top: Y2, left: F, width: c2, height: _ } = $(T2);
      s3.value.top = `${Y2 + _ / 2}px`, s3.value.transform = "translateY(-50%)", L2(F, c2, true);
    }
  }, M3 = () => {
    s3.value.left = "50%", s3.value.top = "50%", s3.value.transform = "translate(-50%, -50%)", s3.value.position = "fixed";
  }, H3 = () => {
    const T2 = Te(n), { top: Y2, left: F, transform: c2 } = t2.altPosition(T2);
    s3.value = { top: `${Y2}px`, left: `${F}px`, transform: c2 || "" };
  }, B2 = (T2 = true) => {
    if (!t2.inline)
      return p.value ? M3() : t2.altPosition !== null ? H3() : (T2 && r("recalculate-position"), le());
  }, J = ({
    inputEl: T2,
    menuEl: Y2,
    left: F,
    width: c2
  }) => {
    window.screen.width > 768 && L2(F, c2), S3(T2, Y2);
  }, O2 = (T2, Y2) => {
    const { top: F, left: c2, height: _, width: W } = $(T2);
    s3.value.top = `${_ + F + +t2.offset}px`, J({ inputEl: T2, menuEl: Y2, left: c2, width: W }), d3.value = false;
  }, E2 = (T2, Y2) => {
    const { top: F, left: c2, width: _ } = $(T2), { height: W } = Y2.getBoundingClientRect();
    s3.value.top = `${F - W - +t2.offset}px`, J({ inputEl: T2, menuEl: Y2, left: c2, width: _ }), d3.value = true;
  }, S3 = (T2, Y2) => {
    if (t2.autoPosition) {
      const { left: F, width: c2 } = $(T2), { left: _, right: W } = Y2.getBoundingClientRect();
      return _ <= 0 || _ <= F ? b2(F) : W >= document.documentElement.clientWidth ? I2(F, c2) : L2(F, c2);
    }
  }, G2 = (T2, Y2) => {
    const { height: F } = Y2.getBoundingClientRect(), { top: c2, height: _ } = T2.getBoundingClientRect(), q2 = window.innerHeight - c2 - _, te = c2;
    return F <= q2 ? O2(T2, Y2) : F > q2 && F <= te ? E2(T2, Y2) : q2 >= te ? O2(T2, Y2) : E2(T2, Y2);
  }, le = () => {
    const T2 = Te(n), Y2 = Te(e2);
    if (T2 && Y2)
      return t2.autoPosition ? G2(T2, Y2) : O2(T2, Y2);
  }, oe = function(T2) {
    if (T2) {
      const Y2 = T2.scrollHeight > T2.clientHeight, c2 = window.getComputedStyle(T2).overflowY.indexOf("hidden") !== -1;
      return Y2 && !c2;
    }
    return true;
  }, de = function(T2) {
    return !T2 || T2 === document.body ? window : oe(T2) ? T2 : de(T2.parentNode);
  };
  return { openOnTop: d3, menuPosition: s3, setMenuPosition: B2, setInitialPosition: f, getScrollableParent: de };
}, vt = [
  { name: "clock-icon", use: ["time", "calendar"] },
  { name: "arrow-left", use: ["month-year", "calendar"] },
  { name: "arrow-right", use: ["month-year", "calendar"] },
  { name: "arrow-up", use: ["time", "calendar"] },
  { name: "arrow-down", use: ["time", "calendar"] },
  { name: "calendar-icon", use: ["month-year", "time", "calendar"] },
  { name: "day", use: ["calendar"] },
  { name: "month-overlay-value", use: ["calendar", "month-year"] },
  { name: "year-overlay-value", use: ["calendar", "month-year"] },
  { name: "year-overlay", use: ["month-year"] },
  { name: "month-overlay", use: ["month-year"] },
  { name: "month-overlay-header", use: ["month-year"] },
  { name: "year-overlay-header", use: ["month-year"] },
  { name: "hours-overlay-value", use: ["calendar", "time"] },
  { name: "minutes-overlay-value", use: ["calendar", "time"] },
  { name: "seconds-overlay-value", use: ["calendar", "time"] },
  { name: "hours", use: ["calendar", "time"] },
  { name: "minutes", use: ["calendar", "time"] },
  { name: "month", use: ["calendar", "month-year"] },
  { name: "year", use: ["calendar", "month-year"] },
  { name: "action-select", use: ["action"] },
  { name: "action-preview", use: ["action"] },
  { name: "calendar-header", use: ["calendar"] },
  { name: "marker-tooltip", use: ["calendar"] },
  { name: "now-button", use: [] },
  { name: "time-picker-overlay", use: ["calendar", "time"] },
  { name: "am-pm-button", use: ["calendar", "time"] },
  { name: "left-sidebar", use: ["menu"] },
  { name: "right-sidebar", use: ["menu"] },
  { name: "month-year", use: ["month-year"] },
  { name: "time-picker", use: ["menu"] },
  { name: "action-row", use: ["action"] }
], nr = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }], ar = {
  all: () => vt,
  monthYear: () => vt.filter((e2) => e2.use.includes("month-year")),
  input: () => nr,
  timePicker: () => vt.filter((e2) => e2.use.includes("time")),
  action: () => vt.filter((e2) => e2.use.includes("action")),
  calendar: () => vt.filter((e2) => e2.use.includes("calendar")),
  menu: () => vt.filter((e2) => e2.use.includes("menu"))
}, it = (e2, n, r) => {
  const t2 = [];
  return ar[n]().forEach((s3) => {
    e2[s3.name] && t2.push(s3.name);
  }), r && r.length && r.forEach((s3) => {
    s3.slot && t2.push(s3.slot);
  }), t2;
}, Ut = (e2) => ({ transitionName: computed(() => (r) => e2 && typeof e2 != "boolean" ? r ? e2.open : e2.close : ""), showTransition: !!e2 }), nt = {
  multiCalendars: { type: [Boolean, Number, String], default: null },
  modelValue: { type: [String, Date, Array, Object, Number], default: null },
  modelType: { type: String, default: null },
  position: { type: String, default: "center" },
  dark: { type: Boolean, default: false },
  format: {
    type: [String, Function],
    default: () => null
  },
  closeOnScroll: { type: Boolean, default: false },
  autoPosition: { type: Boolean, default: true },
  closeOnAutoApply: { type: Boolean, default: true },
  altPosition: { type: Function, default: null },
  transitions: { type: [Boolean, Object], default: true },
  formatLocale: { type: Object, default: null },
  utc: { type: [Boolean, String], default: false },
  ariaLabels: { type: Object, default: () => ({}) },
  offset: { type: [Number, String], default: 10 },
  hideNavigation: { type: Array, default: () => [] },
  timezone: { type: String, default: null },
  vertical: { type: Boolean, default: false },
  disableMonthYearSelect: { type: Boolean, default: false },
  menuClassName: { type: String, default: null },
  dayClass: { type: Function, default: null },
  yearRange: { type: Array, default: () => [1900, 2100] },
  multiCalendarsSolo: { type: Boolean, default: false },
  calendarCellClassName: { type: String, default: null },
  enableTimePicker: { type: Boolean, default: true },
  autoApply: { type: Boolean, default: false },
  disabledDates: { type: [Array, Function], default: () => [] },
  monthNameFormat: { type: String, default: "short" },
  startDate: { type: [Date, String], default: null },
  startTime: { type: [Object, Array], default: null },
  hideOffsetDates: { type: Boolean, default: false },
  autoRange: { type: [Number, String], default: null },
  noToday: { type: Boolean, default: false },
  disabledWeekDays: { type: Array, default: () => [] },
  allowedDates: { type: Array, default: () => [] },
  showNowButton: { type: Boolean, default: false },
  nowButtonLabel: { type: String, default: "Now" },
  markers: { type: Array, default: () => [] },
  modeHeight: { type: [Number, String], default: 255 },
  escClose: { type: Boolean, default: true },
  spaceConfirm: { type: Boolean, default: true },
  monthChangeOnArrows: { type: Boolean, default: true },
  presetRanges: { type: Array, default: () => [] },
  flow: { type: Array, default: () => [] },
  partialFlow: { type: Boolean, default: false },
  preventMinMaxNavigation: { type: Boolean, default: false },
  minRange: { type: [Number, String], default: null },
  maxRange: { type: [Number, String], default: null },
  multiDatesLimit: { type: [Number, String], default: null },
  reverseYears: { type: Boolean, default: false },
  keepActionRow: { type: Boolean, default: false },
  weekPicker: { type: Boolean, default: false },
  filters: { type: Object, default: () => ({}) },
  arrowNavigation: { type: Boolean, default: false },
  multiStatic: { type: Boolean, default: true },
  disableTimeRangeValidation: { type: Boolean, default: false },
  highlight: {
    type: [Array, Function],
    default: null
  },
  highlightWeekDays: {
    type: Array,
    default: null
  },
  highlightDisabledDays: { type: Boolean, default: false },
  teleport: { type: [String, Boolean], default: null },
  teleportCenter: { type: Boolean, default: false },
  locale: { type: String, default: "en-Us" },
  weekNumName: { type: String, default: "W" },
  weekStart: { type: [Number, String], default: 1 },
  weekNumbers: {
    type: [String, Function],
    default: null
  },
  calendarClassName: { type: String, default: null },
  noSwipe: { type: Boolean, default: false },
  monthChangeOnScroll: { type: [Boolean, String], default: true },
  dayNames: {
    type: [Function, Array],
    default: null
  },
  monthPicker: { type: Boolean, default: false },
  customProps: { type: Object, default: null },
  yearPicker: { type: Boolean, default: false },
  modelAuto: { type: Boolean, default: false },
  selectText: { type: String, default: "Select" },
  cancelText: { type: String, default: "Cancel" },
  previewFormat: {
    type: [String, Function],
    default: () => ""
  },
  multiDates: { type: Boolean, default: false },
  partialRange: { type: Boolean, default: true },
  ignoreTimeValidation: { type: Boolean, default: false },
  minDate: { type: [Date, String], default: null },
  maxDate: { type: [Date, String], default: null },
  minTime: { type: Object, default: null },
  maxTime: { type: Object, default: null },
  name: { type: String, default: null },
  placeholder: { type: String, default: "" },
  hideInputIcon: { type: Boolean, default: false },
  clearable: { type: Boolean, default: true },
  state: { type: Boolean, default: null },
  required: { type: Boolean, default: false },
  autocomplete: { type: String, default: "off" },
  inputClassName: { type: String, default: null },
  inlineWithInput: { type: Boolean, default: false },
  textInputOptions: { type: Object, default: () => null },
  fixedStart: { type: Boolean, default: false },
  fixedEnd: { type: Boolean, default: false },
  timePicker: { type: Boolean, default: false },
  enableSeconds: { type: Boolean, default: false },
  is24: { type: Boolean, default: true },
  noHoursOverlay: { type: Boolean, default: false },
  noMinutesOverlay: { type: Boolean, default: false },
  noSecondsOverlay: { type: Boolean, default: false },
  hoursGridIncrement: { type: [String, Number], default: 1 },
  minutesGridIncrement: { type: [String, Number], default: 5 },
  secondsGridIncrement: { type: [String, Number], default: 5 },
  hoursIncrement: { type: [Number, String], default: 1 },
  minutesIncrement: { type: [Number, String], default: 1 },
  secondsIncrement: { type: [Number, String], default: 1 },
  range: { type: Boolean, default: false },
  uid: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  inline: { type: Boolean, default: false },
  textInput: { type: Boolean, default: false },
  onClickOutside: { type: Function, default: null },
  noDisabledRange: { type: Boolean, default: false },
  sixWeeks: { type: Boolean, default: false }
}, rr = ["aria-label", "aria-disabled", "aria-readonly"], lr = {
  key: 1,
  class: "dp__input_wrap"
}, or = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "onKeydown"], sr = {
  key: 2,
  class: "dp__input_icon"
}, ir = {
  key: 4,
  class: "dp__clear_icon"
}, ur = /* @__PURE__ */ defineComponent({
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: false },
    inputValue: { type: String, default: "" },
    ...nt
  },
  emits: [
    "clear",
    "open",
    "update:input-value",
    "set-input-date",
    "close",
    "select-date",
    "set-empty-date",
    "toggle",
    "focus-prev",
    "focus",
    "blur"
  ],
  setup(e2, { expose: n, emit: r }) {
    const t2 = e2, { getDefaultPattern: s3, isValidDate: d3, defaults: p, getDefaultStartTime: C, assignDefaultTime: I2 } = Le(t2), b2 = ref(), L2 = ref(null), $ = ref(false), f = computed(
      () => ({
        dp__pointer: !t2.disabled && !t2.readonly && !t2.textInput,
        dp__disabled: t2.disabled,
        dp__input_readonly: !t2.textInput,
        dp__input: true,
        dp__input_icon_pad: !t2.hideInputIcon,
        dp__input_valid: t2.state,
        dp__input_invalid: t2.state === false,
        dp__input_focus: $.value || t2.isMenuOpen,
        dp__input_reg: !t2.textInput,
        [t2.inputClassName]: !!t2.inputClassName
      })
    ), M3 = () => {
      r("set-input-date", null), t2.autoApply && (r("set-empty-date"), b2.value = null);
    }, H3 = (c2) => {
      var W;
      const _ = C();
      return fa(
        c2,
        ((W = p.value.textInputOptions) == null ? void 0 : W.format) || s3(),
        _ || I2({})
      );
    }, B2 = (c2) => {
      const { rangeSeparator: _ } = p.value.textInputOptions, [W, q2] = c2.split(`${_}`);
      if (W) {
        const te = H3(W.trim()), R2 = q2 ? H3(q2.trim()) : null, l = te && R2 ? [te, R2] : [te];
        b2.value = te ? l : null;
      }
    }, J = (c2) => {
      if (t2.range)
        B2(c2);
      else if (t2.multiDates) {
        const _ = c2.split(";");
        b2.value = _.map((W) => H3(W.trim())).filter((W) => W);
      } else
        b2.value = H3(c2);
    }, O2 = (c2) => {
      var W;
      const { value: _ } = c2.target;
      _ !== "" ? ((W = p.value.textInputOptions) != null && W.openMenu && !t2.isMenuOpen && r("open"), J(_), r("set-input-date", b2.value)) : M3(), r("update:input-value", _);
    }, E2 = () => {
      var c2, _;
      (c2 = p.value.textInputOptions) != null && c2.enterSubmit && d3(b2.value) && t2.inputValue !== "" ? (r("set-input-date", b2.value, true), b2.value = null) : (_ = p.value.textInputOptions) != null && _.enterSubmit && t2.inputValue === "" && (b2.value = null, r("clear"));
    }, S3 = () => {
      var c2, _;
      (c2 = p.value.textInputOptions) != null && c2.tabSubmit && d3(b2.value) && t2.inputValue !== "" ? (r("set-input-date", b2.value, true), b2.value = null) : (_ = p.value.textInputOptions) != null && _.tabSubmit && t2.inputValue === "" && (b2.value = null, r("clear"));
    }, G2 = () => {
      $.value = true, r("focus");
    }, le = (c2) => {
      var _;
      c2.preventDefault(), c2.stopImmediatePropagation(), c2.stopPropagation(), t2.textInput && ((_ = p.value.textInputOptions) != null && _.openMenu) && !t2.inlineWithInput ? t2.isMenuOpen ? p.value.textInputOptions.enterSubmit && r("select-date") : r("open") : t2.textInput || r("toggle");
    }, oe = () => {
      $.value = false, t2.isMenuOpen || r("blur"), t2.autoApply && t2.textInput && b2.value && (r("set-input-date", b2.value), r("select-date"), b2.value = null);
    }, de = () => {
      r("clear");
    }, T2 = (c2) => {
      t2.textInput || c2.preventDefault();
    };
    return n({
      focusInput: () => {
        L2.value && L2.value.focus({ preventScroll: true });
      },
      setParsedDate: (c2) => {
        b2.value = c2;
      }
    }), (c2, _) => {
      var W;
      return openBlock(), createElementBlock("div", {
        onClick: le,
        "aria-label": (W = unref(p).ariaLabels) == null ? void 0 : W.input,
        role: "textbox",
        "aria-multiline": "false",
        "aria-disabled": c2.disabled,
        "aria-readonly": c2.readonly
      }, [
        c2.$slots.trigger && !c2.$slots["dp-input"] && !c2.inline ? renderSlot(c2.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !c2.$slots.trigger && (!c2.inline || c2.inlineWithInput) ? (openBlock(), createElementBlock("div", lr, [
          c2.$slots["dp-input"] && !c2.$slots.trigger && !c2.inline ? renderSlot(c2.$slots, "dp-input", {
            key: 0,
            value: e2.inputValue,
            onInput: O2,
            onEnter: E2,
            onTab: S3,
            onClear: de
          }) : createCommentVNode("", true),
          c2.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            ref_key: "inputRef",
            ref: L2,
            id: c2.uid ? `dp-input-${c2.uid}` : void 0,
            name: c2.name,
            class: normalizeClass(unref(f)),
            inputmode: c2.textInput ? "text" : "none",
            placeholder: c2.placeholder,
            disabled: c2.disabled,
            readonly: c2.readonly,
            required: c2.required,
            value: e2.inputValue,
            autocomplete: c2.autocomplete,
            onInput: O2,
            onKeydown: [
              withKeys(le, ["enter"]),
              withKeys(S3, ["tab"]),
              T2
            ],
            onBlur: oe,
            onFocus: G2,
            onKeypress: T2
          }, null, 42, or)),
          c2.$slots["input-icon"] && !c2.hideInputIcon ? (openBlock(), createElementBlock("span", sr, [
            renderSlot(c2.$slots, "input-icon")
          ])) : createCommentVNode("", true),
          !c2.$slots["input-icon"] && !c2.hideInputIcon && !c2.$slots["dp-input"] ? (openBlock(), createBlock(unref(Ft), {
            key: 3,
            class: "dp__input_icon dp__input_icons"
          })) : createCommentVNode("", true),
          c2.$slots["clear-icon"] && e2.inputValue && c2.clearable && !c2.disabled && !c2.readonly ? (openBlock(), createElementBlock("span", ir, [
            renderSlot(c2.$slots, "clear-icon", { clear: de })
          ])) : createCommentVNode("", true),
          c2.clearable && !c2.$slots["clear-icon"] && e2.inputValue && !c2.disabled && !c2.readonly ? (openBlock(), createBlock(unref(ca), {
            key: 5,
            class: "dp__clear_icon dp__input_icons",
            "data-test": "clear-icon",
            onClick: withModifiers(de, ["stop", "prevent"])
          }, null, 8, ["onClick"])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ], 8, rr);
    };
  }
}), dr = { class: "dp__selection_preview" }, cr = { class: "dp__action_buttons" }, fr = ["onKeydown"], vr = /* @__PURE__ */ defineComponent({
  __name: "ActionRow",
  props: {
    calendarWidth: { type: Number, default: 0 },
    menuMount: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    ...nt
  },
  emits: ["close-picker", "select-date", "invalid-select"],
  setup(e2, { emit: n }) {
    const r = e2, { formatDate: t2, isValidTime: s3, defaults: d3 } = Le(r), { buildMatrix: p } = tt(), C = ref(null), I2 = ref(null);
    onMounted(() => {
      r.arrowNavigation && p([Te(C), Te(I2)], "actionRow");
    });
    const b2 = computed(() => r.range && !r.partialRange && r.internalModelValue ? r.internalModelValue.length === 2 : true), L2 = computed(() => !f.value || !M3.value || !b2.value), $ = computed(() => ({
      dp__action: true,
      dp__select: true,
      dp__action_disabled: L2.value
    })), f = computed(() => !r.enableTimePicker || r.ignoreTimeValidation ? true : s3(r.internalModelValue)), M3 = computed(() => r.monthPicker ? O2(r.internalModelValue) : true), H3 = () => {
      const S3 = d3.value.previewFormat;
      return r.timePicker || r.monthPicker, S3(Se(r.internalModelValue));
    }, B2 = () => {
      const S3 = r.internalModelValue;
      return d3.value.multiCalendars > 0 ? `${t2(S3[0])} - ${t2(S3[1])}` : [t2(S3[0]), t2(S3[1])];
    }, J = computed(() => !r.internalModelValue || !r.menuMount ? "" : typeof d3.value.previewFormat == "string" ? Array.isArray(r.internalModelValue) ? r.internalModelValue.length === 2 && r.internalModelValue[1] ? B2() : r.multiDates ? r.internalModelValue.map((S3) => `${t2(S3)}`) : r.modelAuto ? `${t2(r.internalModelValue[0])}` : `${t2(r.internalModelValue[0])} -` : t2(r.internalModelValue) : H3()), O2 = (S3) => {
      if (!r.monthPicker)
        return true;
      let G2 = true;
      return r.minDate && r.maxDate ? Ve(w2(S3), w2(r.minDate)) && Oe(w2(S3), w2(r.maxDate)) : (r.minDate && (G2 = Ve(w2(S3), w2(r.minDate))), r.maxDate && (G2 = Oe(w2(S3), w2(r.maxDate))), G2);
    }, E2 = () => {
      f.value && M3.value && b2.value ? n("select-date") : n("invalid-select");
    };
    return (S3, G2) => (openBlock(), createElementBlock("div", {
      class: "dp__action_row",
      style: normalizeStyle(e2.calendarWidth ? { width: `${e2.calendarWidth}px` } : {})
    }, [
      S3.$slots["action-row"] ? renderSlot(S3.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: e2.internalModelValue,
        disabled: unref(L2),
        selectDate: () => S3.$emit("select-date"),
        closePicker: () => S3.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        createElementVNode("div", dr, [
          S3.$slots["action-preview"] ? renderSlot(S3.$slots, "action-preview", {
            key: 0,
            value: e2.internalModelValue
          }) : createCommentVNode("", true),
          S3.$slots["action-preview"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            Array.isArray(unref(J)) ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(toDisplayString(unref(J)), 1)
            ], 64)),
            Array.isArray(unref(J)) ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(unref(J), (le, oe) => (openBlock(), createElementBlock("div", { key: oe }, toDisplayString(le), 1))), 128)) : createCommentVNode("", true)
          ], 64))
        ]),
        createElementVNode("div", cr, [
          S3.$slots["action-select"] ? renderSlot(S3.$slots, "action-select", {
            key: 0,
            value: e2.internalModelValue
          }) : createCommentVNode("", true),
          S3.$slots["action-select"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            S3.inline ? createCommentVNode("", true) : (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__action dp__cancel",
              ref_key: "cancelButtonRef",
              ref: C,
              tabindex: "0",
              onClick: G2[0] || (G2[0] = (le) => S3.$emit("close-picker")),
              onKeydown: [
                G2[1] || (G2[1] = withKeys((le) => S3.$emit("close-picker"), ["enter"])),
                G2[2] || (G2[2] = withKeys((le) => S3.$emit("close-picker"), ["space"]))
              ]
            }, toDisplayString(S3.cancelText), 545)),
            createElementVNode("span", {
              class: normalizeClass(unref($)),
              tabindex: "0",
              onKeydown: [
                withKeys(E2, ["enter"]),
                withKeys(E2, ["space"])
              ],
              onClick: E2,
              "data-test": "select-button",
              ref_key: "selectButtonRef",
              ref: I2
            }, toDisplayString(S3.selectText), 43, fr)
          ], 64))
        ])
      ], 64))
    ], 4));
  }
}), mr = ["aria-label"], yr = {
  class: "dp__calendar_header",
  role: "row"
}, gr = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
}, hr = /* @__PURE__ */ createElementVNode("div", { class: "dp__calendar_header_separator" }, null, -1), pr = ["aria-label"], kr = {
  key: 0,
  role: "gridcell",
  class: "dp__calendar_item dp__week_num"
}, wr = { class: "dp__cell_inner" }, br = ["aria-selected", "aria-disabled", "aria-label", "data-test", "onClick", "onKeydown", "onMouseenter", "onMouseleave"], Dr = /* @__PURE__ */ defineComponent({
  __name: "Calendar",
  props: {
    mappedDates: { type: Array, default: () => [] },
    getWeekNum: {
      type: Function,
      default: () => ""
    },
    specificMode: { type: Boolean, default: false },
    instance: { type: Number, default: 0 },
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    ...nt
  },
  emits: [
    "select-date",
    "set-hover-date",
    "handle-scroll",
    "mount",
    "handle-swipe",
    "handle-space",
    "tooltip-open",
    "tooltip-close"
  ],
  setup(e2, { expose: n, emit: r }) {
    const t2 = e2, { buildMultiLevelMatrix: s3 } = tt(), { setDateMonthOrYear: d3, defaults: p } = Le(t2), C = ref(null), I2 = ref({
      bottom: "",
      left: "",
      transform: ""
    }), b2 = ref([]), L2 = ref(null), $ = ref(true), f = ref(""), M3 = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), H3 = ref([]), B2 = ref({ left: "50%" }), J = computed(() => t2.dayNames ? Array.isArray(t2.dayNames) ? t2.dayNames : t2.dayNames(t2.locale, +t2.weekStart) : Ua(t2.locale, +t2.weekStart));
    onMounted(() => {
      r("mount", { cmp: "calendar", refs: b2 }), t2.noSwipe || L2.value && (L2.value.addEventListener("touchstart", c2, { passive: false }), L2.value.addEventListener("touchend", _, { passive: false }), L2.value.addEventListener("touchmove", W, { passive: false })), t2.monthChangeOnScroll && L2.value && L2.value.addEventListener("wheel", R2, { passive: false });
    });
    const O2 = (l) => l ? t2.vertical ? "vNext" : "next" : t2.vertical ? "vPrevious" : "previous", E2 = (l, a3) => {
      if (t2.transitions) {
        const m3 = xe(d3(w2(), t2.month, t2.year));
        f.value = Ve(xe(d3(w2(), l, a3)), m3) ? p.value.transitions[O2(true)] : p.value.transitions[O2(false)], $.value = false, nextTick$1(() => {
          $.value = true;
        });
      }
    }, S3 = computed(
      () => ({
        dp__calendar_wrap: true,
        [t2.calendarClassName]: !!t2.calendarClassName
      })
    ), G2 = computed(() => (l) => {
      const a3 = Ka(l);
      return {
        dp__marker_dot: a3.type === "dot",
        dp__marker_line: a3.type === "line"
      };
    }), le = computed(() => (l) => be(l, C.value)), oe = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: p.value.multiCalendars > 0 && t2.instance !== 0
    })), de = computed(() => (l) => t2.hideOffsetDates ? l.current : true), T2 = computed(() => t2.specificMode ? { height: `${t2.modeHeight}px` } : void 0), Y2 = async (l, a3, m3) => {
      var y3, A;
      if (r("set-hover-date", l), (A = (y3 = l.marker) == null ? void 0 : y3.tooltip) != null && A.length) {
        const j = Te(b2.value[a3][m3]);
        if (j) {
          const { width: N, height: ce } = j.getBoundingClientRect();
          C.value = l.value;
          let v = { left: `${N / 2}px` }, o = -50;
          if (await nextTick$1(), H3.value[0]) {
            const { left: Z, width: ee } = H3.value[0].getBoundingClientRect();
            Z < 0 && (v = { left: "0" }, o = 0, B2.value.left = `${N / 2}px`), window.innerWidth < Z + ee && (v = { right: "0" }, o = 0, B2.value.left = `${ee - N / 2}px`);
          }
          I2.value = {
            bottom: `${ce}px`,
            ...v,
            transform: `translateX(${o}%)`
          }, r("tooltip-open", l.marker);
        }
      }
    }, F = (l) => {
      C.value && (C.value = null, I2.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), r("tooltip-close", l.marker));
    }, c2 = (l) => {
      M3.value.startX = l.changedTouches[0].screenX, M3.value.startY = l.changedTouches[0].screenY;
    }, _ = (l) => {
      M3.value.endX = l.changedTouches[0].screenX, M3.value.endY = l.changedTouches[0].screenY, q2();
    }, W = (l) => {
      t2.vertical && !t2.inline && l.preventDefault();
    }, q2 = () => {
      const l = t2.vertical ? "Y" : "X";
      Math.abs(M3.value[`start${l}`] - M3.value[`end${l}`]) > 10 && r("handle-swipe", M3.value[`start${l}`] > M3.value[`end${l}`] ? "right" : "left");
    }, te = (l, a3, m3) => {
      l && (Array.isArray(b2.value[a3]) ? b2.value[a3][m3] = l : b2.value[a3] = [l]), t2.arrowNavigation && s3(b2.value, "calendar");
    }, R2 = (l) => {
      t2.monthChangeOnScroll && (l.preventDefault(), r("handle-scroll", l));
    };
    return n({ triggerTransition: E2 }), (l, a3) => {
      var m3;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(oe))
      }, [
        createElementVNode("div", {
          style: normalizeStyle(unref(T2))
        }, [
          e2.specificMode ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
            key: 0,
            ref_key: "calendarWrapRef",
            ref: L2,
            class: normalizeClass(unref(S3)),
            role: "grid",
            "aria-label": (m3 = unref(p).ariaLabels) == null ? void 0 : m3.calendarWrap
          }, [
            createElementVNode("div", yr, [
              l.weekNumbers ? (openBlock(), createElementBlock("div", gr, toDisplayString(l.weekNumName), 1)) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(J), (y3, A) => (openBlock(), createElementBlock("div", {
                class: "dp__calendar_header_item",
                role: "gridcell",
                key: A,
                "data-test": "calendar-header"
              }, [
                l.$slots["calendar-header"] ? renderSlot(l.$slots, "calendar-header", {
                  key: 0,
                  day: y3,
                  index: A
                }) : createCommentVNode("", true),
                l.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(y3), 1)
                ], 64))
              ]))), 128))
            ]),
            hr,
            createVNode(Transition, {
              name: f.value,
              css: !!l.transitions
            }, {
              default: withCtx(() => {
                var y3;
                return [
                  $.value ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "dp__calendar",
                    role: "grid",
                    "aria-label": (y3 = unref(p).ariaLabels) == null ? void 0 : y3.calendarDays
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(e2.mappedDates, (A, j) => (openBlock(), createElementBlock("div", {
                      class: "dp__calendar_row",
                      role: "row",
                      key: j
                    }, [
                      l.weekNumbers ? (openBlock(), createElementBlock("div", kr, [
                        createElementVNode("div", wr, toDisplayString(e2.getWeekNum(A.days)), 1)
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(A.days, (N, ce) => {
                        var v, o, Z;
                        return openBlock(), createElementBlock("div", {
                          role: "gridcell",
                          class: "dp__calendar_item",
                          ref_for: true,
                          ref: (ee) => te(ee, j, ce),
                          key: ce + j,
                          "aria-selected": N.classData.dp__active_date || N.classData.dp__range_start || N.classData.dp__range_start,
                          "aria-disabled": N.classData.dp__cell_disabled,
                          "aria-label": (o = (v = unref(p).ariaLabels) == null ? void 0 : v.day) == null ? void 0 : o.call(v, N),
                          tabindex: "0",
                          "data-test": N.value,
                          onClick: withModifiers((ee) => l.$emit("select-date", N), ["stop", "prevent"]),
                          onKeydown: [
                            withKeys((ee) => l.$emit("select-date", N), ["enter"]),
                            withKeys((ee) => l.$emit("handle-space", N), ["space"])
                          ],
                          onMouseenter: (ee) => Y2(N, j, ce),
                          onMouseleave: (ee) => F(N)
                        }, [
                          createElementVNode("div", {
                            class: normalizeClass(["dp__cell_inner", N.classData])
                          }, [
                            l.$slots.day && unref(de)(N) ? renderSlot(l.$slots, "day", {
                              key: 0,
                              day: +N.text,
                              date: N.value
                            }) : createCommentVNode("", true),
                            l.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createTextVNode(toDisplayString(N.text), 1)
                            ], 64)),
                            N.marker && unref(de)(N) ? (openBlock(), createElementBlock("div", {
                              key: 2,
                              class: normalizeClass(unref(G2)(N.marker)),
                              style: normalizeStyle(N.marker.color ? { backgroundColor: N.marker.color } : {})
                            }, null, 6)) : createCommentVNode("", true),
                            unref(le)(N.value) ? (openBlock(), createElementBlock("div", {
                              key: 3,
                              class: "dp__marker_tooltip",
                              ref_for: true,
                              ref_key: "activeTooltip",
                              ref: H3,
                              style: normalizeStyle(I2.value)
                            }, [
                              (Z = N.marker) != null && Z.tooltip ? (openBlock(), createElementBlock("div", {
                                key: 0,
                                class: "dp__tooltip_content",
                                onClick: a3[0] || (a3[0] = withModifiers(() => {
                                }, ["stop"]))
                              }, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(N.marker.tooltip, (ee, we) => (openBlock(), createElementBlock("div", {
                                  key: we,
                                  class: "dp__tooltip_text"
                                }, [
                                  l.$slots["marker-tooltip"] ? renderSlot(l.$slots, "marker-tooltip", {
                                    key: 0,
                                    tooltip: ee,
                                    day: N.value
                                  }) : createCommentVNode("", true),
                                  l.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                    createElementVNode("div", {
                                      class: "dp__tooltip_mark",
                                      style: normalizeStyle(ee.color ? { backgroundColor: ee.color } : {})
                                    }, null, 4),
                                    createElementVNode("div", null, toDisplayString(ee.text), 1)
                                  ], 64))
                                ]))), 128)),
                                createElementVNode("div", {
                                  class: "dp__arrow_bottom_tp",
                                  style: normalizeStyle(B2.value)
                                }, null, 4)
                              ])) : createCommentVNode("", true)
                            ], 4)) : createCommentVNode("", true)
                          ], 2)
                        ], 40, br);
                      }), 128))
                    ]))), 128))
                  ], 8, pr)) : createCommentVNode("", true)
                ];
              }),
              _: 3
            }, 8, ["name", "css"])
          ], 10, mr))
        ], 4)
      ], 2);
    };
  }
}), $r = ["aria-label", "aria-disabled"], tn = /* @__PURE__ */ defineComponent({
  __name: "ActionIcon",
  props: {
    ariaLabel: { type: String, default: "" },
    disabled: { type: Boolean, default: false }
  },
  emits: ["activate", "set-ref"],
  setup(e2, { emit: n }) {
    const r = ref(null);
    return onMounted(() => n("set-ref", r)), (t2, s3) => (openBlock(), createElementBlock("div", {
      class: "dp__month_year_col_nav",
      onClick: s3[0] || (s3[0] = (d3) => t2.$emit("activate")),
      onKeydown: [
        s3[1] || (s3[1] = withKeys((d3) => t2.$emit("activate"), ["enter"])),
        s3[2] || (s3[2] = withKeys((d3) => t2.$emit("activate"), ["space"]))
      ],
      tabindex: "0",
      role: "button",
      "aria-label": e2.ariaLabel,
      "aria-disabled": e2.disabled,
      ref_key: "elRef",
      ref: r
    }, [
      createElementVNode("div", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: e2.disabled }])
      }, [
        renderSlot(t2.$slots, "default")
      ], 2)
    ], 40, $r));
  }
}), Mr = ["onKeydown"], Tr = { class: "dp__selection_grid_header" }, Ar = ["aria-selected", "aria-disabled", "data-test", "onClick", "onKeydown", "onMouseover"], Sr = ["aria-label", "onKeydown"], Dt = /* @__PURE__ */ defineComponent({
  __name: "SelectionGrid",
  props: {
    items: { type: Array, default: () => [] },
    modelValue: { type: [String, Number], default: null },
    multiModelValue: { type: Array, default: () => [] },
    disabledValues: { type: Array, default: () => [] },
    minValue: { type: [Number, String], default: null },
    maxValue: { type: [Number, String], default: null },
    year: { type: Number, default: 0 },
    skipActive: { type: Boolean, default: false },
    headerRefs: { type: Array, default: () => [] },
    skipButtonRef: { type: Boolean, default: false },
    monthPicker: { type: Boolean, default: false },
    yearPicker: { type: Boolean, default: false },
    escClose: { type: Boolean, default: true },
    type: { type: String, default: null },
    arrowNavigation: { type: Boolean, default: false },
    autoApply: { type: Boolean, default: false },
    textInput: { type: Boolean, default: false },
    ariaLabels: { type: Object, default: () => ({}) },
    hideNavigation: { type: Array, default: () => [] }
  },
  emits: ["update:model-value", "selected", "toggle", "reset-flow"],
  setup(e2, { expose: n, emit: r }) {
    const t2 = e2, { setSelectionGrid: s3, buildMultiLevelMatrix: d3, setMonthPicker: p } = tt(), { hideNavigationButtons: C } = Le(t2), I2 = ref(false), b2 = ref(null), L2 = ref(null), $ = ref([]), f = ref(), M3 = ref(null), H3 = ref(0), B2 = ref(null);
    onBeforeUpdate(() => {
      b2.value = null;
    }), onMounted(() => {
      nextTick$1().then(() => Y2()), O2(), J(true);
    }), onUnmounted(() => J(false));
    const J = (R2) => {
      var l;
      t2.arrowNavigation && ((l = t2.headerRefs) != null && l.length ? p(R2) : s3(R2));
    }, O2 = () => {
      const R2 = Te(L2);
      R2 && (t2.textInput || R2.focus({ preventScroll: true }), I2.value = R2.clientHeight < R2.scrollHeight);
    }, E2 = computed(
      () => ({
        dp__overlay: true
      })
    ), S3 = computed(() => ({
      dp__overlay_col: true
    })), G2 = (R2) => t2.skipActive ? false : R2.value === t2.modelValue, le = computed(() => t2.items.map((R2) => R2.filter((l) => l).map((l) => {
      var y3, A, j;
      const a3 = t2.disabledValues.some((N) => N === l.value) || T2(l.value), m3 = (y3 = t2.multiModelValue) != null && y3.length ? (A = t2.multiModelValue) == null ? void 0 : A.some(
        (N) => be(
          N,
          setYear(
            t2.monthPicker ? setMonth(new Date(), l.value) : new Date(),
            t2.monthPicker ? t2.year : l.value
          )
        )
      ) : G2(l);
      return {
        ...l,
        className: {
          dp__overlay_cell_active: m3,
          dp__overlay_cell: !m3,
          dp__overlay_cell_disabled: a3,
          dp__overlay_cell_active_disabled: a3 && m3,
          dp__overlay_cell_pad: true,
          dp__cell_in_between: (j = t2.multiModelValue) != null && j.length ? c2(l.value) : false
        }
      };
    }))), oe = computed(
      () => ({
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: I2.value,
        dp__button_bottom: t2.autoApply
      })
    ), de = computed(() => {
      var R2, l;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((R2 = t2.items) == null ? void 0 : R2.length) <= 6,
        dp__container_block: ((l = t2.items) == null ? void 0 : l.length) > 6
      };
    }), T2 = (R2) => {
      const l = t2.maxValue || t2.maxValue === 0, a3 = t2.minValue || t2.minValue === 0;
      return !l && !a3 ? false : l && a3 ? +R2 > +t2.maxValue || +R2 < +t2.minValue : l ? +R2 > +t2.maxValue : a3 ? +R2 < +t2.minValue : false;
    }, Y2 = () => {
      const R2 = Te(b2), l = Te(L2), a3 = Te(M3), m3 = Te(B2), y3 = a3 ? a3.getBoundingClientRect().height : 0;
      l && (H3.value = l.getBoundingClientRect().height - y3), R2 && m3 && (m3.scrollTop = R2.offsetTop - m3.offsetTop - (H3.value / 2 - R2.getBoundingClientRect().height) - y3);
    }, F = (R2) => {
      !t2.disabledValues.some((l) => l === R2) && !T2(R2) && (r("update:model-value", R2), r("selected"));
    }, c2 = (R2) => {
      const l = t2.monthPicker ? t2.year : R2;
      return zn(
        t2.multiModelValue,
        setYear(
          t2.monthPicker ? setMonth(new Date(), f.value || 0) : new Date(),
          t2.monthPicker ? l : f.value || l
        ),
        setYear(t2.monthPicker ? setMonth(new Date(), R2) : new Date(), l)
      );
    }, _ = () => {
      r("toggle"), r("reset-flow");
    }, W = () => {
      t2.escClose && _();
    }, q2 = (R2, l, a3, m3) => {
      R2 && (l.value === +t2.modelValue && !t2.disabledValues.includes(l.value) && (b2.value = R2), t2.arrowNavigation && (Array.isArray($.value[a3]) ? $.value[a3][m3] = R2 : $.value[a3] = [R2], te()));
    }, te = () => {
      var l, a3;
      const R2 = (l = t2.headerRefs) != null && l.length ? [t2.headerRefs].concat($.value) : $.value.concat([t2.skipButtonRef ? [] : [M3.value]]);
      d3(Se(R2), (a3 = t2.headerRefs) != null && a3.length ? "monthPicker" : "selectionGrid");
    };
    return n({ focusGrid: O2 }), (R2, l) => {
      var a3;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: L2,
        class: normalizeClass(unref(E2)),
        role: "dialog",
        tabindex: "0",
        onKeydown: withKeys(W, ["esc"])
      }, [
        createElementVNode("div", {
          class: normalizeClass(unref(de)),
          ref_key: "containerRef",
          ref: B2,
          role: "grid",
          style: normalizeStyle({ height: `${H3.value}px` })
        }, [
          createElementVNode("div", Tr, [
            renderSlot(R2.$slots, "header")
          ]),
          R2.$slots.overlay ? renderSlot(R2.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(unref(le), (m3, y3) => (openBlock(), createElementBlock("div", {
            class: "dp__overlay_row",
            key: y3,
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(m3, (A, j) => (openBlock(), createElementBlock("div", {
              role: "gridcell",
              class: normalizeClass(unref(S3)),
              key: A.value,
              "aria-selected": A.value === e2.modelValue && !e2.disabledValues.includes(A.value),
              "aria-disabled": A.className.dp__overlay_cell_disabled,
              ref_for: true,
              ref: (N) => q2(N, A, y3, j),
              tabindex: "0",
              "data-test": A.text,
              onClick: (N) => F(A.value),
              onKeydown: [
                withKeys((N) => F(A.value), ["enter"]),
                withKeys((N) => F(A.value), ["space"])
              ],
              onMouseover: (N) => f.value = A.value
            }, [
              createElementVNode("div", {
                class: normalizeClass(A.className)
              }, [
                R2.$slots.item ? renderSlot(R2.$slots, "item", {
                  key: 0,
                  item: A
                }) : createCommentVNode("", true),
                R2.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(A.text), 1)
                ], 64))
              ], 2)
            ], 42, Ar))), 128))
          ]))), 128))
        ], 6),
        R2.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("div", {
          key: 0,
          role: "button",
          "aria-label": (a3 = e2.ariaLabels) == null ? void 0 : a3.toggleOverlay,
          class: normalizeClass(unref(oe)),
          tabindex: "0",
          ref_key: "toggleButton",
          ref: M3,
          onClick: _,
          onKeydown: withKeys(_, ["enter"])
        }, [
          renderSlot(R2.$slots, "button-icon")
        ], 42, Sr)), [
          [vShow, !unref(C)(e2.type)]
        ]) : createCommentVNode("", true)
      ], 42, Mr);
    };
  }
}), Pr = ["aria-label"], In = /* @__PURE__ */ defineComponent({
  __name: "RegularPicker",
  props: {
    ariaLabel: { type: String, default: "" },
    showSelectionGrid: { type: Boolean, default: false },
    modelValue: { type: Number, default: null },
    items: { type: Array, default: () => [] },
    disabledValues: { type: Array, default: () => [] },
    minValue: { type: Number, default: null },
    maxValue: { type: Number, default: null },
    slotName: { type: String, default: "" },
    overlaySlot: { type: String, default: "" },
    headerRefs: { type: Array, default: () => [] },
    escClose: { type: Boolean, default: true },
    type: { type: String, default: null },
    transitions: { type: [Object, Boolean], default: false },
    arrowNavigation: { type: Boolean, default: false },
    autoApply: { type: Boolean, default: false },
    textInput: { type: Boolean, default: false },
    ariaLabels: { type: Object, default: () => ({}) },
    hideNavigation: { type: Array, default: () => [] }
  },
  emits: ["update:model-value", "toggle", "set-ref"],
  setup(e2, { emit: n }) {
    const r = e2, { transitionName: t2, showTransition: s3 } = Ut(r.transitions), d3 = ref(null);
    return onMounted(() => n("set-ref", d3)), (p, C) => (openBlock(), createElementBlock(Fragment, null, [
      createElementVNode("div", {
        class: "dp__month_year_select",
        onClick: C[0] || (C[0] = (I2) => p.$emit("toggle")),
        onKeydown: [
          C[1] || (C[1] = withKeys((I2) => p.$emit("toggle"), ["enter"])),
          C[2] || (C[2] = withKeys((I2) => p.$emit("toggle"), ["space"]))
        ],
        role: "button",
        "aria-label": e2.ariaLabel,
        tabindex: "0",
        ref_key: "elRef",
        ref: d3
      }, [
        renderSlot(p.$slots, "default")
      ], 40, Pr),
      createVNode(Transition, {
        name: unref(t2)(e2.showSelectionGrid),
        css: unref(s3)
      }, {
        default: withCtx(() => [
          e2.showSelectionGrid ? (openBlock(), createBlock(Dt, mergeProps({ key: 0 }, {
            modelValue: e2.modelValue,
            items: e2.items,
            disabledValues: e2.disabledValues,
            minValue: e2.minValue,
            maxValue: e2.maxValue,
            escClose: e2.escClose,
            type: e2.type,
            arrowNavigation: e2.arrowNavigation,
            textInput: e2.textInput,
            autoApply: e2.autoApply,
            ariaLabels: e2.ariaLabels,
            hideNavigation: e2.hideNavigation
          }, {
            "header-refs": [],
            "onUpdate:modelValue": C[3] || (C[3] = (I2) => p.$emit("update:model-value", I2)),
            onToggle: C[4] || (C[4] = (I2) => p.$emit("toggle"))
          }), createSlots({
            "button-icon": withCtx(() => [
              p.$slots["calendar-icon"] ? renderSlot(p.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
              p.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ft), { key: 1 }))
            ]),
            _: 2
          }, [
            p.$slots[e2.slotName] ? {
              name: "item",
              fn: withCtx(({ item: I2 }) => [
                renderSlot(p.$slots, e2.slotName, { item: I2 })
              ]),
              key: "0"
            } : void 0,
            p.$slots[e2.overlaySlot] ? {
              name: "overlay",
              fn: withCtx(() => [
                renderSlot(p.$slots, e2.overlaySlot)
              ]),
              key: "1"
            } : void 0,
            p.$slots[`${e2.overlaySlot}-header`] ? {
              name: "header",
              fn: withCtx(() => [
                renderSlot(p.$slots, `${e2.overlaySlot}-header`)
              ]),
              key: "2"
            } : void 0
          ]), 1040)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["name", "css"])
    ], 64));
  }
}), Cr = { class: "dp__month_year_row" }, _r = { class: "dp__month_year_wrap" }, Nr = { class: "dp__month_picker_header" }, Rr = ["aria-label"], Or = ["aria-label"], Ir = ["aria-label"], Br = /* @__PURE__ */ defineComponent({
  __name: "MonthYearPicker",
  props: {
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    instance: { type: Number, default: 0 },
    years: { type: Array, default: () => [] },
    months: { type: Array, default: () => [] },
    internalModelValue: { type: [Date, Array], default: null },
    ...nt
  },
  emits: ["update-month-year", "month-year-select", "mount", "reset-flow", "overlay-closed"],
  setup(e2, { expose: n, emit: r }) {
    const t2 = e2, { defaults: s3 } = Le(t2), { transitionName: d3, showTransition: p } = Ut(s3.value.transitions), { buildMatrix: C } = tt(), { handleMonthYearChange: I2, isDisabled: b2, updateMonthYear: L2 } = er(t2, r), $ = ref(false), f = ref(false), M3 = ref([null, null, null, null]), H3 = ref(null), B2 = ref(null), J = ref(null);
    onMounted(() => {
      r("mount");
    });
    const O2 = (v) => ({
      get: () => t2[v],
      set: (o) => {
        const Z = v === "month" ? "year" : "month";
        r("update-month-year", { [v]: o, [Z]: t2[Z] }), r("month-year-select", v === "year"), v === "month" ? y3(true) : A(true);
      }
    }), E2 = computed(O2("month")), S3 = computed(O2("year")), G2 = (v) => {
      const o = getYear(w2(v));
      return t2.year === o;
    }, le = computed(() => t2.monthPicker ? Array.isArray(t2.disabledDates) ? t2.disabledDates.map((v) => w2(v)).filter((v) => G2(v)).map((v) => getMonth(v)) : [] : []), oe = computed(() => (v) => {
      const o = v === "month";
      return {
        showSelectionGrid: (o ? $ : f).value,
        items: (o ? R2 : l).value,
        disabledValues: s3.value.filters[o ? "months" : "years"].concat(le.value),
        minValue: (o ? F : T2).value,
        maxValue: (o ? c2 : Y2).value,
        headerRefs: o && t2.monthPicker ? [H3.value, B2.value, J.value] : [],
        escClose: t2.escClose,
        transitions: s3.value.transitions,
        ariaLabels: s3.value.ariaLabels,
        textInput: t2.textInput,
        autoApply: t2.autoApply,
        arrowNavigation: t2.arrowNavigation,
        hideNavigation: t2.hideNavigation
      };
    }), de = computed(() => (v) => ({
      month: t2.month,
      year: t2.year,
      items: v === "month" ? t2.months : t2.years,
      instance: t2.instance,
      updateMonthYear: L2,
      toggle: v === "month" ? y3 : A
    })), T2 = computed(() => t2.minDate ? getYear(w2(t2.minDate)) : null), Y2 = computed(() => t2.maxDate ? getYear(w2(t2.maxDate)) : null), F = computed(() => {
      if (t2.minDate && T2.value) {
        if (T2.value > t2.year)
          return 12;
        if (T2.value === t2.year)
          return getMonth(w2(t2.minDate));
      }
      return null;
    }), c2 = computed(() => t2.maxDate && Y2.value ? Y2.value < t2.year ? -1 : Y2.value === t2.year ? getMonth(w2(t2.maxDate)) : null : null), _ = computed(() => t2.range && t2.internalModelValue && (t2.monthPicker || t2.yearPicker) ? t2.internalModelValue : []), W = (v) => v.reverse(), q2 = (v, o = false) => {
      const Z = [], ee = (we) => o ? W(we) : we;
      for (let we = 0; we < v.length; we += 3) {
        const ze = [v[we], v[we + 1], v[we + 2]];
        Z.push(ee(ze));
      }
      return o ? Z.reverse() : Z;
    }, te = computed(() => {
      const v = t2.months.find((o) => o.value === t2.month);
      return v || { text: "", value: 0 };
    }), R2 = computed(() => q2(t2.months)), l = computed(() => q2(t2.years, t2.reverseYears)), a3 = computed(() => s3.value.multiCalendars ? t2.multiCalendarsSolo ? true : t2.instance === 0 : true), m3 = computed(() => s3.value.multiCalendars ? t2.multiCalendarsSolo ? true : t2.instance === s3.value.multiCalendars - 1 : true), y3 = (v = false) => {
      j(v), $.value = !$.value, $.value || r("overlay-closed");
    }, A = (v = false) => {
      j(v), f.value = !f.value, f.value || r("overlay-closed");
    }, j = (v) => {
      v || r("reset-flow");
    }, N = (v = false) => {
      b2.value(v) || r("update-month-year", {
        year: v ? t2.year + 1 : t2.year - 1,
        month: t2.month,
        fromNav: true
      });
    }, ce = (v, o) => {
      t2.arrowNavigation && (M3.value[o] = Te(v), C(M3.value, "monthYear"));
    };
    return n({
      toggleMonthPicker: y3,
      toggleYearPicker: A,
      handleMonthYearChange: I2
    }), (v, o) => {
      var Z, ee, we, ze, Je;
      return openBlock(), createElementBlock("div", Cr, [
        v.$slots["month-year"] ? renderSlot(v.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, { month: e2.month, year: e2.year, months: e2.months, years: e2.years, updateMonthYear: unref(L2), handleMonthYearChange: unref(I2), instance: e2.instance }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          !v.monthPicker && !v.yearPicker ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            unref(a3) && !v.vertical ? (openBlock(), createBlock(tn, {
              key: 0,
              "aria-label": (Z = unref(s3).ariaLabels) == null ? void 0 : Z.prevMonth,
              disabled: unref(b2)(false),
              onActivate: o[0] || (o[0] = (re) => unref(I2)(false)),
              onSetRef: o[1] || (o[1] = (re) => ce(re, 0))
            }, {
              default: withCtx(() => [
                v.$slots["arrow-left"] ? renderSlot(v.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                v.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(kn), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
            createElementVNode("div", _r, [
              createVNode(In, mergeProps({
                type: "month",
                "slot-name": "month-overlay-val",
                "overlay-slot": "overlay-month",
                "aria-label": (ee = unref(s3).ariaLabels) == null ? void 0 : ee.openMonthsOverlay,
                modelValue: unref(E2),
                "onUpdate:modelValue": o[2] || (o[2] = (re) => isRef(E2) ? E2.value = re : null)
              }, unref(oe)("month"), {
                onToggle: y3,
                onSetRef: o[3] || (o[3] = (re) => ce(re, 1))
              }), createSlots({
                default: withCtx(() => [
                  v.$slots.month ? renderSlot(v.$slots, "month", normalizeProps(mergeProps({ key: 0 }, unref(te)))) : createCommentVNode("", true),
                  v.$slots.month ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(unref(te).text), 1)
                  ], 64))
                ]),
                _: 2
              }, [
                v.$slots["calendar-icon"] ? {
                  name: "calendar-icon",
                  fn: withCtx(() => [
                    renderSlot(v.$slots, "calendar-icon")
                  ]),
                  key: "0"
                } : void 0,
                v.$slots["month-overlay-value"] ? {
                  name: "month-overlay-val",
                  fn: withCtx(({ item: re }) => [
                    renderSlot(v.$slots, "month-overlay-value", {
                      text: re.text,
                      value: re.value
                    })
                  ]),
                  key: "1"
                } : void 0,
                v.$slots["month-overlay"] ? {
                  name: "overlay-month",
                  fn: withCtx(() => [
                    renderSlot(v.$slots, "month-overlay", normalizeProps(guardReactiveProps(unref(de)("month"))))
                  ]),
                  key: "2"
                } : void 0,
                v.$slots["month-overlay-header"] ? {
                  name: "overlay-month-header",
                  fn: withCtx(() => [
                    renderSlot(v.$slots, "month-overlay-header", { toggle: y3 })
                  ]),
                  key: "3"
                } : void 0
              ]), 1040, ["aria-label", "modelValue"]),
              createVNode(In, mergeProps({
                type: "year",
                "slot-name": "year-overlay-val",
                "overlay-slot": "overlay-year",
                "aria-label": (we = unref(s3).ariaLabels) == null ? void 0 : we.openYearsOverlay,
                modelValue: unref(S3),
                "onUpdate:modelValue": o[4] || (o[4] = (re) => isRef(S3) ? S3.value = re : null)
              }, unref(oe)("year"), {
                onToggle: A,
                onSetRef: o[5] || (o[5] = (re) => ce(re, 2))
              }), createSlots({
                default: withCtx(() => [
                  v.$slots.year ? renderSlot(v.$slots, "year", {
                    key: 0,
                    year: e2.year
                  }) : createCommentVNode("", true),
                  v.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(e2.year), 1)
                  ], 64))
                ]),
                _: 2
              }, [
                v.$slots["calendar-icon"] ? {
                  name: "calendar-icon",
                  fn: withCtx(() => [
                    renderSlot(v.$slots, "calendar-icon")
                  ]),
                  key: "0"
                } : void 0,
                v.$slots["year-overlay-value"] ? {
                  name: "year-overlay-val",
                  fn: withCtx(({ item: re }) => [
                    renderSlot(v.$slots, "year-overlay-value", {
                      text: re.text,
                      value: re.value
                    })
                  ]),
                  key: "1"
                } : void 0,
                v.$slots["year-overlay"] ? {
                  name: "overlay-year",
                  fn: withCtx(() => [
                    renderSlot(v.$slots, "year-overlay", normalizeProps(guardReactiveProps(unref(de)("year"))))
                  ]),
                  key: "2"
                } : void 0,
                v.$slots["year-overlay-header"] ? {
                  name: "overlay-year-header",
                  fn: withCtx(() => [
                    renderSlot(v.$slots, "year-overlay-header", { toggle: A })
                  ]),
                  key: "3"
                } : void 0
              ]), 1040, ["aria-label", "modelValue"])
            ]),
            unref(a3) && v.vertical ? (openBlock(), createBlock(tn, {
              key: 1,
              "aria-label": (ze = unref(s3).ariaLabels) == null ? void 0 : ze.prevMonth,
              disabled: unref(b2)(false),
              onActivate: o[6] || (o[6] = (re) => unref(I2)(false))
            }, {
              default: withCtx(() => [
                v.$slots["arrow-up"] ? renderSlot(v.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                v.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Hn), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
            unref(m3) ? (openBlock(), createBlock(tn, {
              key: 2,
              ref: "rightIcon",
              disabled: unref(b2)(true),
              "aria-label": (Je = unref(s3).ariaLabels) == null ? void 0 : Je.nextMonth,
              onActivate: o[7] || (o[7] = (re) => unref(I2)(true)),
              onSetRef: o[8] || (o[8] = (re) => ce(re, 3))
            }, {
              default: withCtx(() => [
                v.$slots[v.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(v.$slots, v.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
                v.$slots[v.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(v.vertical ? unref(Wn) : unref(wn)), { key: 1 }))
              ]),
              _: 3
            }, 8, ["disabled", "aria-label"])) : createCommentVNode("", true)
          ], 64)) : createCommentVNode("", true),
          v.monthPicker ? (openBlock(), createBlock(Dt, mergeProps({ key: 1 }, unref(oe)("month"), {
            "skip-active": v.range,
            year: e2.year,
            "multi-model-value": unref(_),
            "month-picker": "",
            modelValue: unref(E2),
            "onUpdate:modelValue": o[17] || (o[17] = (re) => isRef(E2) ? E2.value = re : null),
            onToggle: y3,
            onSelected: o[18] || (o[18] = (re) => v.$emit("overlay-closed"))
          }), createSlots({
            header: withCtx(() => {
              var re, Ge, Ke;
              return [
                createElementVNode("div", Nr, [
                  createElementVNode("div", {
                    class: "dp__month_year_col_nav",
                    tabindex: "0",
                    ref_key: "mpPrevIconRef",
                    ref: H3,
                    onClick: o[9] || (o[9] = (Ie) => N(false)),
                    onKeydown: o[10] || (o[10] = withKeys((Ie) => N(false), ["enter"]))
                  }, [
                    createElementVNode("div", {
                      class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: unref(b2)(false) }]),
                      role: "button",
                      "aria-label": (re = unref(s3).ariaLabels) == null ? void 0 : re.prevMonth
                    }, [
                      v.$slots["arrow-left"] ? renderSlot(v.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                      v.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(kn), { key: 1 }))
                    ], 10, Rr)
                  ], 544),
                  createElementVNode("div", {
                    class: "dp__pointer",
                    role: "button",
                    ref_key: "mpYearButtonRef",
                    ref: B2,
                    "aria-label": (Ge = unref(s3).ariaLabels) == null ? void 0 : Ge.openYearsOverlay,
                    tabindex: "0",
                    onClick: o[11] || (o[11] = () => A(false)),
                    onKeydown: o[12] || (o[12] = withKeys(() => A(false), ["enter"]))
                  }, [
                    v.$slots.year ? renderSlot(v.$slots, "year", {
                      key: 0,
                      year: e2.year
                    }) : createCommentVNode("", true),
                    v.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      createTextVNode(toDisplayString(e2.year), 1)
                    ], 64))
                  ], 40, Or),
                  createElementVNode("div", {
                    class: "dp__month_year_col_nav",
                    tabindex: "0",
                    ref_key: "mpNextIconRef",
                    ref: J,
                    onClick: o[13] || (o[13] = (Ie) => N(true)),
                    onKeydown: o[14] || (o[14] = withKeys((Ie) => N(true), ["enter"]))
                  }, [
                    createElementVNode("div", {
                      class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: unref(b2)(true) }]),
                      role: "button",
                      "aria-label": (Ke = unref(s3).ariaLabels) == null ? void 0 : Ke.nextMonth
                    }, [
                      v.$slots["arrow-right"] ? renderSlot(v.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
                      v.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(wn), { key: 1 }))
                    ], 10, Ir)
                  ], 544)
                ]),
                createVNode(Transition, {
                  name: unref(d3)(f.value),
                  css: unref(p)
                }, {
                  default: withCtx(() => [
                    f.value ? (openBlock(), createBlock(Dt, mergeProps({ key: 0 }, unref(oe)("year"), {
                      modelValue: unref(S3),
                      "onUpdate:modelValue": o[15] || (o[15] = (Ie) => isRef(S3) ? S3.value = Ie : null),
                      onToggle: A,
                      onSelected: o[16] || (o[16] = (Ie) => v.$emit("overlay-closed"))
                    }), createSlots({
                      "button-icon": withCtx(() => [
                        v.$slots["calendar-icon"] ? renderSlot(v.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        v.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ft), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      v.$slots["year-overlay-value"] ? {
                        name: "item",
                        fn: withCtx(({ item: Ie }) => [
                          renderSlot(v.$slots, "year-overlay-value", {
                            text: Ie.text,
                            value: Ie.value
                          })
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1040, ["modelValue"])) : createCommentVNode("", true)
                  ]),
                  _: 3
                }, 8, ["name", "css"])
              ];
            }),
            _: 2
          }, [
            v.$slots["month-overlay-value"] ? {
              name: "item",
              fn: withCtx(({ item: re }) => [
                renderSlot(v.$slots, "month-overlay-value", {
                  text: re.text,
                  value: re.value
                })
              ]),
              key: "0"
            } : void 0
          ]), 1040, ["skip-active", "year", "multi-model-value", "modelValue"])) : createCommentVNode("", true),
          v.yearPicker ? (openBlock(), createBlock(Dt, mergeProps({ key: 2 }, unref(oe)("year"), {
            modelValue: unref(S3),
            "onUpdate:modelValue": o[19] || (o[19] = (re) => isRef(S3) ? S3.value = re : null),
            "multi-model-value": unref(_),
            "skip-active": v.range,
            "skip-button-ref": "",
            "year-picker": "",
            onToggle: A,
            onSelected: o[20] || (o[20] = (re) => v.$emit("overlay-closed"))
          }), createSlots({ _: 2 }, [
            v.$slots["year-overlay-value"] ? {
              name: "item",
              fn: withCtx(({ item: re }) => [
                renderSlot(v.$slots, "year-overlay-value", {
                  text: re.text,
                  value: re.value
                })
              ]),
              key: "0"
            } : void 0
          ]), 1040, ["modelValue", "multi-model-value", "skip-active"])) : createCommentVNode("", true)
        ], 64))
      ]);
    };
  }
}), Yr = {
  key: 0,
  class: "dp__time_input"
}, Vr = ["aria-label", "onKeydown", "onClick"], Er = ["aria-label", "data-test", "onKeydown", "onClick"], Lr = ["aria-label", "onKeydown", "onClick"], Fr = { key: 0 }, Ur = ["aria-label", "onKeydown"], Hr = /* @__PURE__ */ defineComponent({
  __name: "TimeInput",
  props: {
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 },
    seconds: { type: Number, default: 0 },
    closeTimePickerBtn: { type: Object, default: null },
    order: { type: Number, default: 0 },
    ...nt
  },
  emits: [
    "set-hours",
    "set-minutes",
    "update:hours",
    "update:minutes",
    "update:seconds",
    "reset-flow",
    "mounted",
    "overlay-closed"
  ],
  setup(e2, { expose: n, emit: r }) {
    const t2 = e2, { setTimePickerElements: s3, setTimePickerBackRef: d3 } = tt(), { defaults: p } = Le(t2), { transitionName: C, showTransition: I2 } = Ut(p.value.transitions), b2 = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), L2 = ref("AM"), $ = ref(null), f = ref([]);
    onMounted(() => {
      r("mounted");
    });
    const M3 = computed(() => (l) => !!(t2.maxTime && t2.maxTime[l] && t2.maxTime[l] < t2[l] + +t2[`${l}Increment`])), H3 = computed(() => (l) => !!(t2.minTime && t2.minTime[l] && t2.minTime[l] > t2[l] - +t2[`${l}Increment`])), B2 = (l, a3) => add(set(w2(), l), a3), J = (l, a3) => sub(set(w2(), l), a3), O2 = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_reg: !t2.enableSeconds && t2.is24,
        dp__time_col_reg_with_button: !t2.enableSeconds && !t2.is24,
        dp__time_col_sec: t2.enableSeconds && t2.is24,
        dp__time_col_sec_with_button: t2.enableSeconds && !t2.is24
      })
    ), E2 = computed(() => {
      const l = [{ type: "hours" }, { type: "", separator: true }, { type: "minutes" }];
      return t2.enableSeconds ? l.concat([{ type: "", separator: true }, { type: "seconds" }]) : l;
    }), S3 = computed(() => E2.value.filter((l) => !l.separator)), G2 = computed(() => (l) => {
      if (l === "hours") {
        const a3 = _(t2.hours);
        return { text: a3 < 10 ? `0${a3}` : `${a3}`, value: a3 };
      }
      return { text: t2[l] < 10 ? `0${t2[l]}` : `${t2[l]}`, value: t2[l] };
    }), le = (l) => {
      const a3 = t2.is24 ? 24 : 12, m3 = l === "hours" ? a3 : 60, y3 = +t2[`${l}GridIncrement`], A = l === "hours" && !t2.is24 ? y3 : 0, j = [];
      for (let N = A; N < m3; N += y3)
        j.push({ value: N, text: N < 10 ? `0${N}` : `${N}` });
      return l === "hours" && !t2.is24 && j.push({ value: 0, text: "12" }), Fa(j);
    }, oe = (l, a3) => {
      const m3 = t2.minTime && t2.minTime[a3], y3 = t2.maxTime && t2.maxTime[a3];
      return m3 && y3 ? l < m3 || l > y3 : m3 ? l < m3 : y3 ? l > y3 : false;
    }, de = computed(() => (l) => le(l).flat().filter((m3) => m3).map((m3) => m3.value).filter((m3) => oe(m3, l))), T2 = (l) => t2[`no${l[0].toUpperCase() + l.slice(1)}Overlay`], Y2 = (l) => {
      T2(l) || (b2[l] = !b2[l], b2[l] || r("overlay-closed"));
    }, F = (l) => l === "hours" ? getHours : l === "minutes" ? getMinutes : getSeconds, c2 = (l, a3 = true) => {
      const m3 = a3 ? B2 : J;
      (a3 ? M3.value(l) : H3.value(l)) || r(
        `update:${l}`,
        F(l)(m3({ [l]: +t2[l] }, { [l]: +t2[`${l}Increment`] }))
      );
    }, _ = (l) => t2.is24 ? l : (l >= 12 ? L2.value = "PM" : L2.value = "AM", za(l)), W = () => {
      L2.value === "PM" ? (L2.value = "AM", r("update:hours", t2.hours - 12)) : (L2.value = "PM", r("update:hours", t2.hours + 12));
    }, q2 = (l) => {
      b2[l] = true;
    }, te = (l, a3, m3) => {
      if (l && t2.arrowNavigation) {
        Array.isArray(f.value[a3]) ? f.value[a3][m3] = l : f.value[a3] = [l];
        const y3 = f.value.reduce(
          (A, j) => j.map((N, ce) => [...A[ce] || [], j[ce]]),
          []
        );
        d3(t2.closeTimePickerBtn), $.value && (y3[1] = y3[1].concat($.value)), s3(y3, t2.order);
      }
    }, R2 = (l, a3) => l === "hours" && !t2.is24 ? r(`update:${l}`, L2.value === "PM" ? a3 + 12 : a3) : r(`update:${l}`, a3);
    return n({ openChildCmp: q2 }), (l, a3) => {
      var m3;
      return l.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Yr, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(E2), (y3, A) => {
          var j, N, ce;
          return openBlock(), createElementBlock("div", {
            key: A,
            class: normalizeClass(unref(O2))
          }, [
            y3.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(" : ")
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createElementVNode("div", {
                class: normalizeClass({
                  dp__inc_dec_button: true,
                  dp__inc_dec_button_disabled: unref(M3)(y3.type)
                }),
                role: "button",
                "data-test": "time-inc-btn",
                "aria-label": (j = unref(p).ariaLabels) == null ? void 0 : j.incrementValue(y3.type),
                tabindex: "0",
                onKeydown: [
                  withKeys((v) => c2(y3.type), ["enter"]),
                  withKeys((v) => c2(y3.type), ["space"])
                ],
                onClick: (v) => c2(y3.type),
                ref_for: true,
                ref: (v) => te(v, A, 0)
              }, [
                l.$slots["arrow-up"] ? renderSlot(l.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                l.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Hn), { key: 1 }))
              ], 42, Vr),
              createElementVNode("div", {
                role: "button",
                "aria-label": (N = unref(p).ariaLabels) == null ? void 0 : N.openTpOverlay(y3.type),
                class: normalizeClass(T2(y3.type) ? "" : "dp__time_display"),
                tabindex: "0",
                "data-test": `${y3.type}-toggle-overlay-btn`,
                onKeydown: [
                  withKeys((v) => Y2(y3.type), ["enter"]),
                  withKeys((v) => Y2(y3.type), ["space"])
                ],
                onClick: (v) => Y2(y3.type),
                ref_for: true,
                ref: (v) => te(v, A, 1)
              }, [
                l.$slots[y3.type] ? renderSlot(l.$slots, y3.type, {
                  key: 0,
                  text: unref(G2)(y3.type).text,
                  value: unref(G2)(y3.type).value
                }) : createCommentVNode("", true),
                l.$slots[y3.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(unref(G2)(y3.type).text), 1)
                ], 64))
              ], 42, Er),
              createElementVNode("div", {
                class: normalizeClass({
                  dp__inc_dec_button: true,
                  dp__inc_dec_button_disabled: unref(H3)(y3.type)
                }),
                role: "button",
                "data-test": "time-dec-btn",
                "aria-label": (ce = unref(p).ariaLabels) == null ? void 0 : ce.decrementValue(y3.type),
                tabindex: "0",
                onKeydown: [
                  withKeys((v) => c2(y3.type, false), ["enter"]),
                  withKeys((v) => c2(y3.type, false), ["space"])
                ],
                onClick: (v) => c2(y3.type, false),
                ref_for: true,
                ref: (v) => te(v, A, 2)
              }, [
                l.$slots["arrow-down"] ? renderSlot(l.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                l.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wn), { key: 1 }))
              ], 42, Lr)
            ], 64))
          ], 2);
        }), 128)),
        l.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Fr, [
          l.$slots["am-pm-button"] ? renderSlot(l.$slots, "am-pm-button", {
            key: 0,
            toggle: W,
            value: L2.value
          }) : createCommentVNode("", true),
          l.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: $,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (m3 = unref(p).ariaLabels) == null ? void 0 : m3.amPmButton,
            tabindex: "0",
            onClick: W,
            onKeydown: [
              withKeys(withModifiers(W, ["prevent"]), ["enter"]),
              withKeys(withModifiers(W, ["prevent"]), ["space"])
            ]
          }, toDisplayString(L2.value), 41, Ur))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(S3), (y3, A) => (openBlock(), createBlock(Transition, {
          key: A,
          name: unref(C)(b2[y3.type]),
          css: unref(I2)
        }, {
          default: withCtx(() => [
            b2[y3.type] ? (openBlock(), createBlock(Dt, {
              key: 0,
              items: le(y3.type),
              "disabled-values": unref(p).filters.times[y3.type].concat(unref(de)(y3.type)),
              "esc-close": l.escClose,
              "aria-labels": unref(p).ariaLabels,
              "hide-navigation": l.hideNavigation,
              "onUpdate:modelValue": (j) => R2(y3.type, j),
              onSelected: (j) => Y2(y3.type),
              onToggle: (j) => Y2(y3.type),
              onResetFlow: a3[0] || (a3[0] = (j) => l.$emit("reset-flow")),
              type: y3.type
            }, createSlots({
              "button-icon": withCtx(() => [
                l.$slots["clock-icon"] ? renderSlot(l.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                l.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Un), { key: 1 }))
              ]),
              _: 2
            }, [
              l.$slots[`${y3.type}-overlay-value`] ? {
                name: "item",
                fn: withCtx(({ item: j }) => [
                  renderSlot(l.$slots, `${y3.type}-overlay-value`, {
                    text: j.text,
                    value: j.value
                  })
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["items", "disabled-values", "esc-close", "aria-labels", "hide-navigation", "onUpdate:modelValue", "onSelected", "onToggle", "type"])) : createCommentVNode("", true)
          ]),
          _: 2
        }, 1032, ["name", "css"]))), 128))
      ]));
    };
  }
}), Wr = ["aria-label"], zr = { class: "dp__overlay_container dp__container_flex dp__time_picker_overlay_container" }, Kr = {
  key: 1,
  class: "dp__overlay_row"
}, jr = ["aria-label"], xr = /* @__PURE__ */ defineComponent({
  __name: "TimePicker",
  props: {
    hours: { type: [Number, Array], default: 0 },
    minutes: { type: [Number, Array], default: 0 },
    seconds: { type: [Number, Array], default: 0 },
    internalModelValue: { type: [Date, Array], default: null },
    ...nt
  },
  emits: [
    "update:hours",
    "update:minutes",
    "update:seconds",
    "mount",
    "reset-flow",
    "overlay-opened",
    "overlay-closed"
  ],
  setup(e2, { expose: n, emit: r }) {
    const t2 = e2, { buildMatrix: s3, setTimePicker: d3 } = tt(), p = useSlots(), { hideNavigationButtons: C, defaults: I2 } = Le(t2), { transitionName: b2, showTransition: L2 } = Ut(I2.value.transitions), $ = ref(null), f = ref(null), M3 = ref([]), H3 = ref(null);
    onMounted(() => {
      r("mount"), !t2.timePicker && t2.arrowNavigation ? s3([Te($.value)], "time") : d3(true, t2.timePicker);
    });
    const B2 = computed(() => t2.range && t2.modelAuto ? Gn(t2.internalModelValue) : true), J = ref(false), O2 = (c2) => ({
      hours: Array.isArray(t2.hours) ? t2.hours[c2] : t2.hours,
      minutes: Array.isArray(t2.minutes) ? t2.minutes[c2] : t2.minutes,
      seconds: Array.isArray(t2.seconds) ? t2.seconds[c2] : t2.seconds
    }), E2 = computed(() => {
      const c2 = [];
      if (t2.range)
        for (let _ = 0; _ < 2; _++)
          c2.push(O2(_));
      else
        c2.push(O2(0));
      return c2;
    }), S3 = (c2, _ = false, W = "") => {
      _ || r("reset-flow"), J.value = c2, c2 && r("overlay-opened"), t2.arrowNavigation && (d3(c2), c2 || r("overlay-closed")), nextTick$1(() => {
        W !== "" && M3.value[0] && M3.value[0].openChildCmp(W);
      });
    }, G2 = computed(() => ({
      dp__button: true,
      dp__button_bottom: t2.autoApply
    })), le = it(p, "timePicker"), oe = (c2, _, W) => t2.range ? _ === 0 ? [c2, E2.value[1][W]] : [E2.value[0][W], c2] : c2, de = (c2) => {
      r("update:hours", c2);
    }, T2 = (c2) => {
      r("update:minutes", c2);
    }, Y2 = (c2) => {
      r("update:seconds", c2);
    }, F = () => {
      H3.value && t2.arrowNavigation && H3.value.focus({ preventScroll: true });
    };
    return n({ toggleTimePicker: S3 }), (c2, _) => {
      var W;
      return openBlock(), createElementBlock("div", null, [
        c2.timePicker ? createCommentVNode("", true) : withDirectives((openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(G2)),
          role: "button",
          "aria-label": (W = unref(I2).ariaLabels) == null ? void 0 : W.openTimePicker,
          tabindex: "0",
          "data-test": "open-time-picker-btn",
          ref_key: "openTimePickerBtn",
          ref: $,
          onKeydown: [
            _[0] || (_[0] = withKeys((q2) => S3(true), ["enter"])),
            _[1] || (_[1] = withKeys((q2) => S3(true), ["space"]))
          ],
          onClick: _[2] || (_[2] = (q2) => S3(true))
        }, [
          c2.$slots["clock-icon"] ? renderSlot(c2.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          c2.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Un), { key: 1 }))
        ], 42, Wr)), [
          [vShow, !unref(C)("time")]
        ]),
        createVNode(Transition, {
          name: unref(b2)(J.value),
          css: unref(L2)
        }, {
          default: withCtx(() => {
            var q2;
            return [
              J.value || c2.timePicker ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "dp__overlay",
                ref_key: "overlayRef",
                ref: H3,
                tabindex: "0"
              }, [
                createElementVNode("div", zr, [
                  c2.$slots["time-picker-overlay"] ? renderSlot(c2.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e2.hours,
                    minutes: e2.minutes,
                    seconds: e2.seconds,
                    setHours: de,
                    setMinutes: T2,
                    setSeconds: Y2
                  }) : createCommentVNode("", true),
                  c2.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Kr, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(E2), (te, R2) => withDirectives((openBlock(), createBlock(Hr, mergeProps({ key: R2 }, {
                      ...c2.$props,
                      order: R2,
                      hours: te.hours,
                      minutes: te.minutes,
                      seconds: te.seconds,
                      closeTimePickerBtn: f.value,
                      disabled: R2 === 0 ? c2.fixedStart : c2.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: M3,
                      "onUpdate:hours": (l) => de(oe(l, R2, "hours")),
                      "onUpdate:minutes": (l) => T2(oe(l, R2, "minutes")),
                      "onUpdate:seconds": (l) => Y2(oe(l, R2, "seconds")),
                      onMounted: F,
                      onOverlayClosed: F
                    }), createSlots({ _: 2 }, [
                      renderList(unref(le), (l, a3) => ({
                        name: l,
                        fn: withCtx((m3) => [
                          renderSlot(c2.$slots, l, normalizeProps(guardReactiveProps(m3)))
                        ])
                      }))
                    ]), 1040, ["onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, R2 === 0 ? true : unref(B2)]
                    ])), 128))
                  ])),
                  c2.timePicker ? createCommentVNode("", true) : withDirectives((openBlock(), createElementBlock("div", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: f,
                    class: normalizeClass(unref(G2)),
                    role: "button",
                    "aria-label": (q2 = unref(I2).ariaLabels) == null ? void 0 : q2.closeTimePicker,
                    tabindex: "0",
                    onKeydown: [
                      _[3] || (_[3] = withKeys((te) => S3(false), ["enter"])),
                      _[4] || (_[4] = withKeys((te) => S3(false), ["space"]))
                    ],
                    onClick: _[5] || (_[5] = (te) => S3(false))
                  }, [
                    c2.$slots["calendar-icon"] ? renderSlot(c2.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    c2.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ft), { key: 1 }))
                  ], 42, jr)), [
                    [vShow, !unref(C)("time")]
                  ])
                ])
              ], 512)) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
}), Gr = (e2, n) => {
  const { isDisabled: r, matchDate: t2, getWeekFromDate: s3 } = Le(n), d3 = ref(null), p = ref(w2()), C = (a3) => {
    !a3.current && n.hideOffsetDates || (d3.value = a3.value);
  }, I2 = () => {
    d3.value = null;
  }, b2 = (a3) => Array.isArray(e2.value) && n.range && e2.value[0] && d3.value ? a3 ? Ve(d3.value, e2.value[0]) : Oe(d3.value, e2.value[0]) : true, L2 = (a3, m3) => {
    const y3 = () => e2.value ? m3 ? e2.value[0] || null : e2.value[1] : null, A = e2.value && Array.isArray(e2.value) ? y3() : null;
    return be(w2(a3.value), A);
  }, $ = (a3) => {
    const m3 = Array.isArray(e2.value) ? e2.value[0] : null;
    return a3 ? !Oe(d3.value || null, m3) : true;
  }, f = (a3, m3 = true) => (n.range || n.weekPicker) && Array.isArray(e2.value) ? n.hideOffsetDates && !a3.current ? false : be(w2(a3.value), e2.value[m3 ? 0 : 1]) : n.range ? L2(a3, m3) && $(m3) || be(a3.value, Array.isArray(e2.value) ? e2.value[0] : null) && b2(m3) : false, M3 = (a3, m3, y3) => Array.isArray(e2.value) && e2.value[0] && e2.value.length === 1 ? a3 ? false : y3 ? Ve(e2.value[0], m3.value) : Oe(e2.value[0], m3.value) : false, H3 = (a3) => !e2.value || n.hideOffsetDates && !a3.current ? false : n.range ? n.modelAuto && Array.isArray(e2.value) ? be(a3.value, e2.value[0] ? e2.value[0] : p.value) : false : n.multiDates && Array.isArray(e2.value) ? e2.value.some((m3) => be(m3, a3.value)) : be(a3.value, e2.value ? e2.value : p.value), B2 = (a3) => {
    if (n.autoRange || n.weekPicker) {
      if (d3.value) {
        if (n.hideOffsetDates && !a3.current)
          return false;
        const m3 = addDays(d3.value, +n.autoRange), y3 = s3(w2(d3.value));
        return n.weekPicker ? be(y3[1], w2(a3.value)) : be(m3, w2(a3.value));
      }
      return false;
    }
    return false;
  }, J = (a3) => {
    if (n.autoRange || n.weekPicker) {
      if (d3.value) {
        const m3 = addDays(d3.value, +n.autoRange);
        if (n.hideOffsetDates && !a3.current)
          return false;
        const y3 = s3(w2(d3.value));
        return n.weekPicker ? Ve(a3.value, y3[0]) && Oe(a3.value, y3[1]) : Ve(a3.value, d3.value) && Oe(a3.value, m3);
      }
      return false;
    }
    return false;
  }, O2 = (a3) => {
    if (n.autoRange || n.weekPicker) {
      if (d3.value) {
        if (n.hideOffsetDates && !a3.current)
          return false;
        const m3 = s3(w2(d3.value));
        return n.weekPicker ? be(m3[0], a3.value) : be(d3.value, a3.value);
      }
      return false;
    }
    return false;
  }, E2 = (a3) => zn(e2.value, d3.value, a3.value), S3 = () => n.modelAuto && Array.isArray(n.internalModelValue) ? !!n.internalModelValue[0] : false, G2 = () => n.modelAuto ? Gn(n.internalModelValue) : true, le = (a3) => {
    if (Array.isArray(e2.value) && e2.value.length || n.weekPicker)
      return false;
    const m3 = n.range ? !f(a3) && !f(a3, false) : true;
    return !r(a3.value) && !H3(a3) && !(!a3.current && n.hideOffsetDates) && m3;
  }, oe = (a3) => n.range ? n.modelAuto ? S3() && H3(a3) : false : H3(a3), de = (a3) => n.highlight ? t2(a3.value, n.highlight) : false, T2 = (a3) => r(a3.value) && n.highlightDisabledDays === false, Y2 = (a3) => n.highlightWeekDays && n.highlightWeekDays.includes(a3.value.getDay()), F = (a3) => (n.range || n.weekPicker) && (!(n.multiCalendars > 0) || a3.current) && G2() && !(!a3.current && n.hideOffsetDates) && !H3(a3) ? E2(a3) : false, c2 = (a3) => ({
    dp__cell_offset: !a3.current,
    dp__pointer: !n.disabled && !(!a3.current && n.hideOffsetDates) && !r(a3.value),
    dp__cell_disabled: r(a3.value),
    dp__cell_highlight: !T2(a3) && (de(a3) || Y2(a3)) && !oe(a3),
    dp__cell_highlight_active: !T2(a3) && (de(a3) || Y2(a3)) && oe(a3),
    dp__today: !n.noToday && be(a3.value, p.value) && a3.current
  }), _ = (a3) => ({
    dp__active_date: oe(a3),
    dp__date_hover: le(a3)
  }), W = (a3) => ({
    ...q2(a3),
    ...te(a3),
    dp__range_between_week: F(a3) && n.weekPicker
  }), q2 = (a3) => ({
    dp__range_start: n.multiCalendars > 0 ? a3.current && f(a3) && G2() : f(a3) && G2(),
    dp__range_end: n.multiCalendars > 0 ? a3.current && f(a3, false) && G2() : f(a3, false) && G2(),
    dp__range_between: F(a3) && !n.weekPicker,
    dp__date_hover_start: M3(le(a3), a3, true),
    dp__date_hover_end: M3(le(a3), a3, false)
  }), te = (a3) => ({
    ...q2(a3),
    dp__cell_auto_range: J(a3),
    dp__cell_auto_range_start: O2(a3),
    dp__cell_auto_range_end: B2(a3)
  }), R2 = (a3) => n.range ? n.autoRange ? te(a3) : n.modelAuto ? { ..._(a3), ...q2(a3) } : q2(a3) : n.weekPicker ? W(a3) : _(a3);
  return {
    setHoverDate: C,
    clearHoverDate: I2,
    getDayClassData: (a3) => ({
      ...c2(a3),
      ...R2(a3),
      [n.dayClass ? n.dayClass(a3.value) : ""]: true,
      [n.calendarCellClassName]: !!n.calendarCellClassName
    })
  };
}, Zr = ["id", "onKeydown"], Xr = {
  key: 0,
  class: "dp__sidebar_left"
}, qr = {
  key: 1,
  class: "dp__preset_ranges"
}, Jr = ["onClick"], Qr = {
  key: 2,
  class: "dp__sidebar_right"
}, el = {
  key: 3,
  class: "dp__now_wrap"
}, tl = /* @__PURE__ */ defineComponent({
  __name: "DatepickerMenu",
  props: {
    openOnTop: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    ...nt
  },
  emits: [
    "close-picker",
    "select-date",
    "auto-apply",
    "time-update",
    "flow-step",
    "update-month-year",
    "invalid-select",
    "update:internal-model-value",
    "recalculate-position",
    "invalid-fixed-range",
    "tooltip-open",
    "tooltip-close",
    "time-picker-open"
  ],
  setup(e2, { expose: n, emit: r }) {
    const t2 = e2, { setMenuFocused: s3, setShiftKey: d3, control: p } = Kn(), { getCalendarDays: C, defaults: I2 } = Le(t2), b2 = useSlots(), L2 = ref(null), $ = reactive({
      timePicker: !!(!t2.enableTimePicker || t2.timePicker || t2.monthPicker),
      monthYearInput: !!t2.timePicker,
      calendar: false
    }), f = ref([]), M3 = ref([]), H3 = ref(null), B2 = ref(null), J = ref(0), O2 = ref(false), E2 = ref(0);
    onMounted(() => {
      var z2;
      O2.value = true, !((z2 = t2.presetRanges) != null && z2.length) && !b2["left-sidebar"] && !b2["right-sidebar"] && ne();
      const g = Te(B2);
      if (g && !t2.textInput && !t2.inline && (s3(true), T2()), g) {
        const Ae = ($e) => {
          Object.keys(b2).length || $e.preventDefault(), $e.stopImmediatePropagation(), $e.stopPropagation();
        };
        g.addEventListener("pointerdown", Ae), g.addEventListener("mousedown", Ae);
      }
      window.addEventListener("resize", ne);
    }), onUnmounted(() => {
      window.removeEventListener("resize", ne);
    });
    const { arrowRight: S3, arrowLeft: G2, arrowDown: le, arrowUp: oe } = tt(), de = (g) => {
      g || g === 0 ? M3.value[g].triggerTransition(
        W.value(g),
        q2.value(g)
      ) : M3.value.forEach(
        (z2, Ae) => z2.triggerTransition(W.value(Ae), q2.value(Ae))
      );
    }, T2 = () => {
      const g = Te(B2);
      g && g.focus({ preventScroll: true });
    }, Y2 = () => {
      var g;
      (g = t2.flow) != null && g.length && E2.value !== -1 && (E2.value += 1, r("flow-step", E2.value), k2());
    }, F = () => {
      E2.value = -1;
    }, {
      calendars: c2,
      modelValue: _,
      month: W,
      year: q2,
      time: te,
      updateTime: R2,
      updateMonthYear: l,
      selectDate: a3,
      getWeekNum: m3,
      monthYearSelect: y3,
      handleScroll: A,
      handleArrow: j,
      handleSwipe: N,
      getMarker: ce,
      selectCurrentDate: v,
      presetDateRange: o
    } = Ja(t2, r, Y2, de, E2), { setHoverDate: Z, clearHoverDate: ee, getDayClassData: we } = Gr(_, t2);
    watch(
      c2,
      () => {
        t2.openOnTop && setTimeout(() => {
          r("recalculate-position");
        }, 0);
      },
      { deep: true }
    );
    const ze = it(b2, "calendar"), Je = it(b2, "action"), re = it(b2, "timePicker"), Ge = it(b2, "monthYear"), Ke = computed(() => t2.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), Ie = computed(() => Ha(t2.yearRange)), ht = computed(() => Wa(t2.locale, t2.monthNameFormat)), ne = () => {
      const g = Te(L2);
      g && (J.value = g.getBoundingClientRect().width);
    }, ye = computed(() => (g) => C(W.value(g), q2.value(g))), ve = computed(
      () => I2.value.multiCalendars > 0 && t2.range ? [...Array(I2.value.multiCalendars).keys()] : [0]
    ), at = computed(
      () => (g) => g === 1
    ), rt = computed(() => t2.monthPicker || t2.timePicker || t2.yearPicker), Ht = computed(
      () => ({
        dp__flex_display: I2.value.multiCalendars > 0
      })
    ), Mt = computed(() => ({
      dp__instance_calendar: I2.value.multiCalendars > 0
    })), pt = computed(() => ({
      dp__menu_disabled: t2.disabled,
      dp__menu_readonly: t2.readonly
    })), Wt = computed(
      () => (g) => Kt(ye, g)
    ), zt = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !t2.inline,
        dp__relative: t2.inline,
        [t2.menuClassName]: !!t2.menuClassName
      })
    ), Kt = (g, z2) => g.value(z2).map((Ae) => ({
      ...Ae,
      days: Ae.days.map(($e) => ($e.marker = ce($e), $e.classData = we($e), $e))
    })), Tt = (g) => {
      g.stopPropagation(), g.stopImmediatePropagation();
    }, yn = () => {
      t2.escClose && r("close-picker");
    }, gn = (g, z2 = false) => {
      a3(g, z2), t2.spaceConfirm && r("select-date");
    }, At = (g) => {
      var z2;
      (z2 = t2.flow) != null && z2.length && ($[g] = true, Object.keys($).filter((Ae) => !$[Ae]).length || k2());
    }, i2 = (g, z2, Ae, $e, ...St) => {
      if (t2.flow[E2.value] === g) {
        const X2 = $e ? z2.value[0] : z2.value;
        X2 && X2[Ae](...St);
      }
    }, k2 = () => {
      i2("month", f, "toggleMonthPicker", true, true), i2("year", f, "toggleYearPicker", true, true), i2("calendar", H3, "toggleTimePicker", false, false, true), i2("time", H3, "toggleTimePicker", false, true, true);
      const g = t2.flow[E2.value];
      (g === "hours" || g === "minutes" || g === "seconds") && i2(g, H3, "toggleTimePicker", false, true, true, g);
    }, x2 = (g) => {
      if (t2.arrowNavigation) {
        if (g === "up")
          return oe();
        if (g === "down")
          return le();
        if (g === "left")
          return G2();
        if (g === "right")
          return S3();
      } else
        g === "left" || g === "up" ? j("left", 0, g === "up") : j("right", 0, g === "down");
    }, Q2 = (g) => {
      d3(g.shiftKey), !t2.disableMonthYearSelect && g.code === "Tab" && g.target.classList.contains("dp__menu") && p.value.shiftKeyInMenu && (g.preventDefault(), g.stopImmediatePropagation(), r("close-picker"));
    }, De = (g) => {
      f.value[0] && f.value[0].handleMonthYearChange(g);
    };
    return n({
      updateMonthYear: l
    }), (g, z2) => {
      var Ae;
      return openBlock(), createBlock(Transition, {
        appear: "",
        name: (Ae = unref(I2).transitions) == null ? void 0 : Ae.menuAppear,
        mode: "out-in",
        css: !!g.transitions
      }, {
        default: withCtx(() => {
          var $e, St;
          return [
            createElementVNode("div", {
              id: g.uid ? `dp-menu-${g.uid}` : void 0,
              tabindex: "0",
              ref_key: "dpMenuRef",
              ref: B2,
              role: "dialog",
              class: normalizeClass(unref(zt)),
              onMouseleave: z2[15] || (z2[15] = //@ts-ignore
              (...X2) => unref(ee) && unref(ee)(...X2)),
              onClick: Tt,
              onKeydown: [
                withKeys(yn, ["esc"]),
                z2[16] || (z2[16] = withKeys(withModifiers((X2) => x2("left"), ["prevent"]), ["left"])),
                z2[17] || (z2[17] = withKeys(withModifiers((X2) => x2("up"), ["prevent"]), ["up"])),
                z2[18] || (z2[18] = withKeys(withModifiers((X2) => x2("down"), ["prevent"]), ["down"])),
                z2[19] || (z2[19] = withKeys(withModifiers((X2) => x2("right"), ["prevent"]), ["right"])),
                Q2
              ]
            }, [
              (g.disabled || g.readonly) && g.inline ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(unref(pt))
              }, null, 2)) : createCommentVNode("", true),
              !g.inline && !g.teleportCenter ? (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(unref(Ke))
              }, null, 2)) : createCommentVNode("", true),
              createElementVNode("div", {
                class: normalizeClass({
                  dp__menu_content_wrapper: (($e = g.presetRanges) == null ? void 0 : $e.length) || !!g.$slots["left-sidebar"] || !!g.$slots["right-sidebar"]
                })
              }, [
                g.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", Xr, [
                  renderSlot(g.$slots, "left-sidebar", normalizeProps(guardReactiveProps({ handleMonthYearChange: De })))
                ])) : createCommentVNode("", true),
                (St = g.presetRanges) != null && St.length ? (openBlock(), createElementBlock("div", qr, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(g.presetRanges, (X2, ft) => (openBlock(), createElementBlock("div", {
                    key: ft,
                    style: normalizeStyle(X2.style || {}),
                    class: "dp__preset_range",
                    onClick: (ie) => unref(o)(X2.range, !!X2.slot)
                  }, [
                    X2.slot ? renderSlot(g.$slots, X2.slot, {
                      key: 0,
                      presetDateRange: unref(o),
                      label: X2.label,
                      range: X2.range
                    }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      createTextVNode(toDisplayString(X2.label), 1)
                    ], 64))
                  ], 12, Jr))), 128))
                ])) : createCommentVNode("", true),
                createElementVNode("div", {
                  class: "dp__instance_calendar",
                  ref_key: "calendarWrapperRef",
                  ref: L2,
                  role: "document"
                }, [
                  createElementVNode("div", {
                    class: normalizeClass(unref(Ht))
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(ve), (X2, ft) => (openBlock(), createElementBlock("div", {
                      key: X2,
                      class: normalizeClass(unref(Mt))
                    }, [
                      !g.disableMonthYearSelect && !g.timePicker ? (openBlock(), createBlock(Br, mergeProps({
                        key: 0,
                        ref_for: true,
                        ref: (ie) => {
                          ie && (f.value[ft] = ie);
                        },
                        months: unref(ht),
                        years: unref(Ie),
                        month: unref(W)(X2),
                        year: unref(q2)(X2),
                        instance: X2,
                        "internal-model-value": e2.internalModelValue
                      }, g.$props, {
                        onMount: z2[0] || (z2[0] = (ie) => At("monthYearInput")),
                        onResetFlow: F,
                        onUpdateMonthYear: (ie) => unref(l)(X2, ie),
                        onMonthYearSelect: unref(y3),
                        onOverlayClosed: T2
                      }), createSlots({ _: 2 }, [
                        renderList(unref(Ge), (ie, Xn) => ({
                          name: ie,
                          fn: withCtx((jt) => [
                            renderSlot(g.$slots, ie, normalizeProps(guardReactiveProps(jt)))
                          ])
                        }))
                      ]), 1040, ["months", "years", "month", "year", "instance", "internal-model-value", "onUpdateMonthYear", "onMonthYearSelect"])) : createCommentVNode("", true),
                      createVNode(Dr, mergeProps({
                        ref_for: true,
                        ref: (ie) => {
                          ie && (M3.value[ft] = ie);
                        },
                        "specific-mode": unref(rt),
                        "get-week-num": unref(m3),
                        instance: X2,
                        "mapped-dates": unref(Wt)(X2),
                        month: unref(W)(X2),
                        year: unref(q2)(X2)
                      }, g.$props, {
                        "flow-step": E2.value,
                        "onUpdate:flowStep": z2[1] || (z2[1] = (ie) => E2.value = ie),
                        onSelectDate: (ie) => unref(a3)(ie, !unref(at)(X2)),
                        onHandleSpace: (ie) => gn(ie, !unref(at)(X2)),
                        onSetHoverDate: z2[2] || (z2[2] = (ie) => unref(Z)(ie)),
                        onHandleScroll: (ie) => unref(A)(ie, X2),
                        onHandleSwipe: (ie) => unref(N)(ie, X2),
                        onMount: z2[3] || (z2[3] = (ie) => At("calendar")),
                        onResetFlow: F,
                        onTooltipOpen: z2[4] || (z2[4] = (ie) => g.$emit("tooltip-open", ie)),
                        onTooltipClose: z2[5] || (z2[5] = (ie) => g.$emit("tooltip-close", ie))
                      }), createSlots({ _: 2 }, [
                        renderList(unref(ze), (ie, Xn) => ({
                          name: ie,
                          fn: withCtx((jt) => [
                            renderSlot(g.$slots, ie, normalizeProps(guardReactiveProps({ ...jt })))
                          ])
                        }))
                      ]), 1040, ["specific-mode", "get-week-num", "instance", "mapped-dates", "month", "year", "flow-step", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
                    ], 2))), 128))
                  ], 2),
                  createElementVNode("div", null, [
                    g.$slots["time-picker"] ? renderSlot(g.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(te), updateTime: unref(R2) }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      g.enableTimePicker && !g.monthPicker && !g.weekPicker ? (openBlock(), createBlock(xr, mergeProps({
                        key: 0,
                        ref_key: "timePickerRef",
                        ref: H3,
                        hours: unref(te).hours,
                        minutes: unref(te).minutes,
                        seconds: unref(te).seconds,
                        "internal-model-value": e2.internalModelValue
                      }, g.$props, {
                        onMount: z2[6] || (z2[6] = (X2) => At("timePicker")),
                        "onUpdate:hours": z2[7] || (z2[7] = (X2) => unref(R2)(X2)),
                        "onUpdate:minutes": z2[8] || (z2[8] = (X2) => unref(R2)(X2, false)),
                        "onUpdate:seconds": z2[9] || (z2[9] = (X2) => unref(R2)(X2, false, true)),
                        onResetFlow: F,
                        onOverlayClosed: T2,
                        onOverlayOpened: z2[10] || (z2[10] = (X2) => g.$emit("time-picker-open", X2))
                      }), createSlots({ _: 2 }, [
                        renderList(unref(re), (X2, ft) => ({
                          name: X2,
                          fn: withCtx((ie) => [
                            renderSlot(g.$slots, X2, normalizeProps(guardReactiveProps(ie)))
                          ])
                        }))
                      ]), 1040, ["hours", "minutes", "seconds", "internal-model-value"])) : createCommentVNode("", true)
                    ], 64))
                  ])
                ], 512),
                g.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", Qr, [
                  renderSlot(g.$slots, "right-sidebar", normalizeProps(guardReactiveProps({ handleMonthYearChange: De })))
                ])) : createCommentVNode("", true),
                g.showNowButton ? (openBlock(), createElementBlock("div", el, [
                  g.$slots["now-button"] ? renderSlot(g.$slots, "now-button", {
                    key: 0,
                    selectCurrentDate: unref(v)
                  }) : createCommentVNode("", true),
                  g.$slots["now-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
                    key: 1,
                    type: "button",
                    role: "button",
                    class: "dp__now_button",
                    onClick: z2[11] || (z2[11] = //@ts-ignore
                    (...X2) => unref(v) && unref(v)(...X2))
                  }, toDisplayString(g.nowButtonLabel), 1))
                ])) : createCommentVNode("", true)
              ], 2),
              !g.autoApply || g.keepActionRow ? (openBlock(), createBlock(vr, mergeProps({
                key: 2,
                "menu-mount": O2.value,
                "calendar-width": J.value,
                "internal-model-value": e2.internalModelValue
              }, g.$props, {
                onClosePicker: z2[12] || (z2[12] = (X2) => g.$emit("close-picker")),
                onSelectDate: z2[13] || (z2[13] = (X2) => g.$emit("select-date")),
                onInvalidSelect: z2[14] || (z2[14] = (X2) => g.$emit("invalid-select"))
              }), createSlots({ _: 2 }, [
                renderList(unref(Je), (X2, ft) => ({
                  name: X2,
                  fn: withCtx((ie) => [
                    renderSlot(g.$slots, X2, normalizeProps(guardReactiveProps({ ...ie })))
                  ])
                }))
              ]), 1040, ["menu-mount", "calendar-width", "internal-model-value"])) : createCommentVNode("", true)
            ], 42, Zr)
          ];
        }),
        _: 3
      }, 8, ["name", "css"]);
    };
  }
}), nl = typeof window < "u" ? window : void 0, nn = () => {
}, al = (e2) => getCurrentScope() ? (onScopeDispose(e2), true) : false, rl = (e2, n, r, t2) => {
  if (!e2)
    return nn;
  let s3 = nn;
  const d3 = watch(
    () => unref(e2),
    (C) => {
      s3(), C && (C.addEventListener(n, r, t2), s3 = () => {
        C.removeEventListener(n, r, t2), s3 = nn;
      });
    },
    { immediate: true, flush: "post" }
  ), p = () => {
    d3(), s3();
  };
  return al(p), p;
}, ll = (e2, n, r, t2 = {}) => {
  const { window: s3 = nl, event: d3 = "pointerdown" } = t2;
  return s3 ? rl(s3, d3, (C) => {
    const I2 = Te(e2), b2 = Te(n);
    !I2 || !b2 || I2 === C.target || C.composedPath().includes(I2) || C.composedPath().includes(b2) || r(C);
  }, { passive: true }) : void 0;
}, ol = /* @__PURE__ */ defineComponent({
  __name: "VueDatePicker",
  props: {
    ...nt
  },
  emits: [
    "update:model-value",
    "text-submit",
    "closed",
    "cleared",
    "open",
    "focus",
    "blur",
    "internal-model-change",
    "recalculate-position",
    "flow-step",
    "update-month-year",
    "invalid-select",
    "invalid-fixed-range",
    "tooltip-open",
    "tooltip-close",
    "time-picker-open"
  ],
  setup(e2, { expose: n, emit: r }) {
    const t2 = e2, s3 = useSlots(), d3 = ref(false), p = toRef(t2, "modelValue"), C = toRef(t2, "timezone"), I2 = ref(null), b2 = ref(null), L2 = ref(false), $ = ref(null), { setMenuFocused: f, setShiftKey: M3 } = Kn(), { clearArrowNav: H3 } = tt(), { validateDate: B2, isValidTime: J, defaults: O2 } = Le(t2);
    onMounted(() => {
      c2(t2.modelValue), t2.inline || (T2($.value).addEventListener("scroll", a3), window.addEventListener("resize", m3)), t2.inline && (d3.value = true);
    }), onUnmounted(() => {
      if (!t2.inline) {
        const ne = T2($.value);
        ne && ne.removeEventListener("scroll", a3), window.removeEventListener("resize", m3);
      }
    });
    const E2 = it(s3, "all", t2.presetRanges), S3 = it(s3, "input");
    watch(
      [p, C],
      () => {
        c2(p.value);
      },
      { deep: true }
    );
    const { openOnTop: G2, menuPosition: le, setMenuPosition: oe, setInitialPosition: de, getScrollableParent: T2 } = tr(
      I2,
      b2,
      r,
      t2
    ), {
      inputValue: Y2,
      internalModelValue: F,
      parseExternalModelValue: c2,
      emitModelValue: _,
      formatInputValue: W,
      checkBeforeEmit: q2
    } = Qa(r, t2, L2), te = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: t2.dark,
        dp__theme_light: !t2.dark,
        dp__flex_display: t2.inline,
        dp__flex_display_with_input: t2.inlineWithInput
      })
    ), R2 = computed(() => t2.dark ? "dp__theme_dark" : "dp__theme_light"), l = computed(() => t2.teleport ? {
      to: typeof t2.teleport == "boolean" ? "body" : t2.teleport,
      disabled: t2.inline
    } : { class: "dp__outer_menu_wrap" }), a3 = () => {
      d3.value && (t2.closeOnScroll ? ee() : oe());
    }, m3 = () => {
      d3.value && oe();
    }, y3 = () => {
      !t2.disabled && !t2.readonly && (de(), d3.value = true, nextTick$1().then(() => {
        oe(), d3.value && r("open");
      }), d3.value || Z(), c2(t2.modelValue));
    }, A = () => {
      Y2.value = "", Z(), r("update:model-value", null), r("cleared"), ee();
    }, j = () => {
      const ne = F.value;
      return !ne || !Array.isArray(ne) && B2(ne) ? true : Array.isArray(ne) ? ne.length === 2 && B2(ne[0]) && B2(ne[1]) ? true : B2(ne[0]) : false;
    }, N = () => {
      q2() && j() ? (_(), ee()) : r("invalid-select", F.value);
    }, ce = (ne) => {
      v(), _(), t2.closeOnAutoApply && !ne && ee();
    }, v = () => {
      b2.value && t2.textInput && b2.value.setParsedDate(F.value);
    }, o = (ne = false) => {
      t2.autoApply && J(F.value) && j() && (t2.range && Array.isArray(F.value) ? (t2.partialRange || F.value.length === 2) && ce(ne) : ce(ne));
    }, Z = () => {
      t2.textInput || (F.value = null);
    }, ee = () => {
      t2.inline || (d3.value && (d3.value = false, f(false), M3(false), H3(), r("closed"), de(), Y2.value && c2(p.value)), Z(), b2.value && b2.value.focusInput());
    }, we = (ne, ye) => {
      if (!ne) {
        F.value = null;
        return;
      }
      F.value = ne, ye && (N(), r("text-submit"));
    }, ze = () => {
      t2.autoApply && J(F.value) && _(), v();
    }, Je = () => d3.value ? ee() : y3(), re = (ne) => {
      F.value = ne;
    }, Ge = computed(() => t2.textInput && O2.value.textInputOptions.format), Ke = () => {
      Ge.value && (L2.value = true, W()), r("focus");
    }, Ie = () => {
      Ge.value && (L2.value = false, W()), r("blur");
    }, ht = (ne) => {
      I2.value && I2.value.updateMonthYear(0, {
        month: _n(ne.month),
        year: _n(ne.year)
      });
    };
    return ll(
      I2,
      b2,
      t2.onClickOutside ? () => t2.onClickOutside(j) : ee
    ), n({
      closeMenu: ee,
      selectDate: N,
      clearValue: A,
      openMenu: y3,
      onScroll: a3,
      formatInputValue: W,
      // exposed for testing purposes
      updateInternalModelValue: re,
      // modify internal modelValue
      setMonthYear: ht
    }), (ne, ye) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(unref(te)),
      ref_key: "pickerWrapperRef",
      ref: $
    }, [
      createVNode(ur, mergeProps({
        ref_key: "inputRef",
        ref: b2,
        "is-menu-open": d3.value,
        "input-value": unref(Y2),
        "onUpdate:inputValue": ye[0] || (ye[0] = (ve) => isRef(Y2) ? Y2.value = ve : null)
      }, ne.$props, {
        onClear: A,
        onOpen: y3,
        onSetInputDate: we,
        onSetEmptyDate: unref(_),
        onSelectDate: N,
        onToggle: Je,
        onClose: ee,
        onFocus: Ke,
        onBlur: Ie
      }), createSlots({ _: 2 }, [
        renderList(unref(S3), (ve, at) => ({
          name: ve,
          fn: withCtx((rt) => [
            renderSlot(ne.$slots, ve, normalizeProps(guardReactiveProps(rt)))
          ])
        }))
      ]), 1040, ["is-menu-open", "input-value", "onSetEmptyDate"]),
      d3.value ? (openBlock(), createBlock(resolveDynamicComponent(ne.teleport ? Teleport : "div"), normalizeProps(mergeProps({ key: 0 }, unref(l))), {
        default: withCtx(() => [
          d3.value ? (openBlock(), createBlock(tl, mergeProps({
            key: 0,
            ref_key: "dpMenuRef",
            ref: I2,
            class: unref(R2),
            style: unref(le),
            "open-on-top": unref(G2)
          }, ne.$props, {
            "internal-model-value": unref(F),
            "onUpdate:internalModelValue": ye[1] || (ye[1] = (ve) => isRef(F) ? F.value = ve : null),
            onClosePicker: ee,
            onSelectDate: N,
            onAutoApply: o,
            onTimeUpdate: ze,
            onFlowStep: ye[2] || (ye[2] = (ve) => ne.$emit("flow-step", ve)),
            onUpdateMonthYear: ye[3] || (ye[3] = (ve) => ne.$emit("update-month-year", ve)),
            onInvalidSelect: ye[4] || (ye[4] = (ve) => ne.$emit("invalid-select", unref(F))),
            onInvalidFixedRange: ye[5] || (ye[5] = (ve) => ne.$emit("invalid-fixed-range", ve)),
            onRecalculatePosition: unref(oe),
            onTooltipOpen: ye[6] || (ye[6] = (ve) => ne.$emit("tooltip-open", ve)),
            onTooltipClose: ye[7] || (ye[7] = (ve) => ne.$emit("tooltip-close", ve)),
            onTimePickerOpen: ye[8] || (ye[8] = (ve) => ne.$emit("time-picker-open", ve))
          }), createSlots({ _: 2 }, [
            renderList(unref(E2), (ve, at) => ({
              name: ve,
              fn: withCtx((rt) => [
                renderSlot(ne.$slots, ve, normalizeProps(guardReactiveProps({ ...rt })))
              ])
            }))
          ]), 1040, ["class", "style", "open-on-top", "internal-model-value", "onRecalculatePosition"])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 16)) : createCommentVNode("", true)
    ], 2));
  }
}), Zn = /* @__PURE__ */ (() => {
  const e2 = ol;
  return e2.install = (n) => {
    n.component("Vue3DatePicker", e2);
  }, e2;
})(), sl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Zn
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(sl).forEach(([e2, n]) => {
  e2 !== "default" && (Zn[e2] = n);
});
const main = "";
const _sfc_main$d = /* @__PURE__ */ defineComponent({
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
      console.log("s to:", to);
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
        createVNode(unref(Zn), mergeProps({
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
const DatePicker_vue_vue_type_style_index_0_scoped_b2e91c47_lang = "";
const DatePicker = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-b2e91c47"]]);
DatePicker.install = (app) => {
  app.component(DatePicker.__name, DatePicker);
};
const _withScopeId$7 = (n) => (pushScopeId("data-v-8aa1c704"), n = n(), popScopeId(), n);
const _hoisted_1$c = ["onClick"];
const _hoisted_2$b = { class: "m-spin-dot" };
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
const _sfc_main$c = /* @__PURE__ */ defineComponent({
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
            withDirectives(createElementVNode("div", _hoisted_2$b, _hoisted_7$5, 512), [
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
      ], 8, _hoisted_1$c);
    };
  }
});
const Dialog_vue_vue_type_style_index_0_scoped_8aa1c704_lang = "";
const Dialog = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-8aa1c704"]]);
Dialog.install = (app) => {
  app.component(Dialog.__name, Dialog);
};
const _withScopeId$6 = (n) => (pushScopeId("data-v-de28c295"), n = n(), popScopeId(), n);
const _hoisted_1$b = ["onMouseenter", "onMouseleave"];
const _hoisted_2$a = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1));
const _hoisted_3$7 = [
  _hoisted_2$a
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
const _sfc_main$b = /* @__PURE__ */ defineComponent({
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
      nextTick$1(() => {
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
                ], 40, _hoisted_1$b)) : createCommentVNode("", true)
              ]),
              _: 2
            }, 1024))
          ]);
        }), 128))
      ], 4);
    };
  }
});
const Message_vue_vue_type_style_index_0_scoped_de28c295_lang = "";
const Message = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-de28c295"]]);
Message.install = (app) => {
  app.component(Message.__name, Message);
};
const _withScopeId$5 = (n) => (pushScopeId("data-v-4aa7e0ff"), n = n(), popScopeId(), n);
const _hoisted_1$a = ["onClick"];
const _hoisted_2$9 = { class: "m-modal-content" };
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
const _sfc_main$a = /* @__PURE__ */ defineComponent({
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
          createElementVNode("div", _hoisted_2$9, [
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
      ], 8, _hoisted_1$a);
    };
  }
});
const Modal_vue_vue_type_style_index_0_scoped_4aa7e0ff_lang = "";
const Modal = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-4aa7e0ff"]]);
Modal.install = (app) => {
  app.component(Modal.__name, Modal);
};
const _withScopeId$4 = (n) => (pushScopeId("data-v-eab91dfd"), n = n(), popScopeId(), n);
const _hoisted_1$9 = ["onMouseenter", "onMouseleave"];
const _hoisted_2$8 = ["fill"];
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
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
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
                }, _hoisted_5$2, 8, _hoisted_2$8)) : createCommentVNode("", true),
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
              ], 40, _hoisted_1$9)), [
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
const Notification = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-eab91dfd"]]);
Notification.install = (app) => {
  app.component(Notification.__name, Notification);
};
const _withScopeId$3 = (n) => (pushScopeId("data-v-47fb5a25"), n = n(), popScopeId(), n);
const _hoisted_1$8 = { class: "m-pagination-wrap" };
const _hoisted_2$7 = {
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
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
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
      document.onkeydown = (e2) => {
        const ev = e2 || window.event;
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
      for (let i2 = pager.start; i2 <= pager.end; i2++) {
        resList.push(i2);
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
        createElementVNode("div", _hoisted_1$8, [
          __props.showTotal ? (openBlock(), createElementBlock("span", _hoisted_2$7, "共 " + toDisplayString(unref(totalPage)) + " 页 / " + toDisplayString(__props.total) + " 条", 1)) : createCommentVNode("", true),
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
const Pagination$1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-47fb5a25"]]);
Pagination$1.install = (app) => {
  app.component(Pagination$1.__name, Pagination$1);
};
const _hoisted_1$7 = ["onClick"];
const _hoisted_2$6 = { class: "u-label" };
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
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
    function onClick2(value) {
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
            onClick: ($event) => __props.disabled || option.disabled ? (e2) => e2.preventDefault() : onClick2(option.value),
            key: index
          }, [
            createElementVNode("span", {
              class: normalizeClass(["u-radio", { "u-radio-checked": __props.value === option.value }])
            }, null, 2),
            createElementVNode("span", _hoisted_2$6, toDisplayString(option.label), 1)
          ], 14, _hoisted_1$7);
        }), 128))
      ], 2);
    };
  }
});
const Radio_vue_vue_type_style_index_0_scoped_8d631e03_lang = "";
const Radio = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-8d631e03"]]);
Radio.install = (app) => {
  app.component(Radio.__name, Radio);
};
const _withScopeId$2 = (n) => (pushScopeId("data-v-e1d11167"), n = n(), popScopeId(), n);
const _hoisted_1$6 = ["title"];
const _hoisted_2$5 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1));
const _hoisted_3$3 = [
  _hoisted_2$5
];
const _hoisted_4$2 = ["onClick"];
const _hoisted_5 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1));
const _hoisted_6 = [
  _hoisted_5
];
const _hoisted_7 = ["title", "onMouseenter", "onClick"];
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
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
          onBlur: _cache[0] || (_cache[0] = ($event) => activeBlur.value && !__props.disabled ? onBlur() : (e2) => e2.preventDefault()),
          onClick: _cache[1] || (_cache[1] = ($event) => __props.disabled ? (e2) => e2.preventDefault() : openSelect())
        }, [
          createElementVNode("div", {
            class: normalizeClass(["u-select-input", { "placeholder": !selectedName.value }]),
            style: normalizeStyle(`line-height: ${__props.height - 2}px;width: ${__props.width - 37}px; height: ${__props.height - 2}px;`),
            title: selectedName.value
          }, toDisplayString(selectedName.value || __props.placeholder), 15, _hoisted_1$6),
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
                  onClick: ($event) => option.disabled ? (e2) => e2.preventDefault() : onChange(option[__props.value], option[__props.label], index)
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
const Select = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-e1d11167"]]);
Select.install = (app) => {
  app.component(Select.__name, Select);
};
const _hoisted_1$5 = { class: "m-spin" };
const _hoisted_2$4 = { class: "m-spin-box" };
const _hoisted_3$2 = /* @__PURE__ */ createStaticVNode('<div class="m-spin-dot" data-v-a6fc638a><span class="u-dot-item" data-v-a6fc638a></span><span class="u-dot-item" data-v-a6fc638a></span><span class="u-dot-item" data-v-a6fc638a></span><span class="u-dot-item" data-v-a6fc638a></span></div>', 1);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
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
        withDirectives(createElementVNode("div", _hoisted_1$5, [
          createElementVNode("div", _hoisted_2$4, [
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
const Spin = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-a6fc638a"]]);
Spin.install = (app) => {
  app.component(Spin.__name, Spin);
};
function isObject$2(obj) {
  return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
}
function extend$2(target = {}, src = {}) {
  Object.keys(src).forEach((key) => {
    if (typeof target[key] === "undefined")
      target[key] = src[key];
    else if (isObject$2(src[key]) && isObject$2(target[key]) && Object.keys(src[key]).length > 0) {
      extend$2(target[key], src[key]);
    }
  });
}
const ssrDocument = {
  body: {},
  addEventListener() {
  },
  removeEventListener() {
  },
  activeElement: {
    blur() {
    },
    nodeName: ""
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return {
      initEvent() {
      }
    };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {
      },
      getElementsByTagName() {
        return [];
      }
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  }
};
function getDocument() {
  const doc = typeof document !== "undefined" ? document : {};
  extend$2(doc, ssrDocument);
  return doc;
}
const ssrWindow = {
  document: ssrDocument,
  navigator: {
    userAgent: ""
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  },
  history: {
    replaceState() {
    },
    pushState() {
    },
    go() {
    },
    back() {
    }
  },
  CustomEvent: function CustomEvent() {
    return this;
  },
  addEventListener() {
  },
  removeEventListener() {
  },
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      }
    };
  },
  Image() {
  },
  Date() {
  },
  screen: {},
  setTimeout() {
  },
  clearTimeout() {
  },
  matchMedia() {
    return {};
  },
  requestAnimationFrame(callback) {
    if (typeof setTimeout === "undefined") {
      callback();
      return null;
    }
    return setTimeout(callback, 0);
  },
  cancelAnimationFrame(id) {
    if (typeof setTimeout === "undefined") {
      return;
    }
    clearTimeout(id);
  }
};
function getWindow() {
  const win = typeof window !== "undefined" ? window : {};
  extend$2(win, ssrWindow);
  return win;
}
function deleteProps(obj) {
  const object = obj;
  Object.keys(object).forEach((key) => {
    try {
      object[key] = null;
    } catch (e2) {
    }
    try {
      delete object[key];
    } catch (e2) {
    }
  });
}
function nextTick(callback, delay = 0) {
  return setTimeout(callback, delay);
}
function now() {
  return Date.now();
}
function getComputedStyle$1(el2) {
  const window2 = getWindow();
  let style;
  if (window2.getComputedStyle) {
    style = window2.getComputedStyle(el2, null);
  }
  if (!style && el2.currentStyle) {
    style = el2.currentStyle;
  }
  if (!style) {
    style = el2.style;
  }
  return style;
}
function getTranslate(el2, axis = "x") {
  const window2 = getWindow();
  let matrix;
  let curTransform;
  let transformMatrix;
  const curStyle = getComputedStyle$1(el2);
  if (window2.WebKitCSSMatrix) {
    curTransform = curStyle.transform || curStyle.webkitTransform;
    if (curTransform.split(",").length > 6) {
      curTransform = curTransform.split(", ").map((a3) => a3.replace(",", ".")).join(", ");
    }
    transformMatrix = new window2.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
  } else {
    transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
    matrix = transformMatrix.toString().split(",");
  }
  if (axis === "x") {
    if (window2.WebKitCSSMatrix)
      curTransform = transformMatrix.m41;
    else if (matrix.length === 16)
      curTransform = parseFloat(matrix[12]);
    else
      curTransform = parseFloat(matrix[4]);
  }
  if (axis === "y") {
    if (window2.WebKitCSSMatrix)
      curTransform = transformMatrix.m42;
    else if (matrix.length === 16)
      curTransform = parseFloat(matrix[13]);
    else
      curTransform = parseFloat(matrix[5]);
  }
  return curTransform || 0;
}
function isObject$1(o) {
  return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
}
function isNode(node) {
  if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") {
    return node instanceof HTMLElement;
  }
  return node && (node.nodeType === 1 || node.nodeType === 11);
}
function extend$1(...args) {
  const to = Object(args[0]);
  const noExtend = ["__proto__", "constructor", "prototype"];
  for (let i2 = 1; i2 < args.length; i2 += 1) {
    const nextSource = args[i2];
    if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
      const keysArray = Object.keys(Object(nextSource)).filter((key) => noExtend.indexOf(key) < 0);
      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        const nextKey = keysArray[nextIndex];
        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== void 0 && desc.enumerable) {
          if (isObject$1(to[nextKey]) && isObject$1(nextSource[nextKey])) {
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend$1(to[nextKey], nextSource[nextKey]);
            }
          } else if (!isObject$1(to[nextKey]) && isObject$1(nextSource[nextKey])) {
            to[nextKey] = {};
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend$1(to[nextKey], nextSource[nextKey]);
            }
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to;
}
function setCSSProperty(el2, varName, varValue) {
  el2.style.setProperty(varName, varValue);
}
function animateCSSModeScroll({
  swiper,
  targetPosition,
  side
}) {
  const window2 = getWindow();
  const startPosition = -swiper.translate;
  let startTime = null;
  let time;
  const duration = swiper.params.speed;
  swiper.wrapperEl.style.scrollSnapType = "none";
  window2.cancelAnimationFrame(swiper.cssModeFrameID);
  const dir = targetPosition > startPosition ? "next" : "prev";
  const isOutOfBound = (current, target) => {
    return dir === "next" && current >= target || dir === "prev" && current <= target;
  };
  const animate = () => {
    time = new Date().getTime();
    if (startTime === null) {
      startTime = time;
    }
    const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
    const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
    let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
    if (isOutOfBound(currentPosition, targetPosition)) {
      currentPosition = targetPosition;
    }
    swiper.wrapperEl.scrollTo({
      [side]: currentPosition
    });
    if (isOutOfBound(currentPosition, targetPosition)) {
      swiper.wrapperEl.style.overflow = "hidden";
      swiper.wrapperEl.style.scrollSnapType = "";
      setTimeout(() => {
        swiper.wrapperEl.style.overflow = "";
        swiper.wrapperEl.scrollTo({
          [side]: currentPosition
        });
      });
      window2.cancelAnimationFrame(swiper.cssModeFrameID);
      return;
    }
    swiper.cssModeFrameID = window2.requestAnimationFrame(animate);
  };
  animate();
}
function getSlideTransformEl(slideEl) {
  return slideEl.querySelector(".swiper-slide-transform") || slideEl.shadowEl && slideEl.shadowEl.querySelector(".swiper-slide-transform") || slideEl;
}
function elementChildren(element, selector = "") {
  return [...element.children].filter((el2) => el2.matches(selector));
}
function createElement(tag, classes2 = []) {
  const el2 = document.createElement(tag);
  el2.classList.add(...Array.isArray(classes2) ? classes2 : [classes2]);
  return el2;
}
function elementPrevAll(el2, selector) {
  const prevEls = [];
  while (el2.previousElementSibling) {
    const prev = el2.previousElementSibling;
    if (selector) {
      if (prev.matches(selector))
        prevEls.push(prev);
    } else
      prevEls.push(prev);
    el2 = prev;
  }
  return prevEls;
}
function elementNextAll(el2, selector) {
  const nextEls = [];
  while (el2.nextElementSibling) {
    const next = el2.nextElementSibling;
    if (selector) {
      if (next.matches(selector))
        nextEls.push(next);
    } else
      nextEls.push(next);
    el2 = next;
  }
  return nextEls;
}
function elementStyle(el2, prop) {
  const window2 = getWindow();
  return window2.getComputedStyle(el2, null).getPropertyValue(prop);
}
function elementIndex(el2) {
  let child = el2;
  let i2;
  if (child) {
    i2 = 0;
    while ((child = child.previousSibling) !== null) {
      if (child.nodeType === 1)
        i2 += 1;
    }
    return i2;
  }
  return void 0;
}
function elementParents(el2, selector) {
  const parents = [];
  let parent = el2.parentElement;
  while (parent) {
    if (selector) {
      if (parent.matches(selector))
        parents.push(parent);
    } else {
      parents.push(parent);
    }
    parent = parent.parentElement;
  }
  return parents;
}
function elementTransitionEnd(el2, callback) {
  function fireCallBack(e2) {
    if (e2.target !== el2)
      return;
    callback.call(el2, e2);
    el2.removeEventListener("transitionend", fireCallBack);
  }
  if (callback) {
    el2.addEventListener("transitionend", fireCallBack);
  }
}
function elementOuterSize(el2, size, includeMargins) {
  const window2 = getWindow();
  if (includeMargins) {
    return el2[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window2.getComputedStyle(el2, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window2.getComputedStyle(el2, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
  }
  return el2.offsetWidth;
}
let support;
function calcSupport() {
  const window2 = getWindow();
  const document2 = getDocument();
  return {
    smoothScroll: document2.documentElement && "scrollBehavior" in document2.documentElement.style,
    touch: !!("ontouchstart" in window2 || window2.DocumentTouch && document2 instanceof window2.DocumentTouch)
  };
}
function getSupport() {
  if (!support) {
    support = calcSupport();
  }
  return support;
}
let deviceCached;
function calcDevice({
  userAgent
} = {}) {
  const support2 = getSupport();
  const window2 = getWindow();
  const platform = window2.navigator.platform;
  const ua = userAgent || window2.navigator.userAgent;
  const device = {
    ios: false,
    android: false
  };
  const screenWidth = window2.screen.width;
  const screenHeight = window2.screen.height;
  const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  const windows = platform === "Win32";
  let macos = platform === "MacIntel";
  const iPadScreens = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  if (!ipad && macos && support2.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
    ipad = ua.match(/(Version)\/([\d.]+)/);
    if (!ipad)
      ipad = [0, 1, "13_0_0"];
    macos = false;
  }
  if (android && !windows) {
    device.os = "android";
    device.android = true;
  }
  if (ipad || iphone || ipod) {
    device.os = "ios";
    device.ios = true;
  }
  return device;
}
function getDevice(overrides = {}) {
  if (!deviceCached) {
    deviceCached = calcDevice(overrides);
  }
  return deviceCached;
}
let browser;
function calcBrowser() {
  const window2 = getWindow();
  let needPerspectiveFix = false;
  function isSafari() {
    const ua = window2.navigator.userAgent.toLowerCase();
    return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
  }
  if (isSafari()) {
    const ua = String(window2.navigator.userAgent);
    if (ua.includes("Version/")) {
      const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num) => Number(num));
      needPerspectiveFix = major < 16 || major === 16 && minor < 2;
    }
  }
  return {
    isSafari: needPerspectiveFix || isSafari(),
    needPerspectiveFix,
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window2.navigator.userAgent)
  };
}
function getBrowser() {
  if (!browser) {
    browser = calcBrowser();
  }
  return browser;
}
function Resize({
  swiper,
  on,
  emit
}) {
  const window2 = getWindow();
  let observer = null;
  let animationFrame = null;
  const resizeHandler = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized)
      return;
    emit("beforeResize");
    emit("resize");
  };
  const createObserver = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized)
      return;
    observer = new ResizeObserver((entries) => {
      animationFrame = window2.requestAnimationFrame(() => {
        const {
          width,
          height
        } = swiper;
        let newWidth = width;
        let newHeight = height;
        entries.forEach(({
          contentBoxSize,
          contentRect,
          target
        }) => {
          if (target && target !== swiper.el)
            return;
          newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
          newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
        });
        if (newWidth !== width || newHeight !== height) {
          resizeHandler();
        }
      });
    });
    observer.observe(swiper.el);
  };
  const removeObserver = () => {
    if (animationFrame) {
      window2.cancelAnimationFrame(animationFrame);
    }
    if (observer && observer.unobserve && swiper.el) {
      observer.unobserve(swiper.el);
      observer = null;
    }
  };
  const orientationChangeHandler = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized)
      return;
    emit("orientationchange");
  };
  on("init", () => {
    if (swiper.params.resizeObserver && typeof window2.ResizeObserver !== "undefined") {
      createObserver();
      return;
    }
    window2.addEventListener("resize", resizeHandler);
    window2.addEventListener("orientationchange", orientationChangeHandler);
  });
  on("destroy", () => {
    removeObserver();
    window2.removeEventListener("resize", resizeHandler);
    window2.removeEventListener("orientationchange", orientationChangeHandler);
  });
}
function Observer({
  swiper,
  extendParams,
  on,
  emit
}) {
  const observers = [];
  const window2 = getWindow();
  const attach = (target, options = {}) => {
    const ObserverFunc = window2.MutationObserver || window2.WebkitMutationObserver;
    const observer = new ObserverFunc((mutations) => {
      if (swiper.__preventObserver__)
        return;
      if (mutations.length === 1) {
        emit("observerUpdate", mutations[0]);
        return;
      }
      const observerUpdate = function observerUpdate2() {
        emit("observerUpdate", mutations[0]);
      };
      if (window2.requestAnimationFrame) {
        window2.requestAnimationFrame(observerUpdate);
      } else {
        window2.setTimeout(observerUpdate, 0);
      }
    });
    observer.observe(target, {
      attributes: typeof options.attributes === "undefined" ? true : options.attributes,
      childList: typeof options.childList === "undefined" ? true : options.childList,
      characterData: typeof options.characterData === "undefined" ? true : options.characterData
    });
    observers.push(observer);
  };
  const init = () => {
    if (!swiper.params.observer)
      return;
    if (swiper.params.observeParents) {
      const containerParents = elementParents(swiper.el);
      for (let i2 = 0; i2 < containerParents.length; i2 += 1) {
        attach(containerParents[i2]);
      }
    }
    attach(swiper.el, {
      childList: swiper.params.observeSlideChildren
    });
    attach(swiper.wrapperEl, {
      attributes: false
    });
  };
  const destroy = () => {
    observers.forEach((observer) => {
      observer.disconnect();
    });
    observers.splice(0, observers.length);
  };
  extendParams({
    observer: false,
    observeParents: false,
    observeSlideChildren: false
  });
  on("init", init);
  on("destroy", destroy);
}
const eventsEmitter = {
  on(events2, handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (typeof handler !== "function")
      return self;
    const method = priority ? "unshift" : "push";
    events2.split(" ").forEach((event) => {
      if (!self.eventsListeners[event])
        self.eventsListeners[event] = [];
      self.eventsListeners[event][method](handler);
    });
    return self;
  },
  once(events2, handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (typeof handler !== "function")
      return self;
    function onceHandler(...args) {
      self.off(events2, onceHandler);
      if (onceHandler.__emitterProxy) {
        delete onceHandler.__emitterProxy;
      }
      handler.apply(self, args);
    }
    onceHandler.__emitterProxy = handler;
    return self.on(events2, onceHandler, priority);
  },
  onAny(handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (typeof handler !== "function")
      return self;
    const method = priority ? "unshift" : "push";
    if (self.eventsAnyListeners.indexOf(handler) < 0) {
      self.eventsAnyListeners[method](handler);
    }
    return self;
  },
  offAny(handler) {
    const self = this;
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (!self.eventsAnyListeners)
      return self;
    const index = self.eventsAnyListeners.indexOf(handler);
    if (index >= 0) {
      self.eventsAnyListeners.splice(index, 1);
    }
    return self;
  },
  off(events2, handler) {
    const self = this;
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (!self.eventsListeners)
      return self;
    events2.split(" ").forEach((event) => {
      if (typeof handler === "undefined") {
        self.eventsListeners[event] = [];
      } else if (self.eventsListeners[event]) {
        self.eventsListeners[event].forEach((eventHandler, index) => {
          if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
            self.eventsListeners[event].splice(index, 1);
          }
        });
      }
    });
    return self;
  },
  emit(...args) {
    const self = this;
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (!self.eventsListeners)
      return self;
    let events2;
    let data;
    let context;
    if (typeof args[0] === "string" || Array.isArray(args[0])) {
      events2 = args[0];
      data = args.slice(1, args.length);
      context = self;
    } else {
      events2 = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
    }
    data.unshift(context);
    const eventsArray = Array.isArray(events2) ? events2 : events2.split(" ");
    eventsArray.forEach((event) => {
      if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
        self.eventsAnyListeners.forEach((eventHandler) => {
          eventHandler.apply(context, [event, ...data]);
        });
      }
      if (self.eventsListeners && self.eventsListeners[event]) {
        self.eventsListeners[event].forEach((eventHandler) => {
          eventHandler.apply(context, data);
        });
      }
    });
    return self;
  }
};
function updateSize() {
  const swiper = this;
  let width;
  let height;
  const el2 = swiper.el;
  if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) {
    width = swiper.params.width;
  } else {
    width = el2.clientWidth;
  }
  if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) {
    height = swiper.params.height;
  } else {
    height = el2.clientHeight;
  }
  if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
    return;
  }
  width = width - parseInt(elementStyle(el2, "padding-left") || 0, 10) - parseInt(elementStyle(el2, "padding-right") || 0, 10);
  height = height - parseInt(elementStyle(el2, "padding-top") || 0, 10) - parseInt(elementStyle(el2, "padding-bottom") || 0, 10);
  if (Number.isNaN(width))
    width = 0;
  if (Number.isNaN(height))
    height = 0;
  Object.assign(swiper, {
    width,
    height,
    size: swiper.isHorizontal() ? width : height
  });
}
function updateSlides() {
  const swiper = this;
  function getDirectionLabel(property) {
    if (swiper.isHorizontal()) {
      return property;
    }
    return {
      "width": "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      "marginRight": "marginBottom"
    }[property];
  }
  function getDirectionPropertyValue(node, label) {
    return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
  }
  const params = swiper.params;
  const {
    wrapperEl,
    slidesEl,
    size: swiperSize,
    rtlTranslate: rtl,
    wrongRTL
  } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
  const slides = elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
  const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
  let snapGrid = [];
  const slidesGrid = [];
  const slidesSizesGrid = [];
  let offsetBefore = params.slidesOffsetBefore;
  if (typeof offsetBefore === "function") {
    offsetBefore = params.slidesOffsetBefore.call(swiper);
  }
  let offsetAfter = params.slidesOffsetAfter;
  if (typeof offsetAfter === "function") {
    offsetAfter = params.slidesOffsetAfter.call(swiper);
  }
  const previousSnapGridLength = swiper.snapGrid.length;
  const previousSlidesGridLength = swiper.slidesGrid.length;
  let spaceBetween = params.spaceBetween;
  let slidePosition = -offsetBefore;
  let prevSlideSize = 0;
  let index = 0;
  if (typeof swiperSize === "undefined") {
    return;
  }
  if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
  }
  swiper.virtualSize = -spaceBetween;
  slides.forEach((slideEl) => {
    if (rtl) {
      slideEl.style.marginLeft = "";
    } else {
      slideEl.style.marginRight = "";
    }
    slideEl.style.marginBottom = "";
    slideEl.style.marginTop = "";
  });
  if (params.centeredSlides && params.cssMode) {
    setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
    setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
  }
  const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
  if (gridEnabled) {
    swiper.grid.initSlides(slidesLength);
  }
  let slideSize;
  const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key) => {
    return typeof params.breakpoints[key].slidesPerView !== "undefined";
  }).length > 0;
  for (let i2 = 0; i2 < slidesLength; i2 += 1) {
    slideSize = 0;
    let slide2;
    if (slides[i2])
      slide2 = slides[i2];
    if (gridEnabled) {
      swiper.grid.updateSlide(i2, slide2, slidesLength, getDirectionLabel);
    }
    if (slides[i2] && elementStyle(slide2, "display") === "none")
      continue;
    if (params.slidesPerView === "auto") {
      if (shouldResetSlideSize) {
        slides[i2].style[getDirectionLabel("width")] = ``;
      }
      const slideStyles = getComputedStyle(slide2);
      const currentTransform = slide2.style.transform;
      const currentWebKitTransform = slide2.style.webkitTransform;
      if (currentTransform) {
        slide2.style.transform = "none";
      }
      if (currentWebKitTransform) {
        slide2.style.webkitTransform = "none";
      }
      if (params.roundLengths) {
        slideSize = swiper.isHorizontal() ? elementOuterSize(slide2, "width", true) : elementOuterSize(slide2, "height", true);
      } else {
        const width = getDirectionPropertyValue(slideStyles, "width");
        const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
        const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
        const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
        const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
        const boxSizing = slideStyles.getPropertyValue("box-sizing");
        if (boxSizing && boxSizing === "border-box") {
          slideSize = width + marginLeft + marginRight;
        } else {
          const {
            clientWidth,
            offsetWidth
          } = slide2;
          slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
        }
      }
      if (currentTransform) {
        slide2.style.transform = currentTransform;
      }
      if (currentWebKitTransform) {
        slide2.style.webkitTransform = currentWebKitTransform;
      }
      if (params.roundLengths)
        slideSize = Math.floor(slideSize);
    } else {
      slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
      if (params.roundLengths)
        slideSize = Math.floor(slideSize);
      if (slides[i2]) {
        slides[i2].style[getDirectionLabel("width")] = `${slideSize}px`;
      }
    }
    if (slides[i2]) {
      slides[i2].swiperSlideSize = slideSize;
    }
    slidesSizesGrid.push(slideSize);
    if (params.centeredSlides) {
      slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
      if (prevSlideSize === 0 && i2 !== 0)
        slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (i2 === 0)
        slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (Math.abs(slidePosition) < 1 / 1e3)
        slidePosition = 0;
      if (params.roundLengths)
        slidePosition = Math.floor(slidePosition);
      if (index % params.slidesPerGroup === 0)
        snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
    } else {
      if (params.roundLengths)
        slidePosition = Math.floor(slidePosition);
      if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0)
        snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
      slidePosition = slidePosition + slideSize + spaceBetween;
    }
    swiper.virtualSize += slideSize + spaceBetween;
    prevSlideSize = slideSize;
    index += 1;
  }
  swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
  if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) {
    wrapperEl.style.width = `${swiper.virtualSize + params.spaceBetween}px`;
  }
  if (params.setWrapperSize) {
    wrapperEl.style[getDirectionLabel("width")] = `${swiper.virtualSize + params.spaceBetween}px`;
  }
  if (gridEnabled) {
    swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
  }
  if (!params.centeredSlides) {
    const newSlidesGrid = [];
    for (let i2 = 0; i2 < snapGrid.length; i2 += 1) {
      let slidesGridItem = snapGrid[i2];
      if (params.roundLengths)
        slidesGridItem = Math.floor(slidesGridItem);
      if (snapGrid[i2] <= swiper.virtualSize - swiperSize) {
        newSlidesGrid.push(slidesGridItem);
      }
    }
    snapGrid = newSlidesGrid;
    if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
      snapGrid.push(swiper.virtualSize - swiperSize);
    }
  }
  if (isVirtual && params.loop) {
    const size = slidesSizesGrid[0] + spaceBetween;
    if (params.slidesPerGroup > 1) {
      const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
      const groupSize = size * params.slidesPerGroup;
      for (let i2 = 0; i2 < groups; i2 += 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
      }
    }
    for (let i2 = 0; i2 < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i2 += 1) {
      if (params.slidesPerGroup === 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + size);
      }
      slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
      swiper.virtualSize += size;
    }
  }
  if (snapGrid.length === 0)
    snapGrid = [0];
  if (params.spaceBetween !== 0) {
    const key = swiper.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
    slides.filter((_, slideIndex) => {
      if (!params.cssMode || params.loop)
        return true;
      if (slideIndex === slides.length - 1) {
        return false;
      }
      return true;
    }).forEach((slideEl) => {
      slideEl.style[key] = `${spaceBetween}px`;
    });
  }
  if (params.centeredSlides && params.centeredSlidesBounds) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach((slideSizeValue) => {
      allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
    });
    allSlidesSize -= params.spaceBetween;
    const maxSnap = allSlidesSize - swiperSize;
    snapGrid = snapGrid.map((snap) => {
      if (snap < 0)
        return -offsetBefore;
      if (snap > maxSnap)
        return maxSnap + offsetAfter;
      return snap;
    });
  }
  if (params.centerInsufficientSlides) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach((slideSizeValue) => {
      allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
    });
    allSlidesSize -= params.spaceBetween;
    if (allSlidesSize < swiperSize) {
      const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
      snapGrid.forEach((snap, snapIndex) => {
        snapGrid[snapIndex] = snap - allSlidesOffset;
      });
      slidesGrid.forEach((snap, snapIndex) => {
        slidesGrid[snapIndex] = snap + allSlidesOffset;
      });
    }
  }
  Object.assign(swiper, {
    slides,
    snapGrid,
    slidesGrid,
    slidesSizesGrid
  });
  if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
    setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
    setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
    const addToSnapGrid = -swiper.snapGrid[0];
    const addToSlidesGrid = -swiper.slidesGrid[0];
    swiper.snapGrid = swiper.snapGrid.map((v) => v + addToSnapGrid);
    swiper.slidesGrid = swiper.slidesGrid.map((v) => v + addToSlidesGrid);
  }
  if (slidesLength !== previousSlidesLength) {
    swiper.emit("slidesLengthChange");
  }
  if (snapGrid.length !== previousSnapGridLength) {
    if (swiper.params.watchOverflow)
      swiper.checkOverflow();
    swiper.emit("snapGridLengthChange");
  }
  if (slidesGrid.length !== previousSlidesGridLength) {
    swiper.emit("slidesGridLengthChange");
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
    const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
    const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
    if (slidesLength <= params.maxBackfaceHiddenSlides) {
      if (!hasClassBackfaceClassAdded)
        swiper.el.classList.add(backFaceHiddenClass);
    } else if (hasClassBackfaceClassAdded) {
      swiper.el.classList.remove(backFaceHiddenClass);
    }
  }
}
function updateAutoHeight(speed) {
  const swiper = this;
  const activeSlides = [];
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  let newHeight = 0;
  let i2;
  if (typeof speed === "number") {
    swiper.setTransition(speed);
  } else if (speed === true) {
    swiper.setTransition(swiper.params.speed);
  }
  const getSlideByIndex = (index) => {
    if (isVirtual) {
      return swiper.getSlideIndexByData(index);
    }
    return swiper.slides[index];
  };
  if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) {
    if (swiper.params.centeredSlides) {
      (swiper.visibleSlides || []).forEach((slide2) => {
        activeSlides.push(slide2);
      });
    } else {
      for (i2 = 0; i2 < Math.ceil(swiper.params.slidesPerView); i2 += 1) {
        const index = swiper.activeIndex + i2;
        if (index > swiper.slides.length && !isVirtual)
          break;
        activeSlides.push(getSlideByIndex(index));
      }
    }
  } else {
    activeSlides.push(getSlideByIndex(swiper.activeIndex));
  }
  for (i2 = 0; i2 < activeSlides.length; i2 += 1) {
    if (typeof activeSlides[i2] !== "undefined") {
      const height = activeSlides[i2].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  }
  if (newHeight || newHeight === 0)
    swiper.wrapperEl.style.height = `${newHeight}px`;
}
function updateSlidesOffset() {
  const swiper = this;
  const slides = swiper.slides;
  const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
  for (let i2 = 0; i2 < slides.length; i2 += 1) {
    slides[i2].swiperSlideOffset = (swiper.isHorizontal() ? slides[i2].offsetLeft : slides[i2].offsetTop) - minusOffset;
  }
}
function updateSlidesProgress(translate2 = this && this.translate || 0) {
  const swiper = this;
  const params = swiper.params;
  const {
    slides,
    rtlTranslate: rtl,
    snapGrid
  } = swiper;
  if (slides.length === 0)
    return;
  if (typeof slides[0].swiperSlideOffset === "undefined")
    swiper.updateSlidesOffset();
  let offsetCenter = -translate2;
  if (rtl)
    offsetCenter = translate2;
  slides.forEach((slideEl) => {
    slideEl.classList.remove(params.slideVisibleClass);
  });
  swiper.visibleSlidesIndexes = [];
  swiper.visibleSlides = [];
  for (let i2 = 0; i2 < slides.length; i2 += 1) {
    const slide2 = slides[i2];
    let slideOffset = slide2.swiperSlideOffset;
    if (params.cssMode && params.centeredSlides) {
      slideOffset -= slides[0].swiperSlideOffset;
    }
    const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + params.spaceBetween);
    const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + params.spaceBetween);
    const slideBefore = -(offsetCenter - slideOffset);
    const slideAfter = slideBefore + swiper.slidesSizesGrid[i2];
    const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
    if (isVisible) {
      swiper.visibleSlides.push(slide2);
      swiper.visibleSlidesIndexes.push(i2);
      slides[i2].classList.add(params.slideVisibleClass);
    }
    slide2.progress = rtl ? -slideProgress : slideProgress;
    slide2.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
  }
}
function updateProgress(translate2) {
  const swiper = this;
  if (typeof translate2 === "undefined") {
    const multiplier = swiper.rtlTranslate ? -1 : 1;
    translate2 = swiper && swiper.translate && swiper.translate * multiplier || 0;
  }
  const params = swiper.params;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  let {
    progress,
    isBeginning,
    isEnd,
    progressLoop
  } = swiper;
  const wasBeginning = isBeginning;
  const wasEnd = isEnd;
  if (translatesDiff === 0) {
    progress = 0;
    isBeginning = true;
    isEnd = true;
  } else {
    progress = (translate2 - swiper.minTranslate()) / translatesDiff;
    const isBeginningRounded = Math.abs(translate2 - swiper.minTranslate()) < 1;
    const isEndRounded = Math.abs(translate2 - swiper.maxTranslate()) < 1;
    isBeginning = isBeginningRounded || progress <= 0;
    isEnd = isEndRounded || progress >= 1;
    if (isBeginningRounded)
      progress = 0;
    if (isEndRounded)
      progress = 1;
  }
  if (params.loop) {
    const firstSlideIndex = swiper.getSlideIndexByData(0);
    const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
    const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
    const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
    const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
    const translateAbs = Math.abs(translate2);
    if (translateAbs >= firstSlideTranslate) {
      progressLoop = (translateAbs - firstSlideTranslate) / translateMax;
    } else {
      progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
    }
    if (progressLoop > 1)
      progressLoop -= 1;
  }
  Object.assign(swiper, {
    progress,
    progressLoop,
    isBeginning,
    isEnd
  });
  if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight)
    swiper.updateSlidesProgress(translate2);
  if (isBeginning && !wasBeginning) {
    swiper.emit("reachBeginning toEdge");
  }
  if (isEnd && !wasEnd) {
    swiper.emit("reachEnd toEdge");
  }
  if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
    swiper.emit("fromEdge");
  }
  swiper.emit("progress", progress);
}
function updateSlidesClasses() {
  const swiper = this;
  const {
    slides,
    params,
    slidesEl,
    activeIndex
  } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  const getFilteredSlide = (selector) => {
    return elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
  };
  slides.forEach((slideEl) => {
    slideEl.classList.remove(params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
  });
  let activeSlide;
  if (isVirtual) {
    if (params.loop) {
      let slideIndex = activeIndex - swiper.virtual.slidesBefore;
      if (slideIndex < 0)
        slideIndex = swiper.virtual.slides.length + slideIndex;
      if (slideIndex >= swiper.virtual.slides.length)
        slideIndex -= swiper.virtual.slides.length;
      activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
    } else {
      activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`);
    }
  } else {
    activeSlide = slides[activeIndex];
  }
  if (activeSlide) {
    activeSlide.classList.add(params.slideActiveClass);
    let nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
    if (params.loop && !nextSlide) {
      nextSlide = slides[0];
    }
    if (nextSlide) {
      nextSlide.classList.add(params.slideNextClass);
    }
    let prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
    if (params.loop && !prevSlide === 0) {
      prevSlide = slides[slides.length - 1];
    }
    if (prevSlide) {
      prevSlide.classList.add(params.slidePrevClass);
    }
  }
  swiper.emitSlidesClasses();
}
function getActiveIndexByTranslate(swiper) {
  const {
    slidesGrid,
    params
  } = swiper;
  const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  let activeIndex;
  for (let i2 = 0; i2 < slidesGrid.length; i2 += 1) {
    if (typeof slidesGrid[i2 + 1] !== "undefined") {
      if (translate2 >= slidesGrid[i2] && translate2 < slidesGrid[i2 + 1] - (slidesGrid[i2 + 1] - slidesGrid[i2]) / 2) {
        activeIndex = i2;
      } else if (translate2 >= slidesGrid[i2] && translate2 < slidesGrid[i2 + 1]) {
        activeIndex = i2 + 1;
      }
    } else if (translate2 >= slidesGrid[i2]) {
      activeIndex = i2;
    }
  }
  if (params.normalizeSlideIndex) {
    if (activeIndex < 0 || typeof activeIndex === "undefined")
      activeIndex = 0;
  }
  return activeIndex;
}
function updateActiveIndex(newActiveIndex) {
  const swiper = this;
  const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  const {
    snapGrid,
    params,
    activeIndex: previousIndex,
    realIndex: previousRealIndex,
    snapIndex: previousSnapIndex
  } = swiper;
  let activeIndex = newActiveIndex;
  let snapIndex;
  const getVirtualRealIndex = (aIndex) => {
    let realIndex2 = aIndex - swiper.virtual.slidesBefore;
    if (realIndex2 < 0) {
      realIndex2 = swiper.virtual.slides.length + realIndex2;
    }
    if (realIndex2 >= swiper.virtual.slides.length) {
      realIndex2 -= swiper.virtual.slides.length;
    }
    return realIndex2;
  };
  if (typeof activeIndex === "undefined") {
    activeIndex = getActiveIndexByTranslate(swiper);
  }
  if (snapGrid.indexOf(translate2) >= 0) {
    snapIndex = snapGrid.indexOf(translate2);
  } else {
    const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
    snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
  }
  if (snapIndex >= snapGrid.length)
    snapIndex = snapGrid.length - 1;
  if (activeIndex === previousIndex) {
    if (snapIndex !== previousSnapIndex) {
      swiper.snapIndex = snapIndex;
      swiper.emit("snapIndexChange");
    }
    if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
      swiper.realIndex = getVirtualRealIndex(activeIndex);
    }
    return;
  }
  let realIndex;
  if (swiper.virtual && params.virtual.enabled && params.loop) {
    realIndex = getVirtualRealIndex(activeIndex);
  } else if (swiper.slides[activeIndex]) {
    realIndex = parseInt(swiper.slides[activeIndex].getAttribute("data-swiper-slide-index") || activeIndex, 10);
  } else {
    realIndex = activeIndex;
  }
  Object.assign(swiper, {
    snapIndex,
    realIndex,
    previousIndex,
    activeIndex
  });
  swiper.emit("activeIndexChange");
  swiper.emit("snapIndexChange");
  if (previousRealIndex !== realIndex) {
    swiper.emit("realIndexChange");
  }
  if (swiper.initialized || swiper.params.runCallbacksOnInit) {
    swiper.emit("slideChange");
  }
}
function updateClickedSlide(e2) {
  const swiper = this;
  const params = swiper.params;
  const slide2 = e2.closest(`.${params.slideClass}, swiper-slide`);
  let slideFound = false;
  let slideIndex;
  if (slide2) {
    for (let i2 = 0; i2 < swiper.slides.length; i2 += 1) {
      if (swiper.slides[i2] === slide2) {
        slideFound = true;
        slideIndex = i2;
        break;
      }
    }
  }
  if (slide2 && slideFound) {
    swiper.clickedSlide = slide2;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      swiper.clickedIndex = parseInt(slide2.getAttribute("data-swiper-slide-index"), 10);
    } else {
      swiper.clickedIndex = slideIndex;
    }
  } else {
    swiper.clickedSlide = void 0;
    swiper.clickedIndex = void 0;
    return;
  }
  if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) {
    swiper.slideToClickedSlide();
  }
}
const update = {
  updateSize,
  updateSlides,
  updateAutoHeight,
  updateSlidesOffset,
  updateSlidesProgress,
  updateProgress,
  updateSlidesClasses,
  updateActiveIndex,
  updateClickedSlide
};
function getSwiperTranslate(axis = this.isHorizontal() ? "x" : "y") {
  const swiper = this;
  const {
    params,
    rtlTranslate: rtl,
    translate: translate2,
    wrapperEl
  } = swiper;
  if (params.virtualTranslate) {
    return rtl ? -translate2 : translate2;
  }
  if (params.cssMode) {
    return translate2;
  }
  let currentTranslate = getTranslate(wrapperEl, axis);
  if (rtl)
    currentTranslate = -currentTranslate;
  return currentTranslate || 0;
}
function setTranslate(translate2, byController) {
  const swiper = this;
  const {
    rtlTranslate: rtl,
    params,
    wrapperEl,
    progress
  } = swiper;
  let x2 = 0;
  let y3 = 0;
  const z2 = 0;
  if (swiper.isHorizontal()) {
    x2 = rtl ? -translate2 : translate2;
  } else {
    y3 = translate2;
  }
  if (params.roundLengths) {
    x2 = Math.floor(x2);
    y3 = Math.floor(y3);
  }
  if (params.cssMode) {
    wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x2 : -y3;
  } else if (!params.virtualTranslate) {
    wrapperEl.style.transform = `translate3d(${x2}px, ${y3}px, ${z2}px)`;
  }
  swiper.previousTranslate = swiper.translate;
  swiper.translate = swiper.isHorizontal() ? x2 : y3;
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate2 - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== progress) {
    swiper.updateProgress(translate2);
  }
  swiper.emit("setTranslate", swiper.translate, byController);
}
function minTranslate() {
  return -this.snapGrid[0];
}
function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function translateTo(translate2 = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
  const swiper = this;
  const {
    params,
    wrapperEl
  } = swiper;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }
  const minTranslate2 = swiper.minTranslate();
  const maxTranslate2 = swiper.maxTranslate();
  let newTranslate;
  if (translateBounds && translate2 > minTranslate2)
    newTranslate = minTranslate2;
  else if (translateBounds && translate2 < maxTranslate2)
    newTranslate = maxTranslate2;
  else
    newTranslate = translate2;
  swiper.updateProgress(newTranslate);
  if (params.cssMode) {
    const isH = swiper.isHorizontal();
    if (speed === 0) {
      wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
    } else {
      if (!swiper.support.smoothScroll) {
        animateCSSModeScroll({
          swiper,
          targetPosition: -newTranslate,
          side: isH ? "left" : "top"
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? "left" : "top"]: -newTranslate,
        behavior: "smooth"
      });
    }
    return true;
  }
  if (speed === 0) {
    swiper.setTransition(0);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit("beforeTransitionStart", speed, internal);
      swiper.emit("transitionEnd");
    }
  } else {
    swiper.setTransition(speed);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit("beforeTransitionStart", speed, internal);
      swiper.emit("transitionStart");
    }
    if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onTranslateToWrapperTransitionEnd) {
        swiper.onTranslateToWrapperTransitionEnd = function transitionEnd2(e2) {
          if (!swiper || swiper.destroyed)
            return;
          if (e2.target !== this)
            return;
          swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
          swiper.onTranslateToWrapperTransitionEnd = null;
          delete swiper.onTranslateToWrapperTransitionEnd;
          if (runCallbacks) {
            swiper.emit("transitionEnd");
          }
        };
      }
      swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
    }
  }
  return true;
}
const translate = {
  getTranslate: getSwiperTranslate,
  setTranslate,
  minTranslate,
  maxTranslate,
  translateTo
};
function setTransition(duration, byController) {
  const swiper = this;
  if (!swiper.params.cssMode) {
    swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
  }
  swiper.emit("setTransition", duration, byController);
}
function transitionEmit({
  swiper,
  runCallbacks,
  direction,
  step
}) {
  const {
    activeIndex,
    previousIndex
  } = swiper;
  let dir = direction;
  if (!dir) {
    if (activeIndex > previousIndex)
      dir = "next";
    else if (activeIndex < previousIndex)
      dir = "prev";
    else
      dir = "reset";
  }
  swiper.emit(`transition${step}`);
  if (runCallbacks && activeIndex !== previousIndex) {
    if (dir === "reset") {
      swiper.emit(`slideResetTransition${step}`);
      return;
    }
    swiper.emit(`slideChangeTransition${step}`);
    if (dir === "next") {
      swiper.emit(`slideNextTransition${step}`);
    } else {
      swiper.emit(`slidePrevTransition${step}`);
    }
  }
}
function transitionStart(runCallbacks = true, direction) {
  const swiper = this;
  const {
    params
  } = swiper;
  if (params.cssMode)
    return;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }
  transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: "Start"
  });
}
function transitionEnd(runCallbacks = true, direction) {
  const swiper = this;
  const {
    params
  } = swiper;
  swiper.animating = false;
  if (params.cssMode)
    return;
  swiper.setTransition(0);
  transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: "End"
  });
}
const transition = {
  setTransition,
  transitionStart,
  transitionEnd
};
function slideTo(index = 0, speed = this.params.speed, runCallbacks = true, internal, initial) {
  if (typeof index === "string") {
    index = parseInt(index, 10);
  }
  const swiper = this;
  let slideIndex = index;
  if (slideIndex < 0)
    slideIndex = 0;
  const {
    params,
    snapGrid,
    slidesGrid,
    previousIndex,
    activeIndex,
    rtlTranslate: rtl,
    wrapperEl,
    enabled
  } = swiper;
  if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {
    return false;
  }
  const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
  let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
  if (snapIndex >= snapGrid.length)
    snapIndex = snapGrid.length - 1;
  const translate2 = -snapGrid[snapIndex];
  if (params.normalizeSlideIndex) {
    for (let i2 = 0; i2 < slidesGrid.length; i2 += 1) {
      const normalizedTranslate = -Math.floor(translate2 * 100);
      const normalizedGrid = Math.floor(slidesGrid[i2] * 100);
      const normalizedGridNext = Math.floor(slidesGrid[i2 + 1] * 100);
      if (typeof slidesGrid[i2 + 1] !== "undefined") {
        if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
          slideIndex = i2;
        } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
          slideIndex = i2 + 1;
        }
      } else if (normalizedTranslate >= normalizedGrid) {
        slideIndex = i2;
      }
    }
  }
  if (swiper.initialized && slideIndex !== activeIndex) {
    if (!swiper.allowSlideNext && translate2 < swiper.translate && translate2 < swiper.minTranslate()) {
      return false;
    }
    if (!swiper.allowSlidePrev && translate2 > swiper.translate && translate2 > swiper.maxTranslate()) {
      if ((activeIndex || 0) !== slideIndex) {
        return false;
      }
    }
  }
  if (slideIndex !== (previousIndex || 0) && runCallbacks) {
    swiper.emit("beforeSlideChangeStart");
  }
  swiper.updateProgress(translate2);
  let direction;
  if (slideIndex > activeIndex)
    direction = "next";
  else if (slideIndex < activeIndex)
    direction = "prev";
  else
    direction = "reset";
  if (rtl && -translate2 === swiper.translate || !rtl && translate2 === swiper.translate) {
    swiper.updateActiveIndex(slideIndex);
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    swiper.updateSlidesClasses();
    if (params.effect !== "slide") {
      swiper.setTranslate(translate2);
    }
    if (direction !== "reset") {
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    }
    return false;
  }
  if (params.cssMode) {
    const isH = swiper.isHorizontal();
    const t2 = rtl ? translate2 : -translate2;
    if (speed === 0) {
      const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      if (isVirtual) {
        swiper.wrapperEl.style.scrollSnapType = "none";
        swiper._immediateVirtual = true;
      }
      if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
        swiper._cssModeVirtualInitialSet = true;
        requestAnimationFrame(() => {
          wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t2;
        });
      } else {
        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t2;
      }
      if (isVirtual) {
        requestAnimationFrame(() => {
          swiper.wrapperEl.style.scrollSnapType = "";
          swiper._immediateVirtual = false;
        });
      }
    } else {
      if (!swiper.support.smoothScroll) {
        animateCSSModeScroll({
          swiper,
          targetPosition: t2,
          side: isH ? "left" : "top"
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? "left" : "top"]: t2,
        behavior: "smooth"
      });
    }
    return true;
  }
  swiper.setTransition(speed);
  swiper.setTranslate(translate2);
  swiper.updateActiveIndex(slideIndex);
  swiper.updateSlidesClasses();
  swiper.emit("beforeTransitionStart", speed, internal);
  swiper.transitionStart(runCallbacks, direction);
  if (speed === 0) {
    swiper.transitionEnd(runCallbacks, direction);
  } else if (!swiper.animating) {
    swiper.animating = true;
    if (!swiper.onSlideToWrapperTransitionEnd) {
      swiper.onSlideToWrapperTransitionEnd = function transitionEnd2(e2) {
        if (!swiper || swiper.destroyed)
          return;
        if (e2.target !== this)
          return;
        swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
        swiper.onSlideToWrapperTransitionEnd = null;
        delete swiper.onSlideToWrapperTransitionEnd;
        swiper.transitionEnd(runCallbacks, direction);
      };
    }
    swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
  }
  return true;
}
function slideToLoop(index = 0, speed = this.params.speed, runCallbacks = true, internal) {
  if (typeof index === "string") {
    const indexAsNumber = parseInt(index, 10);
    index = indexAsNumber;
  }
  const swiper = this;
  let newIndex = index;
  if (swiper.params.loop) {
    if (swiper.virtual && swiper.params.virtual.enabled) {
      newIndex = newIndex + swiper.virtual.slidesBefore;
    } else {
      newIndex = swiper.getSlideIndexByData(newIndex);
    }
  }
  return swiper.slideTo(newIndex, speed, runCallbacks, internal);
}
function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
  const swiper = this;
  const {
    enabled,
    params,
    animating
  } = swiper;
  if (!enabled)
    return swiper;
  let perGroup = params.slidesPerGroup;
  if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
    perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
  }
  const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding)
      return false;
    swiper.loopFix({
      direction: "next"
    });
    swiper._clientLeft = swiper.wrapperEl.clientLeft;
  }
  if (params.rewind && swiper.isEnd) {
    return swiper.slideTo(0, speed, runCallbacks, internal);
  }
  return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
}
function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
  const swiper = this;
  const {
    params,
    snapGrid,
    slidesGrid,
    rtlTranslate,
    enabled,
    animating
  } = swiper;
  if (!enabled)
    return swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding)
      return false;
    swiper.loopFix({
      direction: "prev"
    });
    swiper._clientLeft = swiper.wrapperEl.clientLeft;
  }
  const translate2 = rtlTranslate ? swiper.translate : -swiper.translate;
  function normalize(val) {
    if (val < 0)
      return -Math.floor(Math.abs(val));
    return Math.floor(val);
  }
  const normalizedTranslate = normalize(translate2);
  const normalizedSnapGrid = snapGrid.map((val) => normalize(val));
  let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
  if (typeof prevSnap === "undefined" && params.cssMode) {
    let prevSnapIndex;
    snapGrid.forEach((snap, snapIndex) => {
      if (normalizedTranslate >= snap) {
        prevSnapIndex = snapIndex;
      }
    });
    if (typeof prevSnapIndex !== "undefined") {
      prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
    }
  }
  let prevIndex = 0;
  if (typeof prevSnap !== "undefined") {
    prevIndex = slidesGrid.indexOf(prevSnap);
    if (prevIndex < 0)
      prevIndex = swiper.activeIndex - 1;
    if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
      prevIndex = Math.max(prevIndex, 0);
    }
  }
  if (params.rewind && swiper.isBeginning) {
    const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
  }
  return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
}
function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
  const swiper = this;
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}
function slideToClosest(speed = this.params.speed, runCallbacks = true, internal, threshold = 0.5) {
  const swiper = this;
  let index = swiper.activeIndex;
  const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
  const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
  const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  if (translate2 >= swiper.snapGrid[snapIndex]) {
    const currentSnap = swiper.snapGrid[snapIndex];
    const nextSnap = swiper.snapGrid[snapIndex + 1];
    if (translate2 - currentSnap > (nextSnap - currentSnap) * threshold) {
      index += swiper.params.slidesPerGroup;
    }
  } else {
    const prevSnap = swiper.snapGrid[snapIndex - 1];
    const currentSnap = swiper.snapGrid[snapIndex];
    if (translate2 - prevSnap <= (currentSnap - prevSnap) * threshold) {
      index -= swiper.params.slidesPerGroup;
    }
  }
  index = Math.max(index, 0);
  index = Math.min(index, swiper.slidesGrid.length - 1);
  return swiper.slideTo(index, speed, runCallbacks, internal);
}
function slideToClickedSlide() {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  let slideToIndex = swiper.clickedIndex;
  let realIndex;
  const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
  if (params.loop) {
    if (swiper.animating)
      return;
    realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
    if (params.centeredSlides) {
      if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
        swiper.loopFix();
        slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
        nextTick(() => {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else if (slideToIndex > swiper.slides.length - slidesPerView) {
      swiper.loopFix();
      slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
      nextTick(() => {
        swiper.slideTo(slideToIndex);
      });
    } else {
      swiper.slideTo(slideToIndex);
    }
  } else {
    swiper.slideTo(slideToIndex);
  }
}
const slide = {
  slideTo,
  slideToLoop,
  slideNext,
  slidePrev,
  slideReset,
  slideToClosest,
  slideToClickedSlide
};
function loopCreate(slideRealIndex) {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  if (!params.loop || swiper.virtual && swiper.params.virtual.enabled)
    return;
  const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
  slides.forEach((el2, index) => {
    el2.setAttribute("data-swiper-slide-index", index);
  });
  swiper.loopFix({
    slideRealIndex,
    direction: params.centeredSlides ? void 0 : "next"
  });
}
function loopFix({
  slideRealIndex,
  slideTo: slideTo2 = true,
  direction,
  setTranslate: setTranslate2,
  activeSlideIndex,
  byController,
  byMousewheel
} = {}) {
  const swiper = this;
  if (!swiper.params.loop)
    return;
  swiper.emit("beforeLoopFix");
  const {
    slides,
    allowSlidePrev,
    allowSlideNext,
    slidesEl,
    params
  } = swiper;
  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;
  if (swiper.virtual && params.virtual.enabled) {
    if (slideTo2) {
      if (!params.centeredSlides && swiper.snapIndex === 0) {
        swiper.slideTo(swiper.virtual.slides.length, 0, false, true);
      } else if (params.centeredSlides && swiper.snapIndex < params.slidesPerView) {
        swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true);
      } else if (swiper.snapIndex === swiper.snapGrid.length - 1) {
        swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    swiper.emit("loopFix");
    return;
  }
  const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10));
  let loopedSlides = params.loopedSlides || slidesPerView;
  if (loopedSlides % params.slidesPerGroup !== 0) {
    loopedSlides += params.slidesPerGroup - loopedSlides % params.slidesPerGroup;
  }
  swiper.loopedSlides = loopedSlides;
  const prependSlidesIndexes = [];
  const appendSlidesIndexes = [];
  let activeIndex = swiper.activeIndex;
  if (typeof activeSlideIndex === "undefined") {
    activeSlideIndex = swiper.getSlideIndex(swiper.slides.filter((el2) => el2.classList.contains(params.slideActiveClass))[0]);
  } else {
    activeIndex = activeSlideIndex;
  }
  const isNext = direction === "next" || !direction;
  const isPrev = direction === "prev" || !direction;
  let slidesPrepended = 0;
  let slidesAppended = 0;
  if (activeSlideIndex < loopedSlides) {
    slidesPrepended = Math.max(loopedSlides - activeSlideIndex, params.slidesPerGroup);
    for (let i2 = 0; i2 < loopedSlides - activeSlideIndex; i2 += 1) {
      const index = i2 - Math.floor(i2 / slides.length) * slides.length;
      prependSlidesIndexes.push(slides.length - index - 1);
    }
  } else if (activeSlideIndex > swiper.slides.length - loopedSlides * 2) {
    slidesAppended = Math.max(activeSlideIndex - (swiper.slides.length - loopedSlides * 2), params.slidesPerGroup);
    for (let i2 = 0; i2 < slidesAppended; i2 += 1) {
      const index = i2 - Math.floor(i2 / slides.length) * slides.length;
      appendSlidesIndexes.push(index);
    }
  }
  if (isPrev) {
    prependSlidesIndexes.forEach((index) => {
      slidesEl.prepend(swiper.slides[index]);
    });
  }
  if (isNext) {
    appendSlidesIndexes.forEach((index) => {
      slidesEl.append(swiper.slides[index]);
    });
  }
  swiper.recalcSlides();
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  if (slideTo2) {
    if (prependSlidesIndexes.length > 0 && isPrev) {
      if (typeof slideRealIndex === "undefined") {
        const currentSlideTranslate = swiper.slidesGrid[activeIndex];
        const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
        const diff = newSlideTranslate - currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - diff);
        } else {
          swiper.slideTo(activeIndex + slidesPrepended, 0, false, true);
          if (setTranslate2) {
            swiper.touches[swiper.isHorizontal() ? "startX" : "startY"] += diff;
          }
        }
      } else {
        if (setTranslate2) {
          swiper.slideToLoop(slideRealIndex, 0, false, true);
        }
      }
    } else if (appendSlidesIndexes.length > 0 && isNext) {
      if (typeof slideRealIndex === "undefined") {
        const currentSlideTranslate = swiper.slidesGrid[activeIndex];
        const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
        const diff = newSlideTranslate - currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - diff);
        } else {
          swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
          if (setTranslate2) {
            swiper.touches[swiper.isHorizontal() ? "startX" : "startY"] += diff;
          }
        }
      } else {
        swiper.slideToLoop(slideRealIndex, 0, false, true);
      }
    }
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.controller && swiper.controller.control && !byController) {
    const loopParams = {
      slideRealIndex,
      slideTo: false,
      direction,
      setTranslate: setTranslate2,
      activeSlideIndex,
      byController: true
    };
    if (Array.isArray(swiper.controller.control)) {
      swiper.controller.control.forEach((c2) => {
        if (!c2.destroyed && c2.params.loop)
          c2.loopFix(loopParams);
      });
    } else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) {
      swiper.controller.control.loopFix(loopParams);
    }
  }
  swiper.emit("loopFix");
}
function loopDestroy() {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  if (!params.loop || swiper.virtual && swiper.params.virtual.enabled)
    return;
  swiper.recalcSlides();
  const newSlidesOrder = [];
  swiper.slides.forEach((slideEl) => {
    const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
    newSlidesOrder[index] = slideEl;
  });
  swiper.slides.forEach((slideEl) => {
    slideEl.removeAttribute("data-swiper-slide-index");
  });
  newSlidesOrder.forEach((slideEl) => {
    slidesEl.append(slideEl);
  });
  swiper.recalcSlides();
  swiper.slideTo(swiper.realIndex, 0);
}
const loop = {
  loopCreate,
  loopFix,
  loopDestroy
};
function setGrabCursor(moving) {
  const swiper = this;
  if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode)
    return;
  const el2 = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  el2.style.cursor = "move";
  el2.style.cursor = moving ? "grabbing" : "grab";
  if (swiper.isElement) {
    requestAnimationFrame(() => {
      swiper.__preventObserver__ = false;
    });
  }
}
function unsetGrabCursor() {
  const swiper = this;
  if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
    return;
  }
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
  if (swiper.isElement) {
    requestAnimationFrame(() => {
      swiper.__preventObserver__ = false;
    });
  }
}
const grabCursor = {
  setGrabCursor,
  unsetGrabCursor
};
function closestElement(selector, base = this) {
  function __closestFrom(el2) {
    if (!el2 || el2 === getDocument() || el2 === getWindow())
      return null;
    if (el2.assignedSlot)
      el2 = el2.assignedSlot;
    const found = el2.closest(selector);
    if (!found && !el2.getRootNode) {
      return null;
    }
    return found || __closestFrom(el2.getRootNode().host);
  }
  return __closestFrom(base);
}
function onTouchStart(event) {
  const swiper = this;
  const document2 = getDocument();
  const window2 = getWindow();
  const data = swiper.touchEventsData;
  data.evCache.push(event);
  const {
    params,
    touches,
    enabled
  } = swiper;
  if (!enabled)
    return;
  if (!params.simulateTouch && event.pointerType === "mouse")
    return;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return;
  }
  if (!swiper.animating && params.cssMode && params.loop) {
    swiper.loopFix();
  }
  let e2 = event;
  if (e2.originalEvent)
    e2 = e2.originalEvent;
  let targetEl = e2.target;
  if (params.touchEventsTarget === "wrapper") {
    if (!swiper.wrapperEl.contains(targetEl))
      return;
  }
  if ("which" in e2 && e2.which === 3)
    return;
  if ("button" in e2 && e2.button > 0)
    return;
  if (data.isTouched && data.isMoved)
    return;
  const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
  const eventPath = event.composedPath ? event.composedPath() : event.path;
  if (swipingClassHasValue && e2.target && e2.target.shadowRoot && eventPath) {
    targetEl = eventPath[0];
  }
  const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
  const isTargetShadow = !!(e2.target && e2.target.shadowRoot);
  if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
    swiper.allowClick = true;
    return;
  }
  if (params.swipeHandler) {
    if (!targetEl.closest(params.swipeHandler))
      return;
  }
  touches.currentX = e2.pageX;
  touches.currentY = e2.pageY;
  const startX = touches.currentX;
  const startY = touches.currentY;
  const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
  const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
  if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window2.innerWidth - edgeSwipeThreshold)) {
    if (edgeSwipeDetection === "prevent") {
      event.preventDefault();
    } else {
      return;
    }
  }
  Object.assign(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: void 0,
    startMoving: void 0
  });
  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = now();
  swiper.allowClick = true;
  swiper.updateSize();
  swiper.swipeDirection = void 0;
  if (params.threshold > 0)
    data.allowThresholdMove = false;
  let preventDefault = true;
  if (targetEl.matches(data.focusableElements)) {
    preventDefault = false;
    if (targetEl.nodeName === "SELECT") {
      data.isTouched = false;
    }
  }
  if (document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== targetEl) {
    document2.activeElement.blur();
  }
  const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
  if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) {
    e2.preventDefault();
  }
  if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
    swiper.freeMode.onTouchStart();
  }
  swiper.emit("touchStart", e2);
}
function onTouchMove(event) {
  const document2 = getDocument();
  const swiper = this;
  const data = swiper.touchEventsData;
  const {
    params,
    touches,
    rtlTranslate: rtl,
    enabled
  } = swiper;
  if (!enabled)
    return;
  if (!params.simulateTouch && event.pointerType === "mouse")
    return;
  let e2 = event;
  if (e2.originalEvent)
    e2 = e2.originalEvent;
  if (!data.isTouched) {
    if (data.startMoving && data.isScrolling) {
      swiper.emit("touchMoveOpposite", e2);
    }
    return;
  }
  const pointerIndex = data.evCache.findIndex((cachedEv) => cachedEv.pointerId === e2.pointerId);
  if (pointerIndex >= 0)
    data.evCache[pointerIndex] = e2;
  const targetTouch = data.evCache.length > 1 ? data.evCache[0] : e2;
  const pageX = targetTouch.pageX;
  const pageY = targetTouch.pageY;
  if (e2.preventedByNestedSwiper) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }
  if (!swiper.allowTouchMove) {
    if (!e2.target.matches(data.focusableElements)) {
      swiper.allowClick = false;
    }
    if (data.isTouched) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        prevX: swiper.touches.currentX,
        prevY: swiper.touches.currentY,
        currentX: pageX,
        currentY: pageY
      });
      data.touchStartTime = now();
    }
    return;
  }
  if (params.touchReleaseOnEdges && !params.loop) {
    if (swiper.isVertical()) {
      if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
        data.isTouched = false;
        data.isMoved = false;
        return;
      }
    } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
      return;
    }
  }
  if (document2.activeElement) {
    if (e2.target === document2.activeElement && e2.target.matches(data.focusableElements)) {
      data.isMoved = true;
      swiper.allowClick = false;
      return;
    }
  }
  if (data.allowTouchCallbacks) {
    swiper.emit("touchMove", e2);
  }
  if (e2.targetTouches && e2.targetTouches.length > 1)
    return;
  touches.currentX = pageX;
  touches.currentY = pageY;
  const diffX = touches.currentX - touches.startX;
  const diffY = touches.currentY - touches.startY;
  if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold)
    return;
  if (typeof data.isScrolling === "undefined") {
    let touchAngle;
    if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
      data.isScrolling = false;
    } else {
      if (diffX * diffX + diffY * diffY >= 25) {
        touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
        data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
      }
    }
  }
  if (data.isScrolling) {
    swiper.emit("touchMoveOpposite", e2);
  }
  if (typeof data.startMoving === "undefined") {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }
  if (data.isScrolling || swiper.zoom && swiper.params.zoom && swiper.params.zoom.enabled && data.evCache.length > 1) {
    data.isTouched = false;
    return;
  }
  if (!data.startMoving) {
    return;
  }
  swiper.allowClick = false;
  if (!params.cssMode && e2.cancelable) {
    e2.preventDefault();
  }
  if (params.touchMoveStopPropagation && !params.nested) {
    e2.stopPropagation();
  }
  let diff = swiper.isHorizontal() ? diffX : diffY;
  let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
  if (params.oneWayMovement) {
    diff = Math.abs(diff) * (rtl ? 1 : -1);
    touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
  }
  touches.diff = diff;
  diff *= params.touchRatio;
  if (rtl) {
    diff = -diff;
    touchesDiff = -touchesDiff;
  }
  const prevTouchesDirection = swiper.touchesDirection;
  swiper.swipeDirection = diff > 0 ? "prev" : "next";
  swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
  const isLoop = swiper.params.loop && !params.cssMode;
  if (!data.isMoved) {
    if (isLoop) {
      swiper.loopFix({
        direction: swiper.swipeDirection
      });
    }
    data.startTranslate = swiper.getTranslate();
    swiper.setTransition(0);
    if (swiper.animating) {
      const evt = new window.CustomEvent("transitionend", {
        bubbles: true,
        cancelable: true
      });
      swiper.wrapperEl.dispatchEvent(evt);
    }
    data.allowMomentumBounce = false;
    if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(true);
    }
    swiper.emit("sliderFirstMove", e2);
  }
  let loopFixed;
  if (data.isMoved && prevTouchesDirection !== swiper.touchesDirection && isLoop && Math.abs(diff) >= 1) {
    swiper.loopFix({
      direction: swiper.swipeDirection,
      setTranslate: true
    });
    loopFixed = true;
  }
  swiper.emit("sliderMove", e2);
  data.isMoved = true;
  data.currentTranslate = diff + data.startTranslate;
  let disableParentSwiper = true;
  let resistanceRatio = params.resistanceRatio;
  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }
  if (diff > 0) {
    if (isLoop && !loopFixed && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.size / 2 : swiper.minTranslate())) {
      swiper.loopFix({
        direction: "prev",
        setTranslate: true,
        activeSlideIndex: 0
      });
    }
    if (data.currentTranslate > swiper.minTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
      }
    }
  } else if (diff < 0) {
    if (isLoop && !loopFixed && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.size / 2 : swiper.maxTranslate())) {
      swiper.loopFix({
        direction: "next",
        setTranslate: true,
        activeSlideIndex: swiper.slides.length - (params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
      });
    }
    if (data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
      }
    }
  }
  if (disableParentSwiper) {
    e2.preventedByNestedSwiper = true;
  }
  if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
    data.currentTranslate = data.startTranslate;
  }
  if (params.threshold > 0) {
    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
      if (!data.allowThresholdMove) {
        data.allowThresholdMove = true;
        touches.startX = touches.currentX;
        touches.startY = touches.currentY;
        data.currentTranslate = data.startTranslate;
        touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
        return;
      }
    } else {
      data.currentTranslate = data.startTranslate;
      return;
    }
  }
  if (!params.followFinger || params.cssMode)
    return;
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) {
    swiper.freeMode.onTouchMove();
  }
  swiper.updateProgress(data.currentTranslate);
  swiper.setTranslate(data.currentTranslate);
}
function onTouchEnd(event) {
  const swiper = this;
  const data = swiper.touchEventsData;
  const pointerIndex = data.evCache.findIndex((cachedEv) => cachedEv.pointerId === event.pointerId);
  if (pointerIndex >= 0) {
    data.evCache.splice(pointerIndex, 1);
  }
  if (["pointercancel", "pointerout", "pointerleave"].includes(event.type)) {
    const proceed = event.type === "pointercancel" && (swiper.browser.isSafari || swiper.browser.isWebView);
    if (!proceed) {
      return;
    }
  }
  const {
    params,
    touches,
    rtlTranslate: rtl,
    slidesGrid,
    enabled
  } = swiper;
  if (!enabled)
    return;
  if (!params.simulateTouch && event.pointerType === "mouse")
    return;
  let e2 = event;
  if (e2.originalEvent)
    e2 = e2.originalEvent;
  if (data.allowTouchCallbacks) {
    swiper.emit("touchEnd", e2);
  }
  data.allowTouchCallbacks = false;
  if (!data.isTouched) {
    if (data.isMoved && params.grabCursor) {
      swiper.setGrabCursor(false);
    }
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
    swiper.setGrabCursor(false);
  }
  const touchEndTime = now();
  const timeDiff = touchEndTime - data.touchStartTime;
  if (swiper.allowClick) {
    const pathTree = e2.path || e2.composedPath && e2.composedPath();
    swiper.updateClickedSlide(pathTree && pathTree[0] || e2.target);
    swiper.emit("tap click", e2);
    if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
      swiper.emit("doubleTap doubleClick", e2);
    }
  }
  data.lastClickTime = now();
  nextTick(() => {
    if (!swiper.destroyed)
      swiper.allowClick = true;
  });
  if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  data.isTouched = false;
  data.isMoved = false;
  data.startMoving = false;
  let currentPos;
  if (params.followFinger) {
    currentPos = rtl ? swiper.translate : -swiper.translate;
  } else {
    currentPos = -data.currentTranslate;
  }
  if (params.cssMode) {
    return;
  }
  if (swiper.params.freeMode && params.freeMode.enabled) {
    swiper.freeMode.onTouchEnd({
      currentPos
    });
    return;
  }
  let stopIndex = 0;
  let groupSize = swiper.slidesSizesGrid[0];
  for (let i2 = 0; i2 < slidesGrid.length; i2 += i2 < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
    const increment2 = i2 < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (typeof slidesGrid[i2 + increment2] !== "undefined") {
      if (currentPos >= slidesGrid[i2] && currentPos < slidesGrid[i2 + increment2]) {
        stopIndex = i2;
        groupSize = slidesGrid[i2 + increment2] - slidesGrid[i2];
      }
    } else if (currentPos >= slidesGrid[i2]) {
      stopIndex = i2;
      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
    }
  }
  let rewindFirstIndex = null;
  let rewindLastIndex = null;
  if (params.rewind) {
    if (swiper.isBeginning) {
      rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    } else if (swiper.isEnd) {
      rewindFirstIndex = 0;
    }
  }
  const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
  const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
  if (timeDiff > params.longSwipesMs) {
    if (!params.longSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (swiper.swipeDirection === "next") {
      if (ratio >= params.longSwipesRatio)
        swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);
      else
        swiper.slideTo(stopIndex);
    }
    if (swiper.swipeDirection === "prev") {
      if (ratio > 1 - params.longSwipesRatio) {
        swiper.slideTo(stopIndex + increment);
      } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
        swiper.slideTo(rewindLastIndex);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  } else {
    if (!params.shortSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    const isNavButtonTarget = swiper.navigation && (e2.target === swiper.navigation.nextEl || e2.target === swiper.navigation.prevEl);
    if (!isNavButtonTarget) {
      if (swiper.swipeDirection === "next") {
        swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
      }
      if (swiper.swipeDirection === "prev") {
        swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
      }
    } else if (e2.target === swiper.navigation.nextEl) {
      swiper.slideTo(stopIndex + increment);
    } else {
      swiper.slideTo(stopIndex);
    }
  }
}
let timeout;
function onResize() {
  const swiper = this;
  const {
    params,
    el: el2
  } = swiper;
  if (el2 && el2.offsetWidth === 0)
    return;
  if (params.breakpoints) {
    swiper.setBreakpoint();
  }
  const {
    allowSlideNext,
    allowSlidePrev,
    snapGrid
  } = swiper;
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;
  swiper.updateSize();
  swiper.updateSlides();
  swiper.updateSlidesClasses();
  const isVirtualLoop = isVirtual && params.loop;
  if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) {
    swiper.slideTo(swiper.slides.length - 1, 0, false, true);
  } else {
    if (swiper.params.loop && !isVirtual) {
      swiper.slideToLoop(swiper.realIndex, 0, false, true);
    } else {
      swiper.slideTo(swiper.activeIndex, 0, false, true);
    }
  }
  if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
        swiper.autoplay.resume();
      }
    }, 500);
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
    swiper.checkOverflow();
  }
}
function onClick(e2) {
  const swiper = this;
  if (!swiper.enabled)
    return;
  if (!swiper.allowClick) {
    if (swiper.params.preventClicks)
      e2.preventDefault();
    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e2.stopPropagation();
      e2.stopImmediatePropagation();
    }
  }
}
function onScroll() {
  const swiper = this;
  const {
    wrapperEl,
    rtlTranslate,
    enabled
  } = swiper;
  if (!enabled)
    return;
  swiper.previousTranslate = swiper.translate;
  if (swiper.isHorizontal()) {
    swiper.translate = -wrapperEl.scrollLeft;
  } else {
    swiper.translate = -wrapperEl.scrollTop;
  }
  if (swiper.translate === 0)
    swiper.translate = 0;
  swiper.updateActiveIndex();
  swiper.updateSlidesClasses();
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== swiper.progress) {
    swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
  }
  swiper.emit("setTranslate", swiper.translate, false);
}
const processLazyPreloader = (swiper, imageEl) => {
  if (!swiper || swiper.destroyed || !swiper.params)
    return;
  const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
  const slideEl = imageEl.closest(slideSelector());
  if (slideEl) {
    const lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
    if (lazyEl)
      lazyEl.remove();
  }
};
function onLoad(e2) {
  const swiper = this;
  processLazyPreloader(swiper, e2.target);
  swiper.update();
}
let dummyEventAttached = false;
function dummyEventListener() {
}
const events = (swiper, method) => {
  const document2 = getDocument();
  const {
    params,
    el: el2,
    wrapperEl,
    device
  } = swiper;
  const capture = !!params.nested;
  const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
  const swiperMethod = method;
  el2[domMethod]("pointerdown", swiper.onTouchStart, {
    passive: false
  });
  document2[domMethod]("pointermove", swiper.onTouchMove, {
    passive: false,
    capture
  });
  document2[domMethod]("pointerup", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("pointercancel", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("pointerout", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("pointerleave", swiper.onTouchEnd, {
    passive: true
  });
  if (params.preventClicks || params.preventClicksPropagation) {
    el2[domMethod]("click", swiper.onClick, true);
  }
  if (params.cssMode) {
    wrapperEl[domMethod]("scroll", swiper.onScroll);
  }
  if (params.updateOnWindowResize) {
    swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true);
  } else {
    swiper[swiperMethod]("observerUpdate", onResize, true);
  }
  el2[domMethod]("load", swiper.onLoad, {
    capture: true
  });
};
function attachEvents() {
  const swiper = this;
  const document2 = getDocument();
  const {
    params
  } = swiper;
  swiper.onTouchStart = onTouchStart.bind(swiper);
  swiper.onTouchMove = onTouchMove.bind(swiper);
  swiper.onTouchEnd = onTouchEnd.bind(swiper);
  if (params.cssMode) {
    swiper.onScroll = onScroll.bind(swiper);
  }
  swiper.onClick = onClick.bind(swiper);
  swiper.onLoad = onLoad.bind(swiper);
  if (!dummyEventAttached) {
    document2.addEventListener("touchstart", dummyEventListener);
    dummyEventAttached = true;
  }
  events(swiper, "on");
}
function detachEvents() {
  const swiper = this;
  events(swiper, "off");
}
const events$1 = {
  attachEvents,
  detachEvents
};
const isGridEnabled = (swiper, params) => {
  return swiper.grid && params.grid && params.grid.rows > 1;
};
function setBreakpoint() {
  const swiper = this;
  const {
    realIndex,
    initialized,
    params,
    el: el2
  } = swiper;
  const breakpoints2 = params.breakpoints;
  if (!breakpoints2 || breakpoints2 && Object.keys(breakpoints2).length === 0)
    return;
  const breakpoint = swiper.getBreakpoint(breakpoints2, swiper.params.breakpointsBase, swiper.el);
  if (!breakpoint || swiper.currentBreakpoint === breakpoint)
    return;
  const breakpointOnlyParams = breakpoint in breakpoints2 ? breakpoints2[breakpoint] : void 0;
  const breakpointParams = breakpointOnlyParams || swiper.originalParams;
  const wasMultiRow = isGridEnabled(swiper, params);
  const isMultiRow = isGridEnabled(swiper, breakpointParams);
  const wasEnabled = params.enabled;
  if (wasMultiRow && !isMultiRow) {
    el2.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
    swiper.emitContainerClasses();
  } else if (!wasMultiRow && isMultiRow) {
    el2.classList.add(`${params.containerModifierClass}grid`);
    if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") {
      el2.classList.add(`${params.containerModifierClass}grid-column`);
    }
    swiper.emitContainerClasses();
  }
  ["navigation", "pagination", "scrollbar"].forEach((prop) => {
    const wasModuleEnabled = params[prop] && params[prop].enabled;
    const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
    if (wasModuleEnabled && !isModuleEnabled) {
      swiper[prop].disable();
    }
    if (!wasModuleEnabled && isModuleEnabled) {
      swiper[prop].enable();
    }
  });
  const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
  const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
  if (directionChanged && initialized) {
    swiper.changeDirection();
  }
  extend$1(swiper.params, breakpointParams);
  const isEnabled = swiper.params.enabled;
  Object.assign(swiper, {
    allowTouchMove: swiper.params.allowTouchMove,
    allowSlideNext: swiper.params.allowSlideNext,
    allowSlidePrev: swiper.params.allowSlidePrev
  });
  if (wasEnabled && !isEnabled) {
    swiper.disable();
  } else if (!wasEnabled && isEnabled) {
    swiper.enable();
  }
  swiper.currentBreakpoint = breakpoint;
  swiper.emit("_beforeBreakpoint", breakpointParams);
  if (needsReLoop && initialized) {
    swiper.loopDestroy();
    swiper.loopCreate(realIndex);
    swiper.updateSlides();
  }
  swiper.emit("breakpoint", breakpointParams);
}
function getBreakpoint(breakpoints2, base = "window", containerEl) {
  if (!breakpoints2 || base === "container" && !containerEl)
    return void 0;
  let breakpoint = false;
  const window2 = getWindow();
  const currentHeight = base === "window" ? window2.innerHeight : containerEl.clientHeight;
  const points = Object.keys(breakpoints2).map((point) => {
    if (typeof point === "string" && point.indexOf("@") === 0) {
      const minRatio = parseFloat(point.substr(1));
      const value = currentHeight * minRatio;
      return {
        value,
        point
      };
    }
    return {
      value: point,
      point
    };
  });
  points.sort((a3, b2) => parseInt(a3.value, 10) - parseInt(b2.value, 10));
  for (let i2 = 0; i2 < points.length; i2 += 1) {
    const {
      point,
      value
    } = points[i2];
    if (base === "window") {
      if (window2.matchMedia(`(min-width: ${value}px)`).matches) {
        breakpoint = point;
      }
    } else if (value <= containerEl.clientWidth) {
      breakpoint = point;
    }
  }
  return breakpoint || "max";
}
const breakpoints = {
  setBreakpoint,
  getBreakpoint
};
function prepareClasses(entries, prefix) {
  const resultClasses = [];
  entries.forEach((item) => {
    if (typeof item === "object") {
      Object.keys(item).forEach((classNames) => {
        if (item[classNames]) {
          resultClasses.push(prefix + classNames);
        }
      });
    } else if (typeof item === "string") {
      resultClasses.push(prefix + item);
    }
  });
  return resultClasses;
}
function addClasses() {
  const swiper = this;
  const {
    classNames,
    params,
    rtl,
    el: el2,
    device
  } = swiper;
  const suffixes = prepareClasses(["initialized", params.direction, {
    "free-mode": swiper.params.freeMode && params.freeMode.enabled
  }, {
    "autoheight": params.autoHeight
  }, {
    "rtl": rtl
  }, {
    "grid": params.grid && params.grid.rows > 1
  }, {
    "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
  }, {
    "android": device.android
  }, {
    "ios": device.ios
  }, {
    "css-mode": params.cssMode
  }, {
    "centered": params.cssMode && params.centeredSlides
  }, {
    "watch-progress": params.watchSlidesProgress
  }], params.containerModifierClass);
  classNames.push(...suffixes);
  el2.classList.add(...classNames);
  swiper.emitContainerClasses();
}
function removeClasses() {
  const swiper = this;
  const {
    el: el2,
    classNames
  } = swiper;
  el2.classList.remove(...classNames);
  swiper.emitContainerClasses();
}
const classes = {
  addClasses,
  removeClasses
};
function checkOverflow() {
  const swiper = this;
  const {
    isLocked: wasLocked,
    params
  } = swiper;
  const {
    slidesOffsetBefore
  } = params;
  if (slidesOffsetBefore) {
    const lastSlideIndex = swiper.slides.length - 1;
    const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
    swiper.isLocked = swiper.size > lastSlideRightEdge;
  } else {
    swiper.isLocked = swiper.snapGrid.length === 1;
  }
  if (params.allowSlideNext === true) {
    swiper.allowSlideNext = !swiper.isLocked;
  }
  if (params.allowSlidePrev === true) {
    swiper.allowSlidePrev = !swiper.isLocked;
  }
  if (wasLocked && wasLocked !== swiper.isLocked) {
    swiper.isEnd = false;
  }
  if (wasLocked !== swiper.isLocked) {
    swiper.emit(swiper.isLocked ? "lock" : "unlock");
  }
}
const checkOverflow$1 = {
  checkOverflow
};
const defaults = {
  init: true,
  direction: "horizontal",
  oneWayMovement: false,
  touchEventsTarget: "wrapper",
  initialSlide: 0,
  speed: 300,
  cssMode: false,
  updateOnWindowResize: true,
  resizeObserver: true,
  nested: false,
  createElements: false,
  enabled: true,
  focusableElements: "input, select, option, textarea, button, video, label",
  // Overrides
  width: null,
  height: null,
  //
  preventInteractionOnTransition: false,
  // ssr
  userAgent: null,
  url: null,
  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: false,
  edgeSwipeThreshold: 20,
  // Autoheight
  autoHeight: false,
  // Set wrapper width
  setWrapperSize: false,
  // Virtual Translate
  virtualTranslate: false,
  // Effects
  effect: "slide",
  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
  // Breakpoints
  breakpoints: void 0,
  breakpointsBase: "window",
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: false,
  centeredSlides: false,
  centeredSlidesBounds: false,
  slidesOffsetBefore: 0,
  // in px
  slidesOffsetAfter: 0,
  // in px
  normalizeSlideIndex: true,
  centerInsufficientSlides: false,
  // Disable swiper and hide navigation when container not overflow
  watchOverflow: true,
  // Round length
  roundLengths: false,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  allowTouchMove: true,
  threshold: 5,
  touchMoveStopPropagation: false,
  touchStartPreventDefault: true,
  touchStartForcePreventDefault: false,
  touchReleaseOnEdges: false,
  // Unique Navigation Elements
  uniqueNavElements: true,
  // Resistance
  resistance: true,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: false,
  // Cursor
  grabCursor: false,
  // Clicks
  preventClicks: true,
  preventClicksPropagation: true,
  slideToClickedSlide: false,
  // loop
  loop: false,
  loopedSlides: null,
  loopPreventsSliding: true,
  // rewind
  rewind: false,
  // Swiping/no swiping
  allowSlidePrev: true,
  allowSlideNext: true,
  swipeHandler: null,
  // '.swipe-handler',
  noSwiping: true,
  noSwipingClass: "swiper-no-swiping",
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: true,
  maxBackfaceHiddenSlides: 10,
  // NS
  containerModifierClass: "swiper-",
  // NEW
  slideClass: "swiper-slide",
  slideActiveClass: "swiper-slide-active",
  slideVisibleClass: "swiper-slide-visible",
  slideNextClass: "swiper-slide-next",
  slidePrevClass: "swiper-slide-prev",
  wrapperClass: "swiper-wrapper",
  lazyPreloaderClass: "swiper-lazy-preloader",
  // Callbacks
  runCallbacksOnInit: true,
  // Internals
  _emitClasses: false
};
function moduleExtendParams(params, allModulesParams) {
  return function extendParams(obj = {}) {
    const moduleParamName = Object.keys(obj)[0];
    const moduleParams = obj[moduleParamName];
    if (typeof moduleParams !== "object" || moduleParams === null) {
      extend$1(allModulesParams, obj);
      return;
    }
    if (["navigation", "pagination", "scrollbar"].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) {
      params[moduleParamName] = {
        auto: true
      };
    }
    if (!(moduleParamName in params && "enabled" in moduleParams)) {
      extend$1(allModulesParams, obj);
      return;
    }
    if (params[moduleParamName] === true) {
      params[moduleParamName] = {
        enabled: true
      };
    }
    if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) {
      params[moduleParamName].enabled = true;
    }
    if (!params[moduleParamName])
      params[moduleParamName] = {
        enabled: false
      };
    extend$1(allModulesParams, obj);
  };
}
const prototypes = {
  eventsEmitter,
  update,
  translate,
  transition,
  slide,
  loop,
  grabCursor,
  events: events$1,
  breakpoints,
  checkOverflow: checkOverflow$1,
  classes
};
const extendedDefaults = {};
let Swiper$2 = class Swiper {
  constructor(...args) {
    let el2;
    let params;
    if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") {
      params = args[0];
    } else {
      [el2, params] = args;
    }
    if (!params)
      params = {};
    params = extend$1({}, params);
    if (el2 && !params.el)
      params.el = el2;
    const document2 = getDocument();
    if (params.el && typeof params.el === "string" && document2.querySelectorAll(params.el).length > 1) {
      const swipers = [];
      document2.querySelectorAll(params.el).forEach((containerEl) => {
        const newParams = extend$1({}, params, {
          el: containerEl
        });
        swipers.push(new Swiper(newParams));
      });
      return swipers;
    }
    const swiper = this;
    swiper.__swiper__ = true;
    swiper.support = getSupport();
    swiper.device = getDevice({
      userAgent: params.userAgent
    });
    swiper.browser = getBrowser();
    swiper.eventsListeners = {};
    swiper.eventsAnyListeners = [];
    swiper.modules = [...swiper.__modules__];
    if (params.modules && Array.isArray(params.modules)) {
      swiper.modules.push(...params.modules);
    }
    const allModulesParams = {};
    swiper.modules.forEach((mod) => {
      mod({
        params,
        swiper,
        extendParams: moduleExtendParams(params, allModulesParams),
        on: swiper.on.bind(swiper),
        once: swiper.once.bind(swiper),
        off: swiper.off.bind(swiper),
        emit: swiper.emit.bind(swiper)
      });
    });
    const swiperParams = extend$1({}, defaults, allModulesParams);
    swiper.params = extend$1({}, swiperParams, extendedDefaults, params);
    swiper.originalParams = extend$1({}, swiper.params);
    swiper.passedParams = extend$1({}, params);
    if (swiper.params && swiper.params.on) {
      Object.keys(swiper.params.on).forEach((eventName) => {
        swiper.on(eventName, swiper.params.on[eventName]);
      });
    }
    if (swiper.params && swiper.params.onAny) {
      swiper.onAny(swiper.params.onAny);
    }
    Object.assign(swiper, {
      enabled: swiper.params.enabled,
      el: el2,
      // Classes
      classNames: [],
      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      // isDirection
      isHorizontal() {
        return swiper.params.direction === "horizontal";
      },
      isVertical() {
        return swiper.params.direction === "vertical";
      },
      // Indexes
      activeIndex: 0,
      realIndex: 0,
      //
      isBeginning: true,
      isEnd: false,
      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: false,
      // Locks
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
      // Touch Events
      touchEventsData: {
        isTouched: void 0,
        isMoved: void 0,
        allowTouchCallbacks: void 0,
        touchStartTime: void 0,
        isScrolling: void 0,
        currentTranslate: void 0,
        startTranslate: void 0,
        allowThresholdMove: void 0,
        // Form elements to match
        focusableElements: swiper.params.focusableElements,
        // Last click time
        lastClickTime: now(),
        clickTimeout: void 0,
        // Velocities
        velocities: [],
        allowMomentumBounce: void 0,
        startMoving: void 0,
        evCache: []
      },
      // Clicks
      allowClick: true,
      // Touches
      allowTouchMove: swiper.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0
    });
    swiper.emit("_swiper");
    if (swiper.params.init) {
      swiper.init();
    }
    return swiper;
  }
  getSlideIndex(slideEl) {
    const {
      slidesEl,
      params
    } = this;
    const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
    const firstSlideIndex = elementIndex(slides[0]);
    return elementIndex(slideEl) - firstSlideIndex;
  }
  getSlideIndexByData(index) {
    return this.getSlideIndex(this.slides.filter((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === index)[0]);
  }
  recalcSlides() {
    const swiper = this;
    const {
      slidesEl,
      params
    } = swiper;
    swiper.slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
  }
  enable() {
    const swiper = this;
    if (swiper.enabled)
      return;
    swiper.enabled = true;
    if (swiper.params.grabCursor) {
      swiper.setGrabCursor();
    }
    swiper.emit("enable");
  }
  disable() {
    const swiper = this;
    if (!swiper.enabled)
      return;
    swiper.enabled = false;
    if (swiper.params.grabCursor) {
      swiper.unsetGrabCursor();
    }
    swiper.emit("disable");
  }
  setProgress(progress, speed) {
    const swiper = this;
    progress = Math.min(Math.max(progress, 0), 1);
    const min = swiper.minTranslate();
    const max = swiper.maxTranslate();
    const current = (max - min) * progress + min;
    swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  emitContainerClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el)
      return;
    const cls = swiper.el.className.split(" ").filter((className) => {
      return className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
    });
    swiper.emit("_containerClasses", cls.join(" "));
  }
  getSlideClasses(slideEl) {
    const swiper = this;
    if (swiper.destroyed)
      return "";
    return slideEl.className.split(" ").filter((className) => {
      return className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0;
    }).join(" ");
  }
  emitSlidesClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el)
      return;
    const updates = [];
    swiper.slides.forEach((slideEl) => {
      const classNames = swiper.getSlideClasses(slideEl);
      updates.push({
        slideEl,
        classNames
      });
      swiper.emit("_slideClass", slideEl, classNames);
    });
    swiper.emit("_slideClasses", updates);
  }
  slidesPerViewDynamic(view = "current", exact = false) {
    const swiper = this;
    const {
      params,
      slides,
      slidesGrid,
      slidesSizesGrid,
      size: swiperSize,
      activeIndex
    } = swiper;
    let spv = 1;
    if (params.centeredSlides) {
      let slideSize = slides[activeIndex].swiperSlideSize;
      let breakLoop;
      for (let i2 = activeIndex + 1; i2 < slides.length; i2 += 1) {
        if (slides[i2] && !breakLoop) {
          slideSize += slides[i2].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize)
            breakLoop = true;
        }
      }
      for (let i2 = activeIndex - 1; i2 >= 0; i2 -= 1) {
        if (slides[i2] && !breakLoop) {
          slideSize += slides[i2].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize)
            breakLoop = true;
        }
      }
    } else {
      if (view === "current") {
        for (let i2 = activeIndex + 1; i2 < slides.length; i2 += 1) {
          const slideInView = exact ? slidesGrid[i2] + slidesSizesGrid[i2] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i2] - slidesGrid[activeIndex] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      } else {
        for (let i2 = activeIndex - 1; i2 >= 0; i2 -= 1) {
          const slideInView = slidesGrid[activeIndex] - slidesGrid[i2] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      }
    }
    return spv;
  }
  update() {
    const swiper = this;
    if (!swiper || swiper.destroyed)
      return;
    const {
      snapGrid,
      params
    } = swiper;
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }
    [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach((imageEl) => {
      if (imageEl.complete) {
        processLazyPreloader(swiper, imageEl);
      }
    });
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateProgress();
    swiper.updateSlidesClasses();
    function setTranslate2() {
      const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
      const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
      swiper.setTranslate(newTranslate);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    let translated;
    if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
      setTranslate2();
      if (swiper.params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      if ((swiper.params.slidesPerView === "auto" || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
        translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
      } else {
        translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
      if (!translated) {
        setTranslate2();
      }
    }
    if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
    swiper.emit("update");
  }
  changeDirection(newDirection, needUpdate = true) {
    const swiper = this;
    const currentDirection = swiper.params.direction;
    if (!newDirection) {
      newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
    }
    if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") {
      return swiper;
    }
    swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
    swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
    swiper.emitContainerClasses();
    swiper.params.direction = newDirection;
    swiper.slides.forEach((slideEl) => {
      if (newDirection === "vertical") {
        slideEl.style.width = "";
      } else {
        slideEl.style.height = "";
      }
    });
    swiper.emit("changeDirection");
    if (needUpdate)
      swiper.update();
    return swiper;
  }
  changeLanguageDirection(direction) {
    const swiper = this;
    if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr")
      return;
    swiper.rtl = direction === "rtl";
    swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
    if (swiper.rtl) {
      swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
      swiper.el.dir = "rtl";
    } else {
      swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
      swiper.el.dir = "ltr";
    }
    swiper.update();
  }
  mount(element) {
    const swiper = this;
    if (swiper.mounted)
      return true;
    let el2 = element || swiper.params.el;
    if (typeof el2 === "string") {
      el2 = document.querySelector(el2);
    }
    if (!el2) {
      return false;
    }
    el2.swiper = swiper;
    if (el2.shadowEl) {
      swiper.isElement = true;
    }
    const getWrapperSelector = () => {
      return `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
    };
    const getWrapper = () => {
      if (el2 && el2.shadowRoot && el2.shadowRoot.querySelector) {
        const res = el2.shadowRoot.querySelector(getWrapperSelector());
        return res;
      }
      return elementChildren(el2, getWrapperSelector())[0];
    };
    let wrapperEl = getWrapper();
    if (!wrapperEl && swiper.params.createElements) {
      wrapperEl = createElement("div", swiper.params.wrapperClass);
      el2.append(wrapperEl);
      elementChildren(el2, `.${swiper.params.slideClass}`).forEach((slideEl) => {
        wrapperEl.append(slideEl);
      });
    }
    Object.assign(swiper, {
      el: el2,
      wrapperEl,
      slidesEl: swiper.isElement ? el2 : wrapperEl,
      mounted: true,
      // RTL
      rtl: el2.dir.toLowerCase() === "rtl" || elementStyle(el2, "direction") === "rtl",
      rtlTranslate: swiper.params.direction === "horizontal" && (el2.dir.toLowerCase() === "rtl" || elementStyle(el2, "direction") === "rtl"),
      wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
    });
    return true;
  }
  init(el2) {
    const swiper = this;
    if (swiper.initialized)
      return swiper;
    const mounted = swiper.mount(el2);
    if (mounted === false)
      return swiper;
    swiper.emit("beforeInit");
    if (swiper.params.breakpoints) {
      swiper.setBreakpoint();
    }
    swiper.addClasses();
    swiper.updateSize();
    swiper.updateSlides();
    if (swiper.params.watchOverflow) {
      swiper.checkOverflow();
    }
    if (swiper.params.grabCursor && swiper.enabled) {
      swiper.setGrabCursor();
    }
    if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
      swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true);
    } else {
      swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
    }
    if (swiper.params.loop) {
      swiper.loopCreate();
    }
    swiper.attachEvents();
    [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach((imageEl) => {
      if (imageEl.complete) {
        processLazyPreloader(swiper, imageEl);
      } else {
        imageEl.addEventListener("load", (e2) => {
          processLazyPreloader(swiper, e2.target);
        });
      }
    });
    swiper.initialized = true;
    swiper.emit("init");
    swiper.emit("afterInit");
    return swiper;
  }
  destroy(deleteInstance = true, cleanStyles = true) {
    const swiper = this;
    const {
      params,
      el: el2,
      wrapperEl,
      slides
    } = swiper;
    if (typeof swiper.params === "undefined" || swiper.destroyed) {
      return null;
    }
    swiper.emit("beforeDestroy");
    swiper.initialized = false;
    swiper.detachEvents();
    if (params.loop) {
      swiper.loopDestroy();
    }
    if (cleanStyles) {
      swiper.removeClasses();
      el2.removeAttribute("style");
      wrapperEl.removeAttribute("style");
      if (slides && slides.length) {
        slides.forEach((slideEl) => {
          slideEl.classList.remove(params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
          slideEl.removeAttribute("style");
          slideEl.removeAttribute("data-swiper-slide-index");
        });
      }
    }
    swiper.emit("destroy");
    Object.keys(swiper.eventsListeners).forEach((eventName) => {
      swiper.off(eventName);
    });
    if (deleteInstance !== false) {
      swiper.el.swiper = null;
      deleteProps(swiper);
    }
    swiper.destroyed = true;
    return null;
  }
  static extendDefaults(newDefaults) {
    extend$1(extendedDefaults, newDefaults);
  }
  static get extendedDefaults() {
    return extendedDefaults;
  }
  static get defaults() {
    return defaults;
  }
  static installModule(mod) {
    if (!Swiper.prototype.__modules__)
      Swiper.prototype.__modules__ = [];
    const modules = Swiper.prototype.__modules__;
    if (typeof mod === "function" && modules.indexOf(mod) < 0) {
      modules.push(mod);
    }
  }
  static use(module) {
    if (Array.isArray(module)) {
      module.forEach((m3) => Swiper.installModule(m3));
      return Swiper;
    }
    Swiper.installModule(module);
    return Swiper;
  }
};
Object.keys(prototypes).forEach((prototypeGroup) => {
  Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
    Swiper$2.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
  });
});
Swiper$2.use([Resize, Observer]);
function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
  if (swiper.params.createElements) {
    Object.keys(checkProps).forEach((key) => {
      if (!params[key] && params.auto === true) {
        let element = elementChildren(swiper.el, `.${checkProps[key]}`)[0];
        if (!element) {
          element = createElement("div", checkProps[key]);
          element.className = checkProps[key];
          swiper.el.append(element);
        }
        params[key] = element;
        originalParams[key] = element;
      }
    });
  }
  return params;
}
function Navigation({
  swiper,
  extendParams,
  on,
  emit
}) {
  extendParams({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: false,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled"
    }
  });
  swiper.navigation = {
    nextEl: null,
    prevEl: null
  };
  const makeElementsArray = (el2) => {
    if (!Array.isArray(el2))
      el2 = [el2].filter((e2) => !!e2);
    return el2;
  };
  function getEl(el2) {
    let res;
    if (el2 && typeof el2 === "string" && swiper.isElement) {
      res = swiper.el.shadowRoot.querySelector(el2);
      if (res)
        return res;
    }
    if (el2) {
      if (typeof el2 === "string")
        res = [...document.querySelectorAll(el2)];
      if (swiper.params.uniqueNavElements && typeof el2 === "string" && res.length > 1 && swiper.el.querySelectorAll(el2).length === 1) {
        res = swiper.el.querySelector(el2);
      }
    }
    if (el2 && !res)
      return el2;
    return res;
  }
  function toggleEl(el2, disabled) {
    const params = swiper.params.navigation;
    el2 = makeElementsArray(el2);
    el2.forEach((subEl) => {
      if (subEl) {
        subEl.classList[disabled ? "add" : "remove"](...params.disabledClass.split(" "));
        if (subEl.tagName === "BUTTON")
          subEl.disabled = disabled;
        if (swiper.params.watchOverflow && swiper.enabled) {
          subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
        }
      }
    });
  }
  function update2() {
    const {
      nextEl,
      prevEl
    } = swiper.navigation;
    if (swiper.params.loop) {
      toggleEl(prevEl, false);
      toggleEl(nextEl, false);
      return;
    }
    toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
    toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
  }
  function onPrevClick(e2) {
    e2.preventDefault();
    if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind)
      return;
    swiper.slidePrev();
    emit("navigationPrev");
  }
  function onNextClick(e2) {
    e2.preventDefault();
    if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind)
      return;
    swiper.slideNext();
    emit("navigationNext");
  }
  function init() {
    const params = swiper.params.navigation;
    swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
      nextEl: "swiper-button-next",
      prevEl: "swiper-button-prev"
    });
    if (!(params.nextEl || params.prevEl))
      return;
    let nextEl = getEl(params.nextEl);
    let prevEl = getEl(params.prevEl);
    Object.assign(swiper.navigation, {
      nextEl,
      prevEl
    });
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const initButton = (el2, dir) => {
      if (el2) {
        el2.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
      }
      if (!swiper.enabled && el2) {
        el2.classList.add(...params.lockClass.split(" "));
      }
    };
    nextEl.forEach((el2) => initButton(el2, "next"));
    prevEl.forEach((el2) => initButton(el2, "prev"));
  }
  function destroy() {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const destroyButton = (el2, dir) => {
      el2.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
      el2.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
    };
    nextEl.forEach((el2) => destroyButton(el2, "next"));
    prevEl.forEach((el2) => destroyButton(el2, "prev"));
  }
  on("init", () => {
    if (swiper.params.navigation.enabled === false) {
      disable();
    } else {
      init();
      update2();
    }
  });
  on("toEdge fromEdge lock unlock", () => {
    update2();
  });
  on("destroy", () => {
    destroy();
  });
  on("enable disable", () => {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    [...nextEl, ...prevEl].filter((el2) => !!el2).forEach((el2) => el2.classList[swiper.enabled ? "remove" : "add"](swiper.params.navigation.lockClass));
  });
  on("click", (_s, e2) => {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const targetEl = e2.target;
    if (swiper.params.navigation.hideOnClick && !prevEl.includes(targetEl) && !nextEl.includes(targetEl)) {
      if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl)))
        return;
      let isHidden;
      if (nextEl.length) {
        isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass);
      } else if (prevEl.length) {
        isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
      }
      if (isHidden === true) {
        emit("navigationShow");
      } else {
        emit("navigationHide");
      }
      [...nextEl, ...prevEl].filter((el2) => !!el2).forEach((el2) => el2.classList.toggle(swiper.params.navigation.hiddenClass));
    }
  });
  const enable = () => {
    swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(" "));
    init();
    update2();
  };
  const disable = () => {
    swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(" "));
    destroy();
  };
  Object.assign(swiper.navigation, {
    enable,
    disable,
    update: update2,
    init,
    destroy
  });
}
function classesToSelector(classes2 = "") {
  return `.${classes2.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
}
function Pagination({
  swiper,
  extendParams,
  on,
  emit
}) {
  const pfx = "swiper-pagination";
  extendParams({
    pagination: {
      el: null,
      bulletElement: "span",
      clickable: false,
      hideOnClick: false,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: false,
      type: "bullets",
      // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: false,
      dynamicMainBullets: 1,
      formatFractionCurrent: (number) => number,
      formatFractionTotal: (number) => number,
      bulletClass: `${pfx}-bullet`,
      bulletActiveClass: `${pfx}-bullet-active`,
      modifierClass: `${pfx}-`,
      currentClass: `${pfx}-current`,
      totalClass: `${pfx}-total`,
      hiddenClass: `${pfx}-hidden`,
      progressbarFillClass: `${pfx}-progressbar-fill`,
      progressbarOppositeClass: `${pfx}-progressbar-opposite`,
      clickableClass: `${pfx}-clickable`,
      lockClass: `${pfx}-lock`,
      horizontalClass: `${pfx}-horizontal`,
      verticalClass: `${pfx}-vertical`,
      paginationDisabledClass: `${pfx}-disabled`
    }
  });
  swiper.pagination = {
    el: null,
    bullets: []
  };
  let bulletSize;
  let dynamicBulletIndex = 0;
  const makeElementsArray = (el2) => {
    if (!Array.isArray(el2))
      el2 = [el2].filter((e2) => !!e2);
    return el2;
  };
  function isPaginationDisabled() {
    return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && swiper.pagination.el.length === 0;
  }
  function setSideBullets(bulletEl, position) {
    const {
      bulletActiveClass
    } = swiper.params.pagination;
    if (!bulletEl)
      return;
    bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
    if (bulletEl) {
      bulletEl.classList.add(`${bulletActiveClass}-${position}`);
      bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
      if (bulletEl) {
        bulletEl.classList.add(`${bulletActiveClass}-${position}-${position}`);
      }
    }
  }
  function onBulletClick(e2) {
    const bulletEl = e2.target.closest(classesToSelector(swiper.params.pagination.bulletClass));
    if (!bulletEl) {
      return;
    }
    e2.preventDefault();
    const index = elementIndex(bulletEl) * swiper.params.slidesPerGroup;
    if (swiper.params.loop) {
      if (swiper.realIndex === index)
        return;
      if (index < swiper.loopedSlides || index > swiper.slides.length - swiper.loopedSlides) {
        swiper.loopFix({
          direction: index < swiper.loopedSlides ? "prev" : "next",
          activeSlideIndex: index,
          slideTo: false
        });
      }
      swiper.slideToLoop(index);
    } else {
      swiper.slideTo(index);
    }
  }
  function update2() {
    const rtl = swiper.rtl;
    const params = swiper.params.pagination;
    if (isPaginationDisabled())
      return;
    let el2 = swiper.pagination.el;
    el2 = makeElementsArray(el2);
    let current;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    const total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
    if (swiper.params.loop) {
      current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex;
    } else if (typeof swiper.snapIndex !== "undefined") {
      current = swiper.snapIndex;
    } else {
      current = swiper.activeIndex || 0;
    }
    if (params.type === "bullets" && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
      const bullets = swiper.pagination.bullets;
      let firstIndex;
      let lastIndex;
      let midIndex;
      if (params.dynamicBullets) {
        bulletSize = elementOuterSize(bullets[0], swiper.isHorizontal() ? "width" : "height", true);
        el2.forEach((subEl) => {
          subEl.style[swiper.isHorizontal() ? "width" : "height"] = `${bulletSize * (params.dynamicMainBullets + 4)}px`;
        });
        if (params.dynamicMainBullets > 1 && swiper.previousIndex !== void 0) {
          dynamicBulletIndex += current - (swiper.previousIndex || 0);
          if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
            dynamicBulletIndex = params.dynamicMainBullets - 1;
          } else if (dynamicBulletIndex < 0) {
            dynamicBulletIndex = 0;
          }
        }
        firstIndex = Math.max(current - dynamicBulletIndex, 0);
        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
        midIndex = (lastIndex + firstIndex) / 2;
      }
      bullets.forEach((bulletEl) => {
        const classesToRemove = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((suffix) => `${params.bulletActiveClass}${suffix}`)].map((s3) => typeof s3 === "string" && s3.includes(" ") ? s3.split(" ") : s3).flat();
        bulletEl.classList.remove(...classesToRemove);
      });
      if (el2.length > 1) {
        bullets.forEach((bullet) => {
          const bulletIndex = elementIndex(bullet);
          if (bulletIndex === current) {
            bullet.classList.add(...params.bulletActiveClass.split(" "));
          }
          if (params.dynamicBullets) {
            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
              bullet.classList.add(...`${params.bulletActiveClass}-main`.split(" "));
            }
            if (bulletIndex === firstIndex) {
              setSideBullets(bullet, "prev");
            }
            if (bulletIndex === lastIndex) {
              setSideBullets(bullet, "next");
            }
          }
        });
      } else {
        const bullet = bullets[current];
        if (bullet) {
          bullet.classList.add(...params.bulletActiveClass.split(" "));
        }
        if (params.dynamicBullets) {
          const firstDisplayedBullet = bullets[firstIndex];
          const lastDisplayedBullet = bullets[lastIndex];
          for (let i2 = firstIndex; i2 <= lastIndex; i2 += 1) {
            if (bullets[i2]) {
              bullets[i2].classList.add(...`${params.bulletActiveClass}-main`.split(" "));
            }
          }
          setSideBullets(firstDisplayedBullet, "prev");
          setSideBullets(lastDisplayedBullet, "next");
        }
      }
      if (params.dynamicBullets) {
        const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
        const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
        const offsetProp = rtl ? "right" : "left";
        bullets.forEach((bullet) => {
          bullet.style[swiper.isHorizontal() ? offsetProp : "top"] = `${bulletsOffset}px`;
        });
      }
    }
    el2.forEach((subEl, subElIndex) => {
      if (params.type === "fraction") {
        subEl.querySelectorAll(classesToSelector(params.currentClass)).forEach((fractionEl) => {
          fractionEl.textContent = params.formatFractionCurrent(current + 1);
        });
        subEl.querySelectorAll(classesToSelector(params.totalClass)).forEach((totalEl) => {
          totalEl.textContent = params.formatFractionTotal(total);
        });
      }
      if (params.type === "progressbar") {
        let progressbarDirection;
        if (params.progressbarOpposite) {
          progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal";
        } else {
          progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
        }
        const scale = (current + 1) / total;
        let scaleX = 1;
        let scaleY = 1;
        if (progressbarDirection === "horizontal") {
          scaleX = scale;
        } else {
          scaleY = scale;
        }
        subEl.querySelectorAll(classesToSelector(params.progressbarFillClass)).forEach((progressEl) => {
          progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
          progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
        });
      }
      if (params.type === "custom" && params.renderCustom) {
        subEl.innerHTML = params.renderCustom(swiper, current + 1, total);
        if (subElIndex === 0)
          emit("paginationRender", subEl);
      } else {
        if (subElIndex === 0)
          emit("paginationRender", subEl);
        emit("paginationUpdate", subEl);
      }
      if (swiper.params.watchOverflow && swiper.enabled) {
        subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
      }
    });
  }
  function render() {
    const params = swiper.params.pagination;
    if (isPaginationDisabled())
      return;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    let el2 = swiper.pagination.el;
    el2 = makeElementsArray(el2);
    let paginationHTML = "";
    if (params.type === "bullets") {
      let numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) {
        numberOfBullets = slidesLength;
      }
      for (let i2 = 0; i2 < numberOfBullets; i2 += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(swiper, i2, params.bulletClass);
        } else {
          paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
        }
      }
    }
    if (params.type === "fraction") {
      if (params.renderFraction) {
        paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
      } else {
        paginationHTML = `<span class="${params.currentClass}"></span> / <span class="${params.totalClass}"></span>`;
      }
    }
    if (params.type === "progressbar") {
      if (params.renderProgressbar) {
        paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
      } else {
        paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
      }
    }
    swiper.pagination.bullets = [];
    el2.forEach((subEl) => {
      if (params.type !== "custom") {
        subEl.innerHTML = paginationHTML || "";
      }
      if (params.type === "bullets") {
        swiper.pagination.bullets.push(...subEl.querySelectorAll(classesToSelector(params.bulletClass)));
      }
    });
    if (params.type !== "custom") {
      emit("paginationRender", el2[0]);
    }
  }
  function init() {
    swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
      el: "swiper-pagination"
    });
    const params = swiper.params.pagination;
    if (!params.el)
      return;
    let el2;
    if (typeof params.el === "string" && swiper.isElement) {
      el2 = swiper.el.shadowRoot.querySelector(params.el);
    }
    if (!el2 && typeof params.el === "string") {
      el2 = [...document.querySelectorAll(params.el)];
    }
    if (!el2) {
      el2 = params.el;
    }
    if (!el2 || el2.length === 0)
      return;
    if (swiper.params.uniqueNavElements && typeof params.el === "string" && Array.isArray(el2) && el2.length > 1) {
      el2 = [...swiper.el.querySelectorAll(params.el)];
      if (el2.length > 1) {
        el2 = el2.filter((subEl) => {
          if (elementParents(subEl, ".swiper")[0] !== swiper.el)
            return false;
          return true;
        })[0];
      }
    }
    if (Array.isArray(el2) && el2.length === 1)
      el2 = el2[0];
    Object.assign(swiper.pagination, {
      el: el2
    });
    el2 = makeElementsArray(el2);
    el2.forEach((subEl) => {
      if (params.type === "bullets" && params.clickable) {
        subEl.classList.add(params.clickableClass);
      }
      subEl.classList.add(params.modifierClass + params.type);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
      if (params.type === "bullets" && params.dynamicBullets) {
        subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
        dynamicBulletIndex = 0;
        if (params.dynamicMainBullets < 1) {
          params.dynamicMainBullets = 1;
        }
      }
      if (params.type === "progressbar" && params.progressbarOpposite) {
        subEl.classList.add(params.progressbarOppositeClass);
      }
      if (params.clickable) {
        subEl.addEventListener("click", onBulletClick);
      }
      if (!swiper.enabled) {
        subEl.classList.add(params.lockClass);
      }
    });
  }
  function destroy() {
    const params = swiper.params.pagination;
    if (isPaginationDisabled())
      return;
    let el2 = swiper.pagination.el;
    if (el2) {
      el2 = makeElementsArray(el2);
      el2.forEach((subEl) => {
        subEl.classList.remove(params.hiddenClass);
        subEl.classList.remove(params.modifierClass + params.type);
        subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        if (params.clickable) {
          subEl.removeEventListener("click", onBulletClick);
        }
      });
    }
    if (swiper.pagination.bullets)
      swiper.pagination.bullets.forEach((subEl) => subEl.classList.remove(...params.bulletActiveClass.split(" ")));
  }
  on("init", () => {
    if (swiper.params.pagination.enabled === false) {
      disable();
    } else {
      init();
      render();
      update2();
    }
  });
  on("activeIndexChange", () => {
    if (typeof swiper.snapIndex === "undefined") {
      update2();
    }
  });
  on("snapIndexChange", () => {
    update2();
  });
  on("snapGridLengthChange", () => {
    render();
    update2();
  });
  on("destroy", () => {
    destroy();
  });
  on("enable disable", () => {
    let {
      el: el2
    } = swiper.pagination;
    if (el2) {
      el2 = makeElementsArray(el2);
      el2.forEach((subEl) => subEl.classList[swiper.enabled ? "remove" : "add"](swiper.params.pagination.lockClass));
    }
  });
  on("lock unlock", () => {
    update2();
  });
  on("click", (_s, e2) => {
    const targetEl = e2.target;
    let {
      el: el2
    } = swiper.pagination;
    if (!Array.isArray(el2))
      el2 = [el2].filter((element) => !!element);
    if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el2 && el2.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
      if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl))
        return;
      const isHidden = el2[0].classList.contains(swiper.params.pagination.hiddenClass);
      if (isHidden === true) {
        emit("paginationShow");
      } else {
        emit("paginationHide");
      }
      el2.forEach((subEl) => subEl.classList.toggle(swiper.params.pagination.hiddenClass));
    }
  });
  const enable = () => {
    swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
    let {
      el: el2
    } = swiper.pagination;
    if (el2) {
      el2 = makeElementsArray(el2);
      el2.forEach((subEl) => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass));
    }
    init();
    render();
    update2();
  };
  const disable = () => {
    swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
    let {
      el: el2
    } = swiper.pagination;
    if (el2) {
      el2 = makeElementsArray(el2);
      el2.forEach((subEl) => subEl.classList.add(swiper.params.pagination.paginationDisabledClass));
    }
    destroy();
  };
  Object.assign(swiper.pagination, {
    enable,
    disable,
    render,
    update: update2,
    init,
    destroy
  });
}
function Autoplay({
  swiper,
  extendParams,
  on,
  emit,
  params
}) {
  swiper.autoplay = {
    running: false,
    paused: false,
    timeLeft: 0
  };
  extendParams({
    autoplay: {
      enabled: false,
      delay: 3e3,
      waitForTransition: true,
      disableOnInteraction: true,
      stopOnLastSlide: false,
      reverseDirection: false,
      pauseOnMouseEnter: false
    }
  });
  let timeout2;
  let raf;
  let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3e3;
  let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3e3;
  let autoplayTimeLeft;
  let autoplayStartTime = new Date().getTime;
  let wasPaused;
  let isTouched;
  let pausedByTouch;
  let touchStartTimeout;
  let slideChanged;
  let pausedByInteraction;
  function onTransitionEnd(e2) {
    if (!swiper || swiper.destroyed || !swiper.wrapperEl)
      return;
    if (e2.target !== swiper.wrapperEl)
      return;
    swiper.wrapperEl.removeEventListener("transitionend", onTransitionEnd);
    resume();
  }
  const calcTimeLeft = () => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    if (swiper.autoplay.paused) {
      wasPaused = true;
    } else if (wasPaused) {
      autoplayDelayCurrent = autoplayTimeLeft;
      wasPaused = false;
    }
    const timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - new Date().getTime();
    swiper.autoplay.timeLeft = timeLeft;
    emit("autoplayTimeLeft", timeLeft, timeLeft / autoplayDelayTotal);
    raf = requestAnimationFrame(() => {
      calcTimeLeft();
    });
  };
  const getSlideDelay = () => {
    let activeSlideEl;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      activeSlideEl = swiper.slides.filter((slideEl) => slideEl.classList.contains("swiper-slide-active"))[0];
    } else {
      activeSlideEl = swiper.slides[swiper.activeIndex];
    }
    if (!activeSlideEl)
      return void 0;
    const currentSlideDelay = parseInt(activeSlideEl.getAttribute("data-swiper-autoplay"), 10);
    return currentSlideDelay;
  };
  const run = (delayForce) => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    cancelAnimationFrame(raf);
    calcTimeLeft();
    let delay = typeof delayForce === "undefined" ? swiper.params.autoplay.delay : delayForce;
    autoplayDelayTotal = swiper.params.autoplay.delay;
    autoplayDelayCurrent = swiper.params.autoplay.delay;
    const currentSlideDelay = getSlideDelay();
    if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce === "undefined") {
      delay = currentSlideDelay;
      autoplayDelayTotal = currentSlideDelay;
      autoplayDelayCurrent = currentSlideDelay;
    }
    autoplayTimeLeft = delay;
    const speed = swiper.params.speed;
    const proceed = () => {
      if (!swiper || swiper.destroyed)
        return;
      if (swiper.params.autoplay.reverseDirection) {
        if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
          swiper.slidePrev(speed, true, true);
          emit("autoplay");
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(swiper.slides.length - 1, speed, true, true);
          emit("autoplay");
        }
      } else {
        if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
          swiper.slideNext(speed, true, true);
          emit("autoplay");
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(0, speed, true, true);
          emit("autoplay");
        }
      }
      if (swiper.params.cssMode) {
        autoplayStartTime = new Date().getTime();
        requestAnimationFrame(() => {
          run();
        });
      }
    };
    if (delay > 0) {
      clearTimeout(timeout2);
      timeout2 = setTimeout(() => {
        proceed();
      }, delay);
    } else {
      requestAnimationFrame(() => {
        proceed();
      });
    }
    return delay;
  };
  const start = () => {
    swiper.autoplay.running = true;
    run();
    emit("autoplayStart");
  };
  const stop = () => {
    swiper.autoplay.running = false;
    clearTimeout(timeout2);
    cancelAnimationFrame(raf);
    emit("autoplayStop");
  };
  const pause = (internal, reset) => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    clearTimeout(timeout2);
    if (!internal) {
      pausedByInteraction = true;
    }
    const proceed = () => {
      emit("autoplayPause");
      if (swiper.params.autoplay.waitForTransition) {
        swiper.wrapperEl.addEventListener("transitionend", onTransitionEnd);
      } else {
        resume();
      }
    };
    swiper.autoplay.paused = true;
    if (reset) {
      if (slideChanged) {
        autoplayTimeLeft = swiper.params.autoplay.delay;
      }
      slideChanged = false;
      proceed();
      return;
    }
    const delay = autoplayTimeLeft || swiper.params.autoplay.delay;
    autoplayTimeLeft = delay - (new Date().getTime() - autoplayStartTime);
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop)
      return;
    if (autoplayTimeLeft < 0)
      autoplayTimeLeft = 0;
    proceed();
  };
  const resume = () => {
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running)
      return;
    autoplayStartTime = new Date().getTime();
    if (pausedByInteraction) {
      pausedByInteraction = false;
      run(autoplayTimeLeft);
    } else {
      run();
    }
    swiper.autoplay.paused = false;
    emit("autoplayResume");
  };
  const onVisibilityChange = () => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    const document2 = getDocument();
    if (document2.visibilityState === "hidden") {
      pausedByInteraction = true;
      pause(true);
    }
    if (document2.visibilityState === "visible") {
      resume();
    }
  };
  const onPointerEnter = (e2) => {
    if (e2.pointerType !== "mouse")
      return;
    pausedByInteraction = true;
    pause(true);
  };
  const onPointerLeave = (e2) => {
    if (e2.pointerType !== "mouse")
      return;
    if (swiper.autoplay.paused) {
      resume();
    }
  };
  const attachMouseEvents = () => {
    if (swiper.params.autoplay.pauseOnMouseEnter) {
      swiper.el.addEventListener("pointerenter", onPointerEnter);
      swiper.el.addEventListener("pointerleave", onPointerLeave);
    }
  };
  const detachMouseEvents = () => {
    swiper.el.removeEventListener("pointerenter", onPointerEnter);
    swiper.el.removeEventListener("pointerleave", onPointerLeave);
  };
  const attachDocumentEvents = () => {
    const document2 = getDocument();
    document2.addEventListener("visibilitychange", onVisibilityChange);
  };
  const detachDocumentEvents = () => {
    const document2 = getDocument();
    document2.removeEventListener("visibilitychange", onVisibilityChange);
  };
  on("init", () => {
    if (swiper.params.autoplay.enabled) {
      attachMouseEvents();
      attachDocumentEvents();
      autoplayStartTime = new Date().getTime();
      start();
    }
  });
  on("destroy", () => {
    detachMouseEvents();
    detachDocumentEvents();
    if (swiper.autoplay.running) {
      stop();
    }
  });
  on("beforeTransitionStart", (_s, speed, internal) => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    if (internal || !swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on("sliderFirstMove", () => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    if (swiper.params.autoplay.disableOnInteraction) {
      stop();
      return;
    }
    isTouched = true;
    pausedByTouch = false;
    pausedByInteraction = false;
    touchStartTimeout = setTimeout(() => {
      pausedByInteraction = true;
      pausedByTouch = true;
      pause(true);
    }, 200);
  });
  on("touchEnd", () => {
    if (swiper.destroyed || !swiper.autoplay.running || !isTouched)
      return;
    clearTimeout(touchStartTimeout);
    clearTimeout(timeout2);
    if (swiper.params.autoplay.disableOnInteraction) {
      pausedByTouch = false;
      isTouched = false;
      return;
    }
    if (pausedByTouch && swiper.params.cssMode)
      resume();
    pausedByTouch = false;
    isTouched = false;
  });
  on("slideChange", () => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    slideChanged = true;
  });
  Object.assign(swiper.autoplay, {
    start,
    stop,
    pause,
    resume
  });
}
function effectInit(params) {
  const {
    effect,
    swiper,
    on,
    setTranslate: setTranslate2,
    setTransition: setTransition2,
    overwriteParams,
    perspective,
    recreateShadows,
    getEffectParams
  } = params;
  on("beforeInit", () => {
    if (swiper.params.effect !== effect)
      return;
    swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
    if (perspective && perspective()) {
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
    }
    const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
    Object.assign(swiper.params, overwriteParamsResult);
    Object.assign(swiper.originalParams, overwriteParamsResult);
  });
  on("setTranslate", () => {
    if (swiper.params.effect !== effect)
      return;
    setTranslate2();
  });
  on("setTransition", (_s, duration) => {
    if (swiper.params.effect !== effect)
      return;
    setTransition2(duration);
  });
  on("transitionEnd", () => {
    if (swiper.params.effect !== effect)
      return;
    if (recreateShadows) {
      if (!getEffectParams || !getEffectParams().slideShadows)
        return;
      swiper.slides.forEach((slideEl) => {
        slideEl.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl) => shadowEl.remove());
      });
      recreateShadows();
    }
  });
  let requireUpdateOnVirtual;
  on("virtualUpdate", () => {
    if (swiper.params.effect !== effect)
      return;
    if (!swiper.slides.length) {
      requireUpdateOnVirtual = true;
    }
    requestAnimationFrame(() => {
      if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
        setTranslate2();
        requireUpdateOnVirtual = false;
      }
    });
  });
}
function effectTarget(effectParams, slideEl) {
  const transformEl = getSlideTransformEl(slideEl);
  if (transformEl !== slideEl) {
    transformEl.style.backfaceVisibility = "hidden";
    transformEl.style["-webkit-backface-visibility"] = "hidden";
  }
  return transformEl;
}
function effectVirtualTransitionEnd({
  swiper,
  duration,
  transformElements,
  allSlides
}) {
  const {
    activeIndex
  } = swiper;
  const getSlide = (el2) => {
    if (!el2.parentElement) {
      const slide2 = swiper.slides.filter((slideEl) => slideEl.shadowEl && slideEl.shadowEl === el2.parentNode)[0];
      return slide2;
    }
    return el2.parentElement;
  };
  if (swiper.params.virtualTranslate && duration !== 0) {
    let eventTriggered = false;
    let transitionEndTarget;
    if (allSlides) {
      transitionEndTarget = transformElements;
    } else {
      transitionEndTarget = transformElements.filter((transformEl) => {
        const el2 = transformEl.classList.contains("swiper-slide-transform") ? getSlide(transformEl) : transformEl;
        return swiper.getSlideIndex(el2) === activeIndex;
      });
    }
    transitionEndTarget.forEach((el2) => {
      elementTransitionEnd(el2, () => {
        if (eventTriggered)
          return;
        if (!swiper || swiper.destroyed)
          return;
        eventTriggered = true;
        swiper.animating = false;
        const evt = new window.CustomEvent("transitionend", {
          bubbles: true,
          cancelable: true
        });
        swiper.wrapperEl.dispatchEvent(evt);
      });
    });
  }
}
function EffectFade({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    fadeEffect: {
      crossFade: false
    }
  });
  const setTranslate2 = () => {
    const {
      slides
    } = swiper;
    const params = swiper.params.fadeEffect;
    for (let i2 = 0; i2 < slides.length; i2 += 1) {
      const slideEl = swiper.slides[i2];
      const offset = slideEl.swiperSlideOffset;
      let tx = -offset;
      if (!swiper.params.virtualTranslate)
        tx -= swiper.translate;
      let ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
      }
      const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(slideEl.progress), 0) : 1 + Math.min(Math.max(slideEl.progress, -1), 0);
      const targetEl = effectTarget(params, slideEl);
      targetEl.style.opacity = slideOpacity;
      targetEl.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`;
    }
  };
  const setTransition2 = (duration) => {
    const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));
    transformElements.forEach((el2) => {
      el2.style.transitionDuration = `${duration}ms`;
    });
    effectVirtualTransitionEnd({
      swiper,
      duration,
      transformElements,
      allSlides: true
    });
  };
  effectInit({
    effect: "fade",
    swiper,
    on,
    setTranslate: setTranslate2,
    setTransition: setTransition2,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      spaceBetween: 0,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}
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
  const classes2 = classNames.split(" ").map((c2) => c2.trim()).filter((c2) => !!c2);
  const unique = [];
  classes2.forEach((c2) => {
    if (unique.indexOf(c2) < 0)
      unique.push(c2);
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
  const events2 = {};
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
        events2[`${key[2].toLowerCase()}${key.substr(3)}`] = obj[key];
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
    events: events2
  };
}
function mountSwiper({
  el: el2,
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
  swiper.init(el2);
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
  for (let i2 = loopFrom; i2 < loopTo; i2 += 1) {
    if (i2 >= from && i2 <= to) {
      slidesToRender.push(slides[getSlideIndex(i2)]);
    }
  }
  return slidesToRender.map((slide2) => {
    if (!slide2.props)
      slide2.props = {};
    if (!slide2.props.style)
      slide2.props.style = {};
    slide2.props.swiperRef = swiperRef;
    slide2.props.style = style;
    return h(slide2.type, {
      ...slide2.props
    }, slide2.children);
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
      _containerClasses(swiper, classes2) {
        containerClasses.value = classes2;
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
      const changedParams = getChangedParams(newPassedParams, oldPassedParamsRef.value, slidesRef.value, oldSlidesRef.value, (c2) => c2.props && c2.props.key);
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
      nextTick$1(() => {
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
      slides.forEach((slide2, index) => {
        if (!slide2.props)
          slide2.props = {};
        slide2.props.swiperRef = swiperRef;
        slide2.props.swiperSlideIndex = index;
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
    function updateClasses(swiper, el2, classNames) {
      if (el2 === slideElRef.value) {
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
    const onLoad2 = () => {
      lazyLoaded.value = true;
    };
    return () => {
      return h(props.tag, {
        class: uniqueClasses(`${slideClasses.value}`),
        ref: slideElRef,
        "data-swiper-slide-index": typeof props.virtualIndex === "undefined" && swiperRef && swiperRef.value && swiperRef.value.params.loop ? props.swiperSlideIndex : props.virtualIndex,
        onLoadCapture: onLoad2
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
const _hoisted_1$4 = ["href", "target"];
const _hoisted_2$3 = ["src", "alt"];
const _hoisted_3$1 = ["href", "target"];
const _hoisted_4$1 = ["src", "alt"];
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
    const modulesBanner = ref([Navigation, Pagination, Autoplay, EffectFade]);
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
                    }, null, 12, _hoisted_2$3)
                  ], 8, _hoisted_1$4),
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
const Swiper2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-10c139d5"]]);
Swiper2.install = (app) => {
  app.component(Swiper2.__name, Swiper2);
};
const _hoisted_1$3 = { class: "m-switch-wrap" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createElementVNode("div", {
          onClick: _cache[0] || (_cache[0] = ($event) => __props.disabled ? (e2) => e2.preventDefault() : onSwitch()),
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
const Switch = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-80338676"]]);
Switch.install = (app) => {
  app.component(Switch.__name, Switch);
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
    function getPosition(i2, height2) {
      if (i2 < props.columnCount) {
        preColumnHeight.value[i2] = props.columnGap + height2;
        return {
          top: props.columnGap,
          left: (imageWidth.value + props.columnGap) * i2 + props.columnGap
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
    function onLoad2(url, i2) {
      return new Promise((resolve) => {
        const image = new Image();
        image.src = url;
        image.onload = function() {
          var height2 = image.height / (image.width / imageWidth.value);
          imagesProperty.value[i2] = {
            // 存储图片宽高和位置信息
            width: imageWidth.value,
            height: height2,
            ...getPosition(i2, height2)
          };
          resolve("load");
        };
      });
    }
    async function onPreload() {
      const len = props.imageData.length;
      for (let i2 = 0; i2 < len; i2++) {
        await onLoad2(props.imageData[i2].imgUrl, i2);
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
  Pagination$1,
  Radio,
  Select,
  Spin,
  Swiper2,
  Switch,
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
  Pagination$1 as Pagination,
  Radio,
  Select,
  Spin,
  Swiper2 as Swiper,
  Switch,
  Tooltip,
  Video,
  Waterfall,
  VueAmazingUI as default
};
