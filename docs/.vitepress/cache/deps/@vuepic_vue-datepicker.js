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
  subDays,
  subMonths,
  subYears
} from './chunk-B3E4SFXA.js'
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
  getCurrentInstance,
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
  toValue,
  unref,
  useAttrs,
  useSlots,
  vShow,
  watch,
  withCtx,
  withDirectives,
  withKeys,
  withModifiers
} from './chunk-5U2WJACE.js'
import './chunk-JVWSFFO4.js'

// node_modules/.pnpm/@vuepic+vue-datepicker@11.0.2_vue@3.5.18_typescript@5.9.2_/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
function Gt() {
  const e = useAttrs()
  return (
    openBlock(),
    createElementBlock(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 32 32',
        fill: 'currentColor',
        'aria-hidden': 'true',
        class: 'dp__icon',
        role: 'img',
        ...e
      },
      [
        createBaseVNode('path', {
          d: 'M29.333 8c0-2.208-1.792-4-4-4h-18.667c-2.208 0-4 1.792-4 4v18.667c0 2.208 1.792 4 4 4h18.667c2.208 0 4-1.792 4-4v-18.667zM26.667 8v18.667c0 0.736-0.597 1.333-1.333 1.333 0 0-18.667 0-18.667 0-0.736 0-1.333-0.597-1.333-1.333 0 0 0-18.667 0-18.667 0-0.736 0.597-1.333 1.333-1.333 0 0 18.667 0 18.667 0 0.736 0 1.333 0.597 1.333 1.333z'
        }),
        createBaseVNode('path', {
          d: 'M20 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z'
        }),
        createBaseVNode('path', {
          d: 'M9.333 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z'
        }),
        createBaseVNode('path', {
          d: 'M4 14.667h24c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333h-24c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333z'
        })
      ]
    )
  )
}
Gt.compatConfig = {
  MODE: 3
}
function Tn() {
  return (
    openBlock(),
    createElementBlock(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 32 32',
        fill: 'currentColor',
        'aria-hidden': 'true',
        class: 'dp__icon',
        role: 'img'
      },
      [
        createBaseVNode('path', {
          d: 'M23.057 7.057l-16 16c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l16-16c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0z'
        }),
        createBaseVNode('path', {
          d: 'M7.057 8.943l16 16c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885l-16-16c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z'
        })
      ]
    )
  )
}
Tn.compatConfig = {
  MODE: 3
}
function Wa() {
  return (
    openBlock(),
    createElementBlock(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 32 32',
        fill: 'currentColor',
        'aria-hidden': 'true',
        class: 'dp__icon',
        role: 'img'
      },
      [
        createBaseVNode('path', {
          d: 'M20.943 23.057l-7.057-7.057c0 0 7.057-7.057 7.057-7.057 0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-8 8c-0.521 0.521-0.521 1.365 0 1.885l8 8c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z'
        })
      ]
    )
  )
}
Wa.compatConfig = {
  MODE: 3
}
function Va() {
  return (
    openBlock(),
    createElementBlock(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 32 32',
        fill: 'currentColor',
        'aria-hidden': 'true',
        class: 'dp__icon',
        role: 'img'
      },
      [
        createBaseVNode('path', {
          d: 'M12.943 24.943l8-8c0.521-0.521 0.521-1.365 0-1.885l-8-8c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885l7.057 7.057c0 0-7.057 7.057-7.057 7.057-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0z'
        })
      ]
    )
  )
}
Va.compatConfig = {
  MODE: 3
}
function ja() {
  return (
    openBlock(),
    createElementBlock(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 32 32',
        fill: 'currentColor',
        'aria-hidden': 'true',
        class: 'dp__icon',
        role: 'img'
      },
      [
        createBaseVNode('path', {
          d: 'M16 1.333c-8.095 0-14.667 6.572-14.667 14.667s6.572 14.667 14.667 14.667c8.095 0 14.667-6.572 14.667-14.667s-6.572-14.667-14.667-14.667zM16 4c6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.623 0-12-5.377-12-12s5.377-12 12-12z'
        }),
        createBaseVNode('path', {
          d: 'M14.667 8v8c0 0.505 0.285 0.967 0.737 1.193l5.333 2.667c0.658 0.329 1.46 0.062 1.789-0.596s0.062-1.46-0.596-1.789l-4.596-2.298c0 0 0-7.176 0-7.176 0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z'
        })
      ]
    )
  )
}
ja.compatConfig = {
  MODE: 3
}
function Ka() {
  return (
    openBlock(),
    createElementBlock(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 32 32',
        fill: 'currentColor',
        'aria-hidden': 'true',
        class: 'dp__icon',
        role: 'img'
      },
      [
        createBaseVNode('path', {
          d: 'M24.943 19.057l-8-8c-0.521-0.521-1.365-0.521-1.885 0l-8 8c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l7.057-7.057c0 0 7.057 7.057 7.057 7.057 0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z'
        })
      ]
    )
  )
}
Ka.compatConfig = {
  MODE: 3
}
function Ga() {
  return (
    openBlock(),
    createElementBlock(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 32 32',
        fill: 'currentColor',
        'aria-hidden': 'true',
        class: 'dp__icon',
        role: 'img'
      },
      [
        createBaseVNode('path', {
          d: 'M7.057 12.943l8 8c0.521 0.521 1.365 0.521 1.885 0l8-8c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-7.057 7.057c0 0-7.057-7.057-7.057-7.057-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z'
        })
      ]
    )
  )
}
Ga.compatConfig = {
  MODE: 3
}
var tt = (e, t) => (t ? new Date(e.toLocaleString('en-US', { timeZone: t })) : new Date(e))
var Qa = (e, t, r) => {
  const a = La(e, t, r)
  return a || K()
}
var kl = (e, t, r) => {
  const a = t.dateInTz ? tt(new Date(e), t.dateInTz) : K(e)
  return r ? je(a, true) : a
}
var La = (e, t, r) => {
  if (!e) return null
  const a = r ? je(K(e), true) : K(e)
  return t ? (t.exactMatch ? kl(e, t, r) : tt(a, t.timezone)) : a
}
var wl = (e) => {
  const r = new Date(e.getFullYear(), 0, 1).getTimezoneOffset()
  return e.getTimezoneOffset() < r
}
var Dl = (e, t) => {
  if (!e) return 0
  const r = /* @__PURE__ */ new Date(),
    a = new Date(r.toLocaleString('en-US', { timeZone: 'UTC' })),
    n = new Date(r.toLocaleString('en-US', { timeZone: e })),
    c = (wl(t ?? n) ? n : (t ?? n)).getTimezoneOffset() / 60
  return (+a - +n) / (1e3 * 60 * 60) - c
}
var ut = ((e) => ((e.month = 'month'), (e.year = 'year'), e))(ut || {})
var it = ((e) => ((e.top = 'top'), (e.bottom = 'bottom'), e))(it || {})
var _t = ((e) => ((e.header = 'header'), (e.calendar = 'calendar'), (e.timePicker = 'timePicker'), e))(_t || {})
var qe = ((e) => (
  (e.month = 'month'),
  (e.year = 'year'),
  (e.calendar = 'calendar'),
  (e.time = 'time'),
  (e.minutes = 'minutes'),
  (e.hours = 'hours'),
  (e.seconds = 'seconds'),
  e
))(qe || {})
var Ml = ['timestamp', 'date', 'iso']
var Ze = ((e) => ((e.up = 'up'), (e.down = 'down'), (e.left = 'left'), (e.right = 'right'), e))(Ze || {})
var Oe = ((e) => (
  (e.arrowUp = 'ArrowUp'),
  (e.arrowDown = 'ArrowDown'),
  (e.arrowLeft = 'ArrowLeft'),
  (e.arrowRight = 'ArrowRight'),
  (e.enter = 'Enter'),
  (e.space = ' '),
  (e.esc = 'Escape'),
  (e.tab = 'Tab'),
  (e.home = 'Home'),
  (e.end = 'End'),
  (e.pageUp = 'PageUp'),
  (e.pageDown = 'PageDown'),
  e
))(Oe || {})
var zt = ((e) => ((e.MONTH_AND_YEAR = 'MM-yyyy'), (e.YEAR = 'yyyy'), (e.DATE = 'dd-MM-yyyy'), e))(zt || {})
function sn(e) {
  return (t) => {
    const r = new Intl.DateTimeFormat(e, {
      weekday: 'short',
      timeZone: 'UTC'
    }).format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`))
    return e === 'ar' ? r.slice(2, 5) : r.slice(0, 2)
  }
}
function $l(e) {
  return (t) => format(tt(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`), 'UTC'), 'EEEEEE', { locale: e })
}
var Al = (e, t, r) => {
  const a = [1, 2, 3, 4, 5, 6, 7]
  let n
  if (e !== null)
    try {
      n = a.map($l(e))
    } catch {
      n = a.map(sn(t))
    }
  else n = a.map(sn(t))
  const u = n.slice(0, r),
    c = n.slice(r + 1, n.length)
  return [n[r]].concat(...c).concat(...u)
}
var qa = (e, t, r) => {
  const a = []
  for (let n = +e[0]; n <= +e[1]; n++) a.push({ value: +n, text: Cn(n, t) })
  return r ? a.reverse() : a
}
var Sn = (e, t, r) => {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((u) => {
    const c = u < 10 ? `0${u}` : u
    return /* @__PURE__ */ new Date(`2017-${c}-01T00:00:00+00:00`)
  })
  if (e !== null)
    try {
      const u = r === 'long' ? 'LLLL' : 'LLL'
      return a.map((c, p) => {
        const d = format(tt(c, 'UTC'), u, { locale: e })
        return {
          text: d.charAt(0).toUpperCase() + d.substring(1),
          value: p
        }
      })
    } catch {}
  const n = new Intl.DateTimeFormat(t, { month: r, timeZone: 'UTC' })
  return a.map((u, c) => {
    const p = n.format(u)
    return {
      text: p.charAt(0).toUpperCase() + p.substring(1),
      value: c
    }
  })
}
var Tl = (e) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e]
var He = (e) => {
  const t = unref(e)
  return t != null && t.$el ? (t == null ? void 0 : t.$el) : t
}
var Sl = (e) => ({ type: 'dot', ...(e ?? {}) })
var Pn = (e) => (Array.isArray(e) ? !!e[0] && !!e[1] : false)
var Xa = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
}
var ze = (e) => e
var un = (e) => (e === 0 ? e : !e || isNaN(+e) ? null : +e)
var dn = (e) => e === null
var Rn = (e) => {
  if (e) return [...e.querySelectorAll('input, button, select, textarea, a[href]')][0]
}
var Pl = (e) => {
  const t = [],
    r = (a) => a.filter((n) => n)
  for (let a = 0; a < e.length; a += 3) {
    const n = [e[a], e[a + 1], e[a + 2]]
    t.push(r(n))
  }
  return t
}
var xt = (e, t, r) => {
  const a = r != null,
    n = t != null
  if (!a && !n) return false
  const u = +r,
    c = +t
  return a && n ? +e > u || +e < c : a ? +e > u : n ? +e < c : false
}
var Wt = (e, t) =>
  Pl(e).map((r) =>
    r.map((a) => {
      const { active: n, disabled: u, isBetween: c, highlighted: p } = t(a)
      return {
        ...a,
        active: n,
        disabled: u,
        className: {
          dp__overlay_cell_active: n,
          dp__overlay_cell: !n,
          dp__overlay_cell_disabled: u,
          dp__overlay_cell_pad: true,
          dp__overlay_cell_active_disabled: u && n,
          dp__cell_in_between: c,
          'dp--highlighted': p
        }
      }
    })
  )
var $t = (e, t, r = false) => {
  e && t.allowStopPropagation && (r && e.stopImmediatePropagation(), e.stopPropagation())
}
var Rl = () =>
  [
    'a[href]',
    'area[href]',
    "input:not([disabled]):not([type='hidden'])",
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    "[tabindex]:not([tabindex='-1'])",
    '[data-datepicker-instance]'
  ].join(', ')
function Cl(e, t) {
  let r = [...document.querySelectorAll(Rl())]
  r = r.filter((n) => !e.contains(n) || n.hasAttribute('data-datepicker-instance'))
  const a = r.indexOf(e)
  if (a >= 0 && (t ? a - 1 >= 0 : a + 1 <= r.length)) return r[a + (t ? -1 : 1)]
}
var Fa = (e, t) => (e == null ? void 0 : e.querySelector(`[data-dp-element="${t}"]`))
var Cn = (e, t) => new Intl.NumberFormat(t, { useGrouping: false, style: 'decimal' }).format(e)
var Ja = (e, t) => format(e, t ?? zt.DATE)
var Ta = (e) => Array.isArray(e)
var va = (e, t, r) => t.get(Ja(e, r))
var Ol = (e, t) => (e ? (t ? (t instanceof Map ? !!va(e, t) : t(K(e))) : false) : true)
var xe = (e, t, r = false, a) => {
  if (e.key === Oe.enter || e.key === Oe.space) return (r && e.preventDefault(), t())
  if (a) return a(e)
}
var Bl = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0
var On = (e, t) => (e ? zt.MONTH_AND_YEAR : t ? zt.YEAR : zt.DATE)
var Bn = (e) => (e < 10 ? `0${e}` : e)
var cn = (e, t, r, a, n, u) => {
  const c = parse(e, t.slice(0, e.length), /* @__PURE__ */ new Date(), { locale: u })
  return isValid(c) && isDate(c)
    ? a || n
      ? c
      : set(c, {
          hours: +r.hours,
          minutes: +(r == null ? void 0 : r.minutes),
          seconds: +(r == null ? void 0 : r.seconds),
          milliseconds: 0
        })
    : null
}
var _l = (e, t, r, a, n, u) => {
  const c = Array.isArray(r) ? r[0] : r
  if (typeof t == 'string') return cn(e, t, c, a, n, u)
  if (Array.isArray(t)) {
    let p = null
    for (const d of t) if (((p = cn(e, d, c, a, n, u)), p)) break
    return p
  }
  return typeof t == 'function' ? t(e) : null
}
var K = (e) => (e ? new Date(e) : /* @__PURE__ */ new Date())
var Yl = (e, t, r) => {
  if (t) {
    const n = (e.getMonth() + 1).toString().padStart(2, '0'),
      u = e.getDate().toString().padStart(2, '0'),
      c = e.getHours().toString().padStart(2, '0'),
      p = e.getMinutes().toString().padStart(2, '0'),
      d = r ? e.getSeconds().toString().padStart(2, '0') : '00'
    return `${e.getFullYear()}-${n}-${u}T${c}:${p}:${d}.000Z`
  }
  const a = Date.UTC(
    e.getUTCFullYear(),
    e.getUTCMonth(),
    e.getUTCDate(),
    e.getUTCHours(),
    e.getUTCMinutes(),
    e.getUTCSeconds()
  )
  return new Date(a).toISOString()
}
var je = (e, t) => {
  const r = K(JSON.parse(JSON.stringify(e))),
    a = set(r, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
  return t ? startOfMonth(a) : a
}
var At = (e, t, r, a) => {
  let n = e ? K(e) : K()
  return (
    (t || t === 0) && (n = setHours(n, +t)),
    (r || r === 0) && (n = setMinutes(n, +r)),
    (a || a === 0) && (n = setSeconds(n, +a)),
    setMilliseconds(n, 0)
  )
}
var Ne = (e, t) => (!e || !t ? false : isBefore(je(e), je(t)))
var Te = (e, t) => (!e || !t ? false : isEqual(je(e), je(t)))
var Fe = (e, t) => (!e || !t ? false : isAfter(je(e), je(t)))
var ea = (e, t, r) =>
  e != null && e[0] && e != null && e[1]
    ? Fe(r, e[0]) && Ne(r, e[1])
    : e != null && e[0] && t
      ? (Fe(r, e[0]) && Ne(r, t)) || (Ne(r, e[0]) && Fe(r, t))
      : false
var dt = (e) => {
  const t = set(new Date(e), { date: 1 })
  return je(t)
}
var Sa = (e, t, r) =>
  t && (r || r === 0)
    ? Object.fromEntries(
        ['hours', 'minutes', 'seconds'].map((a) => (a === t ? [a, r] : [a, isNaN(+e[a]) ? void 0 : +e[a]]))
      )
    : {
        hours: isNaN(+e.hours) ? void 0 : +e.hours,
        minutes: isNaN(+e.minutes) ? void 0 : +e.minutes,
        seconds: isNaN(+e.seconds) ? void 0 : +e.seconds
      }
var Yt = (e) => ({
  hours: getHours(e),
  minutes: getMinutes(e),
  seconds: getSeconds(e)
})
var _n = (e, t) => {
  if (t) {
    const r = getYear(K(t))
    if (r > e) return 12
    if (r === e) return getMonth(K(t))
  }
}
var Yn = (e, t) => {
  if (t) {
    const r = getYear(K(t))
    return r < e ? -1 : r === e ? getMonth(K(t)) : void 0
  }
}
var Vt = (e) => {
  if (e) return getYear(K(e))
}
var In = (e, t) => {
  const r = Fe(e, t) ? t : e,
    a = Fe(t, e) ? t : e
  return eachDayOfInterval({ start: r, end: a })
}
var Il = (e) => {
  const t = addMonths(e, 1)
  return { month: getMonth(t), year: getYear(t) }
}
var gt = (e, t) => {
  const r = startOfWeek(e, { weekStartsOn: +t }),
    a = endOfWeek(e, { weekStartsOn: +t })
  return [r, a]
}
var En = (e, t) => {
  const r = {
    hours: getHours(K()),
    minutes: getMinutes(K()),
    seconds: t ? getSeconds(K()) : 0
  }
  return Object.assign(r, e)
}
var Mt = (e, t, r) => [set(K(e), { date: 1 }), set(K(), { month: t, year: r, date: 1 })]
var ht = (e, t, r) => {
  let a = e ? K(e) : K()
  return ((t || t === 0) && (a = setMonth(a, t)), r && (a = setYear(a, r)), a)
}
var Nn = (e, t, r, a, n) => {
  if (!a || (n && !t) || (!n && !r)) return false
  const u = n ? addMonths(e, 1) : subMonths(e, 1),
    c = [getMonth(u), getYear(u)]
  return n ? !Nl(...c, t) : !El(...c, r)
}
var El = (e, t, r) => Ne(...Mt(r, e, t)) || Te(...Mt(r, e, t))
var Nl = (e, t, r) => Fe(...Mt(r, e, t)) || Te(...Mt(r, e, t))
var Ln = (e, t, r, a, n, u, c) => {
  if (typeof t == 'function' && !c) return t(e)
  const p = r ? { locale: r } : void 0
  return Array.isArray(e)
    ? `${format(e[0], u, p)}${n && !e[1] ? '' : a}${e[1] ? format(e[1], u, p) : ''}`
    : format(e, u, p)
}
var Nt = (e) => {
  if (e) return null
  throw new Error(Xa.prop('partial-range'))
}
var sa = (e, t) => {
  if (t) return e()
  throw new Error(Xa.prop('range'))
}
var za = (e) => (Array.isArray(e) ? isValid(e[0]) && (e[1] ? isValid(e[1]) : true) : e ? isValid(e) : false)
var Ll = (e, t) =>
  set(t ?? K(), {
    hours: +e.hours || 0,
    minutes: +e.minutes || 0,
    seconds: +e.seconds || 0
  })
var Pa = (e, t, r, a) => {
  if (!e) return true
  if (a) {
    const n = r === 'max' ? isBefore(e, t) : isAfter(e, t),
      u = { seconds: 0, milliseconds: 0 }
    return n || isEqual(set(e, u), set(t, u))
  }
  return r === 'max' ? e.getTime() <= t.getTime() : e.getTime() >= t.getTime()
}
var Ra = (e, t, r) => (e ? Ll(e, t) : K(r ?? t))
var fn = (e, t, r, a, n) => {
  if (Array.isArray(a)) {
    const c = Ra(e, a[0], t),
      p = Ra(e, a[1], t)
    return Pa(a[0], c, r, !!t) && Pa(a[1], p, r, !!t) && n
  }
  const u = Ra(e, a, t)
  return Pa(a, u, r, !!t) && n
}
var Ca = (e) => set(K(), Yt(e))
var Fl = (e, t, r) => {
  if (e instanceof Map) {
    const a = `${Bn(r + 1)}-${t}`
    return e.size ? e.has(a) : false
  }
  return typeof e == 'function' ? e(je(set(K(), { month: r, year: t }), true)) : false
}
var zl = (e, t, r) => {
  if (e instanceof Map) {
    const a = `${Bn(r + 1)}-${t}`
    return e.size ? e.has(a) : true
  }
  return true
}
var Fn = (e, t, r) =>
  typeof e == 'function' ? e({ month: t, year: r }) : !!e.months.find((a) => a.month === t && a.year === r)
var Za = (e, t) => (typeof e == 'function' ? e(t) : e.years.includes(t))
var Ha = (e) => `dp-${format(e, 'yyyy-MM-dd')}`
var vn = (e, t) => {
  const r = subDays(je(t), e),
    a = addDays(je(t), e)
  return { before: r, after: a }
}
var Qt = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
})
var zn = () => {
  const e = (a) => {
      Qt.menuFocused = a
    },
    t = (a) => {
      Qt.shiftKeyInMenu !== a && (Qt.shiftKeyInMenu = a)
    }
  return {
    control: computed(() => ({ shiftKeyInMenu: Qt.shiftKeyInMenu, menuFocused: Qt.menuFocused })),
    setMenuFocused: e,
    setShiftKey: t
  }
}
var Ce = reactive({
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
})
var Oa = ref(null)
var ua = ref(false)
var Ba = ref(false)
var _a = ref(false)
var Ya = ref(false)
var Qe = ref(0)
var Le = ref(0)
var St = () => {
  const e = computed(() =>
      ua.value
        ? [...Ce.selectionGrid, Ce.actionRow].filter((h2) => h2.length)
        : Ba.value
          ? [...Ce.timePicker[0], ...Ce.timePicker[1], Ya.value ? [] : [Oa.value], Ce.actionRow].filter(
              (h2) => h2.length
            )
          : _a.value
            ? [...Ce.monthPicker, Ce.actionRow]
            : [Ce.monthYear, ...Ce.calendar, Ce.time, Ce.actionRow].filter((h2) => h2.length)
    ),
    t = (h2) => {
      Qe.value = h2 ? Qe.value + 1 : Qe.value - 1
      let R = null
      ;(e.value[Le.value] && (R = e.value[Le.value][Qe.value]),
        !R && e.value[Le.value + (h2 ? 1 : -1)]
          ? ((Le.value = Le.value + (h2 ? 1 : -1)), (Qe.value = h2 ? 0 : e.value[Le.value].length - 1))
          : R || (Qe.value = h2 ? Qe.value - 1 : Qe.value + 1))
    },
    r = (h2) => {
      if ((Le.value === 0 && !h2) || (Le.value === e.value.length && h2)) return
      ;((Le.value = h2 ? Le.value + 1 : Le.value - 1),
        e.value[Le.value]
          ? e.value[Le.value] &&
            !e.value[Le.value][Qe.value] &&
            Qe.value !== 0 &&
            (Qe.value = e.value[Le.value].length - 1)
          : (Le.value = h2 ? Le.value - 1 : Le.value + 1))
    },
    a = (h2) => {
      let R = null
      ;(e.value[Le.value] && (R = e.value[Le.value][Qe.value]),
        R ? R.focus({ preventScroll: !ua.value }) : (Qe.value = h2 ? Qe.value - 1 : Qe.value + 1))
    },
    n = () => {
      ;(t(true), a(true))
    },
    u = () => {
      ;(t(false), a(false))
    },
    c = () => {
      ;(r(false), a(true))
    },
    p = () => {
      ;(r(true), a(true))
    },
    d = (h2, R) => {
      Ce[R] = h2
    },
    Y = (h2, R) => {
      Ce[R] = h2
    },
    f = () => {
      ;((Qe.value = 0), (Le.value = 0))
    }
  return {
    buildMatrix: d,
    buildMultiLevelMatrix: Y,
    setTimePickerBackRef: (h2) => {
      Oa.value = h2
    },
    setSelectionGrid: (h2) => {
      ;((ua.value = h2), f(), h2 || (Ce.selectionGrid = []))
    },
    setTimePicker: (h2, R = false) => {
      ;((Ba.value = h2), (Ya.value = R), f(), h2 || ((Ce.timePicker[0] = []), (Ce.timePicker[1] = [])))
    },
    setTimePickerElements: (h2, R = 0) => {
      Ce.timePicker[R] = h2
    },
    arrowRight: n,
    arrowLeft: u,
    arrowUp: c,
    arrowDown: p,
    clearArrowNav: () => {
      ;((Ce.monthYear = []),
        (Ce.calendar = []),
        (Ce.time = []),
        (Ce.actionRow = []),
        (Ce.selectionGrid = []),
        (Ce.timePicker[0] = []),
        (Ce.timePicker[1] = []),
        (ua.value = false),
        (Ba.value = false),
        (Ya.value = false),
        (_a.value = false),
        f(),
        (Oa.value = null))
    },
    setMonthPicker: (h2) => {
      ;((_a.value = h2), f())
    },
    refSets: Ce
    // exposed for testing
  }
}
var mn = (e) => ({
  menuAppearTop: 'dp-menu-appear-top',
  menuAppearBottom: 'dp-menu-appear-bottom',
  open: 'dp-slide-down',
  close: 'dp-slide-up',
  next: 'calendar-next',
  previous: 'calendar-prev',
  vNext: 'dp-slide-up',
  vPrevious: 'dp-slide-down',
  ...(e ?? {})
})
var Hl = (e) => ({
  toggleOverlay: 'Toggle overlay',
  menu: 'Datepicker menu',
  input: 'Datepicker input',
  openTimePicker: 'Open time picker',
  closeTimePicker: 'Close time Picker',
  incrementValue: (t) => `Increment ${t}`,
  decrementValue: (t) => `Decrement ${t}`,
  openTpOverlay: (t) => `Open ${t} overlay`,
  amPmButton: 'Switch AM/PM mode',
  openYearsOverlay: 'Open years overlay',
  openMonthsOverlay: 'Open months overlay',
  nextMonth: 'Next month',
  prevMonth: 'Previous month',
  nextYear: 'Next year',
  prevYear: 'Previous year',
  day: void 0,
  weekDay: void 0,
  clearInput: 'Clear value',
  calendarIcon: 'Calendar icon',
  timePicker: 'Time picker',
  monthPicker: (t) => `Month picker${t ? ' overlay' : ''}`,
  yearPicker: (t) => `Year picker${t ? ' overlay' : ''}`,
  timeOverlay: (t) => `${t} overlay`,
  ...(e ?? {})
})
var pn = (e) => (e ? (typeof e == 'boolean' ? (e ? 2 : 0) : +e >= 2 ? +e : 2) : 0)
var Ul = (e) => {
  const t = typeof e == 'object' && e,
    r = {
      static: true,
      solo: false
    }
  if (!e) return { ...r, count: pn(false) }
  const a = t ? e : {},
    n = t ? (a.count ?? true) : e,
    u = pn(n)
  return Object.assign(r, a, { count: u })
}
var Wl = (e, t, r) => e || (typeof r == 'string' ? r : t)
var Vl = (e) => (typeof e == 'boolean' ? (e ? mn({}) : false) : mn(e))
var jl = (e) => {
  const t = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: 'open',
    selectOnFocus: false,
    rangeSeparator: ' - ',
    escClose: true
  }
  return typeof e == 'object' ? { ...t, ...(e ?? {}), enabled: true } : { ...t, enabled: e }
}
var Kl = (e) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...(e ?? {})
})
var Gl = (e) => ({
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  ...(e ?? {})
})
var Ql = (e) => {
  const t = { input: false }
  return typeof e == 'object'
    ? { ...t, ...(e ?? {}), enabled: true }
    : {
        enabled: e,
        ...t
      }
}
var ql = (e) => ({
  ...{
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
    shadowDom: false,
    mobileBreakpoint: 600,
    setDateOnMenuClose: false
  },
  ...(e ?? {})
})
var Xl = (e) => {
  const t = {
    dates: Array.isArray(e) ? e.map((r) => K(r)) : [],
    years: [],
    months: [],
    quarters: [],
    weeks: [],
    weekdays: [],
    options: { highlightDisabled: false }
  }
  return typeof e == 'function' ? e : { ...t, ...(e ?? {}) }
}
var Jl = (e) =>
  typeof e == 'object'
    ? {
        type: (e == null ? void 0 : e.type) ?? 'local',
        hideOnOffsetDates: (e == null ? void 0 : e.hideOnOffsetDates) ?? false
      }
    : {
        type: e,
        hideOnOffsetDates: false
      }
var Zl = (e) => {
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
  }
  return typeof e == 'object'
    ? { enabled: true, ...t, ...e }
    : {
        enabled: e,
        ...t
      }
}
var xl = (e) =>
  e
    ? typeof e == 'string'
      ? {
          timezone: e,
          exactMatch: false,
          dateInTz: void 0,
          emitTimezone: void 0,
          convertModel: true
        }
      : {
          timezone: e.timezone,
          exactMatch: e.exactMatch ?? false,
          dateInTz: e.dateInTz ?? void 0,
          emitTimezone: e.emitTimezone ?? void 0,
          convertModel: e.convertModel ?? true
        }
    : { timezone: void 0, exactMatch: false, emitTimezone: void 0 }
var Ia = (e, t, r, a) =>
  new Map(
    e.map((n) => {
      const u = Qa(n, t, a)
      return [Ja(u, r), u]
    })
  )
var er = (e, t) =>
  e.length
    ? new Map(
        e.map((r) => {
          const a = Qa(r.date, t)
          return [Ja(a, zt.DATE), r]
        })
      )
    : null
var tr = (e) => {
  var r
  const t = On(e.isMonthPicker, e.isYearPicker)
  return {
    minDate: La(e.minDate, e.timezone, e.isSpecific),
    maxDate: La(e.maxDate, e.timezone, e.isSpecific),
    disabledDates: Ta(e.disabledDates) ? Ia(e.disabledDates, e.timezone, t, e.isSpecific) : e.disabledDates,
    allowedDates: Ta(e.allowedDates) ? Ia(e.allowedDates, e.timezone, t, e.isSpecific) : null,
    highlight:
      typeof e.highlight == 'object' && Ta((r = e.highlight) == null ? void 0 : r.dates)
        ? Ia(e.highlight.dates, e.timezone, t)
        : e.highlight,
    markers: er(e.markers, e.timezone)
  }
}
var ar = (e) =>
  typeof e == 'boolean'
    ? { enabled: e, dragSelect: true, limit: null }
    : {
        enabled: !!e,
        limit: e.limit ? +e.limit : null,
        dragSelect: e.dragSelect ?? true
      }
var nr = (e) => ({
  ...Object.fromEntries(
    Object.keys(e).map((r) => {
      const a = r,
        n = e[a],
        u = typeof e[a] == 'string' ? { [n]: true } : Object.fromEntries(n.map((c) => [c, true]))
      return [r, u]
    })
  )
})
var Ye = (e) => {
  const t = () => {
      const H = e.enableSeconds ? ':ss' : '',
        D = e.enableMinutes ? ':mm' : ''
      return e.is24 ? `HH${D}${H}` : `hh${D}${H} aa`
    },
    r = () => {
      var H
      return e.format
        ? e.format
        : e.monthPicker
          ? 'MM/yyyy'
          : e.timePicker
            ? t()
            : e.weekPicker
              ? `${((H = _.value) == null ? void 0 : H.type) === 'iso' ? 'II' : 'ww'}-RR`
              : e.yearPicker
                ? 'yyyy'
                : e.quarterPicker
                  ? 'QQQ/yyyy'
                  : e.enableTimePicker
                    ? `MM/dd/yyyy, ${t()}`
                    : 'MM/dd/yyyy'
    },
    a = (H) => En(H, e.enableSeconds),
    n = () =>
      j.value.enabled
        ? e.startTime && Array.isArray(e.startTime)
          ? [a(e.startTime[0]), a(e.startTime[1])]
          : null
        : e.startTime && !Array.isArray(e.startTime)
          ? a(e.startTime)
          : null,
    u = computed(() => Ul(e.multiCalendars)),
    c = computed(() => n()),
    p = computed(() => Hl(e.ariaLabels)),
    d = computed(() => Kl(e.filters)),
    Y = computed(() => Vl(e.transitions)),
    f = computed(() => Gl(e.actionRow)),
    O = computed(() => Wl(e.previewFormat, e.format, r())),
    m = computed(() => jl(e.textInput)),
    P = computed(() => Ql(e.inline)),
    F = computed(() => ql(e.config)),
    L = computed(() => Xl(e.highlight)),
    _ = computed(() => Jl(e.weekNumbers)),
    h2 = computed(() => xl(e.timezone)),
    R = computed(() => ar(e.multiDates)),
    b = computed(() =>
      tr({
        minDate: e.minDate,
        maxDate: e.maxDate,
        disabledDates: e.disabledDates,
        allowedDates: e.allowedDates,
        highlight: L.value,
        markers: e.markers,
        timezone: h2.value,
        isSpecific: e.monthPicker || e.yearPicker || e.quarterPicker,
        isMonthPicker: e.monthPicker,
        isYearPicker: e.yearPicker
      })
    ),
    j = computed(() => Zl(e.range)),
    z = computed(() => nr(e.ui))
  return {
    defaultedTransitions: Y,
    defaultedMultiCalendars: u,
    defaultedStartTime: c,
    defaultedAriaLabels: p,
    defaultedFilters: d,
    defaultedActionRow: f,
    defaultedPreviewFormat: O,
    defaultedTextInput: m,
    defaultedInline: P,
    defaultedConfig: F,
    defaultedHighlight: L,
    defaultedWeekNumbers: _,
    defaultedRange: j,
    propDates: b,
    defaultedTz: h2,
    defaultedMultiDates: R,
    defaultedUI: z,
    getDefaultPattern: r,
    getDefaultStartTime: n,
    handleEventPropagation: (H) => {
      ;(F.value.allowStopPropagation && H.stopPropagation(), F.value.allowPreventDefault && H.preventDefault())
    }
  }
}
var lr = (e, t, r) => {
  const a = ref(),
    { defaultedTextInput: n, defaultedRange: u, defaultedTz: c, defaultedMultiDates: p, getDefaultPattern: d } = Ye(t),
    Y = ref(''),
    f = toRef(t, 'format'),
    O = toRef(t, 'formatLocale')
  ;(watch(
    a,
    () => {
      typeof t.onInternalModelChange == 'function' && e('internal-model-change', a.value, T(true))
    },
    { deep: true }
  ),
    watch(u, (l, w) => {
      l.enabled !== w.enabled && (a.value = null)
    }),
    watch(f, () => {
      U()
    }))
  const m = (l) => (c.value.timezone && c.value.convertModel ? tt(l, c.value.timezone) : l),
    P = (l) => {
      if (c.value.timezone && c.value.convertModel) {
        const w = Dl(c.value.timezone, l)
        return addHours(l, w)
      }
      return l
    },
    F = (l, w, oe = false) => Ln(l, t.format, t.formatLocale, n.value.rangeSeparator, t.modelAuto, w ?? d(), oe),
    L = (l) =>
      l
        ? t.modelType
          ? Z(l)
          : {
              hours: getHours(l),
              minutes: getMinutes(l),
              seconds: t.enableSeconds ? getSeconds(l) : 0
            }
        : null,
    _ = (l) => (t.modelType ? Z(l) : { month: getMonth(l), year: getYear(l) }),
    h2 = (l) =>
      Array.isArray(l)
        ? p.value.enabled
          ? l.map((w) => R(w, setYear(K(), w)))
          : sa(() => [setYear(K(), l[0]), l[1] ? setYear(K(), l[1]) : Nt(u.value.partialRange)], u.value.enabled)
        : setYear(K(), +l),
    R = (l, w) => ((typeof l == 'string' || typeof l == 'number') && t.modelType ? S(l) : w),
    b = (l) =>
      Array.isArray(l)
        ? [
            R(l[0], At(null, +l[0].hours, +l[0].minutes, l[0].seconds)),
            R(l[1], At(null, +l[1].hours, +l[1].minutes, l[1].seconds))
          ]
        : R(l, At(null, l.hours, l.minutes, l.seconds)),
    j = (l) => {
      const w = set(K(), { date: 1 })
      return Array.isArray(l)
        ? p.value.enabled
          ? l.map((oe) => R(oe, ht(w, +oe.month, +oe.year)))
          : sa(
              () => [
                R(l[0], ht(w, +l[0].month, +l[0].year)),
                R(l[1], l[1] ? ht(w, +l[1].month, +l[1].year) : Nt(u.value.partialRange))
              ],
              u.value.enabled
            )
        : R(l, ht(w, +l.month, +l.year))
    },
    z = (l) => {
      if (Array.isArray(l)) return l.map((w) => S(w))
      throw new Error(Xa.dateArr('multi-dates'))
    },
    ae = (l) => {
      if (Array.isArray(l) && u.value.enabled) {
        const w = l[0],
          oe = l[1]
        return [K(Array.isArray(w) ? w[0] : null), Array.isArray(oe) && oe.length ? K(oe[0]) : null]
      }
      return K(l[0])
    },
    H = (l) =>
      t.modelAuto
        ? Array.isArray(l)
          ? [S(l[0]), S(l[1])]
          : t.autoApply
            ? [S(l)]
            : [S(l), null]
        : Array.isArray(l)
          ? sa(() => (l[1] ? [S(l[0]), l[1] ? S(l[1]) : Nt(u.value.partialRange)] : [S(l[0])]), u.value.enabled)
          : S(l),
    D = () => {
      Array.isArray(a.value) && u.value.enabled && a.value.length === 1 && a.value.push(Nt(u.value.partialRange))
    },
    Q = () => {
      const l = a.value
      return [Z(l[0]), l[1] ? Z(l[1]) : Nt(u.value.partialRange)]
    },
    B = () => (Array.isArray(a.value) ? (a.value[1] ? Q() : Z(ze(a.value[0]))) : []),
    q = () => (a.value || []).map((l) => Z(l)),
    ve = (l = false) => (
      l || D(),
      t.modelAuto
        ? B()
        : p.value.enabled
          ? q()
          : Array.isArray(a.value)
            ? sa(() => Q(), u.value.enabled)
            : Z(ze(a.value))
    ),
    pe = (l) =>
      !l || (Array.isArray(l) && !l.length)
        ? null
        : t.timePicker
          ? b(ze(l))
          : t.monthPicker
            ? j(ze(l))
            : t.yearPicker
              ? h2(ze(l))
              : p.value.enabled
                ? z(ze(l))
                : t.weekPicker
                  ? ae(ze(l))
                  : H(ze(l)),
    v = (l) => {
      const w = pe(l)
      za(ze(w)) ? ((a.value = ze(w)), U()) : ((a.value = null), (Y.value = ''))
    },
    N = () => {
      const l = (w) => format(w, n.value.format)
      return `${l(a.value[0])} ${n.value.rangeSeparator} ${a.value[1] ? l(a.value[1]) : ''}`
    },
    ee = () => (r.value && a.value ? (Array.isArray(a.value) ? N() : format(a.value, n.value.format)) : F(a.value)),
    y = () =>
      a.value
        ? p.value.enabled
          ? a.value.map((l) => F(l)).join('; ')
          : n.value.enabled && typeof n.value.format == 'string'
            ? ee()
            : F(a.value)
        : '',
    U = () => {
      !t.format || typeof t.format == 'string' || (n.value.enabled && typeof n.value.format == 'string')
        ? (Y.value = y())
        : (Y.value = t.format(a.value))
    },
    S = (l) => {
      if (t.utc) {
        const w = new Date(l)
        return t.utc === 'preserve' ? new Date(w.getTime() + w.getTimezoneOffset() * 6e4) : w
      }
      return t.modelType
        ? Ml.includes(t.modelType)
          ? m(new Date(l))
          : t.modelType === 'format' && (typeof t.format == 'string' || !t.format)
            ? m(parse(l, d(), /* @__PURE__ */ new Date(), { locale: O.value }))
            : m(parse(l, t.modelType, /* @__PURE__ */ new Date(), { locale: O.value }))
        : m(new Date(l))
    },
    Z = (l) =>
      l
        ? t.utc
          ? Yl(l, t.utc === 'preserve', t.enableSeconds)
          : t.modelType
            ? t.modelType === 'timestamp'
              ? +P(l)
              : t.modelType === 'iso'
                ? P(l).toISOString()
                : t.modelType === 'format' && (typeof t.format == 'string' || !t.format)
                  ? F(P(l))
                  : F(P(l), t.modelType, true)
            : P(l)
        : '',
    A = (l, w = false, oe = false) => {
      if (oe) return l
      if ((e('update:model-value', l), c.value.emitTimezone && w)) {
        const M = Array.isArray(l) ? l.map((he) => tt(ze(he), c.value.emitTimezone)) : tt(ze(l), c.value.emitTimezone)
        e('update:model-timezone-value', M)
      }
    },
    ie = (l) =>
      Array.isArray(a.value)
        ? p.value.enabled
          ? a.value.map((w) => l(w))
          : [l(a.value[0]), a.value[1] ? l(a.value[1]) : Nt(u.value.partialRange)]
        : l(ze(a.value)),
    i = () => {
      if (Array.isArray(a.value)) {
        const l = gt(a.value[0], t.weekStart),
          w = a.value[1] ? gt(a.value[1], t.weekStart) : []
        return [l.map((oe) => K(oe)), w.map((oe) => K(oe))]
      }
      return gt(a.value, t.weekStart).map((l) => K(l))
    },
    W = (l, w) => A(ze(ie(l)), false, w),
    se = (l) => {
      const w = i()
      return l ? w : e('update:model-value', i())
    },
    T = (l = false) => (
      l || U(),
      t.monthPicker
        ? W(_, l)
        : t.timePicker
          ? W(L, l)
          : t.yearPicker
            ? W(getYear, l)
            : t.weekPicker
              ? se(l)
              : A(ve(l), true, l)
    )
  return {
    inputValue: Y,
    internalModelValue: a,
    checkBeforeEmit: () =>
      a.value
        ? u.value.enabled
          ? u.value.partialRange
            ? a.value.length >= 1
            : a.value.length === 2
          : !!a.value
        : false,
    parseExternalModelValue: v,
    formatInputValue: U,
    emitModelValue: T
  }
}
var rr = (e, t) => {
  const { defaultedFilters: r, propDates: a } = Ye(e),
    { validateMonthYearInRange: n } = Pt(e),
    u = (f, O) => {
      let m = f
      return r.value.months.includes(getMonth(m)) ? ((m = O ? addMonths(f, 1) : subMonths(f, 1)), u(m, O)) : m
    },
    c = (f, O) => {
      let m = f
      return r.value.years.includes(getYear(m)) ? ((m = O ? addYears(f, 1) : subYears(f, 1)), c(m, O)) : m
    },
    p = (f, O = false) => {
      const m = set(K(), { month: e.month, year: e.year })
      let P = f ? addMonths(m, 1) : subMonths(m, 1)
      e.disableYearSelect && (P = setYear(P, e.year))
      let F = getMonth(P),
        L = getYear(P)
      ;(r.value.months.includes(F) && ((P = u(P, f)), (F = getMonth(P)), (L = getYear(P))),
        r.value.years.includes(L) && ((P = c(P, f)), (L = getYear(P))),
        n(F, L, f, e.preventMinMaxNavigation) && d(F, L, O))
    },
    d = (f, O, m) => {
      t('update-month-year', { month: f, year: O, fromNav: m })
    },
    Y = computed(
      () => (f) =>
        Nn(set(K(), { month: e.month, year: e.year }), a.value.maxDate, a.value.minDate, e.preventMinMaxNavigation, f)
    )
  return { handleMonthYearChange: p, isDisabled: Y, updateMonthYear: d }
}
var pa = {
  multiCalendars: { type: [Boolean, Number, String, Object], default: void 0 },
  modelValue: { type: [String, Date, Array, Object, Number], default: null },
  modelType: { type: String, default: null },
  position: { type: String, default: 'center' },
  dark: { type: Boolean, default: false },
  format: {
    type: [String, Function],
    default: () => null
  },
  autoPosition: { type: [Boolean, String], default: true },
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
  monthNameFormat: { type: String, default: 'short' },
  startDate: { type: [Date, String], default: null },
  startTime: { type: [Object, Array], default: null },
  hideOffsetDates: { type: Boolean, default: false },
  noToday: { type: Boolean, default: false },
  disabledWeekDays: { type: Array, default: () => [] },
  allowedDates: { type: Array, default: null },
  nowButtonLabel: { type: String, default: 'Now' },
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
  locale: { type: String, default: 'en-Us' },
  weekNumName: { type: String, default: 'W' },
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
  selectText: { type: String, default: 'Select' },
  cancelText: { type: String, default: 'Cancel' },
  previewFormat: {
    type: [String, Function],
    default: () => ''
  },
  multiDates: { type: [Object, Boolean], default: false },
  ignoreTimeValidation: { type: Boolean, default: false },
  minDate: { type: [Date, String], default: null },
  maxDate: { type: [Date, String], default: null },
  minTime: { type: Object, default: null },
  maxTime: { type: Object, default: null },
  name: { type: String, default: null },
  placeholder: { type: String, default: '' },
  hideInputIcon: { type: Boolean, default: false },
  clearable: { type: Boolean, default: true },
  alwaysClearable: { type: Boolean, default: false },
  state: { type: Boolean, default: null },
  required: { type: Boolean, default: false },
  autocomplete: { type: String, default: 'off' },
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
}
var ct = {
  ...pa,
  shadow: { type: Boolean, default: false },
  flowStep: { type: Number, default: 0 },
  internalModelValue: { type: [Date, Array], default: null },
  noOverlayFocus: { type: Boolean, default: false },
  collapse: { type: Boolean, default: false },
  menuWrapRef: { type: Object, default: null },
  getInputRect: { type: Function, default: () => ({}) },
  isTextInputDate: { type: Boolean, default: false },
  isMobile: { type: Boolean, default: void 0 }
}
var or = ['title']
var sr = ['disabled']
var ur = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: 'ActionRow',
  props: {
    menuMount: { type: Boolean, default: false },
    calendarWidth: { type: Number, default: 0 },
    ...ct
  },
  emits: ['close-picker', 'select-date', 'select-now', 'invalid-select'],
  setup(e, { emit: t }) {
    const r = t,
      a = e,
      {
        defaultedActionRow: n,
        defaultedPreviewFormat: u,
        defaultedMultiCalendars: c,
        defaultedTextInput: p,
        defaultedInline: d,
        defaultedRange: Y,
        defaultedMultiDates: f
      } = Ye(a),
      { isTimeValid: O, isMonthValid: m } = Pt(a),
      { buildMatrix: P } = St(),
      F = ref(null),
      L = ref(null),
      _ = ref(false),
      h2 = ref({}),
      R = ref(null),
      b = ref(null)
    ;(onMounted(() => {
      ;(a.arrowNavigation && P([He(F), He(L)], 'actionRow'), j(), window.addEventListener('resize', j))
    }),
      onUnmounted(() => {
        window.removeEventListener('resize', j)
      }))
    const j = () => {
        ;((_.value = false),
          setTimeout(() => {
            var ee, y
            const v = (ee = R.value) == null ? void 0 : ee.getBoundingClientRect(),
              N = (y = b.value) == null ? void 0 : y.getBoundingClientRect()
            ;(v && N && (h2.value.maxWidth = `${N.width - v.width - 20}px`), (_.value = true))
          }, 0))
      },
      z = computed(() =>
        Y.value.enabled && !Y.value.partialRange && a.internalModelValue ? a.internalModelValue.length === 2 : true
      ),
      ae = computed(() => !O.value(a.internalModelValue) || !m.value(a.internalModelValue) || !z.value),
      H = () => {
        const v = u.value
        return (a.timePicker || a.monthPicker, v(ze(a.internalModelValue)))
      },
      D = () => {
        const v = a.internalModelValue
        return c.value.count > 0 ? `${Q(v[0])} - ${Q(v[1])}` : [Q(v[0]), Q(v[1])]
      },
      Q = (v) => Ln(v, u.value, a.formatLocale, p.value.rangeSeparator, a.modelAuto, u.value),
      B = computed(() =>
        !a.internalModelValue || !a.menuMount
          ? ''
          : typeof u.value == 'string'
            ? Array.isArray(a.internalModelValue)
              ? a.internalModelValue.length === 2 && a.internalModelValue[1]
                ? D()
                : f.value.enabled
                  ? a.internalModelValue.map((v) => `${Q(v)}`)
                  : a.modelAuto
                    ? `${Q(a.internalModelValue[0])}`
                    : `${Q(a.internalModelValue[0])} -`
              : Q(a.internalModelValue)
            : H()
      ),
      q = () => (f.value.enabled ? '; ' : ' - '),
      ve = computed(() => (Array.isArray(B.value) ? B.value.join(q()) : B.value)),
      pe = () => {
        O.value(a.internalModelValue) && m.value(a.internalModelValue) && z.value
          ? r('select-date')
          : r('invalid-select')
      }
    return (v, N) => (
      openBlock(),
      createElementBlock(
        'div',
        {
          ref_key: 'actionRowRef',
          ref: b,
          class: 'dp__action_row'
        },
        [
          v.$slots['action-row']
            ? renderSlot(
                v.$slots,
                'action-row',
                normalizeProps(
                  mergeProps(
                    { key: 0 },
                    {
                      internalModelValue: v.internalModelValue,
                      disabled: ae.value,
                      selectDate: () => v.$emit('select-date'),
                      closePicker: () => v.$emit('close-picker')
                    }
                  )
                )
              )
            : (openBlock(),
              createElementBlock(
                Fragment,
                { key: 1 },
                [
                  unref(n).showPreview
                    ? (openBlock(),
                      createElementBlock(
                        'div',
                        {
                          key: 0,
                          class: 'dp__selection_preview',
                          title: ve.value,
                          style: normalizeStyle(h2.value)
                        },
                        [
                          v.$slots['action-preview'] && _.value
                            ? renderSlot(v.$slots, 'action-preview', {
                                key: 0,
                                value: v.internalModelValue
                              })
                            : createCommentVNode('', true),
                          !v.$slots['action-preview'] && _.value
                            ? (openBlock(),
                              createElementBlock(
                                Fragment,
                                { key: 1 },
                                [createTextVNode(toDisplayString(ve.value), 1)],
                                64
                              ))
                            : createCommentVNode('', true)
                        ],
                        12,
                        or
                      ))
                    : createCommentVNode('', true),
                  createBaseVNode(
                    'div',
                    {
                      ref_key: 'actionBtnContainer',
                      ref: R,
                      class: 'dp__action_buttons',
                      'data-dp-element': 'action-row'
                    },
                    [
                      v.$slots['action-buttons']
                        ? renderSlot(v.$slots, 'action-buttons', {
                            key: 0,
                            value: v.internalModelValue
                          })
                        : createCommentVNode('', true),
                      v.$slots['action-buttons']
                        ? createCommentVNode('', true)
                        : (openBlock(),
                          createElementBlock(
                            Fragment,
                            { key: 1 },
                            [
                              !unref(d).enabled && unref(n).showCancel
                                ? (openBlock(),
                                  createElementBlock(
                                    'button',
                                    {
                                      key: 0,
                                      ref_key: 'cancelButtonRef',
                                      ref: F,
                                      type: 'button',
                                      class: 'dp__action_button dp__action_cancel',
                                      onClick: N[0] || (N[0] = (ee) => v.$emit('close-picker')),
                                      onKeydown: N[1] || (N[1] = (ee) => unref(xe)(ee, () => v.$emit('close-picker')))
                                    },
                                    toDisplayString(v.cancelText),
                                    545
                                  ))
                                : createCommentVNode('', true),
                              unref(n).showNow
                                ? (openBlock(),
                                  createElementBlock(
                                    'button',
                                    {
                                      key: 1,
                                      type: 'button',
                                      class: 'dp__action_button dp__action_cancel',
                                      onClick: N[2] || (N[2] = (ee) => v.$emit('select-now')),
                                      onKeydown: N[3] || (N[3] = (ee) => unref(xe)(ee, () => v.$emit('select-now')))
                                    },
                                    toDisplayString(v.nowButtonLabel),
                                    33
                                  ))
                                : createCommentVNode('', true),
                              unref(n).showSelect
                                ? (openBlock(),
                                  createElementBlock(
                                    'button',
                                    {
                                      key: 2,
                                      ref_key: 'selectButtonRef',
                                      ref: L,
                                      type: 'button',
                                      class: 'dp__action_button dp__action_select',
                                      disabled: ae.value,
                                      'data-test-id': 'select-button',
                                      onKeydown: N[4] || (N[4] = (ee) => unref(xe)(ee, () => pe())),
                                      onClick: pe
                                    },
                                    toDisplayString(v.selectText),
                                    41,
                                    sr
                                  ))
                                : createCommentVNode('', true)
                            ],
                            64
                          ))
                    ],
                    512
                  )
                ],
                64
              ))
        ],
        512
      )
    )
  }
})
var ir = ['role', 'aria-label', 'tabindex']
var dr = { class: 'dp__selection_grid_header' }
var cr = ['aria-selected', 'aria-disabled', 'data-test-id', 'onClick', 'onKeydown', 'onMouseover']
var fr = ['aria-label']
var aa = defineComponent({
  __name: 'SelectionOverlay',
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
  emits: ['selected', 'toggle', 'reset-flow', 'hover-value'],
  setup(e, { expose: t, emit: r }) {
    const { setSelectionGrid: a, buildMultiLevelMatrix: n, setMonthPicker: u } = St(),
      c = r,
      p = e,
      { defaultedAriaLabels: d, defaultedTextInput: Y, defaultedConfig: f, handleEventPropagation: O } = Ye(p),
      { hideNavigationButtons: m } = ha(),
      P = ref(false),
      F = ref(null),
      L = ref(null),
      _ = ref([]),
      h2 = ref(),
      R = ref(null),
      b = ref(0),
      j = ref(null)
    ;(onBeforeUpdate(() => {
      F.value = null
    }),
      onMounted(() => {
        ;(nextTick().then(() => ve()), p.noOverlayFocus || ae(), z(true))
      }),
      onUnmounted(() => z(false)))
    const z = (i) => {
        var W
        p.arrowNavigation && ((W = p.headerRefs) != null && W.length ? u(i) : a(i))
      },
      ae = () => {
        var W
        const i = He(L)
        i &&
          (Y.value.enabled ||
            (F.value ? (W = F.value) == null || W.focus({ preventScroll: true }) : i.focus({ preventScroll: true })),
          (P.value = i.clientHeight < i.scrollHeight))
      },
      H = computed(() => ({
        dp__overlay: true,
        'dp--overlay-absolute': !p.useRelative,
        'dp--overlay-relative': p.useRelative
      })),
      D = computed(() => (p.useRelative ? { height: `${p.height}px`, width: 'var(--dp-menu-min-width)' } : void 0)),
      Q = computed(() => ({
        dp__overlay_col: true
      })),
      B = computed(() => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: P.value,
        dp__button_bottom: p.isLast
      })),
      q = computed(() => {
        var i, W
        return {
          dp__overlay_container: true,
          dp__container_flex: ((i = p.items) == null ? void 0 : i.length) <= 6,
          dp__container_block: ((W = p.items) == null ? void 0 : W.length) > 6
        }
      })
    watch(
      () => p.items,
      () => ve(false),
      { deep: true }
    )
    const ve = (i = true) => {
        nextTick().then(() => {
          const W = He(F),
            se = He(L),
            T = He(R),
            re = He(j),
            l = T ? T.getBoundingClientRect().height : 0
          ;(se &&
            (se.getBoundingClientRect().height
              ? (b.value = se.getBoundingClientRect().height - l)
              : (b.value = f.value.modeHeight - l)),
            W &&
              re &&
              i &&
              (re.scrollTop = W.offsetTop - re.offsetTop - (b.value / 2 - W.getBoundingClientRect().height) - l))
        })
      },
      pe = (i) => {
        i.disabled || c('selected', i.value)
      },
      v = () => {
        ;(c('toggle'), c('reset-flow'))
      },
      N = (i) => {
        p.escClose && (v(), O(i))
      },
      ee = (i, W, se, T) => {
        i &&
          ((W.active || W.value === p.focusValue) && (F.value = i),
          p.arrowNavigation && (Array.isArray(_.value[se]) ? (_.value[se][T] = i) : (_.value[se] = [i]), y()))
      },
      y = () => {
        var W, se
        const i =
          (W = p.headerRefs) != null && W.length
            ? [p.headerRefs].concat(_.value)
            : _.value.concat([p.skipButtonRef ? [] : [R.value]])
        n(ze(i), (se = p.headerRefs) != null && se.length ? 'monthPicker' : 'selectionGrid')
      },
      U = (i) => {
        p.arrowNavigation || $t(i, f.value, true)
      },
      S = (i) => {
        ;((h2.value = i), c('hover-value', i))
      },
      Z = () => {
        if ((v(), !p.isLast)) {
          const i = Fa(p.menuWrapRef ?? null, 'action-row')
          if (i) {
            const W = Rn(i)
            W == null || W.focus()
          }
        }
      },
      A = (i) => {
        switch (i.key) {
          case Oe.esc:
            return N(i)
          case Oe.arrowLeft:
            return U(i)
          case Oe.arrowRight:
            return U(i)
          case Oe.arrowUp:
            return U(i)
          case Oe.arrowDown:
            return U(i)
          default:
            return
        }
      },
      ie = (i) => {
        if (i.key === Oe.enter) return v()
        if (i.key === Oe.tab) return Z()
      }
    return (
      t({ focusGrid: ae }),
      (i, W) => {
        var se
        return (
          openBlock(),
          createElementBlock(
            'div',
            {
              ref_key: 'gridWrapRef',
              ref: L,
              class: normalizeClass(H.value),
              style: normalizeStyle(D.value),
              role: i.useRelative ? void 0 : 'dialog',
              'aria-label': i.overlayLabel,
              tabindex: i.useRelative ? void 0 : '0',
              onKeydown: A,
              onClick: W[0] || (W[0] = withModifiers(() => {}, ['prevent']))
            },
            [
              createBaseVNode(
                'div',
                {
                  ref_key: 'containerRef',
                  ref: j,
                  class: normalizeClass(q.value),
                  style: normalizeStyle({ '--dp-overlay-height': `${b.value}px` }),
                  role: 'grid'
                },
                [
                  createBaseVNode('div', dr, [renderSlot(i.$slots, 'header')]),
                  i.$slots.overlay
                    ? renderSlot(i.$slots, 'overlay', { key: 0 })
                    : (openBlock(true),
                      createElementBlock(
                        Fragment,
                        { key: 1 },
                        renderList(
                          i.items,
                          (T, re) => (
                            openBlock(),
                            createElementBlock(
                              'div',
                              {
                                key: re,
                                class: normalizeClass(['dp__overlay_row', { dp__flex_row: i.items.length >= 3 }]),
                                role: 'row'
                              },
                              [
                                (openBlock(true),
                                createElementBlock(
                                  Fragment,
                                  null,
                                  renderList(
                                    T,
                                    (l, w) => (
                                      openBlock(),
                                      createElementBlock(
                                        'div',
                                        {
                                          key: l.value,
                                          ref_for: true,
                                          ref: (oe) => ee(oe, l, re, w),
                                          role: 'gridcell',
                                          class: normalizeClass(Q.value),
                                          'aria-selected': l.active || void 0,
                                          'aria-disabled': l.disabled || void 0,
                                          tabindex: '0',
                                          'data-test-id': l.text,
                                          onClick: withModifiers((oe) => pe(l), ['prevent']),
                                          onKeydown: (oe) => unref(xe)(oe, () => pe(l), true),
                                          onMouseover: (oe) => S(l.value)
                                        },
                                        [
                                          createBaseVNode(
                                            'div',
                                            {
                                              class: normalizeClass(l.className)
                                            },
                                            [
                                              i.$slots.item
                                                ? renderSlot(i.$slots, 'item', {
                                                    key: 0,
                                                    item: l
                                                  })
                                                : createCommentVNode('', true),
                                              i.$slots.item
                                                ? createCommentVNode('', true)
                                                : (openBlock(),
                                                  createElementBlock(
                                                    Fragment,
                                                    { key: 1 },
                                                    [createTextVNode(toDisplayString(l.text), 1)],
                                                    64
                                                  ))
                                            ],
                                            2
                                          )
                                        ],
                                        42,
                                        cr
                                      )
                                    )
                                  ),
                                  128
                                ))
                              ],
                              2
                            )
                          )
                        ),
                        128
                      ))
                ],
                6
              ),
              i.$slots['button-icon']
                ? withDirectives(
                    (openBlock(),
                    createElementBlock(
                      'button',
                      {
                        key: 0,
                        ref_key: 'toggleButton',
                        ref: R,
                        type: 'button',
                        'aria-label': (se = unref(d)) == null ? void 0 : se.toggleOverlay,
                        class: normalizeClass(B.value),
                        tabindex: '0',
                        onClick: v,
                        onKeydown: ie
                      },
                      [renderSlot(i.$slots, 'button-icon')],
                      42,
                      fr
                    )),
                    [[vShow, !unref(m)(i.hideNavigation, i.type)]]
                  )
                : createCommentVNode('', true)
            ],
            46,
            ir
          )
        )
      }
    )
  }
})
var vr = ['data-dp-mobile']
var ya = defineComponent({
  __name: 'InstanceWrap',
  props: {
    multiCalendars: {},
    stretch: { type: Boolean },
    collapse: { type: Boolean },
    isMobile: { type: Boolean }
  },
  setup(e) {
    const t = e,
      r = computed(() => (t.multiCalendars > 0 ? [...Array(t.multiCalendars).keys()] : [0])),
      a = computed(() => ({
        dp__instance_calendar: t.multiCalendars > 0
      }))
    return (n, u) => (
      openBlock(),
      createElementBlock(
        'div',
        {
          class: normalizeClass({
            dp__menu_inner: !n.stretch,
            'dp--menu--inner-stretched': n.stretch,
            dp__flex_display: n.multiCalendars > 0,
            'dp--flex-display-collapsed': n.collapse
          }),
          'data-dp-mobile': n.isMobile
        },
        [
          (openBlock(true),
          createElementBlock(
            Fragment,
            null,
            renderList(
              r.value,
              (c, p) => (
                openBlock(),
                createElementBlock(
                  'div',
                  {
                    key: c,
                    class: normalizeClass(a.value)
                  },
                  [
                    renderSlot(n.$slots, 'default', {
                      instance: c,
                      index: p
                    })
                  ],
                  2
                )
              )
            ),
            128
          ))
        ],
        10,
        vr
      )
    )
  }
})
var mr = ['data-dp-element', 'aria-label', 'aria-disabled']
var qt = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: 'ArrowBtn',
  props: {
    ariaLabel: {},
    elName: {},
    disabled: { type: Boolean }
  },
  emits: ['activate', 'set-ref'],
  setup(e, { emit: t }) {
    const r = t,
      a = ref(null)
    return (
      onMounted(() => r('set-ref', a)),
      (n, u) => (
        openBlock(),
        createElementBlock(
          'button',
          {
            ref_key: 'elRef',
            ref: a,
            type: 'button',
            'data-dp-element': n.elName,
            class: 'dp__btn dp--arrow-btn-nav',
            tabindex: '0',
            'aria-label': n.ariaLabel,
            'aria-disabled': n.disabled || void 0,
            onClick: u[0] || (u[0] = (c) => n.$emit('activate')),
            onKeydown: u[1] || (u[1] = (c) => unref(xe)(c, () => n.$emit('activate'), true))
          },
          [
            createBaseVNode(
              'span',
              {
                class: normalizeClass(['dp__inner_nav', { dp__inner_nav_disabled: n.disabled }])
              },
              [renderSlot(n.$slots, 'default')],
              2
            )
          ],
          40,
          mr
        )
      )
    )
  }
})
var pr = ['aria-label', 'data-test-id']
var Hn = defineComponent({
  __name: 'YearModePicker',
  props: {
    ...ct,
    showYearPicker: { type: Boolean, default: false },
    items: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    isDisabled: { type: Function, default: () => false }
  },
  emits: ['toggle-year-picker', 'year-select', 'handle-year'],
  setup(e, { emit: t }) {
    const r = t,
      a = e,
      { showRightIcon: n, showLeftIcon: u } = ha(),
      {
        defaultedConfig: c,
        defaultedMultiCalendars: p,
        defaultedAriaLabels: d,
        defaultedTransitions: Y,
        defaultedUI: f
      } = Ye(a),
      { showTransition: O, transitionName: m } = na(Y),
      P = ref(false),
      F = (h2 = false, R) => {
        ;((P.value = !P.value), r('toggle-year-picker', { flow: h2, show: R }))
      },
      L = (h2) => {
        ;((P.value = false), r('year-select', h2))
      },
      _ = (h2 = false) => {
        r('handle-year', h2)
      }
    return (h2, R) => {
      var b, j, z, ae, H
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass(['dp--year-mode-picker', { 'dp--hidden-el': P.value }])
              },
              [
                unref(u)(unref(p), e.instance)
                  ? (openBlock(),
                    createBlock(
                      qt,
                      {
                        key: 0,
                        ref: 'mpPrevIconRef',
                        'aria-label': (b = unref(d)) == null ? void 0 : b.prevYear,
                        disabled: e.isDisabled(false),
                        class: normalizeClass((j = unref(f)) == null ? void 0 : j.navBtnPrev),
                        onActivate: R[0] || (R[0] = (D) => _(false))
                      },
                      {
                        default: withCtx(() => [
                          h2.$slots['arrow-left']
                            ? renderSlot(h2.$slots, 'arrow-left', { key: 0 })
                            : createCommentVNode('', true),
                          h2.$slots['arrow-left']
                            ? createCommentVNode('', true)
                            : (openBlock(), createBlock(unref(Wa), { key: 1 }))
                        ]),
                        _: 3
                      },
                      8,
                      ['aria-label', 'disabled', 'class']
                    ))
                  : createCommentVNode('', true),
                createBaseVNode(
                  'button',
                  {
                    ref: 'mpYearButtonRef',
                    class: 'dp__btn dp--year-select',
                    type: 'button',
                    'aria-label': `${e.year}-${(z = unref(d)) == null ? void 0 : z.openYearsOverlay}`,
                    'data-test-id': `year-mode-btn-${e.instance}`,
                    onClick: R[1] || (R[1] = () => F(false)),
                    onKeydown: R[2] || (R[2] = withKeys(() => F(false), ['enter']))
                  },
                  [
                    h2.$slots.year
                      ? renderSlot(h2.$slots, 'year', {
                          key: 0,
                          year: e.year
                        })
                      : createCommentVNode('', true),
                    h2.$slots.year
                      ? createCommentVNode('', true)
                      : (openBlock(),
                        createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(e.year), 1)], 64))
                  ],
                  40,
                  pr
                ),
                unref(n)(unref(p), e.instance)
                  ? (openBlock(),
                    createBlock(
                      qt,
                      {
                        key: 1,
                        ref: 'mpNextIconRef',
                        'aria-label': (ae = unref(d)) == null ? void 0 : ae.nextYear,
                        disabled: e.isDisabled(true),
                        class: normalizeClass((H = unref(f)) == null ? void 0 : H.navBtnNext),
                        onActivate: R[3] || (R[3] = (D) => _(true))
                      },
                      {
                        default: withCtx(() => [
                          h2.$slots['arrow-right']
                            ? renderSlot(h2.$slots, 'arrow-right', { key: 0 })
                            : createCommentVNode('', true),
                          h2.$slots['arrow-right']
                            ? createCommentVNode('', true)
                            : (openBlock(), createBlock(unref(Va), { key: 1 }))
                        ]),
                        _: 3
                      },
                      8,
                      ['aria-label', 'disabled', 'class']
                    ))
                  : createCommentVNode('', true)
              ],
              2
            ),
            createVNode(
              Transition,
              {
                name: unref(m)(e.showYearPicker),
                css: unref(O)
              },
              {
                default: withCtx(() => {
                  var D, Q
                  return [
                    e.showYearPicker
                      ? (openBlock(),
                        createBlock(
                          aa,
                          {
                            key: 0,
                            items: e.items,
                            'text-input': h2.textInput,
                            'esc-close': h2.escClose,
                            config: h2.config,
                            'is-last': h2.autoApply && !unref(c).keepActionRow,
                            'hide-navigation': h2.hideNavigation,
                            'aria-labels': h2.ariaLabels,
                            'overlay-label':
                              (Q = (D = unref(d)) == null ? void 0 : D.yearPicker) == null ? void 0 : Q.call(D, true),
                            type: 'year',
                            onToggle: F,
                            onSelected: R[4] || (R[4] = (B) => L(B))
                          },
                          createSlots(
                            {
                              'button-icon': withCtx(() => [
                                h2.$slots['calendar-icon']
                                  ? renderSlot(h2.$slots, 'calendar-icon', { key: 0 })
                                  : createCommentVNode('', true),
                                h2.$slots['calendar-icon']
                                  ? createCommentVNode('', true)
                                  : (openBlock(), createBlock(unref(Gt), { key: 1 }))
                              ]),
                              _: 2
                            },
                            [
                              h2.$slots['year-overlay-value']
                                ? {
                                    name: 'item',
                                    fn: withCtx(({ item: B }) => [
                                      renderSlot(h2.$slots, 'year-overlay-value', {
                                        text: B.text,
                                        value: B.value
                                      })
                                    ]),
                                    key: '0'
                                  }
                                : void 0
                            ]
                          ),
                          1032,
                          [
                            'items',
                            'text-input',
                            'esc-close',
                            'config',
                            'is-last',
                            'hide-navigation',
                            'aria-labels',
                            'overlay-label'
                          ]
                        ))
                      : createCommentVNode('', true)
                  ]
                }),
                _: 3
              },
              8,
              ['name', 'css']
            )
          ],
          64
        )
      )
    }
  }
})
var xa = (e, t, r) => {
  if (t.value && Array.isArray(t.value))
    if (t.value.some((a) => Te(e, a))) {
      const a = t.value.filter((n) => !Te(n, e))
      t.value = a.length ? a : null
    } else ((r && +r > t.value.length) || !r) && t.value.push(e)
  else t.value = [e]
}
var en = (e, t, r) => {
  let a = e.value ? e.value.slice() : []
  return (
    a.length === 2 && a[1] !== null && (a = []),
    a.length ? (Ne(t, a[0]) ? a.unshift(t) : (a[1] = t), r('range-end', t)) : ((a = [t]), r('range-start', t)),
    a
  )
}
var ga = (e, t, r, a) => {
  e && (e[0] && e[1] && r && t('auto-apply'), e[0] && !e[1] && a && r && t('auto-apply'))
}
var Un = (e) => {
  Array.isArray(e.value) && e.value.length <= 2 && e.range
    ? (e.modelValue.value = e.value.map((t) => tt(K(t), e.timezone)))
    : Array.isArray(e.value) || (e.modelValue.value = tt(K(e.value), e.timezone))
}
var Wn = (e, t, r, a) =>
  Array.isArray(t.value) && (t.value.length === 2 || (t.value.length === 1 && a.value.partialRange))
    ? a.value.fixedStart && (Fe(e, t.value[0]) || Te(e, t.value[0]))
      ? [t.value[0], e]
      : a.value.fixedEnd && (Ne(e, t.value[1]) || Te(e, t.value[1]))
        ? [e, t.value[1]]
        : (r('invalid-fixed-range', e), t.value)
    : []
var Vn = ({
  multiCalendars: e,
  range: t,
  highlight: r,
  propDates: a,
  calendars: n,
  modelValue: u,
  props: c,
  filters: p,
  year: d,
  month: Y,
  emit: f
}) => {
  const O = computed(() => qa(c.yearRange, c.locale, c.reverseYears)),
    m = ref([false]),
    P = computed(() => (B, q) => {
      const ve = set(dt(/* @__PURE__ */ new Date()), {
          month: Y.value(B),
          year: d.value(B)
        }),
        pe = q ? endOfYear(ve) : startOfYear(ve)
      return Nn(pe, a.value.maxDate, a.value.minDate, c.preventMinMaxNavigation, q)
    }),
    F = () => Array.isArray(u.value) && e.value.solo && u.value[1],
    L = () => {
      for (let B = 0; B < e.value.count; B++)
        if (B === 0) n.value[B] = n.value[0]
        else if (B === e.value.count - 1 && F())
          n.value[B] = {
            month: getMonth(u.value[1]),
            year: getYear(u.value[1])
          }
        else {
          const q = set(K(), n.value[B - 1])
          n.value[B] = { month: getMonth(q), year: getYear(addYears(q, 1)) }
        }
    },
    _ = (B) => {
      if (!B) return L()
      const q = set(K(), n.value[B])
      return ((n.value[0].year = getYear(subYears(q, e.value.count - 1))), L())
    },
    h2 = (B, q) => {
      const ve = differenceInYears(q, B)
      return t.value.showLastInRange && ve > 1 ? q : B
    },
    R = (B) => (c.focusStartDate || e.value.solo ? B[0] : B[1] ? h2(B[0], B[1]) : B[0]),
    b = () => {
      if (u.value) {
        const B = Array.isArray(u.value) ? R(u.value) : u.value
        n.value[0] = { month: getMonth(B), year: getYear(B) }
      }
    },
    j = () => {
      ;(b(), e.value.count && L())
    }
  ;(watch(u, (B, q) => {
    c.isTextInputDate && JSON.stringify(B ?? {}) !== JSON.stringify(q ?? {}) && j()
  }),
    onMounted(() => {
      j()
    }))
  const z = (B, q) => {
      ;((n.value[q].year = B),
        f('update-month-year', { instance: q, year: B, month: n.value[q].month }),
        e.value.count && !e.value.solo && _(q))
    },
    ae = computed(
      () => (B) =>
        Wt(O.value, (q) => {
          var N
          const ve = d.value(B) === q.value,
            pe =
              xt(q.value, Vt(a.value.minDate), Vt(a.value.maxDate)) ||
              ((N = p.value.years) == null ? void 0 : N.includes(d.value(B))),
            v = Za(r.value, q.value)
          return { active: ve, disabled: pe, highlighted: v }
        })
    ),
    H = (B, q) => {
      ;(z(B, q), Q(q))
    },
    D = (B, q = false) => {
      if (!P.value(B, q)) {
        const ve = q ? d.value(B) + 1 : d.value(B) - 1
        z(ve, B)
      }
    },
    Q = (B, q = false, ve) => {
      ;(q || f('reset-flow'),
        ve !== void 0 ? (m.value[B] = ve) : (m.value[B] = !m.value[B]),
        m.value[B]
          ? f('overlay-toggle', { open: true, overlay: qe.year })
          : (f('overlay-closed'), f('overlay-toggle', { open: false, overlay: qe.year })))
    }
  return {
    isDisabled: P,
    groupedYears: ae,
    showYearPicker: m,
    selectYear: z,
    toggleYearPicker: Q,
    handleYearSelect: H,
    handleYear: D
  }
}
var yr = (e, t) => {
  const {
      defaultedMultiCalendars: r,
      defaultedAriaLabels: a,
      defaultedTransitions: n,
      defaultedConfig: u,
      defaultedRange: c,
      defaultedHighlight: p,
      propDates: d,
      defaultedTz: Y,
      defaultedFilters: f,
      defaultedMultiDates: O
    } = Ye(e),
    m = () => {
      e.isTextInputDate && j(getYear(K(e.startDate)), 0)
    },
    { modelValue: P, year: F, month: L, calendars: _ } = la(e, t, m),
    h2 = computed(() => Sn(e.formatLocale, e.locale, e.monthNameFormat)),
    R = ref(null),
    { checkMinMaxRange: b } = Pt(e),
    {
      selectYear: j,
      groupedYears: z,
      showYearPicker: ae,
      toggleYearPicker: H,
      handleYearSelect: D,
      handleYear: Q,
      isDisabled: B
    } = Vn({
      modelValue: P,
      multiCalendars: r,
      range: c,
      highlight: p,
      calendars: _,
      year: F,
      propDates: d,
      month: L,
      filters: f,
      props: e,
      emit: t
    })
  onMounted(() => {
    e.startDate && ((P.value && e.focusStartDate) || !P.value) && j(getYear(K(e.startDate)), 0)
  })
  const q = (T) => (T ? { month: getMonth(T), year: getYear(T) } : { month: null, year: null }),
    ve = () => (P.value ? (Array.isArray(P.value) ? P.value.map((T) => q(T)) : q(P.value)) : q()),
    pe = (T, re) => {
      const l = _.value[T],
        w = ve()
      return Array.isArray(w)
        ? w.some((oe) => oe.year === (l == null ? void 0 : l.year) && oe.month === re)
        : (l == null ? void 0 : l.year) === w.year && re === w.month
    },
    v = (T, re, l) => {
      var oe, M
      const w = ve()
      return Array.isArray(w)
        ? F.value(re) === ((oe = w[l]) == null ? void 0 : oe.year) && T === ((M = w[l]) == null ? void 0 : M.month)
        : false
    },
    N = (T, re) => {
      if (c.value.enabled) {
        const l = ve()
        if (Array.isArray(P.value) && Array.isArray(l)) {
          const w = v(T, re, 0) || v(T, re, 1),
            oe = ht(dt(K()), T, F.value(re))
          return ea(P.value, R.value, oe) && !w
        }
        return false
      }
      return false
    },
    ee = computed(
      () => (T) =>
        Wt(h2.value, (re) => {
          var he
          const l = pe(T, re.value),
            w =
              xt(re.value, _n(F.value(T), d.value.minDate), Yn(F.value(T), d.value.maxDate)) ||
              Fl(d.value.disabledDates, F.value(T), re.value) ||
              ((he = f.value.months) == null ? void 0 : he.includes(re.value)) ||
              !zl(d.value.allowedDates, F.value(T), re.value),
            oe = N(re.value, T),
            M = Fn(p.value, re.value, F.value(T))
          return { active: l, disabled: w, isBetween: oe, highlighted: M }
        })
    ),
    y = (T, re) => ht(dt(K()), T, F.value(re)),
    U = (T, re) => {
      const l = P.value ? P.value : dt(/* @__PURE__ */ new Date())
      ;((P.value = ht(l, T, F.value(re))), t('auto-apply'), t('update-flow-step'))
    },
    S = (T, re) => {
      const l = y(T, re)
      ;(c.value.fixedEnd || c.value.fixedStart
        ? (P.value = Wn(l, P, t, c))
        : P.value
          ? b(l, P.value) && (P.value = en(P, y(T, re), t))
          : (P.value = [y(T, re)]),
        nextTick().then(() => {
          ga(P.value, t, e.autoApply, e.modelAuto)
        }))
    },
    Z = (T, re) => {
      ;(xa(y(T, re), P, O.value.limit), t('auto-apply', true))
    },
    A = (T, re) => (
      (_.value[re].month = T),
      i(re, _.value[re].year, T),
      O.value.enabled ? Z(T, re) : c.value.enabled ? S(T, re) : U(T, re)
    ),
    ie = (T, re) => {
      ;(j(T, re), i(re, T, null))
    },
    i = (T, re, l) => {
      let w = l
      if (!w && w !== 0) {
        const oe = ve()
        w = Array.isArray(oe) ? oe[T].month : oe.month
      }
      t('update-month-year', { instance: T, year: re, month: w })
    }
  return {
    groupedMonths: ee,
    groupedYears: z,
    year: F,
    isDisabled: B,
    defaultedMultiCalendars: r,
    defaultedAriaLabels: a,
    defaultedTransitions: n,
    defaultedConfig: u,
    showYearPicker: ae,
    modelValue: P,
    presetDate: (T, re) => {
      ;(Un({
        value: T,
        modelValue: P,
        range: c.value.enabled,
        timezone: re ? void 0 : Y.value.timezone
      }),
        t('auto-apply'))
    },
    setHoverDate: (T, re) => {
      R.value = y(T, re)
    },
    selectMonth: A,
    selectYear: ie,
    toggleYearPicker: H,
    handleYearSelect: D,
    handleYear: Q,
    getModelMonthYear: ve
  }
}
var gr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: 'MonthPicker',
  props: {
    ...ct
  },
  emits: [
    'update:internal-model-value',
    'overlay-closed',
    'reset-flow',
    'range-start',
    'range-end',
    'auto-apply',
    'update-month-year',
    'update-flow-step',
    'mount',
    'invalid-fixed-range',
    'overlay-toggle'
  ],
  setup(e, { expose: t, emit: r }) {
    const a = r,
      n = useSlots(),
      u = at(n, 'yearMode'),
      c = e
    onMounted(() => {
      c.shadow || a('mount', null)
    })
    const {
      groupedMonths: p,
      groupedYears: d,
      year: Y,
      isDisabled: f,
      defaultedMultiCalendars: O,
      defaultedConfig: m,
      showYearPicker: P,
      modelValue: F,
      presetDate: L,
      setHoverDate: _,
      selectMonth: h2,
      selectYear: R,
      toggleYearPicker: b,
      handleYearSelect: j,
      handleYear: z,
      getModelMonthYear: ae
    } = yr(c, a)
    return (
      t({
        getSidebarProps: () => ({
          modelValue: F,
          year: Y,
          getModelMonthYear: ae,
          selectMonth: h2,
          selectYear: R,
          handleYear: z
        }),
        presetDate: L,
        toggleYearPicker: (D) => b(0, D)
      }),
      (D, Q) => (
        openBlock(),
        createBlock(
          ya,
          {
            'multi-calendars': unref(O).count,
            collapse: D.collapse,
            stretch: '',
            'is-mobile': D.isMobile
          },
          {
            default: withCtx(({ instance: B }) => [
              D.$slots['top-extra']
                ? renderSlot(D.$slots, 'top-extra', {
                    key: 0,
                    value: D.internalModelValue
                  })
                : createCommentVNode('', true),
              D.$slots['month-year']
                ? renderSlot(
                    D.$slots,
                    'month-year',
                    normalizeProps(
                      mergeProps(
                        { key: 1 },
                        {
                          year: unref(Y),
                          months: unref(p)(B),
                          years: unref(d)(B),
                          selectMonth: unref(h2),
                          selectYear: unref(R),
                          instance: B
                        }
                      )
                    )
                  )
                : (openBlock(),
                  createBlock(
                    aa,
                    {
                      key: 2,
                      items: unref(p)(B),
                      'arrow-navigation': D.arrowNavigation,
                      'is-last': D.autoApply && !unref(m).keepActionRow,
                      'esc-close': D.escClose,
                      height: unref(m).modeHeight,
                      config: D.config,
                      'no-overlay-focus': !!(D.noOverlayFocus || D.textInput),
                      'use-relative': '',
                      type: 'month',
                      onSelected: (q) => unref(h2)(q, B),
                      onHoverValue: (q) => unref(_)(q, B)
                    },
                    createSlots(
                      {
                        header: withCtx(() => [
                          createVNode(
                            Hn,
                            mergeProps(D.$props, {
                              items: unref(d)(B),
                              instance: B,
                              'show-year-picker': unref(P)[B],
                              year: unref(Y)(B),
                              'is-disabled': (q) => unref(f)(B, q),
                              onHandleYear: (q) => unref(z)(B, q),
                              onYearSelect: (q) => unref(j)(q, B),
                              onToggleYearPicker: (q) =>
                                unref(b)(B, q == null ? void 0 : q.flow, q == null ? void 0 : q.show)
                            }),
                            createSlots({ _: 2 }, [
                              renderList(unref(u), (q, ve) => ({
                                name: q,
                                fn: withCtx((pe) => [renderSlot(D.$slots, q, normalizeProps(guardReactiveProps(pe)))])
                              }))
                            ]),
                            1040,
                            [
                              'items',
                              'instance',
                              'show-year-picker',
                              'year',
                              'is-disabled',
                              'onHandleYear',
                              'onYearSelect',
                              'onToggleYearPicker'
                            ]
                          )
                        ]),
                        _: 2
                      },
                      [
                        D.$slots['month-overlay-value']
                          ? {
                              name: 'item',
                              fn: withCtx(({ item: q }) => [
                                renderSlot(D.$slots, 'month-overlay-value', {
                                  text: q.text,
                                  value: q.value
                                })
                              ]),
                              key: '0'
                            }
                          : void 0
                      ]
                    ),
                    1032,
                    [
                      'items',
                      'arrow-navigation',
                      'is-last',
                      'esc-close',
                      'height',
                      'config',
                      'no-overlay-focus',
                      'onSelected',
                      'onHoverValue'
                    ]
                  ))
            ]),
            _: 3
          },
          8,
          ['multi-calendars', 'collapse', 'is-mobile']
        )
      )
    )
  }
})
var hr = (e, t) => {
  const r = () => {
      e.isTextInputDate && (f.value = getYear(K(e.startDate)))
    },
    { modelValue: a } = la(e, t, r),
    n = ref(null),
    { defaultedHighlight: u, defaultedMultiDates: c, defaultedFilters: p, defaultedRange: d, propDates: Y } = Ye(e),
    f = ref()
  onMounted(() => {
    e.startDate && ((a.value && e.focusStartDate) || !a.value) && (f.value = getYear(K(e.startDate)))
  })
  const O = (b) =>
      Array.isArray(a.value) ? a.value.some((j) => getYear(j) === b) : a.value ? getYear(a.value) === b : false,
    m = (b) => (d.value.enabled && Array.isArray(a.value) ? ea(a.value, n.value, _(b)) : false),
    P = (b) =>
      Y.value.allowedDates instanceof Map
        ? Y.value.allowedDates.size
          ? Y.value.allowedDates.has(`${b}`)
          : false
        : true,
    F = (b) =>
      Y.value.disabledDates instanceof Map
        ? Y.value.disabledDates.size
          ? Y.value.disabledDates.has(`${b}`)
          : false
        : true,
    L = computed(() =>
      Wt(qa(e.yearRange, e.locale, e.reverseYears), (b) => {
        const j = O(b.value),
          z =
            xt(b.value, Vt(Y.value.minDate), Vt(Y.value.maxDate)) ||
            p.value.years.includes(b.value) ||
            !P(b.value) ||
            F(b.value),
          ae = m(b.value) && !j,
          H = Za(u.value, b.value)
        return { active: j, disabled: z, isBetween: ae, highlighted: H }
      })
    ),
    _ = (b) => setYear(dt(startOfYear(/* @__PURE__ */ new Date())), b)
  return {
    groupedYears: L,
    modelValue: a,
    focusYear: f,
    setHoverValue: (b) => {
      n.value = setYear(dt(/* @__PURE__ */ new Date()), b)
    },
    selectYear: (b) => {
      var j
      if ((t('update-month-year', { instance: 0, year: b }), c.value.enabled))
        return (
          a.value
            ? Array.isArray(a.value) &&
              (((j = a.value) == null ? void 0 : j.map((ae) => getYear(ae))).includes(b)
                ? (a.value = a.value.filter((ae) => getYear(ae) !== b))
                : a.value.push(setYear(je(K()), b)))
            : (a.value = [setYear(je(startOfYear(K())), b)]),
          t('auto-apply', true)
        )
      d.value.enabled
        ? ((a.value = en(a, _(b), t)),
          nextTick().then(() => {
            ga(a.value, t, e.autoApply, e.modelAuto)
          }))
        : ((a.value = _(b)), t('auto-apply'))
    }
  }
}
var br = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: 'YearPicker',
  props: {
    ...ct
  },
  emits: ['update:internal-model-value', 'reset-flow', 'range-start', 'range-end', 'auto-apply', 'update-month-year'],
  setup(e, { expose: t, emit: r }) {
    const a = r,
      n = e,
      { groupedYears: u, modelValue: c, focusYear: p, selectYear: d, setHoverValue: Y } = hr(n, a),
      { defaultedConfig: f } = Ye(n)
    return (
      t({
        getSidebarProps: () => ({
          modelValue: c,
          selectYear: d
        })
      }),
      (m, P) => (
        openBlock(),
        createElementBlock('div', null, [
          m.$slots['top-extra']
            ? renderSlot(m.$slots, 'top-extra', {
                key: 0,
                value: m.internalModelValue
              })
            : createCommentVNode('', true),
          m.$slots['month-year']
            ? renderSlot(
                m.$slots,
                'month-year',
                normalizeProps(
                  mergeProps(
                    { key: 1 },
                    {
                      years: unref(u),
                      selectYear: unref(d)
                    }
                  )
                )
              )
            : (openBlock(),
              createBlock(
                aa,
                {
                  key: 2,
                  items: unref(u),
                  'is-last': m.autoApply && !unref(f).keepActionRow,
                  height: unref(f).modeHeight,
                  config: m.config,
                  'no-overlay-focus': !!(m.noOverlayFocus || m.textInput),
                  'focus-value': unref(p),
                  type: 'year',
                  'use-relative': '',
                  onSelected: unref(d),
                  onHoverValue: unref(Y)
                },
                createSlots({ _: 2 }, [
                  m.$slots['year-overlay-value']
                    ? {
                        name: 'item',
                        fn: withCtx(({ item: F }) => [
                          renderSlot(m.$slots, 'year-overlay-value', {
                            text: F.text,
                            value: F.value
                          })
                        ]),
                        key: '0'
                      }
                    : void 0
                ]),
                1032,
                [
                  'items',
                  'is-last',
                  'height',
                  'config',
                  'no-overlay-focus',
                  'focus-value',
                  'onSelected',
                  'onHoverValue'
                ]
              ))
        ])
      )
    )
  }
})
var kr = {
  key: 0,
  class: 'dp__time_input'
}
var wr = ['data-compact', 'data-collapsed']
var Dr = ['data-test-id', 'aria-label', 'onKeydown', 'onClick', 'onMousedown']
var Mr = ['aria-label', 'disabled', 'data-test-id', 'onKeydown', 'onClick']
var $r = ['data-test-id', 'aria-label', 'onKeydown', 'onClick', 'onMousedown']
var Ar = { key: 0 }
var Tr = ['aria-label', 'data-compact']
var Sr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: 'TimeInput',
  props: {
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 },
    seconds: { type: Number, default: 0 },
    closeTimePickerBtn: { type: Object, default: null },
    order: { type: Number, default: 0 },
    disabledTimesConfig: { type: Function, default: null },
    validateTime: { type: Function, default: () => false },
    ...ct
  },
  emits: [
    'set-hours',
    'set-minutes',
    'update:hours',
    'update:minutes',
    'update:seconds',
    'reset-flow',
    'mounted',
    'overlay-closed',
    'overlay-opened',
    'am-pm-change'
  ],
  setup(e, { expose: t, emit: r }) {
    const a = r,
      n = e,
      { setTimePickerElements: u, setTimePickerBackRef: c } = St(),
      {
        defaultedAriaLabels: p,
        defaultedTransitions: d,
        defaultedFilters: Y,
        defaultedConfig: f,
        defaultedRange: O,
        defaultedMultiCalendars: m
      } = Ye(n),
      { transitionName: P, showTransition: F } = na(d),
      L = reactive({
        hours: false,
        minutes: false,
        seconds: false
      }),
      _ = ref('AM'),
      h2 = ref(null),
      R = ref([]),
      b = ref(),
      j = ref(false)
    onMounted(() => {
      a('mounted')
    })
    const z = (o) =>
        set(/* @__PURE__ */ new Date(), {
          hours: o.hours,
          minutes: o.minutes,
          seconds: n.enableSeconds ? o.seconds : 0,
          milliseconds: 0
        }),
      ae = computed(() => (o) => S(o, n[o]) || D(o, n[o])),
      H = computed(() => ({ hours: n.hours, minutes: n.minutes, seconds: n.seconds })),
      D = (o, E) => (O.value.enabled && !O.value.disableTimeRangeValidation ? !n.validateTime(o, E) : false),
      Q = (o, E) => {
        if (O.value.enabled && !O.value.disableTimeRangeValidation) {
          const fe = E ? +n[`${o}Increment`] : -+n[`${o}Increment`],
            I = n[o] + fe
          return !n.validateTime(o, I)
        }
        return false
      },
      B = computed(() => (o) => !W(+n[o] + +n[`${o}Increment`], o) || Q(o, true)),
      q = computed(() => (o) => !W(+n[o] - +n[`${o}Increment`], o) || Q(o, false)),
      ve = (o, E) => add(set(K(), o), E),
      pe = (o, E) => sub(set(K(), o), E),
      v = computed(() => ({
        dp__time_col: true,
        dp__time_col_block: !n.timePickerInline,
        dp__time_col_reg_block: !n.enableSeconds && n.is24 && !n.timePickerInline,
        dp__time_col_reg_inline: !n.enableSeconds && n.is24 && n.timePickerInline,
        dp__time_col_reg_with_button: !n.enableSeconds && !n.is24,
        dp__time_col_sec: n.enableSeconds && n.is24,
        dp__time_col_sec_with_button: n.enableSeconds && !n.is24
      })),
      N = computed(() => n.timePickerInline && O.value.enabled && !m.value.count),
      ee = computed(() => {
        const o = [{ type: 'hours' }]
        return (
          n.enableMinutes &&
            o.push(
              { type: '', separator: true },
              {
                type: 'minutes'
              }
            ),
          n.enableSeconds &&
            o.push(
              { type: '', separator: true },
              {
                type: 'seconds'
              }
            ),
          o
        )
      }),
      y = computed(() => ee.value.filter((o) => !o.separator)),
      U = computed(() => (o) => {
        if (o === 'hours') {
          const E = oe(+n.hours)
          return { text: E < 10 ? `0${E}` : `${E}`, value: E }
        }
        return { text: n[o] < 10 ? `0${n[o]}` : `${n[o]}`, value: n[o] }
      }),
      S = (o, E) => {
        var I
        if (!n.disabledTimesConfig) return false
        const fe = n.disabledTimesConfig(n.order, o === 'hours' ? E : void 0)
        return fe[o] ? !!((I = fe[o]) != null && I.includes(E)) : true
      },
      Z = (o, E) => (E !== 'hours' || _.value === 'AM' ? o : o + 12),
      A = (o) => {
        const E = n.is24 ? 24 : 12,
          fe = o === 'hours' ? E : 60,
          I = +n[`${o}GridIncrement`],
          $e = o === 'hours' && !n.is24 ? I : 0,
          be = []
        for (let Pe = $e; Pe < fe; Pe += I)
          be.push({ value: n.is24 ? Pe : Z(Pe, o), text: Pe < 10 ? `0${Pe}` : `${Pe}` })
        return (
          o === 'hours' && !n.is24 && be.unshift({ value: _.value === 'PM' ? 12 : 0, text: '12' }),
          Wt(be, (Pe) => ({
            active: false,
            disabled: Y.value.times[o].includes(Pe.value) || !W(Pe.value, o) || S(o, Pe.value) || D(o, Pe.value)
          }))
        )
      },
      ie = (o) => (o >= 0 ? o : 59),
      i = (o) => (o >= 0 ? o : 23),
      W = (o, E) => {
        const fe = n.minTime ? z(Sa(n.minTime)) : null,
          I = n.maxTime ? z(Sa(n.maxTime)) : null,
          $e = z(Sa(H.value, E, E === 'minutes' || E === 'seconds' ? ie(o) : i(o)))
        return fe && I
          ? (isBefore($e, I) || isEqual($e, I)) && (isAfter($e, fe) || isEqual($e, fe))
          : fe
            ? isAfter($e, fe) || isEqual($e, fe)
            : I
              ? isBefore($e, I) || isEqual($e, I)
              : true
      },
      se = (o) => n[`no${o[0].toUpperCase() + o.slice(1)}Overlay`],
      T = (o) => {
        se(o) ||
          ((L[o] = !L[o]),
          L[o] ? ((j.value = true), a('overlay-opened', o)) : ((j.value = false), a('overlay-closed', o)))
      },
      re = (o) => (o === 'hours' ? getHours : o === 'minutes' ? getMinutes : getSeconds),
      l = () => {
        b.value && clearTimeout(b.value)
      },
      w = (o, E = true, fe) => {
        const I = E ? ve : pe,
          $e = E ? +n[`${o}Increment`] : -+n[`${o}Increment`]
        ;(W(+n[o] + $e, o) && a(`update:${o}`, re(o)(I({ [o]: +n[o] }, { [o]: +n[`${o}Increment`] }))),
          !(fe != null && fe.keyboard) &&
            f.value.timeArrowHoldThreshold &&
            (b.value = setTimeout(() => {
              w(o, E)
            }, f.value.timeArrowHoldThreshold)))
      },
      oe = (o) => (n.is24 ? o : (o >= 12 ? (_.value = 'PM') : (_.value = 'AM'), Tl(o))),
      M = () => {
        ;(_.value === 'PM'
          ? ((_.value = 'AM'), a('update:hours', n.hours - 12))
          : ((_.value = 'PM'), a('update:hours', n.hours + 12)),
          a('am-pm-change', _.value))
      },
      he = (o) => {
        L[o] = true
      },
      ke = (o, E, fe) => {
        if (o && n.arrowNavigation) {
          Array.isArray(R.value[E]) ? (R.value[E][fe] = o) : (R.value[E] = [o])
          const I = R.value.reduce(($e, be) => be.map((Pe, Ee) => [...($e[Ee] || []), be[Ee]]), [])
          ;(c(n.closeTimePickerBtn), h2.value && (I[1] = I[1].concat(h2.value)), u(I, n.order))
        }
      },
      le = (o, E) => (T(o), a(`update:${o}`, E))
    return (
      t({ openChildCmp: he }),
      (o, E) => {
        var fe
        return o.disabled
          ? createCommentVNode('', true)
          : (openBlock(),
            createElementBlock('div', kr, [
              (openBlock(true),
              createElementBlock(
                Fragment,
                null,
                renderList(ee.value, (I, $e) => {
                  var be, Pe, Ee
                  return (
                    openBlock(),
                    createElementBlock(
                      'div',
                      {
                        key: $e,
                        class: normalizeClass(v.value),
                        'data-compact': N.value && !o.enableSeconds,
                        'data-collapsed': N.value && o.enableSeconds
                      },
                      [
                        I.separator
                          ? (openBlock(),
                            createElementBlock(
                              Fragment,
                              { key: 0 },
                              [
                                j.value
                                  ? createCommentVNode('', true)
                                  : (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(':')], 64))
                              ],
                              64
                            ))
                          : (openBlock(),
                            createElementBlock(
                              Fragment,
                              { key: 1 },
                              [
                                createBaseVNode(
                                  'button',
                                  {
                                    ref_for: true,
                                    ref: (Be) => ke(Be, $e, 0),
                                    type: 'button',
                                    class: normalizeClass({
                                      dp__btn: true,
                                      dp__inc_dec_button: !o.timePickerInline,
                                      dp__inc_dec_button_inline: o.timePickerInline,
                                      dp__tp_inline_btn_top: o.timePickerInline,
                                      dp__inc_dec_button_disabled: B.value(I.type),
                                      'dp--hidden-el': j.value
                                    }),
                                    'data-test-id': `${I.type}-time-inc-btn-${n.order}`,
                                    'aria-label': (be = unref(p)) == null ? void 0 : be.incrementValue(I.type),
                                    tabindex: '0',
                                    onKeydown: (Be) => unref(xe)(Be, () => w(I.type, true, { keyboard: true }), true),
                                    onClick: (Be) => (unref(f).timeArrowHoldThreshold ? void 0 : w(I.type, true)),
                                    onMousedown: (Be) => (unref(f).timeArrowHoldThreshold ? w(I.type, true) : void 0),
                                    onMouseup: l
                                  },
                                  [
                                    n.timePickerInline
                                      ? (openBlock(),
                                        createElementBlock(
                                          Fragment,
                                          { key: 1 },
                                          [
                                            o.$slots['tp-inline-arrow-up']
                                              ? renderSlot(o.$slots, 'tp-inline-arrow-up', { key: 0 })
                                              : (openBlock(),
                                                createElementBlock(
                                                  Fragment,
                                                  { key: 1 },
                                                  [
                                                    E[2] ||
                                                      (E[2] = createBaseVNode(
                                                        'span',
                                                        { class: 'dp__tp_inline_btn_bar dp__tp_btn_in_l' },
                                                        null,
                                                        -1
                                                      )),
                                                    E[3] ||
                                                      (E[3] = createBaseVNode(
                                                        'span',
                                                        { class: 'dp__tp_inline_btn_bar dp__tp_btn_in_r' },
                                                        null,
                                                        -1
                                                      ))
                                                  ],
                                                  64
                                                ))
                                          ],
                                          64
                                        ))
                                      : (openBlock(),
                                        createElementBlock(
                                          Fragment,
                                          { key: 0 },
                                          [
                                            o.$slots['arrow-up']
                                              ? renderSlot(o.$slots, 'arrow-up', { key: 0 })
                                              : createCommentVNode('', true),
                                            o.$slots['arrow-up']
                                              ? createCommentVNode('', true)
                                              : (openBlock(), createBlock(unref(Ka), { key: 1 }))
                                          ],
                                          64
                                        ))
                                  ],
                                  42,
                                  Dr
                                ),
                                createBaseVNode(
                                  'button',
                                  {
                                    ref_for: true,
                                    ref: (Be) => ke(Be, $e, 1),
                                    type: 'button',
                                    'aria-label': `${U.value(I.type).text}-${(Pe = unref(p)) == null ? void 0 : Pe.openTpOverlay(I.type)}`,
                                    class: normalizeClass({
                                      dp__time_display: true,
                                      dp__time_display_block: !o.timePickerInline,
                                      dp__time_display_inline: o.timePickerInline,
                                      'dp--time-invalid': ae.value(I.type),
                                      'dp--time-overlay-btn': !ae.value(I.type),
                                      'dp--hidden-el': j.value
                                    }),
                                    disabled: se(I.type),
                                    tabindex: '0',
                                    'data-test-id': `${I.type}-toggle-overlay-btn-${n.order}`,
                                    onKeydown: (Be) => unref(xe)(Be, () => T(I.type), true),
                                    onClick: (Be) => T(I.type)
                                  },
                                  [
                                    o.$slots[I.type]
                                      ? renderSlot(o.$slots, I.type, {
                                          key: 0,
                                          text: U.value(I.type).text,
                                          value: U.value(I.type).value
                                        })
                                      : createCommentVNode('', true),
                                    o.$slots[I.type]
                                      ? createCommentVNode('', true)
                                      : (openBlock(),
                                        createElementBlock(
                                          Fragment,
                                          { key: 1 },
                                          [createTextVNode(toDisplayString(U.value(I.type).text), 1)],
                                          64
                                        ))
                                  ],
                                  42,
                                  Mr
                                ),
                                createBaseVNode(
                                  'button',
                                  {
                                    ref_for: true,
                                    ref: (Be) => ke(Be, $e, 2),
                                    type: 'button',
                                    class: normalizeClass({
                                      dp__btn: true,
                                      dp__inc_dec_button: !o.timePickerInline,
                                      dp__inc_dec_button_inline: o.timePickerInline,
                                      dp__tp_inline_btn_bottom: o.timePickerInline,
                                      dp__inc_dec_button_disabled: q.value(I.type),
                                      'dp--hidden-el': j.value
                                    }),
                                    'data-test-id': `${I.type}-time-dec-btn-${n.order}`,
                                    'aria-label': (Ee = unref(p)) == null ? void 0 : Ee.decrementValue(I.type),
                                    tabindex: '0',
                                    onKeydown: (Be) => unref(xe)(Be, () => w(I.type, false, { keyboard: true }), true),
                                    onClick: (Be) => (unref(f).timeArrowHoldThreshold ? void 0 : w(I.type, false)),
                                    onMousedown: (Be) => (unref(f).timeArrowHoldThreshold ? w(I.type, false) : void 0),
                                    onMouseup: l
                                  },
                                  [
                                    n.timePickerInline
                                      ? (openBlock(),
                                        createElementBlock(
                                          Fragment,
                                          { key: 1 },
                                          [
                                            o.$slots['tp-inline-arrow-down']
                                              ? renderSlot(o.$slots, 'tp-inline-arrow-down', { key: 0 })
                                              : (openBlock(),
                                                createElementBlock(
                                                  Fragment,
                                                  { key: 1 },
                                                  [
                                                    E[4] ||
                                                      (E[4] = createBaseVNode(
                                                        'span',
                                                        { class: 'dp__tp_inline_btn_bar dp__tp_btn_in_l' },
                                                        null,
                                                        -1
                                                      )),
                                                    E[5] ||
                                                      (E[5] = createBaseVNode(
                                                        'span',
                                                        { class: 'dp__tp_inline_btn_bar dp__tp_btn_in_r' },
                                                        null,
                                                        -1
                                                      ))
                                                  ],
                                                  64
                                                ))
                                          ],
                                          64
                                        ))
                                      : (openBlock(),
                                        createElementBlock(
                                          Fragment,
                                          { key: 0 },
                                          [
                                            o.$slots['arrow-down']
                                              ? renderSlot(o.$slots, 'arrow-down', { key: 0 })
                                              : createCommentVNode('', true),
                                            o.$slots['arrow-down']
                                              ? createCommentVNode('', true)
                                              : (openBlock(), createBlock(unref(Ga), { key: 1 }))
                                          ],
                                          64
                                        ))
                                  ],
                                  42,
                                  $r
                                )
                              ],
                              64
                            ))
                      ],
                      10,
                      wr
                    )
                  )
                }),
                128
              )),
              o.is24
                ? createCommentVNode('', true)
                : (openBlock(),
                  createElementBlock('div', Ar, [
                    o.$slots['am-pm-button']
                      ? renderSlot(o.$slots, 'am-pm-button', {
                          key: 0,
                          toggle: M,
                          value: _.value
                        })
                      : createCommentVNode('', true),
                    o.$slots['am-pm-button']
                      ? createCommentVNode('', true)
                      : (openBlock(),
                        createElementBlock(
                          'button',
                          {
                            key: 1,
                            ref_key: 'amPmButton',
                            ref: h2,
                            type: 'button',
                            class: 'dp__pm_am_button',
                            role: 'button',
                            'aria-label': (fe = unref(p)) == null ? void 0 : fe.amPmButton,
                            tabindex: '0',
                            'data-compact': N.value,
                            onClick: M,
                            onKeydown: E[0] || (E[0] = (I) => unref(xe)(I, () => M(), true))
                          },
                          toDisplayString(_.value),
                          41,
                          Tr
                        ))
                  ])),
              (openBlock(true),
              createElementBlock(
                Fragment,
                null,
                renderList(
                  y.value,
                  (I, $e) => (
                    openBlock(),
                    createBlock(
                      Transition,
                      {
                        key: $e,
                        name: unref(P)(L[I.type]),
                        css: unref(F)
                      },
                      {
                        default: withCtx(() => {
                          var be, Pe
                          return [
                            L[I.type]
                              ? (openBlock(),
                                createBlock(
                                  aa,
                                  {
                                    key: 0,
                                    items: A(I.type),
                                    'is-last': o.autoApply && !unref(f).keepActionRow,
                                    'esc-close': o.escClose,
                                    type: I.type,
                                    'text-input': o.textInput,
                                    config: o.config,
                                    'arrow-navigation': o.arrowNavigation,
                                    'aria-labels': o.ariaLabels,
                                    'overlay-label':
                                      (Pe = (be = unref(p)).timeOverlay) == null ? void 0 : Pe.call(be, I.type),
                                    onSelected: (Ee) => le(I.type, Ee),
                                    onToggle: (Ee) => T(I.type),
                                    onResetFlow: E[1] || (E[1] = (Ee) => o.$emit('reset-flow'))
                                  },
                                  createSlots(
                                    {
                                      'button-icon': withCtx(() => [
                                        o.$slots['clock-icon']
                                          ? renderSlot(o.$slots, 'clock-icon', { key: 0 })
                                          : createCommentVNode('', true),
                                        o.$slots['clock-icon']
                                          ? createCommentVNode('', true)
                                          : (openBlock(),
                                            createBlock(
                                              resolveDynamicComponent(o.timePickerInline ? unref(Gt) : unref(ja)),
                                              { key: 1 }
                                            ))
                                      ]),
                                      _: 2
                                    },
                                    [
                                      o.$slots[`${I.type}-overlay-value`]
                                        ? {
                                            name: 'item',
                                            fn: withCtx(({ item: Ee }) => [
                                              renderSlot(o.$slots, `${I.type}-overlay-value`, {
                                                text: Ee.text,
                                                value: Ee.value
                                              })
                                            ]),
                                            key: '0'
                                          }
                                        : void 0,
                                      o.$slots[`${I.type}-overlay-header`]
                                        ? {
                                            name: 'header',
                                            fn: withCtx(() => [
                                              renderSlot(o.$slots, `${I.type}-overlay-header`, {
                                                toggle: () => T(I.type)
                                              })
                                            ]),
                                            key: '1'
                                          }
                                        : void 0
                                    ]
                                  ),
                                  1032,
                                  [
                                    'items',
                                    'is-last',
                                    'esc-close',
                                    'type',
                                    'text-input',
                                    'config',
                                    'arrow-navigation',
                                    'aria-labels',
                                    'overlay-label',
                                    'onSelected',
                                    'onToggle'
                                  ]
                                ))
                              : createCommentVNode('', true)
                          ]
                        }),
                        _: 2
                      },
                      1032,
                      ['name', 'css']
                    )
                  )
                ),
                128
              ))
            ]))
      }
    )
  }
})
var Pr = ['data-dp-mobile']
var Rr = ['aria-label', 'tabindex']
var Cr = ['role', 'aria-label', 'tabindex']
var Or = ['aria-label']
var jn = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: 'TimePicker',
  props: {
    hours: { type: [Number, Array], default: 0 },
    minutes: { type: [Number, Array], default: 0 },
    seconds: { type: [Number, Array], default: 0 },
    disabledTimesConfig: { type: Function, default: null },
    validateTime: {
      type: Function,
      default: () => false
    },
    ...ct
  },
  emits: [
    'update:hours',
    'update:minutes',
    'update:seconds',
    'mount',
    'reset-flow',
    'overlay-opened',
    'overlay-closed',
    'am-pm-change'
  ],
  setup(e, { expose: t, emit: r }) {
    const a = r,
      n = e,
      { buildMatrix: u, setTimePicker: c } = St(),
      p = useSlots(),
      {
        defaultedTransitions: d,
        defaultedAriaLabels: Y,
        defaultedTextInput: f,
        defaultedConfig: O,
        defaultedRange: m
      } = Ye(n),
      { transitionName: P, showTransition: F } = na(d),
      { hideNavigationButtons: L } = ha(),
      _ = ref(null),
      h2 = ref(null),
      R = ref([]),
      b = ref(null),
      j = ref(false)
    onMounted(() => {
      ;(a('mount'), !n.timePicker && n.arrowNavigation ? u([He(_.value)], 'time') : c(true, n.timePicker))
    })
    const z = computed(() => (m.value.enabled && n.modelAuto ? Pn(n.internalModelValue) : true)),
      ae = ref(false),
      H = (S) => ({
        hours: Array.isArray(n.hours) ? n.hours[S] : n.hours,
        minutes: Array.isArray(n.minutes) ? n.minutes[S] : n.minutes,
        seconds: Array.isArray(n.seconds) ? n.seconds[S] : n.seconds
      }),
      D = computed(() => {
        const S = []
        if (m.value.enabled) for (let Z = 0; Z < 2; Z++) S.push(H(Z))
        else S.push(H(0))
        return S
      }),
      Q = (S, Z = false, A = '') => {
        ;(Z || a('reset-flow'),
          (ae.value = S),
          a(S ? 'overlay-opened' : 'overlay-closed', qe.time),
          n.arrowNavigation && c(S),
          nextTick(() => {
            A !== '' && R.value[0] && R.value[0].openChildCmp(A)
          }))
      },
      B = computed(() => ({
        dp__btn: true,
        dp__button: true,
        dp__button_bottom: n.autoApply && !O.value.keepActionRow
      })),
      q = at(p, 'timePicker'),
      ve = (S, Z, A) => (m.value.enabled ? (Z === 0 ? [S, D.value[1][A]] : [D.value[0][A], S]) : S),
      pe = (S) => {
        a('update:hours', S)
      },
      v = (S) => {
        a('update:minutes', S)
      },
      N = (S) => {
        a('update:seconds', S)
      },
      ee = () => {
        if (b.value && !f.value.enabled && !n.noOverlayFocus) {
          const S = Rn(b.value)
          S && S.focus({ preventScroll: true })
        }
      },
      y = (S) => {
        ;((j.value = false), a('overlay-closed', S))
      },
      U = (S) => {
        ;((j.value = true), a('overlay-opened', S))
      }
    return (
      t({ toggleTimePicker: Q }),
      (S, Z) => {
        var A
        return (
          openBlock(),
          createElementBlock(
            'div',
            {
              class: 'dp--tp-wrap',
              'data-dp-mobile': S.isMobile
            },
            [
              !S.timePicker && !S.timePickerInline
                ? withDirectives(
                    (openBlock(),
                    createElementBlock(
                      'button',
                      {
                        key: 0,
                        ref_key: 'openTimePickerBtn',
                        ref: _,
                        type: 'button',
                        class: normalizeClass({ ...B.value, 'dp--hidden-el': ae.value }),
                        'aria-label': (A = unref(Y)) == null ? void 0 : A.openTimePicker,
                        tabindex: S.noOverlayFocus ? void 0 : 0,
                        'data-test-id': 'open-time-picker-btn',
                        onKeydown: Z[0] || (Z[0] = (ie) => unref(xe)(ie, () => Q(true))),
                        onClick: Z[1] || (Z[1] = (ie) => Q(true))
                      },
                      [
                        S.$slots['clock-icon']
                          ? renderSlot(S.$slots, 'clock-icon', { key: 0 })
                          : createCommentVNode('', true),
                        S.$slots['clock-icon']
                          ? createCommentVNode('', true)
                          : (openBlock(), createBlock(unref(ja), { key: 1 }))
                      ],
                      42,
                      Rr
                    )),
                    [[vShow, !unref(L)(S.hideNavigation, 'time')]]
                  )
                : createCommentVNode('', true),
              createVNode(
                Transition,
                {
                  name: unref(P)(ae.value),
                  css: unref(F) && !S.timePickerInline
                },
                {
                  default: withCtx(() => {
                    var ie, i
                    return [
                      ae.value || S.timePicker || S.timePickerInline
                        ? (openBlock(),
                          createElementBlock(
                            'div',
                            {
                              key: 0,
                              ref_key: 'overlayRef',
                              ref: b,
                              role: S.timePickerInline ? void 0 : 'dialog',
                              class: normalizeClass({
                                dp__overlay: !S.timePickerInline,
                                'dp--overlay-absolute': !n.timePicker && !S.timePickerInline,
                                'dp--overlay-relative': n.timePicker
                              }),
                              style: normalizeStyle(S.timePicker ? { height: `${unref(O).modeHeight}px` } : void 0),
                              'aria-label': (ie = unref(Y)) == null ? void 0 : ie.timePicker,
                              tabindex: S.timePickerInline ? void 0 : 0
                            },
                            [
                              createBaseVNode(
                                'div',
                                {
                                  class: normalizeClass(
                                    S.timePickerInline
                                      ? 'dp__time_picker_inline_container'
                                      : 'dp__overlay_container dp__container_flex dp__time_picker_overlay_container'
                                  ),
                                  style: { display: 'flex' }
                                },
                                [
                                  S.$slots['time-picker-overlay']
                                    ? renderSlot(S.$slots, 'time-picker-overlay', {
                                        key: 0,
                                        hours: e.hours,
                                        minutes: e.minutes,
                                        seconds: e.seconds,
                                        setHours: pe,
                                        setMinutes: v,
                                        setSeconds: N
                                      })
                                    : createCommentVNode('', true),
                                  S.$slots['time-picker-overlay']
                                    ? createCommentVNode('', true)
                                    : (openBlock(),
                                      createElementBlock(
                                        'div',
                                        {
                                          key: 1,
                                          class: normalizeClass(
                                            S.timePickerInline ? 'dp__flex' : 'dp__overlay_row dp__flex_row'
                                          )
                                        },
                                        [
                                          (openBlock(true),
                                          createElementBlock(
                                            Fragment,
                                            null,
                                            renderList(D.value, (W, se) =>
                                              withDirectives(
                                                (openBlock(),
                                                createBlock(
                                                  Sr,
                                                  mergeProps(
                                                    {
                                                      key: se,
                                                      ref_for: true
                                                    },
                                                    {
                                                      ...S.$props,
                                                      order: se,
                                                      hours: W.hours,
                                                      minutes: W.minutes,
                                                      seconds: W.seconds,
                                                      closeTimePickerBtn: h2.value,
                                                      disabledTimesConfig: e.disabledTimesConfig,
                                                      disabled: se === 0 ? unref(m).fixedStart : unref(m).fixedEnd
                                                    },
                                                    {
                                                      ref_for: true,
                                                      ref_key: 'timeInputRefs',
                                                      ref: R,
                                                      'validate-time': (T, re) => e.validateTime(T, ve(re, se, T)),
                                                      'onUpdate:hours': (T) => pe(ve(T, se, 'hours')),
                                                      'onUpdate:minutes': (T) => v(ve(T, se, 'minutes')),
                                                      'onUpdate:seconds': (T) => N(ve(T, se, 'seconds')),
                                                      onMounted: ee,
                                                      onOverlayClosed: y,
                                                      onOverlayOpened: U,
                                                      onAmPmChange: Z[2] || (Z[2] = (T) => S.$emit('am-pm-change', T))
                                                    }
                                                  ),
                                                  createSlots({ _: 2 }, [
                                                    renderList(unref(q), (T, re) => ({
                                                      name: T,
                                                      fn: withCtx((l) => [
                                                        renderSlot(S.$slots, T, mergeProps({ ref_for: true }, l))
                                                      ])
                                                    }))
                                                  ]),
                                                  1040,
                                                  [
                                                    'validate-time',
                                                    'onUpdate:hours',
                                                    'onUpdate:minutes',
                                                    'onUpdate:seconds'
                                                  ]
                                                )),
                                                [[vShow, se === 0 ? true : z.value]]
                                              )
                                            ),
                                            128
                                          ))
                                        ],
                                        2
                                      )),
                                  !S.timePicker && !S.timePickerInline
                                    ? withDirectives(
                                        (openBlock(),
                                        createElementBlock(
                                          'button',
                                          {
                                            key: 2,
                                            ref_key: 'closeTimePickerBtn',
                                            ref: h2,
                                            type: 'button',
                                            class: normalizeClass({ ...B.value, 'dp--hidden-el': j.value }),
                                            'aria-label': (i = unref(Y)) == null ? void 0 : i.closeTimePicker,
                                            tabindex: '0',
                                            onKeydown: Z[3] || (Z[3] = (W) => unref(xe)(W, () => Q(false))),
                                            onClick: Z[4] || (Z[4] = (W) => Q(false))
                                          },
                                          [
                                            S.$slots['calendar-icon']
                                              ? renderSlot(S.$slots, 'calendar-icon', { key: 0 })
                                              : createCommentVNode('', true),
                                            S.$slots['calendar-icon']
                                              ? createCommentVNode('', true)
                                              : (openBlock(), createBlock(unref(Gt), { key: 1 }))
                                          ],
                                          42,
                                          Or
                                        )),
                                        [[vShow, !unref(L)(S.hideNavigation, 'time')]]
                                      )
                                    : createCommentVNode('', true)
                                ],
                                2
                              )
                            ],
                            14,
                            Cr
                          ))
                        : createCommentVNode('', true)
                    ]
                  }),
                  _: 3
                },
                8,
                ['name', 'css']
              )
            ],
            8,
            Pr
          )
        )
      }
    )
  }
})
var Kn = (e, t, r, a) => {
  const { defaultedRange: n } = Ye(e),
    u = (b, j) => (Array.isArray(t[b]) ? t[b][j] : t[b]),
    c = (b) => (e.enableSeconds ? (Array.isArray(t.seconds) ? t.seconds[b] : t.seconds) : 0),
    p = (b, j) =>
      b
        ? j !== void 0
          ? At(b, u('hours', j), u('minutes', j), c(j))
          : At(b, t.hours, t.minutes, c())
        : setSeconds(K(), c(j)),
    d = (b, j) => {
      t[b] = j
    },
    Y = computed(() =>
      e.modelAuto && n.value.enabled ? (Array.isArray(r.value) ? r.value.length > 1 : false) : n.value.enabled
    ),
    f = (b, j) => {
      const z = Object.fromEntries(Object.keys(t).map((ae) => (ae === b ? [ae, j] : [ae, t[ae]].slice())))
      if (Y.value && !n.value.disableTimeRangeValidation) {
        const ae = (D) => (r.value ? At(r.value[D], z.hours[D], z.minutes[D], z.seconds[D]) : null),
          H = (D) => setMilliseconds(r.value[D], 0)
        return !(Te(ae(0), ae(1)) && (isAfter(ae(0), H(1)) || isBefore(ae(1), H(0))))
      }
      return true
    },
    O = (b, j) => {
      f(b, j) && (d(b, j), a && a())
    },
    m = (b) => {
      O('hours', b)
    },
    P = (b) => {
      O('minutes', b)
    },
    F = (b) => {
      O('seconds', b)
    },
    L = (b, j, z, ae) => {
      ;(j && m(b), !j && !z && P(b), z && F(b), r.value && ae(r.value))
    },
    _ = (b) => {
      if (b) {
        const j = Array.isArray(b),
          z = j ? [+b[0].hours, +b[1].hours] : +b.hours,
          ae = j ? [+b[0].minutes, +b[1].minutes] : +b.minutes,
          H = j ? [+b[0].seconds, +b[1].seconds] : +b.seconds
        ;(d('hours', z), d('minutes', ae), e.enableSeconds && d('seconds', H))
      }
    },
    h2 = (b, j) => {
      const z = {
        hours: Array.isArray(t.hours) ? t.hours[b] : t.hours,
        disabledArr: []
      }
      return (
        (j || j === 0) && (z.hours = j),
        Array.isArray(e.disabledTimes) &&
          (z.disabledArr = n.value.enabled && Array.isArray(e.disabledTimes[b]) ? e.disabledTimes[b] : e.disabledTimes),
        z
      )
    },
    R = computed(() => (b, j) => {
      var z
      if (Array.isArray(e.disabledTimes)) {
        const { disabledArr: ae, hours: H } = h2(b, j),
          D = ae.filter((Q) => +Q.hours === H)
        return ((z = D[0]) == null ? void 0 : z.minutes) === '*'
          ? { hours: [H], minutes: void 0, seconds: void 0 }
          : {
              hours: [],
              minutes: (D == null ? void 0 : D.map((Q) => +Q.minutes)) ?? [],
              seconds: (D == null ? void 0 : D.map((Q) => (Q.seconds ? +Q.seconds : void 0))) ?? []
            }
      }
      return { hours: [], minutes: [], seconds: [] }
    })
  return {
    setTime: d,
    updateHours: m,
    updateMinutes: P,
    updateSeconds: F,
    getSetDateTime: p,
    updateTimeValues: L,
    getSecondsValue: c,
    assignStartTime: _,
    validateTime: f,
    disabledTimesConfig: R
  }
}
var Br = (e, t) => {
  const r = () => {
      e.isTextInputDate && j()
    },
    { modelValue: a, time: n } = la(e, t, r),
    { defaultedStartTime: u, defaultedRange: c, defaultedTz: p } = Ye(e),
    {
      updateTimeValues: d,
      getSetDateTime: Y,
      setTime: f,
      assignStartTime: O,
      disabledTimesConfig: m,
      validateTime: P
    } = Kn(e, n, a, F)
  function F() {
    t('update-flow-step')
  }
  const L = (H) => {
      const { hours: D, minutes: Q, seconds: B } = H
      return { hours: +D, minutes: +Q, seconds: B ? +B : 0 }
    },
    _ = () => {
      if (e.startTime) {
        if (Array.isArray(e.startTime)) {
          const D = L(e.startTime[0]),
            Q = L(e.startTime[1])
          return [set(K(), D), set(K(), Q)]
        }
        const H = L(e.startTime)
        return set(K(), H)
      }
      return c.value.enabled ? [null, null] : null
    },
    h2 = () => {
      if (c.value.enabled) {
        const [H, D] = _()
        a.value = [tt(Y(H, 0), p.value.timezone), tt(Y(D, 1), p.value.timezone)]
      } else a.value = tt(Y(_()), p.value.timezone)
    },
    R = (H) => (Array.isArray(H) ? [Yt(K(H[0])), Yt(K(H[1]))] : [Yt(H ?? K())]),
    b = (H, D, Q) => {
      ;(f('hours', H), f('minutes', D), f('seconds', e.enableSeconds ? Q : 0))
    },
    j = () => {
      const [H, D] = R(a.value)
      return c.value.enabled
        ? b([H.hours, D.hours], [H.minutes, D.minutes], [H.seconds, D.seconds])
        : b(H.hours, H.minutes, H.seconds)
    }
  onMounted(() => {
    if (!e.shadow) return (O(u.value), a.value ? j() : h2())
  })
  const z = () => {
    ;(Array.isArray(a.value) ? (a.value = a.value.map((H, D) => H && Y(H, D))) : (a.value = Y(a.value)),
      t('time-update'))
  }
  return {
    modelValue: a,
    time: n,
    disabledTimesConfig: m,
    updateTime: (H, D = true, Q = false) => {
      d(H, D, Q, z)
    },
    validateTime: P
  }
}
var _r = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: 'TimePickerSolo',
  props: {
    ...ct
  },
  emits: [
    'update:internal-model-value',
    'time-update',
    'am-pm-change',
    'mount',
    'reset-flow',
    'update-flow-step',
    'overlay-toggle'
  ],
  setup(e, { expose: t, emit: r }) {
    const a = r,
      n = e,
      u = useSlots(),
      c = at(u, 'timePicker'),
      p = ref(null),
      { time: d, modelValue: Y, disabledTimesConfig: f, updateTime: O, validateTime: m } = Br(n, a)
    return (
      onMounted(() => {
        n.shadow || a('mount', null)
      }),
      t({
        getSidebarProps: () => ({
          modelValue: Y,
          time: d,
          updateTime: O
        }),
        toggleTimePicker: (L, _ = false, h2 = '') => {
          var R
          ;(R = p.value) == null || R.toggleTimePicker(L, _, h2)
        }
      }),
      (L, _) => (
        openBlock(),
        createBlock(
          ya,
          {
            'multi-calendars': 0,
            stretch: '',
            'is-mobile': L.isMobile
          },
          {
            default: withCtx(() => [
              createVNode(
                jn,
                mergeProps(
                  {
                    ref_key: 'tpRef',
                    ref: p
                  },
                  L.$props,
                  {
                    hours: unref(d).hours,
                    minutes: unref(d).minutes,
                    seconds: unref(d).seconds,
                    'internal-model-value': L.internalModelValue,
                    'disabled-times-config': unref(f),
                    'validate-time': unref(m),
                    'onUpdate:hours': _[0] || (_[0] = (h2) => unref(O)(h2)),
                    'onUpdate:minutes': _[1] || (_[1] = (h2) => unref(O)(h2, false)),
                    'onUpdate:seconds': _[2] || (_[2] = (h2) => unref(O)(h2, false, true)),
                    onAmPmChange: _[3] || (_[3] = (h2) => L.$emit('am-pm-change', h2)),
                    onResetFlow: _[4] || (_[4] = (h2) => L.$emit('reset-flow')),
                    onOverlayClosed: _[5] || (_[5] = (h2) => L.$emit('overlay-toggle', { open: false, overlay: h2 })),
                    onOverlayOpened: _[6] || (_[6] = (h2) => L.$emit('overlay-toggle', { open: true, overlay: h2 }))
                  }
                ),
                createSlots({ _: 2 }, [
                  renderList(unref(c), (h2, R) => ({
                    name: h2,
                    fn: withCtx((b) => [renderSlot(L.$slots, h2, normalizeProps(guardReactiveProps(b)))])
                  }))
                ]),
                1040,
                ['hours', 'minutes', 'seconds', 'internal-model-value', 'disabled-times-config', 'validate-time']
              )
            ]),
            _: 3
          },
          8,
          ['is-mobile']
        )
      )
    )
  }
})
var Yr = { class: 'dp--header-wrap' }
var Ir = {
  key: 0,
  class: 'dp__month_year_wrap'
}
var Er = { key: 0 }
var Nr = { class: 'dp__month_year_wrap' }
var Lr = ['data-dp-element', 'aria-label', 'data-test-id', 'onClick', 'onKeydown']
var Fr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: 'DpHeader',
  props: {
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    instance: { type: Number, default: 0 },
    years: { type: Array, default: () => [] },
    months: { type: Array, default: () => [] },
    ...ct
  },
  emits: ['update-month-year', 'mount', 'reset-flow', 'overlay-closed', 'overlay-opened'],
  setup(e, { expose: t, emit: r }) {
    const a = r,
      n = e,
      {
        defaultedTransitions: u,
        defaultedAriaLabels: c,
        defaultedMultiCalendars: p,
        defaultedFilters: d,
        defaultedConfig: Y,
        defaultedHighlight: f,
        propDates: O,
        defaultedUI: m
      } = Ye(n),
      { transitionName: P, showTransition: F } = na(u),
      { buildMatrix: L } = St(),
      { handleMonthYearChange: _, isDisabled: h2, updateMonthYear: R } = rr(n, a),
      { showLeftIcon: b, showRightIcon: j } = ha(),
      z = ref(false),
      ae = ref(false),
      H = ref(false),
      D = ref([null, null, null, null])
    onMounted(() => {
      a('mount')
    })
    const Q = (i) => ({
        get: () => n[i],
        set: (W) => {
          const se = i === ut.month ? ut.year : ut.month
          ;(a('update-month-year', { [i]: W, [se]: n[se] }), i === ut.month ? y(true) : U(true))
        }
      }),
      B = computed(Q(ut.month)),
      q = computed(Q(ut.year)),
      ve = computed(() => (i) => ({
        month: n.month,
        year: n.year,
        items: i === ut.month ? n.months : n.years,
        instance: n.instance,
        updateMonthYear: R,
        toggle: i === ut.month ? y : U
      })),
      pe = computed(() => {
        const i = n.months.find((W) => W.value === n.month)
        return i || { text: '', value: 0 }
      }),
      v = computed(() =>
        Wt(n.months, (i) => {
          const W = n.month === i.value,
            se =
              xt(i.value, _n(n.year, O.value.minDate), Yn(n.year, O.value.maxDate)) || d.value.months.includes(i.value),
            T = Fn(f.value, i.value, n.year)
          return { active: W, disabled: se, highlighted: T }
        })
      ),
      N = computed(() =>
        Wt(n.years, (i) => {
          const W = n.year === i.value,
            se = xt(i.value, Vt(O.value.minDate), Vt(O.value.maxDate)) || d.value.years.includes(i.value),
            T = Za(f.value, i.value)
          return { active: W, disabled: se, highlighted: T }
        })
      ),
      ee = (i, W, se) => {
        ;(se !== void 0 ? (i.value = se) : (i.value = !i.value),
          i.value ? ((H.value = true), a('overlay-opened', W)) : ((H.value = false), a('overlay-closed', W)))
      },
      y = (i = false, W) => {
        ;(S(i), ee(z, qe.month, W))
      },
      U = (i = false, W) => {
        ;(S(i), ee(ae, qe.year, W))
      },
      S = (i) => {
        i || a('reset-flow')
      },
      Z = (i, W) => {
        n.arrowNavigation && ((D.value[W] = He(i)), L(D.value, 'monthYear'))
      },
      A = computed(() => {
        var i, W, se, T, re, l
        return [
          {
            type: ut.month,
            index: 1,
            toggle: y,
            modelValue: B.value,
            updateModelValue: (w) => (B.value = w),
            text: pe.value.text,
            showSelectionGrid: z.value,
            items: v.value,
            ariaLabel: (i = c.value) == null ? void 0 : i.openMonthsOverlay,
            overlayLabel: ((se = (W = c.value).monthPicker) == null ? void 0 : se.call(W, true)) ?? void 0
          },
          {
            type: ut.year,
            index: 2,
            toggle: U,
            modelValue: q.value,
            updateModelValue: (w) => (q.value = w),
            text: Cn(n.year, n.locale),
            showSelectionGrid: ae.value,
            items: N.value,
            ariaLabel: (T = c.value) == null ? void 0 : T.openYearsOverlay,
            overlayLabel: ((l = (re = c.value).yearPicker) == null ? void 0 : l.call(re, true)) ?? void 0
          }
        ]
      }),
      ie = computed(() => (n.disableYearSelect ? [A.value[0]] : n.yearFirst ? [...A.value].reverse() : A.value))
    return (
      t({
        toggleMonthPicker: y,
        toggleYearPicker: U,
        handleMonthYearChange: _
      }),
      (i, W) => {
        var se, T, re, l, w, oe
        return (
          openBlock(),
          createElementBlock('div', Yr, [
            i.$slots['month-year']
              ? (openBlock(),
                createElementBlock('div', Ir, [
                  renderSlot(
                    i.$slots,
                    'month-year',
                    normalizeProps(
                      guardReactiveProps({
                        month: e.month,
                        year: e.year,
                        months: e.months,
                        years: e.years,
                        updateMonthYear: unref(R),
                        handleMonthYearChange: unref(_),
                        instance: e.instance,
                        isDisabled: unref(h2)
                      })
                    )
                  )
                ]))
              : (openBlock(),
                createElementBlock(
                  Fragment,
                  { key: 1 },
                  [
                    i.$slots['top-extra']
                      ? (openBlock(),
                        createElementBlock('div', Er, [
                          renderSlot(i.$slots, 'top-extra', { value: i.internalModelValue })
                        ]))
                      : createCommentVNode('', true),
                    createBaseVNode('div', Nr, [
                      unref(b)(unref(p), e.instance) && !i.vertical
                        ? (openBlock(),
                          createBlock(
                            qt,
                            {
                              key: 0,
                              'aria-label': (se = unref(c)) == null ? void 0 : se.prevMonth,
                              disabled: unref(h2)(false),
                              class: normalizeClass((T = unref(m)) == null ? void 0 : T.navBtnPrev),
                              'el-name': 'action-prev',
                              onActivate: W[0] || (W[0] = (M) => unref(_)(false, true)),
                              onSetRef: W[1] || (W[1] = (M) => Z(M, 0))
                            },
                            {
                              default: withCtx(() => [
                                i.$slots['arrow-left']
                                  ? renderSlot(i.$slots, 'arrow-left', { key: 0 })
                                  : createCommentVNode('', true),
                                i.$slots['arrow-left']
                                  ? createCommentVNode('', true)
                                  : (openBlock(), createBlock(unref(Wa), { key: 1 }))
                              ]),
                              _: 3
                            },
                            8,
                            ['aria-label', 'disabled', 'class']
                          ))
                        : createCommentVNode('', true),
                      createBaseVNode(
                        'div',
                        {
                          class: normalizeClass([
                            'dp__month_year_wrap',
                            {
                              dp__year_disable_select: i.disableYearSelect
                            }
                          ])
                        },
                        [
                          (openBlock(true),
                          createElementBlock(
                            Fragment,
                            null,
                            renderList(
                              ie.value,
                              (M, he) => (
                                openBlock(),
                                createElementBlock(
                                  Fragment,
                                  {
                                    key: M.type
                                  },
                                  [
                                    createBaseVNode(
                                      'button',
                                      {
                                        ref_for: true,
                                        ref: (ke) => Z(ke, he + 1),
                                        type: 'button',
                                        'data-dp-element': `overlay-${M.type}`,
                                        class: normalizeClass([
                                          'dp__btn dp__month_year_select',
                                          { 'dp--hidden-el': H.value }
                                        ]),
                                        'aria-label': `${M.text}-${M.ariaLabel}`,
                                        'data-test-id': `${M.type}-toggle-overlay-${e.instance}`,
                                        onClick: M.toggle,
                                        onKeydown: (ke) => unref(xe)(ke, () => M.toggle(), true)
                                      },
                                      [
                                        i.$slots[M.type]
                                          ? renderSlot(i.$slots, M.type, {
                                              key: 0,
                                              text: M.text,
                                              value: n[M.type]
                                            })
                                          : createCommentVNode('', true),
                                        i.$slots[M.type]
                                          ? createCommentVNode('', true)
                                          : (openBlock(),
                                            createElementBlock(
                                              Fragment,
                                              { key: 1 },
                                              [createTextVNode(toDisplayString(M.text), 1)],
                                              64
                                            ))
                                      ],
                                      42,
                                      Lr
                                    ),
                                    createVNode(
                                      Transition,
                                      {
                                        name: unref(P)(M.showSelectionGrid),
                                        css: unref(F)
                                      },
                                      {
                                        default: withCtx(() => [
                                          M.showSelectionGrid
                                            ? (openBlock(),
                                              createBlock(
                                                aa,
                                                {
                                                  key: 0,
                                                  items: M.items,
                                                  'arrow-navigation': i.arrowNavigation,
                                                  'hide-navigation': i.hideNavigation,
                                                  'is-last': i.autoApply && !unref(Y).keepActionRow,
                                                  'skip-button-ref': false,
                                                  config: i.config,
                                                  type: M.type,
                                                  'header-refs': [],
                                                  'esc-close': i.escClose,
                                                  'menu-wrap-ref': i.menuWrapRef,
                                                  'text-input': i.textInput,
                                                  'aria-labels': i.ariaLabels,
                                                  'overlay-label': M.overlayLabel,
                                                  onSelected: M.updateModelValue,
                                                  onToggle: M.toggle
                                                },
                                                createSlots(
                                                  {
                                                    'button-icon': withCtx(() => [
                                                      i.$slots['calendar-icon']
                                                        ? renderSlot(i.$slots, 'calendar-icon', { key: 0 })
                                                        : createCommentVNode('', true),
                                                      i.$slots['calendar-icon']
                                                        ? createCommentVNode('', true)
                                                        : (openBlock(), createBlock(unref(Gt), { key: 1 }))
                                                    ]),
                                                    _: 2
                                                  },
                                                  [
                                                    i.$slots[`${M.type}-overlay-value`]
                                                      ? {
                                                          name: 'item',
                                                          fn: withCtx(({ item: ke }) => [
                                                            renderSlot(i.$slots, `${M.type}-overlay-value`, {
                                                              text: ke.text,
                                                              value: ke.value
                                                            })
                                                          ]),
                                                          key: '0'
                                                        }
                                                      : void 0,
                                                    i.$slots[`${M.type}-overlay`]
                                                      ? {
                                                          name: 'overlay',
                                                          fn: withCtx(() => [
                                                            renderSlot(
                                                              i.$slots,
                                                              `${M.type}-overlay`,
                                                              mergeProps({ ref_for: true }, ve.value(M.type))
                                                            )
                                                          ]),
                                                          key: '1'
                                                        }
                                                      : void 0,
                                                    i.$slots[`${M.type}-overlay-header`]
                                                      ? {
                                                          name: 'header',
                                                          fn: withCtx(() => [
                                                            renderSlot(i.$slots, `${M.type}-overlay-header`, {
                                                              toggle: M.toggle
                                                            })
                                                          ]),
                                                          key: '2'
                                                        }
                                                      : void 0
                                                  ]
                                                ),
                                                1032,
                                                [
                                                  'items',
                                                  'arrow-navigation',
                                                  'hide-navigation',
                                                  'is-last',
                                                  'config',
                                                  'type',
                                                  'esc-close',
                                                  'menu-wrap-ref',
                                                  'text-input',
                                                  'aria-labels',
                                                  'overlay-label',
                                                  'onSelected',
                                                  'onToggle'
                                                ]
                                              ))
                                            : createCommentVNode('', true)
                                        ]),
                                        _: 2
                                      },
                                      1032,
                                      ['name', 'css']
                                    )
                                  ],
                                  64
                                )
                              )
                            ),
                            128
                          ))
                        ],
                        2
                      ),
                      unref(b)(unref(p), e.instance) && i.vertical
                        ? (openBlock(),
                          createBlock(
                            qt,
                            {
                              key: 1,
                              'aria-label': (re = unref(c)) == null ? void 0 : re.prevMonth,
                              'el-name': 'action-prev',
                              disabled: unref(h2)(false),
                              class: normalizeClass((l = unref(m)) == null ? void 0 : l.navBtnPrev),
                              onActivate: W[2] || (W[2] = (M) => unref(_)(false, true))
                            },
                            {
                              default: withCtx(() => [
                                i.$slots['arrow-up']
                                  ? renderSlot(i.$slots, 'arrow-up', { key: 0 })
                                  : createCommentVNode('', true),
                                i.$slots['arrow-up']
                                  ? createCommentVNode('', true)
                                  : (openBlock(), createBlock(unref(Ka), { key: 1 }))
                              ]),
                              _: 3
                            },
                            8,
                            ['aria-label', 'disabled', 'class']
                          ))
                        : createCommentVNode('', true),
                      unref(j)(unref(p), e.instance)
                        ? (openBlock(),
                          createBlock(
                            qt,
                            {
                              key: 2,
                              ref: 'rightIcon',
                              'el-name': 'action-next',
                              disabled: unref(h2)(true),
                              'aria-label': (w = unref(c)) == null ? void 0 : w.nextMonth,
                              class: normalizeClass((oe = unref(m)) == null ? void 0 : oe.navBtnNext),
                              onActivate: W[3] || (W[3] = (M) => unref(_)(true, true)),
                              onSetRef: W[4] || (W[4] = (M) => Z(M, i.disableYearSelect ? 2 : 3))
                            },
                            {
                              default: withCtx(() => [
                                i.$slots[i.vertical ? 'arrow-down' : 'arrow-right']
                                  ? renderSlot(i.$slots, i.vertical ? 'arrow-down' : 'arrow-right', { key: 0 })
                                  : createCommentVNode('', true),
                                i.$slots[i.vertical ? 'arrow-down' : 'arrow-right']
                                  ? createCommentVNode('', true)
                                  : (openBlock(),
                                    createBlock(resolveDynamicComponent(i.vertical ? unref(Ga) : unref(Va)), {
                                      key: 1
                                    }))
                              ]),
                              _: 3
                            },
                            8,
                            ['disabled', 'aria-label', 'class']
                          ))
                        : createCommentVNode('', true)
                    ])
                  ],
                  64
                ))
          ])
        )
      }
    )
  }
})
var zr = {
  class: 'dp__calendar_header',
  role: 'row'
}
var Hr = {
  key: 0,
  class: 'dp__calendar_header_item',
  role: 'gridcell'
}
var Ur = ['aria-label']
var Wr = {
  key: 0,
  class: 'dp__calendar_item dp__week_num',
  role: 'gridcell'
}
var Vr = { class: 'dp__cell_inner' }
var jr = [
  'id',
  'aria-pressed',
  'aria-disabled',
  'aria-label',
  'tabindex',
  'data-test-id',
  'onClick',
  'onTouchend',
  'onKeydown',
  'onMouseenter',
  'onMouseleave',
  'onMousedown'
]
var Kr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: 'DpCalendar',
  props: {
    mappedDates: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    ...ct
  },
  emits: [
    'select-date',
    'set-hover-date',
    'handle-scroll',
    'mount',
    'handle-swipe',
    'handle-space',
    'tooltip-open',
    'tooltip-close'
  ],
  setup(e, { expose: t, emit: r }) {
    const a = r,
      n = e,
      { buildMultiLevelMatrix: u } = St(),
      {
        defaultedTransitions: c,
        defaultedConfig: p,
        defaultedAriaLabels: d,
        defaultedMultiCalendars: Y,
        defaultedWeekNumbers: f,
        defaultedMultiDates: O,
        defaultedUI: m
      } = Ye(n),
      P = ref(null),
      F = ref({
        bottom: '',
        left: '',
        transform: ''
      }),
      L = ref([]),
      _ = ref(null),
      h2 = ref(true),
      R = ref(''),
      b = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }),
      j = ref([]),
      z = ref({ left: '50%' }),
      ae = ref(false),
      H = computed(() => (n.calendar ? n.calendar(n.mappedDates) : n.mappedDates)),
      D = computed(() =>
        n.dayNames
          ? Array.isArray(n.dayNames)
            ? n.dayNames
            : n.dayNames(n.locale, +n.weekStart)
          : Al(n.formatLocale, n.locale, +n.weekStart)
      )
    ;(onMounted(() => {
      ;(a('mount', { cmp: 'calendar', refs: L }),
        p.value.noSwipe ||
          (_.value &&
            (_.value.addEventListener('touchstart', Z, { passive: false }),
            _.value.addEventListener('touchend', A, { passive: false }),
            _.value.addEventListener('touchmove', ie, { passive: false }))),
        n.monthChangeOnScroll && _.value && _.value.addEventListener('wheel', se, { passive: false }))
    }),
      onUnmounted(() => {
        ;(p.value.noSwipe ||
          (_.value &&
            (_.value.removeEventListener('touchstart', Z),
            _.value.removeEventListener('touchend', A),
            _.value.removeEventListener('touchmove', ie))),
          n.monthChangeOnScroll && _.value && _.value.removeEventListener('wheel', se))
      }))
    const Q = (M) => (M ? (n.vertical ? 'vNext' : 'next') : n.vertical ? 'vPrevious' : 'previous'),
      B = (M, he) => {
        if (n.transitions) {
          const ke = je(ht(K(), n.month, n.year))
          ;((R.value = Fe(je(ht(K(), M, he)), ke) ? c.value[Q(true)] : c.value[Q(false)]),
            (h2.value = false),
            nextTick(() => {
              h2.value = true
            }))
        }
      },
      q = computed(() => ({
        ...(m.value.calendar ?? {})
      })),
      ve = computed(() => (M) => {
        const he = Sl(M)
        return {
          dp__marker_dot: he.type === 'dot',
          dp__marker_line: he.type === 'line'
        }
      }),
      pe = computed(() => (M) => Te(M, P.value)),
      v = computed(() => ({
        dp__calendar: true,
        dp__calendar_next: Y.value.count > 0 && n.instance !== 0
      })),
      N = computed(() => (M) => (n.hideOffsetDates ? M.current : true)),
      ee = async (M, he) => {
        const { width: ke, height: le } = M.getBoundingClientRect()
        P.value = he.value
        let o = { left: `${ke / 2}px` },
          E = -50
        if ((await nextTick(), j.value[0])) {
          const { left: fe, width: I } = j.value[0].getBoundingClientRect()
          ;(fe < 0 && ((o = { left: '0' }), (E = 0), (z.value.left = `${ke / 2}px`)),
            window.innerWidth < fe + I && ((o = { right: '0' }), (E = 0), (z.value.left = `${I - ke / 2}px`)))
        }
        F.value = {
          bottom: `${le}px`,
          ...o,
          transform: `translateX(${E}%)`
        }
      },
      y = async (M, he, ke) => {
        var o, E, fe
        const le = He(L.value[he][ke])
        le &&
          ((o = M.marker) != null &&
          o.customPosition &&
          (fe = (E = M.marker) == null ? void 0 : E.tooltip) != null &&
          fe.length
            ? (F.value = M.marker.customPosition(le))
            : await ee(le, M),
          a('tooltip-open', M.marker))
      },
      U = async (M, he, ke) => {
        var le, o
        if (ae.value && O.value.enabled && O.value.dragSelect) return a('select-date', M)
        if ((a('set-hover-date', M), (o = (le = M.marker) == null ? void 0 : le.tooltip) != null && o.length)) {
          if (n.hideOffsetDates && !M.current) return
          await y(M, he, ke)
        }
      },
      S = (M) => {
        P.value &&
          ((P.value = null),
          (F.value = JSON.parse(JSON.stringify({ bottom: '', left: '', transform: '' }))),
          a('tooltip-close', M.marker))
      },
      Z = (M) => {
        ;((b.value.startX = M.changedTouches[0].screenX), (b.value.startY = M.changedTouches[0].screenY))
      },
      A = (M) => {
        ;((b.value.endX = M.changedTouches[0].screenX), (b.value.endY = M.changedTouches[0].screenY), i())
      },
      ie = (M) => {
        n.vertical && !n.inline && M.preventDefault()
      },
      i = () => {
        const M = n.vertical ? 'Y' : 'X'
        Math.abs(b.value[`start${M}`] - b.value[`end${M}`]) > 10 &&
          a('handle-swipe', b.value[`start${M}`] > b.value[`end${M}`] ? 'right' : 'left')
      },
      W = (M, he, ke) => {
        ;(M && (Array.isArray(L.value[he]) ? (L.value[he][ke] = M) : (L.value[he] = [M])),
          n.arrowNavigation && u(L.value, 'calendar'))
      },
      se = (M) => {
        n.monthChangeOnScroll && (M.preventDefault(), a('handle-scroll', M))
      },
      T = (M) =>
        f.value.type === 'local'
          ? getWeek(M.value, { weekStartsOn: +n.weekStart })
          : f.value.type === 'iso'
            ? getISOWeek(M.value)
            : typeof f.value.type == 'function'
              ? f.value.type(M.value)
              : '',
      re = (M) => {
        const he = M[0]
        return f.value.hideOnOffsetDates ? (M.some((ke) => ke.current) ? T(he) : '') : T(he)
      },
      l = (M, he, ke = true) => {
        ;(!ke && Bl()) || ((!O.value.enabled || p.value.allowPreventDefault) && ($t(M, p.value), a('select-date', he)))
      },
      w = (M) => {
        $t(M, p.value)
      },
      oe = (M) => {
        O.value.enabled && O.value.dragSelect
          ? ((ae.value = true), a('select-date', M))
          : O.value.enabled && a('select-date', M)
      }
    return (
      t({ triggerTransition: B }),
      (M, he) => (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(v.value)
          },
          [
            createBaseVNode(
              'div',
              {
                ref_key: 'calendarWrapRef',
                ref: _,
                class: normalizeClass(q.value),
                role: 'grid'
              },
              [
                createBaseVNode('div', zr, [
                  M.weekNumbers
                    ? (openBlock(), createElementBlock('div', Hr, toDisplayString(M.weekNumName), 1))
                    : createCommentVNode('', true),
                  (openBlock(true),
                  createElementBlock(
                    Fragment,
                    null,
                    renderList(D.value, (ke, le) => {
                      var o, E
                      return (
                        openBlock(),
                        createElementBlock(
                          'div',
                          {
                            key: le,
                            class: 'dp__calendar_header_item',
                            role: 'gridcell',
                            'data-test-id': 'calendar-header',
                            'aria-label':
                              (E = (o = unref(d)) == null ? void 0 : o.weekDay) == null ? void 0 : E.call(o, le)
                          },
                          [
                            M.$slots['calendar-header']
                              ? renderSlot(M.$slots, 'calendar-header', {
                                  key: 0,
                                  day: ke,
                                  index: le
                                })
                              : createCommentVNode('', true),
                            M.$slots['calendar-header']
                              ? createCommentVNode('', true)
                              : (openBlock(),
                                createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(ke), 1)], 64))
                          ],
                          8,
                          Ur
                        )
                      )
                    }),
                    128
                  ))
                ]),
                he[2] || (he[2] = createBaseVNode('div', { class: 'dp__calendar_header_separator' }, null, -1)),
                createVNode(
                  Transition,
                  {
                    name: R.value,
                    css: !!M.transitions
                  },
                  {
                    default: withCtx(() => [
                      h2.value
                        ? (openBlock(),
                          createElementBlock(
                            'div',
                            {
                              key: 0,
                              class: 'dp__calendar',
                              role: 'rowgroup',
                              onMouseleave: he[1] || (he[1] = (ke) => (ae.value = false))
                            },
                            [
                              (openBlock(true),
                              createElementBlock(
                                Fragment,
                                null,
                                renderList(
                                  H.value,
                                  (ke, le) => (
                                    openBlock(),
                                    createElementBlock(
                                      'div',
                                      {
                                        key: le,
                                        class: 'dp__calendar_row',
                                        role: 'row'
                                      },
                                      [
                                        M.weekNumbers
                                          ? (openBlock(),
                                            createElementBlock('div', Wr, [
                                              createBaseVNode('div', Vr, toDisplayString(re(ke.days)), 1)
                                            ]))
                                          : createCommentVNode('', true),
                                        (openBlock(true),
                                        createElementBlock(
                                          Fragment,
                                          null,
                                          renderList(ke.days, (o, E) => {
                                            var fe, I, $e
                                            return (
                                              openBlock(),
                                              createElementBlock(
                                                'div',
                                                {
                                                  id: unref(Ha)(o.value),
                                                  ref_for: true,
                                                  ref: (be) => W(be, le, E),
                                                  key: E + le,
                                                  role: 'gridcell',
                                                  class: 'dp__calendar_item',
                                                  'aria-pressed':
                                                    (o.classData.dp__active_date ||
                                                      o.classData.dp__range_start ||
                                                      o.classData.dp__range_start) ??
                                                    void 0,
                                                  'aria-disabled': o.classData.dp__cell_disabled || void 0,
                                                  'aria-label':
                                                    (I = (fe = unref(d)) == null ? void 0 : fe.day) == null
                                                      ? void 0
                                                      : I.call(fe, o),
                                                  tabindex: !o.current && M.hideOffsetDates ? void 0 : 0,
                                                  'data-test-id': unref(Ha)(o.value),
                                                  onClick: withModifiers((be) => l(be, o), ['prevent']),
                                                  onTouchend: (be) => l(be, o, false),
                                                  onKeydown: (be) => unref(xe)(be, () => M.$emit('select-date', o)),
                                                  onMouseenter: (be) => U(o, le, E),
                                                  onMouseleave: (be) => S(o),
                                                  onMousedown: (be) => oe(o),
                                                  onMouseup: he[0] || (he[0] = (be) => (ae.value = false))
                                                },
                                                [
                                                  createBaseVNode(
                                                    'div',
                                                    {
                                                      class: normalizeClass(['dp__cell_inner', o.classData])
                                                    },
                                                    [
                                                      M.$slots.day && N.value(o)
                                                        ? renderSlot(M.$slots, 'day', {
                                                            key: 0,
                                                            day: +o.text,
                                                            date: o.value
                                                          })
                                                        : createCommentVNode('', true),
                                                      M.$slots.day
                                                        ? createCommentVNode('', true)
                                                        : (openBlock(),
                                                          createElementBlock(
                                                            Fragment,
                                                            { key: 1 },
                                                            [createTextVNode(toDisplayString(o.text), 1)],
                                                            64
                                                          )),
                                                      o.marker && N.value(o)
                                                        ? (openBlock(),
                                                          createElementBlock(
                                                            Fragment,
                                                            { key: 2 },
                                                            [
                                                              M.$slots.marker
                                                                ? renderSlot(M.$slots, 'marker', {
                                                                    key: 0,
                                                                    marker: o.marker,
                                                                    day: +o.text,
                                                                    date: o.value
                                                                  })
                                                                : (openBlock(),
                                                                  createElementBlock(
                                                                    'div',
                                                                    {
                                                                      key: 1,
                                                                      class: normalizeClass(ve.value(o.marker)),
                                                                      style: normalizeStyle(
                                                                        o.marker.color
                                                                          ? { backgroundColor: o.marker.color }
                                                                          : {}
                                                                      )
                                                                    },
                                                                    null,
                                                                    6
                                                                  ))
                                                            ],
                                                            64
                                                          ))
                                                        : createCommentVNode('', true),
                                                      pe.value(o.value)
                                                        ? (openBlock(),
                                                          createElementBlock(
                                                            'div',
                                                            {
                                                              key: 3,
                                                              ref_for: true,
                                                              ref_key: 'activeTooltip',
                                                              ref: j,
                                                              class: 'dp__marker_tooltip',
                                                              style: normalizeStyle(F.value)
                                                            },
                                                            [
                                                              ($e = o.marker) != null && $e.tooltip
                                                                ? (openBlock(),
                                                                  createElementBlock(
                                                                    'div',
                                                                    {
                                                                      key: 0,
                                                                      class: 'dp__tooltip_content',
                                                                      onClick: w
                                                                    },
                                                                    [
                                                                      (openBlock(true),
                                                                      createElementBlock(
                                                                        Fragment,
                                                                        null,
                                                                        renderList(
                                                                          o.marker.tooltip,
                                                                          (be, Pe) => (
                                                                            openBlock(),
                                                                            createElementBlock(
                                                                              'div',
                                                                              {
                                                                                key: Pe,
                                                                                class: 'dp__tooltip_text'
                                                                              },
                                                                              [
                                                                                M.$slots['marker-tooltip']
                                                                                  ? renderSlot(
                                                                                      M.$slots,
                                                                                      'marker-tooltip',
                                                                                      {
                                                                                        key: 0,
                                                                                        tooltip: be,
                                                                                        day: o.value
                                                                                      }
                                                                                    )
                                                                                  : createCommentVNode('', true),
                                                                                M.$slots['marker-tooltip']
                                                                                  ? createCommentVNode('', true)
                                                                                  : (openBlock(),
                                                                                    createElementBlock(
                                                                                      Fragment,
                                                                                      { key: 1 },
                                                                                      [
                                                                                        createBaseVNode(
                                                                                          'div',
                                                                                          {
                                                                                            class: 'dp__tooltip_mark',
                                                                                            style: normalizeStyle(
                                                                                              be.color
                                                                                                ? {
                                                                                                    backgroundColor:
                                                                                                      be.color
                                                                                                  }
                                                                                                : {}
                                                                                            )
                                                                                          },
                                                                                          null,
                                                                                          4
                                                                                        ),
                                                                                        createBaseVNode(
                                                                                          'div',
                                                                                          null,
                                                                                          toDisplayString(be.text),
                                                                                          1
                                                                                        )
                                                                                      ],
                                                                                      64
                                                                                    ))
                                                                              ]
                                                                            )
                                                                          )
                                                                        ),
                                                                        128
                                                                      )),
                                                                      createBaseVNode(
                                                                        'div',
                                                                        {
                                                                          class: 'dp__arrow_bottom_tp',
                                                                          style: normalizeStyle(z.value)
                                                                        },
                                                                        null,
                                                                        4
                                                                      )
                                                                    ]
                                                                  ))
                                                                : createCommentVNode('', true)
                                                            ],
                                                            4
                                                          ))
                                                        : createCommentVNode('', true)
                                                    ],
                                                    2
                                                  )
                                                ],
                                                40,
                                                jr
                                              )
                                            )
                                          }),
                                          128
                                        ))
                                      ]
                                    )
                                  )
                                ),
                                128
                              ))
                            ],
                            32
                          ))
                        : createCommentVNode('', true)
                    ]),
                    _: 3
                  },
                  8,
                  ['name', 'css']
                )
              ],
              2
            )
          ],
          2
        )
      )
    )
  }
})
var yn = (e) => Array.isArray(e)
var Gr = (e, t, r, a) => {
  const n = ref([]),
    u = ref(/* @__PURE__ */ new Date()),
    c = ref(),
    p = () => A(e.isTextInputDate),
    { modelValue: d, calendars: Y, time: f, today: O } = la(e, t, p),
    {
      defaultedMultiCalendars: m,
      defaultedStartTime: P,
      defaultedRange: F,
      defaultedConfig: L,
      defaultedTz: _,
      propDates: h2,
      defaultedMultiDates: R
    } = Ye(e),
    { validateMonthYearInRange: b, isDisabled: j, isDateRangeAllowed: z, checkMinMaxRange: ae } = Pt(e),
    {
      updateTimeValues: H,
      getSetDateTime: D,
      setTime: Q,
      assignStartTime: B,
      validateTime: q,
      disabledTimesConfig: ve
    } = Kn(e, f, d, a),
    pe = computed(() => (g) => (Y.value[g] ? Y.value[g].month : 0)),
    v = computed(() => (g) => (Y.value[g] ? Y.value[g].year : 0)),
    N = (g) => (!L.value.keepViewOnOffsetClick || g ? true : !c.value),
    ee = (g, ne, me, C = false) => {
      var te, ce
      N(C) &&
        (Y.value[g] || (Y.value[g] = { month: 0, year: 0 }),
        (Y.value[g].month = dn(ne) ? ((te = Y.value[g]) == null ? void 0 : te.month) : ne),
        (Y.value[g].year = dn(me) ? ((ce = Y.value[g]) == null ? void 0 : ce.year) : me))
    },
    y = () => {
      e.autoApply && t('select-date')
    },
    U = () => {
      P.value && B(P.value)
    }
  onMounted(() => {
    e.shadow || (d.value || (he(), U()), A(true), e.focusStartDate && e.startDate && he())
  })
  const S = computed(() => {
      var g
      return (g = e.flow) != null && g.length && !e.partialFlow ? e.flowStep === e.flow.length : true
    }),
    Z = () => {
      e.autoApply && S.value && t('auto-apply', e.partialFlow ? e.flowStep !== e.flow.length : false)
    },
    A = (g = false) => {
      if (d.value) return Array.isArray(d.value) ? ((n.value = d.value), l(g)) : W(d.value, g)
      if (m.value.count && g && !e.startDate) return i(K(), g)
    },
    ie = () =>
      Array.isArray(d.value) && F.value.enabled ? getMonth(d.value[0]) === getMonth(d.value[1] ?? d.value[0]) : false,
    i = (g = /* @__PURE__ */ new Date(), ne = false) => {
      if (
        ((!m.value.count || !m.value.static || ne) && ee(0, getMonth(g), getYear(g)),
        m.value.count && (!d.value || ie() || !m.value.solo) && (!m.value.solo || ne))
      )
        for (let me = 1; me < m.value.count; me++) {
          const C = set(K(), { month: pe.value(me - 1), year: v.value(me - 1) }),
            te = add(C, { months: 1 })
          Y.value[me] = { month: getMonth(te), year: getYear(te) }
        }
    },
    W = (g, ne) => {
      ;(i(g),
        Q('hours', getHours(g)),
        Q('minutes', getMinutes(g)),
        Q('seconds', getSeconds(g)),
        m.value.count && ne && M())
    },
    se = (g) => {
      if (m.value.count) {
        if (m.value.solo) return 0
        const ne = getMonth(g[0]),
          me = getMonth(g[1])
        return Math.abs(me - ne) < m.value.count ? 0 : 1
      }
      return 1
    },
    T = (g, ne) => {
      g[1] && F.value.showLastInRange ? i(g[se(g)], ne) : i(g[0], ne)
      const me = (C, te) => [C(g[0]), g[1] ? C(g[1]) : f[te][1]]
      ;(Q('hours', me(getHours, 'hours')),
        Q('minutes', me(getMinutes, 'minutes')),
        Q('seconds', me(getSeconds, 'seconds')))
    },
    re = (g, ne) => {
      if ((F.value.enabled || e.weekPicker) && !R.value.enabled) return T(g, ne)
      if (R.value.enabled && ne) {
        const me = g[g.length - 1]
        return W(me, ne)
      }
    },
    l = (g) => {
      const ne = d.value
      ;(re(ne, g), m.value.count && m.value.solo && M())
    },
    w = (g, ne) => {
      const me = set(K(), { month: pe.value(ne), year: v.value(ne) }),
        C = g < 0 ? addMonths(me, 1) : subMonths(me, 1)
      b(getMonth(C), getYear(C), g < 0, e.preventMinMaxNavigation) &&
        (ee(ne, getMonth(C), getYear(C)),
        t('update-month-year', { instance: ne, month: getMonth(C), year: getYear(C) }),
        m.value.count && !m.value.solo && oe(ne),
        r())
    },
    oe = (g) => {
      for (let ne = g - 1; ne >= 0; ne--) {
        const me = subMonths(set(K(), { month: pe.value(ne + 1), year: v.value(ne + 1) }), 1)
        ee(ne, getMonth(me), getYear(me))
      }
      for (let ne = g + 1; ne <= m.value.count - 1; ne++) {
        const me = addMonths(set(K(), { month: pe.value(ne - 1), year: v.value(ne - 1) }), 1)
        ee(ne, getMonth(me), getYear(me))
      }
    },
    M = () => {
      if (Array.isArray(d.value) && d.value.length === 2) {
        const g = K(K(d.value[1] ? d.value[1] : addMonths(d.value[0], 1))),
          [ne, me] = [getMonth(d.value[0]), getYear(d.value[0])],
          [C, te] = [getMonth(d.value[1]), getYear(d.value[1])]
        ;(ne !== C || (ne === C && me !== te)) && m.value.solo && ee(1, getMonth(g), getYear(g))
      } else d.value && !Array.isArray(d.value) && (ee(0, getMonth(d.value), getYear(d.value)), i(K()))
    },
    he = () => {
      e.startDate && (ee(0, getMonth(K(e.startDate)), getYear(K(e.startDate))), m.value.count && oe(0))
    },
    ke = (g, ne) => {
      if (e.monthChangeOnScroll) {
        const me = /* @__PURE__ */ new Date().getTime() - u.value.getTime(),
          C = Math.abs(g.deltaY)
        let te = 500
        ;(C > 1 && (te = 100),
          C > 100 && (te = 0),
          me > te &&
            ((u.value = /* @__PURE__ */ new Date()), w(e.monthChangeOnScroll !== 'inverse' ? -g.deltaY : g.deltaY, ne)))
      }
    },
    le = (g, ne, me = false) => {
      e.monthChangeOnArrows && e.vertical === me && o(g, ne)
    },
    o = (g, ne) => {
      w(g === 'right' ? -1 : 1, ne)
    },
    E = (g) => {
      if (h2.value.markers) return va(g.value, h2.value.markers)
    },
    fe = (g, ne) => {
      switch (e.sixWeeks === true ? 'append' : e.sixWeeks) {
        case 'prepend':
          return [true, false]
        case 'center':
          return [g == 0, true]
        case 'fair':
          return [g == 0 || ne > g, true]
        case 'append':
          return [false, false]
        default:
          return [false, false]
      }
    },
    I = (g, ne, me, C) => {
      if (e.sixWeeks && g.length < 6) {
        const te = 6 - g.length,
          ce = (ne.getDay() + 7 - C) % 7,
          vt = 6 - ((me.getDay() + 7 - C) % 7),
          [Ct, $a] = fe(ce, vt)
        for (let Ot = 1; Ot <= te; Ot++)
          if ($a ? !!(Ot % 2) == Ct : Ct) {
            const oa = g[0].days[0],
              Aa = $e(addDays(oa.value, -7), getMonth(ne))
            g.unshift({ days: Aa })
          } else {
            const oa = g[g.length - 1],
              Aa = oa.days[oa.days.length - 1],
              qn = $e(addDays(Aa.value, 1), getMonth(ne))
            g.push({ days: qn })
          }
      }
      return g
    },
    $e = (g, ne) => {
      const me = K(g),
        C = []
      for (let te = 0; te < 7; te++) {
        const ce = addDays(me, te),
          yt = getMonth(ce) !== ne
        C.push({
          text: e.hideOffsetDates && yt ? '' : ce.getDate(),
          value: ce,
          current: !yt,
          classData: {}
        })
      }
      return C
    },
    be = (g, ne) => {
      const me = [],
        C = new Date(ne, g),
        te = new Date(ne, g + 1, 0),
        ce = e.weekStart,
        yt = startOfWeek(C, { weekStartsOn: ce }),
        vt = (Ct) => {
          const $a = $e(Ct, g)
          if ((me.push({ days: $a }), !me[me.length - 1].days.some((Ot) => Te(je(Ot.value), je(te))))) {
            const Ot = addDays(Ct, 7)
            vt(Ot)
          }
        }
      return (vt(yt), I(me, C, te, ce))
    },
    Pe = (g) => {
      const ne = At(K(g.value), f.hours, f.minutes, rt())
      ;(t('date-update', ne),
        R.value.enabled ? xa(ne, d, R.value.limit) : (d.value = ne),
        a(),
        nextTick().then(() => {
          Z()
        }))
    },
    Ee = (g) => (F.value.noDisabledRange ? In(n.value[0], g).some((me) => j(me)) : false),
    Be = () => {
      ;((n.value = d.value ? d.value.slice() : []),
        n.value.length === 2 && !(F.value.fixedStart || F.value.fixedEnd) && (n.value = []))
    },
    k = (g, ne) => {
      const me = [K(g.value), addDays(K(g.value), +F.value.autoRange)]
      z(me) ? (ne && x(g.value), (n.value = me)) : t('invalid-date', g.value)
    },
    x = (g) => {
      const ne = getMonth(K(g)),
        me = getYear(K(g))
      if ((ee(0, ne, me), m.value.count > 0))
        for (let C = 1; C < m.value.count; C++) {
          const te = Il(set(K(g), { year: v.value(C - 1), month: pe.value(C - 1) }))
          ee(C, te.month, te.year)
        }
    },
    Ie = (g) => {
      if (Ee(g.value) || !ae(g.value, d.value, F.value.fixedStart ? 0 : 1)) return t('invalid-date', g.value)
      n.value = Wn(K(g.value), d, t, F)
    },
    Ue = (g, ne) => {
      if ((Be(), F.value.autoRange)) return k(g, ne)
      if (F.value.fixedStart || F.value.fixedEnd) return Ie(g)
      n.value[0]
        ? ae(K(g.value), d.value) && !Ee(g.value)
          ? Ne(K(g.value), K(n.value[0]))
            ? (n.value.unshift(K(g.value)), t('range-end', n.value[0]))
            : ((n.value[1] = K(g.value)), t('range-end', n.value[1]))
          : (e.autoApply && t('auto-apply-invalid', g.value), t('invalid-date', g.value))
        : ((n.value[0] = K(g.value)), t('range-start', n.value[0]))
    },
    rt = (g = true) =>
      e.enableSeconds ? (Array.isArray(f.seconds) ? (g ? f.seconds[0] : f.seconds[1]) : f.seconds) : 0,
    de = (g) => {
      n.value[g] = At(n.value[g], f.hours[g], f.minutes[g], rt(g !== 1))
    },
    Rt = () => {
      var g, ne
      n.value[0] &&
        n.value[1] &&
        +((g = n.value) == null ? void 0 : g[0]) > +((ne = n.value) == null ? void 0 : ne[1]) &&
        (n.value.reverse(), t('range-start', n.value[0]), t('range-end', n.value[1]))
    },
    ft = () => {
      n.value.length &&
        (n.value[0] && !n.value[1] ? de(0) : (de(0), de(1), a()),
        Rt(),
        (d.value = n.value.slice()),
        ga(n.value, t, e.autoApply, e.modelAuto))
    },
    ra = (g, ne = false) => {
      if (j(g.value) || (!g.current && e.hideOffsetDates)) return t('invalid-date', g.value)
      if (((c.value = JSON.parse(JSON.stringify(g))), !F.value.enabled)) return Pe(g)
      yn(f.hours) && yn(f.minutes) && !R.value.enabled && (Ue(g, ne), ft())
    },
    ba = (g, ne) => {
      var C
      ;(ee(g, ne.month, ne.year, true),
        m.value.count && !m.value.solo && oe(g),
        t('update-month-year', { instance: g, month: ne.month, year: ne.year }),
        r(m.value.solo ? g : void 0))
      const me = (C = e.flow) != null && C.length ? e.flow[e.flowStep] : void 0
      !ne.fromNav && (me === qe.month || me === qe.year) && a()
    },
    ka = (g, ne) => {
      ;(Un({
        value: g,
        modelValue: d,
        range: F.value.enabled,
        timezone: ne ? void 0 : _.value.timezone
      }),
        y(),
        e.multiCalendars && nextTick().then(() => A(true)))
    },
    wa = () => {
      const g = Qa(K(), _.value)
      ;(!F.value.enabled && !R.value.enabled
        ? (d.value = g)
        : d.value && Array.isArray(d.value) && d.value[0]
          ? R.value.enabled
            ? (d.value = [...d.value, g])
            : (d.value = Ne(g, d.value[0]) ? [g, d.value[0]] : [d.value[0], g])
          : (d.value = [g]),
        y())
    },
    Da = () => {
      if (Array.isArray(d.value))
        if (R.value.enabled) {
          const g = Ma()
          d.value[d.value.length - 1] = D(g)
        } else d.value = d.value.map((g, ne) => g && D(g, ne))
      else d.value = D(d.value)
      t('time-update')
    },
    Ma = () => (Array.isArray(d.value) && d.value.length ? d.value[d.value.length - 1] : null)
  return {
    calendars: Y,
    modelValue: d,
    month: pe,
    year: v,
    time: f,
    disabledTimesConfig: ve,
    today: O,
    validateTime: q,
    getCalendarDays: be,
    getMarker: E,
    handleScroll: ke,
    handleSwipe: o,
    handleArrow: le,
    selectDate: ra,
    updateMonthYear: ba,
    presetDate: ka,
    selectCurrentDate: wa,
    updateTime: (g, ne = true, me = false) => {
      H(g, ne, me, Da)
    },
    assignMonthAndYear: i,
    setStartTime: U
  }
}
var Qr = { key: 0 }
var qr = defineComponent({
  __name: 'DatePicker',
  props: {
    ...ct
  },
  emits: [
    'tooltip-open',
    'tooltip-close',
    'mount',
    'update:internal-model-value',
    'update-flow-step',
    'reset-flow',
    'auto-apply',
    'focus-menu',
    'select-date',
    'range-start',
    'range-end',
    'invalid-fixed-range',
    'time-update',
    'am-pm-change',
    'time-picker-open',
    'time-picker-close',
    'recalculate-position',
    'update-month-year',
    'auto-apply-invalid',
    'date-update',
    'invalid-date',
    'overlay-toggle'
  ],
  setup(e, { expose: t, emit: r }) {
    const a = r,
      n = e,
      {
        calendars: u,
        month: c,
        year: p,
        modelValue: d,
        time: Y,
        disabledTimesConfig: f,
        today: O,
        validateTime: m,
        getCalendarDays: P,
        getMarker: F,
        handleArrow: L,
        handleScroll: _,
        handleSwipe: h2,
        selectDate: R,
        updateMonthYear: b,
        presetDate: j,
        selectCurrentDate: z,
        updateTime: ae,
        assignMonthAndYear: H,
        setStartTime: D
      } = Gr(n, a, ie, i),
      Q = useSlots(),
      { setHoverDate: B, getDayClassData: q, clearHoverDate: ve } = vo(d, n),
      { defaultedMultiCalendars: pe } = Ye(n),
      v = ref([]),
      N = ref([]),
      ee = ref(null),
      y = at(Q, 'calendar'),
      U = at(Q, 'monthYear'),
      S = at(Q, 'timePicker'),
      Z = (le) => {
        n.shadow || a('mount', le)
      }
    ;(watch(
      u,
      () => {
        n.shadow ||
          setTimeout(() => {
            a('recalculate-position')
          }, 0)
      },
      { deep: true }
    ),
      watch(
        pe,
        (le, o) => {
          le.count - o.count > 0 && H()
        },
        { deep: true }
      ))
    const A = computed(
      () => (le) =>
        P(c.value(le), p.value(le)).map((o) => ({
          ...o,
          days: o.days.map((E) => ((E.marker = F(E)), (E.classData = q(E)), E))
        }))
    )
    function ie(le) {
      var o
      le || le === 0
        ? (o = N.value[le]) == null || o.triggerTransition(c.value(le), p.value(le))
        : N.value.forEach((E, fe) => E.triggerTransition(c.value(fe), p.value(fe)))
    }
    function i() {
      a('update-flow-step')
    }
    const W = (le, o = false) => {
        ;(R(le, o), n.spaceConfirm && a('select-date'))
      },
      se = (le, o, E = 0) => {
        var fe
        ;(fe = v.value[E]) == null || fe.toggleMonthPicker(le, o)
      },
      T = (le, o, E = 0) => {
        var fe
        ;(fe = v.value[E]) == null || fe.toggleYearPicker(le, o)
      },
      re = (le, o, E) => {
        var fe
        ;(fe = ee.value) == null || fe.toggleTimePicker(le, o, E)
      },
      l = (le, o) => {
        var E
        if (!n.range) {
          const fe = d.value ? d.value : O,
            I = o ? new Date(o) : fe,
            $e = le ? startOfWeek(I, { weekStartsOn: 1 }) : endOfWeek(I, { weekStartsOn: 1 })
          ;(R({
            value: $e,
            current: getMonth(I) === c.value(0),
            text: '',
            classData: {}
          }),
            (E = document.getElementById(Ha($e))) == null || E.focus())
        }
      },
      w = (le) => {
        var o
        ;(o = v.value[0]) == null || o.handleMonthYearChange(le, true)
      },
      oe = (le) => {
        b(0, { month: c.value(0), year: p.value(0) + (le ? 1 : -1), fromNav: true })
      },
      M = (le, o) => {
        ;(le === qe.time && a(`time-picker-${o ? 'open' : 'close'}`), a('overlay-toggle', { open: o, overlay: le }))
      },
      he = (le) => {
        ;(a('overlay-toggle', { open: false, overlay: le }), a('focus-menu'))
      }
    return (
      t({
        clearHoverDate: ve,
        presetDate: j,
        selectCurrentDate: z,
        toggleMonthPicker: se,
        toggleYearPicker: T,
        toggleTimePicker: re,
        handleArrow: L,
        updateMonthYear: b,
        getSidebarProps: () => ({
          modelValue: d,
          month: c,
          year: p,
          time: Y,
          updateTime: ae,
          updateMonthYear: b,
          selectDate: R,
          presetDate: j
        }),
        changeMonth: w,
        changeYear: oe,
        selectWeekDate: l,
        setStartTime: D
      }),
      (le, o) => (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createVNode(
              ya,
              {
                'multi-calendars': unref(pe).count,
                collapse: le.collapse,
                'is-mobile': le.isMobile
              },
              {
                default: withCtx(({ instance: E, index: fe }) => [
                  le.disableMonthYearSelect
                    ? createCommentVNode('', true)
                    : (openBlock(),
                      createBlock(
                        Fr,
                        mergeProps(
                          {
                            key: 0,
                            ref: (I) => {
                              I && (v.value[fe] = I)
                            },
                            months: unref(Sn)(le.formatLocale, le.locale, le.monthNameFormat),
                            years: unref(qa)(le.yearRange, le.locale, le.reverseYears),
                            month: unref(c)(E),
                            year: unref(p)(E),
                            instance: E
                          },
                          le.$props,
                          {
                            onMount: o[0] || (o[0] = (I) => Z(unref(_t).header)),
                            onResetFlow: o[1] || (o[1] = (I) => le.$emit('reset-flow')),
                            onUpdateMonthYear: (I) => unref(b)(E, I),
                            onOverlayClosed: he,
                            onOverlayOpened:
                              o[2] || (o[2] = (I) => le.$emit('overlay-toggle', { open: true, overlay: I }))
                          }
                        ),
                        createSlots({ _: 2 }, [
                          renderList(unref(U), (I, $e) => ({
                            name: I,
                            fn: withCtx((be) => [renderSlot(le.$slots, I, normalizeProps(guardReactiveProps(be)))])
                          }))
                        ]),
                        1040,
                        ['months', 'years', 'month', 'year', 'instance', 'onUpdateMonthYear']
                      )),
                  createVNode(
                    Kr,
                    mergeProps(
                      {
                        ref: (I) => {
                          I && (N.value[fe] = I)
                        },
                        'mapped-dates': A.value(E),
                        month: unref(c)(E),
                        year: unref(p)(E),
                        instance: E
                      },
                      le.$props,
                      {
                        onSelectDate: (I) => unref(R)(I, E !== 1),
                        onHandleSpace: (I) => W(I, E !== 1),
                        onSetHoverDate: o[3] || (o[3] = (I) => unref(B)(I)),
                        onHandleScroll: (I) => unref(_)(I, E),
                        onHandleSwipe: (I) => unref(h2)(I, E),
                        onMount: o[4] || (o[4] = (I) => Z(unref(_t).calendar)),
                        onResetFlow: o[5] || (o[5] = (I) => le.$emit('reset-flow')),
                        onTooltipOpen: o[6] || (o[6] = (I) => le.$emit('tooltip-open', I)),
                        onTooltipClose: o[7] || (o[7] = (I) => le.$emit('tooltip-close', I))
                      }
                    ),
                    createSlots({ _: 2 }, [
                      renderList(unref(y), (I, $e) => ({
                        name: I,
                        fn: withCtx((be) => [renderSlot(le.$slots, I, normalizeProps(guardReactiveProps({ ...be })))])
                      }))
                    ]),
                    1040,
                    [
                      'mapped-dates',
                      'month',
                      'year',
                      'instance',
                      'onSelectDate',
                      'onHandleSpace',
                      'onHandleScroll',
                      'onHandleSwipe'
                    ]
                  )
                ]),
                _: 3
              },
              8,
              ['multi-calendars', 'collapse', 'is-mobile']
            ),
            le.enableTimePicker
              ? (openBlock(),
                createElementBlock('div', Qr, [
                  le.$slots['time-picker']
                    ? renderSlot(
                        le.$slots,
                        'time-picker',
                        normalizeProps(mergeProps({ key: 0 }, { time: unref(Y), updateTime: unref(ae) }))
                      )
                    : (openBlock(),
                      createBlock(
                        jn,
                        mergeProps(
                          {
                            key: 1,
                            ref_key: 'timePickerRef',
                            ref: ee
                          },
                          le.$props,
                          {
                            hours: unref(Y).hours,
                            minutes: unref(Y).minutes,
                            seconds: unref(Y).seconds,
                            'internal-model-value': le.internalModelValue,
                            'disabled-times-config': unref(f),
                            'validate-time': unref(m),
                            onMount: o[8] || (o[8] = (E) => Z(unref(_t).timePicker)),
                            'onUpdate:hours': o[9] || (o[9] = (E) => unref(ae)(E)),
                            'onUpdate:minutes': o[10] || (o[10] = (E) => unref(ae)(E, false)),
                            'onUpdate:seconds': o[11] || (o[11] = (E) => unref(ae)(E, false, true)),
                            onResetFlow: o[12] || (o[12] = (E) => le.$emit('reset-flow')),
                            onOverlayClosed: o[13] || (o[13] = (E) => M(E, false)),
                            onOverlayOpened: o[14] || (o[14] = (E) => M(E, true)),
                            onAmPmChange: o[15] || (o[15] = (E) => le.$emit('am-pm-change', E))
                          }
                        ),
                        createSlots({ _: 2 }, [
                          renderList(unref(S), (E, fe) => ({
                            name: E,
                            fn: withCtx((I) => [renderSlot(le.$slots, E, normalizeProps(guardReactiveProps(I)))])
                          }))
                        ]),
                        1040,
                        [
                          'hours',
                          'minutes',
                          'seconds',
                          'internal-model-value',
                          'disabled-times-config',
                          'validate-time'
                        ]
                      ))
                ]))
              : createCommentVNode('', true)
          ],
          64
        )
      )
    )
  }
})
var Xr = (e, t) => {
  const r = ref(),
    {
      defaultedMultiCalendars: a,
      defaultedConfig: n,
      defaultedHighlight: u,
      defaultedRange: c,
      propDates: p,
      defaultedFilters: d,
      defaultedMultiDates: Y
    } = Ye(e),
    { modelValue: f, year: O, month: m, calendars: P } = la(e, t),
    { isDisabled: F } = Pt(e),
    {
      selectYear: L,
      groupedYears: _,
      showYearPicker: h2,
      isDisabled: R,
      toggleYearPicker: b,
      handleYearSelect: j,
      handleYear: z
    } = Vn({
      modelValue: f,
      multiCalendars: a,
      range: c,
      highlight: u,
      calendars: P,
      propDates: p,
      month: m,
      year: O,
      filters: d,
      props: e,
      emit: t
    }),
    ae = (y, U) => [y, U].map((S) => format(S, 'MMMM', { locale: e.formatLocale })).join('-'),
    H = computed(
      () => (y) =>
        f.value
          ? Array.isArray(f.value)
            ? f.value.some((U) => isSameQuarter(y, U))
            : isSameQuarter(f.value, y)
          : false
    ),
    D = (y) => {
      if (c.value.enabled) {
        if (Array.isArray(f.value)) {
          const U = Te(y, f.value[0]) || Te(y, f.value[1])
          return ea(f.value, r.value, y) && !U
        }
        return false
      }
      return false
    },
    Q = (y, U) => y.quarter === getQuarter(U) && y.year === getYear(U),
    B = (y) =>
      typeof u.value == 'function'
        ? u.value({ quarter: getQuarter(y), year: getYear(y) })
        : !!u.value.quarters.find((U) => Q(U, y)),
    q = computed(() => (y) => {
      const U = set(/* @__PURE__ */ new Date(), { year: O.value(y) })
      return eachQuarterOfInterval({
        start: startOfYear(U),
        end: endOfYear(U)
      }).map((S) => {
        const Z = startOfQuarter(S),
          A = endOfQuarter(S),
          ie = F(S),
          i = D(Z),
          W = B(Z)
        return {
          text: ae(Z, A),
          value: Z,
          active: H.value(Z),
          highlighted: W,
          disabled: ie,
          isBetween: i
        }
      })
    }),
    ve = (y) => {
      ;(xa(y, f, Y.value.limit), t('auto-apply', true))
    },
    pe = (y) => {
      ;((f.value = en(f, y, t)), ga(f.value, t, e.autoApply, e.modelAuto))
    },
    v = (y) => {
      ;((f.value = y), t('auto-apply'))
    }
  return {
    defaultedConfig: n,
    defaultedMultiCalendars: a,
    groupedYears: _,
    year: O,
    isDisabled: R,
    quarters: q,
    showYearPicker: h2,
    modelValue: f,
    setHoverDate: (y) => {
      r.value = y
    },
    selectYear: L,
    selectQuarter: (y, U, S) => {
      if (!S)
        return (
          (P.value[U].month = getMonth(endOfQuarter(y))),
          Y.value.enabled ? ve(y) : c.value.enabled ? pe(y) : v(y)
        )
    },
    toggleYearPicker: b,
    handleYearSelect: j,
    handleYear: z
  }
}
var Jr = { class: 'dp--quarter-items' }
var Zr = ['data-test-id', 'disabled', 'onClick', 'onMouseover']
var xr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: 'QuarterPicker',
  props: {
    ...ct
  },
  emits: [
    'update:internal-model-value',
    'reset-flow',
    'overlay-closed',
    'auto-apply',
    'range-start',
    'range-end',
    'overlay-toggle',
    'update-month-year'
  ],
  setup(e, { expose: t, emit: r }) {
    const a = r,
      n = e,
      u = useSlots(),
      c = at(u, 'yearMode'),
      {
        defaultedMultiCalendars: p,
        defaultedConfig: d,
        groupedYears: Y,
        year: f,
        isDisabled: O,
        quarters: m,
        modelValue: P,
        showYearPicker: F,
        setHoverDate: L,
        selectQuarter: _,
        toggleYearPicker: h2,
        handleYearSelect: R,
        handleYear: b
      } = Xr(n, a)
    return (
      t({
        getSidebarProps: () => ({
          modelValue: P,
          year: f,
          selectQuarter: _,
          handleYearSelect: R,
          handleYear: b
        })
      }),
      (z, ae) => (
        openBlock(),
        createBlock(
          ya,
          {
            'multi-calendars': unref(p).count,
            collapse: z.collapse,
            stretch: '',
            'is-mobile': z.isMobile
          },
          {
            default: withCtx(({ instance: H }) => [
              createBaseVNode(
                'div',
                {
                  class: 'dp-quarter-picker-wrap',
                  style: normalizeStyle({ minHeight: `${unref(d).modeHeight}px` })
                },
                [
                  z.$slots['top-extra']
                    ? renderSlot(z.$slots, 'top-extra', {
                        key: 0,
                        value: z.internalModelValue
                      })
                    : createCommentVNode('', true),
                  createBaseVNode('div', null, [
                    createVNode(
                      Hn,
                      mergeProps(z.$props, {
                        items: unref(Y)(H),
                        instance: H,
                        'show-year-picker': unref(F)[H],
                        year: unref(f)(H),
                        'is-disabled': (D) => unref(O)(H, D),
                        onHandleYear: (D) => unref(b)(H, D),
                        onYearSelect: (D) => unref(R)(D, H),
                        onToggleYearPicker: (D) =>
                          unref(h2)(H, D == null ? void 0 : D.flow, D == null ? void 0 : D.show)
                      }),
                      createSlots({ _: 2 }, [
                        renderList(unref(c), (D, Q) => ({
                          name: D,
                          fn: withCtx((B) => [renderSlot(z.$slots, D, normalizeProps(guardReactiveProps(B)))])
                        }))
                      ]),
                      1040,
                      [
                        'items',
                        'instance',
                        'show-year-picker',
                        'year',
                        'is-disabled',
                        'onHandleYear',
                        'onYearSelect',
                        'onToggleYearPicker'
                      ]
                    )
                  ]),
                  createBaseVNode('div', Jr, [
                    (openBlock(true),
                    createElementBlock(
                      Fragment,
                      null,
                      renderList(
                        unref(m)(H),
                        (D, Q) => (
                          openBlock(),
                          createElementBlock('div', { key: Q }, [
                            createBaseVNode(
                              'button',
                              {
                                type: 'button',
                                class: normalizeClass([
                                  'dp--qr-btn',
                                  {
                                    'dp--qr-btn-active': D.active,
                                    'dp--qr-btn-between': D.isBetween,
                                    'dp--qr-btn-disabled': D.disabled,
                                    'dp--highlighted': D.highlighted
                                  }
                                ]),
                                'data-test-id': D.value,
                                disabled: D.disabled,
                                onClick: (B) => unref(_)(D.value, H, D.disabled),
                                onMouseover: (B) => unref(L)(D.value)
                              },
                              [
                                z.$slots.quarter
                                  ? renderSlot(z.$slots, 'quarter', {
                                      key: 0,
                                      value: D.value,
                                      text: D.text
                                    })
                                  : (openBlock(),
                                    createElementBlock(
                                      Fragment,
                                      { key: 1 },
                                      [createTextVNode(toDisplayString(D.text), 1)],
                                      64
                                    ))
                              ],
                              42,
                              Zr
                            )
                          ])
                        )
                      ),
                      128
                    ))
                  ])
                ],
                4
              )
            ]),
            _: 3
          },
          8,
          ['multi-calendars', 'collapse', 'is-mobile']
        )
      )
    )
  }
})
var Gn = (e, t) => {
  const r = ref(0)
  ;(onMounted(() => {
    ;(a(), window.addEventListener('resize', a, { passive: true }))
  }),
    onUnmounted(() => {
      window.removeEventListener('resize', a)
    }))
  const a = () => {
    r.value = window.document.documentElement.clientWidth
  }
  return {
    isMobile: computed(() => (r.value <= e.value.mobileBreakpoint && !t ? true : void 0))
  }
}
var eo = ['id', 'tabindex', 'role', 'aria-label']
var to = {
  key: 0,
  class: 'dp--menu-load-container'
}
var ao = {
  key: 1,
  class: 'dp--menu-header'
}
var no = ['data-dp-mobile']
var lo = {
  key: 0,
  class: 'dp__sidebar_left'
}
var ro = ['data-dp-mobile']
var oo = ['data-test-id', 'data-dp-mobile', 'onClick', 'onKeydown']
var so = {
  key: 2,
  class: 'dp__sidebar_right'
}
var uo = {
  key: 3,
  class: 'dp__action_extra'
}
var gn = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: 'DatepickerMenu',
  props: {
    ...pa,
    shadow: { type: Boolean, default: false },
    openOnTop: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    noOverlayFocus: { type: Boolean, default: false },
    collapse: { type: Boolean, default: false },
    getInputRect: { type: Function, default: () => ({}) },
    isTextInputDate: { type: Boolean, default: false }
  },
  emits: [
    'close-picker',
    'select-date',
    'auto-apply',
    'time-update',
    'flow-step',
    'update-month-year',
    'invalid-select',
    'update:internal-model-value',
    'recalculate-position',
    'invalid-fixed-range',
    'tooltip-open',
    'tooltip-close',
    'time-picker-open',
    'time-picker-close',
    'am-pm-change',
    'range-start',
    'range-end',
    'auto-apply-invalid',
    'date-update',
    'invalid-date',
    'overlay-toggle',
    'menu-blur'
  ],
  setup(e, { expose: t, emit: r }) {
    const a = r,
      n = e,
      u = ref(null),
      c = computed(() => {
        const { openOnTop: k, ...x } = n
        return {
          ...x,
          isMobile: _.value,
          flowStep: pe.value,
          menuWrapRef: u.value
        }
      }),
      { setMenuFocused: p, setShiftKey: d, control: Y } = zn(),
      f = useSlots(),
      {
        defaultedTextInput: O,
        defaultedInline: m,
        defaultedConfig: P,
        defaultedUI: F,
        handleEventPropagation: L
      } = Ye(n),
      { isMobile: _ } = Gn(P, n.shadow),
      h2 = ref(null),
      R = ref(0),
      b = ref(null),
      j = ref(false),
      z = ref(null),
      ae = ref(false),
      H = (k) => {
        ;((ae.value = true), P.value.allowPreventDefault && k.preventDefault(), $t(k, P.value, true))
      }
    ;(onMounted(() => {
      if (!n.shadow) {
        ;((j.value = true), D(), window.addEventListener('resize', D))
        const k = He(u)
        ;(k && !O.value.enabled && !m.value.enabled && (p(true), Z()),
          k && (k.addEventListener('pointerdown', H), k.addEventListener('mousedown', H)))
      }
      document.addEventListener('mousedown', Ee)
    }),
      onUnmounted(() => {
        ;(window.removeEventListener('resize', D), document.removeEventListener('mousedown', Ee))
        const k = He(u)
        k && (k.removeEventListener('pointerdown', H), k.removeEventListener('mousedown', H))
      }))
    const D = () => {
        const k = He(b)
        k && (R.value = k.getBoundingClientRect().width)
      },
      { arrowRight: Q, arrowLeft: B, arrowDown: q, arrowUp: ve } = St(),
      { flowStep: pe, updateFlowStep: v, childMount: N, resetFlow: ee, handleFlow: y } = mo(n, a, z),
      U = computed(() => (n.monthPicker ? gr : n.yearPicker ? br : n.timePicker ? _r : n.quarterPicker ? xr : qr)),
      S = computed(() => {
        var Ie
        if (P.value.arrowLeft) return P.value.arrowLeft
        const k = (Ie = u.value) == null ? void 0 : Ie.getBoundingClientRect(),
          x = n.getInputRect()
        return (x == null ? void 0 : x.width) < (R == null ? void 0 : R.value) &&
          (x == null ? void 0 : x.left) <= ((k == null ? void 0 : k.left) ?? 0)
          ? `${(x == null ? void 0 : x.width) / 2}px`
          : (x == null ? void 0 : x.right) >= ((k == null ? void 0 : k.right) ?? 0) &&
              (x == null ? void 0 : x.width) < (R == null ? void 0 : R.value)
            ? `${(R == null ? void 0 : R.value) - (x == null ? void 0 : x.width) / 2}px`
            : '50%'
      }),
      Z = () => {
        const k = He(u)
        k && k.focus({ preventScroll: true })
      },
      A = computed(() => {
        var k
        return ((k = z.value) == null ? void 0 : k.getSidebarProps()) || {}
      }),
      ie = () => {
        n.openOnTop && a('recalculate-position')
      },
      i = at(f, 'action'),
      W = computed(() =>
        n.monthPicker || n.yearPicker ? at(f, 'monthYear') : n.timePicker ? at(f, 'timePicker') : at(f, 'shared')
      ),
      se = computed(() => (n.openOnTop ? 'dp__arrow_bottom' : 'dp__arrow_top')),
      T = computed(() => ({
        dp__menu_disabled: n.disabled,
        dp__menu_readonly: n.readonly,
        'dp-menu-loading': n.loading
      })),
      re = computed(() => ({
        dp__menu: true,
        dp__menu_index: !m.value.enabled,
        dp__relative: m.value.enabled,
        ...(F.value.menu ?? {})
      })),
      l = (k) => {
        $t(k, P.value, true)
      },
      w = (k) => {
        n.escClose && (a('close-picker'), L(k))
      },
      oe = (k) => {
        if (n.arrowNavigation) {
          if (k === Ze.up) return ve()
          if (k === Ze.down) return q()
          if (k === Ze.left) return B()
          if (k === Ze.right) return Q()
        } else
          k === Ze.left || k === Ze.up
            ? o('handleArrow', Ze.left, 0, k === Ze.up)
            : o('handleArrow', Ze.right, 0, k === Ze.down)
      },
      M = (k) => {
        ;(d(k.shiftKey),
          !n.disableMonthYearSelect &&
            k.code === Oe.tab &&
            k.target.classList.contains('dp__menu') &&
            Y.value.shiftKeyInMenu &&
            (k.preventDefault(), $t(k, P.value, true), a('close-picker')))
      },
      he = () => {
        ;(Z(), a('time-picker-close'))
      },
      ke = (k) => {
        var x, Ie, Ue
        ;((x = z.value) == null || x.toggleTimePicker(false, false),
          (Ie = z.value) == null || Ie.toggleMonthPicker(false, false, k),
          (Ue = z.value) == null || Ue.toggleYearPicker(false, false, k))
      },
      le = (k, x = 0) => {
        var Ie, Ue, rt
        return k === 'month'
          ? (Ie = z.value) == null
            ? void 0
            : Ie.toggleMonthPicker(false, true, x)
          : k === 'year'
            ? (Ue = z.value) == null
              ? void 0
              : Ue.toggleYearPicker(false, true, x)
            : k === 'time'
              ? (rt = z.value) == null
                ? void 0
                : rt.toggleTimePicker(true, false)
              : ke(x)
      },
      o = (k, ...x) => {
        var Ie, Ue
        ;(Ie = z.value) != null && Ie[k] && ((Ue = z.value) == null || Ue[k](...x))
      },
      E = () => {
        o('selectCurrentDate')
      },
      fe = (k, x) => {
        o('presetDate', toValue(k), x)
      },
      I = () => {
        o('clearHoverDate')
      },
      $e = (k, x) => {
        o('updateMonthYear', k, x)
      },
      be = (k, x) => {
        ;(k.preventDefault(), oe(x))
      },
      Pe = (k) => {
        var x, Ie, Ue
        if ((M(k), k.key === Oe.home || k.key === Oe.end))
          return o('selectWeekDate', k.key === Oe.home, k.target.getAttribute('id'))
        switch (
          ((k.key === Oe.pageUp || k.key === Oe.pageDown) &&
            (k.shiftKey
              ? (o('changeYear', k.key === Oe.pageUp), (x = Fa(u.value, 'overlay-year')) == null || x.focus())
              : (o('changeMonth', k.key === Oe.pageUp),
                (Ie = Fa(u.value, k.key === Oe.pageUp ? 'action-prev' : 'action-next')) == null || Ie.focus()),
            k.target.getAttribute('id') && ((Ue = u.value) == null || Ue.focus({ preventScroll: true }))),
          k.key)
        ) {
          case Oe.esc:
            return w(k)
          case Oe.arrowLeft:
            return be(k, Ze.left)
          case Oe.arrowRight:
            return be(k, Ze.right)
          case Oe.arrowUp:
            return be(k, Ze.up)
          case Oe.arrowDown:
            return be(k, Ze.down)
          default:
            return
        }
      },
      Ee = (k) => {
        var x
        m.value.enabled &&
          !m.value.input &&
          !((x = u.value) != null && x.contains(k.target)) &&
          ae.value &&
          ((ae.value = false), a('menu-blur'))
      }
    return (
      t({
        updateMonthYear: $e,
        switchView: le,
        handleFlow: y,
        onValueCleared: () => {
          var k, x
          ;(x = (k = z.value) == null ? void 0 : k.setStartTime) == null || x.call(k)
        }
      }),
      (k, x) => {
        var Ie, Ue, rt
        return (
          openBlock(),
          createElementBlock(
            'div',
            {
              id: k.uid ? `dp-menu-${k.uid}` : void 0,
              ref_key: 'dpMenuRef',
              ref: u,
              tabindex: unref(m).enabled ? void 0 : '0',
              role: unref(m).enabled ? void 0 : 'dialog',
              'aria-label': (Ie = k.ariaLabels) == null ? void 0 : Ie.menu,
              class: normalizeClass(re.value),
              style: normalizeStyle({ '--dp-arrow-left': S.value }),
              onMouseleave: I,
              onClick: l,
              onKeydown: Pe
            },
            [
              ((k.disabled || k.readonly) && unref(m).enabled) || k.loading
                ? (openBlock(),
                  createElementBlock(
                    'div',
                    {
                      key: 0,
                      class: normalizeClass(T.value)
                    },
                    [
                      k.loading
                        ? (openBlock(),
                          createElementBlock(
                            'div',
                            to,
                            x[19] || (x[19] = [createBaseVNode('span', { class: 'dp--menu-loader' }, null, -1)])
                          ))
                        : createCommentVNode('', true)
                    ],
                    2
                  ))
                : createCommentVNode('', true),
              k.$slots['menu-header']
                ? (openBlock(), createElementBlock('div', ao, [renderSlot(k.$slots, 'menu-header')]))
                : createCommentVNode('', true),
              !unref(m).enabled && !k.teleportCenter
                ? (openBlock(),
                  createElementBlock(
                    'div',
                    {
                      key: 2,
                      class: normalizeClass(se.value)
                    },
                    null,
                    2
                  ))
                : createCommentVNode('', true),
              createBaseVNode(
                'div',
                {
                  ref_key: 'innerMenuRef',
                  ref: b,
                  class: normalizeClass({
                    dp__menu_content_wrapper:
                      ((Ue = k.presetDates) == null ? void 0 : Ue.length) ||
                      !!k.$slots['left-sidebar'] ||
                      !!k.$slots['right-sidebar'],
                    'dp--menu-content-wrapper-collapsed':
                      e.collapse &&
                      (((rt = k.presetDates) == null ? void 0 : rt.length) ||
                        !!k.$slots['left-sidebar'] ||
                        !!k.$slots['right-sidebar'])
                  }),
                  'data-dp-mobile': unref(_),
                  style: normalizeStyle({ '--dp-menu-width': `${R.value}px` })
                },
                [
                  k.$slots['left-sidebar']
                    ? (openBlock(),
                      createElementBlock('div', lo, [
                        renderSlot(k.$slots, 'left-sidebar', normalizeProps(guardReactiveProps(A.value)))
                      ]))
                    : createCommentVNode('', true),
                  k.presetDates.length
                    ? (openBlock(),
                      createElementBlock(
                        'div',
                        {
                          key: 1,
                          class: normalizeClass({ 'dp--preset-dates-collapsed': e.collapse, 'dp--preset-dates': true }),
                          'data-dp-mobile': unref(_)
                        },
                        [
                          (openBlock(true),
                          createElementBlock(
                            Fragment,
                            null,
                            renderList(
                              k.presetDates,
                              (de, Rt) => (
                                openBlock(),
                                createElementBlock(
                                  Fragment,
                                  { key: Rt },
                                  [
                                    de.slot
                                      ? renderSlot(k.$slots, de.slot, {
                                          key: 0,
                                          presetDate: fe,
                                          label: de.label,
                                          value: de.value
                                        })
                                      : (openBlock(),
                                        createElementBlock(
                                          'button',
                                          {
                                            key: 1,
                                            type: 'button',
                                            style: normalizeStyle(de.style || {}),
                                            class: normalizeClass([
                                              'dp__btn dp--preset-range',
                                              { 'dp--preset-range-collapsed': e.collapse }
                                            ]),
                                            'data-test-id': de.testId ?? void 0,
                                            'data-dp-mobile': unref(_),
                                            onClick: withModifiers((ft) => fe(de.value, de.noTz), ['prevent']),
                                            onKeydown: (ft) => unref(xe)(ft, () => fe(de.value, de.noTz), true)
                                          },
                                          toDisplayString(de.label),
                                          47,
                                          oo
                                        ))
                                  ],
                                  64
                                )
                              )
                            ),
                            128
                          ))
                        ],
                        10,
                        ro
                      ))
                    : createCommentVNode('', true),
                  createBaseVNode(
                    'div',
                    {
                      ref_key: 'calendarWrapperRef',
                      ref: h2,
                      class: 'dp__instance_calendar',
                      role: 'document'
                    },
                    [
                      (openBlock(),
                      createBlock(
                        resolveDynamicComponent(U.value),
                        mergeProps(
                          {
                            ref_key: 'dynCmpRef',
                            ref: z
                          },
                          c.value,
                          {
                            'flow-step': unref(pe),
                            onMount: unref(N),
                            onUpdateFlowStep: unref(v),
                            onResetFlow: unref(ee),
                            onFocusMenu: Z,
                            onSelectDate: x[0] || (x[0] = (de) => k.$emit('select-date')),
                            onDateUpdate: x[1] || (x[1] = (de) => k.$emit('date-update', de)),
                            onTooltipOpen: x[2] || (x[2] = (de) => k.$emit('tooltip-open', de)),
                            onTooltipClose: x[3] || (x[3] = (de) => k.$emit('tooltip-close', de)),
                            onAutoApply: x[4] || (x[4] = (de) => k.$emit('auto-apply', de)),
                            onRangeStart: x[5] || (x[5] = (de) => k.$emit('range-start', de)),
                            onRangeEnd: x[6] || (x[6] = (de) => k.$emit('range-end', de)),
                            onInvalidFixedRange: x[7] || (x[7] = (de) => k.$emit('invalid-fixed-range', de)),
                            onTimeUpdate: x[8] || (x[8] = (de) => k.$emit('time-update')),
                            onAmPmChange: x[9] || (x[9] = (de) => k.$emit('am-pm-change', de)),
                            onTimePickerOpen: x[10] || (x[10] = (de) => k.$emit('time-picker-open', de)),
                            onTimePickerClose: he,
                            onRecalculatePosition: ie,
                            onUpdateMonthYear: x[11] || (x[11] = (de) => k.$emit('update-month-year', de)),
                            onAutoApplyInvalid: x[12] || (x[12] = (de) => k.$emit('auto-apply-invalid', de)),
                            onInvalidDate: x[13] || (x[13] = (de) => k.$emit('invalid-date', de)),
                            onOverlayToggle: x[14] || (x[14] = (de) => k.$emit('overlay-toggle', de)),
                            'onUpdate:internalModelValue':
                              x[15] || (x[15] = (de) => k.$emit('update:internal-model-value', de))
                          }
                        ),
                        createSlots({ _: 2 }, [
                          renderList(W.value, (de, Rt) => ({
                            name: de,
                            fn: withCtx((ft) => [
                              renderSlot(k.$slots, de, normalizeProps(guardReactiveProps({ ...ft })))
                            ])
                          }))
                        ]),
                        1040,
                        ['flow-step', 'onMount', 'onUpdateFlowStep', 'onResetFlow']
                      ))
                    ],
                    512
                  ),
                  k.$slots['right-sidebar']
                    ? (openBlock(),
                      createElementBlock('div', so, [
                        renderSlot(k.$slots, 'right-sidebar', normalizeProps(guardReactiveProps(A.value)))
                      ]))
                    : createCommentVNode('', true),
                  k.$slots['action-extra']
                    ? (openBlock(),
                      createElementBlock('div', uo, [
                        k.$slots['action-extra']
                          ? renderSlot(k.$slots, 'action-extra', {
                              key: 0,
                              selectCurrentDate: E
                            })
                          : createCommentVNode('', true)
                      ]))
                    : createCommentVNode('', true)
                ],
                14,
                no
              ),
              !k.autoApply || unref(P).keepActionRow
                ? (openBlock(),
                  createBlock(
                    ur,
                    mergeProps(
                      {
                        key: 3,
                        'menu-mount': j.value
                      },
                      c.value,
                      {
                        'calendar-width': R.value,
                        onClosePicker: x[16] || (x[16] = (de) => k.$emit('close-picker')),
                        onSelectDate: x[17] || (x[17] = (de) => k.$emit('select-date')),
                        onInvalidSelect: x[18] || (x[18] = (de) => k.$emit('invalid-select')),
                        onSelectNow: E
                      }
                    ),
                    createSlots({ _: 2 }, [
                      renderList(unref(i), (de, Rt) => ({
                        name: de,
                        fn: withCtx((ft) => [renderSlot(k.$slots, de, normalizeProps(guardReactiveProps({ ...ft })))])
                      }))
                    ]),
                    1040,
                    ['menu-mount', 'calendar-width']
                  ))
                : createCommentVNode('', true)
            ],
            46,
            eo
          )
        )
      }
    )
  }
})
var Lt = ((e) => ((e.center = 'center'), (e.left = 'left'), (e.right = 'right'), e))(Lt || {})
var io = ({
  menuRef: e,
  menuRefInner: t,
  inputRef: r,
  pickerWrapperRef: a,
  inline: n,
  emit: u,
  props: c,
  slots: p
}) => {
  const { defaultedConfig: d } = Ye(c),
    Y = ref({}),
    f = ref(false),
    O = ref({
      top: '0',
      left: '0'
    }),
    m = ref(false),
    P = toRef(c, 'teleportCenter')
  watch(P, () => {
    ;((O.value = JSON.parse(JSON.stringify({}))), z())
  })
  const F = (y) => {
      if (c.teleport) {
        const U = y.getBoundingClientRect()
        return {
          left: U.left + window.scrollX,
          top: U.top + window.scrollY
        }
      }
      return { top: 0, left: 0 }
    },
    L = (y, U) => {
      O.value.left = `${y + U - Y.value.width}px`
    },
    _ = (y) => {
      O.value.left = `${y}px`
    },
    h2 = (y, U) => {
      ;(c.position === Lt.left && _(y),
        c.position === Lt.right && L(y, U),
        c.position === Lt.center && (O.value.left = `${y + U / 2 - Y.value.width / 2}px`))
    },
    R = (y) => {
      const { width: U, height: S } = y.getBoundingClientRect(),
        { top: Z, left: A } = F(y)
      return { top: +Z, left: +A, width: U, height: S }
    },
    b = () => {
      ;((O.value.left = '50%'),
        (O.value.top = '50%'),
        (O.value.transform = 'translate(-50%, -50%)'),
        (O.value.position = 'fixed'),
        delete O.value.opacity)
    },
    j = () => {
      const y = He(r)
      O.value = c.altPosition(y)
    },
    z = (y = true) => {
      var U
      if (!n.value.enabled) {
        if (P.value) return b()
        if (c.altPosition !== null) return j()
        if (y) {
          const S = c.teleport ? ((U = t.value) == null ? void 0 : U.$el) : e.value
          ;(S && (Y.value = S.getBoundingClientRect()), u('recalculate-position'))
        }
        return ve()
      }
    },
    ae = ({ inputEl: y, left: U, width: S }) => {
      ;(window.screen.width > 768 && !f.value && h2(U, S), Q(y))
    },
    H = (y) => {
      const { top: U, left: S, height: Z, width: A } = R(y)
      ;((O.value.top = `${Z + U + +c.offset}px`),
        (m.value = false),
        f.value || (O.value.left = `${S + A / 2 - Y.value.width / 2}px`),
        ae({ inputEl: y, left: S, width: A }))
    },
    D = (y) => {
      const { top: U, left: S, width: Z } = R(y)
      ;((O.value.top = `${U - +c.offset - Y.value.height}px`), (m.value = true), ae({ inputEl: y, left: S, width: Z }))
    },
    Q = (y) => {
      if (c.autoPosition) {
        const { left: U, width: S } = R(y),
          { left: Z, right: A } = Y.value
        if (!f.value) {
          if (Math.abs(Z) !== Math.abs(A)) {
            if (Z <= 0) return ((f.value = true), _(U))
            if (A >= document.documentElement.clientWidth) return ((f.value = true), L(U, S))
          }
          return h2(U, S)
        }
      }
    },
    B = () => {
      const y = He(r)
      if (y) {
        if (c.autoPosition === it.top) return it.top
        if (c.autoPosition === it.bottom) return it.bottom
        const { height: U } = Y.value,
          { top: S, height: Z } = y.getBoundingClientRect(),
          ie = window.innerHeight - S - Z,
          i = S
        return U <= ie ? it.bottom : U > ie && U <= i ? it.top : ie >= i ? it.bottom : it.top
      }
      return it.bottom
    },
    q = (y) => (B() === it.bottom ? H(y) : D(y)),
    ve = () => {
      const y = He(r)
      if (y) return c.autoPosition ? q(y) : H(y)
    },
    pe = function (y) {
      if (y) {
        const U = y.scrollHeight > y.clientHeight,
          Z = window.getComputedStyle(y).overflowY.indexOf('hidden') !== -1
        return U && !Z
      }
      return true
    },
    v = function (y) {
      return !y || y === document.body || y.nodeType === Node.DOCUMENT_FRAGMENT_NODE
        ? window
        : pe(y)
          ? y
          : v(y.assignedSlot && d.value.shadowDom ? y.assignedSlot.parentNode : y.parentNode)
    },
    N = (y) => {
      if (y)
        switch (c.position) {
          case Lt.left:
            return { left: 0, transform: 'translateX(0)' }
          case Lt.right:
            return { left: `${y.width}px`, transform: 'translateX(-100%)' }
          default:
            return { left: `${y.width / 2}px`, transform: 'translateX(-50%)' }
        }
      return {}
    }
  return {
    openOnTop: m,
    menuStyle: O,
    xCorrect: f,
    setMenuPosition: z,
    getScrollableParent: v,
    shadowRender: (y, U, S) => {
      var T, re, l
      const Z = document.createElement('div'),
        A = (T = He(r)) == null ? void 0 : T.getBoundingClientRect()
      Z.setAttribute('id', 'dp--temp-container')
      const ie = (re = a.value) != null && re.clientWidth ? a.value : document.body
      ie.append(Z)
      const i = N(A),
        W = d.value.shadowDom
          ? Object.keys(p).filter((w) => ['right-sidebar', 'left-sidebar', 'top-extra', 'action-extra'].includes(w))
          : Object.keys(p),
        se = h(
          U,
          {
            ...S,
            shadow: true,
            style: { opacity: 0, position: 'absolute', ...i }
          },
          Object.fromEntries(W.map((w) => [w, p[w]]))
        )
      ;(y != null && (se.appContext = y.appContext),
        render(se, Z),
        (Y.value = (l = se.el) == null ? void 0 : l.getBoundingClientRect()),
        render(null, Z),
        ie.removeChild(Z))
    }
  }
}
var wt = [
  { name: 'clock-icon', use: ['time', 'calendar', 'shared'] },
  { name: 'arrow-left', use: ['month-year', 'calendar', 'shared', 'year-mode'] },
  { name: 'arrow-right', use: ['month-year', 'calendar', 'shared', 'year-mode'] },
  { name: 'arrow-up', use: ['time', 'calendar', 'month-year', 'shared'] },
  { name: 'arrow-down', use: ['time', 'calendar', 'month-year', 'shared'] },
  { name: 'calendar-icon', use: ['month-year', 'time', 'calendar', 'shared', 'year-mode'] },
  { name: 'day', use: ['calendar', 'shared'] },
  { name: 'month-overlay-value', use: ['calendar', 'month-year', 'shared'] },
  { name: 'year-overlay-value', use: ['calendar', 'month-year', 'shared', 'year-mode'] },
  { name: 'year-overlay', use: ['month-year', 'shared'] },
  { name: 'month-overlay', use: ['month-year', 'shared'] },
  { name: 'month-overlay-header', use: ['month-year', 'shared'] },
  { name: 'year-overlay-header', use: ['month-year', 'shared'] },
  { name: 'hours-overlay-value', use: ['calendar', 'time', 'shared'] },
  { name: 'hours-overlay-header', use: ['calendar', 'time', 'shared'] },
  { name: 'minutes-overlay-value', use: ['calendar', 'time', 'shared'] },
  { name: 'minutes-overlay-header', use: ['calendar', 'time', 'shared'] },
  { name: 'seconds-overlay-value', use: ['calendar', 'time', 'shared'] },
  { name: 'seconds-overlay-header', use: ['calendar', 'time', 'shared'] },
  { name: 'hours', use: ['calendar', 'time', 'shared'] },
  { name: 'minutes', use: ['calendar', 'time', 'shared'] },
  { name: 'month', use: ['calendar', 'month-year', 'shared'] },
  { name: 'year', use: ['calendar', 'month-year', 'shared', 'year-mode'] },
  { name: 'action-buttons', use: ['action'] },
  { name: 'action-preview', use: ['action'] },
  { name: 'calendar-header', use: ['calendar', 'shared'] },
  { name: 'marker-tooltip', use: ['calendar', 'shared'] },
  { name: 'action-extra', use: ['menu'] },
  { name: 'time-picker-overlay', use: ['calendar', 'time', 'shared'] },
  { name: 'am-pm-button', use: ['calendar', 'time', 'shared'] },
  { name: 'left-sidebar', use: ['menu'] },
  { name: 'right-sidebar', use: ['menu'] },
  { name: 'month-year', use: ['month-year', 'shared'] },
  { name: 'time-picker', use: ['menu', 'shared'] },
  { name: 'action-row', use: ['action'] },
  { name: 'marker', use: ['calendar', 'shared'] },
  { name: 'quarter', use: ['shared'] },
  { name: 'top-extra', use: ['shared', 'month-year'] },
  { name: 'tp-inline-arrow-up', use: ['shared', 'time'] },
  { name: 'tp-inline-arrow-down', use: ['shared', 'time'] },
  { name: 'menu-header', use: ['menu'] }
]
var co = [{ name: 'trigger' }, { name: 'input-icon' }, { name: 'clear-icon' }, { name: 'dp-input' }]
var fo = {
  all: () => wt,
  monthYear: () => wt.filter((e) => e.use.includes('month-year')),
  input: () => co,
  timePicker: () => wt.filter((e) => e.use.includes('time')),
  action: () => wt.filter((e) => e.use.includes('action')),
  calendar: () => wt.filter((e) => e.use.includes('calendar')),
  menu: () => wt.filter((e) => e.use.includes('menu')),
  shared: () => wt.filter((e) => e.use.includes('shared')),
  yearMode: () => wt.filter((e) => e.use.includes('year-mode'))
}
var at = (e, t, r) => {
  const a = []
  return (
    fo[t]().forEach((n) => {
      e[n.name] && a.push(n.name)
    }),
    r != null &&
      r.length &&
      r.forEach((n) => {
        n.slot && a.push(n.slot)
      }),
    a
  )
}
var na = (e) => {
  const t = computed(() => (a) => (e.value ? (a ? e.value.open : e.value.close) : '')),
    r = computed(() => (a) => (e.value ? (a ? e.value.menuAppearTop : e.value.menuAppearBottom) : ''))
  return { transitionName: t, showTransition: !!e.value, menuTransition: r }
}
var la = (e, t, r) => {
  const { defaultedRange: a, defaultedTz: n } = Ye(e),
    u = K(tt(K(), n.value.timezone)),
    c = ref([{ month: getMonth(u), year: getYear(u) }]),
    p = (m) => {
      const P = {
        hours: getHours(u),
        minutes: getMinutes(u),
        seconds: 0
      }
      return a.value.enabled ? [P[m], P[m]] : P[m]
    },
    d = reactive({
      hours: p('hours'),
      minutes: p('minutes'),
      seconds: p('seconds')
    })
  watch(
    a,
    (m, P) => {
      m.enabled !== P.enabled && ((d.hours = p('hours')), (d.minutes = p('minutes')), (d.seconds = p('seconds')))
    },
    { deep: true }
  )
  const Y = computed({
      get: () => e.internalModelValue,
      set: (m) => {
        !e.readonly && !e.disabled && t('update:internal-model-value', m)
      }
    }),
    f = computed(() => (m) => (c.value[m] ? c.value[m].month : 0)),
    O = computed(() => (m) => (c.value[m] ? c.value[m].year : 0))
  return (
    watch(
      Y,
      (m, P) => {
        r && JSON.stringify(m ?? {}) !== JSON.stringify(P ?? {}) && r()
      },
      { deep: true }
    ),
    {
      calendars: c,
      time: d,
      modelValue: Y,
      month: f,
      year: O,
      today: u
    }
  )
}
var vo = (e, t) => {
  const {
      defaultedMultiCalendars: r,
      defaultedMultiDates: a,
      defaultedUI: n,
      defaultedHighlight: u,
      defaultedTz: c,
      propDates: p,
      defaultedRange: d
    } = Ye(t),
    { isDisabled: Y } = Pt(t),
    f = ref(null),
    O = ref(tt(/* @__PURE__ */ new Date(), c.value.timezone)),
    m = (l) => {
      ;(!l.current && t.hideOffsetDates) || (f.value = l.value)
    },
    P = () => {
      f.value = null
    },
    F = (l) =>
      Array.isArray(e.value) && d.value.enabled && e.value[0] && f.value
        ? l
          ? Fe(f.value, e.value[0])
          : Ne(f.value, e.value[0])
        : true,
    L = (l, w) => {
      const oe = () => (e.value ? (w ? e.value[0] || null : e.value[1]) : null),
        M = e.value && Array.isArray(e.value) ? oe() : null
      return Te(K(l.value), M)
    },
    _ = (l) => {
      const w = Array.isArray(e.value) ? e.value[0] : null
      return l ? !Ne(f.value ?? null, w) : true
    },
    h2 = (l, w = true) =>
      (d.value.enabled || t.weekPicker) && Array.isArray(e.value) && e.value.length === 2
        ? t.hideOffsetDates && !l.current
          ? false
          : Te(K(l.value), e.value[w ? 0 : 1])
        : d.value.enabled
          ? (L(l, w) && _(w)) || (Te(l.value, Array.isArray(e.value) ? e.value[0] : null) && F(w))
          : false,
    R = (l, w) => {
      if (Array.isArray(e.value) && e.value[0] && e.value.length === 1) {
        const oe = Te(l.value, f.value)
        return w ? Fe(e.value[0], l.value) && oe : Ne(e.value[0], l.value) && oe
      }
      return false
    },
    b = (l) =>
      !e.value || (t.hideOffsetDates && !l.current)
        ? false
        : d.value.enabled
          ? t.modelAuto && Array.isArray(e.value)
            ? Te(l.value, e.value[0] ? e.value[0] : O.value)
            : false
          : a.value.enabled && Array.isArray(e.value)
            ? e.value.some((w) => Te(w, l.value))
            : Te(l.value, e.value ? e.value : O.value),
    j = (l) => {
      if (d.value.autoRange || t.weekPicker) {
        if (f.value) {
          if (t.hideOffsetDates && !l.current) return false
          const w = addDays(f.value, +d.value.autoRange),
            oe = gt(K(f.value), t.weekStart)
          return t.weekPicker ? Te(oe[1], K(l.value)) : Te(w, K(l.value))
        }
        return false
      }
      return false
    },
    z = (l) => {
      if (d.value.autoRange || t.weekPicker) {
        if (f.value) {
          const w = addDays(f.value, +d.value.autoRange)
          if (t.hideOffsetDates && !l.current) return false
          const oe = gt(K(f.value), t.weekStart)
          return t.weekPicker ? Fe(l.value, oe[0]) && Ne(l.value, oe[1]) : Fe(l.value, f.value) && Ne(l.value, w)
        }
        return false
      }
      return false
    },
    ae = (l) => {
      if (d.value.autoRange || t.weekPicker) {
        if (f.value) {
          if (t.hideOffsetDates && !l.current) return false
          const w = gt(K(f.value), t.weekStart)
          return t.weekPicker ? Te(w[0], l.value) : Te(f.value, l.value)
        }
        return false
      }
      return false
    },
    H = (l) => ea(e.value, f.value, l.value),
    D = () => (t.modelAuto && Array.isArray(t.internalModelValue) ? !!t.internalModelValue[0] : false),
    Q = () => (t.modelAuto ? Pn(t.internalModelValue) : true),
    B = (l) => {
      if (t.weekPicker) return false
      const w = d.value.enabled ? !h2(l) && !h2(l, false) : true
      return !Y(l.value) && !b(l) && !(!l.current && t.hideOffsetDates) && w
    },
    q = (l) => (d.value.enabled ? (t.modelAuto ? D() && b(l) : false) : b(l)),
    ve = (l) => (u.value ? Ol(l.value, p.value.highlight) : false),
    pe = (l) => {
      const w = Y(l.value)
      return w && (typeof u.value == 'function' ? !u.value(l.value, w) : !u.value.options.highlightDisabled)
    },
    v = (l) => {
      var w
      return typeof u.value == 'function'
        ? u.value(l.value)
        : (w = u.value.weekdays) == null
          ? void 0
          : w.includes(l.value.getDay())
    },
    N = (l) =>
      (d.value.enabled || t.weekPicker) &&
      (!(r.value.count > 0) || l.current) &&
      Q() &&
      !(!l.current && t.hideOffsetDates) &&
      !b(l)
        ? H(l)
        : false,
    ee = (l) => {
      if (Array.isArray(e.value) && e.value.length === 1) {
        const { before: w, after: oe } = vn(+d.value.maxRange, e.value[0])
        return isBefore(l.value, w) || isAfter(l.value, oe)
      }
      return false
    },
    y = (l) => {
      if (Array.isArray(e.value) && e.value.length === 1) {
        const { before: w, after: oe } = vn(+d.value.minRange, e.value[0])
        return ea([w, oe], e.value[0], l.value)
      }
      return false
    },
    U = (l) =>
      d.value.enabled && (d.value.maxRange || d.value.minRange)
        ? d.value.maxRange && d.value.minRange
          ? ee(l) || y(l)
          : d.value.maxRange
            ? ee(l)
            : y(l)
        : false,
    S = (l) => {
      const { isRangeStart: w, isRangeEnd: oe } = i(l),
        M = d.value.enabled ? w || oe : false
      return {
        dp__cell_offset: !l.current,
        dp__pointer: !t.disabled && !(!l.current && t.hideOffsetDates) && !Y(l.value) && !U(l),
        dp__cell_disabled: Y(l.value) || U(l),
        dp__cell_highlight: !pe(l) && (ve(l) || v(l)) && !q(l) && !M && !ae(l) && !(N(l) && t.weekPicker) && !oe,
        dp__cell_highlight_active: !pe(l) && (ve(l) || v(l)) && q(l),
        dp__today: !t.noToday && Te(l.value, O.value) && l.current,
        'dp--past': Ne(l.value, O.value),
        'dp--future': Fe(l.value, O.value)
      }
    },
    Z = (l) => ({
      dp__active_date: q(l),
      dp__date_hover: B(l)
    }),
    A = (l) => {
      if (e.value && !Array.isArray(e.value)) {
        const w = gt(e.value, t.weekStart)
        return {
          ...se(l),
          dp__range_start: Te(w[0], l.value),
          dp__range_end: Te(w[1], l.value),
          dp__range_between_week: Fe(l.value, w[0]) && Ne(l.value, w[1])
        }
      }
      return {
        ...se(l)
      }
    },
    ie = (l) => {
      if (e.value && Array.isArray(e.value)) {
        const w = gt(e.value[0], t.weekStart),
          oe = e.value[1] ? gt(e.value[1], t.weekStart) : []
        return {
          ...se(l),
          dp__range_start: Te(w[0], l.value) || Te(oe[0], l.value),
          dp__range_end: Te(w[1], l.value) || Te(oe[1], l.value),
          dp__range_between_week:
            (Fe(l.value, w[0]) && Ne(l.value, w[1])) || (Fe(l.value, oe[0]) && Ne(l.value, oe[1])),
          dp__range_between: Fe(l.value, w[1]) && Ne(l.value, oe[0])
        }
      }
      return {
        ...se(l)
      }
    },
    i = (l) => {
      const w = r.value.count > 0 ? l.current && h2(l) && Q() : h2(l) && Q(),
        oe = r.value.count > 0 ? l.current && h2(l, false) && Q() : h2(l, false) && Q()
      return { isRangeStart: w, isRangeEnd: oe }
    },
    W = (l) => {
      const { isRangeStart: w, isRangeEnd: oe } = i(l)
      return {
        dp__range_start: w,
        dp__range_end: oe,
        dp__range_between: N(l),
        dp__date_hover: Te(l.value, f.value) && !w && !oe && !t.weekPicker,
        dp__date_hover_start: R(l, true),
        dp__date_hover_end: R(l, false)
      }
    },
    se = (l) => ({
      ...W(l),
      dp__cell_auto_range: z(l),
      dp__cell_auto_range_start: ae(l),
      dp__cell_auto_range_end: j(l)
    }),
    T = (l) =>
      d.value.enabled
        ? d.value.autoRange
          ? se(l)
          : t.modelAuto
            ? { ...Z(l), ...W(l) }
            : t.weekPicker
              ? ie(l)
              : W(l)
        : t.weekPicker
          ? A(l)
          : Z(l)
  return {
    setHoverDate: m,
    clearHoverDate: P,
    getDayClassData: (l) =>
      t.hideOffsetDates && !l.current
        ? {}
        : {
            ...S(l),
            ...T(l),
            [t.dayClass ? t.dayClass(l.value, t.internalModelValue) : '']: true,
            ...(n.value.calendarCell ?? {})
          }
  }
}
var Pt = (e) => {
  const { defaultedFilters: t, defaultedRange: r, propDates: a, defaultedMultiDates: n } = Ye(e),
    u = (v) =>
      a.value.disabledDates
        ? typeof a.value.disabledDates == 'function'
          ? a.value.disabledDates(K(v))
          : !!va(v, a.value.disabledDates)
        : false,
    c = (v) =>
      a.value.maxDate ? (e.yearPicker ? getYear(v) > getYear(a.value.maxDate) : Fe(v, a.value.maxDate)) : false,
    p = (v) =>
      a.value.minDate ? (e.yearPicker ? getYear(v) < getYear(a.value.minDate) : Ne(v, a.value.minDate)) : false,
    d = (v) => {
      const N = c(v),
        ee = p(v),
        y = u(v),
        S = t.value.months.map((W) => +W).includes(getMonth(v)),
        Z = e.disabledWeekDays.length ? e.disabledWeekDays.some((W) => +W === getDay(v)) : false,
        A = P(v),
        ie = getYear(v),
        i = ie < +e.yearRange[0] || ie > +e.yearRange[1]
      return !(N || ee || y || S || i || Z || A)
    },
    Y = (v, N) => Ne(...Mt(a.value.minDate, v, N)) || Te(...Mt(a.value.minDate, v, N)),
    f = (v, N) => Fe(...Mt(a.value.maxDate, v, N)) || Te(...Mt(a.value.maxDate, v, N)),
    O = (v, N, ee) => {
      let y = false
      return (a.value.maxDate && ee && f(v, N) && (y = true), a.value.minDate && !ee && Y(v, N) && (y = true), y)
    },
    m = (v, N, ee, y) => {
      let U = false
      return (
        y && (a.value.minDate || a.value.maxDate)
          ? a.value.minDate && a.value.maxDate
            ? (U = O(v, N, ee))
            : ((a.value.minDate && Y(v, N)) || (a.value.maxDate && f(v, N))) && (U = true)
          : (U = true),
        U
      )
    },
    P = (v) =>
      Array.isArray(a.value.allowedDates) && !a.value.allowedDates.length
        ? true
        : a.value.allowedDates
          ? !va(v, a.value.allowedDates, On(e.monthPicker, e.yearPicker))
          : false,
    F = (v) => !d(v),
    L = (v) => (r.value.noDisabledRange ? !eachDayOfInterval({ start: v[0], end: v[1] }).some((ee) => F(ee)) : true),
    _ = (v) => {
      if (v) {
        const N = getYear(v)
        return N >= +e.yearRange[0] && N <= e.yearRange[1]
      }
      return true
    },
    h2 = (v, N) => !!(Array.isArray(v) && v[N] && (r.value.maxRange || r.value.minRange) && _(v[N])),
    R = (v, N, ee = 0) => {
      if (h2(N, ee) && _(v)) {
        const y = differenceInCalendarDays(v, N[ee]),
          U = In(N[ee], v),
          S = U.length === 1 ? 0 : U.filter((A) => F(A)).length,
          Z = Math.abs(y) - (r.value.minMaxRawRange ? 0 : S)
        if (r.value.minRange && r.value.maxRange) return Z >= +r.value.minRange && Z <= +r.value.maxRange
        if (r.value.minRange) return Z >= +r.value.minRange
        if (r.value.maxRange) return Z <= +r.value.maxRange
      }
      return true
    },
    b = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation,
    j = (v) => (Array.isArray(v) ? [v[0] ? Ca(v[0]) : null, v[1] ? Ca(v[1]) : null] : Ca(v)),
    z = (v, N, ee) =>
      v.find((y) =>
        +y.hours === getHours(N) && y.minutes === '*' ? true : +y.minutes === getMinutes(N) && +y.hours === getHours(N)
      ) && ee,
    ae = (v, N, ee) => {
      const [y, U] = v,
        [S, Z] = N
      return !z(y, S, ee) && !z(U, Z, ee) && ee
    },
    H = (v, N) => {
      const ee = Array.isArray(N) ? N : [N]
      return Array.isArray(e.disabledTimes)
        ? Array.isArray(e.disabledTimes[0])
          ? ae(e.disabledTimes, ee, v)
          : !ee.some((y) => z(e.disabledTimes, y, v))
        : v
    },
    D = (v, N) => {
      const ee = Array.isArray(N) ? [Yt(N[0]), N[1] ? Yt(N[1]) : void 0] : Yt(N),
        y = !e.disabledTimes(ee)
      return v && y
    },
    Q = (v, N) => (e.disabledTimes ? (Array.isArray(e.disabledTimes) ? H(N, v) : D(N, v)) : N),
    B = (v) => {
      let N = true
      if (!v || b()) return true
      const ee = !a.value.minDate && !a.value.maxDate ? j(v) : v
      return (
        (e.maxTime || a.value.maxDate) && (N = fn(e.maxTime, a.value.maxDate, 'max', ze(ee), N)),
        (e.minTime || a.value.minDate) && (N = fn(e.minTime, a.value.minDate, 'min', ze(ee), N)),
        Q(v, N)
      )
    },
    q = (v) => {
      if (!e.monthPicker) return true
      let N = true
      const ee = K(dt(v))
      if (a.value.minDate && a.value.maxDate) {
        const y = K(dt(a.value.minDate)),
          U = K(dt(a.value.maxDate))
        return (Fe(ee, y) && Ne(ee, U)) || Te(ee, y) || Te(ee, U)
      }
      if (a.value.minDate) {
        const y = K(dt(a.value.minDate))
        N = Fe(ee, y) || Te(ee, y)
      }
      if (a.value.maxDate) {
        const y = K(dt(a.value.maxDate))
        N = Ne(ee, y) || Te(ee, y)
      }
      return N
    },
    ve = computed(() => (v) => (!e.enableTimePicker || e.ignoreTimeValidation ? true : B(v))),
    pe = computed(
      () => (v) =>
        e.monthPicker
          ? Array.isArray(v) && (r.value.enabled || n.value.enabled)
            ? !v.filter((ee) => !q(ee)).length
            : q(v)
          : true
    )
  return {
    isDisabled: F,
    validateDate: d,
    validateMonthYearInRange: m,
    isDateRangeAllowed: L,
    checkMinMaxRange: R,
    isValidTime: B,
    isTimeValid: ve,
    isMonthValid: pe
  }
}
var ha = () => {
  const e = computed(() => (a, n) => (a == null ? void 0 : a.includes(n))),
    t = computed(() => (a, n) => (a.count ? (a.solo ? true : n === 0) : true)),
    r = computed(() => (a, n) => (a.count ? (a.solo ? true : n === a.count - 1) : true))
  return { hideNavigationButtons: e, showLeftIcon: t, showRightIcon: r }
}
var mo = (e, t, r) => {
  const a = ref(0),
    n = reactive({
      [_t.timePicker]: !e.enableTimePicker || e.timePicker || e.monthPicker,
      [_t.calendar]: false,
      [_t.header]: false
    }),
    u = computed(() => e.monthPicker || e.timePicker),
    c = (O) => {
      var m
      if ((m = e.flow) != null && m.length) {
        if (!O && u.value) return f()
        ;((n[O] = true), Object.keys(n).filter((P) => !n[P]).length || f())
      }
    },
    p = () => {
      var O, m
      ;((O = e.flow) != null && O.length && a.value !== -1 && ((a.value += 1), t('flow-step', a.value), f()),
        ((m = e.flow) == null ? void 0 : m.length) === a.value && nextTick().then(() => d()))
    },
    d = () => {
      a.value = -1
    },
    Y = (O, m, ...P) => {
      var F, L
      e.flow[a.value] === O && r.value && ((L = (F = r.value)[m]) == null || L.call(F, ...P))
    },
    f = (O = 0) => {
      ;(O && (a.value += O),
        Y(qe.month, 'toggleMonthPicker', true),
        Y(qe.year, 'toggleYearPicker', true),
        Y(qe.calendar, 'toggleTimePicker', false, true),
        Y(qe.time, 'toggleTimePicker', true, true))
      const m = e.flow[a.value]
      ;(m === qe.hours || m === qe.minutes || m === qe.seconds) && Y(m, 'toggleTimePicker', true, true, m)
    }
  return { childMount: c, updateFlowStep: p, resetFlow: d, handleFlow: f, flowStep: a }
}
var po = {
  key: 1,
  class: 'dp__input_wrap'
}
var yo = [
  'id',
  'name',
  'inputmode',
  'placeholder',
  'disabled',
  'readonly',
  'required',
  'value',
  'autocomplete',
  'aria-label',
  'aria-disabled',
  'aria-invalid'
]
var go = {
  key: 2,
  class: 'dp--clear-btn'
}
var ho = ['aria-label']
var bo = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: 'DatepickerInput',
  props: {
    isMenuOpen: { type: Boolean, default: false },
    inputValue: { type: String, default: '' },
    ...pa
  },
  emits: [
    'clear',
    'open',
    'update:input-value',
    'set-input-date',
    'close',
    'select-date',
    'set-empty-date',
    'toggle',
    'focus-prev',
    'focus',
    'blur',
    'real-blur',
    'text-input'
  ],
  setup(e, { expose: t, emit: r }) {
    const a = r,
      n = e,
      {
        defaultedTextInput: u,
        defaultedAriaLabels: c,
        defaultedInline: p,
        defaultedConfig: d,
        defaultedRange: Y,
        defaultedMultiDates: f,
        defaultedUI: O,
        getDefaultPattern: m,
        getDefaultStartTime: P
      } = Ye(n),
      { checkMinMaxRange: F } = Pt(n),
      L = ref(),
      _ = ref(null),
      h2 = ref(false),
      R = ref(false),
      b = computed(() => ({
        dp__pointer: !n.disabled && !n.readonly && !u.value.enabled,
        dp__disabled: n.disabled,
        dp__input_readonly: !u.value.enabled,
        dp__input: true,
        dp__input_icon_pad: !n.hideInputIcon,
        dp__input_valid: typeof n.state == 'boolean' ? n.state : false,
        dp__input_invalid: typeof n.state == 'boolean' ? !n.state : false,
        dp__input_focus: h2.value || n.isMenuOpen,
        dp__input_reg: !u.value.enabled,
        ...(O.value.input ?? {})
      })),
      j = () => {
        ;(a('set-input-date', null), n.clearable && n.autoApply && (a('set-empty-date'), (L.value = null)))
      },
      z = (A) => {
        const ie = P()
        return _l(A, u.value.format ?? m(), ie ?? En({}, n.enableSeconds), n.inputValue, R.value, n.formatLocale)
      },
      ae = (A) => {
        const { rangeSeparator: ie } = u.value,
          [i, W] = A.split(`${ie}`)
        if (i) {
          const se = z(i.trim()),
            T = W ? z(W.trim()) : void 0
          if (isAfter(se, T)) return
          const re = se && T ? [se, T] : [se]
          F(T, re, 0) && (L.value = se ? re : null)
        }
      },
      H = () => {
        R.value = true
      },
      D = (A) => {
        if (Y.value.enabled) ae(A)
        else if (f.value.enabled) {
          const ie = A.split(';')
          L.value = ie.map((i) => z(i.trim())).filter((i) => i)
        } else L.value = z(A)
      },
      Q = (A) => {
        var i
        const ie = typeof A == 'string' ? A : (i = A.target) == null ? void 0 : i.value
        ;(ie !== '' ? (u.value.openMenu && !n.isMenuOpen && a('open'), D(ie), a('set-input-date', L.value)) : j(),
          (R.value = false),
          a('update:input-value', ie),
          a('text-input', A, L.value))
      },
      B = (A) => {
        u.value.enabled
          ? (D(A.target.value),
            u.value.enterSubmit && za(L.value) && n.inputValue !== ''
              ? (a('set-input-date', L.value, true), (L.value = null))
              : u.value.enterSubmit && n.inputValue === '' && ((L.value = null), a('clear')))
          : pe(A)
      },
      q = (A, ie) => {
        ;(u.value.enabled && u.value.tabSubmit && !ie && D(A.target.value),
          u.value.tabSubmit && za(L.value) && n.inputValue !== ''
            ? (a('set-input-date', L.value, true, true), (L.value = null))
            : u.value.tabSubmit && n.inputValue === '' && ((L.value = null), a('clear', true)))
      },
      ve = () => {
        ;((h2.value = true),
          a('focus'),
          nextTick().then(() => {
            var A
            u.value.enabled && u.value.selectOnFocus && ((A = _.value) == null || A.select())
          }))
      },
      pe = (A) => {
        if (($t(A, d.value, true), u.value.enabled && u.value.openMenu && !p.value.input)) {
          if (u.value.openMenu === 'open' && !n.isMenuOpen) return a('open')
          if (u.value.openMenu === 'toggle') return a('toggle')
        } else u.value.enabled || a('toggle')
      },
      v = () => {
        ;(a('real-blur'),
          (h2.value = false),
          (!n.isMenuOpen || (p.value.enabled && p.value.input)) && a('blur'),
          n.autoApply &&
            u.value.enabled &&
            L.value &&
            !n.isMenuOpen &&
            (a('set-input-date', L.value), a('select-date'), (L.value = null)))
      },
      N = (A) => {
        ;($t(A, d.value, true), a('clear'))
      },
      ee = () => {
        a('close')
      },
      y = (A) => {
        if (
          (A.key === 'Tab' && q(A),
          A.key === 'Enter' && B(A),
          A.key === 'Escape' && u.value.escClose && ee(),
          !u.value.enabled)
        ) {
          if (A.code === 'Tab') return
          A.preventDefault()
        }
      },
      U = () => {
        var A
        ;(A = _.value) == null || A.focus({ preventScroll: true })
      },
      S = (A) => {
        L.value = A
      },
      Z = (A) => {
        A.key === Oe.tab && q(A, true)
      }
    return (
      t({
        focusInput: U,
        setParsedDate: S
      }),
      (A, ie) => {
        var i, W, se
        return (
          openBlock(),
          createElementBlock('div', { onClick: pe }, [
            A.$slots.trigger && !A.$slots['dp-input'] && !unref(p).enabled
              ? renderSlot(A.$slots, 'trigger', { key: 0 })
              : createCommentVNode('', true),
            !A.$slots.trigger && (!unref(p).enabled || unref(p).input)
              ? (openBlock(),
                createElementBlock('div', po, [
                  A.$slots['dp-input'] &&
                  !A.$slots.trigger &&
                  (!unref(p).enabled || (unref(p).enabled && unref(p).input))
                    ? renderSlot(A.$slots, 'dp-input', {
                        key: 0,
                        value: e.inputValue,
                        isMenuOpen: e.isMenuOpen,
                        onInput: Q,
                        onEnter: B,
                        onTab: q,
                        onClear: N,
                        onBlur: v,
                        onKeypress: y,
                        onPaste: H,
                        onFocus: ve,
                        openMenu: () => A.$emit('open'),
                        closeMenu: () => A.$emit('close'),
                        toggleMenu: () => A.$emit('toggle')
                      })
                    : createCommentVNode('', true),
                  A.$slots['dp-input']
                    ? createCommentVNode('', true)
                    : (openBlock(),
                      createElementBlock(
                        'input',
                        {
                          key: 1,
                          id: A.uid ? `dp-input-${A.uid}` : void 0,
                          ref_key: 'inputRef',
                          ref: _,
                          'data-test-id': 'dp-input',
                          name: A.name,
                          class: normalizeClass(b.value),
                          inputmode: unref(u).enabled ? 'text' : 'none',
                          placeholder: A.placeholder,
                          disabled: A.disabled,
                          readonly: A.readonly,
                          required: A.required,
                          value: e.inputValue,
                          autocomplete: A.autocomplete,
                          'aria-label': (i = unref(c)) == null ? void 0 : i.input,
                          'aria-disabled': A.disabled || void 0,
                          'aria-invalid': A.state === false ? true : void 0,
                          onInput: Q,
                          onBlur: v,
                          onFocus: ve,
                          onKeypress: y,
                          onKeydown: ie[0] || (ie[0] = (T) => y(T)),
                          onPaste: H
                        },
                        null,
                        42,
                        yo
                      )),
                  createBaseVNode(
                    'div',
                    {
                      onClick: ie[3] || (ie[3] = (T) => a('toggle'))
                    },
                    [
                      A.$slots['input-icon'] && !A.hideInputIcon
                        ? (openBlock(),
                          createElementBlock(
                            'span',
                            {
                              key: 0,
                              class: 'dp__input_icon',
                              onClick: ie[1] || (ie[1] = (T) => a('toggle'))
                            },
                            [renderSlot(A.$slots, 'input-icon')]
                          ))
                        : createCommentVNode('', true),
                      !A.$slots['input-icon'] && !A.hideInputIcon && !A.$slots['dp-input']
                        ? (openBlock(),
                          createBlock(
                            unref(Gt),
                            {
                              key: 1,
                              'aria-label': (W = unref(c)) == null ? void 0 : W.calendarIcon,
                              class: 'dp__input_icon dp__input_icons',
                              onClick: ie[2] || (ie[2] = (T) => a('toggle'))
                            },
                            null,
                            8,
                            ['aria-label']
                          ))
                        : createCommentVNode('', true)
                    ]
                  ),
                  A.$slots['clear-icon'] &&
                  (A.alwaysClearable || (e.inputValue && A.clearable && !A.disabled && !A.readonly))
                    ? (openBlock(), createElementBlock('span', go, [renderSlot(A.$slots, 'clear-icon', { clear: N })]))
                    : createCommentVNode('', true),
                  !A.$slots['clear-icon'] &&
                  (A.alwaysClearable || (A.clearable && e.inputValue && !A.disabled && !A.readonly))
                    ? (openBlock(),
                      createElementBlock(
                        'button',
                        {
                          key: 3,
                          'aria-label': (se = unref(c)) == null ? void 0 : se.clearInput,
                          class: 'dp--clear-btn',
                          type: 'button',
                          onKeydown: ie[4] || (ie[4] = (T) => unref(xe)(T, () => N(T), true, Z)),
                          onClick: ie[5] || (ie[5] = withModifiers((T) => N(T), ['prevent']))
                        },
                        [
                          createVNode(unref(Tn), {
                            class: 'dp__input_icons',
                            'data-test-id': 'clear-icon'
                          })
                        ],
                        40,
                        ho
                      ))
                    : createCommentVNode('', true)
                ]))
              : createCommentVNode('', true)
          ])
        )
      }
    )
  }
})
var ko = typeof window < 'u' ? window : void 0
var Ea = () => {}
var wo = (e) => (getCurrentScope() ? (onScopeDispose(e), true) : false)
var Do = (e, t, r, a) => {
  if (!e) return Ea
  let n = Ea
  const u = watch(
      () => unref(e),
      (p) => {
        ;(n(),
          p &&
            (p.removeEventListener(t, r),
            p.addEventListener(t, r, a),
            (n = () => {
              ;(p.removeEventListener(t, r, a), (n = Ea))
            })))
      },
      { immediate: true, flush: 'post' }
    ),
    c = () => {
      ;(u(), n())
    }
  return (wo(c), c)
}
var Mo = (e, t, r, a = {}) => {
  const { window: n = ko, event: u = 'pointerdown' } = a
  return n
    ? Do(
        n,
        u,
        (p) => {
          const d = He(e),
            Y = He(t)
          !d || !Y || d === p.target || p.composedPath().includes(d) || p.composedPath().includes(Y) || r(p)
        },
        { passive: true }
      )
    : void 0
}
var $o = ['data-dp-mobile']
var Ao = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: 'VueDatePicker',
  props: {
    ...pa
  },
  emits: [
    'update:model-value',
    'update:model-timezone-value',
    'text-submit',
    'closed',
    'cleared',
    'open',
    'focus',
    'blur',
    'internal-model-change',
    'recalculate-position',
    'flow-step',
    'update-month-year',
    'invalid-select',
    'invalid-fixed-range',
    'tooltip-open',
    'tooltip-close',
    'time-picker-open',
    'time-picker-close',
    'am-pm-change',
    'range-start',
    'range-end',
    'date-update',
    'invalid-date',
    'overlay-toggle',
    'text-input'
  ],
  setup(e, { expose: t, emit: r }) {
    const a = r,
      n = e,
      u = useSlots(),
      c = ref(false),
      p = toRef(n, 'modelValue'),
      d = toRef(n, 'timezone'),
      Y = ref(null),
      f = ref(null),
      O = ref(null),
      m = ref(false),
      P = ref(null),
      F = ref(false),
      L = ref(false),
      _ = ref(false),
      h2 = ref(false),
      { setMenuFocused: R, setShiftKey: b } = zn(),
      { clearArrowNav: j } = St(),
      { validateDate: z, isValidTime: ae } = Pt(n),
      {
        defaultedTransitions: H,
        defaultedTextInput: D,
        defaultedInline: Q,
        defaultedConfig: B,
        defaultedRange: q,
        defaultedMultiDates: ve
      } = Ye(n),
      { menuTransition: pe, showTransition: v } = na(H),
      { isMobile: N } = Gn(B),
      ee = getCurrentInstance()
    ;(onMounted(() => {
      ;(re(n.modelValue),
        nextTick().then(() => {
          if (!Q.value.enabled) {
            const C = i(P.value)
            ;(C == null || C.addEventListener('scroll', fe), window == null || window.addEventListener('resize', I))
          }
        }),
        Q.value.enabled && (c.value = true),
        window == null || window.addEventListener('keyup', $e),
        window == null || window.addEventListener('keydown', be))
    }),
      onUnmounted(() => {
        if (!Q.value.enabled) {
          const C = i(P.value)
          ;(C == null || C.removeEventListener('scroll', fe), window == null || window.removeEventListener('resize', I))
        }
        ;(window == null || window.removeEventListener('keyup', $e),
          window == null || window.removeEventListener('keydown', be))
      }))
    const y = at(u, 'all', n.presetDates),
      U = at(u, 'input')
    watch(
      [p, d],
      () => {
        re(p.value)
      },
      { deep: true }
    )
    const {
        openOnTop: S,
        menuStyle: Z,
        xCorrect: A,
        setMenuPosition: ie,
        getScrollableParent: i,
        shadowRender: W
      } = io({
        menuRef: Y,
        menuRefInner: f,
        inputRef: O,
        pickerWrapperRef: P,
        inline: Q,
        emit: a,
        props: n,
        slots: u
      }),
      {
        inputValue: se,
        internalModelValue: T,
        parseExternalModelValue: re,
        emitModelValue: l,
        formatInputValue: w,
        checkBeforeEmit: oe
      } = lr(a, n, m),
      M = computed(() => ({
        dp__main: true,
        dp__theme_dark: n.dark,
        dp__theme_light: !n.dark,
        dp__flex_display: Q.value.enabled,
        'dp--flex-display-collapsed': _.value,
        dp__flex_display_with_input: Q.value.input
      })),
      he = computed(() => (n.dark ? 'dp__theme_dark' : 'dp__theme_light')),
      ke = computed(() =>
        n.teleport
          ? {
              to: typeof n.teleport == 'boolean' ? 'body' : n.teleport,
              disabled: !n.teleport || Q.value.enabled
            }
          : {}
      ),
      le = computed(() => ({ class: 'dp__outer_menu_wrap' })),
      o = computed(() => Q.value.enabled && (n.timePicker || n.monthPicker || n.yearPicker || n.quarterPicker)),
      E = () => {
        var C, te
        return (
          ((te = (C = O.value) == null ? void 0 : C.$el) == null ? void 0 : te.getBoundingClientRect()) ?? {
            width: 0,
            left: 0,
            right: 0
          }
        )
      },
      fe = () => {
        c.value && (B.value.closeOnScroll ? de() : ie())
      },
      I = () => {
        var te
        c.value && ie()
        const C = ((te = f.value) == null ? void 0 : te.$el.getBoundingClientRect().width) ?? 0
        _.value = document.body.offsetWidth <= C
      },
      $e = (C) => {
        ;(C.key === 'Tab' &&
          !Q.value.enabled &&
          !n.teleport &&
          B.value.tabOutClosesMenu &&
          (P.value.contains(document.activeElement) || de()),
          (L.value = C.shiftKey))
      },
      be = (C) => {
        L.value = C.shiftKey
      },
      Pe = () => {
        !n.disabled &&
          !n.readonly &&
          (W(ee, gn, n), ie(false), (c.value = true), c.value && a('open'), c.value || rt(), re(n.modelValue))
      },
      Ee = () => {
        var C, te
        ;((se.value = ''),
          rt(),
          (C = f.value) == null || C.onValueCleared(),
          (te = O.value) == null || te.setParsedDate(null),
          a('update:model-value', null),
          a('update:model-timezone-value', null),
          a('cleared'),
          B.value.closeOnClearValue && de())
      },
      Be = () => {
        const C = T.value
        return !C || (!Array.isArray(C) && z(C))
          ? true
          : Array.isArray(C)
            ? ve.value.enabled || (C.length === 2 && z(C[0]) && z(C[1]))
              ? true
              : q.value.partialRange && !n.timePicker
                ? z(C[0])
                : false
            : false
      },
      k = () => {
        oe() && Be() ? (l(), de()) : a('invalid-select', T.value)
      },
      x = (C) => {
        ;(Ie(), l(), B.value.closeOnAutoApply && !C && de())
      },
      Ie = () => {
        O.value && D.value.enabled && O.value.setParsedDate(T.value)
      },
      Ue = (C = false) => {
        n.autoApply &&
          ae(T.value) &&
          Be() &&
          (q.value.enabled && Array.isArray(T.value) ? (q.value.partialRange || T.value.length === 2) && x(C) : x(C))
      },
      rt = () => {
        D.value.enabled || (T.value = null)
      },
      de = (C = false) => {
        var te, ce
        ;(C && T.value && B.value.setDateOnMenuClose && k(),
          Q.value.enabled ||
            (c.value &&
              ((c.value = false), (A.value = false), R(false), b(false), j(), a('closed'), se.value && re(p.value)),
            rt(),
            a('blur'),
            (ce = (te = f.value) == null ? void 0 : te.$el) == null || ce.remove()))
      },
      Rt = (C, te, ce = false) => {
        if (!C) {
          T.value = null
          return
        }
        const yt = Array.isArray(C) ? !C.some((Ct) => !z(Ct)) : z(C),
          vt = ae(C)
        yt && vt
          ? ((h2.value = true),
            (T.value = C),
            te ? ((F.value = ce), k(), a('text-submit')) : n.autoApply && Ue(),
            nextTick().then(() => {
              h2.value = false
            }))
          : a('invalid-date', C)
      },
      ft = () => {
        ;(n.autoApply && ae(T.value) && l(), Ie())
      },
      ra = () => (c.value ? de() : Pe()),
      ba = (C) => {
        T.value = C
      },
      ka = () => {
        ;(D.value.enabled && ((m.value = true), w()), a('focus'))
      },
      wa = () => {
        if (D.value.enabled && ((m.value = false), re(n.modelValue), F.value)) {
          const C = Cl(P.value, L.value)
          C == null || C.focus()
        }
        a('blur')
      },
      Da = (C) => {
        f.value &&
          f.value.updateMonthYear(0, {
            month: un(C.month),
            year: un(C.year)
          })
      },
      Ma = (C) => {
        re(C ?? n.modelValue)
      },
      tn = (C, te) => {
        var ce
        ;(ce = f.value) == null || ce.switchView(C, te)
      },
      g = (C, te) => (B.value.onClickOutside ? B.value.onClickOutside(C, te) : de(true)),
      ne = (C = 0) => {
        var te
        ;(te = f.value) == null || te.handleFlow(C)
      },
      me = () => Y
    return (
      Mo(Y, O, (C) => g(Be, C)),
      t({
        closeMenu: de,
        selectDate: k,
        clearValue: Ee,
        openMenu: Pe,
        onScroll: fe,
        formatInputValue: w,
        // exposed for testing purposes
        updateInternalModelValue: ba,
        // modify internal modelValue
        setMonthYear: Da,
        parseModel: Ma,
        switchView: tn,
        toggleMenu: ra,
        handleFlow: ne,
        getDpWrapMenuRef: me
      }),
      (C, te) => (
        openBlock(),
        createElementBlock(
          'div',
          {
            ref_key: 'pickerWrapperRef',
            ref: P,
            class: normalizeClass(M.value),
            'data-datepicker-instance': '',
            'data-dp-mobile': unref(N)
          },
          [
            createVNode(
              bo,
              mergeProps(
                {
                  ref_key: 'inputRef',
                  ref: O,
                  'input-value': unref(se),
                  'onUpdate:inputValue': te[0] || (te[0] = (ce) => (isRef(se) ? (se.value = ce) : null)),
                  'is-menu-open': c.value
                },
                C.$props,
                {
                  onClear: Ee,
                  onOpen: Pe,
                  onSetInputDate: Rt,
                  onSetEmptyDate: unref(l),
                  onSelectDate: k,
                  onToggle: ra,
                  onClose: de,
                  onFocus: ka,
                  onBlur: wa,
                  onRealBlur: te[1] || (te[1] = (ce) => (m.value = false)),
                  onTextInput: te[2] || (te[2] = (ce) => C.$emit('text-input', ce))
                }
              ),
              createSlots({ _: 2 }, [
                renderList(unref(U), (ce, yt) => ({
                  name: ce,
                  fn: withCtx((vt) => [renderSlot(C.$slots, ce, normalizeProps(guardReactiveProps(vt)))])
                }))
              ]),
              1040,
              ['input-value', 'is-menu-open', 'onSetEmptyDate']
            ),
            (openBlock(),
            createBlock(
              resolveDynamicComponent(C.teleport ? Teleport : 'div'),
              normalizeProps(guardReactiveProps(ke.value)),
              {
                default: withCtx(() => [
                  createVNode(
                    Transition,
                    {
                      name: unref(pe)(unref(S)),
                      css: unref(v) && !unref(Q).enabled
                    },
                    {
                      default: withCtx(() => [
                        c.value
                          ? (openBlock(),
                            createElementBlock(
                              'div',
                              mergeProps(
                                {
                                  key: 0,
                                  ref_key: 'dpWrapMenuRef',
                                  ref: Y
                                },
                                le.value,
                                {
                                  class: { 'dp--menu-wrapper': !unref(Q).enabled },
                                  style: unref(Q).enabled ? void 0 : unref(Z)
                                }
                              ),
                              [
                                createVNode(
                                  gn,
                                  mergeProps(
                                    {
                                      ref_key: 'dpMenuRef',
                                      ref: f
                                    },
                                    C.$props,
                                    {
                                      'internal-model-value': unref(T),
                                      'onUpdate:internalModelValue':
                                        te[3] || (te[3] = (ce) => (isRef(T) ? (T.value = ce) : null)),
                                      class: { [he.value]: true, 'dp--menu-wrapper': C.teleport },
                                      'open-on-top': unref(S),
                                      'no-overlay-focus': o.value,
                                      collapse: _.value,
                                      'get-input-rect': E,
                                      'is-text-input-date': h2.value,
                                      onClosePicker: de,
                                      onSelectDate: k,
                                      onAutoApply: Ue,
                                      onTimeUpdate: ft,
                                      onFlowStep: te[4] || (te[4] = (ce) => C.$emit('flow-step', ce)),
                                      onUpdateMonthYear: te[5] || (te[5] = (ce) => C.$emit('update-month-year', ce)),
                                      onInvalidSelect: te[6] || (te[6] = (ce) => C.$emit('invalid-select', unref(T))),
                                      onAutoApplyInvalid: te[7] || (te[7] = (ce) => C.$emit('invalid-select', ce)),
                                      onInvalidFixedRange:
                                        te[8] || (te[8] = (ce) => C.$emit('invalid-fixed-range', ce)),
                                      onRecalculatePosition: unref(ie),
                                      onTooltipOpen: te[9] || (te[9] = (ce) => C.$emit('tooltip-open', ce)),
                                      onTooltipClose: te[10] || (te[10] = (ce) => C.$emit('tooltip-close', ce)),
                                      onTimePickerOpen: te[11] || (te[11] = (ce) => C.$emit('time-picker-open', ce)),
                                      onTimePickerClose: te[12] || (te[12] = (ce) => C.$emit('time-picker-close', ce)),
                                      onAmPmChange: te[13] || (te[13] = (ce) => C.$emit('am-pm-change', ce)),
                                      onRangeStart: te[14] || (te[14] = (ce) => C.$emit('range-start', ce)),
                                      onRangeEnd: te[15] || (te[15] = (ce) => C.$emit('range-end', ce)),
                                      onDateUpdate: te[16] || (te[16] = (ce) => C.$emit('date-update', ce)),
                                      onInvalidDate: te[17] || (te[17] = (ce) => C.$emit('invalid-date', ce)),
                                      onOverlayToggle: te[18] || (te[18] = (ce) => C.$emit('overlay-toggle', ce)),
                                      onMenuBlur: te[19] || (te[19] = (ce) => C.$emit('blur'))
                                    }
                                  ),
                                  createSlots({ _: 2 }, [
                                    renderList(unref(y), (ce, yt) => ({
                                      name: ce,
                                      fn: withCtx((vt) => [
                                        renderSlot(C.$slots, ce, normalizeProps(guardReactiveProps({ ...vt })))
                                      ])
                                    }))
                                  ]),
                                  1040,
                                  [
                                    'internal-model-value',
                                    'class',
                                    'open-on-top',
                                    'no-overlay-focus',
                                    'collapse',
                                    'is-text-input-date',
                                    'onRecalculatePosition'
                                  ]
                                )
                              ],
                              16
                            ))
                          : createCommentVNode('', true)
                      ]),
                      _: 3
                    },
                    8,
                    ['name', 'css']
                  )
                ]),
                _: 3
              },
              16
            ))
          ],
          10,
          $o
        )
      )
    )
  }
})
var Qn = (() => {
  const e = Ao
  return (
    (e.install = (t) => {
      t.component('Vue3DatePicker', e)
    }),
    e
  )
})()
var To = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      default: Qn
    },
    Symbol.toStringTag,
    { value: 'Module' }
  )
)
Object.entries(To).forEach(([e, t]) => {
  e !== 'default' && (Qn[e] = t)
})
export { Qn as default }
//# sourceMappingURL=@vuepic_vue-datepicker.js.map
