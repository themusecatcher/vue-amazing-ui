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

// node_modules/.pnpm/@babel+runtime@7.22.10/node_modules/@babel/runtime/helpers/esm/typeof.js
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

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/compareAsc/index.js
function compareAsc(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var diff = dateLeft.getTime() - dateRight.getTime();
  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1;
  } else {
    return diff;
  }
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

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/differenceInCalendarMonths/index.js
function differenceInCalendarMonths(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  var monthDiff = dateLeft.getMonth() - dateRight.getMonth();
  return yearDiff * 12 + monthDiff;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/endOfDay/index.js
function endOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setHours(23, 59, 59, 999);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/endOfMonth/index.js
function endOfMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/isLastDayOfMonth/index.js
function isLastDayOfMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  return endOfDay(date).getTime() === endOfMonth(date).getTime();
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/differenceInMonths/index.js
function differenceInMonths(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var sign = compareAsc(dateLeft, dateRight);
  var difference = Math.abs(differenceInCalendarMonths(dateLeft, dateRight));
  var result;
  if (difference < 1) {
    result = 0;
  } else {
    if (dateLeft.getMonth() === 1 && dateLeft.getDate() > 27) {
      dateLeft.setDate(30);
    }
    dateLeft.setMonth(dateLeft.getMonth() - sign * difference);
    var isLastMonthNotFull = compareAsc(dateLeft, dateRight) === -sign;
    if (isLastDayOfMonth(toDate(dirtyDateLeft)) && difference === 1 && compareAsc(dirtyDateLeft, dateRight) === 1) {
      isLastMonthNotFull = false;
    }
    result = sign * (difference - Number(isLastMonthNotFull));
  }
  return result === 0 ? 0 : result;
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

// node_modules/.pnpm/@babel+runtime@7.22.10/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++)
    arr2[i2] = arr[i2];
  return arr2;
}

// node_modules/.pnpm/@babel+runtime@7.22.10/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
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

// node_modules/.pnpm/@babel+runtime@7.22.10/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
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

// node_modules/.pnpm/@babel+runtime@7.22.10/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

// node_modules/.pnpm/@babel+runtime@7.22.10/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}

// node_modules/.pnpm/@babel+runtime@7.22.10/node_modules/@babel/runtime/helpers/esm/inherits.js
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

// node_modules/.pnpm/@babel+runtime@7.22.10/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}

// node_modules/.pnpm/@babel+runtime@7.22.10/node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
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

// node_modules/.pnpm/@babel+runtime@7.22.10/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

// node_modules/.pnpm/@babel+runtime@7.22.10/node_modules/@babel/runtime/helpers/esm/createSuper.js
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

// node_modules/.pnpm/@babel+runtime@7.22.10/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// node_modules/.pnpm/@babel+runtime@7.22.10/node_modules/@babel/runtime/helpers/esm/toPrimitive.js
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

// node_modules/.pnpm/@babel+runtime@7.22.10/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

// node_modules/.pnpm/@babel+runtime@7.22.10/node_modules/@babel/runtime/helpers/esm/createClass.js
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

// node_modules/.pnpm/@babel+runtime@7.22.10/node_modules/@babel/runtime/helpers/esm/defineProperty.js
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

// node_modules/.pnpm/@vuepic+vue-datepicker@6.0.0_vue@3.3.4/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
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
function ya() {
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
ya.compatConfig = {
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
function Yn(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
var pa = { exports: {} };
(function(e2) {
  function n(a3) {
    return a3 && a3.__esModule ? a3 : {
      default: a3
    };
  }
  e2.exports = n, e2.exports.__esModule = true, e2.exports.default = e2.exports;
})(pa);
var qa = pa.exports;
var kn = { exports: {} };
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
})(kn, kn.exports);
var xa = kn.exports;
var Ja = Yn(xa);
var wn = { exports: {} };
(function(e2, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a3;
  function a3(t2) {
    var o = new Date(Date.UTC(t2.getFullYear(), t2.getMonth(), t2.getDate(), t2.getHours(), t2.getMinutes(), t2.getSeconds(), t2.getMilliseconds()));
    return o.setUTCFullYear(t2.getFullYear()), t2.getTime() - o.getTime();
  }
  e2.exports = n.default;
})(wn, wn.exports);
var Xa = wn.exports;
var zn = Yn(Xa);
function Qa(e2, n) {
  var a3 = ar(n);
  return a3.formatToParts ? tr(a3, e2) : nr(a3, e2);
}
var er = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function tr(e2, n) {
  try {
    for (var a3 = e2.formatToParts(n), t2 = [], o = 0; o < a3.length; o++) {
      var l = er[a3[o].type];
      l >= 0 && (t2[l] = parseInt(a3[o].value, 10));
    }
    return t2;
  } catch (c2) {
    if (c2 instanceof RangeError)
      return [NaN];
    throw c2;
  }
}
function nr(e2, n) {
  var a3 = e2.format(n).replace(/\u200E/g, ""), t2 = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(a3);
  return [t2[3], t2[1], t2[2], t2[4], t2[5], t2[6]];
}
var on = {};
function ar(e2) {
  if (!on[e2]) {
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
    on[e2] = a3 ? new Intl.DateTimeFormat("en-US", {
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
  return on[e2];
}
function Bn(e2, n, a3, t2, o, l, c2) {
  var h4 = /* @__PURE__ */ new Date(0);
  return h4.setUTCFullYear(e2, n, a3), h4.setUTCHours(t2, o, l, c2), h4;
}
var jn = 36e5;
var rr = 6e4;
var sn = {
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-]\d{2}):?(\d{2})$/
};
function En(e2, n, a3) {
  var t2, o;
  if (!e2 || (t2 = sn.timezoneZ.exec(e2), t2))
    return 0;
  var l;
  if (t2 = sn.timezoneHH.exec(e2), t2)
    return l = parseInt(t2[1], 10), Kn(l) ? -(l * jn) : NaN;
  if (t2 = sn.timezoneHHMM.exec(e2), t2) {
    l = parseInt(t2[1], 10);
    var c2 = parseInt(t2[2], 10);
    return Kn(l, c2) ? (o = Math.abs(l) * jn + c2 * rr, l > 0 ? -o : o) : NaN;
  }
  if (sr(e2)) {
    n = new Date(n || Date.now());
    var h4 = a3 ? n : lr(n), y3 = Dn(h4, e2), D2 = a3 ? y3 : or(n, y3, e2);
    return -D2;
  }
  return NaN;
}
function lr(e2) {
  return Bn(
    e2.getFullYear(),
    e2.getMonth(),
    e2.getDate(),
    e2.getHours(),
    e2.getMinutes(),
    e2.getSeconds(),
    e2.getMilliseconds()
  );
}
function Dn(e2, n) {
  var a3 = Qa(e2, n), t2 = Bn(
    a3[0],
    a3[1] - 1,
    a3[2],
    a3[3] % 24,
    a3[4],
    a3[5],
    0
  ).getTime(), o = e2.getTime(), l = o % 1e3;
  return o -= l >= 0 ? l : 1e3 + l, t2 - o;
}
function or(e2, n, a3) {
  var t2 = e2.getTime(), o = t2 - n, l = Dn(new Date(o), a3);
  if (n === l)
    return n;
  o -= l - n;
  var c2 = Dn(new Date(o), a3);
  return l === c2 ? l : Math.max(l, c2);
}
function Kn(e2, n) {
  return -23 <= e2 && e2 <= 23 && (n == null || 0 <= n && n <= 59);
}
var Gn = {};
function sr(e2) {
  if (Gn[e2])
    return true;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e2 }), Gn[e2] = true, true;
  } catch {
    return false;
  }
}
var ha = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
var un = 36e5;
var Zn = 6e4;
var ur = 2;
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
  timeZone: ha
};
function Mn(e2, n) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e2 === null)
    return /* @__PURE__ */ new Date(NaN);
  var a3 = n || {}, t2 = a3.additionalDigits == null ? ur : Ja(a3.additionalDigits);
  if (t2 !== 2 && t2 !== 1 && t2 !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e2 instanceof Date || typeof e2 == "object" && Object.prototype.toString.call(e2) === "[object Date]")
    return new Date(e2.getTime());
  if (typeof e2 == "number" || Object.prototype.toString.call(e2) === "[object Number]")
    return new Date(e2);
  if (!(typeof e2 == "string" || Object.prototype.toString.call(e2) === "[object String]"))
    return /* @__PURE__ */ new Date(NaN);
  var o = ir(e2), l = cr(o.date, t2), c2 = l.year, h4 = l.restDateString, y3 = dr(h4, c2);
  if (isNaN(y3))
    return /* @__PURE__ */ new Date(NaN);
  if (y3) {
    var D2 = y3.getTime(), b2 = 0, T2;
    if (o.time && (b2 = fr(o.time), isNaN(b2)))
      return /* @__PURE__ */ new Date(NaN);
    if (o.timeZone || a3.timeZone) {
      if (T2 = En(o.timeZone || a3.timeZone, new Date(D2 + b2)), isNaN(T2))
        return /* @__PURE__ */ new Date(NaN);
    } else
      T2 = zn(new Date(D2 + b2)), T2 = zn(new Date(D2 + b2 + T2));
    return new Date(D2 + b2 + T2);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function ir(e2) {
  var n = {}, a3 = Ye.dateTimePattern.exec(e2), t2;
  if (a3 ? (n.date = a3[1], t2 = a3[3]) : (a3 = Ye.datePattern.exec(e2), a3 ? (n.date = a3[1], t2 = a3[2]) : (n.date = null, t2 = e2)), t2) {
    var o = Ye.timeZone.exec(t2);
    o ? (n.time = t2.replace(o[1], ""), n.timeZone = o[1].trim()) : n.time = t2;
  }
  return n;
}
function cr(e2, n) {
  var a3 = Ye.YYY[n], t2 = Ye.YYYYY[n], o;
  if (o = Ye.YYYY.exec(e2) || t2.exec(e2), o) {
    var l = o[1];
    return {
      year: parseInt(l, 10),
      restDateString: e2.slice(l.length)
    };
  }
  if (o = Ye.YY.exec(e2) || a3.exec(e2), o) {
    var c2 = o[1];
    return {
      year: parseInt(c2, 10) * 100,
      restDateString: e2.slice(c2.length)
    };
  }
  return {
    year: null
  };
}
function dr(e2, n) {
  if (n === null)
    return null;
  var a3, t2, o, l;
  if (e2.length === 0)
    return t2 = /* @__PURE__ */ new Date(0), t2.setUTCFullYear(n), t2;
  if (a3 = Ye.MM.exec(e2), a3)
    return t2 = /* @__PURE__ */ new Date(0), o = parseInt(a3[1], 10) - 1, xn(n, o) ? (t2.setUTCFullYear(n, o), t2) : /* @__PURE__ */ new Date(NaN);
  if (a3 = Ye.DDD.exec(e2), a3) {
    t2 = /* @__PURE__ */ new Date(0);
    var c2 = parseInt(a3[1], 10);
    return gr(n, c2) ? (t2.setUTCFullYear(n, 0, c2), t2) : /* @__PURE__ */ new Date(NaN);
  }
  if (a3 = Ye.MMDD.exec(e2), a3) {
    t2 = /* @__PURE__ */ new Date(0), o = parseInt(a3[1], 10) - 1;
    var h4 = parseInt(a3[2], 10);
    return xn(n, o, h4) ? (t2.setUTCFullYear(n, o, h4), t2) : /* @__PURE__ */ new Date(NaN);
  }
  if (a3 = Ye.Www.exec(e2), a3)
    return l = parseInt(a3[1], 10) - 1, Jn(n, l) ? qn(n, l) : /* @__PURE__ */ new Date(NaN);
  if (a3 = Ye.WwwD.exec(e2), a3) {
    l = parseInt(a3[1], 10) - 1;
    var y3 = parseInt(a3[2], 10) - 1;
    return Jn(n, l, y3) ? qn(n, l, y3) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function fr(e2) {
  var n, a3, t2;
  if (n = Ye.HH.exec(e2), n)
    return a3 = parseFloat(n[1].replace(",", ".")), cn(a3) ? a3 % 24 * un : NaN;
  if (n = Ye.HHMM.exec(e2), n)
    return a3 = parseInt(n[1], 10), t2 = parseFloat(n[2].replace(",", ".")), cn(a3, t2) ? a3 % 24 * un + t2 * Zn : NaN;
  if (n = Ye.HHMMSS.exec(e2), n) {
    a3 = parseInt(n[1], 10), t2 = parseInt(n[2], 10);
    var o = parseFloat(n[3].replace(",", "."));
    return cn(a3, t2, o) ? a3 % 24 * un + t2 * Zn + o * 1e3 : NaN;
  }
  return null;
}
function qn(e2, n, a3) {
  n = n || 0, a3 = a3 || 0;
  var t2 = /* @__PURE__ */ new Date(0);
  t2.setUTCFullYear(e2, 0, 4);
  var o = t2.getUTCDay() || 7, l = n * 7 + a3 + 1 - o;
  return t2.setUTCDate(t2.getUTCDate() + l), t2;
}
var vr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var mr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function ba(e2) {
  return e2 % 400 === 0 || e2 % 4 === 0 && e2 % 100 !== 0;
}
function xn(e2, n, a3) {
  if (n < 0 || n > 11)
    return false;
  if (a3 != null) {
    if (a3 < 1)
      return false;
    var t2 = ba(e2);
    if (t2 && a3 > mr[n] || !t2 && a3 > vr[n])
      return false;
  }
  return true;
}
function gr(e2, n) {
  if (n < 1)
    return false;
  var a3 = ba(e2);
  return !(a3 && n > 366 || !a3 && n > 365);
}
function Jn(e2, n, a3) {
  return !(n < 0 || n > 52 || a3 != null && (a3 < 0 || a3 > 6));
}
function cn(e2, n, a3) {
  return !(e2 != null && (e2 < 0 || e2 >= 25) || n != null && (n < 0 || n >= 60) || a3 != null && (a3 < 0 || a3 >= 60));
}
var $n = { exports: {} };
var Tn = { exports: {} };
(function(e2, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a3;
  function a3(t2, o) {
    if (t2 == null)
      throw new TypeError("assign requires that input parameter not be null or undefined");
    for (var l in o)
      Object.prototype.hasOwnProperty.call(o, l) && (t2[l] = o[l]);
    return t2;
  }
  e2.exports = n.default;
})(Tn, Tn.exports);
var yr = Tn.exports;
(function(e2, n) {
  var a3 = qa.default;
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = o;
  var t2 = a3(yr);
  function o(l) {
    return (0, t2.default)({}, l);
  }
  e2.exports = n.default;
})($n, $n.exports);
var pr = $n.exports;
var hr = Yn(pr);
function br(e2, n, a3) {
  var t2 = Mn(e2, a3), o = En(n, t2, true), l = new Date(t2.getTime() - o), c2 = /* @__PURE__ */ new Date(0);
  return c2.setFullYear(l.getUTCFullYear(), l.getUTCMonth(), l.getUTCDate()), c2.setHours(l.getUTCHours(), l.getUTCMinutes(), l.getUTCSeconds(), l.getUTCMilliseconds()), c2;
}
function kr(e2, n, a3) {
  if (typeof e2 == "string" && !e2.match(ha)) {
    var t2 = hr(a3);
    return t2.timeZone = n, Mn(e2, t2);
  }
  var o = Mn(e2, a3), l = Bn(
    o.getFullYear(),
    o.getMonth(),
    o.getDate(),
    o.getHours(),
    o.getMinutes(),
    o.getSeconds(),
    o.getMilliseconds()
  ).getTime(), c2 = En(n, new Date(l));
  return new Date(l + c2);
}
function Xn(e2) {
  return (n) => new Intl.DateTimeFormat(e2, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${n}T00:00:00+00:00`)).slice(0, 2);
}
function wr(e2) {
  return (n) => format(/* @__PURE__ */ new Date(`2017-01-0${n}T00:00:00+00:00`), "EEEEEE", { locale: e2 });
}
var Dr = (e2, n, a3) => {
  const t2 = [1, 2, 3, 4, 5, 6, 7];
  let o;
  if (e2 !== null)
    try {
      o = t2.map(wr(e2));
    } catch {
      o = t2.map(Xn(n));
    }
  else
    o = t2.map(Xn(n));
  const l = o.slice(0, a3), c2 = o.slice(a3 + 1, o.length);
  return [o[a3]].concat(...c2).concat(...l);
};
var Fn = (e2, n) => {
  const a3 = [];
  for (let t2 = +e2[0]; t2 <= +e2[1]; t2++)
    a3.push({ value: +t2, text: `${t2}` });
  return n ? a3.reverse() : a3;
};
var ka = (e2, n, a3) => {
  const t2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((l) => {
    const c2 = l < 10 ? `0${l}` : l;
    return /* @__PURE__ */ new Date(`2017-${c2}-01T00:00:00+00:00`);
  });
  if (e2 !== null)
    try {
      const l = a3 === "long" ? "MMMM" : "MMM";
      return t2.map((c2, h4) => {
        const y3 = format(c2, l, { locale: e2 });
        return {
          text: y3.charAt(0).toUpperCase() + y3.substring(1),
          value: h4
        };
      });
    } catch {
    }
  const o = new Intl.DateTimeFormat(n, { month: a3, timeZone: "UTC" });
  return t2.map((l, c2) => {
    const h4 = o.format(l);
    return {
      text: h4.charAt(0).toUpperCase() + h4.substring(1),
      value: c2
    };
  });
};
var Mr = (e2) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e2];
var Ae = (e2) => {
  const n = unref(e2);
  return n != null && n.$el ? n == null ? void 0 : n.$el : n;
};
var $r = (e2) => Object.assign({ type: "dot" }, e2);
var wa = (e2) => Array.isArray(e2) ? !!e2[0] && !!e2[1] : false;
var Gt = {
  prop: (e2) => `"${e2}" prop must be enabled!`,
  dateArr: (e2) => `You need to use array as "model-value" binding in order to support "${e2}"`
};
var Te = (e2) => e2;
var Qn = (e2) => e2 === 0 ? e2 : !e2 || isNaN(+e2) ? null : +e2;
var ea = (e2) => e2 === null;
var Tr = (e2) => {
  if (e2)
    return [...e2.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var Ar = (e2) => {
  const n = [], a3 = (t2) => t2.filter((o) => o);
  for (let t2 = 0; t2 < e2.length; t2 += 3) {
    const o = [e2[t2], e2[t2 + 1], e2[t2 + 2]];
    n.push(a3(o));
  }
  return n;
};
var Rt = (e2, n, a3) => {
  const t2 = a3 ?? a3 === 0, o = n ?? n === 0;
  if (!t2 && !o)
    return false;
  const l = +a3, c2 = +n;
  return t2 && o ? +e2 > l || +e2 < c2 : t2 ? +e2 > l : o ? +e2 < c2 : false;
};
var bt = (e2, n) => Ar(e2).map((a3) => a3.map((t2) => {
  const { active: o, disabled: l, isBetween: c2 } = n(t2);
  return {
    ...t2,
    active: o,
    disabled: l,
    className: {
      dp__overlay_cell_active: o,
      dp__overlay_cell: !o,
      dp__overlay_cell_disabled: l,
      dp__overlay_cell_pad: true,
      dp__overlay_cell_active_disabled: l && o,
      dp__cell_in_between: c2
    }
  };
}));
var ta = (e2, n, a3, t2, o) => {
  const l = parse(e2, n.slice(0, e2.length), /* @__PURE__ */ new Date());
  return isValid(l) && isDate(l) ? t2 || o ? l : set(l, {
    hours: +a3.hours,
    minutes: +(a3 == null ? void 0 : a3.minutes),
    seconds: +(a3 == null ? void 0 : a3.seconds),
    milliseconds: 0
  }) : null;
};
var _r = (e2, n, a3, t2, o) => {
  const l = Array.isArray(a3) ? a3[0] : a3;
  if (typeof n == "string")
    return ta(e2, n, l, t2, o);
  if (Array.isArray(n)) {
    let c2 = null;
    for (const h4 of n)
      if (c2 = ta(e2, h4, l, t2, o), c2)
        break;
    return c2;
  }
  return typeof n == "function" ? n(e2) : null;
};
var S3 = (e2) => e2 ? new Date(e2) : /* @__PURE__ */ new Date();
var Sr = (e2, n, a3) => {
  if (n) {
    const o = (e2.getMonth() + 1).toString().padStart(2, "0"), l = e2.getDate().toString().padStart(2, "0"), c2 = e2.getHours().toString().padStart(2, "0"), h4 = e2.getMinutes().toString().padStart(2, "0"), y3 = a3 ? e2.getSeconds().toString().padStart(2, "0") : "00";
    return `${e2.getFullYear()}-${o}-${l}T${c2}:${h4}:${y3}.000Z`;
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
var Le = (e2) => {
  let n = S3(JSON.parse(JSON.stringify(e2)));
  return n = setHours(n, 0), n = setMinutes(n, 0), n = setSeconds(n, 0), n = setMilliseconds(n, 0), n;
};
var tt = (e2, n, a3, t2) => {
  let o = e2 ? S3(e2) : S3();
  return (n || n === 0) && (o = setHours(o, +n)), (a3 || a3 === 0) && (o = setMinutes(o, +a3)), (t2 || t2 === 0) && (o = setSeconds(o, +t2)), setMilliseconds(o, 0);
};
var Pe = (e2, n) => !e2 || !n ? false : isBefore(Le(e2), Le(n));
var ye = (e2, n) => !e2 || !n ? false : isEqual(Le(e2), Le(n));
var Ne = (e2, n) => !e2 || !n ? false : isAfter(Le(e2), Le(n));
var Vn = (e2, n, a3) => e2 && e2[0] && e2[1] ? Ne(a3, e2[0]) && Pe(a3, e2[1]) : e2 && e2[0] && n ? Ne(a3, e2[0]) && Pe(a3, n) || Pe(a3, e2[0]) && Ne(a3, n) : false;
var ze = (e2) => {
  const n = set(new Date(e2), { date: 1 });
  return Le(n);
};
var dn = (e2, n, a3) => n && (a3 || a3 === 0) ? Object.fromEntries(
  ["hours", "minutes", "seconds"].map((t2) => t2 === n ? [t2, a3] : [t2, isNaN(+e2[t2]) ? void 0 : +e2[t2]])
) : {
  hours: isNaN(+e2.hours) ? void 0 : +e2.hours,
  minutes: isNaN(+e2.minutes) ? void 0 : +e2.minutes,
  seconds: isNaN(+e2.seconds) ? void 0 : +e2.seconds
};
var ft = (e2) => ({
  hours: getHours(e2),
  minutes: getMinutes(e2),
  seconds: getSeconds(e2)
});
var Da = (e2, n) => {
  if (n) {
    const a3 = getYear(S3(n));
    if (a3 > e2)
      return 12;
    if (a3 === e2)
      return getMonth(S3(n));
  }
};
var Ma = (e2, n) => {
  if (n) {
    const a3 = getYear(S3(n));
    return a3 < e2 ? -1 : a3 === e2 ? getMonth(S3(n)) : void 0;
  }
};
var kt = (e2) => {
  if (e2)
    return getYear(S3(e2));
};
var Ze = (e2, n) => n ? br(e2, n) : e2;
var Pr = (e2, n) => n ? kr(e2, n) : e2;
var na = (e2) => e2 instanceof Date ? e2 : parseISO(e2);
var $a = (e2, n) => {
  const a3 = Ne(e2, n) ? n : e2, t2 = Ne(n, e2) ? n : e2;
  return eachDayOfInterval({ start: a3, end: t2 });
};
var Cr = (e2) => {
  const n = addMonths(e2, 1);
  return { month: getMonth(n), year: getYear(n) };
};
var jt = (e2, n, a3) => {
  const t2 = startOfWeek(Ze(e2, n), { weekStartsOn: +a3 }), o = endOfWeek(Ze(e2, n), { weekStartsOn: +a3 });
  return [t2, o];
};
var Ta = (e2, n) => {
  const a3 = {
    hours: getHours(S3()),
    minutes: getMinutes(S3()),
    seconds: n ? getSeconds(S3()) : 0
  };
  return Object.assign(a3, e2);
};
var et = (e2, n, a3) => [set(S3(e2), { date: 1 }), set(S3(), { month: n, year: a3, date: 1 })];
var Je = (e2, n, a3) => {
  let t2 = e2 ? S3(e2) : S3();
  return (n || n === 0) && (t2 = setMonth(t2, n)), a3 && (t2 = setYear(t2, a3)), t2;
};
var Aa = (e2, n, a3, t2, o) => {
  if (!t2 || o && !n || !o && !a3)
    return false;
  const l = o ? addMonths(e2, 1) : subMonths(e2, 1), c2 = [getMonth(l), getYear(l)];
  return o ? !Nr(...c2, n) : !Rr(...c2, a3);
};
var Rr = (e2, n, a3) => Pe(...et(a3, e2, n)) || ye(...et(a3, e2, n));
var Nr = (e2, n, a3) => Ne(...et(a3, e2, n)) || ye(...et(a3, e2, n));
var _a = (e2, n, a3, t2, o, l) => {
  if (typeof n == "function")
    return n(e2);
  const c2 = a3 ? { locale: a3 } : void 0;
  return Array.isArray(e2) ? `${format(e2[0], l, c2)}${o && !e2[1] ? "" : t2}${e2[1] ? format(e2[1], l, c2) : ""}` : format(e2, l, c2);
};
var gt = (e2) => {
  if (e2)
    return null;
  throw new Error(Gt.prop("partial-range"));
};
var Ht = (e2, n) => {
  if (n)
    return e2();
  throw new Error(Gt.prop("range"));
};
var An = (e2) => Array.isArray(e2) ? isValid(e2[0]) && (e2[1] ? isValid(e2[1]) : true) : e2 ? isValid(e2) : false;
var Or = (e2) => set(S3(), {
  hours: +e2.hours || 0,
  minutes: +e2.minutes || 0,
  seconds: +e2.seconds || 0
});
var fn = (e2, n, a3, t2) => {
  if (!e2)
    return true;
  if (t2) {
    const o = a3 === "max" ? isBefore(e2, n) : isAfter(e2, n), l = { seconds: 0, milliseconds: 0 };
    return o || isEqual(set(e2, l), set(n, l));
  }
  return a3 === "max" ? e2.getTime() <= n.getTime() : e2.getTime() >= n.getTime();
};
var aa = (e2, n, a3, t2, o) => {
  const l = e2 ? Or(e2) : S3(n);
  return Array.isArray(t2) ? fn(t2[0], l, a3, !!n) && fn(t2[1], l, a3, !!n) && o : fn(t2, l, a3, !!n) && o;
};
var vn = (e2) => set(S3(), ft(e2));
var Ir = (e2, n) => Array.isArray(e2) ? e2.map((a3) => S3(a3)).filter((a3) => getYear(S3(a3)) === n).map((a3) => getMonth(a3)) : [];
var At = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Sa = () => {
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
var pn = ref(false);
var Oe = ref(0);
var Se = ref(0);
var rt = () => {
  const e2 = computed(() => Lt.value ? [...be.selectionGrid, be.actionRow].filter(($) => $.length) : gn.value ? [
    ...be.timePicker[0],
    ...be.timePicker[1],
    pn.value ? [] : [mn.value],
    be.actionRow
  ].filter(($) => $.length) : yn.value ? [...be.monthPicker, be.actionRow] : [be.monthYear, ...be.calendar, be.time, be.actionRow].filter(($) => $.length)), n = ($) => {
    Oe.value = $ ? Oe.value + 1 : Oe.value - 1;
    let W = null;
    e2.value[Se.value] && (W = e2.value[Se.value][Oe.value]), W || (Oe.value = $ ? Oe.value - 1 : Oe.value + 1);
  }, a3 = ($) => {
    if (Se.value === 0 && !$ || Se.value === e2.value.length && $)
      return;
    Se.value = $ ? Se.value + 1 : Se.value - 1, e2.value[Se.value] ? e2.value[Se.value] && !e2.value[Se.value][Oe.value] && Oe.value !== 0 && (Oe.value = e2.value[Se.value].length - 1) : Se.value = $ ? Se.value - 1 : Se.value + 1;
  }, t2 = ($) => {
    let W = null;
    e2.value[Se.value] && (W = e2.value[Se.value][Oe.value]), W ? W.focus({ preventScroll: !Lt.value }) : Oe.value = $ ? Oe.value - 1 : Oe.value + 1;
  }, o = () => {
    n(true), t2(true);
  }, l = () => {
    n(false), t2(false);
  }, c2 = () => {
    a3(false), t2(true);
  }, h4 = () => {
    a3(true), t2(true);
  }, y3 = ($, W) => {
    be[W] = $;
  }, D2 = ($, W) => {
    be[W] = $;
  }, b2 = () => {
    Oe.value = 0, Se.value = 0;
  };
  return {
    buildMatrix: y3,
    buildMultiLevelMatrix: D2,
    setTimePickerBackRef: ($) => {
      mn.value = $;
    },
    setSelectionGrid: ($) => {
      Lt.value = $, b2(), $ || (be.selectionGrid = []);
    },
    setTimePicker: ($, W = false) => {
      gn.value = $, pn.value = W, b2(), $ || (be.timePicker[0] = [], be.timePicker[1] = []);
    },
    setTimePickerElements: ($, W = 0) => {
      be.timePicker[W] = $;
    },
    arrowRight: o,
    arrowLeft: l,
    arrowUp: c2,
    arrowDown: h4,
    clearArrowNav: () => {
      be.monthYear = [], be.calendar = [], be.time = [], be.actionRow = [], be.selectionGrid = [], be.timePicker[0] = [], be.timePicker[1] = [], Lt.value = false, gn.value = false, pn.value = false, yn.value = false, b2(), mn.value = null;
    },
    setMonthPicker: ($) => {
      yn.value = $, b2();
    },
    refSets: be
    // exposed for testing
  };
};
var ra = (e2) => Object.assign(
  {
    menuAppearTop: "dp-menu-appear-top",
    menuAppearBottom: "dp-menu-appear-bottom",
    open: "dp-slide-down",
    close: "dp-slide-up",
    next: "calendar-next",
    previous: "calendar-prev",
    vNext: "dp-slide-up",
    vPrevious: "dp-slide-down"
  },
  e2
);
var Yr = (e2) => Object.assign(
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
    nextYear: "Next year",
    prevYear: "Previous year",
    day: () => ""
  },
  e2
);
var la = (e2) => e2 ? typeof e2 == "boolean" ? e2 ? 2 : 0 : +e2 >= 2 ? +e2 : 2 : 0;
var Br = (e2) => {
  const n = typeof e2 == "object" && e2, a3 = {
    static: true,
    solo: false
  };
  if (!e2)
    return { ...a3, count: la(false) };
  const t2 = n ? e2 : {}, o = n ? t2.count ?? true : e2, l = la(o);
  return Object.assign(a3, t2, { count: l });
};
var Er = (e2, n, a3) => e2 || (typeof a3 == "string" ? a3 : n);
var Fr = (e2) => typeof e2 == "boolean" ? e2 ? ra({}) : false : ra(e2);
var Vr = (e2) => {
  const n = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: true,
    rangeSeparator: " - "
  };
  return typeof e2 == "object" ? { ...n, ...e2 ?? {}, enabled: true } : { ...n, enabled: e2 };
};
var Hr = (e2) => Object.assign({ months: [], years: [], times: { hours: [], minutes: [], seconds: [] } }, e2);
var Lr = (e2) => Object.assign({ showSelect: true, showCancel: true, showNow: false, showPreview: true }, e2);
var Ur = (e2) => {
  const n = { input: false };
  return typeof e2 == "object" ? Object.assign(n, e2, { enabled: true }) : {
    enabled: e2,
    ...n
  };
};
var Ce = (e2) => {
  const n = () => {
    const K2 = e2.enableSeconds ? ":ss" : "";
    return e2.is24 ? `HH:mm${K2}` : `hh:mm${K2} aa`;
  }, a3 = () => e2.format ? e2.format : e2.monthPicker ? "MM/yyyy" : e2.timePicker ? n() : e2.weekPicker ? "MM/dd/yyyy" : e2.yearPicker ? "yyyy" : e2.enableTimePicker ? `MM/dd/yyyy, ${n()}` : "MM/dd/yyyy", t2 = (K2) => Ta(K2, e2.enableSeconds), o = () => e2.range ? e2.startTime && Array.isArray(e2.startTime) ? [t2(e2.startTime[0]), t2(e2.startTime[1])] : null : e2.startTime && !Array.isArray(e2.startTime) ? t2(e2.startTime) : null, l = computed(() => Br(e2.multiCalendars)), c2 = computed(() => o()), h4 = computed(() => Yr(e2.ariaLabels)), y3 = computed(() => Hr(e2.filters)), D2 = computed(() => Fr(e2.transitions)), b2 = computed(() => Lr(e2.actionRow)), T2 = computed(
    () => Er(e2.previewFormat, e2.format, a3())
  ), Y2 = computed(() => Vr(e2.textInput)), q2 = computed(() => Ur(e2.inline));
  return {
    defaultedTransitions: D2,
    defaultedMultiCalendars: l,
    defaultedStartTime: c2,
    defaultedAriaLabels: h4,
    defaultedFilters: y3,
    defaultedActionRow: b2,
    defaultedPreviewFormat: T2,
    defaultedTextInput: Y2,
    defaultedInline: q2,
    getDefaultPattern: a3,
    getDefaultStartTime: o
  };
};
var Wr = (e2, n, a3) => {
  const t2 = ref(), { defaultedTextInput: o, getDefaultPattern: l } = Ce(n), c2 = ref(""), h4 = toRef(n, "format");
  watch(t2, () => {
    e2("internal-model-change", t2.value);
  }), watch(h4, () => {
    U();
  });
  const y3 = (r) => Pr(r, n.timezone), D2 = (r) => Ze(r, n.timezone), b2 = (r, L2) => _a(
    r,
    n.format,
    n.formatLocale,
    o.value.rangeSeparator,
    n.modelAuto,
    L2 ?? l()
  ), T2 = (r) => {
    const L2 = r ?? S3();
    return n.modelType ? w2(L2) : {
      hours: getHours(L2),
      minutes: getMinutes(L2),
      seconds: n.enableSeconds ? getSeconds(L2) : 0
    };
  }, Y2 = (r) => n.modelType ? w2(r) : { month: getMonth(r), year: getYear(r) }, q2 = (r) => Array.isArray(r) ? Ht(
    () => [
      setYear(S3(), r[0]),
      r[1] ? setYear(S3(), r[1]) : gt(n.partialRange)
    ],
    n.range
  ) : setYear(S3(), +r), K2 = (r, L2) => (typeof r == "string" || typeof r == "number") && n.modelType ? d3(r) : L2, X2 = (r) => Array.isArray(r) ? [
    K2(
      r[0],
      tt(null, +r[0].hours, +r[0].minutes, r[0].seconds)
    ),
    K2(
      r[1],
      tt(null, +r[1].hours, +r[1].minutes, r[1].seconds)
    )
  ] : K2(r, tt(null, r.hours, r.minutes, r.seconds)), k2 = (r) => Array.isArray(r) ? n.multiDates ? r.map((L2) => K2(L2, Je(null, +L2.month, +L2.year))) : Ht(
    () => [
      K2(r[0], Je(null, +r[0].month, +r[0].year)),
      K2(
        r[1],
        r[1] ? Je(null, +r[1].month, +r[1].year) : gt(n.partialRange)
      )
    ],
    n.range
  ) : K2(r, Je(null, +r.month, +r.year)), $ = (r) => {
    if (Array.isArray(r))
      return r.map((L2) => d3(L2));
    throw new Error(Gt.dateArr("multi-dates"));
  }, W = (r) => {
    if (Array.isArray(r))
      return [S3(r[0]), S3(r[1])];
    throw new Error(Gt.dateArr("week-picker"));
  }, V = (r) => n.modelAuto ? Array.isArray(r) ? [d3(r[0]), d3(r[1])] : n.autoApply ? [d3(r)] : [d3(r), null] : Array.isArray(r) ? Ht(
    () => [
      d3(r[0]),
      r[1] ? d3(r[1]) : gt(n.partialRange)
    ],
    n.range
  ) : d3(r), G2 = () => {
    Array.isArray(t2.value) && n.range && t2.value.length === 1 && t2.value.push(gt(n.partialRange));
  }, P = () => {
    const r = t2.value;
    return [
      w2(r[0]),
      r[1] ? w2(r[1]) : gt(n.partialRange)
    ];
  }, ee = () => t2.value[1] ? P() : w2(Te(t2.value[0])), p = () => (t2.value || []).map((r) => w2(r)), _ = () => (G2(), n.modelAuto ? ee() : n.multiDates ? p() : Array.isArray(t2.value) ? Ht(() => P(), n.range) : w2(Te(t2.value))), A = (r) => !r || Array.isArray(r) && !r.length ? null : n.timePicker ? X2(Te(r)) : n.monthPicker ? k2(Te(r)) : n.yearPicker ? q2(Te(r)) : n.multiDates ? $(Te(r)) : n.weekPicker ? W(Te(r)) : V(Te(r)), H3 = (r) => {
    const L2 = A(r);
    An(Te(L2)) ? (t2.value = Te(L2), U()) : (t2.value = null, c2.value = "");
  }, z2 = () => {
    const r = (L2) => format(L2, o.value.format);
    return `${r(t2.value[0])} ${o.value.rangeSeparator} ${t2.value[1] ? r(t2.value[1]) : ""}`;
  }, Q2 = () => a3.value && t2.value ? Array.isArray(t2.value) ? z2() : format(t2.value, o.value.format) : b2(t2.value), f = () => t2.value ? n.multiDates ? t2.value.map((r) => b2(r)).join("; ") : o.value.enabled && typeof o.value.format == "string" ? Q2() : b2(t2.value) : "", U = () => {
    !n.format || typeof n.format == "string" || o.value.enabled && typeof o.value.format == "string" ? c2.value = f() : c2.value = n.format(t2.value);
  }, d3 = (r) => {
    if (n.utc) {
      const L2 = new Date(r);
      return n.utc === "preserve" ? new Date(L2.getTime() + L2.getTimezoneOffset() * 6e4) : L2;
    }
    return n.modelType ? n.modelType === "date" || n.modelType === "timestamp" ? D2(new Date(r)) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? parse(r, l(), /* @__PURE__ */ new Date()) : D2(parse(r, n.modelType, /* @__PURE__ */ new Date())) : D2(new Date(r));
  }, w2 = (r) => r ? n.utc ? Sr(r, n.utc === "preserve", n.enableSeconds) : n.modelType ? n.modelType === "timestamp" ? +y3(r) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? b2(y3(r)) : b2(y3(r), n.modelType) : y3(r) : "", u2 = (r, L2 = false) => {
    if (e2("update:model-value", r), n.emitTimezone && L2) {
      const R2 = Array.isArray(r) ? r.map((m3) => Ze(Te(m3)), n.emitTimezone) : Ze(Te(r), n.emitTimezone);
      e2("update:model-timezone-value", R2);
    }
  }, g = (r) => Array.isArray(t2.value) ? n.multiDates ? t2.value.map((L2) => r(L2)) : [
    r(t2.value[0]),
    t2.value[1] ? r(t2.value[1]) : gt(n.partialRange)
  ] : r(Te(t2.value)), s3 = (r) => u2(Te(g(r)));
  return {
    inputValue: c2,
    internalModelValue: t2,
    checkBeforeEmit: () => t2.value ? n.range ? n.partialRange ? t2.value.length >= 1 : t2.value.length === 2 : !!t2.value : false,
    parseExternalModelValue: H3,
    formatInputValue: U,
    emitModelValue: () => (U(), n.monthPicker ? s3(Y2) : n.timePicker ? s3(T2) : n.yearPicker ? s3(getYear) : n.weekPicker ? u2(t2.value, true) : u2(_(), true))
  };
};
var zr = (e2, n) => {
  const { defaultedFilters: a3 } = Ce(e2), { validateMonthYearInRange: t2 } = Bt(e2), o = (D2, b2) => {
    let T2 = D2;
    return a3.value.months.includes(getMonth(T2)) ? (T2 = b2 ? addMonths(D2, 1) : subMonths(D2, 1), o(T2, b2)) : T2;
  }, l = (D2, b2) => {
    let T2 = D2;
    return a3.value.years.includes(getYear(T2)) ? (T2 = b2 ? addYears(D2, 1) : subYears(D2, 1), l(T2, b2)) : T2;
  }, c2 = (D2) => {
    const b2 = set(/* @__PURE__ */ new Date(), { month: e2.month, year: e2.year });
    let T2 = D2 ? addMonths(b2, 1) : subMonths(b2, 1);
    e2.disableYearSelect && (T2 = setYear(T2, e2.year));
    let Y2 = getMonth(T2), q2 = getYear(T2);
    a3.value.months.includes(Y2) && (T2 = o(T2, D2), Y2 = getMonth(T2), q2 = getYear(T2)), a3.value.years.includes(q2) && (T2 = l(T2, D2), q2 = getYear(T2)), t2(Y2, q2, D2, e2.preventMinMaxNavigation) && h4(Y2, q2);
  }, h4 = (D2, b2) => {
    n("update-month-year", { month: D2, year: b2 });
  }, y3 = computed(() => (D2) => Aa(
    set(/* @__PURE__ */ new Date(), { month: e2.month, year: e2.year }),
    e2.maxDate,
    e2.minDate,
    e2.preventMinMaxNavigation,
    D2
  ));
  return { handleMonthYearChange: c2, isDisabled: y3, updateMonthYear: h4 };
};
var yt = ((e2) => (e2.center = "center", e2.left = "left", e2.right = "right", e2))(yt || {});
var We = ((e2) => (e2.month = "month", e2.year = "year", e2))(We || {});
var st = ((e2) => (e2.top = "top", e2.bottom = "bottom", e2))(st || {});
var vt = ((e2) => (e2.header = "header", e2.calendar = "calendar", e2.timePicker = "timePicker", e2))(vt || {});
var jr = (e2, n, a3, t2, o, l, c2) => {
  const h4 = ref({}), y3 = ref(false), D2 = ref({
    top: "0",
    left: "0"
  }), b2 = ref(false), T2 = toRef(c2, "teleportCenter");
  watch(T2, () => {
    D2.value = JSON.parse(JSON.stringify({})), V();
  });
  const Y2 = (d3) => {
    if (c2.teleport) {
      const w2 = d3.getBoundingClientRect();
      return {
        left: w2.left + window.scrollX,
        top: w2.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, q2 = (d3, w2) => {
    D2.value.left = `${d3 + w2 - h4.value.width}px`;
  }, K2 = (d3) => {
    D2.value.left = `${d3}px`;
  }, X2 = (d3, w2) => {
    c2.position === yt.left && K2(d3), c2.position === yt.right && q2(d3, w2), c2.position === yt.center && (D2.value.left = `${d3 + w2 / 2 - h4.value.width / 2}px`);
  }, k2 = (d3) => {
    const { width: w2, height: u2 } = d3.getBoundingClientRect(), { top: g, left: s3 } = c2.altPosition ? c2.altPosition(d3) : Y2(d3);
    return { top: +g, left: +s3, width: w2, height: u2 };
  }, $ = () => {
    D2.value.left = "50%", D2.value.top = "50%", D2.value.transform = "translate(-50%, -50%)", D2.value.position = "fixed", delete D2.value.opacity;
  }, W = () => {
    const d3 = Ae(a3), { top: w2, left: u2, transform: g } = c2.altPosition(d3);
    D2.value = { top: `${w2}px`, left: `${u2}px`, transform: g ?? "" };
  }, V = (d3 = true) => {
    var w2;
    if (!o.value.enabled) {
      if (T2.value)
        return $();
      if (c2.altPosition !== null)
        return W();
      if (d3) {
        const u2 = c2.teleport ? (w2 = n.value) == null ? void 0 : w2.$el : e2.value;
        u2 && (h4.value = u2.getBoundingClientRect()), l("recalculate-position");
      }
      return H3();
    }
  }, G2 = ({ inputEl: d3, left: w2, width: u2 }) => {
    window.screen.width > 768 && !y3.value && X2(w2, u2), p(d3);
  }, P = (d3) => {
    const { top: w2, left: u2, height: g, width: s3 } = k2(d3);
    D2.value.top = `${g + w2 + +c2.offset}px`, b2.value = false, y3.value || (D2.value.left = `${u2 + s3 / 2 - h4.value.width / 2}px`), G2({ inputEl: d3, left: u2, width: s3 });
  }, ee = (d3) => {
    const { top: w2, left: u2, width: g } = k2(d3);
    D2.value.top = `${w2 - +c2.offset - h4.value.height}px`, b2.value = true, G2({ inputEl: d3, left: u2, width: g });
  }, p = (d3) => {
    if (c2.autoPosition) {
      const { left: w2, width: u2 } = k2(d3), { left: g, right: s3 } = h4.value;
      if (!y3.value) {
        if (Math.abs(g) !== Math.abs(s3)) {
          if (g <= 0)
            return y3.value = true, K2(w2);
          if (s3 >= document.documentElement.clientWidth)
            return y3.value = true, q2(w2, u2);
        }
        return X2(w2, u2);
      }
    }
  }, _ = () => {
    const d3 = Ae(a3);
    if (d3) {
      const { height: w2 } = h4.value, { top: u2, height: g } = d3.getBoundingClientRect(), C = window.innerHeight - u2 - g, ne = u2;
      return w2 <= C ? st.bottom : w2 > C && w2 <= ne ? st.top : C >= ne ? st.bottom : st.top;
    }
    return st.bottom;
  }, A = (d3) => _() === st.bottom ? P(d3) : ee(d3), H3 = () => {
    const d3 = Ae(a3);
    if (d3)
      return c2.autoPosition ? A(d3) : P(d3);
  }, z2 = function(d3) {
    if (d3) {
      const w2 = d3.scrollHeight > d3.clientHeight, g = window.getComputedStyle(d3).overflowY.indexOf("hidden") !== -1;
      return w2 && !g;
    }
    return true;
  }, Q2 = function(d3) {
    return !d3 || d3 === document.body || d3.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : z2(d3) ? d3 : Q2(d3.parentNode);
  }, f = (d3) => {
    if (d3)
      switch (c2.position) {
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
    openOnTop: b2,
    menuStyle: D2,
    xCorrect: y3,
    setMenuPosition: V,
    getScrollableParent: Q2,
    shadowRender: (d3, w2) => {
      var L2, R2, m3;
      const u2 = document.createElement("div"), g = (L2 = Ae(a3)) == null ? void 0 : L2.getBoundingClientRect();
      u2.setAttribute("id", "dp--temp-container");
      const s3 = (R2 = t2.value) != null && R2.clientWidth ? t2.value : document.body;
      s3.append(u2);
      const C = document.getElementById("dp--temp-container"), ne = f(g), r = h(d3, {
        ...w2,
        shadow: true,
        style: { opacity: 0, position: "absolute", ...ne }
      });
      render(r, C), h4.value = (m3 = r.el) == null ? void 0 : m3.getBoundingClientRect(), render(null, C), s3.removeChild(C);
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
  monthYear: () => ot.filter((e2) => e2.use.includes("month-year")),
  input: () => Kr,
  timePicker: () => ot.filter((e2) => e2.use.includes("time")),
  action: () => ot.filter((e2) => e2.use.includes("action")),
  calendar: () => ot.filter((e2) => e2.use.includes("calendar")),
  menu: () => ot.filter((e2) => e2.use.includes("menu")),
  shared: () => ot.filter((e2) => e2.use.includes("shared"))
};
var je = (e2, n, a3) => {
  const t2 = [];
  return Gr[n]().forEach((o) => {
    e2[o.name] && t2.push(o.name);
  }), a3 != null && a3.length && a3.forEach((o) => {
    o.slot && t2.push(o.slot);
  }), t2;
};
var Yt = (e2) => {
  const n = computed(() => (t2) => e2.value ? t2 ? e2.value.open : e2.value.close : ""), a3 = computed(() => (t2) => e2.value ? t2 ? e2.value.menuAppearTop : e2.value.menuAppearBottom : "");
  return { transitionName: n, showTransition: !!e2.value, menuTransition: a3 };
};
var Zt = (e2, n) => {
  const a3 = ref([{ month: getMonth(S3()), year: getYear(S3()) }]), t2 = reactive({
    hours: e2.range ? [getHours(S3()), getHours(S3())] : getHours(S3()),
    minutes: e2.range ? [getMinutes(S3()), getMinutes(S3())] : getMinutes(S3()),
    seconds: e2.range ? [0, 0] : 0
  }), o = computed({
    get: () => e2.internalModelValue,
    set: (h4) => {
      !e2.readonly && !e2.disabled && n("update:internal-model-value", h4);
    }
  }), l = computed(
    () => (h4) => a3.value[h4] ? a3.value[h4].month : 0
  ), c2 = computed(
    () => (h4) => a3.value[h4] ? a3.value[h4].year : 0
  );
  return {
    calendars: a3,
    time: t2,
    modelValue: o,
    month: l,
    year: c2
  };
};
var Zr = (e2, n) => {
  const { defaultedMultiCalendars: a3 } = Ce(n), { isDisabled: t2, matchDate: o } = Bt(n), l = ref(null), c2 = ref(S3()), h4 = (s3) => {
    !s3.current && n.hideOffsetDates || (l.value = s3.value);
  }, y3 = () => {
    l.value = null;
  }, D2 = (s3) => Array.isArray(e2.value) && n.range && e2.value[0] && l.value ? s3 ? Ne(l.value, e2.value[0]) : Pe(l.value, e2.value[0]) : true, b2 = (s3, C) => {
    const ne = () => e2.value ? C ? e2.value[0] || null : e2.value[1] : null, r = e2.value && Array.isArray(e2.value) ? ne() : null;
    return ye(S3(s3.value), r);
  }, T2 = (s3) => {
    const C = Array.isArray(e2.value) ? e2.value[0] : null;
    return s3 ? !Pe(l.value ?? null, C) : true;
  }, Y2 = (s3, C = true) => (n.range || n.weekPicker) && Array.isArray(e2.value) && e2.value.length === 2 ? n.hideOffsetDates && !s3.current ? false : ye(S3(s3.value), e2.value[C ? 0 : 1]) : n.range ? b2(s3, C) && T2(C) || ye(s3.value, Array.isArray(e2.value) ? e2.value[0] : null) && D2(C) : false, q2 = (s3, C, ne) => Array.isArray(e2.value) && e2.value[0] && e2.value.length === 1 ? s3 ? false : ne ? Ne(e2.value[0], C.value) : Pe(e2.value[0], C.value) : false, K2 = (s3) => !e2.value || n.hideOffsetDates && !s3.current ? false : n.range ? n.modelAuto && Array.isArray(e2.value) ? ye(s3.value, e2.value[0] ? e2.value[0] : c2.value) : false : n.multiDates && Array.isArray(e2.value) ? e2.value.some((C) => ye(C, s3.value)) : ye(s3.value, e2.value ? e2.value : c2.value), X2 = (s3) => {
    if (n.autoRange || n.weekPicker) {
      if (l.value) {
        if (n.hideOffsetDates && !s3.current)
          return false;
        const C = addDays(l.value, +n.autoRange), ne = jt(S3(l.value), n.timezone, n.weekStart);
        return n.weekPicker ? ye(ne[1], S3(s3.value)) : ye(C, S3(s3.value));
      }
      return false;
    }
    return false;
  }, k2 = (s3) => {
    if (n.autoRange || n.weekPicker) {
      if (l.value) {
        const C = addDays(l.value, +n.autoRange);
        if (n.hideOffsetDates && !s3.current)
          return false;
        const ne = jt(S3(l.value), n.timezone, n.weekStart);
        return n.weekPicker ? Ne(s3.value, ne[0]) && Pe(s3.value, ne[1]) : Ne(s3.value, l.value) && Pe(s3.value, C);
      }
      return false;
    }
    return false;
  }, $ = (s3) => {
    if (n.autoRange || n.weekPicker) {
      if (l.value) {
        if (n.hideOffsetDates && !s3.current)
          return false;
        const C = jt(S3(l.value), n.timezone, n.weekStart);
        return n.weekPicker ? ye(C[0], s3.value) : ye(l.value, s3.value);
      }
      return false;
    }
    return false;
  }, W = (s3) => Vn(e2.value, l.value, s3.value), V = () => n.modelAuto && Array.isArray(n.internalModelValue) ? !!n.internalModelValue[0] : false, G2 = () => n.modelAuto ? wa(n.internalModelValue) : true, P = (s3) => {
    if (Array.isArray(e2.value) && e2.value.length || n.weekPicker)
      return false;
    const C = n.range ? !Y2(s3) && !Y2(s3, false) : true;
    return !t2(s3.value) && !K2(s3) && !(!s3.current && n.hideOffsetDates) && C;
  }, ee = (s3) => n.range ? n.modelAuto ? V() && K2(s3) : false : K2(s3), p = (s3) => {
    var C;
    return n.highlight ? o(
      s3.value,
      (C = n.arrMapValues) != null && C.highlightedDates ? n.arrMapValues.highlightedDates : n.highlight
    ) : false;
  }, _ = (s3) => t2(s3.value) && n.highlightDisabledDays === false, A = (s3) => n.highlightWeekDays && n.highlightWeekDays.includes(s3.value.getDay()), H3 = (s3) => (n.range || n.weekPicker) && (!(a3.value.count > 0) || s3.current) && G2() && !(!s3.current && n.hideOffsetDates) && !K2(s3) ? W(s3) : false, z2 = (s3) => {
    const { isRangeStart: C, isRangeEnd: ne } = U(s3), r = n.range ? C || ne : false;
    return {
      dp__cell_offset: !s3.current,
      dp__pointer: !n.disabled && !(!s3.current && n.hideOffsetDates) && !t2(s3.value),
      dp__cell_disabled: t2(s3.value),
      dp__cell_highlight: !_(s3) && (p(s3) || A(s3)) && !ee(s3) && !r,
      dp__cell_highlight_active: !_(s3) && (p(s3) || A(s3)) && ee(s3),
      dp__today: !n.noToday && ye(s3.value, c2.value) && s3.current
    };
  }, Q2 = (s3) => ({
    dp__active_date: ee(s3),
    dp__date_hover: P(s3)
  }), f = (s3) => ({
    ...d3(s3),
    ...w2(s3),
    dp__range_between_week: H3(s3) && n.weekPicker
  }), U = (s3) => {
    const C = a3.value.count > 0 ? s3.current && Y2(s3) && G2() : Y2(s3) && G2(), ne = a3.value.count > 0 ? s3.current && Y2(s3, false) && G2() : Y2(s3, false) && G2();
    return { isRangeStart: C, isRangeEnd: ne };
  }, d3 = (s3) => {
    const { isRangeStart: C, isRangeEnd: ne } = U(s3);
    return {
      dp__range_start: C,
      dp__range_end: ne,
      dp__range_between: H3(s3) && !n.weekPicker,
      dp__date_hover_start: q2(P(s3), s3, true),
      dp__date_hover_end: q2(P(s3), s3, false)
    };
  }, w2 = (s3) => ({
    ...d3(s3),
    dp__cell_auto_range: k2(s3),
    dp__cell_auto_range_start: $(s3),
    dp__cell_auto_range_end: X2(s3)
  }), u2 = (s3) => n.range ? n.autoRange ? w2(s3) : n.modelAuto ? { ...Q2(s3), ...d3(s3) } : d3(s3) : n.weekPicker ? f(s3) : Q2(s3);
  return {
    setHoverDate: h4,
    clearHoverDate: y3,
    getDayClassData: (s3) => n.hideOffsetDates && !s3.current ? {} : {
      ...z2(s3),
      ...u2(s3),
      [n.dayClass ? n.dayClass(s3.value) : ""]: true,
      [n.calendarCellClassName]: !!n.calendarCellClassName
    }
  };
};
var Bt = (e2) => {
  const { defaultedFilters: n } = Ce(e2), a3 = (p) => {
    const _ = Le(t2(S3(p))).toISOString(), [A] = _.split("T");
    return A;
  }, t2 = (p) => Ze(p, e2.timezone), o = (p) => {
    var u2;
    const _ = e2.maxDate ? Ne(t2(p), t2(S3(e2.maxDate))) : false, A = e2.minDate ? Pe(t2(p), t2(S3(e2.minDate))) : false, H3 = y3(
      p,
      (u2 = e2.arrMapValues) != null && u2.disabledDates ? e2.arrMapValues.disabledDates : e2.disabledDates
    ), Q2 = n.value.months.map((g) => +g).includes(getMonth(p)), f = e2.disabledWeekDays.length ? e2.disabledWeekDays.some((g) => +g === getDay(p)) : false, U = b2(p), d3 = getYear(p), w2 = d3 < +e2.yearRange[0] || d3 > +e2.yearRange[1];
    return !(_ || A || H3 || Q2 || w2 || f || U);
  }, l = (p, _) => Pe(...et(e2.minDate, p, _)) || ye(...et(e2.minDate, p, _)), c2 = (p, _) => Ne(...et(e2.maxDate, p, _)) || ye(...et(e2.maxDate, p, _)), h4 = (p, _, A) => {
    let H3 = false;
    return e2.maxDate && A && c2(p, _) && (H3 = true), e2.minDate && !A && l(p, _) && (H3 = true), H3;
  }, y3 = (p, _) => p ? _ instanceof Map ? !!_.get(a3(p)) : Array.isArray(_) ? _.some((A) => ye(t2(S3(A)), t2(p))) : _ ? _(S3(JSON.parse(JSON.stringify(p)))) : false : true, D2 = (p, _, A, H3) => {
    let z2 = false;
    return H3 ? e2.minDate && e2.maxDate ? z2 = h4(p, _, A) : (e2.minDate && l(p, _) || e2.maxDate && c2(p, _)) && (z2 = true) : z2 = true, z2;
  }, b2 = (p) => {
    var _, A, H3, z2, Q2;
    return Array.isArray(e2.allowedDates) && !((_ = e2.allowedDates) != null && _.length) ? true : (A = e2.arrMapValues) != null && A.allowedDates ? !y3(p, (H3 = e2.arrMapValues) == null ? void 0 : H3.allowedDates) : (z2 = e2.allowedDates) != null && z2.length ? !((Q2 = e2.allowedDates) != null && Q2.some((f) => ye(t2(S3(f)), t2(p)))) : false;
  }, T2 = (p) => !o(p), Y2 = (p) => !eachDayOfInterval({ start: p[0], end: p[1] }).some((A) => T2(A)), q2 = (p, _, A = 0) => {
    if (Array.isArray(_) && _[A]) {
      const H3 = differenceInCalendarDays(p, _[A]), z2 = $a(_[A], p), Q2 = z2.length === 1 ? 0 : z2.filter((U) => T2(U)).length, f = Math.abs(H3) - Q2;
      if (e2.minRange && e2.maxRange)
        return f >= +e2.minRange && f <= +e2.maxRange;
      if (e2.minRange)
        return f >= +e2.minRange;
      if (e2.maxRange)
        return f <= +e2.maxRange;
    }
    return true;
  }, K2 = (p) => new Map(p.map((_) => [a3(_), true])), X2 = (p) => Array.isArray(p) && p.length > 0, k2 = (p) => {
    X2(e2.allowedDates) && (p.allowedDates = K2(e2.allowedDates)), X2(e2.highlight) && (p.highlightedDates = K2(e2.highlight)), X2(e2.disabledDates) && (p.disabledDates = K2(e2.disabledDates));
  }, $ = () => !e2.enableTimePicker || e2.monthPicker || e2.yearPicker || e2.ignoreTimeValidation, W = (p) => Array.isArray(p) ? [p[0] ? vn(p[0]) : null, p[1] ? vn(p[1]) : null] : vn(p), V = (p, _) => !(Array.isArray(_) ? _ : [_]).some((z2) => e2.disabledTimes.find(
    (Q2) => +Q2.hours === getHours(z2) && Q2.minutes === "*" ? true : +Q2.minutes === getMinutes(z2)
  )) && p, G2 = (p, _) => {
    const A = Array.isArray(_) ? [ft(_[0]), _[1] ? ft(_[1]) : void 0] : ft(_), H3 = !e2.disabledTimes(A);
    return p && H3;
  }, P = (p, _) => e2.disabledTimes ? Array.isArray(e2.disabledTimes) ? V(_, p) : G2(_, p) : _;
  return {
    isDisabled: T2,
    validateDate: o,
    validateMonthYearInRange: D2,
    isDateRangeAllowed: Y2,
    checkMinMaxRange: q2,
    matchDate: y3,
    mapDatesArrToMap: k2,
    isValidTime: (p) => {
      let _ = true;
      if (!p || $())
        return true;
      const A = !e2.minDate && !e2.maxDate ? W(p) : p;
      return (e2.maxTime || e2.maxDate) && (_ = aa(e2.maxTime, e2.maxDate, "max", Te(A), _)), (e2.minTime || e2.minDate) && (_ = aa(e2.minTime, e2.minDate, "min", Te(A), _)), P(p, _);
    }
  };
};
var qt = () => {
  const e2 = computed(() => (t2, o) => t2 == null ? void 0 : t2.includes(o)), n = computed(() => (t2, o) => t2.count ? t2.solo ? true : o === 0 : true), a3 = computed(() => (t2, o) => t2.count ? t2.solo ? true : o === t2.count - 1 : true);
  return { hideNavigationButtons: e2, showLeftIcon: n, showRightIcon: a3 };
};
var qr = (e2, n, a3) => {
  const t2 = ref(0), o = reactive({
    // monthYearInput: !!props.timePicker,
    [vt.timePicker]: !e2.enableTimePicker || e2.timePicker || e2.monthPicker,
    [vt.calendar]: false,
    [vt.header]: false
  }), l = (b2) => {
    var T2;
    (T2 = e2.flow) != null && T2.length && (o[b2] = true, Object.keys(o).filter((Y2) => !o[Y2]).length || D2());
  }, c2 = () => {
    var b2;
    (b2 = e2.flow) != null && b2.length && t2.value !== -1 && (t2.value += 1, n("flow-step", t2.value), D2());
  }, h4 = () => {
    t2.value = -1;
  }, y3 = (b2, T2, ...Y2) => {
    e2.flow[t2.value] === b2 && a3.value && a3.value[T2](...Y2);
  }, D2 = () => {
    y3("month", "toggleMonthPicker", true), y3("year", "toggleYearPicker", true), y3("calendar", "toggleTimePicker", false, true), y3("time", "toggleTimePicker", true, true);
    const b2 = e2.flow[t2.value];
    (b2 === "hours" || b2 === "minutes" || b2 === "seconds") && y3(b2, "toggleTimePicker", true, true, b2);
  };
  return { childMount: l, updateFlowStep: c2, resetFlow: h4, flowStep: t2 };
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
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { defaultedTextInput: o, defaultedAriaLabels: l, defaultedInline: c2, getDefaultPattern: h4, getDefaultStartTime: y3 } = Ce(t2), D2 = ref(), b2 = ref(null), T2 = ref(false), Y2 = ref(false), q2 = computed(
      () => ({
        dp__pointer: !t2.disabled && !t2.readonly && !o.value.enabled,
        dp__disabled: t2.disabled,
        dp__input_readonly: !o.value.enabled,
        dp__input: true,
        dp__input_icon_pad: !t2.hideInputIcon,
        dp__input_valid: t2.state,
        dp__input_invalid: t2.state === false,
        dp__input_focus: T2.value || t2.isMenuOpen,
        dp__input_reg: !o.value.enabled,
        [t2.inputClassName]: !!t2.inputClassName
      })
    ), K2 = () => {
      a3("set-input-date", null), t2.autoApply && (a3("set-empty-date"), D2.value = null);
    }, X2 = (f) => {
      const U = y3();
      return _r(
        f,
        o.value.format ?? h4(),
        U ?? Ta({}, t2.enableSeconds),
        t2.inputValue,
        Y2.value
      );
    }, k2 = (f) => {
      const { rangeSeparator: U } = o.value, [d3, w2] = f.split(`${U}`);
      if (d3) {
        const u2 = X2(d3.trim()), g = w2 ? X2(w2.trim()) : null, s3 = u2 && g ? [u2, g] : [u2];
        D2.value = u2 ? s3 : null;
      }
    }, $ = () => {
      Y2.value = true;
    }, W = (f) => {
      if (t2.range)
        k2(f);
      else if (t2.multiDates) {
        const U = f.split(";");
        D2.value = U.map((d3) => X2(d3.trim())).filter((d3) => d3);
      } else
        D2.value = X2(f);
    }, V = (f) => {
      var d3;
      const U = typeof f == "string" ? f : (d3 = f.target) == null ? void 0 : d3.value;
      U !== "" ? (o.value.openMenu && !t2.isMenuOpen && a3("open"), W(U), a3("set-input-date", D2.value)) : K2(), Y2.value = false, a3("update:input-value", U);
    }, G2 = (f) => {
      o.value.enabled ? (W(f.target.value), o.value.enterSubmit && An(D2.value) && t2.inputValue !== "" ? (a3("set-input-date", D2.value, true), D2.value = null) : o.value.enterSubmit && t2.inputValue === "" && (D2.value = null, a3("clear"))) : p(f);
    }, P = (f) => {
      o.value.enabled && o.value.tabSubmit && W(f.target.value), o.value.tabSubmit && An(D2.value) && t2.inputValue !== "" ? (a3("set-input-date", D2.value, true), D2.value = null) : o.value.tabSubmit && t2.inputValue === "" && (D2.value = null, a3("clear"));
    }, ee = () => {
      T2.value = true, a3("focus");
    }, p = (f) => {
      f.preventDefault(), f.stopImmediatePropagation(), f.stopPropagation(), o.value.enabled && o.value.openMenu && !c2.value.input && !t2.isMenuOpen ? a3("open") : o.value.enabled || a3("toggle");
    }, _ = () => {
      a3("real-blur"), T2.value = false, (!t2.isMenuOpen || c2.value.enabled && c2.value.input) && a3("blur"), t2.autoApply && o.value.enabled && D2.value && !t2.isMenuOpen && (a3("set-input-date", D2.value), a3("select-date"), D2.value = null);
    }, A = () => {
      a3("clear");
    }, H3 = (f) => {
      if (!o.value.enabled) {
        if (f.code === "Tab")
          return;
        f.preventDefault();
      }
    };
    return n({
      focusInput: () => {
        var f;
        (f = b2.value) == null || f.focus({ preventScroll: true });
      },
      setParsedDate: (f) => {
        D2.value = f;
      }
    }), (f, U) => {
      var d3;
      return openBlock(), createElementBlock("div", { onClick: p }, [
        f.$slots.trigger && !f.$slots["dp-input"] && !unref(c2).enabled ? renderSlot(f.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !f.$slots.trigger && (!unref(c2).enabled || unref(c2).input) ? (openBlock(), createElementBlock("div", xr, [
          f.$slots["dp-input"] && !f.$slots.trigger && !unref(c2).enabled ? renderSlot(f.$slots, "dp-input", {
            key: 0,
            value: e2.inputValue,
            isMenuOpen: e2.isMenuOpen,
            onInput: V,
            onEnter: G2,
            onTab: P,
            onClear: A,
            onBlur: _,
            onKeypress: H3,
            onPaste: $
          }) : createCommentVNode("", true),
          f.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            ref_key: "inputRef",
            ref: b2,
            id: f.uid ? `dp-input-${f.uid}` : void 0,
            name: f.name,
            class: normalizeClass(q2.value),
            inputmode: unref(o).enabled ? "text" : "none",
            placeholder: f.placeholder,
            disabled: f.disabled,
            readonly: f.readonly,
            required: f.required,
            value: e2.inputValue,
            autocomplete: f.autocomplete,
            "aria-label": (d3 = unref(l)) == null ? void 0 : d3.input,
            onInput: V,
            onKeydown: [
              withKeys(G2, ["enter"]),
              withKeys(P, ["tab"]),
              H3
            ],
            onBlur: _,
            onFocus: ee,
            onKeypress: H3,
            onPaste: $
          }, null, 42, Jr)),
          createBaseVNode("div", {
            onClick: U[2] || (U[2] = (w2) => a3("toggle"))
          }, [
            f.$slots["input-icon"] && !f.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: U[0] || (U[0] = (w2) => a3("toggle"))
            }, [
              renderSlot(f.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !f.$slots["input-icon"] && !f.hideInputIcon && !f.$slots["dp-input"] ? (openBlock(), createBlock(unref(It), {
              key: 1,
              onClick: U[1] || (U[1] = (w2) => a3("toggle")),
              class: "dp__input_icon dp__input_icons"
            })) : createCommentVNode("", true)
          ]),
          f.$slots["clear-icon"] && e2.inputValue && f.clearable && !f.disabled && !f.readonly ? (openBlock(), createElementBlock("span", Xr, [
            renderSlot(f.$slots, "clear-icon", { clear: A })
          ])) : createCommentVNode("", true),
          f.clearable && !f.$slots["clear-icon"] && e2.inputValue && !f.disabled && !f.readonly ? (openBlock(), createBlock(unref(ya), {
            key: 3,
            class: "dp__clear_icon dp__input_icons",
            onClick: withModifiers(A, ["stop", "prevent"])
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
  setup(e2, { emit: n }) {
    const a3 = e2, {
      defaultedActionRow: t2,
      defaultedPreviewFormat: o,
      defaultedMultiCalendars: l,
      defaultedTextInput: c2,
      defaultedInline: h4,
      getDefaultPattern: y3
    } = Ce(a3), { isValidTime: D2 } = Bt(a3), { buildMatrix: b2 } = rt(), T2 = ref(null), Y2 = ref(null);
    onMounted(() => {
      a3.arrowNavigation && b2([Ae(T2), Ae(Y2)], "actionRow");
    });
    const q2 = computed(() => a3.range && !a3.partialRange && a3.internalModelValue ? a3.internalModelValue.length === 2 : true), K2 = computed(() => !X2.value || !k2.value || !q2.value), X2 = computed(() => !a3.enableTimePicker || a3.ignoreTimeValidation ? true : D2(a3.internalModelValue)), k2 = computed(() => a3.monthPicker ? a3.range && Array.isArray(a3.internalModelValue) ? !a3.internalModelValue.filter((H3) => !p(H3)).length : p(a3.internalModelValue) : true), $ = () => {
      const A = o.value;
      return a3.timePicker || a3.monthPicker, A(Te(a3.internalModelValue));
    }, W = () => {
      const A = a3.internalModelValue;
      return l.value.count > 0 ? `${V(A[0])} - ${V(A[1])}` : [V(A[0]), V(A[1])];
    }, V = (A) => _a(
      A,
      o.value,
      a3.formatLocale,
      c2.value.rangeSeparator,
      a3.modelAuto,
      y3()
    ), G2 = computed(() => !a3.internalModelValue || !a3.menuMount ? "" : typeof o.value == "string" ? Array.isArray(a3.internalModelValue) ? a3.internalModelValue.length === 2 && a3.internalModelValue[1] ? W() : a3.multiDates ? a3.internalModelValue.map((A) => `${V(A)}`) : a3.modelAuto ? `${V(a3.internalModelValue[0])}` : `${V(a3.internalModelValue[0])} -` : V(a3.internalModelValue) : $()), P = () => a3.multiDates ? "; " : " - ", ee = computed(
      () => Array.isArray(G2.value) ? G2.value.join(P()) : G2.value
    ), p = (A) => {
      if (!a3.monthPicker)
        return true;
      let H3 = true;
      const z2 = S3(ze(A));
      if (a3.minDate && a3.maxDate) {
        const Q2 = S3(ze(a3.minDate)), f = S3(ze(a3.maxDate));
        return Ne(z2, Q2) && Pe(z2, f) || ye(z2, Q2) || ye(z2, f);
      }
      if (a3.minDate) {
        const Q2 = S3(ze(a3.minDate));
        H3 = Ne(z2, Q2) || ye(z2, Q2);
      }
      if (a3.maxDate) {
        const Q2 = S3(ze(a3.maxDate));
        H3 = Pe(z2, Q2) || ye(z2, Q2);
      }
      return H3;
    }, _ = () => {
      X2.value && k2.value && q2.value ? n("select-date") : n("invalid-select");
    };
    return (A, H3) => (openBlock(), createElementBlock("div", {
      class: "dp__action_row",
      style: normalizeStyle(e2.calendarWidth ? { width: `${e2.calendarWidth}px` } : {})
    }, [
      A.$slots["action-row"] ? renderSlot(A.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: A.internalModelValue,
        disabled: K2.value,
        selectDate: () => A.$emit("select-date"),
        closePicker: () => A.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(t2).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: ee.value
        }, [
          A.$slots["action-preview"] ? renderSlot(A.$slots, "action-preview", {
            key: 0,
            value: A.internalModelValue
          }) : createCommentVNode("", true),
          A.$slots["action-preview"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(ee.value), 1)
          ], 64))
        ], 8, el)) : createCommentVNode("", true),
        createBaseVNode("div", tl, [
          A.$slots["action-buttons"] ? renderSlot(A.$slots, "action-buttons", {
            key: 0,
            value: A.internalModelValue
          }) : createCommentVNode("", true),
          A.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(h4).enabled && unref(t2).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              ref_key: "cancelButtonRef",
              ref: T2,
              class: "dp__action_button dp__action_cancel",
              onClick: H3[0] || (H3[0] = (z2) => A.$emit("close-picker")),
              onKeydown: [
                H3[1] || (H3[1] = withKeys((z2) => A.$emit("close-picker"), ["enter"])),
                H3[2] || (H3[2] = withKeys((z2) => A.$emit("close-picker"), ["space"]))
              ]
            }, toDisplayString(A.cancelText), 545)) : createCommentVNode("", true),
            unref(t2).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              ref_key: "cancelButtonRef",
              ref: T2,
              class: "dp__action_button dp__action_cancel",
              onClick: H3[3] || (H3[3] = (z2) => A.$emit("select-now")),
              onKeydown: [
                H3[4] || (H3[4] = withKeys((z2) => A.$emit("select-now"), ["enter"])),
                H3[5] || (H3[5] = withKeys((z2) => A.$emit("select-now"), ["space"]))
              ]
            }, toDisplayString(A.nowButtonLabel), 545)) : createCommentVNode("", true),
            unref(t2).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              type: "button",
              class: "dp__action_button dp__action_select",
              onKeydown: [
                withKeys(_, ["enter"]),
                withKeys(_, ["space"])
              ],
              onClick: _,
              disabled: K2.value,
              ref_key: "selectButtonRef",
              ref: Y2
            }, toDisplayString(A.selectText), 41, nl)) : createCommentVNode("", true)
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
var Nt = defineComponent({
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
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { setSelectionGrid: o, buildMultiLevelMatrix: l, setMonthPicker: c2 } = rt(), { defaultedAriaLabels: h4, defaultedTextInput: y3 } = Ce(t2), { hideNavigationButtons: D2 } = qt(), b2 = ref(false), T2 = ref(null), Y2 = ref(null), q2 = ref([]), K2 = ref(), X2 = ref(null), k2 = ref(0), $ = ref(null);
    onBeforeUpdate(() => {
      T2.value = null;
    }), onMounted(() => {
      nextTick().then(() => A()), V(), W(true);
    }), onUnmounted(() => W(false));
    const W = (u2) => {
      var g;
      t2.arrowNavigation && ((g = t2.headerRefs) != null && g.length ? c2(u2) : o(u2));
    }, V = () => {
      var g;
      const u2 = Ae(Y2);
      u2 && (y3.value.enabled || (T2.value ? (g = T2.value) == null || g.focus({ preventScroll: true }) : u2.focus({ preventScroll: true })), b2.value = u2.clientHeight < u2.scrollHeight);
    }, G2 = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !t2.useRelative,
        "dp--overlay-relative": t2.useRelative
      })
    ), P = computed(
      () => t2.useRelative ? { height: `${t2.height}px`, width: "260px" } : void 0
    ), ee = computed(() => ({
      dp__overlay_col: true
    })), p = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: b2.value,
        dp__button_bottom: t2.isLast
      })
    ), _ = computed(() => {
      var u2, g;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((u2 = t2.items) == null ? void 0 : u2.length) <= 6,
        dp__container_block: ((g = t2.items) == null ? void 0 : g.length) > 6
      };
    }), A = () => {
      nextTick().then(() => {
        const u2 = Ae(T2), g = Ae(Y2), s3 = Ae(X2), C = Ae($), ne = s3 ? s3.getBoundingClientRect().height : 0;
        g && (k2.value = g.getBoundingClientRect().height - ne), u2 && C && (C.scrollTop = u2.offsetTop - C.offsetTop - (k2.value / 2 - u2.getBoundingClientRect().height) - ne);
      });
    }, H3 = (u2) => {
      u2.disabled || a3("selected", u2.value);
    }, z2 = () => {
      a3("toggle"), a3("reset-flow");
    }, Q2 = () => {
      t2.escClose && z2();
    }, f = (u2, g, s3, C) => {
      u2 && (g.active && (T2.value = u2), t2.arrowNavigation && (Array.isArray(q2.value[s3]) ? q2.value[s3][C] = u2 : q2.value[s3] = [u2], U()));
    }, U = () => {
      var g, s3;
      const u2 = (g = t2.headerRefs) != null && g.length ? [t2.headerRefs].concat(q2.value) : q2.value.concat([t2.skipButtonRef ? [] : [X2.value]]);
      l(Te(u2), (s3 = t2.headerRefs) != null && s3.length ? "monthPicker" : "selectionGrid");
    }, d3 = (u2) => {
      t2.arrowNavigation || u2.stopImmediatePropagation();
    }, w2 = (u2) => {
      K2.value = u2, a3("hover-value", u2);
    };
    return n({ focusGrid: V }), (u2, g) => {
      var s3;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: Y2,
        class: normalizeClass(G2.value),
        style: normalizeStyle(P.value),
        role: "dialog",
        tabindex: "0",
        onKeydown: [
          withKeys(withModifiers(Q2, ["prevent"]), ["esc"]),
          g[0] || (g[0] = withKeys(withModifiers((C) => d3(C), ["prevent"]), ["left"])),
          g[1] || (g[1] = withKeys(withModifiers((C) => d3(C), ["prevent"]), ["up"])),
          g[2] || (g[2] = withKeys(withModifiers((C) => d3(C), ["prevent"]), ["down"])),
          g[3] || (g[3] = withKeys(withModifiers((C) => d3(C), ["prevent"]), ["right"]))
        ]
      }, [
        createBaseVNode("div", {
          class: normalizeClass(_.value),
          ref_key: "containerRef",
          ref: $,
          role: "grid",
          style: normalizeStyle({ height: `${k2.value}px` })
        }, [
          createBaseVNode("div", ll, [
            renderSlot(u2.$slots, "header")
          ]),
          u2.$slots.overlay ? renderSlot(u2.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(u2.items, (C, ne) => (openBlock(), createElementBlock("div", {
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: u2.items.length >= 3 }]),
            key: ne,
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(C, (r, L2) => (openBlock(), createElementBlock("div", {
              role: "gridcell",
              class: normalizeClass(ee.value),
              key: r.value,
              "aria-selected": r.active,
              "aria-disabled": r.disabled,
              ref_for: true,
              ref: (R2) => f(R2, r, ne, L2),
              tabindex: "0",
              onClick: (R2) => H3(r),
              onKeydown: [
                withKeys(withModifiers((R2) => H3(r), ["prevent"]), ["enter"]),
                withKeys(withModifiers((R2) => H3(r), ["prevent"]), ["space"])
              ],
              onMouseover: (R2) => w2(r.value)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(r.className)
              }, [
                u2.$slots.item ? renderSlot(u2.$slots, "item", {
                  key: 0,
                  item: r
                }) : createCommentVNode("", true),
                u2.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(r.text), 1)
                ], 64))
              ], 2)
            ], 42, ol))), 128))
          ], 2))), 128))
        ], 6),
        u2.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          role: "button",
          "aria-label": (s3 = unref(h4)) == null ? void 0 : s3.toggleOverlay,
          class: normalizeClass(p.value),
          tabindex: "0",
          ref_key: "toggleButton",
          ref: X2,
          onClick: z2,
          onKeydown: [
            withKeys(z2, ["enter"]),
            withKeys(z2, ["tab"])
          ]
        }, [
          renderSlot(u2.$slots, "button-icon")
        ], 42, sl)), [
          [vShow, !unref(D2)(u2.hideNavigation, u2.type)]
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
  setup(e2) {
    const n = e2, a3 = computed(
      () => n.multiCalendars > 0 ? [...Array(n.multiCalendars).keys()] : [0]
    ), t2 = computed(() => ({
      dp__instance_calendar: n.multiCalendars > 0
    }));
    return (o, l) => (openBlock(), createElementBlock("div", {
      class: normalizeClass({
        dp__menu_inner: !o.stretch,
        "dp--menu--inner-stretched": o.stretch,
        dp__flex_display: o.multiCalendars > 0
      })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(a3.value, (c2, h4) => (openBlock(), createElementBlock("div", {
        key: c2,
        class: normalizeClass(t2.value)
      }, [
        renderSlot(o.$slots, "default", {
          instance: c2,
          index: h4
        })
      ], 2))), 128))
    ], 2));
  }
});
var ul = ["aria-label", "aria-disabled"];
var _t = defineComponent({
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
    return onMounted(() => n("set-ref", a3)), (t2, o) => (openBlock(), createElementBlock("button", {
      type: "button",
      class: "dp__btn dp--arrow-btn-nav",
      onClick: o[0] || (o[0] = (l) => t2.$emit("activate")),
      onKeydown: [
        o[1] || (o[1] = withKeys(withModifiers((l) => t2.$emit("activate"), ["prevent"]), ["enter"])),
        o[2] || (o[2] = withKeys(withModifiers((l) => t2.$emit("activate"), ["prevent"]), ["space"]))
      ],
      tabindex: "0",
      "aria-label": t2.ariaLabel,
      "aria-disabled": t2.disabled,
      ref_key: "elRef",
      ref: a3
    }, [
      createBaseVNode("span", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: t2.disabled }])
      }, [
        renderSlot(t2.$slots, "default")
      ], 2)
    ], 40, ul));
  }
});
var Ln = (e2, n, a3) => {
  if (n.value && Array.isArray(n.value))
    if (n.value.some((t2) => ye(e2, t2))) {
      const t2 = n.value.filter((o) => !ye(o, e2));
      n.value = t2.length ? t2 : null;
    } else
      (a3 && +a3 > n.value.length || !a3) && n.value.push(e2);
  else
    n.value = [e2];
};
var Pa = (e2, n, a3) => {
  let t2 = e2.value ? e2.value.slice() : [];
  t2.length === 2 && t2[1] !== null && (t2 = []), t2.length ? Pe(n, t2[0]) ? (t2.unshift(n), a3("range-start", t2[0]), a3("range-start", t2[1])) : (t2[1] = n, a3("range-end", n)) : (t2 = [n], a3("range-start", n)), e2.value = t2;
};
var il = (e2, n) => {
  const { defaultedMultiCalendars: a3, defaultedAriaLabels: t2, defaultedTransitions: o } = Ce(e2), { modelValue: l, year: c2, month: h4, calendars: y3 } = Zt(e2, n), D2 = computed(() => ka(e2.formatLocale, e2.locale, e2.monthNameFormat)), b2 = computed(() => Fn(e2.yearRange, e2.reverseYears)), T2 = ref(null), Y2 = () => {
    for (let d3 = 0; d3 < a3.value.count; d3++)
      if (d3 === 0)
        y3.value[d3] = y3.value[0];
      else {
        const w2 = set(S3(), y3.value[d3 - 1]);
        y3.value[d3] = { month: getMonth(w2), year: getYear(addYears(w2, d3)) };
      }
  }, q2 = (d3) => {
    if (!d3)
      return Y2();
    const w2 = set(S3(), y3.value[d3]);
    return y3.value[0].year = getYear(subYears(w2, a3.value.count - 1)), Y2();
  }, K2 = (d3) => e2.focusStartDate ? d3[0] : d3[1] ? d3[1] : d3[0], X2 = () => {
    if (l.value) {
      const d3 = Array.isArray(l.value) ? K2(l.value) : l.value;
      y3.value[0] = { month: getMonth(d3), year: getYear(d3) };
    }
  };
  onMounted(() => {
    X2(), a3.value.count && Y2();
  });
  const k2 = computed(() => (d3, w2) => {
    const u2 = set(ze(/* @__PURE__ */ new Date()), {
      month: h4.value(d3),
      year: c2.value(d3)
    });
    return Aa(u2, e2.maxDate, e2.minDate, e2.preventMinMaxNavigation, w2);
  }), $ = (d3) => d3 ? { month: getMonth(d3), year: getYear(d3) } : { month: null, year: null }, W = () => l.value ? Array.isArray(l.value) ? l.value.map((d3) => $(d3)) : $(l.value) : $(), V = (d3, w2) => {
    const u2 = y3.value[d3], g = W();
    return Array.isArray(g) ? g.some((s3) => s3.year === (u2 == null ? void 0 : u2.year) && s3.month === w2) : (u2 == null ? void 0 : u2.year) === g.year && w2 === g.month;
  }, G2 = (d3, w2, u2) => {
    var s3, C;
    const g = W();
    return Array.isArray(g) ? c2.value(w2) === ((s3 = g[u2]) == null ? void 0 : s3.year) && d3 === ((C = g[u2]) == null ? void 0 : C.month) : false;
  }, P = (d3, w2) => {
    if (e2.range) {
      const u2 = W();
      if (Array.isArray(l.value) && Array.isArray(u2)) {
        const g = G2(d3, w2, 0) || G2(d3, w2, 1), s3 = Je(ze(S3()), d3, c2.value(w2));
        return Vn(l.value, T2.value, s3) && !g;
      }
      return false;
    }
    return false;
  }, ee = computed(() => (d3) => bt(D2.value, (w2) => {
    const u2 = V(d3, w2.value), g = Rt(
      w2.value,
      Da(c2.value(d3), e2.minDate),
      Ma(c2.value(d3), e2.maxDate)
    ) || Ir(e2.disabledDates, c2.value(d3)).includes(w2.value), s3 = P(w2.value, d3);
    return { active: u2, disabled: g, isBetween: s3 };
  })), p = computed(() => (d3) => bt(b2.value, (w2) => {
    const u2 = c2.value(d3) === w2.value, g = Rt(w2.value, kt(e2.minDate), kt(e2.maxDate));
    return { active: u2, disabled: g };
  })), _ = (d3, w2) => Je(ze(S3()), d3, c2.value(w2)), A = (d3, w2) => {
    const u2 = l.value ? l.value : ze(/* @__PURE__ */ new Date());
    l.value = Je(u2, d3, c2.value(w2)), n("auto-apply");
  }, H3 = (d3, w2) => {
    var u2;
    Pa(l, _(d3, w2), n), n("auto-apply", ((u2 = l.value) == null ? void 0 : u2.length) === 1);
  }, z2 = (d3, w2) => {
    Ln(_(d3, w2), l, e2.multiDatesLimit), n("auto-apply", true);
  };
  return {
    groupedMonths: ee,
    groupedYears: p,
    year: c2,
    isDisabled: k2,
    defaultedMultiCalendars: a3,
    defaultedAriaLabels: t2,
    defaultedTransitions: o,
    setHoverDate: (d3, w2) => {
      T2.value = _(d3, w2);
    },
    selectMonth: (d3, w2) => (y3.value[w2].month = d3, e2.multiDates ? z2(d3, w2) : e2.range ? H3(d3, w2) : A(d3, w2)),
    selectYear: (d3, w2) => {
      y3.value[w2].year = d3, a3.value.count && !a3.value.solo && q2(w2);
    }
  };
};
var cl = { class: "dp__month_picker_header" };
var dl = ["aria-label", "onClick", "onKeydown"];
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
  setup(e2, { emit: n }) {
    const a3 = e2, {
      groupedMonths: t2,
      groupedYears: o,
      year: l,
      isDisabled: c2,
      defaultedMultiCalendars: h4,
      defaultedAriaLabels: y3,
      defaultedTransitions: D2,
      setHoverDate: b2,
      selectMonth: T2,
      selectYear: Y2
    } = il(a3, n), { transitionName: q2, showTransition: K2 } = Yt(D2), { showRightIcon: X2, showLeftIcon: k2 } = qt(), $ = ref([false]), W = (P, ee) => {
      Y2(P, ee), G2(ee);
    }, V = (P, ee = false) => {
      if (!c2.value(P, ee)) {
        const p = ee ? l.value(P) + 1 : l.value(P) - 1;
        Y2(p, P);
      }
    }, G2 = (P, ee = false, p) => {
      ee || n("reset-flow"), p !== void 0 ? $.value[P] = p : $.value[P] = !$.value[P], $.value || n("overlay-closed");
    };
    return (P, ee) => (openBlock(), createBlock(Hn, {
      "multi-calendars": unref(h4).count,
      stretch: ""
    }, {
      default: withCtx(({ instance: p }) => [
        createVNode(Nt, {
          items: unref(t2)(p),
          "arrow-navigation": P.arrowNavigation,
          "is-last": P.autoApply && !P.keepActionRow,
          "esc-close": P.escClose,
          height: P.modeHeight,
          onSelected: (_) => unref(T2)(_, p),
          onHoverValue: (_) => unref(b2)(_, p),
          "use-relative": "",
          type: "month"
        }, {
          header: withCtx(() => {
            var _, A, H3;
            return [
              createBaseVNode("div", cl, [
                unref(k2)(unref(h4), p) ? (openBlock(), createBlock(_t, {
                  key: 0,
                  ref: "mpPrevIconRef",
                  "aria-label": (_ = unref(y3)) == null ? void 0 : _.prevYear,
                  disabled: unref(c2)(p, false),
                  onActivate: (z2) => V(p, false)
                }, {
                  default: withCtx(() => [
                    P.$slots["arrow-left"] ? renderSlot(P.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                    P.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Cn), { key: 1 }))
                  ]),
                  _: 2
                }, 1032, ["aria-label", "disabled", "onActivate"])) : createCommentVNode("", true),
                createBaseVNode("div", {
                  class: "dp--year-select",
                  role: "button",
                  ref: "mpYearButtonRef",
                  "aria-label": (A = unref(y3)) == null ? void 0 : A.openYearsOverlay,
                  tabindex: "0",
                  onClick: () => G2(p, false),
                  onKeydown: withKeys(() => G2(p, false), ["enter"])
                }, [
                  P.$slots.year ? renderSlot(P.$slots, "year", {
                    key: 0,
                    year: unref(l)(p)
                  }) : createCommentVNode("", true),
                  P.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(unref(l)(p)), 1)
                  ], 64))
                ], 40, dl),
                unref(X2)(unref(h4), p) ? (openBlock(), createBlock(_t, {
                  key: 1,
                  ref: "mpNextIconRef",
                  "aria-label": (H3 = unref(y3)) == null ? void 0 : H3.nextYear,
                  disabled: unref(c2)(p, false),
                  onActivate: (z2) => V(p, true)
                }, {
                  default: withCtx(() => [
                    P.$slots["arrow-right"] ? renderSlot(P.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
                    P.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Rn), { key: 1 }))
                  ]),
                  _: 2
                }, 1032, ["aria-label", "disabled", "onActivate"])) : createCommentVNode("", true),
                createVNode(Transition, {
                  name: unref(q2)($.value[p]),
                  css: unref(K2)
                }, {
                  default: withCtx(() => [
                    $.value[p] ? (openBlock(), createBlock(Nt, {
                      key: 0,
                      items: unref(o)(p),
                      "text-input": P.textInput,
                      "esc-close": P.escClose,
                      onToggle: (z2) => G2(p),
                      onSelected: (z2) => W(z2, p),
                      "is-last": P.autoApply && !P.keepActionRow,
                      type: "year"
                    }, createSlots({
                      "button-icon": withCtx(() => [
                        P.$slots["calendar-icon"] ? renderSlot(P.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        P.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(It), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      P.$slots["year-overlay-value"] ? {
                        name: "item",
                        fn: withCtx(({ item: z2 }) => [
                          renderSlot(P.$slots, "year-overlay-value", {
                            text: z2.text,
                            value: z2.value
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
var vl = (e2, n) => {
  const { modelValue: a3 } = Zt(e2, n), t2 = ref(null), o = (b2) => Array.isArray(a3.value) ? a3.value.some((T2) => getYear(T2) === b2) : a3.value ? getYear(a3.value) === b2 : false, l = (b2) => e2.range && Array.isArray(a3.value) ? Vn(a3.value, t2.value, h4(b2)) : false, c2 = computed(() => bt(Fn(e2.yearRange, e2.reverseYears), (b2) => {
    const T2 = o(b2.value), Y2 = Rt(b2.value, kt(e2.minDate), kt(e2.maxDate)), q2 = l(b2.value);
    return { active: T2, disabled: Y2, isBetween: q2 };
  })), h4 = (b2) => setYear(ze(/* @__PURE__ */ new Date()), b2);
  return {
    groupedYears: c2,
    setHoverValue: (b2) => {
      t2.value = setYear(ze(/* @__PURE__ */ new Date()), b2);
    },
    selectYear: (b2) => {
      if (e2.multiDates)
        return Ln(h4(b2), a3, e2.multiDatesLimit);
      if (e2.range)
        return Pa(a3, h4(b2), n);
      a3.value = h4(b2);
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
  emits: ["update:internal-model-value", "reset-flow", "range-start", "range-end"],
  setup(e2, { emit: n }) {
    const a3 = e2, { groupedYears: t2, selectYear: o, setHoverValue: l } = vl(a3, n);
    return (c2, h4) => (openBlock(), createBlock(Nt, {
      items: unref(t2),
      "is-last": c2.autoApply && !c2.keepActionRow,
      height: c2.modeHeight,
      type: "year",
      "use-relative": "",
      onSelected: unref(o),
      onHoverValue: unref(l)
    }, createSlots({ _: 2 }, [
      c2.$slots["year-overlay-value"] ? {
        name: "item",
        fn: withCtx(({ item: y3 }) => [
          renderSlot(c2.$slots, "year-overlay-value", {
            text: y3.text,
            value: y3.value
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
var pl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var hl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
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
    disabledTimesConfig: { type: Object, default: () => ({}) },
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
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { setTimePickerElements: o, setTimePickerBackRef: l } = rt(), { defaultedAriaLabels: c2, defaultedTransitions: h4, defaultedFilters: y3 } = Ce(t2), { transitionName: D2, showTransition: b2 } = Yt(h4), T2 = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), Y2 = ref("AM"), q2 = ref(null), K2 = ref([]);
    onMounted(() => {
      a3("mounted");
    });
    const X2 = (r) => set(/* @__PURE__ */ new Date(), {
      hours: r.hours,
      minutes: r.minutes,
      seconds: t2.enableSeconds ? r.seconds : 0,
      milliseconds: 0
    }), k2 = computed(() => (r) => H3(r, t2[r])), $ = computed(() => ({ hours: t2.hours, minutes: t2.minutes, seconds: t2.seconds })), W = computed(() => (r) => !Q2(+t2[r] + +t2[`${r}Increment`], r)), V = computed(() => (r) => !Q2(+t2[r] - +t2[`${r}Increment`], r)), G2 = (r, L2) => add(set(S3(), r), L2), P = (r, L2) => sub(set(S3(), r), L2), ee = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !t2.timePickerInline,
        dp__time_col_reg_block: !t2.enableSeconds && t2.is24 && !t2.timePickerInline,
        dp__time_col_reg_inline: !t2.enableSeconds && t2.is24 && t2.timePickerInline,
        dp__time_col_reg_with_button: !t2.enableSeconds && !t2.is24,
        dp__time_col_sec: t2.enableSeconds && t2.is24,
        dp__time_col_sec_with_button: t2.enableSeconds && !t2.is24
      })
    ), p = computed(() => {
      const r = [{ type: "hours" }, { type: "", separator: true }, { type: "minutes" }];
      return t2.enableSeconds ? r.concat([{ type: "", separator: true }, { type: "seconds" }]) : r;
    }), _ = computed(() => p.value.filter((r) => !r.separator)), A = computed(() => (r) => {
      if (r === "hours") {
        const L2 = u2(+t2.hours);
        return { text: L2 < 10 ? `0${L2}` : `${L2}`, value: L2 };
      }
      return { text: t2[r] < 10 ? `0${t2[r]}` : `${t2[r]}`, value: t2[r] };
    }), H3 = (r, L2) => {
      var R2;
      return t2.disabledTimesConfig[r] ? !!((R2 = t2.disabledTimesConfig[r]) != null && R2.includes(L2)) : true;
    }, z2 = (r) => {
      const L2 = t2.is24 ? 24 : 12, R2 = r === "hours" ? L2 : 60, m3 = +t2[`${r}GridIncrement`], B2 = r === "hours" && !t2.is24 ? m3 : 0, le = [];
      for (let Z = B2; Z < R2; Z += m3)
        le.push({ value: Z, text: Z < 10 ? `0${Z}` : `${Z}` });
      return r === "hours" && !t2.is24 && le.push({ value: 0, text: "12" }), bt(le, (Z) => ({ active: false, disabled: y3.value.times[r].includes(Z.value) || !Q2(Z.value, r) || H3(r, Z.value) }));
    }, Q2 = (r, L2) => {
      const R2 = t2.minTime ? X2(dn(t2.minTime)) : null, m3 = t2.maxTime ? X2(dn(t2.maxTime)) : null, B2 = X2(dn($.value, L2, r));
      return R2 && m3 ? (isBefore(B2, m3) || isEqual(B2, m3)) && (isAfter(B2, R2) || isEqual(B2, R2)) : R2 ? isAfter(B2, R2) || isEqual(B2, R2) : m3 ? isBefore(B2, m3) || isEqual(B2, m3) : true;
    }, f = (r) => t2[`no${r[0].toUpperCase() + r.slice(1)}Overlay`], U = (r) => {
      f(r) || (T2[r] = !T2[r], T2[r] || a3("overlay-closed"));
    }, d3 = (r) => r === "hours" ? getHours : r === "minutes" ? getMinutes : getSeconds, w2 = (r, L2 = true) => {
      const R2 = L2 ? G2 : P, m3 = L2 ? +t2[`${r}Increment`] : -+t2[`${r}Increment`];
      Q2(+t2[r] + m3, r) && a3(
        `update:${r}`,
        d3(r)(R2({ [r]: +t2[r] }, { [r]: +t2[`${r}Increment`] }))
      );
    }, u2 = (r) => t2.is24 ? r : (r >= 12 ? Y2.value = "PM" : Y2.value = "AM", Mr(r)), g = () => {
      Y2.value === "PM" ? (Y2.value = "AM", a3("update:hours", t2.hours - 12)) : (Y2.value = "PM", a3("update:hours", t2.hours + 12)), a3("am-pm-change", Y2.value);
    }, s3 = (r) => {
      T2[r] = true;
    }, C = (r, L2, R2) => {
      if (r && t2.arrowNavigation) {
        Array.isArray(K2.value[L2]) ? K2.value[L2][R2] = r : K2.value[L2] = [r];
        const m3 = K2.value.reduce(
          (B2, le) => le.map((Z, ke) => [...B2[ke] || [], le[ke]]),
          []
        );
        l(t2.closeTimePickerBtn), q2.value && (m3[1] = m3[1].concat(q2.value)), o(m3, t2.order);
      }
    }, ne = (r, L2) => (U(r), r === "hours" && !t2.is24 ? a3(`update:${r}`, Y2.value === "PM" ? L2 + 12 : L2) : a3(`update:${r}`, L2));
    return n({ openChildCmp: s3 }), (r, L2) => {
      var R2;
      return r.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", gl, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(p.value, (m3, B2) => {
          var le, Z, ke;
          return openBlock(), createElementBlock("div", {
            key: B2,
            class: normalizeClass(ee.value)
          }, [
            m3.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(" : ")
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !t2.timePickerInline,
                  dp__inc_dec_button_inline: t2.timePickerInline,
                  dp__tp_inline_btn_top: t2.timePickerInline,
                  dp__inc_dec_button_disabled: W.value(m3.type)
                }),
                "aria-label": (le = unref(c2)) == null ? void 0 : le.incrementValue(m3.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((se) => w2(m3.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((se) => w2(m3.type), ["prevent"]), ["space"])
                ],
                onClick: (se) => w2(m3.type),
                ref_for: true,
                ref: (se) => C(se, B2, 0)
              }, [
                t2.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  pl,
                  hl
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  r.$slots["arrow-up"] ? renderSlot(r.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  r.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(On), { key: 1 }))
                ], 64))
              ], 42, yl),
              createBaseVNode("button", {
                type: "button",
                "aria-label": (Z = unref(c2)) == null ? void 0 : Z.openTpOverlay(m3.type),
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !t2.timePickerInline,
                  dp__time_display_inline: t2.timePickerInline,
                  "dp--time-invalid": k2.value(m3.type),
                  "dp--time-overlay-btn": !k2.value(m3.type)
                }),
                disabled: f(m3.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((se) => U(m3.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((se) => U(m3.type), ["prevent"]), ["space"])
                ],
                onClick: (se) => U(m3.type),
                ref_for: true,
                ref: (se) => C(se, B2, 1)
              }, [
                r.$slots[m3.type] ? renderSlot(r.$slots, m3.type, {
                  key: 0,
                  text: A.value(m3.type).text,
                  value: A.value(m3.type).value
                }) : createCommentVNode("", true),
                r.$slots[m3.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(A.value(m3.type).text), 1)
                ], 64))
              ], 42, bl),
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !t2.timePickerInline,
                  dp__inc_dec_button_inline: t2.timePickerInline,
                  dp__tp_inline_btn_bottom: t2.timePickerInline,
                  dp__inc_dec_button_disabled: V.value(m3.type)
                }),
                "aria-label": (ke = unref(c2)) == null ? void 0 : ke.decrementValue(m3.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((se) => w2(m3.type, false), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((se) => w2(m3.type, false), ["prevent"]), ["space"])
                ],
                onClick: (se) => w2(m3.type, false),
                ref_for: true,
                ref: (se) => C(se, B2, 2)
              }, [
                t2.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
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
            toggle: g,
            value: Y2.value
          }) : createCommentVNode("", true),
          r.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: q2,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (R2 = unref(c2)) == null ? void 0 : R2.amPmButton,
            tabindex: "0",
            onClick: g,
            onKeydown: [
              withKeys(withModifiers(g, ["prevent"]), ["enter"]),
              withKeys(withModifiers(g, ["prevent"]), ["space"])
            ]
          }, toDisplayString(Y2.value), 41, $l))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(_.value, (m3, B2) => (openBlock(), createBlock(Transition, {
          key: B2,
          name: unref(D2)(T2[m3.type]),
          css: unref(b2)
        }, {
          default: withCtx(() => [
            T2[m3.type] ? (openBlock(), createBlock(Nt, {
              key: 0,
              items: z2(m3.type),
              "is-last": r.autoApply && !r.keepActionRow,
              "esc-close": r.escClose,
              type: m3.type,
              "text-input": r.textInput,
              "arrow-navigation": r.arrowNavigation,
              onSelected: (le) => ne(m3.type, le),
              onToggle: (le) => U(m3.type),
              onResetFlow: L2[0] || (L2[0] = (le) => r.$emit("reset-flow"))
            }, createSlots({
              "button-icon": withCtx(() => [
                r.$slots["clock-icon"] ? renderSlot(r.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                r.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Nn), { key: 1 }))
              ]),
              _: 2
            }, [
              r.$slots[`${m3.type}-overlay-value`] ? {
                name: "item",
                fn: withCtx(({ item: le }) => [
                  renderSlot(r.$slots, `${m3.type}-overlay-value`, {
                    text: le.text,
                    value: le.value
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
var Ca = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePicker",
  props: {
    hours: { type: [Number, Array], default: 0 },
    minutes: { type: [Number, Array], default: 0 },
    seconds: { type: [Number, Array], default: 0 },
    disabledTimesConfig: { type: Function, default: () => ({}) },
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
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { buildMatrix: o, setTimePicker: l } = rt(), c2 = useSlots(), { defaultedTransitions: h4, defaultedAriaLabels: y3, defaultedTextInput: D2 } = Ce(t2), { transitionName: b2, showTransition: T2 } = Yt(h4), { hideNavigationButtons: Y2 } = qt(), q2 = ref(null), K2 = ref(null), X2 = ref([]), k2 = ref(null);
    onMounted(() => {
      a3("mount"), !t2.timePicker && t2.arrowNavigation ? o([Ae(q2.value)], "time") : l(true, t2.timePicker);
    });
    const $ = computed(() => t2.range && t2.modelAuto ? wa(t2.internalModelValue) : true), W = ref(false), V = (f) => ({
      hours: Array.isArray(t2.hours) ? t2.hours[f] : t2.hours,
      minutes: Array.isArray(t2.minutes) ? t2.minutes[f] : t2.minutes,
      seconds: Array.isArray(t2.seconds) ? t2.seconds[f] : t2.seconds
    }), G2 = computed(() => {
      const f = [];
      if (t2.range)
        for (let U = 0; U < 2; U++)
          f.push(V(U));
      else
        f.push(V(0));
      return f;
    }), P = (f, U = false, d3 = "") => {
      U || a3("reset-flow"), W.value = f, a3(f ? "overlay-opened" : "overlay-closed"), t2.arrowNavigation && l(f), nextTick(() => {
        d3 !== "" && X2.value[0] && X2.value[0].openChildCmp(d3);
      });
    }, ee = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: t2.autoApply && !t2.keepActionRow
    })), p = je(c2, "timePicker"), _ = (f, U, d3) => t2.range ? U === 0 ? [f, G2.value[1][d3]] : [G2.value[0][d3], f] : f, A = (f) => {
      a3("update:hours", f);
    }, H3 = (f) => {
      a3("update:minutes", f);
    }, z2 = (f) => {
      a3("update:seconds", f);
    }, Q2 = () => {
      if (k2.value && !D2.value.enabled) {
        const f = Tr(k2.value);
        f && f.focus({ preventScroll: true });
      }
    };
    return n({ toggleTimePicker: P }), (f, U) => {
      var d3;
      return openBlock(), createElementBlock("div", null, [
        !f.timePicker && !f.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          class: normalizeClass(ee.value),
          "aria-label": (d3 = unref(y3)) == null ? void 0 : d3.openTimePicker,
          tabindex: "0",
          ref_key: "openTimePickerBtn",
          ref: q2,
          onKeydown: [
            U[0] || (U[0] = withKeys((w2) => P(true), ["enter"])),
            U[1] || (U[1] = withKeys((w2) => P(true), ["space"]))
          ],
          onClick: U[2] || (U[2] = (w2) => P(true))
        }, [
          f.$slots["clock-icon"] ? renderSlot(f.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          f.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Nn), { key: 1 }))
        ], 42, Al)), [
          [vShow, !unref(Y2)(f.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(b2)(W.value),
          css: unref(T2) && !f.timePickerInline
        }, {
          default: withCtx(() => {
            var w2;
            return [
              W.value || f.timePicker || f.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass({
                  dp__overlay: !f.timePickerInline,
                  "dp--overlay-absolute": !t2.timePicker && !f.timePickerInline,
                  "dp--overlay-relative": t2.timePicker
                }),
                style: normalizeStyle(f.timePicker ? { height: `${f.modeHeight}px` } : void 0),
                ref_key: "overlayRef",
                ref: k2,
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
                    hours: e2.hours,
                    minutes: e2.minutes,
                    seconds: e2.seconds,
                    setHours: A,
                    setMinutes: H3,
                    setSeconds: z2
                  }) : createCommentVNode("", true),
                  f.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(f.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(G2.value, (u2, g) => withDirectives((openBlock(), createBlock(Tl, mergeProps({ key: g }, {
                      ...f.$props,
                      order: g,
                      hours: u2.hours,
                      minutes: u2.minutes,
                      seconds: u2.seconds,
                      closeTimePickerBtn: K2.value,
                      disabledTimesConfig: e2.disabledTimesConfig(g),
                      disabled: g === 0 ? f.fixedStart : f.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: X2,
                      "onUpdate:hours": (s3) => A(_(s3, g, "hours")),
                      "onUpdate:minutes": (s3) => H3(_(s3, g, "minutes")),
                      "onUpdate:seconds": (s3) => z2(_(s3, g, "seconds")),
                      onMounted: Q2,
                      onOverlayClosed: Q2,
                      onAmPmChange: U[3] || (U[3] = (s3) => f.$emit("am-pm-change", s3))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(p), (s3, C) => ({
                        name: s3,
                        fn: withCtx((ne) => [
                          renderSlot(f.$slots, s3, normalizeProps(guardReactiveProps(ne)))
                        ])
                      }))
                    ]), 1040, ["onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, g === 0 ? true : $.value]
                    ])), 128))
                  ], 2)),
                  !f.timePicker && !f.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    type: "button",
                    ref_key: "closeTimePickerBtn",
                    ref: K2,
                    class: normalizeClass(ee.value),
                    "aria-label": (w2 = unref(y3)) == null ? void 0 : w2.closeTimePicker,
                    tabindex: "0",
                    onKeydown: [
                      U[4] || (U[4] = withKeys((u2) => P(false), ["enter"])),
                      U[5] || (U[5] = withKeys((u2) => P(false), ["space"]))
                    ],
                    onClick: U[6] || (U[6] = (u2) => P(false))
                  }, [
                    f.$slots["calendar-icon"] ? renderSlot(f.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    f.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(It), { key: 1 }))
                  ], 42, Sl)), [
                    [vShow, !unref(Y2)(f.hideNavigation, "time")]
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
var Ra = (e2, n, a3, t2) => {
  const o = (k2, $) => Array.isArray(n[k2]) ? n[k2][$] : n[k2], l = (k2) => e2.enableSeconds ? Array.isArray(n.seconds) ? n.seconds[k2] : n.seconds : 0, c2 = (k2, $) => k2 ? $ !== void 0 ? tt(k2, o("hours", $), o("minutes", $), l($)) : tt(k2, n.hours, n.minutes, l()) : S3(), h4 = (k2, $) => {
    n[k2] = $;
  }, y3 = (k2, $) => {
    const W = Object.fromEntries(
      Object.keys(n).map((V) => V === k2 ? [V, $] : [V, n[V]].slice())
    );
    if (e2.range && !e2.disableTimeRangeValidation) {
      const V = (P) => a3.value ? tt(
        a3.value[P],
        W.hours[P],
        W.minutes[P],
        W.seconds[P]
      ) : null, G2 = (P) => setMilliseconds(a3.value[P], 0);
      return !(ye(V(0), V(1)) && (isAfter(V(0), G2(1)) || isBefore(V(1), G2(0))));
    }
    return true;
  }, D2 = (k2, $) => {
    y3(k2, $) && (h4(k2, $), t2 && t2());
  }, b2 = (k2) => {
    D2("hours", k2);
  }, T2 = (k2) => {
    D2("minutes", k2);
  }, Y2 = (k2) => {
    D2("seconds", k2);
  }, q2 = (k2, $, W, V) => {
    $ && b2(k2), !$ && !W && T2(k2), W && Y2(k2), a3.value && V(a3.value);
  }, K2 = (k2) => {
    if (k2) {
      const $ = Array.isArray(k2), W = $ ? [+k2[0].hours, +k2[1].hours] : +k2.hours, V = $ ? [+k2[0].minutes, +k2[1].minutes] : +k2.minutes, G2 = $ ? [+k2[0].seconds, +k2[1].seconds] : +k2.seconds;
      h4("hours", W), h4("minutes", V), e2.enableSeconds && h4("seconds", G2);
    }
  }, X2 = computed(() => (k2) => {
    var $;
    if (Array.isArray(e2.disabledTimes)) {
      const W = Array.isArray(n.hours) ? n.hours[k2] : n.hours, V = e2.disabledTimes.filter((G2) => +G2.hours === W);
      return (($ = V[0]) == null ? void 0 : $.minutes) === "*" ? { hours: [W], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (V == null ? void 0 : V.map((G2) => +G2.minutes)) ?? [],
        seconds: (V == null ? void 0 : V.map((G2) => G2.seconds ? +G2.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: h4,
    updateHours: b2,
    updateMinutes: T2,
    updateSeconds: Y2,
    getSetDateTime: c2,
    updateTimeValues: q2,
    getSecondsValue: l,
    assignStartTime: K2,
    disabledTimesConfig: X2
  };
};
var Pl = (e2, n) => {
  const { modelValue: a3, time: t2 } = Zt(e2, n), { defaultedStartTime: o } = Ce(e2), { updateTimeValues: l, getSetDateTime: c2, setTime: h4, assignStartTime: y3, disabledTimesConfig: D2 } = Ra(
    e2,
    t2,
    a3
  ), b2 = () => {
    e2.range ? a3.value = [c2(null, 0), c2(null, 1)] : a3.value = c2(null);
  }, T2 = (k2) => Array.isArray(k2) ? [ft(S3(k2[0])), ft(S3(k2[1]))] : [ft(k2 ?? S3())], Y2 = (k2, $, W) => {
    h4("hours", k2), h4("minutes", $), e2.enableSeconds && h4("seconds", W);
  }, q2 = () => {
    const [k2, $] = T2(a3.value);
    return e2.range ? Y2(
      [k2.hours, $.hours],
      [k2.minutes, $.minutes],
      [k2.seconds, $.minutes]
    ) : Y2(k2.hours, k2.minutes, k2.seconds);
  };
  onMounted(() => {
    if (!e2.shadow)
      return y3(o.value), a3.value ? q2() : b2();
  });
  const K2 = () => {
    Array.isArray(a3.value) ? a3.value = a3.value.map((k2, $) => k2 && c2(k2, $)) : a3.value = c2(a3.value), n("time-update");
  };
  return {
    time: t2,
    disabledTimesConfig: D2,
    updateTime: (k2, $ = true, W = false) => {
      l(k2, $, W, K2);
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
  setup(e2, { emit: n }) {
    const a3 = e2, t2 = useSlots(), o = je(t2, "timePicker"), { time: l, disabledTimesConfig: c2, updateTime: h4 } = Pl(a3, n);
    return (y3, D2) => (openBlock(), createBlock(Hn, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(() => [
        createVNode(Ca, mergeProps(y3.$props, {
          hours: unref(l).hours,
          minutes: unref(l).minutes,
          seconds: unref(l).seconds,
          "internal-model-value": y3.internalModelValue,
          "disabled-times-config": unref(c2),
          "onUpdate:hours": D2[0] || (D2[0] = (b2) => unref(h4)(b2)),
          "onUpdate:minutes": D2[1] || (D2[1] = (b2) => unref(h4)(b2, false)),
          "onUpdate:seconds": D2[2] || (D2[2] = (b2) => unref(h4)(b2, false, true)),
          onAmPmChange: D2[3] || (D2[3] = (b2) => y3.$emit("am-pm-change", b2))
        }), createSlots({ _: 2 }, [
          renderList(unref(o), (b2, T2) => ({
            name: b2,
            fn: withCtx((Y2) => [
              renderSlot(y3.$slots, b2, normalizeProps(guardReactiveProps(Y2)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config"])
      ]),
      _: 3
    }));
  }
});
var Rl = { class: "dp__month_year_row" };
var Nl = ["onClick", "onKeydown", "aria-label"];
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
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { defaultedTransitions: o, defaultedAriaLabels: l, defaultedMultiCalendars: c2, defaultedFilters: h4 } = Ce(t2), { transitionName: y3, showTransition: D2 } = Yt(o), { buildMatrix: b2 } = rt(), { handleMonthYearChange: T2, isDisabled: Y2, updateMonthYear: q2 } = zr(t2, a3), { showLeftIcon: K2, showRightIcon: X2 } = qt(), k2 = ref(false), $ = ref(false), W = ref([null, null, null, null]);
    onMounted(() => {
      a3("mount");
    });
    const V = (u2) => ({
      get: () => t2[u2],
      set: (g) => {
        const s3 = u2 === We.month ? We.year : We.month;
        a3("update-month-year", { [u2]: g, [s3]: t2[s3] }), u2 === We.month ? z2(true) : Q2(true);
      }
    }), G2 = computed(V(We.month)), P = computed(V(We.year)), ee = computed(() => (u2) => ({
      month: t2.month,
      year: t2.year,
      items: u2 === We.month ? t2.months : t2.years,
      instance: t2.instance,
      updateMonthYear: q2,
      toggle: u2 === We.month ? z2 : Q2
    })), p = computed(() => {
      const u2 = t2.months.find((g) => g.value === t2.month);
      return u2 || { text: "", value: 0 };
    }), _ = computed(() => bt(t2.months, (u2) => {
      const g = t2.month === u2.value, s3 = Rt(
        u2.value,
        Da(t2.year, t2.minDate),
        Ma(t2.year, t2.maxDate)
      ) || h4.value.months.includes(u2.value);
      return { active: g, disabled: s3 };
    })), A = computed(() => bt(t2.years, (u2) => {
      const g = t2.year === u2.value, s3 = Rt(u2.value, kt(t2.minDate), kt(t2.maxDate)) || h4.value.years.includes(u2.value);
      return { active: g, disabled: s3 };
    })), H3 = (u2, g) => {
      g !== void 0 ? u2.value = g : u2.value = !u2.value, u2.value || a3("overlay-closed");
    }, z2 = (u2 = false, g) => {
      f(u2), H3(k2, g);
    }, Q2 = (u2 = false, g) => {
      f(u2), H3($, g);
    }, f = (u2) => {
      u2 || a3("reset-flow");
    }, U = (u2, g) => {
      t2.arrowNavigation && (W.value[g] = Ae(u2), b2(W.value, "monthYear"));
    }, d3 = computed(() => {
      var u2, g;
      return [
        {
          type: We.month,
          index: 1,
          toggle: z2,
          modelValue: G2.value,
          updateModelValue: (s3) => G2.value = s3,
          text: p.value.text,
          showSelectionGrid: k2.value,
          items: _.value,
          ariaLabel: (u2 = l.value) == null ? void 0 : u2.openMonthsOverlay
        },
        {
          type: We.year,
          index: 2,
          toggle: Q2,
          modelValue: P.value,
          updateModelValue: (s3) => P.value = s3,
          text: t2.year,
          showSelectionGrid: $.value,
          items: A.value,
          ariaLabel: (g = l.value) == null ? void 0 : g.openYearsOverlay
        }
      ];
    }), w2 = computed(
      () => t2.disableYearSelect ? [d3.value[0]] : d3.value
    );
    return n({
      toggleMonthPicker: z2,
      toggleYearPicker: Q2,
      handleMonthYearChange: T2
    }), (u2, g) => {
      var s3, C, ne;
      return openBlock(), createElementBlock("div", Rl, [
        u2.$slots["month-year"] ? renderSlot(u2.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, { month: e2.month, year: e2.year, months: e2.months, years: e2.years, updateMonthYear: unref(q2), handleMonthYearChange: unref(T2), instance: e2.instance }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          unref(K2)(unref(c2), e2.instance) && !u2.vertical ? (openBlock(), createBlock(_t, {
            key: 0,
            "aria-label": (s3 = unref(l)) == null ? void 0 : s3.prevMonth,
            disabled: unref(Y2)(false),
            onActivate: g[0] || (g[0] = (r) => unref(T2)(false)),
            onSetRef: g[1] || (g[1] = (r) => U(r, 0))
          }, {
            default: withCtx(() => [
              u2.$slots["arrow-left"] ? renderSlot(u2.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
              u2.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Cn), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: normalizeClass(["dp__month_year_wrap", {
              dp__year_disable_select: u2.disableYearSelect
            }])
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(w2.value, (r, L2) => (openBlock(), createElementBlock(Fragment, {
              key: r.type
            }, [
              createBaseVNode("button", {
                type: "button",
                class: "dp__btn dp__month_year_select",
                onClick: r.toggle,
                onKeydown: [
                  withKeys(withModifiers(r.toggle, ["prevent"]), ["enter"]),
                  withKeys(withModifiers(r.toggle, ["prevent"]), ["space"])
                ],
                "aria-label": r.ariaLabel,
                tabindex: "0",
                ref_for: true,
                ref: (R2) => U(R2, L2 + 1)
              }, [
                u2.$slots[r.type] ? renderSlot(u2.$slots, r.type, normalizeProps(mergeProps({ key: 0 }, { text: r.text }))) : createCommentVNode("", true),
                u2.$slots[r.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(r.text), 1)
                ], 64))
              ], 40, Nl),
              createVNode(Transition, {
                name: unref(y3)(r.showSelectionGrid),
                css: unref(D2)
              }, {
                default: withCtx(() => [
                  r.showSelectionGrid ? (openBlock(), createBlock(Nt, {
                    key: 0,
                    items: r.items,
                    "arrow-navigation": u2.arrowNavigation,
                    "hide-navigation": u2.hideNavigation,
                    "is-last": u2.autoApply && !u2.keepActionRow,
                    "skip-button-ref": false,
                    type: r.type,
                    "header-refs": [],
                    "esc-close": u2.escClose,
                    "text-input": u2.textInput,
                    onSelected: r.updateModelValue,
                    onToggle: r.toggle
                  }, createSlots({
                    "button-icon": withCtx(() => [
                      u2.$slots["calendar-icon"] ? renderSlot(u2.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                      u2.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(It), { key: 1 }))
                    ]),
                    _: 2
                  }, [
                    u2.$slots[`${r.type}-overlay-val`] ? {
                      name: "item",
                      fn: withCtx(({ item: R2 }) => [
                        renderSlot(u2.$slots, `${r.type}-overlay-val`, {
                          text: R2.text,
                          value: R2.value
                        })
                      ]),
                      key: "0"
                    } : void 0,
                    u2.$slots[`${r.type}-overlay`] ? {
                      name: "overlay",
                      fn: withCtx(() => [
                        renderSlot(u2.$slots, `${r.type}-overlay`, normalizeProps(guardReactiveProps(ee.value(r.type))))
                      ]),
                      key: "1"
                    } : void 0,
                    u2.$slots[`${r.type}-overlay-header`] ? {
                      name: "header",
                      fn: withCtx(() => [
                        renderSlot(u2.$slots, `${r.type}-overlay-header`, {
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
          unref(K2)(unref(c2), e2.instance) && u2.vertical ? (openBlock(), createBlock(_t, {
            key: 1,
            "aria-label": (C = unref(l)) == null ? void 0 : C.prevMonth,
            disabled: unref(Y2)(false),
            onActivate: g[2] || (g[2] = (r) => unref(T2)(false))
          }, {
            default: withCtx(() => [
              u2.$slots["arrow-up"] ? renderSlot(u2.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
              u2.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(On), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
          unref(X2)(unref(c2), e2.instance) ? (openBlock(), createBlock(_t, {
            key: 2,
            ref: "rightIcon",
            disabled: unref(Y2)(true),
            "aria-label": (ne = unref(l)) == null ? void 0 : ne.nextMonth,
            onActivate: g[3] || (g[3] = (r) => unref(T2)(true)),
            onSetRef: g[4] || (g[4] = (r) => U(r, u2.disableYearSelect ? 2 : 3))
          }, {
            default: withCtx(() => [
              u2.$slots[u2.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(u2.$slots, u2.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
              u2.$slots[u2.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(u2.vertical ? unref(In) : unref(Rn)), { key: 1 }))
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
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { buildMultiLevelMatrix: o } = rt(), { defaultedTransitions: l, defaultedAriaLabels: c2, defaultedMultiCalendars: h4 } = Ce(t2), y3 = ref(null), D2 = ref({
      bottom: "",
      left: "",
      transform: ""
    }), b2 = ref([]), T2 = ref(null), Y2 = ref(true), q2 = ref(""), K2 = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), X2 = ref([]), k2 = ref({ left: "50%" }), $ = computed(() => t2.calendar ? t2.calendar(t2.mappedDates) : t2.mappedDates), W = computed(() => t2.dayNames ? Array.isArray(t2.dayNames) ? t2.dayNames : t2.dayNames(t2.locale, +t2.weekStart) : Dr(t2.formatLocale, t2.locale, +t2.weekStart));
    onMounted(() => {
      a3("mount", { cmp: "calendar", refs: b2 }), t2.noSwipe || T2.value && (T2.value.addEventListener("touchstart", Q2, { passive: false }), T2.value.addEventListener("touchend", f, { passive: false }), T2.value.addEventListener("touchmove", U, { passive: false })), t2.monthChangeOnScroll && T2.value && T2.value.addEventListener("wheel", u2, { passive: false });
    });
    const V = (s3) => s3 ? t2.vertical ? "vNext" : "next" : t2.vertical ? "vPrevious" : "previous", G2 = (s3, C) => {
      if (t2.transitions) {
        const ne = Le(Je(S3(), t2.month, t2.year));
        q2.value = Ne(Le(Je(S3(), s3, C)), ne) ? l.value[V(true)] : l.value[V(false)], Y2.value = false, nextTick(() => {
          Y2.value = true;
        });
      }
    }, P = computed(
      () => ({
        [t2.calendarClassName]: !!t2.calendarClassName
      })
    ), ee = computed(() => (s3) => {
      const C = $r(s3);
      return {
        dp__marker_dot: C.type === "dot",
        dp__marker_line: C.type === "line"
      };
    }), p = computed(() => (s3) => ye(s3, y3.value)), _ = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: h4.value.count > 0 && t2.instance !== 0
    })), A = computed(() => (s3) => t2.hideOffsetDates ? s3.current : true), H3 = async (s3, C, ne) => {
      var r, L2;
      if (a3("set-hover-date", s3), (L2 = (r = s3.marker) == null ? void 0 : r.tooltip) != null && L2.length) {
        const R2 = Ae(b2.value[C][ne]);
        if (R2) {
          const { width: m3, height: B2 } = R2.getBoundingClientRect();
          y3.value = s3.value;
          let le = { left: `${m3 / 2}px` }, Z = -50;
          if (await nextTick(), X2.value[0]) {
            const { left: ke, width: se } = X2.value[0].getBoundingClientRect();
            ke < 0 && (le = { left: "0" }, Z = 0, k2.value.left = `${m3 / 2}px`), window.innerWidth < ke + se && (le = { right: "0" }, Z = 0, k2.value.left = `${se - m3 / 2}px`);
          }
          D2.value = {
            bottom: `${B2}px`,
            ...le,
            transform: `translateX(${Z}%)`
          }, a3("tooltip-open", s3.marker);
        }
      }
    }, z2 = (s3) => {
      y3.value && (y3.value = null, D2.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a3("tooltip-close", s3.marker));
    }, Q2 = (s3) => {
      K2.value.startX = s3.changedTouches[0].screenX, K2.value.startY = s3.changedTouches[0].screenY;
    }, f = (s3) => {
      K2.value.endX = s3.changedTouches[0].screenX, K2.value.endY = s3.changedTouches[0].screenY, d3();
    }, U = (s3) => {
      t2.vertical && !t2.inline && s3.preventDefault();
    }, d3 = () => {
      const s3 = t2.vertical ? "Y" : "X";
      Math.abs(K2.value[`start${s3}`] - K2.value[`end${s3}`]) > 10 && a3("handle-swipe", K2.value[`start${s3}`] > K2.value[`end${s3}`] ? "right" : "left");
    }, w2 = (s3, C, ne) => {
      s3 && (Array.isArray(b2.value[C]) ? b2.value[C][ne] = s3 : b2.value[C] = [s3]), t2.arrowNavigation && o(b2.value, "calendar");
    }, u2 = (s3) => {
      t2.monthChangeOnScroll && (s3.preventDefault(), a3("handle-scroll", s3));
    }, g = (s3) => {
      const C = s3[0];
      return t2.weekNumbers === "local" ? getWeek(C.value, { weekStartsOn: +t2.weekStart }) : t2.weekNumbers === "iso" ? getISOWeek(C.value) : typeof t2.weekNumbers == "function" ? t2.weekNumbers(C.value) : "";
    };
    return n({ triggerTransition: G2 }), (s3, C) => {
      var ne;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_.value)
      }, [
        createBaseVNode("div", {
          ref_key: "calendarWrapRef",
          ref: T2,
          role: "grid",
          class: normalizeClass(P.value),
          "aria-label": (ne = unref(c2)) == null ? void 0 : ne.calendarWrap
        }, [
          (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createBaseVNode("div", Yl, [
              s3.weekNumbers ? (openBlock(), createElementBlock("div", Bl, toDisplayString(s3.weekNumName), 1)) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(W.value, (r, L2) => (openBlock(), createElementBlock("div", {
                class: "dp__calendar_header_item",
                role: "gridcell",
                key: L2
              }, [
                s3.$slots["calendar-header"] ? renderSlot(s3.$slots, "calendar-header", {
                  key: 0,
                  day: r,
                  index: L2
                }) : createCommentVNode("", true),
                s3.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(r), 1)
                ], 64))
              ]))), 128))
            ]),
            El,
            createVNode(Transition, {
              name: q2.value,
              css: !!s3.transitions
            }, {
              default: withCtx(() => {
                var r;
                return [
                  Y2.value ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "dp__calendar",
                    role: "grid",
                    "aria-label": (r = unref(c2)) == null ? void 0 : r.calendarDays
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList($.value, (L2, R2) => (openBlock(), createElementBlock("div", {
                      class: "dp__calendar_row",
                      role: "row",
                      key: R2
                    }, [
                      s3.weekNumbers ? (openBlock(), createElementBlock("div", Vl, [
                        createBaseVNode("div", Hl, toDisplayString(g(L2.days)), 1)
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(L2.days, (m3, B2) => {
                        var le, Z, ke;
                        return openBlock(), createElementBlock("div", {
                          role: "gridcell",
                          class: "dp__calendar_item",
                          ref_for: true,
                          ref: (se) => w2(se, R2, B2),
                          key: B2 + R2,
                          "aria-selected": m3.classData.dp__active_date || m3.classData.dp__range_start || m3.classData.dp__range_start,
                          "aria-disabled": m3.classData.dp__cell_disabled,
                          "aria-label": (Z = (le = unref(c2)) == null ? void 0 : le.day) == null ? void 0 : Z.call(le, m3),
                          tabindex: "0",
                          onClick: withModifiers((se) => s3.$emit("select-date", m3), ["stop", "prevent"]),
                          onKeydown: [
                            withKeys((se) => s3.$emit("select-date", m3), ["enter"]),
                            withKeys((se) => s3.$emit("handle-space", m3), ["space"])
                          ],
                          onMouseenter: (se) => H3(m3, R2, B2),
                          onMouseleave: (se) => z2(m3)
                        }, [
                          createBaseVNode("div", {
                            class: normalizeClass(["dp__cell_inner", m3.classData])
                          }, [
                            s3.$slots.day && A.value(m3) ? renderSlot(s3.$slots, "day", {
                              key: 0,
                              day: +m3.text,
                              date: m3.value
                            }) : createCommentVNode("", true),
                            s3.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createTextVNode(toDisplayString(m3.text), 1)
                            ], 64)),
                            m3.marker && A.value(m3) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                              s3.$slots.marker ? renderSlot(s3.$slots, "marker", {
                                key: 0,
                                marker: m3.marker,
                                day: +m3.text,
                                date: m3.value
                              }) : (openBlock(), createElementBlock("div", {
                                key: 1,
                                class: normalizeClass(ee.value(m3.marker)),
                                style: normalizeStyle(m3.marker.color ? { backgroundColor: m3.marker.color } : {})
                              }, null, 6))
                            ], 64)) : createCommentVNode("", true),
                            p.value(m3.value) ? (openBlock(), createElementBlock("div", {
                              key: 3,
                              class: "dp__marker_tooltip",
                              ref_for: true,
                              ref_key: "activeTooltip",
                              ref: X2,
                              style: normalizeStyle(D2.value)
                            }, [
                              (ke = m3.marker) != null && ke.tooltip ? (openBlock(), createElementBlock("div", {
                                key: 0,
                                class: "dp__tooltip_content",
                                onClick: C[0] || (C[0] = withModifiers(() => {
                                }, ["stop"]))
                              }, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(m3.marker.tooltip, (se, N) => (openBlock(), createElementBlock("div", {
                                  key: N,
                                  class: "dp__tooltip_text"
                                }, [
                                  s3.$slots["marker-tooltip"] ? renderSlot(s3.$slots, "marker-tooltip", {
                                    key: 0,
                                    tooltip: se,
                                    day: m3.value
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
                                  style: normalizeStyle(k2.value)
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
var oa = (e2) => Array.isArray(e2);
var Wl = (e2, n, a3, t2) => {
  const o = ref([]), { modelValue: l, calendars: c2, time: h4 } = Zt(e2, n), { defaultedMultiCalendars: y3, defaultedStartTime: D2 } = Ce(e2), { validateMonthYearInRange: b2, isDisabled: T2, isDateRangeAllowed: Y2, checkMinMaxRange: q2 } = Bt(e2), { updateTimeValues: K2, getSetDateTime: X2, setTime: k2, assignStartTime: $, disabledTimesConfig: W } = Ra(
    e2,
    h4,
    l,
    t2
  ), V = computed(
    () => (i2) => c2.value[i2] ? c2.value[i2].month : 0
  ), G2 = computed(
    () => (i2) => c2.value[i2] ? c2.value[i2].year : 0
  ), P = (i2, E2, ae) => {
    var me, we;
    c2.value[i2] || (c2.value[i2] = { month: 0, year: 0 }), c2.value[i2].month = ea(E2) ? (me = c2.value[i2]) == null ? void 0 : me.month : E2, c2.value[i2].year = ea(ae) ? (we = c2.value[i2]) == null ? void 0 : we.year : ae;
  }, ee = () => {
    e2.autoApply && n("select-date");
  };
  watch(l, (i2, E2) => {
    JSON.stringify(i2) !== JSON.stringify(E2) && A();
  }), onMounted(() => {
    e2.shadow || (l.value || (s3(), D2.value && $(D2.value)), A(true), e2.focusStartDate && e2.startDate && s3());
  });
  const p = computed(() => {
    var i2;
    return (i2 = e2.flow) != null && i2.length && !e2.partialFlow ? e2.flowStep === e2.flow.length : true;
  }), _ = () => {
    e2.autoApply && p.value && n("auto-apply", e2.partialFlow);
  }, A = (i2 = false) => {
    if (l.value)
      return Array.isArray(l.value) ? (o.value = l.value, d3(i2)) : z2(l.value, i2);
    if (y3.value.count && i2 && !e2.startDate)
      return H3(S3(), i2);
  }, H3 = (i2, E2 = false) => {
    if ((!y3.value.count || !y3.value.static || E2) && P(0, getMonth(i2), getYear(i2)), y3.value.count)
      for (let ae = 1; ae < y3.value.count; ae++) {
        const me = set(S3(), { month: V.value(ae - 1), year: G2.value(ae - 1) }), we = add(me, { months: 1 });
        c2.value[ae] = { month: getMonth(we), year: getYear(we) };
      }
  }, z2 = (i2, E2) => {
    H3(i2), k2("hours", getHours(i2)), k2("minutes", getMinutes(i2)), k2("seconds", getSeconds(i2)), y3.value.count && E2 && g();
  }, Q2 = (i2) => y3.value.count ? Math.abs(differenceInMonths(i2[0], i2[1])) >= y3.value.count ? 1 : 0 : 1, f = (i2, E2) => {
    i2[1] && e2.showLastInRange ? H3(i2[Q2(i2)], E2) : H3(i2[0], E2);
    const ae = (me, we) => [
      me(i2[0]),
      i2[1] ? me(i2[1]) : h4[we][1]
    ];
    k2("hours", ae(getHours, "hours")), k2("minutes", ae(getMinutes, "minutes")), k2("seconds", ae(getSeconds, "seconds"));
  }, U = (i2, E2) => {
    if ((e2.range || e2.weekPicker) && !e2.multiDates)
      return f(i2, E2);
    if (e2.multiDates) {
      const ae = i2[i2.length - 1];
      return z2(ae, E2);
    }
  }, d3 = (i2) => {
    const E2 = l.value;
    U(E2, i2), y3.value.count && y3.value.solo && g();
  }, w2 = (i2, E2) => {
    const ae = set(S3(), { month: V.value(E2), year: G2.value(E2) }), me = i2 < 0 ? addMonths(ae, 1) : subMonths(ae, 1);
    b2(getMonth(me), getYear(me), i2 < 0, e2.preventMinMaxNavigation) && (P(E2, getMonth(me), getYear(me)), y3.value.count && !y3.value.solo && u2(E2), a3());
  }, u2 = (i2) => {
    for (let E2 = i2 - 1; E2 >= 0; E2--) {
      const ae = subMonths(set(S3(), { month: V.value(E2 + 1), year: G2.value(E2 + 1) }), 1);
      P(E2, getMonth(ae), getYear(ae));
    }
    for (let E2 = i2 + 1; E2 <= y3.value.count - 1; E2++) {
      const ae = addMonths(set(S3(), { month: V.value(E2 - 1), year: G2.value(E2 - 1) }), 1);
      P(E2, getMonth(ae), getYear(ae));
    }
  }, g = () => {
    if (Array.isArray(l.value) && l.value.length === 2) {
      const i2 = S3(
        S3(l.value[1] ? l.value[1] : addMonths(l.value[0], 1))
      ), [E2, ae] = [getMonth(l.value[0]), getYear(l.value[0])], [me, we] = [getMonth(l.value[1]), getYear(l.value[1])];
      (E2 !== me || E2 === me && ae !== we) && y3.value.solo && P(1, getMonth(i2), getYear(i2));
    } else
      l.value && !Array.isArray(l.value) && (P(0, getMonth(l.value), getYear(l.value)), H3(S3()));
  }, s3 = () => {
    e2.startDate && (P(0, getMonth(S3(e2.startDate)), getYear(S3(e2.startDate))), y3.value.count && u2(0));
  }, C = (i2, E2) => {
    e2.monthChangeOnScroll && w2(e2.monthChangeOnScroll !== "inverse" ? -i2.deltaY : i2.deltaY, E2);
  }, ne = (i2, E2, ae = false) => {
    e2.monthChangeOnArrows && e2.vertical === ae && r(i2, E2);
  }, r = (i2, E2) => {
    w2(i2 === "right" ? -1 : 1, E2);
  }, L2 = (i2) => e2.markers.find((E2) => ye(na(i2.value), na(E2.date))), R2 = (i2, E2) => {
    switch (e2.sixWeeks === true ? "append" : e2.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [i2 == 0, true];
      case "fair":
        return [i2 == 0 || E2 > i2, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, m3 = (i2, E2, ae, me) => {
    if (e2.sixWeeks && i2.length < 6) {
      const we = 6 - i2.length, Qe = (E2.getDay() + 7 - me) % 7, Ft = 6 - (ae.getDay() + 7 - me) % 7, [Tt, rn] = R2(Qe, Ft);
      for (let lt = 1; lt <= we; lt++)
        if (rn ? !!(lt % 2) == Tt : Tt) {
          const Vt = i2[0].days[0], ln = B2(addDays(Vt.value, -7), getMonth(E2));
          i2.unshift({ days: ln });
        } else {
          const Vt = i2[i2.length - 1], ln = Vt.days[Vt.days.length - 1], Oa = B2(addDays(ln.value, 1), getMonth(E2));
          i2.push({ days: Oa });
        }
    }
    return i2;
  }, B2 = (i2, E2) => {
    const ae = S3(JSON.parse(JSON.stringify(i2))), me = [];
    for (let we = 0; we < 7; we++) {
      const Qe = addDays(ae, we), $t = getMonth(Qe) !== E2;
      me.push({
        text: e2.hideOffsetDates && $t ? "" : Qe.getDate(),
        value: Qe,
        current: !$t,
        classData: {}
      });
    }
    return me;
  }, le = (i2, E2) => {
    const ae = [], me = S3(Ze(new Date(E2, i2), e2.timezone)), we = S3(Ze(new Date(E2, i2 + 1, 0), e2.timezone)), Qe = e2.weekStart, $t = startOfWeek(me, { weekStartsOn: Qe }), Ft = (Tt) => {
      const rn = B2(Tt, i2);
      if (ae.push({ days: rn }), !ae[ae.length - 1].days.some(
        (lt) => ye(Le(lt.value), Le(we))
      )) {
        const lt = addDays(Tt, 7);
        Ft(lt);
      }
    };
    return Ft($t), m3(ae, me, we, Qe);
  }, Z = (i2) => (l.value = jt(S3(i2.value), e2.timezone, e2.weekStart), _()), ke = (i2) => {
    const E2 = tt(S3(i2.value), h4.hours, h4.minutes, Et());
    e2.multiDates ? Ln(E2, l, e2.multiDatesLimit) : l.value = E2, t2(), nextTick().then(() => {
      _();
    });
  }, se = (i2) => e2.noDisabledRange ? $a(o.value[0], i2).some((ae) => T2(ae)) : false, N = () => {
    o.value = l.value ? l.value.slice() : [], o.value.length === 2 && !(e2.fixedStart || e2.fixedEnd) && (o.value = []);
  }, x2 = (i2, E2) => {
    const ae = [S3(i2.value), addDays(S3(i2.value), +e2.autoRange)];
    Y2(ae) && (E2 && $e(i2.value), o.value = ae);
  }, $e = (i2) => {
    const E2 = getMonth(S3(i2)), ae = getYear(S3(i2));
    if (P(0, E2, ae), y3.value.count > 0)
      for (let me = 1; me < y3.value.count; me++) {
        const we = Cr(
          set(S3(i2), { year: V.value(me - 1), month: G2.value(me - 1) })
        );
        P(me, we.month, we.year);
      }
  }, J = (i2) => Array.isArray(l.value) && l.value.length === 2 ? e2.fixedStart && (Ne(i2, l.value[0]) || ye(i2, l.value[0])) ? [l.value[0], i2] : e2.fixedEnd && (Pe(i2, l.value[1]) || ye(i2, l.value[1])) ? [i2, l.value[1]] : (n("invalid-fixed-range", i2), l.value) : [], Ve = (i2) => {
    se(i2.value) || !q2(i2.value, l.value, e2.fixedStart ? 0 : 1) || (o.value = J(S3(i2.value)));
  }, _e = (i2, E2) => {
    if (N(), e2.autoRange)
      return x2(i2, E2);
    if (e2.fixedStart || e2.fixedEnd)
      return Ve(i2);
    o.value[0] ? q2(S3(i2.value), l.value) && !se(i2.value) && (Pe(S3(i2.value), S3(o.value[0])) ? (o.value.unshift(S3(i2.value)), n("range-end", o.value[0])) : (o.value[1] = S3(i2.value), n("range-end", o.value[1]))) : (o.value[0] = S3(i2.value), n("range-start", o.value[0]));
  }, Et = (i2 = true) => e2.enableSeconds ? Array.isArray(h4.seconds) ? i2 ? h4.seconds[0] : h4.seconds[1] : h4.seconds : 0, Mt = (i2) => {
    o.value[i2] = tt(
      o.value[i2],
      h4.hours[i2],
      h4.minutes[i2],
      Et(i2 !== 1)
    );
  }, Jt = () => {
    var i2, E2;
    o.value[0] && o.value[1] && +((i2 = o.value) == null ? void 0 : i2[0]) > +((E2 = o.value) == null ? void 0 : E2[1]) && (o.value.reverse(), n("range-start", o.value[0]), n("range-end", o.value[1]));
  }, Xt = () => {
    o.value.length && (o.value[0] && !o.value[1] ? Mt(0) : (Mt(0), Mt(1), t2()), Jt(), l.value = o.value.slice(), o.value[0] && o.value[1] && e2.autoApply && n("auto-apply"), o.value[0] && !o.value[1] && e2.modelAuto && e2.autoApply && n("auto-apply"));
  }, Qt = (i2, E2 = false) => {
    if (!(T2(i2.value) || !i2.current && e2.hideOffsetDates)) {
      if (e2.weekPicker)
        return Z(i2);
      if (!e2.range)
        return ke(i2);
      oa(h4.hours) && oa(h4.minutes) && !e2.multiDates && (_e(i2, E2), Xt());
    }
  }, en = (i2, E2) => {
    P(i2, E2.month, E2.year), y3.value.count && !y3.value.solo && u2(i2), a3(y3.value.solo ? i2 : void 0), t2();
  }, tn = (i2, E2) => {
    Array.isArray(i2) && i2.length <= 2 && e2.range ? l.value = i2.map((ae) => Ze(S3(ae), E2 ? void 0 : e2.timezone)) : Array.isArray(i2) || (l.value = Ze(S3(i2), E2 ? void 0 : e2.timezone)), ee(), e2.multiCalendars && nextTick().then(() => A(true));
  }, nn = () => {
    e2.range ? l.value && Array.isArray(l.value) && l.value[0] ? l.value = Pe(S3(), l.value[0]) ? [S3(), l.value[0]] : [l.value[0], S3()] : l.value = [S3()] : l.value = S3(), ee();
  }, an = () => {
    if (Array.isArray(l.value))
      if (e2.multiDates) {
        const i2 = re();
        l.value[l.value.length - 1] = X2(i2);
      } else
        l.value = l.value.map((i2, E2) => i2 && X2(i2, E2));
    else
      l.value = X2(l.value);
    n("time-update");
  }, re = () => Array.isArray(l.value) && l.value.length ? l.value[l.value.length - 1] : null;
  return {
    calendars: c2,
    modelValue: l,
    month: V,
    year: G2,
    time: h4,
    disabledTimesConfig: W,
    getCalendarDays: le,
    getMarker: L2,
    handleScroll: C,
    handleSwipe: r,
    handleArrow: ne,
    selectDate: Qt,
    updateMonthYear: en,
    presetDate: tn,
    selectCurrentDate: nn,
    updateTime: (i2, E2 = true, ae = false) => {
      K2(i2, E2, ae, an);
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
    "recalculate-position"
  ],
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, {
      calendars: o,
      month: l,
      year: c2,
      modelValue: h4,
      time: y3,
      disabledTimesConfig: D2,
      getCalendarDays: b2,
      getMarker: T2,
      handleArrow: Y2,
      handleScroll: q2,
      handleSwipe: K2,
      selectDate: X2,
      updateMonthYear: k2,
      presetDate: $,
      selectCurrentDate: W,
      updateTime: V
    } = Wl(t2, a3, u2, g), G2 = useSlots(), { setHoverDate: P, getDayClassData: ee, clearHoverDate: p } = Zr(h4, t2), { defaultedMultiCalendars: _ } = Ce(t2), A = ref([]), H3 = ref([]), z2 = ref(null), Q2 = je(G2, "calendar"), f = je(G2, "monthYear"), U = je(G2, "timePicker"), d3 = (R2) => {
      t2.shadow || a3("mount", R2);
    };
    watch(
      o,
      () => {
        t2.shadow || setTimeout(() => {
          a3("recalculate-position");
        }, 0);
      },
      { deep: true }
    );
    const w2 = computed(() => (R2) => b2(l.value(R2), c2.value(R2)).map((m3) => ({
      ...m3,
      days: m3.days.map((B2) => (B2.marker = T2(B2), B2.classData = ee(B2), B2))
    })));
    function u2(R2) {
      var m3;
      R2 || R2 === 0 ? (m3 = H3.value[R2]) == null || m3.triggerTransition(l.value(R2), c2.value(R2)) : H3.value.forEach((B2, le) => B2.triggerTransition(l.value(le), c2.value(le)));
    }
    function g() {
      a3("update-flow-step");
    }
    const s3 = (R2, m3 = false) => {
      X2(R2, m3), t2.spaceConfirm && a3("select-date");
    };
    return n({
      clearHoverDate: p,
      presetDate: $,
      selectCurrentDate: W,
      toggleMonthPicker: (R2, m3, B2 = 0) => {
        var le;
        (le = A.value[B2]) == null || le.toggleMonthPicker(R2, m3);
      },
      toggleYearPicker: (R2, m3, B2 = 0) => {
        var le;
        (le = A.value[B2]) == null || le.toggleYearPicker(R2, m3);
      },
      toggleTimePicker: (R2, m3, B2) => {
        var le;
        (le = z2.value) == null || le.toggleTimePicker(R2, m3, B2);
      },
      handleArrow: Y2,
      updateMonthYear: k2,
      getSidebarProps: () => ({
        modelValue: h4,
        month: l,
        year: c2,
        time: y3,
        updateTime: V,
        updateMonthYear: k2,
        selectDate: X2,
        presetDate: $
      })
    }), (R2, m3) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(Hn, {
        "multi-calendars": unref(_).count
      }, {
        default: withCtx(({ instance: B2, index: le }) => [
          R2.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(Ol, mergeProps({
            key: 0,
            ref: (Z) => {
              Z && (A.value[le] = Z);
            },
            months: unref(ka)(R2.formatLocale, R2.locale, R2.monthNameFormat),
            years: unref(Fn)(R2.yearRange, R2.reverseYears),
            month: unref(l)(B2),
            year: unref(c2)(B2),
            instance: B2
          }, R2.$props, {
            onMount: m3[0] || (m3[0] = (Z) => d3(unref(vt).header)),
            onResetFlow: m3[1] || (m3[1] = (Z) => R2.$emit("reset-flow")),
            onUpdateMonthYear: (Z) => unref(k2)(B2, Z),
            onOverlayClosed: m3[2] || (m3[2] = (Z) => R2.$emit("focus-menu"))
          }), createSlots({ _: 2 }, [
            renderList(unref(f), (Z, ke) => ({
              name: Z,
              fn: withCtx((se) => [
                renderSlot(R2.$slots, Z, normalizeProps(guardReactiveProps(se)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(Ul, mergeProps({
            ref: (Z) => {
              Z && (H3.value[le] = Z);
            },
            "mapped-dates": w2.value(B2),
            month: unref(l)(B2),
            year: unref(c2)(B2)
          }, R2.$props, {
            onSelectDate: (Z) => unref(X2)(Z, B2 !== 1),
            onHandleSpace: (Z) => s3(Z, B2 !== 1),
            onSetHoverDate: m3[3] || (m3[3] = (Z) => unref(P)(Z)),
            onHandleScroll: (Z) => unref(q2)(Z, B2),
            onHandleSwipe: (Z) => unref(K2)(Z, B2),
            onMount: m3[4] || (m3[4] = (Z) => d3(unref(vt).calendar)),
            onResetFlow: m3[5] || (m3[5] = (Z) => R2.$emit("reset-flow")),
            onTooltipOpen: m3[6] || (m3[6] = (Z) => R2.$emit("tooltip-open", Z)),
            onTooltipClose: m3[7] || (m3[7] = (Z) => R2.$emit("tooltip-close", Z))
          }), createSlots({ _: 2 }, [
            renderList(unref(Q2), (Z, ke) => ({
              name: Z,
              fn: withCtx((se) => [
                renderSlot(R2.$slots, Z, normalizeProps(guardReactiveProps({ ...se })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars"]),
      R2.enableTimePicker ? (openBlock(), createElementBlock("div", zl, [
        R2.$slots["time-picker"] ? renderSlot(R2.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(y3), updateTime: unref(V) }))) : (openBlock(), createBlock(Ca, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: z2
        }, R2.$props, {
          hours: unref(y3).hours,
          minutes: unref(y3).minutes,
          seconds: unref(y3).seconds,
          "internal-model-value": R2.internalModelValue,
          "disabled-times-config": unref(D2),
          onMount: m3[8] || (m3[8] = (B2) => d3(unref(vt).timePicker)),
          "onUpdate:hours": m3[9] || (m3[9] = (B2) => unref(V)(B2)),
          "onUpdate:minutes": m3[10] || (m3[10] = (B2) => unref(V)(B2, false)),
          "onUpdate:seconds": m3[11] || (m3[11] = (B2) => unref(V)(B2, false, true)),
          onResetFlow: m3[12] || (m3[12] = (B2) => R2.$emit("reset-flow")),
          onOverlayClosed: m3[13] || (m3[13] = (B2) => R2.$emit("time-picker-close")),
          onOverlayOpened: m3[14] || (m3[14] = (B2) => R2.$emit("time-picker-open", B2)),
          onAmPmChange: m3[15] || (m3[15] = (B2) => R2.$emit("am-pm-change", B2))
        }), createSlots({ _: 2 }, [
          renderList(unref(U), (B2, le) => ({
            name: B2,
            fn: withCtx((Z) => [
              renderSlot(R2.$slots, B2, normalizeProps(guardReactiveProps(Z)))
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
var sa = defineComponent({
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
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, o = computed(() => {
      const { openOnTop: N, ...x2 } = t2;
      return {
        ...x2,
        flowStep: ee.value
      };
    }), { setMenuFocused: l, setShiftKey: c2, control: h4 } = Sa(), y3 = useSlots(), { defaultedTextInput: D2, defaultedInline: b2 } = Ce(t2), T2 = ref(null), Y2 = ref(0), q2 = ref(null), K2 = ref(null), X2 = ref(false), k2 = ref(null);
    onMounted(() => {
      if (!t2.shadow) {
        X2.value = true, $(), window.addEventListener("resize", $);
        const N = Ae(q2);
        if (N && !D2.value.enabled && !b2.value.enabled && (l(true), z2()), N) {
          const x2 = ($e) => {
            t2.allowPreventDefault && $e.preventDefault(), $e.stopImmediatePropagation(), $e.stopPropagation();
          };
          N.addEventListener("pointerdown", x2), N.addEventListener("mousedown", x2);
        }
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", $);
    });
    const $ = () => {
      const N = Ae(K2);
      N && (Y2.value = N.getBoundingClientRect().width);
    }, { arrowRight: W, arrowLeft: V, arrowDown: G2, arrowUp: P } = rt(), { flowStep: ee, updateFlowStep: p, childMount: _, resetFlow: A } = qr(t2, a3, k2), H3 = computed(() => t2.monthPicker ? fl : t2.yearPicker ? ml : t2.timePicker ? Cl : jl), z2 = () => {
      const N = Ae(q2);
      N && N.focus({ preventScroll: true });
    }, Q2 = () => computed(() => {
      var N;
      return (N = k2.value) == null ? void 0 : N.getSidebarProps();
    }), f = () => {
      t2.openOnTop && a3("recalculate-position");
    }, U = je(y3, "action"), d3 = computed(() => t2.monthPicker || t2.yearPicker ? je(y3, "monthYear") : t2.timePicker ? je(y3, "timePicker") : je(y3, "shared")), w2 = computed(() => t2.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), u2 = computed(() => ({
      dp__menu_disabled: t2.disabled,
      dp__menu_readonly: t2.readonly
    })), g = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !b2.value.enabled,
        dp__relative: b2.value.enabled,
        [t2.menuClassName]: !!t2.menuClassName
      })
    ), s3 = (N) => {
      N.stopPropagation(), N.stopImmediatePropagation();
    }, C = () => {
      t2.escClose && a3("close-picker");
    }, ne = (N) => {
      if (t2.arrowNavigation) {
        if (N === "up")
          return P();
        if (N === "down")
          return G2();
        if (N === "left")
          return V();
        if (N === "right")
          return W();
      } else
        N === "left" || N === "up" ? B2("handleArrow", "left", 0, N === "up") : B2("handleArrow", "right", 0, N === "down");
    }, r = (N) => {
      c2(N.shiftKey), !t2.disableMonthYearSelect && N.code === "Tab" && N.target.classList.contains("dp__menu") && h4.value.shiftKeyInMenu && (N.preventDefault(), N.stopImmediatePropagation(), a3("close-picker"));
    }, L2 = () => {
      z2(), a3("time-picker-close");
    }, R2 = (N) => {
      var x2, $e, J;
      (x2 = k2.value) == null || x2.toggleTimePicker(false, false), ($e = k2.value) == null || $e.toggleMonthPicker(false, false, N), (J = k2.value) == null || J.toggleYearPicker(false, false, N);
    }, m3 = (N, x2 = 0) => {
      var $e, J, Ve;
      return N === "month" ? ($e = k2.value) == null ? void 0 : $e.toggleMonthPicker(false, true, x2) : N === "year" ? (J = k2.value) == null ? void 0 : J.toggleYearPicker(false, true, x2) : N === "time" ? (Ve = k2.value) == null ? void 0 : Ve.toggleTimePicker(true, false) : R2(x2);
    }, B2 = (N, ...x2) => {
      var $e, J;
      ($e = k2.value) != null && $e[N] && ((J = k2.value) == null || J[N](...x2));
    }, le = () => {
      B2("selectCurrentDate");
    }, Z = (N, x2) => {
      B2("presetDate", N, x2);
    }, ke = () => {
      B2("clearHoverDate");
    };
    return n({
      updateMonthYear: (N, x2) => {
        B2("updateMonthYear", N, x2);
      },
      switchView: m3
    }), (N, x2) => {
      var $e;
      return openBlock(), createElementBlock("div", {
        id: N.uid ? `dp-menu-${N.uid}` : void 0,
        tabindex: "0",
        ref_key: "dpMenuRef",
        ref: q2,
        role: "dialog",
        class: normalizeClass(g.value),
        onMouseleave: ke,
        onClick: s3,
        onKeydown: [
          withKeys(C, ["esc"]),
          x2[14] || (x2[14] = withKeys(withModifiers((J) => ne("left"), ["prevent"]), ["left"])),
          x2[15] || (x2[15] = withKeys(withModifiers((J) => ne("up"), ["prevent"]), ["up"])),
          x2[16] || (x2[16] = withKeys(withModifiers((J) => ne("down"), ["prevent"]), ["down"])),
          x2[17] || (x2[17] = withKeys(withModifiers((J) => ne("right"), ["prevent"]), ["right"])),
          r
        ]
      }, [
        (N.disabled || N.readonly) && unref(b2).enabled ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(u2.value)
        }, null, 2)) : createCommentVNode("", true),
        !unref(b2).enabled && !N.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(w2.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: K2,
          class: normalizeClass({
            dp__menu_content_wrapper: (($e = N.presetDates) == null ? void 0 : $e.length) || !!N.$slots["left-sidebar"] || !!N.$slots["right-sidebar"]
          }),
          style: normalizeStyle({ "--dp-menu-width": `${Y2.value}px` })
        }, [
          N.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", Gl, [
            renderSlot(N.$slots, "left-sidebar", normalizeProps(guardReactiveProps(Q2())))
          ])) : createCommentVNode("", true),
          N.presetDates.length ? (openBlock(), createElementBlock("div", Zl, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(N.presetDates, (J, Ve) => (openBlock(), createElementBlock("div", {
              key: Ve,
              style: normalizeStyle(J.style || {}),
              class: "dp--preset-range"
            }, [
              J.slot ? renderSlot(N.$slots, J.slot, {
                key: 0,
                presetDate: Z,
                label: J.label,
                value: J.value
              }) : (openBlock(), createElementBlock("div", {
                key: 1,
                role: "button",
                tabindex: "0",
                onClick: (_e) => Z(J.value, J.noTz),
                onKeydown: [
                  withKeys(withModifiers((_e) => Z(J.value, J.noTz), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((_e) => Z(J.value, J.noTz), ["prevent"]), ["space"])
                ]
              }, toDisplayString(J.label), 41, ql))
            ], 4))), 128))
          ])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: "dp__instance_calendar",
            ref_key: "calendarWrapperRef",
            ref: T2,
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(H3.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: k2
            }, o.value, {
              "flow-step": unref(ee),
              onMount: unref(_),
              onUpdateFlowStep: unref(p),
              onResetFlow: unref(A),
              onFocusMenu: z2,
              onSelectDate: x2[0] || (x2[0] = (J) => N.$emit("select-date")),
              onTooltipOpen: x2[1] || (x2[1] = (J) => N.$emit("tooltip-open", J)),
              onTooltipClose: x2[2] || (x2[2] = (J) => N.$emit("tooltip-close", J)),
              onAutoApply: x2[3] || (x2[3] = (J) => N.$emit("auto-apply", J)),
              onRangeStart: x2[4] || (x2[4] = (J) => N.$emit("range-start", J)),
              onRangeEnd: x2[5] || (x2[5] = (J) => N.$emit("range-end", J)),
              onInvalidFixedRange: x2[6] || (x2[6] = (J) => N.$emit("invalid-fixed-range", J)),
              onTimeUpdate: x2[7] || (x2[7] = (J) => N.$emit("time-update")),
              onAmPmChange: x2[8] || (x2[8] = (J) => N.$emit("am-pm-change", J)),
              onTimePickerOpen: x2[9] || (x2[9] = (J) => N.$emit("time-picker-open", J)),
              onTimePickerClose: L2,
              onRecalculatePosition: f,
              "onUpdate:internalModelValue": x2[10] || (x2[10] = (J) => N.$emit("update:internal-model-value", J))
            }), createSlots({ _: 2 }, [
              renderList(d3.value, (J, Ve) => ({
                name: J,
                fn: withCtx((_e) => [
                  renderSlot(N.$slots, J, normalizeProps(guardReactiveProps({ ..._e })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          N.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", xl, [
            renderSlot(N.$slots, "right-sidebar", normalizeProps(guardReactiveProps(Q2())))
          ])) : createCommentVNode("", true),
          N.$slots["action-extra"] ? (openBlock(), createElementBlock("div", Jl, [
            N.$slots["action-extra"] ? renderSlot(N.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: le
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 6),
        !N.autoApply || N.keepActionRow ? (openBlock(), createBlock(al, mergeProps({
          key: 2,
          "menu-mount": X2.value
        }, o.value, {
          "calendar-width": Y2.value,
          onClosePicker: x2[11] || (x2[11] = (J) => N.$emit("close-picker")),
          onSelectDate: x2[12] || (x2[12] = (J) => N.$emit("select-date")),
          onInvalidSelect: x2[13] || (x2[13] = (J) => N.$emit("invalid-select")),
          onSelectNow: le
        }), createSlots({ _: 2 }, [
          renderList(unref(U), (J, Ve) => ({
            name: J,
            fn: withCtx((_e) => [
              renderSlot(N.$slots, J, normalizeProps(guardReactiveProps({ ..._e })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
      ], 42, Kl);
    };
  }
});
var Xl = typeof window < "u" ? window : void 0;
var hn = () => {
};
var Ql = (e2) => getCurrentScope() ? (onScopeDispose(e2), true) : false;
var eo = (e2, n, a3, t2) => {
  if (!e2)
    return hn;
  let o = hn;
  const l = watch(
    () => unref(e2),
    (h4) => {
      o(), h4 && (h4.addEventListener(n, a3, t2), o = () => {
        h4.removeEventListener(n, a3, t2), o = hn;
      });
    },
    { immediate: true, flush: "post" }
  ), c2 = () => {
    l(), o();
  };
  return Ql(c2), c2;
};
var to = (e2, n, a3, t2 = {}) => {
  const { window: o = Xl, event: l = "pointerdown" } = t2;
  return o ? eo(o, l, (h4) => {
    const y3 = Ae(e2), D2 = Ae(n);
    !y3 || !D2 || y3 === h4.target || h4.composedPath().includes(y3) || h4.composedPath().includes(D2) || a3(h4);
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
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, o = useSlots(), l = ref(false), c2 = toRef(t2, "modelValue"), h4 = toRef(t2, "timezone"), y3 = ref(null), D2 = ref(null), b2 = ref(null), T2 = ref(false), Y2 = ref(null), q2 = reactive({
      disabledDates: null,
      allowedDates: null,
      highlightedDates: null
    }), { setMenuFocused: K2, setShiftKey: X2 } = Sa(), { clearArrowNav: k2 } = rt(), { mapDatesArrToMap: $, validateDate: W, isValidTime: V } = Bt(t2), { defaultedTransitions: G2, defaultedTextInput: P, defaultedInline: ee } = Ce(t2), { menuTransition: p, showTransition: _ } = Yt(G2);
    onMounted(() => {
      s3(t2.modelValue), nextTick().then(() => {
        ee.value.enabled || (d3(Y2.value).addEventListener("scroll", B2), window.addEventListener("resize", le));
      }), ee.value.enabled && (l.value = true), $(q2);
    }), onUnmounted(() => {
      if (!ee.value.enabled) {
        const re = d3(Y2.value);
        re && re.removeEventListener("scroll", B2), window.removeEventListener("resize", le);
      }
    });
    const A = je(o, "all", t2.presetDates), H3 = je(o, "input");
    watch(
      [c2, h4],
      () => {
        s3(c2.value);
      },
      { deep: true }
    );
    const { openOnTop: z2, menuStyle: Q2, xCorrect: f, setMenuPosition: U, getScrollableParent: d3, shadowRender: w2 } = jr(
      y3,
      D2,
      b2,
      Y2,
      ee,
      a3,
      t2
    ), {
      inputValue: u2,
      internalModelValue: g,
      parseExternalModelValue: s3,
      emitModelValue: C,
      formatInputValue: ne,
      checkBeforeEmit: r
    } = Wr(a3, t2, T2), L2 = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: t2.dark,
        dp__theme_light: !t2.dark,
        dp__flex_display: ee.value.enabled,
        dp__flex_display_with_input: ee.value.input
      })
    ), R2 = computed(() => t2.dark ? "dp__theme_dark" : "dp__theme_light"), m3 = computed(() => t2.teleport ? {
      to: typeof t2.teleport == "boolean" ? "body" : t2.teleport,
      disabled: ee.value.enabled
    } : { class: "dp__outer_menu_wrap" }), B2 = () => {
      l.value && (t2.closeOnScroll ? _e() : U());
    }, le = () => {
      l.value && U();
    }, Z = () => {
      !t2.disabled && !t2.readonly && (w2(sa, t2), U(false), l.value = true, l.value && a3("open"), l.value || Ve(), s3(t2.modelValue));
    }, ke = () => {
      u2.value = "", Ve(), a3("update:model-value", null), a3("update:model-timezone-value", null), a3("cleared"), t2.closeOnClearValue && _e();
    }, se = () => {
      const re = g.value;
      return !re || !Array.isArray(re) && W(re) ? true : Array.isArray(re) ? re.length === 2 && W(re[0]) && W(re[1]) ? true : t2.partialRange && !t2.timePicker ? W(re[0]) : false : false;
    }, N = () => {
      r() && se() ? (C(), _e()) : a3("invalid-select", g.value);
    }, x2 = (re) => {
      $e(), C(), t2.closeOnAutoApply && !re && _e();
    }, $e = () => {
      b2.value && P.value.enabled && b2.value.setParsedDate(g.value);
    }, J = (re = false) => {
      t2.autoApply && V(g.value) && se() && (t2.range && Array.isArray(g.value) ? (t2.partialRange || g.value.length === 2) && x2(re) : x2(re));
    }, Ve = () => {
      P.value.enabled || (g.value = null);
    }, _e = () => {
      ee.value.enabled || (l.value && (l.value = false, f.value = false, K2(false), X2(false), k2(), a3("closed"), u2.value && s3(c2.value)), Ve(), a3("blur"));
    }, Et = (re, ie) => {
      if (!re) {
        g.value = null;
        return;
      }
      g.value = re, ie && (N(), a3("text-submit"));
    }, Mt = () => {
      t2.autoApply && V(g.value) && C(), $e();
    }, Jt = () => l.value ? _e() : Z(), Xt = (re) => {
      g.value = re;
    }, Qt = () => {
      P.value.enabled && (T2.value = true, ne()), a3("focus");
    }, en = () => {
      P.value.enabled && (T2.value = false, s3(t2.modelValue)), a3("blur");
    }, tn = (re) => {
      D2.value && D2.value.updateMonthYear(0, {
        month: Qn(re.month),
        year: Qn(re.year)
      });
    }, nn = (re) => {
      s3(re ?? t2.modelValue);
    }, an = (re, ie) => {
      var i2;
      (i2 = D2.value) == null || i2.switchView(re, ie);
    };
    return to(
      y3,
      b2,
      t2.onClickOutside ? () => t2.onClickOutside(se) : _e
    ), n({
      closeMenu: _e,
      selectDate: N,
      clearValue: ke,
      openMenu: Z,
      onScroll: B2,
      formatInputValue: ne,
      // exposed for testing purposes
      updateInternalModelValue: Xt,
      // modify internal modelValue
      setMonthYear: tn,
      parseModel: nn,
      switchView: an
    }), (re, ie) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(L2.value),
      ref_key: "pickerWrapperRef",
      ref: Y2
    }, [
      createVNode(Qr, mergeProps({
        ref_key: "inputRef",
        ref: b2,
        "is-menu-open": l.value,
        "input-value": unref(u2),
        "onUpdate:inputValue": ie[0] || (ie[0] = (i2) => isRef(u2) ? u2.value = i2 : null)
      }, re.$props, {
        onClear: ke,
        onOpen: Z,
        onSetInputDate: Et,
        onSetEmptyDate: unref(C),
        onSelectDate: N,
        onToggle: Jt,
        onClose: _e,
        onFocus: Qt,
        onBlur: en,
        onRealBlur: ie[1] || (ie[1] = (i2) => T2.value = false)
      }), createSlots({ _: 2 }, [
        renderList(unref(H3), (i2, E2) => ({
          name: i2,
          fn: withCtx((ae) => [
            renderSlot(re.$slots, i2, normalizeProps(guardReactiveProps(ae)))
          ])
        }))
      ]), 1040, ["is-menu-open", "input-value", "onSetEmptyDate"]),
      createVNode(Transition, {
        name: unref(p)(unref(z2)),
        css: unref(_) && !unref(ee).enabled
      }, {
        default: withCtx(() => [
          l.value ? (openBlock(), createBlock(resolveDynamicComponent(re.teleport ? Teleport : "div"), mergeProps({
            key: 0,
            ref_key: "dpWrapMenuRef",
            ref: y3
          }, m3.value, {
            class: { "dp--menu-wrapper": !unref(ee).enabled },
            style: unref(ee).enabled ? void 0 : unref(Q2)
          }), {
            default: withCtx(() => [
              createVNode(sa, mergeProps({
                ref_key: "dpMenuRef",
                ref: D2,
                class: { [R2.value]: true, "dp--menu-wrapper": re.teleport },
                style: re.teleport ? unref(Q2) : void 0,
                "open-on-top": unref(z2),
                "arr-map-values": q2
              }, re.$props, {
                "internal-model-value": unref(g),
                "onUpdate:internalModelValue": ie[2] || (ie[2] = (i2) => isRef(g) ? g.value = i2 : null),
                onClosePicker: _e,
                onSelectDate: N,
                onAutoApply: J,
                onTimeUpdate: Mt,
                onFlowStep: ie[3] || (ie[3] = (i2) => re.$emit("flow-step", i2)),
                onUpdateMonthYear: ie[4] || (ie[4] = (i2) => re.$emit("update-month-year", i2)),
                onInvalidSelect: ie[5] || (ie[5] = (i2) => re.$emit("invalid-select", unref(g))),
                onInvalidFixedRange: ie[6] || (ie[6] = (i2) => re.$emit("invalid-fixed-range", i2)),
                onRecalculatePosition: unref(U),
                onTooltipOpen: ie[7] || (ie[7] = (i2) => re.$emit("tooltip-open", i2)),
                onTooltipClose: ie[8] || (ie[8] = (i2) => re.$emit("tooltip-close", i2)),
                onTimePickerOpen: ie[9] || (ie[9] = (i2) => re.$emit("time-picker-open", i2)),
                onTimePickerClose: ie[10] || (ie[10] = (i2) => re.$emit("time-picker-close", i2)),
                onAmPmChange: ie[11] || (ie[11] = (i2) => re.$emit("am-pm-change", i2)),
                onRangeStart: ie[12] || (ie[12] = (i2) => re.$emit("range-start", i2)),
                onRangeEnd: ie[13] || (ie[13] = (i2) => re.$emit("range-end", i2))
              }), createSlots({ _: 2 }, [
                renderList(unref(A), (i2, E2) => ({
                  name: i2,
                  fn: withCtx((ae) => [
                    renderSlot(re.$slots, i2, normalizeProps(guardReactiveProps({ ...ae })))
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
var Na = (() => {
  const e2 = no;
  return e2.install = (n) => {
    n.component("Vue3DatePicker", e2);
  }, e2;
})();
var ao = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Na
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(ao).forEach(([e2, n]) => {
  e2 !== "default" && (Na[e2] = n);
});
export {
  Na as default
};
//# sourceMappingURL=@vuepic_vue-datepicker.js.map
