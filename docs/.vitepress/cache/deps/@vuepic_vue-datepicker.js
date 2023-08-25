import {
  add,
  addDays,
  addMonths,
  addYears,
  differenceInCalendarDays,
  differenceInMonths,
  eachDayOfInterval,
  endOfWeek,
  format,
  getDay,
  getHours,
  getISOWeek,
  getMinutes,
  getMonth,
  getSeconds,
  getWeek,
  getYear,
  isAfter,
  isBefore,
  isDate,
  isEqual,
  isValid,
  parse,
  parseISO,
  set,
  setHours,
  setMilliseconds,
  setMinutes,
  setMonth,
  setSeconds,
  setYear,
  startOfWeek,
  sub,
  subMonths,
  subYears
} from "./chunk-FC4E6N65.js";
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
} from "./chunk-67UUJLDS.js";
import "./chunk-UXIASGQL.js";

// node_modules/.pnpm/@vuepic+vue-datepicker@6.0.0_vue@3.3.4/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
function It() {
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
It.compatConfig = {
  MODE: 3
};
function ya() {
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
ya.compatConfig = {
  MODE: 3
};
function Cn() {
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
Cn.compatConfig = {
  MODE: 3
};
function Rn() {
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
Rn.compatConfig = {
  MODE: 3
};
function Nn() {
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
Nn.compatConfig = {
  MODE: 3
};
function On() {
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
On.compatConfig = {
  MODE: 3
};
function In() {
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
In.compatConfig = {
  MODE: 3
};
function Yn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var pa = { exports: {} };
(function(e) {
  function n(a) {
    return a && a.__esModule ? a : {
      default: a
    };
  }
  e.exports = n, e.exports.__esModule = true, e.exports.default = e.exports;
})(pa);
var qa = pa.exports;
var kn = { exports: {} };
(function(e, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a;
  function a(t) {
    if (t === null || t === true || t === false)
      return NaN;
    var o = Number(t);
    return isNaN(o) ? o : o < 0 ? Math.ceil(o) : Math.floor(o);
  }
  e.exports = n.default;
})(kn, kn.exports);
var xa = kn.exports;
var Ja = Yn(xa);
var wn = { exports: {} };
(function(e, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a;
  function a(t) {
    var o = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
    return o.setUTCFullYear(t.getFullYear()), t.getTime() - o.getTime();
  }
  e.exports = n.default;
})(wn, wn.exports);
var Xa = wn.exports;
var zn = Yn(Xa);
function Qa(e, n) {
  var a = ar(n);
  return a.formatToParts ? tr(a, e) : nr(a, e);
}
var er = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function tr(e, n) {
  try {
    for (var a = e.formatToParts(n), t = [], o = 0; o < a.length; o++) {
      var l = er[a[o].type];
      l >= 0 && (t[l] = parseInt(a[o].value, 10));
    }
    return t;
  } catch (c) {
    if (c instanceof RangeError)
      return [NaN];
    throw c;
  }
}
function nr(e, n) {
  var a = e.format(n).replace(/\u200E/g, ""), t = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(a);
  return [t[3], t[1], t[2], t[4], t[5], t[6]];
}
var on = {};
function ar(e) {
  if (!on[e]) {
    var n = new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: "America/New_York",
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), a = n === "06/25/2014, 00:00:00" || n === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
    on[e] = a ? new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: e,
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }) : new Intl.DateTimeFormat("en-US", {
      hourCycle: "h23",
      timeZone: e,
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }
  return on[e];
}
function Bn(e, n, a, t, o, l, c) {
  var h2 = /* @__PURE__ */ new Date(0);
  return h2.setUTCFullYear(e, n, a), h2.setUTCHours(t, o, l, c), h2;
}
var jn = 36e5;
var rr = 6e4;
var sn = {
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-]\d{2}):?(\d{2})$/
};
function En(e, n, a) {
  var t, o;
  if (!e || (t = sn.timezoneZ.exec(e), t))
    return 0;
  var l;
  if (t = sn.timezoneHH.exec(e), t)
    return l = parseInt(t[1], 10), Kn(l) ? -(l * jn) : NaN;
  if (t = sn.timezoneHHMM.exec(e), t) {
    l = parseInt(t[1], 10);
    var c = parseInt(t[2], 10);
    return Kn(l, c) ? (o = Math.abs(l) * jn + c * rr, l > 0 ? -o : o) : NaN;
  }
  if (sr(e)) {
    n = new Date(n || Date.now());
    var h2 = a ? n : lr(n), y = Dn(h2, e), D = a ? y : or(n, y, e);
    return -D;
  }
  return NaN;
}
function lr(e) {
  return Bn(
    e.getFullYear(),
    e.getMonth(),
    e.getDate(),
    e.getHours(),
    e.getMinutes(),
    e.getSeconds(),
    e.getMilliseconds()
  );
}
function Dn(e, n) {
  var a = Qa(e, n), t = Bn(
    a[0],
    a[1] - 1,
    a[2],
    a[3] % 24,
    a[4],
    a[5],
    0
  ).getTime(), o = e.getTime(), l = o % 1e3;
  return o -= l >= 0 ? l : 1e3 + l, t - o;
}
function or(e, n, a) {
  var t = e.getTime(), o = t - n, l = Dn(new Date(o), a);
  if (n === l)
    return n;
  o -= l - n;
  var c = Dn(new Date(o), a);
  return l === c ? l : Math.max(l, c);
}
function Kn(e, n) {
  return -23 <= e && e <= 23 && (n == null || 0 <= n && n <= 59);
}
var Gn = {};
function sr(e) {
  if (Gn[e])
    return true;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e }), Gn[e] = true, true;
  } catch {
    return false;
  }
}
var ha = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
var un = 36e5;
var Zn = 6e4;
var ur = 2;
var Ye = {
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
  timeZone: ha
};
function Mn(e, n) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e === null)
    return /* @__PURE__ */ new Date(NaN);
  var a = n || {}, t = a.additionalDigits == null ? ur : Ja(a.additionalDigits);
  if (t !== 2 && t !== 1 && t !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]")
    return new Date(e.getTime());
  if (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]")
    return new Date(e);
  if (!(typeof e == "string" || Object.prototype.toString.call(e) === "[object String]"))
    return /* @__PURE__ */ new Date(NaN);
  var o = ir(e), l = cr(o.date, t), c = l.year, h2 = l.restDateString, y = dr(h2, c);
  if (isNaN(y))
    return /* @__PURE__ */ new Date(NaN);
  if (y) {
    var D = y.getTime(), b = 0, T;
    if (o.time && (b = fr(o.time), isNaN(b)))
      return /* @__PURE__ */ new Date(NaN);
    if (o.timeZone || a.timeZone) {
      if (T = En(o.timeZone || a.timeZone, new Date(D + b)), isNaN(T))
        return /* @__PURE__ */ new Date(NaN);
    } else
      T = zn(new Date(D + b)), T = zn(new Date(D + b + T));
    return new Date(D + b + T);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function ir(e) {
  var n = {}, a = Ye.dateTimePattern.exec(e), t;
  if (a ? (n.date = a[1], t = a[3]) : (a = Ye.datePattern.exec(e), a ? (n.date = a[1], t = a[2]) : (n.date = null, t = e)), t) {
    var o = Ye.timeZone.exec(t);
    o ? (n.time = t.replace(o[1], ""), n.timeZone = o[1].trim()) : n.time = t;
  }
  return n;
}
function cr(e, n) {
  var a = Ye.YYY[n], t = Ye.YYYYY[n], o;
  if (o = Ye.YYYY.exec(e) || t.exec(e), o) {
    var l = o[1];
    return {
      year: parseInt(l, 10),
      restDateString: e.slice(l.length)
    };
  }
  if (o = Ye.YY.exec(e) || a.exec(e), o) {
    var c = o[1];
    return {
      year: parseInt(c, 10) * 100,
      restDateString: e.slice(c.length)
    };
  }
  return {
    year: null
  };
}
function dr(e, n) {
  if (n === null)
    return null;
  var a, t, o, l;
  if (e.length === 0)
    return t = /* @__PURE__ */ new Date(0), t.setUTCFullYear(n), t;
  if (a = Ye.MM.exec(e), a)
    return t = /* @__PURE__ */ new Date(0), o = parseInt(a[1], 10) - 1, xn(n, o) ? (t.setUTCFullYear(n, o), t) : /* @__PURE__ */ new Date(NaN);
  if (a = Ye.DDD.exec(e), a) {
    t = /* @__PURE__ */ new Date(0);
    var c = parseInt(a[1], 10);
    return gr(n, c) ? (t.setUTCFullYear(n, 0, c), t) : /* @__PURE__ */ new Date(NaN);
  }
  if (a = Ye.MMDD.exec(e), a) {
    t = /* @__PURE__ */ new Date(0), o = parseInt(a[1], 10) - 1;
    var h2 = parseInt(a[2], 10);
    return xn(n, o, h2) ? (t.setUTCFullYear(n, o, h2), t) : /* @__PURE__ */ new Date(NaN);
  }
  if (a = Ye.Www.exec(e), a)
    return l = parseInt(a[1], 10) - 1, Jn(n, l) ? qn(n, l) : /* @__PURE__ */ new Date(NaN);
  if (a = Ye.WwwD.exec(e), a) {
    l = parseInt(a[1], 10) - 1;
    var y = parseInt(a[2], 10) - 1;
    return Jn(n, l, y) ? qn(n, l, y) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function fr(e) {
  var n, a, t;
  if (n = Ye.HH.exec(e), n)
    return a = parseFloat(n[1].replace(",", ".")), cn(a) ? a % 24 * un : NaN;
  if (n = Ye.HHMM.exec(e), n)
    return a = parseInt(n[1], 10), t = parseFloat(n[2].replace(",", ".")), cn(a, t) ? a % 24 * un + t * Zn : NaN;
  if (n = Ye.HHMMSS.exec(e), n) {
    a = parseInt(n[1], 10), t = parseInt(n[2], 10);
    var o = parseFloat(n[3].replace(",", "."));
    return cn(a, t, o) ? a % 24 * un + t * Zn + o * 1e3 : NaN;
  }
  return null;
}
function qn(e, n, a) {
  n = n || 0, a = a || 0;
  var t = /* @__PURE__ */ new Date(0);
  t.setUTCFullYear(e, 0, 4);
  var o = t.getUTCDay() || 7, l = n * 7 + a + 1 - o;
  return t.setUTCDate(t.getUTCDate() + l), t;
}
var vr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var mr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function ba(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function xn(e, n, a) {
  if (n < 0 || n > 11)
    return false;
  if (a != null) {
    if (a < 1)
      return false;
    var t = ba(e);
    if (t && a > mr[n] || !t && a > vr[n])
      return false;
  }
  return true;
}
function gr(e, n) {
  if (n < 1)
    return false;
  var a = ba(e);
  return !(a && n > 366 || !a && n > 365);
}
function Jn(e, n, a) {
  return !(n < 0 || n > 52 || a != null && (a < 0 || a > 6));
}
function cn(e, n, a) {
  return !(e != null && (e < 0 || e >= 25) || n != null && (n < 0 || n >= 60) || a != null && (a < 0 || a >= 60));
}
var $n = { exports: {} };
var Tn = { exports: {} };
(function(e, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a;
  function a(t, o) {
    if (t == null)
      throw new TypeError("assign requires that input parameter not be null or undefined");
    for (var l in o)
      Object.prototype.hasOwnProperty.call(o, l) && (t[l] = o[l]);
    return t;
  }
  e.exports = n.default;
})(Tn, Tn.exports);
var yr = Tn.exports;
(function(e, n) {
  var a = qa.default;
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = o;
  var t = a(yr);
  function o(l) {
    return (0, t.default)({}, l);
  }
  e.exports = n.default;
})($n, $n.exports);
var pr = $n.exports;
var hr = Yn(pr);
function br(e, n, a) {
  var t = Mn(e, a), o = En(n, t, true), l = new Date(t.getTime() - o), c = /* @__PURE__ */ new Date(0);
  return c.setFullYear(l.getUTCFullYear(), l.getUTCMonth(), l.getUTCDate()), c.setHours(l.getUTCHours(), l.getUTCMinutes(), l.getUTCSeconds(), l.getUTCMilliseconds()), c;
}
function kr(e, n, a) {
  if (typeof e == "string" && !e.match(ha)) {
    var t = hr(a);
    return t.timeZone = n, Mn(e, t);
  }
  var o = Mn(e, a), l = Bn(
    o.getFullYear(),
    o.getMonth(),
    o.getDate(),
    o.getHours(),
    o.getMinutes(),
    o.getSeconds(),
    o.getMilliseconds()
  ).getTime(), c = En(n, new Date(l));
  return new Date(l + c);
}
function Xn(e) {
  return (n) => new Intl.DateTimeFormat(e, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${n}T00:00:00+00:00`)).slice(0, 2);
}
function wr(e) {
  return (n) => format(/* @__PURE__ */ new Date(`2017-01-0${n}T00:00:00+00:00`), "EEEEEE", { locale: e });
}
var Dr = (e, n, a) => {
  const t = [1, 2, 3, 4, 5, 6, 7];
  let o;
  if (e !== null)
    try {
      o = t.map(wr(e));
    } catch {
      o = t.map(Xn(n));
    }
  else
    o = t.map(Xn(n));
  const l = o.slice(0, a), c = o.slice(a + 1, o.length);
  return [o[a]].concat(...c).concat(...l);
};
var Fn = (e, n) => {
  const a = [];
  for (let t = +e[0]; t <= +e[1]; t++)
    a.push({ value: +t, text: `${t}` });
  return n ? a.reverse() : a;
};
var ka = (e, n, a) => {
  const t = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((l) => {
    const c = l < 10 ? `0${l}` : l;
    return /* @__PURE__ */ new Date(`2017-${c}-01T00:00:00+00:00`);
  });
  if (e !== null)
    try {
      const l = a === "long" ? "MMMM" : "MMM";
      return t.map((c, h2) => {
        const y = format(c, l, { locale: e });
        return {
          text: y.charAt(0).toUpperCase() + y.substring(1),
          value: h2
        };
      });
    } catch {
    }
  const o = new Intl.DateTimeFormat(n, { month: a, timeZone: "UTC" });
  return t.map((l, c) => {
    const h2 = o.format(l);
    return {
      text: h2.charAt(0).toUpperCase() + h2.substring(1),
      value: c
    };
  });
};
var Mr = (e) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e];
var Ae = (e) => {
  const n = unref(e);
  return n != null && n.$el ? n == null ? void 0 : n.$el : n;
};
var $r = (e) => Object.assign({ type: "dot" }, e);
var wa = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : false;
var Gt = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
};
var Te = (e) => e;
var Qn = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e;
var ea = (e) => e === null;
var Tr = (e) => {
  if (e)
    return [...e.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var Ar = (e) => {
  const n = [], a = (t) => t.filter((o) => o);
  for (let t = 0; t < e.length; t += 3) {
    const o = [e[t], e[t + 1], e[t + 2]];
    n.push(a(o));
  }
  return n;
};
var Rt = (e, n, a) => {
  const t = a ?? a === 0, o = n ?? n === 0;
  if (!t && !o)
    return false;
  const l = +a, c = +n;
  return t && o ? +e > l || +e < c : t ? +e > l : o ? +e < c : false;
};
var bt = (e, n) => Ar(e).map((a) => a.map((t) => {
  const { active: o, disabled: l, isBetween: c } = n(t);
  return {
    ...t,
    active: o,
    disabled: l,
    className: {
      dp__overlay_cell_active: o,
      dp__overlay_cell: !o,
      dp__overlay_cell_disabled: l,
      dp__overlay_cell_pad: true,
      dp__overlay_cell_active_disabled: l && o,
      dp__cell_in_between: c
    }
  };
}));
var ta = (e, n, a, t, o) => {
  const l = parse(e, n.slice(0, e.length), /* @__PURE__ */ new Date());
  return isValid(l) && isDate(l) ? t || o ? l : set(l, {
    hours: +a.hours,
    minutes: +(a == null ? void 0 : a.minutes),
    seconds: +(a == null ? void 0 : a.seconds),
    milliseconds: 0
  }) : null;
};
var _r = (e, n, a, t, o) => {
  const l = Array.isArray(a) ? a[0] : a;
  if (typeof n == "string")
    return ta(e, n, l, t, o);
  if (Array.isArray(n)) {
    let c = null;
    for (const h2 of n)
      if (c = ta(e, h2, l, t, o), c)
        break;
    return c;
  }
  return typeof n == "function" ? n(e) : null;
};
var S = (e) => e ? new Date(e) : /* @__PURE__ */ new Date();
var Sr = (e, n, a) => {
  if (n) {
    const o = (e.getMonth() + 1).toString().padStart(2, "0"), l = e.getDate().toString().padStart(2, "0"), c = e.getHours().toString().padStart(2, "0"), h2 = e.getMinutes().toString().padStart(2, "0"), y = a ? e.getSeconds().toString().padStart(2, "0") : "00";
    return `${e.getFullYear()}-${o}-${l}T${c}:${h2}:${y}.000Z`;
  }
  const t = Date.UTC(
    e.getUTCFullYear(),
    e.getUTCMonth(),
    e.getUTCDate(),
    e.getUTCHours(),
    e.getUTCMinutes(),
    e.getUTCSeconds()
  );
  return new Date(t).toISOString();
};
var Le = (e) => {
  let n = S(JSON.parse(JSON.stringify(e)));
  return n = setHours(n, 0), n = setMinutes(n, 0), n = setSeconds(n, 0), n = setMilliseconds(n, 0), n;
};
var tt = (e, n, a, t) => {
  let o = e ? S(e) : S();
  return (n || n === 0) && (o = setHours(o, +n)), (a || a === 0) && (o = setMinutes(o, +a)), (t || t === 0) && (o = setSeconds(o, +t)), setMilliseconds(o, 0);
};
var Pe = (e, n) => !e || !n ? false : isBefore(Le(e), Le(n));
var ye = (e, n) => !e || !n ? false : isEqual(Le(e), Le(n));
var Ne = (e, n) => !e || !n ? false : isAfter(Le(e), Le(n));
var Vn = (e, n, a) => e && e[0] && e[1] ? Ne(a, e[0]) && Pe(a, e[1]) : e && e[0] && n ? Ne(a, e[0]) && Pe(a, n) || Pe(a, e[0]) && Ne(a, n) : false;
var ze = (e) => {
  const n = set(new Date(e), { date: 1 });
  return Le(n);
};
var dn = (e, n, a) => n && (a || a === 0) ? Object.fromEntries(
  ["hours", "minutes", "seconds"].map((t) => t === n ? [t, a] : [t, isNaN(+e[t]) ? void 0 : +e[t]])
) : {
  hours: isNaN(+e.hours) ? void 0 : +e.hours,
  minutes: isNaN(+e.minutes) ? void 0 : +e.minutes,
  seconds: isNaN(+e.seconds) ? void 0 : +e.seconds
};
var ft = (e) => ({
  hours: getHours(e),
  minutes: getMinutes(e),
  seconds: getSeconds(e)
});
var Da = (e, n) => {
  if (n) {
    const a = getYear(S(n));
    if (a > e)
      return 12;
    if (a === e)
      return getMonth(S(n));
  }
};
var Ma = (e, n) => {
  if (n) {
    const a = getYear(S(n));
    return a < e ? -1 : a === e ? getMonth(S(n)) : void 0;
  }
};
var kt = (e) => {
  if (e)
    return getYear(S(e));
};
var Ze = (e, n) => n ? br(e, n) : e;
var Pr = (e, n) => n ? kr(e, n) : e;
var na = (e) => e instanceof Date ? e : parseISO(e);
var $a = (e, n) => {
  const a = Ne(e, n) ? n : e, t = Ne(n, e) ? n : e;
  return eachDayOfInterval({ start: a, end: t });
};
var Cr = (e) => {
  const n = addMonths(e, 1);
  return { month: getMonth(n), year: getYear(n) };
};
var jt = (e, n, a) => {
  const t = startOfWeek(Ze(e, n), { weekStartsOn: +a }), o = endOfWeek(Ze(e, n), { weekStartsOn: +a });
  return [t, o];
};
var Ta = (e, n) => {
  const a = {
    hours: getHours(S()),
    minutes: getMinutes(S()),
    seconds: n ? getSeconds(S()) : 0
  };
  return Object.assign(a, e);
};
var et = (e, n, a) => [set(S(e), { date: 1 }), set(S(), { month: n, year: a, date: 1 })];
var Je = (e, n, a) => {
  let t = e ? S(e) : S();
  return (n || n === 0) && (t = setMonth(t, n)), a && (t = setYear(t, a)), t;
};
var Aa = (e, n, a, t, o) => {
  if (!t || o && !n || !o && !a)
    return false;
  const l = o ? addMonths(e, 1) : subMonths(e, 1), c = [getMonth(l), getYear(l)];
  return o ? !Nr(...c, n) : !Rr(...c, a);
};
var Rr = (e, n, a) => Pe(...et(a, e, n)) || ye(...et(a, e, n));
var Nr = (e, n, a) => Ne(...et(a, e, n)) || ye(...et(a, e, n));
var _a = (e, n, a, t, o, l) => {
  if (typeof n == "function")
    return n(e);
  const c = a ? { locale: a } : void 0;
  return Array.isArray(e) ? `${format(e[0], l, c)}${o && !e[1] ? "" : t}${e[1] ? format(e[1], l, c) : ""}` : format(e, l, c);
};
var gt = (e) => {
  if (e)
    return null;
  throw new Error(Gt.prop("partial-range"));
};
var Ht = (e, n) => {
  if (n)
    return e();
  throw new Error(Gt.prop("range"));
};
var An = (e) => Array.isArray(e) ? isValid(e[0]) && (e[1] ? isValid(e[1]) : true) : e ? isValid(e) : false;
var Or = (e) => set(S(), {
  hours: +e.hours || 0,
  minutes: +e.minutes || 0,
  seconds: +e.seconds || 0
});
var fn = (e, n, a, t) => {
  if (!e)
    return true;
  if (t) {
    const o = a === "max" ? isBefore(e, n) : isAfter(e, n), l = { seconds: 0, milliseconds: 0 };
    return o || isEqual(set(e, l), set(n, l));
  }
  return a === "max" ? e.getTime() <= n.getTime() : e.getTime() >= n.getTime();
};
var aa = (e, n, a, t, o) => {
  const l = e ? Or(e) : S(n);
  return Array.isArray(t) ? fn(t[0], l, a, !!n) && fn(t[1], l, a, !!n) && o : fn(t, l, a, !!n) && o;
};
var vn = (e) => set(S(), ft(e));
var Ir = (e, n) => Array.isArray(e) ? e.map((a) => S(a)).filter((a) => getYear(S(a)) === n).map((a) => getMonth(a)) : [];
var At = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Sa = () => {
  const e = (t) => {
    At.menuFocused = t;
  }, n = (t) => {
    At.shiftKeyInMenu !== t && (At.shiftKeyInMenu = t);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: At.shiftKeyInMenu, menuFocused: At.menuFocused })),
    setMenuFocused: e,
    setShiftKey: n
  };
};
var be = reactive({
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
var mn = ref(null);
var Lt = ref(false);
var gn = ref(false);
var yn = ref(false);
var pn = ref(false);
var Oe = ref(0);
var Se = ref(0);
var rt = () => {
  const e = computed(() => Lt.value ? [...be.selectionGrid, be.actionRow].filter(($) => $.length) : gn.value ? [
    ...be.timePicker[0],
    ...be.timePicker[1],
    pn.value ? [] : [mn.value],
    be.actionRow
  ].filter(($) => $.length) : yn.value ? [...be.monthPicker, be.actionRow] : [be.monthYear, ...be.calendar, be.time, be.actionRow].filter(($) => $.length)), n = ($) => {
    Oe.value = $ ? Oe.value + 1 : Oe.value - 1;
    let W = null;
    e.value[Se.value] && (W = e.value[Se.value][Oe.value]), W || (Oe.value = $ ? Oe.value - 1 : Oe.value + 1);
  }, a = ($) => {
    if (Se.value === 0 && !$ || Se.value === e.value.length && $)
      return;
    Se.value = $ ? Se.value + 1 : Se.value - 1, e.value[Se.value] ? e.value[Se.value] && !e.value[Se.value][Oe.value] && Oe.value !== 0 && (Oe.value = e.value[Se.value].length - 1) : Se.value = $ ? Se.value - 1 : Se.value + 1;
  }, t = ($) => {
    let W = null;
    e.value[Se.value] && (W = e.value[Se.value][Oe.value]), W ? W.focus({ preventScroll: !Lt.value }) : Oe.value = $ ? Oe.value - 1 : Oe.value + 1;
  }, o = () => {
    n(true), t(true);
  }, l = () => {
    n(false), t(false);
  }, c = () => {
    a(false), t(true);
  }, h2 = () => {
    a(true), t(true);
  }, y = ($, W) => {
    be[W] = $;
  }, D = ($, W) => {
    be[W] = $;
  }, b = () => {
    Oe.value = 0, Se.value = 0;
  };
  return {
    buildMatrix: y,
    buildMultiLevelMatrix: D,
    setTimePickerBackRef: ($) => {
      mn.value = $;
    },
    setSelectionGrid: ($) => {
      Lt.value = $, b(), $ || (be.selectionGrid = []);
    },
    setTimePicker: ($, W = false) => {
      gn.value = $, pn.value = W, b(), $ || (be.timePicker[0] = [], be.timePicker[1] = []);
    },
    setTimePickerElements: ($, W = 0) => {
      be.timePicker[W] = $;
    },
    arrowRight: o,
    arrowLeft: l,
    arrowUp: c,
    arrowDown: h2,
    clearArrowNav: () => {
      be.monthYear = [], be.calendar = [], be.time = [], be.actionRow = [], be.selectionGrid = [], be.timePicker[0] = [], be.timePicker[1] = [], Lt.value = false, gn.value = false, pn.value = false, yn.value = false, b(), mn.value = null;
    },
    setMonthPicker: ($) => {
      yn.value = $, b();
    },
    refSets: be
    // exposed for testing
  };
};
var ra = (e) => Object.assign(
  {
    menuAppearTop: "dp-menu-appear-top",
    menuAppearBottom: "dp-menu-appear-bottom",
    open: "dp-slide-down",
    close: "dp-slide-up",
    next: "calendar-next",
    previous: "calendar-prev",
    vNext: "dp-slide-up",
    vPrevious: "dp-slide-down"
  },
  e
);
var Yr = (e) => Object.assign(
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
    nextYear: "Next year",
    prevYear: "Previous year",
    day: () => ""
  },
  e
);
var la = (e) => e ? typeof e == "boolean" ? e ? 2 : 0 : +e >= 2 ? +e : 2 : 0;
var Br = (e) => {
  const n = typeof e == "object" && e, a = {
    static: true,
    solo: false
  };
  if (!e)
    return { ...a, count: la(false) };
  const t = n ? e : {}, o = n ? t.count ?? true : e, l = la(o);
  return Object.assign(a, t, { count: l });
};
var Er = (e, n, a) => e || (typeof a == "string" ? a : n);
var Fr = (e) => typeof e == "boolean" ? e ? ra({}) : false : ra(e);
var Vr = (e) => {
  const n = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: true,
    rangeSeparator: " - "
  };
  return typeof e == "object" ? { ...n, ...e ?? {}, enabled: true } : { ...n, enabled: e };
};
var Hr = (e) => Object.assign({ months: [], years: [], times: { hours: [], minutes: [], seconds: [] } }, e);
var Lr = (e) => Object.assign({ showSelect: true, showCancel: true, showNow: false, showPreview: true }, e);
var Ur = (e) => {
  const n = { input: false };
  return typeof e == "object" ? Object.assign(n, e, { enabled: true }) : {
    enabled: e,
    ...n
  };
};
var Ce = (e) => {
  const n = () => {
    const K = e.enableSeconds ? ":ss" : "";
    return e.is24 ? `HH:mm${K}` : `hh:mm${K} aa`;
  }, a = () => e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? n() : e.weekPicker ? "MM/dd/yyyy" : e.yearPicker ? "yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${n()}` : "MM/dd/yyyy", t = (K) => Ta(K, e.enableSeconds), o = () => e.range ? e.startTime && Array.isArray(e.startTime) ? [t(e.startTime[0]), t(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? t(e.startTime) : null, l = computed(() => Br(e.multiCalendars)), c = computed(() => o()), h2 = computed(() => Yr(e.ariaLabels)), y = computed(() => Hr(e.filters)), D = computed(() => Fr(e.transitions)), b = computed(() => Lr(e.actionRow)), T = computed(
    () => Er(e.previewFormat, e.format, a())
  ), Y = computed(() => Vr(e.textInput)), q = computed(() => Ur(e.inline));
  return {
    defaultedTransitions: D,
    defaultedMultiCalendars: l,
    defaultedStartTime: c,
    defaultedAriaLabels: h2,
    defaultedFilters: y,
    defaultedActionRow: b,
    defaultedPreviewFormat: T,
    defaultedTextInput: Y,
    defaultedInline: q,
    getDefaultPattern: a,
    getDefaultStartTime: o
  };
};
var Wr = (e, n, a) => {
  const t = ref(), { defaultedTextInput: o, getDefaultPattern: l } = Ce(n), c = ref(""), h2 = toRef(n, "format");
  watch(t, () => {
    e("internal-model-change", t.value);
  }), watch(h2, () => {
    U();
  });
  const y = (r) => Pr(r, n.timezone), D = (r) => Ze(r, n.timezone), b = (r, L) => _a(
    r,
    n.format,
    n.formatLocale,
    o.value.rangeSeparator,
    n.modelAuto,
    L ?? l()
  ), T = (r) => {
    const L = r ?? S();
    return n.modelType ? w(L) : {
      hours: getHours(L),
      minutes: getMinutes(L),
      seconds: n.enableSeconds ? getSeconds(L) : 0
    };
  }, Y = (r) => n.modelType ? w(r) : { month: getMonth(r), year: getYear(r) }, q = (r) => Array.isArray(r) ? Ht(
    () => [
      setYear(S(), r[0]),
      r[1] ? setYear(S(), r[1]) : gt(n.partialRange)
    ],
    n.range
  ) : setYear(S(), +r), K = (r, L) => (typeof r == "string" || typeof r == "number") && n.modelType ? d(r) : L, X = (r) => Array.isArray(r) ? [
    K(
      r[0],
      tt(null, +r[0].hours, +r[0].minutes, r[0].seconds)
    ),
    K(
      r[1],
      tt(null, +r[1].hours, +r[1].minutes, r[1].seconds)
    )
  ] : K(r, tt(null, r.hours, r.minutes, r.seconds)), k = (r) => Array.isArray(r) ? n.multiDates ? r.map((L) => K(L, Je(null, +L.month, +L.year))) : Ht(
    () => [
      K(r[0], Je(null, +r[0].month, +r[0].year)),
      K(
        r[1],
        r[1] ? Je(null, +r[1].month, +r[1].year) : gt(n.partialRange)
      )
    ],
    n.range
  ) : K(r, Je(null, +r.month, +r.year)), $ = (r) => {
    if (Array.isArray(r))
      return r.map((L) => d(L));
    throw new Error(Gt.dateArr("multi-dates"));
  }, W = (r) => {
    if (Array.isArray(r))
      return [S(r[0]), S(r[1])];
    throw new Error(Gt.dateArr("week-picker"));
  }, V = (r) => n.modelAuto ? Array.isArray(r) ? [d(r[0]), d(r[1])] : n.autoApply ? [d(r)] : [d(r), null] : Array.isArray(r) ? Ht(
    () => [
      d(r[0]),
      r[1] ? d(r[1]) : gt(n.partialRange)
    ],
    n.range
  ) : d(r), G = () => {
    Array.isArray(t.value) && n.range && t.value.length === 1 && t.value.push(gt(n.partialRange));
  }, P = () => {
    const r = t.value;
    return [
      w(r[0]),
      r[1] ? w(r[1]) : gt(n.partialRange)
    ];
  }, ee = () => t.value[1] ? P() : w(Te(t.value[0])), p = () => (t.value || []).map((r) => w(r)), _ = () => (G(), n.modelAuto ? ee() : n.multiDates ? p() : Array.isArray(t.value) ? Ht(() => P(), n.range) : w(Te(t.value))), A = (r) => !r || Array.isArray(r) && !r.length ? null : n.timePicker ? X(Te(r)) : n.monthPicker ? k(Te(r)) : n.yearPicker ? q(Te(r)) : n.multiDates ? $(Te(r)) : n.weekPicker ? W(Te(r)) : V(Te(r)), H = (r) => {
    const L = A(r);
    An(Te(L)) ? (t.value = Te(L), U()) : (t.value = null, c.value = "");
  }, z = () => {
    const r = (L) => format(L, o.value.format);
    return `${r(t.value[0])} ${o.value.rangeSeparator} ${t.value[1] ? r(t.value[1]) : ""}`;
  }, Q = () => a.value && t.value ? Array.isArray(t.value) ? z() : format(t.value, o.value.format) : b(t.value), f = () => t.value ? n.multiDates ? t.value.map((r) => b(r)).join("; ") : o.value.enabled && typeof o.value.format == "string" ? Q() : b(t.value) : "", U = () => {
    !n.format || typeof n.format == "string" || o.value.enabled && typeof o.value.format == "string" ? c.value = f() : c.value = n.format(t.value);
  }, d = (r) => {
    if (n.utc) {
      const L = new Date(r);
      return n.utc === "preserve" ? new Date(L.getTime() + L.getTimezoneOffset() * 6e4) : L;
    }
    return n.modelType ? n.modelType === "date" || n.modelType === "timestamp" ? D(new Date(r)) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? parse(r, l(), /* @__PURE__ */ new Date()) : D(parse(r, n.modelType, /* @__PURE__ */ new Date())) : D(new Date(r));
  }, w = (r) => r ? n.utc ? Sr(r, n.utc === "preserve", n.enableSeconds) : n.modelType ? n.modelType === "timestamp" ? +y(r) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? b(y(r)) : b(y(r), n.modelType) : y(r) : "", u = (r, L = false) => {
    if (e("update:model-value", r), n.emitTimezone && L) {
      const R = Array.isArray(r) ? r.map((m) => Ze(Te(m)), n.emitTimezone) : Ze(Te(r), n.emitTimezone);
      e("update:model-timezone-value", R);
    }
  }, g = (r) => Array.isArray(t.value) ? n.multiDates ? t.value.map((L) => r(L)) : [
    r(t.value[0]),
    t.value[1] ? r(t.value[1]) : gt(n.partialRange)
  ] : r(Te(t.value)), s = (r) => u(Te(g(r)));
  return {
    inputValue: c,
    internalModelValue: t,
    checkBeforeEmit: () => t.value ? n.range ? n.partialRange ? t.value.length >= 1 : t.value.length === 2 : !!t.value : false,
    parseExternalModelValue: H,
    formatInputValue: U,
    emitModelValue: () => (U(), n.monthPicker ? s(Y) : n.timePicker ? s(T) : n.yearPicker ? s(getYear) : n.weekPicker ? u(t.value, true) : u(_(), true))
  };
};
var zr = (e, n) => {
  const { defaultedFilters: a } = Ce(e), { validateMonthYearInRange: t } = Bt(e), o = (D, b) => {
    let T = D;
    return a.value.months.includes(getMonth(T)) ? (T = b ? addMonths(D, 1) : subMonths(D, 1), o(T, b)) : T;
  }, l = (D, b) => {
    let T = D;
    return a.value.years.includes(getYear(T)) ? (T = b ? addYears(D, 1) : subYears(D, 1), l(T, b)) : T;
  }, c = (D) => {
    const b = set(/* @__PURE__ */ new Date(), { month: e.month, year: e.year });
    let T = D ? addMonths(b, 1) : subMonths(b, 1);
    e.disableYearSelect && (T = setYear(T, e.year));
    let Y = getMonth(T), q = getYear(T);
    a.value.months.includes(Y) && (T = o(T, D), Y = getMonth(T), q = getYear(T)), a.value.years.includes(q) && (T = l(T, D), q = getYear(T)), t(Y, q, D, e.preventMinMaxNavigation) && h2(Y, q);
  }, h2 = (D, b) => {
    n("update-month-year", { month: D, year: b });
  }, y = computed(() => (D) => Aa(
    set(/* @__PURE__ */ new Date(), { month: e.month, year: e.year }),
    e.maxDate,
    e.minDate,
    e.preventMinMaxNavigation,
    D
  ));
  return { handleMonthYearChange: c, isDisabled: y, updateMonthYear: h2 };
};
var yt = ((e) => (e.center = "center", e.left = "left", e.right = "right", e))(yt || {});
var We = ((e) => (e.month = "month", e.year = "year", e))(We || {});
var st = ((e) => (e.top = "top", e.bottom = "bottom", e))(st || {});
var vt = ((e) => (e.header = "header", e.calendar = "calendar", e.timePicker = "timePicker", e))(vt || {});
var jr = (e, n, a, t, o, l, c) => {
  const h2 = ref({}), y = ref(false), D = ref({
    top: "0",
    left: "0"
  }), b = ref(false), T = toRef(c, "teleportCenter");
  watch(T, () => {
    D.value = JSON.parse(JSON.stringify({})), V();
  });
  const Y = (d) => {
    if (c.teleport) {
      const w = d.getBoundingClientRect();
      return {
        left: w.left + window.scrollX,
        top: w.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, q = (d, w) => {
    D.value.left = `${d + w - h2.value.width}px`;
  }, K = (d) => {
    D.value.left = `${d}px`;
  }, X = (d, w) => {
    c.position === yt.left && K(d), c.position === yt.right && q(d, w), c.position === yt.center && (D.value.left = `${d + w / 2 - h2.value.width / 2}px`);
  }, k = (d) => {
    const { width: w, height: u } = d.getBoundingClientRect(), { top: g, left: s } = c.altPosition ? c.altPosition(d) : Y(d);
    return { top: +g, left: +s, width: w, height: u };
  }, $ = () => {
    D.value.left = "50%", D.value.top = "50%", D.value.transform = "translate(-50%, -50%)", D.value.position = "fixed", delete D.value.opacity;
  }, W = () => {
    const d = Ae(a), { top: w, left: u, transform: g } = c.altPosition(d);
    D.value = { top: `${w}px`, left: `${u}px`, transform: g ?? "" };
  }, V = (d = true) => {
    var w;
    if (!o.value.enabled) {
      if (T.value)
        return $();
      if (c.altPosition !== null)
        return W();
      if (d) {
        const u = c.teleport ? (w = n.value) == null ? void 0 : w.$el : e.value;
        u && (h2.value = u.getBoundingClientRect()), l("recalculate-position");
      }
      return H();
    }
  }, G = ({ inputEl: d, left: w, width: u }) => {
    window.screen.width > 768 && !y.value && X(w, u), p(d);
  }, P = (d) => {
    const { top: w, left: u, height: g, width: s } = k(d);
    D.value.top = `${g + w + +c.offset}px`, b.value = false, y.value || (D.value.left = `${u + s / 2 - h2.value.width / 2}px`), G({ inputEl: d, left: u, width: s });
  }, ee = (d) => {
    const { top: w, left: u, width: g } = k(d);
    D.value.top = `${w - +c.offset - h2.value.height}px`, b.value = true, G({ inputEl: d, left: u, width: g });
  }, p = (d) => {
    if (c.autoPosition) {
      const { left: w, width: u } = k(d), { left: g, right: s } = h2.value;
      if (!y.value) {
        if (Math.abs(g) !== Math.abs(s)) {
          if (g <= 0)
            return y.value = true, K(w);
          if (s >= document.documentElement.clientWidth)
            return y.value = true, q(w, u);
        }
        return X(w, u);
      }
    }
  }, _ = () => {
    const d = Ae(a);
    if (d) {
      const { height: w } = h2.value, { top: u, height: g } = d.getBoundingClientRect(), C = window.innerHeight - u - g, ne = u;
      return w <= C ? st.bottom : w > C && w <= ne ? st.top : C >= ne ? st.bottom : st.top;
    }
    return st.bottom;
  }, A = (d) => _() === st.bottom ? P(d) : ee(d), H = () => {
    const d = Ae(a);
    if (d)
      return c.autoPosition ? A(d) : P(d);
  }, z = function(d) {
    if (d) {
      const w = d.scrollHeight > d.clientHeight, g = window.getComputedStyle(d).overflowY.indexOf("hidden") !== -1;
      return w && !g;
    }
    return true;
  }, Q = function(d) {
    return !d || d === document.body || d.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : z(d) ? d : Q(d.parentNode);
  }, f = (d) => {
    if (d)
      switch (c.position) {
        case yt.left:
          return { left: 0, transform: "translateX(0)" };
        case yt.right:
          return { left: `${d.width}px`, transform: "translateX(-100%)" };
        default:
          return { left: `${d.width / 2}px`, transform: "translateX(-50%)" };
      }
    return {};
  };
  return {
    openOnTop: b,
    menuStyle: D,
    xCorrect: y,
    setMenuPosition: V,
    getScrollableParent: Q,
    shadowRender: (d, w) => {
      var L, R, m;
      const u = document.createElement("div"), g = (L = Ae(a)) == null ? void 0 : L.getBoundingClientRect();
      u.setAttribute("id", "dp--temp-container");
      const s = (R = t.value) != null && R.clientWidth ? t.value : document.body;
      s.append(u);
      const C = document.getElementById("dp--temp-container"), ne = f(g), r = h(d, {
        ...w,
        shadow: true,
        style: { opacity: 0, position: "absolute", ...ne }
      });
      render(r, C), h2.value = (m = r.el) == null ? void 0 : m.getBoundingClientRect(), render(null, C), s.removeChild(C);
    }
  };
};
var ot = [
  { name: "clock-icon", use: ["time", "calendar", "shared"] },
  { name: "arrow-left", use: ["month-year", "calendar", "shared"] },
  { name: "arrow-right", use: ["month-year", "calendar", "shared"] },
  { name: "arrow-up", use: ["time", "calendar", "month-year", "shared"] },
  { name: "arrow-down", use: ["time", "calendar", "month-year", "shared"] },
  { name: "calendar-icon", use: ["month-year", "time", "calendar", "shared"] },
  { name: "day", use: ["calendar", "shared"] },
  { name: "month-overlay-value", use: ["calendar", "month-year", "shared"] },
  { name: "year-overlay-value", use: ["calendar", "month-year", "shared"] },
  { name: "year-overlay", use: ["month-year", "shared"] },
  { name: "month-overlay", use: ["month-year", "shared"] },
  { name: "month-overlay-header", use: ["month-year", "shared"] },
  { name: "year-overlay-header", use: ["month-year", "shared"] },
  { name: "hours-overlay-value", use: ["calendar", "time", "shared"] },
  { name: "minutes-overlay-value", use: ["calendar", "time", "shared"] },
  { name: "seconds-overlay-value", use: ["calendar", "time", "shared"] },
  { name: "hours", use: ["calendar", "time", "shared"] },
  { name: "minutes", use: ["calendar", "time", "shared"] },
  { name: "month", use: ["calendar", "month-year", "shared"] },
  { name: "year", use: ["calendar", "month-year", "shared"] },
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
  { name: "marker", use: ["calendar", "shared"] }
];
var Kr = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var Gr = {
  all: () => ot,
  monthYear: () => ot.filter((e) => e.use.includes("month-year")),
  input: () => Kr,
  timePicker: () => ot.filter((e) => e.use.includes("time")),
  action: () => ot.filter((e) => e.use.includes("action")),
  calendar: () => ot.filter((e) => e.use.includes("calendar")),
  menu: () => ot.filter((e) => e.use.includes("menu")),
  shared: () => ot.filter((e) => e.use.includes("shared"))
};
var je = (e, n, a) => {
  const t = [];
  return Gr[n]().forEach((o) => {
    e[o.name] && t.push(o.name);
  }), a != null && a.length && a.forEach((o) => {
    o.slot && t.push(o.slot);
  }), t;
};
var Yt = (e) => {
  const n = computed(() => (t) => e.value ? t ? e.value.open : e.value.close : ""), a = computed(() => (t) => e.value ? t ? e.value.menuAppearTop : e.value.menuAppearBottom : "");
  return { transitionName: n, showTransition: !!e.value, menuTransition: a };
};
var Zt = (e, n) => {
  const a = ref([{ month: getMonth(S()), year: getYear(S()) }]), t = reactive({
    hours: e.range ? [getHours(S()), getHours(S())] : getHours(S()),
    minutes: e.range ? [getMinutes(S()), getMinutes(S())] : getMinutes(S()),
    seconds: e.range ? [0, 0] : 0
  }), o = computed({
    get: () => e.internalModelValue,
    set: (h2) => {
      !e.readonly && !e.disabled && n("update:internal-model-value", h2);
    }
  }), l = computed(
    () => (h2) => a.value[h2] ? a.value[h2].month : 0
  ), c = computed(
    () => (h2) => a.value[h2] ? a.value[h2].year : 0
  );
  return {
    calendars: a,
    time: t,
    modelValue: o,
    month: l,
    year: c
  };
};
var Zr = (e, n) => {
  const { defaultedMultiCalendars: a } = Ce(n), { isDisabled: t, matchDate: o } = Bt(n), l = ref(null), c = ref(S()), h2 = (s) => {
    !s.current && n.hideOffsetDates || (l.value = s.value);
  }, y = () => {
    l.value = null;
  }, D = (s) => Array.isArray(e.value) && n.range && e.value[0] && l.value ? s ? Ne(l.value, e.value[0]) : Pe(l.value, e.value[0]) : true, b = (s, C) => {
    const ne = () => e.value ? C ? e.value[0] || null : e.value[1] : null, r = e.value && Array.isArray(e.value) ? ne() : null;
    return ye(S(s.value), r);
  }, T = (s) => {
    const C = Array.isArray(e.value) ? e.value[0] : null;
    return s ? !Pe(l.value ?? null, C) : true;
  }, Y = (s, C = true) => (n.range || n.weekPicker) && Array.isArray(e.value) && e.value.length === 2 ? n.hideOffsetDates && !s.current ? false : ye(S(s.value), e.value[C ? 0 : 1]) : n.range ? b(s, C) && T(C) || ye(s.value, Array.isArray(e.value) ? e.value[0] : null) && D(C) : false, q = (s, C, ne) => Array.isArray(e.value) && e.value[0] && e.value.length === 1 ? s ? false : ne ? Ne(e.value[0], C.value) : Pe(e.value[0], C.value) : false, K = (s) => !e.value || n.hideOffsetDates && !s.current ? false : n.range ? n.modelAuto && Array.isArray(e.value) ? ye(s.value, e.value[0] ? e.value[0] : c.value) : false : n.multiDates && Array.isArray(e.value) ? e.value.some((C) => ye(C, s.value)) : ye(s.value, e.value ? e.value : c.value), X = (s) => {
    if (n.autoRange || n.weekPicker) {
      if (l.value) {
        if (n.hideOffsetDates && !s.current)
          return false;
        const C = addDays(l.value, +n.autoRange), ne = jt(S(l.value), n.timezone, n.weekStart);
        return n.weekPicker ? ye(ne[1], S(s.value)) : ye(C, S(s.value));
      }
      return false;
    }
    return false;
  }, k = (s) => {
    if (n.autoRange || n.weekPicker) {
      if (l.value) {
        const C = addDays(l.value, +n.autoRange);
        if (n.hideOffsetDates && !s.current)
          return false;
        const ne = jt(S(l.value), n.timezone, n.weekStart);
        return n.weekPicker ? Ne(s.value, ne[0]) && Pe(s.value, ne[1]) : Ne(s.value, l.value) && Pe(s.value, C);
      }
      return false;
    }
    return false;
  }, $ = (s) => {
    if (n.autoRange || n.weekPicker) {
      if (l.value) {
        if (n.hideOffsetDates && !s.current)
          return false;
        const C = jt(S(l.value), n.timezone, n.weekStart);
        return n.weekPicker ? ye(C[0], s.value) : ye(l.value, s.value);
      }
      return false;
    }
    return false;
  }, W = (s) => Vn(e.value, l.value, s.value), V = () => n.modelAuto && Array.isArray(n.internalModelValue) ? !!n.internalModelValue[0] : false, G = () => n.modelAuto ? wa(n.internalModelValue) : true, P = (s) => {
    if (Array.isArray(e.value) && e.value.length || n.weekPicker)
      return false;
    const C = n.range ? !Y(s) && !Y(s, false) : true;
    return !t(s.value) && !K(s) && !(!s.current && n.hideOffsetDates) && C;
  }, ee = (s) => n.range ? n.modelAuto ? V() && K(s) : false : K(s), p = (s) => {
    var C;
    return n.highlight ? o(
      s.value,
      (C = n.arrMapValues) != null && C.highlightedDates ? n.arrMapValues.highlightedDates : n.highlight
    ) : false;
  }, _ = (s) => t(s.value) && n.highlightDisabledDays === false, A = (s) => n.highlightWeekDays && n.highlightWeekDays.includes(s.value.getDay()), H = (s) => (n.range || n.weekPicker) && (!(a.value.count > 0) || s.current) && G() && !(!s.current && n.hideOffsetDates) && !K(s) ? W(s) : false, z = (s) => {
    const { isRangeStart: C, isRangeEnd: ne } = U(s), r = n.range ? C || ne : false;
    return {
      dp__cell_offset: !s.current,
      dp__pointer: !n.disabled && !(!s.current && n.hideOffsetDates) && !t(s.value),
      dp__cell_disabled: t(s.value),
      dp__cell_highlight: !_(s) && (p(s) || A(s)) && !ee(s) && !r,
      dp__cell_highlight_active: !_(s) && (p(s) || A(s)) && ee(s),
      dp__today: !n.noToday && ye(s.value, c.value) && s.current
    };
  }, Q = (s) => ({
    dp__active_date: ee(s),
    dp__date_hover: P(s)
  }), f = (s) => ({
    ...d(s),
    ...w(s),
    dp__range_between_week: H(s) && n.weekPicker
  }), U = (s) => {
    const C = a.value.count > 0 ? s.current && Y(s) && G() : Y(s) && G(), ne = a.value.count > 0 ? s.current && Y(s, false) && G() : Y(s, false) && G();
    return { isRangeStart: C, isRangeEnd: ne };
  }, d = (s) => {
    const { isRangeStart: C, isRangeEnd: ne } = U(s);
    return {
      dp__range_start: C,
      dp__range_end: ne,
      dp__range_between: H(s) && !n.weekPicker,
      dp__date_hover_start: q(P(s), s, true),
      dp__date_hover_end: q(P(s), s, false)
    };
  }, w = (s) => ({
    ...d(s),
    dp__cell_auto_range: k(s),
    dp__cell_auto_range_start: $(s),
    dp__cell_auto_range_end: X(s)
  }), u = (s) => n.range ? n.autoRange ? w(s) : n.modelAuto ? { ...Q(s), ...d(s) } : d(s) : n.weekPicker ? f(s) : Q(s);
  return {
    setHoverDate: h2,
    clearHoverDate: y,
    getDayClassData: (s) => n.hideOffsetDates && !s.current ? {} : {
      ...z(s),
      ...u(s),
      [n.dayClass ? n.dayClass(s.value) : ""]: true,
      [n.calendarCellClassName]: !!n.calendarCellClassName
    }
  };
};
var Bt = (e) => {
  const { defaultedFilters: n } = Ce(e), a = (p) => {
    const _ = Le(t(S(p))).toISOString(), [A] = _.split("T");
    return A;
  }, t = (p) => Ze(p, e.timezone), o = (p) => {
    var u;
    const _ = e.maxDate ? Ne(t(p), t(S(e.maxDate))) : false, A = e.minDate ? Pe(t(p), t(S(e.minDate))) : false, H = y(
      p,
      (u = e.arrMapValues) != null && u.disabledDates ? e.arrMapValues.disabledDates : e.disabledDates
    ), Q = n.value.months.map((g) => +g).includes(getMonth(p)), f = e.disabledWeekDays.length ? e.disabledWeekDays.some((g) => +g === getDay(p)) : false, U = b(p), d = getYear(p), w = d < +e.yearRange[0] || d > +e.yearRange[1];
    return !(_ || A || H || Q || w || f || U);
  }, l = (p, _) => Pe(...et(e.minDate, p, _)) || ye(...et(e.minDate, p, _)), c = (p, _) => Ne(...et(e.maxDate, p, _)) || ye(...et(e.maxDate, p, _)), h2 = (p, _, A) => {
    let H = false;
    return e.maxDate && A && c(p, _) && (H = true), e.minDate && !A && l(p, _) && (H = true), H;
  }, y = (p, _) => p ? _ instanceof Map ? !!_.get(a(p)) : Array.isArray(_) ? _.some((A) => ye(t(S(A)), t(p))) : _ ? _(S(JSON.parse(JSON.stringify(p)))) : false : true, D = (p, _, A, H) => {
    let z = false;
    return H ? e.minDate && e.maxDate ? z = h2(p, _, A) : (e.minDate && l(p, _) || e.maxDate && c(p, _)) && (z = true) : z = true, z;
  }, b = (p) => {
    var _, A, H, z, Q;
    return Array.isArray(e.allowedDates) && !((_ = e.allowedDates) != null && _.length) ? true : (A = e.arrMapValues) != null && A.allowedDates ? !y(p, (H = e.arrMapValues) == null ? void 0 : H.allowedDates) : (z = e.allowedDates) != null && z.length ? !((Q = e.allowedDates) != null && Q.some((f) => ye(t(S(f)), t(p)))) : false;
  }, T = (p) => !o(p), Y = (p) => !eachDayOfInterval({ start: p[0], end: p[1] }).some((A) => T(A)), q = (p, _, A = 0) => {
    if (Array.isArray(_) && _[A]) {
      const H = differenceInCalendarDays(p, _[A]), z = $a(_[A], p), Q = z.length === 1 ? 0 : z.filter((U) => T(U)).length, f = Math.abs(H) - Q;
      if (e.minRange && e.maxRange)
        return f >= +e.minRange && f <= +e.maxRange;
      if (e.minRange)
        return f >= +e.minRange;
      if (e.maxRange)
        return f <= +e.maxRange;
    }
    return true;
  }, K = (p) => new Map(p.map((_) => [a(_), true])), X = (p) => Array.isArray(p) && p.length > 0, k = (p) => {
    X(e.allowedDates) && (p.allowedDates = K(e.allowedDates)), X(e.highlight) && (p.highlightedDates = K(e.highlight)), X(e.disabledDates) && (p.disabledDates = K(e.disabledDates));
  }, $ = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, W = (p) => Array.isArray(p) ? [p[0] ? vn(p[0]) : null, p[1] ? vn(p[1]) : null] : vn(p), V = (p, _) => !(Array.isArray(_) ? _ : [_]).some((z) => e.disabledTimes.find(
    (Q) => +Q.hours === getHours(z) && Q.minutes === "*" ? true : +Q.minutes === getMinutes(z)
  )) && p, G = (p, _) => {
    const A = Array.isArray(_) ? [ft(_[0]), _[1] ? ft(_[1]) : void 0] : ft(_), H = !e.disabledTimes(A);
    return p && H;
  }, P = (p, _) => e.disabledTimes ? Array.isArray(e.disabledTimes) ? V(_, p) : G(_, p) : _;
  return {
    isDisabled: T,
    validateDate: o,
    validateMonthYearInRange: D,
    isDateRangeAllowed: Y,
    checkMinMaxRange: q,
    matchDate: y,
    mapDatesArrToMap: k,
    isValidTime: (p) => {
      let _ = true;
      if (!p || $())
        return true;
      const A = !e.minDate && !e.maxDate ? W(p) : p;
      return (e.maxTime || e.maxDate) && (_ = aa(e.maxTime, e.maxDate, "max", Te(A), _)), (e.minTime || e.minDate) && (_ = aa(e.minTime, e.minDate, "min", Te(A), _)), P(p, _);
    }
  };
};
var qt = () => {
  const e = computed(() => (t, o) => t == null ? void 0 : t.includes(o)), n = computed(() => (t, o) => t.count ? t.solo ? true : o === 0 : true), a = computed(() => (t, o) => t.count ? t.solo ? true : o === t.count - 1 : true);
  return { hideNavigationButtons: e, showLeftIcon: n, showRightIcon: a };
};
var qr = (e, n, a) => {
  const t = ref(0), o = reactive({
    // monthYearInput: !!props.timePicker,
    [vt.timePicker]: !e.enableTimePicker || e.timePicker || e.monthPicker,
    [vt.calendar]: false,
    [vt.header]: false
  }), l = (b) => {
    var T;
    (T = e.flow) != null && T.length && (o[b] = true, Object.keys(o).filter((Y) => !o[Y]).length || D());
  }, c = () => {
    var b;
    (b = e.flow) != null && b.length && t.value !== -1 && (t.value += 1, n("flow-step", t.value), D());
  }, h2 = () => {
    t.value = -1;
  }, y = (b, T, ...Y) => {
    e.flow[t.value] === b && a.value && a.value[T](...Y);
  }, D = () => {
    y("month", "toggleMonthPicker", true), y("year", "toggleYearPicker", true), y("calendar", "toggleTimePicker", false, true), y("time", "toggleTimePicker", true, true);
    const b = e.flow[t.value];
    (b === "hours" || b === "minutes" || b === "seconds") && y(b, "toggleTimePicker", true, true, b);
  };
  return { childMount: l, updateFlowStep: c, resetFlow: h2, flowStep: t };
};
var xt = {
  multiCalendars: { type: [Boolean, Number, String, Object], default: void 0 },
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
  emitTimezone: { type: String, default: null },
  vertical: { type: Boolean, default: false },
  disableMonthYearSelect: { type: Boolean, default: false },
  disableYearSelect: { type: Boolean, default: false },
  menuClassName: { type: String, default: null },
  dayClass: { type: Function, default: null },
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
  modeHeight: { type: [Number, String], default: 255 },
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
  keepActionRow: { type: Boolean, default: false },
  weekPicker: { type: Boolean, default: false },
  filters: { type: Object, default: () => ({}) },
  arrowNavigation: { type: Boolean, default: false },
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
  inline: { type: [Boolean, Object], default: false },
  textInput: { type: [Boolean, Object], default: false },
  onClickOutside: { type: Function, default: null },
  noDisabledRange: { type: Boolean, default: false },
  sixWeeks: { type: [Boolean, String], default: false },
  actionRow: { type: Object, default: () => ({}) },
  allowPreventDefault: { type: Boolean, default: false },
  closeOnClearValue: { type: Boolean, default: true },
  focusStartDate: { type: Boolean, default: false },
  disabledTimes: { type: [Function, Array], default: void 0 },
  showLastInRange: { type: Boolean, default: true },
  timePickerInline: { type: Boolean, default: false },
  calendar: { type: Function, default: null }
};
var Xe = {
  ...xt,
  shadow: { type: Boolean, default: false },
  flowStep: { type: Number, default: 0 },
  internalModelValue: { type: [Date, Array], default: null },
  arrMapValues: { type: Object, default: () => ({}) }
};
var xr = {
  key: 1,
  class: "dp__input_wrap"
};
var Jr = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-label", "onKeydown"];
var Xr = {
  key: 2,
  class: "dp__clear_icon"
};
var Qr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: false },
    inputValue: { type: String, default: "" },
    ...xt
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
  setup(e, { expose: n, emit: a }) {
    const t = e, { defaultedTextInput: o, defaultedAriaLabels: l, defaultedInline: c, getDefaultPattern: h2, getDefaultStartTime: y } = Ce(t), D = ref(), b = ref(null), T = ref(false), Y = ref(false), q = computed(
      () => ({
        dp__pointer: !t.disabled && !t.readonly && !o.value.enabled,
        dp__disabled: t.disabled,
        dp__input_readonly: !o.value.enabled,
        dp__input: true,
        dp__input_icon_pad: !t.hideInputIcon,
        dp__input_valid: t.state,
        dp__input_invalid: t.state === false,
        dp__input_focus: T.value || t.isMenuOpen,
        dp__input_reg: !o.value.enabled,
        [t.inputClassName]: !!t.inputClassName
      })
    ), K = () => {
      a("set-input-date", null), t.autoApply && (a("set-empty-date"), D.value = null);
    }, X = (f) => {
      const U = y();
      return _r(
        f,
        o.value.format ?? h2(),
        U ?? Ta({}, t.enableSeconds),
        t.inputValue,
        Y.value
      );
    }, k = (f) => {
      const { rangeSeparator: U } = o.value, [d, w] = f.split(`${U}`);
      if (d) {
        const u = X(d.trim()), g = w ? X(w.trim()) : null, s = u && g ? [u, g] : [u];
        D.value = u ? s : null;
      }
    }, $ = () => {
      Y.value = true;
    }, W = (f) => {
      if (t.range)
        k(f);
      else if (t.multiDates) {
        const U = f.split(";");
        D.value = U.map((d) => X(d.trim())).filter((d) => d);
      } else
        D.value = X(f);
    }, V = (f) => {
      var d;
      const U = typeof f == "string" ? f : (d = f.target) == null ? void 0 : d.value;
      U !== "" ? (o.value.openMenu && !t.isMenuOpen && a("open"), W(U), a("set-input-date", D.value)) : K(), Y.value = false, a("update:input-value", U);
    }, G = (f) => {
      o.value.enabled ? (W(f.target.value), o.value.enterSubmit && An(D.value) && t.inputValue !== "" ? (a("set-input-date", D.value, true), D.value = null) : o.value.enterSubmit && t.inputValue === "" && (D.value = null, a("clear"))) : p(f);
    }, P = (f) => {
      o.value.enabled && o.value.tabSubmit && W(f.target.value), o.value.tabSubmit && An(D.value) && t.inputValue !== "" ? (a("set-input-date", D.value, true), D.value = null) : o.value.tabSubmit && t.inputValue === "" && (D.value = null, a("clear"));
    }, ee = () => {
      T.value = true, a("focus");
    }, p = (f) => {
      f.preventDefault(), f.stopImmediatePropagation(), f.stopPropagation(), o.value.enabled && o.value.openMenu && !c.value.input && !t.isMenuOpen ? a("open") : o.value.enabled || a("toggle");
    }, _ = () => {
      a("real-blur"), T.value = false, (!t.isMenuOpen || c.value.enabled && c.value.input) && a("blur"), t.autoApply && o.value.enabled && D.value && !t.isMenuOpen && (a("set-input-date", D.value), a("select-date"), D.value = null);
    }, A = () => {
      a("clear");
    }, H = (f) => {
      if (!o.value.enabled) {
        if (f.code === "Tab")
          return;
        f.preventDefault();
      }
    };
    return n({
      focusInput: () => {
        var f;
        (f = b.value) == null || f.focus({ preventScroll: true });
      },
      setParsedDate: (f) => {
        D.value = f;
      }
    }), (f, U) => {
      var d;
      return openBlock(), createElementBlock("div", { onClick: p }, [
        f.$slots.trigger && !f.$slots["dp-input"] && !unref(c).enabled ? renderSlot(f.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !f.$slots.trigger && (!unref(c).enabled || unref(c).input) ? (openBlock(), createElementBlock("div", xr, [
          f.$slots["dp-input"] && !f.$slots.trigger && !unref(c).enabled ? renderSlot(f.$slots, "dp-input", {
            key: 0,
            value: e.inputValue,
            isMenuOpen: e.isMenuOpen,
            onInput: V,
            onEnter: G,
            onTab: P,
            onClear: A,
            onBlur: _,
            onKeypress: H,
            onPaste: $
          }) : createCommentVNode("", true),
          f.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            ref_key: "inputRef",
            ref: b,
            id: f.uid ? `dp-input-${f.uid}` : void 0,
            name: f.name,
            class: normalizeClass(q.value),
            inputmode: unref(o).enabled ? "text" : "none",
            placeholder: f.placeholder,
            disabled: f.disabled,
            readonly: f.readonly,
            required: f.required,
            value: e.inputValue,
            autocomplete: f.autocomplete,
            "aria-label": (d = unref(l)) == null ? void 0 : d.input,
            onInput: V,
            onKeydown: [
              withKeys(G, ["enter"]),
              withKeys(P, ["tab"]),
              H
            ],
            onBlur: _,
            onFocus: ee,
            onKeypress: H,
            onPaste: $
          }, null, 42, Jr)),
          createBaseVNode("div", {
            onClick: U[2] || (U[2] = (w) => a("toggle"))
          }, [
            f.$slots["input-icon"] && !f.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: U[0] || (U[0] = (w) => a("toggle"))
            }, [
              renderSlot(f.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !f.$slots["input-icon"] && !f.hideInputIcon && !f.$slots["dp-input"] ? (openBlock(), createBlock(unref(It), {
              key: 1,
              onClick: U[1] || (U[1] = (w) => a("toggle")),
              class: "dp__input_icon dp__input_icons"
            })) : createCommentVNode("", true)
          ]),
          f.$slots["clear-icon"] && e.inputValue && f.clearable && !f.disabled && !f.readonly ? (openBlock(), createElementBlock("span", Xr, [
            renderSlot(f.$slots, "clear-icon", { clear: A })
          ])) : createCommentVNode("", true),
          f.clearable && !f.$slots["clear-icon"] && e.inputValue && !f.disabled && !f.readonly ? (openBlock(), createBlock(unref(ya), {
            key: 3,
            class: "dp__clear_icon dp__input_icons",
            onClick: withModifiers(A, ["stop", "prevent"])
          }, null, 8, ["onClick"])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var el = ["title"];
var tl = { class: "dp__action_buttons" };
var nl = ["onKeydown", "disabled"];
var al = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ActionRow",
  props: {
    menuMount: { type: Boolean, default: false },
    calendarWidth: { type: Number, default: 0 },
    ...Xe
  },
  emits: ["close-picker", "select-date", "select-now", "invalid-select"],
  setup(e, { emit: n }) {
    const a = e, {
      defaultedActionRow: t,
      defaultedPreviewFormat: o,
      defaultedMultiCalendars: l,
      defaultedTextInput: c,
      defaultedInline: h2,
      getDefaultPattern: y
    } = Ce(a), { isValidTime: D } = Bt(a), { buildMatrix: b } = rt(), T = ref(null), Y = ref(null);
    onMounted(() => {
      a.arrowNavigation && b([Ae(T), Ae(Y)], "actionRow");
    });
    const q = computed(() => a.range && !a.partialRange && a.internalModelValue ? a.internalModelValue.length === 2 : true), K = computed(() => !X.value || !k.value || !q.value), X = computed(() => !a.enableTimePicker || a.ignoreTimeValidation ? true : D(a.internalModelValue)), k = computed(() => a.monthPicker ? a.range && Array.isArray(a.internalModelValue) ? !a.internalModelValue.filter((H) => !p(H)).length : p(a.internalModelValue) : true), $ = () => {
      const A = o.value;
      return a.timePicker || a.monthPicker, A(Te(a.internalModelValue));
    }, W = () => {
      const A = a.internalModelValue;
      return l.value.count > 0 ? `${V(A[0])} - ${V(A[1])}` : [V(A[0]), V(A[1])];
    }, V = (A) => _a(
      A,
      o.value,
      a.formatLocale,
      c.value.rangeSeparator,
      a.modelAuto,
      y()
    ), G = computed(() => !a.internalModelValue || !a.menuMount ? "" : typeof o.value == "string" ? Array.isArray(a.internalModelValue) ? a.internalModelValue.length === 2 && a.internalModelValue[1] ? W() : a.multiDates ? a.internalModelValue.map((A) => `${V(A)}`) : a.modelAuto ? `${V(a.internalModelValue[0])}` : `${V(a.internalModelValue[0])} -` : V(a.internalModelValue) : $()), P = () => a.multiDates ? "; " : " - ", ee = computed(
      () => Array.isArray(G.value) ? G.value.join(P()) : G.value
    ), p = (A) => {
      if (!a.monthPicker)
        return true;
      let H = true;
      const z = S(ze(A));
      if (a.minDate && a.maxDate) {
        const Q = S(ze(a.minDate)), f = S(ze(a.maxDate));
        return Ne(z, Q) && Pe(z, f) || ye(z, Q) || ye(z, f);
      }
      if (a.minDate) {
        const Q = S(ze(a.minDate));
        H = Ne(z, Q) || ye(z, Q);
      }
      if (a.maxDate) {
        const Q = S(ze(a.maxDate));
        H = Pe(z, Q) || ye(z, Q);
      }
      return H;
    }, _ = () => {
      X.value && k.value && q.value ? n("select-date") : n("invalid-select");
    };
    return (A, H) => (openBlock(), createElementBlock("div", {
      class: "dp__action_row",
      style: normalizeStyle(e.calendarWidth ? { width: `${e.calendarWidth}px` } : {})
    }, [
      A.$slots["action-row"] ? renderSlot(A.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: A.internalModelValue,
        disabled: K.value,
        selectDate: () => A.$emit("select-date"),
        closePicker: () => A.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(t).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: ee.value
        }, [
          A.$slots["action-preview"] ? renderSlot(A.$slots, "action-preview", {
            key: 0,
            value: A.internalModelValue
          }) : createCommentVNode("", true),
          A.$slots["action-preview"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(ee.value), 1)
          ], 64))
        ], 8, el)) : createCommentVNode("", true),
        createBaseVNode("div", tl, [
          A.$slots["action-buttons"] ? renderSlot(A.$slots, "action-buttons", {
            key: 0,
            value: A.internalModelValue
          }) : createCommentVNode("", true),
          A.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(h2).enabled && unref(t).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              ref_key: "cancelButtonRef",
              ref: T,
              class: "dp__action_button dp__action_cancel",
              onClick: H[0] || (H[0] = (z) => A.$emit("close-picker")),
              onKeydown: [
                H[1] || (H[1] = withKeys((z) => A.$emit("close-picker"), ["enter"])),
                H[2] || (H[2] = withKeys((z) => A.$emit("close-picker"), ["space"]))
              ]
            }, toDisplayString(A.cancelText), 545)) : createCommentVNode("", true),
            unref(t).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              ref_key: "cancelButtonRef",
              ref: T,
              class: "dp__action_button dp__action_cancel",
              onClick: H[3] || (H[3] = (z) => A.$emit("select-now")),
              onKeydown: [
                H[4] || (H[4] = withKeys((z) => A.$emit("select-now"), ["enter"])),
                H[5] || (H[5] = withKeys((z) => A.$emit("select-now"), ["space"]))
              ]
            }, toDisplayString(A.nowButtonLabel), 545)) : createCommentVNode("", true),
            unref(t).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              type: "button",
              class: "dp__action_button dp__action_select",
              onKeydown: [
                withKeys(_, ["enter"]),
                withKeys(_, ["space"])
              ],
              onClick: _,
              disabled: K.value,
              ref_key: "selectButtonRef",
              ref: Y
            }, toDisplayString(A.selectText), 41, nl)) : createCommentVNode("", true)
          ], 64))
        ])
      ], 64))
    ], 4));
  }
});
var rl = ["onKeydown"];
var ll = { class: "dp__selection_grid_header" };
var ol = ["aria-selected", "aria-disabled", "onClick", "onKeydown", "onMouseover"];
var sl = ["aria-label", "onKeydown"];
var Nt = defineComponent({
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
    textInput: { type: [Boolean, Object] }
  },
  emits: ["selected", "toggle", "reset-flow", "hover-value"],
  setup(e, { expose: n, emit: a }) {
    const t = e, { setSelectionGrid: o, buildMultiLevelMatrix: l, setMonthPicker: c } = rt(), { defaultedAriaLabels: h2, defaultedTextInput: y } = Ce(t), { hideNavigationButtons: D } = qt(), b = ref(false), T = ref(null), Y = ref(null), q = ref([]), K = ref(), X = ref(null), k = ref(0), $ = ref(null);
    onBeforeUpdate(() => {
      T.value = null;
    }), onMounted(() => {
      nextTick().then(() => A()), V(), W(true);
    }), onUnmounted(() => W(false));
    const W = (u) => {
      var g;
      t.arrowNavigation && ((g = t.headerRefs) != null && g.length ? c(u) : o(u));
    }, V = () => {
      var g;
      const u = Ae(Y);
      u && (y.value.enabled || (T.value ? (g = T.value) == null || g.focus({ preventScroll: true }) : u.focus({ preventScroll: true })), b.value = u.clientHeight < u.scrollHeight);
    }, G = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !t.useRelative,
        "dp--overlay-relative": t.useRelative
      })
    ), P = computed(
      () => t.useRelative ? { height: `${t.height}px`, width: "260px" } : void 0
    ), ee = computed(() => ({
      dp__overlay_col: true
    })), p = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: b.value,
        dp__button_bottom: t.isLast
      })
    ), _ = computed(() => {
      var u, g;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((u = t.items) == null ? void 0 : u.length) <= 6,
        dp__container_block: ((g = t.items) == null ? void 0 : g.length) > 6
      };
    }), A = () => {
      nextTick().then(() => {
        const u = Ae(T), g = Ae(Y), s = Ae(X), C = Ae($), ne = s ? s.getBoundingClientRect().height : 0;
        g && (k.value = g.getBoundingClientRect().height - ne), u && C && (C.scrollTop = u.offsetTop - C.offsetTop - (k.value / 2 - u.getBoundingClientRect().height) - ne);
      });
    }, H = (u) => {
      u.disabled || a("selected", u.value);
    }, z = () => {
      a("toggle"), a("reset-flow");
    }, Q = () => {
      t.escClose && z();
    }, f = (u, g, s, C) => {
      u && (g.active && (T.value = u), t.arrowNavigation && (Array.isArray(q.value[s]) ? q.value[s][C] = u : q.value[s] = [u], U()));
    }, U = () => {
      var g, s;
      const u = (g = t.headerRefs) != null && g.length ? [t.headerRefs].concat(q.value) : q.value.concat([t.skipButtonRef ? [] : [X.value]]);
      l(Te(u), (s = t.headerRefs) != null && s.length ? "monthPicker" : "selectionGrid");
    }, d = (u) => {
      t.arrowNavigation || u.stopImmediatePropagation();
    }, w = (u) => {
      K.value = u, a("hover-value", u);
    };
    return n({ focusGrid: V }), (u, g) => {
      var s;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: Y,
        class: normalizeClass(G.value),
        style: normalizeStyle(P.value),
        role: "dialog",
        tabindex: "0",
        onKeydown: [
          withKeys(withModifiers(Q, ["prevent"]), ["esc"]),
          g[0] || (g[0] = withKeys(withModifiers((C) => d(C), ["prevent"]), ["left"])),
          g[1] || (g[1] = withKeys(withModifiers((C) => d(C), ["prevent"]), ["up"])),
          g[2] || (g[2] = withKeys(withModifiers((C) => d(C), ["prevent"]), ["down"])),
          g[3] || (g[3] = withKeys(withModifiers((C) => d(C), ["prevent"]), ["right"]))
        ]
      }, [
        createBaseVNode("div", {
          class: normalizeClass(_.value),
          ref_key: "containerRef",
          ref: $,
          role: "grid",
          style: normalizeStyle({ height: `${k.value}px` })
        }, [
          createBaseVNode("div", ll, [
            renderSlot(u.$slots, "header")
          ]),
          u.$slots.overlay ? renderSlot(u.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(u.items, (C, ne) => (openBlock(), createElementBlock("div", {
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: u.items.length >= 3 }]),
            key: ne,
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(C, (r, L) => (openBlock(), createElementBlock("div", {
              role: "gridcell",
              class: normalizeClass(ee.value),
              key: r.value,
              "aria-selected": r.active,
              "aria-disabled": r.disabled,
              ref_for: true,
              ref: (R) => f(R, r, ne, L),
              tabindex: "0",
              onClick: (R) => H(r),
              onKeydown: [
                withKeys(withModifiers((R) => H(r), ["prevent"]), ["enter"]),
                withKeys(withModifiers((R) => H(r), ["prevent"]), ["space"])
              ],
              onMouseover: (R) => w(r.value)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(r.className)
              }, [
                u.$slots.item ? renderSlot(u.$slots, "item", {
                  key: 0,
                  item: r
                }) : createCommentVNode("", true),
                u.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(r.text), 1)
                ], 64))
              ], 2)
            ], 42, ol))), 128))
          ], 2))), 128))
        ], 6),
        u.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          role: "button",
          "aria-label": (s = unref(h2)) == null ? void 0 : s.toggleOverlay,
          class: normalizeClass(p.value),
          tabindex: "0",
          ref_key: "toggleButton",
          ref: X,
          onClick: z,
          onKeydown: [
            withKeys(z, ["enter"]),
            withKeys(z, ["tab"])
          ]
        }, [
          renderSlot(u.$slots, "button-icon")
        ], 42, sl)), [
          [vShow, !unref(D)(u.hideNavigation, u.type)]
        ]) : createCommentVNode("", true)
      ], 46, rl);
    };
  }
});
var Hn = defineComponent({
  __name: "InstanceWrap",
  props: {
    multiCalendars: {},
    stretch: { type: Boolean }
  },
  setup(e) {
    const n = e, a = computed(
      () => n.multiCalendars > 0 ? [...Array(n.multiCalendars).keys()] : [0]
    ), t = computed(() => ({
      dp__instance_calendar: n.multiCalendars > 0
    }));
    return (o, l) => (openBlock(), createElementBlock("div", {
      class: normalizeClass({
        dp__menu_inner: !o.stretch,
        "dp--menu--inner-stretched": o.stretch,
        dp__flex_display: o.multiCalendars > 0
      })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(a.value, (c, h2) => (openBlock(), createElementBlock("div", {
        key: c,
        class: normalizeClass(t.value)
      }, [
        renderSlot(o.$slots, "default", {
          instance: c,
          index: h2
        })
      ], 2))), 128))
    ], 2));
  }
});
var ul = ["aria-label", "aria-disabled"];
var _t = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ArrowBtn",
  props: {
    ariaLabel: {},
    disabled: { type: Boolean }
  },
  emits: ["activate", "set-ref"],
  setup(e, { emit: n }) {
    const a = ref(null);
    return onMounted(() => n("set-ref", a)), (t, o) => (openBlock(), createElementBlock("button", {
      type: "button",
      class: "dp__btn dp--arrow-btn-nav",
      onClick: o[0] || (o[0] = (l) => t.$emit("activate")),
      onKeydown: [
        o[1] || (o[1] = withKeys(withModifiers((l) => t.$emit("activate"), ["prevent"]), ["enter"])),
        o[2] || (o[2] = withKeys(withModifiers((l) => t.$emit("activate"), ["prevent"]), ["space"]))
      ],
      tabindex: "0",
      "aria-label": t.ariaLabel,
      "aria-disabled": t.disabled,
      ref_key: "elRef",
      ref: a
    }, [
      createBaseVNode("span", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: t.disabled }])
      }, [
        renderSlot(t.$slots, "default")
      ], 2)
    ], 40, ul));
  }
});
var Ln = (e, n, a) => {
  if (n.value && Array.isArray(n.value))
    if (n.value.some((t) => ye(e, t))) {
      const t = n.value.filter((o) => !ye(o, e));
      n.value = t.length ? t : null;
    } else
      (a && +a > n.value.length || !a) && n.value.push(e);
  else
    n.value = [e];
};
var Pa = (e, n, a) => {
  let t = e.value ? e.value.slice() : [];
  t.length === 2 && t[1] !== null && (t = []), t.length ? Pe(n, t[0]) ? (t.unshift(n), a("range-start", t[0]), a("range-start", t[1])) : (t[1] = n, a("range-end", n)) : (t = [n], a("range-start", n)), e.value = t;
};
var il = (e, n) => {
  const { defaultedMultiCalendars: a, defaultedAriaLabels: t, defaultedTransitions: o } = Ce(e), { modelValue: l, year: c, month: h2, calendars: y } = Zt(e, n), D = computed(() => ka(e.formatLocale, e.locale, e.monthNameFormat)), b = computed(() => Fn(e.yearRange, e.reverseYears)), T = ref(null), Y = () => {
    for (let d = 0; d < a.value.count; d++)
      if (d === 0)
        y.value[d] = y.value[0];
      else {
        const w = set(S(), y.value[d - 1]);
        y.value[d] = { month: getMonth(w), year: getYear(addYears(w, d)) };
      }
  }, q = (d) => {
    if (!d)
      return Y();
    const w = set(S(), y.value[d]);
    return y.value[0].year = getYear(subYears(w, a.value.count - 1)), Y();
  }, K = (d) => e.focusStartDate ? d[0] : d[1] ? d[1] : d[0], X = () => {
    if (l.value) {
      const d = Array.isArray(l.value) ? K(l.value) : l.value;
      y.value[0] = { month: getMonth(d), year: getYear(d) };
    }
  };
  onMounted(() => {
    X(), a.value.count && Y();
  });
  const k = computed(() => (d, w) => {
    const u = set(ze(/* @__PURE__ */ new Date()), {
      month: h2.value(d),
      year: c.value(d)
    });
    return Aa(u, e.maxDate, e.minDate, e.preventMinMaxNavigation, w);
  }), $ = (d) => d ? { month: getMonth(d), year: getYear(d) } : { month: null, year: null }, W = () => l.value ? Array.isArray(l.value) ? l.value.map((d) => $(d)) : $(l.value) : $(), V = (d, w) => {
    const u = y.value[d], g = W();
    return Array.isArray(g) ? g.some((s) => s.year === (u == null ? void 0 : u.year) && s.month === w) : (u == null ? void 0 : u.year) === g.year && w === g.month;
  }, G = (d, w, u) => {
    var s, C;
    const g = W();
    return Array.isArray(g) ? c.value(w) === ((s = g[u]) == null ? void 0 : s.year) && d === ((C = g[u]) == null ? void 0 : C.month) : false;
  }, P = (d, w) => {
    if (e.range) {
      const u = W();
      if (Array.isArray(l.value) && Array.isArray(u)) {
        const g = G(d, w, 0) || G(d, w, 1), s = Je(ze(S()), d, c.value(w));
        return Vn(l.value, T.value, s) && !g;
      }
      return false;
    }
    return false;
  }, ee = computed(() => (d) => bt(D.value, (w) => {
    const u = V(d, w.value), g = Rt(
      w.value,
      Da(c.value(d), e.minDate),
      Ma(c.value(d), e.maxDate)
    ) || Ir(e.disabledDates, c.value(d)).includes(w.value), s = P(w.value, d);
    return { active: u, disabled: g, isBetween: s };
  })), p = computed(() => (d) => bt(b.value, (w) => {
    const u = c.value(d) === w.value, g = Rt(w.value, kt(e.minDate), kt(e.maxDate));
    return { active: u, disabled: g };
  })), _ = (d, w) => Je(ze(S()), d, c.value(w)), A = (d, w) => {
    const u = l.value ? l.value : ze(/* @__PURE__ */ new Date());
    l.value = Je(u, d, c.value(w)), n("auto-apply");
  }, H = (d, w) => {
    var u;
    Pa(l, _(d, w), n), n("auto-apply", ((u = l.value) == null ? void 0 : u.length) === 1);
  }, z = (d, w) => {
    Ln(_(d, w), l, e.multiDatesLimit), n("auto-apply", true);
  };
  return {
    groupedMonths: ee,
    groupedYears: p,
    year: c,
    isDisabled: k,
    defaultedMultiCalendars: a,
    defaultedAriaLabels: t,
    defaultedTransitions: o,
    setHoverDate: (d, w) => {
      T.value = _(d, w);
    },
    selectMonth: (d, w) => (y.value[w].month = d, e.multiDates ? z(d, w) : e.range ? H(d, w) : A(d, w)),
    selectYear: (d, w) => {
      y.value[w].year = d, a.value.count && !a.value.solo && q(w);
    }
  };
};
var cl = { class: "dp__month_picker_header" };
var dl = ["aria-label", "onClick", "onKeydown"];
var fl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "MonthPicker",
  props: {
    ...Xe
  },
  emits: [
    "update:internal-model-value",
    "overlay-closed",
    "reset-flow",
    "range-start",
    "range-end",
    "auto-apply"
  ],
  setup(e, { emit: n }) {
    const a = e, {
      groupedMonths: t,
      groupedYears: o,
      year: l,
      isDisabled: c,
      defaultedMultiCalendars: h2,
      defaultedAriaLabels: y,
      defaultedTransitions: D,
      setHoverDate: b,
      selectMonth: T,
      selectYear: Y
    } = il(a, n), { transitionName: q, showTransition: K } = Yt(D), { showRightIcon: X, showLeftIcon: k } = qt(), $ = ref([false]), W = (P, ee) => {
      Y(P, ee), G(ee);
    }, V = (P, ee = false) => {
      if (!c.value(P, ee)) {
        const p = ee ? l.value(P) + 1 : l.value(P) - 1;
        Y(p, P);
      }
    }, G = (P, ee = false, p) => {
      ee || n("reset-flow"), p !== void 0 ? $.value[P] = p : $.value[P] = !$.value[P], $.value || n("overlay-closed");
    };
    return (P, ee) => (openBlock(), createBlock(Hn, {
      "multi-calendars": unref(h2).count,
      stretch: ""
    }, {
      default: withCtx(({ instance: p }) => [
        createVNode(Nt, {
          items: unref(t)(p),
          "arrow-navigation": P.arrowNavigation,
          "is-last": P.autoApply && !P.keepActionRow,
          "esc-close": P.escClose,
          height: P.modeHeight,
          onSelected: (_) => unref(T)(_, p),
          onHoverValue: (_) => unref(b)(_, p),
          "use-relative": "",
          type: "month"
        }, {
          header: withCtx(() => {
            var _, A, H;
            return [
              createBaseVNode("div", cl, [
                unref(k)(unref(h2), p) ? (openBlock(), createBlock(_t, {
                  key: 0,
                  ref: "mpPrevIconRef",
                  "aria-label": (_ = unref(y)) == null ? void 0 : _.prevYear,
                  disabled: unref(c)(p, false),
                  onActivate: (z) => V(p, false)
                }, {
                  default: withCtx(() => [
                    P.$slots["arrow-left"] ? renderSlot(P.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                    P.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Cn), { key: 1 }))
                  ]),
                  _: 2
                }, 1032, ["aria-label", "disabled", "onActivate"])) : createCommentVNode("", true),
                createBaseVNode("div", {
                  class: "dp--year-select",
                  role: "button",
                  ref: "mpYearButtonRef",
                  "aria-label": (A = unref(y)) == null ? void 0 : A.openYearsOverlay,
                  tabindex: "0",
                  onClick: () => G(p, false),
                  onKeydown: withKeys(() => G(p, false), ["enter"])
                }, [
                  P.$slots.year ? renderSlot(P.$slots, "year", {
                    key: 0,
                    year: unref(l)(p)
                  }) : createCommentVNode("", true),
                  P.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(unref(l)(p)), 1)
                  ], 64))
                ], 40, dl),
                unref(X)(unref(h2), p) ? (openBlock(), createBlock(_t, {
                  key: 1,
                  ref: "mpNextIconRef",
                  "aria-label": (H = unref(y)) == null ? void 0 : H.nextYear,
                  disabled: unref(c)(p, false),
                  onActivate: (z) => V(p, true)
                }, {
                  default: withCtx(() => [
                    P.$slots["arrow-right"] ? renderSlot(P.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
                    P.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Rn), { key: 1 }))
                  ]),
                  _: 2
                }, 1032, ["aria-label", "disabled", "onActivate"])) : createCommentVNode("", true),
                createVNode(Transition, {
                  name: unref(q)($.value[p]),
                  css: unref(K)
                }, {
                  default: withCtx(() => [
                    $.value[p] ? (openBlock(), createBlock(Nt, {
                      key: 0,
                      items: unref(o)(p),
                      "text-input": P.textInput,
                      "esc-close": P.escClose,
                      onToggle: (z) => G(p),
                      onSelected: (z) => W(z, p),
                      "is-last": P.autoApply && !P.keepActionRow,
                      type: "year"
                    }, createSlots({
                      "button-icon": withCtx(() => [
                        P.$slots["calendar-icon"] ? renderSlot(P.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        P.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(It), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      P.$slots["year-overlay-value"] ? {
                        name: "item",
                        fn: withCtx(({ item: z }) => [
                          renderSlot(P.$slots, "year-overlay-value", {
                            text: z.text,
                            value: z.value
                          })
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1032, ["items", "text-input", "esc-close", "onToggle", "onSelected", "is-last"])) : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1032, ["name", "css"])
              ])
            ];
          }),
          _: 2
        }, 1032, ["items", "arrow-navigation", "is-last", "esc-close", "height", "onSelected", "onHoverValue"])
      ]),
      _: 3
    }, 8, ["multi-calendars"]));
  }
});
var vl = (e, n) => {
  const { modelValue: a } = Zt(e, n), t = ref(null), o = (b) => Array.isArray(a.value) ? a.value.some((T) => getYear(T) === b) : a.value ? getYear(a.value) === b : false, l = (b) => e.range && Array.isArray(a.value) ? Vn(a.value, t.value, h2(b)) : false, c = computed(() => bt(Fn(e.yearRange, e.reverseYears), (b) => {
    const T = o(b.value), Y = Rt(b.value, kt(e.minDate), kt(e.maxDate)), q = l(b.value);
    return { active: T, disabled: Y, isBetween: q };
  })), h2 = (b) => setYear(ze(/* @__PURE__ */ new Date()), b);
  return {
    groupedYears: c,
    setHoverValue: (b) => {
      t.value = setYear(ze(/* @__PURE__ */ new Date()), b);
    },
    selectYear: (b) => {
      if (e.multiDates)
        return Ln(h2(b), a, e.multiDatesLimit);
      if (e.range)
        return Pa(a, h2(b), n);
      a.value = h2(b);
    }
  };
};
var ml = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "YearPicker",
  props: {
    ...Xe
  },
  emits: ["update:internal-model-value", "reset-flow", "range-start", "range-end"],
  setup(e, { emit: n }) {
    const a = e, { groupedYears: t, selectYear: o, setHoverValue: l } = vl(a, n);
    return (c, h2) => (openBlock(), createBlock(Nt, {
      items: unref(t),
      "is-last": c.autoApply && !c.keepActionRow,
      height: c.modeHeight,
      type: "year",
      "use-relative": "",
      onSelected: unref(o),
      onHoverValue: unref(l)
    }, createSlots({ _: 2 }, [
      c.$slots["year-overlay-value"] ? {
        name: "item",
        fn: withCtx(({ item: y }) => [
          renderSlot(c.$slots, "year-overlay-value", {
            text: y.text,
            value: y.value
          })
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["items", "is-last", "height", "onSelected", "onHoverValue"]));
  }
});
var gl = {
  key: 0,
  class: "dp__time_input"
};
var yl = ["aria-label", "onKeydown", "onClick"];
var pl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var hl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var bl = ["aria-label", "disabled", "onKeydown", "onClick"];
var kl = ["aria-label", "onKeydown", "onClick"];
var wl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var Dl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var Ml = { key: 0 };
var $l = ["aria-label", "onKeydown"];
var Tl = defineComponent({
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
    disabledTimesConfig: { type: Object, default: () => ({}) },
    ...Xe
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
    "am-pm-change"
  ],
  setup(e, { expose: n, emit: a }) {
    const t = e, { setTimePickerElements: o, setTimePickerBackRef: l } = rt(), { defaultedAriaLabels: c, defaultedTransitions: h2, defaultedFilters: y } = Ce(t), { transitionName: D, showTransition: b } = Yt(h2), T = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), Y = ref("AM"), q = ref(null), K = ref([]);
    onMounted(() => {
      a("mounted");
    });
    const X = (r) => set(/* @__PURE__ */ new Date(), {
      hours: r.hours,
      minutes: r.minutes,
      seconds: t.enableSeconds ? r.seconds : 0,
      milliseconds: 0
    }), k = computed(() => (r) => H(r, t[r])), $ = computed(() => ({ hours: t.hours, minutes: t.minutes, seconds: t.seconds })), W = computed(() => (r) => !Q(+t[r] + +t[`${r}Increment`], r)), V = computed(() => (r) => !Q(+t[r] - +t[`${r}Increment`], r)), G = (r, L) => add(set(S(), r), L), P = (r, L) => sub(set(S(), r), L), ee = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !t.timePickerInline,
        dp__time_col_reg_block: !t.enableSeconds && t.is24 && !t.timePickerInline,
        dp__time_col_reg_inline: !t.enableSeconds && t.is24 && t.timePickerInline,
        dp__time_col_reg_with_button: !t.enableSeconds && !t.is24,
        dp__time_col_sec: t.enableSeconds && t.is24,
        dp__time_col_sec_with_button: t.enableSeconds && !t.is24
      })
    ), p = computed(() => {
      const r = [{ type: "hours" }, { type: "", separator: true }, { type: "minutes" }];
      return t.enableSeconds ? r.concat([{ type: "", separator: true }, { type: "seconds" }]) : r;
    }), _ = computed(() => p.value.filter((r) => !r.separator)), A = computed(() => (r) => {
      if (r === "hours") {
        const L = u(+t.hours);
        return { text: L < 10 ? `0${L}` : `${L}`, value: L };
      }
      return { text: t[r] < 10 ? `0${t[r]}` : `${t[r]}`, value: t[r] };
    }), H = (r, L) => {
      var R;
      return t.disabledTimesConfig[r] ? !!((R = t.disabledTimesConfig[r]) != null && R.includes(L)) : true;
    }, z = (r) => {
      const L = t.is24 ? 24 : 12, R = r === "hours" ? L : 60, m = +t[`${r}GridIncrement`], B = r === "hours" && !t.is24 ? m : 0, le = [];
      for (let Z = B; Z < R; Z += m)
        le.push({ value: Z, text: Z < 10 ? `0${Z}` : `${Z}` });
      return r === "hours" && !t.is24 && le.push({ value: 0, text: "12" }), bt(le, (Z) => ({ active: false, disabled: y.value.times[r].includes(Z.value) || !Q(Z.value, r) || H(r, Z.value) }));
    }, Q = (r, L) => {
      const R = t.minTime ? X(dn(t.minTime)) : null, m = t.maxTime ? X(dn(t.maxTime)) : null, B = X(dn($.value, L, r));
      return R && m ? (isBefore(B, m) || isEqual(B, m)) && (isAfter(B, R) || isEqual(B, R)) : R ? isAfter(B, R) || isEqual(B, R) : m ? isBefore(B, m) || isEqual(B, m) : true;
    }, f = (r) => t[`no${r[0].toUpperCase() + r.slice(1)}Overlay`], U = (r) => {
      f(r) || (T[r] = !T[r], T[r] || a("overlay-closed"));
    }, d = (r) => r === "hours" ? getHours : r === "minutes" ? getMinutes : getSeconds, w = (r, L = true) => {
      const R = L ? G : P, m = L ? +t[`${r}Increment`] : -+t[`${r}Increment`];
      Q(+t[r] + m, r) && a(
        `update:${r}`,
        d(r)(R({ [r]: +t[r] }, { [r]: +t[`${r}Increment`] }))
      );
    }, u = (r) => t.is24 ? r : (r >= 12 ? Y.value = "PM" : Y.value = "AM", Mr(r)), g = () => {
      Y.value === "PM" ? (Y.value = "AM", a("update:hours", t.hours - 12)) : (Y.value = "PM", a("update:hours", t.hours + 12)), a("am-pm-change", Y.value);
    }, s = (r) => {
      T[r] = true;
    }, C = (r, L, R) => {
      if (r && t.arrowNavigation) {
        Array.isArray(K.value[L]) ? K.value[L][R] = r : K.value[L] = [r];
        const m = K.value.reduce(
          (B, le) => le.map((Z, ke) => [...B[ke] || [], le[ke]]),
          []
        );
        l(t.closeTimePickerBtn), q.value && (m[1] = m[1].concat(q.value)), o(m, t.order);
      }
    }, ne = (r, L) => (U(r), r === "hours" && !t.is24 ? a(`update:${r}`, Y.value === "PM" ? L + 12 : L) : a(`update:${r}`, L));
    return n({ openChildCmp: s }), (r, L) => {
      var R;
      return r.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", gl, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(p.value, (m, B) => {
          var le, Z, ke;
          return openBlock(), createElementBlock("div", {
            key: B,
            class: normalizeClass(ee.value)
          }, [
            m.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(" : ")
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !t.timePickerInline,
                  dp__inc_dec_button_inline: t.timePickerInline,
                  dp__tp_inline_btn_top: t.timePickerInline,
                  dp__inc_dec_button_disabled: W.value(m.type)
                }),
                "aria-label": (le = unref(c)) == null ? void 0 : le.incrementValue(m.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((se) => w(m.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((se) => w(m.type), ["prevent"]), ["space"])
                ],
                onClick: (se) => w(m.type),
                ref_for: true,
                ref: (se) => C(se, B, 0)
              }, [
                t.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  pl,
                  hl
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  r.$slots["arrow-up"] ? renderSlot(r.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  r.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(On), { key: 1 }))
                ], 64))
              ], 42, yl),
              createBaseVNode("button", {
                type: "button",
                "aria-label": (Z = unref(c)) == null ? void 0 : Z.openTpOverlay(m.type),
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !t.timePickerInline,
                  dp__time_display_inline: t.timePickerInline,
                  "dp--time-invalid": k.value(m.type),
                  "dp--time-overlay-btn": !k.value(m.type)
                }),
                disabled: f(m.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((se) => U(m.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((se) => U(m.type), ["prevent"]), ["space"])
                ],
                onClick: (se) => U(m.type),
                ref_for: true,
                ref: (se) => C(se, B, 1)
              }, [
                r.$slots[m.type] ? renderSlot(r.$slots, m.type, {
                  key: 0,
                  text: A.value(m.type).text,
                  value: A.value(m.type).value
                }) : createCommentVNode("", true),
                r.$slots[m.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(A.value(m.type).text), 1)
                ], 64))
              ], 42, bl),
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !t.timePickerInline,
                  dp__inc_dec_button_inline: t.timePickerInline,
                  dp__tp_inline_btn_bottom: t.timePickerInline,
                  dp__inc_dec_button_disabled: V.value(m.type)
                }),
                "aria-label": (ke = unref(c)) == null ? void 0 : ke.decrementValue(m.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((se) => w(m.type, false), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((se) => w(m.type, false), ["prevent"]), ["space"])
                ],
                onClick: (se) => w(m.type, false),
                ref_for: true,
                ref: (se) => C(se, B, 2)
              }, [
                t.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  wl,
                  Dl
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  r.$slots["arrow-down"] ? renderSlot(r.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                  r.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(In), { key: 1 }))
                ], 64))
              ], 42, kl)
            ], 64))
          ], 2);
        }), 128)),
        r.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Ml, [
          r.$slots["am-pm-button"] ? renderSlot(r.$slots, "am-pm-button", {
            key: 0,
            toggle: g,
            value: Y.value
          }) : createCommentVNode("", true),
          r.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: q,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (R = unref(c)) == null ? void 0 : R.amPmButton,
            tabindex: "0",
            onClick: g,
            onKeydown: [
              withKeys(withModifiers(g, ["prevent"]), ["enter"]),
              withKeys(withModifiers(g, ["prevent"]), ["space"])
            ]
          }, toDisplayString(Y.value), 41, $l))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(_.value, (m, B) => (openBlock(), createBlock(Transition, {
          key: B,
          name: unref(D)(T[m.type]),
          css: unref(b)
        }, {
          default: withCtx(() => [
            T[m.type] ? (openBlock(), createBlock(Nt, {
              key: 0,
              items: z(m.type),
              "is-last": r.autoApply && !r.keepActionRow,
              "esc-close": r.escClose,
              type: m.type,
              "text-input": r.textInput,
              "arrow-navigation": r.arrowNavigation,
              onSelected: (le) => ne(m.type, le),
              onToggle: (le) => U(m.type),
              onResetFlow: L[0] || (L[0] = (le) => r.$emit("reset-flow"))
            }, createSlots({
              "button-icon": withCtx(() => [
                r.$slots["clock-icon"] ? renderSlot(r.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                r.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Nn), { key: 1 }))
              ]),
              _: 2
            }, [
              r.$slots[`${m.type}-overlay-value`] ? {
                name: "item",
                fn: withCtx(({ item: le }) => [
                  renderSlot(r.$slots, `${m.type}-overlay-value`, {
                    text: le.text,
                    value: le.value
                  })
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["items", "is-last", "esc-close", "type", "text-input", "arrow-navigation", "onSelected", "onToggle"])) : createCommentVNode("", true)
          ]),
          _: 2
        }, 1032, ["name", "css"]))), 128))
      ]));
    };
  }
});
var Al = ["aria-label"];
var _l = ["tabindex"];
var Sl = ["aria-label"];
var Ca = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePicker",
  props: {
    hours: { type: [Number, Array], default: 0 },
    minutes: { type: [Number, Array], default: 0 },
    seconds: { type: [Number, Array], default: 0 },
    disabledTimesConfig: { type: Function, default: () => ({}) },
    ...Xe
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
  setup(e, { expose: n, emit: a }) {
    const t = e, { buildMatrix: o, setTimePicker: l } = rt(), c = useSlots(), { defaultedTransitions: h2, defaultedAriaLabels: y, defaultedTextInput: D } = Ce(t), { transitionName: b, showTransition: T } = Yt(h2), { hideNavigationButtons: Y } = qt(), q = ref(null), K = ref(null), X = ref([]), k = ref(null);
    onMounted(() => {
      a("mount"), !t.timePicker && t.arrowNavigation ? o([Ae(q.value)], "time") : l(true, t.timePicker);
    });
    const $ = computed(() => t.range && t.modelAuto ? wa(t.internalModelValue) : true), W = ref(false), V = (f) => ({
      hours: Array.isArray(t.hours) ? t.hours[f] : t.hours,
      minutes: Array.isArray(t.minutes) ? t.minutes[f] : t.minutes,
      seconds: Array.isArray(t.seconds) ? t.seconds[f] : t.seconds
    }), G = computed(() => {
      const f = [];
      if (t.range)
        for (let U = 0; U < 2; U++)
          f.push(V(U));
      else
        f.push(V(0));
      return f;
    }), P = (f, U = false, d = "") => {
      U || a("reset-flow"), W.value = f, a(f ? "overlay-opened" : "overlay-closed"), t.arrowNavigation && l(f), nextTick(() => {
        d !== "" && X.value[0] && X.value[0].openChildCmp(d);
      });
    }, ee = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: t.autoApply && !t.keepActionRow
    })), p = je(c, "timePicker"), _ = (f, U, d) => t.range ? U === 0 ? [f, G.value[1][d]] : [G.value[0][d], f] : f, A = (f) => {
      a("update:hours", f);
    }, H = (f) => {
      a("update:minutes", f);
    }, z = (f) => {
      a("update:seconds", f);
    }, Q = () => {
      if (k.value && !D.value.enabled) {
        const f = Tr(k.value);
        f && f.focus({ preventScroll: true });
      }
    };
    return n({ toggleTimePicker: P }), (f, U) => {
      var d;
      return openBlock(), createElementBlock("div", null, [
        !f.timePicker && !f.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          class: normalizeClass(ee.value),
          "aria-label": (d = unref(y)) == null ? void 0 : d.openTimePicker,
          tabindex: "0",
          ref_key: "openTimePickerBtn",
          ref: q,
          onKeydown: [
            U[0] || (U[0] = withKeys((w) => P(true), ["enter"])),
            U[1] || (U[1] = withKeys((w) => P(true), ["space"]))
          ],
          onClick: U[2] || (U[2] = (w) => P(true))
        }, [
          f.$slots["clock-icon"] ? renderSlot(f.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          f.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Nn), { key: 1 }))
        ], 42, Al)), [
          [vShow, !unref(Y)(f.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(b)(W.value),
          css: unref(T) && !f.timePickerInline
        }, {
          default: withCtx(() => {
            var w;
            return [
              W.value || f.timePicker || f.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass({
                  dp__overlay: !f.timePickerInline,
                  "dp--overlay-absolute": !t.timePicker && !f.timePickerInline,
                  "dp--overlay-relative": t.timePicker
                }),
                style: normalizeStyle(f.timePicker ? { height: `${f.modeHeight}px` } : void 0),
                ref_key: "overlayRef",
                ref: k,
                tabindex: f.timePickerInline ? void 0 : 0
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(
                    f.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
                  ),
                  style: { display: "flex" }
                }, [
                  f.$slots["time-picker-overlay"] ? renderSlot(f.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e.hours,
                    minutes: e.minutes,
                    seconds: e.seconds,
                    setHours: A,
                    setMinutes: H,
                    setSeconds: z
                  }) : createCommentVNode("", true),
                  f.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(f.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(G.value, (u, g) => withDirectives((openBlock(), createBlock(Tl, mergeProps({ key: g }, {
                      ...f.$props,
                      order: g,
                      hours: u.hours,
                      minutes: u.minutes,
                      seconds: u.seconds,
                      closeTimePickerBtn: K.value,
                      disabledTimesConfig: e.disabledTimesConfig(g),
                      disabled: g === 0 ? f.fixedStart : f.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: X,
                      "onUpdate:hours": (s) => A(_(s, g, "hours")),
                      "onUpdate:minutes": (s) => H(_(s, g, "minutes")),
                      "onUpdate:seconds": (s) => z(_(s, g, "seconds")),
                      onMounted: Q,
                      onOverlayClosed: Q,
                      onAmPmChange: U[3] || (U[3] = (s) => f.$emit("am-pm-change", s))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(p), (s, C) => ({
                        name: s,
                        fn: withCtx((ne) => [
                          renderSlot(f.$slots, s, normalizeProps(guardReactiveProps(ne)))
                        ])
                      }))
                    ]), 1040, ["onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, g === 0 ? true : $.value]
                    ])), 128))
                  ], 2)),
                  !f.timePicker && !f.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    type: "button",
                    ref_key: "closeTimePickerBtn",
                    ref: K,
                    class: normalizeClass(ee.value),
                    "aria-label": (w = unref(y)) == null ? void 0 : w.closeTimePicker,
                    tabindex: "0",
                    onKeydown: [
                      U[4] || (U[4] = withKeys((u) => P(false), ["enter"])),
                      U[5] || (U[5] = withKeys((u) => P(false), ["space"]))
                    ],
                    onClick: U[6] || (U[6] = (u) => P(false))
                  }, [
                    f.$slots["calendar-icon"] ? renderSlot(f.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    f.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(It), { key: 1 }))
                  ], 42, Sl)), [
                    [vShow, !unref(Y)(f.hideNavigation, "time")]
                  ]) : createCommentVNode("", true)
                ], 2)
              ], 14, _l)) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var Ra = (e, n, a, t) => {
  const o = (k, $) => Array.isArray(n[k]) ? n[k][$] : n[k], l = (k) => e.enableSeconds ? Array.isArray(n.seconds) ? n.seconds[k] : n.seconds : 0, c = (k, $) => k ? $ !== void 0 ? tt(k, o("hours", $), o("minutes", $), l($)) : tt(k, n.hours, n.minutes, l()) : S(), h2 = (k, $) => {
    n[k] = $;
  }, y = (k, $) => {
    const W = Object.fromEntries(
      Object.keys(n).map((V) => V === k ? [V, $] : [V, n[V]].slice())
    );
    if (e.range && !e.disableTimeRangeValidation) {
      const V = (P) => a.value ? tt(
        a.value[P],
        W.hours[P],
        W.minutes[P],
        W.seconds[P]
      ) : null, G = (P) => setMilliseconds(a.value[P], 0);
      return !(ye(V(0), V(1)) && (isAfter(V(0), G(1)) || isBefore(V(1), G(0))));
    }
    return true;
  }, D = (k, $) => {
    y(k, $) && (h2(k, $), t && t());
  }, b = (k) => {
    D("hours", k);
  }, T = (k) => {
    D("minutes", k);
  }, Y = (k) => {
    D("seconds", k);
  }, q = (k, $, W, V) => {
    $ && b(k), !$ && !W && T(k), W && Y(k), a.value && V(a.value);
  }, K = (k) => {
    if (k) {
      const $ = Array.isArray(k), W = $ ? [+k[0].hours, +k[1].hours] : +k.hours, V = $ ? [+k[0].minutes, +k[1].minutes] : +k.minutes, G = $ ? [+k[0].seconds, +k[1].seconds] : +k.seconds;
      h2("hours", W), h2("minutes", V), e.enableSeconds && h2("seconds", G);
    }
  }, X = computed(() => (k) => {
    var $;
    if (Array.isArray(e.disabledTimes)) {
      const W = Array.isArray(n.hours) ? n.hours[k] : n.hours, V = e.disabledTimes.filter((G) => +G.hours === W);
      return (($ = V[0]) == null ? void 0 : $.minutes) === "*" ? { hours: [W], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (V == null ? void 0 : V.map((G) => +G.minutes)) ?? [],
        seconds: (V == null ? void 0 : V.map((G) => G.seconds ? +G.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: h2,
    updateHours: b,
    updateMinutes: T,
    updateSeconds: Y,
    getSetDateTime: c,
    updateTimeValues: q,
    getSecondsValue: l,
    assignStartTime: K,
    disabledTimesConfig: X
  };
};
var Pl = (e, n) => {
  const { modelValue: a, time: t } = Zt(e, n), { defaultedStartTime: o } = Ce(e), { updateTimeValues: l, getSetDateTime: c, setTime: h2, assignStartTime: y, disabledTimesConfig: D } = Ra(
    e,
    t,
    a
  ), b = () => {
    e.range ? a.value = [c(null, 0), c(null, 1)] : a.value = c(null);
  }, T = (k) => Array.isArray(k) ? [ft(S(k[0])), ft(S(k[1]))] : [ft(k ?? S())], Y = (k, $, W) => {
    h2("hours", k), h2("minutes", $), e.enableSeconds && h2("seconds", W);
  }, q = () => {
    const [k, $] = T(a.value);
    return e.range ? Y(
      [k.hours, $.hours],
      [k.minutes, $.minutes],
      [k.seconds, $.minutes]
    ) : Y(k.hours, k.minutes, k.seconds);
  };
  onMounted(() => {
    if (!e.shadow)
      return y(o.value), a.value ? q() : b();
  });
  const K = () => {
    Array.isArray(a.value) ? a.value = a.value.map((k, $) => k && c(k, $)) : a.value = c(a.value), n("time-update");
  };
  return {
    time: t,
    disabledTimesConfig: D,
    updateTime: (k, $ = true, W = false) => {
      l(k, $, W, K);
    }
  };
};
var Cl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePickerSolo",
  props: {
    ...Xe
  },
  emits: ["update:internal-model-value", "time-update", "am-pm-change"],
  setup(e, { emit: n }) {
    const a = e, t = useSlots(), o = je(t, "timePicker"), { time: l, disabledTimesConfig: c, updateTime: h2 } = Pl(a, n);
    return (y, D) => (openBlock(), createBlock(Hn, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(() => [
        createVNode(Ca, mergeProps(y.$props, {
          hours: unref(l).hours,
          minutes: unref(l).minutes,
          seconds: unref(l).seconds,
          "internal-model-value": y.internalModelValue,
          "disabled-times-config": unref(c),
          "onUpdate:hours": D[0] || (D[0] = (b) => unref(h2)(b)),
          "onUpdate:minutes": D[1] || (D[1] = (b) => unref(h2)(b, false)),
          "onUpdate:seconds": D[2] || (D[2] = (b) => unref(h2)(b, false, true)),
          onAmPmChange: D[3] || (D[3] = (b) => y.$emit("am-pm-change", b))
        }), createSlots({ _: 2 }, [
          renderList(unref(o), (b, T) => ({
            name: b,
            fn: withCtx((Y) => [
              renderSlot(y.$slots, b, normalizeProps(guardReactiveProps(Y)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config"])
      ]),
      _: 3
    }));
  }
});
var Rl = { class: "dp__month_year_row" };
var Nl = ["onClick", "onKeydown", "aria-label"];
var Ol = defineComponent({
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
    ...Xe
  },
  emits: ["update-month-year", "mount", "reset-flow", "overlay-closed"],
  setup(e, { expose: n, emit: a }) {
    const t = e, { defaultedTransitions: o, defaultedAriaLabels: l, defaultedMultiCalendars: c, defaultedFilters: h2 } = Ce(t), { transitionName: y, showTransition: D } = Yt(o), { buildMatrix: b } = rt(), { handleMonthYearChange: T, isDisabled: Y, updateMonthYear: q } = zr(t, a), { showLeftIcon: K, showRightIcon: X } = qt(), k = ref(false), $ = ref(false), W = ref([null, null, null, null]);
    onMounted(() => {
      a("mount");
    });
    const V = (u) => ({
      get: () => t[u],
      set: (g) => {
        const s = u === We.month ? We.year : We.month;
        a("update-month-year", { [u]: g, [s]: t[s] }), u === We.month ? z(true) : Q(true);
      }
    }), G = computed(V(We.month)), P = computed(V(We.year)), ee = computed(() => (u) => ({
      month: t.month,
      year: t.year,
      items: u === We.month ? t.months : t.years,
      instance: t.instance,
      updateMonthYear: q,
      toggle: u === We.month ? z : Q
    })), p = computed(() => {
      const u = t.months.find((g) => g.value === t.month);
      return u || { text: "", value: 0 };
    }), _ = computed(() => bt(t.months, (u) => {
      const g = t.month === u.value, s = Rt(
        u.value,
        Da(t.year, t.minDate),
        Ma(t.year, t.maxDate)
      ) || h2.value.months.includes(u.value);
      return { active: g, disabled: s };
    })), A = computed(() => bt(t.years, (u) => {
      const g = t.year === u.value, s = Rt(u.value, kt(t.minDate), kt(t.maxDate)) || h2.value.years.includes(u.value);
      return { active: g, disabled: s };
    })), H = (u, g) => {
      g !== void 0 ? u.value = g : u.value = !u.value, u.value || a("overlay-closed");
    }, z = (u = false, g) => {
      f(u), H(k, g);
    }, Q = (u = false, g) => {
      f(u), H($, g);
    }, f = (u) => {
      u || a("reset-flow");
    }, U = (u, g) => {
      t.arrowNavigation && (W.value[g] = Ae(u), b(W.value, "monthYear"));
    }, d = computed(() => {
      var u, g;
      return [
        {
          type: We.month,
          index: 1,
          toggle: z,
          modelValue: G.value,
          updateModelValue: (s) => G.value = s,
          text: p.value.text,
          showSelectionGrid: k.value,
          items: _.value,
          ariaLabel: (u = l.value) == null ? void 0 : u.openMonthsOverlay
        },
        {
          type: We.year,
          index: 2,
          toggle: Q,
          modelValue: P.value,
          updateModelValue: (s) => P.value = s,
          text: t.year,
          showSelectionGrid: $.value,
          items: A.value,
          ariaLabel: (g = l.value) == null ? void 0 : g.openYearsOverlay
        }
      ];
    }), w = computed(
      () => t.disableYearSelect ? [d.value[0]] : d.value
    );
    return n({
      toggleMonthPicker: z,
      toggleYearPicker: Q,
      handleMonthYearChange: T
    }), (u, g) => {
      var s, C, ne;
      return openBlock(), createElementBlock("div", Rl, [
        u.$slots["month-year"] ? renderSlot(u.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, { month: e.month, year: e.year, months: e.months, years: e.years, updateMonthYear: unref(q), handleMonthYearChange: unref(T), instance: e.instance }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          unref(K)(unref(c), e.instance) && !u.vertical ? (openBlock(), createBlock(_t, {
            key: 0,
            "aria-label": (s = unref(l)) == null ? void 0 : s.prevMonth,
            disabled: unref(Y)(false),
            onActivate: g[0] || (g[0] = (r) => unref(T)(false)),
            onSetRef: g[1] || (g[1] = (r) => U(r, 0))
          }, {
            default: withCtx(() => [
              u.$slots["arrow-left"] ? renderSlot(u.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
              u.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Cn), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: normalizeClass(["dp__month_year_wrap", {
              dp__year_disable_select: u.disableYearSelect
            }])
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(w.value, (r, L) => (openBlock(), createElementBlock(Fragment, {
              key: r.type
            }, [
              createBaseVNode("button", {
                type: "button",
                class: "dp__btn dp__month_year_select",
                onClick: r.toggle,
                onKeydown: [
                  withKeys(withModifiers(r.toggle, ["prevent"]), ["enter"]),
                  withKeys(withModifiers(r.toggle, ["prevent"]), ["space"])
                ],
                "aria-label": r.ariaLabel,
                tabindex: "0",
                ref_for: true,
                ref: (R) => U(R, L + 1)
              }, [
                u.$slots[r.type] ? renderSlot(u.$slots, r.type, normalizeProps(mergeProps({ key: 0 }, { text: r.text }))) : createCommentVNode("", true),
                u.$slots[r.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(r.text), 1)
                ], 64))
              ], 40, Nl),
              createVNode(Transition, {
                name: unref(y)(r.showSelectionGrid),
                css: unref(D)
              }, {
                default: withCtx(() => [
                  r.showSelectionGrid ? (openBlock(), createBlock(Nt, {
                    key: 0,
                    items: r.items,
                    "arrow-navigation": u.arrowNavigation,
                    "hide-navigation": u.hideNavigation,
                    "is-last": u.autoApply && !u.keepActionRow,
                    "skip-button-ref": false,
                    type: r.type,
                    "header-refs": [],
                    "esc-close": u.escClose,
                    "text-input": u.textInput,
                    onSelected: r.updateModelValue,
                    onToggle: r.toggle
                  }, createSlots({
                    "button-icon": withCtx(() => [
                      u.$slots["calendar-icon"] ? renderSlot(u.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                      u.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(It), { key: 1 }))
                    ]),
                    _: 2
                  }, [
                    u.$slots[`${r.type}-overlay-val`] ? {
                      name: "item",
                      fn: withCtx(({ item: R }) => [
                        renderSlot(u.$slots, `${r.type}-overlay-val`, {
                          text: R.text,
                          value: R.value
                        })
                      ]),
                      key: "0"
                    } : void 0,
                    u.$slots[`${r.type}-overlay`] ? {
                      name: "overlay",
                      fn: withCtx(() => [
                        renderSlot(u.$slots, `${r.type}-overlay`, normalizeProps(guardReactiveProps(ee.value(r.type))))
                      ]),
                      key: "1"
                    } : void 0,
                    u.$slots[`${r.type}-overlay-header`] ? {
                      name: "header",
                      fn: withCtx(() => [
                        renderSlot(u.$slots, `${r.type}-overlay-header`, {
                          toggle: r.toggle
                        })
                      ]),
                      key: "2"
                    } : void 0
                  ]), 1032, ["items", "arrow-navigation", "hide-navigation", "is-last", "type", "esc-close", "text-input", "onSelected", "onToggle"])) : createCommentVNode("", true)
                ]),
                _: 2
              }, 1032, ["name", "css"])
            ], 64))), 128))
          ], 2),
          unref(K)(unref(c), e.instance) && u.vertical ? (openBlock(), createBlock(_t, {
            key: 1,
            "aria-label": (C = unref(l)) == null ? void 0 : C.prevMonth,
            disabled: unref(Y)(false),
            onActivate: g[2] || (g[2] = (r) => unref(T)(false))
          }, {
            default: withCtx(() => [
              u.$slots["arrow-up"] ? renderSlot(u.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
              u.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(On), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
          unref(X)(unref(c), e.instance) ? (openBlock(), createBlock(_t, {
            key: 2,
            ref: "rightIcon",
            disabled: unref(Y)(true),
            "aria-label": (ne = unref(l)) == null ? void 0 : ne.nextMonth,
            onActivate: g[3] || (g[3] = (r) => unref(T)(true)),
            onSetRef: g[4] || (g[4] = (r) => U(r, u.disableYearSelect ? 2 : 3))
          }, {
            default: withCtx(() => [
              u.$slots[u.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(u.$slots, u.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
              u.$slots[u.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(u.vertical ? unref(In) : unref(Rn)), { key: 1 }))
            ]),
            _: 3
          }, 8, ["disabled", "aria-label"])) : createCommentVNode("", true)
        ], 64))
      ]);
    };
  }
});
var Il = ["aria-label"];
var Yl = {
  class: "dp__calendar_header",
  role: "row"
};
var Bl = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
};
var El = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1);
var Fl = ["aria-label"];
var Vl = {
  key: 0,
  role: "gridcell",
  class: "dp__calendar_item dp__week_num"
};
var Hl = { class: "dp__cell_inner" };
var Ll = ["aria-selected", "aria-disabled", "aria-label", "onClick", "onKeydown", "onMouseenter", "onMouseleave"];
var Ul = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DpCalendar",
  props: {
    mappedDates: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    ...Xe
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
  setup(e, { expose: n, emit: a }) {
    const t = e, { buildMultiLevelMatrix: o } = rt(), { defaultedTransitions: l, defaultedAriaLabels: c, defaultedMultiCalendars: h2 } = Ce(t), y = ref(null), D = ref({
      bottom: "",
      left: "",
      transform: ""
    }), b = ref([]), T = ref(null), Y = ref(true), q = ref(""), K = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), X = ref([]), k = ref({ left: "50%" }), $ = computed(() => t.calendar ? t.calendar(t.mappedDates) : t.mappedDates), W = computed(() => t.dayNames ? Array.isArray(t.dayNames) ? t.dayNames : t.dayNames(t.locale, +t.weekStart) : Dr(t.formatLocale, t.locale, +t.weekStart));
    onMounted(() => {
      a("mount", { cmp: "calendar", refs: b }), t.noSwipe || T.value && (T.value.addEventListener("touchstart", Q, { passive: false }), T.value.addEventListener("touchend", f, { passive: false }), T.value.addEventListener("touchmove", U, { passive: false })), t.monthChangeOnScroll && T.value && T.value.addEventListener("wheel", u, { passive: false });
    });
    const V = (s) => s ? t.vertical ? "vNext" : "next" : t.vertical ? "vPrevious" : "previous", G = (s, C) => {
      if (t.transitions) {
        const ne = Le(Je(S(), t.month, t.year));
        q.value = Ne(Le(Je(S(), s, C)), ne) ? l.value[V(true)] : l.value[V(false)], Y.value = false, nextTick(() => {
          Y.value = true;
        });
      }
    }, P = computed(
      () => ({
        [t.calendarClassName]: !!t.calendarClassName
      })
    ), ee = computed(() => (s) => {
      const C = $r(s);
      return {
        dp__marker_dot: C.type === "dot",
        dp__marker_line: C.type === "line"
      };
    }), p = computed(() => (s) => ye(s, y.value)), _ = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: h2.value.count > 0 && t.instance !== 0
    })), A = computed(() => (s) => t.hideOffsetDates ? s.current : true), H = async (s, C, ne) => {
      var r, L;
      if (a("set-hover-date", s), (L = (r = s.marker) == null ? void 0 : r.tooltip) != null && L.length) {
        const R = Ae(b.value[C][ne]);
        if (R) {
          const { width: m, height: B } = R.getBoundingClientRect();
          y.value = s.value;
          let le = { left: `${m / 2}px` }, Z = -50;
          if (await nextTick(), X.value[0]) {
            const { left: ke, width: se } = X.value[0].getBoundingClientRect();
            ke < 0 && (le = { left: "0" }, Z = 0, k.value.left = `${m / 2}px`), window.innerWidth < ke + se && (le = { right: "0" }, Z = 0, k.value.left = `${se - m / 2}px`);
          }
          D.value = {
            bottom: `${B}px`,
            ...le,
            transform: `translateX(${Z}%)`
          }, a("tooltip-open", s.marker);
        }
      }
    }, z = (s) => {
      y.value && (y.value = null, D.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a("tooltip-close", s.marker));
    }, Q = (s) => {
      K.value.startX = s.changedTouches[0].screenX, K.value.startY = s.changedTouches[0].screenY;
    }, f = (s) => {
      K.value.endX = s.changedTouches[0].screenX, K.value.endY = s.changedTouches[0].screenY, d();
    }, U = (s) => {
      t.vertical && !t.inline && s.preventDefault();
    }, d = () => {
      const s = t.vertical ? "Y" : "X";
      Math.abs(K.value[`start${s}`] - K.value[`end${s}`]) > 10 && a("handle-swipe", K.value[`start${s}`] > K.value[`end${s}`] ? "right" : "left");
    }, w = (s, C, ne) => {
      s && (Array.isArray(b.value[C]) ? b.value[C][ne] = s : b.value[C] = [s]), t.arrowNavigation && o(b.value, "calendar");
    }, u = (s) => {
      t.monthChangeOnScroll && (s.preventDefault(), a("handle-scroll", s));
    }, g = (s) => {
      const C = s[0];
      return t.weekNumbers === "local" ? getWeek(C.value, { weekStartsOn: +t.weekStart }) : t.weekNumbers === "iso" ? getISOWeek(C.value) : typeof t.weekNumbers == "function" ? t.weekNumbers(C.value) : "";
    };
    return n({ triggerTransition: G }), (s, C) => {
      var ne;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_.value)
      }, [
        createBaseVNode("div", {
          ref_key: "calendarWrapRef",
          ref: T,
          role: "grid",
          class: normalizeClass(P.value),
          "aria-label": (ne = unref(c)) == null ? void 0 : ne.calendarWrap
        }, [
          (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createBaseVNode("div", Yl, [
              s.weekNumbers ? (openBlock(), createElementBlock("div", Bl, toDisplayString(s.weekNumName), 1)) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(W.value, (r, L) => (openBlock(), createElementBlock("div", {
                class: "dp__calendar_header_item",
                role: "gridcell",
                key: L
              }, [
                s.$slots["calendar-header"] ? renderSlot(s.$slots, "calendar-header", {
                  key: 0,
                  day: r,
                  index: L
                }) : createCommentVNode("", true),
                s.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(r), 1)
                ], 64))
              ]))), 128))
            ]),
            El,
            createVNode(Transition, {
              name: q.value,
              css: !!s.transitions
            }, {
              default: withCtx(() => {
                var r;
                return [
                  Y.value ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "dp__calendar",
                    role: "grid",
                    "aria-label": (r = unref(c)) == null ? void 0 : r.calendarDays
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList($.value, (L, R) => (openBlock(), createElementBlock("div", {
                      class: "dp__calendar_row",
                      role: "row",
                      key: R
                    }, [
                      s.weekNumbers ? (openBlock(), createElementBlock("div", Vl, [
                        createBaseVNode("div", Hl, toDisplayString(g(L.days)), 1)
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(L.days, (m, B) => {
                        var le, Z, ke;
                        return openBlock(), createElementBlock("div", {
                          role: "gridcell",
                          class: "dp__calendar_item",
                          ref_for: true,
                          ref: (se) => w(se, R, B),
                          key: B + R,
                          "aria-selected": m.classData.dp__active_date || m.classData.dp__range_start || m.classData.dp__range_start,
                          "aria-disabled": m.classData.dp__cell_disabled,
                          "aria-label": (Z = (le = unref(c)) == null ? void 0 : le.day) == null ? void 0 : Z.call(le, m),
                          tabindex: "0",
                          onClick: withModifiers((se) => s.$emit("select-date", m), ["stop", "prevent"]),
                          onKeydown: [
                            withKeys((se) => s.$emit("select-date", m), ["enter"]),
                            withKeys((se) => s.$emit("handle-space", m), ["space"])
                          ],
                          onMouseenter: (se) => H(m, R, B),
                          onMouseleave: (se) => z(m)
                        }, [
                          createBaseVNode("div", {
                            class: normalizeClass(["dp__cell_inner", m.classData])
                          }, [
                            s.$slots.day && A.value(m) ? renderSlot(s.$slots, "day", {
                              key: 0,
                              day: +m.text,
                              date: m.value
                            }) : createCommentVNode("", true),
                            s.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createTextVNode(toDisplayString(m.text), 1)
                            ], 64)),
                            m.marker && A.value(m) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                              s.$slots.marker ? renderSlot(s.$slots, "marker", {
                                key: 0,
                                marker: m.marker,
                                day: +m.text,
                                date: m.value
                              }) : (openBlock(), createElementBlock("div", {
                                key: 1,
                                class: normalizeClass(ee.value(m.marker)),
                                style: normalizeStyle(m.marker.color ? { backgroundColor: m.marker.color } : {})
                              }, null, 6))
                            ], 64)) : createCommentVNode("", true),
                            p.value(m.value) ? (openBlock(), createElementBlock("div", {
                              key: 3,
                              class: "dp__marker_tooltip",
                              ref_for: true,
                              ref_key: "activeTooltip",
                              ref: X,
                              style: normalizeStyle(D.value)
                            }, [
                              (ke = m.marker) != null && ke.tooltip ? (openBlock(), createElementBlock("div", {
                                key: 0,
                                class: "dp__tooltip_content",
                                onClick: C[0] || (C[0] = withModifiers(() => {
                                }, ["stop"]))
                              }, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(m.marker.tooltip, (se, N) => (openBlock(), createElementBlock("div", {
                                  key: N,
                                  class: "dp__tooltip_text"
                                }, [
                                  s.$slots["marker-tooltip"] ? renderSlot(s.$slots, "marker-tooltip", {
                                    key: 0,
                                    tooltip: se,
                                    day: m.value
                                  }) : createCommentVNode("", true),
                                  s.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                    createBaseVNode("div", {
                                      class: "dp__tooltip_mark",
                                      style: normalizeStyle(se.color ? { backgroundColor: se.color } : {})
                                    }, null, 4),
                                    createBaseVNode("div", null, toDisplayString(se.text), 1)
                                  ], 64))
                                ]))), 128)),
                                createBaseVNode("div", {
                                  class: "dp__arrow_bottom_tp",
                                  style: normalizeStyle(k.value)
                                }, null, 4)
                              ])) : createCommentVNode("", true)
                            ], 4)) : createCommentVNode("", true)
                          ], 2)
                        ], 40, Ll);
                      }), 128))
                    ]))), 128))
                  ], 8, Fl)) : createCommentVNode("", true)
                ];
              }),
              _: 3
            }, 8, ["name", "css"])
          ], 64))
        ], 10, Il)
      ], 2);
    };
  }
});
var oa = (e) => Array.isArray(e);
var Wl = (e, n, a, t) => {
  const o = ref([]), { modelValue: l, calendars: c, time: h2 } = Zt(e, n), { defaultedMultiCalendars: y, defaultedStartTime: D } = Ce(e), { validateMonthYearInRange: b, isDisabled: T, isDateRangeAllowed: Y, checkMinMaxRange: q } = Bt(e), { updateTimeValues: K, getSetDateTime: X, setTime: k, assignStartTime: $, disabledTimesConfig: W } = Ra(
    e,
    h2,
    l,
    t
  ), V = computed(
    () => (i) => c.value[i] ? c.value[i].month : 0
  ), G = computed(
    () => (i) => c.value[i] ? c.value[i].year : 0
  ), P = (i, E, ae) => {
    var me, we;
    c.value[i] || (c.value[i] = { month: 0, year: 0 }), c.value[i].month = ea(E) ? (me = c.value[i]) == null ? void 0 : me.month : E, c.value[i].year = ea(ae) ? (we = c.value[i]) == null ? void 0 : we.year : ae;
  }, ee = () => {
    e.autoApply && n("select-date");
  };
  watch(l, (i, E) => {
    JSON.stringify(i) !== JSON.stringify(E) && A();
  }), onMounted(() => {
    e.shadow || (l.value || (s(), D.value && $(D.value)), A(true), e.focusStartDate && e.startDate && s());
  });
  const p = computed(() => {
    var i;
    return (i = e.flow) != null && i.length && !e.partialFlow ? e.flowStep === e.flow.length : true;
  }), _ = () => {
    e.autoApply && p.value && n("auto-apply", e.partialFlow);
  }, A = (i = false) => {
    if (l.value)
      return Array.isArray(l.value) ? (o.value = l.value, d(i)) : z(l.value, i);
    if (y.value.count && i && !e.startDate)
      return H(S(), i);
  }, H = (i, E = false) => {
    if ((!y.value.count || !y.value.static || E) && P(0, getMonth(i), getYear(i)), y.value.count)
      for (let ae = 1; ae < y.value.count; ae++) {
        const me = set(S(), { month: V.value(ae - 1), year: G.value(ae - 1) }), we = add(me, { months: 1 });
        c.value[ae] = { month: getMonth(we), year: getYear(we) };
      }
  }, z = (i, E) => {
    H(i), k("hours", getHours(i)), k("minutes", getMinutes(i)), k("seconds", getSeconds(i)), y.value.count && E && g();
  }, Q = (i) => y.value.count ? Math.abs(differenceInMonths(i[0], i[1])) >= y.value.count ? 1 : 0 : 1, f = (i, E) => {
    i[1] && e.showLastInRange ? H(i[Q(i)], E) : H(i[0], E);
    const ae = (me, we) => [
      me(i[0]),
      i[1] ? me(i[1]) : h2[we][1]
    ];
    k("hours", ae(getHours, "hours")), k("minutes", ae(getMinutes, "minutes")), k("seconds", ae(getSeconds, "seconds"));
  }, U = (i, E) => {
    if ((e.range || e.weekPicker) && !e.multiDates)
      return f(i, E);
    if (e.multiDates) {
      const ae = i[i.length - 1];
      return z(ae, E);
    }
  }, d = (i) => {
    const E = l.value;
    U(E, i), y.value.count && y.value.solo && g();
  }, w = (i, E) => {
    const ae = set(S(), { month: V.value(E), year: G.value(E) }), me = i < 0 ? addMonths(ae, 1) : subMonths(ae, 1);
    b(getMonth(me), getYear(me), i < 0, e.preventMinMaxNavigation) && (P(E, getMonth(me), getYear(me)), y.value.count && !y.value.solo && u(E), a());
  }, u = (i) => {
    for (let E = i - 1; E >= 0; E--) {
      const ae = subMonths(set(S(), { month: V.value(E + 1), year: G.value(E + 1) }), 1);
      P(E, getMonth(ae), getYear(ae));
    }
    for (let E = i + 1; E <= y.value.count - 1; E++) {
      const ae = addMonths(set(S(), { month: V.value(E - 1), year: G.value(E - 1) }), 1);
      P(E, getMonth(ae), getYear(ae));
    }
  }, g = () => {
    if (Array.isArray(l.value) && l.value.length === 2) {
      const i = S(
        S(l.value[1] ? l.value[1] : addMonths(l.value[0], 1))
      ), [E, ae] = [getMonth(l.value[0]), getYear(l.value[0])], [me, we] = [getMonth(l.value[1]), getYear(l.value[1])];
      (E !== me || E === me && ae !== we) && y.value.solo && P(1, getMonth(i), getYear(i));
    } else
      l.value && !Array.isArray(l.value) && (P(0, getMonth(l.value), getYear(l.value)), H(S()));
  }, s = () => {
    e.startDate && (P(0, getMonth(S(e.startDate)), getYear(S(e.startDate))), y.value.count && u(0));
  }, C = (i, E) => {
    e.monthChangeOnScroll && w(e.monthChangeOnScroll !== "inverse" ? -i.deltaY : i.deltaY, E);
  }, ne = (i, E, ae = false) => {
    e.monthChangeOnArrows && e.vertical === ae && r(i, E);
  }, r = (i, E) => {
    w(i === "right" ? -1 : 1, E);
  }, L = (i) => e.markers.find((E) => ye(na(i.value), na(E.date))), R = (i, E) => {
    switch (e.sixWeeks === true ? "append" : e.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [i == 0, true];
      case "fair":
        return [i == 0 || E > i, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, m = (i, E, ae, me) => {
    if (e.sixWeeks && i.length < 6) {
      const we = 6 - i.length, Qe = (E.getDay() + 7 - me) % 7, Ft = 6 - (ae.getDay() + 7 - me) % 7, [Tt, rn] = R(Qe, Ft);
      for (let lt = 1; lt <= we; lt++)
        if (rn ? !!(lt % 2) == Tt : Tt) {
          const Vt = i[0].days[0], ln = B(addDays(Vt.value, -7), getMonth(E));
          i.unshift({ days: ln });
        } else {
          const Vt = i[i.length - 1], ln = Vt.days[Vt.days.length - 1], Oa = B(addDays(ln.value, 1), getMonth(E));
          i.push({ days: Oa });
        }
    }
    return i;
  }, B = (i, E) => {
    const ae = S(JSON.parse(JSON.stringify(i))), me = [];
    for (let we = 0; we < 7; we++) {
      const Qe = addDays(ae, we), $t = getMonth(Qe) !== E;
      me.push({
        text: e.hideOffsetDates && $t ? "" : Qe.getDate(),
        value: Qe,
        current: !$t,
        classData: {}
      });
    }
    return me;
  }, le = (i, E) => {
    const ae = [], me = S(Ze(new Date(E, i), e.timezone)), we = S(Ze(new Date(E, i + 1, 0), e.timezone)), Qe = e.weekStart, $t = startOfWeek(me, { weekStartsOn: Qe }), Ft = (Tt) => {
      const rn = B(Tt, i);
      if (ae.push({ days: rn }), !ae[ae.length - 1].days.some(
        (lt) => ye(Le(lt.value), Le(we))
      )) {
        const lt = addDays(Tt, 7);
        Ft(lt);
      }
    };
    return Ft($t), m(ae, me, we, Qe);
  }, Z = (i) => (l.value = jt(S(i.value), e.timezone, e.weekStart), _()), ke = (i) => {
    const E = tt(S(i.value), h2.hours, h2.minutes, Et());
    e.multiDates ? Ln(E, l, e.multiDatesLimit) : l.value = E, t(), nextTick().then(() => {
      _();
    });
  }, se = (i) => e.noDisabledRange ? $a(o.value[0], i).some((ae) => T(ae)) : false, N = () => {
    o.value = l.value ? l.value.slice() : [], o.value.length === 2 && !(e.fixedStart || e.fixedEnd) && (o.value = []);
  }, x = (i, E) => {
    const ae = [S(i.value), addDays(S(i.value), +e.autoRange)];
    Y(ae) && (E && $e(i.value), o.value = ae);
  }, $e = (i) => {
    const E = getMonth(S(i)), ae = getYear(S(i));
    if (P(0, E, ae), y.value.count > 0)
      for (let me = 1; me < y.value.count; me++) {
        const we = Cr(
          set(S(i), { year: V.value(me - 1), month: G.value(me - 1) })
        );
        P(me, we.month, we.year);
      }
  }, J = (i) => Array.isArray(l.value) && l.value.length === 2 ? e.fixedStart && (Ne(i, l.value[0]) || ye(i, l.value[0])) ? [l.value[0], i] : e.fixedEnd && (Pe(i, l.value[1]) || ye(i, l.value[1])) ? [i, l.value[1]] : (n("invalid-fixed-range", i), l.value) : [], Ve = (i) => {
    se(i.value) || !q(i.value, l.value, e.fixedStart ? 0 : 1) || (o.value = J(S(i.value)));
  }, _e = (i, E) => {
    if (N(), e.autoRange)
      return x(i, E);
    if (e.fixedStart || e.fixedEnd)
      return Ve(i);
    o.value[0] ? q(S(i.value), l.value) && !se(i.value) && (Pe(S(i.value), S(o.value[0])) ? (o.value.unshift(S(i.value)), n("range-end", o.value[0])) : (o.value[1] = S(i.value), n("range-end", o.value[1]))) : (o.value[0] = S(i.value), n("range-start", o.value[0]));
  }, Et = (i = true) => e.enableSeconds ? Array.isArray(h2.seconds) ? i ? h2.seconds[0] : h2.seconds[1] : h2.seconds : 0, Mt = (i) => {
    o.value[i] = tt(
      o.value[i],
      h2.hours[i],
      h2.minutes[i],
      Et(i !== 1)
    );
  }, Jt = () => {
    var i, E;
    o.value[0] && o.value[1] && +((i = o.value) == null ? void 0 : i[0]) > +((E = o.value) == null ? void 0 : E[1]) && (o.value.reverse(), n("range-start", o.value[0]), n("range-end", o.value[1]));
  }, Xt = () => {
    o.value.length && (o.value[0] && !o.value[1] ? Mt(0) : (Mt(0), Mt(1), t()), Jt(), l.value = o.value.slice(), o.value[0] && o.value[1] && e.autoApply && n("auto-apply"), o.value[0] && !o.value[1] && e.modelAuto && e.autoApply && n("auto-apply"));
  }, Qt = (i, E = false) => {
    if (!(T(i.value) || !i.current && e.hideOffsetDates)) {
      if (e.weekPicker)
        return Z(i);
      if (!e.range)
        return ke(i);
      oa(h2.hours) && oa(h2.minutes) && !e.multiDates && (_e(i, E), Xt());
    }
  }, en = (i, E) => {
    P(i, E.month, E.year), y.value.count && !y.value.solo && u(i), a(y.value.solo ? i : void 0), t();
  }, tn = (i, E) => {
    Array.isArray(i) && i.length <= 2 && e.range ? l.value = i.map((ae) => Ze(S(ae), E ? void 0 : e.timezone)) : Array.isArray(i) || (l.value = Ze(S(i), E ? void 0 : e.timezone)), ee(), e.multiCalendars && nextTick().then(() => A(true));
  }, nn = () => {
    e.range ? l.value && Array.isArray(l.value) && l.value[0] ? l.value = Pe(S(), l.value[0]) ? [S(), l.value[0]] : [l.value[0], S()] : l.value = [S()] : l.value = S(), ee();
  }, an = () => {
    if (Array.isArray(l.value))
      if (e.multiDates) {
        const i = re();
        l.value[l.value.length - 1] = X(i);
      } else
        l.value = l.value.map((i, E) => i && X(i, E));
    else
      l.value = X(l.value);
    n("time-update");
  }, re = () => Array.isArray(l.value) && l.value.length ? l.value[l.value.length - 1] : null;
  return {
    calendars: c,
    modelValue: l,
    month: V,
    year: G,
    time: h2,
    disabledTimesConfig: W,
    getCalendarDays: le,
    getMarker: L,
    handleScroll: C,
    handleSwipe: r,
    handleArrow: ne,
    selectDate: Qt,
    updateMonthYear: en,
    presetDate: tn,
    selectCurrentDate: nn,
    updateTime: (i, E = true, ae = false) => {
      K(i, E, ae, an);
    }
  };
};
var zl = { key: 0 };
var jl = defineComponent({
  __name: "DatePicker",
  props: {
    ...Xe
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
    "recalculate-position"
  ],
  setup(e, { expose: n, emit: a }) {
    const t = e, {
      calendars: o,
      month: l,
      year: c,
      modelValue: h2,
      time: y,
      disabledTimesConfig: D,
      getCalendarDays: b,
      getMarker: T,
      handleArrow: Y,
      handleScroll: q,
      handleSwipe: K,
      selectDate: X,
      updateMonthYear: k,
      presetDate: $,
      selectCurrentDate: W,
      updateTime: V
    } = Wl(t, a, u, g), G = useSlots(), { setHoverDate: P, getDayClassData: ee, clearHoverDate: p } = Zr(h2, t), { defaultedMultiCalendars: _ } = Ce(t), A = ref([]), H = ref([]), z = ref(null), Q = je(G, "calendar"), f = je(G, "monthYear"), U = je(G, "timePicker"), d = (R) => {
      t.shadow || a("mount", R);
    };
    watch(
      o,
      () => {
        t.shadow || setTimeout(() => {
          a("recalculate-position");
        }, 0);
      },
      { deep: true }
    );
    const w = computed(() => (R) => b(l.value(R), c.value(R)).map((m) => ({
      ...m,
      days: m.days.map((B) => (B.marker = T(B), B.classData = ee(B), B))
    })));
    function u(R) {
      var m;
      R || R === 0 ? (m = H.value[R]) == null || m.triggerTransition(l.value(R), c.value(R)) : H.value.forEach((B, le) => B.triggerTransition(l.value(le), c.value(le)));
    }
    function g() {
      a("update-flow-step");
    }
    const s = (R, m = false) => {
      X(R, m), t.spaceConfirm && a("select-date");
    };
    return n({
      clearHoverDate: p,
      presetDate: $,
      selectCurrentDate: W,
      toggleMonthPicker: (R, m, B = 0) => {
        var le;
        (le = A.value[B]) == null || le.toggleMonthPicker(R, m);
      },
      toggleYearPicker: (R, m, B = 0) => {
        var le;
        (le = A.value[B]) == null || le.toggleYearPicker(R, m);
      },
      toggleTimePicker: (R, m, B) => {
        var le;
        (le = z.value) == null || le.toggleTimePicker(R, m, B);
      },
      handleArrow: Y,
      updateMonthYear: k,
      getSidebarProps: () => ({
        modelValue: h2,
        month: l,
        year: c,
        time: y,
        updateTime: V,
        updateMonthYear: k,
        selectDate: X,
        presetDate: $
      })
    }), (R, m) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(Hn, {
        "multi-calendars": unref(_).count
      }, {
        default: withCtx(({ instance: B, index: le }) => [
          R.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(Ol, mergeProps({
            key: 0,
            ref: (Z) => {
              Z && (A.value[le] = Z);
            },
            months: unref(ka)(R.formatLocale, R.locale, R.monthNameFormat),
            years: unref(Fn)(R.yearRange, R.reverseYears),
            month: unref(l)(B),
            year: unref(c)(B),
            instance: B
          }, R.$props, {
            onMount: m[0] || (m[0] = (Z) => d(unref(vt).header)),
            onResetFlow: m[1] || (m[1] = (Z) => R.$emit("reset-flow")),
            onUpdateMonthYear: (Z) => unref(k)(B, Z),
            onOverlayClosed: m[2] || (m[2] = (Z) => R.$emit("focus-menu"))
          }), createSlots({ _: 2 }, [
            renderList(unref(f), (Z, ke) => ({
              name: Z,
              fn: withCtx((se) => [
                renderSlot(R.$slots, Z, normalizeProps(guardReactiveProps(se)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(Ul, mergeProps({
            ref: (Z) => {
              Z && (H.value[le] = Z);
            },
            "mapped-dates": w.value(B),
            month: unref(l)(B),
            year: unref(c)(B)
          }, R.$props, {
            onSelectDate: (Z) => unref(X)(Z, B !== 1),
            onHandleSpace: (Z) => s(Z, B !== 1),
            onSetHoverDate: m[3] || (m[3] = (Z) => unref(P)(Z)),
            onHandleScroll: (Z) => unref(q)(Z, B),
            onHandleSwipe: (Z) => unref(K)(Z, B),
            onMount: m[4] || (m[4] = (Z) => d(unref(vt).calendar)),
            onResetFlow: m[5] || (m[5] = (Z) => R.$emit("reset-flow")),
            onTooltipOpen: m[6] || (m[6] = (Z) => R.$emit("tooltip-open", Z)),
            onTooltipClose: m[7] || (m[7] = (Z) => R.$emit("tooltip-close", Z))
          }), createSlots({ _: 2 }, [
            renderList(unref(Q), (Z, ke) => ({
              name: Z,
              fn: withCtx((se) => [
                renderSlot(R.$slots, Z, normalizeProps(guardReactiveProps({ ...se })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars"]),
      R.enableTimePicker ? (openBlock(), createElementBlock("div", zl, [
        R.$slots["time-picker"] ? renderSlot(R.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(y), updateTime: unref(V) }))) : (openBlock(), createBlock(Ca, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: z
        }, R.$props, {
          hours: unref(y).hours,
          minutes: unref(y).minutes,
          seconds: unref(y).seconds,
          "internal-model-value": R.internalModelValue,
          "disabled-times-config": unref(D),
          onMount: m[8] || (m[8] = (B) => d(unref(vt).timePicker)),
          "onUpdate:hours": m[9] || (m[9] = (B) => unref(V)(B)),
          "onUpdate:minutes": m[10] || (m[10] = (B) => unref(V)(B, false)),
          "onUpdate:seconds": m[11] || (m[11] = (B) => unref(V)(B, false, true)),
          onResetFlow: m[12] || (m[12] = (B) => R.$emit("reset-flow")),
          onOverlayClosed: m[13] || (m[13] = (B) => R.$emit("time-picker-close")),
          onOverlayOpened: m[14] || (m[14] = (B) => R.$emit("time-picker-open", B)),
          onAmPmChange: m[15] || (m[15] = (B) => R.$emit("am-pm-change", B))
        }), createSlots({ _: 2 }, [
          renderList(unref(U), (B, le) => ({
            name: B,
            fn: withCtx((Z) => [
              renderSlot(R.$slots, B, normalizeProps(guardReactiveProps(Z)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config"]))
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var Kl = ["id", "onKeydown"];
var Gl = {
  key: 0,
  class: "dp__sidebar_left"
};
var Zl = {
  key: 1,
  class: "dp--preset-dates"
};
var ql = ["onClick", "onKeydown"];
var xl = {
  key: 2,
  class: "dp__sidebar_right"
};
var Jl = {
  key: 3,
  class: "dp__action_extra"
};
var sa = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerMenu",
  props: {
    ...xt,
    shadow: { type: Boolean, default: false },
    openOnTop: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    arrMapValues: { type: Object, default: () => ({}) }
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
    "range-end"
  ],
  setup(e, { expose: n, emit: a }) {
    const t = e, o = computed(() => {
      const { openOnTop: N, ...x } = t;
      return {
        ...x,
        flowStep: ee.value
      };
    }), { setMenuFocused: l, setShiftKey: c, control: h2 } = Sa(), y = useSlots(), { defaultedTextInput: D, defaultedInline: b } = Ce(t), T = ref(null), Y = ref(0), q = ref(null), K = ref(null), X = ref(false), k = ref(null);
    onMounted(() => {
      if (!t.shadow) {
        X.value = true, $(), window.addEventListener("resize", $);
        const N = Ae(q);
        if (N && !D.value.enabled && !b.value.enabled && (l(true), z()), N) {
          const x = ($e) => {
            t.allowPreventDefault && $e.preventDefault(), $e.stopImmediatePropagation(), $e.stopPropagation();
          };
          N.addEventListener("pointerdown", x), N.addEventListener("mousedown", x);
        }
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", $);
    });
    const $ = () => {
      const N = Ae(K);
      N && (Y.value = N.getBoundingClientRect().width);
    }, { arrowRight: W, arrowLeft: V, arrowDown: G, arrowUp: P } = rt(), { flowStep: ee, updateFlowStep: p, childMount: _, resetFlow: A } = qr(t, a, k), H = computed(() => t.monthPicker ? fl : t.yearPicker ? ml : t.timePicker ? Cl : jl), z = () => {
      const N = Ae(q);
      N && N.focus({ preventScroll: true });
    }, Q = () => computed(() => {
      var N;
      return (N = k.value) == null ? void 0 : N.getSidebarProps();
    }), f = () => {
      t.openOnTop && a("recalculate-position");
    }, U = je(y, "action"), d = computed(() => t.monthPicker || t.yearPicker ? je(y, "monthYear") : t.timePicker ? je(y, "timePicker") : je(y, "shared")), w = computed(() => t.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), u = computed(() => ({
      dp__menu_disabled: t.disabled,
      dp__menu_readonly: t.readonly
    })), g = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !b.value.enabled,
        dp__relative: b.value.enabled,
        [t.menuClassName]: !!t.menuClassName
      })
    ), s = (N) => {
      N.stopPropagation(), N.stopImmediatePropagation();
    }, C = () => {
      t.escClose && a("close-picker");
    }, ne = (N) => {
      if (t.arrowNavigation) {
        if (N === "up")
          return P();
        if (N === "down")
          return G();
        if (N === "left")
          return V();
        if (N === "right")
          return W();
      } else
        N === "left" || N === "up" ? B("handleArrow", "left", 0, N === "up") : B("handleArrow", "right", 0, N === "down");
    }, r = (N) => {
      c(N.shiftKey), !t.disableMonthYearSelect && N.code === "Tab" && N.target.classList.contains("dp__menu") && h2.value.shiftKeyInMenu && (N.preventDefault(), N.stopImmediatePropagation(), a("close-picker"));
    }, L = () => {
      z(), a("time-picker-close");
    }, R = (N) => {
      var x, $e, J;
      (x = k.value) == null || x.toggleTimePicker(false, false), ($e = k.value) == null || $e.toggleMonthPicker(false, false, N), (J = k.value) == null || J.toggleYearPicker(false, false, N);
    }, m = (N, x = 0) => {
      var $e, J, Ve;
      return N === "month" ? ($e = k.value) == null ? void 0 : $e.toggleMonthPicker(false, true, x) : N === "year" ? (J = k.value) == null ? void 0 : J.toggleYearPicker(false, true, x) : N === "time" ? (Ve = k.value) == null ? void 0 : Ve.toggleTimePicker(true, false) : R(x);
    }, B = (N, ...x) => {
      var $e, J;
      ($e = k.value) != null && $e[N] && ((J = k.value) == null || J[N](...x));
    }, le = () => {
      B("selectCurrentDate");
    }, Z = (N, x) => {
      B("presetDate", N, x);
    }, ke = () => {
      B("clearHoverDate");
    };
    return n({
      updateMonthYear: (N, x) => {
        B("updateMonthYear", N, x);
      },
      switchView: m
    }), (N, x) => {
      var $e;
      return openBlock(), createElementBlock("div", {
        id: N.uid ? `dp-menu-${N.uid}` : void 0,
        tabindex: "0",
        ref_key: "dpMenuRef",
        ref: q,
        role: "dialog",
        class: normalizeClass(g.value),
        onMouseleave: ke,
        onClick: s,
        onKeydown: [
          withKeys(C, ["esc"]),
          x[14] || (x[14] = withKeys(withModifiers((J) => ne("left"), ["prevent"]), ["left"])),
          x[15] || (x[15] = withKeys(withModifiers((J) => ne("up"), ["prevent"]), ["up"])),
          x[16] || (x[16] = withKeys(withModifiers((J) => ne("down"), ["prevent"]), ["down"])),
          x[17] || (x[17] = withKeys(withModifiers((J) => ne("right"), ["prevent"]), ["right"])),
          r
        ]
      }, [
        (N.disabled || N.readonly) && unref(b).enabled ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(u.value)
        }, null, 2)) : createCommentVNode("", true),
        !unref(b).enabled && !N.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(w.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: K,
          class: normalizeClass({
            dp__menu_content_wrapper: (($e = N.presetDates) == null ? void 0 : $e.length) || !!N.$slots["left-sidebar"] || !!N.$slots["right-sidebar"]
          }),
          style: normalizeStyle({ "--dp-menu-width": `${Y.value}px` })
        }, [
          N.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", Gl, [
            renderSlot(N.$slots, "left-sidebar", normalizeProps(guardReactiveProps(Q())))
          ])) : createCommentVNode("", true),
          N.presetDates.length ? (openBlock(), createElementBlock("div", Zl, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(N.presetDates, (J, Ve) => (openBlock(), createElementBlock("div", {
              key: Ve,
              style: normalizeStyle(J.style || {}),
              class: "dp--preset-range"
            }, [
              J.slot ? renderSlot(N.$slots, J.slot, {
                key: 0,
                presetDate: Z,
                label: J.label,
                value: J.value
              }) : (openBlock(), createElementBlock("div", {
                key: 1,
                role: "button",
                tabindex: "0",
                onClick: (_e) => Z(J.value, J.noTz),
                onKeydown: [
                  withKeys(withModifiers((_e) => Z(J.value, J.noTz), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((_e) => Z(J.value, J.noTz), ["prevent"]), ["space"])
                ]
              }, toDisplayString(J.label), 41, ql))
            ], 4))), 128))
          ])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: "dp__instance_calendar",
            ref_key: "calendarWrapperRef",
            ref: T,
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(H.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: k
            }, o.value, {
              "flow-step": unref(ee),
              onMount: unref(_),
              onUpdateFlowStep: unref(p),
              onResetFlow: unref(A),
              onFocusMenu: z,
              onSelectDate: x[0] || (x[0] = (J) => N.$emit("select-date")),
              onTooltipOpen: x[1] || (x[1] = (J) => N.$emit("tooltip-open", J)),
              onTooltipClose: x[2] || (x[2] = (J) => N.$emit("tooltip-close", J)),
              onAutoApply: x[3] || (x[3] = (J) => N.$emit("auto-apply", J)),
              onRangeStart: x[4] || (x[4] = (J) => N.$emit("range-start", J)),
              onRangeEnd: x[5] || (x[5] = (J) => N.$emit("range-end", J)),
              onInvalidFixedRange: x[6] || (x[6] = (J) => N.$emit("invalid-fixed-range", J)),
              onTimeUpdate: x[7] || (x[7] = (J) => N.$emit("time-update")),
              onAmPmChange: x[8] || (x[8] = (J) => N.$emit("am-pm-change", J)),
              onTimePickerOpen: x[9] || (x[9] = (J) => N.$emit("time-picker-open", J)),
              onTimePickerClose: L,
              onRecalculatePosition: f,
              "onUpdate:internalModelValue": x[10] || (x[10] = (J) => N.$emit("update:internal-model-value", J))
            }), createSlots({ _: 2 }, [
              renderList(d.value, (J, Ve) => ({
                name: J,
                fn: withCtx((_e) => [
                  renderSlot(N.$slots, J, normalizeProps(guardReactiveProps({ ..._e })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          N.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", xl, [
            renderSlot(N.$slots, "right-sidebar", normalizeProps(guardReactiveProps(Q())))
          ])) : createCommentVNode("", true),
          N.$slots["action-extra"] ? (openBlock(), createElementBlock("div", Jl, [
            N.$slots["action-extra"] ? renderSlot(N.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: le
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 6),
        !N.autoApply || N.keepActionRow ? (openBlock(), createBlock(al, mergeProps({
          key: 2,
          "menu-mount": X.value
        }, o.value, {
          "calendar-width": Y.value,
          onClosePicker: x[11] || (x[11] = (J) => N.$emit("close-picker")),
          onSelectDate: x[12] || (x[12] = (J) => N.$emit("select-date")),
          onInvalidSelect: x[13] || (x[13] = (J) => N.$emit("invalid-select")),
          onSelectNow: le
        }), createSlots({ _: 2 }, [
          renderList(unref(U), (J, Ve) => ({
            name: J,
            fn: withCtx((_e) => [
              renderSlot(N.$slots, J, normalizeProps(guardReactiveProps({ ..._e })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
      ], 42, Kl);
    };
  }
});
var Xl = typeof window < "u" ? window : void 0;
var hn = () => {
};
var Ql = (e) => getCurrentScope() ? (onScopeDispose(e), true) : false;
var eo = (e, n, a, t) => {
  if (!e)
    return hn;
  let o = hn;
  const l = watch(
    () => unref(e),
    (h2) => {
      o(), h2 && (h2.addEventListener(n, a, t), o = () => {
        h2.removeEventListener(n, a, t), o = hn;
      });
    },
    { immediate: true, flush: "post" }
  ), c = () => {
    l(), o();
  };
  return Ql(c), c;
};
var to = (e, n, a, t = {}) => {
  const { window: o = Xl, event: l = "pointerdown" } = t;
  return o ? eo(o, l, (h2) => {
    const y = Ae(e), D = Ae(n);
    !y || !D || y === h2.target || h2.composedPath().includes(y) || h2.composedPath().includes(D) || a(h2);
  }, { passive: true }) : void 0;
};
var no = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "VueDatePicker",
  props: {
    ...xt
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
    "range-end"
  ],
  setup(e, { expose: n, emit: a }) {
    const t = e, o = useSlots(), l = ref(false), c = toRef(t, "modelValue"), h2 = toRef(t, "timezone"), y = ref(null), D = ref(null), b = ref(null), T = ref(false), Y = ref(null), q = reactive({
      disabledDates: null,
      allowedDates: null,
      highlightedDates: null
    }), { setMenuFocused: K, setShiftKey: X } = Sa(), { clearArrowNav: k } = rt(), { mapDatesArrToMap: $, validateDate: W, isValidTime: V } = Bt(t), { defaultedTransitions: G, defaultedTextInput: P, defaultedInline: ee } = Ce(t), { menuTransition: p, showTransition: _ } = Yt(G);
    onMounted(() => {
      s(t.modelValue), nextTick().then(() => {
        ee.value.enabled || (d(Y.value).addEventListener("scroll", B), window.addEventListener("resize", le));
      }), ee.value.enabled && (l.value = true), $(q);
    }), onUnmounted(() => {
      if (!ee.value.enabled) {
        const re = d(Y.value);
        re && re.removeEventListener("scroll", B), window.removeEventListener("resize", le);
      }
    });
    const A = je(o, "all", t.presetDates), H = je(o, "input");
    watch(
      [c, h2],
      () => {
        s(c.value);
      },
      { deep: true }
    );
    const { openOnTop: z, menuStyle: Q, xCorrect: f, setMenuPosition: U, getScrollableParent: d, shadowRender: w } = jr(
      y,
      D,
      b,
      Y,
      ee,
      a,
      t
    ), {
      inputValue: u,
      internalModelValue: g,
      parseExternalModelValue: s,
      emitModelValue: C,
      formatInputValue: ne,
      checkBeforeEmit: r
    } = Wr(a, t, T), L = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: t.dark,
        dp__theme_light: !t.dark,
        dp__flex_display: ee.value.enabled,
        dp__flex_display_with_input: ee.value.input
      })
    ), R = computed(() => t.dark ? "dp__theme_dark" : "dp__theme_light"), m = computed(() => t.teleport ? {
      to: typeof t.teleport == "boolean" ? "body" : t.teleport,
      disabled: ee.value.enabled
    } : { class: "dp__outer_menu_wrap" }), B = () => {
      l.value && (t.closeOnScroll ? _e() : U());
    }, le = () => {
      l.value && U();
    }, Z = () => {
      !t.disabled && !t.readonly && (w(sa, t), U(false), l.value = true, l.value && a("open"), l.value || Ve(), s(t.modelValue));
    }, ke = () => {
      u.value = "", Ve(), a("update:model-value", null), a("update:model-timezone-value", null), a("cleared"), t.closeOnClearValue && _e();
    }, se = () => {
      const re = g.value;
      return !re || !Array.isArray(re) && W(re) ? true : Array.isArray(re) ? re.length === 2 && W(re[0]) && W(re[1]) ? true : t.partialRange && !t.timePicker ? W(re[0]) : false : false;
    }, N = () => {
      r() && se() ? (C(), _e()) : a("invalid-select", g.value);
    }, x = (re) => {
      $e(), C(), t.closeOnAutoApply && !re && _e();
    }, $e = () => {
      b.value && P.value.enabled && b.value.setParsedDate(g.value);
    }, J = (re = false) => {
      t.autoApply && V(g.value) && se() && (t.range && Array.isArray(g.value) ? (t.partialRange || g.value.length === 2) && x(re) : x(re));
    }, Ve = () => {
      P.value.enabled || (g.value = null);
    }, _e = () => {
      ee.value.enabled || (l.value && (l.value = false, f.value = false, K(false), X(false), k(), a("closed"), u.value && s(c.value)), Ve(), a("blur"));
    }, Et = (re, ie) => {
      if (!re) {
        g.value = null;
        return;
      }
      g.value = re, ie && (N(), a("text-submit"));
    }, Mt = () => {
      t.autoApply && V(g.value) && C(), $e();
    }, Jt = () => l.value ? _e() : Z(), Xt = (re) => {
      g.value = re;
    }, Qt = () => {
      P.value.enabled && (T.value = true, ne()), a("focus");
    }, en = () => {
      P.value.enabled && (T.value = false, s(t.modelValue)), a("blur");
    }, tn = (re) => {
      D.value && D.value.updateMonthYear(0, {
        month: Qn(re.month),
        year: Qn(re.year)
      });
    }, nn = (re) => {
      s(re ?? t.modelValue);
    }, an = (re, ie) => {
      var i;
      (i = D.value) == null || i.switchView(re, ie);
    };
    return to(
      y,
      b,
      t.onClickOutside ? () => t.onClickOutside(se) : _e
    ), n({
      closeMenu: _e,
      selectDate: N,
      clearValue: ke,
      openMenu: Z,
      onScroll: B,
      formatInputValue: ne,
      // exposed for testing purposes
      updateInternalModelValue: Xt,
      // modify internal modelValue
      setMonthYear: tn,
      parseModel: nn,
      switchView: an
    }), (re, ie) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(L.value),
      ref_key: "pickerWrapperRef",
      ref: Y
    }, [
      createVNode(Qr, mergeProps({
        ref_key: "inputRef",
        ref: b,
        "is-menu-open": l.value,
        "input-value": unref(u),
        "onUpdate:inputValue": ie[0] || (ie[0] = (i) => isRef(u) ? u.value = i : null)
      }, re.$props, {
        onClear: ke,
        onOpen: Z,
        onSetInputDate: Et,
        onSetEmptyDate: unref(C),
        onSelectDate: N,
        onToggle: Jt,
        onClose: _e,
        onFocus: Qt,
        onBlur: en,
        onRealBlur: ie[1] || (ie[1] = (i) => T.value = false)
      }), createSlots({ _: 2 }, [
        renderList(unref(H), (i, E) => ({
          name: i,
          fn: withCtx((ae) => [
            renderSlot(re.$slots, i, normalizeProps(guardReactiveProps(ae)))
          ])
        }))
      ]), 1040, ["is-menu-open", "input-value", "onSetEmptyDate"]),
      createVNode(Transition, {
        name: unref(p)(unref(z)),
        css: unref(_) && !unref(ee).enabled
      }, {
        default: withCtx(() => [
          l.value ? (openBlock(), createBlock(resolveDynamicComponent(re.teleport ? Teleport : "div"), mergeProps({
            key: 0,
            ref_key: "dpWrapMenuRef",
            ref: y
          }, m.value, {
            class: { "dp--menu-wrapper": !unref(ee).enabled },
            style: unref(ee).enabled ? void 0 : unref(Q)
          }), {
            default: withCtx(() => [
              createVNode(sa, mergeProps({
                ref_key: "dpMenuRef",
                ref: D,
                class: { [R.value]: true, "dp--menu-wrapper": re.teleport },
                style: re.teleport ? unref(Q) : void 0,
                "open-on-top": unref(z),
                "arr-map-values": q
              }, re.$props, {
                "internal-model-value": unref(g),
                "onUpdate:internalModelValue": ie[2] || (ie[2] = (i) => isRef(g) ? g.value = i : null),
                onClosePicker: _e,
                onSelectDate: N,
                onAutoApply: J,
                onTimeUpdate: Mt,
                onFlowStep: ie[3] || (ie[3] = (i) => re.$emit("flow-step", i)),
                onUpdateMonthYear: ie[4] || (ie[4] = (i) => re.$emit("update-month-year", i)),
                onInvalidSelect: ie[5] || (ie[5] = (i) => re.$emit("invalid-select", unref(g))),
                onInvalidFixedRange: ie[6] || (ie[6] = (i) => re.$emit("invalid-fixed-range", i)),
                onRecalculatePosition: unref(U),
                onTooltipOpen: ie[7] || (ie[7] = (i) => re.$emit("tooltip-open", i)),
                onTooltipClose: ie[8] || (ie[8] = (i) => re.$emit("tooltip-close", i)),
                onTimePickerOpen: ie[9] || (ie[9] = (i) => re.$emit("time-picker-open", i)),
                onTimePickerClose: ie[10] || (ie[10] = (i) => re.$emit("time-picker-close", i)),
                onAmPmChange: ie[11] || (ie[11] = (i) => re.$emit("am-pm-change", i)),
                onRangeStart: ie[12] || (ie[12] = (i) => re.$emit("range-start", i)),
                onRangeEnd: ie[13] || (ie[13] = (i) => re.$emit("range-end", i))
              }), createSlots({ _: 2 }, [
                renderList(unref(A), (i, E) => ({
                  name: i,
                  fn: withCtx((ae) => [
                    renderSlot(re.$slots, i, normalizeProps(guardReactiveProps({ ...ae })))
                  ])
                }))
              ]), 1040, ["class", "style", "open-on-top", "arr-map-values", "internal-model-value", "onRecalculatePosition"])
            ]),
            _: 3
          }, 16, ["class", "style"])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["name", "css"])
    ], 2));
  }
});
var Na = (() => {
  const e = no;
  return e.install = (n) => {
    n.component("Vue3DatePicker", e);
  }, e;
})();
var ao = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Na
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(ao).forEach(([e, n]) => {
  e !== "default" && (Na[e] = n);
});
export {
  Na as default
};
//# sourceMappingURL=@vuepic_vue-datepicker.js.map
