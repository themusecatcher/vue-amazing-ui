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
} from "./chunk-JSJ3TUJW.js";

// node_modules/.pnpm/@vuepic+vue-datepicker@6.0.1_vue@3.3.4/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
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
var xa = pa.exports;
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
var Ja = kn.exports;
var Xa = Yn(Ja);
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
var Qa = wn.exports;
var jn = Yn(Qa);
function er(e, n) {
  var a = rr(n);
  return a.formatToParts ? nr(a, e) : ar(a, e);
}
var tr = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function nr(e, n) {
  try {
    for (var a = e.formatToParts(n), t = [], o = 0; o < a.length; o++) {
      var l = tr[a[o].type];
      l >= 0 && (t[l] = parseInt(a[o].value, 10));
    }
    return t;
  } catch (c) {
    if (c instanceof RangeError)
      return [NaN];
    throw c;
  }
}
function ar(e, n) {
  var a = e.format(n).replace(/\u200E/g, ""), t = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(a);
  return [t[3], t[1], t[2], t[4], t[5], t[6]];
}
var on = {};
function rr(e) {
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
  var b = /* @__PURE__ */ new Date(0);
  return b.setUTCFullYear(e, n, a), b.setUTCHours(t, o, l, c), b;
}
var Kn = 36e5;
var lr = 6e4;
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
    return Gn(l, c) ? (o = Math.abs(l) * Kn + c * lr, l > 0 ? -o : o) : NaN;
  }
  if (ur(e)) {
    n = new Date(n || Date.now());
    var b = a ? n : or(n), p = Dn(b, e), M = a ? p : sr(n, p, e);
    return -M;
  }
  return NaN;
}
function or(e) {
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
  var a = er(e, n), t = Bn(
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
function sr(e, n, a) {
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
function ur(e) {
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
var ir = 2;
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
  timeZone: ba
};
function Mn(e, n) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e === null)
    return /* @__PURE__ */ new Date(NaN);
  var a = n || {}, t = a.additionalDigits == null ? ir : Xa(a.additionalDigits);
  if (t !== 2 && t !== 1 && t !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]")
    return new Date(e.getTime());
  if (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]")
    return new Date(e);
  if (!(typeof e == "string" || Object.prototype.toString.call(e) === "[object String]"))
    return /* @__PURE__ */ new Date(NaN);
  var o = dr(e), l = cr(o.date, t), c = l.year, b = l.restDateString, p = fr(b, c);
  if (isNaN(p))
    return /* @__PURE__ */ new Date(NaN);
  if (p) {
    var M = p.getTime(), k = 0, T;
    if (o.time && (k = vr(o.time), isNaN(k)))
      return /* @__PURE__ */ new Date(NaN);
    if (o.timeZone || a.timeZone) {
      if (T = En(o.timeZone || a.timeZone, new Date(M + k)), isNaN(T))
        return /* @__PURE__ */ new Date(NaN);
    } else
      T = jn(new Date(M + k)), T = jn(new Date(M + k + T));
    return new Date(M + k + T);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function dr(e) {
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
function fr(e, n) {
  if (n === null)
    return null;
  var a, t, o, l;
  if (e.length === 0)
    return t = /* @__PURE__ */ new Date(0), t.setUTCFullYear(n), t;
  if (a = Ye.MM.exec(e), a)
    return t = /* @__PURE__ */ new Date(0), o = parseInt(a[1], 10) - 1, Jn(n, o) ? (t.setUTCFullYear(n, o), t) : /* @__PURE__ */ new Date(NaN);
  if (a = Ye.DDD.exec(e), a) {
    t = /* @__PURE__ */ new Date(0);
    var c = parseInt(a[1], 10);
    return yr(n, c) ? (t.setUTCFullYear(n, 0, c), t) : /* @__PURE__ */ new Date(NaN);
  }
  if (a = Ye.MMDD.exec(e), a) {
    t = /* @__PURE__ */ new Date(0), o = parseInt(a[1], 10) - 1;
    var b = parseInt(a[2], 10);
    return Jn(n, o, b) ? (t.setUTCFullYear(n, o, b), t) : /* @__PURE__ */ new Date(NaN);
  }
  if (a = Ye.Www.exec(e), a)
    return l = parseInt(a[1], 10) - 1, Xn(n, l) ? xn(n, l) : /* @__PURE__ */ new Date(NaN);
  if (a = Ye.WwwD.exec(e), a) {
    l = parseInt(a[1], 10) - 1;
    var p = parseInt(a[2], 10) - 1;
    return Xn(n, l, p) ? xn(n, l, p) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function vr(e) {
  var n, a, t;
  if (n = Ye.HH.exec(e), n)
    return a = parseFloat(n[1].replace(",", ".")), dn(a) ? a % 24 * un : NaN;
  if (n = Ye.HHMM.exec(e), n)
    return a = parseInt(n[1], 10), t = parseFloat(n[2].replace(",", ".")), dn(a, t) ? a % 24 * un + t * qn : NaN;
  if (n = Ye.HHMMSS.exec(e), n) {
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
var mr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var gr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
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
    if (t && a > gr[n] || !t && a > mr[n])
      return false;
  }
  return true;
}
function yr(e, n) {
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
var hr = Tn.exports;
(function(e, n) {
  var a = xa.default;
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = o;
  var t = a(hr);
  function o(l) {
    return (0, t.default)({}, l);
  }
  e.exports = n.default;
})($n, $n.exports);
var pr = $n.exports;
var br = Yn(pr);
function kr(e, n, a) {
  var t = Mn(e, a), o = En(n, t, true), l = new Date(t.getTime() - o), c = /* @__PURE__ */ new Date(0);
  return c.setFullYear(l.getUTCFullYear(), l.getUTCMonth(), l.getUTCDate()), c.setHours(l.getUTCHours(), l.getUTCMinutes(), l.getUTCSeconds(), l.getUTCMilliseconds()), c;
}
function wr(e, n, a) {
  if (typeof e == "string" && !e.match(ba)) {
    var t = br(a);
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
function Dr(e) {
  return (n) => format(/* @__PURE__ */ new Date(`2017-01-0${n}T00:00:00+00:00`), "EEEEEE", { locale: e });
}
var Mr = (e, n, a) => {
  const t = [1, 2, 3, 4, 5, 6, 7];
  let o;
  if (e !== null)
    try {
      o = t.map(Dr(e));
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
      return t.map((c, b) => {
        const p = format(c, l, { locale: e });
        return {
          text: p.charAt(0).toUpperCase() + p.substring(1),
          value: b
        };
      });
    } catch {
    }
  const o = new Intl.DateTimeFormat(n, { month: a, timeZone: "UTC" });
  return t.map((l, c) => {
    const b = o.format(l);
    return {
      text: b.charAt(0).toUpperCase() + b.substring(1),
      value: c
    };
  });
};
var $r = (e) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e];
var Ae = (e) => {
  const n = unref(e);
  return n != null && n.$el ? n == null ? void 0 : n.$el : n;
};
var Tr = (e) => Object.assign({ type: "dot" }, e);
var Da = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : false;
var Gt = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
};
var Te = (e) => e;
var ea = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e;
var ta = (e) => e === null;
var Ar = (e) => {
  if (e)
    return [...e.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var _r = (e) => {
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
var bt = (e, n) => _r(e).map((a) => a.map((t) => {
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
var Sr = (e, n, a, t, o) => {
  const l = Array.isArray(a) ? a[0] : a;
  if (typeof n == "string")
    return na(e, n, l, t, o);
  if (Array.isArray(n)) {
    let c = null;
    for (const b of n)
      if (c = na(e, b, l, t, o), c)
        break;
    return c;
  }
  return typeof n == "function" ? n(e) : null;
};
var S = (e) => e ? new Date(e) : /* @__PURE__ */ new Date();
var Pr = (e, n, a) => {
  if (n) {
    const o = (e.getMonth() + 1).toString().padStart(2, "0"), l = e.getDate().toString().padStart(2, "0"), c = e.getHours().toString().padStart(2, "0"), b = e.getMinutes().toString().padStart(2, "0"), p = a ? e.getSeconds().toString().padStart(2, "0") : "00";
    return `${e.getFullYear()}-${o}-${l}T${c}:${b}:${p}.000Z`;
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
var Vn = (e, n, a) => e != null && e[0] && (e != null && e[1]) ? Ne(a, e[0]) && Pe(a, e[1]) : e != null && e[0] && n ? Ne(a, e[0]) && Pe(a, n) || Pe(a, e[0]) && Ne(a, n) : false;
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
var Ze = (e, n) => n ? kr(e, n) : e;
var Cr = (e, n) => n ? wr(e, n) : e;
var aa = (e) => e instanceof Date ? e : parseISO(e);
var Ta = (e, n) => {
  const a = Ne(e, n) ? n : e, t = Ne(n, e) ? n : e;
  return eachDayOfInterval({ start: a, end: t });
};
var Rr = (e) => {
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
  return o ? !Or(...c, n) : !Nr(...c, a);
};
var Nr = (e, n, a) => Pe(...et(a, e, n)) || ye(...et(a, e, n));
var Or = (e, n, a) => Ne(...et(a, e, n)) || ye(...et(a, e, n));
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
var Ir = (e) => set(S(), {
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
  const l = e ? Ir(e) : S(n);
  return Array.isArray(t) ? fn(t[0], l, a, !!n) && fn(t[1], l, a, !!n) && o : fn(t, l, a, !!n) && o;
};
var vn = (e) => set(S(), ft(e));
var Yr = (e, n) => Array.isArray(e) ? e.map((a) => S(a)).filter((a) => getYear(S(a)) === n).map((a) => getMonth(a)) : [];
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
var Oe = ref(0);
var Se = ref(0);
var rt = () => {
  const e = computed(() => Lt.value ? [...be.selectionGrid, be.actionRow].filter((y) => y.length) : gn.value ? [
    ...be.timePicker[0],
    ...be.timePicker[1],
    hn.value ? [] : [mn.value],
    be.actionRow
  ].filter((y) => y.length) : yn.value ? [...be.monthPicker, be.actionRow] : [be.monthYear, ...be.calendar, be.time, be.actionRow].filter((y) => y.length)), n = (y) => {
    Oe.value = y ? Oe.value + 1 : Oe.value - 1;
    let N = null;
    e.value[Se.value] && (N = e.value[Se.value][Oe.value]), N || (Oe.value = y ? Oe.value - 1 : Oe.value + 1);
  }, a = (y) => {
    if (Se.value === 0 && !y || Se.value === e.value.length && y)
      return;
    Se.value = y ? Se.value + 1 : Se.value - 1, e.value[Se.value] ? e.value[Se.value] && !e.value[Se.value][Oe.value] && Oe.value !== 0 && (Oe.value = e.value[Se.value].length - 1) : Se.value = y ? Se.value - 1 : Se.value + 1;
  }, t = (y) => {
    let N = null;
    e.value[Se.value] && (N = e.value[Se.value][Oe.value]), N ? N.focus({ preventScroll: !Lt.value }) : Oe.value = y ? Oe.value - 1 : Oe.value + 1;
  }, o = () => {
    n(true), t(true);
  }, l = () => {
    n(false), t(false);
  }, c = () => {
    a(false), t(true);
  }, b = () => {
    a(true), t(true);
  }, p = (y, N) => {
    be[N] = y;
  }, M = (y, N) => {
    be[N] = y;
  }, k = () => {
    Oe.value = 0, Se.value = 0;
  };
  return {
    buildMatrix: p,
    buildMultiLevelMatrix: M,
    setTimePickerBackRef: (y) => {
      mn.value = y;
    },
    setSelectionGrid: (y) => {
      Lt.value = y, k(), y || (be.selectionGrid = []);
    },
    setTimePicker: (y, N = false) => {
      gn.value = y, hn.value = N, k(), y || (be.timePicker[0] = [], be.timePicker[1] = []);
    },
    setTimePickerElements: (y, N = 0) => {
      be.timePicker[N] = y;
    },
    arrowRight: o,
    arrowLeft: l,
    arrowUp: c,
    arrowDown: b,
    clearArrowNav: () => {
      be.monthYear = [], be.calendar = [], be.time = [], be.actionRow = [], be.selectionGrid = [], be.timePicker[0] = [], be.timePicker[1] = [], Lt.value = false, gn.value = false, hn.value = false, yn.value = false, k(), mn.value = null;
    },
    setMonthPicker: (y) => {
      yn.value = y, k();
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
var Br = (e) => ({
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
var Er = (e) => {
  const n = typeof e == "object" && e, a = {
    static: true,
    solo: false
  };
  if (!e)
    return { ...a, count: oa(false) };
  const t = n ? e : {}, o = n ? t.count ?? true : e, l = oa(o);
  return Object.assign(a, t, { count: l });
};
var Fr = (e, n, a) => e || (typeof a == "string" ? a : n);
var Vr = (e) => typeof e == "boolean" ? e ? la({}) : false : la(e);
var Hr = (e) => {
  const n = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: true,
    rangeSeparator: " - "
  };
  return typeof e == "object" ? { ...n, ...e ?? {}, enabled: true } : { ...n, enabled: e };
};
var Lr = (e) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...e ?? {}
});
var Ur = (e) => ({
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  ...e ?? {}
});
var Wr = (e) => {
  const n = { input: false };
  return typeof e == "object" ? { ...n, ...e ?? {}, enabled: true } : {
    enabled: e,
    ...n
  };
};
var Ce = (e) => {
  const n = () => {
    const j = e.enableSeconds ? ":ss" : "";
    return e.is24 ? `HH:mm${j}` : `hh:mm${j} aa`;
  }, a = () => e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? n() : e.weekPicker ? "MM/dd/yyyy" : e.yearPicker ? "yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${n()}` : "MM/dd/yyyy", t = (j) => Aa(j, e.enableSeconds), o = () => e.range ? e.startTime && Array.isArray(e.startTime) ? [t(e.startTime[0]), t(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? t(e.startTime) : null, l = computed(() => Er(e.multiCalendars)), c = computed(() => o()), b = computed(() => Br(e.ariaLabels)), p = computed(() => Lr(e.filters)), M = computed(() => Vr(e.transitions)), k = computed(() => Ur(e.actionRow)), T = computed(
    () => Fr(e.previewFormat, e.format, a())
  ), Y = computed(() => Hr(e.textInput)), q = computed(() => Wr(e.inline));
  return {
    defaultedTransitions: M,
    defaultedMultiCalendars: l,
    defaultedStartTime: c,
    defaultedAriaLabels: b,
    defaultedFilters: p,
    defaultedActionRow: k,
    defaultedPreviewFormat: T,
    defaultedTextInput: Y,
    defaultedInline: q,
    getDefaultPattern: a,
    getDefaultStartTime: o
  };
};
var zr = (e, n, a) => {
  const t = ref(), { defaultedTextInput: o, getDefaultPattern: l } = Ce(n), c = ref(""), b = toRef(n, "format");
  watch(t, () => {
    e("internal-model-change", t.value);
  }), watch(b, () => {
    E();
  });
  const p = (r) => Cr(r, n.timezone), M = (r) => Ze(r, n.timezone), k = (r, L) => Sa(
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
  ) : setYear(S(), +r), j = (r, L) => (typeof r == "string" || typeof r == "number") && n.modelType ? d(r) : L, Q = (r) => Array.isArray(r) ? [
    j(
      r[0],
      tt(null, +r[0].hours, +r[0].minutes, r[0].seconds)
    ),
    j(
      r[1],
      tt(null, +r[1].hours, +r[1].minutes, r[1].seconds)
    )
  ] : j(r, tt(null, r.hours, r.minutes, r.seconds)), B = (r) => Array.isArray(r) ? n.multiDates ? r.map((L) => j(L, Je(null, +L.month, +L.year))) : Ht(
    () => [
      j(r[0], Je(null, +r[0].month, +r[0].year)),
      j(
        r[1],
        r[1] ? Je(null, +r[1].month, +r[1].year) : gt(n.partialRange)
      )
    ],
    n.range
  ) : j(r, Je(null, +r.month, +r.year)), y = (r) => {
    if (Array.isArray(r))
      return r.map((L) => d(L));
    throw new Error(Gt.dateArr("multi-dates"));
  }, N = (r) => {
    if (Array.isArray(r))
      return [S(r[0]), S(r[1])];
    throw new Error(Gt.dateArr("week-picker"));
  }, U = (r) => n.modelAuto ? Array.isArray(r) ? [d(r[0]), d(r[1])] : n.autoApply ? [d(r)] : [d(r), null] : Array.isArray(r) ? Ht(
    () => [
      d(r[0]),
      r[1] ? d(r[1]) : gt(n.partialRange)
    ],
    n.range
  ) : d(r), W = () => {
    Array.isArray(t.value) && n.range && t.value.length === 1 && t.value.push(gt(n.partialRange));
  }, A = () => {
    const r = t.value;
    return [
      w(r[0]),
      r[1] ? w(r[1]) : gt(n.partialRange)
    ];
  }, x = () => t.value[1] ? A() : w(Te(t.value[0])), Z = () => (t.value || []).map((r) => w(r)), le = () => (W(), n.modelAuto ? x() : n.multiDates ? Z() : Array.isArray(t.value) ? Ht(() => A(), n.range) : w(Te(t.value))), v = (r) => !r || Array.isArray(r) && !r.length ? null : n.timePicker ? Q(Te(r)) : n.monthPicker ? B(Te(r)) : n.yearPicker ? q(Te(r)) : n.multiDates ? y(Te(r)) : n.weekPicker ? N(Te(r)) : U(Te(r)), D = (r) => {
    const L = v(r);
    An(Te(L)) ? (t.value = Te(L), E()) : (t.value = null, c.value = "");
  }, P = () => {
    const r = (L) => format(L, o.value.format);
    return `${r(t.value[0])} ${o.value.rangeSeparator} ${t.value[1] ? r(t.value[1]) : ""}`;
  }, K = () => a.value && t.value ? Array.isArray(t.value) ? P() : format(t.value, o.value.format) : k(t.value), f = () => t.value ? n.multiDates ? t.value.map((r) => k(r)).join("; ") : o.value.enabled && typeof o.value.format == "string" ? K() : k(t.value) : "", E = () => {
    !n.format || typeof n.format == "string" || o.value.enabled && typeof o.value.format == "string" ? c.value = f() : c.value = n.format(t.value);
  }, d = (r) => {
    if (n.utc) {
      const L = new Date(r);
      return n.utc === "preserve" ? new Date(L.getTime() + L.getTimezoneOffset() * 6e4) : L;
    }
    return n.modelType ? n.modelType === "date" || n.modelType === "timestamp" ? M(new Date(r)) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? parse(r, l(), /* @__PURE__ */ new Date()) : M(parse(r, n.modelType, /* @__PURE__ */ new Date())) : M(new Date(r));
  }, w = (r) => r ? n.utc ? Pr(r, n.utc === "preserve", n.enableSeconds) : n.modelType ? n.modelType === "timestamp" ? +p(r) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? k(p(r)) : k(p(r), n.modelType) : p(r) : "", u = (r, L = false) => {
    if (e("update:model-value", r), n.emitTimezone && L) {
      const C = Array.isArray(r) ? r.map((g) => Ze(Te(g)), n.emitTimezone) : Ze(Te(r), n.emitTimezone);
      e("update:model-timezone-value", C);
    }
  }, h2 = (r) => Array.isArray(t.value) ? n.multiDates ? t.value.map((L) => r(L)) : [
    r(t.value[0]),
    t.value[1] ? r(t.value[1]) : gt(n.partialRange)
  ] : r(Te(t.value)), s = (r) => u(Te(h2(r)));
  return {
    inputValue: c,
    internalModelValue: t,
    checkBeforeEmit: () => t.value ? n.range ? n.partialRange ? t.value.length >= 1 : t.value.length === 2 : !!t.value : false,
    parseExternalModelValue: D,
    formatInputValue: E,
    emitModelValue: () => (E(), n.monthPicker ? s(Y) : n.timePicker ? s(T) : n.yearPicker ? s(getYear) : n.weekPicker ? u(t.value, true) : u(le(), true))
  };
};
var jr = (e, n) => {
  const { defaultedFilters: a } = Ce(e), { validateMonthYearInRange: t } = Bt(e), o = (M, k) => {
    let T = M;
    return a.value.months.includes(getMonth(T)) ? (T = k ? addMonths(M, 1) : subMonths(M, 1), o(T, k)) : T;
  }, l = (M, k) => {
    let T = M;
    return a.value.years.includes(getYear(T)) ? (T = k ? addYears(M, 1) : subYears(M, 1), l(T, k)) : T;
  }, c = (M) => {
    const k = set(/* @__PURE__ */ new Date(), { month: e.month, year: e.year });
    let T = M ? addMonths(k, 1) : subMonths(k, 1);
    e.disableYearSelect && (T = setYear(T, e.year));
    let Y = getMonth(T), q = getYear(T);
    a.value.months.includes(Y) && (T = o(T, M), Y = getMonth(T), q = getYear(T)), a.value.years.includes(q) && (T = l(T, M), q = getYear(T)), t(Y, q, M, e.preventMinMaxNavigation) && b(Y, q);
  }, b = (M, k) => {
    n("update-month-year", { month: M, year: k });
  }, p = computed(() => (M) => _a(
    set(/* @__PURE__ */ new Date(), { month: e.month, year: e.year }),
    e.maxDate,
    e.minDate,
    e.preventMinMaxNavigation,
    M
  ));
  return { handleMonthYearChange: c, isDisabled: p, updateMonthYear: b };
};
var yt = ((e) => (e.center = "center", e.left = "left", e.right = "right", e))(yt || {});
var We = ((e) => (e.month = "month", e.year = "year", e))(We || {});
var st = ((e) => (e.top = "top", e.bottom = "bottom", e))(st || {});
var vt = ((e) => (e.header = "header", e.calendar = "calendar", e.timePicker = "timePicker", e))(vt || {});
var Kr = (e, n, a, t, o, l, c) => {
  const b = ref({}), p = ref(false), M = ref({
    top: "0",
    left: "0"
  }), k = ref(false), T = toRef(c, "teleportCenter");
  watch(T, () => {
    M.value = JSON.parse(JSON.stringify({})), U();
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
    M.value.left = `${d + w - b.value.width}px`;
  }, j = (d) => {
    M.value.left = `${d}px`;
  }, Q = (d, w) => {
    c.position === yt.left && j(d), c.position === yt.right && q(d, w), c.position === yt.center && (M.value.left = `${d + w / 2 - b.value.width / 2}px`);
  }, B = (d) => {
    const { width: w, height: u } = d.getBoundingClientRect(), { top: h2, left: s } = c.altPosition ? c.altPosition(d) : Y(d);
    return { top: +h2, left: +s, width: w, height: u };
  }, y = () => {
    M.value.left = "50%", M.value.top = "50%", M.value.transform = "translate(-50%, -50%)", M.value.position = "fixed", delete M.value.opacity;
  }, N = () => {
    const d = Ae(a), { top: w, left: u, transform: h2 } = c.altPosition(d);
    M.value = { top: `${w}px`, left: `${u}px`, transform: h2 ?? "" };
  }, U = (d = true) => {
    var w;
    if (!o.value.enabled) {
      if (T.value)
        return y();
      if (c.altPosition !== null)
        return N();
      if (d) {
        const u = c.teleport ? (w = n.value) == null ? void 0 : w.$el : e.value;
        u && (b.value = u.getBoundingClientRect()), l("recalculate-position");
      }
      return D();
    }
  }, W = ({ inputEl: d, left: w, width: u }) => {
    window.screen.width > 768 && !p.value && Q(w, u), Z(d);
  }, A = (d) => {
    const { top: w, left: u, height: h2, width: s } = B(d);
    M.value.top = `${h2 + w + +c.offset}px`, k.value = false, p.value || (M.value.left = `${u + s / 2 - b.value.width / 2}px`), W({ inputEl: d, left: u, width: s });
  }, x = (d) => {
    const { top: w, left: u, width: h2 } = B(d);
    M.value.top = `${w - +c.offset - b.value.height}px`, k.value = true, W({ inputEl: d, left: u, width: h2 });
  }, Z = (d) => {
    if (c.autoPosition) {
      const { left: w, width: u } = B(d), { left: h2, right: s } = b.value;
      if (!p.value) {
        if (Math.abs(h2) !== Math.abs(s)) {
          if (h2 <= 0)
            return p.value = true, j(w);
          if (s >= document.documentElement.clientWidth)
            return p.value = true, q(w, u);
        }
        return Q(w, u);
      }
    }
  }, le = () => {
    const d = Ae(a);
    if (d) {
      const { height: w } = b.value, { top: u, height: h2 } = d.getBoundingClientRect(), _ = window.innerHeight - u - h2, te = u;
      return w <= _ ? st.bottom : w > _ && w <= te ? st.top : _ >= te ? st.bottom : st.top;
    }
    return st.bottom;
  }, v = (d) => le() === st.bottom ? A(d) : x(d), D = () => {
    const d = Ae(a);
    if (d)
      return c.autoPosition ? v(d) : A(d);
  }, P = function(d) {
    if (d) {
      const w = d.scrollHeight > d.clientHeight, h2 = window.getComputedStyle(d).overflowY.indexOf("hidden") !== -1;
      return w && !h2;
    }
    return true;
  }, K = function(d) {
    return !d || d === document.body || d.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : P(d) ? d : K(d.parentNode);
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
    openOnTop: k,
    menuStyle: M,
    xCorrect: p,
    setMenuPosition: U,
    getScrollableParent: K,
    shadowRender: (d, w) => {
      var L, C, g;
      const u = document.createElement("div"), h2 = (L = Ae(a)) == null ? void 0 : L.getBoundingClientRect();
      u.setAttribute("id", "dp--temp-container");
      const s = (C = t.value) != null && C.clientWidth ? t.value : document.body;
      s.append(u);
      const _ = document.getElementById("dp--temp-container"), te = f(h2), r = h(d, {
        ...w,
        shadow: true,
        style: { opacity: 0, position: "absolute", ...te }
      });
      render(r, _), b.value = (g = r.el) == null ? void 0 : g.getBoundingClientRect(), render(null, _), s.removeChild(_);
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
var Gr = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var Zr = {
  all: () => ot,
  monthYear: () => ot.filter((e) => e.use.includes("month-year")),
  input: () => Gr,
  timePicker: () => ot.filter((e) => e.use.includes("time")),
  action: () => ot.filter((e) => e.use.includes("action")),
  calendar: () => ot.filter((e) => e.use.includes("calendar")),
  menu: () => ot.filter((e) => e.use.includes("menu")),
  shared: () => ot.filter((e) => e.use.includes("shared"))
};
var je = (e, n, a) => {
  const t = [];
  return Zr[n]().forEach((o) => {
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
    set: (b) => {
      !e.readonly && !e.disabled && n("update:internal-model-value", b);
    }
  }), l = computed(
    () => (b) => a.value[b] ? a.value[b].month : 0
  ), c = computed(
    () => (b) => a.value[b] ? a.value[b].year : 0
  );
  return {
    calendars: a,
    time: t,
    modelValue: o,
    month: l,
    year: c
  };
};
var qr = (e, n) => {
  const { defaultedMultiCalendars: a } = Ce(n), { isDisabled: t, matchDate: o } = Bt(n), l = ref(null), c = ref(S()), b = (s) => {
    !s.current && n.hideOffsetDates || (l.value = s.value);
  }, p = () => {
    l.value = null;
  }, M = (s) => Array.isArray(e.value) && n.range && e.value[0] && l.value ? s ? Ne(l.value, e.value[0]) : Pe(l.value, e.value[0]) : true, k = (s, _) => {
    const te = () => e.value ? _ ? e.value[0] || null : e.value[1] : null, r = e.value && Array.isArray(e.value) ? te() : null;
    return ye(S(s.value), r);
  }, T = (s) => {
    const _ = Array.isArray(e.value) ? e.value[0] : null;
    return s ? !Pe(l.value ?? null, _) : true;
  }, Y = (s, _ = true) => (n.range || n.weekPicker) && Array.isArray(e.value) && e.value.length === 2 ? n.hideOffsetDates && !s.current ? false : ye(S(s.value), e.value[_ ? 0 : 1]) : n.range ? k(s, _) && T(_) || ye(s.value, Array.isArray(e.value) ? e.value[0] : null) && M(_) : false, q = (s, _, te) => Array.isArray(e.value) && e.value[0] && e.value.length === 1 ? s ? false : te ? Ne(e.value[0], _.value) : Pe(e.value[0], _.value) : false, j = (s) => !e.value || n.hideOffsetDates && !s.current ? false : n.range ? n.modelAuto && Array.isArray(e.value) ? ye(s.value, e.value[0] ? e.value[0] : c.value) : false : n.multiDates && Array.isArray(e.value) ? e.value.some((_) => ye(_, s.value)) : ye(s.value, e.value ? e.value : c.value), Q = (s) => {
    if (n.autoRange || n.weekPicker) {
      if (l.value) {
        if (n.hideOffsetDates && !s.current)
          return false;
        const _ = addDays(l.value, +n.autoRange), te = jt(S(l.value), n.timezone, n.weekStart);
        return n.weekPicker ? ye(te[1], S(s.value)) : ye(_, S(s.value));
      }
      return false;
    }
    return false;
  }, B = (s) => {
    if (n.autoRange || n.weekPicker) {
      if (l.value) {
        const _ = addDays(l.value, +n.autoRange);
        if (n.hideOffsetDates && !s.current)
          return false;
        const te = jt(S(l.value), n.timezone, n.weekStart);
        return n.weekPicker ? Ne(s.value, te[0]) && Pe(s.value, te[1]) : Ne(s.value, l.value) && Pe(s.value, _);
      }
      return false;
    }
    return false;
  }, y = (s) => {
    if (n.autoRange || n.weekPicker) {
      if (l.value) {
        if (n.hideOffsetDates && !s.current)
          return false;
        const _ = jt(S(l.value), n.timezone, n.weekStart);
        return n.weekPicker ? ye(_[0], s.value) : ye(l.value, s.value);
      }
      return false;
    }
    return false;
  }, N = (s) => Vn(e.value, l.value, s.value), U = () => n.modelAuto && Array.isArray(n.internalModelValue) ? !!n.internalModelValue[0] : false, W = () => n.modelAuto ? Da(n.internalModelValue) : true, A = (s) => {
    if (Array.isArray(e.value) && e.value.length || n.weekPicker)
      return false;
    const _ = n.range ? !Y(s) && !Y(s, false) : true;
    return !t(s.value) && !j(s) && !(!s.current && n.hideOffsetDates) && _;
  }, x = (s) => n.range ? n.modelAuto ? U() && j(s) : false : j(s), Z = (s) => {
    var _;
    return n.highlight ? o(
      s.value,
      (_ = n.arrMapValues) != null && _.highlightedDates ? n.arrMapValues.highlightedDates : n.highlight
    ) : false;
  }, le = (s) => t(s.value) && n.highlightDisabledDays === false, v = (s) => {
    var _;
    return (_ = n.highlightWeekDays) == null ? void 0 : _.includes(s.value.getDay());
  }, D = (s) => (n.range || n.weekPicker) && (!(a.value.count > 0) || s.current) && W() && !(!s.current && n.hideOffsetDates) && !j(s) ? N(s) : false, P = (s) => {
    const { isRangeStart: _, isRangeEnd: te } = E(s), r = n.range ? _ || te : false;
    return {
      dp__cell_offset: !s.current,
      dp__pointer: !n.disabled && !(!s.current && n.hideOffsetDates) && !t(s.value),
      dp__cell_disabled: t(s.value),
      dp__cell_highlight: !le(s) && (Z(s) || v(s)) && !x(s) && !r,
      dp__cell_highlight_active: !le(s) && (Z(s) || v(s)) && x(s),
      dp__today: !n.noToday && ye(s.value, c.value) && s.current
    };
  }, K = (s) => ({
    dp__active_date: x(s),
    dp__date_hover: A(s)
  }), f = (s) => ({
    ...d(s),
    ...w(s),
    dp__range_between_week: D(s) && n.weekPicker
  }), E = (s) => {
    const _ = a.value.count > 0 ? s.current && Y(s) && W() : Y(s) && W(), te = a.value.count > 0 ? s.current && Y(s, false) && W() : Y(s, false) && W();
    return { isRangeStart: _, isRangeEnd: te };
  }, d = (s) => {
    const { isRangeStart: _, isRangeEnd: te } = E(s);
    return {
      dp__range_start: _,
      dp__range_end: te,
      dp__range_between: D(s) && !n.weekPicker,
      dp__date_hover_start: q(A(s), s, true),
      dp__date_hover_end: q(A(s), s, false)
    };
  }, w = (s) => ({
    ...d(s),
    dp__cell_auto_range: B(s),
    dp__cell_auto_range_start: y(s),
    dp__cell_auto_range_end: Q(s)
  }), u = (s) => n.range ? n.autoRange ? w(s) : n.modelAuto ? { ...K(s), ...d(s) } : d(s) : n.weekPicker ? f(s) : K(s);
  return {
    setHoverDate: b,
    clearHoverDate: p,
    getDayClassData: (s) => n.hideOffsetDates && !s.current ? {} : {
      ...P(s),
      ...u(s),
      [n.dayClass ? n.dayClass(s.value) : ""]: true,
      [n.calendarCellClassName]: !!n.calendarCellClassName
    }
  };
};
var Bt = (e) => {
  const { defaultedFilters: n } = Ce(e), a = (v) => {
    const D = Le(t(S(v))).toISOString(), [P] = D.split("T");
    return P;
  }, t = (v) => Ze(v, e.timezone), o = (v) => {
    var s;
    const D = e.maxDate ? Ne(t(v), t(S(e.maxDate))) : false, P = e.minDate ? Pe(t(v), t(S(e.minDate))) : false, K = p(
      v,
      (s = e.arrMapValues) != null && s.disabledDates ? e.arrMapValues.disabledDates : e.disabledDates
    ), E = n.value.months.map((_) => +_).includes(getMonth(v)), d = e.disabledWeekDays.length ? e.disabledWeekDays.some((_) => +_ === getDay(v)) : false, w = k(v), u = getYear(v), h2 = u < +e.yearRange[0] || u > +e.yearRange[1];
    return !(D || P || K || E || h2 || d || w);
  }, l = (v, D) => Pe(...et(e.minDate, v, D)) || ye(...et(e.minDate, v, D)), c = (v, D) => Ne(...et(e.maxDate, v, D)) || ye(...et(e.maxDate, v, D)), b = (v, D, P) => {
    let K = false;
    return e.maxDate && P && c(v, D) && (K = true), e.minDate && !P && l(v, D) && (K = true), K;
  }, p = (v, D) => v ? D instanceof Map ? !!D.get(a(v)) : Array.isArray(D) ? D.some((P) => ye(t(S(P)), t(v))) : D ? D(S(JSON.parse(JSON.stringify(v)))) : false : true, M = (v, D, P, K) => {
    let f = false;
    return K ? e.minDate && e.maxDate ? f = b(v, D, P) : (e.minDate && l(v, D) || e.maxDate && c(v, D)) && (f = true) : f = true, f;
  }, k = (v) => {
    var D, P, K, f, E;
    return Array.isArray(e.allowedDates) && !((D = e.allowedDates) != null && D.length) ? true : (P = e.arrMapValues) != null && P.allowedDates ? !p(v, (K = e.arrMapValues) == null ? void 0 : K.allowedDates) : (f = e.allowedDates) != null && f.length ? !((E = e.allowedDates) != null && E.some((d) => ye(t(S(d)), t(v)))) : false;
  }, T = (v) => !o(v), Y = (v) => !eachDayOfInterval({ start: v[0], end: v[1] }).some((P) => T(P)), q = (v, D, P = 0) => {
    if (Array.isArray(D) && D[P]) {
      const K = differenceInCalendarDays(v, D[P]), f = Ta(D[P], v), E = f.length === 1 ? 0 : f.filter((w) => T(w)).length, d = Math.abs(K) - E;
      if (e.minRange && e.maxRange)
        return d >= +e.minRange && d <= +e.maxRange;
      if (e.minRange)
        return d >= +e.minRange;
      if (e.maxRange)
        return d <= +e.maxRange;
    }
    return true;
  }, j = (v) => new Map(v.map((D) => [a(D), true])), Q = (v) => Array.isArray(v) && v.length > 0, B = () => {
    const v = {
      disabledDates: null,
      allowedDates: null,
      highlightedDates: null
    };
    return Q(e.allowedDates) && (v.allowedDates = j(e.allowedDates)), Q(e.highlight) && (v.highlightedDates = j(e.highlight)), Q(e.disabledDates) && (v.disabledDates = j(e.disabledDates)), v;
  }, y = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, N = (v) => Array.isArray(v) ? [v[0] ? vn(v[0]) : null, v[1] ? vn(v[1]) : null] : vn(v), U = (v, D, P) => v.find(
    (K) => +K.hours === getHours(D) && K.minutes === "*" ? true : +K.minutes === getMinutes(D)
  ) && P, W = (v, D, P) => {
    const [K, f] = v, [E, d] = D;
    return !U(K, E, P) && !U(f, d, P) && P;
  }, A = (v, D) => {
    const P = Array.isArray(D) ? D : [D];
    return Array.isArray(e.disabledTimes) ? Array.isArray(e.disabledTimes[0]) ? W(e.disabledTimes, P, v) : !P.some((K) => U(e.disabledTimes, K, v)) : v;
  }, x = (v, D) => {
    const P = Array.isArray(D) ? [ft(D[0]), D[1] ? ft(D[1]) : void 0] : ft(D), K = !e.disabledTimes(P);
    return v && K;
  }, Z = (v, D) => e.disabledTimes ? Array.isArray(e.disabledTimes) ? A(D, v) : x(D, v) : D;
  return {
    isDisabled: T,
    validateDate: o,
    validateMonthYearInRange: M,
    isDateRangeAllowed: Y,
    checkMinMaxRange: q,
    matchDate: p,
    mapDatesArrToMap: B,
    isValidTime: (v) => {
      let D = true;
      if (!v || y())
        return true;
      const P = !e.minDate && !e.maxDate ? N(v) : v;
      return (e.maxTime || e.maxDate) && (D = ra(e.maxTime, e.maxDate, "max", Te(P), D)), (e.minTime || e.minDate) && (D = ra(e.minTime, e.minDate, "min", Te(P), D)), Z(v, D);
    }
  };
};
var qt = () => {
  const e = computed(() => (t, o) => t == null ? void 0 : t.includes(o)), n = computed(() => (t, o) => t.count ? t.solo ? true : o === 0 : true), a = computed(() => (t, o) => t.count ? t.solo ? true : o === t.count - 1 : true);
  return { hideNavigationButtons: e, showLeftIcon: n, showRightIcon: a };
};
var xr = (e, n, a) => {
  const t = ref(0), o = reactive({
    // monthYearInput: !!props.timePicker,
    [vt.timePicker]: !e.enableTimePicker || e.timePicker || e.monthPicker,
    [vt.calendar]: false,
    [vt.header]: false
  }), l = (k) => {
    var T;
    (T = e.flow) != null && T.length && (o[k] = true, Object.keys(o).filter((Y) => !o[Y]).length || M());
  }, c = () => {
    var k;
    (k = e.flow) != null && k.length && t.value !== -1 && (t.value += 1, n("flow-step", t.value), M());
  }, b = () => {
    t.value = -1;
  }, p = (k, T, ...Y) => {
    e.flow[t.value] === k && a.value && a.value[T](...Y);
  }, M = () => {
    p("month", "toggleMonthPicker", true), p("year", "toggleYearPicker", true), p("calendar", "toggleTimePicker", false, true), p("time", "toggleTimePicker", true, true);
    const k = e.flow[t.value];
    (k === "hours" || k === "minutes" || k === "seconds") && p(k, "toggleTimePicker", true, true, k);
  };
  return { childMount: l, updateFlowStep: c, resetFlow: b, flowStep: t };
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
var Jr = {
  key: 1,
  class: "dp__input_wrap"
};
var Xr = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-label", "onKeydown"];
var Qr = {
  key: 2,
  class: "dp__clear_icon"
};
var el = defineComponent({
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
    const t = e, { defaultedTextInput: o, defaultedAriaLabels: l, defaultedInline: c, getDefaultPattern: b, getDefaultStartTime: p } = Ce(t), M = ref(), k = ref(null), T = ref(false), Y = ref(false), q = computed(
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
    ), j = () => {
      a("set-input-date", null), t.autoApply && (a("set-empty-date"), M.value = null);
    }, Q = (f) => {
      const E = p();
      return Sr(
        f,
        o.value.format ?? b(),
        E ?? Aa({}, t.enableSeconds),
        t.inputValue,
        Y.value
      );
    }, B = (f) => {
      const { rangeSeparator: E } = o.value, [d, w] = f.split(`${E}`);
      if (d) {
        const u = Q(d.trim()), h2 = w ? Q(w.trim()) : null, s = u && h2 ? [u, h2] : [u];
        M.value = u ? s : null;
      }
    }, y = () => {
      Y.value = true;
    }, N = (f) => {
      if (t.range)
        B(f);
      else if (t.multiDates) {
        const E = f.split(";");
        M.value = E.map((d) => Q(d.trim())).filter((d) => d);
      } else
        M.value = Q(f);
    }, U = (f) => {
      var d;
      const E = typeof f == "string" ? f : (d = f.target) == null ? void 0 : d.value;
      E !== "" ? (o.value.openMenu && !t.isMenuOpen && a("open"), N(E), a("set-input-date", M.value)) : j(), Y.value = false, a("update:input-value", E);
    }, W = (f) => {
      o.value.enabled ? (N(f.target.value), o.value.enterSubmit && An(M.value) && t.inputValue !== "" ? (a("set-input-date", M.value, true), M.value = null) : o.value.enterSubmit && t.inputValue === "" && (M.value = null, a("clear"))) : Z(f);
    }, A = (f) => {
      o.value.enabled && o.value.tabSubmit && N(f.target.value), o.value.tabSubmit && An(M.value) && t.inputValue !== "" ? (a("set-input-date", M.value, true), M.value = null) : o.value.tabSubmit && t.inputValue === "" && (M.value = null, a("clear"));
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
        (f = k.value) == null || f.focus({ preventScroll: true });
      },
      setParsedDate: (f) => {
        M.value = f;
      }
    }), (f, E) => {
      var d;
      return openBlock(), createElementBlock("div", { onClick: Z }, [
        f.$slots.trigger && !f.$slots["dp-input"] && !unref(c).enabled ? renderSlot(f.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !f.$slots.trigger && (!unref(c).enabled || unref(c).input) ? (openBlock(), createElementBlock("div", Jr, [
          f.$slots["dp-input"] && !f.$slots.trigger && !unref(c).enabled ? renderSlot(f.$slots, "dp-input", {
            key: 0,
            value: e.inputValue,
            isMenuOpen: e.isMenuOpen,
            onInput: U,
            onEnter: W,
            onTab: A,
            onClear: v,
            onBlur: le,
            onKeypress: D,
            onPaste: y
          }) : createCommentVNode("", true),
          f.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            ref_key: "inputRef",
            ref: k,
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
            onInput: U,
            onKeydown: [
              withKeys(W, ["enter"]),
              withKeys(A, ["tab"]),
              D
            ],
            onBlur: le,
            onFocus: x,
            onKeypress: D,
            onPaste: y
          }, null, 42, Xr)),
          createBaseVNode("div", {
            onClick: E[2] || (E[2] = (w) => a("toggle"))
          }, [
            f.$slots["input-icon"] && !f.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: E[0] || (E[0] = (w) => a("toggle"))
            }, [
              renderSlot(f.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !f.$slots["input-icon"] && !f.hideInputIcon && !f.$slots["dp-input"] ? (openBlock(), createBlock(unref(It), {
              key: 1,
              onClick: E[1] || (E[1] = (w) => a("toggle")),
              class: "dp__input_icon dp__input_icons"
            })) : createCommentVNode("", true)
          ]),
          f.$slots["clear-icon"] && e.inputValue && f.clearable && !f.disabled && !f.readonly ? (openBlock(), createElementBlock("span", Qr, [
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
var tl = ["title"];
var nl = { class: "dp__action_buttons" };
var al = ["onKeydown", "disabled"];
var rl = defineComponent({
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
      defaultedInline: b,
      getDefaultPattern: p
    } = Ce(a), { isValidTime: M } = Bt(a), { buildMatrix: k } = rt(), T = ref(null), Y = ref(null);
    onMounted(() => {
      a.arrowNavigation && k([Ae(T), Ae(Y)], "actionRow");
    });
    const q = computed(() => a.range && !a.partialRange && a.internalModelValue ? a.internalModelValue.length === 2 : true), j = computed(() => !Q.value || !B.value || !q.value), Q = computed(() => !a.enableTimePicker || a.ignoreTimeValidation ? true : M(a.internalModelValue)), B = computed(() => a.monthPicker ? a.range && Array.isArray(a.internalModelValue) ? !a.internalModelValue.filter((D) => !Z(D)).length : Z(a.internalModelValue) : true), y = () => {
      const v = o.value;
      return a.timePicker || a.monthPicker, v(Te(a.internalModelValue));
    }, N = () => {
      const v = a.internalModelValue;
      return l.value.count > 0 ? `${U(v[0])} - ${U(v[1])}` : [U(v[0]), U(v[1])];
    }, U = (v) => Sa(
      v,
      o.value,
      a.formatLocale,
      c.value.rangeSeparator,
      a.modelAuto,
      p()
    ), W = computed(() => !a.internalModelValue || !a.menuMount ? "" : typeof o.value == "string" ? Array.isArray(a.internalModelValue) ? a.internalModelValue.length === 2 && a.internalModelValue[1] ? N() : a.multiDates ? a.internalModelValue.map((v) => `${U(v)}`) : a.modelAuto ? `${U(a.internalModelValue[0])}` : `${U(a.internalModelValue[0])} -` : U(a.internalModelValue) : y()), A = () => a.multiDates ? "; " : " - ", x = computed(
      () => Array.isArray(W.value) ? W.value.join(A()) : W.value
    ), Z = (v) => {
      if (!a.monthPicker)
        return true;
      let D = true;
      const P = S(ze(v));
      if (a.minDate && a.maxDate) {
        const K = S(ze(a.minDate)), f = S(ze(a.maxDate));
        return Ne(P, K) && Pe(P, f) || ye(P, K) || ye(P, f);
      }
      if (a.minDate) {
        const K = S(ze(a.minDate));
        D = Ne(P, K) || ye(P, K);
      }
      if (a.maxDate) {
        const K = S(ze(a.maxDate));
        D = Pe(P, K) || ye(P, K);
      }
      return D;
    }, le = () => {
      Q.value && B.value && q.value ? n("select-date") : n("invalid-select");
    };
    return (v, D) => (openBlock(), createElementBlock("div", {
      class: "dp__action_row",
      style: normalizeStyle(e.calendarWidth ? { width: `${e.calendarWidth}px` } : {})
    }, [
      v.$slots["action-row"] ? renderSlot(v.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: v.internalModelValue,
        disabled: j.value,
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
        ], 8, tl)) : createCommentVNode("", true),
        createBaseVNode("div", nl, [
          v.$slots["action-buttons"] ? renderSlot(v.$slots, "action-buttons", {
            key: 0,
            value: v.internalModelValue
          }) : createCommentVNode("", true),
          v.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(b).enabled && unref(t).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              ref_key: "cancelButtonRef",
              ref: T,
              class: "dp__action_button dp__action_cancel",
              onClick: D[0] || (D[0] = (P) => v.$emit("close-picker")),
              onKeydown: [
                D[1] || (D[1] = withKeys((P) => v.$emit("close-picker"), ["enter"])),
                D[2] || (D[2] = withKeys((P) => v.$emit("close-picker"), ["space"]))
              ]
            }, toDisplayString(v.cancelText), 545)) : createCommentVNode("", true),
            unref(t).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              ref_key: "cancelButtonRef",
              ref: T,
              class: "dp__action_button dp__action_cancel",
              onClick: D[3] || (D[3] = (P) => v.$emit("select-now")),
              onKeydown: [
                D[4] || (D[4] = withKeys((P) => v.$emit("select-now"), ["enter"])),
                D[5] || (D[5] = withKeys((P) => v.$emit("select-now"), ["space"]))
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
              disabled: j.value,
              ref_key: "selectButtonRef",
              ref: Y
            }, toDisplayString(v.selectText), 41, al)) : createCommentVNode("", true)
          ], 64))
        ])
      ], 64))
    ], 4));
  }
});
var ll = ["onKeydown"];
var ol = { class: "dp__selection_grid_header" };
var sl = ["aria-selected", "aria-disabled", "onClick", "onKeydown", "onMouseover"];
var ul = ["aria-label", "onKeydown"];
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
    const t = e, { setSelectionGrid: o, buildMultiLevelMatrix: l, setMonthPicker: c } = rt(), { defaultedAriaLabels: b, defaultedTextInput: p } = Ce(t), { hideNavigationButtons: M } = qt(), k = ref(false), T = ref(null), Y = ref(null), q = ref([]), j = ref(), Q = ref(null), B = ref(0), y = ref(null);
    onBeforeUpdate(() => {
      T.value = null;
    }), onMounted(() => {
      nextTick().then(() => v()), U(), N(true);
    }), onUnmounted(() => N(false));
    const N = (u) => {
      var h2;
      t.arrowNavigation && ((h2 = t.headerRefs) != null && h2.length ? c(u) : o(u));
    }, U = () => {
      var h2;
      const u = Ae(Y);
      u && (p.value.enabled || (T.value ? (h2 = T.value) == null || h2.focus({ preventScroll: true }) : u.focus({ preventScroll: true })), k.value = u.clientHeight < u.scrollHeight);
    }, W = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !t.useRelative,
        "dp--overlay-relative": t.useRelative
      })
    ), A = computed(
      () => t.useRelative ? { height: `${t.height}px`, width: "260px" } : void 0
    ), x = computed(() => ({
      dp__overlay_col: true
    })), Z = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: k.value,
        dp__button_bottom: t.isLast
      })
    ), le = computed(() => {
      var u, h2;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((u = t.items) == null ? void 0 : u.length) <= 6,
        dp__container_block: ((h2 = t.items) == null ? void 0 : h2.length) > 6
      };
    }), v = () => {
      nextTick().then(() => {
        const u = Ae(T), h2 = Ae(Y), s = Ae(Q), _ = Ae(y), te = s ? s.getBoundingClientRect().height : 0;
        h2 && (B.value = h2.getBoundingClientRect().height - te), u && _ && (_.scrollTop = u.offsetTop - _.offsetTop - (B.value / 2 - u.getBoundingClientRect().height) - te);
      });
    }, D = (u) => {
      u.disabled || a("selected", u.value);
    }, P = () => {
      a("toggle"), a("reset-flow");
    }, K = () => {
      t.escClose && P();
    }, f = (u, h2, s, _) => {
      u && (h2.active && (T.value = u), t.arrowNavigation && (Array.isArray(q.value[s]) ? q.value[s][_] = u : q.value[s] = [u], E()));
    }, E = () => {
      var h2, s;
      const u = (h2 = t.headerRefs) != null && h2.length ? [t.headerRefs].concat(q.value) : q.value.concat([t.skipButtonRef ? [] : [Q.value]]);
      l(Te(u), (s = t.headerRefs) != null && s.length ? "monthPicker" : "selectionGrid");
    }, d = (u) => {
      t.arrowNavigation || u.stopImmediatePropagation();
    }, w = (u) => {
      j.value = u, a("hover-value", u);
    };
    return n({ focusGrid: U }), (u, h2) => {
      var s;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: Y,
        class: normalizeClass(W.value),
        style: normalizeStyle(A.value),
        role: "dialog",
        tabindex: "0",
        onKeydown: [
          withKeys(withModifiers(K, ["prevent"]), ["esc"]),
          h2[0] || (h2[0] = withKeys(withModifiers((_) => d(_), ["prevent"]), ["left"])),
          h2[1] || (h2[1] = withKeys(withModifiers((_) => d(_), ["prevent"]), ["up"])),
          h2[2] || (h2[2] = withKeys(withModifiers((_) => d(_), ["prevent"]), ["down"])),
          h2[3] || (h2[3] = withKeys(withModifiers((_) => d(_), ["prevent"]), ["right"]))
        ]
      }, [
        createBaseVNode("div", {
          class: normalizeClass(le.value),
          ref_key: "containerRef",
          ref: y,
          role: "grid",
          style: normalizeStyle({ height: `${B.value}px` })
        }, [
          createBaseVNode("div", ol, [
            renderSlot(u.$slots, "header")
          ]),
          u.$slots.overlay ? renderSlot(u.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(u.items, (_, te) => (openBlock(), createElementBlock("div", {
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: u.items.length >= 3 }]),
            key: te,
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_, (r, L) => (openBlock(), createElementBlock("div", {
              role: "gridcell",
              class: normalizeClass(x.value),
              key: r.value,
              "aria-selected": r.active,
              "aria-disabled": r.disabled || void 0,
              ref_for: true,
              ref: (C) => f(C, r, te, L),
              tabindex: "0",
              onClick: (C) => D(r),
              onKeydown: [
                withKeys(withModifiers((C) => D(r), ["prevent"]), ["enter"]),
                withKeys(withModifiers((C) => D(r), ["prevent"]), ["space"])
              ],
              onMouseover: (C) => w(r.value)
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
            ], 42, sl))), 128))
          ], 2))), 128))
        ], 6),
        u.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          role: "button",
          "aria-label": (s = unref(b)) == null ? void 0 : s.toggleOverlay,
          class: normalizeClass(Z.value),
          tabindex: "0",
          ref_key: "toggleButton",
          ref: Q,
          onClick: P,
          onKeydown: [
            withKeys(P, ["enter"]),
            withKeys(P, ["tab"])
          ]
        }, [
          renderSlot(u.$slots, "button-icon")
        ], 42, ul)), [
          [vShow, !unref(M)(u.hideNavigation, u.type)]
        ]) : createCommentVNode("", true)
      ], 46, ll);
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
      (openBlock(true), createElementBlock(Fragment, null, renderList(a.value, (c, b) => (openBlock(), createElementBlock("div", {
        key: c,
        class: normalizeClass(t.value)
      }, [
        renderSlot(o.$slots, "default", {
          instance: c,
          index: b
        })
      ], 2))), 128))
    ], 2));
  }
});
var il = ["aria-label", "aria-disabled"];
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
    ], 40, il));
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
var dl = (e, n) => {
  const { defaultedMultiCalendars: a, defaultedAriaLabels: t, defaultedTransitions: o } = Ce(e), { modelValue: l, year: c, month: b, calendars: p } = Zt(e, n), M = computed(() => wa(e.formatLocale, e.locale, e.monthNameFormat)), k = computed(() => Fn(e.yearRange, e.reverseYears)), T = ref(null), Y = () => {
    for (let d = 0; d < a.value.count; d++)
      if (d === 0)
        p.value[d] = p.value[0];
      else {
        const w = set(S(), p.value[d - 1]);
        p.value[d] = { month: getMonth(w), year: getYear(addYears(w, d)) };
      }
  }, q = (d) => {
    if (!d)
      return Y();
    const w = set(S(), p.value[d]);
    return p.value[0].year = getYear(subYears(w, a.value.count - 1)), Y();
  }, j = (d) => e.focusStartDate ? d[0] : d[1] ? d[1] : d[0], Q = () => {
    if (l.value) {
      const d = Array.isArray(l.value) ? j(l.value) : l.value;
      p.value[0] = { month: getMonth(d), year: getYear(d) };
    }
  };
  onMounted(() => {
    Q(), a.value.count && Y();
  });
  const B = computed(() => (d, w) => {
    const u = set(ze(/* @__PURE__ */ new Date()), {
      month: b.value(d),
      year: c.value(d)
    });
    return _a(u, e.maxDate, e.minDate, e.preventMinMaxNavigation, w);
  }), y = (d) => d ? { month: getMonth(d), year: getYear(d) } : { month: null, year: null }, N = () => l.value ? Array.isArray(l.value) ? l.value.map((d) => y(d)) : y(l.value) : y(), U = (d, w) => {
    const u = p.value[d], h2 = N();
    return Array.isArray(h2) ? h2.some((s) => s.year === (u == null ? void 0 : u.year) && s.month === w) : (u == null ? void 0 : u.year) === h2.year && w === h2.month;
  }, W = (d, w, u) => {
    var s, _;
    const h2 = N();
    return Array.isArray(h2) ? c.value(w) === ((s = h2[u]) == null ? void 0 : s.year) && d === ((_ = h2[u]) == null ? void 0 : _.month) : false;
  }, A = (d, w) => {
    if (e.range) {
      const u = N();
      if (Array.isArray(l.value) && Array.isArray(u)) {
        const h2 = W(d, w, 0) || W(d, w, 1), s = Je(ze(S()), d, c.value(w));
        return Vn(l.value, T.value, s) && !h2;
      }
      return false;
    }
    return false;
  }, x = computed(() => (d) => bt(M.value, (w) => {
    const u = U(d, w.value), h2 = Ct(
      w.value,
      Ma(c.value(d), e.minDate),
      $a(c.value(d), e.maxDate)
    ) || Yr(e.disabledDates, c.value(d)).includes(w.value), s = A(w.value, d);
    return { active: u, disabled: h2, isBetween: s };
  })), Z = computed(() => (d) => bt(k.value, (w) => {
    const u = c.value(d) === w.value, h2 = Ct(w.value, kt(e.minDate), kt(e.maxDate));
    return { active: u, disabled: h2 };
  })), le = (d, w) => Je(ze(S()), d, c.value(w)), v = (d, w) => {
    const u = l.value ? l.value : ze(/* @__PURE__ */ new Date());
    l.value = Je(u, d, c.value(w)), n("auto-apply");
  }, D = (d, w) => {
    const u = Ca(l, le(d, w), n);
    Un(u, n, e.autoApply, e.modelAuto);
  }, P = (d, w) => {
    Ln(le(d, w), l, e.multiDatesLimit), n("auto-apply", true);
  };
  return {
    groupedMonths: x,
    groupedYears: Z,
    year: c,
    isDisabled: B,
    defaultedMultiCalendars: a,
    defaultedAriaLabels: t,
    defaultedTransitions: o,
    setHoverDate: (d, w) => {
      T.value = le(d, w);
    },
    selectMonth: (d, w) => (p.value[w].month = d, e.multiDates ? P(d, w) : e.range ? D(d, w) : v(d, w)),
    selectYear: (d, w) => {
      p.value[w].year = d, a.value.count && !a.value.solo && q(w);
    }
  };
};
var cl = { class: "dp__month_picker_header" };
var fl = ["aria-label", "onClick", "onKeydown"];
var vl = defineComponent({
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
      defaultedMultiCalendars: b,
      defaultedAriaLabels: p,
      defaultedTransitions: M,
      setHoverDate: k,
      selectMonth: T,
      selectYear: Y
    } = dl(a, n), { transitionName: q, showTransition: j } = Yt(M), { showRightIcon: Q, showLeftIcon: B } = qt(), y = ref([false]), N = (A, x) => {
      Y(A, x), W(x);
    }, U = (A, x = false) => {
      if (!c.value(A, x)) {
        const Z = x ? l.value(A) + 1 : l.value(A) - 1;
        Y(Z, A);
      }
    }, W = (A, x = false, Z) => {
      x || n("reset-flow"), Z !== void 0 ? y.value[A] = Z : y.value[A] = !y.value[A], y.value || n("overlay-closed");
    };
    return (A, x) => (openBlock(), createBlock(Hn, {
      "multi-calendars": unref(b).count,
      stretch: ""
    }, {
      default: withCtx(({ instance: Z }) => [
        createVNode(Rt, {
          items: unref(t)(Z),
          "arrow-navigation": A.arrowNavigation,
          "is-last": A.autoApply && !A.keepActionRow,
          "esc-close": A.escClose,
          height: A.modeHeight,
          onSelected: (le) => unref(T)(le, Z),
          onHoverValue: (le) => unref(k)(le, Z),
          "use-relative": "",
          type: "month"
        }, {
          header: withCtx(() => {
            var le, v, D;
            return [
              createBaseVNode("div", cl, [
                unref(B)(unref(b), Z) ? (openBlock(), createBlock(At, {
                  key: 0,
                  ref: "mpPrevIconRef",
                  "aria-label": (le = unref(p)) == null ? void 0 : le.prevYear,
                  disabled: unref(c)(Z, false),
                  onActivate: (P) => U(Z, false)
                }, {
                  default: withCtx(() => [
                    A.$slots["arrow-left"] ? renderSlot(A.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                    A.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Cn), { key: 1 }))
                  ]),
                  _: 2
                }, 1032, ["aria-label", "disabled", "onActivate"])) : createCommentVNode("", true),
                createBaseVNode("div", {
                  class: "dp--year-select",
                  role: "button",
                  ref: "mpYearButtonRef",
                  "aria-label": (v = unref(p)) == null ? void 0 : v.openYearsOverlay,
                  tabindex: "0",
                  onClick: () => W(Z, false),
                  onKeydown: withKeys(() => W(Z, false), ["enter"])
                }, [
                  A.$slots.year ? renderSlot(A.$slots, "year", {
                    key: 0,
                    year: unref(l)(Z)
                  }) : createCommentVNode("", true),
                  A.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(unref(l)(Z)), 1)
                  ], 64))
                ], 40, fl),
                unref(Q)(unref(b), Z) ? (openBlock(), createBlock(At, {
                  key: 1,
                  ref: "mpNextIconRef",
                  "aria-label": (D = unref(p)) == null ? void 0 : D.nextYear,
                  disabled: unref(c)(Z, false),
                  onActivate: (P) => U(Z, true)
                }, {
                  default: withCtx(() => [
                    A.$slots["arrow-right"] ? renderSlot(A.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
                    A.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Rn), { key: 1 }))
                  ]),
                  _: 2
                }, 1032, ["aria-label", "disabled", "onActivate"])) : createCommentVNode("", true),
                createVNode(Transition, {
                  name: unref(q)(y.value[Z]),
                  css: unref(j)
                }, {
                  default: withCtx(() => [
                    y.value[Z] ? (openBlock(), createBlock(Rt, {
                      key: 0,
                      items: unref(o)(Z),
                      "text-input": A.textInput,
                      "esc-close": A.escClose,
                      onToggle: (P) => W(Z),
                      onSelected: (P) => N(P, Z),
                      "is-last": A.autoApply && !A.keepActionRow,
                      type: "year"
                    }, createSlots({
                      "button-icon": withCtx(() => [
                        A.$slots["calendar-icon"] ? renderSlot(A.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        A.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(It), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      A.$slots["year-overlay-value"] ? {
                        name: "item",
                        fn: withCtx(({ item: P }) => [
                          renderSlot(A.$slots, "year-overlay-value", {
                            text: P.text,
                            value: P.value
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
var ml = (e, n) => {
  const { modelValue: a } = Zt(e, n), t = ref(null), o = (k) => Array.isArray(a.value) ? a.value.some((T) => getYear(T) === k) : a.value ? getYear(a.value) === k : false, l = (k) => e.range && Array.isArray(a.value) ? Vn(a.value, t.value, b(k)) : false, c = computed(() => bt(Fn(e.yearRange, e.reverseYears), (k) => {
    const T = o(k.value), Y = Ct(k.value, kt(e.minDate), kt(e.maxDate)), q = l(k.value);
    return { active: T, disabled: Y, isBetween: q };
  })), b = (k) => setYear(ze(/* @__PURE__ */ new Date()), k);
  return {
    groupedYears: c,
    setHoverValue: (k) => {
      t.value = setYear(ze(/* @__PURE__ */ new Date()), k);
    },
    selectYear: (k) => {
      if (e.multiDates)
        return Ln(b(k), a, e.multiDatesLimit), n("auto-apply", true);
      if (e.range) {
        const T = Ca(a, b(k), n);
        return Un(T, n, e.autoApply, e.modelAuto);
      }
      a.value = b(k), n("auto-apply");
    }
  };
};
var gl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "YearPicker",
  props: {
    ...Xe
  },
  emits: ["update:internal-model-value", "reset-flow", "range-start", "range-end", "auto-apply"],
  setup(e, { emit: n }) {
    const a = e, { groupedYears: t, selectYear: o, setHoverValue: l } = ml(a, n);
    return (c, b) => (openBlock(), createBlock(Rt, {
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
        fn: withCtx(({ item: p }) => [
          renderSlot(c.$slots, "year-overlay-value", {
            text: p.text,
            value: p.value
          })
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["items", "is-last", "height", "onSelected", "onHoverValue"]));
  }
});
var yl = {
  key: 0,
  class: "dp__time_input"
};
var hl = ["aria-label", "onKeydown", "onClick"];
var pl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var bl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var kl = ["aria-label", "disabled", "onKeydown", "onClick"];
var wl = ["aria-label", "onKeydown", "onClick"];
var Dl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var Ml = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var $l = { key: 0 };
var Tl = ["aria-label", "onKeydown"];
var Al = defineComponent({
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
    const t = e, { setTimePickerElements: o, setTimePickerBackRef: l } = rt(), { defaultedAriaLabels: c, defaultedTransitions: b, defaultedFilters: p } = Ce(t), { transitionName: M, showTransition: k } = Yt(b), T = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), Y = ref("AM"), q = ref(null), j = ref([]);
    onMounted(() => {
      a("mounted");
    });
    const Q = (r) => set(/* @__PURE__ */ new Date(), {
      hours: r.hours,
      minutes: r.minutes,
      seconds: t.enableSeconds ? r.seconds : 0,
      milliseconds: 0
    }), B = computed(() => (r) => D(r, t[r])), y = computed(() => ({ hours: t.hours, minutes: t.minutes, seconds: t.seconds })), N = computed(() => (r) => !K(+t[r] + +t[`${r}Increment`], r)), U = computed(() => (r) => !K(+t[r] - +t[`${r}Increment`], r)), W = (r, L) => add(set(S(), r), L), A = (r, L) => sub(set(S(), r), L), x = computed(
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
        const L = u(+t.hours);
        return { text: L < 10 ? `0${L}` : `${L}`, value: L };
      }
      return { text: t[r] < 10 ? `0${t[r]}` : `${t[r]}`, value: t[r] };
    }), D = (r, L) => {
      var g;
      if (!t.disabledTimesConfig)
        return false;
      const C = t.disabledTimesConfig(t.order, r === "hours" ? L : void 0);
      return C[r] ? !!((g = C[r]) != null && g.includes(L)) : true;
    }, P = (r) => {
      const L = t.is24 ? 24 : 12, C = r === "hours" ? L : 60, g = +t[`${r}GridIncrement`], F = r === "hours" && !t.is24 ? g : 0, re = [];
      for (let G = F; G < C; G += g)
        re.push({ value: G, text: G < 10 ? `0${G}` : `${G}` });
      return r === "hours" && !t.is24 && re.push({ value: 0, text: "12" }), bt(re, (G) => ({ active: false, disabled: p.value.times[r].includes(G.value) || !K(G.value, r) || D(r, G.value) }));
    }, K = (r, L) => {
      const C = t.minTime ? Q(cn(t.minTime)) : null, g = t.maxTime ? Q(cn(t.maxTime)) : null, F = Q(cn(y.value, L, r));
      return C && g ? (isBefore(F, g) || isEqual(F, g)) && (isAfter(F, C) || isEqual(F, C)) : C ? isAfter(F, C) || isEqual(F, C) : g ? isBefore(F, g) || isEqual(F, g) : true;
    }, f = (r) => t[`no${r[0].toUpperCase() + r.slice(1)}Overlay`], E = (r) => {
      f(r) || (T[r] = !T[r], T[r] || a("overlay-closed"));
    }, d = (r) => r === "hours" ? getHours : r === "minutes" ? getMinutes : getSeconds, w = (r, L = true) => {
      const C = L ? W : A, g = L ? +t[`${r}Increment`] : -+t[`${r}Increment`];
      K(+t[r] + g, r) && a(
        `update:${r}`,
        d(r)(C({ [r]: +t[r] }, { [r]: +t[`${r}Increment`] }))
      );
    }, u = (r) => t.is24 ? r : (r >= 12 ? Y.value = "PM" : Y.value = "AM", $r(r)), h2 = () => {
      Y.value === "PM" ? (Y.value = "AM", a("update:hours", t.hours - 12)) : (Y.value = "PM", a("update:hours", t.hours + 12)), a("am-pm-change", Y.value);
    }, s = (r) => {
      T[r] = true;
    }, _ = (r, L, C) => {
      if (r && t.arrowNavigation) {
        Array.isArray(j.value[L]) ? j.value[L][C] = r : j.value[L] = [r];
        const g = j.value.reduce(
          (F, re) => re.map((G, ke) => [...F[ke] || [], re[ke]]),
          []
        );
        l(t.closeTimePickerBtn), q.value && (g[1] = g[1].concat(q.value)), o(g, t.order);
      }
    }, te = (r, L) => (E(r), r === "hours" && !t.is24 ? a(`update:${r}`, Y.value === "PM" ? L + 12 : L) : a(`update:${r}`, L));
    return n({ openChildCmp: s }), (r, L) => {
      var C;
      return r.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", yl, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(Z.value, (g, F) => {
          var re, G, ke;
          return openBlock(), createElementBlock("div", {
            key: F,
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
                  dp__inc_dec_button_disabled: N.value(g.type)
                }),
                "aria-label": (re = unref(c)) == null ? void 0 : re.incrementValue(g.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((se) => w(g.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((se) => w(g.type), ["prevent"]), ["space"])
                ],
                onClick: (se) => w(g.type),
                ref_for: true,
                ref: (se) => _(se, F, 0)
              }, [
                t.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  pl,
                  bl
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  r.$slots["arrow-up"] ? renderSlot(r.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  r.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(On), { key: 1 }))
                ], 64))
              ], 42, hl),
              createBaseVNode("button", {
                type: "button",
                "aria-label": (G = unref(c)) == null ? void 0 : G.openTpOverlay(g.type),
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !t.timePickerInline,
                  dp__time_display_inline: t.timePickerInline,
                  "dp--time-invalid": B.value(g.type),
                  "dp--time-overlay-btn": !B.value(g.type)
                }),
                disabled: f(g.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((se) => E(g.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((se) => E(g.type), ["prevent"]), ["space"])
                ],
                onClick: (se) => E(g.type),
                ref_for: true,
                ref: (se) => _(se, F, 1)
              }, [
                r.$slots[g.type] ? renderSlot(r.$slots, g.type, {
                  key: 0,
                  text: v.value(g.type).text,
                  value: v.value(g.type).value
                }) : createCommentVNode("", true),
                r.$slots[g.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(v.value(g.type).text), 1)
                ], 64))
              ], 42, kl),
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !t.timePickerInline,
                  dp__inc_dec_button_inline: t.timePickerInline,
                  dp__tp_inline_btn_bottom: t.timePickerInline,
                  dp__inc_dec_button_disabled: U.value(g.type)
                }),
                "aria-label": (ke = unref(c)) == null ? void 0 : ke.decrementValue(g.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((se) => w(g.type, false), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((se) => w(g.type, false), ["prevent"]), ["space"])
                ],
                onClick: (se) => w(g.type, false),
                ref_for: true,
                ref: (se) => _(se, F, 2)
              }, [
                t.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  Dl,
                  Ml
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  r.$slots["arrow-down"] ? renderSlot(r.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                  r.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(In), { key: 1 }))
                ], 64))
              ], 42, wl)
            ], 64))
          ], 2);
        }), 128)),
        r.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", $l, [
          r.$slots["am-pm-button"] ? renderSlot(r.$slots, "am-pm-button", {
            key: 0,
            toggle: h2,
            value: Y.value
          }) : createCommentVNode("", true),
          r.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: q,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (C = unref(c)) == null ? void 0 : C.amPmButton,
            tabindex: "0",
            onClick: h2,
            onKeydown: [
              withKeys(withModifiers(h2, ["prevent"]), ["enter"]),
              withKeys(withModifiers(h2, ["prevent"]), ["space"])
            ]
          }, toDisplayString(Y.value), 41, Tl))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(le.value, (g, F) => (openBlock(), createBlock(Transition, {
          key: F,
          name: unref(M)(T[g.type]),
          css: unref(k)
        }, {
          default: withCtx(() => [
            T[g.type] ? (openBlock(), createBlock(Rt, {
              key: 0,
              items: P(g.type),
              "is-last": r.autoApply && !r.keepActionRow,
              "esc-close": r.escClose,
              type: g.type,
              "text-input": r.textInput,
              "arrow-navigation": r.arrowNavigation,
              onSelected: (re) => te(g.type, re),
              onToggle: (re) => E(g.type),
              onResetFlow: L[0] || (L[0] = (re) => r.$emit("reset-flow"))
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
var _l = ["aria-label"];
var Sl = ["tabindex"];
var Pl = ["aria-label"];
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
    const t = e, { buildMatrix: o, setTimePicker: l } = rt(), c = useSlots(), { defaultedTransitions: b, defaultedAriaLabels: p, defaultedTextInput: M } = Ce(t), { transitionName: k, showTransition: T } = Yt(b), { hideNavigationButtons: Y } = qt(), q = ref(null), j = ref(null), Q = ref([]), B = ref(null);
    onMounted(() => {
      a("mount"), !t.timePicker && t.arrowNavigation ? o([Ae(q.value)], "time") : l(true, t.timePicker);
    });
    const y = computed(() => t.range && t.modelAuto ? Da(t.internalModelValue) : true), N = ref(false), U = (f) => ({
      hours: Array.isArray(t.hours) ? t.hours[f] : t.hours,
      minutes: Array.isArray(t.minutes) ? t.minutes[f] : t.minutes,
      seconds: Array.isArray(t.seconds) ? t.seconds[f] : t.seconds
    }), W = computed(() => {
      const f = [];
      if (t.range)
        for (let E = 0; E < 2; E++)
          f.push(U(E));
      else
        f.push(U(0));
      return f;
    }), A = (f, E = false, d = "") => {
      E || a("reset-flow"), N.value = f, a(f ? "overlay-opened" : "overlay-closed"), t.arrowNavigation && l(f), nextTick(() => {
        d !== "" && Q.value[0] && Q.value[0].openChildCmp(d);
      });
    }, x = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: t.autoApply && !t.keepActionRow
    })), Z = je(c, "timePicker"), le = (f, E, d) => t.range ? E === 0 ? [f, W.value[1][d]] : [W.value[0][d], f] : f, v = (f) => {
      a("update:hours", f);
    }, D = (f) => {
      a("update:minutes", f);
    }, P = (f) => {
      a("update:seconds", f);
    }, K = () => {
      if (B.value && !M.value.enabled) {
        const f = Ar(B.value);
        f && f.focus({ preventScroll: true });
      }
    };
    return n({ toggleTimePicker: A }), (f, E) => {
      var d;
      return openBlock(), createElementBlock("div", null, [
        !f.timePicker && !f.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          class: normalizeClass(x.value),
          "aria-label": (d = unref(p)) == null ? void 0 : d.openTimePicker,
          tabindex: "0",
          ref_key: "openTimePickerBtn",
          ref: q,
          onKeydown: [
            E[0] || (E[0] = withKeys((w) => A(true), ["enter"])),
            E[1] || (E[1] = withKeys((w) => A(true), ["space"]))
          ],
          onClick: E[2] || (E[2] = (w) => A(true))
        }, [
          f.$slots["clock-icon"] ? renderSlot(f.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          f.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Nn), { key: 1 }))
        ], 42, _l)), [
          [vShow, !unref(Y)(f.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(k)(N.value),
          css: unref(T) && !f.timePickerInline
        }, {
          default: withCtx(() => {
            var w;
            return [
              N.value || f.timePicker || f.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass({
                  dp__overlay: !f.timePickerInline,
                  "dp--overlay-absolute": !t.timePicker && !f.timePickerInline,
                  "dp--overlay-relative": t.timePicker
                }),
                style: normalizeStyle(f.timePicker ? { height: `${f.modeHeight}px` } : void 0),
                ref_key: "overlayRef",
                ref: B,
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
                    setSeconds: P
                  }) : createCommentVNode("", true),
                  f.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(f.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(W.value, (u, h2) => withDirectives((openBlock(), createBlock(Al, mergeProps({ key: h2 }, {
                      ...f.$props,
                      order: h2,
                      hours: u.hours,
                      minutes: u.minutes,
                      seconds: u.seconds,
                      closeTimePickerBtn: j.value,
                      disabledTimesConfig: e.disabledTimesConfig,
                      disabled: h2 === 0 ? f.fixedStart : f.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: Q,
                      "onUpdate:hours": (s) => v(le(s, h2, "hours")),
                      "onUpdate:minutes": (s) => D(le(s, h2, "minutes")),
                      "onUpdate:seconds": (s) => P(le(s, h2, "seconds")),
                      onMounted: K,
                      onOverlayClosed: K,
                      onAmPmChange: E[3] || (E[3] = (s) => f.$emit("am-pm-change", s))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(Z), (s, _) => ({
                        name: s,
                        fn: withCtx((te) => [
                          renderSlot(f.$slots, s, normalizeProps(guardReactiveProps(te)))
                        ])
                      }))
                    ]), 1040, ["onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, h2 === 0 ? true : y.value]
                    ])), 128))
                  ], 2)),
                  !f.timePicker && !f.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    type: "button",
                    ref_key: "closeTimePickerBtn",
                    ref: j,
                    class: normalizeClass(x.value),
                    "aria-label": (w = unref(p)) == null ? void 0 : w.closeTimePicker,
                    tabindex: "0",
                    onKeydown: [
                      E[4] || (E[4] = withKeys((u) => A(false), ["enter"])),
                      E[5] || (E[5] = withKeys((u) => A(false), ["space"]))
                    ],
                    onClick: E[6] || (E[6] = (u) => A(false))
                  }, [
                    f.$slots["calendar-icon"] ? renderSlot(f.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    f.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(It), { key: 1 }))
                  ], 42, Pl)), [
                    [vShow, !unref(Y)(f.hideNavigation, "time")]
                  ]) : createCommentVNode("", true)
                ], 2)
              ], 14, Sl)) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var Na = (e, n, a, t) => {
  const o = (y, N) => Array.isArray(n[y]) ? n[y][N] : n[y], l = (y) => e.enableSeconds ? Array.isArray(n.seconds) ? n.seconds[y] : n.seconds : 0, c = (y, N) => y ? N !== void 0 ? tt(y, o("hours", N), o("minutes", N), l(N)) : tt(y, n.hours, n.minutes, l()) : S(), b = (y, N) => {
    n[y] = N;
  }, p = (y, N) => {
    const U = Object.fromEntries(
      Object.keys(n).map((W) => W === y ? [W, N] : [W, n[W]].slice())
    );
    if (e.range && !e.disableTimeRangeValidation) {
      const W = (x) => a.value ? tt(
        a.value[x],
        U.hours[x],
        U.minutes[x],
        U.seconds[x]
      ) : null, A = (x) => setMilliseconds(a.value[x], 0);
      return !(ye(W(0), W(1)) && (isAfter(W(0), A(1)) || isBefore(W(1), A(0))));
    }
    return true;
  }, M = (y, N) => {
    p(y, N) && (b(y, N), t && t());
  }, k = (y) => {
    M("hours", y);
  }, T = (y) => {
    M("minutes", y);
  }, Y = (y) => {
    M("seconds", y);
  }, q = (y, N, U, W) => {
    N && k(y), !N && !U && T(y), U && Y(y), a.value && W(a.value);
  }, j = (y) => {
    if (y) {
      const N = Array.isArray(y), U = N ? [+y[0].hours, +y[1].hours] : +y.hours, W = N ? [+y[0].minutes, +y[1].minutes] : +y.minutes, A = N ? [+y[0].seconds, +y[1].seconds] : +y.seconds;
      b("hours", U), b("minutes", W), e.enableSeconds && b("seconds", A);
    }
  }, Q = (y, N) => {
    const U = {
      hours: Array.isArray(n.hours) ? n.hours[y] : n.hours,
      disabledArr: []
    };
    return (N || N === 0) && (U.hours = N), Array.isArray(e.disabledTimes) && (U.disabledArr = e.range && Array.isArray(e.disabledTimes[y]) ? e.disabledTimes[y] : e.disabledTimes), U;
  }, B = computed(() => (y, N) => {
    var U;
    if (Array.isArray(e.disabledTimes)) {
      const { disabledArr: W, hours: A } = Q(y, N), x = W.filter((Z) => +Z.hours === A);
      return ((U = x[0]) == null ? void 0 : U.minutes) === "*" ? { hours: [A], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (x == null ? void 0 : x.map((Z) => +Z.minutes)) ?? [],
        seconds: (x == null ? void 0 : x.map((Z) => Z.seconds ? +Z.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: b,
    updateHours: k,
    updateMinutes: T,
    updateSeconds: Y,
    getSetDateTime: c,
    updateTimeValues: q,
    getSecondsValue: l,
    assignStartTime: j,
    disabledTimesConfig: B
  };
};
var Cl = (e, n) => {
  const { modelValue: a, time: t } = Zt(e, n), { defaultedStartTime: o } = Ce(e), { updateTimeValues: l, getSetDateTime: c, setTime: b, assignStartTime: p, disabledTimesConfig: M } = Na(
    e,
    t,
    a
  ), k = () => {
    e.range ? a.value = [c(null, 0), c(null, 1)] : a.value = c(null);
  }, T = (B) => Array.isArray(B) ? [ft(S(B[0])), ft(S(B[1]))] : [ft(B ?? S())], Y = (B, y, N) => {
    b("hours", B), b("minutes", y), e.enableSeconds && b("seconds", N);
  }, q = () => {
    const [B, y] = T(a.value);
    return e.range ? Y(
      [B.hours, y.hours],
      [B.minutes, y.minutes],
      [B.seconds, y.minutes]
    ) : Y(B.hours, B.minutes, B.seconds);
  };
  onMounted(() => {
    if (!e.shadow)
      return p(o.value), a.value ? q() : k();
  });
  const j = () => {
    Array.isArray(a.value) ? a.value = a.value.map((B, y) => B && c(B, y)) : a.value = c(a.value), n("time-update");
  };
  return {
    time: t,
    disabledTimesConfig: M,
    updateTime: (B, y = true, N = false) => {
      l(B, y, N, j);
    }
  };
};
var Rl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePickerSolo",
  props: {
    ...Xe
  },
  emits: ["update:internal-model-value", "time-update", "am-pm-change"],
  setup(e, { emit: n }) {
    const a = e, t = useSlots(), o = je(t, "timePicker"), { time: l, disabledTimesConfig: c, updateTime: b } = Cl(a, n);
    return (p, M) => (openBlock(), createBlock(Hn, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(() => [
        createVNode(Ra, mergeProps(p.$props, {
          hours: unref(l).hours,
          minutes: unref(l).minutes,
          seconds: unref(l).seconds,
          "internal-model-value": p.internalModelValue,
          "disabled-times-config": unref(c),
          "onUpdate:hours": M[0] || (M[0] = (k) => unref(b)(k)),
          "onUpdate:minutes": M[1] || (M[1] = (k) => unref(b)(k, false)),
          "onUpdate:seconds": M[2] || (M[2] = (k) => unref(b)(k, false, true)),
          onAmPmChange: M[3] || (M[3] = (k) => p.$emit("am-pm-change", k))
        }), createSlots({ _: 2 }, [
          renderList(unref(o), (k, T) => ({
            name: k,
            fn: withCtx((Y) => [
              renderSlot(p.$slots, k, normalizeProps(guardReactiveProps(Y)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config"])
      ]),
      _: 3
    }));
  }
});
var Nl = { class: "dp__month_year_row" };
var Ol = ["onClick", "onKeydown", "aria-label"];
var Il = defineComponent({
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
    const t = e, { defaultedTransitions: o, defaultedAriaLabels: l, defaultedMultiCalendars: c, defaultedFilters: b } = Ce(t), { transitionName: p, showTransition: M } = Yt(o), { buildMatrix: k } = rt(), { handleMonthYearChange: T, isDisabled: Y, updateMonthYear: q } = jr(t, a), { showLeftIcon: j, showRightIcon: Q } = qt(), B = ref(false), y = ref(false), N = ref([null, null, null, null]);
    onMounted(() => {
      a("mount");
    });
    const U = (u) => ({
      get: () => t[u],
      set: (h2) => {
        const s = u === We.month ? We.year : We.month;
        a("update-month-year", { [u]: h2, [s]: t[s] }), u === We.month ? P(true) : K(true);
      }
    }), W = computed(U(We.month)), A = computed(U(We.year)), x = computed(() => (u) => ({
      month: t.month,
      year: t.year,
      items: u === We.month ? t.months : t.years,
      instance: t.instance,
      updateMonthYear: q,
      toggle: u === We.month ? P : K
    })), Z = computed(() => {
      const u = t.months.find((h2) => h2.value === t.month);
      return u || { text: "", value: 0 };
    }), le = computed(() => bt(t.months, (u) => {
      const h2 = t.month === u.value, s = Ct(
        u.value,
        Ma(t.year, t.minDate),
        $a(t.year, t.maxDate)
      ) || b.value.months.includes(u.value);
      return { active: h2, disabled: s };
    })), v = computed(() => bt(t.years, (u) => {
      const h2 = t.year === u.value, s = Ct(u.value, kt(t.minDate), kt(t.maxDate)) || b.value.years.includes(u.value);
      return { active: h2, disabled: s };
    })), D = (u, h2) => {
      h2 !== void 0 ? u.value = h2 : u.value = !u.value, u.value || a("overlay-closed");
    }, P = (u = false, h2) => {
      f(u), D(B, h2);
    }, K = (u = false, h2) => {
      f(u), D(y, h2);
    }, f = (u) => {
      u || a("reset-flow");
    }, E = (u, h2) => {
      t.arrowNavigation && (N.value[h2] = Ae(u), k(N.value, "monthYear"));
    }, d = computed(() => {
      var u, h2;
      return [
        {
          type: We.month,
          index: 1,
          toggle: P,
          modelValue: W.value,
          updateModelValue: (s) => W.value = s,
          text: Z.value.text,
          showSelectionGrid: B.value,
          items: le.value,
          ariaLabel: (u = l.value) == null ? void 0 : u.openMonthsOverlay
        },
        {
          type: We.year,
          index: 2,
          toggle: K,
          modelValue: A.value,
          updateModelValue: (s) => A.value = s,
          text: t.year,
          showSelectionGrid: y.value,
          items: v.value,
          ariaLabel: (h2 = l.value) == null ? void 0 : h2.openYearsOverlay
        }
      ];
    }), w = computed(
      () => t.disableYearSelect ? [d.value[0]] : d.value
    );
    return n({
      toggleMonthPicker: P,
      toggleYearPicker: K,
      handleMonthYearChange: T
    }), (u, h2) => {
      var s, _, te;
      return openBlock(), createElementBlock("div", Nl, [
        u.$slots["month-year"] ? renderSlot(u.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, { month: e.month, year: e.year, months: e.months, years: e.years, updateMonthYear: unref(q), handleMonthYearChange: unref(T), instance: e.instance }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          unref(j)(unref(c), e.instance) && !u.vertical ? (openBlock(), createBlock(At, {
            key: 0,
            "aria-label": (s = unref(l)) == null ? void 0 : s.prevMonth,
            disabled: unref(Y)(false),
            onActivate: h2[0] || (h2[0] = (r) => unref(T)(false)),
            onSetRef: h2[1] || (h2[1] = (r) => E(r, 0))
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
                ref: (C) => E(C, L + 1)
              }, [
                u.$slots[r.type] ? renderSlot(u.$slots, r.type, normalizeProps(mergeProps({ key: 0 }, { text: r.text }))) : createCommentVNode("", true),
                u.$slots[r.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(r.text), 1)
                ], 64))
              ], 40, Ol),
              createVNode(Transition, {
                name: unref(p)(r.showSelectionGrid),
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
                      fn: withCtx(({ item: C }) => [
                        renderSlot(u.$slots, `${r.type}-overlay-val`, {
                          text: C.text,
                          value: C.value
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
          unref(j)(unref(c), e.instance) && u.vertical ? (openBlock(), createBlock(At, {
            key: 1,
            "aria-label": (_ = unref(l)) == null ? void 0 : _.prevMonth,
            disabled: unref(Y)(false),
            onActivate: h2[2] || (h2[2] = (r) => unref(T)(false))
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
            disabled: unref(Y)(true),
            "aria-label": (te = unref(l)) == null ? void 0 : te.nextMonth,
            onActivate: h2[3] || (h2[3] = (r) => unref(T)(true)),
            onSetRef: h2[4] || (h2[4] = (r) => E(r, u.disableYearSelect ? 2 : 3))
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
var Yl = ["aria-label"];
var Bl = {
  class: "dp__calendar_header",
  role: "row"
};
var El = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
};
var Fl = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1);
var Vl = ["aria-label"];
var Hl = {
  key: 0,
  role: "gridcell",
  class: "dp__calendar_item dp__week_num"
};
var Ll = { class: "dp__cell_inner" };
var Ul = ["aria-selected", "aria-disabled", "aria-label", "onClick", "onKeydown", "onMouseenter", "onMouseleave"];
var Wl = defineComponent({
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
    const t = e, { buildMultiLevelMatrix: o } = rt(), { defaultedTransitions: l, defaultedAriaLabels: c, defaultedMultiCalendars: b } = Ce(t), p = ref(null), M = ref({
      bottom: "",
      left: "",
      transform: ""
    }), k = ref([]), T = ref(null), Y = ref(true), q = ref(""), j = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), Q = ref([]), B = ref({ left: "50%" }), y = computed(() => t.calendar ? t.calendar(t.mappedDates) : t.mappedDates), N = computed(() => t.dayNames ? Array.isArray(t.dayNames) ? t.dayNames : t.dayNames(t.locale, +t.weekStart) : Mr(t.formatLocale, t.locale, +t.weekStart));
    onMounted(() => {
      a("mount", { cmp: "calendar", refs: k }), t.noSwipe || T.value && (T.value.addEventListener("touchstart", K, { passive: false }), T.value.addEventListener("touchend", f, { passive: false }), T.value.addEventListener("touchmove", E, { passive: false })), t.monthChangeOnScroll && T.value && T.value.addEventListener("wheel", u, { passive: false });
    });
    const U = (s) => s ? t.vertical ? "vNext" : "next" : t.vertical ? "vPrevious" : "previous", W = (s, _) => {
      if (t.transitions) {
        const te = Le(Je(S(), t.month, t.year));
        q.value = Ne(Le(Je(S(), s, _)), te) ? l.value[U(true)] : l.value[U(false)], Y.value = false, nextTick(() => {
          Y.value = true;
        });
      }
    }, A = computed(
      () => ({
        [t.calendarClassName]: !!t.calendarClassName
      })
    ), x = computed(() => (s) => {
      const _ = Tr(s);
      return {
        dp__marker_dot: _.type === "dot",
        dp__marker_line: _.type === "line"
      };
    }), Z = computed(() => (s) => ye(s, p.value)), le = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: b.value.count > 0 && t.instance !== 0
    })), v = computed(() => (s) => t.hideOffsetDates ? s.current : true), D = async (s, _, te) => {
      var r, L;
      if (a("set-hover-date", s), (L = (r = s.marker) == null ? void 0 : r.tooltip) != null && L.length) {
        const C = Ae(k.value[_][te]);
        if (C) {
          const { width: g, height: F } = C.getBoundingClientRect();
          p.value = s.value;
          let re = { left: `${g / 2}px` }, G = -50;
          if (await nextTick(), Q.value[0]) {
            const { left: ke, width: se } = Q.value[0].getBoundingClientRect();
            ke < 0 && (re = { left: "0" }, G = 0, B.value.left = `${g / 2}px`), window.innerWidth < ke + se && (re = { right: "0" }, G = 0, B.value.left = `${se - g / 2}px`);
          }
          M.value = {
            bottom: `${F}px`,
            ...re,
            transform: `translateX(${G}%)`
          }, a("tooltip-open", s.marker);
        }
      }
    }, P = (s) => {
      p.value && (p.value = null, M.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a("tooltip-close", s.marker));
    }, K = (s) => {
      j.value.startX = s.changedTouches[0].screenX, j.value.startY = s.changedTouches[0].screenY;
    }, f = (s) => {
      j.value.endX = s.changedTouches[0].screenX, j.value.endY = s.changedTouches[0].screenY, d();
    }, E = (s) => {
      t.vertical && !t.inline && s.preventDefault();
    }, d = () => {
      const s = t.vertical ? "Y" : "X";
      Math.abs(j.value[`start${s}`] - j.value[`end${s}`]) > 10 && a("handle-swipe", j.value[`start${s}`] > j.value[`end${s}`] ? "right" : "left");
    }, w = (s, _, te) => {
      s && (Array.isArray(k.value[_]) ? k.value[_][te] = s : k.value[_] = [s]), t.arrowNavigation && o(k.value, "calendar");
    }, u = (s) => {
      t.monthChangeOnScroll && (s.preventDefault(), a("handle-scroll", s));
    }, h2 = (s) => {
      const _ = s[0];
      return t.weekNumbers === "local" ? getWeek(_.value, { weekStartsOn: +t.weekStart }) : t.weekNumbers === "iso" ? getISOWeek(_.value) : typeof t.weekNumbers == "function" ? t.weekNumbers(_.value) : "";
    };
    return n({ triggerTransition: W }), (s, _) => {
      var te;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(le.value)
      }, [
        createBaseVNode("div", {
          ref_key: "calendarWrapRef",
          ref: T,
          role: "grid",
          class: normalizeClass(A.value),
          "aria-label": (te = unref(c)) == null ? void 0 : te.calendarWrap
        }, [
          (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createBaseVNode("div", Bl, [
              s.weekNumbers ? (openBlock(), createElementBlock("div", El, toDisplayString(s.weekNumName), 1)) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(N.value, (r, L) => (openBlock(), createElementBlock("div", {
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
            Fl,
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
                    "aria-label": ((r = unref(c)) == null ? void 0 : r.calendarDays) || void 0
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(y.value, (L, C) => (openBlock(), createElementBlock("div", {
                      class: "dp__calendar_row",
                      role: "row",
                      key: C
                    }, [
                      s.weekNumbers ? (openBlock(), createElementBlock("div", Hl, [
                        createBaseVNode("div", Ll, toDisplayString(h2(L.days)), 1)
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(L.days, (g, F) => {
                        var re, G, ke;
                        return openBlock(), createElementBlock("div", {
                          role: "gridcell",
                          class: "dp__calendar_item",
                          ref_for: true,
                          ref: (se) => w(se, C, F),
                          key: F + C,
                          "aria-selected": g.classData.dp__active_date || g.classData.dp__range_start || g.classData.dp__range_start,
                          "aria-disabled": g.classData.dp__cell_disabled || void 0,
                          "aria-label": (G = (re = unref(c)) == null ? void 0 : re.day) == null ? void 0 : G.call(re, g),
                          tabindex: "0",
                          onClick: withModifiers((se) => s.$emit("select-date", g), ["stop", "prevent"]),
                          onKeydown: [
                            withKeys((se) => s.$emit("select-date", g), ["enter"]),
                            withKeys((se) => s.$emit("handle-space", g), ["space"])
                          ],
                          onMouseenter: (se) => D(g, C, F),
                          onMouseleave: (se) => P(g)
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
                              (ke = g.marker) != null && ke.tooltip ? (openBlock(), createElementBlock("div", {
                                key: 0,
                                class: "dp__tooltip_content",
                                onClick: _[0] || (_[0] = withModifiers(() => {
                                }, ["stop"]))
                              }, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(g.marker.tooltip, (se, R) => (openBlock(), createElementBlock("div", {
                                  key: R,
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
                                  style: normalizeStyle(B.value)
                                }, null, 4)
                              ])) : createCommentVNode("", true)
                            ], 4)) : createCommentVNode("", true)
                          ], 2)
                        ], 40, Ul);
                      }), 128))
                    ]))), 128))
                  ], 8, Vl)) : createCommentVNode("", true)
                ];
              }),
              _: 3
            }, 8, ["name", "css"])
          ], 64))
        ], 10, Yl)
      ], 2);
    };
  }
});
var sa = (e) => Array.isArray(e);
var zl = (e, n, a, t) => {
  const o = ref([]), { modelValue: l, calendars: c, time: b } = Zt(e, n), { defaultedMultiCalendars: p, defaultedStartTime: M } = Ce(e), { validateMonthYearInRange: k, isDisabled: T, isDateRangeAllowed: Y, checkMinMaxRange: q } = Bt(e), { updateTimeValues: j, getSetDateTime: Q, setTime: B, assignStartTime: y, disabledTimesConfig: N } = Na(
    e,
    b,
    l,
    t
  ), U = computed(
    () => (i) => c.value[i] ? c.value[i].month : 0
  ), W = computed(
    () => (i) => c.value[i] ? c.value[i].year : 0
  ), A = (i, V, ne) => {
    var me, we;
    c.value[i] || (c.value[i] = { month: 0, year: 0 }), c.value[i].month = ta(V) ? (me = c.value[i]) == null ? void 0 : me.month : V, c.value[i].year = ta(ne) ? (we = c.value[i]) == null ? void 0 : we.year : ne;
  }, x = () => {
    e.autoApply && n("select-date");
  };
  watch(l, (i, V) => {
    JSON.stringify(i) !== JSON.stringify(V) && v();
  }), onMounted(() => {
    e.shadow || (l.value || (s(), M.value && y(M.value)), v(true), e.focusStartDate && e.startDate && s());
  });
  const Z = computed(() => {
    var i;
    return (i = e.flow) != null && i.length && !e.partialFlow ? e.flowStep === e.flow.length : true;
  }), le = () => {
    e.autoApply && Z.value && n("auto-apply", e.partialFlow);
  }, v = (i = false) => {
    if (l.value)
      return Array.isArray(l.value) ? (o.value = l.value, d(i)) : P(l.value, i);
    if (p.value.count && i && !e.startDate)
      return D(S(), i);
  }, D = (i, V = false) => {
    if ((!p.value.count || !p.value.static || V) && A(0, getMonth(i), getYear(i)), p.value.count)
      for (let ne = 1; ne < p.value.count; ne++) {
        const me = set(S(), { month: U.value(ne - 1), year: W.value(ne - 1) }), we = add(me, { months: 1 });
        c.value[ne] = { month: getMonth(we), year: getYear(we) };
      }
  }, P = (i, V) => {
    D(i), B("hours", getHours(i)), B("minutes", getMinutes(i)), B("seconds", getSeconds(i)), p.value.count && V && h2();
  }, K = (i) => p.value.count ? Math.abs(differenceInMonths(i[0], i[1])) >= p.value.count ? 1 : 0 : 1, f = (i, V) => {
    i[1] && e.showLastInRange ? D(i[K(i)], V) : D(i[0], V);
    const ne = (me, we) => [
      me(i[0]),
      i[1] ? me(i[1]) : b[we][1]
    ];
    B("hours", ne(getHours, "hours")), B("minutes", ne(getMinutes, "minutes")), B("seconds", ne(getSeconds, "seconds"));
  }, E = (i, V) => {
    if ((e.range || e.weekPicker) && !e.multiDates)
      return f(i, V);
    if (e.multiDates) {
      const ne = i[i.length - 1];
      return P(ne, V);
    }
  }, d = (i) => {
    const V = l.value;
    E(V, i), p.value.count && p.value.solo && h2();
  }, w = (i, V) => {
    const ne = set(S(), { month: U.value(V), year: W.value(V) }), me = i < 0 ? addMonths(ne, 1) : subMonths(ne, 1);
    k(getMonth(me), getYear(me), i < 0, e.preventMinMaxNavigation) && (A(V, getMonth(me), getYear(me)), p.value.count && !p.value.solo && u(V), a());
  }, u = (i) => {
    for (let V = i - 1; V >= 0; V--) {
      const ne = subMonths(set(S(), { month: U.value(V + 1), year: W.value(V + 1) }), 1);
      A(V, getMonth(ne), getYear(ne));
    }
    for (let V = i + 1; V <= p.value.count - 1; V++) {
      const ne = addMonths(set(S(), { month: U.value(V - 1), year: W.value(V - 1) }), 1);
      A(V, getMonth(ne), getYear(ne));
    }
  }, h2 = () => {
    if (Array.isArray(l.value) && l.value.length === 2) {
      const i = S(
        S(l.value[1] ? l.value[1] : addMonths(l.value[0], 1))
      ), [V, ne] = [getMonth(l.value[0]), getYear(l.value[0])], [me, we] = [getMonth(l.value[1]), getYear(l.value[1])];
      (V !== me || V === me && ne !== we) && p.value.solo && A(1, getMonth(i), getYear(i));
    } else
      l.value && !Array.isArray(l.value) && (A(0, getMonth(l.value), getYear(l.value)), D(S()));
  }, s = () => {
    e.startDate && (A(0, getMonth(S(e.startDate)), getYear(S(e.startDate))), p.value.count && u(0));
  }, _ = (i, V) => {
    e.monthChangeOnScroll && w(e.monthChangeOnScroll !== "inverse" ? -i.deltaY : i.deltaY, V);
  }, te = (i, V, ne = false) => {
    e.monthChangeOnArrows && e.vertical === ne && r(i, V);
  }, r = (i, V) => {
    w(i === "right" ? -1 : 1, V);
  }, L = (i) => e.markers.find((V) => ye(aa(i.value), aa(V.date))), C = (i, V) => {
    switch (e.sixWeeks === true ? "append" : e.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [i == 0, true];
      case "fair":
        return [i == 0 || V > i, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, g = (i, V, ne, me) => {
    if (e.sixWeeks && i.length < 6) {
      const we = 6 - i.length, Qe = (V.getDay() + 7 - me) % 7, Ft = 6 - (ne.getDay() + 7 - me) % 7, [$t, rn] = C(Qe, Ft);
      for (let lt = 1; lt <= we; lt++)
        if (rn ? !!(lt % 2) == $t : $t) {
          const Vt = i[0].days[0], ln = F(addDays(Vt.value, -7), getMonth(V));
          i.unshift({ days: ln });
        } else {
          const Vt = i[i.length - 1], ln = Vt.days[Vt.days.length - 1], Ia = F(addDays(ln.value, 1), getMonth(V));
          i.push({ days: Ia });
        }
    }
    return i;
  }, F = (i, V) => {
    const ne = S(JSON.parse(JSON.stringify(i))), me = [];
    for (let we = 0; we < 7; we++) {
      const Qe = addDays(ne, we), Mt = getMonth(Qe) !== V;
      me.push({
        text: e.hideOffsetDates && Mt ? "" : Qe.getDate(),
        value: Qe,
        current: !Mt,
        classData: {}
      });
    }
    return me;
  }, re = (i, V) => {
    const ne = [], me = S(Ze(new Date(V, i), e.timezone)), we = S(Ze(new Date(V, i + 1, 0), e.timezone)), Qe = e.weekStart, Mt = startOfWeek(me, { weekStartsOn: Qe }), Ft = ($t) => {
      const rn = F($t, i);
      if (ne.push({ days: rn }), !ne[ne.length - 1].days.some(
        (lt) => ye(Le(lt.value), Le(we))
      )) {
        const lt = addDays($t, 7);
        Ft(lt);
      }
    };
    return Ft(Mt), g(ne, me, we, Qe);
  }, G = (i) => (l.value = jt(S(i.value), e.timezone, e.weekStart), le()), ke = (i) => {
    const V = tt(S(i.value), b.hours, b.minutes, Et());
    e.multiDates ? Ln(V, l, e.multiDatesLimit) : l.value = V, t(), nextTick().then(() => {
      le();
    });
  }, se = (i) => e.noDisabledRange ? Ta(o.value[0], i).some((ne) => T(ne)) : false, R = () => {
    o.value = l.value ? l.value.slice() : [], o.value.length === 2 && !(e.fixedStart || e.fixedEnd) && (o.value = []);
  }, J = (i, V) => {
    const ne = [S(i.value), addDays(S(i.value), +e.autoRange)];
    Y(ne) && (V && $e(i.value), o.value = ne);
  }, $e = (i) => {
    const V = getMonth(S(i)), ne = getYear(S(i));
    if (A(0, V, ne), p.value.count > 0)
      for (let me = 1; me < p.value.count; me++) {
        const we = Rr(
          set(S(i), { year: U.value(me - 1), month: W.value(me - 1) })
        );
        A(me, we.month, we.year);
      }
  }, X = (i) => Array.isArray(l.value) && l.value.length === 2 ? e.fixedStart && (Ne(i, l.value[0]) || ye(i, l.value[0])) ? [l.value[0], i] : e.fixedEnd && (Pe(i, l.value[1]) || ye(i, l.value[1])) ? [i, l.value[1]] : (n("invalid-fixed-range", i), l.value) : [], Ve = (i) => {
    se(i.value) || !q(i.value, l.value, e.fixedStart ? 0 : 1) || (o.value = X(S(i.value)));
  }, _e = (i, V) => {
    if (R(), e.autoRange)
      return J(i, V);
    if (e.fixedStart || e.fixedEnd)
      return Ve(i);
    o.value[0] ? q(S(i.value), l.value) && !se(i.value) && (Pe(S(i.value), S(o.value[0])) ? (o.value.unshift(S(i.value)), n("range-end", o.value[0])) : (o.value[1] = S(i.value), n("range-end", o.value[1]))) : (o.value[0] = S(i.value), n("range-start", o.value[0]));
  }, Et = (i = true) => e.enableSeconds ? Array.isArray(b.seconds) ? i ? b.seconds[0] : b.seconds[1] : b.seconds : 0, Dt = (i) => {
    o.value[i] = tt(
      o.value[i],
      b.hours[i],
      b.minutes[i],
      Et(i !== 1)
    );
  }, Jt = () => {
    var i, V;
    o.value[0] && o.value[1] && +((i = o.value) == null ? void 0 : i[0]) > +((V = o.value) == null ? void 0 : V[1]) && (o.value.reverse(), n("range-start", o.value[0]), n("range-end", o.value[1]));
  }, Xt = () => {
    o.value.length && (o.value[0] && !o.value[1] ? Dt(0) : (Dt(0), Dt(1), t()), Jt(), l.value = o.value.slice(), Un(o.value, n, e.autoApply, e.modelAuto));
  }, Qt = (i, V = false) => {
    if (!(T(i.value) || !i.current && e.hideOffsetDates)) {
      if (e.weekPicker)
        return G(i);
      if (!e.range)
        return ke(i);
      sa(b.hours) && sa(b.minutes) && !e.multiDates && (_e(i, V), Xt());
    }
  }, en = (i, V) => {
    A(i, V.month, V.year), p.value.count && !p.value.solo && u(i), a(p.value.solo ? i : void 0), t();
  }, tn = (i, V) => {
    Array.isArray(i) && i.length <= 2 && e.range ? l.value = i.map((ne) => Ze(S(ne), V ? void 0 : e.timezone)) : Array.isArray(i) || (l.value = Ze(S(i), V ? void 0 : e.timezone)), x(), e.multiCalendars && nextTick().then(() => v(true));
  }, nn = () => {
    e.range ? l.value && Array.isArray(l.value) && l.value[0] ? l.value = Pe(S(), l.value[0]) ? [S(), l.value[0]] : [l.value[0], S()] : l.value = [S()] : l.value = S(), x();
  }, an = () => {
    if (Array.isArray(l.value))
      if (e.multiDates) {
        const i = ae();
        l.value[l.value.length - 1] = Q(i);
      } else
        l.value = l.value.map((i, V) => i && Q(i, V));
    else
      l.value = Q(l.value);
    n("time-update");
  }, ae = () => Array.isArray(l.value) && l.value.length ? l.value[l.value.length - 1] : null;
  return {
    calendars: c,
    modelValue: l,
    month: U,
    year: W,
    time: b,
    disabledTimesConfig: N,
    getCalendarDays: re,
    getMarker: L,
    handleScroll: _,
    handleSwipe: r,
    handleArrow: te,
    selectDate: Qt,
    updateMonthYear: en,
    presetDate: tn,
    selectCurrentDate: nn,
    updateTime: (i, V = true, ne = false) => {
      j(i, V, ne, an);
    }
  };
};
var jl = { key: 0 };
var Kl = defineComponent({
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
      modelValue: b,
      time: p,
      disabledTimesConfig: M,
      getCalendarDays: k,
      getMarker: T,
      handleArrow: Y,
      handleScroll: q,
      handleSwipe: j,
      selectDate: Q,
      updateMonthYear: B,
      presetDate: y,
      selectCurrentDate: N,
      updateTime: U
    } = zl(t, a, u, h2), W = useSlots(), { setHoverDate: A, getDayClassData: x, clearHoverDate: Z } = qr(b, t), { defaultedMultiCalendars: le } = Ce(t), v = ref([]), D = ref([]), P = ref(null), K = je(W, "calendar"), f = je(W, "monthYear"), E = je(W, "timePicker"), d = (C) => {
      t.shadow || a("mount", C);
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
    const w = computed(() => (C) => k(l.value(C), c.value(C)).map((g) => ({
      ...g,
      days: g.days.map((F) => (F.marker = T(F), F.classData = x(F), F))
    })));
    function u(C) {
      var g;
      C || C === 0 ? (g = D.value[C]) == null || g.triggerTransition(l.value(C), c.value(C)) : D.value.forEach((F, re) => F.triggerTransition(l.value(re), c.value(re)));
    }
    function h2() {
      a("update-flow-step");
    }
    const s = (C, g = false) => {
      Q(C, g), t.spaceConfirm && a("select-date");
    };
    return n({
      clearHoverDate: Z,
      presetDate: y,
      selectCurrentDate: N,
      toggleMonthPicker: (C, g, F = 0) => {
        var re;
        (re = v.value[F]) == null || re.toggleMonthPicker(C, g);
      },
      toggleYearPicker: (C, g, F = 0) => {
        var re;
        (re = v.value[F]) == null || re.toggleYearPicker(C, g);
      },
      toggleTimePicker: (C, g, F) => {
        var re;
        (re = P.value) == null || re.toggleTimePicker(C, g, F);
      },
      handleArrow: Y,
      updateMonthYear: B,
      getSidebarProps: () => ({
        modelValue: b,
        month: l,
        year: c,
        time: p,
        updateTime: U,
        updateMonthYear: B,
        selectDate: Q,
        presetDate: y
      })
    }), (C, g) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(Hn, {
        "multi-calendars": unref(le).count
      }, {
        default: withCtx(({ instance: F, index: re }) => [
          C.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(Il, mergeProps({
            key: 0,
            ref: (G) => {
              G && (v.value[re] = G);
            },
            months: unref(wa)(C.formatLocale, C.locale, C.monthNameFormat),
            years: unref(Fn)(C.yearRange, C.reverseYears),
            month: unref(l)(F),
            year: unref(c)(F),
            instance: F
          }, C.$props, {
            onMount: g[0] || (g[0] = (G) => d(unref(vt).header)),
            onResetFlow: g[1] || (g[1] = (G) => C.$emit("reset-flow")),
            onUpdateMonthYear: (G) => unref(B)(F, G),
            onOverlayClosed: g[2] || (g[2] = (G) => C.$emit("focus-menu"))
          }), createSlots({ _: 2 }, [
            renderList(unref(f), (G, ke) => ({
              name: G,
              fn: withCtx((se) => [
                renderSlot(C.$slots, G, normalizeProps(guardReactiveProps(se)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(Wl, mergeProps({
            ref: (G) => {
              G && (D.value[re] = G);
            },
            "mapped-dates": w.value(F),
            month: unref(l)(F),
            year: unref(c)(F)
          }, C.$props, {
            onSelectDate: (G) => unref(Q)(G, F !== 1),
            onHandleSpace: (G) => s(G, F !== 1),
            onSetHoverDate: g[3] || (g[3] = (G) => unref(A)(G)),
            onHandleScroll: (G) => unref(q)(G, F),
            onHandleSwipe: (G) => unref(j)(G, F),
            onMount: g[4] || (g[4] = (G) => d(unref(vt).calendar)),
            onResetFlow: g[5] || (g[5] = (G) => C.$emit("reset-flow")),
            onTooltipOpen: g[6] || (g[6] = (G) => C.$emit("tooltip-open", G)),
            onTooltipClose: g[7] || (g[7] = (G) => C.$emit("tooltip-close", G))
          }), createSlots({ _: 2 }, [
            renderList(unref(K), (G, ke) => ({
              name: G,
              fn: withCtx((se) => [
                renderSlot(C.$slots, G, normalizeProps(guardReactiveProps({ ...se })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars"]),
      C.enableTimePicker ? (openBlock(), createElementBlock("div", jl, [
        C.$slots["time-picker"] ? renderSlot(C.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(p), updateTime: unref(U) }))) : (openBlock(), createBlock(Ra, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: P
        }, C.$props, {
          hours: unref(p).hours,
          minutes: unref(p).minutes,
          seconds: unref(p).seconds,
          "internal-model-value": C.internalModelValue,
          "disabled-times-config": unref(M),
          onMount: g[8] || (g[8] = (F) => d(unref(vt).timePicker)),
          "onUpdate:hours": g[9] || (g[9] = (F) => unref(U)(F)),
          "onUpdate:minutes": g[10] || (g[10] = (F) => unref(U)(F, false)),
          "onUpdate:seconds": g[11] || (g[11] = (F) => unref(U)(F, false, true)),
          onResetFlow: g[12] || (g[12] = (F) => C.$emit("reset-flow")),
          onOverlayClosed: g[13] || (g[13] = (F) => C.$emit("time-picker-close")),
          onOverlayOpened: g[14] || (g[14] = (F) => C.$emit("time-picker-open", F)),
          onAmPmChange: g[15] || (g[15] = (F) => C.$emit("am-pm-change", F))
        }), createSlots({ _: 2 }, [
          renderList(unref(E), (F, re) => ({
            name: F,
            fn: withCtx((G) => [
              renderSlot(C.$slots, F, normalizeProps(guardReactiveProps(G)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config"]))
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var Gl = ["id", "onKeydown"];
var Zl = {
  key: 0,
  class: "dp__sidebar_left"
};
var ql = {
  key: 1,
  class: "dp--preset-dates"
};
var xl = ["onClick", "onKeydown"];
var Jl = {
  key: 2,
  class: "dp__sidebar_right"
};
var Xl = {
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
      const { openOnTop: R, ...J } = t;
      return {
        ...J,
        flowStep: x.value
      };
    }), { setMenuFocused: l, setShiftKey: c, control: b } = Pa(), p = useSlots(), { defaultedTextInput: M, defaultedInline: k } = Ce(t), T = ref(null), Y = ref(0), q = ref(null), j = ref(null), Q = ref(false), B = ref(null);
    onMounted(() => {
      if (!t.shadow) {
        Q.value = true, y(), window.addEventListener("resize", y);
        const R = Ae(q);
        if (R && !M.value.enabled && !k.value.enabled && (l(true), P()), R) {
          const J = ($e) => {
            t.allowPreventDefault && $e.preventDefault(), $e.stopImmediatePropagation(), $e.stopPropagation();
          };
          R.addEventListener("pointerdown", J), R.addEventListener("mousedown", J);
        }
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", y);
    });
    const y = () => {
      const R = Ae(j);
      R && (Y.value = R.getBoundingClientRect().width);
    }, { arrowRight: N, arrowLeft: U, arrowDown: W, arrowUp: A } = rt(), { flowStep: x, updateFlowStep: Z, childMount: le, resetFlow: v } = xr(t, a, B), D = computed(() => t.monthPicker ? vl : t.yearPicker ? gl : t.timePicker ? Rl : Kl), P = () => {
      const R = Ae(q);
      R && R.focus({ preventScroll: true });
    }, K = () => computed(() => {
      var R;
      return (R = B.value) == null ? void 0 : R.getSidebarProps();
    }), f = () => {
      t.openOnTop && a("recalculate-position");
    }, E = je(p, "action"), d = computed(() => t.monthPicker || t.yearPicker ? je(p, "monthYear") : t.timePicker ? je(p, "timePicker") : je(p, "shared")), w = computed(() => t.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), u = computed(() => ({
      dp__menu_disabled: t.disabled,
      dp__menu_readonly: t.readonly
    })), h2 = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !k.value.enabled,
        dp__relative: k.value.enabled,
        [t.menuClassName]: !!t.menuClassName
      })
    ), s = (R) => {
      R.stopPropagation(), R.stopImmediatePropagation();
    }, _ = () => {
      t.escClose && a("close-picker");
    }, te = (R) => {
      if (t.arrowNavigation) {
        if (R === "up")
          return A();
        if (R === "down")
          return W();
        if (R === "left")
          return U();
        if (R === "right")
          return N();
      } else
        R === "left" || R === "up" ? F("handleArrow", "left", 0, R === "up") : F("handleArrow", "right", 0, R === "down");
    }, r = (R) => {
      c(R.shiftKey), !t.disableMonthYearSelect && R.code === "Tab" && R.target.classList.contains("dp__menu") && b.value.shiftKeyInMenu && (R.preventDefault(), R.stopImmediatePropagation(), a("close-picker"));
    }, L = () => {
      P(), a("time-picker-close");
    }, C = (R) => {
      var J, $e, X;
      (J = B.value) == null || J.toggleTimePicker(false, false), ($e = B.value) == null || $e.toggleMonthPicker(false, false, R), (X = B.value) == null || X.toggleYearPicker(false, false, R);
    }, g = (R, J = 0) => {
      var $e, X, Ve;
      return R === "month" ? ($e = B.value) == null ? void 0 : $e.toggleMonthPicker(false, true, J) : R === "year" ? (X = B.value) == null ? void 0 : X.toggleYearPicker(false, true, J) : R === "time" ? (Ve = B.value) == null ? void 0 : Ve.toggleTimePicker(true, false) : C(J);
    }, F = (R, ...J) => {
      var $e, X;
      ($e = B.value) != null && $e[R] && ((X = B.value) == null || X[R](...J));
    }, re = () => {
      F("selectCurrentDate");
    }, G = (R, J) => {
      F("presetDate", R, J);
    }, ke = () => {
      F("clearHoverDate");
    };
    return n({
      updateMonthYear: (R, J) => {
        F("updateMonthYear", R, J);
      },
      switchView: g
    }), (R, J) => {
      var $e;
      return openBlock(), createElementBlock("div", {
        id: R.uid ? `dp-menu-${R.uid}` : void 0,
        tabindex: "0",
        ref_key: "dpMenuRef",
        ref: q,
        role: "dialog",
        class: normalizeClass(h2.value),
        onMouseleave: ke,
        onClick: s,
        onKeydown: [
          withKeys(_, ["esc"]),
          J[14] || (J[14] = withKeys(withModifiers((X) => te("left"), ["prevent"]), ["left"])),
          J[15] || (J[15] = withKeys(withModifiers((X) => te("up"), ["prevent"]), ["up"])),
          J[16] || (J[16] = withKeys(withModifiers((X) => te("down"), ["prevent"]), ["down"])),
          J[17] || (J[17] = withKeys(withModifiers((X) => te("right"), ["prevent"]), ["right"])),
          r
        ]
      }, [
        (R.disabled || R.readonly) && unref(k).enabled ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(u.value)
        }, null, 2)) : createCommentVNode("", true),
        !unref(k).enabled && !R.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(w.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: j,
          class: normalizeClass({
            dp__menu_content_wrapper: (($e = R.presetDates) == null ? void 0 : $e.length) || !!R.$slots["left-sidebar"] || !!R.$slots["right-sidebar"]
          }),
          style: normalizeStyle({ "--dp-menu-width": `${Y.value}px` })
        }, [
          R.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", Zl, [
            renderSlot(R.$slots, "left-sidebar", normalizeProps(guardReactiveProps(K())))
          ])) : createCommentVNode("", true),
          R.presetDates.length ? (openBlock(), createElementBlock("div", ql, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(R.presetDates, (X, Ve) => (openBlock(), createElementBlock("div", {
              key: Ve,
              style: normalizeStyle(X.style || {}),
              class: "dp--preset-range"
            }, [
              X.slot ? renderSlot(R.$slots, X.slot, {
                key: 0,
                presetDate: G,
                label: X.label,
                value: X.value
              }) : (openBlock(), createElementBlock("div", {
                key: 1,
                role: "button",
                tabindex: "0",
                onClick: (_e) => G(X.value, X.noTz),
                onKeydown: [
                  withKeys(withModifiers((_e) => G(X.value, X.noTz), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((_e) => G(X.value, X.noTz), ["prevent"]), ["space"])
                ]
              }, toDisplayString(X.label), 41, xl))
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
              ref: B
            }, o.value, {
              "flow-step": unref(x),
              onMount: unref(le),
              onUpdateFlowStep: unref(Z),
              onResetFlow: unref(v),
              onFocusMenu: P,
              onSelectDate: J[0] || (J[0] = (X) => R.$emit("select-date")),
              onTooltipOpen: J[1] || (J[1] = (X) => R.$emit("tooltip-open", X)),
              onTooltipClose: J[2] || (J[2] = (X) => R.$emit("tooltip-close", X)),
              onAutoApply: J[3] || (J[3] = (X) => R.$emit("auto-apply", X)),
              onRangeStart: J[4] || (J[4] = (X) => R.$emit("range-start", X)),
              onRangeEnd: J[5] || (J[5] = (X) => R.$emit("range-end", X)),
              onInvalidFixedRange: J[6] || (J[6] = (X) => R.$emit("invalid-fixed-range", X)),
              onTimeUpdate: J[7] || (J[7] = (X) => R.$emit("time-update")),
              onAmPmChange: J[8] || (J[8] = (X) => R.$emit("am-pm-change", X)),
              onTimePickerOpen: J[9] || (J[9] = (X) => R.$emit("time-picker-open", X)),
              onTimePickerClose: L,
              onRecalculatePosition: f,
              "onUpdate:internalModelValue": J[10] || (J[10] = (X) => R.$emit("update:internal-model-value", X))
            }), createSlots({ _: 2 }, [
              renderList(d.value, (X, Ve) => ({
                name: X,
                fn: withCtx((_e) => [
                  renderSlot(R.$slots, X, normalizeProps(guardReactiveProps({ ..._e })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          R.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", Jl, [
            renderSlot(R.$slots, "right-sidebar", normalizeProps(guardReactiveProps(K())))
          ])) : createCommentVNode("", true),
          R.$slots["action-extra"] ? (openBlock(), createElementBlock("div", Xl, [
            R.$slots["action-extra"] ? renderSlot(R.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: re
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 6),
        !R.autoApply || R.keepActionRow ? (openBlock(), createBlock(rl, mergeProps({
          key: 2,
          "menu-mount": Q.value
        }, o.value, {
          "calendar-width": Y.value,
          onClosePicker: J[11] || (J[11] = (X) => R.$emit("close-picker")),
          onSelectDate: J[12] || (J[12] = (X) => R.$emit("select-date")),
          onInvalidSelect: J[13] || (J[13] = (X) => R.$emit("invalid-select")),
          onSelectNow: re
        }), createSlots({ _: 2 }, [
          renderList(unref(E), (X, Ve) => ({
            name: X,
            fn: withCtx((_e) => [
              renderSlot(R.$slots, X, normalizeProps(guardReactiveProps({ ..._e })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
      ], 42, Gl);
    };
  }
});
var Ql = typeof window < "u" ? window : void 0;
var pn = () => {
};
var eo = (e) => getCurrentScope() ? (onScopeDispose(e), true) : false;
var to = (e, n, a, t) => {
  if (!e)
    return pn;
  let o = pn;
  const l = watch(
    () => unref(e),
    (b) => {
      o(), b && (b.addEventListener(n, a, t), o = () => {
        b.removeEventListener(n, a, t), o = pn;
      });
    },
    { immediate: true, flush: "post" }
  ), c = () => {
    l(), o();
  };
  return eo(c), c;
};
var no = (e, n, a, t = {}) => {
  const { window: o = Ql, event: l = "pointerdown" } = t;
  return o ? to(o, l, (b) => {
    const p = Ae(e), M = Ae(n);
    !p || !M || p === b.target || b.composedPath().includes(p) || b.composedPath().includes(M) || a(b);
  }, { passive: true }) : void 0;
};
var ao = defineComponent({
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
    const t = e, o = useSlots(), l = ref(false), c = toRef(t, "modelValue"), b = toRef(t, "timezone"), p = ref(null), M = ref(null), k = ref(null), T = ref(false), Y = ref(null), { setMenuFocused: q, setShiftKey: j } = Pa(), { clearArrowNav: Q } = rt(), { mapDatesArrToMap: B, validateDate: y, isValidTime: N } = Bt(t), { defaultedTransitions: U, defaultedTextInput: W, defaultedInline: A } = Ce(t), { menuTransition: x, showTransition: Z } = Yt(U);
    onMounted(() => {
      s(t.modelValue), nextTick().then(() => {
        A.value.enabled || (d(Y.value).addEventListener("scroll", F), window.addEventListener("resize", re));
      }), A.value.enabled && (l.value = true);
    });
    const le = computed(() => B());
    onUnmounted(() => {
      if (!A.value.enabled) {
        const ae = d(Y.value);
        ae && ae.removeEventListener("scroll", F), window.removeEventListener("resize", re);
      }
    });
    const v = je(o, "all", t.presetDates), D = je(o, "input");
    watch(
      [c, b],
      () => {
        s(c.value);
      },
      { deep: true }
    );
    const { openOnTop: P, menuStyle: K, xCorrect: f, setMenuPosition: E, getScrollableParent: d, shadowRender: w } = Kr(
      p,
      M,
      k,
      Y,
      A,
      a,
      t
    ), {
      inputValue: u,
      internalModelValue: h2,
      parseExternalModelValue: s,
      emitModelValue: _,
      formatInputValue: te,
      checkBeforeEmit: r
    } = zr(a, t, T), L = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: t.dark,
        dp__theme_light: !t.dark,
        dp__flex_display: A.value.enabled,
        dp__flex_display_with_input: A.value.input
      })
    ), C = computed(() => t.dark ? "dp__theme_dark" : "dp__theme_light"), g = computed(() => t.teleport ? {
      to: typeof t.teleport == "boolean" ? "body" : t.teleport,
      disabled: A.value.enabled
    } : { class: "dp__outer_menu_wrap" }), F = () => {
      l.value && (t.closeOnScroll ? _e() : E());
    }, re = () => {
      l.value && E();
    }, G = () => {
      !t.disabled && !t.readonly && (w(ua, t), E(false), l.value = true, l.value && a("open"), l.value || Ve(), s(t.modelValue));
    }, ke = () => {
      u.value = "", Ve(), a("update:model-value", null), a("update:model-timezone-value", null), a("cleared"), t.closeOnClearValue && _e();
    }, se = () => {
      const ae = h2.value;
      return !ae || !Array.isArray(ae) && y(ae) ? true : Array.isArray(ae) ? ae.length === 2 && y(ae[0]) && y(ae[1]) ? true : t.partialRange && !t.timePicker ? y(ae[0]) : false : false;
    }, R = () => {
      r() && se() ? (_(), _e()) : a("invalid-select", h2.value);
    }, J = (ae) => {
      $e(), _(), t.closeOnAutoApply && !ae && _e();
    }, $e = () => {
      k.value && W.value.enabled && k.value.setParsedDate(h2.value);
    }, X = (ae = false) => {
      t.autoApply && N(h2.value) && se() && (t.range && Array.isArray(h2.value) ? (t.partialRange || h2.value.length === 2) && J(ae) : J(ae));
    }, Ve = () => {
      W.value.enabled || (h2.value = null);
    }, _e = () => {
      A.value.enabled || (l.value && (l.value = false, f.value = false, q(false), j(false), Q(), a("closed"), u.value && s(c.value)), Ve(), a("blur"));
    }, Et = (ae, ie) => {
      if (!ae) {
        h2.value = null;
        return;
      }
      h2.value = ae, ie && (R(), a("text-submit"));
    }, Dt = () => {
      t.autoApply && N(h2.value) && _(), $e();
    }, Jt = () => l.value ? _e() : G(), Xt = (ae) => {
      h2.value = ae;
    }, Qt = () => {
      W.value.enabled && (T.value = true, te()), a("focus");
    }, en = () => {
      W.value.enabled && (T.value = false, s(t.modelValue)), a("blur");
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
    return no(
      p,
      k,
      t.onClickOutside ? () => t.onClickOutside(se) : _e
    ), n({
      closeMenu: _e,
      selectDate: R,
      clearValue: ke,
      openMenu: G,
      onScroll: F,
      formatInputValue: te,
      // exposed for testing purposes
      updateInternalModelValue: Xt,
      // modify internal modelValue
      setMonthYear: tn,
      parseModel: nn,
      switchView: an
    }), (ae, ie) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(L.value),
      ref_key: "pickerWrapperRef",
      ref: Y
    }, [
      createVNode(el, mergeProps({
        ref_key: "inputRef",
        ref: k,
        "is-menu-open": l.value,
        "input-value": unref(u),
        "onUpdate:inputValue": ie[0] || (ie[0] = (i) => isRef(u) ? u.value = i : null)
      }, ae.$props, {
        onClear: ke,
        onOpen: G,
        onSetInputDate: Et,
        onSetEmptyDate: unref(_),
        onSelectDate: R,
        onToggle: Jt,
        onClose: _e,
        onFocus: Qt,
        onBlur: en,
        onRealBlur: ie[1] || (ie[1] = (i) => T.value = false)
      }), createSlots({ _: 2 }, [
        renderList(unref(D), (i, V) => ({
          name: i,
          fn: withCtx((ne) => [
            renderSlot(ae.$slots, i, normalizeProps(guardReactiveProps(ne)))
          ])
        }))
      ]), 1040, ["is-menu-open", "input-value", "onSetEmptyDate"]),
      createVNode(Transition, {
        name: unref(x)(unref(P)),
        css: unref(Z) && !unref(A).enabled
      }, {
        default: withCtx(() => [
          l.value ? (openBlock(), createBlock(resolveDynamicComponent(ae.teleport ? Teleport : "div"), mergeProps({
            key: 0,
            ref_key: "dpWrapMenuRef",
            ref: p
          }, g.value, {
            class: { "dp--menu-wrapper": !unref(A).enabled },
            style: unref(A).enabled ? void 0 : unref(K)
          }), {
            default: withCtx(() => [
              createVNode(ua, mergeProps({
                ref_key: "dpMenuRef",
                ref: M,
                class: { [C.value]: true, "dp--menu-wrapper": ae.teleport },
                style: ae.teleport ? unref(K) : void 0,
                "open-on-top": unref(P),
                "arr-map-values": le.value
              }, ae.$props, {
                "internal-model-value": unref(h2),
                "onUpdate:internalModelValue": ie[2] || (ie[2] = (i) => isRef(h2) ? h2.value = i : null),
                onClosePicker: _e,
                onSelectDate: R,
                onAutoApply: X,
                onTimeUpdate: Dt,
                onFlowStep: ie[3] || (ie[3] = (i) => ae.$emit("flow-step", i)),
                onUpdateMonthYear: ie[4] || (ie[4] = (i) => ae.$emit("update-month-year", i)),
                onInvalidSelect: ie[5] || (ie[5] = (i) => ae.$emit("invalid-select", unref(h2))),
                onInvalidFixedRange: ie[6] || (ie[6] = (i) => ae.$emit("invalid-fixed-range", i)),
                onRecalculatePosition: unref(E),
                onTooltipOpen: ie[7] || (ie[7] = (i) => ae.$emit("tooltip-open", i)),
                onTooltipClose: ie[8] || (ie[8] = (i) => ae.$emit("tooltip-close", i)),
                onTimePickerOpen: ie[9] || (ie[9] = (i) => ae.$emit("time-picker-open", i)),
                onTimePickerClose: ie[10] || (ie[10] = (i) => ae.$emit("time-picker-close", i)),
                onAmPmChange: ie[11] || (ie[11] = (i) => ae.$emit("am-pm-change", i)),
                onRangeStart: ie[12] || (ie[12] = (i) => ae.$emit("range-start", i)),
                onRangeEnd: ie[13] || (ie[13] = (i) => ae.$emit("range-end", i))
              }), createSlots({ _: 2 }, [
                renderList(unref(v), (i, V) => ({
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
  const e = ao;
  return e.install = (n) => {
    n.component("Vue3DatePicker", e);
  }, e;
})();
var ro = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Oa
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(ro).forEach(([e, n]) => {
  e !== "default" && (Oa[e] = n);
});

export {
  Oa
};
//# sourceMappingURL=chunk-RF7UX2JJ.js.map
