import "./chunk-EQCVQC35.js";

// node_modules/.pnpm/seemly@0.3.9/node_modules/seemly/es/animation/next-frame-once.js
var onceCbs = [];
var paramsMap = /* @__PURE__ */ new WeakMap();
function flushOnceCallbacks() {
  onceCbs.forEach((cb) => cb(...paramsMap.get(cb)));
  onceCbs = [];
}
function beforeNextFrameOnce(cb, ...params2) {
  paramsMap.set(cb, params2);
  if (onceCbs.includes(cb))
    return;
  onceCbs.push(cb) === 1 && requestAnimationFrame(flushOnceCallbacks);
}

// node_modules/.pnpm/seemly@0.3.9/node_modules/seemly/es/animation/next-frame.js
var cbs = [];
var params = [];
function flushCallbacks() {
  cbs.forEach((cb, i) => cb(...params[i]));
  cbs = [];
  params = [];
}
function beforeNextFrame(cb, ...args) {
  cbs.push(cb) === 1 && requestAnimationFrame(flushCallbacks);
  params.push(args);
}

// node_modules/.pnpm/seemly@0.3.9/node_modules/seemly/es/dom/get-scroll-parent.js
function getParentNode(node) {
  if (node.nodeType === 9) {
    return null;
  }
  return node.parentNode;
}
function getScrollParent(node) {
  if (node === null)
    return null;
  const parentNode = getParentNode(node);
  if (parentNode === null) {
    return null;
  }
  if (parentNode.nodeType === 9) {
    return document.documentElement;
  }
  if (parentNode.nodeType === 1) {
    const { overflow, overflowX, overflowY } = getComputedStyle(parentNode);
    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return parentNode;
    }
  }
  return getScrollParent(parentNode);
}

// node_modules/.pnpm/seemly@0.3.9/node_modules/seemly/es/dom/unwrap-element.js
function unwrapElement(target) {
  if (typeof target === "string")
    return document.querySelector(target);
  if (typeof target === "function")
    return target();
  return target;
}

// node_modules/.pnpm/seemly@0.3.9/node_modules/seemly/es/dom/happens-in.js
function happensIn(e, dataSetPropName) {
  let { target } = e;
  while (target) {
    if (target.dataset) {
      if (target.dataset[dataSetPropName] !== void 0)
        return true;
    }
    target = target.parentElement;
  }
  return false;
}

// node_modules/.pnpm/seemly@0.3.9/node_modules/seemly/es/dom/get-precise-event-target.js
function getPreciseEventTarget(event) {
  return event.composedPath()[0] || null;
}

// node_modules/.pnpm/seemly@0.3.9/node_modules/seemly/es/css/responsive.js
function parseResponsiveProp(reponsiveProp) {
  if (typeof reponsiveProp === "number") {
    return {
      "": reponsiveProp.toString()
    };
  }
  const params2 = {};
  reponsiveProp.split(/ +/).forEach((pairLiteral) => {
    if (pairLiteral === "")
      return;
    const [prefix2, value] = pairLiteral.split(":");
    if (value === void 0) {
      params2[""] = prefix2;
    } else {
      params2[prefix2] = value;
    }
  });
  return params2;
}
function parseResponsivePropValue(reponsiveProp, activeKeyOrSize) {
  var _a;
  if (reponsiveProp === void 0 || reponsiveProp === null)
    return void 0;
  const classObj = parseResponsiveProp(reponsiveProp);
  if (activeKeyOrSize === void 0)
    return classObj[""];
  if (typeof activeKeyOrSize === "string") {
    return (_a = classObj[activeKeyOrSize]) !== null && _a !== void 0 ? _a : classObj[""];
  } else if (Array.isArray(activeKeyOrSize)) {
    for (let i = activeKeyOrSize.length - 1; i >= 0; --i) {
      const key = activeKeyOrSize[i];
      if (key in classObj)
        return classObj[key];
    }
    return classObj[""];
  } else {
    let activeValue = void 0;
    let activeKey = -1;
    Object.keys(classObj).forEach((key) => {
      const keyAsNum = Number(key);
      if (!Number.isNaN(keyAsNum) && activeKeyOrSize >= keyAsNum && keyAsNum >= activeKey) {
        activeKey = keyAsNum;
        activeValue = classObj[key];
      }
    });
    return activeValue;
  }
}

// node_modules/.pnpm/seemly@0.3.9/node_modules/seemly/es/css/index.js
function depx(value) {
  if (typeof value === "string") {
    if (value.endsWith("px")) {
      return Number(value.slice(0, value.length - 2));
    }
    return Number(value);
  }
  return value;
}
function pxfy(value) {
  if (value === void 0 || value === null)
    return void 0;
  if (typeof value === "number")
    return `${value}px`;
  if (value.endsWith("px"))
    return value;
  return `${value}px`;
}
function getMargin(value, position) {
  const parts = value.trim().split(/\s+/g);
  const margin = {
    top: parts[0]
  };
  switch (parts.length) {
    case 1:
      margin.right = parts[0];
      margin.bottom = parts[0];
      margin.left = parts[0];
      break;
    case 2:
      margin.right = parts[1];
      margin.left = parts[1];
      margin.bottom = parts[0];
      break;
    case 3:
      margin.right = parts[1];
      margin.bottom = parts[2];
      margin.left = parts[1];
      break;
    case 4:
      margin.right = parts[1];
      margin.bottom = parts[2];
      margin.left = parts[3];
      break;
    default:
      throw new Error("[seemly/getMargin]:" + value + " is not a valid value.");
  }
  if (position === void 0)
    return margin;
  return margin[position];
}
function getGap(value, orient) {
  const [rowGap, colGap] = value.split(" ");
  if (!orient)
    return {
      row: rowGap,
      col: colGap || rowGap
    };
  return orient === "row" ? rowGap : colGap;
}

// node_modules/.pnpm/seemly@0.3.9/node_modules/seemly/es/color/colors.js
var colors_default = {
  black: "#000",
  silver: "#C0C0C0",
  gray: "#808080",
  white: "#FFF",
  maroon: "#800000",
  red: "#F00",
  purple: "#800080",
  fuchsia: "#F0F",
  green: "#008000",
  lime: "#0F0",
  olive: "#808000",
  yellow: "#FF0",
  navy: "#000080",
  blue: "#00F",
  teal: "#008080",
  aqua: "#0FF",
  transparent: "#0000"
};

// node_modules/.pnpm/seemly@0.3.9/node_modules/seemly/es/color/convert.js
function hsl2hsv(h, s, l) {
  s /= 100;
  l /= 100;
  const v = s * Math.min(l, 1 - l) + l;
  return [h, v ? (2 - 2 * l / v) * 100 : 0, v * 100];
}
function hsv2hsl(h, s, v) {
  s /= 100;
  v /= 100;
  const l = v - v * s / 2;
  const m = Math.min(l, 1 - l);
  return [h, m ? (v - l) / m * 100 : 0, l * 100];
}
function hsv2rgb(h, s, v) {
  s /= 100;
  v /= 100;
  let f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  return [f(5) * 255, f(3) * 255, f(1) * 255];
}
function rgb2hsv(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  let v = Math.max(r, g, b), c = v - Math.min(r, g, b);
  let h = c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
  return [60 * (h < 0 ? h + 6 : h), v && c / v * 100, v * 100];
}
function rgb2hsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  let v = Math.max(r, g, b), c = v - Math.min(r, g, b), f = 1 - Math.abs(v + v - c - 1);
  let h = c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
  return [60 * (h < 0 ? h + 6 : h), f ? c / f * 100 : 0, (v + v - c) * 50];
}
function hsl2rgb(h, s, l) {
  s /= 100;
  l /= 100;
  let a = s * Math.min(l, 1 - l);
  let f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return [f(0) * 255, f(8) * 255, f(4) * 255];
}

// node_modules/.pnpm/seemly@0.3.9/node_modules/seemly/es/color/index.js
var prefix = "^\\s*";
var suffix = "\\s*$";
var percent = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))%\\s*";
var float = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*";
var hex = "([0-9A-Fa-f])";
var dhex = "([0-9A-Fa-f]{2})";
var hslRegex = new RegExp(`${prefix}hsl\\s*\\(${float},${percent},${percent}\\)${suffix}`);
var hsvRegex = new RegExp(`${prefix}hsv\\s*\\(${float},${percent},${percent}\\)${suffix}`);
var hslaRegex = new RegExp(`${prefix}hsla\\s*\\(${float},${percent},${percent},${float}\\)${suffix}`);
var hsvaRegex = new RegExp(`${prefix}hsva\\s*\\(${float},${percent},${percent},${float}\\)${suffix}`);
var rgbRegex = new RegExp(`${prefix}rgb\\s*\\(${float},${float},${float}\\)${suffix}`);
var rgbaRegex = new RegExp(`${prefix}rgba\\s*\\(${float},${float},${float},${float}\\)${suffix}`);
var sHexRegex = new RegExp(`${prefix}#${hex}${hex}${hex}${suffix}`);
var hexRegex = new RegExp(`${prefix}#${dhex}${dhex}${dhex}${suffix}`);
var sHexaRegex = new RegExp(`${prefix}#${hex}${hex}${hex}${hex}${suffix}`);
var hexaRegex = new RegExp(`${prefix}#${dhex}${dhex}${dhex}${dhex}${suffix}`);
function parseHex(value) {
  return parseInt(value, 16);
}
function hsla(color) {
  try {
    let i;
    if (i = hslaRegex.exec(color)) {
      return [
        roundDeg(i[1]),
        roundPercent(i[5]),
        roundPercent(i[9]),
        roundAlpha(i[13])
      ];
    } else if (i = hslRegex.exec(color)) {
      return [roundDeg(i[1]), roundPercent(i[5]), roundPercent(i[9]), 1];
    }
    throw new Error(`[seemly/hsla]: Invalid color value ${color}.`);
  } catch (e) {
    throw e;
  }
}
function hsva(color) {
  try {
    let i;
    if (i = hsvaRegex.exec(color)) {
      return [
        roundDeg(i[1]),
        roundPercent(i[5]),
        roundPercent(i[9]),
        roundAlpha(i[13])
      ];
    } else if (i = hsvRegex.exec(color)) {
      return [roundDeg(i[1]), roundPercent(i[5]), roundPercent(i[9]), 1];
    }
    throw new Error(`[seemly/hsva]: Invalid color value ${color}.`);
  } catch (e) {
    throw e;
  }
}
function rgba(color) {
  try {
    let i;
    if (i = hexRegex.exec(color)) {
      return [parseHex(i[1]), parseHex(i[2]), parseHex(i[3]), 1];
    } else if (i = rgbRegex.exec(color)) {
      return [roundChannel(i[1]), roundChannel(i[5]), roundChannel(i[9]), 1];
    } else if (i = rgbaRegex.exec(color)) {
      return [
        roundChannel(i[1]),
        roundChannel(i[5]),
        roundChannel(i[9]),
        roundAlpha(i[13])
      ];
    } else if (i = sHexRegex.exec(color)) {
      return [
        parseHex(i[1] + i[1]),
        parseHex(i[2] + i[2]),
        parseHex(i[3] + i[3]),
        1
      ];
    } else if (i = hexaRegex.exec(color)) {
      return [
        parseHex(i[1]),
        parseHex(i[2]),
        parseHex(i[3]),
        roundAlpha(parseHex(i[4]) / 255)
      ];
    } else if (i = sHexaRegex.exec(color)) {
      return [
        parseHex(i[1] + i[1]),
        parseHex(i[2] + i[2]),
        parseHex(i[3] + i[3]),
        roundAlpha(parseHex(i[4] + i[4]) / 255)
      ];
    } else if (color in colors_default) {
      return rgba(colors_default[color]);
    }
    throw new Error(`[seemly/rgba]: Invalid color value ${color}.`);
  } catch (e) {
    throw e;
  }
}
function normalizeAlpha(alphaValue) {
  return alphaValue > 1 ? 1 : alphaValue < 0 ? 0 : alphaValue;
}
function stringifyRgb(r, g, b) {
  return `rgb(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)})`;
}
function stringifyRgba(r, g, b, a) {
  return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, ${normalizeAlpha(a)})`;
}
function compositeChannel(v1, a1, v2, a2, a) {
  return roundChannel((v1 * a1 * (1 - a2) + v2 * a2) / a);
}
function composite(background, overlay) {
  if (!Array.isArray(background))
    background = rgba(background);
  if (!Array.isArray(overlay))
    overlay = rgba(overlay);
  const a1 = background[3];
  const a2 = overlay[3];
  const alpha = roundAlpha(a1 + a2 - a1 * a2);
  return stringifyRgba(compositeChannel(background[0], a1, overlay[0], a2, alpha), compositeChannel(background[1], a1, overlay[1], a2, alpha), compositeChannel(background[2], a1, overlay[2], a2, alpha), alpha);
}
function changeColor(base, options) {
  const [r, g, b, a = 1] = Array.isArray(base) ? base : rgba(base);
  if (options.alpha) {
    return stringifyRgba(r, g, b, options.alpha);
  }
  return stringifyRgba(r, g, b, a);
}
function scaleColor(base, options) {
  const [r, g, b, a = 1] = Array.isArray(base) ? base : rgba(base);
  const { lightness = 1, alpha = 1 } = options;
  return toRgbaString([r * lightness, g * lightness, b * lightness, a * alpha]);
}
function getAlpha(base) {
  var _a;
  const alpha = (_a = (Array.isArray(base) ? base : rgba(base))[3]) !== null && _a !== void 0 ? _a : 1;
  return alpha;
}
function getAlphaString(base) {
  return `${getAlpha(base)}`;
}
function roundAlpha(value) {
  const v = Math.round(Number(value) * 100) / 100;
  if (v > 1)
    return 1;
  if (v < 0)
    return 0;
  return v;
}
function roundDeg(value) {
  const v = Math.round(Number(value));
  if (v >= 360)
    return 0;
  if (v < 0)
    return 0;
  return v;
}
function roundChannel(value) {
  const v = Math.round(Number(value));
  if (v > 255)
    return 255;
  if (v < 0)
    return 0;
  return v;
}
function roundPercent(value) {
  const v = Math.round(Number(value));
  if (v > 100)
    return 100;
  if (v < 0)
    return 0;
  return v;
}
function toRgbString(base) {
  const [r, g, b] = Array.isArray(base) ? base : rgba(base);
  return stringifyRgb(r, g, b);
}
function toRgbaString(base) {
  const [r, g, b] = base;
  if (3 in base) {
    return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, ${roundAlpha(base[3])})`;
  }
  return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, 1)`;
}
function toHsvString(base) {
  return `hsv(${roundDeg(base[0])}, ${roundPercent(base[1])}%, ${roundPercent(base[2])}%)`;
}
function toHsvaString(base) {
  const [h, s, v] = base;
  if (3 in base) {
    return `hsva(${roundDeg(h)}, ${roundPercent(s)}%, ${roundPercent(v)}%, ${roundAlpha(base[3])})`;
  }
  return `hsva(${roundDeg(h)}, ${roundPercent(s)}%, ${roundPercent(v)}%, 1)`;
}
function toHslString(base) {
  return `hsl(${roundDeg(base[0])}, ${roundPercent(base[1])}%, ${roundPercent(base[2])}%)`;
}
function toHslaString(base) {
  const [h, s, l] = base;
  if (3 in base) {
    return `hsla(${roundDeg(h)}, ${roundPercent(s)}%, ${roundPercent(l)}%, ${roundAlpha(base[3])})`;
  }
  return `hsla(${roundDeg(h)}, ${roundPercent(s)}%, ${roundPercent(l)}%, 1)`;
}
function toHexaString(base) {
  if (typeof base === "string") {
    let i;
    if (i = hexRegex.exec(base)) {
      return `${i[0]}FF`;
    } else if (i = hexaRegex.exec(base)) {
      return i[0];
    } else if (i = sHexRegex.exec(base)) {
      return `#${i[1]}${i[1]}${i[2]}${i[2]}${i[3]}${i[3]}FF`;
    } else if (i = sHexaRegex.exec(base)) {
      return `#${i[1]}${i[1]}${i[2]}${i[2]}${i[3]}${i[3]}${i[4]}${i[4]}`;
    }
    throw new Error(`[seemly/toHexString]: Invalid hex value ${base}.`);
  }
  const hex2 = `#${base.slice(0, 3).map((unit) => roundChannel(unit).toString(16).toUpperCase().padStart(2, "0")).join("")}`;
  const a = base.length === 3 ? "FF" : roundChannel(base[3] * 255).toString(16).padStart(2, "0").toUpperCase();
  return hex2 + a;
}
function toHexString(base) {
  if (typeof base === "string") {
    let i;
    if (i = hexRegex.exec(base)) {
      return i[0];
    } else if (i = hexaRegex.exec(base)) {
      return i[0].slice(0, 7);
    } else if (i = sHexRegex.exec(base) || sHexaRegex.exec(base)) {
      return `#${i[1]}${i[1]}${i[2]}${i[2]}${i[3]}${i[3]}`;
    }
    throw new Error(`[seemly/toHexString]: Invalid hex value ${base}.`);
  }
  return `#${base.slice(0, 3).map((unit) => roundChannel(unit).toString(16).toUpperCase().padStart(2, "0")).join("")}`;
}

// node_modules/.pnpm/seemly@0.3.9/node_modules/seemly/es/misc/index.js
function createId(length = 8) {
  return Math.random().toString(16).slice(2, 2 + length);
}
function repeat(count, v) {
  const ret = [];
  for (let i = 0; i < count; ++i) {
    ret.push(v);
  }
  return ret;
}
function indexMap(count, createValue) {
  const ret = [];
  if (!createValue) {
    for (let i = 0; i < count; ++i) {
      ret.push(i);
    }
    return ret;
  }
  for (let i = 0; i < count; ++i) {
    ret.push(createValue(i));
  }
  return ret;
}
async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
export {
  beforeNextFrame,
  beforeNextFrameOnce,
  changeColor,
  composite,
  createId,
  depx,
  getAlpha,
  getAlphaString,
  getGap,
  getMargin,
  getMargin as getPadding,
  getPreciseEventTarget,
  getScrollParent,
  happensIn,
  hsl2hsv,
  hsl2rgb,
  hsla,
  hsv2hsl,
  hsv2rgb,
  hsva,
  indexMap,
  parseResponsiveProp,
  parseResponsivePropValue,
  pxfy,
  repeat,
  rgb2hsl,
  rgb2hsv,
  rgba,
  roundAlpha,
  roundChannel,
  roundDeg,
  roundPercent,
  scaleColor,
  sleep,
  toHexString,
  toHexaString,
  toHslString,
  toHslaString,
  toHsvString,
  toHsvaString,
  toRgbString,
  toRgbaString,
  unwrapElement
};
//# sourceMappingURL=seemly.js.map
