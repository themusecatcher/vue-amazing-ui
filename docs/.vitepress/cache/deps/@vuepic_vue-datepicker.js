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
import "./chunk-DFKQJ226.js";

// node_modules/.pnpm/@babel+runtime@7.21.5/node_modules/@babel/runtime/helpers/esm/typeof.js
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
  h: function h(date, token) {
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
  h: function h2(date, token, localize2) {
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

// node_modules/.pnpm/@babel+runtime@7.21.5/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++)
    arr2[i2] = arr[i2];
  return arr2;
}

// node_modules/.pnpm/@babel+runtime@7.21.5/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
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

// node_modules/.pnpm/@babel+runtime@7.21.5/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
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

// node_modules/.pnpm/@babel+runtime@7.21.5/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

// node_modules/.pnpm/@babel+runtime@7.21.5/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}

// node_modules/.pnpm/@babel+runtime@7.21.5/node_modules/@babel/runtime/helpers/esm/inherits.js
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

// node_modules/.pnpm/@babel+runtime@7.21.5/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}

// node_modules/.pnpm/@babel+runtime@7.21.5/node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
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

// node_modules/.pnpm/@babel+runtime@7.21.5/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

// node_modules/.pnpm/@babel+runtime@7.21.5/node_modules/@babel/runtime/helpers/esm/createSuper.js
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

// node_modules/.pnpm/@babel+runtime@7.21.5/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// node_modules/.pnpm/@babel+runtime@7.21.5/node_modules/@babel/runtime/helpers/esm/toPrimitive.js
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

// node_modules/.pnpm/@babel+runtime@7.21.5/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

// node_modules/.pnpm/@babel+runtime@7.21.5/node_modules/@babel/runtime/helpers/esm/createClass.js
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

// node_modules/.pnpm/@babel+runtime@7.21.5/node_modules/@babel/runtime/helpers/esm/defineProperty.js
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
export {
  Xn as default
};
//# sourceMappingURL=@vuepic_vue-datepicker.js.map
