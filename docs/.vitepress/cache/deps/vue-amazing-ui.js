import {
  Fragment,
  Teleport,
  Transition,
  TransitionGroup,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createSlots,
  createStaticVNode,
  createTextVNode,
  createVNode,
  customRef,
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
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onScopeDispose,
  onUnmounted,
  onUpdated,
  openBlock,
  popScopeId,
  provide,
  pushScopeId,
  reactive,
  readonly,
  ref,
  render,
  renderList,
  renderSlot,
  resolveComponent,
  resolveDynamicComponent,
  toDisplayString,
  toRef,
  unref,
  useSlots,
  vModelDynamic,
  vModelText,
  vShow,
  watch,
  watchEffect,
  withCtx,
  withDirectives,
  withKeys,
  withModifiers
} from "./chunk-67UUJLDS.js";
import {
  __commonJS,
  __toESM
} from "./chunk-UXIASGQL.js";

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/can-promise.js
var require_can_promise = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/can-promise.js"(exports, module) {
    module.exports = function() {
      return typeof Promise === "function" && Promise.prototype && Promise.prototype.then;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/utils.js"(exports) {
    var toSJISFunction;
    var CODEWORDS_COUNT = [
      0,
      // Not used
      26,
      44,
      70,
      100,
      134,
      172,
      196,
      242,
      292,
      346,
      404,
      466,
      532,
      581,
      655,
      733,
      815,
      901,
      991,
      1085,
      1156,
      1258,
      1364,
      1474,
      1588,
      1706,
      1828,
      1921,
      2051,
      2185,
      2323,
      2465,
      2611,
      2761,
      2876,
      3034,
      3196,
      3362,
      3532,
      3706
    ];
    exports.getSymbolSize = function getSymbolSize(version2) {
      if (!version2)
        throw new Error('"version" cannot be null or undefined');
      if (version2 < 1 || version2 > 40)
        throw new Error('"version" should be in range from 1 to 40');
      return version2 * 4 + 17;
    };
    exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version2) {
      return CODEWORDS_COUNT[version2];
    };
    exports.getBCHDigit = function(data) {
      let digit = 0;
      while (data !== 0) {
        digit++;
        data >>>= 1;
      }
      return digit;
    };
    exports.setToSJISFunction = function setToSJISFunction(f) {
      if (typeof f !== "function") {
        throw new Error('"toSJISFunc" is not a valid function.');
      }
      toSJISFunction = f;
    };
    exports.isKanjiModeEnabled = function() {
      return typeof toSJISFunction !== "undefined";
    };
    exports.toSJIS = function toSJIS(kanji) {
      return toSJISFunction(kanji);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/error-correction-level.js
var require_error_correction_level = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/error-correction-level.js"(exports) {
    exports.L = { bit: 1 };
    exports.M = { bit: 0 };
    exports.Q = { bit: 3 };
    exports.H = { bit: 2 };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "l":
        case "low":
          return exports.L;
        case "m":
        case "medium":
          return exports.M;
        case "q":
        case "quartile":
          return exports.Q;
        case "h":
        case "high":
          return exports.H;
        default:
          throw new Error("Unknown EC Level: " + string);
      }
    }
    exports.isValid = function isValid2(level) {
      return level && typeof level.bit !== "undefined" && level.bit >= 0 && level.bit < 4;
    };
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e3) {
        return defaultValue;
      }
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/bit-buffer.js
var require_bit_buffer = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/bit-buffer.js"(exports, module) {
    function BitBuffer() {
      this.buffer = [];
      this.length = 0;
    }
    BitBuffer.prototype = {
      get: function(index) {
        const bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
      },
      put: function(num, length) {
        for (let i3 = 0; i3 < length; i3++) {
          this.putBit((num >>> length - i3 - 1 & 1) === 1);
        }
      },
      getLengthInBits: function() {
        return this.length;
      },
      putBit: function(bit) {
        const bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
          this.buffer.push(0);
        }
        if (bit) {
          this.buffer[bufIndex] |= 128 >>> this.length % 8;
        }
        this.length++;
      }
    };
    module.exports = BitBuffer;
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/bit-matrix.js
var require_bit_matrix = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/bit-matrix.js"(exports, module) {
    function BitMatrix(size) {
      if (!size || size < 1) {
        throw new Error("BitMatrix size must be defined and greater than 0");
      }
      this.size = size;
      this.data = new Uint8Array(size * size);
      this.reservedBit = new Uint8Array(size * size);
    }
    BitMatrix.prototype.set = function(row, col, value, reserved) {
      const index = row * this.size + col;
      this.data[index] = value;
      if (reserved)
        this.reservedBit[index] = true;
    };
    BitMatrix.prototype.get = function(row, col) {
      return this.data[row * this.size + col];
    };
    BitMatrix.prototype.xor = function(row, col, value) {
      this.data[row * this.size + col] ^= value;
    };
    BitMatrix.prototype.isReserved = function(row, col) {
      return this.reservedBit[row * this.size + col];
    };
    module.exports = BitMatrix;
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/alignment-pattern.js
var require_alignment_pattern = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/alignment-pattern.js"(exports) {
    var getSymbolSize = require_utils().getSymbolSize;
    exports.getRowColCoords = function getRowColCoords(version2) {
      if (version2 === 1)
        return [];
      const posCount = Math.floor(version2 / 7) + 2;
      const size = getSymbolSize(version2);
      const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
      const positions = [size - 7];
      for (let i3 = 1; i3 < posCount - 1; i3++) {
        positions[i3] = positions[i3 - 1] - intervals;
      }
      positions.push(6);
      return positions.reverse();
    };
    exports.getPositions = function getPositions(version2) {
      const coords = [];
      const pos = exports.getRowColCoords(version2);
      const posLength = pos.length;
      for (let i3 = 0; i3 < posLength; i3++) {
        for (let j = 0; j < posLength; j++) {
          if (i3 === 0 && j === 0 || // top-left
          i3 === 0 && j === posLength - 1 || // bottom-left
          i3 === posLength - 1 && j === 0) {
            continue;
          }
          coords.push([pos[i3], pos[j]]);
        }
      }
      return coords;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/finder-pattern.js
var require_finder_pattern = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/finder-pattern.js"(exports) {
    var getSymbolSize = require_utils().getSymbolSize;
    var FINDER_PATTERN_SIZE = 7;
    exports.getPositions = function getPositions(version2) {
      const size = getSymbolSize(version2);
      return [
        // top-left
        [0, 0],
        // top-right
        [size - FINDER_PATTERN_SIZE, 0],
        // bottom-left
        [0, size - FINDER_PATTERN_SIZE]
      ];
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/mask-pattern.js
var require_mask_pattern = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/mask-pattern.js"(exports) {
    exports.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    var PenaltyScores = {
      N1: 3,
      N2: 3,
      N3: 40,
      N4: 10
    };
    exports.isValid = function isValid2(mask) {
      return mask != null && mask !== "" && !isNaN(mask) && mask >= 0 && mask <= 7;
    };
    exports.from = function from(value) {
      return exports.isValid(value) ? parseInt(value, 10) : void 0;
    };
    exports.getPenaltyN1 = function getPenaltyN1(data) {
      const size = data.size;
      let points = 0;
      let sameCountCol = 0;
      let sameCountRow = 0;
      let lastCol = null;
      let lastRow = null;
      for (let row = 0; row < size; row++) {
        sameCountCol = sameCountRow = 0;
        lastCol = lastRow = null;
        for (let col = 0; col < size; col++) {
          let module2 = data.get(row, col);
          if (module2 === lastCol) {
            sameCountCol++;
          } else {
            if (sameCountCol >= 5)
              points += PenaltyScores.N1 + (sameCountCol - 5);
            lastCol = module2;
            sameCountCol = 1;
          }
          module2 = data.get(col, row);
          if (module2 === lastRow) {
            sameCountRow++;
          } else {
            if (sameCountRow >= 5)
              points += PenaltyScores.N1 + (sameCountRow - 5);
            lastRow = module2;
            sameCountRow = 1;
          }
        }
        if (sameCountCol >= 5)
          points += PenaltyScores.N1 + (sameCountCol - 5);
        if (sameCountRow >= 5)
          points += PenaltyScores.N1 + (sameCountRow - 5);
      }
      return points;
    };
    exports.getPenaltyN2 = function getPenaltyN2(data) {
      const size = data.size;
      let points = 0;
      for (let row = 0; row < size - 1; row++) {
        for (let col = 0; col < size - 1; col++) {
          const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
          if (last === 4 || last === 0)
            points++;
        }
      }
      return points * PenaltyScores.N2;
    };
    exports.getPenaltyN3 = function getPenaltyN3(data) {
      const size = data.size;
      let points = 0;
      let bitsCol = 0;
      let bitsRow = 0;
      for (let row = 0; row < size; row++) {
        bitsCol = bitsRow = 0;
        for (let col = 0; col < size; col++) {
          bitsCol = bitsCol << 1 & 2047 | data.get(row, col);
          if (col >= 10 && (bitsCol === 1488 || bitsCol === 93))
            points++;
          bitsRow = bitsRow << 1 & 2047 | data.get(col, row);
          if (col >= 10 && (bitsRow === 1488 || bitsRow === 93))
            points++;
        }
      }
      return points * PenaltyScores.N3;
    };
    exports.getPenaltyN4 = function getPenaltyN4(data) {
      let darkCount = 0;
      const modulesCount = data.data.length;
      for (let i3 = 0; i3 < modulesCount; i3++)
        darkCount += data.data[i3];
      const k3 = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
      return k3 * PenaltyScores.N4;
    };
    function getMaskAt(maskPattern, i3, j) {
      switch (maskPattern) {
        case exports.Patterns.PATTERN000:
          return (i3 + j) % 2 === 0;
        case exports.Patterns.PATTERN001:
          return i3 % 2 === 0;
        case exports.Patterns.PATTERN010:
          return j % 3 === 0;
        case exports.Patterns.PATTERN011:
          return (i3 + j) % 3 === 0;
        case exports.Patterns.PATTERN100:
          return (Math.floor(i3 / 2) + Math.floor(j / 3)) % 2 === 0;
        case exports.Patterns.PATTERN101:
          return i3 * j % 2 + i3 * j % 3 === 0;
        case exports.Patterns.PATTERN110:
          return (i3 * j % 2 + i3 * j % 3) % 2 === 0;
        case exports.Patterns.PATTERN111:
          return (i3 * j % 3 + (i3 + j) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + maskPattern);
      }
    }
    exports.applyMask = function applyMask(pattern, data) {
      const size = data.size;
      for (let col = 0; col < size; col++) {
        for (let row = 0; row < size; row++) {
          if (data.isReserved(row, col))
            continue;
          data.xor(row, col, getMaskAt(pattern, row, col));
        }
      }
    };
    exports.getBestMask = function getBestMask(data, setupFormatFunc) {
      const numPatterns = Object.keys(exports.Patterns).length;
      let bestPattern = 0;
      let lowerPenalty = Infinity;
      for (let p = 0; p < numPatterns; p++) {
        setupFormatFunc(p);
        exports.applyMask(p, data);
        const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
        exports.applyMask(p, data);
        if (penalty < lowerPenalty) {
          lowerPenalty = penalty;
          bestPattern = p;
        }
      }
      return bestPattern;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/error-correction-code.js
var require_error_correction_code = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/error-correction-code.js"(exports) {
    var ECLevel = require_error_correction_level();
    var EC_BLOCKS_TABLE = [
      // L  M  Q  H
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      2,
      2,
      1,
      2,
      2,
      4,
      1,
      2,
      4,
      4,
      2,
      4,
      4,
      4,
      2,
      4,
      6,
      5,
      2,
      4,
      6,
      6,
      2,
      5,
      8,
      8,
      4,
      5,
      8,
      8,
      4,
      5,
      8,
      11,
      4,
      8,
      10,
      11,
      4,
      9,
      12,
      16,
      4,
      9,
      16,
      16,
      6,
      10,
      12,
      18,
      6,
      10,
      17,
      16,
      6,
      11,
      16,
      19,
      6,
      13,
      18,
      21,
      7,
      14,
      21,
      25,
      8,
      16,
      20,
      25,
      8,
      17,
      23,
      25,
      9,
      17,
      23,
      34,
      9,
      18,
      25,
      30,
      10,
      20,
      27,
      32,
      12,
      21,
      29,
      35,
      12,
      23,
      34,
      37,
      12,
      25,
      34,
      40,
      13,
      26,
      35,
      42,
      14,
      28,
      38,
      45,
      15,
      29,
      40,
      48,
      16,
      31,
      43,
      51,
      17,
      33,
      45,
      54,
      18,
      35,
      48,
      57,
      19,
      37,
      51,
      60,
      19,
      38,
      53,
      63,
      20,
      40,
      56,
      66,
      21,
      43,
      59,
      70,
      22,
      45,
      62,
      74,
      24,
      47,
      65,
      77,
      25,
      49,
      68,
      81
    ];
    var EC_CODEWORDS_TABLE = [
      // L  M  Q  H
      7,
      10,
      13,
      17,
      10,
      16,
      22,
      28,
      15,
      26,
      36,
      44,
      20,
      36,
      52,
      64,
      26,
      48,
      72,
      88,
      36,
      64,
      96,
      112,
      40,
      72,
      108,
      130,
      48,
      88,
      132,
      156,
      60,
      110,
      160,
      192,
      72,
      130,
      192,
      224,
      80,
      150,
      224,
      264,
      96,
      176,
      260,
      308,
      104,
      198,
      288,
      352,
      120,
      216,
      320,
      384,
      132,
      240,
      360,
      432,
      144,
      280,
      408,
      480,
      168,
      308,
      448,
      532,
      180,
      338,
      504,
      588,
      196,
      364,
      546,
      650,
      224,
      416,
      600,
      700,
      224,
      442,
      644,
      750,
      252,
      476,
      690,
      816,
      270,
      504,
      750,
      900,
      300,
      560,
      810,
      960,
      312,
      588,
      870,
      1050,
      336,
      644,
      952,
      1110,
      360,
      700,
      1020,
      1200,
      390,
      728,
      1050,
      1260,
      420,
      784,
      1140,
      1350,
      450,
      812,
      1200,
      1440,
      480,
      868,
      1290,
      1530,
      510,
      924,
      1350,
      1620,
      540,
      980,
      1440,
      1710,
      570,
      1036,
      1530,
      1800,
      570,
      1064,
      1590,
      1890,
      600,
      1120,
      1680,
      1980,
      630,
      1204,
      1770,
      2100,
      660,
      1260,
      1860,
      2220,
      720,
      1316,
      1950,
      2310,
      750,
      1372,
      2040,
      2430
    ];
    exports.getBlocksCount = function getBlocksCount(version2, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 0];
        case ECLevel.M:
          return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 2];
        case ECLevel.H:
          return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
    exports.getTotalCodewordsCount = function getTotalCodewordsCount(version2, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 0];
        case ECLevel.M:
          return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 2];
        case ECLevel.H:
          return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/galois-field.js
var require_galois_field = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/galois-field.js"(exports) {
    var EXP_TABLE = new Uint8Array(512);
    var LOG_TABLE = new Uint8Array(256);
    (function initTables() {
      let x3 = 1;
      for (let i3 = 0; i3 < 255; i3++) {
        EXP_TABLE[i3] = x3;
        LOG_TABLE[x3] = i3;
        x3 <<= 1;
        if (x3 & 256) {
          x3 ^= 285;
        }
      }
      for (let i3 = 255; i3 < 512; i3++) {
        EXP_TABLE[i3] = EXP_TABLE[i3 - 255];
      }
    })();
    exports.log = function log(n) {
      if (n < 1)
        throw new Error("log(" + n + ")");
      return LOG_TABLE[n];
    };
    exports.exp = function exp(n) {
      return EXP_TABLE[n];
    };
    exports.mul = function mul(x3, y3) {
      if (x3 === 0 || y3 === 0)
        return 0;
      return EXP_TABLE[LOG_TABLE[x3] + LOG_TABLE[y3]];
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/polynomial.js
var require_polynomial = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/polynomial.js"(exports) {
    var GF = require_galois_field();
    exports.mul = function mul(p12, p22) {
      const coeff = new Uint8Array(p12.length + p22.length - 1);
      for (let i3 = 0; i3 < p12.length; i3++) {
        for (let j = 0; j < p22.length; j++) {
          coeff[i3 + j] ^= GF.mul(p12[i3], p22[j]);
        }
      }
      return coeff;
    };
    exports.mod = function mod(divident, divisor) {
      let result = new Uint8Array(divident);
      while (result.length - divisor.length >= 0) {
        const coeff = result[0];
        for (let i3 = 0; i3 < divisor.length; i3++) {
          result[i3] ^= GF.mul(divisor[i3], coeff);
        }
        let offset = 0;
        while (offset < result.length && result[offset] === 0)
          offset++;
        result = result.slice(offset);
      }
      return result;
    };
    exports.generateECPolynomial = function generateECPolynomial(degree) {
      let poly = new Uint8Array([1]);
      for (let i3 = 0; i3 < degree; i3++) {
        poly = exports.mul(poly, new Uint8Array([1, GF.exp(i3)]));
      }
      return poly;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/reed-solomon-encoder.js
var require_reed_solomon_encoder = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/reed-solomon-encoder.js"(exports, module) {
    var Polynomial = require_polynomial();
    function ReedSolomonEncoder(degree) {
      this.genPoly = void 0;
      this.degree = degree;
      if (this.degree)
        this.initialize(this.degree);
    }
    ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
      this.degree = degree;
      this.genPoly = Polynomial.generateECPolynomial(this.degree);
    };
    ReedSolomonEncoder.prototype.encode = function encode(data) {
      if (!this.genPoly) {
        throw new Error("Encoder not initialized");
      }
      const paddedData = new Uint8Array(data.length + this.degree);
      paddedData.set(data);
      const remainder = Polynomial.mod(paddedData, this.genPoly);
      const start = this.degree - remainder.length;
      if (start > 0) {
        const buff = new Uint8Array(this.degree);
        buff.set(remainder, start);
        return buff;
      }
      return remainder;
    };
    module.exports = ReedSolomonEncoder;
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/version-check.js
var require_version_check = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/version-check.js"(exports) {
    exports.isValid = function isValid2(version2) {
      return !isNaN(version2) && version2 >= 1 && version2 <= 40;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/regex.js
var require_regex = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/regex.js"(exports) {
    var numeric = "[0-9]+";
    var alphanumeric = "[A-Z $%*+\\-./:]+";
    var kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
    kanji = kanji.replace(/u/g, "\\u");
    var byte = "(?:(?![A-Z0-9 $%*+\\-./:]|" + kanji + ")(?:.|[\r\n]))+";
    exports.KANJI = new RegExp(kanji, "g");
    exports.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
    exports.BYTE = new RegExp(byte, "g");
    exports.NUMERIC = new RegExp(numeric, "g");
    exports.ALPHANUMERIC = new RegExp(alphanumeric, "g");
    var TEST_KANJI = new RegExp("^" + kanji + "$");
    var TEST_NUMERIC = new RegExp("^" + numeric + "$");
    var TEST_ALPHANUMERIC = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
    exports.testKanji = function testKanji(str) {
      return TEST_KANJI.test(str);
    };
    exports.testNumeric = function testNumeric(str) {
      return TEST_NUMERIC.test(str);
    };
    exports.testAlphanumeric = function testAlphanumeric(str) {
      return TEST_ALPHANUMERIC.test(str);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/mode.js
var require_mode = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/mode.js"(exports) {
    var VersionCheck = require_version_check();
    var Regex = require_regex();
    exports.NUMERIC = {
      id: "Numeric",
      bit: 1 << 0,
      ccBits: [10, 12, 14]
    };
    exports.ALPHANUMERIC = {
      id: "Alphanumeric",
      bit: 1 << 1,
      ccBits: [9, 11, 13]
    };
    exports.BYTE = {
      id: "Byte",
      bit: 1 << 2,
      ccBits: [8, 16, 16]
    };
    exports.KANJI = {
      id: "Kanji",
      bit: 1 << 3,
      ccBits: [8, 10, 12]
    };
    exports.MIXED = {
      bit: -1
    };
    exports.getCharCountIndicator = function getCharCountIndicator(mode, version2) {
      if (!mode.ccBits)
        throw new Error("Invalid mode: " + mode);
      if (!VersionCheck.isValid(version2)) {
        throw new Error("Invalid version: " + version2);
      }
      if (version2 >= 1 && version2 < 10)
        return mode.ccBits[0];
      else if (version2 < 27)
        return mode.ccBits[1];
      return mode.ccBits[2];
    };
    exports.getBestModeForData = function getBestModeForData(dataStr) {
      if (Regex.testNumeric(dataStr))
        return exports.NUMERIC;
      else if (Regex.testAlphanumeric(dataStr))
        return exports.ALPHANUMERIC;
      else if (Regex.testKanji(dataStr))
        return exports.KANJI;
      else
        return exports.BYTE;
    };
    exports.toString = function toString(mode) {
      if (mode && mode.id)
        return mode.id;
      throw new Error("Invalid mode");
    };
    exports.isValid = function isValid2(mode) {
      return mode && mode.bit && mode.ccBits;
    };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "numeric":
          return exports.NUMERIC;
        case "alphanumeric":
          return exports.ALPHANUMERIC;
        case "kanji":
          return exports.KANJI;
        case "byte":
          return exports.BYTE;
        default:
          throw new Error("Unknown mode: " + string);
      }
    }
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e3) {
        return defaultValue;
      }
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/version.js
var require_version = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/version.js"(exports) {
    var Utils = require_utils();
    var ECCode = require_error_correction_code();
    var ECLevel = require_error_correction_level();
    var Mode = require_mode();
    var VersionCheck = require_version_check();
    var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
    var G18_BCH = Utils.getBCHDigit(G18);
    function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    function getReservedBitsCount(mode, version2) {
      return Mode.getCharCountIndicator(mode, version2) + 4;
    }
    function getTotalBitsFromDataArray(segments, version2) {
      let totalBits = 0;
      segments.forEach(function(data) {
        const reservedBits = getReservedBitsCount(data.mode, version2);
        totalBits += reservedBits + data.getBitsLength();
      });
      return totalBits;
    }
    function getBestVersionForMixedData(segments, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        const length = getTotalBitsFromDataArray(segments, currentVersion);
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    exports.from = function from(value, defaultValue) {
      if (VersionCheck.isValid(value)) {
        return parseInt(value, 10);
      }
      return defaultValue;
    };
    exports.getCapacity = function getCapacity(version2, errorCorrectionLevel, mode) {
      if (!VersionCheck.isValid(version2)) {
        throw new Error("Invalid QR Code version");
      }
      if (typeof mode === "undefined")
        mode = Mode.BYTE;
      const totalCodewords = Utils.getSymbolTotalCodewords(version2);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version2, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (mode === Mode.MIXED)
        return dataTotalCodewordsBits;
      const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version2);
      switch (mode) {
        case Mode.NUMERIC:
          return Math.floor(usableBits / 10 * 3);
        case Mode.ALPHANUMERIC:
          return Math.floor(usableBits / 11 * 2);
        case Mode.KANJI:
          return Math.floor(usableBits / 13);
        case Mode.BYTE:
        default:
          return Math.floor(usableBits / 8);
      }
    };
    exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
      let seg;
      const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
      if (Array.isArray(data)) {
        if (data.length > 1) {
          return getBestVersionForMixedData(data, ecl);
        }
        if (data.length === 0) {
          return 1;
        }
        seg = data[0];
      } else {
        seg = data;
      }
      return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
    };
    exports.getEncodedBits = function getEncodedBits(version2) {
      if (!VersionCheck.isValid(version2) || version2 < 7) {
        throw new Error("Invalid QR Code version");
      }
      let d3 = version2 << 12;
      while (Utils.getBCHDigit(d3) - G18_BCH >= 0) {
        d3 ^= G18 << Utils.getBCHDigit(d3) - G18_BCH;
      }
      return version2 << 12 | d3;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/format-info.js
var require_format_info = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/format-info.js"(exports) {
    var Utils = require_utils();
    var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
    var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
    var G15_BCH = Utils.getBCHDigit(G15);
    exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
      const data = errorCorrectionLevel.bit << 3 | mask;
      let d3 = data << 10;
      while (Utils.getBCHDigit(d3) - G15_BCH >= 0) {
        d3 ^= G15 << Utils.getBCHDigit(d3) - G15_BCH;
      }
      return (data << 10 | d3) ^ G15_MASK;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/numeric-data.js
var require_numeric_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/numeric-data.js"(exports, module) {
    var Mode = require_mode();
    function NumericData(data) {
      this.mode = Mode.NUMERIC;
      this.data = data.toString();
    }
    NumericData.getBitsLength = function getBitsLength(length) {
      return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
    };
    NumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    NumericData.prototype.getBitsLength = function getBitsLength() {
      return NumericData.getBitsLength(this.data.length);
    };
    NumericData.prototype.write = function write(bitBuffer) {
      let i3, group, value;
      for (i3 = 0; i3 + 3 <= this.data.length; i3 += 3) {
        group = this.data.substr(i3, 3);
        value = parseInt(group, 10);
        bitBuffer.put(value, 10);
      }
      const remainingNum = this.data.length - i3;
      if (remainingNum > 0) {
        group = this.data.substr(i3);
        value = parseInt(group, 10);
        bitBuffer.put(value, remainingNum * 3 + 1);
      }
    };
    module.exports = NumericData;
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/alphanumeric-data.js
var require_alphanumeric_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/alphanumeric-data.js"(exports, module) {
    var Mode = require_mode();
    var ALPHA_NUM_CHARS = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      " ",
      "$",
      "%",
      "*",
      "+",
      "-",
      ".",
      "/",
      ":"
    ];
    function AlphanumericData(data) {
      this.mode = Mode.ALPHANUMERIC;
      this.data = data;
    }
    AlphanumericData.getBitsLength = function getBitsLength(length) {
      return 11 * Math.floor(length / 2) + 6 * (length % 2);
    };
    AlphanumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    AlphanumericData.prototype.getBitsLength = function getBitsLength() {
      return AlphanumericData.getBitsLength(this.data.length);
    };
    AlphanumericData.prototype.write = function write(bitBuffer) {
      let i3;
      for (i3 = 0; i3 + 2 <= this.data.length; i3 += 2) {
        let value = ALPHA_NUM_CHARS.indexOf(this.data[i3]) * 45;
        value += ALPHA_NUM_CHARS.indexOf(this.data[i3 + 1]);
        bitBuffer.put(value, 11);
      }
      if (this.data.length % 2) {
        bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i3]), 6);
      }
    };
    module.exports = AlphanumericData;
  }
});

// node_modules/.pnpm/encode-utf8@1.0.3/node_modules/encode-utf8/index.js
var require_encode_utf8 = __commonJS({
  "node_modules/.pnpm/encode-utf8@1.0.3/node_modules/encode-utf8/index.js"(exports, module) {
    "use strict";
    module.exports = function encodeUtf8(input) {
      var result = [];
      var size = input.length;
      for (var index = 0; index < size; index++) {
        var point = input.charCodeAt(index);
        if (point >= 55296 && point <= 56319 && size > index + 1) {
          var second = input.charCodeAt(index + 1);
          if (second >= 56320 && second <= 57343) {
            point = (point - 55296) * 1024 + second - 56320 + 65536;
            index += 1;
          }
        }
        if (point < 128) {
          result.push(point);
          continue;
        }
        if (point < 2048) {
          result.push(point >> 6 | 192);
          result.push(point & 63 | 128);
          continue;
        }
        if (point < 55296 || point >= 57344 && point < 65536) {
          result.push(point >> 12 | 224);
          result.push(point >> 6 & 63 | 128);
          result.push(point & 63 | 128);
          continue;
        }
        if (point >= 65536 && point <= 1114111) {
          result.push(point >> 18 | 240);
          result.push(point >> 12 & 63 | 128);
          result.push(point >> 6 & 63 | 128);
          result.push(point & 63 | 128);
          continue;
        }
        result.push(239, 191, 189);
      }
      return new Uint8Array(result).buffer;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/byte-data.js
var require_byte_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/byte-data.js"(exports, module) {
    var encodeUtf8 = require_encode_utf8();
    var Mode = require_mode();
    function ByteData(data) {
      this.mode = Mode.BYTE;
      if (typeof data === "string") {
        data = encodeUtf8(data);
      }
      this.data = new Uint8Array(data);
    }
    ByteData.getBitsLength = function getBitsLength(length) {
      return length * 8;
    };
    ByteData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    ByteData.prototype.getBitsLength = function getBitsLength() {
      return ByteData.getBitsLength(this.data.length);
    };
    ByteData.prototype.write = function(bitBuffer) {
      for (let i3 = 0, l = this.data.length; i3 < l; i3++) {
        bitBuffer.put(this.data[i3], 8);
      }
    };
    module.exports = ByteData;
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/kanji-data.js
var require_kanji_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/kanji-data.js"(exports, module) {
    var Mode = require_mode();
    var Utils = require_utils();
    function KanjiData(data) {
      this.mode = Mode.KANJI;
      this.data = data;
    }
    KanjiData.getBitsLength = function getBitsLength(length) {
      return length * 13;
    };
    KanjiData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    KanjiData.prototype.getBitsLength = function getBitsLength() {
      return KanjiData.getBitsLength(this.data.length);
    };
    KanjiData.prototype.write = function(bitBuffer) {
      let i3;
      for (i3 = 0; i3 < this.data.length; i3++) {
        let value = Utils.toSJIS(this.data[i3]);
        if (value >= 33088 && value <= 40956) {
          value -= 33088;
        } else if (value >= 57408 && value <= 60351) {
          value -= 49472;
        } else {
          throw new Error(
            "Invalid SJIS character: " + this.data[i3] + "\nMake sure your charset is UTF-8"
          );
        }
        value = (value >>> 8 & 255) * 192 + (value & 255);
        bitBuffer.put(value, 13);
      }
    };
    module.exports = KanjiData;
  }
});

// node_modules/.pnpm/dijkstrajs@1.0.3/node_modules/dijkstrajs/dijkstra.js
var require_dijkstra = __commonJS({
  "node_modules/.pnpm/dijkstrajs@1.0.3/node_modules/dijkstrajs/dijkstra.js"(exports, module) {
    "use strict";
    var dijkstra = {
      single_source_shortest_paths: function(graph, s3, d3) {
        var predecessors = {};
        var costs = {};
        costs[s3] = 0;
        var open = dijkstra.PriorityQueue.make();
        open.push(s3, 0);
        var closest, u3, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
        while (!open.empty()) {
          closest = open.pop();
          u3 = closest.value;
          cost_of_s_to_u = closest.cost;
          adjacent_nodes = graph[u3] || {};
          for (v in adjacent_nodes) {
            if (adjacent_nodes.hasOwnProperty(v)) {
              cost_of_e = adjacent_nodes[v];
              cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
              cost_of_s_to_v = costs[v];
              first_visit = typeof costs[v] === "undefined";
              if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                costs[v] = cost_of_s_to_u_plus_cost_of_e;
                open.push(v, cost_of_s_to_u_plus_cost_of_e);
                predecessors[v] = u3;
              }
            }
          }
        }
        if (typeof d3 !== "undefined" && typeof costs[d3] === "undefined") {
          var msg = ["Could not find a path from ", s3, " to ", d3, "."].join("");
          throw new Error(msg);
        }
        return predecessors;
      },
      extract_shortest_path_from_predecessor_list: function(predecessors, d3) {
        var nodes = [];
        var u3 = d3;
        var predecessor;
        while (u3) {
          nodes.push(u3);
          predecessor = predecessors[u3];
          u3 = predecessors[u3];
        }
        nodes.reverse();
        return nodes;
      },
      find_path: function(graph, s3, d3) {
        var predecessors = dijkstra.single_source_shortest_paths(graph, s3, d3);
        return dijkstra.extract_shortest_path_from_predecessor_list(
          predecessors,
          d3
        );
      },
      /**
       * A very naive priority queue implementation.
       */
      PriorityQueue: {
        make: function(opts) {
          var T3 = dijkstra.PriorityQueue, t3 = {}, key;
          opts = opts || {};
          for (key in T3) {
            if (T3.hasOwnProperty(key)) {
              t3[key] = T3[key];
            }
          }
          t3.queue = [];
          t3.sorter = opts.sorter || T3.default_sorter;
          return t3;
        },
        default_sorter: function(a3, b3) {
          return a3.cost - b3.cost;
        },
        /**
         * Add a new item to the queue and ensure the highest priority element
         * is at the front of the queue.
         */
        push: function(value, cost) {
          var item = { value, cost };
          this.queue.push(item);
          this.queue.sort(this.sorter);
        },
        /**
         * Return the highest priority element in the queue.
         */
        pop: function() {
          return this.queue.shift();
        },
        empty: function() {
          return this.queue.length === 0;
        }
      }
    };
    if (typeof module !== "undefined") {
      module.exports = dijkstra;
    }
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/segments.js
var require_segments = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/segments.js"(exports) {
    var Mode = require_mode();
    var NumericData = require_numeric_data();
    var AlphanumericData = require_alphanumeric_data();
    var ByteData = require_byte_data();
    var KanjiData = require_kanji_data();
    var Regex = require_regex();
    var Utils = require_utils();
    var dijkstra = require_dijkstra();
    function getStringByteLength(str) {
      return unescape(encodeURIComponent(str)).length;
    }
    function getSegments(regex, mode, str) {
      const segments = [];
      let result;
      while ((result = regex.exec(str)) !== null) {
        segments.push({
          data: result[0],
          index: result.index,
          mode,
          length: result[0].length
        });
      }
      return segments;
    }
    function getSegmentsFromString(dataStr) {
      const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
      const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
      let byteSegs;
      let kanjiSegs;
      if (Utils.isKanjiModeEnabled()) {
        byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
        kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
      } else {
        byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
        kanjiSegs = [];
      }
      const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
      return segs.sort(function(s12, s23) {
        return s12.index - s23.index;
      }).map(function(obj) {
        return {
          data: obj.data,
          mode: obj.mode,
          length: obj.length
        };
      });
    }
    function getSegmentBitsLength(length, mode) {
      switch (mode) {
        case Mode.NUMERIC:
          return NumericData.getBitsLength(length);
        case Mode.ALPHANUMERIC:
          return AlphanumericData.getBitsLength(length);
        case Mode.KANJI:
          return KanjiData.getBitsLength(length);
        case Mode.BYTE:
          return ByteData.getBitsLength(length);
      }
    }
    function mergeSegments(segs) {
      return segs.reduce(function(acc, curr) {
        const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
        if (prevSeg && prevSeg.mode === curr.mode) {
          acc[acc.length - 1].data += curr.data;
          return acc;
        }
        acc.push(curr);
        return acc;
      }, []);
    }
    function buildNodes(segs) {
      const nodes = [];
      for (let i3 = 0; i3 < segs.length; i3++) {
        const seg = segs[i3];
        switch (seg.mode) {
          case Mode.NUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.ALPHANUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.KANJI:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
            break;
          case Mode.BYTE:
            nodes.push([
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
        }
      }
      return nodes;
    }
    function buildGraph(nodes, version2) {
      const table = {};
      const graph = { start: {} };
      let prevNodeIds = ["start"];
      for (let i3 = 0; i3 < nodes.length; i3++) {
        const nodeGroup = nodes[i3];
        const currentNodeIds = [];
        for (let j = 0; j < nodeGroup.length; j++) {
          const node = nodeGroup[j];
          const key = "" + i3 + j;
          currentNodeIds.push(key);
          table[key] = { node, lastCount: 0 };
          graph[key] = {};
          for (let n = 0; n < prevNodeIds.length; n++) {
            const prevNodeId = prevNodeIds[n];
            if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
              graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
              table[prevNodeId].lastCount += node.length;
            } else {
              if (table[prevNodeId])
                table[prevNodeId].lastCount = node.length;
              graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version2);
            }
          }
        }
        prevNodeIds = currentNodeIds;
      }
      for (let n = 0; n < prevNodeIds.length; n++) {
        graph[prevNodeIds[n]].end = 0;
      }
      return { map: graph, table };
    }
    function buildSingleSegment(data, modesHint) {
      let mode;
      const bestMode = Mode.getBestModeForData(data);
      mode = Mode.from(modesHint, bestMode);
      if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
        throw new Error('"' + data + '" cannot be encoded with mode ' + Mode.toString(mode) + ".\n Suggested mode is: " + Mode.toString(bestMode));
      }
      if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
        mode = Mode.BYTE;
      }
      switch (mode) {
        case Mode.NUMERIC:
          return new NumericData(data);
        case Mode.ALPHANUMERIC:
          return new AlphanumericData(data);
        case Mode.KANJI:
          return new KanjiData(data);
        case Mode.BYTE:
          return new ByteData(data);
      }
    }
    exports.fromArray = function fromArray(array) {
      return array.reduce(function(acc, seg) {
        if (typeof seg === "string") {
          acc.push(buildSingleSegment(seg, null));
        } else if (seg.data) {
          acc.push(buildSingleSegment(seg.data, seg.mode));
        }
        return acc;
      }, []);
    };
    exports.fromString = function fromString(data, version2) {
      const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
      const nodes = buildNodes(segs);
      const graph = buildGraph(nodes, version2);
      const path = dijkstra.find_path(graph.map, "start", "end");
      const optimizedSegs = [];
      for (let i3 = 1; i3 < path.length - 1; i3++) {
        optimizedSegs.push(graph.table[path[i3]].node);
      }
      return exports.fromArray(mergeSegments(optimizedSegs));
    };
    exports.rawSplit = function rawSplit(data) {
      return exports.fromArray(
        getSegmentsFromString(data, Utils.isKanjiModeEnabled())
      );
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/qrcode.js
var require_qrcode = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/qrcode.js"(exports) {
    var Utils = require_utils();
    var ECLevel = require_error_correction_level();
    var BitBuffer = require_bit_buffer();
    var BitMatrix = require_bit_matrix();
    var AlignmentPattern = require_alignment_pattern();
    var FinderPattern = require_finder_pattern();
    var MaskPattern = require_mask_pattern();
    var ECCode = require_error_correction_code();
    var ReedSolomonEncoder = require_reed_solomon_encoder();
    var Version = require_version();
    var FormatInfo = require_format_info();
    var Mode = require_mode();
    var Segments = require_segments();
    function setupFinderPattern(matrix, version2) {
      const size = matrix.size;
      const pos = FinderPattern.getPositions(version2);
      for (let i3 = 0; i3 < pos.length; i3++) {
        const row = pos[i3][0];
        const col = pos[i3][1];
        for (let r = -1; r <= 7; r++) {
          if (row + r <= -1 || size <= row + r)
            continue;
          for (let c3 = -1; c3 <= 7; c3++) {
            if (col + c3 <= -1 || size <= col + c3)
              continue;
            if (r >= 0 && r <= 6 && (c3 === 0 || c3 === 6) || c3 >= 0 && c3 <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c3 >= 2 && c3 <= 4) {
              matrix.set(row + r, col + c3, true, true);
            } else {
              matrix.set(row + r, col + c3, false, true);
            }
          }
        }
      }
    }
    function setupTimingPattern(matrix) {
      const size = matrix.size;
      for (let r = 8; r < size - 8; r++) {
        const value = r % 2 === 0;
        matrix.set(r, 6, value, true);
        matrix.set(6, r, value, true);
      }
    }
    function setupAlignmentPattern(matrix, version2) {
      const pos = AlignmentPattern.getPositions(version2);
      for (let i3 = 0; i3 < pos.length; i3++) {
        const row = pos[i3][0];
        const col = pos[i3][1];
        for (let r = -2; r <= 2; r++) {
          for (let c3 = -2; c3 <= 2; c3++) {
            if (r === -2 || r === 2 || c3 === -2 || c3 === 2 || r === 0 && c3 === 0) {
              matrix.set(row + r, col + c3, true, true);
            } else {
              matrix.set(row + r, col + c3, false, true);
            }
          }
        }
      }
    }
    function setupVersionInfo(matrix, version2) {
      const size = matrix.size;
      const bits = Version.getEncodedBits(version2);
      let row, col, mod;
      for (let i3 = 0; i3 < 18; i3++) {
        row = Math.floor(i3 / 3);
        col = i3 % 3 + size - 8 - 3;
        mod = (bits >> i3 & 1) === 1;
        matrix.set(row, col, mod, true);
        matrix.set(col, row, mod, true);
      }
    }
    function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
      const size = matrix.size;
      const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
      let i3, mod;
      for (i3 = 0; i3 < 15; i3++) {
        mod = (bits >> i3 & 1) === 1;
        if (i3 < 6) {
          matrix.set(i3, 8, mod, true);
        } else if (i3 < 8) {
          matrix.set(i3 + 1, 8, mod, true);
        } else {
          matrix.set(size - 15 + i3, 8, mod, true);
        }
        if (i3 < 8) {
          matrix.set(8, size - i3 - 1, mod, true);
        } else if (i3 < 9) {
          matrix.set(8, 15 - i3 - 1 + 1, mod, true);
        } else {
          matrix.set(8, 15 - i3 - 1, mod, true);
        }
      }
      matrix.set(size - 8, 8, 1, true);
    }
    function setupData(matrix, data) {
      const size = matrix.size;
      let inc = -1;
      let row = size - 1;
      let bitIndex = 7;
      let byteIndex = 0;
      for (let col = size - 1; col > 0; col -= 2) {
        if (col === 6)
          col--;
        while (true) {
          for (let c3 = 0; c3 < 2; c3++) {
            if (!matrix.isReserved(row, col - c3)) {
              let dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) === 1;
              }
              matrix.set(row, col - c3, dark);
              bitIndex--;
              if (bitIndex === -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || size <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    }
    function createData(version2, errorCorrectionLevel, segments) {
      const buffer = new BitBuffer();
      segments.forEach(function(data) {
        buffer.put(data.mode.bit, 4);
        buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version2));
        data.write(buffer);
      });
      const totalCodewords = Utils.getSymbolTotalCodewords(version2);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version2, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 !== 0) {
        buffer.putBit(0);
      }
      const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
      for (let i3 = 0; i3 < remainingByte; i3++) {
        buffer.put(i3 % 2 ? 17 : 236, 8);
      }
      return createCodewords(buffer, version2, errorCorrectionLevel);
    }
    function createCodewords(bitBuffer, version2, errorCorrectionLevel) {
      const totalCodewords = Utils.getSymbolTotalCodewords(version2);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version2, errorCorrectionLevel);
      const dataTotalCodewords = totalCodewords - ecTotalCodewords;
      const ecTotalBlocks = ECCode.getBlocksCount(version2, errorCorrectionLevel);
      const blocksInGroup2 = totalCodewords % ecTotalBlocks;
      const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
      const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
      const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
      const rs2 = new ReedSolomonEncoder(ecCount);
      let offset = 0;
      const dcData = new Array(ecTotalBlocks);
      const ecData = new Array(ecTotalBlocks);
      let maxDataSize = 0;
      const buffer = new Uint8Array(bitBuffer.buffer);
      for (let b3 = 0; b3 < ecTotalBlocks; b3++) {
        const dataSize = b3 < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
        dcData[b3] = buffer.slice(offset, offset + dataSize);
        ecData[b3] = rs2.encode(dcData[b3]);
        offset += dataSize;
        maxDataSize = Math.max(maxDataSize, dataSize);
      }
      const data = new Uint8Array(totalCodewords);
      let index = 0;
      let i3, r;
      for (i3 = 0; i3 < maxDataSize; i3++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          if (i3 < dcData[r].length) {
            data[index++] = dcData[r][i3];
          }
        }
      }
      for (i3 = 0; i3 < ecCount; i3++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          data[index++] = ecData[r][i3];
        }
      }
      return data;
    }
    function createSymbol(data, version2, errorCorrectionLevel, maskPattern) {
      let segments;
      if (Array.isArray(data)) {
        segments = Segments.fromArray(data);
      } else if (typeof data === "string") {
        let estimatedVersion = version2;
        if (!estimatedVersion) {
          const rawSegments = Segments.rawSplit(data);
          estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
        }
        segments = Segments.fromString(data, estimatedVersion || 40);
      } else {
        throw new Error("Invalid data");
      }
      const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
      if (!bestVersion) {
        throw new Error("The amount of data is too big to be stored in a QR Code");
      }
      if (!version2) {
        version2 = bestVersion;
      } else if (version2 < bestVersion) {
        throw new Error(
          "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n"
        );
      }
      const dataBits = createData(version2, errorCorrectionLevel, segments);
      const moduleCount = Utils.getSymbolSize(version2);
      const modules = new BitMatrix(moduleCount);
      setupFinderPattern(modules, version2);
      setupTimingPattern(modules);
      setupAlignmentPattern(modules, version2);
      setupFormatInfo(modules, errorCorrectionLevel, 0);
      if (version2 >= 7) {
        setupVersionInfo(modules, version2);
      }
      setupData(modules, dataBits);
      if (isNaN(maskPattern)) {
        maskPattern = MaskPattern.getBestMask(
          modules,
          setupFormatInfo.bind(null, modules, errorCorrectionLevel)
        );
      }
      MaskPattern.applyMask(maskPattern, modules);
      setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
      return {
        modules,
        version: version2,
        errorCorrectionLevel,
        maskPattern,
        segments
      };
    }
    exports.create = function create(data, options) {
      if (typeof data === "undefined" || data === "") {
        throw new Error("No input text");
      }
      let errorCorrectionLevel = ECLevel.M;
      let version2;
      let mask;
      if (typeof options !== "undefined") {
        errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
        version2 = Version.from(options.version);
        mask = MaskPattern.from(options.maskPattern);
        if (options.toSJISFunc) {
          Utils.setToSJISFunction(options.toSJISFunc);
        }
      }
      return createSymbol(data, version2, errorCorrectionLevel, mask);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/renderer/utils.js
var require_utils2 = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/renderer/utils.js"(exports) {
    function hex2rgba(hex) {
      if (typeof hex === "number") {
        hex = hex.toString();
      }
      if (typeof hex !== "string") {
        throw new Error("Color should be defined as hex string");
      }
      let hexCode = hex.slice().replace("#", "").split("");
      if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
        throw new Error("Invalid hex color: " + hex);
      }
      if (hexCode.length === 3 || hexCode.length === 4) {
        hexCode = Array.prototype.concat.apply([], hexCode.map(function(c3) {
          return [c3, c3];
        }));
      }
      if (hexCode.length === 6)
        hexCode.push("F", "F");
      const hexValue = parseInt(hexCode.join(""), 16);
      return {
        r: hexValue >> 24 & 255,
        g: hexValue >> 16 & 255,
        b: hexValue >> 8 & 255,
        a: hexValue & 255,
        hex: "#" + hexCode.slice(0, 6).join("")
      };
    }
    exports.getOptions = function getOptions(options) {
      if (!options)
        options = {};
      if (!options.color)
        options.color = {};
      const margin = typeof options.margin === "undefined" || options.margin === null || options.margin < 0 ? 4 : options.margin;
      const width = options.width && options.width >= 21 ? options.width : void 0;
      const scale = options.scale || 4;
      return {
        width,
        scale: width ? 4 : scale,
        margin,
        color: {
          dark: hex2rgba(options.color.dark || "#000000ff"),
          light: hex2rgba(options.color.light || "#ffffffff")
        },
        type: options.type,
        rendererOpts: options.rendererOpts || {}
      };
    };
    exports.getScale = function getScale(qrSize, opts) {
      return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
    };
    exports.getImageWidth = function getImageWidth(qrSize, opts) {
      const scale = exports.getScale(qrSize, opts);
      return Math.floor((qrSize + opts.margin * 2) * scale);
    };
    exports.qrToImageData = function qrToImageData(imgData, qr2, opts) {
      const size = qr2.modules.size;
      const data = qr2.modules.data;
      const scale = exports.getScale(size, opts);
      const symbolSize = Math.floor((size + opts.margin * 2) * scale);
      const scaledMargin = opts.margin * scale;
      const palette = [opts.color.light, opts.color.dark];
      for (let i3 = 0; i3 < symbolSize; i3++) {
        for (let j = 0; j < symbolSize; j++) {
          let posDst = (i3 * symbolSize + j) * 4;
          let pxColor = opts.color.light;
          if (i3 >= scaledMargin && j >= scaledMargin && i3 < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
            const iSrc = Math.floor((i3 - scaledMargin) / scale);
            const jSrc = Math.floor((j - scaledMargin) / scale);
            pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
          }
          imgData[posDst++] = pxColor.r;
          imgData[posDst++] = pxColor.g;
          imgData[posDst++] = pxColor.b;
          imgData[posDst] = pxColor.a;
        }
      }
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/renderer/canvas.js
var require_canvas = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/renderer/canvas.js"(exports) {
    var Utils = require_utils2();
    function clearCanvas(ctx, canvas, size) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!canvas.style)
        canvas.style = {};
      canvas.height = size;
      canvas.width = size;
      canvas.style.height = size + "px";
      canvas.style.width = size + "px";
    }
    function getCanvasElement() {
      try {
        return document.createElement("canvas");
      } catch (e3) {
        throw new Error("You need to specify a canvas element");
      }
    }
    exports.render = function render2(qrData, canvas, options) {
      let opts = options;
      let canvasEl = canvas;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!canvas) {
        canvasEl = getCanvasElement();
      }
      opts = Utils.getOptions(opts);
      const size = Utils.getImageWidth(qrData.modules.size, opts);
      const ctx = canvasEl.getContext("2d");
      const image = ctx.createImageData(size, size);
      Utils.qrToImageData(image.data, qrData, opts);
      clearCanvas(ctx, canvasEl, size);
      ctx.putImageData(image, 0, 0);
      return canvasEl;
    };
    exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
      let opts = options;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!opts)
        opts = {};
      const canvasEl = exports.render(qrData, canvas, opts);
      const type = opts.type || "image/png";
      const rendererOpts = opts.rendererOpts || {};
      return canvasEl.toDataURL(type, rendererOpts.quality);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/renderer/svg-tag.js
var require_svg_tag = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/renderer/svg-tag.js"(exports) {
    var Utils = require_utils2();
    function getColorAttrib(color, attrib) {
      const alpha = color.a / 255;
      const str = attrib + '="' + color.hex + '"';
      return alpha < 1 ? str + " " + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
    }
    function svgCmd(cmd, x3, y3) {
      let str = cmd + x3;
      if (typeof y3 !== "undefined")
        str += " " + y3;
      return str;
    }
    function qrToPath(data, size, margin) {
      let path = "";
      let moveBy = 0;
      let newRow = false;
      let lineLength = 0;
      for (let i3 = 0; i3 < data.length; i3++) {
        const col = Math.floor(i3 % size);
        const row = Math.floor(i3 / size);
        if (!col && !newRow)
          newRow = true;
        if (data[i3]) {
          lineLength++;
          if (!(i3 > 0 && col > 0 && data[i3 - 1])) {
            path += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
            moveBy = 0;
            newRow = false;
          }
          if (!(col + 1 < size && data[i3 + 1])) {
            path += svgCmd("h", lineLength);
            lineLength = 0;
          }
        } else {
          moveBy++;
        }
      }
      return path;
    }
    exports.render = function render2(qrData, options, cb) {
      const opts = Utils.getOptions(options);
      const size = qrData.modules.size;
      const data = qrData.modules.data;
      const qrcodesize = size + opts.margin * 2;
      const bg = !opts.color.light.a ? "" : "<path " + getColorAttrib(opts.color.light, "fill") + ' d="M0 0h' + qrcodesize + "v" + qrcodesize + 'H0z"/>';
      const path = "<path " + getColorAttrib(opts.color.dark, "stroke") + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
      const viewBox = 'viewBox="0 0 ' + qrcodesize + " " + qrcodesize + '"';
      const width = !opts.width ? "" : 'width="' + opts.width + '" height="' + opts.width + '" ';
      const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + "</svg>\n";
      if (typeof cb === "function") {
        cb(null, svgTag);
      }
      return svgTag;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/browser.js
var require_browser = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/browser.js"(exports) {
    var canPromise = require_can_promise();
    var QRCode2 = require_qrcode();
    var CanvasRenderer = require_canvas();
    var SvgRenderer = require_svg_tag();
    function renderCanvas(renderFunc, canvas, text, opts, cb) {
      const args = [].slice.call(arguments, 1);
      const argsNum = args.length;
      const isLastArgCb = typeof args[argsNum - 1] === "function";
      if (!isLastArgCb && !canPromise()) {
        throw new Error("Callback required as last argument");
      }
      if (isLastArgCb) {
        if (argsNum < 2) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 2) {
          cb = text;
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 3) {
          if (canvas.getContext && typeof cb === "undefined") {
            cb = opts;
            opts = void 0;
          } else {
            cb = opts;
            opts = text;
            text = canvas;
            canvas = void 0;
          }
        }
      } else {
        if (argsNum < 1) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 1) {
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 2 && !canvas.getContext) {
          opts = text;
          text = canvas;
          canvas = void 0;
        }
        return new Promise(function(resolve, reject) {
          try {
            const data = QRCode2.create(text, opts);
            resolve(renderFunc(data, canvas, opts));
          } catch (e3) {
            reject(e3);
          }
        });
      }
      try {
        const data = QRCode2.create(text, opts);
        cb(null, renderFunc(data, canvas, opts));
      } catch (e3) {
        cb(e3);
      }
    }
    exports.create = QRCode2.create;
    exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
    exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
    exports.toString = renderCanvas.bind(null, function(data, _, opts) {
      return SvgRenderer.render(data, opts);
    });
  }
});

// node_modules/.pnpm/@babel+runtime@7.22.11/node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof(o);
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/toInteger/index.js
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }
  var number = Number(dirtyNumber);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/requiredArgs/index.js
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
  }
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/toDate/index.js
function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || _typeof(argument) === "object" && argStr === "[object Date]") {
    return new Date(argument.getTime());
  } else if (typeof argument === "number" || argStr === "[object Number]") {
    return new Date(argument);
  } else {
    if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
      console.warn(new Error().stack);
    }
    return /* @__PURE__ */ new Date(NaN);
  }
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/addDays/index.js
function addDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);
  if (isNaN(amount)) {
    return /* @__PURE__ */ new Date(NaN);
  }
  if (!amount) {
    return date;
  }
  date.setDate(date.getDate() + amount);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/addMonths/index.js
function addMonths(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);
  if (isNaN(amount)) {
    return /* @__PURE__ */ new Date(NaN);
  }
  if (!amount) {
    return date;
  }
  var dayOfMonth = date.getDate();
  var endOfDesiredMonth = new Date(date.getTime());
  endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
  var daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    return endOfDesiredMonth;
  } else {
    date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
    return date;
  }
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/add/index.js
function add(dirtyDate, duration) {
  requiredArgs(2, arguments);
  if (!duration || _typeof(duration) !== "object")
    return /* @__PURE__ */ new Date(NaN);
  var years = duration.years ? toInteger(duration.years) : 0;
  var months = duration.months ? toInteger(duration.months) : 0;
  var weeks = duration.weeks ? toInteger(duration.weeks) : 0;
  var days = duration.days ? toInteger(duration.days) : 0;
  var hours = duration.hours ? toInteger(duration.hours) : 0;
  var minutes = duration.minutes ? toInteger(duration.minutes) : 0;
  var seconds = duration.seconds ? toInteger(duration.seconds) : 0;
  var date = toDate(dirtyDate);
  var dateWithMonths = months || years ? addMonths(date, months + years * 12) : date;
  var dateWithDays = days || weeks ? addDays(dateWithMonths, days + weeks * 7) : dateWithMonths;
  var minutesToAdd = minutes + hours * 60;
  var secondsToAdd = seconds + minutesToAdd * 60;
  var msToAdd = secondsToAdd * 1e3;
  var finalDate = new Date(dateWithDays.getTime() + msToAdd);
  return finalDate;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/addMilliseconds/index.js
function addMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var timestamp = toDate(dirtyDate).getTime();
  var amount = toInteger(dirtyAmount);
  return new Date(timestamp + amount);
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/defaultOptions/index.js
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/startOfWeek/index.js
function startOfWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/startOfISOWeek/index.js
function startOfISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  return startOfWeek(dirtyDate, {
    weekStartsOn: 1
  });
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getISOWeekYear/index.js
function getISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var fourthOfJanuaryOfNextYear = /* @__PURE__ */ new Date(0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  var startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = /* @__PURE__ */ new Date(0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  var startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/startOfISOWeekYear/index.js
function startOfISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var year = getISOWeekYear(dirtyDate);
  var fourthOfJanuary = /* @__PURE__ */ new Date(0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  var date = startOfISOWeek(fourthOfJanuary);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/startOfDay/index.js
function startOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/differenceInCalendarDays/index.js
var MILLISECONDS_IN_DAY = 864e5;
function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var startOfDayLeft = startOfDay(dirtyDateLeft);
  var startOfDayRight = startOfDay(dirtyDateRight);
  var timestampLeft = startOfDayLeft.getTime() - getTimezoneOffsetInMilliseconds(startOfDayLeft);
  var timestampRight = startOfDayRight.getTime() - getTimezoneOffsetInMilliseconds(startOfDayRight);
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/addYears/index.js
function addYears(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMonths(dirtyDate, amount * 12);
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/constants/index.js
var daysInYear = 365.2425;
var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
var millisecondsInMinute = 6e4;
var millisecondsInHour = 36e5;
var millisecondsInSecond = 1e3;
var minTime = -maxTime;
var secondsInHour = 3600;
var secondsInDay = secondsInHour * 24;
var secondsInWeek = secondsInDay * 7;
var secondsInYear = secondsInDay * daysInYear;
var secondsInMonth = secondsInYear / 12;
var secondsInQuarter = secondsInMonth * 3;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/isDate/index.js
function isDate(value) {
  requiredArgs(1, arguments);
  return value instanceof Date || _typeof(value) === "object" && Object.prototype.toString.call(value) === "[object Date]";
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/isValid/index.js
function isValid(dirtyDate) {
  requiredArgs(1, arguments);
  if (!isDate(dirtyDate) && typeof dirtyDate !== "number") {
    return false;
  }
  var date = toDate(dirtyDate);
  return !isNaN(Number(date));
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/eachDayOfInterval/index.js
function eachDayOfInterval(dirtyInterval, options) {
  var _options$step;
  requiredArgs(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = toDate(interval.start);
  var endDate = toDate(interval.end);
  var endTime = endDate.getTime();
  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError("Invalid interval");
  }
  var dates = [];
  var currentDate = startDate;
  currentDate.setHours(0, 0, 0, 0);
  var step = Number((_options$step = options === null || options === void 0 ? void 0 : options.step) !== null && _options$step !== void 0 ? _options$step : 1);
  if (step < 1 || isNaN(step))
    throw new RangeError("`options.step` must be a number greater than 1");
  while (currentDate.getTime() <= endTime) {
    dates.push(toDate(currentDate));
    currentDate.setDate(currentDate.getDate() + step);
    currentDate.setHours(0, 0, 0, 0);
  }
  return dates;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/endOfWeek/index.js
function endOfWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  date.setDate(date.getDate() + diff);
  date.setHours(23, 59, 59, 999);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/subMilliseconds/index.js
function subMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMilliseconds(dirtyDate, -amount);
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/getUTCDayOfYear/index.js
var MILLISECONDS_IN_DAY2 = 864e5;
function getUTCDayOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var timestamp = date.getTime();
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date.getTime();
  var difference = timestamp - startOfYearTimestamp;
  return Math.floor(difference / MILLISECONDS_IN_DAY2) + 1;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js
function startOfUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var weekStartsOn = 1;
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js
function getUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var fourthOfJanuaryOfNextYear = /* @__PURE__ */ new Date(0);
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = /* @__PURE__ */ new Date(0);
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/startOfUTCISOWeekYear/index.js
function startOfUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var year = getUTCISOWeekYear(dirtyDate);
  var fourthOfJanuary = /* @__PURE__ */ new Date(0);
  fourthOfJanuary.setUTCFullYear(year, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCISOWeek(fourthOfJanuary);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js
var MILLISECONDS_IN_WEEK = 6048e5;
function getUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCISOWeek(date).getTime() - startOfUTCISOWeekYear(date).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js
function startOfUTCWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js
function getUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var firstWeekOfNextYear = /* @__PURE__ */ new Date(0);
  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, options);
  var firstWeekOfThisYear = /* @__PURE__ */ new Date(0);
  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, options);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/startOfUTCWeekYear/index.js
function startOfUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  var year = getUTCWeekYear(dirtyDate, options);
  var firstWeek = /* @__PURE__ */ new Date(0);
  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCWeek(firstWeek, options);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/getUTCWeek/index.js
var MILLISECONDS_IN_WEEK2 = 6048e5;
function getUTCWeek(dirtyDate, options) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCWeek(date, options).getTime() - startOfUTCWeekYear(date, options).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK2) + 1;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/addLeadingZeros/index.js
function addLeadingZeros(number, targetLength) {
  var sign = number < 0 ? "-" : "";
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = "0" + output;
  }
  return sign + output;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/format/lightFormatters/index.js
var formatters = {
  // Year
  y: function y(date, token) {
    var signedYear = date.getUTCFullYear();
    var year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  // Month
  M: function M(date, token) {
    var month = date.getUTCMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d: function d(date, token) {
    return addLeadingZeros(date.getUTCDate(), token.length);
  },
  // AM or PM
  a: function a(date, token) {
    var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h: function h2(date, token) {
    return addLeadingZeros(date.getUTCHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H: function H(date, token) {
    return addLeadingZeros(date.getUTCHours(), token.length);
  },
  // Minute
  m: function m(date, token) {
    return addLeadingZeros(date.getUTCMinutes(), token.length);
  },
  // Second
  s: function s(date, token) {
    return addLeadingZeros(date.getUTCSeconds(), token.length);
  },
  // Fraction of second
  S: function S(date, token) {
    var numberOfDigits = token.length;
    var milliseconds2 = date.getUTCMilliseconds();
    var fractionalSeconds = Math.floor(milliseconds2 * Math.pow(10, numberOfDigits - 3));
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};
var lightFormatters_default = formatters;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/format/formatters/index.js
var dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
var formatters2 = {
  // Era
  G: function G(date, token, localize2) {
    var era = date.getUTCFullYear() > 0 ? 1 : 0;
    switch (token) {
      case "G":
      case "GG":
      case "GGG":
        return localize2.era(era, {
          width: "abbreviated"
        });
      case "GGGGG":
        return localize2.era(era, {
          width: "narrow"
        });
      case "GGGG":
      default:
        return localize2.era(era, {
          width: "wide"
        });
    }
  },
  // Year
  y: function y2(date, token, localize2) {
    if (token === "yo") {
      var signedYear = date.getUTCFullYear();
      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize2.ordinalNumber(year, {
        unit: "year"
      });
    }
    return lightFormatters_default.y(date, token);
  },
  // Local week-numbering year
  Y: function Y(date, token, localize2, options) {
    var signedWeekYear = getUTCWeekYear(date, options);
    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      var twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize2.ordinalNumber(weekYear, {
        unit: "year"
      });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function R(date, token) {
    var isoWeekYear = getUTCISOWeekYear(date);
    return addLeadingZeros(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function u(date, token) {
    var year = date.getUTCFullYear();
    return addLeadingZeros(year, token.length);
  },
  // Quarter
  Q: function Q(date, token, localize2) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      case "Q":
        return String(quarter);
      case "QQ":
        return addLeadingZeros(quarter, 2);
      case "Qo":
        return localize2.ordinalNumber(quarter, {
          unit: "quarter"
        });
      case "QQQ":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function q(date, token, localize2) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      case "q":
        return String(quarter);
      case "qq":
        return addLeadingZeros(quarter, 2);
      case "qo":
        return localize2.ordinalNumber(quarter, {
          unit: "quarter"
        });
      case "qqq":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function M2(date, token, localize2) {
    var month = date.getUTCMonth();
    switch (token) {
      case "M":
      case "MM":
        return lightFormatters_default.M(date, token);
      case "Mo":
        return localize2.ordinalNumber(month + 1, {
          unit: "month"
        });
      case "MMM":
        return localize2.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return localize2.month(month, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return localize2.month(month, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone month
  L: function L(date, token, localize2) {
    var month = date.getUTCMonth();
    switch (token) {
      case "L":
        return String(month + 1);
      case "LL":
        return addLeadingZeros(month + 1, 2);
      case "Lo":
        return localize2.ordinalNumber(month + 1, {
          unit: "month"
        });
      case "LLL":
        return localize2.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return localize2.month(month, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return localize2.month(month, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Local week of year
  w: function w(date, token, localize2, options) {
    var week = getUTCWeek(date, options);
    if (token === "wo") {
      return localize2.ordinalNumber(week, {
        unit: "week"
      });
    }
    return addLeadingZeros(week, token.length);
  },
  // ISO week of year
  I: function I(date, token, localize2) {
    var isoWeek = getUTCISOWeek(date);
    if (token === "Io") {
      return localize2.ordinalNumber(isoWeek, {
        unit: "week"
      });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  // Day of the month
  d: function d2(date, token, localize2) {
    if (token === "do") {
      return localize2.ordinalNumber(date.getUTCDate(), {
        unit: "date"
      });
    }
    return lightFormatters_default.d(date, token);
  },
  // Day of year
  D: function D(date, token, localize2) {
    var dayOfYear = getUTCDayOfYear(date);
    if (token === "Do") {
      return localize2.ordinalNumber(dayOfYear, {
        unit: "dayOfYear"
      });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  // Day of week
  E: function E(date, token, localize2) {
    var dayOfWeek = date.getUTCDay();
    switch (token) {
      case "E":
      case "EE":
      case "EEE":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function e(date, token, localize2, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "e":
        return String(localDayOfWeek);
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      case "eo":
        return localize2.ordinalNumber(localDayOfWeek, {
          unit: "day"
        });
      case "eee":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function c(date, token, localize2, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "c":
        return String(localDayOfWeek);
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      case "co":
        return localize2.ordinalNumber(localDayOfWeek, {
          unit: "day"
        });
      case "ccc":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function i(date, token, localize2) {
    var dayOfWeek = date.getUTCDay();
    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      case "i":
        return String(isoDayOfWeek);
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      case "io":
        return localize2.ordinalNumber(isoDayOfWeek, {
          unit: "day"
        });
      case "iii":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function a2(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function b(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function B(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function h3(date, token, localize2) {
    if (token === "ho") {
      var hours = date.getUTCHours() % 12;
      if (hours === 0)
        hours = 12;
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return lightFormatters_default.h(date, token);
  },
  // Hour [0-23]
  H: function H2(date, token, localize2) {
    if (token === "Ho") {
      return localize2.ordinalNumber(date.getUTCHours(), {
        unit: "hour"
      });
    }
    return lightFormatters_default.H(date, token);
  },
  // Hour [0-11]
  K: function K(date, token, localize2) {
    var hours = date.getUTCHours() % 12;
    if (token === "Ko") {
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Hour [1-24]
  k: function k(date, token, localize2) {
    var hours = date.getUTCHours();
    if (hours === 0)
      hours = 24;
    if (token === "ko") {
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Minute
  m: function m2(date, token, localize2) {
    if (token === "mo") {
      return localize2.ordinalNumber(date.getUTCMinutes(), {
        unit: "minute"
      });
    }
    return lightFormatters_default.m(date, token);
  },
  // Second
  s: function s2(date, token, localize2) {
    if (token === "so") {
      return localize2.ordinalNumber(date.getUTCSeconds(), {
        unit: "second"
      });
    }
    return lightFormatters_default.s(date, token);
  },
  // Fraction of second
  S: function S2(date, token) {
    return lightFormatters_default.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function X(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      case "XXXXX":
      case "XXX":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function x(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      case "xxxxx":
      case "xxx":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (GMT)
  O: function O(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (specific non-location)
  z: function z(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Seconds timestamp
  t: function t(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = Math.floor(originalDate.getTime() / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function T(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = originalDate.getTime();
    return addLeadingZeros(timestamp, token.length);
  }
};
function formatTimezoneShort(offset, dirtyDelimiter) {
  var sign = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  var delimiter = dirtyDelimiter || "";
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
  if (offset % 60 === 0) {
    var sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, dirtyDelimiter);
}
function formatTimezone(offset, dirtyDelimiter) {
  var delimiter = dirtyDelimiter || "";
  var sign = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
  var minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}
var formatters_default = formatters2;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/format/longFormatters/index.js
var dateLongFormatter = function dateLongFormatter2(pattern, formatLong2) {
  switch (pattern) {
    case "P":
      return formatLong2.date({
        width: "short"
      });
    case "PP":
      return formatLong2.date({
        width: "medium"
      });
    case "PPP":
      return formatLong2.date({
        width: "long"
      });
    case "PPPP":
    default:
      return formatLong2.date({
        width: "full"
      });
  }
};
var timeLongFormatter = function timeLongFormatter2(pattern, formatLong2) {
  switch (pattern) {
    case "p":
      return formatLong2.time({
        width: "short"
      });
    case "pp":
      return formatLong2.time({
        width: "medium"
      });
    case "ppp":
      return formatLong2.time({
        width: "long"
      });
    case "pppp":
    default:
      return formatLong2.time({
        width: "full"
      });
  }
};
var dateTimeLongFormatter = function dateTimeLongFormatter2(pattern, formatLong2) {
  var matchResult = pattern.match(/(P+)(p+)?/) || [];
  var datePattern = matchResult[1];
  var timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong2);
  }
  var dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong2.dateTime({
        width: "short"
      });
      break;
    case "PP":
      dateTimeFormat = formatLong2.dateTime({
        width: "medium"
      });
      break;
    case "PPP":
      dateTimeFormat = formatLong2.dateTime({
        width: "long"
      });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong2.dateTime({
        width: "full"
      });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
};
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};
var longFormatters_default = longFormatters;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/protectedTokens/index.js
var protectedDayOfYearTokens = ["D", "DD"];
var protectedWeekYearTokens = ["YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return protectedDayOfYearTokens.indexOf(token) !== -1;
}
function isProtectedWeekYearToken(token) {
  return protectedWeekYearTokens.indexOf(token) !== -1;
}
function throwProtectedError(token, format2, input) {
  if (token === "YYYY") {
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "YY") {
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "D") {
    throw new RangeError("Use `d` instead of `D` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "DD") {
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  }
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
var formatDistance = function formatDistance2(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};
var formatDistance_default = formatDistance;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js
function buildFormatLongFn(args) {
  return function() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js
var dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};
var formatLong_default = formatLong;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative = function formatRelative2(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};
var formatRelative_default = formatRelative;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js
function buildLocalizeFn(args) {
  return function(dirtyIndex, options) {
    var context = options !== null && options !== void 0 && options.context ? String(options.context) : "standalone";
    var valuesArray;
    if (context === "formatting" && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;
      var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }
    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    return valuesArray[index];
  };
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js
var eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
var monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};
var dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
};
var dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
var ordinalNumber = function ordinalNumber2(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
var localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};
var localize_default = localize;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js
function buildMatchFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js
function buildMatchPatternFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult)
      return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult)
      return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/locale/en-US/_lib/match/index.js
var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function valueCallback(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: function valueCallback2(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};
var match_default = match;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/locale/en-US/index.js
var locale = {
  code: "en-US",
  formatDistance: formatDistance_default,
  formatLong: formatLong_default,
  formatRelative: formatRelative_default,
  localize: localize_default,
  match: match_default,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var en_US_default = locale;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/defaultLocale/index.js
var defaultLocale_default = en_US_default;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/format/index.js
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(dirtyDate, dirtyFormatStr, options) {
  var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
  requiredArgs(2, arguments);
  var formatStr = String(dirtyFormatStr);
  var defaultOptions2 = getDefaultOptions();
  var locale2 = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions2.locale) !== null && _ref !== void 0 ? _ref : defaultLocale_default;
  var firstWeekContainsDate = toInteger((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions2.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var weekStartsOn = toInteger((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions2.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions2.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  if (!locale2.localize) {
    throw new RangeError("locale must contain localize property");
  }
  if (!locale2.formatLong) {
    throw new RangeError("locale must contain formatLong property");
  }
  var originalDate = toDate(dirtyDate);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
  var utcDate = subMilliseconds(originalDate, timezoneOffset);
  var formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale: locale2,
    _originalDate: originalDate
  };
  var result = formatStr.match(longFormattingTokensRegExp).map(function(substring) {
    var firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      var longFormatter = longFormatters_default[firstCharacter];
      return longFormatter(substring, locale2.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp).map(function(substring) {
    if (substring === "''") {
      return "'";
    }
    var firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return cleanEscapedString(substring);
    }
    var formatter = formatters_default[firstCharacter];
    if (formatter) {
      if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
      }
      if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
      }
      return formatter(utcDate, substring, locale2.localize, formatterOptions);
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
    }
    return substring;
  }).join("");
  return result;
}
function cleanEscapedString(input) {
  var matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/assign/index.js
function assign(target, object) {
  if (target == null) {
    throw new TypeError("assign requires that input parameter not be null or undefined");
  }
  for (var property in object) {
    if (Object.prototype.hasOwnProperty.call(object, property)) {
      ;
      target[property] = object[property];
    }
  }
  return target;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/formatDistanceStrict/index.js
var MILLISECONDS_IN_MINUTE = 1e3 * 60;
var MINUTES_IN_DAY = 60 * 24;
var MINUTES_IN_MONTH = MINUTES_IN_DAY * 30;
var MINUTES_IN_YEAR = MINUTES_IN_DAY * 365;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getDay/index.js
function getDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var day = date.getDay();
  return day;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getDaysInMonth/index.js
function getDaysInMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var monthIndex = date.getMonth();
  var lastDayOfMonth2 = /* @__PURE__ */ new Date(0);
  lastDayOfMonth2.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth2.setHours(0, 0, 0, 0);
  return lastDayOfMonth2.getDate();
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getHours/index.js
function getHours(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var hours = date.getHours();
  return hours;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getISOWeek/index.js
var MILLISECONDS_IN_WEEK3 = 6048e5;
function getISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfISOWeek(date).getTime() - startOfISOWeekYear(date).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK3) + 1;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getMinutes/index.js
function getMinutes(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var minutes = date.getMinutes();
  return minutes;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getMonth/index.js
function getMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var month = date.getMonth();
  return month;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getOverlappingDaysInIntervals/index.js
var MILLISECONDS_IN_DAY3 = 24 * 60 * 60 * 1e3;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getSeconds/index.js
function getSeconds(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var seconds = date.getSeconds();
  return seconds;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getWeekYear/index.js
function getWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var firstWeekOfNextYear = /* @__PURE__ */ new Date(0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  var startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
  var firstWeekOfThisYear = /* @__PURE__ */ new Date(0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  var startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/startOfWeekYear/index.js
function startOfWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  var year = getWeekYear(dirtyDate, options);
  var firstWeek = /* @__PURE__ */ new Date(0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  var date = startOfWeek(firstWeek, options);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getWeek/index.js
var MILLISECONDS_IN_WEEK4 = 6048e5;
function getWeek(dirtyDate, options) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfWeek(date, options).getTime() - startOfWeekYear(date, options).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK4) + 1;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getYear/index.js
function getYear(dirtyDate) {
  requiredArgs(1, arguments);
  return toDate(dirtyDate).getFullYear();
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/isAfter/index.js
function isAfter(dirtyDate, dirtyDateToCompare) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var dateToCompare = toDate(dirtyDateToCompare);
  return date.getTime() > dateToCompare.getTime();
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/isBefore/index.js
function isBefore(dirtyDate, dirtyDateToCompare) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var dateToCompare = toDate(dirtyDateToCompare);
  return date.getTime() < dateToCompare.getTime();
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/isEqual/index.js
function isEqual(dirtyLeftDate, dirtyRightDate) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyLeftDate);
  var dateRight = toDate(dirtyRightDate);
  return dateLeft.getTime() === dateRight.getTime();
}

// node_modules/.pnpm/@babel+runtime@7.22.11/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i3 = 0, arr2 = new Array(len); i3 < len; i3++)
    arr2[i3] = arr[i3];
  return arr2;
}

// node_modules/.pnpm/@babel+runtime@7.22.11/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

// node_modules/.pnpm/@babel+runtime@7.22.11/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it2 = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it2) {
    if (Array.isArray(o) || (it2 = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it2)
        o = it2;
      var i3 = 0;
      var F = function F3() {
      };
      return {
        s: F,
        n: function n() {
          if (i3 >= o.length)
            return {
              done: true
            };
          return {
            done: false,
            value: o[i3++]
          };
        },
        e: function e3(_e2) {
          throw _e2;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return {
    s: function s3() {
      it2 = it2.call(o);
    },
    n: function n() {
      var step = it2.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e3(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it2["return"] != null)
          it2["return"]();
      } finally {
        if (didErr)
          throw err;
      }
    }
  };
}

// node_modules/.pnpm/@babel+runtime@7.22.11/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

// node_modules/.pnpm/@babel+runtime@7.22.11/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o3, p3) {
    o3.__proto__ = p3;
    return o3;
  };
  return _setPrototypeOf(o, p);
}

// node_modules/.pnpm/@babel+runtime@7.22.11/node_modules/@babel/runtime/helpers/esm/inherits.js
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}

// node_modules/.pnpm/@babel+runtime@7.22.11/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o3) {
    return o3.__proto__ || Object.getPrototypeOf(o3);
  };
  return _getPrototypeOf(o);
}

// node_modules/.pnpm/@babel+runtime@7.22.11/node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e3) {
    return false;
  }
}

// node_modules/.pnpm/@babel+runtime@7.22.11/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

// node_modules/.pnpm/@babel+runtime@7.22.11/node_modules/@babel/runtime/helpers/esm/createSuper.js
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

// node_modules/.pnpm/@babel+runtime@7.22.11/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// node_modules/.pnpm/@babel+runtime@7.22.11/node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

// node_modules/.pnpm/@babel+runtime@7.22.11/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

// node_modules/.pnpm/@babel+runtime@7.22.11/node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i3 = 0; i3 < props.length; i3++) {
    var descriptor = props[i3];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

// node_modules/.pnpm/@babel+runtime@7.22.11/node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/Setter.js
var TIMEZONE_UNIT_PRIORITY = 10;
var Setter = function() {
  function Setter2() {
    _classCallCheck(this, Setter2);
    _defineProperty(this, "priority", void 0);
    _defineProperty(this, "subPriority", 0);
  }
  _createClass(Setter2, [{
    key: "validate",
    value: function validate(_utcDate, _options) {
      return true;
    }
  }]);
  return Setter2;
}();
var ValueSetter = function(_Setter) {
  _inherits(ValueSetter2, _Setter);
  var _super = _createSuper(ValueSetter2);
  function ValueSetter2(value, validateValue, setValue, priority, subPriority) {
    var _this;
    _classCallCheck(this, ValueSetter2);
    _this = _super.call(this);
    _this.value = value;
    _this.validateValue = validateValue;
    _this.setValue = setValue;
    _this.priority = priority;
    if (subPriority) {
      _this.subPriority = subPriority;
    }
    return _this;
  }
  _createClass(ValueSetter2, [{
    key: "validate",
    value: function validate(utcDate, options) {
      return this.validateValue(utcDate, this.value, options);
    }
  }, {
    key: "set",
    value: function set3(utcDate, flags, options) {
      return this.setValue(utcDate, flags, this.value, options);
    }
  }]);
  return ValueSetter2;
}(Setter);
var DateToSystemTimezoneSetter = function(_Setter2) {
  _inherits(DateToSystemTimezoneSetter2, _Setter2);
  var _super2 = _createSuper(DateToSystemTimezoneSetter2);
  function DateToSystemTimezoneSetter2() {
    var _this2;
    _classCallCheck(this, DateToSystemTimezoneSetter2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this2 = _super2.call.apply(_super2, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this2), "priority", TIMEZONE_UNIT_PRIORITY);
    _defineProperty(_assertThisInitialized(_this2), "subPriority", -1);
    return _this2;
  }
  _createClass(DateToSystemTimezoneSetter2, [{
    key: "set",
    value: function set3(date, flags) {
      if (flags.timestampIsSet) {
        return date;
      }
      var convertedDate = /* @__PURE__ */ new Date(0);
      convertedDate.setFullYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
      convertedDate.setHours(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
      return convertedDate;
    }
  }]);
  return DateToSystemTimezoneSetter2;
}(Setter);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/Parser.js
var Parser = function() {
  function Parser2() {
    _classCallCheck(this, Parser2);
    _defineProperty(this, "incompatibleTokens", void 0);
    _defineProperty(this, "priority", void 0);
    _defineProperty(this, "subPriority", void 0);
  }
  _createClass(Parser2, [{
    key: "run",
    value: function run(dateString, token, match2, options) {
      var result = this.parse(dateString, token, match2, options);
      if (!result) {
        return null;
      }
      return {
        setter: new ValueSetter(result.value, this.validate, this.set, this.priority, this.subPriority),
        rest: result.rest
      };
    }
  }, {
    key: "validate",
    value: function validate(_utcDate, _value, _options) {
      return true;
    }
  }]);
  return Parser2;
}();

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/EraParser.js
var EraParser = function(_Parser) {
  _inherits(EraParser2, _Parser);
  var _super = _createSuper(EraParser2);
  function EraParser2() {
    var _this;
    _classCallCheck(this, EraParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 140);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["R", "u", "t", "T"]);
    return _this;
  }
  _createClass(EraParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "G":
        case "GG":
        case "GGG":
          return match2.era(dateString, {
            width: "abbreviated"
          }) || match2.era(dateString, {
            width: "narrow"
          });
        case "GGGGG":
          return match2.era(dateString, {
            width: "narrow"
          });
        case "GGGG":
        default:
          return match2.era(dateString, {
            width: "wide"
          }) || match2.era(dateString, {
            width: "abbreviated"
          }) || match2.era(dateString, {
            width: "narrow"
          });
      }
    }
  }, {
    key: "set",
    value: function set3(date, flags, value) {
      flags.era = value;
      date.setUTCFullYear(value, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return EraParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/constants.js
var numericPatterns = {
  month: /^(1[0-2]|0?\d)/,
  // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/,
  // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/,
  // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/,
  // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/,
  // 0 to 12
  minute: /^[0-5]?\d/,
  // 0 to 59
  second: /^[0-5]?\d/,
  // 0 to 59
  singleDigit: /^\d/,
  // 0 to 9
  twoDigits: /^\d{1,2}/,
  // 0 to 99
  threeDigits: /^\d{1,3}/,
  // 0 to 999
  fourDigits: /^\d{1,4}/,
  // 0 to 9999
  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/,
  // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/,
  // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/
  // 0 to 9999, -0 to -9999
};
var timezonePatterns = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/utils.js
function mapValue(parseFnResult, mapFn) {
  if (!parseFnResult) {
    return parseFnResult;
  }
  return {
    value: mapFn(parseFnResult.value),
    rest: parseFnResult.rest
  };
}
function parseNumericPattern(pattern, dateString) {
  var matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  return {
    value: parseInt(matchResult[0], 10),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseTimezonePattern(pattern, dateString) {
  var matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  if (matchResult[0] === "Z") {
    return {
      value: 0,
      rest: dateString.slice(1)
    };
  }
  var sign = matchResult[1] === "+" ? 1 : -1;
  var hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
  var minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
  var seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;
  return {
    value: sign * (hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * millisecondsInSecond),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseAnyDigitsSigned(dateString) {
  return parseNumericPattern(numericPatterns.anyDigitsSigned, dateString);
}
function parseNDigits(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigit, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigits, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigits, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigits, dateString);
    default:
      return parseNumericPattern(new RegExp("^\\d{1," + n + "}"), dateString);
  }
}
function parseNDigitsSigned(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigitSigned, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigitsSigned, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigitsSigned, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigitsSigned, dateString);
    default:
      return parseNumericPattern(new RegExp("^-?\\d{1," + n + "}"), dateString);
  }
}
function dayPeriodEnumToHours(dayPeriod) {
  switch (dayPeriod) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}
function normalizeTwoDigitYear(twoDigitYear, currentYear) {
  var isCommonEra = currentYear > 0;
  var absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;
  var result;
  if (absCurrentYear <= 50) {
    result = twoDigitYear || 100;
  } else {
    var rangeEnd = absCurrentYear + 50;
    var rangeEndCentury = Math.floor(rangeEnd / 100) * 100;
    var isPreviousCentury = twoDigitYear >= rangeEnd % 100;
    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
  }
  return isCommonEra ? result : 1 - result;
}
function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/YearParser.js
var YearParser = function(_Parser) {
  _inherits(YearParser2, _Parser);
  var _super = _createSuper(YearParser2);
  function YearParser2() {
    var _this;
    _classCallCheck(this, YearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 130);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(YearParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback3 = function valueCallback4(year) {
        return {
          year,
          isTwoDigitYear: token === "yy"
        };
      };
      switch (token) {
        case "y":
          return mapValue(parseNDigits(4, dateString), valueCallback3);
        case "yo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "year"
          }), valueCallback3);
        default:
          return mapValue(parseNDigits(token.length, dateString), valueCallback3);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value.isTwoDigitYear || value.year > 0;
    }
  }, {
    key: "set",
    value: function set3(date, flags, value) {
      var currentYear = date.getUTCFullYear();
      if (value.isTwoDigitYear) {
        var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
        date.setUTCFullYear(normalizedTwoDigitYear, 0, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }
      var year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date.setUTCFullYear(year, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return YearParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/LocalWeekYearParser.js
var LocalWeekYearParser = function(_Parser) {
  _inherits(LocalWeekYearParser2, _Parser);
  var _super = _createSuper(LocalWeekYearParser2);
  function LocalWeekYearParser2() {
    var _this;
    _classCallCheck(this, LocalWeekYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 130);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["y", "R", "u", "Q", "q", "M", "L", "I", "d", "D", "i", "t", "T"]);
    return _this;
  }
  _createClass(LocalWeekYearParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback3 = function valueCallback4(year) {
        return {
          year,
          isTwoDigitYear: token === "YY"
        };
      };
      switch (token) {
        case "Y":
          return mapValue(parseNDigits(4, dateString), valueCallback3);
        case "Yo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "year"
          }), valueCallback3);
        default:
          return mapValue(parseNDigits(token.length, dateString), valueCallback3);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value.isTwoDigitYear || value.year > 0;
    }
  }, {
    key: "set",
    value: function set3(date, flags, value, options) {
      var currentYear = getUTCWeekYear(date, options);
      if (value.isTwoDigitYear) {
        var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
        date.setUTCFullYear(normalizedTwoDigitYear, 0, options.firstWeekContainsDate);
        date.setUTCHours(0, 0, 0, 0);
        return startOfUTCWeek(date, options);
      }
      var year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date.setUTCFullYear(year, 0, options.firstWeekContainsDate);
      date.setUTCHours(0, 0, 0, 0);
      return startOfUTCWeek(date, options);
    }
  }]);
  return LocalWeekYearParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/ISOWeekYearParser.js
var ISOWeekYearParser = function(_Parser) {
  _inherits(ISOWeekYearParser2, _Parser);
  var _super = _createSuper(ISOWeekYearParser2);
  function ISOWeekYearParser2() {
    var _this;
    _classCallCheck(this, ISOWeekYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 130);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["G", "y", "Y", "u", "Q", "q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(ISOWeekYearParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      if (token === "R") {
        return parseNDigitsSigned(4, dateString);
      }
      return parseNDigitsSigned(token.length, dateString);
    }
  }, {
    key: "set",
    value: function set3(_date, _flags, value) {
      var firstWeekOfYear = /* @__PURE__ */ new Date(0);
      firstWeekOfYear.setUTCFullYear(value, 0, 4);
      firstWeekOfYear.setUTCHours(0, 0, 0, 0);
      return startOfUTCISOWeek(firstWeekOfYear);
    }
  }]);
  return ISOWeekYearParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/ExtendedYearParser.js
var ExtendedYearParser = function(_Parser) {
  _inherits(ExtendedYearParser2, _Parser);
  var _super = _createSuper(ExtendedYearParser2);
  function ExtendedYearParser2() {
    var _this;
    _classCallCheck(this, ExtendedYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 130);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(ExtendedYearParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      if (token === "u") {
        return parseNDigitsSigned(4, dateString);
      }
      return parseNDigitsSigned(token.length, dateString);
    }
  }, {
    key: "set",
    value: function set3(date, _flags, value) {
      date.setUTCFullYear(value, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return ExtendedYearParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/QuarterParser.js
var QuarterParser = function(_Parser) {
  _inherits(QuarterParser2, _Parser);
  var _super = _createSuper(QuarterParser2);
  function QuarterParser2() {
    var _this;
    _classCallCheck(this, QuarterParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 120);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["Y", "R", "q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(QuarterParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "Q":
        case "QQ":
          return parseNDigits(token.length, dateString);
        case "Qo":
          return match2.ordinalNumber(dateString, {
            unit: "quarter"
          });
        case "QQQ":
          return match2.quarter(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQQ":
          return match2.quarter(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQ":
        default:
          return match2.quarter(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.quarter(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 4;
    }
  }, {
    key: "set",
    value: function set3(date, _flags, value) {
      date.setUTCMonth((value - 1) * 3, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return QuarterParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/StandAloneQuarterParser.js
var StandAloneQuarterParser = function(_Parser) {
  _inherits(StandAloneQuarterParser2, _Parser);
  var _super = _createSuper(StandAloneQuarterParser2);
  function StandAloneQuarterParser2() {
    var _this;
    _classCallCheck(this, StandAloneQuarterParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 120);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["Y", "R", "Q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(StandAloneQuarterParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "q":
        case "qq":
          return parseNDigits(token.length, dateString);
        case "qo":
          return match2.ordinalNumber(dateString, {
            unit: "quarter"
          });
        case "qqq":
          return match2.quarter(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqqq":
          return match2.quarter(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqq":
        default:
          return match2.quarter(dateString, {
            width: "wide",
            context: "standalone"
          }) || match2.quarter(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 4;
    }
  }, {
    key: "set",
    value: function set3(date, _flags, value) {
      date.setUTCMonth((value - 1) * 3, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return StandAloneQuarterParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/MonthParser.js
var MonthParser = function(_Parser) {
  _inherits(MonthParser2, _Parser);
  var _super = _createSuper(MonthParser2);
  function MonthParser2() {
    var _this;
    _classCallCheck(this, MonthParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["Y", "R", "q", "Q", "L", "w", "I", "D", "i", "e", "c", "t", "T"]);
    _defineProperty(_assertThisInitialized(_this), "priority", 110);
    return _this;
  }
  _createClass(MonthParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback3 = function valueCallback4(value) {
        return value - 1;
      };
      switch (token) {
        case "M":
          return mapValue(parseNumericPattern(numericPatterns.month, dateString), valueCallback3);
        case "MM":
          return mapValue(parseNDigits(2, dateString), valueCallback3);
        case "Mo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "month"
          }), valueCallback3);
        case "MMM":
          return match2.month(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.month(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMMM":
          return match2.month(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMM":
        default:
          return match2.month(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.month(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.month(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 11;
    }
  }, {
    key: "set",
    value: function set3(date, _flags, value) {
      date.setUTCMonth(value, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return MonthParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/StandAloneMonthParser.js
var StandAloneMonthParser = function(_Parser) {
  _inherits(StandAloneMonthParser2, _Parser);
  var _super = _createSuper(StandAloneMonthParser2);
  function StandAloneMonthParser2() {
    var _this;
    _classCallCheck(this, StandAloneMonthParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 110);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["Y", "R", "q", "Q", "M", "w", "I", "D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(StandAloneMonthParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback3 = function valueCallback4(value) {
        return value - 1;
      };
      switch (token) {
        case "L":
          return mapValue(parseNumericPattern(numericPatterns.month, dateString), valueCallback3);
        case "LL":
          return mapValue(parseNDigits(2, dateString), valueCallback3);
        case "Lo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "month"
          }), valueCallback3);
        case "LLL":
          return match2.month(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.month(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLLL":
          return match2.month(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLL":
        default:
          return match2.month(dateString, {
            width: "wide",
            context: "standalone"
          }) || match2.month(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.month(dateString, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 11;
    }
  }, {
    key: "set",
    value: function set3(date, _flags, value) {
      date.setUTCMonth(value, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return StandAloneMonthParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/setUTCWeek/index.js
function setUTCWeek(dirtyDate, dirtyWeek, options) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var week = toInteger(dirtyWeek);
  var diff = getUTCWeek(date, options) - week;
  date.setUTCDate(date.getUTCDate() - diff * 7);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/LocalWeekParser.js
var LocalWeekParser = function(_Parser) {
  _inherits(LocalWeekParser2, _Parser);
  var _super = _createSuper(LocalWeekParser2);
  function LocalWeekParser2() {
    var _this;
    _classCallCheck(this, LocalWeekParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 100);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "i", "t", "T"]);
    return _this;
  }
  _createClass(LocalWeekParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "w":
          return parseNumericPattern(numericPatterns.week, dateString);
        case "wo":
          return match2.ordinalNumber(dateString, {
            unit: "week"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 53;
    }
  }, {
    key: "set",
    value: function set3(date, _flags, value, options) {
      return startOfUTCWeek(setUTCWeek(date, value, options), options);
    }
  }]);
  return LocalWeekParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/setUTCISOWeek/index.js
function setUTCISOWeek(dirtyDate, dirtyISOWeek) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var isoWeek = toInteger(dirtyISOWeek);
  var diff = getUTCISOWeek(date) - isoWeek;
  date.setUTCDate(date.getUTCDate() - diff * 7);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/ISOWeekParser.js
var ISOWeekParser = function(_Parser) {
  _inherits(ISOWeekParser2, _Parser);
  var _super = _createSuper(ISOWeekParser2);
  function ISOWeekParser2() {
    var _this;
    _classCallCheck(this, ISOWeekParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 100);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(ISOWeekParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "I":
          return parseNumericPattern(numericPatterns.week, dateString);
        case "Io":
          return match2.ordinalNumber(dateString, {
            unit: "week"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 53;
    }
  }, {
    key: "set",
    value: function set3(date, _flags, value) {
      return startOfUTCISOWeek(setUTCISOWeek(date, value));
    }
  }]);
  return ISOWeekParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/DateParser.js
var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DateParser = function(_Parser) {
  _inherits(DateParser2, _Parser);
  var _super = _createSuper(DateParser2);
  function DateParser2() {
    var _this;
    _classCallCheck(this, DateParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "subPriority", 1);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["Y", "R", "q", "Q", "w", "I", "D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(DateParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "d":
          return parseNumericPattern(numericPatterns.date, dateString);
        case "do":
          return match2.ordinalNumber(dateString, {
            unit: "date"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(date, value) {
      var year = date.getUTCFullYear();
      var isLeapYear2 = isLeapYearIndex(year);
      var month = date.getUTCMonth();
      if (isLeapYear2) {
        return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
      } else {
        return value >= 1 && value <= DAYS_IN_MONTH[month];
      }
    }
  }, {
    key: "set",
    value: function set3(date, _flags, value) {
      date.setUTCDate(value);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return DateParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/DayOfYearParser.js
var DayOfYearParser = function(_Parser) {
  _inherits(DayOfYearParser2, _Parser);
  var _super = _createSuper(DayOfYearParser2);
  function DayOfYearParser2() {
    var _this;
    _classCallCheck(this, DayOfYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "subpriority", 1);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["Y", "R", "q", "Q", "M", "L", "w", "I", "d", "E", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(DayOfYearParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "D":
        case "DD":
          return parseNumericPattern(numericPatterns.dayOfYear, dateString);
        case "Do":
          return match2.ordinalNumber(dateString, {
            unit: "date"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(date, value) {
      var year = date.getUTCFullYear();
      var isLeapYear2 = isLeapYearIndex(year);
      if (isLeapYear2) {
        return value >= 1 && value <= 366;
      } else {
        return value >= 1 && value <= 365;
      }
    }
  }, {
    key: "set",
    value: function set3(date, _flags, value) {
      date.setUTCMonth(0, value);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return DayOfYearParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/setUTCDay/index.js
function setUTCDay(dirtyDate, dirtyDay, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(2, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = toInteger(dirtyDay);
  var currentDay = date.getUTCDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/DayParser.js
var DayParser = function(_Parser) {
  _inherits(DayParser2, _Parser);
  var _super = _createSuper(DayParser2);
  function DayParser2() {
    var _this;
    _classCallCheck(this, DayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(DayParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "E":
        case "EE":
        case "EEE":
          return match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEE":
          return match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEEE":
          return match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEE":
        default:
          return match2.day(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 6;
    }
  }, {
    key: "set",
    value: function set3(date, _flags, value, options) {
      date = setUTCDay(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return DayParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/LocalDayParser.js
var LocalDayParser = function(_Parser) {
  _inherits(LocalDayParser2, _Parser);
  var _super = _createSuper(LocalDayParser2);
  function LocalDayParser2() {
    var _this;
    _classCallCheck(this, LocalDayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "c", "t", "T"]);
    return _this;
  }
  _createClass(LocalDayParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2, options) {
      var valueCallback3 = function valueCallback4(value) {
        var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
      };
      switch (token) {
        case "e":
        case "ee":
          return mapValue(parseNDigits(token.length, dateString), valueCallback3);
        case "eo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "day"
          }), valueCallback3);
        case "eee":
          return match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeee":
          return match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeeee":
          return match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "eeee":
        default:
          return match2.day(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 6;
    }
  }, {
    key: "set",
    value: function set3(date, _flags, value, options) {
      date = setUTCDay(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return LocalDayParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/StandAloneLocalDayParser.js
var StandAloneLocalDayParser = function(_Parser) {
  _inherits(StandAloneLocalDayParser2, _Parser);
  var _super = _createSuper(StandAloneLocalDayParser2);
  function StandAloneLocalDayParser2() {
    var _this;
    _classCallCheck(this, StandAloneLocalDayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "e", "t", "T"]);
    return _this;
  }
  _createClass(StandAloneLocalDayParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2, options) {
      var valueCallback3 = function valueCallback4(value) {
        var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
      };
      switch (token) {
        case "c":
        case "cc":
          return mapValue(parseNDigits(token.length, dateString), valueCallback3);
        case "co":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "day"
          }), valueCallback3);
        case "ccc":
          return match2.day(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "short",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "ccccc":
          return match2.day(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "cccccc":
          return match2.day(dateString, {
            width: "short",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "cccc":
        default:
          return match2.day(dateString, {
            width: "wide",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "short",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 6;
    }
  }, {
    key: "set",
    value: function set3(date, _flags, value, options) {
      date = setUTCDay(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return StandAloneLocalDayParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/setUTCISODay/index.js
function setUTCISODay(dirtyDate, dirtyDay) {
  requiredArgs(2, arguments);
  var day = toInteger(dirtyDay);
  if (day % 7 === 0) {
    day = day - 7;
  }
  var weekStartsOn = 1;
  var date = toDate(dirtyDate);
  var currentDay = date.getUTCDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/ISODayParser.js
var ISODayParser = function(_Parser) {
  _inherits(ISODayParser2, _Parser);
  var _super = _createSuper(ISODayParser2);
  function ISODayParser2() {
    var _this;
    _classCallCheck(this, ISODayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "E", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(ISODayParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback3 = function valueCallback4(value) {
        if (value === 0) {
          return 7;
        }
        return value;
      };
      switch (token) {
        case "i":
        case "ii":
          return parseNDigits(token.length, dateString);
        case "io":
          return match2.ordinalNumber(dateString, {
            unit: "day"
          });
        case "iii":
          return mapValue(match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }), valueCallback3);
        case "iiiii":
          return mapValue(match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }), valueCallback3);
        case "iiiiii":
          return mapValue(match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }), valueCallback3);
        case "iiii":
        default:
          return mapValue(match2.day(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }), valueCallback3);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 7;
    }
  }, {
    key: "set",
    value: function set3(date, _flags, value) {
      date = setUTCISODay(date, value);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return ISODayParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/AMPMParser.js
var AMPMParser = function(_Parser) {
  _inherits(AMPMParser2, _Parser);
  var _super = _createSuper(AMPMParser2);
  function AMPMParser2() {
    var _this;
    _classCallCheck(this, AMPMParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 80);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
    return _this;
  }
  _createClass(AMPMParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "a":
        case "aa":
        case "aaa":
          return match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaaa":
          return match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaa":
        default:
          return match2.dayPeriod(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function set3(date, _flags, value) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    }
  }]);
  return AMPMParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/AMPMMidnightParser.js
var AMPMMidnightParser = function(_Parser) {
  _inherits(AMPMMidnightParser2, _Parser);
  var _super = _createSuper(AMPMMidnightParser2);
  function AMPMMidnightParser2() {
    var _this;
    _classCallCheck(this, AMPMMidnightParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 80);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
    return _this;
  }
  _createClass(AMPMMidnightParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "b":
        case "bb":
        case "bbb":
          return match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbbb":
          return match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbb":
        default:
          return match2.dayPeriod(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function set3(date, _flags, value) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    }
  }]);
  return AMPMMidnightParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/DayPeriodParser.js
var DayPeriodParser = function(_Parser) {
  _inherits(DayPeriodParser2, _Parser);
  var _super = _createSuper(DayPeriodParser2);
  function DayPeriodParser2() {
    var _this;
    _classCallCheck(this, DayPeriodParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 80);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["a", "b", "t", "T"]);
    return _this;
  }
  _createClass(DayPeriodParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "B":
        case "BB":
        case "BBB":
          return match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBBB":
          return match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBB":
        default:
          return match2.dayPeriod(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function set3(date, _flags, value) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    }
  }]);
  return DayPeriodParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/Hour1to12Parser.js
var Hour1to12Parser = function(_Parser) {
  _inherits(Hour1to12Parser2, _Parser);
  var _super = _createSuper(Hour1to12Parser2);
  function Hour1to12Parser2() {
    var _this;
    _classCallCheck(this, Hour1to12Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 70);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["H", "K", "k", "t", "T"]);
    return _this;
  }
  _createClass(Hour1to12Parser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "h":
          return parseNumericPattern(numericPatterns.hour12h, dateString);
        case "ho":
          return match2.ordinalNumber(dateString, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 12;
    }
  }, {
    key: "set",
    value: function set3(date, _flags, value) {
      var isPM = date.getUTCHours() >= 12;
      if (isPM && value < 12) {
        date.setUTCHours(value + 12, 0, 0, 0);
      } else if (!isPM && value === 12) {
        date.setUTCHours(0, 0, 0, 0);
      } else {
        date.setUTCHours(value, 0, 0, 0);
      }
      return date;
    }
  }]);
  return Hour1to12Parser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/Hour0to23Parser.js
var Hour0to23Parser = function(_Parser) {
  _inherits(Hour0to23Parser2, _Parser);
  var _super = _createSuper(Hour0to23Parser2);
  function Hour0to23Parser2() {
    var _this;
    _classCallCheck(this, Hour0to23Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 70);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
    return _this;
  }
  _createClass(Hour0to23Parser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "H":
          return parseNumericPattern(numericPatterns.hour23h, dateString);
        case "Ho":
          return match2.ordinalNumber(dateString, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 23;
    }
  }, {
    key: "set",
    value: function set3(date, _flags, value) {
      date.setUTCHours(value, 0, 0, 0);
      return date;
    }
  }]);
  return Hour0to23Parser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/Hour0To11Parser.js
var Hour0To11Parser = function(_Parser) {
  _inherits(Hour0To11Parser2, _Parser);
  var _super = _createSuper(Hour0To11Parser2);
  function Hour0To11Parser2() {
    var _this;
    _classCallCheck(this, Hour0To11Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 70);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["h", "H", "k", "t", "T"]);
    return _this;
  }
  _createClass(Hour0To11Parser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "K":
          return parseNumericPattern(numericPatterns.hour11h, dateString);
        case "Ko":
          return match2.ordinalNumber(dateString, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 11;
    }
  }, {
    key: "set",
    value: function set3(date, _flags, value) {
      var isPM = date.getUTCHours() >= 12;
      if (isPM && value < 12) {
        date.setUTCHours(value + 12, 0, 0, 0);
      } else {
        date.setUTCHours(value, 0, 0, 0);
      }
      return date;
    }
  }]);
  return Hour0To11Parser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/Hour1To24Parser.js
var Hour1To24Parser = function(_Parser) {
  _inherits(Hour1To24Parser2, _Parser);
  var _super = _createSuper(Hour1To24Parser2);
  function Hour1To24Parser2() {
    var _this;
    _classCallCheck(this, Hour1To24Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 70);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
    return _this;
  }
  _createClass(Hour1To24Parser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "k":
          return parseNumericPattern(numericPatterns.hour24h, dateString);
        case "ko":
          return match2.ordinalNumber(dateString, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 24;
    }
  }, {
    key: "set",
    value: function set3(date, _flags, value) {
      var hours = value <= 24 ? value % 24 : value;
      date.setUTCHours(hours, 0, 0, 0);
      return date;
    }
  }]);
  return Hour1To24Parser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/MinuteParser.js
var MinuteParser = function(_Parser) {
  _inherits(MinuteParser2, _Parser);
  var _super = _createSuper(MinuteParser2);
  function MinuteParser2() {
    var _this;
    _classCallCheck(this, MinuteParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 60);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["t", "T"]);
    return _this;
  }
  _createClass(MinuteParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "m":
          return parseNumericPattern(numericPatterns.minute, dateString);
        case "mo":
          return match2.ordinalNumber(dateString, {
            unit: "minute"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 59;
    }
  }, {
    key: "set",
    value: function set3(date, _flags, value) {
      date.setUTCMinutes(value, 0, 0);
      return date;
    }
  }]);
  return MinuteParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/SecondParser.js
var SecondParser = function(_Parser) {
  _inherits(SecondParser2, _Parser);
  var _super = _createSuper(SecondParser2);
  function SecondParser2() {
    var _this;
    _classCallCheck(this, SecondParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 50);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["t", "T"]);
    return _this;
  }
  _createClass(SecondParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "s":
          return parseNumericPattern(numericPatterns.second, dateString);
        case "so":
          return match2.ordinalNumber(dateString, {
            unit: "second"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 59;
    }
  }, {
    key: "set",
    value: function set3(date, _flags, value) {
      date.setUTCSeconds(value, 0);
      return date;
    }
  }]);
  return SecondParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/FractionOfSecondParser.js
var FractionOfSecondParser = function(_Parser) {
  _inherits(FractionOfSecondParser2, _Parser);
  var _super = _createSuper(FractionOfSecondParser2);
  function FractionOfSecondParser2() {
    var _this;
    _classCallCheck(this, FractionOfSecondParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 30);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["t", "T"]);
    return _this;
  }
  _createClass(FractionOfSecondParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      var valueCallback3 = function valueCallback4(value) {
        return Math.floor(value * Math.pow(10, -token.length + 3));
      };
      return mapValue(parseNDigits(token.length, dateString), valueCallback3);
    }
  }, {
    key: "set",
    value: function set3(date, _flags, value) {
      date.setUTCMilliseconds(value);
      return date;
    }
  }]);
  return FractionOfSecondParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/ISOTimezoneWithZParser.js
var ISOTimezoneWithZParser = function(_Parser) {
  _inherits(ISOTimezoneWithZParser2, _Parser);
  var _super = _createSuper(ISOTimezoneWithZParser2);
  function ISOTimezoneWithZParser2() {
    var _this;
    _classCallCheck(this, ISOTimezoneWithZParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 10);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["t", "T", "x"]);
    return _this;
  }
  _createClass(ISOTimezoneWithZParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      switch (token) {
        case "X":
          return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, dateString);
        case "XX":
          return parseTimezonePattern(timezonePatterns.basic, dateString);
        case "XXXX":
          return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, dateString);
        case "XXXXX":
          return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, dateString);
        case "XXX":
        default:
          return parseTimezonePattern(timezonePatterns.extended, dateString);
      }
    }
  }, {
    key: "set",
    value: function set3(date, flags, value) {
      if (flags.timestampIsSet) {
        return date;
      }
      return new Date(date.getTime() - value);
    }
  }]);
  return ISOTimezoneWithZParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/ISOTimezoneParser.js
var ISOTimezoneParser = function(_Parser) {
  _inherits(ISOTimezoneParser2, _Parser);
  var _super = _createSuper(ISOTimezoneParser2);
  function ISOTimezoneParser2() {
    var _this;
    _classCallCheck(this, ISOTimezoneParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 10);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["t", "T", "X"]);
    return _this;
  }
  _createClass(ISOTimezoneParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      switch (token) {
        case "x":
          return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, dateString);
        case "xx":
          return parseTimezonePattern(timezonePatterns.basic, dateString);
        case "xxxx":
          return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, dateString);
        case "xxxxx":
          return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, dateString);
        case "xxx":
        default:
          return parseTimezonePattern(timezonePatterns.extended, dateString);
      }
    }
  }, {
    key: "set",
    value: function set3(date, flags, value) {
      if (flags.timestampIsSet) {
        return date;
      }
      return new Date(date.getTime() - value);
    }
  }]);
  return ISOTimezoneParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/TimestampSecondsParser.js
var TimestampSecondsParser = function(_Parser) {
  _inherits(TimestampSecondsParser2, _Parser);
  var _super = _createSuper(TimestampSecondsParser2);
  function TimestampSecondsParser2() {
    var _this;
    _classCallCheck(this, TimestampSecondsParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 40);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", "*");
    return _this;
  }
  _createClass(TimestampSecondsParser2, [{
    key: "parse",
    value: function parse2(dateString) {
      return parseAnyDigitsSigned(dateString);
    }
  }, {
    key: "set",
    value: function set3(_date, _flags, value) {
      return [new Date(value * 1e3), {
        timestampIsSet: true
      }];
    }
  }]);
  return TimestampSecondsParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/TimestampMillisecondsParser.js
var TimestampMillisecondsParser = function(_Parser) {
  _inherits(TimestampMillisecondsParser2, _Parser);
  var _super = _createSuper(TimestampMillisecondsParser2);
  function TimestampMillisecondsParser2() {
    var _this;
    _classCallCheck(this, TimestampMillisecondsParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 20);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", "*");
    return _this;
  }
  _createClass(TimestampMillisecondsParser2, [{
    key: "parse",
    value: function parse2(dateString) {
      return parseAnyDigitsSigned(dateString);
    }
  }, {
    key: "set",
    value: function set3(_date, _flags, value) {
      return [new Date(value), {
        timestampIsSet: true
      }];
    }
  }]);
  return TimestampMillisecondsParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/index.js
var parsers = {
  G: new EraParser(),
  y: new YearParser(),
  Y: new LocalWeekYearParser(),
  R: new ISOWeekYearParser(),
  u: new ExtendedYearParser(),
  Q: new QuarterParser(),
  q: new StandAloneQuarterParser(),
  M: new MonthParser(),
  L: new StandAloneMonthParser(),
  w: new LocalWeekParser(),
  I: new ISOWeekParser(),
  d: new DateParser(),
  D: new DayOfYearParser(),
  E: new DayParser(),
  e: new LocalDayParser(),
  c: new StandAloneLocalDayParser(),
  i: new ISODayParser(),
  a: new AMPMParser(),
  b: new AMPMMidnightParser(),
  B: new DayPeriodParser(),
  h: new Hour1to12Parser(),
  H: new Hour0to23Parser(),
  K: new Hour0To11Parser(),
  k: new Hour1To24Parser(),
  m: new MinuteParser(),
  s: new SecondParser(),
  S: new FractionOfSecondParser(),
  X: new ISOTimezoneWithZParser(),
  x: new ISOTimezoneParser(),
  t: new TimestampSecondsParser(),
  T: new TimestampMillisecondsParser()
};

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/index.js
var formattingTokensRegExp2 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp2 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp2 = /^'([^]*?)'?$/;
var doubleQuoteRegExp2 = /''/g;
var notWhitespaceRegExp = /\S/;
var unescapedLatinCharacterRegExp2 = /[a-zA-Z]/;
function parse(dirtyDateString, dirtyFormatString, dirtyReferenceDate, options) {
  var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
  requiredArgs(3, arguments);
  var dateString = String(dirtyDateString);
  var formatString = String(dirtyFormatString);
  var defaultOptions2 = getDefaultOptions();
  var locale2 = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions2.locale) !== null && _ref !== void 0 ? _ref : defaultLocale_default;
  if (!locale2.match) {
    throw new RangeError("locale must contain match property");
  }
  var firstWeekContainsDate = toInteger((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions2.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var weekStartsOn = toInteger((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions2.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions2.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  if (formatString === "") {
    if (dateString === "") {
      return toDate(dirtyReferenceDate);
    } else {
      return /* @__PURE__ */ new Date(NaN);
    }
  }
  var subFnOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale: locale2
  };
  var setters = [new DateToSystemTimezoneSetter()];
  var tokens = formatString.match(longFormattingTokensRegExp2).map(function(substring) {
    var firstCharacter = substring[0];
    if (firstCharacter in longFormatters_default) {
      var longFormatter = longFormatters_default[firstCharacter];
      return longFormatter(substring, locale2.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp2);
  var usedTokens = [];
  var _iterator = _createForOfIteratorHelper(tokens), _step;
  try {
    var _loop = function _loop2() {
      var token = _step.value;
      if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(token)) {
        throwProtectedError(token, formatString, dirtyDateString);
      }
      if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(token)) {
        throwProtectedError(token, formatString, dirtyDateString);
      }
      var firstCharacter = token[0];
      var parser = parsers[firstCharacter];
      if (parser) {
        var incompatibleTokens = parser.incompatibleTokens;
        if (Array.isArray(incompatibleTokens)) {
          var incompatibleToken = usedTokens.find(function(usedToken) {
            return incompatibleTokens.includes(usedToken.token) || usedToken.token === firstCharacter;
          });
          if (incompatibleToken) {
            throw new RangeError("The format string mustn't contain `".concat(incompatibleToken.fullToken, "` and `").concat(token, "` at the same time"));
          }
        } else if (parser.incompatibleTokens === "*" && usedTokens.length > 0) {
          throw new RangeError("The format string mustn't contain `".concat(token, "` and any other token at the same time"));
        }
        usedTokens.push({
          token: firstCharacter,
          fullToken: token
        });
        var parseResult = parser.run(dateString, token, locale2.match, subFnOptions);
        if (!parseResult) {
          return {
            v: /* @__PURE__ */ new Date(NaN)
          };
        }
        setters.push(parseResult.setter);
        dateString = parseResult.rest;
      } else {
        if (firstCharacter.match(unescapedLatinCharacterRegExp2)) {
          throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
        }
        if (token === "''") {
          token = "'";
        } else if (firstCharacter === "'") {
          token = cleanEscapedString2(token);
        }
        if (dateString.indexOf(token) === 0) {
          dateString = dateString.slice(token.length);
        } else {
          return {
            v: /* @__PURE__ */ new Date(NaN)
          };
        }
      }
    };
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var _ret = _loop();
      if (_typeof(_ret) === "object")
        return _ret.v;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (dateString.length > 0 && notWhitespaceRegExp.test(dateString)) {
    return /* @__PURE__ */ new Date(NaN);
  }
  var uniquePrioritySetters = setters.map(function(setter2) {
    return setter2.priority;
  }).sort(function(a3, b3) {
    return b3 - a3;
  }).filter(function(priority, index, array) {
    return array.indexOf(priority) === index;
  }).map(function(priority) {
    return setters.filter(function(setter2) {
      return setter2.priority === priority;
    }).sort(function(a3, b3) {
      return b3.subPriority - a3.subPriority;
    });
  }).map(function(setterArray) {
    return setterArray[0];
  });
  var date = toDate(dirtyReferenceDate);
  if (isNaN(date.getTime())) {
    return /* @__PURE__ */ new Date(NaN);
  }
  var utcDate = subMilliseconds(date, getTimezoneOffsetInMilliseconds(date));
  var flags = {};
  var _iterator2 = _createForOfIteratorHelper(uniquePrioritySetters), _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
      var setter = _step2.value;
      if (!setter.validate(utcDate, subFnOptions)) {
        return /* @__PURE__ */ new Date(NaN);
      }
      var result = setter.set(utcDate, flags, subFnOptions);
      if (Array.isArray(result)) {
        utcDate = result[0];
        assign(flags, result[1]);
      } else {
        utcDate = result;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return utcDate;
}
function cleanEscapedString2(input) {
  return input.match(escapedStringRegExp2)[1].replace(doubleQuoteRegExp2, "'");
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/subDays/index.js
function subDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addDays(dirtyDate, -amount);
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parseISO/index.js
function parseISO(argument, options) {
  var _options$additionalDi;
  requiredArgs(1, arguments);
  var additionalDigits = toInteger((_options$additionalDi = options === null || options === void 0 ? void 0 : options.additionalDigits) !== null && _options$additionalDi !== void 0 ? _options$additionalDi : 2);
  if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  }
  if (!(typeof argument === "string" || Object.prototype.toString.call(argument) === "[object String]")) {
    return /* @__PURE__ */ new Date(NaN);
  }
  var dateStrings = splitDateString(argument);
  var date;
  if (dateStrings.date) {
    var parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }
  if (!date || isNaN(date.getTime())) {
    return /* @__PURE__ */ new Date(NaN);
  }
  var timestamp = date.getTime();
  var time = 0;
  var offset;
  if (dateStrings.time) {
    time = parseTime(dateStrings.time);
    if (isNaN(time)) {
      return /* @__PURE__ */ new Date(NaN);
    }
  }
  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);
    if (isNaN(offset)) {
      return /* @__PURE__ */ new Date(NaN);
    }
  } else {
    var dirtyDate = new Date(timestamp + time);
    var result = /* @__PURE__ */ new Date(0);
    result.setFullYear(dirtyDate.getUTCFullYear(), dirtyDate.getUTCMonth(), dirtyDate.getUTCDate());
    result.setHours(dirtyDate.getUTCHours(), dirtyDate.getUTCMinutes(), dirtyDate.getUTCSeconds(), dirtyDate.getUTCMilliseconds());
    return result;
  }
  return new Date(timestamp + time + offset);
}
var patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
};
var dateRegex = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
var timeRegex = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
var timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function splitDateString(dateString) {
  var dateStrings = {};
  var array = dateString.split(patterns.dateTimeDelimiter);
  var timeString;
  if (array.length > 2) {
    return dateStrings;
  }
  if (/:/.test(array[0])) {
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(dateStrings.date.length, dateString.length);
    }
  }
  if (timeString) {
    var token = patterns.timezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], "");
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }
  return dateStrings;
}
function parseYear(dateString, additionalDigits) {
  var regex = new RegExp("^(?:(\\d{4}|[+-]\\d{" + (4 + additionalDigits) + "})|(\\d{2}|[+-]\\d{" + (2 + additionalDigits) + "})$)");
  var captures = dateString.match(regex);
  if (!captures)
    return {
      year: NaN,
      restDateString: ""
    };
  var year = captures[1] ? parseInt(captures[1]) : null;
  var century = captures[2] ? parseInt(captures[2]) : null;
  return {
    year: century === null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length)
  };
}
function parseDate(dateString, year) {
  if (year === null)
    return /* @__PURE__ */ new Date(NaN);
  var captures = dateString.match(dateRegex);
  if (!captures)
    return /* @__PURE__ */ new Date(NaN);
  var isWeekDate = !!captures[4];
  var dayOfYear = parseDateUnit(captures[1]);
  var month = parseDateUnit(captures[2]) - 1;
  var day = parseDateUnit(captures[3]);
  var week = parseDateUnit(captures[4]);
  var dayOfWeek = parseDateUnit(captures[5]) - 1;
  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return /* @__PURE__ */ new Date(NaN);
    }
    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    var date = /* @__PURE__ */ new Date(0);
    if (!validateDate(year, month, day) || !validateDayOfYearDate(year, dayOfYear)) {
      return /* @__PURE__ */ new Date(NaN);
    }
    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}
function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}
function parseTime(timeString) {
  var captures = timeString.match(timeRegex);
  if (!captures)
    return NaN;
  var hours = parseTimeUnit(captures[1]);
  var minutes = parseTimeUnit(captures[2]);
  var seconds = parseTimeUnit(captures[3]);
  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }
  return hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * 1e3;
}
function parseTimeUnit(value) {
  return value && parseFloat(value.replace(",", ".")) || 0;
}
function parseTimezone(timezoneString) {
  if (timezoneString === "Z")
    return 0;
  var captures = timezoneString.match(timezoneRegex);
  if (!captures)
    return 0;
  var sign = captures[1] === "+" ? -1 : 1;
  var hours = parseInt(captures[2]);
  var minutes = captures[3] && parseInt(captures[3]) || 0;
  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }
  return sign * (hours * millisecondsInHour + minutes * millisecondsInMinute);
}
function dayOfISOWeekYear(isoWeekYear, week, day) {
  var date = /* @__PURE__ */ new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}
var daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function isLeapYearIndex2(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}
function validateDate(year, month, date) {
  return month >= 0 && month <= 11 && date >= 1 && date <= (daysInMonths[month] || (isLeapYearIndex2(year) ? 29 : 28));
}
function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex2(year) ? 366 : 365);
}
function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}
function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }
  return seconds >= 0 && seconds < 60 && minutes >= 0 && minutes < 60 && hours >= 0 && hours < 25;
}
function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/setMonth/index.js
function setMonth(dirtyDate, dirtyMonth) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var month = toInteger(dirtyMonth);
  var year = date.getFullYear();
  var day = date.getDate();
  var dateWithDesiredMonth = /* @__PURE__ */ new Date(0);
  dateWithDesiredMonth.setFullYear(year, month, 15);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  var daysInMonth = getDaysInMonth(dateWithDesiredMonth);
  date.setMonth(month, Math.min(day, daysInMonth));
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/set/index.js
function set(dirtyDate, values) {
  requiredArgs(2, arguments);
  if (_typeof(values) !== "object" || values === null) {
    throw new RangeError("values parameter must be an object");
  }
  var date = toDate(dirtyDate);
  if (isNaN(date.getTime())) {
    return /* @__PURE__ */ new Date(NaN);
  }
  if (values.year != null) {
    date.setFullYear(values.year);
  }
  if (values.month != null) {
    date = setMonth(date, values.month);
  }
  if (values.date != null) {
    date.setDate(toInteger(values.date));
  }
  if (values.hours != null) {
    date.setHours(toInteger(values.hours));
  }
  if (values.minutes != null) {
    date.setMinutes(toInteger(values.minutes));
  }
  if (values.seconds != null) {
    date.setSeconds(toInteger(values.seconds));
  }
  if (values.milliseconds != null) {
    date.setMilliseconds(toInteger(values.milliseconds));
  }
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/setHours/index.js
function setHours(dirtyDate, dirtyHours) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var hours = toInteger(dirtyHours);
  date.setHours(hours);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/setMilliseconds/index.js
function setMilliseconds(dirtyDate, dirtyMilliseconds) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var milliseconds2 = toInteger(dirtyMilliseconds);
  date.setMilliseconds(milliseconds2);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/setMinutes/index.js
function setMinutes(dirtyDate, dirtyMinutes) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var minutes = toInteger(dirtyMinutes);
  date.setMinutes(minutes);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/setSeconds/index.js
function setSeconds(dirtyDate, dirtySeconds) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var seconds = toInteger(dirtySeconds);
  date.setSeconds(seconds);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/setYear/index.js
function setYear(dirtyDate, dirtyYear) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var year = toInteger(dirtyYear);
  if (isNaN(date.getTime())) {
    return /* @__PURE__ */ new Date(NaN);
  }
  date.setFullYear(year);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/subMonths/index.js
function subMonths(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMonths(dirtyDate, -amount);
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/sub/index.js
function sub(date, duration) {
  requiredArgs(2, arguments);
  if (!duration || _typeof(duration) !== "object")
    return /* @__PURE__ */ new Date(NaN);
  var years = duration.years ? toInteger(duration.years) : 0;
  var months = duration.months ? toInteger(duration.months) : 0;
  var weeks = duration.weeks ? toInteger(duration.weeks) : 0;
  var days = duration.days ? toInteger(duration.days) : 0;
  var hours = duration.hours ? toInteger(duration.hours) : 0;
  var minutes = duration.minutes ? toInteger(duration.minutes) : 0;
  var seconds = duration.seconds ? toInteger(duration.seconds) : 0;
  var dateWithoutMonths = subMonths(date, months + years * 12);
  var dateWithoutDays = subDays(dateWithoutMonths, days + weeks * 7);
  var minutestoSub = minutes + hours * 60;
  var secondstoSub = seconds + minutestoSub * 60;
  var mstoSub = secondstoSub * 1e3;
  var finalDate = new Date(dateWithoutDays.getTime() - mstoSub);
  return finalDate;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/subYears/index.js
function subYears(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addYears(dirtyDate, -amount);
}

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
function Yn(e3) {
  return e3 && e3.__esModule && Object.prototype.hasOwnProperty.call(e3, "default") ? e3.default : e3;
}
var pa = { exports: {} };
(function(e3) {
  function n(a3) {
    return a3 && a3.__esModule ? a3 : {
      default: a3
    };
  }
  e3.exports = n, e3.exports.__esModule = true, e3.exports.default = e3.exports;
})(pa);
var qa = pa.exports;
var kn = { exports: {} };
(function(e3, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a3;
  function a3(t3) {
    if (t3 === null || t3 === true || t3 === false)
      return NaN;
    var o = Number(t3);
    return isNaN(o) ? o : o < 0 ? Math.ceil(o) : Math.floor(o);
  }
  e3.exports = n.default;
})(kn, kn.exports);
var xa = kn.exports;
var Ja = Yn(xa);
var wn = { exports: {} };
(function(e3, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a3;
  function a3(t3) {
    var o = new Date(Date.UTC(t3.getFullYear(), t3.getMonth(), t3.getDate(), t3.getHours(), t3.getMinutes(), t3.getSeconds(), t3.getMilliseconds()));
    return o.setUTCFullYear(t3.getFullYear()), t3.getTime() - o.getTime();
  }
  e3.exports = n.default;
})(wn, wn.exports);
var Xa = wn.exports;
var jn = Yn(Xa);
function Qa(e3, n) {
  var a3 = ar(n);
  return a3.formatToParts ? tr(a3, e3) : nr(a3, e3);
}
var er = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function tr(e3, n) {
  try {
    for (var a3 = e3.formatToParts(n), t3 = [], o = 0; o < a3.length; o++) {
      var l = er[a3[o].type];
      l >= 0 && (t3[l] = parseInt(a3[o].value, 10));
    }
    return t3;
  } catch (c3) {
    if (c3 instanceof RangeError)
      return [NaN];
    throw c3;
  }
}
function nr(e3, n) {
  var a3 = e3.format(n).replace(/\u200E/g, ""), t3 = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(a3);
  return [t3[3], t3[1], t3[2], t3[4], t3[5], t3[6]];
}
var on = {};
function ar(e3) {
  if (!on[e3]) {
    var n = new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: "America/New_York",
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), a3 = n === "06/25/2014, 00:00:00" || n === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
    on[e3] = a3 ? new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: e3,
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }) : new Intl.DateTimeFormat("en-US", {
      hourCycle: "h23",
      timeZone: e3,
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }
  return on[e3];
}
function Bn(e3, n, a3, t3, o, l, c3) {
  var k3 = /* @__PURE__ */ new Date(0);
  return k3.setUTCFullYear(e3, n, a3), k3.setUTCHours(t3, o, l, c3), k3;
}
var Kn = 36e5;
var rr = 6e4;
var sn = {
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-]\d{2}):?(\d{2})$/
};
function En(e3, n, a3) {
  var t3, o;
  if (!e3 || (t3 = sn.timezoneZ.exec(e3), t3))
    return 0;
  var l;
  if (t3 = sn.timezoneHH.exec(e3), t3)
    return l = parseInt(t3[1], 10), Gn(l) ? -(l * Kn) : NaN;
  if (t3 = sn.timezoneHHMM.exec(e3), t3) {
    l = parseInt(t3[1], 10);
    var c3 = parseInt(t3[2], 10);
    return Gn(l, c3) ? (o = Math.abs(l) * Kn + c3 * rr, l > 0 ? -o : o) : NaN;
  }
  if (sr(e3)) {
    n = new Date(n || Date.now());
    var k3 = a3 ? n : lr(n), h5 = Dn(k3, e3), M3 = a3 ? h5 : or(n, h5, e3);
    return -M3;
  }
  return NaN;
}
function lr(e3) {
  return Bn(
    e3.getFullYear(),
    e3.getMonth(),
    e3.getDate(),
    e3.getHours(),
    e3.getMinutes(),
    e3.getSeconds(),
    e3.getMilliseconds()
  );
}
function Dn(e3, n) {
  var a3 = Qa(e3, n), t3 = Bn(
    a3[0],
    a3[1] - 1,
    a3[2],
    a3[3] % 24,
    a3[4],
    a3[5],
    0
  ).getTime(), o = e3.getTime(), l = o % 1e3;
  return o -= l >= 0 ? l : 1e3 + l, t3 - o;
}
function or(e3, n, a3) {
  var t3 = e3.getTime(), o = t3 - n, l = Dn(new Date(o), a3);
  if (n === l)
    return n;
  o -= l - n;
  var c3 = Dn(new Date(o), a3);
  return l === c3 ? l : Math.max(l, c3);
}
function Gn(e3, n) {
  return -23 <= e3 && e3 <= 23 && (n == null || 0 <= n && n <= 59);
}
var Zn = {};
function sr(e3) {
  if (Zn[e3])
    return true;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e3 }), Zn[e3] = true, true;
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
function Mn(e3, n) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e3 === null)
    return /* @__PURE__ */ new Date(NaN);
  var a3 = n || {}, t3 = a3.additionalDigits == null ? ur : Ja(a3.additionalDigits);
  if (t3 !== 2 && t3 !== 1 && t3 !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e3 instanceof Date || typeof e3 == "object" && Object.prototype.toString.call(e3) === "[object Date]")
    return new Date(e3.getTime());
  if (typeof e3 == "number" || Object.prototype.toString.call(e3) === "[object Number]")
    return new Date(e3);
  if (!(typeof e3 == "string" || Object.prototype.toString.call(e3) === "[object String]"))
    return /* @__PURE__ */ new Date(NaN);
  var o = ir(e3), l = dr(o.date, t3), c3 = l.year, k3 = l.restDateString, h5 = cr(k3, c3);
  if (isNaN(h5))
    return /* @__PURE__ */ new Date(NaN);
  if (h5) {
    var M3 = h5.getTime(), p = 0, T3;
    if (o.time && (p = fr(o.time), isNaN(p)))
      return /* @__PURE__ */ new Date(NaN);
    if (o.timeZone || a3.timeZone) {
      if (T3 = En(o.timeZone || a3.timeZone, new Date(M3 + p)), isNaN(T3))
        return /* @__PURE__ */ new Date(NaN);
    } else
      T3 = jn(new Date(M3 + p)), T3 = jn(new Date(M3 + p + T3));
    return new Date(M3 + p + T3);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function ir(e3) {
  var n = {}, a3 = Ie.dateTimePattern.exec(e3), t3;
  if (a3 ? (n.date = a3[1], t3 = a3[3]) : (a3 = Ie.datePattern.exec(e3), a3 ? (n.date = a3[1], t3 = a3[2]) : (n.date = null, t3 = e3)), t3) {
    var o = Ie.timeZone.exec(t3);
    o ? (n.time = t3.replace(o[1], ""), n.timeZone = o[1].trim()) : n.time = t3;
  }
  return n;
}
function dr(e3, n) {
  var a3 = Ie.YYY[n], t3 = Ie.YYYYY[n], o;
  if (o = Ie.YYYY.exec(e3) || t3.exec(e3), o) {
    var l = o[1];
    return {
      year: parseInt(l, 10),
      restDateString: e3.slice(l.length)
    };
  }
  if (o = Ie.YY.exec(e3) || a3.exec(e3), o) {
    var c3 = o[1];
    return {
      year: parseInt(c3, 10) * 100,
      restDateString: e3.slice(c3.length)
    };
  }
  return {
    year: null
  };
}
function cr(e3, n) {
  if (n === null)
    return null;
  var a3, t3, o, l;
  if (e3.length === 0)
    return t3 = /* @__PURE__ */ new Date(0), t3.setUTCFullYear(n), t3;
  if (a3 = Ie.MM.exec(e3), a3)
    return t3 = /* @__PURE__ */ new Date(0), o = parseInt(a3[1], 10) - 1, Jn(n, o) ? (t3.setUTCFullYear(n, o), t3) : /* @__PURE__ */ new Date(NaN);
  if (a3 = Ie.DDD.exec(e3), a3) {
    t3 = /* @__PURE__ */ new Date(0);
    var c3 = parseInt(a3[1], 10);
    return gr(n, c3) ? (t3.setUTCFullYear(n, 0, c3), t3) : /* @__PURE__ */ new Date(NaN);
  }
  if (a3 = Ie.MMDD.exec(e3), a3) {
    t3 = /* @__PURE__ */ new Date(0), o = parseInt(a3[1], 10) - 1;
    var k3 = parseInt(a3[2], 10);
    return Jn(n, o, k3) ? (t3.setUTCFullYear(n, o, k3), t3) : /* @__PURE__ */ new Date(NaN);
  }
  if (a3 = Ie.Www.exec(e3), a3)
    return l = parseInt(a3[1], 10) - 1, Xn(n, l) ? xn(n, l) : /* @__PURE__ */ new Date(NaN);
  if (a3 = Ie.WwwD.exec(e3), a3) {
    l = parseInt(a3[1], 10) - 1;
    var h5 = parseInt(a3[2], 10) - 1;
    return Xn(n, l, h5) ? xn(n, l, h5) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function fr(e3) {
  var n, a3, t3;
  if (n = Ie.HH.exec(e3), n)
    return a3 = parseFloat(n[1].replace(",", ".")), dn(a3) ? a3 % 24 * un : NaN;
  if (n = Ie.HHMM.exec(e3), n)
    return a3 = parseInt(n[1], 10), t3 = parseFloat(n[2].replace(",", ".")), dn(a3, t3) ? a3 % 24 * un + t3 * qn : NaN;
  if (n = Ie.HHMMSS.exec(e3), n) {
    a3 = parseInt(n[1], 10), t3 = parseInt(n[2], 10);
    var o = parseFloat(n[3].replace(",", "."));
    return dn(a3, t3, o) ? a3 % 24 * un + t3 * qn + o * 1e3 : NaN;
  }
  return null;
}
function xn(e3, n, a3) {
  n = n || 0, a3 = a3 || 0;
  var t3 = /* @__PURE__ */ new Date(0);
  t3.setUTCFullYear(e3, 0, 4);
  var o = t3.getUTCDay() || 7, l = n * 7 + a3 + 1 - o;
  return t3.setUTCDate(t3.getUTCDate() + l), t3;
}
var vr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var mr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function ka(e3) {
  return e3 % 400 === 0 || e3 % 4 === 0 && e3 % 100 !== 0;
}
function Jn(e3, n, a3) {
  if (n < 0 || n > 11)
    return false;
  if (a3 != null) {
    if (a3 < 1)
      return false;
    var t3 = ka(e3);
    if (t3 && a3 > mr[n] || !t3 && a3 > vr[n])
      return false;
  }
  return true;
}
function gr(e3, n) {
  if (n < 1)
    return false;
  var a3 = ka(e3);
  return !(a3 && n > 366 || !a3 && n > 365);
}
function Xn(e3, n, a3) {
  return !(n < 0 || n > 52 || a3 != null && (a3 < 0 || a3 > 6));
}
function dn(e3, n, a3) {
  return !(e3 != null && (e3 < 0 || e3 >= 25) || n != null && (n < 0 || n >= 60) || a3 != null && (a3 < 0 || a3 >= 60));
}
var $n = { exports: {} };
var Tn = { exports: {} };
(function(e3, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a3;
  function a3(t3, o) {
    if (t3 == null)
      throw new TypeError("assign requires that input parameter not be null or undefined");
    for (var l in o)
      Object.prototype.hasOwnProperty.call(o, l) && (t3[l] = o[l]);
    return t3;
  }
  e3.exports = n.default;
})(Tn, Tn.exports);
var yr = Tn.exports;
(function(e3, n) {
  var a3 = qa.default;
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = o;
  var t3 = a3(yr);
  function o(l) {
    return (0, t3.default)({}, l);
  }
  e3.exports = n.default;
})($n, $n.exports);
var hr = $n.exports;
var pr = Yn(hr);
function br(e3, n, a3) {
  var t3 = Mn(e3, a3), o = En(n, t3, true), l = new Date(t3.getTime() - o), c3 = /* @__PURE__ */ new Date(0);
  return c3.setFullYear(l.getUTCFullYear(), l.getUTCMonth(), l.getUTCDate()), c3.setHours(l.getUTCHours(), l.getUTCMinutes(), l.getUTCSeconds(), l.getUTCMilliseconds()), c3;
}
function kr(e3, n, a3) {
  if (typeof e3 == "string" && !e3.match(ba)) {
    var t3 = pr(a3);
    return t3.timeZone = n, Mn(e3, t3);
  }
  var o = Mn(e3, a3), l = Bn(
    o.getFullYear(),
    o.getMonth(),
    o.getDate(),
    o.getHours(),
    o.getMinutes(),
    o.getSeconds(),
    o.getMilliseconds()
  ).getTime(), c3 = En(n, new Date(l));
  return new Date(l + c3);
}
function Qn(e3) {
  return (n) => new Intl.DateTimeFormat(e3, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${n}T00:00:00+00:00`)).slice(0, 2);
}
function wr(e3) {
  return (n) => format(/* @__PURE__ */ new Date(`2017-01-0${n}T00:00:00+00:00`), "EEEEEE", { locale: e3 });
}
var Dr = (e3, n, a3) => {
  const t3 = [1, 2, 3, 4, 5, 6, 7];
  let o;
  if (e3 !== null)
    try {
      o = t3.map(wr(e3));
    } catch {
      o = t3.map(Qn(n));
    }
  else
    o = t3.map(Qn(n));
  const l = o.slice(0, a3), c3 = o.slice(a3 + 1, o.length);
  return [o[a3]].concat(...c3).concat(...l);
};
var Fn = (e3, n) => {
  const a3 = [];
  for (let t3 = +e3[0]; t3 <= +e3[1]; t3++)
    a3.push({ value: +t3, text: `${t3}` });
  return n ? a3.reverse() : a3;
};
var wa = (e3, n, a3) => {
  const t3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((l) => {
    const c3 = l < 10 ? `0${l}` : l;
    return /* @__PURE__ */ new Date(`2017-${c3}-01T00:00:00+00:00`);
  });
  if (e3 !== null)
    try {
      const l = a3 === "long" ? "MMMM" : "MMM";
      return t3.map((c3, k3) => {
        const h5 = format(c3, l, { locale: e3 });
        return {
          text: h5.charAt(0).toUpperCase() + h5.substring(1),
          value: k3
        };
      });
    } catch {
    }
  const o = new Intl.DateTimeFormat(n, { month: a3, timeZone: "UTC" });
  return t3.map((l, c3) => {
    const k3 = o.format(l);
    return {
      text: k3.charAt(0).toUpperCase() + k3.substring(1),
      value: c3
    };
  });
};
var Mr = (e3) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e3];
var Ae = (e3) => {
  const n = unref(e3);
  return n != null && n.$el ? n == null ? void 0 : n.$el : n;
};
var $r = (e3) => Object.assign({ type: "dot" }, e3);
var Da = (e3) => Array.isArray(e3) ? !!e3[0] && !!e3[1] : false;
var Gt = {
  prop: (e3) => `"${e3}" prop must be enabled!`,
  dateArr: (e3) => `You need to use array as "model-value" binding in order to support "${e3}"`
};
var Te = (e3) => e3;
var ea = (e3) => e3 === 0 ? e3 : !e3 || isNaN(+e3) ? null : +e3;
var ta = (e3) => e3 === null;
var Tr = (e3) => {
  if (e3)
    return [...e3.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var Ar = (e3) => {
  const n = [], a3 = (t3) => t3.filter((o) => o);
  for (let t3 = 0; t3 < e3.length; t3 += 3) {
    const o = [e3[t3], e3[t3 + 1], e3[t3 + 2]];
    n.push(a3(o));
  }
  return n;
};
var Ct = (e3, n, a3) => {
  const t3 = a3 ?? a3 === 0, o = n ?? n === 0;
  if (!t3 && !o)
    return false;
  const l = +a3, c3 = +n;
  return t3 && o ? +e3 > l || +e3 < c3 : t3 ? +e3 > l : o ? +e3 < c3 : false;
};
var bt = (e3, n) => Ar(e3).map((a3) => a3.map((t3) => {
  const { active: o, disabled: l, isBetween: c3 } = n(t3);
  return {
    ...t3,
    active: o,
    disabled: l,
    className: {
      dp__overlay_cell_active: o,
      dp__overlay_cell: !o,
      dp__overlay_cell_disabled: l,
      dp__overlay_cell_pad: true,
      dp__overlay_cell_active_disabled: l && o,
      dp__cell_in_between: c3
    }
  };
}));
var na = (e3, n, a3, t3, o) => {
  const l = parse(e3, n.slice(0, e3.length), /* @__PURE__ */ new Date());
  return isValid(l) && isDate(l) ? t3 || o ? l : set(l, {
    hours: +a3.hours,
    minutes: +(a3 == null ? void 0 : a3.minutes),
    seconds: +(a3 == null ? void 0 : a3.seconds),
    milliseconds: 0
  }) : null;
};
var _r = (e3, n, a3, t3, o) => {
  const l = Array.isArray(a3) ? a3[0] : a3;
  if (typeof n == "string")
    return na(e3, n, l, t3, o);
  if (Array.isArray(n)) {
    let c3 = null;
    for (const k3 of n)
      if (c3 = na(e3, k3, l, t3, o), c3)
        break;
    return c3;
  }
  return typeof n == "function" ? n(e3) : null;
};
var S3 = (e3) => e3 ? new Date(e3) : /* @__PURE__ */ new Date();
var Sr = (e3, n, a3) => {
  if (n) {
    const o = (e3.getMonth() + 1).toString().padStart(2, "0"), l = e3.getDate().toString().padStart(2, "0"), c3 = e3.getHours().toString().padStart(2, "0"), k3 = e3.getMinutes().toString().padStart(2, "0"), h5 = a3 ? e3.getSeconds().toString().padStart(2, "0") : "00";
    return `${e3.getFullYear()}-${o}-${l}T${c3}:${k3}:${h5}.000Z`;
  }
  const t3 = Date.UTC(
    e3.getUTCFullYear(),
    e3.getUTCMonth(),
    e3.getUTCDate(),
    e3.getUTCHours(),
    e3.getUTCMinutes(),
    e3.getUTCSeconds()
  );
  return new Date(t3).toISOString();
};
var Le = (e3) => {
  let n = S3(JSON.parse(JSON.stringify(e3)));
  return n = setHours(n, 0), n = setMinutes(n, 0), n = setSeconds(n, 0), n = setMilliseconds(n, 0), n;
};
var tt = (e3, n, a3, t3) => {
  let o = e3 ? S3(e3) : S3();
  return (n || n === 0) && (o = setHours(o, +n)), (a3 || a3 === 0) && (o = setMinutes(o, +a3)), (t3 || t3 === 0) && (o = setSeconds(o, +t3)), setMilliseconds(o, 0);
};
var Pe = (e3, n) => !e3 || !n ? false : isBefore(Le(e3), Le(n));
var ye = (e3, n) => !e3 || !n ? false : isEqual(Le(e3), Le(n));
var Re = (e3, n) => !e3 || !n ? false : isAfter(Le(e3), Le(n));
var Vn = (e3, n, a3) => e3 != null && e3[0] && (e3 != null && e3[1]) ? Re(a3, e3[0]) && Pe(a3, e3[1]) : e3 != null && e3[0] && n ? Re(a3, e3[0]) && Pe(a3, n) || Pe(a3, e3[0]) && Re(a3, n) : false;
var ze = (e3) => {
  const n = set(new Date(e3), { date: 1 });
  return Le(n);
};
var cn = (e3, n, a3) => n && (a3 || a3 === 0) ? Object.fromEntries(
  ["hours", "minutes", "seconds"].map((t3) => t3 === n ? [t3, a3] : [t3, isNaN(+e3[t3]) ? void 0 : +e3[t3]])
) : {
  hours: isNaN(+e3.hours) ? void 0 : +e3.hours,
  minutes: isNaN(+e3.minutes) ? void 0 : +e3.minutes,
  seconds: isNaN(+e3.seconds) ? void 0 : +e3.seconds
};
var ft = (e3) => ({
  hours: getHours(e3),
  minutes: getMinutes(e3),
  seconds: getSeconds(e3)
});
var Ma = (e3, n) => {
  if (n) {
    const a3 = getYear(S3(n));
    if (a3 > e3)
      return 12;
    if (a3 === e3)
      return getMonth(S3(n));
  }
};
var $a = (e3, n) => {
  if (n) {
    const a3 = getYear(S3(n));
    return a3 < e3 ? -1 : a3 === e3 ? getMonth(S3(n)) : void 0;
  }
};
var kt = (e3) => {
  if (e3)
    return getYear(S3(e3));
};
var Ze = (e3, n) => n ? br(e3, n) : e3;
var Pr = (e3, n) => n ? kr(e3, n) : e3;
var aa = (e3) => e3 instanceof Date ? e3 : parseISO(e3);
var Ta = (e3, n) => {
  const a3 = Re(e3, n) ? n : e3, t3 = Re(n, e3) ? n : e3;
  return eachDayOfInterval({ start: a3, end: t3 });
};
var Cr = (e3) => {
  const n = addMonths(e3, 1);
  return { month: getMonth(n), year: getYear(n) };
};
var jt = (e3, n, a3) => {
  const t3 = startOfWeek(Ze(e3, n), { weekStartsOn: +a3 }), o = endOfWeek(Ze(e3, n), { weekStartsOn: +a3 });
  return [t3, o];
};
var Aa = (e3, n) => {
  const a3 = {
    hours: getHours(S3()),
    minutes: getMinutes(S3()),
    seconds: n ? getSeconds(S3()) : 0
  };
  return Object.assign(a3, e3);
};
var et = (e3, n, a3) => [set(S3(e3), { date: 1 }), set(S3(), { month: n, year: a3, date: 1 })];
var Je = (e3, n, a3) => {
  let t3 = e3 ? S3(e3) : S3();
  return (n || n === 0) && (t3 = setMonth(t3, n)), a3 && (t3 = setYear(t3, a3)), t3;
};
var _a = (e3, n, a3, t3, o) => {
  if (!t3 || o && !n || !o && !a3)
    return false;
  const l = o ? addMonths(e3, 1) : subMonths(e3, 1), c3 = [getMonth(l), getYear(l)];
  return o ? !Nr(...c3, n) : !Rr(...c3, a3);
};
var Rr = (e3, n, a3) => Pe(...et(a3, e3, n)) || ye(...et(a3, e3, n));
var Nr = (e3, n, a3) => Re(...et(a3, e3, n)) || ye(...et(a3, e3, n));
var Sa = (e3, n, a3, t3, o, l) => {
  if (typeof n == "function")
    return n(e3);
  const c3 = a3 ? { locale: a3 } : void 0;
  return Array.isArray(e3) ? `${format(e3[0], l, c3)}${o && !e3[1] ? "" : t3}${e3[1] ? format(e3[1], l, c3) : ""}` : format(e3, l, c3);
};
var gt = (e3) => {
  if (e3)
    return null;
  throw new Error(Gt.prop("partial-range"));
};
var Ht = (e3, n) => {
  if (n)
    return e3();
  throw new Error(Gt.prop("range"));
};
var An = (e3) => Array.isArray(e3) ? isValid(e3[0]) && (e3[1] ? isValid(e3[1]) : true) : e3 ? isValid(e3) : false;
var Or = (e3) => set(S3(), {
  hours: +e3.hours || 0,
  minutes: +e3.minutes || 0,
  seconds: +e3.seconds || 0
});
var fn = (e3, n, a3, t3) => {
  if (!e3)
    return true;
  if (t3) {
    const o = a3 === "max" ? isBefore(e3, n) : isAfter(e3, n), l = { seconds: 0, milliseconds: 0 };
    return o || isEqual(set(e3, l), set(n, l));
  }
  return a3 === "max" ? e3.getTime() <= n.getTime() : e3.getTime() >= n.getTime();
};
var ra = (e3, n, a3, t3, o) => {
  const l = e3 ? Or(e3) : S3(n);
  return Array.isArray(t3) ? fn(t3[0], l, a3, !!n) && fn(t3[1], l, a3, !!n) && o : fn(t3, l, a3, !!n) && o;
};
var vn = (e3) => set(S3(), ft(e3));
var Ir = (e3, n) => Array.isArray(e3) ? e3.map((a3) => S3(a3)).filter((a3) => getYear(S3(a3)) === n).map((a3) => getMonth(a3)) : [];
var Tt = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Pa = () => {
  const e3 = (t3) => {
    Tt.menuFocused = t3;
  }, n = (t3) => {
    Tt.shiftKeyInMenu !== t3 && (Tt.shiftKeyInMenu = t3);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: Tt.shiftKeyInMenu, menuFocused: Tt.menuFocused })),
    setMenuFocused: e3,
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
  const e3 = computed(() => Lt.value ? [...be.selectionGrid, be.actionRow].filter((b3) => b3.length) : gn.value ? [
    ...be.timePicker[0],
    ...be.timePicker[1],
    hn.value ? [] : [mn.value],
    be.actionRow
  ].filter((b3) => b3.length) : yn.value ? [...be.monthPicker, be.actionRow] : [be.monthYear, ...be.calendar, be.time, be.actionRow].filter((b3) => b3.length)), n = (b3) => {
    Ne.value = b3 ? Ne.value + 1 : Ne.value - 1;
    let A = null;
    e3.value[Se.value] && (A = e3.value[Se.value][Ne.value]), A || (Ne.value = b3 ? Ne.value - 1 : Ne.value + 1);
  }, a3 = (b3) => {
    if (Se.value === 0 && !b3 || Se.value === e3.value.length && b3)
      return;
    Se.value = b3 ? Se.value + 1 : Se.value - 1, e3.value[Se.value] ? e3.value[Se.value] && !e3.value[Se.value][Ne.value] && Ne.value !== 0 && (Ne.value = e3.value[Se.value].length - 1) : Se.value = b3 ? Se.value - 1 : Se.value + 1;
  }, t3 = (b3) => {
    let A = null;
    e3.value[Se.value] && (A = e3.value[Se.value][Ne.value]), A ? A.focus({ preventScroll: !Lt.value }) : Ne.value = b3 ? Ne.value - 1 : Ne.value + 1;
  }, o = () => {
    n(true), t3(true);
  }, l = () => {
    n(false), t3(false);
  }, c3 = () => {
    a3(false), t3(true);
  }, k3 = () => {
    a3(true), t3(true);
  }, h5 = (b3, A) => {
    be[A] = b3;
  }, M3 = (b3, A) => {
    be[A] = b3;
  }, p = () => {
    Ne.value = 0, Se.value = 0;
  };
  return {
    buildMatrix: h5,
    buildMultiLevelMatrix: M3,
    setTimePickerBackRef: (b3) => {
      mn.value = b3;
    },
    setSelectionGrid: (b3) => {
      Lt.value = b3, p(), b3 || (be.selectionGrid = []);
    },
    setTimePicker: (b3, A = false) => {
      gn.value = b3, hn.value = A, p(), b3 || (be.timePicker[0] = [], be.timePicker[1] = []);
    },
    setTimePickerElements: (b3, A = 0) => {
      be.timePicker[A] = b3;
    },
    arrowRight: o,
    arrowLeft: l,
    arrowUp: c3,
    arrowDown: k3,
    clearArrowNav: () => {
      be.monthYear = [], be.calendar = [], be.time = [], be.actionRow = [], be.selectionGrid = [], be.timePicker[0] = [], be.timePicker[1] = [], Lt.value = false, gn.value = false, hn.value = false, yn.value = false, p(), mn.value = null;
    },
    setMonthPicker: (b3) => {
      yn.value = b3, p();
    },
    refSets: be
    // exposed for testing
  };
};
var la = (e3) => ({
  menuAppearTop: "dp-menu-appear-top",
  menuAppearBottom: "dp-menu-appear-bottom",
  open: "dp-slide-down",
  close: "dp-slide-up",
  next: "calendar-next",
  previous: "calendar-prev",
  vNext: "dp-slide-up",
  vPrevious: "dp-slide-down",
  ...e3 ?? {}
});
var Yr = (e3) => ({
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
  ...e3 ?? {}
});
var oa = (e3) => e3 ? typeof e3 == "boolean" ? e3 ? 2 : 0 : +e3 >= 2 ? +e3 : 2 : 0;
var Br = (e3) => {
  const n = typeof e3 == "object" && e3, a3 = {
    static: true,
    solo: false
  };
  if (!e3)
    return { ...a3, count: oa(false) };
  const t3 = n ? e3 : {}, o = n ? t3.count ?? true : e3, l = oa(o);
  return Object.assign(a3, t3, { count: l });
};
var Er = (e3, n, a3) => e3 || (typeof a3 == "string" ? a3 : n);
var Fr = (e3) => typeof e3 == "boolean" ? e3 ? la({}) : false : la(e3);
var Vr = (e3) => {
  const n = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: true,
    rangeSeparator: " - "
  };
  return typeof e3 == "object" ? { ...n, ...e3 ?? {}, enabled: true } : { ...n, enabled: e3 };
};
var Hr = (e3) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...e3 ?? {}
});
var Lr = (e3) => ({
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  ...e3 ?? {}
});
var Ur = (e3) => {
  const n = { input: false };
  return typeof e3 == "object" ? { ...n, ...e3 ?? {}, enabled: true } : {
    enabled: e3,
    ...n
  };
};
var Ce = (e3) => {
  const n = () => {
    const z3 = e3.enableSeconds ? ":ss" : "";
    return e3.is24 ? `HH:mm${z3}` : `hh:mm${z3} aa`;
  }, a3 = () => e3.format ? e3.format : e3.monthPicker ? "MM/yyyy" : e3.timePicker ? n() : e3.weekPicker ? "MM/dd/yyyy" : e3.yearPicker ? "yyyy" : e3.enableTimePicker ? `MM/dd/yyyy, ${n()}` : "MM/dd/yyyy", t3 = (z3) => Aa(z3, e3.enableSeconds), o = () => e3.range ? e3.startTime && Array.isArray(e3.startTime) ? [t3(e3.startTime[0]), t3(e3.startTime[1])] : null : e3.startTime && !Array.isArray(e3.startTime) ? t3(e3.startTime) : null, l = computed(() => Br(e3.multiCalendars)), c3 = computed(() => o()), k3 = computed(() => Yr(e3.ariaLabels)), h5 = computed(() => Hr(e3.filters)), M3 = computed(() => Fr(e3.transitions)), p = computed(() => Lr(e3.actionRow)), T3 = computed(
    () => Er(e3.previewFormat, e3.format, a3())
  ), E3 = computed(() => Vr(e3.textInput)), q3 = computed(() => Ur(e3.inline));
  return {
    defaultedTransitions: M3,
    defaultedMultiCalendars: l,
    defaultedStartTime: c3,
    defaultedAriaLabels: k3,
    defaultedFilters: h5,
    defaultedActionRow: p,
    defaultedPreviewFormat: T3,
    defaultedTextInput: E3,
    defaultedInline: q3,
    getDefaultPattern: a3,
    getDefaultStartTime: o
  };
};
var Wr = (e3, n, a3) => {
  const t3 = ref(), { defaultedTextInput: o, getDefaultPattern: l } = Ce(n), c3 = ref(""), k3 = toRef(n, "format");
  watch(t3, () => {
    e3("internal-model-change", t3.value);
  }), watch(k3, () => {
    F();
  });
  const h5 = (r) => Pr(r, n.timezone), M3 = (r) => Ze(r, n.timezone), p = (r, U) => Sa(
    r,
    n.format,
    n.formatLocale,
    o.value.rangeSeparator,
    n.modelAuto,
    U ?? l()
  ), T3 = (r) => {
    const U = r ?? S3();
    return n.modelType ? w3(U) : {
      hours: getHours(U),
      minutes: getMinutes(U),
      seconds: n.enableSeconds ? getSeconds(U) : 0
    };
  }, E3 = (r) => n.modelType ? w3(r) : { month: getMonth(r), year: getYear(r) }, q3 = (r) => Array.isArray(r) ? Ht(
    () => [
      setYear(S3(), r[0]),
      r[1] ? setYear(S3(), r[1]) : gt(n.partialRange)
    ],
    n.range
  ) : setYear(S3(), +r), z3 = (r, U) => (typeof r == "string" || typeof r == "number") && n.modelType ? d3(r) : U, Q3 = (r) => Array.isArray(r) ? [
    z3(
      r[0],
      tt(null, +r[0].hours, +r[0].minutes, r[0].seconds)
    ),
    z3(
      r[1],
      tt(null, +r[1].hours, +r[1].minutes, r[1].seconds)
    )
  ] : z3(r, tt(null, r.hours, r.minutes, r.seconds)), G3 = (r) => Array.isArray(r) ? n.multiDates ? r.map((U) => z3(U, Je(null, +U.month, +U.year))) : Ht(
    () => [
      z3(r[0], Je(null, +r[0].month, +r[0].year)),
      z3(
        r[1],
        r[1] ? Je(null, +r[1].month, +r[1].year) : gt(n.partialRange)
      )
    ],
    n.range
  ) : z3(r, Je(null, +r.month, +r.year)), b3 = (r) => {
    if (Array.isArray(r))
      return r.map((U) => d3(U));
    throw new Error(Gt.dateArr("multi-dates"));
  }, A = (r) => {
    if (Array.isArray(r))
      return [S3(r[0]), S3(r[1])];
    throw new Error(Gt.dateArr("week-picker"));
  }, O3 = (r) => n.modelAuto ? Array.isArray(r) ? [d3(r[0]), d3(r[1])] : n.autoApply ? [d3(r)] : [d3(r), null] : Array.isArray(r) ? Ht(
    () => [
      d3(r[0]),
      r[1] ? d3(r[1]) : gt(n.partialRange)
    ],
    n.range
  ) : d3(r), H3 = () => {
    Array.isArray(t3.value) && n.range && t3.value.length === 1 && t3.value.push(gt(n.partialRange));
  }, _ = () => {
    const r = t3.value;
    return [
      w3(r[0]),
      r[1] ? w3(r[1]) : gt(n.partialRange)
    ];
  }, x3 = () => t3.value[1] ? _() : w3(Te(t3.value[0])), Z = () => (t3.value || []).map((r) => w3(r)), le = () => (H3(), n.modelAuto ? x3() : n.multiDates ? Z() : Array.isArray(t3.value) ? Ht(() => _(), n.range) : w3(Te(t3.value))), v = (r) => !r || Array.isArray(r) && !r.length ? null : n.timePicker ? Q3(Te(r)) : n.monthPicker ? G3(Te(r)) : n.yearPicker ? q3(Te(r)) : n.multiDates ? b3(Te(r)) : n.weekPicker ? A(Te(r)) : O3(Te(r)), D3 = (r) => {
    const U = v(r);
    An(Te(U)) ? (t3.value = Te(U), F()) : (t3.value = null, c3.value = "");
  }, C = () => {
    const r = (U) => format(U, o.value.format);
    return `${r(t3.value[0])} ${o.value.rangeSeparator} ${t3.value[1] ? r(t3.value[1]) : ""}`;
  }, j = () => a3.value && t3.value ? Array.isArray(t3.value) ? C() : format(t3.value, o.value.format) : p(t3.value), f = () => t3.value ? n.multiDates ? t3.value.map((r) => p(r)).join("; ") : o.value.enabled && typeof o.value.format == "string" ? j() : p(t3.value) : "", F = () => {
    !n.format || typeof n.format == "string" || o.value.enabled && typeof o.value.format == "string" ? c3.value = f() : c3.value = n.format(t3.value);
  }, d3 = (r) => {
    if (n.utc) {
      const U = new Date(r);
      return n.utc === "preserve" ? new Date(U.getTime() + U.getTimezoneOffset() * 6e4) : U;
    }
    return n.modelType ? n.modelType === "date" || n.modelType === "timestamp" ? M3(new Date(r)) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? parse(r, l(), /* @__PURE__ */ new Date()) : M3(parse(r, n.modelType, /* @__PURE__ */ new Date())) : M3(new Date(r));
  }, w3 = (r) => r ? n.utc ? Sr(r, n.utc === "preserve", n.enableSeconds) : n.modelType ? n.modelType === "timestamp" ? +h5(r) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? p(h5(r)) : p(h5(r), n.modelType) : h5(r) : "", u3 = (r, U = false) => {
    if (e3("update:model-value", r), n.emitTimezone && U) {
      const R3 = Array.isArray(r) ? r.map((g) => Ze(Te(g)), n.emitTimezone) : Ze(Te(r), n.emitTimezone);
      e3("update:model-timezone-value", R3);
    }
  }, y3 = (r) => Array.isArray(t3.value) ? n.multiDates ? t3.value.map((U) => r(U)) : [
    r(t3.value[0]),
    t3.value[1] ? r(t3.value[1]) : gt(n.partialRange)
  ] : r(Te(t3.value)), s3 = (r) => u3(Te(y3(r)));
  return {
    inputValue: c3,
    internalModelValue: t3,
    checkBeforeEmit: () => t3.value ? n.range ? n.partialRange ? t3.value.length >= 1 : t3.value.length === 2 : !!t3.value : false,
    parseExternalModelValue: D3,
    formatInputValue: F,
    emitModelValue: () => (F(), n.monthPicker ? s3(E3) : n.timePicker ? s3(T3) : n.yearPicker ? s3(getYear) : n.weekPicker ? u3(t3.value, true) : u3(le(), true))
  };
};
var zr = (e3, n) => {
  const { defaultedFilters: a3 } = Ce(e3), { validateMonthYearInRange: t3 } = Bt(e3), o = (M3, p) => {
    let T3 = M3;
    return a3.value.months.includes(getMonth(T3)) ? (T3 = p ? addMonths(M3, 1) : subMonths(M3, 1), o(T3, p)) : T3;
  }, l = (M3, p) => {
    let T3 = M3;
    return a3.value.years.includes(getYear(T3)) ? (T3 = p ? addYears(M3, 1) : subYears(M3, 1), l(T3, p)) : T3;
  }, c3 = (M3) => {
    const p = set(/* @__PURE__ */ new Date(), { month: e3.month, year: e3.year });
    let T3 = M3 ? addMonths(p, 1) : subMonths(p, 1);
    e3.disableYearSelect && (T3 = setYear(T3, e3.year));
    let E3 = getMonth(T3), q3 = getYear(T3);
    a3.value.months.includes(E3) && (T3 = o(T3, M3), E3 = getMonth(T3), q3 = getYear(T3)), a3.value.years.includes(q3) && (T3 = l(T3, M3), q3 = getYear(T3)), t3(E3, q3, M3, e3.preventMinMaxNavigation) && k3(E3, q3);
  }, k3 = (M3, p) => {
    n("update-month-year", { month: M3, year: p });
  }, h5 = computed(() => (M3) => _a(
    set(/* @__PURE__ */ new Date(), { month: e3.month, year: e3.year }),
    e3.maxDate,
    e3.minDate,
    e3.preventMinMaxNavigation,
    M3
  ));
  return { handleMonthYearChange: c3, isDisabled: h5, updateMonthYear: k3 };
};
var yt = ((e3) => (e3.center = "center", e3.left = "left", e3.right = "right", e3))(yt || {});
var We = ((e3) => (e3.month = "month", e3.year = "year", e3))(We || {});
var st = ((e3) => (e3.top = "top", e3.bottom = "bottom", e3))(st || {});
var vt = ((e3) => (e3.header = "header", e3.calendar = "calendar", e3.timePicker = "timePicker", e3))(vt || {});
var jr = (e3, n, a3, t3, o, l, c3) => {
  const k3 = ref({}), h5 = ref(false), M3 = ref({
    top: "0",
    left: "0"
  }), p = ref(false), T3 = toRef(c3, "teleportCenter");
  watch(T3, () => {
    M3.value = JSON.parse(JSON.stringify({})), O3();
  });
  const E3 = (d3) => {
    if (c3.teleport) {
      const w3 = d3.getBoundingClientRect();
      return {
        left: w3.left + window.scrollX,
        top: w3.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, q3 = (d3, w3) => {
    M3.value.left = `${d3 + w3 - k3.value.width}px`;
  }, z3 = (d3) => {
    M3.value.left = `${d3}px`;
  }, Q3 = (d3, w3) => {
    c3.position === yt.left && z3(d3), c3.position === yt.right && q3(d3, w3), c3.position === yt.center && (M3.value.left = `${d3 + w3 / 2 - k3.value.width / 2}px`);
  }, G3 = (d3) => {
    const { width: w3, height: u3 } = d3.getBoundingClientRect(), { top: y3, left: s3 } = c3.altPosition ? c3.altPosition(d3) : E3(d3);
    return { top: +y3, left: +s3, width: w3, height: u3 };
  }, b3 = () => {
    M3.value.left = "50%", M3.value.top = "50%", M3.value.transform = "translate(-50%, -50%)", M3.value.position = "fixed", delete M3.value.opacity;
  }, A = () => {
    const d3 = Ae(a3), { top: w3, left: u3, transform: y3 } = c3.altPosition(d3);
    M3.value = { top: `${w3}px`, left: `${u3}px`, transform: y3 ?? "" };
  }, O3 = (d3 = true) => {
    var w3;
    if (!o.value.enabled) {
      if (T3.value)
        return b3();
      if (c3.altPosition !== null)
        return A();
      if (d3) {
        const u3 = c3.teleport ? (w3 = n.value) == null ? void 0 : w3.$el : e3.value;
        u3 && (k3.value = u3.getBoundingClientRect()), l("recalculate-position");
      }
      return D3();
    }
  }, H3 = ({ inputEl: d3, left: w3, width: u3 }) => {
    window.screen.width > 768 && !h5.value && Q3(w3, u3), Z(d3);
  }, _ = (d3) => {
    const { top: w3, left: u3, height: y3, width: s3 } = G3(d3);
    M3.value.top = `${y3 + w3 + +c3.offset}px`, p.value = false, h5.value || (M3.value.left = `${u3 + s3 / 2 - k3.value.width / 2}px`), H3({ inputEl: d3, left: u3, width: s3 });
  }, x3 = (d3) => {
    const { top: w3, left: u3, width: y3 } = G3(d3);
    M3.value.top = `${w3 - +c3.offset - k3.value.height}px`, p.value = true, H3({ inputEl: d3, left: u3, width: y3 });
  }, Z = (d3) => {
    if (c3.autoPosition) {
      const { left: w3, width: u3 } = G3(d3), { left: y3, right: s3 } = k3.value;
      if (!h5.value) {
        if (Math.abs(y3) !== Math.abs(s3)) {
          if (y3 <= 0)
            return h5.value = true, z3(w3);
          if (s3 >= document.documentElement.clientWidth)
            return h5.value = true, q3(w3, u3);
        }
        return Q3(w3, u3);
      }
    }
  }, le = () => {
    const d3 = Ae(a3);
    if (d3) {
      const { height: w3 } = k3.value, { top: u3, height: y3 } = d3.getBoundingClientRect(), P = window.innerHeight - u3 - y3, te = u3;
      return w3 <= P ? st.bottom : w3 > P && w3 <= te ? st.top : P >= te ? st.bottom : st.top;
    }
    return st.bottom;
  }, v = (d3) => le() === st.bottom ? _(d3) : x3(d3), D3 = () => {
    const d3 = Ae(a3);
    if (d3)
      return c3.autoPosition ? v(d3) : _(d3);
  }, C = function(d3) {
    if (d3) {
      const w3 = d3.scrollHeight > d3.clientHeight, y3 = window.getComputedStyle(d3).overflowY.indexOf("hidden") !== -1;
      return w3 && !y3;
    }
    return true;
  }, j = function(d3) {
    return !d3 || d3 === document.body || d3.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : C(d3) ? d3 : j(d3.parentNode);
  }, f = (d3) => {
    if (d3)
      switch (c3.position) {
        case yt.left:
          return { left: 0, transform: "translateX(0)" };
        case yt.right:
          return { left: `${d3.width}px`, transform: "translateX(-100%)" };
        default:
          return { left: `${d3.width / 2}px`, transform: "translateX(-50%)" };
      }
    return {};
  };
  return {
    openOnTop: p,
    menuStyle: M3,
    xCorrect: h5,
    setMenuPosition: O3,
    getScrollableParent: j,
    shadowRender: (d3, w3) => {
      var U, R3, g;
      const u3 = document.createElement("div"), y3 = (U = Ae(a3)) == null ? void 0 : U.getBoundingClientRect();
      u3.setAttribute("id", "dp--temp-container");
      const s3 = (R3 = t3.value) != null && R3.clientWidth ? t3.value : document.body;
      s3.append(u3);
      const P = document.getElementById("dp--temp-container"), te = f(y3), r = h(d3, {
        ...w3,
        shadow: true,
        style: { opacity: 0, position: "absolute", ...te }
      });
      render(r, P), k3.value = (g = r.el) == null ? void 0 : g.getBoundingClientRect(), render(null, P), s3.removeChild(P);
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
  monthYear: () => ot.filter((e3) => e3.use.includes("month-year")),
  input: () => Kr,
  timePicker: () => ot.filter((e3) => e3.use.includes("time")),
  action: () => ot.filter((e3) => e3.use.includes("action")),
  calendar: () => ot.filter((e3) => e3.use.includes("calendar")),
  menu: () => ot.filter((e3) => e3.use.includes("menu")),
  shared: () => ot.filter((e3) => e3.use.includes("shared"))
};
var je = (e3, n, a3) => {
  const t3 = [];
  return Gr[n]().forEach((o) => {
    e3[o.name] && t3.push(o.name);
  }), a3 != null && a3.length && a3.forEach((o) => {
    o.slot && t3.push(o.slot);
  }), t3;
};
var Yt = (e3) => {
  const n = computed(() => (t3) => e3.value ? t3 ? e3.value.open : e3.value.close : ""), a3 = computed(() => (t3) => e3.value ? t3 ? e3.value.menuAppearTop : e3.value.menuAppearBottom : "");
  return { transitionName: n, showTransition: !!e3.value, menuTransition: a3 };
};
var Zt = (e3, n) => {
  const a3 = ref([{ month: getMonth(S3()), year: getYear(S3()) }]), t3 = reactive({
    hours: e3.range ? [getHours(S3()), getHours(S3())] : getHours(S3()),
    minutes: e3.range ? [getMinutes(S3()), getMinutes(S3())] : getMinutes(S3()),
    seconds: e3.range ? [0, 0] : 0
  }), o = computed({
    get: () => e3.internalModelValue,
    set: (k3) => {
      !e3.readonly && !e3.disabled && n("update:internal-model-value", k3);
    }
  }), l = computed(
    () => (k3) => a3.value[k3] ? a3.value[k3].month : 0
  ), c3 = computed(
    () => (k3) => a3.value[k3] ? a3.value[k3].year : 0
  );
  return {
    calendars: a3,
    time: t3,
    modelValue: o,
    month: l,
    year: c3
  };
};
var Zr = (e3, n) => {
  const { defaultedMultiCalendars: a3 } = Ce(n), { isDisabled: t3, matchDate: o } = Bt(n), l = ref(null), c3 = ref(S3()), k3 = (s3) => {
    !s3.current && n.hideOffsetDates || (l.value = s3.value);
  }, h5 = () => {
    l.value = null;
  }, M3 = (s3) => Array.isArray(e3.value) && n.range && e3.value[0] && l.value ? s3 ? Re(l.value, e3.value[0]) : Pe(l.value, e3.value[0]) : true, p = (s3, P) => {
    const te = () => e3.value ? P ? e3.value[0] || null : e3.value[1] : null, r = e3.value && Array.isArray(e3.value) ? te() : null;
    return ye(S3(s3.value), r);
  }, T3 = (s3) => {
    const P = Array.isArray(e3.value) ? e3.value[0] : null;
    return s3 ? !Pe(l.value ?? null, P) : true;
  }, E3 = (s3, P = true) => (n.range || n.weekPicker) && Array.isArray(e3.value) && e3.value.length === 2 ? n.hideOffsetDates && !s3.current ? false : ye(S3(s3.value), e3.value[P ? 0 : 1]) : n.range ? p(s3, P) && T3(P) || ye(s3.value, Array.isArray(e3.value) ? e3.value[0] : null) && M3(P) : false, q3 = (s3, P, te) => Array.isArray(e3.value) && e3.value[0] && e3.value.length === 1 ? s3 ? false : te ? Re(e3.value[0], P.value) : Pe(e3.value[0], P.value) : false, z3 = (s3) => !e3.value || n.hideOffsetDates && !s3.current ? false : n.range ? n.modelAuto && Array.isArray(e3.value) ? ye(s3.value, e3.value[0] ? e3.value[0] : c3.value) : false : n.multiDates && Array.isArray(e3.value) ? e3.value.some((P) => ye(P, s3.value)) : ye(s3.value, e3.value ? e3.value : c3.value), Q3 = (s3) => {
    if (n.autoRange || n.weekPicker) {
      if (l.value) {
        if (n.hideOffsetDates && !s3.current)
          return false;
        const P = addDays(l.value, +n.autoRange), te = jt(S3(l.value), n.timezone, n.weekStart);
        return n.weekPicker ? ye(te[1], S3(s3.value)) : ye(P, S3(s3.value));
      }
      return false;
    }
    return false;
  }, G3 = (s3) => {
    if (n.autoRange || n.weekPicker) {
      if (l.value) {
        const P = addDays(l.value, +n.autoRange);
        if (n.hideOffsetDates && !s3.current)
          return false;
        const te = jt(S3(l.value), n.timezone, n.weekStart);
        return n.weekPicker ? Re(s3.value, te[0]) && Pe(s3.value, te[1]) : Re(s3.value, l.value) && Pe(s3.value, P);
      }
      return false;
    }
    return false;
  }, b3 = (s3) => {
    if (n.autoRange || n.weekPicker) {
      if (l.value) {
        if (n.hideOffsetDates && !s3.current)
          return false;
        const P = jt(S3(l.value), n.timezone, n.weekStart);
        return n.weekPicker ? ye(P[0], s3.value) : ye(l.value, s3.value);
      }
      return false;
    }
    return false;
  }, A = (s3) => Vn(e3.value, l.value, s3.value), O3 = () => n.modelAuto && Array.isArray(n.internalModelValue) ? !!n.internalModelValue[0] : false, H3 = () => n.modelAuto ? Da(n.internalModelValue) : true, _ = (s3) => {
    if (Array.isArray(e3.value) && e3.value.length || n.weekPicker)
      return false;
    const P = n.range ? !E3(s3) && !E3(s3, false) : true;
    return !t3(s3.value) && !z3(s3) && !(!s3.current && n.hideOffsetDates) && P;
  }, x3 = (s3) => n.range ? n.modelAuto ? O3() && z3(s3) : false : z3(s3), Z = (s3) => {
    var P;
    return n.highlight ? o(
      s3.value,
      (P = n.arrMapValues) != null && P.highlightedDates ? n.arrMapValues.highlightedDates : n.highlight
    ) : false;
  }, le = (s3) => t3(s3.value) && n.highlightDisabledDays === false, v = (s3) => {
    var P;
    return (P = n.highlightWeekDays) == null ? void 0 : P.includes(s3.value.getDay());
  }, D3 = (s3) => (n.range || n.weekPicker) && (!(a3.value.count > 0) || s3.current) && H3() && !(!s3.current && n.hideOffsetDates) && !z3(s3) ? A(s3) : false, C = (s3) => {
    const { isRangeStart: P, isRangeEnd: te } = F(s3), r = n.range ? P || te : false;
    return {
      dp__cell_offset: !s3.current,
      dp__pointer: !n.disabled && !(!s3.current && n.hideOffsetDates) && !t3(s3.value),
      dp__cell_disabled: t3(s3.value),
      dp__cell_highlight: !le(s3) && (Z(s3) || v(s3)) && !x3(s3) && !r,
      dp__cell_highlight_active: !le(s3) && (Z(s3) || v(s3)) && x3(s3),
      dp__today: !n.noToday && ye(s3.value, c3.value) && s3.current
    };
  }, j = (s3) => ({
    dp__active_date: x3(s3),
    dp__date_hover: _(s3)
  }), f = (s3) => ({
    ...d3(s3),
    ...w3(s3),
    dp__range_between_week: D3(s3) && n.weekPicker
  }), F = (s3) => {
    const P = a3.value.count > 0 ? s3.current && E3(s3) && H3() : E3(s3) && H3(), te = a3.value.count > 0 ? s3.current && E3(s3, false) && H3() : E3(s3, false) && H3();
    return { isRangeStart: P, isRangeEnd: te };
  }, d3 = (s3) => {
    const { isRangeStart: P, isRangeEnd: te } = F(s3);
    return {
      dp__range_start: P,
      dp__range_end: te,
      dp__range_between: D3(s3) && !n.weekPicker,
      dp__date_hover_start: q3(_(s3), s3, true),
      dp__date_hover_end: q3(_(s3), s3, false)
    };
  }, w3 = (s3) => ({
    ...d3(s3),
    dp__cell_auto_range: G3(s3),
    dp__cell_auto_range_start: b3(s3),
    dp__cell_auto_range_end: Q3(s3)
  }), u3 = (s3) => n.range ? n.autoRange ? w3(s3) : n.modelAuto ? { ...j(s3), ...d3(s3) } : d3(s3) : n.weekPicker ? f(s3) : j(s3);
  return {
    setHoverDate: k3,
    clearHoverDate: h5,
    getDayClassData: (s3) => n.hideOffsetDates && !s3.current ? {} : {
      ...C(s3),
      ...u3(s3),
      [n.dayClass ? n.dayClass(s3.value) : ""]: true,
      [n.calendarCellClassName]: !!n.calendarCellClassName
    }
  };
};
var Bt = (e3) => {
  const { defaultedFilters: n } = Ce(e3), a3 = (v) => {
    const D3 = Le(t3(S3(v))).toISOString(), [C] = D3.split("T");
    return C;
  }, t3 = (v) => Ze(v, e3.timezone), o = (v) => {
    var s3;
    const D3 = e3.maxDate ? Re(t3(v), t3(S3(e3.maxDate))) : false, C = e3.minDate ? Pe(t3(v), t3(S3(e3.minDate))) : false, j = h5(
      v,
      (s3 = e3.arrMapValues) != null && s3.disabledDates ? e3.arrMapValues.disabledDates : e3.disabledDates
    ), F = n.value.months.map((P) => +P).includes(getMonth(v)), d3 = e3.disabledWeekDays.length ? e3.disabledWeekDays.some((P) => +P === getDay(v)) : false, w3 = p(v), u3 = getYear(v), y3 = u3 < +e3.yearRange[0] || u3 > +e3.yearRange[1];
    return !(D3 || C || j || F || y3 || d3 || w3);
  }, l = (v, D3) => Pe(...et(e3.minDate, v, D3)) || ye(...et(e3.minDate, v, D3)), c3 = (v, D3) => Re(...et(e3.maxDate, v, D3)) || ye(...et(e3.maxDate, v, D3)), k3 = (v, D3, C) => {
    let j = false;
    return e3.maxDate && C && c3(v, D3) && (j = true), e3.minDate && !C && l(v, D3) && (j = true), j;
  }, h5 = (v, D3) => v ? D3 instanceof Map ? !!D3.get(a3(v)) : Array.isArray(D3) ? D3.some((C) => ye(t3(S3(C)), t3(v))) : D3 ? D3(S3(JSON.parse(JSON.stringify(v)))) : false : true, M3 = (v, D3, C, j) => {
    let f = false;
    return j ? e3.minDate && e3.maxDate ? f = k3(v, D3, C) : (e3.minDate && l(v, D3) || e3.maxDate && c3(v, D3)) && (f = true) : f = true, f;
  }, p = (v) => {
    var D3, C, j, f, F;
    return Array.isArray(e3.allowedDates) && !((D3 = e3.allowedDates) != null && D3.length) ? true : (C = e3.arrMapValues) != null && C.allowedDates ? !h5(v, (j = e3.arrMapValues) == null ? void 0 : j.allowedDates) : (f = e3.allowedDates) != null && f.length ? !((F = e3.allowedDates) != null && F.some((d3) => ye(t3(S3(d3)), t3(v)))) : false;
  }, T3 = (v) => !o(v), E3 = (v) => !eachDayOfInterval({ start: v[0], end: v[1] }).some((C) => T3(C)), q3 = (v, D3, C = 0) => {
    if (Array.isArray(D3) && D3[C]) {
      const j = differenceInCalendarDays(v, D3[C]), f = Ta(D3[C], v), F = f.length === 1 ? 0 : f.filter((w3) => T3(w3)).length, d3 = Math.abs(j) - F;
      if (e3.minRange && e3.maxRange)
        return d3 >= +e3.minRange && d3 <= +e3.maxRange;
      if (e3.minRange)
        return d3 >= +e3.minRange;
      if (e3.maxRange)
        return d3 <= +e3.maxRange;
    }
    return true;
  }, z3 = (v) => new Map(v.map((D3) => [a3(D3), true])), Q3 = (v) => Array.isArray(v) && v.length > 0, G3 = () => {
    const v = {
      disabledDates: null,
      allowedDates: null,
      highlightedDates: null
    };
    return Q3(e3.allowedDates) && (v.allowedDates = z3(e3.allowedDates)), Q3(e3.highlight) && (v.highlightedDates = z3(e3.highlight)), Q3(e3.disabledDates) && (v.disabledDates = z3(e3.disabledDates)), v;
  }, b3 = () => !e3.enableTimePicker || e3.monthPicker || e3.yearPicker || e3.ignoreTimeValidation, A = (v) => Array.isArray(v) ? [v[0] ? vn(v[0]) : null, v[1] ? vn(v[1]) : null] : vn(v), O3 = (v, D3, C) => v.find(
    (j) => +j.hours === getHours(D3) && j.minutes === "*" ? true : +j.minutes === getMinutes(D3)
  ) && C, H3 = (v, D3, C) => {
    const [j, f] = v, [F, d3] = D3;
    return !O3(j, F, C) && !O3(f, d3, C) && C;
  }, _ = (v, D3) => {
    const C = Array.isArray(D3) ? D3 : [D3];
    return Array.isArray(e3.disabledTimes) ? Array.isArray(e3.disabledTimes[0]) ? H3(e3.disabledTimes, C, v) : !C.some((j) => O3(e3.disabledTimes, j, v)) : v;
  }, x3 = (v, D3) => {
    const C = Array.isArray(D3) ? [ft(D3[0]), D3[1] ? ft(D3[1]) : void 0] : ft(D3), j = !e3.disabledTimes(C);
    return v && j;
  }, Z = (v, D3) => e3.disabledTimes ? Array.isArray(e3.disabledTimes) ? _(D3, v) : x3(D3, v) : D3;
  return {
    isDisabled: T3,
    validateDate: o,
    validateMonthYearInRange: M3,
    isDateRangeAllowed: E3,
    checkMinMaxRange: q3,
    matchDate: h5,
    mapDatesArrToMap: G3,
    isValidTime: (v) => {
      let D3 = true;
      if (!v || b3())
        return true;
      const C = !e3.minDate && !e3.maxDate ? A(v) : v;
      return (e3.maxTime || e3.maxDate) && (D3 = ra(e3.maxTime, e3.maxDate, "max", Te(C), D3)), (e3.minTime || e3.minDate) && (D3 = ra(e3.minTime, e3.minDate, "min", Te(C), D3)), Z(v, D3);
    }
  };
};
var qt = () => {
  const e3 = computed(() => (t3, o) => t3 == null ? void 0 : t3.includes(o)), n = computed(() => (t3, o) => t3.count ? t3.solo ? true : o === 0 : true), a3 = computed(() => (t3, o) => t3.count ? t3.solo ? true : o === t3.count - 1 : true);
  return { hideNavigationButtons: e3, showLeftIcon: n, showRightIcon: a3 };
};
var qr = (e3, n, a3) => {
  const t3 = ref(0), o = reactive({
    // monthYearInput: !!props.timePicker,
    [vt.timePicker]: !e3.enableTimePicker || e3.timePicker || e3.monthPicker,
    [vt.calendar]: false,
    [vt.header]: false
  }), l = (p) => {
    var T3;
    (T3 = e3.flow) != null && T3.length && (o[p] = true, Object.keys(o).filter((E3) => !o[E3]).length || M3());
  }, c3 = () => {
    var p;
    (p = e3.flow) != null && p.length && t3.value !== -1 && (t3.value += 1, n("flow-step", t3.value), M3());
  }, k3 = () => {
    t3.value = -1;
  }, h5 = (p, T3, ...E3) => {
    e3.flow[t3.value] === p && a3.value && a3.value[T3](...E3);
  }, M3 = () => {
    h5("month", "toggleMonthPicker", true), h5("year", "toggleYearPicker", true), h5("calendar", "toggleTimePicker", false, true), h5("time", "toggleTimePicker", true, true);
    const p = e3.flow[t3.value];
    (p === "hours" || p === "minutes" || p === "seconds") && h5(p, "toggleTimePicker", true, true, p);
  };
  return { childMount: l, updateFlowStep: c3, resetFlow: k3, flowStep: t3 };
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
  setup(e3, { expose: n, emit: a3 }) {
    const t3 = e3, { defaultedTextInput: o, defaultedAriaLabels: l, defaultedInline: c3, getDefaultPattern: k3, getDefaultStartTime: h5 } = Ce(t3), M3 = ref(), p = ref(null), T3 = ref(false), E3 = ref(false), q3 = computed(
      () => ({
        dp__pointer: !t3.disabled && !t3.readonly && !o.value.enabled,
        dp__disabled: t3.disabled,
        dp__input_readonly: !o.value.enabled,
        dp__input: true,
        dp__input_icon_pad: !t3.hideInputIcon,
        dp__input_valid: t3.state,
        dp__input_invalid: t3.state === false,
        dp__input_focus: T3.value || t3.isMenuOpen,
        dp__input_reg: !o.value.enabled,
        [t3.inputClassName]: !!t3.inputClassName
      })
    ), z3 = () => {
      a3("set-input-date", null), t3.autoApply && (a3("set-empty-date"), M3.value = null);
    }, Q3 = (f) => {
      const F = h5();
      return _r(
        f,
        o.value.format ?? k3(),
        F ?? Aa({}, t3.enableSeconds),
        t3.inputValue,
        E3.value
      );
    }, G3 = (f) => {
      const { rangeSeparator: F } = o.value, [d3, w3] = f.split(`${F}`);
      if (d3) {
        const u3 = Q3(d3.trim()), y3 = w3 ? Q3(w3.trim()) : null, s3 = u3 && y3 ? [u3, y3] : [u3];
        M3.value = u3 ? s3 : null;
      }
    }, b3 = () => {
      E3.value = true;
    }, A = (f) => {
      if (t3.range)
        G3(f);
      else if (t3.multiDates) {
        const F = f.split(";");
        M3.value = F.map((d3) => Q3(d3.trim())).filter((d3) => d3);
      } else
        M3.value = Q3(f);
    }, O3 = (f) => {
      var d3;
      const F = typeof f == "string" ? f : (d3 = f.target) == null ? void 0 : d3.value;
      F !== "" ? (o.value.openMenu && !t3.isMenuOpen && a3("open"), A(F), a3("set-input-date", M3.value)) : z3(), E3.value = false, a3("update:input-value", F);
    }, H3 = (f) => {
      o.value.enabled ? (A(f.target.value), o.value.enterSubmit && An(M3.value) && t3.inputValue !== "" ? (a3("set-input-date", M3.value, true), M3.value = null) : o.value.enterSubmit && t3.inputValue === "" && (M3.value = null, a3("clear"))) : Z(f);
    }, _ = (f) => {
      o.value.enabled && o.value.tabSubmit && A(f.target.value), o.value.tabSubmit && An(M3.value) && t3.inputValue !== "" ? (a3("set-input-date", M3.value, true), M3.value = null) : o.value.tabSubmit && t3.inputValue === "" && (M3.value = null, a3("clear"));
    }, x3 = () => {
      T3.value = true, a3("focus");
    }, Z = (f) => {
      f.preventDefault(), f.stopImmediatePropagation(), f.stopPropagation(), o.value.enabled && o.value.openMenu && !c3.value.input && !t3.isMenuOpen ? a3("open") : o.value.enabled || a3("toggle");
    }, le = () => {
      a3("real-blur"), T3.value = false, (!t3.isMenuOpen || c3.value.enabled && c3.value.input) && a3("blur"), t3.autoApply && o.value.enabled && M3.value && !t3.isMenuOpen && (a3("set-input-date", M3.value), a3("select-date"), M3.value = null);
    }, v = () => {
      a3("clear");
    }, D3 = (f) => {
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
        M3.value = f;
      }
    }), (f, F) => {
      var d3;
      return openBlock(), createElementBlock("div", { onClick: Z }, [
        f.$slots.trigger && !f.$slots["dp-input"] && !unref(c3).enabled ? renderSlot(f.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !f.$slots.trigger && (!unref(c3).enabled || unref(c3).input) ? (openBlock(), createElementBlock("div", xr, [
          f.$slots["dp-input"] && !f.$slots.trigger && !unref(c3).enabled ? renderSlot(f.$slots, "dp-input", {
            key: 0,
            value: e3.inputValue,
            isMenuOpen: e3.isMenuOpen,
            onInput: O3,
            onEnter: H3,
            onTab: _,
            onClear: v,
            onBlur: le,
            onKeypress: D3,
            onPaste: b3
          }) : createCommentVNode("", true),
          f.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            ref_key: "inputRef",
            ref: p,
            id: f.uid ? `dp-input-${f.uid}` : void 0,
            name: f.name,
            class: normalizeClass(q3.value),
            inputmode: unref(o).enabled ? "text" : "none",
            placeholder: f.placeholder,
            disabled: f.disabled,
            readonly: f.readonly,
            required: f.required,
            value: e3.inputValue,
            autocomplete: f.autocomplete,
            "aria-label": (d3 = unref(l)) == null ? void 0 : d3.input,
            onInput: O3,
            onKeydown: [
              withKeys(H3, ["enter"]),
              withKeys(_, ["tab"]),
              D3
            ],
            onBlur: le,
            onFocus: x3,
            onKeypress: D3,
            onPaste: b3
          }, null, 42, Jr)),
          createBaseVNode("div", {
            onClick: F[2] || (F[2] = (w3) => a3("toggle"))
          }, [
            f.$slots["input-icon"] && !f.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: F[0] || (F[0] = (w3) => a3("toggle"))
            }, [
              renderSlot(f.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !f.$slots["input-icon"] && !f.hideInputIcon && !f.$slots["dp-input"] ? (openBlock(), createBlock(unref(It), {
              key: 1,
              onClick: F[1] || (F[1] = (w3) => a3("toggle")),
              class: "dp__input_icon dp__input_icons"
            })) : createCommentVNode("", true)
          ]),
          f.$slots["clear-icon"] && e3.inputValue && f.clearable && !f.disabled && !f.readonly ? (openBlock(), createElementBlock("span", Xr, [
            renderSlot(f.$slots, "clear-icon", { clear: v })
          ])) : createCommentVNode("", true),
          f.clearable && !f.$slots["clear-icon"] && e3.inputValue && !f.disabled && !f.readonly ? (openBlock(), createBlock(unref(ha), {
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
  setup(e3, { emit: n }) {
    const a3 = e3, {
      defaultedActionRow: t3,
      defaultedPreviewFormat: o,
      defaultedMultiCalendars: l,
      defaultedTextInput: c3,
      defaultedInline: k3,
      getDefaultPattern: h5
    } = Ce(a3), { isValidTime: M3 } = Bt(a3), { buildMatrix: p } = rt(), T3 = ref(null), E3 = ref(null);
    onMounted(() => {
      a3.arrowNavigation && p([Ae(T3), Ae(E3)], "actionRow");
    });
    const q3 = computed(() => a3.range && !a3.partialRange && a3.internalModelValue ? a3.internalModelValue.length === 2 : true), z3 = computed(() => !Q3.value || !G3.value || !q3.value), Q3 = computed(() => !a3.enableTimePicker || a3.ignoreTimeValidation ? true : M3(a3.internalModelValue)), G3 = computed(() => a3.monthPicker ? a3.range && Array.isArray(a3.internalModelValue) ? !a3.internalModelValue.filter((D3) => !Z(D3)).length : Z(a3.internalModelValue) : true), b3 = () => {
      const v = o.value;
      return a3.timePicker || a3.monthPicker, v(Te(a3.internalModelValue));
    }, A = () => {
      const v = a3.internalModelValue;
      return l.value.count > 0 ? `${O3(v[0])} - ${O3(v[1])}` : [O3(v[0]), O3(v[1])];
    }, O3 = (v) => Sa(
      v,
      o.value,
      a3.formatLocale,
      c3.value.rangeSeparator,
      a3.modelAuto,
      h5()
    ), H3 = computed(() => !a3.internalModelValue || !a3.menuMount ? "" : typeof o.value == "string" ? Array.isArray(a3.internalModelValue) ? a3.internalModelValue.length === 2 && a3.internalModelValue[1] ? A() : a3.multiDates ? a3.internalModelValue.map((v) => `${O3(v)}`) : a3.modelAuto ? `${O3(a3.internalModelValue[0])}` : `${O3(a3.internalModelValue[0])} -` : O3(a3.internalModelValue) : b3()), _ = () => a3.multiDates ? "; " : " - ", x3 = computed(
      () => Array.isArray(H3.value) ? H3.value.join(_()) : H3.value
    ), Z = (v) => {
      if (!a3.monthPicker)
        return true;
      let D3 = true;
      const C = S3(ze(v));
      if (a3.minDate && a3.maxDate) {
        const j = S3(ze(a3.minDate)), f = S3(ze(a3.maxDate));
        return Re(C, j) && Pe(C, f) || ye(C, j) || ye(C, f);
      }
      if (a3.minDate) {
        const j = S3(ze(a3.minDate));
        D3 = Re(C, j) || ye(C, j);
      }
      if (a3.maxDate) {
        const j = S3(ze(a3.maxDate));
        D3 = Pe(C, j) || ye(C, j);
      }
      return D3;
    }, le = () => {
      Q3.value && G3.value && q3.value ? n("select-date") : n("invalid-select");
    };
    return (v, D3) => (openBlock(), createElementBlock("div", {
      class: "dp__action_row",
      style: normalizeStyle(e3.calendarWidth ? { width: `${e3.calendarWidth}px` } : {})
    }, [
      v.$slots["action-row"] ? renderSlot(v.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: v.internalModelValue,
        disabled: z3.value,
        selectDate: () => v.$emit("select-date"),
        closePicker: () => v.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(t3).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: x3.value
        }, [
          v.$slots["action-preview"] ? renderSlot(v.$slots, "action-preview", {
            key: 0,
            value: v.internalModelValue
          }) : createCommentVNode("", true),
          v.$slots["action-preview"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(x3.value), 1)
          ], 64))
        ], 8, el)) : createCommentVNode("", true),
        createBaseVNode("div", tl, [
          v.$slots["action-buttons"] ? renderSlot(v.$slots, "action-buttons", {
            key: 0,
            value: v.internalModelValue
          }) : createCommentVNode("", true),
          v.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(k3).enabled && unref(t3).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              ref_key: "cancelButtonRef",
              ref: T3,
              class: "dp__action_button dp__action_cancel",
              onClick: D3[0] || (D3[0] = (C) => v.$emit("close-picker")),
              onKeydown: [
                D3[1] || (D3[1] = withKeys((C) => v.$emit("close-picker"), ["enter"])),
                D3[2] || (D3[2] = withKeys((C) => v.$emit("close-picker"), ["space"]))
              ]
            }, toDisplayString(v.cancelText), 545)) : createCommentVNode("", true),
            unref(t3).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              ref_key: "cancelButtonRef",
              ref: T3,
              class: "dp__action_button dp__action_cancel",
              onClick: D3[3] || (D3[3] = (C) => v.$emit("select-now")),
              onKeydown: [
                D3[4] || (D3[4] = withKeys((C) => v.$emit("select-now"), ["enter"])),
                D3[5] || (D3[5] = withKeys((C) => v.$emit("select-now"), ["space"]))
              ]
            }, toDisplayString(v.nowButtonLabel), 545)) : createCommentVNode("", true),
            unref(t3).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              type: "button",
              class: "dp__action_button dp__action_select",
              onKeydown: [
                withKeys(le, ["enter"]),
                withKeys(le, ["space"])
              ],
              onClick: le,
              disabled: z3.value,
              ref_key: "selectButtonRef",
              ref: E3
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
  setup(e3, { expose: n, emit: a3 }) {
    const t3 = e3, { setSelectionGrid: o, buildMultiLevelMatrix: l, setMonthPicker: c3 } = rt(), { defaultedAriaLabels: k3, defaultedTextInput: h5 } = Ce(t3), { hideNavigationButtons: M3 } = qt(), p = ref(false), T3 = ref(null), E3 = ref(null), q3 = ref([]), z3 = ref(), Q3 = ref(null), G3 = ref(0), b3 = ref(null);
    onBeforeUpdate(() => {
      T3.value = null;
    }), onMounted(() => {
      nextTick().then(() => v()), O3(), A(true);
    }), onUnmounted(() => A(false));
    const A = (u3) => {
      var y3;
      t3.arrowNavigation && ((y3 = t3.headerRefs) != null && y3.length ? c3(u3) : o(u3));
    }, O3 = () => {
      var y3;
      const u3 = Ae(E3);
      u3 && (h5.value.enabled || (T3.value ? (y3 = T3.value) == null || y3.focus({ preventScroll: true }) : u3.focus({ preventScroll: true })), p.value = u3.clientHeight < u3.scrollHeight);
    }, H3 = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !t3.useRelative,
        "dp--overlay-relative": t3.useRelative
      })
    ), _ = computed(
      () => t3.useRelative ? { height: `${t3.height}px`, width: "260px" } : void 0
    ), x3 = computed(() => ({
      dp__overlay_col: true
    })), Z = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: p.value,
        dp__button_bottom: t3.isLast
      })
    ), le = computed(() => {
      var u3, y3;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((u3 = t3.items) == null ? void 0 : u3.length) <= 6,
        dp__container_block: ((y3 = t3.items) == null ? void 0 : y3.length) > 6
      };
    }), v = () => {
      nextTick().then(() => {
        const u3 = Ae(T3), y3 = Ae(E3), s3 = Ae(Q3), P = Ae(b3), te = s3 ? s3.getBoundingClientRect().height : 0;
        y3 && (G3.value = y3.getBoundingClientRect().height - te), u3 && P && (P.scrollTop = u3.offsetTop - P.offsetTop - (G3.value / 2 - u3.getBoundingClientRect().height) - te);
      });
    }, D3 = (u3) => {
      u3.disabled || a3("selected", u3.value);
    }, C = () => {
      a3("toggle"), a3("reset-flow");
    }, j = () => {
      t3.escClose && C();
    }, f = (u3, y3, s3, P) => {
      u3 && (y3.active && (T3.value = u3), t3.arrowNavigation && (Array.isArray(q3.value[s3]) ? q3.value[s3][P] = u3 : q3.value[s3] = [u3], F()));
    }, F = () => {
      var y3, s3;
      const u3 = (y3 = t3.headerRefs) != null && y3.length ? [t3.headerRefs].concat(q3.value) : q3.value.concat([t3.skipButtonRef ? [] : [Q3.value]]);
      l(Te(u3), (s3 = t3.headerRefs) != null && s3.length ? "monthPicker" : "selectionGrid");
    }, d3 = (u3) => {
      t3.arrowNavigation || u3.stopImmediatePropagation();
    }, w3 = (u3) => {
      z3.value = u3, a3("hover-value", u3);
    };
    return n({ focusGrid: O3 }), (u3, y3) => {
      var s3;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: E3,
        class: normalizeClass(H3.value),
        style: normalizeStyle(_.value),
        role: "dialog",
        tabindex: "0",
        onKeydown: [
          withKeys(withModifiers(j, ["prevent"]), ["esc"]),
          y3[0] || (y3[0] = withKeys(withModifiers((P) => d3(P), ["prevent"]), ["left"])),
          y3[1] || (y3[1] = withKeys(withModifiers((P) => d3(P), ["prevent"]), ["up"])),
          y3[2] || (y3[2] = withKeys(withModifiers((P) => d3(P), ["prevent"]), ["down"])),
          y3[3] || (y3[3] = withKeys(withModifiers((P) => d3(P), ["prevent"]), ["right"]))
        ]
      }, [
        createBaseVNode("div", {
          class: normalizeClass(le.value),
          ref_key: "containerRef",
          ref: b3,
          role: "grid",
          style: normalizeStyle({ height: `${G3.value}px` })
        }, [
          createBaseVNode("div", ll, [
            renderSlot(u3.$slots, "header")
          ]),
          u3.$slots.overlay ? renderSlot(u3.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(u3.items, (P, te) => (openBlock(), createElementBlock("div", {
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: u3.items.length >= 3 }]),
            key: te,
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(P, (r, U) => (openBlock(), createElementBlock("div", {
              role: "gridcell",
              class: normalizeClass(x3.value),
              key: r.value,
              "aria-selected": r.active,
              "aria-disabled": r.disabled || void 0,
              ref_for: true,
              ref: (R3) => f(R3, r, te, U),
              tabindex: "0",
              onClick: (R3) => D3(r),
              onKeydown: [
                withKeys(withModifiers((R3) => D3(r), ["prevent"]), ["enter"]),
                withKeys(withModifiers((R3) => D3(r), ["prevent"]), ["space"])
              ],
              onMouseover: (R3) => w3(r.value)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(r.className)
              }, [
                u3.$slots.item ? renderSlot(u3.$slots, "item", {
                  key: 0,
                  item: r
                }) : createCommentVNode("", true),
                u3.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(r.text), 1)
                ], 64))
              ], 2)
            ], 42, ol))), 128))
          ], 2))), 128))
        ], 6),
        u3.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          role: "button",
          "aria-label": (s3 = unref(k3)) == null ? void 0 : s3.toggleOverlay,
          class: normalizeClass(Z.value),
          tabindex: "0",
          ref_key: "toggleButton",
          ref: Q3,
          onClick: C,
          onKeydown: [
            withKeys(C, ["enter"]),
            withKeys(C, ["tab"])
          ]
        }, [
          renderSlot(u3.$slots, "button-icon")
        ], 42, sl)), [
          [vShow, !unref(M3)(u3.hideNavigation, u3.type)]
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
  setup(e3) {
    const n = e3, a3 = computed(
      () => n.multiCalendars > 0 ? [...Array(n.multiCalendars).keys()] : [0]
    ), t3 = computed(() => ({
      dp__instance_calendar: n.multiCalendars > 0
    }));
    return (o, l) => (openBlock(), createElementBlock("div", {
      class: normalizeClass({
        dp__menu_inner: !o.stretch,
        "dp--menu--inner-stretched": o.stretch,
        dp__flex_display: o.multiCalendars > 0
      })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(a3.value, (c3, k3) => (openBlock(), createElementBlock("div", {
        key: c3,
        class: normalizeClass(t3.value)
      }, [
        renderSlot(o.$slots, "default", {
          instance: c3,
          index: k3
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
  setup(e3, { emit: n }) {
    const a3 = ref(null);
    return onMounted(() => n("set-ref", a3)), (t3, o) => (openBlock(), createElementBlock("button", {
      type: "button",
      class: "dp__btn dp--arrow-btn-nav",
      onClick: o[0] || (o[0] = (l) => t3.$emit("activate")),
      onKeydown: [
        o[1] || (o[1] = withKeys(withModifiers((l) => t3.$emit("activate"), ["prevent"]), ["enter"])),
        o[2] || (o[2] = withKeys(withModifiers((l) => t3.$emit("activate"), ["prevent"]), ["space"]))
      ],
      tabindex: "0",
      "aria-label": t3.ariaLabel,
      "aria-disabled": t3.disabled || void 0,
      ref_key: "elRef",
      ref: a3
    }, [
      createBaseVNode("span", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: t3.disabled }])
      }, [
        renderSlot(t3.$slots, "default")
      ], 2)
    ], 40, ul));
  }
});
var Ln = (e3, n, a3) => {
  if (n.value && Array.isArray(n.value))
    if (n.value.some((t3) => ye(e3, t3))) {
      const t3 = n.value.filter((o) => !ye(o, e3));
      n.value = t3.length ? t3 : null;
    } else
      (a3 && +a3 > n.value.length || !a3) && n.value.push(e3);
  else
    n.value = [e3];
};
var Ca = (e3, n, a3) => {
  let t3 = e3.value ? e3.value.slice() : [];
  return t3.length === 2 && t3[1] !== null && (t3 = []), t3.length ? Pe(n, t3[0]) ? (t3.unshift(n), a3("range-start", t3[0]), a3("range-start", t3[1])) : (t3[1] = n, a3("range-end", n)) : (t3 = [n], a3("range-start", n)), e3.value = t3, t3;
};
var Un = (e3, n, a3, t3) => {
  e3[0] && e3[1] && a3 && n("auto-apply"), e3[0] && !e3[1] && t3 && a3 && n("auto-apply");
};
var il = (e3, n) => {
  const { defaultedMultiCalendars: a3, defaultedAriaLabels: t3, defaultedTransitions: o } = Ce(e3), { modelValue: l, year: c3, month: k3, calendars: h5 } = Zt(e3, n), M3 = computed(() => wa(e3.formatLocale, e3.locale, e3.monthNameFormat)), p = computed(() => Fn(e3.yearRange, e3.reverseYears)), T3 = ref(null), E3 = () => {
    for (let d3 = 0; d3 < a3.value.count; d3++)
      if (d3 === 0)
        h5.value[d3] = h5.value[0];
      else {
        const w3 = set(S3(), h5.value[d3 - 1]);
        h5.value[d3] = { month: getMonth(w3), year: getYear(addYears(w3, d3)) };
      }
  }, q3 = (d3) => {
    if (!d3)
      return E3();
    const w3 = set(S3(), h5.value[d3]);
    return h5.value[0].year = getYear(subYears(w3, a3.value.count - 1)), E3();
  }, z3 = (d3) => e3.focusStartDate ? d3[0] : d3[1] ? d3[1] : d3[0], Q3 = () => {
    if (l.value) {
      const d3 = Array.isArray(l.value) ? z3(l.value) : l.value;
      h5.value[0] = { month: getMonth(d3), year: getYear(d3) };
    }
  };
  onMounted(() => {
    Q3(), a3.value.count && E3();
  });
  const G3 = computed(() => (d3, w3) => {
    const u3 = set(ze(/* @__PURE__ */ new Date()), {
      month: k3.value(d3),
      year: c3.value(d3)
    });
    return _a(u3, e3.maxDate, e3.minDate, e3.preventMinMaxNavigation, w3);
  }), b3 = (d3) => d3 ? { month: getMonth(d3), year: getYear(d3) } : { month: null, year: null }, A = () => l.value ? Array.isArray(l.value) ? l.value.map((d3) => b3(d3)) : b3(l.value) : b3(), O3 = (d3, w3) => {
    const u3 = h5.value[d3], y3 = A();
    return Array.isArray(y3) ? y3.some((s3) => s3.year === (u3 == null ? void 0 : u3.year) && s3.month === w3) : (u3 == null ? void 0 : u3.year) === y3.year && w3 === y3.month;
  }, H3 = (d3, w3, u3) => {
    var s3, P;
    const y3 = A();
    return Array.isArray(y3) ? c3.value(w3) === ((s3 = y3[u3]) == null ? void 0 : s3.year) && d3 === ((P = y3[u3]) == null ? void 0 : P.month) : false;
  }, _ = (d3, w3) => {
    if (e3.range) {
      const u3 = A();
      if (Array.isArray(l.value) && Array.isArray(u3)) {
        const y3 = H3(d3, w3, 0) || H3(d3, w3, 1), s3 = Je(ze(S3()), d3, c3.value(w3));
        return Vn(l.value, T3.value, s3) && !y3;
      }
      return false;
    }
    return false;
  }, x3 = computed(() => (d3) => bt(M3.value, (w3) => {
    const u3 = O3(d3, w3.value), y3 = Ct(
      w3.value,
      Ma(c3.value(d3), e3.minDate),
      $a(c3.value(d3), e3.maxDate)
    ) || Ir(e3.disabledDates, c3.value(d3)).includes(w3.value), s3 = _(w3.value, d3);
    return { active: u3, disabled: y3, isBetween: s3 };
  })), Z = computed(() => (d3) => bt(p.value, (w3) => {
    const u3 = c3.value(d3) === w3.value, y3 = Ct(w3.value, kt(e3.minDate), kt(e3.maxDate));
    return { active: u3, disabled: y3 };
  })), le = (d3, w3) => Je(ze(S3()), d3, c3.value(w3)), v = (d3, w3) => {
    const u3 = l.value ? l.value : ze(/* @__PURE__ */ new Date());
    l.value = Je(u3, d3, c3.value(w3)), n("auto-apply");
  }, D3 = (d3, w3) => {
    const u3 = Ca(l, le(d3, w3), n);
    Un(u3, n, e3.autoApply, e3.modelAuto);
  }, C = (d3, w3) => {
    Ln(le(d3, w3), l, e3.multiDatesLimit), n("auto-apply", true);
  };
  return {
    groupedMonths: x3,
    groupedYears: Z,
    year: c3,
    isDisabled: G3,
    defaultedMultiCalendars: a3,
    defaultedAriaLabels: t3,
    defaultedTransitions: o,
    setHoverDate: (d3, w3) => {
      T3.value = le(d3, w3);
    },
    selectMonth: (d3, w3) => (h5.value[w3].month = d3, e3.multiDates ? C(d3, w3) : e3.range ? D3(d3, w3) : v(d3, w3)),
    selectYear: (d3, w3) => {
      h5.value[w3].year = d3, a3.value.count && !a3.value.solo && q3(w3);
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
  setup(e3, { emit: n }) {
    const a3 = e3, {
      groupedMonths: t3,
      groupedYears: o,
      year: l,
      isDisabled: c3,
      defaultedMultiCalendars: k3,
      defaultedAriaLabels: h5,
      defaultedTransitions: M3,
      setHoverDate: p,
      selectMonth: T3,
      selectYear: E3
    } = il(a3, n), { transitionName: q3, showTransition: z3 } = Yt(M3), { showRightIcon: Q3, showLeftIcon: G3 } = qt(), b3 = ref([false]), A = (_, x3) => {
      E3(_, x3), H3(x3);
    }, O3 = (_, x3 = false) => {
      if (!c3.value(_, x3)) {
        const Z = x3 ? l.value(_) + 1 : l.value(_) - 1;
        E3(Z, _);
      }
    }, H3 = (_, x3 = false, Z) => {
      x3 || n("reset-flow"), Z !== void 0 ? b3.value[_] = Z : b3.value[_] = !b3.value[_], b3.value || n("overlay-closed");
    };
    return (_, x3) => (openBlock(), createBlock(Hn, {
      "multi-calendars": unref(k3).count,
      stretch: ""
    }, {
      default: withCtx(({ instance: Z }) => [
        createVNode(Rt, {
          items: unref(t3)(Z),
          "arrow-navigation": _.arrowNavigation,
          "is-last": _.autoApply && !_.keepActionRow,
          "esc-close": _.escClose,
          height: _.modeHeight,
          onSelected: (le) => unref(T3)(le, Z),
          onHoverValue: (le) => unref(p)(le, Z),
          "use-relative": "",
          type: "month"
        }, {
          header: withCtx(() => {
            var le, v, D3;
            return [
              createBaseVNode("div", dl, [
                unref(G3)(unref(k3), Z) ? (openBlock(), createBlock(At, {
                  key: 0,
                  ref: "mpPrevIconRef",
                  "aria-label": (le = unref(h5)) == null ? void 0 : le.prevYear,
                  disabled: unref(c3)(Z, false),
                  onActivate: (C) => O3(Z, false)
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
                  "aria-label": (v = unref(h5)) == null ? void 0 : v.openYearsOverlay,
                  tabindex: "0",
                  onClick: () => H3(Z, false),
                  onKeydown: withKeys(() => H3(Z, false), ["enter"])
                }, [
                  _.$slots.year ? renderSlot(_.$slots, "year", {
                    key: 0,
                    year: unref(l)(Z)
                  }) : createCommentVNode("", true),
                  _.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(unref(l)(Z)), 1)
                  ], 64))
                ], 40, cl),
                unref(Q3)(unref(k3), Z) ? (openBlock(), createBlock(At, {
                  key: 1,
                  ref: "mpNextIconRef",
                  "aria-label": (D3 = unref(h5)) == null ? void 0 : D3.nextYear,
                  disabled: unref(c3)(Z, false),
                  onActivate: (C) => O3(Z, true)
                }, {
                  default: withCtx(() => [
                    _.$slots["arrow-right"] ? renderSlot(_.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
                    _.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Rn), { key: 1 }))
                  ]),
                  _: 2
                }, 1032, ["aria-label", "disabled", "onActivate"])) : createCommentVNode("", true),
                createVNode(Transition, {
                  name: unref(q3)(b3.value[Z]),
                  css: unref(z3)
                }, {
                  default: withCtx(() => [
                    b3.value[Z] ? (openBlock(), createBlock(Rt, {
                      key: 0,
                      items: unref(o)(Z),
                      "text-input": _.textInput,
                      "esc-close": _.escClose,
                      onToggle: (C) => H3(Z),
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
var vl = (e3, n) => {
  const { modelValue: a3 } = Zt(e3, n), t3 = ref(null), o = (p) => Array.isArray(a3.value) ? a3.value.some((T3) => getYear(T3) === p) : a3.value ? getYear(a3.value) === p : false, l = (p) => e3.range && Array.isArray(a3.value) ? Vn(a3.value, t3.value, k3(p)) : false, c3 = computed(() => bt(Fn(e3.yearRange, e3.reverseYears), (p) => {
    const T3 = o(p.value), E3 = Ct(p.value, kt(e3.minDate), kt(e3.maxDate)), q3 = l(p.value);
    return { active: T3, disabled: E3, isBetween: q3 };
  })), k3 = (p) => setYear(ze(/* @__PURE__ */ new Date()), p);
  return {
    groupedYears: c3,
    setHoverValue: (p) => {
      t3.value = setYear(ze(/* @__PURE__ */ new Date()), p);
    },
    selectYear: (p) => {
      if (e3.multiDates)
        return Ln(k3(p), a3, e3.multiDatesLimit), n("auto-apply", true);
      if (e3.range) {
        const T3 = Ca(a3, k3(p), n);
        return Un(T3, n, e3.autoApply, e3.modelAuto);
      }
      a3.value = k3(p), n("auto-apply");
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
  setup(e3, { emit: n }) {
    const a3 = e3, { groupedYears: t3, selectYear: o, setHoverValue: l } = vl(a3, n);
    return (c3, k3) => (openBlock(), createBlock(Rt, {
      items: unref(t3),
      "is-last": c3.autoApply && !c3.keepActionRow,
      height: c3.modeHeight,
      type: "year",
      "use-relative": "",
      onSelected: unref(o),
      onHoverValue: unref(l)
    }, createSlots({ _: 2 }, [
      c3.$slots["year-overlay-value"] ? {
        name: "item",
        fn: withCtx(({ item: h5 }) => [
          renderSlot(c3.$slots, "year-overlay-value", {
            text: h5.text,
            value: h5.value
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
  setup(e3, { expose: n, emit: a3 }) {
    const t3 = e3, { setTimePickerElements: o, setTimePickerBackRef: l } = rt(), { defaultedAriaLabels: c3, defaultedTransitions: k3, defaultedFilters: h5 } = Ce(t3), { transitionName: M3, showTransition: p } = Yt(k3), T3 = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), E3 = ref("AM"), q3 = ref(null), z3 = ref([]);
    onMounted(() => {
      a3("mounted");
    });
    const Q3 = (r) => set(/* @__PURE__ */ new Date(), {
      hours: r.hours,
      minutes: r.minutes,
      seconds: t3.enableSeconds ? r.seconds : 0,
      milliseconds: 0
    }), G3 = computed(() => (r) => D3(r, t3[r])), b3 = computed(() => ({ hours: t3.hours, minutes: t3.minutes, seconds: t3.seconds })), A = computed(() => (r) => !j(+t3[r] + +t3[`${r}Increment`], r)), O3 = computed(() => (r) => !j(+t3[r] - +t3[`${r}Increment`], r)), H3 = (r, U) => add(set(S3(), r), U), _ = (r, U) => sub(set(S3(), r), U), x3 = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !t3.timePickerInline,
        dp__time_col_reg_block: !t3.enableSeconds && t3.is24 && !t3.timePickerInline,
        dp__time_col_reg_inline: !t3.enableSeconds && t3.is24 && t3.timePickerInline,
        dp__time_col_reg_with_button: !t3.enableSeconds && !t3.is24,
        dp__time_col_sec: t3.enableSeconds && t3.is24,
        dp__time_col_sec_with_button: t3.enableSeconds && !t3.is24
      })
    ), Z = computed(() => {
      const r = [{ type: "hours" }, { type: "", separator: true }, { type: "minutes" }];
      return t3.enableSeconds ? r.concat([{ type: "", separator: true }, { type: "seconds" }]) : r;
    }), le = computed(() => Z.value.filter((r) => !r.separator)), v = computed(() => (r) => {
      if (r === "hours") {
        const U = u3(+t3.hours);
        return { text: U < 10 ? `0${U}` : `${U}`, value: U };
      }
      return { text: t3[r] < 10 ? `0${t3[r]}` : `${t3[r]}`, value: t3[r] };
    }), D3 = (r, U) => {
      var g;
      if (!t3.disabledTimesConfig)
        return false;
      const R3 = t3.disabledTimesConfig(t3.order, r === "hours" ? U : void 0);
      return R3[r] ? !!((g = R3[r]) != null && g.includes(U)) : true;
    }, C = (r) => {
      const U = t3.is24 ? 24 : 12, R3 = r === "hours" ? U : 60, g = +t3[`${r}GridIncrement`], V = r === "hours" && !t3.is24 ? g : 0, re = [];
      for (let K3 = V; K3 < R3; K3 += g)
        re.push({ value: K3, text: K3 < 10 ? `0${K3}` : `${K3}` });
      return r === "hours" && !t3.is24 && re.push({ value: 0, text: "12" }), bt(re, (K3) => ({ active: false, disabled: h5.value.times[r].includes(K3.value) || !j(K3.value, r) || D3(r, K3.value) }));
    }, j = (r, U) => {
      const R3 = t3.minTime ? Q3(cn(t3.minTime)) : null, g = t3.maxTime ? Q3(cn(t3.maxTime)) : null, V = Q3(cn(b3.value, U, r));
      return R3 && g ? (isBefore(V, g) || isEqual(V, g)) && (isAfter(V, R3) || isEqual(V, R3)) : R3 ? isAfter(V, R3) || isEqual(V, R3) : g ? isBefore(V, g) || isEqual(V, g) : true;
    }, f = (r) => t3[`no${r[0].toUpperCase() + r.slice(1)}Overlay`], F = (r) => {
      f(r) || (T3[r] = !T3[r], T3[r] || a3("overlay-closed"));
    }, d3 = (r) => r === "hours" ? getHours : r === "minutes" ? getMinutes : getSeconds, w3 = (r, U = true) => {
      const R3 = U ? H3 : _, g = U ? +t3[`${r}Increment`] : -+t3[`${r}Increment`];
      j(+t3[r] + g, r) && a3(
        `update:${r}`,
        d3(r)(R3({ [r]: +t3[r] }, { [r]: +t3[`${r}Increment`] }))
      );
    }, u3 = (r) => t3.is24 ? r : (r >= 12 ? E3.value = "PM" : E3.value = "AM", Mr(r)), y3 = () => {
      E3.value === "PM" ? (E3.value = "AM", a3("update:hours", t3.hours - 12)) : (E3.value = "PM", a3("update:hours", t3.hours + 12)), a3("am-pm-change", E3.value);
    }, s3 = (r) => {
      T3[r] = true;
    }, P = (r, U, R3) => {
      if (r && t3.arrowNavigation) {
        Array.isArray(z3.value[U]) ? z3.value[U][R3] = r : z3.value[U] = [r];
        const g = z3.value.reduce(
          (V, re) => re.map((K3, we2) => [...V[we2] || [], re[we2]]),
          []
        );
        l(t3.closeTimePickerBtn), q3.value && (g[1] = g[1].concat(q3.value)), o(g, t3.order);
      }
    }, te = (r, U) => (F(r), r === "hours" && !t3.is24 ? a3(`update:${r}`, E3.value === "PM" ? U + 12 : U) : a3(`update:${r}`, U));
    return n({ openChildCmp: s3 }), (r, U) => {
      var R3;
      return r.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", gl, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(Z.value, (g, V) => {
          var re, K3, we2;
          return openBlock(), createElementBlock("div", {
            key: V,
            class: normalizeClass(x3.value)
          }, [
            g.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(" : ")
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !t3.timePickerInline,
                  dp__inc_dec_button_inline: t3.timePickerInline,
                  dp__tp_inline_btn_top: t3.timePickerInline,
                  dp__inc_dec_button_disabled: A.value(g.type)
                }),
                "aria-label": (re = unref(c3)) == null ? void 0 : re.incrementValue(g.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((se) => w3(g.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((se) => w3(g.type), ["prevent"]), ["space"])
                ],
                onClick: (se) => w3(g.type),
                ref_for: true,
                ref: (se) => P(se, V, 0)
              }, [
                t3.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  hl,
                  pl
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  r.$slots["arrow-up"] ? renderSlot(r.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  r.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(On), { key: 1 }))
                ], 64))
              ], 42, yl),
              createBaseVNode("button", {
                type: "button",
                "aria-label": (K3 = unref(c3)) == null ? void 0 : K3.openTpOverlay(g.type),
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !t3.timePickerInline,
                  dp__time_display_inline: t3.timePickerInline,
                  "dp--time-invalid": G3.value(g.type),
                  "dp--time-overlay-btn": !G3.value(g.type)
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
                  dp__inc_dec_button: !t3.timePickerInline,
                  dp__inc_dec_button_inline: t3.timePickerInline,
                  dp__tp_inline_btn_bottom: t3.timePickerInline,
                  dp__inc_dec_button_disabled: O3.value(g.type)
                }),
                "aria-label": (we2 = unref(c3)) == null ? void 0 : we2.decrementValue(g.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((se) => w3(g.type, false), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((se) => w3(g.type, false), ["prevent"]), ["space"])
                ],
                onClick: (se) => w3(g.type, false),
                ref_for: true,
                ref: (se) => P(se, V, 2)
              }, [
                t3.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
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
            toggle: y3,
            value: E3.value
          }) : createCommentVNode("", true),
          r.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: q3,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (R3 = unref(c3)) == null ? void 0 : R3.amPmButton,
            tabindex: "0",
            onClick: y3,
            onKeydown: [
              withKeys(withModifiers(y3, ["prevent"]), ["enter"]),
              withKeys(withModifiers(y3, ["prevent"]), ["space"])
            ]
          }, toDisplayString(E3.value), 41, $l))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(le.value, (g, V) => (openBlock(), createBlock(Transition, {
          key: V,
          name: unref(M3)(T3[g.type]),
          css: unref(p)
        }, {
          default: withCtx(() => [
            T3[g.type] ? (openBlock(), createBlock(Rt, {
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
  setup(e3, { expose: n, emit: a3 }) {
    const t3 = e3, { buildMatrix: o, setTimePicker: l } = rt(), c3 = useSlots(), { defaultedTransitions: k3, defaultedAriaLabels: h5, defaultedTextInput: M3 } = Ce(t3), { transitionName: p, showTransition: T3 } = Yt(k3), { hideNavigationButtons: E3 } = qt(), q3 = ref(null), z3 = ref(null), Q3 = ref([]), G3 = ref(null);
    onMounted(() => {
      a3("mount"), !t3.timePicker && t3.arrowNavigation ? o([Ae(q3.value)], "time") : l(true, t3.timePicker);
    });
    const b3 = computed(() => t3.range && t3.modelAuto ? Da(t3.internalModelValue) : true), A = ref(false), O3 = (f) => ({
      hours: Array.isArray(t3.hours) ? t3.hours[f] : t3.hours,
      minutes: Array.isArray(t3.minutes) ? t3.minutes[f] : t3.minutes,
      seconds: Array.isArray(t3.seconds) ? t3.seconds[f] : t3.seconds
    }), H3 = computed(() => {
      const f = [];
      if (t3.range)
        for (let F = 0; F < 2; F++)
          f.push(O3(F));
      else
        f.push(O3(0));
      return f;
    }), _ = (f, F = false, d3 = "") => {
      F || a3("reset-flow"), A.value = f, a3(f ? "overlay-opened" : "overlay-closed"), t3.arrowNavigation && l(f), nextTick(() => {
        d3 !== "" && Q3.value[0] && Q3.value[0].openChildCmp(d3);
      });
    }, x3 = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: t3.autoApply && !t3.keepActionRow
    })), Z = je(c3, "timePicker"), le = (f, F, d3) => t3.range ? F === 0 ? [f, H3.value[1][d3]] : [H3.value[0][d3], f] : f, v = (f) => {
      a3("update:hours", f);
    }, D3 = (f) => {
      a3("update:minutes", f);
    }, C = (f) => {
      a3("update:seconds", f);
    }, j = () => {
      if (G3.value && !M3.value.enabled) {
        const f = Tr(G3.value);
        f && f.focus({ preventScroll: true });
      }
    };
    return n({ toggleTimePicker: _ }), (f, F) => {
      var d3;
      return openBlock(), createElementBlock("div", null, [
        !f.timePicker && !f.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          class: normalizeClass(x3.value),
          "aria-label": (d3 = unref(h5)) == null ? void 0 : d3.openTimePicker,
          tabindex: "0",
          ref_key: "openTimePickerBtn",
          ref: q3,
          onKeydown: [
            F[0] || (F[0] = withKeys((w3) => _(true), ["enter"])),
            F[1] || (F[1] = withKeys((w3) => _(true), ["space"]))
          ],
          onClick: F[2] || (F[2] = (w3) => _(true))
        }, [
          f.$slots["clock-icon"] ? renderSlot(f.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          f.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Nn), { key: 1 }))
        ], 42, Al)), [
          [vShow, !unref(E3)(f.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(p)(A.value),
          css: unref(T3) && !f.timePickerInline
        }, {
          default: withCtx(() => {
            var w3;
            return [
              A.value || f.timePicker || f.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass({
                  dp__overlay: !f.timePickerInline,
                  "dp--overlay-absolute": !t3.timePicker && !f.timePickerInline,
                  "dp--overlay-relative": t3.timePicker
                }),
                style: normalizeStyle(f.timePicker ? { height: `${f.modeHeight}px` } : void 0),
                ref_key: "overlayRef",
                ref: G3,
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
                    hours: e3.hours,
                    minutes: e3.minutes,
                    seconds: e3.seconds,
                    setHours: v,
                    setMinutes: D3,
                    setSeconds: C
                  }) : createCommentVNode("", true),
                  f.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(f.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(H3.value, (u3, y3) => withDirectives((openBlock(), createBlock(Tl, mergeProps({ key: y3 }, {
                      ...f.$props,
                      order: y3,
                      hours: u3.hours,
                      minutes: u3.minutes,
                      seconds: u3.seconds,
                      closeTimePickerBtn: z3.value,
                      disabledTimesConfig: e3.disabledTimesConfig,
                      disabled: y3 === 0 ? f.fixedStart : f.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: Q3,
                      "onUpdate:hours": (s3) => v(le(s3, y3, "hours")),
                      "onUpdate:minutes": (s3) => D3(le(s3, y3, "minutes")),
                      "onUpdate:seconds": (s3) => C(le(s3, y3, "seconds")),
                      onMounted: j,
                      onOverlayClosed: j,
                      onAmPmChange: F[3] || (F[3] = (s3) => f.$emit("am-pm-change", s3))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(Z), (s3, P) => ({
                        name: s3,
                        fn: withCtx((te) => [
                          renderSlot(f.$slots, s3, normalizeProps(guardReactiveProps(te)))
                        ])
                      }))
                    ]), 1040, ["onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, y3 === 0 ? true : b3.value]
                    ])), 128))
                  ], 2)),
                  !f.timePicker && !f.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    type: "button",
                    ref_key: "closeTimePickerBtn",
                    ref: z3,
                    class: normalizeClass(x3.value),
                    "aria-label": (w3 = unref(h5)) == null ? void 0 : w3.closeTimePicker,
                    tabindex: "0",
                    onKeydown: [
                      F[4] || (F[4] = withKeys((u3) => _(false), ["enter"])),
                      F[5] || (F[5] = withKeys((u3) => _(false), ["space"]))
                    ],
                    onClick: F[6] || (F[6] = (u3) => _(false))
                  }, [
                    f.$slots["calendar-icon"] ? renderSlot(f.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    f.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(It), { key: 1 }))
                  ], 42, Sl)), [
                    [vShow, !unref(E3)(f.hideNavigation, "time")]
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
var Na = (e3, n, a3, t3) => {
  const o = (b3, A) => Array.isArray(n[b3]) ? n[b3][A] : n[b3], l = (b3) => e3.enableSeconds ? Array.isArray(n.seconds) ? n.seconds[b3] : n.seconds : 0, c3 = (b3, A) => b3 ? A !== void 0 ? tt(b3, o("hours", A), o("minutes", A), l(A)) : tt(b3, n.hours, n.minutes, l()) : S3(), k3 = (b3, A) => {
    n[b3] = A;
  }, h5 = (b3, A) => {
    const O3 = Object.fromEntries(
      Object.keys(n).map((H3) => H3 === b3 ? [H3, A] : [H3, n[H3]].slice())
    );
    if (e3.range && !e3.disableTimeRangeValidation) {
      const H3 = (x3) => a3.value ? tt(
        a3.value[x3],
        O3.hours[x3],
        O3.minutes[x3],
        O3.seconds[x3]
      ) : null, _ = (x3) => setMilliseconds(a3.value[x3], 0);
      return !(ye(H3(0), H3(1)) && (isAfter(H3(0), _(1)) || isBefore(H3(1), _(0))));
    }
    return true;
  }, M3 = (b3, A) => {
    h5(b3, A) && (k3(b3, A), t3 && t3());
  }, p = (b3) => {
    M3("hours", b3);
  }, T3 = (b3) => {
    M3("minutes", b3);
  }, E3 = (b3) => {
    M3("seconds", b3);
  }, q3 = (b3, A, O3, H3) => {
    A && p(b3), !A && !O3 && T3(b3), O3 && E3(b3), a3.value && H3(a3.value);
  }, z3 = (b3) => {
    if (b3) {
      const A = Array.isArray(b3), O3 = A ? [+b3[0].hours, +b3[1].hours] : +b3.hours, H3 = A ? [+b3[0].minutes, +b3[1].minutes] : +b3.minutes, _ = A ? [+b3[0].seconds, +b3[1].seconds] : +b3.seconds;
      k3("hours", O3), k3("minutes", H3), e3.enableSeconds && k3("seconds", _);
    }
  }, Q3 = (b3, A) => {
    const O3 = {
      hours: Array.isArray(n.hours) ? n.hours[b3] : n.hours,
      disabledArr: []
    };
    return (A || A === 0) && (O3.hours = A), Array.isArray(e3.disabledTimes) && (O3.disabledArr = e3.range && Array.isArray(e3.disabledTimes[b3]) ? e3.disabledTimes[b3] : e3.disabledTimes), O3;
  }, G3 = computed(() => (b3, A) => {
    var O3;
    if (Array.isArray(e3.disabledTimes)) {
      const { disabledArr: H3, hours: _ } = Q3(b3, A), x3 = H3.filter((Z) => +Z.hours === _);
      return ((O3 = x3[0]) == null ? void 0 : O3.minutes) === "*" ? { hours: [_], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (x3 == null ? void 0 : x3.map((Z) => +Z.minutes)) ?? [],
        seconds: (x3 == null ? void 0 : x3.map((Z) => Z.seconds ? +Z.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: k3,
    updateHours: p,
    updateMinutes: T3,
    updateSeconds: E3,
    getSetDateTime: c3,
    updateTimeValues: q3,
    getSecondsValue: l,
    assignStartTime: z3,
    disabledTimesConfig: G3
  };
};
var Pl = (e3, n) => {
  const { modelValue: a3, time: t3 } = Zt(e3, n), { defaultedStartTime: o } = Ce(e3), { updateTimeValues: l, getSetDateTime: c3, setTime: k3, assignStartTime: h5, disabledTimesConfig: M3 } = Na(
    e3,
    t3,
    a3
  ), p = (A) => {
    const { hours: O3, minutes: H3, seconds: _ } = A;
    return { hours: +O3, minutes: +H3, seconds: _ ? +_ : 0 };
  }, T3 = () => {
    if (e3.startTime) {
      if (Array.isArray(e3.startTime)) {
        const O3 = p(e3.startTime[0]), H3 = p(e3.startTime[1]);
        return [set(S3(), O3), set(S3(), H3)];
      }
      const A = p(e3.startTime);
      return set(S3(), A);
    }
    return e3.range ? [null, null] : null;
  }, E3 = () => {
    if (e3.range) {
      const [A, O3] = T3();
      a3.value = [c3(A, 0), c3(O3, 1)];
    } else
      a3.value = c3(T3());
  }, q3 = (A) => Array.isArray(A) ? [ft(S3(A[0])), ft(S3(A[1]))] : [ft(A ?? S3())], z3 = (A, O3, H3) => {
    k3("hours", A), k3("minutes", O3), e3.enableSeconds && k3("seconds", H3);
  }, Q3 = () => {
    const [A, O3] = q3(a3.value);
    return e3.range ? z3(
      [A.hours, O3.hours],
      [A.minutes, O3.minutes],
      [A.seconds, O3.minutes]
    ) : z3(A.hours, A.minutes, A.seconds);
  };
  onMounted(() => {
    if (!e3.shadow)
      return h5(o.value), a3.value ? Q3() : E3();
  });
  const G3 = () => {
    Array.isArray(a3.value) ? a3.value = a3.value.map((A, O3) => A && c3(A, O3)) : a3.value = c3(a3.value), n("time-update");
  };
  return {
    time: t3,
    disabledTimesConfig: M3,
    updateTime: (A, O3 = true, H3 = false) => {
      l(A, O3, H3, G3);
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
  setup(e3, { emit: n }) {
    const a3 = e3, t3 = useSlots(), o = je(t3, "timePicker"), { time: l, disabledTimesConfig: c3, updateTime: k3 } = Pl(a3, n);
    return (h5, M3) => (openBlock(), createBlock(Hn, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(() => [
        createVNode(Ra, mergeProps(h5.$props, {
          hours: unref(l).hours,
          minutes: unref(l).minutes,
          seconds: unref(l).seconds,
          "internal-model-value": h5.internalModelValue,
          "disabled-times-config": unref(c3),
          "onUpdate:hours": M3[0] || (M3[0] = (p) => unref(k3)(p)),
          "onUpdate:minutes": M3[1] || (M3[1] = (p) => unref(k3)(p, false)),
          "onUpdate:seconds": M3[2] || (M3[2] = (p) => unref(k3)(p, false, true)),
          onAmPmChange: M3[3] || (M3[3] = (p) => h5.$emit("am-pm-change", p))
        }), createSlots({ _: 2 }, [
          renderList(unref(o), (p, T3) => ({
            name: p,
            fn: withCtx((E3) => [
              renderSlot(h5.$slots, p, normalizeProps(guardReactiveProps(E3)))
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
  setup(e3, { expose: n, emit: a3 }) {
    const t3 = e3, { defaultedTransitions: o, defaultedAriaLabels: l, defaultedMultiCalendars: c3, defaultedFilters: k3 } = Ce(t3), { transitionName: h5, showTransition: M3 } = Yt(o), { buildMatrix: p } = rt(), { handleMonthYearChange: T3, isDisabled: E3, updateMonthYear: q3 } = zr(t3, a3), { showLeftIcon: z3, showRightIcon: Q3 } = qt(), G3 = ref(false), b3 = ref(false), A = ref([null, null, null, null]);
    onMounted(() => {
      a3("mount");
    });
    const O3 = (u3) => ({
      get: () => t3[u3],
      set: (y3) => {
        const s3 = u3 === We.month ? We.year : We.month;
        a3("update-month-year", { [u3]: y3, [s3]: t3[s3] }), u3 === We.month ? C(true) : j(true);
      }
    }), H3 = computed(O3(We.month)), _ = computed(O3(We.year)), x3 = computed(() => (u3) => ({
      month: t3.month,
      year: t3.year,
      items: u3 === We.month ? t3.months : t3.years,
      instance: t3.instance,
      updateMonthYear: q3,
      toggle: u3 === We.month ? C : j
    })), Z = computed(() => {
      const u3 = t3.months.find((y3) => y3.value === t3.month);
      return u3 || { text: "", value: 0 };
    }), le = computed(() => bt(t3.months, (u3) => {
      const y3 = t3.month === u3.value, s3 = Ct(
        u3.value,
        Ma(t3.year, t3.minDate),
        $a(t3.year, t3.maxDate)
      ) || k3.value.months.includes(u3.value);
      return { active: y3, disabled: s3 };
    })), v = computed(() => bt(t3.years, (u3) => {
      const y3 = t3.year === u3.value, s3 = Ct(u3.value, kt(t3.minDate), kt(t3.maxDate)) || k3.value.years.includes(u3.value);
      return { active: y3, disabled: s3 };
    })), D3 = (u3, y3) => {
      y3 !== void 0 ? u3.value = y3 : u3.value = !u3.value, u3.value || a3("overlay-closed");
    }, C = (u3 = false, y3) => {
      f(u3), D3(G3, y3);
    }, j = (u3 = false, y3) => {
      f(u3), D3(b3, y3);
    }, f = (u3) => {
      u3 || a3("reset-flow");
    }, F = (u3, y3) => {
      t3.arrowNavigation && (A.value[y3] = Ae(u3), p(A.value, "monthYear"));
    }, d3 = computed(() => {
      var u3, y3;
      return [
        {
          type: We.month,
          index: 1,
          toggle: C,
          modelValue: H3.value,
          updateModelValue: (s3) => H3.value = s3,
          text: Z.value.text,
          showSelectionGrid: G3.value,
          items: le.value,
          ariaLabel: (u3 = l.value) == null ? void 0 : u3.openMonthsOverlay
        },
        {
          type: We.year,
          index: 2,
          toggle: j,
          modelValue: _.value,
          updateModelValue: (s3) => _.value = s3,
          text: t3.year,
          showSelectionGrid: b3.value,
          items: v.value,
          ariaLabel: (y3 = l.value) == null ? void 0 : y3.openYearsOverlay
        }
      ];
    }), w3 = computed(
      () => t3.disableYearSelect ? [d3.value[0]] : d3.value
    );
    return n({
      toggleMonthPicker: C,
      toggleYearPicker: j,
      handleMonthYearChange: T3
    }), (u3, y3) => {
      var s3, P, te;
      return openBlock(), createElementBlock("div", Rl, [
        u3.$slots["month-year"] ? renderSlot(u3.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, { month: e3.month, year: e3.year, months: e3.months, years: e3.years, updateMonthYear: unref(q3), handleMonthYearChange: unref(T3), instance: e3.instance }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          unref(z3)(unref(c3), e3.instance) && !u3.vertical ? (openBlock(), createBlock(At, {
            key: 0,
            "aria-label": (s3 = unref(l)) == null ? void 0 : s3.prevMonth,
            disabled: unref(E3)(false),
            onActivate: y3[0] || (y3[0] = (r) => unref(T3)(false)),
            onSetRef: y3[1] || (y3[1] = (r) => F(r, 0))
          }, {
            default: withCtx(() => [
              u3.$slots["arrow-left"] ? renderSlot(u3.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
              u3.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Cn), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: normalizeClass(["dp__month_year_wrap", {
              dp__year_disable_select: u3.disableYearSelect
            }])
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(w3.value, (r, U) => (openBlock(), createElementBlock(Fragment, {
              key: r.type
            }, [
              createBaseVNode("button", {
                type: "button",
                class: "dp__btn dp__month_year_select",
                tabindex: "0",
                "aria-label": r.ariaLabel,
                ref_for: true,
                ref: (R3) => F(R3, U + 1),
                onClick: r.toggle,
                onKeydown: [
                  withKeys(withModifiers(r.toggle, ["prevent"]), ["enter"]),
                  withKeys(withModifiers(r.toggle, ["prevent"]), ["space"])
                ]
              }, [
                u3.$slots[r.type] ? renderSlot(u3.$slots, r.type, {
                  key: 0,
                  text: r.text,
                  value: t3[r.type]
                }) : createCommentVNode("", true),
                u3.$slots[r.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(r.text), 1)
                ], 64))
              ], 40, Nl),
              createVNode(Transition, {
                name: unref(h5)(r.showSelectionGrid),
                css: unref(M3)
              }, {
                default: withCtx(() => [
                  r.showSelectionGrid ? (openBlock(), createBlock(Rt, {
                    key: 0,
                    items: r.items,
                    "arrow-navigation": u3.arrowNavigation,
                    "hide-navigation": u3.hideNavigation,
                    "is-last": u3.autoApply && !u3.keepActionRow,
                    "skip-button-ref": false,
                    type: r.type,
                    "header-refs": [],
                    "esc-close": u3.escClose,
                    "text-input": u3.textInput,
                    onSelected: r.updateModelValue,
                    onToggle: r.toggle
                  }, createSlots({
                    "button-icon": withCtx(() => [
                      u3.$slots["calendar-icon"] ? renderSlot(u3.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                      u3.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(It), { key: 1 }))
                    ]),
                    _: 2
                  }, [
                    u3.$slots[`${r.type}-overlay-val`] ? {
                      name: "item",
                      fn: withCtx(({ item: R3 }) => [
                        renderSlot(u3.$slots, `${r.type}-overlay-val`, {
                          text: R3.text,
                          value: R3.value
                        })
                      ]),
                      key: "0"
                    } : void 0,
                    u3.$slots[`${r.type}-overlay`] ? {
                      name: "overlay",
                      fn: withCtx(() => [
                        renderSlot(u3.$slots, `${r.type}-overlay`, normalizeProps(guardReactiveProps(x3.value(r.type))))
                      ]),
                      key: "1"
                    } : void 0,
                    u3.$slots[`${r.type}-overlay-header`] ? {
                      name: "header",
                      fn: withCtx(() => [
                        renderSlot(u3.$slots, `${r.type}-overlay-header`, {
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
          unref(z3)(unref(c3), e3.instance) && u3.vertical ? (openBlock(), createBlock(At, {
            key: 1,
            "aria-label": (P = unref(l)) == null ? void 0 : P.prevMonth,
            disabled: unref(E3)(false),
            onActivate: y3[2] || (y3[2] = (r) => unref(T3)(false))
          }, {
            default: withCtx(() => [
              u3.$slots["arrow-up"] ? renderSlot(u3.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
              u3.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(On), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
          unref(Q3)(unref(c3), e3.instance) ? (openBlock(), createBlock(At, {
            key: 2,
            ref: "rightIcon",
            disabled: unref(E3)(true),
            "aria-label": (te = unref(l)) == null ? void 0 : te.nextMonth,
            onActivate: y3[3] || (y3[3] = (r) => unref(T3)(true)),
            onSetRef: y3[4] || (y3[4] = (r) => F(r, u3.disableYearSelect ? 2 : 3))
          }, {
            default: withCtx(() => [
              u3.$slots[u3.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(u3.$slots, u3.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
              u3.$slots[u3.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(u3.vertical ? unref(In) : unref(Rn)), { key: 1 }))
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
  setup(e3, { expose: n, emit: a3 }) {
    const t3 = e3, { buildMultiLevelMatrix: o } = rt(), { defaultedTransitions: l, defaultedAriaLabels: c3, defaultedMultiCalendars: k3 } = Ce(t3), h5 = ref(null), M3 = ref({
      bottom: "",
      left: "",
      transform: ""
    }), p = ref([]), T3 = ref(null), E3 = ref(true), q3 = ref(""), z3 = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), Q3 = ref([]), G3 = ref({ left: "50%" }), b3 = computed(() => t3.calendar ? t3.calendar(t3.mappedDates) : t3.mappedDates), A = computed(() => t3.dayNames ? Array.isArray(t3.dayNames) ? t3.dayNames : t3.dayNames(t3.locale, +t3.weekStart) : Dr(t3.formatLocale, t3.locale, +t3.weekStart));
    onMounted(() => {
      a3("mount", { cmp: "calendar", refs: p }), t3.noSwipe || T3.value && (T3.value.addEventListener("touchstart", j, { passive: false }), T3.value.addEventListener("touchend", f, { passive: false }), T3.value.addEventListener("touchmove", F, { passive: false })), t3.monthChangeOnScroll && T3.value && T3.value.addEventListener("wheel", u3, { passive: false });
    });
    const O3 = (s3) => s3 ? t3.vertical ? "vNext" : "next" : t3.vertical ? "vPrevious" : "previous", H3 = (s3, P) => {
      if (t3.transitions) {
        const te = Le(Je(S3(), t3.month, t3.year));
        q3.value = Re(Le(Je(S3(), s3, P)), te) ? l.value[O3(true)] : l.value[O3(false)], E3.value = false, nextTick(() => {
          E3.value = true;
        });
      }
    }, _ = computed(
      () => ({
        [t3.calendarClassName]: !!t3.calendarClassName
      })
    ), x3 = computed(() => (s3) => {
      const P = $r(s3);
      return {
        dp__marker_dot: P.type === "dot",
        dp__marker_line: P.type === "line"
      };
    }), Z = computed(() => (s3) => ye(s3, h5.value)), le = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: k3.value.count > 0 && t3.instance !== 0
    })), v = computed(() => (s3) => t3.hideOffsetDates ? s3.current : true), D3 = async (s3, P, te) => {
      var r, U;
      if (a3("set-hover-date", s3), (U = (r = s3.marker) == null ? void 0 : r.tooltip) != null && U.length) {
        const R3 = Ae(p.value[P][te]);
        if (R3) {
          const { width: g, height: V } = R3.getBoundingClientRect();
          h5.value = s3.value;
          let re = { left: `${g / 2}px` }, K3 = -50;
          if (await nextTick(), Q3.value[0]) {
            const { left: we2, width: se } = Q3.value[0].getBoundingClientRect();
            we2 < 0 && (re = { left: "0" }, K3 = 0, G3.value.left = `${g / 2}px`), window.innerWidth < we2 + se && (re = { right: "0" }, K3 = 0, G3.value.left = `${se - g / 2}px`);
          }
          M3.value = {
            bottom: `${V}px`,
            ...re,
            transform: `translateX(${K3}%)`
          }, a3("tooltip-open", s3.marker);
        }
      }
    }, C = (s3) => {
      h5.value && (h5.value = null, M3.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a3("tooltip-close", s3.marker));
    }, j = (s3) => {
      z3.value.startX = s3.changedTouches[0].screenX, z3.value.startY = s3.changedTouches[0].screenY;
    }, f = (s3) => {
      z3.value.endX = s3.changedTouches[0].screenX, z3.value.endY = s3.changedTouches[0].screenY, d3();
    }, F = (s3) => {
      t3.vertical && !t3.inline && s3.preventDefault();
    }, d3 = () => {
      const s3 = t3.vertical ? "Y" : "X";
      Math.abs(z3.value[`start${s3}`] - z3.value[`end${s3}`]) > 10 && a3("handle-swipe", z3.value[`start${s3}`] > z3.value[`end${s3}`] ? "right" : "left");
    }, w3 = (s3, P, te) => {
      s3 && (Array.isArray(p.value[P]) ? p.value[P][te] = s3 : p.value[P] = [s3]), t3.arrowNavigation && o(p.value, "calendar");
    }, u3 = (s3) => {
      t3.monthChangeOnScroll && (s3.preventDefault(), a3("handle-scroll", s3));
    }, y3 = (s3) => {
      const P = s3[0];
      return t3.weekNumbers === "local" ? getWeek(P.value, { weekStartsOn: +t3.weekStart }) : t3.weekNumbers === "iso" ? getISOWeek(P.value) : typeof t3.weekNumbers == "function" ? t3.weekNumbers(P.value) : "";
    };
    return n({ triggerTransition: H3 }), (s3, P) => {
      var te;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(le.value)
      }, [
        createBaseVNode("div", {
          ref_key: "calendarWrapRef",
          ref: T3,
          role: "grid",
          class: normalizeClass(_.value),
          "aria-label": (te = unref(c3)) == null ? void 0 : te.calendarWrap
        }, [
          (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createBaseVNode("div", Yl, [
              s3.weekNumbers ? (openBlock(), createElementBlock("div", Bl, toDisplayString(s3.weekNumName), 1)) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(A.value, (r, U) => (openBlock(), createElementBlock("div", {
                class: "dp__calendar_header_item",
                role: "gridcell",
                key: U
              }, [
                s3.$slots["calendar-header"] ? renderSlot(s3.$slots, "calendar-header", {
                  key: 0,
                  day: r,
                  index: U
                }) : createCommentVNode("", true),
                s3.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(r), 1)
                ], 64))
              ]))), 128))
            ]),
            El,
            createVNode(Transition, {
              name: q3.value,
              css: !!s3.transitions
            }, {
              default: withCtx(() => {
                var r;
                return [
                  E3.value ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "dp__calendar",
                    role: "grid",
                    "aria-label": ((r = unref(c3)) == null ? void 0 : r.calendarDays) || void 0
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(b3.value, (U, R3) => (openBlock(), createElementBlock("div", {
                      class: "dp__calendar_row",
                      role: "row",
                      key: R3
                    }, [
                      s3.weekNumbers ? (openBlock(), createElementBlock("div", Vl, [
                        createBaseVNode("div", Hl, toDisplayString(y3(U.days)), 1)
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(U.days, (g, V) => {
                        var re, K3, we2;
                        return openBlock(), createElementBlock("div", {
                          role: "gridcell",
                          class: "dp__calendar_item",
                          ref_for: true,
                          ref: (se) => w3(se, R3, V),
                          key: V + R3,
                          "aria-selected": g.classData.dp__active_date || g.classData.dp__range_start || g.classData.dp__range_start,
                          "aria-disabled": g.classData.dp__cell_disabled || void 0,
                          "aria-label": (K3 = (re = unref(c3)) == null ? void 0 : re.day) == null ? void 0 : K3.call(re, g),
                          tabindex: "0",
                          onClick: withModifiers((se) => s3.$emit("select-date", g), ["stop", "prevent"]),
                          onKeydown: [
                            withKeys((se) => s3.$emit("select-date", g), ["enter"]),
                            withKeys((se) => s3.$emit("handle-space", g), ["space"])
                          ],
                          onMouseenter: (se) => D3(g, R3, V),
                          onMouseleave: (se) => C(g)
                        }, [
                          createBaseVNode("div", {
                            class: normalizeClass(["dp__cell_inner", g.classData])
                          }, [
                            s3.$slots.day && v.value(g) ? renderSlot(s3.$slots, "day", {
                              key: 0,
                              day: +g.text,
                              date: g.value
                            }) : createCommentVNode("", true),
                            s3.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createTextVNode(toDisplayString(g.text), 1)
                            ], 64)),
                            g.marker && v.value(g) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                              s3.$slots.marker ? renderSlot(s3.$slots, "marker", {
                                key: 0,
                                marker: g.marker,
                                day: +g.text,
                                date: g.value
                              }) : (openBlock(), createElementBlock("div", {
                                key: 1,
                                class: normalizeClass(x3.value(g.marker)),
                                style: normalizeStyle(g.marker.color ? { backgroundColor: g.marker.color } : {})
                              }, null, 6))
                            ], 64)) : createCommentVNode("", true),
                            Z.value(g.value) ? (openBlock(), createElementBlock("div", {
                              key: 3,
                              class: "dp__marker_tooltip",
                              ref_for: true,
                              ref_key: "activeTooltip",
                              ref: Q3,
                              style: normalizeStyle(M3.value)
                            }, [
                              (we2 = g.marker) != null && we2.tooltip ? (openBlock(), createElementBlock("div", {
                                key: 0,
                                class: "dp__tooltip_content",
                                onClick: P[0] || (P[0] = withModifiers(() => {
                                }, ["stop"]))
                              }, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(g.marker.tooltip, (se, N) => (openBlock(), createElementBlock("div", {
                                  key: N,
                                  class: "dp__tooltip_text"
                                }, [
                                  s3.$slots["marker-tooltip"] ? renderSlot(s3.$slots, "marker-tooltip", {
                                    key: 0,
                                    tooltip: se,
                                    day: g.value
                                  }) : createCommentVNode("", true),
                                  s3.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                    createBaseVNode("div", {
                                      class: "dp__tooltip_mark",
                                      style: normalizeStyle(se.color ? { backgroundColor: se.color } : {})
                                    }, null, 4),
                                    createBaseVNode("div", null, toDisplayString(se.text), 1)
                                  ], 64))
                                ]))), 128)),
                                createBaseVNode("div", {
                                  class: "dp__arrow_bottom_tp",
                                  style: normalizeStyle(G3.value)
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
var sa = (e3) => Array.isArray(e3);
var Wl = (e3, n, a3, t3) => {
  const o = ref([]), { modelValue: l, calendars: c3, time: k3 } = Zt(e3, n), { defaultedMultiCalendars: h5, defaultedStartTime: M3 } = Ce(e3), { validateMonthYearInRange: p, isDisabled: T3, isDateRangeAllowed: E3, checkMinMaxRange: q3 } = Bt(e3), { updateTimeValues: z3, getSetDateTime: Q3, setTime: G3, assignStartTime: b3, disabledTimesConfig: A } = Na(
    e3,
    k3,
    l,
    t3
  ), O3 = computed(
    () => (i3) => c3.value[i3] ? c3.value[i3].month : 0
  ), H3 = computed(
    () => (i3) => c3.value[i3] ? c3.value[i3].year : 0
  ), _ = (i3, B3, ne) => {
    var me, De;
    c3.value[i3] || (c3.value[i3] = { month: 0, year: 0 }), c3.value[i3].month = ta(B3) ? (me = c3.value[i3]) == null ? void 0 : me.month : B3, c3.value[i3].year = ta(ne) ? (De = c3.value[i3]) == null ? void 0 : De.year : ne;
  }, x3 = () => {
    e3.autoApply && n("select-date");
  };
  watch(l, (i3, B3) => {
    JSON.stringify(i3) !== JSON.stringify(B3) && v();
  }), onMounted(() => {
    e3.shadow || (l.value || (s3(), M3.value && b3(M3.value)), v(true), e3.focusStartDate && e3.startDate && s3());
  });
  const Z = computed(() => {
    var i3;
    return (i3 = e3.flow) != null && i3.length && !e3.partialFlow ? e3.flowStep === e3.flow.length : true;
  }), le = () => {
    e3.autoApply && Z.value && n("auto-apply", e3.partialFlow);
  }, v = (i3 = false) => {
    if (l.value)
      return Array.isArray(l.value) ? (o.value = l.value, d3(i3)) : C(l.value, i3);
    if (h5.value.count && i3 && !e3.startDate)
      return D3(S3(), i3);
  }, D3 = (i3, B3 = false) => {
    if ((!h5.value.count || !h5.value.static || B3) && _(0, getMonth(i3), getYear(i3)), h5.value.count)
      for (let ne = 1; ne < h5.value.count; ne++) {
        const me = set(S3(), { month: O3.value(ne - 1), year: H3.value(ne - 1) }), De = add(me, { months: 1 });
        c3.value[ne] = { month: getMonth(De), year: getYear(De) };
      }
  }, C = (i3, B3) => {
    D3(i3), G3("hours", getHours(i3)), G3("minutes", getMinutes(i3)), G3("seconds", getSeconds(i3)), h5.value.count && B3 && y3();
  }, j = (i3) => {
    if (h5.value.count) {
      if (h5.value.solo)
        return 0;
      const B3 = getMonth(i3[0]), ne = getMonth(i3[1]);
      return Math.abs(ne - B3) < h5.value.count ? 0 : 1;
    }
    return 1;
  }, f = (i3, B3) => {
    i3[1] && e3.showLastInRange ? D3(i3[j(i3)], B3) : D3(i3[0], B3);
    const ne = (me, De) => [
      me(i3[0]),
      i3[1] ? me(i3[1]) : k3[De][1]
    ];
    G3("hours", ne(getHours, "hours")), G3("minutes", ne(getMinutes, "minutes")), G3("seconds", ne(getSeconds, "seconds"));
  }, F = (i3, B3) => {
    if ((e3.range || e3.weekPicker) && !e3.multiDates)
      return f(i3, B3);
    if (e3.multiDates && B3) {
      const ne = i3[i3.length - 1];
      return C(ne, B3);
    }
  }, d3 = (i3) => {
    const B3 = l.value;
    F(B3, i3), h5.value.count && h5.value.solo && y3();
  }, w3 = (i3, B3) => {
    const ne = set(S3(), { month: O3.value(B3), year: H3.value(B3) }), me = i3 < 0 ? addMonths(ne, 1) : subMonths(ne, 1);
    p(getMonth(me), getYear(me), i3 < 0, e3.preventMinMaxNavigation) && (_(B3, getMonth(me), getYear(me)), h5.value.count && !h5.value.solo && u3(B3), a3());
  }, u3 = (i3) => {
    for (let B3 = i3 - 1; B3 >= 0; B3--) {
      const ne = subMonths(set(S3(), { month: O3.value(B3 + 1), year: H3.value(B3 + 1) }), 1);
      _(B3, getMonth(ne), getYear(ne));
    }
    for (let B3 = i3 + 1; B3 <= h5.value.count - 1; B3++) {
      const ne = addMonths(set(S3(), { month: O3.value(B3 - 1), year: H3.value(B3 - 1) }), 1);
      _(B3, getMonth(ne), getYear(ne));
    }
  }, y3 = () => {
    if (Array.isArray(l.value) && l.value.length === 2) {
      const i3 = S3(
        S3(l.value[1] ? l.value[1] : addMonths(l.value[0], 1))
      ), [B3, ne] = [getMonth(l.value[0]), getYear(l.value[0])], [me, De] = [getMonth(l.value[1]), getYear(l.value[1])];
      (B3 !== me || B3 === me && ne !== De) && h5.value.solo && _(1, getMonth(i3), getYear(i3));
    } else
      l.value && !Array.isArray(l.value) && (_(0, getMonth(l.value), getYear(l.value)), D3(S3()));
  }, s3 = () => {
    e3.startDate && (_(0, getMonth(S3(e3.startDate)), getYear(S3(e3.startDate))), h5.value.count && u3(0));
  }, P = (i3, B3) => {
    e3.monthChangeOnScroll && w3(e3.monthChangeOnScroll !== "inverse" ? -i3.deltaY : i3.deltaY, B3);
  }, te = (i3, B3, ne = false) => {
    e3.monthChangeOnArrows && e3.vertical === ne && r(i3, B3);
  }, r = (i3, B3) => {
    w3(i3 === "right" ? -1 : 1, B3);
  }, U = (i3) => e3.markers.find((B3) => ye(aa(i3.value), aa(B3.date))), R3 = (i3, B3) => {
    switch (e3.sixWeeks === true ? "append" : e3.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [i3 == 0, true];
      case "fair":
        return [i3 == 0 || B3 > i3, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, g = (i3, B3, ne, me) => {
    if (e3.sixWeeks && i3.length < 6) {
      const De = 6 - i3.length, Qe2 = (B3.getDay() + 7 - me) % 7, Ft2 = 6 - (ne.getDay() + 7 - me) % 7, [$t2, rn2] = R3(Qe2, Ft2);
      for (let lt2 = 1; lt2 <= De; lt2++)
        if (rn2 ? !!(lt2 % 2) == $t2 : $t2) {
          const Vt = i3[0].days[0], ln2 = V(addDays(Vt.value, -7), getMonth(B3));
          i3.unshift({ days: ln2 });
        } else {
          const Vt = i3[i3.length - 1], ln2 = Vt.days[Vt.days.length - 1], Ia2 = V(addDays(ln2.value, 1), getMonth(B3));
          i3.push({ days: Ia2 });
        }
    }
    return i3;
  }, V = (i3, B3) => {
    const ne = S3(JSON.parse(JSON.stringify(i3))), me = [];
    for (let De = 0; De < 7; De++) {
      const Qe2 = addDays(ne, De), Mt2 = getMonth(Qe2) !== B3;
      me.push({
        text: e3.hideOffsetDates && Mt2 ? "" : Qe2.getDate(),
        value: Qe2,
        current: !Mt2,
        classData: {}
      });
    }
    return me;
  }, re = (i3, B3) => {
    const ne = [], me = S3(Ze(new Date(B3, i3), e3.timezone)), De = S3(Ze(new Date(B3, i3 + 1, 0), e3.timezone)), Qe2 = e3.weekStart, Mt2 = startOfWeek(me, { weekStartsOn: Qe2 }), Ft2 = ($t2) => {
      const rn2 = V($t2, i3);
      if (ne.push({ days: rn2 }), !ne[ne.length - 1].days.some(
        (lt2) => ye(Le(lt2.value), Le(De))
      )) {
        const lt2 = addDays($t2, 7);
        Ft2(lt2);
      }
    };
    return Ft2(Mt2), g(ne, me, De, Qe2);
  }, K3 = (i3) => (l.value = jt(S3(i3.value), e3.timezone, e3.weekStart), le()), we2 = (i3) => {
    const B3 = tt(S3(i3.value), k3.hours, k3.minutes, Et2());
    e3.multiDates ? Ln(B3, l, e3.multiDatesLimit) : l.value = B3, t3(), nextTick().then(() => {
      le();
    });
  }, se = (i3) => e3.noDisabledRange ? Ta(o.value[0], i3).some((ne) => T3(ne)) : false, N = () => {
    o.value = l.value ? l.value.slice() : [], o.value.length === 2 && !(e3.fixedStart || e3.fixedEnd) && (o.value = []);
  }, J = (i3, B3) => {
    const ne = [S3(i3.value), addDays(S3(i3.value), +e3.autoRange)];
    E3(ne) && (B3 && $e(i3.value), o.value = ne);
  }, $e = (i3) => {
    const B3 = getMonth(S3(i3)), ne = getYear(S3(i3));
    if (_(0, B3, ne), h5.value.count > 0)
      for (let me = 1; me < h5.value.count; me++) {
        const De = Cr(
          set(S3(i3), { year: O3.value(me - 1), month: H3.value(me - 1) })
        );
        _(me, De.month, De.year);
      }
  }, X3 = (i3) => Array.isArray(l.value) && l.value.length === 2 ? e3.fixedStart && (Re(i3, l.value[0]) || ye(i3, l.value[0])) ? [l.value[0], i3] : e3.fixedEnd && (Pe(i3, l.value[1]) || ye(i3, l.value[1])) ? [i3, l.value[1]] : (n("invalid-fixed-range", i3), l.value) : [], Ve2 = (i3) => {
    se(i3.value) || !q3(i3.value, l.value, e3.fixedStart ? 0 : 1) || (o.value = X3(S3(i3.value)));
  }, _e2 = (i3, B3) => {
    if (N(), e3.autoRange)
      return J(i3, B3);
    if (e3.fixedStart || e3.fixedEnd)
      return Ve2(i3);
    o.value[0] ? q3(S3(i3.value), l.value) && !se(i3.value) && (Pe(S3(i3.value), S3(o.value[0])) ? (o.value.unshift(S3(i3.value)), n("range-end", o.value[0])) : (o.value[1] = S3(i3.value), n("range-end", o.value[1]))) : (o.value[0] = S3(i3.value), n("range-start", o.value[0]));
  }, Et2 = (i3 = true) => e3.enableSeconds ? Array.isArray(k3.seconds) ? i3 ? k3.seconds[0] : k3.seconds[1] : k3.seconds : 0, Dt2 = (i3) => {
    o.value[i3] = tt(
      o.value[i3],
      k3.hours[i3],
      k3.minutes[i3],
      Et2(i3 !== 1)
    );
  }, Jt = () => {
    var i3, B3;
    o.value[0] && o.value[1] && +((i3 = o.value) == null ? void 0 : i3[0]) > +((B3 = o.value) == null ? void 0 : B3[1]) && (o.value.reverse(), n("range-start", o.value[0]), n("range-end", o.value[1]));
  }, Xt = () => {
    o.value.length && (o.value[0] && !o.value[1] ? Dt2(0) : (Dt2(0), Dt2(1), t3()), Jt(), l.value = o.value.slice(), Un(o.value, n, e3.autoApply, e3.modelAuto));
  }, Qt2 = (i3, B3 = false) => {
    if (!(T3(i3.value) || !i3.current && e3.hideOffsetDates)) {
      if (e3.weekPicker)
        return K3(i3);
      if (!e3.range)
        return we2(i3);
      sa(k3.hours) && sa(k3.minutes) && !e3.multiDates && (_e2(i3, B3), Xt());
    }
  }, en2 = (i3, B3) => {
    _(i3, B3.month, B3.year), h5.value.count && !h5.value.solo && u3(i3), n("update-month-year", { instance: i3, month: B3.month, year: B3.year }), a3(h5.value.solo ? i3 : void 0), t3();
  }, tn2 = (i3, B3) => {
    Array.isArray(i3) && i3.length <= 2 && e3.range ? l.value = i3.map((ne) => Ze(S3(ne), B3 ? void 0 : e3.timezone)) : Array.isArray(i3) || (l.value = Ze(S3(i3), B3 ? void 0 : e3.timezone)), x3(), e3.multiCalendars && nextTick().then(() => v(true));
  }, nn2 = () => {
    e3.range ? l.value && Array.isArray(l.value) && l.value[0] ? l.value = Pe(S3(), l.value[0]) ? [S3(), l.value[0]] : [l.value[0], S3()] : l.value = [S3()] : l.value = S3(), x3();
  }, an2 = () => {
    if (Array.isArray(l.value))
      if (e3.multiDates) {
        const i3 = ae();
        l.value[l.value.length - 1] = Q3(i3);
      } else
        l.value = l.value.map((i3, B3) => i3 && Q3(i3, B3));
    else
      l.value = Q3(l.value);
    n("time-update");
  }, ae = () => Array.isArray(l.value) && l.value.length ? l.value[l.value.length - 1] : null;
  return {
    calendars: c3,
    modelValue: l,
    month: O3,
    year: H3,
    time: k3,
    disabledTimesConfig: A,
    getCalendarDays: re,
    getMarker: U,
    handleScroll: P,
    handleSwipe: r,
    handleArrow: te,
    selectDate: Qt2,
    updateMonthYear: en2,
    presetDate: tn2,
    selectCurrentDate: nn2,
    updateTime: (i3, B3 = true, ne = false) => {
      z3(i3, B3, ne, an2);
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
  setup(e3, { expose: n, emit: a3 }) {
    const t3 = e3, {
      calendars: o,
      month: l,
      year: c3,
      modelValue: k3,
      time: h5,
      disabledTimesConfig: M3,
      getCalendarDays: p,
      getMarker: T3,
      handleArrow: E3,
      handleScroll: q3,
      handleSwipe: z3,
      selectDate: Q3,
      updateMonthYear: G3,
      presetDate: b3,
      selectCurrentDate: A,
      updateTime: O3
    } = Wl(t3, a3, u3, y3), H3 = useSlots(), { setHoverDate: _, getDayClassData: x3, clearHoverDate: Z } = Zr(k3, t3), { defaultedMultiCalendars: le } = Ce(t3), v = ref([]), D3 = ref([]), C = ref(null), j = je(H3, "calendar"), f = je(H3, "monthYear"), F = je(H3, "timePicker"), d3 = (R3) => {
      t3.shadow || a3("mount", R3);
    };
    watch(
      o,
      () => {
        t3.shadow || setTimeout(() => {
          a3("recalculate-position");
        }, 0);
      },
      { deep: true }
    );
    const w3 = computed(() => (R3) => p(l.value(R3), c3.value(R3)).map((g) => ({
      ...g,
      days: g.days.map((V) => (V.marker = T3(V), V.classData = x3(V), V))
    })));
    function u3(R3) {
      var g;
      R3 || R3 === 0 ? (g = D3.value[R3]) == null || g.triggerTransition(l.value(R3), c3.value(R3)) : D3.value.forEach((V, re) => V.triggerTransition(l.value(re), c3.value(re)));
    }
    function y3() {
      a3("update-flow-step");
    }
    const s3 = (R3, g = false) => {
      Q3(R3, g), t3.spaceConfirm && a3("select-date");
    };
    return n({
      clearHoverDate: Z,
      presetDate: b3,
      selectCurrentDate: A,
      toggleMonthPicker: (R3, g, V = 0) => {
        var re;
        (re = v.value[V]) == null || re.toggleMonthPicker(R3, g);
      },
      toggleYearPicker: (R3, g, V = 0) => {
        var re;
        (re = v.value[V]) == null || re.toggleYearPicker(R3, g);
      },
      toggleTimePicker: (R3, g, V) => {
        var re;
        (re = C.value) == null || re.toggleTimePicker(R3, g, V);
      },
      handleArrow: E3,
      updateMonthYear: G3,
      getSidebarProps: () => ({
        modelValue: k3,
        month: l,
        year: c3,
        time: h5,
        updateTime: O3,
        updateMonthYear: G3,
        selectDate: Q3,
        presetDate: b3
      })
    }), (R3, g) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(Hn, {
        "multi-calendars": unref(le).count
      }, {
        default: withCtx(({ instance: V, index: re }) => [
          R3.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(Ol, mergeProps({
            key: 0,
            ref: (K3) => {
              K3 && (v.value[re] = K3);
            },
            months: unref(wa)(R3.formatLocale, R3.locale, R3.monthNameFormat),
            years: unref(Fn)(R3.yearRange, R3.reverseYears),
            month: unref(l)(V),
            year: unref(c3)(V),
            instance: V
          }, R3.$props, {
            onMount: g[0] || (g[0] = (K3) => d3(unref(vt).header)),
            onResetFlow: g[1] || (g[1] = (K3) => R3.$emit("reset-flow")),
            onUpdateMonthYear: (K3) => unref(G3)(V, K3),
            onOverlayClosed: g[2] || (g[2] = (K3) => R3.$emit("focus-menu"))
          }), createSlots({ _: 2 }, [
            renderList(unref(f), (K3, we2) => ({
              name: K3,
              fn: withCtx((se) => [
                renderSlot(R3.$slots, K3, normalizeProps(guardReactiveProps(se)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(Ul, mergeProps({
            ref: (K3) => {
              K3 && (D3.value[re] = K3);
            },
            "mapped-dates": w3.value(V),
            month: unref(l)(V),
            year: unref(c3)(V)
          }, R3.$props, {
            onSelectDate: (K3) => unref(Q3)(K3, V !== 1),
            onHandleSpace: (K3) => s3(K3, V !== 1),
            onSetHoverDate: g[3] || (g[3] = (K3) => unref(_)(K3)),
            onHandleScroll: (K3) => unref(q3)(K3, V),
            onHandleSwipe: (K3) => unref(z3)(K3, V),
            onMount: g[4] || (g[4] = (K3) => d3(unref(vt).calendar)),
            onResetFlow: g[5] || (g[5] = (K3) => R3.$emit("reset-flow")),
            onTooltipOpen: g[6] || (g[6] = (K3) => R3.$emit("tooltip-open", K3)),
            onTooltipClose: g[7] || (g[7] = (K3) => R3.$emit("tooltip-close", K3))
          }), createSlots({ _: 2 }, [
            renderList(unref(j), (K3, we2) => ({
              name: K3,
              fn: withCtx((se) => [
                renderSlot(R3.$slots, K3, normalizeProps(guardReactiveProps({ ...se })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars"]),
      R3.enableTimePicker ? (openBlock(), createElementBlock("div", zl, [
        R3.$slots["time-picker"] ? renderSlot(R3.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(h5), updateTime: unref(O3) }))) : (openBlock(), createBlock(Ra, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: C
        }, R3.$props, {
          hours: unref(h5).hours,
          minutes: unref(h5).minutes,
          seconds: unref(h5).seconds,
          "internal-model-value": R3.internalModelValue,
          "disabled-times-config": unref(M3),
          onMount: g[8] || (g[8] = (V) => d3(unref(vt).timePicker)),
          "onUpdate:hours": g[9] || (g[9] = (V) => unref(O3)(V)),
          "onUpdate:minutes": g[10] || (g[10] = (V) => unref(O3)(V, false)),
          "onUpdate:seconds": g[11] || (g[11] = (V) => unref(O3)(V, false, true)),
          onResetFlow: g[12] || (g[12] = (V) => R3.$emit("reset-flow")),
          onOverlayClosed: g[13] || (g[13] = (V) => R3.$emit("time-picker-close")),
          onOverlayOpened: g[14] || (g[14] = (V) => R3.$emit("time-picker-open", V)),
          onAmPmChange: g[15] || (g[15] = (V) => R3.$emit("am-pm-change", V))
        }), createSlots({ _: 2 }, [
          renderList(unref(F), (V, re) => ({
            name: V,
            fn: withCtx((K3) => [
              renderSlot(R3.$slots, V, normalizeProps(guardReactiveProps(K3)))
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
  setup(e3, { expose: n, emit: a3 }) {
    const t3 = e3, o = computed(() => {
      const { openOnTop: N, ...J } = t3;
      return {
        ...J,
        flowStep: x3.value
      };
    }), { setMenuFocused: l, setShiftKey: c3, control: k3 } = Pa(), h5 = useSlots(), { defaultedTextInput: M3, defaultedInline: p } = Ce(t3), T3 = ref(null), E3 = ref(0), q3 = ref(null), z3 = ref(null), Q3 = ref(false), G3 = ref(null);
    onMounted(() => {
      if (!t3.shadow) {
        Q3.value = true, b3(), window.addEventListener("resize", b3);
        const N = Ae(q3);
        if (N && !M3.value.enabled && !p.value.enabled && (l(true), C()), N) {
          const J = ($e) => {
            t3.allowPreventDefault && $e.preventDefault(), $e.stopImmediatePropagation(), $e.stopPropagation();
          };
          N.addEventListener("pointerdown", J), N.addEventListener("mousedown", J);
        }
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", b3);
    });
    const b3 = () => {
      const N = Ae(z3);
      N && (E3.value = N.getBoundingClientRect().width);
    }, { arrowRight: A, arrowLeft: O3, arrowDown: H3, arrowUp: _ } = rt(), { flowStep: x3, updateFlowStep: Z, childMount: le, resetFlow: v } = qr(t3, a3, G3), D3 = computed(() => t3.monthPicker ? fl : t3.yearPicker ? ml : t3.timePicker ? Cl : jl), C = () => {
      const N = Ae(q3);
      N && N.focus({ preventScroll: true });
    }, j = computed(() => {
      var N;
      return ((N = G3.value) == null ? void 0 : N.getSidebarProps()) || {};
    }), f = () => {
      t3.openOnTop && a3("recalculate-position");
    }, F = je(h5, "action"), d3 = computed(() => t3.monthPicker || t3.yearPicker ? je(h5, "monthYear") : t3.timePicker ? je(h5, "timePicker") : je(h5, "shared")), w3 = computed(() => t3.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), u3 = computed(() => ({
      dp__menu_disabled: t3.disabled,
      dp__menu_readonly: t3.readonly
    })), y3 = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !p.value.enabled,
        dp__relative: p.value.enabled,
        [t3.menuClassName]: !!t3.menuClassName
      })
    ), s3 = (N) => {
      N.stopPropagation(), N.stopImmediatePropagation();
    }, P = () => {
      t3.escClose && a3("close-picker");
    }, te = (N) => {
      if (t3.arrowNavigation) {
        if (N === "up")
          return _();
        if (N === "down")
          return H3();
        if (N === "left")
          return O3();
        if (N === "right")
          return A();
      } else
        N === "left" || N === "up" ? V("handleArrow", "left", 0, N === "up") : V("handleArrow", "right", 0, N === "down");
    }, r = (N) => {
      c3(N.shiftKey), !t3.disableMonthYearSelect && N.code === "Tab" && N.target.classList.contains("dp__menu") && k3.value.shiftKeyInMenu && (N.preventDefault(), N.stopImmediatePropagation(), a3("close-picker"));
    }, U = () => {
      C(), a3("time-picker-close");
    }, R3 = (N) => {
      var J, $e, X3;
      (J = G3.value) == null || J.toggleTimePicker(false, false), ($e = G3.value) == null || $e.toggleMonthPicker(false, false, N), (X3 = G3.value) == null || X3.toggleYearPicker(false, false, N);
    }, g = (N, J = 0) => {
      var $e, X3, Ve2;
      return N === "month" ? ($e = G3.value) == null ? void 0 : $e.toggleMonthPicker(false, true, J) : N === "year" ? (X3 = G3.value) == null ? void 0 : X3.toggleYearPicker(false, true, J) : N === "time" ? (Ve2 = G3.value) == null ? void 0 : Ve2.toggleTimePicker(true, false) : R3(J);
    }, V = (N, ...J) => {
      var $e, X3;
      ($e = G3.value) != null && $e[N] && ((X3 = G3.value) == null || X3[N](...J));
    }, re = () => {
      V("selectCurrentDate");
    }, K3 = (N, J) => {
      V("presetDate", N, J);
    }, we2 = () => {
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
        ref: q3,
        role: "dialog",
        class: normalizeClass(y3.value),
        onMouseleave: we2,
        onClick: s3,
        onKeydown: [
          withKeys(P, ["esc"]),
          J[15] || (J[15] = withKeys(withModifiers((X3) => te("left"), ["prevent"]), ["left"])),
          J[16] || (J[16] = withKeys(withModifiers((X3) => te("up"), ["prevent"]), ["up"])),
          J[17] || (J[17] = withKeys(withModifiers((X3) => te("down"), ["prevent"]), ["down"])),
          J[18] || (J[18] = withKeys(withModifiers((X3) => te("right"), ["prevent"]), ["right"])),
          r
        ]
      }, [
        (N.disabled || N.readonly) && unref(p).enabled ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(u3.value)
        }, null, 2)) : createCommentVNode("", true),
        !unref(p).enabled && !N.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(w3.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: z3,
          class: normalizeClass({
            dp__menu_content_wrapper: (($e = N.presetDates) == null ? void 0 : $e.length) || !!N.$slots["left-sidebar"] || !!N.$slots["right-sidebar"]
          }),
          style: normalizeStyle({ "--dp-menu-width": `${E3.value}px` })
        }, [
          N.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", Gl, [
            renderSlot(N.$slots, "left-sidebar", normalizeProps(guardReactiveProps(j.value)))
          ])) : createCommentVNode("", true),
          N.presetDates.length ? (openBlock(), createElementBlock("div", Zl, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(N.presetDates, (X3, Ve2) => (openBlock(), createElementBlock("div", {
              key: Ve2,
              style: normalizeStyle(X3.style || {}),
              class: "dp--preset-range"
            }, [
              X3.slot ? renderSlot(N.$slots, X3.slot, {
                key: 0,
                presetDate: K3,
                label: X3.label,
                value: X3.value
              }) : (openBlock(), createElementBlock("div", {
                key: 1,
                role: "button",
                tabindex: "0",
                onClick: (_e2) => K3(X3.value, X3.noTz),
                onKeydown: [
                  withKeys(withModifiers((_e2) => K3(X3.value, X3.noTz), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((_e2) => K3(X3.value, X3.noTz), ["prevent"]), ["space"])
                ]
              }, toDisplayString(X3.label), 41, ql))
            ], 4))), 128))
          ])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: "dp__instance_calendar",
            ref_key: "calendarWrapperRef",
            ref: T3,
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(D3.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: G3
            }, o.value, {
              "flow-step": unref(x3),
              onMount: unref(le),
              onUpdateFlowStep: unref(Z),
              onResetFlow: unref(v),
              onFocusMenu: C,
              onSelectDate: J[0] || (J[0] = (X3) => N.$emit("select-date")),
              onTooltipOpen: J[1] || (J[1] = (X3) => N.$emit("tooltip-open", X3)),
              onTooltipClose: J[2] || (J[2] = (X3) => N.$emit("tooltip-close", X3)),
              onAutoApply: J[3] || (J[3] = (X3) => N.$emit("auto-apply", X3)),
              onRangeStart: J[4] || (J[4] = (X3) => N.$emit("range-start", X3)),
              onRangeEnd: J[5] || (J[5] = (X3) => N.$emit("range-end", X3)),
              onInvalidFixedRange: J[6] || (J[6] = (X3) => N.$emit("invalid-fixed-range", X3)),
              onTimeUpdate: J[7] || (J[7] = (X3) => N.$emit("time-update")),
              onAmPmChange: J[8] || (J[8] = (X3) => N.$emit("am-pm-change", X3)),
              onTimePickerOpen: J[9] || (J[9] = (X3) => N.$emit("time-picker-open", X3)),
              onTimePickerClose: U,
              onRecalculatePosition: f,
              onUpdateMonthYear: J[10] || (J[10] = (X3) => N.$emit("update-month-year", X3)),
              "onUpdate:internalModelValue": J[11] || (J[11] = (X3) => N.$emit("update:internal-model-value", X3))
            }), createSlots({ _: 2 }, [
              renderList(d3.value, (X3, Ve2) => ({
                name: X3,
                fn: withCtx((_e2) => [
                  renderSlot(N.$slots, X3, normalizeProps(guardReactiveProps({ ..._e2 })))
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
          "menu-mount": Q3.value
        }, o.value, {
          "calendar-width": E3.value,
          onClosePicker: J[12] || (J[12] = (X3) => N.$emit("close-picker")),
          onSelectDate: J[13] || (J[13] = (X3) => N.$emit("select-date")),
          onInvalidSelect: J[14] || (J[14] = (X3) => N.$emit("invalid-select")),
          onSelectNow: re
        }), createSlots({ _: 2 }, [
          renderList(unref(F), (X3, Ve2) => ({
            name: X3,
            fn: withCtx((_e2) => [
              renderSlot(N.$slots, X3, normalizeProps(guardReactiveProps({ ..._e2 })))
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
var Ql = (e3) => getCurrentScope() ? (onScopeDispose(e3), true) : false;
var eo = (e3, n, a3, t3) => {
  if (!e3)
    return pn;
  let o = pn;
  const l = watch(
    () => unref(e3),
    (k3) => {
      o(), k3 && (k3.addEventListener(n, a3, t3), o = () => {
        k3.removeEventListener(n, a3, t3), o = pn;
      });
    },
    { immediate: true, flush: "post" }
  ), c3 = () => {
    l(), o();
  };
  return Ql(c3), c3;
};
var to = (e3, n, a3, t3 = {}) => {
  const { window: o = Xl, event: l = "pointerdown" } = t3;
  return o ? eo(o, l, (k3) => {
    const h5 = Ae(e3), M3 = Ae(n);
    !h5 || !M3 || h5 === k3.target || k3.composedPath().includes(h5) || k3.composedPath().includes(M3) || a3(k3);
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
  setup(e3, { expose: n, emit: a3 }) {
    const t3 = e3, o = useSlots(), l = ref(false), c3 = toRef(t3, "modelValue"), k3 = toRef(t3, "timezone"), h5 = ref(null), M3 = ref(null), p = ref(null), T3 = ref(false), E3 = ref(null), { setMenuFocused: q3, setShiftKey: z3 } = Pa(), { clearArrowNav: Q3 } = rt(), { mapDatesArrToMap: G3, validateDate: b3, isValidTime: A } = Bt(t3), { defaultedTransitions: O3, defaultedTextInput: H3, defaultedInline: _ } = Ce(t3), { menuTransition: x3, showTransition: Z } = Yt(O3);
    onMounted(() => {
      s3(t3.modelValue), nextTick().then(() => {
        _.value.enabled || (d3(E3.value).addEventListener("scroll", V), window.addEventListener("resize", re));
      }), _.value.enabled && (l.value = true);
    });
    const le = computed(() => G3());
    onUnmounted(() => {
      if (!_.value.enabled) {
        const ae = d3(E3.value);
        ae && ae.removeEventListener("scroll", V), window.removeEventListener("resize", re);
      }
    });
    const v = je(o, "all", t3.presetDates), D3 = je(o, "input");
    watch(
      [c3, k3],
      () => {
        s3(c3.value);
      },
      { deep: true }
    );
    const { openOnTop: C, menuStyle: j, xCorrect: f, setMenuPosition: F, getScrollableParent: d3, shadowRender: w3 } = jr(
      h5,
      M3,
      p,
      E3,
      _,
      a3,
      t3
    ), {
      inputValue: u3,
      internalModelValue: y3,
      parseExternalModelValue: s3,
      emitModelValue: P,
      formatInputValue: te,
      checkBeforeEmit: r
    } = Wr(a3, t3, T3), U = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: t3.dark,
        dp__theme_light: !t3.dark,
        dp__flex_display: _.value.enabled,
        dp__flex_display_with_input: _.value.input
      })
    ), R3 = computed(() => t3.dark ? "dp__theme_dark" : "dp__theme_light"), g = computed(() => t3.teleport ? {
      to: typeof t3.teleport == "boolean" ? "body" : t3.teleport,
      disabled: _.value.enabled
    } : { class: "dp__outer_menu_wrap" }), V = () => {
      l.value && (t3.closeOnScroll ? _e2() : F());
    }, re = () => {
      l.value && F();
    }, K3 = () => {
      !t3.disabled && !t3.readonly && (w3(ua, t3), F(false), l.value = true, l.value && a3("open"), l.value || Ve2(), s3(t3.modelValue));
    }, we2 = () => {
      u3.value = "", Ve2(), a3("update:model-value", null), a3("update:model-timezone-value", null), a3("cleared"), t3.closeOnClearValue && _e2();
    }, se = () => {
      const ae = y3.value;
      return !ae || !Array.isArray(ae) && b3(ae) ? true : Array.isArray(ae) ? ae.length === 2 && b3(ae[0]) && b3(ae[1]) ? true : t3.partialRange && !t3.timePicker ? b3(ae[0]) : false : false;
    }, N = () => {
      r() && se() ? (P(), _e2()) : a3("invalid-select", y3.value);
    }, J = (ae) => {
      $e(), P(), t3.closeOnAutoApply && !ae && _e2();
    }, $e = () => {
      p.value && H3.value.enabled && p.value.setParsedDate(y3.value);
    }, X3 = (ae = false) => {
      t3.autoApply && A(y3.value) && se() && (t3.range && Array.isArray(y3.value) ? (t3.partialRange || y3.value.length === 2) && J(ae) : J(ae));
    }, Ve2 = () => {
      H3.value.enabled || (y3.value = null);
    }, _e2 = () => {
      _.value.enabled || (l.value && (l.value = false, f.value = false, q3(false), z3(false), Q3(), a3("closed"), u3.value && s3(c3.value)), Ve2(), a3("blur"));
    }, Et2 = (ae, ie) => {
      if (!ae) {
        y3.value = null;
        return;
      }
      y3.value = ae, ie && (N(), a3("text-submit"));
    }, Dt2 = () => {
      t3.autoApply && A(y3.value) && P(), $e();
    }, Jt = () => l.value ? _e2() : K3(), Xt = (ae) => {
      y3.value = ae;
    }, Qt2 = () => {
      H3.value.enabled && (T3.value = true, te()), a3("focus");
    }, en2 = () => {
      H3.value.enabled && (T3.value = false, s3(t3.modelValue)), a3("blur");
    }, tn2 = (ae) => {
      M3.value && M3.value.updateMonthYear(0, {
        month: ea(ae.month),
        year: ea(ae.year)
      });
    }, nn2 = (ae) => {
      s3(ae ?? t3.modelValue);
    }, an2 = (ae, ie) => {
      var i3;
      (i3 = M3.value) == null || i3.switchView(ae, ie);
    };
    return to(
      h5,
      p,
      t3.onClickOutside ? () => t3.onClickOutside(se) : _e2
    ), n({
      closeMenu: _e2,
      selectDate: N,
      clearValue: we2,
      openMenu: K3,
      onScroll: V,
      formatInputValue: te,
      // exposed for testing purposes
      updateInternalModelValue: Xt,
      // modify internal modelValue
      setMonthYear: tn2,
      parseModel: nn2,
      switchView: an2
    }), (ae, ie) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(U.value),
      ref_key: "pickerWrapperRef",
      ref: E3
    }, [
      createVNode(Qr, mergeProps({
        ref_key: "inputRef",
        ref: p,
        "is-menu-open": l.value,
        "input-value": unref(u3),
        "onUpdate:inputValue": ie[0] || (ie[0] = (i3) => isRef(u3) ? u3.value = i3 : null)
      }, ae.$props, {
        onClear: we2,
        onOpen: K3,
        onSetInputDate: Et2,
        onSetEmptyDate: unref(P),
        onSelectDate: N,
        onToggle: Jt,
        onClose: _e2,
        onFocus: Qt2,
        onBlur: en2,
        onRealBlur: ie[1] || (ie[1] = (i3) => T3.value = false)
      }), createSlots({ _: 2 }, [
        renderList(unref(D3), (i3, B3) => ({
          name: i3,
          fn: withCtx((ne) => [
            renderSlot(ae.$slots, i3, normalizeProps(guardReactiveProps(ne)))
          ])
        }))
      ]), 1040, ["is-menu-open", "input-value", "onSetEmptyDate"]),
      createVNode(Transition, {
        name: unref(x3)(unref(C)),
        css: unref(Z) && !unref(_).enabled
      }, {
        default: withCtx(() => [
          l.value ? (openBlock(), createBlock(resolveDynamicComponent(ae.teleport ? Teleport : "div"), mergeProps({
            key: 0,
            ref_key: "dpWrapMenuRef",
            ref: h5
          }, g.value, {
            class: { "dp--menu-wrapper": !unref(_).enabled },
            style: unref(_).enabled ? void 0 : unref(j)
          }), {
            default: withCtx(() => [
              createVNode(ua, mergeProps({
                ref_key: "dpMenuRef",
                ref: M3,
                class: { [R3.value]: true, "dp--menu-wrapper": ae.teleport },
                style: ae.teleport ? unref(j) : void 0,
                "open-on-top": unref(C),
                "arr-map-values": le.value
              }, ae.$props, {
                "internal-model-value": unref(y3),
                "onUpdate:internalModelValue": ie[2] || (ie[2] = (i3) => isRef(y3) ? y3.value = i3 : null),
                onClosePicker: _e2,
                onSelectDate: N,
                onAutoApply: X3,
                onTimeUpdate: Dt2,
                onFlowStep: ie[3] || (ie[3] = (i3) => ae.$emit("flow-step", i3)),
                onUpdateMonthYear: ie[4] || (ie[4] = (i3) => ae.$emit("update-month-year", i3)),
                onInvalidSelect: ie[5] || (ie[5] = (i3) => ae.$emit("invalid-select", unref(y3))),
                onInvalidFixedRange: ie[6] || (ie[6] = (i3) => ae.$emit("invalid-fixed-range", i3)),
                onRecalculatePosition: unref(F),
                onTooltipOpen: ie[7] || (ie[7] = (i3) => ae.$emit("tooltip-open", i3)),
                onTooltipClose: ie[8] || (ie[8] = (i3) => ae.$emit("tooltip-close", i3)),
                onTimePickerOpen: ie[9] || (ie[9] = (i3) => ae.$emit("time-picker-open", i3)),
                onTimePickerClose: ie[10] || (ie[10] = (i3) => ae.$emit("time-picker-close", i3)),
                onAmPmChange: ie[11] || (ie[11] = (i3) => ae.$emit("am-pm-change", i3)),
                onRangeStart: ie[12] || (ie[12] = (i3) => ae.$emit("range-start", i3)),
                onRangeEnd: ie[13] || (ie[13] = (i3) => ae.$emit("range-end", i3))
              }), createSlots({ _: 2 }, [
                renderList(unref(v), (i3, B3) => ({
                  name: i3,
                  fn: withCtx((ne) => [
                    renderSlot(ae.$slots, i3, normalizeProps(guardReactiveProps({ ...ne })))
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
  const e3 = no;
  return e3.install = (n) => {
    n.component("Vue3DatePicker", e3);
  }, e3;
})();
var ao = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Oa
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(ao).forEach(([e3, n]) => {
  e3 !== "default" && (Oa[e3] = n);
});

// node_modules/.pnpm/@vueuse+shared@10.4.1_vue@3.3.4/node_modules/@vueuse/shared/index.mjs
var isClient = typeof window !== "undefined" && typeof document !== "undefined";
var noop = () => {
};
var isIOS = getIsIOS();
function getIsIOS() {
  var _a3;
  return isClient && ((_a3 = window == null ? void 0 : window.navigator) == null ? void 0 : _a3.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
}
function cacheStringFunction(fn3) {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn3(str));
  };
}
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c3) => c3 ? c3.toUpperCase() : "");
});
function toRef2(...args) {
  if (args.length !== 1)
    return toRef(...args);
  const r = args[0];
  return typeof r === "function" ? readonly(customRef(() => ({ get: r, set: noop }))) : ref(r);
}

// node_modules/.pnpm/@vueuse+integrations@10.4.1_focus-trap@7.5.2_qrcode@1.5.3_vue@3.3.4/node_modules/@vueuse/integrations/useQRCode.mjs
var import_qrcode = __toESM(require_browser(), 1);
function useQRCode(text, options) {
  const src = toRef2(text);
  const result = ref("");
  watch(
    src,
    async (value) => {
      if (src.value && isClient)
        result.value = await import_qrcode.default.toDataURL(value, options);
    },
    { immediate: true }
  );
  return result;
}

// node_modules/.pnpm/swiper@10.2.0/node_modules/swiper/shared/ssr-window.esm.mjs
function isObject(obj) {
  return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
}
function extend(target, src) {
  if (target === void 0) {
    target = {};
  }
  if (src === void 0) {
    src = {};
  }
  Object.keys(src).forEach((key) => {
    if (typeof target[key] === "undefined")
      target[key] = src[key];
    else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
      extend(target[key], src[key]);
    }
  });
}
var ssrDocument = {
  body: {},
  addEventListener() {
  },
  removeEventListener() {
  },
  activeElement: {
    blur() {
    },
    nodeName: ""
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return {
      initEvent() {
      }
    };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {
      },
      getElementsByTagName() {
        return [];
      }
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  }
};
function getDocument() {
  const doc = typeof document !== "undefined" ? document : {};
  extend(doc, ssrDocument);
  return doc;
}
var ssrWindow = {
  document: ssrDocument,
  navigator: {
    userAgent: ""
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  },
  history: {
    replaceState() {
    },
    pushState() {
    },
    go() {
    },
    back() {
    }
  },
  CustomEvent: function CustomEvent() {
    return this;
  },
  addEventListener() {
  },
  removeEventListener() {
  },
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      }
    };
  },
  Image() {
  },
  Date() {
  },
  screen: {},
  setTimeout() {
  },
  clearTimeout() {
  },
  matchMedia() {
    return {};
  },
  requestAnimationFrame(callback) {
    if (typeof setTimeout === "undefined") {
      callback();
      return null;
    }
    return setTimeout(callback, 0);
  },
  cancelAnimationFrame(id) {
    if (typeof setTimeout === "undefined") {
      return;
    }
    clearTimeout(id);
  }
};
function getWindow() {
  const win = typeof window !== "undefined" ? window : {};
  extend(win, ssrWindow);
  return win;
}

// node_modules/.pnpm/swiper@10.2.0/node_modules/swiper/shared/utils.mjs
function deleteProps(obj) {
  const object = obj;
  Object.keys(object).forEach((key) => {
    try {
      object[key] = null;
    } catch (e3) {
    }
    try {
      delete object[key];
    } catch (e3) {
    }
  });
}
function nextTick2(callback, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return setTimeout(callback, delay);
}
function now() {
  return Date.now();
}
function getComputedStyle2(el3) {
  const window2 = getWindow();
  let style;
  if (window2.getComputedStyle) {
    style = window2.getComputedStyle(el3, null);
  }
  if (!style && el3.currentStyle) {
    style = el3.currentStyle;
  }
  if (!style) {
    style = el3.style;
  }
  return style;
}
function getTranslate(el3, axis) {
  if (axis === void 0) {
    axis = "x";
  }
  const window2 = getWindow();
  let matrix;
  let curTransform;
  let transformMatrix;
  const curStyle = getComputedStyle2(el3);
  if (window2.WebKitCSSMatrix) {
    curTransform = curStyle.transform || curStyle.webkitTransform;
    if (curTransform.split(",").length > 6) {
      curTransform = curTransform.split(", ").map((a3) => a3.replace(",", ".")).join(", ");
    }
    transformMatrix = new window2.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
  } else {
    transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
    matrix = transformMatrix.toString().split(",");
  }
  if (axis === "x") {
    if (window2.WebKitCSSMatrix)
      curTransform = transformMatrix.m41;
    else if (matrix.length === 16)
      curTransform = parseFloat(matrix[12]);
    else
      curTransform = parseFloat(matrix[4]);
  }
  if (axis === "y") {
    if (window2.WebKitCSSMatrix)
      curTransform = transformMatrix.m42;
    else if (matrix.length === 16)
      curTransform = parseFloat(matrix[13]);
    else
      curTransform = parseFloat(matrix[5]);
  }
  return curTransform || 0;
}
function isObject2(o) {
  return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
}
function isNode(node) {
  if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") {
    return node instanceof HTMLElement;
  }
  return node && (node.nodeType === 1 || node.nodeType === 11);
}
function extend2() {
  const to3 = Object(arguments.length <= 0 ? void 0 : arguments[0]);
  const noExtend = ["__proto__", "constructor", "prototype"];
  for (let i3 = 1; i3 < arguments.length; i3 += 1) {
    const nextSource = i3 < 0 || arguments.length <= i3 ? void 0 : arguments[i3];
    if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
      const keysArray = Object.keys(Object(nextSource)).filter((key) => noExtend.indexOf(key) < 0);
      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        const nextKey = keysArray[nextIndex];
        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== void 0 && desc.enumerable) {
          if (isObject2(to3[nextKey]) && isObject2(nextSource[nextKey])) {
            if (nextSource[nextKey].__swiper__) {
              to3[nextKey] = nextSource[nextKey];
            } else {
              extend2(to3[nextKey], nextSource[nextKey]);
            }
          } else if (!isObject2(to3[nextKey]) && isObject2(nextSource[nextKey])) {
            to3[nextKey] = {};
            if (nextSource[nextKey].__swiper__) {
              to3[nextKey] = nextSource[nextKey];
            } else {
              extend2(to3[nextKey], nextSource[nextKey]);
            }
          } else {
            to3[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to3;
}
function setCSSProperty(el3, varName, varValue) {
  el3.style.setProperty(varName, varValue);
}
function animateCSSModeScroll(_ref) {
  let {
    swiper,
    targetPosition,
    side
  } = _ref;
  const window2 = getWindow();
  const startPosition = -swiper.translate;
  let startTime = null;
  let time;
  const duration = swiper.params.speed;
  swiper.wrapperEl.style.scrollSnapType = "none";
  window2.cancelAnimationFrame(swiper.cssModeFrameID);
  const dir = targetPosition > startPosition ? "next" : "prev";
  const isOutOfBound = (current, target) => {
    return dir === "next" && current >= target || dir === "prev" && current <= target;
  };
  const animate = () => {
    time = (/* @__PURE__ */ new Date()).getTime();
    if (startTime === null) {
      startTime = time;
    }
    const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
    const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
    let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
    if (isOutOfBound(currentPosition, targetPosition)) {
      currentPosition = targetPosition;
    }
    swiper.wrapperEl.scrollTo({
      [side]: currentPosition
    });
    if (isOutOfBound(currentPosition, targetPosition)) {
      swiper.wrapperEl.style.overflow = "hidden";
      swiper.wrapperEl.style.scrollSnapType = "";
      setTimeout(() => {
        swiper.wrapperEl.style.overflow = "";
        swiper.wrapperEl.scrollTo({
          [side]: currentPosition
        });
      });
      window2.cancelAnimationFrame(swiper.cssModeFrameID);
      return;
    }
    swiper.cssModeFrameID = window2.requestAnimationFrame(animate);
  };
  animate();
}
function getSlideTransformEl(slideEl) {
  return slideEl.querySelector(".swiper-slide-transform") || slideEl.shadowRoot && slideEl.shadowRoot.querySelector(".swiper-slide-transform") || slideEl;
}
function elementChildren(element, selector) {
  if (selector === void 0) {
    selector = "";
  }
  return [...element.children].filter((el3) => el3.matches(selector));
}
function createElement(tag, classes2) {
  if (classes2 === void 0) {
    classes2 = [];
  }
  const el3 = document.createElement(tag);
  el3.classList.add(...Array.isArray(classes2) ? classes2 : [classes2]);
  return el3;
}
function elementPrevAll(el3, selector) {
  const prevEls = [];
  while (el3.previousElementSibling) {
    const prev = el3.previousElementSibling;
    if (selector) {
      if (prev.matches(selector))
        prevEls.push(prev);
    } else
      prevEls.push(prev);
    el3 = prev;
  }
  return prevEls;
}
function elementNextAll(el3, selector) {
  const nextEls = [];
  while (el3.nextElementSibling) {
    const next = el3.nextElementSibling;
    if (selector) {
      if (next.matches(selector))
        nextEls.push(next);
    } else
      nextEls.push(next);
    el3 = next;
  }
  return nextEls;
}
function elementStyle(el3, prop) {
  const window2 = getWindow();
  return window2.getComputedStyle(el3, null).getPropertyValue(prop);
}
function elementIndex(el3) {
  let child = el3;
  let i3;
  if (child) {
    i3 = 0;
    while ((child = child.previousSibling) !== null) {
      if (child.nodeType === 1)
        i3 += 1;
    }
    return i3;
  }
  return void 0;
}
function elementParents(el3, selector) {
  const parents = [];
  let parent = el3.parentElement;
  while (parent) {
    if (selector) {
      if (parent.matches(selector))
        parents.push(parent);
    } else {
      parents.push(parent);
    }
    parent = parent.parentElement;
  }
  return parents;
}
function elementTransitionEnd(el3, callback) {
  function fireCallBack(e3) {
    if (e3.target !== el3)
      return;
    callback.call(el3, e3);
    el3.removeEventListener("transitionend", fireCallBack);
  }
  if (callback) {
    el3.addEventListener("transitionend", fireCallBack);
  }
}
function elementOuterSize(el3, size, includeMargins) {
  const window2 = getWindow();
  if (includeMargins) {
    return el3[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window2.getComputedStyle(el3, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window2.getComputedStyle(el3, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
  }
  return el3.offsetWidth;
}

// node_modules/.pnpm/swiper@10.2.0/node_modules/swiper/shared/swiper-core.mjs
var support;
function calcSupport() {
  const window2 = getWindow();
  const document2 = getDocument();
  return {
    smoothScroll: document2.documentElement && document2.documentElement.style && "scrollBehavior" in document2.documentElement.style,
    touch: !!("ontouchstart" in window2 || window2.DocumentTouch && document2 instanceof window2.DocumentTouch)
  };
}
function getSupport() {
  if (!support) {
    support = calcSupport();
  }
  return support;
}
var deviceCached;
function calcDevice(_temp) {
  let {
    userAgent
  } = _temp === void 0 ? {} : _temp;
  const support2 = getSupport();
  const window2 = getWindow();
  const platform = window2.navigator.platform;
  const ua3 = userAgent || window2.navigator.userAgent;
  const device = {
    ios: false,
    android: false
  };
  const screenWidth = window2.screen.width;
  const screenHeight = window2.screen.height;
  const android = ua3.match(/(Android);?[\s\/]+([\d.]+)?/);
  let ipad = ua3.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua3.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua3.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  const windows = platform === "Win32";
  let macos = platform === "MacIntel";
  const iPadScreens = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  if (!ipad && macos && support2.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
    ipad = ua3.match(/(Version)\/([\d.]+)/);
    if (!ipad)
      ipad = [0, 1, "13_0_0"];
    macos = false;
  }
  if (android && !windows) {
    device.os = "android";
    device.android = true;
  }
  if (ipad || iphone || ipod) {
    device.os = "ios";
    device.ios = true;
  }
  return device;
}
function getDevice(overrides) {
  if (overrides === void 0) {
    overrides = {};
  }
  if (!deviceCached) {
    deviceCached = calcDevice(overrides);
  }
  return deviceCached;
}
var browser;
function calcBrowser() {
  const window2 = getWindow();
  let needPerspectiveFix = false;
  function isSafari() {
    const ua3 = window2.navigator.userAgent.toLowerCase();
    return ua3.indexOf("safari") >= 0 && ua3.indexOf("chrome") < 0 && ua3.indexOf("android") < 0;
  }
  if (isSafari()) {
    const ua3 = String(window2.navigator.userAgent);
    if (ua3.includes("Version/")) {
      const [major, minor] = ua3.split("Version/")[1].split(" ")[0].split(".").map((num) => Number(num));
      needPerspectiveFix = major < 16 || major === 16 && minor < 2;
    }
  }
  return {
    isSafari: needPerspectiveFix || isSafari(),
    needPerspectiveFix,
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window2.navigator.userAgent)
  };
}
function getBrowser() {
  if (!browser) {
    browser = calcBrowser();
  }
  return browser;
}
function Resize(_ref) {
  let {
    swiper,
    on: on3,
    emit
  } = _ref;
  const window2 = getWindow();
  let observer = null;
  let animationFrame = null;
  const resizeHandler = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized)
      return;
    emit("beforeResize");
    emit("resize");
  };
  const createObserver = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized)
      return;
    observer = new ResizeObserver((entries) => {
      animationFrame = window2.requestAnimationFrame(() => {
        const {
          width,
          height
        } = swiper;
        let newWidth = width;
        let newHeight = height;
        entries.forEach((_ref2) => {
          let {
            contentBoxSize,
            contentRect,
            target
          } = _ref2;
          if (target && target !== swiper.el)
            return;
          newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
          newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
        });
        if (newWidth !== width || newHeight !== height) {
          resizeHandler();
        }
      });
    });
    observer.observe(swiper.el);
  };
  const removeObserver = () => {
    if (animationFrame) {
      window2.cancelAnimationFrame(animationFrame);
    }
    if (observer && observer.unobserve && swiper.el) {
      observer.unobserve(swiper.el);
      observer = null;
    }
  };
  const orientationChangeHandler = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized)
      return;
    emit("orientationchange");
  };
  on3("init", () => {
    if (swiper.params.resizeObserver && typeof window2.ResizeObserver !== "undefined") {
      createObserver();
      return;
    }
    window2.addEventListener("resize", resizeHandler);
    window2.addEventListener("orientationchange", orientationChangeHandler);
  });
  on3("destroy", () => {
    removeObserver();
    window2.removeEventListener("resize", resizeHandler);
    window2.removeEventListener("orientationchange", orientationChangeHandler);
  });
}
function Observer(_ref) {
  let {
    swiper,
    extendParams,
    on: on3,
    emit
  } = _ref;
  const observers = [];
  const window2 = getWindow();
  const attach = function(target, options) {
    if (options === void 0) {
      options = {};
    }
    const ObserverFunc = window2.MutationObserver || window2.WebkitMutationObserver;
    const observer = new ObserverFunc((mutations) => {
      if (swiper.__preventObserver__)
        return;
      if (mutations.length === 1) {
        emit("observerUpdate", mutations[0]);
        return;
      }
      const observerUpdate = function observerUpdate2() {
        emit("observerUpdate", mutations[0]);
      };
      if (window2.requestAnimationFrame) {
        window2.requestAnimationFrame(observerUpdate);
      } else {
        window2.setTimeout(observerUpdate, 0);
      }
    });
    observer.observe(target, {
      attributes: typeof options.attributes === "undefined" ? true : options.attributes,
      childList: typeof options.childList === "undefined" ? true : options.childList,
      characterData: typeof options.characterData === "undefined" ? true : options.characterData
    });
    observers.push(observer);
  };
  const init = () => {
    if (!swiper.params.observer)
      return;
    if (swiper.params.observeParents) {
      const containerParents = elementParents(swiper.hostEl);
      for (let i3 = 0; i3 < containerParents.length; i3 += 1) {
        attach(containerParents[i3]);
      }
    }
    attach(swiper.hostEl, {
      childList: swiper.params.observeSlideChildren
    });
    attach(swiper.wrapperEl, {
      attributes: false
    });
  };
  const destroy = () => {
    observers.forEach((observer) => {
      observer.disconnect();
    });
    observers.splice(0, observers.length);
  };
  extendParams({
    observer: false,
    observeParents: false,
    observeSlideChildren: false
  });
  on3("init", init);
  on3("destroy", destroy);
}
var eventsEmitter = {
  on(events2, handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (typeof handler !== "function")
      return self;
    const method = priority ? "unshift" : "push";
    events2.split(" ").forEach((event2) => {
      if (!self.eventsListeners[event2])
        self.eventsListeners[event2] = [];
      self.eventsListeners[event2][method](handler);
    });
    return self;
  },
  once(events2, handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (typeof handler !== "function")
      return self;
    function onceHandler() {
      self.off(events2, onceHandler);
      if (onceHandler.__emitterProxy) {
        delete onceHandler.__emitterProxy;
      }
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      handler.apply(self, args);
    }
    onceHandler.__emitterProxy = handler;
    return self.on(events2, onceHandler, priority);
  },
  onAny(handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (typeof handler !== "function")
      return self;
    const method = priority ? "unshift" : "push";
    if (self.eventsAnyListeners.indexOf(handler) < 0) {
      self.eventsAnyListeners[method](handler);
    }
    return self;
  },
  offAny(handler) {
    const self = this;
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (!self.eventsAnyListeners)
      return self;
    const index = self.eventsAnyListeners.indexOf(handler);
    if (index >= 0) {
      self.eventsAnyListeners.splice(index, 1);
    }
    return self;
  },
  off(events2, handler) {
    const self = this;
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (!self.eventsListeners)
      return self;
    events2.split(" ").forEach((event2) => {
      if (typeof handler === "undefined") {
        self.eventsListeners[event2] = [];
      } else if (self.eventsListeners[event2]) {
        self.eventsListeners[event2].forEach((eventHandler, index) => {
          if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
            self.eventsListeners[event2].splice(index, 1);
          }
        });
      }
    });
    return self;
  },
  emit() {
    const self = this;
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (!self.eventsListeners)
      return self;
    let events2;
    let data;
    let context;
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    if (typeof args[0] === "string" || Array.isArray(args[0])) {
      events2 = args[0];
      data = args.slice(1, args.length);
      context = self;
    } else {
      events2 = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
    }
    data.unshift(context);
    const eventsArray = Array.isArray(events2) ? events2 : events2.split(" ");
    eventsArray.forEach((event2) => {
      if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
        self.eventsAnyListeners.forEach((eventHandler) => {
          eventHandler.apply(context, [event2, ...data]);
        });
      }
      if (self.eventsListeners && self.eventsListeners[event2]) {
        self.eventsListeners[event2].forEach((eventHandler) => {
          eventHandler.apply(context, data);
        });
      }
    });
    return self;
  }
};
function updateSize() {
  const swiper = this;
  let width;
  let height;
  const el3 = swiper.el;
  if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) {
    width = swiper.params.width;
  } else {
    width = el3.clientWidth;
  }
  if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) {
    height = swiper.params.height;
  } else {
    height = el3.clientHeight;
  }
  if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
    return;
  }
  width = width - parseInt(elementStyle(el3, "padding-left") || 0, 10) - parseInt(elementStyle(el3, "padding-right") || 0, 10);
  height = height - parseInt(elementStyle(el3, "padding-top") || 0, 10) - parseInt(elementStyle(el3, "padding-bottom") || 0, 10);
  if (Number.isNaN(width))
    width = 0;
  if (Number.isNaN(height))
    height = 0;
  Object.assign(swiper, {
    width,
    height,
    size: swiper.isHorizontal() ? width : height
  });
}
function updateSlides() {
  const swiper = this;
  function getDirectionLabel(property) {
    if (swiper.isHorizontal()) {
      return property;
    }
    return {
      "width": "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      "marginRight": "marginBottom"
    }[property];
  }
  function getDirectionPropertyValue(node, label) {
    return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
  }
  const params = swiper.params;
  const {
    wrapperEl,
    slidesEl,
    size: swiperSize,
    rtlTranslate: rtl,
    wrongRTL
  } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
  const slides = elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
  const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
  let snapGrid = [];
  const slidesGrid = [];
  const slidesSizesGrid = [];
  let offsetBefore = params.slidesOffsetBefore;
  if (typeof offsetBefore === "function") {
    offsetBefore = params.slidesOffsetBefore.call(swiper);
  }
  let offsetAfter = params.slidesOffsetAfter;
  if (typeof offsetAfter === "function") {
    offsetAfter = params.slidesOffsetAfter.call(swiper);
  }
  const previousSnapGridLength = swiper.snapGrid.length;
  const previousSlidesGridLength = swiper.slidesGrid.length;
  let spaceBetween = params.spaceBetween;
  let slidePosition = -offsetBefore;
  let prevSlideSize = 0;
  let index = 0;
  if (typeof swiperSize === "undefined") {
    return;
  }
  if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
  } else if (typeof spaceBetween === "string") {
    spaceBetween = parseFloat(spaceBetween);
  }
  swiper.virtualSize = -spaceBetween;
  slides.forEach((slideEl) => {
    if (rtl) {
      slideEl.style.marginLeft = "";
    } else {
      slideEl.style.marginRight = "";
    }
    slideEl.style.marginBottom = "";
    slideEl.style.marginTop = "";
  });
  if (params.centeredSlides && params.cssMode) {
    setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
    setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
  }
  const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
  if (gridEnabled) {
    swiper.grid.initSlides(slidesLength);
  }
  let slideSize;
  const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key) => {
    return typeof params.breakpoints[key].slidesPerView !== "undefined";
  }).length > 0;
  for (let i3 = 0; i3 < slidesLength; i3 += 1) {
    slideSize = 0;
    let slide2;
    if (slides[i3])
      slide2 = slides[i3];
    if (gridEnabled) {
      swiper.grid.updateSlide(i3, slide2, slidesLength, getDirectionLabel);
    }
    if (slides[i3] && elementStyle(slide2, "display") === "none")
      continue;
    if (params.slidesPerView === "auto") {
      if (shouldResetSlideSize) {
        slides[i3].style[getDirectionLabel("width")] = ``;
      }
      const slideStyles = getComputedStyle(slide2);
      const currentTransform = slide2.style.transform;
      const currentWebKitTransform = slide2.style.webkitTransform;
      if (currentTransform) {
        slide2.style.transform = "none";
      }
      if (currentWebKitTransform) {
        slide2.style.webkitTransform = "none";
      }
      if (params.roundLengths) {
        slideSize = swiper.isHorizontal() ? elementOuterSize(slide2, "width", true) : elementOuterSize(slide2, "height", true);
      } else {
        const width = getDirectionPropertyValue(slideStyles, "width");
        const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
        const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
        const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
        const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
        const boxSizing = slideStyles.getPropertyValue("box-sizing");
        if (boxSizing && boxSizing === "border-box") {
          slideSize = width + marginLeft + marginRight;
        } else {
          const {
            clientWidth,
            offsetWidth
          } = slide2;
          slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
        }
      }
      if (currentTransform) {
        slide2.style.transform = currentTransform;
      }
      if (currentWebKitTransform) {
        slide2.style.webkitTransform = currentWebKitTransform;
      }
      if (params.roundLengths)
        slideSize = Math.floor(slideSize);
    } else {
      slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
      if (params.roundLengths)
        slideSize = Math.floor(slideSize);
      if (slides[i3]) {
        slides[i3].style[getDirectionLabel("width")] = `${slideSize}px`;
      }
    }
    if (slides[i3]) {
      slides[i3].swiperSlideSize = slideSize;
    }
    slidesSizesGrid.push(slideSize);
    if (params.centeredSlides) {
      slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
      if (prevSlideSize === 0 && i3 !== 0)
        slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (i3 === 0)
        slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (Math.abs(slidePosition) < 1 / 1e3)
        slidePosition = 0;
      if (params.roundLengths)
        slidePosition = Math.floor(slidePosition);
      if (index % params.slidesPerGroup === 0)
        snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
    } else {
      if (params.roundLengths)
        slidePosition = Math.floor(slidePosition);
      if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0)
        snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
      slidePosition = slidePosition + slideSize + spaceBetween;
    }
    swiper.virtualSize += slideSize + spaceBetween;
    prevSlideSize = slideSize;
    index += 1;
  }
  swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
  if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) {
    wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
  }
  if (params.setWrapperSize) {
    wrapperEl.style[getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
  }
  if (gridEnabled) {
    swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
  }
  if (!params.centeredSlides) {
    const newSlidesGrid = [];
    for (let i3 = 0; i3 < snapGrid.length; i3 += 1) {
      let slidesGridItem = snapGrid[i3];
      if (params.roundLengths)
        slidesGridItem = Math.floor(slidesGridItem);
      if (snapGrid[i3] <= swiper.virtualSize - swiperSize) {
        newSlidesGrid.push(slidesGridItem);
      }
    }
    snapGrid = newSlidesGrid;
    if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
      snapGrid.push(swiper.virtualSize - swiperSize);
    }
  }
  if (isVirtual && params.loop) {
    const size = slidesSizesGrid[0] + spaceBetween;
    if (params.slidesPerGroup > 1) {
      const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
      const groupSize = size * params.slidesPerGroup;
      for (let i3 = 0; i3 < groups; i3 += 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
      }
    }
    for (let i3 = 0; i3 < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i3 += 1) {
      if (params.slidesPerGroup === 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + size);
      }
      slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
      swiper.virtualSize += size;
    }
  }
  if (snapGrid.length === 0)
    snapGrid = [0];
  if (spaceBetween !== 0) {
    const key = swiper.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
    slides.filter((_, slideIndex) => {
      if (!params.cssMode || params.loop)
        return true;
      if (slideIndex === slides.length - 1) {
        return false;
      }
      return true;
    }).forEach((slideEl) => {
      slideEl.style[key] = `${spaceBetween}px`;
    });
  }
  if (params.centeredSlides && params.centeredSlidesBounds) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach((slideSizeValue) => {
      allSlidesSize += slideSizeValue + (spaceBetween || 0);
    });
    allSlidesSize -= spaceBetween;
    const maxSnap = allSlidesSize - swiperSize;
    snapGrid = snapGrid.map((snap) => {
      if (snap <= 0)
        return -offsetBefore;
      if (snap > maxSnap)
        return maxSnap + offsetAfter;
      return snap;
    });
  }
  if (params.centerInsufficientSlides) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach((slideSizeValue) => {
      allSlidesSize += slideSizeValue + (spaceBetween || 0);
    });
    allSlidesSize -= spaceBetween;
    if (allSlidesSize < swiperSize) {
      const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
      snapGrid.forEach((snap, snapIndex) => {
        snapGrid[snapIndex] = snap - allSlidesOffset;
      });
      slidesGrid.forEach((snap, snapIndex) => {
        slidesGrid[snapIndex] = snap + allSlidesOffset;
      });
    }
  }
  Object.assign(swiper, {
    slides,
    snapGrid,
    slidesGrid,
    slidesSizesGrid
  });
  if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
    setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
    setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
    const addToSnapGrid = -swiper.snapGrid[0];
    const addToSlidesGrid = -swiper.slidesGrid[0];
    swiper.snapGrid = swiper.snapGrid.map((v) => v + addToSnapGrid);
    swiper.slidesGrid = swiper.slidesGrid.map((v) => v + addToSlidesGrid);
  }
  if (slidesLength !== previousSlidesLength) {
    swiper.emit("slidesLengthChange");
  }
  if (snapGrid.length !== previousSnapGridLength) {
    if (swiper.params.watchOverflow)
      swiper.checkOverflow();
    swiper.emit("snapGridLengthChange");
  }
  if (slidesGrid.length !== previousSlidesGridLength) {
    swiper.emit("slidesGridLengthChange");
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
    const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
    const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
    if (slidesLength <= params.maxBackfaceHiddenSlides) {
      if (!hasClassBackfaceClassAdded)
        swiper.el.classList.add(backFaceHiddenClass);
    } else if (hasClassBackfaceClassAdded) {
      swiper.el.classList.remove(backFaceHiddenClass);
    }
  }
}
function updateAutoHeight(speed) {
  const swiper = this;
  const activeSlides = [];
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  let newHeight = 0;
  let i3;
  if (typeof speed === "number") {
    swiper.setTransition(speed);
  } else if (speed === true) {
    swiper.setTransition(swiper.params.speed);
  }
  const getSlideByIndex = (index) => {
    if (isVirtual) {
      return swiper.slides[swiper.getSlideIndexByData(index)];
    }
    return swiper.slides[index];
  };
  if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) {
    if (swiper.params.centeredSlides) {
      (swiper.visibleSlides || []).forEach((slide2) => {
        activeSlides.push(slide2);
      });
    } else {
      for (i3 = 0; i3 < Math.ceil(swiper.params.slidesPerView); i3 += 1) {
        const index = swiper.activeIndex + i3;
        if (index > swiper.slides.length && !isVirtual)
          break;
        activeSlides.push(getSlideByIndex(index));
      }
    }
  } else {
    activeSlides.push(getSlideByIndex(swiper.activeIndex));
  }
  for (i3 = 0; i3 < activeSlides.length; i3 += 1) {
    if (typeof activeSlides[i3] !== "undefined") {
      const height = activeSlides[i3].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  }
  if (newHeight || newHeight === 0)
    swiper.wrapperEl.style.height = `${newHeight}px`;
}
function updateSlidesOffset() {
  const swiper = this;
  const slides = swiper.slides;
  const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
  for (let i3 = 0; i3 < slides.length; i3 += 1) {
    slides[i3].swiperSlideOffset = (swiper.isHorizontal() ? slides[i3].offsetLeft : slides[i3].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
  }
}
function updateSlidesProgress(translate2) {
  if (translate2 === void 0) {
    translate2 = this && this.translate || 0;
  }
  const swiper = this;
  const params = swiper.params;
  const {
    slides,
    rtlTranslate: rtl,
    snapGrid
  } = swiper;
  if (slides.length === 0)
    return;
  if (typeof slides[0].swiperSlideOffset === "undefined")
    swiper.updateSlidesOffset();
  let offsetCenter = -translate2;
  if (rtl)
    offsetCenter = translate2;
  slides.forEach((slideEl) => {
    slideEl.classList.remove(params.slideVisibleClass);
  });
  swiper.visibleSlidesIndexes = [];
  swiper.visibleSlides = [];
  let spaceBetween = params.spaceBetween;
  if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size;
  } else if (typeof spaceBetween === "string") {
    spaceBetween = parseFloat(spaceBetween);
  }
  for (let i3 = 0; i3 < slides.length; i3 += 1) {
    const slide2 = slides[i3];
    let slideOffset = slide2.swiperSlideOffset;
    if (params.cssMode && params.centeredSlides) {
      slideOffset -= slides[0].swiperSlideOffset;
    }
    const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
    const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
    const slideBefore = -(offsetCenter - slideOffset);
    const slideAfter = slideBefore + swiper.slidesSizesGrid[i3];
    const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
    if (isVisible) {
      swiper.visibleSlides.push(slide2);
      swiper.visibleSlidesIndexes.push(i3);
      slides[i3].classList.add(params.slideVisibleClass);
    }
    slide2.progress = rtl ? -slideProgress : slideProgress;
    slide2.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
  }
}
function updateProgress(translate2) {
  const swiper = this;
  if (typeof translate2 === "undefined") {
    const multiplier = swiper.rtlTranslate ? -1 : 1;
    translate2 = swiper && swiper.translate && swiper.translate * multiplier || 0;
  }
  const params = swiper.params;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  let {
    progress,
    isBeginning,
    isEnd,
    progressLoop
  } = swiper;
  const wasBeginning = isBeginning;
  const wasEnd = isEnd;
  if (translatesDiff === 0) {
    progress = 0;
    isBeginning = true;
    isEnd = true;
  } else {
    progress = (translate2 - swiper.minTranslate()) / translatesDiff;
    const isBeginningRounded = Math.abs(translate2 - swiper.minTranslate()) < 1;
    const isEndRounded = Math.abs(translate2 - swiper.maxTranslate()) < 1;
    isBeginning = isBeginningRounded || progress <= 0;
    isEnd = isEndRounded || progress >= 1;
    if (isBeginningRounded)
      progress = 0;
    if (isEndRounded)
      progress = 1;
  }
  if (params.loop) {
    const firstSlideIndex = swiper.getSlideIndexByData(0);
    const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
    const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
    const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
    const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
    const translateAbs = Math.abs(translate2);
    if (translateAbs >= firstSlideTranslate) {
      progressLoop = (translateAbs - firstSlideTranslate) / translateMax;
    } else {
      progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
    }
    if (progressLoop > 1)
      progressLoop -= 1;
  }
  Object.assign(swiper, {
    progress,
    progressLoop,
    isBeginning,
    isEnd
  });
  if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight)
    swiper.updateSlidesProgress(translate2);
  if (isBeginning && !wasBeginning) {
    swiper.emit("reachBeginning toEdge");
  }
  if (isEnd && !wasEnd) {
    swiper.emit("reachEnd toEdge");
  }
  if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
    swiper.emit("fromEdge");
  }
  swiper.emit("progress", progress);
}
function updateSlidesClasses() {
  const swiper = this;
  const {
    slides,
    params,
    slidesEl,
    activeIndex
  } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  const getFilteredSlide = (selector) => {
    return elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
  };
  slides.forEach((slideEl) => {
    slideEl.classList.remove(params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
  });
  let activeSlide;
  if (isVirtual) {
    if (params.loop) {
      let slideIndex = activeIndex - swiper.virtual.slidesBefore;
      if (slideIndex < 0)
        slideIndex = swiper.virtual.slides.length + slideIndex;
      if (slideIndex >= swiper.virtual.slides.length)
        slideIndex -= swiper.virtual.slides.length;
      activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
    } else {
      activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`);
    }
  } else {
    activeSlide = slides[activeIndex];
  }
  if (activeSlide) {
    activeSlide.classList.add(params.slideActiveClass);
    let nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
    if (params.loop && !nextSlide) {
      nextSlide = slides[0];
    }
    if (nextSlide) {
      nextSlide.classList.add(params.slideNextClass);
    }
    let prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
    if (params.loop && !prevSlide === 0) {
      prevSlide = slides[slides.length - 1];
    }
    if (prevSlide) {
      prevSlide.classList.add(params.slidePrevClass);
    }
  }
  swiper.emitSlidesClasses();
}
var processLazyPreloader = (swiper, imageEl) => {
  if (!swiper || swiper.destroyed || !swiper.params)
    return;
  const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
  const slideEl = imageEl.closest(slideSelector());
  if (slideEl) {
    let lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
    if (!lazyEl && swiper.isElement) {
      lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
    }
    if (lazyEl)
      lazyEl.remove();
  }
};
var unlazy = (swiper, index) => {
  if (!swiper.slides[index])
    return;
  const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
  if (imageEl)
    imageEl.removeAttribute("loading");
};
var preload = (swiper) => {
  if (!swiper || swiper.destroyed || !swiper.params)
    return;
  let amount = swiper.params.lazyPreloadPrevNext;
  const len = swiper.slides.length;
  if (!len || !amount || amount < 0)
    return;
  amount = Math.min(amount, len);
  const slidesPerView = swiper.params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
  const activeIndex = swiper.activeIndex;
  if (swiper.params.grid && swiper.params.grid.rows > 1) {
    const activeColumn = activeIndex;
    const preloadColumns = [activeColumn - amount];
    preloadColumns.push(...Array.from({
      length: amount
    }).map((_, i3) => {
      return activeColumn + slidesPerView + i3;
    }));
    swiper.slides.forEach((slideEl, i3) => {
      if (preloadColumns.includes(slideEl.column))
        unlazy(swiper, i3);
    });
    return;
  }
  const slideIndexLastInView = activeIndex + slidesPerView - 1;
  if (swiper.params.rewind || swiper.params.loop) {
    for (let i3 = activeIndex - amount; i3 <= slideIndexLastInView + amount; i3 += 1) {
      const realIndex = (i3 % len + len) % len;
      if (realIndex < activeIndex || realIndex > slideIndexLastInView)
        unlazy(swiper, realIndex);
    }
  } else {
    for (let i3 = Math.max(activeIndex - amount, 0); i3 <= Math.min(slideIndexLastInView + amount, len - 1); i3 += 1) {
      if (i3 !== activeIndex && (i3 > slideIndexLastInView || i3 < activeIndex)) {
        unlazy(swiper, i3);
      }
    }
  }
};
function getActiveIndexByTranslate(swiper) {
  const {
    slidesGrid,
    params
  } = swiper;
  const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  let activeIndex;
  for (let i3 = 0; i3 < slidesGrid.length; i3 += 1) {
    if (typeof slidesGrid[i3 + 1] !== "undefined") {
      if (translate2 >= slidesGrid[i3] && translate2 < slidesGrid[i3 + 1] - (slidesGrid[i3 + 1] - slidesGrid[i3]) / 2) {
        activeIndex = i3;
      } else if (translate2 >= slidesGrid[i3] && translate2 < slidesGrid[i3 + 1]) {
        activeIndex = i3 + 1;
      }
    } else if (translate2 >= slidesGrid[i3]) {
      activeIndex = i3;
    }
  }
  if (params.normalizeSlideIndex) {
    if (activeIndex < 0 || typeof activeIndex === "undefined")
      activeIndex = 0;
  }
  return activeIndex;
}
function updateActiveIndex(newActiveIndex) {
  const swiper = this;
  const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  const {
    snapGrid,
    params,
    activeIndex: previousIndex,
    realIndex: previousRealIndex,
    snapIndex: previousSnapIndex
  } = swiper;
  let activeIndex = newActiveIndex;
  let snapIndex;
  const getVirtualRealIndex = (aIndex) => {
    let realIndex2 = aIndex - swiper.virtual.slidesBefore;
    if (realIndex2 < 0) {
      realIndex2 = swiper.virtual.slides.length + realIndex2;
    }
    if (realIndex2 >= swiper.virtual.slides.length) {
      realIndex2 -= swiper.virtual.slides.length;
    }
    return realIndex2;
  };
  if (typeof activeIndex === "undefined") {
    activeIndex = getActiveIndexByTranslate(swiper);
  }
  if (snapGrid.indexOf(translate2) >= 0) {
    snapIndex = snapGrid.indexOf(translate2);
  } else {
    const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
    snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
  }
  if (snapIndex >= snapGrid.length)
    snapIndex = snapGrid.length - 1;
  if (activeIndex === previousIndex) {
    if (snapIndex !== previousSnapIndex) {
      swiper.snapIndex = snapIndex;
      swiper.emit("snapIndexChange");
    }
    if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
      swiper.realIndex = getVirtualRealIndex(activeIndex);
    }
    return;
  }
  let realIndex;
  if (swiper.virtual && params.virtual.enabled && params.loop) {
    realIndex = getVirtualRealIndex(activeIndex);
  } else if (swiper.slides[activeIndex]) {
    realIndex = parseInt(swiper.slides[activeIndex].getAttribute("data-swiper-slide-index") || activeIndex, 10);
  } else {
    realIndex = activeIndex;
  }
  Object.assign(swiper, {
    previousSnapIndex,
    snapIndex,
    previousRealIndex,
    realIndex,
    previousIndex,
    activeIndex
  });
  if (swiper.initialized) {
    preload(swiper);
  }
  swiper.emit("activeIndexChange");
  swiper.emit("snapIndexChange");
  if (previousRealIndex !== realIndex) {
    swiper.emit("realIndexChange");
  }
  if (swiper.initialized || swiper.params.runCallbacksOnInit) {
    swiper.emit("slideChange");
  }
}
function updateClickedSlide(e3) {
  const swiper = this;
  const params = swiper.params;
  const slide2 = e3.closest(`.${params.slideClass}, swiper-slide`);
  let slideFound = false;
  let slideIndex;
  if (slide2) {
    for (let i3 = 0; i3 < swiper.slides.length; i3 += 1) {
      if (swiper.slides[i3] === slide2) {
        slideFound = true;
        slideIndex = i3;
        break;
      }
    }
  }
  if (slide2 && slideFound) {
    swiper.clickedSlide = slide2;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      swiper.clickedIndex = parseInt(slide2.getAttribute("data-swiper-slide-index"), 10);
    } else {
      swiper.clickedIndex = slideIndex;
    }
  } else {
    swiper.clickedSlide = void 0;
    swiper.clickedIndex = void 0;
    return;
  }
  if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) {
    swiper.slideToClickedSlide();
  }
}
var update = {
  updateSize,
  updateSlides,
  updateAutoHeight,
  updateSlidesOffset,
  updateSlidesProgress,
  updateProgress,
  updateSlidesClasses,
  updateActiveIndex,
  updateClickedSlide
};
function getSwiperTranslate(axis) {
  if (axis === void 0) {
    axis = this.isHorizontal() ? "x" : "y";
  }
  const swiper = this;
  const {
    params,
    rtlTranslate: rtl,
    translate: translate2,
    wrapperEl
  } = swiper;
  if (params.virtualTranslate) {
    return rtl ? -translate2 : translate2;
  }
  if (params.cssMode) {
    return translate2;
  }
  let currentTranslate = getTranslate(wrapperEl, axis);
  currentTranslate += swiper.cssOverflowAdjustment();
  if (rtl)
    currentTranslate = -currentTranslate;
  return currentTranslate || 0;
}
function setTranslate(translate2, byController) {
  const swiper = this;
  const {
    rtlTranslate: rtl,
    params,
    wrapperEl,
    progress
  } = swiper;
  let x3 = 0;
  let y3 = 0;
  const z3 = 0;
  if (swiper.isHorizontal()) {
    x3 = rtl ? -translate2 : translate2;
  } else {
    y3 = translate2;
  }
  if (params.roundLengths) {
    x3 = Math.floor(x3);
    y3 = Math.floor(y3);
  }
  swiper.previousTranslate = swiper.translate;
  swiper.translate = swiper.isHorizontal() ? x3 : y3;
  if (params.cssMode) {
    wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x3 : -y3;
  } else if (!params.virtualTranslate) {
    if (swiper.isHorizontal()) {
      x3 -= swiper.cssOverflowAdjustment();
    } else {
      y3 -= swiper.cssOverflowAdjustment();
    }
    wrapperEl.style.transform = `translate3d(${x3}px, ${y3}px, ${z3}px)`;
  }
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate2 - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== progress) {
    swiper.updateProgress(translate2);
  }
  swiper.emit("setTranslate", swiper.translate, byController);
}
function minTranslate() {
  return -this.snapGrid[0];
}
function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function translateTo(translate2, speed, runCallbacks, translateBounds, internal) {
  if (translate2 === void 0) {
    translate2 = 0;
  }
  if (speed === void 0) {
    speed = this.params.speed;
  }
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  if (translateBounds === void 0) {
    translateBounds = true;
  }
  const swiper = this;
  const {
    params,
    wrapperEl
  } = swiper;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }
  const minTranslate2 = swiper.minTranslate();
  const maxTranslate2 = swiper.maxTranslate();
  let newTranslate;
  if (translateBounds && translate2 > minTranslate2)
    newTranslate = minTranslate2;
  else if (translateBounds && translate2 < maxTranslate2)
    newTranslate = maxTranslate2;
  else
    newTranslate = translate2;
  swiper.updateProgress(newTranslate);
  if (params.cssMode) {
    const isH = swiper.isHorizontal();
    if (speed === 0) {
      wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
    } else {
      if (!swiper.support.smoothScroll) {
        animateCSSModeScroll({
          swiper,
          targetPosition: -newTranslate,
          side: isH ? "left" : "top"
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? "left" : "top"]: -newTranslate,
        behavior: "smooth"
      });
    }
    return true;
  }
  if (speed === 0) {
    swiper.setTransition(0);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit("beforeTransitionStart", speed, internal);
      swiper.emit("transitionEnd");
    }
  } else {
    swiper.setTransition(speed);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit("beforeTransitionStart", speed, internal);
      swiper.emit("transitionStart");
    }
    if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onTranslateToWrapperTransitionEnd) {
        swiper.onTranslateToWrapperTransitionEnd = function transitionEnd2(e3) {
          if (!swiper || swiper.destroyed)
            return;
          if (e3.target !== this)
            return;
          swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
          swiper.onTranslateToWrapperTransitionEnd = null;
          delete swiper.onTranslateToWrapperTransitionEnd;
          if (runCallbacks) {
            swiper.emit("transitionEnd");
          }
        };
      }
      swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
    }
  }
  return true;
}
var translate = {
  getTranslate: getSwiperTranslate,
  setTranslate,
  minTranslate,
  maxTranslate,
  translateTo
};
function setTransition(duration, byController) {
  const swiper = this;
  if (!swiper.params.cssMode) {
    swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
    swiper.wrapperEl.style.transitionDelay = duration === 0 ? `0ms` : "";
  }
  swiper.emit("setTransition", duration, byController);
}
function transitionEmit(_ref) {
  let {
    swiper,
    runCallbacks,
    direction,
    step
  } = _ref;
  const {
    activeIndex,
    previousIndex
  } = swiper;
  let dir = direction;
  if (!dir) {
    if (activeIndex > previousIndex)
      dir = "next";
    else if (activeIndex < previousIndex)
      dir = "prev";
    else
      dir = "reset";
  }
  swiper.emit(`transition${step}`);
  if (runCallbacks && activeIndex !== previousIndex) {
    if (dir === "reset") {
      swiper.emit(`slideResetTransition${step}`);
      return;
    }
    swiper.emit(`slideChangeTransition${step}`);
    if (dir === "next") {
      swiper.emit(`slideNextTransition${step}`);
    } else {
      swiper.emit(`slidePrevTransition${step}`);
    }
  }
}
function transitionStart(runCallbacks, direction) {
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  const swiper = this;
  const {
    params
  } = swiper;
  if (params.cssMode)
    return;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }
  transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: "Start"
  });
}
function transitionEnd(runCallbacks, direction) {
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  const swiper = this;
  const {
    params
  } = swiper;
  swiper.animating = false;
  if (params.cssMode)
    return;
  swiper.setTransition(0);
  transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: "End"
  });
}
var transition = {
  setTransition,
  transitionStart,
  transitionEnd
};
function slideTo(index, speed, runCallbacks, internal, initial) {
  if (index === void 0) {
    index = 0;
  }
  if (speed === void 0) {
    speed = this.params.speed;
  }
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  if (typeof index === "string") {
    index = parseInt(index, 10);
  }
  const swiper = this;
  let slideIndex = index;
  if (slideIndex < 0)
    slideIndex = 0;
  const {
    params,
    snapGrid,
    slidesGrid,
    previousIndex,
    activeIndex,
    rtlTranslate: rtl,
    wrapperEl,
    enabled
  } = swiper;
  if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {
    return false;
  }
  const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
  let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
  if (snapIndex >= snapGrid.length)
    snapIndex = snapGrid.length - 1;
  const translate2 = -snapGrid[snapIndex];
  if (params.normalizeSlideIndex) {
    for (let i3 = 0; i3 < slidesGrid.length; i3 += 1) {
      const normalizedTranslate = -Math.floor(translate2 * 100);
      const normalizedGrid = Math.floor(slidesGrid[i3] * 100);
      const normalizedGridNext = Math.floor(slidesGrid[i3 + 1] * 100);
      if (typeof slidesGrid[i3 + 1] !== "undefined") {
        if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
          slideIndex = i3;
        } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
          slideIndex = i3 + 1;
        }
      } else if (normalizedTranslate >= normalizedGrid) {
        slideIndex = i3;
      }
    }
  }
  if (swiper.initialized && slideIndex !== activeIndex) {
    if (!swiper.allowSlideNext && (rtl ? translate2 > swiper.translate && translate2 > swiper.minTranslate() : translate2 < swiper.translate && translate2 < swiper.minTranslate())) {
      return false;
    }
    if (!swiper.allowSlidePrev && translate2 > swiper.translate && translate2 > swiper.maxTranslate()) {
      if ((activeIndex || 0) !== slideIndex) {
        return false;
      }
    }
  }
  if (slideIndex !== (previousIndex || 0) && runCallbacks) {
    swiper.emit("beforeSlideChangeStart");
  }
  swiper.updateProgress(translate2);
  let direction;
  if (slideIndex > activeIndex)
    direction = "next";
  else if (slideIndex < activeIndex)
    direction = "prev";
  else
    direction = "reset";
  if (rtl && -translate2 === swiper.translate || !rtl && translate2 === swiper.translate) {
    swiper.updateActiveIndex(slideIndex);
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    swiper.updateSlidesClasses();
    if (params.effect !== "slide") {
      swiper.setTranslate(translate2);
    }
    if (direction !== "reset") {
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    }
    return false;
  }
  if (params.cssMode) {
    const isH = swiper.isHorizontal();
    const t3 = rtl ? translate2 : -translate2;
    if (speed === 0) {
      const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      if (isVirtual) {
        swiper.wrapperEl.style.scrollSnapType = "none";
        swiper._immediateVirtual = true;
      }
      if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
        swiper._cssModeVirtualInitialSet = true;
        requestAnimationFrame(() => {
          wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t3;
        });
      } else {
        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t3;
      }
      if (isVirtual) {
        requestAnimationFrame(() => {
          swiper.wrapperEl.style.scrollSnapType = "";
          swiper._immediateVirtual = false;
        });
      }
    } else {
      if (!swiper.support.smoothScroll) {
        animateCSSModeScroll({
          swiper,
          targetPosition: t3,
          side: isH ? "left" : "top"
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? "left" : "top"]: t3,
        behavior: "smooth"
      });
    }
    return true;
  }
  swiper.setTransition(speed);
  swiper.setTranslate(translate2);
  swiper.updateActiveIndex(slideIndex);
  swiper.updateSlidesClasses();
  swiper.emit("beforeTransitionStart", speed, internal);
  swiper.transitionStart(runCallbacks, direction);
  if (speed === 0) {
    swiper.transitionEnd(runCallbacks, direction);
  } else if (!swiper.animating) {
    swiper.animating = true;
    if (!swiper.onSlideToWrapperTransitionEnd) {
      swiper.onSlideToWrapperTransitionEnd = function transitionEnd2(e3) {
        if (!swiper || swiper.destroyed)
          return;
        if (e3.target !== this)
          return;
        swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
        swiper.onSlideToWrapperTransitionEnd = null;
        delete swiper.onSlideToWrapperTransitionEnd;
        swiper.transitionEnd(runCallbacks, direction);
      };
    }
    swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
  }
  return true;
}
function slideToLoop(index, speed, runCallbacks, internal) {
  if (index === void 0) {
    index = 0;
  }
  if (speed === void 0) {
    speed = this.params.speed;
  }
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  if (typeof index === "string") {
    const indexAsNumber = parseInt(index, 10);
    index = indexAsNumber;
  }
  const swiper = this;
  let newIndex = index;
  if (swiper.params.loop) {
    if (swiper.virtual && swiper.params.virtual.enabled) {
      newIndex = newIndex + swiper.virtual.slidesBefore;
    } else {
      newIndex = swiper.getSlideIndexByData(newIndex);
    }
  }
  return swiper.slideTo(newIndex, speed, runCallbacks, internal);
}
function slideNext(speed, runCallbacks, internal) {
  if (speed === void 0) {
    speed = this.params.speed;
  }
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  const swiper = this;
  const {
    enabled,
    params,
    animating
  } = swiper;
  if (!enabled)
    return swiper;
  let perGroup = params.slidesPerGroup;
  if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
    perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
  }
  const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding)
      return false;
    swiper.loopFix({
      direction: "next"
    });
    swiper._clientLeft = swiper.wrapperEl.clientLeft;
  }
  if (params.rewind && swiper.isEnd) {
    return swiper.slideTo(0, speed, runCallbacks, internal);
  }
  return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
}
function slidePrev(speed, runCallbacks, internal) {
  if (speed === void 0) {
    speed = this.params.speed;
  }
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  const swiper = this;
  const {
    params,
    snapGrid,
    slidesGrid,
    rtlTranslate,
    enabled,
    animating
  } = swiper;
  if (!enabled)
    return swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding)
      return false;
    swiper.loopFix({
      direction: "prev"
    });
    swiper._clientLeft = swiper.wrapperEl.clientLeft;
  }
  const translate2 = rtlTranslate ? swiper.translate : -swiper.translate;
  function normalize(val) {
    if (val < 0)
      return -Math.floor(Math.abs(val));
    return Math.floor(val);
  }
  const normalizedTranslate = normalize(translate2);
  const normalizedSnapGrid = snapGrid.map((val) => normalize(val));
  let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
  if (typeof prevSnap === "undefined" && params.cssMode) {
    let prevSnapIndex;
    snapGrid.forEach((snap, snapIndex) => {
      if (normalizedTranslate >= snap) {
        prevSnapIndex = snapIndex;
      }
    });
    if (typeof prevSnapIndex !== "undefined") {
      prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
    }
  }
  let prevIndex = 0;
  if (typeof prevSnap !== "undefined") {
    prevIndex = slidesGrid.indexOf(prevSnap);
    if (prevIndex < 0)
      prevIndex = swiper.activeIndex - 1;
    if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
      prevIndex = Math.max(prevIndex, 0);
    }
  }
  if (params.rewind && swiper.isBeginning) {
    const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
  }
  return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
}
function slideReset(speed, runCallbacks, internal) {
  if (speed === void 0) {
    speed = this.params.speed;
  }
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  const swiper = this;
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}
function slideToClosest(speed, runCallbacks, internal, threshold) {
  if (speed === void 0) {
    speed = this.params.speed;
  }
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  if (threshold === void 0) {
    threshold = 0.5;
  }
  const swiper = this;
  let index = swiper.activeIndex;
  const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
  const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
  const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  if (translate2 >= swiper.snapGrid[snapIndex]) {
    const currentSnap = swiper.snapGrid[snapIndex];
    const nextSnap = swiper.snapGrid[snapIndex + 1];
    if (translate2 - currentSnap > (nextSnap - currentSnap) * threshold) {
      index += swiper.params.slidesPerGroup;
    }
  } else {
    const prevSnap = swiper.snapGrid[snapIndex - 1];
    const currentSnap = swiper.snapGrid[snapIndex];
    if (translate2 - prevSnap <= (currentSnap - prevSnap) * threshold) {
      index -= swiper.params.slidesPerGroup;
    }
  }
  index = Math.max(index, 0);
  index = Math.min(index, swiper.slidesGrid.length - 1);
  return swiper.slideTo(index, speed, runCallbacks, internal);
}
function slideToClickedSlide() {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  let slideToIndex = swiper.clickedIndex;
  let realIndex;
  const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
  if (params.loop) {
    if (swiper.animating)
      return;
    realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
    if (params.centeredSlides) {
      if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
        swiper.loopFix();
        slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
        nextTick2(() => {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else if (slideToIndex > swiper.slides.length - slidesPerView) {
      swiper.loopFix();
      slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
      nextTick2(() => {
        swiper.slideTo(slideToIndex);
      });
    } else {
      swiper.slideTo(slideToIndex);
    }
  } else {
    swiper.slideTo(slideToIndex);
  }
}
var slide = {
  slideTo,
  slideToLoop,
  slideNext,
  slidePrev,
  slideReset,
  slideToClosest,
  slideToClickedSlide
};
function loopCreate(slideRealIndex) {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  if (!params.loop || swiper.virtual && swiper.params.virtual.enabled)
    return;
  const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
  slides.forEach((el3, index) => {
    el3.setAttribute("data-swiper-slide-index", index);
  });
  swiper.loopFix({
    slideRealIndex,
    direction: params.centeredSlides ? void 0 : "next"
  });
}
function loopFix(_temp) {
  let {
    slideRealIndex,
    slideTo: slideTo2 = true,
    direction,
    setTranslate: setTranslate2,
    activeSlideIndex,
    byController,
    byMousewheel
  } = _temp === void 0 ? {} : _temp;
  const swiper = this;
  if (!swiper.params.loop)
    return;
  swiper.emit("beforeLoopFix");
  const {
    slides,
    allowSlidePrev,
    allowSlideNext,
    slidesEl,
    params
  } = swiper;
  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;
  if (swiper.virtual && params.virtual.enabled) {
    if (slideTo2) {
      if (!params.centeredSlides && swiper.snapIndex === 0) {
        swiper.slideTo(swiper.virtual.slides.length, 0, false, true);
      } else if (params.centeredSlides && swiper.snapIndex < params.slidesPerView) {
        swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true);
      } else if (swiper.snapIndex === swiper.snapGrid.length - 1) {
        swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    swiper.emit("loopFix");
    return;
  }
  const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10));
  let loopedSlides = params.loopedSlides || slidesPerView;
  if (loopedSlides % params.slidesPerGroup !== 0) {
    loopedSlides += params.slidesPerGroup - loopedSlides % params.slidesPerGroup;
  }
  swiper.loopedSlides = loopedSlides;
  const prependSlidesIndexes = [];
  const appendSlidesIndexes = [];
  let activeIndex = swiper.activeIndex;
  if (typeof activeSlideIndex === "undefined") {
    activeSlideIndex = swiper.getSlideIndex(swiper.slides.filter((el3) => el3.classList.contains(params.slideActiveClass))[0]);
  } else {
    activeIndex = activeSlideIndex;
  }
  const isNext = direction === "next" || !direction;
  const isPrev = direction === "prev" || !direction;
  let slidesPrepended = 0;
  let slidesAppended = 0;
  if (activeSlideIndex < loopedSlides) {
    slidesPrepended = Math.max(loopedSlides - activeSlideIndex, params.slidesPerGroup);
    for (let i3 = 0; i3 < loopedSlides - activeSlideIndex; i3 += 1) {
      const index = i3 - Math.floor(i3 / slides.length) * slides.length;
      prependSlidesIndexes.push(slides.length - index - 1);
    }
  } else if (activeSlideIndex > swiper.slides.length - loopedSlides * 2) {
    slidesAppended = Math.max(activeSlideIndex - (swiper.slides.length - loopedSlides * 2), params.slidesPerGroup);
    for (let i3 = 0; i3 < slidesAppended; i3 += 1) {
      const index = i3 - Math.floor(i3 / slides.length) * slides.length;
      appendSlidesIndexes.push(index);
    }
  }
  if (isPrev) {
    prependSlidesIndexes.forEach((index) => {
      swiper.slides[index].swiperLoopMoveDOM = true;
      slidesEl.prepend(swiper.slides[index]);
      swiper.slides[index].swiperLoopMoveDOM = false;
    });
  }
  if (isNext) {
    appendSlidesIndexes.forEach((index) => {
      swiper.slides[index].swiperLoopMoveDOM = true;
      slidesEl.append(swiper.slides[index]);
      swiper.slides[index].swiperLoopMoveDOM = false;
    });
  }
  swiper.recalcSlides();
  if (params.slidesPerView === "auto") {
    swiper.updateSlides();
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  if (slideTo2) {
    if (prependSlidesIndexes.length > 0 && isPrev) {
      if (typeof slideRealIndex === "undefined") {
        const currentSlideTranslate = swiper.slidesGrid[activeIndex];
        const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
        const diff = newSlideTranslate - currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - diff);
        } else {
          swiper.slideTo(activeIndex + slidesPrepended, 0, false, true);
          if (setTranslate2) {
            swiper.touches[swiper.isHorizontal() ? "startX" : "startY"] += diff;
            swiper.touchEventsData.currentTranslate = swiper.translate;
          }
        }
      } else {
        if (setTranslate2) {
          swiper.slideToLoop(slideRealIndex, 0, false, true);
          swiper.touchEventsData.currentTranslate = swiper.translate;
        }
      }
    } else if (appendSlidesIndexes.length > 0 && isNext) {
      if (typeof slideRealIndex === "undefined") {
        const currentSlideTranslate = swiper.slidesGrid[activeIndex];
        const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
        const diff = newSlideTranslate - currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - diff);
        } else {
          swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
          if (setTranslate2) {
            swiper.touches[swiper.isHorizontal() ? "startX" : "startY"] += diff;
            swiper.touchEventsData.currentTranslate = swiper.translate;
          }
        }
      } else {
        swiper.slideToLoop(slideRealIndex, 0, false, true);
      }
    }
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.controller && swiper.controller.control && !byController) {
    const loopParams = {
      slideRealIndex,
      direction,
      setTranslate: setTranslate2,
      activeSlideIndex,
      byController: true
    };
    if (Array.isArray(swiper.controller.control)) {
      swiper.controller.control.forEach((c3) => {
        if (!c3.destroyed && c3.params.loop)
          c3.loopFix({
            ...loopParams,
            slideTo: c3.params.slidesPerView === params.slidesPerView ? slideTo2 : false
          });
      });
    } else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) {
      swiper.controller.control.loopFix({
        ...loopParams,
        slideTo: swiper.controller.control.params.slidesPerView === params.slidesPerView ? slideTo2 : false
      });
    }
  }
  swiper.emit("loopFix");
}
function loopDestroy() {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  if (!params.loop || swiper.virtual && swiper.params.virtual.enabled)
    return;
  swiper.recalcSlides();
  const newSlidesOrder = [];
  swiper.slides.forEach((slideEl) => {
    const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
    newSlidesOrder[index] = slideEl;
  });
  swiper.slides.forEach((slideEl) => {
    slideEl.removeAttribute("data-swiper-slide-index");
  });
  newSlidesOrder.forEach((slideEl) => {
    slidesEl.append(slideEl);
  });
  swiper.recalcSlides();
  swiper.slideTo(swiper.realIndex, 0);
}
var loop = {
  loopCreate,
  loopFix,
  loopDestroy
};
function setGrabCursor(moving) {
  const swiper = this;
  if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode)
    return;
  const el3 = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  el3.style.cursor = "move";
  el3.style.cursor = moving ? "grabbing" : "grab";
  if (swiper.isElement) {
    requestAnimationFrame(() => {
      swiper.__preventObserver__ = false;
    });
  }
}
function unsetGrabCursor() {
  const swiper = this;
  if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
    return;
  }
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
  if (swiper.isElement) {
    requestAnimationFrame(() => {
      swiper.__preventObserver__ = false;
    });
  }
}
var grabCursor = {
  setGrabCursor,
  unsetGrabCursor
};
function closestElement(selector, base) {
  if (base === void 0) {
    base = this;
  }
  function __closestFrom(el3) {
    if (!el3 || el3 === getDocument() || el3 === getWindow())
      return null;
    if (el3.assignedSlot)
      el3 = el3.assignedSlot;
    const found = el3.closest(selector);
    if (!found && !el3.getRootNode) {
      return null;
    }
    return found || __closestFrom(el3.getRootNode().host);
  }
  return __closestFrom(base);
}
function onTouchStart(event2) {
  const swiper = this;
  const document2 = getDocument();
  const window2 = getWindow();
  const data = swiper.touchEventsData;
  data.evCache.push(event2);
  const {
    params,
    touches,
    enabled
  } = swiper;
  if (!enabled)
    return;
  if (!params.simulateTouch && event2.pointerType === "mouse")
    return;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return;
  }
  if (!swiper.animating && params.cssMode && params.loop) {
    swiper.loopFix();
  }
  let e3 = event2;
  if (e3.originalEvent)
    e3 = e3.originalEvent;
  let targetEl = e3.target;
  if (params.touchEventsTarget === "wrapper") {
    if (!swiper.wrapperEl.contains(targetEl))
      return;
  }
  if ("which" in e3 && e3.which === 3)
    return;
  if ("button" in e3 && e3.button > 0)
    return;
  if (data.isTouched && data.isMoved)
    return;
  const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
  const eventPath = event2.composedPath ? event2.composedPath() : event2.path;
  if (swipingClassHasValue && e3.target && e3.target.shadowRoot && eventPath) {
    targetEl = eventPath[0];
  }
  const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
  const isTargetShadow = !!(e3.target && e3.target.shadowRoot);
  if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
    swiper.allowClick = true;
    return;
  }
  if (params.swipeHandler) {
    if (!targetEl.closest(params.swipeHandler))
      return;
  }
  touches.currentX = e3.pageX;
  touches.currentY = e3.pageY;
  const startX = touches.currentX;
  const startY = touches.currentY;
  const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
  const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
  if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window2.innerWidth - edgeSwipeThreshold)) {
    if (edgeSwipeDetection === "prevent") {
      event2.preventDefault();
    } else {
      return;
    }
  }
  Object.assign(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: void 0,
    startMoving: void 0
  });
  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = now();
  swiper.allowClick = true;
  swiper.updateSize();
  swiper.swipeDirection = void 0;
  if (params.threshold > 0)
    data.allowThresholdMove = false;
  let preventDefault = true;
  if (targetEl.matches(data.focusableElements)) {
    preventDefault = false;
    if (targetEl.nodeName === "SELECT") {
      data.isTouched = false;
    }
  }
  if (document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== targetEl) {
    document2.activeElement.blur();
  }
  const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
  if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) {
    e3.preventDefault();
  }
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
    swiper.freeMode.onTouchStart();
  }
  swiper.emit("touchStart", e3);
}
function onTouchMove(event2) {
  const document2 = getDocument();
  const swiper = this;
  const data = swiper.touchEventsData;
  const {
    params,
    touches,
    rtlTranslate: rtl,
    enabled
  } = swiper;
  if (!enabled)
    return;
  if (!params.simulateTouch && event2.pointerType === "mouse")
    return;
  let e3 = event2;
  if (e3.originalEvent)
    e3 = e3.originalEvent;
  if (!data.isTouched) {
    if (data.startMoving && data.isScrolling) {
      swiper.emit("touchMoveOpposite", e3);
    }
    return;
  }
  const pointerIndex = data.evCache.findIndex((cachedEv) => cachedEv.pointerId === e3.pointerId);
  if (pointerIndex >= 0)
    data.evCache[pointerIndex] = e3;
  const targetTouch = data.evCache.length > 1 ? data.evCache[0] : e3;
  const pageX = targetTouch.pageX;
  const pageY = targetTouch.pageY;
  if (e3.preventedByNestedSwiper) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }
  if (!swiper.allowTouchMove) {
    if (!e3.target.matches(data.focusableElements)) {
      swiper.allowClick = false;
    }
    if (data.isTouched) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        prevX: swiper.touches.currentX,
        prevY: swiper.touches.currentY,
        currentX: pageX,
        currentY: pageY
      });
      data.touchStartTime = now();
    }
    return;
  }
  if (params.touchReleaseOnEdges && !params.loop) {
    if (swiper.isVertical()) {
      if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
        data.isTouched = false;
        data.isMoved = false;
        return;
      }
    } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
      return;
    }
  }
  if (document2.activeElement) {
    if (e3.target === document2.activeElement && e3.target.matches(data.focusableElements)) {
      data.isMoved = true;
      swiper.allowClick = false;
      return;
    }
  }
  if (data.allowTouchCallbacks) {
    swiper.emit("touchMove", e3);
  }
  if (e3.targetTouches && e3.targetTouches.length > 1)
    return;
  touches.currentX = pageX;
  touches.currentY = pageY;
  const diffX = touches.currentX - touches.startX;
  const diffY = touches.currentY - touches.startY;
  if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold)
    return;
  if (typeof data.isScrolling === "undefined") {
    let touchAngle;
    if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
      data.isScrolling = false;
    } else {
      if (diffX * diffX + diffY * diffY >= 25) {
        touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
        data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
      }
    }
  }
  if (data.isScrolling) {
    swiper.emit("touchMoveOpposite", e3);
  }
  if (typeof data.startMoving === "undefined") {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }
  if (data.isScrolling || swiper.zoom && swiper.params.zoom && swiper.params.zoom.enabled && data.evCache.length > 1) {
    data.isTouched = false;
    return;
  }
  if (!data.startMoving) {
    return;
  }
  swiper.allowClick = false;
  if (!params.cssMode && e3.cancelable) {
    e3.preventDefault();
  }
  if (params.touchMoveStopPropagation && !params.nested) {
    e3.stopPropagation();
  }
  let diff = swiper.isHorizontal() ? diffX : diffY;
  let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
  if (params.oneWayMovement) {
    diff = Math.abs(diff) * (rtl ? 1 : -1);
    touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
  }
  touches.diff = diff;
  diff *= params.touchRatio;
  if (rtl) {
    diff = -diff;
    touchesDiff = -touchesDiff;
  }
  const prevTouchesDirection = swiper.touchesDirection;
  swiper.swipeDirection = diff > 0 ? "prev" : "next";
  swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
  const isLoop = swiper.params.loop && !params.cssMode;
  if (!data.isMoved) {
    if (isLoop) {
      swiper.loopFix({
        direction: swiper.swipeDirection
      });
    }
    data.startTranslate = swiper.getTranslate();
    swiper.setTransition(0);
    if (swiper.animating) {
      const evt = new window.CustomEvent("transitionend", {
        bubbles: true,
        cancelable: true
      });
      swiper.wrapperEl.dispatchEvent(evt);
    }
    data.allowMomentumBounce = false;
    if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(true);
    }
    swiper.emit("sliderFirstMove", e3);
  }
  let loopFixed;
  if (data.isMoved && prevTouchesDirection !== swiper.touchesDirection && isLoop && Math.abs(diff) >= 1) {
    swiper.loopFix({
      direction: swiper.swipeDirection,
      setTranslate: true
    });
    loopFixed = true;
  }
  swiper.emit("sliderMove", e3);
  data.isMoved = true;
  data.currentTranslate = diff + data.startTranslate;
  let disableParentSwiper = true;
  let resistanceRatio = params.resistanceRatio;
  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }
  if (diff > 0) {
    if (isLoop && !loopFixed && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.size / 2 : swiper.minTranslate())) {
      swiper.loopFix({
        direction: "prev",
        setTranslate: true,
        activeSlideIndex: 0
      });
    }
    if (data.currentTranslate > swiper.minTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
      }
    }
  } else if (diff < 0) {
    if (isLoop && !loopFixed && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.size / 2 : swiper.maxTranslate())) {
      swiper.loopFix({
        direction: "next",
        setTranslate: true,
        activeSlideIndex: swiper.slides.length - (params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
      });
    }
    if (data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
      }
    }
  }
  if (disableParentSwiper) {
    e3.preventedByNestedSwiper = true;
  }
  if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
    data.currentTranslate = data.startTranslate;
  }
  if (params.threshold > 0) {
    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
      if (!data.allowThresholdMove) {
        data.allowThresholdMove = true;
        touches.startX = touches.currentX;
        touches.startY = touches.currentY;
        data.currentTranslate = data.startTranslate;
        touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
        return;
      }
    } else {
      data.currentTranslate = data.startTranslate;
      return;
    }
  }
  if (!params.followFinger || params.cssMode)
    return;
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode) {
    swiper.freeMode.onTouchMove();
  }
  swiper.updateProgress(data.currentTranslate);
  swiper.setTranslate(data.currentTranslate);
}
function onTouchEnd(event2) {
  const swiper = this;
  const data = swiper.touchEventsData;
  const pointerIndex = data.evCache.findIndex((cachedEv) => cachedEv.pointerId === event2.pointerId);
  if (pointerIndex >= 0) {
    data.evCache.splice(pointerIndex, 1);
  }
  if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(event2.type)) {
    const proceed = ["pointercancel", "contextmenu"].includes(event2.type) && (swiper.browser.isSafari || swiper.browser.isWebView);
    if (!proceed) {
      return;
    }
  }
  const {
    params,
    touches,
    rtlTranslate: rtl,
    slidesGrid,
    enabled
  } = swiper;
  if (!enabled)
    return;
  if (!params.simulateTouch && event2.pointerType === "mouse")
    return;
  let e3 = event2;
  if (e3.originalEvent)
    e3 = e3.originalEvent;
  if (data.allowTouchCallbacks) {
    swiper.emit("touchEnd", e3);
  }
  data.allowTouchCallbacks = false;
  if (!data.isTouched) {
    if (data.isMoved && params.grabCursor) {
      swiper.setGrabCursor(false);
    }
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
    swiper.setGrabCursor(false);
  }
  const touchEndTime = now();
  const timeDiff = touchEndTime - data.touchStartTime;
  if (swiper.allowClick) {
    const pathTree = e3.path || e3.composedPath && e3.composedPath();
    swiper.updateClickedSlide(pathTree && pathTree[0] || e3.target);
    swiper.emit("tap click", e3);
    if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
      swiper.emit("doubleTap doubleClick", e3);
    }
  }
  data.lastClickTime = now();
  nextTick2(() => {
    if (!swiper.destroyed)
      swiper.allowClick = true;
  });
  if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  data.isTouched = false;
  data.isMoved = false;
  data.startMoving = false;
  let currentPos;
  if (params.followFinger) {
    currentPos = rtl ? swiper.translate : -swiper.translate;
  } else {
    currentPos = -data.currentTranslate;
  }
  if (params.cssMode) {
    return;
  }
  if (params.freeMode && params.freeMode.enabled) {
    swiper.freeMode.onTouchEnd({
      currentPos
    });
    return;
  }
  let stopIndex = 0;
  let groupSize = swiper.slidesSizesGrid[0];
  for (let i3 = 0; i3 < slidesGrid.length; i3 += i3 < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
    const increment2 = i3 < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (typeof slidesGrid[i3 + increment2] !== "undefined") {
      if (currentPos >= slidesGrid[i3] && currentPos < slidesGrid[i3 + increment2]) {
        stopIndex = i3;
        groupSize = slidesGrid[i3 + increment2] - slidesGrid[i3];
      }
    } else if (currentPos >= slidesGrid[i3]) {
      stopIndex = i3;
      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
    }
  }
  let rewindFirstIndex = null;
  let rewindLastIndex = null;
  if (params.rewind) {
    if (swiper.isBeginning) {
      rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    } else if (swiper.isEnd) {
      rewindFirstIndex = 0;
    }
  }
  const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
  const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
  if (timeDiff > params.longSwipesMs) {
    if (!params.longSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (swiper.swipeDirection === "next") {
      if (ratio >= params.longSwipesRatio)
        swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);
      else
        swiper.slideTo(stopIndex);
    }
    if (swiper.swipeDirection === "prev") {
      if (ratio > 1 - params.longSwipesRatio) {
        swiper.slideTo(stopIndex + increment);
      } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
        swiper.slideTo(rewindLastIndex);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  } else {
    if (!params.shortSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    const isNavButtonTarget = swiper.navigation && (e3.target === swiper.navigation.nextEl || e3.target === swiper.navigation.prevEl);
    if (!isNavButtonTarget) {
      if (swiper.swipeDirection === "next") {
        swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
      }
      if (swiper.swipeDirection === "prev") {
        swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
      }
    } else if (e3.target === swiper.navigation.nextEl) {
      swiper.slideTo(stopIndex + increment);
    } else {
      swiper.slideTo(stopIndex);
    }
  }
}
function onResize() {
  const swiper = this;
  const {
    params,
    el: el3
  } = swiper;
  if (el3 && el3.offsetWidth === 0)
    return;
  if (params.breakpoints) {
    swiper.setBreakpoint();
  }
  const {
    allowSlideNext,
    allowSlidePrev,
    snapGrid
  } = swiper;
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;
  swiper.updateSize();
  swiper.updateSlides();
  swiper.updateSlidesClasses();
  const isVirtualLoop = isVirtual && params.loop;
  if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) {
    swiper.slideTo(swiper.slides.length - 1, 0, false, true);
  } else {
    if (swiper.params.loop && !isVirtual) {
      swiper.slideToLoop(swiper.realIndex, 0, false, true);
    } else {
      swiper.slideTo(swiper.activeIndex, 0, false, true);
    }
  }
  if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
    clearTimeout(swiper.autoplay.resizeTimeout);
    swiper.autoplay.resizeTimeout = setTimeout(() => {
      if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
        swiper.autoplay.resume();
      }
    }, 500);
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
    swiper.checkOverflow();
  }
}
function onClick(e3) {
  const swiper = this;
  if (!swiper.enabled)
    return;
  if (!swiper.allowClick) {
    if (swiper.params.preventClicks)
      e3.preventDefault();
    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e3.stopPropagation();
      e3.stopImmediatePropagation();
    }
  }
}
function onScroll() {
  const swiper = this;
  const {
    wrapperEl,
    rtlTranslate,
    enabled
  } = swiper;
  if (!enabled)
    return;
  swiper.previousTranslate = swiper.translate;
  if (swiper.isHorizontal()) {
    swiper.translate = -wrapperEl.scrollLeft;
  } else {
    swiper.translate = -wrapperEl.scrollTop;
  }
  if (swiper.translate === 0)
    swiper.translate = 0;
  swiper.updateActiveIndex();
  swiper.updateSlidesClasses();
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== swiper.progress) {
    swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
  }
  swiper.emit("setTranslate", swiper.translate, false);
}
function onLoad(e3) {
  const swiper = this;
  processLazyPreloader(swiper, e3.target);
  if (swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) {
    return;
  }
  swiper.update();
}
var dummyEventAttached = false;
function dummyEventListener() {
}
var events = (swiper, method) => {
  const document2 = getDocument();
  const {
    params,
    el: el3,
    wrapperEl,
    device
  } = swiper;
  const capture = !!params.nested;
  const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
  const swiperMethod = method;
  el3[domMethod]("pointerdown", swiper.onTouchStart, {
    passive: false
  });
  document2[domMethod]("pointermove", swiper.onTouchMove, {
    passive: false,
    capture
  });
  document2[domMethod]("pointerup", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("pointercancel", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("pointerout", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("pointerleave", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("contextmenu", swiper.onTouchEnd, {
    passive: true
  });
  if (params.preventClicks || params.preventClicksPropagation) {
    el3[domMethod]("click", swiper.onClick, true);
  }
  if (params.cssMode) {
    wrapperEl[domMethod]("scroll", swiper.onScroll);
  }
  if (params.updateOnWindowResize) {
    swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true);
  } else {
    swiper[swiperMethod]("observerUpdate", onResize, true);
  }
  el3[domMethod]("load", swiper.onLoad, {
    capture: true
  });
};
function attachEvents() {
  const swiper = this;
  const document2 = getDocument();
  const {
    params
  } = swiper;
  swiper.onTouchStart = onTouchStart.bind(swiper);
  swiper.onTouchMove = onTouchMove.bind(swiper);
  swiper.onTouchEnd = onTouchEnd.bind(swiper);
  if (params.cssMode) {
    swiper.onScroll = onScroll.bind(swiper);
  }
  swiper.onClick = onClick.bind(swiper);
  swiper.onLoad = onLoad.bind(swiper);
  if (!dummyEventAttached) {
    document2.addEventListener("touchstart", dummyEventListener);
    dummyEventAttached = true;
  }
  events(swiper, "on");
}
function detachEvents() {
  const swiper = this;
  events(swiper, "off");
}
var events$1 = {
  attachEvents,
  detachEvents
};
var isGridEnabled = (swiper, params) => {
  return swiper.grid && params.grid && params.grid.rows > 1;
};
function setBreakpoint() {
  const swiper = this;
  const {
    realIndex,
    initialized,
    params,
    el: el3
  } = swiper;
  const breakpoints2 = params.breakpoints;
  if (!breakpoints2 || breakpoints2 && Object.keys(breakpoints2).length === 0)
    return;
  const breakpoint = swiper.getBreakpoint(breakpoints2, swiper.params.breakpointsBase, swiper.el);
  if (!breakpoint || swiper.currentBreakpoint === breakpoint)
    return;
  const breakpointOnlyParams = breakpoint in breakpoints2 ? breakpoints2[breakpoint] : void 0;
  const breakpointParams = breakpointOnlyParams || swiper.originalParams;
  const wasMultiRow = isGridEnabled(swiper, params);
  const isMultiRow = isGridEnabled(swiper, breakpointParams);
  const wasEnabled = params.enabled;
  if (wasMultiRow && !isMultiRow) {
    el3.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
    swiper.emitContainerClasses();
  } else if (!wasMultiRow && isMultiRow) {
    el3.classList.add(`${params.containerModifierClass}grid`);
    if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") {
      el3.classList.add(`${params.containerModifierClass}grid-column`);
    }
    swiper.emitContainerClasses();
  }
  ["navigation", "pagination", "scrollbar"].forEach((prop) => {
    if (typeof breakpointParams[prop] === "undefined")
      return;
    const wasModuleEnabled = params[prop] && params[prop].enabled;
    const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
    if (wasModuleEnabled && !isModuleEnabled) {
      swiper[prop].disable();
    }
    if (!wasModuleEnabled && isModuleEnabled) {
      swiper[prop].enable();
    }
  });
  const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
  const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
  if (directionChanged && initialized) {
    swiper.changeDirection();
  }
  extend2(swiper.params, breakpointParams);
  const isEnabled = swiper.params.enabled;
  Object.assign(swiper, {
    allowTouchMove: swiper.params.allowTouchMove,
    allowSlideNext: swiper.params.allowSlideNext,
    allowSlidePrev: swiper.params.allowSlidePrev
  });
  if (wasEnabled && !isEnabled) {
    swiper.disable();
  } else if (!wasEnabled && isEnabled) {
    swiper.enable();
  }
  swiper.currentBreakpoint = breakpoint;
  swiper.emit("_beforeBreakpoint", breakpointParams);
  if (needsReLoop && initialized) {
    swiper.loopDestroy();
    swiper.loopCreate(realIndex);
    swiper.updateSlides();
  }
  swiper.emit("breakpoint", breakpointParams);
}
function getBreakpoint(breakpoints2, base, containerEl) {
  if (base === void 0) {
    base = "window";
  }
  if (!breakpoints2 || base === "container" && !containerEl)
    return void 0;
  let breakpoint = false;
  const window2 = getWindow();
  const currentHeight = base === "window" ? window2.innerHeight : containerEl.clientHeight;
  const points = Object.keys(breakpoints2).map((point) => {
    if (typeof point === "string" && point.indexOf("@") === 0) {
      const minRatio = parseFloat(point.substr(1));
      const value = currentHeight * minRatio;
      return {
        value,
        point
      };
    }
    return {
      value: point,
      point
    };
  });
  points.sort((a3, b3) => parseInt(a3.value, 10) - parseInt(b3.value, 10));
  for (let i3 = 0; i3 < points.length; i3 += 1) {
    const {
      point,
      value
    } = points[i3];
    if (base === "window") {
      if (window2.matchMedia(`(min-width: ${value}px)`).matches) {
        breakpoint = point;
      }
    } else if (value <= containerEl.clientWidth) {
      breakpoint = point;
    }
  }
  return breakpoint || "max";
}
var breakpoints = {
  setBreakpoint,
  getBreakpoint
};
function prepareClasses(entries, prefix) {
  const resultClasses = [];
  entries.forEach((item) => {
    if (typeof item === "object") {
      Object.keys(item).forEach((classNames) => {
        if (item[classNames]) {
          resultClasses.push(prefix + classNames);
        }
      });
    } else if (typeof item === "string") {
      resultClasses.push(prefix + item);
    }
  });
  return resultClasses;
}
function addClasses() {
  const swiper = this;
  const {
    classNames,
    params,
    rtl,
    el: el3,
    device
  } = swiper;
  const suffixes = prepareClasses(["initialized", params.direction, {
    "free-mode": swiper.params.freeMode && params.freeMode.enabled
  }, {
    "autoheight": params.autoHeight
  }, {
    "rtl": rtl
  }, {
    "grid": params.grid && params.grid.rows > 1
  }, {
    "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
  }, {
    "android": device.android
  }, {
    "ios": device.ios
  }, {
    "css-mode": params.cssMode
  }, {
    "centered": params.cssMode && params.centeredSlides
  }, {
    "watch-progress": params.watchSlidesProgress
  }], params.containerModifierClass);
  classNames.push(...suffixes);
  el3.classList.add(...classNames);
  swiper.emitContainerClasses();
}
function removeClasses() {
  const swiper = this;
  const {
    el: el3,
    classNames
  } = swiper;
  el3.classList.remove(...classNames);
  swiper.emitContainerClasses();
}
var classes = {
  addClasses,
  removeClasses
};
function checkOverflow() {
  const swiper = this;
  const {
    isLocked: wasLocked,
    params
  } = swiper;
  const {
    slidesOffsetBefore
  } = params;
  if (slidesOffsetBefore) {
    const lastSlideIndex = swiper.slides.length - 1;
    const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
    swiper.isLocked = swiper.size > lastSlideRightEdge;
  } else {
    swiper.isLocked = swiper.snapGrid.length === 1;
  }
  if (params.allowSlideNext === true) {
    swiper.allowSlideNext = !swiper.isLocked;
  }
  if (params.allowSlidePrev === true) {
    swiper.allowSlidePrev = !swiper.isLocked;
  }
  if (wasLocked && wasLocked !== swiper.isLocked) {
    swiper.isEnd = false;
  }
  if (wasLocked !== swiper.isLocked) {
    swiper.emit(swiper.isLocked ? "lock" : "unlock");
  }
}
var checkOverflow$1 = {
  checkOverflow
};
var defaults = {
  init: true,
  direction: "horizontal",
  oneWayMovement: false,
  touchEventsTarget: "wrapper",
  initialSlide: 0,
  speed: 300,
  cssMode: false,
  updateOnWindowResize: true,
  resizeObserver: true,
  nested: false,
  createElements: false,
  enabled: true,
  focusableElements: "input, select, option, textarea, button, video, label",
  // Overrides
  width: null,
  height: null,
  //
  preventInteractionOnTransition: false,
  // ssr
  userAgent: null,
  url: null,
  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: false,
  edgeSwipeThreshold: 20,
  // Autoheight
  autoHeight: false,
  // Set wrapper width
  setWrapperSize: false,
  // Virtual Translate
  virtualTranslate: false,
  // Effects
  effect: "slide",
  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
  // Breakpoints
  breakpoints: void 0,
  breakpointsBase: "window",
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: false,
  centeredSlides: false,
  centeredSlidesBounds: false,
  slidesOffsetBefore: 0,
  // in px
  slidesOffsetAfter: 0,
  // in px
  normalizeSlideIndex: true,
  centerInsufficientSlides: false,
  // Disable swiper and hide navigation when container not overflow
  watchOverflow: true,
  // Round length
  roundLengths: false,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  allowTouchMove: true,
  threshold: 5,
  touchMoveStopPropagation: false,
  touchStartPreventDefault: true,
  touchStartForcePreventDefault: false,
  touchReleaseOnEdges: false,
  // Unique Navigation Elements
  uniqueNavElements: true,
  // Resistance
  resistance: true,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: false,
  // Cursor
  grabCursor: false,
  // Clicks
  preventClicks: true,
  preventClicksPropagation: true,
  slideToClickedSlide: false,
  // loop
  loop: false,
  loopedSlides: null,
  loopPreventsSliding: true,
  // rewind
  rewind: false,
  // Swiping/no swiping
  allowSlidePrev: true,
  allowSlideNext: true,
  swipeHandler: null,
  // '.swipe-handler',
  noSwiping: true,
  noSwipingClass: "swiper-no-swiping",
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: true,
  maxBackfaceHiddenSlides: 10,
  // NS
  containerModifierClass: "swiper-",
  // NEW
  slideClass: "swiper-slide",
  slideActiveClass: "swiper-slide-active",
  slideVisibleClass: "swiper-slide-visible",
  slideNextClass: "swiper-slide-next",
  slidePrevClass: "swiper-slide-prev",
  wrapperClass: "swiper-wrapper",
  lazyPreloaderClass: "swiper-lazy-preloader",
  lazyPreloadPrevNext: 0,
  // Callbacks
  runCallbacksOnInit: true,
  // Internals
  _emitClasses: false
};
function moduleExtendParams(params, allModulesParams) {
  return function extendParams(obj) {
    if (obj === void 0) {
      obj = {};
    }
    const moduleParamName = Object.keys(obj)[0];
    const moduleParams = obj[moduleParamName];
    if (typeof moduleParams !== "object" || moduleParams === null) {
      extend2(allModulesParams, obj);
      return;
    }
    if (["navigation", "pagination", "scrollbar"].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) {
      params[moduleParamName] = {
        auto: true
      };
    }
    if (!(moduleParamName in params && "enabled" in moduleParams)) {
      extend2(allModulesParams, obj);
      return;
    }
    if (params[moduleParamName] === true) {
      params[moduleParamName] = {
        enabled: true
      };
    }
    if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) {
      params[moduleParamName].enabled = true;
    }
    if (!params[moduleParamName])
      params[moduleParamName] = {
        enabled: false
      };
    extend2(allModulesParams, obj);
  };
}
var prototypes = {
  eventsEmitter,
  update,
  translate,
  transition,
  slide,
  loop,
  grabCursor,
  events: events$1,
  breakpoints,
  checkOverflow: checkOverflow$1,
  classes
};
var extendedDefaults = {};
var Swiper = class _Swiper {
  constructor() {
    let el3;
    let params;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") {
      params = args[0];
    } else {
      [el3, params] = args;
    }
    if (!params)
      params = {};
    params = extend2({}, params);
    if (el3 && !params.el)
      params.el = el3;
    const document2 = getDocument();
    if (params.el && typeof params.el === "string" && document2.querySelectorAll(params.el).length > 1) {
      const swipers = [];
      document2.querySelectorAll(params.el).forEach((containerEl) => {
        const newParams = extend2({}, params, {
          el: containerEl
        });
        swipers.push(new _Swiper(newParams));
      });
      return swipers;
    }
    const swiper = this;
    swiper.__swiper__ = true;
    swiper.support = getSupport();
    swiper.device = getDevice({
      userAgent: params.userAgent
    });
    swiper.browser = getBrowser();
    swiper.eventsListeners = {};
    swiper.eventsAnyListeners = [];
    swiper.modules = [...swiper.__modules__];
    if (params.modules && Array.isArray(params.modules)) {
      swiper.modules.push(...params.modules);
    }
    const allModulesParams = {};
    swiper.modules.forEach((mod) => {
      mod({
        params,
        swiper,
        extendParams: moduleExtendParams(params, allModulesParams),
        on: swiper.on.bind(swiper),
        once: swiper.once.bind(swiper),
        off: swiper.off.bind(swiper),
        emit: swiper.emit.bind(swiper)
      });
    });
    const swiperParams = extend2({}, defaults, allModulesParams);
    swiper.params = extend2({}, swiperParams, extendedDefaults, params);
    swiper.originalParams = extend2({}, swiper.params);
    swiper.passedParams = extend2({}, params);
    if (swiper.params && swiper.params.on) {
      Object.keys(swiper.params.on).forEach((eventName) => {
        swiper.on(eventName, swiper.params.on[eventName]);
      });
    }
    if (swiper.params && swiper.params.onAny) {
      swiper.onAny(swiper.params.onAny);
    }
    Object.assign(swiper, {
      enabled: swiper.params.enabled,
      el: el3,
      // Classes
      classNames: [],
      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      // isDirection
      isHorizontal() {
        return swiper.params.direction === "horizontal";
      },
      isVertical() {
        return swiper.params.direction === "vertical";
      },
      // Indexes
      activeIndex: 0,
      realIndex: 0,
      //
      isBeginning: true,
      isEnd: false,
      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: false,
      cssOverflowAdjustment() {
        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
      },
      // Locks
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
      // Touch Events
      touchEventsData: {
        isTouched: void 0,
        isMoved: void 0,
        allowTouchCallbacks: void 0,
        touchStartTime: void 0,
        isScrolling: void 0,
        currentTranslate: void 0,
        startTranslate: void 0,
        allowThresholdMove: void 0,
        // Form elements to match
        focusableElements: swiper.params.focusableElements,
        // Last click time
        lastClickTime: 0,
        clickTimeout: void 0,
        // Velocities
        velocities: [],
        allowMomentumBounce: void 0,
        startMoving: void 0,
        evCache: []
      },
      // Clicks
      allowClick: true,
      // Touches
      allowTouchMove: swiper.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0
    });
    swiper.emit("_swiper");
    if (swiper.params.init) {
      swiper.init();
    }
    return swiper;
  }
  getSlideIndex(slideEl) {
    const {
      slidesEl,
      params
    } = this;
    const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
    const firstSlideIndex = elementIndex(slides[0]);
    return elementIndex(slideEl) - firstSlideIndex;
  }
  getSlideIndexByData(index) {
    return this.getSlideIndex(this.slides.filter((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === index)[0]);
  }
  recalcSlides() {
    const swiper = this;
    const {
      slidesEl,
      params
    } = swiper;
    swiper.slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
  }
  enable() {
    const swiper = this;
    if (swiper.enabled)
      return;
    swiper.enabled = true;
    if (swiper.params.grabCursor) {
      swiper.setGrabCursor();
    }
    swiper.emit("enable");
  }
  disable() {
    const swiper = this;
    if (!swiper.enabled)
      return;
    swiper.enabled = false;
    if (swiper.params.grabCursor) {
      swiper.unsetGrabCursor();
    }
    swiper.emit("disable");
  }
  setProgress(progress, speed) {
    const swiper = this;
    progress = Math.min(Math.max(progress, 0), 1);
    const min2 = swiper.minTranslate();
    const max2 = swiper.maxTranslate();
    const current = (max2 - min2) * progress + min2;
    swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  emitContainerClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el)
      return;
    const cls = swiper.el.className.split(" ").filter((className) => {
      return className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
    });
    swiper.emit("_containerClasses", cls.join(" "));
  }
  getSlideClasses(slideEl) {
    const swiper = this;
    if (swiper.destroyed)
      return "";
    return slideEl.className.split(" ").filter((className) => {
      return className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0;
    }).join(" ");
  }
  emitSlidesClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el)
      return;
    const updates = [];
    swiper.slides.forEach((slideEl) => {
      const classNames = swiper.getSlideClasses(slideEl);
      updates.push({
        slideEl,
        classNames
      });
      swiper.emit("_slideClass", slideEl, classNames);
    });
    swiper.emit("_slideClasses", updates);
  }
  slidesPerViewDynamic(view, exact) {
    if (view === void 0) {
      view = "current";
    }
    if (exact === void 0) {
      exact = false;
    }
    const swiper = this;
    const {
      params,
      slides,
      slidesGrid,
      slidesSizesGrid,
      size: swiperSize,
      activeIndex
    } = swiper;
    let spv = 1;
    if (params.centeredSlides) {
      let slideSize = slides[activeIndex] ? slides[activeIndex].swiperSlideSize : 0;
      let breakLoop;
      for (let i3 = activeIndex + 1; i3 < slides.length; i3 += 1) {
        if (slides[i3] && !breakLoop) {
          slideSize += slides[i3].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize)
            breakLoop = true;
        }
      }
      for (let i3 = activeIndex - 1; i3 >= 0; i3 -= 1) {
        if (slides[i3] && !breakLoop) {
          slideSize += slides[i3].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize)
            breakLoop = true;
        }
      }
    } else {
      if (view === "current") {
        for (let i3 = activeIndex + 1; i3 < slides.length; i3 += 1) {
          const slideInView = exact ? slidesGrid[i3] + slidesSizesGrid[i3] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i3] - slidesGrid[activeIndex] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      } else {
        for (let i3 = activeIndex - 1; i3 >= 0; i3 -= 1) {
          const slideInView = slidesGrid[activeIndex] - slidesGrid[i3] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      }
    }
    return spv;
  }
  update() {
    const swiper = this;
    if (!swiper || swiper.destroyed)
      return;
    const {
      snapGrid,
      params
    } = swiper;
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }
    [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach((imageEl) => {
      if (imageEl.complete) {
        processLazyPreloader(swiper, imageEl);
      }
    });
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateProgress();
    swiper.updateSlidesClasses();
    function setTranslate2() {
      const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
      const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
      swiper.setTranslate(newTranslate);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    let translated;
    if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
      setTranslate2();
      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
        const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
        translated = swiper.slideTo(slides.length - 1, 0, false, true);
      } else {
        translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
      if (!translated) {
        setTranslate2();
      }
    }
    if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
    swiper.emit("update");
  }
  changeDirection(newDirection, needUpdate) {
    if (needUpdate === void 0) {
      needUpdate = true;
    }
    const swiper = this;
    const currentDirection = swiper.params.direction;
    if (!newDirection) {
      newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
    }
    if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") {
      return swiper;
    }
    swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
    swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
    swiper.emitContainerClasses();
    swiper.params.direction = newDirection;
    swiper.slides.forEach((slideEl) => {
      if (newDirection === "vertical") {
        slideEl.style.width = "";
      } else {
        slideEl.style.height = "";
      }
    });
    swiper.emit("changeDirection");
    if (needUpdate)
      swiper.update();
    return swiper;
  }
  changeLanguageDirection(direction) {
    const swiper = this;
    if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr")
      return;
    swiper.rtl = direction === "rtl";
    swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
    if (swiper.rtl) {
      swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
      swiper.el.dir = "rtl";
    } else {
      swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
      swiper.el.dir = "ltr";
    }
    swiper.update();
  }
  mount(element) {
    const swiper = this;
    if (swiper.mounted)
      return true;
    let el3 = element || swiper.params.el;
    if (typeof el3 === "string") {
      el3 = document.querySelector(el3);
    }
    if (!el3) {
      return false;
    }
    el3.swiper = swiper;
    if (el3.parentNode && el3.parentNode.host && el3.parentNode.host.nodeName === "SWIPER-CONTAINER") {
      swiper.isElement = true;
    }
    const getWrapperSelector = () => {
      return `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
    };
    const getWrapper = () => {
      if (el3 && el3.shadowRoot && el3.shadowRoot.querySelector) {
        const res = el3.shadowRoot.querySelector(getWrapperSelector());
        return res;
      }
      return elementChildren(el3, getWrapperSelector())[0];
    };
    let wrapperEl = getWrapper();
    if (!wrapperEl && swiper.params.createElements) {
      wrapperEl = createElement("div", swiper.params.wrapperClass);
      el3.append(wrapperEl);
      elementChildren(el3, `.${swiper.params.slideClass}`).forEach((slideEl) => {
        wrapperEl.append(slideEl);
      });
    }
    Object.assign(swiper, {
      el: el3,
      wrapperEl,
      slidesEl: swiper.isElement && !el3.parentNode.host.slideSlots ? el3.parentNode.host : wrapperEl,
      hostEl: swiper.isElement ? el3.parentNode.host : el3,
      mounted: true,
      // RTL
      rtl: el3.dir.toLowerCase() === "rtl" || elementStyle(el3, "direction") === "rtl",
      rtlTranslate: swiper.params.direction === "horizontal" && (el3.dir.toLowerCase() === "rtl" || elementStyle(el3, "direction") === "rtl"),
      wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
    });
    return true;
  }
  init(el3) {
    const swiper = this;
    if (swiper.initialized)
      return swiper;
    const mounted = swiper.mount(el3);
    if (mounted === false)
      return swiper;
    swiper.emit("beforeInit");
    if (swiper.params.breakpoints) {
      swiper.setBreakpoint();
    }
    swiper.addClasses();
    swiper.updateSize();
    swiper.updateSlides();
    if (swiper.params.watchOverflow) {
      swiper.checkOverflow();
    }
    if (swiper.params.grabCursor && swiper.enabled) {
      swiper.setGrabCursor();
    }
    if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
      swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true);
    } else {
      swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
    }
    if (swiper.params.loop) {
      swiper.loopCreate();
    }
    swiper.attachEvents();
    const lazyElements = [...swiper.el.querySelectorAll('[loading="lazy"]')];
    if (swiper.isElement) {
      lazyElements.push(...swiper.hostEl.querySelectorAll('[loading="lazy"]'));
    }
    lazyElements.forEach((imageEl) => {
      if (imageEl.complete) {
        processLazyPreloader(swiper, imageEl);
      } else {
        imageEl.addEventListener("load", (e3) => {
          processLazyPreloader(swiper, e3.target);
        });
      }
    });
    preload(swiper);
    swiper.initialized = true;
    preload(swiper);
    swiper.emit("init");
    swiper.emit("afterInit");
    return swiper;
  }
  destroy(deleteInstance, cleanStyles) {
    if (deleteInstance === void 0) {
      deleteInstance = true;
    }
    if (cleanStyles === void 0) {
      cleanStyles = true;
    }
    const swiper = this;
    const {
      params,
      el: el3,
      wrapperEl,
      slides
    } = swiper;
    if (typeof swiper.params === "undefined" || swiper.destroyed) {
      return null;
    }
    swiper.emit("beforeDestroy");
    swiper.initialized = false;
    swiper.detachEvents();
    if (params.loop) {
      swiper.loopDestroy();
    }
    if (cleanStyles) {
      swiper.removeClasses();
      el3.removeAttribute("style");
      wrapperEl.removeAttribute("style");
      if (slides && slides.length) {
        slides.forEach((slideEl) => {
          slideEl.classList.remove(params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
          slideEl.removeAttribute("style");
          slideEl.removeAttribute("data-swiper-slide-index");
        });
      }
    }
    swiper.emit("destroy");
    Object.keys(swiper.eventsListeners).forEach((eventName) => {
      swiper.off(eventName);
    });
    if (deleteInstance !== false) {
      swiper.el.swiper = null;
      deleteProps(swiper);
    }
    swiper.destroyed = true;
    return null;
  }
  static extendDefaults(newDefaults) {
    extend2(extendedDefaults, newDefaults);
  }
  static get extendedDefaults() {
    return extendedDefaults;
  }
  static get defaults() {
    return defaults;
  }
  static installModule(mod) {
    if (!_Swiper.prototype.__modules__)
      _Swiper.prototype.__modules__ = [];
    const modules = _Swiper.prototype.__modules__;
    if (typeof mod === "function" && modules.indexOf(mod) < 0) {
      modules.push(mod);
    }
  }
  static use(module) {
    if (Array.isArray(module)) {
      module.forEach((m3) => _Swiper.installModule(m3));
      return _Swiper;
    }
    _Swiper.installModule(module);
    return _Swiper;
  }
};
Object.keys(prototypes).forEach((prototypeGroup) => {
  Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
    Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
  });
});
Swiper.use([Resize, Observer]);

// node_modules/.pnpm/swiper@10.2.0/node_modules/swiper/shared/update-swiper.mjs
var paramsList = [
  "eventsPrefix",
  "injectStyles",
  "injectStylesUrls",
  "modules",
  "init",
  "_direction",
  "oneWayMovement",
  "touchEventsTarget",
  "initialSlide",
  "_speed",
  "cssMode",
  "updateOnWindowResize",
  "resizeObserver",
  "nested",
  "focusableElements",
  "_enabled",
  "_width",
  "_height",
  "preventInteractionOnTransition",
  "userAgent",
  "url",
  "_edgeSwipeDetection",
  "_edgeSwipeThreshold",
  "_freeMode",
  "_autoHeight",
  "setWrapperSize",
  "virtualTranslate",
  "_effect",
  "breakpoints",
  "_spaceBetween",
  "_slidesPerView",
  "maxBackfaceHiddenSlides",
  "_grid",
  "_slidesPerGroup",
  "_slidesPerGroupSkip",
  "_slidesPerGroupAuto",
  "_centeredSlides",
  "_centeredSlidesBounds",
  "_slidesOffsetBefore",
  "_slidesOffsetAfter",
  "normalizeSlideIndex",
  "_centerInsufficientSlides",
  "_watchOverflow",
  "roundLengths",
  "touchRatio",
  "touchAngle",
  "simulateTouch",
  "_shortSwipes",
  "_longSwipes",
  "longSwipesRatio",
  "longSwipesMs",
  "_followFinger",
  "allowTouchMove",
  "_threshold",
  "touchMoveStopPropagation",
  "touchStartPreventDefault",
  "touchStartForcePreventDefault",
  "touchReleaseOnEdges",
  "uniqueNavElements",
  "_resistance",
  "_resistanceRatio",
  "_watchSlidesProgress",
  "_grabCursor",
  "preventClicks",
  "preventClicksPropagation",
  "_slideToClickedSlide",
  "_loop",
  "loopedSlides",
  "loopPreventsSliding",
  "_rewind",
  "_allowSlidePrev",
  "_allowSlideNext",
  "_swipeHandler",
  "_noSwiping",
  "noSwipingClass",
  "noSwipingSelector",
  "passiveListeners",
  "containerModifierClass",
  "slideClass",
  "slideActiveClass",
  "slideVisibleClass",
  "slideNextClass",
  "slidePrevClass",
  "wrapperClass",
  "lazyPreloaderClass",
  "lazyPreloadPrevNext",
  "runCallbacksOnInit",
  "observer",
  "observeParents",
  "observeSlideChildren",
  // modules
  "a11y",
  "_autoplay",
  "_controller",
  "coverflowEffect",
  "cubeEffect",
  "fadeEffect",
  "flipEffect",
  "creativeEffect",
  "cardsEffect",
  "hashNavigation",
  "history",
  "keyboard",
  "mousewheel",
  "_navigation",
  "_pagination",
  "parallax",
  "_scrollbar",
  "_thumbs",
  "virtual",
  "zoom",
  "control"
];
function isObject3(o) {
  return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
}
function extend3(target, src) {
  const noExtend = ["__proto__", "constructor", "prototype"];
  Object.keys(src).filter((key) => noExtend.indexOf(key) < 0).forEach((key) => {
    if (typeof target[key] === "undefined")
      target[key] = src[key];
    else if (isObject3(src[key]) && isObject3(target[key]) && Object.keys(src[key]).length > 0) {
      if (src[key].__swiper__)
        target[key] = src[key];
      else
        extend3(target[key], src[key]);
    } else {
      target[key] = src[key];
    }
  });
}
function needsNavigation(params) {
  if (params === void 0) {
    params = {};
  }
  return params.navigation && typeof params.navigation.nextEl === "undefined" && typeof params.navigation.prevEl === "undefined";
}
function needsPagination(params) {
  if (params === void 0) {
    params = {};
  }
  return params.pagination && typeof params.pagination.el === "undefined";
}
function needsScrollbar(params) {
  if (params === void 0) {
    params = {};
  }
  return params.scrollbar && typeof params.scrollbar.el === "undefined";
}
function uniqueClasses(classNames) {
  if (classNames === void 0) {
    classNames = "";
  }
  const classes2 = classNames.split(" ").map((c3) => c3.trim()).filter((c3) => !!c3);
  const unique = [];
  classes2.forEach((c3) => {
    if (unique.indexOf(c3) < 0)
      unique.push(c3);
  });
  return unique.join(" ");
}
function wrapperClass(className) {
  if (className === void 0) {
    className = "";
  }
  if (!className)
    return "swiper-wrapper";
  if (!className.includes("swiper-wrapper"))
    return `swiper-wrapper ${className}`;
  return className;
}
function updateSwiper(_ref) {
  let {
    swiper,
    slides,
    passedParams,
    changedParams,
    nextEl,
    prevEl,
    scrollbarEl,
    paginationEl
  } = _ref;
  const updateParams = changedParams.filter((key) => key !== "children" && key !== "direction" && key !== "wrapperClass");
  const {
    params: currentParams,
    pagination,
    navigation,
    scrollbar,
    virtual,
    thumbs
  } = swiper;
  let needThumbsInit;
  let needControllerInit;
  let needPaginationInit;
  let needScrollbarInit;
  let needNavigationInit;
  let loopNeedDestroy;
  let loopNeedEnable;
  let loopNeedReloop;
  if (changedParams.includes("thumbs") && passedParams.thumbs && passedParams.thumbs.swiper && currentParams.thumbs && !currentParams.thumbs.swiper) {
    needThumbsInit = true;
  }
  if (changedParams.includes("controller") && passedParams.controller && passedParams.controller.control && currentParams.controller && !currentParams.controller.control) {
    needControllerInit = true;
  }
  if (changedParams.includes("pagination") && passedParams.pagination && (passedParams.pagination.el || paginationEl) && (currentParams.pagination || currentParams.pagination === false) && pagination && !pagination.el) {
    needPaginationInit = true;
  }
  if (changedParams.includes("scrollbar") && passedParams.scrollbar && (passedParams.scrollbar.el || scrollbarEl) && (currentParams.scrollbar || currentParams.scrollbar === false) && scrollbar && !scrollbar.el) {
    needScrollbarInit = true;
  }
  if (changedParams.includes("navigation") && passedParams.navigation && (passedParams.navigation.prevEl || prevEl) && (passedParams.navigation.nextEl || nextEl) && (currentParams.navigation || currentParams.navigation === false) && navigation && !navigation.prevEl && !navigation.nextEl) {
    needNavigationInit = true;
  }
  const destroyModule = (mod) => {
    if (!swiper[mod])
      return;
    swiper[mod].destroy();
    if (mod === "navigation") {
      if (swiper.isElement) {
        swiper[mod].prevEl.remove();
        swiper[mod].nextEl.remove();
      }
      currentParams[mod].prevEl = void 0;
      currentParams[mod].nextEl = void 0;
      swiper[mod].prevEl = void 0;
      swiper[mod].nextEl = void 0;
    } else {
      if (swiper.isElement) {
        swiper[mod].el.remove();
      }
      currentParams[mod].el = void 0;
      swiper[mod].el = void 0;
    }
  };
  if (changedParams.includes("loop") && swiper.isElement) {
    if (currentParams.loop && !passedParams.loop) {
      loopNeedDestroy = true;
    } else if (!currentParams.loop && passedParams.loop) {
      loopNeedEnable = true;
    } else {
      loopNeedReloop = true;
    }
  }
  updateParams.forEach((key) => {
    if (isObject3(currentParams[key]) && isObject3(passedParams[key])) {
      extend3(currentParams[key], passedParams[key]);
      if ((key === "navigation" || key === "pagination" || key === "scrollbar") && "enabled" in passedParams[key] && !passedParams[key].enabled) {
        destroyModule(key);
      }
    } else {
      const newValue = passedParams[key];
      if ((newValue === true || newValue === false) && (key === "navigation" || key === "pagination" || key === "scrollbar")) {
        if (newValue === false) {
          destroyModule(key);
        }
      } else {
        currentParams[key] = passedParams[key];
      }
    }
  });
  if (updateParams.includes("controller") && !needControllerInit && swiper.controller && swiper.controller.control && currentParams.controller && currentParams.controller.control) {
    swiper.controller.control = currentParams.controller.control;
  }
  if (changedParams.includes("children") && slides && virtual && currentParams.virtual.enabled) {
    virtual.slides = slides;
    virtual.update(true);
  }
  if (changedParams.includes("children") && slides && currentParams.loop) {
    loopNeedReloop = true;
  }
  if (needThumbsInit) {
    const initialized = thumbs.init();
    if (initialized)
      thumbs.update(true);
  }
  if (needControllerInit) {
    swiper.controller.control = currentParams.controller.control;
  }
  if (needPaginationInit) {
    if (swiper.isElement && (!paginationEl || typeof paginationEl === "string")) {
      paginationEl = document.createElement("div");
      paginationEl.classList.add("swiper-pagination");
      paginationEl.part.add("pagination");
      swiper.el.appendChild(paginationEl);
    }
    if (paginationEl)
      currentParams.pagination.el = paginationEl;
    pagination.init();
    pagination.render();
    pagination.update();
  }
  if (needScrollbarInit) {
    if (swiper.isElement && (!scrollbarEl || typeof scrollbarEl === "string")) {
      scrollbarEl = document.createElement("div");
      scrollbarEl.classList.add("swiper-scrollbar");
      scrollbarEl.part.add("scrollbar");
      swiper.el.appendChild(scrollbarEl);
    }
    if (scrollbarEl)
      currentParams.scrollbar.el = scrollbarEl;
    scrollbar.init();
    scrollbar.updateSize();
    scrollbar.setTranslate();
  }
  if (needNavigationInit) {
    if (swiper.isElement) {
      if (!nextEl || typeof nextEl === "string") {
        nextEl = document.createElement("div");
        nextEl.classList.add("swiper-button-next");
        nextEl.innerHTML = swiper.hostEl.constructor.nextButtonSvg;
        nextEl.part.add("button-next");
        swiper.el.appendChild(nextEl);
      }
      if (!prevEl || typeof prevEl === "string") {
        prevEl = document.createElement("div");
        prevEl.classList.add("swiper-button-prev");
        prevEl.innerHTML = swiper.hostEl.constructor.prevButtonSvg;
        prevEl.part.add("button-prev");
        swiper.el.appendChild(prevEl);
      }
    }
    if (nextEl)
      currentParams.navigation.nextEl = nextEl;
    if (prevEl)
      currentParams.navigation.prevEl = prevEl;
    navigation.init();
    navigation.update();
  }
  if (changedParams.includes("allowSlideNext")) {
    swiper.allowSlideNext = passedParams.allowSlideNext;
  }
  if (changedParams.includes("allowSlidePrev")) {
    swiper.allowSlidePrev = passedParams.allowSlidePrev;
  }
  if (changedParams.includes("direction")) {
    swiper.changeDirection(passedParams.direction, false);
  }
  if (loopNeedDestroy || loopNeedReloop) {
    swiper.loopDestroy();
  }
  if (loopNeedEnable || loopNeedReloop) {
    swiper.loopCreate();
  }
  swiper.update();
}

// node_modules/.pnpm/swiper@10.2.0/node_modules/swiper/shared/update-on-virtual-data.mjs
function getParams(obj, splitEvents) {
  if (obj === void 0) {
    obj = {};
  }
  if (splitEvents === void 0) {
    splitEvents = true;
  }
  const params = {
    on: {}
  };
  const events2 = {};
  const passedParams = {};
  extend3(params, defaults);
  params._emitClasses = true;
  params.init = false;
  const rest = {};
  const allowedParams = paramsList.map((key) => key.replace(/_/, ""));
  const plainObj = Object.assign({}, obj);
  Object.keys(plainObj).forEach((key) => {
    if (typeof obj[key] === "undefined")
      return;
    if (allowedParams.indexOf(key) >= 0) {
      if (isObject3(obj[key])) {
        params[key] = {};
        passedParams[key] = {};
        extend3(params[key], obj[key]);
        extend3(passedParams[key], obj[key]);
      } else {
        params[key] = obj[key];
        passedParams[key] = obj[key];
      }
    } else if (key.search(/on[A-Z]/) === 0 && typeof obj[key] === "function") {
      if (splitEvents) {
        events2[`${key[2].toLowerCase()}${key.substr(3)}`] = obj[key];
      } else {
        params.on[`${key[2].toLowerCase()}${key.substr(3)}`] = obj[key];
      }
    } else {
      rest[key] = obj[key];
    }
  });
  ["navigation", "pagination", "scrollbar"].forEach((key) => {
    if (params[key] === true)
      params[key] = {};
    if (params[key] === false)
      delete params[key];
  });
  return {
    params,
    passedParams,
    rest,
    events: events2
  };
}
function mountSwiper(_ref, swiperParams) {
  let {
    el: el3,
    nextEl,
    prevEl,
    paginationEl,
    scrollbarEl,
    swiper
  } = _ref;
  if (needsNavigation(swiperParams) && nextEl && prevEl) {
    swiper.params.navigation.nextEl = nextEl;
    swiper.originalParams.navigation.nextEl = nextEl;
    swiper.params.navigation.prevEl = prevEl;
    swiper.originalParams.navigation.prevEl = prevEl;
  }
  if (needsPagination(swiperParams) && paginationEl) {
    swiper.params.pagination.el = paginationEl;
    swiper.originalParams.pagination.el = paginationEl;
  }
  if (needsScrollbar(swiperParams) && scrollbarEl) {
    swiper.params.scrollbar.el = scrollbarEl;
    swiper.originalParams.scrollbar.el = scrollbarEl;
  }
  swiper.init(el3);
}
function getChangedParams(swiperParams, oldParams, children, oldChildren, getKey) {
  const keys = [];
  if (!oldParams)
    return keys;
  const addKey = (key) => {
    if (keys.indexOf(key) < 0)
      keys.push(key);
  };
  if (children && oldChildren) {
    const oldChildrenKeys = oldChildren.map(getKey);
    const childrenKeys = children.map(getKey);
    if (oldChildrenKeys.join("") !== childrenKeys.join(""))
      addKey("children");
    if (oldChildren.length !== children.length)
      addKey("children");
  }
  const watchParams = paramsList.filter((key) => key[0] === "_").map((key) => key.replace(/_/, ""));
  watchParams.forEach((key) => {
    if (key in swiperParams && key in oldParams) {
      if (isObject3(swiperParams[key]) && isObject3(oldParams[key])) {
        const newKeys = Object.keys(swiperParams[key]);
        const oldKeys = Object.keys(oldParams[key]);
        if (newKeys.length !== oldKeys.length) {
          addKey(key);
        } else {
          newKeys.forEach((newKey) => {
            if (swiperParams[key][newKey] !== oldParams[key][newKey]) {
              addKey(key);
            }
          });
          oldKeys.forEach((oldKey) => {
            if (swiperParams[key][oldKey] !== oldParams[key][oldKey])
              addKey(key);
          });
        }
      } else if (swiperParams[key] !== oldParams[key]) {
        addKey(key);
      }
    }
  });
  return keys;
}
var updateOnVirtualData = (swiper) => {
  if (!swiper || swiper.destroyed || !swiper.params.virtual || swiper.params.virtual && !swiper.params.virtual.enabled)
    return;
  swiper.updateSlides();
  swiper.updateProgress();
  swiper.updateSlidesClasses();
  if (swiper.parallax && swiper.params.parallax && swiper.params.parallax.enabled) {
    swiper.parallax.setTranslate();
  }
};

// node_modules/.pnpm/swiper@10.2.0/node_modules/swiper/swiper-vue.mjs
function getChildren(originalSlots, slidesRef, oldSlidesRef) {
  if (originalSlots === void 0) {
    originalSlots = {};
  }
  const slides = [];
  const slots = {
    "container-start": [],
    "container-end": [],
    "wrapper-start": [],
    "wrapper-end": []
  };
  const getSlidesFromElements = (els, slotName) => {
    if (!Array.isArray(els)) {
      return;
    }
    els.forEach((vnode) => {
      const isFragment = typeof vnode.type === "symbol";
      if (slotName === "default")
        slotName = "container-end";
      if (isFragment && vnode.children) {
        getSlidesFromElements(vnode.children, slotName);
      } else if (vnode.type && (vnode.type.name === "SwiperSlide" || vnode.type.name === "AsyncComponentWrapper")) {
        slides.push(vnode);
      } else if (slots[slotName]) {
        slots[slotName].push(vnode);
      }
    });
  };
  Object.keys(originalSlots).forEach((slotName) => {
    if (typeof originalSlots[slotName] !== "function")
      return;
    const els = originalSlots[slotName]();
    getSlidesFromElements(els, slotName);
  });
  oldSlidesRef.value = slidesRef.value;
  slidesRef.value = slides;
  return {
    slides,
    slots
  };
}
function renderVirtual(swiperRef, slides, virtualData) {
  if (!virtualData)
    return null;
  const getSlideIndex = (index) => {
    let slideIndex = index;
    if (index < 0) {
      slideIndex = slides.length + index;
    } else if (slideIndex >= slides.length) {
      slideIndex = slideIndex - slides.length;
    }
    return slideIndex;
  };
  const style = swiperRef.value.isHorizontal() ? {
    [swiperRef.value.rtlTranslate ? "right" : "left"]: `${virtualData.offset}px`
  } : {
    top: `${virtualData.offset}px`
  };
  const {
    from,
    to: to3
  } = virtualData;
  const loopFrom = swiperRef.value.params.loop ? -slides.length : 0;
  const loopTo = swiperRef.value.params.loop ? slides.length * 2 : slides.length;
  const slidesToRender = [];
  for (let i3 = loopFrom; i3 < loopTo; i3 += 1) {
    if (i3 >= from && i3 <= to3) {
      slidesToRender.push(slides[getSlideIndex(i3)]);
    }
  }
  return slidesToRender.map((slide2) => {
    if (!slide2.props)
      slide2.props = {};
    if (!slide2.props.style)
      slide2.props.style = {};
    slide2.props.swiperRef = swiperRef;
    slide2.props.style = style;
    return h(slide2.type, {
      ...slide2.props
    }, slide2.children);
  });
}
var Swiper2 = {
  name: "Swiper",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    wrapperTag: {
      type: String,
      default: "div"
    },
    modules: {
      type: Array,
      default: void 0
    },
    init: {
      type: Boolean,
      default: void 0
    },
    direction: {
      type: String,
      default: void 0
    },
    oneWayMovement: {
      type: Boolean,
      default: void 0
    },
    touchEventsTarget: {
      type: String,
      default: void 0
    },
    initialSlide: {
      type: Number,
      default: void 0
    },
    speed: {
      type: Number,
      default: void 0
    },
    cssMode: {
      type: Boolean,
      default: void 0
    },
    updateOnWindowResize: {
      type: Boolean,
      default: void 0
    },
    resizeObserver: {
      type: Boolean,
      default: void 0
    },
    nested: {
      type: Boolean,
      default: void 0
    },
    focusableElements: {
      type: String,
      default: void 0
    },
    width: {
      type: Number,
      default: void 0
    },
    height: {
      type: Number,
      default: void 0
    },
    preventInteractionOnTransition: {
      type: Boolean,
      default: void 0
    },
    userAgent: {
      type: String,
      default: void 0
    },
    url: {
      type: String,
      default: void 0
    },
    edgeSwipeDetection: {
      type: [Boolean, String],
      default: void 0
    },
    edgeSwipeThreshold: {
      type: Number,
      default: void 0
    },
    autoHeight: {
      type: Boolean,
      default: void 0
    },
    setWrapperSize: {
      type: Boolean,
      default: void 0
    },
    virtualTranslate: {
      type: Boolean,
      default: void 0
    },
    effect: {
      type: String,
      default: void 0
    },
    breakpoints: {
      type: Object,
      default: void 0
    },
    spaceBetween: {
      type: [Number, String],
      default: void 0
    },
    slidesPerView: {
      type: [Number, String],
      default: void 0
    },
    maxBackfaceHiddenSlides: {
      type: Number,
      default: void 0
    },
    slidesPerGroup: {
      type: Number,
      default: void 0
    },
    slidesPerGroupSkip: {
      type: Number,
      default: void 0
    },
    slidesPerGroupAuto: {
      type: Boolean,
      default: void 0
    },
    centeredSlides: {
      type: Boolean,
      default: void 0
    },
    centeredSlidesBounds: {
      type: Boolean,
      default: void 0
    },
    slidesOffsetBefore: {
      type: Number,
      default: void 0
    },
    slidesOffsetAfter: {
      type: Number,
      default: void 0
    },
    normalizeSlideIndex: {
      type: Boolean,
      default: void 0
    },
    centerInsufficientSlides: {
      type: Boolean,
      default: void 0
    },
    watchOverflow: {
      type: Boolean,
      default: void 0
    },
    roundLengths: {
      type: Boolean,
      default: void 0
    },
    touchRatio: {
      type: Number,
      default: void 0
    },
    touchAngle: {
      type: Number,
      default: void 0
    },
    simulateTouch: {
      type: Boolean,
      default: void 0
    },
    shortSwipes: {
      type: Boolean,
      default: void 0
    },
    longSwipes: {
      type: Boolean,
      default: void 0
    },
    longSwipesRatio: {
      type: Number,
      default: void 0
    },
    longSwipesMs: {
      type: Number,
      default: void 0
    },
    followFinger: {
      type: Boolean,
      default: void 0
    },
    allowTouchMove: {
      type: Boolean,
      default: void 0
    },
    threshold: {
      type: Number,
      default: void 0
    },
    touchMoveStopPropagation: {
      type: Boolean,
      default: void 0
    },
    touchStartPreventDefault: {
      type: Boolean,
      default: void 0
    },
    touchStartForcePreventDefault: {
      type: Boolean,
      default: void 0
    },
    touchReleaseOnEdges: {
      type: Boolean,
      default: void 0
    },
    uniqueNavElements: {
      type: Boolean,
      default: void 0
    },
    resistance: {
      type: Boolean,
      default: void 0
    },
    resistanceRatio: {
      type: Number,
      default: void 0
    },
    watchSlidesProgress: {
      type: Boolean,
      default: void 0
    },
    grabCursor: {
      type: Boolean,
      default: void 0
    },
    preventClicks: {
      type: Boolean,
      default: void 0
    },
    preventClicksPropagation: {
      type: Boolean,
      default: void 0
    },
    slideToClickedSlide: {
      type: Boolean,
      default: void 0
    },
    loop: {
      type: Boolean,
      default: void 0
    },
    loopedSlides: {
      type: Number,
      default: void 0
    },
    loopPreventsSliding: {
      type: Boolean,
      default: void 0
    },
    rewind: {
      type: Boolean,
      default: void 0
    },
    allowSlidePrev: {
      type: Boolean,
      default: void 0
    },
    allowSlideNext: {
      type: Boolean,
      default: void 0
    },
    swipeHandler: {
      type: Boolean,
      default: void 0
    },
    noSwiping: {
      type: Boolean,
      default: void 0
    },
    noSwipingClass: {
      type: String,
      default: void 0
    },
    noSwipingSelector: {
      type: String,
      default: void 0
    },
    passiveListeners: {
      type: Boolean,
      default: void 0
    },
    containerModifierClass: {
      type: String,
      default: void 0
    },
    slideClass: {
      type: String,
      default: void 0
    },
    slideActiveClass: {
      type: String,
      default: void 0
    },
    slideVisibleClass: {
      type: String,
      default: void 0
    },
    slideNextClass: {
      type: String,
      default: void 0
    },
    slidePrevClass: {
      type: String,
      default: void 0
    },
    wrapperClass: {
      type: String,
      default: void 0
    },
    lazyPreloaderClass: {
      type: String,
      default: void 0
    },
    lazyPreloadPrevNext: {
      type: Number,
      default: void 0
    },
    runCallbacksOnInit: {
      type: Boolean,
      default: void 0
    },
    observer: {
      type: Boolean,
      default: void 0
    },
    observeParents: {
      type: Boolean,
      default: void 0
    },
    observeSlideChildren: {
      type: Boolean,
      default: void 0
    },
    a11y: {
      type: [Boolean, Object],
      default: void 0
    },
    autoplay: {
      type: [Boolean, Object],
      default: void 0
    },
    controller: {
      type: Object,
      default: void 0
    },
    coverflowEffect: {
      type: Object,
      default: void 0
    },
    cubeEffect: {
      type: Object,
      default: void 0
    },
    fadeEffect: {
      type: Object,
      default: void 0
    },
    flipEffect: {
      type: Object,
      default: void 0
    },
    creativeEffect: {
      type: Object,
      default: void 0
    },
    cardsEffect: {
      type: Object,
      default: void 0
    },
    hashNavigation: {
      type: [Boolean, Object],
      default: void 0
    },
    history: {
      type: [Boolean, Object],
      default: void 0
    },
    keyboard: {
      type: [Boolean, Object],
      default: void 0
    },
    mousewheel: {
      type: [Boolean, Object],
      default: void 0
    },
    navigation: {
      type: [Boolean, Object],
      default: void 0
    },
    pagination: {
      type: [Boolean, Object],
      default: void 0
    },
    parallax: {
      type: [Boolean, Object],
      default: void 0
    },
    scrollbar: {
      type: [Boolean, Object],
      default: void 0
    },
    thumbs: {
      type: Object,
      default: void 0
    },
    virtual: {
      type: [Boolean, Object],
      default: void 0
    },
    zoom: {
      type: [Boolean, Object],
      default: void 0
    },
    grid: {
      type: [Object],
      default: void 0
    },
    freeMode: {
      type: [Boolean, Object],
      default: void 0
    },
    enabled: {
      type: Boolean,
      default: void 0
    }
  },
  emits: ["_beforeBreakpoint", "_containerClasses", "_slideClass", "_slideClasses", "_swiper", "_freeModeNoMomentumRelease", "activeIndexChange", "afterInit", "autoplay", "autoplayStart", "autoplayStop", "autoplayPause", "autoplayResume", "autoplayTimeLeft", "beforeDestroy", "beforeInit", "beforeLoopFix", "beforeResize", "beforeSlideChangeStart", "beforeTransitionStart", "breakpoint", "changeDirection", "click", "disable", "doubleTap", "doubleClick", "destroy", "enable", "fromEdge", "hashChange", "hashSet", "init", "keyPress", "lock", "loopFix", "momentumBounce", "navigationHide", "navigationShow", "navigationPrev", "navigationNext", "observerUpdate", "orientationchange", "paginationHide", "paginationRender", "paginationShow", "paginationUpdate", "progress", "reachBeginning", "reachEnd", "realIndexChange", "resize", "scroll", "scrollbarDragEnd", "scrollbarDragMove", "scrollbarDragStart", "setTransition", "setTranslate", "slideChange", "slideChangeTransitionEnd", "slideChangeTransitionStart", "slideNextTransitionEnd", "slideNextTransitionStart", "slidePrevTransitionEnd", "slidePrevTransitionStart", "slideResetTransitionStart", "slideResetTransitionEnd", "sliderMove", "sliderFirstMove", "slidesLengthChange", "slidesGridLengthChange", "snapGridLengthChange", "snapIndexChange", "swiper", "tap", "toEdge", "touchEnd", "touchMove", "touchMoveOpposite", "touchStart", "transitionEnd", "transitionStart", "unlock", "update", "virtualUpdate", "zoomChange"],
  setup(props, _ref) {
    let {
      slots: originalSlots,
      emit
    } = _ref;
    const {
      tag: Tag,
      wrapperTag: WrapperTag
    } = props;
    const containerClasses = ref("swiper");
    const virtualData = ref(null);
    const breakpointChanged = ref(false);
    const initializedRef = ref(false);
    const swiperElRef = ref(null);
    const swiperRef = ref(null);
    const oldPassedParamsRef = ref(null);
    const slidesRef = {
      value: []
    };
    const oldSlidesRef = {
      value: []
    };
    const nextElRef = ref(null);
    const prevElRef = ref(null);
    const paginationElRef = ref(null);
    const scrollbarElRef = ref(null);
    const {
      params: swiperParams,
      passedParams
    } = getParams(props, false);
    getChildren(originalSlots, slidesRef, oldSlidesRef);
    oldPassedParamsRef.value = passedParams;
    oldSlidesRef.value = slidesRef.value;
    const onBeforeBreakpoint = () => {
      getChildren(originalSlots, slidesRef, oldSlidesRef);
      breakpointChanged.value = true;
    };
    swiperParams.onAny = function(event2) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      emit(event2, ...args);
    };
    Object.assign(swiperParams.on, {
      _beforeBreakpoint: onBeforeBreakpoint,
      _containerClasses(swiper, classes2) {
        containerClasses.value = classes2;
      }
    });
    const passParams = {
      ...swiperParams
    };
    delete passParams.wrapperClass;
    swiperRef.value = new Swiper(passParams);
    if (swiperRef.value.virtual && swiperRef.value.params.virtual.enabled) {
      swiperRef.value.virtual.slides = slidesRef.value;
      const extendWith = {
        cache: false,
        slides: slidesRef.value,
        renderExternal: (data) => {
          virtualData.value = data;
        },
        renderExternalUpdate: false
      };
      extend3(swiperRef.value.params.virtual, extendWith);
      extend3(swiperRef.value.originalParams.virtual, extendWith);
    }
    onUpdated(() => {
      if (!initializedRef.value && swiperRef.value) {
        swiperRef.value.emitSlidesClasses();
        initializedRef.value = true;
      }
      const {
        passedParams: newPassedParams
      } = getParams(props, false);
      const changedParams = getChangedParams(newPassedParams, oldPassedParamsRef.value, slidesRef.value, oldSlidesRef.value, (c3) => c3.props && c3.props.key);
      oldPassedParamsRef.value = newPassedParams;
      if ((changedParams.length || breakpointChanged.value) && swiperRef.value && !swiperRef.value.destroyed) {
        updateSwiper({
          swiper: swiperRef.value,
          slides: slidesRef.value,
          passedParams: newPassedParams,
          changedParams,
          nextEl: nextElRef.value,
          prevEl: prevElRef.value,
          scrollbarEl: scrollbarElRef.value,
          paginationEl: paginationElRef.value
        });
      }
      breakpointChanged.value = false;
    });
    provide("swiper", swiperRef);
    watch(virtualData, () => {
      nextTick(() => {
        updateOnVirtualData(swiperRef.value);
      });
    });
    onMounted(() => {
      if (!swiperElRef.value)
        return;
      mountSwiper({
        el: swiperElRef.value,
        nextEl: nextElRef.value,
        prevEl: prevElRef.value,
        paginationEl: paginationElRef.value,
        scrollbarEl: scrollbarElRef.value,
        swiper: swiperRef.value
      }, swiperParams);
      emit("swiper", swiperRef.value);
    });
    onBeforeUnmount(() => {
      if (swiperRef.value && !swiperRef.value.destroyed) {
        swiperRef.value.destroy(true, false);
      }
    });
    function renderSlides(slides) {
      if (swiperParams.virtual) {
        return renderVirtual(swiperRef, slides, virtualData.value);
      }
      slides.forEach((slide2, index) => {
        if (!slide2.props)
          slide2.props = {};
        slide2.props.swiperRef = swiperRef;
        slide2.props.swiperSlideIndex = index;
      });
      return slides;
    }
    return () => {
      const {
        slides,
        slots
      } = getChildren(originalSlots, slidesRef, oldSlidesRef);
      return h(Tag, {
        ref: swiperElRef,
        class: uniqueClasses(containerClasses.value)
      }, [slots["container-start"], h(WrapperTag, {
        class: wrapperClass(swiperParams.wrapperClass)
      }, [slots["wrapper-start"], renderSlides(slides), slots["wrapper-end"]]), needsNavigation(props) && [h("div", {
        ref: prevElRef,
        class: "swiper-button-prev"
      }), h("div", {
        ref: nextElRef,
        class: "swiper-button-next"
      })], needsScrollbar(props) && h("div", {
        ref: scrollbarElRef,
        class: "swiper-scrollbar"
      }), needsPagination(props) && h("div", {
        ref: paginationElRef,
        class: "swiper-pagination"
      }), slots["container-end"]]);
    };
  }
};
var SwiperSlide = {
  name: "SwiperSlide",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    swiperRef: {
      type: Object,
      required: false
    },
    swiperSlideIndex: {
      type: Number,
      default: void 0,
      required: false
    },
    zoom: {
      type: Boolean,
      default: void 0,
      required: false
    },
    lazy: {
      type: Boolean,
      default: false,
      required: false
    },
    virtualIndex: {
      type: [String, Number],
      default: void 0
    }
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    let eventAttached = false;
    const {
      swiperRef
    } = props;
    const slideElRef = ref(null);
    const slideClasses = ref("swiper-slide");
    const lazyLoaded = ref(false);
    function updateClasses(swiper, el3, classNames) {
      if (el3 === slideElRef.value) {
        slideClasses.value = classNames;
      }
    }
    onMounted(() => {
      if (!swiperRef || !swiperRef.value)
        return;
      swiperRef.value.on("_slideClass", updateClasses);
      eventAttached = true;
    });
    onBeforeUpdate(() => {
      if (eventAttached || !swiperRef || !swiperRef.value)
        return;
      swiperRef.value.on("_slideClass", updateClasses);
      eventAttached = true;
    });
    onUpdated(() => {
      if (!slideElRef.value || !swiperRef || !swiperRef.value)
        return;
      if (typeof props.swiperSlideIndex !== "undefined") {
        slideElRef.value.swiperSlideIndex = props.swiperSlideIndex;
      }
      if (swiperRef.value.destroyed) {
        if (slideClasses.value !== "swiper-slide") {
          slideClasses.value = "swiper-slide";
        }
      }
    });
    onBeforeUnmount(() => {
      if (!swiperRef || !swiperRef.value)
        return;
      swiperRef.value.off("_slideClass", updateClasses);
    });
    const slideData = computed(() => ({
      isActive: slideClasses.value.indexOf("swiper-slide-active") >= 0,
      isVisible: slideClasses.value.indexOf("swiper-slide-visible") >= 0,
      isPrev: slideClasses.value.indexOf("swiper-slide-prev") >= 0,
      isNext: slideClasses.value.indexOf("swiper-slide-next") >= 0
    }));
    provide("swiperSlide", slideData);
    const onLoad2 = () => {
      lazyLoaded.value = true;
    };
    return () => {
      return h(props.tag, {
        class: uniqueClasses(`${slideClasses.value}`),
        ref: slideElRef,
        "data-swiper-slide-index": typeof props.virtualIndex === "undefined" && swiperRef && swiperRef.value && swiperRef.value.params.loop ? props.swiperSlideIndex : props.virtualIndex,
        onLoadCapture: onLoad2
      }, props.zoom ? h("div", {
        class: "swiper-zoom-container",
        "data-swiper-zoom": typeof props.zoom === "number" ? props.zoom : void 0
      }, [slots.default && slots.default(slideData.value), props.lazy && !lazyLoaded.value && h("div", {
        class: "swiper-lazy-preloader"
      })]) : [slots.default && slots.default(slideData.value), props.lazy && !lazyLoaded.value && h("div", {
        class: "swiper-lazy-preloader"
      })]);
    };
  }
};

// node_modules/.pnpm/swiper@10.2.0/node_modules/swiper/shared/create-element-if-not-defined.mjs
function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
  if (swiper.params.createElements) {
    Object.keys(checkProps).forEach((key) => {
      if (!params[key] && params.auto === true) {
        let element = elementChildren(swiper.el, `.${checkProps[key]}`)[0];
        if (!element) {
          element = createElement("div", checkProps[key]);
          element.className = checkProps[key];
          swiper.el.append(element);
        }
        params[key] = element;
        originalParams[key] = element;
      }
    });
  }
  return params;
}

// node_modules/.pnpm/swiper@10.2.0/node_modules/swiper/modules/navigation.mjs
function Navigation(_ref) {
  let {
    swiper,
    extendParams,
    on: on3,
    emit
  } = _ref;
  extendParams({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: false,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled"
    }
  });
  swiper.navigation = {
    nextEl: null,
    prevEl: null
  };
  const makeElementsArray = (el3) => (Array.isArray(el3) ? el3 : [el3]).filter((e3) => !!e3);
  function getEl(el3) {
    let res;
    if (el3 && typeof el3 === "string" && swiper.isElement) {
      res = swiper.el.querySelector(el3);
      if (res)
        return res;
    }
    if (el3) {
      if (typeof el3 === "string")
        res = [...document.querySelectorAll(el3)];
      if (swiper.params.uniqueNavElements && typeof el3 === "string" && res.length > 1 && swiper.el.querySelectorAll(el3).length === 1) {
        res = swiper.el.querySelector(el3);
      }
    }
    if (el3 && !res)
      return el3;
    return res;
  }
  function toggleEl(el3, disabled) {
    const params = swiper.params.navigation;
    el3 = makeElementsArray(el3);
    el3.forEach((subEl) => {
      if (subEl) {
        subEl.classList[disabled ? "add" : "remove"](...params.disabledClass.split(" "));
        if (subEl.tagName === "BUTTON")
          subEl.disabled = disabled;
        if (swiper.params.watchOverflow && swiper.enabled) {
          subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
        }
      }
    });
  }
  function update2() {
    const {
      nextEl,
      prevEl
    } = swiper.navigation;
    if (swiper.params.loop) {
      toggleEl(prevEl, false);
      toggleEl(nextEl, false);
      return;
    }
    toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
    toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
  }
  function onPrevClick(e3) {
    e3.preventDefault();
    if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind)
      return;
    swiper.slidePrev();
    emit("navigationPrev");
  }
  function onNextClick(e3) {
    e3.preventDefault();
    if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind)
      return;
    swiper.slideNext();
    emit("navigationNext");
  }
  function init() {
    const params = swiper.params.navigation;
    swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
      nextEl: "swiper-button-next",
      prevEl: "swiper-button-prev"
    });
    if (!(params.nextEl || params.prevEl))
      return;
    let nextEl = getEl(params.nextEl);
    let prevEl = getEl(params.prevEl);
    Object.assign(swiper.navigation, {
      nextEl,
      prevEl
    });
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const initButton = (el3, dir) => {
      if (el3) {
        el3.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
      }
      if (!swiper.enabled && el3) {
        el3.classList.add(...params.lockClass.split(" "));
      }
    };
    nextEl.forEach((el3) => initButton(el3, "next"));
    prevEl.forEach((el3) => initButton(el3, "prev"));
  }
  function destroy() {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const destroyButton = (el3, dir) => {
      el3.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
      el3.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
    };
    nextEl.forEach((el3) => destroyButton(el3, "next"));
    prevEl.forEach((el3) => destroyButton(el3, "prev"));
  }
  on3("init", () => {
    if (swiper.params.navigation.enabled === false) {
      disable();
    } else {
      init();
      update2();
    }
  });
  on3("toEdge fromEdge lock unlock", () => {
    update2();
  });
  on3("destroy", () => {
    destroy();
  });
  on3("enable disable", () => {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    [...nextEl, ...prevEl].filter((el3) => !!el3).forEach((el3) => el3.classList[swiper.enabled ? "remove" : "add"](swiper.params.navigation.lockClass));
  });
  on3("click", (_s2, e3) => {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const targetEl = e3.target;
    if (swiper.params.navigation.hideOnClick && !prevEl.includes(targetEl) && !nextEl.includes(targetEl)) {
      if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl)))
        return;
      let isHidden;
      if (nextEl.length) {
        isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass);
      } else if (prevEl.length) {
        isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
      }
      if (isHidden === true) {
        emit("navigationShow");
      } else {
        emit("navigationHide");
      }
      [...nextEl, ...prevEl].filter((el3) => !!el3).forEach((el3) => el3.classList.toggle(swiper.params.navigation.hiddenClass));
    }
  });
  const enable = () => {
    swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(" "));
    init();
    update2();
  };
  const disable = () => {
    swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(" "));
    destroy();
  };
  Object.assign(swiper.navigation, {
    enable,
    disable,
    update: update2,
    init,
    destroy
  });
}

// node_modules/.pnpm/swiper@10.2.0/node_modules/swiper/shared/classes-to-selector.mjs
function classesToSelector(classes2) {
  if (classes2 === void 0) {
    classes2 = "";
  }
  return `.${classes2.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
}

// node_modules/.pnpm/swiper@10.2.0/node_modules/swiper/modules/pagination.mjs
function Pagination(_ref) {
  let {
    swiper,
    extendParams,
    on: on3,
    emit
  } = _ref;
  const pfx = "swiper-pagination";
  extendParams({
    pagination: {
      el: null,
      bulletElement: "span",
      clickable: false,
      hideOnClick: false,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: false,
      type: "bullets",
      // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: false,
      dynamicMainBullets: 1,
      formatFractionCurrent: (number) => number,
      formatFractionTotal: (number) => number,
      bulletClass: `${pfx}-bullet`,
      bulletActiveClass: `${pfx}-bullet-active`,
      modifierClass: `${pfx}-`,
      currentClass: `${pfx}-current`,
      totalClass: `${pfx}-total`,
      hiddenClass: `${pfx}-hidden`,
      progressbarFillClass: `${pfx}-progressbar-fill`,
      progressbarOppositeClass: `${pfx}-progressbar-opposite`,
      clickableClass: `${pfx}-clickable`,
      lockClass: `${pfx}-lock`,
      horizontalClass: `${pfx}-horizontal`,
      verticalClass: `${pfx}-vertical`,
      paginationDisabledClass: `${pfx}-disabled`
    }
  });
  swiper.pagination = {
    el: null,
    bullets: []
  };
  let bulletSize;
  let dynamicBulletIndex = 0;
  const makeElementsArray = (el3) => (Array.isArray(el3) ? el3 : [el3]).filter((e3) => !!e3);
  function isPaginationDisabled() {
    return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && swiper.pagination.el.length === 0;
  }
  function setSideBullets(bulletEl, position) {
    const {
      bulletActiveClass
    } = swiper.params.pagination;
    if (!bulletEl)
      return;
    bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
    if (bulletEl) {
      bulletEl.classList.add(`${bulletActiveClass}-${position}`);
      bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
      if (bulletEl) {
        bulletEl.classList.add(`${bulletActiveClass}-${position}-${position}`);
      }
    }
  }
  function onBulletClick(e3) {
    const bulletEl = e3.target.closest(classesToSelector(swiper.params.pagination.bulletClass));
    if (!bulletEl) {
      return;
    }
    e3.preventDefault();
    const index = elementIndex(bulletEl) * swiper.params.slidesPerGroup;
    if (swiper.params.loop) {
      if (swiper.realIndex === index)
        return;
      const realIndex = swiper.realIndex;
      const newSlideIndex = swiper.getSlideIndexByData(index);
      const currentSlideIndex = swiper.getSlideIndexByData(swiper.realIndex);
      if (newSlideIndex > swiper.slides.length - swiper.loopedSlides) {
        const indexBeforeLoopFix = swiper.activeIndex;
        swiper.loopFix({
          direction: newSlideIndex > currentSlideIndex ? "next" : "prev",
          activeSlideIndex: newSlideIndex,
          slideTo: false
        });
        const indexAfterFix = swiper.activeIndex;
        if (indexBeforeLoopFix === indexAfterFix) {
          swiper.slideToLoop(realIndex, 0, false, true);
        }
      }
      swiper.slideToLoop(index);
    } else {
      swiper.slideTo(index);
    }
  }
  function update2() {
    const rtl = swiper.rtl;
    const params = swiper.params.pagination;
    if (isPaginationDisabled())
      return;
    let el3 = swiper.pagination.el;
    el3 = makeElementsArray(el3);
    let current;
    let previousIndex;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    const total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
    if (swiper.params.loop) {
      previousIndex = swiper.previousRealIndex || 0;
      current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex;
    } else if (typeof swiper.snapIndex !== "undefined") {
      current = swiper.snapIndex;
      previousIndex = swiper.previousSnapIndex;
    } else {
      previousIndex = swiper.previousIndex || 0;
      current = swiper.activeIndex || 0;
    }
    if (params.type === "bullets" && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
      const bullets = swiper.pagination.bullets;
      let firstIndex;
      let lastIndex;
      let midIndex;
      if (params.dynamicBullets) {
        bulletSize = elementOuterSize(bullets[0], swiper.isHorizontal() ? "width" : "height", true);
        el3.forEach((subEl) => {
          subEl.style[swiper.isHorizontal() ? "width" : "height"] = `${bulletSize * (params.dynamicMainBullets + 4)}px`;
        });
        if (params.dynamicMainBullets > 1 && previousIndex !== void 0) {
          dynamicBulletIndex += current - (previousIndex || 0);
          if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
            dynamicBulletIndex = params.dynamicMainBullets - 1;
          } else if (dynamicBulletIndex < 0) {
            dynamicBulletIndex = 0;
          }
        }
        firstIndex = Math.max(current - dynamicBulletIndex, 0);
        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
        midIndex = (lastIndex + firstIndex) / 2;
      }
      bullets.forEach((bulletEl) => {
        const classesToRemove = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((suffix) => `${params.bulletActiveClass}${suffix}`)].map((s3) => typeof s3 === "string" && s3.includes(" ") ? s3.split(" ") : s3).flat();
        bulletEl.classList.remove(...classesToRemove);
      });
      if (el3.length > 1) {
        bullets.forEach((bullet) => {
          const bulletIndex = elementIndex(bullet);
          if (bulletIndex === current) {
            bullet.classList.add(...params.bulletActiveClass.split(" "));
          } else if (swiper.isElement) {
            bullet.setAttribute("part", "bullet");
          }
          if (params.dynamicBullets) {
            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
              bullet.classList.add(...`${params.bulletActiveClass}-main`.split(" "));
            }
            if (bulletIndex === firstIndex) {
              setSideBullets(bullet, "prev");
            }
            if (bulletIndex === lastIndex) {
              setSideBullets(bullet, "next");
            }
          }
        });
      } else {
        const bullet = bullets[current];
        if (bullet) {
          bullet.classList.add(...params.bulletActiveClass.split(" "));
        }
        if (swiper.isElement) {
          bullets.forEach((bulletEl, bulletIndex) => {
            bulletEl.setAttribute("part", bulletIndex === current ? "bullet-active" : "bullet");
          });
        }
        if (params.dynamicBullets) {
          const firstDisplayedBullet = bullets[firstIndex];
          const lastDisplayedBullet = bullets[lastIndex];
          for (let i3 = firstIndex; i3 <= lastIndex; i3 += 1) {
            if (bullets[i3]) {
              bullets[i3].classList.add(...`${params.bulletActiveClass}-main`.split(" "));
            }
          }
          setSideBullets(firstDisplayedBullet, "prev");
          setSideBullets(lastDisplayedBullet, "next");
        }
      }
      if (params.dynamicBullets) {
        const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
        const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
        const offsetProp = rtl ? "right" : "left";
        bullets.forEach((bullet) => {
          bullet.style[swiper.isHorizontal() ? offsetProp : "top"] = `${bulletsOffset}px`;
        });
      }
    }
    el3.forEach((subEl, subElIndex) => {
      if (params.type === "fraction") {
        subEl.querySelectorAll(classesToSelector(params.currentClass)).forEach((fractionEl) => {
          fractionEl.textContent = params.formatFractionCurrent(current + 1);
        });
        subEl.querySelectorAll(classesToSelector(params.totalClass)).forEach((totalEl) => {
          totalEl.textContent = params.formatFractionTotal(total);
        });
      }
      if (params.type === "progressbar") {
        let progressbarDirection;
        if (params.progressbarOpposite) {
          progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal";
        } else {
          progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
        }
        const scale = (current + 1) / total;
        let scaleX = 1;
        let scaleY = 1;
        if (progressbarDirection === "horizontal") {
          scaleX = scale;
        } else {
          scaleY = scale;
        }
        subEl.querySelectorAll(classesToSelector(params.progressbarFillClass)).forEach((progressEl) => {
          progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
          progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
        });
      }
      if (params.type === "custom" && params.renderCustom) {
        subEl.innerHTML = params.renderCustom(swiper, current + 1, total);
        if (subElIndex === 0)
          emit("paginationRender", subEl);
      } else {
        if (subElIndex === 0)
          emit("paginationRender", subEl);
        emit("paginationUpdate", subEl);
      }
      if (swiper.params.watchOverflow && swiper.enabled) {
        subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
      }
    });
  }
  function render2() {
    const params = swiper.params.pagination;
    if (isPaginationDisabled())
      return;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    let el3 = swiper.pagination.el;
    el3 = makeElementsArray(el3);
    let paginationHTML = "";
    if (params.type === "bullets") {
      let numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) {
        numberOfBullets = slidesLength;
      }
      for (let i3 = 0; i3 < numberOfBullets; i3 += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(swiper, i3, params.bulletClass);
        } else {
          paginationHTML += `<${params.bulletElement} ${swiper.isElement ? 'part="bullet"' : ""} class="${params.bulletClass}"></${params.bulletElement}>`;
        }
      }
    }
    if (params.type === "fraction") {
      if (params.renderFraction) {
        paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
      } else {
        paginationHTML = `<span class="${params.currentClass}"></span> / <span class="${params.totalClass}"></span>`;
      }
    }
    if (params.type === "progressbar") {
      if (params.renderProgressbar) {
        paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
      } else {
        paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
      }
    }
    swiper.pagination.bullets = [];
    el3.forEach((subEl) => {
      if (params.type !== "custom") {
        subEl.innerHTML = paginationHTML || "";
      }
      if (params.type === "bullets") {
        swiper.pagination.bullets.push(...subEl.querySelectorAll(classesToSelector(params.bulletClass)));
      }
    });
    if (params.type !== "custom") {
      emit("paginationRender", el3[0]);
    }
  }
  function init() {
    swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
      el: "swiper-pagination"
    });
    const params = swiper.params.pagination;
    if (!params.el)
      return;
    let el3;
    if (typeof params.el === "string" && swiper.isElement) {
      el3 = swiper.el.querySelector(params.el);
    }
    if (!el3 && typeof params.el === "string") {
      el3 = [...document.querySelectorAll(params.el)];
    }
    if (!el3) {
      el3 = params.el;
    }
    if (!el3 || el3.length === 0)
      return;
    if (swiper.params.uniqueNavElements && typeof params.el === "string" && Array.isArray(el3) && el3.length > 1) {
      el3 = [...swiper.el.querySelectorAll(params.el)];
      if (el3.length > 1) {
        el3 = el3.filter((subEl) => {
          if (elementParents(subEl, ".swiper")[0] !== swiper.el)
            return false;
          return true;
        })[0];
      }
    }
    if (Array.isArray(el3) && el3.length === 1)
      el3 = el3[0];
    Object.assign(swiper.pagination, {
      el: el3
    });
    el3 = makeElementsArray(el3);
    el3.forEach((subEl) => {
      if (params.type === "bullets" && params.clickable) {
        subEl.classList.add(...(params.clickableClass || "").split(" "));
      }
      subEl.classList.add(params.modifierClass + params.type);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
      if (params.type === "bullets" && params.dynamicBullets) {
        subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
        dynamicBulletIndex = 0;
        if (params.dynamicMainBullets < 1) {
          params.dynamicMainBullets = 1;
        }
      }
      if (params.type === "progressbar" && params.progressbarOpposite) {
        subEl.classList.add(params.progressbarOppositeClass);
      }
      if (params.clickable) {
        subEl.addEventListener("click", onBulletClick);
      }
      if (!swiper.enabled) {
        subEl.classList.add(params.lockClass);
      }
    });
  }
  function destroy() {
    const params = swiper.params.pagination;
    if (isPaginationDisabled())
      return;
    let el3 = swiper.pagination.el;
    if (el3) {
      el3 = makeElementsArray(el3);
      el3.forEach((subEl) => {
        subEl.classList.remove(params.hiddenClass);
        subEl.classList.remove(params.modifierClass + params.type);
        subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        if (params.clickable) {
          subEl.classList.remove(...(params.clickableClass || "").split(" "));
          subEl.removeEventListener("click", onBulletClick);
        }
      });
    }
    if (swiper.pagination.bullets)
      swiper.pagination.bullets.forEach((subEl) => subEl.classList.remove(...params.bulletActiveClass.split(" ")));
  }
  on3("changeDirection", () => {
    if (!swiper.pagination || !swiper.pagination.el)
      return;
    const params = swiper.params.pagination;
    let {
      el: el3
    } = swiper.pagination;
    el3 = makeElementsArray(el3);
    el3.forEach((subEl) => {
      subEl.classList.remove(params.horizontalClass, params.verticalClass);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    });
  });
  on3("init", () => {
    if (swiper.params.pagination.enabled === false) {
      disable();
    } else {
      init();
      render2();
      update2();
    }
  });
  on3("activeIndexChange", () => {
    if (typeof swiper.snapIndex === "undefined") {
      update2();
    }
  });
  on3("snapIndexChange", () => {
    update2();
  });
  on3("snapGridLengthChange", () => {
    render2();
    update2();
  });
  on3("destroy", () => {
    destroy();
  });
  on3("enable disable", () => {
    let {
      el: el3
    } = swiper.pagination;
    if (el3) {
      el3 = makeElementsArray(el3);
      el3.forEach((subEl) => subEl.classList[swiper.enabled ? "remove" : "add"](swiper.params.pagination.lockClass));
    }
  });
  on3("lock unlock", () => {
    update2();
  });
  on3("click", (_s2, e3) => {
    const targetEl = e3.target;
    const el3 = makeElementsArray(swiper.pagination.el);
    if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el3 && el3.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
      if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl))
        return;
      const isHidden = el3[0].classList.contains(swiper.params.pagination.hiddenClass);
      if (isHidden === true) {
        emit("paginationShow");
      } else {
        emit("paginationHide");
      }
      el3.forEach((subEl) => subEl.classList.toggle(swiper.params.pagination.hiddenClass));
    }
  });
  const enable = () => {
    swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
    let {
      el: el3
    } = swiper.pagination;
    if (el3) {
      el3 = makeElementsArray(el3);
      el3.forEach((subEl) => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass));
    }
    init();
    render2();
    update2();
  };
  const disable = () => {
    swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
    let {
      el: el3
    } = swiper.pagination;
    if (el3) {
      el3 = makeElementsArray(el3);
      el3.forEach((subEl) => subEl.classList.add(swiper.params.pagination.paginationDisabledClass));
    }
    destroy();
  };
  Object.assign(swiper.pagination, {
    enable,
    disable,
    render: render2,
    update: update2,
    init,
    destroy
  });
}

// node_modules/.pnpm/swiper@10.2.0/node_modules/swiper/modules/autoplay.mjs
function Autoplay(_ref) {
  let {
    swiper,
    extendParams,
    on: on3,
    emit,
    params
  } = _ref;
  swiper.autoplay = {
    running: false,
    paused: false,
    timeLeft: 0
  };
  extendParams({
    autoplay: {
      enabled: false,
      delay: 3e3,
      waitForTransition: true,
      disableOnInteraction: true,
      stopOnLastSlide: false,
      reverseDirection: false,
      pauseOnMouseEnter: false
    }
  });
  let timeout;
  let raf;
  let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3e3;
  let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3e3;
  let autoplayTimeLeft;
  let autoplayStartTime = (/* @__PURE__ */ new Date()).getTime;
  let wasPaused;
  let isTouched;
  let pausedByTouch;
  let touchStartTimeout;
  let slideChanged;
  let pausedByInteraction;
  function onTransitionEnd(e3) {
    if (!swiper || swiper.destroyed || !swiper.wrapperEl)
      return;
    if (e3.target !== swiper.wrapperEl)
      return;
    swiper.wrapperEl.removeEventListener("transitionend", onTransitionEnd);
    resume();
  }
  const calcTimeLeft = () => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    if (swiper.autoplay.paused) {
      wasPaused = true;
    } else if (wasPaused) {
      autoplayDelayCurrent = autoplayTimeLeft;
      wasPaused = false;
    }
    const timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - (/* @__PURE__ */ new Date()).getTime();
    swiper.autoplay.timeLeft = timeLeft;
    emit("autoplayTimeLeft", timeLeft, timeLeft / autoplayDelayTotal);
    raf = requestAnimationFrame(() => {
      calcTimeLeft();
    });
  };
  const getSlideDelay = () => {
    let activeSlideEl;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      activeSlideEl = swiper.slides.filter((slideEl) => slideEl.classList.contains("swiper-slide-active"))[0];
    } else {
      activeSlideEl = swiper.slides[swiper.activeIndex];
    }
    if (!activeSlideEl)
      return void 0;
    const currentSlideDelay = parseInt(activeSlideEl.getAttribute("data-swiper-autoplay"), 10);
    return currentSlideDelay;
  };
  const run = (delayForce) => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    cancelAnimationFrame(raf);
    calcTimeLeft();
    let delay = typeof delayForce === "undefined" ? swiper.params.autoplay.delay : delayForce;
    autoplayDelayTotal = swiper.params.autoplay.delay;
    autoplayDelayCurrent = swiper.params.autoplay.delay;
    const currentSlideDelay = getSlideDelay();
    if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce === "undefined") {
      delay = currentSlideDelay;
      autoplayDelayTotal = currentSlideDelay;
      autoplayDelayCurrent = currentSlideDelay;
    }
    autoplayTimeLeft = delay;
    const speed = swiper.params.speed;
    const proceed = () => {
      if (!swiper || swiper.destroyed)
        return;
      if (swiper.params.autoplay.reverseDirection) {
        if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
          swiper.slidePrev(speed, true, true);
          emit("autoplay");
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(swiper.slides.length - 1, speed, true, true);
          emit("autoplay");
        }
      } else {
        if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
          swiper.slideNext(speed, true, true);
          emit("autoplay");
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(0, speed, true, true);
          emit("autoplay");
        }
      }
      if (swiper.params.cssMode) {
        autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
        requestAnimationFrame(() => {
          run();
        });
      }
    };
    if (delay > 0) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        proceed();
      }, delay);
    } else {
      requestAnimationFrame(() => {
        proceed();
      });
    }
    return delay;
  };
  const start = () => {
    swiper.autoplay.running = true;
    run();
    emit("autoplayStart");
  };
  const stop = () => {
    swiper.autoplay.running = false;
    clearTimeout(timeout);
    cancelAnimationFrame(raf);
    emit("autoplayStop");
  };
  const pause = (internal, reset) => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    clearTimeout(timeout);
    if (!internal) {
      pausedByInteraction = true;
    }
    const proceed = () => {
      emit("autoplayPause");
      if (swiper.params.autoplay.waitForTransition) {
        swiper.wrapperEl.addEventListener("transitionend", onTransitionEnd);
      } else {
        resume();
      }
    };
    swiper.autoplay.paused = true;
    if (reset) {
      if (slideChanged) {
        autoplayTimeLeft = swiper.params.autoplay.delay;
      }
      slideChanged = false;
      proceed();
      return;
    }
    const delay = autoplayTimeLeft || swiper.params.autoplay.delay;
    autoplayTimeLeft = delay - ((/* @__PURE__ */ new Date()).getTime() - autoplayStartTime);
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop)
      return;
    if (autoplayTimeLeft < 0)
      autoplayTimeLeft = 0;
    proceed();
  };
  const resume = () => {
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running)
      return;
    autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
    if (pausedByInteraction) {
      pausedByInteraction = false;
      run(autoplayTimeLeft);
    } else {
      run();
    }
    swiper.autoplay.paused = false;
    emit("autoplayResume");
  };
  const onVisibilityChange = () => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    const document2 = getDocument();
    if (document2.visibilityState === "hidden") {
      pausedByInteraction = true;
      pause(true);
    }
    if (document2.visibilityState === "visible") {
      resume();
    }
  };
  const onPointerEnter = (e3) => {
    if (e3.pointerType !== "mouse")
      return;
    pausedByInteraction = true;
    if (swiper.animating || swiper.autoplay.paused)
      return;
    pause(true);
  };
  const onPointerLeave = (e3) => {
    if (e3.pointerType !== "mouse")
      return;
    if (swiper.autoplay.paused) {
      resume();
    }
  };
  const attachMouseEvents = () => {
    if (swiper.params.autoplay.pauseOnMouseEnter) {
      swiper.el.addEventListener("pointerenter", onPointerEnter);
      swiper.el.addEventListener("pointerleave", onPointerLeave);
    }
  };
  const detachMouseEvents = () => {
    swiper.el.removeEventListener("pointerenter", onPointerEnter);
    swiper.el.removeEventListener("pointerleave", onPointerLeave);
  };
  const attachDocumentEvents = () => {
    const document2 = getDocument();
    document2.addEventListener("visibilitychange", onVisibilityChange);
  };
  const detachDocumentEvents = () => {
    const document2 = getDocument();
    document2.removeEventListener("visibilitychange", onVisibilityChange);
  };
  on3("init", () => {
    if (swiper.params.autoplay.enabled) {
      attachMouseEvents();
      attachDocumentEvents();
      autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
      start();
    }
  });
  on3("destroy", () => {
    detachMouseEvents();
    detachDocumentEvents();
    if (swiper.autoplay.running) {
      stop();
    }
  });
  on3("beforeTransitionStart", (_s2, speed, internal) => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    if (internal || !swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on3("sliderFirstMove", () => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    if (swiper.params.autoplay.disableOnInteraction) {
      stop();
      return;
    }
    isTouched = true;
    pausedByTouch = false;
    pausedByInteraction = false;
    touchStartTimeout = setTimeout(() => {
      pausedByInteraction = true;
      pausedByTouch = true;
      pause(true);
    }, 200);
  });
  on3("touchEnd", () => {
    if (swiper.destroyed || !swiper.autoplay.running || !isTouched)
      return;
    clearTimeout(touchStartTimeout);
    clearTimeout(timeout);
    if (swiper.params.autoplay.disableOnInteraction) {
      pausedByTouch = false;
      isTouched = false;
      return;
    }
    if (pausedByTouch && swiper.params.cssMode)
      resume();
    pausedByTouch = false;
    isTouched = false;
  });
  on3("slideChange", () => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    slideChanged = true;
  });
  Object.assign(swiper.autoplay, {
    start,
    stop,
    pause,
    resume
  });
}

// node_modules/.pnpm/swiper@10.2.0/node_modules/swiper/shared/effect-init.mjs
function effectInit(params) {
  const {
    effect,
    swiper,
    on: on3,
    setTranslate: setTranslate2,
    setTransition: setTransition2,
    overwriteParams,
    perspective,
    recreateShadows,
    getEffectParams
  } = params;
  on3("beforeInit", () => {
    if (swiper.params.effect !== effect)
      return;
    swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
    if (perspective && perspective()) {
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
    }
    const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
    Object.assign(swiper.params, overwriteParamsResult);
    Object.assign(swiper.originalParams, overwriteParamsResult);
  });
  on3("setTranslate", () => {
    if (swiper.params.effect !== effect)
      return;
    setTranslate2();
  });
  on3("setTransition", (_s2, duration) => {
    if (swiper.params.effect !== effect)
      return;
    setTransition2(duration);
  });
  on3("transitionEnd", () => {
    if (swiper.params.effect !== effect)
      return;
    if (recreateShadows) {
      if (!getEffectParams || !getEffectParams().slideShadows)
        return;
      swiper.slides.forEach((slideEl) => {
        slideEl.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl) => shadowEl.remove());
      });
      recreateShadows();
    }
  });
  let requireUpdateOnVirtual;
  on3("virtualUpdate", () => {
    if (swiper.params.effect !== effect)
      return;
    if (!swiper.slides.length) {
      requireUpdateOnVirtual = true;
    }
    requestAnimationFrame(() => {
      if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
        setTranslate2();
        requireUpdateOnVirtual = false;
      }
    });
  });
}

// node_modules/.pnpm/swiper@10.2.0/node_modules/swiper/shared/effect-target.mjs
function effectTarget(effectParams, slideEl) {
  const transformEl = getSlideTransformEl(slideEl);
  if (transformEl !== slideEl) {
    transformEl.style.backfaceVisibility = "hidden";
    transformEl.style["-webkit-backface-visibility"] = "hidden";
  }
  return transformEl;
}

// node_modules/.pnpm/swiper@10.2.0/node_modules/swiper/shared/effect-virtual-transition-end.mjs
function effectVirtualTransitionEnd(_ref) {
  let {
    swiper,
    duration,
    transformElements,
    allSlides
  } = _ref;
  const {
    activeIndex
  } = swiper;
  const getSlide = (el3) => {
    if (!el3.parentElement) {
      const slide2 = swiper.slides.filter((slideEl) => slideEl.shadowRoot && slideEl.shadowRoot === el3.parentNode)[0];
      return slide2;
    }
    return el3.parentElement;
  };
  if (swiper.params.virtualTranslate && duration !== 0) {
    let eventTriggered = false;
    let transitionEndTarget;
    if (allSlides) {
      transitionEndTarget = transformElements;
    } else {
      transitionEndTarget = transformElements.filter((transformEl) => {
        const el3 = transformEl.classList.contains("swiper-slide-transform") ? getSlide(transformEl) : transformEl;
        return swiper.getSlideIndex(el3) === activeIndex;
      });
    }
    transitionEndTarget.forEach((el3) => {
      elementTransitionEnd(el3, () => {
        if (eventTriggered)
          return;
        if (!swiper || swiper.destroyed)
          return;
        eventTriggered = true;
        swiper.animating = false;
        const evt = new window.CustomEvent("transitionend", {
          bubbles: true,
          cancelable: true
        });
        swiper.wrapperEl.dispatchEvent(evt);
      });
    });
  }
}

// node_modules/.pnpm/swiper@10.2.0/node_modules/swiper/modules/effect-fade.mjs
function EffectFade(_ref) {
  let {
    swiper,
    extendParams,
    on: on3
  } = _ref;
  extendParams({
    fadeEffect: {
      crossFade: false
    }
  });
  const setTranslate2 = () => {
    const {
      slides
    } = swiper;
    const params = swiper.params.fadeEffect;
    for (let i3 = 0; i3 < slides.length; i3 += 1) {
      const slideEl = swiper.slides[i3];
      const offset = slideEl.swiperSlideOffset;
      let tx = -offset;
      if (!swiper.params.virtualTranslate)
        tx -= swiper.translate;
      let ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
      }
      const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(slideEl.progress), 0) : 1 + Math.min(Math.max(slideEl.progress, -1), 0);
      const targetEl = effectTarget(params, slideEl);
      targetEl.style.opacity = slideOpacity;
      targetEl.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`;
    }
  };
  const setTransition2 = (duration) => {
    const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));
    transformElements.forEach((el3) => {
      el3.style.transitionDuration = `${duration}ms`;
    });
    effectVirtualTransitionEnd({
      swiper,
      duration,
      transformElements,
      allSlides: true
    });
  };
  effectInit({
    effect: "fade",
    swiper,
    on: on3,
    setTranslate: setTranslate2,
    setTransition: setTransition2,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      spaceBetween: 0,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}

// node_modules/.pnpm/vue-amazing-ui@0.1.6/node_modules/vue-amazing-ui/dist/vue-amazing-ui.js
function h6(a3 = Date.now(), e3 = "YYYY-MM-DD HH:mm:ss") {
  if (typeof a3 == "number" || typeof a3 == "string")
    var t3 = new Date(a3);
  else
    var t3 = a3;
  function s3(u3) {
    return u3 < 10 ? "0" + u3 : String(u3);
  }
  var n = e3;
  if (n.includes("SSS")) {
    const u3 = t3.getMilliseconds();
    n = n.replace("SSS", "0".repeat(3 - String(u3).length) + u3);
  }
  if (n.includes("YY")) {
    const u3 = t3.getFullYear();
    n = n.includes("YYYY") ? n.replace("YYYY", String(u3)) : n.replace("YY", String(u3).slice(2, 4));
  }
  if (n.includes("M")) {
    const u3 = t3.getMonth() + 1;
    n = n.includes("MM") ? n.replace("MM", s3(u3)) : n.replace("M", String(u3));
  }
  if (n.includes("D")) {
    const u3 = t3.getDate();
    n = n.includes("DD") ? n.replace("DD", s3(u3)) : n.replace("D", String(u3));
  }
  if (n.includes("H")) {
    const u3 = t3.getHours();
    n = n.includes("HH") ? n.replace("HH", s3(u3)) : n.replace("H", String(u3));
  }
  if (n.includes("m")) {
    var c3 = t3.getMinutes();
    n = n.includes("mm") ? n.replace("mm", s3(c3)) : n.replace("m", String(c3));
  }
  if (n.includes("s")) {
    var o = t3.getSeconds();
    n = n.includes("ss") ? n.replace("ss", s3(o)) : n.replace("s", String(o));
  }
  return n;
}
var fe = typeof window < "u" ? window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame : () => {
};
var Pt = typeof window < "u" ? window.cancelAnimationFrame || window.mozCancelAnimationFrame : () => {
};
function pe(a3, e3 = 0, t3 = false) {
  const s3 = typeof window < "u" ? window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame : () => {
  };
  var n = null;
  function c3(u3) {
    n || (n = u3), u3 - n >= e3 ? (a3(), t3 && (n = null, o.id = s3(c3))) : o.id = s3(c3);
  }
  const o = {
    // 引用类型保存，方便获取 requestAnimationFrame()方法返回的 ID.
    id: s3(c3)
  };
  return o;
}
function _e(a3) {
  const e3 = typeof window < "u" ? window.cancelAnimationFrame || window.mozCancelAnimationFrame : () => {
  };
  a3 && a3.id && e3(a3.id);
}
function m6(a3, e3 = 300) {
  var t3 = true;
  return function() {
    return t3 && (t3 = false, pe(() => {
      a3(), t3 = true;
    }, e3)), false;
  };
}
function _6(a3, e3 = 300) {
  let t3 = null;
  return function() {
    t3 && _e(t3), t3 = pe(a3, e3);
  };
}
function g6(a3, e3) {
  const t3 = String(a3).split(".")[1], s3 = String(e3).split(".")[1];
  let n = Math.max((t3 == null ? void 0 : t3.length) || 0, (s3 == null ? void 0 : s3.length) || 0), c3 = a3.toFixed(n), o = e3.toFixed(n);
  return (+c3.replace(".", "") + +o.replace(".", "")) / Math.pow(10, n);
}
function y6(a3, e3) {
  var t3 = "";
  if (e3)
    t3 = e3;
  else {
    const n = a3.split("?")[0].split("/");
    t3 = n[n.length - 1];
  }
  var s3 = new XMLHttpRequest();
  s3.open("GET", a3, true), s3.responseType = "blob", s3.onload = function() {
    if (s3.status === 200) {
      const n = s3.response, c3 = document.createElement("a"), o = document.querySelector("body");
      c3.href = window.URL.createObjectURL(n), c3.download = t3, c3.style.display = "none", o == null || o.appendChild(c3), c3.click(), o == null || o.removeChild(c3), window.URL.revokeObjectURL(c3.href);
    }
  }, s3.send();
}
function ua2(a3, e3 = 2, t3 = ",") {
  function s3(u3) {
    const p = u3.length;
    return p <= 3 ? u3 : s3(u3.slice(0, p - 3)) + t3 + u3.slice(p - 3, p);
  }
  const n = String(a3);
  if (isFinite(parseFloat(n))) {
    if (parseFloat(n) === 0)
      return parseFloat(n).toFixed(e3);
    var c3 = "", o = n.indexOf(".");
    if (o === -1)
      e3 === 0 ? c3 = s3(n) : c3 = s3(n) + "." + "0".repeat(e3);
    else {
      const u3 = String((Math.round(parseFloat(n) * Math.pow(10, e3)) / Math.pow(10, e3)).toFixed(e3)), p = u3.slice(o, o + e3 + 1);
      c3 = s3(u3.slice(0, o)) + p;
    }
    return c3;
  } else
    return "--";
}
function w6() {
  document.documentElement.classList.toggle("dark");
}
var de = (a3) => (pushScopeId("data-v-e2a4ec13"), a3 = a3(), popScopeId(), a3);
var ra2 = {
  key: 0,
  class: "m-icon"
};
var ca = ["src"];
var da = {
  key: 1,
  focusable: "false",
  class: "u-icon",
  "data-icon": "info-circle",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var fa = de(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1));
var pa2 = [
  fa
];
var va = {
  key: 2,
  focusable: "false",
  class: "u-icon",
  "data-icon": "check-circle",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var ha2 = de(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1));
var ma = [
  ha2
];
var _a2 = {
  key: 3,
  focusable: "false",
  class: "u-icon",
  "data-icon": "exclamation-circle",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var ga = de(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1));
var ya = [
  ga
];
var wa2 = {
  key: 4,
  focusable: "false",
  class: "u-icon",
  "data-icon": "close-circle",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var ka2 = de(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1));
var ba2 = [
  ka2
];
var $a2 = {
  key: 1,
  class: "m-big-icon"
};
var Ma2 = ["src"];
var Ca2 = {
  key: 1,
  focusable: "false",
  class: "u-icon",
  "data-icon": "info-circle",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var za = de(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
var Ba = de(() => createBaseVNode("path", { d: "M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" }, null, -1));
var Sa2 = [
  za,
  Ba
];
var Fa = {
  key: 2,
  focusable: "false",
  class: "u-icon",
  "data-icon": "check-circle",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var La = de(() => createBaseVNode("path", { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1));
var Aa2 = de(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
var Da2 = [
  La,
  Aa2
];
var Ha = {
  key: 3,
  focusable: "false",
  class: "u-icon",
  "data-icon": "exclamation-circle",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var Ea = de(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
var Ia = de(() => createBaseVNode("path", { d: "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1));
var Ra2 = [
  Ea,
  Ia
];
var Ta2 = {
  key: 4,
  focusable: "false",
  class: "u-icon",
  "data-icon": "close-circle",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var Va = de(() => createBaseVNode("path", { d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" }, null, -1));
var Wa = de(() => createBaseVNode("path", { d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
var ja = [
  Va,
  Wa
];
var Pa2 = { class: "m-content" };
var Oa2 = { class: "u-message" };
var qa2 = { key: 0 };
var Na2 = {
  key: 1,
  focusable: "false",
  class: "u-close",
  "data-icon": "close",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var Ua = de(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1));
var Ya = [
  Ua
];
var Ka = defineComponent({
  __name: "Alert",
  props: {
    message: { default: "" },
    description: { default: "" },
    type: { default: "info" },
    closable: { type: Boolean, default: false },
    closeText: { default: "" },
    icon: { default: "" },
    showIcon: { type: Boolean, default: false }
  },
  emits: ["close"],
  setup(a3, { emit: e3 }) {
    const t3 = a3, s3 = ref(), n = ref(), c3 = ref(1);
    onMounted(() => {
      c3.value = n.value.offsetHeight, t3.closable && nextTick(() => {
        s3.value.style.height = s3.value.offsetHeight + "px", s3.value.style.opacity = 1;
      });
    });
    function o(u3) {
      s3.value.style.height = 0, s3.value.style.opacity = 0, e3("close", u3);
    }
    return (u3, p) => (openBlock(), createElementBlock("div", {
      ref_key: "alert",
      ref: s3,
      class: "m-alert-wrapper"
    }, [
      createBaseVNode("div", {
        class: normalizeClass(["m-alert", [`${u3.type}`, { "width-description": c3.value }]])
      }, [
        u3.showIcon ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          c3.value ? (openBlock(), createElementBlock("span", $a2, [
            renderSlot(u3.$slots, "icon", {}, () => [
              u3.icon ? (openBlock(), createElementBlock("img", {
                key: 0,
                src: u3.icon,
                class: "u-big-icon-img"
              }, null, 8, Ma2)) : u3.type === "info" ? (openBlock(), createElementBlock("svg", Ca2, Sa2)) : u3.type === "success" ? (openBlock(), createElementBlock("svg", Fa, Da2)) : u3.type === "warning" ? (openBlock(), createElementBlock("svg", Ha, Ra2)) : u3.type === "error" ? (openBlock(), createElementBlock("svg", Ta2, ja)) : createCommentVNode("", true)
            ], true)
          ])) : (openBlock(), createElementBlock("span", ra2, [
            renderSlot(u3.$slots, "icon", {}, () => [
              u3.icon ? (openBlock(), createElementBlock("img", {
                key: 0,
                src: u3.icon,
                class: "u-icon-img"
              }, null, 8, ca)) : u3.type === "info" ? (openBlock(), createElementBlock("svg", da, pa2)) : u3.type === "success" ? (openBlock(), createElementBlock("svg", va, ma)) : u3.type === "warning" ? (openBlock(), createElementBlock("svg", _a2, ya)) : u3.type === "error" ? (openBlock(), createElementBlock("svg", wa2, ba2)) : createCommentVNode("", true)
            ], true)
          ]))
        ], 64)) : createCommentVNode("", true),
        createBaseVNode("div", Pa2, [
          createBaseVNode("div", Oa2, [
            renderSlot(u3.$slots, "message", {}, () => [
              createTextVNode(toDisplayString(u3.message), 1)
            ], true)
          ]),
          c3.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "u-description",
            ref_key: "descRef",
            ref: n
          }, [
            renderSlot(u3.$slots, "description", {}, () => [
              createTextVNode(toDisplayString(u3.description), 1)
            ], true)
          ], 512)) : createCommentVNode("", true)
        ]),
        u3.closable ? (openBlock(), createElementBlock("a", {
          key: 1,
          class: "m-close",
          onClick: o
        }, [
          renderSlot(u3.$slots, "closeText", {}, () => [
            u3.closeText ? (openBlock(), createElementBlock("span", qa2, toDisplayString(u3.closeText), 1)) : (openBlock(), createElementBlock("svg", Na2, Ya))
          ], true)
        ])) : createCommentVNode("", true)
      ], 2)
    ], 512));
  }
});
var W = (a3, e3) => {
  const t3 = a3.__vccOpts || a3;
  for (const [s3, n] of e3)
    t3[s3] = n;
  return t3;
};
var Ke = W(Ka, [["__scopeId", "data-v-e2a4ec13"]]);
Ke.install = (a3) => {
  a3.component(Ke.__name, Ke);
};
var Ga = ["src", "alt"];
var Ja2 = defineComponent({
  __name: "Avatar",
  props: {
    shape: { default: "circle" },
    size: { default: "default" },
    src: { default: "" },
    alt: { default: "" },
    icon: { default: void 0 }
  },
  setup(a3) {
    const e3 = a3, t3 = ref(document.documentElement.clientWidth), s3 = ref(), n = ref(1), c3 = ref(), o = ref(1);
    onMounted(() => {
      window.addEventListener("resize", u3), e3.src || (n.value = s3.value.offsetHeight, nextTick(() => {
        n.value || (o.value = c3.value.offsetHeight);
      }));
    }), onUnmounted(() => {
      window.removeEventListener("resize", u3);
    });
    function u3() {
      t3.value = document.documentElement.clientWidth;
    }
    const p = computed(() => {
      if (typeof e3.size == "string")
        return null;
      if (typeof e3.size == "number")
        return n.value ? {
          width: e3.size + "px",
          height: e3.size + "px",
          lineHeight: e3.size + "px",
          fontSize: e3.size / 2 + "px"
        } : {
          width: e3.size + "px",
          height: e3.size + "px",
          lineHeight: e3.size + "px",
          fontSize: "18px"
        };
      if (typeof e3.size == "object") {
        let d3 = 32;
        return t3.value >= 1600 && e3.size.xxl ? d3 = e3.size.xxl : t3.value >= 1200 && e3.size.xl ? d3 = e3.size.xl : t3.value >= 992 && e3.size.lg ? d3 = e3.size.lg : t3.value >= 768 && e3.size.md ? d3 = e3.size.md : t3.value >= 576 && e3.size.sm ? d3 = e3.size.sm : t3.value < 576 && e3.size.xs && (d3 = e3.size.xs), {
          width: d3 + "px",
          height: d3 + "px",
          lineHeight: d3 + "px",
          fontSize: d3 / 2 + "px"
        };
      }
    }), g = computed(() => {
      if (typeof e3.size == "string")
        return {
          transform: "scale(1) translateX(-50%)"
        };
      if (typeof e3.size == "number") {
        const d3 = Math.min(1, Math.max(0.022222222222222223, (1 + (e3.size - 9) * 1) / 45));
        return {
          lineHeight: e3.size + "px",
          transform: `scale(${d3}) translateX(-50%)`
        };
      }
    });
    return (d3, v) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["m-avatar", [p.value === null ? "avatar-" + d3.size : "", "avatar-" + d3.shape, { "avatar-image": d3.src }]]),
      style: normalizeStyle(p.value || {})
    }, [
      d3.src ? (openBlock(), createElementBlock("img", {
        key: 0,
        class: "u-image",
        src: d3.src,
        alt: d3.alt
      }, null, 8, Ga)) : createCommentVNode("", true),
      !d3.src && n.value ? (openBlock(), createElementBlock("span", {
        key: 1,
        class: "m-icon",
        ref_key: "iconRef",
        ref: s3
      }, [
        renderSlot(d3.$slots, "icon", {}, void 0, true)
      ], 512)) : createCommentVNode("", true),
      !d3.src && !n.value && o.value ? (openBlock(), createElementBlock("span", {
        key: 2,
        class: "m-string",
        style: normalizeStyle(g.value),
        ref_key: "strRef",
        ref: c3
      }, [
        renderSlot(d3.$slots, "default", {}, void 0, true)
      ], 4)) : createCommentVNode("", true)
    ], 6));
  }
});
var Ge = W(Ja2, [["__scopeId", "data-v-98fa5874"]]);
Ge.install = (a3) => {
  a3.component(Ge.__name, Ge);
};
var Xa2 = (a3) => (pushScopeId("data-v-a03f4f35"), a3 = a3(), popScopeId(), a3);
var Za = Xa2(() => createBaseVNode("span", { class: "m-icon" }, [
  createBaseVNode("svg", {
    class: "u-icon",
    viewBox: "0 0 24 24",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    xlinkHref: "http://www.w3.org/1999/xlink"
  }, [
    createBaseVNode("g", {
      stroke: "none",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [
      createBaseVNode("g", {
        transform: "translate(-139.000000, -4423.000000)",
        "fill-rule": "nonzero"
      }, [
        createBaseVNode("g", { transform: "translate(120.000000, 4285.000000)" }, [
          createBaseVNode("g", { transform: "translate(7.000000, 126.000000)" }, [
            createBaseVNode("g", { transform: "translate(24.000000, 24.000000) scale(1, -1) translate(-24.000000, -24.000000) translate(12.000000, 12.000000)" }, [
              createBaseVNode("g", { transform: "translate(4.000000, 2.000000)" }, [
                createBaseVNode("path", { d: "M8,0 C8.51283584,0 8.93550716,0.38604019 8.99327227,0.883378875 L9,1 L9,10.584 L12.2928932,7.29289322 C12.6834175,6.90236893 13.3165825,6.90236893 13.7071068,7.29289322 C14.0675907,7.65337718 14.0953203,8.22060824 13.7902954,8.61289944 L13.7071068,8.70710678 L8.70710678,13.7071068 L8.62544899,13.7803112 L8.618,13.784 L8.59530661,13.8036654 L8.4840621,13.8753288 L8.37133602,13.9287745 L8.22929083,13.9735893 L8.14346259,13.9897165 L8.03324678,13.9994506 L7.9137692,13.9962979 L7.77070917,13.9735893 L7.6583843,13.9401293 L7.57677845,13.9063266 L7.47929125,13.8540045 L7.4048407,13.8036865 L7.38131006,13.7856883 C7.35030318,13.7612383 7.32077858,13.7349921 7.29289322,13.7071068 L2.29289322,8.70710678 L2.20970461,8.61289944 C1.90467972,8.22060824 1.93240926,7.65337718 2.29289322,7.29289322 C2.65337718,6.93240926 3.22060824,6.90467972 3.61289944,7.20970461 L3.70710678,7.29289322 L7,10.585 L7,1 L7.00672773,0.883378875 C7.06449284,0.38604019 7.48716416,0 8,0 Z" }),
                createBaseVNode("path", { d: "M14.9333333,15.9994506 C15.5224371,15.9994506 16,16.4471659 16,16.9994506 C16,17.5122865 15.5882238,17.9349578 15.0577292,17.9927229 L14.9333333,17.9994506 L1.06666667,17.9994506 C0.477562934,17.9994506 0,17.5517354 0,16.9994506 C0,16.4866148 0.411776203,16.0639435 0.9422708,16.0061783 L1.06666667,15.9994506 L14.9333333,15.9994506 Z" })
              ])
            ])
          ])
        ])
      ])
    ])
  ])
], -1));
var xa2 = defineComponent({
  __name: "BackTop",
  props: {
    bottom: { default: 40 },
    right: { default: 40 },
    visibilityHeight: { default: 180 },
    to: { default: "body" },
    listenTo: { default: void 0 }
  },
  emits: ["show"],
  setup(a3, { emit: e3 }) {
    const t3 = a3, s3 = computed(() => typeof t3.bottom == "number" ? t3.bottom + "px" : t3.bottom), n = computed(() => typeof t3.right == "number" ? t3.right + "px" : t3.right), c3 = ref(), o = ref(0), u3 = ref();
    watchEffect(() => {
      nextTick(() => {
        t3.listenTo === void 0 ? u3.value = d3(c3.value.parentElement) : typeof t3.listenTo == "string" ? u3.value = document.getElementsByTagName(t3.listenTo)[0] : t3.listenTo instanceof HTMLElement && (u3.value = t3.listenTo), u3.value && (p(u3.value), u3.value.addEventListener("scroll", ($) => {
          o.value = $.target.scrollTop;
        }));
      });
    });
    function p($) {
      const k3 = function(m3, M3) {
        o.value = u3.value.scrollTop;
      }, y3 = { attributes: true, subtree: true };
      new MutationObserver(k3).observe($, y3);
    }
    watchEffect(() => {
      nextTick(() => {
        var $ = null;
        typeof t3.to == "string" ? $ = document.getElementsByTagName(t3.to)[0] : t3.to instanceof HTMLElement && ($ = t3.to), $ && $.appendChild(c3.value);
      });
    });
    const g = computed(() => o.value >= t3.visibilityHeight);
    function d3($) {
      return $.scrollHeight > $.clientHeight ? $ : $.parentElement ? d3($.parentElement) : null;
    }
    function v() {
      u3.value && u3.value.scrollTo({
        top: 0,
        behavior: "smooth"
        // 平滑滚动并产生过渡效果
      });
    }
    return watch(g, ($) => {
      e3("show", $);
    }), ($, k3) => (openBlock(), createBlock(Transition, null, {
      default: withCtx(() => [
        withDirectives(createBaseVNode("div", {
          ref_key: "backtop",
          ref: c3,
          onClick: v,
          class: "m-backtop",
          style: normalizeStyle(`bottom: ${s3.value}; right: ${n.value};`)
        }, [
          renderSlot($.$slots, "default", {}, () => [
            Za
          ], true)
        ], 4), [
          [vShow, g.value]
        ])
      ]),
      _: 3
    }));
  }
});
var Je2 = W(xa2, [["__scopeId", "data-v-a03f4f35"]]);
Je2.install = (a3) => {
  a3.component(Je2.__name, Je2);
};
var Qa2 = { class: "u-status-text" };
var e1 = ["title"];
var t1 = {
  key: 0,
  class: "m-number",
  style: { transition: "none 0s ease 0s" }
};
var a1 = { class: "u-number" };
var l1 = defineComponent({
  __name: "Badge",
  props: {
    color: { default: "" },
    count: { default: 0 },
    max: { default: 99 },
    showZero: { type: Boolean, default: false },
    dot: { type: Boolean, default: false },
    status: { default: void 0 },
    text: { default: "" },
    countStyle: { default: () => ({}) },
    title: { default: "" },
    ripple: { type: Boolean, default: true }
  },
  setup(a3) {
    const e3 = a3, t3 = ["pink", "red", "yellow", "orange", "cyan", "green", "blue", "purple", "geekblue", "magenta", "volcano", "gold", "lime"], s3 = computed(() => {
      if (e3.color && !t3.includes(e3.color))
        return {
          color: e3.color,
          backgroundColor: e3.color
        };
    }), n = ref(), c3 = ref(1), o = ref(), u3 = ref(1);
    return onMounted(() => {
      !e3.status && !e3.color && (c3.value = n.value.offsetHeight, u3.value = o.value.offsetHeight);
    }), (p, g) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["m-badge", { "badge-status": p.status }])
    }, [
      p.status || p.color ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        createBaseVNode("span", {
          class: normalizeClass(["u-status-dot", [`status-${p.status || p.color}`, { "dot-ripple": p.ripple }]]),
          style: normalizeStyle(s3.value)
        }, null, 6),
        createBaseVNode("span", Qa2, [
          renderSlot(p.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(p.text), 1)
          ], true)
        ])
      ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        c3.value ? (openBlock(), createElementBlock("span", {
          key: 0,
          ref_key: "contentRef",
          ref: n
        }, [
          renderSlot(p.$slots, "default", {}, void 0, true)
        ], 512)) : createCommentVNode("", true),
        u3.value ? (openBlock(), createElementBlock("span", {
          key: 1,
          ref_key: "countRef",
          ref: o,
          class: normalizeClass(["m-count", { "only-number": !c3.value }])
        }, [
          renderSlot(p.$slots, "count", {}, void 0, true)
        ], 2)) : (openBlock(), createBlock(Transition, {
          key: 2,
          name: "zoom"
        }, {
          default: withCtx(() => [
            withDirectives(createBaseVNode("div", {
              class: normalizeClass(["m-badge-count", { "small-num": p.count < 10, "only-number": !c3.value, "only-dot": p.count === 0 && !p.showZero }]),
              style: normalizeStyle(p.countStyle),
              title: p.title || String(p.count)
            }, [
              p.dot ? createCommentVNode("", true) : (openBlock(), createElementBlock("span", t1, [
                createBaseVNode("span", a1, toDisplayString(p.count > p.max ? p.max + "+" : p.count), 1)
              ]))
            ], 14, e1), [
              [vShow, p.showZero || p.count !== 0 || p.dot]
            ])
          ]),
          _: 1
        }))
      ], 64))
    ], 2));
  }
});
var Xe2 = W(l1, [["__scopeId", "data-v-222106a4"]]);
Xe2.install = (a3) => {
  a3.component(Xe2.__name, Xe2);
};
var Zt2 = (a3) => (pushScopeId("data-v-d8af300c"), a3 = a3(), popScopeId(), a3);
var s1 = ["href", "title", "target"];
var o1 = {
  key: 0,
  class: "u-separator"
};
var n1 = {
  key: 1,
  class: "u-arrow",
  viewBox: "64 64 896 896",
  "data-icon": "right",
  "aria-hidden": "true",
  focusable: "false"
};
var i1 = Zt2(() => createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" }, null, -1));
var u1 = [
  i1
];
var r1 = Zt2(() => createBaseVNode("div", { class: "assist" }, null, -1));
var c1 = defineComponent({
  __name: "Breadcrumb",
  props: {
    routes: { default: () => [] },
    fontSize: { default: 14 },
    height: { default: 21 },
    maxWidth: { default: 180 },
    separator: { default: "" },
    target: { default: "_self" }
  },
  setup(a3) {
    const e3 = a3, t3 = computed(() => e3.routes.length);
    function s3(n) {
      var c3 = n.path;
      if (n.query && JSON.stringify(n.query) !== "{}") {
        const o = n.query;
        Object.keys(o).forEach((u3, p) => {
          p === 0 ? c3 = c3 + "?" + u3 + "=" + o[u3] : c3 = c3 + "&" + u3 + "=" + o[u3];
        });
      }
      return c3;
    }
    return (n, c3) => (openBlock(), createElementBlock("div", {
      class: "m-breadcrumb",
      style: normalizeStyle(`height: ${n.height}px;`)
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(n.routes, (o, u3) => (openBlock(), createElementBlock("div", {
        class: "m-bread",
        key: u3
      }, [
        createBaseVNode("a", {
          class: normalizeClass(["u-route", { active: u3 === t3.value - 1 }]),
          style: normalizeStyle(`font-size: ${n.fontSize}px; max-width: ${n.maxWidth}px;`),
          href: u3 === t3.value - 1 ? "javascript:;" : s3(o),
          title: o.name,
          target: u3 === t3.value - 1 ? "_self" : n.target
        }, toDisplayString(o.name || "--"), 15, s1),
        u3 !== t3.value - 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          n.separator ? (openBlock(), createElementBlock("span", o1, toDisplayString(n.separator), 1)) : (openBlock(), createElementBlock("svg", n1, u1))
        ], 64)) : createCommentVNode("", true)
      ]))), 128)),
      r1
    ], 4));
  }
});
var Ze2 = W(c1, [["__scopeId", "data-v-d8af300c"]]);
Ze2.install = (a3) => {
  a3.component(Ze2.__name, Ze2);
};
var d1 = ["href", "target", "disabled"];
var f1 = { class: "u-spin-circle" };
var p1 = { class: "u-text" };
var v1 = defineComponent({
  __name: "Button",
  props: {
    name: { default: "按钮" },
    type: { default: "default" },
    effect: { default: "fade" },
    size: { default: "middle" },
    route: { default: () => ({}) },
    target: { default: "_self" },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    center: { type: Boolean, default: false }
  },
  emits: ["click"],
  setup(a3, { emit: e3 }) {
    const t3 = a3, s3 = computed(() => JSON.stringify(t3.route) !== "{}");
    function n(o) {
      s3.value || e3("click", o);
    }
    function c3(o) {
      var u3 = o.path;
      if (o.query && JSON.stringify(o.query) !== "{}") {
        const p = o.query;
        Object.keys(p).forEach((g, d3) => {
          d3 === 0 ? u3 = u3 + "?" + g + "=" + p[g] : u3 = u3 + "&" + g + "=" + p[g];
        });
      }
      return u3;
    }
    return (o, u3) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["m-btn-wrap", { center: o.center }])
    }, [
      createBaseVNode("a", {
        onClick: n,
        href: c3(o.route),
        target: s3.value ? o.target : "_self",
        disabled: o.disabled,
        class: normalizeClass(["m-btn", [o.type, o.size, { [o.effect]: o.type === "default", disabled: o.disabled, "m-btn-loading": !s3.value && o.loading }]])
      }, [
        withDirectives(createBaseVNode("span", {
          class: normalizeClass(["m-loading-icon", { "show-spin": o.loading }])
        }, [
          withDirectives(createBaseVNode("span", f1, null, 512), [
            [vShow, o.loading]
          ])
        ], 2), [
          [vShow, !s3.value]
        ]),
        createBaseVNode("span", p1, [
          renderSlot(o.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(o.name), 1)
          ], true)
        ])
      ], 10, d1)
    ], 2));
  }
});
var he = W(v1, [["__scopeId", "data-v-6d3cf291"]]);
he.install = (a3) => {
  a3.component(he.__name, he);
};
var h1 = { class: "u-title" };
var m1 = { class: "u-extra" };
var _1 = defineComponent({
  __name: "Card",
  props: {
    width: { default: "auto" },
    bordered: { type: Boolean, default: true },
    extra: { default: "" },
    size: { default: "default" },
    title: { default: "" },
    headStyle: { default: () => ({}) },
    bodyStyle: { default: () => ({}) }
  },
  setup(a3) {
    const e3 = a3, t3 = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), s3 = ref(), n = ref(1);
    return onMounted(() => {
      n.value = s3.value.offsetHeight;
    }), (c3, o) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["m-card", { bordered: c3.bordered, "m-small-card": c3.size === "small" }]),
      style: normalizeStyle(`width: ${t3.value};`)
    }, [
      n.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "m-card-head",
        style: normalizeStyle(c3.headStyle)
      }, [
        createBaseVNode("div", {
          class: "m-head-wrapper",
          ref_key: "headRef",
          ref: s3
        }, [
          createBaseVNode("div", h1, [
            renderSlot(c3.$slots, "title", {}, () => [
              createTextVNode(toDisplayString(c3.title), 1)
            ], true)
          ]),
          createBaseVNode("div", m1, [
            renderSlot(c3.$slots, "extra", {}, () => [
              createTextVNode(toDisplayString(c3.extra), 1)
            ], true)
          ])
        ], 512)
      ], 4)) : createCommentVNode("", true),
      createBaseVNode("div", {
        class: "m-card-body",
        style: normalizeStyle(c3.bodyStyle)
      }, [
        renderSlot(c3.$slots, "default", {}, void 0, true)
      ], 4)
    ], 6));
  }
});
var xe = W(_1, [["__scopeId", "data-v-b66e2672"]]);
xe.install = (a3) => {
  a3.component(xe.__name, xe);
};
var Oe = (a3) => (pushScopeId("data-v-a4575dff"), a3 = a3(), popScopeId(), a3);
var g1 = { class: "m-spin" };
var y1 = { class: "m-spin-box" };
var w1 = {
  key: 0,
  class: "m-spin-dot"
};
var k1 = Oe(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1));
var b1 = Oe(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1));
var $1 = Oe(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1));
var M1 = Oe(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1));
var C1 = [
  k1,
  b1,
  $1,
  M1
];
var z1 = {
  key: 1,
  class: "u-quarter-circle"
};
var B1 = {
  key: 2,
  class: "u-three-quarters-circle"
};
var S1 = {
  key: 3,
  class: "m-dynamic-circle"
};
var F1 = Oe(() => createBaseVNode("svg", {
  class: "circular",
  viewBox: "0 0 50 50"
}, [
  createBaseVNode("circle", {
    class: "path",
    cx: "25",
    cy: "25",
    r: "20",
    fill: "none"
  })
], -1));
var L1 = [
  F1
];
var A1 = defineComponent({
  __name: "Spin",
  props: {
    spinning: { type: Boolean, default: true },
    size: { default: "default" },
    tip: { default: "" },
    indicator: { default: "dot" },
    color: { default: "#1677FF" }
  },
  setup(a3) {
    return (e3, t3) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(`m-spin-wrap ${e3.size}`),
      style: normalizeStyle(`--color: ${e3.color};`)
    }, [
      withDirectives(createBaseVNode("div", g1, [
        createBaseVNode("div", y1, [
          e3.indicator === "dot" ? (openBlock(), createElementBlock("div", w1, C1)) : createCommentVNode("", true),
          e3.indicator === "quarter-circle" ? (openBlock(), createElementBlock("div", z1)) : createCommentVNode("", true),
          e3.indicator === "three-quarters-circle" ? (openBlock(), createElementBlock("div", B1)) : createCommentVNode("", true),
          e3.indicator === "dynamic-circle" ? (openBlock(), createElementBlock("div", S1, L1)) : createCommentVNode("", true),
          withDirectives(createBaseVNode("p", { class: "u-tip" }, toDisplayString(e3.tip), 513), [
            [vShow, e3.tip]
          ])
        ])
      ], 512), [
        [vShow, e3.spinning]
      ]),
      createBaseVNode("div", {
        class: normalizeClass(["m-spin-content", { "m-spin-mask": e3.spinning }])
      }, [
        renderSlot(e3.$slots, "default", {}, void 0, true)
      ], 2)
    ], 6));
  }
});
var ue = W(A1, [["__scopeId", "data-v-a4575dff"]]);
ue.install = (a3) => {
  a3.component(ue.__name, ue);
};
var xt2 = (a3) => (pushScopeId("data-v-8e540165"), a3 = a3(), popScopeId(), a3);
var D1 = ["href", "target"];
var H1 = ["onLoad", "src", "alt"];
var E1 = {
  key: 0,
  class: "m-image"
};
var I1 = ["href", "target"];
var R1 = ["src", "alt"];
var T1 = xt2(() => createBaseVNode("path", { d: "M10.26 3.2a.75.75 0 0 1 .04 1.06L6.773 8l3.527 3.74a.75.75 0 1 1-1.1 1.02l-4-4.25a.75.75 0 0 1 0-1.02l4-4.25a.75.75 0 0 1 1.06-.04z" }, null, -1));
var V1 = [
  T1
];
var W1 = xt2(() => createBaseVNode("path", { d: "M5.74 3.2a.75.75 0 0 0-.04 1.06L9.227 8L5.7 11.74a.75.75 0 1 0 1.1 1.02l4-4.25a.75.75 0 0 0 0-1.02l-4-4.25a.75.75 0 0 0-1.06-.04z" }, null, -1));
var j1 = [
  W1
];
var P1 = {
  key: 1,
  class: "m-switch"
};
var O1 = ["onClick"];
var q1 = defineComponent({
  __name: "Carousel",
  props: {
    images: { default: () => [] },
    interval: { default: 3e3 },
    width: { default: "100%" },
    height: { default: "100vh" },
    navigation: { type: Boolean, default: true },
    navColor: { default: "#FFF" },
    navSize: { default: 36 },
    pagination: { type: Boolean, default: true },
    pageActiveColor: { default: "#1677FF" },
    pageSize: { default: 10 },
    pageStyle: { default: () => ({}) },
    disableOnInteraction: { type: Boolean, default: true },
    pauseOnMouseEnter: { type: Boolean, default: true }
  },
  setup(a3) {
    const e3 = a3, t3 = ref(true), s3 = ref(0), n = ref(false), c3 = ref(), o = ref(), u3 = ref(), p = ref(false), g = ref(), d3 = ref(1), v = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), $ = computed(() => typeof e3.height == "number" ? e3.height + "px" : e3.height), k3 = computed(() => (e3.images.length + 1) * z3.value), y3 = computed(() => e3.images.length);
    onMounted(() => {
      w3(), L3(), document.addEventListener("keydown", H3);
    }), onUnmounted(() => {
      document.removeEventListener("keydown", H3);
    });
    const f = ref(Array(y3.value).fill(false)), m3 = ref(), M3 = ref(60), b3 = computed(() => M3.value === 60 ? 12 : 12 * (M3.value / 60));
    function _(R3) {
      f.value[R3] = true;
    }
    watch(
      () => f.value[0],
      (R3) => {
        R3 && I3();
      }
    );
    function w3() {
      var R3 = null;
      function ae(Q3) {
        R3 ? (M3.value = Math.floor(1e3 / (Q3 - R3)), console.log("fps", M3.value)) : (m3.value > 10 && (R3 = Q3), m3.value = fe(ae));
      }
      m3.value = fe(ae);
    }
    const z3 = ref(), D3 = ref();
    function L3() {
      z3.value = g.value.offsetWidth, D3.value = g.value.offsetHeight;
    }
    function H3(R3) {
      R3.preventDefault(), y3.value > 1 && ((R3.key === "ArrowLeft" || R3.key === "ArrowUp") && Ee(), (R3.key === "ArrowRight" || R3.key === "ArrowDown") && N());
    }
    function I3() {
      y3.value > 1 && f.value[0] && (t3.value = true, n.value = false, Ue(), console.log("imageSlider start"));
    }
    function P() {
      _e(c3.value), c3.value = null, t3.value ? ke() : De(), console.log("imageSlider stop");
    }
    function ke() {
      Pt(o.value), n.value = true, s3.value = Math.ceil(s3.value / z3.value) * z3.value;
    }
    function De() {
      Pt(o.value), n.value = true, s3.value = Math.floor(s3.value / z3.value) * z3.value;
    }
    function Ue() {
      c3.value = pe(() => {
        const R3 = s3.value % (y3.value * z3.value) + z3.value;
        d3.value = d3.value % y3.value + 1, ne(R3);
      }, e3.interval);
    }
    function Ye(R3) {
      t3.value ? ke() : (De(), t3.value = true), n.value = false, ie(R3);
    }
    function He(R3) {
      t3.value ? (ke(), t3.value = false) : De(), n.value = false, ze2(R3);
    }
    function Ee() {
      const R3 = (d3.value + y3.value - 2) % y3.value * z3.value;
      d3.value = d3.value - 1 > 0 ? d3.value - 1 : y3.value, He(R3);
    }
    function N() {
      const R3 = d3.value * z3.value;
      d3.value = d3.value % y3.value + 1, Ye(R3);
    }
    function te() {
      if (s3.value >= u3.value)
        Ue();
      else {
        var R3 = Math.ceil((u3.value - s3.value) / b3.value);
        s3.value += R3, o.value = fe(te);
      }
    }
    function ne(R3) {
      s3.value === y3.value * z3.value && (s3.value = 0), u3.value = R3, o.value = fe(te);
    }
    function ee() {
      if (s3.value >= u3.value)
        p.value && (p.value = false, !e3.disableOnInteraction && !e3.pauseOnMouseEnter && I3());
      else {
        var R3 = Math.ceil((u3.value - s3.value) / b3.value);
        s3.value += R3, o.value = fe(ee);
      }
    }
    function ie(R3) {
      s3.value === y3.value * z3.value && (s3.value = 0), u3.value = R3, o.value = fe(ee);
    }
    function be2() {
      if (s3.value <= u3.value)
        p.value && (p.value = false, !e3.disableOnInteraction && !e3.pauseOnMouseEnter && I3());
      else {
        var R3 = Math.floor((u3.value - s3.value) / b3.value);
        s3.value += R3, o.value = fe(be2);
      }
    }
    function ze2(R3) {
      s3.value === 0 && (s3.value = y3.value * z3.value), u3.value = R3, o.value = fe(be2);
    }
    function Ie2(R3) {
      if (d3.value !== R3) {
        p.value = true;
        const ae = (R3 - 1) * z3.value;
        R3 < d3.value && (d3.value = R3, He(ae)), R3 > d3.value && (d3.value = R3, Ye(ae));
      }
    }
    return (R3, ae) => (openBlock(), createElementBlock("div", {
      class: "m-slider",
      ref_key: "carousel",
      ref: g,
      style: normalizeStyle(`--navColor: ${R3.navColor}; --pageActiveColor: ${R3.pageActiveColor}; width: ${v.value}; height: ${$.value};`),
      onMouseenter: ae[1] || (ae[1] = (Q3) => R3.pauseOnMouseEnter ? P() : () => false),
      onMouseleave: ae[2] || (ae[2] = (Q3) => R3.pauseOnMouseEnter ? I3() : () => false)
    }, [
      createBaseVNode("div", {
        class: normalizeClass({ transition: n.value }),
        style: normalizeStyle(`width: ${k3.value}px; height: 100%; will-change: transform; transform: translateX(${-s3.value}px);`)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(R3.images, (Q3, $e) => (openBlock(), createElementBlock("div", {
          class: "m-image",
          key: $e
        }, [
          createVNode(unref(ue), {
            spinning: !f.value[$e],
            indicator: "dynamic-circle"
          }, {
            default: withCtx(() => [
              createBaseVNode("a", {
                href: Q3.link ? Q3.link : "javascript:;",
                target: Q3.link ? "_blank" : "_self",
                class: "m-link"
              }, [
                (openBlock(), createElementBlock("img", {
                  onLoad: (r6) => _($e),
                  src: Q3.src,
                  key: Q3.src,
                  alt: Q3.title,
                  class: "u-img",
                  style: normalizeStyle(`width: ${z3.value}px; height: ${D3.value}px;`)
                }, null, 44, H1))
              ], 8, D1)
            ]),
            _: 2
          }, 1032, ["spinning"])
        ]))), 128)),
        y3.value ? (openBlock(), createElementBlock("div", E1, [
          createVNode(unref(ue), {
            spinning: !f.value[0],
            indicator: "dynamic-circle"
          }, {
            default: withCtx(() => [
              createBaseVNode("a", {
                href: R3.images[0].link ? R3.images[0].link : "javascript:;",
                target: R3.images[0].link ? "_blank" : "_self",
                class: "m-link"
              }, [
                (openBlock(), createElementBlock("img", {
                  onLoad: ae[0] || (ae[0] = (Q3) => _(0)),
                  src: R3.images[0].src,
                  key: R3.images[0].src,
                  alt: R3.images[0].title,
                  class: "u-img",
                  style: normalizeStyle(`width: ${z3.value}px; height: ${D3.value}px;`)
                }, null, 44, R1))
              ], 8, I1)
            ]),
            _: 1
          }, 8, ["spinning"])
        ])) : createCommentVNode("", true)
      ], 6),
      R3.navigation ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        (openBlock(), createElementBlock("svg", {
          class: "arrow-left",
          style: normalizeStyle(`width: ${R3.navSize}px; height: ${R3.navSize}px;`),
          onClick: Ee,
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 16 16"
        }, V1, 4)),
        (openBlock(), createElementBlock("svg", {
          class: "arrow-right",
          style: normalizeStyle(`width: ${R3.navSize}px; height: ${R3.navSize}px;`),
          onClick: N,
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 16 16"
        }, j1, 4))
      ], 64)) : createCommentVNode("", true),
      R3.pagination ? (openBlock(), createElementBlock("div", P1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(y3.value, (Q3) => (openBlock(), createElementBlock("div", {
          onClick: ($e) => Ie2(Q3),
          class: normalizeClass(["u-circle", { active: d3.value === Q3 }]),
          style: normalizeStyle([{ width: `${R3.pageSize}px`, height: `${R3.pageSize}px` }, R3.pageStyle]),
          key: Q3
        }, null, 14, O1))), 128))
      ])) : createCommentVNode("", true)
    ], 36));
  }
});
var Qe = W(q1, [["__scopeId", "data-v-8e540165"]]);
Qe.install = (a3) => {
  a3.component(Qe.__name, Qe);
};
var N1 = { class: "m-empty" };
var U1 = createStaticVNode('<g fill="none" fill-rule="evenodd" data-v-fca5069e><g transform="translate(24 31.67)" data-v-fca5069e><ellipse fill-opacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668" data-v-fca5069e></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2" data-v-fca5069e></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" fill="url(#linearGradient-1)" transform="translate(13.56)" data-v-fca5069e></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7" data-v-fca5069e></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="#DCE0E6" data-v-fca5069e></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" fill="#DCE0E6" data-v-fca5069e></path><g transform="translate(149.65 15.383)" fill="#FFF" data-v-fca5069e><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" data-v-fca5069e></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" data-v-fca5069e></path></g></g>', 1);
var Y1 = [
  U1
];
var K1 = createStaticVNode('<g transform="translate(0 1)" fill="none" fill-rule="evenodd" data-v-fca5069e><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7" data-v-fca5069e></ellipse><g fill-rule="nonzero" stroke="#d9d9d9" data-v-fca5069e><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" data-v-fca5069e></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa" data-v-fca5069e></path></g></g>', 1);
var G1 = [
  K1
];
var J1 = ["src"];
var X1 = defineComponent({
  __name: "Empty",
  props: {
    description: { default: "暂无数据" },
    image: { default: "1" },
    imageStyle: { default: () => ({}) }
  },
  setup(a3) {
    return (e3, t3) => (openBlock(), createElementBlock("div", N1, [
      e3.image === "1" ? (openBlock(), createElementBlock("svg", {
        key: 0,
        class: "u-empty-1",
        style: normalizeStyle(e3.imageStyle),
        viewBox: "0 0 184 152",
        xmlns: "http://www.w3.org/2000/svg"
      }, Y1, 4)) : e3.image === "2" ? (openBlock(), createElementBlock("svg", {
        key: 1,
        class: "u-empty-2",
        style: normalizeStyle(e3.imageStyle),
        viewBox: "0 0 64 41",
        xmlns: "http://www.w3.org/2000/svg"
      }, G1, 4)) : renderSlot(e3.$slots, "default", { key: 2 }, () => [
        createBaseVNode("img", {
          class: "u-empty",
          src: e3.image,
          style: normalizeStyle(e3.imageStyle),
          alt: "image"
        }, null, 12, J1)
      ], true),
      e3.description ? (openBlock(), createElementBlock("p", {
        key: 3,
        class: normalizeClass(["u-description", { gray: e3.image === "2" }])
      }, [
        renderSlot(e3.$slots, "description", {}, () => [
          createTextVNode(toDisplayString(e3.description), 1)
        ], true)
      ], 2)) : createCommentVNode("", true)
    ]));
  }
});
var Se2 = W(X1, [["__scopeId", "data-v-fca5069e"]]);
Se2.install = (a3) => {
  a3.component(Se2.__name, Se2);
};
var qt2 = (a3) => (pushScopeId("data-v-c92d5a45"), a3 = a3(), popScopeId(), a3);
var Z1 = ["title"];
var x1 = ["placeholder"];
var Q1 = qt2(() => createBaseVNode("path", { d: "M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" }, null, -1));
var el2 = [
  Q1
];
var tl2 = qt2(() => createBaseVNode("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1));
var al2 = [
  tl2
];
var ll2 = ["onClick"];
var sl2 = qt2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1));
var ol2 = [
  sl2
];
var nl2 = ["title", "onMouseenter", "onClick"];
var il2 = defineComponent({
  __name: "Select",
  props: {
    options: { default: () => [] },
    label: { default: "label" },
    value: { default: "value" },
    placeholder: { default: "请选择" },
    disabled: { type: Boolean, default: false },
    allowClear: { type: Boolean, default: false },
    search: { type: Boolean, default: false },
    filter: { type: [Function, Boolean], default: true },
    width: { default: 120 },
    height: { default: 32 },
    maxDisplay: { default: 6 },
    modelValue: { default: null }
  },
  emits: ["update:modelValue", "change"],
  setup(a3, { emit: e3 }) {
    const t3 = a3, s3 = ref(), n = ref(), c3 = ref(), o = ref(), u3 = ref(false), p = ref(true), g = ref(true), d3 = ref(false), v = ref(false), $ = ref();
    watchEffect(() => {
      t3.search ? (s3.value = t3.options.filter((L3) => typeof t3.filter == "function" ? t3.filter(c3.value, L3) : L3[t3.label].includes(c3.value)), s3.value.length && c3.value ? o.value = s3.value[0][t3.value] : o.value = null) : s3.value = t3.options;
    }), watchEffect(() => {
      k3();
    }), watch(u3, (L3) => {
      !L3 && t3.search && (c3.value = n.value);
    });
    function k3() {
      if (t3.modelValue) {
        const L3 = t3.options.find((H3) => H3[t3.value] === t3.modelValue);
        L3 ? (n.value = L3[t3.label], o.value = L3[t3.value]) : (n.value = t3.modelValue, o.value = null);
      } else
        n.value = null, o.value = null;
      t3.search && (c3.value = n.value);
    }
    function y3() {
      u3.value && (u3.value = false), t3.search && (v.value = false, g.value = true);
    }
    function f() {
      t3.allowClear && n.value && (g.value = false, d3.value = true, t3.search && (v.value = false));
    }
    function m3() {
      t3.allowClear && d3.value && (d3.value = false, t3.search || (g.value = true)), t3.search && (u3.value ? (v.value = true, g.value = false, $.value.focus()) : (v.value = false, g.value = true));
    }
    function M3(L3) {
      o.value = L3;
    }
    function b3() {
      p.value = false;
    }
    function _() {
      o.value = null, p.value = true, $.value.focus();
    }
    function w3() {
      if (u3.value = !u3.value, c3.value = "", !o.value && n.value) {
        const L3 = t3.options.find((H3) => H3[t3.label] === n.value);
        o.value = L3 ? L3[t3.value] : null;
      }
      t3.search && (d3.value || (g.value = !u3.value, v.value = u3.value));
    }
    function z3() {
      d3.value = false, n.value = null, o.value = null, u3.value = false, g.value = true, e3("update:modelValue"), e3("change");
    }
    function D3(L3, H3, I3) {
      t3.modelValue !== L3 && (n.value = H3, o.value = L3, e3("update:modelValue", L3), e3("change", L3, H3, I3)), u3.value = false, t3.search && (v.value = false, g.value = true);
    }
    return (L3, H3) => (openBlock(), createElementBlock("div", {
      class: "m-select",
      style: normalizeStyle(`height: ${L3.height}px;`)
    }, [
      createBaseVNode("div", {
        class: normalizeClass(["m-select-wrap", { hover: !L3.disabled, focus: u3.value, disabled: L3.disabled }]),
        style: normalizeStyle(`width: ${L3.width}px; height: ${L3.height}px;`),
        tabindex: "1",
        ref_key: "selectRef",
        ref: $,
        onMouseenter: f,
        onMouseleave: m3,
        onBlur: H3[1] || (H3[1] = (I3) => p.value && !L3.disabled ? y3() : () => false),
        onClick: H3[2] || (H3[2] = (I3) => L3.disabled ? () => false : w3())
      }, [
        L3.search ? withDirectives((openBlock(), createElementBlock("input", {
          key: 1,
          class: "u-search",
          style: normalizeStyle(`line-height: ${L3.height - 2}px;`),
          autocomplete: "off",
          "onUpdate:modelValue": H3[0] || (H3[0] = (I3) => c3.value = I3),
          placeholder: n.value || L3.placeholder
        }, null, 12, x1)), [
          [
            vModelText,
            c3.value,
            void 0,
            {
              number: true,
              trim: true
            }
          ]
        ]) : (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["u-select-input", { placeholder: !n.value }]),
          style: normalizeStyle(`line-height: ${L3.height - 2}px;`),
          title: n.value
        }, toDisplayString(n.value || L3.placeholder), 15, Z1)),
        (openBlock(), createElementBlock("svg", {
          focusable: "false",
          class: normalizeClass(["u-svg", { show: v.value }]),
          "data-icon": "search",
          "aria-hidden": "true",
          viewBox: "64 64 896 896"
        }, el2, 2)),
        (openBlock(), createElementBlock("svg", {
          class: normalizeClass(["u-svg", { rotate: u3.value, show: g.value }]),
          viewBox: "64 64 896 896",
          "data-icon": "down",
          "aria-hidden": "true",
          focusable: "false"
        }, al2, 2)),
        (openBlock(), createElementBlock("svg", {
          onClick: withModifiers(z3, ["stop"]),
          class: normalizeClass(["close", { show: d3.value }]),
          focusable: "false",
          "data-icon": "close-circle",
          "aria-hidden": "true",
          viewBox: "64 64 896 896"
        }, ol2, 10, ll2))
      ], 38),
      createVNode(TransitionGroup, {
        name: "fade",
        tag: "div"
      }, {
        default: withCtx(() => [
          withDirectives(createBaseVNode("div", {
            class: "m-options-panel",
            onMouseenter: b3,
            onMouseleave: _,
            key: "1",
            style: normalizeStyle(`top: ${L3.height + 4}px; line-height: ${L3.height - 10}px; max-height: ${L3.maxDisplay * L3.height + 9}px; width: ${L3.width}px;`)
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(s3.value, (I3, P) => (openBlock(), createElementBlock("p", {
              key: P,
              class: normalizeClass(["u-option", { "option-hover": !I3.disabled && I3[L3.value] === o.value, "option-selected": I3[L3.label] === n.value, "option-disabled": I3.disabled }]),
              title: I3[L3.label],
              onMouseenter: (ke) => M3(I3[L3.value]),
              onClick: (ke) => I3.disabled ? () => false : D3(I3[L3.value], I3[L3.label], P)
            }, toDisplayString(I3[L3.label]), 43, nl2))), 128))
          ], 36), [
            [vShow, u3.value && s3.value && s3.value.length]
          ]),
          withDirectives(createBaseVNode("div", {
            key: "2",
            class: "m-empty-wrap",
            style: normalizeStyle(`top: ${L3.height + 4}px; width: ${L3.width}px;`)
          }, [
            createVNode(unref(Se2), {
              image: "2",
              key: "2"
            })
          ], 4), [
            [vShow, u3.value && s3.value && !s3.value.length]
          ])
        ]),
        _: 1
      })
    ], 4));
  }
});
var Me = W(il2, [["__scopeId", "data-v-c92d5a45"]]);
Me.install = (a3) => {
  a3.component(Me.__name, Me);
};
var ul2 = defineComponent({
  __name: "Cascader",
  props: {
    options: { default: () => [] },
    label: { default: "label" },
    value: { default: "value" },
    children: { default: "children" },
    placeholder: { default: "请选择" },
    changeOnSelect: { type: Boolean, default: false },
    gap: { default: 8 },
    width: { default: 120 },
    height: { default: 32 },
    disabled: { type: [Boolean, Array], default: false },
    allowClear: { type: Boolean, default: false },
    search: { type: Boolean, default: false },
    filter: { type: [Function, Boolean], default: true },
    maxDisplay: { default: 6 },
    selectedValue: { default: () => [] }
  },
  emits: ["update:selectedValue", "change"],
  setup(a3, { emit: e3 }) {
    const t3 = a3, s3 = ref([]), n = ref([]), c3 = ref([]), o = ref([]), u3 = ref([]);
    watchEffect(() => {
      c3.value = [...t3.options];
    }), watchEffect(() => {
      s3.value = [...t3.selectedValue];
    }), watchEffect(() => {
      g(s3.value), v(s3.value);
    });
    function p(f, m3) {
      const M3 = f.length;
      for (let b3 = 0; b3 < M3; b3++)
        if (f[b3][t3.value] === s3.value[m3])
          return f[b3][t3.children] || [];
      return [];
    }
    function g(f) {
      o.value = p(c3.value, 0), u3.value = [], f.length > 1 && (u3.value = p(o.value, 1));
    }
    function d3(f, m3) {
      const M3 = f.length;
      for (let b3 = 0; b3 < M3; b3++)
        if (f[b3][t3.value] === s3.value[m3])
          return f[b3][t3.label];
      return s3.value[m3];
    }
    function v(f) {
      n.value[0] = d3(c3.value, 0), f.length > 1 && (n.value[1] = d3(o.value, 1)), f.length > 2 && (n.value[2] = d3(u3.value, 2));
    }
    function $(f, m3) {
      t3.changeOnSelect ? (e3("update:selectedValue", [f]), e3("change", [f], [m3])) : (s3.value = [f], n.value = [m3]);
    }
    function k3(f, m3) {
      t3.changeOnSelect ? (e3("update:selectedValue", [s3.value[0], f]), e3("change", [s3.value[0], f], [n.value[0], m3])) : (s3.value = [s3.value[0], f], n.value = [n.value[0], m3]);
    }
    function y3(f, m3) {
      e3("update:selectedValue", [...s3.value.slice(0, 2), f]), e3("change", [...s3.value.slice(0, 2), f], [...n.value.slice(0, 2), m3]);
    }
    return (f, m3) => (openBlock(), createElementBlock("div", {
      class: "m-cascader",
      style: normalizeStyle(`height: ${f.height}px; gap: ${f.gap}px;`)
    }, [
      createVNode(unref(Me), {
        options: c3.value,
        label: f.label,
        value: f.value,
        placeholder: Array.isArray(f.placeholder) ? f.placeholder[0] : f.placeholder,
        disabled: Array.isArray(f.disabled) ? f.disabled[0] : f.disabled,
        "allow-clear": f.allowClear,
        search: f.search,
        filter: f.filter,
        width: Array.isArray(f.width) ? f.width[0] : f.width,
        height: f.height,
        "max-display": f.maxDisplay,
        modelValue: s3.value[0],
        "onUpdate:modelValue": m3[0] || (m3[0] = (M3) => s3.value[0] = M3),
        onChange: $
      }, null, 8, ["options", "label", "value", "placeholder", "disabled", "allow-clear", "search", "filter", "width", "height", "max-display", "modelValue"]),
      createVNode(unref(Me), {
        options: o.value,
        label: f.label,
        value: f.value,
        placeholder: Array.isArray(f.placeholder) ? f.placeholder[1] : f.placeholder,
        disabled: Array.isArray(f.disabled) ? f.disabled[1] : f.disabled,
        "allow-clear": f.allowClear,
        search: f.search,
        filter: f.filter,
        width: Array.isArray(f.width) ? f.width[1] : f.width,
        height: f.height,
        "max-display": f.maxDisplay,
        modelValue: s3.value[1],
        "onUpdate:modelValue": m3[1] || (m3[1] = (M3) => s3.value[1] = M3),
        onChange: k3
      }, null, 8, ["options", "label", "value", "placeholder", "disabled", "allow-clear", "search", "filter", "width", "height", "max-display", "modelValue"]),
      createVNode(unref(Me), {
        options: u3.value,
        label: f.label,
        value: f.value,
        placeholder: Array.isArray(f.placeholder) ? f.placeholder[2] : f.placeholder,
        disabled: Array.isArray(f.disabled) ? f.disabled[2] : f.disabled,
        "allow-clear": f.allowClear,
        search: f.search,
        filter: f.filter,
        width: Array.isArray(f.width) ? f.width[2] : f.width,
        height: f.height,
        "max-display": f.maxDisplay,
        modelValue: s3.value[2],
        "onUpdate:modelValue": m3[2] || (m3[2] = (M3) => s3.value[2] = M3),
        onChange: y3
      }, null, 8, ["options", "label", "value", "placeholder", "disabled", "allow-clear", "search", "filter", "width", "height", "max-display", "modelValue"])
    ], 4));
  }
});
var et2 = W(ul2, [["__scopeId", "data-v-3cd9d99b"]]);
et2.install = (a3) => {
  a3.component(et2.__name, et2);
};
var rl2 = ["onClick"];
var cl2 = { class: "u-label" };
var dl2 = {
  key: 1,
  class: "m-checkbox-wrap"
};
var fl2 = { class: "u-label" };
var pl2 = defineComponent({
  __name: "Checkbox",
  props: {
    options: { default: () => [] },
    disabled: { type: Boolean, default: false },
    vertical: { type: Boolean, default: false },
    value: { default: () => [] },
    gap: { default: 8 },
    width: { default: "auto" },
    height: { default: "auto" },
    indeterminate: { type: Boolean, default: false },
    checked: { type: Boolean, default: false }
  },
  emits: ["update:value", "update:checked", "change"],
  setup(a3, { emit: e3 }) {
    const t3 = a3, s3 = computed(() => t3.options.length), n = computed(() => typeof t3.width == "number" ? t3.width + "px" : t3.width), c3 = computed(() => typeof t3.height == "number" ? t3.height + "px" : t3.height), o = ref(t3.value);
    watch(
      () => t3.value,
      (d3) => {
        o.value = d3;
      }
    );
    const u3 = computed(() => t3.vertical ? {
      marginBottom: t3.gap + "px"
    } : {
      marginRight: t3.gap + "px"
    });
    function p(d3) {
      if (t3.value.includes(d3)) {
        const v = o.value.filter(($) => $ !== d3);
        e3("update:value", v), e3("change", v);
      } else {
        const v = [...o.value, d3];
        e3("update:value", v), e3("change", v);
      }
    }
    function g() {
      e3("update:checked", !t3.checked);
    }
    return (d3, v) => (openBlock(), createElementBlock("div", {
      class: "m-checkbox",
      style: normalizeStyle(`max-width: ${n.value}; max-height: ${c3.value};`)
    }, [
      s3.value ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(d3.options, ($, k3) => (openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-checkbox-wrap", { vertical: d3.vertical }]),
        style: normalizeStyle(s3.value !== k3 + 1 ? u3.value : ""),
        key: k3
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["m-box", { disabled: d3.disabled || $.disabled }]),
          onClick: (y3) => d3.disabled || $.disabled ? () => false : p($.value)
        }, [
          createBaseVNode("span", {
            class: normalizeClass(["u-checkbox", { "u-checkbox-checked": o.value.includes($.value) }])
          }, null, 2),
          createBaseVNode("span", cl2, [
            renderSlot(d3.$slots, "default", {
              label: $.label
            }, () => [
              createTextVNode(toDisplayString($.label), 1)
            ], true)
          ])
        ], 10, rl2)
      ], 6))), 128)) : (openBlock(), createElementBlock("div", dl2, [
        createBaseVNode("div", {
          class: normalizeClass(["m-box", { disabled: d3.disabled }]),
          onClick: g
        }, [
          createBaseVNode("span", {
            class: normalizeClass(["u-checkbox", { "u-checkbox-checked": d3.checked && !d3.indeterminate, indeterminate: d3.indeterminate }])
          }, null, 2),
          createBaseVNode("span", fl2, [
            renderSlot(d3.$slots, "default", {}, () => [
              createTextVNode("Check all")
            ], true)
          ])
        ], 2)
      ]))
    ], 4));
  }
});
var tt2 = W(pl2, [["__scopeId", "data-v-b8d3c4b9"]]);
tt2.install = (a3) => {
  a3.component(tt2.__name, tt2);
};
var vl2 = defineComponent({
  __name: "Col",
  props: {
    span: { default: void 0 },
    offset: { default: 0 },
    flex: { default: "" },
    xs: { default: void 0 },
    sm: { default: void 0 },
    md: { default: void 0 },
    lg: { default: void 0 },
    xl: { default: void 0 },
    xxl: { default: void 0 }
  },
  setup(a3) {
    const e3 = a3, t3 = computed(() => typeof e3.flex == "number" ? `${e3.flex} ${e3.flex} auto` : e3.flex), s3 = computed(() => {
      if (n.value >= 1600 && e3.xxl)
        return typeof e3.xxl == "object" ? e3.xxl : {
          span: e3.xxl,
          offset: void 0
        };
      if (n.value >= 1200 && e3.xl)
        return typeof e3.xl == "object" ? e3.xl : {
          span: e3.xl,
          offset: void 0
        };
      if (n.value >= 992 && e3.lg)
        return typeof e3.lg == "object" ? e3.lg : {
          span: e3.lg,
          offset: void 0
        };
      if (n.value >= 768 && e3.md)
        return typeof e3.md == "object" ? e3.md : {
          span: e3.md,
          offset: void 0
        };
      if (n.value >= 576 && e3.sm)
        return typeof e3.sm == "object" ? e3.sm : {
          span: e3.sm,
          offset: void 0
        };
      if (n.value < 576 && e3.xs)
        return typeof e3.xs == "object" ? e3.xs : {
          span: e3.xs,
          offset: void 0
        };
    }), n = ref(document.documentElement.clientWidth);
    onMounted(() => {
      window.addEventListener("resize", c3);
    }), onUnmounted(() => {
      window.removeEventListener("resize", c3);
    });
    function c3() {
      n.value = document.documentElement.clientWidth;
    }
    return (o, u3) => {
      var p, g;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(`m-col col-${((p = s3.value) == null ? void 0 : p.span) || o.span} offset-${((g = s3.value) == null ? void 0 : g.offset) || o.offset}`),
        style: normalizeStyle([{ "padding-left": "var(--xGap)", "padding-right": "var(--xGap)" }, `flex: ${t3.value}`])
      }, [
        renderSlot(o.$slots, "default", {}, void 0, true)
      ], 6);
    };
  }
});
var at = W(vl2, [["__scopeId", "data-v-c7ddaac6"]]);
at.install = (a3) => {
  a3.component(at.__name, at);
};
var hl2 = (a3) => (pushScopeId("data-v-7bb27cfd"), a3 = a3(), popScopeId(), a3);
var ml2 = { class: "m-collapse" };
var _l2 = ["onClick"];
var gl2 = {
  key: 0,
  focusable: "false",
  class: "u-arrow",
  "data-icon": "right",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var yl2 = hl2(() => createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" }, null, -1));
var wl2 = [
  yl2
];
var kl2 = { class: "u-lang" };
var bl2 = defineComponent({
  __name: "Collapse",
  props: {
    collapseData: { default: () => [] },
    activeKey: { default: null },
    copyable: { type: Boolean, default: false },
    lang: { default: "" },
    fontSize: { default: 14 },
    headerFontSize: { default: 0 },
    textFontSize: { default: 0 },
    showArrow: { type: Boolean, default: true }
  },
  emits: ["update:activeKey", "change"],
  setup(a3, { emit: e3 }) {
    const t3 = a3;
    watchEffect(() => {
      c3(t3.collapseData.length);
    }, { flush: "post" });
    const s3 = ref(), n = ref([]);
    function c3(v) {
      for (let $ = 0; $ < v; $++)
        n.value.push(s3.value[$].offsetHeight);
    }
    function o(v) {
      e3("update:activeKey", v), e3("change", v);
    }
    function u3(v) {
      if (p(v))
        if (Array.isArray(t3.activeKey)) {
          const $ = t3.activeKey.filter((k3) => k3 !== v);
          o($);
        } else
          o(null);
      else
        Array.isArray(t3.activeKey) ? o([...t3.activeKey, v]) : o(v);
    }
    function p(v) {
      return Array.isArray(t3.activeKey) ? t3.activeKey.includes(v) : t3.activeKey === v;
    }
    const g = ref("Copy");
    function d3(v) {
      navigator.clipboard.writeText(s3.value[v].innerText || "").then(() => {
        g.value = "Copied", pe(() => {
          g.value = "Copy";
        }, 3e3);
      }, ($) => {
        g.value = $;
      });
    }
    return (v, $) => {
      const k3 = resolveComponent("Button");
      return openBlock(), createElementBlock("div", ml2, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(v.collapseData, (y3, f) => (openBlock(), createElementBlock("div", {
          class: normalizeClass(["m-collapse-item", { "u-collapse-item-active": p(y3.key || f) }]),
          key: f
        }, [
          createBaseVNode("div", {
            class: "u-collapse-header",
            onClick: (m3) => u3(y3.key || f)
          }, [
            v.showArrow ? (openBlock(), createElementBlock("svg", gl2, wl2)) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass(["u-header", { ml24: v.showArrow }]),
              style: normalizeStyle(`font-size: ${v.headerFontSize || v.fontSize}px;`)
            }, [
              renderSlot(v.$slots, "header", {
                header: y3.header,
                key: y3.key || f
              }, () => [
                createTextVNode(toDisplayString(y3.header || "--"), 1)
              ], true)
            ], 6)
          ], 8, _l2),
          createBaseVNode("div", {
            class: normalizeClass(["u-collapse-content", { "u-collapse-copyable": v.copyable }]),
            style: normalizeStyle(`height: ${p(y3.key || f) ? n.value[f] : 0}px; opacity: ${p(y3.key || f) ? 1 : 0};`)
          }, [
            createBaseVNode("div", kl2, [
              renderSlot(v.$slots, "lang", {
                lang: v.lang,
                key: y3.key || f
              }, () => [
                createTextVNode(toDisplayString(v.lang), 1)
              ], true)
            ]),
            createVNode(k3, {
              size: "small",
              class: "u-copy",
              type: "primary",
              onClick: (m3) => d3(f)
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(g.value), 1)
              ]),
              _: 2
            }, 1032, ["onClick"]),
            createBaseVNode("div", {
              ref_for: true,
              ref_key: "text",
              ref: s3,
              class: "u-text",
              style: normalizeStyle(`font-size: ${v.textFontSize || v.fontSize}px;`)
            }, [
              renderSlot(v.$slots, "text", {
                text: y3.text,
                key: y3.key || f
              }, () => [
                createTextVNode(toDisplayString(y3.text), 1)
              ], true)
            ], 4)
          ], 6)
        ], 2))), 128))
      ]);
    };
  }
});
var lt = W(bl2, [["__scopeId", "data-v-7bb27cfd"]]);
lt.install = (a3) => {
  a3.component(lt.__name, lt);
};
var $l2 = { class: "m-countdown" };
var Ml2 = { class: "m-time" };
var Cl2 = defineComponent({
  __name: "Countdown",
  props: {
    title: { default: "Countdown" },
    value: { default: void 0 },
    format: { default: "HH:mm:ss" },
    prefix: { default: "" },
    suffix: { default: "" },
    titleStyle: { default: () => ({}) },
    valueStyle: { default: () => ({}) },
    finishedText: { default: "Finished" }
  },
  emits: ["finish"],
  setup(a3, { emit: e3 }) {
    const t3 = a3, s3 = ref(), n = ref(), c3 = ref(1), o = ref(1);
    onMounted(() => {
      c3.value = s3.value.offsetWidth, o.value = n.value.offsetWidth;
    });
    const u3 = ref(), p = ref(), g = computed(() => ({
      showMillisecond: t3.format.includes("SSS"),
      showYear: t3.format.includes("Y"),
      showMonth: t3.format.includes("M"),
      showDay: t3.format.includes("D"),
      showHour: t3.format.includes("H"),
      showMinute: t3.format.includes("m"),
      showSecond: t3.format.includes("s")
    }));
    function d3(k3) {
      return k3 < 10 ? "0" + k3 : String(k3);
    }
    function v(k3) {
      if (k3 === null)
        return "--";
      let y3 = t3.format;
      if (g.value.showMillisecond) {
        var f = k3 % 1e3;
        y3 = y3.replace("SSS", "0".repeat(3 - String(f).length) + f);
      }
      if (k3 = Math.floor(k3 / 1e3), g.value.showYear) {
        var m3 = Math.floor(k3 / 31104e3);
        y3 = y3.includes("YY") ? y3.replace("YY", d3(m3)) : y3.replace("Y", String(m3));
      } else
        var m3 = 0;
      if (g.value.showMonth) {
        k3 = k3 - m3 * 60 * 60 * 24 * 30 * 12;
        var M3 = Math.floor(k3 / (60 * 60 * 24 * 30));
        y3 = y3.includes("MM") ? y3.replace("MM", d3(M3)) : y3.replace("M", String(M3));
      } else
        var M3 = 0;
      if (g.value.showDay) {
        k3 = k3 - M3 * 60 * 60 * 24 * 30;
        var b3 = Math.floor(k3 / (60 * 60 * 24));
        y3 = y3.includes("DD") ? y3.replace("DD", d3(b3)) : y3.replace("D", String(b3));
      } else
        var b3 = 0;
      if (g.value.showHour) {
        k3 = k3 - b3 * 60 * 60 * 24;
        var _ = Math.floor(k3 / (60 * 60));
        y3 = y3.includes("HH") ? y3.replace("HH", d3(_)) : y3.replace("H", String(_));
      } else
        var _ = 0;
      if (g.value.showMinute) {
        k3 = k3 - _ * 60 * 60;
        var w3 = Math.floor(k3 / 60);
        y3 = y3.includes("mm") ? y3.replace("mm", d3(w3)) : y3.replace("m", String(w3));
      } else
        var w3 = 0;
      if (g.value.showSecond) {
        var z3 = k3 - w3 * 60;
        y3 = y3.includes("ss") ? y3.replace("ss", d3(z3)) : y3.replace("s", String(z3));
      }
      return y3;
    }
    function $() {
      u3.value > Date.now() ? (p.value = u3.value - Date.now(), fe($)) : (p.value = 0, e3("finish"));
    }
    return watchEffect(() => {
      Number.isFinite(t3.value) ? (t3.value >= Date.now() ? u3.value = t3.value : u3.value = t3.value + Date.now(), fe($)) : p.value = null;
    }), (k3, y3) => (openBlock(), createElementBlock("div", $l2, [
      createBaseVNode("div", {
        class: "u-title",
        style: normalizeStyle(k3.titleStyle)
      }, [
        renderSlot(k3.$slots, "title", {}, () => [
          createTextVNode(toDisplayString(t3.title), 1)
        ], true)
      ], 4),
      createBaseVNode("div", Ml2, [
        c3.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          c3.value || p.value > 0 || p.value === null ? (openBlock(), createElementBlock("span", {
            key: 0,
            ref_key: "prefixRef",
            ref: s3,
            class: "u-prefix"
          }, [
            renderSlot(k3.$slots, "prefix", {}, () => [
              createTextVNode(toDisplayString(k3.prefix), 1)
            ], true)
          ], 512)) : createCommentVNode("", true)
        ], 64)) : createCommentVNode("", true),
        k3.finishedText && p.value === 0 && p.value !== null ? (openBlock(), createElementBlock("span", {
          key: 1,
          class: "u-time-value",
          style: normalizeStyle(k3.valueStyle)
        }, [
          renderSlot(k3.$slots, "finish", {}, () => [
            createTextVNode(toDisplayString(k3.finishedText), 1)
          ], true)
        ], 4)) : createCommentVNode("", true),
        Number.isFinite(p.value) && p.value > 0 ? (openBlock(), createElementBlock("span", {
          key: 2,
          class: "u-time-value",
          style: normalizeStyle(k3.valueStyle)
        }, toDisplayString(v(p.value)), 5)) : createCommentVNode("", true),
        o.value ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          o.value || p.value > 0 || p.value === null ? (openBlock(), createElementBlock("span", {
            key: 0,
            ref_key: "suffixRef",
            ref: n,
            class: "u-suffix"
          }, [
            renderSlot(k3.$slots, "suffix", {}, () => [
              createTextVNode(toDisplayString(k3.suffix), 1)
            ], true)
          ], 512)) : createCommentVNode("", true)
        ], 64)) : createCommentVNode("", true)
      ])
    ]));
  }
});
var st2 = W(Cl2, [["__scopeId", "data-v-8a3ac908"]]);
st2.install = (a3) => {
  a3.component(st2.__name, st2);
};
var zl2 = {
  inheritAttrs: false
};
var Bl2 = defineComponent({
  ...zl2,
  __name: "DatePicker",
  props: {
    width: { default: 180 },
    mode: { default: "date" },
    showTime: { type: Boolean, default: false },
    showToday: { type: Boolean, default: false },
    modelType: { default: "format" }
  },
  setup(a3) {
    const e3 = a3, t3 = computed(() => e3.mode === "time"), s3 = computed(() => e3.mode === "week"), n = computed(() => e3.mode === "month"), c3 = computed(() => e3.mode === "year");
    return (o, u3) => (openBlock(), createElementBlock("div", {
      class: "m-datepicker",
      style: normalizeStyle(`width: ${o.width}px;`)
    }, [
      createVNode(unref(Oa), mergeProps({
        locale: "zh-CN",
        "month-change-on-scroll": false,
        "enable-time-picker": o.showTime,
        "time-picker": t3.value,
        "week-picker": s3.value,
        "month-picker": n.value,
        "year-picker": c3.value,
        "now-button-label": "今天",
        "show-now-button": o.showToday,
        "auto-apply": "",
        "text-input": "",
        "model-type": o.modelType,
        "day-names": ["一", "二", "三", "四", "五", "六", "七"]
      }, o.$attrs), null, 16, ["enable-time-picker", "time-picker", "week-picker", "month-picker", "year-picker", "show-now-button", "model-type"])
    ], 4));
  }
});
var ot2 = W(Bl2, [["__scopeId", "data-v-83e36abf"]]);
ot2.install = (a3) => {
  a3.component(ot2.__name, ot2);
};
var Sl2 = { class: "m-header" };
var Fl2 = { class: "u-title" };
var Ll2 = { class: "u-extra" };
var Al2 = { key: 0 };
var Dl2 = ["colspan"];
var Hl2 = { key: 1 };
var El2 = defineComponent({
  __name: "Descriptions",
  props: {
    title: { default: "" },
    bordered: { type: Boolean, default: false },
    column: { default: () => ({ xs: 1, sm: 2, md: 3 }) },
    extra: { default: "" },
    size: { default: "default" },
    labelStyle: { default: () => ({}) },
    contentStyle: { default: () => ({}) }
  },
  setup(a3) {
    const e3 = a3, t3 = ref(document.documentElement.clientWidth);
    onMounted(() => {
      window.addEventListener("resize", s3);
    }), onUnmounted(() => {
      window.removeEventListener("resize", s3);
    });
    function s3() {
      t3.value = document.documentElement.clientWidth;
    }
    const n = computed(() => typeof e3.column == "object" ? t3.value >= 1600 && e3.column.xxl ? e3.column.xxl : t3.value >= 1200 && e3.column.xl ? e3.column.xl : t3.value >= 992 && e3.column.lg ? e3.column.lg : t3.value >= 768 && e3.column.md ? e3.column.md : t3.value >= 576 && e3.column.sm ? e3.column.sm : t3.value < 576 && e3.column.xs ? e3.column.xs : 1 : e3.column), c3 = ref(), o = ref(), u3 = ref(), p = ref(), g = ref([]), d3 = computed(() => g.value.length);
    watchEffect(() => {
      e3.bordered ? o.value = Array.from(c3.value.children).filter((y3) => y3.className === "m-desc-item-bordered") : o.value = Array.from(c3.value.children).filter((y3) => y3.className === "m-desc-item");
    }, { flush: "post" }), watch(o, (y3) => {
      g.value = [], nextTick(() => {
        v(y3, n.value);
      });
    }), watch(n, (y3) => {
      g.value = [], nextTick(() => {
        v(o.value, y3);
      });
    });
    function v(y3, f) {
      const m3 = y3.length;
      let M3 = [];
      for (let b3 = 0; b3 < m3; b3++) {
        const _ = {
          span: Math.min(y3[b3].dataset.span, f),
          element: y3[b3]
        };
        $(M3) < f ? (_.span = Math.min(_.span, f - $(M3)), b3 === m3 - 1 && (_.span = f - $(M3)), M3.push(_), b3 === m3 - 1 && g.value.push(M3)) : (g.value.push(M3), M3 = [_], b3 === m3 - 1 && (_.span = f, g.value.push(M3)));
      }
      e3.bordered ? nextTick(() => {
        g.value.forEach((b3, _) => {
          b3.forEach((w3) => {
            const z3 = Array.from(w3.element.children), D3 = z3[0].cloneNode(true);
            D3.colSpan = 1, k3(D3, e3.labelStyle), k3(D3, JSON.parse(w3.element.dataset.labelStyle));
            const L3 = z3[1].cloneNode(true);
            L3.colSpan = w3.span * 2 - 1, k3(L3, e3.contentStyle), k3(L3, JSON.parse(w3.element.dataset.contentStyle)), p.value[_].appendChild(D3), p.value[_].appendChild(L3);
          });
        });
      }) : nextTick(() => {
        y3.forEach((b3, _) => {
          const w3 = Array.from(b3.children), z3 = w3[0];
          k3(z3, e3.labelStyle), k3(z3, JSON.parse(b3.dataset.labelStyle));
          const D3 = w3[1];
          k3(D3, e3.contentStyle), k3(D3, JSON.parse(b3.dataset.contentStyle)), u3.value[_].appendChild(b3);
        });
      });
    }
    function $(y3) {
      return y3.reduce((f, m3) => f + m3.span, 0);
    }
    function k3(y3, f) {
      JSON.stringify(f) !== "{}" && Object.keys(f).forEach((m3) => {
        y3.style[m3] = f[m3];
      });
    }
    return (y3, f) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["m-desc", `desc-${y3.size}`])
    }, [
      createBaseVNode("div", Sl2, [
        createBaseVNode("div", Fl2, [
          renderSlot(y3.$slots, "title", {}, () => [
            createTextVNode(toDisplayString(y3.title), 1)
          ], true)
        ]),
        createBaseVNode("div", Ll2, [
          renderSlot(y3.$slots, "extra", {}, () => [
            createTextVNode(toDisplayString(y3.extra), 1)
          ], true)
        ])
      ]),
      withDirectives(createBaseVNode("div", {
        ref_key: "view",
        ref: c3
      }, [
        renderSlot(y3.$slots, "default", {}, void 0, true)
      ], 512), [
        [vShow, false]
      ]),
      createBaseVNode("div", {
        class: normalizeClass(["m-desc-view", { "m-bordered": y3.bordered }])
      }, [
        createBaseVNode("table", null, [
          y3.bordered ? (openBlock(), createElementBlock("tbody", Hl2, [
            d3.value ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(d3.value, (m3) => (openBlock(), createElementBlock("tr", {
              ref_for: true,
              ref_key: "rows",
              ref: p,
              class: "tr-bordered",
              key: m3
            }))), 128)) : createCommentVNode("", true)
          ])) : (openBlock(), createElementBlock("tbody", Al2, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(g.value, (m3, M3) => (openBlock(), createElementBlock("tr", { key: M3 }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(m3, (b3, _) => (openBlock(), createElementBlock("td", {
                ref_for: true,
                ref_key: "cols",
                ref: u3,
                class: "u-item-td",
                colspan: b3.span,
                key: _
              }, null, 8, Dl2))), 128))
            ]))), 128))
          ]))
        ])
      ], 2)
    ], 2));
  }
});
var nt = W(El2, [["__scopeId", "data-v-50d36368"]]);
nt.install = (a3) => {
  a3.component(nt.__name, nt);
};
var Il2 = ["data-span", "data-label-style", "data-content-style"];
var Rl2 = { class: "u-label" };
var Tl2 = { class: "u-content" };
var Vl2 = ["data-span", "data-label-style", "data-content-style"];
var Wl2 = { class: "u-label-th" };
var jl2 = { class: "u-content-td" };
var Pl2 = defineComponent({
  __name: "DescriptionsItem",
  props: {
    label: { default: "" },
    span: { default: 1 },
    labelStyle: { default: () => ({}) },
    contentStyle: { default: () => ({}) }
  },
  setup(a3) {
    return (e3, t3) => (openBlock(), createElementBlock(Fragment, null, [
      createBaseVNode("div", {
        class: "m-desc-item",
        "data-span": e3.span,
        "data-label-style": JSON.stringify(e3.labelStyle),
        "data-content-style": JSON.stringify(e3.contentStyle)
      }, [
        createBaseVNode("span", Rl2, [
          renderSlot(e3.$slots, "label", {}, () => [
            createTextVNode(toDisplayString(e3.label), 1)
          ], true)
        ]),
        createBaseVNode("span", Tl2, [
          renderSlot(e3.$slots, "default", {}, void 0, true)
        ])
      ], 8, Il2),
      createBaseVNode("div", {
        class: "m-desc-item-bordered",
        "data-span": e3.span,
        "data-label-style": JSON.stringify(e3.labelStyle),
        "data-content-style": JSON.stringify(e3.contentStyle)
      }, [
        createBaseVNode("th", Wl2, [
          renderSlot(e3.$slots, "label", {}, () => [
            createTextVNode(toDisplayString(e3.label), 1)
          ], true)
        ]),
        createBaseVNode("td", jl2, [
          renderSlot(e3.$slots, "default", {}, void 0, true)
        ])
      ], 8, Vl2)
    ], 64));
  }
});
var it = W(Pl2, [["__scopeId", "data-v-d38b635d"]]);
it.install = (a3) => {
  a3.component(it.__name, it);
};
var Nt = (a3) => (pushScopeId("data-v-4113c0a5"), a3 = a3(), popScopeId(), a3);
var Ol2 = { class: "m-dialog-root" };
var ql2 = { class: "m-dialog-mask" };
var Nl2 = ["onClick"];
var Ul2 = { class: "m-dialog-header" };
var Yl2 = { class: "u-head" };
var Kl2 = Nt(() => createBaseVNode("path", { d: "M290 236.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0 0 13.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 0 0 0 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 0 0-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z" }, null, -1));
var Gl2 = [
  Kl2
];
var Jl2 = Nt(() => createBaseVNode("path", { d: "M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 0 0 0 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 0 0 391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 0 0-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z" }, null, -1));
var Xl2 = [
  Jl2
];
var Zl2 = Nt(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1));
var xl2 = [
  Zl2
];
var Ql2 = { class: "m-dialog-footer" };
var es = defineComponent({
  __name: "Dialog",
  props: {
    title: { default: "提示" },
    content: { default: "" },
    width: { default: 640 },
    height: { default: "auto" },
    switchFullscreen: { type: Boolean, default: false },
    cancelText: { default: "取消" },
    okText: { default: "确定" },
    footer: { type: Boolean, default: false },
    center: { type: Boolean, default: true },
    top: { default: 100 },
    loading: { type: Boolean, default: false },
    visible: { type: Boolean, default: false }
  },
  emits: ["close", "cancel", "ok"],
  setup(a3, { emit: e3 }) {
    const t3 = a3, s3 = ref(false), n = computed(() => typeof t3.height == "number" ? t3.height + "px" : t3.height);
    watch(
      () => t3.visible,
      (d3) => {
        d3 && (s3.value = false);
      }
    );
    function c3() {
      t3.loading || e3("close");
    }
    function o() {
      s3.value = !s3.value;
    }
    function u3() {
      e3("close");
    }
    function p() {
      e3("cancel");
    }
    function g() {
      e3("ok");
    }
    return (d3, v) => (openBlock(), createElementBlock("div", Ol2, [
      createVNode(Transition, { name: "mask" }, {
        default: withCtx(() => [
          withDirectives(createBaseVNode("div", ql2, null, 512), [
            [vShow, d3.visible]
          ])
        ]),
        _: 1
      }),
      createVNode(Transition, null, {
        default: withCtx(() => [
          withDirectives(createBaseVNode("div", {
            class: "m-dialog-wrap",
            onClick: withModifiers(c3, ["self"])
          }, [
            createBaseVNode("div", {
              ref: "dialog",
              class: normalizeClass(["m-dialog", d3.center ? "relative-hv-center" : "top-center"]),
              style: normalizeStyle(`width: ${s3.value ? "100%" : t3.width + "px"}; height: ${s3.value ? "100vh" : n.value}; top: ${d3.center ? "50%" : s3.value ? 0 : d3.top + "px"};`)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["m-dialog-content", { loading: d3.loading }])
              }, [
                createVNode(unref(ue), {
                  class: "u-spin",
                  spinning: d3.loading,
                  size: "small"
                }, null, 8, ["spinning"]),
                createBaseVNode("div", Ul2, [
                  createBaseVNode("p", Yl2, [
                    renderSlot(d3.$slots, "title", {}, () => [
                      createTextVNode(toDisplayString(d3.title), 1)
                    ], true)
                  ])
                ]),
                withDirectives((openBlock(), createElementBlock("svg", {
                  onClick: o,
                  class: "u-screen",
                  viewBox: "64 64 896 896",
                  "data-icon": "fullscreen",
                  "aria-hidden": "true",
                  focusable: "false"
                }, Gl2, 512)), [
                  [vShow, !s3.value && d3.switchFullscreen]
                ]),
                withDirectives((openBlock(), createElementBlock("svg", {
                  onClick: o,
                  class: "u-screen",
                  viewBox: "64 64 896 896",
                  "data-icon": "fullscreen-exit",
                  "aria-hidden": "true",
                  focusable: "false"
                }, Xl2, 512)), [
                  [vShow, s3.value && d3.switchFullscreen]
                ]),
                (openBlock(), createElementBlock("svg", {
                  onClick: u3,
                  class: "u-close",
                  viewBox: "64 64 896 896",
                  "data-icon": "close",
                  "aria-hidden": "true",
                  focusable: "false"
                }, xl2)),
                createBaseVNode("div", {
                  class: "m-dialog-body",
                  style: normalizeStyle(`height: calc(${s3.value ? "100vh" : n.value} - ${d3.footer ? "110px" : "57px"});`)
                }, [
                  renderSlot(d3.$slots, "default", {}, () => [
                    createTextVNode(toDisplayString(d3.content), 1)
                  ], true)
                ], 4),
                withDirectives(createBaseVNode("div", Ql2, [
                  createVNode(unref(he), {
                    class: "mr8",
                    onClick: p
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(d3.cancelText), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(unref(he), {
                    type: "primary",
                    onClick: g
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(d3.okText), 1)
                    ]),
                    _: 1
                  })
                ], 512), [
                  [vShow, d3.footer]
                ])
              ], 2)
            ], 6)
          ], 8, Nl2), [
            [vShow, d3.visible]
          ])
        ]),
        _: 3
      })
    ]));
  }
});
var ut = W(es, [["__scopeId", "data-v-4113c0a5"]]);
ut.install = (a3) => {
  a3.component(ut.__name, ut);
};
var ts = defineComponent({
  __name: "Divider",
  props: {
    dashed: { type: Boolean, default: false },
    orientation: { default: "center" },
    orientationMargin: { default: "" },
    borderWidth: { default: 1 }
  },
  setup(a3) {
    const e3 = a3, t3 = ref(), s3 = ref(true), n = computed(() => {
      if (e3.orientationMargin !== "")
        return typeof e3.orientationMargin == "number" ? e3.orientationMargin + "px" : e3.orientationMargin;
    });
    return onMounted(() => {
      t3.value.offsetHeight || (s3.value = false);
    }), (c3, o) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([
        `m-divider ${c3.orientation}`,
        {
          dashed: c3.dashed,
          margin24: !s3.value,
          marginLeft: c3.orientationMargin !== "" && c3.orientation === "left",
          marginRight: c3.orientationMargin !== "" && c3.orientation === "right"
        }
      ]),
      style: normalizeStyle(`--border-width: ${c3.borderWidth}px;`)
    }, [
      c3.orientation === "left" ? withDirectives((openBlock(), createElementBlock("span", {
        key: 0,
        class: "u-text",
        style: normalizeStyle(`margin-left: ${n.value};`),
        ref_key: "text",
        ref: t3
      }, [
        renderSlot(c3.$slots, "default", {}, void 0, true)
      ], 4)), [
        [vShow, s3.value]
      ]) : c3.orientation === "right" ? withDirectives((openBlock(), createElementBlock("span", {
        key: 1,
        class: "u-text",
        style: normalizeStyle(`margin-right: ${n.value};`),
        ref_key: "text",
        ref: t3
      }, [
        renderSlot(c3.$slots, "default", {}, void 0, true)
      ], 4)), [
        [vShow, s3.value]
      ]) : withDirectives((openBlock(), createElementBlock("span", {
        key: 2,
        class: "u-text",
        ref_key: "text",
        ref: t3
      }, [
        renderSlot(c3.$slots, "default", {}, void 0, true)
      ], 512)), [
        [vShow, s3.value]
      ])
    ], 6));
  }
});
var rt2 = W(ts, [["__scopeId", "data-v-df281fd1"]]);
rt2.install = (a3) => {
  a3.component(rt2.__name, rt2);
};
var Qt = (a3) => (pushScopeId("data-v-84da70c0"), a3 = a3(), popScopeId(), a3);
var as = {
  class: "m-drawer",
  tabindex: "-1"
};
var ls = ["onClick"];
var ss = { class: "m-drawer-content" };
var os = {
  key: 0,
  class: "m-drawer-body-wrapper"
};
var ns = { class: "m-drawer-header" };
var is = { class: "m-header-title" };
var us = Qt(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1));
var rs = [
  us
];
var cs = { class: "u-title" };
var ds = { class: "m-drawer-extra" };
var fs = { class: "m-drawer-body" };
var ps = {
  key: 1,
  class: "m-drawer-body-wrapper"
};
var vs = { class: "m-drawer-header" };
var hs = { class: "m-header-title" };
var ms = Qt(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1));
var _s = [
  ms
];
var gs = { class: "u-title" };
var ys = { class: "m-drawer-extra" };
var ws = { class: "m-drawer-body" };
var ks = defineComponent({
  __name: "Drawer",
  props: {
    title: { default: "" },
    width: { default: 378 },
    height: { default: 378 },
    closable: { type: Boolean, default: true },
    destroyOnClose: { type: Boolean, default: false },
    extra: { default: "" },
    placement: { default: "right" },
    zIndex: { default: 1e3 },
    open: { type: Boolean, default: false }
  },
  emits: ["update:open", "close"],
  setup(a3, { emit: e3 }) {
    const t3 = a3, s3 = computed(() => typeof t3.width == "number" ? t3.width + "px" : t3.width), n = computed(() => typeof t3.height == "number" ? t3.height + "px" : t3.height);
    function c3(u3) {
      o(u3);
    }
    function o(u3) {
      e3("update:open", false), e3("close", u3);
    }
    return (u3, p) => (openBlock(), createElementBlock("div", as, [
      createVNode(Transition, { name: "fade" }, {
        default: withCtx(() => [
          withDirectives(createBaseVNode("div", {
            class: "m-drawer-mask",
            onClick: withModifiers(c3, ["self"])
          }, null, 8, ls), [
            [vShow, u3.open]
          ])
        ]),
        _: 1
      }),
      createVNode(Transition, {
        name: `motion-${u3.placement}`
      }, {
        default: withCtx(() => [
          withDirectives(createBaseVNode("div", {
            class: normalizeClass(["m-drawer-wrapper", `drawer-${u3.placement}`]),
            style: normalizeStyle(`z-index: ${u3.zIndex}; ${["top", "bottom"].includes(u3.placement) ? "height:" + n.value : "width:" + s3.value};`)
          }, [
            createBaseVNode("div", ss, [
              u3.destroyOnClose ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", os, [
                createBaseVNode("div", ns, [
                  createBaseVNode("div", is, [
                    u3.closable ? (openBlock(), createElementBlock("svg", {
                      key: 0,
                      focusable: "false",
                      onClick: o,
                      class: "u-close",
                      "data-icon": "close",
                      width: "1em",
                      height: "1em",
                      fill: "currentColor",
                      "aria-hidden": "true",
                      viewBox: "64 64 896 896"
                    }, rs)) : createCommentVNode("", true),
                    createBaseVNode("p", cs, [
                      renderSlot(u3.$slots, "title", {}, () => [
                        createTextVNode(toDisplayString(u3.title), 1)
                      ], true)
                    ])
                  ]),
                  createBaseVNode("div", ds, [
                    renderSlot(u3.$slots, "extra", {}, () => [
                      createTextVNode(toDisplayString(u3.extra), 1)
                    ], true)
                  ])
                ]),
                createBaseVNode("div", fs, [
                  renderSlot(u3.$slots, "default", {}, void 0, true)
                ])
              ])),
              u3.destroyOnClose && u3.open ? (openBlock(), createElementBlock("div", ps, [
                createBaseVNode("div", vs, [
                  createBaseVNode("div", hs, [
                    (openBlock(), createElementBlock("svg", {
                      focusable: "false",
                      onClick: o,
                      class: "u-close",
                      "data-icon": "close",
                      width: "1em",
                      height: "1em",
                      fill: "currentColor",
                      "aria-hidden": "true",
                      viewBox: "64 64 896 896"
                    }, _s)),
                    createBaseVNode("p", gs, [
                      renderSlot(u3.$slots, "title", {}, () => [
                        createTextVNode(toDisplayString(u3.title), 1)
                      ], true)
                    ])
                  ]),
                  createBaseVNode("div", ys, [
                    renderSlot(u3.$slots, "extra", {}, () => [
                      createTextVNode(toDisplayString(u3.extra), 1)
                    ], true)
                  ])
                ]),
                createBaseVNode("div", ws, [
                  renderSlot(u3.$slots, "default", {}, void 0, true)
                ])
              ])) : createCommentVNode("", true)
            ])
          ], 6), [
            [vShow, u3.open]
          ])
        ]),
        _: 3
      }, 8, ["name"])
    ]));
  }
});
var ct = W(ks, [["__scopeId", "data-v-84da70c0"]]);
ct.install = (a3) => {
  a3.component(ct.__name, ct);
};
var bs = (a3) => (pushScopeId("data-v-61f1cac1"), a3 = a3(), popScopeId(), a3);
var $s = bs(() => createBaseVNode("div", { class: "m-tooltip-arrow" }, [
  createBaseVNode("span", { class: "u-tooltip-arrow" })
], -1));
var Ms = defineComponent({
  __name: "Tooltip",
  props: {
    maxWidth: { default: 120 },
    content: { default: "暂无内容" },
    tooltip: { default: "暂无提示" },
    fontSize: { default: 14 },
    color: { default: "#FFF" },
    backgroundColor: { default: "rgba(0, 0, 0, .85)" },
    overlayStyle: { default: () => ({}) }
  },
  emits: ["openChange"],
  setup(a3, { emit: e3 }) {
    const t3 = ref(false), s3 = ref(), n = ref(0), c3 = ref(0), o = ref(), u3 = ref();
    function p() {
      const v = o.value.offsetWidth, $ = u3.value.offsetWidth, k3 = u3.value.offsetHeight;
      n.value = k3 + 4, c3.value = ($ - v) / 2;
    }
    function g() {
      p(), _e(s3.value), t3.value = true, e3("openChange", t3.value);
    }
    function d3() {
      s3.value = pe(() => {
        t3.value = false, e3("openChange", t3.value);
      }, 100);
    }
    return (v, $) => (openBlock(), createElementBlock("div", {
      class: "m-tooltip",
      onMouseenter: g,
      onMouseleave: d3
    }, [
      createBaseVNode("div", {
        ref_key: "tooltipRef",
        ref: u3,
        class: normalizeClass(["m-tooltip-content", { "show-tip": t3.value }]),
        style: normalizeStyle(`--tooltip-font-size: ${v.fontSize}px; --tooltip-color: ${v.color}; --tooltip-background-color: ${v.backgroundColor}; max-width: ${v.maxWidth}px; top: ${-n.value}px; left: ${-c3.value}px;`),
        onMouseenter: g,
        onMouseleave: d3
      }, [
        createBaseVNode("div", {
          class: "u-tooltip",
          style: normalizeStyle(v.overlayStyle)
        }, [
          renderSlot(v.$slots, "tooltip", {}, () => [
            createTextVNode(toDisplayString(v.tooltip), 1)
          ], true)
        ], 4),
        $s
      ], 38),
      createBaseVNode("div", {
        ref_key: "contentRef",
        ref: o
      }, [
        renderSlot(v.$slots, "default", {}, () => [
          createTextVNode(toDisplayString(v.content), 1)
        ], true)
      ], 512)
    ], 32));
  }
});
var Te2 = W(Ms, [["__scopeId", "data-v-61f1cac1"]]);
Te2.install = (a3) => {
  a3.component(Te2.__name, Te2);
};
var Cs = defineComponent({
  __name: "Ellipsis",
  props: {
    maxWidth: { default: "100%" },
    line: { default: void 0 },
    expand: { type: Boolean, default: false },
    tooltip: { type: Boolean, default: true },
    tooltipMaxWidth: { default: void 0 },
    tooltipFontSize: { default: 14 },
    tooltipColor: { default: "#FFF" },
    tooltipBackgroundColor: { default: "rgba(0, 0, 0, .85)" },
    tooltipOverlayStyle: { default: () => ({ padding: "8px 12px", textAlign: "justify" }) }
  },
  emits: ["expandChange"],
  setup(a3, { emit: e3 }) {
    const t3 = a3, s3 = computed(() => typeof t3.maxWidth == "number" ? t3.maxWidth + "px" : t3.maxWidth), n = ref(), c3 = ref(), o = ref();
    watchEffect(() => {
      n.value = t3.tooltip;
    }), watchEffect(() => {
      t3.tooltip && (t3.tooltipMaxWidth ? o.value = t3.tooltipMaxWidth : o.value = c3.value.offsetWidth + 24);
    }, { flush: "post" });
    function u3() {
      c3.value.style["-webkit-line-clamp"] ? (t3.tooltip ? (n.value = false, nextTick(() => {
        c3.value.style["-webkit-line-clamp"] = "";
      })) : c3.value.style["-webkit-line-clamp"] = "", e3("expandChange", true)) : (t3.tooltip && (n.value = true), c3.value.style["-webkit-line-clamp"] = t3.line, e3("expandChange", false));
    }
    return (p, g) => n.value ? (openBlock(), createBlock(unref(Te2), {
      key: 0,
      "max-width": o.value,
      fontSize: p.tooltipFontSize,
      color: p.tooltipColor,
      backgroundColor: p.tooltipBackgroundColor,
      overlayStyle: p.tooltipOverlayStyle
    }, {
      tooltip: withCtx(() => [
        renderSlot(p.$slots, "tooltip", {}, () => [
          renderSlot(p.$slots, "default", {}, void 0, true)
        ], true)
      ]),
      default: withCtx(() => [
        createBaseVNode("div", mergeProps({
          ref_key: "ellipsis",
          ref: c3,
          class: ["m-ellipsis", [p.line ? "ellipsis-line" : "not-ellipsis-line", { "cursor-pointer": p.expand }]],
          style: `-webkit-line-clamp: ${p.line}; max-width: ${s3.value};`,
          onClick: g[0] || (g[0] = (d3) => p.expand ? u3() : () => false)
        }, p.$attrs), [
          renderSlot(p.$slots, "default", {}, void 0, true)
        ], 16)
      ]),
      _: 3
    }, 8, ["max-width", "fontSize", "color", "backgroundColor", "overlayStyle"])) : (openBlock(), createElementBlock("div", mergeProps({
      key: 1,
      ref_key: "ellipsis",
      ref: c3,
      class: ["m-ellipsis", [p.line ? "ellipsis-line" : "not-ellipsis-line", { "cursor-pointer": p.expand }]],
      style: `-webkit-line-clamp: ${p.line}; max-width: ${s3.value};`,
      onClick: g[1] || (g[1] = (d3) => p.expand ? u3() : () => false)
    }, p.$attrs), [
      renderSlot(p.$slots, "default", {}, void 0, true)
    ], 16));
  }
});
var dt = W(Cs, [["__scopeId", "data-v-becc1d77"]]);
dt.install = (a3) => {
  a3.component(dt.__name, dt);
};
var ge = (a3) => (pushScopeId("data-v-fa50b810"), a3 = a3(), popScopeId(), a3);
var zs = { class: "m-image-wrap" };
var Bs = ["onLoad", "src", "alt"];
var Ss = ["onClick"];
var Fs = { class: "m-image-mask-info" };
var Ls = ge(() => createBaseVNode("svg", {
  class: "u-eye",
  focusable: "false",
  "data-icon": "eye",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" })
], -1));
var As = { class: "u-pre" };
var Ds = { class: "m-preview-mask" };
var Hs = ["onClick", "onWheel"];
var Es = { class: "m-preview-body" };
var Is = { class: "m-preview-operations" };
var Rs = ["title"];
var Ts = ge(() => createBaseVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "close",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })
], -1));
var Vs = [
  Ts
];
var Ws = ge(() => createBaseVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "zoom-in",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" })
], -1));
var js = [
  Ws
];
var Ps = ge(() => createBaseVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "zoom-out",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" })
], -1));
var Os = [
  Ps
];
var qs = ge(() => createBaseVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "expand",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M342 88H120c-17.7 0-32 14.3-32 32v224c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V168h174c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zm578 576h-48c-8.8 0-16 7.2-16 16v176H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h222c17.7 0 32-14.3 32-32V680c0-8.8-7.2-16-16-16zM342 856H168V680c0-8.8-7.2-16-16-16h-48c-8.8 0-16 7.2-16 16v224c0 17.7 14.3 32 32 32h222c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zM904 88H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h174v176c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V120c0-17.7-14.3-32-32-32z" })
], -1));
var Ns = [
  qs
];
var Us = ge(() => createBaseVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "rotate-right",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-.4-12.6 6.1l-.2 64c-118.6.5-235.8 53.4-314.6 154.2A399.75 399.75 0 00123.5 631h74.9c-.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8z" }),
  createBaseVNode("path", { d: "M880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H396V494h440v326z" })
], -1));
var Ys = [
  Us
];
var Ks = ge(() => createBaseVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "rotate-left",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H188V494h440v326z" }),
  createBaseVNode("path", { d: "M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7.4 12.6-6.1v-63.9c12.9.1 25.9.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8a325.95 325.95 0 016.5 140.9h74.9c14.8-103.6-11.3-213-81-302.3z" })
], -1));
var Gs = [
  Ks
];
var Js = ["src", "alt", "onLoad"];
var Xs = ge(() => createBaseVNode("svg", {
  focusable: "false",
  class: "u-switch",
  "data-icon": "left",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })
], -1));
var Zs = [
  Xs
];
var xs = ge(() => createBaseVNode("svg", {
  focusable: "false",
  class: "u-switch",
  "data-icon": "right",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" })
], -1));
var Qs = [
  xs
];
var eo2 = defineComponent({
  __name: "Image",
  props: {
    src: { default: "" },
    name: { default: "" },
    width: { default: 200 },
    height: { default: 200 },
    fit: { default: "contain" },
    preview: { default: "预览" },
    zoomRatio: { default: 0.1 },
    minZoomScale: { default: 0.1 },
    maxZoomScale: { default: 10 },
    resetOnDbclick: { type: Boolean, default: true },
    loop: { type: Boolean, default: false },
    album: { type: Boolean, default: false }
  },
  setup(a3) {
    const e3 = a3, t3 = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), s3 = computed(() => typeof e3.height == "number" ? e3.height + "px" : e3.height), n = ref([]);
    watchEffect(() => {
      n.value = c3();
    });
    function c3() {
      return Array.isArray(e3.src) ? e3.src : [{
        src: e3.src,
        name: e3.name
      }];
    }
    const o = computed(() => n.value.length);
    onMounted(() => {
      document.addEventListener("keydown", M3);
    }), onUnmounted(() => {
      document.removeEventListener("keydown", M3);
    });
    const u3 = ref(Array(o.value).fill(false)), p = ref(Array(o.value).fill(false)), g = ref(0), d3 = ref(false), v = ref(0), $ = ref(1), k3 = ref(0), y3 = ref(0), f = ref(0), m3 = ref(0);
    function M3(N) {
      N.preventDefault(), d3.value && o.value > 1 && ((N.key === "ArrowLeft" || N.key === "ArrowUp") && He(), (N.key === "ArrowRight" || N.key === "ArrowDown") && Ee());
    }
    function b3(N) {
      u3.value[N] = true;
    }
    function _(N) {
      p.value[N] = true;
    }
    function w3(N) {
      if (N) {
        if (N.name)
          return N.name;
        {
          const te = N.src.split("?")[0].split("/");
          return te[te.length - 1];
        }
      }
    }
    function z3(N) {
      $.value = 1, v.value = 0, f.value = 0, m3.value = 0, d3.value = true, g.value = N;
    }
    function D3(N, te) {
      const ne = String(N).split(".")[1], ee = String(te).split(".")[1];
      let ie = Math.max((ne == null ? void 0 : ne.length) || 0, (ee == null ? void 0 : ee.length) || 0), be2 = N.toFixed(ie), ze2 = te.toFixed(ie);
      return (+be2.replace(".", "") + +ze2.replace(".", "")) / Math.pow(10, ie);
    }
    function L3() {
      d3.value = false;
    }
    function H3() {
      $.value + e3.zoomRatio > e3.maxZoomScale ? $.value = e3.maxZoomScale : $.value = D3($.value, e3.zoomRatio);
    }
    function I3() {
      $.value - e3.zoomRatio < e3.minZoomScale ? $.value = e3.minZoomScale : $.value = D3($.value, -e3.zoomRatio);
    }
    function P() {
      $.value = 1, v.value = 0, f.value = 0, m3.value = 0;
    }
    function ke(N) {
      console.log("e", N);
      const te = N.deltaY * e3.zoomRatio * 0.1;
      $.value === e3.minZoomScale && te > 0 || $.value === e3.maxZoomScale && te < 0 || ($.value - te < e3.minZoomScale ? $.value = e3.minZoomScale : $.value - te > e3.maxZoomScale ? $.value = e3.maxZoomScale : $.value = D3($.value, -te));
    }
    function De() {
      v.value -= 90;
    }
    function Ue() {
      v.value += 90;
    }
    function Ye(N) {
      const ne = N.target.getBoundingClientRect(), ee = ne.top, ie = ne.bottom, be2 = ne.right, ze2 = ne.left, Ie2 = document.documentElement.clientWidth, R3 = document.documentElement.clientHeight;
      k3.value = N.clientX, y3.value = N.clientY;
      const ae = f.value, Q3 = m3.value;
      document.onmousemove = ($e) => {
        f.value = ae + $e.clientX - k3.value, m3.value = Q3 + $e.clientY - y3.value;
      }, document.onmouseup = () => {
        f.value > ae + Ie2 - be2 && (f.value = ae + Ie2 - be2), f.value < ae - ze2 && (f.value = ae - ze2), m3.value > Q3 + R3 - ie && (m3.value = Q3 + R3 - ie), m3.value < Q3 - ee && (m3.value = Q3 - ee), document.onmousemove = null;
      };
    }
    function He() {
      e3.loop ? g.value = (g.value - 1 + o.value) % o.value : g.value > 0 && g.value--, P();
    }
    function Ee() {
      e3.loop ? g.value = (g.value + 1) % o.value : g.value < o.value - 1 && g.value++, P();
    }
    return (N, te) => (openBlock(), createElementBlock("div", zs, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(n.value, (ne, ee) => withDirectives((openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-image", { "image-hover-mask": u3.value[ee] }]),
        style: normalizeStyle(`width: ${t3.value}; height: ${s3.value};`),
        key: ee
      }, [
        createVNode(unref(ue), {
          spinning: !u3.value[ee],
          indicator: "dynamic-circle"
        }, {
          default: withCtx(() => [
            createBaseVNode("img", {
              class: "u-image",
              style: normalizeStyle(`width: calc(${t3.value} - 2px); height: calc(${s3.value} - 2px); object-fit: ${N.fit};`),
              onLoad: (ie) => b3(ee),
              src: ne.src,
              alt: ne.name
            }, null, 44, Bs)
          ]),
          _: 2
        }, 1032, ["spinning"]),
        createBaseVNode("div", {
          class: "m-image-mask",
          onClick: (ie) => z3(ee)
        }, [
          createBaseVNode("div", Fs, [
            Ls,
            createBaseVNode("p", As, [
              renderSlot(N.$slots, "preview", {}, () => [
                createTextVNode(toDisplayString(N.preview), 1)
              ], true)
            ])
          ])
        ], 8, Ss)
      ], 6)), [
        [vShow, !N.album || N.album && ee === 0]
      ])), 128)),
      createVNode(Transition, { name: "mask" }, {
        default: withCtx(() => [
          withDirectives(createBaseVNode("div", Ds, null, 512), [
            [vShow, d3.value]
          ])
        ]),
        _: 1
      }),
      createVNode(Transition, { name: "preview" }, {
        default: withCtx(() => [
          withDirectives(createBaseVNode("div", {
            class: "m-preview-wrap",
            onClick: withModifiers(L3, ["self"]),
            onWheel: withModifiers(ke, ["prevent"])
          }, [
            createBaseVNode("div", Es, [
              createBaseVNode("div", Is, [
                createBaseVNode("p", {
                  class: "u-name",
                  title: w3(n.value[g.value])
                }, toDisplayString(w3(n.value[g.value])), 9, Rs),
                withDirectives(createBaseVNode("p", { class: "u-preview-progress" }, toDisplayString(g.value + 1) + " / " + toDisplayString(o.value), 513), [
                  [vShow, Array.isArray(N.src)]
                ]),
                createBaseVNode("div", {
                  class: "u-preview-operation",
                  title: "关闭",
                  onClick: L3
                }, Vs),
                createBaseVNode("div", {
                  class: normalizeClass(["u-preview-operation", { "u-operation-disabled": $.value === N.maxZoomScale }]),
                  title: "放大",
                  onClick: H3
                }, js, 2),
                createBaseVNode("div", {
                  class: normalizeClass(["u-preview-operation", { "u-operation-disabled": $.value === N.minZoomScale }]),
                  title: "缩小",
                  onClick: I3
                }, Os, 2),
                createBaseVNode("div", {
                  class: "u-preview-operation",
                  title: "还原",
                  onClick: P
                }, Ns),
                createBaseVNode("div", {
                  class: "u-preview-operation",
                  title: "向右旋转",
                  onClick: Ue
                }, Ys),
                createBaseVNode("div", {
                  class: "u-preview-operation",
                  title: "向左旋转",
                  onClick: De
                }, Gs)
              ]),
              createBaseVNode("div", {
                class: "m-preview-image",
                style: normalizeStyle(`transform: translate3d(${f.value}px, ${m3.value}px, 0px);`)
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(n.value, (ne, ee) => withDirectives((openBlock(), createBlock(unref(ue), {
                  spinning: !p.value[ee],
                  indicator: "dynamic-circle",
                  key: ee
                }, {
                  default: withCtx(() => [
                    createBaseVNode("img", {
                      class: "u-preview-image",
                      style: normalizeStyle(`transform: scale3d(${$.value}, ${$.value}, 1) rotate(${v.value}deg);`),
                      src: ne.src,
                      alt: ne.name,
                      onMousedown: te[0] || (te[0] = withModifiers((ie) => Ye(ie), ["prevent"])),
                      onLoad: (ie) => _(ee),
                      onDblclick: te[1] || (te[1] = (ie) => N.resetOnDbclick ? P() : () => false)
                    }, null, 44, Js)
                  ]),
                  _: 2
                }, 1032, ["spinning"])), [
                  [vShow, g.value === ee]
                ])), 128))
              ], 4),
              o.value > 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createBaseVNode("div", {
                  class: normalizeClass(["m-switch-left", { "u-switch-disabled": g.value === 0 && !N.loop }]),
                  onClick: He
                }, Zs, 2),
                createBaseVNode("div", {
                  class: normalizeClass(["m-switch-right", { "u-switch-disabled": g.value === o.value - 1 && !N.loop }]),
                  onClick: Ee
                }, Qs, 2)
              ], 64)) : createCommentVNode("", true)
            ])
          ], 40, Hs), [
            [vShow, d3.value]
          ])
        ]),
        _: 1
      })
    ]));
  }
});
var ft2 = W(eo2, [["__scopeId", "data-v-fa50b810"]]);
ft2.install = (a3) => {
  a3.component(ft2.__name, ft2);
};
var Wt = (a3) => (pushScopeId("data-v-b16d02c6"), a3 = a3(), popScopeId(), a3);
var to2 = ["type", "value", "maxlength", "disabled"];
var ao2 = Wt(() => createBaseVNode("svg", {
  focusable: "false",
  class: "u-clear",
  "data-icon": "close-circle",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" })
], -1));
var lo = [
  ao2
];
var so = {
  focusable: "false",
  class: "u-eye",
  "data-icon": "eye",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var oo = Wt(() => createBaseVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" }, null, -1));
var no2 = [
  oo
];
var io = {
  focusable: "false",
  class: "u-eye",
  "data-icon": "eye-invisible",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var uo = Wt(() => createBaseVNode("path", { d: "M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z" }, null, -1));
var ro = Wt(() => createBaseVNode("path", { d: "M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z" }, null, -1));
var co = [
  uo,
  ro
];
var fo = {
  key: 2,
  class: "m-count"
};
var po = {
  inheritAttrs: false
};
var vo = defineComponent({
  ...po,
  __name: "Input",
  props: {
    width: { default: "100%" },
    addonBefore: { default: "" },
    addonAfter: { default: "" },
    allowClear: { type: Boolean, default: false },
    password: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    maxlength: { default: void 0 },
    showCount: { type: Boolean, default: false },
    size: { default: "middle" },
    prefix: { default: "" },
    suffix: { default: "" },
    value: { default: "" },
    valueModifiers: { default: () => ({}) }
  },
  emits: ["update:value", "change", "enter"],
  setup(a3, { emit: e3 }) {
    const t3 = a3, s3 = computed(() => typeof t3.width == "number" ? t3.width + "px" : t3.width), n = computed(() => t3.maxlength ? t3.value.length + " / " + t3.maxlength : t3.value.length), c3 = ref(false), o = ref(), u3 = ref(1), p = ref(), g = ref(1), d3 = ref(), v = ref(1), $ = ref(), k3 = ref(1);
    onMounted(() => {
      u3.value = o.value.offsetWidth, g.value = p.value.offsetWidth, v.value = d3.value.offsetWidth, k3.value = $.value.offsetWidth;
    });
    function y3(w3) {
      "lazy" in t3.valueModifiers || (e3("update:value", w3.target.value), e3("change", w3));
    }
    function f(w3) {
      "lazy" in t3.valueModifiers && (e3("update:value", w3.target.value), e3("change", w3));
    }
    function m3(w3) {
      w3.key === "Enter" && e3("enter", w3);
    }
    const M3 = ref();
    function b3() {
      e3("update:value", ""), M3.value.focus();
    }
    function _() {
      c3.value = !c3.value;
    }
    return (w3, z3) => (openBlock(), createElementBlock("div", {
      class: "m-input-wrap",
      style: normalizeStyle(`width: ${s3.value};`)
    }, [
      v.value !== 23 ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: normalizeClass(["m-addon", { before: v.value }]),
        ref_key: "beforeRef",
        ref: d3
      }, [
        renderSlot(w3.$slots, "addonBefore", {}, () => [
          createTextVNode(toDisplayString(w3.addonBefore), 1)
        ], true)
      ], 2)) : createCommentVNode("", true),
      createBaseVNode("div", {
        class: normalizeClass(["m-input", [`${w3.size}`, { disabled: w3.disabled, "input-before": v.value !== 23, "input-after": k3.value !== 23 }]]),
        tabindex: "1"
      }, [
        u3.value ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: "m-prefix",
          ref_key: "prefixRef",
          ref: o
        }, [
          renderSlot(w3.$slots, "prefix", {}, () => [
            createTextVNode(toDisplayString(w3.prefix), 1)
          ], true)
        ], 512)) : createCommentVNode("", true),
        createBaseVNode("input", mergeProps({
          class: "u-input",
          ref_key: "input",
          ref: M3,
          type: w3.password && !c3.value ? "password" : "text",
          value: w3.value,
          maxlength: w3.maxlength,
          disabled: w3.disabled,
          onInput: y3,
          onChange: f,
          onKeydown: m3
        }, w3.$attrs), null, 16, to2),
        g.value ? (openBlock(), createElementBlock("span", {
          key: 1,
          class: "m-suffix",
          ref_key: "suffixRef",
          ref: p
        }, [
          !w3.disabled && w3.allowClear && w3.value ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: "m-action",
            onClick: b3
          }, lo)) : createCommentVNode("", true),
          w3.password ? (openBlock(), createElementBlock("span", {
            key: 1,
            class: "m-action",
            onClick: _
          }, [
            withDirectives((openBlock(), createElementBlock("svg", so, no2, 512)), [
              [vShow, c3.value]
            ]),
            withDirectives((openBlock(), createElementBlock("svg", io, co, 512)), [
              [vShow, !c3.value]
            ])
          ])) : createCommentVNode("", true),
          w3.showCount ? (openBlock(), createElementBlock("span", fo, toDisplayString(n.value), 1)) : createCommentVNode("", true),
          renderSlot(w3.$slots, "suffix", {}, () => [
            createTextVNode(toDisplayString(w3.suffix), 1)
          ], true)
        ], 512)) : createCommentVNode("", true)
      ], 2),
      k3.value !== 23 ? (openBlock(), createElementBlock("span", {
        key: 1,
        class: normalizeClass(["m-addon", { after: k3.value }]),
        ref_key: "afterRef",
        ref: $
      }, [
        renderSlot(w3.$slots, "addonAfter", {}, () => [
          createTextVNode(toDisplayString(w3.addonAfter), 1)
        ], true)
      ], 2)) : createCommentVNode("", true)
    ], 4));
  }
});
var pt = W(vo, [["__scopeId", "data-v-b16d02c6"]]);
pt.install = (a3) => {
  a3.component(pt.__name, pt);
};
var ea2 = (a3) => (pushScopeId("data-v-275fafbe"), a3 = a3(), popScopeId(), a3);
var ho = { class: "m-input-wrap" };
var mo = { class: "m-handler-wrap" };
var _o = ea2(() => createBaseVNode("svg", {
  focusable: "false",
  class: "u-icon",
  "data-icon": "up",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z" })
], -1));
var go = [
  _o
];
var yo = ea2(() => createBaseVNode("svg", {
  focusable: "false",
  class: "u-icon",
  "data-icon": "down",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" })
], -1));
var wo = [
  yo
];
var ko = {
  inheritAttrs: false
};
var bo = defineComponent({
  ...ko,
  __name: "InputNumber",
  props: {
    width: { default: 90 },
    min: { default: -1 / 0 },
    max: { default: 1 / 0 },
    step: { default: 1 },
    precision: { default: 0 },
    prefix: { default: "" },
    formatter: { type: Function, default: (a3) => a3 },
    keyboard: { type: Boolean, default: true },
    value: { default: null }
  },
  emits: ["update:value", "change"],
  setup(a3, { emit: e3 }) {
    var y3;
    const t3 = a3, s3 = computed(() => typeof t3.width == "number" ? t3.width + "px" : t3.width), n = computed(() => {
      var m3;
      const f = ((m3 = String(t3.step).split(".")[1]) == null ? void 0 : m3.length) || 0;
      return Math.max(t3.precision, f);
    }), c3 = ref(t3.formatter((y3 = t3.value) == null ? void 0 : y3.toFixed(n.value)));
    watch(
      () => t3.value,
      (f) => {
        c3.value = t3.formatter(f == null ? void 0 : f.toFixed(n.value));
      }
    ), watch(
      c3,
      (f) => {
        f || p(null);
      }
    );
    const o = ref(), u3 = ref(1);
    onMounted(() => {
      u3.value = o.value.offsetWidth;
    });
    function p(f) {
      e3("change", f), e3("update:value", f);
    }
    function g(f) {
      var M3, b3;
      const m3 = f.target.value.replaceAll(",", "");
      if (Number.isNaN(parseFloat(m3)))
        c3.value = (b3 = t3.value) == null ? void 0 : b3.toFixed(n.value);
      else {
        if (parseFloat(m3) > t3.max) {
          p(t3.max);
          return;
        }
        if (parseFloat(m3) < t3.min) {
          p(t3.min);
          return;
        }
        parseFloat(m3) !== t3.value ? p(parseFloat(m3)) : c3.value = (M3 = t3.value) == null ? void 0 : M3.toFixed(n.value);
      }
    }
    function d3(f, m3) {
      const M3 = String(f).split(".")[1], b3 = String(m3).split(".")[1];
      let _ = Math.max((M3 == null ? void 0 : M3.length) || 0, (b3 == null ? void 0 : b3.length) || 0), w3 = f.toFixed(_), z3 = m3.toFixed(_);
      return (+w3.replace(".", "") + +z3.replace(".", "")) / Math.pow(10, _);
    }
    function v(f) {
      f.key === "ArrowUp" && $(), f.key === "ArrowDown" && k3();
    }
    function $() {
      const f = parseFloat(Math.min(t3.max, d3(t3.value || 0, +t3.step)).toFixed(n.value));
      p(f);
    }
    function k3() {
      const f = parseFloat(Math.max(t3.min, d3(t3.value || 0, -t3.step)).toFixed(n.value));
      p(f);
    }
    return (f, m3) => (openBlock(), createElementBlock("div", {
      class: "m-input-number",
      tabindex: "1",
      style: normalizeStyle(`width: ${s3.value};`)
    }, [
      createBaseVNode("div", ho, [
        u3.value ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: "u-input-prefix",
          ref_key: "prefixRef",
          ref: o
        }, [
          renderSlot(f.$slots, "prefix", {}, () => [
            createTextVNode(toDisplayString(f.prefix), 1)
          ], true)
        ], 512)) : createCommentVNode("", true),
        f.keyboard ? withDirectives((openBlock(), createElementBlock("input", mergeProps({
          key: 1,
          autocomplete: "off",
          class: "u-input-number",
          onChange: g,
          "onUpdate:modelValue": m3[0] || (m3[0] = (M3) => c3.value = M3),
          onKeydown: [
            m3[1] || (m3[1] = withKeys(withModifiers(() => {
            }, ["prevent"]), ["up"])),
            v
          ]
        }, f.$attrs), null, 16)), [
          [vModelDynamic, c3.value]
        ]) : withDirectives((openBlock(), createElementBlock("input", mergeProps({
          key: 2,
          autocomplete: "off",
          class: "u-input-number",
          onChange: g,
          "onUpdate:modelValue": m3[2] || (m3[2] = (M3) => c3.value = M3)
        }, f.$attrs), null, 16)), [
          [vModelDynamic, c3.value]
        ])
      ]),
      createBaseVNode("div", mo, [
        createBaseVNode("span", {
          class: normalizeClass(["u-up-arrow", { disabled: (f.value || 0) >= f.max }]),
          onClick: $
        }, go, 2),
        createBaseVNode("span", {
          class: normalizeClass(["u-down-arrow", { disabled: (f.value || 0) <= f.min }]),
          onClick: k3
        }, wo, 2)
      ])
    ], 4));
  }
});
var vt2 = W(bo, [["__scopeId", "data-v-275fafbe"]]);
vt2.install = (a3) => {
  a3.component(vt2.__name, vt2);
};
var qe = (a3) => (pushScopeId("data-v-7095e1cc"), a3 = a3(), popScopeId(), a3);
var $o = ["onMouseenter", "onMouseleave"];
var Mo = qe(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1));
var Co = [
  Mo
];
var zo = qe(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1));
var Bo = [
  zo
];
var So = qe(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1));
var Fo = [
  So
];
var Lo = qe(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1));
var Ao = [
  Lo
];
var Do = qe(() => createBaseVNode("circle", {
  class: "path",
  cx: "25",
  cy: "25",
  r: "20",
  fill: "none"
}, null, -1));
var Ho = [
  Do
];
var Eo = { class: "u-content" };
var Be = ((a3) => (a3.info = "#1677FF", a3.success = "#52c41a", a3.error = "#ff4d4f", a3.warning = "#faad14", a3.loading = "#1677FF", a3))(Be || {});
var Io = defineComponent({
  __name: "Message",
  props: {
    duration: { default: 3e3 },
    top: { default: 30 }
  },
  emits: ["close"],
  setup(a3, { expose: e3, emit: t3 }) {
    const s3 = a3, n = ref(), c3 = ref([]), o = ref([]), u3 = ref([]), p = computed(() => c3.value.every((b3) => !b3));
    watch(p, (b3, _) => {
      !_ && b3 && (n.value = pe(() => {
        u3.value.splice(0), c3.value.splice(0);
      }, 300));
    });
    function g(b3) {
      _e(o.value[b3]);
    }
    function d3(b3) {
      M3(b3);
    }
    function v() {
      _e(n.value);
      const b3 = u3.value.length - 1;
      c3.value[b3] = true, M3(b3);
    }
    function $(b3) {
      u3.value.push({
        content: b3,
        mode: "info"
      }), v();
    }
    function k3(b3) {
      u3.value.push({
        content: b3,
        mode: "success"
      }), v();
    }
    function y3(b3) {
      u3.value.push({
        content: b3,
        mode: "error"
      }), v();
    }
    function f(b3) {
      u3.value.push({
        content: b3,
        mode: "warning"
      }), v();
    }
    function m3(b3) {
      u3.value.push({
        content: b3,
        mode: "loading"
      }), v();
    }
    e3({
      info: $,
      success: k3,
      error: y3,
      warning: f,
      loading: m3
    });
    function M3(b3) {
      o.value[b3] = pe(() => {
        c3.value[b3] = false, t3("close");
      }, s3.duration);
    }
    return (b3, _) => (openBlock(), createElementBlock("div", {
      class: "m-message-wrap",
      style: normalizeStyle(`top: ${b3.top}px;`)
    }, [
      createVNode(TransitionGroup, { name: "slide-fade" }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(u3.value, (w3, z3) => withDirectives((openBlock(), createElementBlock("div", {
            class: "m-message",
            key: z3
          }, [
            createBaseVNode("div", {
              class: "m-message-content",
              onMouseenter: (D3) => g(z3),
              onMouseleave: (D3) => d3(z3)
            }, [
              w3.mode === "info" ? (openBlock(), createElementBlock("svg", {
                key: 0,
                class: "u-svg",
                style: normalizeStyle({ fill: Be[w3.mode] }),
                viewBox: "64 64 896 896",
                "data-icon": "info-circle",
                "aria-hidden": "true",
                focusable: "false"
              }, Co, 4)) : createCommentVNode("", true),
              w3.mode === "success" ? (openBlock(), createElementBlock("svg", {
                key: 1,
                class: "u-svg",
                style: normalizeStyle({ fill: Be[w3.mode] }),
                viewBox: "64 64 896 896",
                "data-icon": "check-circle",
                "aria-hidden": "true",
                focusable: "false"
              }, Bo, 4)) : createCommentVNode("", true),
              w3.mode === "error" ? (openBlock(), createElementBlock("svg", {
                key: 2,
                class: "u-svg",
                style: normalizeStyle({ fill: Be[w3.mode] }),
                viewBox: "64 64 896 896",
                "data-icon": "close-circle",
                "aria-hidden": "true",
                focusable: "false"
              }, Fo, 4)) : createCommentVNode("", true),
              w3.mode === "warning" ? (openBlock(), createElementBlock("svg", {
                key: 3,
                class: "u-svg",
                style: normalizeStyle({ fill: Be[w3.mode] }),
                viewBox: "64 64 896 896",
                "data-icon": "exclamation-circle",
                "aria-hidden": "true",
                focusable: "false"
              }, Ao, 4)) : createCommentVNode("", true),
              w3.mode === "loading" ? (openBlock(), createElementBlock("svg", {
                key: 4,
                class: "u-svg circular",
                style: normalizeStyle({ stroke: Be[w3.mode] }),
                viewBox: "0 0 50 50",
                focusable: "false"
              }, Ho, 4)) : createCommentVNode("", true),
              createBaseVNode("p", Eo, toDisplayString(w3.content), 1)
            ], 40, $o)
          ])), [
            [vShow, c3.value[z3]]
          ])), 128))
        ]),
        _: 1
      })
    ], 4));
  }
});
var Ve = W(Io, [["__scopeId", "data-v-7095e1cc"]]);
Ve.install = (a3) => {
  a3.component(Ve.__name, Ve);
};
var Fe = (a3) => (pushScopeId("data-v-1ac5b76f"), a3 = a3(), popScopeId(), a3);
var Ro = { class: "m-modal-root" };
var To = { class: "m-modal-mask" };
var Vo = ["onClick"];
var Wo = { class: "m-body" };
var jo = { class: "m-title" };
var Po = {
  key: 0,
  focusable: "false",
  class: "u-icon confirm",
  "data-icon": "exclamation-circle",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var Oo = Fe(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
var qo = Fe(() => createBaseVNode("path", { d: "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1));
var No = [
  Oo,
  qo
];
var Uo = {
  key: 1,
  focusable: "false",
  class: "u-icon info",
  "data-icon": "info-circle",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var Yo = Fe(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1));
var Ko = [
  Yo
];
var Go = {
  key: 2,
  focusable: "false",
  class: "u-icon success",
  "data-icon": "check-circle",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var Jo = Fe(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1));
var Xo = [
  Jo
];
var Zo = {
  key: 3,
  focusable: "false",
  class: "u-icon error",
  "data-icon": "close-circle",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var xo = Fe(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1));
var Qo = [
  xo
];
var en = {
  key: 4,
  focusable: "false",
  class: "u-icon warning",
  "data-icon": "exclamation-circle",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var tn = Fe(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1));
var an = [
  tn
];
var ln = { class: "u-title" };
var sn2 = { class: "u-content" };
var on2 = { class: "m-btns" };
var nn = defineComponent({
  __name: "Modal",
  props: {
    width: { default: 420 },
    cancelText: { default: "取消" },
    okText: { default: "确定" },
    noticeText: { default: "知道了" },
    center: { type: Boolean, default: true },
    top: { default: 100 },
    loading: { type: Boolean, default: false },
    visible: { type: Boolean, default: false }
  },
  emits: ["cancel", "ok", "know"],
  setup(a3, { expose: e3, emit: t3 }) {
    const s3 = ref(""), n = ref();
    function c3(f) {
      s3.value = "info", n.value = f;
    }
    function o(f) {
      s3.value = "success", n.value = f;
    }
    function u3(f) {
      s3.value = "error", n.value = f;
    }
    function p(f) {
      s3.value = "warning", n.value = f;
    }
    function g(f) {
      s3.value = "confirm", n.value = f;
    }
    function d3(f) {
      s3.value = "erase", n.value = f;
    }
    e3({
      info: c3,
      success: o,
      error: u3,
      warning: p,
      confirm: g,
      erase: d3
    });
    function v() {
      t3("cancel");
    }
    function $() {
      t3("cancel");
    }
    function k3() {
      t3("ok");
    }
    function y3() {
      t3("know");
    }
    return (f, m3) => (openBlock(), createElementBlock("div", Ro, [
      createVNode(Transition, { name: "mask" }, {
        default: withCtx(() => [
          withDirectives(createBaseVNode("div", To, null, 512), [
            [vShow, f.visible]
          ])
        ]),
        _: 1
      }),
      createVNode(Transition, null, {
        default: withCtx(() => {
          var M3, b3;
          return [
            withDirectives(createBaseVNode("div", {
              class: "m-modal-wrap",
              onClick: withModifiers(v, ["self"])
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["m-modal", f.center ? "relative-hv-center" : "top-center"]),
                style: normalizeStyle(`width: ${f.width}px; top: ${f.center ? "50%" : f.top + "px"};`)
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(["m-modal-body", { loading: f.loading }])
                }, [
                  createVNode(unref(ue), {
                    class: "u-spin",
                    spinning: f.loading,
                    size: "small"
                  }, null, 8, ["spinning"]),
                  createBaseVNode("div", Wo, [
                    createBaseVNode("div", jo, [
                      s3.value === "confirm" || s3.value === "erase" ? (openBlock(), createElementBlock("svg", Po, No)) : createCommentVNode("", true),
                      s3.value === "info" ? (openBlock(), createElementBlock("svg", Uo, Ko)) : createCommentVNode("", true),
                      s3.value === "success" ? (openBlock(), createElementBlock("svg", Go, Xo)) : createCommentVNode("", true),
                      s3.value === "error" ? (openBlock(), createElementBlock("svg", Zo, Qo)) : createCommentVNode("", true),
                      s3.value === "warning" ? (openBlock(), createElementBlock("svg", en, an)) : createCommentVNode("", true),
                      createBaseVNode("div", ln, toDisplayString((M3 = n.value) == null ? void 0 : M3.title), 1)
                    ]),
                    createBaseVNode("div", sn2, toDisplayString((b3 = n.value) == null ? void 0 : b3.content), 1)
                  ]),
                  createBaseVNode("div", on2, [
                    s3.value === "confirm" || s3.value === "erase" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                      createVNode(unref(he), {
                        class: "mr8",
                        onClick: $
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(f.cancelText), 1)
                        ]),
                        _: 1
                      }),
                      s3.value === "confirm" ? (openBlock(), createBlock(unref(he), {
                        key: 0,
                        type: "primary",
                        onClick: k3
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(f.okText), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      s3.value === "erase" ? (openBlock(), createBlock(unref(he), {
                        key: 1,
                        type: "danger",
                        onClick: k3
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(f.okText), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ], 64)) : createCommentVNode("", true),
                    ["info", "success", "error", "warning"].includes(s3.value) ? (openBlock(), createBlock(unref(he), {
                      key: 1,
                      type: "primary",
                      onClick: y3
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(f.noticeText), 1)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ])
                ], 2)
              ], 6)
            ], 8, Vo), [
              [vShow, f.visible]
            ])
          ];
        }),
        _: 1
      })
    ]));
  }
});
var ht = W(nn, [["__scopeId", "data-v-1ac5b76f"]]);
ht.install = (a3) => {
  a3.component(ht.__name, ht);
};
var ye2 = (a3) => (pushScopeId("data-v-5e89f85f"), a3 = a3(), popScopeId(), a3);
var un2 = ["onMouseenter", "onMouseleave"];
var rn = { class: "m-notification-content" };
var cn2 = ye2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
var dn2 = ye2(() => createBaseVNode("path", { d: "M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" }, null, -1));
var fn2 = [
  cn2,
  dn2
];
var pn2 = ye2(() => createBaseVNode("path", { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1));
var vn2 = ye2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
var hn2 = [
  pn2,
  vn2
];
var mn2 = ye2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
var _n = ye2(() => createBaseVNode("path", { d: "M464 688a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1));
var gn2 = [
  mn2,
  _n
];
var yn2 = ye2(() => createBaseVNode("path", { d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" }, null, -1));
var wn2 = ye2(() => createBaseVNode("path", { d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
var kn2 = [
  yn2,
  wn2
];
var bn = ["onClick"];
var $n2 = ye2(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1));
var Mn2 = [
  $n2
];
var Re2 = ((a3) => (a3.info = "#1677FF", a3.success = "#52c41a", a3.error = "#ff4d4f", a3.warning = "#faad14", a3))(Re2 || {});
var Cn2 = defineComponent({
  __name: "Notification",
  props: {
    message: { default: "温馨提示" },
    duration: { default: 4500 },
    top: { default: 24 },
    bottom: { default: 24 },
    placement: { default: "topRight" }
  },
  emits: ["close"],
  setup(a3, { expose: e3, emit: t3 }) {
    const s3 = a3, n = ref(), c3 = ref([]), o = ref([]), u3 = ref([]), p = ref(s3.placement), g = ref(), d3 = computed(() => c3.value.length === u3.value.length);
    watch(d3, (w3, z3) => {
      !z3 && w3 && (n.value = pe(() => {
        c3.value.splice(0), u3.value.splice(0);
      }, 300));
    });
    function v(w3) {
      _e(o.value[w3]), o.value[w3] = null;
    }
    function $(w3) {
      s3.duration && (o.value[w3] = pe(() => {
        _(w3);
      }, s3.duration));
    }
    function k3() {
      _e(n.value), o.value.push(null);
      const w3 = u3.value.length - 1;
      nextTick(() => {
        g.value[w3].style.height = g.value[w3].offsetHeight + "px", g.value[w3].style.opacity = 1;
      }), u3.value[w3].placement && (p.value = u3.value[w3].placement), s3.duration && (o.value[w3] = pe(() => {
        _(w3);
      }, s3.duration));
    }
    function y3(w3) {
      u3.value.push({
        ...w3,
        mode: "open"
      }), k3();
    }
    function f(w3) {
      u3.value.push({
        ...w3,
        mode: "info"
      }), k3();
    }
    function m3(w3) {
      u3.value.push({
        ...w3,
        mode: "success"
      }), k3();
    }
    function M3(w3) {
      u3.value.push({
        ...w3,
        mode: "error"
      }), k3();
    }
    function b3(w3) {
      u3.value.push({
        ...w3,
        mode: "warning"
      }), k3();
    }
    e3({
      open: y3,
      info: f,
      success: m3,
      error: M3,
      warning: b3
    });
    function _(w3) {
      c3.value.push(w3), t3("close");
    }
    return (w3, z3) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["m-notification-wrapper", p.value]),
      style: normalizeStyle(`top: ${["topRight", "topLeft"].includes(p.value) ? w3.top : "auto"}px; bottom: ${["bottomRight", "bottomLeft"].includes(p.value) ? w3.bottom : ""}px;`)
    }, [
      createVNode(TransitionGroup, {
        name: ["topRight", "bottomRight"].includes(p.value) ? "right" : "left"
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(u3.value, (D3, L3) => withDirectives((openBlock(), createElementBlock("div", {
            ref_for: true,
            ref_key: "notification",
            ref: g,
            class: "m-notification",
            onMouseenter: (H3) => v(L3),
            onMouseleave: (H3) => $(L3),
            key: L3
          }, [
            createBaseVNode("div", rn, [
              D3.mode === "info" ? (openBlock(), createElementBlock("svg", {
                key: 0,
                class: "u-svg",
                style: normalizeStyle(`fill: ${Re2[D3.mode]}`),
                viewBox: "64 64 896 896",
                "data-icon": "info-circle",
                "aria-hidden": "true",
                focusable: "false"
              }, fn2, 4)) : createCommentVNode("", true),
              D3.mode === "success" ? (openBlock(), createElementBlock("svg", {
                key: 1,
                class: "u-svg",
                style: normalizeStyle(`fill: ${Re2[D3.mode]}`),
                viewBox: "64 64 896 896",
                "data-icon": "check-circle",
                "aria-hidden": "true",
                focusable: "false"
              }, hn2, 4)) : createCommentVNode("", true),
              D3.mode === "warning" ? (openBlock(), createElementBlock("svg", {
                key: 2,
                class: "u-svg",
                style: normalizeStyle(`fill: ${Re2[D3.mode]}`),
                viewBox: "64 64 896 896",
                "data-icon": "exclamation-circle",
                "aria-hidden": "true",
                focusable: "false"
              }, gn2, 4)) : createCommentVNode("", true),
              D3.mode === "error" ? (openBlock(), createElementBlock("svg", {
                key: 3,
                class: "u-svg",
                style: normalizeStyle(`fill: ${Re2[D3.mode]}`),
                viewBox: "64 64 896 896",
                "data-icon": "close-circle",
                "aria-hidden": "true",
                focusable: "false"
              }, kn2, 4)) : createCommentVNode("", true),
              createBaseVNode("div", {
                class: normalizeClass(["u-title", { mb4: D3.mode !== "open", ml36: D3.mode !== "open" }])
              }, toDisplayString(D3.message || w3.message), 3),
              createBaseVNode("p", {
                class: normalizeClass(["u-description", { ml36: D3.mode !== "open" }])
              }, toDisplayString(D3.description || "--"), 3),
              (openBlock(), createElementBlock("svg", {
                class: "u-close",
                onClick: (H3) => _(L3),
                viewBox: "64 64 896 896",
                "data-icon": "close",
                "aria-hidden": "true",
                focusable: "false"
              }, Mn2, 8, bn))
            ])
          ], 40, un2)), [
            [vShow, !c3.value.includes(L3)]
          ])), 128))
        ]),
        _: 1
      }, 8, ["name"])
    ], 6));
  }
});
var mt = W(Cn2, [["__scopeId", "data-v-5e89f85f"]]);
mt.install = (a3) => {
  a3.component(mt.__name, mt);
};
var Le2 = (a3) => (pushScopeId("data-v-80b1a1f1"), a3 = a3(), popScopeId(), a3);
var zn = { class: "m-pagination-wrap" };
var Bn2 = {
  key: 0,
  class: "mr8"
};
var Sn = Le2(() => createBaseVNode("svg", {
  class: "u-arrow",
  viewBox: "64 64 896 896",
  "data-icon": "left",
  "aria-hidden": "true",
  focusable: "false"
}, [
  createBaseVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })
], -1));
var Fn2 = [
  Sn
];
var Ln2 = Le2(() => createBaseVNode("span", { class: "u-ellipsis" }, "•••", -1));
var An2 = Le2(() => createBaseVNode("svg", {
  class: "u-icon",
  viewBox: "64 64 896 896",
  "data-icon": "double-left",
  "aria-hidden": "true",
  focusable: "false"
}, [
  createBaseVNode("path", { d: "M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" })
], -1));
var Dn2 = [
  Ln2,
  An2
];
var Hn2 = ["onClick"];
var En2 = Le2(() => createBaseVNode("span", { class: "u-ellipsis" }, "•••", -1));
var In2 = Le2(() => createBaseVNode("svg", {
  class: "u-icon",
  viewBox: "64 64 896 896",
  "data-icon": "double-right",
  "aria-hidden": "true",
  focusable: "false"
}, [
  createBaseVNode("path", { d: "M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" })
], -1));
var Rn2 = [
  En2,
  In2
];
var Tn2 = Le2(() => createBaseVNode("svg", {
  class: "u-arrow",
  viewBox: "64 64 896 896",
  "data-icon": "right",
  "aria-hidden": "true",
  focusable: "false"
}, [
  createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" })
], -1));
var Vn2 = [
  Tn2
];
var Wn = {
  key: 1,
  class: "u-jump-page"
};
var jn2 = defineComponent({
  __name: "Pagination",
  props: {
    current: { default: 1 },
    pageSize: { default: 10 },
    total: { default: 0 },
    pageListNum: { default: 5 },
    hideOnSinglePage: { type: Boolean, default: false },
    showQuickJumper: { type: Boolean, default: false },
    showTotal: { type: Boolean, default: false },
    placement: { default: "center" }
  },
  emits: ["change"],
  setup(a3, { emit: e3 }) {
    const t3 = a3, s3 = ref(t3.current), n = ref(""), c3 = ref(false), o = ref(false), u3 = ref(false), p = ref(false), g = computed(() => Math.ceil(t3.total / t3.pageSize)), d3 = computed(() => v(s3.value).filter((m3) => m3 !== 1 && m3 !== g.value));
    watch(s3, (m3) => {
      console.log("change:", m3), e3("change", {
        page: m3,
        pageSize: t3.pageSize
      });
    }), onMounted(() => {
      document.onkeydown = (m3) => {
        m3 && m3.key === "Enter" && y3();
      };
    }), onUnmounted(() => {
      document.onkeydown = null;
    });
    function v(m3) {
      var M3 = [], b3 = Math.floor(t3.pageListNum / 2), _ = {
        start: m3 - b3,
        end: m3 + b3
      };
      _.start < 1 && (_.end = _.end + (1 - _.start), _.start = 1), _.end > g.value && (_.start = _.start - (_.end - g.value), _.end = g.value), _.start < 1 && (_.start = 1), _.start > 1 ? c3.value = true : c3.value = false, _.end < g.value ? o.value = true : o.value = false;
      for (let w3 = _.start; w3 <= _.end; w3++)
        M3.push(w3);
      return M3;
    }
    function $() {
      s3.value = s3.value - t3.pageListNum > 0 ? s3.value - t3.pageListNum : 1;
    }
    function k3() {
      s3.value = s3.value + t3.pageListNum < g.value ? s3.value + t3.pageListNum : g.value;
    }
    function y3() {
      var m3 = Number(n.value);
      Number.isInteger(m3) && (m3 < 1 && (m3 = 1), m3 > g.value && (m3 = g.value), f(m3)), n.value = "";
    }
    function f(m3) {
      if (m3 === 0 || m3 === g.value + 1)
        return false;
      s3.value !== m3 && (s3.value = m3);
    }
    return (m3, M3) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([`m-pagination ${m3.placement}`, { hidden: m3.hideOnSinglePage && m3.total <= m3.pageSize }])
    }, [
      createBaseVNode("div", zn, [
        m3.showTotal ? (openBlock(), createElementBlock("span", Bn2, "共 " + toDisplayString(g.value) + " 页 / " + toDisplayString(m3.total) + " 条", 1)) : createCommentVNode("", true),
        createBaseVNode("span", {
          class: normalizeClass(["u-item", { disabled: s3.value === 1 }]),
          onClick: M3[0] || (M3[0] = (b3) => f(s3.value - 1))
        }, Fn2, 2),
        createBaseVNode("span", {
          class: normalizeClass(["u-item", { active: s3.value === 1 }]),
          onClick: M3[1] || (M3[1] = (b3) => f(1))
        }, "1", 2),
        withDirectives(createBaseVNode("span", {
          class: "m-arrow",
          ref: "forward",
          onClick: $,
          onMouseenter: M3[2] || (M3[2] = (b3) => u3.value = true),
          onMouseleave: M3[3] || (M3[3] = (b3) => u3.value = false)
        }, Dn2, 544), [
          [vShow, c3.value && d3.value[0] - 1 > 1]
        ]),
        (openBlock(true), createElementBlock(Fragment, null, renderList(d3.value, (b3, _) => (openBlock(), createElementBlock("span", {
          class: normalizeClass(["u-item", { active: s3.value === b3 }]),
          key: _,
          onClick: (w3) => f(b3)
        }, toDisplayString(b3), 11, Hn2))), 128)),
        withDirectives(createBaseVNode("span", {
          class: "m-arrow",
          ref: "backward",
          onClick: k3,
          onMouseenter: M3[4] || (M3[4] = (b3) => p.value = true),
          onMouseleave: M3[5] || (M3[5] = (b3) => p.value = false)
        }, Rn2, 544), [
          [vShow, o.value && d3.value[d3.value.length - 1] + 1 < g.value]
        ]),
        withDirectives(createBaseVNode("span", {
          class: normalizeClass(["u-item", { active: s3.value === g.value }]),
          onClick: M3[6] || (M3[6] = (b3) => f(g.value))
        }, toDisplayString(g.value), 3), [
          [vShow, g.value !== 1]
        ]),
        createBaseVNode("span", {
          class: normalizeClass(["u-item", { disabled: s3.value === g.value }]),
          onClick: M3[7] || (M3[7] = (b3) => f(s3.value + 1))
        }, Vn2, 2),
        m3.showQuickJumper ? (openBlock(), createElementBlock("span", Wn, [
          createTextVNode("跳至"),
          withDirectives(createBaseVNode("input", {
            type: "text",
            "onUpdate:modelValue": M3[8] || (M3[8] = (b3) => n.value = b3)
          }, null, 512), [
            [vModelText, n.value]
          ]),
          createTextVNode("页")
        ])) : createCommentVNode("", true)
      ])
    ], 2));
  }
});
var We2 = W(jn2, [["__scopeId", "data-v-80b1a1f1"]]);
We2.install = (a3) => {
  a3.component(We2.__name, We2);
};
var Ne2 = (a3) => (pushScopeId("data-v-06ca0c7f"), a3 = a3(), popScopeId(), a3);
var Pn = { class: "m-popconfirm" };
var On2 = { class: "m-pop" };
var qn2 = { class: "m-pop-message" };
var Nn2 = { class: "m-icon" };
var Un2 = {
  key: 0,
  focusable: "false",
  class: "u-icon",
  width: "1em",
  height: "1em",
  style: { fill: "@themeColor" },
  viewBox: "64 64 896 896",
  "data-icon": "info-circle",
  "aria-hidden": "true"
};
var Yn2 = Ne2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1));
var Kn2 = [
  Yn2
];
var Gn2 = {
  key: 1,
  focusable: "false",
  class: "u-icon",
  width: "1em",
  height: "1em",
  style: { fill: "#52c41a" },
  viewBox: "64 64 896 896",
  "data-icon": "check-circle",
  "aria-hidden": "true"
};
var Jn2 = Ne2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1));
var Xn2 = [
  Jn2
];
var Zn2 = {
  key: 2,
  focusable: "false",
  class: "u-icon",
  width: "1em",
  height: "1em",
  style: { fill: "#ff4d4f" },
  viewBox: "64 64 896 896",
  "data-icon": "close-circle",
  "aria-hidden": "true"
};
var xn2 = Ne2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1));
var Qn2 = [
  xn2
];
var e2 = {
  key: 3,
  focusable: "false",
  class: "u-icon",
  width: "1em",
  height: "1em",
  style: { fill: "#faad14" },
  viewBox: "64 64 896 896",
  "data-icon": "exclamation-circle",
  "aria-hidden": "true"
};
var t2 = Ne2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1));
var a22 = [
  t2
];
var l2 = { class: "m-pop-buttons" };
var s22 = Ne2(() => createBaseVNode("div", { class: "m-pop-arrow" }, [
  createBaseVNode("span", { class: "u-pop-arrow" })
], -1));
var o2 = defineComponent({
  __name: "Popconfirm",
  props: {
    title: { default: "" },
    description: { default: "" },
    content: { default: "" },
    icon: { default: "" },
    iconType: { default: "warning" },
    maxWidth: { default: "auto" },
    cancelText: { default: "取消" },
    cancelType: { default: "default" },
    okText: { default: "确定" },
    okType: { default: "primary" },
    showCancel: { type: Boolean, default: true }
  },
  emits: ["cancel", "ok", "openChange"],
  setup(a3, { emit: e3 }) {
    const t3 = a3, s3 = computed(() => typeof t3.maxWidth == "number" ? t3.maxWidth + "px" : t3.maxWidth), n = ref(false), c3 = ref(), o = ref(1);
    onMounted(() => {
      o.value = c3.value.offsetHeight;
    });
    const u3 = ref(0), p = ref(0), g = ref(), d3 = ref();
    function v() {
      const _ = g.value.offsetWidth, w3 = d3.value.offsetWidth, z3 = d3.value.offsetHeight;
      u3.value = z3 + 4, p.value = (w3 - _) / 2;
    }
    const $ = ref(false);
    function k3() {
      $.value = false;
    }
    function y3() {
      $.value = true, d3.value.focus();
    }
    function f() {
      n.value = false, e3("openChange", false);
    }
    function m3() {
      n.value = !n.value, n.value && v(), e3("openChange", n.value);
    }
    function M3(_) {
      n.value = false, e3("openChange", false), e3("cancel", _);
    }
    function b3(_) {
      n.value = false, e3("openChange", false), e3("ok", _);
    }
    return (_, w3) => {
      const z3 = resolveComponent("Button");
      return openBlock(), createElementBlock("div", Pn, [
        createBaseVNode("div", {
          ref_key: "popRef",
          ref: d3,
          tabindex: "1",
          class: normalizeClass(["m-pop-content", { "show-pop": n.value }]),
          style: normalizeStyle(`max-width: ${s3.value}; top: ${-u3.value}px; left: ${-p.value}px;`),
          onBlur: w3[0] || (w3[0] = (D3) => $.value ? f() : () => false)
        }, [
          createBaseVNode("div", On2, [
            createBaseVNode("div", qn2, [
              createBaseVNode("span", Nn2, [
                renderSlot(_.$slots, "icon", {}, () => [
                  _.iconType === "info" ? (openBlock(), createElementBlock("svg", Un2, Kn2)) : createCommentVNode("", true),
                  _.iconType === "success" ? (openBlock(), createElementBlock("svg", Gn2, Xn2)) : createCommentVNode("", true),
                  _.iconType === "error" ? (openBlock(), createElementBlock("svg", Zn2, Qn2)) : createCommentVNode("", true),
                  _.iconType === "warning" ? (openBlock(), createElementBlock("svg", e2, a22)) : createCommentVNode("", true)
                ], true)
              ]),
              createBaseVNode("div", {
                class: normalizeClass(["m-title", { "font-weight": o.value }])
              }, [
                renderSlot(_.$slots, "title", {}, () => [
                  createTextVNode(toDisplayString(_.title), 1)
                ], true)
              ], 2)
            ]),
            o.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "m-pop-description",
              ref_key: "desc",
              ref: c3
            }, [
              renderSlot(_.$slots, "description", {}, () => [
                createTextVNode(toDisplayString(_.description), 1)
              ], true)
            ], 512)) : createCommentVNode("", true),
            createBaseVNode("div", l2, [
              _.showCancel ? (openBlock(), createBlock(z3, {
                key: 0,
                onClick: M3,
                size: "small",
                type: _.cancelType
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_.cancelText), 1)
                ]),
                _: 1
              }, 8, ["type"])) : createCommentVNode("", true),
              createVNode(z3, {
                onClick: b3,
                size: "small",
                type: _.okType
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_.okText), 1)
                ]),
                _: 1
              }, 8, ["type"])
            ])
          ]),
          s22
        ], 38),
        createBaseVNode("div", {
          ref_key: "contentRef",
          ref: g,
          onClick: m3,
          onMouseenter: k3,
          onMouseleave: y3
        }, [
          renderSlot(_.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(_.content), 1)
          ], true)
        ], 544)
      ]);
    };
  }
});
var _t = W(o2, [["__scopeId", "data-v-06ca0c7f"]]);
_t.install = (a3) => {
  a3.component(_t.__name, _t);
};
var ta2 = (a3) => (pushScopeId("data-v-27020600"), a3 = a3(), popScopeId(), a3);
var n2 = { class: "m-progress-inner" };
var i2 = {
  key: 0,
  class: "m-success"
};
var u2 = ta2(() => createBaseVNode("svg", {
  focusable: "false",
  class: "u-icon",
  "data-icon": "check-circle",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" })
], -1));
var r2 = [
  u2
];
var c2 = {
  key: 1,
  class: "u-progress-text"
};
var d22 = {
  class: "u-progress-circle",
  viewBox: "0 0 100 100"
};
var f2 = ["d", "stroke-width"];
var p2 = ["d", "stroke-width", "stroke", "opacity"];
var v2 = {
  key: 0,
  class: "u-icon",
  focusable: "false",
  "data-icon": "check",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var h22 = ta2(() => createBaseVNode("path", { d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" }, null, -1));
var m22 = [
  h22
];
var _2 = {
  key: 1,
  class: "u-progress-text"
};
var g2 = defineComponent({
  __name: "Progress",
  props: {
    width: { default: "100%" },
    percent: { default: 0 },
    strokeColor: { default: "#1677FF" },
    strokeWidth: { default: 8 },
    showInfo: { type: Boolean, default: true },
    type: { default: "line" }
  },
  setup(a3) {
    const e3 = a3, t3 = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), s3 = computed(() => (100 - e3.strokeWidth) * Math.PI), n = computed(() => {
      const o = 100 - e3.strokeWidth;
      return `M 50,50 m 0,-${o / 2}
   a ${o / 2},${o / 2} 0 1 1 0,${o}
   a ${o / 2},${o / 2} 0 1 1 0,-${o}`;
    }), c3 = computed(() => typeof e3.strokeColor == "string" ? e3.strokeColor : `linear-gradient(to ${e3.strokeColor.direction || "right"}, ${e3.strokeColor["0%"] || e3.strokeColor.from}, ${e3.strokeColor["100%"] || e3.strokeColor.to})`);
    return (o, u3) => o.type === "line" ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "m-progress-line",
      style: normalizeStyle(`width: ${t3.value}; height: ${o.strokeWidth < 24 ? 24 : o.strokeWidth}px;`)
    }, [
      createBaseVNode("div", n2, [
        createBaseVNode("div", {
          class: normalizeClass(["u-progress-bg", { "u-success-bg": o.percent >= 100 }]),
          style: normalizeStyle(`background: ${c3.value}; width: ${o.percent >= 100 ? 100 : o.percent}%; height: ${o.strokeWidth}px;`)
        }, null, 6)
      ]),
      o.showInfo ? (openBlock(), createBlock(Transition, {
        key: 0,
        mode: "out-in"
      }, {
        default: withCtx(() => [
          o.percent >= 100 ? (openBlock(), createElementBlock("span", i2, r2)) : (openBlock(), createElementBlock("p", c2, toDisplayString(o.percent >= 100 ? 100 : o.percent) + "%", 1))
        ]),
        _: 1
      })) : createCommentVNode("", true)
    ], 4)) : (openBlock(), createElementBlock("div", {
      key: 1,
      class: "m-progress-circle",
      style: normalizeStyle(`width: ${t3.value}; height: ${t3.value};`)
    }, [
      (openBlock(), createElementBlock("svg", d22, [
        createBaseVNode("path", {
          d: n.value,
          "stroke-linecap": "round",
          class: "u-progress-circle-trail",
          "stroke-width": o.strokeWidth,
          style: normalizeStyle(`stroke-dasharray: ${s3.value}px, ${s3.value}px;`),
          "fill-opacity": "0"
        }, null, 12, f2),
        createBaseVNode("path", {
          d: n.value,
          "stroke-linecap": "round",
          class: normalizeClass(["u-progress-circle-path", { success: o.percent >= 100 }]),
          "stroke-width": o.strokeWidth,
          stroke: c3.value,
          style: normalizeStyle(`stroke-dasharray: ${o.percent / 100 * s3.value}px, ${s3.value}px;`),
          opacity: o.percent === 0 ? 0 : 1,
          "fill-opacity": "0"
        }, null, 14, p2)
      ])),
      o.showInfo ? (openBlock(), createBlock(Transition, {
        key: 0,
        mode: "out-in"
      }, {
        default: withCtx(() => [
          o.percent >= 100 ? (openBlock(), createElementBlock("svg", v2, m22)) : (openBlock(), createElementBlock("p", _2, toDisplayString(o.percent >= 100 ? 100 : o.percent) + "%", 1))
        ]),
        _: 1
      })) : createCommentVNode("", true)
    ], 4));
  }
});
var gt2 = W(g2, [["__scopeId", "data-v-27020600"]]);
gt2.install = (a3) => {
  a3.component(gt2.__name, gt2);
};
var y22 = ["src"];
var w2 = defineComponent({
  __name: "QRCode",
  props: {
    value: { default: "" },
    size: { default: 160 },
    color: { default: "#000" },
    backgroundColor: { default: "#FFF" },
    bordered: { type: Boolean, default: true },
    borderColor: { default: "#0505050f" },
    scale: { default: 8 },
    errorLevel: { default: "H" }
  },
  setup(a3) {
    const e3 = a3, t3 = useQRCode(e3.value, {
      errorCorrectionLevel: e3.errorLevel,
      type: "image/png",
      quality: 1,
      margin: 3,
      scale: e3.scale,
      // 8px per modules(black dots)
      color: {
        dark: e3.color,
        // 像素点颜色
        light: e3.backgroundColor
        // 背景色
      }
    });
    return (s3, n) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["m-qrcode", { bordered: s3.bordered }]),
      style: normalizeStyle(`width: ${s3.size}px; height: ${s3.size}px; border-color: ${s3.borderColor};`)
    }, [
      createBaseVNode("img", {
        src: unref(t3),
        class: "u-qrcode",
        alt: "QRCode"
      }, null, 8, y22)
    ], 6));
  }
});
var yt2 = W(w2, [["__scopeId", "data-v-a604e87a"]]);
yt2.install = (a3) => {
  a3.component(yt2.__name, yt2);
};
var k2 = { class: "m-radio" };
var b2 = ["onClick"];
var $2 = { class: "u-label" };
var M22 = defineComponent({
  __name: "Radio",
  props: {
    options: { default: () => [] },
    disabled: { type: Boolean, default: false },
    vertical: { type: Boolean, default: false },
    value: { default: null },
    gap: { default: 8 }
  },
  emits: ["update:value", "change"],
  setup(a3, { emit: e3 }) {
    const t3 = a3, s3 = computed(() => t3.options.length), n = computed(() => t3.vertical ? {
      marginBottom: t3.gap + "px"
    } : {
      marginRight: t3.gap + "px"
    });
    function c3(o) {
      o !== t3.value && (e3("update:value", o), e3("change", o));
    }
    return (o, u3) => (openBlock(), createElementBlock("div", k2, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(o.options, (p, g) => (openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-radio-wrap", { vertical: o.vertical }]),
        style: normalizeStyle(s3.value !== g + 1 ? n.value : ""),
        key: g
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["m-box", { disabled: o.disabled || p.disabled }]),
          onClick: (d3) => o.disabled || p.disabled ? () => false : c3(p.value)
        }, [
          createBaseVNode("span", {
            class: normalizeClass(["u-radio", { "u-radio-checked": o.value === p.value }])
          }, null, 2),
          createBaseVNode("span", $2, [
            renderSlot(o.$slots, "default", {
              label: p.label
            }, () => [
              createTextVNode(toDisplayString(p.label), 1)
            ], true)
          ])
        ], 10, b2)
      ], 6))), 128))
    ]));
  }
});
var wt = W(M22, [["__scopeId", "data-v-29875fa4"]]);
wt.install = (a3) => {
  a3.component(wt.__name, wt);
};
var we = (a3) => (pushScopeId("data-v-3840d4df"), a3 = a3(), popScopeId(), a3);
var C2 = ["onClick"];
var z2 = ["onClick", "onMouseenter"];
var B2 = we(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" }, null, -1));
var S22 = [
  B2
];
var F2 = we(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" }, null, -1));
var L2 = [
  F2
];
var A2 = we(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" }, null, -1));
var D2 = [
  A2
];
var H22 = we(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" }, null, -1));
var E2 = [
  H22
];
var I2 = ["onClick", "onMouseenter"];
var R2 = we(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" }, null, -1));
var T2 = [
  R2
];
var V2 = we(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" }, null, -1));
var W2 = [
  V2
];
var j2 = we(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" }, null, -1));
var P2 = [
  j2
];
var O2 = we(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" }, null, -1));
var q2 = [
  O2
];
var N2 = defineComponent({
  __name: "Rate",
  props: {
    allowClear: { type: Boolean, default: true },
    allowHalf: { type: Boolean, default: false },
    count: { default: 5 },
    character: { default: "star-filled" },
    size: { default: 20 },
    color: { default: "#fadb14" },
    gap: { default: 8 },
    disabled: { type: Boolean, default: false },
    value: { default: 0 }
  },
  emits: ["update:value", "change", "hoverChange"],
  setup(a3, { emit: e3 }) {
    const t3 = a3, s3 = ref(t3.value), n = ref();
    watch(
      () => t3.value,
      (v) => {
        s3.value = v;
      }
    );
    function c3(v) {
      n.value = null, v !== t3.value ? (e3("change", v), e3("update:value", v)) : t3.allowClear ? (n.value = v, e3("change", 0), e3("update:value", 0)) : e3("change", v);
    }
    function o(v) {
      s3.value = v, e3("hoverChange", v);
    }
    function u3(v) {
      s3.value = v, e3("hoverChange", v);
    }
    function p() {
      n.value = null;
    }
    function g() {
      s3.value = t3.value;
    }
    function d3(v) {
      v.preventDefault();
    }
    return (v, $) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["m-rate", { disabled: v.disabled }]),
      style: normalizeStyle(`--color: ${v.color};`),
      onMouseleave: g
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(v.count, (k3) => (openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-star", { "u-star-half": v.allowHalf && s3.value >= k3 - 0.5 && s3.value < k3, "u-star-full": s3.value >= k3, "temp-gray": !v.allowHalf && n.value === k3 }]),
        style: normalizeStyle(`margin-right: ${k3 !== v.count ? v.gap : 0}px;`),
        onClick: (y3) => v.allowHalf ? d3(y3) : c3(k3),
        key: k3
      }, [
        v.allowHalf ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["u-star-first", { "temp-gray-first": n.value === k3 - 0.5 }]),
          onClick: withModifiers((y3) => c3(k3 - 0.5), ["stop"]),
          onMouseenter: (y3) => o(k3 - 0.5),
          onMouseleave: p
        }, [
          v.character === "star-filled" ? (openBlock(), createElementBlock("svg", {
            key: 0,
            class: "u-star",
            style: normalizeStyle(`width: ${v.size}px;`),
            focusable: "false",
            "data-icon": "star",
            "aria-hidden": "true",
            viewBox: "64 64 896 896"
          }, S22, 4)) : v.character === "star-outlined" ? (openBlock(), createElementBlock("svg", {
            key: 1,
            class: "u-star",
            style: normalizeStyle(`width: ${v.size}px;`),
            focusable: "false",
            "data-icon": "star",
            "aria-hidden": "true",
            viewBox: "64 64 896 896"
          }, L2, 4)) : v.character === "heart-filled" ? (openBlock(), createElementBlock("svg", {
            key: 2,
            class: "u-star",
            style: normalizeStyle(`width: ${v.size}px;`),
            focusable: "false",
            "data-icon": "heart",
            "aria-hidden": "true",
            viewBox: "64 64 896 896"
          }, D2, 4)) : v.character === "heart-outlined" ? (openBlock(), createElementBlock("svg", {
            key: 3,
            class: "u-star",
            style: normalizeStyle(`width: ${v.size}px;`),
            focusable: "false",
            "data-icon": "heart",
            "aria-hidden": "true",
            viewBox: "64 64 896 896"
          }, E2, 4)) : (openBlock(), createElementBlock("span", {
            key: 4,
            class: "u-star",
            style: normalizeStyle(`font-size: ${0.66 * v.size}px; height: ${v.size}px;`)
          }, [
            renderSlot(v.$slots, "character", {}, () => [
              createTextVNode(toDisplayString(v.character), 1)
            ], true)
          ], 4))
        ], 42, z2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: normalizeClass(["u-star-second", { "temp-gray-second": n.value === k3 }]),
          onClick: withModifiers((y3) => c3(k3), ["stop"]),
          onMouseenter: (y3) => u3(k3),
          onMouseleave: p
        }, [
          v.character === "star-filled" ? (openBlock(), createElementBlock("svg", {
            key: 0,
            class: "u-star",
            style: normalizeStyle(`width: ${v.size}px;`),
            focusable: "false",
            "data-icon": "star",
            "aria-hidden": "true",
            viewBox: "64 64 896 896"
          }, T2, 4)) : v.character === "star-outlined" ? (openBlock(), createElementBlock("svg", {
            key: 1,
            class: "u-star",
            style: normalizeStyle(`width: ${v.size}px;`),
            focusable: "false",
            "data-icon": "star",
            "aria-hidden": "true",
            viewBox: "64 64 896 896"
          }, W2, 4)) : v.character === "heart-filled" ? (openBlock(), createElementBlock("svg", {
            key: 2,
            class: "u-star",
            style: normalizeStyle(`width: ${v.size}px;`),
            focusable: "false",
            "data-icon": "heart",
            "aria-hidden": "true",
            viewBox: "64 64 896 896"
          }, P2, 4)) : v.character === "heart-outlined" ? (openBlock(), createElementBlock("svg", {
            key: 3,
            class: "u-star",
            style: normalizeStyle(`width: ${v.size}px;`),
            focusable: "false",
            "data-icon": "heart",
            "aria-hidden": "true",
            viewBox: "64 64 896 896"
          }, q2, 4)) : (openBlock(), createElementBlock("span", {
            key: 4,
            class: "u-star",
            style: normalizeStyle(`font-size: ${0.66 * v.size}px; height: ${v.size}px;`)
          }, [
            renderSlot(v.$slots, "character", {}, () => [
              createTextVNode(toDisplayString(v.character), 1)
            ], true)
          ], 4))
        ], 42, I2)
      ], 14, C2))), 128))
    ], 38));
  }
});
var kt2 = W(N2, [["__scopeId", "data-v-3840d4df"]]);
kt2.install = (a3) => {
  a3.component(kt2.__name, kt2);
};
var jt2 = (a3) => (pushScopeId("data-v-9ab8168c"), a3 = a3(), popScopeId(), a3);
var U2 = { class: "m-result" };
var Y2 = { class: "m-image" };
var K2 = {
  key: 0,
  focusable: "false",
  class: "u-svg",
  style: "fill: @themeColor;",
  "data-icon": "exclamation-circle",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var G2 = jt2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1));
var J2 = [
  G2
];
var X2 = {
  key: 1,
  focusable: "false",
  class: "u-svg",
  style: "fill: #52c41a;",
  "data-icon": "check-circle",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var Z2 = jt2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1));
var x2 = [
  Z2
];
var Q2 = {
  key: 2,
  focusable: "false",
  class: "u-svg",
  style: "fill: #faad14;",
  "data-icon": "warning",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var e4 = jt2(() => createBaseVNode("path", { d: "M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1));
var t4 = [
  e4
];
var a4 = {
  key: 3,
  focusable: "false",
  class: "u-svg",
  style: "fill: #ff4d4f;",
  "data-icon": "close-circle",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var l4 = jt2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1));
var s4 = [
  l4
];
var o4 = {
  key: 4,
  class: "u-image",
  width: "251",
  height: "294"
};
var n4 = createStaticVNode('<g fill="none" fill-rule="evenodd" data-v-9ab8168c><path d="M0 129.023v-2.084C0 58.364 55.591 2.774 124.165 2.774h2.085c68.574 0 124.165 55.59 124.165 124.165v2.084c0 68.575-55.59 124.166-124.165 124.166h-2.085C55.591 253.189 0 197.598 0 129.023" fill="#E4EBF7" data-v-9ab8168c></path><path d="M41.417 132.92a8.231 8.231 0 1 1-16.38-1.65 8.231 8.231 0 0 1 16.38 1.65" fill="#FFF" data-v-9ab8168c></path><path d="M38.652 136.36l10.425 5.91M49.989 148.505l-12.58 10.73" stroke="#FFF" stroke-width="2" data-v-9ab8168c></path><path d="M41.536 161.28a5.636 5.636 0 1 1-11.216-1.13 5.636 5.636 0 0 1 11.216 1.13M59.154 145.261a5.677 5.677 0 1 1-11.297-1.138 5.677 5.677 0 0 1 11.297 1.138M100.36 29.516l29.66-.013a4.562 4.562 0 1 0-.004-9.126l-29.66.013a4.563 4.563 0 0 0 .005 9.126M111.705 47.754l29.659-.013a4.563 4.563 0 1 0-.004-9.126l-29.66.013a4.563 4.563 0 1 0 .005 9.126" fill="#FFF" data-v-9ab8168c></path><path d="M114.066 29.503V29.5l15.698-.007a4.563 4.563 0 1 0 .004 9.126l-15.698.007v-.002a4.562 4.562 0 0 0-.004-9.122M185.405 137.723c-.55 5.455-5.418 9.432-10.873 8.882-5.456-.55-9.432-5.418-8.882-10.873.55-5.455 5.418-9.432 10.873-8.882 5.455.55 9.432 5.418 8.882 10.873" fill="#FFF" data-v-9ab8168c></path><path d="M180.17 143.772l12.572 7.129M193.841 158.42L178.67 171.36" stroke="#FFF" stroke-width="2" data-v-9ab8168c></path><path d="M185.55 171.926a6.798 6.798 0 1 1-13.528-1.363 6.798 6.798 0 0 1 13.527 1.363M204.12 155.285a6.848 6.848 0 1 1-13.627-1.375 6.848 6.848 0 0 1 13.626 1.375" fill="#FFF" data-v-9ab8168c></path><path d="M152.988 194.074a2.21 2.21 0 1 1-4.42 0 2.21 2.21 0 0 1 4.42 0zM225.931 118.217a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.421 0zM217.09 153.051a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.42 0zM177.84 109.842a2.21 2.21 0 1 1-4.422 0 2.21 2.21 0 0 1 4.421 0zM196.114 94.454a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.421 0zM202.844 182.523a2.21 2.21 0 1 1-4.42 0 2.21 2.21 0 0 1 4.42 0z" stroke="#FFF" stroke-width="2" data-v-9ab8168c></path><path stroke="#FFF" stroke-width="2" d="M215.125 155.262l-1.902 20.075-10.87 5.958M174.601 176.636l-6.322 9.761H156.98l-4.484 6.449M175.874 127.28V111.56M221.51 119.404l-12.77 7.859-15.228-7.86V96.668" data-v-9ab8168c></path><path d="M180.68 29.32C180.68 13.128 193.806 0 210 0c16.193 0 29.32 13.127 29.32 29.32 0 16.194-13.127 29.322-29.32 29.322-16.193 0-29.32-13.128-29.32-29.321" fill="#A26EF4" data-v-9ab8168c></path><path d="M221.45 41.706l-21.563-.125a1.744 1.744 0 0 1-1.734-1.754l.071-12.23a1.744 1.744 0 0 1 1.754-1.734l21.562.125c.964.006 1.74.791 1.735 1.755l-.071 12.229a1.744 1.744 0 0 1-1.754 1.734" fill="#FFF" data-v-9ab8168c></path><path d="M215.106 29.192c-.015 2.577-2.049 4.654-4.543 4.64-2.494-.014-4.504-2.115-4.489-4.693l.04-6.925c.016-2.577 2.05-4.654 4.543-4.64 2.494.015 4.504 2.116 4.49 4.693l-.04 6.925zm-4.53-14.074a6.877 6.877 0 0 0-6.916 6.837l-.043 7.368a6.877 6.877 0 0 0 13.754.08l.042-7.368a6.878 6.878 0 0 0-6.837-6.917zM167.566 68.367h-3.93a4.73 4.73 0 0 1-4.717-4.717 4.73 4.73 0 0 1 4.717-4.717h3.93a4.73 4.73 0 0 1 4.717 4.717 4.73 4.73 0 0 1-4.717 4.717" fill="#FFF" data-v-9ab8168c></path><path d="M168.214 248.838a6.611 6.611 0 0 1-6.61-6.611v-66.108a6.611 6.611 0 0 1 13.221 0v66.108a6.611 6.611 0 0 1-6.61 6.61" fill="#5BA02E" data-v-9ab8168c></path><path d="M176.147 248.176a6.611 6.611 0 0 1-6.61-6.61v-33.054a6.611 6.611 0 1 1 13.221 0v33.053a6.611 6.611 0 0 1-6.61 6.611" fill="#92C110" data-v-9ab8168c></path><path d="M185.994 293.89h-27.376a3.17 3.17 0 0 1-3.17-3.17v-45.887a3.17 3.17 0 0 1 3.17-3.17h27.376a3.17 3.17 0 0 1 3.17 3.17v45.886a3.17 3.17 0 0 1-3.17 3.17" fill="#F2D7AD" data-v-9ab8168c></path><path d="M81.972 147.673s6.377-.927 17.566-1.28c11.729-.371 17.57 1.086 17.57 1.086s3.697-3.855.968-8.424c1.278-12.077 5.982-32.827.335-48.273-1.116-1.339-3.743-1.512-7.536-.62-1.337.315-7.147-.149-7.983-.1l-15.311-.347s-3.487-.17-8.035-.508c-1.512-.113-4.227-1.683-5.458-.338-.406.443-2.425 5.669-1.97 16.077l8.635 35.642s-3.141 3.61 1.219 7.085" fill="#FFF" data-v-9ab8168c></path><path d="M75.768 73.325l-.9-6.397 11.982-6.52s7.302-.118 8.038 1.205c.737 1.324-5.616.993-5.616.993s-1.836 1.388-2.615 2.5c-1.654 2.363-.986 6.471-8.318 5.986-1.708.284-2.57 2.233-2.57 2.233" fill="#FFC6A0" data-v-9ab8168c></path><path d="M52.44 77.672s14.217 9.406 24.973 14.444c1.061.497-2.094 16.183-11.892 11.811-7.436-3.318-20.162-8.44-21.482-14.496-.71-3.258 2.543-7.643 8.401-11.76M141.862 80.113s-6.693 2.999-13.844 6.876c-3.894 2.11-10.137 4.704-12.33 7.988-6.224 9.314 3.536 11.22 12.947 7.503 6.71-2.651 28.999-12.127 13.227-22.367" fill="#FFB594" data-v-9ab8168c></path><path d="M76.166 66.36l3.06 3.881s-2.783 2.67-6.31 5.747c-7.103 6.195-12.803 14.296-15.995 16.44-3.966 2.662-9.754 3.314-12.177-.118-3.553-5.032.464-14.628 31.422-25.95" fill="#FFC6A0" data-v-9ab8168c></path><path d="M64.674 85.116s-2.34 8.413-8.912 14.447c.652.548 18.586 10.51 22.144 10.056 5.238-.669 6.417-18.968 1.145-20.531-.702-.208-5.901-1.286-8.853-2.167-.87-.26-1.611-1.71-3.545-.936l-1.98-.869zM128.362 85.826s5.318 1.956 7.325 13.734c-.546.274-17.55 12.35-21.829 7.805-6.534-6.94-.766-17.393 4.275-18.61 4.646-1.121 5.03-1.37 10.23-2.929" fill="#FFF" data-v-9ab8168c></path><path d="M78.18 94.656s.911 7.41-4.914 13.078" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M87.397 94.68s3.124 2.572 10.263 2.572c7.14 0 9.074-3.437 9.074-3.437" stroke="#E4EBF7" stroke-width=".932" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M117.184 68.639l-6.781-6.177s-5.355-4.314-9.223-.893c-3.867 3.422 4.463 2.083 5.653 4.165 1.19 2.082.848 1.143-2.083.446-5.603-1.331-2.082.893 2.975 5.355 2.091 1.845 6.992.955 6.992.955l2.467-3.851z" fill="#FFC6A0" data-v-9ab8168c></path><path d="M105.282 91.315l-.297-10.937-15.918-.027-.53 10.45c-.026.403.17.788.515.999 2.049 1.251 9.387 5.093 15.799.424.287-.21.443-.554.431-.91" fill="#FFB594" data-v-9ab8168c></path><path d="M107.573 74.24c.817-1.147.982-9.118 1.015-11.928a1.046 1.046 0 0 0-.965-1.055l-4.62-.365c-7.71-1.044-17.071.624-18.253 6.346-5.482 5.813-.421 13.244-.421 13.244s1.963 3.566 4.305 6.791c.756 1.041.398-3.731 3.04-5.929 5.524-4.594 15.899-7.103 15.899-7.103" fill="#5C2552" data-v-9ab8168c></path><path d="M88.426 83.206s2.685 6.202 11.602 6.522c7.82.28 8.973-7.008 7.434-17.505l-.909-5.483c-6.118-2.897-15.478.54-15.478.54s-.576 2.044-.19 5.504c-2.276 2.066-1.824 5.618-1.824 5.618s-.905-1.922-1.98-2.321c-.86-.32-1.897.089-2.322 1.98-1.04 4.632 3.667 5.145 3.667 5.145" fill="#FFC6A0" data-v-9ab8168c></path><path stroke="#DB836E" stroke-width="1.145" stroke-linecap="round" stroke-linejoin="round" d="M100.843 77.099l1.701-.928-1.015-4.324.674-1.406" data-v-9ab8168c></path><path d="M105.546 74.092c-.022.713-.452 1.279-.96 1.263-.51-.016-.904-.607-.882-1.32.021-.713.452-1.278.96-1.263.51.016.904.607.882 1.32M97.592 74.349c-.022.713-.452 1.278-.961 1.263-.509-.016-.904-.607-.882-1.32.022-.713.452-1.279.961-1.263.51.016.904.606.882 1.32" fill="#552950" data-v-9ab8168c></path><path d="M91.132 86.786s5.269 4.957 12.679 2.327" stroke="#DB836E" stroke-width="1.145" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M99.776 81.903s-3.592.232-1.44-2.79c1.59-1.496 4.897-.46 4.897-.46s1.156 3.906-3.457 3.25" fill="#DB836E" data-v-9ab8168c></path><path d="M102.88 70.6s2.483.84 3.402.715M93.883 71.975s2.492-1.144 4.778-1.073" stroke="#5C2552" stroke-width="1.526" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M86.32 77.374s.961.879 1.458 2.106c-.377.48-1.033 1.152-.236 1.809M99.337 83.719s1.911.151 2.509-.254" stroke="#DB836E" stroke-width="1.145" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M87.782 115.821l15.73-3.012M100.165 115.821l10.04-2.008" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M66.508 86.763s-1.598 8.83-6.697 14.078" stroke="#E4EBF7" stroke-width="1.114" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M128.31 87.934s3.013 4.121 4.06 11.785" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M64.09 84.816s-6.03 9.912-13.607 9.903" stroke="#DB836E" stroke-width=".795" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M112.366 65.909l-.142 5.32s5.993 4.472 11.945 9.202c4.482 3.562 8.888 7.455 10.985 8.662 4.804 2.766 8.9 3.355 11.076 1.808 4.071-2.894 4.373-9.878-8.136-15.263-4.271-1.838-16.144-6.36-25.728-9.73" fill="#FFC6A0" data-v-9ab8168c></path><path d="M130.532 85.488s4.588 5.757 11.619 6.214" stroke="#DB836E" stroke-width=".75" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M121.708 105.73s-.393 8.564-1.34 13.612" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M115.784 161.512s-3.57-1.488-2.678-7.14" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M101.52 290.246s4.326 2.057 7.408 1.03c2.842-.948 4.564.673 7.132 1.186 2.57.514 6.925 1.108 11.772-1.269-.104-5.551-6.939-4.01-12.048-6.763-2.582-1.39-3.812-4.757-3.625-8.863h-9.471s-1.402 10.596-1.169 14.68" fill="#CBD1D1" data-v-9ab8168c></path><path d="M101.496 290.073s2.447 1.281 6.809.658c3.081-.44 3.74.485 7.479 1.039 3.739.554 10.802-.07 11.91-.9.415 1.108-.347 2.077-.347 2.077s-1.523.608-4.847.831c-2.045.137-5.843.293-7.663-.507-1.8-1.385-5.286-1.917-5.77-.243-3.947.958-7.41-.288-7.41-.288l-.16-2.667z" fill="#2B0849" data-v-9ab8168c></path><path d="M108.824 276.19h3.116s-.103 6.751 4.57 8.62c-4.673.624-8.62-2.32-7.686-8.62" fill="#A4AABA" data-v-9ab8168c></path><path d="M57.65 272.52s-2.122 7.47-4.518 12.396c-1.811 3.724-4.255 7.548 5.505 7.548 6.698 0 9.02-.483 7.479-6.648-1.541-6.164.268-13.296.268-13.296H57.65z" fill="#CBD1D1" data-v-9ab8168c></path><path d="M51.54 290.04s2.111 1.178 6.682 1.178c6.128 0 8.31-1.662 8.31-1.662s.605 1.122-.624 2.18c-1 .862-3.624 1.603-7.444 1.559-4.177-.049-5.876-.57-6.786-1.177-.831-.554-.692-1.593-.138-2.078" fill="#2B0849" data-v-9ab8168c></path><path d="M58.533 274.438s.034 1.529-.315 2.95c-.352 1.431-1.087 3.127-1.139 4.17-.058 1.16 4.57 1.592 5.194.035.623-1.559 1.303-6.475 1.927-7.306.622-.831-4.94-2.135-5.667.15" fill="#A4AABA" data-v-9ab8168c></path><path d="M100.885 277.015l13.306.092s1.291-54.228 1.843-64.056c.552-9.828 3.756-43.13.997-62.788l-12.48-.64-22.725.776s-.433 3.944-1.19 9.921c-.062.493-.677.838-.744 1.358-.075.582.42 1.347.318 1.956-2.35 14.003-6.343 32.926-8.697 46.425-.116.663-1.227 1.004-1.45 2.677-.04.3.21 1.516.112 1.785-6.836 18.643-10.89 47.584-14.2 61.551l14.528-.014s2.185-8.524 4.008-16.878c2.796-12.817 22.987-84.553 22.987-84.553l3-.517 1.037 46.1s-.223 1.228.334 2.008c.558.782-.556 1.117-.39 2.233l.39 1.784s-.446 7.14-.892 11.826c-.446 4.685-.092 38.954-.092 38.954" fill="#7BB2F9" data-v-9ab8168c></path><path d="M77.438 220.434c1.146.094 4.016-2.008 6.916-4.91M107.55 223.931s2.758-1.103 6.069-3.862" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M108.459 220.905s2.759-1.104 6.07-3.863" stroke="#648BD8" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M76.099 223.557s2.608-.587 6.47-3.346M87.33 150.82c-.27 3.088.297 8.478-4.315 9.073M104.829 149.075s.11 13.936-1.286 14.983c-2.207 1.655-2.975 1.934-2.975 1.934M101.014 149.63s.035 12.81-1.19 24.245M94.93 174.965s7.174-1.655 9.38-1.655M75.671 204.754c-.316 1.55-.64 3.067-.973 4.535 0 0-1.45 1.822-1.003 3.756.446 1.934-.943 2.034-4.96 15.273-1.686 5.559-4.464 18.49-6.313 27.447-.078.38-4.018 18.06-4.093 18.423M77.043 196.743a313.269 313.269 0 0 1-.877 4.729M83.908 151.414l-1.19 10.413s-1.091.148-.496 2.23c.111 1.34-2.66 15.692-5.153 30.267M57.58 272.94h13.238" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M117.377 147.423s-16.955-3.087-35.7.199c.157 2.501-.002 4.128-.002 4.128s14.607-2.802 35.476-.31c.251-2.342.226-4.017.226-4.017" fill="#192064" data-v-9ab8168c></path><path d="M107.511 150.353l.004-4.885a.807.807 0 0 0-.774-.81c-2.428-.092-5.04-.108-7.795-.014a.814.814 0 0 0-.784.81l-.003 4.88c0 .456.371.82.827.808a140.76 140.76 0 0 1 7.688.017.81.81 0 0 0 .837-.806" fill="#FFF" data-v-9ab8168c></path><path d="M106.402 149.426l.002-3.06a.64.64 0 0 0-.616-.643 94.135 94.135 0 0 0-5.834-.009.647.647 0 0 0-.626.643l-.001 3.056c0 .36.291.648.651.64 1.78-.04 3.708-.041 5.762.012.36.009.662-.279.662-.64" fill="#192064" data-v-9ab8168c></path><path d="M101.485 273.933h12.272M102.652 269.075c.006 3.368.04 5.759.11 6.47M102.667 263.125c-.009 1.53-.015 2.98-.016 4.313M102.204 174.024l.893 44.402s.669 1.561-.224 2.677c-.892 1.116 2.455.67.893 2.231-1.562 1.562.893 1.116 0 3.347-.592 1.48-.988 20.987-1.09 34.956" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path></g>', 1);
var i4 = [
  n4
];
var u4 = {
  key: 5,
  class: "u-image",
  width: "252",
  height: "294"
};
var r4 = createStaticVNode('<defs data-v-9ab8168c><path d="M0 .387h251.772v251.772H0z" data-v-9ab8168c></path></defs><g fill="none" fill-rule="evenodd" data-v-9ab8168c><g transform="translate(0 .012)" data-v-9ab8168c><mask fill="#fff" data-v-9ab8168c></mask><path d="M0 127.32v-2.095C0 56.279 55.892.387 124.838.387h2.096c68.946 0 124.838 55.892 124.838 124.838v2.096c0 68.946-55.892 124.838-124.838 124.838h-2.096C55.892 252.16 0 196.267 0 127.321" fill="#E4EBF7" mask="url(#b)" data-v-9ab8168c></path></g><path d="M39.755 130.84a8.276 8.276 0 1 1-16.468-1.66 8.276 8.276 0 0 1 16.468 1.66" fill="#FFF" data-v-9ab8168c></path><path d="M36.975 134.297l10.482 5.943M48.373 146.508l-12.648 10.788" stroke="#FFF" stroke-width="2" data-v-9ab8168c></path><path d="M39.875 159.352a5.667 5.667 0 1 1-11.277-1.136 5.667 5.667 0 0 1 11.277 1.136M57.588 143.247a5.708 5.708 0 1 1-11.358-1.145 5.708 5.708 0 0 1 11.358 1.145M99.018 26.875l29.82-.014a4.587 4.587 0 1 0-.003-9.175l-29.82.013a4.587 4.587 0 1 0 .003 9.176M110.424 45.211l29.82-.013a4.588 4.588 0 0 0-.004-9.175l-29.82.013a4.587 4.587 0 1 0 .004 9.175" fill="#FFF" data-v-9ab8168c></path><path d="M112.798 26.861v-.002l15.784-.006a4.588 4.588 0 1 0 .003 9.175l-15.783.007v-.002a4.586 4.586 0 0 0-.004-9.172M184.523 135.668c-.553 5.485-5.447 9.483-10.931 8.93-5.485-.553-9.483-5.448-8.93-10.932.552-5.485 5.447-9.483 10.932-8.93 5.485.553 9.483 5.447 8.93 10.932" fill="#FFF" data-v-9ab8168c></path><path d="M179.26 141.75l12.64 7.167M193.006 156.477l-15.255 13.011" stroke="#FFF" stroke-width="2" data-v-9ab8168c></path><path d="M184.668 170.057a6.835 6.835 0 1 1-13.6-1.372 6.835 6.835 0 0 1 13.6 1.372M203.34 153.325a6.885 6.885 0 1 1-13.7-1.382 6.885 6.885 0 0 1 13.7 1.382" fill="#FFF" data-v-9ab8168c></path><path d="M151.931 192.324a2.222 2.222 0 1 1-4.444 0 2.222 2.222 0 0 1 4.444 0zM225.27 116.056a2.222 2.222 0 1 1-4.445 0 2.222 2.222 0 0 1 4.444 0zM216.38 151.08a2.223 2.223 0 1 1-4.446-.001 2.223 2.223 0 0 1 4.446 0zM176.917 107.636a2.223 2.223 0 1 1-4.445 0 2.223 2.223 0 0 1 4.445 0zM195.291 92.165a2.223 2.223 0 1 1-4.445 0 2.223 2.223 0 0 1 4.445 0zM202.058 180.711a2.223 2.223 0 1 1-4.446 0 2.223 2.223 0 0 1 4.446 0z" stroke="#FFF" stroke-width="2" data-v-9ab8168c></path><path stroke="#FFF" stroke-width="2" d="M214.404 153.302l-1.912 20.184-10.928 5.99M173.661 174.792l-6.356 9.814h-11.36l-4.508 6.484M174.941 125.168v-15.804M220.824 117.25l-12.84 7.901-15.31-7.902V94.39" data-v-9ab8168c></path><path d="M166.588 65.936h-3.951a4.756 4.756 0 0 1-4.743-4.742 4.756 4.756 0 0 1 4.743-4.743h3.951a4.756 4.756 0 0 1 4.743 4.743 4.756 4.756 0 0 1-4.743 4.742" fill="#FFF" data-v-9ab8168c></path><path d="M174.823 30.03c0-16.281 13.198-29.48 29.48-29.48 16.28 0 29.48 13.199 29.48 29.48 0 16.28-13.2 29.48-29.48 29.48-16.282 0-29.48-13.2-29.48-29.48" fill="#1890FF" data-v-9ab8168c></path><path d="M205.952 38.387c.5.5.785 1.142.785 1.928s-.286 1.465-.785 1.964c-.572.5-1.214.75-2 .75-.785 0-1.429-.285-1.929-.785-.572-.5-.82-1.143-.82-1.929s.248-1.428.82-1.928c.5-.5 1.144-.75 1.93-.75.785 0 1.462.25 1.999.75m4.285-19.463c1.428 1.249 2.143 2.963 2.143 5.142 0 1.712-.427 3.13-1.219 4.25-.067.096-.137.18-.218.265-.416.429-1.41 1.346-2.956 2.699a5.07 5.07 0 0 0-1.428 1.75 5.207 5.207 0 0 0-.536 2.357v.5h-4.107v-.5c0-1.357.215-2.536.714-3.5.464-.964 1.857-2.464 4.178-4.536l.43-.5c.643-.785.964-1.643.964-2.535 0-1.18-.358-2.108-1-2.785-.678-.68-1.643-1.001-2.858-1.001-1.536 0-2.642.464-3.357 1.43-.37.5-.621 1.135-.76 1.904a1.999 1.999 0 0 1-1.971 1.63h-.004c-1.277 0-2.257-1.183-1.98-2.43.337-1.518 1.02-2.78 2.073-3.784 1.536-1.5 3.607-2.25 6.25-2.25 2.32 0 4.214.607 5.642 1.894" fill="#FFF" data-v-9ab8168c></path><path d="M52.04 76.131s21.81 5.36 27.307 15.945c5.575 10.74-6.352 9.26-15.73 4.935-10.86-5.008-24.7-11.822-11.577-20.88" fill="#FFB594" data-v-9ab8168c></path><path d="M90.483 67.504l-.449 2.893c-.753.49-4.748-2.663-4.748-2.663l-1.645.748-1.346-5.684s6.815-4.589 8.917-5.018c2.452-.501 9.884.94 10.7 2.278 0 0 1.32.486-2.227.69-3.548.203-5.043.447-6.79 3.132-1.747 2.686-2.412 3.624-2.412 3.624" fill="#FFC6A0" data-v-9ab8168c></path><path d="M128.055 111.367c-2.627-7.724-6.15-13.18-8.917-15.478-3.5-2.906-9.34-2.225-11.366-4.187-1.27-1.231-3.215-1.197-3.215-1.197s-14.98-3.158-16.828-3.479c-2.37-.41-2.124-.714-6.054-1.405-1.57-1.907-2.917-1.122-2.917-1.122l-7.11-1.383c-.853-1.472-2.423-1.023-2.423-1.023l-2.468-.897c-1.645 9.976-7.74 13.796-7.74 13.796 1.795 1.122 15.703 8.3 15.703 8.3l5.107 37.11s-3.321 5.694 1.346 9.109c0 0 19.883-3.743 34.921-.329 0 0 3.047-2.546.972-8.806.523-3.01 1.394-8.263 1.736-11.622.385.772 2.019 1.918 3.14 3.477 0 0 9.407-7.365 11.052-14.012-.832-.723-1.598-1.585-2.267-2.453-.567-.736-.358-2.056-.765-2.717-.669-1.084-1.804-1.378-1.907-1.682" fill="#FFF" data-v-9ab8168c></path><path d="M101.09 289.998s4.295 2.041 7.354 1.021c2.821-.94 4.53.668 7.08 1.178 2.55.51 6.874 1.1 11.686-1.26-.103-5.51-6.889-3.98-11.96-6.713-2.563-1.38-3.784-4.722-3.598-8.799h-9.402s-1.392 10.52-1.16 14.573" fill="#CBD1D1" data-v-9ab8168c></path><path d="M101.067 289.826s2.428 1.271 6.759.653c3.058-.437 3.712.481 7.423 1.031 3.712.55 10.724-.069 11.823-.894.413 1.1-.343 2.063-.343 2.063s-1.512.603-4.812.824c-2.03.136-5.8.291-7.607-.503-1.787-1.375-5.247-1.903-5.728-.241-3.918.95-7.355-.286-7.355-.286l-.16-2.647z" fill="#2B0849" data-v-9ab8168c></path><path d="M108.341 276.044h3.094s-.103 6.702 4.536 8.558c-4.64.618-8.558-2.303-7.63-8.558" fill="#A4AABA" data-v-9ab8168c></path><path d="M57.542 272.401s-2.107 7.416-4.485 12.306c-1.798 3.695-4.225 7.492 5.465 7.492 6.648 0 8.953-.48 7.423-6.599-1.53-6.12.266-13.199.266-13.199h-8.669z" fill="#CBD1D1" data-v-9ab8168c></path><path d="M51.476 289.793s2.097 1.169 6.633 1.169c6.083 0 8.249-1.65 8.249-1.65s.602 1.114-.619 2.165c-.993.855-3.597 1.591-7.39 1.546-4.145-.048-5.832-.566-6.736-1.168-.825-.55-.687-1.58-.137-2.062" fill="#2B0849" data-v-9ab8168c></path><path d="M58.419 274.304s.033 1.519-.314 2.93c-.349 1.42-1.078 3.104-1.13 4.139-.058 1.151 4.537 1.58 5.155.034.62-1.547 1.294-6.427 1.913-7.252.619-.825-4.903-2.119-5.624.15" fill="#A4AABA" data-v-9ab8168c></path><path d="M99.66 278.514l13.378.092s1.298-54.52 1.853-64.403c.554-9.882 3.776-43.364 1.002-63.128l-12.547-.644-22.849.78s-.434 3.966-1.195 9.976c-.063.496-.682.843-.749 1.365-.075.585.423 1.354.32 1.966-2.364 14.08-6.377 33.104-8.744 46.677-.116.666-1.234 1.009-1.458 2.691-.04.302.211 1.525.112 1.795-6.873 18.744-10.949 47.842-14.277 61.885l14.607-.014s2.197-8.57 4.03-16.97c2.811-12.886 23.111-85.01 23.111-85.01l3.016-.521 1.043 46.35s-.224 1.234.337 2.02c.56.785-.56 1.123-.392 2.244l.392 1.794s-.449 7.178-.898 11.89c-.448 4.71-.092 39.165-.092 39.165" fill="#7BB2F9" data-v-9ab8168c></path><path d="M76.085 221.626c1.153.094 4.038-2.019 6.955-4.935M106.36 225.142s2.774-1.11 6.103-3.883" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M107.275 222.1s2.773-1.11 6.102-3.884" stroke="#648BD8" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M74.74 224.767s2.622-.591 6.505-3.365M86.03 151.634c-.27 3.106.3 8.525-4.336 9.123M103.625 149.88s.11 14.012-1.293 15.065c-2.219 1.664-2.99 1.944-2.99 1.944M99.79 150.438s.035 12.88-1.196 24.377M93.673 175.911s7.212-1.664 9.431-1.664M74.31 205.861a212.013 212.013 0 0 1-.979 4.56s-1.458 1.832-1.009 3.776c.449 1.944-.947 2.045-4.985 15.355-1.696 5.59-4.49 18.591-6.348 27.597l-.231 1.12M75.689 197.807a320.934 320.934 0 0 1-.882 4.754M82.591 152.233L81.395 162.7s-1.097.15-.5 2.244c.113 1.346-2.674 15.775-5.18 30.43M56.12 274.418h13.31" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M116.241 148.22s-17.047-3.104-35.893.2c.158 2.514-.003 4.15-.003 4.15s14.687-2.818 35.67-.312c.252-2.355.226-4.038.226-4.038" fill="#192064" data-v-9ab8168c></path><path d="M106.322 151.165l.003-4.911a.81.81 0 0 0-.778-.815c-2.44-.091-5.066-.108-7.836-.014a.818.818 0 0 0-.789.815l-.003 4.906a.81.81 0 0 0 .831.813c2.385-.06 4.973-.064 7.73.017a.815.815 0 0 0 .842-.81" fill="#FFF" data-v-9ab8168c></path><path d="M105.207 150.233l.002-3.076a.642.642 0 0 0-.619-.646 94.321 94.321 0 0 0-5.866-.01.65.65 0 0 0-.63.647v3.072a.64.64 0 0 0 .654.644 121.12 121.12 0 0 1 5.794.011c.362.01.665-.28.665-.642" fill="#192064" data-v-9ab8168c></path><path d="M100.263 275.415h12.338M101.436 270.53c.006 3.387.042 5.79.111 6.506M101.451 264.548a915.75 915.75 0 0 0-.015 4.337M100.986 174.965l.898 44.642s.673 1.57-.225 2.692c-.897 1.122 2.468.673.898 2.243-1.57 1.57.897 1.122 0 3.365-.596 1.489-.994 21.1-1.096 35.146" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M46.876 83.427s-.516 6.045 7.223 5.552c11.2-.712 9.218-9.345 31.54-21.655-.786-2.708-2.447-4.744-2.447-4.744s-11.068 3.11-22.584 8.046c-6.766 2.9-13.395 6.352-13.732 12.801M104.46 91.057l.941-5.372-8.884-11.43-5.037 5.372-1.74 7.834a.321.321 0 0 0 .108.32c.965.8 6.5 5.013 14.347 3.544a.332.332 0 0 0 .264-.268" fill="#FFC6A0" data-v-9ab8168c></path><path d="M93.942 79.387s-4.533-2.853-2.432-6.855c1.623-3.09 4.513 1.133 4.513 1.133s.52-3.642 3.121-3.642c.52-1.04 1.561-4.162 1.561-4.162s11.445 2.601 13.526 3.121c0 5.203-2.304 19.424-7.84 19.861-8.892.703-12.449-9.456-12.449-9.456" fill="#FFC6A0" data-v-9ab8168c></path><path d="M113.874 73.446c2.601-2.081 3.47-9.722 3.47-9.722s-2.479-.49-6.64-2.05c-4.683-2.081-12.798-4.747-17.48.976-9.668 3.223-2.05 19.823-2.05 19.823l2.713-3.021s-3.935-3.287-2.08-6.243c2.17-3.462 3.92 1.073 3.92 1.073s.637-2.387 3.581-3.342c.355-.71 1.036-2.674 1.432-3.85a1.073 1.073 0 0 1 1.263-.704c2.4.558 8.677 2.019 11.356 2.662.522.125.871.615.82 1.15l-.305 3.248z" fill="#520038" data-v-9ab8168c></path><path d="M104.977 76.064c-.103.61-.582 1.038-1.07.956-.489-.083-.801-.644-.698-1.254.103-.61.582-1.038 1.07-.956.488.082.8.644.698 1.254M112.132 77.694c-.103.61-.582 1.038-1.07.956-.488-.083-.8-.644-.698-1.254.103-.61.582-1.038 1.07-.956.488.082.8.643.698 1.254" fill="#552950" data-v-9ab8168c></path><path stroke="#DB836E" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" d="M110.13 74.84l-.896 1.61-.298 4.357h-2.228" data-v-9ab8168c></path><path d="M110.846 74.481s1.79-.716 2.506.537" stroke="#5C2552" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M92.386 74.282s.477-1.114 1.113-.716c.637.398 1.274 1.433.558 1.99-.717.556.159 1.67.159 1.67" stroke="#DB836E" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M103.287 72.93s1.83 1.113 4.137.954" stroke="#5C2552" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M103.685 81.762s2.227 1.193 4.376 1.193M104.64 84.308s.954.398 1.511.318M94.693 81.205s2.308 7.4 10.424 7.639" stroke="#DB836E" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M81.45 89.384s.45 5.647-4.935 12.787M69 82.654s-.726 9.282-8.204 14.206" stroke="#E4EBF7" stroke-width="1.101" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M129.405 122.865s-5.272 7.403-9.422 10.768" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M119.306 107.329s.452 4.366-2.127 32.062" stroke="#E4EBF7" stroke-width="1.101" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M150.028 151.232h-49.837a1.01 1.01 0 0 1-1.01-1.01v-31.688c0-.557.452-1.01 1.01-1.01h49.837c.558 0 1.01.453 1.01 1.01v31.688a1.01 1.01 0 0 1-1.01 1.01" fill="#F2D7AD" data-v-9ab8168c></path><path d="M150.29 151.232h-19.863v-33.707h20.784v32.786a.92.92 0 0 1-.92.92" fill="#F4D19D" data-v-9ab8168c></path><path d="M123.554 127.896H92.917a.518.518 0 0 1-.425-.816l6.38-9.113c.193-.277.51-.442.85-.442h31.092l-7.26 10.371z" fill="#F2D7AD" data-v-9ab8168c></path><path fill="#CC9B6E" d="M123.689 128.447H99.25v-.519h24.169l7.183-10.26.424.298z" data-v-9ab8168c></path><path d="M158.298 127.896h-18.669a2.073 2.073 0 0 1-1.659-.83l-7.156-9.541h19.965c.49 0 .95.23 1.244.622l6.69 8.92a.519.519 0 0 1-.415.83" fill="#F4D19D" data-v-9ab8168c></path><path fill="#CC9B6E" d="M157.847 128.479h-19.384l-7.857-10.475.415-.31 7.7 10.266h19.126zM130.554 150.685l-.032-8.177.519-.002.032 8.177z" data-v-9ab8168c></path><path fill="#CC9B6E" d="M130.511 139.783l-.08-21.414.519-.002.08 21.414zM111.876 140.932l-.498-.143 1.479-5.167.498.143zM108.437 141.06l-2.679-2.935 2.665-3.434.41.318-2.397 3.089 2.384 2.612zM116.607 141.06l-.383-.35 2.383-2.612-2.397-3.089.41-.318 2.665 3.434z" data-v-9ab8168c></path><path d="M154.316 131.892l-3.114-1.96.038 3.514-1.043.092c-1.682.115-3.634.23-4.789.23-1.902 0-2.693 2.258 2.23 2.648l-2.645-.596s-2.168 1.317.504 2.3c0 0-1.58 1.217.561 2.58-.584 3.504 5.247 4.058 7.122 3.59 1.876-.47 4.233-2.359 4.487-5.16.28-3.085-.89-5.432-3.35-7.238" fill="#FFC6A0" data-v-9ab8168c></path><path d="M153.686 133.577s-6.522.47-8.36.372c-1.836-.098-1.904 2.19 2.359 2.264 3.739.15 5.451-.044 5.451-.044" stroke="#DB836E" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M145.16 135.877c-1.85 1.346.561 2.355.561 2.355s3.478.898 6.73.617" stroke="#DB836E" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M151.89 141.71s-6.28.111-6.73-2.132c-.223-1.346.45-1.402.45-1.402M146.114 140.868s-1.103 3.16 5.44 3.533M151.202 129.932v3.477M52.838 89.286c3.533-.337 8.423-1.248 13.582-7.754" stroke="#DB836E" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M168.567 248.318a6.647 6.647 0 0 1-6.647-6.647v-66.466a6.647 6.647 0 1 1 13.294 0v66.466a6.647 6.647 0 0 1-6.647 6.647" fill="#5BA02E" data-v-9ab8168c></path><path d="M176.543 247.653a6.647 6.647 0 0 1-6.646-6.647v-33.232a6.647 6.647 0 1 1 13.293 0v33.232a6.647 6.647 0 0 1-6.647 6.647" fill="#92C110" data-v-9ab8168c></path><path d="M186.443 293.613H158.92a3.187 3.187 0 0 1-3.187-3.187v-46.134a3.187 3.187 0 0 1 3.187-3.187h27.524a3.187 3.187 0 0 1 3.187 3.187v46.134a3.187 3.187 0 0 1-3.187 3.187" fill="#F2D7AD" data-v-9ab8168c></path><path d="M88.979 89.48s7.776 5.384 16.6 2.842" stroke="#E4EBF7" stroke-width="1.101" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path></g>', 2);
var c4 = [
  r4
];
var d4 = {
  key: 6,
  class: "u-image",
  width: "254",
  height: "294"
};
var f4 = createStaticVNode('<defs data-v-9ab8168c><path d="M0 .335h253.49v253.49H0z" data-v-9ab8168c></path><path d="M0 293.665h253.49V.401H0z" data-v-9ab8168c></path></defs><g fill="none" fill-rule="evenodd" data-v-9ab8168c><g transform="translate(0 .067)" data-v-9ab8168c><mask fill="#fff" data-v-9ab8168c></mask><path d="M0 128.134v-2.11C0 56.608 56.273.334 125.69.334h2.11c69.416 0 125.69 56.274 125.69 125.69v2.11c0 69.417-56.274 125.69-125.69 125.69h-2.11C56.273 253.824 0 197.551 0 128.134" fill="#E4EBF7" mask="url(#b)" data-v-9ab8168c></path></g><path d="M39.989 132.108a8.332 8.332 0 1 1-16.581-1.671 8.332 8.332 0 0 1 16.58 1.671" fill="#FFF" data-v-9ab8168c></path><path d="M37.19 135.59l10.553 5.983M48.665 147.884l-12.734 10.861" stroke="#FFF" stroke-width="2" data-v-9ab8168c></path><path d="M40.11 160.816a5.706 5.706 0 1 1-11.354-1.145 5.706 5.706 0 0 1 11.354 1.145M57.943 144.6a5.747 5.747 0 1 1-11.436-1.152 5.747 5.747 0 0 1 11.436 1.153M99.656 27.434l30.024-.013a4.619 4.619 0 1 0-.004-9.238l-30.024.013a4.62 4.62 0 0 0 .004 9.238M111.14 45.896l30.023-.013a4.62 4.62 0 1 0-.004-9.238l-30.024.013a4.619 4.619 0 1 0 .004 9.238" fill="#FFF" data-v-9ab8168c></path><path d="M113.53 27.421v-.002l15.89-.007a4.619 4.619 0 1 0 .005 9.238l-15.892.007v-.002a4.618 4.618 0 0 0-.004-9.234M150.167 70.091h-3.979a4.789 4.789 0 0 1-4.774-4.775 4.788 4.788 0 0 1 4.774-4.774h3.979a4.789 4.789 0 0 1 4.775 4.774 4.789 4.789 0 0 1-4.775 4.775" fill="#FFF" data-v-9ab8168c></path><path d="M171.687 30.234c0-16.392 13.289-29.68 29.681-29.68 16.392 0 29.68 13.288 29.68 29.68 0 16.393-13.288 29.681-29.68 29.681s-29.68-13.288-29.68-29.68" fill="#FF603B" data-v-9ab8168c></path><path d="M203.557 19.435l-.676 15.035a1.514 1.514 0 0 1-3.026 0l-.675-15.035a2.19 2.19 0 1 1 4.377 0m-.264 19.378c.513.477.77 1.1.77 1.87s-.257 1.393-.77 1.907c-.55.476-1.21.733-1.943.733a2.545 2.545 0 0 1-1.87-.77c-.55-.514-.806-1.136-.806-1.87 0-.77.256-1.393.806-1.87.513-.513 1.137-.733 1.87-.733.77 0 1.43.22 1.943.733" fill="#FFF" data-v-9ab8168c></path><path d="M119.3 133.275c4.426-.598 3.612-1.204 4.079-4.778.675-5.18-3.108-16.935-8.262-25.118-1.088-10.72-12.598-11.24-12.598-11.24s4.312 4.895 4.196 16.199c1.398 5.243.804 14.45.804 14.45s5.255 11.369 11.78 10.487" fill="#FFB594" data-v-9ab8168c></path><path d="M100.944 91.61s1.463-.583 3.211.582c8.08 1.398 10.368 6.706 11.3 11.368 1.864 1.282 1.864 2.33 1.864 3.496.365.777 1.515 3.03 1.515 3.03s-7.225 1.748-10.954 6.758c-1.399-6.41-6.936-25.235-6.936-25.235" fill="#FFF" data-v-9ab8168c></path><path d="M94.008 90.5l1.019-5.815-9.23-11.874-5.233 5.581-2.593 9.863s8.39 5.128 16.037 2.246" fill="#FFB594" data-v-9ab8168c></path><path d="M82.931 78.216s-4.557-2.868-2.445-6.892c1.632-3.107 4.537 1.139 4.537 1.139s.524-3.662 3.139-3.662c.523-1.046 1.569-4.184 1.569-4.184s11.507 2.615 13.6 3.138c-.001 5.23-2.317 19.529-7.884 19.969-8.94.706-12.516-9.508-12.516-9.508" fill="#FFC6A0" data-v-9ab8168c></path><path d="M102.971 72.243c2.616-2.093 3.489-9.775 3.489-9.775s-2.492-.492-6.676-2.062c-4.708-2.092-12.867-4.771-17.575.982-9.54 4.41-2.062 19.93-2.062 19.93l2.729-3.037s-3.956-3.304-2.092-6.277c2.183-3.48 3.943 1.08 3.943 1.08s.64-2.4 3.6-3.36c.356-.714 1.04-2.69 1.44-3.872a1.08 1.08 0 0 1 1.27-.707c2.41.56 8.723 2.03 11.417 2.676.524.126.876.619.825 1.156l-.308 3.266z" fill="#520038" data-v-9ab8168c></path><path d="M101.22 76.514c-.104.613-.585 1.044-1.076.96-.49-.082-.805-.646-.702-1.26.104-.613.585-1.044 1.076-.961.491.083.805.647.702 1.26M94.26 75.074c-.104.613-.585 1.044-1.076.96-.49-.082-.805-.646-.702-1.26.104-.613.585-1.044 1.076-.96.491.082.805.646.702 1.26" fill="#552950" data-v-9ab8168c></path><path stroke="#DB836E" stroke-width="1.063" stroke-linecap="round" stroke-linejoin="round" d="M99.206 73.644l-.9 1.62-.3 4.38h-2.24" data-v-9ab8168c></path><path d="M99.926 73.284s1.8-.72 2.52.54" stroke="#5C2552" stroke-width="1.117" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M81.367 73.084s.48-1.12 1.12-.72c.64.4 1.28 1.44.56 2s.16 1.68.16 1.68" stroke="#DB836E" stroke-width="1.117" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M92.326 71.724s1.84 1.12 4.16.96" stroke="#5C2552" stroke-width="1.117" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M92.726 80.604s2.24 1.2 4.4 1.2M93.686 83.164s.96.4 1.52.32M83.687 80.044s1.786 6.547 9.262 7.954" stroke="#DB836E" stroke-width="1.063" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M95.548 91.663s-1.068 2.821-8.298 2.105c-7.23-.717-10.29-5.044-10.29-5.044" stroke="#E4EBF7" stroke-width="1.136" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M78.126 87.478s6.526 4.972 16.47 2.486c0 0 9.577 1.02 11.536 5.322 5.36 11.77.543 36.835 0 39.962 3.496 4.055-.466 8.483-.466 8.483-15.624-3.548-35.81-.6-35.81-.6-4.849-3.546-1.223-9.044-1.223-9.044L62.38 110.32c-2.485-15.227.833-19.803 3.549-20.743 3.03-1.049 8.04-1.282 8.04-1.282.496-.058 1.08-.076 1.37-.233 2.36-1.282 2.787-.583 2.787-.583" fill="#FFF" data-v-9ab8168c></path><path d="M65.828 89.81s-6.875.465-7.59 8.156c-.466 8.857 3.03 10.954 3.03 10.954s6.075 22.102 16.796 22.957c8.39-2.176 4.758-6.702 4.661-11.42-.233-11.304-7.108-16.897-7.108-16.897s-4.212-13.75-9.789-13.75" fill="#FFC6A0" data-v-9ab8168c></path><path d="M71.716 124.225s.855 11.264 9.828 6.486c4.765-2.536 7.581-13.828 9.789-22.568 1.456-5.768 2.58-12.197 2.58-12.197l-4.973-1.709s-2.408 5.516-7.769 12.275c-4.335 5.467-9.144 11.11-9.455 17.713" fill="#FFC6A0" data-v-9ab8168c></path><path d="M108.463 105.191s1.747 2.724-2.331 30.535c2.376 2.216 1.053 6.012-.233 7.51" stroke="#E4EBF7" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M123.262 131.527s-.427 2.732-11.77 1.981c-15.187-1.006-25.326-3.25-25.326-3.25l.933-5.8s.723.215 9.71-.068c11.887-.373 18.714-6.07 24.964-1.022 4.039 3.263 1.489 8.16 1.489 8.16" fill="#FFC6A0" data-v-9ab8168c></path><path d="M70.24 90.974s-5.593-4.739-11.054 2.68c-3.318 7.223.517 15.284 2.664 19.578-.31 3.729 2.33 4.311 2.33 4.311s.108.895 1.516 2.68c4.078-7.03 6.72-9.166 13.711-12.546-.328-.656-1.877-3.265-1.825-3.767.175-1.69-1.282-2.623-1.282-2.623s-.286-.156-1.165-2.738c-.788-2.313-2.036-5.177-4.895-7.575" fill="#FFF" data-v-9ab8168c></path><path d="M90.232 288.027s4.855 2.308 8.313 1.155c3.188-1.063 5.12.755 8.002 1.331 2.881.577 7.769 1.243 13.207-1.424-.117-6.228-7.786-4.499-13.518-7.588-2.895-1.56-4.276-5.336-4.066-9.944H91.544s-1.573 11.89-1.312 16.47" fill="#CBD1D1" data-v-9ab8168c></path><path d="M90.207 287.833s2.745 1.437 7.639.738c3.456-.494 3.223.66 7.418 1.282 4.195.621 13.092-.194 14.334-1.126.466 1.242-.388 2.33-.388 2.33s-1.709.682-5.438.932c-2.295.154-8.098.276-10.14-.621-2.02-1.554-4.894-1.515-6.06-.234-4.427 1.075-7.184-.31-7.184-.31l-.181-2.991z" fill="#2B0849" data-v-9ab8168c></path><path d="M98.429 272.257h3.496s-.117 7.574 5.127 9.671c-5.244.7-9.672-2.602-8.623-9.671" fill="#A4AABA" data-v-9ab8168c></path><path d="M44.425 272.046s-2.208 7.774-4.702 12.899c-1.884 3.874-4.428 7.854 5.729 7.854 6.97 0 9.385-.503 7.782-6.917-1.604-6.415.279-13.836.279-13.836h-9.088z" fill="#CBD1D1" data-v-9ab8168c></path><path d="M38.066 290.277s2.198 1.225 6.954 1.225c6.376 0 8.646-1.73 8.646-1.73s.63 1.168-.649 2.27c-1.04.897-3.77 1.668-7.745 1.621-4.347-.05-6.115-.593-7.062-1.224-.864-.577-.72-1.657-.144-2.162" fill="#2B0849" data-v-9ab8168c></path><path d="M45.344 274.041s.035 1.592-.329 3.07c-.365 1.49-1.13 3.255-1.184 4.34-.061 1.206 4.755 1.657 5.403.036.65-1.622 1.357-6.737 2.006-7.602.648-.865-5.14-2.222-5.896.156" fill="#A4AABA" data-v-9ab8168c></path><path d="M89.476 277.57l13.899.095s1.349-56.643 1.925-66.909c.576-10.267 3.923-45.052 1.042-65.585l-13.037-.669-23.737.81s-.452 4.12-1.243 10.365c-.065.515-.708.874-.777 1.417-.078.608.439 1.407.332 2.044-2.455 14.627-5.797 32.736-8.256 46.837-.121.693-1.282 1.048-1.515 2.796-.042.314.22 1.584.116 1.865-7.14 19.473-12.202 52.601-15.66 67.19l15.176-.015s2.282-10.145 4.185-18.871c2.922-13.389 24.012-88.32 24.012-88.32l3.133-.954-.158 48.568s-.233 1.282.35 2.098c.583.815-.581 1.167-.408 2.331l.408 1.864s-.466 7.458-.932 12.352c-.467 4.895 1.145 40.69 1.145 40.69" fill="#7BB2F9" data-v-9ab8168c></path><path d="M64.57 218.881c1.197.099 4.195-2.097 7.225-5.127M96.024 222.534s2.881-1.152 6.34-4.034" stroke="#648BD8" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M96.973 219.373s2.882-1.153 6.34-4.034" stroke="#648BD8" stroke-width="1.032" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M63.172 222.144s2.724-.614 6.759-3.496M74.903 146.166c-.281 3.226.31 8.856-4.506 9.478M93.182 144.344s.115 14.557-1.344 15.65c-2.305 1.73-3.107 2.02-3.107 2.02M89.197 144.923s.269 13.144-1.01 25.088M83.525 170.71s6.81-1.051 9.116-1.051M46.026 270.045l-.892 4.538M46.937 263.289l-.815 4.157M62.725 202.503c-.33 1.618-.102 1.904-.449 3.438 0 0-2.756 1.903-2.29 3.923.466 2.02-.31 3.424-4.505 17.252-1.762 5.807-4.233 18.922-6.165 28.278-.03.144-.521 2.646-1.14 5.8M64.158 194.136c-.295 1.658-.6 3.31-.917 4.938M71.33 146.787l-1.244 10.877s-1.14.155-.519 2.33c.117 1.399-2.778 16.39-5.382 31.615M44.242 273.727H58.07" stroke="#648BD8" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M106.18 142.117c-3.028-.489-18.825-2.744-36.219.2a.625.625 0 0 0-.518.644c.063 1.307.044 2.343.015 2.995a.617.617 0 0 0 .716.636c3.303-.534 17.037-2.412 35.664-.266.347.04.66-.214.692-.56.124-1.347.16-2.425.17-3.029a.616.616 0 0 0-.52-.62" fill="#192064" data-v-9ab8168c></path><path d="M96.398 145.264l.003-5.102a.843.843 0 0 0-.809-.847 114.104 114.104 0 0 0-8.141-.014.85.85 0 0 0-.82.847l-.003 5.097c0 .476.388.857.864.845 2.478-.064 5.166-.067 8.03.017a.848.848 0 0 0 .876-.843" fill="#FFF" data-v-9ab8168c></path><path d="M95.239 144.296l.002-3.195a.667.667 0 0 0-.643-.672c-1.9-.061-3.941-.073-6.094-.01a.675.675 0 0 0-.654.672l-.002 3.192c0 .376.305.677.68.669 1.859-.042 3.874-.043 6.02.012.376.01.69-.291.691-.668" fill="#192064" data-v-9ab8168c></path><path d="M90.102 273.522h12.819M91.216 269.761c.006 3.519-.072 5.55 0 6.292M90.923 263.474c-.009 1.599-.016 2.558-.016 4.505M90.44 170.404l.932 46.38s.7 1.631-.233 2.796c-.932 1.166 2.564.7.932 2.33-1.63 1.633.933 1.166 0 3.497-.618 1.546-1.031 21.921-1.138 36.513" stroke="#648BD8" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M73.736 98.665l2.214 4.312s2.098.816 1.865 2.68l.816 2.214M64.297 116.611c.233-.932 2.176-7.147 12.585-10.488M77.598 90.042s7.691 6.137 16.547 2.72" stroke="#E4EBF7" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M91.974 86.954s5.476-.816 7.574-4.545c1.297-.345.72 2.212-.33 3.671-.7.971-1.01 1.554-1.01 1.554s.194.31.155.816c-.053.697-.175.653-.272 1.048-.081.335.108.657 0 1.049-.046.17-.198.5-.382.878-.12.249-.072.687-.2.948-.231.469-1.562 1.87-2.622 2.855-3.826 3.554-5.018 1.644-6.001-.408-.894-1.865-.661-5.127-.874-6.875-.35-2.914-2.622-3.03-1.923-4.429.343-.685 2.87.69 3.263 1.748.757 2.04 2.952 1.807 2.622 1.69" fill="#FFC6A0" data-v-9ab8168c></path><path d="M99.8 82.429c-.465.077-.35.272-.97 1.243-.622.971-4.817 2.932-6.39 3.224-2.589.48-2.278-1.56-4.254-2.855-1.69-1.107-3.562-.638-1.398 1.398.99.932.932 1.107 1.398 3.205.335 1.506-.64 3.67.7 5.593" stroke="#DB836E" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M79.543 108.673c-2.1 2.926-4.266 6.175-5.557 8.762" stroke="#E59788" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M87.72 124.768s-2.098-1.942-5.127-2.719c-3.03-.777-3.574-.155-5.516.078-1.942.233-3.885-.932-3.652.7.233 1.63 5.05 1.01 5.206 2.097.155 1.087-6.37 2.796-8.313 2.175-.777.777.466 1.864 2.02 2.175.233 1.554 2.253 1.554 2.253 1.554s.699 1.01 2.641 1.088c2.486 1.32 8.934-.7 10.954-1.554 2.02-.855-.466-5.594-.466-5.594" fill="#FFC6A0" data-v-9ab8168c></path><path d="M73.425 122.826s.66 1.127 3.167 1.418c2.315.27 2.563.583 2.563.583s-2.545 2.894-9.07 2.272M72.416 129.274s3.826.097 4.933-.718M74.98 130.75s1.961.136 3.36-.505M77.232 131.916s1.748.019 2.914-.505M73.328 122.321s-.595-1.032 1.262-.427c1.671.544 2.833.055 5.128.155 1.389.061 3.067-.297 3.982.15 1.606.784 3.632 2.181 3.632 2.181s10.526 1.204 19.033-1.127M78.864 108.104s-8.39 2.758-13.168 12.12" stroke="#E59788" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M109.278 112.533s3.38-3.613 7.575-4.662" stroke="#E4EBF7" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M107.375 123.006s9.697-2.745 11.445-.88" stroke="#E59788" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M194.605 83.656l3.971-3.886M187.166 90.933l3.736-3.655M191.752 84.207l-4.462-4.56M198.453 91.057l-4.133-4.225M129.256 163.074l3.718-3.718M122.291 170.039l3.498-3.498M126.561 163.626l-4.27-4.27M132.975 170.039l-3.955-3.955" stroke="#BFCDDD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M190.156 211.779h-1.604a4.023 4.023 0 0 1-4.011-4.011V175.68a4.023 4.023 0 0 1 4.01-4.01h1.605a4.023 4.023 0 0 1 4.011 4.01v32.088a4.023 4.023 0 0 1-4.01 4.01" fill="#A3B4C6" data-v-9ab8168c></path><path d="M237.824 212.977a4.813 4.813 0 0 1-4.813 4.813h-86.636a4.813 4.813 0 0 1 0-9.626h86.636a4.813 4.813 0 0 1 4.813 4.813" fill="#A3B4C6" data-v-9ab8168c></path><mask fill="#fff" data-v-9ab8168c></mask><path fill="#A3B4C6" mask="url(#d)" d="M154.098 190.096h70.513v-84.617h-70.513z" data-v-9ab8168c></path><path d="M224.928 190.096H153.78a3.219 3.219 0 0 1-3.208-3.209V167.92a3.219 3.219 0 0 1 3.208-3.21h71.148a3.219 3.219 0 0 1 3.209 3.21v18.967a3.219 3.219 0 0 1-3.21 3.209M224.928 130.832H153.78a3.218 3.218 0 0 1-3.208-3.208v-18.968a3.219 3.219 0 0 1 3.208-3.209h71.148a3.219 3.219 0 0 1 3.209 3.21v18.967a3.218 3.218 0 0 1-3.21 3.208" fill="#BFCDDD" mask="url(#d)" data-v-9ab8168c></path><path d="M159.563 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M166.98 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M174.397 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M222.539 120.546h-22.461a.802.802 0 0 1-.802-.802v-3.208c0-.443.359-.803.802-.803h22.46c.444 0 .803.36.803.803v3.208c0 .443-.36.802-.802.802" fill="#FFF" mask="url(#d)" data-v-9ab8168c></path><path d="M224.928 160.464H153.78a3.218 3.218 0 0 1-3.208-3.209v-18.967a3.219 3.219 0 0 1 3.208-3.209h71.148a3.219 3.219 0 0 1 3.209 3.209v18.967a3.218 3.218 0 0 1-3.21 3.209" fill="#BFCDDD" mask="url(#d)" data-v-9ab8168c></path><path d="M173.455 130.832h49.301M164.984 130.832h6.089M155.952 130.832h6.75M173.837 160.613h49.3M165.365 160.613h6.089M155.57 160.613h6.751" stroke="#7C90A5" stroke-width="1.124" stroke-linecap="round" stroke-linejoin="round" mask="url(#d)" data-v-9ab8168c></path><path d="M159.563 151.038a2.407 2.407 0 1 1 0-4.814 2.407 2.407 0 0 1 0 4.814M166.98 151.038a2.407 2.407 0 1 1 0-4.814 2.407 2.407 0 0 1 0 4.814M174.397 151.038a2.407 2.407 0 1 1 .001-4.814 2.407 2.407 0 0 1 0 4.814M222.539 151.038h-22.461a.802.802 0 0 1-.802-.802v-3.209c0-.443.359-.802.802-.802h22.46c.444 0 .803.36.803.802v3.209c0 .443-.36.802-.802.802M159.563 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M166.98 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M174.397 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M222.539 179.987h-22.461a.802.802 0 0 1-.802-.802v-3.209c0-.443.359-.802.802-.802h22.46c.444 0 .803.36.803.802v3.209c0 .443-.36.802-.802.802" fill="#FFF" mask="url(#d)" data-v-9ab8168c></path><path d="M203.04 221.108h-27.372a2.413 2.413 0 0 1-2.406-2.407v-11.448a2.414 2.414 0 0 1 2.406-2.407h27.372a2.414 2.414 0 0 1 2.407 2.407V218.7a2.413 2.413 0 0 1-2.407 2.407" fill="#BFCDDD" mask="url(#d)" data-v-9ab8168c></path><path d="M177.259 207.217v11.52M201.05 207.217v11.52" stroke="#A3B4C6" stroke-width="1.124" stroke-linecap="round" stroke-linejoin="round" mask="url(#d)" data-v-9ab8168c></path><path d="M162.873 267.894a9.422 9.422 0 0 1-9.422-9.422v-14.82a9.423 9.423 0 0 1 18.845 0v14.82a9.423 9.423 0 0 1-9.423 9.422" fill="#5BA02E" mask="url(#d)" data-v-9ab8168c></path><path d="M171.22 267.83a9.422 9.422 0 0 1-9.422-9.423v-3.438a9.423 9.423 0 0 1 18.845 0v3.438a9.423 9.423 0 0 1-9.422 9.423" fill="#92C110" mask="url(#d)" data-v-9ab8168c></path><path d="M181.31 293.666h-27.712a3.209 3.209 0 0 1-3.209-3.21V269.79a3.209 3.209 0 0 1 3.209-3.21h27.711a3.209 3.209 0 0 1 3.209 3.21v20.668a3.209 3.209 0 0 1-3.209 3.209" fill="#F2D7AD" mask="url(#d)" data-v-9ab8168c></path></g>', 2);
var p4 = [
  f4
];
var v4 = { class: "m-title" };
var h4 = { class: "m-subtitle" };
var m4 = { class: "m-extra" };
var _4 = defineComponent({
  __name: "Result",
  props: {
    status: { default: "info" },
    title: { default: "" },
    subTitle: { default: "" }
  },
  setup(a3) {
    const e3 = ref(), t3 = ref(1);
    return onMounted(() => {
      t3.value = e3.value.offsetHeight;
    }), (s3, n) => (openBlock(), createElementBlock("div", U2, [
      createBaseVNode("div", Y2, [
        renderSlot(s3.$slots, "image", {}, () => [
          s3.status === "info" ? (openBlock(), createElementBlock("svg", K2, J2)) : createCommentVNode("", true),
          s3.status === "success" ? (openBlock(), createElementBlock("svg", X2, x2)) : createCommentVNode("", true),
          s3.status === "warning" ? (openBlock(), createElementBlock("svg", Q2, t4)) : createCommentVNode("", true),
          s3.status === "error" ? (openBlock(), createElementBlock("svg", a4, s4)) : createCommentVNode("", true),
          s3.status === "403" ? (openBlock(), createElementBlock("svg", o4, i4)) : createCommentVNode("", true),
          s3.status === "404" ? (openBlock(), createElementBlock("svg", u4, c4)) : createCommentVNode("", true),
          s3.status === "500" ? (openBlock(), createElementBlock("svg", d4, p4)) : createCommentVNode("", true)
        ], true)
      ]),
      createBaseVNode("div", v4, [
        renderSlot(s3.$slots, "title", {}, () => [
          createTextVNode(toDisplayString(s3.title), 1)
        ], true)
      ]),
      createBaseVNode("div", h4, [
        renderSlot(s3.$slots, "subTitle", {}, () => [
          createTextVNode(toDisplayString(s3.subTitle), 1)
        ], true)
      ]),
      createBaseVNode("div", m4, [
        renderSlot(s3.$slots, "extra", {}, void 0, true)
      ]),
      t3.value !== 48 ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "m-content",
        ref_key: "contentRef",
        ref: e3
      }, [
        renderSlot(s3.$slots, "default", {}, void 0, true)
      ], 512)) : createCommentVNode("", true)
    ]));
  }
});
var bt2 = W(_4, [["__scopeId", "data-v-9ab8168c"]]);
bt2.install = (a3) => {
  a3.component(bt2.__name, bt2);
};
var g4 = defineComponent({
  __name: "Row",
  props: {
    width: { default: "auto" },
    gutter: { default: 0 },
    wrap: { type: Boolean, default: false },
    align: { default: "top" },
    justify: { default: "start" }
  },
  setup(a3) {
    const e3 = a3, t3 = {
      top: "flex-start",
      middle: "center",
      bottom: "flex-end",
      stretch: "stretch"
    }, s3 = computed(() => typeof e3.gutter == "number" ? e3.gutter : Array.isArray(e3.gutter) ? typeof e3.gutter[0] == "object" ? o.value >= 1600 && e3.gutter[0].xxl ? e3.gutter[0].xxl : o.value >= 1200 && e3.gutter[0].xl ? e3.gutter[0].xl : o.value >= 992 && e3.gutter[0].lg ? e3.gutter[0].lg : o.value >= 768 && e3.gutter[0].md ? e3.gutter[0].md : o.value >= 576 && e3.gutter[0].sm ? e3.gutter[0].sm : o.value < 576 && e3.gutter[0].xs ? e3.gutter[0].xs : 16 : e3.gutter[0] : typeof e3.gutter == "object" ? o.value >= 1600 && e3.gutter.xxl ? e3.gutter.xxl : o.value >= 1200 && e3.gutter.xl ? e3.gutter.xl : o.value >= 992 && e3.gutter.lg ? e3.gutter.lg : o.value >= 768 && e3.gutter.md ? e3.gutter.md : o.value >= 576 && e3.gutter.sm ? e3.gutter.sm : o.value < 576 && e3.gutter.xs ? e3.gutter.xs : 16 : 0), n = computed(() => Array.isArray(e3.gutter) ? typeof e3.gutter[1] == "object" ? o.value >= 1600 && e3.gutter[1].xxl ? e3.gutter[1].xxl : o.value >= 1200 && e3.gutter[1].xl ? e3.gutter[1].xl : o.value >= 992 && e3.gutter[1].lg ? e3.gutter[1].lg : o.value >= 768 && e3.gutter[1].md ? e3.gutter[1].md : o.value >= 576 && e3.gutter[1].sm ? e3.gutter[1].sm : o.value < 576 && e3.gutter[1].xs ? e3.gutter[1].xs : 16 : e3.gutter[1] : 0), c3 = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), o = ref(document.documentElement.clientWidth);
    onMounted(() => {
      window.addEventListener("resize", u3);
    }), onUnmounted(() => {
      window.removeEventListener("resize", u3);
    });
    function u3() {
      o.value = document.documentElement.clientWidth;
    }
    return (p, g) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["m-row", { "gutter-row": p.gutter }]),
      style: normalizeStyle(`--xGap: ${s3.value / 2}px; --justify: ${p.justify}; --align: ${t3[p.align]}; width: ${c3.value}; margin-left: -${s3.value / 2}px; margin-right: -${s3.value / 2}px; row-gap: ${n.value}px;`)
    }, [
      renderSlot(p.$slots, "default", {}, void 0, true)
    ], 6));
  }
});
var $t = W(g4, [["__scopeId", "data-v-aee57bbb"]]);
$t.install = (a3) => {
  a3.component($t.__name, $t);
};
var aa2 = (a3) => (pushScopeId("data-v-4a15e763"), a3 = a3(), popScopeId(), a3);
var y4 = {
  key: 0,
  class: "u-handle-tooltip"
};
var w4 = aa2(() => createBaseVNode("div", { class: "m-arrow" }, [
  createBaseVNode("span", { class: "u-arrow" })
], -1));
var k4 = {
  key: 0,
  class: "u-handle-tooltip"
};
var b4 = aa2(() => createBaseVNode("div", { class: "m-arrow" }, [
  createBaseVNode("span", { class: "u-arrow" })
], -1));
var $4 = defineComponent({
  __name: "Slider",
  props: {
    width: { default: "100%" },
    min: { default: 0 },
    max: { default: 100 },
    disabled: { type: Boolean, default: false },
    range: { type: Boolean, default: false },
    step: { default: 1 },
    tipFormatter: { type: Function, default: (a3) => a3 },
    hideTip: { type: Boolean, default: false },
    value: { default: 0 }
  },
  emits: ["update:value", "change"],
  setup(a3, { emit: e3 }) {
    const t3 = a3, s3 = ref(false), n = ref(), c3 = ref(0), o = ref(0), u3 = ref(), p = ref(), g = ref(), d3 = ref(), v = computed(() => m3(p.value / (t3.max - t3.min) * t3.step)), $ = computed(() => typeof t3.width == "number" ? t3.width + "px" : t3.width), k3 = computed(() => {
      const H3 = Math.round(o.value / v.value * t3.step + t3.min);
      return t3.range ? [Math.round(c3.value / v.value * t3.step + t3.min), H3] : H3;
    }), y3 = computed(() => t3.range ? t3.tipFormatter(k3.value[0]) : null), f = computed(() => t3.range ? t3.tipFormatter(k3.value[1]) : t3.tipFormatter(k3.value));
    watch(
      () => t3.value,
      () => {
        b3();
      }
    ), watch(k3, (H3) => {
      e3("update:value", H3), e3("change", H3);
    }), onMounted(() => {
      M3(), b3();
    });
    function m3(H3) {
      return parseFloat(H3.toFixed(2));
    }
    function M3() {
      p.value = u3.value.offsetWidth;
    }
    function b3() {
      t3.range ? (c3.value = m3((t3.value[0] - t3.min) / t3.step * v.value), o.value = m3((t3.value[1] - t3.min) / t3.step * v.value)) : o.value = m3((t3.value - t3.min) / t3.step * v.value);
    }
    function _(H3) {
      s3.value ? (_e(n.value), n.value = null) : s3.value = true, n.value = pe(() => {
        s3.value = false;
      }, 300);
      const I3 = Math.round(H3.layerX / v.value) * v.value;
      t3.range ? I3 <= c3.value ? (c3.value = I3, g.value.focus()) : I3 >= o.value ? (o.value = I3, d3.value.focus()) : I3 - c3.value < o.value - I3 ? (c3.value = I3, g.value.focus()) : (o.value = I3, d3.value.focus()) : (o.value = I3, d3.value.focus());
    }
    function w3() {
      const H3 = u3.value.getBoundingClientRect().left;
      document.onmousemove = (I3) => {
        const P = m3(Math.round((I3.clientX - H3) / v.value) * v.value);
        P < 0 ? c3.value = 0 : P >= 0 && P <= o.value ? c3.value = P : (c3.value = o.value, d3.value.focus(), z3());
      }, document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
    function z3() {
      const H3 = u3.value.getBoundingClientRect().left;
      document.onmousemove = (I3) => {
        const P = m3(Math.round((I3.clientX - H3) / v.value) * v.value);
        P > p.value ? o.value = p.value : c3.value <= P && P <= p.value ? o.value = P : (o.value = c3.value, g.value.focus(), w3());
      }, document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
    function D3(H3, I3) {
      const P = H3 - v.value;
      I3 === "left" ? P < 0 ? c3.value = 0 : c3.value = P : P >= c3.value ? o.value = P : (o.value = c3.value, c3.value = P, g.value.focus());
    }
    function L3(H3, I3) {
      const P = H3 + v.value;
      I3 === "right" ? P > p.value ? o.value = p.value : o.value = P : P <= o.value ? c3.value = P : (c3.value = o.value, o.value = P, d3.value.focus());
    }
    return (H3, I3) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["m-slider", { disabled: H3.disabled }]),
      ref_key: "slider",
      ref: u3,
      style: normalizeStyle(`width: ${$.value};`)
    }, [
      createBaseVNode("div", {
        class: "u-slider-rail",
        onClick: I3[0] || (I3[0] = withModifiers((P) => H3.disabled ? () => false : _(P), ["self"]))
      }),
      createBaseVNode("div", {
        class: normalizeClass(["u-slider-track", { trackTransition: s3.value }]),
        style: normalizeStyle(`left: ${c3.value}px; right: auto; width: ${o.value - c3.value}px;`)
      }, null, 6),
      H3.range ? (openBlock(), createElementBlock("div", {
        key: 0,
        tabindex: "0",
        ref_key: "leftHandle",
        ref: g,
        class: normalizeClass(["u-slider-handle", { handleTransition: s3.value }]),
        style: normalizeStyle(`left: ${c3.value}px; right: auto; transform: translate(-50%, -50%);`),
        onKeydown: [
          I3[1] || (I3[1] = withKeys(withModifiers((P) => H3.disabled ? () => false : D3(c3.value, "left"), ["prevent"]), ["left"])),
          I3[2] || (I3[2] = withKeys(withModifiers((P) => H3.disabled ? () => false : L3(c3.value, "left"), ["prevent"]), ["right"])),
          I3[3] || (I3[3] = withKeys(withModifiers((P) => H3.disabled ? () => false : D3(c3.value, "left"), ["prevent"]), ["down"])),
          I3[4] || (I3[4] = withKeys(withModifiers((P) => H3.disabled ? () => false : L3(c3.value, "left"), ["prevent"]), ["up"]))
        ],
        onMousedown: I3[5] || (I3[5] = (P) => H3.disabled ? () => false : w3())
      }, [
        H3.hideTip ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", y4, [
          createTextVNode(toDisplayString(y3.value) + " ", 1),
          w4
        ]))
      ], 38)) : createCommentVNode("", true),
      createBaseVNode("div", {
        tabindex: "0",
        ref_key: "rightHandle",
        ref: d3,
        class: normalizeClass(["u-slider-handle", { handleTransition: s3.value }]),
        style: normalizeStyle(`left: ${o.value}px; right: auto; transform: translate(-50%, -50%);`),
        onKeydown: [
          I3[6] || (I3[6] = withKeys(withModifiers((P) => H3.disabled ? () => false : D3(o.value, "right"), ["prevent"]), ["left"])),
          I3[7] || (I3[7] = withKeys(withModifiers((P) => H3.disabled ? () => false : L3(o.value, "right"), ["prevent"]), ["right"])),
          I3[8] || (I3[8] = withKeys(withModifiers((P) => H3.disabled ? () => false : D3(o.value, "right"), ["prevent"]), ["down"])),
          I3[9] || (I3[9] = withKeys(withModifiers((P) => H3.disabled ? () => false : L3(o.value, "right"), ["prevent"]), ["up"]))
        ],
        onMousedown: I3[10] || (I3[10] = (P) => H3.disabled ? () => false : z3())
      }, [
        H3.hideTip ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", k4, [
          createTextVNode(toDisplayString(f.value) + " ", 1),
          b4
        ]))
      ], 38)
    ], 6));
  }
});
var Mt = W($4, [["__scopeId", "data-v-4a15e763"]]);
Mt.install = (a3) => {
  a3.component(Mt.__name, Mt);
};
var M4 = defineComponent({
  __name: "Space",
  props: {
    width: { default: "auto" },
    align: { default: "start" },
    direction: { default: "horizontal" },
    size: { default: "small" },
    wrap: { type: Boolean, default: true }
  },
  setup(a3) {
    const e3 = a3, t3 = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), s3 = computed(() => {
      if (typeof e3.size == "number")
        return e3.size + "px";
      if (Array.isArray(e3.size))
        return e3.size[1] + "px " + e3.size[0] + "px ";
      if (["small", "middle", "large"].includes(e3.size))
        return {
          small: "8px",
          middle: "16px",
          large: "24px"
        }[e3.size];
    });
    return (n, c3) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["m-space", [`${n.direction} ${n.align}`, { wrap: n.wrap }]]),
      style: normalizeStyle(`width: ${t3.value}; gap: ${s3.value}; margin-bottom: -${Array.isArray(e3.size) && n.wrap ? e3.size[1] : 0}px;`)
    }, [
      renderSlot(n.$slots, "default", {}, void 0, true)
    ], 6));
  }
});
var je2 = W(M4, [["__scopeId", "data-v-15e6c265"]]);
je2.install = (a3) => {
  a3.component(je2.__name, je2);
};
var C4 = { class: "m-statistic" };
var z4 = { class: "u-title" };
var B4 = { class: "u-content-value" };
var S4 = defineComponent({
  __name: "Statistic",
  props: {
    title: { default: "" },
    value: { default: "" },
    valueStyle: { default: () => ({}) },
    precision: { default: 0 },
    prefix: { default: "" },
    suffix: { default: "" },
    separator: { default: "," },
    formatter: { type: Function, default: (a3) => a3 }
  },
  setup(a3) {
    const e3 = a3, t3 = computed(() => e3.formatter(ua2(e3.value, e3.precision, e3.separator))), s3 = ref(), n = ref(1), c3 = ref(), o = ref(1);
    return onMounted(() => {
      n.value = s3.value.offsetHeight, o.value = c3.value.offsetHeight;
    }), (u3, p) => (openBlock(), createElementBlock("div", C4, [
      createBaseVNode("div", z4, [
        renderSlot(u3.$slots, "title", {}, () => [
          createTextVNode(toDisplayString(u3.title), 1)
        ], true)
      ]),
      createBaseVNode("div", {
        class: "m-content",
        style: normalizeStyle(u3.valueStyle)
      }, [
        n.value ? (openBlock(), createElementBlock("span", {
          key: 0,
          ref_key: "prefixRef",
          ref: s3,
          class: "u-prefix"
        }, [
          renderSlot(u3.$slots, "prefix", {}, () => [
            createTextVNode(toDisplayString(u3.prefix), 1)
          ], true)
        ], 512)) : createCommentVNode("", true),
        createBaseVNode("span", B4, toDisplayString(t3.value), 1),
        o.value ? (openBlock(), createElementBlock("span", {
          key: 1,
          ref_key: "suffixRef",
          ref: c3,
          class: "u-suffix"
        }, [
          renderSlot(u3.$slots, "suffix", {}, () => [
            createTextVNode(toDisplayString(u3.suffix), 1)
          ], true)
        ], 512)) : createCommentVNode("", true)
      ], 4)
    ]));
  }
});
var Ct2 = W(S4, [["__scopeId", "data-v-c18f8df0"]]);
Ct2.install = (a3) => {
  a3.component(Ct2.__name, Ct2);
};
var F4 = (a3) => (pushScopeId("data-v-fc4e2fef"), a3 = a3(), popScopeId(), a3);
var L4 = { class: "m-steps" };
var A4 = ["onClick"];
var D4 = { class: "m-steps-icon" };
var H4 = {
  key: 0,
  class: "u-num"
};
var E4 = {
  key: 1,
  class: "u-icon",
  viewBox: "64 64 896 896",
  "data-icon": "check",
  "aria-hidden": "true",
  focusable: "false"
};
var I4 = F4(() => createBaseVNode("path", { d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" }, null, -1));
var R4 = [
  I4
];
var T4 = { class: "m-steps-content" };
var V4 = { class: "u-steps-title" };
var W4 = defineComponent({
  __name: "Steps",
  props: {
    steps: { default: () => [] },
    current: { default: 1 },
    width: { default: "100%" },
    descMaxWidth: { default: 120 }
  },
  emits: ["update:current", "change"],
  setup(a3, { emit: e3 }) {
    const t3 = a3, s3 = computed(() => typeof t3.width == "number" ? t3.width + "px" : t3.width), n = computed(() => t3.steps.length), c3 = computed(() => t3.current < 1 ? 1 : t3.current > n.value + 1 ? n.value + 1 : t3.current);
    function o(u3) {
      c3.value !== u3 && (e3("update:current", u3), e3("change", u3));
    }
    return (u3, p) => (openBlock(), createElementBlock("div", {
      class: "m-steps-area",
      style: normalizeStyle(`width: ${s3.value};`)
    }, [
      createBaseVNode("div", L4, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(u3.steps, (g, d3) => (openBlock(), createElementBlock("div", {
          class: normalizeClass([
            "m-steps-item",
            {
              finish: c3.value > d3 + 1,
              process: c3.value === d3 + 1,
              wait: c3.value < d3 + 1
            }
          ]),
          key: d3
        }, [
          createBaseVNode("div", {
            class: "m-info-wrap",
            onClick: (v) => o(d3 + 1)
          }, [
            createBaseVNode("div", D4, [
              c3.value <= d3 + 1 ? (openBlock(), createElementBlock("span", H4, toDisplayString(d3 + 1), 1)) : (openBlock(), createElementBlock("svg", E4, R4))
            ]),
            createBaseVNode("div", T4, [
              createBaseVNode("div", V4, toDisplayString(g.title), 1),
              withDirectives(createBaseVNode("div", {
                class: "u-steps-description",
                style: normalizeStyle(`max-width: ${u3.descMaxWidth}px;`)
              }, toDisplayString(g.description), 5), [
                [vShow, g.description]
              ])
            ])
          ], 8, A4)
        ], 2))), 128))
      ])
    ], 4));
  }
});
var zt = W(W4, [["__scopeId", "data-v-fc4e2fef"]]);
zt.install = (a3) => {
  a3.component(zt.__name, zt);
};
var j4 = ["href", "target"];
var P4 = ["src", "alt"];
var O4 = ["href", "target"];
var q4 = ["src", "alt"];
var N4 = defineComponent({
  __name: "Swiper",
  props: {
    images: { default: () => [] },
    width: { default: "100%" },
    height: { default: "100vh" },
    type: { default: "banner" },
    navigation: { type: Boolean, default: true },
    delay: { default: 3e3 },
    swipe: { type: Boolean, default: true },
    preloaderColor: { default: "theme" }
  },
  setup(a3) {
    const e3 = a3, t3 = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), s3 = computed(() => typeof e3.height == "number" ? e3.height + "px" : e3.height), n = ref([Navigation, Pagination, Autoplay, EffectFade]), c3 = ref({
      dynamicBullets: true,
      clickable: true
    }), o = ref({
      delay: e3.delay,
      disableOnInteraction: false,
      // 用户操作swiper之后，是否禁止autoplay。默认为true：停止。
      pauseOnMouseEnter: true
      // 鼠标置于swiper时暂停自动切换，鼠标离开时恢复自动切换，默认false
    }), u3 = ref([Autoplay]), p = ref({
      delay: 0,
      disableOnInteraction: false
    });
    function g(d3) {
      e3.type === "carousel" && (d3.el.onmouseenter = () => {
        d3.autoplay.stop();
      }, d3.el.onmouseleave = () => {
        d3.autoplay.start();
      });
    }
    return (d3, v) => (openBlock(), createElementBlock(Fragment, null, [
      d3.type === "banner" ? (openBlock(), createBlock(unref(Swiper2), mergeProps({
        key: 0,
        class: { "swiper-no-swiping": !d3.swipe },
        modules: n.value,
        lazy: true,
        navigation: d3.navigation,
        pagination: c3.value,
        "slides-per-view": 1,
        autoplay: o.value,
        loop: true,
        onSwiper: g,
        onSlideChange: v[0] || (v[0] = ($) => d3.$emit("change"))
      }, d3.$attrs), {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(d3.images, ($, k3) => (openBlock(), createBlock(unref(SwiperSlide), { key: k3 }, {
            default: withCtx(() => [
              createBaseVNode("a", {
                href: $.link ? $.link : "javascript:;",
                target: $.link ? "_blank" : "_self",
                class: "m-link"
              }, [
                createBaseVNode("img", {
                  src: $.src,
                  class: "u-img",
                  style: normalizeStyle(`width: ${t3.value}; height: ${s3.value};`),
                  alt: $.title,
                  loading: "lazy"
                }, null, 12, P4)
              ], 8, j4),
              createBaseVNode("div", {
                class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${d3.preloaderColor}`)
              }, null, 2)
            ]),
            _: 2
          }, 1024))), 128))
        ]),
        _: 1
      }, 16, ["class", "modules", "navigation", "pagination", "autoplay"])) : createCommentVNode("", true),
      d3.type === "carousel" ? (openBlock(), createBlock(unref(Swiper2), mergeProps({
        key: 1,
        class: "swiper-no-swiping",
        modules: u3.value,
        lazy: true,
        autoplay: p.value,
        loop: true,
        onSwiper: g,
        onSlideChange: v[1] || (v[1] = ($) => d3.$emit("change"))
      }, d3.$attrs), {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(d3.images, ($, k3) => (openBlock(), createBlock(unref(SwiperSlide), { key: k3 }, {
            default: withCtx(() => [
              createBaseVNode("a", {
                href: $.link ? $.link : "javascript:;",
                target: $.link ? "_blank" : "_self",
                class: "m-link"
              }, [
                createBaseVNode("img", {
                  src: $.src,
                  class: "u-img",
                  style: normalizeStyle(`width: ${t3.value}; height: ${s3.value};`),
                  alt: $.title,
                  loading: "lazy"
                }, null, 12, q4)
              ], 8, O4),
              createBaseVNode("div", {
                class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${d3.preloaderColor}`)
              }, null, 2)
            ]),
            _: 2
          }, 1024))), 128))
        ]),
        _: 1
      }, 16, ["modules", "autoplay"])) : createCommentVNode("", true)
    ], 64));
  }
});
var Bt2 = W(N4, [["__scopeId", "data-v-98362268"]]);
Bt2.install = (a3) => {
  a3.component(Bt2.__name, Bt2);
};
var U4 = { class: "m-switch-wrap" };
var Y4 = defineComponent({
  __name: "Switch",
  props: {
    checkedInfo: { default: "" },
    uncheckedInfo: { default: "" },
    disabled: { type: Boolean, default: false },
    checked: { type: Boolean, default: false },
    nodeStyle: { default: () => ({}) }
  },
  emits: ["update:checked", "change"],
  setup(a3, { emit: e3 }) {
    const t3 = a3;
    function s3() {
      e3("update:checked", !t3.checked), e3("change", !t3.checked);
    }
    return (n, c3) => (openBlock(), createElementBlock("div", U4, [
      createBaseVNode("div", {
        onClick: c3[0] || (c3[0] = (o) => n.disabled ? () => false : s3()),
        class: normalizeClass(["m-switch", { "switch-checked": n.checked, disabled: n.disabled }])
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["u-switch-inner", n.checked ? "inner-checked" : "inner-unchecked"])
        }, toDisplayString(n.checked ? n.checkedInfo : n.uncheckedInfo), 3),
        createBaseVNode("div", {
          class: normalizeClass(["u-node", { "node-checked": n.checked }]),
          style: normalizeStyle(n.nodeStyle)
        }, [
          renderSlot(n.$slots, "node", {}, void 0, true)
        ], 6)
      ], 2)
    ]));
  }
});
var St = W(Y4, [["__scopeId", "data-v-0884d406"]]);
St.install = (a3) => {
  a3.component(St.__name, St);
};
var K4 = { class: "m-table-wrap" };
var G4 = { class: "m-table" };
var J4 = { class: "m-tr" };
var X4 = { class: "m-body" };
var Z4 = { class: "m-tr-loading" };
var x4 = { class: "m-tr-empty" };
var Q4 = ["colspan"];
var ei = ["title"];
var ti = { key: 1 };
var ai = defineComponent({
  __name: "Table",
  props: {
    columns: { default: () => [] },
    dataSource: { default: () => [] },
    pagination: { default: () => ({ page: 1, pageSize: 10 }) },
    showPagination: { type: Boolean, default: true },
    hideOnSinglePage: { type: Boolean, default: false },
    total: { default: 0 },
    loading: { type: Boolean, default: false }
  },
  emits: ["change"],
  setup(a3, { emit: e3 }) {
    function t3(s3) {
      e3("change", s3);
    }
    return (s3, n) => (openBlock(), createElementBlock("div", K4, [
      createBaseVNode("table", G4, [
        createBaseVNode("thead", null, [
          createBaseVNode("tr", J4, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(s3.columns, (c3, o) => (openBlock(), createElementBlock("th", {
              class: "m-th",
              style: normalizeStyle(`width: ${typeof c3.width == "number" ? c3.width + "px" : c3.width};`),
              key: o
            }, toDisplayString(c3.title), 5))), 128))
          ])
        ]),
        createBaseVNode("tbody", X4, [
          withDirectives(createBaseVNode("tr", Z4, [
            createVNode(unref(ue), {
              class: "m-loading",
              size: "small",
              colspan: s3.columns.length
            }, null, 8, ["colspan"])
          ], 512), [
            [vShow, s3.loading]
          ]),
          withDirectives(createBaseVNode("tr", x4, [
            createBaseVNode("td", {
              class: "m-td-empty",
              colspan: s3.columns.length
            }, [
              createVNode(unref(Se2), {
                class: "empty",
                image: "2"
              })
            ], 8, Q4)
          ], 512), [
            [vShow, !s3.total]
          ]),
          (openBlock(true), createElementBlock(Fragment, null, renderList(s3.dataSource, (c3, o) => (openBlock(), createElementBlock("tr", {
            class: "m-tr",
            key: o
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(s3.columns, (u3, p) => (openBlock(), createElementBlock("td", {
              class: "m-td",
              key: p,
              title: c3[u3.dataIndex]
            }, [
              u3.slot ? renderSlot(s3.$slots, u3.slot, mergeProps({ key: 0 }, c3, { index: o }), () => [
                createTextVNode(toDisplayString(c3[u3.dataIndex] || "--"), 1)
              ], true) : (openBlock(), createElementBlock("span", ti, toDisplayString(c3[u3.dataIndex] || "--"), 1))
            ], 8, ei))), 128))
          ]))), 128))
        ])
      ]),
      s3.showPagination && s3.total ? (openBlock(), createBlock(unref(We2), {
        key: 0,
        class: "mt20",
        onChange: t3,
        current: s3.pagination.page,
        pageSize: s3.pagination.pageSize,
        total: s3.total,
        hideOnSinglePage: s3.hideOnSinglePage,
        showQuickJumper: true,
        showTotal: true,
        placement: "right"
      }, null, 8, ["current", "pageSize", "total", "hideOnSinglePage"])) : createCommentVNode("", true)
    ]));
  }
});
var Ft = W(ai, [["__scopeId", "data-v-b94a797c"]]);
Ft.install = (a3) => {
  a3.component(Ft.__name, Ft);
};
var li = { class: "m-tabs-nav" };
var si = ["onClick"];
var oi = { class: "m-tabs-page" };
var ni = defineComponent({
  __name: "Tabs",
  props: {
    tabPages: { default: () => [] },
    centered: { type: Boolean, default: false },
    size: { default: "small" },
    activeKey: { default: "" }
  },
  emits: ["update:activeKey", "change"],
  setup(a3, { emit: e3 }) {
    const t3 = a3, s3 = ref(), n = ref(0), c3 = ref(0), o = ref(), u3 = ref(), p = ref(false), g = ref(0), d3 = ref(0);
    watchEffect(() => {
      k3();
    }, { flush: "post" }), watchEffect(() => {
      $(t3.activeKey);
    }, { flush: "post" });
    function v(m3) {
      return s3.value.find((M3) => M3.__vnode.key === m3);
    }
    function $(m3) {
      const M3 = v(m3);
      M3 ? (n.value = M3.offsetLeft, c3.value = M3.offsetWidth) : (n.value = 0, c3.value = 0);
    }
    function k3() {
      const m3 = o.value.offsetWidth, M3 = u3.value.offsetWidth;
      M3 > m3 && (p.value = true, g.value = M3 - m3);
    }
    function y3(m3) {
      $(m3), e3("update:activeKey", m3), e3("change", m3);
    }
    function f(m3) {
      if (m3.deltaX !== 0) {
        m3.preventDefault();
        const M3 = m3.deltaX * 1;
        d3.value + M3 > g.value ? d3.value = g.value : d3.value + M3 < 0 ? d3.value = 0 : d3.value += M3;
      }
    }
    return (m3, M3) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(`m-tabs ${m3.size}`)
    }, [
      createBaseVNode("div", li, [
        createBaseVNode("div", {
          ref_key: "wrap",
          ref: o,
          class: normalizeClass(["m-tabs-nav-wrap", { "tabs-center": m3.centered, "before-shadow-active": d3.value > 0, "after-shadow-active": d3.value < g.value }])
        }, [
          createBaseVNode("div", {
            ref_key: "nav",
            ref: u3,
            class: "m-tabs-nav-list",
            onWheel: M3[0] || (M3[0] = (b3) => p.value ? f(b3) : () => false),
            style: normalizeStyle(`transform: translate(${-d3.value}px, 0)`)
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(m3.tabPages, (b3) => (openBlock(), createElementBlock("div", {
              ref_for: true,
              ref_key: "tabs",
              ref: s3,
              class: normalizeClass(["u-tab", { "u-tab-active": m3.activeKey === b3.key, "u-tab-disabled": b3.disabled }]),
              onClick: (_) => b3.disabled ? () => false : y3(b3.key),
              key: b3.key
            }, toDisplayString(b3.tab), 11, si))), 128)),
            createBaseVNode("div", {
              class: "u-tab-bar",
              style: normalizeStyle(`left: ${n.value}px; width: ${c3.value}px;`)
            }, null, 4)
          ], 36)
        ], 2)
      ]),
      createBaseVNode("div", oi, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(m3.tabPages, (b3) => withDirectives((openBlock(), createElementBlock("div", {
          class: "m-tabs-content",
          key: b3.key
        }, [
          renderSlot(m3.$slots, b3.key, {}, () => [
            createTextVNode(toDisplayString(b3.content), 1)
          ], true)
        ])), [
          [vShow, m3.activeKey === b3.key]
        ])), 128))
      ])
    ], 2));
  }
});
var Lt2 = W(ni, [["__scopeId", "data-v-353fee15"]]);
Lt2.install = (a3) => {
  a3.component(Lt2.__name, Lt2);
};
var Ut = (a3) => (pushScopeId("data-v-239ed553"), a3 = a3(), popScopeId(), a3);
var ii = { class: "u-tag" };
var ui = Ut(() => createBaseVNode("svg", {
  focusable: "false",
  class: "u-close",
  "data-icon": "close",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })
], -1));
var ri = [
  ui
];
var ci = { class: "u-tag" };
var di = ["onClick"];
var fi = Ut(() => createBaseVNode("svg", {
  focusable: "false",
  class: "u-close",
  "data-icon": "close",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })
], -1));
var pi = [
  fi
];
var vi = Ut(() => createBaseVNode("svg", {
  focusable: "false",
  class: "u-plus",
  "data-icon": "plus",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" }),
  createBaseVNode("path", { d: "M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" })
], -1));
var hi = [
  vi
];
var mi = defineComponent({
  __name: "Tag",
  props: {
    closable: { type: Boolean, default: false },
    color: { default: "" },
    icon: { default: "" },
    size: { default: "middle" },
    dynamic: { type: Boolean, default: false },
    value: { default: () => [] },
    spaceWidth: { default: "auto" },
    spaceAlign: { default: "start" },
    spaceDirection: { default: "horizontal" },
    spaceSize: { default: "small" }
  },
  emits: ["update:value", "close", "dynamicClose"],
  setup(a3, { emit: e3 }) {
    const t3 = a3, s3 = computed(() => {
      if (t3.dynamic && t3.value.length) {
        if (typeof t3.value[0] == "string")
          return true;
        if (typeof t3.value[0] == "object")
          return false;
      }
      return null;
    }), n = computed(() => t3.dynamic && t3.value.length ? s3.value ? t3.value.map((_) => ({
      label: _,
      closable: true
    })) : t3.value.map((_) => ({
      closable: true,
      ..._
    })) : []), c3 = ref(), o = ref(false), u3 = ref(""), p = ["success", "processing", "error", "warning", "default", "pink", "red", "yellow", "orange", "cyan", "green", "blue", "purple", "geekblue", "magenta", "volcano", "gold", "lime"], g = ref(false), d3 = ref(), v = ref(1), $ = ref(), k3 = ref(Array(t3.value.length).fill(1));
    onMounted(() => {
      if (t3.dynamic)
        for (let _ = 0; _ < t3.value.length; _++)
          k3.value[_] = $.value[_].offsetWidth;
      else
        v.value = d3.value.offsetWidth;
    });
    function y3(_) {
      g.value = true, e3("close", _);
    }
    function f(_, w3) {
      const z3 = t3.value.filter((D3, L3) => L3 !== w3);
      e3("update:value", z3), e3("dynamicClose", _, w3);
    }
    function m3() {
      o.value = true, nextTick(() => {
        c3.value.focus();
      });
    }
    function M3() {
      s3.value ? e3("update:value", [...t3.value, u3.value]) : e3("update:value", [
        ...t3.value,
        {
          label: u3.value
        }
      ]), o.value = false, c3.value = "";
    }
    function b3(_) {
      _.key === "Enter" && c3.value.blur();
    }
    return (_, w3) => _.dynamic ? (openBlock(), createBlock(unref(je2), {
      key: 1,
      width: _.spaceWidth,
      align: _.spaceAlign,
      direction: _.spaceDirection,
      size: _.spaceSize
    }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList(n.value, (z3, D3) => (openBlock(), createElementBlock("div", {
          class: normalizeClass(["m-tag", [`tag-${z3.size || _.size}`, (z3.color || _.color) && p.includes(z3.color || _.color) ? "tag-" + (z3.color || _.color) : "", { "has-color": (z3.color || _.color) && !p.includes(z3.color || _.color) }]]),
          style: normalizeStyle(`background-color: ${(z3.color || _.color) && !p.includes(z3.color || _.color) ? z3.color || _.color : ""};`),
          key: D3
        }, [
          k3.value[D3] ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: "m-icon",
            ref_for: true,
            ref_key: "tagsIconRef",
            ref: $
          }, [
            renderSlot(_.$slots, "icon", { index: D3 }, () => [
              createTextVNode(toDisplayString(z3.icon), 1)
            ], true)
          ], 512)) : createCommentVNode("", true),
          createBaseVNode("span", ci, [
            renderSlot(_.$slots, "default", {
              label: z3.label,
              index: D3
            }, () => [
              createTextVNode(toDisplayString(z3.label), 1)
            ], true)
          ]),
          z3.closable || _.closable ? (openBlock(), createElementBlock("span", {
            key: 1,
            class: "m-close",
            onClick: (L3) => f(z3, D3)
          }, pi, 8, di)) : createCommentVNode("", true)
        ], 6))), 128)),
        o.value ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["m-tag", [`tag-${_.size}`, { "m-plus": _.dynamic }]]),
          onClick: m3
        }, hi, 2)),
        withDirectives(createBaseVNode("input", {
          ref_key: "inputRef",
          ref: c3,
          class: normalizeClass(["u-input", `input-${_.size}`]),
          type: "text",
          "onUpdate:modelValue": w3[0] || (w3[0] = (z3) => u3.value = z3),
          onBlur: w3[1] || (w3[1] = (z3) => o.value = false),
          onChange: M3,
          onKeydown: b3
        }, null, 34), [
          [vShow, o.value],
          [vModelText, u3.value]
        ])
      ]),
      _: 3
    }, 8, ["width", "align", "direction", "size"])) : (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(["m-tag", [`tag-${_.size}`, _.color && p.includes(_.color) ? "tag-" + _.color : "", { "has-color": _.color && !p.includes(_.color), hidden: g.value }]]),
      style: normalizeStyle(`background-color: ${_.color && !p.includes(_.color) ? _.color : ""};`)
    }, [
      v.value ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: "m-icon",
        ref_key: "iconRef",
        ref: d3
      }, [
        renderSlot(_.$slots, "icon", {}, void 0, true)
      ], 512)) : createCommentVNode("", true),
      createBaseVNode("span", ii, [
        renderSlot(_.$slots, "default", {}, void 0, true)
      ]),
      _.closable ? (openBlock(), createElementBlock("span", {
        key: 1,
        class: "m-close",
        onClick: y3
      }, ri)) : createCommentVNode("", true)
    ], 6));
  }
});
var At2 = W(mi, [["__scopeId", "data-v-239ed553"]]);
At2.install = (a3) => {
  a3.component(At2.__name, At2);
};
var _i = (a3) => (pushScopeId("data-v-94787871"), a3 = a3(), popScopeId(), a3);
var gi = ["data-count"];
var yi = ["value", "maxlength", "disabled"];
var wi = _i(() => createBaseVNode("svg", {
  focusable: "false",
  class: "u-clear",
  "data-icon": "close-circle",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" })
], -1));
var ki = [
  wi
];
var bi = {
  inheritAttrs: false
};
var $i = defineComponent({
  ...bi,
  __name: "Textarea",
  props: {
    width: { default: "100%" },
    allowClear: { type: Boolean, default: false },
    autoSize: { type: [Boolean, Object], default: false },
    disabled: { type: Boolean, default: false },
    maxlength: { default: void 0 },
    showCount: { type: Boolean, default: false },
    value: { default: "" },
    valueModifiers: { default: () => ({}) }
  },
  emits: ["update:value", "change", "enter"],
  setup(a3, { emit: e3 }) {
    const t3 = a3, s3 = computed(() => typeof t3.width == "number" ? t3.width + "px" : t3.width), n = computed(() => {
      if (typeof t3.autoSize == "object") {
        const k3 = {
          resize: "none"
        };
        return "minRows" in t3.autoSize && (k3["min-height"] = t3.autoSize.minRows * 22 + 10 + "px"), "maxRows" in t3.autoSize && (k3["max-height"] = t3.autoSize.maxRows * 22 + 10 + "px"), k3;
      }
      if (typeof t3.autoSize == "boolean")
        return t3.autoSize ? {
          "max-height": "9000000000000000px",
          resize: "none"
        } : {};
    }), c3 = computed(() => t3.maxlength ? t3.value.length + " / " + t3.maxlength : t3.value.length);
    watch(
      () => t3.value,
      () => {
        JSON.stringify(n.value) !== "{}" && (u3.value = 32, nextTick(() => {
          p();
        }));
      }
    );
    const o = ref(), u3 = ref(32);
    onMounted(() => {
      p();
    });
    function p() {
      u3.value = o.value.scrollHeight + 2;
    }
    function g(k3) {
      "lazy" in t3.valueModifiers || (e3("update:value", k3.target.value), e3("change", k3));
    }
    function d3(k3) {
      "lazy" in t3.valueModifiers && (e3("update:value", k3.target.value), e3("change", k3));
    }
    function v(k3) {
      k3.key === "Enter" && e3("enter", k3);
    }
    function $() {
      e3("update:value", ""), o.value.focus();
    }
    return (k3, y3) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["m-textarea", { "show-count": k3.showCount }]),
      style: normalizeStyle(`width: ${s3.value};`),
      "data-count": c3.value
    }, [
      createBaseVNode("textarea", mergeProps({
        ref_key: "textarea",
        ref: o,
        type: "hidden",
        class: ["u-textarea", { disabled: k3.disabled }],
        style: [`height: ${k3.autoSize ? u3.value : ""}px`, n.value],
        value: k3.value,
        maxlength: k3.maxlength,
        disabled: k3.disabled,
        onInput: g,
        onChange: d3,
        onKeydown: v
      }, k3.$attrs), null, 16, yi),
      !k3.disabled && k3.allowClear && k3.value ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: "m-clear",
        onClick: $
      }, ki)) : createCommentVNode("", true)
    ], 14, gi));
  }
});
var Dt = W($i, [["__scopeId", "data-v-94787871"]]);
Dt.install = (a3) => {
  a3.component(Dt.__name, Dt);
};
var Mi = ["title", "href", "target", "onClick"];
var Ci = ["title", "href", "target", "onClick"];
var zi = defineComponent({
  __name: "TextScroll",
  props: {
    text: { default: () => [] },
    width: { default: "100%" },
    height: { default: 60 },
    backgroundColor: { default: "#FFF" },
    amount: { default: 4 },
    gap: { default: 20 },
    vertical: { type: Boolean, default: false },
    interval: { default: 3e3 }
  },
  emits: ["click"],
  setup(a3, { emit: e3 }) {
    const t3 = a3, s3 = ref(0), n = ref(0), c3 = ref(), o = ref(60), u3 = ref([...t3.text]), p = ref(), g = ref(0), d3 = computed(() => o.value === 60 ? 1 : 60 / o.value);
    function v() {
      const D3 = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      var L3 = null;
      function H3(I3) {
        if (!L3)
          n.value > 10 && (L3 = I3), n.value = D3(H3);
        else {
          o.value = Math.floor(1e3 / (I3 - L3)), console.log("fps", o.value), g.value = $(), m3();
          return;
        }
      }
      n.value = D3(H3);
    }
    function $() {
      return parseFloat((p.value.offsetWidth / t3.amount).toFixed(2));
    }
    function k3() {
      s3.value >= g.value ? (u3.value.push(u3.value.shift()), s3.value = 0) : s3.value += d3.value, c3.value = fe(k3);
    }
    const y3 = computed(() => typeof t3.width == "number" ? t3.width + "px" : t3.width), f = computed(() => t3.text.length);
    onMounted(() => {
      t3.vertical ? m3() : v();
    });
    function m3() {
      t3.vertical ? f.value > 1 && z3() : u3.value.length > t3.amount && (c3.value = fe(k3));
    }
    function M3() {
      t3.vertical ? f.value > 1 && _e(w3) : Pt(c3.value);
    }
    function b3(D3) {
      e3("click", D3);
    }
    const _ = ref(0);
    var w3 = null;
    function z3() {
      w3 = pe(() => {
        _.value === f.value - 1 ? _.value = 0 : _.value++, z3();
      }, t3.interval);
    }
    return (D3, L3) => D3.vertical ? (openBlock(), createElementBlock("div", {
      key: 1,
      class: "m-slider-vertical",
      onMouseenter: M3,
      onMouseleave: m3,
      style: normalizeStyle(`height: ${D3.height}px; width: ${y3.value}; background: ${D3.backgroundColor};`)
    }, [
      createVNode(TransitionGroup, { name: "slide" }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(u3.value, (H3, I3) => withDirectives((openBlock(), createElementBlock("div", {
            class: "m-slider",
            style: normalizeStyle(`width: calc(${y3.value} - ${2 * D3.gap}px); height: ${D3.height}px;`),
            key: I3
          }, [
            createBaseVNode("a", {
              class: "u-slider",
              title: H3.title,
              href: H3.link ? H3.link : "javascript:;",
              target: H3.link ? "_blank" : "_self",
              onClick: (P) => b3(H3.title)
            }, toDisplayString(H3.title || "--"), 9, Ci)
          ], 4)), [
            [vShow, _.value === I3]
          ])), 128))
        ]),
        _: 1
      })
    ], 36)) : (openBlock(), createElementBlock("div", {
      key: 0,
      class: "m-slider-horizon",
      onMouseenter: M3,
      onMouseleave: m3,
      ref_key: "horizonRef",
      ref: p,
      style: normalizeStyle(`height: ${D3.height}px; width: ${y3.value}; background: ${D3.backgroundColor};`)
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(u3.value, (H3, I3) => (openBlock(), createElementBlock("a", {
        style: normalizeStyle(`will-change: transform; transform: translateX(${-s3.value}px); width: ${g.value - D3.gap}px; margin-left: ${D3.gap}px;`),
        class: "u-slide-title",
        key: I3,
        title: H3.title,
        href: H3.link ? H3.link : "javascript:;",
        target: H3.link ? "_blank" : "_self",
        onClick: (P) => b3(H3.title)
      }, toDisplayString(H3.title || "--"), 13, Mi))), 128))
    ], 36));
  }
});
var Ht2 = W(zi, [["__scopeId", "data-v-b92925b9"]]);
Ht2.install = (a3) => {
  a3.component(Ht2.__name, Ht2);
};
var Bi = { class: "m-timeline" };
var Si = defineComponent({
  __name: "Timeline",
  props: {
    timelineData: { default: () => [] },
    width: { default: 360 },
    lineStyle: { default: "solid" }
  },
  setup(a3) {
    const e3 = a3, t3 = ref(), s3 = ref([]), n = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width);
    function c3() {
      const o = e3.timelineData.length;
      for (let u3 = 0; u3 < o; u3++)
        s3.value[u3] = getComputedStyle(t3.value[u3].firstElementChild || t3.value[u3], null).getPropertyValue("line-height");
    }
    return watchEffect(() => {
      c3();
    }, { flush: "post" }), (o, u3) => (openBlock(), createElementBlock("div", {
      class: "m-timeline-area",
      style: normalizeStyle(`width: ${n.value};`)
    }, [
      createBaseVNode("div", Bi, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(o.timelineData, (p, g) => (openBlock(), createElementBlock("div", {
          class: normalizeClass(["m-timeline-item", { last: g === o.timelineData.length - 1 }]),
          key: g
        }, [
          createBaseVNode("span", {
            class: "u-tail",
            style: normalizeStyle(`border-left-style: ${o.lineStyle};`)
          }, null, 4),
          createBaseVNode("div", {
            class: "m-dot",
            style: normalizeStyle(`height: ${s3.value[g]}`)
          }, [
            renderSlot(o.$slots, "dot", { index: g }, () => [
              p.color === "red" ? (openBlock(), createElementBlock("span", {
                key: 0,
                class: "u-dot",
                style: normalizeStyle({
                  borderColor: "#ff4d4f"
                  /* red */
                })
              }, null, 4)) : p.color === "gray" ? (openBlock(), createElementBlock("span", {
                key: 1,
                class: "u-dot",
                style: normalizeStyle({
                  borderColor: "#00000040"
                  /* gray */
                })
              }, null, 4)) : p.color === "green" ? (openBlock(), createElementBlock("span", {
                key: 2,
                class: "u-dot",
                style: normalizeStyle({
                  borderColor: "#52c41a"
                  /* green */
                })
              }, null, 4)) : p.color === "blue" ? (openBlock(), createElementBlock("span", {
                key: 3,
                class: "u-dot",
                style: normalizeStyle({
                  borderColor: "#1677ff"
                  /* blue */
                })
              }, null, 4)) : (openBlock(), createElementBlock("span", {
                key: 4,
                class: "u-dot",
                style: normalizeStyle({
                  borderColor: p.color || "#1677ff"
                  /* blue */
                })
              }, null, 4))
            ], true)
          ], 4),
          createBaseVNode("div", {
            ref_for: true,
            ref_key: "desc",
            ref: t3,
            class: "u-desc"
          }, [
            renderSlot(o.$slots, "desc", { index: g }, () => [
              createTextVNode(toDisplayString(p.desc || "--"), 1)
            ], true)
          ], 512)
        ], 2))), 128))
      ])
    ], 4));
  }
});
var Et = W(Si, [["__scopeId", "data-v-f55b0664"]]);
Et.install = (a3) => {
  a3.component(Et.__name, Et);
};
var Ae2 = (a3) => (pushScopeId("data-v-a4dbe749"), a3 = a3(), popScopeId(), a3);
var Fi = { class: "m-upload-list" };
var Li = { class: "m-upload" };
var Ai = ["onDrop", "onClick"];
var Di = ["accept", "multiple", "onChange"];
var Hi = Ae2(() => createBaseVNode("svg", {
  focusable: "false",
  class: "u-plus",
  "data-icon": "plus",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("defs"),
  createBaseVNode("path", { d: "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" }),
  createBaseVNode("path", { d: "M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" })
], -1));
var Ei = { class: "u-tip" };
var Ii = { class: "m-file-uploading" };
var Ri = {
  key: 0,
  class: "m-file-preview"
};
var Ti = ["src", "alt"];
var Vi = {
  key: 1,
  class: "u-file",
  focusable: "false",
  "data-icon": "file-pdf",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var Wi = Ae2(() => createBaseVNode("path", { d: "M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7-3.8-21.3-19.5-29.6-32.9-30.2-15.8-.7-29.9 8.3-33.4 21.4-6.6 24-.7 56.8 10.1 98.6-13.6 32.4-35.3 79.5-51.2 107.5-29.6 15.3-69.3 38.9-75.2 68.7-1.2 5.5.2 12.5 3.5 18.8 3.7 7 9.6 12.4 16.5 15 3 1.1 6.6 2 10.8 2 17.6 0 46.1-14.2 84.1-79.4 5.8-1.9 11.8-3.9 17.6-5.9 27.2-9.2 55.4-18.8 80.9-23.1 28.2 15.1 60.3 24.8 82.1 24.8 21.6 0 30.1-12.8 33.3-20.5 5.6-13.5 2.9-30.5-6.2-39.6-13.2-13-45.3-16.4-95.3-10.2-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7 6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4-4.9-19.9-5.6-48.1-2.7-51.4.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2-21.6 4.9-41.3 13-58.9 20.2-4.2 1.7-8.3 3.4-12.3 5 13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6 40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z" }, null, -1));
var ji = [
  Wi
];
var Pi = {
  key: 2,
  class: "u-file",
  focusable: "false",
  "data-icon": "file",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var Oi = Ae2(() => createBaseVNode("path", {
  d: "M534 352V136H232v752h560V394H576a42 42 0 01-42-42z",
  fill: "#e6f7ff"
}, null, -1));
var qi = Ae2(() => createBaseVNode("path", { d: "M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM602 137.8L790.2 326H602V137.8zM792 888H232V136h302v216a42 42 0 0042 42h216v494z" }, null, -1));
var Ni = [
  Oi,
  qi
];
var Ui = { class: "m-file-mask" };
var Yi = ["href"];
var Ki = Ae2(() => createBaseVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "eye",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" })
], -1));
var Gi = [
  Ki
];
var Ji = ["onClick"];
var Xi = Ae2(() => createBaseVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "delete",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" })
], -1));
var Zi = [
  Xi
];
var xi = defineComponent({
  __name: "Upload",
  props: {
    accept: { default: "*" },
    multiple: { type: Boolean, default: false },
    maxCount: { default: 1 },
    tip: { default: "Upload" },
    uploadingTip: { default: "Uploading" },
    fit: { default: "contain" },
    errorInfo: { default: "" },
    beforeUpload: { type: Function, default: () => true },
    uploadMode: { default: "base64" },
    customRequest: { type: Function, default: () => {
    } },
    disabled: { type: Boolean, default: false },
    fileList: { default: () => [] }
  },
  emits: ["update:fileList", "change", "remove"],
  setup(a3, { emit: e3 }) {
    const t3 = a3, s3 = ref([]), n = ref(1), c3 = ref(Array(t3.maxCount).fill(false)), o = ref();
    watchEffect(() => {
      u3();
    });
    function u3() {
      s3.value = [...t3.fileList], s3.value.length > t3.maxCount && s3.value.splice(t3.maxCount), t3.disabled ? n.value = s3.value.length : s3.value.length < t3.maxCount ? n.value = t3.fileList.length + 1 : n.value = t3.maxCount;
    }
    function p(_) {
      const w3 = /\.(jpg|jpeg|png|gif)$/i, z3 = /^data:image/;
      return w3.test(_) || z3.test(_);
    }
    function g(_) {
      const w3 = /\.pdf$/i, z3 = /^data:application\/pdf/;
      return w3.test(_) || z3.test(_);
    }
    function d3(_, w3) {
      var D3;
      const z3 = (D3 = _.dataTransfer) == null ? void 0 : D3.files;
      if (z3 != null && z3.length) {
        const L3 = z3.length;
        for (let H3 = 0; H3 < L3 && w3 + H3 <= t3.maxCount; H3++)
          k3(z3[H3], w3 + H3);
        o.value[w3].value = "";
      }
    }
    function v(_) {
      o.value[_].click();
    }
    function $(_, w3) {
      const z3 = _.target.files;
      if (z3 != null && z3.length) {
        const D3 = z3.length;
        for (let L3 = 0; L3 < D3 && w3 + L3 < t3.maxCount; L3++)
          k3(z3[L3], w3 + L3);
        o.value[w3].value = "";
      }
    }
    const k3 = function(_, w3) {
      t3.beforeUpload(_) ? (t3.maxCount > n.value && n.value++, t3.uploadMode === "base64" && (c3.value[w3] = true, y3(_, w3)), t3.uploadMode === "custom" && (c3.value[w3] = true, f(_, w3))) : nextTick(() => {
        b3(t3.errorInfo);
      });
    };
    function y3(_, w3) {
      var z3 = new FileReader();
      z3.readAsDataURL(_), z3.onloadstart = function(D3) {
      }, z3.onabort = function(D3) {
      }, z3.onerror = function(D3) {
      }, z3.onprogress = function(D3) {
        D3.loaded === D3.total && (c3.value[w3] = false);
      }, z3.onload = function(D3) {
        var L3;
        s3.value.push({
          name: _.name,
          url: (L3 = D3.target) == null ? void 0 : L3.result
        }), e3("update:fileList", s3.value), e3("change", s3.value);
      }, z3.onloadend = function(D3) {
      };
    }
    function f(_, w3) {
      t3.customRequest(_).then((z3) => {
        s3.value.push(z3), e3("update:fileList", s3.value), e3("change", s3.value);
      }).catch((z3) => {
        t3.maxCount > 1 && (n.value = s3.value.length + 1), b3(z3);
      }).finally(() => {
        c3.value[w3] = false;
      });
    }
    function m3(_) {
      s3.value.length < t3.maxCount && n.value--;
      const w3 = s3.value.splice(_, 1);
      e3("remove", w3), e3("update:fileList", s3.value), e3("change", s3.value);
    }
    const M3 = ref();
    function b3(_) {
      M3.value.error(_);
    }
    return (_, w3) => (openBlock(), createElementBlock("div", Fi, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(n.value, (z3) => (openBlock(), createElementBlock("div", {
        class: "m-upload-item",
        key: z3
      }, [
        createBaseVNode("div", Li, [
          withDirectives(createBaseVNode("div", {
            class: normalizeClass(["m-upload-wrap", { "upload-disabled": _.disabled }]),
            onDragenter: w3[1] || (w3[1] = withModifiers(() => {
            }, ["stop", "prevent"])),
            onDragover: w3[2] || (w3[2] = withModifiers(() => {
            }, ["stop", "prevent"])),
            onDrop: withModifiers((D3) => _.disabled ? () => false : d3(D3, z3 - 1), ["stop", "prevent"]),
            onClick: (D3) => _.disabled ? () => false : v(z3 - 1)
          }, [
            createBaseVNode("input", {
              ref_for: true,
              ref_key: "uploadInput",
              ref: o,
              type: "file",
              onClick: w3[0] || (w3[0] = withModifiers(() => {
              }, ["stop"])),
              accept: _.accept,
              multiple: _.multiple,
              onChange: (D3) => $(D3, z3 - 1),
              style: { display: "none" }
            }, null, 40, Di),
            createBaseVNode("div", null, [
              Hi,
              createBaseVNode("p", Ei, [
                renderSlot(_.$slots, "default", {}, () => [
                  createTextVNode(toDisplayString(_.tip), 1)
                ], true)
              ])
            ])
          ], 42, Ai), [
            [vShow, !c3.value[z3 - 1] && !s3.value[z3 - 1]]
          ]),
          withDirectives(createBaseVNode("div", Ii, [
            createVNode(unref(ue), {
              class: "u-spin",
              tip: _.uploadingTip,
              size: "small",
              indicator: "dynamic-circle"
            }, null, 8, ["tip"])
          ], 512), [
            [vShow, c3.value[z3 - 1]]
          ]),
          s3.value[z3 - 1] ? (openBlock(), createElementBlock("div", Ri, [
            p(s3.value[z3 - 1].url) ? (openBlock(), createElementBlock("img", {
              key: 0,
              class: "u-image",
              style: normalizeStyle(`object-fit: ${_.fit};`),
              src: s3.value[z3 - 1].url,
              alt: s3.value[z3 - 1].name
            }, null, 12, Ti)) : g(s3.value[z3 - 1].url) ? (openBlock(), createElementBlock("svg", Vi, ji)) : (openBlock(), createElementBlock("svg", Pi, Ni)),
            createBaseVNode("div", Ui, [
              createBaseVNode("a", {
                class: "m-icon",
                title: "预览",
                href: s3.value[z3 - 1].url,
                target: "_blank"
              }, Gi, 8, Yi),
              withDirectives(createBaseVNode("a", {
                class: "m-icon",
                title: "删除",
                onClick: withModifiers((D3) => m3(z3 - 1), ["prevent", "stop"])
              }, Zi, 8, Ji), [
                [vShow, !_.disabled]
              ])
            ])
          ])) : createCommentVNode("", true)
        ])
      ]))), 128)),
      createVNode(unref(Ve), {
        ref_key: "message",
        ref: M3,
        duration: 3e3,
        top: 30
      }, null, 512)
    ]));
  }
});
var It2 = W(xi, [["__scopeId", "data-v-a4dbe749"]]);
It2.install = (a3) => {
  a3.component(It2.__name, It2);
};
var Qi = (a3) => (pushScopeId("data-v-d01fba1c"), a3 = a3(), popScopeId(), a3);
var e6 = ["src", "poster", "width", "height", "autoplay", "controls", "loop", "muted", "preload", "onClickOnce"];
var t6 = Qi(() => createBaseVNode("svg", {
  class: "u-svg",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 34 34"
}, [
  createBaseVNode("path", { d: `M28.26,11.961L11.035,0.813C7.464-1.498,3,1.391,3,6.013v21.974c0,4.622,4.464,7.511,8.035,5.2L28.26,22.039
          C31.913,19.675,31.913,14.325,28.26,11.961z` })
], -1));
var a6 = [
  t6
];
var l6 = defineComponent({
  __name: "Video",
  props: {
    src: { default: "" },
    poster: { default: "" },
    second: { default: 0.5 },
    width: { default: 800 },
    height: { default: 450 },
    autoplay: { type: Boolean, default: false },
    controls: { type: Boolean, default: true },
    loop: { type: Boolean, default: false },
    muted: { type: Boolean, default: false },
    preload: { default: "auto" },
    showPlay: { type: Boolean, default: true },
    fit: { default: "contain" }
  },
  setup(a3) {
    const e3 = a3, t3 = ref(e3.poster), s3 = ref(true), n = ref(false), c3 = ref();
    function o() {
      c3.value.currentTime = e3.second;
      const d3 = document.createElement("canvas"), v = d3.getContext("2d");
      d3.width = c3.value.videoWidth, d3.height = c3.value.videoHeight, v == null || v.drawImage(c3.value, 0, 0, d3.width, d3.height), t3.value = d3.toDataURL("image/png");
    }
    function u3() {
      var d3, v;
      s3.value && (c3.value.currentTime = 0, s3.value = false), e3.autoplay ? (d3 = c3.value) == null || d3.pause() : (n.value = true, (v = c3.value) == null || v.play());
    }
    function p() {
      n.value = false;
    }
    function g() {
      n.value = true;
    }
    return onMounted(() => {
      e3.autoplay && (n.value = true, s3.value = false);
    }), (d3, v) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["m-video", { "u-video-hover": !n.value }]),
      style: normalizeStyle(`width: ${d3.width}px; height: ${d3.height}px;`)
    }, [
      createBaseVNode("video", mergeProps({
        ref_key: "veo",
        ref: c3,
        style: `object-fit: ${d3.fit};`,
        src: d3.src,
        poster: t3.value,
        width: d3.width,
        height: d3.height,
        autoplay: d3.autoplay,
        controls: !s3.value && d3.controls,
        loop: d3.loop,
        muted: d3.autoplay || d3.muted,
        preload: d3.preload,
        crossorigin: "anonymous",
        onLoadeddata: v[0] || (v[0] = ($) => d3.poster ? () => false : o()),
        onPause: v[1] || (v[1] = ($) => d3.showPlay ? p() : () => false),
        onPlaying: v[2] || (v[2] = ($) => d3.showPlay ? g() : () => false),
        onClickOnce: withModifiers(u3, ["prevent"])
      }, d3.$attrs), " 您的浏览器不支持video标签。 ", 16, e6),
      withDirectives(createBaseVNode("span", {
        class: normalizeClass(["m-icon-play", { hidden: n.value }])
      }, a6, 2), [
        [vShow, s3.value || d3.showPlay]
      ])
    ], 6));
  }
});
var Rt2 = W(l6, [["__scopeId", "data-v-d01fba1c"]]);
Rt2.install = (a3) => {
  a3.component(Rt2.__name, Rt2);
};
var s6 = ["src", "alt", "onLoad"];
var o6 = ["src", "alt", "onLoad"];
var n6 = defineComponent({
  __name: "Waterfall",
  props: {
    images: { default: () => [] },
    columnCount: { default: 3 },
    columnGap: { default: 20 },
    width: { default: "100%" },
    backgroundColor: { default: "#F2F4F8" },
    mode: { default: "JS" }
  },
  setup(a3) {
    const e3 = a3, t3 = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), s3 = ref([]), n = ref([]), c3 = ref(), o = ref(), u3 = computed(() => Math.max(...n.value) + e3.columnGap), p = computed(() => e3.images.length), g = ref(Array(p.value).fill(false));
    watch(
      () => e3.images,
      (y3) => {
        y3.length && e3.mode === "JS" && k3();
      }
    ), onMounted(() => {
      e3.images.length && e3.mode === "JS" && k3();
    });
    function d3(y3) {
      g.value[y3] = true;
    }
    function v(y3, f) {
      if (y3 < e3.columnCount)
        return n.value[y3] = e3.columnGap + f, {
          top: e3.columnGap,
          left: (o.value + e3.columnGap) * y3 + e3.columnGap
        };
      {
        const M3 = Math.min(...n.value);
        var m3 = 0;
        for (let b3 = 0; b3 < n.value.length; b3++)
          if (n.value[b3] === M3) {
            m3 = b3;
            break;
          }
        return n.value[m3] = M3 + e3.columnGap + f, {
          top: M3 + e3.columnGap,
          left: (o.value + e3.columnGap) * m3 + e3.columnGap
        };
      }
    }
    function $(y3, f) {
      return new Promise((m3) => {
        const M3 = new Image();
        M3.src = y3, M3.onload = function() {
          var b3 = M3.height / (M3.width / o.value);
          s3.value[f] = {
            // 存储图片宽高和位置信息
            width: o.value,
            height: b3,
            ...v(f, b3)
          }, m3("load");
        };
      });
    }
    async function k3() {
      o.value = (c3.value.offsetWidth - (e3.columnCount + 1) * e3.columnGap) / e3.columnCount;
      const y3 = e3.images.length;
      s3.value.splice(y3);
      for (let f = 0; f < y3; f++)
        await $(e3.images[f].src, f);
    }
    return (y3, f) => (openBlock(), createElementBlock(Fragment, null, [
      y3.mode === "JS" ? (openBlock(), createElementBlock("div", mergeProps({ key: 0 }, y3.$attrs, {
        class: "m-waterfall-js",
        ref_key: "waterfall",
        ref: c3,
        style: `background-color: ${y3.backgroundColor}; width: ${t3.value}; height: ${u3.value}px;`
      }), [
        (openBlock(true), createElementBlock(Fragment, null, renderList(s3.value, (m3, M3) => (openBlock(), createBlock(unref(ue), {
          class: "m-img",
          style: normalizeStyle(`width: ${m3.width}px; height: ${m3.height}px; top: ${m3 && m3.top}px; left: ${m3 && m3.left}px;`),
          spinning: !g.value[M3],
          size: "small",
          indicator: "dynamic-circle",
          key: M3
        }, {
          default: withCtx(() => [
            createBaseVNode("img", {
              class: "u-img",
              src: y3.images[M3].src,
              alt: y3.images[M3].title,
              onLoad: (b3) => d3(M3)
            }, null, 40, s6)
          ]),
          _: 2
        }, 1032, ["style", "spinning"]))), 128))
      ], 16)) : createCommentVNode("", true),
      y3.mode === "CSS" ? (openBlock(), createElementBlock("div", mergeProps({ key: 1 }, y3.$attrs, {
        class: "m-waterfall-css",
        style: `background: ${y3.backgroundColor}; width: ${t3.value}; padding: ${y3.columnGap}px; column-count: ${y3.columnCount}; column-gap: ${y3.columnGap}px;`
      }), [
        (openBlock(true), createElementBlock(Fragment, null, renderList(y3.images, (m3, M3) => (openBlock(), createBlock(unref(ue), {
          style: normalizeStyle(`margin-bottom: ${y3.columnGap}px;`),
          spinning: !g.value[M3],
          size: "small",
          indicator: "dynamic-circle",
          key: M3
        }, {
          default: withCtx(() => [
            createBaseVNode("img", {
              class: "u-img",
              src: m3.src,
              alt: m3.title,
              onLoad: (b3) => d3(M3)
            }, null, 40, o6)
          ]),
          _: 2
        }, 1032, ["style", "spinning"]))), 128))
      ], 16)) : createCommentVNode("", true)
    ], 64));
  }
});
var Tt2 = W(n6, [["__scopeId", "data-v-e4db009c"]]);
Tt2.install = (a3) => {
  a3.component(Tt2.__name, Tt2);
};
var i6 = [
  Ke,
  Ge,
  Je2,
  Xe2,
  Ze2,
  he,
  xe,
  Qe,
  et2,
  tt2,
  at,
  lt,
  st2,
  ot2,
  nt,
  it,
  ut,
  rt2,
  ct,
  dt,
  Se2,
  ft2,
  pt,
  vt2,
  Ve,
  ht,
  mt,
  We2,
  _t,
  gt2,
  yt2,
  wt,
  kt2,
  bt2,
  $t,
  Me,
  Mt,
  je2,
  ue,
  Ct2,
  zt,
  Bt2,
  St,
  Ft,
  Lt2,
  At2,
  Dt,
  Ht2,
  Et,
  Te2,
  It2,
  Rt2,
  Tt2
];
var u6 = (a3) => {
  i6.forEach((e3) => a3.component(e3.__name, e3));
};
var k6 = {
  install: u6
};
export {
  Ke as Alert,
  Ge as Avatar,
  Je2 as BackTop,
  Xe2 as Badge,
  Ze2 as Breadcrumb,
  he as Button,
  xe as Card,
  Qe as Carousel,
  et2 as Cascader,
  tt2 as Checkbox,
  at as Col,
  lt as Collapse,
  st2 as Countdown,
  ot2 as DatePicker,
  nt as Descriptions,
  it as DescriptionsItem,
  ut as Dialog,
  rt2 as Divider,
  ct as Drawer,
  dt as Ellipsis,
  Se2 as Empty,
  ft2 as Image,
  pt as Input,
  vt2 as InputNumber,
  Ve as Message,
  ht as Modal,
  mt as Notification,
  We2 as Pagination,
  _t as Popconfirm,
  gt2 as Progress,
  yt2 as QRCode,
  wt as Radio,
  kt2 as Rate,
  bt2 as Result,
  $t as Row,
  Me as Select,
  Mt as Slider,
  je2 as Space,
  ue as Spin,
  Ct2 as Statistic,
  zt as Steps,
  Bt2 as Swiper,
  St as Switch,
  Ft as Table,
  Lt2 as Tabs,
  At2 as Tag,
  Ht2 as TextScroll,
  Dt as Textarea,
  Et as Timeline,
  Te2 as Tooltip,
  It2 as Upload,
  Rt2 as Video,
  Tt2 as Waterfall,
  g6 as add,
  Pt as cancelAnimationFrame,
  _e as cancelRaf,
  h6 as dateFormat,
  _6 as debounce,
  k6 as default,
  y6 as downloadFile,
  ua2 as moneyFormat,
  pe as rafTimeout,
  fe as requestAnimationFrame,
  m6 as throttle,
  w6 as toggleDark
};
//# sourceMappingURL=vue-amazing-ui.js.map
