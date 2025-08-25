import './chunk-JVWSFFO4.js'

// node_modules/.pnpm/@ctrl+tinycolor@4.1.0/node_modules/@ctrl/tinycolor/dist/module/util.js
function bound01(n, max) {
  if (isOnePointZero(n)) {
    n = '100%'
  }
  const isPercent = isPercentage(n)
  n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)))
  if (isPercent) {
    n = parseInt(String(n * max), 10) / 100
  }
  if (Math.abs(n - max) < 1e-6) {
    return 1
  }
  if (max === 360) {
    n = (n < 0 ? (n % max) + max : n % max) / parseFloat(String(max))
  } else {
    n = (n % max) / parseFloat(String(max))
  }
  return n
}
function clamp01(val) {
  return Math.min(1, Math.max(0, val))
}
function isOnePointZero(n) {
  return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1
}
function isPercentage(n) {
  return typeof n === 'string' && n.indexOf('%') !== -1
}
function boundAlpha(a) {
  a = parseFloat(a)
  if (isNaN(a) || a < 0 || a > 1) {
    a = 1
  }
  return a
}
function convertToPercentage(n) {
  if (Number(n) <= 1) {
    return `${Number(n) * 100}%`
  }
  return n
}
function pad2(c) {
  return c.length === 1 ? '0' + c : String(c)
}

// node_modules/.pnpm/@ctrl+tinycolor@4.1.0/node_modules/@ctrl/tinycolor/dist/module/conversion.js
function rgbToRgb(r, g, b) {
  return {
    r: bound01(r, 255) * 255,
    g: bound01(g, 255) * 255,
    b: bound01(b, 255) * 255
  }
}
function rgbToHsl(r, g, b) {
  r = bound01(r, 255)
  g = bound01(g, 255)
  b = bound01(b, 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  if (max === min) {
    s = 0
    h = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
      default:
        break
    }
    h /= 6
  }
  return { h, s, l }
}
function hue2rgb(p, q, t) {
  if (t < 0) {
    t += 1
  }
  if (t > 1) {
    t -= 1
  }
  if (t < 1 / 6) {
    return p + (q - p) * (6 * t)
  }
  if (t < 1 / 2) {
    return q
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6
  }
  return p
}
function hslToRgb(h, s, l) {
  let r
  let g
  let b
  h = bound01(h, 360)
  s = bound01(s, 100)
  l = bound01(l, 100)
  if (s === 0) {
    g = l
    b = l
    r = l
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  return { r: r * 255, g: g * 255, b: b * 255 }
}
function rgbToHsv(r, g, b) {
  r = bound01(r, 255)
  g = bound01(g, 255)
  b = bound01(b, 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  const v = max
  const d = max - min
  const s = max === 0 ? 0 : d / max
  if (max === min) {
    h = 0
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
      default:
        break
    }
    h /= 6
  }
  return { h, s, v }
}
function hsvToRgb(h, s, v) {
  h = bound01(h, 360) * 6
  s = bound01(s, 100)
  v = bound01(v, 100)
  const i = Math.floor(h)
  const f = h - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  const mod = i % 6
  const r = [v, q, p, p, t, v][mod]
  const g = [t, v, v, q, p, p][mod]
  const b = [p, p, t, v, v, q][mod]
  return { r: r * 255, g: g * 255, b: b * 255 }
}
function rgbToHex(r, g, b, allow3Char) {
  const hex = [pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16))]
  if (
    allow3Char &&
    hex[0].startsWith(hex[0].charAt(1)) &&
    hex[1].startsWith(hex[1].charAt(1)) &&
    hex[2].startsWith(hex[2].charAt(1))
  ) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0)
  }
  return hex.join('')
}
function rgbaToHex(r, g, b, a, allow4Char) {
  const hex = [
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16)),
    pad2(convertDecimalToHex(a))
  ]
  if (
    allow4Char &&
    hex[0].startsWith(hex[0].charAt(1)) &&
    hex[1].startsWith(hex[1].charAt(1)) &&
    hex[2].startsWith(hex[2].charAt(1)) &&
    hex[3].startsWith(hex[3].charAt(1))
  ) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0)
  }
  return hex.join('')
}
function rgbaToArgbHex(r, g, b, a) {
  const hex = [
    pad2(convertDecimalToHex(a)),
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16))
  ]
  return hex.join('')
}
function cmykToRgb(c, m, y, k) {
  const cConv = c / 100
  const mConv = m / 100
  const yConv = y / 100
  const kConv = k / 100
  const r = 255 * (1 - cConv) * (1 - kConv)
  const g = 255 * (1 - mConv) * (1 - kConv)
  const b = 255 * (1 - yConv) * (1 - kConv)
  return { r, g, b }
}
function rgbToCmyk(r, g, b) {
  let c = 1 - r / 255
  let m = 1 - g / 255
  let y = 1 - b / 255
  let k = Math.min(c, m, y)
  if (k === 1) {
    c = 0
    m = 0
    y = 0
  } else {
    c = ((c - k) / (1 - k)) * 100
    m = ((m - k) / (1 - k)) * 100
    y = ((y - k) / (1 - k)) * 100
  }
  k *= 100
  return {
    c: Math.round(c),
    m: Math.round(m),
    y: Math.round(y),
    k: Math.round(k)
  }
}
function convertDecimalToHex(d) {
  return Math.round(parseFloat(d) * 255).toString(16)
}
function convertHexToDecimal(h) {
  return parseIntFromHex(h) / 255
}
function parseIntFromHex(val) {
  return parseInt(val, 16)
}
function numberInputToObject(color) {
  return {
    r: color >> 16,
    g: (color & 65280) >> 8,
    b: color & 255
  }
}

// node_modules/.pnpm/@ctrl+tinycolor@4.1.0/node_modules/@ctrl/tinycolor/dist/module/css-color-names.js
var names = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkgrey: '#a9a9a9',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  goldenrod: '#daa520',
  gold: '#ffd700',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  grey: '#808080',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavenderblush: '#fff0f5',
  lavender: '#e6e6fa',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32'
}

// node_modules/.pnpm/@ctrl+tinycolor@4.1.0/node_modules/@ctrl/tinycolor/dist/module/format-input.js
function inputToRGB(color) {
  let rgb = { r: 0, g: 0, b: 0 }
  let a = 1
  let s = null
  let v = null
  let l = null
  let ok = false
  let format = false
  if (typeof color === 'string') {
    color = stringInputToObject(color)
  }
  if (typeof color === 'object') {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b)
      ok = true
      format = String(color.r).substr(-1) === '%' ? 'prgb' : 'rgb'
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s = convertToPercentage(color.s)
      v = convertToPercentage(color.v)
      rgb = hsvToRgb(color.h, s, v)
      ok = true
      format = 'hsv'
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
      s = convertToPercentage(color.s)
      l = convertToPercentage(color.l)
      rgb = hslToRgb(color.h, s, l)
      ok = true
      format = 'hsl'
    } else if (
      isValidCSSUnit(color.c) &&
      isValidCSSUnit(color.m) &&
      isValidCSSUnit(color.y) &&
      isValidCSSUnit(color.k)
    ) {
      rgb = cmykToRgb(color.c, color.m, color.y, color.k)
      ok = true
      format = 'cmyk'
    }
    if (Object.prototype.hasOwnProperty.call(color, 'a')) {
      a = color.a
    }
  }
  a = boundAlpha(a)
  return {
    ok,
    format: color.format || format,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    a
  }
}
var CSS_INTEGER = '[-\\+]?\\d+%?'
var CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?'
var CSS_UNIT = '(?:' + CSS_NUMBER + ')|(?:' + CSS_INTEGER + ')'
var PERMISSIVE_MATCH3 = '[\\s|\\(]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')\\s*\\)?'
var PERMISSIVE_MATCH4 =
  // eslint-disable-next-line prettier/prettier
  '[\\s|\\(]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')\\s*\\)?'
var matchers = {
  CSS_UNIT: new RegExp(CSS_UNIT),
  rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
  rgba: new RegExp('rgba' + PERMISSIVE_MATCH4),
  hsl: new RegExp('hsl' + PERMISSIVE_MATCH3),
  hsla: new RegExp('hsla' + PERMISSIVE_MATCH4),
  hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
  hsva: new RegExp('hsva' + PERMISSIVE_MATCH4),
  cmyk: new RegExp('cmyk' + PERMISSIVE_MATCH4),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
}
function stringInputToObject(color) {
  color = color.trim().toLowerCase()
  if (color.length === 0) {
    return false
  }
  let named = false
  if (names[color]) {
    color = names[color]
    named = true
  } else if (color === 'transparent') {
    return { r: 0, g: 0, b: 0, a: 0, format: 'name' }
  }
  let match = matchers.rgb.exec(color)
  if (match) {
    return { r: match[1], g: match[2], b: match[3] }
  }
  match = matchers.rgba.exec(color)
  if (match) {
    return { r: match[1], g: match[2], b: match[3], a: match[4] }
  }
  match = matchers.hsl.exec(color)
  if (match) {
    return { h: match[1], s: match[2], l: match[3] }
  }
  match = matchers.hsla.exec(color)
  if (match) {
    return { h: match[1], s: match[2], l: match[3], a: match[4] }
  }
  match = matchers.hsv.exec(color)
  if (match) {
    return { h: match[1], s: match[2], v: match[3] }
  }
  match = matchers.hsva.exec(color)
  if (match) {
    return { h: match[1], s: match[2], v: match[3], a: match[4] }
  }
  match = matchers.cmyk.exec(color)
  if (match) {
    return {
      c: match[1],
      m: match[2],
      y: match[3],
      k: match[4]
    }
  }
  match = matchers.hex8.exec(color)
  if (match) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4]),
      format: named ? 'name' : 'hex8'
    }
  }
  match = matchers.hex6.exec(color)
  if (match) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      format: named ? 'name' : 'hex'
    }
  }
  match = matchers.hex4.exec(color)
  if (match) {
    return {
      r: parseIntFromHex(match[1] + match[1]),
      g: parseIntFromHex(match[2] + match[2]),
      b: parseIntFromHex(match[3] + match[3]),
      a: convertHexToDecimal(match[4] + match[4]),
      format: named ? 'name' : 'hex8'
    }
  }
  match = matchers.hex3.exec(color)
  if (match) {
    return {
      r: parseIntFromHex(match[1] + match[1]),
      g: parseIntFromHex(match[2] + match[2]),
      b: parseIntFromHex(match[3] + match[3]),
      format: named ? 'name' : 'hex'
    }
  }
  return false
}
function isValidCSSUnit(color) {
  if (typeof color === 'number') {
    return !Number.isNaN(color)
  }
  return matchers.CSS_UNIT.test(color)
}

// node_modules/.pnpm/@ctrl+tinycolor@4.1.0/node_modules/@ctrl/tinycolor/dist/module/index.js
var TinyColor = class _TinyColor {
  constructor(color = '', opts = {}) {
    if (color instanceof _TinyColor) {
      return color
    }
    if (typeof color === 'number') {
      color = numberInputToObject(color)
    }
    this.originalInput = color
    const rgb = inputToRGB(color)
    this.originalInput = color
    this.r = rgb.r
    this.g = rgb.g
    this.b = rgb.b
    this.a = rgb.a
    this.roundA = Math.round(100 * this.a) / 100
    this.format = opts.format ?? rgb.format
    this.gradientType = opts.gradientType
    if (this.r < 1) {
      this.r = Math.round(this.r)
    }
    if (this.g < 1) {
      this.g = Math.round(this.g)
    }
    if (this.b < 1) {
      this.b = Math.round(this.b)
    }
    this.isValid = rgb.ok
  }
  isDark() {
    return this.getBrightness() < 128
  }
  isLight() {
    return !this.isDark()
  }
  /**
   * Returns the perceived brightness of the color, from 0-255.
   */
  getBrightness() {
    const rgb = this.toRgb()
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3
  }
  /**
   * Returns the perceived luminance of a color, from 0-1.
   */
  getLuminance() {
    const rgb = this.toRgb()
    let R
    let G
    let B
    const RsRGB = rgb.r / 255
    const GsRGB = rgb.g / 255
    const BsRGB = rgb.b / 255
    if (RsRGB <= 0.03928) {
      R = RsRGB / 12.92
    } else {
      R = Math.pow((RsRGB + 0.055) / 1.055, 2.4)
    }
    if (GsRGB <= 0.03928) {
      G = GsRGB / 12.92
    } else {
      G = Math.pow((GsRGB + 0.055) / 1.055, 2.4)
    }
    if (BsRGB <= 0.03928) {
      B = BsRGB / 12.92
    } else {
      B = Math.pow((BsRGB + 0.055) / 1.055, 2.4)
    }
    return 0.2126 * R + 0.7152 * G + 0.0722 * B
  }
  /**
   * Returns the alpha value of a color, from 0-1.
   */
  getAlpha() {
    return this.a
  }
  /**
   * Sets the alpha value on the current color.
   *
   * @param alpha - The new alpha value. The accepted range is 0-1.
   */
  setAlpha(alpha) {
    this.a = boundAlpha(alpha)
    this.roundA = Math.round(100 * this.a) / 100
    return this
  }
  /**
   * Returns whether the color is monochrome.
   */
  isMonochrome() {
    const { s } = this.toHsl()
    return s === 0
  }
  /**
   * Returns the object as a HSVA object.
   */
  toHsv() {
    const hsv = rgbToHsv(this.r, this.g, this.b)
    return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a }
  }
  /**
   * Returns the hsva values interpolated into a string with the following format:
   * "hsva(xxx, xxx, xxx, xx)".
   */
  toHsvString() {
    const hsv = rgbToHsv(this.r, this.g, this.b)
    const h = Math.round(hsv.h * 360)
    const s = Math.round(hsv.s * 100)
    const v = Math.round(hsv.v * 100)
    return this.a === 1 ? `hsv(${h}, ${s}%, ${v}%)` : `hsva(${h}, ${s}%, ${v}%, ${this.roundA})`
  }
  /**
   * Returns the object as a HSLA object.
   */
  toHsl() {
    const hsl = rgbToHsl(this.r, this.g, this.b)
    return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a }
  }
  /**
   * Returns the hsla values interpolated into a string with the following format:
   * "hsla(xxx, xxx, xxx, xx)".
   */
  toHslString() {
    const hsl = rgbToHsl(this.r, this.g, this.b)
    const h = Math.round(hsl.h * 360)
    const s = Math.round(hsl.s * 100)
    const l = Math.round(hsl.l * 100)
    return this.a === 1 ? `hsl(${h}, ${s}%, ${l}%)` : `hsla(${h}, ${s}%, ${l}%, ${this.roundA})`
  }
  /**
   * Returns the hex value of the color.
   * @param allow3Char will shorten hex value to 3 char if possible
   */
  toHex(allow3Char = false) {
    return rgbToHex(this.r, this.g, this.b, allow3Char)
  }
  /**
   * Returns the hex value of the color -with a # prefixed.
   * @param allow3Char will shorten hex value to 3 char if possible
   */
  toHexString(allow3Char = false) {
    return '#' + this.toHex(allow3Char)
  }
  /**
   * Returns the hex 8 value of the color.
   * @param allow4Char will shorten hex value to 4 char if possible
   */
  toHex8(allow4Char = false) {
    return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char)
  }
  /**
   * Returns the hex 8 value of the color -with a # prefixed.
   * @param allow4Char will shorten hex value to 4 char if possible
   */
  toHex8String(allow4Char = false) {
    return '#' + this.toHex8(allow4Char)
  }
  /**
   * Returns the shorter hex value of the color depends on its alpha -with a # prefixed.
   * @param allowShortChar will shorten hex value to 3 or 4 char if possible
   */
  toHexShortString(allowShortChar = false) {
    return this.a === 1 ? this.toHexString(allowShortChar) : this.toHex8String(allowShortChar)
  }
  /**
   * Returns the object as a RGBA object.
   */
  toRgb() {
    return {
      r: Math.round(this.r),
      g: Math.round(this.g),
      b: Math.round(this.b),
      a: this.a
    }
  }
  /**
   * Returns the RGBA values interpolated into a string with the following format:
   * "RGBA(xxx, xxx, xxx, xx)".
   */
  toRgbString() {
    const r = Math.round(this.r)
    const g = Math.round(this.g)
    const b = Math.round(this.b)
    return this.a === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${this.roundA})`
  }
  /**
   * Returns the object as a RGBA object.
   */
  toPercentageRgb() {
    const fmt = (x) => `${Math.round(bound01(x, 255) * 100)}%`
    return {
      r: fmt(this.r),
      g: fmt(this.g),
      b: fmt(this.b),
      a: this.a
    }
  }
  /**
   * Returns the RGBA relative values interpolated into a string
   */
  toPercentageRgbString() {
    const rnd = (x) => Math.round(bound01(x, 255) * 100)
    return this.a === 1
      ? `rgb(${rnd(this.r)}%, ${rnd(this.g)}%, ${rnd(this.b)}%)`
      : `rgba(${rnd(this.r)}%, ${rnd(this.g)}%, ${rnd(this.b)}%, ${this.roundA})`
  }
  toCmyk() {
    return {
      ...rgbToCmyk(this.r, this.g, this.b)
    }
  }
  toCmykString() {
    const { c, m, y, k } = rgbToCmyk(this.r, this.g, this.b)
    return `cmyk(${c}, ${m}, ${y}, ${k})`
  }
  /**
   * The 'real' name of the color -if there is one.
   */
  toName() {
    if (this.a === 0) {
      return 'transparent'
    }
    if (this.a < 1) {
      return false
    }
    const hex = '#' + rgbToHex(this.r, this.g, this.b, false)
    for (const [key, value] of Object.entries(names)) {
      if (hex === value) {
        return key
      }
    }
    return false
  }
  toString(format) {
    const formatSet = Boolean(format)
    format = format ?? this.format
    let formattedString = false
    const hasAlpha = this.a < 1 && this.a >= 0
    const needsAlphaFormat = !formatSet && hasAlpha && (format.startsWith('hex') || format === 'name')
    if (needsAlphaFormat) {
      if (format === 'name' && this.a === 0) {
        return this.toName()
      }
      return this.toRgbString()
    }
    if (format === 'rgb') {
      formattedString = this.toRgbString()
    }
    if (format === 'prgb') {
      formattedString = this.toPercentageRgbString()
    }
    if (format === 'hex' || format === 'hex6') {
      formattedString = this.toHexString()
    }
    if (format === 'hex3') {
      formattedString = this.toHexString(true)
    }
    if (format === 'hex4') {
      formattedString = this.toHex8String(true)
    }
    if (format === 'hex8') {
      formattedString = this.toHex8String()
    }
    if (format === 'name') {
      formattedString = this.toName()
    }
    if (format === 'hsl') {
      formattedString = this.toHslString()
    }
    if (format === 'hsv') {
      formattedString = this.toHsvString()
    }
    if (format === 'cmyk') {
      formattedString = this.toCmykString()
    }
    return formattedString || this.toHexString()
  }
  toNumber() {
    return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b)
  }
  clone() {
    return new _TinyColor(this.toString())
  }
  /**
   * Lighten the color a given amount. Providing 100 will always return white.
   * @param amount - valid between 1-100
   */
  lighten(amount = 10) {
    const hsl = this.toHsl()
    hsl.l += amount / 100
    hsl.l = clamp01(hsl.l)
    return new _TinyColor(hsl)
  }
  /**
   * Brighten the color a given amount, from 0 to 100.
   * @param amount - valid between 1-100
   */
  brighten(amount = 10) {
    const rgb = this.toRgb()
    rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))))
    rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))))
    rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))))
    return new _TinyColor(rgb)
  }
  /**
   * Darken the color a given amount, from 0 to 100.
   * Providing 100 will always return black.
   * @param amount - valid between 1-100
   */
  darken(amount = 10) {
    const hsl = this.toHsl()
    hsl.l -= amount / 100
    hsl.l = clamp01(hsl.l)
    return new _TinyColor(hsl)
  }
  /**
   * Mix the color with pure white, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return white.
   * @param amount - valid between 1-100
   */
  tint(amount = 10) {
    return this.mix('white', amount)
  }
  /**
   * Mix the color with pure black, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return black.
   * @param amount - valid between 1-100
   */
  shade(amount = 10) {
    return this.mix('black', amount)
  }
  /**
   * Desaturate the color a given amount, from 0 to 100.
   * Providing 100 will is the same as calling greyscale
   * @param amount - valid between 1-100
   */
  desaturate(amount = 10) {
    const hsl = this.toHsl()
    hsl.s -= amount / 100
    hsl.s = clamp01(hsl.s)
    return new _TinyColor(hsl)
  }
  /**
   * Saturate the color a given amount, from 0 to 100.
   * @param amount - valid between 1-100
   */
  saturate(amount = 10) {
    const hsl = this.toHsl()
    hsl.s += amount / 100
    hsl.s = clamp01(hsl.s)
    return new _TinyColor(hsl)
  }
  /**
   * Completely desaturates a color into greyscale.
   * Same as calling `desaturate(100)`
   */
  greyscale() {
    return this.desaturate(100)
  }
  /**
   * Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
   * Values outside of this range will be wrapped into this range.
   */
  spin(amount) {
    const hsl = this.toHsl()
    const hue = (hsl.h + amount) % 360
    hsl.h = hue < 0 ? 360 + hue : hue
    return new _TinyColor(hsl)
  }
  /**
   * Mix the current color a given amount with another color, from 0 to 100.
   * 0 means no mixing (return current color).
   */
  mix(color, amount = 50) {
    const rgb1 = this.toRgb()
    const rgb2 = new _TinyColor(color).toRgb()
    const p = amount / 100
    const rgba = {
      r: (rgb2.r - rgb1.r) * p + rgb1.r,
      g: (rgb2.g - rgb1.g) * p + rgb1.g,
      b: (rgb2.b - rgb1.b) * p + rgb1.b,
      a: (rgb2.a - rgb1.a) * p + rgb1.a
    }
    return new _TinyColor(rgba)
  }
  analogous(results = 6, slices = 30) {
    const hsl = this.toHsl()
    const part = 360 / slices
    const ret = [this]
    for (hsl.h = (hsl.h - ((part * results) >> 1) + 720) % 360; --results; ) {
      hsl.h = (hsl.h + part) % 360
      ret.push(new _TinyColor(hsl))
    }
    return ret
  }
  /**
   * taken from https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js
   */
  complement() {
    const hsl = this.toHsl()
    hsl.h = (hsl.h + 180) % 360
    return new _TinyColor(hsl)
  }
  monochromatic(results = 6) {
    const hsv = this.toHsv()
    const { h } = hsv
    const { s } = hsv
    let { v } = hsv
    const res = []
    const modification = 1 / results
    while (results--) {
      res.push(new _TinyColor({ h, s, v }))
      v = (v + modification) % 1
    }
    return res
  }
  splitcomplement() {
    const hsl = this.toHsl()
    const { h } = hsl
    return [
      this,
      new _TinyColor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }),
      new _TinyColor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l })
    ]
  }
  /**
   * Compute how the color would appear on a background
   */
  onBackground(background) {
    const fg = this.toRgb()
    const bg = new _TinyColor(background).toRgb()
    const alpha = fg.a + bg.a * (1 - fg.a)
    return new _TinyColor({
      r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / alpha,
      g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / alpha,
      b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / alpha,
      a: alpha
    })
  }
  /**
   * Alias for `polyad(3)`
   */
  triad() {
    return this.polyad(3)
  }
  /**
   * Alias for `polyad(4)`
   */
  tetrad() {
    return this.polyad(4)
  }
  /**
   * Get polyad colors, like (for 1, 2, 3, 4, 5, 6, 7, 8, etc...)
   * monad, dyad, triad, tetrad, pentad, hexad, heptad, octad, etc...
   */
  polyad(n) {
    const hsl = this.toHsl()
    const { h } = hsl
    const result = [this]
    const increment = 360 / n
    for (let i = 1; i < n; i++) {
      result.push(new _TinyColor({ h: (h + i * increment) % 360, s: hsl.s, l: hsl.l }))
    }
    return result
  }
  /**
   * compare color vs current color
   */
  equals(color) {
    const comparedColor = new _TinyColor(color)
    if (this.format === 'cmyk' || comparedColor.format === 'cmyk') {
      return this.toCmykString() === comparedColor.toCmykString()
    }
    return this.toRgbString() === comparedColor.toRgbString()
  }
}

// node_modules/.pnpm/@ctrl+tinycolor@4.1.0/node_modules/@ctrl/tinycolor/dist/module/readability.js
function readability(color1, color2) {
  const c1 = new TinyColor(color1)
  const c2 = new TinyColor(color2)
  return (
    (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05)
  )
}
function isReadable(color1, color2, wcag2 = { level: 'AA', size: 'small' }) {
  const readabilityLevel = readability(color1, color2)
  switch ((wcag2.level ?? 'AA') + (wcag2.size ?? 'small')) {
    case 'AAsmall':
    case 'AAAlarge':
      return readabilityLevel >= 4.5
    case 'AAlarge':
      return readabilityLevel >= 3
    case 'AAAsmall':
      return readabilityLevel >= 7
    default:
      return false
  }
}
function mostReadable(baseColor, colorList, args = { includeFallbackColors: false, level: 'AA', size: 'small' }) {
  let bestColor = null
  let bestScore = 0
  const { includeFallbackColors, level, size } = args
  for (const color of colorList) {
    const score = readability(baseColor, color)
    if (score > bestScore) {
      bestScore = score
      bestColor = new TinyColor(color)
    }
  }
  if (isReadable(baseColor, bestColor, { level, size }) || !includeFallbackColors) {
    return bestColor
  }
  args.includeFallbackColors = false
  return mostReadable(baseColor, ['#fff', '#000'], args)
}

// node_modules/.pnpm/@ctrl+tinycolor@4.1.0/node_modules/@ctrl/tinycolor/dist/module/to-ms-filter.js
function toMsFilter(firstColor, secondColor) {
  const color = new TinyColor(firstColor)
  const hex8String = '#' + rgbaToArgbHex(color.r, color.g, color.b, color.a)
  let secondHex8String = hex8String
  const gradientType = color.gradientType ? 'GradientType = 1, ' : ''
  if (secondColor) {
    const s = new TinyColor(secondColor)
    secondHex8String = '#' + rgbaToArgbHex(s.r, s.g, s.b, s.a)
  }
  return `progid:DXImageTransform.Microsoft.gradient(${gradientType}startColorstr=${hex8String},endColorstr=${secondHex8String})`
}

// node_modules/.pnpm/@ctrl+tinycolor@4.1.0/node_modules/@ctrl/tinycolor/dist/module/from-ratio.js
function fromRatio(ratio, opts) {
  const newColor = {
    r: convertToPercentage(ratio.r),
    g: convertToPercentage(ratio.g),
    b: convertToPercentage(ratio.b)
  }
  if (ratio.a !== void 0) {
    newColor.a = Number(ratio.a)
  }
  return new TinyColor(newColor, opts)
}
function legacyRandom() {
  return new TinyColor({
    r: Math.random(),
    g: Math.random(),
    b: Math.random()
  })
}

// node_modules/.pnpm/@ctrl+tinycolor@4.1.0/node_modules/@ctrl/tinycolor/dist/module/random.js
function random(options = {}) {
  if (options.count !== void 0 && options.count !== null) {
    const totalColors = options.count
    const colors = []
    options.count = void 0
    while (totalColors > colors.length) {
      options.count = null
      if (options.seed) {
        options.seed += 1
      }
      colors.push(random(options))
    }
    options.count = totalColors
    return colors
  }
  const h = pickHue(options.hue, options.seed)
  const s = pickSaturation(h, options)
  const v = pickBrightness(h, s, options)
  const res = { h, s, v }
  if (options.alpha !== void 0) {
    res.a = options.alpha
  }
  return new TinyColor(res)
}
function pickHue(hue, seed) {
  const hueRange = getHueRange(hue)
  let res = randomWithin(hueRange, seed)
  if (res < 0) {
    res = 360 + res
  }
  return res
}
function pickSaturation(hue, options) {
  if (options.hue === 'monochrome') {
    return 0
  }
  if (options.luminosity === 'random') {
    return randomWithin([0, 100], options.seed)
  }
  const { saturationRange } = getColorInfo(hue)
  let sMin = saturationRange[0]
  let sMax = saturationRange[1]
  switch (options.luminosity) {
    case 'bright':
      sMin = 55
      break
    case 'dark':
      sMin = sMax - 10
      break
    case 'light':
      sMax = 55
      break
    default:
      break
  }
  return randomWithin([sMin, sMax], options.seed)
}
function pickBrightness(H, S, options) {
  let bMin = getMinimumBrightness(H, S)
  let bMax = 100
  switch (options.luminosity) {
    case 'dark':
      bMax = bMin + 20
      break
    case 'light':
      bMin = (bMax + bMin) / 2
      break
    case 'random':
      bMin = 0
      bMax = 100
      break
    default:
      break
  }
  return randomWithin([bMin, bMax], options.seed)
}
function getMinimumBrightness(H, S) {
  const { lowerBounds } = getColorInfo(H)
  for (let i = 0; i < lowerBounds.length - 1; i++) {
    const s1 = lowerBounds[i][0]
    const v1 = lowerBounds[i][1]
    const s2 = lowerBounds[i + 1][0]
    const v2 = lowerBounds[i + 1][1]
    if (S >= s1 && S <= s2) {
      const m = (v2 - v1) / (s2 - s1)
      const b = v1 - m * s1
      return m * S + b
    }
  }
  return 0
}
function getHueRange(colorInput) {
  const num = parseInt(colorInput, 10)
  if (!Number.isNaN(num) && num < 360 && num > 0) {
    return [num, num]
  }
  if (typeof colorInput === 'string') {
    const namedColor = bounds.find((n) => n.name === colorInput)
    if (namedColor) {
      const color = defineColor(namedColor)
      if (color.hueRange) {
        return color.hueRange
      }
    }
    const parsed = new TinyColor(colorInput)
    if (parsed.isValid) {
      const hue = parsed.toHsv().h
      return [hue, hue]
    }
  }
  return [0, 360]
}
function getColorInfo(hue) {
  if (hue >= 334 && hue <= 360) {
    hue -= 360
  }
  for (const bound of bounds) {
    const color = defineColor(bound)
    if (color.hueRange && hue >= color.hueRange[0] && hue <= color.hueRange[1]) {
      return color
    }
  }
  throw Error('Color not found')
}
function randomWithin(range, seed) {
  if (seed === void 0) {
    return Math.floor(range[0] + Math.random() * (range[1] + 1 - range[0]))
  }
  const max = range[1] || 1
  const min = range[0] || 0
  seed = (seed * 9301 + 49297) % 233280
  const rnd = seed / 233280
  return Math.floor(min + rnd * (max - min))
}
function defineColor(bound) {
  const sMin = bound.lowerBounds[0][0]
  const sMax = bound.lowerBounds[bound.lowerBounds.length - 1][0]
  const bMin = bound.lowerBounds[bound.lowerBounds.length - 1][1]
  const bMax = bound.lowerBounds[0][1]
  return {
    name: bound.name,
    hueRange: bound.hueRange,
    lowerBounds: bound.lowerBounds,
    saturationRange: [sMin, sMax],
    brightnessRange: [bMin, bMax]
  }
}
var bounds = [
  {
    name: 'monochrome',
    hueRange: null,
    lowerBounds: [
      [0, 0],
      [100, 0]
    ]
  },
  {
    name: 'red',
    hueRange: [-26, 18],
    lowerBounds: [
      [20, 100],
      [30, 92],
      [40, 89],
      [50, 85],
      [60, 78],
      [70, 70],
      [80, 60],
      [90, 55],
      [100, 50]
    ]
  },
  {
    name: 'orange',
    hueRange: [19, 46],
    lowerBounds: [
      [20, 100],
      [30, 93],
      [40, 88],
      [50, 86],
      [60, 85],
      [70, 70],
      [100, 70]
    ]
  },
  {
    name: 'yellow',
    hueRange: [47, 62],
    lowerBounds: [
      [25, 100],
      [40, 94],
      [50, 89],
      [60, 86],
      [70, 84],
      [80, 82],
      [90, 80],
      [100, 75]
    ]
  },
  {
    name: 'green',
    hueRange: [63, 178],
    lowerBounds: [
      [30, 100],
      [40, 90],
      [50, 85],
      [60, 81],
      [70, 74],
      [80, 64],
      [90, 50],
      [100, 40]
    ]
  },
  {
    name: 'blue',
    hueRange: [179, 257],
    lowerBounds: [
      [20, 100],
      [30, 86],
      [40, 80],
      [50, 74],
      [60, 60],
      [70, 52],
      [80, 44],
      [90, 39],
      [100, 35]
    ]
  },
  {
    name: 'purple',
    hueRange: [258, 282],
    lowerBounds: [
      [20, 100],
      [30, 87],
      [40, 79],
      [50, 70],
      [60, 65],
      [70, 59],
      [80, 52],
      [90, 45],
      [100, 42]
    ]
  },
  {
    name: 'pink',
    hueRange: [283, 334],
    lowerBounds: [
      [20, 100],
      [30, 90],
      [40, 86],
      [60, 84],
      [80, 80],
      [90, 75],
      [100, 73]
    ]
  }
]
export {
  TinyColor,
  bounds,
  cmykToRgb,
  convertDecimalToHex,
  convertHexToDecimal,
  fromRatio,
  hslToRgb,
  hsvToRgb,
  inputToRGB,
  isReadable,
  isValidCSSUnit,
  legacyRandom,
  mostReadable,
  names,
  numberInputToObject,
  parseIntFromHex,
  random,
  readability,
  rgbToCmyk,
  rgbToHex,
  rgbToHsl,
  rgbToHsv,
  rgbToRgb,
  rgbaToArgbHex,
  rgbaToHex,
  stringInputToObject,
  toMsFilter
}
//# sourceMappingURL=@ctrl_tinycolor.js.map
