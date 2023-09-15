import {
  add,
  addDays,
  addMonths,
  addYears,
  differenceInCalendarDays,
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
} from "./chunk-JSJ3TUJW.js";
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

// node_modules/.pnpm/@vuepic+vue-datepicker@6.0.2_vue@3.3.4/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
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
function ha() {
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
ha.compatConfig = {
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
var jn = Yn(Xa);
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
  var k = /* @__PURE__ */ new Date(0);
  return k.setUTCFullYear(e, n, a), k.setUTCHours(t, o, l, c), k;
}
var Kn = 36e5;
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
    return l = parseInt(t[1], 10), Gn(l) ? -(l * Kn) : NaN;
  if (t = sn.timezoneHHMM.exec(e), t) {
    l = parseInt(t[1], 10);
    var c = parseInt(t[2], 10);
    return Gn(l, c) ? (o = Math.abs(l) * Kn + c * rr, l > 0 ? -o : o) : NaN;
  }
  if (sr(e)) {
    n = new Date(n || Date.now());
    var k = a ? n : lr(n), h2 = Dn(k, e), M = a ? h2 : or(n, h2, e);
    return -M;
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
function Gn(e, n) {
  return -23 <= e && e <= 23 && (n == null || 0 <= n && n <= 59);
}
var Zn = {};
function sr(e) {
  if (Zn[e])
    return true;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e }), Zn[e] = true, true;
  } catch {
    return false;
  }
}
var ba = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
var un = 36e5;
var qn = 6e4;
var ur = 2;
var Ie = {
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
  timeZone: ba
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
  var o = ir(e), l = dr(o.date, t), c = l.year, k = l.restDateString, h2 = cr(k, c);
  if (isNaN(h2))
    return /* @__PURE__ */ new Date(NaN);
  if (h2) {
    var M = h2.getTime(), p = 0, T;
    if (o.time && (p = fr(o.time), isNaN(p)))
      return /* @__PURE__ */ new Date(NaN);
    if (o.timeZone || a.timeZone) {
      if (T = En(o.timeZone || a.timeZone, new Date(M + p)), isNaN(T))
        return /* @__PURE__ */ new Date(NaN);
    } else
      T = jn(new Date(M + p)), T = jn(new Date(M + p + T));
    return new Date(M + p + T);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function ir(e) {
  var n = {}, a = Ie.dateTimePattern.exec(e), t;
  if (a ? (n.date = a[1], t = a[3]) : (a = Ie.datePattern.exec(e), a ? (n.date = a[1], t = a[2]) : (n.date = null, t = e)), t) {
    var o = Ie.timeZone.exec(t);
    o ? (n.time = t.replace(o[1], ""), n.timeZone = o[1].trim()) : n.time = t;
  }
  return n;
}
function dr(e, n) {
  var a = Ie.YYY[n], t = Ie.YYYYY[n], o;
  if (o = Ie.YYYY.exec(e) || t.exec(e), o) {
    var l = o[1];
    return {
      year: parseInt(l, 10),
      restDateString: e.slice(l.length)
    };
  }
  if (o = Ie.YY.exec(e) || a.exec(e), o) {
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
function cr(e, n) {
  if (n === null)
    return null;
  var a, t, o, l;
  if (e.length === 0)
    return t = /* @__PURE__ */ new Date(0), t.setUTCFullYear(n), t;
  if (a = Ie.MM.exec(e), a)
    return t = /* @__PURE__ */ new Date(0), o = parseInt(a[1], 10) - 1, Jn(n, o) ? (t.setUTCFullYear(n, o), t) : /* @__PURE__ */ new Date(NaN);
  if (a = Ie.DDD.exec(e), a) {
    t = /* @__PURE__ */ new Date(0);
    var c = parseInt(a[1], 10);
    return gr(n, c) ? (t.setUTCFullYear(n, 0, c), t) : /* @__PURE__ */ new Date(NaN);
  }
  if (a = Ie.MMDD.exec(e), a) {
    t = /* @__PURE__ */ new Date(0), o = parseInt(a[1], 10) - 1;
    var k = parseInt(a[2], 10);
    return Jn(n, o, k) ? (t.setUTCFullYear(n, o, k), t) : /* @__PURE__ */ new Date(NaN);
  }
  if (a = Ie.Www.exec(e), a)
    return l = parseInt(a[1], 10) - 1, Xn(n, l) ? xn(n, l) : /* @__PURE__ */ new Date(NaN);
  if (a = Ie.WwwD.exec(e), a) {
    l = parseInt(a[1], 10) - 1;
    var h2 = parseInt(a[2], 10) - 1;
    return Xn(n, l, h2) ? xn(n, l, h2) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function fr(e) {
  var n, a, t;
  if (n = Ie.HH.exec(e), n)
    return a = parseFloat(n[1].replace(",", ".")), dn(a) ? a % 24 * un : NaN;
  if (n = Ie.HHMM.exec(e), n)
    return a = parseInt(n[1], 10), t = parseFloat(n[2].replace(",", ".")), dn(a, t) ? a % 24 * un + t * qn : NaN;
  if (n = Ie.HHMMSS.exec(e), n) {
    a = parseInt(n[1], 10), t = parseInt(n[2], 10);
    var o = parseFloat(n[3].replace(",", "."));
    return dn(a, t, o) ? a % 24 * un + t * qn + o * 1e3 : NaN;
  }
  return null;
}
function xn(e, n, a) {
  n = n || 0, a = a || 0;
  var t = /* @__PURE__ */ new Date(0);
  t.setUTCFullYear(e, 0, 4);
  var o = t.getUTCDay() || 7, l = n * 7 + a + 1 - o;
  return t.setUTCDate(t.getUTCDate() + l), t;
}
var vr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var mr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function ka(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function Jn(e, n, a) {
  if (n < 0 || n > 11)
    return false;
  if (a != null) {
    if (a < 1)
      return false;
    var t = ka(e);
    if (t && a > mr[n] || !t && a > vr[n])
      return false;
  }
  return true;
}
function gr(e, n) {
  if (n < 1)
    return false;
  var a = ka(e);
  return !(a && n > 366 || !a && n > 365);
}
function Xn(e, n, a) {
  return !(n < 0 || n > 52 || a != null && (a < 0 || a > 6));
}
function dn(e, n, a) {
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
var hr = $n.exports;
var pr = Yn(hr);
function br(e, n, a) {
  var t = Mn(e, a), o = En(n, t, true), l = new Date(t.getTime() - o), c = /* @__PURE__ */ new Date(0);
  return c.setFullYear(l.getUTCFullYear(), l.getUTCMonth(), l.getUTCDate()), c.setHours(l.getUTCHours(), l.getUTCMinutes(), l.getUTCSeconds(), l.getUTCMilliseconds()), c;
}
function kr(e, n, a) {
  if (typeof e == "string" && !e.match(ba)) {
    var t = pr(a);
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
function Qn(e) {
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
      o = t.map(Qn(n));
    }
  else
    o = t.map(Qn(n));
  const l = o.slice(0, a), c = o.slice(a + 1, o.length);
  return [o[a]].concat(...c).concat(...l);
};
var Fn = (e, n) => {
  const a = [];
  for (let t = +e[0]; t <= +e[1]; t++)
    a.push({ value: +t, text: `${t}` });
  return n ? a.reverse() : a;
};
var wa = (e, n, a) => {
  const t = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((l) => {
    const c = l < 10 ? `0${l}` : l;
    return /* @__PURE__ */ new Date(`2017-${c}-01T00:00:00+00:00`);
  });
  if (e !== null)
    try {
      const l = a === "long" ? "MMMM" : "MMM";
      return t.map((c, k) => {
        const h2 = format(c, l, { locale: e });
        return {
          text: h2.charAt(0).toUpperCase() + h2.substring(1),
          value: k
        };
      });
    } catch {
    }
  const o = new Intl.DateTimeFormat(n, { month: a, timeZone: "UTC" });
  return t.map((l, c) => {
    const k = o.format(l);
    return {
      text: k.charAt(0).toUpperCase() + k.substring(1),
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
var Da = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : false;
var Gt = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
};
var Te = (e) => e;
var ea = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e;
var ta = (e) => e === null;
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
var Ct = (e, n, a) => {
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
var na = (e, n, a, t, o) => {
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
    return na(e, n, l, t, o);
  if (Array.isArray(n)) {
    let c = null;
    for (const k of n)
      if (c = na(e, k, l, t, o), c)
        break;
    return c;
  }
  return typeof n == "function" ? n(e) : null;
};
var S = (e) => e ? new Date(e) : /* @__PURE__ */ new Date();
var Sr = (e, n, a) => {
  if (n) {
    const o = (e.getMonth() + 1).toString().padStart(2, "0"), l = e.getDate().toString().padStart(2, "0"), c = e.getHours().toString().padStart(2, "0"), k = e.getMinutes().toString().padStart(2, "0"), h2 = a ? e.getSeconds().toString().padStart(2, "0") : "00";
    return `${e.getFullYear()}-${o}-${l}T${c}:${k}:${h2}.000Z`;
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
var Re = (e, n) => !e || !n ? false : isAfter(Le(e), Le(n));
var Vn = (e, n, a) => e != null && e[0] && (e != null && e[1]) ? Re(a, e[0]) && Pe(a, e[1]) : e != null && e[0] && n ? Re(a, e[0]) && Pe(a, n) || Pe(a, e[0]) && Re(a, n) : false;
var ze = (e) => {
  const n = set(new Date(e), { date: 1 });
  return Le(n);
};
var cn = (e, n, a) => n && (a || a === 0) ? Object.fromEntries(
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
var Ma = (e, n) => {
  if (n) {
    const a = getYear(S(n));
    if (a > e)
      return 12;
    if (a === e)
      return getMonth(S(n));
  }
};
var $a = (e, n) => {
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
var aa = (e) => e instanceof Date ? e : parseISO(e);
var Ta = (e, n) => {
  const a = Re(e, n) ? n : e, t = Re(n, e) ? n : e;
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
var Aa = (e, n) => {
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
var _a = (e, n, a, t, o) => {
  if (!t || o && !n || !o && !a)
    return false;
  const l = o ? addMonths(e, 1) : subMonths(e, 1), c = [getMonth(l), getYear(l)];
  return o ? !Nr(...c, n) : !Rr(...c, a);
};
var Rr = (e, n, a) => Pe(...et(a, e, n)) || ye(...et(a, e, n));
var Nr = (e, n, a) => Re(...et(a, e, n)) || ye(...et(a, e, n));
var Sa = (e, n, a, t, o, l) => {
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
var ra = (e, n, a, t, o) => {
  const l = e ? Or(e) : S(n);
  return Array.isArray(t) ? fn(t[0], l, a, !!n) && fn(t[1], l, a, !!n) && o : fn(t, l, a, !!n) && o;
};
var vn = (e) => set(S(), ft(e));
var Ir = (e, n) => Array.isArray(e) ? e.map((a) => S(a)).filter((a) => getYear(S(a)) === n).map((a) => getMonth(a)) : [];
var Tt = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Pa = () => {
  const e = (t) => {
    Tt.menuFocused = t;
  }, n = (t) => {
    Tt.shiftKeyInMenu !== t && (Tt.shiftKeyInMenu = t);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: Tt.shiftKeyInMenu, menuFocused: Tt.menuFocused })),
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
var hn = ref(false);
var Ne = ref(0);
var Se = ref(0);
var rt = () => {
  const e = computed(() => Lt.value ? [...be.selectionGrid, be.actionRow].filter((b) => b.length) : gn.value ? [
    ...be.timePicker[0],
    ...be.timePicker[1],
    hn.value ? [] : [mn.value],
    be.actionRow
  ].filter((b) => b.length) : yn.value ? [...be.monthPicker, be.actionRow] : [be.monthYear, ...be.calendar, be.time, be.actionRow].filter((b) => b.length)), n = (b) => {
    Ne.value = b ? Ne.value + 1 : Ne.value - 1;
    let A = null;
    e.value[Se.value] && (A = e.value[Se.value][Ne.value]), A || (Ne.value = b ? Ne.value - 1 : Ne.value + 1);
  }, a = (b) => {
    if (Se.value === 0 && !b || Se.value === e.value.length && b)
      return;
    Se.value = b ? Se.value + 1 : Se.value - 1, e.value[Se.value] ? e.value[Se.value] && !e.value[Se.value][Ne.value] && Ne.value !== 0 && (Ne.value = e.value[Se.value].length - 1) : Se.value = b ? Se.value - 1 : Se.value + 1;
  }, t = (b) => {
    let A = null;
    e.value[Se.value] && (A = e.value[Se.value][Ne.value]), A ? A.focus({ preventScroll: !Lt.value }) : Ne.value = b ? Ne.value - 1 : Ne.value + 1;
  }, o = () => {
    n(true), t(true);
  }, l = () => {
    n(false), t(false);
  }, c = () => {
    a(false), t(true);
  }, k = () => {
    a(true), t(true);
  }, h2 = (b, A) => {
    be[A] = b;
  }, M = (b, A) => {
    be[A] = b;
  }, p = () => {
    Ne.value = 0, Se.value = 0;
  };
  return {
    buildMatrix: h2,
    buildMultiLevelMatrix: M,
    setTimePickerBackRef: (b) => {
      mn.value = b;
    },
    setSelectionGrid: (b) => {
      Lt.value = b, p(), b || (be.selectionGrid = []);
    },
    setTimePicker: (b, A = false) => {
      gn.value = b, hn.value = A, p(), b || (be.timePicker[0] = [], be.timePicker[1] = []);
    },
    setTimePickerElements: (b, A = 0) => {
      be.timePicker[A] = b;
    },
    arrowRight: o,
    arrowLeft: l,
    arrowUp: c,
    arrowDown: k,
    clearArrowNav: () => {
      be.monthYear = [], be.calendar = [], be.time = [], be.actionRow = [], be.selectionGrid = [], be.timePicker[0] = [], be.timePicker[1] = [], Lt.value = false, gn.value = false, hn.value = false, yn.value = false, p(), mn.value = null;
    },
    setMonthPicker: (b) => {
      yn.value = b, p();
    },
    refSets: be
    // exposed for testing
  };
};
var la = (e) => ({
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
var Yr = (e) => ({
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
  day: () => "",
  ...e ?? {}
});
var oa = (e) => e ? typeof e == "boolean" ? e ? 2 : 0 : +e >= 2 ? +e : 2 : 0;
var Br = (e) => {
  const n = typeof e == "object" && e, a = {
    static: true,
    solo: false
  };
  if (!e)
    return { ...a, count: oa(false) };
  const t = n ? e : {}, o = n ? t.count ?? true : e, l = oa(o);
  return Object.assign(a, t, { count: l });
};
var Er = (e, n, a) => e || (typeof a == "string" ? a : n);
var Fr = (e) => typeof e == "boolean" ? e ? la({}) : false : la(e);
var Vr = (e) => {
  const n = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: true,
    rangeSeparator: " - "
  };
  return typeof e == "object" ? { ...n, ...e ?? {}, enabled: true } : { ...n, enabled: e };
};
var Hr = (e) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...e ?? {}
});
var Lr = (e) => ({
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  ...e ?? {}
});
var Ur = (e) => {
  const n = { input: false };
  return typeof e == "object" ? { ...n, ...e ?? {}, enabled: true } : {
    enabled: e,
    ...n
  };
};
var Ce = (e) => {
  const n = () => {
    const z = e.enableSeconds ? ":ss" : "";
    return e.is24 ? `HH:mm${z}` : `hh:mm${z} aa`;
  }, a = () => e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? n() : e.weekPicker ? "MM/dd/yyyy" : e.yearPicker ? "yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${n()}` : "MM/dd/yyyy", t = (z) => Aa(z, e.enableSeconds), o = () => e.range ? e.startTime && Array.isArray(e.startTime) ? [t(e.startTime[0]), t(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? t(e.startTime) : null, l = computed(() => Br(e.multiCalendars)), c = computed(() => o()), k = computed(() => Yr(e.ariaLabels)), h2 = computed(() => Hr(e.filters)), M = computed(() => Fr(e.transitions)), p = computed(() => Lr(e.actionRow)), T = computed(
    () => Er(e.previewFormat, e.format, a())
  ), E = computed(() => Vr(e.textInput)), q = computed(() => Ur(e.inline));
  return {
    defaultedTransitions: M,
    defaultedMultiCalendars: l,
    defaultedStartTime: c,
    defaultedAriaLabels: k,
    defaultedFilters: h2,
    defaultedActionRow: p,
    defaultedPreviewFormat: T,
    defaultedTextInput: E,
    defaultedInline: q,
    getDefaultPattern: a,
    getDefaultStartTime: o
  };
};
var Wr = (e, n, a) => {
  const t = ref(), { defaultedTextInput: o, getDefaultPattern: l } = Ce(n), c = ref(""), k = toRef(n, "format");
  watch(t, () => {
    e("internal-model-change", t.value);
  }), watch(k, () => {
    F();
  });
  const h2 = (r) => Pr(r, n.timezone), M = (r) => Ze(r, n.timezone), p = (r, U) => Sa(
    r,
    n.format,
    n.formatLocale,
    o.value.rangeSeparator,
    n.modelAuto,
    U ?? l()
  ), T = (r) => {
    const U = r ?? S();
    return n.modelType ? w(U) : {
      hours: getHours(U),
      minutes: getMinutes(U),
      seconds: n.enableSeconds ? getSeconds(U) : 0
    };
  }, E = (r) => n.modelType ? w(r) : { month: getMonth(r), year: getYear(r) }, q = (r) => Array.isArray(r) ? Ht(
    () => [
      setYear(S(), r[0]),
      r[1] ? setYear(S(), r[1]) : gt(n.partialRange)
    ],
    n.range
  ) : setYear(S(), +r), z = (r, U) => (typeof r == "string" || typeof r == "number") && n.modelType ? d(r) : U, Q = (r) => Array.isArray(r) ? [
    z(
      r[0],
      tt(null, +r[0].hours, +r[0].minutes, r[0].seconds)
    ),
    z(
      r[1],
      tt(null, +r[1].hours, +r[1].minutes, r[1].seconds)
    )
  ] : z(r, tt(null, r.hours, r.minutes, r.seconds)), G = (r) => Array.isArray(r) ? n.multiDates ? r.map((U) => z(U, Je(null, +U.month, +U.year))) : Ht(
    () => [
      z(r[0], Je(null, +r[0].month, +r[0].year)),
      z(
        r[1],
        r[1] ? Je(null, +r[1].month, +r[1].year) : gt(n.partialRange)
      )
    ],
    n.range
  ) : z(r, Je(null, +r.month, +r.year)), b = (r) => {
    if (Array.isArray(r))
      return r.map((U) => d(U));
    throw new Error(Gt.dateArr("multi-dates"));
  }, A = (r) => {
    if (Array.isArray(r))
      return [S(r[0]), S(r[1])];
    throw new Error(Gt.dateArr("week-picker"));
  }, O = (r) => n.modelAuto ? Array.isArray(r) ? [d(r[0]), d(r[1])] : n.autoApply ? [d(r)] : [d(r), null] : Array.isArray(r) ? Ht(
    () => [
      d(r[0]),
      r[1] ? d(r[1]) : gt(n.partialRange)
    ],
    n.range
  ) : d(r), H = () => {
    Array.isArray(t.value) && n.range && t.value.length === 1 && t.value.push(gt(n.partialRange));
  }, _ = () => {
    const r = t.value;
    return [
      w(r[0]),
      r[1] ? w(r[1]) : gt(n.partialRange)
    ];
  }, x = () => t.value[1] ? _() : w(Te(t.value[0])), Z = () => (t.value || []).map((r) => w(r)), le = () => (H(), n.modelAuto ? x() : n.multiDates ? Z() : Array.isArray(t.value) ? Ht(() => _(), n.range) : w(Te(t.value))), v = (r) => !r || Array.isArray(r) && !r.length ? null : n.timePicker ? Q(Te(r)) : n.monthPicker ? G(Te(r)) : n.yearPicker ? q(Te(r)) : n.multiDates ? b(Te(r)) : n.weekPicker ? A(Te(r)) : O(Te(r)), D = (r) => {
    const U = v(r);
    An(Te(U)) ? (t.value = Te(U), F()) : (t.value = null, c.value = "");
  }, C = () => {
    const r = (U) => format(U, o.value.format);
    return `${r(t.value[0])} ${o.value.rangeSeparator} ${t.value[1] ? r(t.value[1]) : ""}`;
  }, j = () => a.value && t.value ? Array.isArray(t.value) ? C() : format(t.value, o.value.format) : p(t.value), f = () => t.value ? n.multiDates ? t.value.map((r) => p(r)).join("; ") : o.value.enabled && typeof o.value.format == "string" ? j() : p(t.value) : "", F = () => {
    !n.format || typeof n.format == "string" || o.value.enabled && typeof o.value.format == "string" ? c.value = f() : c.value = n.format(t.value);
  }, d = (r) => {
    if (n.utc) {
      const U = new Date(r);
      return n.utc === "preserve" ? new Date(U.getTime() + U.getTimezoneOffset() * 6e4) : U;
    }
    return n.modelType ? n.modelType === "date" || n.modelType === "timestamp" ? M(new Date(r)) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? parse(r, l(), /* @__PURE__ */ new Date()) : M(parse(r, n.modelType, /* @__PURE__ */ new Date())) : M(new Date(r));
  }, w = (r) => r ? n.utc ? Sr(r, n.utc === "preserve", n.enableSeconds) : n.modelType ? n.modelType === "timestamp" ? +h2(r) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? p(h2(r)) : p(h2(r), n.modelType) : h2(r) : "", u = (r, U = false) => {
    if (e("update:model-value", r), n.emitTimezone && U) {
      const R = Array.isArray(r) ? r.map((g) => Ze(Te(g)), n.emitTimezone) : Ze(Te(r), n.emitTimezone);
      e("update:model-timezone-value", R);
    }
  }, y = (r) => Array.isArray(t.value) ? n.multiDates ? t.value.map((U) => r(U)) : [
    r(t.value[0]),
    t.value[1] ? r(t.value[1]) : gt(n.partialRange)
  ] : r(Te(t.value)), s = (r) => u(Te(y(r)));
  return {
    inputValue: c,
    internalModelValue: t,
    checkBeforeEmit: () => t.value ? n.range ? n.partialRange ? t.value.length >= 1 : t.value.length === 2 : !!t.value : false,
    parseExternalModelValue: D,
    formatInputValue: F,
    emitModelValue: () => (F(), n.monthPicker ? s(E) : n.timePicker ? s(T) : n.yearPicker ? s(getYear) : n.weekPicker ? u(t.value, true) : u(le(), true))
  };
};
var zr = (e, n) => {
  const { defaultedFilters: a } = Ce(e), { validateMonthYearInRange: t } = Bt(e), o = (M, p) => {
    let T = M;
    return a.value.months.includes(getMonth(T)) ? (T = p ? addMonths(M, 1) : subMonths(M, 1), o(T, p)) : T;
  }, l = (M, p) => {
    let T = M;
    return a.value.years.includes(getYear(T)) ? (T = p ? addYears(M, 1) : subYears(M, 1), l(T, p)) : T;
  }, c = (M) => {
    const p = set(/* @__PURE__ */ new Date(), { month: e.month, year: e.year });
    let T = M ? addMonths(p, 1) : subMonths(p, 1);
    e.disableYearSelect && (T = setYear(T, e.year));
    let E = getMonth(T), q = getYear(T);
    a.value.months.includes(E) && (T = o(T, M), E = getMonth(T), q = getYear(T)), a.value.years.includes(q) && (T = l(T, M), q = getYear(T)), t(E, q, M, e.preventMinMaxNavigation) && k(E, q);
  }, k = (M, p) => {
    n("update-month-year", { month: M, year: p });
  }, h2 = computed(() => (M) => _a(
    set(/* @__PURE__ */ new Date(), { month: e.month, year: e.year }),
    e.maxDate,
    e.minDate,
    e.preventMinMaxNavigation,
    M
  ));
  return { handleMonthYearChange: c, isDisabled: h2, updateMonthYear: k };
};
var yt = ((e) => (e.center = "center", e.left = "left", e.right = "right", e))(yt || {});
var We = ((e) => (e.month = "month", e.year = "year", e))(We || {});
var st = ((e) => (e.top = "top", e.bottom = "bottom", e))(st || {});
var vt = ((e) => (e.header = "header", e.calendar = "calendar", e.timePicker = "timePicker", e))(vt || {});
var jr = (e, n, a, t, o, l, c) => {
  const k = ref({}), h2 = ref(false), M = ref({
    top: "0",
    left: "0"
  }), p = ref(false), T = toRef(c, "teleportCenter");
  watch(T, () => {
    M.value = JSON.parse(JSON.stringify({})), O();
  });
  const E = (d) => {
    if (c.teleport) {
      const w = d.getBoundingClientRect();
      return {
        left: w.left + window.scrollX,
        top: w.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, q = (d, w) => {
    M.value.left = `${d + w - k.value.width}px`;
  }, z = (d) => {
    M.value.left = `${d}px`;
  }, Q = (d, w) => {
    c.position === yt.left && z(d), c.position === yt.right && q(d, w), c.position === yt.center && (M.value.left = `${d + w / 2 - k.value.width / 2}px`);
  }, G = (d) => {
    const { width: w, height: u } = d.getBoundingClientRect(), { top: y, left: s } = c.altPosition ? c.altPosition(d) : E(d);
    return { top: +y, left: +s, width: w, height: u };
  }, b = () => {
    M.value.left = "50%", M.value.top = "50%", M.value.transform = "translate(-50%, -50%)", M.value.position = "fixed", delete M.value.opacity;
  }, A = () => {
    const d = Ae(a), { top: w, left: u, transform: y } = c.altPosition(d);
    M.value = { top: `${w}px`, left: `${u}px`, transform: y ?? "" };
  }, O = (d = true) => {
    var w;
    if (!o.value.enabled) {
      if (T.value)
        return b();
      if (c.altPosition !== null)
        return A();
      if (d) {
        const u = c.teleport ? (w = n.value) == null ? void 0 : w.$el : e.value;
        u && (k.value = u.getBoundingClientRect()), l("recalculate-position");
      }
      return D();
    }
  }, H = ({ inputEl: d, left: w, width: u }) => {
    window.screen.width > 768 && !h2.value && Q(w, u), Z(d);
  }, _ = (d) => {
    const { top: w, left: u, height: y, width: s } = G(d);
    M.value.top = `${y + w + +c.offset}px`, p.value = false, h2.value || (M.value.left = `${u + s / 2 - k.value.width / 2}px`), H({ inputEl: d, left: u, width: s });
  }, x = (d) => {
    const { top: w, left: u, width: y } = G(d);
    M.value.top = `${w - +c.offset - k.value.height}px`, p.value = true, H({ inputEl: d, left: u, width: y });
  }, Z = (d) => {
    if (c.autoPosition) {
      const { left: w, width: u } = G(d), { left: y, right: s } = k.value;
      if (!h2.value) {
        if (Math.abs(y) !== Math.abs(s)) {
          if (y <= 0)
            return h2.value = true, z(w);
          if (s >= document.documentElement.clientWidth)
            return h2.value = true, q(w, u);
        }
        return Q(w, u);
      }
    }
  }, le = () => {
    const d = Ae(a);
    if (d) {
      const { height: w } = k.value, { top: u, height: y } = d.getBoundingClientRect(), P = window.innerHeight - u - y, te = u;
      return w <= P ? st.bottom : w > P && w <= te ? st.top : P >= te ? st.bottom : st.top;
    }
    return st.bottom;
  }, v = (d) => le() === st.bottom ? _(d) : x(d), D = () => {
    const d = Ae(a);
    if (d)
      return c.autoPosition ? v(d) : _(d);
  }, C = function(d) {
    if (d) {
      const w = d.scrollHeight > d.clientHeight, y = window.getComputedStyle(d).overflowY.indexOf("hidden") !== -1;
      return w && !y;
    }
    return true;
  }, j = function(d) {
    return !d || d === document.body || d.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : C(d) ? d : j(d.parentNode);
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
    openOnTop: p,
    menuStyle: M,
    xCorrect: h2,
    setMenuPosition: O,
    getScrollableParent: j,
    shadowRender: (d, w) => {
      var U, R, g;
      const u = document.createElement("div"), y = (U = Ae(a)) == null ? void 0 : U.getBoundingClientRect();
      u.setAttribute("id", "dp--temp-container");
      const s = (R = t.value) != null && R.clientWidth ? t.value : document.body;
      s.append(u);
      const P = document.getElementById("dp--temp-container"), te = f(y), r = h(d, {
        ...w,
        shadow: true,
        style: { opacity: 0, position: "absolute", ...te }
      });
      render(r, P), k.value = (g = r.el) == null ? void 0 : g.getBoundingClientRect(), render(null, P), s.removeChild(P);
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
    set: (k) => {
      !e.readonly && !e.disabled && n("update:internal-model-value", k);
    }
  }), l = computed(
    () => (k) => a.value[k] ? a.value[k].month : 0
  ), c = computed(
    () => (k) => a.value[k] ? a.value[k].year : 0
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
  const { defaultedMultiCalendars: a } = Ce(n), { isDisabled: t, matchDate: o } = Bt(n), l = ref(null), c = ref(S()), k = (s) => {
    !s.current && n.hideOffsetDates || (l.value = s.value);
  }, h2 = () => {
    l.value = null;
  }, M = (s) => Array.isArray(e.value) && n.range && e.value[0] && l.value ? s ? Re(l.value, e.value[0]) : Pe(l.value, e.value[0]) : true, p = (s, P) => {
    const te = () => e.value ? P ? e.value[0] || null : e.value[1] : null, r = e.value && Array.isArray(e.value) ? te() : null;
    return ye(S(s.value), r);
  }, T = (s) => {
    const P = Array.isArray(e.value) ? e.value[0] : null;
    return s ? !Pe(l.value ?? null, P) : true;
  }, E = (s, P = true) => (n.range || n.weekPicker) && Array.isArray(e.value) && e.value.length === 2 ? n.hideOffsetDates && !s.current ? false : ye(S(s.value), e.value[P ? 0 : 1]) : n.range ? p(s, P) && T(P) || ye(s.value, Array.isArray(e.value) ? e.value[0] : null) && M(P) : false, q = (s, P, te) => Array.isArray(e.value) && e.value[0] && e.value.length === 1 ? s ? false : te ? Re(e.value[0], P.value) : Pe(e.value[0], P.value) : false, z = (s) => !e.value || n.hideOffsetDates && !s.current ? false : n.range ? n.modelAuto && Array.isArray(e.value) ? ye(s.value, e.value[0] ? e.value[0] : c.value) : false : n.multiDates && Array.isArray(e.value) ? e.value.some((P) => ye(P, s.value)) : ye(s.value, e.value ? e.value : c.value), Q = (s) => {
    if (n.autoRange || n.weekPicker) {
      if (l.value) {
        if (n.hideOffsetDates && !s.current)
          return false;
        const P = addDays(l.value, +n.autoRange), te = jt(S(l.value), n.timezone, n.weekStart);
        return n.weekPicker ? ye(te[1], S(s.value)) : ye(P, S(s.value));
      }
      return false;
    }
    return false;
  }, G = (s) => {
    if (n.autoRange || n.weekPicker) {
      if (l.value) {
        const P = addDays(l.value, +n.autoRange);
        if (n.hideOffsetDates && !s.current)
          return false;
        const te = jt(S(l.value), n.timezone, n.weekStart);
        return n.weekPicker ? Re(s.value, te[0]) && Pe(s.value, te[1]) : Re(s.value, l.value) && Pe(s.value, P);
      }
      return false;
    }
    return false;
  }, b = (s) => {
    if (n.autoRange || n.weekPicker) {
      if (l.value) {
        if (n.hideOffsetDates && !s.current)
          return false;
        const P = jt(S(l.value), n.timezone, n.weekStart);
        return n.weekPicker ? ye(P[0], s.value) : ye(l.value, s.value);
      }
      return false;
    }
    return false;
  }, A = (s) => Vn(e.value, l.value, s.value), O = () => n.modelAuto && Array.isArray(n.internalModelValue) ? !!n.internalModelValue[0] : false, H = () => n.modelAuto ? Da(n.internalModelValue) : true, _ = (s) => {
    if (Array.isArray(e.value) && e.value.length || n.weekPicker)
      return false;
    const P = n.range ? !E(s) && !E(s, false) : true;
    return !t(s.value) && !z(s) && !(!s.current && n.hideOffsetDates) && P;
  }, x = (s) => n.range ? n.modelAuto ? O() && z(s) : false : z(s), Z = (s) => {
    var P;
    return n.highlight ? o(
      s.value,
      (P = n.arrMapValues) != null && P.highlightedDates ? n.arrMapValues.highlightedDates : n.highlight
    ) : false;
  }, le = (s) => t(s.value) && n.highlightDisabledDays === false, v = (s) => {
    var P;
    return (P = n.highlightWeekDays) == null ? void 0 : P.includes(s.value.getDay());
  }, D = (s) => (n.range || n.weekPicker) && (!(a.value.count > 0) || s.current) && H() && !(!s.current && n.hideOffsetDates) && !z(s) ? A(s) : false, C = (s) => {
    const { isRangeStart: P, isRangeEnd: te } = F(s), r = n.range ? P || te : false;
    return {
      dp__cell_offset: !s.current,
      dp__pointer: !n.disabled && !(!s.current && n.hideOffsetDates) && !t(s.value),
      dp__cell_disabled: t(s.value),
      dp__cell_highlight: !le(s) && (Z(s) || v(s)) && !x(s) && !r,
      dp__cell_highlight_active: !le(s) && (Z(s) || v(s)) && x(s),
      dp__today: !n.noToday && ye(s.value, c.value) && s.current
    };
  }, j = (s) => ({
    dp__active_date: x(s),
    dp__date_hover: _(s)
  }), f = (s) => ({
    ...d(s),
    ...w(s),
    dp__range_between_week: D(s) && n.weekPicker
  }), F = (s) => {
    const P = a.value.count > 0 ? s.current && E(s) && H() : E(s) && H(), te = a.value.count > 0 ? s.current && E(s, false) && H() : E(s, false) && H();
    return { isRangeStart: P, isRangeEnd: te };
  }, d = (s) => {
    const { isRangeStart: P, isRangeEnd: te } = F(s);
    return {
      dp__range_start: P,
      dp__range_end: te,
      dp__range_between: D(s) && !n.weekPicker,
      dp__date_hover_start: q(_(s), s, true),
      dp__date_hover_end: q(_(s), s, false)
    };
  }, w = (s) => ({
    ...d(s),
    dp__cell_auto_range: G(s),
    dp__cell_auto_range_start: b(s),
    dp__cell_auto_range_end: Q(s)
  }), u = (s) => n.range ? n.autoRange ? w(s) : n.modelAuto ? { ...j(s), ...d(s) } : d(s) : n.weekPicker ? f(s) : j(s);
  return {
    setHoverDate: k,
    clearHoverDate: h2,
    getDayClassData: (s) => n.hideOffsetDates && !s.current ? {} : {
      ...C(s),
      ...u(s),
      [n.dayClass ? n.dayClass(s.value) : ""]: true,
      [n.calendarCellClassName]: !!n.calendarCellClassName
    }
  };
};
var Bt = (e) => {
  const { defaultedFilters: n } = Ce(e), a = (v) => {
    const D = Le(t(S(v))).toISOString(), [C] = D.split("T");
    return C;
  }, t = (v) => Ze(v, e.timezone), o = (v) => {
    var s;
    const D = e.maxDate ? Re(t(v), t(S(e.maxDate))) : false, C = e.minDate ? Pe(t(v), t(S(e.minDate))) : false, j = h2(
      v,
      (s = e.arrMapValues) != null && s.disabledDates ? e.arrMapValues.disabledDates : e.disabledDates
    ), F = n.value.months.map((P) => +P).includes(getMonth(v)), d = e.disabledWeekDays.length ? e.disabledWeekDays.some((P) => +P === getDay(v)) : false, w = p(v), u = getYear(v), y = u < +e.yearRange[0] || u > +e.yearRange[1];
    return !(D || C || j || F || y || d || w);
  }, l = (v, D) => Pe(...et(e.minDate, v, D)) || ye(...et(e.minDate, v, D)), c = (v, D) => Re(...et(e.maxDate, v, D)) || ye(...et(e.maxDate, v, D)), k = (v, D, C) => {
    let j = false;
    return e.maxDate && C && c(v, D) && (j = true), e.minDate && !C && l(v, D) && (j = true), j;
  }, h2 = (v, D) => v ? D instanceof Map ? !!D.get(a(v)) : Array.isArray(D) ? D.some((C) => ye(t(S(C)), t(v))) : D ? D(S(JSON.parse(JSON.stringify(v)))) : false : true, M = (v, D, C, j) => {
    let f = false;
    return j ? e.minDate && e.maxDate ? f = k(v, D, C) : (e.minDate && l(v, D) || e.maxDate && c(v, D)) && (f = true) : f = true, f;
  }, p = (v) => {
    var D, C, j, f, F;
    return Array.isArray(e.allowedDates) && !((D = e.allowedDates) != null && D.length) ? true : (C = e.arrMapValues) != null && C.allowedDates ? !h2(v, (j = e.arrMapValues) == null ? void 0 : j.allowedDates) : (f = e.allowedDates) != null && f.length ? !((F = e.allowedDates) != null && F.some((d) => ye(t(S(d)), t(v)))) : false;
  }, T = (v) => !o(v), E = (v) => !eachDayOfInterval({ start: v[0], end: v[1] }).some((C) => T(C)), q = (v, D, C = 0) => {
    if (Array.isArray(D) && D[C]) {
      const j = differenceInCalendarDays(v, D[C]), f = Ta(D[C], v), F = f.length === 1 ? 0 : f.filter((w) => T(w)).length, d = Math.abs(j) - F;
      if (e.minRange && e.maxRange)
        return d >= +e.minRange && d <= +e.maxRange;
      if (e.minRange)
        return d >= +e.minRange;
      if (e.maxRange)
        return d <= +e.maxRange;
    }
    return true;
  }, z = (v) => new Map(v.map((D) => [a(D), true])), Q = (v) => Array.isArray(v) && v.length > 0, G = () => {
    const v = {
      disabledDates: null,
      allowedDates: null,
      highlightedDates: null
    };
    return Q(e.allowedDates) && (v.allowedDates = z(e.allowedDates)), Q(e.highlight) && (v.highlightedDates = z(e.highlight)), Q(e.disabledDates) && (v.disabledDates = z(e.disabledDates)), v;
  }, b = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, A = (v) => Array.isArray(v) ? [v[0] ? vn(v[0]) : null, v[1] ? vn(v[1]) : null] : vn(v), O = (v, D, C) => v.find(
    (j) => +j.hours === getHours(D) && j.minutes === "*" ? true : +j.minutes === getMinutes(D)
  ) && C, H = (v, D, C) => {
    const [j, f] = v, [F, d] = D;
    return !O(j, F, C) && !O(f, d, C) && C;
  }, _ = (v, D) => {
    const C = Array.isArray(D) ? D : [D];
    return Array.isArray(e.disabledTimes) ? Array.isArray(e.disabledTimes[0]) ? H(e.disabledTimes, C, v) : !C.some((j) => O(e.disabledTimes, j, v)) : v;
  }, x = (v, D) => {
    const C = Array.isArray(D) ? [ft(D[0]), D[1] ? ft(D[1]) : void 0] : ft(D), j = !e.disabledTimes(C);
    return v && j;
  }, Z = (v, D) => e.disabledTimes ? Array.isArray(e.disabledTimes) ? _(D, v) : x(D, v) : D;
  return {
    isDisabled: T,
    validateDate: o,
    validateMonthYearInRange: M,
    isDateRangeAllowed: E,
    checkMinMaxRange: q,
    matchDate: h2,
    mapDatesArrToMap: G,
    isValidTime: (v) => {
      let D = true;
      if (!v || b())
        return true;
      const C = !e.minDate && !e.maxDate ? A(v) : v;
      return (e.maxTime || e.maxDate) && (D = ra(e.maxTime, e.maxDate, "max", Te(C), D)), (e.minTime || e.minDate) && (D = ra(e.minTime, e.minDate, "min", Te(C), D)), Z(v, D);
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
  }), l = (p) => {
    var T;
    (T = e.flow) != null && T.length && (o[p] = true, Object.keys(o).filter((E) => !o[E]).length || M());
  }, c = () => {
    var p;
    (p = e.flow) != null && p.length && t.value !== -1 && (t.value += 1, n("flow-step", t.value), M());
  }, k = () => {
    t.value = -1;
  }, h2 = (p, T, ...E) => {
    e.flow[t.value] === p && a.value && a.value[T](...E);
  }, M = () => {
    h2("month", "toggleMonthPicker", true), h2("year", "toggleYearPicker", true), h2("calendar", "toggleTimePicker", false, true), h2("time", "toggleTimePicker", true, true);
    const p = e.flow[t.value];
    (p === "hours" || p === "minutes" || p === "seconds") && h2(p, "toggleTimePicker", true, true, p);
  };
  return { childMount: l, updateFlowStep: c, resetFlow: k, flowStep: t };
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
    const t = e, { defaultedTextInput: o, defaultedAriaLabels: l, defaultedInline: c, getDefaultPattern: k, getDefaultStartTime: h2 } = Ce(t), M = ref(), p = ref(null), T = ref(false), E = ref(false), q = computed(
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
    ), z = () => {
      a("set-input-date", null), t.autoApply && (a("set-empty-date"), M.value = null);
    }, Q = (f) => {
      const F = h2();
      return _r(
        f,
        o.value.format ?? k(),
        F ?? Aa({}, t.enableSeconds),
        t.inputValue,
        E.value
      );
    }, G = (f) => {
      const { rangeSeparator: F } = o.value, [d, w] = f.split(`${F}`);
      if (d) {
        const u = Q(d.trim()), y = w ? Q(w.trim()) : null, s = u && y ? [u, y] : [u];
        M.value = u ? s : null;
      }
    }, b = () => {
      E.value = true;
    }, A = (f) => {
      if (t.range)
        G(f);
      else if (t.multiDates) {
        const F = f.split(";");
        M.value = F.map((d) => Q(d.trim())).filter((d) => d);
      } else
        M.value = Q(f);
    }, O = (f) => {
      var d;
      const F = typeof f == "string" ? f : (d = f.target) == null ? void 0 : d.value;
      F !== "" ? (o.value.openMenu && !t.isMenuOpen && a("open"), A(F), a("set-input-date", M.value)) : z(), E.value = false, a("update:input-value", F);
    }, H = (f) => {
      o.value.enabled ? (A(f.target.value), o.value.enterSubmit && An(M.value) && t.inputValue !== "" ? (a("set-input-date", M.value, true), M.value = null) : o.value.enterSubmit && t.inputValue === "" && (M.value = null, a("clear"))) : Z(f);
    }, _ = (f) => {
      o.value.enabled && o.value.tabSubmit && A(f.target.value), o.value.tabSubmit && An(M.value) && t.inputValue !== "" ? (a("set-input-date", M.value, true), M.value = null) : o.value.tabSubmit && t.inputValue === "" && (M.value = null, a("clear"));
    }, x = () => {
      T.value = true, a("focus");
    }, Z = (f) => {
      f.preventDefault(), f.stopImmediatePropagation(), f.stopPropagation(), o.value.enabled && o.value.openMenu && !c.value.input && !t.isMenuOpen ? a("open") : o.value.enabled || a("toggle");
    }, le = () => {
      a("real-blur"), T.value = false, (!t.isMenuOpen || c.value.enabled && c.value.input) && a("blur"), t.autoApply && o.value.enabled && M.value && !t.isMenuOpen && (a("set-input-date", M.value), a("select-date"), M.value = null);
    }, v = () => {
      a("clear");
    }, D = (f) => {
      if (!o.value.enabled) {
        if (f.code === "Tab")
          return;
        f.preventDefault();
      }
    };
    return n({
      focusInput: () => {
        var f;
        (f = p.value) == null || f.focus({ preventScroll: true });
      },
      setParsedDate: (f) => {
        M.value = f;
      }
    }), (f, F) => {
      var d;
      return openBlock(), createElementBlock("div", { onClick: Z }, [
        f.$slots.trigger && !f.$slots["dp-input"] && !unref(c).enabled ? renderSlot(f.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !f.$slots.trigger && (!unref(c).enabled || unref(c).input) ? (openBlock(), createElementBlock("div", xr, [
          f.$slots["dp-input"] && !f.$slots.trigger && !unref(c).enabled ? renderSlot(f.$slots, "dp-input", {
            key: 0,
            value: e.inputValue,
            isMenuOpen: e.isMenuOpen,
            onInput: O,
            onEnter: H,
            onTab: _,
            onClear: v,
            onBlur: le,
            onKeypress: D,
            onPaste: b
          }) : createCommentVNode("", true),
          f.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            ref_key: "inputRef",
            ref: p,
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
            onInput: O,
            onKeydown: [
              withKeys(H, ["enter"]),
              withKeys(_, ["tab"]),
              D
            ],
            onBlur: le,
            onFocus: x,
            onKeypress: D,
            onPaste: b
          }, null, 42, Jr)),
          createBaseVNode("div", {
            onClick: F[2] || (F[2] = (w) => a("toggle"))
          }, [
            f.$slots["input-icon"] && !f.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: F[0] || (F[0] = (w) => a("toggle"))
            }, [
              renderSlot(f.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !f.$slots["input-icon"] && !f.hideInputIcon && !f.$slots["dp-input"] ? (openBlock(), createBlock(unref(It), {
              key: 1,
              onClick: F[1] || (F[1] = (w) => a("toggle")),
              class: "dp__input_icon dp__input_icons"
            })) : createCommentVNode("", true)
          ]),
          f.$slots["clear-icon"] && e.inputValue && f.clearable && !f.disabled && !f.readonly ? (openBlock(), createElementBlock("span", Xr, [
            renderSlot(f.$slots, "clear-icon", { clear: v })
          ])) : createCommentVNode("", true),
          f.clearable && !f.$slots["clear-icon"] && e.inputValue && !f.disabled && !f.readonly ? (openBlock(), createBlock(unref(ha), {
            key: 3,
            class: "dp__clear_icon dp__input_icons",
            onClick: withModifiers(v, ["stop", "prevent"])
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
      defaultedInline: k,
      getDefaultPattern: h2
    } = Ce(a), { isValidTime: M } = Bt(a), { buildMatrix: p } = rt(), T = ref(null), E = ref(null);
    onMounted(() => {
      a.arrowNavigation && p([Ae(T), Ae(E)], "actionRow");
    });
    const q = computed(() => a.range && !a.partialRange && a.internalModelValue ? a.internalModelValue.length === 2 : true), z = computed(() => !Q.value || !G.value || !q.value), Q = computed(() => !a.enableTimePicker || a.ignoreTimeValidation ? true : M(a.internalModelValue)), G = computed(() => a.monthPicker ? a.range && Array.isArray(a.internalModelValue) ? !a.internalModelValue.filter((D) => !Z(D)).length : Z(a.internalModelValue) : true), b = () => {
      const v = o.value;
      return a.timePicker || a.monthPicker, v(Te(a.internalModelValue));
    }, A = () => {
      const v = a.internalModelValue;
      return l.value.count > 0 ? `${O(v[0])} - ${O(v[1])}` : [O(v[0]), O(v[1])];
    }, O = (v) => Sa(
      v,
      o.value,
      a.formatLocale,
      c.value.rangeSeparator,
      a.modelAuto,
      h2()
    ), H = computed(() => !a.internalModelValue || !a.menuMount ? "" : typeof o.value == "string" ? Array.isArray(a.internalModelValue) ? a.internalModelValue.length === 2 && a.internalModelValue[1] ? A() : a.multiDates ? a.internalModelValue.map((v) => `${O(v)}`) : a.modelAuto ? `${O(a.internalModelValue[0])}` : `${O(a.internalModelValue[0])} -` : O(a.internalModelValue) : b()), _ = () => a.multiDates ? "; " : " - ", x = computed(
      () => Array.isArray(H.value) ? H.value.join(_()) : H.value
    ), Z = (v) => {
      if (!a.monthPicker)
        return true;
      let D = true;
      const C = S(ze(v));
      if (a.minDate && a.maxDate) {
        const j = S(ze(a.minDate)), f = S(ze(a.maxDate));
        return Re(C, j) && Pe(C, f) || ye(C, j) || ye(C, f);
      }
      if (a.minDate) {
        const j = S(ze(a.minDate));
        D = Re(C, j) || ye(C, j);
      }
      if (a.maxDate) {
        const j = S(ze(a.maxDate));
        D = Pe(C, j) || ye(C, j);
      }
      return D;
    }, le = () => {
      Q.value && G.value && q.value ? n("select-date") : n("invalid-select");
    };
    return (v, D) => (openBlock(), createElementBlock("div", {
      class: "dp__action_row",
      style: normalizeStyle(e.calendarWidth ? { width: `${e.calendarWidth}px` } : {})
    }, [
      v.$slots["action-row"] ? renderSlot(v.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: v.internalModelValue,
        disabled: z.value,
        selectDate: () => v.$emit("select-date"),
        closePicker: () => v.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(t).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: x.value
        }, [
          v.$slots["action-preview"] ? renderSlot(v.$slots, "action-preview", {
            key: 0,
            value: v.internalModelValue
          }) : createCommentVNode("", true),
          v.$slots["action-preview"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(x.value), 1)
          ], 64))
        ], 8, el)) : createCommentVNode("", true),
        createBaseVNode("div", tl, [
          v.$slots["action-buttons"] ? renderSlot(v.$slots, "action-buttons", {
            key: 0,
            value: v.internalModelValue
          }) : createCommentVNode("", true),
          v.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(k).enabled && unref(t).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              ref_key: "cancelButtonRef",
              ref: T,
              class: "dp__action_button dp__action_cancel",
              onClick: D[0] || (D[0] = (C) => v.$emit("close-picker")),
              onKeydown: [
                D[1] || (D[1] = withKeys((C) => v.$emit("close-picker"), ["enter"])),
                D[2] || (D[2] = withKeys((C) => v.$emit("close-picker"), ["space"]))
              ]
            }, toDisplayString(v.cancelText), 545)) : createCommentVNode("", true),
            unref(t).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              ref_key: "cancelButtonRef",
              ref: T,
              class: "dp__action_button dp__action_cancel",
              onClick: D[3] || (D[3] = (C) => v.$emit("select-now")),
              onKeydown: [
                D[4] || (D[4] = withKeys((C) => v.$emit("select-now"), ["enter"])),
                D[5] || (D[5] = withKeys((C) => v.$emit("select-now"), ["space"]))
              ]
            }, toDisplayString(v.nowButtonLabel), 545)) : createCommentVNode("", true),
            unref(t).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              type: "button",
              class: "dp__action_button dp__action_select",
              onKeydown: [
                withKeys(le, ["enter"]),
                withKeys(le, ["space"])
              ],
              onClick: le,
              disabled: z.value,
              ref_key: "selectButtonRef",
              ref: E
            }, toDisplayString(v.selectText), 41, nl)) : createCommentVNode("", true)
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
var Rt = defineComponent({
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
    const t = e, { setSelectionGrid: o, buildMultiLevelMatrix: l, setMonthPicker: c } = rt(), { defaultedAriaLabels: k, defaultedTextInput: h2 } = Ce(t), { hideNavigationButtons: M } = qt(), p = ref(false), T = ref(null), E = ref(null), q = ref([]), z = ref(), Q = ref(null), G = ref(0), b = ref(null);
    onBeforeUpdate(() => {
      T.value = null;
    }), onMounted(() => {
      nextTick().then(() => v()), O(), A(true);
    }), onUnmounted(() => A(false));
    const A = (u) => {
      var y;
      t.arrowNavigation && ((y = t.headerRefs) != null && y.length ? c(u) : o(u));
    }, O = () => {
      var y;
      const u = Ae(E);
      u && (h2.value.enabled || (T.value ? (y = T.value) == null || y.focus({ preventScroll: true }) : u.focus({ preventScroll: true })), p.value = u.clientHeight < u.scrollHeight);
    }, H = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !t.useRelative,
        "dp--overlay-relative": t.useRelative
      })
    ), _ = computed(
      () => t.useRelative ? { height: `${t.height}px`, width: "260px" } : void 0
    ), x = computed(() => ({
      dp__overlay_col: true
    })), Z = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: p.value,
        dp__button_bottom: t.isLast
      })
    ), le = computed(() => {
      var u, y;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((u = t.items) == null ? void 0 : u.length) <= 6,
        dp__container_block: ((y = t.items) == null ? void 0 : y.length) > 6
      };
    }), v = () => {
      nextTick().then(() => {
        const u = Ae(T), y = Ae(E), s = Ae(Q), P = Ae(b), te = s ? s.getBoundingClientRect().height : 0;
        y && (G.value = y.getBoundingClientRect().height - te), u && P && (P.scrollTop = u.offsetTop - P.offsetTop - (G.value / 2 - u.getBoundingClientRect().height) - te);
      });
    }, D = (u) => {
      u.disabled || a("selected", u.value);
    }, C = () => {
      a("toggle"), a("reset-flow");
    }, j = () => {
      t.escClose && C();
    }, f = (u, y, s, P) => {
      u && (y.active && (T.value = u), t.arrowNavigation && (Array.isArray(q.value[s]) ? q.value[s][P] = u : q.value[s] = [u], F()));
    }, F = () => {
      var y, s;
      const u = (y = t.headerRefs) != null && y.length ? [t.headerRefs].concat(q.value) : q.value.concat([t.skipButtonRef ? [] : [Q.value]]);
      l(Te(u), (s = t.headerRefs) != null && s.length ? "monthPicker" : "selectionGrid");
    }, d = (u) => {
      t.arrowNavigation || u.stopImmediatePropagation();
    }, w = (u) => {
      z.value = u, a("hover-value", u);
    };
    return n({ focusGrid: O }), (u, y) => {
      var s;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: E,
        class: normalizeClass(H.value),
        style: normalizeStyle(_.value),
        role: "dialog",
        tabindex: "0",
        onKeydown: [
          withKeys(withModifiers(j, ["prevent"]), ["esc"]),
          y[0] || (y[0] = withKeys(withModifiers((P) => d(P), ["prevent"]), ["left"])),
          y[1] || (y[1] = withKeys(withModifiers((P) => d(P), ["prevent"]), ["up"])),
          y[2] || (y[2] = withKeys(withModifiers((P) => d(P), ["prevent"]), ["down"])),
          y[3] || (y[3] = withKeys(withModifiers((P) => d(P), ["prevent"]), ["right"]))
        ]
      }, [
        createBaseVNode("div", {
          class: normalizeClass(le.value),
          ref_key: "containerRef",
          ref: b,
          role: "grid",
          style: normalizeStyle({ height: `${G.value}px` })
        }, [
          createBaseVNode("div", ll, [
            renderSlot(u.$slots, "header")
          ]),
          u.$slots.overlay ? renderSlot(u.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(u.items, (P, te) => (openBlock(), createElementBlock("div", {
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: u.items.length >= 3 }]),
            key: te,
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(P, (r, U) => (openBlock(), createElementBlock("div", {
              role: "gridcell",
              class: normalizeClass(x.value),
              key: r.value,
              "aria-selected": r.active,
              "aria-disabled": r.disabled || void 0,
              ref_for: true,
              ref: (R) => f(R, r, te, U),
              tabindex: "0",
              onClick: (R) => D(r),
              onKeydown: [
                withKeys(withModifiers((R) => D(r), ["prevent"]), ["enter"]),
                withKeys(withModifiers((R) => D(r), ["prevent"]), ["space"])
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
          "aria-label": (s = unref(k)) == null ? void 0 : s.toggleOverlay,
          class: normalizeClass(Z.value),
          tabindex: "0",
          ref_key: "toggleButton",
          ref: Q,
          onClick: C,
          onKeydown: [
            withKeys(C, ["enter"]),
            withKeys(C, ["tab"])
          ]
        }, [
          renderSlot(u.$slots, "button-icon")
        ], 42, sl)), [
          [vShow, !unref(M)(u.hideNavigation, u.type)]
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
      (openBlock(true), createElementBlock(Fragment, null, renderList(a.value, (c, k) => (openBlock(), createElementBlock("div", {
        key: c,
        class: normalizeClass(t.value)
      }, [
        renderSlot(o.$slots, "default", {
          instance: c,
          index: k
        })
      ], 2))), 128))
    ], 2));
  }
});
var ul = ["aria-label", "aria-disabled"];
var At = defineComponent({
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
      "aria-disabled": t.disabled || void 0,
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
var Ca = (e, n, a) => {
  let t = e.value ? e.value.slice() : [];
  return t.length === 2 && t[1] !== null && (t = []), t.length ? Pe(n, t[0]) ? (t.unshift(n), a("range-start", t[0]), a("range-start", t[1])) : (t[1] = n, a("range-end", n)) : (t = [n], a("range-start", n)), e.value = t, t;
};
var Un = (e, n, a, t) => {
  e[0] && e[1] && a && n("auto-apply"), e[0] && !e[1] && t && a && n("auto-apply");
};
var il = (e, n) => {
  const { defaultedMultiCalendars: a, defaultedAriaLabels: t, defaultedTransitions: o } = Ce(e), { modelValue: l, year: c, month: k, calendars: h2 } = Zt(e, n), M = computed(() => wa(e.formatLocale, e.locale, e.monthNameFormat)), p = computed(() => Fn(e.yearRange, e.reverseYears)), T = ref(null), E = () => {
    for (let d = 0; d < a.value.count; d++)
      if (d === 0)
        h2.value[d] = h2.value[0];
      else {
        const w = set(S(), h2.value[d - 1]);
        h2.value[d] = { month: getMonth(w), year: getYear(addYears(w, d)) };
      }
  }, q = (d) => {
    if (!d)
      return E();
    const w = set(S(), h2.value[d]);
    return h2.value[0].year = getYear(subYears(w, a.value.count - 1)), E();
  }, z = (d) => e.focusStartDate ? d[0] : d[1] ? d[1] : d[0], Q = () => {
    if (l.value) {
      const d = Array.isArray(l.value) ? z(l.value) : l.value;
      h2.value[0] = { month: getMonth(d), year: getYear(d) };
    }
  };
  onMounted(() => {
    Q(), a.value.count && E();
  });
  const G = computed(() => (d, w) => {
    const u = set(ze(/* @__PURE__ */ new Date()), {
      month: k.value(d),
      year: c.value(d)
    });
    return _a(u, e.maxDate, e.minDate, e.preventMinMaxNavigation, w);
  }), b = (d) => d ? { month: getMonth(d), year: getYear(d) } : { month: null, year: null }, A = () => l.value ? Array.isArray(l.value) ? l.value.map((d) => b(d)) : b(l.value) : b(), O = (d, w) => {
    const u = h2.value[d], y = A();
    return Array.isArray(y) ? y.some((s) => s.year === (u == null ? void 0 : u.year) && s.month === w) : (u == null ? void 0 : u.year) === y.year && w === y.month;
  }, H = (d, w, u) => {
    var s, P;
    const y = A();
    return Array.isArray(y) ? c.value(w) === ((s = y[u]) == null ? void 0 : s.year) && d === ((P = y[u]) == null ? void 0 : P.month) : false;
  }, _ = (d, w) => {
    if (e.range) {
      const u = A();
      if (Array.isArray(l.value) && Array.isArray(u)) {
        const y = H(d, w, 0) || H(d, w, 1), s = Je(ze(S()), d, c.value(w));
        return Vn(l.value, T.value, s) && !y;
      }
      return false;
    }
    return false;
  }, x = computed(() => (d) => bt(M.value, (w) => {
    const u = O(d, w.value), y = Ct(
      w.value,
      Ma(c.value(d), e.minDate),
      $a(c.value(d), e.maxDate)
    ) || Ir(e.disabledDates, c.value(d)).includes(w.value), s = _(w.value, d);
    return { active: u, disabled: y, isBetween: s };
  })), Z = computed(() => (d) => bt(p.value, (w) => {
    const u = c.value(d) === w.value, y = Ct(w.value, kt(e.minDate), kt(e.maxDate));
    return { active: u, disabled: y };
  })), le = (d, w) => Je(ze(S()), d, c.value(w)), v = (d, w) => {
    const u = l.value ? l.value : ze(/* @__PURE__ */ new Date());
    l.value = Je(u, d, c.value(w)), n("auto-apply");
  }, D = (d, w) => {
    const u = Ca(l, le(d, w), n);
    Un(u, n, e.autoApply, e.modelAuto);
  }, C = (d, w) => {
    Ln(le(d, w), l, e.multiDatesLimit), n("auto-apply", true);
  };
  return {
    groupedMonths: x,
    groupedYears: Z,
    year: c,
    isDisabled: G,
    defaultedMultiCalendars: a,
    defaultedAriaLabels: t,
    defaultedTransitions: o,
    setHoverDate: (d, w) => {
      T.value = le(d, w);
    },
    selectMonth: (d, w) => (h2.value[w].month = d, e.multiDates ? C(d, w) : e.range ? D(d, w) : v(d, w)),
    selectYear: (d, w) => {
      h2.value[w].year = d, a.value.count && !a.value.solo && q(w);
    }
  };
};
var dl = { class: "dp__month_picker_header" };
var cl = ["aria-label", "onClick", "onKeydown"];
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
      defaultedMultiCalendars: k,
      defaultedAriaLabels: h2,
      defaultedTransitions: M,
      setHoverDate: p,
      selectMonth: T,
      selectYear: E
    } = il(a, n), { transitionName: q, showTransition: z } = Yt(M), { showRightIcon: Q, showLeftIcon: G } = qt(), b = ref([false]), A = (_, x) => {
      E(_, x), H(x);
    }, O = (_, x = false) => {
      if (!c.value(_, x)) {
        const Z = x ? l.value(_) + 1 : l.value(_) - 1;
        E(Z, _);
      }
    }, H = (_, x = false, Z) => {
      x || n("reset-flow"), Z !== void 0 ? b.value[_] = Z : b.value[_] = !b.value[_], b.value || n("overlay-closed");
    };
    return (_, x) => (openBlock(), createBlock(Hn, {
      "multi-calendars": unref(k).count,
      stretch: ""
    }, {
      default: withCtx(({ instance: Z }) => [
        createVNode(Rt, {
          items: unref(t)(Z),
          "arrow-navigation": _.arrowNavigation,
          "is-last": _.autoApply && !_.keepActionRow,
          "esc-close": _.escClose,
          height: _.modeHeight,
          onSelected: (le) => unref(T)(le, Z),
          onHoverValue: (le) => unref(p)(le, Z),
          "use-relative": "",
          type: "month"
        }, {
          header: withCtx(() => {
            var le, v, D;
            return [
              createBaseVNode("div", dl, [
                unref(G)(unref(k), Z) ? (openBlock(), createBlock(At, {
                  key: 0,
                  ref: "mpPrevIconRef",
                  "aria-label": (le = unref(h2)) == null ? void 0 : le.prevYear,
                  disabled: unref(c)(Z, false),
                  onActivate: (C) => O(Z, false)
                }, {
                  default: withCtx(() => [
                    _.$slots["arrow-left"] ? renderSlot(_.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                    _.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Cn), { key: 1 }))
                  ]),
                  _: 2
                }, 1032, ["aria-label", "disabled", "onActivate"])) : createCommentVNode("", true),
                createBaseVNode("div", {
                  class: "dp--year-select",
                  role: "button",
                  ref: "mpYearButtonRef",
                  "aria-label": (v = unref(h2)) == null ? void 0 : v.openYearsOverlay,
                  tabindex: "0",
                  onClick: () => H(Z, false),
                  onKeydown: withKeys(() => H(Z, false), ["enter"])
                }, [
                  _.$slots.year ? renderSlot(_.$slots, "year", {
                    key: 0,
                    year: unref(l)(Z)
                  }) : createCommentVNode("", true),
                  _.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(unref(l)(Z)), 1)
                  ], 64))
                ], 40, cl),
                unref(Q)(unref(k), Z) ? (openBlock(), createBlock(At, {
                  key: 1,
                  ref: "mpNextIconRef",
                  "aria-label": (D = unref(h2)) == null ? void 0 : D.nextYear,
                  disabled: unref(c)(Z, false),
                  onActivate: (C) => O(Z, true)
                }, {
                  default: withCtx(() => [
                    _.$slots["arrow-right"] ? renderSlot(_.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
                    _.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Rn), { key: 1 }))
                  ]),
                  _: 2
                }, 1032, ["aria-label", "disabled", "onActivate"])) : createCommentVNode("", true),
                createVNode(Transition, {
                  name: unref(q)(b.value[Z]),
                  css: unref(z)
                }, {
                  default: withCtx(() => [
                    b.value[Z] ? (openBlock(), createBlock(Rt, {
                      key: 0,
                      items: unref(o)(Z),
                      "text-input": _.textInput,
                      "esc-close": _.escClose,
                      onToggle: (C) => H(Z),
                      onSelected: (C) => A(C, Z),
                      "is-last": _.autoApply && !_.keepActionRow,
                      type: "year"
                    }, createSlots({
                      "button-icon": withCtx(() => [
                        _.$slots["calendar-icon"] ? renderSlot(_.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        _.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(It), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      _.$slots["year-overlay-value"] ? {
                        name: "item",
                        fn: withCtx(({ item: C }) => [
                          renderSlot(_.$slots, "year-overlay-value", {
                            text: C.text,
                            value: C.value
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
  const { modelValue: a } = Zt(e, n), t = ref(null), o = (p) => Array.isArray(a.value) ? a.value.some((T) => getYear(T) === p) : a.value ? getYear(a.value) === p : false, l = (p) => e.range && Array.isArray(a.value) ? Vn(a.value, t.value, k(p)) : false, c = computed(() => bt(Fn(e.yearRange, e.reverseYears), (p) => {
    const T = o(p.value), E = Ct(p.value, kt(e.minDate), kt(e.maxDate)), q = l(p.value);
    return { active: T, disabled: E, isBetween: q };
  })), k = (p) => setYear(ze(/* @__PURE__ */ new Date()), p);
  return {
    groupedYears: c,
    setHoverValue: (p) => {
      t.value = setYear(ze(/* @__PURE__ */ new Date()), p);
    },
    selectYear: (p) => {
      if (e.multiDates)
        return Ln(k(p), a, e.multiDatesLimit), n("auto-apply", true);
      if (e.range) {
        const T = Ca(a, k(p), n);
        return Un(T, n, e.autoApply, e.modelAuto);
      }
      a.value = k(p), n("auto-apply");
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
  emits: ["update:internal-model-value", "reset-flow", "range-start", "range-end", "auto-apply"],
  setup(e, { emit: n }) {
    const a = e, { groupedYears: t, selectYear: o, setHoverValue: l } = vl(a, n);
    return (c, k) => (openBlock(), createBlock(Rt, {
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
        fn: withCtx(({ item: h2 }) => [
          renderSlot(c.$slots, "year-overlay-value", {
            text: h2.text,
            value: h2.value
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
var hl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var pl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
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
    disabledTimesConfig: { type: Function, default: null },
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
    const t = e, { setTimePickerElements: o, setTimePickerBackRef: l } = rt(), { defaultedAriaLabels: c, defaultedTransitions: k, defaultedFilters: h2 } = Ce(t), { transitionName: M, showTransition: p } = Yt(k), T = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), E = ref("AM"), q = ref(null), z = ref([]);
    onMounted(() => {
      a("mounted");
    });
    const Q = (r) => set(/* @__PURE__ */ new Date(), {
      hours: r.hours,
      minutes: r.minutes,
      seconds: t.enableSeconds ? r.seconds : 0,
      milliseconds: 0
    }), G = computed(() => (r) => D(r, t[r])), b = computed(() => ({ hours: t.hours, minutes: t.minutes, seconds: t.seconds })), A = computed(() => (r) => !j(+t[r] + +t[`${r}Increment`], r)), O = computed(() => (r) => !j(+t[r] - +t[`${r}Increment`], r)), H = (r, U) => add(set(S(), r), U), _ = (r, U) => sub(set(S(), r), U), x = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !t.timePickerInline,
        dp__time_col_reg_block: !t.enableSeconds && t.is24 && !t.timePickerInline,
        dp__time_col_reg_inline: !t.enableSeconds && t.is24 && t.timePickerInline,
        dp__time_col_reg_with_button: !t.enableSeconds && !t.is24,
        dp__time_col_sec: t.enableSeconds && t.is24,
        dp__time_col_sec_with_button: t.enableSeconds && !t.is24
      })
    ), Z = computed(() => {
      const r = [{ type: "hours" }, { type: "", separator: true }, { type: "minutes" }];
      return t.enableSeconds ? r.concat([{ type: "", separator: true }, { type: "seconds" }]) : r;
    }), le = computed(() => Z.value.filter((r) => !r.separator)), v = computed(() => (r) => {
      if (r === "hours") {
        const U = u(+t.hours);
        return { text: U < 10 ? `0${U}` : `${U}`, value: U };
      }
      return { text: t[r] < 10 ? `0${t[r]}` : `${t[r]}`, value: t[r] };
    }), D = (r, U) => {
      var g;
      if (!t.disabledTimesConfig)
        return false;
      const R = t.disabledTimesConfig(t.order, r === "hours" ? U : void 0);
      return R[r] ? !!((g = R[r]) != null && g.includes(U)) : true;
    }, C = (r) => {
      const U = t.is24 ? 24 : 12, R = r === "hours" ? U : 60, g = +t[`${r}GridIncrement`], V = r === "hours" && !t.is24 ? g : 0, re = [];
      for (let K = V; K < R; K += g)
        re.push({ value: K, text: K < 10 ? `0${K}` : `${K}` });
      return r === "hours" && !t.is24 && re.push({ value: 0, text: "12" }), bt(re, (K) => ({ active: false, disabled: h2.value.times[r].includes(K.value) || !j(K.value, r) || D(r, K.value) }));
    }, j = (r, U) => {
      const R = t.minTime ? Q(cn(t.minTime)) : null, g = t.maxTime ? Q(cn(t.maxTime)) : null, V = Q(cn(b.value, U, r));
      return R && g ? (isBefore(V, g) || isEqual(V, g)) && (isAfter(V, R) || isEqual(V, R)) : R ? isAfter(V, R) || isEqual(V, R) : g ? isBefore(V, g) || isEqual(V, g) : true;
    }, f = (r) => t[`no${r[0].toUpperCase() + r.slice(1)}Overlay`], F = (r) => {
      f(r) || (T[r] = !T[r], T[r] || a("overlay-closed"));
    }, d = (r) => r === "hours" ? getHours : r === "minutes" ? getMinutes : getSeconds, w = (r, U = true) => {
      const R = U ? H : _, g = U ? +t[`${r}Increment`] : -+t[`${r}Increment`];
      j(+t[r] + g, r) && a(
        `update:${r}`,
        d(r)(R({ [r]: +t[r] }, { [r]: +t[`${r}Increment`] }))
      );
    }, u = (r) => t.is24 ? r : (r >= 12 ? E.value = "PM" : E.value = "AM", Mr(r)), y = () => {
      E.value === "PM" ? (E.value = "AM", a("update:hours", t.hours - 12)) : (E.value = "PM", a("update:hours", t.hours + 12)), a("am-pm-change", E.value);
    }, s = (r) => {
      T[r] = true;
    }, P = (r, U, R) => {
      if (r && t.arrowNavigation) {
        Array.isArray(z.value[U]) ? z.value[U][R] = r : z.value[U] = [r];
        const g = z.value.reduce(
          (V, re) => re.map((K, we) => [...V[we] || [], re[we]]),
          []
        );
        l(t.closeTimePickerBtn), q.value && (g[1] = g[1].concat(q.value)), o(g, t.order);
      }
    }, te = (r, U) => (F(r), r === "hours" && !t.is24 ? a(`update:${r}`, E.value === "PM" ? U + 12 : U) : a(`update:${r}`, U));
    return n({ openChildCmp: s }), (r, U) => {
      var R;
      return r.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", gl, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(Z.value, (g, V) => {
          var re, K, we;
          return openBlock(), createElementBlock("div", {
            key: V,
            class: normalizeClass(x.value)
          }, [
            g.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(" : ")
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !t.timePickerInline,
                  dp__inc_dec_button_inline: t.timePickerInline,
                  dp__tp_inline_btn_top: t.timePickerInline,
                  dp__inc_dec_button_disabled: A.value(g.type)
                }),
                "aria-label": (re = unref(c)) == null ? void 0 : re.incrementValue(g.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((se) => w(g.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((se) => w(g.type), ["prevent"]), ["space"])
                ],
                onClick: (se) => w(g.type),
                ref_for: true,
                ref: (se) => P(se, V, 0)
              }, [
                t.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  hl,
                  pl
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  r.$slots["arrow-up"] ? renderSlot(r.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  r.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(On), { key: 1 }))
                ], 64))
              ], 42, yl),
              createBaseVNode("button", {
                type: "button",
                "aria-label": (K = unref(c)) == null ? void 0 : K.openTpOverlay(g.type),
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !t.timePickerInline,
                  dp__time_display_inline: t.timePickerInline,
                  "dp--time-invalid": G.value(g.type),
                  "dp--time-overlay-btn": !G.value(g.type)
                }),
                disabled: f(g.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((se) => F(g.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((se) => F(g.type), ["prevent"]), ["space"])
                ],
                onClick: (se) => F(g.type),
                ref_for: true,
                ref: (se) => P(se, V, 1)
              }, [
                r.$slots[g.type] ? renderSlot(r.$slots, g.type, {
                  key: 0,
                  text: v.value(g.type).text,
                  value: v.value(g.type).value
                }) : createCommentVNode("", true),
                r.$slots[g.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(v.value(g.type).text), 1)
                ], 64))
              ], 42, bl),
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !t.timePickerInline,
                  dp__inc_dec_button_inline: t.timePickerInline,
                  dp__tp_inline_btn_bottom: t.timePickerInline,
                  dp__inc_dec_button_disabled: O.value(g.type)
                }),
                "aria-label": (we = unref(c)) == null ? void 0 : we.decrementValue(g.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((se) => w(g.type, false), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((se) => w(g.type, false), ["prevent"]), ["space"])
                ],
                onClick: (se) => w(g.type, false),
                ref_for: true,
                ref: (se) => P(se, V, 2)
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
            toggle: y,
            value: E.value
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
            onClick: y,
            onKeydown: [
              withKeys(withModifiers(y, ["prevent"]), ["enter"]),
              withKeys(withModifiers(y, ["prevent"]), ["space"])
            ]
          }, toDisplayString(E.value), 41, $l))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(le.value, (g, V) => (openBlock(), createBlock(Transition, {
          key: V,
          name: unref(M)(T[g.type]),
          css: unref(p)
        }, {
          default: withCtx(() => [
            T[g.type] ? (openBlock(), createBlock(Rt, {
              key: 0,
              items: C(g.type),
              "is-last": r.autoApply && !r.keepActionRow,
              "esc-close": r.escClose,
              type: g.type,
              "text-input": r.textInput,
              "arrow-navigation": r.arrowNavigation,
              onSelected: (re) => te(g.type, re),
              onToggle: (re) => F(g.type),
              onResetFlow: U[0] || (U[0] = (re) => r.$emit("reset-flow"))
            }, createSlots({
              "button-icon": withCtx(() => [
                r.$slots["clock-icon"] ? renderSlot(r.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                r.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Nn), { key: 1 }))
              ]),
              _: 2
            }, [
              r.$slots[`${g.type}-overlay-value`] ? {
                name: "item",
                fn: withCtx(({ item: re }) => [
                  renderSlot(r.$slots, `${g.type}-overlay-value`, {
                    text: re.text,
                    value: re.value
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
var Ra = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePicker",
  props: {
    hours: { type: [Number, Array], default: 0 },
    minutes: { type: [Number, Array], default: 0 },
    seconds: { type: [Number, Array], default: 0 },
    disabledTimesConfig: { type: Function, default: null },
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
    const t = e, { buildMatrix: o, setTimePicker: l } = rt(), c = useSlots(), { defaultedTransitions: k, defaultedAriaLabels: h2, defaultedTextInput: M } = Ce(t), { transitionName: p, showTransition: T } = Yt(k), { hideNavigationButtons: E } = qt(), q = ref(null), z = ref(null), Q = ref([]), G = ref(null);
    onMounted(() => {
      a("mount"), !t.timePicker && t.arrowNavigation ? o([Ae(q.value)], "time") : l(true, t.timePicker);
    });
    const b = computed(() => t.range && t.modelAuto ? Da(t.internalModelValue) : true), A = ref(false), O = (f) => ({
      hours: Array.isArray(t.hours) ? t.hours[f] : t.hours,
      minutes: Array.isArray(t.minutes) ? t.minutes[f] : t.minutes,
      seconds: Array.isArray(t.seconds) ? t.seconds[f] : t.seconds
    }), H = computed(() => {
      const f = [];
      if (t.range)
        for (let F = 0; F < 2; F++)
          f.push(O(F));
      else
        f.push(O(0));
      return f;
    }), _ = (f, F = false, d = "") => {
      F || a("reset-flow"), A.value = f, a(f ? "overlay-opened" : "overlay-closed"), t.arrowNavigation && l(f), nextTick(() => {
        d !== "" && Q.value[0] && Q.value[0].openChildCmp(d);
      });
    }, x = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: t.autoApply && !t.keepActionRow
    })), Z = je(c, "timePicker"), le = (f, F, d) => t.range ? F === 0 ? [f, H.value[1][d]] : [H.value[0][d], f] : f, v = (f) => {
      a("update:hours", f);
    }, D = (f) => {
      a("update:minutes", f);
    }, C = (f) => {
      a("update:seconds", f);
    }, j = () => {
      if (G.value && !M.value.enabled) {
        const f = Tr(G.value);
        f && f.focus({ preventScroll: true });
      }
    };
    return n({ toggleTimePicker: _ }), (f, F) => {
      var d;
      return openBlock(), createElementBlock("div", null, [
        !f.timePicker && !f.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          class: normalizeClass(x.value),
          "aria-label": (d = unref(h2)) == null ? void 0 : d.openTimePicker,
          tabindex: "0",
          ref_key: "openTimePickerBtn",
          ref: q,
          onKeydown: [
            F[0] || (F[0] = withKeys((w) => _(true), ["enter"])),
            F[1] || (F[1] = withKeys((w) => _(true), ["space"]))
          ],
          onClick: F[2] || (F[2] = (w) => _(true))
        }, [
          f.$slots["clock-icon"] ? renderSlot(f.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          f.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Nn), { key: 1 }))
        ], 42, Al)), [
          [vShow, !unref(E)(f.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(p)(A.value),
          css: unref(T) && !f.timePickerInline
        }, {
          default: withCtx(() => {
            var w;
            return [
              A.value || f.timePicker || f.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass({
                  dp__overlay: !f.timePickerInline,
                  "dp--overlay-absolute": !t.timePicker && !f.timePickerInline,
                  "dp--overlay-relative": t.timePicker
                }),
                style: normalizeStyle(f.timePicker ? { height: `${f.modeHeight}px` } : void 0),
                ref_key: "overlayRef",
                ref: G,
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
                    setHours: v,
                    setMinutes: D,
                    setSeconds: C
                  }) : createCommentVNode("", true),
                  f.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(f.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(H.value, (u, y) => withDirectives((openBlock(), createBlock(Tl, mergeProps({ key: y }, {
                      ...f.$props,
                      order: y,
                      hours: u.hours,
                      minutes: u.minutes,
                      seconds: u.seconds,
                      closeTimePickerBtn: z.value,
                      disabledTimesConfig: e.disabledTimesConfig,
                      disabled: y === 0 ? f.fixedStart : f.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: Q,
                      "onUpdate:hours": (s) => v(le(s, y, "hours")),
                      "onUpdate:minutes": (s) => D(le(s, y, "minutes")),
                      "onUpdate:seconds": (s) => C(le(s, y, "seconds")),
                      onMounted: j,
                      onOverlayClosed: j,
                      onAmPmChange: F[3] || (F[3] = (s) => f.$emit("am-pm-change", s))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(Z), (s, P) => ({
                        name: s,
                        fn: withCtx((te) => [
                          renderSlot(f.$slots, s, normalizeProps(guardReactiveProps(te)))
                        ])
                      }))
                    ]), 1040, ["onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, y === 0 ? true : b.value]
                    ])), 128))
                  ], 2)),
                  !f.timePicker && !f.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    type: "button",
                    ref_key: "closeTimePickerBtn",
                    ref: z,
                    class: normalizeClass(x.value),
                    "aria-label": (w = unref(h2)) == null ? void 0 : w.closeTimePicker,
                    tabindex: "0",
                    onKeydown: [
                      F[4] || (F[4] = withKeys((u) => _(false), ["enter"])),
                      F[5] || (F[5] = withKeys((u) => _(false), ["space"]))
                    ],
                    onClick: F[6] || (F[6] = (u) => _(false))
                  }, [
                    f.$slots["calendar-icon"] ? renderSlot(f.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    f.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(It), { key: 1 }))
                  ], 42, Sl)), [
                    [vShow, !unref(E)(f.hideNavigation, "time")]
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
var Na = (e, n, a, t) => {
  const o = (b, A) => Array.isArray(n[b]) ? n[b][A] : n[b], l = (b) => e.enableSeconds ? Array.isArray(n.seconds) ? n.seconds[b] : n.seconds : 0, c = (b, A) => b ? A !== void 0 ? tt(b, o("hours", A), o("minutes", A), l(A)) : tt(b, n.hours, n.minutes, l()) : S(), k = (b, A) => {
    n[b] = A;
  }, h2 = (b, A) => {
    const O = Object.fromEntries(
      Object.keys(n).map((H) => H === b ? [H, A] : [H, n[H]].slice())
    );
    if (e.range && !e.disableTimeRangeValidation) {
      const H = (x) => a.value ? tt(
        a.value[x],
        O.hours[x],
        O.minutes[x],
        O.seconds[x]
      ) : null, _ = (x) => setMilliseconds(a.value[x], 0);
      return !(ye(H(0), H(1)) && (isAfter(H(0), _(1)) || isBefore(H(1), _(0))));
    }
    return true;
  }, M = (b, A) => {
    h2(b, A) && (k(b, A), t && t());
  }, p = (b) => {
    M("hours", b);
  }, T = (b) => {
    M("minutes", b);
  }, E = (b) => {
    M("seconds", b);
  }, q = (b, A, O, H) => {
    A && p(b), !A && !O && T(b), O && E(b), a.value && H(a.value);
  }, z = (b) => {
    if (b) {
      const A = Array.isArray(b), O = A ? [+b[0].hours, +b[1].hours] : +b.hours, H = A ? [+b[0].minutes, +b[1].minutes] : +b.minutes, _ = A ? [+b[0].seconds, +b[1].seconds] : +b.seconds;
      k("hours", O), k("minutes", H), e.enableSeconds && k("seconds", _);
    }
  }, Q = (b, A) => {
    const O = {
      hours: Array.isArray(n.hours) ? n.hours[b] : n.hours,
      disabledArr: []
    };
    return (A || A === 0) && (O.hours = A), Array.isArray(e.disabledTimes) && (O.disabledArr = e.range && Array.isArray(e.disabledTimes[b]) ? e.disabledTimes[b] : e.disabledTimes), O;
  }, G = computed(() => (b, A) => {
    var O;
    if (Array.isArray(e.disabledTimes)) {
      const { disabledArr: H, hours: _ } = Q(b, A), x = H.filter((Z) => +Z.hours === _);
      return ((O = x[0]) == null ? void 0 : O.minutes) === "*" ? { hours: [_], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (x == null ? void 0 : x.map((Z) => +Z.minutes)) ?? [],
        seconds: (x == null ? void 0 : x.map((Z) => Z.seconds ? +Z.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: k,
    updateHours: p,
    updateMinutes: T,
    updateSeconds: E,
    getSetDateTime: c,
    updateTimeValues: q,
    getSecondsValue: l,
    assignStartTime: z,
    disabledTimesConfig: G
  };
};
var Pl = (e, n) => {
  const { modelValue: a, time: t } = Zt(e, n), { defaultedStartTime: o } = Ce(e), { updateTimeValues: l, getSetDateTime: c, setTime: k, assignStartTime: h2, disabledTimesConfig: M } = Na(
    e,
    t,
    a
  ), p = (A) => {
    const { hours: O, minutes: H, seconds: _ } = A;
    return { hours: +O, minutes: +H, seconds: _ ? +_ : 0 };
  }, T = () => {
    if (e.startTime) {
      if (Array.isArray(e.startTime)) {
        const O = p(e.startTime[0]), H = p(e.startTime[1]);
        return [set(S(), O), set(S(), H)];
      }
      const A = p(e.startTime);
      return set(S(), A);
    }
    return e.range ? [null, null] : null;
  }, E = () => {
    if (e.range) {
      const [A, O] = T();
      a.value = [c(A, 0), c(O, 1)];
    } else
      a.value = c(T());
  }, q = (A) => Array.isArray(A) ? [ft(S(A[0])), ft(S(A[1]))] : [ft(A ?? S())], z = (A, O, H) => {
    k("hours", A), k("minutes", O), e.enableSeconds && k("seconds", H);
  }, Q = () => {
    const [A, O] = q(a.value);
    return e.range ? z(
      [A.hours, O.hours],
      [A.minutes, O.minutes],
      [A.seconds, O.minutes]
    ) : z(A.hours, A.minutes, A.seconds);
  };
  onMounted(() => {
    if (!e.shadow)
      return h2(o.value), a.value ? Q() : E();
  });
  const G = () => {
    Array.isArray(a.value) ? a.value = a.value.map((A, O) => A && c(A, O)) : a.value = c(a.value), n("time-update");
  };
  return {
    time: t,
    disabledTimesConfig: M,
    updateTime: (A, O = true, H = false) => {
      l(A, O, H, G);
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
    const a = e, t = useSlots(), o = je(t, "timePicker"), { time: l, disabledTimesConfig: c, updateTime: k } = Pl(a, n);
    return (h2, M) => (openBlock(), createBlock(Hn, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(() => [
        createVNode(Ra, mergeProps(h2.$props, {
          hours: unref(l).hours,
          minutes: unref(l).minutes,
          seconds: unref(l).seconds,
          "internal-model-value": h2.internalModelValue,
          "disabled-times-config": unref(c),
          "onUpdate:hours": M[0] || (M[0] = (p) => unref(k)(p)),
          "onUpdate:minutes": M[1] || (M[1] = (p) => unref(k)(p, false)),
          "onUpdate:seconds": M[2] || (M[2] = (p) => unref(k)(p, false, true)),
          onAmPmChange: M[3] || (M[3] = (p) => h2.$emit("am-pm-change", p))
        }), createSlots({ _: 2 }, [
          renderList(unref(o), (p, T) => ({
            name: p,
            fn: withCtx((E) => [
              renderSlot(h2.$slots, p, normalizeProps(guardReactiveProps(E)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config"])
      ]),
      _: 3
    }));
  }
});
var Rl = { class: "dp__month_year_row" };
var Nl = ["aria-label", "onClick", "onKeydown"];
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
    const t = e, { defaultedTransitions: o, defaultedAriaLabels: l, defaultedMultiCalendars: c, defaultedFilters: k } = Ce(t), { transitionName: h2, showTransition: M } = Yt(o), { buildMatrix: p } = rt(), { handleMonthYearChange: T, isDisabled: E, updateMonthYear: q } = zr(t, a), { showLeftIcon: z, showRightIcon: Q } = qt(), G = ref(false), b = ref(false), A = ref([null, null, null, null]);
    onMounted(() => {
      a("mount");
    });
    const O = (u) => ({
      get: () => t[u],
      set: (y) => {
        const s = u === We.month ? We.year : We.month;
        a("update-month-year", { [u]: y, [s]: t[s] }), u === We.month ? C(true) : j(true);
      }
    }), H = computed(O(We.month)), _ = computed(O(We.year)), x = computed(() => (u) => ({
      month: t.month,
      year: t.year,
      items: u === We.month ? t.months : t.years,
      instance: t.instance,
      updateMonthYear: q,
      toggle: u === We.month ? C : j
    })), Z = computed(() => {
      const u = t.months.find((y) => y.value === t.month);
      return u || { text: "", value: 0 };
    }), le = computed(() => bt(t.months, (u) => {
      const y = t.month === u.value, s = Ct(
        u.value,
        Ma(t.year, t.minDate),
        $a(t.year, t.maxDate)
      ) || k.value.months.includes(u.value);
      return { active: y, disabled: s };
    })), v = computed(() => bt(t.years, (u) => {
      const y = t.year === u.value, s = Ct(u.value, kt(t.minDate), kt(t.maxDate)) || k.value.years.includes(u.value);
      return { active: y, disabled: s };
    })), D = (u, y) => {
      y !== void 0 ? u.value = y : u.value = !u.value, u.value || a("overlay-closed");
    }, C = (u = false, y) => {
      f(u), D(G, y);
    }, j = (u = false, y) => {
      f(u), D(b, y);
    }, f = (u) => {
      u || a("reset-flow");
    }, F = (u, y) => {
      t.arrowNavigation && (A.value[y] = Ae(u), p(A.value, "monthYear"));
    }, d = computed(() => {
      var u, y;
      return [
        {
          type: We.month,
          index: 1,
          toggle: C,
          modelValue: H.value,
          updateModelValue: (s) => H.value = s,
          text: Z.value.text,
          showSelectionGrid: G.value,
          items: le.value,
          ariaLabel: (u = l.value) == null ? void 0 : u.openMonthsOverlay
        },
        {
          type: We.year,
          index: 2,
          toggle: j,
          modelValue: _.value,
          updateModelValue: (s) => _.value = s,
          text: t.year,
          showSelectionGrid: b.value,
          items: v.value,
          ariaLabel: (y = l.value) == null ? void 0 : y.openYearsOverlay
        }
      ];
    }), w = computed(
      () => t.disableYearSelect ? [d.value[0]] : d.value
    );
    return n({
      toggleMonthPicker: C,
      toggleYearPicker: j,
      handleMonthYearChange: T
    }), (u, y) => {
      var s, P, te;
      return openBlock(), createElementBlock("div", Rl, [
        u.$slots["month-year"] ? renderSlot(u.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, { month: e.month, year: e.year, months: e.months, years: e.years, updateMonthYear: unref(q), handleMonthYearChange: unref(T), instance: e.instance }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          unref(z)(unref(c), e.instance) && !u.vertical ? (openBlock(), createBlock(At, {
            key: 0,
            "aria-label": (s = unref(l)) == null ? void 0 : s.prevMonth,
            disabled: unref(E)(false),
            onActivate: y[0] || (y[0] = (r) => unref(T)(false)),
            onSetRef: y[1] || (y[1] = (r) => F(r, 0))
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
            (openBlock(true), createElementBlock(Fragment, null, renderList(w.value, (r, U) => (openBlock(), createElementBlock(Fragment, {
              key: r.type
            }, [
              createBaseVNode("button", {
                type: "button",
                class: "dp__btn dp__month_year_select",
                tabindex: "0",
                "aria-label": r.ariaLabel,
                ref_for: true,
                ref: (R) => F(R, U + 1),
                onClick: r.toggle,
                onKeydown: [
                  withKeys(withModifiers(r.toggle, ["prevent"]), ["enter"]),
                  withKeys(withModifiers(r.toggle, ["prevent"]), ["space"])
                ]
              }, [
                u.$slots[r.type] ? renderSlot(u.$slots, r.type, {
                  key: 0,
                  text: r.text,
                  value: t[r.type]
                }) : createCommentVNode("", true),
                u.$slots[r.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(r.text), 1)
                ], 64))
              ], 40, Nl),
              createVNode(Transition, {
                name: unref(h2)(r.showSelectionGrid),
                css: unref(M)
              }, {
                default: withCtx(() => [
                  r.showSelectionGrid ? (openBlock(), createBlock(Rt, {
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
                        renderSlot(u.$slots, `${r.type}-overlay`, normalizeProps(guardReactiveProps(x.value(r.type))))
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
          unref(z)(unref(c), e.instance) && u.vertical ? (openBlock(), createBlock(At, {
            key: 1,
            "aria-label": (P = unref(l)) == null ? void 0 : P.prevMonth,
            disabled: unref(E)(false),
            onActivate: y[2] || (y[2] = (r) => unref(T)(false))
          }, {
            default: withCtx(() => [
              u.$slots["arrow-up"] ? renderSlot(u.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
              u.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(On), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
          unref(Q)(unref(c), e.instance) ? (openBlock(), createBlock(At, {
            key: 2,
            ref: "rightIcon",
            disabled: unref(E)(true),
            "aria-label": (te = unref(l)) == null ? void 0 : te.nextMonth,
            onActivate: y[3] || (y[3] = (r) => unref(T)(true)),
            onSetRef: y[4] || (y[4] = (r) => F(r, u.disableYearSelect ? 2 : 3))
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
    const t = e, { buildMultiLevelMatrix: o } = rt(), { defaultedTransitions: l, defaultedAriaLabels: c, defaultedMultiCalendars: k } = Ce(t), h2 = ref(null), M = ref({
      bottom: "",
      left: "",
      transform: ""
    }), p = ref([]), T = ref(null), E = ref(true), q = ref(""), z = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), Q = ref([]), G = ref({ left: "50%" }), b = computed(() => t.calendar ? t.calendar(t.mappedDates) : t.mappedDates), A = computed(() => t.dayNames ? Array.isArray(t.dayNames) ? t.dayNames : t.dayNames(t.locale, +t.weekStart) : Dr(t.formatLocale, t.locale, +t.weekStart));
    onMounted(() => {
      a("mount", { cmp: "calendar", refs: p }), t.noSwipe || T.value && (T.value.addEventListener("touchstart", j, { passive: false }), T.value.addEventListener("touchend", f, { passive: false }), T.value.addEventListener("touchmove", F, { passive: false })), t.monthChangeOnScroll && T.value && T.value.addEventListener("wheel", u, { passive: false });
    });
    const O = (s) => s ? t.vertical ? "vNext" : "next" : t.vertical ? "vPrevious" : "previous", H = (s, P) => {
      if (t.transitions) {
        const te = Le(Je(S(), t.month, t.year));
        q.value = Re(Le(Je(S(), s, P)), te) ? l.value[O(true)] : l.value[O(false)], E.value = false, nextTick(() => {
          E.value = true;
        });
      }
    }, _ = computed(
      () => ({
        [t.calendarClassName]: !!t.calendarClassName
      })
    ), x = computed(() => (s) => {
      const P = $r(s);
      return {
        dp__marker_dot: P.type === "dot",
        dp__marker_line: P.type === "line"
      };
    }), Z = computed(() => (s) => ye(s, h2.value)), le = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: k.value.count > 0 && t.instance !== 0
    })), v = computed(() => (s) => t.hideOffsetDates ? s.current : true), D = async (s, P, te) => {
      var r, U;
      if (a("set-hover-date", s), (U = (r = s.marker) == null ? void 0 : r.tooltip) != null && U.length) {
        const R = Ae(p.value[P][te]);
        if (R) {
          const { width: g, height: V } = R.getBoundingClientRect();
          h2.value = s.value;
          let re = { left: `${g / 2}px` }, K = -50;
          if (await nextTick(), Q.value[0]) {
            const { left: we, width: se } = Q.value[0].getBoundingClientRect();
            we < 0 && (re = { left: "0" }, K = 0, G.value.left = `${g / 2}px`), window.innerWidth < we + se && (re = { right: "0" }, K = 0, G.value.left = `${se - g / 2}px`);
          }
          M.value = {
            bottom: `${V}px`,
            ...re,
            transform: `translateX(${K}%)`
          }, a("tooltip-open", s.marker);
        }
      }
    }, C = (s) => {
      h2.value && (h2.value = null, M.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a("tooltip-close", s.marker));
    }, j = (s) => {
      z.value.startX = s.changedTouches[0].screenX, z.value.startY = s.changedTouches[0].screenY;
    }, f = (s) => {
      z.value.endX = s.changedTouches[0].screenX, z.value.endY = s.changedTouches[0].screenY, d();
    }, F = (s) => {
      t.vertical && !t.inline && s.preventDefault();
    }, d = () => {
      const s = t.vertical ? "Y" : "X";
      Math.abs(z.value[`start${s}`] - z.value[`end${s}`]) > 10 && a("handle-swipe", z.value[`start${s}`] > z.value[`end${s}`] ? "right" : "left");
    }, w = (s, P, te) => {
      s && (Array.isArray(p.value[P]) ? p.value[P][te] = s : p.value[P] = [s]), t.arrowNavigation && o(p.value, "calendar");
    }, u = (s) => {
      t.monthChangeOnScroll && (s.preventDefault(), a("handle-scroll", s));
    }, y = (s) => {
      const P = s[0];
      return t.weekNumbers === "local" ? getWeek(P.value, { weekStartsOn: +t.weekStart }) : t.weekNumbers === "iso" ? getISOWeek(P.value) : typeof t.weekNumbers == "function" ? t.weekNumbers(P.value) : "";
    };
    return n({ triggerTransition: H }), (s, P) => {
      var te;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(le.value)
      }, [
        createBaseVNode("div", {
          ref_key: "calendarWrapRef",
          ref: T,
          role: "grid",
          class: normalizeClass(_.value),
          "aria-label": (te = unref(c)) == null ? void 0 : te.calendarWrap
        }, [
          (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createBaseVNode("div", Yl, [
              s.weekNumbers ? (openBlock(), createElementBlock("div", Bl, toDisplayString(s.weekNumName), 1)) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(A.value, (r, U) => (openBlock(), createElementBlock("div", {
                class: "dp__calendar_header_item",
                role: "gridcell",
                key: U
              }, [
                s.$slots["calendar-header"] ? renderSlot(s.$slots, "calendar-header", {
                  key: 0,
                  day: r,
                  index: U
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
                  E.value ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "dp__calendar",
                    role: "grid",
                    "aria-label": ((r = unref(c)) == null ? void 0 : r.calendarDays) || void 0
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(b.value, (U, R) => (openBlock(), createElementBlock("div", {
                      class: "dp__calendar_row",
                      role: "row",
                      key: R
                    }, [
                      s.weekNumbers ? (openBlock(), createElementBlock("div", Vl, [
                        createBaseVNode("div", Hl, toDisplayString(y(U.days)), 1)
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(U.days, (g, V) => {
                        var re, K, we;
                        return openBlock(), createElementBlock("div", {
                          role: "gridcell",
                          class: "dp__calendar_item",
                          ref_for: true,
                          ref: (se) => w(se, R, V),
                          key: V + R,
                          "aria-selected": g.classData.dp__active_date || g.classData.dp__range_start || g.classData.dp__range_start,
                          "aria-disabled": g.classData.dp__cell_disabled || void 0,
                          "aria-label": (K = (re = unref(c)) == null ? void 0 : re.day) == null ? void 0 : K.call(re, g),
                          tabindex: "0",
                          onClick: withModifiers((se) => s.$emit("select-date", g), ["stop", "prevent"]),
                          onKeydown: [
                            withKeys((se) => s.$emit("select-date", g), ["enter"]),
                            withKeys((se) => s.$emit("handle-space", g), ["space"])
                          ],
                          onMouseenter: (se) => D(g, R, V),
                          onMouseleave: (se) => C(g)
                        }, [
                          createBaseVNode("div", {
                            class: normalizeClass(["dp__cell_inner", g.classData])
                          }, [
                            s.$slots.day && v.value(g) ? renderSlot(s.$slots, "day", {
                              key: 0,
                              day: +g.text,
                              date: g.value
                            }) : createCommentVNode("", true),
                            s.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createTextVNode(toDisplayString(g.text), 1)
                            ], 64)),
                            g.marker && v.value(g) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                              s.$slots.marker ? renderSlot(s.$slots, "marker", {
                                key: 0,
                                marker: g.marker,
                                day: +g.text,
                                date: g.value
                              }) : (openBlock(), createElementBlock("div", {
                                key: 1,
                                class: normalizeClass(x.value(g.marker)),
                                style: normalizeStyle(g.marker.color ? { backgroundColor: g.marker.color } : {})
                              }, null, 6))
                            ], 64)) : createCommentVNode("", true),
                            Z.value(g.value) ? (openBlock(), createElementBlock("div", {
                              key: 3,
                              class: "dp__marker_tooltip",
                              ref_for: true,
                              ref_key: "activeTooltip",
                              ref: Q,
                              style: normalizeStyle(M.value)
                            }, [
                              (we = g.marker) != null && we.tooltip ? (openBlock(), createElementBlock("div", {
                                key: 0,
                                class: "dp__tooltip_content",
                                onClick: P[0] || (P[0] = withModifiers(() => {
                                }, ["stop"]))
                              }, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(g.marker.tooltip, (se, N) => (openBlock(), createElementBlock("div", {
                                  key: N,
                                  class: "dp__tooltip_text"
                                }, [
                                  s.$slots["marker-tooltip"] ? renderSlot(s.$slots, "marker-tooltip", {
                                    key: 0,
                                    tooltip: se,
                                    day: g.value
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
                                  style: normalizeStyle(G.value)
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
var sa = (e) => Array.isArray(e);
var Wl = (e, n, a, t) => {
  const o = ref([]), { modelValue: l, calendars: c, time: k } = Zt(e, n), { defaultedMultiCalendars: h2, defaultedStartTime: M } = Ce(e), { validateMonthYearInRange: p, isDisabled: T, isDateRangeAllowed: E, checkMinMaxRange: q } = Bt(e), { updateTimeValues: z, getSetDateTime: Q, setTime: G, assignStartTime: b, disabledTimesConfig: A } = Na(
    e,
    k,
    l,
    t
  ), O = computed(
    () => (i) => c.value[i] ? c.value[i].month : 0
  ), H = computed(
    () => (i) => c.value[i] ? c.value[i].year : 0
  ), _ = (i, B, ne) => {
    var me, De;
    c.value[i] || (c.value[i] = { month: 0, year: 0 }), c.value[i].month = ta(B) ? (me = c.value[i]) == null ? void 0 : me.month : B, c.value[i].year = ta(ne) ? (De = c.value[i]) == null ? void 0 : De.year : ne;
  }, x = () => {
    e.autoApply && n("select-date");
  };
  watch(l, (i, B) => {
    JSON.stringify(i) !== JSON.stringify(B) && v();
  }), onMounted(() => {
    e.shadow || (l.value || (s(), M.value && b(M.value)), v(true), e.focusStartDate && e.startDate && s());
  });
  const Z = computed(() => {
    var i;
    return (i = e.flow) != null && i.length && !e.partialFlow ? e.flowStep === e.flow.length : true;
  }), le = () => {
    e.autoApply && Z.value && n("auto-apply", e.partialFlow);
  }, v = (i = false) => {
    if (l.value)
      return Array.isArray(l.value) ? (o.value = l.value, d(i)) : C(l.value, i);
    if (h2.value.count && i && !e.startDate)
      return D(S(), i);
  }, D = (i, B = false) => {
    if ((!h2.value.count || !h2.value.static || B) && _(0, getMonth(i), getYear(i)), h2.value.count)
      for (let ne = 1; ne < h2.value.count; ne++) {
        const me = set(S(), { month: O.value(ne - 1), year: H.value(ne - 1) }), De = add(me, { months: 1 });
        c.value[ne] = { month: getMonth(De), year: getYear(De) };
      }
  }, C = (i, B) => {
    D(i), G("hours", getHours(i)), G("minutes", getMinutes(i)), G("seconds", getSeconds(i)), h2.value.count && B && y();
  }, j = (i) => {
    if (h2.value.count) {
      if (h2.value.solo)
        return 0;
      const B = getMonth(i[0]), ne = getMonth(i[1]);
      return Math.abs(ne - B) < h2.value.count ? 0 : 1;
    }
    return 1;
  }, f = (i, B) => {
    i[1] && e.showLastInRange ? D(i[j(i)], B) : D(i[0], B);
    const ne = (me, De) => [
      me(i[0]),
      i[1] ? me(i[1]) : k[De][1]
    ];
    G("hours", ne(getHours, "hours")), G("minutes", ne(getMinutes, "minutes")), G("seconds", ne(getSeconds, "seconds"));
  }, F = (i, B) => {
    if ((e.range || e.weekPicker) && !e.multiDates)
      return f(i, B);
    if (e.multiDates && B) {
      const ne = i[i.length - 1];
      return C(ne, B);
    }
  }, d = (i) => {
    const B = l.value;
    F(B, i), h2.value.count && h2.value.solo && y();
  }, w = (i, B) => {
    const ne = set(S(), { month: O.value(B), year: H.value(B) }), me = i < 0 ? addMonths(ne, 1) : subMonths(ne, 1);
    p(getMonth(me), getYear(me), i < 0, e.preventMinMaxNavigation) && (_(B, getMonth(me), getYear(me)), h2.value.count && !h2.value.solo && u(B), a());
  }, u = (i) => {
    for (let B = i - 1; B >= 0; B--) {
      const ne = subMonths(set(S(), { month: O.value(B + 1), year: H.value(B + 1) }), 1);
      _(B, getMonth(ne), getYear(ne));
    }
    for (let B = i + 1; B <= h2.value.count - 1; B++) {
      const ne = addMonths(set(S(), { month: O.value(B - 1), year: H.value(B - 1) }), 1);
      _(B, getMonth(ne), getYear(ne));
    }
  }, y = () => {
    if (Array.isArray(l.value) && l.value.length === 2) {
      const i = S(
        S(l.value[1] ? l.value[1] : addMonths(l.value[0], 1))
      ), [B, ne] = [getMonth(l.value[0]), getYear(l.value[0])], [me, De] = [getMonth(l.value[1]), getYear(l.value[1])];
      (B !== me || B === me && ne !== De) && h2.value.solo && _(1, getMonth(i), getYear(i));
    } else
      l.value && !Array.isArray(l.value) && (_(0, getMonth(l.value), getYear(l.value)), D(S()));
  }, s = () => {
    e.startDate && (_(0, getMonth(S(e.startDate)), getYear(S(e.startDate))), h2.value.count && u(0));
  }, P = (i, B) => {
    e.monthChangeOnScroll && w(e.monthChangeOnScroll !== "inverse" ? -i.deltaY : i.deltaY, B);
  }, te = (i, B, ne = false) => {
    e.monthChangeOnArrows && e.vertical === ne && r(i, B);
  }, r = (i, B) => {
    w(i === "right" ? -1 : 1, B);
  }, U = (i) => e.markers.find((B) => ye(aa(i.value), aa(B.date))), R = (i, B) => {
    switch (e.sixWeeks === true ? "append" : e.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [i == 0, true];
      case "fair":
        return [i == 0 || B > i, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, g = (i, B, ne, me) => {
    if (e.sixWeeks && i.length < 6) {
      const De = 6 - i.length, Qe = (B.getDay() + 7 - me) % 7, Ft = 6 - (ne.getDay() + 7 - me) % 7, [$t, rn] = R(Qe, Ft);
      for (let lt = 1; lt <= De; lt++)
        if (rn ? !!(lt % 2) == $t : $t) {
          const Vt = i[0].days[0], ln = V(addDays(Vt.value, -7), getMonth(B));
          i.unshift({ days: ln });
        } else {
          const Vt = i[i.length - 1], ln = Vt.days[Vt.days.length - 1], Ia = V(addDays(ln.value, 1), getMonth(B));
          i.push({ days: Ia });
        }
    }
    return i;
  }, V = (i, B) => {
    const ne = S(JSON.parse(JSON.stringify(i))), me = [];
    for (let De = 0; De < 7; De++) {
      const Qe = addDays(ne, De), Mt = getMonth(Qe) !== B;
      me.push({
        text: e.hideOffsetDates && Mt ? "" : Qe.getDate(),
        value: Qe,
        current: !Mt,
        classData: {}
      });
    }
    return me;
  }, re = (i, B) => {
    const ne = [], me = S(Ze(new Date(B, i), e.timezone)), De = S(Ze(new Date(B, i + 1, 0), e.timezone)), Qe = e.weekStart, Mt = startOfWeek(me, { weekStartsOn: Qe }), Ft = ($t) => {
      const rn = V($t, i);
      if (ne.push({ days: rn }), !ne[ne.length - 1].days.some(
        (lt) => ye(Le(lt.value), Le(De))
      )) {
        const lt = addDays($t, 7);
        Ft(lt);
      }
    };
    return Ft(Mt), g(ne, me, De, Qe);
  }, K = (i) => (l.value = jt(S(i.value), e.timezone, e.weekStart), le()), we = (i) => {
    const B = tt(S(i.value), k.hours, k.minutes, Et());
    e.multiDates ? Ln(B, l, e.multiDatesLimit) : l.value = B, t(), nextTick().then(() => {
      le();
    });
  }, se = (i) => e.noDisabledRange ? Ta(o.value[0], i).some((ne) => T(ne)) : false, N = () => {
    o.value = l.value ? l.value.slice() : [], o.value.length === 2 && !(e.fixedStart || e.fixedEnd) && (o.value = []);
  }, J = (i, B) => {
    const ne = [S(i.value), addDays(S(i.value), +e.autoRange)];
    E(ne) && (B && $e(i.value), o.value = ne);
  }, $e = (i) => {
    const B = getMonth(S(i)), ne = getYear(S(i));
    if (_(0, B, ne), h2.value.count > 0)
      for (let me = 1; me < h2.value.count; me++) {
        const De = Cr(
          set(S(i), { year: O.value(me - 1), month: H.value(me - 1) })
        );
        _(me, De.month, De.year);
      }
  }, X = (i) => Array.isArray(l.value) && l.value.length === 2 ? e.fixedStart && (Re(i, l.value[0]) || ye(i, l.value[0])) ? [l.value[0], i] : e.fixedEnd && (Pe(i, l.value[1]) || ye(i, l.value[1])) ? [i, l.value[1]] : (n("invalid-fixed-range", i), l.value) : [], Ve = (i) => {
    se(i.value) || !q(i.value, l.value, e.fixedStart ? 0 : 1) || (o.value = X(S(i.value)));
  }, _e = (i, B) => {
    if (N(), e.autoRange)
      return J(i, B);
    if (e.fixedStart || e.fixedEnd)
      return Ve(i);
    o.value[0] ? q(S(i.value), l.value) && !se(i.value) && (Pe(S(i.value), S(o.value[0])) ? (o.value.unshift(S(i.value)), n("range-end", o.value[0])) : (o.value[1] = S(i.value), n("range-end", o.value[1]))) : (o.value[0] = S(i.value), n("range-start", o.value[0]));
  }, Et = (i = true) => e.enableSeconds ? Array.isArray(k.seconds) ? i ? k.seconds[0] : k.seconds[1] : k.seconds : 0, Dt = (i) => {
    o.value[i] = tt(
      o.value[i],
      k.hours[i],
      k.minutes[i],
      Et(i !== 1)
    );
  }, Jt = () => {
    var i, B;
    o.value[0] && o.value[1] && +((i = o.value) == null ? void 0 : i[0]) > +((B = o.value) == null ? void 0 : B[1]) && (o.value.reverse(), n("range-start", o.value[0]), n("range-end", o.value[1]));
  }, Xt = () => {
    o.value.length && (o.value[0] && !o.value[1] ? Dt(0) : (Dt(0), Dt(1), t()), Jt(), l.value = o.value.slice(), Un(o.value, n, e.autoApply, e.modelAuto));
  }, Qt = (i, B = false) => {
    if (!(T(i.value) || !i.current && e.hideOffsetDates)) {
      if (e.weekPicker)
        return K(i);
      if (!e.range)
        return we(i);
      sa(k.hours) && sa(k.minutes) && !e.multiDates && (_e(i, B), Xt());
    }
  }, en = (i, B) => {
    _(i, B.month, B.year), h2.value.count && !h2.value.solo && u(i), n("update-month-year", { instance: i, month: B.month, year: B.year }), a(h2.value.solo ? i : void 0), t();
  }, tn = (i, B) => {
    Array.isArray(i) && i.length <= 2 && e.range ? l.value = i.map((ne) => Ze(S(ne), B ? void 0 : e.timezone)) : Array.isArray(i) || (l.value = Ze(S(i), B ? void 0 : e.timezone)), x(), e.multiCalendars && nextTick().then(() => v(true));
  }, nn = () => {
    e.range ? l.value && Array.isArray(l.value) && l.value[0] ? l.value = Pe(S(), l.value[0]) ? [S(), l.value[0]] : [l.value[0], S()] : l.value = [S()] : l.value = S(), x();
  }, an = () => {
    if (Array.isArray(l.value))
      if (e.multiDates) {
        const i = ae();
        l.value[l.value.length - 1] = Q(i);
      } else
        l.value = l.value.map((i, B) => i && Q(i, B));
    else
      l.value = Q(l.value);
    n("time-update");
  }, ae = () => Array.isArray(l.value) && l.value.length ? l.value[l.value.length - 1] : null;
  return {
    calendars: c,
    modelValue: l,
    month: O,
    year: H,
    time: k,
    disabledTimesConfig: A,
    getCalendarDays: re,
    getMarker: U,
    handleScroll: P,
    handleSwipe: r,
    handleArrow: te,
    selectDate: Qt,
    updateMonthYear: en,
    presetDate: tn,
    selectCurrentDate: nn,
    updateTime: (i, B = true, ne = false) => {
      z(i, B, ne, an);
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
    "recalculate-position",
    "update-month-year"
  ],
  setup(e, { expose: n, emit: a }) {
    const t = e, {
      calendars: o,
      month: l,
      year: c,
      modelValue: k,
      time: h2,
      disabledTimesConfig: M,
      getCalendarDays: p,
      getMarker: T,
      handleArrow: E,
      handleScroll: q,
      handleSwipe: z,
      selectDate: Q,
      updateMonthYear: G,
      presetDate: b,
      selectCurrentDate: A,
      updateTime: O
    } = Wl(t, a, u, y), H = useSlots(), { setHoverDate: _, getDayClassData: x, clearHoverDate: Z } = Zr(k, t), { defaultedMultiCalendars: le } = Ce(t), v = ref([]), D = ref([]), C = ref(null), j = je(H, "calendar"), f = je(H, "monthYear"), F = je(H, "timePicker"), d = (R) => {
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
    const w = computed(() => (R) => p(l.value(R), c.value(R)).map((g) => ({
      ...g,
      days: g.days.map((V) => (V.marker = T(V), V.classData = x(V), V))
    })));
    function u(R) {
      var g;
      R || R === 0 ? (g = D.value[R]) == null || g.triggerTransition(l.value(R), c.value(R)) : D.value.forEach((V, re) => V.triggerTransition(l.value(re), c.value(re)));
    }
    function y() {
      a("update-flow-step");
    }
    const s = (R, g = false) => {
      Q(R, g), t.spaceConfirm && a("select-date");
    };
    return n({
      clearHoverDate: Z,
      presetDate: b,
      selectCurrentDate: A,
      toggleMonthPicker: (R, g, V = 0) => {
        var re;
        (re = v.value[V]) == null || re.toggleMonthPicker(R, g);
      },
      toggleYearPicker: (R, g, V = 0) => {
        var re;
        (re = v.value[V]) == null || re.toggleYearPicker(R, g);
      },
      toggleTimePicker: (R, g, V) => {
        var re;
        (re = C.value) == null || re.toggleTimePicker(R, g, V);
      },
      handleArrow: E,
      updateMonthYear: G,
      getSidebarProps: () => ({
        modelValue: k,
        month: l,
        year: c,
        time: h2,
        updateTime: O,
        updateMonthYear: G,
        selectDate: Q,
        presetDate: b
      })
    }), (R, g) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(Hn, {
        "multi-calendars": unref(le).count
      }, {
        default: withCtx(({ instance: V, index: re }) => [
          R.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(Ol, mergeProps({
            key: 0,
            ref: (K) => {
              K && (v.value[re] = K);
            },
            months: unref(wa)(R.formatLocale, R.locale, R.monthNameFormat),
            years: unref(Fn)(R.yearRange, R.reverseYears),
            month: unref(l)(V),
            year: unref(c)(V),
            instance: V
          }, R.$props, {
            onMount: g[0] || (g[0] = (K) => d(unref(vt).header)),
            onResetFlow: g[1] || (g[1] = (K) => R.$emit("reset-flow")),
            onUpdateMonthYear: (K) => unref(G)(V, K),
            onOverlayClosed: g[2] || (g[2] = (K) => R.$emit("focus-menu"))
          }), createSlots({ _: 2 }, [
            renderList(unref(f), (K, we) => ({
              name: K,
              fn: withCtx((se) => [
                renderSlot(R.$slots, K, normalizeProps(guardReactiveProps(se)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(Ul, mergeProps({
            ref: (K) => {
              K && (D.value[re] = K);
            },
            "mapped-dates": w.value(V),
            month: unref(l)(V),
            year: unref(c)(V)
          }, R.$props, {
            onSelectDate: (K) => unref(Q)(K, V !== 1),
            onHandleSpace: (K) => s(K, V !== 1),
            onSetHoverDate: g[3] || (g[3] = (K) => unref(_)(K)),
            onHandleScroll: (K) => unref(q)(K, V),
            onHandleSwipe: (K) => unref(z)(K, V),
            onMount: g[4] || (g[4] = (K) => d(unref(vt).calendar)),
            onResetFlow: g[5] || (g[5] = (K) => R.$emit("reset-flow")),
            onTooltipOpen: g[6] || (g[6] = (K) => R.$emit("tooltip-open", K)),
            onTooltipClose: g[7] || (g[7] = (K) => R.$emit("tooltip-close", K))
          }), createSlots({ _: 2 }, [
            renderList(unref(j), (K, we) => ({
              name: K,
              fn: withCtx((se) => [
                renderSlot(R.$slots, K, normalizeProps(guardReactiveProps({ ...se })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars"]),
      R.enableTimePicker ? (openBlock(), createElementBlock("div", zl, [
        R.$slots["time-picker"] ? renderSlot(R.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(h2), updateTime: unref(O) }))) : (openBlock(), createBlock(Ra, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: C
        }, R.$props, {
          hours: unref(h2).hours,
          minutes: unref(h2).minutes,
          seconds: unref(h2).seconds,
          "internal-model-value": R.internalModelValue,
          "disabled-times-config": unref(M),
          onMount: g[8] || (g[8] = (V) => d(unref(vt).timePicker)),
          "onUpdate:hours": g[9] || (g[9] = (V) => unref(O)(V)),
          "onUpdate:minutes": g[10] || (g[10] = (V) => unref(O)(V, false)),
          "onUpdate:seconds": g[11] || (g[11] = (V) => unref(O)(V, false, true)),
          onResetFlow: g[12] || (g[12] = (V) => R.$emit("reset-flow")),
          onOverlayClosed: g[13] || (g[13] = (V) => R.$emit("time-picker-close")),
          onOverlayOpened: g[14] || (g[14] = (V) => R.$emit("time-picker-open", V)),
          onAmPmChange: g[15] || (g[15] = (V) => R.$emit("am-pm-change", V))
        }), createSlots({ _: 2 }, [
          renderList(unref(F), (V, re) => ({
            name: V,
            fn: withCtx((K) => [
              renderSlot(R.$slots, V, normalizeProps(guardReactiveProps(K)))
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
var ua = defineComponent({
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
      const { openOnTop: N, ...J } = t;
      return {
        ...J,
        flowStep: x.value
      };
    }), { setMenuFocused: l, setShiftKey: c, control: k } = Pa(), h2 = useSlots(), { defaultedTextInput: M, defaultedInline: p } = Ce(t), T = ref(null), E = ref(0), q = ref(null), z = ref(null), Q = ref(false), G = ref(null);
    onMounted(() => {
      if (!t.shadow) {
        Q.value = true, b(), window.addEventListener("resize", b);
        const N = Ae(q);
        if (N && !M.value.enabled && !p.value.enabled && (l(true), C()), N) {
          const J = ($e) => {
            t.allowPreventDefault && $e.preventDefault(), $e.stopImmediatePropagation(), $e.stopPropagation();
          };
          N.addEventListener("pointerdown", J), N.addEventListener("mousedown", J);
        }
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", b);
    });
    const b = () => {
      const N = Ae(z);
      N && (E.value = N.getBoundingClientRect().width);
    }, { arrowRight: A, arrowLeft: O, arrowDown: H, arrowUp: _ } = rt(), { flowStep: x, updateFlowStep: Z, childMount: le, resetFlow: v } = qr(t, a, G), D = computed(() => t.monthPicker ? fl : t.yearPicker ? ml : t.timePicker ? Cl : jl), C = () => {
      const N = Ae(q);
      N && N.focus({ preventScroll: true });
    }, j = computed(() => {
      var N;
      return ((N = G.value) == null ? void 0 : N.getSidebarProps()) || {};
    }), f = () => {
      t.openOnTop && a("recalculate-position");
    }, F = je(h2, "action"), d = computed(() => t.monthPicker || t.yearPicker ? je(h2, "monthYear") : t.timePicker ? je(h2, "timePicker") : je(h2, "shared")), w = computed(() => t.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), u = computed(() => ({
      dp__menu_disabled: t.disabled,
      dp__menu_readonly: t.readonly
    })), y = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !p.value.enabled,
        dp__relative: p.value.enabled,
        [t.menuClassName]: !!t.menuClassName
      })
    ), s = (N) => {
      N.stopPropagation(), N.stopImmediatePropagation();
    }, P = () => {
      t.escClose && a("close-picker");
    }, te = (N) => {
      if (t.arrowNavigation) {
        if (N === "up")
          return _();
        if (N === "down")
          return H();
        if (N === "left")
          return O();
        if (N === "right")
          return A();
      } else
        N === "left" || N === "up" ? V("handleArrow", "left", 0, N === "up") : V("handleArrow", "right", 0, N === "down");
    }, r = (N) => {
      c(N.shiftKey), !t.disableMonthYearSelect && N.code === "Tab" && N.target.classList.contains("dp__menu") && k.value.shiftKeyInMenu && (N.preventDefault(), N.stopImmediatePropagation(), a("close-picker"));
    }, U = () => {
      C(), a("time-picker-close");
    }, R = (N) => {
      var J, $e, X;
      (J = G.value) == null || J.toggleTimePicker(false, false), ($e = G.value) == null || $e.toggleMonthPicker(false, false, N), (X = G.value) == null || X.toggleYearPicker(false, false, N);
    }, g = (N, J = 0) => {
      var $e, X, Ve;
      return N === "month" ? ($e = G.value) == null ? void 0 : $e.toggleMonthPicker(false, true, J) : N === "year" ? (X = G.value) == null ? void 0 : X.toggleYearPicker(false, true, J) : N === "time" ? (Ve = G.value) == null ? void 0 : Ve.toggleTimePicker(true, false) : R(J);
    }, V = (N, ...J) => {
      var $e, X;
      ($e = G.value) != null && $e[N] && ((X = G.value) == null || X[N](...J));
    }, re = () => {
      V("selectCurrentDate");
    }, K = (N, J) => {
      V("presetDate", N, J);
    }, we = () => {
      V("clearHoverDate");
    };
    return n({
      updateMonthYear: (N, J) => {
        V("updateMonthYear", N, J);
      },
      switchView: g
    }), (N, J) => {
      var $e;
      return openBlock(), createElementBlock("div", {
        id: N.uid ? `dp-menu-${N.uid}` : void 0,
        tabindex: "0",
        ref_key: "dpMenuRef",
        ref: q,
        role: "dialog",
        class: normalizeClass(y.value),
        onMouseleave: we,
        onClick: s,
        onKeydown: [
          withKeys(P, ["esc"]),
          J[15] || (J[15] = withKeys(withModifiers((X) => te("left"), ["prevent"]), ["left"])),
          J[16] || (J[16] = withKeys(withModifiers((X) => te("up"), ["prevent"]), ["up"])),
          J[17] || (J[17] = withKeys(withModifiers((X) => te("down"), ["prevent"]), ["down"])),
          J[18] || (J[18] = withKeys(withModifiers((X) => te("right"), ["prevent"]), ["right"])),
          r
        ]
      }, [
        (N.disabled || N.readonly) && unref(p).enabled ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(u.value)
        }, null, 2)) : createCommentVNode("", true),
        !unref(p).enabled && !N.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(w.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: z,
          class: normalizeClass({
            dp__menu_content_wrapper: (($e = N.presetDates) == null ? void 0 : $e.length) || !!N.$slots["left-sidebar"] || !!N.$slots["right-sidebar"]
          }),
          style: normalizeStyle({ "--dp-menu-width": `${E.value}px` })
        }, [
          N.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", Gl, [
            renderSlot(N.$slots, "left-sidebar", normalizeProps(guardReactiveProps(j.value)))
          ])) : createCommentVNode("", true),
          N.presetDates.length ? (openBlock(), createElementBlock("div", Zl, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(N.presetDates, (X, Ve) => (openBlock(), createElementBlock("div", {
              key: Ve,
              style: normalizeStyle(X.style || {}),
              class: "dp--preset-range"
            }, [
              X.slot ? renderSlot(N.$slots, X.slot, {
                key: 0,
                presetDate: K,
                label: X.label,
                value: X.value
              }) : (openBlock(), createElementBlock("div", {
                key: 1,
                role: "button",
                tabindex: "0",
                onClick: (_e) => K(X.value, X.noTz),
                onKeydown: [
                  withKeys(withModifiers((_e) => K(X.value, X.noTz), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((_e) => K(X.value, X.noTz), ["prevent"]), ["space"])
                ]
              }, toDisplayString(X.label), 41, ql))
            ], 4))), 128))
          ])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: "dp__instance_calendar",
            ref_key: "calendarWrapperRef",
            ref: T,
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(D.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: G
            }, o.value, {
              "flow-step": unref(x),
              onMount: unref(le),
              onUpdateFlowStep: unref(Z),
              onResetFlow: unref(v),
              onFocusMenu: C,
              onSelectDate: J[0] || (J[0] = (X) => N.$emit("select-date")),
              onTooltipOpen: J[1] || (J[1] = (X) => N.$emit("tooltip-open", X)),
              onTooltipClose: J[2] || (J[2] = (X) => N.$emit("tooltip-close", X)),
              onAutoApply: J[3] || (J[3] = (X) => N.$emit("auto-apply", X)),
              onRangeStart: J[4] || (J[4] = (X) => N.$emit("range-start", X)),
              onRangeEnd: J[5] || (J[5] = (X) => N.$emit("range-end", X)),
              onInvalidFixedRange: J[6] || (J[6] = (X) => N.$emit("invalid-fixed-range", X)),
              onTimeUpdate: J[7] || (J[7] = (X) => N.$emit("time-update")),
              onAmPmChange: J[8] || (J[8] = (X) => N.$emit("am-pm-change", X)),
              onTimePickerOpen: J[9] || (J[9] = (X) => N.$emit("time-picker-open", X)),
              onTimePickerClose: U,
              onRecalculatePosition: f,
              onUpdateMonthYear: J[10] || (J[10] = (X) => N.$emit("update-month-year", X)),
              "onUpdate:internalModelValue": J[11] || (J[11] = (X) => N.$emit("update:internal-model-value", X))
            }), createSlots({ _: 2 }, [
              renderList(d.value, (X, Ve) => ({
                name: X,
                fn: withCtx((_e) => [
                  renderSlot(N.$slots, X, normalizeProps(guardReactiveProps({ ..._e })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          N.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", xl, [
            renderSlot(N.$slots, "right-sidebar", normalizeProps(guardReactiveProps(j.value)))
          ])) : createCommentVNode("", true),
          N.$slots["action-extra"] ? (openBlock(), createElementBlock("div", Jl, [
            N.$slots["action-extra"] ? renderSlot(N.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: re
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 6),
        !N.autoApply || N.keepActionRow ? (openBlock(), createBlock(al, mergeProps({
          key: 2,
          "menu-mount": Q.value
        }, o.value, {
          "calendar-width": E.value,
          onClosePicker: J[12] || (J[12] = (X) => N.$emit("close-picker")),
          onSelectDate: J[13] || (J[13] = (X) => N.$emit("select-date")),
          onInvalidSelect: J[14] || (J[14] = (X) => N.$emit("invalid-select")),
          onSelectNow: re
        }), createSlots({ _: 2 }, [
          renderList(unref(F), (X, Ve) => ({
            name: X,
            fn: withCtx((_e) => [
              renderSlot(N.$slots, X, normalizeProps(guardReactiveProps({ ..._e })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
      ], 42, Kl);
    };
  }
});
var Xl = typeof window < "u" ? window : void 0;
var pn = () => {
};
var Ql = (e) => getCurrentScope() ? (onScopeDispose(e), true) : false;
var eo = (e, n, a, t) => {
  if (!e)
    return pn;
  let o = pn;
  const l = watch(
    () => unref(e),
    (k) => {
      o(), k && (k.addEventListener(n, a, t), o = () => {
        k.removeEventListener(n, a, t), o = pn;
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
  return o ? eo(o, l, (k) => {
    const h2 = Ae(e), M = Ae(n);
    !h2 || !M || h2 === k.target || k.composedPath().includes(h2) || k.composedPath().includes(M) || a(k);
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
    const t = e, o = useSlots(), l = ref(false), c = toRef(t, "modelValue"), k = toRef(t, "timezone"), h2 = ref(null), M = ref(null), p = ref(null), T = ref(false), E = ref(null), { setMenuFocused: q, setShiftKey: z } = Pa(), { clearArrowNav: Q } = rt(), { mapDatesArrToMap: G, validateDate: b, isValidTime: A } = Bt(t), { defaultedTransitions: O, defaultedTextInput: H, defaultedInline: _ } = Ce(t), { menuTransition: x, showTransition: Z } = Yt(O);
    onMounted(() => {
      s(t.modelValue), nextTick().then(() => {
        _.value.enabled || (d(E.value).addEventListener("scroll", V), window.addEventListener("resize", re));
      }), _.value.enabled && (l.value = true);
    });
    const le = computed(() => G());
    onUnmounted(() => {
      if (!_.value.enabled) {
        const ae = d(E.value);
        ae && ae.removeEventListener("scroll", V), window.removeEventListener("resize", re);
      }
    });
    const v = je(o, "all", t.presetDates), D = je(o, "input");
    watch(
      [c, k],
      () => {
        s(c.value);
      },
      { deep: true }
    );
    const { openOnTop: C, menuStyle: j, xCorrect: f, setMenuPosition: F, getScrollableParent: d, shadowRender: w } = jr(
      h2,
      M,
      p,
      E,
      _,
      a,
      t
    ), {
      inputValue: u,
      internalModelValue: y,
      parseExternalModelValue: s,
      emitModelValue: P,
      formatInputValue: te,
      checkBeforeEmit: r
    } = Wr(a, t, T), U = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: t.dark,
        dp__theme_light: !t.dark,
        dp__flex_display: _.value.enabled,
        dp__flex_display_with_input: _.value.input
      })
    ), R = computed(() => t.dark ? "dp__theme_dark" : "dp__theme_light"), g = computed(() => t.teleport ? {
      to: typeof t.teleport == "boolean" ? "body" : t.teleport,
      disabled: _.value.enabled
    } : { class: "dp__outer_menu_wrap" }), V = () => {
      l.value && (t.closeOnScroll ? _e() : F());
    }, re = () => {
      l.value && F();
    }, K = () => {
      !t.disabled && !t.readonly && (w(ua, t), F(false), l.value = true, l.value && a("open"), l.value || Ve(), s(t.modelValue));
    }, we = () => {
      u.value = "", Ve(), a("update:model-value", null), a("update:model-timezone-value", null), a("cleared"), t.closeOnClearValue && _e();
    }, se = () => {
      const ae = y.value;
      return !ae || !Array.isArray(ae) && b(ae) ? true : Array.isArray(ae) ? ae.length === 2 && b(ae[0]) && b(ae[1]) ? true : t.partialRange && !t.timePicker ? b(ae[0]) : false : false;
    }, N = () => {
      r() && se() ? (P(), _e()) : a("invalid-select", y.value);
    }, J = (ae) => {
      $e(), P(), t.closeOnAutoApply && !ae && _e();
    }, $e = () => {
      p.value && H.value.enabled && p.value.setParsedDate(y.value);
    }, X = (ae = false) => {
      t.autoApply && A(y.value) && se() && (t.range && Array.isArray(y.value) ? (t.partialRange || y.value.length === 2) && J(ae) : J(ae));
    }, Ve = () => {
      H.value.enabled || (y.value = null);
    }, _e = () => {
      _.value.enabled || (l.value && (l.value = false, f.value = false, q(false), z(false), Q(), a("closed"), u.value && s(c.value)), Ve(), a("blur"));
    }, Et = (ae, ie) => {
      if (!ae) {
        y.value = null;
        return;
      }
      y.value = ae, ie && (N(), a("text-submit"));
    }, Dt = () => {
      t.autoApply && A(y.value) && P(), $e();
    }, Jt = () => l.value ? _e() : K(), Xt = (ae) => {
      y.value = ae;
    }, Qt = () => {
      H.value.enabled && (T.value = true, te()), a("focus");
    }, en = () => {
      H.value.enabled && (T.value = false, s(t.modelValue)), a("blur");
    }, tn = (ae) => {
      M.value && M.value.updateMonthYear(0, {
        month: ea(ae.month),
        year: ea(ae.year)
      });
    }, nn = (ae) => {
      s(ae ?? t.modelValue);
    }, an = (ae, ie) => {
      var i;
      (i = M.value) == null || i.switchView(ae, ie);
    };
    return to(
      h2,
      p,
      t.onClickOutside ? () => t.onClickOutside(se) : _e
    ), n({
      closeMenu: _e,
      selectDate: N,
      clearValue: we,
      openMenu: K,
      onScroll: V,
      formatInputValue: te,
      // exposed for testing purposes
      updateInternalModelValue: Xt,
      // modify internal modelValue
      setMonthYear: tn,
      parseModel: nn,
      switchView: an
    }), (ae, ie) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(U.value),
      ref_key: "pickerWrapperRef",
      ref: E
    }, [
      createVNode(Qr, mergeProps({
        ref_key: "inputRef",
        ref: p,
        "is-menu-open": l.value,
        "input-value": unref(u),
        "onUpdate:inputValue": ie[0] || (ie[0] = (i) => isRef(u) ? u.value = i : null)
      }, ae.$props, {
        onClear: we,
        onOpen: K,
        onSetInputDate: Et,
        onSetEmptyDate: unref(P),
        onSelectDate: N,
        onToggle: Jt,
        onClose: _e,
        onFocus: Qt,
        onBlur: en,
        onRealBlur: ie[1] || (ie[1] = (i) => T.value = false)
      }), createSlots({ _: 2 }, [
        renderList(unref(D), (i, B) => ({
          name: i,
          fn: withCtx((ne) => [
            renderSlot(ae.$slots, i, normalizeProps(guardReactiveProps(ne)))
          ])
        }))
      ]), 1040, ["is-menu-open", "input-value", "onSetEmptyDate"]),
      createVNode(Transition, {
        name: unref(x)(unref(C)),
        css: unref(Z) && !unref(_).enabled
      }, {
        default: withCtx(() => [
          l.value ? (openBlock(), createBlock(resolveDynamicComponent(ae.teleport ? Teleport : "div"), mergeProps({
            key: 0,
            ref_key: "dpWrapMenuRef",
            ref: h2
          }, g.value, {
            class: { "dp--menu-wrapper": !unref(_).enabled },
            style: unref(_).enabled ? void 0 : unref(j)
          }), {
            default: withCtx(() => [
              createVNode(ua, mergeProps({
                ref_key: "dpMenuRef",
                ref: M,
                class: { [R.value]: true, "dp--menu-wrapper": ae.teleport },
                style: ae.teleport ? unref(j) : void 0,
                "open-on-top": unref(C),
                "arr-map-values": le.value
              }, ae.$props, {
                "internal-model-value": unref(y),
                "onUpdate:internalModelValue": ie[2] || (ie[2] = (i) => isRef(y) ? y.value = i : null),
                onClosePicker: _e,
                onSelectDate: N,
                onAutoApply: X,
                onTimeUpdate: Dt,
                onFlowStep: ie[3] || (ie[3] = (i) => ae.$emit("flow-step", i)),
                onUpdateMonthYear: ie[4] || (ie[4] = (i) => ae.$emit("update-month-year", i)),
                onInvalidSelect: ie[5] || (ie[5] = (i) => ae.$emit("invalid-select", unref(y))),
                onInvalidFixedRange: ie[6] || (ie[6] = (i) => ae.$emit("invalid-fixed-range", i)),
                onRecalculatePosition: unref(F),
                onTooltipOpen: ie[7] || (ie[7] = (i) => ae.$emit("tooltip-open", i)),
                onTooltipClose: ie[8] || (ie[8] = (i) => ae.$emit("tooltip-close", i)),
                onTimePickerOpen: ie[9] || (ie[9] = (i) => ae.$emit("time-picker-open", i)),
                onTimePickerClose: ie[10] || (ie[10] = (i) => ae.$emit("time-picker-close", i)),
                onAmPmChange: ie[11] || (ie[11] = (i) => ae.$emit("am-pm-change", i)),
                onRangeStart: ie[12] || (ie[12] = (i) => ae.$emit("range-start", i)),
                onRangeEnd: ie[13] || (ie[13] = (i) => ae.$emit("range-end", i))
              }), createSlots({ _: 2 }, [
                renderList(unref(v), (i, B) => ({
                  name: i,
                  fn: withCtx((ne) => [
                    renderSlot(ae.$slots, i, normalizeProps(guardReactiveProps({ ...ne })))
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
var Oa = (() => {
  const e = no;
  return e.install = (n) => {
    n.component("Vue3DatePicker", e);
  }, e;
})();
var ao = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Oa
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(ao).forEach(([e, n]) => {
  e !== "default" && (Oa[e] = n);
});

export {
  Oa
};
//# sourceMappingURL=chunk-BSHFXHEN.js.map
