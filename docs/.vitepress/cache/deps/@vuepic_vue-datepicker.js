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
} from "./chunk-7D4OYBNS.js";
import "./chunk-LQ2VYIYD.js";

// node_modules/.pnpm/@babel+runtime@7.23.6/node_modules/@babel/runtime/helpers/esm/typeof.js
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

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/addQuarters/index.js
function addQuarters(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  var months = amount * 3;
  return addMonths(dirtyDate, months);
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

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getQuarter/index.js
function getQuarter(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var quarter = Math.floor(date.getMonth() / 3) + 1;
  return quarter;
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

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/startOfQuarter/index.js
function startOfQuarter(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3;
  date.setMonth(month, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/eachQuarterOfInterval/index.js
function eachQuarterOfInterval(dirtyInterval) {
  requiredArgs(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = toDate(interval.start);
  var endDate = toDate(interval.end);
  var endTime = endDate.getTime();
  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError("Invalid interval");
  }
  var startDateQuarter = startOfQuarter(startDate);
  var endDateQuarter = startOfQuarter(endDate);
  endTime = endDateQuarter.getTime();
  var quarters = [];
  var currentQuarter = startDateQuarter;
  while (currentQuarter.getTime() <= endTime) {
    quarters.push(toDate(currentQuarter));
    currentQuarter = addQuarters(currentQuarter, 1);
  }
  return quarters;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/endOfYear/index.js
function endOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  date.setFullYear(year + 1, 0, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/startOfYear/index.js
function startOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var cleanDate = toDate(dirtyDate);
  var date = /* @__PURE__ */ new Date(0);
  date.setFullYear(cleanDate.getFullYear(), 0, 1);
  date.setHours(0, 0, 0, 0);
  return date;
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

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/endOfQuarter/index.js
function endOfQuarter(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3 + 3;
  date.setMonth(month, 0);
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

// node_modules/.pnpm/@babel+runtime@7.23.6/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++)
    arr2[i2] = arr[i2];
  return arr2;
}

// node_modules/.pnpm/@babel+runtime@7.23.6/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
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

// node_modules/.pnpm/@babel+runtime@7.23.6/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
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

// node_modules/.pnpm/@babel+runtime@7.23.6/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

// node_modules/.pnpm/@babel+runtime@7.23.6/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}

// node_modules/.pnpm/@babel+runtime@7.23.6/node_modules/@babel/runtime/helpers/esm/inherits.js
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

// node_modules/.pnpm/@babel+runtime@7.23.6/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}

// node_modules/.pnpm/@babel+runtime@7.23.6/node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
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

// node_modules/.pnpm/@babel+runtime@7.23.6/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

// node_modules/.pnpm/@babel+runtime@7.23.6/node_modules/@babel/runtime/helpers/esm/createSuper.js
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

// node_modules/.pnpm/@babel+runtime@7.23.6/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// node_modules/.pnpm/@babel+runtime@7.23.6/node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function toPrimitive(t2, r) {
  if ("object" != _typeof(t2) || !t2)
    return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i2 = e2.call(t2, r || "default");
    if ("object" != _typeof(i2))
      return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t2);
}

// node_modules/.pnpm/@babel+runtime@7.23.6/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function toPropertyKey(t2) {
  var i2 = toPrimitive(t2, "string");
  return "symbol" == _typeof(i2) ? i2 : String(i2);
}

// node_modules/.pnpm/@babel+runtime@7.23.6/node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
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

// node_modules/.pnpm/@babel+runtime@7.23.6/node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
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

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/isSameQuarter/index.js
function isSameQuarter(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeftStartOfQuarter = startOfQuarter(dirtyDateLeft);
  var dateRightStartOfQuarter = startOfQuarter(dirtyDateRight);
  return dateLeftStartOfQuarter.getTime() === dateRightStartOfQuarter.getTime();
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

// node_modules/.pnpm/@vuepic+vue-datepicker@7.4.0_vue@3.3.12/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
function Vt() {
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
Vt.compatConfig = {
  MODE: 3
};
function Ta() {
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
Ta.compatConfig = {
  MODE: 3
};
function En() {
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
En.compatConfig = {
  MODE: 3
};
function Fn() {
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
Fn.compatConfig = {
  MODE: 3
};
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
Hn.compatConfig = {
  MODE: 3
};
function Vn() {
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
Vn.compatConfig = {
  MODE: 3
};
function Ln() {
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
Ln.compatConfig = {
  MODE: 3
};
function Un(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
var Aa = { exports: {} };
(function(e2) {
  function t2(r) {
    return r && r.__esModule ? r : {
      default: r
    };
  }
  e2.exports = t2, e2.exports.__esModule = true, e2.exports.default = e2.exports;
})(Aa);
var cr = Aa.exports;
var An = { exports: {} };
(function(e2, t2) {
  Object.defineProperty(t2, "__esModule", {
    value: true
  }), t2.default = r;
  function r(a3) {
    if (a3 === null || a3 === true || a3 === false)
      return NaN;
    var n = Number(a3);
    return isNaN(n) ? n : n < 0 ? Math.ceil(n) : Math.floor(n);
  }
  e2.exports = t2.default;
})(An, An.exports);
var fr = An.exports;
var vr = Un(fr);
var Sn = { exports: {} };
(function(e2, t2) {
  Object.defineProperty(t2, "__esModule", {
    value: true
  }), t2.default = r;
  function r(a3) {
    var n = new Date(Date.UTC(a3.getFullYear(), a3.getMonth(), a3.getDate(), a3.getHours(), a3.getMinutes(), a3.getSeconds(), a3.getMilliseconds()));
    return n.setUTCFullYear(a3.getFullYear()), a3.getTime() - n.getTime();
  }
  e2.exports = t2.default;
})(Sn, Sn.exports);
var mr = Sn.exports;
var ta = Un(mr);
function gr(e2, t2) {
  var r = br(t2);
  return r.formatToParts ? hr(r, e2) : pr(r, e2);
}
var yr = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function hr(e2, t2) {
  try {
    for (var r = e2.formatToParts(t2), a3 = [], n = 0; n < r.length; n++) {
      var o = yr[r[n].type];
      o >= 0 && (a3[o] = parseInt(r[n].value, 10));
    }
    return a3;
  } catch (i2) {
    if (i2 instanceof RangeError)
      return [NaN];
    throw i2;
  }
}
function pr(e2, t2) {
  var r = e2.format(t2).replace(/\u200E/g, ""), a3 = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(r);
  return [a3[3], a3[1], a3[2], a3[4], a3[5], a3[6]];
}
var fn = {};
function br(e2) {
  if (!fn[e2]) {
    var t2 = new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: "America/New_York",
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), r = t2 === "06/25/2014, 00:00:00" || t2 === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
    fn[e2] = r ? new Intl.DateTimeFormat("en-US", {
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
  return fn[e2];
}
function zn(e2, t2, r, a3, n, o, i2) {
  var c2 = /* @__PURE__ */ new Date(0);
  return c2.setUTCFullYear(e2, t2, r), c2.setUTCHours(a3, n, o, i2), c2;
}
var na = 36e5;
var kr = 6e4;
var vn = {
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-]\d{2}):?(\d{2})$/
};
function Wn(e2, t2, r) {
  var a3, n;
  if (e2 === "" || (a3 = vn.timezoneZ.exec(e2), a3))
    return 0;
  var o;
  if (a3 = vn.timezoneHH.exec(e2), a3)
    return o = parseInt(a3[1], 10), aa(o) ? -(o * na) : NaN;
  if (a3 = vn.timezoneHHMM.exec(e2), a3) {
    o = parseInt(a3[1], 10);
    var i2 = parseInt(a3[2], 10);
    return aa(o, i2) ? (n = Math.abs(o) * na + i2 * kr, o > 0 ? -n : n) : NaN;
  }
  if (Mr(e2)) {
    t2 = new Date(t2 || Date.now());
    var c2 = r ? t2 : wr(t2), p = Pn(c2, e2), M3 = r ? p : Dr(t2, p, e2);
    return -M3;
  }
  return NaN;
}
function wr(e2) {
  return zn(
    e2.getFullYear(),
    e2.getMonth(),
    e2.getDate(),
    e2.getHours(),
    e2.getMinutes(),
    e2.getSeconds(),
    e2.getMilliseconds()
  );
}
function Pn(e2, t2) {
  var r = gr(e2, t2), a3 = zn(
    r[0],
    r[1] - 1,
    r[2],
    r[3] % 24,
    r[4],
    r[5],
    0
  ).getTime(), n = e2.getTime(), o = n % 1e3;
  return n -= o >= 0 ? o : 1e3 + o, a3 - n;
}
function Dr(e2, t2, r) {
  var a3 = e2.getTime(), n = a3 - t2, o = Pn(new Date(n), r);
  if (t2 === o)
    return t2;
  n -= o - t2;
  var i2 = Pn(new Date(n), r);
  return o === i2 ? o : Math.max(o, i2);
}
function aa(e2, t2) {
  return -23 <= e2 && e2 <= 23 && (t2 == null || 0 <= t2 && t2 <= 59);
}
var ra = {};
function Mr(e2) {
  if (ra[e2])
    return true;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e2 }), ra[e2] = true, true;
  } catch {
    return false;
  }
}
var Sa = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
var mn = 36e5;
var la = 6e4;
var $r = 2;
var He = {
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
  timeZone: Sa
};
function Cn(e2, t2) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e2 === null)
    return /* @__PURE__ */ new Date(NaN);
  var r = t2 || {}, a3 = r.additionalDigits == null ? $r : vr(r.additionalDigits);
  if (a3 !== 2 && a3 !== 1 && a3 !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e2 instanceof Date || typeof e2 == "object" && Object.prototype.toString.call(e2) === "[object Date]")
    return new Date(e2.getTime());
  if (typeof e2 == "number" || Object.prototype.toString.call(e2) === "[object Number]")
    return new Date(e2);
  if (!(typeof e2 == "string" || Object.prototype.toString.call(e2) === "[object String]"))
    return /* @__PURE__ */ new Date(NaN);
  var n = Tr(e2), o = Ar(n.date, a3), i2 = o.year, c2 = o.restDateString, p = Sr(c2, i2);
  if (isNaN(p))
    return /* @__PURE__ */ new Date(NaN);
  if (p) {
    var M3 = p.getTime(), $ = 0, C;
    if (n.time && ($ = Pr(n.time), isNaN($)))
      return /* @__PURE__ */ new Date(NaN);
    if (n.timeZone || r.timeZone) {
      if (C = Wn(n.timeZone || r.timeZone, new Date(M3 + $)), isNaN(C))
        return /* @__PURE__ */ new Date(NaN);
    } else
      C = ta(new Date(M3 + $)), C = ta(new Date(M3 + $ + C));
    return new Date(M3 + $ + C);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function Tr(e2) {
  var t2 = {}, r = He.dateTimePattern.exec(e2), a3;
  if (r ? (t2.date = r[1], a3 = r[3]) : (r = He.datePattern.exec(e2), r ? (t2.date = r[1], a3 = r[2]) : (t2.date = null, a3 = e2)), a3) {
    var n = He.timeZone.exec(a3);
    n ? (t2.time = a3.replace(n[1], ""), t2.timeZone = n[1].trim()) : t2.time = a3;
  }
  return t2;
}
function Ar(e2, t2) {
  var r = He.YYY[t2], a3 = He.YYYYY[t2], n;
  if (n = He.YYYY.exec(e2) || a3.exec(e2), n) {
    var o = n[1];
    return {
      year: parseInt(o, 10),
      restDateString: e2.slice(o.length)
    };
  }
  if (n = He.YY.exec(e2) || r.exec(e2), n) {
    var i2 = n[1];
    return {
      year: parseInt(i2, 10) * 100,
      restDateString: e2.slice(i2.length)
    };
  }
  return {
    year: null
  };
}
function Sr(e2, t2) {
  if (t2 === null)
    return null;
  var r, a3, n, o;
  if (e2.length === 0)
    return a3 = /* @__PURE__ */ new Date(0), a3.setUTCFullYear(t2), a3;
  if (r = He.MM.exec(e2), r)
    return a3 = /* @__PURE__ */ new Date(0), n = parseInt(r[1], 10) - 1, sa(t2, n) ? (a3.setUTCFullYear(t2, n), a3) : /* @__PURE__ */ new Date(NaN);
  if (r = He.DDD.exec(e2), r) {
    a3 = /* @__PURE__ */ new Date(0);
    var i2 = parseInt(r[1], 10);
    return Rr(t2, i2) ? (a3.setUTCFullYear(t2, 0, i2), a3) : /* @__PURE__ */ new Date(NaN);
  }
  if (r = He.MMDD.exec(e2), r) {
    a3 = /* @__PURE__ */ new Date(0), n = parseInt(r[1], 10) - 1;
    var c2 = parseInt(r[2], 10);
    return sa(t2, n, c2) ? (a3.setUTCFullYear(t2, n, c2), a3) : /* @__PURE__ */ new Date(NaN);
  }
  if (r = He.Www.exec(e2), r)
    return o = parseInt(r[1], 10) - 1, ia(t2, o) ? oa(t2, o) : /* @__PURE__ */ new Date(NaN);
  if (r = He.WwwD.exec(e2), r) {
    o = parseInt(r[1], 10) - 1;
    var p = parseInt(r[2], 10) - 1;
    return ia(t2, o, p) ? oa(t2, o, p) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function Pr(e2) {
  var t2, r, a3;
  if (t2 = He.HH.exec(e2), t2)
    return r = parseFloat(t2[1].replace(",", ".")), gn(r) ? r % 24 * mn : NaN;
  if (t2 = He.HHMM.exec(e2), t2)
    return r = parseInt(t2[1], 10), a3 = parseFloat(t2[2].replace(",", ".")), gn(r, a3) ? r % 24 * mn + a3 * la : NaN;
  if (t2 = He.HHMMSS.exec(e2), t2) {
    r = parseInt(t2[1], 10), a3 = parseInt(t2[2], 10);
    var n = parseFloat(t2[3].replace(",", "."));
    return gn(r, a3, n) ? r % 24 * mn + a3 * la + n * 1e3 : NaN;
  }
  return null;
}
function oa(e2, t2, r) {
  t2 = t2 || 0, r = r || 0;
  var a3 = /* @__PURE__ */ new Date(0);
  a3.setUTCFullYear(e2, 0, 4);
  var n = a3.getUTCDay() || 7, o = t2 * 7 + r + 1 - n;
  return a3.setUTCDate(a3.getUTCDate() + o), a3;
}
var Cr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var _r = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Pa(e2) {
  return e2 % 400 === 0 || e2 % 4 === 0 && e2 % 100 !== 0;
}
function sa(e2, t2, r) {
  if (t2 < 0 || t2 > 11)
    return false;
  if (r != null) {
    if (r < 1)
      return false;
    var a3 = Pa(e2);
    if (a3 && r > _r[t2] || !a3 && r > Cr[t2])
      return false;
  }
  return true;
}
function Rr(e2, t2) {
  if (t2 < 1)
    return false;
  var r = Pa(e2);
  return !(r && t2 > 366 || !r && t2 > 365);
}
function ia(e2, t2, r) {
  return !(t2 < 0 || t2 > 52 || r != null && (r < 0 || r > 6));
}
function gn(e2, t2, r) {
  return !(e2 != null && (e2 < 0 || e2 >= 25) || t2 != null && (t2 < 0 || t2 >= 60) || r != null && (r < 0 || r >= 60));
}
var _n = { exports: {} };
var Rn = { exports: {} };
(function(e2, t2) {
  Object.defineProperty(t2, "__esModule", {
    value: true
  }), t2.default = r;
  function r(a3, n) {
    if (a3 == null)
      throw new TypeError("assign requires that input parameter not be null or undefined");
    for (var o in n)
      Object.prototype.hasOwnProperty.call(n, o) && (a3[o] = n[o]);
    return a3;
  }
  e2.exports = t2.default;
})(Rn, Rn.exports);
var Or = Rn.exports;
(function(e2, t2) {
  var r = cr.default;
  Object.defineProperty(t2, "__esModule", {
    value: true
  }), t2.default = n;
  var a3 = r(Or);
  function n(o) {
    return (0, a3.default)({}, o);
  }
  e2.exports = t2.default;
})(_n, _n.exports);
var Yr = _n.exports;
var Nr = Un(Yr);
function Ir(e2, t2, r) {
  var a3 = Cn(e2, r), n = Wn(t2, a3, true), o = new Date(a3.getTime() - n), i2 = /* @__PURE__ */ new Date(0);
  return i2.setFullYear(o.getUTCFullYear(), o.getUTCMonth(), o.getUTCDate()), i2.setHours(o.getUTCHours(), o.getUTCMinutes(), o.getUTCSeconds(), o.getUTCMilliseconds()), i2;
}
function Br(e2, t2, r) {
  if (typeof e2 == "string" && !e2.match(Sa)) {
    var a3 = Nr(r);
    return a3.timeZone = t2, Cn(e2, a3);
  }
  var n = Cn(e2, r), o = zn(
    n.getFullYear(),
    n.getMonth(),
    n.getDate(),
    n.getHours(),
    n.getMinutes(),
    n.getSeconds(),
    n.getMilliseconds()
  ).getTime(), i2 = Wn(t2, new Date(o));
  return new Date(o + i2);
}
function ua(e2) {
  return (t2) => new Intl.DateTimeFormat(e2, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${t2}T00:00:00+00:00`)).slice(0, 2);
}
function Er(e2) {
  return (t2) => format(/* @__PURE__ */ new Date(`2017-01-0${t2}T00:00:00+00:00`), "EEEEEE", { locale: e2 });
}
var Fr = (e2, t2, r) => {
  const a3 = [1, 2, 3, 4, 5, 6, 7];
  let n;
  if (e2 !== null)
    try {
      n = a3.map(Er(e2));
    } catch {
      n = a3.map(ua(t2));
    }
  else
    n = a3.map(ua(t2));
  const o = n.slice(0, r), i2 = n.slice(r + 1, n.length);
  return [n[r]].concat(...i2).concat(...o);
};
var jn = (e2, t2) => {
  const r = [];
  for (let a3 = +e2[0]; a3 <= +e2[1]; a3++)
    r.push({ value: +a3, text: `${a3}` });
  return t2 ? r.reverse() : r;
};
var Ca = (e2, t2, r) => {
  const a3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((o) => {
    const i2 = o < 10 ? `0${o}` : o;
    return /* @__PURE__ */ new Date(`2017-${i2}-01T00:00:00+00:00`);
  });
  if (e2 !== null)
    try {
      const o = r === "long" ? "MMMM" : "MMM";
      return a3.map((i2, c2) => {
        const p = format(i2, o, { locale: e2 });
        return {
          text: p.charAt(0).toUpperCase() + p.substring(1),
          value: c2
        };
      });
    } catch {
    }
  const n = new Intl.DateTimeFormat(t2, { month: r, timeZone: "UTC" });
  return a3.map((o, i2) => {
    const c2 = n.format(o);
    return {
      text: c2.charAt(0).toUpperCase() + c2.substring(1),
      value: i2
    };
  });
};
var Hr = (e2) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e2];
var _e = (e2) => {
  const t2 = unref(e2);
  return t2 != null && t2.$el ? t2 == null ? void 0 : t2.$el : t2;
};
var Vr = (e2) => Object.assign({ type: "dot" }, e2);
var _a = (e2) => Array.isArray(e2) ? !!e2[0] && !!e2[1] : false;
var en = {
  prop: (e2) => `"${e2}" prop must be enabled!`,
  dateArr: (e2) => `You need to use array as "model-value" binding in order to support "${e2}"`
};
var Ce = (e2) => e2;
var da = (e2) => e2 === 0 ? e2 : !e2 || isNaN(+e2) ? null : +e2;
var ca = (e2) => e2 === null;
var Lr = (e2) => {
  if (e2)
    return [...e2.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var Ur = (e2) => {
  const t2 = [], r = (a3) => a3.filter((n) => n);
  for (let a3 = 0; a3 < e2.length; a3 += 3) {
    const n = [e2[a3], e2[a3 + 1], e2[a3 + 2]];
    t2.push(r(n));
  }
  return t2;
};
var Ft = (e2, t2, r) => {
  const a3 = r ?? r === 0, n = t2 ?? t2 === 0;
  if (!a3 && !n)
    return false;
  const o = +r, i2 = +t2;
  return a3 && n ? +e2 > o || +e2 < i2 : a3 ? +e2 > o : n ? +e2 < i2 : false;
};
var Ct = (e2, t2) => Ur(e2).map((r) => r.map((a3) => {
  const { active: n, disabled: o, isBetween: i2, highlighted: c2 } = t2(a3);
  return {
    ...a3,
    active: n,
    disabled: o,
    className: {
      dp__overlay_cell_active: n,
      dp__overlay_cell: !n,
      dp__overlay_cell_disabled: o,
      dp__overlay_cell_pad: true,
      dp__overlay_cell_active_disabled: o && n,
      dp__cell_in_between: i2,
      "dp--highlighted": c2
    }
  };
}));
var ft = (e2, t2, r = false) => {
  e2 && t2.allowStopPropagation && (r && e2.stopImmediatePropagation(), e2.stopPropagation());
};
var zr = () => [
  "a[href]",
  "area[href]",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[data-datepicker-instance]"
].join(", ");
function Wr(e2, t2) {
  let r = [...document.querySelectorAll(zr())];
  r = r.filter((n) => !e2.contains(n) || n.hasAttribute("data-datepicker-instance"));
  const a3 = r.indexOf(e2);
  if (a3 >= 0 && (t2 ? a3 - 1 >= 0 : a3 + 1 <= r.length))
    return r[a3 + (t2 ? -1 : 1)];
}
var jr = (e2, t2) => {
  let r;
  return function(...a3) {
    clearTimeout(r), r = setTimeout(() => {
      e2(...a3);
    }, t2);
  };
};
var fa = (e2, t2, r, a3, n) => {
  const o = parse(e2, t2.slice(0, e2.length), /* @__PURE__ */ new Date());
  return isValid(o) && isDate(o) ? a3 || n ? o : set(o, {
    hours: +r.hours,
    minutes: +(r == null ? void 0 : r.minutes),
    seconds: +(r == null ? void 0 : r.seconds),
    milliseconds: 0
  }) : null;
};
var Kr = (e2, t2, r, a3, n) => {
  const o = Array.isArray(r) ? r[0] : r;
  if (typeof t2 == "string")
    return fa(e2, t2, o, a3, n);
  if (Array.isArray(t2)) {
    let i2 = null;
    for (const c2 of t2)
      if (i2 = fa(e2, c2, o, a3, n), i2)
        break;
    return i2;
  }
  return typeof t2 == "function" ? t2(e2) : null;
};
var B2 = (e2) => e2 ? new Date(e2) : /* @__PURE__ */ new Date();
var Gr = (e2, t2, r) => {
  if (t2) {
    const n = (e2.getMonth() + 1).toString().padStart(2, "0"), o = e2.getDate().toString().padStart(2, "0"), i2 = e2.getHours().toString().padStart(2, "0"), c2 = e2.getMinutes().toString().padStart(2, "0"), p = r ? e2.getSeconds().toString().padStart(2, "0") : "00";
    return `${e2.getFullYear()}-${n}-${o}T${i2}:${c2}:${p}.000Z`;
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
var je = (e2) => {
  let t2 = B2(JSON.parse(JSON.stringify(e2)));
  return t2 = setHours(t2, 0), t2 = setMinutes(t2, 0), t2 = setSeconds(t2, 0), t2 = setMilliseconds(t2, 0), t2;
};
var vt = (e2, t2, r, a3) => {
  let n = e2 ? B2(e2) : B2();
  return (t2 || t2 === 0) && (n = setHours(n, +t2)), (r || r === 0) && (n = setMinutes(n, +r)), (a3 || a3 === 0) && (n = setSeconds(n, +a3)), setMilliseconds(n, 0);
};
var Ye = (e2, t2) => !e2 || !t2 ? false : isBefore(je(e2), je(t2));
var ke = (e2, t2) => !e2 || !t2 ? false : isEqual(je(e2), je(t2));
var Ee = (e2, t2) => !e2 || !t2 ? false : isAfter(je(e2), je(t2));
var tn = (e2, t2, r) => e2 != null && e2[0] && (e2 != null && e2[1]) ? Ee(r, e2[0]) && Ye(r, e2[1]) : e2 != null && e2[0] && t2 ? Ee(r, e2[0]) && Ye(r, t2) || Ye(r, e2[0]) && Ee(r, t2) : false;
var Qe = (e2) => {
  const t2 = set(new Date(e2), { date: 1 });
  return je(t2);
};
var yn = (e2, t2, r) => t2 && (r || r === 0) ? Object.fromEntries(
  ["hours", "minutes", "seconds"].map((a3) => a3 === t2 ? [a3, r] : [a3, isNaN(+e2[a3]) ? void 0 : +e2[a3]])
) : {
  hours: isNaN(+e2.hours) ? void 0 : +e2.hours,
  minutes: isNaN(+e2.minutes) ? void 0 : +e2.minutes,
  seconds: isNaN(+e2.seconds) ? void 0 : +e2.seconds
};
var kt = (e2) => ({
  hours: getHours(e2),
  minutes: getMinutes(e2),
  seconds: getSeconds(e2)
});
var Ra = (e2, t2) => {
  if (t2) {
    const r = getYear(B2(t2));
    if (r > e2)
      return 12;
    if (r === e2)
      return getMonth(B2(t2));
  }
};
var Oa = (e2, t2) => {
  if (t2) {
    const r = getYear(B2(t2));
    return r < e2 ? -1 : r === e2 ? getMonth(B2(t2)) : void 0;
  }
};
var _t = (e2) => {
  if (e2)
    return getYear(B2(e2));
};
var xe = (e2, t2) => t2 ? Ir(e2, t2) : e2;
var Ya = (e2, t2) => t2 ? Br(e2, t2) : e2;
var qr = (e2) => e2 instanceof Date ? e2 : parseISO(e2);
var Na = (e2, t2) => {
  const r = Ee(e2, t2) ? t2 : e2, a3 = Ee(t2, e2) ? t2 : e2;
  return eachDayOfInterval({ start: r, end: a3 });
};
var Zr = (e2) => {
  const t2 = addMonths(e2, 1);
  return { month: getMonth(t2), year: getYear(t2) };
};
var Jt = (e2, t2, r) => {
  const a3 = startOfWeek(xe(e2, t2), { weekStartsOn: +r }), n = endOfWeek(xe(e2, t2), { weekStartsOn: +r });
  return [a3, n];
};
var Ia = (e2, t2) => {
  const r = {
    hours: getHours(B2()),
    minutes: getMinutes(B2()),
    seconds: t2 ? getSeconds(B2()) : 0
  };
  return Object.assign(r, e2);
};
var dt = (e2, t2, r) => [set(B2(e2), { date: 1 }), set(B2(), { month: t2, year: r, date: 1 })];
var st = (e2, t2, r) => {
  let a3 = e2 ? B2(e2) : B2();
  return (t2 || t2 === 0) && (a3 = setMonth(a3, t2)), r && (a3 = setYear(a3, r)), a3;
};
var Ba = (e2, t2, r, a3, n) => {
  if (!a3 || n && !t2 || !n && !r)
    return false;
  const o = n ? addMonths(e2, 1) : subMonths(e2, 1), i2 = [getMonth(o), getYear(o)];
  return n ? !Xr(...i2, t2) : !Qr(...i2, r);
};
var Qr = (e2, t2, r) => Ye(...dt(r, e2, t2)) || ke(...dt(r, e2, t2));
var Xr = (e2, t2, r) => Ee(...dt(r, e2, t2)) || ke(...dt(r, e2, t2));
var Ea = (e2, t2, r, a3, n, o, i2) => {
  if (typeof t2 == "function" && !i2)
    return t2(e2);
  const c2 = r ? { locale: r } : void 0;
  return Array.isArray(e2) ? `${format(e2[0], o, c2)}${n && !e2[1] ? "" : a3}${e2[1] ? format(e2[1], o, c2) : ""}` : format(e2, o, c2);
};
var Tt = (e2) => {
  if (e2)
    return null;
  throw new Error(en.prop("partial-range"));
};
var Gt = (e2, t2) => {
  if (t2)
    return e2();
  throw new Error(en.prop("range"));
};
var On = (e2) => Array.isArray(e2) ? isValid(e2[0]) && (e2[1] ? isValid(e2[1]) : true) : e2 ? isValid(e2) : false;
var Jr = (e2, t2) => set(t2 ?? B2(), {
  hours: +e2.hours || 0,
  minutes: +e2.minutes || 0,
  seconds: +e2.seconds || 0
});
var hn = (e2, t2, r, a3) => {
  if (!e2)
    return true;
  if (a3) {
    const n = r === "max" ? isBefore(e2, t2) : isAfter(e2, t2), o = { seconds: 0, milliseconds: 0 };
    return n || isEqual(set(e2, o), set(t2, o));
  }
  return r === "max" ? e2.getTime() <= t2.getTime() : e2.getTime() >= t2.getTime();
};
var pn = (e2, t2, r) => e2 ? Jr(e2, t2) : B2(r ?? t2);
var va = (e2, t2, r, a3, n) => {
  if (Array.isArray(a3)) {
    const i2 = pn(e2, a3[0], t2), c2 = pn(e2, a3[1], t2);
    return hn(a3[0], i2, r, !!t2) && hn(a3[1], c2, r, !!t2) && n;
  }
  const o = pn(e2, a3, t2);
  return hn(a3, o, r, !!t2) && n;
};
var bn = (e2) => set(B2(), kt(e2));
var xr = (e2, t2) => Array.isArray(e2) ? e2.map((r) => B2(r)).filter((r) => getYear(B2(r)) === t2).map((r) => getMonth(r)) : [];
var Fa = (e2, t2, r) => typeof e2 == "function" ? e2({ month: t2, year: r }) : !!e2.months.find((a3) => a3.month === t2 && a3.year === r);
var Kn = (e2, t2) => typeof e2 == "function" ? e2(t2) : e2.years.includes(t2);
var Yt = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Ha = () => {
  const e2 = (a3) => {
    Yt.menuFocused = a3;
  }, t2 = (a3) => {
    Yt.shiftKeyInMenu !== a3 && (Yt.shiftKeyInMenu = a3);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: Yt.shiftKeyInMenu, menuFocused: Yt.menuFocused })),
    setMenuFocused: e2,
    setShiftKey: t2
  };
};
var $e = reactive({
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
var kn = ref(null);
var qt = ref(false);
var wn = ref(false);
var Dn = ref(false);
var Mn = ref(false);
var Fe = ref(0);
var Oe = ref(0);
var yt = () => {
  const e2 = computed(() => qt.value ? [...$e.selectionGrid, $e.actionRow].filter((g) => g.length) : wn.value ? [
    ...$e.timePicker[0],
    ...$e.timePicker[1],
    Mn.value ? [] : [kn.value],
    $e.actionRow
  ].filter((g) => g.length) : Dn.value ? [...$e.monthPicker, $e.actionRow] : [$e.monthYear, ...$e.calendar, $e.time, $e.actionRow].filter((g) => g.length)), t2 = (g) => {
    Fe.value = g ? Fe.value + 1 : Fe.value - 1;
    let S3 = null;
    e2.value[Oe.value] && (S3 = e2.value[Oe.value][Fe.value]), S3 || (Fe.value = g ? Fe.value - 1 : Fe.value + 1);
  }, r = (g) => {
    if (Oe.value === 0 && !g || Oe.value === e2.value.length && g)
      return;
    Oe.value = g ? Oe.value + 1 : Oe.value - 1, e2.value[Oe.value] ? e2.value[Oe.value] && !e2.value[Oe.value][Fe.value] && Fe.value !== 0 && (Fe.value = e2.value[Oe.value].length - 1) : Oe.value = g ? Oe.value - 1 : Oe.value + 1;
  }, a3 = (g) => {
    let S3 = null;
    e2.value[Oe.value] && (S3 = e2.value[Oe.value][Fe.value]), S3 ? S3.focus({ preventScroll: !qt.value }) : Fe.value = g ? Fe.value - 1 : Fe.value + 1;
  }, n = () => {
    t2(true), a3(true);
  }, o = () => {
    t2(false), a3(false);
  }, i2 = () => {
    r(false), a3(true);
  }, c2 = () => {
    r(true), a3(true);
  }, p = (g, S3) => {
    $e[S3] = g;
  }, M3 = (g, S3) => {
    $e[S3] = g;
  }, $ = () => {
    Fe.value = 0, Oe.value = 0;
  };
  return {
    buildMatrix: p,
    buildMultiLevelMatrix: M3,
    setTimePickerBackRef: (g) => {
      kn.value = g;
    },
    setSelectionGrid: (g) => {
      qt.value = g, $(), g || ($e.selectionGrid = []);
    },
    setTimePicker: (g, S3 = false) => {
      wn.value = g, Mn.value = S3, $(), g || ($e.timePicker[0] = [], $e.timePicker[1] = []);
    },
    setTimePickerElements: (g, S3 = 0) => {
      $e.timePicker[S3] = g;
    },
    arrowRight: n,
    arrowLeft: o,
    arrowUp: i2,
    arrowDown: c2,
    clearArrowNav: () => {
      $e.monthYear = [], $e.calendar = [], $e.time = [], $e.actionRow = [], $e.selectionGrid = [], $e.timePicker[0] = [], $e.timePicker[1] = [], qt.value = false, wn.value = false, Mn.value = false, Dn.value = false, $(), kn.value = null;
    },
    setMonthPicker: (g) => {
      Dn.value = g, $();
    },
    refSets: $e
    // exposed for testing
  };
};
var ma = (e2) => ({
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
var el = (e2) => ({
  toggleOverlay: "Toggle overlay",
  menu: "Datepicker menu",
  input: "Datepicker input",
  calendarWrap: "Calendar wrapper",
  calendarDays: "Calendar days",
  openTimePicker: "Open time picker",
  closeTimePicker: "Close time Picker",
  incrementValue: (t2) => `Increment ${t2}`,
  decrementValue: (t2) => `Decrement ${t2}`,
  openTpOverlay: (t2) => `Open ${t2} overlay`,
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
var ga = (e2) => e2 ? typeof e2 == "boolean" ? e2 ? 2 : 0 : +e2 >= 2 ? +e2 : 2 : 0;
var tl = (e2) => {
  const t2 = typeof e2 == "object" && e2, r = {
    static: true,
    solo: false
  };
  if (!e2)
    return { ...r, count: ga(false) };
  const a3 = t2 ? e2 : {}, n = t2 ? a3.count ?? true : e2, o = ga(n);
  return Object.assign(r, a3, { count: o });
};
var nl = (e2, t2, r) => e2 || (typeof r == "string" ? r : t2);
var al = (e2) => typeof e2 == "boolean" ? e2 ? ma({}) : false : ma(e2);
var rl = (e2) => {
  const t2 = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: true,
    selectOnFocus: false,
    rangeSeparator: " - "
  };
  return typeof e2 == "object" ? { ...t2, ...e2 ?? {}, enabled: true } : { ...t2, enabled: e2 };
};
var ll = (e2) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...e2 ?? {}
});
var ol = (e2) => ({
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  ...e2 ?? {}
});
var sl = (e2) => {
  const t2 = { input: false };
  return typeof e2 == "object" ? { ...t2, ...e2 ?? {}, enabled: true } : {
    enabled: e2,
    ...t2
  };
};
var il = (e2) => ({ ...{
  allowStopPropagation: true,
  closeOnScroll: false,
  modeHeight: 255,
  allowPreventDefault: false,
  closeOnClearValue: true,
  closeOnAutoApply: true,
  noSwipe: false,
  keepActionRow: false,
  onClickOutside: void 0,
  tabOutClosesMenu: true
}, ...e2 ?? {} });
var ul = (e2, t2, r) => {
  const a3 = {
    dates: Array.isArray(e2) ? e2.map((n) => B2(n)) : [],
    years: [],
    months: [],
    quarters: [],
    weeks: [],
    weekdays: t2,
    options: { highlightDisabled: r }
  };
  return typeof e2 == "function" ? e2 : { ...a3, ...e2 ?? {} };
};
var dl = (e2) => typeof e2 == "object" ? {
  type: e2.type,
  hideOnOffsetDates: e2.hideOnOffsetDates ?? false
} : {
  type: e2,
  hideOnOffsetDates: false
};
var Pe = (e2) => {
  const t2 = () => {
    const g = e2.enableSeconds ? ":ss" : "";
    return e2.is24 ? `HH:mm${g}` : `hh:mm${g} aa`;
  }, r = () => e2.format ? e2.format : e2.monthPicker ? "MM/yyyy" : e2.timePicker ? t2() : e2.weekPicker ? "MM/dd/yyyy" : e2.yearPicker ? "yyyy" : e2.quarterPicker ? "QQQ/yyyy" : e2.enableTimePicker ? `MM/dd/yyyy, ${t2()}` : "MM/dd/yyyy", a3 = (g) => Ia(g, e2.enableSeconds), n = () => e2.range ? e2.startTime && Array.isArray(e2.startTime) ? [a3(e2.startTime[0]), a3(e2.startTime[1])] : null : e2.startTime && !Array.isArray(e2.startTime) ? a3(e2.startTime) : null, o = computed(() => tl(e2.multiCalendars)), i2 = computed(() => n()), c2 = computed(() => el(e2.ariaLabels)), p = computed(() => ll(e2.filters)), M3 = computed(() => al(e2.transitions)), $ = computed(() => ol(e2.actionRow)), C = computed(
    () => nl(e2.previewFormat, e2.format, r())
  ), k2 = computed(() => rl(e2.textInput)), I2 = computed(() => sl(e2.inline)), R2 = computed(() => il(e2.config)), A = computed(
    () => ul(e2.highlight, e2.highlightWeekDays, e2.highlightDisabledDays)
  ), x2 = computed(() => dl(e2.weekNumbers));
  return {
    defaultedTransitions: M3,
    defaultedMultiCalendars: o,
    defaultedStartTime: i2,
    defaultedAriaLabels: c2,
    defaultedFilters: p,
    defaultedActionRow: $,
    defaultedPreviewFormat: C,
    defaultedTextInput: k2,
    defaultedInline: I2,
    defaultedConfig: R2,
    defaultedHighlight: A,
    defaultedWeekNumbers: x2,
    getDefaultPattern: r,
    getDefaultStartTime: n
  };
};
var cl = (e2, t2, r) => {
  const a3 = ref(), { defaultedTextInput: n, getDefaultPattern: o } = Pe(t2), i2 = ref(""), c2 = toRef(t2, "format");
  watch(a3, () => {
    e2("internal-model-change", a3.value);
  }), watch(c2, () => {
    ne();
  });
  const p = (s3) => Ya(s3, t2.timezone), M3 = (s3) => xe(s3, t2.timezone), $ = (s3, X2, de = false) => Ea(
    s3,
    t2.format,
    t2.formatLocale,
    n.value.rangeSeparator,
    t2.modelAuto,
    X2 ?? o(),
    de
  ), C = (s3) => s3 ? t2.modelType ? d3(s3) : {
    hours: getHours(s3),
    minutes: getMinutes(s3),
    seconds: t2.enableSeconds ? getSeconds(s3) : 0
  } : null, k2 = (s3) => t2.modelType ? d3(s3) : { month: getMonth(s3), year: getYear(s3) }, I2 = (s3) => Array.isArray(s3) ? t2.multiDates ? s3.map((X2) => R2(X2, setYear(B2(), X2))) : Gt(
    () => [
      setYear(B2(), s3[0]),
      s3[1] ? setYear(B2(), s3[1]) : Tt(t2.partialRange)
    ],
    t2.range
  ) : setYear(B2(), +s3), R2 = (s3, X2) => (typeof s3 == "string" || typeof s3 == "number") && t2.modelType ? _(s3) : X2, A = (s3) => Array.isArray(s3) ? [
    R2(
      s3[0],
      vt(null, +s3[0].hours, +s3[0].minutes, s3[0].seconds)
    ),
    R2(
      s3[1],
      vt(null, +s3[1].hours, +s3[1].minutes, s3[1].seconds)
    )
  ] : R2(s3, vt(null, s3.hours, s3.minutes, s3.seconds)), x2 = (s3) => Array.isArray(s3) ? t2.multiDates ? s3.map((X2) => R2(X2, st(null, +X2.month, +X2.year))) : Gt(
    () => [
      R2(s3[0], st(null, +s3[0].month, +s3[0].year)),
      R2(
        s3[1],
        s3[1] ? st(null, +s3[1].month, +s3[1].year) : Tt(t2.partialRange)
      )
    ],
    t2.range
  ) : R2(s3, st(null, +s3.month, +s3.year)), g = (s3) => {
    if (Array.isArray(s3))
      return s3.map((X2) => _(X2));
    throw new Error(en.dateArr("multi-dates"));
  }, S3 = (s3) => {
    if (Array.isArray(s3))
      return [B2(s3[0]), B2(s3[1])];
    throw new Error(en.dateArr("week-picker"));
  }, F = (s3) => t2.modelAuto ? Array.isArray(s3) ? [_(s3[0]), _(s3[1])] : t2.autoApply ? [_(s3)] : [_(s3), null] : Array.isArray(s3) ? Gt(
    () => [
      _(s3[0]),
      s3[1] ? _(s3[1]) : Tt(t2.partialRange)
    ],
    t2.range
  ) : _(s3), b2 = () => {
    Array.isArray(a3.value) && t2.range && a3.value.length === 1 && a3.value.push(Tt(t2.partialRange));
  }, P = () => {
    const s3 = a3.value;
    return [
      d3(s3[0]),
      s3[1] ? d3(s3[1]) : Tt(t2.partialRange)
    ];
  }, Q2 = () => a3.value[1] ? P() : d3(Ce(a3.value[0])), ae = () => (a3.value || []).map((s3) => d3(s3)), L2 = () => (b2(), t2.modelAuto ? Q2() : t2.multiDates ? ae() : Array.isArray(a3.value) ? Gt(() => P(), t2.range) : d3(Ce(a3.value))), ie = (s3) => !s3 || Array.isArray(s3) && !s3.length ? null : t2.timePicker ? A(Ce(s3)) : t2.monthPicker ? x2(Ce(s3)) : t2.yearPicker ? I2(Ce(s3)) : t2.multiDates ? g(Ce(s3)) : t2.weekPicker ? S3(Ce(s3)) : F(Ce(s3)), E2 = (s3) => {
    const X2 = ie(s3);
    On(Ce(X2)) ? (a3.value = Ce(X2), ne()) : (a3.value = null, i2.value = "");
  }, f = () => {
    const s3 = (X2) => format(X2, n.value.format);
    return `${s3(a3.value[0])} ${n.value.rangeSeparator} ${a3.value[1] ? s3(a3.value[1]) : ""}`;
  }, D2 = () => r.value && a3.value ? Array.isArray(a3.value) ? f() : format(a3.value, n.value.format) : $(a3.value), H3 = () => a3.value ? t2.multiDates ? a3.value.map((s3) => $(s3)).join("; ") : n.value.enabled && typeof n.value.format == "string" ? D2() : $(a3.value) : "", ne = () => {
    !t2.format || typeof t2.format == "string" || n.value.enabled && typeof n.value.format == "string" ? i2.value = H3() : i2.value = t2.format(a3.value);
  }, _ = (s3) => {
    if (t2.utc) {
      const X2 = new Date(s3);
      return t2.utc === "preserve" ? new Date(X2.getTime() + X2.getTimezoneOffset() * 6e4) : X2;
    }
    return t2.modelType ? t2.modelType === "date" || t2.modelType === "timestamp" ? M3(new Date(s3)) : t2.modelType === "format" && (typeof t2.format == "string" || !t2.format) ? parse(s3, o(), /* @__PURE__ */ new Date()) : M3(parse(s3, t2.modelType, /* @__PURE__ */ new Date())) : M3(new Date(s3));
  }, d3 = (s3) => s3 ? t2.utc ? Gr(s3, t2.utc === "preserve", t2.enableSeconds) : t2.modelType ? t2.modelType === "timestamp" ? +p(s3) : t2.modelType === "format" && (typeof t2.format == "string" || !t2.format) ? $(p(s3)) : $(p(s3), t2.modelType, true) : p(s3) : "", O2 = (s3, X2 = false) => {
    if (e2("update:model-value", s3), t2.emitTimezone && X2) {
      const de = Array.isArray(s3) ? s3.map((T2) => xe(Ce(T2)), t2.emitTimezone) : xe(Ce(s3), t2.emitTimezone);
      e2("update:model-timezone-value", de);
    }
  }, G2 = (s3) => Array.isArray(a3.value) ? t2.multiDates ? a3.value.map((X2) => s3(X2)) : [
    s3(a3.value[0]),
    a3.value[1] ? s3(a3.value[1]) : Tt(t2.partialRange)
  ] : s3(Ce(a3.value)), y3 = (s3) => O2(Ce(G2(s3)));
  return {
    inputValue: i2,
    internalModelValue: a3,
    checkBeforeEmit: () => a3.value ? t2.range ? t2.partialRange ? a3.value.length >= 1 : a3.value.length === 2 : !!a3.value : false,
    parseExternalModelValue: E2,
    formatInputValue: ne,
    emitModelValue: () => (ne(), t2.monthPicker ? y3(k2) : t2.timePicker ? y3(C) : t2.yearPicker ? y3(getYear) : t2.weekPicker ? O2(
      a3.value.map((s3) => d3(s3)),
      true
    ) : O2(L2(), true))
  };
};
var fl = (e2, t2) => {
  const { defaultedFilters: r } = Pe(e2), { validateMonthYearInRange: a3 } = Mt(e2), n = (M3, $) => {
    let C = M3;
    return r.value.months.includes(getMonth(C)) ? (C = $ ? addMonths(M3, 1) : subMonths(M3, 1), n(C, $)) : C;
  }, o = (M3, $) => {
    let C = M3;
    return r.value.years.includes(getYear(C)) ? (C = $ ? addYears(M3, 1) : subYears(M3, 1), o(C, $)) : C;
  }, i2 = (M3, $ = false) => {
    const C = set(/* @__PURE__ */ new Date(), { month: e2.month, year: e2.year });
    let k2 = M3 ? addMonths(C, 1) : subMonths(C, 1);
    e2.disableYearSelect && (k2 = setYear(k2, e2.year));
    let I2 = getMonth(k2), R2 = getYear(k2);
    r.value.months.includes(I2) && (k2 = n(k2, M3), I2 = getMonth(k2), R2 = getYear(k2)), r.value.years.includes(R2) && (k2 = o(k2, M3), R2 = getYear(k2)), a3(I2, R2, M3, e2.preventMinMaxNavigation) && c2(I2, R2, $);
  }, c2 = (M3, $, C) => {
    t2("update-month-year", { month: M3, year: $, fromNav: C });
  }, p = computed(() => (M3) => Ba(
    set(/* @__PURE__ */ new Date(), { month: e2.month, year: e2.year }),
    e2.maxDate,
    e2.minDate,
    e2.preventMinMaxNavigation,
    M3
  ));
  return { handleMonthYearChange: i2, isDisabled: p, updateMonthYear: c2 };
};
var At = ((e2) => (e2.center = "center", e2.left = "left", e2.right = "right", e2))(At || {});
var Ze = ((e2) => (e2.month = "month", e2.year = "year", e2))(Ze || {});
var ht = ((e2) => (e2.top = "top", e2.bottom = "bottom", e2))(ht || {});
var wt = ((e2) => (e2.header = "header", e2.calendar = "calendar", e2.timePicker = "timePicker", e2))(wt || {});
var tt = ((e2) => (e2.month = "month", e2.year = "year", e2.calendar = "calendar", e2.time = "time", e2.minutes = "minutes", e2.hours = "hours", e2.seconds = "seconds", e2))(tt || {});
var vl = ({
  menuRef: e2,
  menuRefInner: t2,
  inputRef: r,
  pickerWrapperRef: a3,
  inline: n,
  emit: o,
  props: i2,
  slots: c2
}) => {
  const p = ref({}), M3 = ref(false), $ = ref({
    top: "0",
    left: "0"
  }), C = ref(false), k2 = toRef(i2, "teleportCenter");
  watch(k2, () => {
    $.value = JSON.parse(JSON.stringify({})), b2();
  });
  const I2 = (d3) => {
    if (i2.teleport) {
      const O2 = d3.getBoundingClientRect();
      return {
        left: O2.left + window.scrollX,
        top: O2.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, R2 = (d3, O2) => {
    $.value.left = `${d3 + O2 - p.value.width}px`;
  }, A = (d3) => {
    $.value.left = `${d3}px`;
  }, x2 = (d3, O2) => {
    i2.position === At.left && A(d3), i2.position === At.right && R2(d3, O2), i2.position === At.center && ($.value.left = `${d3 + O2 / 2 - p.value.width / 2}px`);
  }, g = (d3) => {
    const { width: O2, height: G2 } = d3.getBoundingClientRect(), { top: y3, left: l } = i2.altPosition ? i2.altPosition(d3) : I2(d3);
    return { top: +y3, left: +l, width: O2, height: G2 };
  }, S3 = () => {
    $.value.left = "50%", $.value.top = "50%", $.value.transform = "translate(-50%, -50%)", $.value.position = "fixed", delete $.value.opacity;
  }, F = () => {
    const d3 = _e(r), { top: O2, left: G2, transform: y3 } = i2.altPosition(d3);
    $.value = { top: `${O2}px`, left: `${G2}px`, transform: y3 ?? "" };
  }, b2 = (d3 = true) => {
    var O2;
    if (!n.value.enabled) {
      if (k2.value)
        return S3();
      if (i2.altPosition !== null)
        return F();
      if (d3) {
        const G2 = i2.teleport ? (O2 = t2.value) == null ? void 0 : O2.$el : e2.value;
        G2 && (p.value = G2.getBoundingClientRect()), o("recalculate-position");
      }
      return f();
    }
  }, P = ({ inputEl: d3, left: O2, width: G2 }) => {
    window.screen.width > 768 && !M3.value && x2(O2, G2), L2(d3);
  }, Q2 = (d3) => {
    const { top: O2, left: G2, height: y3, width: l } = g(d3);
    $.value.top = `${y3 + O2 + +i2.offset}px`, C.value = false, M3.value || ($.value.left = `${G2 + l / 2 - p.value.width / 2}px`), P({ inputEl: d3, left: G2, width: l });
  }, ae = (d3) => {
    const { top: O2, left: G2, width: y3 } = g(d3);
    $.value.top = `${O2 - +i2.offset - p.value.height}px`, C.value = true, P({ inputEl: d3, left: G2, width: y3 });
  }, L2 = (d3) => {
    if (i2.autoPosition) {
      const { left: O2, width: G2 } = g(d3), { left: y3, right: l } = p.value;
      if (!M3.value) {
        if (Math.abs(y3) !== Math.abs(l)) {
          if (y3 <= 0)
            return M3.value = true, A(O2);
          if (l >= document.documentElement.clientWidth)
            return M3.value = true, R2(O2, G2);
        }
        return x2(O2, G2);
      }
    }
  }, ie = () => {
    const d3 = _e(r);
    if (d3) {
      const { height: O2 } = p.value, { top: G2, height: y3 } = d3.getBoundingClientRect(), h4 = window.innerHeight - G2 - y3, s3 = G2;
      return O2 <= h4 ? ht.bottom : O2 > h4 && O2 <= s3 ? ht.top : h4 >= s3 ? ht.bottom : ht.top;
    }
    return ht.bottom;
  }, E2 = (d3) => ie() === ht.bottom ? Q2(d3) : ae(d3), f = () => {
    const d3 = _e(r);
    if (d3)
      return i2.autoPosition ? E2(d3) : Q2(d3);
  }, D2 = function(d3) {
    if (d3) {
      const O2 = d3.scrollHeight > d3.clientHeight, y3 = window.getComputedStyle(d3).overflowY.indexOf("hidden") !== -1;
      return O2 && !y3;
    }
    return true;
  }, H3 = function(d3) {
    return !d3 || d3 === document.body || d3.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : D2(d3) ? d3 : H3(d3.parentNode);
  }, ne = (d3) => {
    if (d3)
      switch (i2.position) {
        case At.left:
          return { left: 0, transform: "translateX(0)" };
        case At.right:
          return { left: `${d3.width}px`, transform: "translateX(-100%)" };
        default:
          return { left: `${d3.width / 2}px`, transform: "translateX(-50%)" };
      }
    return {};
  };
  return {
    openOnTop: C,
    menuStyle: $,
    xCorrect: M3,
    setMenuPosition: b2,
    getScrollableParent: H3,
    shadowRender: (d3, O2) => {
      var X2, de, T2;
      const G2 = document.createElement("div"), y3 = (X2 = _e(r)) == null ? void 0 : X2.getBoundingClientRect();
      G2.setAttribute("id", "dp--temp-container");
      const l = (de = a3.value) != null && de.clientWidth ? a3.value : document.body;
      l.append(G2);
      const h4 = ne(y3), s3 = h(
        d3,
        {
          ...O2,
          shadow: true,
          style: { opacity: 0, position: "absolute", ...h4 }
        },
        Object.fromEntries(
          Object.keys(c2).filter((u2) => ["right-sidebar", "left-sidebar"].includes(u2)).map((u2) => [u2, c2[u2]])
        )
      );
      render(s3, G2), p.value = (T2 = s3.el) == null ? void 0 : T2.getBoundingClientRect(), render(null, G2), l.removeChild(G2);
    }
  };
};
var ut = [
  { name: "clock-icon", use: ["time", "calendar", "shared"] },
  { name: "arrow-left", use: ["month-year", "calendar", "shared", "year-mode"] },
  { name: "arrow-right", use: ["month-year", "calendar", "shared", "year-mode"] },
  { name: "arrow-up", use: ["time", "calendar", "month-year", "shared"] },
  { name: "arrow-down", use: ["time", "calendar", "month-year", "shared"] },
  { name: "calendar-icon", use: ["month-year", "time", "calendar", "shared", "year-mode"] },
  { name: "day", use: ["calendar", "shared"] },
  { name: "month-overlay-value", use: ["calendar", "month-year", "shared"] },
  { name: "year-overlay-value", use: ["calendar", "month-year", "shared", "year-mode"] },
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
  { name: "year", use: ["calendar", "month-year", "shared", "year-mode"] },
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
  { name: "marker", use: ["calendar", "shared"] },
  { name: "quarter", use: ["shared"] }
];
var ml = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var gl = {
  all: () => ut,
  monthYear: () => ut.filter((e2) => e2.use.includes("month-year")),
  input: () => ml,
  timePicker: () => ut.filter((e2) => e2.use.includes("time")),
  action: () => ut.filter((e2) => e2.use.includes("action")),
  calendar: () => ut.filter((e2) => e2.use.includes("calendar")),
  menu: () => ut.filter((e2) => e2.use.includes("menu")),
  shared: () => ut.filter((e2) => e2.use.includes("shared")),
  yearMode: () => ut.filter((e2) => e2.use.includes("year-mode"))
};
var Ke = (e2, t2, r) => {
  const a3 = [];
  return gl[t2]().forEach((n) => {
    e2[n.name] && a3.push(n.name);
  }), r != null && r.length && r.forEach((n) => {
    n.slot && a3.push(n.slot);
  }), a3;
};
var Lt = (e2) => {
  const t2 = computed(() => (a3) => e2.value ? a3 ? e2.value.open : e2.value.close : ""), r = computed(() => (a3) => e2.value ? a3 ? e2.value.menuAppearTop : e2.value.menuAppearBottom : "");
  return { transitionName: t2, showTransition: !!e2.value, menuTransition: r };
};
var Ut = (e2, t2) => {
  const r = B2(xe(/* @__PURE__ */ new Date(), e2.timezone)), a3 = ref([{ month: getMonth(r), year: getYear(r) }]), n = reactive({
    hours: e2.range ? [getHours(r), getHours(r)] : getHours(r),
    minutes: e2.range ? [getMinutes(r), getMinutes(r)] : getMinutes(r),
    seconds: e2.range ? [0, 0] : 0
  }), o = computed({
    get: () => e2.internalModelValue,
    set: (p) => {
      !e2.readonly && !e2.disabled && t2("update:internal-model-value", p);
    }
  }), i2 = computed(
    () => (p) => a3.value[p] ? a3.value[p].month : 0
  ), c2 = computed(
    () => (p) => a3.value[p] ? a3.value[p].year : 0
  );
  return {
    calendars: a3,
    time: n,
    modelValue: o,
    month: i2,
    year: c2
  };
};
var yl = (e2, t2) => {
  const { defaultedMultiCalendars: r, defaultedHighlight: a3 } = Pe(t2), { isDisabled: n, matchDate: o } = Mt(t2), i2 = ref(null), c2 = ref(B2(xe(/* @__PURE__ */ new Date(), t2.timezone))), p = (l) => {
    !l.current && t2.hideOffsetDates || (i2.value = l.value);
  }, M3 = () => {
    i2.value = null;
  }, $ = (l) => Array.isArray(e2.value) && t2.range && e2.value[0] && i2.value ? l ? Ee(i2.value, e2.value[0]) : Ye(i2.value, e2.value[0]) : true, C = (l, h4) => {
    const s3 = () => e2.value ? h4 ? e2.value[0] || null : e2.value[1] : null, X2 = e2.value && Array.isArray(e2.value) ? s3() : null;
    return ke(B2(l.value), X2);
  }, k2 = (l) => {
    const h4 = Array.isArray(e2.value) ? e2.value[0] : null;
    return l ? !Ye(i2.value ?? null, h4) : true;
  }, I2 = (l, h4 = true) => (t2.range || t2.weekPicker) && Array.isArray(e2.value) && e2.value.length === 2 ? t2.hideOffsetDates && !l.current ? false : ke(B2(l.value), e2.value[h4 ? 0 : 1]) : t2.range ? C(l, h4) && k2(h4) || ke(l.value, Array.isArray(e2.value) ? e2.value[0] : null) && $(h4) : false, R2 = (l, h4, s3) => Array.isArray(e2.value) && e2.value[0] && e2.value.length === 1 ? l ? false : s3 ? Ee(e2.value[0], h4.value) : Ye(e2.value[0], h4.value) : false, A = (l) => !e2.value || t2.hideOffsetDates && !l.current ? false : t2.range ? t2.modelAuto && Array.isArray(e2.value) ? ke(l.value, e2.value[0] ? e2.value[0] : c2.value) : false : t2.multiDates && Array.isArray(e2.value) ? e2.value.some((h4) => ke(h4, l.value)) : ke(l.value, e2.value ? e2.value : c2.value), x2 = (l) => {
    if (t2.autoRange || t2.weekPicker) {
      if (i2.value) {
        if (t2.hideOffsetDates && !l.current)
          return false;
        const h4 = addDays(i2.value, +t2.autoRange), s3 = Jt(B2(i2.value), t2.timezone, t2.weekStart);
        return t2.weekPicker ? ke(s3[1], B2(l.value)) : ke(h4, B2(l.value));
      }
      return false;
    }
    return false;
  }, g = (l) => {
    if (t2.autoRange || t2.weekPicker) {
      if (i2.value) {
        const h4 = addDays(i2.value, +t2.autoRange);
        if (t2.hideOffsetDates && !l.current)
          return false;
        const s3 = Jt(B2(i2.value), t2.timezone, t2.weekStart);
        return t2.weekPicker ? Ee(l.value, s3[0]) && Ye(l.value, s3[1]) : Ee(l.value, i2.value) && Ye(l.value, h4);
      }
      return false;
    }
    return false;
  }, S3 = (l) => {
    if (t2.autoRange || t2.weekPicker) {
      if (i2.value) {
        if (t2.hideOffsetDates && !l.current)
          return false;
        const h4 = Jt(B2(i2.value), t2.timezone, t2.weekStart);
        return t2.weekPicker ? ke(h4[0], l.value) : ke(i2.value, l.value);
      }
      return false;
    }
    return false;
  }, F = (l) => tn(e2.value, i2.value, l.value), b2 = () => t2.modelAuto && Array.isArray(t2.internalModelValue) ? !!t2.internalModelValue[0] : false, P = () => t2.modelAuto ? _a(t2.internalModelValue) : true, Q2 = (l) => {
    if (Array.isArray(e2.value) && e2.value.length || t2.weekPicker)
      return false;
    const h4 = t2.range ? !I2(l) && !I2(l, false) : true;
    return !n(l.value) && !A(l) && !(!l.current && t2.hideOffsetDates) && h4;
  }, ae = (l) => t2.range ? t2.modelAuto ? b2() && A(l) : false : A(l), L2 = (l) => {
    var h4;
    return a3.value ? typeof a3.value == "function" ? a3.value(l.value) : o(
      l.value,
      (h4 = t2.arrMapValues) != null && h4.highlightedDates ? t2.arrMapValues.highlightedDates : a3.value.dates
    ) : false;
  }, ie = (l) => {
    const h4 = n(l.value);
    return h4 && (typeof a3.value == "function" ? !a3.value(l.value, h4) : !a3.value.options.highlightDisabled);
  }, E2 = (l) => {
    var h4;
    return typeof a3.value == "function" ? a3.value(l.value) : (h4 = a3.value.weekdays) == null ? void 0 : h4.includes(l.value.getDay());
  }, f = (l) => (t2.range || t2.weekPicker) && (!(r.value.count > 0) || l.current) && P() && !(!l.current && t2.hideOffsetDates) && !A(l) ? F(l) : false, D2 = (l) => {
    const { isRangeStart: h4, isRangeEnd: s3 } = _(l), X2 = t2.range ? h4 || s3 : false;
    return {
      dp__cell_offset: !l.current,
      dp__pointer: !t2.disabled && !(!l.current && t2.hideOffsetDates) && !n(l.value),
      dp__cell_disabled: n(l.value),
      dp__cell_highlight: !ie(l) && (L2(l) || E2(l)) && !ae(l) && !X2 && !S3(l) && !(f(l) && t2.weekPicker) && !s3,
      dp__cell_highlight_active: !ie(l) && (L2(l) || E2(l)) && ae(l),
      dp__today: !t2.noToday && ke(l.value, c2.value) && l.current
    };
  }, H3 = (l) => ({
    dp__active_date: ae(l),
    dp__date_hover: Q2(l)
  }), ne = (l) => ({
    ...d3(l),
    ...O2(l),
    dp__range_between_week: f(l) && t2.weekPicker
  }), _ = (l) => {
    const h4 = r.value.count > 0 ? l.current && I2(l) && P() : I2(l) && P(), s3 = r.value.count > 0 ? l.current && I2(l, false) && P() : I2(l, false) && P();
    return { isRangeStart: h4, isRangeEnd: s3 };
  }, d3 = (l) => {
    const { isRangeStart: h4, isRangeEnd: s3 } = _(l);
    return {
      dp__range_start: h4,
      dp__range_end: s3,
      dp__range_between: f(l) && !t2.weekPicker,
      dp__date_hover_start: R2(Q2(l), l, true),
      dp__date_hover_end: R2(Q2(l), l, false)
    };
  }, O2 = (l) => ({
    ...d3(l),
    dp__cell_auto_range: g(l),
    dp__cell_auto_range_start: S3(l),
    dp__cell_auto_range_end: x2(l)
  }), G2 = (l) => t2.range ? t2.autoRange ? O2(l) : t2.modelAuto ? { ...H3(l), ...d3(l) } : d3(l) : t2.weekPicker ? ne(l) : H3(l);
  return {
    setHoverDate: p,
    clearHoverDate: M3,
    getDayClassData: (l) => t2.hideOffsetDates && !l.current ? {} : {
      ...D2(l),
      ...G2(l),
      [t2.dayClass ? t2.dayClass(l.value) : ""]: true,
      [t2.calendarCellClassName]: !!t2.calendarCellClassName
    }
  };
};
var Mt = (e2) => {
  const { defaultedFilters: t2, defaultedHighlight: r } = Pe(e2), a3 = () => {
    if (e2.timezone)
      return e2.timezone;
    if (e2.utc)
      return "UTC";
  }, n = (f) => {
    const D2 = je(o(B2(f))).toISOString(), [H3] = D2.split("T");
    return H3;
  }, o = (f) => e2.utc === "preserve" ? Ya(f, a3()) : xe(f, a3()), i2 = (f) => {
    var h4;
    const D2 = e2.maxDate ? Ee(f, o(B2(e2.maxDate))) : false, H3 = e2.minDate ? Ye(f, o(B2(e2.minDate))) : false, ne = $(
      o(f),
      (h4 = e2.arrMapValues) != null && h4.disabledDates ? e2.arrMapValues.disabledDates : e2.disabledDates
    ), d3 = t2.value.months.map((s3) => +s3).includes(getMonth(f)), O2 = e2.disabledWeekDays.length ? e2.disabledWeekDays.some((s3) => +s3 === getDay(f)) : false, G2 = k2(f), y3 = getYear(f), l = y3 < +e2.yearRange[0] || y3 > +e2.yearRange[1];
    return !(D2 || H3 || ne || d3 || l || O2 || G2);
  }, c2 = (f, D2) => Ye(...dt(e2.minDate, f, D2)) || ke(...dt(e2.minDate, f, D2)), p = (f, D2) => Ee(...dt(e2.maxDate, f, D2)) || ke(...dt(e2.maxDate, f, D2)), M3 = (f, D2, H3) => {
    let ne = false;
    return e2.maxDate && H3 && p(f, D2) && (ne = true), e2.minDate && !H3 && c2(f, D2) && (ne = true), ne;
  }, $ = (f, D2) => f ? D2 instanceof Map ? !!D2.get(n(f)) : Array.isArray(D2) ? D2.some((H3) => ke(o(B2(H3)), f)) : D2 ? D2(B2(JSON.parse(JSON.stringify(f)))) : false : true, C = (f, D2, H3, ne) => {
    let _ = false;
    return ne ? e2.minDate && e2.maxDate ? _ = M3(f, D2, H3) : (e2.minDate && c2(f, D2) || e2.maxDate && p(f, D2)) && (_ = true) : _ = true, _;
  }, k2 = (f) => {
    var D2, H3, ne, _, d3;
    return Array.isArray(e2.allowedDates) && !((D2 = e2.allowedDates) != null && D2.length) ? true : (H3 = e2.arrMapValues) != null && H3.allowedDates ? !$(f, (ne = e2.arrMapValues) == null ? void 0 : ne.allowedDates) : (_ = e2.allowedDates) != null && _.length ? !((d3 = e2.allowedDates) != null && d3.some((O2) => ke(o(B2(O2)), o(f)))) : false;
  }, I2 = (f) => !i2(f), R2 = (f) => e2.noDisabledRange ? !eachDayOfInterval({ start: f[0], end: f[1] }).some((H3) => I2(H3)) : true, A = (f, D2, H3 = 0) => {
    if (Array.isArray(D2) && D2[H3]) {
      const ne = differenceInCalendarDays(f, D2[H3]), _ = Na(D2[H3], f), d3 = _.length === 1 ? 0 : _.filter((G2) => I2(G2)).length, O2 = Math.abs(ne) - d3;
      if (e2.minRange && e2.maxRange)
        return O2 >= +e2.minRange && O2 <= +e2.maxRange;
      if (e2.minRange)
        return O2 >= +e2.minRange;
      if (e2.maxRange)
        return O2 <= +e2.maxRange;
    }
    return true;
  }, x2 = (f) => new Map(f.map((D2) => [n(D2), true])), g = (f) => Array.isArray(f) && f.length > 0, S3 = () => {
    const f = {
      disabledDates: null,
      allowedDates: null,
      highlightedDates: null
    };
    return g(e2.allowedDates) && (f.allowedDates = x2(e2.allowedDates)), typeof r.value != "function" && g(r.value.dates) && (f.highlightedDates = x2(r.value.dates)), g(e2.disabledDates) && (f.disabledDates = x2(e2.disabledDates)), f;
  }, F = () => !e2.enableTimePicker || e2.monthPicker || e2.yearPicker || e2.ignoreTimeValidation, b2 = (f) => Array.isArray(f) ? [f[0] ? bn(f[0]) : null, f[1] ? bn(f[1]) : null] : bn(f), P = (f, D2, H3) => f.find(
    (ne) => +ne.hours === getHours(D2) && ne.minutes === "*" ? true : +ne.minutes === getMinutes(D2) && +ne.hours === getHours(D2)
  ) && H3, Q2 = (f, D2, H3) => {
    const [ne, _] = f, [d3, O2] = D2;
    return !P(ne, d3, H3) && !P(_, O2, H3) && H3;
  }, ae = (f, D2) => {
    const H3 = Array.isArray(D2) ? D2 : [D2];
    return Array.isArray(e2.disabledTimes) ? Array.isArray(e2.disabledTimes[0]) ? Q2(e2.disabledTimes, H3, f) : !H3.some((ne) => P(e2.disabledTimes, ne, f)) : f;
  }, L2 = (f, D2) => {
    const H3 = Array.isArray(D2) ? [kt(D2[0]), D2[1] ? kt(D2[1]) : void 0] : kt(D2), ne = !e2.disabledTimes(H3);
    return f && ne;
  }, ie = (f, D2) => e2.disabledTimes ? Array.isArray(e2.disabledTimes) ? ae(D2, f) : L2(D2, f) : D2;
  return {
    isDisabled: I2,
    validateDate: i2,
    validateMonthYearInRange: C,
    isDateRangeAllowed: R2,
    checkMinMaxRange: A,
    matchDate: $,
    mapDatesArrToMap: S3,
    isValidTime: (f) => {
      let D2 = true;
      if (!f || F())
        return true;
      const H3 = !e2.minDate && !e2.maxDate ? b2(f) : f;
      return (e2.maxTime || e2.maxDate) && (D2 = va(
        e2.maxTime,
        e2.maxDate,
        "max",
        Ce(H3),
        D2
      )), (e2.minTime || e2.minDate) && (D2 = va(
        e2.minTime,
        e2.minDate,
        "min",
        Ce(H3),
        D2
      )), ie(f, D2);
    }
  };
};
var nn = () => {
  const e2 = computed(() => (a3, n) => a3 == null ? void 0 : a3.includes(n)), t2 = computed(() => (a3, n) => a3.count ? a3.solo ? true : n === 0 : true), r = computed(() => (a3, n) => a3.count ? a3.solo ? true : n === a3.count - 1 : true);
  return { hideNavigationButtons: e2, showLeftIcon: t2, showRightIcon: r };
};
var hl = (e2, t2, r) => {
  const a3 = ref(0), n = reactive({
    [wt.timePicker]: !e2.enableTimePicker || e2.timePicker || e2.monthPicker,
    [wt.calendar]: false,
    [wt.header]: false
  }), o = computed(() => e2.monthPicker), i2 = (C) => {
    var k2;
    if ((k2 = e2.flow) != null && k2.length) {
      if (!C && o.value)
        return $();
      n[C] = true, Object.keys(n).filter((I2) => !n[I2]).length || $();
    }
  }, c2 = () => {
    var C;
    (C = e2.flow) != null && C.length && a3.value !== -1 && (a3.value += 1, t2("flow-step", a3.value), $());
  }, p = () => {
    a3.value = -1;
  }, M3 = (C, k2, ...I2) => {
    e2.flow[a3.value] === C && r.value && r.value[k2](...I2);
  }, $ = () => {
    M3(tt.month, "toggleMonthPicker", true), M3(tt.year, "toggleYearPicker", true), M3(tt.calendar, "toggleTimePicker", false, true), M3(tt.time, "toggleTimePicker", true, true);
    const C = e2.flow[a3.value];
    (C === tt.hours || C === tt.minutes || C === tt.seconds) && M3(C, "toggleTimePicker", true, true, C);
  };
  return { childMount: i2, updateFlowStep: c2, resetFlow: p, flowStep: a3 };
};
var an = {
  multiCalendars: { type: [Boolean, Number, String, Object], default: void 0 },
  modelValue: { type: [String, Date, Array, Object, Number], default: null },
  modelType: { type: String, default: null },
  position: { type: String, default: "center" },
  dark: { type: Boolean, default: false },
  format: {
    type: [String, Function],
    default: () => null
  },
  autoPosition: { type: Boolean, default: true },
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
  weekPicker: { type: Boolean, default: false },
  filters: { type: Object, default: () => ({}) },
  arrowNavigation: { type: Boolean, default: false },
  disableTimeRangeValidation: { type: Boolean, default: false },
  highlight: {
    type: [Array, Function, Object],
    default: null
  },
  highlightWeekDays: {
    type: Array,
    default: null
  },
  highlightDisabledDays: { type: Boolean, default: false },
  teleport: { type: [String, Boolean, Object], default: null },
  teleportCenter: { type: Boolean, default: false },
  locale: { type: String, default: "en-Us" },
  weekNumName: { type: String, default: "W" },
  weekStart: { type: [Number, String], default: 1 },
  weekNumbers: {
    type: [String, Function, Object],
    default: null
  },
  calendarClassName: { type: String, default: null },
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
  noDisabledRange: { type: Boolean, default: false },
  sixWeeks: { type: [Boolean, String], default: false },
  actionRow: { type: Object, default: () => ({}) },
  focusStartDate: { type: Boolean, default: false },
  disabledTimes: { type: [Function, Array], default: void 0 },
  showLastInRange: { type: Boolean, default: true },
  timePickerInline: { type: Boolean, default: false },
  calendar: { type: Function, default: null },
  config: { type: Object, default: void 0 },
  quarterPicker: { type: Boolean, default: false },
  yearFirst: { type: Boolean, default: false }
};
var et = {
  ...an,
  shadow: { type: Boolean, default: false },
  flowStep: { type: Number, default: 0 },
  internalModelValue: { type: [Date, Array], default: null },
  arrMapValues: { type: Object, default: () => ({}) },
  noOverlayFocus: { type: Boolean, default: false }
};
var pl = {
  key: 1,
  class: "dp__input_wrap"
};
var bl = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-label", "aria-disabled", "aria-invalid"];
var kl = {
  key: 2,
  class: "dp__clear_icon"
};
var wl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: false },
    inputValue: { type: String, default: "" },
    ...an
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
  setup(e2, { expose: t2, emit: r }) {
    const a3 = r, n = e2, {
      defaultedTextInput: o,
      defaultedAriaLabels: i2,
      defaultedInline: c2,
      defaultedConfig: p,
      getDefaultPattern: M3,
      getDefaultStartTime: $
    } = Pe(n), { checkMinMaxRange: C } = Mt(n), k2 = ref(), I2 = ref(null), R2 = ref(false), A = ref(false), x2 = computed(
      () => ({
        dp__pointer: !n.disabled && !n.readonly && !o.value.enabled,
        dp__disabled: n.disabled,
        dp__input_readonly: !o.value.enabled,
        dp__input: true,
        dp__input_icon_pad: !n.hideInputIcon,
        dp__input_valid: !!n.state,
        dp__input_invalid: n.state === false,
        dp__input_focus: R2.value || n.isMenuOpen,
        dp__input_reg: !o.value.enabled,
        [n.inputClassName]: !!n.inputClassName
      })
    ), g = () => {
      a3("set-input-date", null), n.autoApply && (a3("set-empty-date"), k2.value = null);
    }, S3 = (d3) => {
      const O2 = $();
      return Kr(
        d3,
        o.value.format ?? M3(),
        O2 ?? Ia({}, n.enableSeconds),
        n.inputValue,
        A.value
      );
    }, F = (d3) => {
      const { rangeSeparator: O2 } = o.value, [G2, y3] = d3.split(`${O2}`);
      if (G2) {
        const l = S3(G2.trim()), h4 = y3 ? S3(y3.trim()) : null, s3 = l && h4 ? [l, h4] : [l];
        C(h4, s3, 0) && (k2.value = l ? s3 : null);
      }
    }, b2 = () => {
      A.value = true;
    }, P = (d3) => {
      if (n.range)
        F(d3);
      else if (n.multiDates) {
        const O2 = d3.split(";");
        k2.value = O2.map((G2) => S3(G2.trim())).filter((G2) => G2);
      } else
        k2.value = S3(d3);
    }, Q2 = (d3) => {
      var G2;
      const O2 = typeof d3 == "string" ? d3 : (G2 = d3.target) == null ? void 0 : G2.value;
      O2 !== "" ? (o.value.openMenu && !n.isMenuOpen && a3("open"), P(O2), a3("set-input-date", k2.value)) : g(), A.value = false, a3("update:input-value", O2);
    }, ae = (d3) => {
      o.value.enabled ? (P(d3.target.value), o.value.enterSubmit && On(k2.value) && n.inputValue !== "" ? (a3("set-input-date", k2.value, true), k2.value = null) : o.value.enterSubmit && n.inputValue === "" && (k2.value = null, a3("clear"))) : E2(d3);
    }, L2 = (d3) => {
      o.value.enabled && o.value.tabSubmit && P(d3.target.value), o.value.tabSubmit && On(k2.value) && n.inputValue !== "" ? (a3("set-input-date", k2.value, true, true), k2.value = null) : o.value.tabSubmit && n.inputValue === "" && (k2.value = null, a3("clear", true));
    }, ie = () => {
      var d3;
      R2.value = true, a3("focus"), o.value.enabled && o.value.selectOnFocus && ((d3 = I2.value) == null || d3.select());
    }, E2 = (d3) => {
      d3.preventDefault(), ft(d3, p.value, true), o.value.enabled && o.value.openMenu && !c2.value.input && !n.isMenuOpen ? a3("open") : o.value.enabled || a3("toggle");
    }, f = () => {
      a3("real-blur"), R2.value = false, (!n.isMenuOpen || c2.value.enabled && c2.value.input) && a3("blur"), n.autoApply && o.value.enabled && k2.value && !n.isMenuOpen && (a3("set-input-date", k2.value), a3("select-date"), k2.value = null);
    }, D2 = (d3) => {
      ft(d3, p.value, true), a3("clear");
    }, H3 = (d3) => {
      if (!o.value.enabled) {
        if (d3.code === "Tab")
          return;
        d3.preventDefault();
      }
    };
    return t2({
      focusInput: () => {
        var d3;
        (d3 = I2.value) == null || d3.focus({ preventScroll: true });
      },
      setParsedDate: (d3) => {
        k2.value = d3;
      }
    }), (d3, O2) => {
      var G2;
      return openBlock(), createElementBlock("div", { onClick: E2 }, [
        d3.$slots.trigger && !d3.$slots["dp-input"] && !unref(c2).enabled ? renderSlot(d3.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !d3.$slots.trigger && (!unref(c2).enabled || unref(c2).input) ? (openBlock(), createElementBlock("div", pl, [
          d3.$slots["dp-input"] && !d3.$slots.trigger && !unref(c2).enabled ? renderSlot(d3.$slots, "dp-input", {
            key: 0,
            value: e2.inputValue,
            isMenuOpen: e2.isMenuOpen,
            onInput: Q2,
            onEnter: ae,
            onTab: L2,
            onClear: D2,
            onBlur: f,
            onKeypress: H3,
            onPaste: b2,
            openMenu: () => d3.$emit("open"),
            closeMenu: () => d3.$emit("close"),
            toggleMenu: () => d3.$emit("toggle")
          }) : createCommentVNode("", true),
          d3.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            id: d3.uid ? `dp-input-${d3.uid}` : void 0,
            ref_key: "inputRef",
            ref: I2,
            name: d3.name,
            class: normalizeClass(x2.value),
            inputmode: unref(o).enabled ? "text" : "none",
            placeholder: d3.placeholder,
            disabled: d3.disabled,
            readonly: d3.readonly,
            required: d3.required,
            value: e2.inputValue,
            autocomplete: d3.autocomplete,
            "aria-label": (G2 = unref(i2)) == null ? void 0 : G2.input,
            "aria-disabled": d3.disabled || void 0,
            "aria-invalid": d3.state === false ? true : void 0,
            onInput: Q2,
            onKeydown: [
              withKeys(ae, ["enter"]),
              withKeys(L2, ["tab"]),
              H3
            ],
            onBlur: f,
            onFocus: ie,
            onKeypress: H3,
            onPaste: b2
          }, null, 42, bl)),
          createBaseVNode("div", {
            onClick: O2[2] || (O2[2] = (y3) => a3("toggle"))
          }, [
            d3.$slots["input-icon"] && !d3.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: O2[0] || (O2[0] = (y3) => a3("toggle"))
            }, [
              renderSlot(d3.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !d3.$slots["input-icon"] && !d3.hideInputIcon && !d3.$slots["dp-input"] ? (openBlock(), createBlock(unref(Vt), {
              key: 1,
              class: "dp__input_icon dp__input_icons",
              onClick: O2[1] || (O2[1] = (y3) => a3("toggle"))
            })) : createCommentVNode("", true)
          ]),
          d3.$slots["clear-icon"] && e2.inputValue && d3.clearable && !d3.disabled && !d3.readonly ? (openBlock(), createElementBlock("span", kl, [
            renderSlot(d3.$slots, "clear-icon", { clear: D2 })
          ])) : createCommentVNode("", true),
          d3.clearable && !d3.$slots["clear-icon"] && e2.inputValue && !d3.disabled && !d3.readonly ? (openBlock(), createBlock(unref(Ta), {
            key: 3,
            class: "dp__clear_icon dp__input_icons",
            onClick: O2[3] || (O2[3] = withModifiers((y3) => D2(y3), ["prevent"]))
          })) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var Dl = ["title"];
var Ml = { class: "dp__action_buttons" };
var $l = ["disabled"];
var Tl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ActionRow",
  props: {
    menuMount: { type: Boolean, default: false },
    calendarWidth: { type: Number, default: 0 },
    ...et
  },
  emits: ["close-picker", "select-date", "select-now", "invalid-select"],
  setup(e2, { emit: t2 }) {
    const r = t2, a3 = e2, {
      defaultedActionRow: n,
      defaultedPreviewFormat: o,
      defaultedMultiCalendars: i2,
      defaultedTextInput: c2,
      defaultedInline: p,
      getDefaultPattern: M3
    } = Pe(a3), { isValidTime: $ } = Mt(a3), { buildMatrix: C } = yt(), k2 = ref(null), I2 = ref(null);
    onMounted(() => {
      a3.arrowNavigation && C([_e(k2), _e(I2)], "actionRow");
    });
    const R2 = computed(() => a3.range && !a3.partialRange && a3.internalModelValue ? a3.internalModelValue.length === 2 : true), A = computed(() => !x2.value || !g.value || !R2.value), x2 = computed(() => !a3.enableTimePicker || a3.ignoreTimeValidation ? true : $(a3.internalModelValue)), g = computed(() => a3.monthPicker ? a3.range && Array.isArray(a3.internalModelValue) ? !a3.internalModelValue.filter((f) => !L2(f)).length : L2(a3.internalModelValue) : true), S3 = () => {
      const E2 = o.value;
      return a3.timePicker || a3.monthPicker, E2(Ce(a3.internalModelValue));
    }, F = () => {
      const E2 = a3.internalModelValue;
      return i2.value.count > 0 ? `${b2(E2[0])} - ${b2(E2[1])}` : [b2(E2[0]), b2(E2[1])];
    }, b2 = (E2) => Ea(
      E2,
      o.value,
      a3.formatLocale,
      c2.value.rangeSeparator,
      a3.modelAuto,
      M3()
    ), P = computed(() => !a3.internalModelValue || !a3.menuMount ? "" : typeof o.value == "string" ? Array.isArray(a3.internalModelValue) ? a3.internalModelValue.length === 2 && a3.internalModelValue[1] ? F() : a3.multiDates ? a3.internalModelValue.map((E2) => `${b2(E2)}`) : a3.modelAuto ? `${b2(a3.internalModelValue[0])}` : `${b2(a3.internalModelValue[0])} -` : b2(a3.internalModelValue) : S3()), Q2 = () => a3.multiDates ? "; " : " - ", ae = computed(
      () => Array.isArray(P.value) ? P.value.join(Q2()) : P.value
    ), L2 = (E2) => {
      if (!a3.monthPicker)
        return true;
      let f = true;
      const D2 = B2(Qe(E2));
      if (a3.minDate && a3.maxDate) {
        const H3 = B2(Qe(a3.minDate)), ne = B2(Qe(a3.maxDate));
        return Ee(D2, H3) && Ye(D2, ne) || ke(D2, H3) || ke(D2, ne);
      }
      if (a3.minDate) {
        const H3 = B2(Qe(a3.minDate));
        f = Ee(D2, H3) || ke(D2, H3);
      }
      if (a3.maxDate) {
        const H3 = B2(Qe(a3.maxDate));
        f = Ye(D2, H3) || ke(D2, H3);
      }
      return f;
    }, ie = () => {
      x2.value && g.value && R2.value ? r("select-date") : r("invalid-select");
    };
    return (E2, f) => (openBlock(), createElementBlock("div", {
      class: "dp__action_row",
      style: normalizeStyle(e2.calendarWidth ? { width: `${e2.calendarWidth}px` } : {})
    }, [
      E2.$slots["action-row"] ? renderSlot(E2.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: E2.internalModelValue,
        disabled: A.value,
        selectDate: () => E2.$emit("select-date"),
        closePicker: () => E2.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(n).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: ae.value
        }, [
          E2.$slots["action-preview"] ? renderSlot(E2.$slots, "action-preview", {
            key: 0,
            value: E2.internalModelValue
          }) : createCommentVNode("", true),
          E2.$slots["action-preview"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(ae.value), 1)
          ], 64))
        ], 8, Dl)) : createCommentVNode("", true),
        createBaseVNode("div", Ml, [
          E2.$slots["action-buttons"] ? renderSlot(E2.$slots, "action-buttons", {
            key: 0,
            value: E2.internalModelValue
          }) : createCommentVNode("", true),
          E2.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(p).enabled && unref(n).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              ref_key: "cancelButtonRef",
              ref: k2,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: f[0] || (f[0] = (D2) => E2.$emit("close-picker")),
              onKeydown: [
                f[1] || (f[1] = withKeys((D2) => E2.$emit("close-picker"), ["enter"])),
                f[2] || (f[2] = withKeys((D2) => E2.$emit("close-picker"), ["space"]))
              ]
            }, toDisplayString(E2.cancelText), 545)) : createCommentVNode("", true),
            unref(n).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              ref_key: "cancelButtonRef",
              ref: k2,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: f[3] || (f[3] = (D2) => E2.$emit("select-now")),
              onKeydown: [
                f[4] || (f[4] = withKeys((D2) => E2.$emit("select-now"), ["enter"])),
                f[5] || (f[5] = withKeys((D2) => E2.$emit("select-now"), ["space"]))
              ]
            }, toDisplayString(E2.nowButtonLabel), 545)) : createCommentVNode("", true),
            unref(n).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              ref_key: "selectButtonRef",
              ref: I2,
              type: "button",
              class: "dp__action_button dp__action_select",
              disabled: A.value,
              onKeydown: [
                withKeys(ie, ["enter"]),
                withKeys(ie, ["space"])
              ],
              onClick: ie
            }, toDisplayString(E2.selectText), 41, $l)) : createCommentVNode("", true)
          ], 64))
        ])
      ], 64))
    ], 4));
  }
});
var Al = ["onKeydown"];
var Sl = { class: "dp__selection_grid_header" };
var Pl = ["aria-selected", "aria-disabled", "onClick", "onKeydown", "onMouseover"];
var Cl = ["aria-label"];
var zt = defineComponent({
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
    config: {},
    noOverlayFocus: { type: Boolean },
    focusValue: {}
  },
  emits: ["selected", "toggle", "reset-flow", "hover-value"],
  setup(e2, { expose: t2, emit: r }) {
    const { setSelectionGrid: a3, buildMultiLevelMatrix: n, setMonthPicker: o } = yt(), i2 = r, c2 = e2, { defaultedAriaLabels: p, defaultedTextInput: M3, defaultedConfig: $ } = Pe(
      c2
    ), { hideNavigationButtons: C } = nn(), k2 = ref(false), I2 = ref(null), R2 = ref(null), A = ref([]), x2 = ref(), g = ref(null), S3 = ref(0), F = ref(null);
    onBeforeUpdate(() => {
      I2.value = null;
    }), onMounted(() => {
      nextTick().then(() => f()), c2.noOverlayFocus || P(), b2(true);
    }), onUnmounted(() => b2(false));
    const b2 = (y3) => {
      var l;
      c2.arrowNavigation && ((l = c2.headerRefs) != null && l.length ? o(y3) : a3(y3));
    }, P = () => {
      var l;
      const y3 = _e(R2);
      y3 && (M3.value.enabled || (I2.value ? (l = I2.value) == null || l.focus({ preventScroll: true }) : y3.focus({ preventScroll: true })), k2.value = y3.clientHeight < y3.scrollHeight);
    }, Q2 = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !c2.useRelative,
        "dp--overlay-relative": c2.useRelative
      })
    ), ae = computed(
      () => c2.useRelative ? { height: `${c2.height}px`, width: "260px" } : void 0
    ), L2 = computed(() => ({
      dp__overlay_col: true
    })), ie = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: k2.value,
        dp__button_bottom: c2.isLast
      })
    ), E2 = computed(() => {
      var y3, l;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((y3 = c2.items) == null ? void 0 : y3.length) <= 6,
        dp__container_block: ((l = c2.items) == null ? void 0 : l.length) > 6
      };
    });
    watch(
      () => c2.items,
      () => f(),
      { deep: true }
    );
    const f = () => {
      nextTick().then(() => {
        const y3 = _e(I2), l = _e(R2), h4 = _e(g), s3 = _e(F), X2 = h4 ? h4.getBoundingClientRect().height : 0;
        l && (l.getBoundingClientRect().height ? S3.value = l.getBoundingClientRect().height - X2 : S3.value = $.value.modeHeight - X2), y3 && s3 && (s3.scrollTop = y3.offsetTop - s3.offsetTop - (S3.value / 2 - y3.getBoundingClientRect().height) - X2);
      });
    }, D2 = (y3) => {
      y3.disabled || i2("selected", y3.value);
    }, H3 = () => {
      i2("toggle"), i2("reset-flow");
    }, ne = () => {
      c2.escClose && H3();
    }, _ = (y3, l, h4, s3) => {
      y3 && ((l.active || l.value === c2.focusValue) && (I2.value = y3), c2.arrowNavigation && (Array.isArray(A.value[h4]) ? A.value[h4][s3] = y3 : A.value[h4] = [y3], d3()));
    }, d3 = () => {
      var l, h4;
      const y3 = (l = c2.headerRefs) != null && l.length ? [c2.headerRefs].concat(A.value) : A.value.concat([c2.skipButtonRef ? [] : [g.value]]);
      n(Ce(y3), (h4 = c2.headerRefs) != null && h4.length ? "monthPicker" : "selectionGrid");
    }, O2 = (y3) => {
      c2.arrowNavigation || ft(y3, $.value, true);
    }, G2 = (y3) => {
      x2.value = y3, i2("hover-value", y3);
    };
    return t2({ focusGrid: P }), (y3, l) => {
      var h4;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: R2,
        class: normalizeClass(Q2.value),
        style: normalizeStyle(ae.value),
        role: "dialog",
        tabindex: "0",
        onKeydown: [
          withKeys(withModifiers(ne, ["prevent"]), ["esc"]),
          l[0] || (l[0] = withKeys(withModifiers((s3) => O2(s3), ["prevent"]), ["left"])),
          l[1] || (l[1] = withKeys(withModifiers((s3) => O2(s3), ["prevent"]), ["up"])),
          l[2] || (l[2] = withKeys(withModifiers((s3) => O2(s3), ["prevent"]), ["down"])),
          l[3] || (l[3] = withKeys(withModifiers((s3) => O2(s3), ["prevent"]), ["right"]))
        ]
      }, [
        createBaseVNode("div", {
          ref_key: "containerRef",
          ref: F,
          class: normalizeClass(E2.value),
          role: "grid",
          style: normalizeStyle({ height: `${S3.value}px` })
        }, [
          createBaseVNode("div", Sl, [
            renderSlot(y3.$slots, "header")
          ]),
          y3.$slots.overlay ? renderSlot(y3.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(y3.items, (s3, X2) => (openBlock(), createElementBlock("div", {
            key: X2,
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: y3.items.length >= 3 }]),
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(s3, (de, T2) => (openBlock(), createElementBlock("div", {
              key: de.value,
              ref_for: true,
              ref: (u2) => _(u2, de, X2, T2),
              role: "gridcell",
              class: normalizeClass(L2.value),
              "aria-selected": de.active,
              "aria-disabled": de.disabled || void 0,
              tabindex: "0",
              onClick: (u2) => D2(de),
              onKeydown: [
                withKeys(withModifiers((u2) => D2(de), ["prevent"]), ["enter"]),
                withKeys(withModifiers((u2) => D2(de), ["prevent"]), ["space"])
              ],
              onMouseover: (u2) => G2(de.value)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(de.className)
              }, [
                y3.$slots.item ? renderSlot(y3.$slots, "item", {
                  key: 0,
                  item: de
                }) : createCommentVNode("", true),
                y3.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(de.text), 1)
                ], 64))
              ], 2)
            ], 42, Pl))), 128))
          ], 2))), 128))
        ], 6),
        y3.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "toggleButton",
          ref: g,
          type: "button",
          "aria-label": (h4 = unref(p)) == null ? void 0 : h4.toggleOverlay,
          class: normalizeClass(ie.value),
          tabindex: "0",
          onClick: H3,
          onKeydown: [
            withKeys(H3, ["enter"]),
            withKeys(H3, ["tab"])
          ]
        }, [
          renderSlot(y3.$slots, "button-icon")
        ], 42, Cl)), [
          [vShow, !unref(C)(y3.hideNavigation, y3.type)]
        ]) : createCommentVNode("", true)
      ], 46, Al);
    };
  }
});
var rn = defineComponent({
  __name: "InstanceWrap",
  props: {
    multiCalendars: {},
    stretch: { type: Boolean }
  },
  setup(e2) {
    const t2 = e2, r = computed(
      () => t2.multiCalendars > 0 ? [...Array(t2.multiCalendars).keys()] : [0]
    ), a3 = computed(() => ({
      dp__instance_calendar: t2.multiCalendars > 0
    }));
    return (n, o) => (openBlock(), createElementBlock("div", {
      class: normalizeClass({
        dp__menu_inner: !n.stretch,
        "dp--menu--inner-stretched": n.stretch,
        dp__flex_display: n.multiCalendars > 0
      })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(r.value, (i2, c2) => (openBlock(), createElementBlock("div", {
        key: i2,
        class: normalizeClass(a3.value)
      }, [
        renderSlot(n.$slots, "default", {
          instance: i2,
          index: c2
        })
      ], 2))), 128))
    ], 2));
  }
});
var _l = ["aria-label", "aria-disabled"];
var Nt = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ArrowBtn",
  props: {
    ariaLabel: {},
    disabled: { type: Boolean }
  },
  emits: ["activate", "set-ref"],
  setup(e2, { emit: t2 }) {
    const r = t2, a3 = ref(null);
    return onMounted(() => r("set-ref", a3)), (n, o) => (openBlock(), createElementBlock("button", {
      ref_key: "elRef",
      ref: a3,
      type: "button",
      class: "dp__btn dp--arrow-btn-nav",
      tabindex: "0",
      "aria-label": n.ariaLabel,
      "aria-disabled": n.disabled || void 0,
      onClick: o[0] || (o[0] = (i2) => n.$emit("activate")),
      onKeydown: [
        o[1] || (o[1] = withKeys(withModifiers((i2) => n.$emit("activate"), ["prevent"]), ["enter"])),
        o[2] || (o[2] = withKeys(withModifiers((i2) => n.$emit("activate"), ["prevent"]), ["space"]))
      ]
    }, [
      createBaseVNode("span", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: n.disabled }])
      }, [
        renderSlot(n.$slots, "default")
      ], 2)
    ], 40, _l));
  }
});
var Rl = { class: "dp--year-mode-picker" };
var Ol = ["aria-label"];
var Va = defineComponent({
  __name: "YearModePicker",
  props: {
    ...et,
    showYearPicker: { type: Boolean, default: false },
    items: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    isDisabled: { type: Function, default: () => false }
  },
  emits: ["toggle-year-picker", "year-select", "handle-year"],
  setup(e2, { emit: t2 }) {
    const r = t2, a3 = e2, { showRightIcon: n, showLeftIcon: o } = nn(), { defaultedConfig: i2, defaultedMultiCalendars: c2, defaultedAriaLabels: p, defaultedTransitions: M3 } = Pe(a3), { showTransition: $, transitionName: C } = Lt(M3), k2 = (A = false, x2) => {
      r("toggle-year-picker", { flow: A, show: x2 });
    }, I2 = (A) => {
      r("year-select", A);
    }, R2 = (A = false) => {
      r("handle-year", A);
    };
    return (A, x2) => {
      var g, S3, F;
      return openBlock(), createElementBlock("div", Rl, [
        unref(o)(unref(c2), e2.instance) ? (openBlock(), createBlock(Nt, {
          key: 0,
          ref: "mpPrevIconRef",
          "aria-label": (g = unref(p)) == null ? void 0 : g.prevYear,
          disabled: e2.isDisabled(false),
          onActivate: x2[0] || (x2[0] = (b2) => R2(false))
        }, {
          default: withCtx(() => [
            A.$slots["arrow-left"] ? renderSlot(A.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
            A.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(En), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
        createBaseVNode("button", {
          ref: "mpYearButtonRef",
          class: "dp__btn dp--year-select",
          type: "button",
          "aria-label": (S3 = unref(p)) == null ? void 0 : S3.openYearsOverlay,
          onClick: x2[1] || (x2[1] = () => k2(false)),
          onKeydown: x2[2] || (x2[2] = withKeys(() => k2(false), ["enter"]))
        }, [
          A.$slots.year ? renderSlot(A.$slots, "year", {
            key: 0,
            year: e2.year
          }) : createCommentVNode("", true),
          A.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(e2.year), 1)
          ], 64))
        ], 40, Ol),
        unref(n)(unref(c2), e2.instance) ? (openBlock(), createBlock(Nt, {
          key: 1,
          ref: "mpNextIconRef",
          "aria-label": (F = unref(p)) == null ? void 0 : F.nextYear,
          disabled: e2.isDisabled(true),
          onActivate: x2[3] || (x2[3] = (b2) => R2(true))
        }, {
          default: withCtx(() => [
            A.$slots["arrow-right"] ? renderSlot(A.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
            A.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Fn), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(C)(e2.showYearPicker),
          css: unref($)
        }, {
          default: withCtx(() => [
            e2.showYearPicker ? (openBlock(), createBlock(zt, {
              key: 0,
              items: e2.items,
              "text-input": A.textInput,
              "esc-close": A.escClose,
              config: A.config,
              "is-last": A.autoApply && !unref(i2).keepActionRow,
              type: "year",
              onToggle: k2,
              onSelected: x2[4] || (x2[4] = (b2) => I2(b2))
            }, createSlots({
              "button-icon": withCtx(() => [
                A.$slots["calendar-icon"] ? renderSlot(A.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                A.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Vt), { key: 1 }))
              ]),
              _: 2
            }, [
              A.$slots["year-overlay-value"] ? {
                name: "item",
                fn: withCtx(({ item: b2 }) => [
                  renderSlot(A.$slots, "year-overlay-value", {
                    text: b2.text,
                    value: b2.value
                  })
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["items", "text-input", "esc-close", "config", "is-last"])) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var Gn = (e2, t2, r) => {
  if (t2.value && Array.isArray(t2.value))
    if (t2.value.some((a3) => ke(e2, a3))) {
      const a3 = t2.value.filter((n) => !ke(n, e2));
      t2.value = a3.length ? a3 : null;
    } else
      (r && +r > t2.value.length || !r) && t2.value.push(e2);
  else
    t2.value = [e2];
};
var qn = (e2, t2, r) => {
  let a3 = e2.value ? e2.value.slice() : [];
  return a3.length === 2 && a3[1] !== null && (a3 = []), a3.length ? Ye(t2, a3[0]) ? (a3.unshift(t2), r("range-start", a3[0]), r("range-start", a3[1])) : (a3[1] = t2, r("range-end", t2)) : (a3 = [t2], r("range-start", t2)), e2.value = a3, a3;
};
var ln = (e2, t2, r, a3) => {
  e2[0] && e2[1] && r && t2("auto-apply"), e2[0] && !e2[1] && a3 && r && t2("auto-apply");
};
var La = (e2) => {
  Array.isArray(e2.value) && e2.value.length <= 2 && e2.range ? e2.modelValue.value = e2.value.map((t2) => xe(B2(t2), e2.timezone)) : Array.isArray(e2.value) || (e2.modelValue.value = xe(B2(e2.value), e2.timezone));
};
var Ua = ({
  multiCalendars: e2,
  highlight: t2,
  calendars: r,
  modelValue: a3,
  props: n,
  year: o,
  month: i2,
  emit: c2
}) => {
  const p = computed(() => jn(n.yearRange, n.reverseYears)), M3 = ref([false]), $ = computed(() => (b2, P) => {
    const Q2 = set(Qe(/* @__PURE__ */ new Date()), {
      month: i2.value(b2),
      year: o.value(b2)
    });
    return Ba(Q2, n.maxDate, n.minDate, n.preventMinMaxNavigation, P);
  }), C = () => {
    for (let b2 = 0; b2 < e2.value.count; b2++)
      if (b2 === 0)
        r.value[b2] = r.value[0];
      else {
        const P = set(B2(), r.value[b2 - 1]);
        r.value[b2] = { month: getMonth(P), year: getYear(addYears(P, 1)) };
      }
  }, k2 = (b2) => {
    if (!b2)
      return C();
    const P = set(B2(), r.value[b2]);
    return r.value[0].year = getYear(subYears(P, e2.value.count - 1)), C();
  }, I2 = (b2) => n.focusStartDate ? b2[0] : b2[1] ? b2[1] : b2[0], R2 = () => {
    if (a3.value) {
      const b2 = Array.isArray(a3.value) ? I2(a3.value) : a3.value;
      r.value[0] = { month: getMonth(b2), year: getYear(b2) };
    }
  };
  onMounted(() => {
    R2(), e2.value.count && C();
  });
  const A = (b2, P) => {
    r.value[P].year = b2, e2.value.count && !e2.value.solo && k2(P);
  }, x2 = computed(() => (b2) => Ct(p.value, (P) => {
    const Q2 = o.value(b2) === P.value, ae = Ft(P.value, _t(n.minDate), _t(n.maxDate)), L2 = Kn(t2.value, P.value);
    return { active: Q2, disabled: ae, highlighted: L2 };
  })), g = (b2, P) => {
    A(b2, P), F(P);
  }, S3 = (b2, P = false) => {
    if (!$.value(b2, P)) {
      const Q2 = P ? o.value(b2) + 1 : o.value(b2) - 1;
      A(Q2, b2);
    }
  }, F = (b2, P = false, Q2) => {
    P || c2("reset-flow"), Q2 !== void 0 ? M3.value[b2] = Q2 : M3.value[b2] = !M3.value[b2], M3.value || c2("overlay-closed");
  };
  return {
    isDisabled: $,
    groupedYears: x2,
    showYearPicker: M3,
    selectYear: A,
    toggleYearPicker: F,
    handleYearSelect: g,
    handleYear: S3
  };
};
var Yl = (e2, t2) => {
  const { defaultedMultiCalendars: r, defaultedAriaLabels: a3, defaultedTransitions: n, defaultedConfig: o, defaultedHighlight: i2 } = Pe(e2), { modelValue: c2, year: p, month: M3, calendars: $ } = Ut(e2, t2), C = computed(() => Ca(e2.formatLocale, e2.locale, e2.monthNameFormat)), k2 = ref(null), {
    selectYear: I2,
    groupedYears: R2,
    showYearPicker: A,
    toggleYearPicker: x2,
    handleYearSelect: g,
    handleYear: S3,
    isDisabled: F
  } = Ua({
    modelValue: c2,
    multiCalendars: r,
    highlight: i2,
    calendars: $,
    year: p,
    month: M3,
    props: e2,
    emit: t2
  });
  onMounted(() => {
    e2.startDate && (c2.value && e2.focusStartDate || !c2.value) && I2(getYear(B2(e2.startDate)), 0);
  });
  const b2 = (y3) => y3 ? { month: getMonth(y3), year: getYear(y3) } : { month: null, year: null }, P = () => c2.value ? Array.isArray(c2.value) ? c2.value.map((y3) => b2(y3)) : b2(c2.value) : b2(), Q2 = (y3, l) => {
    const h4 = $.value[y3], s3 = P();
    return Array.isArray(s3) ? s3.some((X2) => X2.year === (h4 == null ? void 0 : h4.year) && X2.month === l) : (h4 == null ? void 0 : h4.year) === s3.year && l === s3.month;
  }, ae = (y3, l, h4) => {
    var X2, de;
    const s3 = P();
    return Array.isArray(s3) ? p.value(l) === ((X2 = s3[h4]) == null ? void 0 : X2.year) && y3 === ((de = s3[h4]) == null ? void 0 : de.month) : false;
  }, L2 = (y3, l) => {
    if (e2.range) {
      const h4 = P();
      if (Array.isArray(c2.value) && Array.isArray(h4)) {
        const s3 = ae(y3, l, 0) || ae(y3, l, 1), X2 = st(Qe(B2()), y3, p.value(l));
        return tn(c2.value, k2.value, X2) && !s3;
      }
      return false;
    }
    return false;
  }, ie = computed(() => (y3) => Ct(C.value, (l) => {
    const h4 = Q2(y3, l.value), s3 = Ft(
      l.value,
      Ra(p.value(y3), e2.minDate),
      Oa(p.value(y3), e2.maxDate)
    ) || xr(e2.disabledDates, p.value(y3)).includes(l.value), X2 = L2(l.value, y3), de = Fa(i2.value, l.value, p.value(y3));
    return { active: h4, disabled: s3, isBetween: X2, highlighted: de };
  })), E2 = (y3, l) => st(Qe(B2()), y3, p.value(l)), f = (y3, l) => {
    const h4 = c2.value ? c2.value : Qe(/* @__PURE__ */ new Date());
    c2.value = st(h4, y3, p.value(l)), t2("auto-apply");
  }, D2 = (y3, l) => {
    const h4 = qn(c2, E2(y3, l), t2);
    ln(h4, t2, e2.autoApply, e2.modelAuto);
  }, H3 = (y3, l) => {
    Gn(E2(y3, l), c2, e2.multiDatesLimit), t2("auto-apply", true);
  }, ne = (y3, l) => ($.value[l].month = y3, d3(l, $.value[l].year, y3), e2.multiDates ? H3(y3, l) : e2.range ? D2(y3, l) : f(y3, l)), _ = (y3, l) => {
    I2(y3, l), d3(l, y3, null);
  }, d3 = (y3, l, h4) => {
    let s3 = h4;
    if (!s3) {
      const X2 = P();
      s3 = Array.isArray(X2) ? X2[y3].month : X2.month;
    }
    t2("update-month-year", { instance: y3, year: l, month: s3 });
  };
  return {
    groupedMonths: ie,
    groupedYears: R2,
    year: p,
    isDisabled: F,
    defaultedMultiCalendars: r,
    defaultedAriaLabels: a3,
    defaultedTransitions: n,
    defaultedConfig: o,
    showYearPicker: A,
    modelValue: c2,
    presetDate: (y3, l) => {
      La({ value: y3, modelValue: c2, range: e2.range, timezone: l ? void 0 : e2.timezone }), t2("auto-apply");
    },
    setHoverDate: (y3, l) => {
      k2.value = E2(y3, l);
    },
    selectMonth: ne,
    selectYear: _,
    toggleYearPicker: x2,
    handleYearSelect: g,
    handleYear: S3,
    getModelMonthYear: P
  };
};
var Nl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "MonthPicker",
  props: {
    ...et
  },
  emits: [
    "update:internal-model-value",
    "overlay-closed",
    "reset-flow",
    "range-start",
    "range-end",
    "auto-apply",
    "update-month-year",
    "mount"
  ],
  setup(e2, { expose: t2, emit: r }) {
    const a3 = r, n = useSlots(), o = Ke(n, "yearMode"), i2 = e2;
    onMounted(() => {
      i2.shadow || a3("mount", null);
    });
    const {
      groupedMonths: c2,
      groupedYears: p,
      year: M3,
      isDisabled: $,
      defaultedMultiCalendars: C,
      defaultedConfig: k2,
      showYearPicker: I2,
      modelValue: R2,
      presetDate: A,
      setHoverDate: x2,
      selectMonth: g,
      selectYear: S3,
      toggleYearPicker: F,
      handleYearSelect: b2,
      handleYear: P,
      getModelMonthYear: Q2
    } = Yl(i2, a3);
    return t2({ getSidebarProps: () => ({
      modelValue: R2,
      year: M3,
      getModelMonthYear: Q2,
      selectMonth: g,
      selectYear: S3,
      handleYear: P
    }), presetDate: A, toggleYearPicker: (L2) => F(0, L2) }), (L2, ie) => (openBlock(), createBlock(rn, {
      "multi-calendars": unref(C).count,
      stretch: ""
    }, {
      default: withCtx(({ instance: E2 }) => [
        L2.$slots["month-year"] ? renderSlot(L2.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, {
          year: unref(M3),
          months: unref(c2)(E2),
          years: unref(p)(E2),
          selectMonth: unref(g),
          selectYear: unref(S3),
          instance: E2
        }))) : (openBlock(), createBlock(zt, {
          key: 1,
          items: unref(c2)(E2),
          "arrow-navigation": L2.arrowNavigation,
          "is-last": L2.autoApply && !unref(k2).keepActionRow,
          "esc-close": L2.escClose,
          height: unref(k2).modeHeight,
          config: L2.config,
          "no-overlay-focus": L2.noOverlayFocus,
          "use-relative": "",
          type: "month",
          onSelected: (f) => unref(g)(f, E2),
          onHoverValue: (f) => unref(x2)(f, E2)
        }, {
          header: withCtx(() => [
            createVNode(Va, mergeProps(L2.$props, {
              items: unref(p)(E2),
              instance: E2,
              "show-year-picker": unref(I2)[E2],
              year: unref(M3)(E2),
              "is-disabled": (f) => unref($)(E2, f),
              onHandleYear: (f) => unref(P)(E2, f),
              onYearSelect: (f) => unref(b2)(f, E2),
              onToggleYearPicker: (f) => unref(F)(E2, f == null ? void 0 : f.flow, f == null ? void 0 : f.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(o), (f, D2) => ({
                name: f,
                fn: withCtx((H3) => [
                  renderSlot(L2.$slots, f, normalizeProps(guardReactiveProps(H3)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          _: 2
        }, 1032, ["items", "arrow-navigation", "is-last", "esc-close", "height", "config", "no-overlay-focus", "onSelected", "onHoverValue"]))
      ]),
      _: 3
    }, 8, ["multi-calendars"]));
  }
});
var Il = (e2, t2) => {
  const { modelValue: r } = Ut(e2, t2), a3 = ref(null), { defaultedHighlight: n } = Pe(e2), o = ref();
  onMounted(() => {
    e2.startDate && (r.value && e2.focusStartDate || !r.value) && (o.value = getYear(B2(e2.startDate)));
  });
  const i2 = (k2) => Array.isArray(r.value) ? r.value.some((I2) => getYear(I2) === k2) : r.value ? getYear(r.value) === k2 : false, c2 = (k2) => e2.range && Array.isArray(r.value) ? tn(r.value, a3.value, M3(k2)) : false, p = computed(() => Ct(jn(e2.yearRange, e2.reverseYears), (k2) => {
    const I2 = i2(k2.value), R2 = Ft(k2.value, _t(e2.minDate), _t(e2.maxDate)), A = c2(k2.value), x2 = Kn(n.value, k2.value);
    return { active: I2, disabled: R2, isBetween: A, highlighted: x2 };
  })), M3 = (k2) => setYear(Qe(/* @__PURE__ */ new Date()), k2);
  return {
    groupedYears: p,
    modelValue: r,
    focusYear: o,
    setHoverValue: (k2) => {
      a3.value = setYear(Qe(/* @__PURE__ */ new Date()), k2);
    },
    selectYear: (k2) => {
      var I2;
      if (e2.multiDates)
        return r.value ? Array.isArray(r.value) && (((I2 = r.value) == null ? void 0 : I2.map((A) => getYear(A))).includes(k2) ? r.value = r.value.filter((A) => getYear(A) !== k2) : r.value.push(setYear(je(B2()), k2))) : r.value = [setYear(je(B2()), k2)], t2("auto-apply", true);
      if (e2.range) {
        const R2 = qn(r, M3(k2), t2);
        return ln(R2, t2, e2.autoApply, e2.modelAuto);
      }
      r.value = M3(k2), t2("auto-apply");
    }
  };
};
var Bl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "YearPicker",
  props: {
    ...et
  },
  emits: ["update:internal-model-value", "reset-flow", "range-start", "range-end", "auto-apply"],
  setup(e2, { expose: t2, emit: r }) {
    const a3 = r, n = e2, { groupedYears: o, modelValue: i2, focusYear: c2, selectYear: p, setHoverValue: M3 } = Il(n, a3), { defaultedConfig: $ } = Pe(n);
    return t2({ getSidebarProps: () => ({
      modelValue: i2,
      selectYear: p
    }) }), (k2, I2) => (openBlock(), createElementBlock("div", null, [
      k2.$slots["month-year"] ? renderSlot(k2.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, {
        years: unref(o),
        selectYear: unref(p)
      }))) : (openBlock(), createBlock(zt, {
        key: 1,
        items: unref(o),
        "is-last": k2.autoApply && !unref($).keepActionRow,
        height: unref($).modeHeight,
        config: k2.config,
        "no-overlay-focus": k2.noOverlayFocus,
        "focus-value": unref(c2),
        type: "year",
        "use-relative": "",
        onSelected: unref(p),
        onHoverValue: unref(M3)
      }, createSlots({ _: 2 }, [
        k2.$slots["year-overlay-value"] ? {
          name: "item",
          fn: withCtx(({ item: R2 }) => [
            renderSlot(k2.$slots, "year-overlay-value", {
              text: R2.text,
              value: R2.value
            })
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["items", "is-last", "height", "config", "no-overlay-focus", "focus-value", "onSelected", "onHoverValue"]))
    ]));
  }
});
var El = {
  key: 0,
  class: "dp__time_input"
};
var Fl = ["aria-label", "onKeydown", "onClick"];
var Hl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var Vl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var Ll = ["aria-label", "disabled", "onKeydown", "onClick"];
var Ul = ["aria-label", "onKeydown", "onClick"];
var zl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var Wl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var jl = { key: 0 };
var Kl = ["aria-label", "onKeydown"];
var Gl = defineComponent({
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
    validateTime: { type: Function, default: () => false },
    ...et
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
  setup(e2, { expose: t2, emit: r }) {
    const a3 = r, n = e2, { setTimePickerElements: o, setTimePickerBackRef: i2 } = yt(), { defaultedAriaLabels: c2, defaultedTransitions: p, defaultedFilters: M3, defaultedConfig: $ } = Pe(n), { transitionName: C, showTransition: k2 } = Lt(p), I2 = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), R2 = ref("AM"), A = ref(null), x2 = ref([]);
    onMounted(() => {
      a3("mounted");
    });
    const g = (u2) => set(/* @__PURE__ */ new Date(), {
      hours: u2.hours,
      minutes: u2.minutes,
      seconds: n.enableSeconds ? u2.seconds : 0,
      milliseconds: 0
    }), S3 = computed(
      () => (u2) => ne(u2, n[u2]) || b2(u2, n[u2])
    ), F = computed(() => ({ hours: n.hours, minutes: n.minutes, seconds: n.seconds })), b2 = (u2, N) => n.range && !n.disableTimeRangeValidation ? !n.validateTime(u2, N) : false, P = (u2, N) => {
      if (n.range && !n.disableTimeRangeValidation) {
        const q2 = N ? +n[`${u2}Increment`] : -+n[`${u2}Increment`], K2 = n[u2] + q2;
        return !n.validateTime(u2, K2);
      }
      return false;
    }, Q2 = computed(() => (u2) => !d3(+n[u2] + +n[`${u2}Increment`], u2) || P(u2, true)), ae = computed(() => (u2) => !d3(+n[u2] - +n[`${u2}Increment`], u2) || P(u2, false)), L2 = (u2, N) => add(set(B2(), u2), N), ie = (u2, N) => sub(set(B2(), u2), N), E2 = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !n.timePickerInline,
        dp__time_col_reg_block: !n.enableSeconds && n.is24 && !n.timePickerInline,
        dp__time_col_reg_inline: !n.enableSeconds && n.is24 && n.timePickerInline,
        dp__time_col_reg_with_button: !n.enableSeconds && !n.is24,
        dp__time_col_sec: n.enableSeconds && n.is24,
        dp__time_col_sec_with_button: n.enableSeconds && !n.is24
      })
    ), f = computed(() => {
      const u2 = [{ type: "hours" }, { type: "", separator: true }, { type: "minutes" }];
      return n.enableSeconds ? u2.concat([{ type: "", separator: true }, { type: "seconds" }]) : u2;
    }), D2 = computed(() => f.value.filter((u2) => !u2.separator)), H3 = computed(() => (u2) => {
      if (u2 === "hours") {
        const N = h4(+n.hours);
        return { text: N < 10 ? `0${N}` : `${N}`, value: N };
      }
      return { text: n[u2] < 10 ? `0${n[u2]}` : `${n[u2]}`, value: n[u2] };
    }), ne = (u2, N) => {
      var K2;
      if (!n.disabledTimesConfig)
        return false;
      const q2 = n.disabledTimesConfig(n.order, u2 === "hours" ? N : void 0);
      return q2[u2] ? !!((K2 = q2[u2]) != null && K2.includes(N)) : true;
    }, _ = (u2) => {
      const N = n.is24 ? 24 : 12, q2 = u2 === "hours" ? N : 60, K2 = +n[`${u2}GridIncrement`], te = u2 === "hours" && !n.is24 ? K2 : 0, re = [];
      for (let be = te; be < q2; be += K2)
        re.push({ value: be, text: be < 10 ? `0${be}` : `${be}` });
      return u2 === "hours" && !n.is24 && re.push({ value: 0, text: "12" }), Ct(re, (be) => ({ active: false, disabled: M3.value.times[u2].includes(be.value) || !d3(be.value, u2) || ne(u2, be.value) || b2(u2, be.value) }));
    }, d3 = (u2, N) => {
      const q2 = n.minTime ? g(yn(n.minTime)) : null, K2 = n.maxTime ? g(yn(n.maxTime)) : null, te = g(yn(F.value, N, u2));
      return q2 && K2 ? (isBefore(te, K2) || isEqual(te, K2)) && (isAfter(te, q2) || isEqual(te, q2)) : q2 ? isAfter(te, q2) || isEqual(te, q2) : K2 ? isBefore(te, K2) || isEqual(te, K2) : true;
    }, O2 = (u2) => n[`no${u2[0].toUpperCase() + u2.slice(1)}Overlay`], G2 = (u2) => {
      O2(u2) || (I2[u2] = !I2[u2], I2[u2] || a3("overlay-closed"));
    }, y3 = (u2) => u2 === "hours" ? getHours : u2 === "minutes" ? getMinutes : getSeconds, l = (u2, N = true) => {
      const q2 = N ? L2 : ie, K2 = N ? +n[`${u2}Increment`] : -+n[`${u2}Increment`];
      d3(+n[u2] + K2, u2) && a3(
        `update:${u2}`,
        y3(u2)(q2({ [u2]: +n[u2] }, { [u2]: +n[`${u2}Increment`] }))
      );
    }, h4 = (u2) => n.is24 ? u2 : (u2 >= 12 ? R2.value = "PM" : R2.value = "AM", Hr(u2)), s3 = () => {
      R2.value === "PM" ? (R2.value = "AM", a3("update:hours", n.hours - 12)) : (R2.value = "PM", a3("update:hours", n.hours + 12)), a3("am-pm-change", R2.value);
    }, X2 = (u2) => {
      I2[u2] = true;
    }, de = (u2, N, q2) => {
      if (u2 && n.arrowNavigation) {
        Array.isArray(x2.value[N]) ? x2.value[N][q2] = u2 : x2.value[N] = [u2];
        const K2 = x2.value.reduce(
          (te, re) => re.map((be, Y2) => [...te[Y2] || [], re[Y2]]),
          []
        );
        i2(n.closeTimePickerBtn), A.value && (K2[1] = K2[1].concat(A.value)), o(K2, n.order);
      }
    }, T2 = (u2, N) => (G2(u2), u2 === "hours" && !n.is24 ? a3(`update:${u2}`, R2.value === "PM" ? N + 12 : N) : a3(`update:${u2}`, N));
    return t2({ openChildCmp: X2 }), (u2, N) => {
      var q2;
      return u2.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", El, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(f.value, (K2, te) => {
          var re, be, Y2;
          return openBlock(), createElementBlock("div", {
            key: te,
            class: normalizeClass(E2.value)
          }, [
            K2.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(" : ")
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                ref_for: true,
                ref: (U) => de(U, te, 0),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !u2.timePickerInline,
                  dp__inc_dec_button_inline: u2.timePickerInline,
                  dp__tp_inline_btn_top: u2.timePickerInline,
                  dp__inc_dec_button_disabled: Q2.value(K2.type)
                }),
                "aria-label": (re = unref(c2)) == null ? void 0 : re.incrementValue(K2.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((U) => l(K2.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((U) => l(K2.type), ["prevent"]), ["space"])
                ],
                onClick: (U) => l(K2.type)
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  Hl,
                  Vl
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  u2.$slots["arrow-up"] ? renderSlot(u2.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  u2.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Vn), { key: 1 }))
                ], 64))
              ], 42, Fl),
              createBaseVNode("button", {
                ref_for: true,
                ref: (U) => de(U, te, 1),
                type: "button",
                "aria-label": (be = unref(c2)) == null ? void 0 : be.openTpOverlay(K2.type),
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !u2.timePickerInline,
                  dp__time_display_inline: u2.timePickerInline,
                  "dp--time-invalid": S3.value(K2.type),
                  "dp--time-overlay-btn": !S3.value(K2.type)
                }),
                disabled: O2(K2.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((U) => G2(K2.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((U) => G2(K2.type), ["prevent"]), ["space"])
                ],
                onClick: (U) => G2(K2.type)
              }, [
                u2.$slots[K2.type] ? renderSlot(u2.$slots, K2.type, {
                  key: 0,
                  text: H3.value(K2.type).text,
                  value: H3.value(K2.type).value
                }) : createCommentVNode("", true),
                u2.$slots[K2.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(H3.value(K2.type).text), 1)
                ], 64))
              ], 42, Ll),
              createBaseVNode("button", {
                ref_for: true,
                ref: (U) => de(U, te, 2),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !u2.timePickerInline,
                  dp__inc_dec_button_inline: u2.timePickerInline,
                  dp__tp_inline_btn_bottom: u2.timePickerInline,
                  dp__inc_dec_button_disabled: ae.value(K2.type)
                }),
                "aria-label": (Y2 = unref(c2)) == null ? void 0 : Y2.decrementValue(K2.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((U) => l(K2.type, false), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((U) => l(K2.type, false), ["prevent"]), ["space"])
                ],
                onClick: (U) => l(K2.type, false)
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  zl,
                  Wl
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  u2.$slots["arrow-down"] ? renderSlot(u2.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                  u2.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ln), { key: 1 }))
                ], 64))
              ], 42, Ul)
            ], 64))
          ], 2);
        }), 128)),
        u2.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", jl, [
          u2.$slots["am-pm-button"] ? renderSlot(u2.$slots, "am-pm-button", {
            key: 0,
            toggle: s3,
            value: R2.value
          }) : createCommentVNode("", true),
          u2.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: A,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (q2 = unref(c2)) == null ? void 0 : q2.amPmButton,
            tabindex: "0",
            onClick: s3,
            onKeydown: [
              withKeys(withModifiers(s3, ["prevent"]), ["enter"]),
              withKeys(withModifiers(s3, ["prevent"]), ["space"])
            ]
          }, toDisplayString(R2.value), 41, Kl))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(D2.value, (K2, te) => (openBlock(), createBlock(Transition, {
          key: te,
          name: unref(C)(I2[K2.type]),
          css: unref(k2)
        }, {
          default: withCtx(() => [
            I2[K2.type] ? (openBlock(), createBlock(zt, {
              key: 0,
              items: _(K2.type),
              "is-last": u2.autoApply && !unref($).keepActionRow,
              "esc-close": u2.escClose,
              type: K2.type,
              "text-input": u2.textInput,
              config: u2.config,
              "arrow-navigation": u2.arrowNavigation,
              onSelected: (re) => T2(K2.type, re),
              onToggle: (re) => G2(K2.type),
              onResetFlow: N[0] || (N[0] = (re) => u2.$emit("reset-flow"))
            }, createSlots({
              "button-icon": withCtx(() => [
                u2.$slots["clock-icon"] ? renderSlot(u2.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                u2.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Hn), { key: 1 }))
              ]),
              _: 2
            }, [
              u2.$slots[`${K2.type}-overlay-value`] ? {
                name: "item",
                fn: withCtx(({ item: re }) => [
                  renderSlot(u2.$slots, `${K2.type}-overlay-value`, {
                    text: re.text,
                    value: re.value
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
var ql = { class: "dp--tp-wrap" };
var Zl = ["aria-label", "tabindex"];
var Ql = ["tabindex"];
var Xl = ["aria-label"];
var za = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePicker",
  props: {
    hours: { type: [Number, Array], default: 0 },
    minutes: { type: [Number, Array], default: 0 },
    seconds: { type: [Number, Array], default: 0 },
    disabledTimesConfig: { type: Function, default: null },
    validateTime: {
      type: Function,
      default: () => false
    },
    ...et
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
  setup(e2, { expose: t2, emit: r }) {
    const a3 = r, n = e2, { buildMatrix: o, setTimePicker: i2 } = yt(), c2 = useSlots(), { defaultedTransitions: p, defaultedAriaLabels: M3, defaultedTextInput: $, defaultedConfig: C } = Pe(n), { transitionName: k2, showTransition: I2 } = Lt(p), { hideNavigationButtons: R2 } = nn(), A = ref(null), x2 = ref(null), g = ref([]), S3 = ref(null);
    onMounted(() => {
      a3("mount"), !n.timePicker && n.arrowNavigation ? o([_e(A.value)], "time") : i2(true, n.timePicker);
    });
    const F = computed(() => n.range && n.modelAuto ? _a(n.internalModelValue) : true), b2 = ref(false), P = (_) => ({
      hours: Array.isArray(n.hours) ? n.hours[_] : n.hours,
      minutes: Array.isArray(n.minutes) ? n.minutes[_] : n.minutes,
      seconds: Array.isArray(n.seconds) ? n.seconds[_] : n.seconds
    }), Q2 = computed(() => {
      const _ = [];
      if (n.range)
        for (let d3 = 0; d3 < 2; d3++)
          _.push(P(d3));
      else
        _.push(P(0));
      return _;
    }), ae = (_, d3 = false, O2 = "") => {
      d3 || a3("reset-flow"), b2.value = _, a3(_ ? "overlay-opened" : "overlay-closed"), n.arrowNavigation && i2(_), nextTick(() => {
        O2 !== "" && g.value[0] && g.value[0].openChildCmp(O2);
      });
    }, L2 = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: n.autoApply && !C.value.keepActionRow
    })), ie = Ke(c2, "timePicker"), E2 = (_, d3, O2) => n.range ? d3 === 0 ? [_, Q2.value[1][O2]] : [Q2.value[0][O2], _] : _, f = (_) => {
      a3("update:hours", _);
    }, D2 = (_) => {
      a3("update:minutes", _);
    }, H3 = (_) => {
      a3("update:seconds", _);
    }, ne = () => {
      if (S3.value && !$.value.enabled && !n.noOverlayFocus) {
        const _ = Lr(S3.value);
        _ && _.focus({ preventScroll: true });
      }
    };
    return t2({ toggleTimePicker: ae }), (_, d3) => {
      var O2;
      return openBlock(), createElementBlock("div", ql, [
        !_.timePicker && !_.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "openTimePickerBtn",
          ref: A,
          type: "button",
          class: normalizeClass(L2.value),
          "aria-label": (O2 = unref(M3)) == null ? void 0 : O2.openTimePicker,
          tabindex: _.noOverlayFocus ? void 0 : 0,
          onKeydown: [
            d3[0] || (d3[0] = withKeys((G2) => ae(true), ["enter"])),
            d3[1] || (d3[1] = withKeys((G2) => ae(true), ["space"]))
          ],
          onClick: d3[2] || (d3[2] = (G2) => ae(true))
        }, [
          _.$slots["clock-icon"] ? renderSlot(_.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          _.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Hn), { key: 1 }))
        ], 42, Zl)), [
          [vShow, !unref(R2)(_.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(k2)(b2.value),
          css: unref(I2) && !_.timePickerInline
        }, {
          default: withCtx(() => {
            var G2;
            return [
              b2.value || _.timePicker || _.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "overlayRef",
                ref: S3,
                class: normalizeClass({
                  dp__overlay: !_.timePickerInline,
                  "dp--overlay-absolute": !n.timePicker && !_.timePickerInline,
                  "dp--overlay-relative": n.timePicker
                }),
                style: normalizeStyle(_.timePicker ? { height: `${unref(C).modeHeight}px` } : void 0),
                tabindex: _.timePickerInline ? void 0 : 0
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(
                    _.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
                  ),
                  style: { display: "flex" }
                }, [
                  _.$slots["time-picker-overlay"] ? renderSlot(_.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e2.hours,
                    minutes: e2.minutes,
                    seconds: e2.seconds,
                    setHours: f,
                    setMinutes: D2,
                    setSeconds: H3
                  }) : createCommentVNode("", true),
                  _.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(_.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(Q2.value, (y3, l) => withDirectives((openBlock(), createBlock(Gl, mergeProps({ key: l }, {
                      ..._.$props,
                      order: l,
                      hours: y3.hours,
                      minutes: y3.minutes,
                      seconds: y3.seconds,
                      closeTimePickerBtn: x2.value,
                      disabledTimesConfig: e2.disabledTimesConfig,
                      disabled: l === 0 ? _.fixedStart : _.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: g,
                      "validate-time": (h4, s3) => e2.validateTime(h4, E2(s3, l, h4)),
                      "onUpdate:hours": (h4) => f(E2(h4, l, "hours")),
                      "onUpdate:minutes": (h4) => D2(E2(h4, l, "minutes")),
                      "onUpdate:seconds": (h4) => H3(E2(h4, l, "seconds")),
                      onMounted: ne,
                      onOverlayClosed: ne,
                      onAmPmChange: d3[3] || (d3[3] = (h4) => _.$emit("am-pm-change", h4))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(ie), (h4, s3) => ({
                        name: h4,
                        fn: withCtx((X2) => [
                          renderSlot(_.$slots, h4, normalizeProps(guardReactiveProps(X2)))
                        ])
                      }))
                    ]), 1040, ["validate-time", "onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, l === 0 ? true : F.value]
                    ])), 128))
                  ], 2)),
                  !_.timePicker && !_.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: x2,
                    type: "button",
                    class: normalizeClass(L2.value),
                    "aria-label": (G2 = unref(M3)) == null ? void 0 : G2.closeTimePicker,
                    tabindex: "0",
                    onKeydown: [
                      d3[4] || (d3[4] = withKeys((y3) => ae(false), ["enter"])),
                      d3[5] || (d3[5] = withKeys((y3) => ae(false), ["space"]))
                    ],
                    onClick: d3[6] || (d3[6] = (y3) => ae(false))
                  }, [
                    _.$slots["calendar-icon"] ? renderSlot(_.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    _.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Vt), { key: 1 }))
                  ], 42, Xl)), [
                    [vShow, !unref(R2)(_.hideNavigation, "time")]
                  ]) : createCommentVNode("", true)
                ], 2)
              ], 14, Ql)) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var Wa = (e2, t2, r, a3) => {
  const n = (g, S3) => Array.isArray(t2[g]) ? t2[g][S3] : t2[g], o = (g) => e2.enableSeconds ? Array.isArray(t2.seconds) ? t2.seconds[g] : t2.seconds : 0, i2 = (g, S3) => g ? S3 !== void 0 ? vt(g, n("hours", S3), n("minutes", S3), o(S3)) : vt(g, t2.hours, t2.minutes, o()) : setSeconds(B2(), o(S3)), c2 = (g, S3) => {
    t2[g] = S3;
  }, p = (g, S3) => {
    const F = Object.fromEntries(
      Object.keys(t2).map((b2) => b2 === g ? [b2, S3] : [b2, t2[b2]].slice())
    );
    if (e2.range && !e2.disableTimeRangeValidation) {
      const b2 = (Q2) => r.value ? vt(
        r.value[Q2],
        F.hours[Q2],
        F.minutes[Q2],
        F.seconds[Q2]
      ) : null, P = (Q2) => setMilliseconds(r.value[Q2], 0);
      return !(ke(b2(0), b2(1)) && (isAfter(b2(0), P(1)) || isBefore(b2(1), P(0))));
    }
    return true;
  }, M3 = (g, S3) => {
    p(g, S3) && (c2(g, S3), a3 && a3());
  }, $ = (g) => {
    M3("hours", g);
  }, C = (g) => {
    M3("minutes", g);
  }, k2 = (g) => {
    M3("seconds", g);
  }, I2 = (g, S3, F, b2) => {
    S3 && $(g), !S3 && !F && C(g), F && k2(g), r.value && b2(r.value);
  }, R2 = (g) => {
    if (g) {
      const S3 = Array.isArray(g), F = S3 ? [+g[0].hours, +g[1].hours] : +g.hours, b2 = S3 ? [+g[0].minutes, +g[1].minutes] : +g.minutes, P = S3 ? [+g[0].seconds, +g[1].seconds] : +g.seconds;
      c2("hours", F), c2("minutes", b2), e2.enableSeconds && c2("seconds", P);
    }
  }, A = (g, S3) => {
    const F = {
      hours: Array.isArray(t2.hours) ? t2.hours[g] : t2.hours,
      disabledArr: []
    };
    return (S3 || S3 === 0) && (F.hours = S3), Array.isArray(e2.disabledTimes) && (F.disabledArr = e2.range && Array.isArray(e2.disabledTimes[g]) ? e2.disabledTimes[g] : e2.disabledTimes), F;
  }, x2 = computed(() => (g, S3) => {
    var F;
    if (Array.isArray(e2.disabledTimes)) {
      const { disabledArr: b2, hours: P } = A(g, S3), Q2 = b2.filter((ae) => +ae.hours === P);
      return ((F = Q2[0]) == null ? void 0 : F.minutes) === "*" ? { hours: [P], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (Q2 == null ? void 0 : Q2.map((ae) => +ae.minutes)) ?? [],
        seconds: (Q2 == null ? void 0 : Q2.map((ae) => ae.seconds ? +ae.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: c2,
    updateHours: $,
    updateMinutes: C,
    updateSeconds: k2,
    getSetDateTime: i2,
    updateTimeValues: I2,
    getSecondsValue: o,
    assignStartTime: R2,
    validateTime: p,
    disabledTimesConfig: x2
  };
};
var Jl = (e2, t2) => {
  const { modelValue: r, time: a3 } = Ut(e2, t2), { defaultedStartTime: n } = Pe(e2), { updateTimeValues: o, getSetDateTime: i2, setTime: c2, assignStartTime: p, disabledTimesConfig: M3, validateTime: $ } = Wa(e2, a3, r), C = (F) => {
    const { hours: b2, minutes: P, seconds: Q2 } = F;
    return { hours: +b2, minutes: +P, seconds: Q2 ? +Q2 : 0 };
  }, k2 = () => {
    if (e2.startTime) {
      if (Array.isArray(e2.startTime)) {
        const b2 = C(e2.startTime[0]), P = C(e2.startTime[1]);
        return [set(B2(), b2), set(B2(), P)];
      }
      const F = C(e2.startTime);
      return set(B2(), F);
    }
    return e2.range ? [null, null] : null;
  }, I2 = () => {
    if (e2.range) {
      const [F, b2] = k2();
      r.value = [i2(F, 0), i2(b2, 1)];
    } else
      r.value = i2(k2());
  }, R2 = (F) => Array.isArray(F) ? [kt(B2(F[0])), kt(B2(F[1]))] : [kt(F ?? B2())], A = (F, b2, P) => {
    c2("hours", F), c2("minutes", b2), c2("seconds", e2.enableSeconds ? P : 0);
  }, x2 = () => {
    const [F, b2] = R2(r.value);
    return e2.range ? A(
      [F.hours, b2.hours],
      [F.minutes, b2.minutes],
      [F.seconds, b2.minutes]
    ) : A(F.hours, F.minutes, F.seconds);
  };
  onMounted(() => {
    if (!e2.shadow)
      return p(n.value), r.value ? x2() : I2();
  });
  const g = () => {
    Array.isArray(r.value) ? r.value = r.value.map((F, b2) => F && i2(F, b2)) : r.value = i2(r.value), t2("time-update");
  };
  return {
    modelValue: r,
    time: a3,
    disabledTimesConfig: M3,
    updateTime: (F, b2 = true, P = false) => {
      o(F, b2, P, g);
    },
    validateTime: $
  };
};
var xl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePickerSolo",
  props: {
    ...et
  },
  emits: ["update:internal-model-value", "time-update", "am-pm-change"],
  setup(e2, { expose: t2, emit: r }) {
    const a3 = r, n = e2, o = useSlots(), i2 = Ke(o, "timePicker"), { time: c2, modelValue: p, disabledTimesConfig: M3, updateTime: $, validateTime: C } = Jl(n, a3);
    return t2({ getSidebarProps: () => ({
      modelValue: p,
      time: c2,
      updateTime: $
    }) }), (I2, R2) => (openBlock(), createBlock(rn, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(() => [
        createVNode(za, mergeProps(I2.$props, {
          hours: unref(c2).hours,
          minutes: unref(c2).minutes,
          seconds: unref(c2).seconds,
          "internal-model-value": I2.internalModelValue,
          "disabled-times-config": unref(M3),
          "validate-time": unref(C),
          "onUpdate:hours": R2[0] || (R2[0] = (A) => unref($)(A)),
          "onUpdate:minutes": R2[1] || (R2[1] = (A) => unref($)(A, false)),
          "onUpdate:seconds": R2[2] || (R2[2] = (A) => unref($)(A, false, true)),
          onAmPmChange: R2[3] || (R2[3] = (A) => I2.$emit("am-pm-change", A))
        }), createSlots({ _: 2 }, [
          renderList(unref(i2), (A, x2) => ({
            name: A,
            fn: withCtx((g) => [
              renderSlot(I2.$slots, A, normalizeProps(guardReactiveProps(g)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"])
      ]),
      _: 3
    }));
  }
});
var eo = { class: "dp__month_year_row" };
var to = ["aria-label", "onClick", "onKeydown"];
var no = defineComponent({
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
    ...et
  },
  emits: ["update-month-year", "mount", "reset-flow", "overlay-closed"],
  setup(e2, { expose: t2, emit: r }) {
    const a3 = r, n = e2, {
      defaultedTransitions: o,
      defaultedAriaLabels: i2,
      defaultedMultiCalendars: c2,
      defaultedFilters: p,
      defaultedConfig: M3,
      defaultedHighlight: $
    } = Pe(n), { transitionName: C, showTransition: k2 } = Lt(o), { buildMatrix: I2 } = yt(), { handleMonthYearChange: R2, isDisabled: A, updateMonthYear: x2 } = fl(n, a3), { showLeftIcon: g, showRightIcon: S3 } = nn(), F = ref(false), b2 = ref(false), P = ref([null, null, null, null]);
    onMounted(() => {
      a3("mount");
    });
    const Q2 = (l) => ({
      get: () => n[l],
      set: (h4) => {
        const s3 = l === Ze.month ? Ze.year : Ze.month;
        a3("update-month-year", { [l]: h4, [s3]: n[s3] }), l === Ze.month ? ne(true) : _(true);
      }
    }), ae = computed(Q2(Ze.month)), L2 = computed(Q2(Ze.year)), ie = computed(() => (l) => ({
      month: n.month,
      year: n.year,
      items: l === Ze.month ? n.months : n.years,
      instance: n.instance,
      updateMonthYear: x2,
      toggle: l === Ze.month ? ne : _
    })), E2 = computed(() => {
      const l = n.months.find((h4) => h4.value === n.month);
      return l || { text: "", value: 0 };
    }), f = computed(() => Ct(n.months, (l) => {
      const h4 = n.month === l.value, s3 = Ft(
        l.value,
        Ra(n.year, n.minDate),
        Oa(n.year, n.maxDate)
      ) || p.value.months.includes(l.value), X2 = Fa($.value, l.value, n.year);
      return { active: h4, disabled: s3, highlighted: X2 };
    })), D2 = computed(() => Ct(n.years, (l) => {
      const h4 = n.year === l.value, s3 = Ft(l.value, _t(n.minDate), _t(n.maxDate)) || p.value.years.includes(l.value), X2 = Kn($.value, l.value);
      return { active: h4, disabled: s3, highlighted: X2 };
    })), H3 = (l, h4) => {
      h4 !== void 0 ? l.value = h4 : l.value = !l.value, l.value || a3("overlay-closed");
    }, ne = (l = false, h4) => {
      d3(l), H3(F, h4);
    }, _ = (l = false, h4) => {
      d3(l), H3(b2, h4);
    }, d3 = (l) => {
      l || a3("reset-flow");
    }, O2 = (l, h4) => {
      n.arrowNavigation && (P.value[h4] = _e(l), I2(P.value, "monthYear"));
    }, G2 = computed(() => {
      var l, h4;
      return [
        {
          type: Ze.month,
          index: 1,
          toggle: ne,
          modelValue: ae.value,
          updateModelValue: (s3) => ae.value = s3,
          text: E2.value.text,
          showSelectionGrid: F.value,
          items: f.value,
          ariaLabel: (l = i2.value) == null ? void 0 : l.openMonthsOverlay
        },
        {
          type: Ze.year,
          index: 2,
          toggle: _,
          modelValue: L2.value,
          updateModelValue: (s3) => L2.value = s3,
          text: n.year,
          showSelectionGrid: b2.value,
          items: D2.value,
          ariaLabel: (h4 = i2.value) == null ? void 0 : h4.openYearsOverlay
        }
      ];
    }), y3 = computed(() => n.disableYearSelect ? [G2.value[0]] : n.yearFirst ? [...G2.value].reverse() : G2.value);
    return t2({
      toggleMonthPicker: ne,
      toggleYearPicker: _,
      handleMonthYearChange: R2
    }), (l, h4) => {
      var s3, X2, de;
      return openBlock(), createElementBlock("div", eo, [
        l.$slots["month-year"] ? renderSlot(l.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, { month: e2.month, year: e2.year, months: e2.months, years: e2.years, updateMonthYear: unref(x2), handleMonthYearChange: unref(R2), instance: e2.instance }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          unref(g)(unref(c2), e2.instance) && !l.vertical ? (openBlock(), createBlock(Nt, {
            key: 0,
            "aria-label": (s3 = unref(i2)) == null ? void 0 : s3.prevMonth,
            disabled: unref(A)(false),
            onActivate: h4[0] || (h4[0] = (T2) => unref(R2)(false, true)),
            onSetRef: h4[1] || (h4[1] = (T2) => O2(T2, 0))
          }, {
            default: withCtx(() => [
              l.$slots["arrow-left"] ? renderSlot(l.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
              l.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(En), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: normalizeClass(["dp__month_year_wrap", {
              dp__year_disable_select: l.disableYearSelect
            }])
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(y3.value, (T2, u2) => (openBlock(), createElementBlock(Fragment, {
              key: T2.type
            }, [
              createBaseVNode("button", {
                ref_for: true,
                ref: (N) => O2(N, u2 + 1),
                type: "button",
                class: "dp__btn dp__month_year_select",
                tabindex: "0",
                "aria-label": T2.ariaLabel,
                onClick: T2.toggle,
                onKeydown: [
                  withKeys(withModifiers(T2.toggle, ["prevent"]), ["enter"]),
                  withKeys(withModifiers(T2.toggle, ["prevent"]), ["space"])
                ]
              }, [
                l.$slots[T2.type] ? renderSlot(l.$slots, T2.type, {
                  key: 0,
                  text: T2.text,
                  value: n[T2.type]
                }) : createCommentVNode("", true),
                l.$slots[T2.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(T2.text), 1)
                ], 64))
              ], 40, to),
              createVNode(Transition, {
                name: unref(C)(T2.showSelectionGrid),
                css: unref(k2)
              }, {
                default: withCtx(() => [
                  T2.showSelectionGrid ? (openBlock(), createBlock(zt, {
                    key: 0,
                    items: T2.items,
                    "arrow-navigation": l.arrowNavigation,
                    "hide-navigation": l.hideNavigation,
                    "is-last": l.autoApply && !unref(M3).keepActionRow,
                    "skip-button-ref": false,
                    config: l.config,
                    type: T2.type,
                    "header-refs": [],
                    "esc-close": l.escClose,
                    "text-input": l.textInput,
                    onSelected: T2.updateModelValue,
                    onToggle: T2.toggle
                  }, createSlots({
                    "button-icon": withCtx(() => [
                      l.$slots["calendar-icon"] ? renderSlot(l.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                      l.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Vt), { key: 1 }))
                    ]),
                    _: 2
                  }, [
                    l.$slots[`${T2.type}-overlay-value`] ? {
                      name: "item",
                      fn: withCtx(({ item: N }) => [
                        renderSlot(l.$slots, `${T2.type}-overlay-value`, {
                          text: N.text,
                          value: N.value
                        })
                      ]),
                      key: "0"
                    } : void 0,
                    l.$slots[`${T2.type}-overlay`] ? {
                      name: "overlay",
                      fn: withCtx(() => [
                        renderSlot(l.$slots, `${T2.type}-overlay`, normalizeProps(guardReactiveProps(ie.value(T2.type))))
                      ]),
                      key: "1"
                    } : void 0,
                    l.$slots[`${T2.type}-overlay-header`] ? {
                      name: "header",
                      fn: withCtx(() => [
                        renderSlot(l.$slots, `${T2.type}-overlay-header`, {
                          toggle: T2.toggle
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
          unref(g)(unref(c2), e2.instance) && l.vertical ? (openBlock(), createBlock(Nt, {
            key: 1,
            "aria-label": (X2 = unref(i2)) == null ? void 0 : X2.prevMonth,
            disabled: unref(A)(false),
            onActivate: h4[2] || (h4[2] = (T2) => unref(R2)(false, true))
          }, {
            default: withCtx(() => [
              l.$slots["arrow-up"] ? renderSlot(l.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
              l.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Vn), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
          unref(S3)(unref(c2), e2.instance) ? (openBlock(), createBlock(Nt, {
            key: 2,
            ref: "rightIcon",
            disabled: unref(A)(true),
            "aria-label": (de = unref(i2)) == null ? void 0 : de.nextMonth,
            onActivate: h4[3] || (h4[3] = (T2) => unref(R2)(true, true)),
            onSetRef: h4[4] || (h4[4] = (T2) => O2(T2, l.disableYearSelect ? 2 : 3))
          }, {
            default: withCtx(() => [
              l.$slots[l.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(l.$slots, l.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
              l.$slots[l.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(l.vertical ? unref(Ln) : unref(Fn)), { key: 1 }))
            ]),
            _: 3
          }, 8, ["disabled", "aria-label"])) : createCommentVNode("", true)
        ], 64))
      ]);
    };
  }
});
var ao = ["aria-label"];
var ro = {
  class: "dp__calendar_header",
  role: "row"
};
var lo = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
};
var oo = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1);
var so = ["aria-label"];
var io = {
  key: 0,
  role: "gridcell",
  class: "dp__calendar_item dp__week_num"
};
var uo = { class: "dp__cell_inner" };
var co = ["id", "aria-selected", "aria-disabled", "aria-label", "onClick", "onKeydown", "onMouseenter", "onMouseleave"];
var fo = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DpCalendar",
  props: {
    mappedDates: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    ...et
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
  setup(e2, { expose: t2, emit: r }) {
    const a3 = r, n = e2, { buildMultiLevelMatrix: o } = yt(), {
      defaultedTransitions: i2,
      defaultedConfig: c2,
      defaultedAriaLabels: p,
      defaultedMultiCalendars: M3,
      defaultedWeekNumbers: $
    } = Pe(n), C = ref(null), k2 = ref({
      bottom: "",
      left: "",
      transform: ""
    }), I2 = ref([]), R2 = ref(null), A = ref(true), x2 = ref(""), g = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), S3 = ref([]), F = ref({ left: "50%" }), b2 = computed(() => n.calendar ? n.calendar(n.mappedDates) : n.mappedDates), P = computed(() => n.dayNames ? Array.isArray(n.dayNames) ? n.dayNames : n.dayNames(n.locale, +n.weekStart) : Fr(n.formatLocale, n.locale, +n.weekStart));
    onMounted(() => {
      a3("mount", { cmp: "calendar", refs: I2 }), c2.value.noSwipe || R2.value && (R2.value.addEventListener("touchstart", _, { passive: false }), R2.value.addEventListener("touchend", d3, { passive: false }), R2.value.addEventListener("touchmove", O2, { passive: false })), n.monthChangeOnScroll && R2.value && R2.value.addEventListener("wheel", l, { passive: false });
    });
    const Q2 = (T2) => T2 ? n.vertical ? "vNext" : "next" : n.vertical ? "vPrevious" : "previous", ae = (T2, u2) => {
      if (n.transitions) {
        const N = je(st(B2(), n.month, n.year));
        x2.value = Ee(je(st(B2(), T2, u2)), N) ? i2.value[Q2(true)] : i2.value[Q2(false)], A.value = false, nextTick(() => {
          A.value = true;
        });
      }
    }, L2 = computed(
      () => ({
        [n.calendarClassName]: !!n.calendarClassName
      })
    ), ie = computed(() => (T2) => {
      const u2 = Vr(T2);
      return {
        dp__marker_dot: u2.type === "dot",
        dp__marker_line: u2.type === "line"
      };
    }), E2 = computed(() => (T2) => ke(T2, C.value)), f = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: M3.value.count > 0 && n.instance !== 0
    })), D2 = computed(() => (T2) => n.hideOffsetDates ? T2.current : true), H3 = async (T2, u2, N) => {
      var q2, K2;
      if (a3("set-hover-date", T2), (K2 = (q2 = T2.marker) == null ? void 0 : q2.tooltip) != null && K2.length) {
        const te = _e(I2.value[u2][N]);
        if (te) {
          const { width: re, height: be } = te.getBoundingClientRect();
          C.value = T2.value;
          let Y2 = { left: `${re / 2}px` }, U = -50;
          if (await nextTick(), S3.value[0]) {
            const { left: Me, width: Z } = S3.value[0].getBoundingClientRect();
            Me < 0 && (Y2 = { left: "0" }, U = 0, F.value.left = `${re / 2}px`), window.innerWidth < Me + Z && (Y2 = { right: "0" }, U = 0, F.value.left = `${Z - re / 2}px`);
          }
          k2.value = {
            bottom: `${be}px`,
            ...Y2,
            transform: `translateX(${U}%)`
          }, a3("tooltip-open", T2.marker);
        }
      }
    }, ne = (T2) => {
      C.value && (C.value = null, k2.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a3("tooltip-close", T2.marker));
    }, _ = (T2) => {
      g.value.startX = T2.changedTouches[0].screenX, g.value.startY = T2.changedTouches[0].screenY;
    }, d3 = (T2) => {
      g.value.endX = T2.changedTouches[0].screenX, g.value.endY = T2.changedTouches[0].screenY, G2();
    }, O2 = (T2) => {
      n.vertical && !n.inline && T2.preventDefault();
    }, G2 = () => {
      const T2 = n.vertical ? "Y" : "X";
      Math.abs(g.value[`start${T2}`] - g.value[`end${T2}`]) > 10 && a3("handle-swipe", g.value[`start${T2}`] > g.value[`end${T2}`] ? "right" : "left");
    }, y3 = (T2, u2, N) => {
      T2 && (Array.isArray(I2.value[u2]) ? I2.value[u2][N] = T2 : I2.value[u2] = [T2]), n.arrowNavigation && o(I2.value, "calendar");
    }, l = (T2) => {
      n.monthChangeOnScroll && (T2.preventDefault(), a3("handle-scroll", T2));
    }, h4 = (T2) => $.value.type === "local" ? getWeek(T2.value, { weekStartsOn: +n.weekStart }) : $.value.type === "iso" ? getISOWeek(T2.value) : typeof $.value.type == "function" ? $.value.type(T2.value) : "", s3 = (T2) => {
      const u2 = T2[0];
      return $.value.hideOnOffsetDates ? T2.some((N) => N.current) ? h4(u2) : "" : h4(u2);
    }, X2 = (T2, u2) => {
      ft(T2, c2.value), a3("select-date", u2);
    }, de = (T2) => {
      ft(T2, c2.value);
    };
    return t2({ triggerTransition: ae }), (T2, u2) => {
      var N;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(f.value)
      }, [
        createBaseVNode("div", {
          ref_key: "calendarWrapRef",
          ref: R2,
          role: "grid",
          class: normalizeClass(L2.value),
          "aria-label": (N = unref(p)) == null ? void 0 : N.calendarWrap
        }, [
          (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createBaseVNode("div", ro, [
              T2.weekNumbers ? (openBlock(), createElementBlock("div", lo, toDisplayString(T2.weekNumName), 1)) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(P.value, (q2, K2) => (openBlock(), createElementBlock("div", {
                key: K2,
                class: "dp__calendar_header_item",
                role: "gridcell"
              }, [
                T2.$slots["calendar-header"] ? renderSlot(T2.$slots, "calendar-header", {
                  key: 0,
                  day: q2,
                  index: K2
                }) : createCommentVNode("", true),
                T2.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(q2), 1)
                ], 64))
              ]))), 128))
            ]),
            oo,
            createVNode(Transition, {
              name: x2.value,
              css: !!T2.transitions
            }, {
              default: withCtx(() => {
                var q2;
                return [
                  A.value ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "dp__calendar",
                    role: "rowgroup",
                    "aria-label": ((q2 = unref(p)) == null ? void 0 : q2.calendarDays) || void 0
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(b2.value, (K2, te) => (openBlock(), createElementBlock("div", {
                      key: te,
                      class: "dp__calendar_row",
                      role: "row"
                    }, [
                      T2.weekNumbers ? (openBlock(), createElementBlock("div", io, [
                        createBaseVNode("div", uo, toDisplayString(s3(K2.days)), 1)
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(K2.days, (re, be) => {
                        var Y2, U, Me;
                        return openBlock(), createElementBlock("div", {
                          id: re.value.toISOString().split("T")[0],
                          ref_for: true,
                          ref: (Z) => y3(Z, te, be),
                          key: be + te,
                          role: "gridcell",
                          class: "dp__calendar_item",
                          "aria-selected": re.classData.dp__active_date || re.classData.dp__range_start || re.classData.dp__range_start,
                          "aria-disabled": re.classData.dp__cell_disabled || void 0,
                          "aria-label": (U = (Y2 = unref(p)) == null ? void 0 : Y2.day) == null ? void 0 : U.call(Y2, re),
                          tabindex: "0",
                          onClick: withModifiers((Z) => X2(Z, re), ["prevent"]),
                          onKeydown: [
                            withKeys((Z) => T2.$emit("select-date", re), ["enter"]),
                            withKeys((Z) => T2.$emit("handle-space", re), ["space"])
                          ],
                          onMouseenter: (Z) => H3(re, te, be),
                          onMouseleave: (Z) => ne(re)
                        }, [
                          createBaseVNode("div", {
                            class: normalizeClass(["dp__cell_inner", re.classData])
                          }, [
                            T2.$slots.day && D2.value(re) ? renderSlot(T2.$slots, "day", {
                              key: 0,
                              day: +re.text,
                              date: re.value
                            }) : createCommentVNode("", true),
                            T2.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createTextVNode(toDisplayString(re.text), 1)
                            ], 64)),
                            re.marker && D2.value(re) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                              T2.$slots.marker ? renderSlot(T2.$slots, "marker", {
                                key: 0,
                                marker: re.marker,
                                day: +re.text,
                                date: re.value
                              }) : (openBlock(), createElementBlock("div", {
                                key: 1,
                                class: normalizeClass(ie.value(re.marker)),
                                style: normalizeStyle(re.marker.color ? { backgroundColor: re.marker.color } : {})
                              }, null, 6))
                            ], 64)) : createCommentVNode("", true),
                            E2.value(re.value) ? (openBlock(), createElementBlock("div", {
                              key: 3,
                              ref_for: true,
                              ref_key: "activeTooltip",
                              ref: S3,
                              class: "dp__marker_tooltip",
                              style: normalizeStyle(k2.value)
                            }, [
                              (Me = re.marker) != null && Me.tooltip ? (openBlock(), createElementBlock("div", {
                                key: 0,
                                class: "dp__tooltip_content",
                                onClick: de
                              }, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(re.marker.tooltip, (Z, Ue) => (openBlock(), createElementBlock("div", {
                                  key: Ue,
                                  class: "dp__tooltip_text"
                                }, [
                                  T2.$slots["marker-tooltip"] ? renderSlot(T2.$slots, "marker-tooltip", {
                                    key: 0,
                                    tooltip: Z,
                                    day: re.value
                                  }) : createCommentVNode("", true),
                                  T2.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                    createBaseVNode("div", {
                                      class: "dp__tooltip_mark",
                                      style: normalizeStyle(Z.color ? { backgroundColor: Z.color } : {})
                                    }, null, 4),
                                    createBaseVNode("div", null, toDisplayString(Z.text), 1)
                                  ], 64))
                                ]))), 128)),
                                createBaseVNode("div", {
                                  class: "dp__arrow_bottom_tp",
                                  style: normalizeStyle(F.value)
                                }, null, 4)
                              ])) : createCommentVNode("", true)
                            ], 4)) : createCommentVNode("", true)
                          ], 2)
                        ], 40, co);
                      }), 128))
                    ]))), 128))
                  ], 8, so)) : createCommentVNode("", true)
                ];
              }),
              _: 3
            }, 8, ["name", "css"])
          ], 64))
        ], 10, ao)
      ], 2);
    };
  }
});
var ya = (e2) => Array.isArray(e2);
var vo = (e2, t2, r, a3) => {
  const n = ref([]), { modelValue: o, calendars: i2, time: c2 } = Ut(e2, t2), { defaultedMultiCalendars: p, defaultedStartTime: M3 } = Pe(e2), { validateMonthYearInRange: $, isDisabled: C, isDateRangeAllowed: k2, checkMinMaxRange: I2 } = Mt(e2), { updateTimeValues: R2, getSetDateTime: A, setTime: x2, assignStartTime: g, validateTime: S3, disabledTimesConfig: F } = Wa(e2, c2, o, a3), b2 = computed(
    () => (m3) => i2.value[m3] ? i2.value[m3].month : 0
  ), P = computed(
    () => (m3) => i2.value[m3] ? i2.value[m3].year : 0
  ), Q2 = (m3, z2, oe) => {
    var me, Se;
    i2.value[m3] || (i2.value[m3] = { month: 0, year: 0 }), i2.value[m3].month = ca(z2) ? (me = i2.value[m3]) == null ? void 0 : me.month : z2, i2.value[m3].year = ca(oe) ? (Se = i2.value[m3]) == null ? void 0 : Se.year : oe;
  }, ae = () => {
    e2.autoApply && t2("select-date");
  };
  watch(o, (m3, z2) => {
    JSON.stringify(m3) !== JSON.stringify(z2) && E2();
  }), onMounted(() => {
    e2.shadow || (o.value || (l(), M3.value && g(M3.value)), E2(true), e2.focusStartDate && e2.startDate && l());
  });
  const L2 = computed(() => {
    var m3;
    return (m3 = e2.flow) != null && m3.length && !e2.partialFlow ? e2.flowStep === e2.flow.length : true;
  }), ie = () => {
    e2.autoApply && L2.value && t2("auto-apply", e2.partialFlow);
  }, E2 = (m3 = false) => {
    if (o.value)
      return Array.isArray(o.value) ? (n.value = o.value, d3(m3)) : D2(o.value, m3);
    if (p.value.count && m3 && !e2.startDate)
      return f(B2(), m3);
  }, f = (m3, z2 = false) => {
    if ((!p.value.count || !p.value.static || z2) && Q2(0, getMonth(m3), getYear(m3)), p.value.count && !p.value.solo)
      for (let oe = 1; oe < p.value.count; oe++) {
        const me = set(B2(), { month: b2.value(oe - 1), year: P.value(oe - 1) }), Se = add(me, { months: 1 });
        i2.value[oe] = { month: getMonth(Se), year: getYear(Se) };
      }
  }, D2 = (m3, z2) => {
    f(m3), x2("hours", getHours(m3)), x2("minutes", getMinutes(m3)), x2("seconds", getSeconds(m3)), p.value.count && z2 && y3();
  }, H3 = (m3) => {
    if (p.value.count) {
      if (p.value.solo)
        return 0;
      const z2 = getMonth(m3[0]), oe = getMonth(m3[1]);
      return Math.abs(oe - z2) < p.value.count ? 0 : 1;
    }
    return 1;
  }, ne = (m3, z2) => {
    m3[1] && e2.showLastInRange ? f(m3[H3(m3)], z2) : f(m3[0], z2);
    const oe = (me, Se) => [
      me(m3[0]),
      m3[1] ? me(m3[1]) : c2[Se][1]
    ];
    x2("hours", oe(getHours, "hours")), x2("minutes", oe(getMinutes, "minutes")), x2("seconds", oe(getSeconds, "seconds"));
  }, _ = (m3, z2) => {
    if ((e2.range || e2.weekPicker) && !e2.multiDates)
      return ne(m3, z2);
    if (e2.multiDates && z2) {
      const oe = m3[m3.length - 1];
      return D2(oe, z2);
    }
  }, d3 = (m3) => {
    const z2 = o.value;
    _(z2, m3), p.value.count && p.value.solo && y3();
  }, O2 = (m3, z2) => {
    const oe = set(B2(), { month: b2.value(z2), year: P.value(z2) }), me = m3 < 0 ? addMonths(oe, 1) : subMonths(oe, 1);
    $(getMonth(me), getYear(me), m3 < 0, e2.preventMinMaxNavigation) && (Q2(z2, getMonth(me), getYear(me)), t2("update-month-year", { instance: z2, month: getMonth(me), year: getYear(me) }), p.value.count && !p.value.solo && G2(z2), r());
  }, G2 = (m3) => {
    for (let z2 = m3 - 1; z2 >= 0; z2--) {
      const oe = subMonths(set(B2(), { month: b2.value(z2 + 1), year: P.value(z2 + 1) }), 1);
      Q2(z2, getMonth(oe), getYear(oe));
    }
    for (let z2 = m3 + 1; z2 <= p.value.count - 1; z2++) {
      const oe = addMonths(set(B2(), { month: b2.value(z2 - 1), year: P.value(z2 - 1) }), 1);
      Q2(z2, getMonth(oe), getYear(oe));
    }
  }, y3 = () => {
    if (Array.isArray(o.value) && o.value.length === 2) {
      const m3 = B2(
        B2(o.value[1] ? o.value[1] : addMonths(o.value[0], 1))
      ), [z2, oe] = [getMonth(o.value[0]), getYear(o.value[0])], [me, Se] = [getMonth(o.value[1]), getYear(o.value[1])];
      (z2 !== me || z2 === me && oe !== Se) && p.value.solo && Q2(1, getMonth(m3), getYear(m3));
    } else
      o.value && !Array.isArray(o.value) && (Q2(0, getMonth(o.value), getYear(o.value)), f(B2()));
  }, l = () => {
    e2.startDate && (Q2(0, getMonth(B2(e2.startDate)), getYear(B2(e2.startDate))), p.value.count && G2(0));
  }, h4 = jr((m3, z2) => {
    e2.monthChangeOnScroll && O2(e2.monthChangeOnScroll !== "inverse" ? -m3.deltaY : m3.deltaY, z2);
  }, 50), s3 = (m3, z2, oe = false) => {
    e2.monthChangeOnArrows && e2.vertical === oe && X2(m3, z2);
  }, X2 = (m3, z2) => {
    O2(m3 === "right" ? -1 : 1, z2);
  }, de = (m3) => e2.markers.find(
    (z2) => ke(qr(m3.value), xe(B2(z2.date), e2.timezone))
  ), T2 = (m3, z2) => {
    switch (e2.sixWeeks === true ? "append" : e2.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [m3 == 0, true];
      case "fair":
        return [m3 == 0 || z2 > m3, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, u2 = (m3, z2, oe, me) => {
    if (e2.sixWeeks && m3.length < 6) {
      const Se = 6 - m3.length, J = (z2.getDay() + 7 - me) % 7, se = 6 - (oe.getDay() + 7 - me) % 7, [rt, lt] = T2(J, se);
      for (let ot = 1; ot <= Se; ot++)
        if (lt ? !!(ot % 2) == rt : rt) {
          const Kt = m3[0].days[0], cn = N(addDays(Kt.value, -7), getMonth(z2));
          m3.unshift({ days: cn });
        } else {
          const Kt = m3[m3.length - 1], cn = Kt.days[Kt.days.length - 1], Ka = N(addDays(cn.value, 1), getMonth(z2));
          m3.push({ days: Ka });
        }
    }
    return m3;
  }, N = (m3, z2) => {
    const oe = B2(m3), me = [];
    for (let Se = 0; Se < 7; Se++) {
      const J = addDays(oe, Se), ue = getMonth(J) !== z2;
      me.push({
        text: e2.hideOffsetDates && ue ? "" : J.getDate(),
        value: J,
        current: !ue,
        classData: {}
      });
    }
    return me;
  }, q2 = (m3, z2) => {
    const oe = [], me = new Date(z2, m3), Se = new Date(z2, m3 + 1, 0), J = e2.weekStart, ue = startOfWeek(me, { weekStartsOn: J }), se = (rt) => {
      const lt = N(rt, m3);
      if (oe.push({ days: lt }), !oe[oe.length - 1].days.some(
        (ot) => ke(je(ot.value), je(Se))
      )) {
        const ot = addDays(rt, 7);
        se(ot);
      }
    };
    return se(ue), u2(oe, me, Se, J);
  }, K2 = (m3) => (o.value = Jt(B2(m3.value), e2.timezone, e2.weekStart), t2("date-update", m3.value), ie()), te = (m3) => {
    const z2 = vt(B2(m3.value), c2.hours, c2.minutes, ze());
    t2("date-update", z2), e2.multiDates ? Gn(z2, o, e2.multiDatesLimit) : o.value = z2, a3(), nextTick().then(() => {
      ie();
    });
  }, re = (m3) => e2.noDisabledRange ? Na(n.value[0], m3).some((oe) => C(oe)) : false, be = () => {
    n.value = o.value ? o.value.slice() : [], n.value.length === 2 && !(e2.fixedStart || e2.fixedEnd) && (n.value = []);
  }, Y2 = (m3, z2) => {
    const oe = [B2(m3.value), addDays(B2(m3.value), +e2.autoRange)];
    k2(oe) ? (z2 && U(m3.value), n.value = oe) : t2("invalid-date", m3.value);
  }, U = (m3) => {
    const z2 = getMonth(B2(m3)), oe = getYear(B2(m3));
    if (Q2(0, z2, oe), p.value.count > 0)
      for (let me = 1; me < p.value.count; me++) {
        const Se = Zr(
          set(B2(m3), { year: b2.value(me - 1), month: P.value(me - 1) })
        );
        Q2(me, Se.month, Se.year);
      }
  }, Me = (m3) => Array.isArray(o.value) && o.value.length === 2 ? e2.fixedStart && (Ee(m3, o.value[0]) || ke(m3, o.value[0])) ? [o.value[0], m3] : e2.fixedEnd && (Ye(m3, o.value[1]) || ke(m3, o.value[1])) ? [m3, o.value[1]] : (t2("invalid-fixed-range", m3), o.value) : [], Z = (m3) => {
    if (re(m3.value) || !I2(m3.value, o.value, e2.fixedStart ? 0 : 1))
      return t2("invalid-date", m3.value);
    n.value = Me(B2(m3.value));
  }, Ue = (m3, z2) => {
    if (be(), e2.autoRange)
      return Y2(m3, z2);
    if (e2.fixedStart || e2.fixedEnd)
      return Z(m3);
    n.value[0] ? I2(B2(m3.value), o.value) && !re(m3.value) ? Ye(B2(m3.value), B2(n.value[0])) ? (n.value.unshift(B2(m3.value)), t2("range-end", n.value[0])) : (n.value[1] = B2(m3.value), t2("range-end", n.value[1])) : (e2.autoApply && t2("auto-apply-invalid", m3.value), t2("invalid-date", m3.value)) : (n.value[0] = B2(m3.value), t2("range-start", n.value[0]));
  }, ze = (m3 = true) => e2.enableSeconds ? Array.isArray(c2.seconds) ? m3 ? c2.seconds[0] : c2.seconds[1] : c2.seconds : 0, $t = (m3) => {
    n.value[m3] = vt(
      n.value[m3],
      c2.hours[m3],
      c2.minutes[m3],
      ze(m3 !== 1)
    );
  }, Wt = () => {
    var m3, z2;
    n.value[0] && n.value[1] && +((m3 = n.value) == null ? void 0 : m3[0]) > +((z2 = n.value) == null ? void 0 : z2[1]) && (n.value.reverse(), t2("range-start", n.value[0]), t2("range-end", n.value[1]));
  }, on = () => {
    n.value.length && (n.value[0] && !n.value[1] ? $t(0) : ($t(0), $t(1), a3()), Wt(), o.value = n.value.slice(), ln(n.value, t2, e2.autoApply, e2.modelAuto));
  }, Ot = (m3, z2 = false) => {
    if (C(m3.value) || !m3.current && e2.hideOffsetDates)
      return t2("invalid-date", m3.value);
    if (e2.weekPicker)
      return K2(m3);
    if (!e2.range)
      return te(m3);
    ya(c2.hours) && ya(c2.minutes) && !e2.multiDates && (Ue(m3, z2), on());
  }, Ge = (m3, z2) => {
    var me;
    Q2(m3, z2.month, z2.year), p.value.count && !p.value.solo && G2(m3), t2("update-month-year", { instance: m3, month: z2.month, year: z2.year }), r(p.value.solo ? m3 : void 0);
    const oe = (me = e2.flow) != null && me.length ? e2.flow[e2.flowStep] : void 0;
    !z2.fromNav && (oe === tt.month || oe === tt.year) && a3();
  }, sn = (m3, z2) => {
    La({ value: m3, modelValue: o, range: e2.range, timezone: z2 ? void 0 : e2.timezone }), ae(), e2.multiCalendars && nextTick().then(() => E2(true));
  }, un = () => {
    e2.range ? o.value && Array.isArray(o.value) && o.value[0] ? o.value = Ye(B2(), o.value[0]) ? [B2(), o.value[0]] : [o.value[0], B2()] : o.value = [B2()] : o.value = B2(), ae();
  }, jt = () => {
    if (Array.isArray(o.value))
      if (e2.multiDates) {
        const m3 = dn();
        o.value[o.value.length - 1] = A(m3);
      } else
        o.value = o.value.map((m3, z2) => m3 && A(m3, z2));
    else
      o.value = A(o.value);
    t2("time-update");
  }, dn = () => Array.isArray(o.value) && o.value.length ? o.value[o.value.length - 1] : null;
  return {
    calendars: i2,
    modelValue: o,
    month: b2,
    year: P,
    time: c2,
    disabledTimesConfig: F,
    validateTime: S3,
    getCalendarDays: q2,
    getMarker: de,
    handleScroll: h4,
    handleSwipe: X2,
    handleArrow: s3,
    selectDate: Ot,
    updateMonthYear: Ge,
    presetDate: sn,
    selectCurrentDate: un,
    updateTime: (m3, z2 = true, oe = false) => {
      R2(m3, z2, oe, jt);
    }
  };
};
var mo = { key: 0 };
var go = defineComponent({
  __name: "DatePicker",
  props: {
    ...et
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
    "update-month-year",
    "auto-apply-invalid",
    "date-update",
    "invalid-date"
  ],
  setup(e2, { expose: t2, emit: r }) {
    const a3 = r, n = e2, {
      calendars: o,
      month: i2,
      year: c2,
      modelValue: p,
      time: M3,
      disabledTimesConfig: $,
      validateTime: C,
      getCalendarDays: k2,
      getMarker: I2,
      handleArrow: R2,
      handleScroll: A,
      handleSwipe: x2,
      selectDate: g,
      updateMonthYear: S3,
      presetDate: F,
      selectCurrentDate: b2,
      updateTime: P
    } = vo(n, a3, y3, l), Q2 = useSlots(), { setHoverDate: ae, getDayClassData: L2, clearHoverDate: ie } = yl(p, n), { defaultedMultiCalendars: E2 } = Pe(n), f = ref([]), D2 = ref([]), H3 = ref(null), ne = Ke(Q2, "calendar"), _ = Ke(Q2, "monthYear"), d3 = Ke(Q2, "timePicker"), O2 = (u2) => {
      n.shadow || a3("mount", u2);
    };
    watch(
      o,
      () => {
        n.shadow || setTimeout(() => {
          a3("recalculate-position");
        }, 0);
      },
      { deep: true }
    );
    const G2 = computed(() => (u2) => k2(i2.value(u2), c2.value(u2)).map((N) => ({
      ...N,
      days: N.days.map((q2) => (q2.marker = I2(q2), q2.classData = L2(q2), q2))
    })));
    function y3(u2) {
      var N;
      u2 || u2 === 0 ? (N = D2.value[u2]) == null || N.triggerTransition(i2.value(u2), c2.value(u2)) : D2.value.forEach((q2, K2) => q2.triggerTransition(i2.value(K2), c2.value(K2)));
    }
    function l() {
      a3("update-flow-step");
    }
    const h4 = (u2, N = false) => {
      g(u2, N), n.spaceConfirm && a3("select-date");
    };
    return t2({
      clearHoverDate: ie,
      presetDate: F,
      selectCurrentDate: b2,
      toggleMonthPicker: (u2, N, q2 = 0) => {
        var K2;
        (K2 = f.value[q2]) == null || K2.toggleMonthPicker(u2, N);
      },
      toggleYearPicker: (u2, N, q2 = 0) => {
        var K2;
        (K2 = f.value[q2]) == null || K2.toggleYearPicker(u2, N);
      },
      toggleTimePicker: (u2, N, q2) => {
        var K2;
        (K2 = H3.value) == null || K2.toggleTimePicker(u2, N, q2);
      },
      handleArrow: R2,
      updateMonthYear: S3,
      getSidebarProps: () => ({
        modelValue: p,
        month: i2,
        year: c2,
        time: M3,
        updateTime: P,
        updateMonthYear: S3,
        selectDate: g,
        presetDate: F
      })
    }), (u2, N) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(rn, {
        "multi-calendars": unref(E2).count
      }, {
        default: withCtx(({ instance: q2, index: K2 }) => [
          u2.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(no, mergeProps({
            key: 0,
            ref: (te) => {
              te && (f.value[K2] = te);
            },
            months: unref(Ca)(u2.formatLocale, u2.locale, u2.monthNameFormat),
            years: unref(jn)(u2.yearRange, u2.reverseYears),
            month: unref(i2)(q2),
            year: unref(c2)(q2),
            instance: q2
          }, u2.$props, {
            onMount: N[0] || (N[0] = (te) => O2(unref(wt).header)),
            onResetFlow: N[1] || (N[1] = (te) => u2.$emit("reset-flow")),
            onUpdateMonthYear: (te) => unref(S3)(q2, te),
            onOverlayClosed: N[2] || (N[2] = (te) => u2.$emit("focus-menu"))
          }), createSlots({ _: 2 }, [
            renderList(unref(_), (te, re) => ({
              name: te,
              fn: withCtx((be) => [
                renderSlot(u2.$slots, te, normalizeProps(guardReactiveProps(be)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(fo, mergeProps({
            ref: (te) => {
              te && (D2.value[K2] = te);
            },
            "mapped-dates": G2.value(q2),
            month: unref(i2)(q2),
            year: unref(c2)(q2),
            instance: q2
          }, u2.$props, {
            onSelectDate: (te) => unref(g)(te, q2 !== 1),
            onHandleSpace: (te) => h4(te, q2 !== 1),
            onSetHoverDate: N[3] || (N[3] = (te) => unref(ae)(te)),
            onHandleScroll: (te) => unref(A)(te, q2),
            onHandleSwipe: (te) => unref(x2)(te, q2),
            onMount: N[4] || (N[4] = (te) => O2(unref(wt).calendar)),
            onResetFlow: N[5] || (N[5] = (te) => u2.$emit("reset-flow")),
            onTooltipOpen: N[6] || (N[6] = (te) => u2.$emit("tooltip-open", te)),
            onTooltipClose: N[7] || (N[7] = (te) => u2.$emit("tooltip-close", te))
          }), createSlots({ _: 2 }, [
            renderList(unref(ne), (te, re) => ({
              name: te,
              fn: withCtx((be) => [
                renderSlot(u2.$slots, te, normalizeProps(guardReactiveProps({ ...be })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "instance", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars"]),
      u2.enableTimePicker ? (openBlock(), createElementBlock("div", mo, [
        u2.$slots["time-picker"] ? renderSlot(u2.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(M3), updateTime: unref(P) }))) : (openBlock(), createBlock(za, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: H3
        }, u2.$props, {
          hours: unref(M3).hours,
          minutes: unref(M3).minutes,
          seconds: unref(M3).seconds,
          "internal-model-value": u2.internalModelValue,
          "disabled-times-config": unref($),
          "validate-time": unref(C),
          onMount: N[8] || (N[8] = (q2) => O2(unref(wt).timePicker)),
          "onUpdate:hours": N[9] || (N[9] = (q2) => unref(P)(q2)),
          "onUpdate:minutes": N[10] || (N[10] = (q2) => unref(P)(q2, false)),
          "onUpdate:seconds": N[11] || (N[11] = (q2) => unref(P)(q2, false, true)),
          onResetFlow: N[12] || (N[12] = (q2) => u2.$emit("reset-flow")),
          onOverlayClosed: N[13] || (N[13] = (q2) => u2.$emit("time-picker-close")),
          onOverlayOpened: N[14] || (N[14] = (q2) => u2.$emit("time-picker-open", q2)),
          onAmPmChange: N[15] || (N[15] = (q2) => u2.$emit("am-pm-change", q2))
        }), createSlots({ _: 2 }, [
          renderList(unref(d3), (q2, K2) => ({
            name: q2,
            fn: withCtx((te) => [
              renderSlot(u2.$slots, q2, normalizeProps(guardReactiveProps(te)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"]))
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var yo = (e2, t2) => {
  const r = ref(), { defaultedMultiCalendars: a3, defaultedConfig: n, defaultedHighlight: o } = Pe(e2), { modelValue: i2, year: c2, month: p, calendars: M3 } = Ut(e2, t2), { isDisabled: $ } = Mt(e2), { selectYear: C, groupedYears: k2, showYearPicker: I2, isDisabled: R2, toggleYearPicker: A, handleYearSelect: x2, handleYear: g } = Ua({
    modelValue: i2,
    multiCalendars: a3,
    highlight: o,
    calendars: M3,
    month: p,
    year: c2,
    props: e2,
    emit: t2
  }), S3 = (f, D2) => [f, D2].map((H3) => format(H3, "MMMM", { locale: e2.formatLocale })).join("-"), F = computed(() => (f) => i2.value ? Array.isArray(i2.value) ? i2.value.some((D2) => isSameQuarter(f, D2)) : isSameQuarter(i2.value, f) : false), b2 = (f) => {
    if (e2.range) {
      if (Array.isArray(i2.value)) {
        const D2 = ke(f, i2.value[0]) || ke(f, i2.value[1]);
        return tn(i2.value, r.value, f) && !D2;
      }
      return false;
    }
    return false;
  }, P = computed(() => (f) => {
    const D2 = set(/* @__PURE__ */ new Date(), { year: c2.value(f) });
    return eachQuarterOfInterval({
      start: startOfYear(D2),
      end: endOfYear(D2)
    }).map((H3) => {
      const ne = startOfQuarter(H3), _ = endOfQuarter(H3), d3 = $(H3), O2 = b2(ne), G2 = typeof o.value == "function" ? o.value({ quarter: getQuarter(ne), year: getYear(ne) }) : !!o.value.quarters.find(
        (y3) => y3.quarter === getQuarter(ne) && y3.year === getYear(ne)
      );
      return {
        text: S3(ne, _),
        value: ne,
        active: F.value(ne),
        highlighted: G2,
        disabled: d3,
        isBetween: O2
      };
    });
  }), Q2 = (f) => {
    Gn(f, i2, e2.multiDatesLimit), t2("auto-apply", true);
  }, ae = (f) => {
    const D2 = qn(i2, f, t2);
    ln(D2, t2, e2.autoApply, e2.modelAuto);
  }, L2 = (f) => {
    i2.value = f, t2("auto-apply");
  };
  return {
    defaultedConfig: n,
    defaultedMultiCalendars: a3,
    groupedYears: k2,
    year: c2,
    isDisabled: R2,
    quarters: P,
    showYearPicker: I2,
    modelValue: i2,
    setHoverDate: (f) => {
      r.value = f;
    },
    selectYear: C,
    selectQuarter: (f, D2, H3) => {
      if (!H3)
        return M3.value[D2].month = getMonth(endOfQuarter(f)), e2.multiDates ? Q2(f) : e2.range ? ae(f) : L2(f);
    },
    toggleYearPicker: A,
    handleYearSelect: x2,
    handleYear: g
  };
};
var ho = { class: "dp--quarter-items" };
var po = ["disabled", "onClick", "onMouseover"];
var bo = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "QuarterPicker",
  props: {
    ...et
  },
  emits: [
    "update:internal-model-value",
    "reset-flow",
    "overlay-closed",
    "auto-apply",
    "range-start",
    "range-end"
  ],
  setup(e2, { expose: t2, emit: r }) {
    const a3 = r, n = e2, o = useSlots(), i2 = Ke(o, "yearMode"), {
      defaultedMultiCalendars: c2,
      defaultedConfig: p,
      groupedYears: M3,
      year: $,
      isDisabled: C,
      quarters: k2,
      modelValue: I2,
      showYearPicker: R2,
      setHoverDate: A,
      selectQuarter: x2,
      toggleYearPicker: g,
      handleYearSelect: S3,
      handleYear: F
    } = yo(n, a3);
    return t2({ getSidebarProps: () => ({
      modelValue: I2,
      year: $,
      selectQuarter: x2,
      handleYearSelect: S3,
      handleYear: F
    }) }), (P, Q2) => (openBlock(), createBlock(rn, {
      "multi-calendars": unref(c2).count,
      stretch: ""
    }, {
      default: withCtx(({ instance: ae }) => [
        createBaseVNode("div", {
          class: "dp-quarter-picker-wrap",
          style: normalizeStyle({ minHeight: `${unref(p).modeHeight}px` })
        }, [
          createBaseVNode("div", null, [
            createVNode(Va, mergeProps(P.$props, {
              items: unref(M3)(ae),
              instance: ae,
              "show-year-picker": unref(R2)[ae],
              year: unref($)(ae),
              "is-disabled": (L2) => unref(C)(ae, L2),
              onHandleYear: (L2) => unref(F)(ae, L2),
              onYearSelect: (L2) => unref(S3)(L2, ae),
              onToggleYearPicker: (L2) => unref(g)(ae, L2 == null ? void 0 : L2.flow, L2 == null ? void 0 : L2.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(i2), (L2, ie) => ({
                name: L2,
                fn: withCtx((E2) => [
                  renderSlot(P.$slots, L2, normalizeProps(guardReactiveProps(E2)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          createBaseVNode("div", ho, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(k2)(ae), (L2, ie) => (openBlock(), createElementBlock("div", { key: ie }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass(["dp--qr-btn", {
                  "dp--qr-btn-active": L2.active,
                  "dp--qr-btn-between": L2.isBetween,
                  "dp--qr-btn-disabled": L2.disabled,
                  "dp--highlighted": L2.highlighted
                }]),
                disabled: L2.disabled,
                onClick: (E2) => unref(x2)(L2.value, ae, L2.disabled),
                onMouseover: (E2) => unref(A)(L2.value)
              }, [
                P.$slots.quarter ? renderSlot(P.$slots, "quarter", {
                  key: 0,
                  value: L2.value,
                  text: L2.text
                }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(L2.text), 1)
                ], 64))
              ], 42, po)
            ]))), 128))
          ])
        ], 4)
      ]),
      _: 3
    }, 8, ["multi-calendars"]));
  }
});
var ko = ["id"];
var wo = {
  key: 0,
  class: "dp__sidebar_left"
};
var Do = {
  key: 1,
  class: "dp--preset-dates"
};
var Mo = ["onClick", "onKeydown"];
var $o = {
  key: 2,
  class: "dp__sidebar_right"
};
var To = {
  key: 3,
  class: "dp__action_extra"
};
var ha = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerMenu",
  props: {
    ...an,
    shadow: { type: Boolean, default: false },
    openOnTop: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    arrMapValues: { type: Object, default: () => ({}) },
    noOverlayFocus: { type: Boolean, default: false }
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
    "range-end",
    "auto-apply-invalid",
    "date-update",
    "invalid-date"
  ],
  setup(e2, { expose: t2, emit: r }) {
    const a3 = r, n = e2, o = computed(() => {
      const { openOnTop: Y2, ...U } = n;
      return {
        ...U,
        flowStep: L2.value,
        noOverlayFocus: n.noOverlayFocus
      };
    }), { setMenuFocused: i2, setShiftKey: c2, control: p } = Ha(), M3 = useSlots(), { defaultedTextInput: $, defaultedInline: C, defaultedConfig: k2 } = Pe(n), I2 = ref(null), R2 = ref(0), A = ref(null), x2 = ref(null), g = ref(false), S3 = ref(null);
    onMounted(() => {
      if (!n.shadow) {
        g.value = true, F(), window.addEventListener("resize", F);
        const Y2 = _e(A);
        if (Y2 && !$.value.enabled && !C.value.enabled && (i2(true), H3()), Y2) {
          const U = (Me) => {
            k2.value.allowPreventDefault && Me.preventDefault(), ft(Me, k2.value, true);
          };
          Y2.addEventListener("pointerdown", U), Y2.addEventListener("mousedown", U);
        }
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", F);
    });
    const F = () => {
      const Y2 = _e(x2);
      Y2 && (R2.value = Y2.getBoundingClientRect().width);
    }, { arrowRight: b2, arrowLeft: P, arrowDown: Q2, arrowUp: ae } = yt(), { flowStep: L2, updateFlowStep: ie, childMount: E2, resetFlow: f } = hl(n, a3, S3), D2 = computed(() => n.monthPicker ? Nl : n.yearPicker ? Bl : n.timePicker ? xl : n.quarterPicker ? bo : go), H3 = () => {
      const Y2 = _e(A);
      Y2 && Y2.focus({ preventScroll: true });
    }, ne = computed(() => {
      var Y2;
      return ((Y2 = S3.value) == null ? void 0 : Y2.getSidebarProps()) || {};
    }), _ = () => {
      n.openOnTop && a3("recalculate-position");
    }, d3 = Ke(M3, "action"), O2 = computed(() => n.monthPicker || n.yearPicker ? Ke(M3, "monthYear") : n.timePicker ? Ke(M3, "timePicker") : Ke(M3, "shared")), G2 = computed(() => n.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), y3 = computed(() => ({
      dp__menu_disabled: n.disabled,
      dp__menu_readonly: n.readonly
    })), l = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !C.value.enabled,
        dp__relative: C.value.enabled,
        [n.menuClassName]: !!n.menuClassName
      })
    ), h4 = (Y2) => {
      ft(Y2, k2.value, true);
    }, s3 = () => {
      n.escClose && a3("close-picker");
    }, X2 = (Y2) => {
      if (n.arrowNavigation) {
        if (Y2 === "up")
          return ae();
        if (Y2 === "down")
          return Q2();
        if (Y2 === "left")
          return P();
        if (Y2 === "right")
          return b2();
      } else
        Y2 === "left" || Y2 === "up" ? q2("handleArrow", "left", 0, Y2 === "up") : q2("handleArrow", "right", 0, Y2 === "down");
    }, de = (Y2) => {
      c2(Y2.shiftKey), !n.disableMonthYearSelect && Y2.code === "Tab" && Y2.target.classList.contains("dp__menu") && p.value.shiftKeyInMenu && (Y2.preventDefault(), ft(Y2, k2.value, true), a3("close-picker"));
    }, T2 = () => {
      H3(), a3("time-picker-close");
    }, u2 = (Y2) => {
      var U, Me, Z;
      (U = S3.value) == null || U.toggleTimePicker(false, false), (Me = S3.value) == null || Me.toggleMonthPicker(false, false, Y2), (Z = S3.value) == null || Z.toggleYearPicker(false, false, Y2);
    }, N = (Y2, U = 0) => {
      var Me, Z, Ue;
      return Y2 === "month" ? (Me = S3.value) == null ? void 0 : Me.toggleMonthPicker(false, true, U) : Y2 === "year" ? (Z = S3.value) == null ? void 0 : Z.toggleYearPicker(false, true, U) : Y2 === "time" ? (Ue = S3.value) == null ? void 0 : Ue.toggleTimePicker(true, false) : u2(U);
    }, q2 = (Y2, ...U) => {
      var Me, Z;
      (Me = S3.value) != null && Me[Y2] && ((Z = S3.value) == null || Z[Y2](...U));
    }, K2 = () => {
      q2("selectCurrentDate");
    }, te = (Y2, U) => {
      q2("presetDate", Y2, U);
    }, re = () => {
      q2("clearHoverDate");
    };
    return t2({
      updateMonthYear: (Y2, U) => {
        q2("updateMonthYear", Y2, U);
      },
      switchView: N
    }), (Y2, U) => {
      var Me;
      return openBlock(), createElementBlock("div", {
        id: Y2.uid ? `dp-menu-${Y2.uid}` : void 0,
        ref_key: "dpMenuRef",
        ref: A,
        tabindex: "0",
        role: "dialog",
        class: normalizeClass(l.value),
        onMouseleave: re,
        onClick: h4,
        onKeydown: [
          withKeys(s3, ["esc"]),
          U[18] || (U[18] = withKeys(withModifiers((Z) => X2("left"), ["prevent"]), ["left"])),
          U[19] || (U[19] = withKeys(withModifiers((Z) => X2("up"), ["prevent"]), ["up"])),
          U[20] || (U[20] = withKeys(withModifiers((Z) => X2("down"), ["prevent"]), ["down"])),
          U[21] || (U[21] = withKeys(withModifiers((Z) => X2("right"), ["prevent"]), ["right"])),
          de
        ]
      }, [
        (Y2.disabled || Y2.readonly) && unref(C).enabled ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(y3.value)
        }, null, 2)) : createCommentVNode("", true),
        !unref(C).enabled && !Y2.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(G2.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: x2,
          class: normalizeClass({
            dp__menu_content_wrapper: ((Me = Y2.presetDates) == null ? void 0 : Me.length) || !!Y2.$slots["left-sidebar"] || !!Y2.$slots["right-sidebar"]
          }),
          style: normalizeStyle({ "--dp-menu-width": `${R2.value}px` })
        }, [
          Y2.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", wo, [
            renderSlot(Y2.$slots, "left-sidebar", normalizeProps(guardReactiveProps(ne.value)))
          ])) : createCommentVNode("", true),
          Y2.presetDates.length ? (openBlock(), createElementBlock("div", Do, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(Y2.presetDates, (Z, Ue) => (openBlock(), createElementBlock(Fragment, { key: Ue }, [
              Z.slot ? renderSlot(Y2.$slots, Z.slot, {
                key: 0,
                presetDate: te,
                label: Z.label,
                value: Z.value
              }) : (openBlock(), createElementBlock("button", {
                key: 1,
                type: "button",
                style: normalizeStyle(Z.style || {}),
                class: "dp__btn dp--preset-range",
                onClick: withModifiers((ze) => te(Z.value, Z.noTz), ["prevent"]),
                onKeydown: [
                  withKeys(withModifiers((ze) => te(Z.value, Z.noTz), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((ze) => te(Z.value, Z.noTz), ["prevent"]), ["space"])
                ]
              }, toDisplayString(Z.label), 45, Mo))
            ], 64))), 128))
          ])) : createCommentVNode("", true),
          createBaseVNode("div", {
            ref_key: "calendarWrapperRef",
            ref: I2,
            class: "dp__instance_calendar",
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(D2.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: S3
            }, o.value, {
              "flow-step": unref(L2),
              onMount: unref(E2),
              onUpdateFlowStep: unref(ie),
              onResetFlow: unref(f),
              onFocusMenu: H3,
              onSelectDate: U[0] || (U[0] = (Z) => Y2.$emit("select-date")),
              onDateUpdate: U[1] || (U[1] = (Z) => Y2.$emit("date-update", Z)),
              onTooltipOpen: U[2] || (U[2] = (Z) => Y2.$emit("tooltip-open", Z)),
              onTooltipClose: U[3] || (U[3] = (Z) => Y2.$emit("tooltip-close", Z)),
              onAutoApply: U[4] || (U[4] = (Z) => Y2.$emit("auto-apply", Z)),
              onRangeStart: U[5] || (U[5] = (Z) => Y2.$emit("range-start", Z)),
              onRangeEnd: U[6] || (U[6] = (Z) => Y2.$emit("range-end", Z)),
              onInvalidFixedRange: U[7] || (U[7] = (Z) => Y2.$emit("invalid-fixed-range", Z)),
              onTimeUpdate: U[8] || (U[8] = (Z) => Y2.$emit("time-update")),
              onAmPmChange: U[9] || (U[9] = (Z) => Y2.$emit("am-pm-change", Z)),
              onTimePickerOpen: U[10] || (U[10] = (Z) => Y2.$emit("time-picker-open", Z)),
              onTimePickerClose: T2,
              onRecalculatePosition: _,
              onUpdateMonthYear: U[11] || (U[11] = (Z) => Y2.$emit("update-month-year", Z)),
              onAutoApplyInvalid: U[12] || (U[12] = (Z) => Y2.$emit("auto-apply-invalid", Z)),
              onInvalidDate: U[13] || (U[13] = (Z) => Y2.$emit("invalid-date", Z)),
              "onUpdate:internalModelValue": U[14] || (U[14] = (Z) => Y2.$emit("update:internal-model-value", Z))
            }), createSlots({ _: 2 }, [
              renderList(O2.value, (Z, Ue) => ({
                name: Z,
                fn: withCtx((ze) => [
                  renderSlot(Y2.$slots, Z, normalizeProps(guardReactiveProps({ ...ze })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          Y2.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", $o, [
            renderSlot(Y2.$slots, "right-sidebar", normalizeProps(guardReactiveProps(ne.value)))
          ])) : createCommentVNode("", true),
          Y2.$slots["action-extra"] ? (openBlock(), createElementBlock("div", To, [
            Y2.$slots["action-extra"] ? renderSlot(Y2.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: K2
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 6),
        !Y2.autoApply || unref(k2).keepActionRow ? (openBlock(), createBlock(Tl, mergeProps({
          key: 2,
          "menu-mount": g.value
        }, o.value, {
          "calendar-width": R2.value,
          onClosePicker: U[15] || (U[15] = (Z) => Y2.$emit("close-picker")),
          onSelectDate: U[16] || (U[16] = (Z) => Y2.$emit("select-date")),
          onInvalidSelect: U[17] || (U[17] = (Z) => Y2.$emit("invalid-select")),
          onSelectNow: K2
        }), createSlots({ _: 2 }, [
          renderList(unref(d3), (Z, Ue) => ({
            name: Z,
            fn: withCtx((ze) => [
              renderSlot(Y2.$slots, Z, normalizeProps(guardReactiveProps({ ...ze })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
      ], 42, ko);
    };
  }
});
var Ao = typeof window < "u" ? window : void 0;
var $n = () => {
};
var So = (e2) => getCurrentScope() ? (onScopeDispose(e2), true) : false;
var Po = (e2, t2, r, a3) => {
  if (!e2)
    return $n;
  let n = $n;
  const o = watch(
    () => unref(e2),
    (c2) => {
      n(), c2 && (c2.addEventListener(t2, r, a3), n = () => {
        c2.removeEventListener(t2, r, a3), n = $n;
      });
    },
    { immediate: true, flush: "post" }
  ), i2 = () => {
    o(), n();
  };
  return So(i2), i2;
};
var Co = (e2, t2, r, a3 = {}) => {
  const { window: n = Ao, event: o = "pointerdown" } = a3;
  return n ? Po(n, o, (c2) => {
    const p = _e(e2), M3 = _e(t2);
    !p || !M3 || p === c2.target || c2.composedPath().includes(p) || c2.composedPath().includes(M3) || r(c2);
  }, { passive: true }) : void 0;
};
var _o = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "VueDatePicker",
  props: {
    ...an
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
    "range-end",
    "date-update",
    "invalid-date"
  ],
  setup(e2, { expose: t2, emit: r }) {
    const a3 = r, n = e2, o = useSlots(), i2 = ref(false), c2 = toRef(n, "modelValue"), p = toRef(n, "timezone"), M3 = ref(null), $ = ref(null), C = ref(null), k2 = ref(false), I2 = ref(null), R2 = ref(false), A = ref(false), { setMenuFocused: x2, setShiftKey: g } = Ha(), { clearArrowNav: S3 } = yt(), { mapDatesArrToMap: F, validateDate: b2, isValidTime: P } = Mt(n), { defaultedTransitions: Q2, defaultedTextInput: ae, defaultedInline: L2, defaultedConfig: ie } = Pe(n), { menuTransition: E2, showTransition: f } = Lt(Q2);
    onMounted(() => {
      X2(n.modelValue), nextTick().then(() => {
        if (!L2.value.enabled) {
          const J = y3(I2.value);
          J == null || J.addEventListener("scroll", re), window == null || window.addEventListener("resize", be);
        }
      }), L2.value.enabled && (i2.value = true), window == null || window.addEventListener("keyup", Y2), window == null || window.addEventListener("keydown", U);
    });
    const D2 = computed(() => F());
    onUnmounted(() => {
      if (!L2.value.enabled) {
        const J = y3(I2.value);
        J == null || J.removeEventListener("scroll", re), window == null || window.removeEventListener("resize", be);
      }
      window == null || window.removeEventListener("keyup", Y2), window == null || window.removeEventListener("keydown", U);
    });
    const H3 = Ke(o, "all", n.presetDates), ne = Ke(o, "input");
    watch(
      [c2, p],
      () => {
        X2(c2.value);
      },
      { deep: true }
    );
    const { openOnTop: _, menuStyle: d3, xCorrect: O2, setMenuPosition: G2, getScrollableParent: y3, shadowRender: l } = vl({
      menuRef: M3,
      menuRefInner: $,
      inputRef: C,
      pickerWrapperRef: I2,
      inline: L2,
      emit: a3,
      props: n,
      slots: o
    }), {
      inputValue: h4,
      internalModelValue: s3,
      parseExternalModelValue: X2,
      emitModelValue: de,
      formatInputValue: T2,
      checkBeforeEmit: u2
    } = cl(a3, n, k2), N = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: n.dark,
        dp__theme_light: !n.dark,
        dp__flex_display: L2.value.enabled,
        dp__flex_display_with_input: L2.value.input
      })
    ), q2 = computed(() => n.dark ? "dp__theme_dark" : "dp__theme_light"), K2 = computed(() => n.teleport ? {
      to: typeof n.teleport == "boolean" ? "body" : n.teleport,
      disabled: L2.value.enabled
    } : { class: "dp__outer_menu_wrap" }), te = computed(() => L2.value.enabled && (n.timePicker || n.monthPicker || n.yearPicker || n.quarterPicker)), re = () => {
      i2.value && (ie.value.closeOnScroll ? Ge() : G2());
    }, be = () => {
      i2.value && G2();
    }, Y2 = (J) => {
      J.key === "Tab" && !L2.value.enabled && !n.teleport && ie.value.tabOutClosesMenu && (I2.value.contains(document.activeElement) || Ge()), A.value = J.shiftKey;
    }, U = (J) => {
      A.value = J.shiftKey;
    }, Me = () => {
      !n.disabled && !n.readonly && (l(ha, n), G2(false), i2.value = true, i2.value && a3("open"), i2.value || Ot(), X2(n.modelValue));
    }, Z = () => {
      var J;
      h4.value = "", Ot(), (J = C.value) == null || J.setParsedDate(null), a3("update:model-value", null), a3("update:model-timezone-value", null), a3("cleared"), ie.value.closeOnClearValue && Ge();
    }, Ue = () => {
      const J = s3.value;
      return !J || !Array.isArray(J) && b2(J) ? true : Array.isArray(J) ? n.multiDates || J.length === 2 && b2(J[0]) && b2(J[1]) ? true : n.partialRange && !n.timePicker ? b2(J[0]) : false : false;
    }, ze = () => {
      u2() && Ue() ? (de(), Ge()) : a3("invalid-select", s3.value);
    }, $t = (J) => {
      Wt(), de(), ie.value.closeOnAutoApply && !J && Ge();
    }, Wt = () => {
      C.value && ae.value.enabled && C.value.setParsedDate(s3.value);
    }, on = (J = false) => {
      n.autoApply && P(s3.value) && Ue() && (n.range && Array.isArray(s3.value) ? (n.partialRange || s3.value.length === 2) && $t(J) : $t(J));
    }, Ot = () => {
      ae.value.enabled || (s3.value = null);
    }, Ge = () => {
      L2.value.enabled || (i2.value && (i2.value = false, O2.value = false, x2(false), g(false), S3(), a3("closed"), h4.value && X2(c2.value)), Ot(), a3("blur"));
    }, sn = (J, ue, se = false) => {
      if (!J) {
        s3.value = null;
        return;
      }
      const rt = Array.isArray(J) ? !J.some((ot) => !b2(ot)) : b2(J), lt = P(J);
      rt && lt && (s3.value = J, ue && (R2.value = se, ze(), a3("text-submit")));
    }, un = () => {
      n.autoApply && P(s3.value) && de(), Wt();
    }, jt = () => i2.value ? Ge() : Me(), dn = (J) => {
      s3.value = J;
    }, Zn = () => {
      ae.value.enabled && (k2.value = true, T2()), a3("focus");
    }, m3 = () => {
      if (ae.value.enabled && (k2.value = false, X2(n.modelValue), R2.value)) {
        const J = Wr(I2.value, A.value);
        J == null || J.focus();
      }
      a3("blur");
    }, z2 = (J) => {
      $.value && $.value.updateMonthYear(0, {
        month: da(J.month),
        year: da(J.year)
      });
    }, oe = (J) => {
      X2(J ?? n.modelValue);
    }, me = (J, ue) => {
      var se;
      (se = $.value) == null || se.switchView(J, ue);
    }, Se = (J) => ie.value.onClickOutside ? ie.value.onClickOutside(J) : Ge();
    return Co(M3, C, () => Se(Ue)), t2({
      closeMenu: Ge,
      selectDate: ze,
      clearValue: Z,
      openMenu: Me,
      onScroll: re,
      formatInputValue: T2,
      // exposed for testing purposes
      updateInternalModelValue: dn,
      // modify internal modelValue
      setMonthYear: z2,
      parseModel: oe,
      switchView: me,
      toggleMenu: jt
    }), (J, ue) => (openBlock(), createElementBlock("div", {
      ref_key: "pickerWrapperRef",
      ref: I2,
      class: normalizeClass(N.value),
      "data-datepicker-instance": ""
    }, [
      createVNode(wl, mergeProps({
        ref_key: "inputRef",
        ref: C,
        "input-value": unref(h4),
        "onUpdate:inputValue": ue[0] || (ue[0] = (se) => isRef(h4) ? h4.value = se : null),
        "is-menu-open": i2.value
      }, J.$props, {
        onClear: Z,
        onOpen: Me,
        onSetInputDate: sn,
        onSetEmptyDate: unref(de),
        onSelectDate: ze,
        onToggle: jt,
        onClose: Ge,
        onFocus: Zn,
        onBlur: m3,
        onRealBlur: ue[1] || (ue[1] = (se) => k2.value = false)
      }), createSlots({ _: 2 }, [
        renderList(unref(ne), (se, rt) => ({
          name: se,
          fn: withCtx((lt) => [
            renderSlot(J.$slots, se, normalizeProps(guardReactiveProps(lt)))
          ])
        }))
      ]), 1040, ["input-value", "is-menu-open", "onSetEmptyDate"]),
      createVNode(Transition, {
        name: unref(E2)(unref(_)),
        css: unref(f) && !unref(L2).enabled
      }, {
        default: withCtx(() => [
          i2.value ? (openBlock(), createBlock(resolveDynamicComponent(J.teleport ? Teleport : "div"), mergeProps({
            key: 0,
            ref_key: "dpWrapMenuRef",
            ref: M3
          }, K2.value, {
            class: { "dp--menu-wrapper": !unref(L2).enabled },
            style: unref(L2).enabled ? void 0 : unref(d3)
          }), {
            default: withCtx(() => [
              createVNode(ha, mergeProps({
                ref_key: "dpMenuRef",
                ref: $
              }, J.$props, {
                "internal-model-value": unref(s3),
                "onUpdate:internalModelValue": ue[2] || (ue[2] = (se) => isRef(s3) ? s3.value = se : null),
                class: { [q2.value]: true, "dp--menu-wrapper": J.teleport },
                style: J.teleport ? unref(d3) : void 0,
                "open-on-top": unref(_),
                "arr-map-values": D2.value,
                "no-overlay-focus": te.value,
                onClosePicker: Ge,
                onSelectDate: ze,
                onAutoApply: on,
                onTimeUpdate: un,
                onFlowStep: ue[3] || (ue[3] = (se) => J.$emit("flow-step", se)),
                onUpdateMonthYear: ue[4] || (ue[4] = (se) => J.$emit("update-month-year", se)),
                onInvalidSelect: ue[5] || (ue[5] = (se) => J.$emit("invalid-select", unref(s3))),
                onAutoApplyInvalid: ue[6] || (ue[6] = (se) => J.$emit("invalid-select", se)),
                onInvalidFixedRange: ue[7] || (ue[7] = (se) => J.$emit("invalid-fixed-range", se)),
                onRecalculatePosition: unref(G2),
                onTooltipOpen: ue[8] || (ue[8] = (se) => J.$emit("tooltip-open", se)),
                onTooltipClose: ue[9] || (ue[9] = (se) => J.$emit("tooltip-close", se)),
                onTimePickerOpen: ue[10] || (ue[10] = (se) => J.$emit("time-picker-open", se)),
                onTimePickerClose: ue[11] || (ue[11] = (se) => J.$emit("time-picker-close", se)),
                onAmPmChange: ue[12] || (ue[12] = (se) => J.$emit("am-pm-change", se)),
                onRangeStart: ue[13] || (ue[13] = (se) => J.$emit("range-start", se)),
                onRangeEnd: ue[14] || (ue[14] = (se) => J.$emit("range-end", se)),
                onDateUpdate: ue[15] || (ue[15] = (se) => J.$emit("date-update", se)),
                onInvalidDate: ue[16] || (ue[16] = (se) => J.$emit("invalid-date", se))
              }), createSlots({ _: 2 }, [
                renderList(unref(H3), (se, rt) => ({
                  name: se,
                  fn: withCtx((lt) => [
                    renderSlot(J.$slots, se, normalizeProps(guardReactiveProps({ ...lt })))
                  ])
                }))
              ]), 1040, ["internal-model-value", "class", "style", "open-on-top", "arr-map-values", "no-overlay-focus", "onRecalculatePosition"])
            ]),
            _: 3
          }, 16, ["class", "style"])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["name", "css"])
    ], 2));
  }
});
var ja = (() => {
  const e2 = _o;
  return e2.install = (t2) => {
    t2.component("Vue3DatePicker", e2);
  }, e2;
})();
var Ro = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: ja
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(Ro).forEach(([e2, t2]) => {
  e2 !== "default" && (ja[e2] = t2);
});
export {
  ja as default
};
//# sourceMappingURL=@vuepic_vue-datepicker.js.map
