import {
  Fragment,
  Teleport,
  Transition,
  TransitionGroup,
  __commonJS,
  __toESM,
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
  renderList,
  renderSlot,
  resolveComponent,
  resolveDynamicComponent,
  toDisplayString,
  toRef,
  unref,
  useSlots,
  vModelText,
  vShow,
  watch,
  watchEffect,
  withCtx,
  withDirectives,
  withKeys,
  withModifiers
} from "./chunk-LYVKDZC2.js";

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
    exports.getSymbolSize = function getSymbolSize(version) {
      if (!version)
        throw new Error('"version" cannot be null or undefined');
      if (version < 1 || version > 40)
        throw new Error('"version" should be in range from 1 to 40');
      return version * 4 + 17;
    };
    exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
      return CODEWORDS_COUNT[version];
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
      } catch (e2) {
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
        for (let i2 = 0; i2 < length; i2++) {
          this.putBit((num >>> length - i2 - 1 & 1) === 1);
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
    exports.getRowColCoords = function getRowColCoords(version) {
      if (version === 1)
        return [];
      const posCount = Math.floor(version / 7) + 2;
      const size = getSymbolSize(version);
      const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
      const positions = [size - 7];
      for (let i2 = 1; i2 < posCount - 1; i2++) {
        positions[i2] = positions[i2 - 1] - intervals;
      }
      positions.push(6);
      return positions.reverse();
    };
    exports.getPositions = function getPositions(version) {
      const coords = [];
      const pos = exports.getRowColCoords(version);
      const posLength = pos.length;
      for (let i2 = 0; i2 < posLength; i2++) {
        for (let j = 0; j < posLength; j++) {
          if (i2 === 0 && j === 0 || // top-left
          i2 === 0 && j === posLength - 1 || // bottom-left
          i2 === posLength - 1 && j === 0) {
            continue;
          }
          coords.push([pos[i2], pos[j]]);
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
    exports.getPositions = function getPositions(version) {
      const size = getSymbolSize(version);
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
      for (let i2 = 0; i2 < modulesCount; i2++)
        darkCount += data.data[i2];
      const k2 = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
      return k2 * PenaltyScores.N4;
    };
    function getMaskAt(maskPattern, i2, j) {
      switch (maskPattern) {
        case exports.Patterns.PATTERN000:
          return (i2 + j) % 2 === 0;
        case exports.Patterns.PATTERN001:
          return i2 % 2 === 0;
        case exports.Patterns.PATTERN010:
          return j % 3 === 0;
        case exports.Patterns.PATTERN011:
          return (i2 + j) % 3 === 0;
        case exports.Patterns.PATTERN100:
          return (Math.floor(i2 / 2) + Math.floor(j / 3)) % 2 === 0;
        case exports.Patterns.PATTERN101:
          return i2 * j % 2 + i2 * j % 3 === 0;
        case exports.Patterns.PATTERN110:
          return (i2 * j % 2 + i2 * j % 3) % 2 === 0;
        case exports.Patterns.PATTERN111:
          return (i2 * j % 3 + (i2 + j) % 2) % 2 === 0;
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
    exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
    exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
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
      let x2 = 1;
      for (let i2 = 0; i2 < 255; i2++) {
        EXP_TABLE[i2] = x2;
        LOG_TABLE[x2] = i2;
        x2 <<= 1;
        if (x2 & 256) {
          x2 ^= 285;
        }
      }
      for (let i2 = 255; i2 < 512; i2++) {
        EXP_TABLE[i2] = EXP_TABLE[i2 - 255];
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
    exports.mul = function mul(x2, y3) {
      if (x2 === 0 || y3 === 0)
        return 0;
      return EXP_TABLE[LOG_TABLE[x2] + LOG_TABLE[y3]];
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/polynomial.js
var require_polynomial = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/polynomial.js"(exports) {
    var GF = require_galois_field();
    exports.mul = function mul(p1, p2) {
      const coeff = new Uint8Array(p1.length + p2.length - 1);
      for (let i2 = 0; i2 < p1.length; i2++) {
        for (let j = 0; j < p2.length; j++) {
          coeff[i2 + j] ^= GF.mul(p1[i2], p2[j]);
        }
      }
      return coeff;
    };
    exports.mod = function mod(divident, divisor) {
      let result = new Uint8Array(divident);
      while (result.length - divisor.length >= 0) {
        const coeff = result[0];
        for (let i2 = 0; i2 < divisor.length; i2++) {
          result[i2] ^= GF.mul(divisor[i2], coeff);
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
      for (let i2 = 0; i2 < degree; i2++) {
        poly = exports.mul(poly, new Uint8Array([1, GF.exp(i2)]));
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
    exports.isValid = function isValid2(version) {
      return !isNaN(version) && version >= 1 && version <= 40;
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
    exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
      if (!mode.ccBits)
        throw new Error("Invalid mode: " + mode);
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid version: " + version);
      }
      if (version >= 1 && version < 10)
        return mode.ccBits[0];
      else if (version < 27)
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
      } catch (e2) {
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
    function getReservedBitsCount(mode, version) {
      return Mode.getCharCountIndicator(mode, version) + 4;
    }
    function getTotalBitsFromDataArray(segments, version) {
      let totalBits = 0;
      segments.forEach(function(data) {
        const reservedBits = getReservedBitsCount(data.mode, version);
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
    exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid QR Code version");
      }
      if (typeof mode === "undefined")
        mode = Mode.BYTE;
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (mode === Mode.MIXED)
        return dataTotalCodewordsBits;
      const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);
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
    exports.getEncodedBits = function getEncodedBits(version) {
      if (!VersionCheck.isValid(version) || version < 7) {
        throw new Error("Invalid QR Code version");
      }
      let d3 = version << 12;
      while (Utils.getBCHDigit(d3) - G18_BCH >= 0) {
        d3 ^= G18 << Utils.getBCHDigit(d3) - G18_BCH;
      }
      return version << 12 | d3;
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
      let i2, group, value;
      for (i2 = 0; i2 + 3 <= this.data.length; i2 += 3) {
        group = this.data.substr(i2, 3);
        value = parseInt(group, 10);
        bitBuffer.put(value, 10);
      }
      const remainingNum = this.data.length - i2;
      if (remainingNum > 0) {
        group = this.data.substr(i2);
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
      let i2;
      for (i2 = 0; i2 + 2 <= this.data.length; i2 += 2) {
        let value = ALPHA_NUM_CHARS.indexOf(this.data[i2]) * 45;
        value += ALPHA_NUM_CHARS.indexOf(this.data[i2 + 1]);
        bitBuffer.put(value, 11);
      }
      if (this.data.length % 2) {
        bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i2]), 6);
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
      for (let i2 = 0, l = this.data.length; i2 < l; i2++) {
        bitBuffer.put(this.data[i2], 8);
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
      let i2;
      for (i2 = 0; i2 < this.data.length; i2++) {
        let value = Utils.toSJIS(this.data[i2]);
        if (value >= 33088 && value <= 40956) {
          value -= 33088;
        } else if (value >= 57408 && value <= 60351) {
          value -= 49472;
        } else {
          throw new Error(
            "Invalid SJIS character: " + this.data[i2] + "\nMake sure your charset is UTF-8"
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
        var closest, u2, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
        while (!open.empty()) {
          closest = open.pop();
          u2 = closest.value;
          cost_of_s_to_u = closest.cost;
          adjacent_nodes = graph[u2] || {};
          for (v in adjacent_nodes) {
            if (adjacent_nodes.hasOwnProperty(v)) {
              cost_of_e = adjacent_nodes[v];
              cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
              cost_of_s_to_v = costs[v];
              first_visit = typeof costs[v] === "undefined";
              if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                costs[v] = cost_of_s_to_u_plus_cost_of_e;
                open.push(v, cost_of_s_to_u_plus_cost_of_e);
                predecessors[v] = u2;
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
        var u2 = d3;
        var predecessor;
        while (u2) {
          nodes.push(u2);
          predecessor = predecessors[u2];
          u2 = predecessors[u2];
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
          var T2 = dijkstra.PriorityQueue, t2 = {}, key;
          opts = opts || {};
          for (key in T2) {
            if (T2.hasOwnProperty(key)) {
              t2[key] = T2[key];
            }
          }
          t2.queue = [];
          t2.sorter = opts.sorter || T2.default_sorter;
          return t2;
        },
        default_sorter: function(a3, b2) {
          return a3.cost - b2.cost;
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
      return segs.sort(function(s1, s22) {
        return s1.index - s22.index;
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
      for (let i2 = 0; i2 < segs.length; i2++) {
        const seg = segs[i2];
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
    function buildGraph(nodes, version) {
      const table = {};
      const graph = { start: {} };
      let prevNodeIds = ["start"];
      for (let i2 = 0; i2 < nodes.length; i2++) {
        const nodeGroup = nodes[i2];
        const currentNodeIds = [];
        for (let j = 0; j < nodeGroup.length; j++) {
          const node = nodeGroup[j];
          const key = "" + i2 + j;
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
              graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version);
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
    exports.fromString = function fromString(data, version) {
      const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
      const nodes = buildNodes(segs);
      const graph = buildGraph(nodes, version);
      const path = dijkstra.find_path(graph.map, "start", "end");
      const optimizedSegs = [];
      for (let i2 = 1; i2 < path.length - 1; i2++) {
        optimizedSegs.push(graph.table[path[i2]].node);
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
    function setupFinderPattern(matrix, version) {
      const size = matrix.size;
      const pos = FinderPattern.getPositions(version);
      for (let i2 = 0; i2 < pos.length; i2++) {
        const row = pos[i2][0];
        const col = pos[i2][1];
        for (let r = -1; r <= 7; r++) {
          if (row + r <= -1 || size <= row + r)
            continue;
          for (let c2 = -1; c2 <= 7; c2++) {
            if (col + c2 <= -1 || size <= col + c2)
              continue;
            if (r >= 0 && r <= 6 && (c2 === 0 || c2 === 6) || c2 >= 0 && c2 <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c2 >= 2 && c2 <= 4) {
              matrix.set(row + r, col + c2, true, true);
            } else {
              matrix.set(row + r, col + c2, false, true);
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
    function setupAlignmentPattern(matrix, version) {
      const pos = AlignmentPattern.getPositions(version);
      for (let i2 = 0; i2 < pos.length; i2++) {
        const row = pos[i2][0];
        const col = pos[i2][1];
        for (let r = -2; r <= 2; r++) {
          for (let c2 = -2; c2 <= 2; c2++) {
            if (r === -2 || r === 2 || c2 === -2 || c2 === 2 || r === 0 && c2 === 0) {
              matrix.set(row + r, col + c2, true, true);
            } else {
              matrix.set(row + r, col + c2, false, true);
            }
          }
        }
      }
    }
    function setupVersionInfo(matrix, version) {
      const size = matrix.size;
      const bits = Version.getEncodedBits(version);
      let row, col, mod;
      for (let i2 = 0; i2 < 18; i2++) {
        row = Math.floor(i2 / 3);
        col = i2 % 3 + size - 8 - 3;
        mod = (bits >> i2 & 1) === 1;
        matrix.set(row, col, mod, true);
        matrix.set(col, row, mod, true);
      }
    }
    function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
      const size = matrix.size;
      const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
      let i2, mod;
      for (i2 = 0; i2 < 15; i2++) {
        mod = (bits >> i2 & 1) === 1;
        if (i2 < 6) {
          matrix.set(i2, 8, mod, true);
        } else if (i2 < 8) {
          matrix.set(i2 + 1, 8, mod, true);
        } else {
          matrix.set(size - 15 + i2, 8, mod, true);
        }
        if (i2 < 8) {
          matrix.set(8, size - i2 - 1, mod, true);
        } else if (i2 < 9) {
          matrix.set(8, 15 - i2 - 1 + 1, mod, true);
        } else {
          matrix.set(8, 15 - i2 - 1, mod, true);
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
          for (let c2 = 0; c2 < 2; c2++) {
            if (!matrix.isReserved(row, col - c2)) {
              let dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) === 1;
              }
              matrix.set(row, col - c2, dark);
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
    function createData(version, errorCorrectionLevel, segments) {
      const buffer = new BitBuffer();
      segments.forEach(function(data) {
        buffer.put(data.mode.bit, 4);
        buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));
        data.write(buffer);
      });
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 !== 0) {
        buffer.putBit(0);
      }
      const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
      for (let i2 = 0; i2 < remainingByte; i2++) {
        buffer.put(i2 % 2 ? 17 : 236, 8);
      }
      return createCodewords(buffer, version, errorCorrectionLevel);
    }
    function createCodewords(bitBuffer, version, errorCorrectionLevel) {
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewords = totalCodewords - ecTotalCodewords;
      const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);
      const blocksInGroup2 = totalCodewords % ecTotalBlocks;
      const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
      const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
      const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
      const rs = new ReedSolomonEncoder(ecCount);
      let offset = 0;
      const dcData = new Array(ecTotalBlocks);
      const ecData = new Array(ecTotalBlocks);
      let maxDataSize = 0;
      const buffer = new Uint8Array(bitBuffer.buffer);
      for (let b2 = 0; b2 < ecTotalBlocks; b2++) {
        const dataSize = b2 < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
        dcData[b2] = buffer.slice(offset, offset + dataSize);
        ecData[b2] = rs.encode(dcData[b2]);
        offset += dataSize;
        maxDataSize = Math.max(maxDataSize, dataSize);
      }
      const data = new Uint8Array(totalCodewords);
      let index = 0;
      let i2, r;
      for (i2 = 0; i2 < maxDataSize; i2++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          if (i2 < dcData[r].length) {
            data[index++] = dcData[r][i2];
          }
        }
      }
      for (i2 = 0; i2 < ecCount; i2++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          data[index++] = ecData[r][i2];
        }
      }
      return data;
    }
    function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
      let segments;
      if (Array.isArray(data)) {
        segments = Segments.fromArray(data);
      } else if (typeof data === "string") {
        let estimatedVersion = version;
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
      if (!version) {
        version = bestVersion;
      } else if (version < bestVersion) {
        throw new Error(
          "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n"
        );
      }
      const dataBits = createData(version, errorCorrectionLevel, segments);
      const moduleCount = Utils.getSymbolSize(version);
      const modules = new BitMatrix(moduleCount);
      setupFinderPattern(modules, version);
      setupTimingPattern(modules);
      setupAlignmentPattern(modules, version);
      setupFormatInfo(modules, errorCorrectionLevel, 0);
      if (version >= 7) {
        setupVersionInfo(modules, version);
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
        version,
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
      let version;
      let mask;
      if (typeof options !== "undefined") {
        errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
        version = Version.from(options.version);
        mask = MaskPattern.from(options.maskPattern);
        if (options.toSJISFunc) {
          Utils.setToSJISFunction(options.toSJISFunc);
        }
      }
      return createSymbol(data, version, errorCorrectionLevel, mask);
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
        hexCode = Array.prototype.concat.apply([], hexCode.map(function(c2) {
          return [c2, c2];
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
      for (let i2 = 0; i2 < symbolSize; i2++) {
        for (let j = 0; j < symbolSize; j++) {
          let posDst = (i2 * symbolSize + j) * 4;
          let pxColor = opts.color.light;
          if (i2 >= scaledMargin && j >= scaledMargin && i2 < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
            const iSrc = Math.floor((i2 - scaledMargin) / scale);
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
      } catch (e2) {
        throw new Error("You need to specify a canvas element");
      }
    }
    exports.render = function render(qrData, canvas, options) {
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
    function svgCmd(cmd, x2, y3) {
      let str = cmd + x2;
      if (typeof y3 !== "undefined")
        str += " " + y3;
      return str;
    }
    function qrToPath(data, size, margin) {
      let path = "";
      let moveBy = 0;
      let newRow = false;
      let lineLength = 0;
      for (let i2 = 0; i2 < data.length; i2++) {
        const col = Math.floor(i2 % size);
        const row = Math.floor(i2 / size);
        if (!col && !newRow)
          newRow = true;
        if (data[i2]) {
          lineLength++;
          if (!(i2 > 0 && col > 0 && data[i2 - 1])) {
            path += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
            moveBy = 0;
            newRow = false;
          }
          if (!(col + 1 < size && data[i2 + 1])) {
            path += svgCmd("h", lineLength);
            lineLength = 0;
          }
        } else {
          moveBy++;
        }
      }
      return path;
    }
    exports.render = function render(qrData, options, cb) {
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
          } catch (e2) {
            reject(e2);
          }
        });
      }
      try {
        const data = QRCode2.create(text, opts);
        cb(null, renderFunc(data, canvas, opts));
      } catch (e2) {
        cb(e2);
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

// node_modules/.pnpm/@babel+runtime@7.22.3/node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
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

// node_modules/.pnpm/@babel+runtime@7.22.3/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++)
    arr2[i2] = arr[i2];
  return arr2;
}

// node_modules/.pnpm/@babel+runtime@7.22.3/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
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

// node_modules/.pnpm/@babel+runtime@7.22.3/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it2 = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it2) {
    if (Array.isArray(o) || (it2 = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it2)
        o = it2;
      var i2 = 0;
      var F = function F2() {
      };
      return {
        s: F,
        n: function n() {
          if (i2 >= o.length)
            return {
              done: true
            };
          return {
            done: false,
            value: o[i2++]
          };
        },
        e: function e2(_e2) {
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
    e: function e2(_e2) {
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

// node_modules/.pnpm/@babel+runtime@7.22.3/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

// node_modules/.pnpm/@babel+runtime@7.22.3/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}

// node_modules/.pnpm/@babel+runtime@7.22.3/node_modules/@babel/runtime/helpers/esm/inherits.js
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

// node_modules/.pnpm/@babel+runtime@7.22.3/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}

// node_modules/.pnpm/@babel+runtime@7.22.3/node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
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
  } catch (e2) {
    return false;
  }
}

// node_modules/.pnpm/@babel+runtime@7.22.3/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

// node_modules/.pnpm/@babel+runtime@7.22.3/node_modules/@babel/runtime/helpers/esm/createSuper.js
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

// node_modules/.pnpm/@babel+runtime@7.22.3/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// node_modules/.pnpm/@babel+runtime@7.22.3/node_modules/@babel/runtime/helpers/esm/toPrimitive.js
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

// node_modules/.pnpm/@babel+runtime@7.22.3/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

// node_modules/.pnpm/@babel+runtime@7.22.3/node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
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

// node_modules/.pnpm/@babel+runtime@7.22.3/node_modules/@babel/runtime/helpers/esm/defineProperty.js
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
    value: function set2(utcDate, flags, options) {
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
    value: function set2(date, flags) {
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
    value: function set2(date, flags, value) {
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
    value: function set2(date, flags, value) {
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
    value: function set2(date, flags, value, options) {
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
    value: function set2(_date, _flags, value) {
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
    value: function set2(date, _flags, value) {
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
    value: function set2(date, _flags, value) {
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
    value: function set2(date, _flags, value) {
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
    value: function set2(date, _flags, value) {
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
    value: function set2(date, _flags, value) {
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
    value: function set2(date, _flags, value, options) {
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
    value: function set2(date, _flags, value) {
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
    value: function set2(date, _flags, value) {
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
    value: function set2(date, _flags, value) {
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
    value: function set2(date, _flags, value, options) {
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
    value: function set2(date, _flags, value, options) {
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
    value: function set2(date, _flags, value, options) {
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
    value: function set2(date, _flags, value) {
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
    value: function set2(date, _flags, value) {
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
    value: function set2(date, _flags, value) {
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
    value: function set2(date, _flags, value) {
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
    value: function set2(date, _flags, value) {
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
    value: function set2(date, _flags, value) {
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
    value: function set2(date, _flags, value) {
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
    value: function set2(date, _flags, value) {
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
    value: function set2(date, _flags, value) {
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
    value: function set2(date, _flags, value) {
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
    value: function set2(date, _flags, value) {
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
    value: function set2(date, flags, value) {
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
    value: function set2(date, flags, value) {
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
    value: function set2(_date, _flags, value) {
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
    value: function set2(_date, _flags, value) {
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
  }).sort(function(a3, b2) {
    return b2 - a3;
  }).filter(function(priority, index, array) {
    return array.indexOf(priority) === index;
  }).map(function(priority) {
    return setters.filter(function(setter2) {
      return setter2.priority === priority;
    }).sort(function(a3, b2) {
      return b2.subPriority - a3.subPriority;
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
var Dn = (e2, n, a3, t2, s3) => {
  const f = parse(e2, n.slice(0, e2.length), /* @__PURE__ */ new Date());
  return isValid(f) && isDate(f) ? t2 || s3 ? f : set(f, {
    hours: +a3.hours,
    minutes: +(a3 == null ? void 0 : a3.minutes),
    seconds: +(a3 == null ? void 0 : a3.seconds),
    milliseconds: 0
  }) : null;
};
var va = (e2, n, a3, t2, s3) => {
  const f = Array.isArray(a3) ? a3[0] : a3;
  if (typeof n == "string")
    return Dn(e2, n, f, t2, s3);
  if (Array.isArray(n)) {
    let y3 = null;
    for (const _ of n)
      if (y3 = Dn(e2, _, f, t2, s3), y3)
        break;
    return y3;
  }
  return typeof n == "function" ? n(e2) : null;
};
var $ = (e2) => e2 ? new Date(e2) : /* @__PURE__ */ new Date();
var ma = (e2, n) => {
  if (n) {
    const t2 = (e2.getMonth() + 1).toString().padStart(2, "0"), s3 = e2.getDate().toString().padStart(2, "0"), f = e2.getHours().toString().padStart(2, "0"), y3 = e2.getMinutes().toString().padStart(2, "0");
    return `${e2.getFullYear()}-${t2}-${s3}T${f}:${y3}:00.000Z`;
  }
  const a3 = Date.UTC(
    e2.getUTCFullYear(),
    e2.getUTCMonth(),
    e2.getUTCDate(),
    e2.getUTCHours(),
    e2.getUTCMinutes(),
    e2.getUTCSeconds()
  );
  return new Date(a3).toISOString();
};
var Ue = (e2) => {
  let n = $(JSON.parse(JSON.stringify(e2)));
  return n = setHours(n, 0), n = setMinutes(n, 0), n = setSeconds(n, 0), n = setMilliseconds(n, 0), n;
};
var Fe = (e2, n, a3, t2) => {
  let s3 = e2 ? $(e2) : $();
  return (n || n === 0) && (s3 = setHours(s3, +n)), (a3 || a3 === 0) && (s3 = setMinutes(s3, +a3)), (t2 || t2 === 0) && (s3 = setSeconds(s3, +t2)), setMilliseconds(s3, 0);
};
var _e = (e2, n) => !e2 || !n ? false : isBefore(Ue(e2), Ue(n));
var ve = (e2, n) => !e2 || !n ? false : isEqual(Ue(e2), Ue(n));
var Be = (e2, n) => !e2 || !n ? false : isAfter(Ue(e2), Ue(n));
var xn = (e2, n, a3) => e2 && e2[0] && e2[1] ? Be(a3, e2[0]) && _e(a3, e2[1]) : e2 && e2[0] && n ? Be(a3, e2[0]) && _e(a3, n) || _e(a3, e2[0]) && Be(a3, n) : false;
var pt = (e2) => {
  const n = set(new Date(e2), { date: 1 });
  return Ue(n);
};
var kt = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Kn = () => {
  const e2 = (t2) => {
    kt.menuFocused = t2;
  }, n = (t2) => {
    kt.shiftKeyInMenu !== t2 && (kt.shiftKeyInMenu = t2);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: kt.shiftKeyInMenu, menuFocused: kt.menuFocused })),
    setMenuFocused: e2,
    setShiftKey: n
  };
};
function yn(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
var Bt = {};
var ya = {
  get exports() {
    return Bt;
  },
  set exports(e2) {
    Bt = e2;
  }
};
(function(e2, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a3;
  function a3(t2) {
    if (t2 === null || t2 === true || t2 === false)
      return NaN;
    var s3 = Number(t2);
    return isNaN(s3) ? s3 : s3 < 0 ? Math.ceil(s3) : Math.floor(s3);
  }
  e2.exports = n.default;
})(ya, Bt);
var ga = yn(Bt);
var Yt = {};
var ha = {
  get exports() {
    return Yt;
  },
  set exports(e2) {
    Yt = e2;
  }
};
(function(e2, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a3;
  function a3(t2) {
    var s3 = new Date(Date.UTC(t2.getFullYear(), t2.getMonth(), t2.getDate(), t2.getHours(), t2.getMinutes(), t2.getSeconds(), t2.getMilliseconds()));
    return s3.setUTCFullYear(t2.getFullYear()), t2.getTime() - s3.getTime();
  }
  e2.exports = n.default;
})(ha, Yt);
var $n = yn(Yt);
function pa(e2, n) {
  var a3 = Da(n);
  return a3.formatToParts ? wa(a3, e2) : ba(a3, e2);
}
var ka = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function wa(e2, n) {
  try {
    for (var a3 = e2.formatToParts(n), t2 = [], s3 = 0; s3 < a3.length; s3++) {
      var f = ka[a3[s3].type];
      f >= 0 && (t2[f] = parseInt(a3[s3].value, 10));
    }
    return t2;
  } catch (y3) {
    if (y3 instanceof RangeError)
      return [NaN];
    throw y3;
  }
}
function ba(e2, n) {
  var a3 = e2.format(n).replace(/\u200E/g, ""), t2 = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(a3);
  return [t2[3], t2[1], t2[2], t2[4], t2[5], t2[6]];
}
var Xt = {};
function Da(e2) {
  if (!Xt[e2]) {
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
    Xt[e2] = a3 ? new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: e2,
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }) : new Intl.DateTimeFormat("en-US", {
      hourCycle: "h23",
      timeZone: e2,
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }
  return Xt[e2];
}
function gn(e2, n, a3, t2, s3, f, y3) {
  var _ = /* @__PURE__ */ new Date(0);
  return _.setUTCFullYear(e2, n, a3), _.setUTCHours(t2, s3, f, y3), _;
}
var Mn = 36e5;
var $a = 6e4;
var qt = {
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-]\d{2}):?(\d{2})$/
};
function hn(e2, n, a3) {
  var t2, s3;
  if (!e2 || (t2 = qt.timezoneZ.exec(e2), t2))
    return 0;
  var f;
  if (t2 = qt.timezoneHH.exec(e2), t2)
    return f = parseInt(t2[1], 10), Tn(f) ? -(f * Mn) : NaN;
  if (t2 = qt.timezoneHHMM.exec(e2), t2) {
    f = parseInt(t2[1], 10);
    var y3 = parseInt(t2[2], 10);
    return Tn(f, y3) ? (s3 = Math.abs(f) * Mn + y3 * $a, f > 0 ? -s3 : s3) : NaN;
  }
  if (Aa(e2)) {
    n = new Date(n || Date.now());
    var _ = a3 ? n : Ma(n), E2 = sn(_, e2), T2 = a3 ? E2 : Ta(n, E2, e2);
    return -T2;
  }
  return NaN;
}
function Ma(e2) {
  return gn(
    e2.getFullYear(),
    e2.getMonth(),
    e2.getDate(),
    e2.getHours(),
    e2.getMinutes(),
    e2.getSeconds(),
    e2.getMilliseconds()
  );
}
function sn(e2, n) {
  var a3 = pa(e2, n), t2 = gn(
    a3[0],
    a3[1] - 1,
    a3[2],
    a3[3] % 24,
    a3[4],
    a3[5],
    0
  ).getTime(), s3 = e2.getTime(), f = s3 % 1e3;
  return s3 -= f >= 0 ? f : 1e3 + f, t2 - s3;
}
function Ta(e2, n, a3) {
  var t2 = e2.getTime(), s3 = t2 - n, f = sn(new Date(s3), a3);
  if (n === f)
    return n;
  s3 -= f - n;
  var y3 = sn(new Date(s3), a3);
  return f === y3 ? f : Math.max(f, y3);
}
function Tn(e2, n) {
  return -23 <= e2 && e2 <= 23 && (n == null || 0 <= n && n <= 59);
}
var An = {};
function Aa(e2) {
  if (An[e2])
    return true;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e2 }), An[e2] = true, true;
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
function un(e2, n) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e2 === null)
    return /* @__PURE__ */ new Date(NaN);
  var a3 = n || {}, t2 = a3.additionalDigits == null ? Ca : ga(a3.additionalDigits);
  if (t2 !== 2 && t2 !== 1 && t2 !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e2 instanceof Date || typeof e2 == "object" && Object.prototype.toString.call(e2) === "[object Date]")
    return new Date(e2.getTime());
  if (typeof e2 == "number" || Object.prototype.toString.call(e2) === "[object Number]")
    return new Date(e2);
  if (!(typeof e2 == "string" || Object.prototype.toString.call(e2) === "[object String]"))
    return /* @__PURE__ */ new Date(NaN);
  var s3 = Pa(e2), f = _a(s3.date, t2), y3 = f.year, _ = f.restDateString, E2 = Na(_, y3);
  if (isNaN(E2))
    return /* @__PURE__ */ new Date(NaN);
  if (E2) {
    var T2 = E2.getTime(), U = 0, A;
    if (s3.time && (U = Ra(s3.time), isNaN(U)))
      return /* @__PURE__ */ new Date(NaN);
    if (s3.timeZone || a3.timeZone) {
      if (A = hn(s3.timeZone || a3.timeZone, new Date(T2 + U)), isNaN(A))
        return /* @__PURE__ */ new Date(NaN);
    } else
      A = $n(new Date(T2 + U)), A = $n(new Date(T2 + U + A));
    return new Date(T2 + U + A);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function Pa(e2) {
  var n = {}, a3 = Ie.dateTimePattern.exec(e2), t2;
  if (a3 ? (n.date = a3[1], t2 = a3[3]) : (a3 = Ie.datePattern.exec(e2), a3 ? (n.date = a3[1], t2 = a3[2]) : (n.date = null, t2 = e2)), t2) {
    var s3 = Ie.timeZone.exec(t2);
    s3 ? (n.time = t2.replace(s3[1], ""), n.timeZone = s3[1].trim()) : n.time = t2;
  }
  return n;
}
function _a(e2, n) {
  var a3 = Ie.YYY[n], t2 = Ie.YYYYY[n], s3;
  if (s3 = Ie.YYYY.exec(e2) || t2.exec(e2), s3) {
    var f = s3[1];
    return {
      year: parseInt(f, 10),
      restDateString: e2.slice(f.length)
    };
  }
  if (s3 = Ie.YY.exec(e2) || a3.exec(e2), s3) {
    var y3 = s3[1];
    return {
      year: parseInt(y3, 10) * 100,
      restDateString: e2.slice(y3.length)
    };
  }
  return {
    year: null
  };
}
function Na(e2, n) {
  if (n === null)
    return null;
  var a3, t2, s3, f;
  if (e2.length === 0)
    return t2 = /* @__PURE__ */ new Date(0), t2.setUTCFullYear(n), t2;
  if (a3 = Ie.MM.exec(e2), a3)
    return t2 = /* @__PURE__ */ new Date(0), s3 = parseInt(a3[1], 10) - 1, Pn(n, s3) ? (t2.setUTCFullYear(n, s3), t2) : /* @__PURE__ */ new Date(NaN);
  if (a3 = Ie.DDD.exec(e2), a3) {
    t2 = /* @__PURE__ */ new Date(0);
    var y3 = parseInt(a3[1], 10);
    return Ba(n, y3) ? (t2.setUTCFullYear(n, 0, y3), t2) : /* @__PURE__ */ new Date(NaN);
  }
  if (a3 = Ie.MMDD.exec(e2), a3) {
    t2 = /* @__PURE__ */ new Date(0), s3 = parseInt(a3[1], 10) - 1;
    var _ = parseInt(a3[2], 10);
    return Pn(n, s3, _) ? (t2.setUTCFullYear(n, s3, _), t2) : /* @__PURE__ */ new Date(NaN);
  }
  if (a3 = Ie.Www.exec(e2), a3)
    return f = parseInt(a3[1], 10) - 1, _n(n, f) ? Cn(n, f) : /* @__PURE__ */ new Date(NaN);
  if (a3 = Ie.WwwD.exec(e2), a3) {
    f = parseInt(a3[1], 10) - 1;
    var E2 = parseInt(a3[2], 10) - 1;
    return _n(n, f, E2) ? Cn(n, f, E2) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function Ra(e2) {
  var n, a3, t2;
  if (n = Ie.HH.exec(e2), n)
    return a3 = parseFloat(n[1].replace(",", ".")), Qt(a3) ? a3 % 24 * Jt : NaN;
  if (n = Ie.HHMM.exec(e2), n)
    return a3 = parseInt(n[1], 10), t2 = parseFloat(n[2].replace(",", ".")), Qt(a3, t2) ? a3 % 24 * Jt + t2 * Sn : NaN;
  if (n = Ie.HHMMSS.exec(e2), n) {
    a3 = parseInt(n[1], 10), t2 = parseInt(n[2], 10);
    var s3 = parseFloat(n[3].replace(",", "."));
    return Qt(a3, t2, s3) ? a3 % 24 * Jt + t2 * Sn + s3 * 1e3 : NaN;
  }
  return null;
}
function Cn(e2, n, a3) {
  n = n || 0, a3 = a3 || 0;
  var t2 = /* @__PURE__ */ new Date(0);
  t2.setUTCFullYear(e2, 0, 4);
  var s3 = t2.getUTCDay() || 7, f = n * 7 + a3 + 1 - s3;
  return t2.setUTCDate(t2.getUTCDate() + f), t2;
}
var Oa = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var Ia = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Gn(e2) {
  return e2 % 400 === 0 || e2 % 4 === 0 && e2 % 100 !== 0;
}
function Pn(e2, n, a3) {
  if (n < 0 || n > 11)
    return false;
  if (a3 != null) {
    if (a3 < 1)
      return false;
    var t2 = Gn(e2);
    if (t2 && a3 > Ia[n] || !t2 && a3 > Oa[n])
      return false;
  }
  return true;
}
function Ba(e2, n) {
  if (n < 1)
    return false;
  var a3 = Gn(e2);
  return !(a3 && n > 366 || !a3 && n > 365);
}
function _n(e2, n, a3) {
  return !(n < 0 || n > 52 || a3 != null && (a3 < 0 || a3 > 6));
}
function Qt(e2, n, a3) {
  return !(e2 != null && (e2 < 0 || e2 >= 25) || n != null && (n < 0 || n >= 60) || a3 != null && (a3 < 0 || a3 >= 60));
}
var Vt = {};
var Ya = {
  get exports() {
    return Vt;
  },
  set exports(e2) {
    Vt = e2;
  }
};
var Et = {};
var Va = {
  get exports() {
    return Et;
  },
  set exports(e2) {
    Et = e2;
  }
};
(function(e2, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a3;
  function a3(t2, s3) {
    if (t2 == null)
      throw new TypeError("assign requires that input parameter not be null or undefined");
    for (var f in s3)
      Object.prototype.hasOwnProperty.call(s3, f) && (t2[f] = s3[f]);
    return t2;
  }
  e2.exports = n.default;
})(Va, Et);
(function(e2, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = s3;
  var a3 = t2(Et);
  function t2(f) {
    return f && f.__esModule ? f : { default: f };
  }
  function s3(f) {
    return (0, a3.default)({}, f);
  }
  e2.exports = n.default;
})(Ya, Vt);
var Ea = yn(Vt);
function Fa(e2, n, a3) {
  var t2 = un(e2, a3), s3 = hn(n, t2, true), f = new Date(t2.getTime() - s3), y3 = /* @__PURE__ */ new Date(0);
  return y3.setFullYear(f.getUTCFullYear(), f.getUTCMonth(), f.getUTCDate()), y3.setHours(f.getUTCHours(), f.getUTCMinutes(), f.getUTCSeconds(), f.getUTCMilliseconds()), y3;
}
function La(e2, n, a3) {
  if (typeof e2 == "string" && !e2.match(jn)) {
    var t2 = Ea(a3);
    return t2.timeZone = n, un(e2, t2);
  }
  var s3 = un(e2, a3), f = gn(
    s3.getFullYear(),
    s3.getMonth(),
    s3.getDate(),
    s3.getHours(),
    s3.getMinutes(),
    s3.getSeconds(),
    s3.getMilliseconds()
  ).getTime(), y3 = hn(n, new Date(f));
  return new Date(f + y3);
}
var Ua = (e2, n = 3) => {
  const a3 = [];
  for (let t2 = 0; t2 < e2.length; t2 += n)
    a3.push([e2[t2], e2[t2 + 1], e2[t2 + 2]]);
  return a3;
};
var Ha = (e2, n) => {
  const a3 = [1, 2, 3, 4, 5, 6, 7].map((f) => new Intl.DateTimeFormat(e2, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${f}T00:00:00+00:00`)).slice(0, 2)), t2 = a3.slice(0, n), s3 = a3.slice(n + 1, a3.length);
  return [a3[n]].concat(...s3).concat(...t2);
};
var Wa = (e2, n) => {
  const a3 = [];
  for (let t2 = +e2[0]; t2 <= +e2[1]; t2++)
    a3.push({ value: +t2, text: `${t2}` });
  return n ? a3.reverse() : a3;
};
var za = (e2, n) => {
  const a3 = new Intl.DateTimeFormat(e2, { month: n, timeZone: "UTC" });
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((s3) => {
    const f = s3 < 10 ? `0${s3}` : s3;
    return /* @__PURE__ */ new Date(`2017-${f}-01T00:00:00+00:00`);
  }).map((s3, f) => ({
    text: a3.format(s3),
    value: f
  }));
};
var xa = (e2) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e2];
var $e = (e2) => {
  const n = unref(e2);
  return n != null && n.$el ? n == null ? void 0 : n.$el : n;
};
var Ka = (e2) => Object.assign({ type: "dot" }, e2);
var Zn = (e2) => Array.isArray(e2) ? !!e2[0] && !!e2[1] : false;
var Ft = {
  prop: (e2) => `"${e2}" prop must be enabled!`,
  dateArr: (e2) => `You need to use array as "model-value" binding in order to support "${e2}"`
};
var Me = (e2) => e2;
var Nn = (e2) => e2 === 0 ? e2 : !e2 || isNaN(+e2) ? null : +e2;
var Rn = (e2) => Object.assign(
  {
    menuAppear: "dp-menu-appear",
    open: "dp-slide-down",
    close: "dp-slide-up",
    next: "calendar-next",
    previous: "calendar-prev",
    vNext: "dp-slide-up",
    vPrevious: "dp-slide-down"
  },
  e2
);
var ja = (e2) => Object.assign(
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
  e2
);
var Ga = (e2) => e2 === null ? 0 : typeof e2 == "boolean" ? e2 ? 2 : 0 : +e2 >= 2 ? +e2 : 2;
var Za = (e2, n, a3) => e2 || (typeof a3 == "string" ? a3 : n);
var Xa = (e2) => typeof e2 == "boolean" ? e2 ? Rn({}) : false : Rn(e2);
var qa = () => ({
  enterSubmit: true,
  tabSubmit: true,
  openMenu: true,
  rangeSeparator: " - "
});
var Ja = (e2) => Object.assign({ months: [], years: [], times: { hours: [], minutes: [], seconds: [] } }, e2);
var Ee = (e2) => {
  const n = () => {
    if (e2.partialRange)
      return null;
    throw new Error(Ft.prop("partial-range"));
  }, a3 = computed(() => ({
    ariaLabels: ja(e2.ariaLabels),
    textInputOptions: Object.assign(qa(), e2.textInputOptions),
    multiCalendars: Ga(e2.multiCalendars),
    previewFormat: Za(e2.previewFormat, e2.format, f()),
    filters: Ja(e2.filters),
    transitions: Xa(e2.transitions),
    startTime: c2()
  })), t2 = (o) => {
    if (e2.range)
      return o();
    throw new Error(Ft.prop("range"));
  }, s3 = () => {
    const o = e2.enableSeconds ? ":ss" : "";
    return e2.is24 ? `HH:mm${o}` : `hh:mm${o} aa`;
  }, f = () => e2.format ? e2.format : e2.monthPicker ? "MM/yyyy" : e2.timePicker ? s3() : e2.weekPicker ? "MM/dd/yyyy" : e2.yearPicker ? "yyyy" : e2.enableTimePicker ? `MM/dd/yyyy, ${s3()}` : "MM/dd/yyyy", y3 = (o, g) => {
    if (typeof e2.format == "function")
      return e2.format(o);
    const r = g || f(), k2 = e2.formatLocale ? { locale: e2.formatLocale } : void 0;
    return Array.isArray(o) ? `${format(o[0], r, k2)} ${e2.modelAuto && !o[1] ? "" : a3.value.textInputOptions.rangeSeparator || "-"} ${o[1] ? format(o[1], r, k2) : ""}` : format(o, r, k2);
  }, _ = (o) => e2.timezone ? Fa(o, e2.timezone) : o, E2 = (o) => e2.timezone ? La(o, e2.timezone) : o, T2 = computed(() => (o) => {
    var g;
    return (g = e2.hideNavigation) == null ? void 0 : g.includes(o);
  }), U = (o) => {
    const g = e2.maxDate ? Be(_(o), _($(e2.maxDate))) : false, r = e2.minDate ? _e(_(o), _($(e2.minDate))) : false, k2 = B2(o, e2.disabledDates), R2 = a3.value.filters.months.map((se) => +se).includes(getMonth(o)), m3 = e2.disabledWeekDays.length ? e2.disabledWeekDays.some((se) => +se === getDay(o)) : false, b2 = e2.allowedDates.length ? !e2.allowedDates.some((se) => ve(_($(se)), _(o))) : false, v = getYear(o), W = v < +e2.yearRange[0] || v > +e2.yearRange[1];
    return !(g || r || k2 || R2 || W || m3 || b2);
  }, A = (o) => {
    const g = {
      hours: getHours($()),
      minutes: getMinutes($()),
      seconds: e2.enableSeconds ? getSeconds($()) : 0
    };
    return Object.assign(g, o);
  }, c2 = () => e2.range ? e2.startTime && Array.isArray(e2.startTime) ? [A(e2.startTime[0]), A(e2.startTime[1])] : null : e2.startTime && !Array.isArray(e2.startTime) ? A(e2.startTime) : null, M3 = (o) => !U(o), te = (o) => Array.isArray(o) ? isValid(o[0]) && (o[1] ? isValid(o[1]) : true) : o ? isValid(o) : false, H3 = (o) => o instanceof Date ? o : parseISO(o), z2 = (o) => {
    const g = startOfWeek(_(o), { weekStartsOn: +e2.weekStart }), r = endOfWeek(_(o), { weekStartsOn: +e2.weekStart });
    return [g, r];
  }, B2 = (o, g) => Array.isArray(g) ? g.some((r) => ve(_($(r)), _(o))) : g($(JSON.parse(JSON.stringify(o)))), w2 = (o, g, r) => {
    let k2 = o ? $(o) : $();
    return (g || g === 0) && (k2 = setMonth(k2, g)), r && (k2 = setYear(k2, r)), k2;
  }, J = (o) => set($(), { hours: getHours(o), minutes: getMinutes(o), seconds: getSeconds(o) }), ee = (o) => set($(), {
    hours: +o.hours || 0,
    minutes: +o.minutes || 0,
    seconds: +o.seconds || 0
  }), x2 = (o, g, r, k2) => {
    if (!o)
      return true;
    if (k2) {
      const Y2 = r === "max" ? isBefore(o, g) : isAfter(o, g), R2 = { seconds: 0, milliseconds: 0 };
      return Y2 || isEqual(set(o, R2), set(g, R2));
    }
    return r === "max" ? o.getTime() <= g.getTime() : o.getTime() >= g.getTime();
  }, le = () => !e2.enableTimePicker || e2.monthPicker || e2.yearPicker || e2.ignoreTimeValidation, de = (o) => Array.isArray(o) ? [o[0] ? J(o[0]) : null, o[1] ? J(o[1]) : null] : J(o), C = (o) => {
    const g = e2.maxTime ? ee(e2.maxTime) : $(e2.maxDate);
    return Array.isArray(o) ? x2(o[0], g, "max", !!e2.maxDate) && x2(o[1], g, "max", !!e2.maxDate) : x2(o, g, "max", !!e2.maxDate);
  }, N = (o, g) => {
    const r = e2.minTime ? ee(e2.minTime) : $(e2.minDate);
    return Array.isArray(o) ? x2(o[0], r, "min", !!e2.minDate) && x2(o[1], r, "min", !!e2.minDate) && g : x2(o, r, "min", !!e2.minDate) && g;
  }, G2 = (o) => {
    let g = true;
    if (!o || le())
      return true;
    const r = !e2.minDate && !e2.maxDate ? de(o) : o;
    return (e2.maxTime || e2.maxDate) && (g = C(Me(r))), (e2.minTime || e2.minDate) && (g = N(Me(r), g)), g;
  }, P = (o, g) => {
    const r = $(JSON.parse(JSON.stringify(o))), k2 = [];
    for (let Y2 = 0; Y2 < 7; Y2++) {
      const R2 = addDays(r, Y2), m3 = getMonth(R2) !== g;
      k2.push({
        text: e2.hideOffsetDates && m3 ? "" : R2.getDate(),
        value: R2,
        current: !m3,
        classData: {}
      });
    }
    return k2;
  }, Z = (o, g) => {
    const r = [], k2 = $(_(new Date(g, o))), Y2 = $(_(new Date(g, o + 1, 0))), R2 = startOfWeek(k2, { weekStartsOn: e2.weekStart }), m3 = (b2) => {
      const v = P(b2, o);
      if (r.push({ days: v }), !r[r.length - 1].days.some(
        (W) => ve(Ue(W.value), Ue(Y2))
      )) {
        const W = addDays(b2, 7);
        m3(W);
      }
    };
    if (m3(R2), e2.sixWeeks && r.length < 6) {
      const b2 = 6 - r.length;
      for (let v = 1; v <= b2; v++) {
        const W = r[r.length - 1], se = W.days[W.days.length - 1], Ne = P(addDays(se.value, 1), getMonth(k2));
        r.push({ days: Ne });
      }
    }
    return r;
  }, p = (o, g, r) => [set($(o), { date: 1 }), set($(), { month: g, year: r, date: 1 })], q2 = (o, g) => _e(...p(e2.minDate, o, g)) || ve(...p(e2.minDate, o, g)), j = (o, g) => Be(...p(e2.maxDate, o, g)) || ve(...p(e2.maxDate, o, g)), I2 = (o, g, r) => {
    let k2 = false;
    return e2.maxDate && r && j(o, g) && (k2 = true), e2.minDate && !r && q2(o, g) && (k2 = true), k2;
  };
  return {
    checkPartialRangeValue: n,
    checkRangeEnabled: t2,
    getZonedDate: _,
    getZonedToUtc: E2,
    formatDate: y3,
    getDefaultPattern: f,
    validateDate: U,
    getDefaultStartTime: c2,
    isDisabled: M3,
    isValidDate: te,
    sanitizeDate: H3,
    getWeekFromDate: z2,
    matchDate: B2,
    setDateMonthOrYear: w2,
    isValidTime: G2,
    getCalendarDays: Z,
    validateMonthYearInRange: (o, g, r, k2) => {
      let Y2 = false;
      return k2 ? e2.minDate && e2.maxDate ? Y2 = I2(o, g, r) : (e2.minDate && q2(o, g) || e2.maxDate && j(o, g)) && (Y2 = true) : Y2 = true, Y2;
    },
    validateMaxDate: j,
    validateMinDate: q2,
    assignDefaultTime: A,
    defaults: a3,
    hideNavigationButtons: T2
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
  const e2 = computed(() => Pt.value ? [...he.selectionGrid, he.actionRow].filter((B2) => B2.length) : tn.value ? [
    ...he.timePicker[0],
    ...he.timePicker[1],
    an.value ? [] : [en.value],
    he.actionRow
  ].filter((B2) => B2.length) : nn.value ? [...he.monthPicker, he.actionRow] : [he.monthYear, ...he.calendar, he.time, he.actionRow].filter((B2) => B2.length)), n = (B2) => {
    Oe.value = B2 ? Oe.value + 1 : Oe.value - 1;
    let w2 = null;
    e2.value[Ae.value] && (w2 = e2.value[Ae.value][Oe.value]), w2 || (Oe.value = B2 ? Oe.value - 1 : Oe.value + 1);
  }, a3 = (B2) => {
    if (Ae.value === 0 && !B2 || Ae.value === e2.value.length && B2)
      return;
    Ae.value = B2 ? Ae.value + 1 : Ae.value - 1, e2.value[Ae.value] ? e2.value[Ae.value] && !e2.value[Ae.value][Oe.value] && Oe.value !== 0 && (Oe.value = e2.value[Ae.value].length - 1) : Ae.value = B2 ? Ae.value - 1 : Ae.value + 1;
  }, t2 = (B2) => {
    let w2 = null;
    e2.value[Ae.value] && (w2 = e2.value[Ae.value][Oe.value]), w2 ? w2.focus({ preventScroll: !Pt.value }) : Oe.value = B2 ? Oe.value - 1 : Oe.value + 1;
  }, s3 = () => {
    n(true), t2(true);
  }, f = () => {
    n(false), t2(false);
  }, y3 = () => {
    a3(false), t2(true);
  }, _ = () => {
    a3(true), t2(true);
  }, E2 = (B2, w2) => {
    he[w2] = B2;
  }, T2 = (B2, w2) => {
    he[w2] = B2;
  }, U = () => {
    Oe.value = 0, Ae.value = 0;
  };
  return {
    buildMatrix: E2,
    buildMultiLevelMatrix: T2,
    setTimePickerBackRef: (B2) => {
      en.value = B2;
    },
    setSelectionGrid: (B2) => {
      Pt.value = B2, U(), B2 || (he.selectionGrid = []);
    },
    setTimePicker: (B2, w2 = false) => {
      tn.value = B2, an.value = w2, U(), B2 || (he.timePicker[0] = [], he.timePicker[1] = []);
    },
    setTimePickerElements: (B2, w2 = 0) => {
      he.timePicker[w2] = B2;
    },
    arrowRight: s3,
    arrowLeft: f,
    arrowUp: y3,
    arrowDown: _,
    clearArrowNav: () => {
      he.monthYear = [], he.calendar = [], he.time = [], he.actionRow = [], he.selectionGrid = [], he.timePicker[0] = [], he.timePicker[1] = [], Pt.value = false, tn.value = false, an.value = false, nn.value = false, U(), en.value = null;
    },
    setMonthPicker: (B2) => {
      nn.value = B2, U();
    },
    refSets: he
    // exposed for testing
  };
};
var On = (e2) => Array.isArray(e2);
var lt = (e2) => Array.isArray(e2);
var In = (e2) => Array.isArray(e2) && e2.length === 2;
var Qa = (e2, n, a3, t2, s3) => {
  const {
    getDefaultStartTime: f,
    isDisabled: y3,
    sanitizeDate: _,
    getWeekFromDate: E2,
    setDateMonthOrYear: T2,
    validateMonthYearInRange: U,
    defaults: A
  } = Ee(e2), c2 = computed({
    get: () => e2.internalModelValue,
    set: (i2) => {
      !e2.readonly && !e2.disabled && n("update:internal-model-value", i2);
    }
  }), M3 = ref([]);
  watch(c2, () => {
    le();
  });
  const te = toRef(e2, "multiCalendars");
  watch(te, () => {
    Je(0);
  });
  const H3 = ref([{ month: getMonth($()), year: getYear($()) }]), z2 = reactive({
    hours: e2.range ? [getHours($()), getHours($())] : getHours($()),
    minutes: e2.range ? [getMinutes($()), getMinutes($())] : getMinutes($()),
    seconds: e2.range ? [0, 0] : 0
  }), B2 = computed(
    () => (i2) => H3.value[i2] ? H3.value[i2].month : 0
  ), w2 = computed(
    () => (i2) => H3.value[i2] ? H3.value[i2].year : 0
  ), J = computed(() => e2.flow && e2.flow.length && !e2.partialFlow ? s3.value === e2.flow.length : true), ee = (i2, D2, Q2) => {
    var d3, V;
    H3.value[i2] || (H3.value[i2] = { month: 0, year: 0 }), H3.value[i2].month = D2 === null ? (d3 = H3.value[i2]) == null ? void 0 : d3.month : D2, H3.value[i2].year = Q2 === null ? (V = H3.value[i2]) == null ? void 0 : V.year : Q2;
  }, x2 = (i2, D2) => {
    z2[i2] = D2;
  };
  onMounted(() => {
    c2.value || (e2.startDate && (ee(0, getMonth($(e2.startDate)), getYear($(e2.startDate))), A.value.multiCalendars && Je(0)), A.value.startTime && I2()), le(true);
  });
  const le = (i2 = false) => {
    if (c2.value)
      return Array.isArray(c2.value) ? (M3.value = c2.value, P(i2)) : C(c2.value);
    if (e2.timePicker)
      return Z();
    if (e2.monthPicker && !e2.range)
      return p();
    if (e2.yearPicker && !e2.range)
      return q2();
    if (A.value.multiCalendars && i2 && !e2.startDate)
      return de($(), i2);
  }, de = (i2, D2 = false) => {
    if ((!A.value.multiCalendars || !e2.multiStatic || D2) && ee(0, getMonth(i2), getYear(i2)), A.value.multiCalendars)
      for (let Q2 = 1; Q2 < A.value.multiCalendars; Q2++) {
        const d3 = set($(), { month: B2.value(Q2 - 1), year: w2.value(Q2 - 1) }), V = add(d3, { months: 1 });
        H3.value[Q2] = { month: getMonth(V), year: getYear(V) };
      }
  }, C = (i2) => {
    de(i2), x2("hours", getHours(i2)), x2("minutes", getMinutes(i2)), x2("seconds", getSeconds(i2));
  }, N = (i2, D2) => {
    de(i2[0], D2);
    const Q2 = (d3, V) => [
      d3(i2[0]),
      i2[1] ? d3(i2[1]) : z2[V][1]
    ];
    x2("hours", Q2(getHours, "hours")), x2("minutes", Q2(getMinutes, "minutes")), x2("seconds", Q2(getSeconds, "seconds"));
  }, G2 = (i2, D2) => {
    if ((e2.range || e2.weekPicker) && !e2.multiDates)
      return N(i2, D2);
    if (e2.multiDates) {
      const Q2 = i2[i2.length - 1];
      return C(Q2);
    }
  }, P = (i2) => {
    const D2 = c2.value;
    G2(D2, i2), A.value.multiCalendars && e2.multiCalendarsSolo && o();
  }, Z = () => {
    if (I2(), !e2.range)
      c2.value = Fe($(), z2.hours, z2.minutes, j());
    else {
      const i2 = z2.hours, D2 = z2.minutes;
      c2.value = [
        Fe($(), i2[0], D2[0], j()),
        Fe($(), i2[1], D2[1], j(false))
      ];
    }
  }, p = () => {
    e2.multiDates ? c2.value = [T2($(), B2.value(0), w2.value(0))] : c2.value = T2($(), B2.value(0), w2.value(0));
  }, q2 = () => {
    c2.value = $();
  }, j = (i2 = true) => e2.enableSeconds ? Array.isArray(z2.seconds) ? i2 ? z2.seconds[0] : z2.seconds[1] : z2.seconds : 0, I2 = () => {
    const i2 = f();
    if (i2) {
      const D2 = Array.isArray(i2), Q2 = D2 ? [+i2[0].hours, +i2[1].hours] : +i2.hours, d3 = D2 ? [+i2[0].minutes, +i2[1].minutes] : +i2.minutes, V = D2 ? [+i2[0].seconds, +i2[1].seconds] : +i2.seconds;
      x2("hours", Q2), x2("minutes", d3), e2.enableSeconds && x2("seconds", V);
    }
  }, l = () => Array.isArray(c2.value) && c2.value.length ? c2.value[c2.value.length - 1] : null, o = () => {
    if (Array.isArray(c2.value) && c2.value.length === 2) {
      const i2 = $(
        $(c2.value[1] ? c2.value[1] : addMonths(c2.value[0], 1))
      ), [D2, Q2] = [getMonth(c2.value[0]), getYear(c2.value[0])], [d3, V] = [getMonth(c2.value[1]), getYear(c2.value[1])];
      (D2 !== d3 || D2 === d3 && Q2 !== V) && e2.multiCalendarsSolo && ee(1, getMonth(i2), getYear(i2));
    }
  }, g = (i2) => {
    const D2 = addMonths(i2, 1);
    return { month: getMonth(D2), year: getYear(D2) };
  }, r = (i2) => {
    const D2 = getMonth($(i2)), Q2 = getYear($(i2));
    if (ee(0, D2, Q2), A.value.multiCalendars > 0)
      for (let d3 = 1; d3 < A.value.multiCalendars; d3++) {
        const V = g(
          set($(i2), { year: B2.value(d3 - 1), month: w2.value(d3 - 1) })
        );
        ee(d3, V.month, V.year);
      }
  }, k2 = (i2) => {
    if (c2.value && Array.isArray(c2.value))
      if (c2.value.some((D2) => ve(i2, D2))) {
        const D2 = c2.value.filter((Q2) => !ve(Q2, i2));
        c2.value = D2.length ? D2 : null;
      } else
        (e2.multiDatesLimit && +e2.multiDatesLimit > c2.value.length || !e2.multiDatesLimit) && c2.value.push(i2);
    else
      c2.value = [i2];
  }, Y2 = (i2, D2) => {
    const Q2 = Be(i2, D2) ? D2 : i2, d3 = Be(D2, i2) ? D2 : i2;
    return eachDayOfInterval({ start: Q2, end: d3 });
  }, R2 = (i2, D2 = 0) => {
    if (Array.isArray(c2.value) && c2.value[D2]) {
      const Q2 = differenceInCalendarDays(i2, c2.value[D2]), d3 = Y2(c2.value[D2], i2), V = d3.length === 1 ? 0 : d3.filter((be) => y3(be)).length, we = Math.abs(Q2) - V;
      if (e2.minRange && e2.maxRange)
        return we >= +e2.minRange && we <= +e2.maxRange;
      if (e2.minRange)
        return we >= +e2.minRange;
      if (e2.maxRange)
        return we <= +e2.maxRange;
    }
    return true;
  }, m3 = (i2) => Array.isArray(c2.value) && c2.value.length === 2 ? e2.fixedStart && (Be(i2, c2.value[0]) || ve(i2, c2.value[0])) ? [c2.value[0], i2] : e2.fixedEnd && (_e(i2, c2.value[1]) || ve(i2, c2.value[1])) ? [i2, c2.value[1]] : (n("invalid-fixed-range", i2), c2.value) : [], b2 = () => {
    e2.autoApply && J.value && n("auto-apply", e2.partialFlow);
  }, v = () => {
    e2.autoApply && n("select-date");
  }, W = (i2) => !eachDayOfInterval({ start: i2[0], end: i2[1] }).some((Q2) => y3(Q2)), se = (i2) => (c2.value = E2($(i2.value)), b2()), Ne = (i2) => {
    const D2 = Fe($(i2.value), z2.hours, z2.minutes, j());
    e2.multiDates ? k2(D2) : c2.value = D2, a3(), b2();
  }, Xe = () => {
    M3.value = c2.value ? c2.value.slice() : [], M3.value.length === 2 && !(e2.fixedStart || e2.fixedEnd) && (M3.value = []);
  }, re = (i2, D2) => {
    const Q2 = [$(i2.value), addDays($(i2.value), +e2.autoRange)];
    W(Q2) && (D2 && r(i2.value), M3.value = Q2);
  }, qe = (i2) => {
    xe(i2.value) || !R2(i2.value, e2.fixedStart ? 0 : 1) || (M3.value = m3($(i2.value)));
  }, xe = (i2) => e2.noDisabledRange ? Y2(M3.value[0], i2).some((Q2) => y3(Q2)) : false, Re = (i2, D2) => {
    if (Xe(), e2.autoRange)
      return re(i2, D2);
    if (e2.fixedStart || e2.fixedEnd)
      return qe(i2);
    M3.value[0] ? R2($(i2.value)) && !xe(i2.value) && (_e($(i2.value), $(M3.value[0])) ? M3.value.unshift($(i2.value)) : M3.value[1] = $(i2.value)) : M3.value[0] = $(i2.value);
  }, rt = (i2) => {
    M3.value[i2] = Fe(
      M3.value[i2],
      z2.hours[i2],
      z2.minutes[i2],
      j(i2 !== 1)
    );
  }, ne = () => {
    M3.value.length && (M3.value[0] && !M3.value[1] ? rt(0) : (rt(0), rt(1), a3()), c2.value = M3.value.slice(), M3.value[0] && M3.value[1] && e2.autoApply && n("auto-apply"), M3.value[0] && !M3.value[1] && e2.modelAuto && e2.autoApply && n("auto-apply"));
  }, me = (i2, D2 = false) => {
    if (!(y3(i2.value) || !i2.current && e2.hideOffsetDates)) {
      if (e2.weekPicker)
        return se(i2);
      if (!e2.range)
        return Ne(i2);
      lt(z2.hours) && lt(z2.minutes) && !e2.multiDates && (Re(i2, D2), ne());
    }
  }, ge = (i2) => {
    const D2 = i2[0];
    return e2.weekNumbers === "local" ? getWeek(D2.value, { weekStartsOn: +e2.weekStart }) : e2.weekNumbers === "iso" ? getISOWeek(D2.value) : typeof e2.weekNumbers == "function" ? e2.weekNumbers(D2.value) : "";
  }, Je = (i2) => {
    for (let D2 = i2 - 1; D2 >= 0; D2--) {
      const Q2 = subMonths(set($(), { month: B2.value(D2 + 1), year: w2.value(D2 + 1) }), 1);
      ee(D2, getMonth(Q2), getYear(Q2));
    }
    for (let D2 = i2 + 1; D2 <= A.value.multiCalendars - 1; D2++) {
      const Q2 = addMonths(set($(), { month: B2.value(D2 - 1), year: w2.value(D2 - 1) }), 1);
      ee(D2, getMonth(Q2), getYear(Q2));
    }
  }, Ye = (i2) => T2($(), B2.value(i2), w2.value(i2)), Tt = (i2) => Fe(i2, z2.hours, z2.minutes, j()), Ht = (i2) => {
    k2(Ye(i2));
  }, Wt = (i2, D2) => {
    const Q2 = e2.monthPicker ? B2.value(i2) !== D2.month || !D2.fromNav : w2.value(i2) !== D2.year || !D2.fromNav;
    if (ee(i2, D2.month, D2.year), A.value.multiCalendars && !e2.multiCalendarsSolo && Je(i2), e2.monthPicker || e2.yearPicker)
      if (e2.multiDates)
        Q2 && Ht(i2);
      else if (e2.range) {
        if (Q2 && R2(Ye(i2))) {
          let d3 = c2.value ? c2.value.slice() : [];
          d3.length === 2 && d3[1] !== null && (d3 = []), d3.length ? _e(Ye(i2), d3[0]) ? d3.unshift(Ye(i2)) : d3[1] = Ye(i2) : d3 = [Ye(i2)], c2.value = d3;
        }
      } else
        c2.value = Ye(i2);
    n("update-month-year", { instance: i2, month: D2.month, year: D2.year }), t2(e2.multiCalendarsSolo ? i2 : void 0);
  }, zt = async (i2 = false) => {
    if (e2.autoApply && (e2.monthPicker || e2.yearPicker)) {
      await nextTick();
      const D2 = e2.monthPicker ? i2 : false;
      e2.range ? n("auto-apply", D2 || !c2.value || c2.value.length === 1) : n("auto-apply", D2);
    }
    a3();
  }, At = (i2, D2) => {
    const Q2 = set($(), { month: B2.value(D2), year: w2.value(D2) }), d3 = i2 < 0 ? addMonths(Q2, 1) : subMonths(Q2, 1);
    U(getMonth(d3), getYear(d3), i2 < 0, e2.preventMinMaxNavigation) && (ee(D2, getMonth(d3), getYear(d3)), A.value.multiCalendars && !e2.multiCalendarsSolo && Je(D2), n("update-month-year", { instance: D2, month: getMonth(d3), year: getYear(d3) }), t2());
  }, ht = (i2) => {
    On(i2) && On(c2.value) && lt(z2.hours) && lt(z2.minutes) ? (i2[0] && c2.value[0] && (c2.value[0] = Fe(i2[0], z2.hours[0], z2.minutes[0], j())), i2[1] && c2.value[1] && (c2.value[1] = Fe(i2[1], z2.hours[1], z2.minutes[1], j(false)))) : e2.multiDates && Array.isArray(c2.value) ? c2.value[c2.value.length - 1] = Tt(i2) : !e2.range && !In(i2) && (c2.value = Tt(i2)), n("time-update");
  }, xt = (i2, D2 = true, Q2 = false) => {
    const d3 = D2 ? i2 : z2.hours, V = !D2 && !Q2 ? i2 : z2.minutes, we = Q2 ? i2 : z2.seconds;
    if (e2.range && In(c2.value) && lt(d3) && lt(V) && lt(we) && !e2.disableTimeRangeValidation) {
      const be = (X2) => Fe(c2.value[X2], d3[X2], V[X2], we[X2]), Ke = (X2) => setMilliseconds(c2.value[X2], 0);
      if (ve(c2.value[0], c2.value[1]) && (isAfter(be(0), Ke(1)) || isBefore(be(1), Ke(0))))
        return;
    }
    if (x2("hours", d3), x2("minutes", V), x2("seconds", we), c2.value)
      if (e2.multiDates) {
        const be = l();
        be && ht(be);
      } else
        ht(c2.value);
    else
      e2.timePicker && ht(e2.range ? [$(), $()] : $());
    a3();
  }, Kt = (i2, D2) => {
    e2.monthChangeOnScroll && At(e2.monthChangeOnScroll !== "inverse" ? -i2.deltaY : i2.deltaY, D2);
  }, jt = (i2, D2, Q2 = false) => {
    e2.monthChangeOnArrows && e2.vertical === Q2 && St(i2, D2);
  }, St = (i2, D2) => {
    At(i2 === "right" ? -1 : 1, D2);
  };
  return {
    time: z2,
    month: B2,
    year: w2,
    modelValue: c2,
    calendars: H3,
    monthYearSelect: zt,
    isDisabled: y3,
    updateTime: xt,
    getWeekNum: ge,
    selectDate: me,
    updateMonthYear: Wt,
    handleScroll: Kt,
    getMarker: (i2) => e2.markers.find((D2) => ve(_(i2.value), _(D2.date))),
    handleArrow: jt,
    handleSwipe: St,
    selectCurrentDate: () => {
      e2.range ? c2.value && Array.isArray(c2.value) && c2.value[0] ? c2.value = _e($(), c2.value[0]) ? [$(), c2.value[0]] : [c2.value[0], $()] : c2.value = [$()] : c2.value = $(), v();
    },
    presetDateRange: (i2, D2) => {
      D2 || i2.length && i2.length <= 2 && e2.range && (c2.value = i2.map((Q2) => $(Q2)), v(), e2.multiCalendars && nextTick().then(() => le(true)));
    }
  };
};
var er = (e2, n, a3) => {
  const t2 = ref(), {
    getZonedToUtc: s3,
    getZonedDate: f,
    formatDate: y3,
    getDefaultPattern: _,
    checkRangeEnabled: E2,
    checkPartialRangeValue: T2,
    isValidDate: U,
    setDateMonthOrYear: A,
    defaults: c2
  } = Ee(n), M3 = ref(""), te = toRef(n, "format");
  watch(t2, () => {
    e2("internal-model-change", t2.value);
  }), watch(te, () => {
    o();
  });
  const H3 = (v) => {
    const W = v || $();
    return n.modelType ? r(W) : {
      hours: getHours(W),
      minutes: getMinutes(W),
      seconds: n.enableSeconds ? getSeconds(W) : 0
    };
  }, z2 = (v) => n.modelType ? r(v) : { month: getMonth(v), year: getYear(v) }, B2 = (v) => Array.isArray(v) ? E2(() => [
    setYear($(), v[0]),
    v[1] ? setYear($(), v[1]) : T2()
  ]) : setYear($(), +v), w2 = (v, W) => (typeof v == "string" || typeof v == "number") && n.modelType ? g(v) : W, J = (v) => Array.isArray(v) ? [
    w2(
      v[0],
      Fe(null, +v[0].hours, +v[0].minutes, v[0].seconds)
    ),
    w2(
      v[1],
      Fe(null, +v[1].hours, +v[1].minutes, v[1].seconds)
    )
  ] : w2(v, Fe(null, v.hours, v.minutes, v.seconds)), ee = (v) => Array.isArray(v) ? n.multiDates ? v.map((W) => w2(W, A(null, +W.month, +W.year))) : E2(() => [
    w2(v[0], A(null, +v[0].month, +v[0].year)),
    w2(
      v[1],
      v[1] ? A(null, +v[1].month, +v[1].year) : T2()
    )
  ]) : w2(v, A(null, +v.month, +v.year)), x2 = (v) => {
    if (Array.isArray(v))
      return v.map((W) => g(W));
    throw new Error(Ft.dateArr("multi-dates"));
  }, le = (v) => {
    if (Array.isArray(v))
      return [$(v[0]), $(v[1])];
    throw new Error(Ft.dateArr("week-picker"));
  }, de = (v) => n.modelAuto ? Array.isArray(v) ? [g(v[0]), g(v[1])] : n.autoApply ? [g(v)] : [g(v), null] : Array.isArray(v) ? E2(() => [
    g(v[0]),
    v[1] ? g(v[1]) : T2()
  ]) : g(v), C = () => {
    Array.isArray(t2.value) && n.range && t2.value.length === 1 && t2.value.push(T2());
  }, N = () => {
    const v = t2.value;
    return [
      r(v[0]),
      v[1] ? r(v[1]) : T2()
    ];
  }, G2 = () => t2.value[1] ? N() : r(Me(t2.value[0])), P = () => (t2.value || []).map((v) => r(v)), Z = () => (C(), n.modelAuto ? G2() : n.multiDates ? P() : Array.isArray(t2.value) ? E2(() => N()) : r(Me(t2.value))), p = (v) => v ? n.timePicker ? J(Me(v)) : n.monthPicker ? ee(Me(v)) : n.yearPicker ? B2(Me(v)) : n.multiDates ? x2(Me(v)) : n.weekPicker ? le(Me(v)) : de(Me(v)) : null, q2 = (v) => {
    const W = p(v);
    U(Me(W)) ? (t2.value = Me(W), o()) : (t2.value = null, M3.value = "");
  }, j = () => {
    var W;
    const v = (se) => {
      var Ne;
      return format(se, (Ne = c2.value.textInputOptions) == null ? void 0 : Ne.format);
    };
    return `${v(t2.value[0])} ${(W = c2.value.textInputOptions) == null ? void 0 : W.rangeSeparator} ${t2.value[1] ? v(t2.value[1]) : ""}`;
  }, I2 = () => {
    var v;
    return a3.value && t2.value ? Array.isArray(t2.value) ? j() : format(t2.value, (v = c2.value.textInputOptions) == null ? void 0 : v.format) : y3(t2.value);
  }, l = () => {
    var v;
    return t2.value ? n.multiDates ? t2.value.map((W) => y3(W)).join("; ") : n.textInput && typeof ((v = c2.value.textInputOptions) == null ? void 0 : v.format) == "string" ? I2() : y3(t2.value) : "";
  }, o = () => {
    !n.format || typeof n.format == "string" ? M3.value = l() : M3.value = n.format(t2.value);
  }, g = (v) => {
    if (n.utc) {
      const W = new Date(v);
      return n.utc === "preserve" ? new Date(W.getTime() + W.getTimezoneOffset() * 6e4) : W;
    }
    return n.modelType ? n.modelType === "date" || n.modelType === "timestamp" ? f(new Date(v)) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? parse(v, _(), /* @__PURE__ */ new Date()) : f(parse(v, n.modelType, /* @__PURE__ */ new Date())) : f(new Date(v));
  }, r = (v) => v ? n.utc ? ma(v, n.utc === "preserve") : n.modelType ? n.modelType === "timestamp" ? +s3(v) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? y3(s3(v)) : y3(s3(v), n.modelType) : s3(v) : "", k2 = (v) => {
    e2("update:model-value", v);
  }, Y2 = (v) => Array.isArray(t2.value) ? n.multiDates ? t2.value.map((W) => v(W)) : [
    v(t2.value[0]),
    t2.value[1] ? v(t2.value[1]) : T2()
  ] : v(Me(t2.value)), R2 = (v) => k2(Me(Y2(v)));
  return {
    inputValue: M3,
    internalModelValue: t2,
    checkBeforeEmit: () => t2.value ? n.range ? n.partialRange ? t2.value.length >= 1 : t2.value.length === 2 : !!t2.value : false,
    parseExternalModelValue: q2,
    formatInputValue: o,
    emitModelValue: () => (o(), n.monthPicker ? R2(z2) : n.timePicker ? R2(H3) : n.yearPicker ? R2(getYear) : n.weekPicker ? k2(t2.value) : k2(Z()))
  };
};
var tr = (e2, n) => {
  const { validateMonthYearInRange: a3, validateMaxDate: t2, validateMinDate: s3, defaults: f } = Ee(e2), y3 = (A, c2) => {
    let M3 = A;
    return f.value.filters.months.includes(getMonth(M3)) ? (M3 = c2 ? addMonths(A, 1) : subMonths(A, 1), y3(M3, c2)) : M3;
  }, _ = (A, c2) => {
    let M3 = A;
    return f.value.filters.years.includes(getYear(M3)) ? (M3 = c2 ? addYears(A, 1) : subYears(A, 1), _(M3, c2)) : M3;
  }, E2 = (A) => {
    const c2 = set(/* @__PURE__ */ new Date(), { month: e2.month, year: e2.year });
    let M3 = A ? addMonths(c2, 1) : subMonths(c2, 1), te = getMonth(M3), H3 = getYear(M3);
    f.value.filters.months.includes(te) && (M3 = y3(M3, A), te = getMonth(M3), H3 = getYear(M3)), f.value.filters.years.includes(H3) && (M3 = _(M3, A), H3 = getYear(M3)), a3(te, H3, A, e2.preventMinMaxNavigation) && T2(te, H3);
  }, T2 = (A, c2) => {
    n("update-month-year", { month: A, year: c2 });
  }, U = computed(() => (A) => {
    if (!e2.preventMinMaxNavigation || A && !e2.maxDate || !A && !e2.minDate)
      return false;
    const c2 = set(/* @__PURE__ */ new Date(), { month: e2.month, year: e2.year }), M3 = A ? addMonths(c2, 1) : subMonths(c2, 1), te = [getMonth(M3), getYear(M3)];
    return A ? !t2(...te) : !s3(...te);
  });
  return { handleMonthYearChange: E2, isDisabled: U, updateMonthYear: T2 };
};
var It = ((e2) => (e2.center = "center", e2.left = "left", e2.right = "right", e2))(It || {});
var nr = (e2, n, a3, t2) => {
  const s3 = ref({
    top: "0",
    left: "0",
    transform: "none"
  }), f = ref(false), y3 = toRef(t2, "teleportCenter");
  watch(y3, () => {
    H3();
  });
  const _ = (C) => {
    if (t2.teleport) {
      const N = C.getBoundingClientRect();
      return {
        left: N.left + window.scrollX,
        top: N.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, E2 = (C, N) => {
    s3.value.left = `${C + N}px`, s3.value.transform = "translateX(-100%)";
  }, T2 = (C) => {
    s3.value.left = `${C}px`, s3.value.transform = "translateX(0)";
  }, U = (C, N, G2 = false) => {
    t2.position === It.left && T2(C), t2.position === It.right && E2(C, N), t2.position === It.center && (s3.value.left = `${C + N / 2}px`, s3.value.transform = G2 ? "translate(-50%, -50%)" : "translateX(-50%)");
  }, A = (C) => {
    const { width: N, height: G2 } = C.getBoundingClientRect(), { top: P, left: Z } = t2.altPosition ? t2.altPosition(C) : _(C);
    return { top: +P, left: +Z, width: N, height: G2 };
  }, c2 = () => {
    const C = $e(n);
    if (C) {
      const { top: N, left: G2, width: P, height: Z } = A(C);
      s3.value.top = `${N + Z / 2}px`, s3.value.transform = "translateY(-50%)", U(G2, P, true);
    }
  }, M3 = () => {
    s3.value.left = "50%", s3.value.top = "50%", s3.value.transform = "translate(-50%, -50%)", s3.value.position = "fixed";
  }, te = () => {
    const C = $e(n), { top: N, left: G2, transform: P } = t2.altPosition(C);
    s3.value = { top: `${N}px`, left: `${G2}px`, transform: P || "" };
  }, H3 = (C = true) => {
    if (!t2.inline)
      return y3.value ? M3() : t2.altPosition !== null ? te() : (C && a3("recalculate-position"), x2());
  }, z2 = ({
    inputEl: C,
    menuEl: N,
    left: G2,
    width: P
  }) => {
    window.screen.width > 768 && U(G2, P), J(C, N);
  }, B2 = (C, N) => {
    const { top: G2, left: P, height: Z, width: p } = A(C);
    s3.value.top = `${Z + G2 + +t2.offset}px`, z2({ inputEl: C, menuEl: N, left: P, width: p }), f.value = false;
  }, w2 = (C, N) => {
    const { top: G2, left: P, width: Z } = A(C), { height: p } = N.getBoundingClientRect();
    s3.value.top = `${G2 - p - +t2.offset}px`, z2({ inputEl: C, menuEl: N, left: P, width: Z }), f.value = true;
  }, J = (C, N) => {
    if (t2.autoPosition) {
      const { left: G2, width: P } = A(C), { left: Z, right: p } = N.getBoundingClientRect();
      return Z <= 0 || Z <= G2 ? T2(G2) : p >= document.documentElement.clientWidth ? E2(G2, P) : U(G2, P);
    }
  }, ee = (C, N) => {
    const { height: G2 } = N.getBoundingClientRect(), { top: P, height: Z } = C.getBoundingClientRect(), q2 = window.innerHeight - P - Z, j = P;
    return G2 <= q2 ? B2(C, N) : G2 > q2 && G2 <= j ? w2(C, N) : q2 >= j ? B2(C, N) : w2(C, N);
  }, x2 = () => {
    const C = $e(n), N = $e(e2);
    if (C && N)
      return t2.autoPosition ? ee(C, N) : B2(C, N);
  }, le = function(C) {
    if (C) {
      const N = C.scrollHeight > C.clientHeight, P = window.getComputedStyle(C).overflowY.indexOf("hidden") !== -1;
      return N && !P;
    }
    return true;
  }, de = function(C) {
    return !C || C === document.body || C.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : le(C) ? C : de(C.parentNode);
  };
  return { openOnTop: f, menuPosition: s3, setMenuPosition: H3, setInitialPosition: c2, getScrollableParent: de };
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
  monthYear: () => vt.filter((e2) => e2.use.includes("month-year")),
  input: () => ar,
  timePicker: () => vt.filter((e2) => e2.use.includes("time")),
  action: () => vt.filter((e2) => e2.use.includes("action")),
  calendar: () => vt.filter((e2) => e2.use.includes("calendar")),
  menu: () => vt.filter((e2) => e2.use.includes("menu"))
};
var it = (e2, n, a3) => {
  const t2 = [];
  return rr[n]().forEach((s3) => {
    e2[s3.name] && t2.push(s3.name);
  }), a3 && a3.length && a3.forEach((s3) => {
    s3.slot && t2.push(s3.slot);
  }), t2;
};
var Ut = (e2) => ({ transitionName: computed(() => (a3) => e2 && typeof e2 != "boolean" ? a3 ? e2.open : e2.close : ""), showTransition: !!e2 });
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
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { getDefaultPattern: s3, isValidDate: f, defaults: y3, getDefaultStartTime: _, assignDefaultTime: E2 } = Ee(t2), T2 = ref(), U = ref(null), A = ref(false), c2 = ref(false), M3 = computed(
      () => ({
        dp__pointer: !t2.disabled && !t2.readonly && !t2.textInput,
        dp__disabled: t2.disabled,
        dp__input_readonly: !t2.textInput,
        dp__input: true,
        dp__input_icon_pad: !t2.hideInputIcon,
        dp__input_valid: t2.state,
        dp__input_invalid: t2.state === false,
        dp__input_focus: A.value || t2.isMenuOpen,
        dp__input_reg: !t2.textInput,
        [t2.inputClassName]: !!t2.inputClassName
      })
    ), te = () => {
      a3("set-input-date", null), t2.autoApply && (a3("set-empty-date"), T2.value = null);
    }, H3 = (p) => {
      var j;
      const q2 = _();
      return va(
        p,
        ((j = y3.value.textInputOptions) == null ? void 0 : j.format) || s3(),
        q2 || E2({}),
        t2.inputValue,
        c2.value
      );
    }, z2 = (p) => {
      const { rangeSeparator: q2 } = y3.value.textInputOptions, [j, I2] = p.split(`${q2}`);
      if (j) {
        const l = H3(j.trim()), o = I2 ? H3(I2.trim()) : null, g = l && o ? [l, o] : [l];
        T2.value = l ? g : null;
      }
    }, B2 = () => {
      c2.value = true;
    }, w2 = (p) => {
      if (t2.range)
        z2(p);
      else if (t2.multiDates) {
        const q2 = p.split(";");
        T2.value = q2.map((j) => H3(j.trim())).filter((j) => j);
      } else
        T2.value = H3(p);
    }, J = (p) => {
      var j;
      const { value: q2 } = p.target;
      q2 !== "" ? ((j = y3.value.textInputOptions) != null && j.openMenu && !t2.isMenuOpen && a3("open"), w2(q2), a3("set-input-date", T2.value)) : te(), c2.value = false, a3("update:input-value", q2);
    }, ee = () => {
      var p, q2;
      (p = y3.value.textInputOptions) != null && p.enterSubmit && f(T2.value) && t2.inputValue !== "" ? (a3("set-input-date", T2.value, true), T2.value = null) : (q2 = y3.value.textInputOptions) != null && q2.enterSubmit && t2.inputValue === "" && (T2.value = null, a3("clear"));
    }, x2 = () => {
      var p, q2;
      (p = y3.value.textInputOptions) != null && p.tabSubmit && f(T2.value) && t2.inputValue !== "" ? (a3("set-input-date", T2.value, true), T2.value = null) : (q2 = y3.value.textInputOptions) != null && q2.tabSubmit && t2.inputValue === "" && (T2.value = null, a3("clear"));
    }, le = () => {
      A.value = true, a3("focus");
    }, de = (p) => {
      var q2;
      p.preventDefault(), p.stopImmediatePropagation(), p.stopPropagation(), t2.textInput && ((q2 = y3.value.textInputOptions) != null && q2.openMenu) && !t2.inlineWithInput ? t2.isMenuOpen ? y3.value.textInputOptions.enterSubmit && a3("select-date") : a3("open") : t2.textInput || a3("toggle");
    }, C = () => {
      A.value = false, t2.isMenuOpen || a3("blur"), t2.autoApply && t2.textInput && T2.value && (a3("set-input-date", T2.value), a3("select-date"), T2.value = null);
    }, N = () => {
      a3("clear");
    }, G2 = (p) => {
      if (!t2.textInput) {
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
        T2.value = p;
      }
    }), (p, q2) => {
      var j;
      return openBlock(), createElementBlock("div", {
        onClick: de,
        "aria-label": (j = unref(y3).ariaLabels) == null ? void 0 : j.input,
        role: "textbox",
        "aria-multiline": "false",
        "aria-disabled": p.disabled,
        "aria-readonly": p.readonly
      }, [
        p.$slots.trigger && !p.$slots["dp-input"] && !p.inline ? renderSlot(p.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !p.$slots.trigger && (!p.inline || p.inlineWithInput) ? (openBlock(), createElementBlock("div", or, [
          p.$slots["dp-input"] && !p.$slots.trigger && !p.inline ? renderSlot(p.$slots, "dp-input", {
            key: 0,
            value: e2.inputValue,
            onInput: J,
            onEnter: ee,
            onTab: x2,
            onClear: N,
            onBlur: C
          }) : createCommentVNode("", true),
          p.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            ref_key: "inputRef",
            ref: U,
            id: p.uid ? `dp-input-${p.uid}` : void 0,
            name: p.name,
            class: normalizeClass(unref(M3)),
            inputmode: p.textInput ? "text" : "none",
            placeholder: p.placeholder,
            disabled: p.disabled,
            readonly: p.readonly,
            required: p.required,
            value: e2.inputValue,
            autocomplete: p.autocomplete,
            onInput: J,
            onKeydown: [
              withKeys(de, ["enter"]),
              withKeys(x2, ["tab"]),
              G2
            ],
            onBlur: C,
            onFocus: le,
            onKeypress: G2,
            onPaste: B2
          }, null, 42, sr)),
          p.$slots["input-icon"] && !p.hideInputIcon ? (openBlock(), createElementBlock("span", ir, [
            renderSlot(p.$slots, "input-icon")
          ])) : createCommentVNode("", true),
          !p.$slots["input-icon"] && !p.hideInputIcon && !p.$slots["dp-input"] ? (openBlock(), createBlock(unref(Lt), {
            key: 3,
            class: "dp__input_icon dp__input_icons"
          })) : createCommentVNode("", true),
          p.$slots["clear-icon"] && e2.inputValue && p.clearable && !p.disabled && !p.readonly ? (openBlock(), createElementBlock("span", ur, [
            renderSlot(p.$slots, "clear-icon", { clear: N })
          ])) : createCommentVNode("", true),
          p.clearable && !p.$slots["clear-icon"] && e2.inputValue && !p.disabled && !p.readonly ? (openBlock(), createBlock(unref(fa), {
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
  setup(e2, { emit: n }) {
    const a3 = e2, { formatDate: t2, isValidTime: s3, defaults: f } = Ee(a3), { buildMatrix: y3 } = nt(), _ = ref(null), E2 = ref(null);
    onMounted(() => {
      a3.arrowNavigation && y3([$e(_), $e(E2)], "actionRow");
    });
    const T2 = computed(() => a3.range && !a3.partialRange && a3.internalModelValue ? a3.internalModelValue.length === 2 : true), U = computed(() => !A.value || !c2.value || !T2.value), A = computed(() => !a3.enableTimePicker || a3.ignoreTimeValidation ? true : s3(a3.internalModelValue)), c2 = computed(() => a3.monthPicker ? a3.range && Array.isArray(a3.internalModelValue) ? !a3.internalModelValue.filter((J) => !z2(J)).length : z2(a3.internalModelValue) : true), M3 = () => {
      const w2 = f.value.previewFormat;
      return a3.timePicker || a3.monthPicker, w2(Me(a3.internalModelValue));
    }, te = () => {
      const w2 = a3.internalModelValue;
      return f.value.multiCalendars > 0 ? `${t2(w2[0])} - ${t2(w2[1])}` : [t2(w2[0]), t2(w2[1])];
    }, H3 = computed(() => !a3.internalModelValue || !a3.menuMount ? "" : typeof f.value.previewFormat == "string" ? Array.isArray(a3.internalModelValue) ? a3.internalModelValue.length === 2 && a3.internalModelValue[1] ? te() : a3.multiDates ? a3.internalModelValue.map((w2) => `${t2(w2)}`) : a3.modelAuto ? `${t2(a3.internalModelValue[0])}` : `${t2(a3.internalModelValue[0])} -` : t2(a3.internalModelValue) : M3()), z2 = (w2) => {
      if (!a3.monthPicker)
        return true;
      let J = true;
      const ee = $(pt(w2));
      if (a3.minDate && a3.maxDate) {
        const x2 = $(pt(a3.minDate)), le = $(pt(a3.maxDate));
        return Be(ee, x2) && _e(ee, le) || ve(ee, x2) || ve(ee, le);
      }
      if (a3.minDate) {
        const x2 = $(pt(a3.minDate));
        J = Be(ee, x2) || ve(ee, x2);
      }
      if (a3.maxDate) {
        const x2 = $(pt(a3.maxDate));
        J = _e(ee, x2) || ve(ee, x2);
      }
      return J;
    }, B2 = () => {
      A.value && c2.value && T2.value ? n("select-date") : n("invalid-select");
    };
    return (w2, J) => (openBlock(), createElementBlock("div", {
      class: "dp__action_row",
      style: normalizeStyle(e2.calendarWidth ? { width: `${e2.calendarWidth}px` } : {})
    }, [
      w2.$slots["action-row"] ? renderSlot(w2.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: e2.internalModelValue,
        disabled: unref(U),
        selectDate: () => w2.$emit("select-date"),
        closePicker: () => w2.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        createBaseVNode("div", {
          class: "dp__selection_preview",
          title: Array.isArray(unref(H3)) ? "" : unref(H3)
        }, [
          w2.$slots["action-preview"] ? renderSlot(w2.$slots, "action-preview", {
            key: 0,
            value: e2.internalModelValue
          }) : createCommentVNode("", true),
          w2.$slots["action-preview"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            Array.isArray(unref(H3)) ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(toDisplayString(unref(H3)), 1)
            ], 64)),
            Array.isArray(unref(H3)) ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(unref(H3), (ee, x2) => (openBlock(), createElementBlock("div", { key: x2 }, toDisplayString(ee), 1))), 128)) : createCommentVNode("", true)
          ], 64))
        ], 8, cr),
        createBaseVNode("div", fr, [
          w2.$slots["action-select"] ? renderSlot(w2.$slots, "action-select", {
            key: 0,
            value: e2.internalModelValue
          }) : createCommentVNode("", true),
          w2.$slots["action-select"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            w2.inline ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
              key: 0,
              ref_key: "cancelButtonRef",
              ref: _,
              class: "dp__action_button dp__action_cancel",
              onClick: J[0] || (J[0] = (ee) => w2.$emit("close-picker")),
              onKeydown: [
                J[1] || (J[1] = withKeys((ee) => w2.$emit("close-picker"), ["enter"])),
                J[2] || (J[2] = withKeys((ee) => w2.$emit("close-picker"), ["space"]))
              ]
            }, toDisplayString(w2.cancelText), 545)),
            createBaseVNode("button", {
              class: "dp__action_button dp__action_select",
              onKeydown: [
                withKeys(B2, ["enter"]),
                withKeys(B2, ["space"])
              ],
              onClick: B2,
              disabled: unref(U),
              "data-test": "select-button",
              ref_key: "selectButtonRef",
              ref: E2
            }, toDisplayString(w2.selectText), 41, vr)
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
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { buildMultiLevelMatrix: s3 } = nt(), { setDateMonthOrYear: f, defaults: y3 } = Ee(t2), _ = ref(null), E2 = ref({
      bottom: "",
      left: "",
      transform: ""
    }), T2 = ref([]), U = ref(null), A = ref(true), c2 = ref(""), M3 = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), te = ref([]), H3 = ref({ left: "50%" }), z2 = computed(() => t2.dayNames ? Array.isArray(t2.dayNames) ? t2.dayNames : t2.dayNames(t2.locale, +t2.weekStart) : Ha(t2.locale, +t2.weekStart));
    onMounted(() => {
      a3("mount", { cmp: "calendar", refs: T2 }), t2.noSwipe || U.value && (U.value.addEventListener("touchstart", P, { passive: false }), U.value.addEventListener("touchend", Z, { passive: false }), U.value.addEventListener("touchmove", p, { passive: false })), t2.monthChangeOnScroll && U.value && U.value.addEventListener("wheel", I2, { passive: false });
    });
    const B2 = (l) => l ? t2.vertical ? "vNext" : "next" : t2.vertical ? "vPrevious" : "previous", w2 = (l, o) => {
      if (t2.transitions) {
        const g = Ue(f($(), t2.month, t2.year));
        c2.value = Be(Ue(f($(), l, o)), g) ? y3.value.transitions[B2(true)] : y3.value.transitions[B2(false)], A.value = false, nextTick(() => {
          A.value = true;
        });
      }
    }, J = computed(
      () => ({
        dp__calendar_wrap: true,
        [t2.calendarClassName]: !!t2.calendarClassName
      })
    ), ee = computed(() => (l) => {
      const o = Ka(l);
      return {
        dp__marker_dot: o.type === "dot",
        dp__marker_line: o.type === "line"
      };
    }), x2 = computed(() => (l) => ve(l, _.value)), le = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: y3.value.multiCalendars > 0 && t2.instance !== 0
    })), de = computed(() => (l) => t2.hideOffsetDates ? l.current : true), C = computed(() => t2.specificMode ? { height: `${t2.modeHeight}px` } : void 0), N = async (l, o, g) => {
      var r, k2;
      if (a3("set-hover-date", l), (k2 = (r = l.marker) == null ? void 0 : r.tooltip) != null && k2.length) {
        const Y2 = $e(T2.value[o][g]);
        if (Y2) {
          const { width: R2, height: m3 } = Y2.getBoundingClientRect();
          _.value = l.value;
          let b2 = { left: `${R2 / 2}px` }, v = -50;
          if (await nextTick(), te.value[0]) {
            const { left: W, width: se } = te.value[0].getBoundingClientRect();
            W < 0 && (b2 = { left: "0" }, v = 0, H3.value.left = `${R2 / 2}px`), window.innerWidth < W + se && (b2 = { right: "0" }, v = 0, H3.value.left = `${se - R2 / 2}px`);
          }
          E2.value = {
            bottom: `${m3}px`,
            ...b2,
            transform: `translateX(${v}%)`
          }, a3("tooltip-open", l.marker);
        }
      }
    }, G2 = (l) => {
      _.value && (_.value = null, E2.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a3("tooltip-close", l.marker));
    }, P = (l) => {
      M3.value.startX = l.changedTouches[0].screenX, M3.value.startY = l.changedTouches[0].screenY;
    }, Z = (l) => {
      M3.value.endX = l.changedTouches[0].screenX, M3.value.endY = l.changedTouches[0].screenY, q2();
    }, p = (l) => {
      t2.vertical && !t2.inline && l.preventDefault();
    }, q2 = () => {
      const l = t2.vertical ? "Y" : "X";
      Math.abs(M3.value[`start${l}`] - M3.value[`end${l}`]) > 10 && a3("handle-swipe", M3.value[`start${l}`] > M3.value[`end${l}`] ? "right" : "left");
    }, j = (l, o, g) => {
      l && (Array.isArray(T2.value[o]) ? T2.value[o][g] = l : T2.value[o] = [l]), t2.arrowNavigation && s3(T2.value, "calendar");
    }, I2 = (l) => {
      t2.monthChangeOnScroll && (l.preventDefault(), a3("handle-scroll", l));
    };
    return n({ triggerTransition: w2 }), (l, o) => {
      var g;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(le))
      }, [
        createBaseVNode("div", {
          style: normalizeStyle(unref(C))
        }, [
          e2.specificMode ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
            key: 0,
            ref_key: "calendarWrapRef",
            ref: U,
            class: normalizeClass(unref(J)),
            role: "grid",
            "aria-label": (g = unref(y3).ariaLabels) == null ? void 0 : g.calendarWrap
          }, [
            createBaseVNode("div", gr, [
              l.weekNumbers ? (openBlock(), createElementBlock("div", hr, toDisplayString(l.weekNumName), 1)) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(z2), (r, k2) => (openBlock(), createElementBlock("div", {
                class: "dp__calendar_header_item",
                role: "gridcell",
                key: k2,
                "data-test": "calendar-header"
              }, [
                l.$slots["calendar-header"] ? renderSlot(l.$slots, "calendar-header", {
                  key: 0,
                  day: r,
                  index: k2
                }) : createCommentVNode("", true),
                l.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(r), 1)
                ], 64))
              ]))), 128))
            ]),
            pr,
            createVNode(Transition, {
              name: c2.value,
              css: !!l.transitions
            }, {
              default: withCtx(() => {
                var r;
                return [
                  A.value ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "dp__calendar",
                    role: "grid",
                    "aria-label": (r = unref(y3).ariaLabels) == null ? void 0 : r.calendarDays
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(e2.mappedDates, (k2, Y2) => (openBlock(), createElementBlock("div", {
                      class: "dp__calendar_row",
                      role: "row",
                      key: Y2
                    }, [
                      l.weekNumbers ? (openBlock(), createElementBlock("div", wr, [
                        createBaseVNode("div", br, toDisplayString(e2.getWeekNum(k2.days)), 1)
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(k2.days, (R2, m3) => {
                        var b2, v, W;
                        return openBlock(), createElementBlock("div", {
                          role: "gridcell",
                          class: "dp__calendar_item",
                          ref_for: true,
                          ref: (se) => j(se, Y2, m3),
                          key: m3 + Y2,
                          "aria-selected": R2.classData.dp__active_date || R2.classData.dp__range_start || R2.classData.dp__range_start,
                          "aria-disabled": R2.classData.dp__cell_disabled,
                          "aria-label": (v = (b2 = unref(y3).ariaLabels) == null ? void 0 : b2.day) == null ? void 0 : v.call(b2, R2),
                          tabindex: "0",
                          "data-test": R2.value,
                          onClick: withModifiers((se) => l.$emit("select-date", R2), ["stop", "prevent"]),
                          onKeydown: [
                            withKeys((se) => l.$emit("select-date", R2), ["enter"]),
                            withKeys((se) => l.$emit("handle-space", R2), ["space"])
                          ],
                          onMouseenter: (se) => N(R2, Y2, m3),
                          onMouseleave: (se) => G2(R2)
                        }, [
                          createBaseVNode("div", {
                            class: normalizeClass(["dp__cell_inner", R2.classData])
                          }, [
                            l.$slots.day && unref(de)(R2) ? renderSlot(l.$slots, "day", {
                              key: 0,
                              day: +R2.text,
                              date: R2.value
                            }) : createCommentVNode("", true),
                            l.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createTextVNode(toDisplayString(R2.text), 1)
                            ], 64)),
                            R2.marker && unref(de)(R2) ? (openBlock(), createElementBlock("div", {
                              key: 2,
                              class: normalizeClass(unref(ee)(R2.marker)),
                              style: normalizeStyle(R2.marker.color ? { backgroundColor: R2.marker.color } : {})
                            }, null, 6)) : createCommentVNode("", true),
                            unref(x2)(R2.value) ? (openBlock(), createElementBlock("div", {
                              key: 3,
                              class: "dp__marker_tooltip",
                              ref_for: true,
                              ref_key: "activeTooltip",
                              ref: te,
                              style: normalizeStyle(E2.value)
                            }, [
                              (W = R2.marker) != null && W.tooltip ? (openBlock(), createElementBlock("div", {
                                key: 0,
                                class: "dp__tooltip_content",
                                onClick: o[0] || (o[0] = withModifiers(() => {
                                }, ["stop"]))
                              }, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(R2.marker.tooltip, (se, Ne) => (openBlock(), createElementBlock("div", {
                                  key: Ne,
                                  class: "dp__tooltip_text"
                                }, [
                                  l.$slots["marker-tooltip"] ? renderSlot(l.$slots, "marker-tooltip", {
                                    key: 0,
                                    tooltip: se,
                                    day: R2.value
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
                                  style: normalizeStyle(H3.value)
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
  setup(e2, { emit: n }) {
    const a3 = ref(null);
    return onMounted(() => n("set-ref", a3)), (t2, s3) => (openBlock(), createElementBlock("div", {
      class: "dp__month_year_col_nav",
      onClick: s3[0] || (s3[0] = (f) => t2.$emit("activate")),
      onKeydown: [
        s3[1] || (s3[1] = withKeys((f) => t2.$emit("activate"), ["enter"])),
        s3[2] || (s3[2] = withKeys((f) => t2.$emit("activate"), ["space"]))
      ],
      tabindex: "0",
      role: "button",
      "aria-label": e2.ariaLabel,
      "aria-disabled": e2.disabled,
      ref_key: "elRef",
      ref: a3
    }, [
      createBaseVNode("div", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: e2.disabled }])
      }, [
        renderSlot(t2.$slots, "default")
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
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { setSelectionGrid: s3, buildMultiLevelMatrix: f, setMonthPicker: y3 } = nt(), { hideNavigationButtons: _ } = Ee(t2), E2 = ref(false), T2 = ref(null), U = ref(null), A = ref([]), c2 = ref(), M3 = ref(null), te = ref(0), H3 = ref(null);
    onBeforeUpdate(() => {
      T2.value = null;
    }), onMounted(() => {
      nextTick().then(() => N()), B2(), z2(true);
    }), onUnmounted(() => z2(false));
    const z2 = (I2) => {
      var l;
      t2.arrowNavigation && ((l = t2.headerRefs) != null && l.length ? y3(I2) : s3(I2));
    }, B2 = () => {
      const I2 = $e(U);
      I2 && (t2.textInput || I2.focus({ preventScroll: true }), E2.value = I2.clientHeight < I2.scrollHeight);
    }, w2 = computed(
      () => ({
        dp__overlay: true
      })
    ), J = computed(() => ({
      dp__overlay_col: true
    })), ee = (I2) => t2.skipActive ? false : I2.value === t2.modelValue, x2 = computed(() => t2.items.map((I2) => I2.filter((l) => l).map((l) => {
      var r, k2, Y2;
      const o = t2.disabledValues.some((R2) => R2 === l.value) || C(l.value), g = (r = t2.multiModelValue) != null && r.length ? (k2 = t2.multiModelValue) == null ? void 0 : k2.some(
        (R2) => ve(
          R2,
          setYear(
            t2.monthPicker ? setMonth(/* @__PURE__ */ new Date(), l.value) : /* @__PURE__ */ new Date(),
            t2.monthPicker ? t2.year : l.value
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
          dp__cell_in_between: (Y2 = t2.multiModelValue) != null && Y2.length && t2.skipActive ? P(l.value) : false
        }
      };
    }))), le = computed(
      () => ({
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: E2.value,
        dp__button_bottom: t2.autoApply
      })
    ), de = computed(() => {
      var I2, l;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((I2 = t2.items) == null ? void 0 : I2.length) <= 6,
        dp__container_block: ((l = t2.items) == null ? void 0 : l.length) > 6
      };
    }), C = (I2) => {
      const l = t2.maxValue || t2.maxValue === 0, o = t2.minValue || t2.minValue === 0;
      return !l && !o ? false : l && o ? +I2 > +t2.maxValue || +I2 < +t2.minValue : l ? +I2 > +t2.maxValue : o ? +I2 < +t2.minValue : false;
    }, N = () => {
      const I2 = $e(T2), l = $e(U), o = $e(M3), g = $e(H3), r = o ? o.getBoundingClientRect().height : 0;
      l && (te.value = l.getBoundingClientRect().height - r), I2 && g && (g.scrollTop = I2.offsetTop - g.offsetTop - (te.value / 2 - I2.getBoundingClientRect().height) - r);
    }, G2 = (I2) => {
      !t2.disabledValues.some((l) => l === I2) && !C(I2) && (a3("update:model-value", I2), a3("selected"));
    }, P = (I2) => {
      const l = t2.monthPicker ? t2.year : I2;
      return xn(
        t2.multiModelValue,
        setYear(
          t2.monthPicker ? setMonth(/* @__PURE__ */ new Date(), c2.value || 0) : /* @__PURE__ */ new Date(),
          t2.monthPicker ? l : c2.value || l
        ),
        setYear(t2.monthPicker ? setMonth(/* @__PURE__ */ new Date(), I2) : /* @__PURE__ */ new Date(), l)
      );
    }, Z = () => {
      a3("toggle"), a3("reset-flow");
    }, p = () => {
      t2.escClose && Z();
    }, q2 = (I2, l, o, g) => {
      I2 && (l.value === +t2.modelValue && !t2.disabledValues.includes(l.value) && (T2.value = I2), t2.arrowNavigation && (Array.isArray(A.value[o]) ? A.value[o][g] = I2 : A.value[o] = [I2], j()));
    }, j = () => {
      var l, o;
      const I2 = (l = t2.headerRefs) != null && l.length ? [t2.headerRefs].concat(A.value) : A.value.concat([t2.skipButtonRef ? [] : [M3.value]]);
      f(Me(I2), (o = t2.headerRefs) != null && o.length ? "monthPicker" : "selectionGrid");
    };
    return n({ focusGrid: B2 }), (I2, l) => {
      var o;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: U,
        class: normalizeClass(unref(w2)),
        role: "dialog",
        tabindex: "0",
        onKeydown: withKeys(p, ["esc"])
      }, [
        createBaseVNode("div", {
          class: normalizeClass(unref(de)),
          ref_key: "containerRef",
          ref: H3,
          role: "grid",
          style: normalizeStyle({ height: `${te.value}px` })
        }, [
          createBaseVNode("div", Ar, [
            renderSlot(I2.$slots, "header")
          ]),
          I2.$slots.overlay ? renderSlot(I2.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(unref(x2), (g, r) => (openBlock(), createElementBlock("div", {
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: unref(x2).length >= 3 }]),
            key: r,
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(g, (k2, Y2) => (openBlock(), createElementBlock("div", {
              role: "gridcell",
              class: normalizeClass(unref(J)),
              key: k2.value,
              "aria-selected": k2.value === e2.modelValue && !e2.disabledValues.includes(k2.value),
              "aria-disabled": k2.className.dp__overlay_cell_disabled,
              ref_for: true,
              ref: (R2) => q2(R2, k2, r, Y2),
              tabindex: "0",
              "data-test": k2.text,
              onClick: (R2) => G2(k2.value),
              onKeydown: [
                withKeys((R2) => G2(k2.value), ["enter"]),
                withKeys((R2) => G2(k2.value), ["space"])
              ],
              onMouseover: (R2) => c2.value = k2.value
            }, [
              createBaseVNode("div", {
                class: normalizeClass(k2.className)
              }, [
                I2.$slots.item ? renderSlot(I2.$slots, "item", {
                  key: 0,
                  item: k2
                }) : createCommentVNode("", true),
                I2.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(k2.text), 1)
                ], 64))
              ], 2)
            ], 42, Sr))), 128))
          ], 2))), 128))
        ], 6),
        I2.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("div", {
          key: 0,
          role: "button",
          "aria-label": (o = e2.ariaLabels) == null ? void 0 : o.toggleOverlay,
          class: normalizeClass(unref(le)),
          tabindex: "0",
          ref_key: "toggleButton",
          ref: M3,
          onClick: Z,
          onKeydown: withKeys(Z, ["enter"])
        }, [
          renderSlot(I2.$slots, "button-icon")
        ], 42, Cr)), [
          [vShow, !unref(_)(e2.type)]
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
  setup(e2, { emit: n }) {
    const a3 = e2, { transitionName: t2, showTransition: s3 } = Ut(a3.transitions), f = ref(null);
    return onMounted(() => n("set-ref", f)), (y3, _) => (openBlock(), createElementBlock(Fragment, null, [
      createBaseVNode("div", {
        class: "dp__month_year_select",
        onClick: _[0] || (_[0] = (E2) => y3.$emit("toggle")),
        onKeydown: [
          _[1] || (_[1] = withKeys((E2) => y3.$emit("toggle"), ["enter"])),
          _[2] || (_[2] = withKeys((E2) => y3.$emit("toggle"), ["space"]))
        ],
        role: "button",
        "aria-label": e2.ariaLabel,
        tabindex: "0",
        ref_key: "elRef",
        ref: f
      }, [
        renderSlot(y3.$slots, "default")
      ], 40, Pr),
      createVNode(Transition, {
        name: unref(t2)(e2.showSelectionGrid),
        css: unref(s3)
      }, {
        default: withCtx(() => [
          e2.showSelectionGrid ? (openBlock(), createBlock(Dt, mergeProps({ key: 0 }, {
            modelValue: e2.modelValue,
            items: e2.items,
            disabledValues: e2.disabledValues,
            minValue: e2.minValue,
            maxValue: e2.maxValue,
            escClose: e2.escClose,
            type: e2.type,
            arrowNavigation: e2.arrowNavigation,
            textInput: e2.textInput,
            autoApply: e2.autoApply,
            ariaLabels: e2.ariaLabels,
            hideNavigation: e2.hideNavigation
          }, {
            "header-refs": [],
            "onUpdate:modelValue": _[3] || (_[3] = (E2) => y3.$emit("update:model-value", E2)),
            onToggle: _[4] || (_[4] = (E2) => y3.$emit("toggle"))
          }), createSlots({
            "button-icon": withCtx(() => [
              y3.$slots["calendar-icon"] ? renderSlot(y3.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
              y3.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Lt), { key: 1 }))
            ]),
            _: 2
          }, [
            y3.$slots[e2.slotName] ? {
              name: "item",
              fn: withCtx(({ item: E2 }) => [
                renderSlot(y3.$slots, e2.slotName, { item: E2 })
              ]),
              key: "0"
            } : void 0,
            y3.$slots[e2.overlaySlot] ? {
              name: "overlay",
              fn: withCtx(() => [
                renderSlot(y3.$slots, e2.overlaySlot)
              ]),
              key: "1"
            } : void 0,
            y3.$slots[`${e2.overlaySlot}-header`] ? {
              name: "header",
              fn: withCtx(() => [
                renderSlot(y3.$slots, `${e2.overlaySlot}-header`)
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
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { defaults: s3 } = Ee(t2), { transitionName: f, showTransition: y3 } = Ut(s3.value.transitions), { buildMatrix: _ } = nt(), { handleMonthYearChange: E2, isDisabled: T2, updateMonthYear: U } = tr(t2, a3), A = ref(false), c2 = ref(false), M3 = ref([null, null, null, null]), te = ref(null), H3 = ref(null), z2 = ref(null);
    onMounted(() => {
      a3("mount");
    });
    const B2 = (m3) => ({
      get: () => t2[m3],
      set: (b2) => {
        const v = m3 === "month" ? "year" : "month";
        a3("update-month-year", { [m3]: b2, [v]: t2[v] }), a3("month-year-select", m3 === "year"), m3 === "month" ? g(true) : r(true);
      }
    }), w2 = computed(B2("month")), J = computed(B2("year")), ee = (m3) => {
      const b2 = getYear($(m3));
      return t2.year === b2;
    }, x2 = computed(() => t2.monthPicker ? Array.isArray(t2.disabledDates) ? t2.disabledDates.map((m3) => $(m3)).filter((m3) => ee(m3)).map((m3) => getMonth(m3)) : [] : []), le = computed(() => (m3) => {
      const b2 = m3 === "month";
      return {
        showSelectionGrid: (b2 ? A : c2).value,
        items: (b2 ? j : I2).value,
        disabledValues: s3.value.filters[b2 ? "months" : "years"].concat(x2.value),
        minValue: (b2 ? G2 : C).value,
        maxValue: (b2 ? P : N).value,
        headerRefs: b2 && t2.monthPicker ? [te.value, H3.value, z2.value] : [],
        escClose: t2.escClose,
        transitions: s3.value.transitions,
        ariaLabels: s3.value.ariaLabels,
        textInput: t2.textInput,
        autoApply: t2.autoApply,
        arrowNavigation: t2.arrowNavigation,
        hideNavigation: t2.hideNavigation
      };
    }), de = computed(() => (m3) => ({
      month: t2.month,
      year: t2.year,
      items: m3 === "month" ? t2.months : t2.years,
      instance: t2.instance,
      updateMonthYear: U,
      toggle: m3 === "month" ? g : r
    })), C = computed(() => t2.minDate ? getYear($(t2.minDate)) : null), N = computed(() => t2.maxDate ? getYear($(t2.maxDate)) : null), G2 = computed(() => {
      if (t2.minDate && C.value) {
        if (C.value > t2.year)
          return 12;
        if (C.value === t2.year)
          return getMonth($(t2.minDate));
      }
      return null;
    }), P = computed(() => t2.maxDate && N.value ? N.value < t2.year ? -1 : N.value === t2.year ? getMonth($(t2.maxDate)) : null : null), Z = computed(() => (t2.range || t2.multiDates) && t2.internalModelValue && (t2.monthPicker || t2.yearPicker) ? t2.internalModelValue : []), p = (m3) => {
      const b2 = [], v = (W) => W;
      for (let W = 0; W < m3.length; W += 3) {
        const se = [m3[W], m3[W + 1], m3[W + 2]];
        b2.push(v(se));
      }
      return b2;
    }, q2 = computed(() => {
      const m3 = t2.months.find((b2) => b2.value === t2.month);
      return m3 || { text: "", value: 0 };
    }), j = computed(() => p(t2.months)), I2 = computed(() => p(t2.years)), l = computed(() => s3.value.multiCalendars ? t2.multiCalendarsSolo ? true : t2.instance === 0 : true), o = computed(() => s3.value.multiCalendars ? t2.multiCalendarsSolo ? true : t2.instance === s3.value.multiCalendars - 1 : true), g = (m3 = false) => {
      k2(m3), A.value = !A.value, A.value || a3("overlay-closed");
    }, r = (m3 = false) => {
      k2(m3), c2.value = !c2.value, c2.value || a3("overlay-closed");
    }, k2 = (m3) => {
      m3 || a3("reset-flow");
    }, Y2 = (m3 = false) => {
      T2.value(m3) || a3("update-month-year", {
        year: m3 ? t2.year + 1 : t2.year - 1,
        month: t2.month,
        fromNav: true
      });
    }, R2 = (m3, b2) => {
      t2.arrowNavigation && (M3.value[b2] = $e(m3), _(M3.value, "monthYear"));
    };
    return n({
      toggleMonthPicker: g,
      toggleYearPicker: r,
      handleMonthYearChange: E2
    }), (m3, b2) => {
      var v, W, se, Ne, Xe;
      return openBlock(), createElementBlock("div", _r, [
        m3.$slots["month-year"] ? renderSlot(m3.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, { month: e2.month, year: e2.year, months: e2.months, years: e2.years, updateMonthYear: unref(U), handleMonthYearChange: unref(E2), instance: e2.instance }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          !m3.monthPicker && !m3.yearPicker ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            unref(l) && !m3.vertical ? (openBlock(), createBlock(rn, {
              key: 0,
              "aria-label": (v = unref(s3).ariaLabels) == null ? void 0 : v.prevMonth,
              disabled: unref(T2)(false),
              onActivate: b2[0] || (b2[0] = (re) => unref(E2)(false)),
              onSetRef: b2[1] || (b2[1] = (re) => R2(re, 0))
            }, {
              default: withCtx(() => [
                m3.$slots["arrow-left"] ? renderSlot(m3.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                m3.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(wn), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
            createBaseVNode("div", Nr, [
              createVNode(Bn, mergeProps({
                type: "month",
                "slot-name": "month-overlay-val",
                "overlay-slot": "overlay-month",
                "aria-label": (W = unref(s3).ariaLabels) == null ? void 0 : W.openMonthsOverlay,
                modelValue: unref(w2),
                "onUpdate:modelValue": b2[2] || (b2[2] = (re) => isRef(w2) ? w2.value = re : null)
              }, unref(le)("month"), {
                onToggle: g,
                onSetRef: b2[3] || (b2[3] = (re) => R2(re, 1))
              }), createSlots({
                default: withCtx(() => [
                  m3.$slots.month ? renderSlot(m3.$slots, "month", normalizeProps(mergeProps({ key: 0 }, unref(q2)))) : createCommentVNode("", true),
                  m3.$slots.month ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(unref(q2).text), 1)
                  ], 64))
                ]),
                _: 2
              }, [
                m3.$slots["calendar-icon"] ? {
                  name: "calendar-icon",
                  fn: withCtx(() => [
                    renderSlot(m3.$slots, "calendar-icon")
                  ]),
                  key: "0"
                } : void 0,
                m3.$slots["month-overlay-value"] ? {
                  name: "month-overlay-val",
                  fn: withCtx(({ item: re }) => [
                    renderSlot(m3.$slots, "month-overlay-value", {
                      text: re.text,
                      value: re.value
                    })
                  ]),
                  key: "1"
                } : void 0,
                m3.$slots["month-overlay"] ? {
                  name: "overlay-month",
                  fn: withCtx(() => [
                    renderSlot(m3.$slots, "month-overlay", normalizeProps(guardReactiveProps(unref(de)("month"))))
                  ]),
                  key: "2"
                } : void 0,
                m3.$slots["month-overlay-header"] ? {
                  name: "overlay-month-header",
                  fn: withCtx(() => [
                    renderSlot(m3.$slots, "month-overlay-header", { toggle: g })
                  ]),
                  key: "3"
                } : void 0
              ]), 1040, ["aria-label", "modelValue"]),
              createVNode(Bn, mergeProps({
                type: "year",
                "slot-name": "year-overlay-val",
                "overlay-slot": "overlay-year",
                "aria-label": (se = unref(s3).ariaLabels) == null ? void 0 : se.openYearsOverlay,
                modelValue: unref(J),
                "onUpdate:modelValue": b2[4] || (b2[4] = (re) => isRef(J) ? J.value = re : null)
              }, unref(le)("year"), {
                onToggle: r,
                onSetRef: b2[5] || (b2[5] = (re) => R2(re, 2))
              }), createSlots({
                default: withCtx(() => [
                  m3.$slots.year ? renderSlot(m3.$slots, "year", {
                    key: 0,
                    year: e2.year
                  }) : createCommentVNode("", true),
                  m3.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(e2.year), 1)
                  ], 64))
                ]),
                _: 2
              }, [
                m3.$slots["calendar-icon"] ? {
                  name: "calendar-icon",
                  fn: withCtx(() => [
                    renderSlot(m3.$slots, "calendar-icon")
                  ]),
                  key: "0"
                } : void 0,
                m3.$slots["year-overlay-value"] ? {
                  name: "year-overlay-val",
                  fn: withCtx(({ item: re }) => [
                    renderSlot(m3.$slots, "year-overlay-value", {
                      text: re.text,
                      value: re.value
                    })
                  ]),
                  key: "1"
                } : void 0,
                m3.$slots["year-overlay"] ? {
                  name: "overlay-year",
                  fn: withCtx(() => [
                    renderSlot(m3.$slots, "year-overlay", normalizeProps(guardReactiveProps(unref(de)("year"))))
                  ]),
                  key: "2"
                } : void 0,
                m3.$slots["year-overlay-header"] ? {
                  name: "overlay-year-header",
                  fn: withCtx(() => [
                    renderSlot(m3.$slots, "year-overlay-header", { toggle: r })
                  ]),
                  key: "3"
                } : void 0
              ]), 1040, ["aria-label", "modelValue"])
            ]),
            unref(l) && m3.vertical ? (openBlock(), createBlock(rn, {
              key: 1,
              "aria-label": (Ne = unref(s3).ariaLabels) == null ? void 0 : Ne.prevMonth,
              disabled: unref(T2)(false),
              onActivate: b2[6] || (b2[6] = (re) => unref(E2)(false))
            }, {
              default: withCtx(() => [
                m3.$slots["arrow-up"] ? renderSlot(m3.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                m3.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wn), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
            unref(o) ? (openBlock(), createBlock(rn, {
              key: 2,
              ref: "rightIcon",
              disabled: unref(T2)(true),
              "aria-label": (Xe = unref(s3).ariaLabels) == null ? void 0 : Xe.nextMonth,
              onActivate: b2[7] || (b2[7] = (re) => unref(E2)(true)),
              onSetRef: b2[8] || (b2[8] = (re) => R2(re, 3))
            }, {
              default: withCtx(() => [
                m3.$slots[m3.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(m3.$slots, m3.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
                m3.$slots[m3.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(m3.vertical ? unref(zn) : unref(bn)), { key: 1 }))
              ]),
              _: 3
            }, 8, ["disabled", "aria-label"])) : createCommentVNode("", true)
          ], 64)) : createCommentVNode("", true),
          m3.monthPicker ? (openBlock(), createBlock(Dt, mergeProps({ key: 1 }, unref(le)("month"), {
            "skip-active": m3.range,
            year: e2.year,
            "multi-model-value": unref(Z),
            "month-picker": "",
            modelValue: unref(w2),
            "onUpdate:modelValue": b2[17] || (b2[17] = (re) => isRef(w2) ? w2.value = re : null),
            onToggle: g,
            onSelected: b2[18] || (b2[18] = (re) => m3.$emit("overlay-closed"))
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
                    onClick: b2[9] || (b2[9] = (Re) => Y2(false)),
                    onKeydown: b2[10] || (b2[10] = withKeys((Re) => Y2(false), ["enter"]))
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: unref(T2)(false) }]),
                      role: "button",
                      "aria-label": (re = unref(s3).ariaLabels) == null ? void 0 : re.prevMonth
                    }, [
                      m3.$slots["arrow-left"] ? renderSlot(m3.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                      m3.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(wn), { key: 1 }))
                    ], 10, Or)
                  ], 544),
                  createBaseVNode("div", {
                    class: "dp__pointer",
                    role: "button",
                    ref_key: "mpYearButtonRef",
                    ref: H3,
                    "aria-label": (qe = unref(s3).ariaLabels) == null ? void 0 : qe.openYearsOverlay,
                    tabindex: "0",
                    onClick: b2[11] || (b2[11] = () => r(false)),
                    onKeydown: b2[12] || (b2[12] = withKeys(() => r(false), ["enter"]))
                  }, [
                    m3.$slots.year ? renderSlot(m3.$slots, "year", {
                      key: 0,
                      year: e2.year
                    }) : createCommentVNode("", true),
                    m3.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      createTextVNode(toDisplayString(e2.year), 1)
                    ], 64))
                  ], 40, Ir),
                  createBaseVNode("div", {
                    class: "dp__month_year_col_nav",
                    tabindex: "0",
                    ref_key: "mpNextIconRef",
                    ref: z2,
                    onClick: b2[13] || (b2[13] = (Re) => Y2(true)),
                    onKeydown: b2[14] || (b2[14] = withKeys((Re) => Y2(true), ["enter"]))
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: unref(T2)(true) }]),
                      role: "button",
                      "aria-label": (xe = unref(s3).ariaLabels) == null ? void 0 : xe.nextMonth
                    }, [
                      m3.$slots["arrow-right"] ? renderSlot(m3.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
                      m3.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(bn), { key: 1 }))
                    ], 10, Br)
                  ], 544)
                ]),
                createVNode(Transition, {
                  name: unref(f)(c2.value),
                  css: unref(y3)
                }, {
                  default: withCtx(() => [
                    c2.value ? (openBlock(), createBlock(Dt, mergeProps({ key: 0 }, unref(le)("year"), {
                      modelValue: unref(J),
                      "onUpdate:modelValue": b2[15] || (b2[15] = (Re) => isRef(J) ? J.value = Re : null),
                      onToggle: r,
                      onSelected: b2[16] || (b2[16] = (Re) => m3.$emit("overlay-closed"))
                    }), createSlots({
                      "button-icon": withCtx(() => [
                        m3.$slots["calendar-icon"] ? renderSlot(m3.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        m3.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Lt), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      m3.$slots["year-overlay-value"] ? {
                        name: "item",
                        fn: withCtx(({ item: Re }) => [
                          renderSlot(m3.$slots, "year-overlay-value", {
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
            m3.$slots["month-overlay-value"] ? {
              name: "item",
              fn: withCtx(({ item: re }) => [
                renderSlot(m3.$slots, "month-overlay-value", {
                  text: re.text,
                  value: re.value
                })
              ]),
              key: "0"
            } : void 0
          ]), 1040, ["skip-active", "year", "multi-model-value", "modelValue"])) : createCommentVNode("", true),
          m3.yearPicker ? (openBlock(), createBlock(Dt, mergeProps({ key: 2 }, unref(le)("year"), {
            modelValue: unref(J),
            "onUpdate:modelValue": b2[19] || (b2[19] = (re) => isRef(J) ? J.value = re : null),
            "multi-model-value": unref(Z),
            "skip-active": m3.range,
            "skip-button-ref": "",
            "year-picker": "",
            onToggle: r,
            onSelected: b2[20] || (b2[20] = (re) => m3.$emit("overlay-closed"))
          }), createSlots({ _: 2 }, [
            m3.$slots["year-overlay-value"] ? {
              name: "item",
              fn: withCtx(({ item: re }) => [
                renderSlot(m3.$slots, "year-overlay-value", {
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
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { setTimePickerElements: s3, setTimePickerBackRef: f } = nt(), { defaults: y3 } = Ee(t2), { transitionName: _, showTransition: E2 } = Ut(y3.value.transitions), T2 = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), U = ref("AM"), A = ref(null), c2 = ref([]);
    onMounted(() => {
      a3("mounted");
    });
    const M3 = computed(() => (l) => !!(t2.maxTime && t2.maxTime[l] && +t2.maxTime[l] < +t2[l] + +t2[`${l}Increment`])), te = computed(() => (l) => !!(t2.minTime && t2.minTime[l] && +t2.minTime[l] > +t2[l] - +t2[`${l}Increment`])), H3 = (l, o) => add(set($(), l), o), z2 = (l, o) => sub(set($(), l), o), B2 = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_reg: !t2.enableSeconds && t2.is24,
        dp__time_col_reg_with_button: !t2.enableSeconds && !t2.is24,
        dp__time_col_sec: t2.enableSeconds && t2.is24,
        dp__time_col_sec_with_button: t2.enableSeconds && !t2.is24
      })
    ), w2 = computed(() => {
      const l = [{ type: "hours" }, { type: "", separator: true }, { type: "minutes" }];
      return t2.enableSeconds ? l.concat([{ type: "", separator: true }, { type: "seconds" }]) : l;
    }), J = computed(() => w2.value.filter((l) => !l.separator)), ee = computed(() => (l) => {
      if (l === "hours") {
        const o = Z(+t2.hours);
        return { text: o < 10 ? `0${o}` : `${o}`, value: o };
      }
      return { text: t2[l] < 10 ? `0${t2[l]}` : `${t2[l]}`, value: t2[l] };
    }), x2 = (l) => {
      const o = t2.is24 ? 24 : 12, g = l === "hours" ? o : 60, r = +t2[`${l}GridIncrement`], k2 = l === "hours" && !t2.is24 ? r : 0, Y2 = [];
      for (let R2 = k2; R2 < g; R2 += r)
        Y2.push({ value: R2, text: R2 < 10 ? `0${R2}` : `${R2}` });
      return l === "hours" && !t2.is24 && Y2.push({ value: 0, text: "12" }), Ua(Y2);
    }, le = (l, o) => {
      const g = t2.minTime && t2.minTime[o], r = t2.maxTime && t2.maxTime[o];
      return g && r ? l < +g || l > +r : g ? l < +g : r ? l > +r : false;
    }, de = computed(() => (l) => x2(l).flat().filter((g) => g).map((g) => g.value).filter((g) => le(g, l))), C = (l) => t2[`no${l[0].toUpperCase() + l.slice(1)}Overlay`], N = (l) => {
      C(l) || (T2[l] = !T2[l], T2[l] || a3("overlay-closed"));
    }, G2 = (l) => l === "hours" ? getHours : l === "minutes" ? getMinutes : getSeconds, P = (l, o = true) => {
      const g = o ? H3 : z2;
      (o ? M3.value(l) : te.value(l)) || a3(
        `update:${l}`,
        G2(l)(g({ [l]: +t2[l] }, { [l]: +t2[`${l}Increment`] }))
      );
    }, Z = (l) => t2.is24 ? l : (l >= 12 ? U.value = "PM" : U.value = "AM", xa(l)), p = () => {
      U.value === "PM" ? (U.value = "AM", a3("update:hours", t2.hours - 12)) : (U.value = "PM", a3("update:hours", t2.hours + 12));
    }, q2 = (l) => {
      T2[l] = true;
    }, j = (l, o, g) => {
      if (l && t2.arrowNavigation) {
        Array.isArray(c2.value[o]) ? c2.value[o][g] = l : c2.value[o] = [l];
        const r = c2.value.reduce(
          (k2, Y2) => Y2.map((R2, m3) => [...k2[m3] || [], Y2[m3]]),
          []
        );
        f(t2.closeTimePickerBtn), A.value && (r[1] = r[1].concat(A.value)), s3(r, t2.order);
      }
    }, I2 = (l, o) => l === "hours" && !t2.is24 ? a3(`update:${l}`, U.value === "PM" ? o + 12 : o) : a3(`update:${l}`, o);
    return n({ openChildCmp: q2 }), (l, o) => {
      var g;
      return l.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Vr, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(w2), (r, k2) => {
          var Y2, R2, m3;
          return openBlock(), createElementBlock("div", {
            key: k2,
            class: normalizeClass(unref(B2))
          }, [
            r.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(" : ")
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("div", {
                class: normalizeClass({
                  dp__inc_dec_button: true,
                  dp__inc_dec_button_disabled: unref(M3)(r.type)
                }),
                role: "button",
                "data-test": "time-inc-btn",
                "aria-label": (Y2 = unref(y3).ariaLabels) == null ? void 0 : Y2.incrementValue(r.type),
                tabindex: "0",
                onKeydown: [
                  withKeys((b2) => P(r.type), ["enter"]),
                  withKeys((b2) => P(r.type), ["space"])
                ],
                onClick: (b2) => P(r.type),
                ref_for: true,
                ref: (b2) => j(b2, k2, 0)
              }, [
                l.$slots["arrow-up"] ? renderSlot(l.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                l.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wn), { key: 1 }))
              ], 42, Er),
              createBaseVNode("div", {
                role: "button",
                "aria-label": (R2 = unref(y3).ariaLabels) == null ? void 0 : R2.openTpOverlay(r.type),
                class: normalizeClass(C(r.type) ? "" : "dp__time_display"),
                tabindex: "0",
                "data-test": `${r.type}-toggle-overlay-btn`,
                onKeydown: [
                  withKeys((b2) => N(r.type), ["enter"]),
                  withKeys((b2) => N(r.type), ["space"])
                ],
                onClick: (b2) => N(r.type),
                ref_for: true,
                ref: (b2) => j(b2, k2, 1)
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
                "aria-label": (m3 = unref(y3).ariaLabels) == null ? void 0 : m3.decrementValue(r.type),
                tabindex: "0",
                onKeydown: [
                  withKeys((b2) => P(r.type, false), ["enter"]),
                  withKeys((b2) => P(r.type, false), ["space"])
                ],
                onClick: (b2) => P(r.type, false),
                ref_for: true,
                ref: (b2) => j(b2, k2, 2)
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
            "aria-label": (g = unref(y3).ariaLabels) == null ? void 0 : g.amPmButton,
            tabindex: "0",
            onClick: p,
            onKeydown: [
              withKeys(withModifiers(p, ["prevent"]), ["enter"]),
              withKeys(withModifiers(p, ["prevent"]), ["space"])
            ]
          }, toDisplayString(U.value), 41, Hr))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(J), (r, k2) => (openBlock(), createBlock(Transition, {
          key: k2,
          name: unref(_)(T2[r.type]),
          css: unref(E2)
        }, {
          default: withCtx(() => [
            T2[r.type] ? (openBlock(), createBlock(Dt, {
              key: 0,
              items: x2(r.type),
              "disabled-values": unref(y3).filters.times[r.type].concat(unref(de)(r.type)),
              "esc-close": l.escClose,
              "aria-labels": unref(y3).ariaLabels,
              "hide-navigation": l.hideNavigation,
              "onUpdate:modelValue": (Y2) => I2(r.type, Y2),
              onSelected: (Y2) => N(r.type),
              onToggle: (Y2) => N(r.type),
              onResetFlow: o[0] || (o[0] = (Y2) => l.$emit("reset-flow")),
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
                fn: withCtx(({ item: Y2 }) => [
                  renderSlot(l.$slots, `${r.type}-overlay-value`, {
                    text: Y2.text,
                    value: Y2.value
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
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { buildMatrix: s3, setTimePicker: f } = nt(), y3 = useSlots(), { hideNavigationButtons: _, defaults: E2 } = Ee(t2), { transitionName: T2, showTransition: U } = Ut(E2.value.transitions), A = ref(null), c2 = ref(null), M3 = ref([]), te = ref(null);
    onMounted(() => {
      a3("mount"), !t2.timePicker && t2.arrowNavigation ? s3([$e(A.value)], "time") : f(true, t2.timePicker);
    });
    const H3 = computed(() => t2.range && t2.modelAuto ? Zn(t2.internalModelValue) : true), z2 = ref(false), B2 = (P) => ({
      hours: Array.isArray(t2.hours) ? t2.hours[P] : t2.hours,
      minutes: Array.isArray(t2.minutes) ? t2.minutes[P] : t2.minutes,
      seconds: Array.isArray(t2.seconds) ? t2.seconds[P] : t2.seconds
    }), w2 = computed(() => {
      const P = [];
      if (t2.range)
        for (let Z = 0; Z < 2; Z++)
          P.push(B2(Z));
      else
        P.push(B2(0));
      return P;
    }), J = (P, Z = false, p = "") => {
      Z || a3("reset-flow"), z2.value = P, P && a3("overlay-opened"), t2.arrowNavigation && (f(P), P || a3("overlay-closed")), nextTick(() => {
        p !== "" && M3.value[0] && M3.value[0].openChildCmp(p);
      });
    }, ee = computed(() => ({
      dp__button: true,
      dp__button_bottom: t2.autoApply
    })), x2 = it(y3, "timePicker"), le = (P, Z, p) => t2.range ? Z === 0 ? [P, w2.value[1][p]] : [w2.value[0][p], P] : P, de = (P) => {
      a3("update:hours", P);
    }, C = (P) => {
      a3("update:minutes", P);
    }, N = (P) => {
      a3("update:seconds", P);
    }, G2 = () => {
      te.value && t2.arrowNavigation && te.value.focus({ preventScroll: true });
    };
    return n({ toggleTimePicker: J }), (P, Z) => {
      var p;
      return openBlock(), createElementBlock("div", null, [
        P.timePicker ? createCommentVNode("", true) : withDirectives((openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(ee)),
          role: "button",
          "aria-label": (p = unref(E2).ariaLabels) == null ? void 0 : p.openTimePicker,
          tabindex: "0",
          "data-test": "open-time-picker-btn",
          ref_key: "openTimePickerBtn",
          ref: A,
          onKeydown: [
            Z[0] || (Z[0] = withKeys((q2) => J(true), ["enter"])),
            Z[1] || (Z[1] = withKeys((q2) => J(true), ["space"]))
          ],
          onClick: Z[2] || (Z[2] = (q2) => J(true))
        }, [
          P.$slots["clock-icon"] ? renderSlot(P.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          P.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Hn), { key: 1 }))
        ], 42, zr)), [
          [vShow, !unref(_)("time")]
        ]),
        createVNode(Transition, {
          name: unref(T2)(z2.value),
          css: unref(U)
        }, {
          default: withCtx(() => {
            var q2;
            return [
              z2.value || P.timePicker ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "dp__overlay",
                ref_key: "overlayRef",
                ref: te,
                tabindex: "0"
              }, [
                createBaseVNode("div", xr, [
                  P.$slots["time-picker-overlay"] ? renderSlot(P.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e2.hours,
                    minutes: e2.minutes,
                    seconds: e2.seconds,
                    setHours: de,
                    setMinutes: C,
                    setSeconds: N
                  }) : createCommentVNode("", true),
                  P.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Kr, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(w2), (j, I2) => withDirectives((openBlock(), createBlock(Wr, mergeProps({ key: I2 }, {
                      ...P.$props,
                      order: I2,
                      hours: j.hours,
                      minutes: j.minutes,
                      seconds: j.seconds,
                      closeTimePickerBtn: c2.value,
                      disabled: I2 === 0 ? P.fixedStart : P.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: M3,
                      "onUpdate:hours": (l) => de(le(l, I2, "hours")),
                      "onUpdate:minutes": (l) => C(le(l, I2, "minutes")),
                      "onUpdate:seconds": (l) => N(le(l, I2, "seconds")),
                      onMounted: G2,
                      onOverlayClosed: G2
                    }), createSlots({ _: 2 }, [
                      renderList(unref(x2), (l, o) => ({
                        name: l,
                        fn: withCtx((g) => [
                          renderSlot(P.$slots, l, normalizeProps(guardReactiveProps(g)))
                        ])
                      }))
                    ]), 1040, ["onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, I2 === 0 ? true : unref(H3)]
                    ])), 128))
                  ])),
                  P.timePicker ? createCommentVNode("", true) : withDirectives((openBlock(), createElementBlock("div", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: c2,
                    class: normalizeClass(unref(ee)),
                    role: "button",
                    "aria-label": (q2 = unref(E2).ariaLabels) == null ? void 0 : q2.closeTimePicker,
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
var Zr = (e2, n) => {
  const { isDisabled: a3, matchDate: t2, getWeekFromDate: s3, defaults: f } = Ee(n), y3 = ref(null), _ = ref($()), E2 = (r) => {
    !r.current && n.hideOffsetDates || (y3.value = r.value);
  }, T2 = () => {
    y3.value = null;
  }, U = (r) => Array.isArray(e2.value) && n.range && e2.value[0] && y3.value ? r ? Be(y3.value, e2.value[0]) : _e(y3.value, e2.value[0]) : true, A = (r, k2) => {
    const Y2 = () => e2.value ? k2 ? e2.value[0] || null : e2.value[1] : null, R2 = e2.value && Array.isArray(e2.value) ? Y2() : null;
    return ve($(r.value), R2);
  }, c2 = (r) => {
    const k2 = Array.isArray(e2.value) ? e2.value[0] : null;
    return r ? !_e(y3.value || null, k2) : true;
  }, M3 = (r, k2 = true) => (n.range || n.weekPicker) && Array.isArray(e2.value) ? n.hideOffsetDates && !r.current ? false : ve($(r.value), e2.value[k2 ? 0 : 1]) : n.range ? A(r, k2) && c2(k2) || ve(r.value, Array.isArray(e2.value) ? e2.value[0] : null) && U(k2) : false, te = (r, k2, Y2) => Array.isArray(e2.value) && e2.value[0] && e2.value.length === 1 ? r ? false : Y2 ? Be(e2.value[0], k2.value) : _e(e2.value[0], k2.value) : false, H3 = (r) => !e2.value || n.hideOffsetDates && !r.current ? false : n.range ? n.modelAuto && Array.isArray(e2.value) ? ve(r.value, e2.value[0] ? e2.value[0] : _.value) : false : n.multiDates && Array.isArray(e2.value) ? e2.value.some((k2) => ve(k2, r.value)) : ve(r.value, e2.value ? e2.value : _.value), z2 = (r) => {
    if (n.autoRange || n.weekPicker) {
      if (y3.value) {
        if (n.hideOffsetDates && !r.current)
          return false;
        const k2 = addDays(y3.value, +n.autoRange), Y2 = s3($(y3.value));
        return n.weekPicker ? ve(Y2[1], $(r.value)) : ve(k2, $(r.value));
      }
      return false;
    }
    return false;
  }, B2 = (r) => {
    if (n.autoRange || n.weekPicker) {
      if (y3.value) {
        const k2 = addDays(y3.value, +n.autoRange);
        if (n.hideOffsetDates && !r.current)
          return false;
        const Y2 = s3($(y3.value));
        return n.weekPicker ? Be(r.value, Y2[0]) && _e(r.value, Y2[1]) : Be(r.value, y3.value) && _e(r.value, k2);
      }
      return false;
    }
    return false;
  }, w2 = (r) => {
    if (n.autoRange || n.weekPicker) {
      if (y3.value) {
        if (n.hideOffsetDates && !r.current)
          return false;
        const k2 = s3($(y3.value));
        return n.weekPicker ? ve(k2[0], r.value) : ve(y3.value, r.value);
      }
      return false;
    }
    return false;
  }, J = (r) => xn(e2.value, y3.value, r.value), ee = () => n.modelAuto && Array.isArray(n.internalModelValue) ? !!n.internalModelValue[0] : false, x2 = () => n.modelAuto ? Zn(n.internalModelValue) : true, le = (r) => {
    if (Array.isArray(e2.value) && e2.value.length || n.weekPicker)
      return false;
    const k2 = n.range ? !M3(r) && !M3(r, false) : true;
    return !a3(r.value) && !H3(r) && !(!r.current && n.hideOffsetDates) && k2;
  }, de = (r) => n.range ? n.modelAuto ? ee() && H3(r) : false : H3(r), C = (r) => n.highlight ? t2(r.value, n.highlight) : false, N = (r) => a3(r.value) && n.highlightDisabledDays === false, G2 = (r) => n.highlightWeekDays && n.highlightWeekDays.includes(r.value.getDay()), P = (r) => (n.range || n.weekPicker) && (!(f.value.multiCalendars > 0) || r.current) && x2() && !(!r.current && n.hideOffsetDates) && !H3(r) ? J(r) : false, Z = (r) => {
    const { isRangeStart: k2, isRangeEnd: Y2 } = j(r), R2 = n.range ? k2 || Y2 : false;
    return {
      dp__cell_offset: !r.current,
      dp__pointer: !n.disabled && !(!r.current && n.hideOffsetDates) && !a3(r.value),
      dp__cell_disabled: a3(r.value),
      dp__cell_highlight: !N(r) && (C(r) || G2(r)) && !de(r) && !R2,
      dp__cell_highlight_active: !N(r) && (C(r) || G2(r)) && de(r),
      dp__today: !n.noToday && ve(r.value, _.value) && r.current
    };
  }, p = (r) => ({
    dp__active_date: de(r),
    dp__date_hover: le(r)
  }), q2 = (r) => ({
    ...I2(r),
    ...l(r),
    dp__range_between_week: P(r) && n.weekPicker
  }), j = (r) => {
    const k2 = f.value.multiCalendars > 0 ? r.current && M3(r) && x2() : M3(r) && x2(), Y2 = f.value.multiCalendars > 0 ? r.current && M3(r, false) && x2() : M3(r, false) && x2();
    return { isRangeStart: k2, isRangeEnd: Y2 };
  }, I2 = (r) => {
    const { isRangeStart: k2, isRangeEnd: Y2 } = j(r);
    return {
      dp__range_start: k2,
      dp__range_end: Y2,
      dp__range_between: P(r) && !n.weekPicker,
      dp__date_hover_start: te(le(r), r, true),
      dp__date_hover_end: te(le(r), r, false)
    };
  }, l = (r) => ({
    ...I2(r),
    dp__cell_auto_range: B2(r),
    dp__cell_auto_range_start: w2(r),
    dp__cell_auto_range_end: z2(r)
  }), o = (r) => n.range ? n.autoRange ? l(r) : n.modelAuto ? { ...p(r), ...I2(r) } : I2(r) : n.weekPicker ? q2(r) : p(r);
  return {
    setHoverDate: E2,
    clearHoverDate: T2,
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
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { setMenuFocused: s3, setShiftKey: f, control: y3 } = Kn(), { getCalendarDays: _, defaults: E2 } = Ee(t2), T2 = useSlots(), U = ref(null), A = reactive({
      timePicker: !!(!t2.enableTimePicker || t2.timePicker || t2.monthPicker),
      monthYearInput: !!t2.timePicker,
      calendar: false
    }), c2 = ref([]), M3 = ref([]), te = ref(null), H3 = ref(null), z2 = ref(0), B2 = ref(false), w2 = ref(0);
    onMounted(() => {
      var V;
      B2.value = true, !((V = t2.presetRanges) != null && V.length) && !T2["left-sidebar"] && !T2["right-sidebar"] && (me(), window.addEventListener("resize", me));
      const d3 = $e(H3);
      if (d3 && !t2.textInput && !t2.inline && (s3(true), C()), d3) {
        const we = (be) => {
          ["action-row", "time-picker", "month-year"].some(
            (Ke) => Object.keys(T2).includes(Ke)
          ) || be.preventDefault(), be.stopImmediatePropagation(), be.stopPropagation();
        };
        d3.addEventListener("pointerdown", we), d3.addEventListener("mousedown", we);
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", me);
    });
    const { arrowRight: J, arrowLeft: ee, arrowDown: x2, arrowUp: le } = nt(), de = (d3) => {
      d3 || d3 === 0 ? M3.value[d3].triggerTransition(
        p.value(d3),
        q2.value(d3)
      ) : M3.value.forEach(
        (V, we) => V.triggerTransition(p.value(we), q2.value(we))
      );
    }, C = () => {
      const d3 = $e(H3);
      d3 && d3.focus({ preventScroll: true });
    }, N = () => {
      var d3;
      (d3 = t2.flow) != null && d3.length && w2.value !== -1 && (w2.value += 1, a3("flow-step", w2.value), Gt());
    }, G2 = () => {
      w2.value = -1;
    }, {
      calendars: P,
      modelValue: Z,
      month: p,
      year: q2,
      time: j,
      updateTime: I2,
      updateMonthYear: l,
      selectDate: o,
      getWeekNum: g,
      monthYearSelect: r,
      handleScroll: k2,
      handleArrow: Y2,
      handleSwipe: R2,
      getMarker: m3,
      selectCurrentDate: b2,
      presetDateRange: v
    } = Qa(t2, a3, N, de, w2), { setHoverDate: W, clearHoverDate: se, getDayClassData: Ne } = Zr(Z, t2);
    watch(
      P,
      () => {
        t2.openOnTop && setTimeout(() => {
          a3("recalculate-position");
        }, 0);
      },
      { deep: true }
    );
    const Xe = it(T2, "calendar"), re = it(T2, "action"), qe = it(T2, "timePicker"), xe = it(T2, "monthYear"), Re = computed(() => t2.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), rt = computed(() => Wa(t2.yearRange, t2.reverseYears)), ne = computed(() => za(t2.locale, t2.monthNameFormat)), me = () => {
      const d3 = $e(U);
      d3 && (z2.value = d3.getBoundingClientRect().width);
    }, ge = computed(() => (d3) => _(p.value(d3), q2.value(d3))), Je = computed(
      () => E2.value.multiCalendars > 0 && t2.range ? [...Array(E2.value.multiCalendars).keys()] : [0]
    ), Ye = computed(
      () => (d3) => d3 === 1
    ), Tt = computed(() => t2.monthPicker || t2.timePicker || t2.yearPicker), Ht = computed(
      () => ({
        dp__flex_display: E2.value.multiCalendars > 0
      })
    ), Wt = computed(() => ({
      dp__instance_calendar: E2.value.multiCalendars > 0
    })), zt = computed(() => ({
      dp__menu_disabled: t2.disabled,
      dp__menu_readonly: t2.readonly
    })), At = computed(
      () => (d3) => xt(ge, d3)
    ), ht = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !t2.inline,
        dp__relative: t2.inline,
        [t2.menuClassName]: !!t2.menuClassName
      })
    ), xt = (d3, V) => d3.value(V).map((we) => ({
      ...we,
      days: we.days.map((be) => (be.marker = m3(be), be.classData = Ne(be), be))
    })), Kt = (d3) => {
      d3.stopPropagation(), d3.stopImmediatePropagation();
    }, jt = () => {
      t2.escClose && a3("close-picker");
    }, St = (d3, V = false) => {
      o(d3, V), t2.spaceConfirm && a3("select-date");
    }, Ct = (d3) => {
      var V;
      (V = t2.flow) != null && V.length && (A[d3] = true, Object.keys(A).filter((we) => !A[we]).length || Gt());
    }, ct = (d3, V, we, be, ...Ke) => {
      if (t2.flow[w2.value] === d3) {
        const X2 = be ? V.value[0] : V.value;
        X2 && X2[we](...Ke);
      }
    }, Gt = () => {
      ct("month", c2, "toggleMonthPicker", true, true), ct("year", c2, "toggleYearPicker", true, true), ct("calendar", te, "toggleTimePicker", false, false, true), ct("time", te, "toggleTimePicker", false, true, true);
      const d3 = t2.flow[w2.value];
      (d3 === "hours" || d3 === "minutes" || d3 === "seconds") && ct(d3, te, "toggleTimePicker", false, true, true, d3);
    }, i2 = (d3) => {
      if (t2.arrowNavigation) {
        if (d3 === "up")
          return le();
        if (d3 === "down")
          return x2();
        if (d3 === "left")
          return ee();
        if (d3 === "right")
          return J();
      } else
        d3 === "left" || d3 === "up" ? Y2("left", 0, d3 === "up") : Y2("right", 0, d3 === "down");
    }, D2 = (d3) => {
      f(d3.shiftKey), !t2.disableMonthYearSelect && d3.code === "Tab" && d3.target.classList.contains("dp__menu") && y3.value.shiftKeyInMenu && (d3.preventDefault(), d3.stopImmediatePropagation(), a3("close-picker"));
    }, Q2 = (d3) => {
      c2.value[0] && c2.value[0].handleMonthYearChange(d3);
    };
    return n({
      updateMonthYear: l
    }), (d3, V) => {
      var we;
      return openBlock(), createBlock(Transition, {
        appear: "",
        name: (we = unref(E2).transitions) == null ? void 0 : we.menuAppear,
        mode: "out-in",
        css: !!d3.transitions
      }, {
        default: withCtx(() => {
          var be, Ke;
          return [
            createBaseVNode("div", {
              id: d3.uid ? `dp-menu-${d3.uid}` : void 0,
              tabindex: "0",
              ref_key: "dpMenuRef",
              ref: H3,
              role: "dialog",
              class: normalizeClass(unref(ht)),
              onMouseleave: V[15] || (V[15] = //@ts-ignore
              (...X2) => unref(se) && unref(se)(...X2)),
              onClick: Kt,
              onKeydown: [
                withKeys(jt, ["esc"]),
                V[16] || (V[16] = withKeys(withModifiers((X2) => i2("left"), ["prevent"]), ["left"])),
                V[17] || (V[17] = withKeys(withModifiers((X2) => i2("up"), ["prevent"]), ["up"])),
                V[18] || (V[18] = withKeys(withModifiers((X2) => i2("down"), ["prevent"]), ["down"])),
                V[19] || (V[19] = withKeys(withModifiers((X2) => i2("right"), ["prevent"]), ["right"])),
                D2
              ]
            }, [
              (d3.disabled || d3.readonly) && d3.inline ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(unref(zt))
              }, null, 2)) : createCommentVNode("", true),
              !d3.inline && !d3.teleportCenter ? (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(unref(Re))
              }, null, 2)) : createCommentVNode("", true),
              createBaseVNode("div", {
                class: normalizeClass({
                  dp__menu_content_wrapper: ((be = d3.presetRanges) == null ? void 0 : be.length) || !!d3.$slots["left-sidebar"] || !!d3.$slots["right-sidebar"]
                })
              }, [
                d3.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", qr, [
                  renderSlot(d3.$slots, "left-sidebar", normalizeProps(guardReactiveProps({ handleMonthYearChange: Q2 })))
                ])) : createCommentVNode("", true),
                (Ke = d3.presetRanges) != null && Ke.length ? (openBlock(), createElementBlock("div", Jr, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(d3.presetRanges, (X2, ft) => (openBlock(), createElementBlock("div", {
                    key: ft,
                    style: normalizeStyle(X2.style || {}),
                    class: "dp__preset_range",
                    onClick: (ie) => unref(v)(X2.range, !!X2.slot)
                  }, [
                    X2.slot ? renderSlot(d3.$slots, X2.slot, {
                      key: 0,
                      presetDateRange: unref(v),
                      label: X2.label,
                      range: X2.range
                    }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      createTextVNode(toDisplayString(X2.label), 1)
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
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(Je), (X2, ft) => (openBlock(), createElementBlock("div", {
                      key: X2,
                      class: normalizeClass(unref(Wt))
                    }, [
                      !d3.disableMonthYearSelect && !d3.timePicker ? (openBlock(), createBlock(Yr, mergeProps({
                        key: 0,
                        ref_for: true,
                        ref: (ie) => {
                          ie && (c2.value[ft] = ie);
                        },
                        months: unref(ne),
                        years: unref(rt),
                        month: unref(p)(X2),
                        year: unref(q2)(X2),
                        instance: X2,
                        "internal-model-value": e2.internalModelValue
                      }, d3.$props, {
                        onMount: V[0] || (V[0] = (ie) => Ct("monthYearInput")),
                        onResetFlow: G2,
                        onUpdateMonthYear: (ie) => unref(l)(X2, ie),
                        onMonthYearSelect: unref(r),
                        onOverlayClosed: C
                      }), createSlots({ _: 2 }, [
                        renderList(unref(xe), (ie, qn) => ({
                          name: ie,
                          fn: withCtx((Zt) => [
                            renderSlot(d3.$slots, ie, normalizeProps(guardReactiveProps(Zt)))
                          ])
                        }))
                      ]), 1040, ["months", "years", "month", "year", "instance", "internal-model-value", "onUpdateMonthYear", "onMonthYearSelect"])) : createCommentVNode("", true),
                      createVNode($r, mergeProps({
                        ref_for: true,
                        ref: (ie) => {
                          ie && (M3.value[ft] = ie);
                        },
                        "specific-mode": unref(Tt),
                        "get-week-num": unref(g),
                        instance: X2,
                        "mapped-dates": unref(At)(X2),
                        month: unref(p)(X2),
                        year: unref(q2)(X2)
                      }, d3.$props, {
                        "flow-step": w2.value,
                        "onUpdate:flowStep": V[1] || (V[1] = (ie) => w2.value = ie),
                        onSelectDate: (ie) => unref(o)(ie, !unref(Ye)(X2)),
                        onHandleSpace: (ie) => St(ie, !unref(Ye)(X2)),
                        onSetHoverDate: V[2] || (V[2] = (ie) => unref(W)(ie)),
                        onHandleScroll: (ie) => unref(k2)(ie, X2),
                        onHandleSwipe: (ie) => unref(R2)(ie, X2),
                        onMount: V[3] || (V[3] = (ie) => Ct("calendar")),
                        onResetFlow: G2,
                        onTooltipOpen: V[4] || (V[4] = (ie) => d3.$emit("tooltip-open", ie)),
                        onTooltipClose: V[5] || (V[5] = (ie) => d3.$emit("tooltip-close", ie))
                      }), createSlots({ _: 2 }, [
                        renderList(unref(Xe), (ie, qn) => ({
                          name: ie,
                          fn: withCtx((Zt) => [
                            renderSlot(d3.$slots, ie, normalizeProps(guardReactiveProps({ ...Zt })))
                          ])
                        }))
                      ]), 1040, ["specific-mode", "get-week-num", "instance", "mapped-dates", "month", "year", "flow-step", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
                    ], 2))), 128))
                  ], 2),
                  createBaseVNode("div", null, [
                    d3.$slots["time-picker"] ? renderSlot(d3.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(j), updateTime: unref(I2) }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      d3.enableTimePicker && !d3.monthPicker && !d3.weekPicker ? (openBlock(), createBlock(Gr, mergeProps({
                        key: 0,
                        ref_key: "timePickerRef",
                        ref: te,
                        hours: unref(j).hours,
                        minutes: unref(j).minutes,
                        seconds: unref(j).seconds,
                        "internal-model-value": e2.internalModelValue
                      }, d3.$props, {
                        onMount: V[6] || (V[6] = (X2) => Ct("timePicker")),
                        "onUpdate:hours": V[7] || (V[7] = (X2) => unref(I2)(X2)),
                        "onUpdate:minutes": V[8] || (V[8] = (X2) => unref(I2)(X2, false)),
                        "onUpdate:seconds": V[9] || (V[9] = (X2) => unref(I2)(X2, false, true)),
                        onResetFlow: G2,
                        onOverlayClosed: C,
                        onOverlayOpened: V[10] || (V[10] = (X2) => d3.$emit("time-picker-open", X2))
                      }), createSlots({ _: 2 }, [
                        renderList(unref(qe), (X2, ft) => ({
                          name: X2,
                          fn: withCtx((ie) => [
                            renderSlot(d3.$slots, X2, normalizeProps(guardReactiveProps(ie)))
                          ])
                        }))
                      ]), 1040, ["hours", "minutes", "seconds", "internal-model-value"])) : createCommentVNode("", true)
                    ], 64))
                  ])
                ], 512),
                d3.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", el, [
                  renderSlot(d3.$slots, "right-sidebar", normalizeProps(guardReactiveProps({ handleMonthYearChange: Q2 })))
                ])) : createCommentVNode("", true),
                d3.showNowButton ? (openBlock(), createElementBlock("div", tl, [
                  d3.$slots["now-button"] ? renderSlot(d3.$slots, "now-button", {
                    key: 0,
                    selectCurrentDate: unref(b2)
                  }) : createCommentVNode("", true),
                  d3.$slots["now-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
                    key: 1,
                    type: "button",
                    role: "button",
                    class: "dp__now_button",
                    onClick: V[11] || (V[11] = //@ts-ignore
                    (...X2) => unref(b2) && unref(b2)(...X2))
                  }, toDisplayString(d3.nowButtonLabel), 1))
                ])) : createCommentVNode("", true)
              ], 2),
              !d3.autoApply || d3.keepActionRow ? (openBlock(), createBlock(mr, mergeProps({
                key: 2,
                "menu-mount": B2.value,
                "calendar-width": z2.value,
                "internal-model-value": e2.internalModelValue
              }, d3.$props, {
                onClosePicker: V[12] || (V[12] = (X2) => d3.$emit("close-picker")),
                onSelectDate: V[13] || (V[13] = (X2) => d3.$emit("select-date")),
                onInvalidSelect: V[14] || (V[14] = (X2) => d3.$emit("invalid-select"))
              }), createSlots({ _: 2 }, [
                renderList(unref(re), (X2, ft) => ({
                  name: X2,
                  fn: withCtx((ie) => [
                    renderSlot(d3.$slots, X2, normalizeProps(guardReactiveProps({ ...ie })))
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
var rl = (e2) => getCurrentScope() ? (onScopeDispose(e2), true) : false;
var ll = (e2, n, a3, t2) => {
  if (!e2)
    return ln;
  let s3 = ln;
  const f = watch(
    () => unref(e2),
    (_) => {
      s3(), _ && (_.addEventListener(n, a3, t2), s3 = () => {
        _.removeEventListener(n, a3, t2), s3 = ln;
      });
    },
    { immediate: true, flush: "post" }
  ), y3 = () => {
    f(), s3();
  };
  return rl(y3), y3;
};
var ol = (e2, n, a3, t2 = {}) => {
  const { window: s3 = al, event: f = "pointerdown" } = t2;
  return s3 ? ll(s3, f, (_) => {
    const E2 = $e(e2), T2 = $e(n);
    !E2 || !T2 || E2 === _.target || _.composedPath().includes(E2) || _.composedPath().includes(T2) || a3(_);
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
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, s3 = useSlots(), f = ref(false), y3 = toRef(t2, "modelValue"), _ = toRef(t2, "timezone"), E2 = ref(null), T2 = ref(null), U = ref(false), A = ref(null), { setMenuFocused: c2, setShiftKey: M3 } = Kn(), { clearArrowNav: te } = nt(), { validateDate: H3, isValidTime: z2 } = Ee(t2);
    onMounted(() => {
      G2(t2.modelValue), t2.inline || (de(A.value).addEventListener("scroll", l), window.addEventListener("resize", o)), t2.inline && (f.value = true);
    }), onUnmounted(() => {
      if (!t2.inline) {
        const ne = de(A.value);
        ne && ne.removeEventListener("scroll", l), window.removeEventListener("resize", o);
      }
    });
    const B2 = it(s3, "all", t2.presetRanges), w2 = it(s3, "input");
    watch(
      [y3, _],
      () => {
        G2(y3.value);
      },
      { deep: true }
    );
    const { openOnTop: J, menuPosition: ee, setMenuPosition: x2, setInitialPosition: le, getScrollableParent: de } = nr(
      E2,
      T2,
      a3,
      t2
    ), {
      inputValue: C,
      internalModelValue: N,
      parseExternalModelValue: G2,
      emitModelValue: P,
      formatInputValue: Z,
      checkBeforeEmit: p
    } = er(a3, t2, U), q2 = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: t2.dark,
        dp__theme_light: !t2.dark,
        dp__flex_display: t2.inline,
        dp__flex_display_with_input: t2.inlineWithInput
      })
    ), j = computed(() => t2.dark ? "dp__theme_dark" : "dp__theme_light"), I2 = computed(() => t2.teleport ? {
      to: typeof t2.teleport == "boolean" ? "body" : t2.teleport,
      disabled: t2.inline
    } : { class: "dp__outer_menu_wrap" }), l = () => {
      f.value && (t2.closeOnScroll ? W() : x2());
    }, o = () => {
      f.value && x2();
    }, g = () => {
      !t2.disabled && !t2.readonly && (le(), f.value = true, nextTick().then(() => {
        x2(), f.value && a3("open");
      }), f.value || v(), G2(t2.modelValue));
    }, r = () => {
      C.value = "", v(), a3("update:model-value", null), a3("cleared"), W();
    }, k2 = () => {
      const ne = N.value;
      return !ne || !Array.isArray(ne) && H3(ne) ? true : Array.isArray(ne) ? ne.length === 2 && H3(ne[0]) && H3(ne[1]) ? true : H3(ne[0]) : false;
    }, Y2 = () => {
      p() && k2() ? (P(), W()) : a3("invalid-select", N.value);
    }, R2 = (ne) => {
      m3(), P(), t2.closeOnAutoApply && !ne && W();
    }, m3 = () => {
      T2.value && t2.textInput && T2.value.setParsedDate(N.value);
    }, b2 = (ne = false) => {
      t2.autoApply && z2(N.value) && k2() && (t2.range && Array.isArray(N.value) ? (t2.partialRange || N.value.length === 2) && R2(ne) : R2(ne));
    }, v = () => {
      t2.textInput || (N.value = null);
    }, W = () => {
      t2.inline || (f.value && (f.value = false, c2(false), M3(false), te(), a3("closed"), le(), C.value && G2(y3.value)), v());
    }, se = (ne, me) => {
      if (!ne) {
        N.value = null;
        return;
      }
      N.value = ne, me && (Y2(), a3("text-submit"));
    }, Ne = () => {
      t2.autoApply && z2(N.value) && P(), m3();
    }, Xe = () => f.value ? W() : g(), re = (ne) => {
      N.value = ne;
    }, qe = () => {
      t2.textInput && (U.value = true, Z()), a3("focus");
    }, xe = () => {
      t2.textInput && (U.value = false, G2(t2.modelValue)), a3("blur");
    }, Re = (ne) => {
      E2.value && E2.value.updateMonthYear(0, {
        month: Nn(ne.month),
        year: Nn(ne.year)
      });
    }, rt = (ne) => {
      G2(ne || t2.modelValue);
    };
    return ol(
      E2,
      T2,
      t2.onClickOutside ? () => t2.onClickOutside(k2) : W
    ), n({
      closeMenu: W,
      selectDate: Y2,
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
      class: normalizeClass(unref(q2)),
      ref_key: "pickerWrapperRef",
      ref: A
    }, [
      createVNode(dr, mergeProps({
        ref_key: "inputRef",
        ref: T2,
        "is-menu-open": f.value,
        "input-value": unref(C),
        "onUpdate:inputValue": me[0] || (me[0] = (ge) => isRef(C) ? C.value = ge : null)
      }, ne.$props, {
        onClear: r,
        onOpen: g,
        onSetInputDate: se,
        onSetEmptyDate: unref(P),
        onSelectDate: Y2,
        onToggle: Xe,
        onClose: W,
        onFocus: qe,
        onBlur: xe
      }), createSlots({ _: 2 }, [
        renderList(unref(w2), (ge, Je) => ({
          name: ge,
          fn: withCtx((Ye) => [
            renderSlot(ne.$slots, ge, normalizeProps(guardReactiveProps(Ye)))
          ])
        }))
      ]), 1040, ["is-menu-open", "input-value", "onSetEmptyDate"]),
      f.value ? (openBlock(), createBlock(resolveDynamicComponent(ne.teleport ? Teleport : "div"), normalizeProps(mergeProps({ key: 0 }, unref(I2))), {
        default: withCtx(() => [
          f.value ? (openBlock(), createBlock(nl, mergeProps({
            key: 0,
            ref_key: "dpMenuRef",
            ref: E2,
            class: unref(j),
            style: unref(ee),
            "open-on-top": unref(J)
          }, ne.$props, {
            "internal-model-value": unref(N),
            "onUpdate:internalModelValue": me[1] || (me[1] = (ge) => isRef(N) ? N.value = ge : null),
            onClosePicker: W,
            onSelectDate: Y2,
            onAutoApply: b2,
            onTimeUpdate: Ne,
            onFlowStep: me[2] || (me[2] = (ge) => ne.$emit("flow-step", ge)),
            onUpdateMonthYear: me[3] || (me[3] = (ge) => ne.$emit("update-month-year", ge)),
            onInvalidSelect: me[4] || (me[4] = (ge) => ne.$emit("invalid-select", unref(N))),
            onInvalidFixedRange: me[5] || (me[5] = (ge) => ne.$emit("invalid-fixed-range", ge)),
            onRecalculatePosition: unref(x2),
            onTooltipOpen: me[6] || (me[6] = (ge) => ne.$emit("tooltip-open", ge)),
            onTooltipClose: me[7] || (me[7] = (ge) => ne.$emit("tooltip-close", ge)),
            onTimePickerOpen: me[8] || (me[8] = (ge) => ne.$emit("time-picker-open", ge))
          }), createSlots({ _: 2 }, [
            renderList(unref(B2), (ge, Je) => ({
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
  const e2 = sl;
  return e2.install = (n) => {
    n.component("Vue3DatePicker", e2);
  }, e2;
})();
var il = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Xn
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(il).forEach(([e2, n]) => {
  e2 !== "default" && (Xn[e2] = n);
});

// node_modules/.pnpm/vue-amazing-ui@0.0.30/node_modules/vue-amazing-ui/dist/vue-amazing-ui.js
var import_qrcode = __toESM(require_browser());

// node_modules/.pnpm/ssr-window@4.0.2/node_modules/ssr-window/ssr-window.esm.js
function isObject(obj) {
  return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
}
function extend(target = {}, src = {}) {
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/shared/utils.js
function deleteProps(obj) {
  const object = obj;
  Object.keys(object).forEach((key) => {
    try {
      object[key] = null;
    } catch (e2) {
    }
    try {
      delete object[key];
    } catch (e2) {
    }
  });
}
function nextTick2(callback, delay = 0) {
  return setTimeout(callback, delay);
}
function now() {
  return Date.now();
}
function getComputedStyle2(el2) {
  const window2 = getWindow();
  let style;
  if (window2.getComputedStyle) {
    style = window2.getComputedStyle(el2, null);
  }
  if (!style && el2.currentStyle) {
    style = el2.currentStyle;
  }
  if (!style) {
    style = el2.style;
  }
  return style;
}
function getTranslate(el2, axis = "x") {
  const window2 = getWindow();
  let matrix;
  let curTransform;
  let transformMatrix;
  const curStyle = getComputedStyle2(el2, null);
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
function extend2(...args) {
  const to = Object(args[0]);
  const noExtend = ["__proto__", "constructor", "prototype"];
  for (let i2 = 1; i2 < args.length; i2 += 1) {
    const nextSource = args[i2];
    if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
      const keysArray = Object.keys(Object(nextSource)).filter((key) => noExtend.indexOf(key) < 0);
      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        const nextKey = keysArray[nextIndex];
        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== void 0 && desc.enumerable) {
          if (isObject2(to[nextKey]) && isObject2(nextSource[nextKey])) {
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend2(to[nextKey], nextSource[nextKey]);
            }
          } else if (!isObject2(to[nextKey]) && isObject2(nextSource[nextKey])) {
            to[nextKey] = {};
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend2(to[nextKey], nextSource[nextKey]);
            }
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to;
}
function setCSSProperty(el2, varName, varValue) {
  el2.style.setProperty(varName, varValue);
}
function animateCSSModeScroll({
  swiper,
  targetPosition,
  side
}) {
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
  return slideEl.querySelector(".swiper-slide-transform") || slideEl.shadowEl && slideEl.shadowEl.querySelector(".swiper-slide-transform") || slideEl;
}
function elementChildren(element, selector = "") {
  return [...element.children].filter((el2) => el2.matches(selector));
}
function createElement(tag, classes = []) {
  const el2 = document.createElement(tag);
  el2.classList.add(...Array.isArray(classes) ? classes : [classes]);
  return el2;
}
function elementPrevAll(el2, selector) {
  const prevEls = [];
  while (el2.previousElementSibling) {
    const prev = el2.previousElementSibling;
    if (selector) {
      if (prev.matches(selector))
        prevEls.push(prev);
    } else
      prevEls.push(prev);
    el2 = prev;
  }
  return prevEls;
}
function elementNextAll(el2, selector) {
  const nextEls = [];
  while (el2.nextElementSibling) {
    const next = el2.nextElementSibling;
    if (selector) {
      if (next.matches(selector))
        nextEls.push(next);
    } else
      nextEls.push(next);
    el2 = next;
  }
  return nextEls;
}
function elementStyle(el2, prop) {
  const window2 = getWindow();
  return window2.getComputedStyle(el2, null).getPropertyValue(prop);
}
function elementIndex(el2) {
  let child = el2;
  let i2;
  if (child) {
    i2 = 0;
    while ((child = child.previousSibling) !== null) {
      if (child.nodeType === 1)
        i2 += 1;
    }
    return i2;
  }
  return void 0;
}
function elementParents(el2, selector) {
  const parents = [];
  let parent = el2.parentElement;
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
function elementTransitionEnd(el2, callback) {
  function fireCallBack(e2) {
    if (e2.target !== el2)
      return;
    callback.call(el2, e2);
    el2.removeEventListener("transitionend", fireCallBack);
  }
  if (callback) {
    el2.addEventListener("transitionend", fireCallBack);
  }
}
function elementOuterSize(el2, size, includeMargins) {
  const window2 = getWindow();
  if (includeMargins) {
    return el2[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window2.getComputedStyle(el2, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window2.getComputedStyle(el2, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
  }
  return el2.offsetWidth;
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/shared/get-support.js
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/shared/get-device.js
var deviceCached;
function calcDevice({
  userAgent
} = {}) {
  const support2 = getSupport();
  const window2 = getWindow();
  const platform = window2.navigator.platform;
  const ua = userAgent || window2.navigator.userAgent;
  const device = {
    ios: false,
    android: false
  };
  const screenWidth = window2.screen.width;
  const screenHeight = window2.screen.height;
  const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  const windows = platform === "Win32";
  let macos = platform === "MacIntel";
  const iPadScreens = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  if (!ipad && macos && support2.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
    ipad = ua.match(/(Version)\/([\d.]+)/);
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
function getDevice(overrides = {}) {
  if (!deviceCached) {
    deviceCached = calcDevice(overrides);
  }
  return deviceCached;
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/shared/get-browser.js
var browser;
function calcBrowser() {
  const window2 = getWindow();
  let needPerspectiveFix = false;
  function isSafari() {
    const ua = window2.navigator.userAgent.toLowerCase();
    return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
  }
  if (isSafari()) {
    const ua = String(window2.navigator.userAgent);
    if (ua.includes("Version/")) {
      const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num) => Number(num));
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/modules/resize/resize.js
function Resize({
  swiper,
  on,
  emit
}) {
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
        entries.forEach(({
          contentBoxSize,
          contentRect,
          target
        }) => {
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
  on("init", () => {
    if (swiper.params.resizeObserver && typeof window2.ResizeObserver !== "undefined") {
      createObserver();
      return;
    }
    window2.addEventListener("resize", resizeHandler);
    window2.addEventListener("orientationchange", orientationChangeHandler);
  });
  on("destroy", () => {
    removeObserver();
    window2.removeEventListener("resize", resizeHandler);
    window2.removeEventListener("orientationchange", orientationChangeHandler);
  });
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/modules/observer/observer.js
function Observer({
  swiper,
  extendParams,
  on,
  emit
}) {
  const observers = [];
  const window2 = getWindow();
  const attach = (target, options = {}) => {
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
      const containerParents = elementParents(swiper.el);
      for (let i2 = 0; i2 < containerParents.length; i2 += 1) {
        attach(containerParents[i2]);
      }
    }
    attach(swiper.el, {
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
  on("init", init);
  on("destroy", destroy);
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/events-emitter.js
var events_emitter_default = {
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
    function onceHandler(...args) {
      self.off(events2, onceHandler);
      if (onceHandler.__emitterProxy) {
        delete onceHandler.__emitterProxy;
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
  emit(...args) {
    const self = this;
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (!self.eventsListeners)
      return self;
    let events2;
    let data;
    let context;
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/update/updateSize.js
function updateSize() {
  const swiper = this;
  let width;
  let height;
  const el2 = swiper.el;
  if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) {
    width = swiper.params.width;
  } else {
    width = el2.clientWidth;
  }
  if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) {
    height = swiper.params.height;
  } else {
    height = el2.clientHeight;
  }
  if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
    return;
  }
  width = width - parseInt(elementStyle(el2, "padding-left") || 0, 10) - parseInt(elementStyle(el2, "padding-right") || 0, 10);
  height = height - parseInt(elementStyle(el2, "padding-top") || 0, 10) - parseInt(elementStyle(el2, "padding-bottom") || 0, 10);
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/update/updateSlides.js
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
  for (let i2 = 0; i2 < slidesLength; i2 += 1) {
    slideSize = 0;
    let slide;
    if (slides[i2])
      slide = slides[i2];
    if (gridEnabled) {
      swiper.grid.updateSlide(i2, slide, slidesLength, getDirectionLabel);
    }
    if (slides[i2] && elementStyle(slide, "display") === "none")
      continue;
    if (params.slidesPerView === "auto") {
      if (shouldResetSlideSize) {
        slides[i2].style[getDirectionLabel("width")] = ``;
      }
      const slideStyles = getComputedStyle(slide);
      const currentTransform = slide.style.transform;
      const currentWebKitTransform = slide.style.webkitTransform;
      if (currentTransform) {
        slide.style.transform = "none";
      }
      if (currentWebKitTransform) {
        slide.style.webkitTransform = "none";
      }
      if (params.roundLengths) {
        slideSize = swiper.isHorizontal() ? elementOuterSize(slide, "width", true) : elementOuterSize(slide, "height", true);
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
          } = slide;
          slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
        }
      }
      if (currentTransform) {
        slide.style.transform = currentTransform;
      }
      if (currentWebKitTransform) {
        slide.style.webkitTransform = currentWebKitTransform;
      }
      if (params.roundLengths)
        slideSize = Math.floor(slideSize);
    } else {
      slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
      if (params.roundLengths)
        slideSize = Math.floor(slideSize);
      if (slides[i2]) {
        slides[i2].style[getDirectionLabel("width")] = `${slideSize}px`;
      }
    }
    if (slides[i2]) {
      slides[i2].swiperSlideSize = slideSize;
    }
    slidesSizesGrid.push(slideSize);
    if (params.centeredSlides) {
      slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
      if (prevSlideSize === 0 && i2 !== 0)
        slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (i2 === 0)
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
    for (let i2 = 0; i2 < snapGrid.length; i2 += 1) {
      let slidesGridItem = snapGrid[i2];
      if (params.roundLengths)
        slidesGridItem = Math.floor(slidesGridItem);
      if (snapGrid[i2] <= swiper.virtualSize - swiperSize) {
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
      for (let i2 = 0; i2 < groups; i2 += 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
      }
    }
    for (let i2 = 0; i2 < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i2 += 1) {
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
      if (snap < 0)
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/update/updateAutoHeight.js
function updateAutoHeight(speed) {
  const swiper = this;
  const activeSlides = [];
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  let newHeight = 0;
  let i2;
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
      (swiper.visibleSlides || []).forEach((slide) => {
        activeSlides.push(slide);
      });
    } else {
      for (i2 = 0; i2 < Math.ceil(swiper.params.slidesPerView); i2 += 1) {
        const index = swiper.activeIndex + i2;
        if (index > swiper.slides.length && !isVirtual)
          break;
        activeSlides.push(getSlideByIndex(index));
      }
    }
  } else {
    activeSlides.push(getSlideByIndex(swiper.activeIndex));
  }
  for (i2 = 0; i2 < activeSlides.length; i2 += 1) {
    if (typeof activeSlides[i2] !== "undefined") {
      const height = activeSlides[i2].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  }
  if (newHeight || newHeight === 0)
    swiper.wrapperEl.style.height = `${newHeight}px`;
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/update/updateSlidesOffset.js
function updateSlidesOffset() {
  const swiper = this;
  const slides = swiper.slides;
  const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
  for (let i2 = 0; i2 < slides.length; i2 += 1) {
    slides[i2].swiperSlideOffset = (swiper.isHorizontal() ? slides[i2].offsetLeft : slides[i2].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
  }
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/update/updateSlidesProgress.js
function updateSlidesProgress(translate = this && this.translate || 0) {
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
  let offsetCenter = -translate;
  if (rtl)
    offsetCenter = translate;
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
  for (let i2 = 0; i2 < slides.length; i2 += 1) {
    const slide = slides[i2];
    let slideOffset = slide.swiperSlideOffset;
    if (params.cssMode && params.centeredSlides) {
      slideOffset -= slides[0].swiperSlideOffset;
    }
    const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
    const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
    const slideBefore = -(offsetCenter - slideOffset);
    const slideAfter = slideBefore + swiper.slidesSizesGrid[i2];
    const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
    if (isVisible) {
      swiper.visibleSlides.push(slide);
      swiper.visibleSlidesIndexes.push(i2);
      slides[i2].classList.add(params.slideVisibleClass);
    }
    slide.progress = rtl ? -slideProgress : slideProgress;
    slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
  }
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/update/updateProgress.js
function updateProgress(translate) {
  const swiper = this;
  if (typeof translate === "undefined") {
    const multiplier = swiper.rtlTranslate ? -1 : 1;
    translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
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
    progress = (translate - swiper.minTranslate()) / translatesDiff;
    const isBeginningRounded = Math.abs(translate - swiper.minTranslate()) < 1;
    const isEndRounded = Math.abs(translate - swiper.maxTranslate()) < 1;
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
    const translateAbs = Math.abs(translate);
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
    swiper.updateSlidesProgress(translate);
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/update/updateSlidesClasses.js
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/shared/process-lazy-preloader.js
var processLazyPreloader = (swiper, imageEl) => {
  if (!swiper || swiper.destroyed || !swiper.params)
    return;
  const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
  const slideEl = imageEl.closest(slideSelector());
  if (slideEl) {
    const lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
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
  const slideIndexLastInView = activeIndex + slidesPerView - 1;
  if (swiper.params.rewind) {
    for (let i2 = activeIndex - amount; i2 <= slideIndexLastInView + amount; i2 += 1) {
      const realIndex = (i2 % len + len) % len;
      if (realIndex !== activeIndex && realIndex > slideIndexLastInView)
        unlazy(swiper, realIndex);
    }
  } else {
    for (let i2 = Math.max(slideIndexLastInView - amount, 0); i2 <= Math.min(slideIndexLastInView + amount, len - 1); i2 += 1) {
      if (i2 !== activeIndex && i2 > slideIndexLastInView)
        unlazy(swiper, i2);
    }
  }
};

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/update/updateActiveIndex.js
function getActiveIndexByTranslate(swiper) {
  const {
    slidesGrid,
    params
  } = swiper;
  const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  let activeIndex;
  for (let i2 = 0; i2 < slidesGrid.length; i2 += 1) {
    if (typeof slidesGrid[i2 + 1] !== "undefined") {
      if (translate >= slidesGrid[i2] && translate < slidesGrid[i2 + 1] - (slidesGrid[i2 + 1] - slidesGrid[i2]) / 2) {
        activeIndex = i2;
      } else if (translate >= slidesGrid[i2] && translate < slidesGrid[i2 + 1]) {
        activeIndex = i2 + 1;
      }
    } else if (translate >= slidesGrid[i2]) {
      activeIndex = i2;
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
  const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
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
  if (snapGrid.indexOf(translate) >= 0) {
    snapIndex = snapGrid.indexOf(translate);
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/update/updateClickedSlide.js
function updateClickedSlide(e2) {
  const swiper = this;
  const params = swiper.params;
  const slide = e2.closest(`.${params.slideClass}, swiper-slide`);
  let slideFound = false;
  let slideIndex;
  if (slide) {
    for (let i2 = 0; i2 < swiper.slides.length; i2 += 1) {
      if (swiper.slides[i2] === slide) {
        slideFound = true;
        slideIndex = i2;
        break;
      }
    }
  }
  if (slide && slideFound) {
    swiper.clickedSlide = slide;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      swiper.clickedIndex = parseInt(slide.getAttribute("data-swiper-slide-index"), 10);
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/update/index.js
var update_default = {
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/translate/getTranslate.js
function getSwiperTranslate(axis = this.isHorizontal() ? "x" : "y") {
  const swiper = this;
  const {
    params,
    rtlTranslate: rtl,
    translate,
    wrapperEl
  } = swiper;
  if (params.virtualTranslate) {
    return rtl ? -translate : translate;
  }
  if (params.cssMode) {
    return translate;
  }
  let currentTranslate = getTranslate(wrapperEl, axis);
  currentTranslate += swiper.cssOverflowAdjustment();
  if (rtl)
    currentTranslate = -currentTranslate;
  return currentTranslate || 0;
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/translate/setTranslate.js
function setTranslate(translate, byController) {
  const swiper = this;
  const {
    rtlTranslate: rtl,
    params,
    wrapperEl,
    progress
  } = swiper;
  let x2 = 0;
  let y3 = 0;
  const z2 = 0;
  if (swiper.isHorizontal()) {
    x2 = rtl ? -translate : translate;
  } else {
    y3 = translate;
  }
  if (params.roundLengths) {
    x2 = Math.floor(x2);
    y3 = Math.floor(y3);
  }
  swiper.previousTranslate = swiper.translate;
  swiper.translate = swiper.isHorizontal() ? x2 : y3;
  if (params.cssMode) {
    wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x2 : -y3;
  } else if (!params.virtualTranslate) {
    if (swiper.isHorizontal()) {
      x2 -= swiper.cssOverflowAdjustment();
    } else {
      y3 -= swiper.cssOverflowAdjustment();
    }
    wrapperEl.style.transform = `translate3d(${x2}px, ${y3}px, ${z2}px)`;
  }
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== progress) {
    swiper.updateProgress(translate);
  }
  swiper.emit("setTranslate", swiper.translate, byController);
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/translate/minTranslate.js
function minTranslate() {
  return -this.snapGrid[0];
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/translate/maxTranslate.js
function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/translate/translateTo.js
function translateTo(translate = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
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
  if (translateBounds && translate > minTranslate2)
    newTranslate = minTranslate2;
  else if (translateBounds && translate < maxTranslate2)
    newTranslate = maxTranslate2;
  else
    newTranslate = translate;
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
        swiper.onTranslateToWrapperTransitionEnd = function transitionEnd2(e2) {
          if (!swiper || swiper.destroyed)
            return;
          if (e2.target !== this)
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/translate/index.js
var translate_default = {
  getTranslate: getSwiperTranslate,
  setTranslate,
  minTranslate,
  maxTranslate,
  translateTo
};

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/transition/setTransition.js
function setTransition(duration, byController) {
  const swiper = this;
  if (!swiper.params.cssMode) {
    swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
  }
  swiper.emit("setTransition", duration, byController);
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/transition/transitionEmit.js
function transitionEmit({
  swiper,
  runCallbacks,
  direction,
  step
}) {
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/transition/transitionStart.js
function transitionStart(runCallbacks = true, direction) {
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/transition/transitionEnd.js
function transitionEnd(runCallbacks = true, direction) {
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/transition/index.js
var transition_default = {
  setTransition,
  transitionStart,
  transitionEnd
};

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/slide/slideTo.js
function slideTo(index = 0, speed = this.params.speed, runCallbacks = true, internal, initial) {
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
  const translate = -snapGrid[snapIndex];
  if (params.normalizeSlideIndex) {
    for (let i2 = 0; i2 < slidesGrid.length; i2 += 1) {
      const normalizedTranslate = -Math.floor(translate * 100);
      const normalizedGrid = Math.floor(slidesGrid[i2] * 100);
      const normalizedGridNext = Math.floor(slidesGrid[i2 + 1] * 100);
      if (typeof slidesGrid[i2 + 1] !== "undefined") {
        if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
          slideIndex = i2;
        } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
          slideIndex = i2 + 1;
        }
      } else if (normalizedTranslate >= normalizedGrid) {
        slideIndex = i2;
      }
    }
  }
  if (swiper.initialized && slideIndex !== activeIndex) {
    if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
      return false;
    }
    if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
      if ((activeIndex || 0) !== slideIndex) {
        return false;
      }
    }
  }
  if (slideIndex !== (previousIndex || 0) && runCallbacks) {
    swiper.emit("beforeSlideChangeStart");
  }
  swiper.updateProgress(translate);
  let direction;
  if (slideIndex > activeIndex)
    direction = "next";
  else if (slideIndex < activeIndex)
    direction = "prev";
  else
    direction = "reset";
  if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
    swiper.updateActiveIndex(slideIndex);
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    swiper.updateSlidesClasses();
    if (params.effect !== "slide") {
      swiper.setTranslate(translate);
    }
    if (direction !== "reset") {
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    }
    return false;
  }
  if (params.cssMode) {
    const isH = swiper.isHorizontal();
    const t2 = rtl ? translate : -translate;
    if (speed === 0) {
      const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      if (isVirtual) {
        swiper.wrapperEl.style.scrollSnapType = "none";
        swiper._immediateVirtual = true;
      }
      if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
        swiper._cssModeVirtualInitialSet = true;
        requestAnimationFrame(() => {
          wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t2;
        });
      } else {
        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t2;
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
          targetPosition: t2,
          side: isH ? "left" : "top"
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? "left" : "top"]: t2,
        behavior: "smooth"
      });
    }
    return true;
  }
  swiper.setTransition(speed);
  swiper.setTranslate(translate);
  swiper.updateActiveIndex(slideIndex);
  swiper.updateSlidesClasses();
  swiper.emit("beforeTransitionStart", speed, internal);
  swiper.transitionStart(runCallbacks, direction);
  if (speed === 0) {
    swiper.transitionEnd(runCallbacks, direction);
  } else if (!swiper.animating) {
    swiper.animating = true;
    if (!swiper.onSlideToWrapperTransitionEnd) {
      swiper.onSlideToWrapperTransitionEnd = function transitionEnd2(e2) {
        if (!swiper || swiper.destroyed)
          return;
        if (e2.target !== this)
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/slide/slideToLoop.js
function slideToLoop(index = 0, speed = this.params.speed, runCallbacks = true, internal) {
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/slide/slideNext.js
function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/slide/slidePrev.js
function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
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
  const translate = rtlTranslate ? swiper.translate : -swiper.translate;
  function normalize(val) {
    if (val < 0)
      return -Math.floor(Math.abs(val));
    return Math.floor(val);
  }
  const normalizedTranslate = normalize(translate);
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/slide/slideReset.js
function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
  const swiper = this;
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/slide/slideToClosest.js
function slideToClosest(speed = this.params.speed, runCallbacks = true, internal, threshold = 0.5) {
  const swiper = this;
  let index = swiper.activeIndex;
  const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
  const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
  const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  if (translate >= swiper.snapGrid[snapIndex]) {
    const currentSnap = swiper.snapGrid[snapIndex];
    const nextSnap = swiper.snapGrid[snapIndex + 1];
    if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
      index += swiper.params.slidesPerGroup;
    }
  } else {
    const prevSnap = swiper.snapGrid[snapIndex - 1];
    const currentSnap = swiper.snapGrid[snapIndex];
    if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) {
      index -= swiper.params.slidesPerGroup;
    }
  }
  index = Math.max(index, 0);
  index = Math.min(index, swiper.slidesGrid.length - 1);
  return swiper.slideTo(index, speed, runCallbacks, internal);
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/slide/slideToClickedSlide.js
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/slide/index.js
var slide_default = {
  slideTo,
  slideToLoop,
  slideNext,
  slidePrev,
  slideReset,
  slideToClosest,
  slideToClickedSlide
};

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/loop/loopCreate.js
function loopCreate(slideRealIndex) {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  if (!params.loop || swiper.virtual && swiper.params.virtual.enabled)
    return;
  const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
  slides.forEach((el2, index) => {
    el2.setAttribute("data-swiper-slide-index", index);
  });
  swiper.loopFix({
    slideRealIndex,
    direction: params.centeredSlides ? void 0 : "next"
  });
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/loop/loopFix.js
function loopFix({
  slideRealIndex,
  slideTo: slideTo2 = true,
  direction,
  setTranslate: setTranslate2,
  activeSlideIndex,
  byController,
  byMousewheel
} = {}) {
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
    activeSlideIndex = swiper.getSlideIndex(swiper.slides.filter((el2) => el2.classList.contains(params.slideActiveClass))[0]);
  } else {
    activeIndex = activeSlideIndex;
  }
  const isNext = direction === "next" || !direction;
  const isPrev = direction === "prev" || !direction;
  let slidesPrepended = 0;
  let slidesAppended = 0;
  if (activeSlideIndex < loopedSlides) {
    slidesPrepended = Math.max(loopedSlides - activeSlideIndex, params.slidesPerGroup);
    for (let i2 = 0; i2 < loopedSlides - activeSlideIndex; i2 += 1) {
      const index = i2 - Math.floor(i2 / slides.length) * slides.length;
      prependSlidesIndexes.push(slides.length - index - 1);
    }
  } else if (activeSlideIndex > swiper.slides.length - loopedSlides * 2) {
    slidesAppended = Math.max(activeSlideIndex - (swiper.slides.length - loopedSlides * 2), params.slidesPerGroup);
    for (let i2 = 0; i2 < slidesAppended; i2 += 1) {
      const index = i2 - Math.floor(i2 / slides.length) * slides.length;
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
          }
        }
      } else {
        if (setTranslate2) {
          swiper.slideToLoop(slideRealIndex, 0, false, true);
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
      slideTo: false,
      direction,
      setTranslate: setTranslate2,
      activeSlideIndex,
      byController: true
    };
    if (Array.isArray(swiper.controller.control)) {
      swiper.controller.control.forEach((c2) => {
        if (!c2.destroyed && c2.params.loop)
          c2.loopFix(loopParams);
      });
    } else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) {
      swiper.controller.control.loopFix(loopParams);
    }
  }
  swiper.emit("loopFix");
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/loop/loopDestroy.js
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/loop/index.js
var loop_default = {
  loopCreate,
  loopFix,
  loopDestroy
};

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/grab-cursor/setGrabCursor.js
function setGrabCursor(moving) {
  const swiper = this;
  if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode)
    return;
  const el2 = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  el2.style.cursor = "move";
  el2.style.cursor = moving ? "grabbing" : "grab";
  if (swiper.isElement) {
    requestAnimationFrame(() => {
      swiper.__preventObserver__ = false;
    });
  }
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/grab-cursor/unsetGrabCursor.js
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/grab-cursor/index.js
var grab_cursor_default = {
  setGrabCursor,
  unsetGrabCursor
};

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/events/onTouchStart.js
function closestElement(selector, base = this) {
  function __closestFrom(el2) {
    if (!el2 || el2 === getDocument() || el2 === getWindow())
      return null;
    if (el2.assignedSlot)
      el2 = el2.assignedSlot;
    const found = el2.closest(selector);
    if (!found && !el2.getRootNode) {
      return null;
    }
    return found || __closestFrom(el2.getRootNode().host);
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
  let e2 = event2;
  if (e2.originalEvent)
    e2 = e2.originalEvent;
  let targetEl = e2.target;
  if (params.touchEventsTarget === "wrapper") {
    if (!swiper.wrapperEl.contains(targetEl))
      return;
  }
  if ("which" in e2 && e2.which === 3)
    return;
  if ("button" in e2 && e2.button > 0)
    return;
  if (data.isTouched && data.isMoved)
    return;
  const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
  const eventPath = event2.composedPath ? event2.composedPath() : event2.path;
  if (swipingClassHasValue && e2.target && e2.target.shadowRoot && eventPath) {
    targetEl = eventPath[0];
  }
  const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
  const isTargetShadow = !!(e2.target && e2.target.shadowRoot);
  if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
    swiper.allowClick = true;
    return;
  }
  if (params.swipeHandler) {
    if (!targetEl.closest(params.swipeHandler))
      return;
  }
  touches.currentX = e2.pageX;
  touches.currentY = e2.pageY;
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
    e2.preventDefault();
  }
  if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
    swiper.freeMode.onTouchStart();
  }
  swiper.emit("touchStart", e2);
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/events/onTouchMove.js
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
  let e2 = event2;
  if (e2.originalEvent)
    e2 = e2.originalEvent;
  if (!data.isTouched) {
    if (data.startMoving && data.isScrolling) {
      swiper.emit("touchMoveOpposite", e2);
    }
    return;
  }
  const pointerIndex = data.evCache.findIndex((cachedEv) => cachedEv.pointerId === e2.pointerId);
  if (pointerIndex >= 0)
    data.evCache[pointerIndex] = e2;
  const targetTouch = data.evCache.length > 1 ? data.evCache[0] : e2;
  const pageX = targetTouch.pageX;
  const pageY = targetTouch.pageY;
  if (e2.preventedByNestedSwiper) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }
  if (!swiper.allowTouchMove) {
    if (!e2.target.matches(data.focusableElements)) {
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
    if (e2.target === document2.activeElement && e2.target.matches(data.focusableElements)) {
      data.isMoved = true;
      swiper.allowClick = false;
      return;
    }
  }
  if (data.allowTouchCallbacks) {
    swiper.emit("touchMove", e2);
  }
  if (e2.targetTouches && e2.targetTouches.length > 1)
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
    swiper.emit("touchMoveOpposite", e2);
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
  if (!params.cssMode && e2.cancelable) {
    e2.preventDefault();
  }
  if (params.touchMoveStopPropagation && !params.nested) {
    e2.stopPropagation();
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
    swiper.emit("sliderFirstMove", e2);
  }
  let loopFixed;
  if (data.isMoved && prevTouchesDirection !== swiper.touchesDirection && isLoop && Math.abs(diff) >= 1) {
    swiper.loopFix({
      direction: swiper.swipeDirection,
      setTranslate: true
    });
    loopFixed = true;
  }
  swiper.emit("sliderMove", e2);
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
    e2.preventedByNestedSwiper = true;
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
  if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) {
    swiper.freeMode.onTouchMove();
  }
  swiper.updateProgress(data.currentTranslate);
  swiper.setTranslate(data.currentTranslate);
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/events/onTouchEnd.js
function onTouchEnd(event2) {
  const swiper = this;
  const data = swiper.touchEventsData;
  const pointerIndex = data.evCache.findIndex((cachedEv) => cachedEv.pointerId === event2.pointerId);
  if (pointerIndex >= 0) {
    data.evCache.splice(pointerIndex, 1);
  }
  if (["pointercancel", "pointerout", "pointerleave"].includes(event2.type)) {
    const proceed = event2.type === "pointercancel" && (swiper.browser.isSafari || swiper.browser.isWebView);
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
  let e2 = event2;
  if (e2.originalEvent)
    e2 = e2.originalEvent;
  if (data.allowTouchCallbacks) {
    swiper.emit("touchEnd", e2);
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
    const pathTree = e2.path || e2.composedPath && e2.composedPath();
    swiper.updateClickedSlide(pathTree && pathTree[0] || e2.target);
    swiper.emit("tap click", e2);
    if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
      swiper.emit("doubleTap doubleClick", e2);
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
  if (swiper.params.freeMode && params.freeMode.enabled) {
    swiper.freeMode.onTouchEnd({
      currentPos
    });
    return;
  }
  let stopIndex = 0;
  let groupSize = swiper.slidesSizesGrid[0];
  for (let i2 = 0; i2 < slidesGrid.length; i2 += i2 < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
    const increment2 = i2 < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (typeof slidesGrid[i2 + increment2] !== "undefined") {
      if (currentPos >= slidesGrid[i2] && currentPos < slidesGrid[i2 + increment2]) {
        stopIndex = i2;
        groupSize = slidesGrid[i2 + increment2] - slidesGrid[i2];
      }
    } else if (currentPos >= slidesGrid[i2]) {
      stopIndex = i2;
      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
    }
  }
  let rewindFirstIndex = null;
  let rewindLastIndex = null;
  if (params.rewind) {
    if (swiper.isBeginning) {
      rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
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
    const isNavButtonTarget = swiper.navigation && (e2.target === swiper.navigation.nextEl || e2.target === swiper.navigation.prevEl);
    if (!isNavButtonTarget) {
      if (swiper.swipeDirection === "next") {
        swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
      }
      if (swiper.swipeDirection === "prev") {
        swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
      }
    } else if (e2.target === swiper.navigation.nextEl) {
      swiper.slideTo(stopIndex + increment);
    } else {
      swiper.slideTo(stopIndex);
    }
  }
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/events/onResize.js
function onResize() {
  const swiper = this;
  const {
    params,
    el: el2
  } = swiper;
  if (el2 && el2.offsetWidth === 0)
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/events/onClick.js
function onClick(e2) {
  const swiper = this;
  if (!swiper.enabled)
    return;
  if (!swiper.allowClick) {
    if (swiper.params.preventClicks)
      e2.preventDefault();
    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e2.stopPropagation();
      e2.stopImmediatePropagation();
    }
  }
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/events/onScroll.js
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/events/onLoad.js
function onLoad(e2) {
  const swiper = this;
  processLazyPreloader(swiper, e2.target);
  if (swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) {
    return;
  }
  swiper.update();
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/events/index.js
var dummyEventAttached = false;
function dummyEventListener() {
}
var events = (swiper, method) => {
  const document2 = getDocument();
  const {
    params,
    el: el2,
    wrapperEl,
    device
  } = swiper;
  const capture = !!params.nested;
  const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
  const swiperMethod = method;
  el2[domMethod]("pointerdown", swiper.onTouchStart, {
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
  if (params.preventClicks || params.preventClicksPropagation) {
    el2[domMethod]("click", swiper.onClick, true);
  }
  if (params.cssMode) {
    wrapperEl[domMethod]("scroll", swiper.onScroll);
  }
  if (params.updateOnWindowResize) {
    swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true);
  } else {
    swiper[swiperMethod]("observerUpdate", onResize, true);
  }
  el2[domMethod]("load", swiper.onLoad, {
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
var events_default = {
  attachEvents,
  detachEvents
};

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/breakpoints/setBreakpoint.js
var isGridEnabled = (swiper, params) => {
  return swiper.grid && params.grid && params.grid.rows > 1;
};
function setBreakpoint() {
  const swiper = this;
  const {
    realIndex,
    initialized,
    params,
    el: el2
  } = swiper;
  const breakpoints = params.breakpoints;
  if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0)
    return;
  const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
  if (!breakpoint || swiper.currentBreakpoint === breakpoint)
    return;
  const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
  const breakpointParams = breakpointOnlyParams || swiper.originalParams;
  const wasMultiRow = isGridEnabled(swiper, params);
  const isMultiRow = isGridEnabled(swiper, breakpointParams);
  const wasEnabled = params.enabled;
  if (wasMultiRow && !isMultiRow) {
    el2.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
    swiper.emitContainerClasses();
  } else if (!wasMultiRow && isMultiRow) {
    el2.classList.add(`${params.containerModifierClass}grid`);
    if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") {
      el2.classList.add(`${params.containerModifierClass}grid-column`);
    }
    swiper.emitContainerClasses();
  }
  ["navigation", "pagination", "scrollbar"].forEach((prop) => {
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/breakpoints/getBreakpoint.js
function getBreakpoint(breakpoints, base = "window", containerEl) {
  if (!breakpoints || base === "container" && !containerEl)
    return void 0;
  let breakpoint = false;
  const window2 = getWindow();
  const currentHeight = base === "window" ? window2.innerHeight : containerEl.clientHeight;
  const points = Object.keys(breakpoints).map((point) => {
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
  points.sort((a3, b2) => parseInt(a3.value, 10) - parseInt(b2.value, 10));
  for (let i2 = 0; i2 < points.length; i2 += 1) {
    const {
      point,
      value
    } = points[i2];
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/breakpoints/index.js
var breakpoints_default = {
  setBreakpoint,
  getBreakpoint
};

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/classes/addClasses.js
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
    el: el2,
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
  el2.classList.add(...classNames);
  swiper.emitContainerClasses();
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/classes/removeClasses.js
function removeClasses() {
  const swiper = this;
  const {
    el: el2,
    classNames
  } = swiper;
  el2.classList.remove(...classNames);
  swiper.emitContainerClasses();
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/classes/index.js
var classes_default = {
  addClasses,
  removeClasses
};

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/check-overflow/index.js
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
var check_overflow_default = {
  checkOverflow
};

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/defaults.js
var defaults_default = {
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/moduleExtendParams.js
function moduleExtendParams(params, allModulesParams) {
  return function extendParams(obj = {}) {
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/core/core.js
var prototypes = {
  eventsEmitter: events_emitter_default,
  update: update_default,
  translate: translate_default,
  transition: transition_default,
  slide: slide_default,
  loop: loop_default,
  grabCursor: grab_cursor_default,
  events: events_default,
  breakpoints: breakpoints_default,
  checkOverflow: check_overflow_default,
  classes: classes_default
};
var extendedDefaults = {};
var Swiper = class {
  constructor(...args) {
    let el2;
    let params;
    if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") {
      params = args[0];
    } else {
      [el2, params] = args;
    }
    if (!params)
      params = {};
    params = extend2({}, params);
    if (el2 && !params.el)
      params.el = el2;
    const document2 = getDocument();
    if (params.el && typeof params.el === "string" && document2.querySelectorAll(params.el).length > 1) {
      const swipers = [];
      document2.querySelectorAll(params.el).forEach((containerEl) => {
        const newParams = extend2({}, params, {
          el: containerEl
        });
        swipers.push(new Swiper(newParams));
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
    const swiperParams = extend2({}, defaults_default, allModulesParams);
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
      el: el2,
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
  slidesPerViewDynamic(view = "current", exact = false) {
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
      let slideSize = slides[activeIndex].swiperSlideSize;
      let breakLoop;
      for (let i2 = activeIndex + 1; i2 < slides.length; i2 += 1) {
        if (slides[i2] && !breakLoop) {
          slideSize += slides[i2].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize)
            breakLoop = true;
        }
      }
      for (let i2 = activeIndex - 1; i2 >= 0; i2 -= 1) {
        if (slides[i2] && !breakLoop) {
          slideSize += slides[i2].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize)
            breakLoop = true;
        }
      }
    } else {
      if (view === "current") {
        for (let i2 = activeIndex + 1; i2 < slides.length; i2 += 1) {
          const slideInView = exact ? slidesGrid[i2] + slidesSizesGrid[i2] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i2] - slidesGrid[activeIndex] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      } else {
        for (let i2 = activeIndex - 1; i2 >= 0; i2 -= 1) {
          const slideInView = slidesGrid[activeIndex] - slidesGrid[i2] < swiperSize;
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
    if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
      setTranslate2();
      if (swiper.params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      if ((swiper.params.slidesPerView === "auto" || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
        const slides = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
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
  changeDirection(newDirection, needUpdate = true) {
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
    let el2 = element || swiper.params.el;
    if (typeof el2 === "string") {
      el2 = document.querySelector(el2);
    }
    if (!el2) {
      return false;
    }
    el2.swiper = swiper;
    if (el2.shadowEl) {
      swiper.isElement = true;
    }
    const getWrapperSelector = () => {
      return `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
    };
    const getWrapper = () => {
      if (el2 && el2.shadowRoot && el2.shadowRoot.querySelector) {
        const res = el2.shadowRoot.querySelector(getWrapperSelector());
        return res;
      }
      return elementChildren(el2, getWrapperSelector())[0];
    };
    let wrapperEl = getWrapper();
    if (!wrapperEl && swiper.params.createElements) {
      wrapperEl = createElement("div", swiper.params.wrapperClass);
      el2.append(wrapperEl);
      elementChildren(el2, `.${swiper.params.slideClass}`).forEach((slideEl) => {
        wrapperEl.append(slideEl);
      });
    }
    Object.assign(swiper, {
      el: el2,
      wrapperEl,
      slidesEl: swiper.isElement ? el2 : wrapperEl,
      mounted: true,
      // RTL
      rtl: el2.dir.toLowerCase() === "rtl" || elementStyle(el2, "direction") === "rtl",
      rtlTranslate: swiper.params.direction === "horizontal" && (el2.dir.toLowerCase() === "rtl" || elementStyle(el2, "direction") === "rtl"),
      wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
    });
    return true;
  }
  init(el2) {
    const swiper = this;
    if (swiper.initialized)
      return swiper;
    const mounted = swiper.mount(el2);
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
    [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach((imageEl) => {
      if (imageEl.complete) {
        processLazyPreloader(swiper, imageEl);
      } else {
        imageEl.addEventListener("load", (e2) => {
          processLazyPreloader(swiper, e2.target);
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
  destroy(deleteInstance = true, cleanStyles = true) {
    const swiper = this;
    const {
      params,
      el: el2,
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
      el2.removeAttribute("style");
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
    return defaults_default;
  }
  static installModule(mod) {
    if (!Swiper.prototype.__modules__)
      Swiper.prototype.__modules__ = [];
    const modules = Swiper.prototype.__modules__;
    if (typeof mod === "function" && modules.indexOf(mod) < 0) {
      modules.push(mod);
    }
  }
  static use(module) {
    if (Array.isArray(module)) {
      module.forEach((m3) => Swiper.installModule(m3));
      return Swiper;
    }
    Swiper.installModule(module);
    return Swiper;
  }
};
Object.keys(prototypes).forEach((prototypeGroup) => {
  Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
    Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
  });
});
Swiper.use([Resize, Observer]);
var core_default = Swiper;

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/shared/create-element-if-not-defined.js
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/modules/navigation/navigation.js
function Navigation({
  swiper,
  extendParams,
  on,
  emit
}) {
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
  const makeElementsArray = (el2) => {
    if (!Array.isArray(el2))
      el2 = [el2].filter((e2) => !!e2);
    return el2;
  };
  function getEl(el2) {
    let res;
    if (el2 && typeof el2 === "string" && swiper.isElement) {
      res = swiper.el.shadowRoot.querySelector(el2);
      if (res)
        return res;
    }
    if (el2) {
      if (typeof el2 === "string")
        res = [...document.querySelectorAll(el2)];
      if (swiper.params.uniqueNavElements && typeof el2 === "string" && res.length > 1 && swiper.el.querySelectorAll(el2).length === 1) {
        res = swiper.el.querySelector(el2);
      }
    }
    if (el2 && !res)
      return el2;
    return res;
  }
  function toggleEl(el2, disabled) {
    const params = swiper.params.navigation;
    el2 = makeElementsArray(el2);
    el2.forEach((subEl) => {
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
  function update() {
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
  function onPrevClick(e2) {
    e2.preventDefault();
    if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind)
      return;
    swiper.slidePrev();
    emit("navigationPrev");
  }
  function onNextClick(e2) {
    e2.preventDefault();
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
    const initButton = (el2, dir) => {
      if (el2) {
        el2.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
      }
      if (!swiper.enabled && el2) {
        el2.classList.add(...params.lockClass.split(" "));
      }
    };
    nextEl.forEach((el2) => initButton(el2, "next"));
    prevEl.forEach((el2) => initButton(el2, "prev"));
  }
  function destroy() {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const destroyButton = (el2, dir) => {
      el2.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
      el2.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
    };
    nextEl.forEach((el2) => destroyButton(el2, "next"));
    prevEl.forEach((el2) => destroyButton(el2, "prev"));
  }
  on("init", () => {
    if (swiper.params.navigation.enabled === false) {
      disable();
    } else {
      init();
      update();
    }
  });
  on("toEdge fromEdge lock unlock", () => {
    update();
  });
  on("destroy", () => {
    destroy();
  });
  on("enable disable", () => {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    [...nextEl, ...prevEl].filter((el2) => !!el2).forEach((el2) => el2.classList[swiper.enabled ? "remove" : "add"](swiper.params.navigation.lockClass));
  });
  on("click", (_s, e2) => {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const targetEl = e2.target;
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
      [...nextEl, ...prevEl].filter((el2) => !!el2).forEach((el2) => el2.classList.toggle(swiper.params.navigation.hiddenClass));
    }
  });
  const enable = () => {
    swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(" "));
    init();
    update();
  };
  const disable = () => {
    swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(" "));
    destroy();
  };
  Object.assign(swiper.navigation, {
    enable,
    disable,
    update,
    init,
    destroy
  });
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/shared/classes-to-selector.js
function classesToSelector(classes = "") {
  return `.${classes.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/modules/pagination/pagination.js
function Pagination({
  swiper,
  extendParams,
  on,
  emit
}) {
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
  const makeElementsArray = (el2) => {
    if (!Array.isArray(el2))
      el2 = [el2].filter((e2) => !!e2);
    return el2;
  };
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
  function onBulletClick(e2) {
    const bulletEl = e2.target.closest(classesToSelector(swiper.params.pagination.bulletClass));
    if (!bulletEl) {
      return;
    }
    e2.preventDefault();
    const index = elementIndex(bulletEl) * swiper.params.slidesPerGroup;
    if (swiper.params.loop) {
      if (swiper.realIndex === index)
        return;
      const newSlideIndex = swiper.getSlideIndexByData(index);
      const currentSlideIndex = swiper.getSlideIndexByData(swiper.realIndex);
      if (newSlideIndex > swiper.slides.length - swiper.loopedSlides) {
        swiper.loopFix({
          direction: newSlideIndex > currentSlideIndex ? "next" : "prev",
          activeSlideIndex: newSlideIndex,
          slideTo: false
        });
      }
      swiper.slideToLoop(index);
    } else {
      swiper.slideTo(index);
    }
  }
  function update() {
    const rtl = swiper.rtl;
    const params = swiper.params.pagination;
    if (isPaginationDisabled())
      return;
    let el2 = swiper.pagination.el;
    el2 = makeElementsArray(el2);
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
        el2.forEach((subEl) => {
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
      if (el2.length > 1) {
        bullets.forEach((bullet) => {
          const bulletIndex = elementIndex(bullet);
          if (bulletIndex === current) {
            bullet.classList.add(...params.bulletActiveClass.split(" "));
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
        if (params.dynamicBullets) {
          const firstDisplayedBullet = bullets[firstIndex];
          const lastDisplayedBullet = bullets[lastIndex];
          for (let i2 = firstIndex; i2 <= lastIndex; i2 += 1) {
            if (bullets[i2]) {
              bullets[i2].classList.add(...`${params.bulletActiveClass}-main`.split(" "));
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
    el2.forEach((subEl, subElIndex) => {
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
  function render() {
    const params = swiper.params.pagination;
    if (isPaginationDisabled())
      return;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    let el2 = swiper.pagination.el;
    el2 = makeElementsArray(el2);
    let paginationHTML = "";
    if (params.type === "bullets") {
      let numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) {
        numberOfBullets = slidesLength;
      }
      for (let i2 = 0; i2 < numberOfBullets; i2 += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(swiper, i2, params.bulletClass);
        } else {
          paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
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
    el2.forEach((subEl) => {
      if (params.type !== "custom") {
        subEl.innerHTML = paginationHTML || "";
      }
      if (params.type === "bullets") {
        swiper.pagination.bullets.push(...subEl.querySelectorAll(classesToSelector(params.bulletClass)));
      }
    });
    if (params.type !== "custom") {
      emit("paginationRender", el2[0]);
    }
  }
  function init() {
    swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
      el: "swiper-pagination"
    });
    const params = swiper.params.pagination;
    if (!params.el)
      return;
    let el2;
    if (typeof params.el === "string" && swiper.isElement) {
      el2 = swiper.el.shadowRoot.querySelector(params.el);
    }
    if (!el2 && typeof params.el === "string") {
      el2 = [...document.querySelectorAll(params.el)];
    }
    if (!el2) {
      el2 = params.el;
    }
    if (!el2 || el2.length === 0)
      return;
    if (swiper.params.uniqueNavElements && typeof params.el === "string" && Array.isArray(el2) && el2.length > 1) {
      el2 = [...swiper.el.querySelectorAll(params.el)];
      if (el2.length > 1) {
        el2 = el2.filter((subEl) => {
          if (elementParents(subEl, ".swiper")[0] !== swiper.el)
            return false;
          return true;
        })[0];
      }
    }
    if (Array.isArray(el2) && el2.length === 1)
      el2 = el2[0];
    Object.assign(swiper.pagination, {
      el: el2
    });
    el2 = makeElementsArray(el2);
    el2.forEach((subEl) => {
      if (params.type === "bullets" && params.clickable) {
        subEl.classList.add(params.clickableClass);
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
    let el2 = swiper.pagination.el;
    if (el2) {
      el2 = makeElementsArray(el2);
      el2.forEach((subEl) => {
        subEl.classList.remove(params.hiddenClass);
        subEl.classList.remove(params.modifierClass + params.type);
        subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        if (params.clickable) {
          subEl.removeEventListener("click", onBulletClick);
        }
      });
    }
    if (swiper.pagination.bullets)
      swiper.pagination.bullets.forEach((subEl) => subEl.classList.remove(...params.bulletActiveClass.split(" ")));
  }
  on("changeDirection", () => {
    if (!swiper.pagination || !swiper.pagination.el)
      return;
    const params = swiper.params.pagination;
    let {
      el: el2
    } = swiper.pagination;
    el2 = makeElementsArray(el2);
    el2.forEach((subEl) => {
      subEl.classList.remove(params.horizontalClass, params.verticalClass);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    });
  });
  on("init", () => {
    if (swiper.params.pagination.enabled === false) {
      disable();
    } else {
      init();
      render();
      update();
    }
  });
  on("activeIndexChange", () => {
    if (typeof swiper.snapIndex === "undefined") {
      update();
    }
  });
  on("snapIndexChange", () => {
    update();
  });
  on("snapGridLengthChange", () => {
    render();
    update();
  });
  on("destroy", () => {
    destroy();
  });
  on("enable disable", () => {
    let {
      el: el2
    } = swiper.pagination;
    if (el2) {
      el2 = makeElementsArray(el2);
      el2.forEach((subEl) => subEl.classList[swiper.enabled ? "remove" : "add"](swiper.params.pagination.lockClass));
    }
  });
  on("lock unlock", () => {
    update();
  });
  on("click", (_s, e2) => {
    const targetEl = e2.target;
    let {
      el: el2
    } = swiper.pagination;
    if (!Array.isArray(el2))
      el2 = [el2].filter((element) => !!element);
    if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el2 && el2.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
      if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl))
        return;
      const isHidden = el2[0].classList.contains(swiper.params.pagination.hiddenClass);
      if (isHidden === true) {
        emit("paginationShow");
      } else {
        emit("paginationHide");
      }
      el2.forEach((subEl) => subEl.classList.toggle(swiper.params.pagination.hiddenClass));
    }
  });
  const enable = () => {
    swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
    let {
      el: el2
    } = swiper.pagination;
    if (el2) {
      el2 = makeElementsArray(el2);
      el2.forEach((subEl) => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass));
    }
    init();
    render();
    update();
  };
  const disable = () => {
    swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
    let {
      el: el2
    } = swiper.pagination;
    if (el2) {
      el2 = makeElementsArray(el2);
      el2.forEach((subEl) => subEl.classList.add(swiper.params.pagination.paginationDisabledClass));
    }
    destroy();
  };
  Object.assign(swiper.pagination, {
    enable,
    disable,
    render,
    update,
    init,
    destroy
  });
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/modules/autoplay/autoplay.js
function Autoplay({
  swiper,
  extendParams,
  on,
  emit,
  params
}) {
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
  function onTransitionEnd(e2) {
    if (!swiper || swiper.destroyed || !swiper.wrapperEl)
      return;
    if (e2.target !== swiper.wrapperEl)
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
  const onPointerEnter = (e2) => {
    if (e2.pointerType !== "mouse")
      return;
    pausedByInteraction = true;
    pause(true);
  };
  const onPointerLeave = (e2) => {
    if (e2.pointerType !== "mouse")
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
  on("init", () => {
    if (swiper.params.autoplay.enabled) {
      attachMouseEvents();
      attachDocumentEvents();
      autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
      start();
    }
  });
  on("destroy", () => {
    detachMouseEvents();
    detachDocumentEvents();
    if (swiper.autoplay.running) {
      stop();
    }
  });
  on("beforeTransitionStart", (_s, speed, internal) => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    if (internal || !swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on("sliderFirstMove", () => {
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
  on("touchEnd", () => {
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
  on("slideChange", () => {
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/shared/effect-init.js
function effectInit(params) {
  const {
    effect,
    swiper,
    on,
    setTranslate: setTranslate2,
    setTransition: setTransition2,
    overwriteParams,
    perspective,
    recreateShadows,
    getEffectParams
  } = params;
  on("beforeInit", () => {
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
  on("setTranslate", () => {
    if (swiper.params.effect !== effect)
      return;
    setTranslate2();
  });
  on("setTransition", (_s, duration) => {
    if (swiper.params.effect !== effect)
      return;
    setTransition2(duration);
  });
  on("transitionEnd", () => {
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
  on("virtualUpdate", () => {
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/shared/effect-target.js
function effectTarget(effectParams, slideEl) {
  const transformEl = getSlideTransformEl(slideEl);
  if (transformEl !== slideEl) {
    transformEl.style.backfaceVisibility = "hidden";
    transformEl.style["-webkit-backface-visibility"] = "hidden";
  }
  return transformEl;
}

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/shared/effect-virtual-transition-end.js
function effectVirtualTransitionEnd({
  swiper,
  duration,
  transformElements,
  allSlides
}) {
  const {
    activeIndex
  } = swiper;
  const getSlide = (el2) => {
    if (!el2.parentElement) {
      const slide = swiper.slides.filter((slideEl) => slideEl.shadowEl && slideEl.shadowEl === el2.parentNode)[0];
      return slide;
    }
    return el2.parentElement;
  };
  if (swiper.params.virtualTranslate && duration !== 0) {
    let eventTriggered = false;
    let transitionEndTarget;
    if (allSlides) {
      transitionEndTarget = transformElements;
    } else {
      transitionEndTarget = transformElements.filter((transformEl) => {
        const el2 = transformEl.classList.contains("swiper-slide-transform") ? getSlide(transformEl) : transformEl;
        return swiper.getSlideIndex(el2) === activeIndex;
      });
    }
    transitionEndTarget.forEach((el2) => {
      elementTransitionEnd(el2, () => {
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

// node_modules/.pnpm/swiper@9.3.2/node_modules/swiper/modules/effect-fade/effect-fade.js
function EffectFade({
  swiper,
  extendParams,
  on
}) {
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
    for (let i2 = 0; i2 < slides.length; i2 += 1) {
      const slideEl = swiper.slides[i2];
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
    transformElements.forEach((el2) => {
      el2.style.transitionDuration = `${duration}ms`;
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
    on,
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

// node_modules/.pnpm/vue-amazing-ui@0.0.30/node_modules/vue-amazing-ui/dist/vue-amazing-ui.js
function dateFormat(value = Date.now(), format2 = "YYYY-MM-DD HH:mm:ss") {
  if (typeof value === "number" || typeof value === "string") {
    var date = new Date(value);
  } else {
    var date = value;
  }
  function fixedTwo(value2) {
    return value2 < 10 ? "0" + value2 : String(value2);
  }
  var showTime = format2;
  if (showTime.includes("SSS")) {
    const S3 = date.getMilliseconds();
    showTime = showTime.replace("SSS", "0".repeat(3 - String(S3).length) + S3);
  }
  if (showTime.includes("YY")) {
    const Y2 = date.getFullYear();
    showTime = showTime.includes("YYYY") ? showTime.replace("YYYY", String(Y2)) : showTime.replace("YY", String(Y2).slice(2, 4));
  }
  if (showTime.includes("M")) {
    const M3 = date.getMonth() + 1;
    showTime = showTime.includes("MM") ? showTime.replace("MM", fixedTwo(M3)) : showTime.replace("M", String(M3));
  }
  if (showTime.includes("D")) {
    const D2 = date.getDate();
    showTime = showTime.includes("DD") ? showTime.replace("DD", fixedTwo(D2)) : showTime.replace("D", String(D2));
  }
  if (showTime.includes("H")) {
    const H3 = date.getHours();
    showTime = showTime.includes("HH") ? showTime.replace("HH", fixedTwo(H3)) : showTime.replace("H", String(H3));
  }
  if (showTime.includes("m")) {
    var m3 = date.getMinutes();
    showTime = showTime.includes("mm") ? showTime.replace("mm", fixedTwo(m3)) : showTime.replace("m", String(m3));
  }
  if (showTime.includes("s")) {
    var s3 = date.getSeconds();
    showTime = showTime.includes("ss") ? showTime.replace("ss", fixedTwo(s3)) : showTime.replace("s", String(s3));
  }
  return showTime;
}
var requestAnimationFrame$1 = typeof window !== "undefined" ? window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame : () => {
};
var cancelAnimationFrame$1 = typeof window !== "undefined" ? window.cancelAnimationFrame || window.mozCancelAnimationFrame : () => {
};
function rafTimeout(fn, delay = 0, interval = false) {
  const requestAnimationFrame2 = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  var start = null;
  function timeElapse(timestamp) {
    if (!start) {
      start = timestamp;
    }
    const elapsed = timestamp - start;
    if (elapsed >= delay) {
      fn();
      if (interval) {
        start = null;
        raf.id = requestAnimationFrame2(timeElapse);
      }
    } else {
      raf.id = requestAnimationFrame2(timeElapse);
    }
  }
  const raf = {
    // 引用类型保存，方便获取 requestAnimationFrame()方法返回的 ID.
    id: requestAnimationFrame2(timeElapse)
  };
  return raf;
}
function cancelRaf(raf) {
  if (raf && raf.id) {
    cancelAnimationFrame$1(raf.id);
  }
}
function throttle(fn, delay = 300) {
  var valid = true;
  return function() {
    if (valid) {
      valid = false;
      rafTimeout(() => {
        fn();
        valid = true;
      }, delay);
    }
    return false;
  };
}
function debounce(fn, delay = 300) {
  let timer = null;
  return function() {
    if (timer) {
      cancelRaf(timer);
    }
    timer = rafTimeout(fn, delay);
  };
}
function add2(num1, num2) {
  const num1DeciStr = String(num1).split(".")[1];
  const num2DeciStr = String(num2).split(".")[1];
  let maxLen = Math.max((num1DeciStr == null ? void 0 : num1DeciStr.length) || 0, (num2DeciStr == null ? void 0 : num2DeciStr.length) || 0);
  let num1Str = num1.toFixed(maxLen);
  let num2Str = num2.toFixed(maxLen);
  const result = +num1Str.replace(".", "") + +num2Str.replace(".", "");
  return result / Math.pow(10, maxLen);
}
function downloadFile(url, name) {
  var fileName = "";
  if (name) {
    fileName = name;
  } else {
    const res = url.split("?")[0].split("/");
    fileName = res[res.length - 1];
  }
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";
  xhr.onload = function() {
    if (xhr.status === 200) {
      const blob = xhr.response;
      const link = document.createElement("a");
      const body = document.querySelector("body");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.style.display = "none";
      body == null ? void 0 : body.appendChild(link);
      link.click();
      body == null ? void 0 : body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    }
  };
  xhr.send();
}
var _withScopeId$h = (n) => (pushScopeId("data-v-2a630eda"), n = n(), popScopeId(), n);
var _hoisted_1$v = ["href", "title", "target"];
var _hoisted_2$r = {
  key: 0,
  class: "u-separator"
};
var _hoisted_3$p = {
  key: 1,
  class: "u-arrow",
  viewBox: "64 64 896 896",
  "data-icon": "right",
  "aria-hidden": "true",
  focusable: "false"
};
var _hoisted_4$l = _withScopeId$h(() => createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" }, null, -1));
var _hoisted_5$i = [
  _hoisted_4$l
];
var _hoisted_6$h = _withScopeId$h(() => createBaseVNode("div", { class: "assist" }, null, -1));
var _sfc_main$y = defineComponent({
  __name: "Breadcrumb",
  props: {
    routes: { default: () => [] },
    fontSize: { default: 14 },
    height: { default: 21 },
    maxWidth: { default: 180 },
    separator: { default: "" },
    target: { default: "_self" }
  },
  setup(__props) {
    const props = __props;
    const len = computed(() => {
      return props.routes.length;
    });
    function getUrl(route) {
      var targetUrl = route.path;
      if (route.query && JSON.stringify(route.query) !== "{}") {
        const query = route.query;
        Object.keys(query).forEach((param, index) => {
          if (index === 0) {
            targetUrl = targetUrl + "?" + param + "=" + query[param];
          } else {
            targetUrl = targetUrl + "&" + param + "=" + query[param];
          }
        });
      }
      return targetUrl;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-breadcrumb",
        style: normalizeStyle(`height: ${_ctx.height}px;`)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.routes, (route, index) => {
          return openBlock(), createElementBlock("div", {
            class: "m-bread",
            key: index
          }, [
            createBaseVNode("a", {
              class: normalizeClass(["u-route", { active: index === len.value - 1 }]),
              style: normalizeStyle(`font-size: ${_ctx.fontSize}px; max-width: ${_ctx.maxWidth}px;`),
              href: index === len.value - 1 ? "javascript:;" : getUrl(route),
              title: route.name,
              target: index === len.value - 1 ? "_self" : _ctx.target
            }, toDisplayString(route.name || "--"), 15, _hoisted_1$v),
            index !== len.value - 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              _ctx.separator ? (openBlock(), createElementBlock("span", _hoisted_2$r, toDisplayString(_ctx.separator), 1)) : (openBlock(), createElementBlock("svg", _hoisted_3$p, _hoisted_5$i))
            ], 64)) : createCommentVNode("", true)
          ]);
        }), 128)),
        _hoisted_6$h
      ], 4);
    };
  }
});
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
var Breadcrumb = _export_sfc(_sfc_main$y, [["__scopeId", "data-v-2a630eda"]]);
Breadcrumb.install = (app) => {
  app.component(Breadcrumb.__name, Breadcrumb);
};
var _hoisted_1$u = ["href", "target", "disabled"];
var _hoisted_2$q = { class: "u-spin-circle" };
var _hoisted_3$o = { class: "u-text" };
var _sfc_main$x = defineComponent({
  __name: "Button",
  props: {
    name: { default: "按钮" },
    type: { default: "default" },
    effect: { default: "fade" },
    size: { default: "middle" },
    width: { default: 0 },
    height: { default: 0 },
    borderRadius: { default: 5 },
    route: { default: () => {
      return {};
    } },
    target: { default: "_self" },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    center: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const isRoute = computed(() => {
      if (JSON.stringify(props.route) === "{}") {
        return false;
      } else {
        return true;
      }
    });
    function getUrl(route) {
      var targetUrl = route.path;
      if (route.query && JSON.stringify(route.query) !== "{}") {
        const query = route.query;
        Object.keys(query).forEach((param, index) => {
          if (index === 0) {
            targetUrl = targetUrl + "?" + param + "=" + query[param];
          } else {
            targetUrl = targetUrl + "&" + param + "=" + query[param];
          }
        });
      }
      return targetUrl;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-btn-wrap", { "center": _ctx.center }])
      }, [
        createBaseVNode("a", {
          onClick: _cache[0] || (_cache[0] = withModifiers(($event) => isRoute.value ? () => false : _ctx.$emit("click", $event), ["stop"])),
          href: getUrl(_ctx.route),
          target: isRoute.value ? _ctx.target : "_self",
          disabled: _ctx.disabled,
          class: normalizeClass(["m-btn", [_ctx.type, _ctx.size, { [_ctx.effect]: _ctx.type === "default", widthType: _ctx.width, disabled: _ctx.disabled, "m-btn-loading": !isRoute.value && _ctx.loading }]]),
          style: normalizeStyle(`border-radius: ${_ctx.borderRadius}px; width: ${_ctx.width ? _ctx.width + "px" : "auto"}; height: ${_ctx.height ? _ctx.height + "px" : "auto"}; line-height: ${_ctx.height - 2}px;`)
        }, [
          withDirectives(createBaseVNode("span", {
            class: normalizeClass(["m-loading-icon", { "show-spin": _ctx.loading }])
          }, [
            withDirectives(createBaseVNode("span", _hoisted_2$q, null, 512), [
              [vShow, _ctx.loading]
            ])
          ], 2), [
            [vShow, !isRoute.value]
          ]),
          createBaseVNode("span", _hoisted_3$o, [
            renderSlot(_ctx.$slots, "default", {}, () => [
              createTextVNode(toDisplayString(_ctx.name), 1)
            ], true)
          ])
        ], 14, _hoisted_1$u)
      ], 2);
    };
  }
});
var Button = _export_sfc(_sfc_main$x, [["__scopeId", "data-v-75774b51"]]);
Button.install = (app) => {
  app.component(Button.__name, Button);
};
var _withScopeId$g = (n) => (pushScopeId("data-v-722ba211"), n = n(), popScopeId(), n);
var _hoisted_1$t = ["href", "target"];
var _hoisted_2$p = ["onLoad", "src", "alt"];
var _hoisted_3$n = { class: "u-spin-circle" };
var _hoisted_4$k = {
  key: 0,
  class: "m-image"
};
var _hoisted_5$h = ["href", "target"];
var _hoisted_6$g = ["src", "alt"];
var _hoisted_7$e = { class: "u-spin-circle" };
var _hoisted_8$d = _withScopeId$g(() => createBaseVNode("path", { d: "M603.3 327.5l-246 178a7.95 7.95 0 0 0 0 12.9l246 178c5.3 3.8 12.7 0 12.7-6.5V643c0-10.2-4.9-19.9-13.2-25.9L457.4 512l145.4-105.2c8.3-6 13.2-15.6 13.2-25.9V334c0-6.5-7.4-10.3-12.7-6.5z" }, null, -1));
var _hoisted_9$d = _withScopeId$g(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
var _hoisted_10$a = [
  _hoisted_8$d,
  _hoisted_9$d
];
var _hoisted_11$9 = _withScopeId$g(() => createBaseVNode("path", { d: "M666.7 505.5l-246-178A8 8 0 0 0 408 334v46.9c0 10.2 4.9 19.9 13.2 25.9L566.6 512 421.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5l246-178c4.4-3.2 4.4-9.8 0-13z" }, null, -1));
var _hoisted_12$8 = _withScopeId$g(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
var _hoisted_13$7 = [
  _hoisted_11$9,
  _hoisted_12$8
];
var _hoisted_14$7 = {
  key: 1,
  class: "m-switch"
};
var _hoisted_15$7 = ["onClick"];
var _sfc_main$w = defineComponent({
  __name: "Carousel",
  props: {
    images: { default: () => [] },
    interval: { default: 3e3 },
    width: { default: "100%" },
    height: { default: "100vh" },
    navigation: { type: Boolean, default: true },
    pagination: { type: Boolean, default: true },
    disableOnInteraction: { type: Boolean, default: true },
    pauseOnMouseEnter: { type: Boolean, default: true }
  },
  setup(__props) {
    const props = __props;
    const toLeft = ref(true);
    const left = ref(0);
    const transition = ref(false);
    const slideTimer = ref();
    const moveRaf = ref();
    const targetMove = ref();
    const switched = ref(false);
    const carousel = ref();
    const activeSwitcher = ref(1);
    const carouselWidth = computed(() => {
      if (typeof props.width === "number") {
        return props.width + "px";
      } else {
        return props.width;
      }
    });
    const carouselHeight = computed(() => {
      if (typeof props.height === "number") {
        return props.height + "px";
      } else {
        return props.height;
      }
    });
    const totalWidth = computed(() => {
      return (props.images.length + 1) * imageWidth.value;
    });
    const len = computed(() => {
      return props.images.length;
    });
    onMounted(() => {
      getFPS();
      getImageSize();
    });
    const complete = ref(Array(len.value).fill(false));
    const fpsRaf = ref();
    const fps = ref(60);
    const step = computed(() => {
      if (fps.value === 60) {
        return 12;
      } else {
        return 12 * (fps.value / 60);
      }
    });
    function onComplete(index) {
      complete.value[index] = true;
    }
    function getFPS() {
      const requestAnimationFrame2 = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      var start = null;
      function timeElapse(timestamp) {
        if (!start) {
          if (fpsRaf.value > 10) {
            start = timestamp;
          }
          fpsRaf.value = requestAnimationFrame2(timeElapse);
        } else {
          fps.value = Math.floor(1e3 / (timestamp - start));
          console.log("fps", fps.value);
          onStart();
        }
      }
      fpsRaf.value = requestAnimationFrame2(timeElapse);
    }
    const imageWidth = ref();
    const imageHeight = ref();
    function getImageSize() {
      imageWidth.value = carousel.value.offsetWidth;
      imageHeight.value = carousel.value.offsetHeight;
    }
    function onStart() {
      if (len.value > 1) {
        toLeft.value = true;
        transition.value = false;
        onAutoSlide();
        console.log("imageSlider start");
      }
    }
    function onStop() {
      cancelRaf(slideTimer.value);
      if (toLeft.value) {
        onStopLeft();
      } else {
        onStopRight();
      }
      console.log("imageSlider stop");
    }
    function onStopLeft() {
      cancelRaf(slideTimer.value);
      cancelAnimationFrame(moveRaf.value);
      transition.value = true;
      left.value = Math.ceil(left.value / imageWidth.value) * imageWidth.value;
    }
    function onStopRight() {
      cancelAnimationFrame(moveRaf.value);
      transition.value = true;
      left.value = Math.floor(left.value / imageWidth.value) * imageWidth.value;
    }
    function onAutoSlide() {
      slideTimer.value = rafTimeout(() => {
        const target = left.value % (len.value * imageWidth.value) + imageWidth.value;
        activeSwitcher.value = activeSwitcher.value % len.value + 1;
        autoMoveLeft(target);
      }, props.interval);
    }
    function goLeft(target) {
      if (toLeft.value) {
        onStopLeft();
      } else {
        onStopRight();
        toLeft.value = true;
      }
      transition.value = false;
      moveLeft(target);
    }
    function goRight(target) {
      if (toLeft.value) {
        onStopLeft();
        toLeft.value = false;
      } else {
        onStopRight();
      }
      transition.value = false;
      moveRight(target);
    }
    function onLeftArrow(target) {
      activeSwitcher.value = activeSwitcher.value - 1 > 0 ? activeSwitcher.value - 1 : len.value;
      goRight(target);
    }
    function onRightArrow(target) {
      activeSwitcher.value = activeSwitcher.value % len.value + 1;
      goLeft(target);
    }
    function autoMoveLeftEffect() {
      if (left.value >= targetMove.value) {
        onAutoSlide();
      } else {
        var move = Math.ceil((targetMove.value - left.value) / step.value);
        left.value += move;
        moveRaf.value = requestAnimationFrame(autoMoveLeftEffect);
      }
    }
    function autoMoveLeft(target) {
      if (left.value === len.value * imageWidth.value) {
        left.value = 0;
      }
      targetMove.value = target;
      moveRaf.value = requestAnimationFrame(autoMoveLeftEffect);
    }
    function moveLeftEffect() {
      if (left.value >= targetMove.value) {
        if (switched.value) {
          switched.value = false;
          if (!props.disableOnInteraction && !props.pauseOnMouseEnter) {
            onStart();
          }
        }
      } else {
        var move = Math.ceil((targetMove.value - left.value) / step.value);
        left.value += move;
        moveRaf.value = requestAnimationFrame(moveLeftEffect);
      }
    }
    function moveLeft(target) {
      if (left.value === len.value * imageWidth.value) {
        left.value = 0;
      }
      targetMove.value = target;
      moveRaf.value = requestAnimationFrame(moveLeftEffect);
    }
    function moveRightEffect() {
      if (left.value <= targetMove.value) {
        if (switched.value) {
          switched.value = false;
          if (!props.disableOnInteraction && !props.pauseOnMouseEnter) {
            onStart();
          }
        }
      } else {
        var move = Math.floor((targetMove.value - left.value) / step.value);
        left.value += move;
        moveRaf.value = requestAnimationFrame(moveRightEffect);
      }
    }
    function moveRight(target) {
      if (left.value === 0) {
        left.value = len.value * imageWidth.value;
      }
      targetMove.value = target;
      moveRaf.value = requestAnimationFrame(moveRightEffect);
    }
    function onSwitch(n) {
      if (activeSwitcher.value !== n) {
        switched.value = true;
        const target = (n - 1) * imageWidth.value;
        if (n < activeSwitcher.value) {
          activeSwitcher.value = n;
          goRight(target);
        }
        if (n > activeSwitcher.value) {
          activeSwitcher.value = n;
          goLeft(target);
        }
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-slider",
        ref_key: "carousel",
        ref: carousel,
        style: normalizeStyle(`width: ${carouselWidth.value}; height: ${carouselHeight.value};`),
        onMouseenter: _cache[3] || (_cache[3] = ($event) => _ctx.pauseOnMouseEnter ? onStop() : () => false),
        onMouseleave: _cache[4] || (_cache[4] = ($event) => _ctx.pauseOnMouseEnter ? onStart() : () => false)
      }, [
        createBaseVNode("div", {
          class: normalizeClass({ "transition": transition.value }),
          style: normalizeStyle(`width: ${totalWidth.value}px; height: 100%; will-change: transform; transform: translateX(${-left.value}px);`)
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.images, (image, index) => {
            return openBlock(), createElementBlock("div", {
              class: "m-image",
              key: index
            }, [
              createBaseVNode("a", {
                href: image.link ? image.link : "javascript:;",
                target: image.link ? "_blank" : "_self",
                class: "m-link"
              }, [
                (openBlock(), createElementBlock("img", {
                  onLoad: ($event) => onComplete(index),
                  src: image.src,
                  key: image.src,
                  alt: image.title,
                  class: "u-img",
                  style: normalizeStyle(`width: ${imageWidth.value}px; height: ${imageHeight.value}px;`)
                }, null, 44, _hoisted_2$p)),
                withDirectives(createBaseVNode("div", _hoisted_3$n, null, 512), [
                  [vShow, !complete.value[index]]
                ])
              ], 8, _hoisted_1$t)
            ]);
          }), 128)),
          len.value ? (openBlock(), createElementBlock("div", _hoisted_4$k, [
            createBaseVNode("a", {
              href: _ctx.images[0].link ? _ctx.images[0].link : "javascript:;",
              target: _ctx.images[0].link ? "_blank" : "_self",
              class: "m-link"
            }, [
              (openBlock(), createElementBlock("img", {
                onLoad: _cache[0] || (_cache[0] = ($event) => onComplete(0)),
                src: _ctx.images[0].src,
                key: _ctx.images[0].src,
                alt: _ctx.images[0].title,
                class: "u-img",
                style: normalizeStyle(`width: ${imageWidth.value}px; height: ${imageHeight.value}px;`)
              }, null, 44, _hoisted_6$g)),
              withDirectives(createBaseVNode("div", _hoisted_7$e, null, 512), [
                [vShow, !complete.value[0]]
              ])
            ], 8, _hoisted_5$h)
          ])) : createCommentVNode("", true)
        ], 6),
        _ctx.navigation ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          (openBlock(), createElementBlock("svg", {
            class: "arrow-left",
            onClick: _cache[1] || (_cache[1] = ($event) => onLeftArrow((activeSwitcher.value + len.value - 2) % len.value * imageWidth.value)),
            viewBox: "64 64 896 896",
            "data-icon": "left-circle",
            "aria-hidden": "true",
            focusable: "false"
          }, _hoisted_10$a)),
          (openBlock(), createElementBlock("svg", {
            class: "arrow-right",
            onClick: _cache[2] || (_cache[2] = ($event) => onRightArrow(activeSwitcher.value * imageWidth.value)),
            viewBox: "64 64 896 896",
            "data-icon": "right-circle",
            "aria-hidden": "true",
            focusable: "false"
          }, _hoisted_13$7))
        ], 64)) : createCommentVNode("", true),
        _ctx.pagination ? (openBlock(), createElementBlock("div", _hoisted_14$7, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(len.value, (n) => {
            return openBlock(), createElementBlock("div", {
              onClick: ($event) => onSwitch(n),
              class: normalizeClass(["u-rect", { "active": activeSwitcher.value === n }]),
              key: n
            }, null, 10, _hoisted_15$7);
          }), 128))
        ])) : createCommentVNode("", true)
      ], 36);
    };
  }
});
var Carousel = _export_sfc(_sfc_main$w, [["__scopeId", "data-v-722ba211"]]);
Carousel.install = (app) => {
  app.component(Carousel.__name, Carousel);
};
var _withScopeId$f = (n) => (pushScopeId("data-v-b62eea44"), n = n(), popScopeId(), n);
var _hoisted_1$s = ["title"];
var _hoisted_2$o = _withScopeId$f(() => createBaseVNode("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1));
var _hoisted_3$m = [
  _hoisted_2$o
];
var _hoisted_4$j = ["onClick"];
var _hoisted_5$g = _withScopeId$f(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1));
var _hoisted_6$f = [
  _hoisted_5$g
];
var _hoisted_7$d = ["title", "onMouseenter", "onClick"];
var _sfc_main$v = defineComponent({
  __name: "Select",
  props: {
    options: { default: () => [] },
    label: { default: "label" },
    value: { default: "value" },
    placeholder: { default: "请选择" },
    disabled: { type: Boolean, default: false },
    allowClear: { type: Boolean, default: false },
    width: { default: 120 },
    height: { default: 32 },
    maxDisplay: { default: 6 },
    modelValue: { default: null }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const selectedName = ref();
    const hoverValue = ref();
    const showOptions = ref(false);
    const activeBlur = ref(true);
    const showClose = ref(false);
    const select = ref();
    watchEffect(() => {
      initSelector();
    });
    function initSelector() {
      if (props.modelValue) {
        const target = props.options.find((option) => option[props.value] === props.modelValue);
        if (target) {
          selectedName.value = target[props.label];
          hoverValue.value = target[props.value];
        } else {
          selectedName.value = props.modelValue;
          hoverValue.value = null;
        }
      } else {
        selectedName.value = null;
        hoverValue.value = null;
      }
    }
    function onBlur() {
      if (showOptions.value) {
        showOptions.value = false;
      }
    }
    function onInputEnter() {
      if (props.allowClear && selectedName.value) {
        showClose.value = true;
      }
    }
    function onInputLeave() {
      if (props.allowClear && showClose.value) {
        showClose.value = false;
      }
    }
    function onHover(value) {
      hoverValue.value = value;
    }
    function onEnter() {
      activeBlur.value = false;
    }
    function onLeave() {
      hoverValue.value = null;
      activeBlur.value = true;
      select.value.focus();
    }
    function openSelect() {
      showOptions.value = !showOptions.value;
      if (!hoverValue.value && selectedName.value) {
        const target = props.options.find((option) => option[props.label] === selectedName.value);
        hoverValue.value = target ? target[props.value] : null;
      }
    }
    function onClear() {
      showClose.value = false;
      selectedName.value = null;
      hoverValue.value = null;
      emits("update:modelValue");
      emits("change");
    }
    function onChange(value, label, index) {
      if (props.modelValue !== value) {
        selectedName.value = label;
        hoverValue.value = value;
        emits("update:modelValue", value);
        emits("change", value, label, index);
      }
      showOptions.value = false;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-select",
        style: normalizeStyle(`height: ${_ctx.height}px;`)
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["m-select-wrap", { "hover": !_ctx.disabled, "focus": showOptions.value, "disabled": _ctx.disabled }]),
          style: normalizeStyle(`width: ${_ctx.width}px; height: ${_ctx.height}px;`),
          tabindex: "0",
          ref_key: "select",
          ref: select,
          onMouseenter: onInputEnter,
          onMouseleave: onInputLeave,
          onBlur: _cache[0] || (_cache[0] = ($event) => activeBlur.value && !_ctx.disabled ? onBlur() : () => false),
          onClick: _cache[1] || (_cache[1] = ($event) => _ctx.disabled ? () => false : openSelect())
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["u-select-input", { "placeholder": !selectedName.value }]),
            style: normalizeStyle(`line-height: ${_ctx.height - 2}px;`),
            title: selectedName.value
          }, toDisplayString(selectedName.value || _ctx.placeholder), 15, _hoisted_1$s),
          (openBlock(), createElementBlock("svg", {
            class: normalizeClass(["triangle", { "rotate": showOptions.value, "show": !showClose.value }]),
            viewBox: "64 64 896 896",
            "data-icon": "down",
            "aria-hidden": "true",
            focusable: "false"
          }, _hoisted_3$m, 2)),
          (openBlock(), createElementBlock("svg", {
            onClick: withModifiers(onClear, ["stop"]),
            class: normalizeClass(["close", { "show": showClose.value }]),
            focusable: "false",
            "data-icon": "close-circle",
            "aria-hidden": "true",
            viewBox: "64 64 896 896"
          }, _hoisted_6$f, 10, _hoisted_4$j))
        ], 38),
        createVNode(Transition, { name: "fade" }, {
          default: withCtx(() => [
            withDirectives(createBaseVNode("div", {
              class: "m-options-panel",
              onMouseenter: onEnter,
              onMouseleave: onLeave,
              style: normalizeStyle(`top: ${_ctx.height + 4}px; line-height: ${_ctx.height - 10}px; max-height: ${_ctx.maxDisplay * _ctx.height + 9}px; width: ${_ctx.width}px;`)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.options, (option, index) => {
                return openBlock(), createElementBlock("p", {
                  key: index,
                  class: normalizeClass(["u-option", { "option-selected": option[_ctx.label] === selectedName.value, "option-hover": !option.disabled && option[_ctx.value] === hoverValue.value, "option-disabled": option.disabled }]),
                  title: option[_ctx.label],
                  onMouseenter: ($event) => onHover(option[_ctx.value]),
                  onClick: ($event) => option.disabled ? () => false : onChange(option[_ctx.value], option[_ctx.label], index)
                }, toDisplayString(option[_ctx.label]), 43, _hoisted_7$d);
              }), 128))
            ], 36), [
              [vShow, showOptions.value]
            ])
          ]),
          _: 1
        })
      ], 4);
    };
  }
});
var Select = _export_sfc(_sfc_main$v, [["__scopeId", "data-v-b62eea44"]]);
Select.install = (app) => {
  app.component(Select.__name, Select);
};
var _sfc_main$u = defineComponent({
  __name: "Cascader",
  props: {
    options: { default: () => [] },
    selectedValue: { default: () => [] },
    label: { default: "label" },
    value: { default: "value" },
    children: { default: "children" },
    changeOnSelect: { type: Boolean, default: false },
    zIndex: { default: 1 },
    gap: { default: 8 },
    width: { default: 120 },
    height: { default: 32 },
    disabled: { type: [Boolean, Array], default: false },
    allowClear: { type: Boolean, default: false },
    placeholder: { default: "请选择" },
    maxDisplay: { default: 6 }
  },
  emits: ["update:selectedValue", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const values = ref([]);
    const labels = ref([]);
    const firstOptions = ref([]);
    const secondOptions = ref([]);
    const thirdOptions = ref([]);
    watchEffect(() => {
      firstOptions.value = [...props.options];
    });
    watchEffect(() => {
      values.value = [...props.selectedValue];
    });
    watchEffect(() => {
      initCascader(values.value);
      initLabels(values.value);
    });
    function findChildren(options, index) {
      const len = options.length;
      for (let i2 = 0; i2 < len; i2++) {
        if (options[i2][props.value] === values.value[index]) {
          return options[i2][props.children] || [];
        }
      }
      return [];
    }
    function initCascader(values2) {
      secondOptions.value = findChildren(firstOptions.value, 0);
      thirdOptions.value = [];
      if (values2.length > 1) {
        thirdOptions.value = findChildren(secondOptions.value, 1);
      }
    }
    function findLabel(options, index) {
      const len = options.length;
      for (let i2 = 0; i2 < len; i2++) {
        if (options[i2][props.value] === values.value[index]) {
          return options[i2][props.label];
        }
      }
      return values.value[index];
    }
    function initLabels(values2) {
      labels.value[0] = findLabel(firstOptions.value, 0);
      if (values2.length > 1) {
        labels.value[1] = findLabel(secondOptions.value, 1);
      }
      if (values2.length > 2) {
        labels.value[2] = findLabel(thirdOptions.value, 2);
      }
    }
    function onFirstChange(value, label) {
      if (props.changeOnSelect) {
        emits("update:selectedValue", [value]);
        emits("change", [value], [label]);
      } else {
        values.value = [value];
        labels.value = [label];
      }
    }
    function onSecondChange(value, label) {
      if (props.changeOnSelect) {
        emits("update:selectedValue", [values.value[0], value]);
        emits("change", [values.value[0], value], [labels.value[0], label]);
      } else {
        values.value = [values.value[0], value];
        labels.value = [labels.value[0], label];
      }
    }
    function onThirdChange(value, label) {
      emits("update:selectedValue", [...values.value.slice(0, 2), value]);
      emits("change", [...values.value.slice(0, 2), value], [...labels.value.slice(0, 2), label]);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-cascader-wrap",
        style: normalizeStyle(`height: ${_ctx.height}px;`)
      }, [
        createVNode(unref(Select), {
          style: normalizeStyle(`margin-right: ${_ctx.gap}px; z-index: ${_ctx.zIndex};`),
          options: firstOptions.value,
          modelValue: values.value[0],
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => values.value[0] = $event),
          label: _ctx.label,
          value: _ctx.value,
          disabled: Array.isArray(_ctx.disabled) ? _ctx.disabled[0] : _ctx.disabled,
          allowClear: _ctx.allowClear,
          width: Array.isArray(_ctx.width) ? _ctx.width[0] : _ctx.width,
          height: _ctx.height,
          maxDisplay: _ctx.maxDisplay,
          placeholder: Array.isArray(_ctx.placeholder) ? _ctx.placeholder[0] : _ctx.placeholder,
          onChange: onFirstChange
        }, null, 8, ["style", "options", "modelValue", "label", "value", "disabled", "allowClear", "width", "height", "maxDisplay", "placeholder"]),
        createVNode(unref(Select), {
          style: normalizeStyle(`margin-right: ${_ctx.gap}px; z-index: ${_ctx.zIndex};`),
          options: secondOptions.value,
          modelValue: values.value[1],
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => values.value[1] = $event),
          label: _ctx.label,
          value: _ctx.value,
          disabled: Array.isArray(_ctx.disabled) ? _ctx.disabled[1] : _ctx.disabled,
          allowClear: _ctx.allowClear,
          width: Array.isArray(_ctx.width) ? _ctx.width[1] : _ctx.width,
          height: _ctx.height,
          maxDisplay: _ctx.maxDisplay,
          placeholder: Array.isArray(_ctx.placeholder) ? _ctx.placeholder[1] : _ctx.placeholder,
          onChange: onSecondChange
        }, null, 8, ["style", "options", "modelValue", "label", "value", "disabled", "allowClear", "width", "height", "maxDisplay", "placeholder"]),
        createVNode(unref(Select), {
          style: normalizeStyle(`z-index: ${_ctx.zIndex};`),
          options: thirdOptions.value,
          modelValue: values.value[2],
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => values.value[2] = $event),
          label: _ctx.label,
          value: _ctx.value,
          disabled: Array.isArray(_ctx.disabled) ? _ctx.disabled[2] : _ctx.disabled,
          allowClear: _ctx.allowClear,
          width: Array.isArray(_ctx.width) ? _ctx.width[2] : _ctx.width,
          height: _ctx.height,
          maxDisplay: _ctx.maxDisplay,
          placeholder: Array.isArray(_ctx.placeholder) ? _ctx.placeholder[2] : _ctx.placeholder,
          onChange: onThirdChange
        }, null, 8, ["style", "options", "modelValue", "label", "value", "disabled", "allowClear", "width", "height", "maxDisplay", "placeholder"])
      ], 4);
    };
  }
});
var Cascader = _export_sfc(_sfc_main$u, [["__scopeId", "data-v-f589250d"]]);
Cascader.install = (app) => {
  app.component(Cascader.__name, Cascader);
};
var _hoisted_1$r = { class: "m-checkbox" };
var _hoisted_2$n = ["onClick"];
var _hoisted_3$l = { class: "u-label" };
var _hoisted_4$i = {
  key: 1,
  class: "m-checkbox-wrap"
};
var _hoisted_5$f = { class: "u-label" };
var _sfc_main$t = defineComponent({
  __name: "Checkbox",
  props: {
    options: { default: () => [] },
    disabled: { type: Boolean, default: false },
    vertical: { type: Boolean, default: false },
    value: { default: () => [] },
    gap: { default: 8 },
    indeterminate: { type: Boolean, default: false },
    checked: { type: Boolean, default: false }
  },
  emits: ["update:value", "update:checked", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const sum = computed(() => {
      return props.options.length;
    });
    const checkedValue = ref(props.value);
    watch(
      () => props.value,
      (to) => {
        checkedValue.value = to;
      }
    );
    const styleObject = computed(() => {
      if (props.vertical) {
        return {
          marginBottom: props.gap + "px"
        };
      } else {
        return {
          marginRight: props.gap + "px"
        };
      }
    });
    function onClick2(value) {
      if (props.value.includes(value)) {
        const newVal = checkedValue.value.filter((target) => target !== value);
        emits("update:value", newVal);
        emits("change", newVal);
      } else {
        const newVal = [...checkedValue.value, value];
        emits("update:value", newVal);
        emits("change", newVal);
      }
    }
    function onCheckAll() {
      emits("update:checked", !props.checked);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$r, [
        sum.value ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(_ctx.options, (option, index) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["m-checkbox-wrap", { "vertical": _ctx.vertical }]),
            style: normalizeStyle(sum.value !== index + 1 ? styleObject.value : ""),
            key: index
          }, [
            createBaseVNode("div", {
              class: normalizeClass(["m-box", { "disabled": _ctx.disabled || option.disabled }]),
              onClick: ($event) => _ctx.disabled || option.disabled ? () => false : onClick2(option.value)
            }, [
              createBaseVNode("span", {
                class: normalizeClass(["u-checkbox", { "u-checkbox-checked": checkedValue.value.includes(option.value) }])
              }, null, 2),
              createBaseVNode("span", _hoisted_3$l, [
                renderSlot(_ctx.$slots, "default", {
                  label: option.label
                }, () => [
                  createTextVNode(toDisplayString(option.label), 1)
                ], true)
              ])
            ], 10, _hoisted_2$n)
          ], 6);
        }), 128)) : (openBlock(), createElementBlock("div", _hoisted_4$i, [
          createBaseVNode("div", {
            class: normalizeClass(["m-box", { "disabled": _ctx.disabled }]),
            onClick: onCheckAll
          }, [
            createBaseVNode("span", {
              class: normalizeClass(["u-checkbox", { "u-checkbox-checked": _ctx.checked && !_ctx.indeterminate, "indeterminate": _ctx.indeterminate }])
            }, null, 2),
            createBaseVNode("span", _hoisted_5$f, [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode("Check all")
              ], true)
            ])
          ], 2)
        ]))
      ]);
    };
  }
});
var Checkbox = _export_sfc(_sfc_main$t, [["__scopeId", "data-v-a09feac4"]]);
Checkbox.install = (app) => {
  app.component(Checkbox.__name, Checkbox);
};
var _withScopeId$e = (n) => (pushScopeId("data-v-7a27bbdf"), n = n(), popScopeId(), n);
var _hoisted_1$q = { class: "m-collapse" };
var _hoisted_2$m = ["onClick"];
var _hoisted_3$k = {
  key: 0,
  focusable: "false",
  class: "u-arrow",
  "data-icon": "right",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var _hoisted_4$h = _withScopeId$e(() => createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" }, null, -1));
var _hoisted_5$e = [
  _hoisted_4$h
];
var _hoisted_6$e = { class: "u-lang" };
var _sfc_main$s = defineComponent({
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
  setup(__props, { emit: emits }) {
    const props = __props;
    watchEffect(() => {
      getCollapseHeight(props.collapseData.length);
    }, { flush: "post" });
    const text = ref();
    const collapseHeight = ref([]);
    function getCollapseHeight(len) {
      for (let n = 0; n < len; n++) {
        collapseHeight.value.push(text.value[n].offsetHeight);
      }
    }
    function dealEmit(value) {
      emits("update:activeKey", value);
      emits("change", value);
    }
    function onClick2(key) {
      if (activeJudge(key)) {
        if (Array.isArray(props.activeKey)) {
          const res = props.activeKey.filter((actKey) => actKey !== key);
          dealEmit(res);
        } else {
          dealEmit(null);
        }
      } else {
        if (Array.isArray(props.activeKey)) {
          dealEmit([...props.activeKey, key]);
        } else {
          dealEmit(key);
        }
      }
    }
    function activeJudge(key) {
      if (Array.isArray(props.activeKey)) {
        return props.activeKey.includes(key);
      } else {
        return props.activeKey === key;
      }
    }
    const copyTxt = ref("Copy");
    function onCopy(index) {
      navigator.clipboard.writeText(text.value[index].innerText || "").then(() => {
        copyTxt.value = "Copied";
        rafTimeout(() => {
          copyTxt.value = "Copy";
        }, 3e3);
      }, (err) => {
        copyTxt.value = err;
      });
    }
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock("div", _hoisted_1$q, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.collapseData, (data, index) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["m-collapse-item", { "u-collapse-item-active": activeJudge(data.key || index) }]),
            key: index
          }, [
            createBaseVNode("div", {
              class: "u-collapse-header",
              onClick: ($event) => onClick2(data.key || index)
            }, [
              _ctx.showArrow ? (openBlock(), createElementBlock("svg", _hoisted_3$k, _hoisted_5$e)) : createCommentVNode("", true),
              createBaseVNode("div", {
                class: normalizeClass(["u-header", { ml24: _ctx.showArrow }]),
                style: normalizeStyle(`font-size: ${_ctx.headerFontSize || _ctx.fontSize}px;`)
              }, [
                renderSlot(_ctx.$slots, "header", {
                  header: data.header,
                  key: data.key || index
                }, () => [
                  createTextVNode(toDisplayString(data.header || "--"), 1)
                ], true)
              ], 6)
            ], 8, _hoisted_2$m),
            createBaseVNode("div", {
              class: normalizeClass(["u-collapse-content", { "u-collapse-copyable": _ctx.copyable }]),
              style: normalizeStyle(`height: ${activeJudge(data.key || index) ? collapseHeight.value[index] : 0}px;`)
            }, [
              createBaseVNode("div", _hoisted_6$e, [
                renderSlot(_ctx.$slots, "lang", {
                  lang: _ctx.lang,
                  key: data.key || index
                }, () => [
                  createTextVNode(toDisplayString(_ctx.lang), 1)
                ], true)
              ]),
              createVNode(_component_Button, {
                size: "small",
                class: "u-copy",
                type: "primary",
                onClick: ($event) => onCopy(index)
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(copyTxt.value), 1)
                ]),
                _: 2
              }, 1032, ["onClick"]),
              createBaseVNode("div", {
                ref_for: true,
                ref_key: "text",
                ref: text,
                class: "u-text",
                style: normalizeStyle(`font-size: ${_ctx.textFontSize || _ctx.fontSize}px;`)
              }, [
                renderSlot(_ctx.$slots, "text", {
                  text: data.text,
                  key: data.key || index
                }, () => [
                  createTextVNode(toDisplayString(data.text), 1)
                ], true)
              ], 4)
            ], 6)
          ], 2);
        }), 128))
      ]);
    };
  }
});
var Collapse = _export_sfc(_sfc_main$s, [["__scopeId", "data-v-7a27bbdf"]]);
Collapse.install = (app) => {
  app.component(Collapse.__name, Collapse);
};
var _hoisted_1$p = { class: "m-countdown" };
var _hoisted_2$l = { class: "u-title" };
var _hoisted_3$j = { class: "u-time" };
var _hoisted_4$g = { key: 2 };
var _sfc_main$r = defineComponent({
  __name: "Countdown",
  props: {
    countdown: { default: 0 },
    title: { default: "Countdown" },
    format: { default: "HH:mm:ss" },
    prefix: { default: "" },
    suffix: { default: "" },
    finishedText: { default: "Finished" }
  },
  emits: ["finish"],
  setup(__props, { emit }) {
    const props = __props;
    const futureTime = ref();
    const restTime = ref();
    const showType = computed(() => {
      return {
        showMillisecond: props.format.includes("SSS"),
        showYear: props.format.includes("Y"),
        showMonth: props.format.includes("M"),
        showDay: props.format.includes("D"),
        showHour: props.format.includes("H"),
        showMinute: props.format.includes("m"),
        showSecond: props.format.includes("s")
      };
    });
    function fixedTwo(value) {
      return value < 10 ? "0" + value : String(value);
    }
    function timeFormat(time) {
      let showTime = props.format;
      if (showType.value.showMillisecond) {
        var S3 = time % 1e3;
        showTime = showTime.replace("SSS", "0".repeat(3 - String(S3).length) + S3);
      }
      time = Math.floor(time / 1e3);
      if (showType.value.showYear) {
        var Y2 = Math.floor(time / (60 * 60 * 24 * 30 * 12));
        showTime = showTime.includes("YY") ? showTime.replace("YY", fixedTwo(Y2)) : showTime.replace("Y", String(Y2));
      } else {
        var Y2 = 0;
      }
      if (showType.value.showMonth) {
        time = time - Y2 * 60 * 60 * 24 * 30 * 12;
        var M3 = Math.floor(time / (60 * 60 * 24 * 30));
        showTime = showTime.includes("MM") ? showTime.replace("MM", fixedTwo(M3)) : showTime.replace("M", String(M3));
      } else {
        var M3 = 0;
      }
      if (showType.value.showDay) {
        time = time - M3 * 60 * 60 * 24 * 30;
        var D2 = Math.floor(time / (60 * 60 * 24));
        showTime = showTime.includes("DD") ? showTime.replace("DD", fixedTwo(D2)) : showTime.replace("D", String(D2));
      } else {
        var D2 = 0;
      }
      if (showType.value.showHour) {
        time = time - D2 * 60 * 60 * 24;
        var H3 = Math.floor(time / (60 * 60));
        showTime = showTime.includes("HH") ? showTime.replace("HH", fixedTwo(H3)) : showTime.replace("H", String(H3));
      } else {
        var H3 = 0;
      }
      if (showType.value.showMinute) {
        time = time - H3 * 60 * 60;
        var m3 = Math.floor(time / 60);
        showTime = showTime.includes("mm") ? showTime.replace("mm", fixedTwo(m3)) : showTime.replace("m", String(m3));
      } else {
        var m3 = 0;
      }
      if (showType.value.showSecond) {
        var s3 = time - m3 * 60;
        showTime = showTime.includes("ss") ? showTime.replace("ss", fixedTwo(s3)) : showTime.replace("s", String(s3));
      }
      return showTime;
    }
    function CountDown() {
      if (futureTime.value > Date.now()) {
        restTime.value = futureTime.value - Date.now();
        requestAnimationFrame$1(CountDown);
      } else {
        restTime.value = 0;
        emit("finish");
      }
    }
    onMounted(() => {
      if (props.countdown > Date.now()) {
        futureTime.value = props.countdown;
      } else {
        futureTime.value = props.countdown + Date.now();
      }
      requestAnimationFrame$1(CountDown);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$p, [
        createBaseVNode("div", _hoisted_2$l, [
          renderSlot(_ctx.$slots, "title", {}, () => [
            createTextVNode(toDisplayString(props.title), 1)
          ], true)
        ]),
        createBaseVNode("div", _hoisted_3$j, [
          restTime.value > 0 ? renderSlot(_ctx.$slots, "prefix", { key: 0 }, () => [
            createTextVNode(toDisplayString(_ctx.prefix), 1)
          ], true) : createCommentVNode("", true),
          _ctx.finishedText && restTime.value === 0 ? renderSlot(_ctx.$slots, "finish", { key: 1 }, () => [
            createTextVNode(toDisplayString(_ctx.finishedText), 1)
          ], true) : (openBlock(), createElementBlock("span", _hoisted_4$g, toDisplayString(timeFormat(restTime.value)), 1)),
          restTime.value > 0 ? renderSlot(_ctx.$slots, "suffix", { key: 3 }, () => [
            createTextVNode(toDisplayString(_ctx.suffix), 1)
          ], true) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});
var Countdown = _export_sfc(_sfc_main$r, [["__scopeId", "data-v-de734ac1"]]);
Countdown.install = (app) => {
  app.component(Countdown.__name, Countdown);
};
var __default__ = {
  inheritAttrs: false
};
var _sfc_main$q = defineComponent({
  ...__default__,
  __name: "DatePicker",
  props: {
    width: { default: 180 },
    mode: { default: "date" },
    showTime: { type: Boolean, default: false },
    showToday: { type: Boolean, default: false },
    modelType: { default: "format" }
  },
  setup(__props) {
    const props = __props;
    const time = computed(() => {
      return props.mode === "time";
    });
    const week = computed(() => {
      return props.mode === "week";
    });
    const month = computed(() => {
      return props.mode === "month";
    });
    const year = computed(() => {
      return props.mode === "year";
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-datepicker",
        style: normalizeStyle(`width: ${_ctx.width}px;`)
      }, [
        createVNode(unref(Xn), mergeProps({
          locale: "zh-CN",
          "month-change-on-scroll": false,
          "enable-time-picker": _ctx.showTime,
          "time-picker": time.value,
          "week-picker": week.value,
          "month-picker": month.value,
          "year-picker": year.value,
          "now-button-label": "今天",
          "show-now-button": _ctx.showToday,
          "auto-apply": true,
          "text-input": "",
          "model-type": _ctx.modelType,
          "day-names": ["一", "二", "三", "四", "五", "六", "七"]
        }, _ctx.$attrs), null, 16, ["enable-time-picker", "time-picker", "week-picker", "month-picker", "year-picker", "show-now-button", "model-type"])
      ], 4);
    };
  }
});
var DatePicker = _export_sfc(_sfc_main$q, [["__scopeId", "data-v-e389c0e6"]]);
DatePicker.install = (app) => {
  app.component(DatePicker.__name, DatePicker);
};
var _withScopeId$d = (n) => (pushScopeId("data-v-b1542668"), n = n(), popScopeId(), n);
var _hoisted_1$o = ["onClick"];
var _hoisted_2$k = { class: "m-spin-dot" };
var _hoisted_3$i = _withScopeId$d(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1));
var _hoisted_4$f = _withScopeId$d(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1));
var _hoisted_5$d = _withScopeId$d(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1));
var _hoisted_6$d = _withScopeId$d(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1));
var _hoisted_7$c = [
  _hoisted_3$i,
  _hoisted_4$f,
  _hoisted_5$d,
  _hoisted_6$d
];
var _hoisted_8$c = _withScopeId$d(() => createBaseVNode("path", { d: "M290 236.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0 0 13.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 0 0 0 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 0 0-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z" }, null, -1));
var _hoisted_9$c = [
  _hoisted_8$c
];
var _hoisted_10$9 = _withScopeId$d(() => createBaseVNode("path", { d: "M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 0 0 0 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 0 0 391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 0 0-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z" }, null, -1));
var _hoisted_11$8 = [
  _hoisted_10$9
];
var _hoisted_12$7 = _withScopeId$d(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1));
var _hoisted_13$6 = [
  _hoisted_12$7
];
var _hoisted_14$6 = { class: "m-dialog-header" };
var _hoisted_15$6 = { class: "u-head" };
var _hoisted_16$6 = { class: "m-dialog-footer" };
var _sfc_main$p = defineComponent({
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
  setup(__props, { emit: emits }) {
    const props = __props;
    const fullScreen = ref(false);
    const dialogHeight = computed(() => {
      if (typeof props.height === "number") {
        return props.height + "px";
      } else {
        return props.height;
      }
    });
    watch(
      () => props.visible,
      (to) => {
        if (to) {
          fullScreen.value = false;
        }
      }
    );
    function onBlur() {
      if (!props.loading) {
        emits("close");
      }
    }
    function onFullScreen() {
      fullScreen.value = !fullScreen.value;
    }
    function onClose() {
      emits("close");
    }
    function onCancel() {
      emits("cancel");
    }
    function onConfirm() {
      emits("ok");
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, null, {
        default: withCtx(() => [
          withDirectives(createBaseVNode("div", {
            class: "m-dialog-mask",
            onClick: withModifiers(onBlur, ["self"])
          }, [
            createBaseVNode("div", {
              ref: "dialog",
              class: normalizeClass(["m-dialog", _ctx.center ? "relative-hv-center" : "top-center", { transition: dialogHeight.value !== "auto" }]),
              style: normalizeStyle(`width: ${fullScreen.value ? "100%" : props.width + "px"}; height: ${fullScreen.value ? "100vh" : dialogHeight.value}; top: ${_ctx.center ? "50%" : fullScreen.value ? 0 : _ctx.top + "px"};`)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["m-dialog-content", { loading: _ctx.loading }])
              }, [
                withDirectives(createBaseVNode("div", _hoisted_2$k, _hoisted_7$c, 512), [
                  [vShow, _ctx.loading]
                ]),
                withDirectives((openBlock(), createElementBlock("svg", {
                  onClick: onFullScreen,
                  class: "u-screen",
                  viewBox: "64 64 896 896",
                  "data-icon": "fullscreen",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_9$c, 512)), [
                  [vShow, !fullScreen.value && _ctx.switchFullscreen]
                ]),
                withDirectives((openBlock(), createElementBlock("svg", {
                  onClick: onFullScreen,
                  class: "u-screen",
                  viewBox: "64 64 896 896",
                  "data-icon": "fullscreen-exit",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_11$8, 512)), [
                  [vShow, fullScreen.value && _ctx.switchFullscreen]
                ]),
                (openBlock(), createElementBlock("svg", {
                  onClick: onClose,
                  class: "u-close",
                  viewBox: "64 64 896 896",
                  "data-icon": "close",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_13$6)),
                createBaseVNode("div", _hoisted_14$6, [
                  createBaseVNode("div", _hoisted_15$6, [
                    renderSlot(_ctx.$slots, "title", {}, () => [
                      createTextVNode(toDisplayString(_ctx.title), 1)
                    ], true)
                  ])
                ]),
                createBaseVNode("div", {
                  class: "m-dialog-body",
                  style: normalizeStyle(`height: calc(${fullScreen.value ? "100vh" : dialogHeight.value} - ${_ctx.footer ? "110px" : "57px"});`)
                }, [
                  renderSlot(_ctx.$slots, "default", {}, () => [
                    createTextVNode(toDisplayString(_ctx.content), 1)
                  ], true)
                ], 4),
                withDirectives(createBaseVNode("div", _hoisted_16$6, [
                  createBaseVNode("button", {
                    class: "u-cancel",
                    onClick: onCancel
                  }, toDisplayString(_ctx.cancelText), 1),
                  createBaseVNode("button", {
                    class: "u-confirm",
                    onClick: onConfirm
                  }, toDisplayString(_ctx.okText), 1)
                ], 512), [
                  [vShow, _ctx.footer]
                ])
              ], 2)
            ], 6)
          ], 8, _hoisted_1$o), [
            [vShow, _ctx.visible]
          ])
        ]),
        _: 3
      });
    };
  }
});
var Dialog = _export_sfc(_sfc_main$p, [["__scopeId", "data-v-b1542668"]]);
Dialog.install = (app) => {
  app.component(Dialog.__name, Dialog);
};
var _sfc_main$o = defineComponent({
  __name: "Divider",
  props: {
    dashed: { type: Boolean, default: false },
    orientation: { default: "center" },
    orientationMargin: { default: "" },
    borderWidth: { default: 1 }
  },
  setup(__props) {
    const props = __props;
    const text = ref();
    const showText = ref(true);
    const margin = computed(() => {
      if (props.orientationMargin !== "") {
        if (typeof props.orientationMargin === "number") {
          return props.orientationMargin + "px";
        } else {
          return props.orientationMargin;
        }
      }
    });
    onMounted(() => {
      if (!text.value.offsetHeight) {
        showText.value = false;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          `m-divider ${_ctx.orientation}`,
          {
            dashed: _ctx.dashed,
            margin24: !showText.value,
            marginLeft: _ctx.orientationMargin !== "" && _ctx.orientation === "left",
            marginRight: _ctx.orientationMargin !== "" && _ctx.orientation === "right"
          }
        ]),
        style: normalizeStyle(`--border-width: ${_ctx.borderWidth}px;`)
      }, [
        _ctx.orientation === "left" ? withDirectives((openBlock(), createElementBlock("span", {
          key: 0,
          class: "u-text",
          style: normalizeStyle(`margin-left: ${margin.value};`),
          ref_key: "text",
          ref: text
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 4)), [
          [vShow, showText.value]
        ]) : _ctx.orientation === "right" ? withDirectives((openBlock(), createElementBlock("span", {
          key: 1,
          class: "u-text",
          style: normalizeStyle(`margin-right: ${margin.value};`),
          ref_key: "text",
          ref: text
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 4)), [
          [vShow, showText.value]
        ]) : withDirectives((openBlock(), createElementBlock("span", {
          key: 2,
          class: "u-text",
          ref_key: "text",
          ref: text
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 512)), [
          [vShow, showText.value]
        ])
      ], 6);
    };
  }
});
var Divider = _export_sfc(_sfc_main$o, [["__scopeId", "data-v-71a4746d"]]);
Divider.install = (app) => {
  app.component(Divider.__name, Divider);
};
var _hoisted_1$n = { class: "m-empty" };
var _hoisted_2$j = createStaticVNode('<g fill="none" fill-rule="evenodd" data-v-f6da40de><g transform="translate(24 31.67)" data-v-f6da40de><ellipse fill-opacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668" data-v-f6da40de></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2" data-v-f6da40de></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" fill="url(#linearGradient-1)" transform="translate(13.56)" data-v-f6da40de></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7" data-v-f6da40de></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="#DCE0E6" data-v-f6da40de></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" fill="#DCE0E6" data-v-f6da40de></path><g transform="translate(149.65 15.383)" fill="#FFF" data-v-f6da40de><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" data-v-f6da40de></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" data-v-f6da40de></path></g></g>', 1);
var _hoisted_3$h = [
  _hoisted_2$j
];
var _hoisted_4$e = createStaticVNode('<g transform="translate(0 1)" fill="none" fill-rule="evenodd" data-v-f6da40de><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7" data-v-f6da40de></ellipse><g fill-rule="nonzero" stroke="#d9d9d9" data-v-f6da40de><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" data-v-f6da40de></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa" data-v-f6da40de></path></g></g>', 1);
var _hoisted_5$c = [
  _hoisted_4$e
];
var _hoisted_6$c = ["src"];
var _sfc_main$n = defineComponent({
  __name: "Empty",
  props: {
    description: { default: "暂无数据" },
    image: { default: "1" },
    imageStyle: { default: () => {
      return {};
    } }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$n, [
        _ctx.image === "1" ? (openBlock(), createElementBlock("svg", {
          key: 0,
          class: "u-empty-1",
          style: normalizeStyle(_ctx.imageStyle),
          viewBox: "0 0 184 152",
          xmlns: "http://www.w3.org/2000/svg"
        }, _hoisted_3$h, 4)) : _ctx.image === "2" ? (openBlock(), createElementBlock("svg", {
          key: 1,
          class: "u-empty-2",
          style: normalizeStyle(_ctx.imageStyle),
          viewBox: "0 0 64 41",
          xmlns: "http://www.w3.org/2000/svg"
        }, _hoisted_5$c, 4)) : renderSlot(_ctx.$slots, "default", { key: 2 }, () => [
          createBaseVNode("img", {
            class: "u-empty",
            src: _ctx.image,
            style: normalizeStyle(_ctx.imageStyle),
            alt: "image"
          }, null, 12, _hoisted_6$c)
        ], true),
        _ctx.description ? (openBlock(), createElementBlock("p", {
          key: 3,
          class: normalizeClass(["u-description", { gray: _ctx.image === "2" }])
        }, [
          renderSlot(_ctx.$slots, "description", {}, () => [
            createTextVNode(toDisplayString(_ctx.description), 1)
          ], true)
        ], 2)) : createCommentVNode("", true)
      ]);
    };
  }
});
var Empty = _export_sfc(_sfc_main$n, [["__scopeId", "data-v-f6da40de"]]);
Empty.install = (app) => {
  app.component(Empty.__name, Empty);
};
var _withScopeId$c = (n) => (pushScopeId("data-v-01220d1b"), n = n(), popScopeId(), n);
var _hoisted_1$m = { class: "m-spin" };
var _hoisted_2$i = { class: "m-spin-box" };
var _hoisted_3$g = {
  key: 0,
  class: "m-spin-dot"
};
var _hoisted_4$d = _withScopeId$c(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1));
var _hoisted_5$b = _withScopeId$c(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1));
var _hoisted_6$b = _withScopeId$c(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1));
var _hoisted_7$b = _withScopeId$c(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1));
var _hoisted_8$b = [
  _hoisted_4$d,
  _hoisted_5$b,
  _hoisted_6$b,
  _hoisted_7$b
];
var _hoisted_9$b = {
  key: 1,
  class: "u-spin-circle"
};
var _hoisted_10$8 = {
  key: 2,
  class: "m-dynamic-circle"
};
var _hoisted_11$7 = _withScopeId$c(() => createBaseVNode("svg", {
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
var _hoisted_12$6 = [
  _hoisted_11$7
];
var _sfc_main$m = defineComponent({
  __name: "Spin",
  props: {
    spinning: { type: Boolean, default: true },
    size: { default: "default" },
    tip: { default: "" },
    indicator: { default: "dot" },
    color: { default: "#1677FF" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(`m-spin-wrap ${_ctx.size}`),
        style: normalizeStyle(`--color: ${_ctx.color};`)
      }, [
        withDirectives(createBaseVNode("div", _hoisted_1$m, [
          createBaseVNode("div", _hoisted_2$i, [
            _ctx.indicator === "dot" ? (openBlock(), createElementBlock("div", _hoisted_3$g, _hoisted_8$b)) : createCommentVNode("", true),
            _ctx.indicator === "static-circle" ? (openBlock(), createElementBlock("div", _hoisted_9$b)) : createCommentVNode("", true),
            _ctx.indicator === "dynamic-circle" ? (openBlock(), createElementBlock("div", _hoisted_10$8, _hoisted_12$6)) : createCommentVNode("", true),
            withDirectives(createBaseVNode("p", { class: "u-tip" }, toDisplayString(_ctx.tip), 513), [
              [vShow, _ctx.tip]
            ])
          ])
        ], 512), [
          [vShow, _ctx.spinning]
        ]),
        createBaseVNode("div", {
          class: normalizeClass(["m-spin-content", { "m-spin-mask": _ctx.spinning }])
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 2)
      ], 6);
    };
  }
});
var Spin = _export_sfc(_sfc_main$m, [["__scopeId", "data-v-01220d1b"]]);
Spin.install = (app) => {
  app.component(Spin.__name, Spin);
};
var _withScopeId$b = (n) => (pushScopeId("data-v-a5800aae"), n = n(), popScopeId(), n);
var _hoisted_1$l = { class: "m-image-wrap" };
var _hoisted_2$h = ["onLoad", "src", "alt"];
var _hoisted_3$f = ["onClick"];
var _hoisted_4$c = { class: "m-image-mask-info" };
var _hoisted_5$a = _withScopeId$b(() => createBaseVNode("svg", {
  class: "u-eye",
  focusable: "false",
  "data-icon": "eye",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" })
], -1));
var _hoisted_6$a = { class: "u-pre" };
var _hoisted_7$a = { class: "m-preview-mask" };
var _hoisted_8$a = ["onClick", "onWheel"];
var _hoisted_9$a = { class: "m-preview-body" };
var _hoisted_10$7 = { class: "m-preview-operations" };
var _hoisted_11$6 = ["title"];
var _hoisted_12$5 = _withScopeId$b(() => createBaseVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "close",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })
], -1));
var _hoisted_13$5 = [
  _hoisted_12$5
];
var _hoisted_14$5 = _withScopeId$b(() => createBaseVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "zoom-in",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" })
], -1));
var _hoisted_15$5 = [
  _hoisted_14$5
];
var _hoisted_16$5 = _withScopeId$b(() => createBaseVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "zoom-out",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" })
], -1));
var _hoisted_17$3 = [
  _hoisted_16$5
];
var _hoisted_18$3 = _withScopeId$b(() => createBaseVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "expand",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M342 88H120c-17.7 0-32 14.3-32 32v224c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V168h174c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zm578 576h-48c-8.8 0-16 7.2-16 16v176H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h222c17.7 0 32-14.3 32-32V680c0-8.8-7.2-16-16-16zM342 856H168V680c0-8.8-7.2-16-16-16h-48c-8.8 0-16 7.2-16 16v224c0 17.7 14.3 32 32 32h222c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zM904 88H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h174v176c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V120c0-17.7-14.3-32-32-32z" })
], -1));
var _hoisted_19$3 = [
  _hoisted_18$3
];
var _hoisted_20$2 = _withScopeId$b(() => createBaseVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "rotate-right",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-.4-12.6 6.1l-.2 64c-118.6.5-235.8 53.4-314.6 154.2A399.75 399.75 0 00123.5 631h74.9c-.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8z" }),
  createBaseVNode("path", { d: "M880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H396V494h440v326z" })
], -1));
var _hoisted_21$2 = [
  _hoisted_20$2
];
var _hoisted_22$2 = _withScopeId$b(() => createBaseVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "rotate-left",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H188V494h440v326z" }),
  createBaseVNode("path", { d: "M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7.4 12.6-6.1v-63.9c12.9.1 25.9.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8a325.95 325.95 0 016.5 140.9h74.9c14.8-103.6-11.3-213-81-302.3z" })
], -1));
var _hoisted_23$2 = [
  _hoisted_22$2
];
var _hoisted_24$1 = ["src", "alt"];
var _hoisted_25$1 = _withScopeId$b(() => createBaseVNode("svg", {
  focusable: "false",
  class: "u-switch",
  "data-icon": "left",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })
], -1));
var _hoisted_26$1 = [
  _hoisted_25$1
];
var _hoisted_27$1 = _withScopeId$b(() => createBaseVNode("svg", {
  focusable: "false",
  class: "u-switch",
  "data-icon": "right",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" })
], -1));
var _hoisted_28$1 = [
  _hoisted_27$1
];
var _sfc_main$l = defineComponent({
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
  setup(__props) {
    const props = __props;
    const imageWidth = computed(() => {
      if (typeof props.width === "number") {
        return props.width + "px";
      } else {
        return props.width;
      }
    });
    const imageHeight = computed(() => {
      if (typeof props.height === "number") {
        return props.height + "px";
      } else {
        return props.height;
      }
    });
    const images = ref([]);
    watchEffect(() => {
      images.value = getImages();
    });
    function getImages() {
      if (Array.isArray(props.src)) {
        return props.src;
      } else {
        return [{
          src: props.src,
          name: props.name
        }];
      }
    }
    const imageCount = computed(() => {
      return images.value.length;
    });
    onMounted(() => {
      document.addEventListener("keydown", keyboardSwitch);
    });
    onUnmounted(() => {
      document.removeEventListener("keydown", keyboardSwitch);
    });
    const complete = ref(Array(imageCount.value).fill(false));
    const loaded = ref(false);
    const previewIndex = ref(0);
    const showPreview = ref(false);
    const rotate = ref(0);
    const scale = ref(1);
    const sourceX = ref(0);
    const sourceY = ref(0);
    const dragX = ref(0);
    const dragY = ref(0);
    function keyboardSwitch(e2) {
      e2.preventDefault();
      if (showPreview.value && imageCount.value > 1) {
        if (e2.key === "ArrowLeft" || e2.key === "ArrowUp") {
          onSwitchLeft();
        }
        if (e2.key === "ArrowRight" || e2.key === "ArrowDown") {
          onSwitchRight();
        }
      }
    }
    function onComplete(n) {
      complete.value[n] = true;
    }
    function onLoaded() {
      loaded.value = true;
    }
    function getImageName(image) {
      if (image) {
        if (image.name) {
          return image.name;
        } else {
          const res = image.src.split("?")[0].split("/");
          return res[res.length - 1];
        }
      }
    }
    function onPreview(n) {
      scale.value = 1;
      rotate.value = 0;
      dragX.value = 0;
      dragY.value = 0;
      showPreview.value = true;
      previewIndex.value = n;
    }
    function add22(num1, num2) {
      const num1DeciStr = String(num1).split(".")[1];
      const num2DeciStr = String(num2).split(".")[1];
      let maxLen = Math.max((num1DeciStr == null ? void 0 : num1DeciStr.length) || 0, (num2DeciStr == null ? void 0 : num2DeciStr.length) || 0);
      let num1Str = num1.toFixed(maxLen);
      let num2Str = num2.toFixed(maxLen);
      const result = +num1Str.replace(".", "") + +num2Str.replace(".", "");
      return result / Math.pow(10, maxLen);
    }
    function onClose() {
      showPreview.value = false;
    }
    function onZoomin() {
      if (scale.value + props.zoomRatio > props.maxZoomScale) {
        scale.value = props.maxZoomScale;
      } else {
        scale.value = add22(scale.value, props.zoomRatio);
      }
    }
    function onZoomout() {
      if (scale.value - props.zoomRatio < props.minZoomScale) {
        scale.value = props.minZoomScale;
      } else {
        scale.value = add22(scale.value, -props.zoomRatio);
      }
    }
    function onResetOrigin() {
      scale.value = 1;
      rotate.value = 0;
      dragX.value = 0;
      dragY.value = 0;
    }
    function onWheel(e2) {
      const scrollZoom = e2.deltaY * props.zoomRatio;
      if (scale.value === props.minZoomScale && scrollZoom > 0) {
        return;
      }
      if (scale.value === props.maxZoomScale && scrollZoom < 0) {
        return;
      }
      if (scale.value - scrollZoom < props.minZoomScale) {
        scale.value = props.minZoomScale;
      } else if (scale.value - scrollZoom > props.maxZoomScale) {
        scale.value = props.maxZoomScale;
      } else {
        scale.value = add22(scale.value, -scrollZoom);
      }
    }
    function onAnticlockwiseRotate() {
      rotate.value -= 90;
    }
    function onClockwiseRotate() {
      rotate.value += 90;
    }
    function onMouseDown(event2) {
      const el2 = event2.target;
      const imageRect = el2.getBoundingClientRect();
      const top = imageRect.top;
      const bottom = imageRect.bottom;
      const right = imageRect.right;
      const left = imageRect.left;
      const viewportWidth = document.body.clientWidth;
      const viewportHeight = document.body.clientHeight;
      sourceX.value = event2.clientX;
      sourceY.value = event2.clientY;
      const sourceDragX = dragX.value;
      const sourceDragY = dragY.value;
      document.onmousemove = (e2) => {
        dragX.value = sourceDragX + e2.clientX - sourceX.value;
        dragY.value = sourceDragY + e2.clientY - sourceY.value;
      };
      document.onmouseup = () => {
        if (dragX.value > sourceDragX + viewportWidth - right) {
          dragX.value = sourceDragX + viewportWidth - right;
        }
        if (dragX.value < sourceDragX - left) {
          dragX.value = sourceDragX - left;
        }
        if (dragY.value > sourceDragY + viewportHeight - bottom) {
          dragY.value = sourceDragY + viewportHeight - bottom;
        }
        if (dragY.value < sourceDragY - top) {
          dragY.value = sourceDragY - top;
        }
        document.onmousemove = null;
      };
    }
    function onSwitchLeft() {
      if (props.loop) {
        previewIndex.value = (previewIndex.value - 1 + imageCount.value) % imageCount.value;
      } else {
        if (previewIndex.value > 0) {
          previewIndex.value--;
        }
      }
      loaded.value = false;
    }
    function onSwitchRight() {
      if (props.loop) {
        previewIndex.value = (previewIndex.value + 1) % imageCount.value;
      } else {
        if (previewIndex.value < imageCount.value - 1) {
          previewIndex.value++;
        }
      }
      loaded.value = false;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$l, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(images.value, (image, index) => {
          return withDirectives((openBlock(), createElementBlock("div", {
            class: normalizeClass(["m-image", { "image-hover-mask": complete.value }]),
            style: normalizeStyle(`width: ${imageWidth.value}; height: ${imageHeight.value};`),
            key: index
          }, [
            createVNode(unref(Spin), {
              spinning: !complete.value[index],
              indicator: "dynamic-circle"
            }, null, 8, ["spinning"]),
            createBaseVNode("img", {
              class: "u-image",
              style: normalizeStyle(`object-fit: ${_ctx.fit};`),
              onLoad: ($event) => onComplete(index),
              src: image.src,
              alt: image.name
            }, null, 44, _hoisted_2$h),
            createBaseVNode("div", {
              class: "m-image-mask",
              onClick: ($event) => onPreview(index)
            }, [
              createBaseVNode("div", _hoisted_4$c, [
                _hoisted_5$a,
                createBaseVNode("p", _hoisted_6$a, [
                  renderSlot(_ctx.$slots, "preview", {}, () => [
                    createTextVNode(toDisplayString(_ctx.preview), 1)
                  ], true)
                ])
              ])
            ], 8, _hoisted_3$f)
          ], 6)), [
            [vShow, !_ctx.album || _ctx.album && index === 0]
          ]);
        }), 128)),
        createVNode(Transition, { name: "mask" }, {
          default: withCtx(() => [
            withDirectives(createBaseVNode("div", _hoisted_7$a, null, 512), [
              [vShow, showPreview.value]
            ])
          ]),
          _: 1
        }),
        createVNode(Transition, { name: "preview" }, {
          default: withCtx(() => [
            withDirectives(createBaseVNode("div", {
              class: "m-preview-wrap",
              onClick: withModifiers(onClose, ["self"]),
              onWheel: withModifiers(onWheel, ["prevent"])
            }, [
              createBaseVNode("div", _hoisted_9$a, [
                createBaseVNode("div", _hoisted_10$7, [
                  createBaseVNode("p", {
                    class: "u-name",
                    title: getImageName(images.value[previewIndex.value])
                  }, toDisplayString(getImageName(images.value[previewIndex.value])), 9, _hoisted_11$6),
                  withDirectives(createBaseVNode("p", { class: "u-preview-progress" }, toDisplayString(previewIndex.value + 1) + " / " + toDisplayString(imageCount.value), 513), [
                    [vShow, Array.isArray(_ctx.src)]
                  ]),
                  createBaseVNode("div", {
                    class: "u-preview-operation",
                    title: "关闭",
                    onClick: onClose
                  }, _hoisted_13$5),
                  createBaseVNode("div", {
                    class: normalizeClass(["u-preview-operation", { "u-operation-disabled": scale.value === _ctx.maxZoomScale }]),
                    title: "放大",
                    onClick: onZoomin
                  }, _hoisted_15$5, 2),
                  createBaseVNode("div", {
                    class: normalizeClass(["u-preview-operation", { "u-operation-disabled": scale.value === _ctx.minZoomScale }]),
                    title: "缩小",
                    onClick: onZoomout
                  }, _hoisted_17$3, 2),
                  createBaseVNode("div", {
                    class: "u-preview-operation",
                    title: "还原",
                    onClick: onResetOrigin
                  }, _hoisted_19$3),
                  createBaseVNode("div", {
                    class: "u-preview-operation",
                    title: "向右旋转",
                    onClick: onClockwiseRotate
                  }, _hoisted_21$2),
                  createBaseVNode("div", {
                    class: "u-preview-operation",
                    title: "向左旋转",
                    onClick: onAnticlockwiseRotate
                  }, _hoisted_23$2)
                ]),
                createBaseVNode("div", {
                  class: "m-preview-image",
                  style: normalizeStyle(`transform: translate3d(${dragX.value}px, ${dragY.value}px, 0px);`)
                }, [
                  createVNode(unref(Spin), {
                    spinning: !loaded.value,
                    indicator: "dynamic-circle"
                  }, null, 8, ["spinning"]),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(images.value, (image, index) => {
                    return withDirectives((openBlock(), createElementBlock("img", {
                      key: index,
                      class: "u-preview-image",
                      style: normalizeStyle(`transform: scale3d(${scale.value}, ${scale.value}, 1) rotate(${rotate.value}deg);`),
                      src: image.src,
                      alt: image.name,
                      onMousedown: _cache[0] || (_cache[0] = withModifiers(($event) => onMouseDown($event), ["prevent"])),
                      onLoad: onLoaded,
                      onDblclick: _cache[1] || (_cache[1] = ($event) => _ctx.resetOnDbclick ? onResetOrigin() : () => false)
                    }, null, 44, _hoisted_24$1)), [
                      [vShow, previewIndex.value === index]
                    ]);
                  }), 128))
                ], 4),
                imageCount.value > 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  createBaseVNode("div", {
                    class: normalizeClass(["m-switch-left", { "u-switch-disabled": previewIndex.value === 0 && !_ctx.loop }]),
                    onClick: onSwitchLeft
                  }, _hoisted_26$1, 2),
                  createBaseVNode("div", {
                    class: normalizeClass(["m-switch-right", { "u-switch-disabled": previewIndex.value === imageCount.value - 1 && !_ctx.loop }]),
                    onClick: onSwitchRight
                  }, _hoisted_28$1, 2)
                ], 64)) : createCommentVNode("", true)
              ])
            ], 40, _hoisted_8$a), [
              [vShow, showPreview.value]
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
var Image$1 = _export_sfc(_sfc_main$l, [["__scopeId", "data-v-a5800aae"]]);
Image$1.install = (app) => {
  app.component(Image$1.__name, Image$1);
};
var _withScopeId$a = (n) => (pushScopeId("data-v-1de40ef9"), n = n(), popScopeId(), n);
var _hoisted_1$k = {
  class: "m-input-number",
  tabindex: "1"
};
var _hoisted_2$g = { class: "u-input-prefix" };
var _hoisted_3$e = { class: "m-input-wrap" };
var _hoisted_4$b = ["onKeyup"];
var _hoisted_5$9 = { class: "m-handler-wrap" };
var _hoisted_6$9 = _withScopeId$a(() => createBaseVNode("svg", {
  focusable: "false",
  class: "u-icon",
  "data-icon": "up",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z" })
], -1));
var _hoisted_7$9 = [
  _hoisted_6$9
];
var _hoisted_8$9 = _withScopeId$a(() => createBaseVNode("svg", {
  focusable: "false",
  class: "u-icon",
  "data-icon": "down",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" })
], -1));
var _hoisted_9$9 = [
  _hoisted_8$9
];
var _sfc_main$k = defineComponent({
  __name: "InputNumber",
  props: {
    min: { default: -Infinity },
    max: { default: Infinity },
    step: { default: 1 },
    prefix: { default: "" },
    keyboard: { type: Boolean, default: true },
    value: { default: null }
  },
  emits: ["update:value", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const numValue = ref();
    watchEffect(() => {
      numValue.value = props.value;
    });
    function emitValue(value) {
      emits("change", value);
      emits("update:value", value);
    }
    function onChange(e2) {
      const value = e2.target.value;
      if (!Number.isNaN(parseFloat(value))) {
        numValue.value = parseFloat(value);
        console.log(numValue.value);
        if (numValue.value > props.max) {
          numValue.value = props.max;
        }
        if (numValue.value < props.min) {
          numValue.value = props.min;
        }
        if (numValue.value !== props.value) {
          emitValue(numValue.value);
        }
      } else {
        numValue.value = props.value;
      }
    }
    function onInput(e2) {
      const value = e2.target.value;
      if (value === "") {
        emitValue(null);
      }
      if (!Number.isNaN(parseFloat(value)) && parseFloat(value) >= props.min && parseFloat(value) <= props.max && parseFloat(value) !== props.value) {
        numValue.value = parseFloat(value);
        emitValue(parseFloat(value) || 0);
      }
    }
    function add22(num1, num2) {
      const num1DeciStr = String(num1).split(".")[1];
      const num2DeciStr = String(num2).split(".")[1];
      let maxLen = Math.max((num1DeciStr == null ? void 0 : num1DeciStr.length) || 0, (num2DeciStr == null ? void 0 : num2DeciStr.length) || 0);
      let num1Str = num1.toFixed(maxLen);
      let num2Str = num2.toFixed(maxLen);
      const result = +num1Str.replace(".", "") + +num2Str.replace(".", "");
      return result / Math.pow(10, maxLen);
    }
    function onUp() {
      if (numValue.value !== props.max) {
        const res = add22(numValue.value || 0, +props.step);
        emitValue(Math.min(props.max, res));
        numValue.value = Math.min(props.max, res);
      }
    }
    function onDown() {
      if (numValue.value !== props.min) {
        const res = add22(numValue.value || 0, -props.step);
        emitValue(Math.max(props.min, res));
        numValue.value = Math.max(props.min, res);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$k, [
        createBaseVNode("span", _hoisted_2$g, [
          renderSlot(_ctx.$slots, "prefix", {}, () => [
            createTextVNode(toDisplayString(_ctx.prefix), 1)
          ], true)
        ]),
        createBaseVNode("div", _hoisted_3$e, [
          _ctx.keyboard ? withDirectives((openBlock(), createElementBlock("input", {
            key: 0,
            autocomplete: "off",
            class: "u-input-number",
            onChange,
            onInput,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => numValue.value = $event),
            onKeydown: _cache[1] || (_cache[1] = withKeys(withModifiers(() => {
            }, ["prevent"]), ["up"])),
            onKeyup: [
              withKeys(onUp, ["up"]),
              withKeys(onDown, ["down"])
            ]
          }, null, 40, _hoisted_4$b)), [
            [vModelText, numValue.value]
          ]) : withDirectives((openBlock(), createElementBlock("input", {
            key: 1,
            autocomplete: "off",
            class: "u-input-number",
            onChange,
            onInput,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => numValue.value = $event)
          }, null, 544)), [
            [vModelText, numValue.value]
          ])
        ]),
        createBaseVNode("div", _hoisted_5$9, [
          createBaseVNode("span", {
            class: normalizeClass(["u-up-arrow", { disabled: (numValue.value || 0) >= _ctx.max }]),
            onClick: onUp
          }, _hoisted_7$9, 2),
          createBaseVNode("span", {
            class: normalizeClass(["u-down-arrow", { disabled: (numValue.value || 0) <= _ctx.min }]),
            onClick: onDown
          }, _hoisted_9$9, 2)
        ])
      ]);
    };
  }
});
var InputNumber = _export_sfc(_sfc_main$k, [["__scopeId", "data-v-1de40ef9"]]);
InputNumber.install = (app) => {
  app.component(InputNumber.__name, InputNumber);
};
var _withScopeId$9 = (n) => (pushScopeId("data-v-58a186f5"), n = n(), popScopeId(), n);
var _hoisted_1$j = ["onMouseenter", "onMouseleave"];
var _hoisted_2$f = _withScopeId$9(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1));
var _hoisted_3$d = [
  _hoisted_2$f
];
var _hoisted_4$a = _withScopeId$9(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1));
var _hoisted_5$8 = [
  _hoisted_4$a
];
var _hoisted_6$8 = _withScopeId$9(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1));
var _hoisted_7$8 = [
  _hoisted_6$8
];
var _hoisted_8$8 = _withScopeId$9(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1));
var _hoisted_9$8 = [
  _hoisted_8$8
];
var _hoisted_10$6 = { class: "content" };
var ColorStyle$1 = ((ColorStyle2) => {
  ColorStyle2["info"] = "#1677FF";
  ColorStyle2["success"] = "#52c41a";
  ColorStyle2["error"] = "#ff4d4f";
  ColorStyle2["warn"] = "#faad14";
  return ColorStyle2;
})(ColorStyle$1 || {});
var _sfc_main$j = defineComponent({
  __name: "Message",
  props: {
    duration: { default: 3e3 },
    top: { default: 30 }
  },
  emits: ["close"],
  setup(__props, { expose: __expose, emit }) {
    const props = __props;
    const resetTimer = ref();
    const showMessage = ref([]);
    const hideTimers = ref([]);
    const messageContent = ref([]);
    const clear = computed(() => {
      return showMessage.value.every((item) => !item);
    });
    watch(clear, (to, from) => {
      if (!from && to) {
        resetTimer.value = rafTimeout(() => {
          messageContent.value.splice(0);
          showMessage.value.splice(0);
        }, 300);
      }
    });
    function onEnter(index) {
      cancelRaf(hideTimers.value[index]);
    }
    function onLeave(index) {
      onHideMessage(index);
    }
    function show() {
      cancelRaf(resetTimer.value);
      const index = messageContent.value.length - 1;
      showMessage.value[index] = true;
      onHideMessage(index);
    }
    function info(content) {
      messageContent.value.push({
        content,
        mode: "info"
      });
      show();
    }
    function success(content) {
      messageContent.value.push({
        content,
        mode: "success"
      });
      show();
    }
    function error(content) {
      messageContent.value.push({
        content,
        mode: "error"
      });
      show();
    }
    function warn(content) {
      messageContent.value.push({
        content,
        mode: "warn"
      });
      show();
    }
    __expose({
      info,
      success,
      error,
      warn
    });
    function onHideMessage(index) {
      hideTimers.value[index] = rafTimeout(() => {
        showMessage.value[index] = false;
        emit("close");
      }, props.duration);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-message-wrap",
        style: normalizeStyle(`top: ${_ctx.top}px;`)
      }, [
        createVNode(TransitionGroup, { name: "slide-fade" }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(messageContent.value, (message, index) => {
              return withDirectives((openBlock(), createElementBlock("div", {
                class: "m-message",
                key: index
              }, [
                createBaseVNode("div", {
                  class: "m-message-content",
                  onMouseenter: ($event) => onEnter(index),
                  onMouseleave: ($event) => onLeave(index)
                }, [
                  message.mode === "info" ? (openBlock(), createElementBlock("svg", {
                    key: 0,
                    class: "svg",
                    style: normalizeStyle({ fill: ColorStyle$1[message.mode] }),
                    viewBox: "64 64 896 896",
                    "data-icon": "info-circle",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, _hoisted_3$d, 4)) : createCommentVNode("", true),
                  message.mode === "success" ? (openBlock(), createElementBlock("svg", {
                    key: 1,
                    class: "svg",
                    style: normalizeStyle({ fill: ColorStyle$1[message.mode] }),
                    viewBox: "64 64 896 896",
                    "data-icon": "check-circle",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, _hoisted_5$8, 4)) : createCommentVNode("", true),
                  message.mode === "error" ? (openBlock(), createElementBlock("svg", {
                    key: 2,
                    class: "svg",
                    style: normalizeStyle({ fill: ColorStyle$1[message.mode] }),
                    viewBox: "64 64 896 896",
                    "data-icon": "close-circle",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, _hoisted_7$8, 4)) : createCommentVNode("", true),
                  message.mode === "warn" ? (openBlock(), createElementBlock("svg", {
                    key: 3,
                    class: "svg",
                    style: normalizeStyle({ fill: ColorStyle$1[message.mode] }),
                    viewBox: "64 64 896 896",
                    "data-icon": "exclamation-circle",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, _hoisted_9$8, 4)) : createCommentVNode("", true),
                  createBaseVNode("p", _hoisted_10$6, toDisplayString(message.content), 1)
                ], 40, _hoisted_1$j)
              ])), [
                [vShow, showMessage.value[index]]
              ]);
            }), 128))
          ]),
          _: 1
        })
      ], 4);
    };
  }
});
var Message = _export_sfc(_sfc_main$j, [["__scopeId", "data-v-58a186f5"]]);
Message.install = (app) => {
  app.component(Message.__name, Message);
};
var _withScopeId$8 = (n) => (pushScopeId("data-v-e4afb4b4"), n = n(), popScopeId(), n);
var _hoisted_1$i = ["onClick"];
var _hoisted_2$e = { class: "m-spin-dot" };
var _hoisted_3$c = _withScopeId$8(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1));
var _hoisted_4$9 = _withScopeId$8(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1));
var _hoisted_5$7 = _withScopeId$8(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1));
var _hoisted_6$7 = _withScopeId$8(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1));
var _hoisted_7$7 = [
  _hoisted_3$c,
  _hoisted_4$9,
  _hoisted_5$7,
  _hoisted_6$7
];
var _hoisted_8$7 = { class: "m-body" };
var _hoisted_9$7 = { class: "m-title" };
var _hoisted_10$5 = {
  key: 0,
  focusable: "false",
  class: "u-icon confirm",
  "data-icon": "exclamation-circle",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var _hoisted_11$5 = _withScopeId$8(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
var _hoisted_12$4 = _withScopeId$8(() => createBaseVNode("path", { d: "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1));
var _hoisted_13$4 = [
  _hoisted_11$5,
  _hoisted_12$4
];
var _hoisted_14$4 = {
  key: 1,
  focusable: "false",
  class: "u-icon info",
  "data-icon": "info-circle",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var _hoisted_15$4 = _withScopeId$8(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1));
var _hoisted_16$4 = [
  _hoisted_15$4
];
var _hoisted_17$2 = {
  key: 2,
  focusable: "false",
  class: "u-icon success",
  "data-icon": "check-circle",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var _hoisted_18$2 = _withScopeId$8(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1));
var _hoisted_19$2 = [
  _hoisted_18$2
];
var _hoisted_20$1 = {
  key: 3,
  focusable: "false",
  class: "u-icon error",
  "data-icon": "close-circle",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var _hoisted_21$1 = _withScopeId$8(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1));
var _hoisted_22$1 = [
  _hoisted_21$1
];
var _hoisted_23$1 = {
  key: 4,
  focusable: "false",
  class: "u-icon warn",
  "data-icon": "exclamation-circle",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var _hoisted_24 = _withScopeId$8(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1));
var _hoisted_25 = [
  _hoisted_24
];
var _hoisted_26 = { class: "u-title" };
var _hoisted_27 = { class: "u-content" };
var _hoisted_28 = { class: "m-btns" };
var _sfc_main$i = defineComponent({
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
  setup(__props, { expose: __expose, emit: emits }) {
    const mode = ref("");
    const desc = ref();
    function info(data) {
      mode.value = "info";
      desc.value = data;
    }
    function success(data) {
      mode.value = "success";
      desc.value = data;
    }
    function error(data) {
      mode.value = "error";
      desc.value = data;
    }
    function warn(data) {
      mode.value = "warn";
      desc.value = data;
    }
    function confirm(data) {
      mode.value = "confirm";
      desc.value = data;
    }
    function erase(data) {
      mode.value = "erase";
      desc.value = data;
    }
    __expose({
      info,
      success,
      error,
      warn,
      confirm,
      erase
    });
    function onBlur() {
      emits("cancel");
    }
    function onCancel() {
      emits("cancel");
    }
    function onConfirm() {
      emits("ok");
    }
    function onKnow() {
      emits("know");
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, null, {
        default: withCtx(() => {
          var _a2, _b;
          return [
            withDirectives(createBaseVNode("div", {
              class: "m-modal-mask",
              onClick: withModifiers(onBlur, ["self"])
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["m-modal", _ctx.center ? "relative-hv-center" : "top-center"]),
                style: normalizeStyle(`width: ${_ctx.width}px; top: ${!_ctx.center ? _ctx.top + "px" : "50%"};`)
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(["m-modal-body", { "loading": _ctx.loading }])
                }, [
                  withDirectives(createBaseVNode("div", _hoisted_2$e, _hoisted_7$7, 512), [
                    [vShow, _ctx.loading]
                  ]),
                  createBaseVNode("div", _hoisted_8$7, [
                    createBaseVNode("div", _hoisted_9$7, [
                      mode.value === "confirm" || mode.value === "erase" ? (openBlock(), createElementBlock("svg", _hoisted_10$5, _hoisted_13$4)) : createCommentVNode("", true),
                      mode.value === "info" ? (openBlock(), createElementBlock("svg", _hoisted_14$4, _hoisted_16$4)) : createCommentVNode("", true),
                      mode.value === "success" ? (openBlock(), createElementBlock("svg", _hoisted_17$2, _hoisted_19$2)) : createCommentVNode("", true),
                      mode.value === "error" ? (openBlock(), createElementBlock("svg", _hoisted_20$1, _hoisted_22$1)) : createCommentVNode("", true),
                      mode.value === "warn" ? (openBlock(), createElementBlock("svg", _hoisted_23$1, _hoisted_25)) : createCommentVNode("", true),
                      createBaseVNode("div", _hoisted_26, toDisplayString((_a2 = desc.value) == null ? void 0 : _a2.title), 1)
                    ]),
                    createBaseVNode("div", _hoisted_27, toDisplayString((_b = desc.value) == null ? void 0 : _b.content), 1)
                  ]),
                  createBaseVNode("div", _hoisted_28, [
                    mode.value === "confirm" || mode.value === "erase" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                      createBaseVNode("button", {
                        class: "u-cancel",
                        onClick: onCancel
                      }, toDisplayString(_ctx.cancelText), 1),
                      mode.value === "confirm" ? (openBlock(), createElementBlock("button", {
                        key: 0,
                        class: "u-confirm primary",
                        onClick: onConfirm
                      }, toDisplayString(_ctx.okText), 1)) : createCommentVNode("", true),
                      mode.value === "erase" ? (openBlock(), createElementBlock("button", {
                        key: 1,
                        class: "u-confirm delete",
                        onClick: onConfirm
                      }, toDisplayString(_ctx.okText), 1)) : createCommentVNode("", true)
                    ], 64)) : createCommentVNode("", true),
                    ["info", "success", "error", "warn"].includes(mode.value) ? (openBlock(), createElementBlock("button", {
                      key: 1,
                      class: "u-confirm primary",
                      onClick: onKnow
                    }, toDisplayString(_ctx.noticeText), 1)) : createCommentVNode("", true)
                  ])
                ], 2)
              ], 6)
            ], 8, _hoisted_1$i), [
              [vShow, _ctx.visible]
            ])
          ];
        }),
        _: 1
      });
    };
  }
});
var Modal = _export_sfc(_sfc_main$i, [["__scopeId", "data-v-e4afb4b4"]]);
Modal.install = (app) => {
  app.component(Modal.__name, Modal);
};
var _withScopeId$7 = (n) => (pushScopeId("data-v-65b80cd6"), n = n(), popScopeId(), n);
var _hoisted_1$h = ["onMouseenter", "onMouseleave"];
var _hoisted_2$d = _withScopeId$7(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
var _hoisted_3$b = _withScopeId$7(() => createBaseVNode("path", { d: "M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" }, null, -1));
var _hoisted_4$8 = [
  _hoisted_2$d,
  _hoisted_3$b
];
var _hoisted_5$6 = _withScopeId$7(() => createBaseVNode("path", { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1));
var _hoisted_6$6 = _withScopeId$7(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
var _hoisted_7$6 = [
  _hoisted_5$6,
  _hoisted_6$6
];
var _hoisted_8$6 = _withScopeId$7(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
var _hoisted_9$6 = _withScopeId$7(() => createBaseVNode("path", { d: "M464 688a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1));
var _hoisted_10$4 = [
  _hoisted_8$6,
  _hoisted_9$6
];
var _hoisted_11$4 = _withScopeId$7(() => createBaseVNode("path", { d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" }, null, -1));
var _hoisted_12$3 = _withScopeId$7(() => createBaseVNode("path", { d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1));
var _hoisted_13$3 = [
  _hoisted_11$4,
  _hoisted_12$3
];
var _hoisted_14$3 = ["onClick"];
var _hoisted_15$3 = _withScopeId$7(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1));
var _hoisted_16$3 = [
  _hoisted_15$3
];
var ColorStyle = ((ColorStyle2) => {
  ColorStyle2["info"] = "#1677FF";
  ColorStyle2["success"] = "#52c41a";
  ColorStyle2["error"] = "#ff4d4f";
  ColorStyle2["warn"] = "#faad14";
  return ColorStyle2;
})(ColorStyle || {});
var _sfc_main$h = defineComponent({
  __name: "Notification",
  props: {
    title: { default: "温馨提示" },
    duration: { default: 4500 },
    top: { default: 24 },
    bottom: { default: 24 },
    placement: { default: "topRight" }
  },
  emits: ["close"],
  setup(__props, { expose: __expose, emit }) {
    const props = __props;
    const resetTimer = ref();
    const hideIndex = ref([]);
    const hideTimers = ref([]);
    const notificationData = ref([]);
    const clear = computed(() => {
      return hideIndex.value.length === notificationData.value.length;
    });
    watch(clear, (to, from) => {
      if (!from && to) {
        resetTimer.value = rafTimeout(() => {
          hideIndex.value.splice(0);
          notificationData.value.splice(0);
        }, 300);
      }
    });
    function onEnter(index) {
      cancelRaf(hideTimers.value[index]);
      hideTimers.value[index] = null;
    }
    function onLeave(index) {
      if (props.duration) {
        hideTimers.value[index] = rafTimeout(() => {
          onClose(index);
        }, props.duration);
      }
    }
    function show() {
      cancelRaf(resetTimer.value);
      hideTimers.value.push(null);
      const index = notificationData.value.length - 1;
      if (props.duration) {
        hideTimers.value[index] = rafTimeout(() => {
          onClose(index);
        }, props.duration);
      }
    }
    function open(notification) {
      notificationData.value.push({
        notification,
        mode: "open"
      });
      show();
    }
    function info(notification) {
      notificationData.value.push({
        notification,
        mode: "info"
      });
      show();
    }
    function success(notification) {
      notificationData.value.push({
        notification,
        mode: "success"
      });
      show();
    }
    function error(notification) {
      notificationData.value.push({
        notification,
        mode: "error"
      });
      show();
    }
    function warn(notification) {
      notificationData.value.push({
        notification,
        mode: "warn"
      });
      show();
    }
    __expose({
      open,
      info,
      success,
      error,
      warn
    });
    function onClose(index) {
      hideIndex.value.push(index);
      emit("close");
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-notification-wrap", _ctx.placement]),
        style: normalizeStyle(`top: ${["topRight", "topLeft"].includes(_ctx.placement) ? _ctx.top : "auto"}px; bottom: ${["bottomRight", "bottomLeft"].includes(_ctx.placement) ? _ctx.bottom : ""}px;`)
      }, [
        createVNode(TransitionGroup, {
          name: ["topRight", "bottomRight"].includes(_ctx.placement) ? "right" : "left"
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(notificationData.value, (data, index) => {
              return withDirectives((openBlock(), createElementBlock("div", {
                class: "m-notification",
                onMouseenter: ($event) => onEnter(index),
                onMouseleave: ($event) => onLeave(index),
                key: index
              }, [
                data.mode === "info" ? (openBlock(), createElementBlock("svg", {
                  key: 0,
                  class: "u-status-svg",
                  style: normalizeStyle(`fill: ${ColorStyle[data.mode]}`),
                  viewBox: "64 64 896 896",
                  "data-icon": "info-circle",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_4$8, 4)) : createCommentVNode("", true),
                data.mode === "success" ? (openBlock(), createElementBlock("svg", {
                  key: 1,
                  class: "u-status-svg",
                  style: normalizeStyle(`fill: ${ColorStyle[data.mode]}`),
                  viewBox: "64 64 896 896",
                  "data-icon": "check-circle",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_7$6, 4)) : createCommentVNode("", true),
                data.mode === "warn" ? (openBlock(), createElementBlock("svg", {
                  key: 2,
                  class: "u-status-svg",
                  style: normalizeStyle(`fill: ${ColorStyle[data.mode]}`),
                  viewBox: "64 64 896 896",
                  "data-icon": "exclamation-circle",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_10$4, 4)) : createCommentVNode("", true),
                data.mode === "error" ? (openBlock(), createElementBlock("svg", {
                  key: 3,
                  class: "u-status-svg",
                  style: normalizeStyle(`fill: ${ColorStyle[data.mode]}`),
                  viewBox: "64 64 896 896",
                  "data-icon": "close-circle",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_13$3, 4)) : createCommentVNode("", true),
                createBaseVNode("div", {
                  class: normalizeClass(["u-title", { "mb4": data.mode !== "open", "ml36": data.mode !== "open" }])
                }, toDisplayString(_ctx.title || "--"), 3),
                createBaseVNode("p", {
                  class: normalizeClass(["u-description", { "ml36": data.mode !== "open" }])
                }, toDisplayString(data.notification || "--"), 3),
                (openBlock(), createElementBlock("svg", {
                  class: "u-close",
                  onClick: ($event) => onClose(index),
                  viewBox: "64 64 896 896",
                  "data-icon": "close",
                  "aria-hidden": "true",
                  focusable: "false"
                }, _hoisted_16$3, 8, _hoisted_14$3))
              ], 40, _hoisted_1$h)), [
                [vShow, !hideIndex.value.includes(index)]
              ]);
            }), 128))
          ]),
          _: 1
        }, 8, ["name"])
      ], 6);
    };
  }
});
var Notification = _export_sfc(_sfc_main$h, [["__scopeId", "data-v-65b80cd6"]]);
Notification.install = (app) => {
  app.component(Notification.__name, Notification);
};
var _withScopeId$6 = (n) => (pushScopeId("data-v-16ece15d"), n = n(), popScopeId(), n);
var _hoisted_1$g = { class: "m-pagination-wrap" };
var _hoisted_2$c = {
  key: 0,
  class: "mr8"
};
var _hoisted_3$a = _withScopeId$6(() => createBaseVNode("svg", {
  class: "u-arrow",
  viewBox: "64 64 896 896",
  "data-icon": "left",
  "aria-hidden": "true",
  focusable: "false"
}, [
  createBaseVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })
], -1));
var _hoisted_4$7 = [
  _hoisted_3$a
];
var _hoisted_5$5 = { class: "u-ellipsis" };
var _hoisted_6$5 = {
  class: "u-icon",
  viewBox: "64 64 896 896",
  "data-icon": "double-left",
  "aria-hidden": "true",
  focusable: "false"
};
var _hoisted_7$5 = _withScopeId$6(() => createBaseVNode("path", { d: "M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" }, null, -1));
var _hoisted_8$5 = [
  _hoisted_7$5
];
var _hoisted_9$5 = ["onClick"];
var _hoisted_10$3 = { class: "u-ellipsis" };
var _hoisted_11$3 = {
  class: "u-icon",
  viewBox: "64 64 896 896",
  "data-icon": "double-right",
  "aria-hidden": "true",
  focusable: "false"
};
var _hoisted_12$2 = _withScopeId$6(() => createBaseVNode("path", { d: "M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" }, null, -1));
var _hoisted_13$2 = [
  _hoisted_12$2
];
var _hoisted_14$2 = _withScopeId$6(() => createBaseVNode("svg", {
  class: "u-arrow",
  viewBox: "64 64 896 896",
  "data-icon": "right",
  "aria-hidden": "true",
  focusable: "false"
}, [
  createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" })
], -1));
var _hoisted_15$2 = [
  _hoisted_14$2
];
var _hoisted_16$2 = {
  key: 1,
  class: "u-jump-page"
};
var _sfc_main$g = defineComponent({
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
  setup(__props, { emit }) {
    const props = __props;
    const currentPage = ref(props.current);
    const jumpNumber = ref("");
    const forwardMore = ref(false);
    const backwardMore = ref(false);
    const forwardArrow = ref(false);
    const backwardArrow = ref(false);
    const totalPage = computed(() => {
      return Math.ceil(props.total / props.pageSize);
    });
    const pageList = computed(() => {
      return dealPageList(currentPage.value).filter((n) => n !== 1 && n !== totalPage.value);
    });
    watch(currentPage, (to) => {
      console.log("change:", to);
      emit("change", {
        page: to,
        pageSize: props.pageSize
      });
    });
    onMounted(() => {
      document.onkeydown = (e2) => {
        if (e2 && e2.key === "Enter") {
          jumpPage();
        }
      };
    });
    onUnmounted(() => {
      document.onkeydown = null;
    });
    function dealPageList(curPage) {
      var resList = [];
      var offset = Math.floor(props.pageListNum / 2);
      var pager = {
        start: curPage - offset,
        end: curPage + offset
      };
      if (pager.start < 1) {
        pager.end = pager.end + (1 - pager.start);
        pager.start = 1;
      }
      if (pager.end > totalPage.value) {
        pager.start = pager.start - (pager.end - totalPage.value);
        pager.end = totalPage.value;
      }
      if (pager.start < 1) {
        pager.start = 1;
      }
      if (pager.start > 1) {
        forwardMore.value = true;
      } else {
        forwardMore.value = false;
      }
      if (pager.end < totalPage.value) {
        backwardMore.value = true;
      } else {
        backwardMore.value = false;
      }
      for (let i2 = pager.start; i2 <= pager.end; i2++) {
        resList.push(i2);
      }
      return resList;
    }
    function onForward() {
      currentPage.value = currentPage.value - props.pageListNum > 0 ? currentPage.value - props.pageListNum : 1;
    }
    function onBackward() {
      currentPage.value = currentPage.value + props.pageListNum < totalPage.value ? currentPage.value + props.pageListNum : totalPage.value;
    }
    function jumpPage() {
      var num = Number(jumpNumber.value);
      if (Number.isInteger(num)) {
        if (num < 1) {
          num = 1;
        }
        if (num > totalPage.value) {
          num = totalPage.value;
        }
        changePage(num);
      }
      jumpNumber.value = "";
    }
    function changePage(pageNum) {
      if (pageNum === 0 || pageNum === totalPage.value + 1) {
        return false;
      }
      if (currentPage.value !== pageNum) {
        currentPage.value = pageNum;
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([`m-pagination ${_ctx.placement}`, { hidden: _ctx.hideOnSinglePage && _ctx.total <= _ctx.pageSize }])
      }, [
        createBaseVNode("div", _hoisted_1$g, [
          _ctx.showTotal ? (openBlock(), createElementBlock("span", _hoisted_2$c, "共 " + toDisplayString(totalPage.value) + " 页 / " + toDisplayString(_ctx.total) + " 条", 1)) : createCommentVNode("", true),
          createBaseVNode("span", {
            class: normalizeClass(["u-item", { disabled: currentPage.value === 1 }]),
            onClick: _cache[0] || (_cache[0] = ($event) => changePage(currentPage.value - 1))
          }, _hoisted_4$7, 2),
          createBaseVNode("span", {
            class: normalizeClass(["u-item", { active: currentPage.value === 1 }]),
            onClick: _cache[1] || (_cache[1] = ($event) => changePage(1))
          }, "1", 2),
          withDirectives(createBaseVNode("span", {
            class: "m-arrow",
            ref: "forward",
            onClick: onForward,
            onMouseenter: _cache[2] || (_cache[2] = ($event) => forwardArrow.value = true),
            onMouseleave: _cache[3] || (_cache[3] = ($event) => forwardArrow.value = false)
          }, [
            withDirectives(createBaseVNode("span", _hoisted_5$5, "•••", 512), [
              [vShow, !forwardArrow.value]
            ]),
            withDirectives((openBlock(), createElementBlock("svg", _hoisted_6$5, _hoisted_8$5, 512)), [
              [vShow, forwardArrow.value]
            ])
          ], 544), [
            [vShow, forwardMore.value && pageList.value[0] - 1 > 1]
          ]),
          (openBlock(true), createElementBlock(Fragment, null, renderList(pageList.value, (page, index) => {
            return openBlock(), createElementBlock("span", {
              class: normalizeClass(["u-item", { active: currentPage.value === page }]),
              key: index,
              onClick: ($event) => changePage(page)
            }, toDisplayString(page), 11, _hoisted_9$5);
          }), 128)),
          withDirectives(createBaseVNode("span", {
            class: "m-arrow",
            ref: "backward",
            onClick: onBackward,
            onMouseenter: _cache[4] || (_cache[4] = ($event) => backwardArrow.value = true),
            onMouseleave: _cache[5] || (_cache[5] = ($event) => backwardArrow.value = false)
          }, [
            withDirectives(createBaseVNode("span", _hoisted_10$3, "•••", 512), [
              [vShow, !backwardArrow.value]
            ]),
            withDirectives((openBlock(), createElementBlock("svg", _hoisted_11$3, _hoisted_13$2, 512)), [
              [vShow, backwardArrow.value]
            ])
          ], 544), [
            [vShow, backwardMore.value && pageList.value[pageList.value.length - 1] + 1 < totalPage.value]
          ]),
          withDirectives(createBaseVNode("span", {
            class: normalizeClass(["u-item", { active: currentPage.value === totalPage.value }]),
            onClick: _cache[6] || (_cache[6] = ($event) => changePage(totalPage.value))
          }, toDisplayString(totalPage.value), 3), [
            [vShow, totalPage.value !== 1]
          ]),
          createBaseVNode("span", {
            class: normalizeClass(["u-item", { disabled: currentPage.value === totalPage.value }]),
            onClick: _cache[7] || (_cache[7] = ($event) => changePage(currentPage.value + 1))
          }, _hoisted_15$2, 2),
          _ctx.showQuickJumper ? (openBlock(), createElementBlock("span", _hoisted_16$2, [
            createTextVNode("跳至"),
            withDirectives(createBaseVNode("input", {
              type: "text",
              "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => jumpNumber.value = $event)
            }, null, 512), [
              [vModelText, jumpNumber.value]
            ]),
            createTextVNode("页")
          ])) : createCommentVNode("", true)
        ])
      ], 2);
    };
  }
});
var Pagination2 = _export_sfc(_sfc_main$g, [["__scopeId", "data-v-16ece15d"]]);
Pagination2.install = (app) => {
  app.component(Pagination2.__name, Pagination2);
};
var _withScopeId$5 = (n) => (pushScopeId("data-v-b9de5d8a"), n = n(), popScopeId(), n);
var _hoisted_1$f = {
  key: 0,
  class: "u-success",
  viewBox: "64 64 896 896",
  "data-icon": "check-circle",
  "aria-hidden": "true",
  focusable: "false"
};
var _hoisted_2$b = _withScopeId$5(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1));
var _hoisted_3$9 = [
  _hoisted_2$b
];
var _hoisted_4$6 = {
  key: 1,
  class: "u-progress-text"
};
var _hoisted_5$4 = {
  class: "u-progress-circle",
  viewBox: "0 0 100 100"
};
var _hoisted_6$4 = ["d", "stroke-width"];
var _hoisted_7$4 = ["d", "stroke-width", "stroke", "opacity"];
var _hoisted_8$4 = {
  key: 0,
  class: "u-success",
  focusable: "false",
  "data-icon": "check",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var _hoisted_9$4 = _withScopeId$5(() => createBaseVNode("path", { d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" }, null, -1));
var _hoisted_10$2 = [
  _hoisted_9$4
];
var _hoisted_11$2 = {
  key: 1,
  class: "u-progress-text"
};
var _sfc_main$f = defineComponent({
  __name: "Progress",
  props: {
    width: { default: "100%" },
    percent: { default: 0 },
    strokeColor: { default: "#1677FF" },
    strokeWidth: { default: 8 },
    showInfo: { type: Boolean, default: true },
    type: { default: "line" }
  },
  setup(__props) {
    const props = __props;
    const totalWidth = computed(() => {
      if (typeof props.width === "number") {
        return props.width + "px";
      } else {
        return props.width;
      }
    });
    const perimeter = computed(() => {
      return (100 - props.strokeWidth) * Math.PI;
    });
    const path = computed(() => {
      const long = 100 - props.strokeWidth;
      return `M 50,50 m 0,-${long / 2}
   a ${long / 2},${long / 2} 0 1 1 0,${long}
   a ${long / 2},${long / 2} 0 1 1 0,-${long}`;
    });
    const lineColor = computed(() => {
      if (typeof props.strokeColor === "string") {
        return props.strokeColor;
      } else {
        return `linear-gradient(to ${props.strokeColor.direction || "right"}, ${props.strokeColor["0%"] || props.strokeColor.from}, ${props.strokeColor["100%"] || props.strokeColor.to})`;
      }
    });
    return (_ctx, _cache) => {
      return _ctx.type === "line" ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "m-progress-line",
        style: normalizeStyle(`width: ${totalWidth.value}; height: ${_ctx.strokeWidth < 24 ? 24 : _ctx.strokeWidth}px;`)
      }, [
        createBaseVNode("div", {
          class: "m-progress-inner",
          style: normalizeStyle(`width: ${_ctx.showInfo ? "calc(100% - 44px)" : "100%"};`)
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["u-progress-bg", { "u-success-bg": _ctx.percent >= 100 }]),
            style: normalizeStyle(`background: ${lineColor.value}; width: ${_ctx.percent >= 100 ? 100 : _ctx.percent}%; height: ${_ctx.strokeWidth}px;`)
          }, null, 6)
        ], 4),
        _ctx.showInfo ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _ctx.percent >= 100 ? (openBlock(), createElementBlock("svg", _hoisted_1$f, _hoisted_3$9)) : (openBlock(), createElementBlock("p", _hoisted_4$6, toDisplayString(_ctx.percent >= 100 ? 100 : _ctx.percent) + "%", 1))
        ], 64)) : createCommentVNode("", true)
      ], 4)) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: "m-progress-circle",
        style: normalizeStyle(`width: ${totalWidth.value}; height: ${totalWidth.value};`)
      }, [
        (openBlock(), createElementBlock("svg", _hoisted_5$4, [
          createBaseVNode("path", {
            d: path.value,
            "stroke-linecap": "round",
            class: "u-progress-circle-trail",
            "stroke-width": _ctx.strokeWidth,
            style: normalizeStyle(`stroke-dasharray: ${perimeter.value}px, ${perimeter.value}px;`),
            "fill-opacity": "0"
          }, null, 12, _hoisted_6$4),
          createBaseVNode("path", {
            d: path.value,
            "stroke-linecap": "round",
            class: normalizeClass(["u-progress-circle-path", { success: _ctx.percent >= 100 }]),
            "stroke-width": _ctx.strokeWidth,
            stroke: lineColor.value,
            style: normalizeStyle(`stroke-dasharray: ${_ctx.percent / 100 * perimeter.value}px, ${perimeter.value}px;`),
            opacity: _ctx.percent === 0 ? 0 : 1,
            "fill-opacity": "0"
          }, null, 14, _hoisted_7$4)
        ])),
        _ctx.showInfo ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _ctx.percent >= 100 ? (openBlock(), createElementBlock("svg", _hoisted_8$4, _hoisted_10$2)) : (openBlock(), createElementBlock("p", _hoisted_11$2, toDisplayString(_ctx.percent >= 100 ? 100 : _ctx.percent) + "%", 1))
        ], 64)) : createCommentVNode("", true)
      ], 4));
    };
  }
});
var Progress = _export_sfc(_sfc_main$f, [["__scopeId", "data-v-b9de5d8a"]]);
Progress.install = (app) => {
  app.component(Progress.__name, Progress);
};
var isClient = typeof window !== "undefined";
var noop = () => {
};
function toRef2(...args) {
  if (args.length !== 1)
    return toRef(...args);
  const r = args[0];
  return typeof r === "function" ? readonly(customRef(() => ({ get: r, set: noop }))) : ref(r);
}
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
var _hoisted_1$e = ["src"];
var _sfc_main$e = defineComponent({
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
  setup(__props) {
    const props = __props;
    const qrcode = useQRCode(props.value, {
      errorCorrectionLevel: props.errorLevel,
      type: "image/png",
      quality: 1,
      margin: 3,
      scale: props.scale,
      // 8px per modules(black dots)
      color: {
        dark: props.color,
        // 像素点颜色
        light: props.backgroundColor
        // 背景色
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-qrcode", { "bordered": _ctx.bordered }]),
        style: normalizeStyle(`width: ${_ctx.size}px; height: ${_ctx.size}px; border-color: ${_ctx.borderColor};`)
      }, [
        createBaseVNode("img", {
          src: unref(qrcode),
          class: "u-qrcode",
          alt: "QRCode"
        }, null, 8, _hoisted_1$e)
      ], 6);
    };
  }
});
var QRCode = _export_sfc(_sfc_main$e, [["__scopeId", "data-v-a604e87a"]]);
QRCode.install = (app) => {
  app.component(QRCode.__name, QRCode);
};
var _hoisted_1$d = { class: "m-radio" };
var _hoisted_2$a = ["onClick"];
var _hoisted_3$8 = { class: "u-label" };
var _sfc_main$d = defineComponent({
  __name: "Radio",
  props: {
    options: { default: () => [] },
    disabled: { type: Boolean, default: false },
    vertical: { type: Boolean, default: false },
    value: { default: null },
    gap: { default: 8 }
  },
  emits: ["update:value", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const sum = computed(() => {
      return props.options.length;
    });
    const styleObject = computed(() => {
      if (props.vertical) {
        return {
          marginBottom: props.gap + "px"
        };
      } else {
        return {
          marginRight: props.gap + "px"
        };
      }
    });
    function onClick2(value) {
      if (value !== props.value) {
        emits("update:value", value);
        emits("change", value);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$d, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.options, (option, index) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["m-radio-wrap", { "vertical": _ctx.vertical }]),
            style: normalizeStyle(sum.value !== index + 1 ? styleObject.value : ""),
            key: index
          }, [
            createBaseVNode("div", {
              class: normalizeClass(["m-box", { "disabled": _ctx.disabled || option.disabled }]),
              onClick: ($event) => _ctx.disabled || option.disabled ? () => false : onClick2(option.value)
            }, [
              createBaseVNode("span", {
                class: normalizeClass(["u-radio", { "u-radio-checked": _ctx.value === option.value }])
              }, null, 2),
              createBaseVNode("span", _hoisted_3$8, [
                renderSlot(_ctx.$slots, "default", {
                  label: option.label
                }, () => [
                  createTextVNode(toDisplayString(option.label), 1)
                ], true)
              ])
            ], 10, _hoisted_2$a)
          ], 6);
        }), 128))
      ]);
    };
  }
});
var Radio = _export_sfc(_sfc_main$d, [["__scopeId", "data-v-8f878371"]]);
Radio.install = (app) => {
  app.component(Radio.__name, Radio);
};
var _withScopeId$4 = (n) => (pushScopeId("data-v-c9783345"), n = n(), popScopeId(), n);
var _hoisted_1$c = ["onClick"];
var _hoisted_2$9 = ["onClick", "onMouseenter"];
var _hoisted_3$7 = _withScopeId$4(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" }, null, -1));
var _hoisted_4$5 = [
  _hoisted_3$7
];
var _hoisted_5$3 = _withScopeId$4(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" }, null, -1));
var _hoisted_6$3 = [
  _hoisted_5$3
];
var _hoisted_7$3 = _withScopeId$4(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" }, null, -1));
var _hoisted_8$3 = [
  _hoisted_7$3
];
var _hoisted_9$3 = _withScopeId$4(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" }, null, -1));
var _hoisted_10$1 = [
  _hoisted_9$3
];
var _hoisted_11$1 = ["onClick", "onMouseenter"];
var _hoisted_12$1 = _withScopeId$4(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" }, null, -1));
var _hoisted_13$1 = [
  _hoisted_12$1
];
var _hoisted_14$1 = _withScopeId$4(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" }, null, -1));
var _hoisted_15$1 = [
  _hoisted_14$1
];
var _hoisted_16$1 = _withScopeId$4(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" }, null, -1));
var _hoisted_17$1 = [
  _hoisted_16$1
];
var _hoisted_18$1 = _withScopeId$4(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" }, null, -1));
var _hoisted_19$1 = [
  _hoisted_18$1
];
var _sfc_main$c = defineComponent({
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
  setup(__props, { emit: emits }) {
    const props = __props;
    const activeValue = ref(props.value);
    const tempValue = ref();
    watch(
      () => props.value,
      (to) => {
        activeValue.value = to;
      }
    );
    function onClick2(value) {
      tempValue.value = null;
      if (value !== props.value) {
        emits("change", value);
        emits("update:value", value);
      } else {
        if (props.allowClear) {
          tempValue.value = value;
          emits("change", 0);
          emits("update:value", 0);
        } else {
          emits("change", value);
        }
      }
    }
    function onFirstEnter(value) {
      activeValue.value = value;
      emits("hoverChange", value);
    }
    function onSecondEnter(value) {
      activeValue.value = value;
      emits("hoverChange", value);
    }
    function resetTempValue() {
      tempValue.value = null;
    }
    function onLeave() {
      activeValue.value = props.value;
    }
    function preventDefault(e2) {
      e2.preventDefault();
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-rate", { "disabled": _ctx.disabled }]),
        style: normalizeStyle(`--color: ${_ctx.color};`),
        onMouseleave: onLeave
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.count, (n) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["m-star", { "u-star-half": _ctx.allowHalf && activeValue.value >= n - 0.5 && activeValue.value < n, "u-star-full": activeValue.value >= n, "temp-gray": !_ctx.allowHalf && tempValue.value === n }]),
            style: normalizeStyle(`margin-right: ${n !== _ctx.count ? _ctx.gap : 0}px;`),
            onClick: ($event) => !_ctx.allowHalf ? onClick2(n) : preventDefault($event),
            key: n
          }, [
            _ctx.allowHalf ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["u-star-first", { "temp-gray-first": tempValue.value === n - 0.5 }]),
              onClick: withModifiers(($event) => onClick2(n - 0.5), ["stop"]),
              onMouseenter: ($event) => onFirstEnter(n - 0.5),
              onMouseleave: resetTempValue
            }, [
              _ctx.character === "star-filled" ? (openBlock(), createElementBlock("svg", {
                key: 0,
                class: "u-star",
                style: normalizeStyle(`width: ${_ctx.size}px;`),
                focusable: "false",
                "data-icon": "star",
                "aria-hidden": "true",
                viewBox: "64 64 896 896"
              }, _hoisted_4$5, 4)) : _ctx.character === "star-outlined" ? (openBlock(), createElementBlock("svg", {
                key: 1,
                class: "u-star",
                style: normalizeStyle(`width: ${_ctx.size}px;`),
                focusable: "false",
                "data-icon": "star",
                "aria-hidden": "true",
                viewBox: "64 64 896 896"
              }, _hoisted_6$3, 4)) : _ctx.character === "heart-filled" ? (openBlock(), createElementBlock("svg", {
                key: 2,
                class: "u-star",
                style: normalizeStyle(`width: ${_ctx.size}px;`),
                focusable: "false",
                "data-icon": "heart",
                "aria-hidden": "true",
                viewBox: "64 64 896 896"
              }, _hoisted_8$3, 4)) : _ctx.character === "heart-outlined" ? (openBlock(), createElementBlock("svg", {
                key: 3,
                class: "u-star",
                style: normalizeStyle(`width: ${_ctx.size}px;`),
                focusable: "false",
                "data-icon": "heart",
                "aria-hidden": "true",
                viewBox: "64 64 896 896"
              }, _hoisted_10$1, 4)) : (openBlock(), createElementBlock("span", {
                key: 4,
                class: "u-star",
                style: normalizeStyle(`font-size: ${0.66 * _ctx.size}px; height: ${_ctx.size}px;`)
              }, [
                renderSlot(_ctx.$slots, "character", {}, () => [
                  createTextVNode(toDisplayString(_ctx.character), 1)
                ], true)
              ], 4))
            ], 42, _hoisted_2$9)) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass(["u-star-second", { "temp-gray-second": tempValue.value === n }]),
              onClick: withModifiers(($event) => onClick2(n), ["stop"]),
              onMouseenter: ($event) => onSecondEnter(n),
              onMouseleave: resetTempValue
            }, [
              _ctx.character === "star-filled" ? (openBlock(), createElementBlock("svg", {
                key: 0,
                class: "u-star",
                style: normalizeStyle(`width: ${_ctx.size}px;`),
                focusable: "false",
                "data-icon": "star",
                "aria-hidden": "true",
                viewBox: "64 64 896 896"
              }, _hoisted_13$1, 4)) : _ctx.character === "star-outlined" ? (openBlock(), createElementBlock("svg", {
                key: 1,
                class: "u-star",
                style: normalizeStyle(`width: ${_ctx.size}px;`),
                focusable: "false",
                "data-icon": "star",
                "aria-hidden": "true",
                viewBox: "64 64 896 896"
              }, _hoisted_15$1, 4)) : _ctx.character === "heart-filled" ? (openBlock(), createElementBlock("svg", {
                key: 2,
                class: "u-star",
                style: normalizeStyle(`width: ${_ctx.size}px;`),
                focusable: "false",
                "data-icon": "heart",
                "aria-hidden": "true",
                viewBox: "64 64 896 896"
              }, _hoisted_17$1, 4)) : _ctx.character === "heart-outlined" ? (openBlock(), createElementBlock("svg", {
                key: 3,
                class: "u-star",
                style: normalizeStyle(`width: ${_ctx.size}px;`),
                focusable: "false",
                "data-icon": "heart",
                "aria-hidden": "true",
                viewBox: "64 64 896 896"
              }, _hoisted_19$1, 4)) : (openBlock(), createElementBlock("span", {
                key: 4,
                class: "u-star",
                style: normalizeStyle(`font-size: ${0.66 * _ctx.size}px; height: ${_ctx.size}px;`)
              }, [
                renderSlot(_ctx.$slots, "character", {}, () => [
                  createTextVNode(toDisplayString(_ctx.character), 1)
                ], true)
              ], 4))
            ], 42, _hoisted_11$1)
          ], 14, _hoisted_1$c);
        }), 128))
      ], 38);
    };
  }
});
var Rate = _export_sfc(_sfc_main$c, [["__scopeId", "data-v-c9783345"]]);
Rate.install = (app) => {
  app.component(Rate.__name, Rate);
};
var _withScopeId$3 = (n) => (pushScopeId("data-v-2a9f34cf"), n = n(), popScopeId(), n);
var _hoisted_1$b = {
  key: 0,
  class: "u-handle-tooltip"
};
var _hoisted_2$8 = _withScopeId$3(() => createBaseVNode("div", { class: "m-arrow" }, [
  createBaseVNode("span", { class: "u-arrow" })
], -1));
var _hoisted_3$6 = {
  key: 0,
  class: "u-handle-tooltip"
};
var _hoisted_4$4 = _withScopeId$3(() => createBaseVNode("div", { class: "m-arrow" }, [
  createBaseVNode("span", { class: "u-arrow" })
], -1));
var _sfc_main$b = defineComponent({
  __name: "Slider",
  props: {
    width: { default: "100%" },
    min: { default: 0 },
    max: { default: 100 },
    disabled: { type: Boolean, default: false },
    range: { type: Boolean, default: false },
    step: { default: 1 },
    tipFormatter: { type: Function, default: (value) => value },
    hideTip: { type: Boolean, default: false },
    value: { default: 0 }
  },
  emits: ["update:value", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const transition = ref(false);
    const timer = ref();
    const left = ref(0);
    const right = ref(0);
    const slider = ref();
    const sliderWidth = ref();
    const leftHandle = ref();
    const rightHandle = ref();
    const pixelStep = computed(() => {
      return fixedDigit(sliderWidth.value / (props.max - props.min) * props.step);
    });
    const totalWidth = computed(() => {
      if (typeof props.width === "number") {
        return props.width + "px";
      } else {
        return props.width;
      }
    });
    const sliderValue = computed(() => {
      const high = Math.round(right.value / pixelStep.value * props.step + props.min);
      if (props.range) {
        const low = Math.round(left.value / pixelStep.value * props.step + props.min);
        return [low, high];
      }
      return high;
    });
    const leftValue = computed(() => {
      if (props.range) {
        return props.tipFormatter(sliderValue.value[0]);
      }
      return null;
    });
    const rightValue = computed(() => {
      if (props.range) {
        return props.tipFormatter(sliderValue.value[1]);
      }
      return props.tipFormatter(sliderValue.value);
    });
    watch(
      () => props.value,
      () => {
        getPosition();
      }
    );
    watch(sliderValue, (to) => {
      emits("update:value", to);
      emits("change", to);
    });
    onMounted(() => {
      getSliderWidth();
      getPosition();
    });
    function fixedDigit(num) {
      return parseFloat(num.toFixed(2));
    }
    function getSliderWidth() {
      sliderWidth.value = slider.value.offsetWidth;
    }
    function getPosition() {
      if (props.range) {
        left.value = fixedDigit((props.value[0] - props.min) / props.step * pixelStep.value);
        right.value = fixedDigit((props.value[1] - props.min) / props.step * pixelStep.value);
      } else {
        right.value = fixedDigit((props.value - props.min) / props.step * pixelStep.value);
      }
    }
    function onClickPoint(e2) {
      if (transition.value) {
        cancelRaf(timer.value);
        timer.value = null;
      } else {
        transition.value = true;
      }
      timer.value = rafTimeout(() => {
        transition.value = false;
      }, 300);
      const targetX = Math.round(e2.layerX / pixelStep.value) * pixelStep.value;
      if (props.range) {
        if (targetX <= left.value) {
          left.value = targetX;
          leftHandle.value.focus();
        } else if (targetX >= right.value) {
          right.value = targetX;
          rightHandle.value.focus();
        } else {
          if (targetX - left.value < right.value - targetX) {
            left.value = targetX;
            leftHandle.value.focus();
          } else {
            right.value = targetX;
            rightHandle.value.focus();
          }
        }
      } else {
        right.value = targetX;
        rightHandle.value.focus();
      }
    }
    function onLeftMouseDown() {
      const leftX = slider.value.getBoundingClientRect().left;
      document.onmousemove = (e2) => {
        const targetX = fixedDigit(Math.round((e2.clientX - leftX) / pixelStep.value) * pixelStep.value);
        if (targetX < 0) {
          left.value = 0;
        } else if (targetX >= 0 && targetX <= right.value) {
          left.value = targetX;
        } else {
          left.value = right.value;
          rightHandle.value.focus();
          onRightMouseDown();
        }
      };
      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
    function onRightMouseDown() {
      const leftX = slider.value.getBoundingClientRect().left;
      document.onmousemove = (e2) => {
        const targetX = fixedDigit(Math.round((e2.clientX - leftX) / pixelStep.value) * pixelStep.value);
        if (targetX > sliderWidth.value) {
          right.value = sliderWidth.value;
        } else if (left.value <= targetX && targetX <= sliderWidth.value) {
          right.value = targetX;
        } else {
          right.value = left.value;
          leftHandle.value.focus();
          onLeftMouseDown();
        }
      };
      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
    function onLeftSlide(source, place) {
      const targetX = source - pixelStep.value;
      if (place === "left") {
        if (targetX < 0) {
          left.value = 0;
        } else {
          left.value = targetX;
        }
      } else {
        if (targetX >= left.value) {
          right.value = targetX;
        } else {
          right.value = left.value;
          left.value = targetX;
          leftHandle.value.focus();
        }
      }
    }
    function onRightSlide(source, place) {
      const targetX = source + pixelStep.value;
      if (place === "right") {
        if (targetX > sliderWidth.value) {
          right.value = sliderWidth.value;
        } else {
          right.value = targetX;
        }
      } else {
        if (targetX <= right.value) {
          left.value = targetX;
        } else {
          left.value = right.value;
          right.value = targetX;
          rightHandle.value.focus();
        }
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-slider", { disabled: _ctx.disabled }]),
        ref_key: "slider",
        ref: slider,
        style: normalizeStyle(`width: ${totalWidth.value};`)
      }, [
        createBaseVNode("div", {
          class: "u-slider-rail",
          onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.disabled ? () => false : onClickPoint($event), ["self"]))
        }),
        createBaseVNode("div", {
          class: normalizeClass(["u-slider-track", { trackTransition: transition.value }]),
          style: normalizeStyle(`left: ${left.value}px; right: auto; width: ${right.value - left.value}px;`)
        }, null, 6),
        _ctx.range ? (openBlock(), createElementBlock("div", {
          key: 0,
          tabindex: "0",
          ref_key: "leftHandle",
          ref: leftHandle,
          class: normalizeClass(["u-slider-handle", { handleTransition: transition.value }]),
          style: normalizeStyle(`left: ${left.value}px; right: auto; transform: translate(-50%, -50%);`),
          onKeydown: [
            _cache[1] || (_cache[1] = withKeys(withModifiers(($event) => _ctx.disabled ? () => false : onLeftSlide(left.value, "left"), ["prevent"]), ["left"])),
            _cache[2] || (_cache[2] = withKeys(withModifiers(($event) => _ctx.disabled ? () => false : onRightSlide(left.value, "left"), ["prevent"]), ["right"])),
            _cache[3] || (_cache[3] = withKeys(withModifiers(($event) => _ctx.disabled ? () => false : onLeftSlide(left.value, "left"), ["prevent"]), ["down"])),
            _cache[4] || (_cache[4] = withKeys(withModifiers(($event) => _ctx.disabled ? () => false : onRightSlide(left.value, "left"), ["prevent"]), ["up"]))
          ],
          onMousedown: _cache[5] || (_cache[5] = ($event) => _ctx.disabled ? () => false : onLeftMouseDown())
        }, [
          !_ctx.hideTip ? (openBlock(), createElementBlock("div", _hoisted_1$b, [
            createTextVNode(toDisplayString(leftValue.value) + " ", 1),
            _hoisted_2$8
          ])) : createCommentVNode("", true)
        ], 38)) : createCommentVNode("", true),
        createBaseVNode("div", {
          tabindex: "0",
          ref_key: "rightHandle",
          ref: rightHandle,
          class: normalizeClass(["u-slider-handle", { handleTransition: transition.value }]),
          style: normalizeStyle(`left: ${right.value}px; right: auto; transform: translate(-50%, -50%);`),
          onKeydown: [
            _cache[6] || (_cache[6] = withKeys(withModifiers(($event) => _ctx.disabled ? () => false : onLeftSlide(right.value, "right"), ["prevent"]), ["left"])),
            _cache[7] || (_cache[7] = withKeys(withModifiers(($event) => _ctx.disabled ? () => false : onRightSlide(right.value, "right"), ["prevent"]), ["right"])),
            _cache[8] || (_cache[8] = withKeys(withModifiers(($event) => _ctx.disabled ? () => false : onLeftSlide(right.value, "right"), ["prevent"]), ["down"])),
            _cache[9] || (_cache[9] = withKeys(withModifiers(($event) => _ctx.disabled ? () => false : onRightSlide(right.value, "right"), ["prevent"]), ["up"]))
          ],
          onMousedown: _cache[10] || (_cache[10] = ($event) => _ctx.disabled ? () => false : onRightMouseDown())
        }, [
          !_ctx.hideTip ? (openBlock(), createElementBlock("div", _hoisted_3$6, [
            createTextVNode(toDisplayString(rightValue.value) + " ", 1),
            _hoisted_4$4
          ])) : createCommentVNode("", true)
        ], 38)
      ], 6);
    };
  }
});
var Slider = _export_sfc(_sfc_main$b, [["__scopeId", "data-v-2a9f34cf"]]);
Slider.install = (app) => {
  app.component(Slider.__name, Slider);
};
var _withScopeId$2 = (n) => (pushScopeId("data-v-f837a4aa"), n = n(), popScopeId(), n);
var _hoisted_1$a = { class: "m-steps" };
var _hoisted_2$7 = ["onClick"];
var _hoisted_3$5 = { class: "m-steps-icon" };
var _hoisted_4$3 = {
  key: 0,
  class: "u-num"
};
var _hoisted_5$2 = {
  key: 1,
  class: "u-icon",
  viewBox: "64 64 896 896",
  "data-icon": "check",
  "aria-hidden": "true",
  focusable: "false"
};
var _hoisted_6$2 = _withScopeId$2(() => createBaseVNode("path", { d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" }, null, -1));
var _hoisted_7$2 = [
  _hoisted_6$2
];
var _hoisted_8$2 = { class: "m-steps-content" };
var _hoisted_9$2 = { class: "u-steps-title" };
var _sfc_main$a = defineComponent({
  __name: "Steps",
  props: {
    steps: { default: () => [] },
    current: { default: 1 },
    width: { default: "100%" },
    descMaxWidth: { default: 120 }
  },
  emits: ["update:current", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const totalWidth = computed(() => {
      if (typeof props.width === "number") {
        return props.width + "px";
      } else {
        return props.width;
      }
    });
    const totalSteps = computed(() => {
      return props.steps.length;
    });
    const currentStep = computed(() => {
      if (props.current < 1) {
        return 1;
      } else if (props.current > totalSteps.value + 1) {
        return totalSteps.value + 1;
      } else {
        return props.current;
      }
    });
    function onChange(index) {
      if (currentStep.value !== index) {
        emits("update:current", index);
        emits("change", index);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-steps-area",
        style: normalizeStyle(`width: ${totalWidth.value};`)
      }, [
        createBaseVNode("div", _hoisted_1$a, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.steps, (step, index) => {
            return openBlock(), createElementBlock("div", {
              class: normalizeClass([
                "m-steps-item",
                {
                  "finish": currentStep.value > index + 1,
                  "process": currentStep.value === index + 1,
                  "wait": currentStep.value < index + 1
                }
              ]),
              key: index
            }, [
              createBaseVNode("div", {
                class: "m-info-wrap",
                onClick: ($event) => onChange(index + 1)
              }, [
                createBaseVNode("div", _hoisted_3$5, [
                  currentStep.value <= index + 1 ? (openBlock(), createElementBlock("span", _hoisted_4$3, toDisplayString(index + 1), 1)) : (openBlock(), createElementBlock("svg", _hoisted_5$2, _hoisted_7$2))
                ]),
                createBaseVNode("div", _hoisted_8$2, [
                  createBaseVNode("div", _hoisted_9$2, toDisplayString(step.title), 1),
                  withDirectives(createBaseVNode("div", {
                    class: "u-steps-description",
                    style: normalizeStyle(`max-width: ${_ctx.descMaxWidth}px;`)
                  }, toDisplayString(step.description), 5), [
                    [vShow, step.description]
                  ])
                ])
              ], 8, _hoisted_2$7)
            ], 2);
          }), 128))
        ])
      ], 4);
    };
  }
});
var Steps = _export_sfc(_sfc_main$a, [["__scopeId", "data-v-f837a4aa"]]);
Steps.install = (app) => {
  app.component(Steps.__name, Steps);
};
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
function needsNavigation(params = {}) {
  return params.navigation && typeof params.navigation.nextEl === "undefined" && typeof params.navigation.prevEl === "undefined";
}
function needsPagination(params = {}) {
  return params.pagination && typeof params.pagination.el === "undefined";
}
function needsScrollbar(params = {}) {
  return params.scrollbar && typeof params.scrollbar.el === "undefined";
}
function uniqueClasses(classNames = "") {
  const classes = classNames.split(" ").map((c2) => c2.trim()).filter((c2) => !!c2);
  const unique = [];
  classes.forEach((c2) => {
    if (unique.indexOf(c2) < 0)
      unique.push(c2);
  });
  return unique.join(" ");
}
function wrapperClass(className = "") {
  if (!className)
    return "swiper-wrapper";
  if (!className.includes("swiper-wrapper"))
    return `swiper-wrapper ${className}`;
  return className;
}
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
function getParams(obj = {}, splitEvents = true) {
  const params = {
    on: {}
  };
  const events2 = {};
  const passedParams = {};
  extend3(params, core_default.defaults);
  extend3(params, core_default.extendedDefaults);
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
function mountSwiper({
  el: el2,
  nextEl,
  prevEl,
  paginationEl,
  scrollbarEl,
  swiper
}, swiperParams) {
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
  swiper.init(el2);
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
function updateSwiper({
  swiper,
  slides,
  passedParams,
  changedParams,
  nextEl,
  prevEl,
  scrollbarEl,
  paginationEl
}) {
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
      swiper.el.shadowEl.appendChild(paginationEl);
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
      swiper.el.shadowEl.appendChild(scrollbarEl);
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
        swiper.el.shadowEl.appendChild(nextEl);
      }
      if (!prevEl || typeof prevEl === "string") {
        prevEl = document.createElement("div");
        prevEl.classList.add("swiper-button-prev");
        swiper.el.shadowEl.appendChild(prevEl);
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
    to
  } = virtualData;
  const loopFrom = swiperRef.value.params.loop ? -slides.length : 0;
  const loopTo = swiperRef.value.params.loop ? slides.length * 2 : slides.length;
  const slidesToRender = [];
  for (let i2 = loopFrom; i2 < loopTo; i2 += 1) {
    if (i2 >= from && i2 <= to) {
      slidesToRender.push(slides[getSlideIndex(i2)]);
    }
  }
  return slidesToRender.map((slide) => {
    if (!slide.props)
      slide.props = {};
    if (!slide.props.style)
      slide.props.style = {};
    slide.props.swiperRef = swiperRef;
    slide.props.style = style;
    return h(slide.type, {
      ...slide.props
    }, slide.children);
  });
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
var Swiper$1 = {
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
      _containerClasses(swiper, classes) {
        containerClasses.value = classes;
      }
    });
    const passParams = {
      ...swiperParams
    };
    delete passParams.wrapperClass;
    swiperRef.value = new core_default(passParams);
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
      const changedParams = getChangedParams(newPassedParams, oldPassedParamsRef.value, slidesRef.value, oldSlidesRef.value, (c2) => c2.props && c2.props.key);
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
      slides.forEach((slide, index) => {
        if (!slide.props)
          slide.props = {};
        slide.props.swiperRef = swiperRef;
        slide.props.swiperSlideIndex = index;
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
    function updateClasses(swiper, el2, classNames) {
      if (el2 === slideElRef.value) {
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
var _hoisted_1$9 = ["href", "target"];
var _hoisted_2$6 = ["src", "alt"];
var _hoisted_3$4 = ["href", "target"];
var _hoisted_4$2 = ["src", "alt"];
var _sfc_main$9 = defineComponent({
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
  setup(__props) {
    const props = __props;
    const imgWidth = computed(() => {
      if (typeof props.width === "number") {
        return props.width + "px";
      } else {
        return props.width;
      }
    });
    const imgHeight = computed(() => {
      if (typeof props.height === "number") {
        return props.height + "px";
      } else {
        return props.height;
      }
    });
    const modulesBanner = ref([Navigation, Pagination, Autoplay, EffectFade]);
    const pagination = ref({
      dynamicBullets: true,
      clickable: true
    });
    const autoplayBanner = ref({
      delay: props.delay,
      disableOnInteraction: false,
      // 用户操作swiper之后，是否禁止autoplay。默认为true：停止。
      pauseOnMouseEnter: true
      // 鼠标置于swiper时暂停自动切换，鼠标离开时恢复自动切换，默认false
    });
    const modulesCarousel = ref([Autoplay]);
    const autoplayCarousel = ref({
      delay: 0,
      disableOnInteraction: false
    });
    function onSwiper(swiper) {
      if (props.type === "carousel") {
        swiper.el.onmouseenter = () => {
          swiper.autoplay.stop();
        };
        swiper.el.onmouseleave = () => {
          swiper.autoplay.start();
        };
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        _ctx.type === "banner" ? (openBlock(), createBlock(unref(Swiper$1), mergeProps({
          key: 0,
          class: { "swiper-no-swiping": !_ctx.swipe },
          modules: modulesBanner.value,
          lazy: true,
          navigation: _ctx.navigation,
          pagination: pagination.value,
          "slides-per-view": 1,
          autoplay: autoplayBanner.value,
          loop: true,
          onSwiper,
          onSlideChange: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("change"))
        }, _ctx.$attrs), {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.images, (image, index) => {
              return openBlock(), createBlock(unref(SwiperSlide), { key: index }, {
                default: withCtx(() => [
                  createBaseVNode("a", {
                    href: image.link ? image.link : "javascript:;",
                    target: image.link ? "_blank" : "_self",
                    class: "m-link"
                  }, [
                    createBaseVNode("img", {
                      src: image.src,
                      class: "u-img",
                      style: normalizeStyle(`width: ${imgWidth.value}; height: ${imgHeight.value};`),
                      alt: image.title,
                      loading: "lazy"
                    }, null, 12, _hoisted_2$6)
                  ], 8, _hoisted_1$9),
                  createBaseVNode("div", {
                    class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${_ctx.preloaderColor}`)
                  }, null, 2)
                ]),
                _: 2
              }, 1024);
            }), 128))
          ]),
          _: 1
        }, 16, ["class", "modules", "navigation", "pagination", "autoplay"])) : createCommentVNode("", true),
        _ctx.type === "carousel" ? (openBlock(), createBlock(unref(Swiper$1), mergeProps({
          key: 1,
          class: "swiper-no-swiping",
          modules: modulesCarousel.value,
          lazy: true,
          autoplay: autoplayCarousel.value,
          loop: true,
          onSwiper,
          onSlideChange: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("change"))
        }, _ctx.$attrs), {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.images, (image, index) => {
              return openBlock(), createBlock(unref(SwiperSlide), { key: index }, {
                default: withCtx(() => [
                  createBaseVNode("a", {
                    href: image.link ? image.link : "javascript:;",
                    target: image.link ? "_blank" : "_self",
                    class: "m-link"
                  }, [
                    createBaseVNode("img", {
                      src: image.src,
                      class: "u-img",
                      style: normalizeStyle(`width: ${imgWidth.value}; height: ${imgHeight.value};`),
                      alt: image.title,
                      loading: "lazy"
                    }, null, 12, _hoisted_4$2)
                  ], 8, _hoisted_3$4),
                  createBaseVNode("div", {
                    class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${_ctx.preloaderColor}`)
                  }, null, 2)
                ]),
                _: 2
              }, 1024);
            }), 128))
          ]),
          _: 1
        }, 16, ["modules", "autoplay"])) : createCommentVNode("", true)
      ], 64);
    };
  }
});
var Swiper2 = _export_sfc(_sfc_main$9, [["__scopeId", "data-v-956587f0"]]);
Swiper2.install = (app) => {
  app.component(Swiper2.__name, Swiper2);
};
var _hoisted_1$8 = { class: "m-switch-wrap" };
var _sfc_main$8 = defineComponent({
  __name: "Switch",
  props: {
    checkedInfo: { default: "" },
    uncheckedInfo: { default: "" },
    disabled: { type: Boolean, default: false },
    checked: { type: Boolean, default: false }
  },
  emits: ["update:checked", "change"],
  setup(__props, { emit }) {
    const props = __props;
    const checked = ref(props.checked);
    watch(
      () => props.checked,
      (to) => {
        checked.value = to;
      }
    );
    function onSwitch() {
      emit("update:checked", !checked.value);
      emit("change", !checked.value);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        createBaseVNode("div", {
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.disabled ? () => false : onSwitch()),
          class: normalizeClass(["m-switch", { "switch-checked": checked.value, "disabled": _ctx.disabled }])
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["u-switch-inner", checked.value ? "inner-checked" : "inner-unchecked"])
          }, toDisplayString(checked.value ? _ctx.checkedInfo : _ctx.uncheckedInfo), 3),
          createBaseVNode("div", {
            class: normalizeClass(["u-node", { "node-checked": checked.value }])
          }, [
            renderSlot(_ctx.$slots, "node", { checked: checked.value }, void 0, true)
          ], 2)
        ], 2)
      ]);
    };
  }
});
var Switch = _export_sfc(_sfc_main$8, [["__scopeId", "data-v-cea6fee2"]]);
Switch.install = (app) => {
  app.component(Switch.__name, Switch);
};
var _hoisted_1$7 = { class: "m-table-wrap" };
var _hoisted_2$5 = { class: "m-table" };
var _hoisted_3$3 = { class: "m-tr" };
var _hoisted_4$1 = { class: "m-body" };
var _hoisted_5$1 = { class: "m-tr-loading" };
var _hoisted_6$1 = { class: "m-tr-empty" };
var _hoisted_7$1 = ["colspan"];
var _hoisted_8$1 = ["title"];
var _hoisted_9$1 = { key: 1 };
var _sfc_main$7 = defineComponent({
  __name: "Table",
  props: {
    columns: { default: () => [] },
    dataSource: { default: () => [] },
    pagination: { default: () => {
      return { page: 1, pageSize: 10 };
    } },
    showPagination: { type: Boolean, default: true },
    hideOnSinglePage: { type: Boolean, default: false },
    total: { default: 0 },
    loading: { type: Boolean, default: false }
  },
  emits: ["change"],
  setup(__props, { emit }) {
    function changePage(pager) {
      emit("change", pager);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        createBaseVNode("table", _hoisted_2$5, [
          createBaseVNode("thead", null, [
            createBaseVNode("tr", _hoisted_3$3, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.columns, (item, index) => {
                return openBlock(), createElementBlock("th", {
                  class: "m-th",
                  style: normalizeStyle(`width: ${typeof item.width === "number" ? item.width + "px" : item.width};`),
                  key: index
                }, toDisplayString(item.title), 5);
              }), 128))
            ])
          ]),
          createBaseVNode("tbody", _hoisted_4$1, [
            withDirectives(createBaseVNode("tr", _hoisted_5$1, [
              createVNode(unref(Spin), {
                class: "m-loading",
                size: "small",
                colspan: _ctx.columns.length
              }, null, 8, ["colspan"])
            ], 512), [
              [vShow, _ctx.loading]
            ]),
            withDirectives(createBaseVNode("tr", _hoisted_6$1, [
              createBaseVNode("td", {
                class: "m-td-empty",
                colspan: _ctx.columns.length
              }, [
                createVNode(unref(Empty), {
                  class: "empty",
                  image: "2"
                })
              ], 8, _hoisted_7$1)
            ], 512), [
              [vShow, !_ctx.total]
            ]),
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.dataSource, (data, index) => {
              return openBlock(), createElementBlock("tr", {
                class: "m-tr",
                key: index
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.columns, (col, n) => {
                  return openBlock(), createElementBlock("td", {
                    class: "m-td",
                    key: n,
                    title: data[col.dataIndex]
                  }, [
                    col.slot ? renderSlot(_ctx.$slots, col.slot, mergeProps({ key: 0 }, data, { index }), () => [
                      createTextVNode(toDisplayString(data[col.dataIndex] || "--"), 1)
                    ], true) : (openBlock(), createElementBlock("span", _hoisted_9$1, toDisplayString(data[col.dataIndex] || "--"), 1))
                  ], 8, _hoisted_8$1);
                }), 128))
              ]);
            }), 128))
          ])
        ]),
        _ctx.showPagination && _ctx.total ? (openBlock(), createBlock(unref(Pagination2), {
          key: 0,
          class: "mt20",
          onChange: changePage,
          current: _ctx.pagination.page,
          pageSize: _ctx.pagination.pageSize,
          total: _ctx.total,
          hideOnSinglePage: _ctx.hideOnSinglePage,
          showQuickJumper: true,
          showTotal: true,
          placement: "right"
        }, null, 8, ["current", "pageSize", "total", "hideOnSinglePage"])) : createCommentVNode("", true)
      ]);
    };
  }
});
var Table = _export_sfc(_sfc_main$7, [["__scopeId", "data-v-7353f744"]]);
Table.install = (app) => {
  app.component(Table.__name, Table);
};
var _hoisted_1$6 = { class: "m-tabs-nav" };
var _hoisted_2$4 = ["onClick"];
var _hoisted_3$2 = { class: "m-tabs-page" };
var _sfc_main$6 = defineComponent({
  __name: "Tabs",
  props: {
    tabPages: { default: () => [] },
    centered: { type: Boolean, default: false },
    size: { default: "small" },
    activeKey: { default: "" }
  },
  emits: ["update:activeKey", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const tabs = ref();
    const left = ref(0);
    const width = ref(0);
    const wrap = ref();
    const nav = ref();
    const showWheel = ref(false);
    const scrollMax = ref(0);
    const scrollLeft = ref(0);
    watchEffect(() => {
      getNavWidth();
    }, { flush: "post" });
    watchEffect(() => {
      getBarPosition(props.activeKey);
    }, { flush: "post" });
    function findElement(key) {
      return tabs.value.find((element) => element.__vnode.key === key);
    }
    function getBarPosition(key) {
      const el2 = findElement(key);
      if (el2) {
        left.value = el2.offsetLeft;
        width.value = el2.offsetWidth;
      } else {
        left.value = 0;
        width.value = 0;
      }
    }
    function getNavWidth() {
      const wrapWidth = wrap.value.offsetWidth;
      const navWidth = nav.value.offsetWidth;
      if (navWidth > wrapWidth) {
        showWheel.value = true;
        scrollMax.value = navWidth - wrapWidth;
      }
    }
    function onTab(key) {
      getBarPosition(key);
      emits("update:activeKey", key);
      emits("change", key);
    }
    function onWheel(e2) {
      if (e2.deltaX !== 0) {
        e2.preventDefault();
        const scrollX = e2.deltaX * 1;
        if (scrollLeft.value + scrollX > scrollMax.value) {
          scrollLeft.value = scrollMax.value;
        } else if (scrollLeft.value + scrollX < 0) {
          scrollLeft.value = 0;
        } else {
          scrollLeft.value += scrollX;
        }
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(`m-tabs ${_ctx.size}`)
      }, [
        createBaseVNode("div", _hoisted_1$6, [
          createBaseVNode("div", {
            ref_key: "wrap",
            ref: wrap,
            class: normalizeClass(["m-tabs-nav-wrap", { "tabs-center": _ctx.centered, "before-shadow-active": scrollLeft.value > 0, "after-shadow-active": scrollLeft.value < scrollMax.value }])
          }, [
            createBaseVNode("div", {
              ref_key: "nav",
              ref: nav,
              class: "m-tabs-nav-list",
              onWheel: _cache[0] || (_cache[0] = ($event) => showWheel.value ? onWheel($event) : () => false),
              style: normalizeStyle(`transform: translate(${-scrollLeft.value}px, 0)`)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tabPages, (page) => {
                return openBlock(), createElementBlock("div", {
                  ref_for: true,
                  ref_key: "tabs",
                  ref: tabs,
                  class: normalizeClass(["u-tab", { "u-tab-active": _ctx.activeKey === page.key, "u-tab-disabled": page.disabled }]),
                  onClick: ($event) => page.disabled ? () => false : onTab(page.key),
                  key: page.key
                }, toDisplayString(page.tab), 11, _hoisted_2$4);
              }), 128)),
              createBaseVNode("div", {
                class: "u-tab-bar",
                style: normalizeStyle(`left: ${left.value}px; width: ${width.value}px;`)
              }, null, 4)
            ], 36)
          ], 2)
        ]),
        createBaseVNode("div", _hoisted_3$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tabPages, (page) => {
            return withDirectives((openBlock(), createElementBlock("div", {
              class: "m-tabs-content",
              key: page.key
            }, [
              renderSlot(_ctx.$slots, page.key, {}, () => [
                createTextVNode(toDisplayString(page.content), 1)
              ], true)
            ])), [
              [vShow, _ctx.activeKey === page.key]
            ]);
          }), 128))
        ])
      ], 2);
    };
  }
});
var Tabs = _export_sfc(_sfc_main$6, [["__scopeId", "data-v-828c6d3d"]]);
Tabs.install = (app) => {
  app.component(Tabs.__name, Tabs);
};
var _hoisted_1$5 = ["title", "href", "target", "onClick"];
var _hoisted_2$3 = ["title", "href", "target", "onClick"];
var _sfc_main$5 = defineComponent({
  __name: "TextScroll",
  props: {
    sliderText: { default: () => [] },
    width: { default: "100%" },
    height: { default: 60 },
    backgroundColor: { default: "#FFF" },
    amount: { default: 4 },
    gap: { default: 20 },
    vertical: { type: Boolean, default: false },
    interval: { default: 3e3 }
  },
  emits: ["click"],
  setup(__props, { emit }) {
    const props = __props;
    const left = ref(0);
    const fpsRaf = ref(0);
    const moveRaf = ref();
    const fps = ref(60);
    const textData = ref([...props.sliderText]);
    const horizonRef = ref();
    const distance = ref(0);
    const step = computed(() => {
      if (fps.value === 60) {
        return 1;
      } else {
        return 60 / fps.value;
      }
    });
    function getFPS() {
      const requestAnimationFrame2 = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      var start = null;
      function timeElapse(timestamp) {
        if (!start) {
          if (fpsRaf.value > 10) {
            start = timestamp;
          }
          fpsRaf.value = requestAnimationFrame2(timeElapse);
        } else {
          fps.value = Math.floor(1e3 / (timestamp - start));
          console.log("fps", fps.value);
          distance.value = getDistance();
          onStart();
        }
      }
      fpsRaf.value = requestAnimationFrame2(timeElapse);
    }
    function getDistance() {
      return parseFloat((horizonRef.value.offsetWidth / props.amount).toFixed(2));
    }
    function moveLeft() {
      if (left.value >= distance.value) {
        textData.value.push(textData.value.shift());
        left.value = 0;
      } else {
        left.value += step.value;
      }
      moveRaf.value = requestAnimationFrame$1(moveLeft);
    }
    const totalWidth = computed(() => {
      if (typeof props.width === "number") {
        return props.width + "px";
      } else {
        return props.width;
      }
    });
    const len = computed(() => {
      return props.sliderText.length;
    });
    onMounted(() => {
      if (props.vertical) {
        onStart();
      } else {
        getFPS();
      }
    });
    function onStart() {
      if (props.vertical) {
        if (len.value > 1) {
          startMove();
        }
      } else {
        if (textData.value.length > props.amount) {
          moveRaf.value = requestAnimationFrame$1(moveLeft);
        }
      }
    }
    function onStop() {
      if (props.vertical) {
        if (len.value > 1) {
          cancelRaf(timer);
        }
      } else {
        cancelAnimationFrame$1(moveRaf.value);
      }
    }
    function onClick2(title) {
      emit("click", title);
    }
    const actIndex = ref(0);
    var timer = null;
    function startMove() {
      timer = rafTimeout(() => {
        if (actIndex.value === len.value - 1) {
          actIndex.value = 0;
        } else {
          actIndex.value++;
        }
        startMove();
      }, props.interval);
    }
    return (_ctx, _cache) => {
      return !_ctx.vertical ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "m-slider-horizon",
        onMouseenter: onStop,
        onMouseleave: onStart,
        ref_key: "horizonRef",
        ref: horizonRef,
        style: normalizeStyle(`height: ${_ctx.height}px; width: ${totalWidth.value}; background: ${_ctx.backgroundColor};`)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(textData.value, (text, index) => {
          return openBlock(), createElementBlock("a", {
            style: normalizeStyle(`will-change: transform; transform: translateX(${-left.value}px); width: ${distance.value - _ctx.gap}px; margin-left: ${_ctx.gap}px;`),
            class: "u-slide-title",
            key: index,
            title: text.title,
            href: text.link ? text.link : "javascript:;",
            target: text.link ? "_blank" : "_self",
            onClick: ($event) => onClick2(text.title)
          }, toDisplayString(text.title || "--"), 13, _hoisted_1$5);
        }), 128))
      ], 36)) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: "m-slider-vertical",
        onMouseenter: onStop,
        onMouseleave: onStart,
        style: normalizeStyle(`height: ${_ctx.height}px; width: ${totalWidth.value}; background: ${_ctx.backgroundColor};`)
      }, [
        createVNode(TransitionGroup, { name: "slide" }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.sliderText, (text, index) => {
              return withDirectives((openBlock(), createElementBlock("div", {
                class: "m-slider",
                style: normalizeStyle(`width: calc(${totalWidth.value} - ${2 * _ctx.gap}px); height: ${_ctx.height}px;`),
                key: index
              }, [
                createBaseVNode("a", {
                  class: "u-slider",
                  title: text.title,
                  href: text.link ? text.link : "javascript:;",
                  target: text.link ? "_blank" : "_self",
                  onClick: ($event) => onClick2(text.title)
                }, toDisplayString(text.title), 9, _hoisted_2$3)
              ], 4)), [
                [vShow, actIndex.value === index]
              ]);
            }), 128))
          ]),
          _: 1
        })
      ], 36));
    };
  }
});
var TextScroll = _export_sfc(_sfc_main$5, [["__scopeId", "data-v-9aa9743c"]]);
TextScroll.install = (app) => {
  app.component(TextScroll.__name, TextScroll);
};
var _hoisted_1$4 = { class: "m-timeline" };
var _sfc_main$4 = defineComponent({
  __name: "Timeline",
  props: {
    timelineData: { default: () => [] },
    width: { default: 360 },
    lineStyle: { default: "solid" }
  },
  setup(__props) {
    const props = __props;
    const desc = ref();
    const dotsHeight = ref([]);
    const totalWidth = computed(() => {
      if (typeof props.width === "number") {
        return props.width + "px";
      } else {
        return props.width;
      }
    });
    function getDotsHeight() {
      const len = props.timelineData.length;
      for (let n = 0; n < len; n++) {
        dotsHeight.value[n] = getComputedStyle(desc.value[n].firstElementChild || desc.value[n], null).getPropertyValue("line-height");
      }
    }
    watchEffect(() => {
      getDotsHeight();
    }, { flush: "post" });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-timeline-area",
        style: normalizeStyle(`width: ${totalWidth.value};`)
      }, [
        createBaseVNode("div", _hoisted_1$4, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.timelineData, (data, index) => {
            return openBlock(), createElementBlock("div", {
              class: normalizeClass(["m-timeline-item", { "last": index === _ctx.timelineData.length - 1 }]),
              key: index
            }, [
              createBaseVNode("span", {
                class: "u-tail",
                style: normalizeStyle(`border-left-style: ${_ctx.lineStyle};`)
              }, null, 4),
              createBaseVNode("div", {
                class: "m-dot",
                style: normalizeStyle(`height: ${dotsHeight.value[index]}`)
              }, [
                renderSlot(_ctx.$slots, "dot", { index }, () => [
                  data.color === "red" ? (openBlock(), createElementBlock("span", {
                    key: 0,
                    class: "u-dot",
                    style: normalizeStyle({
                      borderColor: "#ff4d4f"
                      /* red */
                    })
                  }, null, 4)) : data.color === "gray" ? (openBlock(), createElementBlock("span", {
                    key: 1,
                    class: "u-dot",
                    style: normalizeStyle({
                      borderColor: "#00000040"
                      /* gray */
                    })
                  }, null, 4)) : data.color === "green" ? (openBlock(), createElementBlock("span", {
                    key: 2,
                    class: "u-dot",
                    style: normalizeStyle({
                      borderColor: "#52c41a"
                      /* green */
                    })
                  }, null, 4)) : data.color === "blue" ? (openBlock(), createElementBlock("span", {
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
                      borderColor: data.color || "#1677ff"
                      /* blue */
                    })
                  }, null, 4))
                ], true)
              ], 4),
              createBaseVNode("div", {
                ref_for: true,
                ref_key: "desc",
                ref: desc,
                class: "u-desc"
              }, [
                renderSlot(_ctx.$slots, "desc", { index }, () => [
                  createTextVNode(toDisplayString(data.desc || "--"), 1)
                ], true)
              ], 512)
            ], 2);
          }), 128))
        ])
      ], 4);
    };
  }
});
var Timeline = _export_sfc(_sfc_main$4, [["__scopeId", "data-v-04f57bbf"]]);
Timeline.install = (app) => {
  app.component(Timeline.__name, Timeline);
};
var _hoisted_1$3 = { class: "m-arrow" };
var _sfc_main$3 = defineComponent({
  __name: "Tooltip",
  props: {
    maxWidth: { default: 120 },
    content: { default: "暂无内容" },
    title: { default: "暂无提示" },
    fontSize: { default: 14 },
    color: { default: "#FFF" },
    backgroundColor: { default: "rgba(0,0,0,.85)" }
  },
  setup(__props) {
    const visible = ref(false);
    const hideTimer = ref();
    const top = ref(0);
    const left = ref(0);
    const contentRef = ref();
    const titleRef = ref();
    onMounted(() => {
      getPosition();
    });
    function getPosition() {
      const rect = contentRef.value.getBoundingClientRect();
      const targetTop = rect.top;
      const targetLeft = rect.left;
      const targetWidth = rect.width;
      const titleWidth = titleRef.value.offsetWidth;
      const titleHeight = titleRef.value.offsetHeight;
      top.value = targetTop - titleHeight;
      left.value = targetLeft - (titleWidth - targetWidth) / 2;
    }
    function onShow() {
      getPosition();
      cancelRaf(hideTimer.value);
      visible.value = true;
    }
    function onHide() {
      hideTimer.value = rafTimeout(() => {
        visible.value = false;
      }, 100);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-tooltip",
        onMouseenter: onShow,
        onMouseleave: onHide
      }, [
        createBaseVNode("div", {
          ref_key: "titleRef",
          ref: titleRef,
          class: normalizeClass(["m-title", { "show-tip": visible.value }]),
          onMouseenter: onShow,
          onMouseleave: onHide,
          style: normalizeStyle(`max-width: ${_ctx.maxWidth}px; top: ${top.value}px; left: ${left.value}px;`)
        }, [
          createBaseVNode("div", {
            class: "u-title",
            style: normalizeStyle(`font-size: ${_ctx.fontSize}px; color: ${_ctx.color}; background-color: ${_ctx.backgroundColor};`)
          }, [
            renderSlot(_ctx.$slots, "title", {}, () => [
              createTextVNode(toDisplayString(_ctx.title), 1)
            ], true)
          ], 4),
          createBaseVNode("div", _hoisted_1$3, [
            createBaseVNode("span", {
              class: "u-arrow",
              style: normalizeStyle(`background-color: ${_ctx.backgroundColor};`)
            }, null, 4)
          ])
        ], 38),
        createBaseVNode("div", {
          ref_key: "contentRef",
          ref: contentRef,
          class: "u-content"
        }, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(_ctx.content), 1)
          ], true)
        ], 512)
      ], 32);
    };
  }
});
var Tooltip = _export_sfc(_sfc_main$3, [["__scopeId", "data-v-c3922115"]]);
Tooltip.install = (app) => {
  app.component(Tooltip.__name, Tooltip);
};
var _withScopeId$1 = (n) => (pushScopeId("data-v-dabd8435"), n = n(), popScopeId(), n);
var _hoisted_1$2 = { class: "m-upload-list" };
var _hoisted_2$2 = { class: "m-upload" };
var _hoisted_3$1 = ["onDrop", "onClick"];
var _hoisted_4 = ["accept", "multiple", "onChange"];
var _hoisted_5 = _withScopeId$1(() => createBaseVNode("svg", {
  class: "u-plus",
  focusable: "false",
  "data-icon": "plus",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" }),
  createBaseVNode("path", { d: "M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" })
], -1));
var _hoisted_6 = { class: "u-tip" };
var _hoisted_7 = { class: "m-file-uploading" };
var _hoisted_8 = {
  key: 0,
  class: "m-file-preview"
};
var _hoisted_9 = ["src", "alt"];
var _hoisted_10 = {
  key: 1,
  class: "u-file",
  focusable: "false",
  "data-icon": "file-pdf",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var _hoisted_11 = _withScopeId$1(() => createBaseVNode("path", { d: "M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7-3.8-21.3-19.5-29.6-32.9-30.2-15.8-.7-29.9 8.3-33.4 21.4-6.6 24-.7 56.8 10.1 98.6-13.6 32.4-35.3 79.5-51.2 107.5-29.6 15.3-69.3 38.9-75.2 68.7-1.2 5.5.2 12.5 3.5 18.8 3.7 7 9.6 12.4 16.5 15 3 1.1 6.6 2 10.8 2 17.6 0 46.1-14.2 84.1-79.4 5.8-1.9 11.8-3.9 17.6-5.9 27.2-9.2 55.4-18.8 80.9-23.1 28.2 15.1 60.3 24.8 82.1 24.8 21.6 0 30.1-12.8 33.3-20.5 5.6-13.5 2.9-30.5-6.2-39.6-13.2-13-45.3-16.4-95.3-10.2-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7 6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4-4.9-19.9-5.6-48.1-2.7-51.4.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2-21.6 4.9-41.3 13-58.9 20.2-4.2 1.7-8.3 3.4-12.3 5 13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6 40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z" }, null, -1));
var _hoisted_12 = [
  _hoisted_11
];
var _hoisted_13 = {
  key: 2,
  class: "u-file",
  focusable: "false",
  "data-icon": "file",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
var _hoisted_14 = _withScopeId$1(() => createBaseVNode("path", {
  d: "M534 352V136H232v752h560V394H576a42 42 0 01-42-42z",
  fill: "#e6f7ff"
}, null, -1));
var _hoisted_15 = _withScopeId$1(() => createBaseVNode("path", { d: "M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM602 137.8L790.2 326H602V137.8zM792 888H232V136h302v216a42 42 0 0042 42h216v494z" }, null, -1));
var _hoisted_16 = [
  _hoisted_14,
  _hoisted_15
];
var _hoisted_17 = { class: "m-file-mask" };
var _hoisted_18 = ["href"];
var _hoisted_19 = _withScopeId$1(() => createBaseVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "eye",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" })
], -1));
var _hoisted_20 = [
  _hoisted_19
];
var _hoisted_21 = ["onClick"];
var _hoisted_22 = _withScopeId$1(() => createBaseVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "delete",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  createBaseVNode("path", { d: "M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" })
], -1));
var _hoisted_23 = [
  _hoisted_22
];
var _sfc_main$2 = defineComponent({
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
  setup(__props, { emit: emits }) {
    const props = __props;
    const uploadedFiles = ref([]);
    const showUpload = ref(1);
    const uploading = ref(Array(props.maxCount).fill(false));
    const uploadInput = ref();
    watchEffect(() => {
      initUpload();
    });
    function initUpload() {
      uploadedFiles.value = [...props.fileList];
      if (uploadedFiles.value.length > props.maxCount) {
        uploadedFiles.value.splice(props.maxCount);
      }
      if (props.disabled) {
        showUpload.value = uploadedFiles.value.length;
      } else {
        if (uploadedFiles.value.length < props.maxCount) {
          showUpload.value = props.fileList.length + 1;
        } else {
          showUpload.value = props.maxCount;
        }
      }
    }
    function isImage(url) {
      const imageUrlReg = /\.(jpg|jpeg|png|gif)$/i;
      const base64Reg = /^data:image/;
      return imageUrlReg.test(url) || base64Reg.test(url);
    }
    function isPDF(url) {
      const pdfUrlReg = /\.pdf$/i;
      const base64Reg = /^data:application\/pdf/;
      return pdfUrlReg.test(url) || base64Reg.test(url);
    }
    function onDrop(e2, index) {
      var _a2;
      const files = (_a2 = e2.dataTransfer) == null ? void 0 : _a2.files;
      if (files == null ? void 0 : files.length) {
        const len = files.length;
        for (let n = 0; n < len; n++) {
          if (index + n <= props.maxCount) {
            uploadFile(files[n], index + n);
          } else {
            break;
          }
        }
        uploadInput.value[index].value = "";
      }
    }
    function onClick2(index) {
      uploadInput.value[index].click();
    }
    function onUpload(e2, index) {
      const files = e2.target.files;
      if (files == null ? void 0 : files.length) {
        const len = files.length;
        for (let n = 0; n < len; n++) {
          if (index + n < props.maxCount) {
            uploadFile(files[n], index + n);
          } else {
            break;
          }
        }
        uploadInput.value[index].value = "";
      }
    }
    const uploadFile = function(file, index) {
      if (!props.beforeUpload(file)) {
        nextTick(() => {
          onError(props.errorInfo);
        });
      } else {
        if (props.maxCount > showUpload.value) {
          showUpload.value++;
        }
        if (props.uploadMode === "base64") {
          uploading.value[index] = true;
          base64Upload(file, index);
        }
        if (props.uploadMode === "custom") {
          uploading.value[index] = true;
          customUpload(file, index);
        }
      }
    };
    function base64Upload(file, index) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadstart = function(e2) {
      };
      reader.onabort = function(e2) {
      };
      reader.onerror = function(e2) {
      };
      reader.onprogress = function(e2) {
        if (e2.loaded === e2.total) {
          uploading.value[index] = false;
        }
      };
      reader.onload = function(e2) {
        var _a2;
        uploadedFiles.value.push({
          name: file.name,
          url: (_a2 = e2.target) == null ? void 0 : _a2.result
        });
        emits("update:fileList", uploadedFiles.value);
        emits("change", uploadedFiles.value);
      };
      reader.onloadend = function(e2) {
      };
    }
    function customUpload(file, index) {
      props.customRequest(file).then((res) => {
        uploadedFiles.value.push(res);
        emits("update:fileList", uploadedFiles.value);
        emits("change", uploadedFiles.value);
      }).catch((err) => {
        if (props.maxCount > 1) {
          showUpload.value = uploadedFiles.value.length + 1;
        }
        onError(err);
      }).finally(() => {
        uploading.value[index] = false;
      });
    }
    function onRemove(index) {
      if (uploadedFiles.value.length < props.maxCount) {
        showUpload.value--;
      }
      const removeFile = uploadedFiles.value.splice(index, 1);
      emits("remove", removeFile);
      emits("update:fileList", uploadedFiles.value);
      emits("change", uploadedFiles.value);
    }
    const message = ref();
    function onError(content) {
      message.value.error(content);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(showUpload.value, (n) => {
          return openBlock(), createElementBlock("div", {
            class: "m-upload-item",
            key: n
          }, [
            createBaseVNode("div", _hoisted_2$2, [
              withDirectives(createBaseVNode("div", {
                class: normalizeClass(["m-upload-wrap", { "upload-disabled": _ctx.disabled }]),
                onDragenter: _cache[1] || (_cache[1] = withModifiers(() => {
                }, ["stop", "prevent"])),
                onDragover: _cache[2] || (_cache[2] = withModifiers(() => {
                }, ["stop", "prevent"])),
                onDrop: withModifiers(($event) => _ctx.disabled ? () => false : onDrop($event, n - 1), ["stop", "prevent"]),
                onClick: ($event) => _ctx.disabled ? () => false : onClick2(n - 1)
              }, [
                createBaseVNode("input", {
                  ref_for: true,
                  ref_key: "uploadInput",
                  ref: uploadInput,
                  type: "file",
                  onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                  }, ["stop"])),
                  accept: _ctx.accept,
                  multiple: _ctx.multiple,
                  onChange: ($event) => onUpload($event, n - 1),
                  style: { "display": "none" }
                }, null, 40, _hoisted_4),
                createBaseVNode("div", null, [
                  _hoisted_5,
                  createBaseVNode("p", _hoisted_6, [
                    renderSlot(_ctx.$slots, "default", {}, () => [
                      createTextVNode(toDisplayString(_ctx.tip), 1)
                    ], true)
                  ])
                ])
              ], 42, _hoisted_3$1), [
                [vShow, !uploading.value[n - 1] && !uploadedFiles.value[n - 1]]
              ]),
              withDirectives(createBaseVNode("div", _hoisted_7, [
                createVNode(unref(Spin), {
                  class: "u-spin",
                  tip: _ctx.uploadingTip,
                  size: "small",
                  indicator: "dynamic-circle"
                }, null, 8, ["tip"])
              ], 512), [
                [vShow, uploading.value[n - 1]]
              ]),
              uploadedFiles.value[n - 1] ? (openBlock(), createElementBlock("div", _hoisted_8, [
                isImage(uploadedFiles.value[n - 1].url) ? (openBlock(), createElementBlock("img", {
                  key: 0,
                  class: "u-image",
                  style: normalizeStyle(`object-fit: ${_ctx.fit};`),
                  src: uploadedFiles.value[n - 1].url,
                  alt: uploadedFiles.value[n - 1].name
                }, null, 12, _hoisted_9)) : isPDF(uploadedFiles.value[n - 1].url) ? (openBlock(), createElementBlock("svg", _hoisted_10, _hoisted_12)) : (openBlock(), createElementBlock("svg", _hoisted_13, _hoisted_16)),
                createBaseVNode("div", _hoisted_17, [
                  createBaseVNode("a", {
                    class: "m-icon",
                    title: "预览",
                    href: uploadedFiles.value[n - 1].url,
                    target: "_blank"
                  }, _hoisted_20, 8, _hoisted_18),
                  withDirectives(createBaseVNode("a", {
                    class: "m-icon",
                    title: "删除",
                    onClick: withModifiers(($event) => onRemove(n - 1), ["prevent", "stop"])
                  }, _hoisted_23, 8, _hoisted_21), [
                    [vShow, !_ctx.disabled]
                  ])
                ])
              ])) : createCommentVNode("", true)
            ])
          ]);
        }), 128)),
        createVNode(unref(Message), {
          ref_key: "message",
          ref: message,
          duration: 3e3,
          top: 30
        }, null, 512)
      ]);
    };
  }
});
var Upload = _export_sfc(_sfc_main$2, [["__scopeId", "data-v-dabd8435"]]);
Upload.install = (app) => {
  app.component(Upload.__name, Upload);
};
var _withScopeId = (n) => (pushScopeId("data-v-bdba4d3d"), n = n(), popScopeId(), n);
var _hoisted_1$1 = ["src", "poster", "width", "height", "autoplay", "controls", "loop", "muted", "preload", "onClickOnce"];
var _hoisted_2$1 = _withScopeId(() => createBaseVNode("svg", {
  class: "u-svg",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 34 34"
}, [
  createBaseVNode("path", { d: "M28.26,11.961L11.035,0.813C7.464-1.498,3,1.391,3,6.013v21.974c0,4.622,4.464,7.511,8.035,5.2L28.26,22.039\n          C31.913,19.675,31.913,14.325,28.26,11.961z" })
], -1));
var _hoisted_3 = [
  _hoisted_2$1
];
var _sfc_main$1 = defineComponent({
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
  setup(__props) {
    const props = __props;
    const veoPoster = ref(props.poster);
    const originPlay = ref(true);
    const hidden = ref(false);
    const veo = ref();
    function getPoster() {
      veo.value.currentTime = props.second;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = veo.value.videoWidth;
      canvas.height = veo.value.videoHeight;
      ctx == null ? void 0 : ctx.drawImage(veo.value, 0, 0, canvas.width, canvas.height);
      veoPoster.value = canvas.toDataURL("image/png");
    }
    function onPlay() {
      var _a2, _b;
      if (originPlay.value) {
        veo.value.currentTime = 0;
        originPlay.value = false;
      }
      if (props.autoplay) {
        (_a2 = veo.value) == null ? void 0 : _a2.pause();
      } else {
        hidden.value = true;
        (_b = veo.value) == null ? void 0 : _b.play();
      }
    }
    function onPause() {
      hidden.value = false;
    }
    function onPlaying() {
      hidden.value = true;
    }
    onMounted(() => {
      if (props.autoplay) {
        hidden.value = true;
        originPlay.value = false;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-video", { "u-video-hover": !hidden.value }]),
        style: normalizeStyle(`width: ${_ctx.width}px; height: ${_ctx.height}px;`)
      }, [
        createBaseVNode("video", mergeProps({
          ref_key: "veo",
          ref: veo,
          style: `object-fit: ${_ctx.fit};`,
          src: _ctx.src,
          poster: veoPoster.value,
          width: _ctx.width,
          height: _ctx.height,
          autoplay: _ctx.autoplay,
          controls: !originPlay.value && _ctx.controls,
          loop: _ctx.loop,
          muted: _ctx.autoplay || _ctx.muted,
          preload: _ctx.preload,
          crossorigin: "anonymous",
          onLoadeddata: _cache[0] || (_cache[0] = ($event) => _ctx.poster ? () => false : getPoster()),
          onPause: _cache[1] || (_cache[1] = ($event) => _ctx.showPlay ? onPause() : () => false),
          onPlaying: _cache[2] || (_cache[2] = ($event) => _ctx.showPlay ? onPlaying() : () => false),
          onClickOnce: withModifiers(onPlay, ["prevent"])
        }, _ctx.$attrs), " 您的浏览器不支持video标签。 ", 16, _hoisted_1$1),
        withDirectives(createBaseVNode("span", {
          class: normalizeClass(["m-icon-play", { "hidden": hidden.value }])
        }, _hoisted_3, 2), [
          [vShow, originPlay.value || _ctx.showPlay]
        ])
      ], 6);
    };
  }
});
var Video = _export_sfc(_sfc_main$1, [["__scopeId", "data-v-bdba4d3d"]]);
Video.install = (app) => {
  app.component(Video.__name, Video);
};
var _hoisted_1 = ["src", "alt", "onLoad"];
var _hoisted_2 = ["src", "alt", "onLoad"];
var _sfc_main = defineComponent({
  __name: "Waterfall",
  props: {
    images: { default: () => [] },
    columnCount: { default: 3 },
    columnGap: { default: 20 },
    width: { default: "100%" },
    backgroundColor: { default: "#F2F4F8" },
    mode: { default: "JS" }
  },
  setup(__props) {
    const props = __props;
    const totalWidth = computed(() => {
      if (typeof props.width === "number") {
        return props.width + "px";
      } else {
        return props.width;
      }
    });
    const imagesProperty = ref([]);
    const preColumnHeight = ref([]);
    const waterfall = ref();
    const imageWidth = ref();
    const height = computed(() => {
      return Math.max(...preColumnHeight.value) + props.columnGap;
    });
    const len = computed(() => {
      return props.images.length;
    });
    const loaded = ref(Array(len.value).fill(false));
    watch(
      () => props.images,
      (to) => {
        if (to.length && props.mode === "JS") {
          onPreload();
        }
      }
    );
    onMounted(() => {
      if (props.images.length && props.mode === "JS") {
        onPreload();
      }
    });
    function onLoaded(index) {
      loaded.value[index] = true;
    }
    function getPosition(i2, height2) {
      if (i2 < props.columnCount) {
        preColumnHeight.value[i2] = props.columnGap + height2;
        return {
          top: props.columnGap,
          left: (imageWidth.value + props.columnGap) * i2 + props.columnGap
        };
      } else {
        const top = Math.min(...preColumnHeight.value);
        var index = 0;
        for (let n = 0; n < preColumnHeight.value.length; n++) {
          if (preColumnHeight.value[n] === top) {
            index = n;
            break;
          }
        }
        preColumnHeight.value[index] = top + props.columnGap + height2;
        return {
          top: top + props.columnGap,
          left: (imageWidth.value + props.columnGap) * index + props.columnGap
        };
      }
    }
    function loadImage(url, n) {
      return new Promise((resolve) => {
        const image = new Image();
        image.src = url;
        image.onload = function() {
          var height2 = image.height / (image.width / imageWidth.value);
          imagesProperty.value[n] = {
            // 存储图片宽高和位置信息
            width: imageWidth.value,
            height: height2,
            ...getPosition(n, height2)
          };
          resolve("load");
        };
      });
    }
    async function onPreload() {
      imageWidth.value = (waterfall.value.offsetWidth - (props.columnCount + 1) * props.columnGap) / props.columnCount;
      const len2 = props.images.length;
      imagesProperty.value.splice(len2);
      for (let i2 = 0; i2 < len2; i2++) {
        await loadImage(props.images[i2].src, i2);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        _ctx.mode === "JS" ? (openBlock(), createElementBlock("div", mergeProps({ key: 0 }, _ctx.$attrs, {
          class: "m-waterfall-js",
          ref_key: "waterfall",
          ref: waterfall,
          style: `background-color: ${_ctx.backgroundColor}; width: ${totalWidth.value}; height: ${height.value}px;`
        }), [
          (openBlock(true), createElementBlock(Fragment, null, renderList(imagesProperty.value, (property, index) => {
            return openBlock(), createBlock(unref(Spin), {
              class: "m-img",
              style: normalizeStyle(`width: ${property.width}px; height: ${property.height}px; top: ${property && property.top}px; left: ${property && property.left}px;`),
              spinning: !loaded.value[index],
              size: "small",
              indicator: "dynamic-circle",
              key: index
            }, {
              default: withCtx(() => [
                createBaseVNode("img", {
                  class: "u-img",
                  src: _ctx.images[index].src,
                  alt: _ctx.images[index].title,
                  onLoad: ($event) => onLoaded(index)
                }, null, 40, _hoisted_1)
              ]),
              _: 2
            }, 1032, ["style", "spinning"]);
          }), 128))
        ], 16)) : createCommentVNode("", true),
        _ctx.mode === "CSS" ? (openBlock(), createElementBlock("div", mergeProps({ key: 1 }, _ctx.$attrs, {
          class: "m-waterfall-css",
          style: `background: ${_ctx.backgroundColor}; width: ${totalWidth.value}; padding: ${_ctx.columnGap}px; column-count: ${_ctx.columnCount}; column-gap: ${_ctx.columnGap}px;`
        }), [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.images, (item, index) => {
            return openBlock(), createBlock(unref(Spin), {
              style: normalizeStyle(`margin-bottom: ${_ctx.columnGap}px;`),
              spinning: !loaded.value[index],
              size: "small",
              indicator: "dynamic-circle",
              key: index
            }, {
              default: withCtx(() => [
                createBaseVNode("img", {
                  class: "u-img",
                  src: item.src,
                  alt: item.title,
                  onLoad: ($event) => onLoaded(index)
                }, null, 40, _hoisted_2)
              ]),
              _: 2
            }, 1032, ["style", "spinning"]);
          }), 128))
        ], 16)) : createCommentVNode("", true)
      ], 64);
    };
  }
});
var Waterfall = _export_sfc(_sfc_main, [["__scopeId", "data-v-e4db009c"]]);
Waterfall.install = (app) => {
  app.component(Waterfall.__name, Waterfall);
};
var components = [
  Breadcrumb,
  Button,
  Carousel,
  Cascader,
  Checkbox,
  Collapse,
  Countdown,
  DatePicker,
  Dialog,
  Divider,
  Empty,
  Image$1,
  InputNumber,
  Message,
  Modal,
  Notification,
  Pagination2,
  Progress,
  QRCode,
  Radio,
  Rate,
  Select,
  Slider,
  Spin,
  Steps,
  Swiper2,
  Switch,
  Table,
  Tabs,
  TextScroll,
  Timeline,
  Tooltip,
  Upload,
  Video,
  Waterfall
];
console.log("components:", components);
var install = (app) => {
  components.forEach((component) => app.component(component.__name, component));
};
var VueAmazingUI = {
  install
};
export {
  Breadcrumb,
  Button,
  Carousel,
  Cascader,
  Checkbox,
  Collapse,
  Countdown,
  DatePicker,
  Dialog,
  Divider,
  Empty,
  Image$1 as Image,
  InputNumber,
  Message,
  Modal,
  Notification,
  Pagination2 as Pagination,
  Progress,
  QRCode,
  Radio,
  Rate,
  Select,
  Slider,
  Spin,
  Steps,
  Swiper2 as Swiper,
  Switch,
  Table,
  Tabs,
  TextScroll,
  Timeline,
  Tooltip,
  Upload,
  Video,
  Waterfall,
  add2 as add,
  cancelAnimationFrame$1 as cancelAnimationFrame,
  cancelRaf,
  dateFormat,
  debounce,
  VueAmazingUI as default,
  downloadFile,
  rafTimeout,
  requestAnimationFrame$1 as requestAnimationFrame,
  throttle
};
//# sourceMappingURL=vue-amazing-ui.js.map
