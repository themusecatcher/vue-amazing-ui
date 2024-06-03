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
} from "./chunk-TSQDKQVB.js";
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
  useSlots,
  vShow,
  watch,
  withCtx,
  withDirectives,
  withKeys,
  withModifiers
} from "./chunk-FHZO4SJ4.js";
import "./chunk-LNEMQRCO.js";

// node_modules/.pnpm/@vuepic+vue-datepicker@8.7.0_vue@3.4.27_typescript@5.4.5_/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
function Nt() {
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
Nt.compatConfig = {
  MODE: 3
};
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
      createBaseVNode("path", {
        d: "M23.057 7.057l-16 16c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l16-16c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0z"
      }),
      createBaseVNode("path", {
        d: "M7.057 8.943l16 16c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885l-16-16c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
kn.compatConfig = {
  MODE: 3
};
function Ea() {
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
      createBaseVNode("path", {
        d: "M20.943 23.057l-7.057-7.057c0 0 7.057-7.057 7.057-7.057 0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-8 8c-0.521 0.521-0.521 1.365 0 1.885l8 8c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
Ea.compatConfig = {
  MODE: 3
};
function Fa() {
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
      createBaseVNode("path", {
        d: "M12.943 24.943l8-8c0.521-0.521 0.521-1.365 0-1.885l-8-8c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885l7.057 7.057c0 0-7.057 7.057-7.057 7.057-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0z"
      })
    ]
  );
}
Fa.compatConfig = {
  MODE: 3
};
function La() {
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
      createBaseVNode("path", {
        d: "M16 1.333c-8.095 0-14.667 6.572-14.667 14.667s6.572 14.667 14.667 14.667c8.095 0 14.667-6.572 14.667-14.667s-6.572-14.667-14.667-14.667zM16 4c6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.623 0-12-5.377-12-12s5.377-12 12-12z"
      }),
      createBaseVNode("path", {
        d: "M14.667 8v8c0 0.505 0.285 0.967 0.737 1.193l5.333 2.667c0.658 0.329 1.46 0.062 1.789-0.596s0.062-1.46-0.596-1.789l-4.596-2.298c0 0 0-7.176 0-7.176 0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      })
    ]
  );
}
La.compatConfig = {
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
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M24.943 19.057l-8-8c-0.521-0.521-1.365-0.521-1.885 0l-8 8c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l7.057-7.057c0 0 7.057 7.057 7.057 7.057 0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
Ha.compatConfig = {
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
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M7.057 12.943l8 8c0.521 0.521 1.365 0.521 1.885 0l8-8c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-7.057 7.057c0 0-7.057-7.057-7.057-7.057-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
za.compatConfig = {
  MODE: 3
};
var st = (e, t) => t ? new Date(e.toLocaleString("en-US", { timeZone: t })) : new Date(e);
var Va = (e, t, l) => {
  const n = Ya(e, t, l);
  return n || K();
};
var ul = (e, t, l) => {
  const n = t.dateInTz ? st(new Date(e), t.dateInTz) : K(e);
  return l ? je(n, true) : n;
};
var Ya = (e, t, l) => {
  if (!e)
    return null;
  const n = l ? je(K(e), true) : K(e);
  return t ? t.exactMatch ? ul(e, t, l) : st(n, t.timezone) : n;
};
var il = (e) => {
  if (!e)
    return 0;
  const t = /* @__PURE__ */ new Date(), l = new Date(t.toLocaleString("en-US", { timeZone: "UTC" })), n = new Date(t.toLocaleString("en-US", { timeZone: e })), a = n.getTimezoneOffset() / 60;
  return (+l - +n) / (1e3 * 60 * 60) - a;
};
var et = ((e) => (e.month = "month", e.year = "year", e))(et || {});
var Dt = ((e) => (e.top = "top", e.bottom = "bottom", e))(Dt || {});
var At = ((e) => (e.header = "header", e.calendar = "calendar", e.timePicker = "timePicker", e))(At || {});
var He = ((e) => (e.month = "month", e.year = "year", e.calendar = "calendar", e.time = "time", e.minutes = "minutes", e.hours = "hours", e.seconds = "seconds", e))(He || {});
var dl = ["timestamp", "date", "iso"];
var Ue = ((e) => (e.up = "up", e.down = "down", e.left = "left", e.right = "right", e))(Ue || {});
var Re = ((e) => (e.arrowUp = "ArrowUp", e.arrowDown = "ArrowDown", e.arrowLeft = "ArrowLeft", e.arrowRight = "ArrowRight", e.enter = "Enter", e.space = " ", e.esc = "Escape", e.tab = "Tab", e.home = "Home", e.end = "End", e.pageUp = "PageUp", e.pageDown = "PageDown", e))(Re || {});
function tn(e) {
  return (t) => new Intl.DateTimeFormat(e, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`)).slice(0, 2);
}
function cl(e) {
  return (t) => format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`), "EEEEEE", { locale: e });
}
var fl = (e, t, l) => {
  const n = [1, 2, 3, 4, 5, 6, 7];
  let a;
  if (e !== null)
    try {
      a = n.map(cl(e));
    } catch {
      a = n.map(tn(t));
    }
  else
    a = n.map(tn(t));
  const f = a.slice(0, l), c = a.slice(l + 1, a.length);
  return [a[l]].concat(...c).concat(...f);
};
var Wa = (e, t, l) => {
  const n = [];
  for (let a = +e[0]; a <= +e[1]; a++)
    n.push({ value: +a, text: $n(a, t) });
  return l ? n.reverse() : n;
};
var wn = (e, t, l) => {
  const n = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((f) => {
    const c = f < 10 ? `0${f}` : f;
    return /* @__PURE__ */ new Date(`2017-${c}-01T00:00:00+00:00`);
  });
  if (e !== null)
    try {
      const f = l === "long" ? "MMMM" : "MMM";
      return n.map((c, r) => {
        const R = format(st(c, "UTC"), f, { locale: e });
        return {
          text: R.charAt(0).toUpperCase() + R.substring(1),
          value: r
        };
      });
    } catch {
    }
  const a = new Intl.DateTimeFormat(t, { month: l, timeZone: "UTC" });
  return n.map((f, c) => {
    const r = a.format(f);
    return {
      text: r.charAt(0).toUpperCase() + r.substring(1),
      value: c
    };
  });
};
var vl = (e) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e];
var Ye = (e) => {
  const t = unref(e);
  return t != null && t.$el ? t == null ? void 0 : t.$el : t;
};
var ml = (e) => ({ type: "dot", ...e ?? {} });
var Dn = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : false;
var Ua = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
};
var Be = (e) => e;
var an = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e;
var nn = (e) => e === null;
var Mn = (e) => {
  if (e)
    return [...e.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var gl = (e) => {
  const t = [], l = (n) => n.filter((a) => a);
  for (let n = 0; n < e.length; n += 3) {
    const a = [e[n], e[n + 1], e[n + 2]];
    t.push(l(a));
  }
  return t;
};
var Kt = (e, t, l) => {
  const n = l != null, a = t != null;
  if (!n && !a)
    return false;
  const f = +l, c = +t;
  return n && a ? +e > f || +e < c : n ? +e > f : a ? +e < c : false;
};
var Bt = (e, t) => gl(e).map((l) => l.map((n) => {
  const { active: a, disabled: f, isBetween: c, highlighted: r } = t(n);
  return {
    ...n,
    active: a,
    disabled: f,
    className: {
      dp__overlay_cell_active: a,
      dp__overlay_cell: !a,
      dp__overlay_cell_disabled: f,
      dp__overlay_cell_pad: true,
      dp__overlay_cell_active_disabled: f && a,
      dp__cell_in_between: c,
      "dp--highlighted": r
    }
  };
}));
var gt = (e, t, l = false) => {
  e && t.allowStopPropagation && (l && e.stopImmediatePropagation(), e.stopPropagation());
};
var yl = () => [
  "a[href]",
  "area[href]",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[data-datepicker-instance]"
].join(", ");
function pl(e, t) {
  let l = [...document.querySelectorAll(yl())];
  l = l.filter((a) => !e.contains(a) || a.hasAttribute("data-datepicker-instance"));
  const n = l.indexOf(e);
  if (n >= 0 && (t ? n - 1 >= 0 : n + 1 <= l.length))
    return l[n + (t ? -1 : 1)];
}
var hl = (e, t) => e == null ? void 0 : e.querySelector(`[data-dp-element="${t}"]`);
var $n = (e, t) => new Intl.NumberFormat(t, { useGrouping: false, style: "decimal" }).format(e);
var ja = (e) => format(e, "dd-MM-yyyy");
var Da = (e) => Array.isArray(e);
var ra = (e, t) => t.get(ja(e));
var bl = (e, t) => e ? t ? t instanceof Map ? !!ra(e, t) : t(K(e)) : false : true;
var Qe = (e, t, l = false) => {
  if (e.key === Re.enter || e.key === Re.space)
    return l && e.preventDefault(), t();
};
var ln = (e, t, l, n, a, f) => {
  const c = parse(e, t.slice(0, e.length), /* @__PURE__ */ new Date(), { locale: f });
  return isValid(c) && isDate(c) ? n || a ? c : set(c, {
    hours: +l.hours,
    minutes: +(l == null ? void 0 : l.minutes),
    seconds: +(l == null ? void 0 : l.seconds),
    milliseconds: 0
  }) : null;
};
var kl = (e, t, l, n, a, f) => {
  const c = Array.isArray(l) ? l[0] : l;
  if (typeof t == "string")
    return ln(e, t, c, n, a, f);
  if (Array.isArray(t)) {
    let r = null;
    for (const R of t)
      if (r = ln(e, R, c, n, a, f), r)
        break;
    return r;
  }
  return typeof t == "function" ? t(e) : null;
};
var K = (e) => e ? new Date(e) : /* @__PURE__ */ new Date();
var wl = (e, t, l) => {
  if (t) {
    const a = (e.getMonth() + 1).toString().padStart(2, "0"), f = e.getDate().toString().padStart(2, "0"), c = e.getHours().toString().padStart(2, "0"), r = e.getMinutes().toString().padStart(2, "0"), R = l ? e.getSeconds().toString().padStart(2, "0") : "00";
    return `${e.getFullYear()}-${a}-${f}T${c}:${r}:${R}.000Z`;
  }
  const n = Date.UTC(
    e.getUTCFullYear(),
    e.getUTCMonth(),
    e.getUTCDate(),
    e.getUTCHours(),
    e.getUTCMinutes(),
    e.getUTCSeconds()
  );
  return new Date(n).toISOString();
};
var je = (e, t) => {
  const l = K(JSON.parse(JSON.stringify(e))), n = set(l, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  return t ? startOfMonth(n) : n;
};
var yt = (e, t, l, n) => {
  let a = e ? K(e) : K();
  return (t || t === 0) && (a = setHours(a, +t)), (l || l === 0) && (a = setMinutes(a, +l)), (n || n === 0) && (a = setSeconds(a, +n)), setMilliseconds(a, 0);
};
var Ce = (e, t) => !e || !t ? false : isBefore(je(e), je(t));
var he = (e, t) => !e || !t ? false : isEqual(je(e), je(t));
var Oe = (e, t) => !e || !t ? false : isAfter(je(e), je(t));
var ua = (e, t, l) => e != null && e[0] && (e != null && e[1]) ? Oe(l, e[0]) && Ce(l, e[1]) : e != null && e[0] && t ? Oe(l, e[0]) && Ce(l, t) || Ce(l, e[0]) && Oe(l, t) : false;
var tt = (e) => {
  const t = set(new Date(e), { date: 1 });
  return je(t);
};
var Ma = (e, t, l) => t && (l || l === 0) ? Object.fromEntries(
  ["hours", "minutes", "seconds"].map((n) => n === t ? [n, l] : [n, isNaN(+e[n]) ? void 0 : +e[n]])
) : {
  hours: isNaN(+e.hours) ? void 0 : +e.hours,
  minutes: isNaN(+e.minutes) ? void 0 : +e.minutes,
  seconds: isNaN(+e.seconds) ? void 0 : +e.seconds
};
var Tt = (e) => ({
  hours: getHours(e),
  minutes: getMinutes(e),
  seconds: getSeconds(e)
});
var An = (e, t) => {
  if (t) {
    const l = getYear(K(t));
    if (l > e)
      return 12;
    if (l === e)
      return getMonth(K(t));
  }
};
var Tn = (e, t) => {
  if (t) {
    const l = getYear(K(t));
    return l < e ? -1 : l === e ? getMonth(K(t)) : void 0;
  }
};
var Yt = (e) => {
  if (e)
    return getYear(K(e));
};
var Sn = (e, t) => {
  const l = Oe(e, t) ? t : e, n = Oe(t, e) ? t : e;
  return eachDayOfInterval({ start: l, end: n });
};
var Dl = (e) => {
  const t = addMonths(e, 1);
  return { month: getMonth(t), year: getYear(t) };
};
var ut = (e, t) => {
  const l = startOfWeek(e, { weekStartsOn: +t }), n = endOfWeek(e, { weekStartsOn: +t });
  return [l, n];
};
var Rn = (e, t) => {
  const l = {
    hours: getHours(K()),
    minutes: getMinutes(K()),
    seconds: t ? getSeconds(K()) : 0
  };
  return Object.assign(l, e);
};
var mt = (e, t, l) => [set(K(e), { date: 1 }), set(K(), { month: t, year: l, date: 1 })];
var it = (e, t, l) => {
  let n = e ? K(e) : K();
  return (t || t === 0) && (n = setMonth(n, t)), l && (n = setYear(n, l)), n;
};
var Pn = (e, t, l, n, a) => {
  if (!n || a && !t || !a && !l)
    return false;
  const f = a ? addMonths(e, 1) : subMonths(e, 1), c = [getMonth(f), getYear(f)];
  return a ? !$l(...c, t) : !Ml(...c, l);
};
var Ml = (e, t, l) => Ce(...mt(l, e, t)) || he(...mt(l, e, t));
var $l = (e, t, l) => Oe(...mt(l, e, t)) || he(...mt(l, e, t));
var Cn = (e, t, l, n, a, f, c) => {
  if (typeof t == "function" && !c)
    return t(e);
  const r = l ? { locale: l } : void 0;
  return Array.isArray(e) ? `${format(e[0], f, r)}${a && !e[1] ? "" : n}${e[1] ? format(e[1], f, r) : ""}` : format(e, f, r);
};
var Rt = (e) => {
  if (e)
    return null;
  throw new Error(Ua.prop("partial-range"));
};
var ea = (e, t) => {
  if (t)
    return e();
  throw new Error(Ua.prop("range"));
};
var Ia = (e) => Array.isArray(e) ? isValid(e[0]) && (e[1] ? isValid(e[1]) : true) : e ? isValid(e) : false;
var Al = (e, t) => set(t ?? K(), {
  hours: +e.hours || 0,
  minutes: +e.minutes || 0,
  seconds: +e.seconds || 0
});
var $a = (e, t, l, n) => {
  if (!e)
    return true;
  if (n) {
    const a = l === "max" ? isBefore(e, t) : isAfter(e, t), f = { seconds: 0, milliseconds: 0 };
    return a || isEqual(set(e, f), set(t, f));
  }
  return l === "max" ? e.getTime() <= t.getTime() : e.getTime() >= t.getTime();
};
var Aa = (e, t, l) => e ? Al(e, t) : K(l ?? t);
var rn = (e, t, l, n, a) => {
  if (Array.isArray(n)) {
    const c = Aa(e, n[0], t), r = Aa(e, n[1], t);
    return $a(n[0], c, l, !!t) && $a(n[1], r, l, !!t) && a;
  }
  const f = Aa(e, n, t);
  return $a(n, f, l, !!t) && a;
};
var Ta = (e) => set(K(), Tt(e));
var Tl = (e, t) => e instanceof Map ? Array.from(e.values()).filter((l) => getYear(K(l)) === t).map((l) => getMonth(l)) : [];
var _n = (e, t, l) => typeof e == "function" ? e({ month: t, year: l }) : !!e.months.find((n) => n.month === t && n.year === l);
var Ka = (e, t) => typeof e == "function" ? e(t) : e.years.includes(t);
var On = (e) => format(e, "yyyy-MM-dd");
var Ht = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Bn = () => {
  const e = (n) => {
    Ht.menuFocused = n;
  }, t = (n) => {
    Ht.shiftKeyInMenu !== n && (Ht.shiftKeyInMenu = n);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: Ht.shiftKeyInMenu, menuFocused: Ht.menuFocused })),
    setMenuFocused: e,
    setShiftKey: t
  };
};
var Te = reactive({
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
var Sa = ref(null);
var ta = ref(false);
var Ra = ref(false);
var Pa = ref(false);
var Ca = ref(false);
var Le = ref(0);
var _e = ref(0);
var ht = () => {
  const e = computed(() => ta.value ? [...Te.selectionGrid, Te.actionRow].filter((w) => w.length) : Ra.value ? [
    ...Te.timePicker[0],
    ...Te.timePicker[1],
    Ca.value ? [] : [Sa.value],
    Te.actionRow
  ].filter((w) => w.length) : Pa.value ? [...Te.monthPicker, Te.actionRow] : [Te.monthYear, ...Te.calendar, Te.time, Te.actionRow].filter((w) => w.length)), t = (w) => {
    Le.value = w ? Le.value + 1 : Le.value - 1;
    let F = null;
    e.value[_e.value] && (F = e.value[_e.value][Le.value]), !F && e.value[_e.value + (w ? 1 : -1)] ? (_e.value = _e.value + (w ? 1 : -1), Le.value = w ? 0 : e.value[_e.value].length - 1) : F || (Le.value = w ? Le.value - 1 : Le.value + 1);
  }, l = (w) => {
    if (_e.value === 0 && !w || _e.value === e.value.length && w)
      return;
    _e.value = w ? _e.value + 1 : _e.value - 1, e.value[_e.value] ? e.value[_e.value] && !e.value[_e.value][Le.value] && Le.value !== 0 && (Le.value = e.value[_e.value].length - 1) : _e.value = w ? _e.value - 1 : _e.value + 1;
  }, n = (w) => {
    let F = null;
    e.value[_e.value] && (F = e.value[_e.value][Le.value]), F ? F.focus({ preventScroll: !ta.value }) : Le.value = w ? Le.value - 1 : Le.value + 1;
  }, a = () => {
    t(true), n(true);
  }, f = () => {
    t(false), n(false);
  }, c = () => {
    l(false), n(true);
  }, r = () => {
    l(true), n(true);
  }, R = (w, F) => {
    Te[F] = w;
  }, I = (w, F) => {
    Te[F] = w;
  }, h2 = () => {
    Le.value = 0, _e.value = 0;
  };
  return {
    buildMatrix: R,
    buildMultiLevelMatrix: I,
    setTimePickerBackRef: (w) => {
      Sa.value = w;
    },
    setSelectionGrid: (w) => {
      ta.value = w, h2(), w || (Te.selectionGrid = []);
    },
    setTimePicker: (w, F = false) => {
      Ra.value = w, Ca.value = F, h2(), w || (Te.timePicker[0] = [], Te.timePicker[1] = []);
    },
    setTimePickerElements: (w, F = 0) => {
      Te.timePicker[F] = w;
    },
    arrowRight: a,
    arrowLeft: f,
    arrowUp: c,
    arrowDown: r,
    clearArrowNav: () => {
      Te.monthYear = [], Te.calendar = [], Te.time = [], Te.actionRow = [], Te.selectionGrid = [], Te.timePicker[0] = [], Te.timePicker[1] = [], ta.value = false, Ra.value = false, Ca.value = false, Pa.value = false, h2(), Sa.value = null;
    },
    setMonthPicker: (w) => {
      Pa.value = w, h2();
    },
    refSets: Te
    // exposed for testing
  };
};
var on = (e) => ({
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
var Sl = (e) => ({
  toggleOverlay: "Toggle overlay",
  menu: "Datepicker menu",
  input: "Datepicker input",
  calendarWrap: "Calendar wrapper",
  calendarDays: "Calendar days",
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
  ...e ?? {}
});
var sn = (e) => e ? typeof e == "boolean" ? e ? 2 : 0 : +e >= 2 ? +e : 2 : 0;
var Rl = (e) => {
  const t = typeof e == "object" && e, l = {
    static: true,
    solo: false
  };
  if (!e)
    return { ...l, count: sn(false) };
  const n = t ? e : {}, a = t ? n.count ?? true : e, f = sn(a);
  return Object.assign(l, n, { count: f });
};
var Pl = (e, t, l) => e || (typeof l == "string" ? l : t);
var Cl = (e) => typeof e == "boolean" ? e ? on({}) : false : on(e);
var _l = (e) => {
  const t = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: true,
    selectOnFocus: false,
    rangeSeparator: " - "
  };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : { ...t, enabled: e };
};
var Ol = (e) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...e ?? {}
});
var Bl = (e) => ({
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  ...e ?? {}
});
var Yl = (e) => {
  const t = { input: false };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : {
    enabled: e,
    ...t
  };
};
var Il = (e) => ({ ...{
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
  timeArrowHoldThreshold: 0
}, ...e ?? {} });
var Nl = (e) => {
  const t = {
    dates: Array.isArray(e) ? e.map((l) => K(l)) : [],
    years: [],
    months: [],
    quarters: [],
    weeks: [],
    weekdays: [],
    options: { highlightDisabled: false }
  };
  return typeof e == "function" ? e : { ...t, ...e ?? {} };
};
var El = (e) => typeof e == "object" ? {
  type: (e == null ? void 0 : e.type) ?? "local",
  hideOnOffsetDates: (e == null ? void 0 : e.hideOnOffsetDates) ?? false
} : {
  type: e,
  hideOnOffsetDates: false
};
var Fl = (e, t) => {
  const l = {
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
  return typeof e == "object" ? { enabled: true, ...l, ...e } : {
    enabled: e,
    noDisabledRange: t.noDisabledRange,
    showLastInRange: t.showLastInRange,
    minMaxRawRange: t.minMaxRawRange,
    partialRange: t.partialRange,
    disableTimeRangeValidation: t.disableTimeRangeValidation,
    maxRange: t.maxRange,
    minRange: t.minRange,
    autoRange: t.autoRange,
    fixedStart: t.fixedStart,
    fixedEnd: t.fixedEnd
  };
};
var Ll = (e, t) => e ? typeof e == "string" ? { timezone: e, exactMatch: false, dateInTz: void 0, emitTimezone: t, convertModel: true } : {
  timezone: e.timezone,
  exactMatch: e.exactMatch ?? false,
  dateInTz: e.dateInTz ?? void 0,
  emitTimezone: t ?? e.emitTimezone,
  convertModel: e.convertModel ?? true
} : { timezone: void 0, exactMatch: false, emitTimezone: t };
var _a = (e, t, l) => new Map(
  e.map((n) => {
    const a = Va(n, t, l);
    return [ja(a), a];
  })
);
var Hl = (e, t) => e.length ? new Map(
  e.map((l) => {
    const n = Va(l.date, t);
    return [ja(n), l];
  })
) : null;
var zl = (e) => {
  var t;
  return {
    minDate: Ya(e.minDate, e.timezone, e.isSpecific),
    maxDate: Ya(e.maxDate, e.timezone, e.isSpecific),
    disabledDates: Da(e.disabledDates) ? _a(e.disabledDates, e.timezone, e.isSpecific) : e.disabledDates,
    allowedDates: Da(e.allowedDates) ? _a(e.allowedDates, e.timezone, e.isSpecific) : null,
    highlight: typeof e.highlight == "object" && Da((t = e.highlight) == null ? void 0 : t.dates) ? _a(e.highlight.dates, e.timezone) : e.highlight,
    markers: Hl(e.markers, e.timezone)
  };
};
var Vl = (e, t) => typeof e == "boolean" ? { enabled: e, dragSelect: true, limit: +t } : {
  enabled: !!e,
  limit: e.limit ? +e.limit : null,
  dragSelect: e.dragSelect ?? true
};
var Pe = (e) => {
  const t = () => {
    const L = e.enableSeconds ? ":ss" : "", ae = e.enableMinutes ? ":mm" : "";
    return e.is24 ? `HH${ae}${L}` : `hh${ae}${L} aa`;
  }, l = () => {
    var L;
    return e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? t() : e.weekPicker ? `${((L = B.value) == null ? void 0 : L.type) === "iso" ? "RR" : "ww"}-yyyy` : e.yearPicker ? "yyyy" : e.quarterPicker ? "QQQ/yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${t()}` : "MM/dd/yyyy";
  }, n = (L) => Rn(L, e.enableSeconds), a = () => Q.value.enabled ? e.startTime && Array.isArray(e.startTime) ? [n(e.startTime[0]), n(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? n(e.startTime) : null, f = computed(() => Rl(e.multiCalendars)), c = computed(() => a()), r = computed(() => Sl(e.ariaLabels)), R = computed(() => Ol(e.filters)), I = computed(() => Cl(e.transitions)), h2 = computed(() => Bl(e.actionRow)), k = computed(
    () => Pl(e.previewFormat, e.format, l())
  ), p = computed(() => _l(e.textInput)), Y = computed(() => Yl(e.inline)), j = computed(() => Il(e.config)), $ = computed(() => Nl(e.highlight)), B = computed(() => El(e.weekNumbers)), w = computed(() => Ll(e.timezone, e.emitTimezone)), F = computed(() => Vl(e.multiDates, e.multiDatesLimit)), N = computed(
    () => zl({
      minDate: e.minDate,
      maxDate: e.maxDate,
      disabledDates: e.disabledDates,
      allowedDates: e.allowedDates,
      highlight: $.value,
      markers: e.markers,
      timezone: w.value,
      isSpecific: e.monthPicker || e.yearPicker || e.quarterPicker
    })
  ), Q = computed(
    () => Fl(e.range, {
      minMaxRawRange: false,
      maxRange: e.maxRange,
      minRange: e.minRange,
      noDisabledRange: e.noDisabledRange,
      showLastInRange: e.showLastInRange,
      partialRange: e.partialRange,
      disableTimeRangeValidation: e.disableTimeRangeValidation,
      autoRange: e.autoRange,
      fixedStart: e.fixedStart,
      fixedEnd: e.fixedEnd
    })
  );
  return {
    defaultedTransitions: I,
    defaultedMultiCalendars: f,
    defaultedStartTime: c,
    defaultedAriaLabels: r,
    defaultedFilters: R,
    defaultedActionRow: h2,
    defaultedPreviewFormat: k,
    defaultedTextInput: p,
    defaultedInline: Y,
    defaultedConfig: j,
    defaultedHighlight: $,
    defaultedWeekNumbers: B,
    defaultedRange: Q,
    propDates: N,
    defaultedTz: w,
    defaultedMultiDates: F,
    getDefaultPattern: l,
    getDefaultStartTime: a
  };
};
var Wl = (e, t, l) => {
  const n = ref(), { defaultedTextInput: a, defaultedRange: f, defaultedTz: c, defaultedMultiDates: r, getDefaultPattern: R } = Pe(t), I = ref(""), h2 = toRef(t, "format"), k = toRef(t, "formatLocale");
  watch(
    n,
    () => {
      typeof t.onInternalModelChange == "function" && e("internal-model-change", n.value, T(true));
    },
    { deep: true }
  ), watch(f, (i, b) => {
    i.enabled !== b.enabled && (n.value = null);
  }), watch(h2, () => {
    d();
  });
  const p = (i) => c.value.timezone && c.value.convertModel ? st(i, c.value.timezone) : i, Y = (i) => {
    if (c.value.timezone && c.value.convertModel) {
      const b = il(c.value.timezone);
      return addHours(i, b);
    }
    return i;
  }, j = (i, b, de = false) => Cn(
    i,
    t.format,
    t.formatLocale,
    a.value.rangeSeparator,
    t.modelAuto,
    b ?? R(),
    de
  ), $ = (i) => i ? t.modelType ? ue(i) : {
    hours: getHours(i),
    minutes: getMinutes(i),
    seconds: t.enableSeconds ? getSeconds(i) : 0
  } : null, B = (i) => t.modelType ? ue(i) : { month: getMonth(i), year: getYear(i) }, w = (i) => Array.isArray(i) ? r.value.enabled ? i.map((b) => F(b, setYear(K(), b))) : ea(
    () => [
      setYear(K(), i[0]),
      i[1] ? setYear(K(), i[1]) : Rt(f.value.partialRange)
    ],
    f.value.enabled
  ) : setYear(K(), +i), F = (i, b) => (typeof i == "string" || typeof i == "number") && t.modelType ? X(i) : b, N = (i) => Array.isArray(i) ? [
    F(
      i[0],
      yt(null, +i[0].hours, +i[0].minutes, i[0].seconds)
    ),
    F(
      i[1],
      yt(null, +i[1].hours, +i[1].minutes, i[1].seconds)
    )
  ] : F(i, yt(null, i.hours, i.minutes, i.seconds)), Q = (i) => {
    const b = set(K(), { date: 1 });
    return Array.isArray(i) ? r.value.enabled ? i.map((de) => F(de, it(b, +de.month, +de.year))) : ea(
      () => [
        F(i[0], it(b, +i[0].month, +i[0].year)),
        F(
          i[1],
          i[1] ? it(b, +i[1].month, +i[1].year) : Rt(f.value.partialRange)
        )
      ],
      f.value.enabled
    ) : F(i, it(b, +i.month, +i.year));
  }, L = (i) => {
    if (Array.isArray(i))
      return i.map((b) => X(b));
    throw new Error(Ua.dateArr("multi-dates"));
  }, ae = (i) => {
    if (Array.isArray(i) && f.value.enabled) {
      const b = i[0], de = i[1];
      return [
        K(Array.isArray(b) ? b[0] : null),
        K(Array.isArray(de) ? de[0] : null)
      ];
    }
    return K(i[0]);
  }, oe = (i) => t.modelAuto ? Array.isArray(i) ? [X(i[0]), X(i[1])] : t.autoApply ? [X(i)] : [X(i), null] : Array.isArray(i) ? ea(
    () => i[1] ? [
      X(i[0]),
      i[1] ? X(i[1]) : Rt(f.value.partialRange)
    ] : [X(i[0])],
    f.value.enabled
  ) : X(i), A = () => {
    Array.isArray(n.value) && f.value.enabled && n.value.length === 1 && n.value.push(Rt(f.value.partialRange));
  }, U = () => {
    const i = n.value;
    return [
      ue(i[0]),
      i[1] ? ue(i[1]) : Rt(f.value.partialRange)
    ];
  }, Z = () => n.value[1] ? U() : ue(Be(n.value[0])), le = () => (n.value || []).map((i) => ue(i)), O = (i = false) => (i || A(), t.modelAuto ? Z() : r.value.enabled ? le() : Array.isArray(n.value) ? ea(() => U(), f.value.enabled) : ue(Be(n.value))), z = (i) => !i || Array.isArray(i) && !i.length ? null : t.timePicker ? N(Be(i)) : t.monthPicker ? Q(Be(i)) : t.yearPicker ? w(Be(i)) : r.value.enabled ? L(Be(i)) : t.weekPicker ? ae(Be(i)) : oe(Be(i)), re = (i) => {
    const b = z(i);
    Ia(Be(b)) ? (n.value = Be(b), d()) : (n.value = null, I.value = "");
  }, H = () => {
    const i = (b) => format(b, a.value.format);
    return `${i(n.value[0])} ${a.value.rangeSeparator} ${n.value[1] ? i(n.value[1]) : ""}`;
  }, C = () => l.value && n.value ? Array.isArray(n.value) ? H() : format(n.value, a.value.format) : j(n.value), v = () => n.value ? r.value.enabled ? n.value.map((i) => j(i)).join("; ") : a.value.enabled && typeof a.value.format == "string" ? C() : j(n.value) : "", d = () => {
    !t.format || typeof t.format == "string" || a.value.enabled && typeof a.value.format == "string" ? I.value = v() : I.value = t.format(n.value);
  }, X = (i) => {
    if (t.utc) {
      const b = new Date(i);
      return t.utc === "preserve" ? new Date(b.getTime() + b.getTimezoneOffset() * 6e4) : b;
    }
    return t.modelType ? dl.includes(t.modelType) ? p(new Date(i)) : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? p(
      parse(i, R(), /* @__PURE__ */ new Date(), { locale: k.value })
    ) : p(
      parse(i, t.modelType, /* @__PURE__ */ new Date(), { locale: k.value })
    ) : p(new Date(i));
  }, ue = (i) => i ? t.utc ? wl(i, t.utc === "preserve", t.enableSeconds) : t.modelType ? t.modelType === "timestamp" ? +Y(i) : t.modelType === "iso" ? Y(i).toISOString() : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? j(Y(i)) : j(Y(i), t.modelType, true) : Y(i) : "", D = (i, b = false, de = false) => {
    if (de)
      return i;
    if (e("update:model-value", i), c.value.emitTimezone && b) {
      const $e = Array.isArray(i) ? i.map((o) => st(Be(o), c.value.emitTimezone)) : st(Be(i), c.value.emitTimezone);
      e("update:model-timezone-value", $e);
    }
  }, M = (i) => Array.isArray(n.value) ? r.value.enabled ? n.value.map((b) => i(b)) : [
    i(n.value[0]),
    n.value[1] ? i(n.value[1]) : Rt(f.value.partialRange)
  ] : i(Be(n.value)), V = () => {
    if (Array.isArray(n.value)) {
      const i = ut(n.value[0], t.weekStart), b = n.value[1] ? ut(n.value[1], t.weekStart) : [];
      return [i.map((de) => K(de)), b.map((de) => K(de))];
    }
    return ut(n.value, t.weekStart).map((i) => K(i));
  }, u = (i, b) => D(Be(M(i)), false, b), _ = (i) => {
    const b = V();
    return i ? b : e("update:model-value", V());
  }, T = (i = false) => (i || d(), t.monthPicker ? u(B, i) : t.timePicker ? u($, i) : t.yearPicker ? u(getYear, i) : t.weekPicker ? _(i) : D(O(i), true, i));
  return {
    inputValue: I,
    internalModelValue: n,
    checkBeforeEmit: () => n.value ? f.value.enabled ? f.value.partialRange ? n.value.length >= 1 : n.value.length === 2 : !!n.value : false,
    parseExternalModelValue: re,
    formatInputValue: d,
    emitModelValue: T
  };
};
var Ul = (e, t) => {
  const { defaultedFilters: l, propDates: n } = Pe(e), { validateMonthYearInRange: a } = bt(e), f = (h2, k) => {
    let p = h2;
    return l.value.months.includes(getMonth(p)) ? (p = k ? addMonths(h2, 1) : subMonths(h2, 1), f(p, k)) : p;
  }, c = (h2, k) => {
    let p = h2;
    return l.value.years.includes(getYear(p)) ? (p = k ? addYears(h2, 1) : subYears(h2, 1), c(p, k)) : p;
  }, r = (h2, k = false) => {
    const p = set(K(), { month: e.month, year: e.year });
    let Y = h2 ? addMonths(p, 1) : subMonths(p, 1);
    e.disableYearSelect && (Y = setYear(Y, e.year));
    let j = getMonth(Y), $ = getYear(Y);
    l.value.months.includes(j) && (Y = f(Y, h2), j = getMonth(Y), $ = getYear(Y)), l.value.years.includes($) && (Y = c(Y, h2), $ = getYear(Y)), a(j, $, h2, e.preventMinMaxNavigation) && R(j, $, k);
  }, R = (h2, k, p) => {
    t("update-month-year", { month: h2, year: k, fromNav: p });
  }, I = computed(() => (h2) => Pn(
    set(K(), { month: e.month, year: e.year }),
    n.value.maxDate,
    n.value.minDate,
    e.preventMinMaxNavigation,
    h2
  ));
  return { handleMonthYearChange: r, isDisabled: I, updateMonthYear: R };
};
var ia = {
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
  emitTimezone: { type: String, default: null },
  vertical: { type: Boolean, default: false },
  disableMonthYearSelect: { type: Boolean, default: false },
  disableYearSelect: { type: Boolean, default: false },
  menuClassName: { type: String, default: null },
  dayClass: {
    type: Function,
    default: null
  },
  yearRange: { type: Array, default: () => [1900, 2100] },
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
  minRange: { type: [Number, String], default: null },
  maxRange: { type: [Number, String], default: null },
  multiDatesLimit: { type: [Number, String], default: null },
  reverseYears: { type: Boolean, default: false },
  weekPicker: { type: Boolean, default: false },
  filters: { type: Object, default: () => ({}) },
  arrowNavigation: { type: Boolean, default: false },
  disableTimeRangeValidation: { type: Boolean, default: false },
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
  calendarClassName: { type: String, default: null },
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
  range: { type: [Boolean, Object], default: false },
  uid: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  inline: { type: [Boolean, Object], default: false },
  textInput: { type: [Boolean, Object], default: false },
  noDisabledRange: { type: Boolean, default: false },
  sixWeeks: { type: [Boolean, String], default: false },
  actionRow: { type: Object, default: () => ({}) },
  focusStartDate: { type: Boolean, default: false },
  disabledTimes: { type: [Function, Array], default: void 0 },
  showLastInRange: { type: Boolean, default: true },
  timePickerInline: { type: Boolean, default: false },
  calendar: { type: Function, default: null },
  config: { type: Object, default: void 0 },
  quarterPicker: { type: Boolean, default: false },
  yearFirst: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  onInternalModelChange: { type: [Function, Object], default: null },
  enableMinutes: { type: Boolean, default: true }
};
var at = {
  ...ia,
  shadow: { type: Boolean, default: false },
  flowStep: { type: Number, default: 0 },
  internalModelValue: { type: [Date, Array], default: null },
  noOverlayFocus: { type: Boolean, default: false },
  collapse: { type: Boolean, default: false },
  menuWrapRef: { type: Object, default: null },
  getInputRect: { type: Function, default: () => ({}) }
};
var jl = ["title"];
var Kl = ["disabled"];
var Gl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ActionRow",
  props: {
    menuMount: { type: Boolean, default: false },
    calendarWidth: { type: Number, default: 0 },
    ...at
  },
  emits: ["close-picker", "select-date", "select-now", "invalid-select"],
  setup(e, { emit: t }) {
    const l = t, n = e, {
      defaultedActionRow: a,
      defaultedPreviewFormat: f,
      defaultedMultiCalendars: c,
      defaultedTextInput: r,
      defaultedInline: R,
      defaultedRange: I,
      defaultedMultiDates: h2,
      getDefaultPattern: k
    } = Pe(n), { isTimeValid: p, isMonthValid: Y } = bt(n), { buildMatrix: j } = ht(), $ = ref(null), B = ref(null), w = ref(false), F = ref({}), N = ref(null), Q = ref(null);
    onMounted(() => {
      n.arrowNavigation && j([Ye($), Ye(B)], "actionRow"), L(), window.addEventListener("resize", L);
    }), onUnmounted(() => {
      window.removeEventListener("resize", L);
    });
    const L = () => {
      w.value = false, setTimeout(() => {
        var v, d;
        const H = (v = N.value) == null ? void 0 : v.getBoundingClientRect(), C = (d = Q.value) == null ? void 0 : d.getBoundingClientRect();
        H && C && (F.value.maxWidth = `${C.width - H.width - 20}px`), w.value = true;
      }, 0);
    }, ae = computed(() => I.value.enabled && !I.value.partialRange && n.internalModelValue ? n.internalModelValue.length === 2 : true), oe = computed(
      () => !p.value(n.internalModelValue) || !Y.value(n.internalModelValue) || !ae.value
    ), A = () => {
      const H = f.value;
      return n.timePicker || n.monthPicker, H(Be(n.internalModelValue));
    }, U = () => {
      const H = n.internalModelValue;
      return c.value.count > 0 ? `${Z(H[0])} - ${Z(H[1])}` : [Z(H[0]), Z(H[1])];
    }, Z = (H) => Cn(
      H,
      f.value,
      n.formatLocale,
      r.value.rangeSeparator,
      n.modelAuto,
      k()
    ), le = computed(() => !n.internalModelValue || !n.menuMount ? "" : typeof f.value == "string" ? Array.isArray(n.internalModelValue) ? n.internalModelValue.length === 2 && n.internalModelValue[1] ? U() : h2.value.enabled ? n.internalModelValue.map((H) => `${Z(H)}`) : n.modelAuto ? `${Z(n.internalModelValue[0])}` : `${Z(n.internalModelValue[0])} -` : Z(n.internalModelValue) : A()), O = () => h2.value.enabled ? "; " : " - ", z = computed(
      () => Array.isArray(le.value) ? le.value.join(O()) : le.value
    ), re = () => {
      p.value(n.internalModelValue) && Y.value(n.internalModelValue) && ae.value ? l("select-date") : l("invalid-select");
    };
    return (H, C) => (openBlock(), createElementBlock("div", {
      ref_key: "actionRowRef",
      ref: Q,
      class: "dp__action_row"
    }, [
      H.$slots["action-row"] ? renderSlot(H.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: H.internalModelValue,
        disabled: oe.value,
        selectDate: () => H.$emit("select-date"),
        closePicker: () => H.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(a).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: z.value,
          style: normalizeStyle(F.value)
        }, [
          H.$slots["action-preview"] && w.value ? renderSlot(H.$slots, "action-preview", {
            key: 0,
            value: H.internalModelValue
          }) : createCommentVNode("", true),
          !H.$slots["action-preview"] && w.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(z.value), 1)
          ], 64)) : createCommentVNode("", true)
        ], 12, jl)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "actionBtnContainer",
          ref: N,
          class: "dp__action_buttons",
          "data-dp-element": "action-row"
        }, [
          H.$slots["action-buttons"] ? renderSlot(H.$slots, "action-buttons", {
            key: 0,
            value: H.internalModelValue
          }) : createCommentVNode("", true),
          H.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(R).enabled && unref(a).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              ref_key: "cancelButtonRef",
              ref: $,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: C[0] || (C[0] = (v) => H.$emit("close-picker")),
              onKeydown: C[1] || (C[1] = (v) => unref(Qe)(v, () => H.$emit("close-picker")))
            }, toDisplayString(H.cancelText), 545)) : createCommentVNode("", true),
            unref(a).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: C[2] || (C[2] = (v) => H.$emit("select-now")),
              onKeydown: C[3] || (C[3] = (v) => unref(Qe)(v, () => H.$emit("select-now")))
            }, toDisplayString(H.nowButtonLabel), 33)) : createCommentVNode("", true),
            unref(a).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              ref_key: "selectButtonRef",
              ref: B,
              type: "button",
              class: "dp__action_button dp__action_select",
              disabled: oe.value,
              "data-test": "select-button",
              onKeydown: C[4] || (C[4] = (v) => unref(Qe)(v, () => re())),
              onClick: re
            }, toDisplayString(H.selectText), 41, Kl)) : createCommentVNode("", true)
          ], 64))
        ], 512)
      ], 64))
    ], 512));
  }
});
var Ql = { class: "dp__selection_grid_header" };
var ql = ["aria-selected", "aria-disabled", "data-test", "onClick", "onKeydown", "onMouseover"];
var Xl = ["aria-label"];
var Qt = defineComponent({
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
    ariaLabels: {}
  },
  emits: ["selected", "toggle", "reset-flow", "hover-value"],
  setup(e, { expose: t, emit: l }) {
    const { setSelectionGrid: n, buildMultiLevelMatrix: a, setMonthPicker: f } = ht(), c = l, r = e, { defaultedAriaLabels: R, defaultedTextInput: I, defaultedConfig: h2 } = Pe(
      r
    ), { hideNavigationButtons: k } = fa(), p = ref(false), Y = ref(null), j = ref(null), $ = ref([]), B = ref(), w = ref(null), F = ref(0), N = ref(null);
    onBeforeUpdate(() => {
      Y.value = null;
    }), onMounted(() => {
      nextTick().then(() => le()), r.noOverlayFocus || L(), Q(true);
    }), onUnmounted(() => Q(false));
    const Q = (M) => {
      var V;
      r.arrowNavigation && ((V = r.headerRefs) != null && V.length ? f(M) : n(M));
    }, L = () => {
      var V;
      const M = Ye(j);
      M && (I.value.enabled || (Y.value ? (V = Y.value) == null || V.focus({ preventScroll: true }) : M.focus({ preventScroll: true })), p.value = M.clientHeight < M.scrollHeight);
    }, ae = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !r.useRelative,
        "dp--overlay-relative": r.useRelative
      })
    ), oe = computed(
      () => r.useRelative ? { height: `${r.height}px`, width: "260px" } : void 0
    ), A = computed(() => ({
      dp__overlay_col: true
    })), U = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: p.value,
        dp__button_bottom: r.isLast
      })
    ), Z = computed(() => {
      var M, V;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((M = r.items) == null ? void 0 : M.length) <= 6,
        dp__container_block: ((V = r.items) == null ? void 0 : V.length) > 6
      };
    });
    watch(
      () => r.items,
      () => le(false),
      { deep: true }
    );
    const le = (M = true) => {
      nextTick().then(() => {
        const V = Ye(Y), u = Ye(j), _ = Ye(w), T = Ye(N), ce = _ ? _.getBoundingClientRect().height : 0;
        u && (u.getBoundingClientRect().height ? F.value = u.getBoundingClientRect().height - ce : F.value = h2.value.modeHeight - ce), V && T && M && (T.scrollTop = V.offsetTop - T.offsetTop - (F.value / 2 - V.getBoundingClientRect().height) - ce);
      });
    }, O = (M) => {
      M.disabled || c("selected", M.value);
    }, z = () => {
      c("toggle"), c("reset-flow");
    }, re = () => {
      r.escClose && z();
    }, H = (M, V, u, _) => {
      M && ((V.active || V.value === r.focusValue) && (Y.value = M), r.arrowNavigation && (Array.isArray($.value[u]) ? $.value[u][_] = M : $.value[u] = [M], C()));
    }, C = () => {
      var V, u;
      const M = (V = r.headerRefs) != null && V.length ? [r.headerRefs].concat($.value) : $.value.concat([r.skipButtonRef ? [] : [w.value]]);
      a(Be(M), (u = r.headerRefs) != null && u.length ? "monthPicker" : "selectionGrid");
    }, v = (M) => {
      r.arrowNavigation || gt(M, h2.value, true);
    }, d = (M) => {
      B.value = M, c("hover-value", M);
    }, X = () => {
      if (z(), !r.isLast) {
        const M = hl(r.menuWrapRef ?? null, "action-row");
        if (M) {
          const V = Mn(M);
          V == null || V.focus();
        }
      }
    }, ue = (M) => {
      switch (M.key) {
        case Re.esc:
          return re();
        case Re.arrowLeft:
          return v(M);
        case Re.arrowRight:
          return v(M);
        case Re.arrowUp:
          return v(M);
        case Re.arrowDown:
          return v(M);
        default:
          return;
      }
    }, D = (M) => {
      if (M.key === Re.enter)
        return z();
      if (M.key === Re.tab)
        return X();
    };
    return t({ focusGrid: L }), (M, V) => {
      var u;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: j,
        class: normalizeClass(ae.value),
        style: normalizeStyle(oe.value),
        role: "dialog",
        tabindex: "0",
        onKeydown: ue,
        onClick: V[0] || (V[0] = withModifiers(() => {
        }, ["prevent"]))
      }, [
        createBaseVNode("div", {
          ref_key: "containerRef",
          ref: N,
          class: normalizeClass(Z.value),
          role: "grid",
          style: normalizeStyle({ "--dp-overlay-height": `${F.value}px` })
        }, [
          createBaseVNode("div", Ql, [
            renderSlot(M.$slots, "header")
          ]),
          M.$slots.overlay ? renderSlot(M.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(M.items, (_, T) => (openBlock(), createElementBlock("div", {
            key: T,
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: M.items.length >= 3 }]),
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_, (ce, i) => (openBlock(), createElementBlock("div", {
              key: ce.value,
              ref_for: true,
              ref: (b) => H(b, ce, T, i),
              role: "gridcell",
              class: normalizeClass(A.value),
              "aria-selected": ce.active || void 0,
              "aria-disabled": ce.disabled || void 0,
              tabindex: "0",
              "data-test": ce.text,
              onClick: withModifiers((b) => O(ce), ["prevent"]),
              onKeydown: (b) => unref(Qe)(b, () => O(ce), true),
              onMouseover: (b) => d(ce.value)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(ce.className)
              }, [
                M.$slots.item ? renderSlot(M.$slots, "item", {
                  key: 0,
                  item: ce
                }) : createCommentVNode("", true),
                M.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(ce.text), 1)
                ], 64))
              ], 2)
            ], 42, ql))), 128))
          ], 2))), 128))
        ], 6),
        M.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "toggleButton",
          ref: w,
          type: "button",
          "aria-label": (u = unref(R)) == null ? void 0 : u.toggleOverlay,
          class: normalizeClass(U.value),
          tabindex: "0",
          onClick: z,
          onKeydown: D
        }, [
          renderSlot(M.$slots, "button-icon")
        ], 42, Xl)), [
          [vShow, !unref(k)(M.hideNavigation, M.type)]
        ]) : createCommentVNode("", true)
      ], 38);
    };
  }
});
var da = defineComponent({
  __name: "InstanceWrap",
  props: {
    multiCalendars: {},
    stretch: { type: Boolean },
    collapse: { type: Boolean }
  },
  setup(e) {
    const t = e, l = computed(
      () => t.multiCalendars > 0 ? [...Array(t.multiCalendars).keys()] : [0]
    ), n = computed(() => ({
      dp__instance_calendar: t.multiCalendars > 0
    }));
    return (a, f) => (openBlock(), createElementBlock("div", {
      class: normalizeClass({
        dp__menu_inner: !a.stretch,
        "dp--menu--inner-stretched": a.stretch,
        dp__flex_display: a.multiCalendars > 0,
        "dp--flex-display-collapsed": a.collapse
      })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(l.value, (c, r) => (openBlock(), createElementBlock("div", {
        key: c,
        class: normalizeClass(n.value)
      }, [
        renderSlot(a.$slots, "default", {
          instance: c,
          index: r
        })
      ], 2))), 128))
    ], 2));
  }
});
var Jl = ["aria-label", "aria-disabled"];
var zt = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ArrowBtn",
  props: {
    ariaLabel: {},
    disabled: { type: Boolean }
  },
  emits: ["activate", "set-ref"],
  setup(e, { emit: t }) {
    const l = t, n = ref(null);
    return onMounted(() => l("set-ref", n)), (a, f) => (openBlock(), createElementBlock("button", {
      ref_key: "elRef",
      ref: n,
      type: "button",
      class: "dp__btn dp--arrow-btn-nav",
      tabindex: "0",
      "aria-label": a.ariaLabel,
      "aria-disabled": a.disabled || void 0,
      onClick: f[0] || (f[0] = (c) => a.$emit("activate")),
      onKeydown: f[1] || (f[1] = (c) => unref(Qe)(c, () => a.$emit("activate"), true))
    }, [
      createBaseVNode("span", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: a.disabled }])
      }, [
        renderSlot(a.$slots, "default")
      ], 2)
    ], 40, Jl));
  }
});
var Zl = { class: "dp--year-mode-picker" };
var xl = ["aria-label", "data-test"];
var Yn = defineComponent({
  __name: "YearModePicker",
  props: {
    ...at,
    showYearPicker: { type: Boolean, default: false },
    items: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    isDisabled: { type: Function, default: () => false }
  },
  emits: ["toggle-year-picker", "year-select", "handle-year"],
  setup(e, { emit: t }) {
    const l = t, n = e, { showRightIcon: a, showLeftIcon: f } = fa(), { defaultedConfig: c, defaultedMultiCalendars: r, defaultedAriaLabels: R, defaultedTransitions: I } = Pe(n), { showTransition: h2, transitionName: k } = qt(I), p = ($ = false, B) => {
      l("toggle-year-picker", { flow: $, show: B });
    }, Y = ($) => {
      l("year-select", $);
    }, j = ($ = false) => {
      l("handle-year", $);
    };
    return ($, B) => {
      var w, F, N;
      return openBlock(), createElementBlock("div", Zl, [
        unref(f)(unref(r), e.instance) ? (openBlock(), createBlock(zt, {
          key: 0,
          ref: "mpPrevIconRef",
          "aria-label": (w = unref(R)) == null ? void 0 : w.prevYear,
          disabled: e.isDisabled(false),
          onActivate: B[0] || (B[0] = (Q) => j(false))
        }, {
          default: withCtx(() => [
            $.$slots["arrow-left"] ? renderSlot($.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
            $.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ea), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
        createBaseVNode("button", {
          ref: "mpYearButtonRef",
          class: "dp__btn dp--year-select",
          type: "button",
          "aria-label": (F = unref(R)) == null ? void 0 : F.openYearsOverlay,
          "data-test": `year-mode-btn-${e.instance}`,
          onClick: B[1] || (B[1] = () => p(false)),
          onKeydown: B[2] || (B[2] = withKeys(() => p(false), ["enter"]))
        }, [
          $.$slots.year ? renderSlot($.$slots, "year", {
            key: 0,
            year: e.year
          }) : createCommentVNode("", true),
          $.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(e.year), 1)
          ], 64))
        ], 40, xl),
        unref(a)(unref(r), e.instance) ? (openBlock(), createBlock(zt, {
          key: 1,
          ref: "mpNextIconRef",
          "aria-label": (N = unref(R)) == null ? void 0 : N.nextYear,
          disabled: e.isDisabled(true),
          onActivate: B[3] || (B[3] = (Q) => j(true))
        }, {
          default: withCtx(() => [
            $.$slots["arrow-right"] ? renderSlot($.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
            $.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Fa), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(k)(e.showYearPicker),
          css: unref(h2)
        }, {
          default: withCtx(() => [
            e.showYearPicker ? (openBlock(), createBlock(Qt, {
              key: 0,
              items: e.items,
              "text-input": $.textInput,
              "esc-close": $.escClose,
              config: $.config,
              "is-last": $.autoApply && !unref(c).keepActionRow,
              "hide-navigation": $.hideNavigation,
              "aria-labels": $.ariaLabels,
              type: "year",
              onToggle: p,
              onSelected: B[4] || (B[4] = (Q) => Y(Q))
            }, createSlots({
              "button-icon": withCtx(() => [
                $.$slots["calendar-icon"] ? renderSlot($.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                $.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Nt), { key: 1 }))
              ]),
              _: 2
            }, [
              $.$slots["year-overlay-value"] ? {
                name: "item",
                fn: withCtx(({ item: Q }) => [
                  renderSlot($.$slots, "year-overlay-value", {
                    text: Q.text,
                    value: Q.value
                  })
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["items", "text-input", "esc-close", "config", "is-last", "hide-navigation", "aria-labels"])) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var Ga = (e, t, l) => {
  if (t.value && Array.isArray(t.value))
    if (t.value.some((n) => he(e, n))) {
      const n = t.value.filter((a) => !he(a, e));
      t.value = n.length ? n : null;
    } else
      (l && +l > t.value.length || !l) && t.value.push(e);
  else
    t.value = [e];
};
var Qa = (e, t, l) => {
  let n = e.value ? e.value.slice() : [];
  return n.length === 2 && n[1] !== null && (n = []), n.length ? Ce(t, n[0]) ? (n.unshift(t), l("range-start", n[0]), l("range-start", n[1])) : (n[1] = t, l("range-end", t)) : (n = [t], l("range-start", t)), n;
};
var ca = (e, t, l, n) => {
  e && (e[0] && e[1] && l && t("auto-apply"), e[0] && !e[1] && n && l && t("auto-apply"));
};
var In = (e) => {
  Array.isArray(e.value) && e.value.length <= 2 && e.range ? e.modelValue.value = e.value.map((t) => st(K(t), e.timezone)) : Array.isArray(e.value) || (e.modelValue.value = st(K(e.value), e.timezone));
};
var Nn = (e, t, l, n) => Array.isArray(t.value) && (t.value.length === 2 || t.value.length === 1 && n.value.partialRange) ? n.value.fixedStart && (Oe(e, t.value[0]) || he(e, t.value[0])) ? [t.value[0], e] : n.value.fixedEnd && (Ce(e, t.value[1]) || he(e, t.value[1])) ? [e, t.value[1]] : (l("invalid-fixed-range", e), t.value) : [];
var En = ({
  multiCalendars: e,
  range: t,
  highlight: l,
  propDates: n,
  calendars: a,
  modelValue: f,
  props: c,
  filters: r,
  year: R,
  month: I,
  emit: h2
}) => {
  const k = computed(() => Wa(c.yearRange, c.locale, c.reverseYears)), p = ref([false]), Y = computed(() => (U, Z) => {
    const le = set(tt(/* @__PURE__ */ new Date()), {
      month: I.value(U),
      year: R.value(U)
    }), O = Z ? endOfYear(le) : startOfYear(le);
    return Pn(
      O,
      n.value.maxDate,
      n.value.minDate,
      c.preventMinMaxNavigation,
      Z
    );
  }), j = () => Array.isArray(f.value) && e.value.solo && f.value[1], $ = () => {
    for (let U = 0; U < e.value.count; U++)
      if (U === 0)
        a.value[U] = a.value[0];
      else if (U === e.value.count - 1 && j())
        a.value[U] = {
          month: getMonth(f.value[1]),
          year: getYear(f.value[1])
        };
      else {
        const Z = set(K(), a.value[U - 1]);
        a.value[U] = { month: getMonth(Z), year: getYear(addYears(Z, 1)) };
      }
  }, B = (U) => {
    if (!U)
      return $();
    const Z = set(K(), a.value[U]);
    return a.value[0].year = getYear(subYears(Z, e.value.count - 1)), $();
  }, w = (U, Z) => {
    const le = differenceInYears(Z, U);
    return t.value.showLastInRange && le > 1 ? Z : U;
  }, F = (U) => c.focusStartDate || e.value.solo ? U[0] : U[1] ? w(U[0], U[1]) : U[0], N = () => {
    if (f.value) {
      const U = Array.isArray(f.value) ? F(f.value) : f.value;
      a.value[0] = { month: getMonth(U), year: getYear(U) };
    }
  };
  onMounted(() => {
    N(), e.value.count && $();
  });
  const Q = (U, Z) => {
    a.value[Z].year = U, h2("update-month-year", { instance: Z, year: U, month: a.value[Z].month }), e.value.count && !e.value.solo && B(Z);
  }, L = computed(() => (U) => Bt(k.value, (Z) => {
    var re;
    const le = R.value(U) === Z.value, O = Kt(
      Z.value,
      Yt(n.value.minDate),
      Yt(n.value.maxDate)
    ) || ((re = r.value.years) == null ? void 0 : re.includes(R.value(U))), z = Ka(l.value, Z.value);
    return { active: le, disabled: O, highlighted: z };
  })), ae = (U, Z) => {
    Q(U, Z), A(Z);
  }, oe = (U, Z = false) => {
    if (!Y.value(U, Z)) {
      const le = Z ? R.value(U) + 1 : R.value(U) - 1;
      Q(le, U);
    }
  }, A = (U, Z = false, le) => {
    Z || h2("reset-flow"), le !== void 0 ? p.value[U] = le : p.value[U] = !p.value[U], p.value[U] ? h2("overlay-toggle", { open: true, overlay: He.year }) : (h2("overlay-closed"), h2("overlay-toggle", { open: false, overlay: He.year }));
  };
  return {
    isDisabled: Y,
    groupedYears: L,
    showYearPicker: p,
    selectYear: Q,
    toggleYearPicker: A,
    handleYearSelect: ae,
    handleYear: oe
  };
};
var er = (e, t) => {
  const {
    defaultedMultiCalendars: l,
    defaultedAriaLabels: n,
    defaultedTransitions: a,
    defaultedConfig: f,
    defaultedRange: c,
    defaultedHighlight: r,
    propDates: R,
    defaultedTz: I,
    defaultedFilters: h2,
    defaultedMultiDates: k
  } = Pe(e), { modelValue: p, year: Y, month: j, calendars: $ } = Xt(e, t), B = computed(() => wn(e.formatLocale, e.locale, e.monthNameFormat)), w = ref(null), { checkMinMaxRange: F } = bt(e), {
    selectYear: N,
    groupedYears: Q,
    showYearPicker: L,
    toggleYearPicker: ae,
    handleYearSelect: oe,
    handleYear: A,
    isDisabled: U
  } = En({
    modelValue: p,
    multiCalendars: l,
    range: c,
    highlight: r,
    calendars: $,
    year: Y,
    propDates: R,
    month: j,
    filters: h2,
    props: e,
    emit: t
  });
  onMounted(() => {
    e.startDate && (p.value && e.focusStartDate || !p.value) && N(getYear(K(e.startDate)), 0);
  });
  const Z = (_) => _ ? { month: getMonth(_), year: getYear(_) } : { month: null, year: null }, le = () => p.value ? Array.isArray(p.value) ? p.value.map((_) => Z(_)) : Z(p.value) : Z(), O = (_, T) => {
    const ce = $.value[_], i = le();
    return Array.isArray(i) ? i.some((b) => b.year === (ce == null ? void 0 : ce.year) && b.month === T) : (ce == null ? void 0 : ce.year) === i.year && T === i.month;
  }, z = (_, T, ce) => {
    var b, de;
    const i = le();
    return Array.isArray(i) ? Y.value(T) === ((b = i[ce]) == null ? void 0 : b.year) && _ === ((de = i[ce]) == null ? void 0 : de.month) : false;
  }, re = (_, T) => {
    if (c.value.enabled) {
      const ce = le();
      if (Array.isArray(p.value) && Array.isArray(ce)) {
        const i = z(_, T, 0) || z(_, T, 1), b = it(tt(K()), _, Y.value(T));
        return ua(p.value, w.value, b) && !i;
      }
      return false;
    }
    return false;
  }, H = computed(() => (_) => Bt(B.value, (T) => {
    var $e;
    const ce = O(_, T.value), i = Kt(
      T.value,
      An(Y.value(_), R.value.minDate),
      Tn(Y.value(_), R.value.maxDate)
    ) || Tl(R.value.disabledDates, Y.value(_)).includes(T.value) || (($e = h2.value.months) == null ? void 0 : $e.includes(T.value)), b = re(T.value, _), de = _n(r.value, T.value, Y.value(_));
    return { active: ce, disabled: i, isBetween: b, highlighted: de };
  })), C = (_, T) => it(tt(K()), _, Y.value(T)), v = (_, T) => {
    const ce = p.value ? p.value : tt(/* @__PURE__ */ new Date());
    p.value = it(ce, _, Y.value(T)), t("auto-apply"), t("update-flow-step");
  }, d = (_, T) => {
    const ce = C(_, T);
    c.value.fixedEnd || c.value.fixedStart ? p.value = Nn(ce, p, t, c) : p.value ? F(ce, p.value) && (p.value = Qa(p, C(_, T), t)) : p.value = [C(_, T)], nextTick().then(() => {
      ca(p.value, t, e.autoApply, e.modelAuto);
    });
  }, X = (_, T) => {
    Ga(C(_, T), p, k.value.limit), t("auto-apply", true);
  }, ue = (_, T) => ($.value[T].month = _, M(T, $.value[T].year, _), k.value.enabled ? X(_, T) : c.value.enabled ? d(_, T) : v(_, T)), D = (_, T) => {
    N(_, T), M(T, _, null);
  }, M = (_, T, ce) => {
    let i = ce;
    if (!i && i !== 0) {
      const b = le();
      i = Array.isArray(b) ? b[_].month : b.month;
    }
    t("update-month-year", { instance: _, year: T, month: i });
  };
  return {
    groupedMonths: H,
    groupedYears: Q,
    year: Y,
    isDisabled: U,
    defaultedMultiCalendars: l,
    defaultedAriaLabels: n,
    defaultedTransitions: a,
    defaultedConfig: f,
    showYearPicker: L,
    modelValue: p,
    presetDate: (_, T) => {
      In({
        value: _,
        modelValue: p,
        range: c.value.enabled,
        timezone: T ? void 0 : I.value.timezone
      }), t("auto-apply");
    },
    setHoverDate: (_, T) => {
      w.value = C(_, T);
    },
    selectMonth: ue,
    selectYear: D,
    toggleYearPicker: ae,
    handleYearSelect: oe,
    handleYear: A,
    getModelMonthYear: le
  };
};
var tr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "MonthPicker",
  props: {
    ...at
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
    const n = l, a = useSlots(), f = Xe(a, "yearMode"), c = e;
    onMounted(() => {
      c.shadow || n("mount", null);
    });
    const {
      groupedMonths: r,
      groupedYears: R,
      year: I,
      isDisabled: h2,
      defaultedMultiCalendars: k,
      defaultedConfig: p,
      showYearPicker: Y,
      modelValue: j,
      presetDate: $,
      setHoverDate: B,
      selectMonth: w,
      selectYear: F,
      toggleYearPicker: N,
      handleYearSelect: Q,
      handleYear: L,
      getModelMonthYear: ae
    } = er(c, n);
    return t({ getSidebarProps: () => ({
      modelValue: j,
      year: I,
      getModelMonthYear: ae,
      selectMonth: w,
      selectYear: F,
      handleYear: L
    }), presetDate: $, toggleYearPicker: (A) => N(0, A) }), (A, U) => (openBlock(), createBlock(da, {
      "multi-calendars": unref(k).count,
      collapse: A.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: Z }) => [
        A.$slots["top-extra"] ? renderSlot(A.$slots, "top-extra", {
          key: 0,
          value: A.internalModelValue
        }) : createCommentVNode("", true),
        A.$slots["month-year"] ? renderSlot(A.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
          year: unref(I),
          months: unref(r)(Z),
          years: unref(R)(Z),
          selectMonth: unref(w),
          selectYear: unref(F),
          instance: Z
        }))) : (openBlock(), createBlock(Qt, {
          key: 2,
          items: unref(r)(Z),
          "arrow-navigation": A.arrowNavigation,
          "is-last": A.autoApply && !unref(p).keepActionRow,
          "esc-close": A.escClose,
          height: unref(p).modeHeight,
          config: A.config,
          "no-overlay-focus": !!(A.noOverlayFocus || A.textInput),
          "use-relative": "",
          type: "month",
          onSelected: (le) => unref(w)(le, Z),
          onHoverValue: (le) => unref(B)(le, Z)
        }, createSlots({
          header: withCtx(() => [
            createVNode(Yn, mergeProps(A.$props, {
              items: unref(R)(Z),
              instance: Z,
              "show-year-picker": unref(Y)[Z],
              year: unref(I)(Z),
              "is-disabled": (le) => unref(h2)(Z, le),
              onHandleYear: (le) => unref(L)(Z, le),
              onYearSelect: (le) => unref(Q)(le, Z),
              onToggleYearPicker: (le) => unref(N)(Z, le == null ? void 0 : le.flow, le == null ? void 0 : le.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(f), (le, O) => ({
                name: le,
                fn: withCtx((z) => [
                  renderSlot(A.$slots, le, normalizeProps(guardReactiveProps(z)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          _: 2
        }, [
          A.$slots["month-overlay-value"] ? {
            name: "item",
            fn: withCtx(({ item: le }) => [
              renderSlot(A.$slots, "month-overlay-value", {
                text: le.text,
                value: le.value
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
var ar = (e, t) => {
  const { modelValue: l } = Xt(e, t), n = ref(null), { defaultedHighlight: a, defaultedMultiDates: f, defaultedFilters: c, defaultedRange: r, propDates: R } = Pe(e), I = ref();
  onMounted(() => {
    e.startDate && (l.value && e.focusStartDate || !l.value) && (I.value = getYear(K(e.startDate)));
  });
  const h2 = (B) => Array.isArray(l.value) ? l.value.some((w) => getYear(w) === B) : l.value ? getYear(l.value) === B : false, k = (B) => r.value.enabled && Array.isArray(l.value) ? ua(l.value, n.value, Y(B)) : false, p = computed(() => Bt(Wa(e.yearRange, e.locale, e.reverseYears), (B) => {
    const w = h2(B.value), F = Kt(
      B.value,
      Yt(R.value.minDate),
      Yt(R.value.maxDate)
    ) || c.value.years.includes(B.value), N = k(B.value) && !w, Q = Ka(a.value, B.value);
    return { active: w, disabled: F, isBetween: N, highlighted: Q };
  })), Y = (B) => setYear(tt(/* @__PURE__ */ new Date()), B);
  return {
    groupedYears: p,
    modelValue: l,
    focusYear: I,
    setHoverValue: (B) => {
      n.value = setYear(tt(/* @__PURE__ */ new Date()), B);
    },
    selectYear: (B) => {
      var w;
      if (t("update-month-year", { instance: 0, year: B }), f.value.enabled)
        return l.value ? Array.isArray(l.value) && (((w = l.value) == null ? void 0 : w.map((N) => getYear(N))).includes(B) ? l.value = l.value.filter((N) => getYear(N) !== B) : l.value.push(setYear(je(K()), B))) : l.value = [setYear(je(K()), B)], t("auto-apply", true);
      r.value.enabled ? (l.value = Qa(l, Y(B), t), nextTick().then(() => {
        ca(l.value, t, e.autoApply, e.modelAuto);
      })) : (l.value = Y(B), t("auto-apply"));
    }
  };
};
var nr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "YearPicker",
  props: {
    ...at
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
    const n = l, a = e, { groupedYears: f, modelValue: c, focusYear: r, selectYear: R, setHoverValue: I } = ar(a, n), { defaultedConfig: h2 } = Pe(a);
    return t({ getSidebarProps: () => ({
      modelValue: c,
      selectYear: R
    }) }), (p, Y) => (openBlock(), createElementBlock("div", null, [
      p.$slots["top-extra"] ? renderSlot(p.$slots, "top-extra", {
        key: 0,
        value: p.internalModelValue
      }) : createCommentVNode("", true),
      p.$slots["month-year"] ? renderSlot(p.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
        years: unref(f),
        selectYear: unref(R)
      }))) : (openBlock(), createBlock(Qt, {
        key: 2,
        items: unref(f),
        "is-last": p.autoApply && !unref(h2).keepActionRow,
        height: unref(h2).modeHeight,
        config: p.config,
        "no-overlay-focus": !!(p.noOverlayFocus || p.textInput),
        "focus-value": unref(r),
        type: "year",
        "use-relative": "",
        onSelected: unref(R),
        onHoverValue: unref(I)
      }, createSlots({ _: 2 }, [
        p.$slots["year-overlay-value"] ? {
          name: "item",
          fn: withCtx(({ item: j }) => [
            renderSlot(p.$slots, "year-overlay-value", {
              text: j.text,
              value: j.value
            })
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["items", "is-last", "height", "config", "no-overlay-focus", "focus-value", "onSelected", "onHoverValue"]))
    ]));
  }
});
var lr = {
  key: 0,
  class: "dp__time_input"
};
var rr = ["data-test", "aria-label", "onKeydown", "onClick", "onMousedown"];
var or = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var sr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var ur = ["aria-label", "disabled", "data-test", "onKeydown", "onClick"];
var ir = ["data-test", "aria-label", "onKeydown", "onClick", "onMousedown"];
var dr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var cr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
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
    ...at
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
    const n = l, a = e, { setTimePickerElements: f, setTimePickerBackRef: c } = ht(), { defaultedAriaLabels: r, defaultedTransitions: R, defaultedFilters: I, defaultedConfig: h2, defaultedRange: k } = Pe(a), { transitionName: p, showTransition: Y } = qt(R), j = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), $ = ref("AM"), B = ref(null), w = ref([]), F = ref();
    onMounted(() => {
      n("mounted");
    });
    const N = (o) => set(/* @__PURE__ */ new Date(), {
      hours: o.hours,
      minutes: o.minutes,
      seconds: a.enableSeconds ? o.seconds : 0,
      milliseconds: 0
    }), Q = computed(
      () => (o) => C(o, a[o]) || ae(o, a[o])
    ), L = computed(() => ({ hours: a.hours, minutes: a.minutes, seconds: a.seconds })), ae = (o, E) => k.value.enabled && !k.value.disableTimeRangeValidation ? !a.validateTime(o, E) : false, oe = (o, E) => {
      if (k.value.enabled && !k.value.disableTimeRangeValidation) {
        const ee = E ? +a[`${o}Increment`] : -+a[`${o}Increment`], P = a[o] + ee;
        return !a.validateTime(o, P);
      }
      return false;
    }, A = computed(() => (o) => !D(+a[o] + +a[`${o}Increment`], o) || oe(o, true)), U = computed(() => (o) => !D(+a[o] - +a[`${o}Increment`], o) || oe(o, false)), Z = (o, E) => add(set(K(), o), E), le = (o, E) => sub(set(K(), o), E), O = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !a.timePickerInline,
        dp__time_col_reg_block: !a.enableSeconds && a.is24 && !a.timePickerInline,
        dp__time_col_reg_inline: !a.enableSeconds && a.is24 && a.timePickerInline,
        dp__time_col_reg_with_button: !a.enableSeconds && !a.is24,
        dp__time_col_sec: a.enableSeconds && a.is24,
        dp__time_col_sec_with_button: a.enableSeconds && !a.is24
      })
    ), z = computed(() => {
      const o = [{ type: "hours" }];
      return a.enableMinutes && o.push({ type: "", separator: true }, {
        type: "minutes"
      }), a.enableSeconds && o.push({ type: "", separator: true }, {
        type: "seconds"
      }), o;
    }), re = computed(() => z.value.filter((o) => !o.separator)), H = computed(() => (o) => {
      if (o === "hours") {
        const E = ce(+a.hours);
        return { text: E < 10 ? `0${E}` : `${E}`, value: E };
      }
      return { text: a[o] < 10 ? `0${a[o]}` : `${a[o]}`, value: a[o] };
    }), C = (o, E) => {
      var P;
      if (!a.disabledTimesConfig)
        return false;
      const ee = a.disabledTimesConfig(a.order, o === "hours" ? E : void 0);
      return ee[o] ? !!((P = ee[o]) != null && P.includes(E)) : true;
    }, v = (o, E) => E !== "hours" || $.value === "AM" ? o : o + 12, d = (o) => {
      const E = a.is24 ? 24 : 12, ee = o === "hours" ? E : 60, P = +a[`${o}GridIncrement`], se = o === "hours" && !a.is24 ? P : 0, y = [];
      for (let G = se; G < ee; G += P)
        y.push({ value: a.is24 ? G : v(G, o), text: G < 10 ? `0${G}` : `${G}` });
      return o === "hours" && !a.is24 && y.unshift({ value: $.value === "PM" ? 12 : 0, text: "12" }), Bt(y, (G) => ({ active: false, disabled: I.value.times[o].includes(G.value) || !D(G.value, o) || C(o, G.value) || ae(o, G.value) }));
    }, X = (o) => o >= 0 ? o : 59, ue = (o) => o >= 0 ? o : 23, D = (o, E) => {
      const ee = a.minTime ? N(Ma(a.minTime)) : null, P = a.maxTime ? N(Ma(a.maxTime)) : null, se = N(
        Ma(
          L.value,
          E,
          E === "minutes" || E === "seconds" ? X(o) : ue(o)
        )
      );
      return ee && P ? (isBefore(se, P) || isEqual(se, P)) && (isAfter(se, ee) || isEqual(se, ee)) : ee ? isAfter(se, ee) || isEqual(se, ee) : P ? isBefore(se, P) || isEqual(se, P) : true;
    }, M = (o) => a[`no${o[0].toUpperCase() + o.slice(1)}Overlay`], V = (o) => {
      M(o) || (j[o] = !j[o], j[o] ? n("overlay-opened", o) : n("overlay-closed", o));
    }, u = (o) => o === "hours" ? getHours : o === "minutes" ? getMinutes : getSeconds, _ = () => {
      F.value && clearTimeout(F.value);
    }, T = (o, E = true, ee) => {
      const P = E ? Z : le, se = E ? +a[`${o}Increment`] : -+a[`${o}Increment`];
      D(+a[o] + se, o) && n(
        `update:${o}`,
        u(o)(P({ [o]: +a[o] }, { [o]: +a[`${o}Increment`] }))
      ), !(ee != null && ee.keyboard) && h2.value.timeArrowHoldThreshold && (F.value = setTimeout(() => {
        T(o, E);
      }, h2.value.timeArrowHoldThreshold));
    }, ce = (o) => a.is24 ? o : (o >= 12 ? $.value = "PM" : $.value = "AM", vl(o)), i = () => {
      $.value === "PM" ? ($.value = "AM", n("update:hours", a.hours - 12)) : ($.value = "PM", n("update:hours", a.hours + 12)), n("am-pm-change", $.value);
    }, b = (o) => {
      j[o] = true;
    }, de = (o, E, ee) => {
      if (o && a.arrowNavigation) {
        Array.isArray(w.value[E]) ? w.value[E][ee] = o : w.value[E] = [o];
        const P = w.value.reduce(
          (se, y) => y.map((G, we) => [...se[we] || [], y[we]]),
          []
        );
        c(a.closeTimePickerBtn), B.value && (P[1] = P[1].concat(B.value)), f(P, a.order);
      }
    }, $e = (o, E) => (V(o), n(`update:${o}`, E));
    return t({ openChildCmp: b }), (o, E) => {
      var ee;
      return o.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", lr, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(z.value, (P, se) => {
          var y, G, we;
          return openBlock(), createElementBlock("div", {
            key: se,
            class: normalizeClass(O.value)
          }, [
            P.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(" : ")
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                ref_for: true,
                ref: (ve) => de(ve, se, 0),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !o.timePickerInline,
                  dp__inc_dec_button_inline: o.timePickerInline,
                  dp__tp_inline_btn_top: o.timePickerInline,
                  dp__inc_dec_button_disabled: A.value(P.type)
                }),
                "data-test": `${P.type}-time-inc-btn-${a.order}`,
                "aria-label": (y = unref(r)) == null ? void 0 : y.incrementValue(P.type),
                tabindex: "0",
                onKeydown: (ve) => unref(Qe)(ve, () => T(P.type, true, { keyboard: true }), true),
                onClick: (ve) => unref(h2).timeArrowHoldThreshold ? void 0 : T(P.type, true),
                onMousedown: (ve) => unref(h2).timeArrowHoldThreshold ? T(P.type, true) : void 0,
                onMouseup: _
              }, [
                a.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  or,
                  sr
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  o.$slots["arrow-up"] ? renderSlot(o.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  o.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ha), { key: 1 }))
                ], 64))
              ], 42, rr),
              createBaseVNode("button", {
                ref_for: true,
                ref: (ve) => de(ve, se, 1),
                type: "button",
                "aria-label": (G = unref(r)) == null ? void 0 : G.openTpOverlay(P.type),
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !o.timePickerInline,
                  dp__time_display_inline: o.timePickerInline,
                  "dp--time-invalid": Q.value(P.type),
                  "dp--time-overlay-btn": !Q.value(P.type)
                }),
                disabled: M(P.type),
                tabindex: "0",
                "data-test": `${P.type}-toggle-overlay-btn-${a.order}`,
                onKeydown: (ve) => unref(Qe)(ve, () => V(P.type), true),
                onClick: (ve) => V(P.type)
              }, [
                o.$slots[P.type] ? renderSlot(o.$slots, P.type, {
                  key: 0,
                  text: H.value(P.type).text,
                  value: H.value(P.type).value
                }) : createCommentVNode("", true),
                o.$slots[P.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(H.value(P.type).text), 1)
                ], 64))
              ], 42, ur),
              createBaseVNode("button", {
                ref_for: true,
                ref: (ve) => de(ve, se, 2),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !o.timePickerInline,
                  dp__inc_dec_button_inline: o.timePickerInline,
                  dp__tp_inline_btn_bottom: o.timePickerInline,
                  dp__inc_dec_button_disabled: U.value(P.type)
                }),
                "data-test": `${P.type}-time-dec-btn-${a.order}`,
                "aria-label": (we = unref(r)) == null ? void 0 : we.decrementValue(P.type),
                tabindex: "0",
                onKeydown: (ve) => unref(Qe)(ve, () => T(P.type, false, { keyboard: true }), true),
                onClick: (ve) => unref(h2).timeArrowHoldThreshold ? void 0 : T(P.type, false),
                onMousedown: (ve) => unref(h2).timeArrowHoldThreshold ? T(P.type, false) : void 0,
                onMouseup: _
              }, [
                a.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  dr,
                  cr
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  o.$slots["arrow-down"] ? renderSlot(o.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                  o.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(za), { key: 1 }))
                ], 64))
              ], 42, ir)
            ], 64))
          ], 2);
        }), 128)),
        o.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", fr, [
          o.$slots["am-pm-button"] ? renderSlot(o.$slots, "am-pm-button", {
            key: 0,
            toggle: i,
            value: $.value
          }) : createCommentVNode("", true),
          o.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: B,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (ee = unref(r)) == null ? void 0 : ee.amPmButton,
            tabindex: "0",
            onClick: i,
            onKeydown: E[0] || (E[0] = (P) => unref(Qe)(P, () => i(), true))
          }, toDisplayString($.value), 41, vr))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(re.value, (P, se) => (openBlock(), createBlock(Transition, {
          key: se,
          name: unref(p)(j[P.type]),
          css: unref(Y)
        }, {
          default: withCtx(() => [
            j[P.type] ? (openBlock(), createBlock(Qt, {
              key: 0,
              items: d(P.type),
              "is-last": o.autoApply && !unref(h2).keepActionRow,
              "esc-close": o.escClose,
              type: P.type,
              "text-input": o.textInput,
              config: o.config,
              "arrow-navigation": o.arrowNavigation,
              "aria-labels": o.ariaLabels,
              onSelected: (y) => $e(P.type, y),
              onToggle: (y) => V(P.type),
              onResetFlow: E[1] || (E[1] = (y) => o.$emit("reset-flow"))
            }, createSlots({
              "button-icon": withCtx(() => [
                o.$slots["clock-icon"] ? renderSlot(o.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                o.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(o.timePickerInline ? unref(Nt) : unref(La)), { key: 1 }))
              ]),
              _: 2
            }, [
              o.$slots[`${P.type}-overlay-value`] ? {
                name: "item",
                fn: withCtx(({ item: y }) => [
                  renderSlot(o.$slots, `${P.type}-overlay-value`, {
                    text: y.text,
                    value: y.value
                  })
                ]),
                key: "0"
              } : void 0,
              o.$slots[`${P.type}-overlay-header`] ? {
                name: "header",
                fn: withCtx(() => [
                  renderSlot(o.$slots, `${P.type}-overlay-header`, {
                    toggle: () => V(P.type)
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["items", "is-last", "esc-close", "type", "text-input", "config", "arrow-navigation", "aria-labels", "onSelected", "onToggle"])) : createCommentVNode("", true)
          ]),
          _: 2
        }, 1032, ["name", "css"]))), 128))
      ]));
    };
  }
});
var gr = { class: "dp--tp-wrap" };
var yr = ["aria-label", "tabindex"];
var pr = ["tabindex"];
var hr = ["aria-label"];
var Fn = defineComponent({
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
    ...at
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
    const n = l, a = e, { buildMatrix: f, setTimePicker: c } = ht(), r = useSlots(), { defaultedTransitions: R, defaultedAriaLabels: I, defaultedTextInput: h2, defaultedConfig: k, defaultedRange: p } = Pe(a), { transitionName: Y, showTransition: j } = qt(R), { hideNavigationButtons: $ } = fa(), B = ref(null), w = ref(null), F = ref([]), N = ref(null);
    onMounted(() => {
      n("mount"), !a.timePicker && a.arrowNavigation ? f([Ye(B.value)], "time") : c(true, a.timePicker);
    });
    const Q = computed(() => p.value.enabled && a.modelAuto ? Dn(a.internalModelValue) : true), L = ref(false), ae = (v) => ({
      hours: Array.isArray(a.hours) ? a.hours[v] : a.hours,
      minutes: Array.isArray(a.minutes) ? a.minutes[v] : a.minutes,
      seconds: Array.isArray(a.seconds) ? a.seconds[v] : a.seconds
    }), oe = computed(() => {
      const v = [];
      if (p.value.enabled)
        for (let d = 0; d < 2; d++)
          v.push(ae(d));
      else
        v.push(ae(0));
      return v;
    }), A = (v, d = false, X = "") => {
      d || n("reset-flow"), L.value = v, n(v ? "overlay-opened" : "overlay-closed", He.time), a.arrowNavigation && c(v), nextTick(() => {
        X !== "" && F.value[0] && F.value[0].openChildCmp(X);
      });
    }, U = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: a.autoApply && !k.value.keepActionRow
    })), Z = Xe(r, "timePicker"), le = (v, d, X) => p.value.enabled ? d === 0 ? [v, oe.value[1][X]] : [oe.value[0][X], v] : v, O = (v) => {
      n("update:hours", v);
    }, z = (v) => {
      n("update:minutes", v);
    }, re = (v) => {
      n("update:seconds", v);
    }, H = () => {
      if (N.value && !h2.value.enabled && !a.noOverlayFocus) {
        const v = Mn(N.value);
        v && v.focus({ preventScroll: true });
      }
    }, C = (v) => {
      n("overlay-closed", v);
    };
    return t({ toggleTimePicker: A }), (v, d) => {
      var X;
      return openBlock(), createElementBlock("div", gr, [
        !v.timePicker && !v.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "openTimePickerBtn",
          ref: B,
          type: "button",
          class: normalizeClass(U.value),
          "aria-label": (X = unref(I)) == null ? void 0 : X.openTimePicker,
          tabindex: v.noOverlayFocus ? void 0 : 0,
          "data-test": "open-time-picker-btn",
          onKeydown: d[0] || (d[0] = (ue) => unref(Qe)(ue, () => A(true))),
          onClick: d[1] || (d[1] = (ue) => A(true))
        }, [
          v.$slots["clock-icon"] ? renderSlot(v.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          v.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(La), { key: 1 }))
        ], 42, yr)), [
          [vShow, !unref($)(v.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(Y)(L.value),
          css: unref(j) && !v.timePickerInline
        }, {
          default: withCtx(() => {
            var ue;
            return [
              L.value || v.timePicker || v.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "overlayRef",
                ref: N,
                class: normalizeClass({
                  dp__overlay: !v.timePickerInline,
                  "dp--overlay-absolute": !a.timePicker && !v.timePickerInline,
                  "dp--overlay-relative": a.timePicker
                }),
                style: normalizeStyle(v.timePicker ? { height: `${unref(k).modeHeight}px` } : void 0),
                tabindex: v.timePickerInline ? void 0 : 0
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(
                    v.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
                  ),
                  style: { display: "flex" }
                }, [
                  v.$slots["time-picker-overlay"] ? renderSlot(v.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e.hours,
                    minutes: e.minutes,
                    seconds: e.seconds,
                    setHours: O,
                    setMinutes: z,
                    setSeconds: re
                  }) : createCommentVNode("", true),
                  v.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(v.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(oe.value, (D, M) => withDirectives((openBlock(), createBlock(mr, mergeProps({
                      key: M,
                      ref_for: true
                    }, {
                      ...v.$props,
                      order: M,
                      hours: D.hours,
                      minutes: D.minutes,
                      seconds: D.seconds,
                      closeTimePickerBtn: w.value,
                      disabledTimesConfig: e.disabledTimesConfig,
                      disabled: M === 0 ? v.fixedStart : v.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: F,
                      "validate-time": (V, u) => e.validateTime(V, le(u, M, V)),
                      "onUpdate:hours": (V) => O(le(V, M, "hours")),
                      "onUpdate:minutes": (V) => z(le(V, M, "minutes")),
                      "onUpdate:seconds": (V) => re(le(V, M, "seconds")),
                      onMounted: H,
                      onOverlayClosed: C,
                      onOverlayOpened: d[2] || (d[2] = (V) => v.$emit("overlay-opened", V)),
                      onAmPmChange: d[3] || (d[3] = (V) => v.$emit("am-pm-change", V))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(Z), (V, u) => ({
                        name: V,
                        fn: withCtx((_) => [
                          renderSlot(v.$slots, V, mergeProps({ ref_for: true }, _))
                        ])
                      }))
                    ]), 1040, ["validate-time", "onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, M === 0 ? true : Q.value]
                    ])), 128))
                  ], 2)),
                  !v.timePicker && !v.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: w,
                    type: "button",
                    class: normalizeClass(U.value),
                    "aria-label": (ue = unref(I)) == null ? void 0 : ue.closeTimePicker,
                    tabindex: "0",
                    onKeydown: d[4] || (d[4] = (D) => unref(Qe)(D, () => A(false))),
                    onClick: d[5] || (d[5] = (D) => A(false))
                  }, [
                    v.$slots["calendar-icon"] ? renderSlot(v.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    v.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Nt), { key: 1 }))
                  ], 42, hr)), [
                    [vShow, !unref($)(v.hideNavigation, "time")]
                  ]) : createCommentVNode("", true)
                ], 2)
              ], 14, pr)) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var Ln = (e, t, l, n) => {
  const { defaultedRange: a } = Pe(e), f = (N, Q) => Array.isArray(t[N]) ? t[N][Q] : t[N], c = (N) => e.enableSeconds ? Array.isArray(t.seconds) ? t.seconds[N] : t.seconds : 0, r = (N, Q) => N ? Q !== void 0 ? yt(N, f("hours", Q), f("minutes", Q), c(Q)) : yt(N, t.hours, t.minutes, c()) : setSeconds(K(), c(Q)), R = (N, Q) => {
    t[N] = Q;
  }, I = computed(() => e.modelAuto && a.value.enabled ? Array.isArray(l.value) ? l.value.length > 1 : false : a.value.enabled), h2 = (N, Q) => {
    const L = Object.fromEntries(
      Object.keys(t).map((ae) => ae === N ? [ae, Q] : [ae, t[ae]].slice())
    );
    if (I.value && !a.value.disableTimeRangeValidation) {
      const ae = (A) => l.value ? yt(
        l.value[A],
        L.hours[A],
        L.minutes[A],
        L.seconds[A]
      ) : null, oe = (A) => setMilliseconds(l.value[A], 0);
      return !(he(ae(0), ae(1)) && (isAfter(ae(0), oe(1)) || isBefore(ae(1), oe(0))));
    }
    return true;
  }, k = (N, Q) => {
    h2(N, Q) && (R(N, Q), n && n());
  }, p = (N) => {
    k("hours", N);
  }, Y = (N) => {
    k("minutes", N);
  }, j = (N) => {
    k("seconds", N);
  }, $ = (N, Q, L, ae) => {
    Q && p(N), !Q && !L && Y(N), L && j(N), l.value && ae(l.value);
  }, B = (N) => {
    if (N) {
      const Q = Array.isArray(N), L = Q ? [+N[0].hours, +N[1].hours] : +N.hours, ae = Q ? [+N[0].minutes, +N[1].minutes] : +N.minutes, oe = Q ? [+N[0].seconds, +N[1].seconds] : +N.seconds;
      R("hours", L), R("minutes", ae), e.enableSeconds && R("seconds", oe);
    }
  }, w = (N, Q) => {
    const L = {
      hours: Array.isArray(t.hours) ? t.hours[N] : t.hours,
      disabledArr: []
    };
    return (Q || Q === 0) && (L.hours = Q), Array.isArray(e.disabledTimes) && (L.disabledArr = a.value.enabled && Array.isArray(e.disabledTimes[N]) ? e.disabledTimes[N] : e.disabledTimes), L;
  }, F = computed(() => (N, Q) => {
    var L;
    if (Array.isArray(e.disabledTimes)) {
      const { disabledArr: ae, hours: oe } = w(N, Q), A = ae.filter((U) => +U.hours === oe);
      return ((L = A[0]) == null ? void 0 : L.minutes) === "*" ? { hours: [oe], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (A == null ? void 0 : A.map((U) => +U.minutes)) ?? [],
        seconds: (A == null ? void 0 : A.map((U) => U.seconds ? +U.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: R,
    updateHours: p,
    updateMinutes: Y,
    updateSeconds: j,
    getSetDateTime: r,
    updateTimeValues: $,
    getSecondsValue: c,
    assignStartTime: B,
    validateTime: h2,
    disabledTimesConfig: F
  };
};
var br = (e, t) => {
  const { modelValue: l, time: n } = Xt(e, t), { defaultedStartTime: a, defaultedRange: f } = Pe(e), { updateTimeValues: c, getSetDateTime: r, setTime: R, assignStartTime: I, disabledTimesConfig: h2, validateTime: k } = Ln(e, n, l, p);
  function p() {
    t("update-flow-step");
  }
  const Y = (L) => {
    const { hours: ae, minutes: oe, seconds: A } = L;
    return { hours: +ae, minutes: +oe, seconds: A ? +A : 0 };
  }, j = () => {
    if (e.startTime) {
      if (Array.isArray(e.startTime)) {
        const ae = Y(e.startTime[0]), oe = Y(e.startTime[1]);
        return [set(K(), ae), set(K(), oe)];
      }
      const L = Y(e.startTime);
      return set(K(), L);
    }
    return f.value.enabled ? [null, null] : null;
  }, $ = () => {
    if (f.value.enabled) {
      const [L, ae] = j();
      l.value = [r(L, 0), r(ae, 1)];
    } else
      l.value = r(j());
  }, B = (L) => Array.isArray(L) ? [Tt(K(L[0])), Tt(K(L[1]))] : [Tt(L ?? K())], w = (L, ae, oe) => {
    R("hours", L), R("minutes", ae), R("seconds", e.enableSeconds ? oe : 0);
  }, F = () => {
    const [L, ae] = B(l.value);
    return f.value.enabled ? w(
      [L.hours, ae.hours],
      [L.minutes, ae.minutes],
      [L.seconds, ae.seconds]
    ) : w(L.hours, L.minutes, L.seconds);
  };
  onMounted(() => {
    if (!e.shadow)
      return I(a.value), l.value ? F() : $();
  });
  const N = () => {
    Array.isArray(l.value) ? l.value = l.value.map((L, ae) => L && r(L, ae)) : l.value = r(l.value), t("time-update");
  };
  return {
    modelValue: l,
    time: n,
    disabledTimesConfig: h2,
    updateTime: (L, ae = true, oe = false) => {
      c(L, ae, oe, N);
    },
    validateTime: k
  };
};
var kr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePickerSolo",
  props: {
    ...at
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
    const n = l, a = e, f = useSlots(), c = Xe(f, "timePicker"), r = ref(null), { time: R, modelValue: I, disabledTimesConfig: h2, updateTime: k, validateTime: p } = br(a, n);
    return onMounted(() => {
      a.shadow || n("mount", null);
    }), t({ getSidebarProps: () => ({
      modelValue: I,
      time: R,
      updateTime: k
    }), toggleTimePicker: ($, B = false, w = "") => {
      var F;
      (F = r.value) == null || F.toggleTimePicker($, B, w);
    } }), ($, B) => (openBlock(), createBlock(da, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(() => [
        createVNode(Fn, mergeProps({
          ref_key: "tpRef",
          ref: r
        }, $.$props, {
          hours: unref(R).hours,
          minutes: unref(R).minutes,
          seconds: unref(R).seconds,
          "internal-model-value": $.internalModelValue,
          "disabled-times-config": unref(h2),
          "validate-time": unref(p),
          "onUpdate:hours": B[0] || (B[0] = (w) => unref(k)(w)),
          "onUpdate:minutes": B[1] || (B[1] = (w) => unref(k)(w, false)),
          "onUpdate:seconds": B[2] || (B[2] = (w) => unref(k)(w, false, true)),
          onAmPmChange: B[3] || (B[3] = (w) => $.$emit("am-pm-change", w)),
          onResetFlow: B[4] || (B[4] = (w) => $.$emit("reset-flow")),
          onOverlayClosed: B[5] || (B[5] = (w) => $.$emit("overlay-toggle", { open: false, overlay: w })),
          onOverlayOpened: B[6] || (B[6] = (w) => $.$emit("overlay-toggle", { open: true, overlay: w }))
        }), createSlots({ _: 2 }, [
          renderList(unref(c), (w, F) => ({
            name: w,
            fn: withCtx((N) => [
              renderSlot($.$slots, w, normalizeProps(guardReactiveProps(N)))
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
var Ar = ["aria-label", "data-test", "onClick", "onKeydown"];
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
    ...at
  },
  emits: ["update-month-year", "mount", "reset-flow", "overlay-closed", "overlay-opened"],
  setup(e, { expose: t, emit: l }) {
    const n = l, a = e, {
      defaultedTransitions: f,
      defaultedAriaLabels: c,
      defaultedMultiCalendars: r,
      defaultedFilters: R,
      defaultedConfig: I,
      defaultedHighlight: h2,
      propDates: k
    } = Pe(a), { transitionName: p, showTransition: Y } = qt(f), { buildMatrix: j } = ht(), { handleMonthYearChange: $, isDisabled: B, updateMonthYear: w } = Ul(a, n), { showLeftIcon: F, showRightIcon: N } = fa(), Q = ref(false), L = ref(false), ae = ref([null, null, null, null]);
    onMounted(() => {
      n("mount");
    });
    const oe = (D) => ({
      get: () => a[D],
      set: (M) => {
        const V = D === et.month ? et.year : et.month;
        n("update-month-year", { [D]: M, [V]: a[V] }), D === et.month ? H(true) : C(true);
      }
    }), A = computed(oe(et.month)), U = computed(oe(et.year)), Z = computed(() => (D) => ({
      month: a.month,
      year: a.year,
      items: D === et.month ? a.months : a.years,
      instance: a.instance,
      updateMonthYear: w,
      toggle: D === et.month ? H : C
    })), le = computed(() => {
      const D = a.months.find((M) => M.value === a.month);
      return D || { text: "", value: 0 };
    }), O = computed(() => Bt(a.months, (D) => {
      const M = a.month === D.value, V = Kt(
        D.value,
        An(a.year, k.value.minDate),
        Tn(a.year, k.value.maxDate)
      ) || R.value.months.includes(D.value), u = _n(h2.value, D.value, a.year);
      return { active: M, disabled: V, highlighted: u };
    })), z = computed(() => Bt(a.years, (D) => {
      const M = a.year === D.value, V = Kt(
        D.value,
        Yt(k.value.minDate),
        Yt(k.value.maxDate)
      ) || R.value.years.includes(D.value), u = Ka(h2.value, D.value);
      return { active: M, disabled: V, highlighted: u };
    })), re = (D, M, V) => {
      V !== void 0 ? D.value = V : D.value = !D.value, D.value ? n("overlay-opened", M) : n("overlay-closed", M);
    }, H = (D = false, M) => {
      v(D), re(Q, He.month, M);
    }, C = (D = false, M) => {
      v(D), re(L, He.year, M);
    }, v = (D) => {
      D || n("reset-flow");
    }, d = (D, M) => {
      a.arrowNavigation && (ae.value[M] = Ye(D), j(ae.value, "monthYear"));
    }, X = computed(() => {
      var D, M;
      return [
        {
          type: et.month,
          index: 1,
          toggle: H,
          modelValue: A.value,
          updateModelValue: (V) => A.value = V,
          text: le.value.text,
          showSelectionGrid: Q.value,
          items: O.value,
          ariaLabel: (D = c.value) == null ? void 0 : D.openMonthsOverlay
        },
        {
          type: et.year,
          index: 2,
          toggle: C,
          modelValue: U.value,
          updateModelValue: (V) => U.value = V,
          text: $n(a.year, a.locale),
          showSelectionGrid: L.value,
          items: z.value,
          ariaLabel: (M = c.value) == null ? void 0 : M.openYearsOverlay
        }
      ];
    }), ue = computed(() => a.disableYearSelect ? [X.value[0]] : a.yearFirst ? [...X.value].reverse() : X.value);
    return t({
      toggleMonthPicker: H,
      toggleYearPicker: C,
      handleMonthYearChange: $
    }), (D, M) => {
      var V, u, _;
      return openBlock(), createElementBlock("div", wr, [
        D.$slots["month-year"] ? (openBlock(), createElementBlock("div", Dr, [
          renderSlot(D.$slots, "month-year", normalizeProps(guardReactiveProps({ month: e.month, year: e.year, months: e.months, years: e.years, updateMonthYear: unref(w), handleMonthYearChange: unref($), instance: e.instance })))
        ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          D.$slots["top-extra"] ? (openBlock(), createElementBlock("div", Mr, [
            renderSlot(D.$slots, "top-extra", { value: D.internalModelValue })
          ])) : createCommentVNode("", true),
          createBaseVNode("div", $r, [
            unref(F)(unref(r), e.instance) && !D.vertical ? (openBlock(), createBlock(zt, {
              key: 0,
              "aria-label": (V = unref(c)) == null ? void 0 : V.prevMonth,
              disabled: unref(B)(false),
              onActivate: M[0] || (M[0] = (T) => unref($)(false, true)),
              onSetRef: M[1] || (M[1] = (T) => d(T, 0))
            }, {
              default: withCtx(() => [
                D.$slots["arrow-left"] ? renderSlot(D.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                D.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ea), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass(["dp__month_year_wrap", {
                dp__year_disable_select: D.disableYearSelect
              }])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(ue.value, (T, ce) => (openBlock(), createElementBlock(Fragment, {
                key: T.type
              }, [
                createBaseVNode("button", {
                  ref_for: true,
                  ref: (i) => d(i, ce + 1),
                  type: "button",
                  class: "dp__btn dp__month_year_select",
                  tabindex: "0",
                  "aria-label": T.ariaLabel,
                  "data-test": `${T.type}-toggle-overlay-${e.instance}`,
                  onClick: T.toggle,
                  onKeydown: (i) => unref(Qe)(i, () => T.toggle(), true)
                }, [
                  D.$slots[T.type] ? renderSlot(D.$slots, T.type, {
                    key: 0,
                    text: T.text,
                    value: a[T.type]
                  }) : createCommentVNode("", true),
                  D.$slots[T.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(T.text), 1)
                  ], 64))
                ], 40, Ar),
                createVNode(Transition, {
                  name: unref(p)(T.showSelectionGrid),
                  css: unref(Y)
                }, {
                  default: withCtx(() => [
                    T.showSelectionGrid ? (openBlock(), createBlock(Qt, {
                      key: 0,
                      items: T.items,
                      "arrow-navigation": D.arrowNavigation,
                      "hide-navigation": D.hideNavigation,
                      "is-last": D.autoApply && !unref(I).keepActionRow,
                      "skip-button-ref": false,
                      config: D.config,
                      type: T.type,
                      "header-refs": [],
                      "esc-close": D.escClose,
                      "menu-wrap-ref": D.menuWrapRef,
                      "text-input": D.textInput,
                      "aria-labels": D.ariaLabels,
                      onSelected: T.updateModelValue,
                      onToggle: T.toggle
                    }, createSlots({
                      "button-icon": withCtx(() => [
                        D.$slots["calendar-icon"] ? renderSlot(D.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        D.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Nt), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      D.$slots[`${T.type}-overlay-value`] ? {
                        name: "item",
                        fn: withCtx(({ item: i }) => [
                          renderSlot(D.$slots, `${T.type}-overlay-value`, {
                            text: i.text,
                            value: i.value
                          })
                        ]),
                        key: "0"
                      } : void 0,
                      D.$slots[`${T.type}-overlay`] ? {
                        name: "overlay",
                        fn: withCtx(() => [
                          renderSlot(D.$slots, `${T.type}-overlay`, mergeProps({ ref_for: true }, Z.value(T.type)))
                        ]),
                        key: "1"
                      } : void 0,
                      D.$slots[`${T.type}-overlay-header`] ? {
                        name: "header",
                        fn: withCtx(() => [
                          renderSlot(D.$slots, `${T.type}-overlay-header`, {
                            toggle: T.toggle
                          })
                        ]),
                        key: "2"
                      } : void 0
                    ]), 1032, ["items", "arrow-navigation", "hide-navigation", "is-last", "config", "type", "esc-close", "menu-wrap-ref", "text-input", "aria-labels", "onSelected", "onToggle"])) : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1032, ["name", "css"])
              ], 64))), 128))
            ], 2),
            unref(F)(unref(r), e.instance) && D.vertical ? (openBlock(), createBlock(zt, {
              key: 1,
              "aria-label": (u = unref(c)) == null ? void 0 : u.prevMonth,
              disabled: unref(B)(false),
              onActivate: M[2] || (M[2] = (T) => unref($)(false, true))
            }, {
              default: withCtx(() => [
                D.$slots["arrow-up"] ? renderSlot(D.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                D.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ha), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
            unref(N)(unref(r), e.instance) ? (openBlock(), createBlock(zt, {
              key: 2,
              ref: "rightIcon",
              disabled: unref(B)(true),
              "aria-label": (_ = unref(c)) == null ? void 0 : _.nextMonth,
              onActivate: M[3] || (M[3] = (T) => unref($)(true, true)),
              onSetRef: M[4] || (M[4] = (T) => d(T, D.disableYearSelect ? 2 : 3))
            }, {
              default: withCtx(() => [
                D.$slots[D.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(D.$slots, D.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
                D.$slots[D.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(D.vertical ? unref(za) : unref(Fa)), { key: 1 }))
              ]),
              _: 3
            }, 8, ["disabled", "aria-label"])) : createCommentVNode("", true)
          ])
        ], 64))
      ]);
    };
  }
});
var Sr = ["aria-label"];
var Rr = {
  class: "dp__calendar_header",
  role: "row"
};
var Pr = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
};
var Cr = ["aria-label"];
var _r = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1);
var Or = ["aria-label"];
var Br = {
  key: 0,
  role: "gridcell",
  class: "dp__calendar_item dp__week_num"
};
var Yr = { class: "dp__cell_inner" };
var Ir = ["id", "aria-selected", "aria-disabled", "aria-label", "data-test", "onClick", "onKeydown", "onMouseenter", "onMouseleave", "onMousedown"];
var Nr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DpCalendar",
  props: {
    mappedDates: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    ...at
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
    const n = l, a = e, { buildMultiLevelMatrix: f } = ht(), {
      defaultedTransitions: c,
      defaultedConfig: r,
      defaultedAriaLabels: R,
      defaultedMultiCalendars: I,
      defaultedWeekNumbers: h2,
      defaultedMultiDates: k
    } = Pe(a), p = ref(null), Y = ref({
      bottom: "",
      left: "",
      transform: ""
    }), j = ref([]), $ = ref(null), B = ref(true), w = ref(""), F = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), N = ref([]), Q = ref({ left: "50%" }), L = ref(false), ae = computed(() => a.calendar ? a.calendar(a.mappedDates) : a.mappedDates), oe = computed(() => a.dayNames ? Array.isArray(a.dayNames) ? a.dayNames : a.dayNames(a.locale, +a.weekStart) : fl(a.formatLocale, a.locale, +a.weekStart));
    onMounted(() => {
      n("mount", { cmp: "calendar", refs: j }), r.value.noSwipe || $.value && ($.value.addEventListener("touchstart", d, { passive: false }), $.value.addEventListener("touchend", X, { passive: false }), $.value.addEventListener("touchmove", ue, { passive: false })), a.monthChangeOnScroll && $.value && $.value.addEventListener("wheel", V, { passive: false });
    });
    const A = (b) => b ? a.vertical ? "vNext" : "next" : a.vertical ? "vPrevious" : "previous", U = (b, de) => {
      if (a.transitions) {
        const $e = je(it(K(), a.month, a.year));
        w.value = Oe(je(it(K(), b, de)), $e) ? c.value[A(true)] : c.value[A(false)], B.value = false, nextTick(() => {
          B.value = true;
        });
      }
    }, Z = computed(
      () => ({
        [a.calendarClassName]: !!a.calendarClassName
      })
    ), le = computed(() => (b) => {
      const de = ml(b);
      return {
        dp__marker_dot: de.type === "dot",
        dp__marker_line: de.type === "line"
      };
    }), O = computed(() => (b) => he(b, p.value)), z = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: I.value.count > 0 && a.instance !== 0
    })), re = computed(() => (b) => a.hideOffsetDates ? b.current : true), H = async (b, de, $e) => {
      const o = Ye(j.value[de][$e]);
      if (o) {
        const { width: E, height: ee } = o.getBoundingClientRect();
        p.value = b.value;
        let P = { left: `${E / 2}px` }, se = -50;
        if (await nextTick(), N.value[0]) {
          const { left: y, width: G } = N.value[0].getBoundingClientRect();
          y < 0 && (P = { left: "0" }, se = 0, Q.value.left = `${E / 2}px`), window.innerWidth < y + G && (P = { right: "0" }, se = 0, Q.value.left = `${G - E / 2}px`);
        }
        Y.value = {
          bottom: `${ee}px`,
          ...P,
          transform: `translateX(${se}%)`
        }, n("tooltip-open", b.marker);
      }
    }, C = async (b, de, $e) => {
      var o, E;
      if (L.value && k.value.enabled && k.value.dragSelect)
        return n("select-date", b);
      n("set-hover-date", b), (E = (o = b.marker) == null ? void 0 : o.tooltip) != null && E.length && await H(b, de, $e);
    }, v = (b) => {
      p.value && (p.value = null, Y.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), n("tooltip-close", b.marker));
    }, d = (b) => {
      F.value.startX = b.changedTouches[0].screenX, F.value.startY = b.changedTouches[0].screenY;
    }, X = (b) => {
      F.value.endX = b.changedTouches[0].screenX, F.value.endY = b.changedTouches[0].screenY, D();
    }, ue = (b) => {
      a.vertical && !a.inline && b.preventDefault();
    }, D = () => {
      const b = a.vertical ? "Y" : "X";
      Math.abs(F.value[`start${b}`] - F.value[`end${b}`]) > 10 && n("handle-swipe", F.value[`start${b}`] > F.value[`end${b}`] ? "right" : "left");
    }, M = (b, de, $e) => {
      b && (Array.isArray(j.value[de]) ? j.value[de][$e] = b : j.value[de] = [b]), a.arrowNavigation && f(j.value, "calendar");
    }, V = (b) => {
      a.monthChangeOnScroll && (b.preventDefault(), n("handle-scroll", b));
    }, u = (b) => h2.value.type === "local" ? getWeek(b.value, { weekStartsOn: +a.weekStart }) : h2.value.type === "iso" ? getISOWeek(b.value) : typeof h2.value.type == "function" ? h2.value.type(b.value) : "", _ = (b) => {
      const de = b[0];
      return h2.value.hideOnOffsetDates ? b.some(($e) => $e.current) ? u(de) : "" : u(de);
    }, T = (b, de) => {
      k.value.enabled || (gt(b, r.value), n("select-date", de));
    }, ce = (b) => {
      gt(b, r.value);
    }, i = (b) => {
      k.value.enabled && k.value.dragSelect ? (L.value = true, n("select-date", b)) : k.value.enabled && n("select-date", b);
    };
    return t({ triggerTransition: U }), (b, de) => {
      var $e;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(z.value)
      }, [
        createBaseVNode("div", {
          ref_key: "calendarWrapRef",
          ref: $,
          role: "grid",
          class: normalizeClass(Z.value),
          "aria-label": ($e = unref(R)) == null ? void 0 : $e.calendarWrap
        }, [
          createBaseVNode("div", Rr, [
            b.weekNumbers ? (openBlock(), createElementBlock("div", Pr, toDisplayString(b.weekNumName), 1)) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(oe.value, (o, E) => {
              var ee, P;
              return openBlock(), createElementBlock("div", {
                key: E,
                class: "dp__calendar_header_item",
                role: "gridcell",
                "data-test": "calendar-header",
                "aria-label": (P = (ee = unref(R)) == null ? void 0 : ee.weekDay) == null ? void 0 : P.call(ee, E)
              }, [
                b.$slots["calendar-header"] ? renderSlot(b.$slots, "calendar-header", {
                  key: 0,
                  day: o,
                  index: E
                }) : createCommentVNode("", true),
                b.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(o), 1)
                ], 64))
              ], 8, Cr);
            }), 128))
          ]),
          _r,
          createVNode(Transition, {
            name: w.value,
            css: !!b.transitions
          }, {
            default: withCtx(() => {
              var o;
              return [
                B.value ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "dp__calendar",
                  role: "rowgroup",
                  "aria-label": ((o = unref(R)) == null ? void 0 : o.calendarDays) || void 0,
                  onMouseleave: de[1] || (de[1] = (E) => L.value = false)
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(ae.value, (E, ee) => (openBlock(), createElementBlock("div", {
                    key: ee,
                    class: "dp__calendar_row",
                    role: "row"
                  }, [
                    b.weekNumbers ? (openBlock(), createElementBlock("div", Br, [
                      createBaseVNode("div", Yr, toDisplayString(_(E.days)), 1)
                    ])) : createCommentVNode("", true),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(E.days, (P, se) => {
                      var y, G, we;
                      return openBlock(), createElementBlock("div", {
                        id: unref(On)(P.value),
                        ref_for: true,
                        ref: (ve) => M(ve, ee, se),
                        key: se + ee,
                        role: "gridcell",
                        class: "dp__calendar_item",
                        "aria-selected": (P.classData.dp__active_date || P.classData.dp__range_start || P.classData.dp__range_start) ?? void 0,
                        "aria-disabled": P.classData.dp__cell_disabled || void 0,
                        "aria-label": (G = (y = unref(R)) == null ? void 0 : y.day) == null ? void 0 : G.call(y, P),
                        tabindex: "0",
                        "data-test": P.value,
                        onClick: withModifiers((ve) => T(ve, P), ["prevent"]),
                        onKeydown: (ve) => unref(Qe)(ve, () => b.$emit("select-date", P)),
                        onMouseenter: (ve) => C(P, ee, se),
                        onMouseleave: (ve) => v(P),
                        onMousedown: (ve) => i(P),
                        onMouseup: de[0] || (de[0] = (ve) => L.value = false)
                      }, [
                        createBaseVNode("div", {
                          class: normalizeClass(["dp__cell_inner", P.classData])
                        }, [
                          b.$slots.day && re.value(P) ? renderSlot(b.$slots, "day", {
                            key: 0,
                            day: +P.text,
                            date: P.value
                          }) : createCommentVNode("", true),
                          b.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                            createTextVNode(toDisplayString(P.text), 1)
                          ], 64)),
                          P.marker && re.value(P) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                            b.$slots.marker ? renderSlot(b.$slots, "marker", {
                              key: 0,
                              marker: P.marker,
                              day: +P.text,
                              date: P.value
                            }) : (openBlock(), createElementBlock("div", {
                              key: 1,
                              class: normalizeClass(le.value(P.marker)),
                              style: normalizeStyle(P.marker.color ? { backgroundColor: P.marker.color } : {})
                            }, null, 6))
                          ], 64)) : createCommentVNode("", true),
                          O.value(P.value) ? (openBlock(), createElementBlock("div", {
                            key: 3,
                            ref_for: true,
                            ref_key: "activeTooltip",
                            ref: N,
                            class: "dp__marker_tooltip",
                            style: normalizeStyle(Y.value)
                          }, [
                            (we = P.marker) != null && we.tooltip ? (openBlock(), createElementBlock("div", {
                              key: 0,
                              class: "dp__tooltip_content",
                              onClick: ce
                            }, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(P.marker.tooltip, (ve, Ke) => (openBlock(), createElementBlock("div", {
                                key: Ke,
                                class: "dp__tooltip_text"
                              }, [
                                b.$slots["marker-tooltip"] ? renderSlot(b.$slots, "marker-tooltip", {
                                  key: 0,
                                  tooltip: ve,
                                  day: P.value
                                }) : createCommentVNode("", true),
                                b.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                  createBaseVNode("div", {
                                    class: "dp__tooltip_mark",
                                    style: normalizeStyle(ve.color ? { backgroundColor: ve.color } : {})
                                  }, null, 4),
                                  createBaseVNode("div", null, toDisplayString(ve.text), 1)
                                ], 64))
                              ]))), 128)),
                              createBaseVNode("div", {
                                class: "dp__arrow_bottom_tp",
                                style: normalizeStyle(Q.value)
                              }, null, 4)
                            ])) : createCommentVNode("", true)
                          ], 4)) : createCommentVNode("", true)
                        ], 2)
                      ], 40, Ir);
                    }), 128))
                  ]))), 128))
                ], 40, Or)) : createCommentVNode("", true)
              ];
            }),
            _: 3
          }, 8, ["name", "css"])
        ], 10, Sr)
      ], 2);
    };
  }
});
var un = (e) => Array.isArray(e);
var Er = (e, t, l, n) => {
  const a = ref([]), f = ref(/* @__PURE__ */ new Date()), c = ref(), { modelValue: r, calendars: R, time: I, today: h2 } = Xt(e, t), {
    defaultedMultiCalendars: k,
    defaultedStartTime: p,
    defaultedRange: Y,
    defaultedConfig: j,
    defaultedTz: $,
    propDates: B,
    defaultedMultiDates: w
  } = Pe(e), { validateMonthYearInRange: F, isDisabled: N, isDateRangeAllowed: Q, checkMinMaxRange: L } = bt(e), { updateTimeValues: ae, getSetDateTime: oe, setTime: A, assignStartTime: U, validateTime: Z, disabledTimesConfig: le } = Ln(e, I, r, n), O = computed(
    () => (g) => R.value[g] ? R.value[g].month : 0
  ), z = computed(
    () => (g) => R.value[g] ? R.value[g].year : 0
  ), re = (g) => !j.value.keepViewOnOffsetClick || g ? true : !c.value, H = (g, m, W, ne = false) => {
    var Me, Ee;
    re(ne) && (R.value[g] || (R.value[g] = { month: 0, year: 0 }), R.value[g].month = nn(m) ? (Me = R.value[g]) == null ? void 0 : Me.month : m, R.value[g].year = nn(W) ? (Ee = R.value[g]) == null ? void 0 : Ee.year : W);
  }, C = () => {
    e.autoApply && t("select-date");
  };
  watch(
    r,
    (g, m) => {
      JSON.stringify(g) !== JSON.stringify(m) && X();
    },
    { deep: true }
  ), onMounted(() => {
    e.shadow || (r.value || (de(), p.value && U(p.value)), X(true), e.focusStartDate && e.startDate && de());
  });
  const v = computed(() => {
    var g;
    return (g = e.flow) != null && g.length && !e.partialFlow ? e.flowStep === e.flow.length : true;
  }), d = () => {
    e.autoApply && v.value && t("auto-apply");
  }, X = (g = false) => {
    if (r.value)
      return Array.isArray(r.value) ? (a.value = r.value, T(g)) : M(r.value, g);
    if (k.value.count && g && !e.startDate)
      return D(K(), g);
  }, ue = () => Array.isArray(r.value) && Y.value.enabled ? getMonth(r.value[0]) === getMonth(r.value[1] ?? r.value[0]) : false, D = (g, m = false) => {
    if ((!k.value.count || !k.value.static || m) && H(0, getMonth(g), getYear(g)), k.value.count && (!k.value.solo || !r.value || ue()))
      for (let W = 1; W < k.value.count; W++) {
        const ne = set(K(), { month: O.value(W - 1), year: z.value(W - 1) }), Me = add(ne, { months: 1 });
        R.value[W] = { month: getMonth(Me), year: getYear(Me) };
      }
  }, M = (g, m) => {
    D(g), A("hours", getHours(g)), A("minutes", getMinutes(g)), A("seconds", getSeconds(g)), k.value.count && m && b();
  }, V = (g) => {
    if (k.value.count) {
      if (k.value.solo)
        return 0;
      const m = getMonth(g[0]), W = getMonth(g[1]);
      return Math.abs(W - m) < k.value.count ? 0 : 1;
    }
    return 1;
  }, u = (g, m) => {
    g[1] && Y.value.showLastInRange ? D(g[V(g)], m) : D(g[0], m);
    const W = (ne, Me) => [
      ne(g[0]),
      g[1] ? ne(g[1]) : I[Me][1]
    ];
    A("hours", W(getHours, "hours")), A("minutes", W(getMinutes, "minutes")), A("seconds", W(getSeconds, "seconds"));
  }, _ = (g, m) => {
    if ((Y.value.enabled || e.weekPicker) && !w.value.enabled)
      return u(g, m);
    if (w.value.enabled && m) {
      const W = g[g.length - 1];
      return M(W, m);
    }
  }, T = (g) => {
    const m = r.value;
    _(m, g), k.value.count && k.value.solo && b();
  }, ce = (g, m) => {
    const W = set(K(), { month: O.value(m), year: z.value(m) }), ne = g < 0 ? addMonths(W, 1) : subMonths(W, 1);
    F(getMonth(ne), getYear(ne), g < 0, e.preventMinMaxNavigation) && (H(m, getMonth(ne), getYear(ne)), t("update-month-year", { instance: m, month: getMonth(ne), year: getYear(ne) }), k.value.count && !k.value.solo && i(m), l());
  }, i = (g) => {
    for (let m = g - 1; m >= 0; m--) {
      const W = subMonths(set(K(), { month: O.value(m + 1), year: z.value(m + 1) }), 1);
      H(m, getMonth(W), getYear(W));
    }
    for (let m = g + 1; m <= k.value.count - 1; m++) {
      const W = addMonths(set(K(), { month: O.value(m - 1), year: z.value(m - 1) }), 1);
      H(m, getMonth(W), getYear(W));
    }
  }, b = () => {
    if (Array.isArray(r.value) && r.value.length === 2) {
      const g = K(
        K(r.value[1] ? r.value[1] : addMonths(r.value[0], 1))
      ), [m, W] = [getMonth(r.value[0]), getYear(r.value[0])], [ne, Me] = [getMonth(r.value[1]), getYear(r.value[1])];
      (m !== ne || m === ne && W !== Me) && k.value.solo && H(1, getMonth(g), getYear(g));
    } else
      r.value && !Array.isArray(r.value) && (H(0, getMonth(r.value), getYear(r.value)), D(K()));
  }, de = () => {
    e.startDate && (H(0, getMonth(K(e.startDate)), getYear(K(e.startDate))), k.value.count && i(0));
  }, $e = (g, m) => {
    if (e.monthChangeOnScroll) {
      const W = (/* @__PURE__ */ new Date()).getTime() - f.value.getTime(), ne = Math.abs(g.deltaY);
      let Me = 500;
      ne > 1 && (Me = 100), ne > 100 && (Me = 0), W > Me && (f.value = /* @__PURE__ */ new Date(), ce(e.monthChangeOnScroll !== "inverse" ? -g.deltaY : g.deltaY, m));
    }
  }, o = (g, m, W = false) => {
    e.monthChangeOnArrows && e.vertical === W && E(g, m);
  }, E = (g, m) => {
    ce(g === "right" ? -1 : 1, m);
  }, ee = (g) => {
    if (B.value.markers)
      return ra(g.value, B.value.markers);
  }, P = (g, m) => {
    switch (e.sixWeeks === true ? "append" : e.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [g == 0, true];
      case "fair":
        return [g == 0 || m > g, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, se = (g, m, W, ne) => {
    if (e.sixWeeks && g.length < 6) {
      const Me = 6 - g.length, Ee = (m.getDay() + 7 - ne) % 7, Zt = 6 - (W.getDay() + 7 - ne) % 7, [Lt, ka] = P(Ee, Zt);
      for (let wt = 1; wt <= Me; wt++)
        if (ka ? !!(wt % 2) == Lt : Lt) {
          const xt = g[0].days[0], wa = y(addDays(xt.value, -7), getMonth(m));
          g.unshift({ days: wa });
        } else {
          const xt = g[g.length - 1], wa = xt.days[xt.days.length - 1], zn = y(addDays(wa.value, 1), getMonth(m));
          g.push({ days: zn });
        }
    }
    return g;
  }, y = (g, m) => {
    const W = K(g), ne = [];
    for (let Me = 0; Me < 7; Me++) {
      const Ee = addDays(W, Me), kt = getMonth(Ee) !== m;
      ne.push({
        text: e.hideOffsetDates && kt ? "" : Ee.getDate(),
        value: Ee,
        current: !kt,
        classData: {}
      });
    }
    return ne;
  }, G = (g, m) => {
    const W = [], ne = new Date(m, g), Me = new Date(m, g + 1, 0), Ee = e.weekStart, kt = startOfWeek(ne, { weekStartsOn: Ee }), Zt = (Lt) => {
      const ka = y(Lt, g);
      if (W.push({ days: ka }), !W[W.length - 1].days.some(
        (wt) => he(je(wt.value), je(Me))
      )) {
        const wt = addDays(Lt, 7);
        Zt(wt);
      }
    };
    return Zt(kt), se(W, ne, Me, Ee);
  }, we = (g) => {
    const m = yt(K(g.value), I.hours, I.minutes, qe());
    t("date-update", m), w.value.enabled ? Ga(m, r, w.value.limit) : r.value = m, n(), nextTick().then(() => {
      d();
    });
  }, ve = (g) => Y.value.noDisabledRange ? Sn(a.value[0], g).some((W) => N(W)) : false, Ke = () => {
    a.value = r.value ? r.value.slice() : [], a.value.length === 2 && !(Y.value.fixedStart || Y.value.fixedEnd) && (a.value = []);
  }, fe = (g, m) => {
    const W = [
      K(g.value),
      addDays(K(g.value), +Y.value.autoRange)
    ];
    Q(W) ? (m && ft(g.value), a.value = W) : t("invalid-date", g.value);
  }, ft = (g) => {
    const m = getMonth(K(g)), W = getYear(K(g));
    if (H(0, m, W), k.value.count > 0)
      for (let ne = 1; ne < k.value.count; ne++) {
        const Me = Dl(
          set(K(g), { year: O.value(ne - 1), month: z.value(ne - 1) })
        );
        H(ne, Me.month, Me.year);
      }
  }, nt = (g) => {
    if (ve(g.value) || !L(g.value, r.value, Y.value.fixedStart ? 0 : 1))
      return t("invalid-date", g.value);
    a.value = Nn(K(g.value), r, t, Y);
  }, Et = (g, m) => {
    if (Ke(), Y.value.autoRange)
      return fe(g, m);
    if (Y.value.fixedStart || Y.value.fixedEnd)
      return nt(g);
    a.value[0] ? L(K(g.value), r.value) && !ve(g.value) ? Ce(K(g.value), K(a.value[0])) ? (a.value.unshift(K(g.value)), t("range-end", a.value[0])) : (a.value[1] = K(g.value), t("range-end", a.value[1])) : (e.autoApply && t("auto-apply-invalid", g.value), t("invalid-date", g.value)) : (a.value[0] = K(g.value), t("range-start", a.value[0]));
  }, qe = (g = true) => e.enableSeconds ? Array.isArray(I.seconds) ? g ? I.seconds[0] : I.seconds[1] : I.seconds : 0, Ft = (g) => {
    a.value[g] = yt(
      a.value[g],
      I.hours[g],
      I.minutes[g],
      qe(g !== 1)
    );
  }, va = () => {
    var g, m;
    a.value[0] && a.value[1] && +((g = a.value) == null ? void 0 : g[0]) > +((m = a.value) == null ? void 0 : m[1]) && (a.value.reverse(), t("range-start", a.value[0]), t("range-end", a.value[1]));
  }, Jt = () => {
    a.value.length && (a.value[0] && !a.value[1] ? Ft(0) : (Ft(0), Ft(1), n()), va(), r.value = a.value.slice(), ca(a.value, t, e.autoApply, e.modelAuto));
  }, ma = (g, m = false) => {
    if (N(g.value) || !g.current && e.hideOffsetDates)
      return t("invalid-date", g.value);
    if (c.value = JSON.parse(JSON.stringify(g)), !Y.value.enabled)
      return we(g);
    un(I.hours) && un(I.minutes) && !w.value.enabled && (Et(g, m), Jt());
  }, ga = (g, m) => {
    var ne;
    H(g, m.month, m.year, true), k.value.count && !k.value.solo && i(g), t("update-month-year", { instance: g, month: m.month, year: m.year }), l(k.value.solo ? g : void 0);
    const W = (ne = e.flow) != null && ne.length ? e.flow[e.flowStep] : void 0;
    !m.fromNav && (W === He.month || W === He.year) && n();
  }, ya = (g, m) => {
    In({
      value: g,
      modelValue: r,
      range: Y.value.enabled,
      timezone: m ? void 0 : $.value.timezone
    }), C(), e.multiCalendars && nextTick().then(() => X(true));
  }, pa = () => {
    const g = Va(K(), $.value);
    Y.value.enabled ? r.value && Array.isArray(r.value) && r.value[0] ? r.value = Ce(g, r.value[0]) ? [g, r.value[0]] : [r.value[0], g] : r.value = [g] : r.value = g, C();
  }, ha = () => {
    if (Array.isArray(r.value))
      if (w.value.enabled) {
        const g = ba();
        r.value[r.value.length - 1] = oe(g);
      } else
        r.value = r.value.map((g, m) => g && oe(g, m));
    else
      r.value = oe(r.value);
    t("time-update");
  }, ba = () => Array.isArray(r.value) && r.value.length ? r.value[r.value.length - 1] : null;
  return {
    calendars: R,
    modelValue: r,
    month: O,
    year: z,
    time: I,
    disabledTimesConfig: le,
    today: h2,
    validateTime: Z,
    getCalendarDays: G,
    getMarker: ee,
    handleScroll: $e,
    handleSwipe: E,
    handleArrow: o,
    selectDate: ma,
    updateMonthYear: ga,
    presetDate: ya,
    selectCurrentDate: pa,
    updateTime: (g, m = true, W = false) => {
      ae(g, m, W, ha);
    }
  };
};
var Fr = { key: 0 };
var Lr = defineComponent({
  __name: "DatePicker",
  props: {
    ...at
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
    const n = l, a = e, {
      calendars: f,
      month: c,
      year: r,
      modelValue: R,
      time: I,
      disabledTimesConfig: h2,
      today: k,
      validateTime: p,
      getCalendarDays: Y,
      getMarker: j,
      handleArrow: $,
      handleScroll: B,
      handleSwipe: w,
      selectDate: F,
      updateMonthYear: N,
      presetDate: Q,
      selectCurrentDate: L,
      updateTime: ae
    } = Er(a, n, ue, D), oe = useSlots(), { setHoverDate: A, getDayClassData: U, clearHoverDate: Z } = to(R, a), { defaultedMultiCalendars: le } = Pe(a), O = ref([]), z = ref([]), re = ref(null), H = Xe(oe, "calendar"), C = Xe(oe, "monthYear"), v = Xe(oe, "timePicker"), d = (o) => {
      a.shadow || n("mount", o);
    };
    watch(
      f,
      () => {
        a.shadow || setTimeout(() => {
          n("recalculate-position");
        }, 0);
      },
      { deep: true }
    );
    const X = computed(() => (o) => Y(c.value(o), r.value(o)).map((E) => ({
      ...E,
      days: E.days.map((ee) => (ee.marker = j(ee), ee.classData = U(ee), ee))
    })));
    function ue(o) {
      var E;
      o || o === 0 ? (E = z.value[o]) == null || E.triggerTransition(c.value(o), r.value(o)) : z.value.forEach((ee, P) => ee.triggerTransition(c.value(P), r.value(P)));
    }
    function D() {
      n("update-flow-step");
    }
    const M = (o, E = false) => {
      F(o, E), a.spaceConfirm && n("select-date");
    }, V = (o, E, ee = 0) => {
      var P;
      (P = O.value[ee]) == null || P.toggleMonthPicker(o, E);
    }, u = (o, E, ee = 0) => {
      var P;
      (P = O.value[ee]) == null || P.toggleYearPicker(o, E);
    }, _ = (o, E, ee) => {
      var P;
      (P = re.value) == null || P.toggleTimePicker(o, E, ee);
    }, T = (o, E) => {
      var ee;
      if (!a.range) {
        const P = R.value ? R.value : k, se = E ? new Date(E) : P, y = o ? startOfWeek(se, { weekStartsOn: 1 }) : endOfWeek(se, { weekStartsOn: 1 });
        F({
          value: y,
          current: getMonth(se) === c.value(0),
          text: "",
          classData: {}
        }), (ee = document.getElementById(On(y))) == null || ee.focus();
      }
    }, ce = (o) => {
      var E;
      (E = O.value[0]) == null || E.handleMonthYearChange(o, true);
    }, i = (o) => {
      N(0, { month: c.value(0), year: r.value(0) + (o ? 1 : -1), fromNav: true });
    }, b = (o, E) => {
      o === He.time && n(`time-picker-${E ? "open" : "close"}`), n("overlay-toggle", { open: E, overlay: o });
    }, de = (o) => {
      n("overlay-toggle", { open: false, overlay: o }), n("focus-menu");
    };
    return t({
      clearHoverDate: Z,
      presetDate: Q,
      selectCurrentDate: L,
      toggleMonthPicker: V,
      toggleYearPicker: u,
      toggleTimePicker: _,
      handleArrow: $,
      updateMonthYear: N,
      getSidebarProps: () => ({
        modelValue: R,
        month: c,
        year: r,
        time: I,
        updateTime: ae,
        updateMonthYear: N,
        selectDate: F,
        presetDate: Q
      }),
      changeMonth: ce,
      changeYear: i,
      selectWeekDate: T
    }), (o, E) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(da, {
        "multi-calendars": unref(le).count,
        collapse: o.collapse
      }, {
        default: withCtx(({ instance: ee, index: P }) => [
          o.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(Tr, mergeProps({
            key: 0,
            ref: (se) => {
              se && (O.value[P] = se);
            },
            months: unref(wn)(o.formatLocale, o.locale, o.monthNameFormat),
            years: unref(Wa)(o.yearRange, o.locale, o.reverseYears),
            month: unref(c)(ee),
            year: unref(r)(ee),
            instance: ee
          }, o.$props, {
            onMount: E[0] || (E[0] = (se) => d(unref(At).header)),
            onResetFlow: E[1] || (E[1] = (se) => o.$emit("reset-flow")),
            onUpdateMonthYear: (se) => unref(N)(ee, se),
            onOverlayClosed: de,
            onOverlayOpened: E[2] || (E[2] = (se) => o.$emit("overlay-toggle", { open: true, overlay: se }))
          }), createSlots({ _: 2 }, [
            renderList(unref(C), (se, y) => ({
              name: se,
              fn: withCtx((G) => [
                renderSlot(o.$slots, se, normalizeProps(guardReactiveProps(G)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(Nr, mergeProps({
            ref: (se) => {
              se && (z.value[P] = se);
            },
            "mapped-dates": X.value(ee),
            month: unref(c)(ee),
            year: unref(r)(ee),
            instance: ee
          }, o.$props, {
            onSelectDate: (se) => unref(F)(se, ee !== 1),
            onHandleSpace: (se) => M(se, ee !== 1),
            onSetHoverDate: E[3] || (E[3] = (se) => unref(A)(se)),
            onHandleScroll: (se) => unref(B)(se, ee),
            onHandleSwipe: (se) => unref(w)(se, ee),
            onMount: E[4] || (E[4] = (se) => d(unref(At).calendar)),
            onResetFlow: E[5] || (E[5] = (se) => o.$emit("reset-flow")),
            onTooltipOpen: E[6] || (E[6] = (se) => o.$emit("tooltip-open", se)),
            onTooltipClose: E[7] || (E[7] = (se) => o.$emit("tooltip-close", se))
          }), createSlots({ _: 2 }, [
            renderList(unref(H), (se, y) => ({
              name: se,
              fn: withCtx((G) => [
                renderSlot(o.$slots, se, normalizeProps(guardReactiveProps({ ...G })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "instance", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars", "collapse"]),
      o.enableTimePicker ? (openBlock(), createElementBlock("div", Fr, [
        o.$slots["time-picker"] ? renderSlot(o.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(I), updateTime: unref(ae) }))) : (openBlock(), createBlock(Fn, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: re
        }, o.$props, {
          hours: unref(I).hours,
          minutes: unref(I).minutes,
          seconds: unref(I).seconds,
          "internal-model-value": o.internalModelValue,
          "disabled-times-config": unref(h2),
          "validate-time": unref(p),
          onMount: E[8] || (E[8] = (ee) => d(unref(At).timePicker)),
          "onUpdate:hours": E[9] || (E[9] = (ee) => unref(ae)(ee)),
          "onUpdate:minutes": E[10] || (E[10] = (ee) => unref(ae)(ee, false)),
          "onUpdate:seconds": E[11] || (E[11] = (ee) => unref(ae)(ee, false, true)),
          onResetFlow: E[12] || (E[12] = (ee) => o.$emit("reset-flow")),
          onOverlayClosed: E[13] || (E[13] = (ee) => b(ee, false)),
          onOverlayOpened: E[14] || (E[14] = (ee) => b(ee, true)),
          onAmPmChange: E[15] || (E[15] = (ee) => o.$emit("am-pm-change", ee))
        }), createSlots({ _: 2 }, [
          renderList(unref(v), (ee, P) => ({
            name: ee,
            fn: withCtx((se) => [
              renderSlot(o.$slots, ee, normalizeProps(guardReactiveProps(se)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"]))
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var Hr = (e, t) => {
  const l = ref(), {
    defaultedMultiCalendars: n,
    defaultedConfig: a,
    defaultedHighlight: f,
    defaultedRange: c,
    propDates: r,
    defaultedFilters: R,
    defaultedMultiDates: I
  } = Pe(e), { modelValue: h2, year: k, month: p, calendars: Y } = Xt(e, t), { isDisabled: j } = bt(e), { selectYear: $, groupedYears: B, showYearPicker: w, isDisabled: F, toggleYearPicker: N, handleYearSelect: Q, handleYear: L } = En({
    modelValue: h2,
    multiCalendars: n,
    range: c,
    highlight: f,
    calendars: Y,
    propDates: r,
    month: p,
    year: k,
    filters: R,
    props: e,
    emit: t
  }), ae = (v, d) => [v, d].map((X) => format(X, "MMMM", { locale: e.formatLocale })).join("-"), oe = computed(() => (v) => h2.value ? Array.isArray(h2.value) ? h2.value.some((d) => isSameQuarter(v, d)) : isSameQuarter(h2.value, v) : false), A = (v) => {
    if (c.value.enabled) {
      if (Array.isArray(h2.value)) {
        const d = he(v, h2.value[0]) || he(v, h2.value[1]);
        return ua(h2.value, l.value, v) && !d;
      }
      return false;
    }
    return false;
  }, U = (v, d) => v.quarter === getQuarter(d) && v.year === getYear(d), Z = (v) => typeof f.value == "function" ? f.value({ quarter: getQuarter(v), year: getYear(v) }) : !!f.value.quarters.find((d) => U(d, v)), le = computed(() => (v) => {
    const d = set(/* @__PURE__ */ new Date(), { year: k.value(v) });
    return eachQuarterOfInterval({
      start: startOfYear(d),
      end: endOfYear(d)
    }).map((X) => {
      const ue = startOfQuarter(X), D = endOfQuarter(X), M = j(X), V = A(ue), u = Z(ue);
      return {
        text: ae(ue, D),
        value: ue,
        active: oe.value(ue),
        highlighted: u,
        disabled: M,
        isBetween: V
      };
    });
  }), O = (v) => {
    Ga(v, h2, I.value.limit), t("auto-apply", true);
  }, z = (v) => {
    h2.value = Qa(h2, v, t), ca(h2.value, t, e.autoApply, e.modelAuto);
  }, re = (v) => {
    h2.value = v, t("auto-apply");
  };
  return {
    defaultedConfig: a,
    defaultedMultiCalendars: n,
    groupedYears: B,
    year: k,
    isDisabled: F,
    quarters: le,
    showYearPicker: w,
    modelValue: h2,
    setHoverDate: (v) => {
      l.value = v;
    },
    selectYear: $,
    selectQuarter: (v, d, X) => {
      if (!X)
        return Y.value[d].month = getMonth(endOfQuarter(v)), I.value.enabled ? O(v) : c.value.enabled ? z(v) : re(v);
    },
    toggleYearPicker: N,
    handleYearSelect: Q,
    handleYear: L
  };
};
var zr = { class: "dp--quarter-items" };
var Vr = ["data-test", "disabled", "onClick", "onMouseover"];
var Wr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "QuarterPicker",
  props: {
    ...at
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
    const n = l, a = e, f = useSlots(), c = Xe(f, "yearMode"), {
      defaultedMultiCalendars: r,
      defaultedConfig: R,
      groupedYears: I,
      year: h2,
      isDisabled: k,
      quarters: p,
      modelValue: Y,
      showYearPicker: j,
      setHoverDate: $,
      selectQuarter: B,
      toggleYearPicker: w,
      handleYearSelect: F,
      handleYear: N
    } = Hr(a, n);
    return t({ getSidebarProps: () => ({
      modelValue: Y,
      year: h2,
      selectQuarter: B,
      handleYearSelect: F,
      handleYear: N
    }) }), (L, ae) => (openBlock(), createBlock(da, {
      "multi-calendars": unref(r).count,
      collapse: L.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: oe }) => [
        createBaseVNode("div", {
          class: "dp-quarter-picker-wrap",
          style: normalizeStyle({ minHeight: `${unref(R).modeHeight}px` })
        }, [
          L.$slots["top-extra"] ? renderSlot(L.$slots, "top-extra", {
            key: 0,
            value: L.internalModelValue
          }) : createCommentVNode("", true),
          createBaseVNode("div", null, [
            createVNode(Yn, mergeProps(L.$props, {
              items: unref(I)(oe),
              instance: oe,
              "show-year-picker": unref(j)[oe],
              year: unref(h2)(oe),
              "is-disabled": (A) => unref(k)(oe, A),
              onHandleYear: (A) => unref(N)(oe, A),
              onYearSelect: (A) => unref(F)(A, oe),
              onToggleYearPicker: (A) => unref(w)(oe, A == null ? void 0 : A.flow, A == null ? void 0 : A.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(c), (A, U) => ({
                name: A,
                fn: withCtx((Z) => [
                  renderSlot(L.$slots, A, normalizeProps(guardReactiveProps(Z)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          createBaseVNode("div", zr, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(p)(oe), (A, U) => (openBlock(), createElementBlock("div", { key: U }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass(["dp--qr-btn", {
                  "dp--qr-btn-active": A.active,
                  "dp--qr-btn-between": A.isBetween,
                  "dp--qr-btn-disabled": A.disabled,
                  "dp--highlighted": A.highlighted
                }]),
                "data-test": A.value,
                disabled: A.disabled,
                onClick: (Z) => unref(B)(A.value, oe, A.disabled),
                onMouseover: (Z) => unref($)(A.value)
              }, [
                L.$slots.quarter ? renderSlot(L.$slots, "quarter", {
                  key: 0,
                  value: A.value,
                  text: A.text
                }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(A.text), 1)
                ], 64))
              ], 42, Vr)
            ]))), 128))
          ])
        ], 4)
      ]),
      _: 3
    }, 8, ["multi-calendars", "collapse"]));
  }
});
var Ur = ["id", "aria-label"];
var jr = {
  key: 0,
  class: "dp--menu-load-container"
};
var Kr = createBaseVNode("span", { class: "dp--menu-loader" }, null, -1);
var Gr = [
  Kr
];
var Qr = {
  key: 0,
  class: "dp__sidebar_left"
};
var qr = ["data-test", "onClick", "onKeydown"];
var Xr = {
  key: 2,
  class: "dp__sidebar_right"
};
var Jr = {
  key: 3,
  class: "dp__action_extra"
};
var dn = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerMenu",
  props: {
    ...ia,
    shadow: { type: Boolean, default: false },
    openOnTop: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    noOverlayFocus: { type: Boolean, default: false },
    collapse: { type: Boolean, default: false },
    getInputRect: { type: Function, default: () => ({}) }
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
    const n = l, a = e, f = ref(null), c = computed(() => {
      const { openOnTop: y, ...G } = a;
      return {
        ...G,
        flowStep: A.value,
        collapse: a.collapse,
        noOverlayFocus: a.noOverlayFocus,
        menuWrapRef: f.value
      };
    }), { setMenuFocused: r, setShiftKey: R, control: I } = Bn(), h2 = useSlots(), { defaultedTextInput: k, defaultedInline: p, defaultedConfig: Y } = Pe(a), j = ref(null), $ = ref(0), B = ref(null), w = ref(false), F = ref(null);
    onMounted(() => {
      if (!a.shadow) {
        w.value = true, N(), window.addEventListener("resize", N);
        const y = Ye(f);
        if (y && !k.value.enabled && !p.value.enabled && (r(true), H()), y) {
          const G = (we) => {
            Y.value.allowPreventDefault && we.preventDefault(), gt(we, Y.value, true);
          };
          y.addEventListener("pointerdown", G), y.addEventListener("mousedown", G);
        }
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", N);
    });
    const N = () => {
      const y = Ye(B);
      y && ($.value = y.getBoundingClientRect().width);
    }, { arrowRight: Q, arrowLeft: L, arrowDown: ae, arrowUp: oe } = ht(), { flowStep: A, updateFlowStep: U, childMount: Z, resetFlow: le, handleFlow: O } = ao(a, n, F), z = computed(() => a.monthPicker ? tr : a.yearPicker ? nr : a.timePicker ? kr : a.quarterPicker ? Wr : Lr), re = computed(() => {
      var we;
      if (Y.value.arrowLeft)
        return Y.value.arrowLeft;
      const y = (we = f.value) == null ? void 0 : we.getBoundingClientRect(), G = a.getInputRect();
      return G.width < $.value && G.left <= ((y == null ? void 0 : y.left) ?? 0) ? `${G.width / 2}px` : "50%";
    }), H = () => {
      const y = Ye(f);
      y && y.focus({ preventScroll: true });
    }, C = computed(() => {
      var y;
      return ((y = F.value) == null ? void 0 : y.getSidebarProps()) || {};
    }), v = () => {
      a.openOnTop && n("recalculate-position");
    }, d = Xe(h2, "action"), X = computed(() => a.monthPicker || a.yearPicker ? Xe(h2, "monthYear") : a.timePicker ? Xe(h2, "timePicker") : Xe(h2, "shared")), ue = computed(() => a.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), D = computed(() => ({
      dp__menu_disabled: a.disabled,
      dp__menu_readonly: a.readonly,
      "dp-menu-loading": a.loading
    })), M = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !p.value.enabled,
        dp__relative: p.value.enabled,
        [a.menuClassName]: !!a.menuClassName
      })
    ), V = (y) => {
      gt(y, Y.value, true);
    }, u = () => {
      a.escClose && n("close-picker");
    }, _ = (y) => {
      if (a.arrowNavigation) {
        if (y === Ue.up)
          return oe();
        if (y === Ue.down)
          return ae();
        if (y === Ue.left)
          return L();
        if (y === Ue.right)
          return Q();
      } else
        y === Ue.left || y === Ue.up ? de("handleArrow", Ue.left, 0, y === Ue.up) : de("handleArrow", Ue.right, 0, y === Ue.down);
    }, T = (y) => {
      R(y.shiftKey), !a.disableMonthYearSelect && y.code === Re.tab && y.target.classList.contains("dp__menu") && I.value.shiftKeyInMenu && (y.preventDefault(), gt(y, Y.value, true), n("close-picker"));
    }, ce = () => {
      H(), n("time-picker-close");
    }, i = (y) => {
      var G, we, ve;
      (G = F.value) == null || G.toggleTimePicker(false, false), (we = F.value) == null || we.toggleMonthPicker(false, false, y), (ve = F.value) == null || ve.toggleYearPicker(false, false, y);
    }, b = (y, G = 0) => {
      var we, ve, Ke;
      return y === "month" ? (we = F.value) == null ? void 0 : we.toggleMonthPicker(false, true, G) : y === "year" ? (ve = F.value) == null ? void 0 : ve.toggleYearPicker(false, true, G) : y === "time" ? (Ke = F.value) == null ? void 0 : Ke.toggleTimePicker(true, false) : i(G);
    }, de = (y, ...G) => {
      var we, ve;
      (we = F.value) != null && we[y] && ((ve = F.value) == null || ve[y](...G));
    }, $e = () => {
      de("selectCurrentDate");
    }, o = (y, G) => {
      de("presetDate", y, G);
    }, E = () => {
      de("clearHoverDate");
    }, ee = (y, G) => {
      de("updateMonthYear", y, G);
    }, P = (y, G) => {
      y.preventDefault(), _(G);
    }, se = (y) => {
      var G;
      if (T(y), y.key === Re.home || y.key === Re.end)
        return de(
          "selectWeekDate",
          y.key === Re.home,
          y.target.getAttribute("id")
        );
      switch ((y.key === Re.pageUp || y.key === Re.pageDown) && (y.shiftKey ? de("changeYear", y.key === Re.pageUp) : de("changeMonth", y.key === Re.pageUp), y.target.getAttribute("id") && ((G = f.value) == null || G.focus({ preventScroll: true }))), y.key) {
        case Re.esc:
          return u();
        case Re.arrowLeft:
          return P(y, Ue.left);
        case Re.arrowRight:
          return P(y, Ue.right);
        case Re.arrowUp:
          return P(y, Ue.up);
        case Re.arrowDown:
          return P(y, Ue.down);
        default:
          return;
      }
    };
    return t({
      updateMonthYear: ee,
      switchView: b,
      handleFlow: O
    }), (y, G) => {
      var we, ve, Ke;
      return openBlock(), createElementBlock("div", {
        id: y.uid ? `dp-menu-${y.uid}` : void 0,
        ref_key: "dpMenuRef",
        ref: f,
        tabindex: "0",
        role: "dialog",
        "aria-label": (we = y.ariaLabels) == null ? void 0 : we.menu,
        class: normalizeClass(M.value),
        style: normalizeStyle({ "--dp-arrow-left": re.value }),
        onMouseleave: E,
        onClick: V,
        onKeydown: se
      }, [
        (y.disabled || y.readonly) && unref(p).enabled || y.loading ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(D.value)
        }, [
          y.loading ? (openBlock(), createElementBlock("div", jr, Gr)) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true),
        !unref(p).enabled && !y.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(ue.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: B,
          class: normalizeClass({
            dp__menu_content_wrapper: ((ve = y.presetDates) == null ? void 0 : ve.length) || !!y.$slots["left-sidebar"] || !!y.$slots["right-sidebar"],
            "dp--menu-content-wrapper-collapsed": e.collapse && (((Ke = y.presetDates) == null ? void 0 : Ke.length) || !!y.$slots["left-sidebar"] || !!y.$slots["right-sidebar"])
          }),
          style: normalizeStyle({ "--dp-menu-width": `${$.value}px` })
        }, [
          y.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", Qr, [
            renderSlot(y.$slots, "left-sidebar", normalizeProps(guardReactiveProps(C.value)))
          ])) : createCommentVNode("", true),
          y.presetDates.length ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass({ "dp--preset-dates-collapsed": e.collapse, "dp--preset-dates": true })
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(y.presetDates, (fe, ft) => (openBlock(), createElementBlock(Fragment, { key: ft }, [
              fe.slot ? renderSlot(y.$slots, fe.slot, {
                key: 0,
                presetDate: o,
                label: fe.label,
                value: fe.value
              }) : (openBlock(), createElementBlock("button", {
                key: 1,
                type: "button",
                style: normalizeStyle(fe.style || {}),
                class: normalizeClass(["dp__btn dp--preset-range", { "dp--preset-range-collapsed": e.collapse }]),
                "data-test": fe.testId ?? void 0,
                onClick: withModifiers((nt) => o(fe.value, fe.noTz), ["prevent"]),
                onKeydown: (nt) => unref(Qe)(nt, () => o(fe.value, fe.noTz), true)
              }, toDisplayString(fe.label), 47, qr))
            ], 64))), 128))
          ], 2)) : createCommentVNode("", true),
          createBaseVNode("div", {
            ref_key: "calendarWrapperRef",
            ref: j,
            class: "dp__instance_calendar",
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(z.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: F
            }, c.value, {
              "flow-step": unref(A),
              onMount: unref(Z),
              onUpdateFlowStep: unref(U),
              onResetFlow: unref(le),
              onFocusMenu: H,
              onSelectDate: G[0] || (G[0] = (fe) => y.$emit("select-date")),
              onDateUpdate: G[1] || (G[1] = (fe) => y.$emit("date-update", fe)),
              onTooltipOpen: G[2] || (G[2] = (fe) => y.$emit("tooltip-open", fe)),
              onTooltipClose: G[3] || (G[3] = (fe) => y.$emit("tooltip-close", fe)),
              onAutoApply: G[4] || (G[4] = (fe) => y.$emit("auto-apply", fe)),
              onRangeStart: G[5] || (G[5] = (fe) => y.$emit("range-start", fe)),
              onRangeEnd: G[6] || (G[6] = (fe) => y.$emit("range-end", fe)),
              onInvalidFixedRange: G[7] || (G[7] = (fe) => y.$emit("invalid-fixed-range", fe)),
              onTimeUpdate: G[8] || (G[8] = (fe) => y.$emit("time-update")),
              onAmPmChange: G[9] || (G[9] = (fe) => y.$emit("am-pm-change", fe)),
              onTimePickerOpen: G[10] || (G[10] = (fe) => y.$emit("time-picker-open", fe)),
              onTimePickerClose: ce,
              onRecalculatePosition: v,
              onUpdateMonthYear: G[11] || (G[11] = (fe) => y.$emit("update-month-year", fe)),
              onAutoApplyInvalid: G[12] || (G[12] = (fe) => y.$emit("auto-apply-invalid", fe)),
              onInvalidDate: G[13] || (G[13] = (fe) => y.$emit("invalid-date", fe)),
              onOverlayToggle: G[14] || (G[14] = (fe) => y.$emit("overlay-toggle", fe)),
              "onUpdate:internalModelValue": G[15] || (G[15] = (fe) => y.$emit("update:internal-model-value", fe))
            }), createSlots({ _: 2 }, [
              renderList(X.value, (fe, ft) => ({
                name: fe,
                fn: withCtx((nt) => [
                  renderSlot(y.$slots, fe, normalizeProps(guardReactiveProps({ ...nt })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          y.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", Xr, [
            renderSlot(y.$slots, "right-sidebar", normalizeProps(guardReactiveProps(C.value)))
          ])) : createCommentVNode("", true),
          y.$slots["action-extra"] ? (openBlock(), createElementBlock("div", Jr, [
            y.$slots["action-extra"] ? renderSlot(y.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: $e
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 6),
        !y.autoApply || unref(Y).keepActionRow ? (openBlock(), createBlock(Gl, mergeProps({
          key: 2,
          "menu-mount": w.value
        }, c.value, {
          "calendar-width": $.value,
          onClosePicker: G[16] || (G[16] = (fe) => y.$emit("close-picker")),
          onSelectDate: G[17] || (G[17] = (fe) => y.$emit("select-date")),
          onInvalidSelect: G[18] || (G[18] = (fe) => y.$emit("invalid-select")),
          onSelectNow: $e
        }), createSlots({ _: 2 }, [
          renderList(unref(d), (fe, ft) => ({
            name: fe,
            fn: withCtx((nt) => [
              renderSlot(y.$slots, fe, normalizeProps(guardReactiveProps({ ...nt })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
      ], 46, Ur);
    };
  }
});
var Pt = ((e) => (e.center = "center", e.left = "left", e.right = "right", e))(Pt || {});
var Zr = ({
  menuRef: e,
  menuRefInner: t,
  inputRef: l,
  pickerWrapperRef: n,
  inline: a,
  emit: f,
  props: c,
  slots: r
}) => {
  const R = ref({}), I = ref(false), h2 = ref({
    top: "0",
    left: "0"
  }), k = ref(false), p = toRef(c, "teleportCenter");
  watch(p, () => {
    h2.value = JSON.parse(JSON.stringify({})), Q();
  });
  const Y = (C) => {
    if (c.teleport) {
      const v = C.getBoundingClientRect();
      return {
        left: v.left + window.scrollX,
        top: v.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, j = (C, v) => {
    h2.value.left = `${C + v - R.value.width}px`;
  }, $ = (C) => {
    h2.value.left = `${C}px`;
  }, B = (C, v) => {
    c.position === Pt.left && $(C), c.position === Pt.right && j(C, v), c.position === Pt.center && (h2.value.left = `${C + v / 2 - R.value.width / 2}px`);
  }, w = (C) => {
    const { width: v, height: d } = C.getBoundingClientRect(), { top: X, left: ue } = c.altPosition ? c.altPosition(C) : Y(C);
    return { top: +X, left: +ue, width: v, height: d };
  }, F = () => {
    h2.value.left = "50%", h2.value.top = "50%", h2.value.transform = "translate(-50%, -50%)", h2.value.position = "fixed", delete h2.value.opacity;
  }, N = () => {
    const C = Ye(l), { top: v, left: d, transform: X } = c.altPosition(C);
    h2.value = { top: `${v}px`, left: `${d}px`, transform: X ?? "" };
  }, Q = (C = true) => {
    var v;
    if (!a.value.enabled) {
      if (p.value)
        return F();
      if (c.altPosition !== null)
        return N();
      if (C) {
        const d = c.teleport ? (v = t.value) == null ? void 0 : v.$el : e.value;
        d && (R.value = d.getBoundingClientRect()), f("recalculate-position");
      }
      return le();
    }
  }, L = ({ inputEl: C, left: v, width: d }) => {
    window.screen.width > 768 && !I.value && B(v, d), A(C);
  }, ae = (C) => {
    const { top: v, left: d, height: X, width: ue } = w(C);
    h2.value.top = `${X + v + +c.offset}px`, k.value = false, I.value || (h2.value.left = `${d + ue / 2 - R.value.width / 2}px`), L({ inputEl: C, left: d, width: ue });
  }, oe = (C) => {
    const { top: v, left: d, width: X } = w(C);
    h2.value.top = `${v - +c.offset - R.value.height}px`, k.value = true, L({ inputEl: C, left: d, width: X });
  }, A = (C) => {
    if (c.autoPosition) {
      const { left: v, width: d } = w(C), { left: X, right: ue } = R.value;
      if (!I.value) {
        if (Math.abs(X) !== Math.abs(ue)) {
          if (X <= 0)
            return I.value = true, $(v);
          if (ue >= document.documentElement.clientWidth)
            return I.value = true, j(v, d);
        }
        return B(v, d);
      }
    }
  }, U = () => {
    const C = Ye(l);
    if (C) {
      const { height: v } = R.value, { top: d, height: X } = C.getBoundingClientRect(), D = window.innerHeight - d - X, M = d;
      return v <= D ? Dt.bottom : v > D && v <= M ? Dt.top : D >= M ? Dt.bottom : Dt.top;
    }
    return Dt.bottom;
  }, Z = (C) => U() === Dt.bottom ? ae(C) : oe(C), le = () => {
    const C = Ye(l);
    if (C)
      return c.autoPosition ? Z(C) : ae(C);
  }, O = function(C) {
    if (C) {
      const v = C.scrollHeight > C.clientHeight, X = window.getComputedStyle(C).overflowY.indexOf("hidden") !== -1;
      return v && !X;
    }
    return true;
  }, z = function(C) {
    return !C || C === document.body || C.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : O(C) ? C : z(C.assignedSlot ? C.assignedSlot.parentNode : C.parentNode);
  }, re = (C) => {
    if (C)
      switch (c.position) {
        case Pt.left:
          return { left: 0, transform: "translateX(0)" };
        case Pt.right:
          return { left: `${C.width}px`, transform: "translateX(-100%)" };
        default:
          return { left: `${C.width / 2}px`, transform: "translateX(-50%)" };
      }
    return {};
  };
  return {
    openOnTop: k,
    menuStyle: h2,
    xCorrect: I,
    setMenuPosition: Q,
    getScrollableParent: z,
    shadowRender: (C, v) => {
      var V, u, _;
      const d = document.createElement("div"), X = (V = Ye(l)) == null ? void 0 : V.getBoundingClientRect();
      d.setAttribute("id", "dp--temp-container");
      const ue = (u = n.value) != null && u.clientWidth ? n.value : document.body;
      ue.append(d);
      const D = re(X), M = h(
        C,
        {
          ...v,
          shadow: true,
          style: { opacity: 0, position: "absolute", ...D }
        },
        Object.fromEntries(
          Object.keys(r).filter((T) => ["right-sidebar", "left-sidebar", "top-extra", "action-extra"].includes(T)).map((T) => [T, r[T]])
        )
      );
      render(M, d), R.value = (_ = M.el) == null ? void 0 : _.getBoundingClientRect(), render(null, d), ue.removeChild(d);
    }
  };
};
var vt = [
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
  { name: "top-extra", use: ["shared", "month-year"] }
];
var xr = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var eo = {
  all: () => vt,
  monthYear: () => vt.filter((e) => e.use.includes("month-year")),
  input: () => xr,
  timePicker: () => vt.filter((e) => e.use.includes("time")),
  action: () => vt.filter((e) => e.use.includes("action")),
  calendar: () => vt.filter((e) => e.use.includes("calendar")),
  menu: () => vt.filter((e) => e.use.includes("menu")),
  shared: () => vt.filter((e) => e.use.includes("shared")),
  yearMode: () => vt.filter((e) => e.use.includes("year-mode"))
};
var Xe = (e, t, l) => {
  const n = [];
  return eo[t]().forEach((a) => {
    e[a.name] && n.push(a.name);
  }), l != null && l.length && l.forEach((a) => {
    a.slot && n.push(a.slot);
  }), n;
};
var qt = (e) => {
  const t = computed(() => (n) => e.value ? n ? e.value.open : e.value.close : ""), l = computed(() => (n) => e.value ? n ? e.value.menuAppearTop : e.value.menuAppearBottom : "");
  return { transitionName: t, showTransition: !!e.value, menuTransition: l };
};
var Xt = (e, t) => {
  const { defaultedRange: l, defaultedTz: n } = Pe(e), a = K(st(K(), n.value.timezone)), f = ref([{ month: getMonth(a), year: getYear(a) }]), c = (k) => {
    const p = {
      hours: getHours(a),
      minutes: getMinutes(a),
      seconds: 0
    };
    return l.value.enabled ? [p[k], p[k]] : p[k];
  }, r = reactive({
    hours: c("hours"),
    minutes: c("minutes"),
    seconds: c("seconds")
  });
  watch(
    l,
    (k, p) => {
      k.enabled !== p.enabled && (r.hours = c("hours"), r.minutes = c("minutes"), r.seconds = c("seconds"));
    },
    { deep: true }
  );
  const R = computed({
    get: () => e.internalModelValue,
    set: (k) => {
      !e.readonly && !e.disabled && t("update:internal-model-value", k);
    }
  }), I = computed(
    () => (k) => f.value[k] ? f.value[k].month : 0
  ), h2 = computed(
    () => (k) => f.value[k] ? f.value[k].year : 0
  );
  return {
    calendars: f,
    time: r,
    modelValue: R,
    month: I,
    year: h2,
    today: a
  };
};
var to = (e, t) => {
  const { defaultedMultiCalendars: l, defaultedMultiDates: n, defaultedHighlight: a, defaultedTz: f, propDates: c, defaultedRange: r } = Pe(t), { isDisabled: R } = bt(t), I = ref(null), h2 = ref(st(/* @__PURE__ */ new Date(), f.value.timezone)), k = (u) => {
    !u.current && t.hideOffsetDates || (I.value = u.value);
  }, p = () => {
    I.value = null;
  }, Y = (u) => Array.isArray(e.value) && r.value.enabled && e.value[0] && I.value ? u ? Oe(I.value, e.value[0]) : Ce(I.value, e.value[0]) : true, j = (u, _) => {
    const T = () => e.value ? _ ? e.value[0] || null : e.value[1] : null, ce = e.value && Array.isArray(e.value) ? T() : null;
    return he(K(u.value), ce);
  }, $ = (u) => {
    const _ = Array.isArray(e.value) ? e.value[0] : null;
    return u ? !Ce(I.value ?? null, _) : true;
  }, B = (u, _ = true) => (r.value.enabled || t.weekPicker) && Array.isArray(e.value) && e.value.length === 2 ? t.hideOffsetDates && !u.current ? false : he(K(u.value), e.value[_ ? 0 : 1]) : r.value.enabled ? j(u, _) && $(_) || he(u.value, Array.isArray(e.value) ? e.value[0] : null) && Y(_) : false, w = (u, _) => {
    if (Array.isArray(e.value) && e.value[0] && e.value.length === 1) {
      const T = he(u.value, I.value);
      return _ ? Oe(e.value[0], u.value) && T : Ce(e.value[0], u.value) && T;
    }
    return false;
  }, F = (u) => !e.value || t.hideOffsetDates && !u.current ? false : r.value.enabled ? t.modelAuto && Array.isArray(e.value) ? he(u.value, e.value[0] ? e.value[0] : h2.value) : false : n.value.enabled && Array.isArray(e.value) ? e.value.some((_) => he(_, u.value)) : he(u.value, e.value ? e.value : h2.value), N = (u) => {
    if (r.value.autoRange || t.weekPicker) {
      if (I.value) {
        if (t.hideOffsetDates && !u.current)
          return false;
        const _ = addDays(I.value, +r.value.autoRange), T = ut(K(I.value), t.weekStart);
        return t.weekPicker ? he(T[1], K(u.value)) : he(_, K(u.value));
      }
      return false;
    }
    return false;
  }, Q = (u) => {
    if (r.value.autoRange || t.weekPicker) {
      if (I.value) {
        const _ = addDays(I.value, +r.value.autoRange);
        if (t.hideOffsetDates && !u.current)
          return false;
        const T = ut(K(I.value), t.weekStart);
        return t.weekPicker ? Oe(u.value, T[0]) && Ce(u.value, T[1]) : Oe(u.value, I.value) && Ce(u.value, _);
      }
      return false;
    }
    return false;
  }, L = (u) => {
    if (r.value.autoRange || t.weekPicker) {
      if (I.value) {
        if (t.hideOffsetDates && !u.current)
          return false;
        const _ = ut(K(I.value), t.weekStart);
        return t.weekPicker ? he(_[0], u.value) : he(I.value, u.value);
      }
      return false;
    }
    return false;
  }, ae = (u) => ua(e.value, I.value, u.value), oe = () => t.modelAuto && Array.isArray(t.internalModelValue) ? !!t.internalModelValue[0] : false, A = () => t.modelAuto ? Dn(t.internalModelValue) : true, U = (u) => {
    if (t.weekPicker)
      return false;
    const _ = r.value.enabled ? !B(u) && !B(u, false) : true;
    return !R(u.value) && !F(u) && !(!u.current && t.hideOffsetDates) && _;
  }, Z = (u) => r.value.enabled ? t.modelAuto ? oe() && F(u) : false : F(u), le = (u) => a.value ? bl(u.value, c.value.highlight) : false, O = (u) => {
    const _ = R(u.value);
    return _ && (typeof a.value == "function" ? !a.value(u.value, _) : !a.value.options.highlightDisabled);
  }, z = (u) => {
    var _;
    return typeof a.value == "function" ? a.value(u.value) : (_ = a.value.weekdays) == null ? void 0 : _.includes(u.value.getDay());
  }, re = (u) => (r.value.enabled || t.weekPicker) && (!(l.value.count > 0) || u.current) && A() && !(!u.current && t.hideOffsetDates) && !F(u) ? ae(u) : false, H = (u) => {
    const { isRangeStart: _, isRangeEnd: T } = X(u), ce = r.value.enabled ? _ || T : false;
    return {
      dp__cell_offset: !u.current,
      dp__pointer: !t.disabled && !(!u.current && t.hideOffsetDates) && !R(u.value),
      dp__cell_disabled: R(u.value),
      dp__cell_highlight: !O(u) && (le(u) || z(u)) && !Z(u) && !ce && !L(u) && !(re(u) && t.weekPicker) && !T,
      dp__cell_highlight_active: !O(u) && (le(u) || z(u)) && Z(u),
      dp__today: !t.noToday && he(u.value, h2.value) && u.current,
      "dp--past": Ce(u.value, h2.value),
      "dp--future": Oe(u.value, h2.value)
    };
  }, C = (u) => ({
    dp__active_date: Z(u),
    dp__date_hover: U(u)
  }), v = (u) => {
    if (e.value && !Array.isArray(e.value)) {
      const _ = ut(e.value, t.weekStart);
      return {
        ...D(u),
        dp__range_start: he(_[0], u.value),
        dp__range_end: he(_[1], u.value),
        dp__range_between_week: Oe(u.value, _[0]) && Ce(u.value, _[1])
      };
    }
    return {
      ...D(u)
    };
  }, d = (u) => {
    if (e.value && Array.isArray(e.value)) {
      const _ = ut(e.value[0], t.weekStart), T = e.value[1] ? ut(e.value[1], t.weekStart) : [];
      return {
        ...D(u),
        dp__range_start: he(_[0], u.value) || he(T[0], u.value),
        dp__range_end: he(_[1], u.value) || he(T[1], u.value),
        dp__range_between_week: Oe(u.value, _[0]) && Ce(u.value, _[1]) || Oe(u.value, T[0]) && Ce(u.value, T[1]),
        dp__range_between: Oe(u.value, _[1]) && Ce(u.value, T[0])
      };
    }
    return {
      ...D(u)
    };
  }, X = (u) => {
    const _ = l.value.count > 0 ? u.current && B(u) && A() : B(u) && A(), T = l.value.count > 0 ? u.current && B(u, false) && A() : B(u, false) && A();
    return { isRangeStart: _, isRangeEnd: T };
  }, ue = (u) => {
    const { isRangeStart: _, isRangeEnd: T } = X(u);
    return {
      dp__range_start: _,
      dp__range_end: T,
      dp__range_between: re(u),
      dp__date_hover: he(u.value, I.value) && !_ && !T && !t.weekPicker,
      dp__date_hover_start: w(u, true),
      dp__date_hover_end: w(u, false)
    };
  }, D = (u) => ({
    ...ue(u),
    dp__cell_auto_range: Q(u),
    dp__cell_auto_range_start: L(u),
    dp__cell_auto_range_end: N(u)
  }), M = (u) => r.value.enabled ? r.value.autoRange ? D(u) : t.modelAuto ? { ...C(u), ...ue(u) } : t.weekPicker ? d(u) : ue(u) : t.weekPicker ? v(u) : C(u);
  return {
    setHoverDate: k,
    clearHoverDate: p,
    getDayClassData: (u) => t.hideOffsetDates && !u.current ? {} : {
      ...H(u),
      ...M(u),
      [t.dayClass ? t.dayClass(u.value, t.internalModelValue) : ""]: true,
      [t.calendarCellClassName]: !!t.calendarCellClassName
    }
  };
};
var bt = (e) => {
  const { defaultedFilters: t, defaultedRange: l, propDates: n, defaultedMultiDates: a } = Pe(e), f = (O) => n.value.disabledDates ? typeof n.value.disabledDates == "function" ? n.value.disabledDates(K(O)) : !!ra(O, n.value.disabledDates) : false, c = (O) => {
    const z = n.value.maxDate ? Oe(O, n.value.maxDate) : false, re = n.value.minDate ? Ce(O, n.value.minDate) : false, H = f(O), v = t.value.months.map((M) => +M).includes(getMonth(O)), d = e.disabledWeekDays.length ? e.disabledWeekDays.some((M) => +M === getDay(O)) : false, X = k(O), ue = getYear(O), D = ue < +e.yearRange[0] || ue > +e.yearRange[1];
    return !(z || re || H || v || D || d || X);
  }, r = (O, z) => Ce(...mt(n.value.minDate, O, z)) || he(...mt(n.value.minDate, O, z)), R = (O, z) => Oe(...mt(n.value.maxDate, O, z)) || he(...mt(n.value.maxDate, O, z)), I = (O, z, re) => {
    let H = false;
    return n.value.maxDate && re && R(O, z) && (H = true), n.value.minDate && !re && r(O, z) && (H = true), H;
  }, h2 = (O, z, re, H) => {
    let C = false;
    return H ? n.value.minDate && n.value.maxDate ? C = I(O, z, re) : (n.value.minDate && r(O, z) || n.value.maxDate && R(O, z)) && (C = true) : C = true, C;
  }, k = (O) => Array.isArray(n.value.allowedDates) && !n.value.allowedDates.length ? true : n.value.allowedDates ? !ra(O, n.value.allowedDates) : false, p = (O) => !c(O), Y = (O) => l.value.noDisabledRange ? !eachDayOfInterval({ start: O[0], end: O[1] }).some((re) => p(re)) : true, j = (O) => {
    if (O) {
      const z = getYear(O);
      return z >= +e.yearRange[0] && z <= e.yearRange[1];
    }
    return true;
  }, $ = (O, z) => !!(Array.isArray(O) && O[z] && (l.value.maxRange || l.value.minRange) && j(O[z])), B = (O, z, re = 0) => {
    if ($(z, re) && j(O)) {
      const H = differenceInCalendarDays(O, z[re]), C = Sn(z[re], O), v = C.length === 1 ? 0 : C.filter((X) => p(X)).length, d = Math.abs(H) - (l.value.minMaxRawRange ? 0 : v);
      if (l.value.minRange && l.value.maxRange)
        return d >= +l.value.minRange && d <= +l.value.maxRange;
      if (l.value.minRange)
        return d >= +l.value.minRange;
      if (l.value.maxRange)
        return d <= +l.value.maxRange;
    }
    return true;
  }, w = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, F = (O) => Array.isArray(O) ? [O[0] ? Ta(O[0]) : null, O[1] ? Ta(O[1]) : null] : Ta(O), N = (O, z, re) => O.find(
    (H) => +H.hours === getHours(z) && H.minutes === "*" ? true : +H.minutes === getMinutes(z) && +H.hours === getHours(z)
  ) && re, Q = (O, z, re) => {
    const [H, C] = O, [v, d] = z;
    return !N(H, v, re) && !N(C, d, re) && re;
  }, L = (O, z) => {
    const re = Array.isArray(z) ? z : [z];
    return Array.isArray(e.disabledTimes) ? Array.isArray(e.disabledTimes[0]) ? Q(e.disabledTimes, re, O) : !re.some((H) => N(e.disabledTimes, H, O)) : O;
  }, ae = (O, z) => {
    const re = Array.isArray(z) ? [Tt(z[0]), z[1] ? Tt(z[1]) : void 0] : Tt(z), H = !e.disabledTimes(re);
    return O && H;
  }, oe = (O, z) => e.disabledTimes ? Array.isArray(e.disabledTimes) ? L(z, O) : ae(z, O) : z, A = (O) => {
    let z = true;
    if (!O || w())
      return true;
    const re = !n.value.minDate && !n.value.maxDate ? F(O) : O;
    return (e.maxTime || n.value.maxDate) && (z = rn(
      e.maxTime,
      n.value.maxDate,
      "max",
      Be(re),
      z
    )), (e.minTime || n.value.minDate) && (z = rn(
      e.minTime,
      n.value.minDate,
      "min",
      Be(re),
      z
    )), oe(O, z);
  }, U = (O) => {
    if (!e.monthPicker)
      return true;
    let z = true;
    const re = K(tt(O));
    if (n.value.minDate && n.value.maxDate) {
      const H = K(tt(n.value.minDate)), C = K(tt(n.value.maxDate));
      return Oe(re, H) && Ce(re, C) || he(re, H) || he(re, C);
    }
    if (n.value.minDate) {
      const H = K(tt(n.value.minDate));
      z = Oe(re, H) || he(re, H);
    }
    if (n.value.maxDate) {
      const H = K(tt(n.value.maxDate));
      z = Ce(re, H) || he(re, H);
    }
    return z;
  }, Z = computed(() => (O) => !e.enableTimePicker || e.ignoreTimeValidation ? true : A(O)), le = computed(() => (O) => e.monthPicker ? Array.isArray(O) && (l.value.enabled || a.value.enabled) ? !O.filter((re) => !U(re)).length : U(O) : true);
  return {
    isDisabled: p,
    validateDate: c,
    validateMonthYearInRange: h2,
    isDateRangeAllowed: Y,
    checkMinMaxRange: B,
    isValidTime: A,
    isTimeValid: Z,
    isMonthValid: le
  };
};
var fa = () => {
  const e = computed(() => (n, a) => n == null ? void 0 : n.includes(a)), t = computed(() => (n, a) => n.count ? n.solo ? true : a === 0 : true), l = computed(() => (n, a) => n.count ? n.solo ? true : a === n.count - 1 : true);
  return { hideNavigationButtons: e, showLeftIcon: t, showRightIcon: l };
};
var ao = (e, t, l) => {
  const n = ref(0), a = reactive({
    [At.timePicker]: !e.enableTimePicker || e.timePicker || e.monthPicker,
    [At.calendar]: false,
    [At.header]: false
  }), f = computed(() => e.monthPicker || e.timePicker), c = (k) => {
    var p;
    if ((p = e.flow) != null && p.length) {
      if (!k && f.value)
        return h2();
      a[k] = true, Object.keys(a).filter((Y) => !a[Y]).length || h2();
    }
  }, r = () => {
    var k, p;
    (k = e.flow) != null && k.length && n.value !== -1 && (n.value += 1, t("flow-step", n.value), h2()), ((p = e.flow) == null ? void 0 : p.length) === n.value && nextTick().then(() => R());
  }, R = () => {
    n.value = -1;
  }, I = (k, p, ...Y) => {
    var j, $;
    e.flow[n.value] === k && l.value && (($ = (j = l.value)[p]) == null || $.call(j, ...Y));
  }, h2 = (k = 0) => {
    k && (n.value += k), I(He.month, "toggleMonthPicker", true), I(He.year, "toggleYearPicker", true), I(He.calendar, "toggleTimePicker", false, true), I(He.time, "toggleTimePicker", true, true);
    const p = e.flow[n.value];
    (p === He.hours || p === He.minutes || p === He.seconds) && I(p, "toggleTimePicker", true, true, p);
  };
  return { childMount: c, updateFlowStep: r, resetFlow: R, handleFlow: h2, flowStep: n };
};
var no = {
  key: 1,
  class: "dp__input_wrap"
};
var lo = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-label", "aria-disabled", "aria-invalid"];
var ro = {
  key: 2,
  class: "dp__clear_icon"
};
var oo = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: false },
    inputValue: { type: String, default: "" },
    ...ia
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
    "real-blur"
  ],
  setup(e, { expose: t, emit: l }) {
    const n = l, a = e, {
      defaultedTextInput: f,
      defaultedAriaLabels: c,
      defaultedInline: r,
      defaultedConfig: R,
      defaultedRange: I,
      defaultedMultiDates: h2,
      getDefaultPattern: k,
      getDefaultStartTime: p
    } = Pe(a), { checkMinMaxRange: Y } = bt(a), j = ref(), $ = ref(null), B = ref(false), w = ref(false), F = computed(
      () => ({
        dp__pointer: !a.disabled && !a.readonly && !f.value.enabled,
        dp__disabled: a.disabled,
        dp__input_readonly: !f.value.enabled,
        dp__input: true,
        dp__input_icon_pad: !a.hideInputIcon,
        dp__input_valid: !!a.state,
        dp__input_invalid: a.state === false,
        dp__input_focus: B.value || a.isMenuOpen,
        dp__input_reg: !f.value.enabled,
        [a.inputClassName]: !!a.inputClassName
      })
    ), N = () => {
      n("set-input-date", null), a.clearable && a.autoApply && (n("set-empty-date"), j.value = null);
    }, Q = (d) => {
      const X = p();
      return kl(
        d,
        f.value.format ?? k(),
        X ?? Rn({}, a.enableSeconds),
        a.inputValue,
        w.value,
        a.formatLocale
      );
    }, L = (d) => {
      const { rangeSeparator: X } = f.value, [ue, D] = d.split(`${X}`);
      if (ue) {
        const M = Q(ue.trim()), V = D ? Q(D.trim()) : null;
        if (isAfter(M, V))
          return;
        const u = M && V ? [M, V] : [M];
        Y(V, u, 0) && (j.value = M ? u : null);
      }
    }, ae = () => {
      w.value = true;
    }, oe = (d) => {
      if (I.value.enabled)
        L(d);
      else if (h2.value.enabled) {
        const X = d.split(";");
        j.value = X.map((ue) => Q(ue.trim())).filter((ue) => ue);
      } else
        j.value = Q(d);
    }, A = (d) => {
      var ue;
      const X = typeof d == "string" ? d : (ue = d.target) == null ? void 0 : ue.value;
      X !== "" ? (f.value.openMenu && !a.isMenuOpen && n("open"), oe(X), n("set-input-date", j.value)) : N(), w.value = false, n("update:input-value", X);
    }, U = (d) => {
      f.value.enabled ? (oe(d.target.value), f.value.enterSubmit && Ia(j.value) && a.inputValue !== "" ? (n("set-input-date", j.value, true), j.value = null) : f.value.enterSubmit && a.inputValue === "" && (j.value = null, n("clear"))) : O(d);
    }, Z = (d) => {
      f.value.enabled && f.value.tabSubmit && oe(d.target.value), f.value.tabSubmit && Ia(j.value) && a.inputValue !== "" ? (n("set-input-date", j.value, true, true), j.value = null) : f.value.tabSubmit && a.inputValue === "" && (j.value = null, n("clear", true));
    }, le = () => {
      B.value = true, n("focus"), nextTick().then(() => {
        var d;
        f.value.enabled && f.value.selectOnFocus && ((d = $.value) == null || d.select());
      });
    }, O = (d) => {
      d.preventDefault(), gt(d, R.value, true), f.value.enabled && f.value.openMenu && !r.value.input && !a.isMenuOpen ? n("open") : f.value.enabled || n("toggle");
    }, z = () => {
      n("real-blur"), B.value = false, (!a.isMenuOpen || r.value.enabled && r.value.input) && n("blur"), a.autoApply && f.value.enabled && j.value && !a.isMenuOpen && (n("set-input-date", j.value), n("select-date"), j.value = null);
    }, re = (d) => {
      gt(d, R.value, true), n("clear");
    }, H = (d) => {
      if (d.key === "Tab" && Z(d), d.key === "Enter" && U(d), !f.value.enabled) {
        if (d.code === "Tab")
          return;
        d.preventDefault();
      }
    };
    return t({
      focusInput: () => {
        var d;
        (d = $.value) == null || d.focus({ preventScroll: true });
      },
      setParsedDate: (d) => {
        j.value = d;
      }
    }), (d, X) => {
      var ue;
      return openBlock(), createElementBlock("div", { onClick: O }, [
        d.$slots.trigger && !d.$slots["dp-input"] && !unref(r).enabled ? renderSlot(d.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !d.$slots.trigger && (!unref(r).enabled || unref(r).input) ? (openBlock(), createElementBlock("div", no, [
          d.$slots["dp-input"] && !d.$slots.trigger && (!unref(r).enabled || unref(r).enabled && unref(r).input) ? renderSlot(d.$slots, "dp-input", {
            key: 0,
            value: e.inputValue,
            isMenuOpen: e.isMenuOpen,
            onInput: A,
            onEnter: U,
            onTab: Z,
            onClear: re,
            onBlur: z,
            onKeypress: H,
            onPaste: ae,
            onFocus: le,
            openMenu: () => d.$emit("open"),
            closeMenu: () => d.$emit("close"),
            toggleMenu: () => d.$emit("toggle")
          }) : createCommentVNode("", true),
          d.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            id: d.uid ? `dp-input-${d.uid}` : void 0,
            ref_key: "inputRef",
            ref: $,
            "data-test": "dp-input",
            name: d.name,
            class: normalizeClass(F.value),
            inputmode: unref(f).enabled ? "text" : "none",
            placeholder: d.placeholder,
            disabled: d.disabled,
            readonly: d.readonly,
            required: d.required,
            value: e.inputValue,
            autocomplete: d.autocomplete,
            "aria-label": (ue = unref(c)) == null ? void 0 : ue.input,
            "aria-disabled": d.disabled || void 0,
            "aria-invalid": d.state === false ? true : void 0,
            onInput: A,
            onBlur: z,
            onFocus: le,
            onKeypress: H,
            onKeydown: H,
            onPaste: ae
          }, null, 42, lo)),
          createBaseVNode("div", {
            onClick: X[2] || (X[2] = (D) => n("toggle"))
          }, [
            d.$slots["input-icon"] && !d.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: X[0] || (X[0] = (D) => n("toggle"))
            }, [
              renderSlot(d.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !d.$slots["input-icon"] && !d.hideInputIcon && !d.$slots["dp-input"] ? (openBlock(), createBlock(unref(Nt), {
              key: 1,
              class: "dp__input_icon dp__input_icons",
              onClick: X[1] || (X[1] = (D) => n("toggle"))
            })) : createCommentVNode("", true)
          ]),
          d.$slots["clear-icon"] && e.inputValue && d.clearable && !d.disabled && !d.readonly ? (openBlock(), createElementBlock("span", ro, [
            renderSlot(d.$slots, "clear-icon", { clear: re })
          ])) : createCommentVNode("", true),
          d.clearable && !d.$slots["clear-icon"] && e.inputValue && !d.disabled && !d.readonly ? (openBlock(), createBlock(unref(kn), {
            key: 3,
            class: "dp__clear_icon dp__input_icons",
            "data-test": "clear-icon",
            onClick: X[3] || (X[3] = withModifiers((D) => re(D), ["prevent"]))
          })) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var so = typeof window < "u" ? window : void 0;
var Oa = () => {
};
var uo = (e) => getCurrentScope() ? (onScopeDispose(e), true) : false;
var io = (e, t, l, n) => {
  if (!e)
    return Oa;
  let a = Oa;
  const f = watch(
    () => unref(e),
    (r) => {
      a(), r && (r.addEventListener(t, l, n), a = () => {
        r.removeEventListener(t, l, n), a = Oa;
      });
    },
    { immediate: true, flush: "post" }
  ), c = () => {
    f(), a();
  };
  return uo(c), c;
};
var co = (e, t, l, n = {}) => {
  const { window: a = so, event: f = "pointerdown" } = n;
  return a ? io(a, f, (r) => {
    const R = Ye(e), I = Ye(t);
    !R || !I || R === r.target || r.composedPath().includes(R) || r.composedPath().includes(I) || l(r);
  }, { passive: true }) : void 0;
};
var fo = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "VueDatePicker",
  props: {
    ...ia
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
    "overlay-toggle"
  ],
  setup(e, { expose: t, emit: l }) {
    const n = l, a = e, f = useSlots(), c = ref(false), r = toRef(a, "modelValue"), R = toRef(a, "timezone"), I = ref(null), h2 = ref(null), k = ref(null), p = ref(false), Y = ref(null), j = ref(false), $ = ref(false), B = ref(false), { setMenuFocused: w, setShiftKey: F } = Bn(), { clearArrowNav: N } = ht(), { validateDate: Q, isValidTime: L } = bt(a), {
      defaultedTransitions: ae,
      defaultedTextInput: oe,
      defaultedInline: A,
      defaultedConfig: U,
      defaultedRange: Z,
      defaultedMultiDates: le
    } = Pe(a), { menuTransition: O, showTransition: z } = qt(ae);
    onMounted(() => {
      u(a.modelValue), nextTick().then(() => {
        if (!A.value.enabled) {
          const m = ue(Y.value);
          m == null || m.addEventListener("scroll", ee), window == null || window.addEventListener("resize", P);
        }
      }), A.value.enabled && (c.value = true), window == null || window.addEventListener("keyup", se), window == null || window.addEventListener("keydown", y);
    }), onUnmounted(() => {
      if (!A.value.enabled) {
        const m = ue(Y.value);
        m == null || m.removeEventListener("scroll", ee), window == null || window.removeEventListener("resize", P);
      }
      window == null || window.removeEventListener("keyup", se), window == null || window.removeEventListener("keydown", y);
    });
    const re = Xe(f, "all", a.presetDates), H = Xe(f, "input");
    watch(
      [r, R],
      () => {
        u(r.value);
      },
      { deep: true }
    );
    const { openOnTop: C, menuStyle: v, xCorrect: d, setMenuPosition: X, getScrollableParent: ue, shadowRender: D } = Zr({
      menuRef: I,
      menuRefInner: h2,
      inputRef: k,
      pickerWrapperRef: Y,
      inline: A,
      emit: n,
      props: a,
      slots: f
    }), {
      inputValue: M,
      internalModelValue: V,
      parseExternalModelValue: u,
      emitModelValue: _,
      formatInputValue: T,
      checkBeforeEmit: ce
    } = Wl(n, a, p), i = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: a.dark,
        dp__theme_light: !a.dark,
        dp__flex_display: A.value.enabled,
        "dp--flex-display-collapsed": B.value,
        dp__flex_display_with_input: A.value.input
      })
    ), b = computed(() => a.dark ? "dp__theme_dark" : "dp__theme_light"), de = computed(() => a.teleport ? {
      to: typeof a.teleport == "boolean" ? "body" : a.teleport,
      disabled: !a.teleport || A.value.enabled
    } : {}), $e = computed(() => ({ class: "dp__outer_menu_wrap" })), o = computed(() => A.value.enabled && (a.timePicker || a.monthPicker || a.yearPicker || a.quarterPicker)), E = () => {
      var m, W;
      return (W = (m = k.value) == null ? void 0 : m.$el) == null ? void 0 : W.getBoundingClientRect();
    }, ee = () => {
      c.value && (U.value.closeOnScroll ? qe() : X());
    }, P = () => {
      var W;
      c.value && X();
      const m = (W = h2.value) == null ? void 0 : W.$el.getBoundingClientRect().width;
      B.value = document.body.offsetWidth <= m;
    }, se = (m) => {
      m.key === "Tab" && !A.value.enabled && !a.teleport && U.value.tabOutClosesMenu && (Y.value.contains(document.activeElement) || qe()), $.value = m.shiftKey;
    }, y = (m) => {
      $.value = m.shiftKey;
    }, G = () => {
      !a.disabled && !a.readonly && (D(dn, a), X(false), c.value = true, c.value && n("open"), c.value || Et(), u(a.modelValue));
    }, we = () => {
      var m;
      M.value = "", Et(), (m = k.value) == null || m.setParsedDate(null), n("update:model-value", null), n("update:model-timezone-value", null), n("cleared"), U.value.closeOnClearValue && qe();
    }, ve = () => {
      const m = V.value;
      return !m || !Array.isArray(m) && Q(m) ? true : Array.isArray(m) ? le.value.enabled || m.length === 2 && Q(m[0]) && Q(m[1]) ? true : Z.value.partialRange && !a.timePicker ? Q(m[0]) : false : false;
    }, Ke = () => {
      ce() && ve() ? (_(), qe()) : n("invalid-select", V.value);
    }, fe = (m) => {
      ft(), _(), U.value.closeOnAutoApply && !m && qe();
    }, ft = () => {
      k.value && oe.value.enabled && k.value.setParsedDate(V.value);
    }, nt = (m = false) => {
      a.autoApply && L(V.value) && ve() && (Z.value.enabled && Array.isArray(V.value) ? (Z.value.partialRange || V.value.length === 2) && fe(m) : fe(m));
    }, Et = () => {
      oe.value.enabled || (V.value = null);
    }, qe = () => {
      A.value.enabled || (c.value && (c.value = false, d.value = false, w(false), F(false), N(), n("closed"), M.value && u(r.value)), Et(), n("blur"));
    }, Ft = (m, W, ne = false) => {
      if (!m) {
        V.value = null;
        return;
      }
      const Me = Array.isArray(m) ? !m.some((kt) => !Q(kt)) : Q(m), Ee = L(m);
      Me && Ee && (V.value = m, W && (j.value = ne, Ke(), n("text-submit")));
    }, va = () => {
      a.autoApply && L(V.value) && _(), ft();
    }, Jt = () => c.value ? qe() : G(), ma = (m) => {
      V.value = m;
    }, ga = () => {
      oe.value.enabled && (p.value = true, T()), n("focus");
    }, ya = () => {
      if (oe.value.enabled && (p.value = false, u(a.modelValue), j.value)) {
        const m = pl(Y.value, $.value);
        m == null || m.focus();
      }
      n("blur");
    }, pa = (m) => {
      h2.value && h2.value.updateMonthYear(0, {
        month: an(m.month),
        year: an(m.year)
      });
    }, ha = (m) => {
      u(m ?? a.modelValue);
    }, ba = (m, W) => {
      var ne;
      (ne = h2.value) == null || ne.switchView(m, W);
    }, qa = (m) => U.value.onClickOutside ? U.value.onClickOutside(m) : qe(), g = (m = 0) => {
      var W;
      (W = h2.value) == null || W.handleFlow(m);
    };
    return co(I, k, () => qa(ve)), t({
      closeMenu: qe,
      selectDate: Ke,
      clearValue: we,
      openMenu: G,
      onScroll: ee,
      formatInputValue: T,
      // exposed for testing purposes
      updateInternalModelValue: ma,
      // modify internal modelValue
      setMonthYear: pa,
      parseModel: ha,
      switchView: ba,
      toggleMenu: Jt,
      handleFlow: g
    }), (m, W) => (openBlock(), createElementBlock("div", {
      ref_key: "pickerWrapperRef",
      ref: Y,
      class: normalizeClass(i.value),
      "data-datepicker-instance": ""
    }, [
      createVNode(oo, mergeProps({
        ref_key: "inputRef",
        ref: k,
        "input-value": unref(M),
        "onUpdate:inputValue": W[0] || (W[0] = (ne) => isRef(M) ? M.value = ne : null),
        "is-menu-open": c.value
      }, m.$props, {
        onClear: we,
        onOpen: G,
        onSetInputDate: Ft,
        onSetEmptyDate: unref(_),
        onSelectDate: Ke,
        onToggle: Jt,
        onClose: qe,
        onFocus: ga,
        onBlur: ya,
        onRealBlur: W[1] || (W[1] = (ne) => p.value = false)
      }), createSlots({ _: 2 }, [
        renderList(unref(H), (ne, Me) => ({
          name: ne,
          fn: withCtx((Ee) => [
            renderSlot(m.$slots, ne, normalizeProps(guardReactiveProps(Ee)))
          ])
        }))
      ]), 1040, ["input-value", "is-menu-open", "onSetEmptyDate"]),
      (openBlock(), createBlock(resolveDynamicComponent(m.teleport ? Teleport : "div"), normalizeProps(guardReactiveProps(de.value)), {
        default: withCtx(() => [
          createVNode(Transition, {
            name: unref(O)(unref(C)),
            css: unref(z) && !unref(A).enabled
          }, {
            default: withCtx(() => [
              c.value ? (openBlock(), createElementBlock("div", mergeProps({
                key: 0,
                ref_key: "dpWrapMenuRef",
                ref: I
              }, $e.value, {
                class: { "dp--menu-wrapper": !unref(A).enabled },
                style: unref(A).enabled ? void 0 : unref(v)
              }), [
                createVNode(dn, mergeProps({
                  ref_key: "dpMenuRef",
                  ref: h2
                }, m.$props, {
                  "internal-model-value": unref(V),
                  "onUpdate:internalModelValue": W[2] || (W[2] = (ne) => isRef(V) ? V.value = ne : null),
                  class: { [b.value]: true, "dp--menu-wrapper": m.teleport },
                  "open-on-top": unref(C),
                  "no-overlay-focus": o.value,
                  collapse: B.value,
                  "get-input-rect": E,
                  onClosePicker: qe,
                  onSelectDate: Ke,
                  onAutoApply: nt,
                  onTimeUpdate: va,
                  onFlowStep: W[3] || (W[3] = (ne) => m.$emit("flow-step", ne)),
                  onUpdateMonthYear: W[4] || (W[4] = (ne) => m.$emit("update-month-year", ne)),
                  onInvalidSelect: W[5] || (W[5] = (ne) => m.$emit("invalid-select", unref(V))),
                  onAutoApplyInvalid: W[6] || (W[6] = (ne) => m.$emit("invalid-select", ne)),
                  onInvalidFixedRange: W[7] || (W[7] = (ne) => m.$emit("invalid-fixed-range", ne)),
                  onRecalculatePosition: unref(X),
                  onTooltipOpen: W[8] || (W[8] = (ne) => m.$emit("tooltip-open", ne)),
                  onTooltipClose: W[9] || (W[9] = (ne) => m.$emit("tooltip-close", ne)),
                  onTimePickerOpen: W[10] || (W[10] = (ne) => m.$emit("time-picker-open", ne)),
                  onTimePickerClose: W[11] || (W[11] = (ne) => m.$emit("time-picker-close", ne)),
                  onAmPmChange: W[12] || (W[12] = (ne) => m.$emit("am-pm-change", ne)),
                  onRangeStart: W[13] || (W[13] = (ne) => m.$emit("range-start", ne)),
                  onRangeEnd: W[14] || (W[14] = (ne) => m.$emit("range-end", ne)),
                  onDateUpdate: W[15] || (W[15] = (ne) => m.$emit("date-update", ne)),
                  onInvalidDate: W[16] || (W[16] = (ne) => m.$emit("invalid-date", ne)),
                  onOverlayToggle: W[17] || (W[17] = (ne) => m.$emit("overlay-toggle", ne))
                }), createSlots({ _: 2 }, [
                  renderList(unref(re), (ne, Me) => ({
                    name: ne,
                    fn: withCtx((Ee) => [
                      renderSlot(m.$slots, ne, normalizeProps(guardReactiveProps({ ...Ee })))
                    ])
                  }))
                ]), 1040, ["internal-model-value", "class", "open-on-top", "no-overlay-focus", "collapse", "onRecalculatePosition"])
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
var Hn = (() => {
  const e = fo;
  return e.install = (t) => {
    t.component("Vue3DatePicker", e);
  }, e;
})();
var vo = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Hn
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(vo).forEach(([e, t]) => {
  e !== "default" && (Hn[e] = t);
});
export {
  Hn as default
};
//# sourceMappingURL=@vuepic_vue-datepicker.js.map
