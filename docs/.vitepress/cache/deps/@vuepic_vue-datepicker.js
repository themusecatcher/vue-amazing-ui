import {
  add,
  addDays,
  addMonths,
  addYears,
  differenceInCalendarDays,
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
  parseISO,
  set,
  setHours,
  setMilliseconds,
  setMinutes,
  setMonth,
  setSeconds,
  setYear,
  startOfQuarter,
  startOfWeek,
  startOfYear,
  sub,
  subMonths,
  subYears
} from "./chunk-RGSVAU2H.js";
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
} from "./chunk-2KH7SWZ4.js";
import "./chunk-LQ2VYIYD.js";

// node_modules/.pnpm/@vuepic+vue-datepicker@7.3.0_vue@3.3.10/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
function Ht() {
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
Ht.compatConfig = {
  MODE: 3
};
function Ta() {
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
Ta.compatConfig = {
  MODE: 3
};
function En() {
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
En.compatConfig = {
  MODE: 3
};
function Fn() {
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
Fn.compatConfig = {
  MODE: 3
};
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
      createBaseVNode("path", {
        d: "M16 1.333c-8.095 0-14.667 6.572-14.667 14.667s6.572 14.667 14.667 14.667c8.095 0 14.667-6.572 14.667-14.667s-6.572-14.667-14.667-14.667zM16 4c6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.623 0-12-5.377-12-12s5.377-12 12-12z"
      }),
      createBaseVNode("path", {
        d: "M14.667 8v8c0 0.505 0.285 0.967 0.737 1.193l5.333 2.667c0.658 0.329 1.46 0.062 1.789-0.596s0.062-1.46-0.596-1.789l-4.596-2.298c0 0 0-7.176 0-7.176 0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      })
    ]
  );
}
Hn.compatConfig = {
  MODE: 3
};
function Vn() {
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
Vn.compatConfig = {
  MODE: 3
};
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
      createBaseVNode("path", {
        d: "M7.057 12.943l8 8c0.521 0.521 1.365 0.521 1.885 0l8-8c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-7.057 7.057c0 0-7.057-7.057-7.057-7.057-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
Un.compatConfig = {
  MODE: 3
};
function Ln(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Aa = { exports: {} };
(function(e) {
  function t(r) {
    return r && r.__esModule ? r : {
      default: r
    };
  }
  e.exports = t, e.exports.__esModule = true, e.exports.default = e.exports;
})(Aa);
var cr = Aa.exports;
var An = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: true
  }), t.default = r;
  function r(a) {
    if (a === null || a === true || a === false)
      return NaN;
    var n = Number(a);
    return isNaN(n) ? n : n < 0 ? Math.ceil(n) : Math.floor(n);
  }
  e.exports = t.default;
})(An, An.exports);
var fr = An.exports;
var vr = Ln(fr);
var Sn = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: true
  }), t.default = r;
  function r(a) {
    var n = new Date(Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds(), a.getMilliseconds()));
    return n.setUTCFullYear(a.getFullYear()), a.getTime() - n.getTime();
  }
  e.exports = t.default;
})(Sn, Sn.exports);
var mr = Sn.exports;
var ta = Ln(mr);
function gr(e, t) {
  var r = br(t);
  return r.formatToParts ? hr(r, e) : pr(r, e);
}
var yr = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function hr(e, t) {
  try {
    for (var r = e.formatToParts(t), a = [], n = 0; n < r.length; n++) {
      var o = yr[r[n].type];
      o >= 0 && (a[o] = parseInt(r[n].value, 10));
    }
    return a;
  } catch (i) {
    if (i instanceof RangeError)
      return [NaN];
    throw i;
  }
}
function pr(e, t) {
  var r = e.format(t).replace(/\u200E/g, ""), a = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(r);
  return [a[3], a[1], a[2], a[4], a[5], a[6]];
}
var fn = {};
function br(e) {
  if (!fn[e]) {
    var t = new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: "America/New_York",
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), r = t === "06/25/2014, 00:00:00" || t === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
    fn[e] = r ? new Intl.DateTimeFormat("en-US", {
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
  return fn[e];
}
function Wn(e, t, r, a, n, o, i) {
  var c = /* @__PURE__ */ new Date(0);
  return c.setUTCFullYear(e, t, r), c.setUTCHours(a, n, o, i), c;
}
var na = 36e5;
var kr = 6e4;
var vn = {
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-]\d{2}):?(\d{2})$/
};
function zn(e, t, r) {
  var a, n;
  if (e === "" || (a = vn.timezoneZ.exec(e), a))
    return 0;
  var o;
  if (a = vn.timezoneHH.exec(e), a)
    return o = parseInt(a[1], 10), aa(o) ? -(o * na) : NaN;
  if (a = vn.timezoneHHMM.exec(e), a) {
    o = parseInt(a[1], 10);
    var i = parseInt(a[2], 10);
    return aa(o, i) ? (n = Math.abs(o) * na + i * kr, o > 0 ? -n : n) : NaN;
  }
  if (Mr(e)) {
    t = new Date(t || Date.now());
    var c = r ? t : wr(t), p = Pn(c, e), T = r ? p : Dr(t, p, e);
    return -T;
  }
  return NaN;
}
function wr(e) {
  return Wn(
    e.getFullYear(),
    e.getMonth(),
    e.getDate(),
    e.getHours(),
    e.getMinutes(),
    e.getSeconds(),
    e.getMilliseconds()
  );
}
function Pn(e, t) {
  var r = gr(e, t), a = Wn(
    r[0],
    r[1] - 1,
    r[2],
    r[3] % 24,
    r[4],
    r[5],
    0
  ).getTime(), n = e.getTime(), o = n % 1e3;
  return n -= o >= 0 ? o : 1e3 + o, a - n;
}
function Dr(e, t, r) {
  var a = e.getTime(), n = a - t, o = Pn(new Date(n), r);
  if (t === o)
    return t;
  n -= o - t;
  var i = Pn(new Date(n), r);
  return o === i ? o : Math.max(o, i);
}
function aa(e, t) {
  return -23 <= e && e <= 23 && (t == null || 0 <= t && t <= 59);
}
var ra = {};
function Mr(e) {
  if (ra[e])
    return true;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e }), ra[e] = true, true;
  } catch {
    return false;
  }
}
var Sa = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
var mn = 36e5;
var la = 6e4;
var $r = 2;
var Ee = {
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
  timeZone: Sa
};
function Cn(e, t) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e === null)
    return /* @__PURE__ */ new Date(NaN);
  var r = t || {}, a = r.additionalDigits == null ? $r : vr(r.additionalDigits);
  if (a !== 2 && a !== 1 && a !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]")
    return new Date(e.getTime());
  if (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]")
    return new Date(e);
  if (!(typeof e == "string" || Object.prototype.toString.call(e) === "[object String]"))
    return /* @__PURE__ */ new Date(NaN);
  var n = Tr(e), o = Ar(n.date, a), i = o.year, c = o.restDateString, p = Sr(c, i);
  if (isNaN(p))
    return /* @__PURE__ */ new Date(NaN);
  if (p) {
    var T = p.getTime(), D = 0, I;
    if (n.time && (D = Pr(n.time), isNaN(D)))
      return /* @__PURE__ */ new Date(NaN);
    if (n.timeZone || r.timeZone) {
      if (I = zn(n.timeZone || r.timeZone, new Date(T + D)), isNaN(I))
        return /* @__PURE__ */ new Date(NaN);
    } else
      I = ta(new Date(T + D)), I = ta(new Date(T + D + I));
    return new Date(T + D + I);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function Tr(e) {
  var t = {}, r = Ee.dateTimePattern.exec(e), a;
  if (r ? (t.date = r[1], a = r[3]) : (r = Ee.datePattern.exec(e), r ? (t.date = r[1], a = r[2]) : (t.date = null, a = e)), a) {
    var n = Ee.timeZone.exec(a);
    n ? (t.time = a.replace(n[1], ""), t.timeZone = n[1].trim()) : t.time = a;
  }
  return t;
}
function Ar(e, t) {
  var r = Ee.YYY[t], a = Ee.YYYYY[t], n;
  if (n = Ee.YYYY.exec(e) || a.exec(e), n) {
    var o = n[1];
    return {
      year: parseInt(o, 10),
      restDateString: e.slice(o.length)
    };
  }
  if (n = Ee.YY.exec(e) || r.exec(e), n) {
    var i = n[1];
    return {
      year: parseInt(i, 10) * 100,
      restDateString: e.slice(i.length)
    };
  }
  return {
    year: null
  };
}
function Sr(e, t) {
  if (t === null)
    return null;
  var r, a, n, o;
  if (e.length === 0)
    return a = /* @__PURE__ */ new Date(0), a.setUTCFullYear(t), a;
  if (r = Ee.MM.exec(e), r)
    return a = /* @__PURE__ */ new Date(0), n = parseInt(r[1], 10) - 1, sa(t, n) ? (a.setUTCFullYear(t, n), a) : /* @__PURE__ */ new Date(NaN);
  if (r = Ee.DDD.exec(e), r) {
    a = /* @__PURE__ */ new Date(0);
    var i = parseInt(r[1], 10);
    return Rr(t, i) ? (a.setUTCFullYear(t, 0, i), a) : /* @__PURE__ */ new Date(NaN);
  }
  if (r = Ee.MMDD.exec(e), r) {
    a = /* @__PURE__ */ new Date(0), n = parseInt(r[1], 10) - 1;
    var c = parseInt(r[2], 10);
    return sa(t, n, c) ? (a.setUTCFullYear(t, n, c), a) : /* @__PURE__ */ new Date(NaN);
  }
  if (r = Ee.Www.exec(e), r)
    return o = parseInt(r[1], 10) - 1, ia(t, o) ? oa(t, o) : /* @__PURE__ */ new Date(NaN);
  if (r = Ee.WwwD.exec(e), r) {
    o = parseInt(r[1], 10) - 1;
    var p = parseInt(r[2], 10) - 1;
    return ia(t, o, p) ? oa(t, o, p) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function Pr(e) {
  var t, r, a;
  if (t = Ee.HH.exec(e), t)
    return r = parseFloat(t[1].replace(",", ".")), gn(r) ? r % 24 * mn : NaN;
  if (t = Ee.HHMM.exec(e), t)
    return r = parseInt(t[1], 10), a = parseFloat(t[2].replace(",", ".")), gn(r, a) ? r % 24 * mn + a * la : NaN;
  if (t = Ee.HHMMSS.exec(e), t) {
    r = parseInt(t[1], 10), a = parseInt(t[2], 10);
    var n = parseFloat(t[3].replace(",", "."));
    return gn(r, a, n) ? r % 24 * mn + a * la + n * 1e3 : NaN;
  }
  return null;
}
function oa(e, t, r) {
  t = t || 0, r = r || 0;
  var a = /* @__PURE__ */ new Date(0);
  a.setUTCFullYear(e, 0, 4);
  var n = a.getUTCDay() || 7, o = t * 7 + r + 1 - n;
  return a.setUTCDate(a.getUTCDate() + o), a;
}
var Cr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var _r = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Pa(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function sa(e, t, r) {
  if (t < 0 || t > 11)
    return false;
  if (r != null) {
    if (r < 1)
      return false;
    var a = Pa(e);
    if (a && r > _r[t] || !a && r > Cr[t])
      return false;
  }
  return true;
}
function Rr(e, t) {
  if (t < 1)
    return false;
  var r = Pa(e);
  return !(r && t > 366 || !r && t > 365);
}
function ia(e, t, r) {
  return !(t < 0 || t > 52 || r != null && (r < 0 || r > 6));
}
function gn(e, t, r) {
  return !(e != null && (e < 0 || e >= 25) || t != null && (t < 0 || t >= 60) || r != null && (r < 0 || r >= 60));
}
var _n = { exports: {} };
var Rn = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: true
  }), t.default = r;
  function r(a, n) {
    if (a == null)
      throw new TypeError("assign requires that input parameter not be null or undefined");
    for (var o in n)
      Object.prototype.hasOwnProperty.call(n, o) && (a[o] = n[o]);
    return a;
  }
  e.exports = t.default;
})(Rn, Rn.exports);
var Or = Rn.exports;
(function(e, t) {
  var r = cr.default;
  Object.defineProperty(t, "__esModule", {
    value: true
  }), t.default = n;
  var a = r(Or);
  function n(o) {
    return (0, a.default)({}, o);
  }
  e.exports = t.default;
})(_n, _n.exports);
var Yr = _n.exports;
var Nr = Ln(Yr);
function Ir(e, t, r) {
  var a = Cn(e, r), n = zn(t, a, true), o = new Date(a.getTime() - n), i = /* @__PURE__ */ new Date(0);
  return i.setFullYear(o.getUTCFullYear(), o.getUTCMonth(), o.getUTCDate()), i.setHours(o.getUTCHours(), o.getUTCMinutes(), o.getUTCSeconds(), o.getUTCMilliseconds()), i;
}
function Br(e, t, r) {
  if (typeof e == "string" && !e.match(Sa)) {
    var a = Nr(r);
    return a.timeZone = t, Cn(e, a);
  }
  var n = Cn(e, r), o = Wn(
    n.getFullYear(),
    n.getMonth(),
    n.getDate(),
    n.getHours(),
    n.getMinutes(),
    n.getSeconds(),
    n.getMilliseconds()
  ).getTime(), i = zn(t, new Date(o));
  return new Date(o + i);
}
function ua(e) {
  return (t) => new Intl.DateTimeFormat(e, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`)).slice(0, 2);
}
function Er(e) {
  return (t) => format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`), "EEEEEE", { locale: e });
}
var Fr = (e, t, r) => {
  const a = [1, 2, 3, 4, 5, 6, 7];
  let n;
  if (e !== null)
    try {
      n = a.map(Er(e));
    } catch {
      n = a.map(ua(t));
    }
  else
    n = a.map(ua(t));
  const o = n.slice(0, r), i = n.slice(r + 1, n.length);
  return [n[r]].concat(...i).concat(...o);
};
var jn = (e, t) => {
  const r = [];
  for (let a = +e[0]; a <= +e[1]; a++)
    r.push({ value: +a, text: `${a}` });
  return t ? r.reverse() : r;
};
var Ca = (e, t, r) => {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((o) => {
    const i = o < 10 ? `0${o}` : o;
    return /* @__PURE__ */ new Date(`2017-${i}-01T00:00:00+00:00`);
  });
  if (e !== null)
    try {
      const o = r === "long" ? "MMMM" : "MMM";
      return a.map((i, c) => {
        const p = format(i, o, { locale: e });
        return {
          text: p.charAt(0).toUpperCase() + p.substring(1),
          value: c
        };
      });
    } catch {
    }
  const n = new Intl.DateTimeFormat(t, { month: r, timeZone: "UTC" });
  return a.map((o, i) => {
    const c = n.format(o);
    return {
      text: c.charAt(0).toUpperCase() + c.substring(1),
      value: i
    };
  });
};
var Hr = (e) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e];
var Pe = (e) => {
  const t = unref(e);
  return t != null && t.$el ? t == null ? void 0 : t.$el : t;
};
var Vr = (e) => Object.assign({ type: "dot" }, e);
var _a = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : false;
var Jt = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
};
var Se = (e) => e;
var da = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e;
var ca = (e) => e === null;
var Ur = (e) => {
  if (e)
    return [...e.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var Lr = (e) => {
  const t = [], r = (a) => a.filter((n) => n);
  for (let a = 0; a < e.length; a += 3) {
    const n = [e[a], e[a + 1], e[a + 2]];
    t.push(r(n));
  }
  return t;
};
var Et = (e, t, r) => {
  const a = r ?? r === 0, n = t ?? t === 0;
  if (!a && !n)
    return false;
  const o = +r, i = +t;
  return a && n ? +e > o || +e < i : a ? +e > o : n ? +e < i : false;
};
var St = (e, t) => Lr(e).map((r) => r.map((a) => {
  const { active: n, disabled: o, isBetween: i, highlighted: c } = t(a);
  return {
    ...a,
    active: n,
    disabled: o,
    className: {
      dp__overlay_cell_active: n,
      dp__overlay_cell: !n,
      dp__overlay_cell_disabled: o,
      dp__overlay_cell_pad: true,
      dp__overlay_cell_active_disabled: o && n,
      dp__cell_in_between: i,
      "dp--highlighted": c
    }
  };
}));
var ut = (e, t, r = false) => {
  e && t.allowStopPropagation && (r && e.stopImmediatePropagation(), e.stopPropagation());
};
var Wr = (e) => {
  if (e.nextElementSibling)
    return e.nextElementSibling;
  for (; e.parentElement && !e.parentElement.nextElementSibling; )
    e = e.parentElement;
  return e.parentElement ? e.parentElement.nextElementSibling : null;
};
var zr = (e) => {
  if (!e)
    return false;
  const t = [
    "a[href]",
    "area[href]",
    "input:not([disabled]):not([type='hidden'])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "button:not([disabled])",
    "[tabindex]:not([tabindex='-1'])"
  ], r = e.matches(t.join(", ")), a = e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0;
  return r && a;
};
var jr = (e) => {
  if (!e)
    return null;
  let t = e;
  for (; t; )
    if (t = Wr(t), zr(t))
      return t;
  return null;
};
var fa = (e, t, r, a, n) => {
  const o = parse(e, t.slice(0, e.length), /* @__PURE__ */ new Date());
  return isValid(o) && isDate(o) ? a || n ? o : set(o, {
    hours: +r.hours,
    minutes: +(r == null ? void 0 : r.minutes),
    seconds: +(r == null ? void 0 : r.seconds),
    milliseconds: 0
  }) : null;
};
var Kr = (e, t, r, a, n) => {
  const o = Array.isArray(r) ? r[0] : r;
  if (typeof t == "string")
    return fa(e, t, o, a, n);
  if (Array.isArray(t)) {
    let i = null;
    for (const c of t)
      if (i = fa(e, c, o, a, n), i)
        break;
    return i;
  }
  return typeof t == "function" ? t(e) : null;
};
var E = (e) => e ? new Date(e) : /* @__PURE__ */ new Date();
var Gr = (e, t, r) => {
  if (t) {
    const n = (e.getMonth() + 1).toString().padStart(2, "0"), o = e.getDate().toString().padStart(2, "0"), i = e.getHours().toString().padStart(2, "0"), c = e.getMinutes().toString().padStart(2, "0"), p = r ? e.getSeconds().toString().padStart(2, "0") : "00";
    return `${e.getFullYear()}-${n}-${o}T${i}:${c}:${p}.000Z`;
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
var Ve = (e) => {
  let t = E(JSON.parse(JSON.stringify(e)));
  return t = setHours(t, 0), t = setMinutes(t, 0), t = setSeconds(t, 0), t = setMilliseconds(t, 0), t;
};
var dt = (e, t, r, a) => {
  let n = e ? E(e) : E();
  return (t || t === 0) && (n = setHours(n, +t)), (r || r === 0) && (n = setMinutes(n, +r)), (a || a === 0) && (n = setSeconds(n, +a)), setMilliseconds(n, 0);
};
var Re = (e, t) => !e || !t ? false : isBefore(Ve(e), Ve(t));
var be = (e, t) => !e || !t ? false : isEqual(Ve(e), Ve(t));
var Ie = (e, t) => !e || !t ? false : isAfter(Ve(e), Ve(t));
var xt = (e, t, r) => e != null && e[0] && (e != null && e[1]) ? Ie(r, e[0]) && Re(r, e[1]) : e != null && e[0] && t ? Ie(r, e[0]) && Re(r, t) || Re(r, e[0]) && Ie(r, t) : false;
var qe = (e) => {
  const t = set(new Date(e), { date: 1 });
  return Ve(t);
};
var yn = (e, t, r) => t && (r || r === 0) ? Object.fromEntries(
  ["hours", "minutes", "seconds"].map((a) => a === t ? [a, r] : [a, isNaN(+e[a]) ? void 0 : +e[a]])
) : {
  hours: isNaN(+e.hours) ? void 0 : +e.hours,
  minutes: isNaN(+e.minutes) ? void 0 : +e.minutes,
  seconds: isNaN(+e.seconds) ? void 0 : +e.seconds
};
var bt = (e) => ({
  hours: getHours(e),
  minutes: getMinutes(e),
  seconds: getSeconds(e)
});
var Ra = (e, t) => {
  if (t) {
    const r = getYear(E(t));
    if (r > e)
      return 12;
    if (r === e)
      return getMonth(E(t));
  }
};
var Oa = (e, t) => {
  if (t) {
    const r = getYear(E(t));
    return r < e ? -1 : r === e ? getMonth(E(t)) : void 0;
  }
};
var Pt = (e) => {
  if (e)
    return getYear(E(e));
};
var Xe = (e, t) => t ? Ir(e, t) : e;
var Ya = (e, t) => t ? Br(e, t) : e;
var qr = (e) => e instanceof Date ? e : parseISO(e);
var Na = (e, t) => {
  const r = Ie(e, t) ? t : e, a = Ie(t, e) ? t : e;
  return eachDayOfInterval({ start: r, end: a });
};
var Zr = (e) => {
  const t = addMonths(e, 1);
  return { month: getMonth(t), year: getYear(t) };
};
var Qt = (e, t, r) => {
  const a = startOfWeek(Xe(e, t), { weekStartsOn: +r }), n = endOfWeek(Xe(e, t), { weekStartsOn: +r });
  return [a, n];
};
var Ia = (e, t) => {
  const r = {
    hours: getHours(E()),
    minutes: getMinutes(E()),
    seconds: t ? getSeconds(E()) : 0
  };
  return Object.assign(r, e);
};
var st = (e, t, r) => [set(E(e), { date: 1 }), set(E(), { month: t, year: r, date: 1 })];
var rt = (e, t, r) => {
  let a = e ? E(e) : E();
  return (t || t === 0) && (a = setMonth(a, t)), r && (a = setYear(a, r)), a;
};
var Ba = (e, t, r, a, n) => {
  if (!a || n && !t || !n && !r)
    return false;
  const o = n ? addMonths(e, 1) : subMonths(e, 1), i = [getMonth(o), getYear(o)];
  return n ? !Xr(...i, t) : !Qr(...i, r);
};
var Qr = (e, t, r) => Re(...st(r, e, t)) || be(...st(r, e, t));
var Xr = (e, t, r) => Ie(...st(r, e, t)) || be(...st(r, e, t));
var Ea = (e, t, r, a, n, o, i) => {
  if (typeof t == "function" && !i)
    return t(e);
  const c = r ? { locale: r } : void 0;
  return Array.isArray(e) ? `${format(e[0], o, c)}${n && !e[1] ? "" : a}${e[1] ? format(e[1], o, c) : ""}` : format(e, o, c);
};
var Mt = (e) => {
  if (e)
    return null;
  throw new Error(Jt.prop("partial-range"));
};
var jt = (e, t) => {
  if (t)
    return e();
  throw new Error(Jt.prop("range"));
};
var On = (e) => Array.isArray(e) ? isValid(e[0]) && (e[1] ? isValid(e[1]) : true) : e ? isValid(e) : false;
var Jr = (e, t) => set(t ?? E(), {
  hours: +e.hours || 0,
  minutes: +e.minutes || 0,
  seconds: +e.seconds || 0
});
var hn = (e, t, r, a) => {
  if (!e)
    return true;
  if (a) {
    const n = r === "max" ? isBefore(e, t) : isAfter(e, t), o = { seconds: 0, milliseconds: 0 };
    return n || isEqual(set(e, o), set(t, o));
  }
  return r === "max" ? e.getTime() <= t.getTime() : e.getTime() >= t.getTime();
};
var pn = (e, t, r) => e ? Jr(e, t) : E(r ?? t);
var va = (e, t, r, a, n) => {
  if (Array.isArray(a)) {
    const i = pn(e, a[0], t), c = pn(e, a[1], t);
    return hn(a[0], i, r, !!t) && hn(a[1], c, r, !!t) && n;
  }
  const o = pn(e, a, t);
  return hn(a, o, r, !!t) && n;
};
var bn = (e) => set(E(), bt(e));
var xr = (e, t) => Array.isArray(e) ? e.map((r) => E(r)).filter((r) => getYear(E(r)) === t).map((r) => getMonth(r)) : [];
var Fa = (e, t, r) => typeof e == "function" ? e({ month: t, year: r }) : !!e.months.find((a) => a.month === t && a.year === r);
var Kn = (e, t) => typeof e == "function" ? e(t) : e.years.includes(t);
var Ot = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Ha = () => {
  const e = (a) => {
    Ot.menuFocused = a;
  }, t = (a) => {
    Ot.shiftKeyInMenu !== a && (Ot.shiftKeyInMenu = a);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: Ot.shiftKeyInMenu, menuFocused: Ot.menuFocused })),
    setMenuFocused: e,
    setShiftKey: t
  };
};
var Me = reactive({
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
var kn = ref(null);
var Kt = ref(false);
var wn = ref(false);
var Dn = ref(false);
var Mn = ref(false);
var Be = ref(0);
var _e = ref(0);
var vt = () => {
  const e = computed(() => Kt.value ? [...Me.selectionGrid, Me.actionRow].filter((y) => y.length) : wn.value ? [
    ...Me.timePicker[0],
    ...Me.timePicker[1],
    Mn.value ? [] : [kn.value],
    Me.actionRow
  ].filter((y) => y.length) : Dn.value ? [...Me.monthPicker, Me.actionRow] : [Me.monthYear, ...Me.calendar, Me.time, Me.actionRow].filter((y) => y.length)), t = (y) => {
    Be.value = y ? Be.value + 1 : Be.value - 1;
    let S = null;
    e.value[_e.value] && (S = e.value[_e.value][Be.value]), S || (Be.value = y ? Be.value - 1 : Be.value + 1);
  }, r = (y) => {
    if (_e.value === 0 && !y || _e.value === e.value.length && y)
      return;
    _e.value = y ? _e.value + 1 : _e.value - 1, e.value[_e.value] ? e.value[_e.value] && !e.value[_e.value][Be.value] && Be.value !== 0 && (Be.value = e.value[_e.value].length - 1) : _e.value = y ? _e.value - 1 : _e.value + 1;
  }, a = (y) => {
    let S = null;
    e.value[_e.value] && (S = e.value[_e.value][Be.value]), S ? S.focus({ preventScroll: !Kt.value }) : Be.value = y ? Be.value - 1 : Be.value + 1;
  }, n = () => {
    t(true), a(true);
  }, o = () => {
    t(false), a(false);
  }, i = () => {
    r(false), a(true);
  }, c = () => {
    r(true), a(true);
  }, p = (y, S) => {
    Me[S] = y;
  }, T = (y, S) => {
    Me[S] = y;
  }, D = () => {
    Be.value = 0, _e.value = 0;
  };
  return {
    buildMatrix: p,
    buildMultiLevelMatrix: T,
    setTimePickerBackRef: (y) => {
      kn.value = y;
    },
    setSelectionGrid: (y) => {
      Kt.value = y, D(), y || (Me.selectionGrid = []);
    },
    setTimePicker: (y, S = false) => {
      wn.value = y, Mn.value = S, D(), y || (Me.timePicker[0] = [], Me.timePicker[1] = []);
    },
    setTimePickerElements: (y, S = 0) => {
      Me.timePicker[S] = y;
    },
    arrowRight: n,
    arrowLeft: o,
    arrowUp: i,
    arrowDown: c,
    clearArrowNav: () => {
      Me.monthYear = [], Me.calendar = [], Me.time = [], Me.actionRow = [], Me.selectionGrid = [], Me.timePicker[0] = [], Me.timePicker[1] = [], Kt.value = false, wn.value = false, Mn.value = false, Dn.value = false, D(), kn.value = null;
    },
    setMonthPicker: (y) => {
      Dn.value = y, D();
    },
    refSets: Me
    // exposed for testing
  };
};
var ma = (e) => ({
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
var el = (e) => ({
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
  day: () => "",
  ...e ?? {}
});
var ga = (e) => e ? typeof e == "boolean" ? e ? 2 : 0 : +e >= 2 ? +e : 2 : 0;
var tl = (e) => {
  const t = typeof e == "object" && e, r = {
    static: true,
    solo: false
  };
  if (!e)
    return { ...r, count: ga(false) };
  const a = t ? e : {}, n = t ? a.count ?? true : e, o = ga(n);
  return Object.assign(r, a, { count: o });
};
var nl = (e, t, r) => e || (typeof r == "string" ? r : t);
var al = (e) => typeof e == "boolean" ? e ? ma({}) : false : ma(e);
var rl = (e) => {
  const t = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: true,
    selectOnFocus: false,
    rangeSeparator: " - "
  };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : { ...t, enabled: e };
};
var ll = (e) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...e ?? {}
});
var ol = (e) => ({
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  ...e ?? {}
});
var sl = (e) => {
  const t = { input: false };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : {
    enabled: e,
    ...t
  };
};
var il = (e) => ({ ...{
  allowStopPropagation: true,
  closeOnScroll: false,
  modeHeight: 255,
  allowPreventDefault: false,
  closeOnClearValue: true,
  closeOnAutoApply: true,
  noSwipe: false,
  keepActionRow: false,
  onClickOutside: void 0,
  tabOutClosesMenu: true
}, ...e ?? {} });
var ul = (e, t, r) => {
  const a = {
    dates: Array.isArray(e) ? e.map((n) => E(n)) : [],
    years: [],
    months: [],
    quarters: [],
    weeks: [],
    weekdays: t,
    options: { highlightDisabled: r }
  };
  return typeof e == "function" ? e : { ...a, ...e ?? {} };
};
var dl = (e) => typeof e == "object" ? {
  type: e.type,
  hideOnOffsetDates: e.hideOnOffsetDates ?? false
} : {
  type: e,
  hideOnOffsetDates: false
};
var Ae = (e) => {
  const t = () => {
    const y = e.enableSeconds ? ":ss" : "";
    return e.is24 ? `HH:mm${y}` : `hh:mm${y} aa`;
  }, r = () => e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? t() : e.weekPicker ? "MM/dd/yyyy" : e.yearPicker ? "yyyy" : e.quarterPicker ? "QQQ/yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${t()}` : "MM/dd/yyyy", a = (y) => Ia(y, e.enableSeconds), n = () => e.range ? e.startTime && Array.isArray(e.startTime) ? [a(e.startTime[0]), a(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? a(e.startTime) : null, o = computed(() => tl(e.multiCalendars)), i = computed(() => n()), c = computed(() => el(e.ariaLabels)), p = computed(() => ll(e.filters)), T = computed(() => al(e.transitions)), D = computed(() => ol(e.actionRow)), I = computed(
    () => nl(e.previewFormat, e.format, r())
  ), k = computed(() => rl(e.textInput)), F = computed(() => sl(e.inline)), _ = computed(() => il(e.config)), A = computed(
    () => ul(e.highlight, e.highlightWeekDays, e.highlightDisabledDays)
  ), x = computed(() => dl(e.weekNumbers));
  return {
    defaultedTransitions: T,
    defaultedMultiCalendars: o,
    defaultedStartTime: i,
    defaultedAriaLabels: c,
    defaultedFilters: p,
    defaultedActionRow: D,
    defaultedPreviewFormat: I,
    defaultedTextInput: k,
    defaultedInline: F,
    defaultedConfig: _,
    defaultedHighlight: A,
    defaultedWeekNumbers: x,
    getDefaultPattern: r,
    getDefaultStartTime: n
  };
};
var cl = (e, t, r) => {
  const a = ref(), { defaultedTextInput: n, getDefaultPattern: o } = Ae(t), i = ref(""), c = toRef(t, "format");
  watch(a, () => {
    e("internal-model-change", a.value);
  }), watch(c, () => {
    ae();
  });
  const p = (s) => Ya(s, t.timezone), T = (s) => Xe(s, t.timezone), D = (s, J, ce = false) => Ea(
    s,
    t.format,
    t.formatLocale,
    n.value.rangeSeparator,
    t.modelAuto,
    J ?? o(),
    ce
  ), I = (s) => s ? t.modelType ? d(s) : {
    hours: getHours(s),
    minutes: getMinutes(s),
    seconds: t.enableSeconds ? getSeconds(s) : 0
  } : null, k = (s) => t.modelType ? d(s) : { month: getMonth(s), year: getYear(s) }, F = (s) => Array.isArray(s) ? t.multiDates ? s.map((J) => _(J, setYear(E(), J))) : jt(
    () => [
      setYear(E(), s[0]),
      s[1] ? setYear(E(), s[1]) : Mt(t.partialRange)
    ],
    t.range
  ) : setYear(E(), +s), _ = (s, J) => (typeof s == "string" || typeof s == "number") && t.modelType ? C(s) : J, A = (s) => Array.isArray(s) ? [
    _(
      s[0],
      dt(null, +s[0].hours, +s[0].minutes, s[0].seconds)
    ),
    _(
      s[1],
      dt(null, +s[1].hours, +s[1].minutes, s[1].seconds)
    )
  ] : _(s, dt(null, s.hours, s.minutes, s.seconds)), x = (s) => Array.isArray(s) ? t.multiDates ? s.map((J) => _(J, rt(null, +J.month, +J.year))) : jt(
    () => [
      _(s[0], rt(null, +s[0].month, +s[0].year)),
      _(
        s[1],
        s[1] ? rt(null, +s[1].month, +s[1].year) : Mt(t.partialRange)
      )
    ],
    t.range
  ) : _(s, rt(null, +s.month, +s.year)), y = (s) => {
    if (Array.isArray(s))
      return s.map((J) => C(J));
    throw new Error(Jt.dateArr("multi-dates"));
  }, S = (s) => {
    if (Array.isArray(s))
      return [E(s[0]), E(s[1])];
    throw new Error(Jt.dateArr("week-picker"));
  }, B = (s) => t.modelAuto ? Array.isArray(s) ? [C(s[0]), C(s[1])] : t.autoApply ? [C(s)] : [C(s), null] : Array.isArray(s) ? jt(
    () => [
      C(s[0]),
      s[1] ? C(s[1]) : Mt(t.partialRange)
    ],
    t.range
  ) : C(s), b = () => {
    Array.isArray(a.value) && t.range && a.value.length === 1 && a.value.push(Mt(t.partialRange));
  }, R = () => {
    const s = a.value;
    return [
      d(s[0]),
      s[1] ? d(s[1]) : Mt(t.partialRange)
    ];
  }, G = () => a.value[1] ? R() : d(Se(a.value[0])), ee = () => (a.value || []).map((s) => d(s)), q = () => (b(), t.modelAuto ? G() : t.multiDates ? ee() : Array.isArray(a.value) ? jt(() => R(), t.range) : d(Se(a.value))), fe = (s) => !s || Array.isArray(s) && !s.length ? null : t.timePicker ? A(Se(s)) : t.monthPicker ? x(Se(s)) : t.yearPicker ? F(Se(s)) : t.multiDates ? y(Se(s)) : t.weekPicker ? S(Se(s)) : B(Se(s)), H = (s) => {
    const J = fe(s);
    On(Se(J)) ? (a.value = Se(J), ae()) : (a.value = null, i.value = "");
  }, f = () => {
    const s = (J) => format(J, n.value.format);
    return `${s(a.value[0])} ${n.value.rangeSeparator} ${a.value[1] ? s(a.value[1]) : ""}`;
  }, M = () => r.value && a.value ? Array.isArray(a.value) ? f() : format(a.value, n.value.format) : D(a.value), V = () => a.value ? t.multiDates ? a.value.map((s) => D(s)).join("; ") : n.value.enabled && typeof n.value.format == "string" ? M() : D(a.value) : "", ae = () => {
    !t.format || typeof t.format == "string" || n.value.enabled && typeof n.value.format == "string" ? i.value = V() : i.value = t.format(a.value);
  }, C = (s) => {
    if (t.utc) {
      const J = new Date(s);
      return t.utc === "preserve" ? new Date(J.getTime() + J.getTimezoneOffset() * 6e4) : J;
    }
    return t.modelType ? t.modelType === "date" || t.modelType === "timestamp" ? T(new Date(s)) : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? parse(s, o(), /* @__PURE__ */ new Date()) : T(parse(s, t.modelType, /* @__PURE__ */ new Date())) : T(new Date(s));
  }, d = (s) => s ? t.utc ? Gr(s, t.utc === "preserve", t.enableSeconds) : t.modelType ? t.modelType === "timestamp" ? +p(s) : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? D(p(s)) : D(p(s), t.modelType, true) : p(s) : "", P = (s, J = false) => {
    if (e("update:model-value", s), t.emitTimezone && J) {
      const ce = Array.isArray(s) ? s.map(($) => Xe(Se($)), t.emitTimezone) : Xe(Se(s), t.emitTimezone);
      e("update:model-timezone-value", ce);
    }
  }, X = (s) => Array.isArray(a.value) ? t.multiDates ? a.value.map((J) => s(J)) : [
    s(a.value[0]),
    a.value[1] ? s(a.value[1]) : Mt(t.partialRange)
  ] : s(Se(a.value)), h2 = (s) => P(Se(X(s)));
  return {
    inputValue: i,
    internalModelValue: a,
    checkBeforeEmit: () => a.value ? t.range ? t.partialRange ? a.value.length >= 1 : a.value.length === 2 : !!a.value : false,
    parseExternalModelValue: H,
    formatInputValue: ae,
    emitModelValue: () => (ae(), t.monthPicker ? h2(k) : t.timePicker ? h2(I) : t.yearPicker ? h2(getYear) : t.weekPicker ? P(
      a.value.map((s) => d(s)),
      true
    ) : P(q(), true))
  };
};
var fl = (e, t) => {
  const { defaultedFilters: r } = Ae(e), { validateMonthYearInRange: a } = Dt(e), n = (T, D) => {
    let I = T;
    return r.value.months.includes(getMonth(I)) ? (I = D ? addMonths(T, 1) : subMonths(T, 1), n(I, D)) : I;
  }, o = (T, D) => {
    let I = T;
    return r.value.years.includes(getYear(I)) ? (I = D ? addYears(T, 1) : subYears(T, 1), o(I, D)) : I;
  }, i = (T, D = false) => {
    const I = set(/* @__PURE__ */ new Date(), { month: e.month, year: e.year });
    let k = T ? addMonths(I, 1) : subMonths(I, 1);
    e.disableYearSelect && (k = setYear(k, e.year));
    let F = getMonth(k), _ = getYear(k);
    r.value.months.includes(F) && (k = n(k, T), F = getMonth(k), _ = getYear(k)), r.value.years.includes(_) && (k = o(k, T), _ = getYear(k)), a(F, _, T, e.preventMinMaxNavigation) && c(F, _, D);
  }, c = (T, D, I) => {
    t("update-month-year", { month: T, year: D, fromNav: I });
  }, p = computed(() => (T) => Ba(
    set(/* @__PURE__ */ new Date(), { month: e.month, year: e.year }),
    e.maxDate,
    e.minDate,
    e.preventMinMaxNavigation,
    T
  ));
  return { handleMonthYearChange: i, isDisabled: p, updateMonthYear: c };
};
var $t = ((e) => (e.center = "center", e.left = "left", e.right = "right", e))($t || {});
var Ge = ((e) => (e.month = "month", e.year = "year", e))(Ge || {});
var yt = ((e) => (e.top = "top", e.bottom = "bottom", e))(yt || {});
var kt = ((e) => (e.header = "header", e.calendar = "calendar", e.timePicker = "timePicker", e))(kt || {});
var et = ((e) => (e.month = "month", e.year = "year", e.calendar = "calendar", e.time = "time", e.minutes = "minutes", e.hours = "hours", e.seconds = "seconds", e))(et || {});
var vl = ({
  menuRef: e,
  menuRefInner: t,
  inputRef: r,
  pickerWrapperRef: a,
  inline: n,
  emit: o,
  props: i,
  slots: c
}) => {
  const p = ref({}), T = ref(false), D = ref({
    top: "0",
    left: "0"
  }), I = ref(false), k = toRef(i, "teleportCenter");
  watch(k, () => {
    D.value = JSON.parse(JSON.stringify({})), b();
  });
  const F = (d) => {
    if (i.teleport) {
      const P = d.getBoundingClientRect();
      return {
        left: P.left + window.scrollX,
        top: P.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, _ = (d, P) => {
    D.value.left = `${d + P - p.value.width}px`;
  }, A = (d) => {
    D.value.left = `${d}px`;
  }, x = (d, P) => {
    i.position === $t.left && A(d), i.position === $t.right && _(d, P), i.position === $t.center && (D.value.left = `${d + P / 2 - p.value.width / 2}px`);
  }, y = (d) => {
    const { width: P, height: X } = d.getBoundingClientRect(), { top: h2, left: l } = i.altPosition ? i.altPosition(d) : F(d);
    return { top: +h2, left: +l, width: P, height: X };
  }, S = () => {
    D.value.left = "50%", D.value.top = "50%", D.value.transform = "translate(-50%, -50%)", D.value.position = "fixed", delete D.value.opacity;
  }, B = () => {
    const d = Pe(r), { top: P, left: X, transform: h2 } = i.altPosition(d);
    D.value = { top: `${P}px`, left: `${X}px`, transform: h2 ?? "" };
  }, b = (d = true) => {
    var P;
    if (!n.value.enabled) {
      if (k.value)
        return S();
      if (i.altPosition !== null)
        return B();
      if (d) {
        const X = i.teleport ? (P = t.value) == null ? void 0 : P.$el : e.value;
        X && (p.value = X.getBoundingClientRect()), o("recalculate-position");
      }
      return f();
    }
  }, R = ({ inputEl: d, left: P, width: X }) => {
    window.screen.width > 768 && !T.value && x(P, X), q(d);
  }, G = (d) => {
    const { top: P, left: X, height: h2, width: l } = y(d);
    D.value.top = `${h2 + P + +i.offset}px`, I.value = false, T.value || (D.value.left = `${X + l / 2 - p.value.width / 2}px`), R({ inputEl: d, left: X, width: l });
  }, ee = (d) => {
    const { top: P, left: X, width: h2 } = y(d);
    D.value.top = `${P - +i.offset - p.value.height}px`, I.value = true, R({ inputEl: d, left: X, width: h2 });
  }, q = (d) => {
    if (i.autoPosition) {
      const { left: P, width: X } = y(d), { left: h2, right: l } = p.value;
      if (!T.value) {
        if (Math.abs(h2) !== Math.abs(l)) {
          if (h2 <= 0)
            return T.value = true, A(P);
          if (l >= document.documentElement.clientWidth)
            return T.value = true, _(P, X);
        }
        return x(P, X);
      }
    }
  }, fe = () => {
    const d = Pe(r);
    if (d) {
      const { height: P } = p.value, { top: X, height: h2 } = d.getBoundingClientRect(), g = window.innerHeight - X - h2, s = X;
      return P <= g ? yt.bottom : P > g && P <= s ? yt.top : g >= s ? yt.bottom : yt.top;
    }
    return yt.bottom;
  }, H = (d) => fe() === yt.bottom ? G(d) : ee(d), f = () => {
    const d = Pe(r);
    if (d)
      return i.autoPosition ? H(d) : G(d);
  }, M = function(d) {
    if (d) {
      const P = d.scrollHeight > d.clientHeight, h2 = window.getComputedStyle(d).overflowY.indexOf("hidden") !== -1;
      return P && !h2;
    }
    return true;
  }, V = function(d) {
    return !d || d === document.body || d.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : M(d) ? d : V(d.parentNode);
  }, ae = (d) => {
    if (d)
      switch (i.position) {
        case $t.left:
          return { left: 0, transform: "translateX(0)" };
        case $t.right:
          return { left: `${d.width}px`, transform: "translateX(-100%)" };
        default:
          return { left: `${d.width / 2}px`, transform: "translateX(-50%)" };
      }
    return {};
  };
  return {
    openOnTop: I,
    menuStyle: D,
    xCorrect: T,
    setMenuPosition: b,
    getScrollableParent: V,
    shadowRender: (d, P) => {
      var J, ce, $;
      const X = document.createElement("div"), h2 = (J = Pe(r)) == null ? void 0 : J.getBoundingClientRect();
      X.setAttribute("id", "dp--temp-container");
      const l = (ce = a.value) != null && ce.clientWidth ? a.value : document.body;
      l.append(X);
      const g = ae(h2), s = h(
        d,
        {
          ...P,
          shadow: true,
          style: { opacity: 0, position: "absolute", ...g }
        },
        Object.fromEntries(
          Object.keys(c).filter((u) => ["right-sidebar", "left-sidebar"].includes(u)).map((u) => [u, c[u]])
        )
      );
      render(s, X), p.value = ($ = s.el) == null ? void 0 : $.getBoundingClientRect(), render(null, X), l.removeChild(X);
    }
  };
};
var ot = [
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
  { name: "minutes-overlay-value", use: ["calendar", "time", "shared"] },
  { name: "seconds-overlay-value", use: ["calendar", "time", "shared"] },
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
  { name: "quarter", use: ["shared"] }
];
var ml = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var gl = {
  all: () => ot,
  monthYear: () => ot.filter((e) => e.use.includes("month-year")),
  input: () => ml,
  timePicker: () => ot.filter((e) => e.use.includes("time")),
  action: () => ot.filter((e) => e.use.includes("action")),
  calendar: () => ot.filter((e) => e.use.includes("calendar")),
  menu: () => ot.filter((e) => e.use.includes("menu")),
  shared: () => ot.filter((e) => e.use.includes("shared")),
  yearMode: () => ot.filter((e) => e.use.includes("year-mode"))
};
var We = (e, t, r) => {
  const a = [];
  return gl[t]().forEach((n) => {
    e[n.name] && a.push(n.name);
  }), r != null && r.length && r.forEach((n) => {
    n.slot && a.push(n.slot);
  }), a;
};
var Vt = (e) => {
  const t = computed(() => (a) => e.value ? a ? e.value.open : e.value.close : ""), r = computed(() => (a) => e.value ? a ? e.value.menuAppearTop : e.value.menuAppearBottom : "");
  return { transitionName: t, showTransition: !!e.value, menuTransition: r };
};
var Ut = (e, t) => {
  const r = E(Xe(/* @__PURE__ */ new Date(), e.timezone)), a = ref([{ month: getMonth(r), year: getYear(r) }]), n = reactive({
    hours: e.range ? [getHours(r), getHours(r)] : getHours(r),
    minutes: e.range ? [getMinutes(r), getMinutes(r)] : getMinutes(r),
    seconds: e.range ? [0, 0] : 0
  }), o = computed({
    get: () => e.internalModelValue,
    set: (p) => {
      !e.readonly && !e.disabled && t("update:internal-model-value", p);
    }
  }), i = computed(
    () => (p) => a.value[p] ? a.value[p].month : 0
  ), c = computed(
    () => (p) => a.value[p] ? a.value[p].year : 0
  );
  return {
    calendars: a,
    time: n,
    modelValue: o,
    month: i,
    year: c
  };
};
var yl = (e, t) => {
  const { defaultedMultiCalendars: r, defaultedHighlight: a } = Ae(t), { isDisabled: n, matchDate: o } = Dt(t), i = ref(null), c = ref(E(Xe(/* @__PURE__ */ new Date(), t.timezone))), p = (l) => {
    !l.current && t.hideOffsetDates || (i.value = l.value);
  }, T = () => {
    i.value = null;
  }, D = (l) => Array.isArray(e.value) && t.range && e.value[0] && i.value ? l ? Ie(i.value, e.value[0]) : Re(i.value, e.value[0]) : true, I = (l, g) => {
    const s = () => e.value ? g ? e.value[0] || null : e.value[1] : null, J = e.value && Array.isArray(e.value) ? s() : null;
    return be(E(l.value), J);
  }, k = (l) => {
    const g = Array.isArray(e.value) ? e.value[0] : null;
    return l ? !Re(i.value ?? null, g) : true;
  }, F = (l, g = true) => (t.range || t.weekPicker) && Array.isArray(e.value) && e.value.length === 2 ? t.hideOffsetDates && !l.current ? false : be(E(l.value), e.value[g ? 0 : 1]) : t.range ? I(l, g) && k(g) || be(l.value, Array.isArray(e.value) ? e.value[0] : null) && D(g) : false, _ = (l, g, s) => Array.isArray(e.value) && e.value[0] && e.value.length === 1 ? l ? false : s ? Ie(e.value[0], g.value) : Re(e.value[0], g.value) : false, A = (l) => !e.value || t.hideOffsetDates && !l.current ? false : t.range ? t.modelAuto && Array.isArray(e.value) ? be(l.value, e.value[0] ? e.value[0] : c.value) : false : t.multiDates && Array.isArray(e.value) ? e.value.some((g) => be(g, l.value)) : be(l.value, e.value ? e.value : c.value), x = (l) => {
    if (t.autoRange || t.weekPicker) {
      if (i.value) {
        if (t.hideOffsetDates && !l.current)
          return false;
        const g = addDays(i.value, +t.autoRange), s = Qt(E(i.value), t.timezone, t.weekStart);
        return t.weekPicker ? be(s[1], E(l.value)) : be(g, E(l.value));
      }
      return false;
    }
    return false;
  }, y = (l) => {
    if (t.autoRange || t.weekPicker) {
      if (i.value) {
        const g = addDays(i.value, +t.autoRange);
        if (t.hideOffsetDates && !l.current)
          return false;
        const s = Qt(E(i.value), t.timezone, t.weekStart);
        return t.weekPicker ? Ie(l.value, s[0]) && Re(l.value, s[1]) : Ie(l.value, i.value) && Re(l.value, g);
      }
      return false;
    }
    return false;
  }, S = (l) => {
    if (t.autoRange || t.weekPicker) {
      if (i.value) {
        if (t.hideOffsetDates && !l.current)
          return false;
        const g = Qt(E(i.value), t.timezone, t.weekStart);
        return t.weekPicker ? be(g[0], l.value) : be(i.value, l.value);
      }
      return false;
    }
    return false;
  }, B = (l) => xt(e.value, i.value, l.value), b = () => t.modelAuto && Array.isArray(t.internalModelValue) ? !!t.internalModelValue[0] : false, R = () => t.modelAuto ? _a(t.internalModelValue) : true, G = (l) => {
    if (Array.isArray(e.value) && e.value.length || t.weekPicker)
      return false;
    const g = t.range ? !F(l) && !F(l, false) : true;
    return !n(l.value) && !A(l) && !(!l.current && t.hideOffsetDates) && g;
  }, ee = (l) => t.range ? t.modelAuto ? b() && A(l) : false : A(l), q = (l) => {
    var g;
    return a.value ? typeof a.value == "function" ? a.value(l.value) : o(
      l.value,
      (g = t.arrMapValues) != null && g.highlightedDates ? t.arrMapValues.highlightedDates : a.value.dates
    ) : false;
  }, fe = (l) => {
    const g = n(l.value);
    return g && (typeof a.value == "function" ? !a.value(l.value, g) : !a.value.options.highlightDisabled);
  }, H = (l) => {
    var g;
    return typeof a.value == "function" ? a.value(l.value) : (g = a.value.weekdays) == null ? void 0 : g.includes(l.value.getDay());
  }, f = (l) => (t.range || t.weekPicker) && (!(r.value.count > 0) || l.current) && R() && !(!l.current && t.hideOffsetDates) && !A(l) ? B(l) : false, M = (l) => {
    const { isRangeStart: g, isRangeEnd: s } = C(l), J = t.range ? g || s : false;
    return {
      dp__cell_offset: !l.current,
      dp__pointer: !t.disabled && !(!l.current && t.hideOffsetDates) && !n(l.value),
      dp__cell_disabled: n(l.value),
      dp__cell_highlight: !fe(l) && (q(l) || H(l)) && !ee(l) && !J && !S(l) && !(f(l) && t.weekPicker) && !s,
      dp__cell_highlight_active: !fe(l) && (q(l) || H(l)) && ee(l),
      dp__today: !t.noToday && be(l.value, c.value) && l.current
    };
  }, V = (l) => ({
    dp__active_date: ee(l),
    dp__date_hover: G(l)
  }), ae = (l) => ({
    ...d(l),
    ...P(l),
    dp__range_between_week: f(l) && t.weekPicker
  }), C = (l) => {
    const g = r.value.count > 0 ? l.current && F(l) && R() : F(l) && R(), s = r.value.count > 0 ? l.current && F(l, false) && R() : F(l, false) && R();
    return { isRangeStart: g, isRangeEnd: s };
  }, d = (l) => {
    const { isRangeStart: g, isRangeEnd: s } = C(l);
    return {
      dp__range_start: g,
      dp__range_end: s,
      dp__range_between: f(l) && !t.weekPicker,
      dp__date_hover_start: _(G(l), l, true),
      dp__date_hover_end: _(G(l), l, false)
    };
  }, P = (l) => ({
    ...d(l),
    dp__cell_auto_range: y(l),
    dp__cell_auto_range_start: S(l),
    dp__cell_auto_range_end: x(l)
  }), X = (l) => t.range ? t.autoRange ? P(l) : t.modelAuto ? { ...V(l), ...d(l) } : d(l) : t.weekPicker ? ae(l) : V(l);
  return {
    setHoverDate: p,
    clearHoverDate: T,
    getDayClassData: (l) => t.hideOffsetDates && !l.current ? {} : {
      ...M(l),
      ...X(l),
      [t.dayClass ? t.dayClass(l.value) : ""]: true,
      [t.calendarCellClassName]: !!t.calendarCellClassName
    }
  };
};
var Dt = (e) => {
  const { defaultedFilters: t, defaultedHighlight: r } = Ae(e), a = () => {
    if (e.timezone)
      return e.timezone;
    if (e.utc)
      return "UTC";
  }, n = (f) => {
    const M = Ve(o(E(f))).toISOString(), [V] = M.split("T");
    return V;
  }, o = (f) => e.utc === "preserve" ? Ya(f, a()) : Xe(f, a()), i = (f) => {
    var g;
    const M = e.maxDate ? Ie(f, o(E(e.maxDate))) : false, V = e.minDate ? Re(f, o(E(e.minDate))) : false, ae = D(
      o(f),
      (g = e.arrMapValues) != null && g.disabledDates ? e.arrMapValues.disabledDates : e.disabledDates
    ), d = t.value.months.map((s) => +s).includes(getMonth(f)), P = e.disabledWeekDays.length ? e.disabledWeekDays.some((s) => +s === getDay(f)) : false, X = k(f), h2 = getYear(f), l = h2 < +e.yearRange[0] || h2 > +e.yearRange[1];
    return !(M || V || ae || d || l || P || X);
  }, c = (f, M) => Re(...st(e.minDate, f, M)) || be(...st(e.minDate, f, M)), p = (f, M) => Ie(...st(e.maxDate, f, M)) || be(...st(e.maxDate, f, M)), T = (f, M, V) => {
    let ae = false;
    return e.maxDate && V && p(f, M) && (ae = true), e.minDate && !V && c(f, M) && (ae = true), ae;
  }, D = (f, M) => f ? M instanceof Map ? !!M.get(n(f)) : Array.isArray(M) ? M.some((V) => be(o(E(V)), f)) : M ? M(E(JSON.parse(JSON.stringify(f)))) : false : true, I = (f, M, V, ae) => {
    let C = false;
    return ae ? e.minDate && e.maxDate ? C = T(f, M, V) : (e.minDate && c(f, M) || e.maxDate && p(f, M)) && (C = true) : C = true, C;
  }, k = (f) => {
    var M, V, ae, C, d;
    return Array.isArray(e.allowedDates) && !((M = e.allowedDates) != null && M.length) ? true : (V = e.arrMapValues) != null && V.allowedDates ? !D(f, (ae = e.arrMapValues) == null ? void 0 : ae.allowedDates) : (C = e.allowedDates) != null && C.length ? !((d = e.allowedDates) != null && d.some((P) => be(o(E(P)), o(f)))) : false;
  }, F = (f) => !i(f), _ = (f) => e.noDisabledRange ? !eachDayOfInterval({ start: f[0], end: f[1] }).some((V) => F(V)) : true, A = (f, M, V = 0) => {
    if (Array.isArray(M) && M[V]) {
      const ae = differenceInCalendarDays(f, M[V]), C = Na(M[V], f), d = C.length === 1 ? 0 : C.filter((X) => F(X)).length, P = Math.abs(ae) - d;
      if (e.minRange && e.maxRange)
        return P >= +e.minRange && P <= +e.maxRange;
      if (e.minRange)
        return P >= +e.minRange;
      if (e.maxRange)
        return P <= +e.maxRange;
    }
    return true;
  }, x = (f) => new Map(f.map((M) => [n(M), true])), y = (f) => Array.isArray(f) && f.length > 0, S = () => {
    const f = {
      disabledDates: null,
      allowedDates: null,
      highlightedDates: null
    };
    return y(e.allowedDates) && (f.allowedDates = x(e.allowedDates)), typeof r.value != "function" && y(r.value.dates) && (f.highlightedDates = x(r.value.dates)), y(e.disabledDates) && (f.disabledDates = x(e.disabledDates)), f;
  }, B = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, b = (f) => Array.isArray(f) ? [f[0] ? bn(f[0]) : null, f[1] ? bn(f[1]) : null] : bn(f), R = (f, M, V) => f.find(
    (ae) => +ae.hours === getHours(M) && ae.minutes === "*" ? true : +ae.minutes === getMinutes(M) && +ae.hours === getHours(M)
  ) && V, G = (f, M, V) => {
    const [ae, C] = f, [d, P] = M;
    return !R(ae, d, V) && !R(C, P, V) && V;
  }, ee = (f, M) => {
    const V = Array.isArray(M) ? M : [M];
    return Array.isArray(e.disabledTimes) ? Array.isArray(e.disabledTimes[0]) ? G(e.disabledTimes, V, f) : !V.some((ae) => R(e.disabledTimes, ae, f)) : f;
  }, q = (f, M) => {
    const V = Array.isArray(M) ? [bt(M[0]), M[1] ? bt(M[1]) : void 0] : bt(M), ae = !e.disabledTimes(V);
    return f && ae;
  }, fe = (f, M) => e.disabledTimes ? Array.isArray(e.disabledTimes) ? ee(M, f) : q(M, f) : M;
  return {
    isDisabled: F,
    validateDate: i,
    validateMonthYearInRange: I,
    isDateRangeAllowed: _,
    checkMinMaxRange: A,
    matchDate: D,
    mapDatesArrToMap: S,
    isValidTime: (f) => {
      let M = true;
      if (!f || B())
        return true;
      const V = !e.minDate && !e.maxDate ? b(f) : f;
      return (e.maxTime || e.maxDate) && (M = va(
        e.maxTime,
        e.maxDate,
        "max",
        Se(V),
        M
      )), (e.minTime || e.minDate) && (M = va(
        e.minTime,
        e.minDate,
        "min",
        Se(V),
        M
      )), fe(f, M);
    }
  };
};
var en = () => {
  const e = computed(() => (a, n) => a == null ? void 0 : a.includes(n)), t = computed(() => (a, n) => a.count ? a.solo ? true : n === 0 : true), r = computed(() => (a, n) => a.count ? a.solo ? true : n === a.count - 1 : true);
  return { hideNavigationButtons: e, showLeftIcon: t, showRightIcon: r };
};
var hl = (e, t, r) => {
  const a = ref(0), n = reactive({
    [kt.timePicker]: !e.enableTimePicker || e.timePicker || e.monthPicker,
    [kt.calendar]: false,
    [kt.header]: false
  }), o = (...D) => {
    var I;
    (I = e.flow) != null && I.length && (n[D] = true, Object.keys(n).filter((k) => !n[k]).length || T());
  }, i = () => {
    var D;
    (D = e.flow) != null && D.length && a.value !== -1 && (a.value += 1, t("flow-step", a.value), T());
  }, c = () => {
    a.value = -1;
  }, p = (D, I, ...k) => {
    e.flow[a.value] === D && r.value && r.value[I](...k);
  }, T = () => {
    p(et.month, "toggleMonthPicker", true), p(et.year, "toggleYearPicker", true), p(et.calendar, "toggleTimePicker", false, true), p(et.time, "toggleTimePicker", true, true);
    const D = e.flow[a.value];
    (D === et.hours || D === et.minutes || D === et.seconds) && p(D, "toggleTimePicker", true, true, D);
  };
  return { childMount: o, updateFlowStep: i, resetFlow: c, flowStep: a };
};
var tn = {
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
    type: [Array, Function, Object],
    default: null
  },
  highlightWeekDays: {
    type: Array,
    default: null
  },
  highlightDisabledDays: { type: Boolean, default: false },
  teleport: { type: [String, Boolean, Object], default: null },
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
  yearFirst: { type: Boolean, default: false }
};
var Je = {
  ...tn,
  shadow: { type: Boolean, default: false },
  flowStep: { type: Number, default: 0 },
  internalModelValue: { type: [Date, Array], default: null },
  arrMapValues: { type: Object, default: () => ({}) },
  noOverlayFocus: { type: Boolean, default: false }
};
var pl = {
  key: 1,
  class: "dp__input_wrap"
};
var bl = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-label", "aria-disabled", "aria-invalid", "onKeydown"];
var kl = {
  key: 2,
  class: "dp__clear_icon"
};
var wl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: false },
    inputValue: { type: String, default: "" },
    ...tn
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
  setup(e, { expose: t, emit: r }) {
    const a = r, n = e, {
      defaultedTextInput: o,
      defaultedAriaLabels: i,
      defaultedInline: c,
      defaultedConfig: p,
      getDefaultPattern: T,
      getDefaultStartTime: D
    } = Ae(n), { checkMinMaxRange: I } = Dt(n), k = ref(), F = ref(null), _ = ref(false), A = ref(false), x = computed(
      () => ({
        dp__pointer: !n.disabled && !n.readonly && !o.value.enabled,
        dp__disabled: n.disabled,
        dp__input_readonly: !o.value.enabled,
        dp__input: true,
        dp__input_icon_pad: !n.hideInputIcon,
        dp__input_valid: !!n.state,
        dp__input_invalid: n.state === false,
        dp__input_focus: _.value || n.isMenuOpen,
        dp__input_reg: !o.value.enabled,
        [n.inputClassName]: !!n.inputClassName
      })
    ), y = () => {
      a("set-input-date", null), n.autoApply && (a("set-empty-date"), k.value = null);
    }, S = (d) => {
      const P = D();
      return Kr(
        d,
        o.value.format ?? T(),
        P ?? Ia({}, n.enableSeconds),
        n.inputValue,
        A.value
      );
    }, B = (d) => {
      const { rangeSeparator: P } = o.value, [X, h2] = d.split(`${P}`);
      if (X) {
        const l = S(X.trim()), g = h2 ? S(h2.trim()) : null, s = l && g ? [l, g] : [l];
        I(g, s, 0) && (k.value = l ? s : null);
      }
    }, b = () => {
      A.value = true;
    }, R = (d) => {
      if (n.range)
        B(d);
      else if (n.multiDates) {
        const P = d.split(";");
        k.value = P.map((X) => S(X.trim())).filter((X) => X);
      } else
        k.value = S(d);
    }, G = (d) => {
      var X;
      const P = typeof d == "string" ? d : (X = d.target) == null ? void 0 : X.value;
      P !== "" ? (o.value.openMenu && !n.isMenuOpen && a("open"), R(P), a("set-input-date", k.value)) : y(), A.value = false, a("update:input-value", P);
    }, ee = (d) => {
      o.value.enabled ? (R(d.target.value), o.value.enterSubmit && On(k.value) && n.inputValue !== "" ? (a("set-input-date", k.value, true), k.value = null) : o.value.enterSubmit && n.inputValue === "" && (k.value = null, a("clear"))) : H(d);
    }, q = (d) => {
      o.value.enabled && o.value.tabSubmit && R(d.target.value), o.value.tabSubmit && On(k.value) && n.inputValue !== "" ? (a("set-input-date", k.value, true, true), k.value = null) : o.value.tabSubmit && n.inputValue === "" && (k.value = null, a("clear", true));
    }, fe = () => {
      var d;
      _.value = true, a("focus"), o.value.enabled && o.value.selectOnFocus && ((d = F.value) == null || d.select());
    }, H = (d) => {
      d.preventDefault(), ut(d, p.value, true), o.value.enabled && o.value.openMenu && !c.value.input && !n.isMenuOpen ? a("open") : o.value.enabled || a("toggle");
    }, f = () => {
      a("real-blur"), _.value = false, (!n.isMenuOpen || c.value.enabled && c.value.input) && a("blur"), n.autoApply && o.value.enabled && k.value && !n.isMenuOpen && (a("set-input-date", k.value), a("select-date"), k.value = null);
    }, M = (d) => {
      ut(d, p.value, true), a("clear");
    }, V = (d) => {
      if (!o.value.enabled) {
        if (d.code === "Tab")
          return;
        d.preventDefault();
      }
    };
    return t({
      focusInput: () => {
        var d;
        (d = F.value) == null || d.focus({ preventScroll: true });
      },
      setParsedDate: (d) => {
        k.value = d;
      }
    }), (d, P) => {
      var X;
      return openBlock(), createElementBlock("div", { onClick: H }, [
        d.$slots.trigger && !d.$slots["dp-input"] && !unref(c).enabled ? renderSlot(d.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !d.$slots.trigger && (!unref(c).enabled || unref(c).input) ? (openBlock(), createElementBlock("div", pl, [
          d.$slots["dp-input"] && !d.$slots.trigger && !unref(c).enabled ? renderSlot(d.$slots, "dp-input", {
            key: 0,
            value: e.inputValue,
            isMenuOpen: e.isMenuOpen,
            onInput: G,
            onEnter: ee,
            onTab: q,
            onClear: M,
            onBlur: f,
            onKeypress: V,
            onPaste: b
          }) : createCommentVNode("", true),
          d.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            id: d.uid ? `dp-input-${d.uid}` : void 0,
            ref_key: "inputRef",
            ref: F,
            name: d.name,
            class: normalizeClass(x.value),
            inputmode: unref(o).enabled ? "text" : "none",
            placeholder: d.placeholder,
            disabled: d.disabled,
            readonly: d.readonly,
            required: d.required,
            value: e.inputValue,
            autocomplete: d.autocomplete,
            "aria-label": (X = unref(i)) == null ? void 0 : X.input,
            "aria-disabled": d.disabled || void 0,
            "aria-invalid": d.state === false ? true : void 0,
            onInput: G,
            onKeydown: [
              withKeys(ee, ["enter"]),
              withKeys(q, ["tab"]),
              V
            ],
            onBlur: f,
            onFocus: fe,
            onKeypress: V,
            onPaste: b
          }, null, 42, bl)),
          createBaseVNode("div", {
            onClick: P[2] || (P[2] = (h2) => a("toggle"))
          }, [
            d.$slots["input-icon"] && !d.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: P[0] || (P[0] = (h2) => a("toggle"))
            }, [
              renderSlot(d.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !d.$slots["input-icon"] && !d.hideInputIcon && !d.$slots["dp-input"] ? (openBlock(), createBlock(unref(Ht), {
              key: 1,
              class: "dp__input_icon dp__input_icons",
              onClick: P[1] || (P[1] = (h2) => a("toggle"))
            })) : createCommentVNode("", true)
          ]),
          d.$slots["clear-icon"] && e.inputValue && d.clearable && !d.disabled && !d.readonly ? (openBlock(), createElementBlock("span", kl, [
            renderSlot(d.$slots, "clear-icon", { clear: M })
          ])) : createCommentVNode("", true),
          d.clearable && !d.$slots["clear-icon"] && e.inputValue && !d.disabled && !d.readonly ? (openBlock(), createBlock(unref(Ta), {
            key: 3,
            class: "dp__clear_icon dp__input_icons",
            onClick: P[3] || (P[3] = withModifiers((h2) => M(h2), ["prevent"]))
          })) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var Dl = ["title"];
var Ml = { class: "dp__action_buttons" };
var $l = ["disabled", "onKeydown"];
var Tl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ActionRow",
  props: {
    menuMount: { type: Boolean, default: false },
    calendarWidth: { type: Number, default: 0 },
    ...Je
  },
  emits: ["close-picker", "select-date", "select-now", "invalid-select"],
  setup(e, { emit: t }) {
    const r = t, a = e, {
      defaultedActionRow: n,
      defaultedPreviewFormat: o,
      defaultedMultiCalendars: i,
      defaultedTextInput: c,
      defaultedInline: p,
      getDefaultPattern: T
    } = Ae(a), { isValidTime: D } = Dt(a), { buildMatrix: I } = vt(), k = ref(null), F = ref(null);
    onMounted(() => {
      a.arrowNavigation && I([Pe(k), Pe(F)], "actionRow");
    });
    const _ = computed(() => a.range && !a.partialRange && a.internalModelValue ? a.internalModelValue.length === 2 : true), A = computed(() => !x.value || !y.value || !_.value), x = computed(() => !a.enableTimePicker || a.ignoreTimeValidation ? true : D(a.internalModelValue)), y = computed(() => a.monthPicker ? a.range && Array.isArray(a.internalModelValue) ? !a.internalModelValue.filter((f) => !q(f)).length : q(a.internalModelValue) : true), S = () => {
      const H = o.value;
      return a.timePicker || a.monthPicker, H(Se(a.internalModelValue));
    }, B = () => {
      const H = a.internalModelValue;
      return i.value.count > 0 ? `${b(H[0])} - ${b(H[1])}` : [b(H[0]), b(H[1])];
    }, b = (H) => Ea(
      H,
      o.value,
      a.formatLocale,
      c.value.rangeSeparator,
      a.modelAuto,
      T()
    ), R = computed(() => !a.internalModelValue || !a.menuMount ? "" : typeof o.value == "string" ? Array.isArray(a.internalModelValue) ? a.internalModelValue.length === 2 && a.internalModelValue[1] ? B() : a.multiDates ? a.internalModelValue.map((H) => `${b(H)}`) : a.modelAuto ? `${b(a.internalModelValue[0])}` : `${b(a.internalModelValue[0])} -` : b(a.internalModelValue) : S()), G = () => a.multiDates ? "; " : " - ", ee = computed(
      () => Array.isArray(R.value) ? R.value.join(G()) : R.value
    ), q = (H) => {
      if (!a.monthPicker)
        return true;
      let f = true;
      const M = E(qe(H));
      if (a.minDate && a.maxDate) {
        const V = E(qe(a.minDate)), ae = E(qe(a.maxDate));
        return Ie(M, V) && Re(M, ae) || be(M, V) || be(M, ae);
      }
      if (a.minDate) {
        const V = E(qe(a.minDate));
        f = Ie(M, V) || be(M, V);
      }
      if (a.maxDate) {
        const V = E(qe(a.maxDate));
        f = Re(M, V) || be(M, V);
      }
      return f;
    }, fe = () => {
      x.value && y.value && _.value ? r("select-date") : r("invalid-select");
    };
    return (H, f) => (openBlock(), createElementBlock("div", {
      class: "dp__action_row",
      style: normalizeStyle(e.calendarWidth ? { width: `${e.calendarWidth}px` } : {})
    }, [
      H.$slots["action-row"] ? renderSlot(H.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: H.internalModelValue,
        disabled: A.value,
        selectDate: () => H.$emit("select-date"),
        closePicker: () => H.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(n).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: ee.value
        }, [
          H.$slots["action-preview"] ? renderSlot(H.$slots, "action-preview", {
            key: 0,
            value: H.internalModelValue
          }) : createCommentVNode("", true),
          H.$slots["action-preview"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(ee.value), 1)
          ], 64))
        ], 8, Dl)) : createCommentVNode("", true),
        createBaseVNode("div", Ml, [
          H.$slots["action-buttons"] ? renderSlot(H.$slots, "action-buttons", {
            key: 0,
            value: H.internalModelValue
          }) : createCommentVNode("", true),
          H.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(p).enabled && unref(n).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              ref_key: "cancelButtonRef",
              ref: k,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: f[0] || (f[0] = (M) => H.$emit("close-picker")),
              onKeydown: [
                f[1] || (f[1] = withKeys((M) => H.$emit("close-picker"), ["enter"])),
                f[2] || (f[2] = withKeys((M) => H.$emit("close-picker"), ["space"]))
              ]
            }, toDisplayString(H.cancelText), 545)) : createCommentVNode("", true),
            unref(n).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              ref_key: "cancelButtonRef",
              ref: k,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: f[3] || (f[3] = (M) => H.$emit("select-now")),
              onKeydown: [
                f[4] || (f[4] = withKeys((M) => H.$emit("select-now"), ["enter"])),
                f[5] || (f[5] = withKeys((M) => H.$emit("select-now"), ["space"]))
              ]
            }, toDisplayString(H.nowButtonLabel), 545)) : createCommentVNode("", true),
            unref(n).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              ref_key: "selectButtonRef",
              ref: F,
              type: "button",
              class: "dp__action_button dp__action_select",
              disabled: A.value,
              onKeydown: [
                withKeys(fe, ["enter"]),
                withKeys(fe, ["space"])
              ],
              onClick: fe
            }, toDisplayString(H.selectText), 41, $l)) : createCommentVNode("", true)
          ], 64))
        ])
      ], 64))
    ], 4));
  }
});
var Al = ["onKeydown"];
var Sl = { class: "dp__selection_grid_header" };
var Pl = ["aria-selected", "aria-disabled", "onClick", "onKeydown", "onMouseover"];
var Cl = ["aria-label", "onKeydown"];
var Lt = defineComponent({
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
    focusValue: {}
  },
  emits: ["selected", "toggle", "reset-flow", "hover-value"],
  setup(e, { expose: t, emit: r }) {
    const { setSelectionGrid: a, buildMultiLevelMatrix: n, setMonthPicker: o } = vt(), i = r, c = e, { defaultedAriaLabels: p, defaultedTextInput: T, defaultedConfig: D } = Ae(
      c
    ), { hideNavigationButtons: I } = en(), k = ref(false), F = ref(null), _ = ref(null), A = ref([]), x = ref(), y = ref(null), S = ref(0), B = ref(null);
    onBeforeUpdate(() => {
      F.value = null;
    }), onMounted(() => {
      nextTick().then(() => f()), c.noOverlayFocus || R(), b(true);
    }), onUnmounted(() => b(false));
    const b = (h2) => {
      var l;
      c.arrowNavigation && ((l = c.headerRefs) != null && l.length ? o(h2) : a(h2));
    }, R = () => {
      var l;
      const h2 = Pe(_);
      h2 && (T.value.enabled || (F.value ? (l = F.value) == null || l.focus({ preventScroll: true }) : h2.focus({ preventScroll: true })), k.value = h2.clientHeight < h2.scrollHeight);
    }, G = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !c.useRelative,
        "dp--overlay-relative": c.useRelative
      })
    ), ee = computed(
      () => c.useRelative ? { height: `${c.height}px`, width: "260px" } : void 0
    ), q = computed(() => ({
      dp__overlay_col: true
    })), fe = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: k.value,
        dp__button_bottom: c.isLast
      })
    ), H = computed(() => {
      var h2, l;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((h2 = c.items) == null ? void 0 : h2.length) <= 6,
        dp__container_block: ((l = c.items) == null ? void 0 : l.length) > 6
      };
    });
    watch(
      () => c.items,
      () => f(),
      { deep: true }
    );
    const f = () => {
      nextTick().then(() => {
        const h2 = Pe(F), l = Pe(_), g = Pe(y), s = Pe(B), J = g ? g.getBoundingClientRect().height : 0;
        l && (l.getBoundingClientRect().height ? S.value = l.getBoundingClientRect().height - J : S.value = D.value.modeHeight - J), h2 && s && (s.scrollTop = h2.offsetTop - s.offsetTop - (S.value / 2 - h2.getBoundingClientRect().height) - J);
      });
    }, M = (h2) => {
      h2.disabled || i("selected", h2.value);
    }, V = () => {
      i("toggle"), i("reset-flow");
    }, ae = () => {
      c.escClose && V();
    }, C = (h2, l, g, s) => {
      h2 && ((l.active || l.value === c.focusValue) && (F.value = h2), c.arrowNavigation && (Array.isArray(A.value[g]) ? A.value[g][s] = h2 : A.value[g] = [h2], d()));
    }, d = () => {
      var l, g;
      const h2 = (l = c.headerRefs) != null && l.length ? [c.headerRefs].concat(A.value) : A.value.concat([c.skipButtonRef ? [] : [y.value]]);
      n(Se(h2), (g = c.headerRefs) != null && g.length ? "monthPicker" : "selectionGrid");
    }, P = (h2) => {
      c.arrowNavigation || ut(h2, D.value, true);
    }, X = (h2) => {
      x.value = h2, i("hover-value", h2);
    };
    return t({ focusGrid: R }), (h2, l) => {
      var g;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: _,
        class: normalizeClass(G.value),
        style: normalizeStyle(ee.value),
        role: "dialog",
        tabindex: "0",
        onKeydown: [
          withKeys(withModifiers(ae, ["prevent"]), ["esc"]),
          l[0] || (l[0] = withKeys(withModifiers((s) => P(s), ["prevent"]), ["left"])),
          l[1] || (l[1] = withKeys(withModifiers((s) => P(s), ["prevent"]), ["up"])),
          l[2] || (l[2] = withKeys(withModifiers((s) => P(s), ["prevent"]), ["down"])),
          l[3] || (l[3] = withKeys(withModifiers((s) => P(s), ["prevent"]), ["right"]))
        ]
      }, [
        createBaseVNode("div", {
          ref_key: "containerRef",
          ref: B,
          class: normalizeClass(H.value),
          role: "grid",
          style: normalizeStyle({ height: `${S.value}px` })
        }, [
          createBaseVNode("div", Sl, [
            renderSlot(h2.$slots, "header")
          ]),
          h2.$slots.overlay ? renderSlot(h2.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(h2.items, (s, J) => (openBlock(), createElementBlock("div", {
            key: J,
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: h2.items.length >= 3 }]),
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(s, (ce, $) => (openBlock(), createElementBlock("div", {
              key: ce.value,
              ref_for: true,
              ref: (u) => C(u, ce, J, $),
              role: "gridcell",
              class: normalizeClass(q.value),
              "aria-selected": ce.active,
              "aria-disabled": ce.disabled || void 0,
              tabindex: "0",
              onClick: (u) => M(ce),
              onKeydown: [
                withKeys(withModifiers((u) => M(ce), ["prevent"]), ["enter"]),
                withKeys(withModifiers((u) => M(ce), ["prevent"]), ["space"])
              ],
              onMouseover: (u) => X(ce.value)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(ce.className)
              }, [
                h2.$slots.item ? renderSlot(h2.$slots, "item", {
                  key: 0,
                  item: ce
                }) : createCommentVNode("", true),
                h2.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(ce.text), 1)
                ], 64))
              ], 2)
            ], 42, Pl))), 128))
          ], 2))), 128))
        ], 6),
        h2.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "toggleButton",
          ref: y,
          type: "button",
          "aria-label": (g = unref(p)) == null ? void 0 : g.toggleOverlay,
          class: normalizeClass(fe.value),
          tabindex: "0",
          onClick: V,
          onKeydown: [
            withKeys(V, ["enter"]),
            withKeys(V, ["tab"])
          ]
        }, [
          renderSlot(h2.$slots, "button-icon")
        ], 42, Cl)), [
          [vShow, !unref(I)(h2.hideNavigation, h2.type)]
        ]) : createCommentVNode("", true)
      ], 46, Al);
    };
  }
});
var nn = defineComponent({
  __name: "InstanceWrap",
  props: {
    multiCalendars: {},
    stretch: { type: Boolean }
  },
  setup(e) {
    const t = e, r = computed(
      () => t.multiCalendars > 0 ? [...Array(t.multiCalendars).keys()] : [0]
    ), a = computed(() => ({
      dp__instance_calendar: t.multiCalendars > 0
    }));
    return (n, o) => (openBlock(), createElementBlock("div", {
      class: normalizeClass({
        dp__menu_inner: !n.stretch,
        "dp--menu--inner-stretched": n.stretch,
        dp__flex_display: n.multiCalendars > 0
      })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(r.value, (i, c) => (openBlock(), createElementBlock("div", {
        key: i,
        class: normalizeClass(a.value)
      }, [
        renderSlot(n.$slots, "default", {
          instance: i,
          index: c
        })
      ], 2))), 128))
    ], 2));
  }
});
var _l = ["aria-label", "aria-disabled"];
var Yt = defineComponent({
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
    const r = t, a = ref(null);
    return onMounted(() => r("set-ref", a)), (n, o) => (openBlock(), createElementBlock("button", {
      ref_key: "elRef",
      ref: a,
      type: "button",
      class: "dp__btn dp--arrow-btn-nav",
      tabindex: "0",
      "aria-label": n.ariaLabel,
      "aria-disabled": n.disabled || void 0,
      onClick: o[0] || (o[0] = (i) => n.$emit("activate")),
      onKeydown: [
        o[1] || (o[1] = withKeys(withModifiers((i) => n.$emit("activate"), ["prevent"]), ["enter"])),
        o[2] || (o[2] = withKeys(withModifiers((i) => n.$emit("activate"), ["prevent"]), ["space"]))
      ]
    }, [
      createBaseVNode("span", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: n.disabled }])
      }, [
        renderSlot(n.$slots, "default")
      ], 2)
    ], 40, _l));
  }
});
var Rl = { class: "dp--year-mode-picker" };
var Ol = ["aria-label"];
var Va = defineComponent({
  __name: "YearModePicker",
  props: {
    ...Je,
    showYearPicker: { type: Boolean, default: false },
    items: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    isDisabled: { type: Function, default: () => false }
  },
  emits: ["toggle-year-picker", "year-select", "handle-year"],
  setup(e, { emit: t }) {
    const r = t, a = e, { showRightIcon: n, showLeftIcon: o } = en(), { defaultedConfig: i, defaultedMultiCalendars: c, defaultedAriaLabels: p, defaultedTransitions: T } = Ae(a), { showTransition: D, transitionName: I } = Vt(T), k = (A = false, x) => {
      r("toggle-year-picker", { flow: A, show: x });
    }, F = (A) => {
      r("year-select", A);
    }, _ = (A = false) => {
      r("handle-year", A);
    };
    return (A, x) => {
      var y, S, B;
      return openBlock(), createElementBlock("div", Rl, [
        unref(o)(unref(c), e.instance) ? (openBlock(), createBlock(Yt, {
          key: 0,
          ref: "mpPrevIconRef",
          "aria-label": (y = unref(p)) == null ? void 0 : y.prevYear,
          disabled: e.isDisabled(false),
          onActivate: x[0] || (x[0] = (b) => _(false))
        }, {
          default: withCtx(() => [
            A.$slots["arrow-left"] ? renderSlot(A.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
            A.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(En), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
        createBaseVNode("button", {
          ref: "mpYearButtonRef",
          class: "dp__btn dp--year-select",
          type: "button",
          "aria-label": (S = unref(p)) == null ? void 0 : S.openYearsOverlay,
          onClick: x[1] || (x[1] = () => k(false)),
          onKeydown: x[2] || (x[2] = withKeys(() => k(false), ["enter"]))
        }, [
          A.$slots.year ? renderSlot(A.$slots, "year", {
            key: 0,
            year: e.year
          }) : createCommentVNode("", true),
          A.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(e.year), 1)
          ], 64))
        ], 40, Ol),
        unref(n)(unref(c), e.instance) ? (openBlock(), createBlock(Yt, {
          key: 1,
          ref: "mpNextIconRef",
          "aria-label": (B = unref(p)) == null ? void 0 : B.nextYear,
          disabled: e.isDisabled(true),
          onActivate: x[3] || (x[3] = (b) => _(true))
        }, {
          default: withCtx(() => [
            A.$slots["arrow-right"] ? renderSlot(A.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
            A.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Fn), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(I)(e.showYearPicker),
          css: unref(D)
        }, {
          default: withCtx(() => [
            e.showYearPicker ? (openBlock(), createBlock(Lt, {
              key: 0,
              items: e.items,
              "text-input": A.textInput,
              "esc-close": A.escClose,
              config: A.config,
              "is-last": A.autoApply && !unref(i).keepActionRow,
              type: "year",
              onToggle: k,
              onSelected: x[4] || (x[4] = (b) => F(b))
            }, createSlots({
              "button-icon": withCtx(() => [
                A.$slots["calendar-icon"] ? renderSlot(A.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                A.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ht), { key: 1 }))
              ]),
              _: 2
            }, [
              A.$slots["year-overlay-value"] ? {
                name: "item",
                fn: withCtx(({ item: b }) => [
                  renderSlot(A.$slots, "year-overlay-value", {
                    text: b.text,
                    value: b.value
                  })
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["items", "text-input", "esc-close", "config", "is-last"])) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var Gn = (e, t, r) => {
  if (t.value && Array.isArray(t.value))
    if (t.value.some((a) => be(e, a))) {
      const a = t.value.filter((n) => !be(n, e));
      t.value = a.length ? a : null;
    } else
      (r && +r > t.value.length || !r) && t.value.push(e);
  else
    t.value = [e];
};
var qn = (e, t, r) => {
  let a = e.value ? e.value.slice() : [];
  return a.length === 2 && a[1] !== null && (a = []), a.length ? Re(t, a[0]) ? (a.unshift(t), r("range-start", a[0]), r("range-start", a[1])) : (a[1] = t, r("range-end", t)) : (a = [t], r("range-start", t)), e.value = a, a;
};
var an = (e, t, r, a) => {
  e[0] && e[1] && r && t("auto-apply"), e[0] && !e[1] && a && r && t("auto-apply");
};
var Ua = (e) => {
  Array.isArray(e.value) && e.value.length <= 2 && e.range ? e.modelValue.value = e.value.map((t) => Xe(E(t), e.timezone)) : Array.isArray(e.value) || (e.modelValue.value = Xe(E(e.value), e.timezone));
};
var La = ({
  multiCalendars: e,
  highlight: t,
  calendars: r,
  modelValue: a,
  props: n,
  year: o,
  month: i,
  emit: c
}) => {
  const p = computed(() => jn(n.yearRange, n.reverseYears)), T = ref([false]), D = computed(() => (b, R) => {
    const G = set(qe(/* @__PURE__ */ new Date()), {
      month: i.value(b),
      year: o.value(b)
    });
    return Ba(G, n.maxDate, n.minDate, n.preventMinMaxNavigation, R);
  }), I = () => {
    for (let b = 0; b < e.value.count; b++)
      if (b === 0)
        r.value[b] = r.value[0];
      else {
        const R = set(E(), r.value[b - 1]);
        r.value[b] = { month: getMonth(R), year: getYear(addYears(R, 1)) };
      }
  }, k = (b) => {
    if (!b)
      return I();
    const R = set(E(), r.value[b]);
    return r.value[0].year = getYear(subYears(R, e.value.count - 1)), I();
  }, F = (b) => n.focusStartDate ? b[0] : b[1] ? b[1] : b[0], _ = () => {
    if (a.value) {
      const b = Array.isArray(a.value) ? F(a.value) : a.value;
      r.value[0] = { month: getMonth(b), year: getYear(b) };
    }
  };
  onMounted(() => {
    _(), e.value.count && I();
  });
  const A = (b, R) => {
    r.value[R].year = b, e.value.count && !e.value.solo && k(R);
  }, x = computed(() => (b) => St(p.value, (R) => {
    const G = o.value(b) === R.value, ee = Et(R.value, Pt(n.minDate), Pt(n.maxDate)), q = Kn(t.value, R.value);
    return { active: G, disabled: ee, highlighted: q };
  })), y = (b, R) => {
    A(b, R), B(R);
  }, S = (b, R = false) => {
    if (!D.value(b, R)) {
      const G = R ? o.value(b) + 1 : o.value(b) - 1;
      A(G, b);
    }
  }, B = (b, R = false, G) => {
    R || c("reset-flow"), G !== void 0 ? T.value[b] = G : T.value[b] = !T.value[b], T.value || c("overlay-closed");
  };
  return {
    isDisabled: D,
    groupedYears: x,
    showYearPicker: T,
    selectYear: A,
    toggleYearPicker: B,
    handleYearSelect: y,
    handleYear: S
  };
};
var Yl = (e, t) => {
  const { defaultedMultiCalendars: r, defaultedAriaLabels: a, defaultedTransitions: n, defaultedConfig: o, defaultedHighlight: i } = Ae(e), { modelValue: c, year: p, month: T, calendars: D } = Ut(e, t), I = computed(() => Ca(e.formatLocale, e.locale, e.monthNameFormat)), k = ref(null), {
    selectYear: F,
    groupedYears: _,
    showYearPicker: A,
    toggleYearPicker: x,
    handleYearSelect: y,
    handleYear: S,
    isDisabled: B
  } = La({
    modelValue: c,
    multiCalendars: r,
    highlight: i,
    calendars: D,
    year: p,
    month: T,
    props: e,
    emit: t
  });
  onMounted(() => {
    e.startDate && (c.value && e.focusStartDate || !c.value) && F(getYear(E(e.startDate)), 0);
  });
  const b = (h2) => h2 ? { month: getMonth(h2), year: getYear(h2) } : { month: null, year: null }, R = () => c.value ? Array.isArray(c.value) ? c.value.map((h2) => b(h2)) : b(c.value) : b(), G = (h2, l) => {
    const g = D.value[h2], s = R();
    return Array.isArray(s) ? s.some((J) => J.year === (g == null ? void 0 : g.year) && J.month === l) : (g == null ? void 0 : g.year) === s.year && l === s.month;
  }, ee = (h2, l, g) => {
    var J, ce;
    const s = R();
    return Array.isArray(s) ? p.value(l) === ((J = s[g]) == null ? void 0 : J.year) && h2 === ((ce = s[g]) == null ? void 0 : ce.month) : false;
  }, q = (h2, l) => {
    if (e.range) {
      const g = R();
      if (Array.isArray(c.value) && Array.isArray(g)) {
        const s = ee(h2, l, 0) || ee(h2, l, 1), J = rt(qe(E()), h2, p.value(l));
        return xt(c.value, k.value, J) && !s;
      }
      return false;
    }
    return false;
  }, fe = computed(() => (h2) => St(I.value, (l) => {
    const g = G(h2, l.value), s = Et(
      l.value,
      Ra(p.value(h2), e.minDate),
      Oa(p.value(h2), e.maxDate)
    ) || xr(e.disabledDates, p.value(h2)).includes(l.value), J = q(l.value, h2), ce = Fa(i.value, l.value, p.value(h2));
    return { active: g, disabled: s, isBetween: J, highlighted: ce };
  })), H = (h2, l) => rt(qe(E()), h2, p.value(l)), f = (h2, l) => {
    const g = c.value ? c.value : qe(/* @__PURE__ */ new Date());
    c.value = rt(g, h2, p.value(l)), t("auto-apply");
  }, M = (h2, l) => {
    const g = qn(c, H(h2, l), t);
    an(g, t, e.autoApply, e.modelAuto);
  }, V = (h2, l) => {
    Gn(H(h2, l), c, e.multiDatesLimit), t("auto-apply", true);
  }, ae = (h2, l) => (D.value[l].month = h2, d(l, D.value[l].year, h2), e.multiDates ? V(h2, l) : e.range ? M(h2, l) : f(h2, l)), C = (h2, l) => {
    F(h2, l), d(l, h2, null);
  }, d = (h2, l, g) => {
    let s = g;
    if (!s) {
      const J = R();
      s = Array.isArray(J) ? J[h2].month : J.month;
    }
    t("update-month-year", { instance: h2, year: l, month: s });
  };
  return {
    groupedMonths: fe,
    groupedYears: _,
    year: p,
    isDisabled: B,
    defaultedMultiCalendars: r,
    defaultedAriaLabels: a,
    defaultedTransitions: n,
    defaultedConfig: o,
    showYearPicker: A,
    modelValue: c,
    presetDate: (h2, l) => {
      Ua({ value: h2, modelValue: c, range: e.range, timezone: l ? void 0 : e.timezone }), t("auto-apply");
    },
    setHoverDate: (h2, l) => {
      k.value = H(h2, l);
    },
    selectMonth: ae,
    selectYear: C,
    toggleYearPicker: x,
    handleYearSelect: y,
    handleYear: S,
    getModelMonthYear: R
  };
};
var Nl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "MonthPicker",
  props: {
    ...Je
  },
  emits: [
    "update:internal-model-value",
    "overlay-closed",
    "reset-flow",
    "range-start",
    "range-end",
    "auto-apply",
    "update-month-year"
  ],
  setup(e, { expose: t, emit: r }) {
    const a = r, n = useSlots(), o = We(n, "yearMode"), i = e, {
      groupedMonths: c,
      groupedYears: p,
      year: T,
      isDisabled: D,
      defaultedMultiCalendars: I,
      defaultedConfig: k,
      showYearPicker: F,
      modelValue: _,
      presetDate: A,
      setHoverDate: x,
      selectMonth: y,
      selectYear: S,
      toggleYearPicker: B,
      handleYearSelect: b,
      handleYear: R,
      getModelMonthYear: G
    } = Yl(i, a);
    return t({ getSidebarProps: () => ({
      modelValue: _,
      year: T,
      getModelMonthYear: G,
      selectMonth: y,
      selectYear: S,
      handleYear: R
    }), presetDate: A }), (q, fe) => (openBlock(), createBlock(nn, {
      "multi-calendars": unref(I).count,
      stretch: ""
    }, {
      default: withCtx(({ instance: H }) => [
        q.$slots["month-year"] ? renderSlot(q.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, {
          year: unref(T),
          months: unref(c)(H),
          years: unref(p)(H),
          selectMonth: unref(y),
          selectYear: unref(S),
          instance: H
        }))) : (openBlock(), createBlock(Lt, {
          key: 1,
          items: unref(c)(H),
          "arrow-navigation": q.arrowNavigation,
          "is-last": q.autoApply && !unref(k).keepActionRow,
          "esc-close": q.escClose,
          height: unref(k).modeHeight,
          config: q.config,
          "no-overlay-focus": q.noOverlayFocus,
          "use-relative": "",
          type: "month",
          onSelected: (f) => unref(y)(f, H),
          onHoverValue: (f) => unref(x)(f, H)
        }, {
          header: withCtx(() => [
            createVNode(Va, mergeProps(q.$props, {
              items: unref(p)(H),
              instance: H,
              "show-year-picker": unref(F)[H],
              year: unref(T)(H),
              "is-disabled": (f) => unref(D)(H, f),
              onHandleYear: (f) => unref(R)(H, f),
              onYearSelect: (f) => unref(b)(f, H),
              onToggleYearPicker: (f) => unref(B)(H, f == null ? void 0 : f.flow, f == null ? void 0 : f.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(o), (f, M) => ({
                name: f,
                fn: withCtx((V) => [
                  renderSlot(q.$slots, f, normalizeProps(guardReactiveProps(V)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          _: 2
        }, 1032, ["items", "arrow-navigation", "is-last", "esc-close", "height", "config", "no-overlay-focus", "onSelected", "onHoverValue"]))
      ]),
      _: 3
    }, 8, ["multi-calendars"]));
  }
});
var Il = (e, t) => {
  const { modelValue: r } = Ut(e, t), a = ref(null), { defaultedHighlight: n } = Ae(e), o = ref();
  onMounted(() => {
    e.startDate && (r.value && e.focusStartDate || !r.value) && (o.value = getYear(E(e.startDate)));
  });
  const i = (k) => Array.isArray(r.value) ? r.value.some((F) => getYear(F) === k) : r.value ? getYear(r.value) === k : false, c = (k) => e.range && Array.isArray(r.value) ? xt(r.value, a.value, T(k)) : false, p = computed(() => St(jn(e.yearRange, e.reverseYears), (k) => {
    const F = i(k.value), _ = Et(k.value, Pt(e.minDate), Pt(e.maxDate)), A = c(k.value), x = Kn(n.value, k.value);
    return { active: F, disabled: _, isBetween: A, highlighted: x };
  })), T = (k) => setYear(qe(/* @__PURE__ */ new Date()), k);
  return {
    groupedYears: p,
    modelValue: r,
    focusYear: o,
    setHoverValue: (k) => {
      a.value = setYear(qe(/* @__PURE__ */ new Date()), k);
    },
    selectYear: (k) => {
      var F;
      if (e.multiDates)
        return r.value ? Array.isArray(r.value) && (((F = r.value) == null ? void 0 : F.map((A) => getYear(A))).includes(k) ? r.value = r.value.filter((A) => getYear(A) !== k) : r.value.push(setYear(Ve(E()), k))) : r.value = [setYear(Ve(E()), k)], t("auto-apply", true);
      if (e.range) {
        const _ = qn(r, T(k), t);
        return an(_, t, e.autoApply, e.modelAuto);
      }
      r.value = T(k), t("auto-apply");
    }
  };
};
var Bl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "YearPicker",
  props: {
    ...Je
  },
  emits: ["update:internal-model-value", "reset-flow", "range-start", "range-end", "auto-apply"],
  setup(e, { expose: t, emit: r }) {
    const a = r, n = e, { groupedYears: o, modelValue: i, focusYear: c, selectYear: p, setHoverValue: T } = Il(n, a), { defaultedConfig: D } = Ae(n);
    return t({ getSidebarProps: () => ({
      modelValue: i,
      selectYear: p
    }) }), (k, F) => (openBlock(), createElementBlock("div", null, [
      k.$slots["month-year"] ? renderSlot(k.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, {
        years: unref(o),
        selectYear: unref(p)
      }))) : (openBlock(), createBlock(Lt, {
        key: 1,
        items: unref(o),
        "is-last": k.autoApply && !unref(D).keepActionRow,
        height: unref(D).modeHeight,
        config: k.config,
        "no-overlay-focus": k.noOverlayFocus,
        "focus-value": unref(c),
        type: "year",
        "use-relative": "",
        onSelected: unref(p),
        onHoverValue: unref(T)
      }, createSlots({ _: 2 }, [
        k.$slots["year-overlay-value"] ? {
          name: "item",
          fn: withCtx(({ item: _ }) => [
            renderSlot(k.$slots, "year-overlay-value", {
              text: _.text,
              value: _.value
            })
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["items", "is-last", "height", "config", "no-overlay-focus", "focus-value", "onSelected", "onHoverValue"]))
    ]));
  }
});
var El = {
  key: 0,
  class: "dp__time_input"
};
var Fl = ["aria-label", "onKeydown", "onClick"];
var Hl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var Vl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var Ul = ["aria-label", "disabled", "onKeydown", "onClick"];
var Ll = ["aria-label", "onKeydown", "onClick"];
var Wl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var zl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var jl = { key: 0 };
var Kl = ["aria-label", "onKeydown"];
var Gl = defineComponent({
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
    ...Je
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
  setup(e, { expose: t, emit: r }) {
    const a = r, n = e, { setTimePickerElements: o, setTimePickerBackRef: i } = vt(), { defaultedAriaLabels: c, defaultedTransitions: p, defaultedFilters: T, defaultedConfig: D } = Ae(n), { transitionName: I, showTransition: k } = Vt(p), F = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), _ = ref("AM"), A = ref(null), x = ref([]);
    onMounted(() => {
      a("mounted");
    });
    const y = (u) => set(/* @__PURE__ */ new Date(), {
      hours: u.hours,
      minutes: u.minutes,
      seconds: n.enableSeconds ? u.seconds : 0,
      milliseconds: 0
    }), S = computed(
      () => (u) => ae(u, n[u]) || b(u, n[u])
    ), B = computed(() => ({ hours: n.hours, minutes: n.minutes, seconds: n.seconds })), b = (u, Y) => n.range && !n.disableTimeRangeValidation ? !n.validateTime(u, Y) : false, R = (u, Y) => {
      if (n.range && !n.disableTimeRangeValidation) {
        const Q = Y ? +n[`${u}Increment`] : -+n[`${u}Increment`], K = n[u] + Q;
        return !n.validateTime(u, K);
      }
      return false;
    }, G = computed(() => (u) => !d(+n[u] + +n[`${u}Increment`], u) || R(u, true)), ee = computed(() => (u) => !d(+n[u] - +n[`${u}Increment`], u) || R(u, false)), q = (u, Y) => add(set(E(), u), Y), fe = (u, Y) => sub(set(E(), u), Y), H = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !n.timePickerInline,
        dp__time_col_reg_block: !n.enableSeconds && n.is24 && !n.timePickerInline,
        dp__time_col_reg_inline: !n.enableSeconds && n.is24 && n.timePickerInline,
        dp__time_col_reg_with_button: !n.enableSeconds && !n.is24,
        dp__time_col_sec: n.enableSeconds && n.is24,
        dp__time_col_sec_with_button: n.enableSeconds && !n.is24
      })
    ), f = computed(() => {
      const u = [{ type: "hours" }, { type: "", separator: true }, { type: "minutes" }];
      return n.enableSeconds ? u.concat([{ type: "", separator: true }, { type: "seconds" }]) : u;
    }), M = computed(() => f.value.filter((u) => !u.separator)), V = computed(() => (u) => {
      if (u === "hours") {
        const Y = g(+n.hours);
        return { text: Y < 10 ? `0${Y}` : `${Y}`, value: Y };
      }
      return { text: n[u] < 10 ? `0${n[u]}` : `${n[u]}`, value: n[u] };
    }), ae = (u, Y) => {
      var K;
      if (!n.disabledTimesConfig)
        return false;
      const Q = n.disabledTimesConfig(n.order, u === "hours" ? Y : void 0);
      return Q[u] ? !!((K = Q[u]) != null && K.includes(Y)) : true;
    }, C = (u) => {
      const Y = n.is24 ? 24 : 12, Q = u === "hours" ? Y : 60, K = +n[`${u}GridIncrement`], te = u === "hours" && !n.is24 ? K : 0, oe = [];
      for (let pe = te; pe < Q; pe += K)
        oe.push({ value: pe, text: pe < 10 ? `0${pe}` : `${pe}` });
      return u === "hours" && !n.is24 && oe.push({ value: 0, text: "12" }), St(oe, (pe) => ({ active: false, disabled: T.value.times[u].includes(pe.value) || !d(pe.value, u) || ae(u, pe.value) || b(u, pe.value) }));
    }, d = (u, Y) => {
      const Q = n.minTime ? y(yn(n.minTime)) : null, K = n.maxTime ? y(yn(n.maxTime)) : null, te = y(yn(B.value, Y, u));
      return Q && K ? (isBefore(te, K) || isEqual(te, K)) && (isAfter(te, Q) || isEqual(te, Q)) : Q ? isAfter(te, Q) || isEqual(te, Q) : K ? isBefore(te, K) || isEqual(te, K) : true;
    }, P = (u) => n[`no${u[0].toUpperCase() + u.slice(1)}Overlay`], X = (u) => {
      P(u) || (F[u] = !F[u], F[u] || a("overlay-closed"));
    }, h2 = (u) => u === "hours" ? getHours : u === "minutes" ? getMinutes : getSeconds, l = (u, Y = true) => {
      const Q = Y ? q : fe, K = Y ? +n[`${u}Increment`] : -+n[`${u}Increment`];
      d(+n[u] + K, u) && a(
        `update:${u}`,
        h2(u)(Q({ [u]: +n[u] }, { [u]: +n[`${u}Increment`] }))
      );
    }, g = (u) => n.is24 ? u : (u >= 12 ? _.value = "PM" : _.value = "AM", Hr(u)), s = () => {
      _.value === "PM" ? (_.value = "AM", a("update:hours", n.hours - 12)) : (_.value = "PM", a("update:hours", n.hours + 12)), a("am-pm-change", _.value);
    }, J = (u) => {
      F[u] = true;
    }, ce = (u, Y, Q) => {
      if (u && n.arrowNavigation) {
        Array.isArray(x.value[Y]) ? x.value[Y][Q] = u : x.value[Y] = [u];
        const K = x.value.reduce(
          (te, oe) => oe.map((pe, O) => [...te[O] || [], oe[O]]),
          []
        );
        i(n.closeTimePickerBtn), A.value && (K[1] = K[1].concat(A.value)), o(K, n.order);
      }
    }, $ = (u, Y) => (X(u), u === "hours" && !n.is24 ? a(`update:${u}`, _.value === "PM" ? Y + 12 : Y) : a(`update:${u}`, Y));
    return t({ openChildCmp: J }), (u, Y) => {
      var Q;
      return u.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", El, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(f.value, (K, te) => {
          var oe, pe, O;
          return openBlock(), createElementBlock("div", {
            key: te,
            class: normalizeClass(H.value)
          }, [
            K.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(" : ")
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                ref_for: true,
                ref: (L) => ce(L, te, 0),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !u.timePickerInline,
                  dp__inc_dec_button_inline: u.timePickerInline,
                  dp__tp_inline_btn_top: u.timePickerInline,
                  dp__inc_dec_button_disabled: G.value(K.type)
                }),
                "aria-label": (oe = unref(c)) == null ? void 0 : oe.incrementValue(K.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((L) => l(K.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((L) => l(K.type), ["prevent"]), ["space"])
                ],
                onClick: (L) => l(K.type)
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  Hl,
                  Vl
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  u.$slots["arrow-up"] ? renderSlot(u.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  u.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Vn), { key: 1 }))
                ], 64))
              ], 42, Fl),
              createBaseVNode("button", {
                ref_for: true,
                ref: (L) => ce(L, te, 1),
                type: "button",
                "aria-label": (pe = unref(c)) == null ? void 0 : pe.openTpOverlay(K.type),
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !u.timePickerInline,
                  dp__time_display_inline: u.timePickerInline,
                  "dp--time-invalid": S.value(K.type),
                  "dp--time-overlay-btn": !S.value(K.type)
                }),
                disabled: P(K.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((L) => X(K.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((L) => X(K.type), ["prevent"]), ["space"])
                ],
                onClick: (L) => X(K.type)
              }, [
                u.$slots[K.type] ? renderSlot(u.$slots, K.type, {
                  key: 0,
                  text: V.value(K.type).text,
                  value: V.value(K.type).value
                }) : createCommentVNode("", true),
                u.$slots[K.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(V.value(K.type).text), 1)
                ], 64))
              ], 42, Ul),
              createBaseVNode("button", {
                ref_for: true,
                ref: (L) => ce(L, te, 2),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !u.timePickerInline,
                  dp__inc_dec_button_inline: u.timePickerInline,
                  dp__tp_inline_btn_bottom: u.timePickerInline,
                  dp__inc_dec_button_disabled: ee.value(K.type)
                }),
                "aria-label": (O = unref(c)) == null ? void 0 : O.decrementValue(K.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((L) => l(K.type, false), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((L) => l(K.type, false), ["prevent"]), ["space"])
                ],
                onClick: (L) => l(K.type, false)
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  Wl,
                  zl
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  u.$slots["arrow-down"] ? renderSlot(u.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                  u.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Un), { key: 1 }))
                ], 64))
              ], 42, Ll)
            ], 64))
          ], 2);
        }), 128)),
        u.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", jl, [
          u.$slots["am-pm-button"] ? renderSlot(u.$slots, "am-pm-button", {
            key: 0,
            toggle: s,
            value: _.value
          }) : createCommentVNode("", true),
          u.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: A,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (Q = unref(c)) == null ? void 0 : Q.amPmButton,
            tabindex: "0",
            onClick: s,
            onKeydown: [
              withKeys(withModifiers(s, ["prevent"]), ["enter"]),
              withKeys(withModifiers(s, ["prevent"]), ["space"])
            ]
          }, toDisplayString(_.value), 41, Kl))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(M.value, (K, te) => (openBlock(), createBlock(Transition, {
          key: te,
          name: unref(I)(F[K.type]),
          css: unref(k)
        }, {
          default: withCtx(() => [
            F[K.type] ? (openBlock(), createBlock(Lt, {
              key: 0,
              items: C(K.type),
              "is-last": u.autoApply && !unref(D).keepActionRow,
              "esc-close": u.escClose,
              type: K.type,
              "text-input": u.textInput,
              config: u.config,
              "arrow-navigation": u.arrowNavigation,
              onSelected: (oe) => $(K.type, oe),
              onToggle: (oe) => X(K.type),
              onResetFlow: Y[0] || (Y[0] = (oe) => u.$emit("reset-flow"))
            }, createSlots({
              "button-icon": withCtx(() => [
                u.$slots["clock-icon"] ? renderSlot(u.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                u.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Hn), { key: 1 }))
              ]),
              _: 2
            }, [
              u.$slots[`${K.type}-overlay-value`] ? {
                name: "item",
                fn: withCtx(({ item: oe }) => [
                  renderSlot(u.$slots, `${K.type}-overlay-value`, {
                    text: oe.text,
                    value: oe.value
                  })
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["items", "is-last", "esc-close", "type", "text-input", "config", "arrow-navigation", "onSelected", "onToggle"])) : createCommentVNode("", true)
          ]),
          _: 2
        }, 1032, ["name", "css"]))), 128))
      ]));
    };
  }
});
var ql = { class: "dp--tp-wrap" };
var Zl = ["aria-label", "tabindex"];
var Ql = ["tabindex"];
var Xl = ["aria-label"];
var Wa = defineComponent({
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
    ...Je
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
  setup(e, { expose: t, emit: r }) {
    const a = r, n = e, { buildMatrix: o, setTimePicker: i } = vt(), c = useSlots(), { defaultedTransitions: p, defaultedAriaLabels: T, defaultedTextInput: D, defaultedConfig: I } = Ae(n), { transitionName: k, showTransition: F } = Vt(p), { hideNavigationButtons: _ } = en(), A = ref(null), x = ref(null), y = ref([]), S = ref(null);
    onMounted(() => {
      a("mount"), !n.timePicker && n.arrowNavigation ? o([Pe(A.value)], "time") : i(true, n.timePicker);
    });
    const B = computed(() => n.range && n.modelAuto ? _a(n.internalModelValue) : true), b = ref(false), R = (C) => ({
      hours: Array.isArray(n.hours) ? n.hours[C] : n.hours,
      minutes: Array.isArray(n.minutes) ? n.minutes[C] : n.minutes,
      seconds: Array.isArray(n.seconds) ? n.seconds[C] : n.seconds
    }), G = computed(() => {
      const C = [];
      if (n.range)
        for (let d = 0; d < 2; d++)
          C.push(R(d));
      else
        C.push(R(0));
      return C;
    }), ee = (C, d = false, P = "") => {
      d || a("reset-flow"), b.value = C, a(C ? "overlay-opened" : "overlay-closed"), n.arrowNavigation && i(C), nextTick(() => {
        P !== "" && y.value[0] && y.value[0].openChildCmp(P);
      });
    }, q = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: n.autoApply && !I.value.keepActionRow
    })), fe = We(c, "timePicker"), H = (C, d, P) => n.range ? d === 0 ? [C, G.value[1][P]] : [G.value[0][P], C] : C, f = (C) => {
      a("update:hours", C);
    }, M = (C) => {
      a("update:minutes", C);
    }, V = (C) => {
      a("update:seconds", C);
    }, ae = () => {
      if (S.value && !D.value.enabled && !n.noOverlayFocus) {
        const C = Ur(S.value);
        C && C.focus({ preventScroll: true });
      }
    };
    return t({ toggleTimePicker: ee }), (C, d) => {
      var P;
      return openBlock(), createElementBlock("div", ql, [
        !C.timePicker && !C.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "openTimePickerBtn",
          ref: A,
          type: "button",
          class: normalizeClass(q.value),
          "aria-label": (P = unref(T)) == null ? void 0 : P.openTimePicker,
          tabindex: C.noOverlayFocus ? void 0 : 0,
          onKeydown: [
            d[0] || (d[0] = withKeys((X) => ee(true), ["enter"])),
            d[1] || (d[1] = withKeys((X) => ee(true), ["space"]))
          ],
          onClick: d[2] || (d[2] = (X) => ee(true))
        }, [
          C.$slots["clock-icon"] ? renderSlot(C.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          C.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Hn), { key: 1 }))
        ], 42, Zl)), [
          [vShow, !unref(_)(C.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(k)(b.value),
          css: unref(F) && !C.timePickerInline
        }, {
          default: withCtx(() => {
            var X;
            return [
              b.value || C.timePicker || C.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "overlayRef",
                ref: S,
                class: normalizeClass({
                  dp__overlay: !C.timePickerInline,
                  "dp--overlay-absolute": !n.timePicker && !C.timePickerInline,
                  "dp--overlay-relative": n.timePicker
                }),
                style: normalizeStyle(C.timePicker ? { height: `${unref(I).modeHeight}px` } : void 0),
                tabindex: C.timePickerInline ? void 0 : 0
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(
                    C.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
                  ),
                  style: { display: "flex" }
                }, [
                  C.$slots["time-picker-overlay"] ? renderSlot(C.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e.hours,
                    minutes: e.minutes,
                    seconds: e.seconds,
                    setHours: f,
                    setMinutes: M,
                    setSeconds: V
                  }) : createCommentVNode("", true),
                  C.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(C.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(G.value, (h2, l) => withDirectives((openBlock(), createBlock(Gl, mergeProps({ key: l }, {
                      ...C.$props,
                      order: l,
                      hours: h2.hours,
                      minutes: h2.minutes,
                      seconds: h2.seconds,
                      closeTimePickerBtn: x.value,
                      disabledTimesConfig: e.disabledTimesConfig,
                      disabled: l === 0 ? C.fixedStart : C.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: y,
                      "validate-time": (g, s) => e.validateTime(g, H(s, l, g)),
                      "onUpdate:hours": (g) => f(H(g, l, "hours")),
                      "onUpdate:minutes": (g) => M(H(g, l, "minutes")),
                      "onUpdate:seconds": (g) => V(H(g, l, "seconds")),
                      onMounted: ae,
                      onOverlayClosed: ae,
                      onAmPmChange: d[3] || (d[3] = (g) => C.$emit("am-pm-change", g))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(fe), (g, s) => ({
                        name: g,
                        fn: withCtx((J) => [
                          renderSlot(C.$slots, g, normalizeProps(guardReactiveProps(J)))
                        ])
                      }))
                    ]), 1040, ["validate-time", "onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, l === 0 ? true : B.value]
                    ])), 128))
                  ], 2)),
                  !C.timePicker && !C.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: x,
                    type: "button",
                    class: normalizeClass(q.value),
                    "aria-label": (X = unref(T)) == null ? void 0 : X.closeTimePicker,
                    tabindex: "0",
                    onKeydown: [
                      d[4] || (d[4] = withKeys((h2) => ee(false), ["enter"])),
                      d[5] || (d[5] = withKeys((h2) => ee(false), ["space"]))
                    ],
                    onClick: d[6] || (d[6] = (h2) => ee(false))
                  }, [
                    C.$slots["calendar-icon"] ? renderSlot(C.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    C.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ht), { key: 1 }))
                  ], 42, Xl)), [
                    [vShow, !unref(_)(C.hideNavigation, "time")]
                  ]) : createCommentVNode("", true)
                ], 2)
              ], 14, Ql)) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var za = (e, t, r, a) => {
  const n = (y, S) => Array.isArray(t[y]) ? t[y][S] : t[y], o = (y) => e.enableSeconds ? Array.isArray(t.seconds) ? t.seconds[y] : t.seconds : 0, i = (y, S) => y ? S !== void 0 ? dt(y, n("hours", S), n("minutes", S), o(S)) : dt(y, t.hours, t.minutes, o()) : setSeconds(E(), o(S)), c = (y, S) => {
    t[y] = S;
  }, p = (y, S) => {
    const B = Object.fromEntries(
      Object.keys(t).map((b) => b === y ? [b, S] : [b, t[b]].slice())
    );
    if (e.range && !e.disableTimeRangeValidation) {
      const b = (G) => r.value ? dt(
        r.value[G],
        B.hours[G],
        B.minutes[G],
        B.seconds[G]
      ) : null, R = (G) => setMilliseconds(r.value[G], 0);
      return !(be(b(0), b(1)) && (isAfter(b(0), R(1)) || isBefore(b(1), R(0))));
    }
    return true;
  }, T = (y, S) => {
    p(y, S) && (c(y, S), a && a());
  }, D = (y) => {
    T("hours", y);
  }, I = (y) => {
    T("minutes", y);
  }, k = (y) => {
    T("seconds", y);
  }, F = (y, S, B, b) => {
    S && D(y), !S && !B && I(y), B && k(y), r.value && b(r.value);
  }, _ = (y) => {
    if (y) {
      const S = Array.isArray(y), B = S ? [+y[0].hours, +y[1].hours] : +y.hours, b = S ? [+y[0].minutes, +y[1].minutes] : +y.minutes, R = S ? [+y[0].seconds, +y[1].seconds] : +y.seconds;
      c("hours", B), c("minutes", b), e.enableSeconds && c("seconds", R);
    }
  }, A = (y, S) => {
    const B = {
      hours: Array.isArray(t.hours) ? t.hours[y] : t.hours,
      disabledArr: []
    };
    return (S || S === 0) && (B.hours = S), Array.isArray(e.disabledTimes) && (B.disabledArr = e.range && Array.isArray(e.disabledTimes[y]) ? e.disabledTimes[y] : e.disabledTimes), B;
  }, x = computed(() => (y, S) => {
    var B;
    if (Array.isArray(e.disabledTimes)) {
      const { disabledArr: b, hours: R } = A(y, S), G = b.filter((ee) => +ee.hours === R);
      return ((B = G[0]) == null ? void 0 : B.minutes) === "*" ? { hours: [R], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (G == null ? void 0 : G.map((ee) => +ee.minutes)) ?? [],
        seconds: (G == null ? void 0 : G.map((ee) => ee.seconds ? +ee.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: c,
    updateHours: D,
    updateMinutes: I,
    updateSeconds: k,
    getSetDateTime: i,
    updateTimeValues: F,
    getSecondsValue: o,
    assignStartTime: _,
    validateTime: p,
    disabledTimesConfig: x
  };
};
var Jl = (e, t) => {
  const { modelValue: r, time: a } = Ut(e, t), { defaultedStartTime: n } = Ae(e), { updateTimeValues: o, getSetDateTime: i, setTime: c, assignStartTime: p, disabledTimesConfig: T, validateTime: D } = za(e, a, r), I = (B) => {
    const { hours: b, minutes: R, seconds: G } = B;
    return { hours: +b, minutes: +R, seconds: G ? +G : 0 };
  }, k = () => {
    if (e.startTime) {
      if (Array.isArray(e.startTime)) {
        const b = I(e.startTime[0]), R = I(e.startTime[1]);
        return [set(E(), b), set(E(), R)];
      }
      const B = I(e.startTime);
      return set(E(), B);
    }
    return e.range ? [null, null] : null;
  }, F = () => {
    if (e.range) {
      const [B, b] = k();
      r.value = [i(B, 0), i(b, 1)];
    } else
      r.value = i(k());
  }, _ = (B) => Array.isArray(B) ? [bt(E(B[0])), bt(E(B[1]))] : [bt(B ?? E())], A = (B, b, R) => {
    c("hours", B), c("minutes", b), c("seconds", e.enableSeconds ? R : 0);
  }, x = () => {
    const [B, b] = _(r.value);
    return e.range ? A(
      [B.hours, b.hours],
      [B.minutes, b.minutes],
      [B.seconds, b.minutes]
    ) : A(B.hours, B.minutes, B.seconds);
  };
  onMounted(() => {
    if (!e.shadow)
      return p(n.value), r.value ? x() : F();
  });
  const y = () => {
    Array.isArray(r.value) ? r.value = r.value.map((B, b) => B && i(B, b)) : r.value = i(r.value), t("time-update");
  };
  return {
    modelValue: r,
    time: a,
    disabledTimesConfig: T,
    updateTime: (B, b = true, R = false) => {
      o(B, b, R, y);
    },
    validateTime: D
  };
};
var xl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePickerSolo",
  props: {
    ...Je
  },
  emits: ["update:internal-model-value", "time-update", "am-pm-change"],
  setup(e, { expose: t, emit: r }) {
    const a = r, n = e, o = useSlots(), i = We(o, "timePicker"), { time: c, modelValue: p, disabledTimesConfig: T, updateTime: D, validateTime: I } = Jl(n, a);
    return t({ getSidebarProps: () => ({
      modelValue: p,
      time: c,
      updateTime: D
    }) }), (F, _) => (openBlock(), createBlock(nn, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(() => [
        createVNode(Wa, mergeProps(F.$props, {
          hours: unref(c).hours,
          minutes: unref(c).minutes,
          seconds: unref(c).seconds,
          "internal-model-value": F.internalModelValue,
          "disabled-times-config": unref(T),
          "validate-time": unref(I),
          "onUpdate:hours": _[0] || (_[0] = (A) => unref(D)(A)),
          "onUpdate:minutes": _[1] || (_[1] = (A) => unref(D)(A, false)),
          "onUpdate:seconds": _[2] || (_[2] = (A) => unref(D)(A, false, true)),
          onAmPmChange: _[3] || (_[3] = (A) => F.$emit("am-pm-change", A))
        }), createSlots({ _: 2 }, [
          renderList(unref(i), (A, x) => ({
            name: A,
            fn: withCtx((y) => [
              renderSlot(F.$slots, A, normalizeProps(guardReactiveProps(y)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"])
      ]),
      _: 3
    }));
  }
});
var eo = { class: "dp__month_year_row" };
var to = ["aria-label", "onClick", "onKeydown"];
var no = defineComponent({
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
    ...Je
  },
  emits: ["update-month-year", "mount", "reset-flow", "overlay-closed"],
  setup(e, { expose: t, emit: r }) {
    const a = r, n = e, {
      defaultedTransitions: o,
      defaultedAriaLabels: i,
      defaultedMultiCalendars: c,
      defaultedFilters: p,
      defaultedConfig: T,
      defaultedHighlight: D
    } = Ae(n), { transitionName: I, showTransition: k } = Vt(o), { buildMatrix: F } = vt(), { handleMonthYearChange: _, isDisabled: A, updateMonthYear: x } = fl(n, a), { showLeftIcon: y, showRightIcon: S } = en(), B = ref(false), b = ref(false), R = ref([null, null, null, null]);
    onMounted(() => {
      a("mount");
    });
    const G = (l) => ({
      get: () => n[l],
      set: (g) => {
        const s = l === Ge.month ? Ge.year : Ge.month;
        a("update-month-year", { [l]: g, [s]: n[s] }), l === Ge.month ? ae(true) : C(true);
      }
    }), ee = computed(G(Ge.month)), q = computed(G(Ge.year)), fe = computed(() => (l) => ({
      month: n.month,
      year: n.year,
      items: l === Ge.month ? n.months : n.years,
      instance: n.instance,
      updateMonthYear: x,
      toggle: l === Ge.month ? ae : C
    })), H = computed(() => {
      const l = n.months.find((g) => g.value === n.month);
      return l || { text: "", value: 0 };
    }), f = computed(() => St(n.months, (l) => {
      const g = n.month === l.value, s = Et(
        l.value,
        Ra(n.year, n.minDate),
        Oa(n.year, n.maxDate)
      ) || p.value.months.includes(l.value), J = Fa(D.value, l.value, n.year);
      return { active: g, disabled: s, highlighted: J };
    })), M = computed(() => St(n.years, (l) => {
      const g = n.year === l.value, s = Et(l.value, Pt(n.minDate), Pt(n.maxDate)) || p.value.years.includes(l.value), J = Kn(D.value, l.value);
      return { active: g, disabled: s, highlighted: J };
    })), V = (l, g) => {
      g !== void 0 ? l.value = g : l.value = !l.value, l.value || a("overlay-closed");
    }, ae = (l = false, g) => {
      d(l), V(B, g);
    }, C = (l = false, g) => {
      d(l), V(b, g);
    }, d = (l) => {
      l || a("reset-flow");
    }, P = (l, g) => {
      n.arrowNavigation && (R.value[g] = Pe(l), F(R.value, "monthYear"));
    }, X = computed(() => {
      var l, g;
      return [
        {
          type: Ge.month,
          index: 1,
          toggle: ae,
          modelValue: ee.value,
          updateModelValue: (s) => ee.value = s,
          text: H.value.text,
          showSelectionGrid: B.value,
          items: f.value,
          ariaLabel: (l = i.value) == null ? void 0 : l.openMonthsOverlay
        },
        {
          type: Ge.year,
          index: 2,
          toggle: C,
          modelValue: q.value,
          updateModelValue: (s) => q.value = s,
          text: n.year,
          showSelectionGrid: b.value,
          items: M.value,
          ariaLabel: (g = i.value) == null ? void 0 : g.openYearsOverlay
        }
      ];
    }), h2 = computed(() => n.disableYearSelect ? [X.value[0]] : n.yearFirst ? [...X.value].reverse() : X.value);
    return t({
      toggleMonthPicker: ae,
      toggleYearPicker: C,
      handleMonthYearChange: _
    }), (l, g) => {
      var s, J, ce;
      return openBlock(), createElementBlock("div", eo, [
        l.$slots["month-year"] ? renderSlot(l.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, { month: e.month, year: e.year, months: e.months, years: e.years, updateMonthYear: unref(x), handleMonthYearChange: unref(_), instance: e.instance }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          unref(y)(unref(c), e.instance) && !l.vertical ? (openBlock(), createBlock(Yt, {
            key: 0,
            "aria-label": (s = unref(i)) == null ? void 0 : s.prevMonth,
            disabled: unref(A)(false),
            onActivate: g[0] || (g[0] = ($) => unref(_)(false, true)),
            onSetRef: g[1] || (g[1] = ($) => P($, 0))
          }, {
            default: withCtx(() => [
              l.$slots["arrow-left"] ? renderSlot(l.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
              l.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(En), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: normalizeClass(["dp__month_year_wrap", {
              dp__year_disable_select: l.disableYearSelect
            }])
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(h2.value, ($, u) => (openBlock(), createElementBlock(Fragment, {
              key: $.type
            }, [
              createBaseVNode("button", {
                ref_for: true,
                ref: (Y) => P(Y, u + 1),
                type: "button",
                class: "dp__btn dp__month_year_select",
                tabindex: "0",
                "aria-label": $.ariaLabel,
                onClick: $.toggle,
                onKeydown: [
                  withKeys(withModifiers($.toggle, ["prevent"]), ["enter"]),
                  withKeys(withModifiers($.toggle, ["prevent"]), ["space"])
                ]
              }, [
                l.$slots[$.type] ? renderSlot(l.$slots, $.type, {
                  key: 0,
                  text: $.text,
                  value: n[$.type]
                }) : createCommentVNode("", true),
                l.$slots[$.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString($.text), 1)
                ], 64))
              ], 40, to),
              createVNode(Transition, {
                name: unref(I)($.showSelectionGrid),
                css: unref(k)
              }, {
                default: withCtx(() => [
                  $.showSelectionGrid ? (openBlock(), createBlock(Lt, {
                    key: 0,
                    items: $.items,
                    "arrow-navigation": l.arrowNavigation,
                    "hide-navigation": l.hideNavigation,
                    "is-last": l.autoApply && !unref(T).keepActionRow,
                    "skip-button-ref": false,
                    config: l.config,
                    type: $.type,
                    "header-refs": [],
                    "esc-close": l.escClose,
                    "text-input": l.textInput,
                    onSelected: $.updateModelValue,
                    onToggle: $.toggle
                  }, createSlots({
                    "button-icon": withCtx(() => [
                      l.$slots["calendar-icon"] ? renderSlot(l.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                      l.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ht), { key: 1 }))
                    ]),
                    _: 2
                  }, [
                    l.$slots[`${$.type}-overlay-value`] ? {
                      name: "item",
                      fn: withCtx(({ item: Y }) => [
                        renderSlot(l.$slots, `${$.type}-overlay-value`, {
                          text: Y.text,
                          value: Y.value
                        })
                      ]),
                      key: "0"
                    } : void 0,
                    l.$slots[`${$.type}-overlay`] ? {
                      name: "overlay",
                      fn: withCtx(() => [
                        renderSlot(l.$slots, `${$.type}-overlay`, normalizeProps(guardReactiveProps(fe.value($.type))))
                      ]),
                      key: "1"
                    } : void 0,
                    l.$slots[`${$.type}-overlay-header`] ? {
                      name: "header",
                      fn: withCtx(() => [
                        renderSlot(l.$slots, `${$.type}-overlay-header`, {
                          toggle: $.toggle
                        })
                      ]),
                      key: "2"
                    } : void 0
                  ]), 1032, ["items", "arrow-navigation", "hide-navigation", "is-last", "config", "type", "esc-close", "text-input", "onSelected", "onToggle"])) : createCommentVNode("", true)
                ]),
                _: 2
              }, 1032, ["name", "css"])
            ], 64))), 128))
          ], 2),
          unref(y)(unref(c), e.instance) && l.vertical ? (openBlock(), createBlock(Yt, {
            key: 1,
            "aria-label": (J = unref(i)) == null ? void 0 : J.prevMonth,
            disabled: unref(A)(false),
            onActivate: g[2] || (g[2] = ($) => unref(_)(false, true))
          }, {
            default: withCtx(() => [
              l.$slots["arrow-up"] ? renderSlot(l.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
              l.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Vn), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
          unref(S)(unref(c), e.instance) ? (openBlock(), createBlock(Yt, {
            key: 2,
            ref: "rightIcon",
            disabled: unref(A)(true),
            "aria-label": (ce = unref(i)) == null ? void 0 : ce.nextMonth,
            onActivate: g[3] || (g[3] = ($) => unref(_)(true, true)),
            onSetRef: g[4] || (g[4] = ($) => P($, l.disableYearSelect ? 2 : 3))
          }, {
            default: withCtx(() => [
              l.$slots[l.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(l.$slots, l.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
              l.$slots[l.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(l.vertical ? unref(Un) : unref(Fn)), { key: 1 }))
            ]),
            _: 3
          }, 8, ["disabled", "aria-label"])) : createCommentVNode("", true)
        ], 64))
      ]);
    };
  }
});
var ao = ["aria-label"];
var ro = {
  class: "dp__calendar_header",
  role: "row"
};
var lo = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
};
var oo = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1);
var so = ["aria-label"];
var io = {
  key: 0,
  role: "gridcell",
  class: "dp__calendar_item dp__week_num"
};
var uo = { class: "dp__cell_inner" };
var co = ["id", "aria-selected", "aria-disabled", "aria-label", "onClick", "onKeydown", "onMouseenter", "onMouseleave"];
var fo = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DpCalendar",
  props: {
    mappedDates: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    ...Je
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
  setup(e, { expose: t, emit: r }) {
    const a = r, n = e, { buildMultiLevelMatrix: o } = vt(), {
      defaultedTransitions: i,
      defaultedConfig: c,
      defaultedAriaLabels: p,
      defaultedMultiCalendars: T,
      defaultedWeekNumbers: D
    } = Ae(n), I = ref(null), k = ref({
      bottom: "",
      left: "",
      transform: ""
    }), F = ref([]), _ = ref(null), A = ref(true), x = ref(""), y = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), S = ref([]), B = ref({ left: "50%" }), b = computed(() => n.calendar ? n.calendar(n.mappedDates) : n.mappedDates), R = computed(() => n.dayNames ? Array.isArray(n.dayNames) ? n.dayNames : n.dayNames(n.locale, +n.weekStart) : Fr(n.formatLocale, n.locale, +n.weekStart));
    onMounted(() => {
      a("mount", { cmp: "calendar", refs: F }), c.value.noSwipe || _.value && (_.value.addEventListener("touchstart", C, { passive: false }), _.value.addEventListener("touchend", d, { passive: false }), _.value.addEventListener("touchmove", P, { passive: false })), n.monthChangeOnScroll && _.value && _.value.addEventListener("wheel", l, { passive: false });
    });
    const G = ($) => $ ? n.vertical ? "vNext" : "next" : n.vertical ? "vPrevious" : "previous", ee = ($, u) => {
      if (n.transitions) {
        const Y = Ve(rt(E(), n.month, n.year));
        x.value = Ie(Ve(rt(E(), $, u)), Y) ? i.value[G(true)] : i.value[G(false)], A.value = false, nextTick(() => {
          A.value = true;
        });
      }
    }, q = computed(
      () => ({
        [n.calendarClassName]: !!n.calendarClassName
      })
    ), fe = computed(() => ($) => {
      const u = Vr($);
      return {
        dp__marker_dot: u.type === "dot",
        dp__marker_line: u.type === "line"
      };
    }), H = computed(() => ($) => be($, I.value)), f = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: T.value.count > 0 && n.instance !== 0
    })), M = computed(() => ($) => n.hideOffsetDates ? $.current : true), V = async ($, u, Y) => {
      var Q, K;
      if (a("set-hover-date", $), (K = (Q = $.marker) == null ? void 0 : Q.tooltip) != null && K.length) {
        const te = Pe(F.value[u][Y]);
        if (te) {
          const { width: oe, height: pe } = te.getBoundingClientRect();
          I.value = $.value;
          let O = { left: `${oe / 2}px` }, L = -50;
          if (await nextTick(), S.value[0]) {
            const { left: De, width: Z } = S.value[0].getBoundingClientRect();
            De < 0 && (O = { left: "0" }, L = 0, B.value.left = `${oe / 2}px`), window.innerWidth < De + Z && (O = { right: "0" }, L = 0, B.value.left = `${Z - oe / 2}px`);
          }
          k.value = {
            bottom: `${pe}px`,
            ...O,
            transform: `translateX(${L}%)`
          }, a("tooltip-open", $.marker);
        }
      }
    }, ae = ($) => {
      I.value && (I.value = null, k.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a("tooltip-close", $.marker));
    }, C = ($) => {
      y.value.startX = $.changedTouches[0].screenX, y.value.startY = $.changedTouches[0].screenY;
    }, d = ($) => {
      y.value.endX = $.changedTouches[0].screenX, y.value.endY = $.changedTouches[0].screenY, X();
    }, P = ($) => {
      n.vertical && !n.inline && $.preventDefault();
    }, X = () => {
      const $ = n.vertical ? "Y" : "X";
      Math.abs(y.value[`start${$}`] - y.value[`end${$}`]) > 10 && a("handle-swipe", y.value[`start${$}`] > y.value[`end${$}`] ? "right" : "left");
    }, h2 = ($, u, Y) => {
      $ && (Array.isArray(F.value[u]) ? F.value[u][Y] = $ : F.value[u] = [$]), n.arrowNavigation && o(F.value, "calendar");
    }, l = ($) => {
      n.monthChangeOnScroll && ($.preventDefault(), a("handle-scroll", $));
    }, g = ($) => D.value.type === "local" ? getWeek($.value, { weekStartsOn: +n.weekStart }) : D.value.type === "iso" ? getISOWeek($.value) : typeof D.value.type == "function" ? D.value.type($.value) : "", s = ($) => {
      const u = $[0];
      return D.value.hideOnOffsetDates ? $.some((Y) => Y.current) ? g(u) : "" : g(u);
    }, J = ($, u) => {
      ut($, c.value), a("select-date", u);
    }, ce = ($) => {
      ut($, c.value);
    };
    return t({ triggerTransition: ee }), ($, u) => {
      var Y;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(f.value)
      }, [
        createBaseVNode("div", {
          ref_key: "calendarWrapRef",
          ref: _,
          role: "grid",
          class: normalizeClass(q.value),
          "aria-label": (Y = unref(p)) == null ? void 0 : Y.calendarWrap
        }, [
          (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createBaseVNode("div", ro, [
              $.weekNumbers ? (openBlock(), createElementBlock("div", lo, toDisplayString($.weekNumName), 1)) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(R.value, (Q, K) => (openBlock(), createElementBlock("div", {
                key: K,
                class: "dp__calendar_header_item",
                role: "gridcell"
              }, [
                $.$slots["calendar-header"] ? renderSlot($.$slots, "calendar-header", {
                  key: 0,
                  day: Q,
                  index: K
                }) : createCommentVNode("", true),
                $.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(Q), 1)
                ], 64))
              ]))), 128))
            ]),
            oo,
            createVNode(Transition, {
              name: x.value,
              css: !!$.transitions
            }, {
              default: withCtx(() => {
                var Q;
                return [
                  A.value ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "dp__calendar",
                    role: "rowgroup",
                    "aria-label": ((Q = unref(p)) == null ? void 0 : Q.calendarDays) || void 0
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(b.value, (K, te) => (openBlock(), createElementBlock("div", {
                      key: te,
                      class: "dp__calendar_row",
                      role: "row"
                    }, [
                      $.weekNumbers ? (openBlock(), createElementBlock("div", io, [
                        createBaseVNode("div", uo, toDisplayString(s(K.days)), 1)
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(K.days, (oe, pe) => {
                        var O, L, De;
                        return openBlock(), createElementBlock("div", {
                          id: oe.value.toISOString().split("T")[0],
                          ref_for: true,
                          ref: (Z) => h2(Z, te, pe),
                          key: pe + te,
                          role: "gridcell",
                          class: "dp__calendar_item",
                          "aria-selected": oe.classData.dp__active_date || oe.classData.dp__range_start || oe.classData.dp__range_start,
                          "aria-disabled": oe.classData.dp__cell_disabled || void 0,
                          "aria-label": (L = (O = unref(p)) == null ? void 0 : O.day) == null ? void 0 : L.call(O, oe),
                          tabindex: "0",
                          onClick: withModifiers((Z) => J(Z, oe), ["prevent"]),
                          onKeydown: [
                            withKeys((Z) => $.$emit("select-date", oe), ["enter"]),
                            withKeys((Z) => $.$emit("handle-space", oe), ["space"])
                          ],
                          onMouseenter: (Z) => V(oe, te, pe),
                          onMouseleave: (Z) => ae(oe)
                        }, [
                          createBaseVNode("div", {
                            class: normalizeClass(["dp__cell_inner", oe.classData])
                          }, [
                            $.$slots.day && M.value(oe) ? renderSlot($.$slots, "day", {
                              key: 0,
                              day: +oe.text,
                              date: oe.value
                            }) : createCommentVNode("", true),
                            $.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createTextVNode(toDisplayString(oe.text), 1)
                            ], 64)),
                            oe.marker && M.value(oe) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                              $.$slots.marker ? renderSlot($.$slots, "marker", {
                                key: 0,
                                marker: oe.marker,
                                day: +oe.text,
                                date: oe.value
                              }) : (openBlock(), createElementBlock("div", {
                                key: 1,
                                class: normalizeClass(fe.value(oe.marker)),
                                style: normalizeStyle(oe.marker.color ? { backgroundColor: oe.marker.color } : {})
                              }, null, 6))
                            ], 64)) : createCommentVNode("", true),
                            H.value(oe.value) ? (openBlock(), createElementBlock("div", {
                              key: 3,
                              ref_for: true,
                              ref_key: "activeTooltip",
                              ref: S,
                              class: "dp__marker_tooltip",
                              style: normalizeStyle(k.value)
                            }, [
                              (De = oe.marker) != null && De.tooltip ? (openBlock(), createElementBlock("div", {
                                key: 0,
                                class: "dp__tooltip_content",
                                onClick: ce
                              }, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(oe.marker.tooltip, (Z, Le) => (openBlock(), createElementBlock("div", {
                                  key: Le,
                                  class: "dp__tooltip_text"
                                }, [
                                  $.$slots["marker-tooltip"] ? renderSlot($.$slots, "marker-tooltip", {
                                    key: 0,
                                    tooltip: Z,
                                    day: oe.value
                                  }) : createCommentVNode("", true),
                                  $.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                    createBaseVNode("div", {
                                      class: "dp__tooltip_mark",
                                      style: normalizeStyle(Z.color ? { backgroundColor: Z.color } : {})
                                    }, null, 4),
                                    createBaseVNode("div", null, toDisplayString(Z.text), 1)
                                  ], 64))
                                ]))), 128)),
                                createBaseVNode("div", {
                                  class: "dp__arrow_bottom_tp",
                                  style: normalizeStyle(B.value)
                                }, null, 4)
                              ])) : createCommentVNode("", true)
                            ], 4)) : createCommentVNode("", true)
                          ], 2)
                        ], 40, co);
                      }), 128))
                    ]))), 128))
                  ], 8, so)) : createCommentVNode("", true)
                ];
              }),
              _: 3
            }, 8, ["name", "css"])
          ], 64))
        ], 10, ao)
      ], 2);
    };
  }
});
var ya = (e) => Array.isArray(e);
var vo = (e, t, r, a) => {
  const n = ref([]), { modelValue: o, calendars: i, time: c } = Ut(e, t), { defaultedMultiCalendars: p, defaultedStartTime: T } = Ae(e), { validateMonthYearInRange: D, isDisabled: I, isDateRangeAllowed: k, checkMinMaxRange: F } = Dt(e), { updateTimeValues: _, getSetDateTime: A, setTime: x, assignStartTime: y, validateTime: S, disabledTimesConfig: B } = za(e, c, o, a), b = computed(
    () => (m) => i.value[m] ? i.value[m].month : 0
  ), R = computed(
    () => (m) => i.value[m] ? i.value[m].year : 0
  ), G = (m, W, se) => {
    var N, re;
    i.value[m] || (i.value[m] = { month: 0, year: 0 }), i.value[m].month = ca(W) ? (N = i.value[m]) == null ? void 0 : N.month : W, i.value[m].year = ca(se) ? (re = i.value[m]) == null ? void 0 : re.year : se;
  }, ee = () => {
    e.autoApply && t("select-date");
  };
  watch(o, (m, W) => {
    JSON.stringify(m) !== JSON.stringify(W) && H();
  }), onMounted(() => {
    e.shadow || (o.value || (l(), T.value && y(T.value)), H(true), e.focusStartDate && e.startDate && l());
  });
  const q = computed(() => {
    var m;
    return (m = e.flow) != null && m.length && !e.partialFlow ? e.flowStep === e.flow.length : true;
  }), fe = () => {
    e.autoApply && q.value && t("auto-apply", e.partialFlow);
  }, H = (m = false) => {
    if (o.value)
      return Array.isArray(o.value) ? (n.value = o.value, d(m)) : M(o.value, m);
    if (p.value.count && m && !e.startDate)
      return f(E(), m);
  }, f = (m, W = false) => {
    if ((!p.value.count || !p.value.static || W) && G(0, getMonth(m), getYear(m)), p.value.count && !p.value.solo)
      for (let se = 1; se < p.value.count; se++) {
        const N = set(E(), { month: b.value(se - 1), year: R.value(se - 1) }), re = add(N, { months: 1 });
        i.value[se] = { month: getMonth(re), year: getYear(re) };
      }
  }, M = (m, W) => {
    f(m), x("hours", getHours(m)), x("minutes", getMinutes(m)), x("seconds", getSeconds(m)), p.value.count && W && h2();
  }, V = (m) => {
    if (p.value.count) {
      if (p.value.solo)
        return 0;
      const W = getMonth(m[0]), se = getMonth(m[1]);
      return Math.abs(se - W) < p.value.count ? 0 : 1;
    }
    return 1;
  }, ae = (m, W) => {
    m[1] && e.showLastInRange ? f(m[V(m)], W) : f(m[0], W);
    const se = (N, re) => [
      N(m[0]),
      m[1] ? N(m[1]) : c[re][1]
    ];
    x("hours", se(getHours, "hours")), x("minutes", se(getMinutes, "minutes")), x("seconds", se(getSeconds, "seconds"));
  }, C = (m, W) => {
    if ((e.range || e.weekPicker) && !e.multiDates)
      return ae(m, W);
    if (e.multiDates && W) {
      const se = m[m.length - 1];
      return M(se, W);
    }
  }, d = (m) => {
    const W = o.value;
    C(W, m), p.value.count && p.value.solo && h2();
  }, P = (m, W) => {
    const se = set(E(), { month: b.value(W), year: R.value(W) }), N = m < 0 ? addMonths(se, 1) : subMonths(se, 1);
    D(getMonth(N), getYear(N), m < 0, e.preventMinMaxNavigation) && (G(W, getMonth(N), getYear(N)), t("update-month-year", { instance: W, month: getMonth(N), year: getYear(N) }), p.value.count && !p.value.solo && X(W), r());
  }, X = (m) => {
    for (let W = m - 1; W >= 0; W--) {
      const se = subMonths(set(E(), { month: b.value(W + 1), year: R.value(W + 1) }), 1);
      G(W, getMonth(se), getYear(se));
    }
    for (let W = m + 1; W <= p.value.count - 1; W++) {
      const se = addMonths(set(E(), { month: b.value(W - 1), year: R.value(W - 1) }), 1);
      G(W, getMonth(se), getYear(se));
    }
  }, h2 = () => {
    if (Array.isArray(o.value) && o.value.length === 2) {
      const m = E(
        E(o.value[1] ? o.value[1] : addMonths(o.value[0], 1))
      ), [W, se] = [getMonth(o.value[0]), getYear(o.value[0])], [N, re] = [getMonth(o.value[1]), getYear(o.value[1])];
      (W !== N || W === N && se !== re) && p.value.solo && G(1, getMonth(m), getYear(m));
    } else
      o.value && !Array.isArray(o.value) && (G(0, getMonth(o.value), getYear(o.value)), f(E()));
  }, l = () => {
    e.startDate && (G(0, getMonth(E(e.startDate)), getYear(E(e.startDate))), p.value.count && X(0));
  }, g = (m, W) => {
    e.monthChangeOnScroll && P(e.monthChangeOnScroll !== "inverse" ? -m.deltaY : m.deltaY, W);
  }, s = (m, W, se = false) => {
    e.monthChangeOnArrows && e.vertical === se && J(m, W);
  }, J = (m, W) => {
    P(m === "right" ? -1 : 1, W);
  }, ce = (m) => e.markers.find(
    (W) => be(qr(m.value), Xe(E(W.date), e.timezone))
  ), $ = (m, W) => {
    switch (e.sixWeeks === true ? "append" : e.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [m == 0, true];
      case "fair":
        return [m == 0 || W > m, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, u = (m, W, se, N) => {
    if (e.sixWeeks && m.length < 6) {
      const re = 6 - m.length, ie = (W.getDay() + 7 - N) % 7, xe = 6 - (se.getDay() + 7 - N) % 7, [mt, dn] = $(ie, xe);
      for (let gt = 1; gt <= re; gt++)
        if (dn ? !!(gt % 2) == mt : mt) {
          const zt = m[0].days[0], cn = Y(addDays(zt.value, -7), getMonth(W));
          m.unshift({ days: cn });
        } else {
          const zt = m[m.length - 1], cn = zt.days[zt.days.length - 1], Ka = Y(addDays(cn.value, 1), getMonth(W));
          m.push({ days: Ka });
        }
    }
    return m;
  }, Y = (m, W) => {
    const se = E(m), N = [];
    for (let re = 0; re < 7; re++) {
      const ie = addDays(se, re), at = getMonth(ie) !== W;
      N.push({
        text: e.hideOffsetDates && at ? "" : ie.getDate(),
        value: ie,
        current: !at,
        classData: {}
      });
    }
    return N;
  }, Q = (m, W) => {
    const se = [], N = new Date(W, m), re = new Date(W, m + 1, 0), ie = e.weekStart, at = startOfWeek(N, { weekStartsOn: ie }), xe = (mt) => {
      const dn = Y(mt, m);
      if (se.push({ days: dn }), !se[se.length - 1].days.some(
        (gt) => be(Ve(gt.value), Ve(re))
      )) {
        const gt = addDays(mt, 7);
        xe(gt);
      }
    };
    return xe(at), u(se, N, re, ie);
  }, K = (m) => (o.value = Qt(E(m.value), e.timezone, e.weekStart), t("date-update", m.value), fe()), te = (m) => {
    const W = dt(E(m.value), c.hours, c.minutes, ze());
    t("date-update", W), e.multiDates ? Gn(W, o, e.multiDatesLimit) : o.value = W, a(), nextTick().then(() => {
      fe();
    });
  }, oe = (m) => e.noDisabledRange ? Na(n.value[0], m).some((se) => I(se)) : false, pe = () => {
    n.value = o.value ? o.value.slice() : [], n.value.length === 2 && !(e.fixedStart || e.fixedEnd) && (n.value = []);
  }, O = (m, W) => {
    const se = [E(m.value), addDays(E(m.value), +e.autoRange)];
    k(se) ? (W && L(m.value), n.value = se) : t("invalid-date", m.value);
  }, L = (m) => {
    const W = getMonth(E(m)), se = getYear(E(m));
    if (G(0, W, se), p.value.count > 0)
      for (let N = 1; N < p.value.count; N++) {
        const re = Zr(
          set(E(m), { year: b.value(N - 1), month: R.value(N - 1) })
        );
        G(N, re.month, re.year);
      }
  }, De = (m) => Array.isArray(o.value) && o.value.length === 2 ? e.fixedStart && (Ie(m, o.value[0]) || be(m, o.value[0])) ? [o.value[0], m] : e.fixedEnd && (Re(m, o.value[1]) || be(m, o.value[1])) ? [m, o.value[1]] : (t("invalid-fixed-range", m), o.value) : [], Z = (m) => {
    if (oe(m.value) || !F(m.value, o.value, e.fixedStart ? 0 : 1))
      return t("invalid-date", m.value);
    n.value = De(E(m.value));
  }, Le = (m, W) => {
    if (pe(), e.autoRange)
      return O(m, W);
    if (e.fixedStart || e.fixedEnd)
      return Z(m);
    n.value[0] ? F(E(m.value), o.value) && !oe(m.value) ? Re(E(m.value), E(n.value[0])) ? (n.value.unshift(E(m.value)), t("range-end", n.value[0])) : (n.value[1] = E(m.value), t("range-end", n.value[1])) : (e.autoApply && t("auto-apply-invalid", m.value), t("invalid-date", m.value)) : (n.value[0] = E(m.value), t("range-start", n.value[0]));
  }, ze = (m = true) => e.enableSeconds ? Array.isArray(c.seconds) ? m ? c.seconds[0] : c.seconds[1] : c.seconds : 0, _t = (m) => {
    n.value[m] = dt(
      n.value[m],
      c.hours[m],
      c.minutes[m],
      ze(m !== 1)
    );
  }, Rt = () => {
    var m, W;
    n.value[0] && n.value[1] && +((m = n.value) == null ? void 0 : m[0]) > +((W = n.value) == null ? void 0 : W[1]) && (n.value.reverse(), t("range-start", n.value[0]), t("range-end", n.value[1]));
  }, je = () => {
    n.value.length && (n.value[0] && !n.value[1] ? _t(0) : (_t(0), _t(1), a()), Rt(), o.value = n.value.slice(), an(n.value, t, e.autoApply, e.modelAuto));
  }, rn = (m, W = false) => {
    if (I(m.value) || !m.current && e.hideOffsetDates)
      return t("invalid-date", m.value);
    if (e.weekPicker)
      return K(m);
    if (!e.range)
      return te(m);
    ya(c.hours) && ya(c.minutes) && !e.multiDates && (Le(m, W), je());
  }, ln = (m, W) => {
    var N;
    G(m, W.month, W.year), p.value.count && !p.value.solo && X(m), t("update-month-year", { instance: m, month: W.month, year: W.year }), r(p.value.solo ? m : void 0);
    const se = (N = e.flow) != null && N.length ? e.flow[e.flowStep] : void 0;
    !W.fromNav && (se === et.month || se === et.year) && a();
  }, Wt = (m, W) => {
    Ua({ value: m, modelValue: o, range: e.range, timezone: W ? void 0 : e.timezone }), ee(), e.multiCalendars && nextTick().then(() => H(true));
  }, on = () => {
    e.range ? o.value && Array.isArray(o.value) && o.value[0] ? o.value = Re(E(), o.value[0]) ? [E(), o.value[0]] : [o.value[0], E()] : o.value = [E()] : o.value = E(), ee();
  }, sn = () => {
    if (Array.isArray(o.value))
      if (e.multiDates) {
        const m = un();
        o.value[o.value.length - 1] = A(m);
      } else
        o.value = o.value.map((m, W) => m && A(m, W));
    else
      o.value = A(o.value);
    t("time-update");
  }, un = () => Array.isArray(o.value) && o.value.length ? o.value[o.value.length - 1] : null;
  return {
    calendars: i,
    modelValue: o,
    month: b,
    year: R,
    time: c,
    disabledTimesConfig: B,
    validateTime: S,
    getCalendarDays: Q,
    getMarker: ce,
    handleScroll: g,
    handleSwipe: J,
    handleArrow: s,
    selectDate: rn,
    updateMonthYear: ln,
    presetDate: Wt,
    selectCurrentDate: on,
    updateTime: (m, W = true, se = false) => {
      _(m, W, se, sn);
    }
  };
};
var mo = { key: 0 };
var go = defineComponent({
  __name: "DatePicker",
  props: {
    ...Je
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
    "invalid-date"
  ],
  setup(e, { expose: t, emit: r }) {
    const a = r, n = e, {
      calendars: o,
      month: i,
      year: c,
      modelValue: p,
      time: T,
      disabledTimesConfig: D,
      validateTime: I,
      getCalendarDays: k,
      getMarker: F,
      handleArrow: _,
      handleScroll: A,
      handleSwipe: x,
      selectDate: y,
      updateMonthYear: S,
      presetDate: B,
      selectCurrentDate: b,
      updateTime: R
    } = vo(n, a, h2, l), G = useSlots(), { setHoverDate: ee, getDayClassData: q, clearHoverDate: fe } = yl(p, n), { defaultedMultiCalendars: H } = Ae(n), f = ref([]), M = ref([]), V = ref(null), ae = We(G, "calendar"), C = We(G, "monthYear"), d = We(G, "timePicker"), P = (u) => {
      n.shadow || a("mount", u);
    };
    watch(
      o,
      () => {
        n.shadow || setTimeout(() => {
          a("recalculate-position");
        }, 0);
      },
      { deep: true }
    );
    const X = computed(() => (u) => k(i.value(u), c.value(u)).map((Y) => ({
      ...Y,
      days: Y.days.map((Q) => (Q.marker = F(Q), Q.classData = q(Q), Q))
    })));
    function h2(u) {
      var Y;
      u || u === 0 ? (Y = M.value[u]) == null || Y.triggerTransition(i.value(u), c.value(u)) : M.value.forEach((Q, K) => Q.triggerTransition(i.value(K), c.value(K)));
    }
    function l() {
      a("update-flow-step");
    }
    const g = (u, Y = false) => {
      y(u, Y), n.spaceConfirm && a("select-date");
    };
    return t({
      clearHoverDate: fe,
      presetDate: B,
      selectCurrentDate: b,
      toggleMonthPicker: (u, Y, Q = 0) => {
        var K;
        (K = f.value[Q]) == null || K.toggleMonthPicker(u, Y);
      },
      toggleYearPicker: (u, Y, Q = 0) => {
        var K;
        (K = f.value[Q]) == null || K.toggleYearPicker(u, Y);
      },
      toggleTimePicker: (u, Y, Q) => {
        var K;
        (K = V.value) == null || K.toggleTimePicker(u, Y, Q);
      },
      handleArrow: _,
      updateMonthYear: S,
      getSidebarProps: () => ({
        modelValue: p,
        month: i,
        year: c,
        time: T,
        updateTime: R,
        updateMonthYear: S,
        selectDate: y,
        presetDate: B
      })
    }), (u, Y) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(nn, {
        "multi-calendars": unref(H).count
      }, {
        default: withCtx(({ instance: Q, index: K }) => [
          u.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(no, mergeProps({
            key: 0,
            ref: (te) => {
              te && (f.value[K] = te);
            },
            months: unref(Ca)(u.formatLocale, u.locale, u.monthNameFormat),
            years: unref(jn)(u.yearRange, u.reverseYears),
            month: unref(i)(Q),
            year: unref(c)(Q),
            instance: Q
          }, u.$props, {
            onMount: Y[0] || (Y[0] = (te) => P(unref(kt).header)),
            onResetFlow: Y[1] || (Y[1] = (te) => u.$emit("reset-flow")),
            onUpdateMonthYear: (te) => unref(S)(Q, te),
            onOverlayClosed: Y[2] || (Y[2] = (te) => u.$emit("focus-menu"))
          }), createSlots({ _: 2 }, [
            renderList(unref(C), (te, oe) => ({
              name: te,
              fn: withCtx((pe) => [
                renderSlot(u.$slots, te, normalizeProps(guardReactiveProps(pe)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(fo, mergeProps({
            ref: (te) => {
              te && (M.value[K] = te);
            },
            "mapped-dates": X.value(Q),
            month: unref(i)(Q),
            year: unref(c)(Q),
            instance: Q
          }, u.$props, {
            onSelectDate: (te) => unref(y)(te, Q !== 1),
            onHandleSpace: (te) => g(te, Q !== 1),
            onSetHoverDate: Y[3] || (Y[3] = (te) => unref(ee)(te)),
            onHandleScroll: (te) => unref(A)(te, Q),
            onHandleSwipe: (te) => unref(x)(te, Q),
            onMount: Y[4] || (Y[4] = (te) => P(unref(kt).calendar)),
            onResetFlow: Y[5] || (Y[5] = (te) => u.$emit("reset-flow")),
            onTooltipOpen: Y[6] || (Y[6] = (te) => u.$emit("tooltip-open", te)),
            onTooltipClose: Y[7] || (Y[7] = (te) => u.$emit("tooltip-close", te))
          }), createSlots({ _: 2 }, [
            renderList(unref(ae), (te, oe) => ({
              name: te,
              fn: withCtx((pe) => [
                renderSlot(u.$slots, te, normalizeProps(guardReactiveProps({ ...pe })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "instance", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars"]),
      u.enableTimePicker ? (openBlock(), createElementBlock("div", mo, [
        u.$slots["time-picker"] ? renderSlot(u.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(T), updateTime: unref(R) }))) : (openBlock(), createBlock(Wa, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: V
        }, u.$props, {
          hours: unref(T).hours,
          minutes: unref(T).minutes,
          seconds: unref(T).seconds,
          "internal-model-value": u.internalModelValue,
          "disabled-times-config": unref(D),
          "validate-time": unref(I),
          onMount: Y[8] || (Y[8] = (Q) => P(unref(kt).timePicker)),
          "onUpdate:hours": Y[9] || (Y[9] = (Q) => unref(R)(Q)),
          "onUpdate:minutes": Y[10] || (Y[10] = (Q) => unref(R)(Q, false)),
          "onUpdate:seconds": Y[11] || (Y[11] = (Q) => unref(R)(Q, false, true)),
          onResetFlow: Y[12] || (Y[12] = (Q) => u.$emit("reset-flow")),
          onOverlayClosed: Y[13] || (Y[13] = (Q) => u.$emit("time-picker-close")),
          onOverlayOpened: Y[14] || (Y[14] = (Q) => u.$emit("time-picker-open", Q)),
          onAmPmChange: Y[15] || (Y[15] = (Q) => u.$emit("am-pm-change", Q))
        }), createSlots({ _: 2 }, [
          renderList(unref(d), (Q, K) => ({
            name: Q,
            fn: withCtx((te) => [
              renderSlot(u.$slots, Q, normalizeProps(guardReactiveProps(te)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"]))
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var yo = (e, t) => {
  const r = ref(), { defaultedMultiCalendars: a, defaultedConfig: n, defaultedHighlight: o } = Ae(e), { modelValue: i, year: c, month: p, calendars: T } = Ut(e, t), { isDisabled: D } = Dt(e), { selectYear: I, groupedYears: k, showYearPicker: F, isDisabled: _, toggleYearPicker: A, handleYearSelect: x, handleYear: y } = La({
    modelValue: i,
    multiCalendars: a,
    highlight: o,
    calendars: T,
    month: p,
    year: c,
    props: e,
    emit: t
  }), S = (f, M) => [f, M].map((V) => format(V, "MMMM", { locale: e.formatLocale })).join("-"), B = computed(() => (f) => i.value ? Array.isArray(i.value) ? i.value.some((M) => isSameQuarter(f, M)) : isSameQuarter(i.value, f) : false), b = (f) => {
    if (e.range) {
      if (Array.isArray(i.value)) {
        const M = be(f, i.value[0]) || be(f, i.value[1]);
        return xt(i.value, r.value, f) && !M;
      }
      return false;
    }
    return false;
  }, R = computed(() => (f) => {
    const M = set(/* @__PURE__ */ new Date(), { year: c.value(f) });
    return eachQuarterOfInterval({
      start: startOfYear(M),
      end: endOfYear(M)
    }).map((V) => {
      const ae = startOfQuarter(V), C = endOfQuarter(V), d = D(V), P = b(ae), X = typeof o.value == "function" ? o.value({ quarter: getQuarter(ae), year: getYear(ae) }) : !!o.value.quarters.find(
        (h2) => h2.quarter === getQuarter(ae) && h2.year === getYear(ae)
      );
      return {
        text: S(ae, C),
        value: ae,
        active: B.value(ae),
        highlighted: X,
        disabled: d,
        isBetween: P
      };
    });
  }), G = (f) => {
    Gn(f, i, e.multiDatesLimit), t("auto-apply", true);
  }, ee = (f) => {
    const M = qn(i, f, t);
    an(M, t, e.autoApply, e.modelAuto);
  }, q = (f) => {
    i.value = f, t("auto-apply");
  };
  return {
    defaultedConfig: n,
    defaultedMultiCalendars: a,
    groupedYears: k,
    year: c,
    isDisabled: _,
    quarters: R,
    showYearPicker: F,
    modelValue: i,
    setHoverDate: (f) => {
      r.value = f;
    },
    selectYear: I,
    selectQuarter: (f, M, V) => {
      if (!V)
        return T.value[M].month = getMonth(endOfQuarter(f)), e.multiDates ? G(f) : e.range ? ee(f) : q(f);
    },
    toggleYearPicker: A,
    handleYearSelect: x,
    handleYear: y
  };
};
var ho = { class: "dp--quarter-items" };
var po = ["disabled", "onClick", "onMouseover"];
var bo = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "QuarterPicker",
  props: {
    ...Je
  },
  emits: [
    "update:internal-model-value",
    "reset-flow",
    "overlay-closed",
    "auto-apply",
    "range-start",
    "range-end"
  ],
  setup(e, { expose: t, emit: r }) {
    const a = r, n = e, o = useSlots(), i = We(o, "yearMode"), {
      defaultedMultiCalendars: c,
      defaultedConfig: p,
      groupedYears: T,
      year: D,
      isDisabled: I,
      quarters: k,
      modelValue: F,
      showYearPicker: _,
      setHoverDate: A,
      selectQuarter: x,
      toggleYearPicker: y,
      handleYearSelect: S,
      handleYear: B
    } = yo(n, a);
    return t({ getSidebarProps: () => ({
      modelValue: F,
      year: D,
      selectQuarter: x,
      handleYearSelect: S,
      handleYear: B
    }) }), (R, G) => (openBlock(), createBlock(nn, {
      "multi-calendars": unref(c).count,
      stretch: ""
    }, {
      default: withCtx(({ instance: ee }) => [
        createBaseVNode("div", {
          class: "dp-quarter-picker-wrap",
          style: normalizeStyle({ minHeight: `${unref(p).modeHeight}px` })
        }, [
          createBaseVNode("div", null, [
            createVNode(Va, mergeProps(R.$props, {
              items: unref(T)(ee),
              instance: ee,
              "show-year-picker": unref(_)[ee],
              year: unref(D)(ee),
              "is-disabled": (q) => unref(I)(ee, q),
              onHandleYear: (q) => unref(B)(ee, q),
              onYearSelect: (q) => unref(S)(q, ee),
              onToggleYearPicker: (q) => unref(y)(ee, q == null ? void 0 : q.flow, q == null ? void 0 : q.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(i), (q, fe) => ({
                name: q,
                fn: withCtx((H) => [
                  renderSlot(R.$slots, q, normalizeProps(guardReactiveProps(H)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          createBaseVNode("div", ho, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(k)(ee), (q, fe) => (openBlock(), createElementBlock("div", { key: fe }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass(["dp--qr-btn", {
                  "dp--qr-btn-active": q.active,
                  "dp--qr-btn-between": q.isBetween,
                  "dp--qr-btn-disabled": q.disabled,
                  "dp--highlighted": q.highlighted
                }]),
                disabled: q.disabled,
                onClick: (H) => unref(x)(q.value, ee, q.disabled),
                onMouseover: (H) => unref(A)(q.value)
              }, [
                R.$slots.quarter ? renderSlot(R.$slots, "quarter", {
                  key: 0,
                  value: q.value,
                  text: q.text
                }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(q.text), 1)
                ], 64))
              ], 42, po)
            ]))), 128))
          ])
        ], 4)
      ]),
      _: 3
    }, 8, ["multi-calendars"]));
  }
});
var ko = ["id", "onKeydown"];
var wo = {
  key: 0,
  class: "dp__sidebar_left"
};
var Do = {
  key: 1,
  class: "dp--preset-dates"
};
var Mo = ["onClick", "onKeydown"];
var $o = {
  key: 2,
  class: "dp__sidebar_right"
};
var To = {
  key: 3,
  class: "dp__action_extra"
};
var ha = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerMenu",
  props: {
    ...tn,
    shadow: { type: Boolean, default: false },
    openOnTop: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    arrMapValues: { type: Object, default: () => ({}) },
    noOverlayFocus: { type: Boolean, default: false }
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
    "invalid-date"
  ],
  setup(e, { expose: t, emit: r }) {
    const a = r, n = e, o = computed(() => {
      const { openOnTop: O, ...L } = n;
      return {
        ...L,
        flowStep: q.value,
        noOverlayFocus: n.noOverlayFocus
      };
    }), { setMenuFocused: i, setShiftKey: c, control: p } = Ha(), T = useSlots(), { defaultedTextInput: D, defaultedInline: I, defaultedConfig: k } = Ae(n), F = ref(null), _ = ref(0), A = ref(null), x = ref(null), y = ref(false), S = ref(null);
    onMounted(() => {
      if (!n.shadow) {
        y.value = true, B(), window.addEventListener("resize", B);
        const O = Pe(A);
        if (O && !D.value.enabled && !I.value.enabled && (i(true), V()), O) {
          const L = (De) => {
            k.value.allowPreventDefault && De.preventDefault(), ut(De, k.value, true);
          };
          O.addEventListener("pointerdown", L), O.addEventListener("mousedown", L);
        }
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", B);
    });
    const B = () => {
      const O = Pe(x);
      O && (_.value = O.getBoundingClientRect().width);
    }, { arrowRight: b, arrowLeft: R, arrowDown: G, arrowUp: ee } = vt(), { flowStep: q, updateFlowStep: fe, childMount: H, resetFlow: f } = hl(n, a, S), M = computed(() => n.monthPicker ? Nl : n.yearPicker ? Bl : n.timePicker ? xl : n.quarterPicker ? bo : go), V = () => {
      const O = Pe(A);
      O && O.focus({ preventScroll: true });
    }, ae = computed(() => {
      var O;
      return ((O = S.value) == null ? void 0 : O.getSidebarProps()) || {};
    }), C = () => {
      n.openOnTop && a("recalculate-position");
    }, d = We(T, "action"), P = computed(() => n.monthPicker || n.yearPicker ? We(T, "monthYear") : n.timePicker ? We(T, "timePicker") : We(T, "shared")), X = computed(() => n.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), h2 = computed(() => ({
      dp__menu_disabled: n.disabled,
      dp__menu_readonly: n.readonly
    })), l = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !I.value.enabled,
        dp__relative: I.value.enabled,
        [n.menuClassName]: !!n.menuClassName
      })
    ), g = (O) => {
      ut(O, k.value, true);
    }, s = () => {
      n.escClose && a("close-picker");
    }, J = (O) => {
      if (n.arrowNavigation) {
        if (O === "up")
          return ee();
        if (O === "down")
          return G();
        if (O === "left")
          return R();
        if (O === "right")
          return b();
      } else
        O === "left" || O === "up" ? Q("handleArrow", "left", 0, O === "up") : Q("handleArrow", "right", 0, O === "down");
    }, ce = (O) => {
      c(O.shiftKey), !n.disableMonthYearSelect && O.code === "Tab" && O.target.classList.contains("dp__menu") && p.value.shiftKeyInMenu && (O.preventDefault(), ut(O, k.value, true), a("close-picker"));
    }, $ = () => {
      V(), a("time-picker-close");
    }, u = (O) => {
      var L, De, Z;
      (L = S.value) == null || L.toggleTimePicker(false, false), (De = S.value) == null || De.toggleMonthPicker(false, false, O), (Z = S.value) == null || Z.toggleYearPicker(false, false, O);
    }, Y = (O, L = 0) => {
      var De, Z, Le;
      return O === "month" ? (De = S.value) == null ? void 0 : De.toggleMonthPicker(false, true, L) : O === "year" ? (Z = S.value) == null ? void 0 : Z.toggleYearPicker(false, true, L) : O === "time" ? (Le = S.value) == null ? void 0 : Le.toggleTimePicker(true, false) : u(L);
    }, Q = (O, ...L) => {
      var De, Z;
      (De = S.value) != null && De[O] && ((Z = S.value) == null || Z[O](...L));
    }, K = () => {
      Q("selectCurrentDate");
    }, te = (O, L) => {
      Q("presetDate", O, L);
    }, oe = () => {
      Q("clearHoverDate");
    };
    return t({
      updateMonthYear: (O, L) => {
        Q("updateMonthYear", O, L);
      },
      switchView: Y
    }), (O, L) => {
      var De;
      return openBlock(), createElementBlock("div", {
        id: O.uid ? `dp-menu-${O.uid}` : void 0,
        ref_key: "dpMenuRef",
        ref: A,
        tabindex: "0",
        role: "dialog",
        class: normalizeClass(l.value),
        onMouseleave: oe,
        onClick: g,
        onKeydown: [
          withKeys(s, ["esc"]),
          L[18] || (L[18] = withKeys(withModifiers((Z) => J("left"), ["prevent"]), ["left"])),
          L[19] || (L[19] = withKeys(withModifiers((Z) => J("up"), ["prevent"]), ["up"])),
          L[20] || (L[20] = withKeys(withModifiers((Z) => J("down"), ["prevent"]), ["down"])),
          L[21] || (L[21] = withKeys(withModifiers((Z) => J("right"), ["prevent"]), ["right"])),
          ce
        ]
      }, [
        (O.disabled || O.readonly) && unref(I).enabled ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(h2.value)
        }, null, 2)) : createCommentVNode("", true),
        !unref(I).enabled && !O.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(X.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: x,
          class: normalizeClass({
            dp__menu_content_wrapper: ((De = O.presetDates) == null ? void 0 : De.length) || !!O.$slots["left-sidebar"] || !!O.$slots["right-sidebar"]
          }),
          style: normalizeStyle({ "--dp-menu-width": `${_.value}px` })
        }, [
          O.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", wo, [
            renderSlot(O.$slots, "left-sidebar", normalizeProps(guardReactiveProps(ae.value)))
          ])) : createCommentVNode("", true),
          O.presetDates.length ? (openBlock(), createElementBlock("div", Do, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(O.presetDates, (Z, Le) => (openBlock(), createElementBlock(Fragment, { key: Le }, [
              Z.slot ? renderSlot(O.$slots, Z.slot, {
                key: 0,
                presetDate: te,
                label: Z.label,
                value: Z.value
              }) : (openBlock(), createElementBlock("button", {
                key: 1,
                type: "button",
                style: normalizeStyle(Z.style || {}),
                class: "dp__btn dp--preset-range",
                onClick: withModifiers((ze) => te(Z.value, Z.noTz), ["prevent"]),
                onKeydown: [
                  withKeys(withModifiers((ze) => te(Z.value, Z.noTz), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((ze) => te(Z.value, Z.noTz), ["prevent"]), ["space"])
                ]
              }, toDisplayString(Z.label), 45, Mo))
            ], 64))), 128))
          ])) : createCommentVNode("", true),
          createBaseVNode("div", {
            ref_key: "calendarWrapperRef",
            ref: F,
            class: "dp__instance_calendar",
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(M.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: S
            }, o.value, {
              "flow-step": unref(q),
              onMount: unref(H),
              onUpdateFlowStep: unref(fe),
              onResetFlow: unref(f),
              onFocusMenu: V,
              onSelectDate: L[0] || (L[0] = (Z) => O.$emit("select-date")),
              onDateUpdate: L[1] || (L[1] = (Z) => O.$emit("date-update", Z)),
              onTooltipOpen: L[2] || (L[2] = (Z) => O.$emit("tooltip-open", Z)),
              onTooltipClose: L[3] || (L[3] = (Z) => O.$emit("tooltip-close", Z)),
              onAutoApply: L[4] || (L[4] = (Z) => O.$emit("auto-apply", Z)),
              onRangeStart: L[5] || (L[5] = (Z) => O.$emit("range-start", Z)),
              onRangeEnd: L[6] || (L[6] = (Z) => O.$emit("range-end", Z)),
              onInvalidFixedRange: L[7] || (L[7] = (Z) => O.$emit("invalid-fixed-range", Z)),
              onTimeUpdate: L[8] || (L[8] = (Z) => O.$emit("time-update")),
              onAmPmChange: L[9] || (L[9] = (Z) => O.$emit("am-pm-change", Z)),
              onTimePickerOpen: L[10] || (L[10] = (Z) => O.$emit("time-picker-open", Z)),
              onTimePickerClose: $,
              onRecalculatePosition: C,
              onUpdateMonthYear: L[11] || (L[11] = (Z) => O.$emit("update-month-year", Z)),
              onAutoApplyInvalid: L[12] || (L[12] = (Z) => O.$emit("auto-apply-invalid", Z)),
              onInvalidDate: L[13] || (L[13] = (Z) => O.$emit("invalid-date", Z)),
              "onUpdate:internalModelValue": L[14] || (L[14] = (Z) => O.$emit("update:internal-model-value", Z))
            }), createSlots({ _: 2 }, [
              renderList(P.value, (Z, Le) => ({
                name: Z,
                fn: withCtx((ze) => [
                  renderSlot(O.$slots, Z, normalizeProps(guardReactiveProps({ ...ze })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          O.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", $o, [
            renderSlot(O.$slots, "right-sidebar", normalizeProps(guardReactiveProps(ae.value)))
          ])) : createCommentVNode("", true),
          O.$slots["action-extra"] ? (openBlock(), createElementBlock("div", To, [
            O.$slots["action-extra"] ? renderSlot(O.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: K
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 6),
        !O.autoApply || unref(k).keepActionRow ? (openBlock(), createBlock(Tl, mergeProps({
          key: 2,
          "menu-mount": y.value
        }, o.value, {
          "calendar-width": _.value,
          onClosePicker: L[15] || (L[15] = (Z) => O.$emit("close-picker")),
          onSelectDate: L[16] || (L[16] = (Z) => O.$emit("select-date")),
          onInvalidSelect: L[17] || (L[17] = (Z) => O.$emit("invalid-select")),
          onSelectNow: K
        }), createSlots({ _: 2 }, [
          renderList(unref(d), (Z, Le) => ({
            name: Z,
            fn: withCtx((ze) => [
              renderSlot(O.$slots, Z, normalizeProps(guardReactiveProps({ ...ze })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
      ], 42, ko);
    };
  }
});
var Ao = typeof window < "u" ? window : void 0;
var $n = () => {
};
var So = (e) => getCurrentScope() ? (onScopeDispose(e), true) : false;
var Po = (e, t, r, a) => {
  if (!e)
    return $n;
  let n = $n;
  const o = watch(
    () => unref(e),
    (c) => {
      n(), c && (c.addEventListener(t, r, a), n = () => {
        c.removeEventListener(t, r, a), n = $n;
      });
    },
    { immediate: true, flush: "post" }
  ), i = () => {
    o(), n();
  };
  return So(i), i;
};
var Co = (e, t, r, a = {}) => {
  const { window: n = Ao, event: o = "pointerdown" } = a;
  return n ? Po(n, o, (c) => {
    const p = Pe(e), T = Pe(t);
    !p || !T || p === c.target || c.composedPath().includes(p) || c.composedPath().includes(T) || r(c);
  }, { passive: true }) : void 0;
};
var _o = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "VueDatePicker",
  props: {
    ...tn
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
    "invalid-date"
  ],
  setup(e, { expose: t, emit: r }) {
    const a = r, n = e, o = useSlots(), i = ref(false), c = toRef(n, "modelValue"), p = toRef(n, "timezone"), T = ref(null), D = ref(null), I = ref(null), k = ref(false), F = ref(null), _ = ref(false), { setMenuFocused: A, setShiftKey: x } = Ha(), { clearArrowNav: y } = vt(), { mapDatesArrToMap: S, validateDate: B, isValidTime: b } = Dt(n), { defaultedTransitions: R, defaultedTextInput: G, defaultedInline: ee, defaultedConfig: q } = Ae(n), { menuTransition: fe, showTransition: H } = Vt(R);
    onMounted(() => {
      s(n.modelValue), nextTick().then(() => {
        ee.value.enabled || (X(F.value).addEventListener("scroll", te), window.addEventListener("resize", oe));
      }), ee.value.enabled && (i.value = true), q.value.tabOutClosesMenu && document.addEventListener("keyup", pe);
    });
    const f = computed(() => S());
    onUnmounted(() => {
      if (!ee.value.enabled) {
        const N = X(F.value);
        N && N.removeEventListener("scroll", te), window.removeEventListener("resize", oe);
      }
      q.value.tabOutClosesMenu && document.removeEventListener("keyup", pe);
    });
    const M = We(o, "all", n.presetDates), V = We(o, "input");
    watch(
      [c, p],
      () => {
        s(c.value);
      },
      { deep: true }
    );
    const { openOnTop: ae, menuStyle: C, xCorrect: d, setMenuPosition: P, getScrollableParent: X, shadowRender: h2 } = vl({
      menuRef: T,
      menuRefInner: D,
      inputRef: I,
      pickerWrapperRef: F,
      inline: ee,
      emit: a,
      props: n,
      slots: o
    }), {
      inputValue: l,
      internalModelValue: g,
      parseExternalModelValue: s,
      emitModelValue: J,
      formatInputValue: ce,
      checkBeforeEmit: $
    } = cl(a, n, k), u = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: n.dark,
        dp__theme_light: !n.dark,
        dp__flex_display: ee.value.enabled,
        dp__flex_display_with_input: ee.value.input
      })
    ), Y = computed(() => n.dark ? "dp__theme_dark" : "dp__theme_light"), Q = computed(() => n.teleport ? {
      to: typeof n.teleport == "boolean" ? "body" : n.teleport,
      disabled: ee.value.enabled
    } : { class: "dp__outer_menu_wrap" }), K = computed(() => ee.value.enabled && (n.timePicker || n.monthPicker || n.yearPicker || n.quarterPicker)), te = () => {
      i.value && (q.value.closeOnScroll ? je() : P());
    }, oe = () => {
      i.value && P();
    }, pe = (N) => {
      N.key === "Tab" && !ee.value.enabled && !n.teleport && (F.value.contains(document.activeElement) || je());
    }, O = () => {
      !n.disabled && !n.readonly && (h2(ha, n), P(false), i.value = true, i.value && a("open"), i.value || Rt(), s(n.modelValue));
    }, L = () => {
      var N;
      l.value = "", Rt(), (N = I.value) == null || N.setParsedDate(null), a("update:model-value", null), a("update:model-timezone-value", null), a("cleared"), q.value.closeOnClearValue && je();
    }, De = () => {
      const N = g.value;
      return !N || !Array.isArray(N) && B(N) ? true : Array.isArray(N) ? n.multiDates || N.length === 2 && B(N[0]) && B(N[1]) ? true : n.partialRange && !n.timePicker ? B(N[0]) : false : false;
    }, Z = () => {
      $() && De() ? (J(), je()) : a("invalid-select", g.value);
    }, Le = (N) => {
      ze(), J(), q.value.closeOnAutoApply && !N && je();
    }, ze = () => {
      I.value && G.value.enabled && I.value.setParsedDate(g.value);
    }, _t = (N = false) => {
      n.autoApply && b(g.value) && De() && (n.range && Array.isArray(g.value) ? (n.partialRange || g.value.length === 2) && Le(N) : Le(N));
    }, Rt = () => {
      G.value.enabled || (g.value = null);
    }, je = () => {
      ee.value.enabled || (i.value && (i.value = false, d.value = false, A(false), x(false), y(), a("closed"), l.value && s(c.value)), Rt(), a("blur"));
    }, rn = (N, re, ie = false) => {
      if (!N) {
        g.value = null;
        return;
      }
      const at = Array.isArray(N) ? !N.some((mt) => !B(mt)) : B(N), xe = b(N);
      at && xe && (g.value = N, re && (_.value = ie, Z(), a("text-submit")));
    }, ln = () => {
      n.autoApply && b(g.value) && J(), ze();
    }, Wt = () => i.value ? je() : O(), on = (N) => {
      g.value = N;
    }, sn = () => {
      G.value.enabled && (k.value = true, ce()), a("focus");
    }, un = () => {
      if (G.value.enabled && (k.value = false, s(n.modelValue), _.value)) {
        const N = jr(F.value);
        N == null || N.focus();
      }
      a("blur");
    }, Zn = (N) => {
      D.value && D.value.updateMonthYear(0, {
        month: da(N.month),
        year: da(N.year)
      });
    }, m = (N) => {
      s(N ?? n.modelValue);
    }, W = (N, re) => {
      var ie;
      (ie = D.value) == null || ie.switchView(N, re);
    }, se = (N) => q.value.onClickOutside ? q.value.onClickOutside(N) : je();
    return Co(T, I, () => se(De)), t({
      closeMenu: je,
      selectDate: Z,
      clearValue: L,
      openMenu: O,
      onScroll: te,
      formatInputValue: ce,
      // exposed for testing purposes
      updateInternalModelValue: on,
      // modify internal modelValue
      setMonthYear: Zn,
      parseModel: m,
      switchView: W,
      toggleMenu: Wt
    }), (N, re) => (openBlock(), createElementBlock("div", {
      ref_key: "pickerWrapperRef",
      ref: F,
      class: normalizeClass(u.value)
    }, [
      createVNode(wl, mergeProps({
        ref_key: "inputRef",
        ref: I,
        "input-value": unref(l),
        "onUpdate:inputValue": re[0] || (re[0] = (ie) => isRef(l) ? l.value = ie : null),
        "is-menu-open": i.value
      }, N.$props, {
        onClear: L,
        onOpen: O,
        onSetInputDate: rn,
        onSetEmptyDate: unref(J),
        onSelectDate: Z,
        onToggle: Wt,
        onClose: je,
        onFocus: sn,
        onBlur: un,
        onRealBlur: re[1] || (re[1] = (ie) => k.value = false)
      }), createSlots({ _: 2 }, [
        renderList(unref(V), (ie, at) => ({
          name: ie,
          fn: withCtx((xe) => [
            renderSlot(N.$slots, ie, normalizeProps(guardReactiveProps(xe)))
          ])
        }))
      ]), 1040, ["input-value", "is-menu-open", "onSetEmptyDate"]),
      createVNode(Transition, {
        name: unref(fe)(unref(ae)),
        css: unref(H) && !unref(ee).enabled
      }, {
        default: withCtx(() => [
          i.value ? (openBlock(), createBlock(resolveDynamicComponent(N.teleport ? Teleport : "div"), mergeProps({
            key: 0,
            ref_key: "dpWrapMenuRef",
            ref: T
          }, Q.value, {
            class: { "dp--menu-wrapper": !unref(ee).enabled },
            style: unref(ee).enabled ? void 0 : unref(C)
          }), {
            default: withCtx(() => [
              createVNode(ha, mergeProps({
                ref_key: "dpMenuRef",
                ref: D
              }, N.$props, {
                "internal-model-value": unref(g),
                "onUpdate:internalModelValue": re[2] || (re[2] = (ie) => isRef(g) ? g.value = ie : null),
                class: { [Y.value]: true, "dp--menu-wrapper": N.teleport },
                style: N.teleport ? unref(C) : void 0,
                "open-on-top": unref(ae),
                "arr-map-values": f.value,
                "no-overlay-focus": K.value,
                onClosePicker: je,
                onSelectDate: Z,
                onAutoApply: _t,
                onTimeUpdate: ln,
                onFlowStep: re[3] || (re[3] = (ie) => N.$emit("flow-step", ie)),
                onUpdateMonthYear: re[4] || (re[4] = (ie) => N.$emit("update-month-year", ie)),
                onInvalidSelect: re[5] || (re[5] = (ie) => N.$emit("invalid-select", unref(g))),
                onAutoApplyInvalid: re[6] || (re[6] = (ie) => N.$emit("invalid-select", ie)),
                onInvalidFixedRange: re[7] || (re[7] = (ie) => N.$emit("invalid-fixed-range", ie)),
                onRecalculatePosition: unref(P),
                onTooltipOpen: re[8] || (re[8] = (ie) => N.$emit("tooltip-open", ie)),
                onTooltipClose: re[9] || (re[9] = (ie) => N.$emit("tooltip-close", ie)),
                onTimePickerOpen: re[10] || (re[10] = (ie) => N.$emit("time-picker-open", ie)),
                onTimePickerClose: re[11] || (re[11] = (ie) => N.$emit("time-picker-close", ie)),
                onAmPmChange: re[12] || (re[12] = (ie) => N.$emit("am-pm-change", ie)),
                onRangeStart: re[13] || (re[13] = (ie) => N.$emit("range-start", ie)),
                onRangeEnd: re[14] || (re[14] = (ie) => N.$emit("range-end", ie)),
                onDateUpdate: re[15] || (re[15] = (ie) => N.$emit("date-update", ie)),
                onInvalidDate: re[16] || (re[16] = (ie) => N.$emit("invalid-date", ie))
              }), createSlots({ _: 2 }, [
                renderList(unref(M), (ie, at) => ({
                  name: ie,
                  fn: withCtx((xe) => [
                    renderSlot(N.$slots, ie, normalizeProps(guardReactiveProps({ ...xe })))
                  ])
                }))
              ]), 1040, ["internal-model-value", "class", "style", "open-on-top", "arr-map-values", "no-overlay-focus", "onRecalculatePosition"])
            ]),
            _: 3
          }, 16, ["class", "style"])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["name", "css"])
    ], 2));
  }
});
var ja = (() => {
  const e = _o;
  return e.install = (t) => {
    t.component("Vue3DatePicker", e);
  }, e;
})();
var Ro = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: ja
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(Ro).forEach(([e, t]) => {
  e !== "default" && (ja[e] = t);
});
export {
  ja as default
};
//# sourceMappingURL=@vuepic_vue-datepicker.js.map
