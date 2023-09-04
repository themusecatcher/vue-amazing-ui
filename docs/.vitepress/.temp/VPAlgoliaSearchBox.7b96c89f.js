import { defineComponent, onMounted, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useRouter, a as useRoute, b as useData } from "./app.js";
import "./plugin-vue_export-helper.cc2b3d55.js";
import "@vueuse/core";
import "vue-amazing-ui";
/*! @docsearch/js 3.5.2 | MIT License | © Algolia, Inc. and contributors | https://docsearch.algolia.com */
function e(e2, t2) {
  var n2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e2);
    t2 && (r2 = r2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), n2.push.apply(n2, r2);
  }
  return n2;
}
function t(t2) {
  for (var n2 = 1; n2 < arguments.length; n2++) {
    var o2 = null != arguments[n2] ? arguments[n2] : {};
    n2 % 2 ? e(Object(o2), true).forEach(function(e2) {
      r(t2, e2, o2[e2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(o2)) : e(Object(o2)).forEach(function(e2) {
      Object.defineProperty(t2, e2, Object.getOwnPropertyDescriptor(o2, e2));
    });
  }
  return t2;
}
function n(e2) {
  return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
    return typeof e3;
  } : function(e3) {
    return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
  }, n(e2);
}
function r(e2, t2, n2) {
  return t2 in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
}
function o() {
  return o = Object.assign || function(e2) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var n2 = arguments[t2];
      for (var r2 in n2)
        Object.prototype.hasOwnProperty.call(n2, r2) && (e2[r2] = n2[r2]);
    }
    return e2;
  }, o.apply(this, arguments);
}
function i(e2, t2) {
  if (null == e2)
    return {};
  var n2, r2, o2 = function(e3, t3) {
    if (null == e3)
      return {};
    var n3, r3, o3 = {}, i3 = Object.keys(e3);
    for (r3 = 0; r3 < i3.length; r3++)
      n3 = i3[r3], t3.indexOf(n3) >= 0 || (o3[n3] = e3[n3]);
    return o3;
  }(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var i2 = Object.getOwnPropertySymbols(e2);
    for (r2 = 0; r2 < i2.length; r2++)
      n2 = i2[r2], t2.indexOf(n2) >= 0 || Object.prototype.propertyIsEnumerable.call(e2, n2) && (o2[n2] = e2[n2]);
  }
  return o2;
}
function c(e2, t2) {
  return function(e3) {
    if (Array.isArray(e3))
      return e3;
  }(e2) || function(e3, t3) {
    var n2 = null == e3 ? null : "undefined" != typeof Symbol && e3[Symbol.iterator] || e3["@@iterator"];
    if (null == n2)
      return;
    var r2, o2, i2 = [], c2 = true, a2 = false;
    try {
      for (n2 = n2.call(e3); !(c2 = (r2 = n2.next()).done) && (i2.push(r2.value), !t3 || i2.length !== t3); c2 = true)
        ;
    } catch (e4) {
      a2 = true, o2 = e4;
    } finally {
      try {
        c2 || null == n2.return || n2.return();
      } finally {
        if (a2)
          throw o2;
      }
    }
    return i2;
  }(e2, t2) || u(e2, t2) || function() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function a(e2) {
  return function(e3) {
    if (Array.isArray(e3))
      return l(e3);
  }(e2) || function(e3) {
    if ("undefined" != typeof Symbol && null != e3[Symbol.iterator] || null != e3["@@iterator"])
      return Array.from(e3);
  }(e2) || u(e2) || function() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function u(e2, t2) {
  if (e2) {
    if ("string" == typeof e2)
      return l(e2, t2);
    var n2 = Object.prototype.toString.call(e2).slice(8, -1);
    return "Object" === n2 && e2.constructor && (n2 = e2.constructor.name), "Map" === n2 || "Set" === n2 ? Array.from(e2) : "Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2) ? l(e2, t2) : void 0;
  }
}
function l(e2, t2) {
  (null == t2 || t2 > e2.length) && (t2 = e2.length);
  for (var n2 = 0, r2 = new Array(t2); n2 < t2; n2++)
    r2[n2] = e2[n2];
  return r2;
}
var s, f, p, m, v, d = {}, h = [], y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function b(e2, t2) {
  for (var n2 in t2)
    e2[n2] = t2[n2];
  return e2;
}
function g(e2) {
  var t2 = e2.parentNode;
  t2 && t2.removeChild(e2);
}
function _(e2, t2, n2) {
  var r2, o2, i2, c2 = arguments, a2 = {};
  for (i2 in t2)
    "key" == i2 ? r2 = t2[i2] : "ref" == i2 ? o2 = t2[i2] : a2[i2] = t2[i2];
  if (arguments.length > 3)
    for (n2 = [n2], i2 = 3; i2 < arguments.length; i2++)
      n2.push(c2[i2]);
  if (null != n2 && (a2.children = n2), "function" == typeof e2 && null != e2.defaultProps)
    for (i2 in e2.defaultProps)
      void 0 === a2[i2] && (a2[i2] = e2.defaultProps[i2]);
  return O(e2, a2, r2, o2, null);
}
function O(e2, t2, n2, r2, o2) {
  var i2 = { type: e2, props: t2, key: n2, ref: r2, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == o2 ? ++s.__v : o2 };
  return null != s.vnode && s.vnode(i2), i2;
}
function S(e2) {
  return e2.children;
}
function w(e2, t2) {
  this.props = e2, this.context = t2;
}
function j(e2, t2) {
  if (null == t2)
    return e2.__ ? j(e2.__, e2.__.__k.indexOf(e2) + 1) : null;
  for (var n2; t2 < e2.__k.length; t2++)
    if (null != (n2 = e2.__k[t2]) && null != n2.__e)
      return n2.__e;
  return "function" == typeof e2.type ? j(e2) : null;
}
function E(e2) {
  var t2, n2;
  if (null != (e2 = e2.__) && null != e2.__c) {
    for (e2.__e = e2.__c.base = null, t2 = 0; t2 < e2.__k.length; t2++)
      if (null != (n2 = e2.__k[t2]) && null != n2.__e) {
        e2.__e = e2.__c.base = n2.__e;
        break;
      }
    return E(e2);
  }
}
function P(e2) {
  (!e2.__d && (e2.__d = true) && f.push(e2) && !I.__r++ || m !== s.debounceRendering) && ((m = s.debounceRendering) || p)(I);
}
function I() {
  for (var e2; I.__r = f.length; )
    e2 = f.sort(function(e3, t2) {
      return e3.__v.__b - t2.__v.__b;
    }), f = [], e2.some(function(e3) {
      var t2, n2, r2, o2, i2, c2;
      e3.__d && (i2 = (o2 = (t2 = e3).__v).__e, (c2 = t2.__P) && (n2 = [], (r2 = b({}, o2)).__v = o2.__v + 1, q(c2, o2, r2, t2.__n, void 0 !== c2.ownerSVGElement, null != o2.__h ? [i2] : null, n2, null == i2 ? j(o2) : i2, o2.__h), L(n2, o2), o2.__e != i2 && E(o2)));
    });
}
function D(e2, t2, n2, r2, o2, i2, c2, a2, u2, l2) {
  var s2, f2, p2, m2, v2, y2, b2, g2 = r2 && r2.__k || h, _2 = g2.length;
  for (n2.__k = [], s2 = 0; s2 < t2.length; s2++)
    if (null != (m2 = n2.__k[s2] = null == (m2 = t2[s2]) || "boolean" == typeof m2 ? null : "string" == typeof m2 || "number" == typeof m2 ? O(null, m2, null, null, m2) : Array.isArray(m2) ? O(S, { children: m2 }, null, null, null) : m2.__b > 0 ? O(m2.type, m2.props, m2.key, null, m2.__v) : m2)) {
      if (m2.__ = n2, m2.__b = n2.__b + 1, null === (p2 = g2[s2]) || p2 && m2.key == p2.key && m2.type === p2.type)
        g2[s2] = void 0;
      else
        for (f2 = 0; f2 < _2; f2++) {
          if ((p2 = g2[f2]) && m2.key == p2.key && m2.type === p2.type) {
            g2[f2] = void 0;
            break;
          }
          p2 = null;
        }
      q(e2, m2, p2 = p2 || d, o2, i2, c2, a2, u2, l2), v2 = m2.__e, (f2 = m2.ref) && p2.ref != f2 && (b2 || (b2 = []), p2.ref && b2.push(p2.ref, null, m2), b2.push(f2, m2.__c || v2, m2)), null != v2 ? (null == y2 && (y2 = v2), "function" == typeof m2.type && null != m2.__k && m2.__k === p2.__k ? m2.__d = u2 = k(m2, u2, e2) : u2 = C(e2, m2, p2, g2, v2, u2), l2 || "option" !== n2.type ? "function" == typeof n2.type && (n2.__d = u2) : e2.value = "") : u2 && p2.__e == u2 && u2.parentNode != e2 && (u2 = j(p2));
    }
  for (n2.__e = y2, s2 = _2; s2--; )
    null != g2[s2] && ("function" == typeof n2.type && null != g2[s2].__e && g2[s2].__e == n2.__d && (n2.__d = j(r2, s2 + 1)), U(g2[s2], g2[s2]));
  if (b2)
    for (s2 = 0; s2 < b2.length; s2++)
      H(b2[s2], b2[++s2], b2[++s2]);
}
function k(e2, t2, n2) {
  var r2, o2;
  for (r2 = 0; r2 < e2.__k.length; r2++)
    (o2 = e2.__k[r2]) && (o2.__ = e2, t2 = "function" == typeof o2.type ? k(o2, t2, n2) : C(n2, o2, o2, e2.__k, o2.__e, t2));
  return t2;
}
function A(e2, t2) {
  return t2 = t2 || [], null == e2 || "boolean" == typeof e2 || (Array.isArray(e2) ? e2.some(function(e3) {
    A(e3, t2);
  }) : t2.push(e2)), t2;
}
function C(e2, t2, n2, r2, o2, i2) {
  var c2, a2, u2;
  if (void 0 !== t2.__d)
    c2 = t2.__d, t2.__d = void 0;
  else if (null == n2 || o2 != i2 || null == o2.parentNode)
    e:
      if (null == i2 || i2.parentNode !== e2)
        e2.appendChild(o2), c2 = null;
      else {
        for (a2 = i2, u2 = 0; (a2 = a2.nextSibling) && u2 < r2.length; u2 += 2)
          if (a2 == o2)
            break e;
        e2.insertBefore(o2, i2), c2 = i2;
      }
  return void 0 !== c2 ? c2 : o2.nextSibling;
}
function N(e2, t2, n2) {
  "-" === t2[0] ? e2.setProperty(t2, n2) : e2[t2] = null == n2 ? "" : "number" != typeof n2 || y.test(t2) ? n2 : n2 + "px";
}
function x(e2, t2, n2, r2, o2) {
  var i2;
  e:
    if ("style" === t2)
      if ("string" == typeof n2)
        e2.style.cssText = n2;
      else {
        if ("string" == typeof r2 && (e2.style.cssText = r2 = ""), r2)
          for (t2 in r2)
            n2 && t2 in n2 || N(e2.style, t2, "");
        if (n2)
          for (t2 in n2)
            r2 && n2[t2] === r2[t2] || N(e2.style, t2, n2[t2]);
      }
    else if ("o" === t2[0] && "n" === t2[1])
      i2 = t2 !== (t2 = t2.replace(/Capture$/, "")), t2 = t2.toLowerCase() in e2 ? t2.toLowerCase().slice(2) : t2.slice(2), e2.l || (e2.l = {}), e2.l[t2 + i2] = n2, n2 ? r2 || e2.addEventListener(t2, i2 ? R : T, i2) : e2.removeEventListener(t2, i2 ? R : T, i2);
    else if ("dangerouslySetInnerHTML" !== t2) {
      if (o2)
        t2 = t2.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
      else if ("href" !== t2 && "list" !== t2 && "form" !== t2 && "download" !== t2 && t2 in e2)
        try {
          e2[t2] = null == n2 ? "" : n2;
          break e;
        } catch (e3) {
        }
      "function" == typeof n2 || (null != n2 && (false !== n2 || "a" === t2[0] && "r" === t2[1]) ? e2.setAttribute(t2, n2) : e2.removeAttribute(t2));
    }
}
function T(e2) {
  this.l[e2.type + false](s.event ? s.event(e2) : e2);
}
function R(e2) {
  this.l[e2.type + true](s.event ? s.event(e2) : e2);
}
function q(e2, t2, n2, r2, o2, i2, c2, a2, u2) {
  var l2, f2, p2, m2, v2, d2, h2, y2, g2, _2, O2, j2 = t2.type;
  if (void 0 !== t2.constructor)
    return null;
  null != n2.__h && (u2 = n2.__h, a2 = t2.__e = n2.__e, t2.__h = null, i2 = [a2]), (l2 = s.__b) && l2(t2);
  try {
    e:
      if ("function" == typeof j2) {
        if (y2 = t2.props, g2 = (l2 = j2.contextType) && r2[l2.__c], _2 = l2 ? g2 ? g2.props.value : l2.__ : r2, n2.__c ? h2 = (f2 = t2.__c = n2.__c).__ = f2.__E : ("prototype" in j2 && j2.prototype.render ? t2.__c = f2 = new j2(y2, _2) : (t2.__c = f2 = new w(y2, _2), f2.constructor = j2, f2.render = F), g2 && g2.sub(f2), f2.props = y2, f2.state || (f2.state = {}), f2.context = _2, f2.__n = r2, p2 = f2.__d = true, f2.__h = []), null == f2.__s && (f2.__s = f2.state), null != j2.getDerivedStateFromProps && (f2.__s == f2.state && (f2.__s = b({}, f2.__s)), b(f2.__s, j2.getDerivedStateFromProps(y2, f2.__s))), m2 = f2.props, v2 = f2.state, p2)
          null == j2.getDerivedStateFromProps && null != f2.componentWillMount && f2.componentWillMount(), null != f2.componentDidMount && f2.__h.push(f2.componentDidMount);
        else {
          if (null == j2.getDerivedStateFromProps && y2 !== m2 && null != f2.componentWillReceiveProps && f2.componentWillReceiveProps(y2, _2), !f2.__e && null != f2.shouldComponentUpdate && false === f2.shouldComponentUpdate(y2, f2.__s, _2) || t2.__v === n2.__v) {
            f2.props = y2, f2.state = f2.__s, t2.__v !== n2.__v && (f2.__d = false), f2.__v = t2, t2.__e = n2.__e, t2.__k = n2.__k, f2.__h.length && c2.push(f2);
            break e;
          }
          null != f2.componentWillUpdate && f2.componentWillUpdate(y2, f2.__s, _2), null != f2.componentDidUpdate && f2.__h.push(function() {
            f2.componentDidUpdate(m2, v2, d2);
          });
        }
        f2.context = _2, f2.props = y2, f2.state = f2.__s, (l2 = s.__r) && l2(t2), f2.__d = false, f2.__v = t2, f2.__P = e2, l2 = f2.render(f2.props, f2.state, f2.context), f2.state = f2.__s, null != f2.getChildContext && (r2 = b(b({}, r2), f2.getChildContext())), p2 || null == f2.getSnapshotBeforeUpdate || (d2 = f2.getSnapshotBeforeUpdate(m2, v2)), O2 = null != l2 && l2.type === S && null == l2.key ? l2.props.children : l2, D(e2, Array.isArray(O2) ? O2 : [O2], t2, n2, r2, o2, i2, c2, a2, u2), f2.base = t2.__e, t2.__h = null, f2.__h.length && c2.push(f2), h2 && (f2.__E = f2.__ = null), f2.__e = false;
      } else
        null == i2 && t2.__v === n2.__v ? (t2.__k = n2.__k, t2.__e = n2.__e) : t2.__e = M(n2.__e, t2, n2, r2, o2, i2, c2, u2);
    (l2 = s.diffed) && l2(t2);
  } catch (e3) {
    t2.__v = null, (u2 || null != i2) && (t2.__e = a2, t2.__h = !!u2, i2[i2.indexOf(a2)] = null), s.__e(e3, t2, n2);
  }
}
function L(e2, t2) {
  s.__c && s.__c(t2, e2), e2.some(function(t3) {
    try {
      e2 = t3.__h, t3.__h = [], e2.some(function(e3) {
        e3.call(t3);
      });
    } catch (e3) {
      s.__e(e3, t3.__v);
    }
  });
}
function M(e2, t2, n2, r2, o2, i2, c2, a2) {
  var u2, l2, s2, f2, p2 = n2.props, m2 = t2.props, v2 = t2.type, y2 = 0;
  if ("svg" === v2 && (o2 = true), null != i2) {
    for (; y2 < i2.length; y2++)
      if ((u2 = i2[y2]) && (u2 === e2 || (v2 ? u2.localName == v2 : 3 == u2.nodeType))) {
        e2 = u2, i2[y2] = null;
        break;
      }
  }
  if (null == e2) {
    if (null === v2)
      return document.createTextNode(m2);
    e2 = o2 ? document.createElementNS("http://www.w3.org/2000/svg", v2) : document.createElement(v2, m2.is && m2), i2 = null, a2 = false;
  }
  if (null === v2)
    p2 === m2 || a2 && e2.data === m2 || (e2.data = m2);
  else {
    if (i2 = i2 && h.slice.call(e2.childNodes), l2 = (p2 = n2.props || d).dangerouslySetInnerHTML, s2 = m2.dangerouslySetInnerHTML, !a2) {
      if (null != i2)
        for (p2 = {}, f2 = 0; f2 < e2.attributes.length; f2++)
          p2[e2.attributes[f2].name] = e2.attributes[f2].value;
      (s2 || l2) && (s2 && (l2 && s2.__html == l2.__html || s2.__html === e2.innerHTML) || (e2.innerHTML = s2 && s2.__html || ""));
    }
    if (function(e3, t3, n3, r3, o3) {
      var i3;
      for (i3 in n3)
        "children" === i3 || "key" === i3 || i3 in t3 || x(e3, i3, null, n3[i3], r3);
      for (i3 in t3)
        o3 && "function" != typeof t3[i3] || "children" === i3 || "key" === i3 || "value" === i3 || "checked" === i3 || n3[i3] === t3[i3] || x(e3, i3, t3[i3], n3[i3], r3);
    }(e2, m2, p2, o2, a2), s2)
      t2.__k = [];
    else if (y2 = t2.props.children, D(e2, Array.isArray(y2) ? y2 : [y2], t2, n2, r2, o2 && "foreignObject" !== v2, i2, c2, e2.firstChild, a2), null != i2)
      for (y2 = i2.length; y2--; )
        null != i2[y2] && g(i2[y2]);
    a2 || ("value" in m2 && void 0 !== (y2 = m2.value) && (y2 !== e2.value || "progress" === v2 && !y2) && x(e2, "value", y2, p2.value, false), "checked" in m2 && void 0 !== (y2 = m2.checked) && y2 !== e2.checked && x(e2, "checked", y2, p2.checked, false));
  }
  return e2;
}
function H(e2, t2, n2) {
  try {
    "function" == typeof e2 ? e2(t2) : e2.current = t2;
  } catch (e3) {
    s.__e(e3, n2);
  }
}
function U(e2, t2, n2) {
  var r2, o2, i2;
  if (s.unmount && s.unmount(e2), (r2 = e2.ref) && (r2.current && r2.current !== e2.__e || H(r2, null, t2)), n2 || "function" == typeof e2.type || (n2 = null != (o2 = e2.__e)), e2.__e = e2.__d = void 0, null != (r2 = e2.__c)) {
    if (r2.componentWillUnmount)
      try {
        r2.componentWillUnmount();
      } catch (e3) {
        s.__e(e3, t2);
      }
    r2.base = r2.__P = null;
  }
  if (r2 = e2.__k)
    for (i2 = 0; i2 < r2.length; i2++)
      r2[i2] && U(r2[i2], t2, n2);
  null != o2 && g(o2);
}
function F(e2, t2, n2) {
  return this.constructor(e2, n2);
}
function B(e2, t2, n2) {
  var r2, o2, i2;
  s.__ && s.__(e2, t2), o2 = (r2 = "function" == typeof n2) ? null : n2 && n2.__k || t2.__k, i2 = [], q(t2, e2 = (!r2 && n2 || t2).__k = _(S, null, [e2]), o2 || d, d, void 0 !== t2.ownerSVGElement, !r2 && n2 ? [n2] : o2 ? null : t2.firstChild ? h.slice.call(t2.childNodes) : null, i2, !r2 && n2 ? n2 : o2 ? o2.__e : t2.firstChild, r2), L(i2, e2);
}
function V(e2, t2) {
  B(e2, t2, V);
}
function W(e2, t2, n2) {
  var r2, o2, i2, c2 = arguments, a2 = b({}, e2.props);
  for (i2 in t2)
    "key" == i2 ? r2 = t2[i2] : "ref" == i2 ? o2 = t2[i2] : a2[i2] = t2[i2];
  if (arguments.length > 3)
    for (n2 = [n2], i2 = 3; i2 < arguments.length; i2++)
      n2.push(c2[i2]);
  return null != n2 && (a2.children = n2), O(e2.type, a2, r2 || e2.key, o2 || e2.ref, null);
}
s = { __e: function(e2, t2) {
  for (var n2, r2, o2; t2 = t2.__; )
    if ((n2 = t2.__c) && !n2.__)
      try {
        if ((r2 = n2.constructor) && null != r2.getDerivedStateFromError && (n2.setState(r2.getDerivedStateFromError(e2)), o2 = n2.__d), null != n2.componentDidCatch && (n2.componentDidCatch(e2), o2 = n2.__d), o2)
          return n2.__E = n2;
      } catch (t3) {
        e2 = t3;
      }
  throw e2;
}, __v: 0 }, w.prototype.setState = function(e2, t2) {
  var n2;
  n2 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = b({}, this.state), "function" == typeof e2 && (e2 = e2(b({}, n2), this.props)), e2 && b(n2, e2), null != e2 && this.__v && (t2 && this.__h.push(t2), P(this));
}, w.prototype.forceUpdate = function(e2) {
  this.__v && (this.__e = true, e2 && this.__h.push(e2), P(this));
}, w.prototype.render = S, f = [], p = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, I.__r = 0, v = 0;
var K, z, J, $ = 0, Q = [], Z = s.__b, Y = s.__r, G = s.diffed, X = s.__c, ee = s.unmount;
function te(e2, t2) {
  s.__h && s.__h(z, e2, $ || t2), $ = 0;
  var n2 = z.__H || (z.__H = { __: [], __h: [] });
  return e2 >= n2.__.length && n2.__.push({}), n2.__[e2];
}
function ne(e2) {
  return $ = 1, re(pe, e2);
}
function re(e2, t2, n2) {
  var r2 = te(K++, 2);
  return r2.t = e2, r2.__c || (r2.__ = [n2 ? n2(t2) : pe(void 0, t2), function(e3) {
    var t3 = r2.t(r2.__[0], e3);
    r2.__[0] !== t3 && (r2.__ = [t3, r2.__[1]], r2.__c.setState({}));
  }], r2.__c = z), r2.__;
}
function oe(e2, t2) {
  var n2 = te(K++, 3);
  !s.__s && fe(n2.__H, t2) && (n2.__ = e2, n2.__H = t2, z.__H.__h.push(n2));
}
function ie(e2, t2) {
  var n2 = te(K++, 4);
  !s.__s && fe(n2.__H, t2) && (n2.__ = e2, n2.__H = t2, z.__h.push(n2));
}
function ce(e2, t2) {
  var n2 = te(K++, 7);
  return fe(n2.__H, t2) && (n2.__ = e2(), n2.__H = t2, n2.__h = e2), n2.__;
}
function ae() {
  Q.forEach(function(e2) {
    if (e2.__P)
      try {
        e2.__H.__h.forEach(le), e2.__H.__h.forEach(se), e2.__H.__h = [];
      } catch (t2) {
        e2.__H.__h = [], s.__e(t2, e2.__v);
      }
  }), Q = [];
}
s.__b = function(e2) {
  z = null, Z && Z(e2);
}, s.__r = function(e2) {
  Y && Y(e2), K = 0;
  var t2 = (z = e2.__c).__H;
  t2 && (t2.__h.forEach(le), t2.__h.forEach(se), t2.__h = []);
}, s.diffed = function(e2) {
  G && G(e2);
  var t2 = e2.__c;
  t2 && t2.__H && t2.__H.__h.length && (1 !== Q.push(t2) && J === s.requestAnimationFrame || ((J = s.requestAnimationFrame) || function(e3) {
    var t3, n2 = function() {
      clearTimeout(r2), ue && cancelAnimationFrame(t3), setTimeout(e3);
    }, r2 = setTimeout(n2, 100);
    ue && (t3 = requestAnimationFrame(n2));
  })(ae)), z = void 0;
}, s.__c = function(e2, t2) {
  t2.some(function(e3) {
    try {
      e3.__h.forEach(le), e3.__h = e3.__h.filter(function(e4) {
        return !e4.__ || se(e4);
      });
    } catch (n2) {
      t2.some(function(e4) {
        e4.__h && (e4.__h = []);
      }), t2 = [], s.__e(n2, e3.__v);
    }
  }), X && X(e2, t2);
}, s.unmount = function(e2) {
  ee && ee(e2);
  var t2 = e2.__c;
  if (t2 && t2.__H)
    try {
      t2.__H.__.forEach(le);
    } catch (e3) {
      s.__e(e3, t2.__v);
    }
};
var ue = "function" == typeof requestAnimationFrame;
function le(e2) {
  var t2 = z;
  "function" == typeof e2.__c && e2.__c(), z = t2;
}
function se(e2) {
  var t2 = z;
  e2.__c = e2.__(), z = t2;
}
function fe(e2, t2) {
  return !e2 || e2.length !== t2.length || t2.some(function(t3, n2) {
    return t3 !== e2[n2];
  });
}
function pe(e2, t2) {
  return "function" == typeof t2 ? t2(e2) : t2;
}
function me(e2, t2) {
  for (var n2 in t2)
    e2[n2] = t2[n2];
  return e2;
}
function ve(e2, t2) {
  for (var n2 in e2)
    if ("__source" !== n2 && !(n2 in t2))
      return true;
  for (var r2 in t2)
    if ("__source" !== r2 && e2[r2] !== t2[r2])
      return true;
  return false;
}
function de(e2) {
  this.props = e2;
}
(de.prototype = new w()).isPureReactComponent = true, de.prototype.shouldComponentUpdate = function(e2, t2) {
  return ve(this.props, e2) || ve(this.state, t2);
};
var he = s.__b;
s.__b = function(e2) {
  e2.type && e2.type.__f && e2.ref && (e2.props.ref = e2.ref, e2.ref = null), he && he(e2);
};
var ye = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
var be = function(e2, t2) {
  return null == e2 ? null : A(A(e2).map(t2));
}, ge = { map: be, forEach: be, count: function(e2) {
  return e2 ? A(e2).length : 0;
}, only: function(e2) {
  var t2 = A(e2);
  if (1 !== t2.length)
    throw "Children.only";
  return t2[0];
}, toArray: A }, _e = s.__e;
function Oe() {
  this.__u = 0, this.t = null, this.__b = null;
}
function Se(e2) {
  var t2 = e2.__.__c;
  return t2 && t2.__e && t2.__e(e2);
}
function we() {
  this.u = null, this.o = null;
}
s.__e = function(e2, t2, n2) {
  if (e2.then) {
    for (var r2, o2 = t2; o2 = o2.__; )
      if ((r2 = o2.__c) && r2.__c)
        return null == t2.__e && (t2.__e = n2.__e, t2.__k = n2.__k), r2.__c(e2, t2);
  }
  _e(e2, t2, n2);
}, (Oe.prototype = new w()).__c = function(e2, t2) {
  var n2 = t2.__c, r2 = this;
  null == r2.t && (r2.t = []), r2.t.push(n2);
  var o2 = Se(r2.__v), i2 = false, c2 = function() {
    i2 || (i2 = true, n2.componentWillUnmount = n2.__c, o2 ? o2(a2) : a2());
  };
  n2.__c = n2.componentWillUnmount, n2.componentWillUnmount = function() {
    c2(), n2.__c && n2.__c();
  };
  var a2 = function() {
    if (!--r2.__u) {
      if (r2.state.__e) {
        var e3 = r2.state.__e;
        r2.__v.__k[0] = function e4(t4, n3, r3) {
          return t4 && (t4.__v = null, t4.__k = t4.__k && t4.__k.map(function(t5) {
            return e4(t5, n3, r3);
          }), t4.__c && t4.__c.__P === n3 && (t4.__e && r3.insertBefore(t4.__e, t4.__d), t4.__c.__e = true, t4.__c.__P = r3)), t4;
        }(e3, e3.__c.__P, e3.__c.__O);
      }
      var t3;
      for (r2.setState({ __e: r2.__b = null }); t3 = r2.t.pop(); )
        t3.forceUpdate();
    }
  }, u2 = true === t2.__h;
  r2.__u++ || u2 || r2.setState({ __e: r2.__b = r2.__v.__k[0] }), e2.then(c2, c2);
}, Oe.prototype.componentWillUnmount = function() {
  this.t = [];
}, Oe.prototype.render = function(e2, t2) {
  if (this.__b) {
    if (this.__v.__k) {
      var n2 = document.createElement("div"), r2 = this.__v.__k[0].__c;
      this.__v.__k[0] = function e3(t3, n3, r3) {
        return t3 && (t3.__c && t3.__c.__H && (t3.__c.__H.__.forEach(function(e4) {
          "function" == typeof e4.__c && e4.__c();
        }), t3.__c.__H = null), null != (t3 = me({}, t3)).__c && (t3.__c.__P === r3 && (t3.__c.__P = n3), t3.__c = null), t3.__k = t3.__k && t3.__k.map(function(t4) {
          return e3(t4, n3, r3);
        })), t3;
      }(this.__b, n2, r2.__O = r2.__P);
    }
    this.__b = null;
  }
  var o2 = t2.__e && _(S, null, e2.fallback);
  return o2 && (o2.__h = null), [_(S, null, t2.__e ? null : e2.children), o2];
};
var je = function(e2, t2, n2) {
  if (++n2[1] === n2[0] && e2.o.delete(t2), e2.props.revealOrder && ("t" !== e2.props.revealOrder[0] || !e2.o.size))
    for (n2 = e2.u; n2; ) {
      for (; n2.length > 3; )
        n2.pop()();
      if (n2[1] < n2[0])
        break;
      e2.u = n2 = n2[2];
    }
};
function Ee(e2) {
  return this.getChildContext = function() {
    return e2.context;
  }, e2.children;
}
function Pe(e2) {
  var t2 = this, n2 = e2.i;
  t2.componentWillUnmount = function() {
    B(null, t2.l), t2.l = null, t2.i = null;
  }, t2.i && t2.i !== n2 && t2.componentWillUnmount(), e2.__v ? (t2.l || (t2.i = n2, t2.l = { nodeType: 1, parentNode: n2, childNodes: [], appendChild: function(e3) {
    this.childNodes.push(e3), t2.i.appendChild(e3);
  }, insertBefore: function(e3, n3) {
    this.childNodes.push(e3), t2.i.appendChild(e3);
  }, removeChild: function(e3) {
    this.childNodes.splice(this.childNodes.indexOf(e3) >>> 1, 1), t2.i.removeChild(e3);
  } }), B(_(Ee, { context: t2.context }, e2.__v), t2.l)) : t2.l && t2.componentWillUnmount();
}
function Ie(e2, t2) {
  return _(Pe, { __v: e2, i: t2 });
}
(we.prototype = new w()).__e = function(e2) {
  var t2 = this, n2 = Se(t2.__v), r2 = t2.o.get(e2);
  return r2[0]++, function(o2) {
    var i2 = function() {
      t2.props.revealOrder ? (r2.push(o2), je(t2, e2, r2)) : o2();
    };
    n2 ? n2(i2) : i2();
  };
}, we.prototype.render = function(e2) {
  this.u = null, this.o = /* @__PURE__ */ new Map();
  var t2 = A(e2.children);
  e2.revealOrder && "b" === e2.revealOrder[0] && t2.reverse();
  for (var n2 = t2.length; n2--; )
    this.o.set(t2[n2], this.u = [1, 0, this.u]);
  return e2.children;
}, we.prototype.componentDidUpdate = we.prototype.componentDidMount = function() {
  var e2 = this;
  this.o.forEach(function(t2, n2) {
    je(e2, n2, t2);
  });
};
var De = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, ke = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Ae = function(e2) {
  return ("undefined" != typeof Symbol && "symbol" == n(Symbol()) ? /fil|che|rad/i : /fil|che|ra/i).test(e2);
};
function Ce(e2, t2, n2) {
  return null == t2.__k && (t2.textContent = ""), B(e2, t2), "function" == typeof n2 && n2(), e2 ? e2.__c : null;
}
w.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e2) {
  Object.defineProperty(w.prototype, e2, { configurable: true, get: function() {
    return this["UNSAFE_" + e2];
  }, set: function(t2) {
    Object.defineProperty(this, e2, { configurable: true, writable: true, value: t2 });
  } });
});
var Ne = s.event;
function xe() {
}
function Te() {
  return this.cancelBubble;
}
function Re() {
  return this.defaultPrevented;
}
s.event = function(e2) {
  return Ne && (e2 = Ne(e2)), e2.persist = xe, e2.isPropagationStopped = Te, e2.isDefaultPrevented = Re, e2.nativeEvent = e2;
};
var qe, Le = { configurable: true, get: function() {
  return this.class;
} }, Me = s.vnode;
s.vnode = function(e2) {
  var t2 = e2.type, n2 = e2.props, r2 = n2;
  if ("string" == typeof t2) {
    for (var o2 in r2 = {}, n2) {
      var i2 = n2[o2];
      "value" === o2 && "defaultValue" in n2 && null == i2 || ("defaultValue" === o2 && "value" in n2 && null == n2.value ? o2 = "value" : "download" === o2 && true === i2 ? i2 = "" : /ondoubleclick/i.test(o2) ? o2 = "ondblclick" : /^onchange(textarea|input)/i.test(o2 + t2) && !Ae(n2.type) ? o2 = "oninput" : /^on(Ani|Tra|Tou|BeforeInp)/.test(o2) ? o2 = o2.toLowerCase() : ke.test(o2) ? o2 = o2.replace(/[A-Z0-9]/, "-$&").toLowerCase() : null === i2 && (i2 = void 0), r2[o2] = i2);
    }
    "select" == t2 && r2.multiple && Array.isArray(r2.value) && (r2.value = A(n2.children).forEach(function(e3) {
      e3.props.selected = -1 != r2.value.indexOf(e3.props.value);
    })), "select" == t2 && null != r2.defaultValue && (r2.value = A(n2.children).forEach(function(e3) {
      e3.props.selected = r2.multiple ? -1 != r2.defaultValue.indexOf(e3.props.value) : r2.defaultValue == e3.props.value;
    })), e2.props = r2;
  }
  t2 && n2.class != n2.className && (Le.enumerable = "className" in n2, null != n2.className && (r2.class = n2.className), Object.defineProperty(r2, "className", Le)), e2.$$typeof = De, Me && Me(e2);
};
var He = s.__r;
s.__r = function(e2) {
  He && He(e2), qe = e2.__c;
};
var Ue = { ReactCurrentDispatcher: { current: { readContext: function(e2) {
  return qe.__n[e2.__c].props.value;
} } } };
"object" == ("undefined" == typeof performance ? "undefined" : n(performance)) && "function" == typeof performance.now && performance.now.bind(performance);
function Fe(e2) {
  return !!e2 && e2.$$typeof === De;
}
var Be = { useState: ne, useReducer: re, useEffect: oe, useLayoutEffect: ie, useRef: function(e2) {
  return $ = 5, ce(function() {
    return { current: e2 };
  }, []);
}, useImperativeHandle: function(e2, t2, n2) {
  $ = 6, ie(function() {
    "function" == typeof e2 ? e2(t2()) : e2 && (e2.current = t2());
  }, null == n2 ? n2 : n2.concat(e2));
}, useMemo: ce, useCallback: function(e2, t2) {
  return $ = 8, ce(function() {
    return e2;
  }, t2);
}, useContext: function(e2) {
  var t2 = z.context[e2.__c], n2 = te(K++, 9);
  return n2.__c = e2, t2 ? (null == n2.__ && (n2.__ = true, t2.sub(z)), t2.props.value) : e2.__;
}, useDebugValue: function(e2, t2) {
  s.useDebugValue && s.useDebugValue(t2 ? t2(e2) : e2);
}, version: "16.8.0", Children: ge, render: Ce, hydrate: function(e2, t2, n2) {
  return V(e2, t2), "function" == typeof n2 && n2(), e2 ? e2.__c : null;
}, unmountComponentAtNode: function(e2) {
  return !!e2.__k && (B(null, e2), true);
}, createPortal: Ie, createElement: _, createContext: function(e2, t2) {
  var n2 = { __c: t2 = "__cC" + v++, __: e2, Consumer: function(e3, t3) {
    return e3.children(t3);
  }, Provider: function(e3) {
    var n3, r2;
    return this.getChildContext || (n3 = [], (r2 = {})[t2] = this, this.getChildContext = function() {
      return r2;
    }, this.shouldComponentUpdate = function(e4) {
      this.props.value !== e4.value && n3.some(P);
    }, this.sub = function(e4) {
      n3.push(e4);
      var t3 = e4.componentWillUnmount;
      e4.componentWillUnmount = function() {
        n3.splice(n3.indexOf(e4), 1), t3 && t3.call(e4);
      };
    }), e3.children;
  } };
  return n2.Provider.__ = n2.Consumer.contextType = n2;
}, createFactory: function(e2) {
  return _.bind(null, e2);
}, cloneElement: function(e2) {
  return Fe(e2) ? W.apply(null, arguments) : e2;
}, createRef: function() {
  return { current: null };
}, Fragment: S, isValidElement: Fe, findDOMNode: function(e2) {
  return e2 && (e2.base || 1 === e2.nodeType && e2) || null;
}, Component: w, PureComponent: de, memo: function(e2, t2) {
  function n2(e3) {
    var n3 = this.props.ref, r3 = n3 == e3.ref;
    return !r3 && n3 && (n3.call ? n3(null) : n3.current = null), t2 ? !t2(this.props, e3) || !r3 : ve(this.props, e3);
  }
  function r2(t3) {
    return this.shouldComponentUpdate = n2, _(e2, t3);
  }
  return r2.displayName = "Memo(" + (e2.displayName || e2.name) + ")", r2.prototype.isReactComponent = true, r2.__f = true, r2;
}, forwardRef: function(e2) {
  function t2(t3, r2) {
    var o2 = me({}, t3);
    return delete o2.ref, e2(o2, (r2 = t3.ref || r2) && ("object" != n(r2) || "current" in r2) ? r2 : null);
  }
  return t2.$$typeof = ye, t2.render = t2, t2.prototype.isReactComponent = t2.__f = true, t2.displayName = "ForwardRef(" + (e2.displayName || e2.name) + ")", t2;
}, unstable_batchedUpdates: function(e2, t2) {
  return e2(t2);
}, StrictMode: S, Suspense: Oe, SuspenseList: we, lazy: function(e2) {
  var t2, n2, r2;
  function o2(o3) {
    if (t2 || (t2 = e2()).then(function(e3) {
      n2 = e3.default || e3;
    }, function(e3) {
      r2 = e3;
    }), r2)
      throw r2;
    if (!n2)
      throw t2;
    return _(n2, o3);
  }
  return o2.displayName = "Lazy", o2.__f = true, o2;
}, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Ue };
function Ve() {
  return Be.createElement("svg", { width: "15", height: "15", className: "DocSearch-Control-Key-Icon" }, Be.createElement("path", { d: "M4.505 4.496h2M5.505 5.496v5M8.216 4.496l.055 5.993M10 7.5c.333.333.5.667.5 1v2M12.326 4.5v5.996M8.384 4.496c1.674 0 2.116 0 2.116 1.5s-.442 1.5-2.116 1.5M3.205 9.303c-.09.448-.277 1.21-1.241 1.203C1 10.5.5 9.513.5 8V7c0-1.57.5-2.5 1.464-2.494.964.006 1.134.598 1.24 1.342M12.553 10.5h1.953", strokeWidth: "1.2", stroke: "currentColor", fill: "none", strokeLinecap: "square" }));
}
function We() {
  return Be.createElement("svg", { width: "20", height: "20", className: "DocSearch-Search-Icon", viewBox: "0 0 20 20" }, Be.createElement("path", { d: "M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z", stroke: "currentColor", fill: "none", fillRule: "evenodd", strokeLinecap: "round", strokeLinejoin: "round" }));
}
var Ke = ["translations"];
function ze() {
  return ze = Object.assign || function(e2) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var n2 = arguments[t2];
      for (var r2 in n2)
        Object.prototype.hasOwnProperty.call(n2, r2) && (e2[r2] = n2[r2]);
    }
    return e2;
  }, ze.apply(this, arguments);
}
function Je(e2, t2) {
  return function(e3) {
    if (Array.isArray(e3))
      return e3;
  }(e2) || function(e3, t3) {
    var n2 = null == e3 ? null : "undefined" != typeof Symbol && e3[Symbol.iterator] || e3["@@iterator"];
    if (null == n2)
      return;
    var r2, o2, i2 = [], c2 = true, a2 = false;
    try {
      for (n2 = n2.call(e3); !(c2 = (r2 = n2.next()).done) && (i2.push(r2.value), !t3 || i2.length !== t3); c2 = true)
        ;
    } catch (e4) {
      a2 = true, o2 = e4;
    } finally {
      try {
        c2 || null == n2.return || n2.return();
      } finally {
        if (a2)
          throw o2;
      }
    }
    return i2;
  }(e2, t2) || function(e3, t3) {
    if (!e3)
      return;
    if ("string" == typeof e3)
      return $e(e3, t3);
    var n2 = Object.prototype.toString.call(e3).slice(8, -1);
    "Object" === n2 && e3.constructor && (n2 = e3.constructor.name);
    if ("Map" === n2 || "Set" === n2)
      return Array.from(e3);
    if ("Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
      return $e(e3, t3);
  }(e2, t2) || function() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function $e(e2, t2) {
  (null == t2 || t2 > e2.length) && (t2 = e2.length);
  for (var n2 = 0, r2 = new Array(t2); n2 < t2; n2++)
    r2[n2] = e2[n2];
  return r2;
}
function Qe(e2, t2) {
  if (null == e2)
    return {};
  var n2, r2, o2 = function(e3, t3) {
    if (null == e3)
      return {};
    var n3, r3, o3 = {}, i3 = Object.keys(e3);
    for (r3 = 0; r3 < i3.length; r3++)
      n3 = i3[r3], t3.indexOf(n3) >= 0 || (o3[n3] = e3[n3]);
    return o3;
  }(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var i2 = Object.getOwnPropertySymbols(e2);
    for (r2 = 0; r2 < i2.length; r2++)
      n2 = i2[r2], t2.indexOf(n2) >= 0 || Object.prototype.propertyIsEnumerable.call(e2, n2) && (o2[n2] = e2[n2]);
  }
  return o2;
}
var Ze = Be.forwardRef(function(e2, t2) {
  var n2 = e2.translations, r2 = void 0 === n2 ? {} : n2, o2 = Qe(e2, Ke), i2 = r2.buttonText, c2 = void 0 === i2 ? "Search" : i2, a2 = r2.buttonAriaLabel, u2 = void 0 === a2 ? "Search" : a2, l2 = Je(ne(null), 2), s2 = l2[0], f2 = l2[1];
  return oe(function() {
    "undefined" != typeof navigator && (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? f2("⌘") : f2("Ctrl"));
  }, []), Be.createElement("button", ze({ type: "button", className: "DocSearch DocSearch-Button", "aria-label": u2 }, o2, { ref: t2 }), Be.createElement("span", { className: "DocSearch-Button-Container" }, Be.createElement(We, null), Be.createElement("span", { className: "DocSearch-Button-Placeholder" }, c2)), Be.createElement("span", { className: "DocSearch-Button-Keys" }, null !== s2 && Be.createElement(Be.Fragment, null, Be.createElement("kbd", { className: "DocSearch-Button-Key" }, "Ctrl" === s2 ? Be.createElement(Ve, null) : s2), Be.createElement("kbd", { className: "DocSearch-Button-Key" }, "K"))));
});
function Ye(e2, t2) {
  var n2 = void 0;
  return function() {
    for (var r2 = arguments.length, o2 = new Array(r2), i2 = 0; i2 < r2; i2++)
      o2[i2] = arguments[i2];
    n2 && clearTimeout(n2), n2 = setTimeout(function() {
      return e2.apply(void 0, o2);
    }, t2);
  };
}
function Ge(e2, t2) {
  return function(e3) {
    if (Array.isArray(e3))
      return e3;
  }(e2) || function(e3, t3) {
    var n2 = null == e3 ? null : "undefined" != typeof Symbol && e3[Symbol.iterator] || e3["@@iterator"];
    if (null != n2) {
      var r2, o2, i2, c2, a2 = [], u2 = true, l2 = false;
      try {
        if (i2 = (n2 = n2.call(e3)).next, 0 === t3) {
          if (Object(n2) !== n2)
            return;
          u2 = false;
        } else
          for (; !(u2 = (r2 = i2.call(n2)).done) && (a2.push(r2.value), a2.length !== t3); u2 = true)
            ;
      } catch (e4) {
        l2 = true, o2 = e4;
      } finally {
        try {
          if (!u2 && null != n2.return && (c2 = n2.return(), Object(c2) !== c2))
            return;
        } finally {
          if (l2)
            throw o2;
        }
      }
      return a2;
    }
  }(e2, t2) || function(e3, t3) {
    if (!e3)
      return;
    if ("string" == typeof e3)
      return Xe(e3, t3);
    var n2 = Object.prototype.toString.call(e3).slice(8, -1);
    "Object" === n2 && e3.constructor && (n2 = e3.constructor.name);
    if ("Map" === n2 || "Set" === n2)
      return Array.from(e3);
    if ("Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
      return Xe(e3, t3);
  }(e2, t2) || function() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function Xe(e2, t2) {
  (null == t2 || t2 > e2.length) && (t2 = e2.length);
  for (var n2 = 0, r2 = new Array(t2); n2 < t2; n2++)
    r2[n2] = e2[n2];
  return r2;
}
function et(e2) {
  return et = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
    return typeof e3;
  } : function(e3) {
    return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
  }, et(e2);
}
function tt(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : /* @__PURE__ */ new Set();
  if ("production" === process.env.NODE_ENV || !e2 || "object" !== et(e2))
    return e2;
  if (t2.has(e2))
    return "[Circular]";
  var n2 = t2.add(e2);
  return Array.isArray(e2) ? e2.map(function(e3) {
    return tt(e3, n2);
  }) : Object.fromEntries(Object.entries(e2).map(function(e3) {
    var t3 = Ge(e3, 2);
    return [t3[0], tt(t3[1], n2)];
  }));
}
function nt(e2) {
  return e2.reduce(function(e3, t2) {
    return e3.concat(t2);
  }, []);
}
var rt = 0;
function ot(e2) {
  return 0 === e2.collections.length ? 0 : e2.collections.reduce(function(e3, t2) {
    return e3 + t2.items.length;
  }, 0);
}
function it(e2, t2) {
  if ("production" !== process.env.NODE_ENV && !e2)
    throw new Error("[Autocomplete] ".concat("function" == typeof t2 ? t2() : t2));
}
function ct(e2) {
  return e2 !== Object(e2);
}
function at(e2, t2) {
  if (e2 === t2)
    return true;
  if (ct(e2) || ct(t2) || "function" == typeof e2 || "function" == typeof t2)
    return e2 === t2;
  if (Object.keys(e2).length !== Object.keys(t2).length)
    return false;
  for (var n2 = 0, r2 = Object.keys(e2); n2 < r2.length; n2++) {
    var o2 = r2[n2];
    if (!(o2 in t2))
      return false;
    if (!at(e2[o2], t2[o2]))
      return false;
  }
  return true;
}
var ut = function() {
};
var lt = [{ segment: "autocomplete-core", version: "1.9.3" }], st = { current: {} };
function ft(e2) {
  var t2 = e2.item, n2 = e2.items;
  return { index: t2.__autocomplete_indexName, items: [t2], positions: [1 + n2.findIndex(function(e3) {
    return e3.objectID === t2.objectID;
  })], queryID: t2.__autocomplete_queryID, algoliaSource: ["autocomplete"] };
}
function pt(e2, t2) {
  return function(e3) {
    if (Array.isArray(e3))
      return e3;
  }(e2) || function(e3, t3) {
    var n2 = null == e3 ? null : "undefined" != typeof Symbol && e3[Symbol.iterator] || e3["@@iterator"];
    if (null != n2) {
      var r2, o2, i2, c2, a2 = [], u2 = true, l2 = false;
      try {
        if (i2 = (n2 = n2.call(e3)).next, 0 === t3) {
          if (Object(n2) !== n2)
            return;
          u2 = false;
        } else
          for (; !(u2 = (r2 = i2.call(n2)).done) && (a2.push(r2.value), a2.length !== t3); u2 = true)
            ;
      } catch (e4) {
        l2 = true, o2 = e4;
      } finally {
        try {
          if (!u2 && null != n2.return && (c2 = n2.return(), Object(c2) !== c2))
            return;
        } finally {
          if (l2)
            throw o2;
        }
      }
      return a2;
    }
  }(e2, t2) || function(e3, t3) {
    if (!e3)
      return;
    if ("string" == typeof e3)
      return mt(e3, t3);
    var n2 = Object.prototype.toString.call(e3).slice(8, -1);
    "Object" === n2 && e3.constructor && (n2 = e3.constructor.name);
    if ("Map" === n2 || "Set" === n2)
      return Array.from(e3);
    if ("Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
      return mt(e3, t3);
  }(e2, t2) || function() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function mt(e2, t2) {
  (null == t2 || t2 > e2.length) && (t2 = e2.length);
  for (var n2 = 0, r2 = new Array(t2); n2 < t2; n2++)
    r2[n2] = e2[n2];
  return r2;
}
var vt = ["items"], dt = ["items"];
function ht(e2) {
  return ht = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
    return typeof e3;
  } : function(e3) {
    return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
  }, ht(e2);
}
function yt(e2) {
  return function(e3) {
    if (Array.isArray(e3))
      return bt(e3);
  }(e2) || function(e3) {
    if ("undefined" != typeof Symbol && null != e3[Symbol.iterator] || null != e3["@@iterator"])
      return Array.from(e3);
  }(e2) || function(e3, t2) {
    if (!e3)
      return;
    if ("string" == typeof e3)
      return bt(e3, t2);
    var n2 = Object.prototype.toString.call(e3).slice(8, -1);
    "Object" === n2 && e3.constructor && (n2 = e3.constructor.name);
    if ("Map" === n2 || "Set" === n2)
      return Array.from(e3);
    if ("Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
      return bt(e3, t2);
  }(e2) || function() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function bt(e2, t2) {
  (null == t2 || t2 > e2.length) && (t2 = e2.length);
  for (var n2 = 0, r2 = new Array(t2); n2 < t2; n2++)
    r2[n2] = e2[n2];
  return r2;
}
function gt(e2, t2) {
  if (null == e2)
    return {};
  var n2, r2, o2 = function(e3, t3) {
    if (null == e3)
      return {};
    var n3, r3, o3 = {}, i3 = Object.keys(e3);
    for (r3 = 0; r3 < i3.length; r3++)
      n3 = i3[r3], t3.indexOf(n3) >= 0 || (o3[n3] = e3[n3]);
    return o3;
  }(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var i2 = Object.getOwnPropertySymbols(e2);
    for (r2 = 0; r2 < i2.length; r2++)
      n2 = i2[r2], t2.indexOf(n2) >= 0 || Object.prototype.propertyIsEnumerable.call(e2, n2) && (o2[n2] = e2[n2]);
  }
  return o2;
}
function _t(e2, t2) {
  var n2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e2);
    t2 && (r2 = r2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), n2.push.apply(n2, r2);
  }
  return n2;
}
function Ot(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var n2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? _t(Object(n2), true).forEach(function(t3) {
      St(e2, t3, n2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(n2)) : _t(Object(n2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(n2, t3));
    });
  }
  return e2;
}
function St(e2, t2, n2) {
  return (t2 = function(e3) {
    var t3 = function(e4, t4) {
      if ("object" !== ht(e4) || null === e4)
        return e4;
      var n3 = e4[Symbol.toPrimitive];
      if (void 0 !== n3) {
        var r2 = n3.call(e4, t4 || "default");
        if ("object" !== ht(r2))
          return r2;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t4 ? String : Number)(e4);
    }(e3, "string");
    return "symbol" === ht(t3) ? t3 : String(t3);
  }(t2)) in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
}
function wt(e2) {
  for (var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 20, n2 = [], r2 = 0; r2 < e2.objectIDs.length; r2 += t2)
    n2.push(Ot(Ot({}, e2), {}, { objectIDs: e2.objectIDs.slice(r2, r2 + t2) }));
  return n2;
}
function jt(e2) {
  return e2.map(function(e3) {
    var t2 = e3.items, n2 = gt(e3, vt);
    return Ot(Ot({}, n2), {}, { objectIDs: (null == t2 ? void 0 : t2.map(function(e4) {
      return e4.objectID;
    })) || n2.objectIDs });
  });
}
function Et(e2) {
  var t2, n2, r2, o2 = (t2 = pt((e2.version || "").split(".").map(Number), 2), n2 = t2[0], r2 = t2[1], n2 >= 3 || 2 === n2 && r2 >= 4 || 1 === n2 && r2 >= 10);
  function i2(t3, n3, r3) {
    if (o2 && void 0 !== r3) {
      var i3 = r3[0].__autocomplete_algoliaCredentials, c2 = { "X-Algolia-Application-Id": i3.appId, "X-Algolia-API-Key": i3.apiKey };
      e2.apply(void 0, [t3].concat(yt(n3), [{ headers: c2 }]));
    } else
      e2.apply(void 0, [t3].concat(yt(n3)));
  }
  return { init: function(t3, n3) {
    e2("init", { appId: t3, apiKey: n3 });
  }, setUserToken: function(t3) {
    e2("setUserToken", t3);
  }, clickedObjectIDsAfterSearch: function() {
    for (var e3 = arguments.length, t3 = new Array(e3), n3 = 0; n3 < e3; n3++)
      t3[n3] = arguments[n3];
    t3.length > 0 && i2("clickedObjectIDsAfterSearch", jt(t3), t3[0].items);
  }, clickedObjectIDs: function() {
    for (var e3 = arguments.length, t3 = new Array(e3), n3 = 0; n3 < e3; n3++)
      t3[n3] = arguments[n3];
    t3.length > 0 && i2("clickedObjectIDs", jt(t3), t3[0].items);
  }, clickedFilters: function() {
    for (var t3 = arguments.length, n3 = new Array(t3), r3 = 0; r3 < t3; r3++)
      n3[r3] = arguments[r3];
    n3.length > 0 && e2.apply(void 0, ["clickedFilters"].concat(n3));
  }, convertedObjectIDsAfterSearch: function() {
    for (var e3 = arguments.length, t3 = new Array(e3), n3 = 0; n3 < e3; n3++)
      t3[n3] = arguments[n3];
    t3.length > 0 && i2("convertedObjectIDsAfterSearch", jt(t3), t3[0].items);
  }, convertedObjectIDs: function() {
    for (var e3 = arguments.length, t3 = new Array(e3), n3 = 0; n3 < e3; n3++)
      t3[n3] = arguments[n3];
    t3.length > 0 && i2("convertedObjectIDs", jt(t3), t3[0].items);
  }, convertedFilters: function() {
    for (var t3 = arguments.length, n3 = new Array(t3), r3 = 0; r3 < t3; r3++)
      n3[r3] = arguments[r3];
    n3.length > 0 && e2.apply(void 0, ["convertedFilters"].concat(n3));
  }, viewedObjectIDs: function() {
    for (var e3 = arguments.length, t3 = new Array(e3), n3 = 0; n3 < e3; n3++)
      t3[n3] = arguments[n3];
    t3.length > 0 && t3.reduce(function(e4, t4) {
      var n4 = t4.items, r3 = gt(t4, dt);
      return [].concat(yt(e4), yt(wt(Ot(Ot({}, r3), {}, { objectIDs: (null == n4 ? void 0 : n4.map(function(e5) {
        return e5.objectID;
      })) || r3.objectIDs })).map(function(e5) {
        return { items: n4, payload: e5 };
      })));
    }, []).forEach(function(e4) {
      var t4 = e4.items;
      return i2("viewedObjectIDs", [e4.payload], t4);
    });
  }, viewedFilters: function() {
    for (var t3 = arguments.length, n3 = new Array(t3), r3 = 0; r3 < t3; r3++)
      n3[r3] = arguments[r3];
    n3.length > 0 && e2.apply(void 0, ["viewedFilters"].concat(n3));
  } };
}
function Pt(e2) {
  var t2 = e2.items.reduce(function(e3, t3) {
    var n2;
    return e3[t3.__autocomplete_indexName] = (null !== (n2 = e3[t3.__autocomplete_indexName]) && void 0 !== n2 ? n2 : []).concat(t3), e3;
  }, {});
  return Object.keys(t2).map(function(e3) {
    return { index: e3, items: t2[e3], algoliaSource: ["autocomplete"] };
  });
}
function It(e2) {
  return e2.objectID && e2.__autocomplete_indexName && e2.__autocomplete_queryID;
}
function Dt(e2) {
  return Dt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
    return typeof e3;
  } : function(e3) {
    return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
  }, Dt(e2);
}
function kt(e2) {
  return function(e3) {
    if (Array.isArray(e3))
      return At(e3);
  }(e2) || function(e3) {
    if ("undefined" != typeof Symbol && null != e3[Symbol.iterator] || null != e3["@@iterator"])
      return Array.from(e3);
  }(e2) || function(e3, t2) {
    if (!e3)
      return;
    if ("string" == typeof e3)
      return At(e3, t2);
    var n2 = Object.prototype.toString.call(e3).slice(8, -1);
    "Object" === n2 && e3.constructor && (n2 = e3.constructor.name);
    if ("Map" === n2 || "Set" === n2)
      return Array.from(e3);
    if ("Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
      return At(e3, t2);
  }(e2) || function() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function At(e2, t2) {
  (null == t2 || t2 > e2.length) && (t2 = e2.length);
  for (var n2 = 0, r2 = new Array(t2); n2 < t2; n2++)
    r2[n2] = e2[n2];
  return r2;
}
function Ct(e2, t2) {
  var n2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e2);
    t2 && (r2 = r2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), n2.push.apply(n2, r2);
  }
  return n2;
}
function Nt(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var n2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? Ct(Object(n2), true).forEach(function(t3) {
      xt(e2, t3, n2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(n2)) : Ct(Object(n2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(n2, t3));
    });
  }
  return e2;
}
function xt(e2, t2, n2) {
  return (t2 = function(e3) {
    var t3 = function(e4, t4) {
      if ("object" !== Dt(e4) || null === e4)
        return e4;
      var n3 = e4[Symbol.toPrimitive];
      if (void 0 !== n3) {
        var r2 = n3.call(e4, t4 || "default");
        if ("object" !== Dt(r2))
          return r2;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t4 ? String : Number)(e4);
    }(e3, "string");
    return "symbol" === Dt(t3) ? t3 : String(t3);
  }(t2)) in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
}
var Tt = "https://cdn.jsdelivr.net/npm/search-insights@".concat("2.6.0", "/dist/search-insights.min.js"), Rt = Ye(function(e2) {
  var t2 = e2.onItemsChange, n2 = e2.items, r2 = e2.insights, o2 = e2.state;
  t2({ insights: r2, insightsEvents: Pt({ items: n2 }).map(function(e3) {
    return Nt({ eventName: "Items Viewed" }, e3);
  }), state: o2 });
}, 400);
function qt(e2) {
  var t2 = function(e3) {
    return Nt({ onItemsChange: function(e4) {
      var t3 = e4.insights, n3 = e4.insightsEvents;
      t3.viewedObjectIDs.apply(t3, kt(n3.map(function(e5) {
        return Nt(Nt({}, e5), {}, { algoliaSource: [].concat(kt(e5.algoliaSource || []), ["autocomplete-internal"]) });
      })));
    }, onSelect: function(e4) {
      var t3 = e4.insights, n3 = e4.insightsEvents;
      t3.clickedObjectIDsAfterSearch.apply(t3, kt(n3.map(function(e5) {
        return Nt(Nt({}, e5), {}, { algoliaSource: [].concat(kt(e5.algoliaSource || []), ["autocomplete-internal"]) });
      })));
    }, onActive: ut }, e3);
  }(e2), n2 = t2.insightsClient, r2 = t2.onItemsChange, o2 = t2.onSelect, i2 = t2.onActive, c2 = n2;
  n2 || function(e3) {
    if ("undefined" != typeof window)
      e3({ window });
  }(function(e3) {
    var t3 = e3.window, n3 = t3.AlgoliaAnalyticsObject || "aa";
    "string" == typeof n3 && (c2 = t3[n3]), c2 || (t3.AlgoliaAnalyticsObject = n3, t3[n3] || (t3[n3] = function() {
      t3[n3].queue || (t3[n3].queue = []);
      for (var e4 = arguments.length, r3 = new Array(e4), o3 = 0; o3 < e4; o3++)
        r3[o3] = arguments[o3];
      t3[n3].queue.push(r3);
    }), t3[n3].version = "2.6.0", c2 = t3[n3], function(e4) {
      var t4 = "[Autocomplete]: Could not load search-insights.js. Please load it manually following https://alg.li/insights-autocomplete";
      try {
        var n4 = e4.document.createElement("script");
        n4.async = true, n4.src = Tt, n4.onerror = function() {
          console.error(t4);
        }, document.body.appendChild(n4);
      } catch (e5) {
        console.error(t4);
      }
    }(t3));
  });
  var a2 = Et(c2), u2 = { current: [] }, l2 = Ye(function(e3) {
    var t3 = e3.state;
    if (t3.isOpen) {
      var n3 = t3.collections.reduce(function(e4, t4) {
        return [].concat(kt(e4), kt(t4.items));
      }, []).filter(It);
      at(u2.current.map(function(e4) {
        return e4.objectID;
      }), n3.map(function(e4) {
        return e4.objectID;
      })) || (u2.current = n3, n3.length > 0 && Rt({ onItemsChange: r2, items: n3, insights: a2, state: t3 }));
    }
  }, 0);
  return { name: "aa.algoliaInsightsPlugin", subscribe: function(e3) {
    var t3 = e3.setContext, n3 = e3.onSelect, r3 = e3.onActive;
    c2("addAlgoliaAgent", "insights-plugin"), t3({ algoliaInsightsPlugin: { __algoliaSearchParameters: { clickAnalytics: true }, insights: a2 } }), n3(function(e4) {
      var t4 = e4.item, n4 = e4.state, r4 = e4.event;
      It(t4) && o2({ state: n4, event: r4, insights: a2, item: t4, insightsEvents: [Nt({ eventName: "Item Selected" }, ft({ item: t4, items: u2.current }))] });
    }), r3(function(e4) {
      var t4 = e4.item, n4 = e4.state, r4 = e4.event;
      It(t4) && i2({ state: n4, event: r4, insights: a2, item: t4, insightsEvents: [Nt({ eventName: "Item Active" }, ft({ item: t4, items: u2.current }))] });
    });
  }, onStateChange: function(e3) {
    var t3 = e3.state;
    l2({ state: t3 });
  }, __autocomplete_pluginOptions: e2 };
}
function Lt(e2) {
  "production" !== process.env.NODE_ENV && function(e3, t2) {
    if ("production" !== process.env.NODE_ENV && !e3) {
      var n2 = t2.trim();
      st.current[n2] || (st.current[n2] = true, console.warn("[Autocomplete] ".concat(n2)));
    }
  }(!e2.debug, "The `debug` option is meant for development debugging and should not be used in production.");
}
function Mt(e2, t2) {
  var n2 = t2;
  return { then: function(t3, r2) {
    return Mt(e2.then(Ut(t3, n2, e2), Ut(r2, n2, e2)), n2);
  }, catch: function(t3) {
    return Mt(e2.catch(Ut(t3, n2, e2)), n2);
  }, finally: function(t3) {
    return t3 && n2.onCancelList.push(t3), Mt(e2.finally(Ut(t3 && function() {
      return n2.onCancelList = [], t3();
    }, n2, e2)), n2);
  }, cancel: function() {
    n2.isCanceled = true;
    var e3 = n2.onCancelList;
    n2.onCancelList = [], e3.forEach(function(e4) {
      e4();
    });
  }, isCanceled: function() {
    return true === n2.isCanceled;
  } };
}
function Ht(e2) {
  return Mt(e2, { isCanceled: false, onCancelList: [] });
}
function Ut(e2, t2, n2) {
  return e2 ? function(n3) {
    return t2.isCanceled ? n3 : e2(n3);
  } : n2;
}
function Ft(e2, t2, n2, r2) {
  if (!n2)
    return null;
  if (e2 < 0 && (null === t2 || null !== r2 && 0 === t2))
    return n2 + e2;
  var o2 = (null === t2 ? -1 : t2) + e2;
  return o2 <= -1 || o2 >= n2 ? null === r2 ? null : 0 : o2;
}
function Bt(e2, t2) {
  var n2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e2);
    t2 && (r2 = r2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), n2.push.apply(n2, r2);
  }
  return n2;
}
function Vt(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var n2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? Bt(Object(n2), true).forEach(function(t3) {
      Wt(e2, t3, n2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(n2)) : Bt(Object(n2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(n2, t3));
    });
  }
  return e2;
}
function Wt(e2, t2, n2) {
  return (t2 = function(e3) {
    var t3 = function(e4, t4) {
      if ("object" !== Kt(e4) || null === e4)
        return e4;
      var n3 = e4[Symbol.toPrimitive];
      if (void 0 !== n3) {
        var r2 = n3.call(e4, t4 || "default");
        if ("object" !== Kt(r2))
          return r2;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t4 ? String : Number)(e4);
    }(e3, "string");
    return "symbol" === Kt(t3) ? t3 : String(t3);
  }(t2)) in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
}
function Kt(e2) {
  return Kt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
    return typeof e3;
  } : function(e3) {
    return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
  }, Kt(e2);
}
function zt(e2) {
  var t2 = function(e3) {
    var t3 = e3.collections.map(function(e4) {
      return e4.items.length;
    }).reduce(function(e4, t4, n3) {
      var r3 = (e4[n3 - 1] || 0) + t4;
      return e4.push(r3), e4;
    }, []).reduce(function(t4, n3) {
      return n3 <= e3.activeItemId ? t4 + 1 : t4;
    }, 0);
    return e3.collections[t3];
  }(e2);
  if (!t2)
    return null;
  var n2 = t2.items[function(e3) {
    for (var t3 = e3.state, n3 = e3.collection, r3 = false, o2 = 0, i2 = 0; false === r3; ) {
      var c2 = t3.collections[o2];
      if (c2 === n3) {
        r3 = true;
        break;
      }
      i2 += c2.items.length, o2++;
    }
    return t3.activeItemId - i2;
  }({ state: e2, collection: t2 })], r2 = t2.source;
  return { item: n2, itemInputValue: r2.getItemInputValue({ item: n2, state: e2 }), itemUrl: r2.getItemUrl({ item: n2, state: e2 }), source: r2 };
}
var Jt = /((gt|sm)-|galaxy nexus)|samsung[- ]|samsungbrowser/i;
function $t(e2) {
  return $t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
    return typeof e3;
  } : function(e3) {
    return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
  }, $t(e2);
}
function Qt(e2, t2) {
  var n2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e2);
    t2 && (r2 = r2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), n2.push.apply(n2, r2);
  }
  return n2;
}
function Zt(e2, t2, n2) {
  return (t2 = function(e3) {
    var t3 = function(e4, t4) {
      if ("object" !== $t(e4) || null === e4)
        return e4;
      var n3 = e4[Symbol.toPrimitive];
      if (void 0 !== n3) {
        var r2 = n3.call(e4, t4 || "default");
        if ("object" !== $t(r2))
          return r2;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t4 ? String : Number)(e4);
    }(e3, "string");
    return "symbol" === $t(t3) ? t3 : String(t3);
  }(t2)) in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
}
function Yt(e2, t2, n2) {
  var r2, o2 = t2.initialState;
  return { getState: function() {
    return o2;
  }, dispatch: function(r3, i2) {
    var c2 = function(e3) {
      for (var t3 = 1; t3 < arguments.length; t3++) {
        var n3 = null != arguments[t3] ? arguments[t3] : {};
        t3 % 2 ? Qt(Object(n3), true).forEach(function(t4) {
          Zt(e3, t4, n3[t4]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n3)) : Qt(Object(n3)).forEach(function(t4) {
          Object.defineProperty(e3, t4, Object.getOwnPropertyDescriptor(n3, t4));
        });
      }
      return e3;
    }({}, o2);
    o2 = e2(o2, { type: r3, props: t2, payload: i2 }), n2({ state: o2, prevState: c2 });
  }, pendingRequests: (r2 = [], { add: function(e3) {
    return r2.push(e3), e3.finally(function() {
      r2 = r2.filter(function(t3) {
        return t3 !== e3;
      });
    });
  }, cancelAll: function() {
    r2.forEach(function(e3) {
      return e3.cancel();
    });
  }, isEmpty: function() {
    return 0 === r2.length;
  } }) };
}
function Gt(e2) {
  return Gt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
    return typeof e3;
  } : function(e3) {
    return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
  }, Gt(e2);
}
function Xt(e2, t2) {
  var n2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e2);
    t2 && (r2 = r2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), n2.push.apply(n2, r2);
  }
  return n2;
}
function en(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var n2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? Xt(Object(n2), true).forEach(function(t3) {
      tn(e2, t3, n2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(n2)) : Xt(Object(n2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(n2, t3));
    });
  }
  return e2;
}
function tn(e2, t2, n2) {
  return (t2 = function(e3) {
    var t3 = function(e4, t4) {
      if ("object" !== Gt(e4) || null === e4)
        return e4;
      var n3 = e4[Symbol.toPrimitive];
      if (void 0 !== n3) {
        var r2 = n3.call(e4, t4 || "default");
        if ("object" !== Gt(r2))
          return r2;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t4 ? String : Number)(e4);
    }(e3, "string");
    return "symbol" === Gt(t3) ? t3 : String(t3);
  }(t2)) in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
}
function nn(e2) {
  return nn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
    return typeof e3;
  } : function(e3) {
    return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
  }, nn(e2);
}
function rn(e2) {
  return function(e3) {
    if (Array.isArray(e3))
      return on(e3);
  }(e2) || function(e3) {
    if ("undefined" != typeof Symbol && null != e3[Symbol.iterator] || null != e3["@@iterator"])
      return Array.from(e3);
  }(e2) || function(e3, t2) {
    if (!e3)
      return;
    if ("string" == typeof e3)
      return on(e3, t2);
    var n2 = Object.prototype.toString.call(e3).slice(8, -1);
    "Object" === n2 && e3.constructor && (n2 = e3.constructor.name);
    if ("Map" === n2 || "Set" === n2)
      return Array.from(e3);
    if ("Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
      return on(e3, t2);
  }(e2) || function() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function on(e2, t2) {
  (null == t2 || t2 > e2.length) && (t2 = e2.length);
  for (var n2 = 0, r2 = new Array(t2); n2 < t2; n2++)
    r2[n2] = e2[n2];
  return r2;
}
function cn(e2, t2) {
  var n2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e2);
    t2 && (r2 = r2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), n2.push.apply(n2, r2);
  }
  return n2;
}
function an(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var n2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? cn(Object(n2), true).forEach(function(t3) {
      un(e2, t3, n2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(n2)) : cn(Object(n2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(n2, t3));
    });
  }
  return e2;
}
function un(e2, t2, n2) {
  return (t2 = function(e3) {
    var t3 = function(e4, t4) {
      if ("object" !== nn(e4) || null === e4)
        return e4;
      var n3 = e4[Symbol.toPrimitive];
      if (void 0 !== n3) {
        var r2 = n3.call(e4, t4 || "default");
        if ("object" !== nn(r2))
          return r2;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t4 ? String : Number)(e4);
    }(e3, "string");
    return "symbol" === nn(t3) ? t3 : String(t3);
  }(t2)) in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
}
function ln(e2, t2) {
  var n2, r2 = "undefined" != typeof window ? window : {}, o2 = e2.plugins || [];
  return an(an({ debug: false, openOnFocus: false, placeholder: "", autoFocus: false, defaultActiveItemId: null, stallThreshold: 300, insights: false, environment: r2, shouldPanelOpen: function(e3) {
    return ot(e3.state) > 0;
  }, reshape: function(e3) {
    return e3.sources;
  } }, e2), {}, { id: null !== (n2 = e2.id) && void 0 !== n2 ? n2 : "autocomplete-".concat(rt++), plugins: o2, initialState: an({ activeItemId: null, query: "", completion: null, collections: [], isOpen: false, status: "idle", context: {} }, e2.initialState), onStateChange: function(t3) {
    var n3;
    null === (n3 = e2.onStateChange) || void 0 === n3 || n3.call(e2, t3), o2.forEach(function(e3) {
      var n4;
      return null === (n4 = e3.onStateChange) || void 0 === n4 ? void 0 : n4.call(e3, t3);
    });
  }, onSubmit: function(t3) {
    var n3;
    null === (n3 = e2.onSubmit) || void 0 === n3 || n3.call(e2, t3), o2.forEach(function(e3) {
      var n4;
      return null === (n4 = e3.onSubmit) || void 0 === n4 ? void 0 : n4.call(e3, t3);
    });
  }, onReset: function(t3) {
    var n3;
    null === (n3 = e2.onReset) || void 0 === n3 || n3.call(e2, t3), o2.forEach(function(e3) {
      var n4;
      return null === (n4 = e3.onReset) || void 0 === n4 ? void 0 : n4.call(e3, t3);
    });
  }, getSources: function(n3) {
    return Promise.all([].concat(rn(o2.map(function(e3) {
      return e3.getSources;
    })), [e2.getSources]).filter(Boolean).map(function(e3) {
      return function(e4, t3) {
        var n4 = [];
        return Promise.resolve(e4(t3)).then(function(e5) {
          return it(Array.isArray(e5), function() {
            return "The `getSources` function must return an array of sources but returned type ".concat(JSON.stringify(Kt(e5)), ":\n\n").concat(JSON.stringify(tt(e5), null, 2));
          }), Promise.all(e5.filter(function(e6) {
            return Boolean(e6);
          }).map(function(e6) {
            if (it("string" == typeof e6.sourceId, "A source must provide a `sourceId` string."), n4.includes(e6.sourceId))
              throw new Error("[Autocomplete] The `sourceId` ".concat(JSON.stringify(e6.sourceId), " is not unique."));
            n4.push(e6.sourceId);
            var t4 = { getItemInputValue: function(e7) {
              return e7.state.query;
            }, getItemUrl: function() {
            }, onSelect: function(e7) {
              (0, e7.setIsOpen)(false);
            }, onActive: ut, onResolve: ut };
            Object.keys(t4).forEach(function(e7) {
              t4[e7].__default = true;
            });
            var r3 = Vt(Vt({}, t4), e6);
            return Promise.resolve(r3);
          }));
        });
      }(e3, n3);
    })).then(function(e3) {
      return nt(e3);
    }).then(function(e3) {
      return e3.map(function(e4) {
        return an(an({}, e4), {}, { onSelect: function(n4) {
          e4.onSelect(n4), t2.forEach(function(e5) {
            var t3;
            return null === (t3 = e5.onSelect) || void 0 === t3 ? void 0 : t3.call(e5, n4);
          });
        }, onActive: function(n4) {
          e4.onActive(n4), t2.forEach(function(e5) {
            var t3;
            return null === (t3 = e5.onActive) || void 0 === t3 ? void 0 : t3.call(e5, n4);
          });
        }, onResolve: function(n4) {
          e4.onResolve(n4), t2.forEach(function(e5) {
            var t3;
            return null === (t3 = e5.onResolve) || void 0 === t3 ? void 0 : t3.call(e5, n4);
          });
        } });
      });
    });
  }, navigator: an({ navigate: function(e3) {
    var t3 = e3.itemUrl;
    r2.location.assign(t3);
  }, navigateNewTab: function(e3) {
    var t3 = e3.itemUrl, n3 = r2.open(t3, "_blank", "noopener");
    null == n3 || n3.focus();
  }, navigateNewWindow: function(e3) {
    var t3 = e3.itemUrl;
    r2.open(t3, "_blank", "noopener");
  } }, e2.navigator) });
}
function sn(e2) {
  return sn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
    return typeof e3;
  } : function(e3) {
    return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
  }, sn(e2);
}
function fn(e2, t2) {
  var n2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e2);
    t2 && (r2 = r2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), n2.push.apply(n2, r2);
  }
  return n2;
}
function pn(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var n2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? fn(Object(n2), true).forEach(function(t3) {
      mn(e2, t3, n2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(n2)) : fn(Object(n2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(n2, t3));
    });
  }
  return e2;
}
function mn(e2, t2, n2) {
  return (t2 = function(e3) {
    var t3 = function(e4, t4) {
      if ("object" !== sn(e4) || null === e4)
        return e4;
      var n3 = e4[Symbol.toPrimitive];
      if (void 0 !== n3) {
        var r2 = n3.call(e4, t4 || "default");
        if ("object" !== sn(r2))
          return r2;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t4 ? String : Number)(e4);
    }(e3, "string");
    return "symbol" === sn(t3) ? t3 : String(t3);
  }(t2)) in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
}
function vn(e2) {
  return vn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
    return typeof e3;
  } : function(e3) {
    return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
  }, vn(e2);
}
function dn(e2, t2) {
  var n2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e2);
    t2 && (r2 = r2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), n2.push.apply(n2, r2);
  }
  return n2;
}
function hn(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var n2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? dn(Object(n2), true).forEach(function(t3) {
      yn(e2, t3, n2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(n2)) : dn(Object(n2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(n2, t3));
    });
  }
  return e2;
}
function yn(e2, t2, n2) {
  return (t2 = function(e3) {
    var t3 = function(e4, t4) {
      if ("object" !== vn(e4) || null === e4)
        return e4;
      var n3 = e4[Symbol.toPrimitive];
      if (void 0 !== n3) {
        var r2 = n3.call(e4, t4 || "default");
        if ("object" !== vn(r2))
          return r2;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t4 ? String : Number)(e4);
    }(e3, "string");
    return "symbol" === vn(t3) ? t3 : String(t3);
  }(t2)) in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
}
function bn(e2) {
  return function(e3) {
    if (Array.isArray(e3))
      return gn(e3);
  }(e2) || function(e3) {
    if ("undefined" != typeof Symbol && null != e3[Symbol.iterator] || null != e3["@@iterator"])
      return Array.from(e3);
  }(e2) || function(e3, t2) {
    if (!e3)
      return;
    if ("string" == typeof e3)
      return gn(e3, t2);
    var n2 = Object.prototype.toString.call(e3).slice(8, -1);
    "Object" === n2 && e3.constructor && (n2 = e3.constructor.name);
    if ("Map" === n2 || "Set" === n2)
      return Array.from(e3);
    if ("Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
      return gn(e3, t2);
  }(e2) || function() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function gn(e2, t2) {
  (null == t2 || t2 > e2.length) && (t2 = e2.length);
  for (var n2 = 0, r2 = new Array(t2); n2 < t2; n2++)
    r2[n2] = e2[n2];
  return r2;
}
function _n(e2) {
  return Boolean(e2.execute);
}
function On(e2, t2, n2) {
  if (o2 = e2, Boolean(null == o2 ? void 0 : o2.execute)) {
    var r2 = "algolia" === e2.requesterId ? Object.assign.apply(Object, [{}].concat(bn(Object.keys(n2.context).map(function(e3) {
      var t3;
      return null === (t3 = n2.context[e3]) || void 0 === t3 ? void 0 : t3.__algoliaSearchParameters;
    })))) : {};
    return hn(hn({}, e2), {}, { requests: e2.queries.map(function(n3) {
      return { query: "algolia" === e2.requesterId ? hn(hn({}, n3), {}, { params: hn(hn({}, r2), n3.params) }) : n3, sourceId: t2, transformResponse: e2.transformResponse };
    }) });
  }
  var o2;
  return { items: e2, sourceId: t2 };
}
function Sn(e2) {
  var t2 = e2.reduce(function(e3, t3) {
    if (!_n(t3))
      return e3.push(t3), e3;
    var n2 = t3.searchClient, r2 = t3.execute, o2 = t3.requesterId, i2 = t3.requests, c2 = e3.find(function(e4) {
      return _n(t3) && _n(e4) && e4.searchClient === n2 && Boolean(o2) && e4.requesterId === o2;
    });
    if (c2) {
      var a2;
      (a2 = c2.items).push.apply(a2, bn(i2));
    } else {
      var u2 = { execute: r2, requesterId: o2, items: i2, searchClient: n2 };
      e3.push(u2);
    }
    return e3;
  }, []).map(function(e3) {
    if (!_n(e3))
      return Promise.resolve(e3);
    var t3 = e3, n2 = t3.execute, r2 = t3.items;
    return n2({ searchClient: t3.searchClient, requests: r2 });
  });
  return Promise.all(t2).then(function(e3) {
    return nt(e3);
  });
}
function wn(e2, t2, n2) {
  return t2.map(function(t3) {
    var r2, o2 = e2.filter(function(e3) {
      return e3.sourceId === t3.sourceId;
    }), i2 = o2.map(function(e3) {
      return e3.items;
    }), c2 = o2[0].transformResponse, a2 = c2 ? c2({ results: r2 = i2, hits: r2.map(function(e3) {
      return e3.hits;
    }).filter(Boolean), facetHits: r2.map(function(e3) {
      var t4;
      return null === (t4 = e3.facetHits) || void 0 === t4 ? void 0 : t4.map(function(e4) {
        return { label: e4.value, count: e4.count, _highlightResult: { label: { value: e4.highlighted } } };
      });
    }).filter(Boolean) }) : i2;
    return t3.onResolve({ source: t3, results: i2, items: a2, state: n2.getState() }), it(Array.isArray(a2), function() {
      return 'The `getItems` function from source "'.concat(t3.sourceId, '" must return an array of items but returned type ').concat(JSON.stringify(vn(a2)), ":\n\n").concat(JSON.stringify(tt(a2), null, 2), ".\n\nSee: https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/sources/#param-getitems");
    }), it(a2.every(Boolean), 'The `getItems` function from source "'.concat(t3.sourceId, '" must return an array of items but returned ').concat(JSON.stringify(void 0), ".\n\nDid you forget to return items?\n\nSee: https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/sources/#param-getitems")), { source: t3, items: a2 };
  });
}
function jn(e2) {
  return jn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
    return typeof e3;
  } : function(e3) {
    return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
  }, jn(e2);
}
var En = ["event", "nextState", "props", "query", "refresh", "store"];
function Pn(e2, t2) {
  var n2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e2);
    t2 && (r2 = r2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), n2.push.apply(n2, r2);
  }
  return n2;
}
function In(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var n2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? Pn(Object(n2), true).forEach(function(t3) {
      Dn(e2, t3, n2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(n2)) : Pn(Object(n2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(n2, t3));
    });
  }
  return e2;
}
function Dn(e2, t2, n2) {
  return (t2 = function(e3) {
    var t3 = function(e4, t4) {
      if ("object" !== jn(e4) || null === e4)
        return e4;
      var n3 = e4[Symbol.toPrimitive];
      if (void 0 !== n3) {
        var r2 = n3.call(e4, t4 || "default");
        if ("object" !== jn(r2))
          return r2;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t4 ? String : Number)(e4);
    }(e3, "string");
    return "symbol" === jn(t3) ? t3 : String(t3);
  }(t2)) in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
}
function kn(e2, t2) {
  if (null == e2)
    return {};
  var n2, r2, o2 = function(e3, t3) {
    if (null == e3)
      return {};
    var n3, r3, o3 = {}, i3 = Object.keys(e3);
    for (r3 = 0; r3 < i3.length; r3++)
      n3 = i3[r3], t3.indexOf(n3) >= 0 || (o3[n3] = e3[n3]);
    return o3;
  }(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var i2 = Object.getOwnPropertySymbols(e2);
    for (r2 = 0; r2 < i2.length; r2++)
      n2 = i2[r2], t2.indexOf(n2) >= 0 || Object.prototype.propertyIsEnumerable.call(e2, n2) && (o2[n2] = e2[n2]);
  }
  return o2;
}
var An, Cn, Nn, xn = null, Tn = (An = -1, Cn = -1, Nn = void 0, function(e2) {
  var t2 = ++An;
  return Promise.resolve(e2).then(function(e3) {
    return Nn && t2 < Cn ? Nn : (Cn = t2, Nn = e3, e3);
  });
});
function Rn(e2) {
  var t2 = e2.event, n2 = e2.nextState, r2 = void 0 === n2 ? {} : n2, o2 = e2.props, i2 = e2.query, c2 = e2.refresh, a2 = e2.store, u2 = kn(e2, En);
  xn && o2.environment.clearTimeout(xn);
  var l2 = u2.setCollections, s2 = u2.setIsOpen, f2 = u2.setQuery, p2 = u2.setActiveItemId, m2 = u2.setStatus;
  if (f2(i2), p2(o2.defaultActiveItemId), !i2 && false === o2.openOnFocus) {
    var v2, d2 = a2.getState().collections.map(function(e3) {
      return In(In({}, e3), {}, { items: [] });
    });
    m2("idle"), l2(d2), s2(null !== (v2 = r2.isOpen) && void 0 !== v2 ? v2 : o2.shouldPanelOpen({ state: a2.getState() }));
    var h2 = Ht(Tn(d2).then(function() {
      return Promise.resolve();
    }));
    return a2.pendingRequests.add(h2);
  }
  m2("loading"), xn = o2.environment.setTimeout(function() {
    m2("stalled");
  }, o2.stallThreshold);
  var y2 = Ht(Tn(o2.getSources(In({ query: i2, refresh: c2, state: a2.getState() }, u2)).then(function(e3) {
    return Promise.all(e3.map(function(e4) {
      return Promise.resolve(e4.getItems(In({ query: i2, refresh: c2, state: a2.getState() }, u2))).then(function(t3) {
        return On(t3, e4.sourceId, a2.getState());
      });
    })).then(Sn).then(function(t3) {
      return wn(t3, e3, a2);
    }).then(function(e4) {
      return function(e5) {
        var t3 = e5.collections, n3 = e5.props, r3 = e5.state, o3 = t3.reduce(function(e6, t4) {
          return pn(pn({}, e6), {}, mn({}, t4.source.sourceId, pn(pn({}, t4.source), {}, { getItems: function() {
            return nt(t4.items);
          } })));
        }, {}), i3 = n3.plugins.reduce(function(e6, t4) {
          return t4.reshape ? t4.reshape(e6) : e6;
        }, { sourcesBySourceId: o3, state: r3 }).sourcesBySourceId;
        return nt(n3.reshape({ sourcesBySourceId: i3, sources: Object.values(i3), state: r3 })).filter(Boolean).map(function(e6) {
          return { source: e6, items: e6.getItems() };
        });
      }({ collections: e4, props: o2, state: a2.getState() });
    });
  }))).then(function(e3) {
    var n3;
    m2("idle"), l2(e3);
    var f3 = o2.shouldPanelOpen({ state: a2.getState() });
    s2(null !== (n3 = r2.isOpen) && void 0 !== n3 ? n3 : o2.openOnFocus && !i2 && f3 || f3);
    var p3 = zt(a2.getState());
    if (null !== a2.getState().activeItemId && p3) {
      var v3 = p3.item, d3 = p3.itemInputValue, h3 = p3.itemUrl, y3 = p3.source;
      y3.onActive(In({ event: t2, item: v3, itemInputValue: d3, itemUrl: h3, refresh: c2, source: y3, state: a2.getState() }, u2));
    }
  }).finally(function() {
    m2("idle"), xn && o2.environment.clearTimeout(xn);
  });
  return a2.pendingRequests.add(y2);
}
function qn(e2) {
  return qn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
    return typeof e3;
  } : function(e3) {
    return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
  }, qn(e2);
}
var Ln = ["event", "props", "refresh", "store"];
function Mn(e2, t2) {
  var n2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e2);
    t2 && (r2 = r2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), n2.push.apply(n2, r2);
  }
  return n2;
}
function Hn(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var n2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? Mn(Object(n2), true).forEach(function(t3) {
      Un(e2, t3, n2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(n2)) : Mn(Object(n2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(n2, t3));
    });
  }
  return e2;
}
function Un(e2, t2, n2) {
  return (t2 = function(e3) {
    var t3 = function(e4, t4) {
      if ("object" !== qn(e4) || null === e4)
        return e4;
      var n3 = e4[Symbol.toPrimitive];
      if (void 0 !== n3) {
        var r2 = n3.call(e4, t4 || "default");
        if ("object" !== qn(r2))
          return r2;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t4 ? String : Number)(e4);
    }(e3, "string");
    return "symbol" === qn(t3) ? t3 : String(t3);
  }(t2)) in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
}
function Fn(e2, t2) {
  if (null == e2)
    return {};
  var n2, r2, o2 = function(e3, t3) {
    if (null == e3)
      return {};
    var n3, r3, o3 = {}, i3 = Object.keys(e3);
    for (r3 = 0; r3 < i3.length; r3++)
      n3 = i3[r3], t3.indexOf(n3) >= 0 || (o3[n3] = e3[n3]);
    return o3;
  }(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var i2 = Object.getOwnPropertySymbols(e2);
    for (r2 = 0; r2 < i2.length; r2++)
      n2 = i2[r2], t2.indexOf(n2) >= 0 || Object.prototype.propertyIsEnumerable.call(e2, n2) && (o2[n2] = e2[n2]);
  }
  return o2;
}
function Bn(e2) {
  return Bn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
    return typeof e3;
  } : function(e3) {
    return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
  }, Bn(e2);
}
var Vn = ["props", "refresh", "store"], Wn = ["inputElement", "formElement", "panelElement"], Kn = ["inputElement"], zn = ["inputElement", "maxLength"], Jn = ["sourceIndex"], $n = ["sourceIndex"], Qn = ["item", "source", "sourceIndex"];
function Zn(e2, t2) {
  var n2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e2);
    t2 && (r2 = r2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), n2.push.apply(n2, r2);
  }
  return n2;
}
function Yn(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var n2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? Zn(Object(n2), true).forEach(function(t3) {
      Gn(e2, t3, n2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(n2)) : Zn(Object(n2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(n2, t3));
    });
  }
  return e2;
}
function Gn(e2, t2, n2) {
  return (t2 = function(e3) {
    var t3 = function(e4, t4) {
      if ("object" !== Bn(e4) || null === e4)
        return e4;
      var n3 = e4[Symbol.toPrimitive];
      if (void 0 !== n3) {
        var r2 = n3.call(e4, t4 || "default");
        if ("object" !== Bn(r2))
          return r2;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t4 ? String : Number)(e4);
    }(e3, "string");
    return "symbol" === Bn(t3) ? t3 : String(t3);
  }(t2)) in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
}
function Xn(e2, t2) {
  if (null == e2)
    return {};
  var n2, r2, o2 = function(e3, t3) {
    if (null == e3)
      return {};
    var n3, r3, o3 = {}, i3 = Object.keys(e3);
    for (r3 = 0; r3 < i3.length; r3++)
      n3 = i3[r3], t3.indexOf(n3) >= 0 || (o3[n3] = e3[n3]);
    return o3;
  }(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var i2 = Object.getOwnPropertySymbols(e2);
    for (r2 = 0; r2 < i2.length; r2++)
      n2 = i2[r2], t2.indexOf(n2) >= 0 || Object.prototype.propertyIsEnumerable.call(e2, n2) && (o2[n2] = e2[n2]);
  }
  return o2;
}
function er(e2) {
  var t2 = e2.props, n2 = e2.refresh, r2 = e2.store, o2 = Xn(e2, Vn), i2 = function(e3, t3) {
    return void 0 !== t3 ? "".concat(e3, "-").concat(t3) : e3;
  };
  return { getEnvironmentProps: function(e3) {
    var n3 = e3.inputElement, o3 = e3.formElement, i3 = e3.panelElement;
    function c2(e4) {
      !r2.getState().isOpen && r2.pendingRequests.isEmpty() || e4.target === n3 || false === [o3, i3].some(function(t3) {
        return n4 = t3, r3 = e4.target, n4 === r3 || n4.contains(r3);
        var n4, r3;
      }) && (r2.dispatch("blur", null), t2.debug || r2.pendingRequests.cancelAll());
    }
    return Yn({ onTouchStart: c2, onMouseDown: c2, onTouchMove: function(e4) {
      false !== r2.getState().isOpen && n3 === t2.environment.document.activeElement && e4.target !== n3 && n3.blur();
    } }, Xn(e3, Wn));
  }, getRootProps: function(e3) {
    return Yn({ role: "combobox", "aria-expanded": r2.getState().isOpen, "aria-haspopup": "listbox", "aria-owns": r2.getState().isOpen ? "".concat(t2.id, "-list") : void 0, "aria-labelledby": "".concat(t2.id, "-label") }, e3);
  }, getFormProps: function(e3) {
    e3.inputElement;
    return Yn({ action: "", noValidate: true, role: "search", onSubmit: function(i3) {
      var c2;
      i3.preventDefault(), t2.onSubmit(Yn({ event: i3, refresh: n2, state: r2.getState() }, o2)), r2.dispatch("submit", null), null === (c2 = e3.inputElement) || void 0 === c2 || c2.blur();
    }, onReset: function(i3) {
      var c2;
      i3.preventDefault(), t2.onReset(Yn({ event: i3, refresh: n2, state: r2.getState() }, o2)), r2.dispatch("reset", null), null === (c2 = e3.inputElement) || void 0 === c2 || c2.focus();
    } }, Xn(e3, Kn));
  }, getLabelProps: function(e3) {
    var n3 = e3 || {}, r3 = n3.sourceIndex, o3 = Xn(n3, Jn);
    return Yn({ htmlFor: "".concat(i2(t2.id, r3), "-input"), id: "".concat(i2(t2.id, r3), "-label") }, o3);
  }, getInputProps: function(e3) {
    var i3;
    function c2(e4) {
      (t2.openOnFocus || Boolean(r2.getState().query)) && Rn(Yn({ event: e4, props: t2, query: r2.getState().completion || r2.getState().query, refresh: n2, store: r2 }, o2)), r2.dispatch("focus", null);
    }
    var a2 = e3 || {}, u2 = (a2.inputElement, a2.maxLength), l2 = void 0 === u2 ? 512 : u2, s2 = Xn(a2, zn), f2 = zt(r2.getState()), p2 = function(e4) {
      return Boolean(e4 && e4.match(Jt));
    }((null === (i3 = t2.environment.navigator) || void 0 === i3 ? void 0 : i3.userAgent) || ""), m2 = null != f2 && f2.itemUrl && !p2 ? "go" : "search";
    return Yn({ "aria-autocomplete": "both", "aria-activedescendant": r2.getState().isOpen && null !== r2.getState().activeItemId ? "".concat(t2.id, "-item-").concat(r2.getState().activeItemId) : void 0, "aria-controls": r2.getState().isOpen ? "".concat(t2.id, "-list") : void 0, "aria-labelledby": "".concat(t2.id, "-label"), value: r2.getState().completion || r2.getState().query, id: "".concat(t2.id, "-input"), autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", enterKeyHint: m2, spellCheck: "false", autoFocus: t2.autoFocus, placeholder: t2.placeholder, maxLength: l2, type: "search", onChange: function(e4) {
      Rn(Yn({ event: e4, props: t2, query: e4.currentTarget.value.slice(0, l2), refresh: n2, store: r2 }, o2));
    }, onKeyDown: function(e4) {
      !function(e5) {
        var t3 = e5.event, n3 = e5.props, r3 = e5.refresh, o3 = e5.store, i4 = Fn(e5, Ln);
        if ("ArrowUp" === t3.key || "ArrowDown" === t3.key) {
          var c3 = function() {
            var e6 = n3.environment.document.getElementById("".concat(n3.id, "-item-").concat(o3.getState().activeItemId));
            e6 && (e6.scrollIntoViewIfNeeded ? e6.scrollIntoViewIfNeeded(false) : e6.scrollIntoView(false));
          }, a3 = function() {
            var e6 = zt(o3.getState());
            if (null !== o3.getState().activeItemId && e6) {
              var n4 = e6.item, c4 = e6.itemInputValue, a4 = e6.itemUrl, u4 = e6.source;
              u4.onActive(Hn({ event: t3, item: n4, itemInputValue: c4, itemUrl: a4, refresh: r3, source: u4, state: o3.getState() }, i4));
            }
          };
          t3.preventDefault(), false === o3.getState().isOpen && (n3.openOnFocus || Boolean(o3.getState().query)) ? Rn(Hn({ event: t3, props: n3, query: o3.getState().query, refresh: r3, store: o3 }, i4)).then(function() {
            o3.dispatch(t3.key, { nextActiveItemId: n3.defaultActiveItemId }), a3(), setTimeout(c3, 0);
          }) : (o3.dispatch(t3.key, {}), a3(), c3());
        } else if ("Escape" === t3.key)
          t3.preventDefault(), o3.dispatch(t3.key, null), o3.pendingRequests.cancelAll();
        else if ("Tab" === t3.key)
          o3.dispatch("blur", null), o3.pendingRequests.cancelAll();
        else if ("Enter" === t3.key) {
          if (null === o3.getState().activeItemId || o3.getState().collections.every(function(e6) {
            return 0 === e6.items.length;
          }))
            return void (n3.debug || o3.pendingRequests.cancelAll());
          t3.preventDefault();
          var u3 = zt(o3.getState()), l3 = u3.item, s3 = u3.itemInputValue, f3 = u3.itemUrl, p3 = u3.source;
          if (t3.metaKey || t3.ctrlKey)
            void 0 !== f3 && (p3.onSelect(Hn({ event: t3, item: l3, itemInputValue: s3, itemUrl: f3, refresh: r3, source: p3, state: o3.getState() }, i4)), n3.navigator.navigateNewTab({ itemUrl: f3, item: l3, state: o3.getState() }));
          else if (t3.shiftKey)
            void 0 !== f3 && (p3.onSelect(Hn({ event: t3, item: l3, itemInputValue: s3, itemUrl: f3, refresh: r3, source: p3, state: o3.getState() }, i4)), n3.navigator.navigateNewWindow({ itemUrl: f3, item: l3, state: o3.getState() }));
          else if (t3.altKey)
            ;
          else {
            if (void 0 !== f3)
              return p3.onSelect(Hn({ event: t3, item: l3, itemInputValue: s3, itemUrl: f3, refresh: r3, source: p3, state: o3.getState() }, i4)), void n3.navigator.navigate({ itemUrl: f3, item: l3, state: o3.getState() });
            Rn(Hn({ event: t3, nextState: { isOpen: false }, props: n3, query: s3, refresh: r3, store: o3 }, i4)).then(function() {
              p3.onSelect(Hn({ event: t3, item: l3, itemInputValue: s3, itemUrl: f3, refresh: r3, source: p3, state: o3.getState() }, i4));
            });
          }
        }
      }(Yn({ event: e4, props: t2, refresh: n2, store: r2 }, o2));
    }, onFocus: c2, onBlur: ut, onClick: function(n3) {
      e3.inputElement !== t2.environment.document.activeElement || r2.getState().isOpen || c2(n3);
    } }, s2);
  }, getPanelProps: function(e3) {
    return Yn({ onMouseDown: function(e4) {
      e4.preventDefault();
    }, onMouseLeave: function() {
      r2.dispatch("mouseleave", null);
    } }, e3);
  }, getListProps: function(e3) {
    var n3 = e3 || {}, r3 = n3.sourceIndex, o3 = Xn(n3, $n);
    return Yn({ role: "listbox", "aria-labelledby": "".concat(i2(t2.id, r3), "-label"), id: "".concat(i2(t2.id, r3), "-list") }, o3);
  }, getItemProps: function(e3) {
    var c2 = e3.item, a2 = e3.source, u2 = e3.sourceIndex, l2 = Xn(e3, Qn);
    return Yn({ id: "".concat(i2(t2.id, u2), "-item-").concat(c2.__autocomplete_id), role: "option", "aria-selected": r2.getState().activeItemId === c2.__autocomplete_id, onMouseMove: function(e4) {
      if (c2.__autocomplete_id !== r2.getState().activeItemId) {
        r2.dispatch("mousemove", c2.__autocomplete_id);
        var t3 = zt(r2.getState());
        if (null !== r2.getState().activeItemId && t3) {
          var i3 = t3.item, a3 = t3.itemInputValue, u3 = t3.itemUrl, l3 = t3.source;
          l3.onActive(Yn({ event: e4, item: i3, itemInputValue: a3, itemUrl: u3, refresh: n2, source: l3, state: r2.getState() }, o2));
        }
      }
    }, onMouseDown: function(e4) {
      e4.preventDefault();
    }, onClick: function(e4) {
      var i3 = a2.getItemInputValue({ item: c2, state: r2.getState() }), u3 = a2.getItemUrl({ item: c2, state: r2.getState() });
      (u3 ? Promise.resolve() : Rn(Yn({ event: e4, nextState: { isOpen: false }, props: t2, query: i3, refresh: n2, store: r2 }, o2))).then(function() {
        a2.onSelect(Yn({ event: e4, item: c2, itemInputValue: i3, itemUrl: u3, refresh: n2, source: a2, state: r2.getState() }, o2));
      });
    } }, l2);
  } };
}
function tr(e2) {
  return tr = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
    return typeof e3;
  } : function(e3) {
    return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
  }, tr(e2);
}
function nr(e2, t2) {
  var n2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e2);
    t2 && (r2 = r2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), n2.push.apply(n2, r2);
  }
  return n2;
}
function rr(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var n2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? nr(Object(n2), true).forEach(function(t3) {
      or(e2, t3, n2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(n2)) : nr(Object(n2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(n2, t3));
    });
  }
  return e2;
}
function or(e2, t2, n2) {
  return (t2 = function(e3) {
    var t3 = function(e4, t4) {
      if ("object" !== tr(e4) || null === e4)
        return e4;
      var n3 = e4[Symbol.toPrimitive];
      if (void 0 !== n3) {
        var r2 = n3.call(e4, t4 || "default");
        if ("object" !== tr(r2))
          return r2;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t4 ? String : Number)(e4);
    }(e3, "string");
    return "symbol" === tr(t3) ? t3 : String(t3);
  }(t2)) in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
}
function ir(e2) {
  var t2, n2, r2, o2, i2 = e2.plugins, c2 = e2.options, a2 = null === (t2 = ((null === (n2 = c2.__autocomplete_metadata) || void 0 === n2 ? void 0 : n2.userAgents) || [])[0]) || void 0 === t2 ? void 0 : t2.segment, u2 = a2 ? or({}, a2, Object.keys((null === (r2 = c2.__autocomplete_metadata) || void 0 === r2 ? void 0 : r2.options) || {})) : {};
  return { plugins: i2.map(function(e3) {
    return { name: e3.name, options: Object.keys(e3.__autocomplete_pluginOptions || []) };
  }), options: rr({ "autocomplete-core": Object.keys(c2) }, u2), ua: lt.concat((null === (o2 = c2.__autocomplete_metadata) || void 0 === o2 ? void 0 : o2.userAgents) || []) };
}
function cr(e2) {
  var t2, n2 = e2.state;
  return false === n2.isOpen || null === n2.activeItemId ? null : (null === (t2 = zt(n2)) || void 0 === t2 ? void 0 : t2.itemInputValue) || null;
}
function ar(e2) {
  return ar = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
    return typeof e3;
  } : function(e3) {
    return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
  }, ar(e2);
}
function ur(e2, t2) {
  var n2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e2);
    t2 && (r2 = r2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), n2.push.apply(n2, r2);
  }
  return n2;
}
function lr(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var n2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? ur(Object(n2), true).forEach(function(t3) {
      sr(e2, t3, n2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(n2)) : ur(Object(n2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(n2, t3));
    });
  }
  return e2;
}
function sr(e2, t2, n2) {
  return (t2 = function(e3) {
    var t3 = function(e4, t4) {
      if ("object" !== ar(e4) || null === e4)
        return e4;
      var n3 = e4[Symbol.toPrimitive];
      if (void 0 !== n3) {
        var r2 = n3.call(e4, t4 || "default");
        if ("object" !== ar(r2))
          return r2;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t4 ? String : Number)(e4);
    }(e3, "string");
    return "symbol" === ar(t3) ? t3 : String(t3);
  }(t2)) in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
}
var fr = function(e2, t2) {
  switch (t2.type) {
    case "setActiveItemId":
    case "mousemove":
      return lr(lr({}, e2), {}, { activeItemId: t2.payload });
    case "setQuery":
      return lr(lr({}, e2), {}, { query: t2.payload, completion: null });
    case "setCollections":
      return lr(lr({}, e2), {}, { collections: t2.payload });
    case "setIsOpen":
      return lr(lr({}, e2), {}, { isOpen: t2.payload });
    case "setStatus":
      return lr(lr({}, e2), {}, { status: t2.payload });
    case "setContext":
      return lr(lr({}, e2), {}, { context: lr(lr({}, e2.context), t2.payload) });
    case "ArrowDown":
      var n2 = lr(lr({}, e2), {}, { activeItemId: t2.payload.hasOwnProperty("nextActiveItemId") ? t2.payload.nextActiveItemId : Ft(1, e2.activeItemId, ot(e2), t2.props.defaultActiveItemId) });
      return lr(lr({}, n2), {}, { completion: cr({ state: n2 }) });
    case "ArrowUp":
      var r2 = lr(lr({}, e2), {}, { activeItemId: Ft(-1, e2.activeItemId, ot(e2), t2.props.defaultActiveItemId) });
      return lr(lr({}, r2), {}, { completion: cr({ state: r2 }) });
    case "Escape":
      return e2.isOpen ? lr(lr({}, e2), {}, { activeItemId: null, isOpen: false, completion: null }) : lr(lr({}, e2), {}, { activeItemId: null, query: "", status: "idle", collections: [] });
    case "submit":
      return lr(lr({}, e2), {}, { activeItemId: null, isOpen: false, status: "idle" });
    case "reset":
      return lr(lr({}, e2), {}, { activeItemId: true === t2.props.openOnFocus ? t2.props.defaultActiveItemId : null, status: "idle", query: "" });
    case "focus":
      return lr(lr({}, e2), {}, { activeItemId: t2.props.defaultActiveItemId, isOpen: (t2.props.openOnFocus || Boolean(e2.query)) && t2.props.shouldPanelOpen({ state: e2 }) });
    case "blur":
      return t2.props.debug ? e2 : lr(lr({}, e2), {}, { isOpen: false, activeItemId: null });
    case "mouseleave":
      return lr(lr({}, e2), {}, { activeItemId: t2.props.defaultActiveItemId });
    default:
      return it(false, "The reducer action ".concat(JSON.stringify(t2.type), " is not supported.")), e2;
  }
};
function pr(e2) {
  return pr = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
    return typeof e3;
  } : function(e3) {
    return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
  }, pr(e2);
}
function mr(e2, t2) {
  var n2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e2);
    t2 && (r2 = r2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), n2.push.apply(n2, r2);
  }
  return n2;
}
function vr(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var n2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? mr(Object(n2), true).forEach(function(t3) {
      dr(e2, t3, n2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(n2)) : mr(Object(n2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(n2, t3));
    });
  }
  return e2;
}
function dr(e2, t2, n2) {
  return (t2 = function(e3) {
    var t3 = function(e4, t4) {
      if ("object" !== pr(e4) || null === e4)
        return e4;
      var n3 = e4[Symbol.toPrimitive];
      if (void 0 !== n3) {
        var r2 = n3.call(e4, t4 || "default");
        if ("object" !== pr(r2))
          return r2;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t4 ? String : Number)(e4);
    }(e3, "string");
    return "symbol" === pr(t3) ? t3 : String(t3);
  }(t2)) in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
}
function hr(e2) {
  Lt(e2);
  var t2 = [], n2 = ln(e2, t2), r2 = Yt(fr, n2, function(e3) {
    var t3 = e3.prevState, r3 = e3.state;
    n2.onStateChange(vr({ prevState: t3, state: r3, refresh: c2, navigator: n2.navigator }, o2));
  }), o2 = function(e3) {
    var t3 = e3.store;
    return { setActiveItemId: function(e4) {
      t3.dispatch("setActiveItemId", e4);
    }, setQuery: function(e4) {
      t3.dispatch("setQuery", e4);
    }, setCollections: function(e4) {
      var n3 = 0, r3 = e4.map(function(e5) {
        return en(en({}, e5), {}, { items: nt(e5.items).map(function(e6) {
          return en(en({}, e6), {}, { __autocomplete_id: n3++ });
        }) });
      });
      t3.dispatch("setCollections", r3);
    }, setIsOpen: function(e4) {
      t3.dispatch("setIsOpen", e4);
    }, setStatus: function(e4) {
      t3.dispatch("setStatus", e4);
    }, setContext: function(e4) {
      t3.dispatch("setContext", e4);
    } };
  }({ store: r2 }), i2 = er(vr({ props: n2, refresh: c2, store: r2, navigator: n2.navigator }, o2));
  function c2() {
    return Rn(vr({ event: new Event("input"), nextState: { isOpen: r2.getState().isOpen }, props: n2, navigator: n2.navigator, query: r2.getState().query, refresh: c2, store: r2 }, o2));
  }
  if (e2.insights && !n2.plugins.some(function(e3) {
    return "aa.algoliaInsightsPlugin" === e3.name;
  })) {
    var a2 = "boolean" == typeof e2.insights ? {} : e2.insights;
    n2.plugins.push(qt(a2));
  }
  return n2.plugins.forEach(function(e3) {
    var r3;
    return null === (r3 = e3.subscribe) || void 0 === r3 ? void 0 : r3.call(e3, vr(vr({}, o2), {}, { navigator: n2.navigator, refresh: c2, onSelect: function(e4) {
      t2.push({ onSelect: e4 });
    }, onActive: function(e4) {
      t2.push({ onActive: e4 });
    }, onResolve: function(e4) {
      t2.push({ onResolve: e4 });
    } }));
  }), function(e3) {
    var t3, n3, r3 = e3.metadata, o3 = e3.environment;
    if (null === (t3 = o3.navigator) || void 0 === t3 || null === (n3 = t3.userAgent) || void 0 === n3 ? void 0 : n3.includes("Algolia Crawler")) {
      var i3 = o3.document.createElement("meta"), c3 = o3.document.querySelector("head");
      i3.name = "algolia:metadata", setTimeout(function() {
        i3.content = JSON.stringify(r3), c3.appendChild(i3);
      }, 0);
    }
  }({ metadata: ir({ plugins: n2.plugins, options: e2 }), environment: n2.environment }), vr(vr({ refresh: c2, navigator: n2.navigator }, i2), o2);
}
function yr(e2) {
  var t2 = e2.translations, n2 = (void 0 === t2 ? {} : t2).searchByText, r2 = void 0 === n2 ? "Search by" : n2;
  return Be.createElement("a", { href: "https://www.algolia.com/ref/docsearch/?utm_source=".concat(window.location.hostname, "&utm_medium=referral&utm_content=powered_by&utm_campaign=docsearch"), target: "_blank", rel: "noopener noreferrer" }, Be.createElement("span", { className: "DocSearch-Label" }, r2), Be.createElement("svg", { width: "77", height: "19", "aria-label": "Algolia", role: "img", id: "Layer_1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 2196.2 500" }, Be.createElement("defs", null, Be.createElement("style", null, ".cls-1,.cls-2{fill:#003dff;}.cls-2{fill-rule:evenodd;}")), Be.createElement("path", { className: "cls-2", d: "M1070.38,275.3V5.91c0-3.63-3.24-6.39-6.82-5.83l-50.46,7.94c-2.87,.45-4.99,2.93-4.99,5.84l.17,273.22c0,12.92,0,92.7,95.97,95.49,3.33,.1,6.09-2.58,6.09-5.91v-40.78c0-2.96-2.19-5.51-5.12-5.84-34.85-4.01-34.85-47.57-34.85-54.72Z" }), Be.createElement("rect", { className: "cls-1", x: "1845.88", y: "104.73", width: "62.58", height: "277.9", rx: "5.9", ry: "5.9" }), Be.createElement("path", { className: "cls-2", d: "M1851.78,71.38h50.77c3.26,0,5.9-2.64,5.9-5.9V5.9c0-3.62-3.24-6.39-6.82-5.83l-50.77,7.95c-2.87,.45-4.99,2.92-4.99,5.83v51.62c0,3.26,2.64,5.9,5.9,5.9Z" }), Be.createElement("path", { className: "cls-2", d: "M1764.03,275.3V5.91c0-3.63-3.24-6.39-6.82-5.83l-50.46,7.94c-2.87,.45-4.99,2.93-4.99,5.84l.17,273.22c0,12.92,0,92.7,95.97,95.49,3.33,.1,6.09-2.58,6.09-5.91v-40.78c0-2.96-2.19-5.51-5.12-5.84-34.85-4.01-34.85-47.57-34.85-54.72Z" }), Be.createElement("path", { className: "cls-2", d: "M1631.95,142.72c-11.14-12.25-24.83-21.65-40.78-28.31-15.92-6.53-33.26-9.85-52.07-9.85-18.78,0-36.15,3.17-51.92,9.85-15.59,6.66-29.29,16.05-40.76,28.31-11.47,12.23-20.38,26.87-26.76,44.03-6.38,17.17-9.24,37.37-9.24,58.36,0,20.99,3.19,36.87,9.55,54.21,6.38,17.32,15.14,32.11,26.45,44.36,11.29,12.23,24.83,21.62,40.6,28.46,15.77,6.83,40.12,10.33,52.4,10.48,12.25,0,36.78-3.82,52.7-10.48,15.92-6.68,29.46-16.23,40.78-28.46,11.29-12.25,20.05-27.04,26.25-44.36,6.22-17.34,9.24-33.22,9.24-54.21,0-20.99-3.34-41.19-10.03-58.36-6.38-17.17-15.14-31.8-26.43-44.03Zm-44.43,163.75c-11.47,15.75-27.56,23.7-48.09,23.7-20.55,0-36.63-7.8-48.1-23.7-11.47-15.75-17.21-34.01-17.21-61.2,0-26.89,5.59-49.14,17.06-64.87,11.45-15.75,27.54-23.52,48.07-23.52,20.55,0,36.63,7.78,48.09,23.52,11.47,15.57,17.36,37.98,17.36,64.87,0,27.19-5.72,45.3-17.19,61.2Z" }), Be.createElement("path", { className: "cls-2", d: "M894.42,104.73h-49.33c-48.36,0-90.91,25.48-115.75,64.1-14.52,22.58-22.99,49.63-22.99,78.73,0,44.89,20.13,84.92,51.59,111.1,2.93,2.6,6.05,4.98,9.31,7.14,12.86,8.49,28.11,13.47,44.52,13.47,1.23,0,2.46-.03,3.68-.09,.36-.02,.71-.05,1.07-.07,.87-.05,1.75-.11,2.62-.2,.34-.03,.68-.08,1.02-.12,.91-.1,1.82-.21,2.73-.34,.21-.03,.42-.07,.63-.1,32.89-5.07,61.56-30.82,70.9-62.81v57.83c0,3.26,2.64,5.9,5.9,5.9h50.42c3.26,0,5.9-2.64,5.9-5.9V110.63c0-3.26-2.64-5.9-5.9-5.9h-56.32Zm0,206.92c-12.2,10.16-27.97,13.98-44.84,15.12-.16,.01-.33,.03-.49,.04-1.12,.07-2.24,.1-3.36,.1-42.24,0-77.12-35.89-77.12-79.37,0-10.25,1.96-20.01,5.42-28.98,11.22-29.12,38.77-49.74,71.06-49.74h49.33v142.83Z" }), Be.createElement("path", { className: "cls-2", d: "M2133.97,104.73h-49.33c-48.36,0-90.91,25.48-115.75,64.1-14.52,22.58-22.99,49.63-22.99,78.73,0,44.89,20.13,84.92,51.59,111.1,2.93,2.6,6.05,4.98,9.31,7.14,12.86,8.49,28.11,13.47,44.52,13.47,1.23,0,2.46-.03,3.68-.09,.36-.02,.71-.05,1.07-.07,.87-.05,1.75-.11,2.62-.2,.34-.03,.68-.08,1.02-.12,.91-.1,1.82-.21,2.73-.34,.21-.03,.42-.07,.63-.1,32.89-5.07,61.56-30.82,70.9-62.81v57.83c0,3.26,2.64,5.9,5.9,5.9h50.42c3.26,0,5.9-2.64,5.9-5.9V110.63c0-3.26-2.64-5.9-5.9-5.9h-56.32Zm0,206.92c-12.2,10.16-27.97,13.98-44.84,15.12-.16,.01-.33,.03-.49,.04-1.12,.07-2.24,.1-3.36,.1-42.24,0-77.12-35.89-77.12-79.37,0-10.25,1.96-20.01,5.42-28.98,11.22-29.12,38.77-49.74,71.06-49.74h49.33v142.83Z" }), Be.createElement("path", { className: "cls-2", d: "M1314.05,104.73h-49.33c-48.36,0-90.91,25.48-115.75,64.1-11.79,18.34-19.6,39.64-22.11,62.59-.58,5.3-.88,10.68-.88,16.14s.31,11.15,.93,16.59c4.28,38.09,23.14,71.61,50.66,94.52,2.93,2.6,6.05,4.98,9.31,7.14,12.86,8.49,28.11,13.47,44.52,13.47h0c17.99,0,34.61-5.93,48.16-15.97,16.29-11.58,28.88-28.54,34.48-47.75v50.26h-.11v11.08c0,21.84-5.71,38.27-17.34,49.36-11.61,11.08-31.04,16.63-58.25,16.63-11.12,0-28.79-.59-46.6-2.41-2.83-.29-5.46,1.5-6.27,4.22l-12.78,43.11c-1.02,3.46,1.27,7.02,4.83,7.53,21.52,3.08,42.52,4.68,54.65,4.68,48.91,0,85.16-10.75,108.89-32.21,21.48-19.41,33.15-48.89,35.2-88.52V110.63c0-3.26-2.64-5.9-5.9-5.9h-56.32Zm0,64.1s.65,139.13,0,143.36c-12.08,9.77-27.11,13.59-43.49,14.7-.16,.01-.33,.03-.49,.04-1.12,.07-2.24,.1-3.36,.1-1.32,0-2.63-.03-3.94-.1-40.41-2.11-74.52-37.26-74.52-79.38,0-10.25,1.96-20.01,5.42-28.98,11.22-29.12,38.77-49.74,71.06-49.74h49.33Z" }), Be.createElement("path", { className: "cls-1", d: "M249.83,0C113.3,0,2,110.09,.03,246.16c-2,138.19,110.12,252.7,248.33,253.5,42.68,.25,83.79-10.19,120.3-30.03,3.56-1.93,4.11-6.83,1.08-9.51l-23.38-20.72c-4.75-4.21-11.51-5.4-17.36-2.92-25.48,10.84-53.17,16.38-81.71,16.03-111.68-1.37-201.91-94.29-200.13-205.96,1.76-110.26,92-199.41,202.67-199.41h202.69V407.41l-115-102.18c-3.72-3.31-9.42-2.66-12.42,1.31-18.46,24.44-48.53,39.64-81.93,37.34-46.33-3.2-83.87-40.5-87.34-86.81-4.15-55.24,39.63-101.52,94-101.52,49.18,0,89.68,37.85,93.91,85.95,.38,4.28,2.31,8.27,5.52,11.12l29.95,26.55c3.4,3.01,8.79,1.17,9.63-3.3,2.16-11.55,2.92-23.58,2.07-35.92-4.82-70.34-61.8-126.93-132.17-131.26-80.68-4.97-148.13,58.14-150.27,137.25-2.09,77.1,61.08,143.56,138.19,145.26,32.19,.71,62.03-9.41,86.14-26.95l150.26,133.2c6.44,5.71,16.61,1.14,16.61-7.47V9.48C499.66,4.25,495.42,0,490.18,0H249.83Z" })));
}
function br(e2) {
  return Be.createElement("svg", { width: "15", height: "15", "aria-label": e2.ariaLabel, role: "img" }, Be.createElement("g", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.2" }, e2.children));
}
function gr(e2) {
  var t2 = e2.translations, n2 = void 0 === t2 ? {} : t2, r2 = n2.selectText, o2 = void 0 === r2 ? "to select" : r2, i2 = n2.selectKeyAriaLabel, c2 = void 0 === i2 ? "Enter key" : i2, a2 = n2.navigateText, u2 = void 0 === a2 ? "to navigate" : a2, l2 = n2.navigateUpKeyAriaLabel, s2 = void 0 === l2 ? "Arrow up" : l2, f2 = n2.navigateDownKeyAriaLabel, p2 = void 0 === f2 ? "Arrow down" : f2, m2 = n2.closeText, v2 = void 0 === m2 ? "to close" : m2, d2 = n2.closeKeyAriaLabel, h2 = void 0 === d2 ? "Escape key" : d2, y2 = n2.searchByText, b2 = void 0 === y2 ? "Search by" : y2;
  return Be.createElement(Be.Fragment, null, Be.createElement("div", { className: "DocSearch-Logo" }, Be.createElement(yr, { translations: { searchByText: b2 } })), Be.createElement("ul", { className: "DocSearch-Commands" }, Be.createElement("li", null, Be.createElement("kbd", { className: "DocSearch-Commands-Key" }, Be.createElement(br, { ariaLabel: c2 }, Be.createElement("path", { d: "M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3" }))), Be.createElement("span", { className: "DocSearch-Label" }, o2)), Be.createElement("li", null, Be.createElement("kbd", { className: "DocSearch-Commands-Key" }, Be.createElement(br, { ariaLabel: p2 }, Be.createElement("path", { d: "M7.5 3.5v8M10.5 8.5l-3 3-3-3" }))), Be.createElement("kbd", { className: "DocSearch-Commands-Key" }, Be.createElement(br, { ariaLabel: s2 }, Be.createElement("path", { d: "M7.5 11.5v-8M10.5 6.5l-3-3-3 3" }))), Be.createElement("span", { className: "DocSearch-Label" }, u2)), Be.createElement("li", null, Be.createElement("kbd", { className: "DocSearch-Commands-Key" }, Be.createElement(br, { ariaLabel: h2 }, Be.createElement("path", { d: "M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956" }))), Be.createElement("span", { className: "DocSearch-Label" }, v2))));
}
function _r(e2) {
  var t2 = e2.hit, n2 = e2.children;
  return Be.createElement("a", { href: t2.url }, n2);
}
function Or() {
  return Be.createElement("svg", { viewBox: "0 0 38 38", stroke: "currentColor", strokeOpacity: ".5" }, Be.createElement("g", { fill: "none", fillRule: "evenodd" }, Be.createElement("g", { transform: "translate(1 1)", strokeWidth: "2" }, Be.createElement("circle", { strokeOpacity: ".3", cx: "18", cy: "18", r: "18" }), Be.createElement("path", { d: "M36 18c0-9.94-8.06-18-18-18" }, Be.createElement("animateTransform", { attributeName: "transform", type: "rotate", from: "0 18 18", to: "360 18 18", dur: "1s", repeatCount: "indefinite" })))));
}
function Sr() {
  return Be.createElement("svg", { width: "20", height: "20", viewBox: "0 0 20 20" }, Be.createElement("g", { stroke: "currentColor", fill: "none", fillRule: "evenodd", strokeLinecap: "round", strokeLinejoin: "round" }, Be.createElement("path", { d: "M3.18 6.6a8.23 8.23 0 1112.93 9.94h0a8.23 8.23 0 01-11.63 0" }), Be.createElement("path", { d: "M6.44 7.25H2.55V3.36M10.45 6v5.6M10.45 11.6L13 13" })));
}
function wr() {
  return Be.createElement("svg", { width: "20", height: "20", viewBox: "0 0 20 20" }, Be.createElement("path", { d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z", stroke: "currentColor", fill: "none", fillRule: "evenodd", strokeLinecap: "round", strokeLinejoin: "round" }));
}
function jr() {
  return Be.createElement("svg", { className: "DocSearch-Hit-Select-Icon", width: "20", height: "20", viewBox: "0 0 20 20" }, Be.createElement("g", { stroke: "currentColor", fill: "none", fillRule: "evenodd", strokeLinecap: "round", strokeLinejoin: "round" }, Be.createElement("path", { d: "M18 3v4c0 2-2 4-4 4H2" }), Be.createElement("path", { d: "M8 17l-6-6 6-6" })));
}
var Er = function() {
  return Be.createElement("svg", { width: "20", height: "20", viewBox: "0 0 20 20" }, Be.createElement("path", { d: "M17 6v12c0 .52-.2 1-1 1H4c-.7 0-1-.33-1-1V2c0-.55.42-1 1-1h8l5 5zM14 8h-3.13c-.51 0-.87-.34-.87-.87V4", stroke: "currentColor", fill: "none", fillRule: "evenodd", strokeLinejoin: "round" }));
};
function Pr(e2) {
  switch (e2.type) {
    case "lvl1":
      return Be.createElement(Er, null);
    case "content":
      return Be.createElement(Dr, null);
    default:
      return Be.createElement(Ir, null);
  }
}
function Ir() {
  return Be.createElement("svg", { width: "20", height: "20", viewBox: "0 0 20 20" }, Be.createElement("path", { d: "M13 13h4-4V8H7v5h6v4-4H7V8H3h4V3v5h6V3v5h4-4v5zm-6 0v4-4H3h4z", stroke: "currentColor", fill: "none", fillRule: "evenodd", strokeLinecap: "round", strokeLinejoin: "round" }));
}
function Dr() {
  return Be.createElement("svg", { width: "20", height: "20", viewBox: "0 0 20 20" }, Be.createElement("path", { d: "M17 5H3h14zm0 5H3h14zm0 5H3h14z", stroke: "currentColor", fill: "none", fillRule: "evenodd", strokeLinejoin: "round" }));
}
function kr() {
  return Be.createElement("svg", { width: "20", height: "20", viewBox: "0 0 20 20" }, Be.createElement("path", { d: "M10 14.2L5 17l1-5.6-4-4 5.5-.7 2.5-5 2.5 5 5.6.8-4 4 .9 5.5z", stroke: "currentColor", fill: "none", fillRule: "evenodd", strokeLinejoin: "round" }));
}
function Ar() {
  return Be.createElement("svg", { width: "40", height: "40", viewBox: "0 0 20 20", fill: "none", fillRule: "evenodd", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }, Be.createElement("path", { d: "M19 4.8a16 16 0 00-2-1.2m-3.3-1.2A16 16 0 001.1 4.7M16.7 8a12 12 0 00-2.8-1.4M10 6a12 12 0 00-6.7 2M12.3 14.7a4 4 0 00-4.5 0M14.5 11.4A8 8 0 0010 10M3 16L18 2M10 18h0" }));
}
function Cr() {
  return Be.createElement("svg", { width: "40", height: "40", viewBox: "0 0 20 20", fill: "none", fillRule: "evenodd", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }, Be.createElement("path", { d: "M15.5 4.8c2 3 1.7 7-1 9.7h0l4.3 4.3-4.3-4.3a7.8 7.8 0 01-9.8 1m-2.2-2.2A7.8 7.8 0 0113.2 2.4M2 18L18 2" }));
}
function Nr(e2) {
  var t2 = e2.translations, n2 = void 0 === t2 ? {} : t2, r2 = n2.titleText, o2 = void 0 === r2 ? "Unable to fetch results" : r2, i2 = n2.helpText, c2 = void 0 === i2 ? "You might want to check your network connection." : i2;
  return Be.createElement("div", { className: "DocSearch-ErrorScreen" }, Be.createElement("div", { className: "DocSearch-Screen-Icon" }, Be.createElement(Ar, null)), Be.createElement("p", { className: "DocSearch-Title" }, o2), Be.createElement("p", { className: "DocSearch-Help" }, c2));
}
var xr = ["translations"];
function Tr(e2) {
  return function(e3) {
    if (Array.isArray(e3))
      return Rr(e3);
  }(e2) || function(e3) {
    if ("undefined" != typeof Symbol && null != e3[Symbol.iterator] || null != e3["@@iterator"])
      return Array.from(e3);
  }(e2) || function(e3, t2) {
    if (!e3)
      return;
    if ("string" == typeof e3)
      return Rr(e3, t2);
    var n2 = Object.prototype.toString.call(e3).slice(8, -1);
    "Object" === n2 && e3.constructor && (n2 = e3.constructor.name);
    if ("Map" === n2 || "Set" === n2)
      return Array.from(e3);
    if ("Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
      return Rr(e3, t2);
  }(e2) || function() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function Rr(e2, t2) {
  (null == t2 || t2 > e2.length) && (t2 = e2.length);
  for (var n2 = 0, r2 = new Array(t2); n2 < t2; n2++)
    r2[n2] = e2[n2];
  return r2;
}
function qr(e2, t2) {
  if (null == e2)
    return {};
  var n2, r2, o2 = function(e3, t3) {
    if (null == e3)
      return {};
    var n3, r3, o3 = {}, i3 = Object.keys(e3);
    for (r3 = 0; r3 < i3.length; r3++)
      n3 = i3[r3], t3.indexOf(n3) >= 0 || (o3[n3] = e3[n3]);
    return o3;
  }(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var i2 = Object.getOwnPropertySymbols(e2);
    for (r2 = 0; r2 < i2.length; r2++)
      n2 = i2[r2], t2.indexOf(n2) >= 0 || Object.prototype.propertyIsEnumerable.call(e2, n2) && (o2[n2] = e2[n2]);
  }
  return o2;
}
function Lr(e2) {
  var t2 = e2.translations, n2 = void 0 === t2 ? {} : t2, r2 = qr(e2, xr), o2 = n2.noResultsText, i2 = void 0 === o2 ? "No results for" : o2, c2 = n2.suggestedQueryText, a2 = void 0 === c2 ? "Try searching for" : c2, u2 = n2.reportMissingResultsText, l2 = void 0 === u2 ? "Believe this query should return results?" : u2, s2 = n2.reportMissingResultsLinkText, f2 = void 0 === s2 ? "Let us know." : s2, p2 = r2.state.context.searchSuggestions;
  return Be.createElement("div", { className: "DocSearch-NoResults" }, Be.createElement("div", { className: "DocSearch-Screen-Icon" }, Be.createElement(Cr, null)), Be.createElement("p", { className: "DocSearch-Title" }, i2, ' "', Be.createElement("strong", null, r2.state.query), '"'), p2 && p2.length > 0 && Be.createElement("div", { className: "DocSearch-NoResults-Prefill-List" }, Be.createElement("p", { className: "DocSearch-Help" }, a2, ":"), Be.createElement("ul", null, p2.slice(0, 3).reduce(function(e3, t3) {
    return [].concat(Tr(e3), [Be.createElement("li", { key: t3 }, Be.createElement("button", { className: "DocSearch-Prefill", key: t3, type: "button", onClick: function() {
      r2.setQuery(t3.toLowerCase() + " "), r2.refresh(), r2.inputRef.current.focus();
    } }, t3))]);
  }, []))), r2.getMissingResultsUrl && Be.createElement("p", { className: "DocSearch-Help" }, "".concat(l2, " "), Be.createElement("a", { href: r2.getMissingResultsUrl({ query: r2.state.query }), target: "_blank", rel: "noopener noreferrer" }, f2)));
}
var Mr = ["hit", "attribute", "tagName"];
function Hr(e2, t2) {
  var n2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e2);
    t2 && (r2 = r2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), n2.push.apply(n2, r2);
  }
  return n2;
}
function Ur(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var n2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? Hr(Object(n2), true).forEach(function(t3) {
      Fr(e2, t3, n2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(n2)) : Hr(Object(n2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(n2, t3));
    });
  }
  return e2;
}
function Fr(e2, t2, n2) {
  return t2 in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
}
function Br(e2, t2) {
  if (null == e2)
    return {};
  var n2, r2, o2 = function(e3, t3) {
    if (null == e3)
      return {};
    var n3, r3, o3 = {}, i3 = Object.keys(e3);
    for (r3 = 0; r3 < i3.length; r3++)
      n3 = i3[r3], t3.indexOf(n3) >= 0 || (o3[n3] = e3[n3]);
    return o3;
  }(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var i2 = Object.getOwnPropertySymbols(e2);
    for (r2 = 0; r2 < i2.length; r2++)
      n2 = i2[r2], t2.indexOf(n2) >= 0 || Object.prototype.propertyIsEnumerable.call(e2, n2) && (o2[n2] = e2[n2]);
  }
  return o2;
}
function Vr(e2, t2) {
  return t2.split(".").reduce(function(e3, t3) {
    return null != e3 && e3[t3] ? e3[t3] : null;
  }, e2);
}
function Wr(e2) {
  var t2 = e2.hit, n2 = e2.attribute, r2 = e2.tagName;
  return _(void 0 === r2 ? "span" : r2, Ur(Ur({}, Br(e2, Mr)), {}, { dangerouslySetInnerHTML: { __html: Vr(t2, "_snippetResult.".concat(n2, ".value")) || Vr(t2, n2) } }));
}
function Kr(e2, t2) {
  return function(e3) {
    if (Array.isArray(e3))
      return e3;
  }(e2) || function(e3, t3) {
    var n2 = null == e3 ? null : "undefined" != typeof Symbol && e3[Symbol.iterator] || e3["@@iterator"];
    if (null == n2)
      return;
    var r2, o2, i2 = [], c2 = true, a2 = false;
    try {
      for (n2 = n2.call(e3); !(c2 = (r2 = n2.next()).done) && (i2.push(r2.value), !t3 || i2.length !== t3); c2 = true)
        ;
    } catch (e4) {
      a2 = true, o2 = e4;
    } finally {
      try {
        c2 || null == n2.return || n2.return();
      } finally {
        if (a2)
          throw o2;
      }
    }
    return i2;
  }(e2, t2) || function(e3, t3) {
    if (!e3)
      return;
    if ("string" == typeof e3)
      return zr(e3, t3);
    var n2 = Object.prototype.toString.call(e3).slice(8, -1);
    "Object" === n2 && e3.constructor && (n2 = e3.constructor.name);
    if ("Map" === n2 || "Set" === n2)
      return Array.from(e3);
    if ("Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
      return zr(e3, t3);
  }(e2, t2) || function() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function zr(e2, t2) {
  (null == t2 || t2 > e2.length) && (t2 = e2.length);
  for (var n2 = 0, r2 = new Array(t2); n2 < t2; n2++)
    r2[n2] = e2[n2];
  return r2;
}
function Jr() {
  return Jr = Object.assign || function(e2) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var n2 = arguments[t2];
      for (var r2 in n2)
        Object.prototype.hasOwnProperty.call(n2, r2) && (e2[r2] = n2[r2]);
    }
    return e2;
  }, Jr.apply(this, arguments);
}
function $r(e2) {
  return e2.collection && 0 !== e2.collection.items.length ? Be.createElement("section", { className: "DocSearch-Hits" }, Be.createElement("div", { className: "DocSearch-Hit-source" }, e2.title), Be.createElement("ul", e2.getListProps(), e2.collection.items.map(function(t2, n2) {
    return Be.createElement(Qr, Jr({ key: [e2.title, t2.objectID].join(":"), item: t2, index: n2 }, e2));
  }))) : null;
}
function Qr(e2) {
  var t2 = e2.item, n2 = e2.index, r2 = e2.renderIcon, o2 = e2.renderAction, i2 = e2.getItemProps, c2 = e2.onItemClick, a2 = e2.collection, u2 = e2.hitComponent, l2 = Kr(Be.useState(false), 2), s2 = l2[0], f2 = l2[1], p2 = Kr(Be.useState(false), 2), m2 = p2[0], v2 = p2[1], d2 = Be.useRef(null), h2 = u2;
  return Be.createElement("li", Jr({ className: ["DocSearch-Hit", t2.__docsearch_parent && "DocSearch-Hit--Child", s2 && "DocSearch-Hit--deleting", m2 && "DocSearch-Hit--favoriting"].filter(Boolean).join(" "), onTransitionEnd: function() {
    d2.current && d2.current();
  } }, i2({ item: t2, source: a2.source, onClick: function(e3) {
    c2(t2, e3);
  } })), Be.createElement(h2, { hit: t2 }, Be.createElement("div", { className: "DocSearch-Hit-Container" }, r2({ item: t2, index: n2 }), t2.hierarchy[t2.type] && "lvl1" === t2.type && Be.createElement("div", { className: "DocSearch-Hit-content-wrapper" }, Be.createElement(Wr, { className: "DocSearch-Hit-title", hit: t2, attribute: "hierarchy.lvl1" }), t2.content && Be.createElement(Wr, { className: "DocSearch-Hit-path", hit: t2, attribute: "content" })), t2.hierarchy[t2.type] && ("lvl2" === t2.type || "lvl3" === t2.type || "lvl4" === t2.type || "lvl5" === t2.type || "lvl6" === t2.type) && Be.createElement("div", { className: "DocSearch-Hit-content-wrapper" }, Be.createElement(Wr, { className: "DocSearch-Hit-title", hit: t2, attribute: "hierarchy.".concat(t2.type) }), Be.createElement(Wr, { className: "DocSearch-Hit-path", hit: t2, attribute: "hierarchy.lvl1" })), "content" === t2.type && Be.createElement("div", { className: "DocSearch-Hit-content-wrapper" }, Be.createElement(Wr, { className: "DocSearch-Hit-title", hit: t2, attribute: "content" }), Be.createElement(Wr, { className: "DocSearch-Hit-path", hit: t2, attribute: "hierarchy.lvl1" })), o2({ item: t2, runDeleteTransition: function(e3) {
    f2(true), d2.current = e3;
  }, runFavoriteTransition: function(e3) {
    v2(true), d2.current = e3;
  } }))));
}
function Zr(e2, t2, n2) {
  return e2.reduce(function(e3, r2) {
    var o2 = t2(r2);
    return e3.hasOwnProperty(o2) || (e3[o2] = []), e3[o2].length < (n2 || 5) && e3[o2].push(r2), e3;
  }, {});
}
function Yr(e2) {
  return e2;
}
function Gr(e2) {
  return 1 === e2.button || e2.altKey || e2.ctrlKey || e2.metaKey || e2.shiftKey;
}
function Xr() {
}
var eo = /(<mark>|<\/mark>)/g, to = RegExp(eo.source);
function no(e2) {
  var t2, n2, r2 = e2;
  if (!r2.__docsearch_parent && !e2._highlightResult)
    return e2.hierarchy.lvl0;
  var o2 = ((r2.__docsearch_parent ? null === (t2 = r2.__docsearch_parent) || void 0 === t2 || null === (t2 = t2._highlightResult) || void 0 === t2 || null === (t2 = t2.hierarchy) || void 0 === t2 ? void 0 : t2.lvl0 : null === (n2 = e2._highlightResult) || void 0 === n2 || null === (n2 = n2.hierarchy) || void 0 === n2 ? void 0 : n2.lvl0) || {}).value;
  return o2 && to.test(o2) ? o2.replace(eo, "") : o2;
}
function ro() {
  return ro = Object.assign || function(e2) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var n2 = arguments[t2];
      for (var r2 in n2)
        Object.prototype.hasOwnProperty.call(n2, r2) && (e2[r2] = n2[r2]);
    }
    return e2;
  }, ro.apply(this, arguments);
}
function oo(e2) {
  return Be.createElement("div", { className: "DocSearch-Dropdown-Container" }, e2.state.collections.map(function(t2) {
    if (0 === t2.items.length)
      return null;
    var n2 = no(t2.items[0]);
    return Be.createElement($r, ro({}, e2, { key: t2.source.sourceId, title: n2, collection: t2, renderIcon: function(e3) {
      var n3, r2 = e3.item, o2 = e3.index;
      return Be.createElement(Be.Fragment, null, r2.__docsearch_parent && Be.createElement("svg", { className: "DocSearch-Hit-Tree", viewBox: "0 0 24 54" }, Be.createElement("g", { stroke: "currentColor", fill: "none", fillRule: "evenodd", strokeLinecap: "round", strokeLinejoin: "round" }, r2.__docsearch_parent !== (null === (n3 = t2.items[o2 + 1]) || void 0 === n3 ? void 0 : n3.__docsearch_parent) ? Be.createElement("path", { d: "M8 6v21M20 27H8.3" }) : Be.createElement("path", { d: "M8 6v42M20 27H8.3" }))), Be.createElement("div", { className: "DocSearch-Hit-icon" }, Be.createElement(Pr, { type: r2.type })));
    }, renderAction: function() {
      return Be.createElement("div", { className: "DocSearch-Hit-action" }, Be.createElement(jr, null));
    } }));
  }), e2.resultsFooterComponent && Be.createElement("section", { className: "DocSearch-HitsFooter" }, Be.createElement(e2.resultsFooterComponent, { state: e2.state })));
}
var io = ["translations"];
function co() {
  return co = Object.assign || function(e2) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var n2 = arguments[t2];
      for (var r2 in n2)
        Object.prototype.hasOwnProperty.call(n2, r2) && (e2[r2] = n2[r2]);
    }
    return e2;
  }, co.apply(this, arguments);
}
function ao(e2, t2) {
  if (null == e2)
    return {};
  var n2, r2, o2 = function(e3, t3) {
    if (null == e3)
      return {};
    var n3, r3, o3 = {}, i3 = Object.keys(e3);
    for (r3 = 0; r3 < i3.length; r3++)
      n3 = i3[r3], t3.indexOf(n3) >= 0 || (o3[n3] = e3[n3]);
    return o3;
  }(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var i2 = Object.getOwnPropertySymbols(e2);
    for (r2 = 0; r2 < i2.length; r2++)
      n2 = i2[r2], t2.indexOf(n2) >= 0 || Object.prototype.propertyIsEnumerable.call(e2, n2) && (o2[n2] = e2[n2]);
  }
  return o2;
}
function uo(e2) {
  var t2 = e2.translations, n2 = void 0 === t2 ? {} : t2, r2 = ao(e2, io), o2 = n2.recentSearchesTitle, i2 = void 0 === o2 ? "Recent" : o2, c2 = n2.noRecentSearchesText, a2 = void 0 === c2 ? "No recent searches" : c2, u2 = n2.saveRecentSearchButtonTitle, l2 = void 0 === u2 ? "Save this search" : u2, s2 = n2.removeRecentSearchButtonTitle, f2 = void 0 === s2 ? "Remove this search from history" : s2, p2 = n2.favoriteSearchesTitle, m2 = void 0 === p2 ? "Favorite" : p2, v2 = n2.removeFavoriteSearchButtonTitle, d2 = void 0 === v2 ? "Remove this search from favorites" : v2;
  return "idle" === r2.state.status && false === r2.hasCollections ? r2.disableUserPersonalization ? null : Be.createElement("div", { className: "DocSearch-StartScreen" }, Be.createElement("p", { className: "DocSearch-Help" }, a2)) : false === r2.hasCollections ? null : Be.createElement("div", { className: "DocSearch-Dropdown-Container" }, Be.createElement($r, co({}, r2, { title: i2, collection: r2.state.collections[0], renderIcon: function() {
    return Be.createElement("div", { className: "DocSearch-Hit-icon" }, Be.createElement(Sr, null));
  }, renderAction: function(e3) {
    var t3 = e3.item, n3 = e3.runFavoriteTransition, o3 = e3.runDeleteTransition;
    return Be.createElement(Be.Fragment, null, Be.createElement("div", { className: "DocSearch-Hit-action" }, Be.createElement("button", { className: "DocSearch-Hit-action-button", title: l2, type: "submit", onClick: function(e4) {
      e4.preventDefault(), e4.stopPropagation(), n3(function() {
        r2.favoriteSearches.add(t3), r2.recentSearches.remove(t3), r2.refresh();
      });
    } }, Be.createElement(kr, null))), Be.createElement("div", { className: "DocSearch-Hit-action" }, Be.createElement("button", { className: "DocSearch-Hit-action-button", title: f2, type: "submit", onClick: function(e4) {
      e4.preventDefault(), e4.stopPropagation(), o3(function() {
        r2.recentSearches.remove(t3), r2.refresh();
      });
    } }, Be.createElement(wr, null))));
  } })), Be.createElement($r, co({}, r2, { title: m2, collection: r2.state.collections[1], renderIcon: function() {
    return Be.createElement("div", { className: "DocSearch-Hit-icon" }, Be.createElement(kr, null));
  }, renderAction: function(e3) {
    var t3 = e3.item, n3 = e3.runDeleteTransition;
    return Be.createElement("div", { className: "DocSearch-Hit-action" }, Be.createElement("button", { className: "DocSearch-Hit-action-button", title: d2, type: "submit", onClick: function(e4) {
      e4.preventDefault(), e4.stopPropagation(), n3(function() {
        r2.favoriteSearches.remove(t3), r2.refresh();
      });
    } }, Be.createElement(wr, null)));
  } })));
}
var lo = ["translations"];
function so() {
  return so = Object.assign || function(e2) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var n2 = arguments[t2];
      for (var r2 in n2)
        Object.prototype.hasOwnProperty.call(n2, r2) && (e2[r2] = n2[r2]);
    }
    return e2;
  }, so.apply(this, arguments);
}
function fo(e2, t2) {
  if (null == e2)
    return {};
  var n2, r2, o2 = function(e3, t3) {
    if (null == e3)
      return {};
    var n3, r3, o3 = {}, i3 = Object.keys(e3);
    for (r3 = 0; r3 < i3.length; r3++)
      n3 = i3[r3], t3.indexOf(n3) >= 0 || (o3[n3] = e3[n3]);
    return o3;
  }(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var i2 = Object.getOwnPropertySymbols(e2);
    for (r2 = 0; r2 < i2.length; r2++)
      n2 = i2[r2], t2.indexOf(n2) >= 0 || Object.prototype.propertyIsEnumerable.call(e2, n2) && (o2[n2] = e2[n2]);
  }
  return o2;
}
var po = Be.memo(function(e2) {
  var t2 = e2.translations, n2 = void 0 === t2 ? {} : t2, r2 = fo(e2, lo);
  if ("error" === r2.state.status)
    return Be.createElement(Nr, { translations: null == n2 ? void 0 : n2.errorScreen });
  var o2 = r2.state.collections.some(function(e3) {
    return e3.items.length > 0;
  });
  return r2.state.query ? false === o2 ? Be.createElement(Lr, so({}, r2, { translations: null == n2 ? void 0 : n2.noResultsScreen })) : Be.createElement(oo, r2) : Be.createElement(uo, so({}, r2, { hasCollections: o2, translations: null == n2 ? void 0 : n2.startScreen }));
}, function(e2, t2) {
  return "loading" === t2.state.status || "stalled" === t2.state.status;
}), mo = ["translations"];
function vo() {
  return vo = Object.assign || function(e2) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var n2 = arguments[t2];
      for (var r2 in n2)
        Object.prototype.hasOwnProperty.call(n2, r2) && (e2[r2] = n2[r2]);
    }
    return e2;
  }, vo.apply(this, arguments);
}
function ho(e2, t2) {
  if (null == e2)
    return {};
  var n2, r2, o2 = function(e3, t3) {
    if (null == e3)
      return {};
    var n3, r3, o3 = {}, i3 = Object.keys(e3);
    for (r3 = 0; r3 < i3.length; r3++)
      n3 = i3[r3], t3.indexOf(n3) >= 0 || (o3[n3] = e3[n3]);
    return o3;
  }(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var i2 = Object.getOwnPropertySymbols(e2);
    for (r2 = 0; r2 < i2.length; r2++)
      n2 = i2[r2], t2.indexOf(n2) >= 0 || Object.prototype.propertyIsEnumerable.call(e2, n2) && (o2[n2] = e2[n2]);
  }
  return o2;
}
function yo(e2) {
  var t2 = e2.translations, n2 = void 0 === t2 ? {} : t2, r2 = ho(e2, mo), o2 = n2.resetButtonTitle, i2 = void 0 === o2 ? "Clear the query" : o2, c2 = n2.resetButtonAriaLabel, a2 = void 0 === c2 ? "Clear the query" : c2, u2 = n2.cancelButtonText, l2 = void 0 === u2 ? "Cancel" : u2, s2 = n2.cancelButtonAriaLabel, f2 = void 0 === s2 ? "Cancel" : s2, p2 = r2.getFormProps({ inputElement: r2.inputRef.current }).onReset;
  return Be.useEffect(function() {
    r2.autoFocus && r2.inputRef.current && r2.inputRef.current.focus();
  }, [r2.autoFocus, r2.inputRef]), Be.useEffect(function() {
    r2.isFromSelection && r2.inputRef.current && r2.inputRef.current.select();
  }, [r2.isFromSelection, r2.inputRef]), Be.createElement(Be.Fragment, null, Be.createElement("form", { className: "DocSearch-Form", onSubmit: function(e3) {
    e3.preventDefault();
  }, onReset: p2 }, Be.createElement("label", vo({ className: "DocSearch-MagnifierLabel" }, r2.getLabelProps()), Be.createElement(We, null)), Be.createElement("div", { className: "DocSearch-LoadingIndicator" }, Be.createElement(Or, null)), Be.createElement("input", vo({ className: "DocSearch-Input", ref: r2.inputRef }, r2.getInputProps({ inputElement: r2.inputRef.current, autoFocus: r2.autoFocus, maxLength: 64 }))), Be.createElement("button", { type: "reset", title: i2, className: "DocSearch-Reset", "aria-label": a2, hidden: !r2.state.query }, Be.createElement(wr, null))), Be.createElement("button", { className: "DocSearch-Cancel", type: "reset", "aria-label": f2, onClick: r2.onClose }, l2));
}
var bo = ["_highlightResult", "_snippetResult"];
function go(e2, t2) {
  if (null == e2)
    return {};
  var n2, r2, o2 = function(e3, t3) {
    if (null == e3)
      return {};
    var n3, r3, o3 = {}, i3 = Object.keys(e3);
    for (r3 = 0; r3 < i3.length; r3++)
      n3 = i3[r3], t3.indexOf(n3) >= 0 || (o3[n3] = e3[n3]);
    return o3;
  }(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var i2 = Object.getOwnPropertySymbols(e2);
    for (r2 = 0; r2 < i2.length; r2++)
      n2 = i2[r2], t2.indexOf(n2) >= 0 || Object.prototype.propertyIsEnumerable.call(e2, n2) && (o2[n2] = e2[n2]);
  }
  return o2;
}
function _o(e2) {
  return false === function() {
    var e3 = "__TEST_KEY__";
    try {
      return localStorage.setItem(e3, ""), localStorage.removeItem(e3), true;
    } catch (e4) {
      return false;
    }
  }() ? { setItem: function() {
  }, getItem: function() {
    return [];
  } } : { setItem: function(t2) {
    return window.localStorage.setItem(e2, JSON.stringify(t2));
  }, getItem: function() {
    var t2 = window.localStorage.getItem(e2);
    return t2 ? JSON.parse(t2) : [];
  } };
}
function Oo(e2) {
  var t2 = e2.key, n2 = e2.limit, r2 = void 0 === n2 ? 5 : n2, o2 = _o(t2), i2 = o2.getItem().slice(0, r2);
  return { add: function(e3) {
    var t3 = e3, n3 = (t3._highlightResult, t3._snippetResult, go(t3, bo)), c2 = i2.findIndex(function(e4) {
      return e4.objectID === n3.objectID;
    });
    c2 > -1 && i2.splice(c2, 1), i2.unshift(n3), i2 = i2.slice(0, r2), o2.setItem(i2);
  }, remove: function(e3) {
    i2 = i2.filter(function(t3) {
      return t3.objectID !== e3.objectID;
    }), o2.setItem(i2);
  }, getAll: function() {
    return i2;
  } };
}
var So = ["facetName", "facetQuery"];
function wo(e2) {
  var t2, n2 = "algoliasearch-client-js-".concat(e2.key), r2 = function() {
    return void 0 === t2 && (t2 = e2.localStorage || window.localStorage), t2;
  }, o2 = function() {
    return JSON.parse(r2().getItem(n2) || "{}");
  }, i2 = function(e3) {
    r2().setItem(n2, JSON.stringify(e3));
  }, a2 = function() {
    var t3 = e2.timeToLive ? 1e3 * e2.timeToLive : null, n3 = o2(), r3 = Object.fromEntries(Object.entries(n3).filter(function(e3) {
      return void 0 !== c(e3, 2)[1].timestamp;
    }));
    if (i2(r3), t3) {
      var a3 = Object.fromEntries(Object.entries(r3).filter(function(e3) {
        var n4 = c(e3, 2)[1], r4 = (/* @__PURE__ */ new Date()).getTime();
        return !(n4.timestamp + t3 < r4);
      }));
      i2(a3);
    }
  };
  return { get: function(e3, t3) {
    var n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
      return Promise.resolve();
    } };
    return Promise.resolve().then(function() {
      a2();
      var t4 = JSON.stringify(e3);
      return o2()[t4];
    }).then(function(e4) {
      return Promise.all([e4 ? e4.value : t3(), void 0 !== e4]);
    }).then(function(e4) {
      var t4 = c(e4, 2), r3 = t4[0], o3 = t4[1];
      return Promise.all([r3, o3 || n3.miss(r3)]);
    }).then(function(e4) {
      return c(e4, 1)[0];
    });
  }, set: function(e3, t3) {
    return Promise.resolve().then(function() {
      var i3 = o2();
      return i3[JSON.stringify(e3)] = { timestamp: (/* @__PURE__ */ new Date()).getTime(), value: t3 }, r2().setItem(n2, JSON.stringify(i3)), t3;
    });
  }, delete: function(e3) {
    return Promise.resolve().then(function() {
      var t3 = o2();
      delete t3[JSON.stringify(e3)], r2().setItem(n2, JSON.stringify(t3));
    });
  }, clear: function() {
    return Promise.resolve().then(function() {
      r2().removeItem(n2);
    });
  } };
}
function jo(e2) {
  var t2 = a(e2.caches), n2 = t2.shift();
  return void 0 === n2 ? { get: function(e3, t3) {
    var n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
      return Promise.resolve();
    } };
    return t3().then(function(e4) {
      return Promise.all([e4, n3.miss(e4)]);
    }).then(function(e4) {
      return c(e4, 1)[0];
    });
  }, set: function(e3, t3) {
    return Promise.resolve(t3);
  }, delete: function(e3) {
    return Promise.resolve();
  }, clear: function() {
    return Promise.resolve();
  } } : { get: function(e3, r2) {
    var o2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
      return Promise.resolve();
    } };
    return n2.get(e3, r2, o2).catch(function() {
      return jo({ caches: t2 }).get(e3, r2, o2);
    });
  }, set: function(e3, r2) {
    return n2.set(e3, r2).catch(function() {
      return jo({ caches: t2 }).set(e3, r2);
    });
  }, delete: function(e3) {
    return n2.delete(e3).catch(function() {
      return jo({ caches: t2 }).delete(e3);
    });
  }, clear: function() {
    return n2.clear().catch(function() {
      return jo({ caches: t2 }).clear();
    });
  } };
}
function Eo() {
  var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { serializable: true }, t2 = {};
  return { get: function(n2, r2) {
    var o2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
      return Promise.resolve();
    } }, i2 = JSON.stringify(n2);
    if (i2 in t2)
      return Promise.resolve(e2.serializable ? JSON.parse(t2[i2]) : t2[i2]);
    var c2 = r2(), a2 = o2 && o2.miss || function() {
      return Promise.resolve();
    };
    return c2.then(function(e3) {
      return a2(e3);
    }).then(function() {
      return c2;
    });
  }, set: function(n2, r2) {
    return t2[JSON.stringify(n2)] = e2.serializable ? JSON.stringify(r2) : r2, Promise.resolve(r2);
  }, delete: function(e3) {
    return delete t2[JSON.stringify(e3)], Promise.resolve();
  }, clear: function() {
    return t2 = {}, Promise.resolve();
  } };
}
function Po(e2) {
  for (var t2 = e2.length - 1; t2 > 0; t2--) {
    var n2 = Math.floor(Math.random() * (t2 + 1)), r2 = e2[t2];
    e2[t2] = e2[n2], e2[n2] = r2;
  }
  return e2;
}
function Io(e2, t2) {
  return t2 ? (Object.keys(t2).forEach(function(n2) {
    e2[n2] = t2[n2](e2);
  }), e2) : e2;
}
function Do(e2) {
  for (var t2 = arguments.length, n2 = new Array(t2 > 1 ? t2 - 1 : 0), r2 = 1; r2 < t2; r2++)
    n2[r2 - 1] = arguments[r2];
  var o2 = 0;
  return e2.replace(/%s/g, function() {
    return encodeURIComponent(n2[o2++]);
  });
}
var ko = { WithinQueryParameters: 0, WithinHeaders: 1 };
function Ao(e2, t2) {
  var n2 = e2 || {}, r2 = n2.data || {};
  return Object.keys(n2).forEach(function(e3) {
    -1 === ["timeout", "headers", "queryParameters", "data", "cacheable"].indexOf(e3) && (r2[e3] = n2[e3]);
  }), { data: Object.entries(r2).length > 0 ? r2 : void 0, timeout: n2.timeout || t2, headers: n2.headers || {}, queryParameters: n2.queryParameters || {}, cacheable: n2.cacheable };
}
var Co = { Read: 1, Write: 2, Any: 3 }, No = 1, xo = 2, To = 3;
function Ro(e2) {
  var n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : No;
  return t(t({}, e2), {}, { status: n2, lastUpdate: Date.now() });
}
function qo(e2) {
  return "string" == typeof e2 ? { protocol: "https", url: e2, accept: Co.Any } : { protocol: e2.protocol || "https", url: e2.url, accept: e2.accept || Co.Any };
}
var Lo = "GET", Mo = "POST";
function Ho(e2, t2) {
  return Promise.all(t2.map(function(t3) {
    return e2.get(t3, function() {
      return Promise.resolve(Ro(t3));
    });
  })).then(function(e3) {
    var n2 = e3.filter(function(e4) {
      return function(e5) {
        return e5.status === No || Date.now() - e5.lastUpdate > 12e4;
      }(e4);
    }), r2 = e3.filter(function(e4) {
      return function(e5) {
        return e5.status === To && Date.now() - e5.lastUpdate <= 12e4;
      }(e4);
    }), o2 = [].concat(a(n2), a(r2));
    return { getTimeout: function(e4, t3) {
      return (0 === r2.length && 0 === e4 ? 1 : r2.length + 3 + e4) * t3;
    }, statelessHosts: o2.length > 0 ? o2.map(function(e4) {
      return qo(e4);
    }) : t2 };
  });
}
function Uo(e2, n2, r2, o2) {
  var i2 = [], c2 = function(e3, n3) {
    if (e3.method === Lo || void 0 === e3.data && void 0 === n3.data)
      return;
    var r3 = Array.isArray(e3.data) ? e3.data : t(t({}, e3.data), n3.data);
    return JSON.stringify(r3);
  }(r2, o2), u2 = function(e3, n3) {
    var r3 = t(t({}, e3.headers), n3.headers), o3 = {};
    return Object.keys(r3).forEach(function(e4) {
      var t2 = r3[e4];
      o3[e4.toLowerCase()] = t2;
    }), o3;
  }(e2, o2), l2 = r2.method, s2 = r2.method !== Lo ? {} : t(t({}, r2.data), o2.data), f2 = t(t(t({ "x-algolia-agent": e2.userAgent.value }, e2.queryParameters), s2), o2.queryParameters), p2 = 0, m2 = function t2(n3, a2) {
    var s3 = n3.pop();
    if (void 0 === s3)
      throw { name: "RetryError", message: "Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.", transporterStackTrace: Wo(i2) };
    var m3 = { data: c2, headers: u2, method: l2, url: Bo(s3, r2.path, f2), connectTimeout: a2(p2, e2.timeouts.connect), responseTimeout: a2(p2, o2.timeout) }, v2 = function(e3) {
      var t3 = { request: m3, response: e3, host: s3, triesLeft: n3.length };
      return i2.push(t3), t3;
    }, d2 = { onSuccess: function(e3) {
      return function(e4) {
        try {
          return JSON.parse(e4.content);
        } catch (t3) {
          throw function(e5, t4) {
            return { name: "DeserializationError", message: e5, response: t4 };
          }(t3.message, e4);
        }
      }(e3);
    }, onRetry: function(r3) {
      var o3 = v2(r3);
      return r3.isTimedOut && p2++, Promise.all([e2.logger.info("Retryable failure", Ko(o3)), e2.hostsCache.set(s3, Ro(s3, r3.isTimedOut ? To : xo))]).then(function() {
        return t2(n3, a2);
      });
    }, onFail: function(e3) {
      throw v2(e3), function(e4, t3) {
        var n4 = e4.content, r3 = e4.status, o3 = n4;
        try {
          o3 = JSON.parse(n4).message;
        } catch (e5) {
        }
        return function(e5, t4, n5) {
          return { name: "ApiError", message: e5, status: t4, transporterStackTrace: n5 };
        }(o3, r3, t3);
      }(e3, Wo(i2));
    } };
    return e2.requester.send(m3).then(function(e3) {
      return function(e4, t3) {
        return function(e5) {
          var t4 = e5.status;
          return e5.isTimedOut || function(e6) {
            var t5 = e6.isTimedOut, n4 = e6.status;
            return !t5 && 0 == ~~n4;
          }(e5) || 2 != ~~(t4 / 100) && 4 != ~~(t4 / 100);
        }(e4) ? t3.onRetry(e4) : 2 == ~~(e4.status / 100) ? t3.onSuccess(e4) : t3.onFail(e4);
      }(e3, d2);
    });
  };
  return Ho(e2.hostsCache, n2).then(function(e3) {
    return m2(a(e3.statelessHosts).reverse(), e3.getTimeout);
  });
}
function Fo(e2) {
  var t2 = { value: "Algolia for JavaScript (".concat(e2, ")"), add: function(e3) {
    var n2 = "; ".concat(e3.segment).concat(void 0 !== e3.version ? " (".concat(e3.version, ")") : "");
    return -1 === t2.value.indexOf(n2) && (t2.value = "".concat(t2.value).concat(n2)), t2;
  } };
  return t2;
}
function Bo(e2, t2, n2) {
  var r2 = Vo(n2), o2 = "".concat(e2.protocol, "://").concat(e2.url, "/").concat("/" === t2.charAt(0) ? t2.substr(1) : t2);
  return r2.length && (o2 += "?".concat(r2)), o2;
}
function Vo(e2) {
  return Object.keys(e2).map(function(t2) {
    return Do("%s=%s", t2, (n2 = e2[t2], "[object Object]" === Object.prototype.toString.call(n2) || "[object Array]" === Object.prototype.toString.call(n2) ? JSON.stringify(e2[t2]) : e2[t2]));
    var n2;
  }).join("&");
}
function Wo(e2) {
  return e2.map(function(e3) {
    return Ko(e3);
  });
}
function Ko(e2) {
  var n2 = e2.request.headers["x-algolia-api-key"] ? { "x-algolia-api-key": "*****" } : {};
  return t(t({}, e2), {}, { request: t(t({}, e2.request), {}, { headers: t(t({}, e2.request.headers), n2) }) });
}
var zo = function(e2) {
  var n2 = e2.appId, r2 = function(e3, t2, n3) {
    var r3 = { "x-algolia-api-key": n3, "x-algolia-application-id": t2 };
    return { headers: function() {
      return e3 === ko.WithinHeaders ? r3 : {};
    }, queryParameters: function() {
      return e3 === ko.WithinQueryParameters ? r3 : {};
    } };
  }(void 0 !== e2.authMode ? e2.authMode : ko.WithinHeaders, n2, e2.apiKey), o2 = function(e3) {
    var t2 = e3.hostsCache, n3 = e3.logger, r3 = e3.requester, o3 = e3.requestsCache, i3 = e3.responsesCache, a2 = e3.timeouts, u2 = e3.userAgent, l2 = e3.hosts, s2 = e3.queryParameters, f2 = { hostsCache: t2, logger: n3, requester: r3, requestsCache: o3, responsesCache: i3, timeouts: a2, userAgent: u2, headers: e3.headers, queryParameters: s2, hosts: l2.map(function(e4) {
      return qo(e4);
    }), read: function(e4, t3) {
      var n4 = Ao(t3, f2.timeouts.read), r4 = function() {
        return Uo(f2, f2.hosts.filter(function(e5) {
          return 0 != (e5.accept & Co.Read);
        }), e4, n4);
      };
      if (true !== (void 0 !== n4.cacheable ? n4.cacheable : e4.cacheable))
        return r4();
      var o4 = { request: e4, mappedRequestOptions: n4, transporter: { queryParameters: f2.queryParameters, headers: f2.headers } };
      return f2.responsesCache.get(o4, function() {
        return f2.requestsCache.get(o4, function() {
          return f2.requestsCache.set(o4, r4()).then(function(e5) {
            return Promise.all([f2.requestsCache.delete(o4), e5]);
          }, function(e5) {
            return Promise.all([f2.requestsCache.delete(o4), Promise.reject(e5)]);
          }).then(function(e5) {
            var t4 = c(e5, 2);
            return t4[0], t4[1];
          });
        });
      }, { miss: function(e5) {
        return f2.responsesCache.set(o4, e5);
      } });
    }, write: function(e4, t3) {
      return Uo(f2, f2.hosts.filter(function(e5) {
        return 0 != (e5.accept & Co.Write);
      }), e4, Ao(t3, f2.timeouts.write));
    } };
    return f2;
  }(t(t({ hosts: [{ url: "".concat(n2, "-dsn.algolia.net"), accept: Co.Read }, { url: "".concat(n2, ".algolia.net"), accept: Co.Write }].concat(Po([{ url: "".concat(n2, "-1.algolianet.com") }, { url: "".concat(n2, "-2.algolianet.com") }, { url: "".concat(n2, "-3.algolianet.com") }])) }, e2), {}, { headers: t(t(t({}, r2.headers()), { "content-type": "application/x-www-form-urlencoded" }), e2.headers), queryParameters: t(t({}, r2.queryParameters()), e2.queryParameters) })), i2 = { transporter: o2, appId: n2, addAlgoliaAgent: function(e3, t2) {
    o2.userAgent.add({ segment: e3, version: t2 });
  }, clearCache: function() {
    return Promise.all([o2.requestsCache.clear(), o2.responsesCache.clear()]).then(function() {
    });
  } };
  return Io(i2, e2.methods);
}, Jo = function(e2) {
  return function(t2, n2) {
    return t2.method === Lo ? e2.transporter.read(t2, n2) : e2.transporter.write(t2, n2);
  };
}, $o = function(e2) {
  return function(t2) {
    var n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = { transporter: e2.transporter, appId: e2.appId, indexName: t2 };
    return Io(r2, n2.methods);
  };
}, Qo = function(e2) {
  return function(n2, r2) {
    var o2 = n2.map(function(e3) {
      return t(t({}, e3), {}, { params: Vo(e3.params || {}) });
    });
    return e2.transporter.read({ method: Mo, path: "1/indexes/*/queries", data: { requests: o2 }, cacheable: true }, r2);
  };
}, Zo = function(e2) {
  return function(n2, r2) {
    return Promise.all(n2.map(function(n3) {
      var o2 = n3.params, c2 = o2.facetName, a2 = o2.facetQuery, u2 = i(o2, So);
      return $o(e2)(n3.indexName, { methods: { searchForFacetValues: Xo } }).searchForFacetValues(c2, a2, t(t({}, r2), u2));
    }));
  };
}, Yo = function(e2) {
  return function(t2, n2, r2) {
    return e2.transporter.read({ method: Mo, path: Do("1/answers/%s/prediction", e2.indexName), data: { query: t2, queryLanguages: n2 }, cacheable: true }, r2);
  };
}, Go = function(e2) {
  return function(t2, n2) {
    return e2.transporter.read({ method: Mo, path: Do("1/indexes/%s/query", e2.indexName), data: { query: t2 }, cacheable: true }, n2);
  };
}, Xo = function(e2) {
  return function(t2, n2, r2) {
    return e2.transporter.read({ method: Mo, path: Do("1/indexes/%s/facets/%s/query", e2.indexName, t2), data: { facetQuery: n2 }, cacheable: true }, r2);
  };
}, ei = 1, ti = 2, ni = 3;
function ri(e2, n2, r2) {
  var o2, i2 = { appId: e2, apiKey: n2, timeouts: { connect: 1, read: 2, write: 30 }, requester: { send: function(e3) {
    return new Promise(function(t2) {
      var n3 = new XMLHttpRequest();
      n3.open(e3.method, e3.url, true), Object.keys(e3.headers).forEach(function(t3) {
        return n3.setRequestHeader(t3, e3.headers[t3]);
      });
      var r3, o3 = function(e4, r4) {
        return setTimeout(function() {
          n3.abort(), t2({ status: 0, content: r4, isTimedOut: true });
        }, 1e3 * e4);
      }, i3 = o3(e3.connectTimeout, "Connection timeout");
      n3.onreadystatechange = function() {
        n3.readyState > n3.OPENED && void 0 === r3 && (clearTimeout(i3), r3 = o3(e3.responseTimeout, "Socket timeout"));
      }, n3.onerror = function() {
        0 === n3.status && (clearTimeout(i3), clearTimeout(r3), t2({ content: n3.responseText || "Network request failed", status: n3.status, isTimedOut: false }));
      }, n3.onload = function() {
        clearTimeout(i3), clearTimeout(r3), t2({ content: n3.responseText, status: n3.status, isTimedOut: false });
      }, n3.send(e3.data);
    });
  } }, logger: (o2 = ni, { debug: function(e3, t2) {
    return ei >= o2 && console.debug(e3, t2), Promise.resolve();
  }, info: function(e3, t2) {
    return ti >= o2 && console.info(e3, t2), Promise.resolve();
  }, error: function(e3, t2) {
    return console.error(e3, t2), Promise.resolve();
  } }), responsesCache: Eo(), requestsCache: Eo({ serializable: false }), hostsCache: jo({ caches: [wo({ key: "".concat("4.19.1", "-").concat(e2) }), Eo()] }), userAgent: Fo("4.19.1").add({ segment: "Browser", version: "lite" }), authMode: ko.WithinQueryParameters };
  return zo(t(t(t({}, i2), r2), {}, { methods: { search: Qo, searchForFacetValues: Zo, multipleQueries: Qo, multipleSearchForFacetValues: Zo, customRequest: Jo, initIndex: function(e3) {
    return function(t2) {
      return $o(e3)(t2, { methods: { search: Go, searchForFacetValues: Xo, findAnswers: Yo } });
    };
  } } }));
}
ri.version = "4.19.1";
var oi = ["footer", "searchBox"];
function ii() {
  return ii = Object.assign || function(e2) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var n2 = arguments[t2];
      for (var r2 in n2)
        Object.prototype.hasOwnProperty.call(n2, r2) && (e2[r2] = n2[r2]);
    }
    return e2;
  }, ii.apply(this, arguments);
}
function ci(e2, t2) {
  var n2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e2);
    t2 && (r2 = r2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), n2.push.apply(n2, r2);
  }
  return n2;
}
function ai(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var n2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? ci(Object(n2), true).forEach(function(t3) {
      ui(e2, t3, n2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(n2)) : ci(Object(n2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(n2, t3));
    });
  }
  return e2;
}
function ui(e2, t2, n2) {
  return t2 in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
}
function li(e2, t2) {
  return function(e3) {
    if (Array.isArray(e3))
      return e3;
  }(e2) || function(e3, t3) {
    var n2 = null == e3 ? null : "undefined" != typeof Symbol && e3[Symbol.iterator] || e3["@@iterator"];
    if (null == n2)
      return;
    var r2, o2, i2 = [], c2 = true, a2 = false;
    try {
      for (n2 = n2.call(e3); !(c2 = (r2 = n2.next()).done) && (i2.push(r2.value), !t3 || i2.length !== t3); c2 = true)
        ;
    } catch (e4) {
      a2 = true, o2 = e4;
    } finally {
      try {
        c2 || null == n2.return || n2.return();
      } finally {
        if (a2)
          throw o2;
      }
    }
    return i2;
  }(e2, t2) || function(e3, t3) {
    if (!e3)
      return;
    if ("string" == typeof e3)
      return si(e3, t3);
    var n2 = Object.prototype.toString.call(e3).slice(8, -1);
    "Object" === n2 && e3.constructor && (n2 = e3.constructor.name);
    if ("Map" === n2 || "Set" === n2)
      return Array.from(e3);
    if ("Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
      return si(e3, t3);
  }(e2, t2) || function() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function si(e2, t2) {
  (null == t2 || t2 > e2.length) && (t2 = e2.length);
  for (var n2 = 0, r2 = new Array(t2); n2 < t2; n2++)
    r2[n2] = e2[n2];
  return r2;
}
function fi(e2, t2) {
  if (null == e2)
    return {};
  var n2, r2, o2 = function(e3, t3) {
    if (null == e3)
      return {};
    var n3, r3, o3 = {}, i3 = Object.keys(e3);
    for (r3 = 0; r3 < i3.length; r3++)
      n3 = i3[r3], t3.indexOf(n3) >= 0 || (o3[n3] = e3[n3]);
    return o3;
  }(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var i2 = Object.getOwnPropertySymbols(e2);
    for (r2 = 0; r2 < i2.length; r2++)
      n2 = i2[r2], t2.indexOf(n2) >= 0 || Object.prototype.propertyIsEnumerable.call(e2, n2) && (o2[n2] = e2[n2]);
  }
  return o2;
}
function pi(e2) {
  var t2 = e2.appId, n2 = e2.apiKey, r2 = e2.indexName, o2 = e2.placeholder, i2 = void 0 === o2 ? "Search docs" : o2, c2 = e2.searchParameters, a2 = e2.maxResultsPerGroup, u2 = e2.onClose, l2 = void 0 === u2 ? Xr : u2, s2 = e2.transformItems, f2 = void 0 === s2 ? Yr : s2, p2 = e2.hitComponent, m2 = void 0 === p2 ? _r : p2, v2 = e2.resultsFooterComponent, d2 = void 0 === v2 ? function() {
    return null;
  } : v2, h2 = e2.navigator, y2 = e2.initialScrollY, b2 = void 0 === y2 ? 0 : y2, g2 = e2.transformSearchClient, _2 = void 0 === g2 ? Yr : g2, O2 = e2.disableUserPersonalization, S2 = void 0 !== O2 && O2, w2 = e2.initialQuery, j2 = void 0 === w2 ? "" : w2, E2 = e2.translations, P2 = void 0 === E2 ? {} : E2, I2 = e2.getMissingResultsUrl, D2 = e2.insights, k2 = void 0 !== D2 && D2, A2 = P2.footer, C2 = P2.searchBox, N2 = fi(P2, oi), x2 = li(Be.useState({ query: "", collections: [], completion: null, context: {}, isOpen: false, activeItemId: null, status: "idle" }), 2), T2 = x2[0], R2 = x2[1], q2 = Be.useRef(null), L2 = Be.useRef(null), M2 = Be.useRef(null), H2 = Be.useRef(null), U2 = Be.useRef(null), F2 = Be.useRef(10), B2 = Be.useRef("undefined" != typeof window ? window.getSelection().toString().slice(0, 64) : "").current, V2 = Be.useRef(j2 || B2).current, W2 = function(e3, t3, n3) {
    return Be.useMemo(function() {
      var r3 = ri(e3, t3);
      return r3.addAlgoliaAgent("docsearch", "3.5.2"), false === /docsearch.js \(.*\)/.test(r3.transporter.userAgent.value) && r3.addAlgoliaAgent("docsearch-react", "3.5.2"), n3(r3);
    }, [e3, t3, n3]);
  }(t2, n2, _2), K2 = Be.useRef(Oo({ key: "__DOCSEARCH_FAVORITE_SEARCHES__".concat(r2), limit: 10 })).current, z2 = Be.useRef(Oo({ key: "__DOCSEARCH_RECENT_SEARCHES__".concat(r2), limit: 0 === K2.getAll().length ? 7 : 4 })).current, J2 = Be.useCallback(function(e3) {
    if (!S2) {
      var t3 = "content" === e3.type ? e3.__docsearch_parent : e3;
      t3 && -1 === K2.getAll().findIndex(function(e4) {
        return e4.objectID === t3.objectID;
      }) && z2.add(t3);
    }
  }, [K2, z2, S2]), $2 = Be.useCallback(function(e3) {
    if (T2.context.algoliaInsightsPlugin && e3.__autocomplete_id) {
      var t3 = e3, n3 = { eventName: "Item Selected", index: t3.__autocomplete_indexName, items: [t3], positions: [e3.__autocomplete_id], queryID: t3.__autocomplete_queryID };
      T2.context.algoliaInsightsPlugin.insights.clickedObjectIDsAfterSearch(n3);
    }
  }, [T2.context.algoliaInsightsPlugin]), Q2 = Be.useMemo(function() {
    return hr({ id: "docsearch", defaultActiveItemId: 0, placeholder: i2, openOnFocus: true, initialState: { query: V2, context: { searchSuggestions: [] } }, insights: k2, navigator: h2, onStateChange: function(e3) {
      R2(e3.state);
    }, getSources: function(e3) {
      var o3 = e3.query, i3 = e3.state, u3 = e3.setContext, s3 = e3.setStatus;
      if (!o3)
        return S2 ? [] : [{ sourceId: "recentSearches", onSelect: function(e4) {
          var t3 = e4.item, n3 = e4.event;
          J2(t3), Gr(n3) || l2();
        }, getItemUrl: function(e4) {
          return e4.item.url;
        }, getItems: function() {
          return z2.getAll();
        } }, { sourceId: "favoriteSearches", onSelect: function(e4) {
          var t3 = e4.item, n3 = e4.event;
          J2(t3), Gr(n3) || l2();
        }, getItemUrl: function(e4) {
          return e4.item.url;
        }, getItems: function() {
          return K2.getAll();
        } }];
      var p3 = Boolean(k2);
      return W2.search([{ query: o3, indexName: r2, params: ai({ attributesToRetrieve: ["hierarchy.lvl0", "hierarchy.lvl1", "hierarchy.lvl2", "hierarchy.lvl3", "hierarchy.lvl4", "hierarchy.lvl5", "hierarchy.lvl6", "content", "type", "url"], attributesToSnippet: ["hierarchy.lvl1:".concat(F2.current), "hierarchy.lvl2:".concat(F2.current), "hierarchy.lvl3:".concat(F2.current), "hierarchy.lvl4:".concat(F2.current), "hierarchy.lvl5:".concat(F2.current), "hierarchy.lvl6:".concat(F2.current), "content:".concat(F2.current)], snippetEllipsisText: "…", highlightPreTag: "<mark>", highlightPostTag: "</mark>", hitsPerPage: 20, clickAnalytics: p3 }, c2) }]).catch(function(e4) {
        throw "RetryError" === e4.name && s3("error"), e4;
      }).then(function(e4) {
        var o4 = e4.results[0], c3 = o4.hits, s4 = o4.nbHits, m3 = Zr(c3, function(e5) {
          return no(e5);
        }, a2);
        i3.context.searchSuggestions.length < Object.keys(m3).length && u3({ searchSuggestions: Object.keys(m3) }), u3({ nbHits: s4 });
        var v3 = {};
        return p3 && (v3 = { __autocomplete_indexName: r2, __autocomplete_queryID: o4.queryID, __autocomplete_algoliaCredentials: { appId: t2, apiKey: n2 } }), Object.values(m3).map(function(e5, t3) {
          return { sourceId: "hits".concat(t3), onSelect: function(e6) {
            var t4 = e6.item, n3 = e6.event;
            J2(t4), Gr(n3) || l2();
          }, getItemUrl: function(e6) {
            return e6.item.url;
          }, getItems: function() {
            return Object.values(Zr(e5, function(e6) {
              return e6.hierarchy.lvl1;
            }, a2)).map(f2).map(function(e6) {
              return e6.map(function(t4) {
                var n3 = null, r3 = e6.find(function(e7) {
                  return "lvl1" === e7.type && e7.hierarchy.lvl1 === t4.hierarchy.lvl1;
                });
                return "lvl1" !== t4.type && r3 && (n3 = r3), ai(ai({}, t4), {}, { __docsearch_parent: n3 }, v3);
              });
            }).flat();
          } };
        });
      });
    } });
  }, [r2, c2, a2, W2, l2, z2, K2, J2, V2, i2, h2, f2, S2, k2, t2, n2]), Z2 = Q2.getEnvironmentProps, Y2 = Q2.getRootProps, G2 = Q2.refresh;
  return function(e3) {
    var t3 = e3.getEnvironmentProps, n3 = e3.panelElement, r3 = e3.formElement, o3 = e3.inputElement;
    Be.useEffect(function() {
      if (n3 && r3 && o3) {
        var e4 = t3({ panelElement: n3, formElement: r3, inputElement: o3 }), i3 = e4.onTouchStart, c3 = e4.onTouchMove;
        return window.addEventListener("touchstart", i3), window.addEventListener("touchmove", c3), function() {
          window.removeEventListener("touchstart", i3), window.removeEventListener("touchmove", c3);
        };
      }
    }, [t3, n3, r3, o3]);
  }({ getEnvironmentProps: Z2, panelElement: H2.current, formElement: M2.current, inputElement: U2.current }), function(e3) {
    var t3 = e3.container;
    Be.useEffect(function() {
      if (t3) {
        var e4 = t3.querySelectorAll("a[href]:not([disabled]), button:not([disabled]), input:not([disabled])"), n3 = e4[0], r3 = e4[e4.length - 1];
        return t3.addEventListener("keydown", o3), function() {
          t3.removeEventListener("keydown", o3);
        };
      }
      function o3(e5) {
        "Tab" === e5.key && (e5.shiftKey ? document.activeElement === n3 && (e5.preventDefault(), r3.focus()) : document.activeElement === r3 && (e5.preventDefault(), n3.focus()));
      }
    }, [t3]);
  }({ container: q2.current }), Be.useEffect(function() {
    return document.body.classList.add("DocSearch--active"), function() {
      var e3, t3;
      document.body.classList.remove("DocSearch--active"), null === (e3 = (t3 = window).scrollTo) || void 0 === e3 || e3.call(t3, 0, b2);
    };
  }, []), Be.useEffect(function() {
    window.matchMedia("(max-width: 768px)").matches && (F2.current = 5);
  }, []), Be.useEffect(function() {
    H2.current && (H2.current.scrollTop = 0);
  }, [T2.query]), Be.useEffect(function() {
    V2.length > 0 && (G2(), U2.current && U2.current.focus());
  }, [V2, G2]), Be.useEffect(function() {
    function e3() {
      if (L2.current) {
        var e4 = 0.01 * window.innerHeight;
        L2.current.style.setProperty("--docsearch-vh", "".concat(e4, "px"));
      }
    }
    return e3(), window.addEventListener("resize", e3), function() {
      window.removeEventListener("resize", e3);
    };
  }, []), Be.createElement("div", ii({ ref: q2 }, Y2({ "aria-expanded": true }), { className: ["DocSearch", "DocSearch-Container", "stalled" === T2.status && "DocSearch-Container--Stalled", "error" === T2.status && "DocSearch-Container--Errored"].filter(Boolean).join(" "), role: "button", tabIndex: 0, onMouseDown: function(e3) {
    e3.target === e3.currentTarget && l2();
  } }), Be.createElement("div", { className: "DocSearch-Modal", ref: L2 }, Be.createElement("header", { className: "DocSearch-SearchBar", ref: M2 }, Be.createElement(yo, ii({}, Q2, { state: T2, autoFocus: 0 === V2.length, inputRef: U2, isFromSelection: Boolean(V2) && V2 === B2, translations: C2, onClose: l2 }))), Be.createElement("div", { className: "DocSearch-Dropdown", ref: H2 }, Be.createElement(po, ii({}, Q2, { indexName: r2, state: T2, hitComponent: m2, resultsFooterComponent: d2, disableUserPersonalization: S2, recentSearches: z2, favoriteSearches: K2, inputRef: U2, translations: N2, getMissingResultsUrl: I2, onItemClick: function(e3, t3) {
    $2(e3), J2(e3), Gr(t3) || l2();
  } }))), Be.createElement("footer", { className: "DocSearch-Footer" }, Be.createElement(gr, { translations: A2 }))));
}
function mi() {
  return mi = Object.assign || function(e2) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var n2 = arguments[t2];
      for (var r2 in n2)
        Object.prototype.hasOwnProperty.call(n2, r2) && (e2[r2] = n2[r2]);
    }
    return e2;
  }, mi.apply(this, arguments);
}
function vi(e2, t2) {
  return function(e3) {
    if (Array.isArray(e3))
      return e3;
  }(e2) || function(e3, t3) {
    var n2 = null == e3 ? null : "undefined" != typeof Symbol && e3[Symbol.iterator] || e3["@@iterator"];
    if (null == n2)
      return;
    var r2, o2, i2 = [], c2 = true, a2 = false;
    try {
      for (n2 = n2.call(e3); !(c2 = (r2 = n2.next()).done) && (i2.push(r2.value), !t3 || i2.length !== t3); c2 = true)
        ;
    } catch (e4) {
      a2 = true, o2 = e4;
    } finally {
      try {
        c2 || null == n2.return || n2.return();
      } finally {
        if (a2)
          throw o2;
      }
    }
    return i2;
  }(e2, t2) || function(e3, t3) {
    if (!e3)
      return;
    if ("string" == typeof e3)
      return di(e3, t3);
    var n2 = Object.prototype.toString.call(e3).slice(8, -1);
    "Object" === n2 && e3.constructor && (n2 = e3.constructor.name);
    if ("Map" === n2 || "Set" === n2)
      return Array.from(e3);
    if ("Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
      return di(e3, t3);
  }(e2, t2) || function() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function di(e2, t2) {
  (null == t2 || t2 > e2.length) && (t2 = e2.length);
  for (var n2 = 0, r2 = new Array(t2); n2 < t2; n2++)
    r2[n2] = e2[n2];
  return r2;
}
function hi(e2) {
  var t2, n2, r2 = Be.useRef(null), o2 = vi(Be.useState(false), 2), i2 = o2[0], c2 = o2[1], a2 = vi(Be.useState((null == e2 ? void 0 : e2.initialQuery) || void 0), 2), u2 = a2[0], l2 = a2[1], s2 = Be.useCallback(function() {
    c2(true);
  }, [c2]), f2 = Be.useCallback(function() {
    c2(false);
  }, [c2]);
  return function(e3) {
    var t3 = e3.isOpen, n3 = e3.onOpen, r3 = e3.onClose, o3 = e3.onInput, i3 = e3.searchButtonRef;
    Be.useEffect(function() {
      function e4(e5) {
        var c3;
        (27 === e5.keyCode && t3 || "k" === (null === (c3 = e5.key) || void 0 === c3 ? void 0 : c3.toLowerCase()) && (e5.metaKey || e5.ctrlKey) || !function(e6) {
          var t4 = e6.target, n4 = t4.tagName;
          return t4.isContentEditable || "INPUT" === n4 || "SELECT" === n4 || "TEXTAREA" === n4;
        }(e5) && "/" === e5.key && !t3) && (e5.preventDefault(), t3 ? r3() : document.body.classList.contains("DocSearch--active") || document.body.classList.contains("DocSearch--active") || n3()), i3 && i3.current === document.activeElement && o3 && /[a-zA-Z0-9]/.test(String.fromCharCode(e5.keyCode)) && o3(e5);
      }
      return window.addEventListener("keydown", e4), function() {
        window.removeEventListener("keydown", e4);
      };
    }, [t3, n3, r3, o3, i3]);
  }({ isOpen: i2, onOpen: s2, onClose: f2, onInput: Be.useCallback(function(e3) {
    c2(true), l2(e3.key);
  }, [c2, l2]), searchButtonRef: r2 }), Be.createElement(Be.Fragment, null, Be.createElement(Ze, { ref: r2, translations: null == e2 || null === (t2 = e2.translations) || void 0 === t2 ? void 0 : t2.button, onClick: s2 }), i2 && Ie(Be.createElement(pi, mi({}, e2, { initialScrollY: window.scrollY, initialQuery: u2, translations: null == e2 || null === (n2 = e2.translations) || void 0 === n2 ? void 0 : n2.modal, onClose: f2 })), document.body));
}
function yi(e2) {
  Ce(Be.createElement(hi, o({}, e2, { transformSearchClient: function(t2) {
    return t2.addAlgoliaAgent("docsearch.js", "3.5.2"), e2.transformSearchClient ? e2.transformSearchClient(t2) : t2;
  } })), function(e3) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window;
    return "string" == typeof e3 ? t2.document.querySelector(e3) : e3;
  }(e2.container, e2.environment));
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VPAlgoliaSearchBox",
  __ssrInlineRender: true,
  props: {
    algolia: {}
  },
  setup(__props) {
    const props = __props;
    const router = useRouter();
    const route = useRoute();
    const { site, localeIndex, lang } = useData();
    onMounted(update);
    watch(localeIndex, update);
    function update() {
      var _a, _b;
      const options = {
        ...props.algolia,
        ...(_a = props.algolia.locales) == null ? void 0 : _a[localeIndex.value]
      };
      const rawFacetFilters = ((_b = options.searchParameters) == null ? void 0 : _b.facetFilters) ?? [];
      const facetFilters = [
        ...(Array.isArray(rawFacetFilters) ? rawFacetFilters : [rawFacetFilters]).filter((f2) => !f2.startsWith("lang:")),
        `lang:${lang.value}`
      ];
      initialize({
        ...options,
        searchParameters: {
          ...options.searchParameters,
          facetFilters
        }
      });
    }
    function initialize(userOptions) {
      const options = Object.assign({}, userOptions, {
        container: "#docsearch",
        navigator: {
          navigate({ itemUrl }) {
            const { pathname: hitPathname } = new URL(
              window.location.origin + itemUrl
            );
            if (route.path === hitPathname) {
              window.location.assign(window.location.origin + itemUrl);
            } else {
              router.go(itemUrl);
            }
          }
        },
        transformItems(items) {
          return items.map((item) => {
            return Object.assign({}, item, {
              url: getRelativePath(item.url)
            });
          });
        },
        // @ts-expect-error vue-tsc thinks this should return Vue JSX but it returns the required React one
        hitComponent({ hit, children }) {
          return {
            __v: null,
            type: "a",
            ref: void 0,
            constructor: void 0,
            key: void 0,
            props: { href: hit.url, children }
          };
        }
      });
      yi(options);
    }
    function getRelativePath(absoluteUrl) {
      const { pathname, hash } = new URL(absoluteUrl);
      return pathname.replace(
        /\.html$/,
        site.value.cleanUrls ? "" : ".html"
      ) + hash;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "docsearch" }, _attrs))}></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/vitepress@1.0.0-beta.6_@algolia+client-search@4.19.1_@types+node@20.5.7_less@4.2.0_qrcode@1.5.3_search-insights@2.8.1/node_modules/vitepress/dist/client/theme-default/components/VPAlgoliaSearchBox.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
