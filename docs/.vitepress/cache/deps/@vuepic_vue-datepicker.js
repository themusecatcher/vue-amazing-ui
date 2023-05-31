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
import "./chunk-RSJERJUL.js";

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
        e: function e2(_e) {
          throw _e;
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

// node_modules/.pnpm/@vuepic+vue-datepicker@5.1.2_vue@3.3.4/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
function Wt() {
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
function ga() {
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
function Mn() {
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
function Tn() {
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
        d: "M16 1.333c-8.095 0-14.667 6.572-14.667 14.667s6.572 14.667 14.667 14.667c8.095 0 14.667-6.572 14.667-14.667s-6.572-14.667-14.667-14.667zM16 4c6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.623 0-12-5.377-12-12s5.377-12 12-12z"
      }),
      createBaseVNode("path", {
        d: "M14.667 8v8c0 0.505 0.285 0.967 0.737 1.193l5.333 2.667c0.658 0.329 1.46 0.062 1.789-0.596s0.062-1.46-0.596-1.789l-4.596-2.298c0 0 0-7.176 0-7.176 0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      })
    ]
  );
}
function Kn() {
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
function jn() {
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
var An = (e2, n, a3, t2, o) => {
  const m3 = parse(e2, n.slice(0, e2.length), /* @__PURE__ */ new Date());
  return isValid(m3) && isDate(m3) ? t2 || o ? m3 : set(m3, {
    hours: +a3.hours,
    minutes: +(a3 == null ? void 0 : a3.minutes),
    seconds: +(a3 == null ? void 0 : a3.seconds),
    milliseconds: 0
  }) : null;
};
var ha = (e2, n, a3, t2, o) => {
  const m3 = Array.isArray(a3) ? a3[0] : a3;
  if (typeof n == "string")
    return An(e2, n, m3, t2, o);
  if (Array.isArray(n)) {
    let g = null;
    for (const N of n)
      if (g = An(e2, N, m3, t2, o), g)
        break;
    return g;
  }
  return typeof n == "function" ? n(e2) : null;
};
var M3 = (e2) => e2 ? new Date(e2) : /* @__PURE__ */ new Date();
var pa = (e2, n) => {
  if (n) {
    const t2 = (e2.getMonth() + 1).toString().padStart(2, "0"), o = e2.getDate().toString().padStart(2, "0"), m3 = e2.getHours().toString().padStart(2, "0"), g = e2.getMinutes().toString().padStart(2, "0");
    return `${e2.getFullYear()}-${t2}-${o}T${m3}:${g}:00.000Z`;
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
var Ke = (e2) => {
  let n = M3(JSON.parse(JSON.stringify(e2)));
  return n = setHours(n, 0), n = setMinutes(n, 0), n = setSeconds(n, 0), n = setMilliseconds(n, 0), n;
};
var Ue = (e2, n, a3, t2) => {
  let o = e2 ? M3(e2) : M3();
  return (n || n === 0) && (o = setHours(o, +n)), (a3 || a3 === 0) && (o = setMinutes(o, +a3)), (t2 || t2 === 0) && (o = setSeconds(o, +t2)), setMilliseconds(o, 0);
};
var Ie = (e2, n) => !e2 || !n ? false : isBefore(Ke(e2), Ke(n));
var ge = (e2, n) => !e2 || !n ? false : isEqual(Ke(e2), Ke(n));
var Ve = (e2, n) => !e2 || !n ? false : isAfter(Ke(e2), Ke(n));
var Gn = (e2, n, a3) => e2 && e2[0] && e2[1] ? Ve(a3, e2[0]) && Ie(a3, e2[1]) : e2 && e2[0] && n ? Ve(a3, e2[0]) && Ie(a3, n) || Ie(a3, e2[0]) && Ve(a3, n) : false;
var Dt = (e2) => {
  const n = set(new Date(e2), { date: 1 });
  return Ke(n);
};
var qt = (e2, n, a3) => n && (a3 || a3 === 0) ? Object.fromEntries(
  ["hours", "minutes", "seconds"].map((t2) => t2 === n ? [t2, a3] : [t2, isNaN(+e2[t2]) ? void 0 : +e2[t2]])
) : {
  hours: isNaN(+e2.hours) ? void 0 : +e2.hours,
  minutes: isNaN(+e2.minutes) ? void 0 : +e2.minutes,
  seconds: isNaN(+e2.seconds) ? void 0 : +e2.seconds
};
var $t = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Zn = () => {
  const e2 = (t2) => {
    $t.menuFocused = t2;
  }, n = (t2) => {
    $t.shiftKeyInMenu !== t2 && ($t.shiftKeyInMenu = t2);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: $t.shiftKeyInMenu, menuFocused: $t.menuFocused })),
    setMenuFocused: e2,
    setShiftKey: n
  };
};
function pn(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
var qn = { exports: {} };
(function(e2) {
  function n(a3) {
    return a3 && a3.__esModule ? a3 : {
      default: a3
    };
  }
  e2.exports = n, e2.exports.__esModule = true, e2.exports.default = e2.exports;
})(qn);
var ka = qn.exports;
var un = { exports: {} };
(function(e2, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a3;
  function a3(t2) {
    if (t2 === null || t2 === true || t2 === false)
      return NaN;
    var o = Number(t2);
    return isNaN(o) ? o : o < 0 ? Math.ceil(o) : Math.floor(o);
  }
  e2.exports = n.default;
})(un, un.exports);
var wa = un.exports;
var ba = pn(wa);
var dn = { exports: {} };
(function(e2, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a3;
  function a3(t2) {
    var o = new Date(Date.UTC(t2.getFullYear(), t2.getMonth(), t2.getDate(), t2.getHours(), t2.getMinutes(), t2.getSeconds(), t2.getMilliseconds()));
    return o.setUTCFullYear(t2.getFullYear()), t2.getTime() - o.getTime();
  }
  e2.exports = n.default;
})(dn, dn.exports);
var Da = dn.exports;
var Sn = pn(Da);
function $a(e2, n) {
  var a3 = Sa(n);
  return a3.formatToParts ? Ta(a3, e2) : Aa(a3, e2);
}
var Ma = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function Ta(e2, n) {
  try {
    for (var a3 = e2.formatToParts(n), t2 = [], o = 0; o < a3.length; o++) {
      var m3 = Ma[a3[o].type];
      m3 >= 0 && (t2[m3] = parseInt(a3[o].value, 10));
    }
    return t2;
  } catch (g) {
    if (g instanceof RangeError)
      return [NaN];
    throw g;
  }
}
function Aa(e2, n) {
  var a3 = e2.format(n).replace(/\u200E/g, ""), t2 = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(a3);
  return [t2[3], t2[1], t2[2], t2[4], t2[5], t2[6]];
}
var Xt = {};
function Sa(e2) {
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
function kn(e2, n, a3, t2, o, m3, g) {
  var N = /* @__PURE__ */ new Date(0);
  return N.setUTCFullYear(e2, n, a3), N.setUTCHours(t2, o, m3, g), N;
}
var Pn = 36e5;
var Pa = 6e4;
var Jt = {
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-]\d{2}):?(\d{2})$/
};
function wn(e2, n, a3) {
  var t2, o;
  if (!e2 || (t2 = Jt.timezoneZ.exec(e2), t2))
    return 0;
  var m3;
  if (t2 = Jt.timezoneHH.exec(e2), t2)
    return m3 = parseInt(t2[1], 10), Cn(m3) ? -(m3 * Pn) : NaN;
  if (t2 = Jt.timezoneHHMM.exec(e2), t2) {
    m3 = parseInt(t2[1], 10);
    var g = parseInt(t2[2], 10);
    return Cn(m3, g) ? (o = Math.abs(m3) * Pn + g * Pa, m3 > 0 ? -o : o) : NaN;
  }
  if (Na(e2)) {
    n = new Date(n || Date.now());
    var N = a3 ? n : Ca(n), F = cn(N, e2), C = a3 ? F : _a(n, F, e2);
    return -C;
  }
  return NaN;
}
function Ca(e2) {
  return kn(
    e2.getFullYear(),
    e2.getMonth(),
    e2.getDate(),
    e2.getHours(),
    e2.getMinutes(),
    e2.getSeconds(),
    e2.getMilliseconds()
  );
}
function cn(e2, n) {
  var a3 = $a(e2, n), t2 = kn(
    a3[0],
    a3[1] - 1,
    a3[2],
    a3[3] % 24,
    a3[4],
    a3[5],
    0
  ).getTime(), o = e2.getTime(), m3 = o % 1e3;
  return o -= m3 >= 0 ? m3 : 1e3 + m3, t2 - o;
}
function _a(e2, n, a3) {
  var t2 = e2.getTime(), o = t2 - n, m3 = cn(new Date(o), a3);
  if (n === m3)
    return n;
  o -= m3 - n;
  var g = cn(new Date(o), a3);
  return m3 === g ? m3 : Math.max(m3, g);
}
function Cn(e2, n) {
  return -23 <= e2 && e2 <= 23 && (n == null || 0 <= n && n <= 59);
}
var _n = {};
function Na(e2) {
  if (_n[e2])
    return true;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e2 }), _n[e2] = true, true;
  } catch {
    return false;
  }
}
var Ra = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
var Xn = Ra;
var Qt = 36e5;
var Nn = 6e4;
var Oa = 2;
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
  timeZone: Xn
};
function fn(e2, n) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e2 === null)
    return /* @__PURE__ */ new Date(NaN);
  var a3 = n || {}, t2 = a3.additionalDigits == null ? Oa : ba(a3.additionalDigits);
  if (t2 !== 2 && t2 !== 1 && t2 !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e2 instanceof Date || typeof e2 == "object" && Object.prototype.toString.call(e2) === "[object Date]")
    return new Date(e2.getTime());
  if (typeof e2 == "number" || Object.prototype.toString.call(e2) === "[object Number]")
    return new Date(e2);
  if (!(typeof e2 == "string" || Object.prototype.toString.call(e2) === "[object String]"))
    return /* @__PURE__ */ new Date(NaN);
  var o = Ia(e2), m3 = Ba(o.date, t2), g = m3.year, N = m3.restDateString, F = Ya(N, g);
  if (isNaN(F))
    return /* @__PURE__ */ new Date(NaN);
  if (F) {
    var C = F.getTime(), W = 0, _;
    if (o.time && (W = Va(o.time), isNaN(W)))
      return /* @__PURE__ */ new Date(NaN);
    if (o.timeZone || a3.timeZone) {
      if (_ = wn(o.timeZone || a3.timeZone, new Date(C + W)), isNaN(_))
        return /* @__PURE__ */ new Date(NaN);
    } else
      _ = Sn(new Date(C + W)), _ = Sn(new Date(C + W + _));
    return new Date(C + W + _);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function Ia(e2) {
  var n = {}, a3 = Ye.dateTimePattern.exec(e2), t2;
  if (a3 ? (n.date = a3[1], t2 = a3[3]) : (a3 = Ye.datePattern.exec(e2), a3 ? (n.date = a3[1], t2 = a3[2]) : (n.date = null, t2 = e2)), t2) {
    var o = Ye.timeZone.exec(t2);
    o ? (n.time = t2.replace(o[1], ""), n.timeZone = o[1].trim()) : n.time = t2;
  }
  return n;
}
function Ba(e2, n) {
  var a3 = Ye.YYY[n], t2 = Ye.YYYYY[n], o;
  if (o = Ye.YYYY.exec(e2) || t2.exec(e2), o) {
    var m3 = o[1];
    return {
      year: parseInt(m3, 10),
      restDateString: e2.slice(m3.length)
    };
  }
  if (o = Ye.YY.exec(e2) || a3.exec(e2), o) {
    var g = o[1];
    return {
      year: parseInt(g, 10) * 100,
      restDateString: e2.slice(g.length)
    };
  }
  return {
    year: null
  };
}
function Ya(e2, n) {
  if (n === null)
    return null;
  var a3, t2, o, m3;
  if (e2.length === 0)
    return t2 = /* @__PURE__ */ new Date(0), t2.setUTCFullYear(n), t2;
  if (a3 = Ye.MM.exec(e2), a3)
    return t2 = /* @__PURE__ */ new Date(0), o = parseInt(a3[1], 10) - 1, On(n, o) ? (t2.setUTCFullYear(n, o), t2) : /* @__PURE__ */ new Date(NaN);
  if (a3 = Ye.DDD.exec(e2), a3) {
    t2 = /* @__PURE__ */ new Date(0);
    var g = parseInt(a3[1], 10);
    return Fa(n, g) ? (t2.setUTCFullYear(n, 0, g), t2) : /* @__PURE__ */ new Date(NaN);
  }
  if (a3 = Ye.MMDD.exec(e2), a3) {
    t2 = /* @__PURE__ */ new Date(0), o = parseInt(a3[1], 10) - 1;
    var N = parseInt(a3[2], 10);
    return On(n, o, N) ? (t2.setUTCFullYear(n, o, N), t2) : /* @__PURE__ */ new Date(NaN);
  }
  if (a3 = Ye.Www.exec(e2), a3)
    return m3 = parseInt(a3[1], 10) - 1, In(n, m3) ? Rn(n, m3) : /* @__PURE__ */ new Date(NaN);
  if (a3 = Ye.WwwD.exec(e2), a3) {
    m3 = parseInt(a3[1], 10) - 1;
    var F = parseInt(a3[2], 10) - 1;
    return In(n, m3, F) ? Rn(n, m3, F) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function Va(e2) {
  var n, a3, t2;
  if (n = Ye.HH.exec(e2), n)
    return a3 = parseFloat(n[1].replace(",", ".")), en(a3) ? a3 % 24 * Qt : NaN;
  if (n = Ye.HHMM.exec(e2), n)
    return a3 = parseInt(n[1], 10), t2 = parseFloat(n[2].replace(",", ".")), en(a3, t2) ? a3 % 24 * Qt + t2 * Nn : NaN;
  if (n = Ye.HHMMSS.exec(e2), n) {
    a3 = parseInt(n[1], 10), t2 = parseInt(n[2], 10);
    var o = parseFloat(n[3].replace(",", "."));
    return en(a3, t2, o) ? a3 % 24 * Qt + t2 * Nn + o * 1e3 : NaN;
  }
  return null;
}
function Rn(e2, n, a3) {
  n = n || 0, a3 = a3 || 0;
  var t2 = /* @__PURE__ */ new Date(0);
  t2.setUTCFullYear(e2, 0, 4);
  var o = t2.getUTCDay() || 7, m3 = n * 7 + a3 + 1 - o;
  return t2.setUTCDate(t2.getUTCDate() + m3), t2;
}
var Ea = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var La = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Jn(e2) {
  return e2 % 400 === 0 || e2 % 4 === 0 && e2 % 100 !== 0;
}
function On(e2, n, a3) {
  if (n < 0 || n > 11)
    return false;
  if (a3 != null) {
    if (a3 < 1)
      return false;
    var t2 = Jn(e2);
    if (t2 && a3 > La[n] || !t2 && a3 > Ea[n])
      return false;
  }
  return true;
}
function Fa(e2, n) {
  if (n < 1)
    return false;
  var a3 = Jn(e2);
  return !(a3 && n > 366 || !a3 && n > 365);
}
function In(e2, n, a3) {
  return !(n < 0 || n > 52 || a3 != null && (a3 < 0 || a3 > 6));
}
function en(e2, n, a3) {
  return !(e2 != null && (e2 < 0 || e2 >= 25) || n != null && (n < 0 || n >= 60) || a3 != null && (a3 < 0 || a3 >= 60));
}
var mn = { exports: {} };
var vn = { exports: {} };
(function(e2, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a3;
  function a3(t2, o) {
    if (t2 == null)
      throw new TypeError("assign requires that input parameter not be null or undefined");
    for (var m3 in o)
      Object.prototype.hasOwnProperty.call(o, m3) && (t2[m3] = o[m3]);
    return t2;
  }
  e2.exports = n.default;
})(vn, vn.exports);
var Ua = vn.exports;
(function(e2, n) {
  var a3 = ka.default;
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = o;
  var t2 = a3(Ua);
  function o(m3) {
    return (0, t2.default)({}, m3);
  }
  e2.exports = n.default;
})(mn, mn.exports);
var Wa = mn.exports;
var Ha = pn(Wa);
function xa(e2, n, a3) {
  var t2 = fn(e2, a3), o = wn(n, t2, true), m3 = new Date(t2.getTime() - o), g = /* @__PURE__ */ new Date(0);
  return g.setFullYear(m3.getUTCFullYear(), m3.getUTCMonth(), m3.getUTCDate()), g.setHours(m3.getUTCHours(), m3.getUTCMinutes(), m3.getUTCSeconds(), m3.getUTCMilliseconds()), g;
}
function za(e2, n, a3) {
  if (typeof e2 == "string" && !e2.match(Xn)) {
    var t2 = Ha(a3);
    return t2.timeZone = n, fn(e2, t2);
  }
  var o = fn(e2, a3), m3 = kn(
    o.getFullYear(),
    o.getMonth(),
    o.getDate(),
    o.getHours(),
    o.getMinutes(),
    o.getSeconds(),
    o.getMilliseconds()
  ).getTime(), g = wn(n, new Date(m3));
  return new Date(m3 + g);
}
var Ka = (e2, n = 3) => {
  const a3 = [];
  for (let t2 = 0; t2 < e2.length; t2 += n)
    a3.push([e2[t2], e2[t2 + 1], e2[t2 + 2]]);
  return a3;
};
var ja = (e2, n) => {
  const a3 = [1, 2, 3, 4, 5, 6, 7].map((m3) => new Intl.DateTimeFormat(e2, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${m3}T00:00:00+00:00`)).slice(0, 2)), t2 = a3.slice(0, n), o = a3.slice(n + 1, a3.length);
  return [a3[n]].concat(...o).concat(...t2);
};
var Ga = (e2, n) => {
  const a3 = [];
  for (let t2 = +e2[0]; t2 <= +e2[1]; t2++)
    a3.push({ value: +t2, text: `${t2}` });
  return n ? a3.reverse() : a3;
};
var Za = (e2, n) => {
  const a3 = new Intl.DateTimeFormat(e2, { month: n, timeZone: "UTC" });
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((o) => {
    const m3 = o < 10 ? `0${o}` : o;
    return /* @__PURE__ */ new Date(`2017-${m3}-01T00:00:00+00:00`);
  }).map((o, m3) => {
    let g = a3.format(o);
    return {
      text: g.charAt(0).toUpperCase() + g.substring(1),
      value: m3
    };
  });
};
var qa = (e2) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e2];
var $e = (e2) => {
  const n = unref(e2);
  return n != null && n.$el ? n == null ? void 0 : n.$el : n;
};
var Xa = (e2) => Object.assign({ type: "dot" }, e2);
var Qn = (e2) => Array.isArray(e2) ? !!e2[0] && !!e2[1] : false;
var Ut = {
  prop: (e2) => `"${e2}" prop must be enabled!`,
  dateArr: (e2) => `You need to use array as "model-value" binding in order to support "${e2}"`
};
var Se = (e2) => e2;
var Bn = (e2) => e2 === 0 ? e2 : !e2 || isNaN(+e2) ? null : +e2;
var Yn = (e2) => Object.assign(
  {
    menuAppear: "",
    open: "dp-slide-down",
    close: "dp-slide-up",
    next: "calendar-next",
    previous: "calendar-prev",
    vNext: "dp-slide-up",
    vPrevious: "dp-slide-down"
  },
  e2
);
var Ja = (e2) => Object.assign(
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
var Qa = (e2) => e2 === null ? 0 : typeof e2 == "boolean" ? e2 ? 2 : 0 : +e2 >= 2 ? +e2 : 2;
var er = (e2, n, a3) => e2 || (typeof a3 == "string" ? a3 : n);
var tr = (e2) => typeof e2 == "boolean" ? e2 ? Yn({}) : false : Yn(e2);
var nr = () => ({
  enterSubmit: true,
  tabSubmit: true,
  openMenu: true,
  rangeSeparator: " - "
});
var ar = (e2) => Object.assign({ months: [], years: [], times: { hours: [], minutes: [], seconds: [] } }, e2);
var rr = (e2) => Object.assign({ showSelect: true, showCancel: true, showNow: false, showPreview: true }, e2);
var Le = (e2) => {
  const n = () => {
    if (e2.partialRange)
      return null;
    throw new Error(Ut.prop("partial-range"));
  }, a3 = computed(() => ({
    ariaLabels: Ja(e2.ariaLabels),
    textInputOptions: Object.assign(nr(), e2.textInputOptions),
    multiCalendars: Qa(e2.multiCalendars),
    previewFormat: er(e2.previewFormat, e2.format, m3()),
    filters: ar(e2.filters),
    transitions: tr(e2.transitions),
    startTime: d3(),
    actionRow: rr(e2.actionRow)
  })), t2 = (u2) => {
    if (e2.range)
      return u2();
    throw new Error(Ut.prop("range"));
  }, o = () => {
    const u2 = e2.enableSeconds ? ":ss" : "";
    return e2.is24 ? `HH:mm${u2}` : `hh:mm${u2} aa`;
  }, m3 = () => e2.format ? e2.format : e2.monthPicker ? "MM/yyyy" : e2.timePicker ? o() : e2.weekPicker ? "MM/dd/yyyy" : e2.yearPicker ? "yyyy" : e2.enableTimePicker ? `MM/dd/yyyy, ${o()}` : "MM/dd/yyyy", g = (u2, l) => {
    if (typeof e2.format == "function")
      return e2.format(u2);
    const r = l || m3(), h3 = e2.formatLocale ? { locale: e2.formatLocale } : void 0;
    return Array.isArray(u2) ? `${format(u2[0], r, h3)} ${e2.modelAuto && !u2[1] ? "" : a3.value.textInputOptions.rangeSeparator || "-"} ${u2[1] ? format(u2[1], r, h3) : ""}` : format(u2, r, h3);
  }, N = (u2) => e2.timezone ? xa(u2, e2.timezone) : u2, F = (u2) => e2.timezone ? za(u2, e2.timezone) : u2, C = computed(() => (u2) => {
    var l;
    return (l = e2.hideNavigation) == null ? void 0 : l.includes(u2);
  }), W = (u2) => {
    const l = e2.maxDate ? Ve(N(u2), N(M3(e2.maxDate))) : false, r = e2.minDate ? Ie(N(u2), N(M3(e2.minDate))) : false, h3 = V(u2, e2.disabledDates), A = a3.value.filters.months.map((le) => +le).includes(getMonth(u2)), c2 = e2.disabledWeekDays.length ? e2.disabledWeekDays.some((le) => +le === getDay(u2)) : false, P = e2.allowedDates.length ? !e2.allowedDates.some((le) => ge(N(M3(le)), N(u2))) : false, f = getYear(u2), E2 = f < +e2.yearRange[0] || f > +e2.yearRange[1];
    return !(l || r || h3 || A || E2 || c2 || P);
  }, _ = (u2) => {
    const l = {
      hours: getHours(M3()),
      minutes: getMinutes(M3()),
      seconds: e2.enableSeconds ? getSeconds(M3()) : 0
    };
    return Object.assign(l, u2);
  }, d3 = () => e2.range ? e2.startTime && Array.isArray(e2.startTime) ? [_(e2.startTime[0]), _(e2.startTime[1])] : null : e2.startTime && !Array.isArray(e2.startTime) ? _(e2.startTime) : null, $ = (u2) => !W(u2), Q2 = (u2) => Array.isArray(u2) ? isValid(u2[0]) && (u2[1] ? isValid(u2[1]) : true) : u2 ? isValid(u2) : false, x2 = (u2) => u2 instanceof Date ? u2 : parseISO(u2), z2 = (u2) => {
    const l = startOfWeek(N(u2), { weekStartsOn: +e2.weekStart }), r = endOfWeek(N(u2), { weekStartsOn: +e2.weekStart });
    return [l, r];
  }, V = (u2, l) => Array.isArray(l) ? l.some((r) => ge(N(M3(r)), N(u2))) : l(M3(JSON.parse(JSON.stringify(u2)))), U = (u2, l, r) => {
    let h3 = u2 ? M3(u2) : M3();
    return (l || l === 0) && (h3 = setMonth(h3, l)), r && (h3 = setYear(h3, r)), h3;
  }, O2 = (u2) => set(M3(), { hours: getHours(u2), minutes: getMinutes(u2), seconds: getSeconds(u2) }), Z = (u2) => set(M3(), {
    hours: +u2.hours || 0,
    minutes: +u2.minutes || 0,
    seconds: +u2.seconds || 0
  }), K2 = (u2, l, r, h3) => {
    if (!u2)
      return true;
    if (h3) {
      const w2 = r === "max" ? isBefore(u2, l) : isAfter(u2, l), A = { seconds: 0, milliseconds: 0 };
      return w2 || isEqual(set(u2, A), set(l, A));
    }
    return r === "max" ? u2.getTime() <= l.getTime() : u2.getTime() >= l.getTime();
  }, te = () => !e2.enableTimePicker || e2.monthPicker || e2.yearPicker || e2.ignoreTimeValidation, re = (u2) => Array.isArray(u2) ? [u2[0] ? O2(u2[0]) : null, u2[1] ? O2(u2[1]) : null] : O2(u2), ue = (u2) => {
    const l = e2.maxTime ? Z(e2.maxTime) : M3(e2.maxDate);
    return Array.isArray(u2) ? K2(u2[0], l, "max", !!e2.maxDate) && K2(u2[1], l, "max", !!e2.maxDate) : K2(u2, l, "max", !!e2.maxDate);
  }, ce = (u2, l) => {
    const r = e2.minTime ? Z(e2.minTime) : M3(e2.minDate);
    return Array.isArray(u2) ? K2(u2[0], r, "min", !!e2.minDate) && K2(u2[1], r, "min", !!e2.minDate) && l : K2(u2, r, "min", !!e2.minDate) && l;
  }, fe = (u2) => {
    let l = true;
    if (!u2 || te())
      return true;
    const r = !e2.minDate && !e2.maxDate ? re(u2) : u2;
    return (e2.maxTime || e2.maxDate) && (l = ue(Se(r))), (e2.minTime || e2.minDate) && (l = ce(Se(r), l)), l;
  }, R2 = (u2, l) => {
    const r = M3(JSON.parse(JSON.stringify(u2))), h3 = [];
    for (let w2 = 0; w2 < 7; w2++) {
      const A = addDays(r, w2), c2 = getMonth(A) !== l;
      h3.push({
        text: e2.hideOffsetDates && c2 ? "" : A.getDate(),
        value: A,
        current: !c2,
        classData: {}
      });
    }
    return h3;
  }, b2 = (u2, l) => {
    const r = [], h3 = M3(N(new Date(l, u2))), w2 = M3(N(new Date(l, u2 + 1, 0))), A = e2.weekStart, c2 = startOfWeek(h3, { weekStartsOn: A }), P = (f) => {
      const E2 = R2(f, u2);
      if (r.push({ days: E2 }), !r[r.length - 1].days.some(
        (le) => ge(Ke(le.value), Ke(w2))
      )) {
        const le = addDays(f, 7);
        P(le);
      }
    };
    if (P(c2), e2.sixWeeks && r.length < 6) {
      const f = 6 - r.length, E2 = (h3.getDay() + 7 - A) % 7, be = 6 - (w2.getDay() + 7 - A) % 7, [He, ne] = (() => {
        switch (e2.sixWeeks === true ? "append" : e2.sixWeeks) {
          case "prepend":
            return [true, false];
          case "center":
            return [E2 == 0, true];
          case "fair":
            return [E2 == 0 || be > E2, true];
          default:
          case "append":
            return [false, false];
        }
      })();
      for (let Fe = 1; Fe <= f; Fe++)
        if (ne ? !!(Fe % 2) == He : He) {
          const Te = r[0].days[0], xe = R2(addDays(Te.value, -7), getMonth(h3));
          r.unshift({ days: xe });
        } else {
          const Te = r[r.length - 1], xe = Te.days[Te.days.length - 1], lt = R2(addDays(xe.value, 1), getMonth(h3));
          r.push({ days: lt });
        }
    }
    return r;
  }, v = (u2, l, r) => [set(M3(u2), { date: 1 }), set(M3(), { month: l, year: r, date: 1 })], Y2 = (u2, l) => Ie(...v(e2.minDate, u2, l)) || ge(...v(e2.minDate, u2, l)), I2 = (u2, l) => Ve(...v(e2.maxDate, u2, l)) || ge(...v(e2.maxDate, u2, l)), T2 = (u2, l, r) => {
    let h3 = false;
    return e2.maxDate && r && I2(u2, l) && (h3 = true), e2.minDate && !r && Y2(u2, l) && (h3 = true), h3;
  };
  return {
    checkPartialRangeValue: n,
    checkRangeEnabled: t2,
    getZonedDate: N,
    getZonedToUtc: F,
    formatDate: g,
    getDefaultPattern: m3,
    validateDate: W,
    getDefaultStartTime: d3,
    isDisabled: $,
    isValidDate: Q2,
    sanitizeDate: x2,
    getWeekFromDate: z2,
    matchDate: V,
    setDateMonthOrYear: U,
    isValidTime: fe,
    getCalendarDays: b2,
    validateMonthYearInRange: (u2, l, r, h3) => {
      let w2 = false;
      return h3 ? e2.minDate && e2.maxDate ? w2 = T2(u2, l, r) : (e2.minDate && Y2(u2, l) || e2.maxDate && I2(u2, l)) && (w2 = true) : w2 = true, w2;
    },
    validateMaxDate: I2,
    validateMinDate: Y2,
    assignDefaultTime: _,
    defaults: a3,
    hideNavigationButtons: C
  };
};
var ke = reactive({
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
var tn = ref(null);
var Bt = ref(false);
var nn = ref(false);
var an = ref(false);
var rn = ref(false);
var Be = ref(0);
var Ne = ref(0);
var at = () => {
  const e2 = computed(() => Bt.value ? [...ke.selectionGrid, ke.actionRow].filter((V) => V.length) : nn.value ? [
    ...ke.timePicker[0],
    ...ke.timePicker[1],
    rn.value ? [] : [tn.value],
    ke.actionRow
  ].filter((V) => V.length) : an.value ? [...ke.monthPicker, ke.actionRow] : [ke.monthYear, ...ke.calendar, ke.time, ke.actionRow].filter((V) => V.length)), n = (V) => {
    Be.value = V ? Be.value + 1 : Be.value - 1;
    let U = null;
    e2.value[Ne.value] && (U = e2.value[Ne.value][Be.value]), U || (Be.value = V ? Be.value - 1 : Be.value + 1);
  }, a3 = (V) => {
    if (Ne.value === 0 && !V || Ne.value === e2.value.length && V)
      return;
    Ne.value = V ? Ne.value + 1 : Ne.value - 1, e2.value[Ne.value] ? e2.value[Ne.value] && !e2.value[Ne.value][Be.value] && Be.value !== 0 && (Be.value = e2.value[Ne.value].length - 1) : Ne.value = V ? Ne.value - 1 : Ne.value + 1;
  }, t2 = (V) => {
    let U = null;
    e2.value[Ne.value] && (U = e2.value[Ne.value][Be.value]), U ? U.focus({ preventScroll: !Bt.value }) : Be.value = V ? Be.value - 1 : Be.value + 1;
  }, o = () => {
    n(true), t2(true);
  }, m3 = () => {
    n(false), t2(false);
  }, g = () => {
    a3(false), t2(true);
  }, N = () => {
    a3(true), t2(true);
  }, F = (V, U) => {
    ke[U] = V;
  }, C = (V, U) => {
    ke[U] = V;
  }, W = () => {
    Be.value = 0, Ne.value = 0;
  };
  return {
    buildMatrix: F,
    buildMultiLevelMatrix: C,
    setTimePickerBackRef: (V) => {
      tn.value = V;
    },
    setSelectionGrid: (V) => {
      Bt.value = V, W(), V || (ke.selectionGrid = []);
    },
    setTimePicker: (V, U = false) => {
      nn.value = V, rn.value = U, W(), V || (ke.timePicker[0] = [], ke.timePicker[1] = []);
    },
    setTimePickerElements: (V, U = 0) => {
      ke.timePicker[U] = V;
    },
    arrowRight: o,
    arrowLeft: m3,
    arrowUp: g,
    arrowDown: N,
    clearArrowNav: () => {
      ke.monthYear = [], ke.calendar = [], ke.time = [], ke.actionRow = [], ke.selectionGrid = [], ke.timePicker[0] = [], ke.timePicker[1] = [], Bt.value = false, nn.value = false, rn.value = false, an.value = false, W(), tn.value = null;
    },
    setMonthPicker: (V) => {
      an.value = V, W();
    },
    refSets: ke
    // exposed for testing
  };
};
var Vn = (e2) => Array.isArray(e2);
var it = (e2) => Array.isArray(e2);
var En = (e2) => Array.isArray(e2) && e2.length === 2;
var lr = (e2, n, a3, t2, o) => {
  const {
    getDefaultStartTime: m3,
    isDisabled: g,
    sanitizeDate: N,
    getWeekFromDate: F,
    setDateMonthOrYear: C,
    validateMonthYearInRange: W,
    defaults: _
  } = Le(e2), d3 = computed({
    get: () => e2.internalModelValue,
    set: (s3) => {
      !e2.readonly && !e2.disabled && n("update:internal-model-value", s3);
    }
  }), $ = ref([]);
  watch(d3, () => {
    te();
  });
  const Q2 = toRef(e2, "multiCalendars");
  watch(Q2, () => {
    de(0);
  });
  const x2 = ref([{ month: getMonth(M3()), year: getYear(M3()) }]), z2 = reactive({
    hours: e2.range ? [getHours(M3()), getHours(M3())] : getHours(M3()),
    minutes: e2.range ? [getMinutes(M3()), getMinutes(M3())] : getMinutes(M3()),
    seconds: e2.range ? [0, 0] : 0
  }), V = computed(
    () => (s3) => x2.value[s3] ? x2.value[s3].month : 0
  ), U = computed(
    () => (s3) => x2.value[s3] ? x2.value[s3].year : 0
  ), O2 = computed(() => e2.flow && e2.flow.length && !e2.partialFlow ? o.value === e2.flow.length : true), Z = (s3, D2, q2) => {
    var ee, De;
    x2.value[s3] || (x2.value[s3] = { month: 0, year: 0 }), x2.value[s3].month = D2 === null ? (ee = x2.value[s3]) == null ? void 0 : ee.month : D2, x2.value[s3].year = q2 === null ? (De = x2.value[s3]) == null ? void 0 : De.year : q2;
  }, K2 = (s3, D2) => {
    z2[s3] = D2;
  };
  onMounted(() => {
    d3.value || (e2.startDate && (Z(0, getMonth(M3(e2.startDate)), getYear(M3(e2.startDate))), _.value.multiCalendars && de(0)), _.value.startTime && T2()), te(true);
  });
  const te = (s3 = false) => {
    if (d3.value)
      return Array.isArray(d3.value) ? ($.value = d3.value, R2(s3)) : ue(d3.value);
    if (e2.timePicker)
      return b2();
    if (e2.monthPicker && !e2.range)
      return v();
    if (e2.yearPicker && !e2.range)
      return Y2();
    if (_.value.multiCalendars && s3 && !e2.startDate)
      return re(M3(), s3);
  }, re = (s3, D2 = false) => {
    if ((!_.value.multiCalendars || !e2.multiStatic || D2) && Z(0, getMonth(s3), getYear(s3)), _.value.multiCalendars)
      for (let q2 = 1; q2 < _.value.multiCalendars; q2++) {
        const ee = set(M3(), { month: V.value(q2 - 1), year: U.value(q2 - 1) }), De = add(ee, { months: 1 });
        x2.value[q2] = { month: getMonth(De), year: getYear(De) };
      }
  }, ue = (s3) => {
    re(s3), K2("hours", getHours(s3)), K2("minutes", getMinutes(s3)), K2("seconds", getSeconds(s3));
  }, ce = (s3, D2) => {
    re(s3[0], D2);
    const q2 = (ee, De) => [
      ee(s3[0]),
      s3[1] ? ee(s3[1]) : z2[De][1]
    ];
    K2("hours", q2(getHours, "hours")), K2("minutes", q2(getMinutes, "minutes")), K2("seconds", q2(getSeconds, "seconds"));
  }, fe = (s3, D2) => {
    if ((e2.range || e2.weekPicker) && !e2.multiDates)
      return ce(s3, D2);
    if (e2.multiDates) {
      const q2 = s3[s3.length - 1];
      return ue(q2);
    }
  }, R2 = (s3) => {
    const D2 = d3.value;
    fe(D2, s3), _.value.multiCalendars && e2.multiCalendarsSolo && u2();
  }, b2 = () => {
    if (T2(), !e2.range)
      d3.value = Ue(M3(), z2.hours, z2.minutes, I2());
    else {
      const s3 = z2.hours, D2 = z2.minutes;
      d3.value = [
        Ue(M3(), s3[0], D2[0], I2()),
        Ue(M3(), s3[1], D2[1], I2(false))
      ];
    }
  }, v = () => {
    e2.multiDates ? d3.value = [C(M3(), V.value(0), U.value(0))] : d3.value = C(M3(), V.value(0), U.value(0));
  }, Y2 = () => {
    d3.value = M3();
  }, I2 = (s3 = true) => e2.enableSeconds ? Array.isArray(z2.seconds) ? s3 ? z2.seconds[0] : z2.seconds[1] : z2.seconds : 0, T2 = () => {
    const s3 = m3();
    if (s3) {
      const D2 = Array.isArray(s3), q2 = D2 ? [+s3[0].hours, +s3[1].hours] : +s3.hours, ee = D2 ? [+s3[0].minutes, +s3[1].minutes] : +s3.minutes, De = D2 ? [+s3[0].seconds, +s3[1].seconds] : +s3.seconds;
      K2("hours", q2), K2("minutes", ee), e2.enableSeconds && K2("seconds", De);
    }
  }, y3 = () => Array.isArray(d3.value) && d3.value.length ? d3.value[d3.value.length - 1] : null, u2 = () => {
    if (Array.isArray(d3.value) && d3.value.length === 2) {
      const s3 = M3(
        M3(d3.value[1] ? d3.value[1] : addMonths(d3.value[0], 1))
      ), [D2, q2] = [getMonth(d3.value[0]), getYear(d3.value[0])], [ee, De] = [getMonth(d3.value[1]), getYear(d3.value[1])];
      (D2 !== ee || D2 === ee && q2 !== De) && e2.multiCalendarsSolo && Z(1, getMonth(s3), getYear(s3));
    }
  }, l = (s3) => {
    const D2 = addMonths(s3, 1);
    return { month: getMonth(D2), year: getYear(D2) };
  }, r = (s3) => {
    const D2 = getMonth(M3(s3)), q2 = getYear(M3(s3));
    if (Z(0, D2, q2), _.value.multiCalendars > 0)
      for (let ee = 1; ee < _.value.multiCalendars; ee++) {
        const De = l(
          set(M3(s3), { year: V.value(ee - 1), month: U.value(ee - 1) })
        );
        Z(ee, De.month, De.year);
      }
  }, h3 = (s3) => {
    if (d3.value && Array.isArray(d3.value))
      if (d3.value.some((D2) => ge(s3, D2))) {
        const D2 = d3.value.filter((q2) => !ge(q2, s3));
        d3.value = D2.length ? D2 : null;
      } else
        (e2.multiDatesLimit && +e2.multiDatesLimit > d3.value.length || !e2.multiDatesLimit) && d3.value.push(s3);
    else
      d3.value = [s3];
  }, w2 = (s3, D2) => {
    const q2 = Ve(s3, D2) ? D2 : s3, ee = Ve(D2, s3) ? D2 : s3;
    return eachDayOfInterval({ start: q2, end: ee });
  }, A = (s3, D2 = 0) => {
    if (Array.isArray(d3.value) && d3.value[D2]) {
      const q2 = differenceInCalendarDays(s3, d3.value[D2]), ee = w2(d3.value[D2], s3), De = ee.length === 1 ? 0 : ee.filter((j) => g(j)).length, k2 = Math.abs(q2) - De;
      if (e2.minRange && e2.maxRange)
        return k2 >= +e2.minRange && k2 <= +e2.maxRange;
      if (e2.minRange)
        return k2 >= +e2.minRange;
      if (e2.maxRange)
        return k2 <= +e2.maxRange;
    }
    return true;
  }, c2 = (s3) => Array.isArray(d3.value) && d3.value.length === 2 ? e2.fixedStart && (Ve(s3, d3.value[0]) || ge(s3, d3.value[0])) ? [d3.value[0], s3] : e2.fixedEnd && (Ie(s3, d3.value[1]) || ge(s3, d3.value[1])) ? [s3, d3.value[1]] : (n("invalid-fixed-range", s3), d3.value) : [], P = () => {
    e2.autoApply && O2.value && n("auto-apply", e2.partialFlow);
  }, f = () => {
    e2.autoApply && n("select-date");
  }, E2 = (s3) => !eachDayOfInterval({ start: s3[0], end: s3[1] }).some((q2) => g(q2)), le = (s3) => (d3.value = F(M3(s3.value)), P()), be = (s3) => {
    const D2 = Ue(M3(s3.value), z2.hours, z2.minutes, I2());
    e2.multiDates ? h3(D2) : d3.value = D2, a3(), P();
  }, He = () => {
    $.value = d3.value ? d3.value.slice() : [], $.value.length === 2 && !(e2.fixedStart || e2.fixedEnd) && ($.value = []);
  }, ne = (s3, D2) => {
    const q2 = [M3(s3.value), addDays(M3(s3.value), +e2.autoRange)];
    E2(q2) && (D2 && r(s3.value), $.value = q2);
  }, Fe = (s3) => {
    Ge(s3.value) || !A(s3.value, e2.fixedStart ? 0 : 1) || ($.value = c2(M3(s3.value)));
  }, Ge = (s3) => e2.noDisabledRange ? w2($.value[0], s3).some((q2) => g(q2)) : false, Te = (s3, D2) => {
    if (He(), e2.autoRange)
      return ne(s3, D2);
    if (e2.fixedStart || e2.fixedEnd)
      return Fe(s3);
    $.value[0] ? A(M3(s3.value)) && !Ge(s3.value) && (Ie(M3(s3.value), M3($.value[0])) ? $.value.unshift(M3(s3.value)) : $.value[1] = M3(s3.value)) : $.value[0] = M3(s3.value);
  }, xe = (s3) => {
    $.value[s3] = Ue(
      $.value[s3],
      z2.hours[s3],
      z2.minutes[s3],
      I2(s3 !== 1)
    );
  }, lt = () => {
    $.value.length && ($.value[0] && !$.value[1] ? xe(0) : (xe(0), xe(1), a3()), d3.value = $.value.slice(), $.value[0] && $.value[1] && e2.autoApply && n("auto-apply"), $.value[0] && !$.value[1] && e2.modelAuto && e2.autoApply && n("auto-apply"));
  }, wt = (s3, D2 = false) => {
    if (!(g(s3.value) || !s3.current && e2.hideOffsetDates)) {
      if (e2.weekPicker)
        return le(s3);
      if (!e2.range)
        return be(s3);
      it(z2.hours) && it(z2.minutes) && !e2.multiDates && (Te(s3, D2), lt());
    }
  }, X2 = (s3) => {
    const D2 = s3[0];
    return e2.weekNumbers === "local" ? getWeek(D2.value, { weekStartsOn: +e2.weekStart }) : e2.weekNumbers === "iso" ? getISOWeek(D2.value) : typeof e2.weekNumbers == "function" ? e2.weekNumbers(D2.value) : "";
  }, de = (s3) => {
    for (let D2 = s3 - 1; D2 >= 0; D2--) {
      const q2 = subMonths(set(M3(), { month: V.value(D2 + 1), year: U.value(D2 + 1) }), 1);
      Z(D2, getMonth(q2), getYear(q2));
    }
    for (let D2 = s3 + 1; D2 <= _.value.multiCalendars - 1; D2++) {
      const q2 = addMonths(set(M3(), { month: V.value(D2 - 1), year: U.value(D2 - 1) }), 1);
      Z(D2, getMonth(q2), getYear(q2));
    }
  }, oe = (s3) => C(M3(), V.value(s3), U.value(s3)), ot = (s3) => Ue(s3, z2.hours, z2.minutes, I2()), st = (s3) => {
    h3(oe(s3));
  }, xt = (s3, D2) => {
    const q2 = e2.monthPicker ? V.value(s3) !== D2.month || !D2.fromNav : U.value(s3) !== D2.year || !D2.fromNav;
    if (Z(s3, D2.month, D2.year), _.value.multiCalendars && !e2.multiCalendarsSolo && de(s3), e2.monthPicker || e2.yearPicker)
      if (e2.multiDates)
        q2 && st(s3);
      else if (e2.range) {
        if (q2 && A(oe(s3))) {
          let ee = d3.value ? d3.value.slice() : [];
          ee.length === 2 && ee[1] !== null && (ee = []), ee.length ? Ie(oe(s3), ee[0]) ? ee.unshift(oe(s3)) : ee[1] = oe(s3) : ee = [oe(s3)], d3.value = ee;
        }
      } else
        d3.value = oe(s3);
    n("update-month-year", { instance: s3, month: D2.month, year: D2.year }), t2(e2.multiCalendarsSolo ? s3 : void 0);
  }, zt = async (s3 = false) => {
    if (e2.autoApply && (e2.monthPicker || e2.yearPicker)) {
      await nextTick();
      const D2 = e2.monthPicker ? s3 : false;
      e2.range ? n("auto-apply", D2 || !d3.value || d3.value.length === 1) : n("auto-apply", D2);
    }
    a3();
  }, Nt = (s3, D2) => {
    const q2 = set(M3(), { month: V.value(D2), year: U.value(D2) }), ee = s3 < 0 ? addMonths(q2, 1) : subMonths(q2, 1);
    W(getMonth(ee), getYear(ee), s3 < 0, e2.preventMinMaxNavigation) && (Z(D2, getMonth(ee), getYear(ee)), _.value.multiCalendars && !e2.multiCalendarsSolo && de(D2), n("update-month-year", { instance: D2, month: getMonth(ee), year: getYear(ee) }), t2());
  }, bt = (s3) => {
    Vn(s3) && Vn(d3.value) && it(z2.hours) && it(z2.minutes) ? (s3[0] && d3.value[0] && (d3.value[0] = Ue(s3[0], z2.hours[0], z2.minutes[0], I2())), s3[1] && d3.value[1] && (d3.value[1] = Ue(s3[1], z2.hours[1], z2.minutes[1], I2(false)))) : e2.multiDates && Array.isArray(d3.value) ? d3.value[d3.value.length - 1] = ot(s3) : !e2.range && !En(s3) && (d3.value = ot(s3)), n("time-update");
  }, Kt = (s3, D2 = true, q2 = false) => {
    const ee = D2 ? s3 : z2.hours, De = !D2 && !q2 ? s3 : z2.minutes, k2 = q2 ? s3 : z2.seconds;
    if (e2.range && En(d3.value) && it(ee) && it(De) && it(k2) && !e2.disableTimeRangeValidation) {
      const j = (Me) => Ue(d3.value[Me], ee[Me], De[Me], k2[Me]), Ae = (Me) => setMilliseconds(d3.value[Me], 0);
      if (ge(d3.value[0], d3.value[1]) && (isAfter(j(0), Ae(1)) || isBefore(j(1), Ae(0))))
        return;
    }
    if (K2("hours", ee), K2("minutes", De), K2("seconds", k2), d3.value)
      if (e2.multiDates) {
        const j = y3();
        j && bt(j);
      } else
        bt(d3.value);
    else
      e2.timePicker && bt(e2.range ? [M3(), M3()] : M3());
    a3();
  }, jt = (s3, D2) => {
    e2.monthChangeOnScroll && Nt(e2.monthChangeOnScroll !== "inverse" ? -s3.deltaY : s3.deltaY, D2);
  }, Gt = (s3, D2, q2 = false) => {
    e2.monthChangeOnArrows && e2.vertical === q2 && Rt(s3, D2);
  }, Rt = (s3, D2) => {
    Nt(s3 === "right" ? -1 : 1, D2);
  };
  return {
    time: z2,
    month: V,
    year: U,
    modelValue: d3,
    calendars: x2,
    monthYearSelect: zt,
    isDisabled: g,
    updateTime: Kt,
    getWeekNum: X2,
    selectDate: wt,
    updateMonthYear: xt,
    handleScroll: jt,
    getMarker: (s3) => e2.markers.find((D2) => ge(N(s3.value), N(D2.date))),
    handleArrow: Gt,
    handleSwipe: Rt,
    selectCurrentDate: () => {
      e2.range ? d3.value && Array.isArray(d3.value) && d3.value[0] ? d3.value = Ie(M3(), d3.value[0]) ? [M3(), d3.value[0]] : [d3.value[0], M3()] : d3.value = [M3()] : d3.value = M3(), f();
    },
    presetDateRange: (s3, D2) => {
      D2 || s3.length && s3.length <= 2 && e2.range && (d3.value = s3.map((q2) => M3(q2)), f(), e2.multiCalendars && nextTick().then(() => te(true)));
    }
  };
};
var or = (e2, n, a3) => {
  const t2 = ref(), {
    getZonedToUtc: o,
    getZonedDate: m3,
    formatDate: g,
    getDefaultPattern: N,
    checkRangeEnabled: F,
    checkPartialRangeValue: C,
    isValidDate: W,
    setDateMonthOrYear: _,
    defaults: d3
  } = Le(n), $ = ref(""), Q2 = toRef(n, "format");
  watch(t2, () => {
    e2("internal-model-change", t2.value);
  }), watch(Q2, () => {
    u2();
  });
  const x2 = (f) => {
    const E2 = f || M3();
    return n.modelType ? r(E2) : {
      hours: getHours(E2),
      minutes: getMinutes(E2),
      seconds: n.enableSeconds ? getSeconds(E2) : 0
    };
  }, z2 = (f) => n.modelType ? r(f) : { month: getMonth(f), year: getYear(f) }, V = (f) => Array.isArray(f) ? F(() => [
    setYear(M3(), f[0]),
    f[1] ? setYear(M3(), f[1]) : C()
  ]) : setYear(M3(), +f), U = (f, E2) => (typeof f == "string" || typeof f == "number") && n.modelType ? l(f) : E2, O2 = (f) => Array.isArray(f) ? [
    U(
      f[0],
      Ue(null, +f[0].hours, +f[0].minutes, f[0].seconds)
    ),
    U(
      f[1],
      Ue(null, +f[1].hours, +f[1].minutes, f[1].seconds)
    )
  ] : U(f, Ue(null, f.hours, f.minutes, f.seconds)), Z = (f) => Array.isArray(f) ? n.multiDates ? f.map((E2) => U(E2, _(null, +E2.month, +E2.year))) : F(() => [
    U(f[0], _(null, +f[0].month, +f[0].year)),
    U(
      f[1],
      f[1] ? _(null, +f[1].month, +f[1].year) : C()
    )
  ]) : U(f, _(null, +f.month, +f.year)), K2 = (f) => {
    if (Array.isArray(f))
      return f.map((E2) => l(E2));
    throw new Error(Ut.dateArr("multi-dates"));
  }, te = (f) => {
    if (Array.isArray(f))
      return [M3(f[0]), M3(f[1])];
    throw new Error(Ut.dateArr("week-picker"));
  }, re = (f) => n.modelAuto ? Array.isArray(f) ? [l(f[0]), l(f[1])] : n.autoApply ? [l(f)] : [l(f), null] : Array.isArray(f) ? F(() => [
    l(f[0]),
    f[1] ? l(f[1]) : C()
  ]) : l(f), ue = () => {
    Array.isArray(t2.value) && n.range && t2.value.length === 1 && t2.value.push(C());
  }, ce = () => {
    const f = t2.value;
    return [
      r(f[0]),
      f[1] ? r(f[1]) : C()
    ];
  }, fe = () => t2.value[1] ? ce() : r(Se(t2.value[0])), R2 = () => (t2.value || []).map((f) => r(f)), b2 = () => (ue(), n.modelAuto ? fe() : n.multiDates ? R2() : Array.isArray(t2.value) ? F(() => ce()) : r(Se(t2.value))), v = (f) => f ? n.timePicker ? O2(Se(f)) : n.monthPicker ? Z(Se(f)) : n.yearPicker ? V(Se(f)) : n.multiDates ? K2(Se(f)) : n.weekPicker ? te(Se(f)) : re(Se(f)) : null, Y2 = (f) => {
    const E2 = v(f);
    W(Se(E2)) ? (t2.value = Se(E2), u2()) : (t2.value = null, $.value = "");
  }, I2 = () => {
    var E2;
    const f = (le) => {
      var be;
      return format(le, (be = d3.value.textInputOptions) == null ? void 0 : be.format);
    };
    return `${f(t2.value[0])} ${(E2 = d3.value.textInputOptions) == null ? void 0 : E2.rangeSeparator} ${t2.value[1] ? f(t2.value[1]) : ""}`;
  }, T2 = () => {
    var f;
    return a3.value && t2.value ? Array.isArray(t2.value) ? I2() : format(t2.value, (f = d3.value.textInputOptions) == null ? void 0 : f.format) : g(t2.value);
  }, y3 = () => {
    var f;
    return t2.value ? n.multiDates ? t2.value.map((E2) => g(E2)).join("; ") : n.textInput && typeof ((f = d3.value.textInputOptions) == null ? void 0 : f.format) == "string" ? T2() : g(t2.value) : "";
  }, u2 = () => {
    !n.format || typeof n.format == "string" ? $.value = y3() : $.value = n.format(t2.value);
  }, l = (f) => {
    if (n.utc) {
      const E2 = new Date(f);
      return n.utc === "preserve" ? new Date(E2.getTime() + E2.getTimezoneOffset() * 6e4) : E2;
    }
    return n.modelType ? n.modelType === "date" || n.modelType === "timestamp" ? m3(new Date(f)) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? parse(f, N(), /* @__PURE__ */ new Date()) : m3(parse(f, n.modelType, /* @__PURE__ */ new Date())) : m3(new Date(f));
  }, r = (f) => f ? n.utc ? pa(f, n.utc === "preserve") : n.modelType ? n.modelType === "timestamp" ? +o(f) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? g(o(f)) : g(o(f), n.modelType) : o(f) : "", h3 = (f) => {
    e2("update:model-value", f);
  }, w2 = (f) => Array.isArray(t2.value) ? n.multiDates ? t2.value.map((E2) => f(E2)) : [
    f(t2.value[0]),
    t2.value[1] ? f(t2.value[1]) : C()
  ] : f(Se(t2.value)), A = (f) => h3(Se(w2(f)));
  return {
    inputValue: $,
    internalModelValue: t2,
    checkBeforeEmit: () => t2.value ? n.range ? n.partialRange ? t2.value.length >= 1 : t2.value.length === 2 : !!t2.value : false,
    parseExternalModelValue: Y2,
    formatInputValue: u2,
    emitModelValue: () => (u2(), n.monthPicker ? A(z2) : n.timePicker ? A(x2) : n.yearPicker ? A(getYear) : n.weekPicker ? h3(t2.value) : h3(b2()))
  };
};
var sr = (e2, n) => {
  const { validateMonthYearInRange: a3, validateMaxDate: t2, validateMinDate: o, defaults: m3 } = Le(e2), g = (_, d3) => {
    let $ = _;
    return m3.value.filters.months.includes(getMonth($)) ? ($ = d3 ? addMonths(_, 1) : subMonths(_, 1), g($, d3)) : $;
  }, N = (_, d3) => {
    let $ = _;
    return m3.value.filters.years.includes(getYear($)) ? ($ = d3 ? addYears(_, 1) : subYears(_, 1), N($, d3)) : $;
  }, F = (_) => {
    const d3 = set(/* @__PURE__ */ new Date(), { month: e2.month, year: e2.year });
    let $ = _ ? addMonths(d3, 1) : subMonths(d3, 1);
    e2.disableYearSelect && ($ = setYear($, e2.year));
    let Q2 = getMonth($), x2 = getYear($);
    m3.value.filters.months.includes(Q2) && ($ = g($, _), Q2 = getMonth($), x2 = getYear($)), m3.value.filters.years.includes(x2) && ($ = N($, _), x2 = getYear($)), a3(Q2, x2, _, e2.preventMinMaxNavigation) && C(Q2, x2);
  }, C = (_, d3) => {
    n("update-month-year", { month: _, year: d3 });
  }, W = computed(() => (_) => {
    if (!e2.preventMinMaxNavigation || _ && !e2.maxDate || !_ && !e2.minDate)
      return false;
    const d3 = set(/* @__PURE__ */ new Date(), { month: e2.month, year: e2.year }), $ = _ ? addMonths(d3, 1) : subMonths(d3, 1), Q2 = [getMonth($), getYear($)];
    return _ ? !t2(...Q2) : !o(...Q2);
  });
  return { handleMonthYearChange: F, isDisabled: W, updateMonthYear: C };
};
var Ft = ((e2) => (e2.center = "center", e2.left = "left", e2.right = "right", e2))(Ft || {});
var ir = (e2, n, a3, t2) => {
  const o = ref({
    top: "0",
    left: "0",
    transform: "none",
    opacity: "0"
  }), m3 = ref(false), g = toRef(t2, "teleportCenter"), N = computed(() => m3.value ? "-100%" : "0"), F = () => {
    C(), o.value.opacity = "0";
  };
  watch(g, () => {
    U();
  }), onMounted(() => {
    C();
  });
  const C = () => {
    const b2 = $e(n);
    if (b2) {
      const { top: v, left: Y2, width: I2, height: T2 } = Q2(b2);
      o.value.top = `${v + T2 / 2}px`, $(Y2, I2, 50);
    }
  }, W = (b2) => {
    if (t2.teleport) {
      const v = b2.getBoundingClientRect();
      return {
        left: v.left + window.scrollX,
        top: v.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, _ = (b2, v) => {
    o.value.left = `${b2 + v}px`, o.value.transform = `translate(-100%, ${N.value})`;
  }, d3 = (b2) => {
    o.value.left = `${b2}px`, o.value.transform = `translate(0, ${N.value})`;
  }, $ = (b2, v, Y2) => {
    t2.position === Ft.left && d3(b2), t2.position === Ft.right && _(b2, v), t2.position === Ft.center && (o.value.left = `${b2 + v / 2}px`, o.value.transform = Y2 ? `translate(-50%, -${Y2}%)` : `translate(-50%, ${N.value})`);
  }, Q2 = (b2) => {
    const { width: v, height: Y2 } = b2.getBoundingClientRect(), { top: I2, left: T2 } = t2.altPosition ? t2.altPosition(b2) : W(b2);
    return { top: +I2, left: +T2, width: v, height: Y2 };
  }, x2 = () => {
    const b2 = $e(n);
    if (b2) {
      const { top: v, left: Y2, width: I2, height: T2 } = Q2(b2), y3 = re();
      o.value.top = `${v + T2 / 2}px`, $(Y2, I2, y3 === "top" ? 100 : 0);
    }
  }, z2 = () => {
    o.value.left = "50%", o.value.top = "50%", o.value.transform = "translate(-50%, -50%)", o.value.position = "fixed", delete o.value.opacity;
  }, V = () => {
    const b2 = $e(n), { top: v, left: Y2, transform: I2 } = t2.altPosition(b2);
    o.value = { top: `${v}px`, left: `${Y2}px`, transform: I2 || "" };
  }, U = (b2 = true) => {
    if (!t2.inline)
      return g.value ? z2() : t2.altPosition !== null ? V() : (b2 && a3("recalculate-position"), ce());
  }, O2 = ({
    inputEl: b2,
    menuEl: v,
    left: Y2,
    width: I2
  }) => {
    window.screen.width > 768 && $(Y2, I2), te(b2, v);
  }, Z = (b2, v) => {
    const { top: Y2, left: I2, height: T2, width: y3 } = Q2(b2);
    o.value.top = `${T2 + Y2 + +t2.offset}px`, m3.value = false, O2({ inputEl: b2, menuEl: v, left: I2, width: y3 });
  }, K2 = (b2, v) => {
    const { top: Y2, left: I2, width: T2 } = Q2(b2);
    o.value.top = `${Y2 - +t2.offset}px`, m3.value = true, O2({ inputEl: b2, menuEl: v, left: I2, width: T2 });
  }, te = (b2, v) => {
    if (t2.autoPosition) {
      const { left: Y2, width: I2 } = Q2(b2), { left: T2, right: y3 } = v.getBoundingClientRect();
      return T2 <= 0 || T2 <= Y2 ? d3(Y2) : y3 >= document.documentElement.clientWidth ? _(Y2, I2) : $(Y2, I2);
    }
  }, re = () => {
    const b2 = $e(e2), v = $e(n);
    if (b2 && v) {
      const { height: Y2 } = b2.getBoundingClientRect(), { top: I2, height: T2 } = v.getBoundingClientRect(), u2 = window.innerHeight - I2 - T2, l = I2;
      return Y2 <= u2 ? "bottom" : Y2 > u2 && Y2 <= l ? "top" : u2 >= l ? "bottom" : "top";
    }
    return "bottom";
  }, ue = (b2, v) => re() === "bottom" ? Z(b2, v) : K2(b2, v), ce = () => {
    const b2 = $e(n), v = $e(e2);
    if (b2 && v)
      return t2.autoPosition ? ue(b2, v) : Z(b2, v);
  }, fe = function(b2) {
    if (b2) {
      const v = b2.scrollHeight > b2.clientHeight, I2 = window.getComputedStyle(b2).overflowY.indexOf("hidden") !== -1;
      return v && !I2;
    }
    return true;
  }, R2 = function(b2) {
    return !b2 || b2 === document.body || b2.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : fe(b2) ? b2 : R2(b2.parentNode);
  };
  return { openOnTop: m3, menuStyle: o, resetPosition: F, setMenuPosition: U, setInitialPosition: x2, getScrollableParent: R2 };
};
var gt = [
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
  { name: "action-buttons", use: ["action"] },
  { name: "action-preview", use: ["action"] },
  { name: "calendar-header", use: ["calendar"] },
  { name: "marker-tooltip", use: ["calendar"] },
  { name: "action-extra", use: ["menu"] },
  { name: "time-picker-overlay", use: ["calendar", "time"] },
  { name: "am-pm-button", use: ["calendar", "time"] },
  { name: "left-sidebar", use: ["menu"] },
  { name: "right-sidebar", use: ["menu"] },
  { name: "month-year", use: ["month-year"] },
  { name: "time-picker", use: ["menu"] },
  { name: "action-row", use: ["action"] }
];
var ur = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var dr = {
  all: () => gt,
  monthYear: () => gt.filter((e2) => e2.use.includes("month-year")),
  input: () => ur,
  timePicker: () => gt.filter((e2) => e2.use.includes("time")),
  action: () => gt.filter((e2) => e2.use.includes("action")),
  calendar: () => gt.filter((e2) => e2.use.includes("calendar")),
  menu: () => gt.filter((e2) => e2.use.includes("menu"))
};
var ft = (e2, n, a3) => {
  const t2 = [];
  return dr[n]().forEach((o) => {
    e2[o.name] && t2.push(o.name);
  }), a3 && a3.length && a3.forEach((o) => {
    o.slot && t2.push(o.slot);
  }), t2;
};
var Ht = (e2) => ({ transitionName: computed(() => (a3) => e2 && typeof e2 != "boolean" ? a3 ? e2.open : e2.close : ""), showTransition: !!e2 });
var rt = {
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
  disableYearSelect: { type: Boolean, default: false },
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
  sixWeeks: { type: [Boolean, String], default: false },
  actionRow: { type: Object, default: () => ({}) },
  allowPreventDefault: { type: Boolean, default: false }
};
var cr = {
  key: 1,
  class: "dp__input_wrap"
};
var fr = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-label", "onKeydown"];
var mr = {
  key: 2,
  class: "dp__input_icon"
};
var vr = {
  key: 4,
  class: "dp__clear_icon"
};
var yr = defineComponent({
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: false },
    inputValue: { type: String, default: "" },
    ...rt
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
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { getDefaultPattern: o, isValidDate: m3, defaults: g, getDefaultStartTime: N, assignDefaultTime: F } = Le(t2), C = ref(), W = ref(null), _ = ref(false), d3 = ref(false), $ = computed(
      () => ({
        dp__pointer: !t2.disabled && !t2.readonly && !t2.textInput,
        dp__disabled: t2.disabled,
        dp__input_readonly: !t2.textInput,
        dp__input: true,
        dp__input_icon_pad: !t2.hideInputIcon,
        dp__input_valid: t2.state,
        dp__input_invalid: t2.state === false,
        dp__input_focus: _.value || t2.isMenuOpen,
        dp__input_reg: !t2.textInput,
        [t2.inputClassName]: !!t2.inputClassName
      })
    ), Q2 = () => {
      a3("set-input-date", null), t2.autoApply && (a3("set-empty-date"), C.value = null);
    }, x2 = (v) => {
      var I2;
      const Y2 = N();
      return ha(
        v,
        ((I2 = g.value.textInputOptions) == null ? void 0 : I2.format) || o(),
        Y2 || F({}),
        t2.inputValue,
        d3.value
      );
    }, z2 = (v) => {
      const { rangeSeparator: Y2 } = g.value.textInputOptions, [I2, T2] = v.split(`${Y2}`);
      if (I2) {
        const y3 = x2(I2.trim()), u2 = T2 ? x2(T2.trim()) : null, l = y3 && u2 ? [y3, u2] : [y3];
        C.value = y3 ? l : null;
      }
    }, V = () => {
      d3.value = true;
    }, U = (v) => {
      if (t2.range)
        z2(v);
      else if (t2.multiDates) {
        const Y2 = v.split(";");
        C.value = Y2.map((I2) => x2(I2.trim())).filter((I2) => I2);
      } else
        C.value = x2(v);
    }, O2 = (v) => {
      var I2;
      const { value: Y2 } = v.target;
      Y2 !== "" ? ((I2 = g.value.textInputOptions) != null && I2.openMenu && !t2.isMenuOpen && a3("open"), U(Y2), a3("set-input-date", C.value)) : Q2(), d3.value = false, a3("update:input-value", Y2);
    }, Z = (v) => {
      var Y2, I2;
      t2.textInput ? (U(v.target.value), (Y2 = g.value.textInputOptions) != null && Y2.enterSubmit && m3(C.value) && t2.inputValue !== "" ? (a3("set-input-date", C.value, true), C.value = null) : (I2 = g.value.textInputOptions) != null && I2.enterSubmit && t2.inputValue === "" && (C.value = null, a3("clear"))) : re(v);
    }, K2 = () => {
      var v, Y2;
      (v = g.value.textInputOptions) != null && v.tabSubmit && m3(C.value) && t2.inputValue !== "" ? (a3("set-input-date", C.value, true), C.value = null) : (Y2 = g.value.textInputOptions) != null && Y2.tabSubmit && t2.inputValue === "" && (C.value = null, a3("clear"));
    }, te = () => {
      _.value = true, a3("focus");
    }, re = (v) => {
      var Y2;
      v.preventDefault(), v.stopImmediatePropagation(), v.stopPropagation(), t2.textInput && ((Y2 = g.value.textInputOptions) != null && Y2.openMenu) && !t2.inlineWithInput ? t2.isMenuOpen ? g.value.textInputOptions.enterSubmit && a3("select-date") : a3("open") : t2.textInput || a3("toggle");
    }, ue = () => {
      a3("real-blur"), _.value = false, t2.isMenuOpen || a3("blur"), t2.autoApply && t2.textInput && C.value && !t2.isMenuOpen && (a3("set-input-date", C.value), a3("select-date"), C.value = null);
    }, ce = () => {
      a3("clear");
    }, fe = (v) => {
      if (!t2.textInput) {
        if (v.code === "Tab")
          return;
        v.preventDefault();
      }
    };
    return n({
      focusInput: () => {
        var v;
        (v = W.value) == null || v.focus({ preventScroll: true });
      },
      setParsedDate: (v) => {
        C.value = v;
      }
    }), (v, Y2) => {
      var I2;
      return openBlock(), createElementBlock("div", { onClick: re }, [
        v.$slots.trigger && !v.$slots["dp-input"] && !v.inline ? renderSlot(v.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !v.$slots.trigger && (!v.inline || v.inlineWithInput) ? (openBlock(), createElementBlock("div", cr, [
          v.$slots["dp-input"] && !v.$slots.trigger && !v.inline ? renderSlot(v.$slots, "dp-input", {
            key: 0,
            value: e2.inputValue,
            isMenuOpen: e2.isMenuOpen,
            onInput: O2,
            onEnter: Z,
            onTab: K2,
            onClear: ce,
            onBlur: ue,
            onKeypress: fe,
            onPaste: V
          }) : createCommentVNode("", true),
          v.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            ref_key: "inputRef",
            ref: W,
            id: v.uid ? `dp-input-${v.uid}` : void 0,
            name: v.name,
            class: normalizeClass(unref($)),
            inputmode: v.textInput ? "text" : "none",
            placeholder: v.placeholder,
            disabled: v.disabled,
            readonly: v.readonly,
            required: v.required,
            value: e2.inputValue,
            autocomplete: v.autocomplete,
            "aria-label": (I2 = unref(g).ariaLabels) == null ? void 0 : I2.input,
            onInput: O2,
            onKeydown: [
              withKeys(Z, ["enter"]),
              withKeys(K2, ["tab"]),
              fe
            ],
            onBlur: ue,
            onFocus: te,
            onKeypress: fe,
            onPaste: V
          }, null, 42, fr)),
          v.$slots["input-icon"] && !v.hideInputIcon ? (openBlock(), createElementBlock("span", mr, [
            renderSlot(v.$slots, "input-icon")
          ])) : createCommentVNode("", true),
          !v.$slots["input-icon"] && !v.hideInputIcon && !v.$slots["dp-input"] ? (openBlock(), createBlock(unref(Wt), {
            key: 3,
            class: "dp__input_icon dp__input_icons"
          })) : createCommentVNode("", true),
          v.$slots["clear-icon"] && e2.inputValue && v.clearable && !v.disabled && !v.readonly ? (openBlock(), createElementBlock("span", vr, [
            renderSlot(v.$slots, "clear-icon", { clear: ce })
          ])) : createCommentVNode("", true),
          v.clearable && !v.$slots["clear-icon"] && e2.inputValue && !v.disabled && !v.readonly ? (openBlock(), createBlock(unref(ga), {
            key: 5,
            class: "dp__clear_icon dp__input_icons",
            onClick: withModifiers(ce, ["stop", "prevent"])
          }, null, 8, ["onClick"])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var gr = ["title"];
var hr = { class: "dp__action_buttons" };
var pr = ["onKeydown", "disabled"];
var kr = defineComponent({
  __name: "ActionRow",
  props: {
    menuMount: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    calendarWidth: { type: Number, default: 0 },
    ...rt
  },
  emits: ["close-picker", "select-date", "select-now", "invalid-select"],
  setup(e2, { emit: n }) {
    const a3 = e2, { formatDate: t2, isValidTime: o, defaults: m3 } = Le(a3), { buildMatrix: g } = at(), N = ref(null), F = ref(null);
    onMounted(() => {
      a3.arrowNavigation && g([$e(N), $e(F)], "actionRow");
    });
    const C = computed(() => a3.range && !a3.partialRange && a3.internalModelValue ? a3.internalModelValue.length === 2 : true), W = computed(() => !_.value || !d3.value || !C.value), _ = computed(() => !a3.enableTimePicker || a3.ignoreTimeValidation ? true : o(a3.internalModelValue)), d3 = computed(() => a3.monthPicker ? a3.range && Array.isArray(a3.internalModelValue) ? !a3.internalModelValue.filter((Z) => !V(Z)).length : V(a3.internalModelValue) : true), $ = () => {
      const O2 = m3.value.previewFormat;
      return a3.timePicker || a3.monthPicker, O2(Se(a3.internalModelValue));
    }, Q2 = () => {
      const O2 = a3.internalModelValue;
      return m3.value.multiCalendars > 0 ? `${t2(O2[0])} - ${t2(O2[1])}` : [t2(O2[0]), t2(O2[1])];
    }, x2 = computed(() => !a3.internalModelValue || !a3.menuMount ? "" : typeof m3.value.previewFormat == "string" ? Array.isArray(a3.internalModelValue) ? a3.internalModelValue.length === 2 && a3.internalModelValue[1] ? Q2() : a3.multiDates ? a3.internalModelValue.map((O2) => `${t2(O2)}`) : a3.modelAuto ? `${t2(a3.internalModelValue[0])}` : `${t2(a3.internalModelValue[0])} -` : t2(a3.internalModelValue) : $()), z2 = computed(
      () => Array.isArray(x2.value) ? x2.value.join(a3.multiDates ? "; " : " - ") : x2.value
    ), V = (O2) => {
      if (!a3.monthPicker)
        return true;
      let Z = true;
      const K2 = M3(Dt(O2));
      if (a3.minDate && a3.maxDate) {
        const te = M3(Dt(a3.minDate)), re = M3(Dt(a3.maxDate));
        return Ve(K2, te) && Ie(K2, re) || ge(K2, te) || ge(K2, re);
      }
      if (a3.minDate) {
        const te = M3(Dt(a3.minDate));
        Z = Ve(K2, te) || ge(K2, te);
      }
      if (a3.maxDate) {
        const te = M3(Dt(a3.maxDate));
        Z = Ie(K2, te) || ge(K2, te);
      }
      return Z;
    }, U = () => {
      _.value && d3.value && C.value ? n("select-date") : n("invalid-select");
    };
    return (O2, Z) => (openBlock(), createElementBlock("div", {
      class: "dp__action_row",
      style: normalizeStyle(e2.calendarWidth ? { width: `${e2.calendarWidth}px` } : {})
    }, [
      O2.$slots["action-row"] ? renderSlot(O2.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: e2.internalModelValue,
        disabled: unref(W),
        selectDate: () => O2.$emit("select-date"),
        closePicker: () => O2.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(m3).actionRow.showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: unref(z2)
        }, [
          O2.$slots["action-preview"] ? renderSlot(O2.$slots, "action-preview", {
            key: 0,
            value: e2.internalModelValue
          }) : createCommentVNode("", true),
          O2.$slots["action-preview"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(unref(z2)), 1)
          ], 64))
        ], 8, gr)) : createCommentVNode("", true),
        createBaseVNode("div", hr, [
          O2.$slots["action-buttons"] ? renderSlot(O2.$slots, "action-buttons", {
            key: 0,
            value: e2.internalModelValue
          }) : createCommentVNode("", true),
          O2.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !O2.inline && unref(m3).actionRow.showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              ref_key: "cancelButtonRef",
              ref: N,
              class: "dp__action_button dp__action_cancel",
              onClick: Z[0] || (Z[0] = (K2) => O2.$emit("close-picker")),
              onKeydown: [
                Z[1] || (Z[1] = withKeys((K2) => O2.$emit("close-picker"), ["enter"])),
                Z[2] || (Z[2] = withKeys((K2) => O2.$emit("close-picker"), ["space"]))
              ]
            }, toDisplayString(O2.cancelText), 545)) : createCommentVNode("", true),
            O2.showNowButton || unref(m3).actionRow.showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              ref_key: "cancelButtonRef",
              ref: N,
              class: "dp__action_button dp__action_cancel",
              onClick: Z[3] || (Z[3] = (K2) => O2.$emit("select-now")),
              onKeydown: [
                Z[4] || (Z[4] = withKeys((K2) => O2.$emit("select-now"), ["enter"])),
                Z[5] || (Z[5] = withKeys((K2) => O2.$emit("select-now"), ["space"]))
              ]
            }, toDisplayString(O2.nowButtonLabel), 545)) : createCommentVNode("", true),
            unref(m3).actionRow.showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              type: "button",
              class: "dp__action_button dp__action_select",
              onKeydown: [
                withKeys(U, ["enter"]),
                withKeys(U, ["space"])
              ],
              onClick: U,
              disabled: unref(W),
              ref_key: "selectButtonRef",
              ref: F
            }, toDisplayString(O2.selectText), 41, pr)) : createCommentVNode("", true)
          ], 64))
        ])
      ], 64))
    ], 4));
  }
});
var wr = ["aria-label"];
var br = {
  class: "dp__calendar_header",
  role: "row"
};
var Dr = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
};
var $r = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1);
var Mr = ["aria-label"];
var Tr = {
  key: 0,
  role: "gridcell",
  class: "dp__calendar_item dp__week_num"
};
var Ar = { class: "dp__cell_inner" };
var Sr = ["aria-selected", "aria-disabled", "aria-label", "onClick", "onKeydown", "onMouseenter", "onMouseleave"];
var Pr = defineComponent({
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
    ...rt
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
    const t2 = e2, { buildMultiLevelMatrix: o } = at(), { setDateMonthOrYear: m3, defaults: g } = Le(t2), N = ref(null), F = ref({
      bottom: "",
      left: "",
      transform: ""
    }), C = ref([]), W = ref(null), _ = ref(true), d3 = ref(""), $ = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), Q2 = ref([]), x2 = ref({ left: "50%" }), z2 = computed(() => t2.dayNames ? Array.isArray(t2.dayNames) ? t2.dayNames : t2.dayNames(t2.locale, +t2.weekStart) : ja(t2.locale, +t2.weekStart));
    onMounted(() => {
      a3("mount", { cmp: "calendar", refs: C }), t2.noSwipe || W.value && (W.value.addEventListener("touchstart", R2, { passive: false }), W.value.addEventListener("touchend", b2, { passive: false }), W.value.addEventListener("touchmove", v, { passive: false })), t2.monthChangeOnScroll && W.value && W.value.addEventListener("wheel", T2, { passive: false });
    });
    const V = (y3) => y3 ? t2.vertical ? "vNext" : "next" : t2.vertical ? "vPrevious" : "previous", U = (y3, u2) => {
      if (t2.transitions) {
        const l = Ke(m3(M3(), t2.month, t2.year));
        d3.value = Ve(Ke(m3(M3(), y3, u2)), l) ? g.value.transitions[V(true)] : g.value.transitions[V(false)], _.value = false, nextTick(() => {
          _.value = true;
        });
      }
    }, O2 = computed(
      () => ({
        [t2.calendarClassName]: !!t2.calendarClassName
      })
    ), Z = computed(() => (y3) => {
      const u2 = Xa(y3);
      return {
        dp__marker_dot: u2.type === "dot",
        dp__marker_line: u2.type === "line"
      };
    }), K2 = computed(() => (y3) => ge(y3, N.value)), te = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: g.value.multiCalendars > 0 && t2.instance !== 0
    })), re = computed(() => (y3) => t2.hideOffsetDates ? y3.current : true), ue = computed(() => t2.specificMode ? { height: `${t2.modeHeight}px` } : void 0), ce = async (y3, u2, l) => {
      var r, h3;
      if (a3("set-hover-date", y3), (h3 = (r = y3.marker) == null ? void 0 : r.tooltip) != null && h3.length) {
        const w2 = $e(C.value[u2][l]);
        if (w2) {
          const { width: A, height: c2 } = w2.getBoundingClientRect();
          N.value = y3.value;
          let P = { left: `${A / 2}px` }, f = -50;
          if (await nextTick(), Q2.value[0]) {
            const { left: E2, width: le } = Q2.value[0].getBoundingClientRect();
            E2 < 0 && (P = { left: "0" }, f = 0, x2.value.left = `${A / 2}px`), window.innerWidth < E2 + le && (P = { right: "0" }, f = 0, x2.value.left = `${le - A / 2}px`);
          }
          F.value = {
            bottom: `${c2}px`,
            ...P,
            transform: `translateX(${f}%)`
          }, a3("tooltip-open", y3.marker);
        }
      }
    }, fe = (y3) => {
      N.value && (N.value = null, F.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a3("tooltip-close", y3.marker));
    }, R2 = (y3) => {
      $.value.startX = y3.changedTouches[0].screenX, $.value.startY = y3.changedTouches[0].screenY;
    }, b2 = (y3) => {
      $.value.endX = y3.changedTouches[0].screenX, $.value.endY = y3.changedTouches[0].screenY, Y2();
    }, v = (y3) => {
      t2.vertical && !t2.inline && y3.preventDefault();
    }, Y2 = () => {
      const y3 = t2.vertical ? "Y" : "X";
      Math.abs($.value[`start${y3}`] - $.value[`end${y3}`]) > 10 && a3("handle-swipe", $.value[`start${y3}`] > $.value[`end${y3}`] ? "right" : "left");
    }, I2 = (y3, u2, l) => {
      y3 && (Array.isArray(C.value[u2]) ? C.value[u2][l] = y3 : C.value[u2] = [y3]), t2.arrowNavigation && o(C.value, "calendar");
    }, T2 = (y3) => {
      t2.monthChangeOnScroll && (y3.preventDefault(), a3("handle-scroll", y3));
    };
    return n({ triggerTransition: U }), (y3, u2) => {
      var l;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(te))
      }, [
        createBaseVNode("div", {
          style: normalizeStyle(unref(ue)),
          ref_key: "calendarWrapRef",
          ref: W,
          role: "grid",
          class: normalizeClass(unref(O2)),
          "aria-label": (l = unref(g).ariaLabels) == null ? void 0 : l.calendarWrap
        }, [
          e2.specificMode ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createBaseVNode("div", br, [
              y3.weekNumbers ? (openBlock(), createElementBlock("div", Dr, toDisplayString(y3.weekNumName), 1)) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(z2), (r, h3) => (openBlock(), createElementBlock("div", {
                class: "dp__calendar_header_item",
                role: "gridcell",
                key: h3
              }, [
                y3.$slots["calendar-header"] ? renderSlot(y3.$slots, "calendar-header", {
                  key: 0,
                  day: r,
                  index: h3
                }) : createCommentVNode("", true),
                y3.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(r), 1)
                ], 64))
              ]))), 128))
            ]),
            $r,
            createVNode(Transition, {
              name: d3.value,
              css: !!y3.transitions
            }, {
              default: withCtx(() => {
                var r;
                return [
                  _.value ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "dp__calendar",
                    role: "grid",
                    "aria-label": (r = unref(g).ariaLabels) == null ? void 0 : r.calendarDays
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(e2.mappedDates, (h3, w2) => (openBlock(), createElementBlock("div", {
                      class: "dp__calendar_row",
                      role: "row",
                      key: w2
                    }, [
                      y3.weekNumbers ? (openBlock(), createElementBlock("div", Tr, [
                        createBaseVNode("div", Ar, toDisplayString(e2.getWeekNum(h3.days)), 1)
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(h3.days, (A, c2) => {
                        var P, f, E2;
                        return openBlock(), createElementBlock("div", {
                          role: "gridcell",
                          class: "dp__calendar_item",
                          ref_for: true,
                          ref: (le) => I2(le, w2, c2),
                          key: c2 + w2,
                          "aria-selected": A.classData.dp__active_date || A.classData.dp__range_start || A.classData.dp__range_start,
                          "aria-disabled": A.classData.dp__cell_disabled,
                          "aria-label": (f = (P = unref(g).ariaLabels) == null ? void 0 : P.day) == null ? void 0 : f.call(P, A),
                          tabindex: "0",
                          onClick: withModifiers((le) => y3.$emit("select-date", A), ["stop", "prevent"]),
                          onKeydown: [
                            withKeys((le) => y3.$emit("select-date", A), ["enter"]),
                            withKeys((le) => y3.$emit("handle-space", A), ["space"])
                          ],
                          onMouseenter: (le) => ce(A, w2, c2),
                          onMouseleave: (le) => fe(A)
                        }, [
                          createBaseVNode("div", {
                            class: normalizeClass(["dp__cell_inner", A.classData])
                          }, [
                            y3.$slots.day && unref(re)(A) ? renderSlot(y3.$slots, "day", {
                              key: 0,
                              day: +A.text,
                              date: A.value
                            }) : createCommentVNode("", true),
                            y3.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createTextVNode(toDisplayString(A.text), 1)
                            ], 64)),
                            A.marker && unref(re)(A) ? (openBlock(), createElementBlock("div", {
                              key: 2,
                              class: normalizeClass(unref(Z)(A.marker)),
                              style: normalizeStyle(A.marker.color ? { backgroundColor: A.marker.color } : {})
                            }, null, 6)) : createCommentVNode("", true),
                            unref(K2)(A.value) ? (openBlock(), createElementBlock("div", {
                              key: 3,
                              class: "dp__marker_tooltip",
                              ref_for: true,
                              ref_key: "activeTooltip",
                              ref: Q2,
                              style: normalizeStyle(F.value)
                            }, [
                              (E2 = A.marker) != null && E2.tooltip ? (openBlock(), createElementBlock("div", {
                                key: 0,
                                class: "dp__tooltip_content",
                                onClick: u2[0] || (u2[0] = withModifiers(() => {
                                }, ["stop"]))
                              }, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(A.marker.tooltip, (le, be) => (openBlock(), createElementBlock("div", {
                                  key: be,
                                  class: "dp__tooltip_text"
                                }, [
                                  y3.$slots["marker-tooltip"] ? renderSlot(y3.$slots, "marker-tooltip", {
                                    key: 0,
                                    tooltip: le,
                                    day: A.value
                                  }) : createCommentVNode("", true),
                                  y3.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                    createBaseVNode("div", {
                                      class: "dp__tooltip_mark",
                                      style: normalizeStyle(le.color ? { backgroundColor: le.color } : {})
                                    }, null, 4),
                                    createBaseVNode("div", null, toDisplayString(le.text), 1)
                                  ], 64))
                                ]))), 128)),
                                createBaseVNode("div", {
                                  class: "dp__arrow_bottom_tp",
                                  style: normalizeStyle(x2.value)
                                }, null, 4)
                              ])) : createCommentVNode("", true)
                            ], 4)) : createCommentVNode("", true)
                          ], 2)
                        ], 40, Sr);
                      }), 128))
                    ]))), 128))
                  ], 8, Mr)) : createCommentVNode("", true)
                ];
              }),
              _: 3
            }, 8, ["name", "css"])
          ], 64))
        ], 14, wr)
      ], 2);
    };
  }
});
var Cr = ["aria-label", "aria-disabled"];
var ln = defineComponent({
  __name: "ActionIcon",
  props: {
    ariaLabel: null,
    disabled: { type: Boolean }
  },
  emits: ["activate", "set-ref"],
  setup(e2, { emit: n }) {
    const a3 = ref(null);
    return onMounted(() => n("set-ref", a3)), (t2, o) => (openBlock(), createElementBlock("button", {
      type: "button",
      class: "dp__btn dp__month_year_col_nav",
      onClick: o[0] || (o[0] = (m3) => t2.$emit("activate")),
      onKeydown: [
        o[1] || (o[1] = withKeys((m3) => t2.$emit("activate"), ["enter"])),
        o[2] || (o[2] = withKeys((m3) => t2.$emit("activate"), ["space"]))
      ],
      tabindex: "0",
      "aria-label": e2.ariaLabel,
      "aria-disabled": e2.disabled,
      ref_key: "elRef",
      ref: a3
    }, [
      createBaseVNode("span", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: e2.disabled }])
      }, [
        renderSlot(t2.$slots, "default")
      ], 2)
    ], 40, Cr));
  }
});
var _r = ["onKeydown"];
var Nr = { class: "dp__selection_grid_header" };
var Rr = ["aria-selected", "aria-disabled", "onClick", "onKeydown", "onMouseover"];
var Or = ["aria-label", "onKeydown"];
var At = defineComponent({
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
    const t2 = e2, { setSelectionGrid: o, buildMultiLevelMatrix: m3, setMonthPicker: g } = at(), { hideNavigationButtons: N } = Le(t2), F = ref(false), C = ref(null), W = ref(null), _ = ref([]), d3 = ref(), $ = ref(null), Q2 = ref(0), x2 = ref(null);
    onBeforeUpdate(() => {
      C.value = null;
    }), onMounted(() => {
      nextTick().then(() => ce()), V(), z2(true);
    }), onUnmounted(() => z2(false));
    const z2 = (T2) => {
      var y3;
      t2.arrowNavigation && ((y3 = t2.headerRefs) != null && y3.length ? g(T2) : o(T2));
    }, V = () => {
      const T2 = $e(W);
      T2 && (t2.textInput || T2.focus({ preventScroll: true }), F.value = T2.clientHeight < T2.scrollHeight);
    }, U = computed(
      () => ({
        dp__overlay: true
      })
    ), O2 = computed(() => ({
      dp__overlay_col: true
    })), Z = (T2) => t2.skipActive ? false : T2.value === t2.modelValue, K2 = computed(() => t2.items.map((T2) => T2.filter((y3) => y3).map((y3) => {
      var r, h3, w2;
      const u2 = t2.disabledValues.some((A) => A === y3.value) || ue(y3.value), l = (r = t2.multiModelValue) != null && r.length ? (h3 = t2.multiModelValue) == null ? void 0 : h3.some(
        (A) => ge(
          A,
          setYear(
            t2.monthPicker ? setMonth(/* @__PURE__ */ new Date(), y3.value) : /* @__PURE__ */ new Date(),
            t2.monthPicker ? t2.year : y3.value
          )
        )
      ) : Z(y3);
      return {
        ...y3,
        className: {
          dp__overlay_cell_active: l,
          dp__overlay_cell: !l,
          dp__overlay_cell_disabled: u2,
          dp__overlay_cell_active_disabled: u2 && l,
          dp__overlay_cell_pad: true,
          dp__cell_in_between: (w2 = t2.multiModelValue) != null && w2.length && t2.skipActive ? R2(y3.value) : false
        }
      };
    }))), te = computed(
      () => ({
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: F.value,
        dp__button_bottom: t2.autoApply
      })
    ), re = computed(() => {
      var T2, y3;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((T2 = t2.items) == null ? void 0 : T2.length) <= 6,
        dp__container_block: ((y3 = t2.items) == null ? void 0 : y3.length) > 6
      };
    }), ue = (T2) => {
      const y3 = t2.maxValue || t2.maxValue === 0, u2 = t2.minValue || t2.minValue === 0;
      return !y3 && !u2 ? false : y3 && u2 ? +T2 > +t2.maxValue || +T2 < +t2.minValue : y3 ? +T2 > +t2.maxValue : u2 ? +T2 < +t2.minValue : false;
    }, ce = () => {
      const T2 = $e(C), y3 = $e(W), u2 = $e($), l = $e(x2), r = u2 ? u2.getBoundingClientRect().height : 0;
      y3 && (Q2.value = y3.getBoundingClientRect().height - r), T2 && l && (l.scrollTop = T2.offsetTop - l.offsetTop - (Q2.value / 2 - T2.getBoundingClientRect().height) - r);
    }, fe = (T2) => {
      !t2.disabledValues.some((y3) => y3 === T2) && !ue(T2) && (a3("update:model-value", T2), a3("selected"));
    }, R2 = (T2) => {
      const y3 = t2.monthPicker ? t2.year : T2;
      return Gn(
        t2.multiModelValue,
        setYear(
          t2.monthPicker ? setMonth(/* @__PURE__ */ new Date(), d3.value || 0) : /* @__PURE__ */ new Date(),
          t2.monthPicker ? y3 : d3.value || y3
        ),
        setYear(t2.monthPicker ? setMonth(/* @__PURE__ */ new Date(), T2) : /* @__PURE__ */ new Date(), y3)
      );
    }, b2 = () => {
      a3("toggle"), a3("reset-flow");
    }, v = () => {
      t2.escClose && b2();
    }, Y2 = (T2, y3, u2, l) => {
      T2 && (y3.value === +t2.modelValue && !t2.disabledValues.includes(y3.value) && (C.value = T2), t2.arrowNavigation && (Array.isArray(_.value[u2]) ? _.value[u2][l] = T2 : _.value[u2] = [T2], I2()));
    }, I2 = () => {
      var y3, u2;
      const T2 = (y3 = t2.headerRefs) != null && y3.length ? [t2.headerRefs].concat(_.value) : _.value.concat([t2.skipButtonRef ? [] : [$.value]]);
      m3(Se(T2), (u2 = t2.headerRefs) != null && u2.length ? "monthPicker" : "selectionGrid");
    };
    return n({ focusGrid: V }), (T2, y3) => {
      var u2;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: W,
        class: normalizeClass(unref(U)),
        role: "dialog",
        tabindex: "0",
        onKeydown: withKeys(v, ["esc"])
      }, [
        createBaseVNode("div", {
          class: normalizeClass(unref(re)),
          ref_key: "containerRef",
          ref: x2,
          role: "grid",
          style: normalizeStyle({ height: `${Q2.value}px` })
        }, [
          createBaseVNode("div", Nr, [
            renderSlot(T2.$slots, "header")
          ]),
          T2.$slots.overlay ? renderSlot(T2.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(unref(K2), (l, r) => (openBlock(), createElementBlock("div", {
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: unref(K2).length >= 3 }]),
            key: r,
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(l, (h3, w2) => (openBlock(), createElementBlock("div", {
              role: "gridcell",
              class: normalizeClass(unref(O2)),
              key: h3.value,
              "aria-selected": h3.value === e2.modelValue && !e2.disabledValues.includes(h3.value),
              "aria-disabled": h3.className.dp__overlay_cell_disabled,
              ref_for: true,
              ref: (A) => Y2(A, h3, r, w2),
              tabindex: "0",
              onClick: (A) => fe(h3.value),
              onKeydown: [
                withKeys((A) => fe(h3.value), ["enter"]),
                withKeys((A) => fe(h3.value), ["space"])
              ],
              onMouseover: (A) => d3.value = h3.value
            }, [
              createBaseVNode("div", {
                class: normalizeClass(h3.className)
              }, [
                T2.$slots.item ? renderSlot(T2.$slots, "item", {
                  key: 0,
                  item: h3
                }) : createCommentVNode("", true),
                T2.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(h3.text), 1)
                ], 64))
              ], 2)
            ], 42, Rr))), 128))
          ], 2))), 128))
        ], 6),
        T2.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("div", {
          key: 0,
          role: "button",
          "aria-label": (u2 = e2.ariaLabels) == null ? void 0 : u2.toggleOverlay,
          class: normalizeClass(unref(te)),
          tabindex: "0",
          ref_key: "toggleButton",
          ref: $,
          onClick: b2,
          onKeydown: withKeys(b2, ["enter"])
        }, [
          renderSlot(T2.$slots, "button-icon")
        ], 42, Or)), [
          [vShow, !unref(N)(e2.type)]
        ]) : createCommentVNode("", true)
      ], 42, _r);
    };
  }
});
var Ir = ["aria-label"];
var Ln = defineComponent({
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
    const a3 = e2, { transitionName: t2, showTransition: o } = Ht(a3.transitions), m3 = ref(null);
    return onMounted(() => n("set-ref", m3)), (g, N) => (openBlock(), createElementBlock(Fragment, null, [
      createBaseVNode("button", {
        type: "button",
        class: "dp__btn dp__month_year_select",
        onClick: N[0] || (N[0] = (F) => g.$emit("toggle")),
        onKeydown: [
          N[1] || (N[1] = withKeys((F) => g.$emit("toggle"), ["enter"])),
          N[2] || (N[2] = withKeys((F) => g.$emit("toggle"), ["space"]))
        ],
        "aria-label": e2.ariaLabel,
        tabindex: "0",
        ref_key: "elRef",
        ref: m3
      }, [
        renderSlot(g.$slots, "default")
      ], 40, Ir),
      createVNode(Transition, {
        name: unref(t2)(e2.showSelectionGrid),
        css: unref(o)
      }, {
        default: withCtx(() => [
          e2.showSelectionGrid ? (openBlock(), createBlock(At, mergeProps({ key: 0 }, {
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
            "onUpdate:modelValue": N[3] || (N[3] = (F) => g.$emit("update:model-value", F)),
            onToggle: N[4] || (N[4] = (F) => g.$emit("toggle"))
          }), createSlots({
            "button-icon": withCtx(() => [
              g.$slots["calendar-icon"] ? renderSlot(g.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
              g.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wt), { key: 1 }))
            ]),
            _: 2
          }, [
            g.$slots[e2.slotName] ? {
              name: "item",
              fn: withCtx(({ item: F }) => [
                renderSlot(g.$slots, e2.slotName, { item: F })
              ]),
              key: "0"
            } : void 0,
            g.$slots[e2.overlaySlot] ? {
              name: "overlay",
              fn: withCtx(() => [
                renderSlot(g.$slots, e2.overlaySlot)
              ]),
              key: "1"
            } : void 0,
            g.$slots[`${e2.overlaySlot}-header`] ? {
              name: "header",
              fn: withCtx(() => [
                renderSlot(g.$slots, `${e2.overlaySlot}-header`)
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
var Br = { class: "dp__month_year_row" };
var Yr = { class: "dp__month_picker_header" };
var Vr = ["aria-label"];
var Er = ["aria-label"];
var Lr = ["aria-label"];
var Fr = defineComponent({
  __name: "MonthYearPicker",
  props: {
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    instance: { type: Number, default: 0 },
    years: { type: Array, default: () => [] },
    months: { type: Array, default: () => [] },
    internalModelValue: { type: [Date, Array], default: null },
    ...rt
  },
  emits: ["update-month-year", "month-year-select", "mount", "reset-flow", "overlay-closed"],
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { defaults: o } = Le(t2), { transitionName: m3, showTransition: g } = Ht(o.value.transitions), { buildMatrix: N } = at(), { handleMonthYearChange: F, isDisabled: C, updateMonthYear: W } = sr(t2, a3), _ = ref(false), d3 = ref(false), $ = ref([null, null, null, null]), Q2 = ref(null), x2 = ref(null), z2 = ref(null);
    onMounted(() => {
      a3("mount");
    });
    const V = (c2) => ({
      get: () => t2[c2],
      set: (P) => {
        const f = c2 === "month" ? "year" : "month";
        a3("update-month-year", { [c2]: P, [f]: t2[f] }), a3("month-year-select", c2 === "year"), c2 === "month" ? l(true) : r(true);
      }
    }), U = computed(V("month")), O2 = computed(V("year")), Z = (c2) => {
      const P = getYear(M3(c2));
      return t2.year === P;
    }, K2 = computed(() => t2.monthPicker ? Array.isArray(t2.disabledDates) ? t2.disabledDates.map((c2) => M3(c2)).filter((c2) => Z(c2)).map((c2) => getMonth(c2)) : [] : []), te = computed(() => (c2) => {
      const P = c2 === "month";
      return {
        showSelectionGrid: (P ? _ : d3).value,
        items: (P ? I2 : T2).value,
        disabledValues: o.value.filters[P ? "months" : "years"].concat(K2.value),
        minValue: (P ? fe : ue).value,
        maxValue: (P ? R2 : ce).value,
        headerRefs: P && t2.monthPicker ? [Q2.value, x2.value, z2.value] : [],
        escClose: t2.escClose,
        transitions: o.value.transitions,
        ariaLabels: o.value.ariaLabels,
        textInput: t2.textInput,
        autoApply: t2.autoApply,
        arrowNavigation: t2.arrowNavigation,
        hideNavigation: t2.hideNavigation
      };
    }), re = computed(() => (c2) => ({
      month: t2.month,
      year: t2.year,
      items: c2 === "month" ? t2.months : t2.years,
      instance: t2.instance,
      updateMonthYear: W,
      toggle: c2 === "month" ? l : r
    })), ue = computed(() => t2.minDate ? getYear(M3(t2.minDate)) : null), ce = computed(() => t2.maxDate ? getYear(M3(t2.maxDate)) : null), fe = computed(() => {
      if (t2.minDate && ue.value) {
        if (ue.value > t2.year)
          return 12;
        if (ue.value === t2.year)
          return getMonth(M3(t2.minDate));
      }
      return null;
    }), R2 = computed(() => t2.maxDate && ce.value ? ce.value < t2.year ? -1 : ce.value === t2.year ? getMonth(M3(t2.maxDate)) : null : null), b2 = computed(() => (t2.range || t2.multiDates) && t2.internalModelValue && (t2.monthPicker || t2.yearPicker) ? t2.internalModelValue : []), v = (c2) => {
      const P = [], f = (E2) => E2;
      for (let E2 = 0; E2 < c2.length; E2 += 3) {
        const le = [c2[E2], c2[E2 + 1], c2[E2 + 2]];
        P.push(f(le));
      }
      return P;
    }, Y2 = computed(() => {
      const c2 = t2.months.find((P) => P.value === t2.month);
      return c2 || { text: "", value: 0 };
    }), I2 = computed(() => v(t2.months)), T2 = computed(() => v(t2.years)), y3 = computed(() => o.value.multiCalendars ? t2.multiCalendarsSolo ? true : t2.instance === 0 : true), u2 = computed(() => o.value.multiCalendars ? t2.multiCalendarsSolo ? true : t2.instance === o.value.multiCalendars - 1 : true), l = (c2 = false) => {
      h3(c2), _.value = !_.value, _.value || a3("overlay-closed");
    }, r = (c2 = false) => {
      h3(c2), d3.value = !d3.value, d3.value || a3("overlay-closed");
    }, h3 = (c2) => {
      c2 || a3("reset-flow");
    }, w2 = (c2 = false) => {
      C.value(c2) || a3("update-month-year", {
        year: c2 ? t2.year + 1 : t2.year - 1,
        month: t2.month,
        fromNav: true
      });
    }, A = (c2, P) => {
      t2.arrowNavigation && ($.value[P] = $e(c2), N($.value, "monthYear"));
    };
    return n({
      toggleMonthPicker: l,
      toggleYearPicker: r,
      handleMonthYearChange: F
    }), (c2, P) => {
      var f, E2, le, be, He;
      return openBlock(), createElementBlock("div", Br, [
        c2.$slots["month-year"] ? renderSlot(c2.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, { month: e2.month, year: e2.year, months: e2.months, years: e2.years, updateMonthYear: unref(W), handleMonthYearChange: unref(F), instance: e2.instance }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          !c2.monthPicker && !c2.yearPicker ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            unref(y3) && !c2.vertical ? (openBlock(), createBlock(ln, {
              key: 0,
              "aria-label": (f = unref(o).ariaLabels) == null ? void 0 : f.prevMonth,
              disabled: unref(C)(false),
              onActivate: P[0] || (P[0] = (ne) => unref(F)(false)),
              onSetRef: P[1] || (P[1] = (ne) => A(ne, 0))
            }, {
              default: withCtx(() => [
                c2.$slots["arrow-left"] ? renderSlot(c2.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                c2.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Mn), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass(["dp__month_year_wrap", {
                dp__year_disable_select: t2.disableYearSelect
              }])
            }, [
              createVNode(Ln, mergeProps({
                type: "month",
                "slot-name": "month-overlay-val",
                "overlay-slot": "overlay-month",
                "aria-label": (E2 = unref(o).ariaLabels) == null ? void 0 : E2.openMonthsOverlay,
                modelValue: unref(U),
                "onUpdate:modelValue": P[2] || (P[2] = (ne) => isRef(U) ? U.value = ne : null)
              }, unref(te)("month"), {
                onToggle: l,
                onSetRef: P[3] || (P[3] = (ne) => A(ne, 1))
              }), createSlots({
                default: withCtx(() => [
                  c2.$slots.month ? renderSlot(c2.$slots, "month", normalizeProps(mergeProps({ key: 0 }, unref(Y2)))) : createCommentVNode("", true),
                  c2.$slots.month ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(unref(Y2).text), 1)
                  ], 64))
                ]),
                _: 2
              }, [
                c2.$slots["calendar-icon"] ? {
                  name: "calendar-icon",
                  fn: withCtx(() => [
                    renderSlot(c2.$slots, "calendar-icon")
                  ]),
                  key: "0"
                } : void 0,
                c2.$slots["month-overlay-value"] ? {
                  name: "month-overlay-val",
                  fn: withCtx(({ item: ne }) => [
                    renderSlot(c2.$slots, "month-overlay-value", {
                      text: ne.text,
                      value: ne.value
                    })
                  ]),
                  key: "1"
                } : void 0,
                c2.$slots["month-overlay"] ? {
                  name: "overlay-month",
                  fn: withCtx(() => [
                    renderSlot(c2.$slots, "month-overlay", normalizeProps(guardReactiveProps(unref(re)("month"))))
                  ]),
                  key: "2"
                } : void 0,
                c2.$slots["month-overlay-header"] ? {
                  name: "overlay-month-header",
                  fn: withCtx(() => [
                    renderSlot(c2.$slots, "month-overlay-header", { toggle: l })
                  ]),
                  key: "3"
                } : void 0
              ]), 1040, ["aria-label", "modelValue"]),
              t2.disableYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(Ln, mergeProps({
                key: 0,
                type: "year",
                "slot-name": "year-overlay-val",
                "overlay-slot": "overlay-year",
                "aria-label": (le = unref(o).ariaLabels) == null ? void 0 : le.openYearsOverlay,
                modelValue: unref(O2),
                "onUpdate:modelValue": P[4] || (P[4] = (ne) => isRef(O2) ? O2.value = ne : null)
              }, unref(te)("year"), {
                onToggle: r,
                onSetRef: P[5] || (P[5] = (ne) => A(ne, 2))
              }), createSlots({
                default: withCtx(() => [
                  c2.$slots.year ? renderSlot(c2.$slots, "year", {
                    key: 0,
                    year: e2.year
                  }) : createCommentVNode("", true),
                  c2.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(e2.year), 1)
                  ], 64))
                ]),
                _: 2
              }, [
                c2.$slots["calendar-icon"] ? {
                  name: "calendar-icon",
                  fn: withCtx(() => [
                    renderSlot(c2.$slots, "calendar-icon")
                  ]),
                  key: "0"
                } : void 0,
                c2.$slots["year-overlay-value"] ? {
                  name: "year-overlay-val",
                  fn: withCtx(({ item: ne }) => [
                    renderSlot(c2.$slots, "year-overlay-value", {
                      text: ne.text,
                      value: ne.value
                    })
                  ]),
                  key: "1"
                } : void 0,
                c2.$slots["year-overlay"] ? {
                  name: "overlay-year",
                  fn: withCtx(() => [
                    renderSlot(c2.$slots, "year-overlay", normalizeProps(guardReactiveProps(unref(re)("year"))))
                  ]),
                  key: "2"
                } : void 0,
                c2.$slots["year-overlay-header"] ? {
                  name: "overlay-year-header",
                  fn: withCtx(() => [
                    renderSlot(c2.$slots, "year-overlay-header", { toggle: r })
                  ]),
                  key: "3"
                } : void 0
              ]), 1040, ["aria-label", "modelValue"]))
            ], 2),
            unref(y3) && c2.vertical ? (openBlock(), createBlock(ln, {
              key: 1,
              "aria-label": (be = unref(o).ariaLabels) == null ? void 0 : be.prevMonth,
              disabled: unref(C)(false),
              onActivate: P[6] || (P[6] = (ne) => unref(F)(false))
            }, {
              default: withCtx(() => [
                c2.$slots["arrow-up"] ? renderSlot(c2.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                c2.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Kn), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
            unref(u2) ? (openBlock(), createBlock(ln, {
              key: 2,
              ref: "rightIcon",
              disabled: unref(C)(true),
              "aria-label": (He = unref(o).ariaLabels) == null ? void 0 : He.nextMonth,
              onActivate: P[7] || (P[7] = (ne) => unref(F)(true)),
              onSetRef: P[8] || (P[8] = (ne) => A(ne, 3))
            }, {
              default: withCtx(() => [
                c2.$slots[c2.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(c2.$slots, c2.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
                c2.$slots[c2.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(c2.vertical ? unref(jn) : unref(Tn)), { key: 1 }))
              ]),
              _: 3
            }, 8, ["disabled", "aria-label"])) : createCommentVNode("", true)
          ], 64)) : createCommentVNode("", true),
          c2.monthPicker ? (openBlock(), createBlock(At, mergeProps({ key: 1 }, unref(te)("month"), {
            "skip-active": c2.range,
            year: e2.year,
            "multi-model-value": unref(b2),
            "month-picker": "",
            modelValue: unref(U),
            "onUpdate:modelValue": P[17] || (P[17] = (ne) => isRef(U) ? U.value = ne : null),
            onToggle: l,
            onSelected: P[18] || (P[18] = (ne) => c2.$emit("overlay-closed"))
          }), createSlots({
            header: withCtx(() => {
              var ne, Fe, Ge;
              return [
                createBaseVNode("div", Yr, [
                  createBaseVNode("div", {
                    class: "dp__month_year_col_nav",
                    tabindex: "0",
                    ref_key: "mpPrevIconRef",
                    ref: Q2,
                    onClick: P[9] || (P[9] = (Te) => w2(false)),
                    onKeydown: P[10] || (P[10] = withKeys((Te) => w2(false), ["enter"]))
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: unref(C)(false) }]),
                      role: "button",
                      "aria-label": (ne = unref(o).ariaLabels) == null ? void 0 : ne.prevMonth
                    }, [
                      c2.$slots["arrow-left"] ? renderSlot(c2.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                      c2.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Mn), { key: 1 }))
                    ], 10, Vr)
                  ], 544),
                  createBaseVNode("div", {
                    class: "dp__pointer",
                    role: "button",
                    ref_key: "mpYearButtonRef",
                    ref: x2,
                    "aria-label": (Fe = unref(o).ariaLabels) == null ? void 0 : Fe.openYearsOverlay,
                    tabindex: "0",
                    onClick: P[11] || (P[11] = () => r(false)),
                    onKeydown: P[12] || (P[12] = withKeys(() => r(false), ["enter"]))
                  }, [
                    c2.$slots.year ? renderSlot(c2.$slots, "year", {
                      key: 0,
                      year: e2.year
                    }) : createCommentVNode("", true),
                    c2.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      createTextVNode(toDisplayString(e2.year), 1)
                    ], 64))
                  ], 40, Er),
                  createBaseVNode("div", {
                    class: "dp__month_year_col_nav",
                    tabindex: "0",
                    ref_key: "mpNextIconRef",
                    ref: z2,
                    onClick: P[13] || (P[13] = (Te) => w2(true)),
                    onKeydown: P[14] || (P[14] = withKeys((Te) => w2(true), ["enter"]))
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: unref(C)(true) }]),
                      role: "button",
                      "aria-label": (Ge = unref(o).ariaLabels) == null ? void 0 : Ge.nextMonth
                    }, [
                      c2.$slots["arrow-right"] ? renderSlot(c2.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
                      c2.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Tn), { key: 1 }))
                    ], 10, Lr)
                  ], 544)
                ]),
                createVNode(Transition, {
                  name: unref(m3)(d3.value),
                  css: unref(g)
                }, {
                  default: withCtx(() => [
                    d3.value ? (openBlock(), createBlock(At, mergeProps({ key: 0 }, unref(te)("year"), {
                      modelValue: unref(O2),
                      "onUpdate:modelValue": P[15] || (P[15] = (Te) => isRef(O2) ? O2.value = Te : null),
                      onToggle: r,
                      onSelected: P[16] || (P[16] = (Te) => c2.$emit("overlay-closed"))
                    }), createSlots({
                      "button-icon": withCtx(() => [
                        c2.$slots["calendar-icon"] ? renderSlot(c2.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        c2.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wt), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      c2.$slots["year-overlay-value"] ? {
                        name: "item",
                        fn: withCtx(({ item: Te }) => [
                          renderSlot(c2.$slots, "year-overlay-value", {
                            text: Te.text,
                            value: Te.value
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
            c2.$slots["month-overlay-value"] ? {
              name: "item",
              fn: withCtx(({ item: ne }) => [
                renderSlot(c2.$slots, "month-overlay-value", {
                  text: ne.text,
                  value: ne.value
                })
              ]),
              key: "0"
            } : void 0
          ]), 1040, ["skip-active", "year", "multi-model-value", "modelValue"])) : createCommentVNode("", true),
          c2.yearPicker ? (openBlock(), createBlock(At, mergeProps({ key: 2 }, unref(te)("year"), {
            modelValue: unref(O2),
            "onUpdate:modelValue": P[19] || (P[19] = (ne) => isRef(O2) ? O2.value = ne : null),
            "multi-model-value": unref(b2),
            "skip-active": c2.range,
            "skip-button-ref": "",
            "year-picker": "",
            onToggle: r,
            onSelected: P[20] || (P[20] = (ne) => c2.$emit("overlay-closed"))
          }), createSlots({ _: 2 }, [
            c2.$slots["year-overlay-value"] ? {
              name: "item",
              fn: withCtx(({ item: ne }) => [
                renderSlot(c2.$slots, "year-overlay-value", {
                  text: ne.text,
                  value: ne.value
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
var Ur = {
  key: 0,
  class: "dp__time_input"
};
var Wr = ["aria-label", "onKeydown", "onClick"];
var Hr = ["aria-label", "onKeydown", "onClick"];
var xr = ["aria-label", "onKeydown", "onClick"];
var zr = { key: 0 };
var Kr = ["aria-label", "onKeydown"];
var jr = defineComponent({
  __name: "TimeInput",
  props: {
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 },
    seconds: { type: Number, default: 0 },
    closeTimePickerBtn: { type: Object, default: null },
    order: { type: Number, default: 0 },
    ...rt
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
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { setTimePickerElements: o, setTimePickerBackRef: m3 } = at(), { defaults: g } = Le(t2), { transitionName: N, showTransition: F } = Ht(g.value.transitions), C = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), W = ref("AM"), _ = ref(null), d3 = ref([]);
    onMounted(() => {
      a3("mounted");
    });
    const $ = (l) => set(/* @__PURE__ */ new Date(), {
      hours: l.hours,
      minutes: l.minutes,
      seconds: t2.enableSeconds ? l.seconds : 0,
      milliseconds: 0
    }), Q2 = computed(() => ({ hours: t2.hours, minutes: t2.minutes, seconds: t2.seconds })), x2 = computed(() => (l) => !ue(+t2[l] + +t2[`${l}Increment`], l)), z2 = computed(() => (l) => !ue(+t2[l] - +t2[`${l}Increment`], l)), V = (l, r) => add(set(M3(), l), r), U = (l, r) => sub(set(M3(), l), r), O2 = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_reg: !t2.enableSeconds && t2.is24,
        dp__time_col_reg_with_button: !t2.enableSeconds && !t2.is24,
        dp__time_col_sec: t2.enableSeconds && t2.is24,
        dp__time_col_sec_with_button: t2.enableSeconds && !t2.is24
      })
    ), Z = computed(() => {
      const l = [{ type: "hours" }, { type: "", separator: true }, { type: "minutes" }];
      return t2.enableSeconds ? l.concat([{ type: "", separator: true }, { type: "seconds" }]) : l;
    }), K2 = computed(() => Z.value.filter((l) => !l.separator)), te = computed(() => (l) => {
      if (l === "hours") {
        const r = Y2(+t2.hours);
        return { text: r < 10 ? `0${r}` : `${r}`, value: r };
      }
      return { text: t2[l] < 10 ? `0${t2[l]}` : `${t2[l]}`, value: t2[l] };
    }), re = (l) => {
      const r = t2.is24 ? 24 : 12, h3 = l === "hours" ? r : 60, w2 = +t2[`${l}GridIncrement`], A = l === "hours" && !t2.is24 ? w2 : 0, c2 = [];
      for (let P = A; P < h3; P += w2)
        c2.push({ value: P, text: P < 10 ? `0${P}` : `${P}` });
      return l === "hours" && !t2.is24 && c2.push({ value: 0, text: "12" }), Ka(c2);
    }, ue = (l, r) => {
      const h3 = t2.minTime ? $(qt(t2.minTime)) : null, w2 = t2.maxTime ? $(qt(t2.maxTime)) : null, A = $(qt(Q2.value, r, l));
      return h3 && w2 ? (isBefore(A, w2) || isEqual(A, w2)) && (isAfter(A, h3) || isEqual(A, h3)) : h3 ? isAfter(A, h3) || isEqual(A, h3) : w2 ? isBefore(A, w2) || isEqual(A, w2) : true;
    }, ce = computed(() => (l) => re(l).flat().filter((h3) => h3 || h3.value === 0).map((h3) => h3.value).filter((h3) => !ue(h3, l))), fe = (l) => t2[`no${l[0].toUpperCase() + l.slice(1)}Overlay`], R2 = (l) => {
      fe(l) || (C[l] = !C[l], C[l] || a3("overlay-closed"));
    }, b2 = (l) => l === "hours" ? getHours : l === "minutes" ? getMinutes : getSeconds, v = (l, r = true) => {
      const h3 = r ? V : U, w2 = r ? +t2[`${l}Increment`] : -+t2[`${l}Increment`];
      ue(+t2[l] + w2, l) && a3(
        `update:${l}`,
        b2(l)(h3({ [l]: +t2[l] }, { [l]: +t2[`${l}Increment`] }))
      );
    }, Y2 = (l) => t2.is24 ? l : (l >= 12 ? W.value = "PM" : W.value = "AM", qa(l)), I2 = () => {
      W.value === "PM" ? (W.value = "AM", a3("update:hours", t2.hours - 12)) : (W.value = "PM", a3("update:hours", t2.hours + 12)), a3("am-pm-change", W.value);
    }, T2 = (l) => {
      C[l] = true;
    }, y3 = (l, r, h3) => {
      if (l && t2.arrowNavigation) {
        Array.isArray(d3.value[r]) ? d3.value[r][h3] = l : d3.value[r] = [l];
        const w2 = d3.value.reduce(
          (A, c2) => c2.map((P, f) => [...A[f] || [], c2[f]]),
          []
        );
        m3(t2.closeTimePickerBtn), _.value && (w2[1] = w2[1].concat(_.value)), o(w2, t2.order);
      }
    }, u2 = (l, r) => l === "hours" && !t2.is24 ? a3(`update:${l}`, W.value === "PM" ? r + 12 : r) : a3(`update:${l}`, r);
    return n({ openChildCmp: T2 }), (l, r) => {
      var h3;
      return l.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Ur, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(Z), (w2, A) => {
          var c2, P, f;
          return openBlock(), createElementBlock("div", {
            key: A,
            class: normalizeClass(unref(O2))
          }, [
            w2.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(" : ")
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: true,
                  dp__inc_dec_button_disabled: unref(x2)(w2.type)
                }),
                "aria-label": (c2 = unref(g).ariaLabels) == null ? void 0 : c2.incrementValue(w2.type),
                tabindex: "0",
                onKeydown: [
                  withKeys((E2) => v(w2.type), ["enter"]),
                  withKeys((E2) => v(w2.type), ["space"])
                ],
                onClick: (E2) => v(w2.type),
                ref_for: true,
                ref: (E2) => y3(E2, A, 0)
              }, [
                l.$slots["arrow-up"] ? renderSlot(l.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                l.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Kn), { key: 1 }))
              ], 42, Wr),
              createBaseVNode("button", {
                type: "button",
                "aria-label": (P = unref(g).ariaLabels) == null ? void 0 : P.openTpOverlay(w2.type),
                class: normalizeClass(["dp__btn", fe(w2.type) ? "" : "dp__time_display"]),
                tabindex: "0",
                onKeydown: [
                  withKeys((E2) => R2(w2.type), ["enter"]),
                  withKeys((E2) => R2(w2.type), ["space"])
                ],
                onClick: (E2) => R2(w2.type),
                ref_for: true,
                ref: (E2) => y3(E2, A, 1)
              }, [
                l.$slots[w2.type] ? renderSlot(l.$slots, w2.type, {
                  key: 0,
                  text: unref(te)(w2.type).text,
                  value: unref(te)(w2.type).value
                }) : createCommentVNode("", true),
                l.$slots[w2.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(unref(te)(w2.type).text), 1)
                ], 64))
              ], 42, Hr),
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: true,
                  dp__inc_dec_button_disabled: unref(z2)(w2.type)
                }),
                "aria-label": (f = unref(g).ariaLabels) == null ? void 0 : f.decrementValue(w2.type),
                tabindex: "0",
                onKeydown: [
                  withKeys((E2) => v(w2.type, false), ["enter"]),
                  withKeys((E2) => v(w2.type, false), ["space"])
                ],
                onClick: (E2) => v(w2.type, false),
                ref_for: true,
                ref: (E2) => y3(E2, A, 2)
              }, [
                l.$slots["arrow-down"] ? renderSlot(l.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                l.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(jn), { key: 1 }))
              ], 42, xr)
            ], 64))
          ], 2);
        }), 128)),
        l.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", zr, [
          l.$slots["am-pm-button"] ? renderSlot(l.$slots, "am-pm-button", {
            key: 0,
            toggle: I2,
            value: W.value
          }) : createCommentVNode("", true),
          l.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: _,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (h3 = unref(g).ariaLabels) == null ? void 0 : h3.amPmButton,
            tabindex: "0",
            onClick: I2,
            onKeydown: [
              withKeys(withModifiers(I2, ["prevent"]), ["enter"]),
              withKeys(withModifiers(I2, ["prevent"]), ["space"])
            ]
          }, toDisplayString(W.value), 41, Kr))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(K2), (w2, A) => (openBlock(), createBlock(Transition, {
          key: A,
          name: unref(N)(C[w2.type]),
          css: unref(F)
        }, {
          default: withCtx(() => [
            C[w2.type] ? (openBlock(), createBlock(At, {
              key: 0,
              items: re(w2.type),
              "disabled-values": unref(g).filters.times[w2.type].concat(unref(ce)(w2.type)),
              "esc-close": l.escClose,
              "aria-labels": unref(g).ariaLabels,
              "hide-navigation": l.hideNavigation,
              "onUpdate:modelValue": (c2) => u2(w2.type, c2),
              onSelected: (c2) => R2(w2.type),
              onToggle: (c2) => R2(w2.type),
              onResetFlow: r[0] || (r[0] = (c2) => l.$emit("reset-flow")),
              type: w2.type
            }, createSlots({
              "button-icon": withCtx(() => [
                l.$slots["clock-icon"] ? renderSlot(l.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                l.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(zn), { key: 1 }))
              ]),
              _: 2
            }, [
              l.$slots[`${w2.type}-overlay-value`] ? {
                name: "item",
                fn: withCtx(({ item: c2 }) => [
                  renderSlot(l.$slots, `${w2.type}-overlay-value`, {
                    text: c2.text,
                    value: c2.value
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
var Gr = ["aria-label"];
var Zr = { class: "dp__overlay_container dp__container_flex dp__time_picker_overlay_container" };
var qr = {
  key: 1,
  class: "dp__overlay_row dp__flex_row"
};
var Xr = ["aria-label"];
var Jr = defineComponent({
  __name: "TimePicker",
  props: {
    hours: { type: [Number, Array], default: 0 },
    minutes: { type: [Number, Array], default: 0 },
    seconds: { type: [Number, Array], default: 0 },
    internalModelValue: { type: [Date, Array], default: null },
    ...rt
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
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { buildMatrix: o, setTimePicker: m3 } = at(), g = useSlots(), { hideNavigationButtons: N, defaults: F } = Le(t2), { transitionName: C, showTransition: W } = Ht(F.value.transitions), _ = ref(null), d3 = ref(null), $ = ref([]), Q2 = ref(null);
    onMounted(() => {
      a3("mount"), !t2.timePicker && t2.arrowNavigation ? o([$e(_.value)], "time") : m3(true, t2.timePicker);
    });
    const x2 = computed(() => t2.range && t2.modelAuto ? Qn(t2.internalModelValue) : true), z2 = ref(false), V = (R2) => ({
      hours: Array.isArray(t2.hours) ? t2.hours[R2] : t2.hours,
      minutes: Array.isArray(t2.minutes) ? t2.minutes[R2] : t2.minutes,
      seconds: Array.isArray(t2.seconds) ? t2.seconds[R2] : t2.seconds
    }), U = computed(() => {
      const R2 = [];
      if (t2.range)
        for (let b2 = 0; b2 < 2; b2++)
          R2.push(V(b2));
      else
        R2.push(V(0));
      return R2;
    }), O2 = (R2, b2 = false, v = "") => {
      b2 || a3("reset-flow"), z2.value = R2, a3(R2 ? "overlay-opened" : "overlay-closed"), t2.arrowNavigation && m3(R2), nextTick(() => {
        v !== "" && $.value[0] && $.value[0].openChildCmp(v);
      });
    }, Z = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: t2.autoApply && !t2.keepActionRow
    })), K2 = ft(g, "timePicker"), te = (R2, b2, v) => t2.range ? b2 === 0 ? [R2, U.value[1][v]] : [U.value[0][v], R2] : R2, re = (R2) => {
      a3("update:hours", R2);
    }, ue = (R2) => {
      a3("update:minutes", R2);
    }, ce = (R2) => {
      a3("update:seconds", R2);
    }, fe = () => {
      Q2.value && t2.arrowNavigation && Q2.value.focus({ preventScroll: true });
    };
    return n({ toggleTimePicker: O2 }), (R2, b2) => {
      var v;
      return openBlock(), createElementBlock("div", null, [
        R2.timePicker ? createCommentVNode("", true) : withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          class: normalizeClass(unref(Z)),
          "aria-label": (v = unref(F).ariaLabels) == null ? void 0 : v.openTimePicker,
          tabindex: "0",
          ref_key: "openTimePickerBtn",
          ref: _,
          onKeydown: [
            b2[0] || (b2[0] = withKeys((Y2) => O2(true), ["enter"])),
            b2[1] || (b2[1] = withKeys((Y2) => O2(true), ["space"]))
          ],
          onClick: b2[2] || (b2[2] = (Y2) => O2(true))
        }, [
          R2.$slots["clock-icon"] ? renderSlot(R2.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          R2.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(zn), { key: 1 }))
        ], 42, Gr)), [
          [vShow, !unref(N)("time")]
        ]),
        createVNode(Transition, {
          name: unref(C)(z2.value),
          css: unref(W)
        }, {
          default: withCtx(() => {
            var Y2;
            return [
              z2.value || R2.timePicker ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "dp__overlay",
                ref_key: "overlayRef",
                ref: Q2,
                tabindex: "0"
              }, [
                createBaseVNode("div", Zr, [
                  R2.$slots["time-picker-overlay"] ? renderSlot(R2.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e2.hours,
                    minutes: e2.minutes,
                    seconds: e2.seconds,
                    setHours: re,
                    setMinutes: ue,
                    setSeconds: ce
                  }) : createCommentVNode("", true),
                  R2.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", qr, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(U), (I2, T2) => withDirectives((openBlock(), createBlock(jr, mergeProps({ key: T2 }, {
                      ...R2.$props,
                      order: T2,
                      hours: I2.hours,
                      minutes: I2.minutes,
                      seconds: I2.seconds,
                      closeTimePickerBtn: d3.value,
                      disabled: T2 === 0 ? R2.fixedStart : R2.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: $,
                      "onUpdate:hours": (y3) => re(te(y3, T2, "hours")),
                      "onUpdate:minutes": (y3) => ue(te(y3, T2, "minutes")),
                      "onUpdate:seconds": (y3) => ce(te(y3, T2, "seconds")),
                      onMounted: fe,
                      onOverlayClosed: fe,
                      onAmPmChange: b2[3] || (b2[3] = (y3) => R2.$emit("am-pm-change", y3))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(K2), (y3, u2) => ({
                        name: y3,
                        fn: withCtx((l) => [
                          renderSlot(R2.$slots, y3, normalizeProps(guardReactiveProps(l)))
                        ])
                      }))
                    ]), 1040, ["onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, T2 === 0 ? true : unref(x2)]
                    ])), 128))
                  ])),
                  R2.timePicker ? createCommentVNode("", true) : withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    type: "button",
                    ref_key: "closeTimePickerBtn",
                    ref: d3,
                    class: normalizeClass(unref(Z)),
                    "aria-label": (Y2 = unref(F).ariaLabels) == null ? void 0 : Y2.closeTimePicker,
                    tabindex: "0",
                    onKeydown: [
                      b2[4] || (b2[4] = withKeys((I2) => O2(false), ["enter"])),
                      b2[5] || (b2[5] = withKeys((I2) => O2(false), ["space"]))
                    ],
                    onClick: b2[6] || (b2[6] = (I2) => O2(false))
                  }, [
                    R2.$slots["calendar-icon"] ? renderSlot(R2.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    R2.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wt), { key: 1 }))
                  ], 42, Xr)), [
                    [vShow, !unref(N)("time")]
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
var Qr = (e2, n) => {
  const { isDisabled: a3, matchDate: t2, getWeekFromDate: o, defaults: m3 } = Le(n), g = ref(null), N = ref(M3()), F = (r) => {
    !r.current && n.hideOffsetDates || (g.value = r.value);
  }, C = () => {
    g.value = null;
  }, W = (r) => Array.isArray(e2.value) && n.range && e2.value[0] && g.value ? r ? Ve(g.value, e2.value[0]) : Ie(g.value, e2.value[0]) : true, _ = (r, h3) => {
    const w2 = () => e2.value ? h3 ? e2.value[0] || null : e2.value[1] : null, A = e2.value && Array.isArray(e2.value) ? w2() : null;
    return ge(M3(r.value), A);
  }, d3 = (r) => {
    const h3 = Array.isArray(e2.value) ? e2.value[0] : null;
    return r ? !Ie(g.value || null, h3) : true;
  }, $ = (r, h3 = true) => (n.range || n.weekPicker) && Array.isArray(e2.value) && e2.value.length === 2 ? n.hideOffsetDates && !r.current ? false : ge(M3(r.value), e2.value[h3 ? 0 : 1]) : n.range ? _(r, h3) && d3(h3) || ge(r.value, Array.isArray(e2.value) ? e2.value[0] : null) && W(h3) : false, Q2 = (r, h3, w2) => Array.isArray(e2.value) && e2.value[0] && e2.value.length === 1 ? r ? false : w2 ? Ve(e2.value[0], h3.value) : Ie(e2.value[0], h3.value) : false, x2 = (r) => !e2.value || n.hideOffsetDates && !r.current ? false : n.range ? n.modelAuto && Array.isArray(e2.value) ? ge(r.value, e2.value[0] ? e2.value[0] : N.value) : false : n.multiDates && Array.isArray(e2.value) ? e2.value.some((h3) => ge(h3, r.value)) : ge(r.value, e2.value ? e2.value : N.value), z2 = (r) => {
    if (n.autoRange || n.weekPicker) {
      if (g.value) {
        if (n.hideOffsetDates && !r.current)
          return false;
        const h3 = addDays(g.value, +n.autoRange), w2 = o(M3(g.value));
        return n.weekPicker ? ge(w2[1], M3(r.value)) : ge(h3, M3(r.value));
      }
      return false;
    }
    return false;
  }, V = (r) => {
    if (n.autoRange || n.weekPicker) {
      if (g.value) {
        const h3 = addDays(g.value, +n.autoRange);
        if (n.hideOffsetDates && !r.current)
          return false;
        const w2 = o(M3(g.value));
        return n.weekPicker ? Ve(r.value, w2[0]) && Ie(r.value, w2[1]) : Ve(r.value, g.value) && Ie(r.value, h3);
      }
      return false;
    }
    return false;
  }, U = (r) => {
    if (n.autoRange || n.weekPicker) {
      if (g.value) {
        if (n.hideOffsetDates && !r.current)
          return false;
        const h3 = o(M3(g.value));
        return n.weekPicker ? ge(h3[0], r.value) : ge(g.value, r.value);
      }
      return false;
    }
    return false;
  }, O2 = (r) => Gn(e2.value, g.value, r.value), Z = () => n.modelAuto && Array.isArray(n.internalModelValue) ? !!n.internalModelValue[0] : false, K2 = () => n.modelAuto ? Qn(n.internalModelValue) : true, te = (r) => {
    if (Array.isArray(e2.value) && e2.value.length || n.weekPicker)
      return false;
    const h3 = n.range ? !$(r) && !$(r, false) : true;
    return !a3(r.value) && !x2(r) && !(!r.current && n.hideOffsetDates) && h3;
  }, re = (r) => n.range ? n.modelAuto ? Z() && x2(r) : false : x2(r), ue = (r) => n.highlight ? t2(r.value, n.highlight) : false, ce = (r) => a3(r.value) && n.highlightDisabledDays === false, fe = (r) => n.highlightWeekDays && n.highlightWeekDays.includes(r.value.getDay()), R2 = (r) => (n.range || n.weekPicker) && (!(m3.value.multiCalendars > 0) || r.current) && K2() && !(!r.current && n.hideOffsetDates) && !x2(r) ? O2(r) : false, b2 = (r) => {
    const { isRangeStart: h3, isRangeEnd: w2 } = I2(r), A = n.range ? h3 || w2 : false;
    return {
      dp__cell_offset: !r.current,
      dp__pointer: !n.disabled && !(!r.current && n.hideOffsetDates) && !a3(r.value),
      dp__cell_disabled: a3(r.value),
      dp__cell_highlight: !ce(r) && (ue(r) || fe(r)) && !re(r) && !A,
      dp__cell_highlight_active: !ce(r) && (ue(r) || fe(r)) && re(r),
      dp__today: !n.noToday && ge(r.value, N.value) && r.current
    };
  }, v = (r) => ({
    dp__active_date: re(r),
    dp__date_hover: te(r)
  }), Y2 = (r) => ({
    ...T2(r),
    ...y3(r),
    dp__range_between_week: R2(r) && n.weekPicker
  }), I2 = (r) => {
    const h3 = m3.value.multiCalendars > 0 ? r.current && $(r) && K2() : $(r) && K2(), w2 = m3.value.multiCalendars > 0 ? r.current && $(r, false) && K2() : $(r, false) && K2();
    return { isRangeStart: h3, isRangeEnd: w2 };
  }, T2 = (r) => {
    const { isRangeStart: h3, isRangeEnd: w2 } = I2(r);
    return {
      dp__range_start: h3,
      dp__range_end: w2,
      dp__range_between: R2(r) && !n.weekPicker,
      dp__date_hover_start: Q2(te(r), r, true),
      dp__date_hover_end: Q2(te(r), r, false)
    };
  }, y3 = (r) => ({
    ...T2(r),
    dp__cell_auto_range: V(r),
    dp__cell_auto_range_start: U(r),
    dp__cell_auto_range_end: z2(r)
  }), u2 = (r) => n.range ? n.autoRange ? y3(r) : n.modelAuto ? { ...v(r), ...T2(r) } : T2(r) : n.weekPicker ? Y2(r) : v(r);
  return {
    setHoverDate: F,
    clearHoverDate: C,
    getDayClassData: (r) => ({
      ...b2(r),
      ...u2(r),
      [n.dayClass ? n.dayClass(r.value) : ""]: true,
      [n.calendarCellClassName]: !!n.calendarCellClassName
    })
  };
};
var el = ["id", "onKeydown"];
var tl = {
  key: 0,
  class: "dp__sidebar_left"
};
var nl = {
  key: 1,
  class: "dp__preset_ranges"
};
var al = ["onClick"];
var rl = {
  key: 2,
  class: "dp__sidebar_right"
};
var ll = {
  key: 3,
  class: "dp__action_extra"
};
var ol = defineComponent({
  __name: "DatepickerMenu",
  props: {
    openOnTop: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    ...rt
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
    "am-pm-change"
  ],
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, o = computed(() => {
      const { openOnTop: k2, internalModelValue: j, ...Ae } = t2;
      return Ae;
    }), { setMenuFocused: m3, setShiftKey: g, control: N } = Zn(), { getCalendarDays: F, defaults: C } = Le(t2), W = useSlots(), _ = ref(null), d3 = reactive({
      timePicker: !!(!t2.enableTimePicker || t2.timePicker || t2.monthPicker),
      monthYearInput: !!t2.timePicker,
      calendar: false
    }), $ = ref([]), Q2 = ref([]), x2 = ref(null), z2 = ref(null), V = ref(0), U = ref(false), O2 = ref(0);
    onMounted(() => {
      var j;
      U.value = true, !((j = t2.presetRanges) != null && j.length) && !W["left-sidebar"] && !W["right-sidebar"] && (X2(), window.addEventListener("resize", X2));
      const k2 = $e(z2);
      if (k2 && !t2.textInput && !t2.inline && (m3(true), ce()), k2) {
        const Ae = (Me) => {
          t2.allowPreventDefault && Me.preventDefault(), Me.stopImmediatePropagation(), Me.stopPropagation();
        };
        k2.addEventListener("pointerdown", Ae), k2.addEventListener("mousedown", Ae);
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", X2);
    });
    const { arrowRight: Z, arrowLeft: K2, arrowDown: te, arrowUp: re } = at(), ue = (k2) => {
      k2 || k2 === 0 ? Q2.value[k2].triggerTransition(
        Y2.value(k2),
        I2.value(k2)
      ) : Q2.value.forEach(
        (j, Ae) => j.triggerTransition(Y2.value(Ae), I2.value(Ae))
      );
    }, ce = () => {
      const k2 = $e(z2);
      k2 && k2.focus({ preventScroll: true });
    }, fe = () => {
      var k2;
      (k2 = t2.flow) != null && k2.length && O2.value !== -1 && (O2.value += 1, a3("flow-step", O2.value), s3());
    }, R2 = () => {
      O2.value = -1;
    }, {
      calendars: b2,
      modelValue: v,
      month: Y2,
      year: I2,
      time: T2,
      updateTime: y3,
      updateMonthYear: u2,
      selectDate: l,
      getWeekNum: r,
      monthYearSelect: h3,
      handleScroll: w2,
      handleArrow: A,
      handleSwipe: c2,
      getMarker: P,
      selectCurrentDate: f,
      presetDateRange: E2
    } = lr(t2, a3, fe, ue, O2), { setHoverDate: le, clearHoverDate: be, getDayClassData: He } = Qr(v, t2);
    watch(
      b2,
      () => {
        t2.openOnTop && setTimeout(() => {
          a3("recalculate-position");
        }, 0);
      },
      { deep: true }
    );
    const ne = ft(W, "calendar"), Fe = ft(W, "action"), Ge = ft(W, "timePicker"), Te = ft(W, "monthYear"), xe = computed(() => t2.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), lt = computed(() => Ga(t2.yearRange, t2.reverseYears)), wt = computed(() => Za(t2.locale, t2.monthNameFormat)), X2 = () => {
      const k2 = $e(_);
      k2 && (V.value = k2.getBoundingClientRect().width);
    }, de = computed(() => (k2) => F(Y2.value(k2), I2.value(k2))), oe = computed(
      () => C.value.multiCalendars > 0 && t2.range ? [...Array(C.value.multiCalendars).keys()] : [0]
    ), ot = computed(
      () => (k2) => k2 === 1
    ), st = computed(() => t2.monthPicker || t2.timePicker || t2.yearPicker), xt = computed(
      () => ({
        dp__menu_inner: true,
        dp__flex_display: C.value.multiCalendars > 0
      })
    ), zt = computed(() => ({
      dp__instance_calendar: C.value.multiCalendars > 0
    })), Nt = computed(() => ({
      dp__menu_disabled: t2.disabled,
      dp__menu_readonly: t2.readonly
    })), bt = computed(
      () => (k2) => jt(de, k2)
    ), Kt = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !t2.inline,
        dp__relative: t2.inline,
        [t2.menuClassName]: !!t2.menuClassName
      })
    ), jt = (k2, j) => k2.value(j).map((Ae) => ({
      ...Ae,
      days: Ae.days.map((Me) => (Me.marker = P(Me), Me.classData = He(Me), Me))
    })), Gt = (k2) => {
      k2.stopPropagation(), k2.stopImmediatePropagation();
    }, Rt = () => {
      t2.escClose && a3("close-picker");
    }, bn = (k2, j = false) => {
      l(k2, j), t2.spaceConfirm && a3("select-date");
    }, Ot = (k2) => {
      var j;
      (j = t2.flow) != null && j.length && (d3[k2] = true, Object.keys(d3).filter((Ae) => !d3[Ae]).length || s3());
    }, vt = (k2, j, Ae, Me, ...It) => {
      if (t2.flow[O2.value] === k2) {
        const J = Me ? j.value[0] : j.value;
        J && J[Ae](...It);
      }
    }, s3 = () => {
      vt("month", $, "toggleMonthPicker", true, true), vt("year", $, "toggleYearPicker", true, true), vt("calendar", x2, "toggleTimePicker", false, false, true), vt("time", x2, "toggleTimePicker", false, true, true);
      const k2 = t2.flow[O2.value];
      (k2 === "hours" || k2 === "minutes" || k2 === "seconds") && vt(k2, x2, "toggleTimePicker", false, true, true, k2);
    }, D2 = (k2) => {
      if (t2.arrowNavigation) {
        if (k2 === "up")
          return re();
        if (k2 === "down")
          return te();
        if (k2 === "left")
          return K2();
        if (k2 === "right")
          return Z();
      } else
        k2 === "left" || k2 === "up" ? A("left", 0, k2 === "up") : A("right", 0, k2 === "down");
    }, q2 = (k2) => {
      g(k2.shiftKey), !t2.disableMonthYearSelect && k2.code === "Tab" && k2.target.classList.contains("dp__menu") && N.value.shiftKeyInMenu && (k2.preventDefault(), k2.stopImmediatePropagation(), a3("close-picker"));
    }, ee = (k2) => {
      $.value[0] && $.value[0].handleMonthYearChange(k2);
    }, De = () => {
      ce(), a3("time-picker-close");
    };
    return n({
      updateMonthYear: u2
    }), (k2, j) => {
      var Ae;
      return openBlock(), createBlock(Transition, {
        appear: "",
        name: (Ae = unref(C).transitions) == null ? void 0 : Ae.menuAppear,
        css: !!k2.transitions
      }, {
        default: withCtx(() => {
          var Me, It;
          return [
            createBaseVNode("div", {
              id: k2.uid ? `dp-menu-${k2.uid}` : void 0,
              tabindex: "0",
              ref_key: "dpMenuRef",
              ref: z2,
              role: "dialog",
              class: normalizeClass(unref(Kt)),
              onMouseleave: j[14] || (j[14] = //@ts-ignore
              (...J) => unref(be) && unref(be)(...J)),
              onClick: Gt,
              onKeydown: [
                withKeys(Rt, ["esc"]),
                j[15] || (j[15] = withKeys(withModifiers((J) => D2("left"), ["prevent"]), ["left"])),
                j[16] || (j[16] = withKeys(withModifiers((J) => D2("up"), ["prevent"]), ["up"])),
                j[17] || (j[17] = withKeys(withModifiers((J) => D2("down"), ["prevent"]), ["down"])),
                j[18] || (j[18] = withKeys(withModifiers((J) => D2("right"), ["prevent"]), ["right"])),
                q2
              ]
            }, [
              (k2.disabled || k2.readonly) && k2.inline ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(unref(Nt))
              }, null, 2)) : createCommentVNode("", true),
              !k2.inline && !k2.teleportCenter ? (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(unref(xe))
              }, null, 2)) : createCommentVNode("", true),
              createBaseVNode("div", {
                class: normalizeClass({
                  dp__menu_content_wrapper: ((Me = k2.presetRanges) == null ? void 0 : Me.length) || !!k2.$slots["left-sidebar"] || !!k2.$slots["right-sidebar"]
                })
              }, [
                k2.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", tl, [
                  renderSlot(k2.$slots, "left-sidebar", normalizeProps(guardReactiveProps({ handleMonthYearChange: ee })))
                ])) : createCommentVNode("", true),
                (It = k2.presetRanges) != null && It.length ? (openBlock(), createElementBlock("div", nl, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(k2.presetRanges, (J, yt) => (openBlock(), createElementBlock("div", {
                    key: yt,
                    style: normalizeStyle(J.style || {}),
                    class: "dp__preset_range",
                    onClick: (me) => unref(E2)(J.range, !!J.slot)
                  }, [
                    J.slot ? renderSlot(k2.$slots, J.slot, {
                      key: 0,
                      presetDateRange: unref(E2),
                      label: J.label,
                      range: J.range
                    }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      createTextVNode(toDisplayString(J.label), 1)
                    ], 64))
                  ], 12, al))), 128))
                ])) : createCommentVNode("", true),
                createBaseVNode("div", {
                  class: "dp__instance_calendar",
                  ref_key: "calendarWrapperRef",
                  ref: _,
                  role: "document"
                }, [
                  createBaseVNode("div", {
                    class: normalizeClass(unref(xt))
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(oe), (J, yt) => (openBlock(), createElementBlock("div", {
                      key: J,
                      class: normalizeClass(unref(zt))
                    }, [
                      !k2.disableMonthYearSelect && !k2.timePicker ? (openBlock(), createBlock(Fr, mergeProps({
                        key: 0,
                        ref_for: true,
                        ref: (me) => {
                          me && ($.value[yt] = me);
                        },
                        months: unref(wt),
                        years: unref(lt),
                        month: unref(Y2)(J),
                        year: unref(I2)(J),
                        instance: J,
                        "internal-model-value": e2.internalModelValue
                      }, unref(o), {
                        onMount: j[0] || (j[0] = (me) => Ot("monthYearInput")),
                        onResetFlow: R2,
                        onUpdateMonthYear: (me) => unref(u2)(J, me),
                        onMonthYearSelect: unref(h3),
                        onOverlayClosed: ce
                      }), createSlots({ _: 2 }, [
                        renderList(unref(Te), (me, ta) => ({
                          name: me,
                          fn: withCtx((Zt) => [
                            renderSlot(k2.$slots, me, normalizeProps(guardReactiveProps(Zt)))
                          ])
                        }))
                      ]), 1040, ["months", "years", "month", "year", "instance", "internal-model-value", "onUpdateMonthYear", "onMonthYearSelect"])) : createCommentVNode("", true),
                      createVNode(Pr, mergeProps({
                        ref_for: true,
                        ref: (me) => {
                          me && (Q2.value[yt] = me);
                        },
                        "specific-mode": unref(st),
                        "get-week-num": unref(r),
                        instance: J,
                        "mapped-dates": unref(bt)(J),
                        month: unref(Y2)(J),
                        year: unref(I2)(J)
                      }, unref(o), {
                        onSelectDate: (me) => unref(l)(me, !unref(ot)(J)),
                        onHandleSpace: (me) => bn(me, !unref(ot)(J)),
                        onSetHoverDate: j[1] || (j[1] = (me) => unref(le)(me)),
                        onHandleScroll: (me) => unref(w2)(me, J),
                        onHandleSwipe: (me) => unref(c2)(me, J),
                        onMount: j[2] || (j[2] = (me) => Ot("calendar")),
                        onResetFlow: R2,
                        onTooltipOpen: j[3] || (j[3] = (me) => k2.$emit("tooltip-open", me)),
                        onTooltipClose: j[4] || (j[4] = (me) => k2.$emit("tooltip-close", me))
                      }), createSlots({ _: 2 }, [
                        renderList(unref(ne), (me, ta) => ({
                          name: me,
                          fn: withCtx((Zt) => [
                            renderSlot(k2.$slots, me, normalizeProps(guardReactiveProps({ ...Zt })))
                          ])
                        }))
                      ]), 1040, ["specific-mode", "get-week-num", "instance", "mapped-dates", "month", "year", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
                    ], 2))), 128))
                  ], 2),
                  createBaseVNode("div", null, [
                    k2.$slots["time-picker"] ? renderSlot(k2.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(T2), updateTime: unref(y3) }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      k2.enableTimePicker && !k2.monthPicker && !k2.weekPicker ? (openBlock(), createBlock(Jr, mergeProps({
                        key: 0,
                        ref_key: "timePickerRef",
                        ref: x2,
                        hours: unref(T2).hours,
                        minutes: unref(T2).minutes,
                        seconds: unref(T2).seconds,
                        "internal-model-value": e2.internalModelValue
                      }, unref(o), {
                        onMount: j[5] || (j[5] = (J) => Ot("timePicker")),
                        "onUpdate:hours": j[6] || (j[6] = (J) => unref(y3)(J)),
                        "onUpdate:minutes": j[7] || (j[7] = (J) => unref(y3)(J, false)),
                        "onUpdate:seconds": j[8] || (j[8] = (J) => unref(y3)(J, false, true)),
                        onResetFlow: R2,
                        onOverlayClosed: De,
                        onOverlayOpened: j[9] || (j[9] = (J) => k2.$emit("time-picker-open", J)),
                        onAmPmChange: j[10] || (j[10] = (J) => k2.$emit("am-pm-change", J))
                      }), createSlots({ _: 2 }, [
                        renderList(unref(Ge), (J, yt) => ({
                          name: J,
                          fn: withCtx((me) => [
                            renderSlot(k2.$slots, J, normalizeProps(guardReactiveProps(me)))
                          ])
                        }))
                      ]), 1040, ["hours", "minutes", "seconds", "internal-model-value"])) : createCommentVNode("", true)
                    ], 64))
                  ])
                ], 512),
                k2.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", rl, [
                  renderSlot(k2.$slots, "right-sidebar", normalizeProps(guardReactiveProps({ handleMonthYearChange: ee })))
                ])) : createCommentVNode("", true),
                k2.$slots["action-extra"] ? (openBlock(), createElementBlock("div", ll, [
                  k2.$slots["action-extra"] ? renderSlot(k2.$slots, "action-extra", {
                    key: 0,
                    selectCurrentDate: unref(f)
                  }) : createCommentVNode("", true)
                ])) : createCommentVNode("", true)
              ], 2),
              !k2.autoApply || k2.keepActionRow ? (openBlock(), createBlock(kr, mergeProps({
                key: 2,
                "menu-mount": U.value,
                "calendar-width": V.value,
                "internal-model-value": e2.internalModelValue
              }, unref(o), {
                onClosePicker: j[11] || (j[11] = (J) => k2.$emit("close-picker")),
                onSelectDate: j[12] || (j[12] = (J) => k2.$emit("select-date")),
                onInvalidSelect: j[13] || (j[13] = (J) => k2.$emit("invalid-select")),
                onSelectNow: unref(f)
              }), createSlots({ _: 2 }, [
                renderList(unref(Fe), (J, yt) => ({
                  name: J,
                  fn: withCtx((me) => [
                    renderSlot(k2.$slots, J, normalizeProps(guardReactiveProps({ ...me })))
                  ])
                }))
              ]), 1040, ["menu-mount", "calendar-width", "internal-model-value", "onSelectNow"])) : createCommentVNode("", true)
            ], 42, el)
          ];
        }),
        _: 3
      }, 8, ["name", "css"]);
    };
  }
});
var sl = typeof window < "u" ? window : void 0;
var on = () => {
};
var il = (e2) => getCurrentScope() ? (onScopeDispose(e2), true) : false;
var ul = (e2, n, a3, t2) => {
  if (!e2)
    return on;
  let o = on;
  const m3 = watch(
    () => unref(e2),
    (N) => {
      o(), N && (N.addEventListener(n, a3, t2), o = () => {
        N.removeEventListener(n, a3, t2), o = on;
      });
    },
    { immediate: true, flush: "post" }
  ), g = () => {
    m3(), o();
  };
  return il(g), g;
};
var dl = (e2, n, a3, t2 = {}) => {
  const { window: o = sl, event: m3 = "pointerdown" } = t2;
  return o ? ul(o, m3, (N) => {
    const F = $e(e2), C = $e(n);
    !F || !C || F === N.target || N.composedPath().includes(F) || N.composedPath().includes(C) || a3(N);
  }, { passive: true }) : void 0;
};
var cl = defineComponent({
  __name: "VueDatePicker",
  props: {
    ...rt
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
    "time-picker-open",
    "time-picker-close",
    "am-pm-change"
  ],
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, o = useSlots(), m3 = ref(false), g = toRef(t2, "modelValue"), N = toRef(t2, "timezone"), F = ref(null), C = ref(null), W = ref(false), _ = ref(null), { setMenuFocused: d3, setShiftKey: $ } = Zn(), { clearArrowNav: Q2 } = at(), { validateDate: x2, isValidTime: z2, defaults: V } = Le(t2);
    onMounted(() => {
      b2(t2.modelValue), t2.inline || (ce(_.value).addEventListener("scroll", l), window.addEventListener("resize", r)), t2.inline && (m3.value = true);
    }), onUnmounted(() => {
      if (!t2.inline) {
        const X2 = ce(_.value);
        X2 && X2.removeEventListener("scroll", l), window.removeEventListener("resize", r);
      }
    });
    const U = ft(o, "all", t2.presetRanges), O2 = ft(o, "input");
    watch(
      [g, N],
      () => {
        b2(g.value);
      },
      { deep: true }
    );
    const { openOnTop: Z, menuStyle: K2, resetPosition: te, setMenuPosition: re, setInitialPosition: ue, getScrollableParent: ce } = ir(F, C, a3, t2), {
      inputValue: fe,
      internalModelValue: R2,
      parseExternalModelValue: b2,
      emitModelValue: v,
      formatInputValue: Y2,
      checkBeforeEmit: I2
    } = or(a3, t2, W), T2 = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: t2.dark,
        dp__theme_light: !t2.dark,
        dp__flex_display: t2.inline,
        dp__flex_display_with_input: t2.inlineWithInput
      })
    ), y3 = computed(() => t2.dark ? "dp__theme_dark" : "dp__theme_light"), u2 = computed(() => t2.teleport ? {
      to: typeof t2.teleport == "boolean" ? "body" : t2.teleport,
      disabled: t2.inline
    } : { class: "dp__outer_menu_wrap" }), l = () => {
      m3.value && (t2.closeOnScroll ? be() : re());
    }, r = () => {
      m3.value && re();
    }, h3 = async () => {
      var X2, de, oe;
      !t2.disabled && !t2.readonly && (te(), await nextTick(), m3.value = true, await nextTick(), ue(), await nextTick(), re(), delete K2.value.opacity, (X2 = V.value.transitions) != null && X2.menuAppear || (oe = (de = F.value) == null ? void 0 : de.$el) == null || oe.classList.add("dp__menu_transitioned"), m3.value && a3("open"), m3.value || le(), b2(t2.modelValue));
    }, w2 = () => {
      fe.value = "", le(), a3("update:model-value", null), a3("cleared"), be();
    }, A = () => {
      const X2 = R2.value;
      return !X2 || !Array.isArray(X2) && x2(X2) ? true : Array.isArray(X2) ? X2.length === 2 && x2(X2[0]) && x2(X2[1]) ? true : x2(X2[0]) : false;
    }, c2 = () => {
      I2() && A() ? (v(), be()) : a3("invalid-select", R2.value);
    }, P = (X2) => {
      f(), v(), t2.closeOnAutoApply && !X2 && be();
    }, f = () => {
      C.value && t2.textInput && C.value.setParsedDate(R2.value);
    }, E2 = (X2 = false) => {
      t2.autoApply && z2(R2.value) && A() && (t2.range && Array.isArray(R2.value) ? (t2.partialRange || R2.value.length === 2) && P(X2) : P(X2));
    }, le = () => {
      t2.textInput || (R2.value = null);
    }, be = () => {
      t2.inline || (m3.value && (m3.value = false, d3(false), $(false), Q2(), a3("closed"), ue(), fe.value && b2(g.value)), le());
    }, He = (X2, de) => {
      if (!X2) {
        R2.value = null;
        return;
      }
      R2.value = X2, de && (c2(), a3("text-submit"));
    }, ne = () => {
      t2.autoApply && z2(R2.value) && v(), f();
    }, Fe = () => m3.value ? be() : h3(), Ge = (X2) => {
      R2.value = X2;
    }, Te = () => {
      t2.textInput && (W.value = true, Y2()), a3("focus");
    }, xe = () => {
      t2.textInput && (W.value = false, b2(t2.modelValue)), a3("blur");
    }, lt = (X2) => {
      F.value && F.value.updateMonthYear(0, {
        month: Bn(X2.month),
        year: Bn(X2.year)
      });
    }, wt = (X2) => {
      b2(X2 || t2.modelValue);
    };
    return dl(
      F,
      C,
      t2.onClickOutside ? () => t2.onClickOutside(A) : be
    ), n({
      closeMenu: be,
      selectDate: c2,
      clearValue: w2,
      openMenu: h3,
      onScroll: l,
      formatInputValue: Y2,
      // exposed for testing purposes
      updateInternalModelValue: Ge,
      // modify internal modelValue
      setMonthYear: lt,
      parseModel: wt
    }), (X2, de) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(unref(T2)),
      ref_key: "pickerWrapperRef",
      ref: _
    }, [
      createVNode(yr, mergeProps({
        ref_key: "inputRef",
        ref: C,
        "is-menu-open": m3.value,
        "input-value": unref(fe),
        "onUpdate:inputValue": de[0] || (de[0] = (oe) => isRef(fe) ? fe.value = oe : null)
      }, X2.$props, {
        onClear: w2,
        onOpen: h3,
        onSetInputDate: He,
        onSetEmptyDate: unref(v),
        onSelectDate: c2,
        onToggle: Fe,
        onClose: be,
        onFocus: Te,
        onBlur: xe,
        onRealBlur: de[1] || (de[1] = (oe) => W.value = false)
      }), createSlots({ _: 2 }, [
        renderList(unref(O2), (oe, ot) => ({
          name: oe,
          fn: withCtx((st) => [
            renderSlot(X2.$slots, oe, normalizeProps(guardReactiveProps(st)))
          ])
        }))
      ]), 1040, ["is-menu-open", "input-value", "onSetEmptyDate"]),
      m3.value ? (openBlock(), createBlock(resolveDynamicComponent(X2.teleport ? Teleport : "div"), normalizeProps(mergeProps({ key: 0 }, unref(u2))), {
        default: withCtx(() => [
          m3.value ? (openBlock(), createBlock(ol, mergeProps({
            key: 0,
            ref_key: "dpMenuRef",
            ref: F,
            class: unref(y3),
            style: X2.inline ? void 0 : unref(K2),
            "open-on-top": unref(Z)
          }, X2.$props, {
            "internal-model-value": unref(R2),
            "onUpdate:internalModelValue": de[2] || (de[2] = (oe) => isRef(R2) ? R2.value = oe : null),
            onClosePicker: be,
            onSelectDate: c2,
            onAutoApply: E2,
            onTimeUpdate: ne,
            onFlowStep: de[3] || (de[3] = (oe) => X2.$emit("flow-step", oe)),
            onUpdateMonthYear: de[4] || (de[4] = (oe) => X2.$emit("update-month-year", oe)),
            onInvalidSelect: de[5] || (de[5] = (oe) => X2.$emit("invalid-select", unref(R2))),
            onInvalidFixedRange: de[6] || (de[6] = (oe) => X2.$emit("invalid-fixed-range", oe)),
            onRecalculatePosition: unref(re),
            onTooltipOpen: de[7] || (de[7] = (oe) => X2.$emit("tooltip-open", oe)),
            onTooltipClose: de[8] || (de[8] = (oe) => X2.$emit("tooltip-close", oe)),
            onTimePickerOpen: de[9] || (de[9] = (oe) => X2.$emit("time-picker-open", oe)),
            onTimePickerClose: de[10] || (de[10] = (oe) => X2.$emit("time-picker-close", oe)),
            onAmPmChange: de[11] || (de[11] = (oe) => X2.$emit("am-pm-change", oe))
          }), createSlots({ _: 2 }, [
            renderList(unref(U), (oe, ot) => ({
              name: oe,
              fn: withCtx((st) => [
                renderSlot(X2.$slots, oe, normalizeProps(guardReactiveProps({ ...st })))
              ])
            }))
          ]), 1040, ["class", "style", "open-on-top", "internal-model-value", "onRecalculatePosition"])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 16)) : createCommentVNode("", true)
    ], 2));
  }
});
var ea = (() => {
  const e2 = cl;
  return e2.install = (n) => {
    n.component("Vue3DatePicker", e2);
  }, e2;
})();
var fl = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: ea
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(fl).forEach(([e2, n]) => {
  e2 !== "default" && (ea[e2] = n);
});
export {
  ea as default
};
//# sourceMappingURL=@vuepic_vue-datepicker.js.map
