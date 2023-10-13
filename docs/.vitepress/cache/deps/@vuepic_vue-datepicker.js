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
} from "./chunk-67UUJLDS.js";
import "./chunk-UXIASGQL.js";

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
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

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++)
    arr2[i2] = arr[i2];
  return arr2;
}

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
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

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
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
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e2(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null)
          it["return"]();
      } finally {
        if (didErr)
          throw err;
      }
    }
  };
}

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/inherits.js
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

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
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

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/createSuper.js
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

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/toPrimitive.js
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

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/createClass.js
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

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/defineProperty.js
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

// node_modules/.pnpm/@vuepic+vue-datepicker@6.1.0_vue@3.3.4/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
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
function ba() {
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
ba.compatConfig = {
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
        d: "M20.943 23.057l-7.057-7.057c0 0 7.057-7.057 7.057-7.057 0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-8 8c-0.521 0.521-0.521 1.365 0 1.885l8 8c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
Rn.compatConfig = {
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
        d: "M12.943 24.943l8-8c0.521-0.521 0.521-1.365 0-1.885l-8-8c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885l7.057 7.057c0 0-7.057 7.057-7.057 7.057-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0z"
      })
    ]
  );
}
On.compatConfig = {
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
function Yn() {
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
Yn.compatConfig = {
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
function Bn(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
var ka = { exports: {} };
(function(e2) {
  function n(a3) {
    return a3 && a3.__esModule ? a3 : {
      default: a3
    };
  }
  e2.exports = n, e2.exports.__esModule = true, e2.exports.default = e2.exports;
})(ka);
var xa = ka.exports;
var wn = { exports: {} };
(function(e2, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a3;
  function a3(t2) {
    if (t2 === null || t2 === true || t2 === false)
      return NaN;
    var r = Number(t2);
    return isNaN(r) ? r : r < 0 ? Math.ceil(r) : Math.floor(r);
  }
  e2.exports = n.default;
})(wn, wn.exports);
var Qa = wn.exports;
var er = Bn(Qa);
var Dn = { exports: {} };
(function(e2, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a3;
  function a3(t2) {
    var r = new Date(Date.UTC(t2.getFullYear(), t2.getMonth(), t2.getDate(), t2.getHours(), t2.getMinutes(), t2.getSeconds(), t2.getMilliseconds()));
    return r.setUTCFullYear(t2.getFullYear()), t2.getTime() - r.getTime();
  }
  e2.exports = n.default;
})(Dn, Dn.exports);
var tr = Dn.exports;
var Gn = Bn(tr);
function nr(e2, n) {
  var a3 = or(n);
  return a3.formatToParts ? rr(a3, e2) : lr(a3, e2);
}
var ar = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function rr(e2, n) {
  try {
    for (var a3 = e2.formatToParts(n), t2 = [], r = 0; r < a3.length; r++) {
      var l = ar[a3[r].type];
      l >= 0 && (t2[l] = parseInt(a3[r].value, 10));
    }
    return t2;
  } catch (c2) {
    if (c2 instanceof RangeError)
      return [NaN];
    throw c2;
  }
}
function lr(e2, n) {
  var a3 = e2.format(n).replace(/\u200E/g, ""), t2 = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(a3);
  return [t2[3], t2[1], t2[2], t2[4], t2[5], t2[6]];
}
var sn = {};
function or(e2) {
  if (!sn[e2]) {
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
    sn[e2] = a3 ? new Intl.DateTimeFormat("en-US", {
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
  return sn[e2];
}
function En(e2, n, a3, t2, r, l, c2) {
  var y3 = /* @__PURE__ */ new Date(0);
  return y3.setUTCFullYear(e2, n, a3), y3.setUTCHours(t2, r, l, c2), y3;
}
var Zn = 36e5;
var sr = 6e4;
var un = {
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-]\d{2}):?(\d{2})$/
};
function Fn(e2, n, a3) {
  var t2, r;
  if (!e2 || (t2 = un.timezoneZ.exec(e2), t2))
    return 0;
  var l;
  if (t2 = un.timezoneHH.exec(e2), t2)
    return l = parseInt(t2[1], 10), qn(l) ? -(l * Zn) : NaN;
  if (t2 = un.timezoneHHMM.exec(e2), t2) {
    l = parseInt(t2[1], 10);
    var c2 = parseInt(t2[2], 10);
    return qn(l, c2) ? (r = Math.abs(l) * Zn + c2 * sr, l > 0 ? -r : r) : NaN;
  }
  if (dr(e2)) {
    n = new Date(n || Date.now());
    var y3 = a3 ? n : ur(n), D2 = Mn(y3, e2), S3 = a3 ? D2 : ir(n, D2, e2);
    return -S3;
  }
  return NaN;
}
function ur(e2) {
  return En(
    e2.getFullYear(),
    e2.getMonth(),
    e2.getDate(),
    e2.getHours(),
    e2.getMinutes(),
    e2.getSeconds(),
    e2.getMilliseconds()
  );
}
function Mn(e2, n) {
  var a3 = nr(e2, n), t2 = En(
    a3[0],
    a3[1] - 1,
    a3[2],
    a3[3] % 24,
    a3[4],
    a3[5],
    0
  ).getTime(), r = e2.getTime(), l = r % 1e3;
  return r -= l >= 0 ? l : 1e3 + l, t2 - r;
}
function ir(e2, n, a3) {
  var t2 = e2.getTime(), r = t2 - n, l = Mn(new Date(r), a3);
  if (n === l)
    return n;
  r -= l - n;
  var c2 = Mn(new Date(r), a3);
  return l === c2 ? l : Math.max(l, c2);
}
function qn(e2, n) {
  return -23 <= e2 && e2 <= 23 && (n == null || 0 <= n && n <= 59);
}
var Xn = {};
function dr(e2) {
  if (Xn[e2])
    return true;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e2 }), Xn[e2] = true, true;
  } catch {
    return false;
  }
}
var wa = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
var dn = 36e5;
var Jn = 6e4;
var cr = 2;
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
  timeZone: wa
};
function $n(e2, n) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e2 === null)
    return /* @__PURE__ */ new Date(NaN);
  var a3 = n || {}, t2 = a3.additionalDigits == null ? cr : er(a3.additionalDigits);
  if (t2 !== 2 && t2 !== 1 && t2 !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e2 instanceof Date || typeof e2 == "object" && Object.prototype.toString.call(e2) === "[object Date]")
    return new Date(e2.getTime());
  if (typeof e2 == "number" || Object.prototype.toString.call(e2) === "[object Number]")
    return new Date(e2);
  if (!(typeof e2 == "string" || Object.prototype.toString.call(e2) === "[object String]"))
    return /* @__PURE__ */ new Date(NaN);
  var r = fr(e2), l = vr(r.date, t2), c2 = l.year, y3 = l.restDateString, D2 = mr(y3, c2);
  if (isNaN(D2))
    return /* @__PURE__ */ new Date(NaN);
  if (D2) {
    var S3 = D2.getTime(), g = 0, Y2;
    if (r.time && (g = gr(r.time), isNaN(g)))
      return /* @__PURE__ */ new Date(NaN);
    if (r.timeZone || a3.timeZone) {
      if (Y2 = Fn(r.timeZone || a3.timeZone, new Date(S3 + g)), isNaN(Y2))
        return /* @__PURE__ */ new Date(NaN);
    } else
      Y2 = Gn(new Date(S3 + g)), Y2 = Gn(new Date(S3 + g + Y2));
    return new Date(S3 + g + Y2);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function fr(e2) {
  var n = {}, a3 = Ye.dateTimePattern.exec(e2), t2;
  if (a3 ? (n.date = a3[1], t2 = a3[3]) : (a3 = Ye.datePattern.exec(e2), a3 ? (n.date = a3[1], t2 = a3[2]) : (n.date = null, t2 = e2)), t2) {
    var r = Ye.timeZone.exec(t2);
    r ? (n.time = t2.replace(r[1], ""), n.timeZone = r[1].trim()) : n.time = t2;
  }
  return n;
}
function vr(e2, n) {
  var a3 = Ye.YYY[n], t2 = Ye.YYYYY[n], r;
  if (r = Ye.YYYY.exec(e2) || t2.exec(e2), r) {
    var l = r[1];
    return {
      year: parseInt(l, 10),
      restDateString: e2.slice(l.length)
    };
  }
  if (r = Ye.YY.exec(e2) || a3.exec(e2), r) {
    var c2 = r[1];
    return {
      year: parseInt(c2, 10) * 100,
      restDateString: e2.slice(c2.length)
    };
  }
  return {
    year: null
  };
}
function mr(e2, n) {
  if (n === null)
    return null;
  var a3, t2, r, l;
  if (e2.length === 0)
    return t2 = /* @__PURE__ */ new Date(0), t2.setUTCFullYear(n), t2;
  if (a3 = Ye.MM.exec(e2), a3)
    return t2 = /* @__PURE__ */ new Date(0), r = parseInt(a3[1], 10) - 1, Qn(n, r) ? (t2.setUTCFullYear(n, r), t2) : /* @__PURE__ */ new Date(NaN);
  if (a3 = Ye.DDD.exec(e2), a3) {
    t2 = /* @__PURE__ */ new Date(0);
    var c2 = parseInt(a3[1], 10);
    return pr(n, c2) ? (t2.setUTCFullYear(n, 0, c2), t2) : /* @__PURE__ */ new Date(NaN);
  }
  if (a3 = Ye.MMDD.exec(e2), a3) {
    t2 = /* @__PURE__ */ new Date(0), r = parseInt(a3[1], 10) - 1;
    var y3 = parseInt(a3[2], 10);
    return Qn(n, r, y3) ? (t2.setUTCFullYear(n, r, y3), t2) : /* @__PURE__ */ new Date(NaN);
  }
  if (a3 = Ye.Www.exec(e2), a3)
    return l = parseInt(a3[1], 10) - 1, ea(n, l) ? xn(n, l) : /* @__PURE__ */ new Date(NaN);
  if (a3 = Ye.WwwD.exec(e2), a3) {
    l = parseInt(a3[1], 10) - 1;
    var D2 = parseInt(a3[2], 10) - 1;
    return ea(n, l, D2) ? xn(n, l, D2) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function gr(e2) {
  var n, a3, t2;
  if (n = Ye.HH.exec(e2), n)
    return a3 = parseFloat(n[1].replace(",", ".")), cn(a3) ? a3 % 24 * dn : NaN;
  if (n = Ye.HHMM.exec(e2), n)
    return a3 = parseInt(n[1], 10), t2 = parseFloat(n[2].replace(",", ".")), cn(a3, t2) ? a3 % 24 * dn + t2 * Jn : NaN;
  if (n = Ye.HHMMSS.exec(e2), n) {
    a3 = parseInt(n[1], 10), t2 = parseInt(n[2], 10);
    var r = parseFloat(n[3].replace(",", "."));
    return cn(a3, t2, r) ? a3 % 24 * dn + t2 * Jn + r * 1e3 : NaN;
  }
  return null;
}
function xn(e2, n, a3) {
  n = n || 0, a3 = a3 || 0;
  var t2 = /* @__PURE__ */ new Date(0);
  t2.setUTCFullYear(e2, 0, 4);
  var r = t2.getUTCDay() || 7, l = n * 7 + a3 + 1 - r;
  return t2.setUTCDate(t2.getUTCDate() + l), t2;
}
var yr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var hr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Da(e2) {
  return e2 % 400 === 0 || e2 % 4 === 0 && e2 % 100 !== 0;
}
function Qn(e2, n, a3) {
  if (n < 0 || n > 11)
    return false;
  if (a3 != null) {
    if (a3 < 1)
      return false;
    var t2 = Da(e2);
    if (t2 && a3 > hr[n] || !t2 && a3 > yr[n])
      return false;
  }
  return true;
}
function pr(e2, n) {
  if (n < 1)
    return false;
  var a3 = Da(e2);
  return !(a3 && n > 366 || !a3 && n > 365);
}
function ea(e2, n, a3) {
  return !(n < 0 || n > 52 || a3 != null && (a3 < 0 || a3 > 6));
}
function cn(e2, n, a3) {
  return !(e2 != null && (e2 < 0 || e2 >= 25) || n != null && (n < 0 || n >= 60) || a3 != null && (a3 < 0 || a3 >= 60));
}
var Tn = { exports: {} };
var An = { exports: {} };
(function(e2, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a3;
  function a3(t2, r) {
    if (t2 == null)
      throw new TypeError("assign requires that input parameter not be null or undefined");
    for (var l in r)
      Object.prototype.hasOwnProperty.call(r, l) && (t2[l] = r[l]);
    return t2;
  }
  e2.exports = n.default;
})(An, An.exports);
var br = An.exports;
(function(e2, n) {
  var a3 = xa.default;
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = r;
  var t2 = a3(br);
  function r(l) {
    return (0, t2.default)({}, l);
  }
  e2.exports = n.default;
})(Tn, Tn.exports);
var kr = Tn.exports;
var wr = Bn(kr);
function Dr(e2, n, a3) {
  var t2 = $n(e2, a3), r = Fn(n, t2, true), l = new Date(t2.getTime() - r), c2 = /* @__PURE__ */ new Date(0);
  return c2.setFullYear(l.getUTCFullYear(), l.getUTCMonth(), l.getUTCDate()), c2.setHours(l.getUTCHours(), l.getUTCMinutes(), l.getUTCSeconds(), l.getUTCMilliseconds()), c2;
}
function Mr(e2, n, a3) {
  if (typeof e2 == "string" && !e2.match(wa)) {
    var t2 = wr(a3);
    return t2.timeZone = n, $n(e2, t2);
  }
  var r = $n(e2, a3), l = En(
    r.getFullYear(),
    r.getMonth(),
    r.getDate(),
    r.getHours(),
    r.getMinutes(),
    r.getSeconds(),
    r.getMilliseconds()
  ).getTime(), c2 = Fn(n, new Date(l));
  return new Date(l + c2);
}
function ta(e2) {
  return (n) => new Intl.DateTimeFormat(e2, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${n}T00:00:00+00:00`)).slice(0, 2);
}
function $r(e2) {
  return (n) => format(/* @__PURE__ */ new Date(`2017-01-0${n}T00:00:00+00:00`), "EEEEEE", { locale: e2 });
}
var Tr = (e2, n, a3) => {
  const t2 = [1, 2, 3, 4, 5, 6, 7];
  let r;
  if (e2 !== null)
    try {
      r = t2.map($r(e2));
    } catch {
      r = t2.map(ta(n));
    }
  else
    r = t2.map(ta(n));
  const l = r.slice(0, a3), c2 = r.slice(a3 + 1, r.length);
  return [r[a3]].concat(...c2).concat(...l);
};
var Vn = (e2, n) => {
  const a3 = [];
  for (let t2 = +e2[0]; t2 <= +e2[1]; t2++)
    a3.push({ value: +t2, text: `${t2}` });
  return n ? a3.reverse() : a3;
};
var Ma = (e2, n, a3) => {
  const t2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((l) => {
    const c2 = l < 10 ? `0${l}` : l;
    return /* @__PURE__ */ new Date(`2017-${c2}-01T00:00:00+00:00`);
  });
  if (e2 !== null)
    try {
      const l = a3 === "long" ? "MMMM" : "MMM";
      return t2.map((c2, y3) => {
        const D2 = format(c2, l, { locale: e2 });
        return {
          text: D2.charAt(0).toUpperCase() + D2.substring(1),
          value: y3
        };
      });
    } catch {
    }
  const r = new Intl.DateTimeFormat(n, { month: a3, timeZone: "UTC" });
  return t2.map((l, c2) => {
    const y3 = r.format(l);
    return {
      text: y3.charAt(0).toUpperCase() + y3.substring(1),
      value: c2
    };
  });
};
var Ar = (e2) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e2];
var Ae = (e2) => {
  const n = unref(e2);
  return n != null && n.$el ? n == null ? void 0 : n.$el : n;
};
var Sr = (e2) => Object.assign({ type: "dot" }, e2);
var $a = (e2) => Array.isArray(e2) ? !!e2[0] && !!e2[1] : false;
var Gt = {
  prop: (e2) => `"${e2}" prop must be enabled!`,
  dateArr: (e2) => `You need to use array as "model-value" binding in order to support "${e2}"`
};
var $e = (e2) => e2;
var na = (e2) => e2 === 0 ? e2 : !e2 || isNaN(+e2) ? null : +e2;
var aa = (e2) => e2 === null;
var _r = (e2) => {
  if (e2)
    return [...e2.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var Pr = (e2) => {
  const n = [], a3 = (t2) => t2.filter((r) => r);
  for (let t2 = 0; t2 < e2.length; t2 += 3) {
    const r = [e2[t2], e2[t2 + 1], e2[t2 + 2]];
    n.push(a3(r));
  }
  return n;
};
var Rt = (e2, n, a3) => {
  const t2 = a3 ?? a3 === 0, r = n ?? n === 0;
  if (!t2 && !r)
    return false;
  const l = +a3, c2 = +n;
  return t2 && r ? +e2 > l || +e2 < c2 : t2 ? +e2 > l : r ? +e2 < c2 : false;
};
var kt = (e2, n) => Pr(e2).map((a3) => a3.map((t2) => {
  const { active: r, disabled: l, isBetween: c2 } = n(t2);
  return {
    ...t2,
    active: r,
    disabled: l,
    className: {
      dp__overlay_cell_active: r,
      dp__overlay_cell: !r,
      dp__overlay_cell_disabled: l,
      dp__overlay_cell_pad: true,
      dp__overlay_cell_active_disabled: l && r,
      dp__cell_in_between: c2
    }
  };
}));
var tt = (e2, n, a3 = false) => {
  e2 && n.allowStopPropagation && (a3 && e2.stopImmediatePropagation(), e2.stopPropagation());
};
var ra = (e2, n, a3, t2, r) => {
  const l = parse(e2, n.slice(0, e2.length), /* @__PURE__ */ new Date());
  return isValid(l) && isDate(l) ? t2 || r ? l : set(l, {
    hours: +a3.hours,
    minutes: +(a3 == null ? void 0 : a3.minutes),
    seconds: +(a3 == null ? void 0 : a3.seconds),
    milliseconds: 0
  }) : null;
};
var Cr = (e2, n, a3, t2, r) => {
  const l = Array.isArray(a3) ? a3[0] : a3;
  if (typeof n == "string")
    return ra(e2, n, l, t2, r);
  if (Array.isArray(n)) {
    let c2 = null;
    for (const y3 of n)
      if (c2 = ra(e2, y3, l, t2, r), c2)
        break;
    return c2;
  }
  return typeof n == "function" ? n(e2) : null;
};
var P = (e2) => e2 ? new Date(e2) : /* @__PURE__ */ new Date();
var Rr = (e2, n, a3) => {
  if (n) {
    const r = (e2.getMonth() + 1).toString().padStart(2, "0"), l = e2.getDate().toString().padStart(2, "0"), c2 = e2.getHours().toString().padStart(2, "0"), y3 = e2.getMinutes().toString().padStart(2, "0"), D2 = a3 ? e2.getSeconds().toString().padStart(2, "0") : "00";
    return `${e2.getFullYear()}-${r}-${l}T${c2}:${y3}:${D2}.000Z`;
  }
  const t2 = Date.UTC(
    e2.getUTCFullYear(),
    e2.getUTCMonth(),
    e2.getUTCDate(),
    e2.getUTCHours(),
    e2.getUTCMinutes(),
    e2.getUTCSeconds()
  );
  return new Date(t2).toISOString();
};
var He = (e2) => {
  let n = P(JSON.parse(JSON.stringify(e2)));
  return n = setHours(n, 0), n = setMinutes(n, 0), n = setSeconds(n, 0), n = setMilliseconds(n, 0), n;
};
var nt = (e2, n, a3, t2) => {
  let r = e2 ? P(e2) : P();
  return (n || n === 0) && (r = setHours(r, +n)), (a3 || a3 === 0) && (r = setMinutes(r, +a3)), (t2 || t2 === 0) && (r = setSeconds(r, +t2)), setMilliseconds(r, 0);
};
var Pe = (e2, n) => !e2 || !n ? false : isBefore(He(e2), He(n));
var ge = (e2, n) => !e2 || !n ? false : isEqual(He(e2), He(n));
var Re = (e2, n) => !e2 || !n ? false : isAfter(He(e2), He(n));
var Hn = (e2, n, a3) => e2 != null && e2[0] && (e2 != null && e2[1]) ? Re(a3, e2[0]) && Pe(a3, e2[1]) : e2 != null && e2[0] && n ? Re(a3, e2[0]) && Pe(a3, n) || Pe(a3, e2[0]) && Re(a3, n) : false;
var We = (e2) => {
  const n = set(new Date(e2), { date: 1 });
  return He(n);
};
var fn = (e2, n, a3) => n && (a3 || a3 === 0) ? Object.fromEntries(
  ["hours", "minutes", "seconds"].map((t2) => t2 === n ? [t2, a3] : [t2, isNaN(+e2[t2]) ? void 0 : +e2[t2]])
) : {
  hours: isNaN(+e2.hours) ? void 0 : +e2.hours,
  minutes: isNaN(+e2.minutes) ? void 0 : +e2.minutes,
  seconds: isNaN(+e2.seconds) ? void 0 : +e2.seconds
};
var vt = (e2) => ({
  hours: getHours(e2),
  minutes: getMinutes(e2),
  seconds: getSeconds(e2)
});
var Ta = (e2, n) => {
  if (n) {
    const a3 = getYear(P(n));
    if (a3 > e2)
      return 12;
    if (a3 === e2)
      return getMonth(P(n));
  }
};
var Aa = (e2, n) => {
  if (n) {
    const a3 = getYear(P(n));
    return a3 < e2 ? -1 : a3 === e2 ? getMonth(P(n)) : void 0;
  }
};
var wt = (e2) => {
  if (e2)
    return getYear(P(e2));
};
var Ge = (e2, n) => n ? Dr(e2, n) : e2;
var Sa = (e2, n) => n ? Mr(e2, n) : e2;
var la = (e2) => e2 instanceof Date ? e2 : parseISO(e2);
var _a = (e2, n) => {
  const a3 = Re(e2, n) ? n : e2, t2 = Re(n, e2) ? n : e2;
  return eachDayOfInterval({ start: a3, end: t2 });
};
var Or = (e2) => {
  const n = addMonths(e2, 1);
  return { month: getMonth(n), year: getYear(n) };
};
var jt = (e2, n, a3) => {
  const t2 = startOfWeek(Ge(e2, n), { weekStartsOn: +a3 }), r = endOfWeek(Ge(e2, n), { weekStartsOn: +a3 });
  return [t2, r];
};
var Pa = (e2, n) => {
  const a3 = {
    hours: getHours(P()),
    minutes: getMinutes(P()),
    seconds: n ? getSeconds(P()) : 0
  };
  return Object.assign(a3, e2);
};
var et = (e2, n, a3) => [set(P(e2), { date: 1 }), set(P(), { month: n, year: a3, date: 1 })];
var Je = (e2, n, a3) => {
  let t2 = e2 ? P(e2) : P();
  return (n || n === 0) && (t2 = setMonth(t2, n)), a3 && (t2 = setYear(t2, a3)), t2;
};
var Ca = (e2, n, a3, t2, r) => {
  if (!t2 || r && !n || !r && !a3)
    return false;
  const l = r ? addMonths(e2, 1) : subMonths(e2, 1), c2 = [getMonth(l), getYear(l)];
  return r ? !Yr(...c2, n) : !Nr(...c2, a3);
};
var Nr = (e2, n, a3) => Pe(...et(a3, e2, n)) || ge(...et(a3, e2, n));
var Yr = (e2, n, a3) => Re(...et(a3, e2, n)) || ge(...et(a3, e2, n));
var Ra = (e2, n, a3, t2, r, l) => {
  if (typeof n == "function")
    return n(e2);
  const c2 = a3 ? { locale: a3 } : void 0;
  return Array.isArray(e2) ? `${format(e2[0], l, c2)}${r && !e2[1] ? "" : t2}${e2[1] ? format(e2[1], l, c2) : ""}` : format(e2, l, c2);
};
var yt = (e2) => {
  if (e2)
    return null;
  throw new Error(Gt.prop("partial-range"));
};
var Ht = (e2, n) => {
  if (n)
    return e2();
  throw new Error(Gt.prop("range"));
};
var Sn = (e2) => Array.isArray(e2) ? isValid(e2[0]) && (e2[1] ? isValid(e2[1]) : true) : e2 ? isValid(e2) : false;
var Ir = (e2) => set(P(), {
  hours: +e2.hours || 0,
  minutes: +e2.minutes || 0,
  seconds: +e2.seconds || 0
});
var vn = (e2, n, a3, t2) => {
  if (!e2)
    return true;
  if (t2) {
    const r = a3 === "max" ? isBefore(e2, n) : isAfter(e2, n), l = { seconds: 0, milliseconds: 0 };
    return r || isEqual(set(e2, l), set(n, l));
  }
  return a3 === "max" ? e2.getTime() <= n.getTime() : e2.getTime() >= n.getTime();
};
var oa = (e2, n, a3, t2, r) => {
  const l = e2 ? Ir(e2) : P(n);
  return Array.isArray(t2) ? vn(t2[0], l, a3, !!n) && vn(t2[1], l, a3, !!n) && r : vn(t2, l, a3, !!n) && r;
};
var mn = (e2) => set(P(), vt(e2));
var Br = (e2, n) => Array.isArray(e2) ? e2.map((a3) => P(a3)).filter((a3) => getYear(P(a3)) === n).map((a3) => getMonth(a3)) : [];
var At = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Oa = () => {
  const e2 = (t2) => {
    At.menuFocused = t2;
  }, n = (t2) => {
    At.shiftKeyInMenu !== t2 && (At.shiftKeyInMenu = t2);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: At.shiftKeyInMenu, menuFocused: At.menuFocused })),
    setMenuFocused: e2,
    setShiftKey: n
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
var gn = ref(null);
var Ut = ref(false);
var yn = ref(false);
var hn = ref(false);
var pn = ref(false);
var Oe = ref(0);
var _e = ref(0);
var lt = () => {
  const e2 = computed(() => Ut.value ? [...ke.selectionGrid, ke.actionRow].filter((p) => p.length) : yn.value ? [
    ...ke.timePicker[0],
    ...ke.timePicker[1],
    pn.value ? [] : [gn.value],
    ke.actionRow
  ].filter((p) => p.length) : hn.value ? [...ke.monthPicker, ke.actionRow] : [ke.monthYear, ...ke.calendar, ke.time, ke.actionRow].filter((p) => p.length)), n = (p) => {
    Oe.value = p ? Oe.value + 1 : Oe.value - 1;
    let M3 = null;
    e2.value[_e.value] && (M3 = e2.value[_e.value][Oe.value]), M3 || (Oe.value = p ? Oe.value - 1 : Oe.value + 1);
  }, a3 = (p) => {
    if (_e.value === 0 && !p || _e.value === e2.value.length && p)
      return;
    _e.value = p ? _e.value + 1 : _e.value - 1, e2.value[_e.value] ? e2.value[_e.value] && !e2.value[_e.value][Oe.value] && Oe.value !== 0 && (Oe.value = e2.value[_e.value].length - 1) : _e.value = p ? _e.value - 1 : _e.value + 1;
  }, t2 = (p) => {
    let M3 = null;
    e2.value[_e.value] && (M3 = e2.value[_e.value][Oe.value]), M3 ? M3.focus({ preventScroll: !Ut.value }) : Oe.value = p ? Oe.value - 1 : Oe.value + 1;
  }, r = () => {
    n(true), t2(true);
  }, l = () => {
    n(false), t2(false);
  }, c2 = () => {
    a3(false), t2(true);
  }, y3 = () => {
    a3(true), t2(true);
  }, D2 = (p, M3) => {
    ke[M3] = p;
  }, S3 = (p, M3) => {
    ke[M3] = p;
  }, g = () => {
    Oe.value = 0, _e.value = 0;
  };
  return {
    buildMatrix: D2,
    buildMultiLevelMatrix: S3,
    setTimePickerBackRef: (p) => {
      gn.value = p;
    },
    setSelectionGrid: (p) => {
      Ut.value = p, g(), p || (ke.selectionGrid = []);
    },
    setTimePicker: (p, M3 = false) => {
      yn.value = p, pn.value = M3, g(), p || (ke.timePicker[0] = [], ke.timePicker[1] = []);
    },
    setTimePickerElements: (p, M3 = 0) => {
      ke.timePicker[M3] = p;
    },
    arrowRight: r,
    arrowLeft: l,
    arrowUp: c2,
    arrowDown: y3,
    clearArrowNav: () => {
      ke.monthYear = [], ke.calendar = [], ke.time = [], ke.actionRow = [], ke.selectionGrid = [], ke.timePicker[0] = [], ke.timePicker[1] = [], Ut.value = false, yn.value = false, pn.value = false, hn.value = false, g(), gn.value = null;
    },
    setMonthPicker: (p) => {
      hn.value = p, g();
    },
    refSets: ke
    // exposed for testing
  };
};
var sa = (e2) => ({
  menuAppearTop: "dp-menu-appear-top",
  menuAppearBottom: "dp-menu-appear-bottom",
  open: "dp-slide-down",
  close: "dp-slide-up",
  next: "calendar-next",
  previous: "calendar-prev",
  vNext: "dp-slide-up",
  vPrevious: "dp-slide-down",
  ...e2 ?? {}
});
var Er = (e2) => ({
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
  ...e2 ?? {}
});
var ua = (e2) => e2 ? typeof e2 == "boolean" ? e2 ? 2 : 0 : +e2 >= 2 ? +e2 : 2 : 0;
var Fr = (e2) => {
  const n = typeof e2 == "object" && e2, a3 = {
    static: true,
    solo: false
  };
  if (!e2)
    return { ...a3, count: ua(false) };
  const t2 = n ? e2 : {}, r = n ? t2.count ?? true : e2, l = ua(r);
  return Object.assign(a3, t2, { count: l });
};
var Vr = (e2, n, a3) => e2 || (typeof a3 == "string" ? a3 : n);
var Hr = (e2) => typeof e2 == "boolean" ? e2 ? sa({}) : false : sa(e2);
var Ur = (e2) => {
  const n = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: true,
    rangeSeparator: " - "
  };
  return typeof e2 == "object" ? { ...n, ...e2 ?? {}, enabled: true } : { ...n, enabled: e2 };
};
var Lr = (e2) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...e2 ?? {}
});
var Wr = (e2) => ({
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  ...e2 ?? {}
});
var zr = (e2) => {
  const n = { input: false };
  return typeof e2 == "object" ? { ...n, ...e2 ?? {}, enabled: true } : {
    enabled: e2,
    ...n
  };
};
var jr = (e2) => ({ ...{
  allowStopPropagation: true,
  closeOnScroll: false,
  modeHeight: 255,
  allowPreventDefault: false,
  closeOnClearValue: true,
  closeOnAutoApply: true,
  noSwipe: false,
  keepActionRow: false,
  onClickOutside: void 0
}, ...e2 ?? {} });
var Se = (e2) => {
  const n = () => {
    const J = e2.enableSeconds ? ":ss" : "";
    return e2.is24 ? `HH:mm${J}` : `hh:mm${J} aa`;
  }, a3 = () => e2.format ? e2.format : e2.monthPicker ? "MM/yyyy" : e2.timePicker ? n() : e2.weekPicker ? "MM/dd/yyyy" : e2.yearPicker ? "yyyy" : e2.enableTimePicker ? `MM/dd/yyyy, ${n()}` : "MM/dd/yyyy", t2 = (J) => Pa(J, e2.enableSeconds), r = () => e2.range ? e2.startTime && Array.isArray(e2.startTime) ? [t2(e2.startTime[0]), t2(e2.startTime[1])] : null : e2.startTime && !Array.isArray(e2.startTime) ? t2(e2.startTime) : null, l = computed(() => Fr(e2.multiCalendars)), c2 = computed(() => r()), y3 = computed(() => Er(e2.ariaLabels)), D2 = computed(() => Lr(e2.filters)), S3 = computed(() => Hr(e2.transitions)), g = computed(() => Wr(e2.actionRow)), Y2 = computed(
    () => Vr(e2.previewFormat, e2.format, a3())
  ), R2 = computed(() => Ur(e2.textInput)), G2 = computed(() => zr(e2.inline)), q2 = computed(() => jr(e2.config));
  return {
    defaultedTransitions: S3,
    defaultedMultiCalendars: l,
    defaultedStartTime: c2,
    defaultedAriaLabels: y3,
    defaultedFilters: D2,
    defaultedActionRow: g,
    defaultedPreviewFormat: Y2,
    defaultedTextInput: R2,
    defaultedInline: G2,
    defaultedConfig: q2,
    getDefaultPattern: a3,
    getDefaultStartTime: r
  };
};
var Kr = (e2, n, a3) => {
  const t2 = ref(), { defaultedTextInput: r, getDefaultPattern: l } = Se(n), c2 = ref(""), y3 = toRef(n, "format");
  watch(t2, () => {
    e2("internal-model-change", t2.value);
  }), watch(y3, () => {
    v();
  });
  const D2 = (s3) => Sa(s3, n.timezone), S3 = (s3) => Ge(s3, n.timezone), g = (s3, u2) => Ra(
    s3,
    n.format,
    n.formatLocale,
    r.value.rangeSeparator,
    n.modelAuto,
    u2 ?? l()
  ), Y2 = (s3) => {
    const u2 = s3 ?? P();
    return n.modelType ? f(u2) : {
      hours: getHours(u2),
      minutes: getMinutes(u2),
      seconds: n.enableSeconds ? getSeconds(u2) : 0
    };
  }, R2 = (s3) => n.modelType ? f(s3) : { month: getMonth(s3), year: getYear(s3) }, G2 = (s3) => Array.isArray(s3) ? Ht(
    () => [
      setYear(P(), s3[0]),
      s3[1] ? setYear(P(), s3[1]) : yt(n.partialRange)
    ],
    n.range
  ) : setYear(P(), +s3), q2 = (s3, u2) => (typeof s3 == "string" || typeof s3 == "number") && n.modelType ? I2(s3) : u2, J = (s3) => Array.isArray(s3) ? [
    q2(
      s3[0],
      nt(null, +s3[0].hours, +s3[0].minutes, s3[0].seconds)
    ),
    q2(
      s3[1],
      nt(null, +s3[1].hours, +s3[1].minutes, s3[1].seconds)
    )
  ] : q2(s3, nt(null, s3.hours, s3.minutes, s3.seconds)), Q2 = (s3) => Array.isArray(s3) ? n.multiDates ? s3.map((u2) => q2(u2, Je(null, +u2.month, +u2.year))) : Ht(
    () => [
      q2(s3[0], Je(null, +s3[0].month, +s3[0].year)),
      q2(
        s3[1],
        s3[1] ? Je(null, +s3[1].month, +s3[1].year) : yt(n.partialRange)
      )
    ],
    n.range
  ) : q2(s3, Je(null, +s3.month, +s3.year)), p = (s3) => {
    if (Array.isArray(s3))
      return s3.map((u2) => I2(u2));
    throw new Error(Gt.dateArr("multi-dates"));
  }, M3 = (s3) => {
    if (Array.isArray(s3))
      return [P(s3[0]), P(s3[1])];
    throw new Error(Gt.dateArr("week-picker"));
  }, E2 = (s3) => n.modelAuto ? Array.isArray(s3) ? [I2(s3[0]), I2(s3[1])] : n.autoApply ? [I2(s3)] : [I2(s3), null] : Array.isArray(s3) ? Ht(
    () => [
      I2(s3[0]),
      s3[1] ? I2(s3[1]) : yt(n.partialRange)
    ],
    n.range
  ) : I2(s3), z2 = () => {
    Array.isArray(t2.value) && n.range && t2.value.length === 1 && t2.value.push(yt(n.partialRange));
  }, K2 = () => {
    const s3 = t2.value;
    return [
      f(s3[0]),
      s3[1] ? f(s3[1]) : yt(n.partialRange)
    ];
  }, _ = () => t2.value[1] ? K2() : f($e(t2.value[0])), re = () => (t2.value || []).map((s3) => f(s3)), x2 = () => (z2(), n.modelAuto ? _() : n.multiDates ? re() : Array.isArray(t2.value) ? Ht(() => K2(), n.range) : f($e(t2.value))), L2 = (s3) => !s3 || Array.isArray(s3) && !s3.length ? null : n.timePicker ? J($e(s3)) : n.monthPicker ? Q2($e(s3)) : n.yearPicker ? G2($e(s3)) : n.multiDates ? p($e(s3)) : n.weekPicker ? M3($e(s3)) : E2($e(s3)), h4 = (s3) => {
    const u2 = L2(s3);
    Sn($e(u2)) ? (t2.value = $e(u2), v()) : (t2.value = null, c2.value = "");
  }, T2 = () => {
    const s3 = (u2) => format(u2, r.value.format);
    return `${s3(t2.value[0])} ${r.value.rangeSeparator} ${t2.value[1] ? s3(t2.value[1]) : ""}`;
  }, H3 = () => a3.value && t2.value ? Array.isArray(t2.value) ? T2() : format(t2.value, r.value.format) : g(t2.value), ee = () => t2.value ? n.multiDates ? t2.value.map((s3) => g(s3)).join("; ") : r.value.enabled && typeof r.value.format == "string" ? H3() : g(t2.value) : "", v = () => {
    !n.format || typeof n.format == "string" || r.value.enabled && typeof r.value.format == "string" ? c2.value = ee() : c2.value = n.format(t2.value);
  }, I2 = (s3) => {
    if (n.utc) {
      const u2 = new Date(s3);
      return n.utc === "preserve" ? new Date(u2.getTime() + u2.getTimezoneOffset() * 6e4) : u2;
    }
    return n.modelType ? n.modelType === "date" || n.modelType === "timestamp" ? S3(new Date(s3)) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? parse(s3, l(), /* @__PURE__ */ new Date()) : S3(parse(s3, n.modelType, /* @__PURE__ */ new Date())) : S3(new Date(s3));
  }, f = (s3) => s3 ? n.utc ? Rr(s3, n.utc === "preserve", n.enableSeconds) : n.modelType ? n.modelType === "timestamp" ? +D2(s3) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? g(D2(s3)) : g(D2(s3), n.modelType) : D2(s3) : "", k2 = (s3, u2 = false) => {
    if (e2("update:model-value", s3), n.emitTimezone && u2) {
      const C = Array.isArray(s3) ? s3.map((O2) => Ge($e(O2)), n.emitTimezone) : Ge($e(s3), n.emitTimezone);
      e2("update:model-timezone-value", C);
    }
  }, d3 = (s3) => Array.isArray(t2.value) ? n.multiDates ? t2.value.map((u2) => s3(u2)) : [
    s3(t2.value[0]),
    t2.value[1] ? s3(t2.value[1]) : yt(n.partialRange)
  ] : s3($e(t2.value)), o = (s3) => k2($e(d3(s3)));
  return {
    inputValue: c2,
    internalModelValue: t2,
    checkBeforeEmit: () => t2.value ? n.range ? n.partialRange ? t2.value.length >= 1 : t2.value.length === 2 : !!t2.value : false,
    parseExternalModelValue: h4,
    formatInputValue: v,
    emitModelValue: () => (v(), n.monthPicker ? o(R2) : n.timePicker ? o(Y2) : n.yearPicker ? o(getYear) : n.weekPicker ? k2(t2.value, true) : k2(x2(), true))
  };
};
var Gr = (e2, n) => {
  const { defaultedFilters: a3 } = Se(e2), { validateMonthYearInRange: t2 } = Et(e2), r = (S3, g) => {
    let Y2 = S3;
    return a3.value.months.includes(getMonth(Y2)) ? (Y2 = g ? addMonths(S3, 1) : subMonths(S3, 1), r(Y2, g)) : Y2;
  }, l = (S3, g) => {
    let Y2 = S3;
    return a3.value.years.includes(getYear(Y2)) ? (Y2 = g ? addYears(S3, 1) : subYears(S3, 1), l(Y2, g)) : Y2;
  }, c2 = (S3, g = false) => {
    const Y2 = set(/* @__PURE__ */ new Date(), { month: e2.month, year: e2.year });
    let R2 = S3 ? addMonths(Y2, 1) : subMonths(Y2, 1);
    e2.disableYearSelect && (R2 = setYear(R2, e2.year));
    let G2 = getMonth(R2), q2 = getYear(R2);
    a3.value.months.includes(G2) && (R2 = r(R2, S3), G2 = getMonth(R2), q2 = getYear(R2)), a3.value.years.includes(q2) && (R2 = l(R2, S3), q2 = getYear(R2)), t2(G2, q2, S3, e2.preventMinMaxNavigation) && y3(G2, q2, g);
  }, y3 = (S3, g, Y2) => {
    n("update-month-year", { month: S3, year: g, fromNav: Y2 });
  }, D2 = computed(() => (S3) => Ca(
    set(/* @__PURE__ */ new Date(), { month: e2.month, year: e2.year }),
    e2.maxDate,
    e2.minDate,
    e2.preventMinMaxNavigation,
    S3
  ));
  return { handleMonthYearChange: c2, isDisabled: D2, updateMonthYear: y3 };
};
var ht = ((e2) => (e2.center = "center", e2.left = "left", e2.right = "right", e2))(ht || {});
var Le = ((e2) => (e2.month = "month", e2.year = "year", e2))(Le || {});
var ut = ((e2) => (e2.top = "top", e2.bottom = "bottom", e2))(ut || {});
var mt = ((e2) => (e2.header = "header", e2.calendar = "calendar", e2.timePicker = "timePicker", e2))(mt || {});
var je = ((e2) => (e2.month = "month", e2.year = "year", e2.calendar = "calendar", e2.time = "time", e2.minutes = "minutes", e2.hours = "hours", e2.seconds = "seconds", e2))(je || {});
var Zr = ({
  menuRef: e2,
  menuRefInner: n,
  inputRef: a3,
  pickerWrapperRef: t2,
  inline: r,
  emit: l,
  props: c2,
  slots: y3
}) => {
  const D2 = ref({}), S3 = ref(false), g = ref({
    top: "0",
    left: "0"
  }), Y2 = ref(false), R2 = toRef(c2, "teleportCenter");
  watch(R2, () => {
    g.value = JSON.parse(JSON.stringify({})), z2();
  });
  const G2 = (f) => {
    if (c2.teleport) {
      const k2 = f.getBoundingClientRect();
      return {
        left: k2.left + window.scrollX,
        top: k2.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, q2 = (f, k2) => {
    g.value.left = `${f + k2 - D2.value.width}px`;
  }, J = (f) => {
    g.value.left = `${f}px`;
  }, Q2 = (f, k2) => {
    c2.position === ht.left && J(f), c2.position === ht.right && q2(f, k2), c2.position === ht.center && (g.value.left = `${f + k2 / 2 - D2.value.width / 2}px`);
  }, p = (f) => {
    const { width: k2, height: d3 } = f.getBoundingClientRect(), { top: o, left: $ } = c2.altPosition ? c2.altPosition(f) : G2(f);
    return { top: +o, left: +$, width: k2, height: d3 };
  }, M3 = () => {
    g.value.left = "50%", g.value.top = "50%", g.value.transform = "translate(-50%, -50%)", g.value.position = "fixed", delete g.value.opacity;
  }, E2 = () => {
    const f = Ae(a3), { top: k2, left: d3, transform: o } = c2.altPosition(f);
    g.value = { top: `${k2}px`, left: `${d3}px`, transform: o ?? "" };
  }, z2 = (f = true) => {
    var k2;
    if (!r.value.enabled) {
      if (R2.value)
        return M3();
      if (c2.altPosition !== null)
        return E2();
      if (f) {
        const d3 = c2.teleport ? (k2 = n.value) == null ? void 0 : k2.$el : e2.value;
        d3 && (D2.value = d3.getBoundingClientRect()), l("recalculate-position");
      }
      return T2();
    }
  }, K2 = ({ inputEl: f, left: k2, width: d3 }) => {
    window.screen.width > 768 && !S3.value && Q2(k2, d3), x2(f);
  }, _ = (f) => {
    const { top: k2, left: d3, height: o, width: $ } = p(f);
    g.value.top = `${o + k2 + +c2.offset}px`, Y2.value = false, S3.value || (g.value.left = `${d3 + $ / 2 - D2.value.width / 2}px`), K2({ inputEl: f, left: d3, width: $ });
  }, re = (f) => {
    const { top: k2, left: d3, width: o } = p(f);
    g.value.top = `${k2 - +c2.offset - D2.value.height}px`, Y2.value = true, K2({ inputEl: f, left: d3, width: o });
  }, x2 = (f) => {
    if (c2.autoPosition) {
      const { left: k2, width: d3 } = p(f), { left: o, right: $ } = D2.value;
      if (!S3.value) {
        if (Math.abs(o) !== Math.abs($)) {
          if (o <= 0)
            return S3.value = true, J(k2);
          if ($ >= document.documentElement.clientWidth)
            return S3.value = true, q2(k2, d3);
        }
        return Q2(k2, d3);
      }
    }
  }, L2 = () => {
    const f = Ae(a3);
    if (f) {
      const { height: k2 } = D2.value, { top: d3, height: o } = f.getBoundingClientRect(), X2 = window.innerHeight - d3 - o, s3 = d3;
      return k2 <= X2 ? ut.bottom : k2 > X2 && k2 <= s3 ? ut.top : X2 >= s3 ? ut.bottom : ut.top;
    }
    return ut.bottom;
  }, h4 = (f) => L2() === ut.bottom ? _(f) : re(f), T2 = () => {
    const f = Ae(a3);
    if (f)
      return c2.autoPosition ? h4(f) : _(f);
  }, H3 = function(f) {
    if (f) {
      const k2 = f.scrollHeight > f.clientHeight, o = window.getComputedStyle(f).overflowY.indexOf("hidden") !== -1;
      return k2 && !o;
    }
    return true;
  }, ee = function(f) {
    return !f || f === document.body || f.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : H3(f) ? f : ee(f.parentNode);
  }, v = (f) => {
    if (f)
      switch (c2.position) {
        case ht.left:
          return { left: 0, transform: "translateX(0)" };
        case ht.right:
          return { left: `${f.width}px`, transform: "translateX(-100%)" };
        default:
          return { left: `${f.width / 2}px`, transform: "translateX(-50%)" };
      }
    return {};
  };
  return {
    openOnTop: Y2,
    menuStyle: g,
    xCorrect: S3,
    setMenuPosition: z2,
    getScrollableParent: ee,
    shadowRender: (f, k2) => {
      var C, O2, A;
      const d3 = document.createElement("div"), o = (C = Ae(a3)) == null ? void 0 : C.getBoundingClientRect();
      d3.setAttribute("id", "dp--temp-container");
      const $ = (O2 = t2.value) != null && O2.clientWidth ? t2.value : document.body;
      $.append(d3);
      const X2 = document.getElementById("dp--temp-container"), s3 = v(o), u2 = h(
        f,
        {
          ...k2,
          shadow: true,
          style: { opacity: 0, position: "absolute", ...s3 }
        },
        Object.fromEntries(Object.keys(y3).map((te) => [te, y3[te]]))
      );
      render(u2, X2), D2.value = (A = u2.el) == null ? void 0 : A.getBoundingClientRect(), render(null, X2), $.removeChild(X2);
    }
  };
};
var st = [
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
var qr = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var Xr = {
  all: () => st,
  monthYear: () => st.filter((e2) => e2.use.includes("month-year")),
  input: () => qr,
  timePicker: () => st.filter((e2) => e2.use.includes("time")),
  action: () => st.filter((e2) => e2.use.includes("action")),
  calendar: () => st.filter((e2) => e2.use.includes("calendar")),
  menu: () => st.filter((e2) => e2.use.includes("menu")),
  shared: () => st.filter((e2) => e2.use.includes("shared"))
};
var ze = (e2, n, a3) => {
  const t2 = [];
  return Xr[n]().forEach((r) => {
    e2[r.name] && t2.push(r.name);
  }), a3 != null && a3.length && a3.forEach((r) => {
    r.slot && t2.push(r.slot);
  }), t2;
};
var Bt = (e2) => {
  const n = computed(() => (t2) => e2.value ? t2 ? e2.value.open : e2.value.close : ""), a3 = computed(() => (t2) => e2.value ? t2 ? e2.value.menuAppearTop : e2.value.menuAppearBottom : "");
  return { transitionName: n, showTransition: !!e2.value, menuTransition: a3 };
};
var Zt = (e2, n) => {
  const a3 = ref([{ month: getMonth(P()), year: getYear(P()) }]), t2 = reactive({
    hours: e2.range ? [getHours(P()), getHours(P())] : getHours(P()),
    minutes: e2.range ? [getMinutes(P()), getMinutes(P())] : getMinutes(P()),
    seconds: e2.range ? [0, 0] : 0
  }), r = computed({
    get: () => e2.internalModelValue,
    set: (y3) => {
      !e2.readonly && !e2.disabled && n("update:internal-model-value", y3);
    }
  }), l = computed(
    () => (y3) => a3.value[y3] ? a3.value[y3].month : 0
  ), c2 = computed(
    () => (y3) => a3.value[y3] ? a3.value[y3].year : 0
  );
  return {
    calendars: a3,
    time: t2,
    modelValue: r,
    month: l,
    year: c2
  };
};
var Jr = (e2, n) => {
  const { defaultedMultiCalendars: a3 } = Se(n), { isDisabled: t2, matchDate: r } = Et(n), l = ref(null), c2 = ref(P()), y3 = (o) => {
    !o.current && n.hideOffsetDates || (l.value = o.value);
  }, D2 = () => {
    l.value = null;
  }, S3 = (o) => Array.isArray(e2.value) && n.range && e2.value[0] && l.value ? o ? Re(l.value, e2.value[0]) : Pe(l.value, e2.value[0]) : true, g = (o, $) => {
    const X2 = () => e2.value ? $ ? e2.value[0] || null : e2.value[1] : null, s3 = e2.value && Array.isArray(e2.value) ? X2() : null;
    return ge(P(o.value), s3);
  }, Y2 = (o) => {
    const $ = Array.isArray(e2.value) ? e2.value[0] : null;
    return o ? !Pe(l.value ?? null, $) : true;
  }, R2 = (o, $ = true) => (n.range || n.weekPicker) && Array.isArray(e2.value) && e2.value.length === 2 ? n.hideOffsetDates && !o.current ? false : ge(P(o.value), e2.value[$ ? 0 : 1]) : n.range ? g(o, $) && Y2($) || ge(o.value, Array.isArray(e2.value) ? e2.value[0] : null) && S3($) : false, G2 = (o, $, X2) => Array.isArray(e2.value) && e2.value[0] && e2.value.length === 1 ? o ? false : X2 ? Re(e2.value[0], $.value) : Pe(e2.value[0], $.value) : false, q2 = (o) => !e2.value || n.hideOffsetDates && !o.current ? false : n.range ? n.modelAuto && Array.isArray(e2.value) ? ge(o.value, e2.value[0] ? e2.value[0] : c2.value) : false : n.multiDates && Array.isArray(e2.value) ? e2.value.some(($) => ge($, o.value)) : ge(o.value, e2.value ? e2.value : c2.value), J = (o) => {
    if (n.autoRange || n.weekPicker) {
      if (l.value) {
        if (n.hideOffsetDates && !o.current)
          return false;
        const $ = addDays(l.value, +n.autoRange), X2 = jt(P(l.value), n.timezone, n.weekStart);
        return n.weekPicker ? ge(X2[1], P(o.value)) : ge($, P(o.value));
      }
      return false;
    }
    return false;
  }, Q2 = (o) => {
    if (n.autoRange || n.weekPicker) {
      if (l.value) {
        const $ = addDays(l.value, +n.autoRange);
        if (n.hideOffsetDates && !o.current)
          return false;
        const X2 = jt(P(l.value), n.timezone, n.weekStart);
        return n.weekPicker ? Re(o.value, X2[0]) && Pe(o.value, X2[1]) : Re(o.value, l.value) && Pe(o.value, $);
      }
      return false;
    }
    return false;
  }, p = (o) => {
    if (n.autoRange || n.weekPicker) {
      if (l.value) {
        if (n.hideOffsetDates && !o.current)
          return false;
        const $ = jt(P(l.value), n.timezone, n.weekStart);
        return n.weekPicker ? ge($[0], o.value) : ge(l.value, o.value);
      }
      return false;
    }
    return false;
  }, M3 = (o) => Hn(e2.value, l.value, o.value), E2 = () => n.modelAuto && Array.isArray(n.internalModelValue) ? !!n.internalModelValue[0] : false, z2 = () => n.modelAuto ? $a(n.internalModelValue) : true, K2 = (o) => {
    if (Array.isArray(e2.value) && e2.value.length || n.weekPicker)
      return false;
    const $ = n.range ? !R2(o) && !R2(o, false) : true;
    return !t2(o.value) && !q2(o) && !(!o.current && n.hideOffsetDates) && $;
  }, _ = (o) => n.range ? n.modelAuto ? E2() && q2(o) : false : q2(o), re = (o) => {
    var $;
    return n.highlight ? r(
      o.value,
      ($ = n.arrMapValues) != null && $.highlightedDates ? n.arrMapValues.highlightedDates : n.highlight
    ) : false;
  }, x2 = (o) => t2(o.value) && n.highlightDisabledDays === false, L2 = (o) => {
    var $;
    return ($ = n.highlightWeekDays) == null ? void 0 : $.includes(o.value.getDay());
  }, h4 = (o) => (n.range || n.weekPicker) && (!(a3.value.count > 0) || o.current) && z2() && !(!o.current && n.hideOffsetDates) && !q2(o) ? M3(o) : false, T2 = (o) => {
    const { isRangeStart: $, isRangeEnd: X2 } = v(o), s3 = n.range ? $ || X2 : false;
    return {
      dp__cell_offset: !o.current,
      dp__pointer: !n.disabled && !(!o.current && n.hideOffsetDates) && !t2(o.value),
      dp__cell_disabled: t2(o.value),
      dp__cell_highlight: !x2(o) && (re(o) || L2(o)) && !_(o) && !s3,
      dp__cell_highlight_active: !x2(o) && (re(o) || L2(o)) && _(o),
      dp__today: !n.noToday && ge(o.value, c2.value) && o.current
    };
  }, H3 = (o) => ({
    dp__active_date: _(o),
    dp__date_hover: K2(o)
  }), ee = (o) => ({
    ...I2(o),
    ...f(o),
    dp__range_between_week: h4(o) && n.weekPicker
  }), v = (o) => {
    const $ = a3.value.count > 0 ? o.current && R2(o) && z2() : R2(o) && z2(), X2 = a3.value.count > 0 ? o.current && R2(o, false) && z2() : R2(o, false) && z2();
    return { isRangeStart: $, isRangeEnd: X2 };
  }, I2 = (o) => {
    const { isRangeStart: $, isRangeEnd: X2 } = v(o);
    return {
      dp__range_start: $,
      dp__range_end: X2,
      dp__range_between: h4(o) && !n.weekPicker,
      dp__date_hover_start: G2(K2(o), o, true),
      dp__date_hover_end: G2(K2(o), o, false)
    };
  }, f = (o) => ({
    ...I2(o),
    dp__cell_auto_range: Q2(o),
    dp__cell_auto_range_start: p(o),
    dp__cell_auto_range_end: J(o)
  }), k2 = (o) => n.range ? n.autoRange ? f(o) : n.modelAuto ? { ...H3(o), ...I2(o) } : I2(o) : n.weekPicker ? ee(o) : H3(o);
  return {
    setHoverDate: y3,
    clearHoverDate: D2,
    getDayClassData: (o) => n.hideOffsetDates && !o.current ? {} : {
      ...T2(o),
      ...k2(o),
      [n.dayClass ? n.dayClass(o.value) : ""]: true,
      [n.calendarCellClassName]: !!n.calendarCellClassName
    }
  };
};
var Et = (e2) => {
  const { defaultedFilters: n } = Se(e2), a3 = () => {
    if (e2.timezone)
      return e2.timezone;
    if (e2.utc)
      return "UTC";
  }, t2 = (h4) => {
    const T2 = He(r(P(h4))).toISOString(), [H3] = T2.split("T");
    return H3;
  }, r = (h4) => e2.utc === "preserve" ? Sa(h4, a3()) : Ge(h4, a3()), l = (h4) => {
    var $;
    const T2 = e2.maxDate ? Re(r(h4), r(P(e2.maxDate))) : false, H3 = e2.minDate ? Pe(r(h4), r(P(e2.minDate))) : false, ee = S3(
      r(h4),
      ($ = e2.arrMapValues) != null && $.disabledDates ? e2.arrMapValues.disabledDates : e2.disabledDates
    ), I2 = n.value.months.map((X2) => +X2).includes(getMonth(h4)), f = e2.disabledWeekDays.length ? e2.disabledWeekDays.some((X2) => +X2 === getDay(h4)) : false, k2 = Y2(h4), d3 = getYear(h4), o = d3 < +e2.yearRange[0] || d3 > +e2.yearRange[1];
    return !(T2 || H3 || ee || I2 || o || f || k2);
  }, c2 = (h4, T2) => Pe(...et(e2.minDate, h4, T2)) || ge(...et(e2.minDate, h4, T2)), y3 = (h4, T2) => Re(...et(e2.maxDate, h4, T2)) || ge(...et(e2.maxDate, h4, T2)), D2 = (h4, T2, H3) => {
    let ee = false;
    return e2.maxDate && H3 && y3(h4, T2) && (ee = true), e2.minDate && !H3 && c2(h4, T2) && (ee = true), ee;
  }, S3 = (h4, T2) => h4 ? T2 instanceof Map ? !!T2.get(t2(h4)) : Array.isArray(T2) ? T2.some((H3) => ge(r(P(H3)), r(h4))) : T2 ? T2(P(JSON.parse(JSON.stringify(h4)))) : false : true, g = (h4, T2, H3, ee) => {
    let v = false;
    return ee ? e2.minDate && e2.maxDate ? v = D2(h4, T2, H3) : (e2.minDate && c2(h4, T2) || e2.maxDate && y3(h4, T2)) && (v = true) : v = true, v;
  }, Y2 = (h4) => {
    var T2, H3, ee, v, I2;
    return Array.isArray(e2.allowedDates) && !((T2 = e2.allowedDates) != null && T2.length) ? true : (H3 = e2.arrMapValues) != null && H3.allowedDates ? !S3(h4, (ee = e2.arrMapValues) == null ? void 0 : ee.allowedDates) : (v = e2.allowedDates) != null && v.length ? !((I2 = e2.allowedDates) != null && I2.some((f) => ge(r(P(f)), r(h4)))) : false;
  }, R2 = (h4) => !l(h4), G2 = (h4) => e2.noDisabledRange ? !eachDayOfInterval({ start: h4[0], end: h4[1] }).some((H3) => R2(H3)) : true, q2 = (h4, T2, H3 = 0) => {
    if (Array.isArray(T2) && T2[H3]) {
      const ee = differenceInCalendarDays(h4, T2[H3]), v = _a(T2[H3], h4), I2 = v.length === 1 ? 0 : v.filter((k2) => R2(k2)).length, f = Math.abs(ee) - I2;
      if (e2.minRange && e2.maxRange)
        return f >= +e2.minRange && f <= +e2.maxRange;
      if (e2.minRange)
        return f >= +e2.minRange;
      if (e2.maxRange)
        return f <= +e2.maxRange;
    }
    return true;
  }, J = (h4) => new Map(h4.map((T2) => [t2(T2), true])), Q2 = (h4) => Array.isArray(h4) && h4.length > 0, p = () => {
    const h4 = {
      disabledDates: null,
      allowedDates: null,
      highlightedDates: null
    };
    return Q2(e2.allowedDates) && (h4.allowedDates = J(e2.allowedDates)), Q2(e2.highlight) && (h4.highlightedDates = J(e2.highlight)), Q2(e2.disabledDates) && (h4.disabledDates = J(e2.disabledDates)), h4;
  }, M3 = () => !e2.enableTimePicker || e2.monthPicker || e2.yearPicker || e2.ignoreTimeValidation, E2 = (h4) => Array.isArray(h4) ? [h4[0] ? mn(h4[0]) : null, h4[1] ? mn(h4[1]) : null] : mn(h4), z2 = (h4, T2, H3) => h4.find(
    (ee) => +ee.hours === getHours(T2) && ee.minutes === "*" ? true : +ee.minutes === getMinutes(T2)
  ) && H3, K2 = (h4, T2, H3) => {
    const [ee, v] = h4, [I2, f] = T2;
    return !z2(ee, I2, H3) && !z2(v, f, H3) && H3;
  }, _ = (h4, T2) => {
    const H3 = Array.isArray(T2) ? T2 : [T2];
    return Array.isArray(e2.disabledTimes) ? Array.isArray(e2.disabledTimes[0]) ? K2(e2.disabledTimes, H3, h4) : !H3.some((ee) => z2(e2.disabledTimes, ee, h4)) : h4;
  }, re = (h4, T2) => {
    const H3 = Array.isArray(T2) ? [vt(T2[0]), T2[1] ? vt(T2[1]) : void 0] : vt(T2), ee = !e2.disabledTimes(H3);
    return h4 && ee;
  }, x2 = (h4, T2) => e2.disabledTimes ? Array.isArray(e2.disabledTimes) ? _(T2, h4) : re(T2, h4) : T2;
  return {
    isDisabled: R2,
    validateDate: l,
    validateMonthYearInRange: g,
    isDateRangeAllowed: G2,
    checkMinMaxRange: q2,
    matchDate: S3,
    mapDatesArrToMap: p,
    isValidTime: (h4) => {
      let T2 = true;
      if (!h4 || M3())
        return true;
      const H3 = !e2.minDate && !e2.maxDate ? E2(h4) : h4;
      return (e2.maxTime || e2.maxDate) && (T2 = oa(e2.maxTime, e2.maxDate, "max", $e(H3), T2)), (e2.minTime || e2.minDate) && (T2 = oa(e2.minTime, e2.minDate, "min", $e(H3), T2)), x2(h4, T2);
    }
  };
};
var qt = () => {
  const e2 = computed(() => (t2, r) => t2 == null ? void 0 : t2.includes(r)), n = computed(() => (t2, r) => t2.count ? t2.solo ? true : r === 0 : true), a3 = computed(() => (t2, r) => t2.count ? t2.solo ? true : r === t2.count - 1 : true);
  return { hideNavigationButtons: e2, showLeftIcon: n, showRightIcon: a3 };
};
var xr = (e2, n, a3) => {
  const t2 = ref(0), r = reactive({
    // monthYearInput: !!props.timePicker,
    [mt.timePicker]: !e2.enableTimePicker || e2.timePicker || e2.monthPicker,
    [mt.calendar]: false,
    [mt.header]: false
  }), l = (g) => {
    var Y2;
    (Y2 = e2.flow) != null && Y2.length && (r[g] = true, Object.keys(r).filter((R2) => !r[R2]).length || S3());
  }, c2 = () => {
    var g;
    (g = e2.flow) != null && g.length && t2.value !== -1 && (t2.value += 1, n("flow-step", t2.value), S3());
  }, y3 = () => {
    t2.value = -1;
  }, D2 = (g, Y2, ...R2) => {
    e2.flow[t2.value] === g && a3.value && a3.value[Y2](...R2);
  }, S3 = () => {
    D2(je.month, "toggleMonthPicker", true), D2(je.year, "toggleYearPicker", true), D2(je.calendar, "toggleTimePicker", false, true), D2(je.time, "toggleTimePicker", true, true);
    const g = e2.flow[t2.value];
    (g === je.hours || g === je.minutes || g === je.seconds) && D2(g, "toggleTimePicker", true, true, g);
  };
  return { childMount: l, updateFlowStep: c2, resetFlow: y3, flowStep: t2 };
};
var Xt = {
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
  calendar: { type: Function, default: null },
  config: { type: Object, default: void 0 }
};
var xe = {
  ...Xt,
  shadow: { type: Boolean, default: false },
  flowStep: { type: Number, default: 0 },
  internalModelValue: { type: [Date, Array], default: null },
  arrMapValues: { type: Object, default: () => ({}) }
};
var Qr = {
  key: 1,
  class: "dp__input_wrap"
};
var el = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-label", "aria-disabled", "aria-invalid", "onKeydown"];
var tl = {
  key: 2,
  class: "dp__clear_icon"
};
var nl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: false },
    inputValue: { type: String, default: "" },
    ...Xt
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
    const t2 = e2, {
      defaultedTextInput: r,
      defaultedAriaLabels: l,
      defaultedInline: c2,
      defaultedConfig: y3,
      getDefaultPattern: D2,
      getDefaultStartTime: S3
    } = Se(t2), g = ref(), Y2 = ref(null), R2 = ref(false), G2 = ref(false), q2 = computed(
      () => ({
        dp__pointer: !t2.disabled && !t2.readonly && !r.value.enabled,
        dp__disabled: t2.disabled,
        dp__input_readonly: !r.value.enabled,
        dp__input: true,
        dp__input_icon_pad: !t2.hideInputIcon,
        dp__input_valid: !!t2.state,
        dp__input_invalid: t2.state === false,
        dp__input_focus: R2.value || t2.isMenuOpen,
        dp__input_reg: !r.value.enabled,
        [t2.inputClassName]: !!t2.inputClassName
      })
    ), J = () => {
      a3("set-input-date", null), t2.autoApply && (a3("set-empty-date"), g.value = null);
    }, Q2 = (v) => {
      const I2 = S3();
      return Cr(
        v,
        r.value.format ?? D2(),
        I2 ?? Pa({}, t2.enableSeconds),
        t2.inputValue,
        G2.value
      );
    }, p = (v) => {
      const { rangeSeparator: I2 } = r.value, [f, k2] = v.split(`${I2}`);
      if (f) {
        const d3 = Q2(f.trim()), o = k2 ? Q2(k2.trim()) : null, $ = d3 && o ? [d3, o] : [d3];
        g.value = d3 ? $ : null;
      }
    }, M3 = () => {
      G2.value = true;
    }, E2 = (v) => {
      if (t2.range)
        p(v);
      else if (t2.multiDates) {
        const I2 = v.split(";");
        g.value = I2.map((f) => Q2(f.trim())).filter((f) => f);
      } else
        g.value = Q2(v);
    }, z2 = (v) => {
      var f;
      const I2 = typeof v == "string" ? v : (f = v.target) == null ? void 0 : f.value;
      I2 !== "" ? (r.value.openMenu && !t2.isMenuOpen && a3("open"), E2(I2), a3("set-input-date", g.value)) : J(), G2.value = false, a3("update:input-value", I2);
    }, K2 = (v) => {
      r.value.enabled ? (E2(v.target.value), r.value.enterSubmit && Sn(g.value) && t2.inputValue !== "" ? (a3("set-input-date", g.value, true), g.value = null) : r.value.enterSubmit && t2.inputValue === "" && (g.value = null, a3("clear"))) : x2(v);
    }, _ = (v) => {
      r.value.enabled && r.value.tabSubmit && E2(v.target.value), r.value.tabSubmit && Sn(g.value) && t2.inputValue !== "" ? (a3("set-input-date", g.value, true), g.value = null) : r.value.tabSubmit && t2.inputValue === "" && (g.value = null, a3("clear"));
    }, re = () => {
      R2.value = true, a3("focus");
    }, x2 = (v) => {
      v.preventDefault(), tt(v, y3.value, true), r.value.enabled && r.value.openMenu && !c2.value.input && !t2.isMenuOpen ? a3("open") : r.value.enabled || a3("toggle");
    }, L2 = () => {
      a3("real-blur"), R2.value = false, (!t2.isMenuOpen || c2.value.enabled && c2.value.input) && a3("blur"), t2.autoApply && r.value.enabled && g.value && !t2.isMenuOpen && (a3("set-input-date", g.value), a3("select-date"), g.value = null);
    }, h4 = (v) => {
      tt(v, y3.value, true), a3("clear");
    }, T2 = (v) => {
      if (!r.value.enabled) {
        if (v.code === "Tab")
          return;
        v.preventDefault();
      }
    };
    return n({
      focusInput: () => {
        var v;
        (v = Y2.value) == null || v.focus({ preventScroll: true });
      },
      setParsedDate: (v) => {
        g.value = v;
      }
    }), (v, I2) => {
      var f;
      return openBlock(), createElementBlock("div", { onClick: x2 }, [
        v.$slots.trigger && !v.$slots["dp-input"] && !unref(c2).enabled ? renderSlot(v.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !v.$slots.trigger && (!unref(c2).enabled || unref(c2).input) ? (openBlock(), createElementBlock("div", Qr, [
          v.$slots["dp-input"] && !v.$slots.trigger && !unref(c2).enabled ? renderSlot(v.$slots, "dp-input", {
            key: 0,
            value: e2.inputValue,
            isMenuOpen: e2.isMenuOpen,
            onInput: z2,
            onEnter: K2,
            onTab: _,
            onClear: h4,
            onBlur: L2,
            onKeypress: T2,
            onPaste: M3
          }) : createCommentVNode("", true),
          v.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            ref_key: "inputRef",
            ref: Y2,
            id: v.uid ? `dp-input-${v.uid}` : void 0,
            name: v.name,
            class: normalizeClass(q2.value),
            inputmode: unref(r).enabled ? "text" : "none",
            placeholder: v.placeholder,
            disabled: v.disabled,
            readonly: v.readonly,
            required: v.required,
            value: e2.inputValue,
            autocomplete: v.autocomplete,
            "aria-label": (f = unref(l)) == null ? void 0 : f.input,
            "aria-disabled": v.disabled || void 0,
            "aria-invalid": v.state === false ? true : void 0,
            onInput: z2,
            onKeydown: [
              withKeys(K2, ["enter"]),
              withKeys(_, ["tab"]),
              T2
            ],
            onBlur: L2,
            onFocus: re,
            onKeypress: T2,
            onPaste: M3
          }, null, 42, el)),
          createBaseVNode("div", {
            onClick: I2[2] || (I2[2] = (k2) => a3("toggle"))
          }, [
            v.$slots["input-icon"] && !v.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: I2[0] || (I2[0] = (k2) => a3("toggle"))
            }, [
              renderSlot(v.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !v.$slots["input-icon"] && !v.hideInputIcon && !v.$slots["dp-input"] ? (openBlock(), createBlock(unref(It), {
              key: 1,
              onClick: I2[1] || (I2[1] = (k2) => a3("toggle")),
              class: "dp__input_icon dp__input_icons"
            })) : createCommentVNode("", true)
          ]),
          v.$slots["clear-icon"] && e2.inputValue && v.clearable && !v.disabled && !v.readonly ? (openBlock(), createElementBlock("span", tl, [
            renderSlot(v.$slots, "clear-icon", { clear: h4 })
          ])) : createCommentVNode("", true),
          v.clearable && !v.$slots["clear-icon"] && e2.inputValue && !v.disabled && !v.readonly ? (openBlock(), createBlock(unref(ba), {
            key: 3,
            class: "dp__clear_icon dp__input_icons",
            onClick: I2[3] || (I2[3] = withModifiers((k2) => h4(k2), ["prevent"]))
          })) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var al = ["title"];
var rl = { class: "dp__action_buttons" };
var ll = ["onKeydown", "disabled"];
var ol = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ActionRow",
  props: {
    menuMount: { type: Boolean, default: false },
    calendarWidth: { type: Number, default: 0 },
    ...xe
  },
  emits: ["close-picker", "select-date", "select-now", "invalid-select"],
  setup(e2, { emit: n }) {
    const a3 = e2, {
      defaultedActionRow: t2,
      defaultedPreviewFormat: r,
      defaultedMultiCalendars: l,
      defaultedTextInput: c2,
      defaultedInline: y3,
      getDefaultPattern: D2
    } = Se(a3), { isValidTime: S3 } = Et(a3), { buildMatrix: g } = lt(), Y2 = ref(null), R2 = ref(null);
    onMounted(() => {
      a3.arrowNavigation && g([Ae(Y2), Ae(R2)], "actionRow");
    });
    const G2 = computed(() => a3.range && !a3.partialRange && a3.internalModelValue ? a3.internalModelValue.length === 2 : true), q2 = computed(() => !J.value || !Q2.value || !G2.value), J = computed(() => !a3.enableTimePicker || a3.ignoreTimeValidation ? true : S3(a3.internalModelValue)), Q2 = computed(() => a3.monthPicker ? a3.range && Array.isArray(a3.internalModelValue) ? !a3.internalModelValue.filter((h4) => !re(h4)).length : re(a3.internalModelValue) : true), p = () => {
      const L2 = r.value;
      return a3.timePicker || a3.monthPicker, L2($e(a3.internalModelValue));
    }, M3 = () => {
      const L2 = a3.internalModelValue;
      return l.value.count > 0 ? `${E2(L2[0])} - ${E2(L2[1])}` : [E2(L2[0]), E2(L2[1])];
    }, E2 = (L2) => Ra(
      L2,
      r.value,
      a3.formatLocale,
      c2.value.rangeSeparator,
      a3.modelAuto,
      D2()
    ), z2 = computed(() => !a3.internalModelValue || !a3.menuMount ? "" : typeof r.value == "string" ? Array.isArray(a3.internalModelValue) ? a3.internalModelValue.length === 2 && a3.internalModelValue[1] ? M3() : a3.multiDates ? a3.internalModelValue.map((L2) => `${E2(L2)}`) : a3.modelAuto ? `${E2(a3.internalModelValue[0])}` : `${E2(a3.internalModelValue[0])} -` : E2(a3.internalModelValue) : p()), K2 = () => a3.multiDates ? "; " : " - ", _ = computed(
      () => Array.isArray(z2.value) ? z2.value.join(K2()) : z2.value
    ), re = (L2) => {
      if (!a3.monthPicker)
        return true;
      let h4 = true;
      const T2 = P(We(L2));
      if (a3.minDate && a3.maxDate) {
        const H3 = P(We(a3.minDate)), ee = P(We(a3.maxDate));
        return Re(T2, H3) && Pe(T2, ee) || ge(T2, H3) || ge(T2, ee);
      }
      if (a3.minDate) {
        const H3 = P(We(a3.minDate));
        h4 = Re(T2, H3) || ge(T2, H3);
      }
      if (a3.maxDate) {
        const H3 = P(We(a3.maxDate));
        h4 = Pe(T2, H3) || ge(T2, H3);
      }
      return h4;
    }, x2 = () => {
      J.value && Q2.value && G2.value ? n("select-date") : n("invalid-select");
    };
    return (L2, h4) => (openBlock(), createElementBlock("div", {
      class: "dp__action_row",
      style: normalizeStyle(e2.calendarWidth ? { width: `${e2.calendarWidth}px` } : {})
    }, [
      L2.$slots["action-row"] ? renderSlot(L2.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: L2.internalModelValue,
        disabled: q2.value,
        selectDate: () => L2.$emit("select-date"),
        closePicker: () => L2.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(t2).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: _.value
        }, [
          L2.$slots["action-preview"] ? renderSlot(L2.$slots, "action-preview", {
            key: 0,
            value: L2.internalModelValue
          }) : createCommentVNode("", true),
          L2.$slots["action-preview"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(_.value), 1)
          ], 64))
        ], 8, al)) : createCommentVNode("", true),
        createBaseVNode("div", rl, [
          L2.$slots["action-buttons"] ? renderSlot(L2.$slots, "action-buttons", {
            key: 0,
            value: L2.internalModelValue
          }) : createCommentVNode("", true),
          L2.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(y3).enabled && unref(t2).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              ref_key: "cancelButtonRef",
              ref: Y2,
              class: "dp__action_button dp__action_cancel",
              onClick: h4[0] || (h4[0] = (T2) => L2.$emit("close-picker")),
              onKeydown: [
                h4[1] || (h4[1] = withKeys((T2) => L2.$emit("close-picker"), ["enter"])),
                h4[2] || (h4[2] = withKeys((T2) => L2.$emit("close-picker"), ["space"]))
              ]
            }, toDisplayString(L2.cancelText), 545)) : createCommentVNode("", true),
            unref(t2).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              ref_key: "cancelButtonRef",
              ref: Y2,
              class: "dp__action_button dp__action_cancel",
              onClick: h4[3] || (h4[3] = (T2) => L2.$emit("select-now")),
              onKeydown: [
                h4[4] || (h4[4] = withKeys((T2) => L2.$emit("select-now"), ["enter"])),
                h4[5] || (h4[5] = withKeys((T2) => L2.$emit("select-now"), ["space"]))
              ]
            }, toDisplayString(L2.nowButtonLabel), 545)) : createCommentVNode("", true),
            unref(t2).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              type: "button",
              class: "dp__action_button dp__action_select",
              onKeydown: [
                withKeys(x2, ["enter"]),
                withKeys(x2, ["space"])
              ],
              onClick: x2,
              disabled: q2.value,
              ref_key: "selectButtonRef",
              ref: R2
            }, toDisplayString(L2.selectText), 41, ll)) : createCommentVNode("", true)
          ], 64))
        ])
      ], 64))
    ], 4));
  }
});
var sl = ["onKeydown"];
var ul = { class: "dp__selection_grid_header" };
var il = ["aria-selected", "aria-disabled", "onClick", "onKeydown", "onMouseover"];
var dl = ["aria-label", "onKeydown"];
var Ot = defineComponent({
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
    config: {}
  },
  emits: ["selected", "toggle", "reset-flow", "hover-value"],
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { setSelectionGrid: r, buildMultiLevelMatrix: l, setMonthPicker: c2 } = lt(), { defaultedAriaLabels: y3, defaultedTextInput: D2, defaultedConfig: S3 } = Se(
      t2
    ), { hideNavigationButtons: g } = qt(), Y2 = ref(false), R2 = ref(null), G2 = ref(null), q2 = ref([]), J = ref(), Q2 = ref(null), p = ref(0), M3 = ref(null);
    onBeforeUpdate(() => {
      R2.value = null;
    }), onMounted(() => {
      nextTick().then(() => h4()), z2(), E2(true);
    }), onUnmounted(() => E2(false));
    const E2 = (d3) => {
      var o;
      t2.arrowNavigation && ((o = t2.headerRefs) != null && o.length ? c2(d3) : r(d3));
    }, z2 = () => {
      var o;
      const d3 = Ae(G2);
      d3 && (D2.value.enabled || (R2.value ? (o = R2.value) == null || o.focus({ preventScroll: true }) : d3.focus({ preventScroll: true })), Y2.value = d3.clientHeight < d3.scrollHeight);
    }, K2 = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !t2.useRelative,
        "dp--overlay-relative": t2.useRelative
      })
    ), _ = computed(
      () => t2.useRelative ? { height: `${t2.height}px`, width: "260px" } : void 0
    ), re = computed(() => ({
      dp__overlay_col: true
    })), x2 = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: Y2.value,
        dp__button_bottom: t2.isLast
      })
    ), L2 = computed(() => {
      var d3, o;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((d3 = t2.items) == null ? void 0 : d3.length) <= 6,
        dp__container_block: ((o = t2.items) == null ? void 0 : o.length) > 6
      };
    }), h4 = () => {
      nextTick().then(() => {
        const d3 = Ae(R2), o = Ae(G2), $ = Ae(Q2), X2 = Ae(M3), s3 = $ ? $.getBoundingClientRect().height : 0;
        o && (p.value = o.getBoundingClientRect().height - s3), d3 && X2 && (X2.scrollTop = d3.offsetTop - X2.offsetTop - (p.value / 2 - d3.getBoundingClientRect().height) - s3);
      });
    }, T2 = (d3) => {
      d3.disabled || a3("selected", d3.value);
    }, H3 = () => {
      a3("toggle"), a3("reset-flow");
    }, ee = () => {
      t2.escClose && H3();
    }, v = (d3, o, $, X2) => {
      d3 && (o.active && (R2.value = d3), t2.arrowNavigation && (Array.isArray(q2.value[$]) ? q2.value[$][X2] = d3 : q2.value[$] = [d3], I2()));
    }, I2 = () => {
      var o, $;
      const d3 = (o = t2.headerRefs) != null && o.length ? [t2.headerRefs].concat(q2.value) : q2.value.concat([t2.skipButtonRef ? [] : [Q2.value]]);
      l($e(d3), ($ = t2.headerRefs) != null && $.length ? "monthPicker" : "selectionGrid");
    }, f = (d3) => {
      t2.arrowNavigation || tt(d3, S3.value, true);
    }, k2 = (d3) => {
      J.value = d3, a3("hover-value", d3);
    };
    return n({ focusGrid: z2 }), (d3, o) => {
      var $;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: G2,
        class: normalizeClass(K2.value),
        style: normalizeStyle(_.value),
        role: "dialog",
        tabindex: "0",
        onKeydown: [
          withKeys(withModifiers(ee, ["prevent"]), ["esc"]),
          o[0] || (o[0] = withKeys(withModifiers((X2) => f(X2), ["prevent"]), ["left"])),
          o[1] || (o[1] = withKeys(withModifiers((X2) => f(X2), ["prevent"]), ["up"])),
          o[2] || (o[2] = withKeys(withModifiers((X2) => f(X2), ["prevent"]), ["down"])),
          o[3] || (o[3] = withKeys(withModifiers((X2) => f(X2), ["prevent"]), ["right"]))
        ]
      }, [
        createBaseVNode("div", {
          class: normalizeClass(L2.value),
          ref_key: "containerRef",
          ref: M3,
          role: "grid",
          style: normalizeStyle({ height: `${p.value}px` })
        }, [
          createBaseVNode("div", ul, [
            renderSlot(d3.$slots, "header")
          ]),
          d3.$slots.overlay ? renderSlot(d3.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(d3.items, (X2, s3) => (openBlock(), createElementBlock("div", {
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: d3.items.length >= 3 }]),
            key: s3,
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(X2, (u2, C) => (openBlock(), createElementBlock("div", {
              role: "gridcell",
              class: normalizeClass(re.value),
              key: u2.value,
              "aria-selected": u2.active,
              "aria-disabled": u2.disabled || void 0,
              ref_for: true,
              ref: (O2) => v(O2, u2, s3, C),
              tabindex: "0",
              onClick: (O2) => T2(u2),
              onKeydown: [
                withKeys(withModifiers((O2) => T2(u2), ["prevent"]), ["enter"]),
                withKeys(withModifiers((O2) => T2(u2), ["prevent"]), ["space"])
              ],
              onMouseover: (O2) => k2(u2.value)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(u2.className)
              }, [
                d3.$slots.item ? renderSlot(d3.$slots, "item", {
                  key: 0,
                  item: u2
                }) : createCommentVNode("", true),
                d3.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(u2.text), 1)
                ], 64))
              ], 2)
            ], 42, il))), 128))
          ], 2))), 128))
        ], 6),
        d3.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          "aria-label": ($ = unref(y3)) == null ? void 0 : $.toggleOverlay,
          class: normalizeClass(x2.value),
          tabindex: "0",
          ref_key: "toggleButton",
          ref: Q2,
          onClick: H3,
          onKeydown: [
            withKeys(H3, ["enter"]),
            withKeys(H3, ["tab"])
          ]
        }, [
          renderSlot(d3.$slots, "button-icon")
        ], 42, dl)), [
          [vShow, !unref(g)(d3.hideNavigation, d3.type)]
        ]) : createCommentVNode("", true)
      ], 46, sl);
    };
  }
});
var Un = defineComponent({
  __name: "InstanceWrap",
  props: {
    multiCalendars: {},
    stretch: { type: Boolean }
  },
  setup(e2) {
    const n = e2, a3 = computed(
      () => n.multiCalendars > 0 ? [...Array(n.multiCalendars).keys()] : [0]
    ), t2 = computed(() => ({
      dp__instance_calendar: n.multiCalendars > 0
    }));
    return (r, l) => (openBlock(), createElementBlock("div", {
      class: normalizeClass({
        dp__menu_inner: !r.stretch,
        "dp--menu--inner-stretched": r.stretch,
        dp__flex_display: r.multiCalendars > 0
      })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(a3.value, (c2, y3) => (openBlock(), createElementBlock("div", {
        key: c2,
        class: normalizeClass(t2.value)
      }, [
        renderSlot(r.$slots, "default", {
          instance: c2,
          index: y3
        })
      ], 2))), 128))
    ], 2));
  }
});
var cl = ["aria-label", "aria-disabled"];
var St = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ArrowBtn",
  props: {
    ariaLabel: {},
    disabled: { type: Boolean }
  },
  emits: ["activate", "set-ref"],
  setup(e2, { emit: n }) {
    const a3 = ref(null);
    return onMounted(() => n("set-ref", a3)), (t2, r) => (openBlock(), createElementBlock("button", {
      type: "button",
      class: "dp__btn dp--arrow-btn-nav",
      onClick: r[0] || (r[0] = (l) => t2.$emit("activate")),
      onKeydown: [
        r[1] || (r[1] = withKeys(withModifiers((l) => t2.$emit("activate"), ["prevent"]), ["enter"])),
        r[2] || (r[2] = withKeys(withModifiers((l) => t2.$emit("activate"), ["prevent"]), ["space"]))
      ],
      tabindex: "0",
      "aria-label": t2.ariaLabel,
      "aria-disabled": t2.disabled || void 0,
      ref_key: "elRef",
      ref: a3
    }, [
      createBaseVNode("span", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: t2.disabled }])
      }, [
        renderSlot(t2.$slots, "default")
      ], 2)
    ], 40, cl));
  }
});
var Ln = (e2, n, a3) => {
  if (n.value && Array.isArray(n.value))
    if (n.value.some((t2) => ge(e2, t2))) {
      const t2 = n.value.filter((r) => !ge(r, e2));
      n.value = t2.length ? t2 : null;
    } else
      (a3 && +a3 > n.value.length || !a3) && n.value.push(e2);
  else
    n.value = [e2];
};
var Na = (e2, n, a3) => {
  let t2 = e2.value ? e2.value.slice() : [];
  return t2.length === 2 && t2[1] !== null && (t2 = []), t2.length ? Pe(n, t2[0]) ? (t2.unshift(n), a3("range-start", t2[0]), a3("range-start", t2[1])) : (t2[1] = n, a3("range-end", n)) : (t2 = [n], a3("range-start", n)), e2.value = t2, t2;
};
var Wn = (e2, n, a3, t2) => {
  e2[0] && e2[1] && a3 && n("auto-apply"), e2[0] && !e2[1] && t2 && a3 && n("auto-apply");
};
var fl = (e2, n) => {
  const { defaultedMultiCalendars: a3, defaultedAriaLabels: t2, defaultedTransitions: r, defaultedConfig: l } = Se(e2), { modelValue: c2, year: y3, month: D2, calendars: S3 } = Zt(e2, n), g = computed(() => Ma(e2.formatLocale, e2.locale, e2.monthNameFormat)), Y2 = computed(() => Vn(e2.yearRange, e2.reverseYears)), R2 = ref(null), G2 = () => {
    for (let f = 0; f < a3.value.count; f++)
      if (f === 0)
        S3.value[f] = S3.value[0];
      else {
        const k2 = set(P(), S3.value[f - 1]);
        S3.value[f] = { month: getMonth(k2), year: getYear(addYears(k2, f)) };
      }
  }, q2 = (f) => {
    if (!f)
      return G2();
    const k2 = set(P(), S3.value[f]);
    return S3.value[0].year = getYear(subYears(k2, a3.value.count - 1)), G2();
  }, J = (f) => e2.focusStartDate ? f[0] : f[1] ? f[1] : f[0], Q2 = () => {
    if (c2.value) {
      const f = Array.isArray(c2.value) ? J(c2.value) : c2.value;
      S3.value[0] = { month: getMonth(f), year: getYear(f) };
    }
  };
  onMounted(() => {
    Q2(), a3.value.count && G2();
  });
  const p = computed(() => (f, k2) => {
    const d3 = set(We(/* @__PURE__ */ new Date()), {
      month: D2.value(f),
      year: y3.value(f)
    });
    return Ca(d3, e2.maxDate, e2.minDate, e2.preventMinMaxNavigation, k2);
  }), M3 = (f) => f ? { month: getMonth(f), year: getYear(f) } : { month: null, year: null }, E2 = () => c2.value ? Array.isArray(c2.value) ? c2.value.map((f) => M3(f)) : M3(c2.value) : M3(), z2 = (f, k2) => {
    const d3 = S3.value[f], o = E2();
    return Array.isArray(o) ? o.some(($) => $.year === (d3 == null ? void 0 : d3.year) && $.month === k2) : (d3 == null ? void 0 : d3.year) === o.year && k2 === o.month;
  }, K2 = (f, k2, d3) => {
    var $, X2;
    const o = E2();
    return Array.isArray(o) ? y3.value(k2) === (($ = o[d3]) == null ? void 0 : $.year) && f === ((X2 = o[d3]) == null ? void 0 : X2.month) : false;
  }, _ = (f, k2) => {
    if (e2.range) {
      const d3 = E2();
      if (Array.isArray(c2.value) && Array.isArray(d3)) {
        const o = K2(f, k2, 0) || K2(f, k2, 1), $ = Je(We(P()), f, y3.value(k2));
        return Hn(c2.value, R2.value, $) && !o;
      }
      return false;
    }
    return false;
  }, re = computed(() => (f) => kt(g.value, (k2) => {
    const d3 = z2(f, k2.value), o = Rt(
      k2.value,
      Ta(y3.value(f), e2.minDate),
      Aa(y3.value(f), e2.maxDate)
    ) || Br(e2.disabledDates, y3.value(f)).includes(k2.value), $ = _(k2.value, f);
    return { active: d3, disabled: o, isBetween: $ };
  })), x2 = computed(() => (f) => kt(Y2.value, (k2) => {
    const d3 = y3.value(f) === k2.value, o = Rt(k2.value, wt(e2.minDate), wt(e2.maxDate));
    return { active: d3, disabled: o };
  })), L2 = (f, k2) => Je(We(P()), f, y3.value(k2)), h4 = (f, k2) => {
    const d3 = c2.value ? c2.value : We(/* @__PURE__ */ new Date());
    c2.value = Je(d3, f, y3.value(k2)), n("auto-apply");
  }, T2 = (f, k2) => {
    const d3 = Na(c2, L2(f, k2), n);
    Wn(d3, n, e2.autoApply, e2.modelAuto);
  }, H3 = (f, k2) => {
    Ln(L2(f, k2), c2, e2.multiDatesLimit), n("auto-apply", true);
  };
  return {
    groupedMonths: re,
    groupedYears: x2,
    year: y3,
    isDisabled: p,
    defaultedMultiCalendars: a3,
    defaultedAriaLabels: t2,
    defaultedTransitions: r,
    defaultedConfig: l,
    setHoverDate: (f, k2) => {
      R2.value = L2(f, k2);
    },
    selectMonth: (f, k2) => (S3.value[k2].month = f, e2.multiDates ? H3(f, k2) : e2.range ? T2(f, k2) : h4(f, k2)),
    selectYear: (f, k2) => {
      S3.value[k2].year = f, a3.value.count && !a3.value.solo && q2(k2);
    }
  };
};
var vl = { class: "dp__month_picker_header" };
var ml = ["aria-label", "onClick", "onKeydown"];
var gl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "MonthPicker",
  props: {
    ...xe
  },
  emits: [
    "update:internal-model-value",
    "overlay-closed",
    "reset-flow",
    "range-start",
    "range-end",
    "auto-apply"
  ],
  setup(e2, { emit: n }) {
    const a3 = e2, {
      groupedMonths: t2,
      groupedYears: r,
      year: l,
      isDisabled: c2,
      defaultedMultiCalendars: y3,
      defaultedAriaLabels: D2,
      defaultedTransitions: S3,
      defaultedConfig: g,
      setHoverDate: Y2,
      selectMonth: R2,
      selectYear: G2
    } = fl(a3, n), { transitionName: q2, showTransition: J } = Bt(S3), { showRightIcon: Q2, showLeftIcon: p } = qt(), M3 = ref([false]), E2 = (_, re) => {
      G2(_, re), K2(re);
    }, z2 = (_, re = false) => {
      if (!c2.value(_, re)) {
        const x2 = re ? l.value(_) + 1 : l.value(_) - 1;
        G2(x2, _);
      }
    }, K2 = (_, re = false, x2) => {
      re || n("reset-flow"), x2 !== void 0 ? M3.value[_] = x2 : M3.value[_] = !M3.value[_], M3.value || n("overlay-closed");
    };
    return (_, re) => (openBlock(), createBlock(Un, {
      "multi-calendars": unref(y3).count,
      stretch: ""
    }, {
      default: withCtx(({ instance: x2 }) => [
        _.$slots["month-year"] ? renderSlot(_.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, {
          year: unref(l),
          months: unref(t2)(x2),
          years: unref(r)(x2),
          selectMonth: unref(R2),
          selectYear: unref(G2),
          instance: x2
        }))) : (openBlock(), createBlock(Ot, {
          key: 1,
          items: unref(t2)(x2),
          "arrow-navigation": _.arrowNavigation,
          "is-last": _.autoApply && !_.keepActionRow && !unref(g).keepActionRow,
          "esc-close": _.escClose,
          height: _.modeHeight !== 255 ? _.modeHeight : unref(g).modeHeight,
          config: _.config,
          onSelected: (L2) => unref(R2)(L2, x2),
          onHoverValue: (L2) => unref(Y2)(L2, x2),
          "use-relative": "",
          type: "month"
        }, {
          header: withCtx(() => {
            var L2, h4, T2;
            return [
              createBaseVNode("div", vl, [
                unref(p)(unref(y3), x2) ? (openBlock(), createBlock(St, {
                  key: 0,
                  ref: "mpPrevIconRef",
                  "aria-label": (L2 = unref(D2)) == null ? void 0 : L2.prevYear,
                  disabled: unref(c2)(x2, false),
                  onActivate: (H3) => z2(x2, false)
                }, {
                  default: withCtx(() => [
                    _.$slots["arrow-left"] ? renderSlot(_.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                    _.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Rn), { key: 1 }))
                  ]),
                  _: 2
                }, 1032, ["aria-label", "disabled", "onActivate"])) : createCommentVNode("", true),
                createBaseVNode("div", {
                  class: "dp--year-select",
                  role: "button",
                  ref: "mpYearButtonRef",
                  "aria-label": (h4 = unref(D2)) == null ? void 0 : h4.openYearsOverlay,
                  tabindex: "0",
                  onClick: () => K2(x2, false),
                  onKeydown: withKeys(() => K2(x2, false), ["enter"])
                }, [
                  _.$slots.year ? renderSlot(_.$slots, "year", {
                    key: 0,
                    year: unref(l)(x2)
                  }) : createCommentVNode("", true),
                  _.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(unref(l)(x2)), 1)
                  ], 64))
                ], 40, ml),
                unref(Q2)(unref(y3), x2) ? (openBlock(), createBlock(St, {
                  key: 1,
                  ref: "mpNextIconRef",
                  "aria-label": (T2 = unref(D2)) == null ? void 0 : T2.nextYear,
                  disabled: unref(c2)(x2, false),
                  onActivate: (H3) => z2(x2, true)
                }, {
                  default: withCtx(() => [
                    _.$slots["arrow-right"] ? renderSlot(_.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
                    _.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(On), { key: 1 }))
                  ]),
                  _: 2
                }, 1032, ["aria-label", "disabled", "onActivate"])) : createCommentVNode("", true),
                createVNode(Transition, {
                  name: unref(q2)(M3.value[x2]),
                  css: unref(J)
                }, {
                  default: withCtx(() => [
                    M3.value[x2] ? (openBlock(), createBlock(Ot, {
                      key: 0,
                      items: unref(r)(x2),
                      "text-input": _.textInput,
                      "esc-close": _.escClose,
                      config: _.config,
                      onToggle: (H3) => K2(x2),
                      onSelected: (H3) => E2(H3, x2),
                      "is-last": _.autoApply && !_.keepActionRow && !unref(g).keepActionRow,
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
                        fn: withCtx(({ item: H3 }) => [
                          renderSlot(_.$slots, "year-overlay-value", {
                            text: H3.text,
                            value: H3.value
                          })
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1032, ["items", "text-input", "esc-close", "config", "onToggle", "onSelected", "is-last"])) : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1032, ["name", "css"])
              ])
            ];
          }),
          _: 2
        }, 1032, ["items", "arrow-navigation", "is-last", "esc-close", "height", "config", "onSelected", "onHoverValue"]))
      ]),
      _: 3
    }, 8, ["multi-calendars"]));
  }
});
var yl = (e2, n) => {
  const { modelValue: a3 } = Zt(e2, n), t2 = ref(null), r = (g) => Array.isArray(a3.value) ? a3.value.some((Y2) => getYear(Y2) === g) : a3.value ? getYear(a3.value) === g : false, l = (g) => e2.range && Array.isArray(a3.value) ? Hn(a3.value, t2.value, y3(g)) : false, c2 = computed(() => kt(Vn(e2.yearRange, e2.reverseYears), (g) => {
    const Y2 = r(g.value), R2 = Rt(g.value, wt(e2.minDate), wt(e2.maxDate)), G2 = l(g.value);
    return { active: Y2, disabled: R2, isBetween: G2 };
  })), y3 = (g) => setYear(We(/* @__PURE__ */ new Date()), g);
  return {
    groupedYears: c2,
    setHoverValue: (g) => {
      t2.value = setYear(We(/* @__PURE__ */ new Date()), g);
    },
    selectYear: (g) => {
      if (e2.multiDates)
        return Ln(y3(g), a3, e2.multiDatesLimit), n("auto-apply", true);
      if (e2.range) {
        const Y2 = Na(a3, y3(g), n);
        return Wn(Y2, n, e2.autoApply, e2.modelAuto);
      }
      a3.value = y3(g), n("auto-apply");
    }
  };
};
var hl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "YearPicker",
  props: {
    ...xe
  },
  emits: ["update:internal-model-value", "reset-flow", "range-start", "range-end", "auto-apply"],
  setup(e2, { emit: n }) {
    const a3 = e2, { groupedYears: t2, selectYear: r, setHoverValue: l } = yl(a3, n), { defaultedConfig: c2 } = Se(a3);
    return (y3, D2) => (openBlock(), createElementBlock("div", null, [
      y3.$slots["month-year"] ? renderSlot(y3.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, {
        years: unref(t2),
        selectYear: unref(r)
      }))) : (openBlock(), createBlock(Ot, {
        key: 1,
        items: unref(t2),
        "is-last": y3.autoApply && !y3.keepActionRow && !unref(c2).keepActionRow,
        height: y3.modeHeight !== 255 ? y3.modeHeight : unref(c2).modeHeight,
        config: y3.config,
        type: "year",
        "use-relative": "",
        onSelected: unref(r),
        onHoverValue: unref(l)
      }, createSlots({ _: 2 }, [
        y3.$slots["year-overlay-value"] ? {
          name: "item",
          fn: withCtx(({ item: S3 }) => [
            renderSlot(y3.$slots, "year-overlay-value", {
              text: S3.text,
              value: S3.value
            })
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["items", "is-last", "height", "config", "onSelected", "onHoverValue"]))
    ]));
  }
});
var pl = {
  key: 0,
  class: "dp__time_input"
};
var bl = ["aria-label", "onKeydown", "onClick"];
var kl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var wl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var Dl = ["aria-label", "disabled", "onKeydown", "onClick"];
var Ml = ["aria-label", "onKeydown", "onClick"];
var $l = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var Tl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var Al = { key: 0 };
var Sl = ["aria-label", "onKeydown"];
var _l = defineComponent({
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
    ...xe
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
    const t2 = e2, { setTimePickerElements: r, setTimePickerBackRef: l } = lt(), { defaultedAriaLabels: c2, defaultedTransitions: y3, defaultedFilters: D2, defaultedConfig: S3 } = Se(t2), { transitionName: g, showTransition: Y2 } = Bt(y3), R2 = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), G2 = ref("AM"), q2 = ref(null), J = ref([]);
    onMounted(() => {
      a3("mounted");
    });
    const Q2 = (u2) => set(/* @__PURE__ */ new Date(), {
      hours: u2.hours,
      minutes: u2.minutes,
      seconds: t2.enableSeconds ? u2.seconds : 0,
      milliseconds: 0
    }), p = computed(() => (u2) => T2(u2, t2[u2])), M3 = computed(() => ({ hours: t2.hours, minutes: t2.minutes, seconds: t2.seconds })), E2 = computed(() => (u2) => !ee(+t2[u2] + +t2[`${u2}Increment`], u2)), z2 = computed(() => (u2) => !ee(+t2[u2] - +t2[`${u2}Increment`], u2)), K2 = (u2, C) => add(set(P(), u2), C), _ = (u2, C) => sub(set(P(), u2), C), re = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !t2.timePickerInline,
        dp__time_col_reg_block: !t2.enableSeconds && t2.is24 && !t2.timePickerInline,
        dp__time_col_reg_inline: !t2.enableSeconds && t2.is24 && t2.timePickerInline,
        dp__time_col_reg_with_button: !t2.enableSeconds && !t2.is24,
        dp__time_col_sec: t2.enableSeconds && t2.is24,
        dp__time_col_sec_with_button: t2.enableSeconds && !t2.is24
      })
    ), x2 = computed(() => {
      const u2 = [{ type: "hours" }, { type: "", separator: true }, { type: "minutes" }];
      return t2.enableSeconds ? u2.concat([{ type: "", separator: true }, { type: "seconds" }]) : u2;
    }), L2 = computed(() => x2.value.filter((u2) => !u2.separator)), h4 = computed(() => (u2) => {
      if (u2 === "hours") {
        const C = d3(+t2.hours);
        return { text: C < 10 ? `0${C}` : `${C}`, value: C };
      }
      return { text: t2[u2] < 10 ? `0${t2[u2]}` : `${t2[u2]}`, value: t2[u2] };
    }), T2 = (u2, C) => {
      var A;
      if (!t2.disabledTimesConfig)
        return false;
      const O2 = t2.disabledTimesConfig(t2.order, u2 === "hours" ? C : void 0);
      return O2[u2] ? !!((A = O2[u2]) != null && A.includes(C)) : true;
    }, H3 = (u2) => {
      const C = t2.is24 ? 24 : 12, O2 = u2 === "hours" ? C : 60, A = +t2[`${u2}GridIncrement`], te = u2 === "hours" && !t2.is24 ? A : 0, B2 = [];
      for (let ie = te; ie < O2; ie += A)
        B2.push({ value: ie, text: ie < 10 ? `0${ie}` : `${ie}` });
      return u2 === "hours" && !t2.is24 && B2.push({ value: 0, text: "12" }), kt(B2, (ie) => ({ active: false, disabled: D2.value.times[u2].includes(ie.value) || !ee(ie.value, u2) || T2(u2, ie.value) }));
    }, ee = (u2, C) => {
      const O2 = t2.minTime ? Q2(fn(t2.minTime)) : null, A = t2.maxTime ? Q2(fn(t2.maxTime)) : null, te = Q2(fn(M3.value, C, u2));
      return O2 && A ? (isBefore(te, A) || isEqual(te, A)) && (isAfter(te, O2) || isEqual(te, O2)) : O2 ? isAfter(te, O2) || isEqual(te, O2) : A ? isBefore(te, A) || isEqual(te, A) : true;
    }, v = (u2) => t2[`no${u2[0].toUpperCase() + u2.slice(1)}Overlay`], I2 = (u2) => {
      v(u2) || (R2[u2] = !R2[u2], R2[u2] || a3("overlay-closed"));
    }, f = (u2) => u2 === "hours" ? getHours : u2 === "minutes" ? getMinutes : getSeconds, k2 = (u2, C = true) => {
      const O2 = C ? K2 : _, A = C ? +t2[`${u2}Increment`] : -+t2[`${u2}Increment`];
      ee(+t2[u2] + A, u2) && a3(
        `update:${u2}`,
        f(u2)(O2({ [u2]: +t2[u2] }, { [u2]: +t2[`${u2}Increment`] }))
      );
    }, d3 = (u2) => t2.is24 ? u2 : (u2 >= 12 ? G2.value = "PM" : G2.value = "AM", Ar(u2)), o = () => {
      G2.value === "PM" ? (G2.value = "AM", a3("update:hours", t2.hours - 12)) : (G2.value = "PM", a3("update:hours", t2.hours + 12)), a3("am-pm-change", G2.value);
    }, $ = (u2) => {
      R2[u2] = true;
    }, X2 = (u2, C, O2) => {
      if (u2 && t2.arrowNavigation) {
        Array.isArray(J.value[C]) ? J.value[C][O2] = u2 : J.value[C] = [u2];
        const A = J.value.reduce(
          (te, B2) => B2.map((ie, he) => [...te[he] || [], B2[he]]),
          []
        );
        l(t2.closeTimePickerBtn), q2.value && (A[1] = A[1].concat(q2.value)), r(A, t2.order);
      }
    }, s3 = (u2, C) => (I2(u2), u2 === "hours" && !t2.is24 ? a3(`update:${u2}`, G2.value === "PM" ? C + 12 : C) : a3(`update:${u2}`, C));
    return n({ openChildCmp: $ }), (u2, C) => {
      var O2;
      return u2.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", pl, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(x2.value, (A, te) => {
          var B2, ie, he;
          return openBlock(), createElementBlock("div", {
            key: te,
            class: normalizeClass(re.value)
          }, [
            A.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(" : ")
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !t2.timePickerInline,
                  dp__inc_dec_button_inline: t2.timePickerInline,
                  dp__tp_inline_btn_top: t2.timePickerInline,
                  dp__inc_dec_button_disabled: E2.value(A.type)
                }),
                "aria-label": (B2 = unref(c2)) == null ? void 0 : B2.incrementValue(A.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((me) => k2(A.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((me) => k2(A.type), ["prevent"]), ["space"])
                ],
                onClick: (me) => k2(A.type),
                ref_for: true,
                ref: (me) => X2(me, te, 0)
              }, [
                t2.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  kl,
                  wl
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  u2.$slots["arrow-up"] ? renderSlot(u2.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  u2.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Yn), { key: 1 }))
                ], 64))
              ], 42, bl),
              createBaseVNode("button", {
                type: "button",
                "aria-label": (ie = unref(c2)) == null ? void 0 : ie.openTpOverlay(A.type),
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !t2.timePickerInline,
                  dp__time_display_inline: t2.timePickerInline,
                  "dp--time-invalid": p.value(A.type),
                  "dp--time-overlay-btn": !p.value(A.type)
                }),
                disabled: v(A.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((me) => I2(A.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((me) => I2(A.type), ["prevent"]), ["space"])
                ],
                onClick: (me) => I2(A.type),
                ref_for: true,
                ref: (me) => X2(me, te, 1)
              }, [
                u2.$slots[A.type] ? renderSlot(u2.$slots, A.type, {
                  key: 0,
                  text: h4.value(A.type).text,
                  value: h4.value(A.type).value
                }) : createCommentVNode("", true),
                u2.$slots[A.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(h4.value(A.type).text), 1)
                ], 64))
              ], 42, Dl),
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !t2.timePickerInline,
                  dp__inc_dec_button_inline: t2.timePickerInline,
                  dp__tp_inline_btn_bottom: t2.timePickerInline,
                  dp__inc_dec_button_disabled: z2.value(A.type)
                }),
                "aria-label": (he = unref(c2)) == null ? void 0 : he.decrementValue(A.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((me) => k2(A.type, false), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((me) => k2(A.type, false), ["prevent"]), ["space"])
                ],
                onClick: (me) => k2(A.type, false),
                ref_for: true,
                ref: (me) => X2(me, te, 2)
              }, [
                t2.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  $l,
                  Tl
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  u2.$slots["arrow-down"] ? renderSlot(u2.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                  u2.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(In), { key: 1 }))
                ], 64))
              ], 42, Ml)
            ], 64))
          ], 2);
        }), 128)),
        u2.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Al, [
          u2.$slots["am-pm-button"] ? renderSlot(u2.$slots, "am-pm-button", {
            key: 0,
            toggle: o,
            value: G2.value
          }) : createCommentVNode("", true),
          u2.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: q2,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (O2 = unref(c2)) == null ? void 0 : O2.amPmButton,
            tabindex: "0",
            onClick: o,
            onKeydown: [
              withKeys(withModifiers(o, ["prevent"]), ["enter"]),
              withKeys(withModifiers(o, ["prevent"]), ["space"])
            ]
          }, toDisplayString(G2.value), 41, Sl))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(L2.value, (A, te) => (openBlock(), createBlock(Transition, {
          key: te,
          name: unref(g)(R2[A.type]),
          css: unref(Y2)
        }, {
          default: withCtx(() => [
            R2[A.type] ? (openBlock(), createBlock(Ot, {
              key: 0,
              items: H3(A.type),
              "is-last": u2.autoApply && !u2.keepActionRow && !unref(S3).keepActionRow,
              "esc-close": u2.escClose,
              type: A.type,
              "text-input": u2.textInput,
              config: u2.config,
              "arrow-navigation": u2.arrowNavigation,
              onSelected: (B2) => s3(A.type, B2),
              onToggle: (B2) => I2(A.type),
              onResetFlow: C[0] || (C[0] = (B2) => u2.$emit("reset-flow"))
            }, createSlots({
              "button-icon": withCtx(() => [
                u2.$slots["clock-icon"] ? renderSlot(u2.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                u2.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Nn), { key: 1 }))
              ]),
              _: 2
            }, [
              u2.$slots[`${A.type}-overlay-value`] ? {
                name: "item",
                fn: withCtx(({ item: B2 }) => [
                  renderSlot(u2.$slots, `${A.type}-overlay-value`, {
                    text: B2.text,
                    value: B2.value
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
var Pl = ["aria-label"];
var Cl = ["tabindex"];
var Rl = ["aria-label"];
var Ya = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePicker",
  props: {
    hours: { type: [Number, Array], default: 0 },
    minutes: { type: [Number, Array], default: 0 },
    seconds: { type: [Number, Array], default: 0 },
    disabledTimesConfig: { type: Function, default: null },
    ...xe
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
    const t2 = e2, { buildMatrix: r, setTimePicker: l } = lt(), c2 = useSlots(), { defaultedTransitions: y3, defaultedAriaLabels: D2, defaultedTextInput: S3, defaultedConfig: g } = Se(t2), { transitionName: Y2, showTransition: R2 } = Bt(y3), { hideNavigationButtons: G2 } = qt(), q2 = ref(null), J = ref(null), Q2 = ref([]), p = ref(null);
    onMounted(() => {
      a3("mount"), !t2.timePicker && t2.arrowNavigation ? r([Ae(q2.value)], "time") : l(true, t2.timePicker);
    });
    const M3 = computed(() => t2.range && t2.modelAuto ? $a(t2.internalModelValue) : true), E2 = ref(false), z2 = (v) => ({
      hours: Array.isArray(t2.hours) ? t2.hours[v] : t2.hours,
      minutes: Array.isArray(t2.minutes) ? t2.minutes[v] : t2.minutes,
      seconds: Array.isArray(t2.seconds) ? t2.seconds[v] : t2.seconds
    }), K2 = computed(() => {
      const v = [];
      if (t2.range)
        for (let I2 = 0; I2 < 2; I2++)
          v.push(z2(I2));
      else
        v.push(z2(0));
      return v;
    }), _ = (v, I2 = false, f = "") => {
      I2 || a3("reset-flow"), E2.value = v, a3(v ? "overlay-opened" : "overlay-closed"), t2.arrowNavigation && l(v), nextTick(() => {
        f !== "" && Q2.value[0] && Q2.value[0].openChildCmp(f);
      });
    }, re = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: t2.autoApply && !t2.keepActionRow && !g.value.keepActionRow
    })), x2 = ze(c2, "timePicker"), L2 = (v, I2, f) => t2.range ? I2 === 0 ? [v, K2.value[1][f]] : [K2.value[0][f], v] : v, h4 = (v) => {
      a3("update:hours", v);
    }, T2 = (v) => {
      a3("update:minutes", v);
    }, H3 = (v) => {
      a3("update:seconds", v);
    }, ee = () => {
      if (p.value && !S3.value.enabled) {
        const v = _r(p.value);
        v && v.focus({ preventScroll: true });
      }
    };
    return n({ toggleTimePicker: _ }), (v, I2) => {
      var f;
      return openBlock(), createElementBlock("div", null, [
        !v.timePicker && !v.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          class: normalizeClass(re.value),
          "aria-label": (f = unref(D2)) == null ? void 0 : f.openTimePicker,
          tabindex: "0",
          ref_key: "openTimePickerBtn",
          ref: q2,
          onKeydown: [
            I2[0] || (I2[0] = withKeys((k2) => _(true), ["enter"])),
            I2[1] || (I2[1] = withKeys((k2) => _(true), ["space"]))
          ],
          onClick: I2[2] || (I2[2] = (k2) => _(true))
        }, [
          v.$slots["clock-icon"] ? renderSlot(v.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          v.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Nn), { key: 1 }))
        ], 42, Pl)), [
          [vShow, !unref(G2)(v.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(Y2)(E2.value),
          css: unref(R2) && !v.timePickerInline
        }, {
          default: withCtx(() => {
            var k2;
            return [
              E2.value || v.timePicker || v.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass({
                  dp__overlay: !v.timePickerInline,
                  "dp--overlay-absolute": !t2.timePicker && !v.timePickerInline,
                  "dp--overlay-relative": t2.timePicker
                }),
                style: normalizeStyle(
                  v.timePicker ? { height: `${v.modeHeight !== 255 ? v.modeHeight : unref(g).modeHeight}px` } : void 0
                ),
                ref_key: "overlayRef",
                ref: p,
                tabindex: v.timePickerInline ? void 0 : 0
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(
                    v.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
                  ),
                  style: { display: "flex" }
                }, [
                  v.$slots["time-picker-overlay"] ? renderSlot(v.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e2.hours,
                    minutes: e2.minutes,
                    seconds: e2.seconds,
                    setHours: h4,
                    setMinutes: T2,
                    setSeconds: H3
                  }) : createCommentVNode("", true),
                  v.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(v.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(K2.value, (d3, o) => withDirectives((openBlock(), createBlock(_l, mergeProps({ key: o }, {
                      ...v.$props,
                      order: o,
                      hours: d3.hours,
                      minutes: d3.minutes,
                      seconds: d3.seconds,
                      closeTimePickerBtn: J.value,
                      disabledTimesConfig: e2.disabledTimesConfig,
                      disabled: o === 0 ? v.fixedStart : v.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: Q2,
                      "onUpdate:hours": ($) => h4(L2($, o, "hours")),
                      "onUpdate:minutes": ($) => T2(L2($, o, "minutes")),
                      "onUpdate:seconds": ($) => H3(L2($, o, "seconds")),
                      onMounted: ee,
                      onOverlayClosed: ee,
                      onAmPmChange: I2[3] || (I2[3] = ($) => v.$emit("am-pm-change", $))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(x2), ($, X2) => ({
                        name: $,
                        fn: withCtx((s3) => [
                          renderSlot(v.$slots, $, normalizeProps(guardReactiveProps(s3)))
                        ])
                      }))
                    ]), 1040, ["onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, o === 0 ? true : M3.value]
                    ])), 128))
                  ], 2)),
                  !v.timePicker && !v.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    type: "button",
                    ref_key: "closeTimePickerBtn",
                    ref: J,
                    class: normalizeClass(re.value),
                    "aria-label": (k2 = unref(D2)) == null ? void 0 : k2.closeTimePicker,
                    tabindex: "0",
                    onKeydown: [
                      I2[4] || (I2[4] = withKeys((d3) => _(false), ["enter"])),
                      I2[5] || (I2[5] = withKeys((d3) => _(false), ["space"]))
                    ],
                    onClick: I2[6] || (I2[6] = (d3) => _(false))
                  }, [
                    v.$slots["calendar-icon"] ? renderSlot(v.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    v.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(It), { key: 1 }))
                  ], 42, Rl)), [
                    [vShow, !unref(G2)(v.hideNavigation, "time")]
                  ]) : createCommentVNode("", true)
                ], 2)
              ], 14, Cl)) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var Ia = (e2, n, a3, t2) => {
  const r = (p, M3) => Array.isArray(n[p]) ? n[p][M3] : n[p], l = (p) => e2.enableSeconds ? Array.isArray(n.seconds) ? n.seconds[p] : n.seconds : 0, c2 = (p, M3) => p ? M3 !== void 0 ? nt(p, r("hours", M3), r("minutes", M3), l(M3)) : nt(p, n.hours, n.minutes, l()) : P(), y3 = (p, M3) => {
    n[p] = M3;
  }, D2 = (p, M3) => {
    const E2 = Object.fromEntries(
      Object.keys(n).map((z2) => z2 === p ? [z2, M3] : [z2, n[z2]].slice())
    );
    if (e2.range && !e2.disableTimeRangeValidation) {
      const z2 = (_) => a3.value ? nt(
        a3.value[_],
        E2.hours[_],
        E2.minutes[_],
        E2.seconds[_]
      ) : null, K2 = (_) => setMilliseconds(a3.value[_], 0);
      return !(ge(z2(0), z2(1)) && (isAfter(z2(0), K2(1)) || isBefore(z2(1), K2(0))));
    }
    return true;
  }, S3 = (p, M3) => {
    D2(p, M3) && (y3(p, M3), t2 && t2());
  }, g = (p) => {
    S3("hours", p);
  }, Y2 = (p) => {
    S3("minutes", p);
  }, R2 = (p) => {
    S3("seconds", p);
  }, G2 = (p, M3, E2, z2) => {
    M3 && g(p), !M3 && !E2 && Y2(p), E2 && R2(p), a3.value && z2(a3.value);
  }, q2 = (p) => {
    if (p) {
      const M3 = Array.isArray(p), E2 = M3 ? [+p[0].hours, +p[1].hours] : +p.hours, z2 = M3 ? [+p[0].minutes, +p[1].minutes] : +p.minutes, K2 = M3 ? [+p[0].seconds, +p[1].seconds] : +p.seconds;
      y3("hours", E2), y3("minutes", z2), e2.enableSeconds && y3("seconds", K2);
    }
  }, J = (p, M3) => {
    const E2 = {
      hours: Array.isArray(n.hours) ? n.hours[p] : n.hours,
      disabledArr: []
    };
    return (M3 || M3 === 0) && (E2.hours = M3), Array.isArray(e2.disabledTimes) && (E2.disabledArr = e2.range && Array.isArray(e2.disabledTimes[p]) ? e2.disabledTimes[p] : e2.disabledTimes), E2;
  }, Q2 = computed(() => (p, M3) => {
    var E2;
    if (Array.isArray(e2.disabledTimes)) {
      const { disabledArr: z2, hours: K2 } = J(p, M3), _ = z2.filter((re) => +re.hours === K2);
      return ((E2 = _[0]) == null ? void 0 : E2.minutes) === "*" ? { hours: [K2], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (_ == null ? void 0 : _.map((re) => +re.minutes)) ?? [],
        seconds: (_ == null ? void 0 : _.map((re) => re.seconds ? +re.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: y3,
    updateHours: g,
    updateMinutes: Y2,
    updateSeconds: R2,
    getSetDateTime: c2,
    updateTimeValues: G2,
    getSecondsValue: l,
    assignStartTime: q2,
    disabledTimesConfig: Q2
  };
};
var Ol = (e2, n) => {
  const { modelValue: a3, time: t2 } = Zt(e2, n), { defaultedStartTime: r } = Se(e2), { updateTimeValues: l, getSetDateTime: c2, setTime: y3, assignStartTime: D2, disabledTimesConfig: S3 } = Ia(
    e2,
    t2,
    a3
  ), g = (M3) => {
    const { hours: E2, minutes: z2, seconds: K2 } = M3;
    return { hours: +E2, minutes: +z2, seconds: K2 ? +K2 : 0 };
  }, Y2 = () => {
    if (e2.startTime) {
      if (Array.isArray(e2.startTime)) {
        const E2 = g(e2.startTime[0]), z2 = g(e2.startTime[1]);
        return [set(P(), E2), set(P(), z2)];
      }
      const M3 = g(e2.startTime);
      return set(P(), M3);
    }
    return e2.range ? [null, null] : null;
  }, R2 = () => {
    if (e2.range) {
      const [M3, E2] = Y2();
      a3.value = [c2(M3, 0), c2(E2, 1)];
    } else
      a3.value = c2(Y2());
  }, G2 = (M3) => Array.isArray(M3) ? [vt(P(M3[0])), vt(P(M3[1]))] : [vt(M3 ?? P())], q2 = (M3, E2, z2) => {
    y3("hours", M3), y3("minutes", E2), e2.enableSeconds && y3("seconds", z2);
  }, J = () => {
    const [M3, E2] = G2(a3.value);
    return e2.range ? q2(
      [M3.hours, E2.hours],
      [M3.minutes, E2.minutes],
      [M3.seconds, E2.minutes]
    ) : q2(M3.hours, M3.minutes, M3.seconds);
  };
  onMounted(() => {
    if (!e2.shadow)
      return D2(r.value), a3.value ? J() : R2();
  });
  const Q2 = () => {
    Array.isArray(a3.value) ? a3.value = a3.value.map((M3, E2) => M3 && c2(M3, E2)) : a3.value = c2(a3.value), n("time-update");
  };
  return {
    time: t2,
    disabledTimesConfig: S3,
    updateTime: (M3, E2 = true, z2 = false) => {
      l(M3, E2, z2, Q2);
    }
  };
};
var Nl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePickerSolo",
  props: {
    ...xe
  },
  emits: ["update:internal-model-value", "time-update", "am-pm-change"],
  setup(e2, { emit: n }) {
    const a3 = e2, t2 = useSlots(), r = ze(t2, "timePicker"), { time: l, disabledTimesConfig: c2, updateTime: y3 } = Ol(a3, n);
    return (D2, S3) => (openBlock(), createBlock(Un, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(() => [
        createVNode(Ya, mergeProps(D2.$props, {
          hours: unref(l).hours,
          minutes: unref(l).minutes,
          seconds: unref(l).seconds,
          "internal-model-value": D2.internalModelValue,
          "disabled-times-config": unref(c2),
          "onUpdate:hours": S3[0] || (S3[0] = (g) => unref(y3)(g)),
          "onUpdate:minutes": S3[1] || (S3[1] = (g) => unref(y3)(g, false)),
          "onUpdate:seconds": S3[2] || (S3[2] = (g) => unref(y3)(g, false, true)),
          onAmPmChange: S3[3] || (S3[3] = (g) => D2.$emit("am-pm-change", g))
        }), createSlots({ _: 2 }, [
          renderList(unref(r), (g, Y2) => ({
            name: g,
            fn: withCtx((R2) => [
              renderSlot(D2.$slots, g, normalizeProps(guardReactiveProps(R2)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config"])
      ]),
      _: 3
    }));
  }
});
var Yl = { class: "dp__month_year_row" };
var Il = ["aria-label", "onClick", "onKeydown"];
var Bl = defineComponent({
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
    ...xe
  },
  emits: ["update-month-year", "mount", "reset-flow", "overlay-closed"],
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { defaultedTransitions: r, defaultedAriaLabels: l, defaultedMultiCalendars: c2, defaultedFilters: y3, defaultedConfig: D2 } = Se(t2), { transitionName: S3, showTransition: g } = Bt(r), { buildMatrix: Y2 } = lt(), { handleMonthYearChange: R2, isDisabled: G2, updateMonthYear: q2 } = Gr(t2, a3), { showLeftIcon: J, showRightIcon: Q2 } = qt(), p = ref(false), M3 = ref(false), E2 = ref([null, null, null, null]);
    onMounted(() => {
      a3("mount");
    });
    const z2 = (d3) => ({
      get: () => t2[d3],
      set: (o) => {
        const $ = d3 === Le.month ? Le.year : Le.month;
        a3("update-month-year", { [d3]: o, [$]: t2[$] }), d3 === Le.month ? H3(true) : ee(true);
      }
    }), K2 = computed(z2(Le.month)), _ = computed(z2(Le.year)), re = computed(() => (d3) => ({
      month: t2.month,
      year: t2.year,
      items: d3 === Le.month ? t2.months : t2.years,
      instance: t2.instance,
      updateMonthYear: q2,
      toggle: d3 === Le.month ? H3 : ee
    })), x2 = computed(() => {
      const d3 = t2.months.find((o) => o.value === t2.month);
      return d3 || { text: "", value: 0 };
    }), L2 = computed(() => kt(t2.months, (d3) => {
      const o = t2.month === d3.value, $ = Rt(
        d3.value,
        Ta(t2.year, t2.minDate),
        Aa(t2.year, t2.maxDate)
      ) || y3.value.months.includes(d3.value);
      return { active: o, disabled: $ };
    })), h4 = computed(() => kt(t2.years, (d3) => {
      const o = t2.year === d3.value, $ = Rt(d3.value, wt(t2.minDate), wt(t2.maxDate)) || y3.value.years.includes(d3.value);
      return { active: o, disabled: $ };
    })), T2 = (d3, o) => {
      o !== void 0 ? d3.value = o : d3.value = !d3.value, d3.value || a3("overlay-closed");
    }, H3 = (d3 = false, o) => {
      v(d3), T2(p, o);
    }, ee = (d3 = false, o) => {
      v(d3), T2(M3, o);
    }, v = (d3) => {
      d3 || a3("reset-flow");
    }, I2 = (d3, o) => {
      t2.arrowNavigation && (E2.value[o] = Ae(d3), Y2(E2.value, "monthYear"));
    }, f = computed(() => {
      var d3, o;
      return [
        {
          type: Le.month,
          index: 1,
          toggle: H3,
          modelValue: K2.value,
          updateModelValue: ($) => K2.value = $,
          text: x2.value.text,
          showSelectionGrid: p.value,
          items: L2.value,
          ariaLabel: (d3 = l.value) == null ? void 0 : d3.openMonthsOverlay
        },
        {
          type: Le.year,
          index: 2,
          toggle: ee,
          modelValue: _.value,
          updateModelValue: ($) => _.value = $,
          text: t2.year,
          showSelectionGrid: M3.value,
          items: h4.value,
          ariaLabel: (o = l.value) == null ? void 0 : o.openYearsOverlay
        }
      ];
    }), k2 = computed(
      () => t2.disableYearSelect ? [f.value[0]] : f.value
    );
    return n({
      toggleMonthPicker: H3,
      toggleYearPicker: ee,
      handleMonthYearChange: R2
    }), (d3, o) => {
      var $, X2, s3;
      return openBlock(), createElementBlock("div", Yl, [
        d3.$slots["month-year"] ? renderSlot(d3.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, { month: e2.month, year: e2.year, months: e2.months, years: e2.years, updateMonthYear: unref(q2), handleMonthYearChange: unref(R2), instance: e2.instance }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          unref(J)(unref(c2), e2.instance) && !d3.vertical ? (openBlock(), createBlock(St, {
            key: 0,
            "aria-label": ($ = unref(l)) == null ? void 0 : $.prevMonth,
            disabled: unref(G2)(false),
            onActivate: o[0] || (o[0] = (u2) => unref(R2)(false, true)),
            onSetRef: o[1] || (o[1] = (u2) => I2(u2, 0))
          }, {
            default: withCtx(() => [
              d3.$slots["arrow-left"] ? renderSlot(d3.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
              d3.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Rn), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: normalizeClass(["dp__month_year_wrap", {
              dp__year_disable_select: d3.disableYearSelect
            }])
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(k2.value, (u2, C) => (openBlock(), createElementBlock(Fragment, {
              key: u2.type
            }, [
              createBaseVNode("button", {
                type: "button",
                class: "dp__btn dp__month_year_select",
                tabindex: "0",
                "aria-label": u2.ariaLabel,
                ref_for: true,
                ref: (O2) => I2(O2, C + 1),
                onClick: u2.toggle,
                onKeydown: [
                  withKeys(withModifiers(u2.toggle, ["prevent"]), ["enter"]),
                  withKeys(withModifiers(u2.toggle, ["prevent"]), ["space"])
                ]
              }, [
                d3.$slots[u2.type] ? renderSlot(d3.$slots, u2.type, {
                  key: 0,
                  text: u2.text,
                  value: t2[u2.type]
                }) : createCommentVNode("", true),
                d3.$slots[u2.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(u2.text), 1)
                ], 64))
              ], 40, Il),
              createVNode(Transition, {
                name: unref(S3)(u2.showSelectionGrid),
                css: unref(g)
              }, {
                default: withCtx(() => [
                  u2.showSelectionGrid ? (openBlock(), createBlock(Ot, {
                    key: 0,
                    items: u2.items,
                    "arrow-navigation": d3.arrowNavigation,
                    "hide-navigation": d3.hideNavigation,
                    "is-last": d3.autoApply && !d3.keepActionRow && !unref(D2).keepActionRow,
                    "skip-button-ref": false,
                    config: d3.config,
                    type: u2.type,
                    "header-refs": [],
                    "esc-close": d3.escClose,
                    "text-input": d3.textInput,
                    onSelected: u2.updateModelValue,
                    onToggle: u2.toggle
                  }, createSlots({
                    "button-icon": withCtx(() => [
                      d3.$slots["calendar-icon"] ? renderSlot(d3.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                      d3.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(It), { key: 1 }))
                    ]),
                    _: 2
                  }, [
                    d3.$slots[`${u2.type}-overlay-val`] ? {
                      name: "item",
                      fn: withCtx(({ item: O2 }) => [
                        renderSlot(d3.$slots, `${u2.type}-overlay-val`, {
                          text: O2.text,
                          value: O2.value
                        })
                      ]),
                      key: "0"
                    } : void 0,
                    d3.$slots[`${u2.type}-overlay`] ? {
                      name: "overlay",
                      fn: withCtx(() => [
                        renderSlot(d3.$slots, `${u2.type}-overlay`, normalizeProps(guardReactiveProps(re.value(u2.type))))
                      ]),
                      key: "1"
                    } : void 0,
                    d3.$slots[`${u2.type}-overlay-header`] ? {
                      name: "header",
                      fn: withCtx(() => [
                        renderSlot(d3.$slots, `${u2.type}-overlay-header`, {
                          toggle: u2.toggle
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
          unref(J)(unref(c2), e2.instance) && d3.vertical ? (openBlock(), createBlock(St, {
            key: 1,
            "aria-label": (X2 = unref(l)) == null ? void 0 : X2.prevMonth,
            disabled: unref(G2)(false),
            onActivate: o[2] || (o[2] = (u2) => unref(R2)(false, true))
          }, {
            default: withCtx(() => [
              d3.$slots["arrow-up"] ? renderSlot(d3.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
              d3.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Yn), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
          unref(Q2)(unref(c2), e2.instance) ? (openBlock(), createBlock(St, {
            key: 2,
            ref: "rightIcon",
            disabled: unref(G2)(true),
            "aria-label": (s3 = unref(l)) == null ? void 0 : s3.nextMonth,
            onActivate: o[3] || (o[3] = (u2) => unref(R2)(true, true)),
            onSetRef: o[4] || (o[4] = (u2) => I2(u2, d3.disableYearSelect ? 2 : 3))
          }, {
            default: withCtx(() => [
              d3.$slots[d3.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(d3.$slots, d3.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
              d3.$slots[d3.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(d3.vertical ? unref(In) : unref(On)), { key: 1 }))
            ]),
            _: 3
          }, 8, ["disabled", "aria-label"])) : createCommentVNode("", true)
        ], 64))
      ]);
    };
  }
});
var El = ["aria-label"];
var Fl = {
  class: "dp__calendar_header",
  role: "row"
};
var Vl = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
};
var Hl = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1);
var Ul = ["aria-label"];
var Ll = {
  key: 0,
  role: "gridcell",
  class: "dp__calendar_item dp__week_num"
};
var Wl = { class: "dp__cell_inner" };
var zl = ["aria-selected", "aria-disabled", "aria-label", "onClick", "onKeydown", "onMouseenter", "onMouseleave"];
var jl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DpCalendar",
  props: {
    mappedDates: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    ...xe
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
    const t2 = e2, { buildMultiLevelMatrix: r } = lt(), { defaultedTransitions: l, defaultedConfig: c2, defaultedAriaLabels: y3, defaultedMultiCalendars: D2 } = Se(t2), S3 = ref(null), g = ref({
      bottom: "",
      left: "",
      transform: ""
    }), Y2 = ref([]), R2 = ref(null), G2 = ref(true), q2 = ref(""), J = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), Q2 = ref([]), p = ref({ left: "50%" }), M3 = computed(() => t2.calendar ? t2.calendar(t2.mappedDates) : t2.mappedDates), E2 = computed(() => t2.dayNames ? Array.isArray(t2.dayNames) ? t2.dayNames : t2.dayNames(t2.locale, +t2.weekStart) : Tr(t2.formatLocale, t2.locale, +t2.weekStart));
    onMounted(() => {
      a3("mount", { cmp: "calendar", refs: Y2 }), !t2.noSwipe && !c2.value.noSwipe && R2.value && (R2.value.addEventListener("touchstart", ee, { passive: false }), R2.value.addEventListener("touchend", v, { passive: false }), R2.value.addEventListener("touchmove", I2, { passive: false })), t2.monthChangeOnScroll && R2.value && R2.value.addEventListener("wheel", d3, { passive: false });
    });
    const z2 = (s3) => s3 ? t2.vertical ? "vNext" : "next" : t2.vertical ? "vPrevious" : "previous", K2 = (s3, u2) => {
      if (t2.transitions) {
        const C = He(Je(P(), t2.month, t2.year));
        q2.value = Re(He(Je(P(), s3, u2)), C) ? l.value[z2(true)] : l.value[z2(false)], G2.value = false, nextTick(() => {
          G2.value = true;
        });
      }
    }, _ = computed(
      () => ({
        [t2.calendarClassName]: !!t2.calendarClassName
      })
    ), re = computed(() => (s3) => {
      const u2 = Sr(s3);
      return {
        dp__marker_dot: u2.type === "dot",
        dp__marker_line: u2.type === "line"
      };
    }), x2 = computed(() => (s3) => ge(s3, S3.value)), L2 = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: D2.value.count > 0 && t2.instance !== 0
    })), h4 = computed(() => (s3) => t2.hideOffsetDates ? s3.current : true), T2 = async (s3, u2, C) => {
      var O2, A;
      if (a3("set-hover-date", s3), (A = (O2 = s3.marker) == null ? void 0 : O2.tooltip) != null && A.length) {
        const te = Ae(Y2.value[u2][C]);
        if (te) {
          const { width: B2, height: ie } = te.getBoundingClientRect();
          S3.value = s3.value;
          let he = { left: `${B2 / 2}px` }, me = -50;
          if (await nextTick(), Q2.value[0]) {
            const { left: N, width: j } = Q2.value[0].getBoundingClientRect();
            N < 0 && (he = { left: "0" }, me = 0, p.value.left = `${B2 / 2}px`), window.innerWidth < N + j && (he = { right: "0" }, me = 0, p.value.left = `${j - B2 / 2}px`);
          }
          g.value = {
            bottom: `${ie}px`,
            ...he,
            transform: `translateX(${me}%)`
          }, a3("tooltip-open", s3.marker);
        }
      }
    }, H3 = (s3) => {
      S3.value && (S3.value = null, g.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a3("tooltip-close", s3.marker));
    }, ee = (s3) => {
      J.value.startX = s3.changedTouches[0].screenX, J.value.startY = s3.changedTouches[0].screenY;
    }, v = (s3) => {
      J.value.endX = s3.changedTouches[0].screenX, J.value.endY = s3.changedTouches[0].screenY, f();
    }, I2 = (s3) => {
      t2.vertical && !t2.inline && s3.preventDefault();
    }, f = () => {
      const s3 = t2.vertical ? "Y" : "X";
      Math.abs(J.value[`start${s3}`] - J.value[`end${s3}`]) > 10 && a3("handle-swipe", J.value[`start${s3}`] > J.value[`end${s3}`] ? "right" : "left");
    }, k2 = (s3, u2, C) => {
      s3 && (Array.isArray(Y2.value[u2]) ? Y2.value[u2][C] = s3 : Y2.value[u2] = [s3]), t2.arrowNavigation && r(Y2.value, "calendar");
    }, d3 = (s3) => {
      t2.monthChangeOnScroll && (s3.preventDefault(), a3("handle-scroll", s3));
    }, o = (s3) => {
      const u2 = s3[0];
      return t2.weekNumbers === "local" ? getWeek(u2.value, { weekStartsOn: +t2.weekStart }) : t2.weekNumbers === "iso" ? getISOWeek(u2.value) : typeof t2.weekNumbers == "function" ? t2.weekNumbers(u2.value) : "";
    }, $ = (s3, u2) => {
      tt(s3, c2.value), a3("select-date", u2);
    }, X2 = (s3) => {
      tt(s3, c2.value);
    };
    return n({ triggerTransition: K2 }), (s3, u2) => {
      var C;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(L2.value)
      }, [
        createBaseVNode("div", {
          ref_key: "calendarWrapRef",
          ref: R2,
          role: "grid",
          class: normalizeClass(_.value),
          "aria-label": (C = unref(y3)) == null ? void 0 : C.calendarWrap
        }, [
          (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createBaseVNode("div", Fl, [
              s3.weekNumbers ? (openBlock(), createElementBlock("div", Vl, toDisplayString(s3.weekNumName), 1)) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(E2.value, (O2, A) => (openBlock(), createElementBlock("div", {
                class: "dp__calendar_header_item",
                role: "gridcell",
                key: A
              }, [
                s3.$slots["calendar-header"] ? renderSlot(s3.$slots, "calendar-header", {
                  key: 0,
                  day: O2,
                  index: A
                }) : createCommentVNode("", true),
                s3.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(O2), 1)
                ], 64))
              ]))), 128))
            ]),
            Hl,
            createVNode(Transition, {
              name: q2.value,
              css: !!s3.transitions
            }, {
              default: withCtx(() => {
                var O2;
                return [
                  G2.value ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "dp__calendar",
                    role: "grid",
                    "aria-label": ((O2 = unref(y3)) == null ? void 0 : O2.calendarDays) || void 0
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(M3.value, (A, te) => (openBlock(), createElementBlock("div", {
                      class: "dp__calendar_row",
                      role: "row",
                      key: te
                    }, [
                      s3.weekNumbers ? (openBlock(), createElementBlock("div", Ll, [
                        createBaseVNode("div", Wl, toDisplayString(o(A.days)), 1)
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(A.days, (B2, ie) => {
                        var he, me, N;
                        return openBlock(), createElementBlock("div", {
                          role: "gridcell",
                          class: "dp__calendar_item",
                          ref_for: true,
                          ref: (j) => k2(j, te, ie),
                          key: ie + te,
                          "aria-selected": B2.classData.dp__active_date || B2.classData.dp__range_start || B2.classData.dp__range_start,
                          "aria-disabled": B2.classData.dp__cell_disabled || void 0,
                          "aria-label": (me = (he = unref(y3)) == null ? void 0 : he.day) == null ? void 0 : me.call(he, B2),
                          tabindex: "0",
                          onClick: withModifiers((j) => $(j, B2), ["prevent"]),
                          onKeydown: [
                            withKeys((j) => s3.$emit("select-date", B2), ["enter"]),
                            withKeys((j) => s3.$emit("handle-space", B2), ["space"])
                          ],
                          onMouseenter: (j) => T2(B2, te, ie),
                          onMouseleave: (j) => H3(B2)
                        }, [
                          createBaseVNode("div", {
                            class: normalizeClass(["dp__cell_inner", B2.classData])
                          }, [
                            s3.$slots.day && h4.value(B2) ? renderSlot(s3.$slots, "day", {
                              key: 0,
                              day: +B2.text,
                              date: B2.value
                            }) : createCommentVNode("", true),
                            s3.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createTextVNode(toDisplayString(B2.text), 1)
                            ], 64)),
                            B2.marker && h4.value(B2) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                              s3.$slots.marker ? renderSlot(s3.$slots, "marker", {
                                key: 0,
                                marker: B2.marker,
                                day: +B2.text,
                                date: B2.value
                              }) : (openBlock(), createElementBlock("div", {
                                key: 1,
                                class: normalizeClass(re.value(B2.marker)),
                                style: normalizeStyle(B2.marker.color ? { backgroundColor: B2.marker.color } : {})
                              }, null, 6))
                            ], 64)) : createCommentVNode("", true),
                            x2.value(B2.value) ? (openBlock(), createElementBlock("div", {
                              key: 3,
                              class: "dp__marker_tooltip",
                              ref_for: true,
                              ref_key: "activeTooltip",
                              ref: Q2,
                              style: normalizeStyle(g.value)
                            }, [
                              (N = B2.marker) != null && N.tooltip ? (openBlock(), createElementBlock("div", {
                                key: 0,
                                class: "dp__tooltip_content",
                                onClick: X2
                              }, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(B2.marker.tooltip, (j, De) => (openBlock(), createElementBlock("div", {
                                  key: De,
                                  class: "dp__tooltip_text"
                                }, [
                                  s3.$slots["marker-tooltip"] ? renderSlot(s3.$slots, "marker-tooltip", {
                                    key: 0,
                                    tooltip: j,
                                    day: B2.value
                                  }) : createCommentVNode("", true),
                                  s3.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                    createBaseVNode("div", {
                                      class: "dp__tooltip_mark",
                                      style: normalizeStyle(j.color ? { backgroundColor: j.color } : {})
                                    }, null, 4),
                                    createBaseVNode("div", null, toDisplayString(j.text), 1)
                                  ], 64))
                                ]))), 128)),
                                createBaseVNode("div", {
                                  class: "dp__arrow_bottom_tp",
                                  style: normalizeStyle(p.value)
                                }, null, 4)
                              ])) : createCommentVNode("", true)
                            ], 4)) : createCommentVNode("", true)
                          ], 2)
                        ], 40, zl);
                      }), 128))
                    ]))), 128))
                  ], 8, Ul)) : createCommentVNode("", true)
                ];
              }),
              _: 3
            }, 8, ["name", "css"])
          ], 64))
        ], 10, El)
      ], 2);
    };
  }
});
var ia = (e2) => Array.isArray(e2);
var Kl = (e2, n, a3, t2) => {
  const r = ref([]), { modelValue: l, calendars: c2, time: y3 } = Zt(e2, n), { defaultedMultiCalendars: D2, defaultedStartTime: S3 } = Se(e2), { validateMonthYearInRange: g, isDisabled: Y2, isDateRangeAllowed: R2, checkMinMaxRange: G2 } = Et(e2), { updateTimeValues: q2, getSetDateTime: J, setTime: Q2, assignStartTime: p, disabledTimesConfig: M3 } = Ia(
    e2,
    y3,
    l,
    t2
  ), E2 = computed(
    () => (i2) => c2.value[i2] ? c2.value[i2].month : 0
  ), z2 = computed(
    () => (i2) => c2.value[i2] ? c2.value[i2].year : 0
  ), K2 = (i2, w2, U) => {
    var se, be;
    c2.value[i2] || (c2.value[i2] = { month: 0, year: 0 }), c2.value[i2].month = aa(w2) ? (se = c2.value[i2]) == null ? void 0 : se.month : w2, c2.value[i2].year = aa(U) ? (be = c2.value[i2]) == null ? void 0 : be.year : U;
  }, _ = () => {
    e2.autoApply && n("select-date");
  };
  watch(l, (i2, w2) => {
    JSON.stringify(i2) !== JSON.stringify(w2) && L2();
  }), onMounted(() => {
    e2.shadow || (l.value || (o(), S3.value && p(S3.value)), L2(true), e2.focusStartDate && e2.startDate && o());
  });
  const re = computed(() => {
    var i2;
    return (i2 = e2.flow) != null && i2.length && !e2.partialFlow ? e2.flowStep === e2.flow.length : true;
  }), x2 = () => {
    e2.autoApply && re.value && n("auto-apply", e2.partialFlow);
  }, L2 = (i2 = false) => {
    if (l.value)
      return Array.isArray(l.value) ? (r.value = l.value, I2(i2)) : T2(l.value, i2);
    if (D2.value.count && i2 && !e2.startDate)
      return h4(P(), i2);
  }, h4 = (i2, w2 = false) => {
    if ((!D2.value.count || !D2.value.static || w2) && K2(0, getMonth(i2), getYear(i2)), D2.value.count)
      for (let U = 1; U < D2.value.count; U++) {
        const se = set(P(), { month: E2.value(U - 1), year: z2.value(U - 1) }), be = add(se, { months: 1 });
        c2.value[U] = { month: getMonth(be), year: getYear(be) };
      }
  }, T2 = (i2, w2) => {
    h4(i2), Q2("hours", getHours(i2)), Q2("minutes", getMinutes(i2)), Q2("seconds", getSeconds(i2)), D2.value.count && w2 && d3();
  }, H3 = (i2) => {
    if (D2.value.count) {
      if (D2.value.solo)
        return 0;
      const w2 = getMonth(i2[0]), U = getMonth(i2[1]);
      return Math.abs(U - w2) < D2.value.count ? 0 : 1;
    }
    return 1;
  }, ee = (i2, w2) => {
    i2[1] && e2.showLastInRange ? h4(i2[H3(i2)], w2) : h4(i2[0], w2);
    const U = (se, be) => [
      se(i2[0]),
      i2[1] ? se(i2[1]) : y3[be][1]
    ];
    Q2("hours", U(getHours, "hours")), Q2("minutes", U(getMinutes, "minutes")), Q2("seconds", U(getSeconds, "seconds"));
  }, v = (i2, w2) => {
    if ((e2.range || e2.weekPicker) && !e2.multiDates)
      return ee(i2, w2);
    if (e2.multiDates && w2) {
      const U = i2[i2.length - 1];
      return T2(U, w2);
    }
  }, I2 = (i2) => {
    const w2 = l.value;
    v(w2, i2), D2.value.count && D2.value.solo && d3();
  }, f = (i2, w2) => {
    const U = set(P(), { month: E2.value(w2), year: z2.value(w2) }), se = i2 < 0 ? addMonths(U, 1) : subMonths(U, 1);
    g(getMonth(se), getYear(se), i2 < 0, e2.preventMinMaxNavigation) && (K2(w2, getMonth(se), getYear(se)), D2.value.count && !D2.value.solo && k2(w2), a3());
  }, k2 = (i2) => {
    for (let w2 = i2 - 1; w2 >= 0; w2--) {
      const U = subMonths(set(P(), { month: E2.value(w2 + 1), year: z2.value(w2 + 1) }), 1);
      K2(w2, getMonth(U), getYear(U));
    }
    for (let w2 = i2 + 1; w2 <= D2.value.count - 1; w2++) {
      const U = addMonths(set(P(), { month: E2.value(w2 - 1), year: z2.value(w2 - 1) }), 1);
      K2(w2, getMonth(U), getYear(U));
    }
  }, d3 = () => {
    if (Array.isArray(l.value) && l.value.length === 2) {
      const i2 = P(
        P(l.value[1] ? l.value[1] : addMonths(l.value[0], 1))
      ), [w2, U] = [getMonth(l.value[0]), getYear(l.value[0])], [se, be] = [getMonth(l.value[1]), getYear(l.value[1])];
      (w2 !== se || w2 === se && U !== be) && D2.value.solo && K2(1, getMonth(i2), getYear(i2));
    } else
      l.value && !Array.isArray(l.value) && (K2(0, getMonth(l.value), getYear(l.value)), h4(P()));
  }, o = () => {
    e2.startDate && (K2(0, getMonth(P(e2.startDate)), getYear(P(e2.startDate))), D2.value.count && k2(0));
  }, $ = (i2, w2) => {
    e2.monthChangeOnScroll && f(e2.monthChangeOnScroll !== "inverse" ? -i2.deltaY : i2.deltaY, w2);
  }, X2 = (i2, w2, U = false) => {
    e2.monthChangeOnArrows && e2.vertical === U && s3(i2, w2);
  }, s3 = (i2, w2) => {
    f(i2 === "right" ? -1 : 1, w2);
  }, u2 = (i2) => e2.markers.find((w2) => ge(la(i2.value), la(w2.date))), C = (i2, w2) => {
    switch (e2.sixWeeks === true ? "append" : e2.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [i2 == 0, true];
      case "fair":
        return [i2 == 0 || w2 > i2, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, O2 = (i2, w2, U, se) => {
    if (e2.sixWeeks && i2.length < 6) {
      const be = 6 - i2.length, Qe = (w2.getDay() + 7 - se) % 7, Ft = 6 - (U.getDay() + 7 - se) % 7, [Tt, ln] = C(Qe, Ft);
      for (let ot = 1; ot <= be; ot++)
        if (ln ? !!(ot % 2) == Tt : Tt) {
          const Vt = i2[0].days[0], on = A(addDays(Vt.value, -7), getMonth(w2));
          i2.unshift({ days: on });
        } else {
          const Vt = i2[i2.length - 1], on = Vt.days[Vt.days.length - 1], Ea = A(addDays(on.value, 1), getMonth(w2));
          i2.push({ days: Ea });
        }
    }
    return i2;
  }, A = (i2, w2) => {
    const U = P(i2), se = [];
    for (let be = 0; be < 7; be++) {
      const Qe = addDays(U, be), $t = getMonth(Qe) !== w2;
      se.push({
        text: e2.hideOffsetDates && $t ? "" : Qe.getDate(),
        value: Qe,
        current: !$t,
        classData: {}
      });
    }
    return se;
  }, te = (i2, w2) => {
    const U = [], se = P(Ge(new Date(w2, i2), e2.timezone)), be = P(Ge(new Date(w2, i2 + 1, 0), e2.timezone)), Qe = e2.weekStart, $t = startOfWeek(se, { weekStartsOn: Qe }), Ft = (Tt) => {
      const ln = A(Tt, i2);
      if (U.push({ days: ln }), !U[U.length - 1].days.some(
        (ot) => ge(He(ot.value), He(be))
      )) {
        const ot = addDays(Tt, 7);
        Ft(ot);
      }
    };
    return Ft($t), O2(U, se, be, Qe);
  }, B2 = (i2) => (l.value = jt(P(i2.value), e2.timezone, e2.weekStart), x2()), ie = (i2) => {
    const w2 = nt(P(i2.value), y3.hours, y3.minutes, Te());
    e2.multiDates ? Ln(w2, l, e2.multiDatesLimit) : l.value = w2, t2(), nextTick().then(() => {
      x2();
    });
  }, he = (i2) => e2.noDisabledRange ? _a(r.value[0], i2).some((U) => Y2(U)) : false, me = () => {
    r.value = l.value ? l.value.slice() : [], r.value.length === 2 && !(e2.fixedStart || e2.fixedEnd) && (r.value = []);
  }, N = (i2, w2) => {
    const U = [P(i2.value), addDays(P(i2.value), +e2.autoRange)];
    R2(U) && (w2 && j(i2.value), r.value = U);
  }, j = (i2) => {
    const w2 = getMonth(P(i2)), U = getYear(P(i2));
    if (K2(0, w2, U), D2.value.count > 0)
      for (let se = 1; se < D2.value.count; se++) {
        const be = Or(
          set(P(i2), { year: E2.value(se - 1), month: z2.value(se - 1) })
        );
        K2(se, be.month, be.year);
      }
  }, De = (i2) => Array.isArray(l.value) && l.value.length === 2 ? e2.fixedStart && (Re(i2, l.value[0]) || ge(i2, l.value[0])) ? [l.value[0], i2] : e2.fixedEnd && (Pe(i2, l.value[1]) || ge(i2, l.value[1])) ? [i2, l.value[1]] : (n("invalid-fixed-range", i2), l.value) : [], ne = (i2) => {
    he(i2.value) || !G2(i2.value, l.value, e2.fixedStart ? 0 : 1) || (r.value = De(P(i2.value)));
  }, Fe = (i2, w2) => {
    if (me(), e2.autoRange)
      return N(i2, w2);
    if (e2.fixedStart || e2.fixedEnd)
      return ne(i2);
    r.value[0] ? G2(P(i2.value), l.value) && !he(i2.value) && (Pe(P(i2.value), P(r.value[0])) ? (r.value.unshift(P(i2.value)), n("range-end", r.value[0])) : (r.value[1] = P(i2.value), n("range-end", r.value[1]))) : (r.value[0] = P(i2.value), n("range-start", r.value[0]));
  }, Te = (i2 = true) => e2.enableSeconds ? Array.isArray(y3.seconds) ? i2 ? y3.seconds[0] : y3.seconds[1] : y3.seconds : 0, Mt = (i2) => {
    r.value[i2] = nt(
      r.value[i2],
      y3.hours[i2],
      y3.minutes[i2],
      Te(i2 !== 1)
    );
  }, Jt = () => {
    var i2, w2;
    r.value[0] && r.value[1] && +((i2 = r.value) == null ? void 0 : i2[0]) > +((w2 = r.value) == null ? void 0 : w2[1]) && (r.value.reverse(), n("range-start", r.value[0]), n("range-end", r.value[1]));
  }, xt = () => {
    r.value.length && (r.value[0] && !r.value[1] ? Mt(0) : (Mt(0), Mt(1), t2()), Jt(), l.value = r.value.slice(), Wn(r.value, n, e2.autoApply, e2.modelAuto));
  }, Qt = (i2, w2 = false) => {
    if (!(Y2(i2.value) || !i2.current && e2.hideOffsetDates)) {
      if (e2.weekPicker)
        return B2(i2);
      if (!e2.range)
        return ie(i2);
      ia(y3.hours) && ia(y3.minutes) && !e2.multiDates && (Fe(i2, w2), xt());
    }
  }, en = (i2, w2) => {
    var se;
    K2(i2, w2.month, w2.year), D2.value.count && !D2.value.solo && k2(i2), n("update-month-year", { instance: i2, month: w2.month, year: w2.year }), a3(D2.value.solo ? i2 : void 0);
    const U = (se = e2.flow) != null && se.length ? e2.flow[e2.flowStep] : void 0;
    !w2.fromNav && (U === je.month || U === je.year) && t2();
  }, tn = (i2, w2) => {
    Array.isArray(i2) && i2.length <= 2 && e2.range ? l.value = i2.map((U) => Ge(P(U), w2 ? void 0 : e2.timezone)) : Array.isArray(i2) || (l.value = Ge(P(i2), w2 ? void 0 : e2.timezone)), _(), e2.multiCalendars && nextTick().then(() => L2(true));
  }, nn = () => {
    e2.range ? l.value && Array.isArray(l.value) && l.value[0] ? l.value = Pe(P(), l.value[0]) ? [P(), l.value[0]] : [l.value[0], P()] : l.value = [P()] : l.value = P(), _();
  }, an = () => {
    if (Array.isArray(l.value))
      if (e2.multiDates) {
        const i2 = rn();
        l.value[l.value.length - 1] = J(i2);
      } else
        l.value = l.value.map((i2, w2) => i2 && J(i2, w2));
    else
      l.value = J(l.value);
    n("time-update");
  }, rn = () => Array.isArray(l.value) && l.value.length ? l.value[l.value.length - 1] : null;
  return {
    calendars: c2,
    modelValue: l,
    month: E2,
    year: z2,
    time: y3,
    disabledTimesConfig: M3,
    getCalendarDays: te,
    getMarker: u2,
    handleScroll: $,
    handleSwipe: s3,
    handleArrow: X2,
    selectDate: Qt,
    updateMonthYear: en,
    presetDate: tn,
    selectCurrentDate: nn,
    updateTime: (i2, w2 = true, U = false) => {
      q2(i2, w2, U, an);
    }
  };
};
var Gl = { key: 0 };
var Zl = defineComponent({
  __name: "DatePicker",
  props: {
    ...xe
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
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, {
      calendars: r,
      month: l,
      year: c2,
      modelValue: y3,
      time: D2,
      disabledTimesConfig: S3,
      getCalendarDays: g,
      getMarker: Y2,
      handleArrow: R2,
      handleScroll: G2,
      handleSwipe: q2,
      selectDate: J,
      updateMonthYear: Q2,
      presetDate: p,
      selectCurrentDate: M3,
      updateTime: E2
    } = Kl(t2, a3, k2, d3), z2 = useSlots(), { setHoverDate: K2, getDayClassData: _, clearHoverDate: re } = Jr(y3, t2), { defaultedMultiCalendars: x2 } = Se(t2), L2 = ref([]), h4 = ref([]), T2 = ref(null), H3 = ze(z2, "calendar"), ee = ze(z2, "monthYear"), v = ze(z2, "timePicker"), I2 = (C) => {
      t2.shadow || a3("mount", C);
    };
    watch(
      r,
      () => {
        t2.shadow || setTimeout(() => {
          a3("recalculate-position");
        }, 0);
      },
      { deep: true }
    );
    const f = computed(() => (C) => g(l.value(C), c2.value(C)).map((O2) => ({
      ...O2,
      days: O2.days.map((A) => (A.marker = Y2(A), A.classData = _(A), A))
    })));
    function k2(C) {
      var O2;
      C || C === 0 ? (O2 = h4.value[C]) == null || O2.triggerTransition(l.value(C), c2.value(C)) : h4.value.forEach((A, te) => A.triggerTransition(l.value(te), c2.value(te)));
    }
    function d3() {
      a3("update-flow-step");
    }
    const o = (C, O2 = false) => {
      J(C, O2), t2.spaceConfirm && a3("select-date");
    };
    return n({
      clearHoverDate: re,
      presetDate: p,
      selectCurrentDate: M3,
      toggleMonthPicker: (C, O2, A = 0) => {
        var te;
        (te = L2.value[A]) == null || te.toggleMonthPicker(C, O2);
      },
      toggleYearPicker: (C, O2, A = 0) => {
        var te;
        (te = L2.value[A]) == null || te.toggleYearPicker(C, O2);
      },
      toggleTimePicker: (C, O2, A) => {
        var te;
        (te = T2.value) == null || te.toggleTimePicker(C, O2, A);
      },
      handleArrow: R2,
      updateMonthYear: Q2,
      getSidebarProps: () => ({
        modelValue: y3,
        month: l,
        year: c2,
        time: D2,
        updateTime: E2,
        updateMonthYear: Q2,
        selectDate: J,
        presetDate: p
      })
    }), (C, O2) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(Un, {
        "multi-calendars": unref(x2).count
      }, {
        default: withCtx(({ instance: A, index: te }) => [
          C.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(Bl, mergeProps({
            key: 0,
            ref: (B2) => {
              B2 && (L2.value[te] = B2);
            },
            months: unref(Ma)(C.formatLocale, C.locale, C.monthNameFormat),
            years: unref(Vn)(C.yearRange, C.reverseYears),
            month: unref(l)(A),
            year: unref(c2)(A),
            instance: A
          }, C.$props, {
            onMount: O2[0] || (O2[0] = (B2) => I2(unref(mt).header)),
            onResetFlow: O2[1] || (O2[1] = (B2) => C.$emit("reset-flow")),
            onUpdateMonthYear: (B2) => unref(Q2)(A, B2),
            onOverlayClosed: O2[2] || (O2[2] = (B2) => C.$emit("focus-menu"))
          }), createSlots({ _: 2 }, [
            renderList(unref(ee), (B2, ie) => ({
              name: B2,
              fn: withCtx((he) => [
                renderSlot(C.$slots, B2, normalizeProps(guardReactiveProps(he)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(jl, mergeProps({
            ref: (B2) => {
              B2 && (h4.value[te] = B2);
            },
            "mapped-dates": f.value(A),
            month: unref(l)(A),
            year: unref(c2)(A)
          }, C.$props, {
            onSelectDate: (B2) => unref(J)(B2, A !== 1),
            onHandleSpace: (B2) => o(B2, A !== 1),
            onSetHoverDate: O2[3] || (O2[3] = (B2) => unref(K2)(B2)),
            onHandleScroll: (B2) => unref(G2)(B2, A),
            onHandleSwipe: (B2) => unref(q2)(B2, A),
            onMount: O2[4] || (O2[4] = (B2) => I2(unref(mt).calendar)),
            onResetFlow: O2[5] || (O2[5] = (B2) => C.$emit("reset-flow")),
            onTooltipOpen: O2[6] || (O2[6] = (B2) => C.$emit("tooltip-open", B2)),
            onTooltipClose: O2[7] || (O2[7] = (B2) => C.$emit("tooltip-close", B2))
          }), createSlots({ _: 2 }, [
            renderList(unref(H3), (B2, ie) => ({
              name: B2,
              fn: withCtx((he) => [
                renderSlot(C.$slots, B2, normalizeProps(guardReactiveProps({ ...he })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars"]),
      C.enableTimePicker ? (openBlock(), createElementBlock("div", Gl, [
        C.$slots["time-picker"] ? renderSlot(C.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(D2), updateTime: unref(E2) }))) : (openBlock(), createBlock(Ya, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: T2
        }, C.$props, {
          hours: unref(D2).hours,
          minutes: unref(D2).minutes,
          seconds: unref(D2).seconds,
          "internal-model-value": C.internalModelValue,
          "disabled-times-config": unref(S3),
          onMount: O2[8] || (O2[8] = (A) => I2(unref(mt).timePicker)),
          "onUpdate:hours": O2[9] || (O2[9] = (A) => unref(E2)(A)),
          "onUpdate:minutes": O2[10] || (O2[10] = (A) => unref(E2)(A, false)),
          "onUpdate:seconds": O2[11] || (O2[11] = (A) => unref(E2)(A, false, true)),
          onResetFlow: O2[12] || (O2[12] = (A) => C.$emit("reset-flow")),
          onOverlayClosed: O2[13] || (O2[13] = (A) => C.$emit("time-picker-close")),
          onOverlayOpened: O2[14] || (O2[14] = (A) => C.$emit("time-picker-open", A)),
          onAmPmChange: O2[15] || (O2[15] = (A) => C.$emit("am-pm-change", A))
        }), createSlots({ _: 2 }, [
          renderList(unref(v), (A, te) => ({
            name: A,
            fn: withCtx((B2) => [
              renderSlot(C.$slots, A, normalizeProps(guardReactiveProps(B2)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config"]))
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var ql = ["id", "onKeydown"];
var Xl = {
  key: 0,
  class: "dp__sidebar_left"
};
var Jl = {
  key: 1,
  class: "dp--preset-dates"
};
var xl = ["onClick", "onKeydown"];
var Ql = {
  key: 2,
  class: "dp__sidebar_right"
};
var eo = {
  key: 3,
  class: "dp__action_extra"
};
var da = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerMenu",
  props: {
    ...Xt,
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
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, r = computed(() => {
      const { openOnTop: N, ...j } = t2;
      return {
        ...j,
        flowStep: re.value
      };
    }), { setMenuFocused: l, setShiftKey: c2, control: y3 } = Oa(), D2 = useSlots(), { defaultedTextInput: S3, defaultedInline: g, defaultedConfig: Y2 } = Se(t2), R2 = ref(null), G2 = ref(0), q2 = ref(null), J = ref(null), Q2 = ref(false), p = ref(null);
    onMounted(() => {
      if (!t2.shadow) {
        Q2.value = true, M3(), window.addEventListener("resize", M3);
        const N = Ae(q2);
        if (N && !S3.value.enabled && !g.value.enabled && (l(true), H3()), N) {
          const j = (De) => {
            (t2.allowPreventDefault || Y2.value.allowPreventDefault) && De.preventDefault(), tt(De, Y2.value, true);
          };
          N.addEventListener("pointerdown", j), N.addEventListener("mousedown", j);
        }
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", M3);
    });
    const M3 = () => {
      const N = Ae(J);
      N && (G2.value = N.getBoundingClientRect().width);
    }, { arrowRight: E2, arrowLeft: z2, arrowDown: K2, arrowUp: _ } = lt(), { flowStep: re, updateFlowStep: x2, childMount: L2, resetFlow: h4 } = xr(t2, a3, p), T2 = computed(() => t2.monthPicker ? gl : t2.yearPicker ? hl : t2.timePicker ? Nl : Zl), H3 = () => {
      const N = Ae(q2);
      N && N.focus({ preventScroll: true });
    }, ee = computed(() => {
      var N;
      return ((N = p.value) == null ? void 0 : N.getSidebarProps()) || {};
    }), v = () => {
      t2.openOnTop && a3("recalculate-position");
    }, I2 = ze(D2, "action"), f = computed(() => t2.monthPicker || t2.yearPicker ? ze(D2, "monthYear") : t2.timePicker ? ze(D2, "timePicker") : ze(D2, "shared")), k2 = computed(() => t2.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), d3 = computed(() => ({
      dp__menu_disabled: t2.disabled,
      dp__menu_readonly: t2.readonly
    })), o = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !g.value.enabled,
        dp__relative: g.value.enabled,
        [t2.menuClassName]: !!t2.menuClassName
      })
    ), $ = (N) => {
      tt(N, Y2.value, true);
    }, X2 = () => {
      t2.escClose && a3("close-picker");
    }, s3 = (N) => {
      if (t2.arrowNavigation) {
        if (N === "up")
          return _();
        if (N === "down")
          return K2();
        if (N === "left")
          return z2();
        if (N === "right")
          return E2();
      } else
        N === "left" || N === "up" ? te("handleArrow", "left", 0, N === "up") : te("handleArrow", "right", 0, N === "down");
    }, u2 = (N) => {
      c2(N.shiftKey), !t2.disableMonthYearSelect && N.code === "Tab" && N.target.classList.contains("dp__menu") && y3.value.shiftKeyInMenu && (N.preventDefault(), tt(N, Y2.value, true), a3("close-picker"));
    }, C = () => {
      H3(), a3("time-picker-close");
    }, O2 = (N) => {
      var j, De, ne;
      (j = p.value) == null || j.toggleTimePicker(false, false), (De = p.value) == null || De.toggleMonthPicker(false, false, N), (ne = p.value) == null || ne.toggleYearPicker(false, false, N);
    }, A = (N, j = 0) => {
      var De, ne, Fe;
      return N === "month" ? (De = p.value) == null ? void 0 : De.toggleMonthPicker(false, true, j) : N === "year" ? (ne = p.value) == null ? void 0 : ne.toggleYearPicker(false, true, j) : N === "time" ? (Fe = p.value) == null ? void 0 : Fe.toggleTimePicker(true, false) : O2(j);
    }, te = (N, ...j) => {
      var De, ne;
      (De = p.value) != null && De[N] && ((ne = p.value) == null || ne[N](...j));
    }, B2 = () => {
      te("selectCurrentDate");
    }, ie = (N, j) => {
      te("presetDate", N, j);
    }, he = () => {
      te("clearHoverDate");
    };
    return n({
      updateMonthYear: (N, j) => {
        te("updateMonthYear", N, j);
      },
      switchView: A
    }), (N, j) => {
      var De;
      return openBlock(), createElementBlock("div", {
        id: N.uid ? `dp-menu-${N.uid}` : void 0,
        tabindex: "0",
        ref_key: "dpMenuRef",
        ref: q2,
        role: "dialog",
        class: normalizeClass(o.value),
        onMouseleave: he,
        onClick: $,
        onKeydown: [
          withKeys(X2, ["esc"]),
          j[15] || (j[15] = withKeys(withModifiers((ne) => s3("left"), ["prevent"]), ["left"])),
          j[16] || (j[16] = withKeys(withModifiers((ne) => s3("up"), ["prevent"]), ["up"])),
          j[17] || (j[17] = withKeys(withModifiers((ne) => s3("down"), ["prevent"]), ["down"])),
          j[18] || (j[18] = withKeys(withModifiers((ne) => s3("right"), ["prevent"]), ["right"])),
          u2
        ]
      }, [
        (N.disabled || N.readonly) && unref(g).enabled ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(d3.value)
        }, null, 2)) : createCommentVNode("", true),
        !unref(g).enabled && !N.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(k2.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: J,
          class: normalizeClass({
            dp__menu_content_wrapper: ((De = N.presetDates) == null ? void 0 : De.length) || !!N.$slots["left-sidebar"] || !!N.$slots["right-sidebar"]
          }),
          style: normalizeStyle({ "--dp-menu-width": `${G2.value}px` })
        }, [
          N.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", Xl, [
            renderSlot(N.$slots, "left-sidebar", normalizeProps(guardReactiveProps(ee.value)))
          ])) : createCommentVNode("", true),
          N.presetDates.length ? (openBlock(), createElementBlock("div", Jl, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(N.presetDates, (ne, Fe) => (openBlock(), createElementBlock("div", {
              key: Fe,
              style: normalizeStyle(ne.style || {}),
              class: "dp--preset-range"
            }, [
              ne.slot ? renderSlot(N.$slots, ne.slot, {
                key: 0,
                presetDate: ie,
                label: ne.label,
                value: ne.value
              }) : (openBlock(), createElementBlock("div", {
                key: 1,
                role: "button",
                tabindex: "0",
                onClick: (Te) => ie(ne.value, ne.noTz),
                onKeydown: [
                  withKeys(withModifiers((Te) => ie(ne.value, ne.noTz), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((Te) => ie(ne.value, ne.noTz), ["prevent"]), ["space"])
                ]
              }, toDisplayString(ne.label), 41, xl))
            ], 4))), 128))
          ])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: "dp__instance_calendar",
            ref_key: "calendarWrapperRef",
            ref: R2,
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(T2.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: p
            }, r.value, {
              "flow-step": unref(re),
              onMount: unref(L2),
              onUpdateFlowStep: unref(x2),
              onResetFlow: unref(h4),
              onFocusMenu: H3,
              onSelectDate: j[0] || (j[0] = (ne) => N.$emit("select-date")),
              onTooltipOpen: j[1] || (j[1] = (ne) => N.$emit("tooltip-open", ne)),
              onTooltipClose: j[2] || (j[2] = (ne) => N.$emit("tooltip-close", ne)),
              onAutoApply: j[3] || (j[3] = (ne) => N.$emit("auto-apply", ne)),
              onRangeStart: j[4] || (j[4] = (ne) => N.$emit("range-start", ne)),
              onRangeEnd: j[5] || (j[5] = (ne) => N.$emit("range-end", ne)),
              onInvalidFixedRange: j[6] || (j[6] = (ne) => N.$emit("invalid-fixed-range", ne)),
              onTimeUpdate: j[7] || (j[7] = (ne) => N.$emit("time-update")),
              onAmPmChange: j[8] || (j[8] = (ne) => N.$emit("am-pm-change", ne)),
              onTimePickerOpen: j[9] || (j[9] = (ne) => N.$emit("time-picker-open", ne)),
              onTimePickerClose: C,
              onRecalculatePosition: v,
              onUpdateMonthYear: j[10] || (j[10] = (ne) => N.$emit("update-month-year", ne)),
              "onUpdate:internalModelValue": j[11] || (j[11] = (ne) => N.$emit("update:internal-model-value", ne))
            }), createSlots({ _: 2 }, [
              renderList(f.value, (ne, Fe) => ({
                name: ne,
                fn: withCtx((Te) => [
                  renderSlot(N.$slots, ne, normalizeProps(guardReactiveProps({ ...Te })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          N.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", Ql, [
            renderSlot(N.$slots, "right-sidebar", normalizeProps(guardReactiveProps(ee.value)))
          ])) : createCommentVNode("", true),
          N.$slots["action-extra"] ? (openBlock(), createElementBlock("div", eo, [
            N.$slots["action-extra"] ? renderSlot(N.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: B2
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 6),
        !N.autoApply || N.keepActionRow || unref(Y2).keepActionRow ? (openBlock(), createBlock(ol, mergeProps({
          key: 2,
          "menu-mount": Q2.value
        }, r.value, {
          "calendar-width": G2.value,
          onClosePicker: j[12] || (j[12] = (ne) => N.$emit("close-picker")),
          onSelectDate: j[13] || (j[13] = (ne) => N.$emit("select-date")),
          onInvalidSelect: j[14] || (j[14] = (ne) => N.$emit("invalid-select")),
          onSelectNow: B2
        }), createSlots({ _: 2 }, [
          renderList(unref(I2), (ne, Fe) => ({
            name: ne,
            fn: withCtx((Te) => [
              renderSlot(N.$slots, ne, normalizeProps(guardReactiveProps({ ...Te })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
      ], 42, ql);
    };
  }
});
var to = typeof window < "u" ? window : void 0;
var bn = () => {
};
var no = (e2) => getCurrentScope() ? (onScopeDispose(e2), true) : false;
var ao = (e2, n, a3, t2) => {
  if (!e2)
    return bn;
  let r = bn;
  const l = watch(
    () => unref(e2),
    (y3) => {
      r(), y3 && (y3.addEventListener(n, a3, t2), r = () => {
        y3.removeEventListener(n, a3, t2), r = bn;
      });
    },
    { immediate: true, flush: "post" }
  ), c2 = () => {
    l(), r();
  };
  return no(c2), c2;
};
var ro = (e2, n, a3, t2 = {}) => {
  const { window: r = to, event: l = "pointerdown" } = t2;
  return r ? ao(r, l, (y3) => {
    const D2 = Ae(e2), S3 = Ae(n);
    !D2 || !S3 || D2 === y3.target || y3.composedPath().includes(D2) || y3.composedPath().includes(S3) || a3(y3);
  }, { passive: true }) : void 0;
};
var lo = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "VueDatePicker",
  props: {
    ...Xt
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
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, r = useSlots(), l = ref(false), c2 = toRef(t2, "modelValue"), y3 = toRef(t2, "timezone"), D2 = ref(null), S3 = ref(null), g = ref(null), Y2 = ref(false), R2 = ref(null), { setMenuFocused: G2, setShiftKey: q2 } = Oa(), { clearArrowNav: J } = lt(), { mapDatesArrToMap: Q2, validateDate: p, isValidTime: M3 } = Et(t2), { defaultedTransitions: E2, defaultedTextInput: z2, defaultedInline: K2, defaultedConfig: _ } = Se(t2), { menuTransition: re, showTransition: x2 } = Bt(E2);
    onMounted(() => {
      $(t2.modelValue), nextTick().then(() => {
        K2.value.enabled || (f(R2.value).addEventListener("scroll", te), window.addEventListener("resize", B2));
      }), K2.value.enabled && (l.value = true);
    });
    const L2 = computed(() => Q2());
    onUnmounted(() => {
      if (!K2.value.enabled) {
        const i2 = f(R2.value);
        i2 && i2.removeEventListener("scroll", te), window.removeEventListener("resize", B2);
      }
    });
    const h4 = ze(r, "all", t2.presetDates), T2 = ze(r, "input");
    watch(
      [c2, y3],
      () => {
        $(c2.value);
      },
      { deep: true }
    );
    const { openOnTop: H3, menuStyle: ee, xCorrect: v, setMenuPosition: I2, getScrollableParent: f, shadowRender: k2 } = Zr({
      menuRef: D2,
      menuRefInner: S3,
      inputRef: g,
      pickerWrapperRef: R2,
      inline: K2,
      emit: a3,
      props: t2,
      slots: r
    }), {
      inputValue: d3,
      internalModelValue: o,
      parseExternalModelValue: $,
      emitModelValue: X2,
      formatInputValue: s3,
      checkBeforeEmit: u2
    } = Kr(a3, t2, Y2), C = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: t2.dark,
        dp__theme_light: !t2.dark,
        dp__flex_display: K2.value.enabled,
        dp__flex_display_with_input: K2.value.input
      })
    ), O2 = computed(() => t2.dark ? "dp__theme_dark" : "dp__theme_light"), A = computed(() => t2.teleport ? {
      to: typeof t2.teleport == "boolean" ? "body" : t2.teleport,
      disabled: K2.value.enabled
    } : { class: "dp__outer_menu_wrap" }), te = () => {
      l.value && (t2.closeOnScroll || _.value.closeOnScroll ? Te() : I2());
    }, B2 = () => {
      l.value && I2();
    }, ie = () => {
      !t2.disabled && !t2.readonly && (k2(da, t2), I2(false), l.value = true, l.value && a3("open"), l.value || Fe(), $(t2.modelValue));
    }, he = () => {
      d3.value = "", Fe(), a3("update:model-value", null), a3("update:model-timezone-value", null), a3("cleared"), (t2.closeOnClearValue || _.value.closeOnClearValue) && Te();
    }, me = () => {
      const i2 = o.value;
      return !i2 || !Array.isArray(i2) && p(i2) ? true : Array.isArray(i2) ? i2.length === 2 && p(i2[0]) && p(i2[1]) ? true : t2.partialRange && !t2.timePicker ? p(i2[0]) : false : false;
    }, N = () => {
      u2() && me() ? (X2(), Te()) : a3("invalid-select", o.value);
    }, j = (i2) => {
      De(), X2(), (t2.closeOnAutoApply || _.value.closeOnAutoApply) && !i2 && Te();
    }, De = () => {
      g.value && z2.value.enabled && g.value.setParsedDate(o.value);
    }, ne = (i2 = false) => {
      t2.autoApply && M3(o.value) && me() && (t2.range && Array.isArray(o.value) ? (t2.partialRange || o.value.length === 2) && j(i2) : j(i2));
    }, Fe = () => {
      z2.value.enabled || (o.value = null);
    }, Te = () => {
      K2.value.enabled || (l.value && (l.value = false, v.value = false, G2(false), q2(false), J(), a3("closed"), d3.value && $(c2.value)), Fe(), a3("blur"));
    }, Mt = (i2, w2) => {
      if (!i2) {
        o.value = null;
        return;
      }
      o.value = i2, w2 && (N(), a3("text-submit"));
    }, Jt = () => {
      t2.autoApply && M3(o.value) && X2(), De();
    }, xt = () => l.value ? Te() : ie(), Qt = (i2) => {
      o.value = i2;
    }, en = () => {
      z2.value.enabled && (Y2.value = true, s3()), a3("focus");
    }, tn = () => {
      z2.value.enabled && (Y2.value = false, $(t2.modelValue)), a3("blur");
    }, nn = (i2) => {
      S3.value && S3.value.updateMonthYear(0, {
        month: na(i2.month),
        year: na(i2.year)
      });
    }, an = (i2) => {
      $(i2 ?? t2.modelValue);
    }, rn = (i2, w2) => {
      var U;
      (U = S3.value) == null || U.switchView(i2, w2);
    }, zn = (i2) => t2.onClickOutside ? t2.onClickOutside(i2) : _.value.onClickOutside ? _.value.onClickOutside(i2) : Te();
    return ro(D2, g, () => zn(me)), n({
      closeMenu: Te,
      selectDate: N,
      clearValue: he,
      openMenu: ie,
      onScroll: te,
      formatInputValue: s3,
      // exposed for testing purposes
      updateInternalModelValue: Qt,
      // modify internal modelValue
      setMonthYear: nn,
      parseModel: an,
      switchView: rn
    }), (i2, w2) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(C.value),
      ref_key: "pickerWrapperRef",
      ref: R2
    }, [
      createVNode(nl, mergeProps({
        ref_key: "inputRef",
        ref: g,
        "is-menu-open": l.value,
        "input-value": unref(d3),
        "onUpdate:inputValue": w2[0] || (w2[0] = (U) => isRef(d3) ? d3.value = U : null)
      }, i2.$props, {
        onClear: he,
        onOpen: ie,
        onSetInputDate: Mt,
        onSetEmptyDate: unref(X2),
        onSelectDate: N,
        onToggle: xt,
        onClose: Te,
        onFocus: en,
        onBlur: tn,
        onRealBlur: w2[1] || (w2[1] = (U) => Y2.value = false)
      }), createSlots({ _: 2 }, [
        renderList(unref(T2), (U, se) => ({
          name: U,
          fn: withCtx((be) => [
            renderSlot(i2.$slots, U, normalizeProps(guardReactiveProps(be)))
          ])
        }))
      ]), 1040, ["is-menu-open", "input-value", "onSetEmptyDate"]),
      createVNode(Transition, {
        name: unref(re)(unref(H3)),
        css: unref(x2) && !unref(K2).enabled
      }, {
        default: withCtx(() => [
          l.value ? (openBlock(), createBlock(resolveDynamicComponent(i2.teleport ? Teleport : "div"), mergeProps({
            key: 0,
            ref_key: "dpWrapMenuRef",
            ref: D2
          }, A.value, {
            class: { "dp--menu-wrapper": !unref(K2).enabled },
            style: unref(K2).enabled ? void 0 : unref(ee)
          }), {
            default: withCtx(() => [
              createVNode(da, mergeProps({
                ref_key: "dpMenuRef",
                ref: S3,
                class: { [O2.value]: true, "dp--menu-wrapper": i2.teleport },
                style: i2.teleport ? unref(ee) : void 0,
                "open-on-top": unref(H3),
                "arr-map-values": L2.value
              }, i2.$props, {
                "internal-model-value": unref(o),
                "onUpdate:internalModelValue": w2[2] || (w2[2] = (U) => isRef(o) ? o.value = U : null),
                onClosePicker: Te,
                onSelectDate: N,
                onAutoApply: ne,
                onTimeUpdate: Jt,
                onFlowStep: w2[3] || (w2[3] = (U) => i2.$emit("flow-step", U)),
                onUpdateMonthYear: w2[4] || (w2[4] = (U) => i2.$emit("update-month-year", U)),
                onInvalidSelect: w2[5] || (w2[5] = (U) => i2.$emit("invalid-select", unref(o))),
                onInvalidFixedRange: w2[6] || (w2[6] = (U) => i2.$emit("invalid-fixed-range", U)),
                onRecalculatePosition: unref(I2),
                onTooltipOpen: w2[7] || (w2[7] = (U) => i2.$emit("tooltip-open", U)),
                onTooltipClose: w2[8] || (w2[8] = (U) => i2.$emit("tooltip-close", U)),
                onTimePickerOpen: w2[9] || (w2[9] = (U) => i2.$emit("time-picker-open", U)),
                onTimePickerClose: w2[10] || (w2[10] = (U) => i2.$emit("time-picker-close", U)),
                onAmPmChange: w2[11] || (w2[11] = (U) => i2.$emit("am-pm-change", U)),
                onRangeStart: w2[12] || (w2[12] = (U) => i2.$emit("range-start", U)),
                onRangeEnd: w2[13] || (w2[13] = (U) => i2.$emit("range-end", U))
              }), createSlots({ _: 2 }, [
                renderList(unref(h4), (U, se) => ({
                  name: U,
                  fn: withCtx((be) => [
                    renderSlot(i2.$slots, U, normalizeProps(guardReactiveProps({ ...be })))
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
var Ba = (() => {
  const e2 = lo;
  return e2.install = (n) => {
    n.component("Vue3DatePicker", e2);
  }, e2;
})();
var oo = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Ba
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(oo).forEach(([e2, n]) => {
  e2 !== "default" && (Ba[e2] = n);
});
export {
  Ba as default
};
//# sourceMappingURL=@vuepic_vue-datepicker.js.map
