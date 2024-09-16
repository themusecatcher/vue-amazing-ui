import {
  add,
  addDays,
  addHours,
  addMonths,
  addYears,
  differenceInCalendarDays,
  differenceInYears,
  eachDayOfInterval,
  eachQuarterOfInterval,
  endOfQuarter,
  endOfWeek,
  endOfYear,
  format,
  getDay,
  getHours,
  getISOWeek,
  getMinutes,
  getMonth,
  getQuarter,
  getSeconds,
  getWeek,
  getYear,
  isAfter,
  isBefore,
  isDate,
  isEqual,
  isSameQuarter,
  isValid,
  parse,
  set,
  setHours,
  setMilliseconds,
  setMinutes,
  setMonth,
  setSeconds,
  setYear,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
  sub,
  subMonths,
  subYears
} from "./chunk-Q4ZENGGV.js";
import {
  Fragment,
  Teleport,
  Transition,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createSlots,
  createTextVNode,
  createVNode,
  defineComponent,
  getCurrentScope,
  guardReactiveProps,
  h,
  isRef,
  mergeProps,
  nextTick,
  normalizeClass,
  normalizeProps,
  normalizeStyle,
  onBeforeUpdate,
  onMounted,
  onScopeDispose,
  onUnmounted,
  openBlock,
  reactive,
  ref,
  render,
  renderList,
  renderSlot,
  resolveDynamicComponent,
  toDisplayString,
  toRef,
  unref,
  useAttrs,
  useSlots,
  vShow,
  watch,
  withCtx,
  withDirectives,
  withKeys,
  withModifiers
} from "./chunk-T4VKWHV5.js";
import "./chunk-EQCVQC35.js";

// node_modules/.pnpm/@vuepic+vue-datepicker@9.0.3_vue@3.5.3_typescript@5.5.4_/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
function Et() {
  const e = useAttrs();
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img",
      ...e
    },
    [
      createBaseVNode("path", {
        d: "M29.333 8c0-2.208-1.792-4-4-4h-18.667c-2.208 0-4 1.792-4 4v18.667c0 2.208 1.792 4 4 4h18.667c2.208 0 4-1.792 4-4v-18.667zM26.667 8v18.667c0 0.736-0.597 1.333-1.333 1.333 0 0-18.667 0-18.667 0-0.736 0-1.333-0.597-1.333-1.333 0 0 0-18.667 0-18.667 0-0.736 0.597-1.333 1.333-1.333 0 0 18.667 0 18.667 0 0.736 0 1.333 0.597 1.333 1.333z"
      }),
      createBaseVNode("path", {
        d: "M20 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      }),
      createBaseVNode("path", {
        d: "M9.333 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      }),
      createBaseVNode("path", {
        d: "M4 14.667h24c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333h-24c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333z"
      })
    ]
  );
}
Et.compatConfig = {
  MODE: 3
};
function Mn() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
    },
    [
      createBaseVNode("path", {
        d: "M23.057 7.057l-16 16c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l16-16c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0z"
      }),
      createBaseVNode("path", {
        d: "M7.057 8.943l16 16c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885l-16-16c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
Mn.compatConfig = {
  MODE: 3
};
function za() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
    },
    [
      createBaseVNode("path", {
        d: "M20.943 23.057l-7.057-7.057c0 0 7.057-7.057 7.057-7.057 0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-8 8c-0.521 0.521-0.521 1.365 0 1.885l8 8c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
za.compatConfig = {
  MODE: 3
};
function Ha() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
    },
    [
      createBaseVNode("path", {
        d: "M12.943 24.943l8-8c0.521-0.521 0.521-1.365 0-1.885l-8-8c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885l7.057 7.057c0 0-7.057 7.057-7.057 7.057-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0z"
      })
    ]
  );
}
Ha.compatConfig = {
  MODE: 3
};
function Ua() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
    },
    [
      createBaseVNode("path", {
        d: "M16 1.333c-8.095 0-14.667 6.572-14.667 14.667s6.572 14.667 14.667 14.667c8.095 0 14.667-6.572 14.667-14.667s-6.572-14.667-14.667-14.667zM16 4c6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.623 0-12-5.377-12-12s5.377-12 12-12z"
      }),
      createBaseVNode("path", {
        d: "M14.667 8v8c0 0.505 0.285 0.967 0.737 1.193l5.333 2.667c0.658 0.329 1.46 0.062 1.789-0.596s0.062-1.46-0.596-1.789l-4.596-2.298c0 0 0-7.176 0-7.176 0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      })
    ]
  );
}
Ua.compatConfig = {
  MODE: 3
};
function Va() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
    },
    [
      createBaseVNode("path", {
        d: "M24.943 19.057l-8-8c-0.521-0.521-1.365-0.521-1.885 0l-8 8c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l7.057-7.057c0 0 7.057 7.057 7.057 7.057 0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
Va.compatConfig = {
  MODE: 3
};
function Wa() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
    },
    [
      createBaseVNode("path", {
        d: "M7.057 12.943l8 8c0.521 0.521 1.365 0.521 1.885 0l8-8c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-7.057 7.057c0 0-7.057-7.057-7.057-7.057-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
Wa.compatConfig = {
  MODE: 3
};
var qe = (e, t) => t ? new Date(e.toLocaleString("en-US", { timeZone: t })) : new Date(e);
var ja = (e, t, l) => {
  const a = Na(e, t, l);
  return a || G();
};
var fl = (e, t, l) => {
  const a = t.dateInTz ? qe(new Date(e), t.dateInTz) : G(e);
  return l ? Ge(a, true) : a;
};
var Na = (e, t, l) => {
  if (!e) return null;
  const a = l ? Ge(G(e), true) : G(e);
  return t ? t.exactMatch ? fl(e, t, l) : qe(a, t.timezone) : a;
};
var vl = (e) => {
  if (!e) return 0;
  const t = /* @__PURE__ */ new Date(), l = new Date(t.toLocaleString("en-US", { timeZone: "UTC" })), a = new Date(t.toLocaleString("en-US", { timeZone: e })), n = a.getTimezoneOffset() / 60;
  return (+l - +a) / (1e3 * 60 * 60) - n;
};
var nt = ((e) => (e.month = "month", e.year = "year", e))(nt || {});
var Mt = ((e) => (e.top = "top", e.bottom = "bottom", e))(Mt || {});
var Tt = ((e) => (e.header = "header", e.calendar = "calendar", e.timePicker = "timePicker", e))(Tt || {});
var He = ((e) => (e.month = "month", e.year = "year", e.calendar = "calendar", e.time = "time", e.minutes = "minutes", e.hours = "hours", e.seconds = "seconds", e))(He || {});
var ml = ["timestamp", "date", "iso"];
var je = ((e) => (e.up = "up", e.down = "down", e.left = "left", e.right = "right", e))(je || {});
var Pe = ((e) => (e.arrowUp = "ArrowUp", e.arrowDown = "ArrowDown", e.arrowLeft = "ArrowLeft", e.arrowRight = "ArrowRight", e.enter = "Enter", e.space = " ", e.esc = "Escape", e.tab = "Tab", e.home = "Home", e.end = "End", e.pageUp = "PageUp", e.pageDown = "PageDown", e))(Pe || {});
function ln(e) {
  return (t) => new Intl.DateTimeFormat(e, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`)).slice(0, 2);
}
function pl(e) {
  return (t) => format(qe(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`), "UTC"), "EEEEEE", { locale: e });
}
var yl = (e, t, l) => {
  const a = [1, 2, 3, 4, 5, 6, 7];
  let n;
  if (e !== null)
    try {
      n = a.map(pl(e));
    } catch {
      n = a.map(ln(t));
    }
  else
    n = a.map(ln(t));
  const i = n.slice(0, l), d = n.slice(l + 1, n.length);
  return [n[l]].concat(...d).concat(...i);
};
var Ka = (e, t, l) => {
  const a = [];
  for (let n = +e[0]; n <= +e[1]; n++)
    a.push({ value: +n, text: Sn(n, t) });
  return l ? a.reverse() : a;
};
var $n = (e, t, l) => {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
    const d = i < 10 ? `0${i}` : i;
    return /* @__PURE__ */ new Date(`2017-${d}-01T00:00:00+00:00`);
  });
  if (e !== null)
    try {
      const i = l === "long" ? "LLLL" : "LLL";
      return a.map((d, b) => {
        const c = format(qe(d, "UTC"), i, { locale: e });
        return {
          text: c.charAt(0).toUpperCase() + c.substring(1),
          value: b
        };
      });
    } catch {
    }
  const n = new Intl.DateTimeFormat(t, { month: l, timeZone: "UTC" });
  return a.map((i, d) => {
    const b = n.format(i);
    return {
      text: b.charAt(0).toUpperCase() + b.substring(1),
      value: d
    };
  });
};
var gl = (e) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e];
var Ie = (e) => {
  const t = unref(e);
  return t != null && t.$el ? t == null ? void 0 : t.$el : t;
};
var hl = (e) => ({ type: "dot", ...e ?? {} });
var An = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : false;
var Ga = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
};
var Ye = (e) => e;
var rn = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e;
var on = (e) => e === null;
var Tn = (e) => {
  if (e)
    return [...e.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var bl = (e) => {
  const t = [], l = (a) => a.filter((n) => n);
  for (let a = 0; a < e.length; a += 3) {
    const n = [e[a], e[a + 1], e[a + 2]];
    t.push(l(n));
  }
  return t;
};
var Gt = (e, t, l) => {
  const a = l != null, n = t != null;
  if (!a && !n) return false;
  const i = +l, d = +t;
  return a && n ? +e > i || +e < d : a ? +e > i : n ? +e < d : false;
};
var Yt = (e, t) => bl(e).map((l) => l.map((a) => {
  const { active: n, disabled: i, isBetween: d, highlighted: b } = t(a);
  return {
    ...a,
    active: n,
    disabled: i,
    className: {
      dp__overlay_cell_active: n,
      dp__overlay_cell: !n,
      dp__overlay_cell_disabled: i,
      dp__overlay_cell_pad: true,
      dp__overlay_cell_active_disabled: i && n,
      dp__cell_in_between: d,
      "dp--highlighted": b
    }
  };
}));
var yt = (e, t, l = false) => {
  e && t.allowStopPropagation && (l && e.stopImmediatePropagation(), e.stopPropagation());
};
var kl = () => [
  "a[href]",
  "area[href]",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[data-datepicker-instance]"
].join(", ");
function wl(e, t) {
  let l = [...document.querySelectorAll(kl())];
  l = l.filter((n) => !e.contains(n) || n.hasAttribute("data-datepicker-instance"));
  const a = l.indexOf(e);
  if (a >= 0 && (t ? a - 1 >= 0 : a + 1 <= l.length))
    return l[a + (t ? -1 : 1)];
}
var Ea = (e, t) => e == null ? void 0 : e.querySelector(`[data-dp-element="${t}"]`);
var Sn = (e, t) => new Intl.NumberFormat(t, { useGrouping: false, style: "decimal" }).format(e);
var Qa = (e) => format(e, "dd-MM-yyyy");
var $a = (e) => Array.isArray(e);
var sa = (e, t) => t.get(Qa(e));
var Dl = (e, t) => e ? t ? t instanceof Map ? !!sa(e, t) : t(G(e)) : false : true;
var Ke = (e, t, l = false, a) => {
  if (e.key === Pe.enter || e.key === Pe.space)
    return l && e.preventDefault(), t();
  if (a) return a(e);
};
var sn = () => ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].some(
  (e) => navigator.userAgent.includes(e)
) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
var un = (e, t, l, a, n, i) => {
  const d = parse(e, t.slice(0, e.length), /* @__PURE__ */ new Date(), { locale: i });
  return isValid(d) && isDate(d) ? a || n ? d : set(d, {
    hours: +l.hours,
    minutes: +(l == null ? void 0 : l.minutes),
    seconds: +(l == null ? void 0 : l.seconds),
    milliseconds: 0
  }) : null;
};
var Ml = (e, t, l, a, n, i) => {
  const d = Array.isArray(l) ? l[0] : l;
  if (typeof t == "string")
    return un(e, t, d, a, n, i);
  if (Array.isArray(t)) {
    let b = null;
    for (const c of t)
      if (b = un(e, c, d, a, n, i), b)
        break;
    return b;
  }
  return typeof t == "function" ? t(e) : null;
};
var G = (e) => e ? new Date(e) : /* @__PURE__ */ new Date();
var $l = (e, t, l) => {
  if (t) {
    const n = (e.getMonth() + 1).toString().padStart(2, "0"), i = e.getDate().toString().padStart(2, "0"), d = e.getHours().toString().padStart(2, "0"), b = e.getMinutes().toString().padStart(2, "0"), c = l ? e.getSeconds().toString().padStart(2, "0") : "00";
    return `${e.getFullYear()}-${n}-${i}T${d}:${b}:${c}.000Z`;
  }
  const a = Date.UTC(
    e.getUTCFullYear(),
    e.getUTCMonth(),
    e.getUTCDate(),
    e.getUTCHours(),
    e.getUTCMinutes(),
    e.getUTCSeconds()
  );
  return new Date(a).toISOString();
};
var Ge = (e, t) => {
  const l = G(JSON.parse(JSON.stringify(e))), a = set(l, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  return t ? startOfMonth(a) : a;
};
var gt = (e, t, l, a) => {
  let n = e ? G(e) : G();
  return (t || t === 0) && (n = setHours(n, +t)), (l || l === 0) && (n = setMinutes(n, +l)), (a || a === 0) && (n = setSeconds(n, +a)), setMilliseconds(n, 0);
};
var Oe = (e, t) => !e || !t ? false : isBefore(Ge(e), Ge(t));
var Me = (e, t) => !e || !t ? false : isEqual(Ge(e), Ge(t));
var Be = (e, t) => !e || !t ? false : isAfter(Ge(e), Ge(t));
var da = (e, t, l) => e != null && e[0] && (e != null && e[1]) ? Be(l, e[0]) && Oe(l, e[1]) : e != null && e[0] && t ? Be(l, e[0]) && Oe(l, t) || Oe(l, e[0]) && Be(l, t) : false;
var lt = (e) => {
  const t = set(new Date(e), { date: 1 });
  return Ge(t);
};
var Aa = (e, t, l) => t && (l || l === 0) ? Object.fromEntries(
  ["hours", "minutes", "seconds"].map((a) => a === t ? [a, l] : [a, isNaN(+e[a]) ? void 0 : +e[a]])
) : {
  hours: isNaN(+e.hours) ? void 0 : +e.hours,
  minutes: isNaN(+e.minutes) ? void 0 : +e.minutes,
  seconds: isNaN(+e.seconds) ? void 0 : +e.seconds
};
var St = (e) => ({
  hours: getHours(e),
  minutes: getMinutes(e),
  seconds: getSeconds(e)
});
var Pn = (e, t) => {
  if (t) {
    const l = getYear(G(t));
    if (l > e) return 12;
    if (l === e) return getMonth(G(t));
  }
};
var Rn = (e, t) => {
  if (t) {
    const l = getYear(G(t));
    return l < e ? -1 : l === e ? getMonth(G(t)) : void 0;
  }
};
var It = (e) => {
  if (e) return getYear(G(e));
};
var Cn = (e, t) => {
  const l = Be(e, t) ? t : e, a = Be(t, e) ? t : e;
  return eachDayOfInterval({ start: l, end: a });
};
var Al = (e) => {
  const t = addMonths(e, 1);
  return { month: getMonth(t), year: getYear(t) };
};
var it = (e, t) => {
  const l = startOfWeek(e, { weekStartsOn: +t }), a = endOfWeek(e, { weekStartsOn: +t });
  return [l, a];
};
var On = (e, t) => {
  const l = {
    hours: getHours(G()),
    minutes: getMinutes(G()),
    seconds: t ? getSeconds(G()) : 0
  };
  return Object.assign(l, e);
};
var pt = (e, t, l) => [set(G(e), { date: 1 }), set(G(), { month: t, year: l, date: 1 })];
var dt = (e, t, l) => {
  let a = e ? G(e) : G();
  return (t || t === 0) && (a = setMonth(a, t)), l && (a = setYear(a, l)), a;
};
var _n = (e, t, l, a, n) => {
  if (!a || n && !t || !n && !l) return false;
  const i = n ? addMonths(e, 1) : subMonths(e, 1), d = [getMonth(i), getYear(i)];
  return n ? !Sl(...d, t) : !Tl(...d, l);
};
var Tl = (e, t, l) => Oe(...pt(l, e, t)) || Me(...pt(l, e, t));
var Sl = (e, t, l) => Be(...pt(l, e, t)) || Me(...pt(l, e, t));
var Bn = (e, t, l, a, n, i, d) => {
  if (typeof t == "function" && !d) return t(e);
  const b = l ? { locale: l } : void 0;
  return Array.isArray(e) ? `${format(e[0], i, b)}${n && !e[1] ? "" : a}${e[1] ? format(e[1], i, b) : ""}` : format(e, i, b);
};
var Rt = (e) => {
  if (e) return null;
  throw new Error(Ga.prop("partial-range"));
};
var ta = (e, t) => {
  if (t) return e();
  throw new Error(Ga.prop("range"));
};
var Fa = (e) => Array.isArray(e) ? isValid(e[0]) && (e[1] ? isValid(e[1]) : true) : e ? isValid(e) : false;
var Pl = (e, t) => set(t ?? G(), {
  hours: +e.hours || 0,
  minutes: +e.minutes || 0,
  seconds: +e.seconds || 0
});
var Ta = (e, t, l, a) => {
  if (!e) return true;
  if (a) {
    const n = l === "max" ? isBefore(e, t) : isAfter(e, t), i = { seconds: 0, milliseconds: 0 };
    return n || isEqual(set(e, i), set(t, i));
  }
  return l === "max" ? e.getTime() <= t.getTime() : e.getTime() >= t.getTime();
};
var Sa = (e, t, l) => e ? Pl(e, t) : G(l ?? t);
var dn = (e, t, l, a, n) => {
  if (Array.isArray(a)) {
    const d = Sa(e, a[0], t), b = Sa(e, a[1], t);
    return Ta(a[0], d, l, !!t) && Ta(a[1], b, l, !!t) && n;
  }
  const i = Sa(e, a, t);
  return Ta(a, i, l, !!t) && n;
};
var Pa = (e) => set(G(), St(e));
var Rl = (e, t) => e instanceof Map ? Array.from(e.values()).filter((l) => getYear(G(l)) === t).map((l) => getMonth(l)) : [];
var Yn = (e, t, l) => typeof e == "function" ? e({ month: t, year: l }) : !!e.months.find((a) => a.month === t && a.year === l);
var qa = (e, t) => typeof e == "function" ? e(t) : e.years.includes(t);
var In = (e) => format(e, "yyyy-MM-dd");
var Ht = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Nn = () => {
  const e = (a) => {
    Ht.menuFocused = a;
  }, t = (a) => {
    Ht.shiftKeyInMenu !== a && (Ht.shiftKeyInMenu = a);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: Ht.shiftKeyInMenu, menuFocused: Ht.menuFocused })),
    setMenuFocused: e,
    setShiftKey: t
  };
};
var Se = reactive({
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
});
var Ra = ref(null);
var aa = ref(false);
var Ca = ref(false);
var Oa = ref(false);
var _a = ref(false);
var ze = ref(0);
var _e = ref(0);
var bt = () => {
  const e = computed(() => aa.value ? [...Se.selectionGrid, Se.actionRow].filter((f) => f.length) : Ca.value ? [
    ...Se.timePicker[0],
    ...Se.timePicker[1],
    _a.value ? [] : [Ra.value],
    Se.actionRow
  ].filter((f) => f.length) : Oa.value ? [...Se.monthPicker, Se.actionRow] : [Se.monthYear, ...Se.calendar, Se.time, Se.actionRow].filter((f) => f.length)), t = (f) => {
    ze.value = f ? ze.value + 1 : ze.value - 1;
    let B = null;
    e.value[_e.value] && (B = e.value[_e.value][ze.value]), !B && e.value[_e.value + (f ? 1 : -1)] ? (_e.value = _e.value + (f ? 1 : -1), ze.value = f ? 0 : e.value[_e.value].length - 1) : B || (ze.value = f ? ze.value - 1 : ze.value + 1);
  }, l = (f) => {
    if (_e.value === 0 && !f || _e.value === e.value.length && f) return;
    _e.value = f ? _e.value + 1 : _e.value - 1, e.value[_e.value] ? e.value[_e.value] && !e.value[_e.value][ze.value] && ze.value !== 0 && (ze.value = e.value[_e.value].length - 1) : _e.value = f ? _e.value - 1 : _e.value + 1;
  }, a = (f) => {
    let B = null;
    e.value[_e.value] && (B = e.value[_e.value][ze.value]), B ? B.focus({ preventScroll: !aa.value }) : ze.value = f ? ze.value - 1 : ze.value + 1;
  }, n = () => {
    t(true), a(true);
  }, i = () => {
    t(false), a(false);
  }, d = () => {
    l(false), a(true);
  }, b = () => {
    l(true), a(true);
  }, c = (f, B) => {
    Se[B] = f;
  }, L = (f, B) => {
    Se[B] = f;
  }, v = () => {
    ze.value = 0, _e.value = 0;
  };
  return {
    buildMatrix: c,
    buildMultiLevelMatrix: L,
    setTimePickerBackRef: (f) => {
      Ra.value = f;
    },
    setSelectionGrid: (f) => {
      aa.value = f, v(), f || (Se.selectionGrid = []);
    },
    setTimePicker: (f, B = false) => {
      Ca.value = f, _a.value = B, v(), f || (Se.timePicker[0] = [], Se.timePicker[1] = []);
    },
    setTimePickerElements: (f, B = 0) => {
      Se.timePicker[B] = f;
    },
    arrowRight: n,
    arrowLeft: i,
    arrowUp: d,
    arrowDown: b,
    clearArrowNav: () => {
      Se.monthYear = [], Se.calendar = [], Se.time = [], Se.actionRow = [], Se.selectionGrid = [], Se.timePicker[0] = [], Se.timePicker[1] = [], aa.value = false, Ca.value = false, _a.value = false, Oa.value = false, v(), Ra.value = null;
    },
    setMonthPicker: (f) => {
      Oa.value = f, v();
    },
    refSets: Se
    // exposed for testing
  };
};
var cn = (e) => ({
  menuAppearTop: "dp-menu-appear-top",
  menuAppearBottom: "dp-menu-appear-bottom",
  open: "dp-slide-down",
  close: "dp-slide-up",
  next: "calendar-next",
  previous: "calendar-prev",
  vNext: "dp-slide-up",
  vPrevious: "dp-slide-down",
  ...e ?? {}
});
var Cl = (e) => ({
  toggleOverlay: "Toggle overlay",
  menu: "Datepicker menu",
  input: "Datepicker input",
  openTimePicker: "Open time picker",
  closeTimePicker: "Close time Picker",
  incrementValue: (t) => `Increment ${t}`,
  decrementValue: (t) => `Decrement ${t}`,
  openTpOverlay: (t) => `Open ${t} overlay`,
  amPmButton: "Switch AM/PM mode",
  openYearsOverlay: "Open years overlay",
  openMonthsOverlay: "Open months overlay",
  nextMonth: "Next month",
  prevMonth: "Previous month",
  nextYear: "Next year",
  prevYear: "Previous year",
  day: void 0,
  weekDay: void 0,
  clearInput: "Clear value",
  calendarIcon: "Calendar icon",
  timePicker: "Time picker",
  monthPicker: (t) => `Month picker${t ? " overlay" : ""}`,
  yearPicker: (t) => `Year picker${t ? " overlay" : ""}`,
  timeOverlay: (t) => `${t} overlay`,
  ...e ?? {}
});
var fn = (e) => e ? typeof e == "boolean" ? e ? 2 : 0 : +e >= 2 ? +e : 2 : 0;
var Ol = (e) => {
  const t = typeof e == "object" && e, l = {
    static: true,
    solo: false
  };
  if (!e) return { ...l, count: fn(false) };
  const a = t ? e : {}, n = t ? a.count ?? true : e, i = fn(n);
  return Object.assign(l, a, { count: i });
};
var _l = (e, t, l) => e || (typeof l == "string" ? l : t);
var Bl = (e) => typeof e == "boolean" ? e ? cn({}) : false : cn(e);
var Yl = (e) => {
  const t = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: "open",
    selectOnFocus: false,
    rangeSeparator: " - "
  };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : { ...t, enabled: e };
};
var Il = (e) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...e ?? {}
});
var Nl = (e) => ({
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  ...e ?? {}
});
var El = (e) => {
  const t = { input: false };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : {
    enabled: e,
    ...t
  };
};
var Fl = (e) => ({ ...{
  allowStopPropagation: true,
  closeOnScroll: false,
  modeHeight: 255,
  allowPreventDefault: false,
  closeOnClearValue: true,
  closeOnAutoApply: true,
  noSwipe: false,
  keepActionRow: false,
  onClickOutside: void 0,
  tabOutClosesMenu: true,
  arrowLeft: void 0,
  keepViewOnOffsetClick: false,
  timeArrowHoldThreshold: 0,
  shadowDom: false
}, ...e ?? {} });
var Ll = (e) => {
  const t = {
    dates: Array.isArray(e) ? e.map((l) => G(l)) : [],
    years: [],
    months: [],
    quarters: [],
    weeks: [],
    weekdays: [],
    options: { highlightDisabled: false }
  };
  return typeof e == "function" ? e : { ...t, ...e ?? {} };
};
var zl = (e) => typeof e == "object" ? {
  type: (e == null ? void 0 : e.type) ?? "local",
  hideOnOffsetDates: (e == null ? void 0 : e.hideOnOffsetDates) ?? false
} : {
  type: e,
  hideOnOffsetDates: false
};
var Hl = (e) => {
  const t = {
    noDisabledRange: false,
    showLastInRange: true,
    minMaxRawRange: false,
    partialRange: true,
    disableTimeRangeValidation: false,
    maxRange: void 0,
    minRange: void 0,
    autoRange: void 0,
    fixedStart: false,
    fixedEnd: false
  };
  return typeof e == "object" ? { enabled: true, ...t, ...e } : {
    enabled: e,
    ...t
  };
};
var Ul = (e) => e ? typeof e == "string" ? {
  timezone: e,
  exactMatch: false,
  dateInTz: void 0,
  emitTimezone: void 0,
  convertModel: true
} : {
  timezone: e.timezone,
  exactMatch: e.exactMatch ?? false,
  dateInTz: e.dateInTz ?? void 0,
  emitTimezone: e.emitTimezone ?? void 0,
  convertModel: e.convertModel ?? true
} : { timezone: void 0, exactMatch: false, emitTimezone: void 0 };
var Ba = (e, t, l) => new Map(
  e.map((a) => {
    const n = ja(a, t, l);
    return [Qa(n), n];
  })
);
var Vl = (e, t) => e.length ? new Map(
  e.map((l) => {
    const a = ja(l.date, t);
    return [Qa(a), l];
  })
) : null;
var Wl = (e) => {
  var t;
  return {
    minDate: Na(e.minDate, e.timezone, e.isSpecific),
    maxDate: Na(e.maxDate, e.timezone, e.isSpecific),
    disabledDates: $a(e.disabledDates) ? Ba(e.disabledDates, e.timezone, e.isSpecific) : e.disabledDates,
    allowedDates: $a(e.allowedDates) ? Ba(e.allowedDates, e.timezone, e.isSpecific) : null,
    highlight: typeof e.highlight == "object" && $a((t = e.highlight) == null ? void 0 : t.dates) ? Ba(e.highlight.dates, e.timezone) : e.highlight,
    markers: Vl(e.markers, e.timezone)
  };
};
var jl = (e) => typeof e == "boolean" ? { enabled: e, dragSelect: true, limit: null } : {
  enabled: !!e,
  limit: e.limit ? +e.limit : null,
  dragSelect: e.dragSelect ?? true
};
var Kl = (e) => ({
  ...Object.fromEntries(
    Object.keys(e).map((l) => {
      const a = l, n = e[a], i = typeof e[a] == "string" ? { [n]: true } : Object.fromEntries(n.map((d) => [d, true]));
      return [l, i];
    })
  )
});
var Ce = (e) => {
  const t = () => {
    const oe = e.enableSeconds ? ":ss" : "", ee = e.enableMinutes ? ":mm" : "";
    return e.is24 ? `HH${ee}${oe}` : `hh${ee}${oe} aa`;
  }, l = () => {
    var oe;
    return e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? t() : e.weekPicker ? `${((oe = U.value) == null ? void 0 : oe.type) === "iso" ? "RR" : "ww"}-yyyy` : e.yearPicker ? "yyyy" : e.quarterPicker ? "QQQ/yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${t()}` : "MM/dd/yyyy";
  }, a = (oe) => On(oe, e.enableSeconds), n = () => Q.value.enabled ? e.startTime && Array.isArray(e.startTime) ? [a(e.startTime[0]), a(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? a(e.startTime) : null, i = computed(() => Ol(e.multiCalendars)), d = computed(() => n()), b = computed(() => Cl(e.ariaLabels)), c = computed(() => Il(e.filters)), L = computed(() => Bl(e.transitions)), v = computed(() => Nl(e.actionRow)), _ = computed(
    () => _l(e.previewFormat, e.format, l())
  ), h2 = computed(() => Yl(e.textInput)), C = computed(() => El(e.inline)), H = computed(() => Fl(e.config)), E = computed(() => Ll(e.highlight)), U = computed(() => zl(e.weekNumbers)), f = computed(() => Ul(e.timezone)), B = computed(() => jl(e.multiDates)), P = computed(
    () => Wl({
      minDate: e.minDate,
      maxDate: e.maxDate,
      disabledDates: e.disabledDates,
      allowedDates: e.allowedDates,
      highlight: E.value,
      markers: e.markers,
      timezone: f.value,
      isSpecific: e.monthPicker || e.yearPicker || e.quarterPicker
    })
  ), Q = computed(() => Hl(e.range)), ae = computed(() => Kl(e.ui));
  return {
    defaultedTransitions: L,
    defaultedMultiCalendars: i,
    defaultedStartTime: d,
    defaultedAriaLabels: b,
    defaultedFilters: c,
    defaultedActionRow: v,
    defaultedPreviewFormat: _,
    defaultedTextInput: h2,
    defaultedInline: C,
    defaultedConfig: H,
    defaultedHighlight: E,
    defaultedWeekNumbers: U,
    defaultedRange: Q,
    propDates: P,
    defaultedTz: f,
    defaultedMultiDates: B,
    defaultedUI: ae,
    getDefaultPattern: l,
    getDefaultStartTime: n
  };
};
var Gl = (e, t, l) => {
  const a = ref(), { defaultedTextInput: n, defaultedRange: i, defaultedTz: d, defaultedMultiDates: b, getDefaultPattern: c } = Ce(t), L = ref(""), v = toRef(t, "format"), _ = toRef(t, "formatLocale");
  watch(
    a,
    () => {
      typeof t.onInternalModelChange == "function" && e("internal-model-change", a.value, M(true));
    },
    { deep: true }
  ), watch(i, (u, le) => {
    u.enabled !== le.enabled && (a.value = null);
  }), watch(v, () => {
    X();
  });
  const h2 = (u) => d.value.timezone && d.value.convertModel ? qe(u, d.value.timezone) : u, C = (u) => {
    if (d.value.timezone && d.value.convertModel) {
      const le = vl(d.value.timezone);
      return addHours(u, le);
    }
    return u;
  }, H = (u, le, me = false) => Bn(
    u,
    t.format,
    t.formatLocale,
    n.value.rangeSeparator,
    t.modelAuto,
    le ?? c(),
    me
  ), E = (u) => u ? t.modelType ? p(u) : {
    hours: getHours(u),
    minutes: getMinutes(u),
    seconds: t.enableSeconds ? getSeconds(u) : 0
  } : null, U = (u) => t.modelType ? p(u) : { month: getMonth(u), year: getYear(u) }, f = (u) => Array.isArray(u) ? b.value.enabled ? u.map((le) => B(le, setYear(G(), le))) : ta(
    () => [
      setYear(G(), u[0]),
      u[1] ? setYear(G(), u[1]) : Rt(i.value.partialRange)
    ],
    i.value.enabled
  ) : setYear(G(), +u), B = (u, le) => (typeof u == "string" || typeof u == "number") && t.modelType ? A(u) : le, P = (u) => Array.isArray(u) ? [
    B(
      u[0],
      gt(null, +u[0].hours, +u[0].minutes, u[0].seconds)
    ),
    B(
      u[1],
      gt(null, +u[1].hours, +u[1].minutes, u[1].seconds)
    )
  ] : B(u, gt(null, u.hours, u.minutes, u.seconds)), Q = (u) => {
    const le = set(G(), { date: 1 });
    return Array.isArray(u) ? b.value.enabled ? u.map((me) => B(me, dt(le, +me.month, +me.year))) : ta(
      () => [
        B(u[0], dt(le, +u[0].month, +u[0].year)),
        B(
          u[1],
          u[1] ? dt(le, +u[1].month, +u[1].year) : Rt(i.value.partialRange)
        )
      ],
      i.value.enabled
    ) : B(u, dt(le, +u.month, +u.year));
  }, ae = (u) => {
    if (Array.isArray(u))
      return u.map((le) => A(le));
    throw new Error(Ga.dateArr("multi-dates"));
  }, oe = (u) => {
    if (Array.isArray(u) && i.value.enabled) {
      const le = u[0], me = u[1];
      return [
        G(Array.isArray(le) ? le[0] : null),
        Array.isArray(me) && me.length ? G(me[0]) : null
      ];
    }
    return G(u[0]);
  }, ee = (u) => t.modelAuto ? Array.isArray(u) ? [A(u[0]), A(u[1])] : t.autoApply ? [A(u)] : [A(u), null] : Array.isArray(u) ? ta(
    () => u[1] ? [
      A(u[0]),
      u[1] ? A(u[1]) : Rt(i.value.partialRange)
    ] : [A(u[0])],
    i.value.enabled
  ) : A(u), S = () => {
    Array.isArray(a.value) && i.value.enabled && a.value.length === 1 && a.value.push(Rt(i.value.partialRange));
  }, x = () => {
    const u = a.value;
    return [
      p(u[0]),
      u[1] ? p(u[1]) : Rt(i.value.partialRange)
    ];
  }, Y = () => a.value[1] ? x() : p(Ye(a.value[0])), q = () => (a.value || []).map((u) => p(u)), de = (u = false) => (u || S(), t.modelAuto ? Y() : b.value.enabled ? q() : Array.isArray(a.value) ? ta(() => x(), i.value.enabled) : p(Ye(a.value))), ve = (u) => !u || Array.isArray(u) && !u.length ? null : t.timePicker ? P(Ye(u)) : t.monthPicker ? Q(Ye(u)) : t.yearPicker ? f(Ye(u)) : b.value.enabled ? ae(Ye(u)) : t.weekPicker ? oe(Ye(u)) : ee(Ye(u)), y = (u) => {
    const le = ve(u);
    Fa(Ye(le)) ? (a.value = Ye(le), X()) : (a.value = null, L.value = "");
  }, z = () => {
    const u = (le) => format(le, n.value.format);
    return `${u(a.value[0])} ${n.value.rangeSeparator} ${a.value[1] ? u(a.value[1]) : ""}`;
  }, te = () => l.value && a.value ? Array.isArray(a.value) ? z() : format(a.value, n.value.format) : H(a.value), g = () => a.value ? b.value.enabled ? a.value.map((u) => H(u)).join("; ") : n.value.enabled && typeof n.value.format == "string" ? te() : H(a.value) : "", X = () => {
    !t.format || typeof t.format == "string" || n.value.enabled && typeof n.value.format == "string" ? L.value = g() : L.value = t.format(a.value);
  }, A = (u) => {
    if (t.utc) {
      const le = new Date(u);
      return t.utc === "preserve" ? new Date(le.getTime() + le.getTimezoneOffset() * 6e4) : le;
    }
    return t.modelType ? ml.includes(t.modelType) ? h2(new Date(u)) : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? h2(
      parse(u, c(), /* @__PURE__ */ new Date(), { locale: _.value })
    ) : h2(
      parse(u, t.modelType, /* @__PURE__ */ new Date(), { locale: _.value })
    ) : h2(new Date(u));
  }, p = (u) => u ? t.utc ? $l(u, t.utc === "preserve", t.enableSeconds) : t.modelType ? t.modelType === "timestamp" ? +C(u) : t.modelType === "iso" ? C(u).toISOString() : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? H(C(u)) : H(C(u), t.modelType, true) : C(u) : "", se = (u, le = false, me = false) => {
    if (me) return u;
    if (e("update:model-value", u), d.value.emitTimezone && le) {
      const $ = Array.isArray(u) ? u.map((ge) => qe(Ye(ge), d.value.emitTimezone)) : qe(Ye(u), d.value.emitTimezone);
      e("update:model-timezone-value", $);
    }
  }, I = (u) => Array.isArray(a.value) ? b.value.enabled ? a.value.map((le) => u(le)) : [
    u(a.value[0]),
    a.value[1] ? u(a.value[1]) : Rt(i.value.partialRange)
  ] : u(Ye(a.value)), D = () => {
    if (Array.isArray(a.value)) {
      const u = it(a.value[0], t.weekStart), le = a.value[1] ? it(a.value[1], t.weekStart) : [];
      return [u.map((me) => G(me)), le.map((me) => G(me))];
    }
    return it(a.value, t.weekStart).map((u) => G(u));
  }, V = (u, le) => se(Ye(I(u)), false, le), s = (u) => {
    const le = D();
    return u ? le : e("update:model-value", D());
  }, M = (u = false) => (u || X(), t.monthPicker ? V(U, u) : t.timePicker ? V(E, u) : t.yearPicker ? V(getYear, u) : t.weekPicker ? s(u) : se(de(u), true, u));
  return {
    inputValue: L,
    internalModelValue: a,
    checkBeforeEmit: () => a.value ? i.value.enabled ? i.value.partialRange ? a.value.length >= 1 : a.value.length === 2 : !!a.value : false,
    parseExternalModelValue: y,
    formatInputValue: X,
    emitModelValue: M
  };
};
var Ql = (e, t) => {
  const { defaultedFilters: l, propDates: a } = Ce(e), { validateMonthYearInRange: n } = kt(e), i = (v, _) => {
    let h2 = v;
    return l.value.months.includes(getMonth(h2)) ? (h2 = _ ? addMonths(v, 1) : subMonths(v, 1), i(h2, _)) : h2;
  }, d = (v, _) => {
    let h2 = v;
    return l.value.years.includes(getYear(h2)) ? (h2 = _ ? addYears(v, 1) : subYears(v, 1), d(h2, _)) : h2;
  }, b = (v, _ = false) => {
    const h2 = set(G(), { month: e.month, year: e.year });
    let C = v ? addMonths(h2, 1) : subMonths(h2, 1);
    e.disableYearSelect && (C = setYear(C, e.year));
    let H = getMonth(C), E = getYear(C);
    l.value.months.includes(H) && (C = i(C, v), H = getMonth(C), E = getYear(C)), l.value.years.includes(E) && (C = d(C, v), E = getYear(C)), n(H, E, v, e.preventMinMaxNavigation) && c(H, E, _);
  }, c = (v, _, h2) => {
    t("update-month-year", { month: v, year: _, fromNav: h2 });
  }, L = computed(() => (v) => _n(
    set(G(), { month: e.month, year: e.year }),
    a.value.maxDate,
    a.value.minDate,
    e.preventMinMaxNavigation,
    v
  ));
  return { handleMonthYearChange: b, isDisabled: L, updateMonthYear: c };
};
var ca = {
  multiCalendars: { type: [Boolean, Number, String, Object], default: void 0 },
  modelValue: { type: [String, Date, Array, Object, Number], default: null },
  modelType: { type: String, default: null },
  position: { type: String, default: "center" },
  dark: { type: Boolean, default: false },
  format: {
    type: [String, Function],
    default: () => null
  },
  autoPosition: { type: Boolean, default: true },
  altPosition: { type: Function, default: null },
  transitions: { type: [Boolean, Object], default: true },
  formatLocale: { type: Object, default: null },
  utc: { type: [Boolean, String], default: false },
  ariaLabels: { type: Object, default: () => ({}) },
  offset: { type: [Number, String], default: 10 },
  hideNavigation: { type: Array, default: () => [] },
  timezone: { type: [String, Object], default: null },
  vertical: { type: Boolean, default: false },
  disableMonthYearSelect: { type: Boolean, default: false },
  disableYearSelect: { type: Boolean, default: false },
  dayClass: {
    type: Function,
    default: null
  },
  yearRange: { type: Array, default: () => [1900, 2100] },
  enableTimePicker: { type: Boolean, default: true },
  autoApply: { type: Boolean, default: false },
  disabledDates: { type: [Array, Function], default: () => [] },
  monthNameFormat: { type: String, default: "short" },
  startDate: { type: [Date, String], default: null },
  startTime: { type: [Object, Array], default: null },
  hideOffsetDates: { type: Boolean, default: false },
  noToday: { type: Boolean, default: false },
  disabledWeekDays: { type: Array, default: () => [] },
  allowedDates: { type: Array, default: null },
  nowButtonLabel: { type: String, default: "Now" },
  markers: { type: Array, default: () => [] },
  escClose: { type: Boolean, default: true },
  spaceConfirm: { type: Boolean, default: true },
  monthChangeOnArrows: { type: Boolean, default: true },
  presetDates: { type: Array, default: () => [] },
  flow: { type: Array, default: () => [] },
  partialFlow: { type: Boolean, default: false },
  preventMinMaxNavigation: { type: Boolean, default: false },
  reverseYears: { type: Boolean, default: false },
  weekPicker: { type: Boolean, default: false },
  filters: { type: Object, default: () => ({}) },
  arrowNavigation: { type: Boolean, default: false },
  highlight: {
    type: [Function, Object],
    default: null
  },
  teleport: { type: [Boolean, String, Object], default: null },
  teleportCenter: { type: Boolean, default: false },
  locale: { type: String, default: "en-Us" },
  weekNumName: { type: String, default: "W" },
  weekStart: { type: [Number, String], default: 1 },
  weekNumbers: {
    type: [String, Function, Object],
    default: null
  },
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
  multiDates: { type: [Object, Boolean], default: false },
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
  range: { type: [Boolean, Object], default: false },
  uid: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  inline: { type: [Boolean, Object], default: false },
  textInput: { type: [Boolean, Object], default: false },
  sixWeeks: { type: [Boolean, String], default: false },
  actionRow: { type: Object, default: () => ({}) },
  focusStartDate: { type: Boolean, default: false },
  disabledTimes: { type: [Function, Array], default: void 0 },
  timePickerInline: { type: Boolean, default: false },
  calendar: { type: Function, default: null },
  config: { type: Object, default: void 0 },
  quarterPicker: { type: Boolean, default: false },
  yearFirst: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  onInternalModelChange: { type: [Function, Object], default: null },
  enableMinutes: { type: Boolean, default: true },
  ui: { type: Object, default: () => ({}) }
};
var rt = {
  ...ca,
  shadow: { type: Boolean, default: false },
  flowStep: { type: Number, default: 0 },
  internalModelValue: { type: [Date, Array], default: null },
  noOverlayFocus: { type: Boolean, default: false },
  collapse: { type: Boolean, default: false },
  menuWrapRef: { type: Object, default: null },
  getInputRect: { type: Function, default: () => ({}) },
  isTextInputDate: { type: Boolean, default: false }
};
var ql = ["title"];
var Xl = ["disabled"];
var Jl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ActionRow",
  props: {
    menuMount: { type: Boolean, default: false },
    calendarWidth: { type: Number, default: 0 },
    ...rt
  },
  emits: ["close-picker", "select-date", "select-now", "invalid-select"],
  setup(e, { emit: t }) {
    const l = t, a = e, {
      defaultedActionRow: n,
      defaultedPreviewFormat: i,
      defaultedMultiCalendars: d,
      defaultedTextInput: b,
      defaultedInline: c,
      defaultedRange: L,
      defaultedMultiDates: v
    } = Ce(a), { isTimeValid: _, isMonthValid: h2 } = kt(a), { buildMatrix: C } = bt(), H = ref(null), E = ref(null), U = ref(false), f = ref({}), B = ref(null), P = ref(null);
    onMounted(() => {
      a.arrowNavigation && C([Ie(H), Ie(E)], "actionRow"), Q(), window.addEventListener("resize", Q);
    }), onUnmounted(() => {
      window.removeEventListener("resize", Q);
    });
    const Q = () => {
      U.value = false, setTimeout(() => {
        var te, g;
        const y = (te = B.value) == null ? void 0 : te.getBoundingClientRect(), z = (g = P.value) == null ? void 0 : g.getBoundingClientRect();
        y && z && (f.value.maxWidth = `${z.width - y.width - 20}px`), U.value = true;
      }, 0);
    }, ae = computed(() => L.value.enabled && !L.value.partialRange && a.internalModelValue ? a.internalModelValue.length === 2 : true), oe = computed(
      () => !_.value(a.internalModelValue) || !h2.value(a.internalModelValue) || !ae.value
    ), ee = () => {
      const y = i.value;
      return a.timePicker || a.monthPicker, y(Ye(a.internalModelValue));
    }, S = () => {
      const y = a.internalModelValue;
      return d.value.count > 0 ? `${x(y[0])} - ${x(y[1])}` : [x(y[0]), x(y[1])];
    }, x = (y) => Bn(
      y,
      i.value,
      a.formatLocale,
      b.value.rangeSeparator,
      a.modelAuto,
      i.value
    ), Y = computed(() => !a.internalModelValue || !a.menuMount ? "" : typeof i.value == "string" ? Array.isArray(a.internalModelValue) ? a.internalModelValue.length === 2 && a.internalModelValue[1] ? S() : v.value.enabled ? a.internalModelValue.map((y) => `${x(y)}`) : a.modelAuto ? `${x(a.internalModelValue[0])}` : `${x(a.internalModelValue[0])} -` : x(a.internalModelValue) : ee()), q = () => v.value.enabled ? "; " : " - ", de = computed(
      () => Array.isArray(Y.value) ? Y.value.join(q()) : Y.value
    ), ve = () => {
      _.value(a.internalModelValue) && h2.value(a.internalModelValue) && ae.value ? l("select-date") : l("invalid-select");
    };
    return (y, z) => (openBlock(), createElementBlock("div", {
      ref_key: "actionRowRef",
      ref: P,
      class: "dp__action_row"
    }, [
      y.$slots["action-row"] ? renderSlot(y.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: y.internalModelValue,
        disabled: oe.value,
        selectDate: () => y.$emit("select-date"),
        closePicker: () => y.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(n).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: de.value,
          style: normalizeStyle(f.value)
        }, [
          y.$slots["action-preview"] && U.value ? renderSlot(y.$slots, "action-preview", {
            key: 0,
            value: y.internalModelValue
          }) : createCommentVNode("", true),
          !y.$slots["action-preview"] && U.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(de.value), 1)
          ], 64)) : createCommentVNode("", true)
        ], 12, ql)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "actionBtnContainer",
          ref: B,
          class: "dp__action_buttons",
          "data-dp-element": "action-row"
        }, [
          y.$slots["action-buttons"] ? renderSlot(y.$slots, "action-buttons", {
            key: 0,
            value: y.internalModelValue
          }) : createCommentVNode("", true),
          y.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(c).enabled && unref(n).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              ref_key: "cancelButtonRef",
              ref: H,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: z[0] || (z[0] = (te) => y.$emit("close-picker")),
              onKeydown: z[1] || (z[1] = (te) => unref(Ke)(te, () => y.$emit("close-picker")))
            }, toDisplayString(y.cancelText), 545)) : createCommentVNode("", true),
            unref(n).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: z[2] || (z[2] = (te) => y.$emit("select-now")),
              onKeydown: z[3] || (z[3] = (te) => unref(Ke)(te, () => y.$emit("select-now")))
            }, toDisplayString(y.nowButtonLabel), 33)) : createCommentVNode("", true),
            unref(n).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              ref_key: "selectButtonRef",
              ref: E,
              type: "button",
              class: "dp__action_button dp__action_select",
              disabled: oe.value,
              "data-test": "select-button",
              onKeydown: z[4] || (z[4] = (te) => unref(Ke)(te, () => ve())),
              onClick: ve
            }, toDisplayString(y.selectText), 41, Xl)) : createCommentVNode("", true)
          ], 64))
        ], 512)
      ], 64))
    ], 512));
  }
});
var Zl = ["role", "aria-label", "tabindex"];
var xl = { class: "dp__selection_grid_header" };
var er = ["aria-selected", "aria-disabled", "data-test", "onClick", "onKeydown", "onMouseover"];
var tr = ["aria-label"];
var qt = defineComponent({
  __name: "SelectionOverlay",
  props: {
    items: {},
    type: {},
    isLast: { type: Boolean },
    arrowNavigation: { type: Boolean },
    skipButtonRef: { type: Boolean },
    headerRefs: {},
    hideNavigation: {},
    escClose: { type: Boolean },
    useRelative: { type: Boolean },
    height: {},
    textInput: { type: [Boolean, Object] },
    config: {},
    noOverlayFocus: { type: Boolean },
    focusValue: {},
    menuWrapRef: {},
    ariaLabels: {},
    overlayLabel: {}
  },
  emits: ["selected", "toggle", "reset-flow", "hover-value"],
  setup(e, { expose: t, emit: l }) {
    const { setSelectionGrid: a, buildMultiLevelMatrix: n, setMonthPicker: i } = bt(), d = l, b = e, { defaultedAriaLabels: c, defaultedTextInput: L, defaultedConfig: v } = Ce(
      b
    ), { hideNavigationButtons: _ } = ma(), h2 = ref(false), C = ref(null), H = ref(null), E = ref([]), U = ref(), f = ref(null), B = ref(0), P = ref(null);
    onBeforeUpdate(() => {
      C.value = null;
    }), onMounted(() => {
      nextTick().then(() => q()), b.noOverlayFocus || ae(), Q(true);
    }), onUnmounted(() => Q(false));
    const Q = (I) => {
      var D;
      b.arrowNavigation && ((D = b.headerRefs) != null && D.length ? i(I) : a(I));
    }, ae = () => {
      var D;
      const I = Ie(H);
      I && (L.value.enabled || (C.value ? (D = C.value) == null || D.focus({ preventScroll: true }) : I.focus({ preventScroll: true })), h2.value = I.clientHeight < I.scrollHeight);
    }, oe = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !b.useRelative,
        "dp--overlay-relative": b.useRelative
      })
    ), ee = computed(
      () => b.useRelative ? { height: `${b.height}px`, width: "var(--dp-menu-min-width)" } : void 0
    ), S = computed(() => ({
      dp__overlay_col: true
    })), x = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: h2.value,
        dp__button_bottom: b.isLast
      })
    ), Y = computed(() => {
      var I, D;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((I = b.items) == null ? void 0 : I.length) <= 6,
        dp__container_block: ((D = b.items) == null ? void 0 : D.length) > 6
      };
    });
    watch(
      () => b.items,
      () => q(false),
      { deep: true }
    );
    const q = (I = true) => {
      nextTick().then(() => {
        const D = Ie(C), V = Ie(H), s = Ie(f), M = Ie(P), F = s ? s.getBoundingClientRect().height : 0;
        V && (V.getBoundingClientRect().height ? B.value = V.getBoundingClientRect().height - F : B.value = v.value.modeHeight - F), D && M && I && (M.scrollTop = D.offsetTop - M.offsetTop - (B.value / 2 - D.getBoundingClientRect().height) - F);
      });
    }, de = (I) => {
      I.disabled || d("selected", I.value);
    }, ve = () => {
      d("toggle"), d("reset-flow");
    }, y = () => {
      b.escClose && ve();
    }, z = (I, D, V, s) => {
      I && ((D.active || D.value === b.focusValue) && (C.value = I), b.arrowNavigation && (Array.isArray(E.value[V]) ? E.value[V][s] = I : E.value[V] = [I], te()));
    }, te = () => {
      var D, V;
      const I = (D = b.headerRefs) != null && D.length ? [b.headerRefs].concat(E.value) : E.value.concat([b.skipButtonRef ? [] : [f.value]]);
      n(Ye(I), (V = b.headerRefs) != null && V.length ? "monthPicker" : "selectionGrid");
    }, g = (I) => {
      b.arrowNavigation || yt(I, v.value, true);
    }, X = (I) => {
      U.value = I, d("hover-value", I);
    }, A = () => {
      if (ve(), !b.isLast) {
        const I = Ea(b.menuWrapRef ?? null, "action-row");
        if (I) {
          const D = Tn(I);
          D == null || D.focus();
        }
      }
    }, p = (I) => {
      switch (I.key) {
        case Pe.esc:
          return y();
        case Pe.arrowLeft:
          return g(I);
        case Pe.arrowRight:
          return g(I);
        case Pe.arrowUp:
          return g(I);
        case Pe.arrowDown:
          return g(I);
        default:
          return;
      }
    }, se = (I) => {
      if (I.key === Pe.enter) return ve();
      if (I.key === Pe.tab) return A();
    };
    return t({ focusGrid: ae }), (I, D) => {
      var V;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: H,
        class: normalizeClass(oe.value),
        style: normalizeStyle(ee.value),
        role: I.useRelative ? void 0 : "dialog",
        "aria-label": I.overlayLabel,
        tabindex: I.useRelative ? void 0 : "0",
        onKeydown: p,
        onClick: D[0] || (D[0] = withModifiers(() => {
        }, ["prevent"]))
      }, [
        createBaseVNode("div", {
          ref_key: "containerRef",
          ref: P,
          class: normalizeClass(Y.value),
          style: normalizeStyle({ "--dp-overlay-height": `${B.value}px` }),
          role: "grid"
        }, [
          createBaseVNode("div", xl, [
            renderSlot(I.$slots, "header")
          ]),
          I.$slots.overlay ? renderSlot(I.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(I.items, (s, M) => (openBlock(), createElementBlock("div", {
            key: M,
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: I.items.length >= 3 }]),
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(s, (F, u) => (openBlock(), createElementBlock("div", {
              key: F.value,
              ref_for: true,
              ref: (le) => z(le, F, M, u),
              role: "gridcell",
              class: normalizeClass(S.value),
              "aria-selected": F.active || void 0,
              "aria-disabled": F.disabled || void 0,
              tabindex: "0",
              "data-test": F.text,
              onClick: withModifiers((le) => de(F), ["prevent"]),
              onKeydown: (le) => unref(Ke)(le, () => de(F), true),
              onMouseover: (le) => X(F.value)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(F.className)
              }, [
                I.$slots.item ? renderSlot(I.$slots, "item", {
                  key: 0,
                  item: F
                }) : createCommentVNode("", true),
                I.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(F.text), 1)
                ], 64))
              ], 2)
            ], 42, er))), 128))
          ], 2))), 128))
        ], 6),
        I.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "toggleButton",
          ref: f,
          type: "button",
          "aria-label": (V = unref(c)) == null ? void 0 : V.toggleOverlay,
          class: normalizeClass(x.value),
          tabindex: "0",
          onClick: ve,
          onKeydown: se
        }, [
          renderSlot(I.$slots, "button-icon")
        ], 42, tr)), [
          [vShow, !unref(_)(I.hideNavigation, I.type)]
        ]) : createCommentVNode("", true)
      ], 46, Zl);
    };
  }
});
var fa = defineComponent({
  __name: "InstanceWrap",
  props: {
    multiCalendars: {},
    stretch: { type: Boolean },
    collapse: { type: Boolean }
  },
  setup(e) {
    const t = e, l = computed(
      () => t.multiCalendars > 0 ? [...Array(t.multiCalendars).keys()] : [0]
    ), a = computed(() => ({
      dp__instance_calendar: t.multiCalendars > 0
    }));
    return (n, i) => (openBlock(), createElementBlock("div", {
      class: normalizeClass({
        dp__menu_inner: !n.stretch,
        "dp--menu--inner-stretched": n.stretch,
        dp__flex_display: n.multiCalendars > 0,
        "dp--flex-display-collapsed": n.collapse
      })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(l.value, (d, b) => (openBlock(), createElementBlock("div", {
        key: d,
        class: normalizeClass(a.value)
      }, [
        renderSlot(n.$slots, "default", {
          instance: d,
          index: b
        })
      ], 2))), 128))
    ], 2));
  }
});
var ar = ["data-dp-element", "aria-label", "aria-disabled"];
var Ut = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ArrowBtn",
  props: {
    ariaLabel: {},
    elName: {},
    disabled: { type: Boolean }
  },
  emits: ["activate", "set-ref"],
  setup(e, { emit: t }) {
    const l = t, a = ref(null);
    return onMounted(() => l("set-ref", a)), (n, i) => (openBlock(), createElementBlock("button", {
      ref_key: "elRef",
      ref: a,
      type: "button",
      "data-dp-element": n.elName,
      class: "dp__btn dp--arrow-btn-nav",
      tabindex: "0",
      "aria-label": n.ariaLabel,
      "aria-disabled": n.disabled || void 0,
      onClick: i[0] || (i[0] = (d) => n.$emit("activate")),
      onKeydown: i[1] || (i[1] = (d) => unref(Ke)(d, () => n.$emit("activate"), true))
    }, [
      createBaseVNode("span", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: n.disabled }])
      }, [
        renderSlot(n.$slots, "default")
      ], 2)
    ], 40, ar));
  }
});
var nr = ["aria-label", "data-test"];
var En = defineComponent({
  __name: "YearModePicker",
  props: {
    ...rt,
    showYearPicker: { type: Boolean, default: false },
    items: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    isDisabled: { type: Function, default: () => false }
  },
  emits: ["toggle-year-picker", "year-select", "handle-year"],
  setup(e, { emit: t }) {
    const l = t, a = e, { showRightIcon: n, showLeftIcon: i } = ma(), { defaultedConfig: d, defaultedMultiCalendars: b, defaultedAriaLabels: c, defaultedTransitions: L, defaultedUI: v } = Ce(a), { showTransition: _, transitionName: h2 } = Xt(L), C = ref(false), H = (f = false, B) => {
      C.value = !C.value, l("toggle-year-picker", { flow: f, show: B });
    }, E = (f) => {
      C.value = false, l("year-select", f);
    }, U = (f = false) => {
      l("handle-year", f);
    };
    return (f, B) => {
      var P, Q, ae, oe, ee;
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", {
          class: normalizeClass(["dp--year-mode-picker", { "dp--hidden-el": C.value }])
        }, [
          unref(i)(unref(b), e.instance) ? (openBlock(), createBlock(Ut, {
            key: 0,
            ref: "mpPrevIconRef",
            "aria-label": (P = unref(c)) == null ? void 0 : P.prevYear,
            disabled: e.isDisabled(false),
            class: normalizeClass((Q = unref(v)) == null ? void 0 : Q.navBtnPrev),
            onActivate: B[0] || (B[0] = (S) => U(false))
          }, {
            default: withCtx(() => [
              f.$slots["arrow-left"] ? renderSlot(f.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
              f.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(za), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
          createBaseVNode("button", {
            ref: "mpYearButtonRef",
            class: "dp__btn dp--year-select",
            type: "button",
            "aria-label": `${e.year}-${(ae = unref(c)) == null ? void 0 : ae.openYearsOverlay}`,
            "data-test": `year-mode-btn-${e.instance}`,
            onClick: B[1] || (B[1] = () => H(false)),
            onKeydown: B[2] || (B[2] = withKeys(() => H(false), ["enter"]))
          }, [
            f.$slots.year ? renderSlot(f.$slots, "year", {
              key: 0,
              year: e.year
            }) : createCommentVNode("", true),
            f.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createTextVNode(toDisplayString(e.year), 1)
            ], 64))
          ], 40, nr),
          unref(n)(unref(b), e.instance) ? (openBlock(), createBlock(Ut, {
            key: 1,
            ref: "mpNextIconRef",
            "aria-label": (oe = unref(c)) == null ? void 0 : oe.nextYear,
            disabled: e.isDisabled(true),
            class: normalizeClass((ee = unref(v)) == null ? void 0 : ee.navBtnNext),
            onActivate: B[3] || (B[3] = (S) => U(true))
          }, {
            default: withCtx(() => [
              f.$slots["arrow-right"] ? renderSlot(f.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
              f.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ha), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true)
        ], 2),
        createVNode(Transition, {
          name: unref(h2)(e.showYearPicker),
          css: unref(_)
        }, {
          default: withCtx(() => {
            var S, x;
            return [
              e.showYearPicker ? (openBlock(), createBlock(qt, {
                key: 0,
                items: e.items,
                "text-input": f.textInput,
                "esc-close": f.escClose,
                config: f.config,
                "is-last": f.autoApply && !unref(d).keepActionRow,
                "hide-navigation": f.hideNavigation,
                "aria-labels": f.ariaLabels,
                "overlay-label": (x = (S = unref(c)) == null ? void 0 : S.yearPicker) == null ? void 0 : x.call(S, true),
                type: "year",
                onToggle: H,
                onSelected: B[4] || (B[4] = (Y) => E(Y))
              }, createSlots({
                "button-icon": withCtx(() => [
                  f.$slots["calendar-icon"] ? renderSlot(f.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                  f.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
                ]),
                _: 2
              }, [
                f.$slots["year-overlay-value"] ? {
                  name: "item",
                  fn: withCtx(({ item: Y }) => [
                    renderSlot(f.$slots, "year-overlay-value", {
                      text: Y.text,
                      value: Y.value
                    })
                  ]),
                  key: "0"
                } : void 0
              ]), 1032, ["items", "text-input", "esc-close", "config", "is-last", "hide-navigation", "aria-labels", "overlay-label"])) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ], 64);
    };
  }
});
var Xa = (e, t, l) => {
  if (t.value && Array.isArray(t.value))
    if (t.value.some((a) => Me(e, a))) {
      const a = t.value.filter((n) => !Me(n, e));
      t.value = a.length ? a : null;
    } else (l && +l > t.value.length || !l) && t.value.push(e);
  else
    t.value = [e];
};
var Ja = (e, t, l) => {
  let a = e.value ? e.value.slice() : [];
  return a.length === 2 && a[1] !== null && (a = []), a.length ? Oe(t, a[0]) ? (a.unshift(t), l("range-start", a[0]), l("range-start", a[1])) : (a[1] = t, l("range-end", t)) : (a = [t], l("range-start", t)), a;
};
var va = (e, t, l, a) => {
  e && (e[0] && e[1] && l && t("auto-apply"), e[0] && !e[1] && a && l && t("auto-apply"));
};
var Fn = (e) => {
  Array.isArray(e.value) && e.value.length <= 2 && e.range ? e.modelValue.value = e.value.map((t) => qe(G(t), e.timezone)) : Array.isArray(e.value) || (e.modelValue.value = qe(G(e.value), e.timezone));
};
var Ln = (e, t, l, a) => Array.isArray(t.value) && (t.value.length === 2 || t.value.length === 1 && a.value.partialRange) ? a.value.fixedStart && (Be(e, t.value[0]) || Me(e, t.value[0])) ? [t.value[0], e] : a.value.fixedEnd && (Oe(e, t.value[1]) || Me(e, t.value[1])) ? [e, t.value[1]] : (l("invalid-fixed-range", e), t.value) : [];
var zn = ({
  multiCalendars: e,
  range: t,
  highlight: l,
  propDates: a,
  calendars: n,
  modelValue: i,
  props: d,
  filters: b,
  year: c,
  month: L,
  emit: v
}) => {
  const _ = computed(() => Ka(d.yearRange, d.locale, d.reverseYears)), h2 = ref([false]), C = computed(() => (Y, q) => {
    const de = set(lt(/* @__PURE__ */ new Date()), {
      month: L.value(Y),
      year: c.value(Y)
    }), ve = q ? endOfYear(de) : startOfYear(de);
    return _n(
      ve,
      a.value.maxDate,
      a.value.minDate,
      d.preventMinMaxNavigation,
      q
    );
  }), H = () => Array.isArray(i.value) && e.value.solo && i.value[1], E = () => {
    for (let Y = 0; Y < e.value.count; Y++)
      if (Y === 0)
        n.value[Y] = n.value[0];
      else if (Y === e.value.count - 1 && H())
        n.value[Y] = {
          month: getMonth(i.value[1]),
          year: getYear(i.value[1])
        };
      else {
        const q = set(G(), n.value[Y - 1]);
        n.value[Y] = { month: getMonth(q), year: getYear(addYears(q, 1)) };
      }
  }, U = (Y) => {
    if (!Y) return E();
    const q = set(G(), n.value[Y]);
    return n.value[0].year = getYear(subYears(q, e.value.count - 1)), E();
  }, f = (Y, q) => {
    const de = differenceInYears(q, Y);
    return t.value.showLastInRange && de > 1 ? q : Y;
  }, B = (Y) => d.focusStartDate || e.value.solo ? Y[0] : Y[1] ? f(Y[0], Y[1]) : Y[0], P = () => {
    if (i.value) {
      const Y = Array.isArray(i.value) ? B(i.value) : i.value;
      n.value[0] = { month: getMonth(Y), year: getYear(Y) };
    }
  }, Q = () => {
    P(), e.value.count && E();
  };
  watch(i, (Y, q) => {
    d.isTextInputDate && JSON.stringify(Y ?? {}) !== JSON.stringify(q ?? {}) && Q();
  }), onMounted(() => {
    Q();
  });
  const ae = (Y, q) => {
    n.value[q].year = Y, v("update-month-year", { instance: q, year: Y, month: n.value[q].month }), e.value.count && !e.value.solo && U(q);
  }, oe = computed(() => (Y) => Yt(_.value, (q) => {
    var z;
    const de = c.value(Y) === q.value, ve = Gt(
      q.value,
      It(a.value.minDate),
      It(a.value.maxDate)
    ) || ((z = b.value.years) == null ? void 0 : z.includes(c.value(Y))), y = qa(l.value, q.value);
    return { active: de, disabled: ve, highlighted: y };
  })), ee = (Y, q) => {
    ae(Y, q), x(q);
  }, S = (Y, q = false) => {
    if (!C.value(Y, q)) {
      const de = q ? c.value(Y) + 1 : c.value(Y) - 1;
      ae(de, Y);
    }
  }, x = (Y, q = false, de) => {
    q || v("reset-flow"), de !== void 0 ? h2.value[Y] = de : h2.value[Y] = !h2.value[Y], h2.value[Y] ? v("overlay-toggle", { open: true, overlay: He.year }) : (v("overlay-closed"), v("overlay-toggle", { open: false, overlay: He.year }));
  };
  return {
    isDisabled: C,
    groupedYears: oe,
    showYearPicker: h2,
    selectYear: ae,
    toggleYearPicker: x,
    handleYearSelect: ee,
    handleYear: S
  };
};
var lr = (e, t) => {
  const {
    defaultedMultiCalendars: l,
    defaultedAriaLabels: a,
    defaultedTransitions: n,
    defaultedConfig: i,
    defaultedRange: d,
    defaultedHighlight: b,
    propDates: c,
    defaultedTz: L,
    defaultedFilters: v,
    defaultedMultiDates: _
  } = Ce(e), h2 = () => {
    e.isTextInputDate && Q(getYear(G(e.startDate)), 0);
  }, { modelValue: C, year: H, month: E, calendars: U } = Jt(e, t, h2), f = computed(() => $n(e.formatLocale, e.locale, e.monthNameFormat)), B = ref(null), { checkMinMaxRange: P } = kt(e), {
    selectYear: Q,
    groupedYears: ae,
    showYearPicker: oe,
    toggleYearPicker: ee,
    handleYearSelect: S,
    handleYear: x,
    isDisabled: Y
  } = zn({
    modelValue: C,
    multiCalendars: l,
    range: d,
    highlight: b,
    calendars: U,
    year: H,
    propDates: c,
    month: E,
    filters: v,
    props: e,
    emit: t
  });
  onMounted(() => {
    e.startDate && (C.value && e.focusStartDate || !C.value) && Q(getYear(G(e.startDate)), 0);
  });
  const q = (M) => M ? { month: getMonth(M), year: getYear(M) } : { month: null, year: null }, de = () => C.value ? Array.isArray(C.value) ? C.value.map((M) => q(M)) : q(C.value) : q(), ve = (M, F) => {
    const u = U.value[M], le = de();
    return Array.isArray(le) ? le.some((me) => me.year === (u == null ? void 0 : u.year) && me.month === F) : (u == null ? void 0 : u.year) === le.year && F === le.month;
  }, y = (M, F, u) => {
    var me, $;
    const le = de();
    return Array.isArray(le) ? H.value(F) === ((me = le[u]) == null ? void 0 : me.year) && M === (($ = le[u]) == null ? void 0 : $.month) : false;
  }, z = (M, F) => {
    if (d.value.enabled) {
      const u = de();
      if (Array.isArray(C.value) && Array.isArray(u)) {
        const le = y(M, F, 0) || y(M, F, 1), me = dt(lt(G()), M, H.value(F));
        return da(C.value, B.value, me) && !le;
      }
      return false;
    }
    return false;
  }, te = computed(() => (M) => Yt(f.value, (F) => {
    var ge;
    const u = ve(M, F.value), le = Gt(
      F.value,
      Pn(H.value(M), c.value.minDate),
      Rn(H.value(M), c.value.maxDate)
    ) || Rl(c.value.disabledDates, H.value(M)).includes(F.value) || ((ge = v.value.months) == null ? void 0 : ge.includes(F.value)), me = z(F.value, M), $ = Yn(b.value, F.value, H.value(M));
    return { active: u, disabled: le, isBetween: me, highlighted: $ };
  })), g = (M, F) => dt(lt(G()), M, H.value(F)), X = (M, F) => {
    const u = C.value ? C.value : lt(/* @__PURE__ */ new Date());
    C.value = dt(u, M, H.value(F)), t("auto-apply"), t("update-flow-step");
  }, A = (M, F) => {
    const u = g(M, F);
    d.value.fixedEnd || d.value.fixedStart ? C.value = Ln(u, C, t, d) : C.value ? P(u, C.value) && (C.value = Ja(C, g(M, F), t)) : C.value = [g(M, F)], nextTick().then(() => {
      va(C.value, t, e.autoApply, e.modelAuto);
    });
  }, p = (M, F) => {
    Xa(g(M, F), C, _.value.limit), t("auto-apply", true);
  }, se = (M, F) => (U.value[F].month = M, D(F, U.value[F].year, M), _.value.enabled ? p(M, F) : d.value.enabled ? A(M, F) : X(M, F)), I = (M, F) => {
    Q(M, F), D(F, M, null);
  }, D = (M, F, u) => {
    let le = u;
    if (!le && le !== 0) {
      const me = de();
      le = Array.isArray(me) ? me[M].month : me.month;
    }
    t("update-month-year", { instance: M, year: F, month: le });
  };
  return {
    groupedMonths: te,
    groupedYears: ae,
    year: H,
    isDisabled: Y,
    defaultedMultiCalendars: l,
    defaultedAriaLabels: a,
    defaultedTransitions: n,
    defaultedConfig: i,
    showYearPicker: oe,
    modelValue: C,
    presetDate: (M, F) => {
      Fn({
        value: M,
        modelValue: C,
        range: d.value.enabled,
        timezone: F ? void 0 : L.value.timezone
      }), t("auto-apply");
    },
    setHoverDate: (M, F) => {
      B.value = g(M, F);
    },
    selectMonth: se,
    selectYear: I,
    toggleYearPicker: ee,
    handleYearSelect: S,
    handleYear: x,
    getModelMonthYear: de
  };
};
var rr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "MonthPicker",
  props: {
    ...rt
  },
  emits: [
    "update:internal-model-value",
    "overlay-closed",
    "reset-flow",
    "range-start",
    "range-end",
    "auto-apply",
    "update-month-year",
    "update-flow-step",
    "mount",
    "invalid-fixed-range",
    "overlay-toggle"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = useSlots(), i = Je(n, "yearMode"), d = e;
    onMounted(() => {
      d.shadow || a("mount", null);
    });
    const {
      groupedMonths: b,
      groupedYears: c,
      year: L,
      isDisabled: v,
      defaultedMultiCalendars: _,
      defaultedConfig: h2,
      showYearPicker: C,
      modelValue: H,
      presetDate: E,
      setHoverDate: U,
      selectMonth: f,
      selectYear: B,
      toggleYearPicker: P,
      handleYearSelect: Q,
      handleYear: ae,
      getModelMonthYear: oe
    } = lr(d, a);
    return t({ getSidebarProps: () => ({
      modelValue: H,
      year: L,
      getModelMonthYear: oe,
      selectMonth: f,
      selectYear: B,
      handleYear: ae
    }), presetDate: E, toggleYearPicker: (S) => P(0, S) }), (S, x) => (openBlock(), createBlock(fa, {
      "multi-calendars": unref(_).count,
      collapse: S.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: Y }) => [
        S.$slots["top-extra"] ? renderSlot(S.$slots, "top-extra", {
          key: 0,
          value: S.internalModelValue
        }) : createCommentVNode("", true),
        S.$slots["month-year"] ? renderSlot(S.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
          year: unref(L),
          months: unref(b)(Y),
          years: unref(c)(Y),
          selectMonth: unref(f),
          selectYear: unref(B),
          instance: Y
        }))) : (openBlock(), createBlock(qt, {
          key: 2,
          items: unref(b)(Y),
          "arrow-navigation": S.arrowNavigation,
          "is-last": S.autoApply && !unref(h2).keepActionRow,
          "esc-close": S.escClose,
          height: unref(h2).modeHeight,
          config: S.config,
          "no-overlay-focus": !!(S.noOverlayFocus || S.textInput),
          "use-relative": "",
          type: "month",
          onSelected: (q) => unref(f)(q, Y),
          onHoverValue: (q) => unref(U)(q, Y)
        }, createSlots({
          header: withCtx(() => [
            createVNode(En, mergeProps(S.$props, {
              items: unref(c)(Y),
              instance: Y,
              "show-year-picker": unref(C)[Y],
              year: unref(L)(Y),
              "is-disabled": (q) => unref(v)(Y, q),
              onHandleYear: (q) => unref(ae)(Y, q),
              onYearSelect: (q) => unref(Q)(q, Y),
              onToggleYearPicker: (q) => unref(P)(Y, q == null ? void 0 : q.flow, q == null ? void 0 : q.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(i), (q, de) => ({
                name: q,
                fn: withCtx((ve) => [
                  renderSlot(S.$slots, q, normalizeProps(guardReactiveProps(ve)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          _: 2
        }, [
          S.$slots["month-overlay-value"] ? {
            name: "item",
            fn: withCtx(({ item: q }) => [
              renderSlot(S.$slots, "month-overlay-value", {
                text: q.text,
                value: q.value
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["items", "arrow-navigation", "is-last", "esc-close", "height", "config", "no-overlay-focus", "onSelected", "onHoverValue"]))
      ]),
      _: 3
    }, 8, ["multi-calendars", "collapse"]));
  }
});
var or = (e, t) => {
  const l = () => {
    e.isTextInputDate && (v.value = getYear(G(e.startDate)));
  }, { modelValue: a } = Jt(e, t, l), n = ref(null), { defaultedHighlight: i, defaultedMultiDates: d, defaultedFilters: b, defaultedRange: c, propDates: L } = Ce(e), v = ref();
  onMounted(() => {
    e.startDate && (a.value && e.focusStartDate || !a.value) && (v.value = getYear(G(e.startDate)));
  });
  const _ = (f) => Array.isArray(a.value) ? a.value.some((B) => getYear(B) === f) : a.value ? getYear(a.value) === f : false, h2 = (f) => c.value.enabled && Array.isArray(a.value) ? da(a.value, n.value, H(f)) : false, C = computed(() => Yt(Ka(e.yearRange, e.locale, e.reverseYears), (f) => {
    const B = _(f.value), P = Gt(
      f.value,
      It(L.value.minDate),
      It(L.value.maxDate)
    ) || b.value.years.includes(f.value), Q = h2(f.value) && !B, ae = qa(i.value, f.value);
    return { active: B, disabled: P, isBetween: Q, highlighted: ae };
  })), H = (f) => setYear(lt(startOfYear(/* @__PURE__ */ new Date())), f);
  return {
    groupedYears: C,
    modelValue: a,
    focusYear: v,
    setHoverValue: (f) => {
      n.value = setYear(lt(/* @__PURE__ */ new Date()), f);
    },
    selectYear: (f) => {
      var B;
      if (t("update-month-year", { instance: 0, year: f }), d.value.enabled)
        return a.value ? Array.isArray(a.value) && (((B = a.value) == null ? void 0 : B.map((Q) => getYear(Q))).includes(f) ? a.value = a.value.filter((Q) => getYear(Q) !== f) : a.value.push(setYear(Ge(G()), f))) : a.value = [setYear(Ge(startOfYear(G())), f)], t("auto-apply", true);
      c.value.enabled ? (a.value = Ja(a, H(f), t), nextTick().then(() => {
        va(a.value, t, e.autoApply, e.modelAuto);
      })) : (a.value = H(f), t("auto-apply"));
    }
  };
};
var sr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "YearPicker",
  props: {
    ...rt
  },
  emits: [
    "update:internal-model-value",
    "reset-flow",
    "range-start",
    "range-end",
    "auto-apply",
    "update-month-year"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, { groupedYears: i, modelValue: d, focusYear: b, selectYear: c, setHoverValue: L } = or(n, a), { defaultedConfig: v } = Ce(n);
    return t({ getSidebarProps: () => ({
      modelValue: d,
      selectYear: c
    }) }), (h2, C) => (openBlock(), createElementBlock("div", null, [
      h2.$slots["top-extra"] ? renderSlot(h2.$slots, "top-extra", {
        key: 0,
        value: h2.internalModelValue
      }) : createCommentVNode("", true),
      h2.$slots["month-year"] ? renderSlot(h2.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
        years: unref(i),
        selectYear: unref(c)
      }))) : (openBlock(), createBlock(qt, {
        key: 2,
        items: unref(i),
        "is-last": h2.autoApply && !unref(v).keepActionRow,
        height: unref(v).modeHeight,
        config: h2.config,
        "no-overlay-focus": !!(h2.noOverlayFocus || h2.textInput),
        "focus-value": unref(b),
        type: "year",
        "use-relative": "",
        onSelected: unref(c),
        onHoverValue: unref(L)
      }, createSlots({ _: 2 }, [
        h2.$slots["year-overlay-value"] ? {
          name: "item",
          fn: withCtx(({ item: H }) => [
            renderSlot(h2.$slots, "year-overlay-value", {
              text: H.text,
              value: H.value
            })
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["items", "is-last", "height", "config", "no-overlay-focus", "focus-value", "onSelected", "onHoverValue"]))
    ]));
  }
});
var ur = {
  key: 0,
  class: "dp__time_input"
};
var ir = ["data-test", "aria-label", "onKeydown", "onClick", "onMousedown"];
var dr = ["aria-label", "disabled", "data-test", "onKeydown", "onClick"];
var cr = ["data-test", "aria-label", "onKeydown", "onClick", "onMousedown"];
var fr = { key: 0 };
var vr = ["aria-label"];
var mr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimeInput",
  props: {
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 },
    seconds: { type: Number, default: 0 },
    closeTimePickerBtn: { type: Object, default: null },
    order: { type: Number, default: 0 },
    disabledTimesConfig: { type: Function, default: null },
    validateTime: { type: Function, default: () => false },
    ...rt
  },
  emits: [
    "set-hours",
    "set-minutes",
    "update:hours",
    "update:minutes",
    "update:seconds",
    "reset-flow",
    "mounted",
    "overlay-closed",
    "overlay-opened",
    "am-pm-change"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, { setTimePickerElements: i, setTimePickerBackRef: d } = bt(), { defaultedAriaLabels: b, defaultedTransitions: c, defaultedFilters: L, defaultedConfig: v, defaultedRange: _ } = Ce(n), { transitionName: h2, showTransition: C } = Xt(c), H = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), E = ref("AM"), U = ref(null), f = ref([]), B = ref(), P = ref(false);
    onMounted(() => {
      a("mounted");
    });
    const Q = (r) => set(/* @__PURE__ */ new Date(), {
      hours: r.hours,
      minutes: r.minutes,
      seconds: n.enableSeconds ? r.seconds : 0,
      milliseconds: 0
    }), ae = computed(
      () => (r) => g(r, n[r]) || ee(r, n[r])
    ), oe = computed(() => ({ hours: n.hours, minutes: n.minutes, seconds: n.seconds })), ee = (r, R) => _.value.enabled && !_.value.disableTimeRangeValidation ? !n.validateTime(r, R) : false, S = (r, R) => {
      if (_.value.enabled && !_.value.disableTimeRangeValidation) {
        const O = R ? +n[`${r}Increment`] : -+n[`${r}Increment`], W = n[r] + O;
        return !n.validateTime(r, W);
      }
      return false;
    }, x = computed(() => (r) => !I(+n[r] + +n[`${r}Increment`], r) || S(r, true)), Y = computed(() => (r) => !I(+n[r] - +n[`${r}Increment`], r) || S(r, false)), q = (r, R) => add(set(G(), r), R), de = (r, R) => sub(set(G(), r), R), ve = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !n.timePickerInline,
        dp__time_col_reg_block: !n.enableSeconds && n.is24 && !n.timePickerInline,
        dp__time_col_reg_inline: !n.enableSeconds && n.is24 && n.timePickerInline,
        dp__time_col_reg_with_button: !n.enableSeconds && !n.is24,
        dp__time_col_sec: n.enableSeconds && n.is24,
        dp__time_col_sec_with_button: n.enableSeconds && !n.is24
      })
    ), y = computed(() => {
      const r = [{ type: "hours" }];
      return n.enableMinutes && r.push({ type: "", separator: true }, {
        type: "minutes"
      }), n.enableSeconds && r.push({ type: "", separator: true }, {
        type: "seconds"
      }), r;
    }), z = computed(() => y.value.filter((r) => !r.separator)), te = computed(() => (r) => {
      if (r === "hours") {
        const R = u(+n.hours);
        return { text: R < 10 ? `0${R}` : `${R}`, value: R };
      }
      return { text: n[r] < 10 ? `0${n[r]}` : `${n[r]}`, value: n[r] };
    }), g = (r, R) => {
      var W;
      if (!n.disabledTimesConfig) return false;
      const O = n.disabledTimesConfig(n.order, r === "hours" ? R : void 0);
      return O[r] ? !!((W = O[r]) != null && W.includes(R)) : true;
    }, X = (r, R) => R !== "hours" || E.value === "AM" ? r : r + 12, A = (r) => {
      const R = n.is24 ? 24 : 12, O = r === "hours" ? R : 60, W = +n[`${r}GridIncrement`], ue = r === "hours" && !n.is24 ? W : 0, w = [];
      for (let N = ue; N < O; N += W)
        w.push({ value: n.is24 ? N : X(N, r), text: N < 10 ? `0${N}` : `${N}` });
      return r === "hours" && !n.is24 && w.unshift({ value: E.value === "PM" ? 12 : 0, text: "12" }), Yt(w, (N) => ({ active: false, disabled: L.value.times[r].includes(N.value) || !I(N.value, r) || g(r, N.value) || ee(r, N.value) }));
    }, p = (r) => r >= 0 ? r : 59, se = (r) => r >= 0 ? r : 23, I = (r, R) => {
      const O = n.minTime ? Q(Aa(n.minTime)) : null, W = n.maxTime ? Q(Aa(n.maxTime)) : null, ue = Q(
        Aa(
          oe.value,
          R,
          R === "minutes" || R === "seconds" ? p(r) : se(r)
        )
      );
      return O && W ? (isBefore(ue, W) || isEqual(ue, W)) && (isAfter(ue, O) || isEqual(ue, O)) : O ? isAfter(ue, O) || isEqual(ue, O) : W ? isBefore(ue, W) || isEqual(ue, W) : true;
    }, D = (r) => n[`no${r[0].toUpperCase() + r.slice(1)}Overlay`], V = (r) => {
      D(r) || (H[r] = !H[r], H[r] ? (P.value = true, a("overlay-opened", r)) : (P.value = false, a("overlay-closed", r)));
    }, s = (r) => r === "hours" ? getHours : r === "minutes" ? getMinutes : getSeconds, M = () => {
      B.value && clearTimeout(B.value);
    }, F = (r, R = true, O) => {
      const W = R ? q : de, ue = R ? +n[`${r}Increment`] : -+n[`${r}Increment`];
      I(+n[r] + ue, r) && a(
        `update:${r}`,
        s(r)(W({ [r]: +n[r] }, { [r]: +n[`${r}Increment`] }))
      ), !(O != null && O.keyboard) && v.value.timeArrowHoldThreshold && (B.value = setTimeout(() => {
        F(r, R);
      }, v.value.timeArrowHoldThreshold));
    }, u = (r) => n.is24 ? r : (r >= 12 ? E.value = "PM" : E.value = "AM", gl(r)), le = () => {
      E.value === "PM" ? (E.value = "AM", a("update:hours", n.hours - 12)) : (E.value = "PM", a("update:hours", n.hours + 12)), a("am-pm-change", E.value);
    }, me = (r) => {
      H[r] = true;
    }, $ = (r, R, O) => {
      if (r && n.arrowNavigation) {
        Array.isArray(f.value[R]) ? f.value[R][O] = r : f.value[R] = [r];
        const W = f.value.reduce(
          (ue, w) => w.map((N, ce) => [...ue[ce] || [], w[ce]]),
          []
        );
        d(n.closeTimePickerBtn), U.value && (W[1] = W[1].concat(U.value)), i(W, n.order);
      }
    }, ge = (r, R) => (V(r), a(`update:${r}`, R));
    return t({ openChildCmp: me }), (r, R) => {
      var O;
      return r.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", ur, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(y.value, (W, ue) => {
          var w, N, ce;
          return openBlock(), createElementBlock("div", {
            key: ue,
            class: normalizeClass(ve.value)
          }, [
            W.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              P.value ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createTextVNode(":")
              ], 64))
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                ref_for: true,
                ref: (he) => $(he, ue, 0),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !r.timePickerInline,
                  dp__inc_dec_button_inline: r.timePickerInline,
                  dp__tp_inline_btn_top: r.timePickerInline,
                  dp__inc_dec_button_disabled: x.value(W.type),
                  "dp--hidden-el": P.value
                }),
                "data-test": `${W.type}-time-inc-btn-${n.order}`,
                "aria-label": (w = unref(b)) == null ? void 0 : w.incrementValue(W.type),
                tabindex: "0",
                onKeydown: (he) => unref(Ke)(he, () => F(W.type, true, { keyboard: true }), true),
                onClick: (he) => unref(v).timeArrowHoldThreshold ? void 0 : F(W.type, true),
                onMousedown: (he) => unref(v).timeArrowHoldThreshold ? F(W.type, true) : void 0,
                onMouseup: M
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  r.$slots["tp-inline-arrow-up"] ? renderSlot(r.$slots, "tp-inline-arrow-up", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    R[2] || (R[2] = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1)),
                    R[3] || (R[3] = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1))
                  ], 64))
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  r.$slots["arrow-up"] ? renderSlot(r.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  r.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Va), { key: 1 }))
                ], 64))
              ], 42, ir),
              createBaseVNode("button", {
                ref_for: true,
                ref: (he) => $(he, ue, 1),
                type: "button",
                "aria-label": `${te.value(W.type).text}-${(N = unref(b)) == null ? void 0 : N.openTpOverlay(W.type)}`,
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !r.timePickerInline,
                  dp__time_display_inline: r.timePickerInline,
                  "dp--time-invalid": ae.value(W.type),
                  "dp--time-overlay-btn": !ae.value(W.type),
                  "dp--hidden-el": P.value
                }),
                disabled: D(W.type),
                tabindex: "0",
                "data-test": `${W.type}-toggle-overlay-btn-${n.order}`,
                onKeydown: (he) => unref(Ke)(he, () => V(W.type), true),
                onClick: (he) => V(W.type)
              }, [
                r.$slots[W.type] ? renderSlot(r.$slots, W.type, {
                  key: 0,
                  text: te.value(W.type).text,
                  value: te.value(W.type).value
                }) : createCommentVNode("", true),
                r.$slots[W.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(te.value(W.type).text), 1)
                ], 64))
              ], 42, dr),
              createBaseVNode("button", {
                ref_for: true,
                ref: (he) => $(he, ue, 2),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !r.timePickerInline,
                  dp__inc_dec_button_inline: r.timePickerInline,
                  dp__tp_inline_btn_bottom: r.timePickerInline,
                  dp__inc_dec_button_disabled: Y.value(W.type),
                  "dp--hidden-el": P.value
                }),
                "data-test": `${W.type}-time-dec-btn-${n.order}`,
                "aria-label": (ce = unref(b)) == null ? void 0 : ce.decrementValue(W.type),
                tabindex: "0",
                onKeydown: (he) => unref(Ke)(he, () => F(W.type, false, { keyboard: true }), true),
                onClick: (he) => unref(v).timeArrowHoldThreshold ? void 0 : F(W.type, false),
                onMousedown: (he) => unref(v).timeArrowHoldThreshold ? F(W.type, false) : void 0,
                onMouseup: M
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  r.$slots["tp-inline-arrow-down"] ? renderSlot(r.$slots, "tp-inline-arrow-down", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    R[4] || (R[4] = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1)),
                    R[5] || (R[5] = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1))
                  ], 64))
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  r.$slots["arrow-down"] ? renderSlot(r.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                  r.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wa), { key: 1 }))
                ], 64))
              ], 42, cr)
            ], 64))
          ], 2);
        }), 128)),
        r.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", fr, [
          r.$slots["am-pm-button"] ? renderSlot(r.$slots, "am-pm-button", {
            key: 0,
            toggle: le,
            value: E.value
          }) : createCommentVNode("", true),
          r.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: U,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (O = unref(b)) == null ? void 0 : O.amPmButton,
            tabindex: "0",
            onClick: le,
            onKeydown: R[0] || (R[0] = (W) => unref(Ke)(W, () => le(), true))
          }, toDisplayString(E.value), 41, vr))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(z.value, (W, ue) => (openBlock(), createBlock(Transition, {
          key: ue,
          name: unref(h2)(H[W.type]),
          css: unref(C)
        }, {
          default: withCtx(() => {
            var w, N;
            return [
              H[W.type] ? (openBlock(), createBlock(qt, {
                key: 0,
                items: A(W.type),
                "is-last": r.autoApply && !unref(v).keepActionRow,
                "esc-close": r.escClose,
                type: W.type,
                "text-input": r.textInput,
                config: r.config,
                "arrow-navigation": r.arrowNavigation,
                "aria-labels": r.ariaLabels,
                "overlay-label": (N = (w = unref(b)).timeOverlay) == null ? void 0 : N.call(w, W.type),
                onSelected: (ce) => ge(W.type, ce),
                onToggle: (ce) => V(W.type),
                onResetFlow: R[1] || (R[1] = (ce) => r.$emit("reset-flow"))
              }, createSlots({
                "button-icon": withCtx(() => [
                  r.$slots["clock-icon"] ? renderSlot(r.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                  r.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(r.timePickerInline ? unref(Et) : unref(Ua)), { key: 1 }))
                ]),
                _: 2
              }, [
                r.$slots[`${W.type}-overlay-value`] ? {
                  name: "item",
                  fn: withCtx(({ item: ce }) => [
                    renderSlot(r.$slots, `${W.type}-overlay-value`, {
                      text: ce.text,
                      value: ce.value
                    })
                  ]),
                  key: "0"
                } : void 0,
                r.$slots[`${W.type}-overlay-header`] ? {
                  name: "header",
                  fn: withCtx(() => [
                    renderSlot(r.$slots, `${W.type}-overlay-header`, {
                      toggle: () => V(W.type)
                    })
                  ]),
                  key: "1"
                } : void 0
              ]), 1032, ["items", "is-last", "esc-close", "type", "text-input", "config", "arrow-navigation", "aria-labels", "overlay-label", "onSelected", "onToggle"])) : createCommentVNode("", true)
            ];
          }),
          _: 2
        }, 1032, ["name", "css"]))), 128))
      ]));
    };
  }
});
var pr = { class: "dp--tp-wrap" };
var yr = ["aria-label", "tabindex"];
var gr = ["role", "aria-label", "tabindex"];
var hr = ["aria-label"];
var Hn = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePicker",
  props: {
    hours: { type: [Number, Array], default: 0 },
    minutes: { type: [Number, Array], default: 0 },
    seconds: { type: [Number, Array], default: 0 },
    disabledTimesConfig: { type: Function, default: null },
    validateTime: {
      type: Function,
      default: () => false
    },
    ...rt
  },
  emits: [
    "update:hours",
    "update:minutes",
    "update:seconds",
    "mount",
    "reset-flow",
    "overlay-opened",
    "overlay-closed",
    "am-pm-change"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, { buildMatrix: i, setTimePicker: d } = bt(), b = useSlots(), { defaultedTransitions: c, defaultedAriaLabels: L, defaultedTextInput: v, defaultedConfig: _, defaultedRange: h2 } = Ce(n), { transitionName: C, showTransition: H } = Xt(c), { hideNavigationButtons: E } = ma(), U = ref(null), f = ref(null), B = ref([]), P = ref(null), Q = ref(false);
    onMounted(() => {
      a("mount"), !n.timePicker && n.arrowNavigation ? i([Ie(U.value)], "time") : d(true, n.timePicker);
    });
    const ae = computed(() => h2.value.enabled && n.modelAuto ? An(n.internalModelValue) : true), oe = ref(false), ee = (A) => ({
      hours: Array.isArray(n.hours) ? n.hours[A] : n.hours,
      minutes: Array.isArray(n.minutes) ? n.minutes[A] : n.minutes,
      seconds: Array.isArray(n.seconds) ? n.seconds[A] : n.seconds
    }), S = computed(() => {
      const A = [];
      if (h2.value.enabled)
        for (let p = 0; p < 2; p++)
          A.push(ee(p));
      else
        A.push(ee(0));
      return A;
    }), x = (A, p = false, se = "") => {
      p || a("reset-flow"), oe.value = A, a(A ? "overlay-opened" : "overlay-closed", He.time), n.arrowNavigation && d(A), nextTick(() => {
        se !== "" && B.value[0] && B.value[0].openChildCmp(se);
      });
    }, Y = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: n.autoApply && !_.value.keepActionRow
    })), q = Je(b, "timePicker"), de = (A, p, se) => h2.value.enabled ? p === 0 ? [A, S.value[1][se]] : [S.value[0][se], A] : A, ve = (A) => {
      a("update:hours", A);
    }, y = (A) => {
      a("update:minutes", A);
    }, z = (A) => {
      a("update:seconds", A);
    }, te = () => {
      if (P.value && !v.value.enabled && !n.noOverlayFocus) {
        const A = Tn(P.value);
        A && A.focus({ preventScroll: true });
      }
    }, g = (A) => {
      Q.value = false, a("overlay-closed", A);
    }, X = (A) => {
      Q.value = true, a("overlay-opened", A);
    };
    return t({ toggleTimePicker: x }), (A, p) => {
      var se;
      return openBlock(), createElementBlock("div", pr, [
        !A.timePicker && !A.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "openTimePickerBtn",
          ref: U,
          type: "button",
          class: normalizeClass({ ...Y.value, "dp--hidden-el": oe.value }),
          "aria-label": (se = unref(L)) == null ? void 0 : se.openTimePicker,
          tabindex: A.noOverlayFocus ? void 0 : 0,
          "data-test": "open-time-picker-btn",
          onKeydown: p[0] || (p[0] = (I) => unref(Ke)(I, () => x(true))),
          onClick: p[1] || (p[1] = (I) => x(true))
        }, [
          A.$slots["clock-icon"] ? renderSlot(A.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          A.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ua), { key: 1 }))
        ], 42, yr)), [
          [vShow, !unref(E)(A.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(C)(oe.value),
          css: unref(H) && !A.timePickerInline
        }, {
          default: withCtx(() => {
            var I, D;
            return [
              oe.value || A.timePicker || A.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "overlayRef",
                ref: P,
                role: A.timePickerInline ? void 0 : "dialog",
                class: normalizeClass({
                  dp__overlay: !A.timePickerInline,
                  "dp--overlay-absolute": !n.timePicker && !A.timePickerInline,
                  "dp--overlay-relative": n.timePicker
                }),
                style: normalizeStyle(A.timePicker ? { height: `${unref(_).modeHeight}px` } : void 0),
                "aria-label": (I = unref(L)) == null ? void 0 : I.timePicker,
                tabindex: A.timePickerInline ? void 0 : 0
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(
                    A.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
                  ),
                  style: { display: "flex" }
                }, [
                  A.$slots["time-picker-overlay"] ? renderSlot(A.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e.hours,
                    minutes: e.minutes,
                    seconds: e.seconds,
                    setHours: ve,
                    setMinutes: y,
                    setSeconds: z
                  }) : createCommentVNode("", true),
                  A.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(A.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(S.value, (V, s) => withDirectives((openBlock(), createBlock(mr, mergeProps({
                      key: s,
                      ref_for: true
                    }, {
                      ...A.$props,
                      order: s,
                      hours: V.hours,
                      minutes: V.minutes,
                      seconds: V.seconds,
                      closeTimePickerBtn: f.value,
                      disabledTimesConfig: e.disabledTimesConfig,
                      disabled: s === 0 ? unref(h2).fixedStart : unref(h2).fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: B,
                      "validate-time": (M, F) => e.validateTime(M, de(F, s, M)),
                      "onUpdate:hours": (M) => ve(de(M, s, "hours")),
                      "onUpdate:minutes": (M) => y(de(M, s, "minutes")),
                      "onUpdate:seconds": (M) => z(de(M, s, "seconds")),
                      onMounted: te,
                      onOverlayClosed: g,
                      onOverlayOpened: X,
                      onAmPmChange: p[2] || (p[2] = (M) => A.$emit("am-pm-change", M))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(q), (M, F) => ({
                        name: M,
                        fn: withCtx((u) => [
                          renderSlot(A.$slots, M, mergeProps({ ref_for: true }, u))
                        ])
                      }))
                    ]), 1040, ["validate-time", "onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, s === 0 ? true : ae.value]
                    ])), 128))
                  ], 2)),
                  !A.timePicker && !A.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: f,
                    type: "button",
                    class: normalizeClass({ ...Y.value, "dp--hidden-el": Q.value }),
                    "aria-label": (D = unref(L)) == null ? void 0 : D.closeTimePicker,
                    tabindex: "0",
                    onKeydown: p[3] || (p[3] = (V) => unref(Ke)(V, () => x(false))),
                    onClick: p[4] || (p[4] = (V) => x(false))
                  }, [
                    A.$slots["calendar-icon"] ? renderSlot(A.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    A.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
                  ], 42, hr)), [
                    [vShow, !unref(E)(A.hideNavigation, "time")]
                  ]) : createCommentVNode("", true)
                ], 2)
              ], 14, gr)) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var Un = (e, t, l, a) => {
  const { defaultedRange: n } = Ce(e), i = (P, Q) => Array.isArray(t[P]) ? t[P][Q] : t[P], d = (P) => e.enableSeconds ? Array.isArray(t.seconds) ? t.seconds[P] : t.seconds : 0, b = (P, Q) => P ? Q !== void 0 ? gt(P, i("hours", Q), i("minutes", Q), d(Q)) : gt(P, t.hours, t.minutes, d()) : setSeconds(G(), d(Q)), c = (P, Q) => {
    t[P] = Q;
  }, L = computed(() => e.modelAuto && n.value.enabled ? Array.isArray(l.value) ? l.value.length > 1 : false : n.value.enabled), v = (P, Q) => {
    const ae = Object.fromEntries(
      Object.keys(t).map((oe) => oe === P ? [oe, Q] : [oe, t[oe]].slice())
    );
    if (L.value && !n.value.disableTimeRangeValidation) {
      const oe = (S) => l.value ? gt(
        l.value[S],
        ae.hours[S],
        ae.minutes[S],
        ae.seconds[S]
      ) : null, ee = (S) => setMilliseconds(l.value[S], 0);
      return !(Me(oe(0), oe(1)) && (isAfter(oe(0), ee(1)) || isBefore(oe(1), ee(0))));
    }
    return true;
  }, _ = (P, Q) => {
    v(P, Q) && (c(P, Q), a && a());
  }, h2 = (P) => {
    _("hours", P);
  }, C = (P) => {
    _("minutes", P);
  }, H = (P) => {
    _("seconds", P);
  }, E = (P, Q, ae, oe) => {
    Q && h2(P), !Q && !ae && C(P), ae && H(P), l.value && oe(l.value);
  }, U = (P) => {
    if (P) {
      const Q = Array.isArray(P), ae = Q ? [+P[0].hours, +P[1].hours] : +P.hours, oe = Q ? [+P[0].minutes, +P[1].minutes] : +P.minutes, ee = Q ? [+P[0].seconds, +P[1].seconds] : +P.seconds;
      c("hours", ae), c("minutes", oe), e.enableSeconds && c("seconds", ee);
    }
  }, f = (P, Q) => {
    const ae = {
      hours: Array.isArray(t.hours) ? t.hours[P] : t.hours,
      disabledArr: []
    };
    return (Q || Q === 0) && (ae.hours = Q), Array.isArray(e.disabledTimes) && (ae.disabledArr = n.value.enabled && Array.isArray(e.disabledTimes[P]) ? e.disabledTimes[P] : e.disabledTimes), ae;
  }, B = computed(() => (P, Q) => {
    var ae;
    if (Array.isArray(e.disabledTimes)) {
      const { disabledArr: oe, hours: ee } = f(P, Q), S = oe.filter((x) => +x.hours === ee);
      return ((ae = S[0]) == null ? void 0 : ae.minutes) === "*" ? { hours: [ee], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (S == null ? void 0 : S.map((x) => +x.minutes)) ?? [],
        seconds: (S == null ? void 0 : S.map((x) => x.seconds ? +x.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: c,
    updateHours: h2,
    updateMinutes: C,
    updateSeconds: H,
    getSetDateTime: b,
    updateTimeValues: E,
    getSecondsValue: d,
    assignStartTime: U,
    validateTime: v,
    disabledTimesConfig: B
  };
};
var br = (e, t) => {
  const l = () => {
    e.isTextInputDate && Q();
  }, { modelValue: a, time: n } = Jt(e, t, l), { defaultedStartTime: i, defaultedRange: d, defaultedTz: b } = Ce(e), { updateTimeValues: c, getSetDateTime: L, setTime: v, assignStartTime: _, disabledTimesConfig: h2, validateTime: C } = Un(e, n, a, H);
  function H() {
    t("update-flow-step");
  }
  const E = (ee) => {
    const { hours: S, minutes: x, seconds: Y } = ee;
    return { hours: +S, minutes: +x, seconds: Y ? +Y : 0 };
  }, U = () => {
    if (e.startTime) {
      if (Array.isArray(e.startTime)) {
        const S = E(e.startTime[0]), x = E(e.startTime[1]);
        return [set(G(), S), set(G(), x)];
      }
      const ee = E(e.startTime);
      return set(G(), ee);
    }
    return d.value.enabled ? [null, null] : null;
  }, f = () => {
    if (d.value.enabled) {
      const [ee, S] = U();
      a.value = [
        qe(L(ee, 0), b.value.timezone),
        qe(L(S, 1), b.value.timezone)
      ];
    } else
      a.value = qe(L(U()), b.value.timezone);
  }, B = (ee) => Array.isArray(ee) ? [St(G(ee[0])), St(G(ee[1]))] : [St(ee ?? G())], P = (ee, S, x) => {
    v("hours", ee), v("minutes", S), v("seconds", e.enableSeconds ? x : 0);
  }, Q = () => {
    const [ee, S] = B(a.value);
    return d.value.enabled ? P(
      [ee.hours, S.hours],
      [ee.minutes, S.minutes],
      [ee.seconds, S.seconds]
    ) : P(ee.hours, ee.minutes, ee.seconds);
  };
  onMounted(() => {
    if (!e.shadow)
      return _(i.value), a.value ? Q() : f();
  });
  const ae = () => {
    Array.isArray(a.value) ? a.value = a.value.map((ee, S) => ee && L(ee, S)) : a.value = L(a.value), t("time-update");
  };
  return {
    modelValue: a,
    time: n,
    disabledTimesConfig: h2,
    updateTime: (ee, S = true, x = false) => {
      c(ee, S, x, ae);
    },
    validateTime: C
  };
};
var kr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePickerSolo",
  props: {
    ...rt
  },
  emits: [
    "update:internal-model-value",
    "time-update",
    "am-pm-change",
    "mount",
    "reset-flow",
    "update-flow-step",
    "overlay-toggle"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, i = useSlots(), d = Je(i, "timePicker"), b = ref(null), { time: c, modelValue: L, disabledTimesConfig: v, updateTime: _, validateTime: h2 } = br(n, a);
    return onMounted(() => {
      n.shadow || a("mount", null);
    }), t({ getSidebarProps: () => ({
      modelValue: L,
      time: c,
      updateTime: _
    }), toggleTimePicker: (E, U = false, f = "") => {
      var B;
      (B = b.value) == null || B.toggleTimePicker(E, U, f);
    } }), (E, U) => (openBlock(), createBlock(fa, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(() => [
        createVNode(Hn, mergeProps({
          ref_key: "tpRef",
          ref: b
        }, E.$props, {
          hours: unref(c).hours,
          minutes: unref(c).minutes,
          seconds: unref(c).seconds,
          "internal-model-value": E.internalModelValue,
          "disabled-times-config": unref(v),
          "validate-time": unref(h2),
          "onUpdate:hours": U[0] || (U[0] = (f) => unref(_)(f)),
          "onUpdate:minutes": U[1] || (U[1] = (f) => unref(_)(f, false)),
          "onUpdate:seconds": U[2] || (U[2] = (f) => unref(_)(f, false, true)),
          onAmPmChange: U[3] || (U[3] = (f) => E.$emit("am-pm-change", f)),
          onResetFlow: U[4] || (U[4] = (f) => E.$emit("reset-flow")),
          onOverlayClosed: U[5] || (U[5] = (f) => E.$emit("overlay-toggle", { open: false, overlay: f })),
          onOverlayOpened: U[6] || (U[6] = (f) => E.$emit("overlay-toggle", { open: true, overlay: f }))
        }), createSlots({ _: 2 }, [
          renderList(unref(d), (f, B) => ({
            name: f,
            fn: withCtx((P) => [
              renderSlot(E.$slots, f, normalizeProps(guardReactiveProps(P)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"])
      ]),
      _: 3
    }));
  }
});
var wr = { class: "dp--header-wrap" };
var Dr = {
  key: 0,
  class: "dp__month_year_wrap"
};
var Mr = { key: 0 };
var $r = { class: "dp__month_year_wrap" };
var Ar = ["data-dp-element", "aria-label", "data-test", "onClick", "onKeydown"];
var Tr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DpHeader",
  props: {
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    instance: { type: Number, default: 0 },
    years: { type: Array, default: () => [] },
    months: { type: Array, default: () => [] },
    ...rt
  },
  emits: ["update-month-year", "mount", "reset-flow", "overlay-closed", "overlay-opened"],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, {
      defaultedTransitions: i,
      defaultedAriaLabels: d,
      defaultedMultiCalendars: b,
      defaultedFilters: c,
      defaultedConfig: L,
      defaultedHighlight: v,
      propDates: _,
      defaultedUI: h2
    } = Ce(n), { transitionName: C, showTransition: H } = Xt(i), { buildMatrix: E } = bt(), { handleMonthYearChange: U, isDisabled: f, updateMonthYear: B } = Ql(n, a), { showLeftIcon: P, showRightIcon: Q } = ma(), ae = ref(false), oe = ref(false), ee = ref(false), S = ref([null, null, null, null]);
    onMounted(() => {
      a("mount");
    });
    const x = (D) => ({
      get: () => n[D],
      set: (V) => {
        const s = D === nt.month ? nt.year : nt.month;
        a("update-month-year", { [D]: V, [s]: n[s] }), D === nt.month ? g(true) : X(true);
      }
    }), Y = computed(x(nt.month)), q = computed(x(nt.year)), de = computed(() => (D) => ({
      month: n.month,
      year: n.year,
      items: D === nt.month ? n.months : n.years,
      instance: n.instance,
      updateMonthYear: B,
      toggle: D === nt.month ? g : X
    })), ve = computed(() => {
      const D = n.months.find((V) => V.value === n.month);
      return D || { text: "", value: 0 };
    }), y = computed(() => Yt(n.months, (D) => {
      const V = n.month === D.value, s = Gt(
        D.value,
        Pn(n.year, _.value.minDate),
        Rn(n.year, _.value.maxDate)
      ) || c.value.months.includes(D.value), M = Yn(v.value, D.value, n.year);
      return { active: V, disabled: s, highlighted: M };
    })), z = computed(() => Yt(n.years, (D) => {
      const V = n.year === D.value, s = Gt(
        D.value,
        It(_.value.minDate),
        It(_.value.maxDate)
      ) || c.value.years.includes(D.value), M = qa(v.value, D.value);
      return { active: V, disabled: s, highlighted: M };
    })), te = (D, V, s) => {
      s !== void 0 ? D.value = s : D.value = !D.value, D.value ? (ee.value = true, a("overlay-opened", V)) : (ee.value = false, a("overlay-closed", V));
    }, g = (D = false, V) => {
      A(D), te(ae, He.month, V);
    }, X = (D = false, V) => {
      A(D), te(oe, He.year, V);
    }, A = (D) => {
      D || a("reset-flow");
    }, p = (D, V) => {
      n.arrowNavigation && (S.value[V] = Ie(D), E(S.value, "monthYear"));
    }, se = computed(() => {
      var D, V, s, M, F, u;
      return [
        {
          type: nt.month,
          index: 1,
          toggle: g,
          modelValue: Y.value,
          updateModelValue: (le) => Y.value = le,
          text: ve.value.text,
          showSelectionGrid: ae.value,
          items: y.value,
          ariaLabel: (D = d.value) == null ? void 0 : D.openMonthsOverlay,
          overlayLabel: ((s = (V = d.value).monthPicker) == null ? void 0 : s.call(V, true)) ?? void 0
        },
        {
          type: nt.year,
          index: 2,
          toggle: X,
          modelValue: q.value,
          updateModelValue: (le) => q.value = le,
          text: Sn(n.year, n.locale),
          showSelectionGrid: oe.value,
          items: z.value,
          ariaLabel: (M = d.value) == null ? void 0 : M.openYearsOverlay,
          overlayLabel: ((u = (F = d.value).yearPicker) == null ? void 0 : u.call(F, true)) ?? void 0
        }
      ];
    }), I = computed(() => n.disableYearSelect ? [se.value[0]] : n.yearFirst ? [...se.value].reverse() : se.value);
    return t({
      toggleMonthPicker: g,
      toggleYearPicker: X,
      handleMonthYearChange: U
    }), (D, V) => {
      var s, M, F, u, le, me;
      return openBlock(), createElementBlock("div", wr, [
        D.$slots["month-year"] ? (openBlock(), createElementBlock("div", Dr, [
          renderSlot(D.$slots, "month-year", normalizeProps(guardReactiveProps({ month: e.month, year: e.year, months: e.months, years: e.years, updateMonthYear: unref(B), handleMonthYearChange: unref(U), instance: e.instance })))
        ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          D.$slots["top-extra"] ? (openBlock(), createElementBlock("div", Mr, [
            renderSlot(D.$slots, "top-extra", { value: D.internalModelValue })
          ])) : createCommentVNode("", true),
          createBaseVNode("div", $r, [
            unref(P)(unref(b), e.instance) && !D.vertical ? (openBlock(), createBlock(Ut, {
              key: 0,
              "aria-label": (s = unref(d)) == null ? void 0 : s.prevMonth,
              disabled: unref(f)(false),
              class: normalizeClass((M = unref(h2)) == null ? void 0 : M.navBtnPrev),
              "el-name": "action-prev",
              onActivate: V[0] || (V[0] = ($) => unref(U)(false, true)),
              onSetRef: V[1] || (V[1] = ($) => p($, 0))
            }, {
              default: withCtx(() => [
                D.$slots["arrow-left"] ? renderSlot(D.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                D.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(za), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass(["dp__month_year_wrap", {
                dp__year_disable_select: D.disableYearSelect
              }])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(I.value, ($, ge) => (openBlock(), createElementBlock(Fragment, {
                key: $.type
              }, [
                createBaseVNode("button", {
                  ref_for: true,
                  ref: (r) => p(r, ge + 1),
                  type: "button",
                  "data-dp-element": `overlay-${$.type}`,
                  class: normalizeClass(["dp__btn dp__month_year_select", { "dp--hidden-el": ee.value }]),
                  "aria-label": `${$.text}-${$.ariaLabel}`,
                  "data-test": `${$.type}-toggle-overlay-${e.instance}`,
                  onClick: $.toggle,
                  onKeydown: (r) => unref(Ke)(r, () => $.toggle(), true)
                }, [
                  D.$slots[$.type] ? renderSlot(D.$slots, $.type, {
                    key: 0,
                    text: $.text,
                    value: n[$.type]
                  }) : createCommentVNode("", true),
                  D.$slots[$.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString($.text), 1)
                  ], 64))
                ], 42, Ar),
                createVNode(Transition, {
                  name: unref(C)($.showSelectionGrid),
                  css: unref(H)
                }, {
                  default: withCtx(() => [
                    $.showSelectionGrid ? (openBlock(), createBlock(qt, {
                      key: 0,
                      items: $.items,
                      "arrow-navigation": D.arrowNavigation,
                      "hide-navigation": D.hideNavigation,
                      "is-last": D.autoApply && !unref(L).keepActionRow,
                      "skip-button-ref": false,
                      config: D.config,
                      type: $.type,
                      "header-refs": [],
                      "esc-close": D.escClose,
                      "menu-wrap-ref": D.menuWrapRef,
                      "text-input": D.textInput,
                      "aria-labels": D.ariaLabels,
                      "overlay-label": $.overlayLabel,
                      onSelected: $.updateModelValue,
                      onToggle: $.toggle
                    }, createSlots({
                      "button-icon": withCtx(() => [
                        D.$slots["calendar-icon"] ? renderSlot(D.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        D.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      D.$slots[`${$.type}-overlay-value`] ? {
                        name: "item",
                        fn: withCtx(({ item: r }) => [
                          renderSlot(D.$slots, `${$.type}-overlay-value`, {
                            text: r.text,
                            value: r.value
                          })
                        ]),
                        key: "0"
                      } : void 0,
                      D.$slots[`${$.type}-overlay`] ? {
                        name: "overlay",
                        fn: withCtx(() => [
                          renderSlot(D.$slots, `${$.type}-overlay`, mergeProps({ ref_for: true }, de.value($.type)))
                        ]),
                        key: "1"
                      } : void 0,
                      D.$slots[`${$.type}-overlay-header`] ? {
                        name: "header",
                        fn: withCtx(() => [
                          renderSlot(D.$slots, `${$.type}-overlay-header`, {
                            toggle: $.toggle
                          })
                        ]),
                        key: "2"
                      } : void 0
                    ]), 1032, ["items", "arrow-navigation", "hide-navigation", "is-last", "config", "type", "esc-close", "menu-wrap-ref", "text-input", "aria-labels", "overlay-label", "onSelected", "onToggle"])) : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1032, ["name", "css"])
              ], 64))), 128))
            ], 2),
            unref(P)(unref(b), e.instance) && D.vertical ? (openBlock(), createBlock(Ut, {
              key: 1,
              "aria-label": (F = unref(d)) == null ? void 0 : F.prevMonth,
              "el-name": "action-prev",
              disabled: unref(f)(false),
              class: normalizeClass((u = unref(h2)) == null ? void 0 : u.navBtnPrev),
              onActivate: V[2] || (V[2] = ($) => unref(U)(false, true))
            }, {
              default: withCtx(() => [
                D.$slots["arrow-up"] ? renderSlot(D.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                D.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Va), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
            unref(Q)(unref(b), e.instance) ? (openBlock(), createBlock(Ut, {
              key: 2,
              ref: "rightIcon",
              "el-name": "action-next",
              disabled: unref(f)(true),
              "aria-label": (le = unref(d)) == null ? void 0 : le.nextMonth,
              class: normalizeClass((me = unref(h2)) == null ? void 0 : me.navBtnNext),
              onActivate: V[3] || (V[3] = ($) => unref(U)(true, true)),
              onSetRef: V[4] || (V[4] = ($) => p($, D.disableYearSelect ? 2 : 3))
            }, {
              default: withCtx(() => [
                D.$slots[D.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(D.$slots, D.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
                D.$slots[D.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(D.vertical ? unref(Wa) : unref(Ha)), { key: 1 }))
              ]),
              _: 3
            }, 8, ["disabled", "aria-label", "class"])) : createCommentVNode("", true)
          ])
        ], 64))
      ]);
    };
  }
});
var Sr = {
  class: "dp__calendar_header",
  role: "row"
};
var Pr = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
};
var Rr = ["aria-label"];
var Cr = {
  key: 0,
  class: "dp__calendar_item dp__week_num",
  role: "gridcell"
};
var Or = { class: "dp__cell_inner" };
var _r = ["id", "aria-pressed", "aria-disabled", "aria-label", "tabindex", "data-test", "onClick", "onTouchend", "onKeydown", "onMouseenter", "onMouseleave", "onMousedown"];
var Br = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DpCalendar",
  props: {
    mappedDates: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    ...rt
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
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, { buildMultiLevelMatrix: i } = bt(), {
      defaultedTransitions: d,
      defaultedConfig: b,
      defaultedAriaLabels: c,
      defaultedMultiCalendars: L,
      defaultedWeekNumbers: v,
      defaultedMultiDates: _,
      defaultedUI: h2
    } = Ce(n), C = ref(null), H = ref({
      bottom: "",
      left: "",
      transform: ""
    }), E = ref([]), U = ref(null), f = ref(true), B = ref(""), P = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), Q = ref([]), ae = ref({ left: "50%" }), oe = ref(false), ee = computed(() => n.calendar ? n.calendar(n.mappedDates) : n.mappedDates), S = computed(() => n.dayNames ? Array.isArray(n.dayNames) ? n.dayNames : n.dayNames(n.locale, +n.weekStart) : yl(n.formatLocale, n.locale, +n.weekStart));
    onMounted(() => {
      a("mount", { cmp: "calendar", refs: E }), b.value.noSwipe || U.value && (U.value.addEventListener("touchstart", p, { passive: false }), U.value.addEventListener("touchend", se, { passive: false }), U.value.addEventListener("touchmove", I, { passive: false })), n.monthChangeOnScroll && U.value && U.value.addEventListener("wheel", s, { passive: false });
    });
    const x = ($) => $ ? n.vertical ? "vNext" : "next" : n.vertical ? "vPrevious" : "previous", Y = ($, ge) => {
      if (n.transitions) {
        const r = Ge(dt(G(), n.month, n.year));
        B.value = Be(Ge(dt(G(), $, ge)), r) ? d.value[x(true)] : d.value[x(false)], f.value = false, nextTick(() => {
          f.value = true;
        });
      }
    }, q = computed(
      () => ({
        ...h2.value.calendar ?? {}
      })
    ), de = computed(() => ($) => {
      const ge = hl($);
      return {
        dp__marker_dot: ge.type === "dot",
        dp__marker_line: ge.type === "line"
      };
    }), ve = computed(() => ($) => Me($, C.value)), y = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: L.value.count > 0 && n.instance !== 0
    })), z = computed(() => ($) => n.hideOffsetDates ? $.current : true), te = async ($, ge) => {
      const { width: r, height: R } = $.getBoundingClientRect();
      C.value = ge.value;
      let O = { left: `${r / 2}px` }, W = -50;
      if (await nextTick(), Q.value[0]) {
        const { left: ue, width: w } = Q.value[0].getBoundingClientRect();
        ue < 0 && (O = { left: "0" }, W = 0, ae.value.left = `${r / 2}px`), window.innerWidth < ue + w && (O = { right: "0" }, W = 0, ae.value.left = `${w - r / 2}px`);
      }
      H.value = {
        bottom: `${R}px`,
        ...O,
        transform: `translateX(${W}%)`
      };
    }, g = async ($, ge, r) => {
      var O, W, ue;
      const R = Ie(E.value[ge][r]);
      R && ((O = $.marker) != null && O.customPosition && ((ue = (W = $.marker) == null ? void 0 : W.tooltip) != null && ue.length) ? H.value = $.marker.customPosition(R) : await te(R, $), a("tooltip-open", $.marker));
    }, X = async ($, ge, r) => {
      var R, O;
      if (oe.value && _.value.enabled && _.value.dragSelect)
        return a("select-date", $);
      a("set-hover-date", $), (O = (R = $.marker) == null ? void 0 : R.tooltip) != null && O.length && await g($, ge, r);
    }, A = ($) => {
      C.value && (C.value = null, H.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a("tooltip-close", $.marker));
    }, p = ($) => {
      P.value.startX = $.changedTouches[0].screenX, P.value.startY = $.changedTouches[0].screenY;
    }, se = ($) => {
      P.value.endX = $.changedTouches[0].screenX, P.value.endY = $.changedTouches[0].screenY, D();
    }, I = ($) => {
      n.vertical && !n.inline && $.preventDefault();
    }, D = () => {
      const $ = n.vertical ? "Y" : "X";
      Math.abs(P.value[`start${$}`] - P.value[`end${$}`]) > 10 && a("handle-swipe", P.value[`start${$}`] > P.value[`end${$}`] ? "right" : "left");
    }, V = ($, ge, r) => {
      $ && (Array.isArray(E.value[ge]) ? E.value[ge][r] = $ : E.value[ge] = [$]), n.arrowNavigation && i(E.value, "calendar");
    }, s = ($) => {
      n.monthChangeOnScroll && ($.preventDefault(), a("handle-scroll", $));
    }, M = ($) => v.value.type === "local" ? getWeek($.value, { weekStartsOn: +n.weekStart }) : v.value.type === "iso" ? getISOWeek($.value) : typeof v.value.type == "function" ? v.value.type($.value) : "", F = ($) => {
      const ge = $[0];
      return v.value.hideOnOffsetDates ? $.some((r) => r.current) ? M(ge) : "" : M(ge);
    }, u = ($, ge, r = true) => {
      r && sn() || !r && !sn() || _.value.enabled || (yt($, b.value), a("select-date", ge));
    }, le = ($) => {
      yt($, b.value);
    }, me = ($) => {
      _.value.enabled && _.value.dragSelect ? (oe.value = true, a("select-date", $)) : _.value.enabled && a("select-date", $);
    };
    return t({ triggerTransition: Y }), ($, ge) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(y.value)
    }, [
      createBaseVNode("div", {
        ref_key: "calendarWrapRef",
        ref: U,
        class: normalizeClass(q.value),
        role: "grid"
      }, [
        createBaseVNode("div", Sr, [
          $.weekNumbers ? (openBlock(), createElementBlock("div", Pr, toDisplayString($.weekNumName), 1)) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(S.value, (r, R) => {
            var O, W;
            return openBlock(), createElementBlock("div", {
              key: R,
              class: "dp__calendar_header_item",
              role: "gridcell",
              "data-test": "calendar-header",
              "aria-label": (W = (O = unref(c)) == null ? void 0 : O.weekDay) == null ? void 0 : W.call(O, R)
            }, [
              $.$slots["calendar-header"] ? renderSlot($.$slots, "calendar-header", {
                key: 0,
                day: r,
                index: R
              }) : createCommentVNode("", true),
              $.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(r), 1)
              ], 64))
            ], 8, Rr);
          }), 128))
        ]),
        ge[2] || (ge[2] = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1)),
        createVNode(Transition, {
          name: B.value,
          css: !!$.transitions
        }, {
          default: withCtx(() => [
            f.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "dp__calendar",
              role: "rowgroup",
              onMouseleave: ge[1] || (ge[1] = (r) => oe.value = false)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(ee.value, (r, R) => (openBlock(), createElementBlock("div", {
                key: R,
                class: "dp__calendar_row",
                role: "row"
              }, [
                $.weekNumbers ? (openBlock(), createElementBlock("div", Cr, [
                  createBaseVNode("div", Or, toDisplayString(F(r.days)), 1)
                ])) : createCommentVNode("", true),
                (openBlock(true), createElementBlock(Fragment, null, renderList(r.days, (O, W) => {
                  var ue, w, N;
                  return openBlock(), createElementBlock("div", {
                    id: unref(In)(O.value),
                    ref_for: true,
                    ref: (ce) => V(ce, R, W),
                    key: W + R,
                    role: "gridcell",
                    class: "dp__calendar_item",
                    "aria-pressed": (O.classData.dp__active_date || O.classData.dp__range_start || O.classData.dp__range_start) ?? void 0,
                    "aria-disabled": O.classData.dp__cell_disabled || void 0,
                    "aria-label": (w = (ue = unref(c)) == null ? void 0 : ue.day) == null ? void 0 : w.call(ue, O),
                    tabindex: !O.current && $.hideOffsetDates ? void 0 : 0,
                    "data-test": O.value,
                    onClick: withModifiers((ce) => u(ce, O), ["prevent"]),
                    onTouchend: (ce) => u(ce, O, false),
                    onKeydown: (ce) => unref(Ke)(ce, () => $.$emit("select-date", O)),
                    onMouseenter: (ce) => X(O, R, W),
                    onMouseleave: (ce) => A(O),
                    onMousedown: (ce) => me(O),
                    onMouseup: ge[0] || (ge[0] = (ce) => oe.value = false)
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(["dp__cell_inner", O.classData])
                    }, [
                      $.$slots.day && z.value(O) ? renderSlot($.$slots, "day", {
                        key: 0,
                        day: +O.text,
                        date: O.value
                      }) : createCommentVNode("", true),
                      $.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                        createTextVNode(toDisplayString(O.text), 1)
                      ], 64)),
                      O.marker && z.value(O) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                        $.$slots.marker ? renderSlot($.$slots, "marker", {
                          key: 0,
                          marker: O.marker,
                          day: +O.text,
                          date: O.value
                        }) : (openBlock(), createElementBlock("div", {
                          key: 1,
                          class: normalizeClass(de.value(O.marker)),
                          style: normalizeStyle(O.marker.color ? { backgroundColor: O.marker.color } : {})
                        }, null, 6))
                      ], 64)) : createCommentVNode("", true),
                      ve.value(O.value) ? (openBlock(), createElementBlock("div", {
                        key: 3,
                        ref_for: true,
                        ref_key: "activeTooltip",
                        ref: Q,
                        class: "dp__marker_tooltip",
                        style: normalizeStyle(H.value)
                      }, [
                        (N = O.marker) != null && N.tooltip ? (openBlock(), createElementBlock("div", {
                          key: 0,
                          class: "dp__tooltip_content",
                          onClick: le
                        }, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(O.marker.tooltip, (ce, he) => (openBlock(), createElementBlock("div", {
                            key: he,
                            class: "dp__tooltip_text"
                          }, [
                            $.$slots["marker-tooltip"] ? renderSlot($.$slots, "marker-tooltip", {
                              key: 0,
                              tooltip: ce,
                              day: O.value
                            }) : createCommentVNode("", true),
                            $.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createBaseVNode("div", {
                                class: "dp__tooltip_mark",
                                style: normalizeStyle(ce.color ? { backgroundColor: ce.color } : {})
                              }, null, 4),
                              createBaseVNode("div", null, toDisplayString(ce.text), 1)
                            ], 64))
                          ]))), 128)),
                          createBaseVNode("div", {
                            class: "dp__arrow_bottom_tp",
                            style: normalizeStyle(ae.value)
                          }, null, 4)
                        ])) : createCommentVNode("", true)
                      ], 4)) : createCommentVNode("", true)
                    ], 2)
                  ], 40, _r);
                }), 128))
              ]))), 128))
            ], 32)) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["name", "css"])
      ], 2)
    ], 2));
  }
});
var vn = (e) => Array.isArray(e);
var Yr = (e, t, l, a) => {
  const n = ref([]), i = ref(/* @__PURE__ */ new Date()), d = ref(), b = () => p(e.isTextInputDate), { modelValue: c, calendars: L, time: v, today: _ } = Jt(e, t, b), {
    defaultedMultiCalendars: h2,
    defaultedStartTime: C,
    defaultedRange: H,
    defaultedConfig: E,
    defaultedTz: U,
    propDates: f,
    defaultedMultiDates: B
  } = Ce(e), { validateMonthYearInRange: P, isDisabled: Q, isDateRangeAllowed: ae, checkMinMaxRange: oe } = kt(e), { updateTimeValues: ee, getSetDateTime: S, setTime: x, assignStartTime: Y, validateTime: q, disabledTimesConfig: de } = Un(e, v, c, a), ve = computed(
    () => (k) => L.value[k] ? L.value[k].month : 0
  ), y = computed(
    () => (k) => L.value[k] ? L.value[k].year : 0
  ), z = (k) => !E.value.keepViewOnOffsetClick || k ? true : !d.value, te = (k, m, j, re = false) => {
    var Ae, Fe;
    z(re) && (L.value[k] || (L.value[k] = { month: 0, year: 0 }), L.value[k].month = on(m) ? (Ae = L.value[k]) == null ? void 0 : Ae.month : m, L.value[k].year = on(j) ? (Fe = L.value[k]) == null ? void 0 : Fe.year : j);
  }, g = () => {
    e.autoApply && t("select-date");
  };
  onMounted(() => {
    e.shadow || (c.value || ($(), C.value && Y(C.value)), p(true), e.focusStartDate && e.startDate && $());
  });
  const X = computed(() => {
    var k;
    return (k = e.flow) != null && k.length && !e.partialFlow ? e.flowStep === e.flow.length : true;
  }), A = () => {
    e.autoApply && X.value && t("auto-apply", e.partialFlow ? e.flowStep !== e.flow.length : false);
  }, p = (k = false) => {
    if (c.value)
      return Array.isArray(c.value) ? (n.value = c.value, F(k)) : D(c.value, k);
    if (h2.value.count && k && !e.startDate)
      return I(G(), k);
  }, se = () => Array.isArray(c.value) && H.value.enabled ? getMonth(c.value[0]) === getMonth(c.value[1] ?? c.value[0]) : false, I = (k = /* @__PURE__ */ new Date(), m = false) => {
    if ((!h2.value.count || !h2.value.static || m) && te(0, getMonth(k), getYear(k)), h2.value.count && (!h2.value.solo || !c.value || se()))
      for (let j = 1; j < h2.value.count; j++) {
        const re = set(G(), { month: ve.value(j - 1), year: y.value(j - 1) }), Ae = add(re, { months: 1 });
        L.value[j] = { month: getMonth(Ae), year: getYear(Ae) };
      }
  }, D = (k, m) => {
    I(k), x("hours", getHours(k)), x("minutes", getMinutes(k)), x("seconds", getSeconds(k)), h2.value.count && m && me();
  }, V = (k) => {
    if (h2.value.count) {
      if (h2.value.solo) return 0;
      const m = getMonth(k[0]), j = getMonth(k[1]);
      return Math.abs(j - m) < h2.value.count ? 0 : 1;
    }
    return 1;
  }, s = (k, m) => {
    k[1] && H.value.showLastInRange ? I(k[V(k)], m) : I(k[0], m);
    const j = (re, Ae) => [
      re(k[0]),
      k[1] ? re(k[1]) : v[Ae][1]
    ];
    x("hours", j(getHours, "hours")), x("minutes", j(getMinutes, "minutes")), x("seconds", j(getSeconds, "seconds"));
  }, M = (k, m) => {
    if ((H.value.enabled || e.weekPicker) && !B.value.enabled)
      return s(k, m);
    if (B.value.enabled && m) {
      const j = k[k.length - 1];
      return D(j, m);
    }
  }, F = (k) => {
    const m = c.value;
    M(m, k), h2.value.count && h2.value.solo && me();
  }, u = (k, m) => {
    const j = set(G(), { month: ve.value(m), year: y.value(m) }), re = k < 0 ? addMonths(j, 1) : subMonths(j, 1);
    P(getMonth(re), getYear(re), k < 0, e.preventMinMaxNavigation) && (te(m, getMonth(re), getYear(re)), t("update-month-year", { instance: m, month: getMonth(re), year: getYear(re) }), h2.value.count && !h2.value.solo && le(m), l());
  }, le = (k) => {
    for (let m = k - 1; m >= 0; m--) {
      const j = subMonths(set(G(), { month: ve.value(m + 1), year: y.value(m + 1) }), 1);
      te(m, getMonth(j), getYear(j));
    }
    for (let m = k + 1; m <= h2.value.count - 1; m++) {
      const j = addMonths(set(G(), { month: ve.value(m - 1), year: y.value(m - 1) }), 1);
      te(m, getMonth(j), getYear(j));
    }
  }, me = () => {
    if (Array.isArray(c.value) && c.value.length === 2) {
      const k = G(
        G(c.value[1] ? c.value[1] : addMonths(c.value[0], 1))
      ), [m, j] = [getMonth(c.value[0]), getYear(c.value[0])], [re, Ae] = [getMonth(c.value[1]), getYear(c.value[1])];
      (m !== re || m === re && j !== Ae) && h2.value.solo && te(1, getMonth(k), getYear(k));
    } else c.value && !Array.isArray(c.value) && (te(0, getMonth(c.value), getYear(c.value)), I(G()));
  }, $ = () => {
    e.startDate && (te(0, getMonth(G(e.startDate)), getYear(G(e.startDate))), h2.value.count && le(0));
  }, ge = (k, m) => {
    if (e.monthChangeOnScroll) {
      const j = (/* @__PURE__ */ new Date()).getTime() - i.value.getTime(), re = Math.abs(k.deltaY);
      let Ae = 500;
      re > 1 && (Ae = 100), re > 100 && (Ae = 0), j > Ae && (i.value = /* @__PURE__ */ new Date(), u(e.monthChangeOnScroll !== "inverse" ? -k.deltaY : k.deltaY, m));
    }
  }, r = (k, m, j = false) => {
    e.monthChangeOnArrows && e.vertical === j && R(k, m);
  }, R = (k, m) => {
    u(k === "right" ? -1 : 1, m);
  }, O = (k) => {
    if (f.value.markers)
      return sa(k.value, f.value.markers);
  }, W = (k, m) => {
    switch (e.sixWeeks === true ? "append" : e.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [k == 0, true];
      case "fair":
        return [k == 0 || m > k, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, ue = (k, m, j, re) => {
    if (e.sixWeeks && k.length < 6) {
      const Ae = 6 - k.length, Fe = (m.getDay() + 7 - re) % 7, xt = 6 - (j.getDay() + 7 - re) % 7, [zt, Da] = W(Fe, xt);
      for (let Dt = 1; Dt <= Ae; Dt++)
        if (Da ? !!(Dt % 2) == zt : zt) {
          const ea = k[0].days[0], Ma = w(addDays(ea.value, -7), getMonth(m));
          k.unshift({ days: Ma });
        } else {
          const ea = k[k.length - 1], Ma = ea.days[ea.days.length - 1], Wn = w(addDays(Ma.value, 1), getMonth(m));
          k.push({ days: Wn });
        }
    }
    return k;
  }, w = (k, m) => {
    const j = G(k), re = [];
    for (let Ae = 0; Ae < 7; Ae++) {
      const Fe = addDays(j, Ae), wt = getMonth(Fe) !== m;
      re.push({
        text: e.hideOffsetDates && wt ? "" : Fe.getDate(),
        value: Fe,
        current: !wt,
        classData: {}
      });
    }
    return re;
  }, N = (k, m) => {
    const j = [], re = new Date(m, k), Ae = new Date(m, k + 1, 0), Fe = e.weekStart, wt = startOfWeek(re, { weekStartsOn: Fe }), xt = (zt) => {
      const Da = w(zt, k);
      if (j.push({ days: Da }), !j[j.length - 1].days.some(
        (Dt) => Me(Ge(Dt.value), Ge(Ae))
      )) {
        const Dt = addDays(zt, 7);
        xt(Dt);
      }
    };
    return xt(wt), ue(j, re, Ae, Fe);
  }, ce = (k) => {
    const m = gt(G(k.value), v.hours, v.minutes, Xe());
    t("date-update", m), B.value.enabled ? Xa(m, c, B.value.limit) : c.value = m, a(), nextTick().then(() => {
      A();
    });
  }, he = (k) => H.value.noDisabledRange ? Cn(n.value[0], k).some((j) => Q(j)) : false, et = () => {
    n.value = c.value ? c.value.slice() : [], n.value.length === 2 && !(H.value.fixedStart || H.value.fixedEnd) && (n.value = []);
  }, fe = (k, m) => {
    const j = [
      G(k.value),
      addDays(G(k.value), +H.value.autoRange)
    ];
    ae(j) ? (m && vt(k.value), n.value = j) : t("invalid-date", k.value);
  }, vt = (k) => {
    const m = getMonth(G(k)), j = getYear(G(k));
    if (te(0, m, j), h2.value.count > 0)
      for (let re = 1; re < h2.value.count; re++) {
        const Ae = Al(
          set(G(k), { year: y.value(re - 1), month: ve.value(re - 1) })
        );
        te(re, Ae.month, Ae.year);
      }
  }, ot = (k) => {
    if (he(k.value) || !oe(k.value, c.value, H.value.fixedStart ? 0 : 1))
      return t("invalid-date", k.value);
    n.value = Ln(G(k.value), c, t, H);
  }, Ft = (k, m) => {
    if (et(), H.value.autoRange) return fe(k, m);
    if (H.value.fixedStart || H.value.fixedEnd) return ot(k);
    n.value[0] ? oe(G(k.value), c.value) && !he(k.value) ? Oe(G(k.value), G(n.value[0])) ? (n.value.unshift(G(k.value)), t("range-end", n.value[0])) : (n.value[1] = G(k.value), t("range-end", n.value[1])) : (e.autoApply && t("auto-apply-invalid", k.value), t("invalid-date", k.value)) : (n.value[0] = G(k.value), t("range-start", n.value[0]));
  }, Xe = (k = true) => e.enableSeconds ? Array.isArray(v.seconds) ? k ? v.seconds[0] : v.seconds[1] : v.seconds : 0, Lt = (k) => {
    n.value[k] = gt(
      n.value[k],
      v.hours[k],
      v.minutes[k],
      Xe(k !== 1)
    );
  }, pa = () => {
    var k, m;
    n.value[0] && n.value[1] && +((k = n.value) == null ? void 0 : k[0]) > +((m = n.value) == null ? void 0 : m[1]) && (n.value.reverse(), t("range-start", n.value[0]), t("range-end", n.value[1]));
  }, Zt = () => {
    n.value.length && (n.value[0] && !n.value[1] ? Lt(0) : (Lt(0), Lt(1), a()), pa(), c.value = n.value.slice(), va(n.value, t, e.autoApply, e.modelAuto));
  }, ya = (k, m = false) => {
    if (Q(k.value) || !k.current && e.hideOffsetDates) return t("invalid-date", k.value);
    if (d.value = JSON.parse(JSON.stringify(k)), !H.value.enabled) return ce(k);
    vn(v.hours) && vn(v.minutes) && !B.value.enabled && (Ft(k, m), Zt());
  }, ga = (k, m) => {
    var re;
    te(k, m.month, m.year, true), h2.value.count && !h2.value.solo && le(k), t("update-month-year", { instance: k, month: m.month, year: m.year }), l(h2.value.solo ? k : void 0);
    const j = (re = e.flow) != null && re.length ? e.flow[e.flowStep] : void 0;
    !m.fromNav && (j === He.month || j === He.year) && a();
  }, ha = (k, m) => {
    Fn({
      value: k,
      modelValue: c,
      range: H.value.enabled,
      timezone: m ? void 0 : U.value.timezone
    }), g(), e.multiCalendars && nextTick().then(() => p(true));
  }, ba = () => {
    const k = ja(G(), U.value);
    H.value.enabled ? c.value && Array.isArray(c.value) && c.value[0] ? c.value = Oe(k, c.value[0]) ? [k, c.value[0]] : [c.value[0], k] : c.value = [k] : c.value = k, g();
  }, ka = () => {
    if (Array.isArray(c.value))
      if (B.value.enabled) {
        const k = wa();
        c.value[c.value.length - 1] = S(k);
      } else
        c.value = c.value.map((k, m) => k && S(k, m));
    else
      c.value = S(c.value);
    t("time-update");
  }, wa = () => Array.isArray(c.value) && c.value.length ? c.value[c.value.length - 1] : null;
  return {
    calendars: L,
    modelValue: c,
    month: ve,
    year: y,
    time: v,
    disabledTimesConfig: de,
    today: _,
    validateTime: q,
    getCalendarDays: N,
    getMarker: O,
    handleScroll: ge,
    handleSwipe: R,
    handleArrow: r,
    selectDate: ya,
    updateMonthYear: ga,
    presetDate: ha,
    selectCurrentDate: ba,
    updateTime: (k, m = true, j = false) => {
      ee(k, m, j, ka);
    },
    assignMonthAndYear: I
  };
};
var Ir = { key: 0 };
var Nr = defineComponent({
  __name: "DatePicker",
  props: {
    ...rt
  },
  emits: [
    "tooltip-open",
    "tooltip-close",
    "mount",
    "update:internal-model-value",
    "update-flow-step",
    "reset-flow",
    "auto-apply",
    "focus-menu",
    "select-date",
    "range-start",
    "range-end",
    "invalid-fixed-range",
    "time-update",
    "am-pm-change",
    "time-picker-open",
    "time-picker-close",
    "recalculate-position",
    "update-month-year",
    "auto-apply-invalid",
    "date-update",
    "invalid-date",
    "overlay-toggle"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, {
      calendars: i,
      month: d,
      year: b,
      modelValue: c,
      time: L,
      disabledTimesConfig: v,
      today: _,
      validateTime: h2,
      getCalendarDays: C,
      getMarker: H,
      handleArrow: E,
      handleScroll: U,
      handleSwipe: f,
      selectDate: B,
      updateMonthYear: P,
      presetDate: Q,
      selectCurrentDate: ae,
      updateTime: oe,
      assignMonthAndYear: ee
    } = Yr(n, a, se, I), S = useSlots(), { setHoverDate: x, getDayClassData: Y, clearHoverDate: q } = Jr(c, n), { defaultedMultiCalendars: de } = Ce(n), ve = ref([]), y = ref([]), z = ref(null), te = Je(S, "calendar"), g = Je(S, "monthYear"), X = Je(S, "timePicker"), A = (r) => {
      n.shadow || a("mount", r);
    };
    watch(
      i,
      () => {
        n.shadow || setTimeout(() => {
          a("recalculate-position");
        }, 0);
      },
      { deep: true }
    ), watch(
      de,
      (r, R) => {
        r.count - R.count > 0 && ee();
      },
      { deep: true }
    );
    const p = computed(() => (r) => C(d.value(r), b.value(r)).map((R) => ({
      ...R,
      days: R.days.map((O) => (O.marker = H(O), O.classData = Y(O), O))
    })));
    function se(r) {
      var R;
      r || r === 0 ? (R = y.value[r]) == null || R.triggerTransition(d.value(r), b.value(r)) : y.value.forEach((O, W) => O.triggerTransition(d.value(W), b.value(W)));
    }
    function I() {
      a("update-flow-step");
    }
    const D = (r, R = false) => {
      B(r, R), n.spaceConfirm && a("select-date");
    }, V = (r, R, O = 0) => {
      var W;
      (W = ve.value[O]) == null || W.toggleMonthPicker(r, R);
    }, s = (r, R, O = 0) => {
      var W;
      (W = ve.value[O]) == null || W.toggleYearPicker(r, R);
    }, M = (r, R, O) => {
      var W;
      (W = z.value) == null || W.toggleTimePicker(r, R, O);
    }, F = (r, R) => {
      var O;
      if (!n.range) {
        const W = c.value ? c.value : _, ue = R ? new Date(R) : W, w = r ? startOfWeek(ue, { weekStartsOn: 1 }) : endOfWeek(ue, { weekStartsOn: 1 });
        B({
          value: w,
          current: getMonth(ue) === d.value(0),
          text: "",
          classData: {}
        }), (O = document.getElementById(In(w))) == null || O.focus();
      }
    }, u = (r) => {
      var R;
      (R = ve.value[0]) == null || R.handleMonthYearChange(r, true);
    }, le = (r) => {
      P(0, { month: d.value(0), year: b.value(0) + (r ? 1 : -1), fromNav: true });
    }, me = (r, R) => {
      r === He.time && a(`time-picker-${R ? "open" : "close"}`), a("overlay-toggle", { open: R, overlay: r });
    }, $ = (r) => {
      a("overlay-toggle", { open: false, overlay: r }), a("focus-menu");
    };
    return t({
      clearHoverDate: q,
      presetDate: Q,
      selectCurrentDate: ae,
      toggleMonthPicker: V,
      toggleYearPicker: s,
      toggleTimePicker: M,
      handleArrow: E,
      updateMonthYear: P,
      getSidebarProps: () => ({
        modelValue: c,
        month: d,
        year: b,
        time: L,
        updateTime: oe,
        updateMonthYear: P,
        selectDate: B,
        presetDate: Q
      }),
      changeMonth: u,
      changeYear: le,
      selectWeekDate: F
    }), (r, R) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(fa, {
        "multi-calendars": unref(de).count,
        collapse: r.collapse
      }, {
        default: withCtx(({ instance: O, index: W }) => [
          r.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(Tr, mergeProps({
            key: 0,
            ref: (ue) => {
              ue && (ve.value[W] = ue);
            },
            months: unref($n)(r.formatLocale, r.locale, r.monthNameFormat),
            years: unref(Ka)(r.yearRange, r.locale, r.reverseYears),
            month: unref(d)(O),
            year: unref(b)(O),
            instance: O
          }, r.$props, {
            onMount: R[0] || (R[0] = (ue) => A(unref(Tt).header)),
            onResetFlow: R[1] || (R[1] = (ue) => r.$emit("reset-flow")),
            onUpdateMonthYear: (ue) => unref(P)(O, ue),
            onOverlayClosed: $,
            onOverlayOpened: R[2] || (R[2] = (ue) => r.$emit("overlay-toggle", { open: true, overlay: ue }))
          }), createSlots({ _: 2 }, [
            renderList(unref(g), (ue, w) => ({
              name: ue,
              fn: withCtx((N) => [
                renderSlot(r.$slots, ue, normalizeProps(guardReactiveProps(N)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(Br, mergeProps({
            ref: (ue) => {
              ue && (y.value[W] = ue);
            },
            "mapped-dates": p.value(O),
            month: unref(d)(O),
            year: unref(b)(O),
            instance: O
          }, r.$props, {
            onSelectDate: (ue) => unref(B)(ue, O !== 1),
            onHandleSpace: (ue) => D(ue, O !== 1),
            onSetHoverDate: R[3] || (R[3] = (ue) => unref(x)(ue)),
            onHandleScroll: (ue) => unref(U)(ue, O),
            onHandleSwipe: (ue) => unref(f)(ue, O),
            onMount: R[4] || (R[4] = (ue) => A(unref(Tt).calendar)),
            onResetFlow: R[5] || (R[5] = (ue) => r.$emit("reset-flow")),
            onTooltipOpen: R[6] || (R[6] = (ue) => r.$emit("tooltip-open", ue)),
            onTooltipClose: R[7] || (R[7] = (ue) => r.$emit("tooltip-close", ue))
          }), createSlots({ _: 2 }, [
            renderList(unref(te), (ue, w) => ({
              name: ue,
              fn: withCtx((N) => [
                renderSlot(r.$slots, ue, normalizeProps(guardReactiveProps({ ...N })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "instance", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars", "collapse"]),
      r.enableTimePicker ? (openBlock(), createElementBlock("div", Ir, [
        r.$slots["time-picker"] ? renderSlot(r.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(L), updateTime: unref(oe) }))) : (openBlock(), createBlock(Hn, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: z
        }, r.$props, {
          hours: unref(L).hours,
          minutes: unref(L).minutes,
          seconds: unref(L).seconds,
          "internal-model-value": r.internalModelValue,
          "disabled-times-config": unref(v),
          "validate-time": unref(h2),
          onMount: R[8] || (R[8] = (O) => A(unref(Tt).timePicker)),
          "onUpdate:hours": R[9] || (R[9] = (O) => unref(oe)(O)),
          "onUpdate:minutes": R[10] || (R[10] = (O) => unref(oe)(O, false)),
          "onUpdate:seconds": R[11] || (R[11] = (O) => unref(oe)(O, false, true)),
          onResetFlow: R[12] || (R[12] = (O) => r.$emit("reset-flow")),
          onOverlayClosed: R[13] || (R[13] = (O) => me(O, false)),
          onOverlayOpened: R[14] || (R[14] = (O) => me(O, true)),
          onAmPmChange: R[15] || (R[15] = (O) => r.$emit("am-pm-change", O))
        }), createSlots({ _: 2 }, [
          renderList(unref(X), (O, W) => ({
            name: O,
            fn: withCtx((ue) => [
              renderSlot(r.$slots, O, normalizeProps(guardReactiveProps(ue)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"]))
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var Er = (e, t) => {
  const l = ref(), {
    defaultedMultiCalendars: a,
    defaultedConfig: n,
    defaultedHighlight: i,
    defaultedRange: d,
    propDates: b,
    defaultedFilters: c,
    defaultedMultiDates: L
  } = Ce(e), { modelValue: v, year: _, month: h2, calendars: C } = Jt(e, t), { isDisabled: H } = kt(e), { selectYear: E, groupedYears: U, showYearPicker: f, isDisabled: B, toggleYearPicker: P, handleYearSelect: Q, handleYear: ae } = zn({
    modelValue: v,
    multiCalendars: a,
    range: d,
    highlight: i,
    calendars: C,
    propDates: b,
    month: h2,
    year: _,
    filters: c,
    props: e,
    emit: t
  }), oe = (g, X) => [g, X].map((A) => format(A, "MMMM", { locale: e.formatLocale })).join("-"), ee = computed(() => (g) => v.value ? Array.isArray(v.value) ? v.value.some((X) => isSameQuarter(g, X)) : isSameQuarter(v.value, g) : false), S = (g) => {
    if (d.value.enabled) {
      if (Array.isArray(v.value)) {
        const X = Me(g, v.value[0]) || Me(g, v.value[1]);
        return da(v.value, l.value, g) && !X;
      }
      return false;
    }
    return false;
  }, x = (g, X) => g.quarter === getQuarter(X) && g.year === getYear(X), Y = (g) => typeof i.value == "function" ? i.value({ quarter: getQuarter(g), year: getYear(g) }) : !!i.value.quarters.find((X) => x(X, g)), q = computed(() => (g) => {
    const X = set(/* @__PURE__ */ new Date(), { year: _.value(g) });
    return eachQuarterOfInterval({
      start: startOfYear(X),
      end: endOfYear(X)
    }).map((A) => {
      const p = startOfQuarter(A), se = endOfQuarter(A), I = H(A), D = S(p), V = Y(p);
      return {
        text: oe(p, se),
        value: p,
        active: ee.value(p),
        highlighted: V,
        disabled: I,
        isBetween: D
      };
    });
  }), de = (g) => {
    Xa(g, v, L.value.limit), t("auto-apply", true);
  }, ve = (g) => {
    v.value = Ja(v, g, t), va(v.value, t, e.autoApply, e.modelAuto);
  }, y = (g) => {
    v.value = g, t("auto-apply");
  };
  return {
    defaultedConfig: n,
    defaultedMultiCalendars: a,
    groupedYears: U,
    year: _,
    isDisabled: B,
    quarters: q,
    showYearPicker: f,
    modelValue: v,
    setHoverDate: (g) => {
      l.value = g;
    },
    selectYear: E,
    selectQuarter: (g, X, A) => {
      if (!A)
        return C.value[X].month = getMonth(endOfQuarter(g)), L.value.enabled ? de(g) : d.value.enabled ? ve(g) : y(g);
    },
    toggleYearPicker: P,
    handleYearSelect: Q,
    handleYear: ae
  };
};
var Fr = { class: "dp--quarter-items" };
var Lr = ["data-test", "disabled", "onClick", "onMouseover"];
var zr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "QuarterPicker",
  props: {
    ...rt
  },
  emits: [
    "update:internal-model-value",
    "reset-flow",
    "overlay-closed",
    "auto-apply",
    "range-start",
    "range-end",
    "overlay-toggle",
    "update-month-year"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, i = useSlots(), d = Je(i, "yearMode"), {
      defaultedMultiCalendars: b,
      defaultedConfig: c,
      groupedYears: L,
      year: v,
      isDisabled: _,
      quarters: h2,
      modelValue: C,
      showYearPicker: H,
      setHoverDate: E,
      selectQuarter: U,
      toggleYearPicker: f,
      handleYearSelect: B,
      handleYear: P
    } = Er(n, a);
    return t({ getSidebarProps: () => ({
      modelValue: C,
      year: v,
      selectQuarter: U,
      handleYearSelect: B,
      handleYear: P
    }) }), (ae, oe) => (openBlock(), createBlock(fa, {
      "multi-calendars": unref(b).count,
      collapse: ae.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: ee }) => [
        createBaseVNode("div", {
          class: "dp-quarter-picker-wrap",
          style: normalizeStyle({ minHeight: `${unref(c).modeHeight}px` })
        }, [
          ae.$slots["top-extra"] ? renderSlot(ae.$slots, "top-extra", {
            key: 0,
            value: ae.internalModelValue
          }) : createCommentVNode("", true),
          createBaseVNode("div", null, [
            createVNode(En, mergeProps(ae.$props, {
              items: unref(L)(ee),
              instance: ee,
              "show-year-picker": unref(H)[ee],
              year: unref(v)(ee),
              "is-disabled": (S) => unref(_)(ee, S),
              onHandleYear: (S) => unref(P)(ee, S),
              onYearSelect: (S) => unref(B)(S, ee),
              onToggleYearPicker: (S) => unref(f)(ee, S == null ? void 0 : S.flow, S == null ? void 0 : S.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(d), (S, x) => ({
                name: S,
                fn: withCtx((Y) => [
                  renderSlot(ae.$slots, S, normalizeProps(guardReactiveProps(Y)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          createBaseVNode("div", Fr, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(h2)(ee), (S, x) => (openBlock(), createElementBlock("div", { key: x }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass(["dp--qr-btn", {
                  "dp--qr-btn-active": S.active,
                  "dp--qr-btn-between": S.isBetween,
                  "dp--qr-btn-disabled": S.disabled,
                  "dp--highlighted": S.highlighted
                }]),
                "data-test": S.value,
                disabled: S.disabled,
                onClick: (Y) => unref(U)(S.value, ee, S.disabled),
                onMouseover: (Y) => unref(E)(S.value)
              }, [
                ae.$slots.quarter ? renderSlot(ae.$slots, "quarter", {
                  key: 0,
                  value: S.value,
                  text: S.text
                }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(S.text), 1)
                ], 64))
              ], 42, Lr)
            ]))), 128))
          ])
        ], 4)
      ]),
      _: 3
    }, 8, ["multi-calendars", "collapse"]));
  }
});
var Hr = ["id", "tabindex", "role", "aria-label"];
var Ur = {
  key: 0,
  class: "dp--menu-load-container"
};
var Vr = {
  key: 1,
  class: "dp--menu-header"
};
var Wr = {
  key: 0,
  class: "dp__sidebar_left"
};
var jr = ["data-test", "onClick", "onKeydown"];
var Kr = {
  key: 2,
  class: "dp__sidebar_right"
};
var Gr = {
  key: 3,
  class: "dp__action_extra"
};
var mn = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerMenu",
  props: {
    ...ca,
    shadow: { type: Boolean, default: false },
    openOnTop: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    noOverlayFocus: { type: Boolean, default: false },
    collapse: { type: Boolean, default: false },
    getInputRect: { type: Function, default: () => ({}) },
    isTextInputDate: { type: Boolean, default: false }
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
    "time-picker-open",
    "time-picker-close",
    "am-pm-change",
    "range-start",
    "range-end",
    "auto-apply-invalid",
    "date-update",
    "invalid-date",
    "overlay-toggle"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, i = ref(null), d = computed(() => {
      const { openOnTop: w, ...N } = n;
      return {
        ...N,
        flowStep: x.value,
        collapse: n.collapse,
        noOverlayFocus: n.noOverlayFocus,
        menuWrapRef: i.value
      };
    }), { setMenuFocused: b, setShiftKey: c, control: L } = Nn(), v = useSlots(), { defaultedTextInput: _, defaultedInline: h2, defaultedConfig: C, defaultedUI: H } = Ce(n), E = ref(null), U = ref(0), f = ref(null), B = ref(false), P = ref(null);
    onMounted(() => {
      if (!n.shadow) {
        B.value = true, Q(), window.addEventListener("resize", Q);
        const w = Ie(i);
        if (w && !_.value.enabled && !h2.value.enabled && (b(true), te()), w) {
          const N = (ce) => {
            C.value.allowPreventDefault && ce.preventDefault(), yt(ce, C.value, true);
          };
          w.addEventListener("pointerdown", N), w.addEventListener("mousedown", N);
        }
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", Q);
    });
    const Q = () => {
      const w = Ie(f);
      w && (U.value = w.getBoundingClientRect().width);
    }, { arrowRight: ae, arrowLeft: oe, arrowDown: ee, arrowUp: S } = bt(), { flowStep: x, updateFlowStep: Y, childMount: q, resetFlow: de, handleFlow: ve } = Zr(n, a, P), y = computed(() => n.monthPicker ? rr : n.yearPicker ? sr : n.timePicker ? kr : n.quarterPicker ? zr : Nr), z = computed(() => {
      var ce;
      if (C.value.arrowLeft) return C.value.arrowLeft;
      const w = (ce = i.value) == null ? void 0 : ce.getBoundingClientRect(), N = n.getInputRect();
      return (N == null ? void 0 : N.width) < (U == null ? void 0 : U.value) && (N == null ? void 0 : N.left) <= ((w == null ? void 0 : w.left) ?? 0) ? `${(N == null ? void 0 : N.width) / 2}px` : (N == null ? void 0 : N.right) >= ((w == null ? void 0 : w.right) ?? 0) && (N == null ? void 0 : N.width) < (U == null ? void 0 : U.value) ? `${(U == null ? void 0 : U.value) - (N == null ? void 0 : N.width) / 2}px` : "50%";
    }), te = () => {
      const w = Ie(i);
      w && w.focus({ preventScroll: true });
    }, g = computed(() => {
      var w;
      return ((w = P.value) == null ? void 0 : w.getSidebarProps()) || {};
    }), X = () => {
      n.openOnTop && a("recalculate-position");
    }, A = Je(v, "action"), p = computed(() => n.monthPicker || n.yearPicker ? Je(v, "monthYear") : n.timePicker ? Je(v, "timePicker") : Je(v, "shared")), se = computed(() => n.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), I = computed(() => ({
      dp__menu_disabled: n.disabled,
      dp__menu_readonly: n.readonly,
      "dp-menu-loading": n.loading
    })), D = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !h2.value.enabled,
        dp__relative: h2.value.enabled,
        ...H.value.menu ?? {}
      })
    ), V = (w) => {
      yt(w, C.value, true);
    }, s = () => {
      n.escClose && a("close-picker");
    }, M = (w) => {
      if (n.arrowNavigation) {
        if (w === je.up) return S();
        if (w === je.down) return ee();
        if (w === je.left) return oe();
        if (w === je.right) return ae();
      } else w === je.left || w === je.up ? $("handleArrow", je.left, 0, w === je.up) : $("handleArrow", je.right, 0, w === je.down);
    }, F = (w) => {
      c(w.shiftKey), !n.disableMonthYearSelect && w.code === Pe.tab && w.target.classList.contains("dp__menu") && L.value.shiftKeyInMenu && (w.preventDefault(), yt(w, C.value, true), a("close-picker"));
    }, u = () => {
      te(), a("time-picker-close");
    }, le = (w) => {
      var N, ce, he;
      (N = P.value) == null || N.toggleTimePicker(false, false), (ce = P.value) == null || ce.toggleMonthPicker(false, false, w), (he = P.value) == null || he.toggleYearPicker(false, false, w);
    }, me = (w, N = 0) => {
      var ce, he, et;
      return w === "month" ? (ce = P.value) == null ? void 0 : ce.toggleMonthPicker(false, true, N) : w === "year" ? (he = P.value) == null ? void 0 : he.toggleYearPicker(false, true, N) : w === "time" ? (et = P.value) == null ? void 0 : et.toggleTimePicker(true, false) : le(N);
    }, $ = (w, ...N) => {
      var ce, he;
      (ce = P.value) != null && ce[w] && ((he = P.value) == null || he[w](...N));
    }, ge = () => {
      $("selectCurrentDate");
    }, r = (w, N) => {
      $("presetDate", w, N);
    }, R = () => {
      $("clearHoverDate");
    }, O = (w, N) => {
      $("updateMonthYear", w, N);
    }, W = (w, N) => {
      w.preventDefault(), M(N);
    }, ue = (w) => {
      var N, ce, he;
      if (F(w), w.key === Pe.home || w.key === Pe.end)
        return $(
          "selectWeekDate",
          w.key === Pe.home,
          w.target.getAttribute("id")
        );
      switch ((w.key === Pe.pageUp || w.key === Pe.pageDown) && (w.shiftKey ? ($("changeYear", w.key === Pe.pageUp), (N = Ea(i.value, "overlay-year")) == null || N.focus()) : ($("changeMonth", w.key === Pe.pageUp), (ce = Ea(i.value, w.key === Pe.pageUp ? "action-prev" : "action-next")) == null || ce.focus()), w.target.getAttribute("id") && ((he = i.value) == null || he.focus({ preventScroll: true }))), w.key) {
        case Pe.esc:
          return s();
        case Pe.arrowLeft:
          return W(w, je.left);
        case Pe.arrowRight:
          return W(w, je.right);
        case Pe.arrowUp:
          return W(w, je.up);
        case Pe.arrowDown:
          return W(w, je.down);
        default:
          return;
      }
    };
    return t({
      updateMonthYear: O,
      switchView: me,
      handleFlow: ve
    }), (w, N) => {
      var ce, he, et;
      return openBlock(), createElementBlock("div", {
        id: w.uid ? `dp-menu-${w.uid}` : void 0,
        ref_key: "dpMenuRef",
        ref: i,
        tabindex: unref(h2).enabled ? void 0 : "0",
        role: unref(h2).enabled ? void 0 : "dialog",
        "aria-label": (ce = w.ariaLabels) == null ? void 0 : ce.menu,
        class: normalizeClass(D.value),
        style: normalizeStyle({ "--dp-arrow-left": z.value }),
        onMouseleave: R,
        onClick: V,
        onKeydown: ue
      }, [
        (w.disabled || w.readonly) && unref(h2).enabled || w.loading ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(I.value)
        }, [
          w.loading ? (openBlock(), createElementBlock("div", Ur, N[19] || (N[19] = [
            createBaseVNode("span", { class: "dp--menu-loader" }, null, -1)
          ]))) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true),
        w.$slots["menu-header"] ? (openBlock(), createElementBlock("div", Vr, [
          renderSlot(w.$slots, "menu-header")
        ])) : createCommentVNode("", true),
        !unref(h2).enabled && !w.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: normalizeClass(se.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: f,
          class: normalizeClass({
            dp__menu_content_wrapper: ((he = w.presetDates) == null ? void 0 : he.length) || !!w.$slots["left-sidebar"] || !!w.$slots["right-sidebar"],
            "dp--menu-content-wrapper-collapsed": e.collapse && (((et = w.presetDates) == null ? void 0 : et.length) || !!w.$slots["left-sidebar"] || !!w.$slots["right-sidebar"])
          }),
          style: normalizeStyle({ "--dp-menu-width": `${U.value}px` })
        }, [
          w.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", Wr, [
            renderSlot(w.$slots, "left-sidebar", normalizeProps(guardReactiveProps(g.value)))
          ])) : createCommentVNode("", true),
          w.presetDates.length ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass({ "dp--preset-dates-collapsed": e.collapse, "dp--preset-dates": true })
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(w.presetDates, (fe, vt) => (openBlock(), createElementBlock(Fragment, { key: vt }, [
              fe.slot ? renderSlot(w.$slots, fe.slot, {
                key: 0,
                presetDate: r,
                label: fe.label,
                value: fe.value
              }) : (openBlock(), createElementBlock("button", {
                key: 1,
                type: "button",
                style: normalizeStyle(fe.style || {}),
                class: normalizeClass(["dp__btn dp--preset-range", { "dp--preset-range-collapsed": e.collapse }]),
                "data-test": fe.testId ?? void 0,
                onClick: withModifiers((ot) => r(fe.value, fe.noTz), ["prevent"]),
                onKeydown: (ot) => unref(Ke)(ot, () => r(fe.value, fe.noTz), true)
              }, toDisplayString(fe.label), 47, jr))
            ], 64))), 128))
          ], 2)) : createCommentVNode("", true),
          createBaseVNode("div", {
            ref_key: "calendarWrapperRef",
            ref: E,
            class: "dp__instance_calendar",
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(y.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: P
            }, d.value, {
              "flow-step": unref(x),
              onMount: unref(q),
              onUpdateFlowStep: unref(Y),
              onResetFlow: unref(de),
              onFocusMenu: te,
              onSelectDate: N[0] || (N[0] = (fe) => w.$emit("select-date")),
              onDateUpdate: N[1] || (N[1] = (fe) => w.$emit("date-update", fe)),
              onTooltipOpen: N[2] || (N[2] = (fe) => w.$emit("tooltip-open", fe)),
              onTooltipClose: N[3] || (N[3] = (fe) => w.$emit("tooltip-close", fe)),
              onAutoApply: N[4] || (N[4] = (fe) => w.$emit("auto-apply", fe)),
              onRangeStart: N[5] || (N[5] = (fe) => w.$emit("range-start", fe)),
              onRangeEnd: N[6] || (N[6] = (fe) => w.$emit("range-end", fe)),
              onInvalidFixedRange: N[7] || (N[7] = (fe) => w.$emit("invalid-fixed-range", fe)),
              onTimeUpdate: N[8] || (N[8] = (fe) => w.$emit("time-update")),
              onAmPmChange: N[9] || (N[9] = (fe) => w.$emit("am-pm-change", fe)),
              onTimePickerOpen: N[10] || (N[10] = (fe) => w.$emit("time-picker-open", fe)),
              onTimePickerClose: u,
              onRecalculatePosition: X,
              onUpdateMonthYear: N[11] || (N[11] = (fe) => w.$emit("update-month-year", fe)),
              onAutoApplyInvalid: N[12] || (N[12] = (fe) => w.$emit("auto-apply-invalid", fe)),
              onInvalidDate: N[13] || (N[13] = (fe) => w.$emit("invalid-date", fe)),
              onOverlayToggle: N[14] || (N[14] = (fe) => w.$emit("overlay-toggle", fe)),
              "onUpdate:internalModelValue": N[15] || (N[15] = (fe) => w.$emit("update:internal-model-value", fe))
            }), createSlots({ _: 2 }, [
              renderList(p.value, (fe, vt) => ({
                name: fe,
                fn: withCtx((ot) => [
                  renderSlot(w.$slots, fe, normalizeProps(guardReactiveProps({ ...ot })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          w.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", Kr, [
            renderSlot(w.$slots, "right-sidebar", normalizeProps(guardReactiveProps(g.value)))
          ])) : createCommentVNode("", true),
          w.$slots["action-extra"] ? (openBlock(), createElementBlock("div", Gr, [
            w.$slots["action-extra"] ? renderSlot(w.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: ge
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 6),
        !w.autoApply || unref(C).keepActionRow ? (openBlock(), createBlock(Jl, mergeProps({
          key: 3,
          "menu-mount": B.value
        }, d.value, {
          "calendar-width": U.value,
          onClosePicker: N[16] || (N[16] = (fe) => w.$emit("close-picker")),
          onSelectDate: N[17] || (N[17] = (fe) => w.$emit("select-date")),
          onInvalidSelect: N[18] || (N[18] = (fe) => w.$emit("invalid-select")),
          onSelectNow: ge
        }), createSlots({ _: 2 }, [
          renderList(unref(A), (fe, vt) => ({
            name: fe,
            fn: withCtx((ot) => [
              renderSlot(w.$slots, fe, normalizeProps(guardReactiveProps({ ...ot })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
      ], 46, Hr);
    };
  }
});
var Ct = ((e) => (e.center = "center", e.left = "left", e.right = "right", e))(Ct || {});
var Qr = ({
  menuRef: e,
  menuRefInner: t,
  inputRef: l,
  pickerWrapperRef: a,
  inline: n,
  emit: i,
  props: d,
  slots: b
}) => {
  const { defaultedConfig: c } = Ce(d), L = ref({}), v = ref(false), _ = ref({
    top: "0",
    left: "0"
  }), h2 = ref(false), C = toRef(d, "teleportCenter");
  watch(C, () => {
    _.value = JSON.parse(JSON.stringify({})), ae();
  });
  const H = (g) => {
    if (d.teleport) {
      const X = g.getBoundingClientRect();
      return {
        left: X.left + window.scrollX,
        top: X.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, E = (g, X) => {
    _.value.left = `${g + X - L.value.width}px`;
  }, U = (g) => {
    _.value.left = `${g}px`;
  }, f = (g, X) => {
    d.position === Ct.left && U(g), d.position === Ct.right && E(g, X), d.position === Ct.center && (_.value.left = `${g + X / 2 - L.value.width / 2}px`);
  }, B = (g) => {
    const { width: X, height: A } = g.getBoundingClientRect(), { top: p, left: se } = d.altPosition ? d.altPosition(g) : H(g);
    return { top: +p, left: +se, width: X, height: A };
  }, P = () => {
    _.value.left = "50%", _.value.top = "50%", _.value.transform = "translate(-50%, -50%)", _.value.position = "fixed", delete _.value.opacity;
  }, Q = () => {
    const g = Ie(l), { top: X, left: A, transform: p } = d.altPosition(g);
    _.value = { top: `${X}px`, left: `${A}px`, transform: p ?? "" };
  }, ae = (g = true) => {
    var X;
    if (!n.value.enabled) {
      if (C.value) return P();
      if (d.altPosition !== null) return Q();
      if (g) {
        const A = d.teleport ? (X = t.value) == null ? void 0 : X.$el : e.value;
        A && (L.value = A.getBoundingClientRect()), i("recalculate-position");
      }
      return de();
    }
  }, oe = ({ inputEl: g, left: X, width: A }) => {
    window.screen.width > 768 && !v.value && f(X, A), x(g);
  }, ee = (g) => {
    const { top: X, left: A, height: p, width: se } = B(g);
    _.value.top = `${p + X + +d.offset}px`, h2.value = false, v.value || (_.value.left = `${A + se / 2 - L.value.width / 2}px`), oe({ inputEl: g, left: A, width: se });
  }, S = (g) => {
    const { top: X, left: A, width: p } = B(g);
    _.value.top = `${X - +d.offset - L.value.height}px`, h2.value = true, oe({ inputEl: g, left: A, width: p });
  }, x = (g) => {
    if (d.autoPosition) {
      const { left: X, width: A } = B(g), { left: p, right: se } = L.value;
      if (!v.value) {
        if (Math.abs(p) !== Math.abs(se)) {
          if (p <= 0)
            return v.value = true, U(X);
          if (se >= document.documentElement.clientWidth)
            return v.value = true, E(X, A);
        }
        return f(X, A);
      }
    }
  }, Y = () => {
    const g = Ie(l);
    if (g) {
      const { height: X } = L.value, { top: A, height: p } = g.getBoundingClientRect(), I = window.innerHeight - A - p, D = A;
      return X <= I ? Mt.bottom : X > I && X <= D ? Mt.top : I >= D ? Mt.bottom : Mt.top;
    }
    return Mt.bottom;
  }, q = (g) => Y() === Mt.bottom ? ee(g) : S(g), de = () => {
    const g = Ie(l);
    if (g)
      return d.autoPosition ? q(g) : ee(g);
  }, ve = function(g) {
    if (g) {
      const X = g.scrollHeight > g.clientHeight, p = window.getComputedStyle(g).overflowY.indexOf("hidden") !== -1;
      return X && !p;
    }
    return true;
  }, y = function(g) {
    return !g || g === document.body || g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : ve(g) ? g : y(
      g.assignedSlot && c.value.shadowDom ? g.assignedSlot.parentNode : g.parentNode
    );
  }, z = (g) => {
    if (g)
      switch (d.position) {
        case Ct.left:
          return { left: 0, transform: "translateX(0)" };
        case Ct.right:
          return { left: `${g.width}px`, transform: "translateX(-100%)" };
        default:
          return { left: `${g.width / 2}px`, transform: "translateX(-50%)" };
      }
    return {};
  };
  return {
    openOnTop: h2,
    menuStyle: _,
    xCorrect: v,
    setMenuPosition: ae,
    getScrollableParent: y,
    shadowRender: (g, X) => {
      var s, M, F;
      const A = document.createElement("div"), p = (s = Ie(l)) == null ? void 0 : s.getBoundingClientRect();
      A.setAttribute("id", "dp--temp-container");
      const se = (M = a.value) != null && M.clientWidth ? a.value : document.body;
      se.append(A);
      const I = z(p), D = c.value.shadowDom ? Object.keys(b).filter(
        (u) => ["right-sidebar", "left-sidebar", "top-extra", "action-extra"].includes(u)
      ) : Object.keys(b), V = h(
        g,
        {
          ...X,
          shadow: true,
          style: { opacity: 0, position: "absolute", ...I }
        },
        Object.fromEntries(D.map((u) => [u, b[u]]))
      );
      render(V, A), L.value = (F = V.el) == null ? void 0 : F.getBoundingClientRect(), render(null, A), se.removeChild(A);
    }
  };
};
var mt = [
  { name: "clock-icon", use: ["time", "calendar", "shared"] },
  { name: "arrow-left", use: ["month-year", "calendar", "shared", "year-mode"] },
  { name: "arrow-right", use: ["month-year", "calendar", "shared", "year-mode"] },
  { name: "arrow-up", use: ["time", "calendar", "month-year", "shared"] },
  { name: "arrow-down", use: ["time", "calendar", "month-year", "shared"] },
  { name: "calendar-icon", use: ["month-year", "time", "calendar", "shared", "year-mode"] },
  { name: "day", use: ["calendar", "shared"] },
  { name: "month-overlay-value", use: ["calendar", "month-year", "shared"] },
  { name: "year-overlay-value", use: ["calendar", "month-year", "shared", "year-mode"] },
  { name: "year-overlay", use: ["month-year", "shared"] },
  { name: "month-overlay", use: ["month-year", "shared"] },
  { name: "month-overlay-header", use: ["month-year", "shared"] },
  { name: "year-overlay-header", use: ["month-year", "shared"] },
  { name: "hours-overlay-value", use: ["calendar", "time", "shared"] },
  { name: "hours-overlay-header", use: ["calendar", "time", "shared"] },
  { name: "minutes-overlay-value", use: ["calendar", "time", "shared"] },
  { name: "minutes-overlay-header", use: ["calendar", "time", "shared"] },
  { name: "seconds-overlay-value", use: ["calendar", "time", "shared"] },
  { name: "seconds-overlay-header", use: ["calendar", "time", "shared"] },
  { name: "hours", use: ["calendar", "time", "shared"] },
  { name: "minutes", use: ["calendar", "time", "shared"] },
  { name: "month", use: ["calendar", "month-year", "shared"] },
  { name: "year", use: ["calendar", "month-year", "shared", "year-mode"] },
  { name: "action-buttons", use: ["action"] },
  { name: "action-preview", use: ["action"] },
  { name: "calendar-header", use: ["calendar", "shared"] },
  { name: "marker-tooltip", use: ["calendar", "shared"] },
  { name: "action-extra", use: ["menu"] },
  { name: "time-picker-overlay", use: ["calendar", "time", "shared"] },
  { name: "am-pm-button", use: ["calendar", "time", "shared"] },
  { name: "left-sidebar", use: ["menu"] },
  { name: "right-sidebar", use: ["menu"] },
  { name: "month-year", use: ["month-year", "shared"] },
  { name: "time-picker", use: ["menu", "shared"] },
  { name: "action-row", use: ["action"] },
  { name: "marker", use: ["calendar", "shared"] },
  { name: "quarter", use: ["shared"] },
  { name: "top-extra", use: ["shared", "month-year"] },
  { name: "tp-inline-arrow-up", use: ["shared", "time"] },
  { name: "tp-inline-arrow-down", use: ["shared", "time"] },
  { name: "menu-header", use: ["menu"] }
];
var qr = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var Xr = {
  all: () => mt,
  monthYear: () => mt.filter((e) => e.use.includes("month-year")),
  input: () => qr,
  timePicker: () => mt.filter((e) => e.use.includes("time")),
  action: () => mt.filter((e) => e.use.includes("action")),
  calendar: () => mt.filter((e) => e.use.includes("calendar")),
  menu: () => mt.filter((e) => e.use.includes("menu")),
  shared: () => mt.filter((e) => e.use.includes("shared")),
  yearMode: () => mt.filter((e) => e.use.includes("year-mode"))
};
var Je = (e, t, l) => {
  const a = [];
  return Xr[t]().forEach((n) => {
    e[n.name] && a.push(n.name);
  }), l != null && l.length && l.forEach((n) => {
    n.slot && a.push(n.slot);
  }), a;
};
var Xt = (e) => {
  const t = computed(() => (a) => e.value ? a ? e.value.open : e.value.close : ""), l = computed(() => (a) => e.value ? a ? e.value.menuAppearTop : e.value.menuAppearBottom : "");
  return { transitionName: t, showTransition: !!e.value, menuTransition: l };
};
var Jt = (e, t, l) => {
  const { defaultedRange: a, defaultedTz: n } = Ce(e), i = G(qe(G(), n.value.timezone)), d = ref([{ month: getMonth(i), year: getYear(i) }]), b = (h2) => {
    const C = {
      hours: getHours(i),
      minutes: getMinutes(i),
      seconds: 0
    };
    return a.value.enabled ? [C[h2], C[h2]] : C[h2];
  }, c = reactive({
    hours: b("hours"),
    minutes: b("minutes"),
    seconds: b("seconds")
  });
  watch(
    a,
    (h2, C) => {
      h2.enabled !== C.enabled && (c.hours = b("hours"), c.minutes = b("minutes"), c.seconds = b("seconds"));
    },
    { deep: true }
  );
  const L = computed({
    get: () => e.internalModelValue,
    set: (h2) => {
      !e.readonly && !e.disabled && t("update:internal-model-value", h2);
    }
  }), v = computed(
    () => (h2) => d.value[h2] ? d.value[h2].month : 0
  ), _ = computed(
    () => (h2) => d.value[h2] ? d.value[h2].year : 0
  );
  return watch(
    L,
    (h2, C) => {
      l && JSON.stringify(h2 ?? {}) !== JSON.stringify(C ?? {}) && l();
    },
    { deep: true }
  ), {
    calendars: d,
    time: c,
    modelValue: L,
    month: v,
    year: _,
    today: i
  };
};
var Jr = (e, t) => {
  const {
    defaultedMultiCalendars: l,
    defaultedMultiDates: a,
    defaultedUI: n,
    defaultedHighlight: i,
    defaultedTz: d,
    propDates: b,
    defaultedRange: c
  } = Ce(t), { isDisabled: L } = kt(t), v = ref(null), _ = ref(qe(/* @__PURE__ */ new Date(), d.value.timezone)), h2 = (s) => {
    !s.current && t.hideOffsetDates || (v.value = s.value);
  }, C = () => {
    v.value = null;
  }, H = (s) => Array.isArray(e.value) && c.value.enabled && e.value[0] && v.value ? s ? Be(v.value, e.value[0]) : Oe(v.value, e.value[0]) : true, E = (s, M) => {
    const F = () => e.value ? M ? e.value[0] || null : e.value[1] : null, u = e.value && Array.isArray(e.value) ? F() : null;
    return Me(G(s.value), u);
  }, U = (s) => {
    const M = Array.isArray(e.value) ? e.value[0] : null;
    return s ? !Oe(v.value ?? null, M) : true;
  }, f = (s, M = true) => (c.value.enabled || t.weekPicker) && Array.isArray(e.value) && e.value.length === 2 ? t.hideOffsetDates && !s.current ? false : Me(G(s.value), e.value[M ? 0 : 1]) : c.value.enabled ? E(s, M) && U(M) || Me(s.value, Array.isArray(e.value) ? e.value[0] : null) && H(M) : false, B = (s, M) => {
    if (Array.isArray(e.value) && e.value[0] && e.value.length === 1) {
      const F = Me(s.value, v.value);
      return M ? Be(e.value[0], s.value) && F : Oe(e.value[0], s.value) && F;
    }
    return false;
  }, P = (s) => !e.value || t.hideOffsetDates && !s.current ? false : c.value.enabled ? t.modelAuto && Array.isArray(e.value) ? Me(s.value, e.value[0] ? e.value[0] : _.value) : false : a.value.enabled && Array.isArray(e.value) ? e.value.some((M) => Me(M, s.value)) : Me(s.value, e.value ? e.value : _.value), Q = (s) => {
    if (c.value.autoRange || t.weekPicker) {
      if (v.value) {
        if (t.hideOffsetDates && !s.current) return false;
        const M = addDays(v.value, +c.value.autoRange), F = it(G(v.value), t.weekStart);
        return t.weekPicker ? Me(F[1], G(s.value)) : Me(M, G(s.value));
      }
      return false;
    }
    return false;
  }, ae = (s) => {
    if (c.value.autoRange || t.weekPicker) {
      if (v.value) {
        const M = addDays(v.value, +c.value.autoRange);
        if (t.hideOffsetDates && !s.current) return false;
        const F = it(G(v.value), t.weekStart);
        return t.weekPicker ? Be(s.value, F[0]) && Oe(s.value, F[1]) : Be(s.value, v.value) && Oe(s.value, M);
      }
      return false;
    }
    return false;
  }, oe = (s) => {
    if (c.value.autoRange || t.weekPicker) {
      if (v.value) {
        if (t.hideOffsetDates && !s.current) return false;
        const M = it(G(v.value), t.weekStart);
        return t.weekPicker ? Me(M[0], s.value) : Me(v.value, s.value);
      }
      return false;
    }
    return false;
  }, ee = (s) => da(e.value, v.value, s.value), S = () => t.modelAuto && Array.isArray(t.internalModelValue) ? !!t.internalModelValue[0] : false, x = () => t.modelAuto ? An(t.internalModelValue) : true, Y = (s) => {
    if (t.weekPicker) return false;
    const M = c.value.enabled ? !f(s) && !f(s, false) : true;
    return !L(s.value) && !P(s) && !(!s.current && t.hideOffsetDates) && M;
  }, q = (s) => c.value.enabled ? t.modelAuto ? S() && P(s) : false : P(s), de = (s) => i.value ? Dl(s.value, b.value.highlight) : false, ve = (s) => {
    const M = L(s.value);
    return M && (typeof i.value == "function" ? !i.value(s.value, M) : !i.value.options.highlightDisabled);
  }, y = (s) => {
    var M;
    return typeof i.value == "function" ? i.value(s.value) : (M = i.value.weekdays) == null ? void 0 : M.includes(s.value.getDay());
  }, z = (s) => (c.value.enabled || t.weekPicker) && (!(l.value.count > 0) || s.current) && x() && !(!s.current && t.hideOffsetDates) && !P(s) ? ee(s) : false, te = (s) => {
    const { isRangeStart: M, isRangeEnd: F } = p(s), u = c.value.enabled ? M || F : false;
    return {
      dp__cell_offset: !s.current,
      dp__pointer: !t.disabled && !(!s.current && t.hideOffsetDates) && !L(s.value),
      dp__cell_disabled: L(s.value),
      dp__cell_highlight: !ve(s) && (de(s) || y(s)) && !q(s) && !u && !oe(s) && !(z(s) && t.weekPicker) && !F,
      dp__cell_highlight_active: !ve(s) && (de(s) || y(s)) && q(s),
      dp__today: !t.noToday && Me(s.value, _.value) && s.current,
      "dp--past": Oe(s.value, _.value),
      "dp--future": Be(s.value, _.value)
    };
  }, g = (s) => ({
    dp__active_date: q(s),
    dp__date_hover: Y(s)
  }), X = (s) => {
    if (e.value && !Array.isArray(e.value)) {
      const M = it(e.value, t.weekStart);
      return {
        ...I(s),
        dp__range_start: Me(M[0], s.value),
        dp__range_end: Me(M[1], s.value),
        dp__range_between_week: Be(s.value, M[0]) && Oe(s.value, M[1])
      };
    }
    return {
      ...I(s)
    };
  }, A = (s) => {
    if (e.value && Array.isArray(e.value)) {
      const M = it(e.value[0], t.weekStart), F = e.value[1] ? it(e.value[1], t.weekStart) : [];
      return {
        ...I(s),
        dp__range_start: Me(M[0], s.value) || Me(F[0], s.value),
        dp__range_end: Me(M[1], s.value) || Me(F[1], s.value),
        dp__range_between_week: Be(s.value, M[0]) && Oe(s.value, M[1]) || Be(s.value, F[0]) && Oe(s.value, F[1]),
        dp__range_between: Be(s.value, M[1]) && Oe(s.value, F[0])
      };
    }
    return {
      ...I(s)
    };
  }, p = (s) => {
    const M = l.value.count > 0 ? s.current && f(s) && x() : f(s) && x(), F = l.value.count > 0 ? s.current && f(s, false) && x() : f(s, false) && x();
    return { isRangeStart: M, isRangeEnd: F };
  }, se = (s) => {
    const { isRangeStart: M, isRangeEnd: F } = p(s);
    return {
      dp__range_start: M,
      dp__range_end: F,
      dp__range_between: z(s),
      dp__date_hover: Me(s.value, v.value) && !M && !F && !t.weekPicker,
      dp__date_hover_start: B(s, true),
      dp__date_hover_end: B(s, false)
    };
  }, I = (s) => ({
    ...se(s),
    dp__cell_auto_range: ae(s),
    dp__cell_auto_range_start: oe(s),
    dp__cell_auto_range_end: Q(s)
  }), D = (s) => c.value.enabled ? c.value.autoRange ? I(s) : t.modelAuto ? { ...g(s), ...se(s) } : t.weekPicker ? A(s) : se(s) : t.weekPicker ? X(s) : g(s);
  return {
    setHoverDate: h2,
    clearHoverDate: C,
    getDayClassData: (s) => t.hideOffsetDates && !s.current ? {} : {
      ...te(s),
      ...D(s),
      [t.dayClass ? t.dayClass(s.value, t.internalModelValue) : ""]: true,
      ...n.value.calendarCell ?? {}
    }
  };
};
var kt = (e) => {
  const { defaultedFilters: t, defaultedRange: l, propDates: a, defaultedMultiDates: n } = Ce(e), i = (y) => a.value.disabledDates ? typeof a.value.disabledDates == "function" ? a.value.disabledDates(G(y)) : !!sa(y, a.value.disabledDates) : false, d = (y) => a.value.maxDate ? e.yearPicker ? getYear(y) > getYear(a.value.maxDate) : Be(y, a.value.maxDate) : false, b = (y) => a.value.minDate ? e.yearPicker ? getYear(y) < getYear(a.value.minDate) : Oe(y, a.value.minDate) : false, c = (y) => {
    const z = d(y), te = b(y), g = i(y), A = t.value.months.map((V) => +V).includes(getMonth(y)), p = e.disabledWeekDays.length ? e.disabledWeekDays.some((V) => +V === getDay(y)) : false, se = C(y), I = getYear(y), D = I < +e.yearRange[0] || I > +e.yearRange[1];
    return !(z || te || g || A || D || p || se);
  }, L = (y, z) => Oe(...pt(a.value.minDate, y, z)) || Me(...pt(a.value.minDate, y, z)), v = (y, z) => Be(...pt(a.value.maxDate, y, z)) || Me(...pt(a.value.maxDate, y, z)), _ = (y, z, te) => {
    let g = false;
    return a.value.maxDate && te && v(y, z) && (g = true), a.value.minDate && !te && L(y, z) && (g = true), g;
  }, h2 = (y, z, te, g) => {
    let X = false;
    return g && (a.value.minDate || a.value.maxDate) ? a.value.minDate && a.value.maxDate ? X = _(y, z, te) : (a.value.minDate && L(y, z) || a.value.maxDate && v(y, z)) && (X = true) : X = true, X;
  }, C = (y) => Array.isArray(a.value.allowedDates) && !a.value.allowedDates.length ? true : a.value.allowedDates ? !sa(y, a.value.allowedDates) : false, H = (y) => !c(y), E = (y) => l.value.noDisabledRange ? !eachDayOfInterval({ start: y[0], end: y[1] }).some((te) => H(te)) : true, U = (y) => {
    if (y) {
      const z = getYear(y);
      return z >= +e.yearRange[0] && z <= e.yearRange[1];
    }
    return true;
  }, f = (y, z) => !!(Array.isArray(y) && y[z] && (l.value.maxRange || l.value.minRange) && U(y[z])), B = (y, z, te = 0) => {
    if (f(z, te) && U(y)) {
      const g = differenceInCalendarDays(y, z[te]), X = Cn(z[te], y), A = X.length === 1 ? 0 : X.filter((se) => H(se)).length, p = Math.abs(g) - (l.value.minMaxRawRange ? 0 : A);
      if (l.value.minRange && l.value.maxRange)
        return p >= +l.value.minRange && p <= +l.value.maxRange;
      if (l.value.minRange) return p >= +l.value.minRange;
      if (l.value.maxRange) return p <= +l.value.maxRange;
    }
    return true;
  }, P = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, Q = (y) => Array.isArray(y) ? [y[0] ? Pa(y[0]) : null, y[1] ? Pa(y[1]) : null] : Pa(y), ae = (y, z, te) => y.find(
    (g) => +g.hours === getHours(z) && g.minutes === "*" ? true : +g.minutes === getMinutes(z) && +g.hours === getHours(z)
  ) && te, oe = (y, z, te) => {
    const [g, X] = y, [A, p] = z;
    return !ae(g, A, te) && !ae(X, p, te) && te;
  }, ee = (y, z) => {
    const te = Array.isArray(z) ? z : [z];
    return Array.isArray(e.disabledTimes) ? Array.isArray(e.disabledTimes[0]) ? oe(e.disabledTimes, te, y) : !te.some((g) => ae(e.disabledTimes, g, y)) : y;
  }, S = (y, z) => {
    const te = Array.isArray(z) ? [St(z[0]), z[1] ? St(z[1]) : void 0] : St(z), g = !e.disabledTimes(te);
    return y && g;
  }, x = (y, z) => e.disabledTimes ? Array.isArray(e.disabledTimes) ? ee(z, y) : S(z, y) : z, Y = (y) => {
    let z = true;
    if (!y || P()) return true;
    const te = !a.value.minDate && !a.value.maxDate ? Q(y) : y;
    return (e.maxTime || a.value.maxDate) && (z = dn(
      e.maxTime,
      a.value.maxDate,
      "max",
      Ye(te),
      z
    )), (e.minTime || a.value.minDate) && (z = dn(
      e.minTime,
      a.value.minDate,
      "min",
      Ye(te),
      z
    )), x(y, z);
  }, q = (y) => {
    if (!e.monthPicker) return true;
    let z = true;
    const te = G(lt(y));
    if (a.value.minDate && a.value.maxDate) {
      const g = G(lt(a.value.minDate)), X = G(lt(a.value.maxDate));
      return Be(te, g) && Oe(te, X) || Me(te, g) || Me(te, X);
    }
    if (a.value.minDate) {
      const g = G(lt(a.value.minDate));
      z = Be(te, g) || Me(te, g);
    }
    if (a.value.maxDate) {
      const g = G(lt(a.value.maxDate));
      z = Oe(te, g) || Me(te, g);
    }
    return z;
  }, de = computed(() => (y) => !e.enableTimePicker || e.ignoreTimeValidation ? true : Y(y)), ve = computed(() => (y) => e.monthPicker ? Array.isArray(y) && (l.value.enabled || n.value.enabled) ? !y.filter((te) => !q(te)).length : q(y) : true);
  return {
    isDisabled: H,
    validateDate: c,
    validateMonthYearInRange: h2,
    isDateRangeAllowed: E,
    checkMinMaxRange: B,
    isValidTime: Y,
    isTimeValid: de,
    isMonthValid: ve
  };
};
var ma = () => {
  const e = computed(() => (a, n) => a == null ? void 0 : a.includes(n)), t = computed(() => (a, n) => a.count ? a.solo ? true : n === 0 : true), l = computed(() => (a, n) => a.count ? a.solo ? true : n === a.count - 1 : true);
  return { hideNavigationButtons: e, showLeftIcon: t, showRightIcon: l };
};
var Zr = (e, t, l) => {
  const a = ref(0), n = reactive({
    [Tt.timePicker]: !e.enableTimePicker || e.timePicker || e.monthPicker,
    [Tt.calendar]: false,
    [Tt.header]: false
  }), i = computed(() => e.monthPicker || e.timePicker), d = (_) => {
    var h2;
    if ((h2 = e.flow) != null && h2.length) {
      if (!_ && i.value) return v();
      n[_] = true, Object.keys(n).filter((C) => !n[C]).length || v();
    }
  }, b = () => {
    var _, h2;
    (_ = e.flow) != null && _.length && a.value !== -1 && (a.value += 1, t("flow-step", a.value), v()), ((h2 = e.flow) == null ? void 0 : h2.length) === a.value && nextTick().then(() => c());
  }, c = () => {
    a.value = -1;
  }, L = (_, h2, ...C) => {
    var H, E;
    e.flow[a.value] === _ && l.value && ((E = (H = l.value)[h2]) == null || E.call(H, ...C));
  }, v = (_ = 0) => {
    _ && (a.value += _), L(He.month, "toggleMonthPicker", true), L(He.year, "toggleYearPicker", true), L(He.calendar, "toggleTimePicker", false, true), L(He.time, "toggleTimePicker", true, true);
    const h2 = e.flow[a.value];
    (h2 === He.hours || h2 === He.minutes || h2 === He.seconds) && L(h2, "toggleTimePicker", true, true, h2);
  };
  return { childMount: d, updateFlowStep: b, resetFlow: c, handleFlow: v, flowStep: a };
};
var xr = {
  key: 1,
  class: "dp__input_wrap"
};
var eo = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-label", "aria-disabled", "aria-invalid"];
var to = {
  key: 2,
  class: "dp--clear-btn"
};
var ao = ["aria-label"];
var no = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: false },
    inputValue: { type: String, default: "" },
    ...ca
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
    "blur",
    "real-blur",
    "text-input"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, {
      defaultedTextInput: i,
      defaultedAriaLabels: d,
      defaultedInline: b,
      defaultedConfig: c,
      defaultedRange: L,
      defaultedMultiDates: v,
      defaultedUI: _,
      getDefaultPattern: h2,
      getDefaultStartTime: C
    } = Ce(n), { checkMinMaxRange: H } = kt(n), E = ref(), U = ref(null), f = ref(false), B = ref(false), P = computed(
      () => ({
        dp__pointer: !n.disabled && !n.readonly && !i.value.enabled,
        dp__disabled: n.disabled,
        dp__input_readonly: !i.value.enabled,
        dp__input: true,
        dp__input_icon_pad: !n.hideInputIcon,
        dp__input_valid: typeof n.state == "boolean" ? n.state : false,
        dp__input_invalid: typeof n.state == "boolean" ? !n.state : false,
        dp__input_focus: f.value || n.isMenuOpen,
        dp__input_reg: !i.value.enabled,
        ..._.value.input ?? {}
      })
    ), Q = () => {
      a("set-input-date", null), n.clearable && n.autoApply && (a("set-empty-date"), E.value = null);
    }, ae = (p) => {
      const se = C();
      return Ml(
        p,
        i.value.format ?? h2(),
        se ?? On({}, n.enableSeconds),
        n.inputValue,
        B.value,
        n.formatLocale
      );
    }, oe = (p) => {
      const { rangeSeparator: se } = i.value, [I, D] = p.split(`${se}`);
      if (I) {
        const V = ae(I.trim()), s = D ? ae(D.trim()) : null;
        if (isAfter(V, s)) return;
        const M = V && s ? [V, s] : [V];
        H(s, M, 0) && (E.value = V ? M : null);
      }
    }, ee = () => {
      B.value = true;
    }, S = (p) => {
      if (L.value.enabled)
        oe(p);
      else if (v.value.enabled) {
        const se = p.split(";");
        E.value = se.map((I) => ae(I.trim())).filter((I) => I);
      } else
        E.value = ae(p);
    }, x = (p) => {
      var I;
      const se = typeof p == "string" ? p : (I = p.target) == null ? void 0 : I.value;
      se !== "" ? (i.value.openMenu && !n.isMenuOpen && a("open"), S(se), a("set-input-date", E.value)) : Q(), B.value = false, a("update:input-value", se), a("text-input", p, E.value);
    }, Y = (p) => {
      i.value.enabled ? (S(p.target.value), i.value.enterSubmit && Fa(E.value) && n.inputValue !== "" ? (a("set-input-date", E.value, true), E.value = null) : i.value.enterSubmit && n.inputValue === "" && (E.value = null, a("clear"))) : ve(p);
    }, q = (p, se) => {
      i.value.enabled && i.value.tabSubmit && !se && S(p.target.value), i.value.tabSubmit && Fa(E.value) && n.inputValue !== "" ? (a("set-input-date", E.value, true, true), E.value = null) : i.value.tabSubmit && n.inputValue === "" && (E.value = null, a("clear", true));
    }, de = () => {
      f.value = true, a("focus"), nextTick().then(() => {
        var p;
        i.value.enabled && i.value.selectOnFocus && ((p = U.value) == null || p.select());
      });
    }, ve = (p) => {
      if (yt(p, c.value, true), i.value.enabled && i.value.openMenu && !b.value.input) {
        if (i.value.openMenu === "open" && !n.isMenuOpen) return a("open");
        if (i.value.openMenu === "toggle") return a("toggle");
      } else i.value.enabled || a("toggle");
    }, y = () => {
      a("real-blur"), f.value = false, (!n.isMenuOpen || b.value.enabled && b.value.input) && a("blur"), n.autoApply && i.value.enabled && E.value && !n.isMenuOpen && (a("set-input-date", E.value), a("select-date"), E.value = null);
    }, z = (p) => {
      yt(p, c.value, true), a("clear");
    }, te = (p) => {
      if (p.key === "Tab" && q(p), p.key === "Enter" && Y(p), !i.value.enabled) {
        if (p.code === "Tab") return;
        p.preventDefault();
      }
    }, g = () => {
      var p;
      (p = U.value) == null || p.focus({ preventScroll: true });
    }, X = (p) => {
      E.value = p;
    }, A = (p) => {
      p.key === Pe.tab && q(p, true);
    };
    return t({
      focusInput: g,
      setParsedDate: X
    }), (p, se) => {
      var I, D, V;
      return openBlock(), createElementBlock("div", { onClick: ve }, [
        p.$slots.trigger && !p.$slots["dp-input"] && !unref(b).enabled ? renderSlot(p.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !p.$slots.trigger && (!unref(b).enabled || unref(b).input) ? (openBlock(), createElementBlock("div", xr, [
          p.$slots["dp-input"] && !p.$slots.trigger && (!unref(b).enabled || unref(b).enabled && unref(b).input) ? renderSlot(p.$slots, "dp-input", {
            key: 0,
            value: e.inputValue,
            isMenuOpen: e.isMenuOpen,
            onInput: x,
            onEnter: Y,
            onTab: q,
            onClear: z,
            onBlur: y,
            onKeypress: te,
            onPaste: ee,
            onFocus: de,
            openMenu: () => p.$emit("open"),
            closeMenu: () => p.$emit("close"),
            toggleMenu: () => p.$emit("toggle")
          }) : createCommentVNode("", true),
          p.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            id: p.uid ? `dp-input-${p.uid}` : void 0,
            ref_key: "inputRef",
            ref: U,
            "data-test": "dp-input",
            name: p.name,
            class: normalizeClass(P.value),
            inputmode: unref(i).enabled ? "text" : "none",
            placeholder: p.placeholder,
            disabled: p.disabled,
            readonly: p.readonly,
            required: p.required,
            value: e.inputValue,
            autocomplete: p.autocomplete,
            "aria-label": (I = unref(d)) == null ? void 0 : I.input,
            "aria-disabled": p.disabled || void 0,
            "aria-invalid": p.state === false ? true : void 0,
            onInput: x,
            onBlur: y,
            onFocus: de,
            onKeypress: te,
            onKeydown: se[0] || (se[0] = (s) => te(s)),
            onPaste: ee
          }, null, 42, eo)),
          createBaseVNode("div", {
            onClick: se[3] || (se[3] = (s) => a("toggle"))
          }, [
            p.$slots["input-icon"] && !p.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: se[1] || (se[1] = (s) => a("toggle"))
            }, [
              renderSlot(p.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !p.$slots["input-icon"] && !p.hideInputIcon && !p.$slots["dp-input"] ? (openBlock(), createBlock(unref(Et), {
              key: 1,
              "aria-label": (D = unref(d)) == null ? void 0 : D.calendarIcon,
              class: "dp__input_icon dp__input_icons",
              onClick: se[2] || (se[2] = (s) => a("toggle"))
            }, null, 8, ["aria-label"])) : createCommentVNode("", true)
          ]),
          p.$slots["clear-icon"] && e.inputValue && p.clearable && !p.disabled && !p.readonly ? (openBlock(), createElementBlock("span", to, [
            renderSlot(p.$slots, "clear-icon", { clear: z })
          ])) : createCommentVNode("", true),
          p.clearable && !p.$slots["clear-icon"] && e.inputValue && !p.disabled && !p.readonly ? (openBlock(), createElementBlock("button", {
            key: 3,
            "aria-label": (V = unref(d)) == null ? void 0 : V.clearInput,
            class: "dp--clear-btn",
            type: "button",
            onKeydown: se[4] || (se[4] = (s) => unref(Ke)(s, () => z(s), true, A)),
            onClick: se[5] || (se[5] = withModifiers((s) => z(s), ["prevent"]))
          }, [
            createVNode(unref(Mn), {
              class: "dp__input_icons",
              "data-test": "clear-icon"
            })
          ], 40, ao)) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var lo = typeof window < "u" ? window : void 0;
var Ya = () => {
};
var ro = (e) => getCurrentScope() ? (onScopeDispose(e), true) : false;
var oo = (e, t, l, a) => {
  if (!e) return Ya;
  let n = Ya;
  const i = watch(
    () => unref(e),
    (b) => {
      n(), b && (b.addEventListener(t, l, a), n = () => {
        b.removeEventListener(t, l, a), n = Ya;
      });
    },
    { immediate: true, flush: "post" }
  ), d = () => {
    i(), n();
  };
  return ro(d), d;
};
var so = (e, t, l, a = {}) => {
  const { window: n = lo, event: i = "pointerdown" } = a;
  return n ? oo(n, i, (b) => {
    const c = Ie(e), L = Ie(t);
    !c || !L || c === b.target || b.composedPath().includes(c) || b.composedPath().includes(L) || l(b);
  }, { passive: true }) : void 0;
};
var uo = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "VueDatePicker",
  props: {
    ...ca
  },
  emits: [
    "update:model-value",
    "update:model-timezone-value",
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
    "time-picker-open",
    "time-picker-close",
    "am-pm-change",
    "range-start",
    "range-end",
    "date-update",
    "invalid-date",
    "overlay-toggle",
    "text-input"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, i = useSlots(), d = ref(false), b = toRef(n, "modelValue"), c = toRef(n, "timezone"), L = ref(null), v = ref(null), _ = ref(null), h2 = ref(false), C = ref(null), H = ref(false), E = ref(false), U = ref(false), f = ref(false), { setMenuFocused: B, setShiftKey: P } = Nn(), { clearArrowNav: Q } = bt(), { validateDate: ae, isValidTime: oe } = kt(n), {
      defaultedTransitions: ee,
      defaultedTextInput: S,
      defaultedInline: x,
      defaultedConfig: Y,
      defaultedRange: q,
      defaultedMultiDates: de
    } = Ce(n), { menuTransition: ve, showTransition: y } = Xt(ee);
    onMounted(() => {
      s(n.modelValue), nextTick().then(() => {
        if (!x.value.enabled) {
          const m = se(C.value);
          m == null || m.addEventListener("scroll", O), window == null || window.addEventListener("resize", W);
        }
      }), x.value.enabled && (d.value = true), window == null || window.addEventListener("keyup", ue), window == null || window.addEventListener("keydown", w);
    }), onUnmounted(() => {
      if (!x.value.enabled) {
        const m = se(C.value);
        m == null || m.removeEventListener("scroll", O), window == null || window.removeEventListener("resize", W);
      }
      window == null || window.removeEventListener("keyup", ue), window == null || window.removeEventListener("keydown", w);
    });
    const z = Je(i, "all", n.presetDates), te = Je(i, "input");
    watch(
      [b, c],
      () => {
        s(b.value);
      },
      { deep: true }
    );
    const { openOnTop: g, menuStyle: X, xCorrect: A, setMenuPosition: p, getScrollableParent: se, shadowRender: I } = Qr({
      menuRef: L,
      menuRefInner: v,
      inputRef: _,
      pickerWrapperRef: C,
      inline: x,
      emit: a,
      props: n,
      slots: i
    }), {
      inputValue: D,
      internalModelValue: V,
      parseExternalModelValue: s,
      emitModelValue: M,
      formatInputValue: F,
      checkBeforeEmit: u
    } = Gl(a, n, h2), le = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: n.dark,
        dp__theme_light: !n.dark,
        dp__flex_display: x.value.enabled,
        "dp--flex-display-collapsed": U.value,
        dp__flex_display_with_input: x.value.input
      })
    ), me = computed(() => n.dark ? "dp__theme_dark" : "dp__theme_light"), $ = computed(() => n.teleport ? {
      to: typeof n.teleport == "boolean" ? "body" : n.teleport,
      disabled: !n.teleport || x.value.enabled
    } : {}), ge = computed(() => ({ class: "dp__outer_menu_wrap" })), r = computed(() => x.value.enabled && (n.timePicker || n.monthPicker || n.yearPicker || n.quarterPicker)), R = () => {
      var m, j;
      return (j = (m = _.value) == null ? void 0 : m.$el) == null ? void 0 : j.getBoundingClientRect();
    }, O = () => {
      d.value && (Y.value.closeOnScroll ? Xe() : p());
    }, W = () => {
      var j;
      d.value && p();
      const m = (j = v.value) == null ? void 0 : j.$el.getBoundingClientRect().width;
      U.value = document.body.offsetWidth <= m;
    }, ue = (m) => {
      m.key === "Tab" && !x.value.enabled && !n.teleport && Y.value.tabOutClosesMenu && (C.value.contains(document.activeElement) || Xe()), E.value = m.shiftKey;
    }, w = (m) => {
      E.value = m.shiftKey;
    }, N = () => {
      !n.disabled && !n.readonly && (I(mn, n), p(false), d.value = true, d.value && a("open"), d.value || Ft(), s(n.modelValue));
    }, ce = () => {
      var m;
      D.value = "", Ft(), (m = _.value) == null || m.setParsedDate(null), a("update:model-value", null), a("update:model-timezone-value", null), a("cleared"), Y.value.closeOnClearValue && Xe();
    }, he = () => {
      const m = V.value;
      return !m || !Array.isArray(m) && ae(m) ? true : Array.isArray(m) ? de.value.enabled || m.length === 2 && ae(m[0]) && ae(m[1]) ? true : q.value.partialRange && !n.timePicker ? ae(m[0]) : false : false;
    }, et = () => {
      u() && he() ? (M(), Xe()) : a("invalid-select", V.value);
    }, fe = (m) => {
      vt(), M(), Y.value.closeOnAutoApply && !m && Xe();
    }, vt = () => {
      _.value && S.value.enabled && _.value.setParsedDate(V.value);
    }, ot = (m = false) => {
      n.autoApply && oe(V.value) && he() && (q.value.enabled && Array.isArray(V.value) ? (q.value.partialRange || V.value.length === 2) && fe(m) : fe(m));
    }, Ft = () => {
      S.value.enabled || (V.value = null);
    }, Xe = () => {
      x.value.enabled || (d.value && (d.value = false, A.value = false, B(false), P(false), Q(), a("closed"), D.value && s(b.value)), Ft(), a("blur"));
    }, Lt = (m, j, re = false) => {
      if (!m) {
        V.value = null;
        return;
      }
      const Ae = Array.isArray(m) ? !m.some((wt) => !ae(wt)) : ae(m), Fe = oe(m);
      Ae && Fe ? (f.value = true, V.value = m, j && (H.value = re, et(), a("text-submit")), nextTick().then(() => {
        f.value = false;
      })) : a("invalid-date", m);
    }, pa = () => {
      n.autoApply && oe(V.value) && M(), vt();
    }, Zt = () => d.value ? Xe() : N(), ya = (m) => {
      V.value = m;
    }, ga = () => {
      S.value.enabled && (h2.value = true, F()), a("focus");
    }, ha = () => {
      if (S.value.enabled && (h2.value = false, s(n.modelValue), H.value)) {
        const m = wl(C.value, E.value);
        m == null || m.focus();
      }
      a("blur");
    }, ba = (m) => {
      v.value && v.value.updateMonthYear(0, {
        month: rn(m.month),
        year: rn(m.year)
      });
    }, ka = (m) => {
      s(m ?? n.modelValue);
    }, wa = (m, j) => {
      var re;
      (re = v.value) == null || re.switchView(m, j);
    }, Za = (m) => Y.value.onClickOutside ? Y.value.onClickOutside(m) : Xe(), k = (m = 0) => {
      var j;
      (j = v.value) == null || j.handleFlow(m);
    };
    return so(L, _, () => Za(he)), t({
      closeMenu: Xe,
      selectDate: et,
      clearValue: ce,
      openMenu: N,
      onScroll: O,
      formatInputValue: F,
      // exposed for testing purposes
      updateInternalModelValue: ya,
      // modify internal modelValue
      setMonthYear: ba,
      parseModel: ka,
      switchView: wa,
      toggleMenu: Zt,
      handleFlow: k,
      dpWrapMenuRef: L
    }), (m, j) => (openBlock(), createElementBlock("div", {
      ref_key: "pickerWrapperRef",
      ref: C,
      class: normalizeClass(le.value),
      "data-datepicker-instance": ""
    }, [
      createVNode(no, mergeProps({
        ref_key: "inputRef",
        ref: _,
        "input-value": unref(D),
        "onUpdate:inputValue": j[0] || (j[0] = (re) => isRef(D) ? D.value = re : null),
        "is-menu-open": d.value
      }, m.$props, {
        onClear: ce,
        onOpen: N,
        onSetInputDate: Lt,
        onSetEmptyDate: unref(M),
        onSelectDate: et,
        onToggle: Zt,
        onClose: Xe,
        onFocus: ga,
        onBlur: ha,
        onRealBlur: j[1] || (j[1] = (re) => h2.value = false),
        onTextInput: j[2] || (j[2] = (re) => m.$emit("text-input", re))
      }), createSlots({ _: 2 }, [
        renderList(unref(te), (re, Ae) => ({
          name: re,
          fn: withCtx((Fe) => [
            renderSlot(m.$slots, re, normalizeProps(guardReactiveProps(Fe)))
          ])
        }))
      ]), 1040, ["input-value", "is-menu-open", "onSetEmptyDate"]),
      (openBlock(), createBlock(resolveDynamicComponent(m.teleport ? Teleport : "div"), normalizeProps(guardReactiveProps($.value)), {
        default: withCtx(() => [
          createVNode(Transition, {
            name: unref(ve)(unref(g)),
            css: unref(y) && !unref(x).enabled
          }, {
            default: withCtx(() => [
              d.value ? (openBlock(), createElementBlock("div", mergeProps({
                key: 0,
                ref_key: "dpWrapMenuRef",
                ref: L
              }, ge.value, {
                class: { "dp--menu-wrapper": !unref(x).enabled },
                style: unref(x).enabled ? void 0 : unref(X)
              }), [
                createVNode(mn, mergeProps({
                  ref_key: "dpMenuRef",
                  ref: v
                }, m.$props, {
                  "internal-model-value": unref(V),
                  "onUpdate:internalModelValue": j[3] || (j[3] = (re) => isRef(V) ? V.value = re : null),
                  class: { [me.value]: true, "dp--menu-wrapper": m.teleport },
                  "open-on-top": unref(g),
                  "no-overlay-focus": r.value,
                  collapse: U.value,
                  "get-input-rect": R,
                  "is-text-input-date": f.value,
                  onClosePicker: Xe,
                  onSelectDate: et,
                  onAutoApply: ot,
                  onTimeUpdate: pa,
                  onFlowStep: j[4] || (j[4] = (re) => m.$emit("flow-step", re)),
                  onUpdateMonthYear: j[5] || (j[5] = (re) => m.$emit("update-month-year", re)),
                  onInvalidSelect: j[6] || (j[6] = (re) => m.$emit("invalid-select", unref(V))),
                  onAutoApplyInvalid: j[7] || (j[7] = (re) => m.$emit("invalid-select", re)),
                  onInvalidFixedRange: j[8] || (j[8] = (re) => m.$emit("invalid-fixed-range", re)),
                  onRecalculatePosition: unref(p),
                  onTooltipOpen: j[9] || (j[9] = (re) => m.$emit("tooltip-open", re)),
                  onTooltipClose: j[10] || (j[10] = (re) => m.$emit("tooltip-close", re)),
                  onTimePickerOpen: j[11] || (j[11] = (re) => m.$emit("time-picker-open", re)),
                  onTimePickerClose: j[12] || (j[12] = (re) => m.$emit("time-picker-close", re)),
                  onAmPmChange: j[13] || (j[13] = (re) => m.$emit("am-pm-change", re)),
                  onRangeStart: j[14] || (j[14] = (re) => m.$emit("range-start", re)),
                  onRangeEnd: j[15] || (j[15] = (re) => m.$emit("range-end", re)),
                  onDateUpdate: j[16] || (j[16] = (re) => m.$emit("date-update", re)),
                  onInvalidDate: j[17] || (j[17] = (re) => m.$emit("invalid-date", re)),
                  onOverlayToggle: j[18] || (j[18] = (re) => m.$emit("overlay-toggle", re))
                }), createSlots({ _: 2 }, [
                  renderList(unref(z), (re, Ae) => ({
                    name: re,
                    fn: withCtx((Fe) => [
                      renderSlot(m.$slots, re, normalizeProps(guardReactiveProps({ ...Fe })))
                    ])
                  }))
                ]), 1040, ["internal-model-value", "class", "open-on-top", "no-overlay-focus", "collapse", "is-text-input-date", "onRecalculatePosition"])
              ], 16)) : createCommentVNode("", true)
            ]),
            _: 3
          }, 8, ["name", "css"])
        ]),
        _: 3
      }, 16))
    ], 2));
  }
});
var Vn = (() => {
  const e = uo;
  return e.install = (t) => {
    t.component("Vue3DatePicker", e);
  }, e;
})();
var io = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Vn
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(io).forEach(([e, t]) => {
  e !== "default" && (Vn[e] = t);
});
export {
  Vn as default
};
//# sourceMappingURL=@vuepic_vue-datepicker.js.map
