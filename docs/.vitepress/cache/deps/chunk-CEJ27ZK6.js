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
} from "./chunk-JKV2V35Q.js";
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
} from "./chunk-55K75MVG.js";

// node_modules/.pnpm/@vuepic+vue-datepicker@4.5.1_vue@3.3.4/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
function Lt() {
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
function fa() {
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
      createBaseVNode("path", {
        d: "M20.943 23.057l-7.057-7.057c0 0 7.057-7.057 7.057-7.057 0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-8 8c-0.521 0.521-0.521 1.365 0 1.885l8 8c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
function bn() {
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
      createBaseVNode("path", {
        d: "M24.943 19.057l-8-8c-0.521-0.521-1.365-0.521-1.885 0l-8 8c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l7.057-7.057c0 0 7.057 7.057 7.057 7.057 0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
function zn() {
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
var Dn = (e, n, a, t, s) => {
  const f = parse(e, n.slice(0, e.length), /* @__PURE__ */ new Date());
  return isValid(f) && isDate(f) ? t || s ? f : set(f, {
    hours: +a.hours,
    minutes: +(a == null ? void 0 : a.minutes),
    seconds: +(a == null ? void 0 : a.seconds),
    milliseconds: 0
  }) : null;
};
var va = (e, n, a, t, s) => {
  const f = Array.isArray(a) ? a[0] : a;
  if (typeof n == "string")
    return Dn(e, n, f, t, s);
  if (Array.isArray(n)) {
    let y = null;
    for (const _ of n)
      if (y = Dn(e, _, f, t, s), y)
        break;
    return y;
  }
  return typeof n == "function" ? n(e) : null;
};
var $ = (e) => e ? new Date(e) : /* @__PURE__ */ new Date();
var ma = (e, n) => {
  if (n) {
    const t = (e.getMonth() + 1).toString().padStart(2, "0"), s = e.getDate().toString().padStart(2, "0"), f = e.getHours().toString().padStart(2, "0"), y = e.getMinutes().toString().padStart(2, "0");
    return `${e.getFullYear()}-${t}-${s}T${f}:${y}:00.000Z`;
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
var Ue = (e) => {
  let n = $(JSON.parse(JSON.stringify(e)));
  return n = setHours(n, 0), n = setMinutes(n, 0), n = setSeconds(n, 0), n = setMilliseconds(n, 0), n;
};
var Fe = (e, n, a, t) => {
  let s = e ? $(e) : $();
  return (n || n === 0) && (s = setHours(s, +n)), (a || a === 0) && (s = setMinutes(s, +a)), (t || t === 0) && (s = setSeconds(s, +t)), setMilliseconds(s, 0);
};
var _e = (e, n) => !e || !n ? false : isBefore(Ue(e), Ue(n));
var ve = (e, n) => !e || !n ? false : isEqual(Ue(e), Ue(n));
var Be = (e, n) => !e || !n ? false : isAfter(Ue(e), Ue(n));
var xn = (e, n, a) => e && e[0] && e[1] ? Be(a, e[0]) && _e(a, e[1]) : e && e[0] && n ? Be(a, e[0]) && _e(a, n) || _e(a, e[0]) && Be(a, n) : false;
var pt = (e) => {
  const n = set(new Date(e), { date: 1 });
  return Ue(n);
};
var kt = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Kn = () => {
  const e = (t) => {
    kt.menuFocused = t;
  }, n = (t) => {
    kt.shiftKeyInMenu !== t && (kt.shiftKeyInMenu = t);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: kt.shiftKeyInMenu, menuFocused: kt.menuFocused })),
    setMenuFocused: e,
    setShiftKey: n
  };
};
function yn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Bt = {};
var ya = {
  get exports() {
    return Bt;
  },
  set exports(e) {
    Bt = e;
  }
};
(function(e, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a;
  function a(t) {
    if (t === null || t === true || t === false)
      return NaN;
    var s = Number(t);
    return isNaN(s) ? s : s < 0 ? Math.ceil(s) : Math.floor(s);
  }
  e.exports = n.default;
})(ya, Bt);
var ga = yn(Bt);
var Yt = {};
var ha = {
  get exports() {
    return Yt;
  },
  set exports(e) {
    Yt = e;
  }
};
(function(e, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a;
  function a(t) {
    var s = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
    return s.setUTCFullYear(t.getFullYear()), t.getTime() - s.getTime();
  }
  e.exports = n.default;
})(ha, Yt);
var $n = yn(Yt);
function pa(e, n) {
  var a = Da(n);
  return a.formatToParts ? wa(a, e) : ba(a, e);
}
var ka = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function wa(e, n) {
  try {
    for (var a = e.formatToParts(n), t = [], s = 0; s < a.length; s++) {
      var f = ka[a[s].type];
      f >= 0 && (t[f] = parseInt(a[s].value, 10));
    }
    return t;
  } catch (y) {
    if (y instanceof RangeError)
      return [NaN];
    throw y;
  }
}
function ba(e, n) {
  var a = e.format(n).replace(/\u200E/g, ""), t = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(a);
  return [t[3], t[1], t[2], t[4], t[5], t[6]];
}
var Xt = {};
function Da(e) {
  if (!Xt[e]) {
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
    Xt[e] = a ? new Intl.DateTimeFormat("en-US", {
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
  return Xt[e];
}
function gn(e, n, a, t, s, f, y) {
  var _ = /* @__PURE__ */ new Date(0);
  return _.setUTCFullYear(e, n, a), _.setUTCHours(t, s, f, y), _;
}
var Mn = 36e5;
var $a = 6e4;
var qt = {
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-]\d{2}):?(\d{2})$/
};
function hn(e, n, a) {
  var t, s;
  if (!e || (t = qt.timezoneZ.exec(e), t))
    return 0;
  var f;
  if (t = qt.timezoneHH.exec(e), t)
    return f = parseInt(t[1], 10), Tn(f) ? -(f * Mn) : NaN;
  if (t = qt.timezoneHHMM.exec(e), t) {
    f = parseInt(t[1], 10);
    var y = parseInt(t[2], 10);
    return Tn(f, y) ? (s = Math.abs(f) * Mn + y * $a, f > 0 ? -s : s) : NaN;
  }
  if (Aa(e)) {
    n = new Date(n || Date.now());
    var _ = a ? n : Ma(n), E = sn(_, e), T = a ? E : Ta(n, E, e);
    return -T;
  }
  return NaN;
}
function Ma(e) {
  return gn(
    e.getFullYear(),
    e.getMonth(),
    e.getDate(),
    e.getHours(),
    e.getMinutes(),
    e.getSeconds(),
    e.getMilliseconds()
  );
}
function sn(e, n) {
  var a = pa(e, n), t = gn(
    a[0],
    a[1] - 1,
    a[2],
    a[3] % 24,
    a[4],
    a[5],
    0
  ).getTime(), s = e.getTime(), f = s % 1e3;
  return s -= f >= 0 ? f : 1e3 + f, t - s;
}
function Ta(e, n, a) {
  var t = e.getTime(), s = t - n, f = sn(new Date(s), a);
  if (n === f)
    return n;
  s -= f - n;
  var y = sn(new Date(s), a);
  return f === y ? f : Math.max(f, y);
}
function Tn(e, n) {
  return -23 <= e && e <= 23 && (n == null || 0 <= n && n <= 59);
}
var An = {};
function Aa(e) {
  if (An[e])
    return true;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e }), An[e] = true, true;
  } catch {
    return false;
  }
}
var Sa = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
var jn = Sa;
var Jt = 36e5;
var Sn = 6e4;
var Ca = 2;
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
  timeZone: jn
};
function un(e, n) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e === null)
    return /* @__PURE__ */ new Date(NaN);
  var a = n || {}, t = a.additionalDigits == null ? Ca : ga(a.additionalDigits);
  if (t !== 2 && t !== 1 && t !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]")
    return new Date(e.getTime());
  if (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]")
    return new Date(e);
  if (!(typeof e == "string" || Object.prototype.toString.call(e) === "[object String]"))
    return /* @__PURE__ */ new Date(NaN);
  var s = Pa(e), f = _a(s.date, t), y = f.year, _ = f.restDateString, E = Na(_, y);
  if (isNaN(E))
    return /* @__PURE__ */ new Date(NaN);
  if (E) {
    var T = E.getTime(), U = 0, A;
    if (s.time && (U = Ra(s.time), isNaN(U)))
      return /* @__PURE__ */ new Date(NaN);
    if (s.timeZone || a.timeZone) {
      if (A = hn(s.timeZone || a.timeZone, new Date(T + U)), isNaN(A))
        return /* @__PURE__ */ new Date(NaN);
    } else
      A = $n(new Date(T + U)), A = $n(new Date(T + U + A));
    return new Date(T + U + A);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function Pa(e) {
  var n = {}, a = Ie.dateTimePattern.exec(e), t;
  if (a ? (n.date = a[1], t = a[3]) : (a = Ie.datePattern.exec(e), a ? (n.date = a[1], t = a[2]) : (n.date = null, t = e)), t) {
    var s = Ie.timeZone.exec(t);
    s ? (n.time = t.replace(s[1], ""), n.timeZone = s[1].trim()) : n.time = t;
  }
  return n;
}
function _a(e, n) {
  var a = Ie.YYY[n], t = Ie.YYYYY[n], s;
  if (s = Ie.YYYY.exec(e) || t.exec(e), s) {
    var f = s[1];
    return {
      year: parseInt(f, 10),
      restDateString: e.slice(f.length)
    };
  }
  if (s = Ie.YY.exec(e) || a.exec(e), s) {
    var y = s[1];
    return {
      year: parseInt(y, 10) * 100,
      restDateString: e.slice(y.length)
    };
  }
  return {
    year: null
  };
}
function Na(e, n) {
  if (n === null)
    return null;
  var a, t, s, f;
  if (e.length === 0)
    return t = /* @__PURE__ */ new Date(0), t.setUTCFullYear(n), t;
  if (a = Ie.MM.exec(e), a)
    return t = /* @__PURE__ */ new Date(0), s = parseInt(a[1], 10) - 1, Pn(n, s) ? (t.setUTCFullYear(n, s), t) : /* @__PURE__ */ new Date(NaN);
  if (a = Ie.DDD.exec(e), a) {
    t = /* @__PURE__ */ new Date(0);
    var y = parseInt(a[1], 10);
    return Ba(n, y) ? (t.setUTCFullYear(n, 0, y), t) : /* @__PURE__ */ new Date(NaN);
  }
  if (a = Ie.MMDD.exec(e), a) {
    t = /* @__PURE__ */ new Date(0), s = parseInt(a[1], 10) - 1;
    var _ = parseInt(a[2], 10);
    return Pn(n, s, _) ? (t.setUTCFullYear(n, s, _), t) : /* @__PURE__ */ new Date(NaN);
  }
  if (a = Ie.Www.exec(e), a)
    return f = parseInt(a[1], 10) - 1, _n(n, f) ? Cn(n, f) : /* @__PURE__ */ new Date(NaN);
  if (a = Ie.WwwD.exec(e), a) {
    f = parseInt(a[1], 10) - 1;
    var E = parseInt(a[2], 10) - 1;
    return _n(n, f, E) ? Cn(n, f, E) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function Ra(e) {
  var n, a, t;
  if (n = Ie.HH.exec(e), n)
    return a = parseFloat(n[1].replace(",", ".")), Qt(a) ? a % 24 * Jt : NaN;
  if (n = Ie.HHMM.exec(e), n)
    return a = parseInt(n[1], 10), t = parseFloat(n[2].replace(",", ".")), Qt(a, t) ? a % 24 * Jt + t * Sn : NaN;
  if (n = Ie.HHMMSS.exec(e), n) {
    a = parseInt(n[1], 10), t = parseInt(n[2], 10);
    var s = parseFloat(n[3].replace(",", "."));
    return Qt(a, t, s) ? a % 24 * Jt + t * Sn + s * 1e3 : NaN;
  }
  return null;
}
function Cn(e, n, a) {
  n = n || 0, a = a || 0;
  var t = /* @__PURE__ */ new Date(0);
  t.setUTCFullYear(e, 0, 4);
  var s = t.getUTCDay() || 7, f = n * 7 + a + 1 - s;
  return t.setUTCDate(t.getUTCDate() + f), t;
}
var Oa = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var Ia = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Gn(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function Pn(e, n, a) {
  if (n < 0 || n > 11)
    return false;
  if (a != null) {
    if (a < 1)
      return false;
    var t = Gn(e);
    if (t && a > Ia[n] || !t && a > Oa[n])
      return false;
  }
  return true;
}
function Ba(e, n) {
  if (n < 1)
    return false;
  var a = Gn(e);
  return !(a && n > 366 || !a && n > 365);
}
function _n(e, n, a) {
  return !(n < 0 || n > 52 || a != null && (a < 0 || a > 6));
}
function Qt(e, n, a) {
  return !(e != null && (e < 0 || e >= 25) || n != null && (n < 0 || n >= 60) || a != null && (a < 0 || a >= 60));
}
var Vt = {};
var Ya = {
  get exports() {
    return Vt;
  },
  set exports(e) {
    Vt = e;
  }
};
var Et = {};
var Va = {
  get exports() {
    return Et;
  },
  set exports(e) {
    Et = e;
  }
};
(function(e, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a;
  function a(t, s) {
    if (t == null)
      throw new TypeError("assign requires that input parameter not be null or undefined");
    for (var f in s)
      Object.prototype.hasOwnProperty.call(s, f) && (t[f] = s[f]);
    return t;
  }
  e.exports = n.default;
})(Va, Et);
(function(e, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = s;
  var a = t(Et);
  function t(f) {
    return f && f.__esModule ? f : { default: f };
  }
  function s(f) {
    return (0, a.default)({}, f);
  }
  e.exports = n.default;
})(Ya, Vt);
var Ea = yn(Vt);
function Fa(e, n, a) {
  var t = un(e, a), s = hn(n, t, true), f = new Date(t.getTime() - s), y = /* @__PURE__ */ new Date(0);
  return y.setFullYear(f.getUTCFullYear(), f.getUTCMonth(), f.getUTCDate()), y.setHours(f.getUTCHours(), f.getUTCMinutes(), f.getUTCSeconds(), f.getUTCMilliseconds()), y;
}
function La(e, n, a) {
  if (typeof e == "string" && !e.match(jn)) {
    var t = Ea(a);
    return t.timeZone = n, un(e, t);
  }
  var s = un(e, a), f = gn(
    s.getFullYear(),
    s.getMonth(),
    s.getDate(),
    s.getHours(),
    s.getMinutes(),
    s.getSeconds(),
    s.getMilliseconds()
  ).getTime(), y = hn(n, new Date(f));
  return new Date(f + y);
}
var Ua = (e, n = 3) => {
  const a = [];
  for (let t = 0; t < e.length; t += n)
    a.push([e[t], e[t + 1], e[t + 2]]);
  return a;
};
var Ha = (e, n) => {
  const a = [1, 2, 3, 4, 5, 6, 7].map((f) => new Intl.DateTimeFormat(e, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${f}T00:00:00+00:00`)).slice(0, 2)), t = a.slice(0, n), s = a.slice(n + 1, a.length);
  return [a[n]].concat(...s).concat(...t);
};
var Wa = (e, n) => {
  const a = [];
  for (let t = +e[0]; t <= +e[1]; t++)
    a.push({ value: +t, text: `${t}` });
  return n ? a.reverse() : a;
};
var za = (e, n) => {
  const a = new Intl.DateTimeFormat(e, { month: n, timeZone: "UTC" });
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((s) => {
    const f = s < 10 ? `0${s}` : s;
    return /* @__PURE__ */ new Date(`2017-${f}-01T00:00:00+00:00`);
  }).map((s, f) => ({
    text: a.format(s),
    value: f
  }));
};
var xa = (e) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e];
var $e = (e) => {
  const n = unref(e);
  return n != null && n.$el ? n == null ? void 0 : n.$el : n;
};
var Ka = (e) => Object.assign({ type: "dot" }, e);
var Zn = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : false;
var Ft = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
};
var Me = (e) => e;
var Nn = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e;
var Rn = (e) => Object.assign(
  {
    menuAppear: "dp-menu-appear",
    open: "dp-slide-down",
    close: "dp-slide-up",
    next: "calendar-next",
    previous: "calendar-prev",
    vNext: "dp-slide-up",
    vPrevious: "dp-slide-down"
  },
  e
);
var ja = (e) => Object.assign(
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
  e
);
var Ga = (e) => e === null ? 0 : typeof e == "boolean" ? e ? 2 : 0 : +e >= 2 ? +e : 2;
var Za = (e, n, a) => e || (typeof a == "string" ? a : n);
var Xa = (e) => typeof e == "boolean" ? e ? Rn({}) : false : Rn(e);
var qa = () => ({
  enterSubmit: true,
  tabSubmit: true,
  openMenu: true,
  rangeSeparator: " - "
});
var Ja = (e) => Object.assign({ months: [], years: [], times: { hours: [], minutes: [], seconds: [] } }, e);
var Ee = (e) => {
  const n = () => {
    if (e.partialRange)
      return null;
    throw new Error(Ft.prop("partial-range"));
  }, a = computed(() => ({
    ariaLabels: ja(e.ariaLabels),
    textInputOptions: Object.assign(qa(), e.textInputOptions),
    multiCalendars: Ga(e.multiCalendars),
    previewFormat: Za(e.previewFormat, e.format, f()),
    filters: Ja(e.filters),
    transitions: Xa(e.transitions),
    startTime: c()
  })), t = (o) => {
    if (e.range)
      return o();
    throw new Error(Ft.prop("range"));
  }, s = () => {
    const o = e.enableSeconds ? ":ss" : "";
    return e.is24 ? `HH:mm${o}` : `hh:mm${o} aa`;
  }, f = () => e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? s() : e.weekPicker ? "MM/dd/yyyy" : e.yearPicker ? "yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${s()}` : "MM/dd/yyyy", y = (o, g) => {
    if (typeof e.format == "function")
      return e.format(o);
    const r = g || f(), k = e.formatLocale ? { locale: e.formatLocale } : void 0;
    return Array.isArray(o) ? `${format(o[0], r, k)} ${e.modelAuto && !o[1] ? "" : a.value.textInputOptions.rangeSeparator || "-"} ${o[1] ? format(o[1], r, k) : ""}` : format(o, r, k);
  }, _ = (o) => e.timezone ? Fa(o, e.timezone) : o, E = (o) => e.timezone ? La(o, e.timezone) : o, T = computed(() => (o) => {
    var g;
    return (g = e.hideNavigation) == null ? void 0 : g.includes(o);
  }), U = (o) => {
    const g = e.maxDate ? Be(_(o), _($(e.maxDate))) : false, r = e.minDate ? _e(_(o), _($(e.minDate))) : false, k = B(o, e.disabledDates), R = a.value.filters.months.map((se) => +se).includes(getMonth(o)), m = e.disabledWeekDays.length ? e.disabledWeekDays.some((se) => +se === getDay(o)) : false, b = e.allowedDates.length ? !e.allowedDates.some((se) => ve(_($(se)), _(o))) : false, v = getYear(o), W = v < +e.yearRange[0] || v > +e.yearRange[1];
    return !(g || r || k || R || W || m || b);
  }, A = (o) => {
    const g = {
      hours: getHours($()),
      minutes: getMinutes($()),
      seconds: e.enableSeconds ? getSeconds($()) : 0
    };
    return Object.assign(g, o);
  }, c = () => e.range ? e.startTime && Array.isArray(e.startTime) ? [A(e.startTime[0]), A(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? A(e.startTime) : null, M = (o) => !U(o), te = (o) => Array.isArray(o) ? isValid(o[0]) && (o[1] ? isValid(o[1]) : true) : o ? isValid(o) : false, H = (o) => o instanceof Date ? o : parseISO(o), z = (o) => {
    const g = startOfWeek(_(o), { weekStartsOn: +e.weekStart }), r = endOfWeek(_(o), { weekStartsOn: +e.weekStart });
    return [g, r];
  }, B = (o, g) => Array.isArray(g) ? g.some((r) => ve(_($(r)), _(o))) : g($(JSON.parse(JSON.stringify(o)))), w = (o, g, r) => {
    let k = o ? $(o) : $();
    return (g || g === 0) && (k = setMonth(k, g)), r && (k = setYear(k, r)), k;
  }, J = (o) => set($(), { hours: getHours(o), minutes: getMinutes(o), seconds: getSeconds(o) }), ee = (o) => set($(), {
    hours: +o.hours || 0,
    minutes: +o.minutes || 0,
    seconds: +o.seconds || 0
  }), x = (o, g, r, k) => {
    if (!o)
      return true;
    if (k) {
      const Y = r === "max" ? isBefore(o, g) : isAfter(o, g), R = { seconds: 0, milliseconds: 0 };
      return Y || isEqual(set(o, R), set(g, R));
    }
    return r === "max" ? o.getTime() <= g.getTime() : o.getTime() >= g.getTime();
  }, le = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, de = (o) => Array.isArray(o) ? [o[0] ? J(o[0]) : null, o[1] ? J(o[1]) : null] : J(o), C = (o) => {
    const g = e.maxTime ? ee(e.maxTime) : $(e.maxDate);
    return Array.isArray(o) ? x(o[0], g, "max", !!e.maxDate) && x(o[1], g, "max", !!e.maxDate) : x(o, g, "max", !!e.maxDate);
  }, N = (o, g) => {
    const r = e.minTime ? ee(e.minTime) : $(e.minDate);
    return Array.isArray(o) ? x(o[0], r, "min", !!e.minDate) && x(o[1], r, "min", !!e.minDate) && g : x(o, r, "min", !!e.minDate) && g;
  }, G = (o) => {
    let g = true;
    if (!o || le())
      return true;
    const r = !e.minDate && !e.maxDate ? de(o) : o;
    return (e.maxTime || e.maxDate) && (g = C(Me(r))), (e.minTime || e.minDate) && (g = N(Me(r), g)), g;
  }, P = (o, g) => {
    const r = $(JSON.parse(JSON.stringify(o))), k = [];
    for (let Y = 0; Y < 7; Y++) {
      const R = addDays(r, Y), m = getMonth(R) !== g;
      k.push({
        text: e.hideOffsetDates && m ? "" : R.getDate(),
        value: R,
        current: !m,
        classData: {}
      });
    }
    return k;
  }, Z = (o, g) => {
    const r = [], k = $(_(new Date(g, o))), Y = $(_(new Date(g, o + 1, 0))), R = startOfWeek(k, { weekStartsOn: e.weekStart }), m = (b) => {
      const v = P(b, o);
      if (r.push({ days: v }), !r[r.length - 1].days.some(
        (W) => ve(Ue(W.value), Ue(Y))
      )) {
        const W = addDays(b, 7);
        m(W);
      }
    };
    if (m(R), e.sixWeeks && r.length < 6) {
      const b = 6 - r.length;
      for (let v = 1; v <= b; v++) {
        const W = r[r.length - 1], se = W.days[W.days.length - 1], Ne = P(addDays(se.value, 1), getMonth(k));
        r.push({ days: Ne });
      }
    }
    return r;
  }, p = (o, g, r) => [set($(o), { date: 1 }), set($(), { month: g, year: r, date: 1 })], q = (o, g) => _e(...p(e.minDate, o, g)) || ve(...p(e.minDate, o, g)), j = (o, g) => Be(...p(e.maxDate, o, g)) || ve(...p(e.maxDate, o, g)), I = (o, g, r) => {
    let k = false;
    return e.maxDate && r && j(o, g) && (k = true), e.minDate && !r && q(o, g) && (k = true), k;
  };
  return {
    checkPartialRangeValue: n,
    checkRangeEnabled: t,
    getZonedDate: _,
    getZonedToUtc: E,
    formatDate: y,
    getDefaultPattern: f,
    validateDate: U,
    getDefaultStartTime: c,
    isDisabled: M,
    isValidDate: te,
    sanitizeDate: H,
    getWeekFromDate: z,
    matchDate: B,
    setDateMonthOrYear: w,
    isValidTime: G,
    getCalendarDays: Z,
    validateMonthYearInRange: (o, g, r, k) => {
      let Y = false;
      return k ? e.minDate && e.maxDate ? Y = I(o, g, r) : (e.minDate && q(o, g) || e.maxDate && j(o, g)) && (Y = true) : Y = true, Y;
    },
    validateMaxDate: j,
    validateMinDate: q,
    assignDefaultTime: A,
    defaults: a,
    hideNavigationButtons: T
  };
};
var he = reactive({
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
var en = ref(null);
var Pt = ref(false);
var tn = ref(false);
var nn = ref(false);
var an = ref(false);
var Oe = ref(0);
var Ae = ref(0);
var nt = () => {
  const e = computed(() => Pt.value ? [...he.selectionGrid, he.actionRow].filter((B) => B.length) : tn.value ? [
    ...he.timePicker[0],
    ...he.timePicker[1],
    an.value ? [] : [en.value],
    he.actionRow
  ].filter((B) => B.length) : nn.value ? [...he.monthPicker, he.actionRow] : [he.monthYear, ...he.calendar, he.time, he.actionRow].filter((B) => B.length)), n = (B) => {
    Oe.value = B ? Oe.value + 1 : Oe.value - 1;
    let w = null;
    e.value[Ae.value] && (w = e.value[Ae.value][Oe.value]), w || (Oe.value = B ? Oe.value - 1 : Oe.value + 1);
  }, a = (B) => {
    if (Ae.value === 0 && !B || Ae.value === e.value.length && B)
      return;
    Ae.value = B ? Ae.value + 1 : Ae.value - 1, e.value[Ae.value] ? e.value[Ae.value] && !e.value[Ae.value][Oe.value] && Oe.value !== 0 && (Oe.value = e.value[Ae.value].length - 1) : Ae.value = B ? Ae.value - 1 : Ae.value + 1;
  }, t = (B) => {
    let w = null;
    e.value[Ae.value] && (w = e.value[Ae.value][Oe.value]), w ? w.focus({ preventScroll: !Pt.value }) : Oe.value = B ? Oe.value - 1 : Oe.value + 1;
  }, s = () => {
    n(true), t(true);
  }, f = () => {
    n(false), t(false);
  }, y = () => {
    a(false), t(true);
  }, _ = () => {
    a(true), t(true);
  }, E = (B, w) => {
    he[w] = B;
  }, T = (B, w) => {
    he[w] = B;
  }, U = () => {
    Oe.value = 0, Ae.value = 0;
  };
  return {
    buildMatrix: E,
    buildMultiLevelMatrix: T,
    setTimePickerBackRef: (B) => {
      en.value = B;
    },
    setSelectionGrid: (B) => {
      Pt.value = B, U(), B || (he.selectionGrid = []);
    },
    setTimePicker: (B, w = false) => {
      tn.value = B, an.value = w, U(), B || (he.timePicker[0] = [], he.timePicker[1] = []);
    },
    setTimePickerElements: (B, w = 0) => {
      he.timePicker[w] = B;
    },
    arrowRight: s,
    arrowLeft: f,
    arrowUp: y,
    arrowDown: _,
    clearArrowNav: () => {
      he.monthYear = [], he.calendar = [], he.time = [], he.actionRow = [], he.selectionGrid = [], he.timePicker[0] = [], he.timePicker[1] = [], Pt.value = false, tn.value = false, an.value = false, nn.value = false, U(), en.value = null;
    },
    setMonthPicker: (B) => {
      nn.value = B, U();
    },
    refSets: he
    // exposed for testing
  };
};
var On = (e) => Array.isArray(e);
var lt = (e) => Array.isArray(e);
var In = (e) => Array.isArray(e) && e.length === 2;
var Qa = (e, n, a, t, s) => {
  const {
    getDefaultStartTime: f,
    isDisabled: y,
    sanitizeDate: _,
    getWeekFromDate: E,
    setDateMonthOrYear: T,
    validateMonthYearInRange: U,
    defaults: A
  } = Ee(e), c = computed({
    get: () => e.internalModelValue,
    set: (i) => {
      !e.readonly && !e.disabled && n("update:internal-model-value", i);
    }
  }), M = ref([]);
  watch(c, () => {
    le();
  });
  const te = toRef(e, "multiCalendars");
  watch(te, () => {
    Je(0);
  });
  const H = ref([{ month: getMonth($()), year: getYear($()) }]), z = reactive({
    hours: e.range ? [getHours($()), getHours($())] : getHours($()),
    minutes: e.range ? [getMinutes($()), getMinutes($())] : getMinutes($()),
    seconds: e.range ? [0, 0] : 0
  }), B = computed(
    () => (i) => H.value[i] ? H.value[i].month : 0
  ), w = computed(
    () => (i) => H.value[i] ? H.value[i].year : 0
  ), J = computed(() => e.flow && e.flow.length && !e.partialFlow ? s.value === e.flow.length : true), ee = (i, D, Q) => {
    var d, V;
    H.value[i] || (H.value[i] = { month: 0, year: 0 }), H.value[i].month = D === null ? (d = H.value[i]) == null ? void 0 : d.month : D, H.value[i].year = Q === null ? (V = H.value[i]) == null ? void 0 : V.year : Q;
  }, x = (i, D) => {
    z[i] = D;
  };
  onMounted(() => {
    c.value || (e.startDate && (ee(0, getMonth($(e.startDate)), getYear($(e.startDate))), A.value.multiCalendars && Je(0)), A.value.startTime && I()), le(true);
  });
  const le = (i = false) => {
    if (c.value)
      return Array.isArray(c.value) ? (M.value = c.value, P(i)) : C(c.value);
    if (e.timePicker)
      return Z();
    if (e.monthPicker && !e.range)
      return p();
    if (e.yearPicker && !e.range)
      return q();
    if (A.value.multiCalendars && i && !e.startDate)
      return de($(), i);
  }, de = (i, D = false) => {
    if ((!A.value.multiCalendars || !e.multiStatic || D) && ee(0, getMonth(i), getYear(i)), A.value.multiCalendars)
      for (let Q = 1; Q < A.value.multiCalendars; Q++) {
        const d = set($(), { month: B.value(Q - 1), year: w.value(Q - 1) }), V = add(d, { months: 1 });
        H.value[Q] = { month: getMonth(V), year: getYear(V) };
      }
  }, C = (i) => {
    de(i), x("hours", getHours(i)), x("minutes", getMinutes(i)), x("seconds", getSeconds(i));
  }, N = (i, D) => {
    de(i[0], D);
    const Q = (d, V) => [
      d(i[0]),
      i[1] ? d(i[1]) : z[V][1]
    ];
    x("hours", Q(getHours, "hours")), x("minutes", Q(getMinutes, "minutes")), x("seconds", Q(getSeconds, "seconds"));
  }, G = (i, D) => {
    if ((e.range || e.weekPicker) && !e.multiDates)
      return N(i, D);
    if (e.multiDates) {
      const Q = i[i.length - 1];
      return C(Q);
    }
  }, P = (i) => {
    const D = c.value;
    G(D, i), A.value.multiCalendars && e.multiCalendarsSolo && o();
  }, Z = () => {
    if (I(), !e.range)
      c.value = Fe($(), z.hours, z.minutes, j());
    else {
      const i = z.hours, D = z.minutes;
      c.value = [
        Fe($(), i[0], D[0], j()),
        Fe($(), i[1], D[1], j(false))
      ];
    }
  }, p = () => {
    e.multiDates ? c.value = [T($(), B.value(0), w.value(0))] : c.value = T($(), B.value(0), w.value(0));
  }, q = () => {
    c.value = $();
  }, j = (i = true) => e.enableSeconds ? Array.isArray(z.seconds) ? i ? z.seconds[0] : z.seconds[1] : z.seconds : 0, I = () => {
    const i = f();
    if (i) {
      const D = Array.isArray(i), Q = D ? [+i[0].hours, +i[1].hours] : +i.hours, d = D ? [+i[0].minutes, +i[1].minutes] : +i.minutes, V = D ? [+i[0].seconds, +i[1].seconds] : +i.seconds;
      x("hours", Q), x("minutes", d), e.enableSeconds && x("seconds", V);
    }
  }, l = () => Array.isArray(c.value) && c.value.length ? c.value[c.value.length - 1] : null, o = () => {
    if (Array.isArray(c.value) && c.value.length === 2) {
      const i = $(
        $(c.value[1] ? c.value[1] : addMonths(c.value[0], 1))
      ), [D, Q] = [getMonth(c.value[0]), getYear(c.value[0])], [d, V] = [getMonth(c.value[1]), getYear(c.value[1])];
      (D !== d || D === d && Q !== V) && e.multiCalendarsSolo && ee(1, getMonth(i), getYear(i));
    }
  }, g = (i) => {
    const D = addMonths(i, 1);
    return { month: getMonth(D), year: getYear(D) };
  }, r = (i) => {
    const D = getMonth($(i)), Q = getYear($(i));
    if (ee(0, D, Q), A.value.multiCalendars > 0)
      for (let d = 1; d < A.value.multiCalendars; d++) {
        const V = g(
          set($(i), { year: B.value(d - 1), month: w.value(d - 1) })
        );
        ee(d, V.month, V.year);
      }
  }, k = (i) => {
    if (c.value && Array.isArray(c.value))
      if (c.value.some((D) => ve(i, D))) {
        const D = c.value.filter((Q) => !ve(Q, i));
        c.value = D.length ? D : null;
      } else
        (e.multiDatesLimit && +e.multiDatesLimit > c.value.length || !e.multiDatesLimit) && c.value.push(i);
    else
      c.value = [i];
  }, Y = (i, D) => {
    const Q = Be(i, D) ? D : i, d = Be(D, i) ? D : i;
    return eachDayOfInterval({ start: Q, end: d });
  }, R = (i, D = 0) => {
    if (Array.isArray(c.value) && c.value[D]) {
      const Q = differenceInCalendarDays(i, c.value[D]), d = Y(c.value[D], i), V = d.length === 1 ? 0 : d.filter((be) => y(be)).length, we = Math.abs(Q) - V;
      if (e.minRange && e.maxRange)
        return we >= +e.minRange && we <= +e.maxRange;
      if (e.minRange)
        return we >= +e.minRange;
      if (e.maxRange)
        return we <= +e.maxRange;
    }
    return true;
  }, m = (i) => Array.isArray(c.value) && c.value.length === 2 ? e.fixedStart && (Be(i, c.value[0]) || ve(i, c.value[0])) ? [c.value[0], i] : e.fixedEnd && (_e(i, c.value[1]) || ve(i, c.value[1])) ? [i, c.value[1]] : (n("invalid-fixed-range", i), c.value) : [], b = () => {
    e.autoApply && J.value && n("auto-apply", e.partialFlow);
  }, v = () => {
    e.autoApply && n("select-date");
  }, W = (i) => !eachDayOfInterval({ start: i[0], end: i[1] }).some((Q) => y(Q)), se = (i) => (c.value = E($(i.value)), b()), Ne = (i) => {
    const D = Fe($(i.value), z.hours, z.minutes, j());
    e.multiDates ? k(D) : c.value = D, a(), b();
  }, Xe = () => {
    M.value = c.value ? c.value.slice() : [], M.value.length === 2 && !(e.fixedStart || e.fixedEnd) && (M.value = []);
  }, re = (i, D) => {
    const Q = [$(i.value), addDays($(i.value), +e.autoRange)];
    W(Q) && (D && r(i.value), M.value = Q);
  }, qe = (i) => {
    xe(i.value) || !R(i.value, e.fixedStart ? 0 : 1) || (M.value = m($(i.value)));
  }, xe = (i) => e.noDisabledRange ? Y(M.value[0], i).some((Q) => y(Q)) : false, Re = (i, D) => {
    if (Xe(), e.autoRange)
      return re(i, D);
    if (e.fixedStart || e.fixedEnd)
      return qe(i);
    M.value[0] ? R($(i.value)) && !xe(i.value) && (_e($(i.value), $(M.value[0])) ? M.value.unshift($(i.value)) : M.value[1] = $(i.value)) : M.value[0] = $(i.value);
  }, rt = (i) => {
    M.value[i] = Fe(
      M.value[i],
      z.hours[i],
      z.minutes[i],
      j(i !== 1)
    );
  }, ne = () => {
    M.value.length && (M.value[0] && !M.value[1] ? rt(0) : (rt(0), rt(1), a()), c.value = M.value.slice(), M.value[0] && M.value[1] && e.autoApply && n("auto-apply"), M.value[0] && !M.value[1] && e.modelAuto && e.autoApply && n("auto-apply"));
  }, me = (i, D = false) => {
    if (!(y(i.value) || !i.current && e.hideOffsetDates)) {
      if (e.weekPicker)
        return se(i);
      if (!e.range)
        return Ne(i);
      lt(z.hours) && lt(z.minutes) && !e.multiDates && (Re(i, D), ne());
    }
  }, ge = (i) => {
    const D = i[0];
    return e.weekNumbers === "local" ? getWeek(D.value, { weekStartsOn: +e.weekStart }) : e.weekNumbers === "iso" ? getISOWeek(D.value) : typeof e.weekNumbers == "function" ? e.weekNumbers(D.value) : "";
  }, Je = (i) => {
    for (let D = i - 1; D >= 0; D--) {
      const Q = subMonths(set($(), { month: B.value(D + 1), year: w.value(D + 1) }), 1);
      ee(D, getMonth(Q), getYear(Q));
    }
    for (let D = i + 1; D <= A.value.multiCalendars - 1; D++) {
      const Q = addMonths(set($(), { month: B.value(D - 1), year: w.value(D - 1) }), 1);
      ee(D, getMonth(Q), getYear(Q));
    }
  }, Ye = (i) => T($(), B.value(i), w.value(i)), Tt = (i) => Fe(i, z.hours, z.minutes, j()), Ht = (i) => {
    k(Ye(i));
  }, Wt = (i, D) => {
    const Q = e.monthPicker ? B.value(i) !== D.month || !D.fromNav : w.value(i) !== D.year || !D.fromNav;
    if (ee(i, D.month, D.year), A.value.multiCalendars && !e.multiCalendarsSolo && Je(i), e.monthPicker || e.yearPicker)
      if (e.multiDates)
        Q && Ht(i);
      else if (e.range) {
        if (Q && R(Ye(i))) {
          let d = c.value ? c.value.slice() : [];
          d.length === 2 && d[1] !== null && (d = []), d.length ? _e(Ye(i), d[0]) ? d.unshift(Ye(i)) : d[1] = Ye(i) : d = [Ye(i)], c.value = d;
        }
      } else
        c.value = Ye(i);
    n("update-month-year", { instance: i, month: D.month, year: D.year }), t(e.multiCalendarsSolo ? i : void 0);
  }, zt = async (i = false) => {
    if (e.autoApply && (e.monthPicker || e.yearPicker)) {
      await nextTick();
      const D = e.monthPicker ? i : false;
      e.range ? n("auto-apply", D || !c.value || c.value.length === 1) : n("auto-apply", D);
    }
    a();
  }, At = (i, D) => {
    const Q = set($(), { month: B.value(D), year: w.value(D) }), d = i < 0 ? addMonths(Q, 1) : subMonths(Q, 1);
    U(getMonth(d), getYear(d), i < 0, e.preventMinMaxNavigation) && (ee(D, getMonth(d), getYear(d)), A.value.multiCalendars && !e.multiCalendarsSolo && Je(D), n("update-month-year", { instance: D, month: getMonth(d), year: getYear(d) }), t());
  }, ht = (i) => {
    On(i) && On(c.value) && lt(z.hours) && lt(z.minutes) ? (i[0] && c.value[0] && (c.value[0] = Fe(i[0], z.hours[0], z.minutes[0], j())), i[1] && c.value[1] && (c.value[1] = Fe(i[1], z.hours[1], z.minutes[1], j(false)))) : e.multiDates && Array.isArray(c.value) ? c.value[c.value.length - 1] = Tt(i) : !e.range && !In(i) && (c.value = Tt(i)), n("time-update");
  }, xt = (i, D = true, Q = false) => {
    const d = D ? i : z.hours, V = !D && !Q ? i : z.minutes, we = Q ? i : z.seconds;
    if (e.range && In(c.value) && lt(d) && lt(V) && lt(we) && !e.disableTimeRangeValidation) {
      const be = (X) => Fe(c.value[X], d[X], V[X], we[X]), Ke = (X) => setMilliseconds(c.value[X], 0);
      if (ve(c.value[0], c.value[1]) && (isAfter(be(0), Ke(1)) || isBefore(be(1), Ke(0))))
        return;
    }
    if (x("hours", d), x("minutes", V), x("seconds", we), c.value)
      if (e.multiDates) {
        const be = l();
        be && ht(be);
      } else
        ht(c.value);
    else
      e.timePicker && ht(e.range ? [$(), $()] : $());
    a();
  }, Kt = (i, D) => {
    e.monthChangeOnScroll && At(e.monthChangeOnScroll !== "inverse" ? -i.deltaY : i.deltaY, D);
  }, jt = (i, D, Q = false) => {
    e.monthChangeOnArrows && e.vertical === Q && St(i, D);
  }, St = (i, D) => {
    At(i === "right" ? -1 : 1, D);
  };
  return {
    time: z,
    month: B,
    year: w,
    modelValue: c,
    calendars: H,
    monthYearSelect: zt,
    isDisabled: y,
    updateTime: xt,
    getWeekNum: ge,
    selectDate: me,
    updateMonthYear: Wt,
    handleScroll: Kt,
    getMarker: (i) => e.markers.find((D) => ve(_(i.value), _(D.date))),
    handleArrow: jt,
    handleSwipe: St,
    selectCurrentDate: () => {
      e.range ? c.value && Array.isArray(c.value) && c.value[0] ? c.value = _e($(), c.value[0]) ? [$(), c.value[0]] : [c.value[0], $()] : c.value = [$()] : c.value = $(), v();
    },
    presetDateRange: (i, D) => {
      D || i.length && i.length <= 2 && e.range && (c.value = i.map((Q) => $(Q)), v(), e.multiCalendars && nextTick().then(() => le(true)));
    }
  };
};
var er = (e, n, a) => {
  const t = ref(), {
    getZonedToUtc: s,
    getZonedDate: f,
    formatDate: y,
    getDefaultPattern: _,
    checkRangeEnabled: E,
    checkPartialRangeValue: T,
    isValidDate: U,
    setDateMonthOrYear: A,
    defaults: c
  } = Ee(n), M = ref(""), te = toRef(n, "format");
  watch(t, () => {
    e("internal-model-change", t.value);
  }), watch(te, () => {
    o();
  });
  const H = (v) => {
    const W = v || $();
    return n.modelType ? r(W) : {
      hours: getHours(W),
      minutes: getMinutes(W),
      seconds: n.enableSeconds ? getSeconds(W) : 0
    };
  }, z = (v) => n.modelType ? r(v) : { month: getMonth(v), year: getYear(v) }, B = (v) => Array.isArray(v) ? E(() => [
    setYear($(), v[0]),
    v[1] ? setYear($(), v[1]) : T()
  ]) : setYear($(), +v), w = (v, W) => (typeof v == "string" || typeof v == "number") && n.modelType ? g(v) : W, J = (v) => Array.isArray(v) ? [
    w(
      v[0],
      Fe(null, +v[0].hours, +v[0].minutes, v[0].seconds)
    ),
    w(
      v[1],
      Fe(null, +v[1].hours, +v[1].minutes, v[1].seconds)
    )
  ] : w(v, Fe(null, v.hours, v.minutes, v.seconds)), ee = (v) => Array.isArray(v) ? n.multiDates ? v.map((W) => w(W, A(null, +W.month, +W.year))) : E(() => [
    w(v[0], A(null, +v[0].month, +v[0].year)),
    w(
      v[1],
      v[1] ? A(null, +v[1].month, +v[1].year) : T()
    )
  ]) : w(v, A(null, +v.month, +v.year)), x = (v) => {
    if (Array.isArray(v))
      return v.map((W) => g(W));
    throw new Error(Ft.dateArr("multi-dates"));
  }, le = (v) => {
    if (Array.isArray(v))
      return [$(v[0]), $(v[1])];
    throw new Error(Ft.dateArr("week-picker"));
  }, de = (v) => n.modelAuto ? Array.isArray(v) ? [g(v[0]), g(v[1])] : n.autoApply ? [g(v)] : [g(v), null] : Array.isArray(v) ? E(() => [
    g(v[0]),
    v[1] ? g(v[1]) : T()
  ]) : g(v), C = () => {
    Array.isArray(t.value) && n.range && t.value.length === 1 && t.value.push(T());
  }, N = () => {
    const v = t.value;
    return [
      r(v[0]),
      v[1] ? r(v[1]) : T()
    ];
  }, G = () => t.value[1] ? N() : r(Me(t.value[0])), P = () => (t.value || []).map((v) => r(v)), Z = () => (C(), n.modelAuto ? G() : n.multiDates ? P() : Array.isArray(t.value) ? E(() => N()) : r(Me(t.value))), p = (v) => v ? n.timePicker ? J(Me(v)) : n.monthPicker ? ee(Me(v)) : n.yearPicker ? B(Me(v)) : n.multiDates ? x(Me(v)) : n.weekPicker ? le(Me(v)) : de(Me(v)) : null, q = (v) => {
    const W = p(v);
    U(Me(W)) ? (t.value = Me(W), o()) : (t.value = null, M.value = "");
  }, j = () => {
    var W;
    const v = (se) => {
      var Ne;
      return format(se, (Ne = c.value.textInputOptions) == null ? void 0 : Ne.format);
    };
    return `${v(t.value[0])} ${(W = c.value.textInputOptions) == null ? void 0 : W.rangeSeparator} ${t.value[1] ? v(t.value[1]) : ""}`;
  }, I = () => {
    var v;
    return a.value && t.value ? Array.isArray(t.value) ? j() : format(t.value, (v = c.value.textInputOptions) == null ? void 0 : v.format) : y(t.value);
  }, l = () => {
    var v;
    return t.value ? n.multiDates ? t.value.map((W) => y(W)).join("; ") : n.textInput && typeof ((v = c.value.textInputOptions) == null ? void 0 : v.format) == "string" ? I() : y(t.value) : "";
  }, o = () => {
    !n.format || typeof n.format == "string" ? M.value = l() : M.value = n.format(t.value);
  }, g = (v) => {
    if (n.utc) {
      const W = new Date(v);
      return n.utc === "preserve" ? new Date(W.getTime() + W.getTimezoneOffset() * 6e4) : W;
    }
    return n.modelType ? n.modelType === "date" || n.modelType === "timestamp" ? f(new Date(v)) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? parse(v, _(), /* @__PURE__ */ new Date()) : f(parse(v, n.modelType, /* @__PURE__ */ new Date())) : f(new Date(v));
  }, r = (v) => v ? n.utc ? ma(v, n.utc === "preserve") : n.modelType ? n.modelType === "timestamp" ? +s(v) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? y(s(v)) : y(s(v), n.modelType) : s(v) : "", k = (v) => {
    e("update:model-value", v);
  }, Y = (v) => Array.isArray(t.value) ? n.multiDates ? t.value.map((W) => v(W)) : [
    v(t.value[0]),
    t.value[1] ? v(t.value[1]) : T()
  ] : v(Me(t.value)), R = (v) => k(Me(Y(v)));
  return {
    inputValue: M,
    internalModelValue: t,
    checkBeforeEmit: () => t.value ? n.range ? n.partialRange ? t.value.length >= 1 : t.value.length === 2 : !!t.value : false,
    parseExternalModelValue: q,
    formatInputValue: o,
    emitModelValue: () => (o(), n.monthPicker ? R(z) : n.timePicker ? R(H) : n.yearPicker ? R(getYear) : n.weekPicker ? k(t.value) : k(Z()))
  };
};
var tr = (e, n) => {
  const { validateMonthYearInRange: a, validateMaxDate: t, validateMinDate: s, defaults: f } = Ee(e), y = (A, c) => {
    let M = A;
    return f.value.filters.months.includes(getMonth(M)) ? (M = c ? addMonths(A, 1) : subMonths(A, 1), y(M, c)) : M;
  }, _ = (A, c) => {
    let M = A;
    return f.value.filters.years.includes(getYear(M)) ? (M = c ? addYears(A, 1) : subYears(A, 1), _(M, c)) : M;
  }, E = (A) => {
    const c = set(/* @__PURE__ */ new Date(), { month: e.month, year: e.year });
    let M = A ? addMonths(c, 1) : subMonths(c, 1), te = getMonth(M), H = getYear(M);
    f.value.filters.months.includes(te) && (M = y(M, A), te = getMonth(M), H = getYear(M)), f.value.filters.years.includes(H) && (M = _(M, A), H = getYear(M)), a(te, H, A, e.preventMinMaxNavigation) && T(te, H);
  }, T = (A, c) => {
    n("update-month-year", { month: A, year: c });
  }, U = computed(() => (A) => {
    if (!e.preventMinMaxNavigation || A && !e.maxDate || !A && !e.minDate)
      return false;
    const c = set(/* @__PURE__ */ new Date(), { month: e.month, year: e.year }), M = A ? addMonths(c, 1) : subMonths(c, 1), te = [getMonth(M), getYear(M)];
    return A ? !t(...te) : !s(...te);
  });
  return { handleMonthYearChange: E, isDisabled: U, updateMonthYear: T };
};
var It = ((e) => (e.center = "center", e.left = "left", e.right = "right", e))(It || {});
var nr = (e, n, a, t) => {
  const s = ref({
    top: "0",
    left: "0",
    transform: "none"
  }), f = ref(false), y = toRef(t, "teleportCenter");
  watch(y, () => {
    H();
  });
  const _ = (C) => {
    if (t.teleport) {
      const N = C.getBoundingClientRect();
      return {
        left: N.left + window.scrollX,
        top: N.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, E = (C, N) => {
    s.value.left = `${C + N}px`, s.value.transform = "translateX(-100%)";
  }, T = (C) => {
    s.value.left = `${C}px`, s.value.transform = "translateX(0)";
  }, U = (C, N, G = false) => {
    t.position === It.left && T(C), t.position === It.right && E(C, N), t.position === It.center && (s.value.left = `${C + N / 2}px`, s.value.transform = G ? "translate(-50%, -50%)" : "translateX(-50%)");
  }, A = (C) => {
    const { width: N, height: G } = C.getBoundingClientRect(), { top: P, left: Z } = t.altPosition ? t.altPosition(C) : _(C);
    return { top: +P, left: +Z, width: N, height: G };
  }, c = () => {
    const C = $e(n);
    if (C) {
      const { top: N, left: G, width: P, height: Z } = A(C);
      s.value.top = `${N + Z / 2}px`, s.value.transform = "translateY(-50%)", U(G, P, true);
    }
  }, M = () => {
    s.value.left = "50%", s.value.top = "50%", s.value.transform = "translate(-50%, -50%)", s.value.position = "fixed";
  }, te = () => {
    const C = $e(n), { top: N, left: G, transform: P } = t.altPosition(C);
    s.value = { top: `${N}px`, left: `${G}px`, transform: P || "" };
  }, H = (C = true) => {
    if (!t.inline)
      return y.value ? M() : t.altPosition !== null ? te() : (C && a("recalculate-position"), x());
  }, z = ({
    inputEl: C,
    menuEl: N,
    left: G,
    width: P
  }) => {
    window.screen.width > 768 && U(G, P), J(C, N);
  }, B = (C, N) => {
    const { top: G, left: P, height: Z, width: p } = A(C);
    s.value.top = `${Z + G + +t.offset}px`, z({ inputEl: C, menuEl: N, left: P, width: p }), f.value = false;
  }, w = (C, N) => {
    const { top: G, left: P, width: Z } = A(C), { height: p } = N.getBoundingClientRect();
    s.value.top = `${G - p - +t.offset}px`, z({ inputEl: C, menuEl: N, left: P, width: Z }), f.value = true;
  }, J = (C, N) => {
    if (t.autoPosition) {
      const { left: G, width: P } = A(C), { left: Z, right: p } = N.getBoundingClientRect();
      return Z <= 0 || Z <= G ? T(G) : p >= document.documentElement.clientWidth ? E(G, P) : U(G, P);
    }
  }, ee = (C, N) => {
    const { height: G } = N.getBoundingClientRect(), { top: P, height: Z } = C.getBoundingClientRect(), q = window.innerHeight - P - Z, j = P;
    return G <= q ? B(C, N) : G > q && G <= j ? w(C, N) : q >= j ? B(C, N) : w(C, N);
  }, x = () => {
    const C = $e(n), N = $e(e);
    if (C && N)
      return t.autoPosition ? ee(C, N) : B(C, N);
  }, le = function(C) {
    if (C) {
      const N = C.scrollHeight > C.clientHeight, P = window.getComputedStyle(C).overflowY.indexOf("hidden") !== -1;
      return N && !P;
    }
    return true;
  }, de = function(C) {
    return !C || C === document.body || C.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : le(C) ? C : de(C.parentNode);
  };
  return { openOnTop: f, menuPosition: s, setMenuPosition: H, setInitialPosition: c, getScrollableParent: de };
};
var vt = [
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
];
var ar = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var rr = {
  all: () => vt,
  monthYear: () => vt.filter((e) => e.use.includes("month-year")),
  input: () => ar,
  timePicker: () => vt.filter((e) => e.use.includes("time")),
  action: () => vt.filter((e) => e.use.includes("action")),
  calendar: () => vt.filter((e) => e.use.includes("calendar")),
  menu: () => vt.filter((e) => e.use.includes("menu"))
};
var it = (e, n, a) => {
  const t = [];
  return rr[n]().forEach((s) => {
    e[s.name] && t.push(s.name);
  }), a && a.length && a.forEach((s) => {
    s.slot && t.push(s.slot);
  }), t;
};
var Ut = (e) => ({ transitionName: computed(() => (a) => e && typeof e != "boolean" ? a ? e.open : e.close : ""), showTransition: !!e });
var at = {
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
};
var lr = ["aria-label", "aria-disabled", "aria-readonly"];
var or = {
  key: 1,
  class: "dp__input_wrap"
};
var sr = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "onKeydown"];
var ir = {
  key: 2,
  class: "dp__input_icon"
};
var ur = {
  key: 4,
  class: "dp__clear_icon"
};
var dr = defineComponent({
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: false },
    inputValue: { type: String, default: "" },
    ...at
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
  setup(e, { expose: n, emit: a }) {
    const t = e, { getDefaultPattern: s, isValidDate: f, defaults: y, getDefaultStartTime: _, assignDefaultTime: E } = Ee(t), T = ref(), U = ref(null), A = ref(false), c = ref(false), M = computed(
      () => ({
        dp__pointer: !t.disabled && !t.readonly && !t.textInput,
        dp__disabled: t.disabled,
        dp__input_readonly: !t.textInput,
        dp__input: true,
        dp__input_icon_pad: !t.hideInputIcon,
        dp__input_valid: t.state,
        dp__input_invalid: t.state === false,
        dp__input_focus: A.value || t.isMenuOpen,
        dp__input_reg: !t.textInput,
        [t.inputClassName]: !!t.inputClassName
      })
    ), te = () => {
      a("set-input-date", null), t.autoApply && (a("set-empty-date"), T.value = null);
    }, H = (p) => {
      var j;
      const q = _();
      return va(
        p,
        ((j = y.value.textInputOptions) == null ? void 0 : j.format) || s(),
        q || E({}),
        t.inputValue,
        c.value
      );
    }, z = (p) => {
      const { rangeSeparator: q } = y.value.textInputOptions, [j, I] = p.split(`${q}`);
      if (j) {
        const l = H(j.trim()), o = I ? H(I.trim()) : null, g = l && o ? [l, o] : [l];
        T.value = l ? g : null;
      }
    }, B = () => {
      c.value = true;
    }, w = (p) => {
      if (t.range)
        z(p);
      else if (t.multiDates) {
        const q = p.split(";");
        T.value = q.map((j) => H(j.trim())).filter((j) => j);
      } else
        T.value = H(p);
    }, J = (p) => {
      var j;
      const { value: q } = p.target;
      q !== "" ? ((j = y.value.textInputOptions) != null && j.openMenu && !t.isMenuOpen && a("open"), w(q), a("set-input-date", T.value)) : te(), c.value = false, a("update:input-value", q);
    }, ee = () => {
      var p, q;
      (p = y.value.textInputOptions) != null && p.enterSubmit && f(T.value) && t.inputValue !== "" ? (a("set-input-date", T.value, true), T.value = null) : (q = y.value.textInputOptions) != null && q.enterSubmit && t.inputValue === "" && (T.value = null, a("clear"));
    }, x = () => {
      var p, q;
      (p = y.value.textInputOptions) != null && p.tabSubmit && f(T.value) && t.inputValue !== "" ? (a("set-input-date", T.value, true), T.value = null) : (q = y.value.textInputOptions) != null && q.tabSubmit && t.inputValue === "" && (T.value = null, a("clear"));
    }, le = () => {
      A.value = true, a("focus");
    }, de = (p) => {
      var q;
      p.preventDefault(), p.stopImmediatePropagation(), p.stopPropagation(), t.textInput && ((q = y.value.textInputOptions) != null && q.openMenu) && !t.inlineWithInput ? t.isMenuOpen ? y.value.textInputOptions.enterSubmit && a("select-date") : a("open") : t.textInput || a("toggle");
    }, C = () => {
      A.value = false, t.isMenuOpen || a("blur"), t.autoApply && t.textInput && T.value && (a("set-input-date", T.value), a("select-date"), T.value = null);
    }, N = () => {
      a("clear");
    }, G = (p) => {
      if (!t.textInput) {
        if (p.code === "Tab")
          return;
        p.preventDefault();
      }
    };
    return n({
      focusInput: () => {
        U.value && U.value.focus({ preventScroll: true });
      },
      setParsedDate: (p) => {
        T.value = p;
      }
    }), (p, q) => {
      var j;
      return openBlock(), createElementBlock("div", {
        onClick: de,
        "aria-label": (j = unref(y).ariaLabels) == null ? void 0 : j.input,
        role: "textbox",
        "aria-multiline": "false",
        "aria-disabled": p.disabled,
        "aria-readonly": p.readonly
      }, [
        p.$slots.trigger && !p.$slots["dp-input"] && !p.inline ? renderSlot(p.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !p.$slots.trigger && (!p.inline || p.inlineWithInput) ? (openBlock(), createElementBlock("div", or, [
          p.$slots["dp-input"] && !p.$slots.trigger && !p.inline ? renderSlot(p.$slots, "dp-input", {
            key: 0,
            value: e.inputValue,
            onInput: J,
            onEnter: ee,
            onTab: x,
            onClear: N,
            onBlur: C
          }) : createCommentVNode("", true),
          p.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            ref_key: "inputRef",
            ref: U,
            id: p.uid ? `dp-input-${p.uid}` : void 0,
            name: p.name,
            class: normalizeClass(unref(M)),
            inputmode: p.textInput ? "text" : "none",
            placeholder: p.placeholder,
            disabled: p.disabled,
            readonly: p.readonly,
            required: p.required,
            value: e.inputValue,
            autocomplete: p.autocomplete,
            onInput: J,
            onKeydown: [
              withKeys(de, ["enter"]),
              withKeys(x, ["tab"]),
              G
            ],
            onBlur: C,
            onFocus: le,
            onKeypress: G,
            onPaste: B
          }, null, 42, sr)),
          p.$slots["input-icon"] && !p.hideInputIcon ? (openBlock(), createElementBlock("span", ir, [
            renderSlot(p.$slots, "input-icon")
          ])) : createCommentVNode("", true),
          !p.$slots["input-icon"] && !p.hideInputIcon && !p.$slots["dp-input"] ? (openBlock(), createBlock(unref(Lt), {
            key: 3,
            class: "dp__input_icon dp__input_icons"
          })) : createCommentVNode("", true),
          p.$slots["clear-icon"] && e.inputValue && p.clearable && !p.disabled && !p.readonly ? (openBlock(), createElementBlock("span", ur, [
            renderSlot(p.$slots, "clear-icon", { clear: N })
          ])) : createCommentVNode("", true),
          p.clearable && !p.$slots["clear-icon"] && e.inputValue && !p.disabled && !p.readonly ? (openBlock(), createBlock(unref(fa), {
            key: 5,
            class: "dp__clear_icon dp__input_icons",
            "data-test": "clear-icon",
            onClick: withModifiers(N, ["stop", "prevent"])
          }, null, 8, ["onClick"])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ], 8, lr);
    };
  }
});
var cr = ["title"];
var fr = { class: "dp__action_buttons" };
var vr = ["onKeydown", "disabled"];
var mr = defineComponent({
  __name: "ActionRow",
  props: {
    menuMount: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    calendarWidth: { type: Number, default: 0 },
    ...at
  },
  emits: ["close-picker", "select-date", "invalid-select"],
  setup(e, { emit: n }) {
    const a = e, { formatDate: t, isValidTime: s, defaults: f } = Ee(a), { buildMatrix: y } = nt(), _ = ref(null), E = ref(null);
    onMounted(() => {
      a.arrowNavigation && y([$e(_), $e(E)], "actionRow");
    });
    const T = computed(() => a.range && !a.partialRange && a.internalModelValue ? a.internalModelValue.length === 2 : true), U = computed(() => !A.value || !c.value || !T.value), A = computed(() => !a.enableTimePicker || a.ignoreTimeValidation ? true : s(a.internalModelValue)), c = computed(() => a.monthPicker ? a.range && Array.isArray(a.internalModelValue) ? !a.internalModelValue.filter((J) => !z(J)).length : z(a.internalModelValue) : true), M = () => {
      const w = f.value.previewFormat;
      return a.timePicker || a.monthPicker, w(Me(a.internalModelValue));
    }, te = () => {
      const w = a.internalModelValue;
      return f.value.multiCalendars > 0 ? `${t(w[0])} - ${t(w[1])}` : [t(w[0]), t(w[1])];
    }, H = computed(() => !a.internalModelValue || !a.menuMount ? "" : typeof f.value.previewFormat == "string" ? Array.isArray(a.internalModelValue) ? a.internalModelValue.length === 2 && a.internalModelValue[1] ? te() : a.multiDates ? a.internalModelValue.map((w) => `${t(w)}`) : a.modelAuto ? `${t(a.internalModelValue[0])}` : `${t(a.internalModelValue[0])} -` : t(a.internalModelValue) : M()), z = (w) => {
      if (!a.monthPicker)
        return true;
      let J = true;
      const ee = $(pt(w));
      if (a.minDate && a.maxDate) {
        const x = $(pt(a.minDate)), le = $(pt(a.maxDate));
        return Be(ee, x) && _e(ee, le) || ve(ee, x) || ve(ee, le);
      }
      if (a.minDate) {
        const x = $(pt(a.minDate));
        J = Be(ee, x) || ve(ee, x);
      }
      if (a.maxDate) {
        const x = $(pt(a.maxDate));
        J = _e(ee, x) || ve(ee, x);
      }
      return J;
    }, B = () => {
      A.value && c.value && T.value ? n("select-date") : n("invalid-select");
    };
    return (w, J) => (openBlock(), createElementBlock("div", {
      class: "dp__action_row",
      style: normalizeStyle(e.calendarWidth ? { width: `${e.calendarWidth}px` } : {})
    }, [
      w.$slots["action-row"] ? renderSlot(w.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: e.internalModelValue,
        disabled: unref(U),
        selectDate: () => w.$emit("select-date"),
        closePicker: () => w.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        createBaseVNode("div", {
          class: "dp__selection_preview",
          title: Array.isArray(unref(H)) ? "" : unref(H)
        }, [
          w.$slots["action-preview"] ? renderSlot(w.$slots, "action-preview", {
            key: 0,
            value: e.internalModelValue
          }) : createCommentVNode("", true),
          w.$slots["action-preview"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            Array.isArray(unref(H)) ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(toDisplayString(unref(H)), 1)
            ], 64)),
            Array.isArray(unref(H)) ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(unref(H), (ee, x) => (openBlock(), createElementBlock("div", { key: x }, toDisplayString(ee), 1))), 128)) : createCommentVNode("", true)
          ], 64))
        ], 8, cr),
        createBaseVNode("div", fr, [
          w.$slots["action-select"] ? renderSlot(w.$slots, "action-select", {
            key: 0,
            value: e.internalModelValue
          }) : createCommentVNode("", true),
          w.$slots["action-select"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            w.inline ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
              key: 0,
              ref_key: "cancelButtonRef",
              ref: _,
              class: "dp__action_button dp__action_cancel",
              onClick: J[0] || (J[0] = (ee) => w.$emit("close-picker")),
              onKeydown: [
                J[1] || (J[1] = withKeys((ee) => w.$emit("close-picker"), ["enter"])),
                J[2] || (J[2] = withKeys((ee) => w.$emit("close-picker"), ["space"]))
              ]
            }, toDisplayString(w.cancelText), 545)),
            createBaseVNode("button", {
              class: "dp__action_button dp__action_select",
              onKeydown: [
                withKeys(B, ["enter"]),
                withKeys(B, ["space"])
              ],
              onClick: B,
              disabled: unref(U),
              "data-test": "select-button",
              ref_key: "selectButtonRef",
              ref: E
            }, toDisplayString(w.selectText), 41, vr)
          ], 64))
        ])
      ], 64))
    ], 4));
  }
});
var yr = ["aria-label"];
var gr = {
  class: "dp__calendar_header",
  role: "row"
};
var hr = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
};
var pr = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1);
var kr = ["aria-label"];
var wr = {
  key: 0,
  role: "gridcell",
  class: "dp__calendar_item dp__week_num"
};
var br = { class: "dp__cell_inner" };
var Dr = ["aria-selected", "aria-disabled", "aria-label", "data-test", "onClick", "onKeydown", "onMouseenter", "onMouseleave"];
var $r = defineComponent({
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
  setup(e, { expose: n, emit: a }) {
    const t = e, { buildMultiLevelMatrix: s } = nt(), { setDateMonthOrYear: f, defaults: y } = Ee(t), _ = ref(null), E = ref({
      bottom: "",
      left: "",
      transform: ""
    }), T = ref([]), U = ref(null), A = ref(true), c = ref(""), M = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), te = ref([]), H = ref({ left: "50%" }), z = computed(() => t.dayNames ? Array.isArray(t.dayNames) ? t.dayNames : t.dayNames(t.locale, +t.weekStart) : Ha(t.locale, +t.weekStart));
    onMounted(() => {
      a("mount", { cmp: "calendar", refs: T }), t.noSwipe || U.value && (U.value.addEventListener("touchstart", P, { passive: false }), U.value.addEventListener("touchend", Z, { passive: false }), U.value.addEventListener("touchmove", p, { passive: false })), t.monthChangeOnScroll && U.value && U.value.addEventListener("wheel", I, { passive: false });
    });
    const B = (l) => l ? t.vertical ? "vNext" : "next" : t.vertical ? "vPrevious" : "previous", w = (l, o) => {
      if (t.transitions) {
        const g = Ue(f($(), t.month, t.year));
        c.value = Be(Ue(f($(), l, o)), g) ? y.value.transitions[B(true)] : y.value.transitions[B(false)], A.value = false, nextTick(() => {
          A.value = true;
        });
      }
    }, J = computed(
      () => ({
        dp__calendar_wrap: true,
        [t.calendarClassName]: !!t.calendarClassName
      })
    ), ee = computed(() => (l) => {
      const o = Ka(l);
      return {
        dp__marker_dot: o.type === "dot",
        dp__marker_line: o.type === "line"
      };
    }), x = computed(() => (l) => ve(l, _.value)), le = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: y.value.multiCalendars > 0 && t.instance !== 0
    })), de = computed(() => (l) => t.hideOffsetDates ? l.current : true), C = computed(() => t.specificMode ? { height: `${t.modeHeight}px` } : void 0), N = async (l, o, g) => {
      var r, k;
      if (a("set-hover-date", l), (k = (r = l.marker) == null ? void 0 : r.tooltip) != null && k.length) {
        const Y = $e(T.value[o][g]);
        if (Y) {
          const { width: R, height: m } = Y.getBoundingClientRect();
          _.value = l.value;
          let b = { left: `${R / 2}px` }, v = -50;
          if (await nextTick(), te.value[0]) {
            const { left: W, width: se } = te.value[0].getBoundingClientRect();
            W < 0 && (b = { left: "0" }, v = 0, H.value.left = `${R / 2}px`), window.innerWidth < W + se && (b = { right: "0" }, v = 0, H.value.left = `${se - R / 2}px`);
          }
          E.value = {
            bottom: `${m}px`,
            ...b,
            transform: `translateX(${v}%)`
          }, a("tooltip-open", l.marker);
        }
      }
    }, G = (l) => {
      _.value && (_.value = null, E.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a("tooltip-close", l.marker));
    }, P = (l) => {
      M.value.startX = l.changedTouches[0].screenX, M.value.startY = l.changedTouches[0].screenY;
    }, Z = (l) => {
      M.value.endX = l.changedTouches[0].screenX, M.value.endY = l.changedTouches[0].screenY, q();
    }, p = (l) => {
      t.vertical && !t.inline && l.preventDefault();
    }, q = () => {
      const l = t.vertical ? "Y" : "X";
      Math.abs(M.value[`start${l}`] - M.value[`end${l}`]) > 10 && a("handle-swipe", M.value[`start${l}`] > M.value[`end${l}`] ? "right" : "left");
    }, j = (l, o, g) => {
      l && (Array.isArray(T.value[o]) ? T.value[o][g] = l : T.value[o] = [l]), t.arrowNavigation && s(T.value, "calendar");
    }, I = (l) => {
      t.monthChangeOnScroll && (l.preventDefault(), a("handle-scroll", l));
    };
    return n({ triggerTransition: w }), (l, o) => {
      var g;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(le))
      }, [
        createBaseVNode("div", {
          style: normalizeStyle(unref(C))
        }, [
          e.specificMode ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
            key: 0,
            ref_key: "calendarWrapRef",
            ref: U,
            class: normalizeClass(unref(J)),
            role: "grid",
            "aria-label": (g = unref(y).ariaLabels) == null ? void 0 : g.calendarWrap
          }, [
            createBaseVNode("div", gr, [
              l.weekNumbers ? (openBlock(), createElementBlock("div", hr, toDisplayString(l.weekNumName), 1)) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(z), (r, k) => (openBlock(), createElementBlock("div", {
                class: "dp__calendar_header_item",
                role: "gridcell",
                key: k,
                "data-test": "calendar-header"
              }, [
                l.$slots["calendar-header"] ? renderSlot(l.$slots, "calendar-header", {
                  key: 0,
                  day: r,
                  index: k
                }) : createCommentVNode("", true),
                l.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(r), 1)
                ], 64))
              ]))), 128))
            ]),
            pr,
            createVNode(Transition, {
              name: c.value,
              css: !!l.transitions
            }, {
              default: withCtx(() => {
                var r;
                return [
                  A.value ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "dp__calendar",
                    role: "grid",
                    "aria-label": (r = unref(y).ariaLabels) == null ? void 0 : r.calendarDays
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(e.mappedDates, (k, Y) => (openBlock(), createElementBlock("div", {
                      class: "dp__calendar_row",
                      role: "row",
                      key: Y
                    }, [
                      l.weekNumbers ? (openBlock(), createElementBlock("div", wr, [
                        createBaseVNode("div", br, toDisplayString(e.getWeekNum(k.days)), 1)
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(k.days, (R, m) => {
                        var b, v, W;
                        return openBlock(), createElementBlock("div", {
                          role: "gridcell",
                          class: "dp__calendar_item",
                          ref_for: true,
                          ref: (se) => j(se, Y, m),
                          key: m + Y,
                          "aria-selected": R.classData.dp__active_date || R.classData.dp__range_start || R.classData.dp__range_start,
                          "aria-disabled": R.classData.dp__cell_disabled,
                          "aria-label": (v = (b = unref(y).ariaLabels) == null ? void 0 : b.day) == null ? void 0 : v.call(b, R),
                          tabindex: "0",
                          "data-test": R.value,
                          onClick: withModifiers((se) => l.$emit("select-date", R), ["stop", "prevent"]),
                          onKeydown: [
                            withKeys((se) => l.$emit("select-date", R), ["enter"]),
                            withKeys((se) => l.$emit("handle-space", R), ["space"])
                          ],
                          onMouseenter: (se) => N(R, Y, m),
                          onMouseleave: (se) => G(R)
                        }, [
                          createBaseVNode("div", {
                            class: normalizeClass(["dp__cell_inner", R.classData])
                          }, [
                            l.$slots.day && unref(de)(R) ? renderSlot(l.$slots, "day", {
                              key: 0,
                              day: +R.text,
                              date: R.value
                            }) : createCommentVNode("", true),
                            l.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createTextVNode(toDisplayString(R.text), 1)
                            ], 64)),
                            R.marker && unref(de)(R) ? (openBlock(), createElementBlock("div", {
                              key: 2,
                              class: normalizeClass(unref(ee)(R.marker)),
                              style: normalizeStyle(R.marker.color ? { backgroundColor: R.marker.color } : {})
                            }, null, 6)) : createCommentVNode("", true),
                            unref(x)(R.value) ? (openBlock(), createElementBlock("div", {
                              key: 3,
                              class: "dp__marker_tooltip",
                              ref_for: true,
                              ref_key: "activeTooltip",
                              ref: te,
                              style: normalizeStyle(E.value)
                            }, [
                              (W = R.marker) != null && W.tooltip ? (openBlock(), createElementBlock("div", {
                                key: 0,
                                class: "dp__tooltip_content",
                                onClick: o[0] || (o[0] = withModifiers(() => {
                                }, ["stop"]))
                              }, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(R.marker.tooltip, (se, Ne) => (openBlock(), createElementBlock("div", {
                                  key: Ne,
                                  class: "dp__tooltip_text"
                                }, [
                                  l.$slots["marker-tooltip"] ? renderSlot(l.$slots, "marker-tooltip", {
                                    key: 0,
                                    tooltip: se,
                                    day: R.value
                                  }) : createCommentVNode("", true),
                                  l.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                    createBaseVNode("div", {
                                      class: "dp__tooltip_mark",
                                      style: normalizeStyle(se.color ? { backgroundColor: se.color } : {})
                                    }, null, 4),
                                    createBaseVNode("div", null, toDisplayString(se.text), 1)
                                  ], 64))
                                ]))), 128)),
                                createBaseVNode("div", {
                                  class: "dp__arrow_bottom_tp",
                                  style: normalizeStyle(H.value)
                                }, null, 4)
                              ])) : createCommentVNode("", true)
                            ], 4)) : createCommentVNode("", true)
                          ], 2)
                        ], 40, Dr);
                      }), 128))
                    ]))), 128))
                  ], 8, kr)) : createCommentVNode("", true)
                ];
              }),
              _: 3
            }, 8, ["name", "css"])
          ], 10, yr))
        ], 4)
      ], 2);
    };
  }
});
var Mr = ["aria-label", "aria-disabled"];
var rn = defineComponent({
  __name: "ActionIcon",
  props: {
    ariaLabel: { type: String, default: "" },
    disabled: { type: Boolean, default: false }
  },
  emits: ["activate", "set-ref"],
  setup(e, { emit: n }) {
    const a = ref(null);
    return onMounted(() => n("set-ref", a)), (t, s) => (openBlock(), createElementBlock("div", {
      class: "dp__month_year_col_nav",
      onClick: s[0] || (s[0] = (f) => t.$emit("activate")),
      onKeydown: [
        s[1] || (s[1] = withKeys((f) => t.$emit("activate"), ["enter"])),
        s[2] || (s[2] = withKeys((f) => t.$emit("activate"), ["space"]))
      ],
      tabindex: "0",
      role: "button",
      "aria-label": e.ariaLabel,
      "aria-disabled": e.disabled,
      ref_key: "elRef",
      ref: a
    }, [
      createBaseVNode("div", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: e.disabled }])
      }, [
        renderSlot(t.$slots, "default")
      ], 2)
    ], 40, Mr));
  }
});
var Tr = ["onKeydown"];
var Ar = { class: "dp__selection_grid_header" };
var Sr = ["aria-selected", "aria-disabled", "data-test", "onClick", "onKeydown", "onMouseover"];
var Cr = ["aria-label", "onKeydown"];
var Dt = defineComponent({
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
  setup(e, { expose: n, emit: a }) {
    const t = e, { setSelectionGrid: s, buildMultiLevelMatrix: f, setMonthPicker: y } = nt(), { hideNavigationButtons: _ } = Ee(t), E = ref(false), T = ref(null), U = ref(null), A = ref([]), c = ref(), M = ref(null), te = ref(0), H = ref(null);
    onBeforeUpdate(() => {
      T.value = null;
    }), onMounted(() => {
      nextTick().then(() => N()), B(), z(true);
    }), onUnmounted(() => z(false));
    const z = (I) => {
      var l;
      t.arrowNavigation && ((l = t.headerRefs) != null && l.length ? y(I) : s(I));
    }, B = () => {
      const I = $e(U);
      I && (t.textInput || I.focus({ preventScroll: true }), E.value = I.clientHeight < I.scrollHeight);
    }, w = computed(
      () => ({
        dp__overlay: true
      })
    ), J = computed(() => ({
      dp__overlay_col: true
    })), ee = (I) => t.skipActive ? false : I.value === t.modelValue, x = computed(() => t.items.map((I) => I.filter((l) => l).map((l) => {
      var r, k, Y;
      const o = t.disabledValues.some((R) => R === l.value) || C(l.value), g = (r = t.multiModelValue) != null && r.length ? (k = t.multiModelValue) == null ? void 0 : k.some(
        (R) => ve(
          R,
          setYear(
            t.monthPicker ? setMonth(/* @__PURE__ */ new Date(), l.value) : /* @__PURE__ */ new Date(),
            t.monthPicker ? t.year : l.value
          )
        )
      ) : ee(l);
      return {
        ...l,
        className: {
          dp__overlay_cell_active: g,
          dp__overlay_cell: !g,
          dp__overlay_cell_disabled: o,
          dp__overlay_cell_active_disabled: o && g,
          dp__overlay_cell_pad: true,
          dp__cell_in_between: (Y = t.multiModelValue) != null && Y.length && t.skipActive ? P(l.value) : false
        }
      };
    }))), le = computed(
      () => ({
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: E.value,
        dp__button_bottom: t.autoApply
      })
    ), de = computed(() => {
      var I, l;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((I = t.items) == null ? void 0 : I.length) <= 6,
        dp__container_block: ((l = t.items) == null ? void 0 : l.length) > 6
      };
    }), C = (I) => {
      const l = t.maxValue || t.maxValue === 0, o = t.minValue || t.minValue === 0;
      return !l && !o ? false : l && o ? +I > +t.maxValue || +I < +t.minValue : l ? +I > +t.maxValue : o ? +I < +t.minValue : false;
    }, N = () => {
      const I = $e(T), l = $e(U), o = $e(M), g = $e(H), r = o ? o.getBoundingClientRect().height : 0;
      l && (te.value = l.getBoundingClientRect().height - r), I && g && (g.scrollTop = I.offsetTop - g.offsetTop - (te.value / 2 - I.getBoundingClientRect().height) - r);
    }, G = (I) => {
      !t.disabledValues.some((l) => l === I) && !C(I) && (a("update:model-value", I), a("selected"));
    }, P = (I) => {
      const l = t.monthPicker ? t.year : I;
      return xn(
        t.multiModelValue,
        setYear(
          t.monthPicker ? setMonth(/* @__PURE__ */ new Date(), c.value || 0) : /* @__PURE__ */ new Date(),
          t.monthPicker ? l : c.value || l
        ),
        setYear(t.monthPicker ? setMonth(/* @__PURE__ */ new Date(), I) : /* @__PURE__ */ new Date(), l)
      );
    }, Z = () => {
      a("toggle"), a("reset-flow");
    }, p = () => {
      t.escClose && Z();
    }, q = (I, l, o, g) => {
      I && (l.value === +t.modelValue && !t.disabledValues.includes(l.value) && (T.value = I), t.arrowNavigation && (Array.isArray(A.value[o]) ? A.value[o][g] = I : A.value[o] = [I], j()));
    }, j = () => {
      var l, o;
      const I = (l = t.headerRefs) != null && l.length ? [t.headerRefs].concat(A.value) : A.value.concat([t.skipButtonRef ? [] : [M.value]]);
      f(Me(I), (o = t.headerRefs) != null && o.length ? "monthPicker" : "selectionGrid");
    };
    return n({ focusGrid: B }), (I, l) => {
      var o;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: U,
        class: normalizeClass(unref(w)),
        role: "dialog",
        tabindex: "0",
        onKeydown: withKeys(p, ["esc"])
      }, [
        createBaseVNode("div", {
          class: normalizeClass(unref(de)),
          ref_key: "containerRef",
          ref: H,
          role: "grid",
          style: normalizeStyle({ height: `${te.value}px` })
        }, [
          createBaseVNode("div", Ar, [
            renderSlot(I.$slots, "header")
          ]),
          I.$slots.overlay ? renderSlot(I.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(unref(x), (g, r) => (openBlock(), createElementBlock("div", {
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: unref(x).length >= 3 }]),
            key: r,
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(g, (k, Y) => (openBlock(), createElementBlock("div", {
              role: "gridcell",
              class: normalizeClass(unref(J)),
              key: k.value,
              "aria-selected": k.value === e.modelValue && !e.disabledValues.includes(k.value),
              "aria-disabled": k.className.dp__overlay_cell_disabled,
              ref_for: true,
              ref: (R) => q(R, k, r, Y),
              tabindex: "0",
              "data-test": k.text,
              onClick: (R) => G(k.value),
              onKeydown: [
                withKeys((R) => G(k.value), ["enter"]),
                withKeys((R) => G(k.value), ["space"])
              ],
              onMouseover: (R) => c.value = k.value
            }, [
              createBaseVNode("div", {
                class: normalizeClass(k.className)
              }, [
                I.$slots.item ? renderSlot(I.$slots, "item", {
                  key: 0,
                  item: k
                }) : createCommentVNode("", true),
                I.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(k.text), 1)
                ], 64))
              ], 2)
            ], 42, Sr))), 128))
          ], 2))), 128))
        ], 6),
        I.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("div", {
          key: 0,
          role: "button",
          "aria-label": (o = e.ariaLabels) == null ? void 0 : o.toggleOverlay,
          class: normalizeClass(unref(le)),
          tabindex: "0",
          ref_key: "toggleButton",
          ref: M,
          onClick: Z,
          onKeydown: withKeys(Z, ["enter"])
        }, [
          renderSlot(I.$slots, "button-icon")
        ], 42, Cr)), [
          [vShow, !unref(_)(e.type)]
        ]) : createCommentVNode("", true)
      ], 42, Tr);
    };
  }
});
var Pr = ["aria-label"];
var Bn = defineComponent({
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
  setup(e, { emit: n }) {
    const a = e, { transitionName: t, showTransition: s } = Ut(a.transitions), f = ref(null);
    return onMounted(() => n("set-ref", f)), (y, _) => (openBlock(), createElementBlock(Fragment, null, [
      createBaseVNode("div", {
        class: "dp__month_year_select",
        onClick: _[0] || (_[0] = (E) => y.$emit("toggle")),
        onKeydown: [
          _[1] || (_[1] = withKeys((E) => y.$emit("toggle"), ["enter"])),
          _[2] || (_[2] = withKeys((E) => y.$emit("toggle"), ["space"]))
        ],
        role: "button",
        "aria-label": e.ariaLabel,
        tabindex: "0",
        ref_key: "elRef",
        ref: f
      }, [
        renderSlot(y.$slots, "default")
      ], 40, Pr),
      createVNode(Transition, {
        name: unref(t)(e.showSelectionGrid),
        css: unref(s)
      }, {
        default: withCtx(() => [
          e.showSelectionGrid ? (openBlock(), createBlock(Dt, mergeProps({ key: 0 }, {
            modelValue: e.modelValue,
            items: e.items,
            disabledValues: e.disabledValues,
            minValue: e.minValue,
            maxValue: e.maxValue,
            escClose: e.escClose,
            type: e.type,
            arrowNavigation: e.arrowNavigation,
            textInput: e.textInput,
            autoApply: e.autoApply,
            ariaLabels: e.ariaLabels,
            hideNavigation: e.hideNavigation
          }, {
            "header-refs": [],
            "onUpdate:modelValue": _[3] || (_[3] = (E) => y.$emit("update:model-value", E)),
            onToggle: _[4] || (_[4] = (E) => y.$emit("toggle"))
          }), createSlots({
            "button-icon": withCtx(() => [
              y.$slots["calendar-icon"] ? renderSlot(y.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
              y.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Lt), { key: 1 }))
            ]),
            _: 2
          }, [
            y.$slots[e.slotName] ? {
              name: "item",
              fn: withCtx(({ item: E }) => [
                renderSlot(y.$slots, e.slotName, { item: E })
              ]),
              key: "0"
            } : void 0,
            y.$slots[e.overlaySlot] ? {
              name: "overlay",
              fn: withCtx(() => [
                renderSlot(y.$slots, e.overlaySlot)
              ]),
              key: "1"
            } : void 0,
            y.$slots[`${e.overlaySlot}-header`] ? {
              name: "header",
              fn: withCtx(() => [
                renderSlot(y.$slots, `${e.overlaySlot}-header`)
              ]),
              key: "2"
            } : void 0
          ]), 1040)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["name", "css"])
    ], 64));
  }
});
var _r = { class: "dp__month_year_row" };
var Nr = { class: "dp__month_year_wrap" };
var Rr = { class: "dp__month_picker_header" };
var Or = ["aria-label"];
var Ir = ["aria-label"];
var Br = ["aria-label"];
var Yr = defineComponent({
  __name: "MonthYearPicker",
  props: {
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    instance: { type: Number, default: 0 },
    years: { type: Array, default: () => [] },
    months: { type: Array, default: () => [] },
    internalModelValue: { type: [Date, Array], default: null },
    ...at
  },
  emits: ["update-month-year", "month-year-select", "mount", "reset-flow", "overlay-closed"],
  setup(e, { expose: n, emit: a }) {
    const t = e, { defaults: s } = Ee(t), { transitionName: f, showTransition: y } = Ut(s.value.transitions), { buildMatrix: _ } = nt(), { handleMonthYearChange: E, isDisabled: T, updateMonthYear: U } = tr(t, a), A = ref(false), c = ref(false), M = ref([null, null, null, null]), te = ref(null), H = ref(null), z = ref(null);
    onMounted(() => {
      a("mount");
    });
    const B = (m) => ({
      get: () => t[m],
      set: (b) => {
        const v = m === "month" ? "year" : "month";
        a("update-month-year", { [m]: b, [v]: t[v] }), a("month-year-select", m === "year"), m === "month" ? g(true) : r(true);
      }
    }), w = computed(B("month")), J = computed(B("year")), ee = (m) => {
      const b = getYear($(m));
      return t.year === b;
    }, x = computed(() => t.monthPicker ? Array.isArray(t.disabledDates) ? t.disabledDates.map((m) => $(m)).filter((m) => ee(m)).map((m) => getMonth(m)) : [] : []), le = computed(() => (m) => {
      const b = m === "month";
      return {
        showSelectionGrid: (b ? A : c).value,
        items: (b ? j : I).value,
        disabledValues: s.value.filters[b ? "months" : "years"].concat(x.value),
        minValue: (b ? G : C).value,
        maxValue: (b ? P : N).value,
        headerRefs: b && t.monthPicker ? [te.value, H.value, z.value] : [],
        escClose: t.escClose,
        transitions: s.value.transitions,
        ariaLabels: s.value.ariaLabels,
        textInput: t.textInput,
        autoApply: t.autoApply,
        arrowNavigation: t.arrowNavigation,
        hideNavigation: t.hideNavigation
      };
    }), de = computed(() => (m) => ({
      month: t.month,
      year: t.year,
      items: m === "month" ? t.months : t.years,
      instance: t.instance,
      updateMonthYear: U,
      toggle: m === "month" ? g : r
    })), C = computed(() => t.minDate ? getYear($(t.minDate)) : null), N = computed(() => t.maxDate ? getYear($(t.maxDate)) : null), G = computed(() => {
      if (t.minDate && C.value) {
        if (C.value > t.year)
          return 12;
        if (C.value === t.year)
          return getMonth($(t.minDate));
      }
      return null;
    }), P = computed(() => t.maxDate && N.value ? N.value < t.year ? -1 : N.value === t.year ? getMonth($(t.maxDate)) : null : null), Z = computed(() => (t.range || t.multiDates) && t.internalModelValue && (t.monthPicker || t.yearPicker) ? t.internalModelValue : []), p = (m) => {
      const b = [], v = (W) => W;
      for (let W = 0; W < m.length; W += 3) {
        const se = [m[W], m[W + 1], m[W + 2]];
        b.push(v(se));
      }
      return b;
    }, q = computed(() => {
      const m = t.months.find((b) => b.value === t.month);
      return m || { text: "", value: 0 };
    }), j = computed(() => p(t.months)), I = computed(() => p(t.years)), l = computed(() => s.value.multiCalendars ? t.multiCalendarsSolo ? true : t.instance === 0 : true), o = computed(() => s.value.multiCalendars ? t.multiCalendarsSolo ? true : t.instance === s.value.multiCalendars - 1 : true), g = (m = false) => {
      k(m), A.value = !A.value, A.value || a("overlay-closed");
    }, r = (m = false) => {
      k(m), c.value = !c.value, c.value || a("overlay-closed");
    }, k = (m) => {
      m || a("reset-flow");
    }, Y = (m = false) => {
      T.value(m) || a("update-month-year", {
        year: m ? t.year + 1 : t.year - 1,
        month: t.month,
        fromNav: true
      });
    }, R = (m, b) => {
      t.arrowNavigation && (M.value[b] = $e(m), _(M.value, "monthYear"));
    };
    return n({
      toggleMonthPicker: g,
      toggleYearPicker: r,
      handleMonthYearChange: E
    }), (m, b) => {
      var v, W, se, Ne, Xe;
      return openBlock(), createElementBlock("div", _r, [
        m.$slots["month-year"] ? renderSlot(m.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, { month: e.month, year: e.year, months: e.months, years: e.years, updateMonthYear: unref(U), handleMonthYearChange: unref(E), instance: e.instance }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          !m.monthPicker && !m.yearPicker ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            unref(l) && !m.vertical ? (openBlock(), createBlock(rn, {
              key: 0,
              "aria-label": (v = unref(s).ariaLabels) == null ? void 0 : v.prevMonth,
              disabled: unref(T)(false),
              onActivate: b[0] || (b[0] = (re) => unref(E)(false)),
              onSetRef: b[1] || (b[1] = (re) => R(re, 0))
            }, {
              default: withCtx(() => [
                m.$slots["arrow-left"] ? renderSlot(m.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                m.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(wn), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
            createBaseVNode("div", Nr, [
              createVNode(Bn, mergeProps({
                type: "month",
                "slot-name": "month-overlay-val",
                "overlay-slot": "overlay-month",
                "aria-label": (W = unref(s).ariaLabels) == null ? void 0 : W.openMonthsOverlay,
                modelValue: unref(w),
                "onUpdate:modelValue": b[2] || (b[2] = (re) => isRef(w) ? w.value = re : null)
              }, unref(le)("month"), {
                onToggle: g,
                onSetRef: b[3] || (b[3] = (re) => R(re, 1))
              }), createSlots({
                default: withCtx(() => [
                  m.$slots.month ? renderSlot(m.$slots, "month", normalizeProps(mergeProps({ key: 0 }, unref(q)))) : createCommentVNode("", true),
                  m.$slots.month ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(unref(q).text), 1)
                  ], 64))
                ]),
                _: 2
              }, [
                m.$slots["calendar-icon"] ? {
                  name: "calendar-icon",
                  fn: withCtx(() => [
                    renderSlot(m.$slots, "calendar-icon")
                  ]),
                  key: "0"
                } : void 0,
                m.$slots["month-overlay-value"] ? {
                  name: "month-overlay-val",
                  fn: withCtx(({ item: re }) => [
                    renderSlot(m.$slots, "month-overlay-value", {
                      text: re.text,
                      value: re.value
                    })
                  ]),
                  key: "1"
                } : void 0,
                m.$slots["month-overlay"] ? {
                  name: "overlay-month",
                  fn: withCtx(() => [
                    renderSlot(m.$slots, "month-overlay", normalizeProps(guardReactiveProps(unref(de)("month"))))
                  ]),
                  key: "2"
                } : void 0,
                m.$slots["month-overlay-header"] ? {
                  name: "overlay-month-header",
                  fn: withCtx(() => [
                    renderSlot(m.$slots, "month-overlay-header", { toggle: g })
                  ]),
                  key: "3"
                } : void 0
              ]), 1040, ["aria-label", "modelValue"]),
              createVNode(Bn, mergeProps({
                type: "year",
                "slot-name": "year-overlay-val",
                "overlay-slot": "overlay-year",
                "aria-label": (se = unref(s).ariaLabels) == null ? void 0 : se.openYearsOverlay,
                modelValue: unref(J),
                "onUpdate:modelValue": b[4] || (b[4] = (re) => isRef(J) ? J.value = re : null)
              }, unref(le)("year"), {
                onToggle: r,
                onSetRef: b[5] || (b[5] = (re) => R(re, 2))
              }), createSlots({
                default: withCtx(() => [
                  m.$slots.year ? renderSlot(m.$slots, "year", {
                    key: 0,
                    year: e.year
                  }) : createCommentVNode("", true),
                  m.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(e.year), 1)
                  ], 64))
                ]),
                _: 2
              }, [
                m.$slots["calendar-icon"] ? {
                  name: "calendar-icon",
                  fn: withCtx(() => [
                    renderSlot(m.$slots, "calendar-icon")
                  ]),
                  key: "0"
                } : void 0,
                m.$slots["year-overlay-value"] ? {
                  name: "year-overlay-val",
                  fn: withCtx(({ item: re }) => [
                    renderSlot(m.$slots, "year-overlay-value", {
                      text: re.text,
                      value: re.value
                    })
                  ]),
                  key: "1"
                } : void 0,
                m.$slots["year-overlay"] ? {
                  name: "overlay-year",
                  fn: withCtx(() => [
                    renderSlot(m.$slots, "year-overlay", normalizeProps(guardReactiveProps(unref(de)("year"))))
                  ]),
                  key: "2"
                } : void 0,
                m.$slots["year-overlay-header"] ? {
                  name: "overlay-year-header",
                  fn: withCtx(() => [
                    renderSlot(m.$slots, "year-overlay-header", { toggle: r })
                  ]),
                  key: "3"
                } : void 0
              ]), 1040, ["aria-label", "modelValue"])
            ]),
            unref(l) && m.vertical ? (openBlock(), createBlock(rn, {
              key: 1,
              "aria-label": (Ne = unref(s).ariaLabels) == null ? void 0 : Ne.prevMonth,
              disabled: unref(T)(false),
              onActivate: b[6] || (b[6] = (re) => unref(E)(false))
            }, {
              default: withCtx(() => [
                m.$slots["arrow-up"] ? renderSlot(m.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                m.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wn), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
            unref(o) ? (openBlock(), createBlock(rn, {
              key: 2,
              ref: "rightIcon",
              disabled: unref(T)(true),
              "aria-label": (Xe = unref(s).ariaLabels) == null ? void 0 : Xe.nextMonth,
              onActivate: b[7] || (b[7] = (re) => unref(E)(true)),
              onSetRef: b[8] || (b[8] = (re) => R(re, 3))
            }, {
              default: withCtx(() => [
                m.$slots[m.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(m.$slots, m.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
                m.$slots[m.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(m.vertical ? unref(zn) : unref(bn)), { key: 1 }))
              ]),
              _: 3
            }, 8, ["disabled", "aria-label"])) : createCommentVNode("", true)
          ], 64)) : createCommentVNode("", true),
          m.monthPicker ? (openBlock(), createBlock(Dt, mergeProps({ key: 1 }, unref(le)("month"), {
            "skip-active": m.range,
            year: e.year,
            "multi-model-value": unref(Z),
            "month-picker": "",
            modelValue: unref(w),
            "onUpdate:modelValue": b[17] || (b[17] = (re) => isRef(w) ? w.value = re : null),
            onToggle: g,
            onSelected: b[18] || (b[18] = (re) => m.$emit("overlay-closed"))
          }), createSlots({
            header: withCtx(() => {
              var re, qe, xe;
              return [
                createBaseVNode("div", Rr, [
                  createBaseVNode("div", {
                    class: "dp__month_year_col_nav",
                    tabindex: "0",
                    ref_key: "mpPrevIconRef",
                    ref: te,
                    onClick: b[9] || (b[9] = (Re) => Y(false)),
                    onKeydown: b[10] || (b[10] = withKeys((Re) => Y(false), ["enter"]))
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: unref(T)(false) }]),
                      role: "button",
                      "aria-label": (re = unref(s).ariaLabels) == null ? void 0 : re.prevMonth
                    }, [
                      m.$slots["arrow-left"] ? renderSlot(m.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                      m.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(wn), { key: 1 }))
                    ], 10, Or)
                  ], 544),
                  createBaseVNode("div", {
                    class: "dp__pointer",
                    role: "button",
                    ref_key: "mpYearButtonRef",
                    ref: H,
                    "aria-label": (qe = unref(s).ariaLabels) == null ? void 0 : qe.openYearsOverlay,
                    tabindex: "0",
                    onClick: b[11] || (b[11] = () => r(false)),
                    onKeydown: b[12] || (b[12] = withKeys(() => r(false), ["enter"]))
                  }, [
                    m.$slots.year ? renderSlot(m.$slots, "year", {
                      key: 0,
                      year: e.year
                    }) : createCommentVNode("", true),
                    m.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      createTextVNode(toDisplayString(e.year), 1)
                    ], 64))
                  ], 40, Ir),
                  createBaseVNode("div", {
                    class: "dp__month_year_col_nav",
                    tabindex: "0",
                    ref_key: "mpNextIconRef",
                    ref: z,
                    onClick: b[13] || (b[13] = (Re) => Y(true)),
                    onKeydown: b[14] || (b[14] = withKeys((Re) => Y(true), ["enter"]))
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: unref(T)(true) }]),
                      role: "button",
                      "aria-label": (xe = unref(s).ariaLabels) == null ? void 0 : xe.nextMonth
                    }, [
                      m.$slots["arrow-right"] ? renderSlot(m.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
                      m.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(bn), { key: 1 }))
                    ], 10, Br)
                  ], 544)
                ]),
                createVNode(Transition, {
                  name: unref(f)(c.value),
                  css: unref(y)
                }, {
                  default: withCtx(() => [
                    c.value ? (openBlock(), createBlock(Dt, mergeProps({ key: 0 }, unref(le)("year"), {
                      modelValue: unref(J),
                      "onUpdate:modelValue": b[15] || (b[15] = (Re) => isRef(J) ? J.value = Re : null),
                      onToggle: r,
                      onSelected: b[16] || (b[16] = (Re) => m.$emit("overlay-closed"))
                    }), createSlots({
                      "button-icon": withCtx(() => [
                        m.$slots["calendar-icon"] ? renderSlot(m.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        m.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Lt), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      m.$slots["year-overlay-value"] ? {
                        name: "item",
                        fn: withCtx(({ item: Re }) => [
                          renderSlot(m.$slots, "year-overlay-value", {
                            text: Re.text,
                            value: Re.value
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
            m.$slots["month-overlay-value"] ? {
              name: "item",
              fn: withCtx(({ item: re }) => [
                renderSlot(m.$slots, "month-overlay-value", {
                  text: re.text,
                  value: re.value
                })
              ]),
              key: "0"
            } : void 0
          ]), 1040, ["skip-active", "year", "multi-model-value", "modelValue"])) : createCommentVNode("", true),
          m.yearPicker ? (openBlock(), createBlock(Dt, mergeProps({ key: 2 }, unref(le)("year"), {
            modelValue: unref(J),
            "onUpdate:modelValue": b[19] || (b[19] = (re) => isRef(J) ? J.value = re : null),
            "multi-model-value": unref(Z),
            "skip-active": m.range,
            "skip-button-ref": "",
            "year-picker": "",
            onToggle: r,
            onSelected: b[20] || (b[20] = (re) => m.$emit("overlay-closed"))
          }), createSlots({ _: 2 }, [
            m.$slots["year-overlay-value"] ? {
              name: "item",
              fn: withCtx(({ item: re }) => [
                renderSlot(m.$slots, "year-overlay-value", {
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
});
var Vr = {
  key: 0,
  class: "dp__time_input"
};
var Er = ["aria-label", "onKeydown", "onClick"];
var Fr = ["aria-label", "data-test", "onKeydown", "onClick"];
var Lr = ["aria-label", "onKeydown", "onClick"];
var Ur = { key: 0 };
var Hr = ["aria-label", "onKeydown"];
var Wr = defineComponent({
  __name: "TimeInput",
  props: {
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 },
    seconds: { type: Number, default: 0 },
    closeTimePickerBtn: { type: Object, default: null },
    order: { type: Number, default: 0 },
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
    "overlay-closed"
  ],
  setup(e, { expose: n, emit: a }) {
    const t = e, { setTimePickerElements: s, setTimePickerBackRef: f } = nt(), { defaults: y } = Ee(t), { transitionName: _, showTransition: E } = Ut(y.value.transitions), T = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), U = ref("AM"), A = ref(null), c = ref([]);
    onMounted(() => {
      a("mounted");
    });
    const M = computed(() => (l) => !!(t.maxTime && t.maxTime[l] && +t.maxTime[l] < +t[l] + +t[`${l}Increment`])), te = computed(() => (l) => !!(t.minTime && t.minTime[l] && +t.minTime[l] > +t[l] - +t[`${l}Increment`])), H = (l, o) => add(set($(), l), o), z = (l, o) => sub(set($(), l), o), B = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_reg: !t.enableSeconds && t.is24,
        dp__time_col_reg_with_button: !t.enableSeconds && !t.is24,
        dp__time_col_sec: t.enableSeconds && t.is24,
        dp__time_col_sec_with_button: t.enableSeconds && !t.is24
      })
    ), w = computed(() => {
      const l = [{ type: "hours" }, { type: "", separator: true }, { type: "minutes" }];
      return t.enableSeconds ? l.concat([{ type: "", separator: true }, { type: "seconds" }]) : l;
    }), J = computed(() => w.value.filter((l) => !l.separator)), ee = computed(() => (l) => {
      if (l === "hours") {
        const o = Z(+t.hours);
        return { text: o < 10 ? `0${o}` : `${o}`, value: o };
      }
      return { text: t[l] < 10 ? `0${t[l]}` : `${t[l]}`, value: t[l] };
    }), x = (l) => {
      const o = t.is24 ? 24 : 12, g = l === "hours" ? o : 60, r = +t[`${l}GridIncrement`], k = l === "hours" && !t.is24 ? r : 0, Y = [];
      for (let R = k; R < g; R += r)
        Y.push({ value: R, text: R < 10 ? `0${R}` : `${R}` });
      return l === "hours" && !t.is24 && Y.push({ value: 0, text: "12" }), Ua(Y);
    }, le = (l, o) => {
      const g = t.minTime && t.minTime[o], r = t.maxTime && t.maxTime[o];
      return g && r ? l < +g || l > +r : g ? l < +g : r ? l > +r : false;
    }, de = computed(() => (l) => x(l).flat().filter((g) => g).map((g) => g.value).filter((g) => le(g, l))), C = (l) => t[`no${l[0].toUpperCase() + l.slice(1)}Overlay`], N = (l) => {
      C(l) || (T[l] = !T[l], T[l] || a("overlay-closed"));
    }, G = (l) => l === "hours" ? getHours : l === "minutes" ? getMinutes : getSeconds, P = (l, o = true) => {
      const g = o ? H : z;
      (o ? M.value(l) : te.value(l)) || a(
        `update:${l}`,
        G(l)(g({ [l]: +t[l] }, { [l]: +t[`${l}Increment`] }))
      );
    }, Z = (l) => t.is24 ? l : (l >= 12 ? U.value = "PM" : U.value = "AM", xa(l)), p = () => {
      U.value === "PM" ? (U.value = "AM", a("update:hours", t.hours - 12)) : (U.value = "PM", a("update:hours", t.hours + 12));
    }, q = (l) => {
      T[l] = true;
    }, j = (l, o, g) => {
      if (l && t.arrowNavigation) {
        Array.isArray(c.value[o]) ? c.value[o][g] = l : c.value[o] = [l];
        const r = c.value.reduce(
          (k, Y) => Y.map((R, m) => [...k[m] || [], Y[m]]),
          []
        );
        f(t.closeTimePickerBtn), A.value && (r[1] = r[1].concat(A.value)), s(r, t.order);
      }
    }, I = (l, o) => l === "hours" && !t.is24 ? a(`update:${l}`, U.value === "PM" ? o + 12 : o) : a(`update:${l}`, o);
    return n({ openChildCmp: q }), (l, o) => {
      var g;
      return l.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Vr, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(w), (r, k) => {
          var Y, R, m;
          return openBlock(), createElementBlock("div", {
            key: k,
            class: normalizeClass(unref(B))
          }, [
            r.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(" : ")
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("div", {
                class: normalizeClass({
                  dp__inc_dec_button: true,
                  dp__inc_dec_button_disabled: unref(M)(r.type)
                }),
                role: "button",
                "data-test": "time-inc-btn",
                "aria-label": (Y = unref(y).ariaLabels) == null ? void 0 : Y.incrementValue(r.type),
                tabindex: "0",
                onKeydown: [
                  withKeys((b) => P(r.type), ["enter"]),
                  withKeys((b) => P(r.type), ["space"])
                ],
                onClick: (b) => P(r.type),
                ref_for: true,
                ref: (b) => j(b, k, 0)
              }, [
                l.$slots["arrow-up"] ? renderSlot(l.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                l.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wn), { key: 1 }))
              ], 42, Er),
              createBaseVNode("div", {
                role: "button",
                "aria-label": (R = unref(y).ariaLabels) == null ? void 0 : R.openTpOverlay(r.type),
                class: normalizeClass(C(r.type) ? "" : "dp__time_display"),
                tabindex: "0",
                "data-test": `${r.type}-toggle-overlay-btn`,
                onKeydown: [
                  withKeys((b) => N(r.type), ["enter"]),
                  withKeys((b) => N(r.type), ["space"])
                ],
                onClick: (b) => N(r.type),
                ref_for: true,
                ref: (b) => j(b, k, 1)
              }, [
                l.$slots[r.type] ? renderSlot(l.$slots, r.type, {
                  key: 0,
                  text: unref(ee)(r.type).text,
                  value: unref(ee)(r.type).value
                }) : createCommentVNode("", true),
                l.$slots[r.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(unref(ee)(r.type).text), 1)
                ], 64))
              ], 42, Fr),
              createBaseVNode("div", {
                class: normalizeClass({
                  dp__inc_dec_button: true,
                  dp__inc_dec_button_disabled: unref(te)(r.type)
                }),
                role: "button",
                "data-test": "time-dec-btn",
                "aria-label": (m = unref(y).ariaLabels) == null ? void 0 : m.decrementValue(r.type),
                tabindex: "0",
                onKeydown: [
                  withKeys((b) => P(r.type, false), ["enter"]),
                  withKeys((b) => P(r.type, false), ["space"])
                ],
                onClick: (b) => P(r.type, false),
                ref_for: true,
                ref: (b) => j(b, k, 2)
              }, [
                l.$slots["arrow-down"] ? renderSlot(l.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                l.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(zn), { key: 1 }))
              ], 42, Lr)
            ], 64))
          ], 2);
        }), 128)),
        l.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Ur, [
          l.$slots["am-pm-button"] ? renderSlot(l.$slots, "am-pm-button", {
            key: 0,
            toggle: p,
            value: U.value
          }) : createCommentVNode("", true),
          l.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: A,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (g = unref(y).ariaLabels) == null ? void 0 : g.amPmButton,
            tabindex: "0",
            onClick: p,
            onKeydown: [
              withKeys(withModifiers(p, ["prevent"]), ["enter"]),
              withKeys(withModifiers(p, ["prevent"]), ["space"])
            ]
          }, toDisplayString(U.value), 41, Hr))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(J), (r, k) => (openBlock(), createBlock(Transition, {
          key: k,
          name: unref(_)(T[r.type]),
          css: unref(E)
        }, {
          default: withCtx(() => [
            T[r.type] ? (openBlock(), createBlock(Dt, {
              key: 0,
              items: x(r.type),
              "disabled-values": unref(y).filters.times[r.type].concat(unref(de)(r.type)),
              "esc-close": l.escClose,
              "aria-labels": unref(y).ariaLabels,
              "hide-navigation": l.hideNavigation,
              "onUpdate:modelValue": (Y) => I(r.type, Y),
              onSelected: (Y) => N(r.type),
              onToggle: (Y) => N(r.type),
              onResetFlow: o[0] || (o[0] = (Y) => l.$emit("reset-flow")),
              type: r.type
            }, createSlots({
              "button-icon": withCtx(() => [
                l.$slots["clock-icon"] ? renderSlot(l.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                l.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Hn), { key: 1 }))
              ]),
              _: 2
            }, [
              l.$slots[`${r.type}-overlay-value`] ? {
                name: "item",
                fn: withCtx(({ item: Y }) => [
                  renderSlot(l.$slots, `${r.type}-overlay-value`, {
                    text: Y.text,
                    value: Y.value
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
});
var zr = ["aria-label"];
var xr = { class: "dp__overlay_container dp__container_flex dp__time_picker_overlay_container" };
var Kr = {
  key: 1,
  class: "dp__overlay_row dp__flex_row"
};
var jr = ["aria-label"];
var Gr = defineComponent({
  __name: "TimePicker",
  props: {
    hours: { type: [Number, Array], default: 0 },
    minutes: { type: [Number, Array], default: 0 },
    seconds: { type: [Number, Array], default: 0 },
    internalModelValue: { type: [Date, Array], default: null },
    ...at
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
  setup(e, { expose: n, emit: a }) {
    const t = e, { buildMatrix: s, setTimePicker: f } = nt(), y = useSlots(), { hideNavigationButtons: _, defaults: E } = Ee(t), { transitionName: T, showTransition: U } = Ut(E.value.transitions), A = ref(null), c = ref(null), M = ref([]), te = ref(null);
    onMounted(() => {
      a("mount"), !t.timePicker && t.arrowNavigation ? s([$e(A.value)], "time") : f(true, t.timePicker);
    });
    const H = computed(() => t.range && t.modelAuto ? Zn(t.internalModelValue) : true), z = ref(false), B = (P) => ({
      hours: Array.isArray(t.hours) ? t.hours[P] : t.hours,
      minutes: Array.isArray(t.minutes) ? t.minutes[P] : t.minutes,
      seconds: Array.isArray(t.seconds) ? t.seconds[P] : t.seconds
    }), w = computed(() => {
      const P = [];
      if (t.range)
        for (let Z = 0; Z < 2; Z++)
          P.push(B(Z));
      else
        P.push(B(0));
      return P;
    }), J = (P, Z = false, p = "") => {
      Z || a("reset-flow"), z.value = P, P && a("overlay-opened"), t.arrowNavigation && (f(P), P || a("overlay-closed")), nextTick(() => {
        p !== "" && M.value[0] && M.value[0].openChildCmp(p);
      });
    }, ee = computed(() => ({
      dp__button: true,
      dp__button_bottom: t.autoApply
    })), x = it(y, "timePicker"), le = (P, Z, p) => t.range ? Z === 0 ? [P, w.value[1][p]] : [w.value[0][p], P] : P, de = (P) => {
      a("update:hours", P);
    }, C = (P) => {
      a("update:minutes", P);
    }, N = (P) => {
      a("update:seconds", P);
    }, G = () => {
      te.value && t.arrowNavigation && te.value.focus({ preventScroll: true });
    };
    return n({ toggleTimePicker: J }), (P, Z) => {
      var p;
      return openBlock(), createElementBlock("div", null, [
        P.timePicker ? createCommentVNode("", true) : withDirectives((openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(ee)),
          role: "button",
          "aria-label": (p = unref(E).ariaLabels) == null ? void 0 : p.openTimePicker,
          tabindex: "0",
          "data-test": "open-time-picker-btn",
          ref_key: "openTimePickerBtn",
          ref: A,
          onKeydown: [
            Z[0] || (Z[0] = withKeys((q) => J(true), ["enter"])),
            Z[1] || (Z[1] = withKeys((q) => J(true), ["space"]))
          ],
          onClick: Z[2] || (Z[2] = (q) => J(true))
        }, [
          P.$slots["clock-icon"] ? renderSlot(P.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          P.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Hn), { key: 1 }))
        ], 42, zr)), [
          [vShow, !unref(_)("time")]
        ]),
        createVNode(Transition, {
          name: unref(T)(z.value),
          css: unref(U)
        }, {
          default: withCtx(() => {
            var q;
            return [
              z.value || P.timePicker ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "dp__overlay",
                ref_key: "overlayRef",
                ref: te,
                tabindex: "0"
              }, [
                createBaseVNode("div", xr, [
                  P.$slots["time-picker-overlay"] ? renderSlot(P.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e.hours,
                    minutes: e.minutes,
                    seconds: e.seconds,
                    setHours: de,
                    setMinutes: C,
                    setSeconds: N
                  }) : createCommentVNode("", true),
                  P.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Kr, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(w), (j, I) => withDirectives((openBlock(), createBlock(Wr, mergeProps({ key: I }, {
                      ...P.$props,
                      order: I,
                      hours: j.hours,
                      minutes: j.minutes,
                      seconds: j.seconds,
                      closeTimePickerBtn: c.value,
                      disabled: I === 0 ? P.fixedStart : P.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: M,
                      "onUpdate:hours": (l) => de(le(l, I, "hours")),
                      "onUpdate:minutes": (l) => C(le(l, I, "minutes")),
                      "onUpdate:seconds": (l) => N(le(l, I, "seconds")),
                      onMounted: G,
                      onOverlayClosed: G
                    }), createSlots({ _: 2 }, [
                      renderList(unref(x), (l, o) => ({
                        name: l,
                        fn: withCtx((g) => [
                          renderSlot(P.$slots, l, normalizeProps(guardReactiveProps(g)))
                        ])
                      }))
                    ]), 1040, ["onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, I === 0 ? true : unref(H)]
                    ])), 128))
                  ])),
                  P.timePicker ? createCommentVNode("", true) : withDirectives((openBlock(), createElementBlock("div", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: c,
                    class: normalizeClass(unref(ee)),
                    role: "button",
                    "aria-label": (q = unref(E).ariaLabels) == null ? void 0 : q.closeTimePicker,
                    tabindex: "0",
                    onKeydown: [
                      Z[3] || (Z[3] = withKeys((j) => J(false), ["enter"])),
                      Z[4] || (Z[4] = withKeys((j) => J(false), ["space"]))
                    ],
                    onClick: Z[5] || (Z[5] = (j) => J(false))
                  }, [
                    P.$slots["calendar-icon"] ? renderSlot(P.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    P.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Lt), { key: 1 }))
                  ], 42, jr)), [
                    [vShow, !unref(_)("time")]
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
});
var Zr = (e, n) => {
  const { isDisabled: a, matchDate: t, getWeekFromDate: s, defaults: f } = Ee(n), y = ref(null), _ = ref($()), E = (r) => {
    !r.current && n.hideOffsetDates || (y.value = r.value);
  }, T = () => {
    y.value = null;
  }, U = (r) => Array.isArray(e.value) && n.range && e.value[0] && y.value ? r ? Be(y.value, e.value[0]) : _e(y.value, e.value[0]) : true, A = (r, k) => {
    const Y = () => e.value ? k ? e.value[0] || null : e.value[1] : null, R = e.value && Array.isArray(e.value) ? Y() : null;
    return ve($(r.value), R);
  }, c = (r) => {
    const k = Array.isArray(e.value) ? e.value[0] : null;
    return r ? !_e(y.value || null, k) : true;
  }, M = (r, k = true) => (n.range || n.weekPicker) && Array.isArray(e.value) ? n.hideOffsetDates && !r.current ? false : ve($(r.value), e.value[k ? 0 : 1]) : n.range ? A(r, k) && c(k) || ve(r.value, Array.isArray(e.value) ? e.value[0] : null) && U(k) : false, te = (r, k, Y) => Array.isArray(e.value) && e.value[0] && e.value.length === 1 ? r ? false : Y ? Be(e.value[0], k.value) : _e(e.value[0], k.value) : false, H = (r) => !e.value || n.hideOffsetDates && !r.current ? false : n.range ? n.modelAuto && Array.isArray(e.value) ? ve(r.value, e.value[0] ? e.value[0] : _.value) : false : n.multiDates && Array.isArray(e.value) ? e.value.some((k) => ve(k, r.value)) : ve(r.value, e.value ? e.value : _.value), z = (r) => {
    if (n.autoRange || n.weekPicker) {
      if (y.value) {
        if (n.hideOffsetDates && !r.current)
          return false;
        const k = addDays(y.value, +n.autoRange), Y = s($(y.value));
        return n.weekPicker ? ve(Y[1], $(r.value)) : ve(k, $(r.value));
      }
      return false;
    }
    return false;
  }, B = (r) => {
    if (n.autoRange || n.weekPicker) {
      if (y.value) {
        const k = addDays(y.value, +n.autoRange);
        if (n.hideOffsetDates && !r.current)
          return false;
        const Y = s($(y.value));
        return n.weekPicker ? Be(r.value, Y[0]) && _e(r.value, Y[1]) : Be(r.value, y.value) && _e(r.value, k);
      }
      return false;
    }
    return false;
  }, w = (r) => {
    if (n.autoRange || n.weekPicker) {
      if (y.value) {
        if (n.hideOffsetDates && !r.current)
          return false;
        const k = s($(y.value));
        return n.weekPicker ? ve(k[0], r.value) : ve(y.value, r.value);
      }
      return false;
    }
    return false;
  }, J = (r) => xn(e.value, y.value, r.value), ee = () => n.modelAuto && Array.isArray(n.internalModelValue) ? !!n.internalModelValue[0] : false, x = () => n.modelAuto ? Zn(n.internalModelValue) : true, le = (r) => {
    if (Array.isArray(e.value) && e.value.length || n.weekPicker)
      return false;
    const k = n.range ? !M(r) && !M(r, false) : true;
    return !a(r.value) && !H(r) && !(!r.current && n.hideOffsetDates) && k;
  }, de = (r) => n.range ? n.modelAuto ? ee() && H(r) : false : H(r), C = (r) => n.highlight ? t(r.value, n.highlight) : false, N = (r) => a(r.value) && n.highlightDisabledDays === false, G = (r) => n.highlightWeekDays && n.highlightWeekDays.includes(r.value.getDay()), P = (r) => (n.range || n.weekPicker) && (!(f.value.multiCalendars > 0) || r.current) && x() && !(!r.current && n.hideOffsetDates) && !H(r) ? J(r) : false, Z = (r) => {
    const { isRangeStart: k, isRangeEnd: Y } = j(r), R = n.range ? k || Y : false;
    return {
      dp__cell_offset: !r.current,
      dp__pointer: !n.disabled && !(!r.current && n.hideOffsetDates) && !a(r.value),
      dp__cell_disabled: a(r.value),
      dp__cell_highlight: !N(r) && (C(r) || G(r)) && !de(r) && !R,
      dp__cell_highlight_active: !N(r) && (C(r) || G(r)) && de(r),
      dp__today: !n.noToday && ve(r.value, _.value) && r.current
    };
  }, p = (r) => ({
    dp__active_date: de(r),
    dp__date_hover: le(r)
  }), q = (r) => ({
    ...I(r),
    ...l(r),
    dp__range_between_week: P(r) && n.weekPicker
  }), j = (r) => {
    const k = f.value.multiCalendars > 0 ? r.current && M(r) && x() : M(r) && x(), Y = f.value.multiCalendars > 0 ? r.current && M(r, false) && x() : M(r, false) && x();
    return { isRangeStart: k, isRangeEnd: Y };
  }, I = (r) => {
    const { isRangeStart: k, isRangeEnd: Y } = j(r);
    return {
      dp__range_start: k,
      dp__range_end: Y,
      dp__range_between: P(r) && !n.weekPicker,
      dp__date_hover_start: te(le(r), r, true),
      dp__date_hover_end: te(le(r), r, false)
    };
  }, l = (r) => ({
    ...I(r),
    dp__cell_auto_range: B(r),
    dp__cell_auto_range_start: w(r),
    dp__cell_auto_range_end: z(r)
  }), o = (r) => n.range ? n.autoRange ? l(r) : n.modelAuto ? { ...p(r), ...I(r) } : I(r) : n.weekPicker ? q(r) : p(r);
  return {
    setHoverDate: E,
    clearHoverDate: T,
    getDayClassData: (r) => ({
      ...Z(r),
      ...o(r),
      [n.dayClass ? n.dayClass(r.value) : ""]: true,
      [n.calendarCellClassName]: !!n.calendarCellClassName
    })
  };
};
var Xr = ["id", "onKeydown"];
var qr = {
  key: 0,
  class: "dp__sidebar_left"
};
var Jr = {
  key: 1,
  class: "dp__preset_ranges"
};
var Qr = ["onClick"];
var el = {
  key: 2,
  class: "dp__sidebar_right"
};
var tl = {
  key: 3,
  class: "dp__now_wrap"
};
var nl = defineComponent({
  __name: "DatepickerMenu",
  props: {
    openOnTop: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    ...at
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
  setup(e, { expose: n, emit: a }) {
    const t = e, { setMenuFocused: s, setShiftKey: f, control: y } = Kn(), { getCalendarDays: _, defaults: E } = Ee(t), T = useSlots(), U = ref(null), A = reactive({
      timePicker: !!(!t.enableTimePicker || t.timePicker || t.monthPicker),
      monthYearInput: !!t.timePicker,
      calendar: false
    }), c = ref([]), M = ref([]), te = ref(null), H = ref(null), z = ref(0), B = ref(false), w = ref(0);
    onMounted(() => {
      var V;
      B.value = true, !((V = t.presetRanges) != null && V.length) && !T["left-sidebar"] && !T["right-sidebar"] && (me(), window.addEventListener("resize", me));
      const d = $e(H);
      if (d && !t.textInput && !t.inline && (s(true), C()), d) {
        const we = (be) => {
          ["action-row", "time-picker", "month-year"].some(
            (Ke) => Object.keys(T).includes(Ke)
          ) || be.preventDefault(), be.stopImmediatePropagation(), be.stopPropagation();
        };
        d.addEventListener("pointerdown", we), d.addEventListener("mousedown", we);
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", me);
    });
    const { arrowRight: J, arrowLeft: ee, arrowDown: x, arrowUp: le } = nt(), de = (d) => {
      d || d === 0 ? M.value[d].triggerTransition(
        p.value(d),
        q.value(d)
      ) : M.value.forEach(
        (V, we) => V.triggerTransition(p.value(we), q.value(we))
      );
    }, C = () => {
      const d = $e(H);
      d && d.focus({ preventScroll: true });
    }, N = () => {
      var d;
      (d = t.flow) != null && d.length && w.value !== -1 && (w.value += 1, a("flow-step", w.value), Gt());
    }, G = () => {
      w.value = -1;
    }, {
      calendars: P,
      modelValue: Z,
      month: p,
      year: q,
      time: j,
      updateTime: I,
      updateMonthYear: l,
      selectDate: o,
      getWeekNum: g,
      monthYearSelect: r,
      handleScroll: k,
      handleArrow: Y,
      handleSwipe: R,
      getMarker: m,
      selectCurrentDate: b,
      presetDateRange: v
    } = Qa(t, a, N, de, w), { setHoverDate: W, clearHoverDate: se, getDayClassData: Ne } = Zr(Z, t);
    watch(
      P,
      () => {
        t.openOnTop && setTimeout(() => {
          a("recalculate-position");
        }, 0);
      },
      { deep: true }
    );
    const Xe = it(T, "calendar"), re = it(T, "action"), qe = it(T, "timePicker"), xe = it(T, "monthYear"), Re = computed(() => t.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), rt = computed(() => Wa(t.yearRange, t.reverseYears)), ne = computed(() => za(t.locale, t.monthNameFormat)), me = () => {
      const d = $e(U);
      d && (z.value = d.getBoundingClientRect().width);
    }, ge = computed(() => (d) => _(p.value(d), q.value(d))), Je = computed(
      () => E.value.multiCalendars > 0 && t.range ? [...Array(E.value.multiCalendars).keys()] : [0]
    ), Ye = computed(
      () => (d) => d === 1
    ), Tt = computed(() => t.monthPicker || t.timePicker || t.yearPicker), Ht = computed(
      () => ({
        dp__flex_display: E.value.multiCalendars > 0
      })
    ), Wt = computed(() => ({
      dp__instance_calendar: E.value.multiCalendars > 0
    })), zt = computed(() => ({
      dp__menu_disabled: t.disabled,
      dp__menu_readonly: t.readonly
    })), At = computed(
      () => (d) => xt(ge, d)
    ), ht = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !t.inline,
        dp__relative: t.inline,
        [t.menuClassName]: !!t.menuClassName
      })
    ), xt = (d, V) => d.value(V).map((we) => ({
      ...we,
      days: we.days.map((be) => (be.marker = m(be), be.classData = Ne(be), be))
    })), Kt = (d) => {
      d.stopPropagation(), d.stopImmediatePropagation();
    }, jt = () => {
      t.escClose && a("close-picker");
    }, St = (d, V = false) => {
      o(d, V), t.spaceConfirm && a("select-date");
    }, Ct = (d) => {
      var V;
      (V = t.flow) != null && V.length && (A[d] = true, Object.keys(A).filter((we) => !A[we]).length || Gt());
    }, ct = (d, V, we, be, ...Ke) => {
      if (t.flow[w.value] === d) {
        const X = be ? V.value[0] : V.value;
        X && X[we](...Ke);
      }
    }, Gt = () => {
      ct("month", c, "toggleMonthPicker", true, true), ct("year", c, "toggleYearPicker", true, true), ct("calendar", te, "toggleTimePicker", false, false, true), ct("time", te, "toggleTimePicker", false, true, true);
      const d = t.flow[w.value];
      (d === "hours" || d === "minutes" || d === "seconds") && ct(d, te, "toggleTimePicker", false, true, true, d);
    }, i = (d) => {
      if (t.arrowNavigation) {
        if (d === "up")
          return le();
        if (d === "down")
          return x();
        if (d === "left")
          return ee();
        if (d === "right")
          return J();
      } else
        d === "left" || d === "up" ? Y("left", 0, d === "up") : Y("right", 0, d === "down");
    }, D = (d) => {
      f(d.shiftKey), !t.disableMonthYearSelect && d.code === "Tab" && d.target.classList.contains("dp__menu") && y.value.shiftKeyInMenu && (d.preventDefault(), d.stopImmediatePropagation(), a("close-picker"));
    }, Q = (d) => {
      c.value[0] && c.value[0].handleMonthYearChange(d);
    };
    return n({
      updateMonthYear: l
    }), (d, V) => {
      var we;
      return openBlock(), createBlock(Transition, {
        appear: "",
        name: (we = unref(E).transitions) == null ? void 0 : we.menuAppear,
        mode: "out-in",
        css: !!d.transitions
      }, {
        default: withCtx(() => {
          var be, Ke;
          return [
            createBaseVNode("div", {
              id: d.uid ? `dp-menu-${d.uid}` : void 0,
              tabindex: "0",
              ref_key: "dpMenuRef",
              ref: H,
              role: "dialog",
              class: normalizeClass(unref(ht)),
              onMouseleave: V[15] || (V[15] = //@ts-ignore
              (...X) => unref(se) && unref(se)(...X)),
              onClick: Kt,
              onKeydown: [
                withKeys(jt, ["esc"]),
                V[16] || (V[16] = withKeys(withModifiers((X) => i("left"), ["prevent"]), ["left"])),
                V[17] || (V[17] = withKeys(withModifiers((X) => i("up"), ["prevent"]), ["up"])),
                V[18] || (V[18] = withKeys(withModifiers((X) => i("down"), ["prevent"]), ["down"])),
                V[19] || (V[19] = withKeys(withModifiers((X) => i("right"), ["prevent"]), ["right"])),
                D
              ]
            }, [
              (d.disabled || d.readonly) && d.inline ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(unref(zt))
              }, null, 2)) : createCommentVNode("", true),
              !d.inline && !d.teleportCenter ? (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(unref(Re))
              }, null, 2)) : createCommentVNode("", true),
              createBaseVNode("div", {
                class: normalizeClass({
                  dp__menu_content_wrapper: ((be = d.presetRanges) == null ? void 0 : be.length) || !!d.$slots["left-sidebar"] || !!d.$slots["right-sidebar"]
                })
              }, [
                d.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", qr, [
                  renderSlot(d.$slots, "left-sidebar", normalizeProps(guardReactiveProps({ handleMonthYearChange: Q })))
                ])) : createCommentVNode("", true),
                (Ke = d.presetRanges) != null && Ke.length ? (openBlock(), createElementBlock("div", Jr, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(d.presetRanges, (X, ft) => (openBlock(), createElementBlock("div", {
                    key: ft,
                    style: normalizeStyle(X.style || {}),
                    class: "dp__preset_range",
                    onClick: (ie) => unref(v)(X.range, !!X.slot)
                  }, [
                    X.slot ? renderSlot(d.$slots, X.slot, {
                      key: 0,
                      presetDateRange: unref(v),
                      label: X.label,
                      range: X.range
                    }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      createTextVNode(toDisplayString(X.label), 1)
                    ], 64))
                  ], 12, Qr))), 128))
                ])) : createCommentVNode("", true),
                createBaseVNode("div", {
                  class: "dp__instance_calendar",
                  ref_key: "calendarWrapperRef",
                  ref: U,
                  role: "document"
                }, [
                  createBaseVNode("div", {
                    class: normalizeClass(unref(Ht))
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(Je), (X, ft) => (openBlock(), createElementBlock("div", {
                      key: X,
                      class: normalizeClass(unref(Wt))
                    }, [
                      !d.disableMonthYearSelect && !d.timePicker ? (openBlock(), createBlock(Yr, mergeProps({
                        key: 0,
                        ref_for: true,
                        ref: (ie) => {
                          ie && (c.value[ft] = ie);
                        },
                        months: unref(ne),
                        years: unref(rt),
                        month: unref(p)(X),
                        year: unref(q)(X),
                        instance: X,
                        "internal-model-value": e.internalModelValue
                      }, d.$props, {
                        onMount: V[0] || (V[0] = (ie) => Ct("monthYearInput")),
                        onResetFlow: G,
                        onUpdateMonthYear: (ie) => unref(l)(X, ie),
                        onMonthYearSelect: unref(r),
                        onOverlayClosed: C
                      }), createSlots({ _: 2 }, [
                        renderList(unref(xe), (ie, qn) => ({
                          name: ie,
                          fn: withCtx((Zt) => [
                            renderSlot(d.$slots, ie, normalizeProps(guardReactiveProps(Zt)))
                          ])
                        }))
                      ]), 1040, ["months", "years", "month", "year", "instance", "internal-model-value", "onUpdateMonthYear", "onMonthYearSelect"])) : createCommentVNode("", true),
                      createVNode($r, mergeProps({
                        ref_for: true,
                        ref: (ie) => {
                          ie && (M.value[ft] = ie);
                        },
                        "specific-mode": unref(Tt),
                        "get-week-num": unref(g),
                        instance: X,
                        "mapped-dates": unref(At)(X),
                        month: unref(p)(X),
                        year: unref(q)(X)
                      }, d.$props, {
                        "flow-step": w.value,
                        "onUpdate:flowStep": V[1] || (V[1] = (ie) => w.value = ie),
                        onSelectDate: (ie) => unref(o)(ie, !unref(Ye)(X)),
                        onHandleSpace: (ie) => St(ie, !unref(Ye)(X)),
                        onSetHoverDate: V[2] || (V[2] = (ie) => unref(W)(ie)),
                        onHandleScroll: (ie) => unref(k)(ie, X),
                        onHandleSwipe: (ie) => unref(R)(ie, X),
                        onMount: V[3] || (V[3] = (ie) => Ct("calendar")),
                        onResetFlow: G,
                        onTooltipOpen: V[4] || (V[4] = (ie) => d.$emit("tooltip-open", ie)),
                        onTooltipClose: V[5] || (V[5] = (ie) => d.$emit("tooltip-close", ie))
                      }), createSlots({ _: 2 }, [
                        renderList(unref(Xe), (ie, qn) => ({
                          name: ie,
                          fn: withCtx((Zt) => [
                            renderSlot(d.$slots, ie, normalizeProps(guardReactiveProps({ ...Zt })))
                          ])
                        }))
                      ]), 1040, ["specific-mode", "get-week-num", "instance", "mapped-dates", "month", "year", "flow-step", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
                    ], 2))), 128))
                  ], 2),
                  createBaseVNode("div", null, [
                    d.$slots["time-picker"] ? renderSlot(d.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(j), updateTime: unref(I) }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      d.enableTimePicker && !d.monthPicker && !d.weekPicker ? (openBlock(), createBlock(Gr, mergeProps({
                        key: 0,
                        ref_key: "timePickerRef",
                        ref: te,
                        hours: unref(j).hours,
                        minutes: unref(j).minutes,
                        seconds: unref(j).seconds,
                        "internal-model-value": e.internalModelValue
                      }, d.$props, {
                        onMount: V[6] || (V[6] = (X) => Ct("timePicker")),
                        "onUpdate:hours": V[7] || (V[7] = (X) => unref(I)(X)),
                        "onUpdate:minutes": V[8] || (V[8] = (X) => unref(I)(X, false)),
                        "onUpdate:seconds": V[9] || (V[9] = (X) => unref(I)(X, false, true)),
                        onResetFlow: G,
                        onOverlayClosed: C,
                        onOverlayOpened: V[10] || (V[10] = (X) => d.$emit("time-picker-open", X))
                      }), createSlots({ _: 2 }, [
                        renderList(unref(qe), (X, ft) => ({
                          name: X,
                          fn: withCtx((ie) => [
                            renderSlot(d.$slots, X, normalizeProps(guardReactiveProps(ie)))
                          ])
                        }))
                      ]), 1040, ["hours", "minutes", "seconds", "internal-model-value"])) : createCommentVNode("", true)
                    ], 64))
                  ])
                ], 512),
                d.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", el, [
                  renderSlot(d.$slots, "right-sidebar", normalizeProps(guardReactiveProps({ handleMonthYearChange: Q })))
                ])) : createCommentVNode("", true),
                d.showNowButton ? (openBlock(), createElementBlock("div", tl, [
                  d.$slots["now-button"] ? renderSlot(d.$slots, "now-button", {
                    key: 0,
                    selectCurrentDate: unref(b)
                  }) : createCommentVNode("", true),
                  d.$slots["now-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
                    key: 1,
                    type: "button",
                    role: "button",
                    class: "dp__now_button",
                    onClick: V[11] || (V[11] = //@ts-ignore
                    (...X) => unref(b) && unref(b)(...X))
                  }, toDisplayString(d.nowButtonLabel), 1))
                ])) : createCommentVNode("", true)
              ], 2),
              !d.autoApply || d.keepActionRow ? (openBlock(), createBlock(mr, mergeProps({
                key: 2,
                "menu-mount": B.value,
                "calendar-width": z.value,
                "internal-model-value": e.internalModelValue
              }, d.$props, {
                onClosePicker: V[12] || (V[12] = (X) => d.$emit("close-picker")),
                onSelectDate: V[13] || (V[13] = (X) => d.$emit("select-date")),
                onInvalidSelect: V[14] || (V[14] = (X) => d.$emit("invalid-select"))
              }), createSlots({ _: 2 }, [
                renderList(unref(re), (X, ft) => ({
                  name: X,
                  fn: withCtx((ie) => [
                    renderSlot(d.$slots, X, normalizeProps(guardReactiveProps({ ...ie })))
                  ])
                }))
              ]), 1040, ["menu-mount", "calendar-width", "internal-model-value"])) : createCommentVNode("", true)
            ], 42, Xr)
          ];
        }),
        _: 3
      }, 8, ["name", "css"]);
    };
  }
});
var al = typeof window < "u" ? window : void 0;
var ln = () => {
};
var rl = (e) => getCurrentScope() ? (onScopeDispose(e), true) : false;
var ll = (e, n, a, t) => {
  if (!e)
    return ln;
  let s = ln;
  const f = watch(
    () => unref(e),
    (_) => {
      s(), _ && (_.addEventListener(n, a, t), s = () => {
        _.removeEventListener(n, a, t), s = ln;
      });
    },
    { immediate: true, flush: "post" }
  ), y = () => {
    f(), s();
  };
  return rl(y), y;
};
var ol = (e, n, a, t = {}) => {
  const { window: s = al, event: f = "pointerdown" } = t;
  return s ? ll(s, f, (_) => {
    const E = $e(e), T = $e(n);
    !E || !T || E === _.target || _.composedPath().includes(E) || _.composedPath().includes(T) || a(_);
  }, { passive: true }) : void 0;
};
var sl = defineComponent({
  __name: "VueDatePicker",
  props: {
    ...at
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
  setup(e, { expose: n, emit: a }) {
    const t = e, s = useSlots(), f = ref(false), y = toRef(t, "modelValue"), _ = toRef(t, "timezone"), E = ref(null), T = ref(null), U = ref(false), A = ref(null), { setMenuFocused: c, setShiftKey: M } = Kn(), { clearArrowNav: te } = nt(), { validateDate: H, isValidTime: z } = Ee(t);
    onMounted(() => {
      G(t.modelValue), t.inline || (de(A.value).addEventListener("scroll", l), window.addEventListener("resize", o)), t.inline && (f.value = true);
    }), onUnmounted(() => {
      if (!t.inline) {
        const ne = de(A.value);
        ne && ne.removeEventListener("scroll", l), window.removeEventListener("resize", o);
      }
    });
    const B = it(s, "all", t.presetRanges), w = it(s, "input");
    watch(
      [y, _],
      () => {
        G(y.value);
      },
      { deep: true }
    );
    const { openOnTop: J, menuPosition: ee, setMenuPosition: x, setInitialPosition: le, getScrollableParent: de } = nr(
      E,
      T,
      a,
      t
    ), {
      inputValue: C,
      internalModelValue: N,
      parseExternalModelValue: G,
      emitModelValue: P,
      formatInputValue: Z,
      checkBeforeEmit: p
    } = er(a, t, U), q = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: t.dark,
        dp__theme_light: !t.dark,
        dp__flex_display: t.inline,
        dp__flex_display_with_input: t.inlineWithInput
      })
    ), j = computed(() => t.dark ? "dp__theme_dark" : "dp__theme_light"), I = computed(() => t.teleport ? {
      to: typeof t.teleport == "boolean" ? "body" : t.teleport,
      disabled: t.inline
    } : { class: "dp__outer_menu_wrap" }), l = () => {
      f.value && (t.closeOnScroll ? W() : x());
    }, o = () => {
      f.value && x();
    }, g = () => {
      !t.disabled && !t.readonly && (le(), f.value = true, nextTick().then(() => {
        x(), f.value && a("open");
      }), f.value || v(), G(t.modelValue));
    }, r = () => {
      C.value = "", v(), a("update:model-value", null), a("cleared"), W();
    }, k = () => {
      const ne = N.value;
      return !ne || !Array.isArray(ne) && H(ne) ? true : Array.isArray(ne) ? ne.length === 2 && H(ne[0]) && H(ne[1]) ? true : H(ne[0]) : false;
    }, Y = () => {
      p() && k() ? (P(), W()) : a("invalid-select", N.value);
    }, R = (ne) => {
      m(), P(), t.closeOnAutoApply && !ne && W();
    }, m = () => {
      T.value && t.textInput && T.value.setParsedDate(N.value);
    }, b = (ne = false) => {
      t.autoApply && z(N.value) && k() && (t.range && Array.isArray(N.value) ? (t.partialRange || N.value.length === 2) && R(ne) : R(ne));
    }, v = () => {
      t.textInput || (N.value = null);
    }, W = () => {
      t.inline || (f.value && (f.value = false, c(false), M(false), te(), a("closed"), le(), C.value && G(y.value)), v());
    }, se = (ne, me) => {
      if (!ne) {
        N.value = null;
        return;
      }
      N.value = ne, me && (Y(), a("text-submit"));
    }, Ne = () => {
      t.autoApply && z(N.value) && P(), m();
    }, Xe = () => f.value ? W() : g(), re = (ne) => {
      N.value = ne;
    }, qe = () => {
      t.textInput && (U.value = true, Z()), a("focus");
    }, xe = () => {
      t.textInput && (U.value = false, G(t.modelValue)), a("blur");
    }, Re = (ne) => {
      E.value && E.value.updateMonthYear(0, {
        month: Nn(ne.month),
        year: Nn(ne.year)
      });
    }, rt = (ne) => {
      G(ne || t.modelValue);
    };
    return ol(
      E,
      T,
      t.onClickOutside ? () => t.onClickOutside(k) : W
    ), n({
      closeMenu: W,
      selectDate: Y,
      clearValue: r,
      openMenu: g,
      onScroll: l,
      formatInputValue: Z,
      // exposed for testing purposes
      updateInternalModelValue: re,
      // modify internal modelValue
      setMonthYear: Re,
      parseModel: rt
    }), (ne, me) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(unref(q)),
      ref_key: "pickerWrapperRef",
      ref: A
    }, [
      createVNode(dr, mergeProps({
        ref_key: "inputRef",
        ref: T,
        "is-menu-open": f.value,
        "input-value": unref(C),
        "onUpdate:inputValue": me[0] || (me[0] = (ge) => isRef(C) ? C.value = ge : null)
      }, ne.$props, {
        onClear: r,
        onOpen: g,
        onSetInputDate: se,
        onSetEmptyDate: unref(P),
        onSelectDate: Y,
        onToggle: Xe,
        onClose: W,
        onFocus: qe,
        onBlur: xe
      }), createSlots({ _: 2 }, [
        renderList(unref(w), (ge, Je) => ({
          name: ge,
          fn: withCtx((Ye) => [
            renderSlot(ne.$slots, ge, normalizeProps(guardReactiveProps(Ye)))
          ])
        }))
      ]), 1040, ["is-menu-open", "input-value", "onSetEmptyDate"]),
      f.value ? (openBlock(), createBlock(resolveDynamicComponent(ne.teleport ? Teleport : "div"), normalizeProps(mergeProps({ key: 0 }, unref(I))), {
        default: withCtx(() => [
          f.value ? (openBlock(), createBlock(nl, mergeProps({
            key: 0,
            ref_key: "dpMenuRef",
            ref: E,
            class: unref(j),
            style: unref(ee),
            "open-on-top": unref(J)
          }, ne.$props, {
            "internal-model-value": unref(N),
            "onUpdate:internalModelValue": me[1] || (me[1] = (ge) => isRef(N) ? N.value = ge : null),
            onClosePicker: W,
            onSelectDate: Y,
            onAutoApply: b,
            onTimeUpdate: Ne,
            onFlowStep: me[2] || (me[2] = (ge) => ne.$emit("flow-step", ge)),
            onUpdateMonthYear: me[3] || (me[3] = (ge) => ne.$emit("update-month-year", ge)),
            onInvalidSelect: me[4] || (me[4] = (ge) => ne.$emit("invalid-select", unref(N))),
            onInvalidFixedRange: me[5] || (me[5] = (ge) => ne.$emit("invalid-fixed-range", ge)),
            onRecalculatePosition: unref(x),
            onTooltipOpen: me[6] || (me[6] = (ge) => ne.$emit("tooltip-open", ge)),
            onTooltipClose: me[7] || (me[7] = (ge) => ne.$emit("tooltip-close", ge)),
            onTimePickerOpen: me[8] || (me[8] = (ge) => ne.$emit("time-picker-open", ge))
          }), createSlots({ _: 2 }, [
            renderList(unref(B), (ge, Je) => ({
              name: ge,
              fn: withCtx((Ye) => [
                renderSlot(ne.$slots, ge, normalizeProps(guardReactiveProps({ ...Ye })))
              ])
            }))
          ]), 1040, ["class", "style", "open-on-top", "internal-model-value", "onRecalculatePosition"])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 16)) : createCommentVNode("", true)
    ], 2));
  }
});
var Xn = (() => {
  const e = sl;
  return e.install = (n) => {
    n.component("Vue3DatePicker", e);
  }, e;
})();
var il = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Xn
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(il).forEach(([e, n]) => {
  e !== "default" && (Xn[e] = n);
});

export {
  Xn
};
//# sourceMappingURL=chunk-CEJ27ZK6.js.map
