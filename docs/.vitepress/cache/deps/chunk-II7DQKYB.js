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
} from "./chunk-5XUBXWZS.js";

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/typeof.js
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

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++)
    arr2[i2] = arr[i2];
  return arr2;
}

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
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

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
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

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/inherits.js
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

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function _isNativeReflectConstruct() {
  try {
    var t2 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t3) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t2;
  })();
}

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/createSuper.js
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

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/toPrimitive.js
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

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function toPropertyKey(t2) {
  var i2 = toPrimitive(t2, "string");
  return "symbol" == _typeof(i2) ? i2 : String(i2);
}

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/createClass.js
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

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/defineProperty.js
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

// node_modules/.pnpm/@vuepic+vue-datepicker@7.4.1_vue@3.4.19/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
function Ot() {
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
Ot.compatConfig = {
  MODE: 3
};
function Aa() {
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
Aa.compatConfig = {
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
var Sa = { exports: {} };
(function(e2) {
  function t2(r) {
    return r && r.__esModule ? r : {
      default: r
    };
  }
  e2.exports = t2, e2.exports.__esModule = true, e2.exports.default = e2.exports;
})(Sa);
var fr = Sa.exports;
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
var vr = An.exports;
var mr = Un(vr);
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
var gr = Sn.exports;
var na = Un(gr);
function yr(e2, t2) {
  var r = kr(t2);
  return r.formatToParts ? pr(r, e2) : br(r, e2);
}
var hr = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function pr(e2, t2) {
  try {
    for (var r = e2.formatToParts(t2), a3 = [], n = 0; n < r.length; n++) {
      var o = hr[r[n].type];
      o >= 0 && (a3[o] = parseInt(r[n].value, 10));
    }
    return a3;
  } catch (i2) {
    if (i2 instanceof RangeError)
      return [NaN];
    throw i2;
  }
}
function br(e2, t2) {
  var r = e2.format(t2).replace(/\u200E/g, ""), a3 = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(r);
  return [a3[3], a3[1], a3[2], a3[4], a3[5], a3[6]];
}
var fn = {};
function kr(e2) {
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
var aa = 36e5;
var wr = 6e4;
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
    return o = parseInt(a3[1], 10), ra(o) ? -(o * aa) : NaN;
  if (a3 = vn.timezoneHHMM.exec(e2), a3) {
    o = parseInt(a3[1], 10);
    var i2 = parseInt(a3[2], 10);
    return ra(o, i2) ? (n = Math.abs(o) * aa + i2 * wr, o > 0 ? -n : n) : NaN;
  }
  if ($r(e2)) {
    t2 = new Date(t2 || Date.now());
    var c2 = r ? t2 : Dr(t2), p = Pn(c2, e2), T2 = r ? p : Mr(t2, p, e2);
    return -T2;
  }
  return NaN;
}
function Dr(e2) {
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
  var r = yr(e2, t2), a3 = zn(
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
function Mr(e2, t2, r) {
  var a3 = e2.getTime(), n = a3 - t2, o = Pn(new Date(n), r);
  if (t2 === o)
    return t2;
  n -= o - t2;
  var i2 = Pn(new Date(n), r);
  return o === i2 ? o : Math.max(o, i2);
}
function ra(e2, t2) {
  return -23 <= e2 && e2 <= 23 && (t2 == null || 0 <= t2 && t2 <= 59);
}
var la = {};
function $r(e2) {
  if (la[e2])
    return true;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e2 }), la[e2] = true, true;
  } catch {
    return false;
  }
}
var Pa = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
var mn = 36e5;
var oa = 6e4;
var Tr = 2;
var Ve = {
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
  timeZone: Pa
};
function Cn(e2, t2) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e2 === null)
    return /* @__PURE__ */ new Date(NaN);
  var r = t2 || {}, a3 = r.additionalDigits == null ? Tr : mr(r.additionalDigits);
  if (a3 !== 2 && a3 !== 1 && a3 !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e2 instanceof Date || typeof e2 == "object" && Object.prototype.toString.call(e2) === "[object Date]")
    return new Date(e2.getTime());
  if (typeof e2 == "number" || Object.prototype.toString.call(e2) === "[object Number]")
    return new Date(e2);
  if (!(typeof e2 == "string" || Object.prototype.toString.call(e2) === "[object String]"))
    return /* @__PURE__ */ new Date(NaN);
  var n = Ar(e2), o = Sr(n.date, a3), i2 = o.year, c2 = o.restDateString, p = Pr(c2, i2);
  if (isNaN(p))
    return /* @__PURE__ */ new Date(NaN);
  if (p) {
    var T2 = p.getTime(), D2 = 0, R2;
    if (n.time && (D2 = Cr(n.time), isNaN(D2)))
      return /* @__PURE__ */ new Date(NaN);
    if (n.timeZone || r.timeZone) {
      if (R2 = Wn(n.timeZone || r.timeZone, new Date(T2 + D2)), isNaN(R2))
        return /* @__PURE__ */ new Date(NaN);
    } else
      R2 = na(new Date(T2 + D2)), R2 = na(new Date(T2 + D2 + R2));
    return new Date(T2 + D2 + R2);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function Ar(e2) {
  var t2 = {}, r = Ve.dateTimePattern.exec(e2), a3;
  if (r ? (t2.date = r[1], a3 = r[3]) : (r = Ve.datePattern.exec(e2), r ? (t2.date = r[1], a3 = r[2]) : (t2.date = null, a3 = e2)), a3) {
    var n = Ve.timeZone.exec(a3);
    n ? (t2.time = a3.replace(n[1], ""), t2.timeZone = n[1].trim()) : t2.time = a3;
  }
  return t2;
}
function Sr(e2, t2) {
  var r = Ve.YYY[t2], a3 = Ve.YYYYY[t2], n;
  if (n = Ve.YYYY.exec(e2) || a3.exec(e2), n) {
    var o = n[1];
    return {
      year: parseInt(o, 10),
      restDateString: e2.slice(o.length)
    };
  }
  if (n = Ve.YY.exec(e2) || r.exec(e2), n) {
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
function Pr(e2, t2) {
  if (t2 === null)
    return null;
  var r, a3, n, o;
  if (e2.length === 0)
    return a3 = /* @__PURE__ */ new Date(0), a3.setUTCFullYear(t2), a3;
  if (r = Ve.MM.exec(e2), r)
    return a3 = /* @__PURE__ */ new Date(0), n = parseInt(r[1], 10) - 1, ia(t2, n) ? (a3.setUTCFullYear(t2, n), a3) : /* @__PURE__ */ new Date(NaN);
  if (r = Ve.DDD.exec(e2), r) {
    a3 = /* @__PURE__ */ new Date(0);
    var i2 = parseInt(r[1], 10);
    return Or(t2, i2) ? (a3.setUTCFullYear(t2, 0, i2), a3) : /* @__PURE__ */ new Date(NaN);
  }
  if (r = Ve.MMDD.exec(e2), r) {
    a3 = /* @__PURE__ */ new Date(0), n = parseInt(r[1], 10) - 1;
    var c2 = parseInt(r[2], 10);
    return ia(t2, n, c2) ? (a3.setUTCFullYear(t2, n, c2), a3) : /* @__PURE__ */ new Date(NaN);
  }
  if (r = Ve.Www.exec(e2), r)
    return o = parseInt(r[1], 10) - 1, ua(t2, o) ? sa(t2, o) : /* @__PURE__ */ new Date(NaN);
  if (r = Ve.WwwD.exec(e2), r) {
    o = parseInt(r[1], 10) - 1;
    var p = parseInt(r[2], 10) - 1;
    return ua(t2, o, p) ? sa(t2, o, p) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function Cr(e2) {
  var t2, r, a3;
  if (t2 = Ve.HH.exec(e2), t2)
    return r = parseFloat(t2[1].replace(",", ".")), gn(r) ? r % 24 * mn : NaN;
  if (t2 = Ve.HHMM.exec(e2), t2)
    return r = parseInt(t2[1], 10), a3 = parseFloat(t2[2].replace(",", ".")), gn(r, a3) ? r % 24 * mn + a3 * oa : NaN;
  if (t2 = Ve.HHMMSS.exec(e2), t2) {
    r = parseInt(t2[1], 10), a3 = parseInt(t2[2], 10);
    var n = parseFloat(t2[3].replace(",", "."));
    return gn(r, a3, n) ? r % 24 * mn + a3 * oa + n * 1e3 : NaN;
  }
  return null;
}
function sa(e2, t2, r) {
  t2 = t2 || 0, r = r || 0;
  var a3 = /* @__PURE__ */ new Date(0);
  a3.setUTCFullYear(e2, 0, 4);
  var n = a3.getUTCDay() || 7, o = t2 * 7 + r + 1 - n;
  return a3.setUTCDate(a3.getUTCDate() + o), a3;
}
var _r = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var Rr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Ca(e2) {
  return e2 % 400 === 0 || e2 % 4 === 0 && e2 % 100 !== 0;
}
function ia(e2, t2, r) {
  if (t2 < 0 || t2 > 11)
    return false;
  if (r != null) {
    if (r < 1)
      return false;
    var a3 = Ca(e2);
    if (a3 && r > Rr[t2] || !a3 && r > _r[t2])
      return false;
  }
  return true;
}
function Or(e2, t2) {
  if (t2 < 1)
    return false;
  var r = Ca(e2);
  return !(r && t2 > 366 || !r && t2 > 365);
}
function ua(e2, t2, r) {
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
var Yr = Rn.exports;
(function(e2, t2) {
  var r = fr.default;
  Object.defineProperty(t2, "__esModule", {
    value: true
  }), t2.default = n;
  var a3 = r(Yr);
  function n(o) {
    return (0, a3.default)({}, o);
  }
  e2.exports = t2.default;
})(_n, _n.exports);
var Nr = _n.exports;
var Ir = Un(Nr);
function Br(e2, t2, r) {
  var a3 = Cn(e2, r), n = Wn(t2, a3, true), o = new Date(a3.getTime() - n), i2 = /* @__PURE__ */ new Date(0);
  return i2.setFullYear(o.getUTCFullYear(), o.getUTCMonth(), o.getUTCDate()), i2.setHours(o.getUTCHours(), o.getUTCMinutes(), o.getUTCSeconds(), o.getUTCMilliseconds()), i2;
}
function Er(e2, t2, r) {
  if (typeof e2 == "string" && !e2.match(Pa)) {
    var a3 = Ir(r);
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
function da(e2) {
  return (t2) => new Intl.DateTimeFormat(e2, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${t2}T00:00:00+00:00`)).slice(0, 2);
}
function Fr(e2) {
  return (t2) => format(/* @__PURE__ */ new Date(`2017-01-0${t2}T00:00:00+00:00`), "EEEEEE", { locale: e2 });
}
var Hr = (e2, t2, r) => {
  const a3 = [1, 2, 3, 4, 5, 6, 7];
  let n;
  if (e2 !== null)
    try {
      n = a3.map(Fr(e2));
    } catch {
      n = a3.map(da(t2));
    }
  else
    n = a3.map(da(t2));
  const o = n.slice(0, r), i2 = n.slice(r + 1, n.length);
  return [n[r]].concat(...i2).concat(...o);
};
var jn = (e2, t2) => {
  const r = [];
  for (let a3 = +e2[0]; a3 <= +e2[1]; a3++)
    r.push({ value: +a3, text: `${a3}` });
  return t2 ? r.reverse() : r;
};
var _a = (e2, t2, r) => {
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
var Vr = (e2) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e2];
var Re = (e2) => {
  const t2 = unref(e2);
  return t2 != null && t2.$el ? t2 == null ? void 0 : t2.$el : t2;
};
var Lr = (e2) => Object.assign({ type: "dot" }, e2);
var Ra = (e2) => Array.isArray(e2) ? !!e2[0] && !!e2[1] : false;
var tn = {
  prop: (e2) => `"${e2}" prop must be enabled!`,
  dateArr: (e2) => `You need to use array as "model-value" binding in order to support "${e2}"`
};
var Ce = (e2) => e2;
var ca = (e2) => e2 === 0 ? e2 : !e2 || isNaN(+e2) ? null : +e2;
var fa = (e2) => e2 === null;
var Ur = (e2) => {
  if (e2)
    return [...e2.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var zr = (e2) => {
  const t2 = [], r = (a3) => a3.filter((n) => n);
  for (let a3 = 0; a3 < e2.length; a3 += 3) {
    const n = [e2[a3], e2[a3 + 1], e2[a3 + 2]];
    t2.push(r(n));
  }
  return t2;
};
var Ht = (e2, t2, r) => {
  const a3 = r != null, n = t2 != null;
  if (!a3 && !n)
    return false;
  const o = +r, i2 = +t2;
  return a3 && n ? +e2 > o || +e2 < i2 : a3 ? +e2 > o : n ? +e2 < i2 : false;
};
var Ct = (e2, t2) => zr(e2).map((r) => r.map((a3) => {
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
var Wr = () => [
  "a[href]",
  "area[href]",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[data-datepicker-instance]"
].join(", ");
function jr(e2, t2) {
  let r = [...document.querySelectorAll(Wr())];
  r = r.filter((n) => !e2.contains(n) || n.hasAttribute("data-datepicker-instance"));
  const a3 = r.indexOf(e2);
  if (a3 >= 0 && (t2 ? a3 - 1 >= 0 : a3 + 1 <= r.length))
    return r[a3 + (t2 ? -1 : 1)];
}
var Kr = (e2, t2) => {
  let r;
  return function(...a3) {
    clearTimeout(r), r = setTimeout(() => {
      e2(...a3);
    }, t2);
  };
};
var va = (e2, t2, r, a3, n) => {
  const o = parse(e2, t2.slice(0, e2.length), /* @__PURE__ */ new Date());
  return isValid(o) && isDate(o) ? a3 || n ? o : set(o, {
    hours: +r.hours,
    minutes: +(r == null ? void 0 : r.minutes),
    seconds: +(r == null ? void 0 : r.seconds),
    milliseconds: 0
  }) : null;
};
var Gr = (e2, t2, r, a3, n) => {
  const o = Array.isArray(r) ? r[0] : r;
  if (typeof t2 == "string")
    return va(e2, t2, o, a3, n);
  if (Array.isArray(t2)) {
    let i2 = null;
    for (const c2 of t2)
      if (i2 = va(e2, c2, o, a3, n), i2)
        break;
    return i2;
  }
  return typeof t2 == "function" ? t2(e2) : null;
};
var B2 = (e2) => e2 ? new Date(e2) : /* @__PURE__ */ new Date();
var qr = (e2, t2, r) => {
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
var Fe = (e2) => {
  let t2 = B2(JSON.parse(JSON.stringify(e2)));
  return t2 = setHours(t2, 0), t2 = setMinutes(t2, 0), t2 = setSeconds(t2, 0), t2 = setMilliseconds(t2, 0), t2;
};
var vt = (e2, t2, r, a3) => {
  let n = e2 ? B2(e2) : B2();
  return (t2 || t2 === 0) && (n = setHours(n, +t2)), (r || r === 0) && (n = setMinutes(n, +r)), (a3 || a3 === 0) && (n = setSeconds(n, +a3)), setMilliseconds(n, 0);
};
var Ye = (e2, t2) => !e2 || !t2 ? false : isBefore(Fe(e2), Fe(t2));
var ke = (e2, t2) => !e2 || !t2 ? false : isEqual(Fe(e2), Fe(t2));
var Ee = (e2, t2) => !e2 || !t2 ? false : isAfter(Fe(e2), Fe(t2));
var nn = (e2, t2, r) => e2 != null && e2[0] && (e2 != null && e2[1]) ? Ee(r, e2[0]) && Ye(r, e2[1]) : e2 != null && e2[0] && t2 ? Ee(r, e2[0]) && Ye(r, t2) || Ye(r, e2[0]) && Ee(r, t2) : false;
var Xe = (e2) => {
  const t2 = set(new Date(e2), { date: 1 });
  return Fe(t2);
};
var yn = (e2, t2, r) => t2 && (r || r === 0) ? Object.fromEntries(
  ["hours", "minutes", "seconds"].map((a3) => a3 === t2 ? [a3, r] : [a3, isNaN(+e2[a3]) ? void 0 : +e2[a3]])
) : {
  hours: isNaN(+e2.hours) ? void 0 : +e2.hours,
  minutes: isNaN(+e2.minutes) ? void 0 : +e2.minutes,
  seconds: isNaN(+e2.seconds) ? void 0 : +e2.seconds
};
var wt = (e2) => ({
  hours: getHours(e2),
  minutes: getMinutes(e2),
  seconds: getSeconds(e2)
});
var Oa = (e2, t2) => {
  if (t2) {
    const r = getYear(B2(t2));
    if (r > e2)
      return 12;
    if (r === e2)
      return getMonth(B2(t2));
  }
};
var Ya = (e2, t2) => {
  if (t2) {
    const r = getYear(B2(t2));
    return r < e2 ? -1 : r === e2 ? getMonth(B2(t2)) : void 0;
  }
};
var _t = (e2) => {
  if (e2)
    return getYear(B2(e2));
};
var et = (e2, t2) => t2 ? Br(e2, t2) : e2;
var Na = (e2, t2) => t2 ? Er(e2, t2) : e2;
var Zr = (e2) => e2 instanceof Date ? e2 : parseISO(e2);
var Ia = (e2, t2) => {
  const r = Ee(e2, t2) ? t2 : e2, a3 = Ee(t2, e2) ? t2 : e2;
  return eachDayOfInterval({ start: r, end: a3 });
};
var Qr = (e2) => {
  const t2 = addMonths(e2, 1);
  return { month: getMonth(t2), year: getYear(t2) };
};
var xt = (e2, t2, r) => {
  const a3 = startOfWeek(et(e2, t2), { weekStartsOn: +r }), n = endOfWeek(et(e2, t2), { weekStartsOn: +r });
  return [a3, n];
};
var Ba = (e2, t2) => {
  const r = {
    hours: getHours(B2()),
    minutes: getMinutes(B2()),
    seconds: t2 ? getSeconds(B2()) : 0
  };
  return Object.assign(r, e2);
};
var dt = (e2, t2, r) => [set(B2(e2), { date: 1 }), set(B2(), { month: t2, year: r, date: 1 })];
var ot = (e2, t2, r) => {
  let a3 = e2 ? B2(e2) : B2();
  return (t2 || t2 === 0) && (a3 = setMonth(a3, t2)), r && (a3 = setYear(a3, r)), a3;
};
var Ea = (e2, t2, r, a3, n) => {
  if (!a3 || n && !t2 || !n && !r)
    return false;
  const o = n ? addMonths(e2, 1) : subMonths(e2, 1), i2 = [getMonth(o), getYear(o)];
  return n ? !Jr(...i2, t2) : !Xr(...i2, r);
};
var Xr = (e2, t2, r) => Ye(...dt(r, e2, t2)) || ke(...dt(r, e2, t2));
var Jr = (e2, t2, r) => Ee(...dt(r, e2, t2)) || ke(...dt(r, e2, t2));
var Fa = (e2, t2, r, a3, n, o, i2) => {
  if (typeof t2 == "function" && !i2)
    return t2(e2);
  const c2 = r ? { locale: r } : void 0;
  return Array.isArray(e2) ? `${format(e2[0], o, c2)}${n && !e2[1] ? "" : a3}${e2[1] ? format(e2[1], o, c2) : ""}` : format(e2, o, c2);
};
var Tt = (e2) => {
  if (e2)
    return null;
  throw new Error(tn.prop("partial-range"));
};
var qt = (e2, t2) => {
  if (t2)
    return e2();
  throw new Error(tn.prop("range"));
};
var On = (e2) => Array.isArray(e2) ? isValid(e2[0]) && (e2[1] ? isValid(e2[1]) : true) : e2 ? isValid(e2) : false;
var xr = (e2, t2) => set(t2 ?? B2(), {
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
var pn = (e2, t2, r) => e2 ? xr(e2, t2) : B2(r ?? t2);
var ma = (e2, t2, r, a3, n) => {
  if (Array.isArray(a3)) {
    const i2 = pn(e2, a3[0], t2), c2 = pn(e2, a3[1], t2);
    return hn(a3[0], i2, r, !!t2) && hn(a3[1], c2, r, !!t2) && n;
  }
  const o = pn(e2, a3, t2);
  return hn(a3, o, r, !!t2) && n;
};
var bn = (e2) => set(B2(), wt(e2));
var el = (e2, t2) => Array.isArray(e2) ? e2.map((r) => B2(r)).filter((r) => getYear(B2(r)) === t2).map((r) => getMonth(r)) : [];
var Ha = (e2, t2, r) => typeof e2 == "function" ? e2({ month: t2, year: r }) : !!e2.months.find((a3) => a3.month === t2 && a3.year === r);
var Kn = (e2, t2) => typeof e2 == "function" ? e2(t2) : e2.years.includes(t2);
var Nt = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Va = () => {
  const e2 = (a3) => {
    Nt.menuFocused = a3;
  }, t2 = (a3) => {
    Nt.shiftKeyInMenu !== a3 && (Nt.shiftKeyInMenu = a3);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: Nt.shiftKeyInMenu, menuFocused: Nt.menuFocused })),
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
var Zt = ref(false);
var wn = ref(false);
var Dn = ref(false);
var Mn = ref(false);
var He = ref(0);
var Oe = ref(0);
var yt = () => {
  const e2 = computed(() => Zt.value ? [...$e.selectionGrid, $e.actionRow].filter((g) => g.length) : wn.value ? [
    ...$e.timePicker[0],
    ...$e.timePicker[1],
    Mn.value ? [] : [kn.value],
    $e.actionRow
  ].filter((g) => g.length) : Dn.value ? [...$e.monthPicker, $e.actionRow] : [$e.monthYear, ...$e.calendar, $e.time, $e.actionRow].filter((g) => g.length)), t2 = (g) => {
    He.value = g ? He.value + 1 : He.value - 1;
    let S3 = null;
    e2.value[Oe.value] && (S3 = e2.value[Oe.value][He.value]), S3 || (He.value = g ? He.value - 1 : He.value + 1);
  }, r = (g) => {
    if (Oe.value === 0 && !g || Oe.value === e2.value.length && g)
      return;
    Oe.value = g ? Oe.value + 1 : Oe.value - 1, e2.value[Oe.value] ? e2.value[Oe.value] && !e2.value[Oe.value][He.value] && He.value !== 0 && (He.value = e2.value[Oe.value].length - 1) : Oe.value = g ? Oe.value - 1 : Oe.value + 1;
  }, a3 = (g) => {
    let S3 = null;
    e2.value[Oe.value] && (S3 = e2.value[Oe.value][He.value]), S3 ? S3.focus({ preventScroll: !Zt.value }) : He.value = g ? He.value - 1 : He.value + 1;
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
  }, T2 = (g, S3) => {
    $e[S3] = g;
  }, D2 = () => {
    He.value = 0, Oe.value = 0;
  };
  return {
    buildMatrix: p,
    buildMultiLevelMatrix: T2,
    setTimePickerBackRef: (g) => {
      kn.value = g;
    },
    setSelectionGrid: (g) => {
      Zt.value = g, D2(), g || ($e.selectionGrid = []);
    },
    setTimePicker: (g, S3 = false) => {
      wn.value = g, Mn.value = S3, D2(), g || ($e.timePicker[0] = [], $e.timePicker[1] = []);
    },
    setTimePickerElements: (g, S3 = 0) => {
      $e.timePicker[S3] = g;
    },
    arrowRight: n,
    arrowLeft: o,
    arrowUp: i2,
    arrowDown: c2,
    clearArrowNav: () => {
      $e.monthYear = [], $e.calendar = [], $e.time = [], $e.actionRow = [], $e.selectionGrid = [], $e.timePicker[0] = [], $e.timePicker[1] = [], Zt.value = false, wn.value = false, Mn.value = false, Dn.value = false, D2(), kn.value = null;
    },
    setMonthPicker: (g) => {
      Dn.value = g, D2();
    },
    refSets: $e
    // exposed for testing
  };
};
var ga = (e2) => ({
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
var tl = (e2) => ({
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
var ya = (e2) => e2 ? typeof e2 == "boolean" ? e2 ? 2 : 0 : +e2 >= 2 ? +e2 : 2 : 0;
var nl = (e2) => {
  const t2 = typeof e2 == "object" && e2, r = {
    static: true,
    solo: false
  };
  if (!e2)
    return { ...r, count: ya(false) };
  const a3 = t2 ? e2 : {}, n = t2 ? a3.count ?? true : e2, o = ya(n);
  return Object.assign(r, a3, { count: o });
};
var al = (e2, t2, r) => e2 || (typeof r == "string" ? r : t2);
var rl = (e2) => typeof e2 == "boolean" ? e2 ? ga({}) : false : ga(e2);
var ll = (e2) => {
  const t2 = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: true,
    selectOnFocus: false,
    rangeSeparator: " - "
  };
  return typeof e2 == "object" ? { ...t2, ...e2 ?? {}, enabled: true } : { ...t2, enabled: e2 };
};
var ol = (e2) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...e2 ?? {}
});
var sl = (e2) => ({
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  ...e2 ?? {}
});
var il = (e2) => {
  const t2 = { input: false };
  return typeof e2 == "object" ? { ...t2, ...e2 ?? {}, enabled: true } : {
    enabled: e2,
    ...t2
  };
};
var ul = (e2) => ({ ...{
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
var dl = (e2, t2, r) => {
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
var cl = (e2) => typeof e2 == "object" ? {
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
  }, r = () => e2.format ? e2.format : e2.monthPicker ? "MM/yyyy" : e2.timePicker ? t2() : e2.weekPicker ? "MM/dd/yyyy" : e2.yearPicker ? "yyyy" : e2.quarterPicker ? "QQQ/yyyy" : e2.enableTimePicker ? `MM/dd/yyyy, ${t2()}` : "MM/dd/yyyy", a3 = (g) => Ba(g, e2.enableSeconds), n = () => e2.range ? e2.startTime && Array.isArray(e2.startTime) ? [a3(e2.startTime[0]), a3(e2.startTime[1])] : null : e2.startTime && !Array.isArray(e2.startTime) ? a3(e2.startTime) : null, o = computed(() => nl(e2.multiCalendars)), i2 = computed(() => n()), c2 = computed(() => tl(e2.ariaLabels)), p = computed(() => ol(e2.filters)), T2 = computed(() => rl(e2.transitions)), D2 = computed(() => sl(e2.actionRow)), R2 = computed(
    () => al(e2.previewFormat, e2.format, r())
  ), P = computed(() => ll(e2.textInput)), M3 = computed(() => il(e2.inline)), C = computed(() => ul(e2.config)), A = computed(
    () => dl(e2.highlight, e2.highlightWeekDays, e2.highlightDisabledDays)
  ), q2 = computed(() => cl(e2.weekNumbers));
  return {
    defaultedTransitions: T2,
    defaultedMultiCalendars: o,
    defaultedStartTime: i2,
    defaultedAriaLabels: c2,
    defaultedFilters: p,
    defaultedActionRow: D2,
    defaultedPreviewFormat: R2,
    defaultedTextInput: P,
    defaultedInline: M3,
    defaultedConfig: C,
    defaultedHighlight: A,
    defaultedWeekNumbers: q2,
    getDefaultPattern: r,
    getDefaultStartTime: n
  };
};
var fl = (e2, t2, r) => {
  const a3 = ref(), { defaultedTextInput: n, getDefaultPattern: o } = Pe(t2), i2 = ref(""), c2 = toRef(t2, "format");
  watch(a3, () => {
    e2("internal-model-change", a3.value);
  }), watch(c2, () => {
    ne();
  });
  const p = (s3) => Na(s3, t2.timezone), T2 = (s3) => et(s3, t2.timezone), D2 = (s3, J, de = false) => Fa(
    s3,
    t2.format,
    t2.formatLocale,
    n.value.rangeSeparator,
    t2.modelAuto,
    J ?? o(),
    de
  ), R2 = (s3) => s3 ? t2.modelType ? d3(s3) : {
    hours: getHours(s3),
    minutes: getMinutes(s3),
    seconds: t2.enableSeconds ? getSeconds(s3) : 0
  } : null, P = (s3) => t2.modelType ? d3(s3) : { month: getMonth(s3), year: getYear(s3) }, M3 = (s3) => Array.isArray(s3) ? t2.multiDates ? s3.map((J) => C(J, setYear(B2(), J))) : qt(
    () => [
      setYear(B2(), s3[0]),
      s3[1] ? setYear(B2(), s3[1]) : Tt(t2.partialRange)
    ],
    t2.range
  ) : setYear(B2(), +s3), C = (s3, J) => (typeof s3 == "string" || typeof s3 == "number") && t2.modelType ? O2(s3) : J, A = (s3) => Array.isArray(s3) ? [
    C(
      s3[0],
      vt(null, +s3[0].hours, +s3[0].minutes, s3[0].seconds)
    ),
    C(
      s3[1],
      vt(null, +s3[1].hours, +s3[1].minutes, s3[1].seconds)
    )
  ] : C(s3, vt(null, s3.hours, s3.minutes, s3.seconds)), q2 = (s3) => Array.isArray(s3) ? t2.multiDates ? s3.map((J) => C(J, ot(null, +J.month, +J.year))) : qt(
    () => [
      C(s3[0], ot(null, +s3[0].month, +s3[0].year)),
      C(
        s3[1],
        s3[1] ? ot(null, +s3[1].month, +s3[1].year) : Tt(t2.partialRange)
      )
    ],
    t2.range
  ) : C(s3, ot(null, +s3.month, +s3.year)), g = (s3) => {
    if (Array.isArray(s3))
      return s3.map((J) => O2(J));
    throw new Error(tn.dateArr("multi-dates"));
  }, S3 = (s3) => {
    if (Array.isArray(s3))
      return [B2(s3[0]), B2(s3[1])];
    throw new Error(tn.dateArr("week-picker"));
  }, F = (s3) => t2.modelAuto ? Array.isArray(s3) ? [O2(s3[0]), O2(s3[1])] : t2.autoApply ? [O2(s3)] : [O2(s3), null] : Array.isArray(s3) ? qt(
    () => [
      O2(s3[0]),
      s3[1] ? O2(s3[1]) : Tt(t2.partialRange)
    ],
    t2.range
  ) : O2(s3), b2 = () => {
    Array.isArray(a3.value) && t2.range && a3.value.length === 1 && a3.value.push(Tt(t2.partialRange));
  }, _ = () => {
    const s3 = a3.value;
    return [
      d3(s3[0]),
      s3[1] ? d3(s3[1]) : Tt(t2.partialRange)
    ];
  }, X2 = () => a3.value[1] ? _() : d3(Ce(a3.value[0])), ae = () => (a3.value || []).map((s3) => d3(s3)), V = () => (b2(), t2.modelAuto ? X2() : t2.multiDates ? ae() : Array.isArray(a3.value) ? qt(() => _(), t2.range) : d3(Ce(a3.value))), ie = (s3) => !s3 || Array.isArray(s3) && !s3.length ? null : t2.timePicker ? A(Ce(s3)) : t2.monthPicker ? q2(Ce(s3)) : t2.yearPicker ? M3(Ce(s3)) : t2.multiDates ? g(Ce(s3)) : t2.weekPicker ? S3(Ce(s3)) : F(Ce(s3)), E2 = (s3) => {
    const J = ie(s3);
    On(Ce(J)) ? (a3.value = Ce(J), ne()) : (a3.value = null, i2.value = "");
  }, f = () => {
    const s3 = (J) => format(J, n.value.format);
    return `${s3(a3.value[0])} ${n.value.rangeSeparator} ${a3.value[1] ? s3(a3.value[1]) : ""}`;
  }, w2 = () => r.value && a3.value ? Array.isArray(a3.value) ? f() : format(a3.value, n.value.format) : D2(a3.value), L2 = () => a3.value ? t2.multiDates ? a3.value.map((s3) => D2(s3)).join("; ") : n.value.enabled && typeof n.value.format == "string" ? w2() : D2(a3.value) : "", ne = () => {
    !t2.format || typeof t2.format == "string" || n.value.enabled && typeof n.value.format == "string" ? i2.value = L2() : i2.value = t2.format(a3.value);
  }, O2 = (s3) => {
    if (t2.utc) {
      const J = new Date(s3);
      return t2.utc === "preserve" ? new Date(J.getTime() + J.getTimezoneOffset() * 6e4) : J;
    }
    return t2.modelType ? t2.modelType === "date" || t2.modelType === "timestamp" ? T2(new Date(s3)) : t2.modelType === "format" && (typeof t2.format == "string" || !t2.format) ? parse(s3, o(), /* @__PURE__ */ new Date()) : T2(parse(s3, t2.modelType, /* @__PURE__ */ new Date())) : T2(new Date(s3));
  }, d3 = (s3) => s3 ? t2.utc ? qr(s3, t2.utc === "preserve", t2.enableSeconds) : t2.modelType ? t2.modelType === "timestamp" ? +p(s3) : t2.modelType === "format" && (typeof t2.format == "string" || !t2.format) ? D2(p(s3)) : D2(p(s3), t2.modelType, true) : p(s3) : "", Y2 = (s3, J = false) => {
    if (e2("update:model-value", s3), t2.emitTimezone && J) {
      const de = Array.isArray(s3) ? s3.map(($) => et(Ce($)), t2.emitTimezone) : et(Ce(s3), t2.emitTimezone);
      e2("update:model-timezone-value", de);
    }
  }, Z = (s3) => Array.isArray(a3.value) ? t2.multiDates ? a3.value.map((J) => s3(J)) : [
    s3(a3.value[0]),
    a3.value[1] ? s3(a3.value[1]) : Tt(t2.partialRange)
  ] : s3(Ce(a3.value)), y3 = (s3) => Y2(Ce(Z(s3)));
  return {
    inputValue: i2,
    internalModelValue: a3,
    checkBeforeEmit: () => a3.value ? t2.range ? t2.partialRange ? a3.value.length >= 1 : a3.value.length === 2 : !!a3.value : false,
    parseExternalModelValue: E2,
    formatInputValue: ne,
    emitModelValue: () => (ne(), t2.monthPicker ? y3(P) : t2.timePicker ? y3(R2) : t2.yearPicker ? y3(getYear) : t2.weekPicker ? Y2(
      a3.value.map((s3) => d3(s3)),
      true
    ) : Y2(V(), true))
  };
};
var vl = (e2, t2) => {
  const { defaultedFilters: r } = Pe(e2), { validateMonthYearInRange: a3 } = $t(e2), n = (T2, D2) => {
    let R2 = T2;
    return r.value.months.includes(getMonth(R2)) ? (R2 = D2 ? addMonths(T2, 1) : subMonths(T2, 1), n(R2, D2)) : R2;
  }, o = (T2, D2) => {
    let R2 = T2;
    return r.value.years.includes(getYear(R2)) ? (R2 = D2 ? addYears(T2, 1) : subYears(T2, 1), o(R2, D2)) : R2;
  }, i2 = (T2, D2 = false) => {
    const R2 = set(/* @__PURE__ */ new Date(), { month: e2.month, year: e2.year });
    let P = T2 ? addMonths(R2, 1) : subMonths(R2, 1);
    e2.disableYearSelect && (P = setYear(P, e2.year));
    let M3 = getMonth(P), C = getYear(P);
    r.value.months.includes(M3) && (P = n(P, T2), M3 = getMonth(P), C = getYear(P)), r.value.years.includes(C) && (P = o(P, T2), C = getYear(P)), a3(M3, C, T2, e2.preventMinMaxNavigation) && c2(M3, C, D2);
  }, c2 = (T2, D2, R2) => {
    t2("update-month-year", { month: T2, year: D2, fromNav: R2 });
  }, p = computed(() => (T2) => Ea(
    set(/* @__PURE__ */ new Date(), { month: e2.month, year: e2.year }),
    e2.maxDate,
    e2.minDate,
    e2.preventMinMaxNavigation,
    T2
  ));
  return { handleMonthYearChange: i2, isDisabled: p, updateMonthYear: c2 };
};
var At = ((e2) => (e2.center = "center", e2.left = "left", e2.right = "right", e2))(At || {});
var Qe = ((e2) => (e2.month = "month", e2.year = "year", e2))(Qe || {});
var pt = ((e2) => (e2.top = "top", e2.bottom = "bottom", e2))(pt || {});
var Dt = ((e2) => (e2.header = "header", e2.calendar = "calendar", e2.timePicker = "timePicker", e2))(Dt || {});
var at = ((e2) => (e2.month = "month", e2.year = "year", e2.calendar = "calendar", e2.time = "time", e2.minutes = "minutes", e2.hours = "hours", e2.seconds = "seconds", e2))(at || {});
var ml = ({
  menuRef: e2,
  menuRefInner: t2,
  inputRef: r,
  pickerWrapperRef: a3,
  inline: n,
  emit: o,
  props: i2,
  slots: c2
}) => {
  const p = ref({}), T2 = ref(false), D2 = ref({
    top: "0",
    left: "0"
  }), R2 = ref(false), P = toRef(i2, "teleportCenter");
  watch(P, () => {
    D2.value = JSON.parse(JSON.stringify({})), b2();
  });
  const M3 = (d3) => {
    if (i2.teleport) {
      const Y2 = d3.getBoundingClientRect();
      return {
        left: Y2.left + window.scrollX,
        top: Y2.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, C = (d3, Y2) => {
    D2.value.left = `${d3 + Y2 - p.value.width}px`;
  }, A = (d3) => {
    D2.value.left = `${d3}px`;
  }, q2 = (d3, Y2) => {
    i2.position === At.left && A(d3), i2.position === At.right && C(d3, Y2), i2.position === At.center && (D2.value.left = `${d3 + Y2 / 2 - p.value.width / 2}px`);
  }, g = (d3) => {
    const { width: Y2, height: Z } = d3.getBoundingClientRect(), { top: y3, left: l } = i2.altPosition ? i2.altPosition(d3) : M3(d3);
    return { top: +y3, left: +l, width: Y2, height: Z };
  }, S3 = () => {
    D2.value.left = "50%", D2.value.top = "50%", D2.value.transform = "translate(-50%, -50%)", D2.value.position = "fixed", delete D2.value.opacity;
  }, F = () => {
    const d3 = Re(r), { top: Y2, left: Z, transform: y3 } = i2.altPosition(d3);
    D2.value = { top: `${Y2}px`, left: `${Z}px`, transform: y3 ?? "" };
  }, b2 = (d3 = true) => {
    var Y2;
    if (!n.value.enabled) {
      if (P.value)
        return S3();
      if (i2.altPosition !== null)
        return F();
      if (d3) {
        const Z = i2.teleport ? (Y2 = t2.value) == null ? void 0 : Y2.$el : e2.value;
        Z && (p.value = Z.getBoundingClientRect()), o("recalculate-position");
      }
      return f();
    }
  }, _ = ({ inputEl: d3, left: Y2, width: Z }) => {
    window.screen.width > 768 && !T2.value && q2(Y2, Z), V(d3);
  }, X2 = (d3) => {
    const { top: Y2, left: Z, height: y3, width: l } = g(d3);
    D2.value.top = `${y3 + Y2 + +i2.offset}px`, R2.value = false, T2.value || (D2.value.left = `${Z + l / 2 - p.value.width / 2}px`), _({ inputEl: d3, left: Z, width: l });
  }, ae = (d3) => {
    const { top: Y2, left: Z, width: y3 } = g(d3);
    D2.value.top = `${Y2 - +i2.offset - p.value.height}px`, R2.value = true, _({ inputEl: d3, left: Z, width: y3 });
  }, V = (d3) => {
    if (i2.autoPosition) {
      const { left: Y2, width: Z } = g(d3), { left: y3, right: l } = p.value;
      if (!T2.value) {
        if (Math.abs(y3) !== Math.abs(l)) {
          if (y3 <= 0)
            return T2.value = true, A(Y2);
          if (l >= document.documentElement.clientWidth)
            return T2.value = true, C(Y2, Z);
        }
        return q2(Y2, Z);
      }
    }
  }, ie = () => {
    const d3 = Re(r);
    if (d3) {
      const { height: Y2 } = p.value, { top: Z, height: y3 } = d3.getBoundingClientRect(), h4 = window.innerHeight - Z - y3, s3 = Z;
      return Y2 <= h4 ? pt.bottom : Y2 > h4 && Y2 <= s3 ? pt.top : h4 >= s3 ? pt.bottom : pt.top;
    }
    return pt.bottom;
  }, E2 = (d3) => ie() === pt.bottom ? X2(d3) : ae(d3), f = () => {
    const d3 = Re(r);
    if (d3)
      return i2.autoPosition ? E2(d3) : X2(d3);
  }, w2 = function(d3) {
    if (d3) {
      const Y2 = d3.scrollHeight > d3.clientHeight, y3 = window.getComputedStyle(d3).overflowY.indexOf("hidden") !== -1;
      return Y2 && !y3;
    }
    return true;
  }, L2 = function(d3) {
    return !d3 || d3 === document.body || d3.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : w2(d3) ? d3 : L2(d3.parentNode);
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
    openOnTop: R2,
    menuStyle: D2,
    xCorrect: T2,
    setMenuPosition: b2,
    getScrollableParent: L2,
    shadowRender: (d3, Y2) => {
      var J, de, $;
      const Z = document.createElement("div"), y3 = (J = Re(r)) == null ? void 0 : J.getBoundingClientRect();
      Z.setAttribute("id", "dp--temp-container");
      const l = (de = a3.value) != null && de.clientWidth ? a3.value : document.body;
      l.append(Z);
      const h4 = ne(y3), s3 = h(
        d3,
        {
          ...Y2,
          shadow: true,
          style: { opacity: 0, position: "absolute", ...h4 }
        },
        Object.fromEntries(
          Object.keys(c2).filter((u2) => ["right-sidebar", "left-sidebar"].includes(u2)).map((u2) => [u2, c2[u2]])
        )
      );
      render(s3, Z), p.value = ($ = s3.el) == null ? void 0 : $.getBoundingClientRect(), render(null, Z), l.removeChild(Z);
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
var gl = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var yl = {
  all: () => ut,
  monthYear: () => ut.filter((e2) => e2.use.includes("month-year")),
  input: () => gl,
  timePicker: () => ut.filter((e2) => e2.use.includes("time")),
  action: () => ut.filter((e2) => e2.use.includes("action")),
  calendar: () => ut.filter((e2) => e2.use.includes("calendar")),
  menu: () => ut.filter((e2) => e2.use.includes("menu")),
  shared: () => ut.filter((e2) => e2.use.includes("shared")),
  yearMode: () => ut.filter((e2) => e2.use.includes("year-mode"))
};
var qe = (e2, t2, r) => {
  const a3 = [];
  return yl[t2]().forEach((n) => {
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
  const r = B2(et(/* @__PURE__ */ new Date(), e2.timezone)), a3 = ref([{ month: getMonth(r), year: getYear(r) }]), n = reactive({
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
var hl = (e2, t2) => {
  const { defaultedMultiCalendars: r, defaultedHighlight: a3 } = Pe(t2), { isDisabled: n, matchDate: o } = $t(t2), i2 = ref(null), c2 = ref(B2(et(/* @__PURE__ */ new Date(), t2.timezone))), p = (l) => {
    !l.current && t2.hideOffsetDates || (i2.value = l.value);
  }, T2 = () => {
    i2.value = null;
  }, D2 = (l) => Array.isArray(e2.value) && t2.range && e2.value[0] && i2.value ? l ? Ee(i2.value, e2.value[0]) : Ye(i2.value, e2.value[0]) : true, R2 = (l, h4) => {
    const s3 = () => e2.value ? h4 ? e2.value[0] || null : e2.value[1] : null, J = e2.value && Array.isArray(e2.value) ? s3() : null;
    return ke(B2(l.value), J);
  }, P = (l) => {
    const h4 = Array.isArray(e2.value) ? e2.value[0] : null;
    return l ? !Ye(i2.value ?? null, h4) : true;
  }, M3 = (l, h4 = true) => (t2.range || t2.weekPicker) && Array.isArray(e2.value) && e2.value.length === 2 ? t2.hideOffsetDates && !l.current ? false : ke(B2(l.value), e2.value[h4 ? 0 : 1]) : t2.range ? R2(l, h4) && P(h4) || ke(l.value, Array.isArray(e2.value) ? e2.value[0] : null) && D2(h4) : false, C = (l, h4, s3) => Array.isArray(e2.value) && e2.value[0] && e2.value.length === 1 ? l ? false : s3 ? Ee(e2.value[0], h4.value) : Ye(e2.value[0], h4.value) : false, A = (l) => !e2.value || t2.hideOffsetDates && !l.current ? false : t2.range ? t2.modelAuto && Array.isArray(e2.value) ? ke(l.value, e2.value[0] ? e2.value[0] : c2.value) : false : t2.multiDates && Array.isArray(e2.value) ? e2.value.some((h4) => ke(h4, l.value)) : ke(l.value, e2.value ? e2.value : c2.value), q2 = (l) => {
    if (t2.autoRange || t2.weekPicker) {
      if (i2.value) {
        if (t2.hideOffsetDates && !l.current)
          return false;
        const h4 = addDays(i2.value, +t2.autoRange), s3 = xt(B2(i2.value), t2.timezone, t2.weekStart);
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
        const s3 = xt(B2(i2.value), t2.timezone, t2.weekStart);
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
        const h4 = xt(B2(i2.value), t2.timezone, t2.weekStart);
        return t2.weekPicker ? ke(h4[0], l.value) : ke(i2.value, l.value);
      }
      return false;
    }
    return false;
  }, F = (l) => nn(e2.value, i2.value, l.value), b2 = () => t2.modelAuto && Array.isArray(t2.internalModelValue) ? !!t2.internalModelValue[0] : false, _ = () => t2.modelAuto ? Ra(t2.internalModelValue) : true, X2 = (l) => {
    if (Array.isArray(e2.value) && e2.value.length || t2.weekPicker)
      return false;
    const h4 = t2.range ? !M3(l) && !M3(l, false) : true;
    return !n(l.value) && !A(l) && !(!l.current && t2.hideOffsetDates) && h4;
  }, ae = (l) => t2.range ? t2.modelAuto ? b2() && A(l) : false : A(l), V = (l) => {
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
  }, f = (l) => (t2.range || t2.weekPicker) && (!(r.value.count > 0) || l.current) && _() && !(!l.current && t2.hideOffsetDates) && !A(l) ? F(l) : false, w2 = (l) => {
    const { isRangeStart: h4, isRangeEnd: s3 } = O2(l), J = t2.range ? h4 || s3 : false;
    return {
      dp__cell_offset: !l.current,
      dp__pointer: !t2.disabled && !(!l.current && t2.hideOffsetDates) && !n(l.value),
      dp__cell_disabled: n(l.value),
      dp__cell_highlight: !ie(l) && (V(l) || E2(l)) && !ae(l) && !J && !S3(l) && !(f(l) && t2.weekPicker) && !s3,
      dp__cell_highlight_active: !ie(l) && (V(l) || E2(l)) && ae(l),
      dp__today: !t2.noToday && ke(l.value, c2.value) && l.current
    };
  }, L2 = (l) => ({
    dp__active_date: ae(l),
    dp__date_hover: X2(l)
  }), ne = (l) => ({
    ...d3(l),
    ...Y2(l),
    dp__range_between_week: f(l) && t2.weekPicker
  }), O2 = (l) => {
    const h4 = r.value.count > 0 ? l.current && M3(l) && _() : M3(l) && _(), s3 = r.value.count > 0 ? l.current && M3(l, false) && _() : M3(l, false) && _();
    return { isRangeStart: h4, isRangeEnd: s3 };
  }, d3 = (l) => {
    const { isRangeStart: h4, isRangeEnd: s3 } = O2(l);
    return {
      dp__range_start: h4,
      dp__range_end: s3,
      dp__range_between: f(l) && !t2.weekPicker,
      dp__date_hover_start: C(X2(l), l, true),
      dp__date_hover_end: C(X2(l), l, false)
    };
  }, Y2 = (l) => ({
    ...d3(l),
    dp__cell_auto_range: g(l),
    dp__cell_auto_range_start: S3(l),
    dp__cell_auto_range_end: q2(l)
  }), Z = (l) => t2.range ? t2.autoRange ? Y2(l) : t2.modelAuto ? { ...L2(l), ...d3(l) } : d3(l) : t2.weekPicker ? ne(l) : L2(l);
  return {
    setHoverDate: p,
    clearHoverDate: T2,
    getDayClassData: (l) => t2.hideOffsetDates && !l.current ? {} : {
      ...w2(l),
      ...Z(l),
      [t2.dayClass ? t2.dayClass(l.value) : ""]: true,
      [t2.calendarCellClassName]: !!t2.calendarCellClassName
    }
  };
};
var $t = (e2) => {
  const { defaultedFilters: t2, defaultedHighlight: r } = Pe(e2), a3 = () => {
    if (e2.timezone)
      return e2.timezone;
    if (e2.utc)
      return "UTC";
  }, n = (f) => {
    const w2 = Fe(o(B2(f))).toISOString(), [L2] = w2.split("T");
    return L2;
  }, o = (f) => e2.utc === "preserve" ? Na(f, a3()) : et(f, a3()), i2 = (f) => {
    var h4;
    const w2 = e2.maxDate ? Ee(f, o(B2(e2.maxDate))) : false, L2 = e2.minDate ? Ye(f, o(B2(e2.minDate))) : false, ne = D2(
      o(f),
      (h4 = e2.arrMapValues) != null && h4.disabledDates ? e2.arrMapValues.disabledDates : e2.disabledDates
    ), d3 = t2.value.months.map((s3) => +s3).includes(getMonth(f)), Y2 = e2.disabledWeekDays.length ? e2.disabledWeekDays.some((s3) => +s3 === getDay(f)) : false, Z = P(f), y3 = getYear(f), l = y3 < +e2.yearRange[0] || y3 > +e2.yearRange[1];
    return !(w2 || L2 || ne || d3 || l || Y2 || Z);
  }, c2 = (f, w2) => Ye(...dt(e2.minDate, f, w2)) || ke(...dt(e2.minDate, f, w2)), p = (f, w2) => Ee(...dt(e2.maxDate, f, w2)) || ke(...dt(e2.maxDate, f, w2)), T2 = (f, w2, L2) => {
    let ne = false;
    return e2.maxDate && L2 && p(f, w2) && (ne = true), e2.minDate && !L2 && c2(f, w2) && (ne = true), ne;
  }, D2 = (f, w2) => f ? w2 instanceof Map ? !!w2.get(n(f)) : Array.isArray(w2) ? w2.some((L2) => ke(o(B2(L2)), f)) : w2 ? w2(B2(JSON.parse(JSON.stringify(f)))) : false : true, R2 = (f, w2, L2, ne) => {
    let O2 = false;
    return ne ? e2.minDate && e2.maxDate ? O2 = T2(f, w2, L2) : (e2.minDate && c2(f, w2) || e2.maxDate && p(f, w2)) && (O2 = true) : O2 = true, O2;
  }, P = (f) => {
    var w2, L2, ne, O2, d3;
    return Array.isArray(e2.allowedDates) && !((w2 = e2.allowedDates) != null && w2.length) ? true : (L2 = e2.arrMapValues) != null && L2.allowedDates ? !D2(f, (ne = e2.arrMapValues) == null ? void 0 : ne.allowedDates) : (O2 = e2.allowedDates) != null && O2.length ? !((d3 = e2.allowedDates) != null && d3.some(
      (Y2) => ke(Fe(Y2), o(Fe(f)))
    )) : false;
  }, M3 = (f) => !i2(f), C = (f) => e2.noDisabledRange ? !eachDayOfInterval({ start: f[0], end: f[1] }).some((L2) => M3(L2)) : true, A = (f, w2, L2 = 0) => {
    if (Array.isArray(w2) && w2[L2]) {
      const ne = differenceInCalendarDays(f, w2[L2]), O2 = Ia(w2[L2], f), d3 = O2.length === 1 ? 0 : O2.filter((Z) => M3(Z)).length, Y2 = Math.abs(ne) - d3;
      if (e2.minRange && e2.maxRange)
        return Y2 >= +e2.minRange && Y2 <= +e2.maxRange;
      if (e2.minRange)
        return Y2 >= +e2.minRange;
      if (e2.maxRange)
        return Y2 <= +e2.maxRange;
    }
    return true;
  }, q2 = (f) => new Map(f.map((w2) => [n(w2), true])), g = (f) => Array.isArray(f) && f.length > 0, S3 = () => {
    const f = {
      disabledDates: null,
      allowedDates: null,
      highlightedDates: null
    };
    return g(e2.allowedDates) && (f.allowedDates = q2(e2.allowedDates)), typeof r.value != "function" && g(r.value.dates) && (f.highlightedDates = q2(r.value.dates)), g(e2.disabledDates) && (f.disabledDates = q2(e2.disabledDates)), f;
  }, F = () => !e2.enableTimePicker || e2.monthPicker || e2.yearPicker || e2.ignoreTimeValidation, b2 = (f) => Array.isArray(f) ? [f[0] ? bn(f[0]) : null, f[1] ? bn(f[1]) : null] : bn(f), _ = (f, w2, L2) => f.find(
    (ne) => +ne.hours === getHours(w2) && ne.minutes === "*" ? true : +ne.minutes === getMinutes(w2) && +ne.hours === getHours(w2)
  ) && L2, X2 = (f, w2, L2) => {
    const [ne, O2] = f, [d3, Y2] = w2;
    return !_(ne, d3, L2) && !_(O2, Y2, L2) && L2;
  }, ae = (f, w2) => {
    const L2 = Array.isArray(w2) ? w2 : [w2];
    return Array.isArray(e2.disabledTimes) ? Array.isArray(e2.disabledTimes[0]) ? X2(e2.disabledTimes, L2, f) : !L2.some((ne) => _(e2.disabledTimes, ne, f)) : f;
  }, V = (f, w2) => {
    const L2 = Array.isArray(w2) ? [wt(w2[0]), w2[1] ? wt(w2[1]) : void 0] : wt(w2), ne = !e2.disabledTimes(L2);
    return f && ne;
  }, ie = (f, w2) => e2.disabledTimes ? Array.isArray(e2.disabledTimes) ? ae(w2, f) : V(w2, f) : w2;
  return {
    isDisabled: M3,
    validateDate: i2,
    validateMonthYearInRange: R2,
    isDateRangeAllowed: C,
    checkMinMaxRange: A,
    matchDate: D2,
    mapDatesArrToMap: S3,
    isValidTime: (f) => {
      let w2 = true;
      if (!f || F())
        return true;
      const L2 = !e2.minDate && !e2.maxDate ? b2(f) : f;
      return (e2.maxTime || e2.maxDate) && (w2 = ma(
        e2.maxTime,
        e2.maxDate,
        "max",
        Ce(L2),
        w2
      )), (e2.minTime || e2.minDate) && (w2 = ma(
        e2.minTime,
        e2.minDate,
        "min",
        Ce(L2),
        w2
      )), ie(f, w2);
    }
  };
};
var an = () => {
  const e2 = computed(() => (a3, n) => a3 == null ? void 0 : a3.includes(n)), t2 = computed(() => (a3, n) => a3.count ? a3.solo ? true : n === 0 : true), r = computed(() => (a3, n) => a3.count ? a3.solo ? true : n === a3.count - 1 : true);
  return { hideNavigationButtons: e2, showLeftIcon: t2, showRightIcon: r };
};
var pl = (e2, t2, r) => {
  const a3 = ref(0), n = reactive({
    [Dt.timePicker]: !e2.enableTimePicker || e2.timePicker || e2.monthPicker,
    [Dt.calendar]: false,
    [Dt.header]: false
  }), o = computed(() => e2.monthPicker), i2 = (R2) => {
    var P;
    if ((P = e2.flow) != null && P.length) {
      if (!R2 && o.value)
        return D2();
      n[R2] = true, Object.keys(n).filter((M3) => !n[M3]).length || D2();
    }
  }, c2 = () => {
    var R2;
    (R2 = e2.flow) != null && R2.length && a3.value !== -1 && (a3.value += 1, t2("flow-step", a3.value), D2());
  }, p = () => {
    a3.value = -1;
  }, T2 = (R2, P, ...M3) => {
    e2.flow[a3.value] === R2 && r.value && r.value[P](...M3);
  }, D2 = () => {
    T2(at.month, "toggleMonthPicker", true), T2(at.year, "toggleYearPicker", true), T2(at.calendar, "toggleTimePicker", false, true), T2(at.time, "toggleTimePicker", true, true);
    const R2 = e2.flow[a3.value];
    (R2 === at.hours || R2 === at.minutes || R2 === at.seconds) && T2(R2, "toggleTimePicker", true, true, R2);
  };
  return { childMount: i2, updateFlowStep: c2, resetFlow: p, flowStep: a3 };
};
var rn = {
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
var tt = {
  ...rn,
  shadow: { type: Boolean, default: false },
  flowStep: { type: Number, default: 0 },
  internalModelValue: { type: [Date, Array], default: null },
  arrMapValues: { type: Object, default: () => ({}) },
  noOverlayFocus: { type: Boolean, default: false }
};
var bl = {
  key: 1,
  class: "dp__input_wrap"
};
var kl = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-label", "aria-disabled", "aria-invalid"];
var wl = {
  key: 2,
  class: "dp__clear_icon"
};
var Dl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: false },
    inputValue: { type: String, default: "" },
    ...rn
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
      getDefaultPattern: T2,
      getDefaultStartTime: D2
    } = Pe(n), { checkMinMaxRange: R2 } = $t(n), P = ref(), M3 = ref(null), C = ref(false), A = ref(false), q2 = computed(
      () => ({
        dp__pointer: !n.disabled && !n.readonly && !o.value.enabled,
        dp__disabled: n.disabled,
        dp__input_readonly: !o.value.enabled,
        dp__input: true,
        dp__input_icon_pad: !n.hideInputIcon,
        dp__input_valid: !!n.state,
        dp__input_invalid: n.state === false,
        dp__input_focus: C.value || n.isMenuOpen,
        dp__input_reg: !o.value.enabled,
        [n.inputClassName]: !!n.inputClassName
      })
    ), g = () => {
      a3("set-input-date", null), n.autoApply && (a3("set-empty-date"), P.value = null);
    }, S3 = (d3) => {
      const Y2 = D2();
      return Gr(
        d3,
        o.value.format ?? T2(),
        Y2 ?? Ba({}, n.enableSeconds),
        n.inputValue,
        A.value
      );
    }, F = (d3) => {
      const { rangeSeparator: Y2 } = o.value, [Z, y3] = d3.split(`${Y2}`);
      if (Z) {
        const l = S3(Z.trim()), h4 = y3 ? S3(y3.trim()) : null, s3 = l && h4 ? [l, h4] : [l];
        R2(h4, s3, 0) && (P.value = l ? s3 : null);
      }
    }, b2 = () => {
      A.value = true;
    }, _ = (d3) => {
      if (n.range)
        F(d3);
      else if (n.multiDates) {
        const Y2 = d3.split(";");
        P.value = Y2.map((Z) => S3(Z.trim())).filter((Z) => Z);
      } else
        P.value = S3(d3);
    }, X2 = (d3) => {
      var Z;
      const Y2 = typeof d3 == "string" ? d3 : (Z = d3.target) == null ? void 0 : Z.value;
      Y2 !== "" ? (o.value.openMenu && !n.isMenuOpen && a3("open"), _(Y2), a3("set-input-date", P.value)) : g(), A.value = false, a3("update:input-value", Y2);
    }, ae = (d3) => {
      o.value.enabled ? (_(d3.target.value), o.value.enterSubmit && On(P.value) && n.inputValue !== "" ? (a3("set-input-date", P.value, true), P.value = null) : o.value.enterSubmit && n.inputValue === "" && (P.value = null, a3("clear"))) : E2(d3);
    }, V = (d3) => {
      o.value.enabled && o.value.tabSubmit && _(d3.target.value), o.value.tabSubmit && On(P.value) && n.inputValue !== "" ? (a3("set-input-date", P.value, true, true), P.value = null) : o.value.tabSubmit && n.inputValue === "" && (P.value = null, a3("clear", true));
    }, ie = () => {
      var d3;
      C.value = true, a3("focus"), o.value.enabled && o.value.selectOnFocus && ((d3 = M3.value) == null || d3.select());
    }, E2 = (d3) => {
      d3.preventDefault(), ft(d3, p.value, true), o.value.enabled && o.value.openMenu && !c2.value.input && !n.isMenuOpen ? a3("open") : o.value.enabled || a3("toggle");
    }, f = () => {
      a3("real-blur"), C.value = false, (!n.isMenuOpen || c2.value.enabled && c2.value.input) && a3("blur"), n.autoApply && o.value.enabled && P.value && !n.isMenuOpen && (a3("set-input-date", P.value), a3("select-date"), P.value = null);
    }, w2 = (d3) => {
      ft(d3, p.value, true), a3("clear");
    }, L2 = (d3) => {
      if (!o.value.enabled) {
        if (d3.code === "Tab")
          return;
        d3.preventDefault();
      }
    };
    return t2({
      focusInput: () => {
        var d3;
        (d3 = M3.value) == null || d3.focus({ preventScroll: true });
      },
      setParsedDate: (d3) => {
        P.value = d3;
      }
    }), (d3, Y2) => {
      var Z;
      return openBlock(), createElementBlock("div", { onClick: E2 }, [
        d3.$slots.trigger && !d3.$slots["dp-input"] && !unref(c2).enabled ? renderSlot(d3.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !d3.$slots.trigger && (!unref(c2).enabled || unref(c2).input) ? (openBlock(), createElementBlock("div", bl, [
          d3.$slots["dp-input"] && !d3.$slots.trigger && !unref(c2).enabled ? renderSlot(d3.$slots, "dp-input", {
            key: 0,
            value: e2.inputValue,
            isMenuOpen: e2.isMenuOpen,
            onInput: X2,
            onEnter: ae,
            onTab: V,
            onClear: w2,
            onBlur: f,
            onKeypress: L2,
            onPaste: b2,
            openMenu: () => d3.$emit("open"),
            closeMenu: () => d3.$emit("close"),
            toggleMenu: () => d3.$emit("toggle")
          }) : createCommentVNode("", true),
          d3.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            id: d3.uid ? `dp-input-${d3.uid}` : void 0,
            ref_key: "inputRef",
            ref: M3,
            name: d3.name,
            class: normalizeClass(q2.value),
            inputmode: unref(o).enabled ? "text" : "none",
            placeholder: d3.placeholder,
            disabled: d3.disabled,
            readonly: d3.readonly,
            required: d3.required,
            value: e2.inputValue,
            autocomplete: d3.autocomplete,
            "aria-label": (Z = unref(i2)) == null ? void 0 : Z.input,
            "aria-disabled": d3.disabled || void 0,
            "aria-invalid": d3.state === false ? true : void 0,
            onInput: X2,
            onKeydown: [
              withKeys(ae, ["enter"]),
              withKeys(V, ["tab"]),
              L2
            ],
            onBlur: f,
            onFocus: ie,
            onKeypress: L2,
            onPaste: b2
          }, null, 42, kl)),
          createBaseVNode("div", {
            onClick: Y2[2] || (Y2[2] = (y3) => a3("toggle"))
          }, [
            d3.$slots["input-icon"] && !d3.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: Y2[0] || (Y2[0] = (y3) => a3("toggle"))
            }, [
              renderSlot(d3.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !d3.$slots["input-icon"] && !d3.hideInputIcon && !d3.$slots["dp-input"] ? (openBlock(), createBlock(unref(Ot), {
              key: 1,
              class: "dp__input_icon dp__input_icons",
              onClick: Y2[1] || (Y2[1] = (y3) => a3("toggle"))
            })) : createCommentVNode("", true)
          ]),
          d3.$slots["clear-icon"] && e2.inputValue && d3.clearable && !d3.disabled && !d3.readonly ? (openBlock(), createElementBlock("span", wl, [
            renderSlot(d3.$slots, "clear-icon", { clear: w2 })
          ])) : createCommentVNode("", true),
          d3.clearable && !d3.$slots["clear-icon"] && e2.inputValue && !d3.disabled && !d3.readonly ? (openBlock(), createBlock(unref(Aa), {
            key: 3,
            class: "dp__clear_icon dp__input_icons",
            onClick: Y2[3] || (Y2[3] = withModifiers((y3) => w2(y3), ["prevent"]))
          })) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var Ml = ["title"];
var $l = { class: "dp__action_buttons" };
var Tl = ["disabled"];
var Al = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ActionRow",
  props: {
    menuMount: { type: Boolean, default: false },
    calendarWidth: { type: Number, default: 0 },
    ...tt
  },
  emits: ["close-picker", "select-date", "select-now", "invalid-select"],
  setup(e2, { emit: t2 }) {
    const r = t2, a3 = e2, {
      defaultedActionRow: n,
      defaultedPreviewFormat: o,
      defaultedMultiCalendars: i2,
      defaultedTextInput: c2,
      defaultedInline: p,
      getDefaultPattern: T2
    } = Pe(a3), { isValidTime: D2 } = $t(a3), { buildMatrix: R2 } = yt(), P = ref(null), M3 = ref(null);
    onMounted(() => {
      a3.arrowNavigation && R2([Re(P), Re(M3)], "actionRow");
    });
    const C = computed(() => a3.range && !a3.partialRange && a3.internalModelValue ? a3.internalModelValue.length === 2 : true), A = computed(() => !q2.value || !g.value || !C.value), q2 = computed(() => !a3.enableTimePicker || a3.ignoreTimeValidation ? true : D2(a3.internalModelValue)), g = computed(() => a3.monthPicker ? a3.range && Array.isArray(a3.internalModelValue) ? !a3.internalModelValue.filter((f) => !V(f)).length : V(a3.internalModelValue) : true), S3 = () => {
      const E2 = o.value;
      return a3.timePicker || a3.monthPicker, E2(Ce(a3.internalModelValue));
    }, F = () => {
      const E2 = a3.internalModelValue;
      return i2.value.count > 0 ? `${b2(E2[0])} - ${b2(E2[1])}` : [b2(E2[0]), b2(E2[1])];
    }, b2 = (E2) => Fa(
      E2,
      o.value,
      a3.formatLocale,
      c2.value.rangeSeparator,
      a3.modelAuto,
      T2()
    ), _ = computed(() => !a3.internalModelValue || !a3.menuMount ? "" : typeof o.value == "string" ? Array.isArray(a3.internalModelValue) ? a3.internalModelValue.length === 2 && a3.internalModelValue[1] ? F() : a3.multiDates ? a3.internalModelValue.map((E2) => `${b2(E2)}`) : a3.modelAuto ? `${b2(a3.internalModelValue[0])}` : `${b2(a3.internalModelValue[0])} -` : b2(a3.internalModelValue) : S3()), X2 = () => a3.multiDates ? "; " : " - ", ae = computed(
      () => Array.isArray(_.value) ? _.value.join(X2()) : _.value
    ), V = (E2) => {
      if (!a3.monthPicker)
        return true;
      let f = true;
      const w2 = B2(Xe(E2));
      if (a3.minDate && a3.maxDate) {
        const L2 = B2(Xe(a3.minDate)), ne = B2(Xe(a3.maxDate));
        return Ee(w2, L2) && Ye(w2, ne) || ke(w2, L2) || ke(w2, ne);
      }
      if (a3.minDate) {
        const L2 = B2(Xe(a3.minDate));
        f = Ee(w2, L2) || ke(w2, L2);
      }
      if (a3.maxDate) {
        const L2 = B2(Xe(a3.maxDate));
        f = Ye(w2, L2) || ke(w2, L2);
      }
      return f;
    }, ie = () => {
      q2.value && g.value && C.value ? r("select-date") : r("invalid-select");
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
        ], 8, Ml)) : createCommentVNode("", true),
        createBaseVNode("div", $l, [
          E2.$slots["action-buttons"] ? renderSlot(E2.$slots, "action-buttons", {
            key: 0,
            value: E2.internalModelValue
          }) : createCommentVNode("", true),
          E2.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(p).enabled && unref(n).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              ref_key: "cancelButtonRef",
              ref: P,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: f[0] || (f[0] = (w2) => E2.$emit("close-picker")),
              onKeydown: [
                f[1] || (f[1] = withKeys((w2) => E2.$emit("close-picker"), ["enter"])),
                f[2] || (f[2] = withKeys((w2) => E2.$emit("close-picker"), ["space"]))
              ]
            }, toDisplayString(E2.cancelText), 545)) : createCommentVNode("", true),
            unref(n).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              ref_key: "cancelButtonRef",
              ref: P,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: f[3] || (f[3] = (w2) => E2.$emit("select-now")),
              onKeydown: [
                f[4] || (f[4] = withKeys((w2) => E2.$emit("select-now"), ["enter"])),
                f[5] || (f[5] = withKeys((w2) => E2.$emit("select-now"), ["space"]))
              ]
            }, toDisplayString(E2.nowButtonLabel), 545)) : createCommentVNode("", true),
            unref(n).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              ref_key: "selectButtonRef",
              ref: M3,
              type: "button",
              class: "dp__action_button dp__action_select",
              disabled: A.value,
              onKeydown: [
                withKeys(ie, ["enter"]),
                withKeys(ie, ["space"])
              ],
              onClick: ie
            }, toDisplayString(E2.selectText), 41, Tl)) : createCommentVNode("", true)
          ], 64))
        ])
      ], 64))
    ], 4));
  }
});
var Sl = ["onKeydown"];
var Pl = { class: "dp__selection_grid_header" };
var Cl = ["aria-selected", "aria-disabled", "onClick", "onKeydown", "onMouseover"];
var _l = ["aria-label"];
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
    const { setSelectionGrid: a3, buildMultiLevelMatrix: n, setMonthPicker: o } = yt(), i2 = r, c2 = e2, { defaultedAriaLabels: p, defaultedTextInput: T2, defaultedConfig: D2 } = Pe(
      c2
    ), { hideNavigationButtons: R2 } = an(), P = ref(false), M3 = ref(null), C = ref(null), A = ref([]), q2 = ref(), g = ref(null), S3 = ref(0), F = ref(null);
    onBeforeUpdate(() => {
      M3.value = null;
    }), onMounted(() => {
      nextTick().then(() => f()), c2.noOverlayFocus || _(), b2(true);
    }), onUnmounted(() => b2(false));
    const b2 = (y3) => {
      var l;
      c2.arrowNavigation && ((l = c2.headerRefs) != null && l.length ? o(y3) : a3(y3));
    }, _ = () => {
      var l;
      const y3 = Re(C);
      y3 && (T2.value.enabled || (M3.value ? (l = M3.value) == null || l.focus({ preventScroll: true }) : y3.focus({ preventScroll: true })), P.value = y3.clientHeight < y3.scrollHeight);
    }, X2 = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !c2.useRelative,
        "dp--overlay-relative": c2.useRelative
      })
    ), ae = computed(
      () => c2.useRelative ? { height: `${c2.height}px`, width: "260px" } : void 0
    ), V = computed(() => ({
      dp__overlay_col: true
    })), ie = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: P.value,
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
        const y3 = Re(M3), l = Re(C), h4 = Re(g), s3 = Re(F), J = h4 ? h4.getBoundingClientRect().height : 0;
        l && (l.getBoundingClientRect().height ? S3.value = l.getBoundingClientRect().height - J : S3.value = D2.value.modeHeight - J), y3 && s3 && (s3.scrollTop = y3.offsetTop - s3.offsetTop - (S3.value / 2 - y3.getBoundingClientRect().height) - J);
      });
    }, w2 = (y3) => {
      y3.disabled || i2("selected", y3.value);
    }, L2 = () => {
      i2("toggle"), i2("reset-flow");
    }, ne = () => {
      c2.escClose && L2();
    }, O2 = (y3, l, h4, s3) => {
      y3 && ((l.active || l.value === c2.focusValue) && (M3.value = y3), c2.arrowNavigation && (Array.isArray(A.value[h4]) ? A.value[h4][s3] = y3 : A.value[h4] = [y3], d3()));
    }, d3 = () => {
      var l, h4;
      const y3 = (l = c2.headerRefs) != null && l.length ? [c2.headerRefs].concat(A.value) : A.value.concat([c2.skipButtonRef ? [] : [g.value]]);
      n(Ce(y3), (h4 = c2.headerRefs) != null && h4.length ? "monthPicker" : "selectionGrid");
    }, Y2 = (y3) => {
      c2.arrowNavigation || ft(y3, D2.value, true);
    }, Z = (y3) => {
      q2.value = y3, i2("hover-value", y3);
    };
    return t2({ focusGrid: _ }), (y3, l) => {
      var h4;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: C,
        class: normalizeClass(X2.value),
        style: normalizeStyle(ae.value),
        role: "dialog",
        tabindex: "0",
        onKeydown: [
          withKeys(withModifiers(ne, ["prevent"]), ["esc"]),
          l[0] || (l[0] = withKeys(withModifiers((s3) => Y2(s3), ["prevent"]), ["left"])),
          l[1] || (l[1] = withKeys(withModifiers((s3) => Y2(s3), ["prevent"]), ["up"])),
          l[2] || (l[2] = withKeys(withModifiers((s3) => Y2(s3), ["prevent"]), ["down"])),
          l[3] || (l[3] = withKeys(withModifiers((s3) => Y2(s3), ["prevent"]), ["right"]))
        ]
      }, [
        createBaseVNode("div", {
          ref_key: "containerRef",
          ref: F,
          class: normalizeClass(E2.value),
          role: "grid",
          style: normalizeStyle({ height: `${S3.value}px` })
        }, [
          createBaseVNode("div", Pl, [
            renderSlot(y3.$slots, "header")
          ]),
          y3.$slots.overlay ? renderSlot(y3.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(y3.items, (s3, J) => (openBlock(), createElementBlock("div", {
            key: J,
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: y3.items.length >= 3 }]),
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(s3, (de, $) => (openBlock(), createElementBlock("div", {
              key: de.value,
              ref_for: true,
              ref: (u2) => O2(u2, de, J, $),
              role: "gridcell",
              class: normalizeClass(V.value),
              "aria-selected": de.active,
              "aria-disabled": de.disabled || void 0,
              tabindex: "0",
              onClick: (u2) => w2(de),
              onKeydown: [
                withKeys(withModifiers((u2) => w2(de), ["prevent"]), ["enter"]),
                withKeys(withModifiers((u2) => w2(de), ["prevent"]), ["space"])
              ],
              onMouseover: (u2) => Z(de.value)
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
            ], 42, Cl))), 128))
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
          onClick: L2,
          onKeydown: [
            withKeys(L2, ["enter"]),
            withKeys(L2, ["tab"])
          ]
        }, [
          renderSlot(y3.$slots, "button-icon")
        ], 42, _l)), [
          [vShow, !unref(R2)(y3.hideNavigation, y3.type)]
        ]) : createCommentVNode("", true)
      ], 46, Sl);
    };
  }
});
var ln = defineComponent({
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
var Rl = ["aria-label", "aria-disabled"];
var It = defineComponent({
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
    ], 40, Rl));
  }
});
var Ol = { class: "dp--year-mode-picker" };
var Yl = ["aria-label"];
var La = defineComponent({
  __name: "YearModePicker",
  props: {
    ...tt,
    showYearPicker: { type: Boolean, default: false },
    items: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    isDisabled: { type: Function, default: () => false }
  },
  emits: ["toggle-year-picker", "year-select", "handle-year"],
  setup(e2, { emit: t2 }) {
    const r = t2, a3 = e2, { showRightIcon: n, showLeftIcon: o } = an(), { defaultedConfig: i2, defaultedMultiCalendars: c2, defaultedAriaLabels: p, defaultedTransitions: T2 } = Pe(a3), { showTransition: D2, transitionName: R2 } = Lt(T2), P = (A = false, q2) => {
      r("toggle-year-picker", { flow: A, show: q2 });
    }, M3 = (A) => {
      r("year-select", A);
    }, C = (A = false) => {
      r("handle-year", A);
    };
    return (A, q2) => {
      var g, S3, F;
      return openBlock(), createElementBlock("div", Ol, [
        unref(o)(unref(c2), e2.instance) ? (openBlock(), createBlock(It, {
          key: 0,
          ref: "mpPrevIconRef",
          "aria-label": (g = unref(p)) == null ? void 0 : g.prevYear,
          disabled: e2.isDisabled(false),
          onActivate: q2[0] || (q2[0] = (b2) => C(false))
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
          onClick: q2[1] || (q2[1] = () => P(false)),
          onKeydown: q2[2] || (q2[2] = withKeys(() => P(false), ["enter"]))
        }, [
          A.$slots.year ? renderSlot(A.$slots, "year", {
            key: 0,
            year: e2.year
          }) : createCommentVNode("", true),
          A.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(e2.year), 1)
          ], 64))
        ], 40, Yl),
        unref(n)(unref(c2), e2.instance) ? (openBlock(), createBlock(It, {
          key: 1,
          ref: "mpNextIconRef",
          "aria-label": (F = unref(p)) == null ? void 0 : F.nextYear,
          disabled: e2.isDisabled(true),
          onActivate: q2[3] || (q2[3] = (b2) => C(true))
        }, {
          default: withCtx(() => [
            A.$slots["arrow-right"] ? renderSlot(A.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
            A.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Fn), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(R2)(e2.showYearPicker),
          css: unref(D2)
        }, {
          default: withCtx(() => [
            e2.showYearPicker ? (openBlock(), createBlock(zt, {
              key: 0,
              items: e2.items,
              "text-input": A.textInput,
              "esc-close": A.escClose,
              config: A.config,
              "is-last": A.autoApply && !unref(i2).keepActionRow,
              "hide-navigation": A.hideNavigation,
              type: "year",
              onToggle: P,
              onSelected: q2[4] || (q2[4] = (b2) => M3(b2))
            }, createSlots({
              "button-icon": withCtx(() => [
                A.$slots["calendar-icon"] ? renderSlot(A.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                A.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ot), { key: 1 }))
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
            ]), 1032, ["items", "text-input", "esc-close", "config", "is-last", "hide-navigation"])) : createCommentVNode("", true)
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
var on = (e2, t2, r, a3) => {
  e2[0] && e2[1] && r && t2("auto-apply"), e2[0] && !e2[1] && a3 && r && t2("auto-apply");
};
var Ua = (e2) => {
  Array.isArray(e2.value) && e2.value.length <= 2 && e2.range ? e2.modelValue.value = e2.value.map((t2) => et(B2(t2), e2.timezone)) : Array.isArray(e2.value) || (e2.modelValue.value = et(B2(e2.value), e2.timezone));
};
var za = ({
  multiCalendars: e2,
  highlight: t2,
  calendars: r,
  modelValue: a3,
  props: n,
  year: o,
  month: i2,
  emit: c2
}) => {
  const p = computed(() => jn(n.yearRange, n.reverseYears)), T2 = ref([false]), D2 = computed(() => (b2, _) => {
    const X2 = set(Xe(/* @__PURE__ */ new Date()), {
      month: i2.value(b2),
      year: o.value(b2)
    });
    return Ea(X2, n.maxDate, n.minDate, n.preventMinMaxNavigation, _);
  }), R2 = () => {
    for (let b2 = 0; b2 < e2.value.count; b2++)
      if (b2 === 0)
        r.value[b2] = r.value[0];
      else {
        const _ = set(B2(), r.value[b2 - 1]);
        r.value[b2] = { month: getMonth(_), year: getYear(addYears(_, 1)) };
      }
  }, P = (b2) => {
    if (!b2)
      return R2();
    const _ = set(B2(), r.value[b2]);
    return r.value[0].year = getYear(subYears(_, e2.value.count - 1)), R2();
  }, M3 = (b2) => n.focusStartDate ? b2[0] : b2[1] ? b2[1] : b2[0], C = () => {
    if (a3.value) {
      const b2 = Array.isArray(a3.value) ? M3(a3.value) : a3.value;
      r.value[0] = { month: getMonth(b2), year: getYear(b2) };
    }
  };
  onMounted(() => {
    C(), e2.value.count && R2();
  });
  const A = (b2, _) => {
    r.value[_].year = b2, e2.value.count && !e2.value.solo && P(_);
  }, q2 = computed(() => (b2) => Ct(p.value, (_) => {
    const X2 = o.value(b2) === _.value, ae = Ht(_.value, _t(n.minDate), _t(n.maxDate)), V = Kn(t2.value, _.value);
    return { active: X2, disabled: ae, highlighted: V };
  })), g = (b2, _) => {
    A(b2, _), F(_);
  }, S3 = (b2, _ = false) => {
    if (!D2.value(b2, _)) {
      const X2 = _ ? o.value(b2) + 1 : o.value(b2) - 1;
      A(X2, b2);
    }
  }, F = (b2, _ = false, X2) => {
    _ || c2("reset-flow"), X2 !== void 0 ? T2.value[b2] = X2 : T2.value[b2] = !T2.value[b2], T2.value || c2("overlay-closed");
  };
  return {
    isDisabled: D2,
    groupedYears: q2,
    showYearPicker: T2,
    selectYear: A,
    toggleYearPicker: F,
    handleYearSelect: g,
    handleYear: S3
  };
};
var Nl = (e2, t2) => {
  const { defaultedMultiCalendars: r, defaultedAriaLabels: a3, defaultedTransitions: n, defaultedConfig: o, defaultedHighlight: i2 } = Pe(e2), { modelValue: c2, year: p, month: T2, calendars: D2 } = Ut(e2, t2), R2 = computed(() => _a(e2.formatLocale, e2.locale, e2.monthNameFormat)), P = ref(null), {
    selectYear: M3,
    groupedYears: C,
    showYearPicker: A,
    toggleYearPicker: q2,
    handleYearSelect: g,
    handleYear: S3,
    isDisabled: F
  } = za({
    modelValue: c2,
    multiCalendars: r,
    highlight: i2,
    calendars: D2,
    year: p,
    month: T2,
    props: e2,
    emit: t2
  });
  onMounted(() => {
    e2.startDate && (c2.value && e2.focusStartDate || !c2.value) && M3(getYear(B2(e2.startDate)), 0);
  });
  const b2 = (y3) => y3 ? { month: getMonth(y3), year: getYear(y3) } : { month: null, year: null }, _ = () => c2.value ? Array.isArray(c2.value) ? c2.value.map((y3) => b2(y3)) : b2(c2.value) : b2(), X2 = (y3, l) => {
    const h4 = D2.value[y3], s3 = _();
    return Array.isArray(s3) ? s3.some((J) => J.year === (h4 == null ? void 0 : h4.year) && J.month === l) : (h4 == null ? void 0 : h4.year) === s3.year && l === s3.month;
  }, ae = (y3, l, h4) => {
    var J, de;
    const s3 = _();
    return Array.isArray(s3) ? p.value(l) === ((J = s3[h4]) == null ? void 0 : J.year) && y3 === ((de = s3[h4]) == null ? void 0 : de.month) : false;
  }, V = (y3, l) => {
    if (e2.range) {
      const h4 = _();
      if (Array.isArray(c2.value) && Array.isArray(h4)) {
        const s3 = ae(y3, l, 0) || ae(y3, l, 1), J = ot(Xe(B2()), y3, p.value(l));
        return nn(c2.value, P.value, J) && !s3;
      }
      return false;
    }
    return false;
  }, ie = computed(() => (y3) => Ct(R2.value, (l) => {
    const h4 = X2(y3, l.value), s3 = Ht(
      l.value,
      Oa(p.value(y3), e2.minDate),
      Ya(p.value(y3), e2.maxDate)
    ) || el(e2.disabledDates, p.value(y3)).includes(l.value), J = V(l.value, y3), de = Ha(i2.value, l.value, p.value(y3));
    return { active: h4, disabled: s3, isBetween: J, highlighted: de };
  })), E2 = (y3, l) => ot(Xe(B2()), y3, p.value(l)), f = (y3, l) => {
    const h4 = c2.value ? c2.value : Xe(/* @__PURE__ */ new Date());
    c2.value = ot(h4, y3, p.value(l)), t2("auto-apply");
  }, w2 = (y3, l) => {
    const h4 = qn(c2, E2(y3, l), t2);
    on(h4, t2, e2.autoApply, e2.modelAuto);
  }, L2 = (y3, l) => {
    Gn(E2(y3, l), c2, e2.multiDatesLimit), t2("auto-apply", true);
  }, ne = (y3, l) => (D2.value[l].month = y3, d3(l, D2.value[l].year, y3), e2.multiDates ? L2(y3, l) : e2.range ? w2(y3, l) : f(y3, l)), O2 = (y3, l) => {
    M3(y3, l), d3(l, y3, null);
  }, d3 = (y3, l, h4) => {
    let s3 = h4;
    if (!s3 && s3 !== 0) {
      const J = _();
      s3 = Array.isArray(J) ? J[y3].month : J.month;
    }
    t2("update-month-year", { instance: y3, year: l, month: s3 });
  };
  return {
    groupedMonths: ie,
    groupedYears: C,
    year: p,
    isDisabled: F,
    defaultedMultiCalendars: r,
    defaultedAriaLabels: a3,
    defaultedTransitions: n,
    defaultedConfig: o,
    showYearPicker: A,
    modelValue: c2,
    presetDate: (y3, l) => {
      Ua({ value: y3, modelValue: c2, range: e2.range, timezone: l ? void 0 : e2.timezone }), t2("auto-apply");
    },
    setHoverDate: (y3, l) => {
      P.value = E2(y3, l);
    },
    selectMonth: ne,
    selectYear: O2,
    toggleYearPicker: q2,
    handleYearSelect: g,
    handleYear: S3,
    getModelMonthYear: _
  };
};
var Il = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "MonthPicker",
  props: {
    ...tt
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
    const a3 = r, n = useSlots(), o = qe(n, "yearMode"), i2 = e2;
    onMounted(() => {
      i2.shadow || a3("mount", null);
    });
    const {
      groupedMonths: c2,
      groupedYears: p,
      year: T2,
      isDisabled: D2,
      defaultedMultiCalendars: R2,
      defaultedConfig: P,
      showYearPicker: M3,
      modelValue: C,
      presetDate: A,
      setHoverDate: q2,
      selectMonth: g,
      selectYear: S3,
      toggleYearPicker: F,
      handleYearSelect: b2,
      handleYear: _,
      getModelMonthYear: X2
    } = Nl(i2, a3);
    return t2({ getSidebarProps: () => ({
      modelValue: C,
      year: T2,
      getModelMonthYear: X2,
      selectMonth: g,
      selectYear: S3,
      handleYear: _
    }), presetDate: A, toggleYearPicker: (V) => F(0, V) }), (V, ie) => (openBlock(), createBlock(ln, {
      "multi-calendars": unref(R2).count,
      stretch: ""
    }, {
      default: withCtx(({ instance: E2 }) => [
        V.$slots["month-year"] ? renderSlot(V.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, {
          year: unref(T2),
          months: unref(c2)(E2),
          years: unref(p)(E2),
          selectMonth: unref(g),
          selectYear: unref(S3),
          instance: E2
        }))) : (openBlock(), createBlock(zt, {
          key: 1,
          items: unref(c2)(E2),
          "arrow-navigation": V.arrowNavigation,
          "is-last": V.autoApply && !unref(P).keepActionRow,
          "esc-close": V.escClose,
          height: unref(P).modeHeight,
          config: V.config,
          "no-overlay-focus": !!(V.noOverlayFocus || V.textInput),
          "use-relative": "",
          type: "month",
          onSelected: (f) => unref(g)(f, E2),
          onHoverValue: (f) => unref(q2)(f, E2)
        }, {
          header: withCtx(() => [
            createVNode(La, mergeProps(V.$props, {
              items: unref(p)(E2),
              instance: E2,
              "show-year-picker": unref(M3)[E2],
              year: unref(T2)(E2),
              "is-disabled": (f) => unref(D2)(E2, f),
              onHandleYear: (f) => unref(_)(E2, f),
              onYearSelect: (f) => unref(b2)(f, E2),
              onToggleYearPicker: (f) => unref(F)(E2, f == null ? void 0 : f.flow, f == null ? void 0 : f.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(o), (f, w2) => ({
                name: f,
                fn: withCtx((L2) => [
                  renderSlot(V.$slots, f, normalizeProps(guardReactiveProps(L2)))
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
var Bl = (e2, t2) => {
  const { modelValue: r } = Ut(e2, t2), a3 = ref(null), { defaultedHighlight: n, defaultedFilters: o } = Pe(e2), i2 = ref();
  onMounted(() => {
    e2.startDate && (r.value && e2.focusStartDate || !r.value) && (i2.value = getYear(B2(e2.startDate)));
  });
  const c2 = (M3) => Array.isArray(r.value) ? r.value.some((C) => getYear(C) === M3) : r.value ? getYear(r.value) === M3 : false, p = (M3) => e2.range && Array.isArray(r.value) ? nn(r.value, a3.value, D2(M3)) : false, T2 = computed(() => Ct(jn(e2.yearRange, e2.reverseYears), (M3) => {
    const C = c2(M3.value), A = Ht(M3.value, _t(e2.minDate), _t(e2.maxDate)) || o.value.years.includes(M3.value), q2 = p(M3.value) && !C, g = Kn(n.value, M3.value);
    return { active: C, disabled: A, isBetween: q2, highlighted: g };
  })), D2 = (M3) => setYear(Xe(/* @__PURE__ */ new Date()), M3);
  return {
    groupedYears: T2,
    modelValue: r,
    focusYear: i2,
    setHoverValue: (M3) => {
      a3.value = setYear(Xe(/* @__PURE__ */ new Date()), M3);
    },
    selectYear: (M3) => {
      var C;
      if (e2.multiDates)
        return r.value ? Array.isArray(r.value) && (((C = r.value) == null ? void 0 : C.map((q2) => getYear(q2))).includes(M3) ? r.value = r.value.filter((q2) => getYear(q2) !== M3) : r.value.push(setYear(Fe(B2()), M3))) : r.value = [setYear(Fe(B2()), M3)], t2("auto-apply", true);
      if (e2.range) {
        const A = qn(r, D2(M3), t2);
        return on(A, t2, e2.autoApply, e2.modelAuto);
      }
      r.value = D2(M3), t2("auto-apply");
    }
  };
};
var El = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "YearPicker",
  props: {
    ...tt
  },
  emits: ["update:internal-model-value", "reset-flow", "range-start", "range-end", "auto-apply"],
  setup(e2, { expose: t2, emit: r }) {
    const a3 = r, n = e2, { groupedYears: o, modelValue: i2, focusYear: c2, selectYear: p, setHoverValue: T2 } = Bl(n, a3), { defaultedConfig: D2 } = Pe(n);
    return t2({ getSidebarProps: () => ({
      modelValue: i2,
      selectYear: p
    }) }), (P, M3) => (openBlock(), createElementBlock("div", null, [
      P.$slots["month-year"] ? renderSlot(P.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, {
        years: unref(o),
        selectYear: unref(p)
      }))) : (openBlock(), createBlock(zt, {
        key: 1,
        items: unref(o),
        "is-last": P.autoApply && !unref(D2).keepActionRow,
        height: unref(D2).modeHeight,
        config: P.config,
        "no-overlay-focus": !!(P.noOverlayFocus || P.textInput),
        "focus-value": unref(c2),
        type: "year",
        "use-relative": "",
        onSelected: unref(p),
        onHoverValue: unref(T2)
      }, createSlots({ _: 2 }, [
        P.$slots["year-overlay-value"] ? {
          name: "item",
          fn: withCtx(({ item: C }) => [
            renderSlot(P.$slots, "year-overlay-value", {
              text: C.text,
              value: C.value
            })
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["items", "is-last", "height", "config", "no-overlay-focus", "focus-value", "onSelected", "onHoverValue"]))
    ]));
  }
});
var Fl = {
  key: 0,
  class: "dp__time_input"
};
var Hl = ["aria-label", "onKeydown", "onClick"];
var Vl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var Ll = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var Ul = ["aria-label", "disabled", "onKeydown", "onClick"];
var zl = ["aria-label", "onKeydown", "onClick"];
var Wl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var jl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var Kl = { key: 0 };
var Gl = ["aria-label", "onKeydown"];
var ql = defineComponent({
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
    ...tt
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
    const a3 = r, n = e2, { setTimePickerElements: o, setTimePickerBackRef: i2 } = yt(), { defaultedAriaLabels: c2, defaultedTransitions: p, defaultedFilters: T2, defaultedConfig: D2 } = Pe(n), { transitionName: R2, showTransition: P } = Lt(p), M3 = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), C = ref("AM"), A = ref(null), q2 = ref([]);
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
    ), F = computed(() => ({ hours: n.hours, minutes: n.minutes, seconds: n.seconds })), b2 = (u2, I2) => n.range && !n.disableTimeRangeValidation ? !n.validateTime(u2, I2) : false, _ = (u2, I2) => {
      if (n.range && !n.disableTimeRangeValidation) {
        const Q2 = I2 ? +n[`${u2}Increment`] : -+n[`${u2}Increment`], K2 = n[u2] + Q2;
        return !n.validateTime(u2, K2);
      }
      return false;
    }, X2 = computed(() => (u2) => !d3(+n[u2] + +n[`${u2}Increment`], u2) || _(u2, true)), ae = computed(() => (u2) => !d3(+n[u2] - +n[`${u2}Increment`], u2) || _(u2, false)), V = (u2, I2) => add(set(B2(), u2), I2), ie = (u2, I2) => sub(set(B2(), u2), I2), E2 = computed(
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
    }), w2 = computed(() => f.value.filter((u2) => !u2.separator)), L2 = computed(() => (u2) => {
      if (u2 === "hours") {
        const I2 = h4(+n.hours);
        return { text: I2 < 10 ? `0${I2}` : `${I2}`, value: I2 };
      }
      return { text: n[u2] < 10 ? `0${n[u2]}` : `${n[u2]}`, value: n[u2] };
    }), ne = (u2, I2) => {
      var K2;
      if (!n.disabledTimesConfig)
        return false;
      const Q2 = n.disabledTimesConfig(n.order, u2 === "hours" ? I2 : void 0);
      return Q2[u2] ? !!((K2 = Q2[u2]) != null && K2.includes(I2)) : true;
    }, O2 = (u2) => {
      const I2 = n.is24 ? 24 : 12, Q2 = u2 === "hours" ? I2 : 60, K2 = +n[`${u2}GridIncrement`], te = u2 === "hours" && !n.is24 ? K2 : 0, le = [];
      for (let be = te; be < Q2; be += K2)
        le.push({ value: be, text: be < 10 ? `0${be}` : `${be}` });
      return u2 === "hours" && !n.is24 && le.push({ value: 0, text: "12" }), Ct(le, (be) => ({ active: false, disabled: T2.value.times[u2].includes(be.value) || !d3(be.value, u2) || ne(u2, be.value) || b2(u2, be.value) }));
    }, d3 = (u2, I2) => {
      const Q2 = n.minTime ? g(yn(n.minTime)) : null, K2 = n.maxTime ? g(yn(n.maxTime)) : null, te = g(yn(F.value, I2, u2));
      return Q2 && K2 ? (isBefore(te, K2) || isEqual(te, K2)) && (isAfter(te, Q2) || isEqual(te, Q2)) : Q2 ? isAfter(te, Q2) || isEqual(te, Q2) : K2 ? isBefore(te, K2) || isEqual(te, K2) : true;
    }, Y2 = (u2) => n[`no${u2[0].toUpperCase() + u2.slice(1)}Overlay`], Z = (u2) => {
      Y2(u2) || (M3[u2] = !M3[u2], M3[u2] || a3("overlay-closed"));
    }, y3 = (u2) => u2 === "hours" ? getHours : u2 === "minutes" ? getMinutes : getSeconds, l = (u2, I2 = true) => {
      const Q2 = I2 ? V : ie, K2 = I2 ? +n[`${u2}Increment`] : -+n[`${u2}Increment`];
      d3(+n[u2] + K2, u2) && a3(
        `update:${u2}`,
        y3(u2)(Q2({ [u2]: +n[u2] }, { [u2]: +n[`${u2}Increment`] }))
      );
    }, h4 = (u2) => n.is24 ? u2 : (u2 >= 12 ? C.value = "PM" : C.value = "AM", Vr(u2)), s3 = () => {
      C.value === "PM" ? (C.value = "AM", a3("update:hours", n.hours - 12)) : (C.value = "PM", a3("update:hours", n.hours + 12)), a3("am-pm-change", C.value);
    }, J = (u2) => {
      M3[u2] = true;
    }, de = (u2, I2, Q2) => {
      if (u2 && n.arrowNavigation) {
        Array.isArray(q2.value[I2]) ? q2.value[I2][Q2] = u2 : q2.value[I2] = [u2];
        const K2 = q2.value.reduce(
          (te, le) => le.map((be, N) => [...te[N] || [], le[N]]),
          []
        );
        i2(n.closeTimePickerBtn), A.value && (K2[1] = K2[1].concat(A.value)), o(K2, n.order);
      }
    }, $ = (u2, I2) => (Z(u2), u2 === "hours" && !n.is24 ? a3(`update:${u2}`, C.value === "PM" ? I2 + 12 : I2) : a3(`update:${u2}`, I2));
    return t2({ openChildCmp: J }), (u2, I2) => {
      var Q2;
      return u2.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Fl, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(f.value, (K2, te) => {
          var le, be, N;
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
                  dp__inc_dec_button_disabled: X2.value(K2.type)
                }),
                "aria-label": (le = unref(c2)) == null ? void 0 : le.incrementValue(K2.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((U) => l(K2.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((U) => l(K2.type), ["prevent"]), ["space"])
                ],
                onClick: (U) => l(K2.type)
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  Vl,
                  Ll
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  u2.$slots["arrow-up"] ? renderSlot(u2.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  u2.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Vn), { key: 1 }))
                ], 64))
              ], 42, Hl),
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
                disabled: Y2(K2.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((U) => Z(K2.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((U) => Z(K2.type), ["prevent"]), ["space"])
                ],
                onClick: (U) => Z(K2.type)
              }, [
                u2.$slots[K2.type] ? renderSlot(u2.$slots, K2.type, {
                  key: 0,
                  text: L2.value(K2.type).text,
                  value: L2.value(K2.type).value
                }) : createCommentVNode("", true),
                u2.$slots[K2.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(L2.value(K2.type).text), 1)
                ], 64))
              ], 42, Ul),
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
                "aria-label": (N = unref(c2)) == null ? void 0 : N.decrementValue(K2.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((U) => l(K2.type, false), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((U) => l(K2.type, false), ["prevent"]), ["space"])
                ],
                onClick: (U) => l(K2.type, false)
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  Wl,
                  jl
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  u2.$slots["arrow-down"] ? renderSlot(u2.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                  u2.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ln), { key: 1 }))
                ], 64))
              ], 42, zl)
            ], 64))
          ], 2);
        }), 128)),
        u2.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Kl, [
          u2.$slots["am-pm-button"] ? renderSlot(u2.$slots, "am-pm-button", {
            key: 0,
            toggle: s3,
            value: C.value
          }) : createCommentVNode("", true),
          u2.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: A,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (Q2 = unref(c2)) == null ? void 0 : Q2.amPmButton,
            tabindex: "0",
            onClick: s3,
            onKeydown: [
              withKeys(withModifiers(s3, ["prevent"]), ["enter"]),
              withKeys(withModifiers(s3, ["prevent"]), ["space"])
            ]
          }, toDisplayString(C.value), 41, Gl))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(w2.value, (K2, te) => (openBlock(), createBlock(Transition, {
          key: te,
          name: unref(R2)(M3[K2.type]),
          css: unref(P)
        }, {
          default: withCtx(() => [
            M3[K2.type] ? (openBlock(), createBlock(zt, {
              key: 0,
              items: O2(K2.type),
              "is-last": u2.autoApply && !unref(D2).keepActionRow,
              "esc-close": u2.escClose,
              type: K2.type,
              "text-input": u2.textInput,
              config: u2.config,
              "arrow-navigation": u2.arrowNavigation,
              onSelected: (le) => $(K2.type, le),
              onToggle: (le) => Z(K2.type),
              onResetFlow: I2[0] || (I2[0] = (le) => u2.$emit("reset-flow"))
            }, createSlots({
              "button-icon": withCtx(() => [
                u2.$slots["clock-icon"] ? renderSlot(u2.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                u2.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(u2.timePickerInline ? unref(Ot) : unref(Hn)), { key: 1 }))
              ]),
              _: 2
            }, [
              u2.$slots[`${K2.type}-overlay-value`] ? {
                name: "item",
                fn: withCtx(({ item: le }) => [
                  renderSlot(u2.$slots, `${K2.type}-overlay-value`, {
                    text: le.text,
                    value: le.value
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
var Zl = { class: "dp--tp-wrap" };
var Ql = ["aria-label", "tabindex"];
var Xl = ["tabindex"];
var Jl = ["aria-label"];
var Wa = defineComponent({
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
    ...tt
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
    const a3 = r, n = e2, { buildMatrix: o, setTimePicker: i2 } = yt(), c2 = useSlots(), { defaultedTransitions: p, defaultedAriaLabels: T2, defaultedTextInput: D2, defaultedConfig: R2 } = Pe(n), { transitionName: P, showTransition: M3 } = Lt(p), { hideNavigationButtons: C } = an(), A = ref(null), q2 = ref(null), g = ref([]), S3 = ref(null);
    onMounted(() => {
      a3("mount"), !n.timePicker && n.arrowNavigation ? o([Re(A.value)], "time") : i2(true, n.timePicker);
    });
    const F = computed(() => n.range && n.modelAuto ? Ra(n.internalModelValue) : true), b2 = ref(false), _ = (O2) => ({
      hours: Array.isArray(n.hours) ? n.hours[O2] : n.hours,
      minutes: Array.isArray(n.minutes) ? n.minutes[O2] : n.minutes,
      seconds: Array.isArray(n.seconds) ? n.seconds[O2] : n.seconds
    }), X2 = computed(() => {
      const O2 = [];
      if (n.range)
        for (let d3 = 0; d3 < 2; d3++)
          O2.push(_(d3));
      else
        O2.push(_(0));
      return O2;
    }), ae = (O2, d3 = false, Y2 = "") => {
      d3 || a3("reset-flow"), b2.value = O2, a3(O2 ? "overlay-opened" : "overlay-closed"), n.arrowNavigation && i2(O2), nextTick(() => {
        Y2 !== "" && g.value[0] && g.value[0].openChildCmp(Y2);
      });
    }, V = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: n.autoApply && !R2.value.keepActionRow
    })), ie = qe(c2, "timePicker"), E2 = (O2, d3, Y2) => n.range ? d3 === 0 ? [O2, X2.value[1][Y2]] : [X2.value[0][Y2], O2] : O2, f = (O2) => {
      a3("update:hours", O2);
    }, w2 = (O2) => {
      a3("update:minutes", O2);
    }, L2 = (O2) => {
      a3("update:seconds", O2);
    }, ne = () => {
      if (S3.value && !D2.value.enabled && !n.noOverlayFocus) {
        const O2 = Ur(S3.value);
        O2 && O2.focus({ preventScroll: true });
      }
    };
    return t2({ toggleTimePicker: ae }), (O2, d3) => {
      var Y2;
      return openBlock(), createElementBlock("div", Zl, [
        !O2.timePicker && !O2.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "openTimePickerBtn",
          ref: A,
          type: "button",
          class: normalizeClass(V.value),
          "aria-label": (Y2 = unref(T2)) == null ? void 0 : Y2.openTimePicker,
          tabindex: O2.noOverlayFocus ? void 0 : 0,
          onKeydown: [
            d3[0] || (d3[0] = withKeys((Z) => ae(true), ["enter"])),
            d3[1] || (d3[1] = withKeys((Z) => ae(true), ["space"]))
          ],
          onClick: d3[2] || (d3[2] = (Z) => ae(true))
        }, [
          O2.$slots["clock-icon"] ? renderSlot(O2.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          O2.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Hn), { key: 1 }))
        ], 42, Ql)), [
          [vShow, !unref(C)(O2.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(P)(b2.value),
          css: unref(M3) && !O2.timePickerInline
        }, {
          default: withCtx(() => {
            var Z;
            return [
              b2.value || O2.timePicker || O2.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "overlayRef",
                ref: S3,
                class: normalizeClass({
                  dp__overlay: !O2.timePickerInline,
                  "dp--overlay-absolute": !n.timePicker && !O2.timePickerInline,
                  "dp--overlay-relative": n.timePicker
                }),
                style: normalizeStyle(O2.timePicker ? { height: `${unref(R2).modeHeight}px` } : void 0),
                tabindex: O2.timePickerInline ? void 0 : 0
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(
                    O2.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
                  ),
                  style: { display: "flex" }
                }, [
                  O2.$slots["time-picker-overlay"] ? renderSlot(O2.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e2.hours,
                    minutes: e2.minutes,
                    seconds: e2.seconds,
                    setHours: f,
                    setMinutes: w2,
                    setSeconds: L2
                  }) : createCommentVNode("", true),
                  O2.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(O2.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(X2.value, (y3, l) => withDirectives((openBlock(), createBlock(ql, mergeProps({ key: l }, {
                      ...O2.$props,
                      order: l,
                      hours: y3.hours,
                      minutes: y3.minutes,
                      seconds: y3.seconds,
                      closeTimePickerBtn: q2.value,
                      disabledTimesConfig: e2.disabledTimesConfig,
                      disabled: l === 0 ? O2.fixedStart : O2.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: g,
                      "validate-time": (h4, s3) => e2.validateTime(h4, E2(s3, l, h4)),
                      "onUpdate:hours": (h4) => f(E2(h4, l, "hours")),
                      "onUpdate:minutes": (h4) => w2(E2(h4, l, "minutes")),
                      "onUpdate:seconds": (h4) => L2(E2(h4, l, "seconds")),
                      onMounted: ne,
                      onOverlayClosed: ne,
                      onAmPmChange: d3[3] || (d3[3] = (h4) => O2.$emit("am-pm-change", h4))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(ie), (h4, s3) => ({
                        name: h4,
                        fn: withCtx((J) => [
                          renderSlot(O2.$slots, h4, normalizeProps(guardReactiveProps(J)))
                        ])
                      }))
                    ]), 1040, ["validate-time", "onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, l === 0 ? true : F.value]
                    ])), 128))
                  ], 2)),
                  !O2.timePicker && !O2.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: q2,
                    type: "button",
                    class: normalizeClass(V.value),
                    "aria-label": (Z = unref(T2)) == null ? void 0 : Z.closeTimePicker,
                    tabindex: "0",
                    onKeydown: [
                      d3[4] || (d3[4] = withKeys((y3) => ae(false), ["enter"])),
                      d3[5] || (d3[5] = withKeys((y3) => ae(false), ["space"]))
                    ],
                    onClick: d3[6] || (d3[6] = (y3) => ae(false))
                  }, [
                    O2.$slots["calendar-icon"] ? renderSlot(O2.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    O2.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ot), { key: 1 }))
                  ], 42, Jl)), [
                    [vShow, !unref(C)(O2.hideNavigation, "time")]
                  ]) : createCommentVNode("", true)
                ], 2)
              ], 14, Xl)) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var ja = (e2, t2, r, a3) => {
  const n = (g, S3) => Array.isArray(t2[g]) ? t2[g][S3] : t2[g], o = (g) => e2.enableSeconds ? Array.isArray(t2.seconds) ? t2.seconds[g] : t2.seconds : 0, i2 = (g, S3) => g ? S3 !== void 0 ? vt(g, n("hours", S3), n("minutes", S3), o(S3)) : vt(g, t2.hours, t2.minutes, o()) : setSeconds(B2(), o(S3)), c2 = (g, S3) => {
    t2[g] = S3;
  }, p = (g, S3) => {
    const F = Object.fromEntries(
      Object.keys(t2).map((b2) => b2 === g ? [b2, S3] : [b2, t2[b2]].slice())
    );
    if (e2.range && !e2.disableTimeRangeValidation) {
      const b2 = (X2) => r.value ? vt(
        r.value[X2],
        F.hours[X2],
        F.minutes[X2],
        F.seconds[X2]
      ) : null, _ = (X2) => setMilliseconds(r.value[X2], 0);
      return !(ke(b2(0), b2(1)) && (isAfter(b2(0), _(1)) || isBefore(b2(1), _(0))));
    }
    return true;
  }, T2 = (g, S3) => {
    p(g, S3) && (c2(g, S3), a3 && a3());
  }, D2 = (g) => {
    T2("hours", g);
  }, R2 = (g) => {
    T2("minutes", g);
  }, P = (g) => {
    T2("seconds", g);
  }, M3 = (g, S3, F, b2) => {
    S3 && D2(g), !S3 && !F && R2(g), F && P(g), r.value && b2(r.value);
  }, C = (g) => {
    if (g) {
      const S3 = Array.isArray(g), F = S3 ? [+g[0].hours, +g[1].hours] : +g.hours, b2 = S3 ? [+g[0].minutes, +g[1].minutes] : +g.minutes, _ = S3 ? [+g[0].seconds, +g[1].seconds] : +g.seconds;
      c2("hours", F), c2("minutes", b2), e2.enableSeconds && c2("seconds", _);
    }
  }, A = (g, S3) => {
    const F = {
      hours: Array.isArray(t2.hours) ? t2.hours[g] : t2.hours,
      disabledArr: []
    };
    return (S3 || S3 === 0) && (F.hours = S3), Array.isArray(e2.disabledTimes) && (F.disabledArr = e2.range && Array.isArray(e2.disabledTimes[g]) ? e2.disabledTimes[g] : e2.disabledTimes), F;
  }, q2 = computed(() => (g, S3) => {
    var F;
    if (Array.isArray(e2.disabledTimes)) {
      const { disabledArr: b2, hours: _ } = A(g, S3), X2 = b2.filter((ae) => +ae.hours === _);
      return ((F = X2[0]) == null ? void 0 : F.minutes) === "*" ? { hours: [_], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (X2 == null ? void 0 : X2.map((ae) => +ae.minutes)) ?? [],
        seconds: (X2 == null ? void 0 : X2.map((ae) => ae.seconds ? +ae.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: c2,
    updateHours: D2,
    updateMinutes: R2,
    updateSeconds: P,
    getSetDateTime: i2,
    updateTimeValues: M3,
    getSecondsValue: o,
    assignStartTime: C,
    validateTime: p,
    disabledTimesConfig: q2
  };
};
var xl = (e2, t2) => {
  const { modelValue: r, time: a3 } = Ut(e2, t2), { defaultedStartTime: n } = Pe(e2), { updateTimeValues: o, getSetDateTime: i2, setTime: c2, assignStartTime: p, disabledTimesConfig: T2, validateTime: D2 } = ja(e2, a3, r), R2 = (F) => {
    const { hours: b2, minutes: _, seconds: X2 } = F;
    return { hours: +b2, minutes: +_, seconds: X2 ? +X2 : 0 };
  }, P = () => {
    if (e2.startTime) {
      if (Array.isArray(e2.startTime)) {
        const b2 = R2(e2.startTime[0]), _ = R2(e2.startTime[1]);
        return [set(B2(), b2), set(B2(), _)];
      }
      const F = R2(e2.startTime);
      return set(B2(), F);
    }
    return e2.range ? [null, null] : null;
  }, M3 = () => {
    if (e2.range) {
      const [F, b2] = P();
      r.value = [i2(F, 0), i2(b2, 1)];
    } else
      r.value = i2(P());
  }, C = (F) => Array.isArray(F) ? [wt(B2(F[0])), wt(B2(F[1]))] : [wt(F ?? B2())], A = (F, b2, _) => {
    c2("hours", F), c2("minutes", b2), c2("seconds", e2.enableSeconds ? _ : 0);
  }, q2 = () => {
    const [F, b2] = C(r.value);
    return e2.range ? A(
      [F.hours, b2.hours],
      [F.minutes, b2.minutes],
      [F.seconds, b2.minutes]
    ) : A(F.hours, F.minutes, F.seconds);
  };
  onMounted(() => {
    if (!e2.shadow)
      return p(n.value), r.value ? q2() : M3();
  });
  const g = () => {
    Array.isArray(r.value) ? r.value = r.value.map((F, b2) => F && i2(F, b2)) : r.value = i2(r.value), t2("time-update");
  };
  return {
    modelValue: r,
    time: a3,
    disabledTimesConfig: T2,
    updateTime: (F, b2 = true, _ = false) => {
      o(F, b2, _, g);
    },
    validateTime: D2
  };
};
var eo = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePickerSolo",
  props: {
    ...tt
  },
  emits: ["update:internal-model-value", "time-update", "am-pm-change"],
  setup(e2, { expose: t2, emit: r }) {
    const a3 = r, n = e2, o = useSlots(), i2 = qe(o, "timePicker"), { time: c2, modelValue: p, disabledTimesConfig: T2, updateTime: D2, validateTime: R2 } = xl(n, a3);
    return t2({ getSidebarProps: () => ({
      modelValue: p,
      time: c2,
      updateTime: D2
    }) }), (M3, C) => (openBlock(), createBlock(ln, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(() => [
        createVNode(Wa, mergeProps(M3.$props, {
          hours: unref(c2).hours,
          minutes: unref(c2).minutes,
          seconds: unref(c2).seconds,
          "internal-model-value": M3.internalModelValue,
          "disabled-times-config": unref(T2),
          "validate-time": unref(R2),
          "onUpdate:hours": C[0] || (C[0] = (A) => unref(D2)(A)),
          "onUpdate:minutes": C[1] || (C[1] = (A) => unref(D2)(A, false)),
          "onUpdate:seconds": C[2] || (C[2] = (A) => unref(D2)(A, false, true)),
          onAmPmChange: C[3] || (C[3] = (A) => M3.$emit("am-pm-change", A))
        }), createSlots({ _: 2 }, [
          renderList(unref(i2), (A, q2) => ({
            name: A,
            fn: withCtx((g) => [
              renderSlot(M3.$slots, A, normalizeProps(guardReactiveProps(g)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"])
      ]),
      _: 3
    }));
  }
});
var to = { class: "dp__month_year_row" };
var no = ["aria-label", "onClick", "onKeydown"];
var ao = defineComponent({
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
    ...tt
  },
  emits: ["update-month-year", "mount", "reset-flow", "overlay-closed"],
  setup(e2, { expose: t2, emit: r }) {
    const a3 = r, n = e2, {
      defaultedTransitions: o,
      defaultedAriaLabels: i2,
      defaultedMultiCalendars: c2,
      defaultedFilters: p,
      defaultedConfig: T2,
      defaultedHighlight: D2
    } = Pe(n), { transitionName: R2, showTransition: P } = Lt(o), { buildMatrix: M3 } = yt(), { handleMonthYearChange: C, isDisabled: A, updateMonthYear: q2 } = vl(n, a3), { showLeftIcon: g, showRightIcon: S3 } = an(), F = ref(false), b2 = ref(false), _ = ref([null, null, null, null]);
    onMounted(() => {
      a3("mount");
    });
    const X2 = (l) => ({
      get: () => n[l],
      set: (h4) => {
        const s3 = l === Qe.month ? Qe.year : Qe.month;
        a3("update-month-year", { [l]: h4, [s3]: n[s3] }), l === Qe.month ? ne(true) : O2(true);
      }
    }), ae = computed(X2(Qe.month)), V = computed(X2(Qe.year)), ie = computed(() => (l) => ({
      month: n.month,
      year: n.year,
      items: l === Qe.month ? n.months : n.years,
      instance: n.instance,
      updateMonthYear: q2,
      toggle: l === Qe.month ? ne : O2
    })), E2 = computed(() => {
      const l = n.months.find((h4) => h4.value === n.month);
      return l || { text: "", value: 0 };
    }), f = computed(() => Ct(n.months, (l) => {
      const h4 = n.month === l.value, s3 = Ht(
        l.value,
        Oa(n.year, n.minDate),
        Ya(n.year, n.maxDate)
      ) || p.value.months.includes(l.value), J = Ha(D2.value, l.value, n.year);
      return { active: h4, disabled: s3, highlighted: J };
    })), w2 = computed(() => Ct(n.years, (l) => {
      const h4 = n.year === l.value, s3 = Ht(l.value, _t(n.minDate), _t(n.maxDate)) || p.value.years.includes(l.value), J = Kn(D2.value, l.value);
      return { active: h4, disabled: s3, highlighted: J };
    })), L2 = (l, h4) => {
      h4 !== void 0 ? l.value = h4 : l.value = !l.value, l.value || a3("overlay-closed");
    }, ne = (l = false, h4) => {
      d3(l), L2(F, h4);
    }, O2 = (l = false, h4) => {
      d3(l), L2(b2, h4);
    }, d3 = (l) => {
      l || a3("reset-flow");
    }, Y2 = (l, h4) => {
      n.arrowNavigation && (_.value[h4] = Re(l), M3(_.value, "monthYear"));
    }, Z = computed(() => {
      var l, h4;
      return [
        {
          type: Qe.month,
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
          type: Qe.year,
          index: 2,
          toggle: O2,
          modelValue: V.value,
          updateModelValue: (s3) => V.value = s3,
          text: n.year,
          showSelectionGrid: b2.value,
          items: w2.value,
          ariaLabel: (h4 = i2.value) == null ? void 0 : h4.openYearsOverlay
        }
      ];
    }), y3 = computed(() => n.disableYearSelect ? [Z.value[0]] : n.yearFirst ? [...Z.value].reverse() : Z.value);
    return t2({
      toggleMonthPicker: ne,
      toggleYearPicker: O2,
      handleMonthYearChange: C
    }), (l, h4) => {
      var s3, J, de;
      return openBlock(), createElementBlock("div", to, [
        l.$slots["month-year"] ? renderSlot(l.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, { month: e2.month, year: e2.year, months: e2.months, years: e2.years, updateMonthYear: unref(q2), handleMonthYearChange: unref(C), instance: e2.instance }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          unref(g)(unref(c2), e2.instance) && !l.vertical ? (openBlock(), createBlock(It, {
            key: 0,
            "aria-label": (s3 = unref(i2)) == null ? void 0 : s3.prevMonth,
            disabled: unref(A)(false),
            onActivate: h4[0] || (h4[0] = ($) => unref(C)(false, true)),
            onSetRef: h4[1] || (h4[1] = ($) => Y2($, 0))
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
            (openBlock(true), createElementBlock(Fragment, null, renderList(y3.value, ($, u2) => (openBlock(), createElementBlock(Fragment, {
              key: $.type
            }, [
              createBaseVNode("button", {
                ref_for: true,
                ref: (I2) => Y2(I2, u2 + 1),
                type: "button",
                class: "dp__btn dp__month_year_select",
                tabindex: "0",
                "aria-label": $.ariaLabel,
                onClick: $.toggle,
                onKeydown: [
                  withKeys(withModifiers($.toggle, ["prevent"]), ["enter"]),
                  withKeys(withModifiers($.toggle, ["prevent"]), ["space"])
                ]
              }, [
                l.$slots[$.type] ? renderSlot(l.$slots, $.type, {
                  key: 0,
                  text: $.text,
                  value: n[$.type]
                }) : createCommentVNode("", true),
                l.$slots[$.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString($.text), 1)
                ], 64))
              ], 40, no),
              createVNode(Transition, {
                name: unref(R2)($.showSelectionGrid),
                css: unref(P)
              }, {
                default: withCtx(() => [
                  $.showSelectionGrid ? (openBlock(), createBlock(zt, {
                    key: 0,
                    items: $.items,
                    "arrow-navigation": l.arrowNavigation,
                    "hide-navigation": l.hideNavigation,
                    "is-last": l.autoApply && !unref(T2).keepActionRow,
                    "skip-button-ref": false,
                    config: l.config,
                    type: $.type,
                    "header-refs": [],
                    "esc-close": l.escClose,
                    "text-input": l.textInput,
                    onSelected: $.updateModelValue,
                    onToggle: $.toggle
                  }, createSlots({
                    "button-icon": withCtx(() => [
                      l.$slots["calendar-icon"] ? renderSlot(l.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                      l.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ot), { key: 1 }))
                    ]),
                    _: 2
                  }, [
                    l.$slots[`${$.type}-overlay-value`] ? {
                      name: "item",
                      fn: withCtx(({ item: I2 }) => [
                        renderSlot(l.$slots, `${$.type}-overlay-value`, {
                          text: I2.text,
                          value: I2.value
                        })
                      ]),
                      key: "0"
                    } : void 0,
                    l.$slots[`${$.type}-overlay`] ? {
                      name: "overlay",
                      fn: withCtx(() => [
                        renderSlot(l.$slots, `${$.type}-overlay`, normalizeProps(guardReactiveProps(ie.value($.type))))
                      ]),
                      key: "1"
                    } : void 0,
                    l.$slots[`${$.type}-overlay-header`] ? {
                      name: "header",
                      fn: withCtx(() => [
                        renderSlot(l.$slots, `${$.type}-overlay-header`, {
                          toggle: $.toggle
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
          unref(g)(unref(c2), e2.instance) && l.vertical ? (openBlock(), createBlock(It, {
            key: 1,
            "aria-label": (J = unref(i2)) == null ? void 0 : J.prevMonth,
            disabled: unref(A)(false),
            onActivate: h4[2] || (h4[2] = ($) => unref(C)(false, true))
          }, {
            default: withCtx(() => [
              l.$slots["arrow-up"] ? renderSlot(l.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
              l.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Vn), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
          unref(S3)(unref(c2), e2.instance) ? (openBlock(), createBlock(It, {
            key: 2,
            ref: "rightIcon",
            disabled: unref(A)(true),
            "aria-label": (de = unref(i2)) == null ? void 0 : de.nextMonth,
            onActivate: h4[3] || (h4[3] = ($) => unref(C)(true, true)),
            onSetRef: h4[4] || (h4[4] = ($) => Y2($, l.disableYearSelect ? 2 : 3))
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
var ro = ["aria-label"];
var lo = {
  class: "dp__calendar_header",
  role: "row"
};
var oo = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
};
var so = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1);
var io = ["aria-label"];
var uo = {
  key: 0,
  role: "gridcell",
  class: "dp__calendar_item dp__week_num"
};
var co = { class: "dp__cell_inner" };
var fo = ["id", "aria-selected", "aria-disabled", "aria-label", "onClick", "onKeydown", "onMouseenter", "onMouseleave"];
var vo = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DpCalendar",
  props: {
    mappedDates: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    ...tt
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
      defaultedMultiCalendars: T2,
      defaultedWeekNumbers: D2
    } = Pe(n), R2 = ref(null), P = ref({
      bottom: "",
      left: "",
      transform: ""
    }), M3 = ref([]), C = ref(null), A = ref(true), q2 = ref(""), g = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), S3 = ref([]), F = ref({ left: "50%" }), b2 = computed(() => n.calendar ? n.calendar(n.mappedDates) : n.mappedDates), _ = computed(() => n.dayNames ? Array.isArray(n.dayNames) ? n.dayNames : n.dayNames(n.locale, +n.weekStart) : Hr(n.formatLocale, n.locale, +n.weekStart));
    onMounted(() => {
      a3("mount", { cmp: "calendar", refs: M3 }), c2.value.noSwipe || C.value && (C.value.addEventListener("touchstart", O2, { passive: false }), C.value.addEventListener("touchend", d3, { passive: false }), C.value.addEventListener("touchmove", Y2, { passive: false })), n.monthChangeOnScroll && C.value && C.value.addEventListener("wheel", l, { passive: false });
    });
    const X2 = ($) => $ ? n.vertical ? "vNext" : "next" : n.vertical ? "vPrevious" : "previous", ae = ($, u2) => {
      if (n.transitions) {
        const I2 = Fe(ot(B2(), n.month, n.year));
        q2.value = Ee(Fe(ot(B2(), $, u2)), I2) ? i2.value[X2(true)] : i2.value[X2(false)], A.value = false, nextTick(() => {
          A.value = true;
        });
      }
    }, V = computed(
      () => ({
        [n.calendarClassName]: !!n.calendarClassName
      })
    ), ie = computed(() => ($) => {
      const u2 = Lr($);
      return {
        dp__marker_dot: u2.type === "dot",
        dp__marker_line: u2.type === "line"
      };
    }), E2 = computed(() => ($) => ke($, R2.value)), f = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: T2.value.count > 0 && n.instance !== 0
    })), w2 = computed(() => ($) => n.hideOffsetDates ? $.current : true), L2 = async ($, u2, I2) => {
      var Q2, K2;
      if (a3("set-hover-date", $), (K2 = (Q2 = $.marker) == null ? void 0 : Q2.tooltip) != null && K2.length) {
        const te = Re(M3.value[u2][I2]);
        if (te) {
          const { width: le, height: be } = te.getBoundingClientRect();
          R2.value = $.value;
          let N = { left: `${le / 2}px` }, U = -50;
          if (await nextTick(), S3.value[0]) {
            const { left: Me, width: G2 } = S3.value[0].getBoundingClientRect();
            Me < 0 && (N = { left: "0" }, U = 0, F.value.left = `${le / 2}px`), window.innerWidth < Me + G2 && (N = { right: "0" }, U = 0, F.value.left = `${G2 - le / 2}px`);
          }
          P.value = {
            bottom: `${be}px`,
            ...N,
            transform: `translateX(${U}%)`
          }, a3("tooltip-open", $.marker);
        }
      }
    }, ne = ($) => {
      R2.value && (R2.value = null, P.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a3("tooltip-close", $.marker));
    }, O2 = ($) => {
      g.value.startX = $.changedTouches[0].screenX, g.value.startY = $.changedTouches[0].screenY;
    }, d3 = ($) => {
      g.value.endX = $.changedTouches[0].screenX, g.value.endY = $.changedTouches[0].screenY, Z();
    }, Y2 = ($) => {
      n.vertical && !n.inline && $.preventDefault();
    }, Z = () => {
      const $ = n.vertical ? "Y" : "X";
      Math.abs(g.value[`start${$}`] - g.value[`end${$}`]) > 10 && a3("handle-swipe", g.value[`start${$}`] > g.value[`end${$}`] ? "right" : "left");
    }, y3 = ($, u2, I2) => {
      $ && (Array.isArray(M3.value[u2]) ? M3.value[u2][I2] = $ : M3.value[u2] = [$]), n.arrowNavigation && o(M3.value, "calendar");
    }, l = ($) => {
      n.monthChangeOnScroll && ($.preventDefault(), a3("handle-scroll", $));
    }, h4 = ($) => D2.value.type === "local" ? getWeek($.value, { weekStartsOn: +n.weekStart }) : D2.value.type === "iso" ? getISOWeek($.value) : typeof D2.value.type == "function" ? D2.value.type($.value) : "", s3 = ($) => {
      const u2 = $[0];
      return D2.value.hideOnOffsetDates ? $.some((I2) => I2.current) ? h4(u2) : "" : h4(u2);
    }, J = ($, u2) => {
      ft($, c2.value), a3("select-date", u2);
    }, de = ($) => {
      ft($, c2.value);
    };
    return t2({ triggerTransition: ae }), ($, u2) => {
      var I2;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(f.value)
      }, [
        createBaseVNode("div", {
          ref_key: "calendarWrapRef",
          ref: C,
          role: "grid",
          class: normalizeClass(V.value),
          "aria-label": (I2 = unref(p)) == null ? void 0 : I2.calendarWrap
        }, [
          (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createBaseVNode("div", lo, [
              $.weekNumbers ? (openBlock(), createElementBlock("div", oo, toDisplayString($.weekNumName), 1)) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(_.value, (Q2, K2) => (openBlock(), createElementBlock("div", {
                key: K2,
                class: "dp__calendar_header_item",
                role: "gridcell"
              }, [
                $.$slots["calendar-header"] ? renderSlot($.$slots, "calendar-header", {
                  key: 0,
                  day: Q2,
                  index: K2
                }) : createCommentVNode("", true),
                $.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(Q2), 1)
                ], 64))
              ]))), 128))
            ]),
            so,
            createVNode(Transition, {
              name: q2.value,
              css: !!$.transitions
            }, {
              default: withCtx(() => {
                var Q2;
                return [
                  A.value ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "dp__calendar",
                    role: "rowgroup",
                    "aria-label": ((Q2 = unref(p)) == null ? void 0 : Q2.calendarDays) || void 0
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(b2.value, (K2, te) => (openBlock(), createElementBlock("div", {
                      key: te,
                      class: "dp__calendar_row",
                      role: "row"
                    }, [
                      $.weekNumbers ? (openBlock(), createElementBlock("div", uo, [
                        createBaseVNode("div", co, toDisplayString(s3(K2.days)), 1)
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(K2.days, (le, be) => {
                        var N, U, Me;
                        return openBlock(), createElementBlock("div", {
                          id: le.value.toISOString().split("T")[0],
                          ref_for: true,
                          ref: (G2) => y3(G2, te, be),
                          key: be + te,
                          role: "gridcell",
                          class: "dp__calendar_item",
                          "aria-selected": le.classData.dp__active_date || le.classData.dp__range_start || le.classData.dp__range_start,
                          "aria-disabled": le.classData.dp__cell_disabled || void 0,
                          "aria-label": (U = (N = unref(p)) == null ? void 0 : N.day) == null ? void 0 : U.call(N, le),
                          tabindex: "0",
                          onClick: withModifiers((G2) => J(G2, le), ["prevent"]),
                          onKeydown: [
                            withKeys((G2) => $.$emit("select-date", le), ["enter"]),
                            withKeys((G2) => $.$emit("handle-space", le), ["space"])
                          ],
                          onMouseenter: (G2) => L2(le, te, be),
                          onMouseleave: (G2) => ne(le)
                        }, [
                          createBaseVNode("div", {
                            class: normalizeClass(["dp__cell_inner", le.classData])
                          }, [
                            $.$slots.day && w2.value(le) ? renderSlot($.$slots, "day", {
                              key: 0,
                              day: +le.text,
                              date: le.value
                            }) : createCommentVNode("", true),
                            $.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createTextVNode(toDisplayString(le.text), 1)
                            ], 64)),
                            le.marker && w2.value(le) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                              $.$slots.marker ? renderSlot($.$slots, "marker", {
                                key: 0,
                                marker: le.marker,
                                day: +le.text,
                                date: le.value
                              }) : (openBlock(), createElementBlock("div", {
                                key: 1,
                                class: normalizeClass(ie.value(le.marker)),
                                style: normalizeStyle(le.marker.color ? { backgroundColor: le.marker.color } : {})
                              }, null, 6))
                            ], 64)) : createCommentVNode("", true),
                            E2.value(le.value) ? (openBlock(), createElementBlock("div", {
                              key: 3,
                              ref_for: true,
                              ref_key: "activeTooltip",
                              ref: S3,
                              class: "dp__marker_tooltip",
                              style: normalizeStyle(P.value)
                            }, [
                              (Me = le.marker) != null && Me.tooltip ? (openBlock(), createElementBlock("div", {
                                key: 0,
                                class: "dp__tooltip_content",
                                onClick: de
                              }, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(le.marker.tooltip, (G2, We) => (openBlock(), createElementBlock("div", {
                                  key: We,
                                  class: "dp__tooltip_text"
                                }, [
                                  $.$slots["marker-tooltip"] ? renderSlot($.$slots, "marker-tooltip", {
                                    key: 0,
                                    tooltip: G2,
                                    day: le.value
                                  }) : createCommentVNode("", true),
                                  $.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                    createBaseVNode("div", {
                                      class: "dp__tooltip_mark",
                                      style: normalizeStyle(G2.color ? { backgroundColor: G2.color } : {})
                                    }, null, 4),
                                    createBaseVNode("div", null, toDisplayString(G2.text), 1)
                                  ], 64))
                                ]))), 128)),
                                createBaseVNode("div", {
                                  class: "dp__arrow_bottom_tp",
                                  style: normalizeStyle(F.value)
                                }, null, 4)
                              ])) : createCommentVNode("", true)
                            ], 4)) : createCommentVNode("", true)
                          ], 2)
                        ], 40, fo);
                      }), 128))
                    ]))), 128))
                  ], 8, io)) : createCommentVNode("", true)
                ];
              }),
              _: 3
            }, 8, ["name", "css"])
          ], 64))
        ], 10, ro)
      ], 2);
    };
  }
});
var ha = (e2) => Array.isArray(e2);
var mo = (e2, t2, r, a3) => {
  const n = ref([]), { modelValue: o, calendars: i2, time: c2 } = Ut(e2, t2), { defaultedMultiCalendars: p, defaultedStartTime: T2 } = Pe(e2), { validateMonthYearInRange: D2, isDisabled: R2, isDateRangeAllowed: P, checkMinMaxRange: M3 } = $t(e2), { updateTimeValues: C, getSetDateTime: A, setTime: q2, assignStartTime: g, validateTime: S3, disabledTimesConfig: F } = ja(e2, c2, o, a3), b2 = computed(
    () => (m3) => i2.value[m3] ? i2.value[m3].month : 0
  ), _ = computed(
    () => (m3) => i2.value[m3] ? i2.value[m3].year : 0
  ), X2 = (m3, W, oe) => {
    var me, Se;
    i2.value[m3] || (i2.value[m3] = { month: 0, year: 0 }), i2.value[m3].month = fa(W) ? (me = i2.value[m3]) == null ? void 0 : me.month : W, i2.value[m3].year = fa(oe) ? (Se = i2.value[m3]) == null ? void 0 : Se.year : oe;
  }, ae = () => {
    e2.autoApply && t2("select-date");
  };
  watch(o, (m3, W) => {
    JSON.stringify(m3) !== JSON.stringify(W) && E2();
  }), onMounted(() => {
    e2.shadow || (o.value || (l(), T2.value && g(T2.value)), E2(true), e2.focusStartDate && e2.startDate && l());
  });
  const V = computed(() => {
    var m3;
    return (m3 = e2.flow) != null && m3.length && !e2.partialFlow ? e2.flowStep === e2.flow.length : true;
  }), ie = () => {
    e2.autoApply && V.value && t2("auto-apply", e2.partialFlow);
  }, E2 = (m3 = false) => {
    if (o.value)
      return Array.isArray(o.value) ? (n.value = o.value, d3(m3)) : w2(o.value, m3);
    if (p.value.count && m3 && !e2.startDate)
      return f(B2(), m3);
  }, f = (m3, W = false) => {
    if ((!p.value.count || !p.value.static || W) && X2(0, getMonth(m3), getYear(m3)), p.value.count && (!p.value.solo || !o.value))
      for (let oe = 1; oe < p.value.count; oe++) {
        const me = set(B2(), { month: b2.value(oe - 1), year: _.value(oe - 1) }), Se = add(me, { months: 1 });
        i2.value[oe] = { month: getMonth(Se), year: getYear(Se) };
      }
  }, w2 = (m3, W) => {
    f(m3), q2("hours", getHours(m3)), q2("minutes", getMinutes(m3)), q2("seconds", getSeconds(m3)), p.value.count && W && y3();
  }, L2 = (m3) => {
    if (p.value.count) {
      if (p.value.solo)
        return 0;
      const W = getMonth(m3[0]), oe = getMonth(m3[1]);
      return Math.abs(oe - W) < p.value.count ? 0 : 1;
    }
    return 1;
  }, ne = (m3, W) => {
    m3[1] && e2.showLastInRange ? f(m3[L2(m3)], W) : f(m3[0], W);
    const oe = (me, Se) => [
      me(m3[0]),
      m3[1] ? me(m3[1]) : c2[Se][1]
    ];
    q2("hours", oe(getHours, "hours")), q2("minutes", oe(getMinutes, "minutes")), q2("seconds", oe(getSeconds, "seconds"));
  }, O2 = (m3, W) => {
    if ((e2.range || e2.weekPicker) && !e2.multiDates)
      return ne(m3, W);
    if (e2.multiDates && W) {
      const oe = m3[m3.length - 1];
      return w2(oe, W);
    }
  }, d3 = (m3) => {
    const W = o.value;
    O2(W, m3), p.value.count && p.value.solo && y3();
  }, Y2 = (m3, W) => {
    const oe = set(B2(), { month: b2.value(W), year: _.value(W) }), me = m3 < 0 ? addMonths(oe, 1) : subMonths(oe, 1);
    D2(getMonth(me), getYear(me), m3 < 0, e2.preventMinMaxNavigation) && (X2(W, getMonth(me), getYear(me)), t2("update-month-year", { instance: W, month: getMonth(me), year: getYear(me) }), p.value.count && !p.value.solo && Z(W), r());
  }, Z = (m3) => {
    for (let W = m3 - 1; W >= 0; W--) {
      const oe = subMonths(set(B2(), { month: b2.value(W + 1), year: _.value(W + 1) }), 1);
      X2(W, getMonth(oe), getYear(oe));
    }
    for (let W = m3 + 1; W <= p.value.count - 1; W++) {
      const oe = addMonths(set(B2(), { month: b2.value(W - 1), year: _.value(W - 1) }), 1);
      X2(W, getMonth(oe), getYear(oe));
    }
  }, y3 = () => {
    if (Array.isArray(o.value) && o.value.length === 2) {
      const m3 = B2(
        B2(o.value[1] ? o.value[1] : addMonths(o.value[0], 1))
      ), [W, oe] = [getMonth(o.value[0]), getYear(o.value[0])], [me, Se] = [getMonth(o.value[1]), getYear(o.value[1])];
      (W !== me || W === me && oe !== Se) && p.value.solo && X2(1, getMonth(m3), getYear(m3));
    } else
      o.value && !Array.isArray(o.value) && (X2(0, getMonth(o.value), getYear(o.value)), f(B2()));
  }, l = () => {
    e2.startDate && (X2(0, getMonth(B2(e2.startDate)), getYear(B2(e2.startDate))), p.value.count && Z(0));
  }, h4 = Kr((m3, W) => {
    e2.monthChangeOnScroll && Y2(e2.monthChangeOnScroll !== "inverse" ? -m3.deltaY : m3.deltaY, W);
  }, 50), s3 = (m3, W, oe = false) => {
    e2.monthChangeOnArrows && e2.vertical === oe && J(m3, W);
  }, J = (m3, W) => {
    Y2(m3 === "right" ? -1 : 1, W);
  }, de = (m3) => e2.markers.find(
    (W) => ke(Zr(m3.value), et(B2(W.date), e2.timezone))
  ), $ = (m3, W) => {
    switch (e2.sixWeeks === true ? "append" : e2.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [m3 == 0, true];
      case "fair":
        return [m3 == 0 || W > m3, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, u2 = (m3, W, oe, me) => {
    if (e2.sixWeeks && m3.length < 6) {
      const Se = 6 - m3.length, nt = (W.getDay() + 7 - me) % 7, ue = 6 - (oe.getDay() + 7 - me) % 7, [se, ht] = $(nt, ue);
      for (let Ke = 1; Ke <= Se; Ke++)
        if (ht ? !!(Ke % 2) == se : se) {
          const Gt = m3[0].days[0], cn = I2(addDays(Gt.value, -7), getMonth(W));
          m3.unshift({ days: cn });
        } else {
          const Gt = m3[m3.length - 1], cn = Gt.days[Gt.days.length - 1], Ga = I2(addDays(cn.value, 1), getMonth(W));
          m3.push({ days: Ga });
        }
    }
    return m3;
  }, I2 = (m3, W) => {
    const oe = B2(m3), me = [];
    for (let Se = 0; Se < 7; Se++) {
      const nt = addDays(oe, Se), x2 = getMonth(nt) !== W;
      me.push({
        text: e2.hideOffsetDates && x2 ? "" : nt.getDate(),
        value: nt,
        current: !x2,
        classData: {}
      });
    }
    return me;
  }, Q2 = (m3, W) => {
    const oe = [], me = new Date(W, m3), Se = new Date(W, m3 + 1, 0), nt = e2.weekStart, x2 = startOfWeek(me, { weekStartsOn: nt }), ue = (se) => {
      const ht = I2(se, m3);
      if (oe.push({ days: ht }), !oe[oe.length - 1].days.some(
        (Ke) => ke(Fe(Ke.value), Fe(Se))
      )) {
        const Ke = addDays(se, 7);
        ue(Ke);
      }
    };
    return ue(x2), u2(oe, me, Se, nt);
  }, K2 = (m3) => (o.value = xt(B2(m3.value), e2.timezone, e2.weekStart), t2("date-update", m3.value), ie()), te = (m3) => {
    const W = vt(B2(m3.value), c2.hours, c2.minutes, je());
    t2("date-update", W), e2.multiDates ? Gn(W, o, e2.multiDatesLimit) : o.value = W, a3(), nextTick().then(() => {
      ie();
    });
  }, le = (m3) => e2.noDisabledRange ? Ia(n.value[0], m3).some((oe) => R2(oe)) : false, be = () => {
    n.value = o.value ? o.value.slice() : [], n.value.length === 2 && !(e2.fixedStart || e2.fixedEnd) && (n.value = []);
  }, N = (m3, W) => {
    const oe = [B2(m3.value), addDays(B2(m3.value), +e2.autoRange)];
    P(oe) ? (W && U(m3.value), n.value = oe) : t2("invalid-date", m3.value);
  }, U = (m3) => {
    const W = getMonth(B2(m3)), oe = getYear(B2(m3));
    if (X2(0, W, oe), p.value.count > 0)
      for (let me = 1; me < p.value.count; me++) {
        const Se = Qr(
          set(B2(m3), { year: b2.value(me - 1), month: _.value(me - 1) })
        );
        X2(me, Se.month, Se.year);
      }
  }, Me = (m3) => Array.isArray(o.value) && o.value.length === 2 ? e2.fixedStart && (Ee(m3, o.value[0]) || ke(m3, o.value[0])) ? [o.value[0], m3] : e2.fixedEnd && (Ye(m3, o.value[1]) || ke(m3, o.value[1])) ? [m3, o.value[1]] : (t2("invalid-fixed-range", m3), o.value) : [], G2 = (m3) => {
    if (le(m3.value) || !M3(m3.value, o.value, e2.fixedStart ? 0 : 1))
      return t2("invalid-date", m3.value);
    n.value = Me(B2(m3.value));
  }, We = (m3, W) => {
    if (be(), e2.autoRange)
      return N(m3, W);
    if (e2.fixedStart || e2.fixedEnd)
      return G2(m3);
    n.value[0] ? M3(B2(m3.value), o.value) && !le(m3.value) ? Ye(B2(m3.value), B2(n.value[0])) ? (n.value.unshift(B2(m3.value)), t2("range-end", n.value[0])) : (n.value[1] = B2(m3.value), t2("range-end", n.value[1])) : (e2.autoApply && t2("auto-apply-invalid", m3.value), t2("invalid-date", m3.value)) : (n.value[0] = B2(m3.value), t2("range-start", n.value[0]));
  }, je = (m3 = true) => e2.enableSeconds ? Array.isArray(c2.seconds) ? m3 ? c2.seconds[0] : c2.seconds[1] : c2.seconds : 0, it = (m3) => {
    n.value[m3] = vt(
      n.value[m3],
      c2.hours[m3],
      c2.minutes[m3],
      je(m3 !== 1)
    );
  }, Wt = () => {
    var m3, W;
    n.value[0] && n.value[1] && +((m3 = n.value) == null ? void 0 : m3[0]) > +((W = n.value) == null ? void 0 : W[1]) && (n.value.reverse(), t2("range-start", n.value[0]), t2("range-end", n.value[1]));
  }, jt = () => {
    n.value.length && (n.value[0] && !n.value[1] ? it(0) : (it(0), it(1), a3()), Wt(), o.value = n.value.slice(), on(n.value, t2, e2.autoApply, e2.modelAuto));
  }, sn = (m3, W = false) => {
    if (R2(m3.value) || !m3.current && e2.hideOffsetDates)
      return t2("invalid-date", m3.value);
    if (e2.weekPicker)
      return K2(m3);
    if (!e2.range)
      return te(m3);
    ha(c2.hours) && ha(c2.minutes) && !e2.multiDates && (We(m3, W), jt());
  }, Yt = (m3, W) => {
    var me;
    X2(m3, W.month, W.year), p.value.count && !p.value.solo && Z(m3), t2("update-month-year", { instance: m3, month: W.month, year: W.year }), r(p.value.solo ? m3 : void 0);
    const oe = (me = e2.flow) != null && me.length ? e2.flow[e2.flowStep] : void 0;
    !W.fromNav && (oe === at.month || oe === at.year) && a3();
  }, Ze = (m3, W) => {
    Ua({ value: m3, modelValue: o, range: e2.range, timezone: W ? void 0 : e2.timezone }), ae(), e2.multiCalendars && nextTick().then(() => E2(true));
  }, un = () => {
    e2.range ? o.value && Array.isArray(o.value) && o.value[0] ? o.value = Ye(B2(), o.value[0]) ? [B2(), o.value[0]] : [o.value[0], B2()] : o.value = [B2()] : o.value = B2(), ae();
  }, dn = () => {
    if (Array.isArray(o.value))
      if (e2.multiDates) {
        const m3 = Kt();
        o.value[o.value.length - 1] = A(m3);
      } else
        o.value = o.value.map((m3, W) => m3 && A(m3, W));
    else
      o.value = A(o.value);
    t2("time-update");
  }, Kt = () => Array.isArray(o.value) && o.value.length ? o.value[o.value.length - 1] : null;
  return {
    calendars: i2,
    modelValue: o,
    month: b2,
    year: _,
    time: c2,
    disabledTimesConfig: F,
    validateTime: S3,
    getCalendarDays: Q2,
    getMarker: de,
    handleScroll: h4,
    handleSwipe: J,
    handleArrow: s3,
    selectDate: sn,
    updateMonthYear: Yt,
    presetDate: Ze,
    selectCurrentDate: un,
    updateTime: (m3, W = true, oe = false) => {
      C(m3, W, oe, dn);
    }
  };
};
var go = { key: 0 };
var yo = defineComponent({
  __name: "DatePicker",
  props: {
    ...tt
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
      time: T2,
      disabledTimesConfig: D2,
      validateTime: R2,
      getCalendarDays: P,
      getMarker: M3,
      handleArrow: C,
      handleScroll: A,
      handleSwipe: q2,
      selectDate: g,
      updateMonthYear: S3,
      presetDate: F,
      selectCurrentDate: b2,
      updateTime: _
    } = mo(n, a3, y3, l), X2 = useSlots(), { setHoverDate: ae, getDayClassData: V, clearHoverDate: ie } = hl(p, n), { defaultedMultiCalendars: E2 } = Pe(n), f = ref([]), w2 = ref([]), L2 = ref(null), ne = qe(X2, "calendar"), O2 = qe(X2, "monthYear"), d3 = qe(X2, "timePicker"), Y2 = (u2) => {
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
    const Z = computed(() => (u2) => P(i2.value(u2), c2.value(u2)).map((I2) => ({
      ...I2,
      days: I2.days.map((Q2) => (Q2.marker = M3(Q2), Q2.classData = V(Q2), Q2))
    })));
    function y3(u2) {
      var I2;
      u2 || u2 === 0 ? (I2 = w2.value[u2]) == null || I2.triggerTransition(i2.value(u2), c2.value(u2)) : w2.value.forEach((Q2, K2) => Q2.triggerTransition(i2.value(K2), c2.value(K2)));
    }
    function l() {
      a3("update-flow-step");
    }
    const h4 = (u2, I2 = false) => {
      g(u2, I2), n.spaceConfirm && a3("select-date");
    };
    return t2({
      clearHoverDate: ie,
      presetDate: F,
      selectCurrentDate: b2,
      toggleMonthPicker: (u2, I2, Q2 = 0) => {
        var K2;
        (K2 = f.value[Q2]) == null || K2.toggleMonthPicker(u2, I2);
      },
      toggleYearPicker: (u2, I2, Q2 = 0) => {
        var K2;
        (K2 = f.value[Q2]) == null || K2.toggleYearPicker(u2, I2);
      },
      toggleTimePicker: (u2, I2, Q2) => {
        var K2;
        (K2 = L2.value) == null || K2.toggleTimePicker(u2, I2, Q2);
      },
      handleArrow: C,
      updateMonthYear: S3,
      getSidebarProps: () => ({
        modelValue: p,
        month: i2,
        year: c2,
        time: T2,
        updateTime: _,
        updateMonthYear: S3,
        selectDate: g,
        presetDate: F
      })
    }), (u2, I2) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(ln, {
        "multi-calendars": unref(E2).count
      }, {
        default: withCtx(({ instance: Q2, index: K2 }) => [
          u2.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(ao, mergeProps({
            key: 0,
            ref: (te) => {
              te && (f.value[K2] = te);
            },
            months: unref(_a)(u2.formatLocale, u2.locale, u2.monthNameFormat),
            years: unref(jn)(u2.yearRange, u2.reverseYears),
            month: unref(i2)(Q2),
            year: unref(c2)(Q2),
            instance: Q2
          }, u2.$props, {
            onMount: I2[0] || (I2[0] = (te) => Y2(unref(Dt).header)),
            onResetFlow: I2[1] || (I2[1] = (te) => u2.$emit("reset-flow")),
            onUpdateMonthYear: (te) => unref(S3)(Q2, te),
            onOverlayClosed: I2[2] || (I2[2] = (te) => u2.$emit("focus-menu"))
          }), createSlots({ _: 2 }, [
            renderList(unref(O2), (te, le) => ({
              name: te,
              fn: withCtx((be) => [
                renderSlot(u2.$slots, te, normalizeProps(guardReactiveProps(be)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(vo, mergeProps({
            ref: (te) => {
              te && (w2.value[K2] = te);
            },
            "mapped-dates": Z.value(Q2),
            month: unref(i2)(Q2),
            year: unref(c2)(Q2),
            instance: Q2
          }, u2.$props, {
            onSelectDate: (te) => unref(g)(te, Q2 !== 1),
            onHandleSpace: (te) => h4(te, Q2 !== 1),
            onSetHoverDate: I2[3] || (I2[3] = (te) => unref(ae)(te)),
            onHandleScroll: (te) => unref(A)(te, Q2),
            onHandleSwipe: (te) => unref(q2)(te, Q2),
            onMount: I2[4] || (I2[4] = (te) => Y2(unref(Dt).calendar)),
            onResetFlow: I2[5] || (I2[5] = (te) => u2.$emit("reset-flow")),
            onTooltipOpen: I2[6] || (I2[6] = (te) => u2.$emit("tooltip-open", te)),
            onTooltipClose: I2[7] || (I2[7] = (te) => u2.$emit("tooltip-close", te))
          }), createSlots({ _: 2 }, [
            renderList(unref(ne), (te, le) => ({
              name: te,
              fn: withCtx((be) => [
                renderSlot(u2.$slots, te, normalizeProps(guardReactiveProps({ ...be })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "instance", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars"]),
      u2.enableTimePicker ? (openBlock(), createElementBlock("div", go, [
        u2.$slots["time-picker"] ? renderSlot(u2.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(T2), updateTime: unref(_) }))) : (openBlock(), createBlock(Wa, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: L2
        }, u2.$props, {
          hours: unref(T2).hours,
          minutes: unref(T2).minutes,
          seconds: unref(T2).seconds,
          "internal-model-value": u2.internalModelValue,
          "disabled-times-config": unref(D2),
          "validate-time": unref(R2),
          onMount: I2[8] || (I2[8] = (Q2) => Y2(unref(Dt).timePicker)),
          "onUpdate:hours": I2[9] || (I2[9] = (Q2) => unref(_)(Q2)),
          "onUpdate:minutes": I2[10] || (I2[10] = (Q2) => unref(_)(Q2, false)),
          "onUpdate:seconds": I2[11] || (I2[11] = (Q2) => unref(_)(Q2, false, true)),
          onResetFlow: I2[12] || (I2[12] = (Q2) => u2.$emit("reset-flow")),
          onOverlayClosed: I2[13] || (I2[13] = (Q2) => u2.$emit("time-picker-close")),
          onOverlayOpened: I2[14] || (I2[14] = (Q2) => u2.$emit("time-picker-open", Q2)),
          onAmPmChange: I2[15] || (I2[15] = (Q2) => u2.$emit("am-pm-change", Q2))
        }), createSlots({ _: 2 }, [
          renderList(unref(d3), (Q2, K2) => ({
            name: Q2,
            fn: withCtx((te) => [
              renderSlot(u2.$slots, Q2, normalizeProps(guardReactiveProps(te)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"]))
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var ho = (e2, t2) => {
  const r = ref(), { defaultedMultiCalendars: a3, defaultedConfig: n, defaultedHighlight: o } = Pe(e2), { modelValue: i2, year: c2, month: p, calendars: T2 } = Ut(e2, t2), { isDisabled: D2 } = $t(e2), { selectYear: R2, groupedYears: P, showYearPicker: M3, isDisabled: C, toggleYearPicker: A, handleYearSelect: q2, handleYear: g } = za({
    modelValue: i2,
    multiCalendars: a3,
    highlight: o,
    calendars: T2,
    month: p,
    year: c2,
    props: e2,
    emit: t2
  }), S3 = (f, w2) => [f, w2].map((L2) => format(L2, "MMMM", { locale: e2.formatLocale })).join("-"), F = computed(() => (f) => i2.value ? Array.isArray(i2.value) ? i2.value.some((w2) => isSameQuarter(f, w2)) : isSameQuarter(i2.value, f) : false), b2 = (f) => {
    if (e2.range) {
      if (Array.isArray(i2.value)) {
        const w2 = ke(f, i2.value[0]) || ke(f, i2.value[1]);
        return nn(i2.value, r.value, f) && !w2;
      }
      return false;
    }
    return false;
  }, _ = computed(() => (f) => {
    const w2 = set(/* @__PURE__ */ new Date(), { year: c2.value(f) });
    return eachQuarterOfInterval({
      start: startOfYear(w2),
      end: endOfYear(w2)
    }).map((L2) => {
      const ne = startOfQuarter(L2), O2 = endOfQuarter(L2), d3 = D2(L2), Y2 = b2(ne), Z = typeof o.value == "function" ? o.value({ quarter: getQuarter(ne), year: getYear(ne) }) : !!o.value.quarters.find(
        (y3) => y3.quarter === getQuarter(ne) && y3.year === getYear(ne)
      );
      return {
        text: S3(ne, O2),
        value: ne,
        active: F.value(ne),
        highlighted: Z,
        disabled: d3,
        isBetween: Y2
      };
    });
  }), X2 = (f) => {
    Gn(f, i2, e2.multiDatesLimit), t2("auto-apply", true);
  }, ae = (f) => {
    const w2 = qn(i2, f, t2);
    on(w2, t2, e2.autoApply, e2.modelAuto);
  }, V = (f) => {
    i2.value = f, t2("auto-apply");
  };
  return {
    defaultedConfig: n,
    defaultedMultiCalendars: a3,
    groupedYears: P,
    year: c2,
    isDisabled: C,
    quarters: _,
    showYearPicker: M3,
    modelValue: i2,
    setHoverDate: (f) => {
      r.value = f;
    },
    selectYear: R2,
    selectQuarter: (f, w2, L2) => {
      if (!L2)
        return T2.value[w2].month = getMonth(endOfQuarter(f)), e2.multiDates ? X2(f) : e2.range ? ae(f) : V(f);
    },
    toggleYearPicker: A,
    handleYearSelect: q2,
    handleYear: g
  };
};
var po = { class: "dp--quarter-items" };
var bo = ["disabled", "onClick", "onMouseover"];
var ko = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "QuarterPicker",
  props: {
    ...tt
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
    const a3 = r, n = e2, o = useSlots(), i2 = qe(o, "yearMode"), {
      defaultedMultiCalendars: c2,
      defaultedConfig: p,
      groupedYears: T2,
      year: D2,
      isDisabled: R2,
      quarters: P,
      modelValue: M3,
      showYearPicker: C,
      setHoverDate: A,
      selectQuarter: q2,
      toggleYearPicker: g,
      handleYearSelect: S3,
      handleYear: F
    } = ho(n, a3);
    return t2({ getSidebarProps: () => ({
      modelValue: M3,
      year: D2,
      selectQuarter: q2,
      handleYearSelect: S3,
      handleYear: F
    }) }), (_, X2) => (openBlock(), createBlock(ln, {
      "multi-calendars": unref(c2).count,
      stretch: ""
    }, {
      default: withCtx(({ instance: ae }) => [
        createBaseVNode("div", {
          class: "dp-quarter-picker-wrap",
          style: normalizeStyle({ minHeight: `${unref(p).modeHeight}px` })
        }, [
          createBaseVNode("div", null, [
            createVNode(La, mergeProps(_.$props, {
              items: unref(T2)(ae),
              instance: ae,
              "show-year-picker": unref(C)[ae],
              year: unref(D2)(ae),
              "is-disabled": (V) => unref(R2)(ae, V),
              onHandleYear: (V) => unref(F)(ae, V),
              onYearSelect: (V) => unref(S3)(V, ae),
              onToggleYearPicker: (V) => unref(g)(ae, V == null ? void 0 : V.flow, V == null ? void 0 : V.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(i2), (V, ie) => ({
                name: V,
                fn: withCtx((E2) => [
                  renderSlot(_.$slots, V, normalizeProps(guardReactiveProps(E2)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          createBaseVNode("div", po, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(P)(ae), (V, ie) => (openBlock(), createElementBlock("div", { key: ie }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass(["dp--qr-btn", {
                  "dp--qr-btn-active": V.active,
                  "dp--qr-btn-between": V.isBetween,
                  "dp--qr-btn-disabled": V.disabled,
                  "dp--highlighted": V.highlighted
                }]),
                disabled: V.disabled,
                onClick: (E2) => unref(q2)(V.value, ae, V.disabled),
                onMouseover: (E2) => unref(A)(V.value)
              }, [
                _.$slots.quarter ? renderSlot(_.$slots, "quarter", {
                  key: 0,
                  value: V.value,
                  text: V.text
                }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(V.text), 1)
                ], 64))
              ], 42, bo)
            ]))), 128))
          ])
        ], 4)
      ]),
      _: 3
    }, 8, ["multi-calendars"]));
  }
});
var wo = ["id"];
var Do = {
  key: 0,
  class: "dp__sidebar_left"
};
var Mo = {
  key: 1,
  class: "dp--preset-dates"
};
var $o = ["onClick", "onKeydown"];
var To = {
  key: 2,
  class: "dp__sidebar_right"
};
var Ao = {
  key: 3,
  class: "dp__action_extra"
};
var pa = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerMenu",
  props: {
    ...rn,
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
      const { openOnTop: N, ...U } = n;
      return {
        ...U,
        flowStep: V.value,
        noOverlayFocus: n.noOverlayFocus
      };
    }), { setMenuFocused: i2, setShiftKey: c2, control: p } = Va(), T2 = useSlots(), { defaultedTextInput: D2, defaultedInline: R2, defaultedConfig: P } = Pe(n), M3 = ref(null), C = ref(0), A = ref(null), q2 = ref(null), g = ref(false), S3 = ref(null);
    onMounted(() => {
      if (!n.shadow) {
        g.value = true, F(), window.addEventListener("resize", F);
        const N = Re(A);
        if (N && !D2.value.enabled && !R2.value.enabled && (i2(true), L2()), N) {
          const U = (Me) => {
            P.value.allowPreventDefault && Me.preventDefault(), ft(Me, P.value, true);
          };
          N.addEventListener("pointerdown", U), N.addEventListener("mousedown", U);
        }
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", F);
    });
    const F = () => {
      const N = Re(q2);
      N && (C.value = N.getBoundingClientRect().width);
    }, { arrowRight: b2, arrowLeft: _, arrowDown: X2, arrowUp: ae } = yt(), { flowStep: V, updateFlowStep: ie, childMount: E2, resetFlow: f } = pl(n, a3, S3), w2 = computed(() => n.monthPicker ? Il : n.yearPicker ? El : n.timePicker ? eo : n.quarterPicker ? ko : yo), L2 = () => {
      const N = Re(A);
      N && N.focus({ preventScroll: true });
    }, ne = computed(() => {
      var N;
      return ((N = S3.value) == null ? void 0 : N.getSidebarProps()) || {};
    }), O2 = () => {
      n.openOnTop && a3("recalculate-position");
    }, d3 = qe(T2, "action"), Y2 = computed(() => n.monthPicker || n.yearPicker ? qe(T2, "monthYear") : n.timePicker ? qe(T2, "timePicker") : qe(T2, "shared")), Z = computed(() => n.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), y3 = computed(() => ({
      dp__menu_disabled: n.disabled,
      dp__menu_readonly: n.readonly
    })), l = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !R2.value.enabled,
        dp__relative: R2.value.enabled,
        [n.menuClassName]: !!n.menuClassName
      })
    ), h4 = (N) => {
      ft(N, P.value, true);
    }, s3 = () => {
      n.escClose && a3("close-picker");
    }, J = (N) => {
      if (n.arrowNavigation) {
        if (N === "up")
          return ae();
        if (N === "down")
          return X2();
        if (N === "left")
          return _();
        if (N === "right")
          return b2();
      } else
        N === "left" || N === "up" ? Q2("handleArrow", "left", 0, N === "up") : Q2("handleArrow", "right", 0, N === "down");
    }, de = (N) => {
      c2(N.shiftKey), !n.disableMonthYearSelect && N.code === "Tab" && N.target.classList.contains("dp__menu") && p.value.shiftKeyInMenu && (N.preventDefault(), ft(N, P.value, true), a3("close-picker"));
    }, $ = () => {
      L2(), a3("time-picker-close");
    }, u2 = (N) => {
      var U, Me, G2;
      (U = S3.value) == null || U.toggleTimePicker(false, false), (Me = S3.value) == null || Me.toggleMonthPicker(false, false, N), (G2 = S3.value) == null || G2.toggleYearPicker(false, false, N);
    }, I2 = (N, U = 0) => {
      var Me, G2, We;
      return N === "month" ? (Me = S3.value) == null ? void 0 : Me.toggleMonthPicker(false, true, U) : N === "year" ? (G2 = S3.value) == null ? void 0 : G2.toggleYearPicker(false, true, U) : N === "time" ? (We = S3.value) == null ? void 0 : We.toggleTimePicker(true, false) : u2(U);
    }, Q2 = (N, ...U) => {
      var Me, G2;
      (Me = S3.value) != null && Me[N] && ((G2 = S3.value) == null || G2[N](...U));
    }, K2 = () => {
      Q2("selectCurrentDate");
    }, te = (N, U) => {
      Q2("presetDate", N, U);
    }, le = () => {
      Q2("clearHoverDate");
    };
    return t2({
      updateMonthYear: (N, U) => {
        Q2("updateMonthYear", N, U);
      },
      switchView: I2
    }), (N, U) => {
      var Me;
      return openBlock(), createElementBlock("div", {
        id: N.uid ? `dp-menu-${N.uid}` : void 0,
        ref_key: "dpMenuRef",
        ref: A,
        tabindex: "0",
        role: "dialog",
        class: normalizeClass(l.value),
        onMouseleave: le,
        onClick: h4,
        onKeydown: [
          withKeys(s3, ["esc"]),
          U[18] || (U[18] = withKeys(withModifiers((G2) => J("left"), ["prevent"]), ["left"])),
          U[19] || (U[19] = withKeys(withModifiers((G2) => J("up"), ["prevent"]), ["up"])),
          U[20] || (U[20] = withKeys(withModifiers((G2) => J("down"), ["prevent"]), ["down"])),
          U[21] || (U[21] = withKeys(withModifiers((G2) => J("right"), ["prevent"]), ["right"])),
          de
        ]
      }, [
        (N.disabled || N.readonly) && unref(R2).enabled ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(y3.value)
        }, null, 2)) : createCommentVNode("", true),
        !unref(R2).enabled && !N.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(Z.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: q2,
          class: normalizeClass({
            dp__menu_content_wrapper: ((Me = N.presetDates) == null ? void 0 : Me.length) || !!N.$slots["left-sidebar"] || !!N.$slots["right-sidebar"]
          }),
          style: normalizeStyle({ "--dp-menu-width": `${C.value}px` })
        }, [
          N.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", Do, [
            renderSlot(N.$slots, "left-sidebar", normalizeProps(guardReactiveProps(ne.value)))
          ])) : createCommentVNode("", true),
          N.presetDates.length ? (openBlock(), createElementBlock("div", Mo, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(N.presetDates, (G2, We) => (openBlock(), createElementBlock(Fragment, { key: We }, [
              G2.slot ? renderSlot(N.$slots, G2.slot, {
                key: 0,
                presetDate: te,
                label: G2.label,
                value: G2.value
              }) : (openBlock(), createElementBlock("button", {
                key: 1,
                type: "button",
                style: normalizeStyle(G2.style || {}),
                class: "dp__btn dp--preset-range",
                onClick: withModifiers((je) => te(G2.value, G2.noTz), ["prevent"]),
                onKeydown: [
                  withKeys(withModifiers((je) => te(G2.value, G2.noTz), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((je) => te(G2.value, G2.noTz), ["prevent"]), ["space"])
                ]
              }, toDisplayString(G2.label), 45, $o))
            ], 64))), 128))
          ])) : createCommentVNode("", true),
          createBaseVNode("div", {
            ref_key: "calendarWrapperRef",
            ref: M3,
            class: "dp__instance_calendar",
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(w2.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: S3
            }, o.value, {
              "flow-step": unref(V),
              onMount: unref(E2),
              onUpdateFlowStep: unref(ie),
              onResetFlow: unref(f),
              onFocusMenu: L2,
              onSelectDate: U[0] || (U[0] = (G2) => N.$emit("select-date")),
              onDateUpdate: U[1] || (U[1] = (G2) => N.$emit("date-update", G2)),
              onTooltipOpen: U[2] || (U[2] = (G2) => N.$emit("tooltip-open", G2)),
              onTooltipClose: U[3] || (U[3] = (G2) => N.$emit("tooltip-close", G2)),
              onAutoApply: U[4] || (U[4] = (G2) => N.$emit("auto-apply", G2)),
              onRangeStart: U[5] || (U[5] = (G2) => N.$emit("range-start", G2)),
              onRangeEnd: U[6] || (U[6] = (G2) => N.$emit("range-end", G2)),
              onInvalidFixedRange: U[7] || (U[7] = (G2) => N.$emit("invalid-fixed-range", G2)),
              onTimeUpdate: U[8] || (U[8] = (G2) => N.$emit("time-update")),
              onAmPmChange: U[9] || (U[9] = (G2) => N.$emit("am-pm-change", G2)),
              onTimePickerOpen: U[10] || (U[10] = (G2) => N.$emit("time-picker-open", G2)),
              onTimePickerClose: $,
              onRecalculatePosition: O2,
              onUpdateMonthYear: U[11] || (U[11] = (G2) => N.$emit("update-month-year", G2)),
              onAutoApplyInvalid: U[12] || (U[12] = (G2) => N.$emit("auto-apply-invalid", G2)),
              onInvalidDate: U[13] || (U[13] = (G2) => N.$emit("invalid-date", G2)),
              "onUpdate:internalModelValue": U[14] || (U[14] = (G2) => N.$emit("update:internal-model-value", G2))
            }), createSlots({ _: 2 }, [
              renderList(Y2.value, (G2, We) => ({
                name: G2,
                fn: withCtx((je) => [
                  renderSlot(N.$slots, G2, normalizeProps(guardReactiveProps({ ...je })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          N.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", To, [
            renderSlot(N.$slots, "right-sidebar", normalizeProps(guardReactiveProps(ne.value)))
          ])) : createCommentVNode("", true),
          N.$slots["action-extra"] ? (openBlock(), createElementBlock("div", Ao, [
            N.$slots["action-extra"] ? renderSlot(N.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: K2
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 6),
        !N.autoApply || unref(P).keepActionRow ? (openBlock(), createBlock(Al, mergeProps({
          key: 2,
          "menu-mount": g.value
        }, o.value, {
          "calendar-width": C.value,
          onClosePicker: U[15] || (U[15] = (G2) => N.$emit("close-picker")),
          onSelectDate: U[16] || (U[16] = (G2) => N.$emit("select-date")),
          onInvalidSelect: U[17] || (U[17] = (G2) => N.$emit("invalid-select")),
          onSelectNow: K2
        }), createSlots({ _: 2 }, [
          renderList(unref(d3), (G2, We) => ({
            name: G2,
            fn: withCtx((je) => [
              renderSlot(N.$slots, G2, normalizeProps(guardReactiveProps({ ...je })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
      ], 42, wo);
    };
  }
});
var So = typeof window < "u" ? window : void 0;
var $n = () => {
};
var Po = (e2) => getCurrentScope() ? (onScopeDispose(e2), true) : false;
var Co = (e2, t2, r, a3) => {
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
  return Po(i2), i2;
};
var _o = (e2, t2, r, a3 = {}) => {
  const { window: n = So, event: o = "pointerdown" } = a3;
  return n ? Co(n, o, (c2) => {
    const p = Re(e2), T2 = Re(t2);
    !p || !T2 || p === c2.target || c2.composedPath().includes(p) || c2.composedPath().includes(T2) || r(c2);
  }, { passive: true }) : void 0;
};
var Ro = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "VueDatePicker",
  props: {
    ...rn
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
    const a3 = r, n = e2, o = useSlots(), i2 = ref(false), c2 = toRef(n, "modelValue"), p = toRef(n, "timezone"), T2 = ref(null), D2 = ref(null), R2 = ref(null), P = ref(false), M3 = ref(null), C = ref(false), A = ref(false), { setMenuFocused: q2, setShiftKey: g } = Va(), { clearArrowNav: S3 } = yt(), { mapDatesArrToMap: F, validateDate: b2, isValidTime: _ } = $t(n), { defaultedTransitions: X2, defaultedTextInput: ae, defaultedInline: V, defaultedConfig: ie } = Pe(n), { menuTransition: E2, showTransition: f } = Lt(X2);
    onMounted(() => {
      J(n.modelValue), nextTick().then(() => {
        if (!V.value.enabled) {
          const x2 = y3(M3.value);
          x2 == null || x2.addEventListener("scroll", be), window == null || window.addEventListener("resize", N);
        }
      }), V.value.enabled && (i2.value = true), window == null || window.addEventListener("keyup", U), window == null || window.addEventListener("keydown", Me);
    });
    const w2 = computed(() => F());
    onUnmounted(() => {
      if (!V.value.enabled) {
        const x2 = y3(M3.value);
        x2 == null || x2.removeEventListener("scroll", be), window == null || window.removeEventListener("resize", N);
      }
      window == null || window.removeEventListener("keyup", U), window == null || window.removeEventListener("keydown", Me);
    });
    const L2 = qe(o, "all", n.presetDates), ne = qe(o, "input");
    watch(
      [c2, p],
      () => {
        J(c2.value);
      },
      { deep: true }
    );
    const { openOnTop: O2, menuStyle: d3, xCorrect: Y2, setMenuPosition: Z, getScrollableParent: y3, shadowRender: l } = ml({
      menuRef: T2,
      menuRefInner: D2,
      inputRef: R2,
      pickerWrapperRef: M3,
      inline: V,
      emit: a3,
      props: n,
      slots: o
    }), {
      inputValue: h4,
      internalModelValue: s3,
      parseExternalModelValue: J,
      emitModelValue: de,
      formatInputValue: $,
      checkBeforeEmit: u2
    } = fl(a3, n, P), I2 = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: n.dark,
        dp__theme_light: !n.dark,
        dp__flex_display: V.value.enabled,
        dp__flex_display_with_input: V.value.input
      })
    ), Q2 = computed(() => n.dark ? "dp__theme_dark" : "dp__theme_light"), K2 = computed(() => ({
      to: typeof n.teleport == "boolean" ? "body" : n.teleport,
      disabled: !n.teleport || V.value.enabled
    })), te = computed(() => ({ class: "dp__outer_menu_wrap" })), le = computed(() => V.value.enabled && (n.timePicker || n.monthPicker || n.yearPicker || n.quarterPicker)), be = () => {
      i2.value && (ie.value.closeOnScroll ? Ze() : Z());
    }, N = () => {
      i2.value && Z();
    }, U = (x2) => {
      x2.key === "Tab" && !V.value.enabled && !n.teleport && ie.value.tabOutClosesMenu && (M3.value.contains(document.activeElement) || Ze()), A.value = x2.shiftKey;
    }, Me = (x2) => {
      A.value = x2.shiftKey;
    }, G2 = () => {
      !n.disabled && !n.readonly && (l(pa, n), Z(false), i2.value = true, i2.value && a3("open"), i2.value || Yt(), J(n.modelValue));
    }, We = () => {
      var x2;
      h4.value = "", Yt(), (x2 = R2.value) == null || x2.setParsedDate(null), a3("update:model-value", null), a3("update:model-timezone-value", null), a3("cleared"), ie.value.closeOnClearValue && Ze();
    }, je = () => {
      const x2 = s3.value;
      return !x2 || !Array.isArray(x2) && b2(x2) ? true : Array.isArray(x2) ? n.multiDates || x2.length === 2 && b2(x2[0]) && b2(x2[1]) ? true : n.partialRange && !n.timePicker ? b2(x2[0]) : false : false;
    }, it = () => {
      u2() && je() ? (de(), Ze()) : a3("invalid-select", s3.value);
    }, Wt = (x2) => {
      jt(), de(), ie.value.closeOnAutoApply && !x2 && Ze();
    }, jt = () => {
      R2.value && ae.value.enabled && R2.value.setParsedDate(s3.value);
    }, sn = (x2 = false) => {
      n.autoApply && _(s3.value) && je() && (n.range && Array.isArray(s3.value) ? (n.partialRange || s3.value.length === 2) && Wt(x2) : Wt(x2));
    }, Yt = () => {
      ae.value.enabled || (s3.value = null);
    }, Ze = () => {
      V.value.enabled || (i2.value && (i2.value = false, Y2.value = false, q2(false), g(false), S3(), a3("closed"), h4.value && J(c2.value)), Yt(), a3("blur"));
    }, un = (x2, ue, se = false) => {
      if (!x2) {
        s3.value = null;
        return;
      }
      const ht = Array.isArray(x2) ? !x2.some((Qn) => !b2(Qn)) : b2(x2), Ke = _(x2);
      ht && Ke && (s3.value = x2, ue && (C.value = se, it(), a3("text-submit")));
    }, dn = () => {
      n.autoApply && _(s3.value) && de(), jt();
    }, Kt = () => i2.value ? Ze() : G2(), Zn = (x2) => {
      s3.value = x2;
    }, m3 = () => {
      ae.value.enabled && (P.value = true, $()), a3("focus");
    }, W = () => {
      if (ae.value.enabled && (P.value = false, J(n.modelValue), C.value)) {
        const x2 = jr(M3.value, A.value);
        x2 == null || x2.focus();
      }
      a3("blur");
    }, oe = (x2) => {
      D2.value && D2.value.updateMonthYear(0, {
        month: ca(x2.month),
        year: ca(x2.year)
      });
    }, me = (x2) => {
      J(x2 ?? n.modelValue);
    }, Se = (x2, ue) => {
      var se;
      (se = D2.value) == null || se.switchView(x2, ue);
    }, nt = (x2) => ie.value.onClickOutside ? ie.value.onClickOutside(x2) : Ze();
    return _o(T2, R2, () => nt(je)), t2({
      closeMenu: Ze,
      selectDate: it,
      clearValue: We,
      openMenu: G2,
      onScroll: be,
      formatInputValue: $,
      // exposed for testing purposes
      updateInternalModelValue: Zn,
      // modify internal modelValue
      setMonthYear: oe,
      parseModel: me,
      switchView: Se,
      toggleMenu: Kt
    }), (x2, ue) => (openBlock(), createElementBlock("div", {
      ref_key: "pickerWrapperRef",
      ref: M3,
      class: normalizeClass(I2.value),
      "data-datepicker-instance": ""
    }, [
      createVNode(Dl, mergeProps({
        ref_key: "inputRef",
        ref: R2,
        "input-value": unref(h4),
        "onUpdate:inputValue": ue[0] || (ue[0] = (se) => isRef(h4) ? h4.value = se : null),
        "is-menu-open": i2.value
      }, x2.$props, {
        onClear: We,
        onOpen: G2,
        onSetInputDate: un,
        onSetEmptyDate: unref(de),
        onSelectDate: it,
        onToggle: Kt,
        onClose: Ze,
        onFocus: m3,
        onBlur: W,
        onRealBlur: ue[1] || (ue[1] = (se) => P.value = false)
      }), createSlots({ _: 2 }, [
        renderList(unref(ne), (se, ht) => ({
          name: se,
          fn: withCtx((Ke) => [
            renderSlot(x2.$slots, se, normalizeProps(guardReactiveProps(Ke)))
          ])
        }))
      ]), 1040, ["input-value", "is-menu-open", "onSetEmptyDate"]),
      createVNode(Teleport, normalizeProps(guardReactiveProps(K2.value)), {
        default: withCtx(() => [
          createVNode(Transition, {
            name: unref(E2)(unref(O2)),
            css: unref(f) && !unref(V).enabled
          }, {
            default: withCtx(() => [
              i2.value ? (openBlock(), createElementBlock("div", mergeProps({
                key: 0,
                ref_key: "dpWrapMenuRef",
                ref: T2
              }, te.value, {
                class: { "dp--menu-wrapper": !unref(V).enabled },
                style: unref(V).enabled ? void 0 : unref(d3)
              }), [
                createVNode(pa, mergeProps({
                  ref_key: "dpMenuRef",
                  ref: D2
                }, x2.$props, {
                  "internal-model-value": unref(s3),
                  "onUpdate:internalModelValue": ue[2] || (ue[2] = (se) => isRef(s3) ? s3.value = se : null),
                  class: { [Q2.value]: true, "dp--menu-wrapper": x2.teleport },
                  "open-on-top": unref(O2),
                  "arr-map-values": w2.value,
                  "no-overlay-focus": le.value,
                  onClosePicker: Ze,
                  onSelectDate: it,
                  onAutoApply: sn,
                  onTimeUpdate: dn,
                  onFlowStep: ue[3] || (ue[3] = (se) => x2.$emit("flow-step", se)),
                  onUpdateMonthYear: ue[4] || (ue[4] = (se) => x2.$emit("update-month-year", se)),
                  onInvalidSelect: ue[5] || (ue[5] = (se) => x2.$emit("invalid-select", unref(s3))),
                  onAutoApplyInvalid: ue[6] || (ue[6] = (se) => x2.$emit("invalid-select", se)),
                  onInvalidFixedRange: ue[7] || (ue[7] = (se) => x2.$emit("invalid-fixed-range", se)),
                  onRecalculatePosition: unref(Z),
                  onTooltipOpen: ue[8] || (ue[8] = (se) => x2.$emit("tooltip-open", se)),
                  onTooltipClose: ue[9] || (ue[9] = (se) => x2.$emit("tooltip-close", se)),
                  onTimePickerOpen: ue[10] || (ue[10] = (se) => x2.$emit("time-picker-open", se)),
                  onTimePickerClose: ue[11] || (ue[11] = (se) => x2.$emit("time-picker-close", se)),
                  onAmPmChange: ue[12] || (ue[12] = (se) => x2.$emit("am-pm-change", se)),
                  onRangeStart: ue[13] || (ue[13] = (se) => x2.$emit("range-start", se)),
                  onRangeEnd: ue[14] || (ue[14] = (se) => x2.$emit("range-end", se)),
                  onDateUpdate: ue[15] || (ue[15] = (se) => x2.$emit("date-update", se)),
                  onInvalidDate: ue[16] || (ue[16] = (se) => x2.$emit("invalid-date", se))
                }), createSlots({ _: 2 }, [
                  renderList(unref(L2), (se, ht) => ({
                    name: se,
                    fn: withCtx((Ke) => [
                      renderSlot(x2.$slots, se, normalizeProps(guardReactiveProps({ ...Ke })))
                    ])
                  }))
                ]), 1040, ["internal-model-value", "class", "open-on-top", "arr-map-values", "no-overlay-focus", "onRecalculatePosition"])
              ], 16)) : createCommentVNode("", true)
            ]),
            _: 3
          }, 8, ["name", "css"])
        ]),
        _: 3
      }, 16)
    ], 2));
  }
});
var Ka = (() => {
  const e2 = Ro;
  return e2.install = (t2) => {
    t2.component("Vue3DatePicker", e2);
  }, e2;
})();
var Oo = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Ka
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(Oo).forEach(([e2, t2]) => {
  e2 !== "default" && (Ka[e2] = t2);
});

export {
  Ka
};
//# sourceMappingURL=chunk-II7DQKYB.js.map
